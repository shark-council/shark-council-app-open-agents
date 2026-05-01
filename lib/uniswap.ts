import axios from "axios";
import {
  createWalletClient,
  createPublicClient,
  http,
  isAddress,
  isHex,
  type Address,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { base } from "viem/chains";

const API_URL = "https://trade-api.gateway.uniswap.org/v1";

// Helper to prepare /swap request body — routing-aware permitData handling
function prepareSwapRequest(
  quoteResponse: Record<string, unknown>,
  signature?: string,
): object {
  const request = { ...quoteResponse };
  const permitData = request.permitData;
  delete request.permitData;
  delete request.permitTransaction;

  const isUniswapX =
    quoteResponse.routing === "DUTCH_V2" ||
    quoteResponse.routing === "DUTCH_V3" ||
    quoteResponse.routing === "PRIORITY";

  if (isUniswapX) {
    if (signature) request.signature = signature;
  } else {
    // CLASSIC: both signature and permitData required together, or both omitted
    if (signature && permitData && typeof permitData === "object") {
      request.signature = signature;
      request.permitData = permitData;
    }
  }

  return request;
}

// Validate swap response before broadcasting
function validateSwap(swap: {
  data?: string;
  to?: string;
  from?: string;
}): void {
  if (!swap?.data || swap.data === "" || swap.data === "0x") {
    throw new Error("swap.data is empty - quote may have expired");
  }
  if (!isHex(swap.data)) {
    throw new Error("swap.data is not valid hex");
  }
  if (!swap.to || !isAddress(swap.to) || !swap.from || !isAddress(swap.from)) {
    throw new Error("Invalid address in swap response");
  }
}

export async function executeSwap(
  tokenIn: Address,
  tokenOut: Address,
  amount: string,
) {
  const API_KEY = process.env.UNISWAP_API_KEY;
  const PRIVATE_KEY = process.env.PRIVATE_KEY;
  const FEE_BPS = process.env.FEE_BPS
    ? parseInt(process.env.FEE_BPS, 10)
    : undefined;
  const FEE_RECIPIENT = process.env.FEE_RECIPIENT as Address | undefined;

  if (!API_KEY) throw new Error("UNISWAP_API_KEY is not set");
  if (!PRIVATE_KEY) throw new Error("PRIVATE_KEY is not set");

  const account = privateKeyToAccount(PRIVATE_KEY as `0x${string}`);
  const publicClient = createPublicClient({ chain: base, transport: http() });
  const walletClient = createWalletClient({
    account,
    chain: base,
    transport: http(),
  });

  const chainId = 8453; // Base network

  const headers = {
    "x-api-key": API_KEY,
    "Content-Type": "application/json",
    "x-universal-router-version": "2.0",
  };

  console.log(`[Uniswap] Checking approval for token ${tokenIn}...`);

  // 1. Check approval
  const approvalRes = await axios.post(
    `${API_URL}/check_approval`,
    {
      walletAddress: account.address,
      token: tokenIn,
      amount,
      chainId,
    },
    { headers },
  );

  const approvalData = approvalRes.data;

  if (approvalData.approval) {
    console.log(`[Uniswap] Executing token approval transaction...`);
    const hash = await walletClient.sendTransaction({
      to: approvalData.approval.to as `0x${string}`,
      data: approvalData.approval.data as `0x${string}`,
      value: BigInt(approvalData.approval.value || "0"),
    });
    await publicClient.waitForTransactionReceipt({ hash });
    console.log(`[Uniswap] Approval successful. Tx hash: ${hash}`);
  } else {
    console.log(`[Uniswap] Token already approved.`);
  }

  // 2. Get quote
  console.log(`[Uniswap] Fetching quote for swap...`);

  const quoteParams: Record<string, unknown> = {
    swapper: account.address,
    tokenIn,
    tokenOut,
    tokenInChainId: String(chainId),
    tokenOutChainId: String(chainId),
    amount,
    type: "EXACT_INPUT",
    slippageTolerance: 0.5,
  };

  if (FEE_BPS !== undefined && !isNaN(FEE_BPS) && FEE_RECIPIENT) {
    quoteParams.integratorFees = [
      {
        bips: FEE_BPS,
        recipient: FEE_RECIPIENT,
      },
    ];
  }

  const quoteRes = await axios.post(`${API_URL}/quote`, quoteParams, {
    headers,
  });

  const quoteResponse = quoteRes.data;
  console.log(
    `[Uniswap] Received quote successfully (routing: ${quoteResponse.routing}).`,
  );

  // Sign permitData if present
  let signature: string | undefined;
  if (quoteResponse.permitData) {
    console.log(`[Uniswap] Signing Permit2/UniswapX typed data...`);
    const permitData = quoteResponse.permitData;

    const domain = { ...permitData.domain };
    if (domain.chainId) domain.chainId = Number(domain.chainId);

    const types = { ...permitData.types };
    // Viem automatically handles EIP712Domain, remove it if the API returned it
    if (types.EIP712Domain) delete types.EIP712Domain;

    let primaryType = "";
    if (types.PermitSingle) primaryType = "PermitSingle";
    else if (types.PermitBatch) primaryType = "PermitBatch";
    else if (types.PermitTransferFrom) primaryType = "PermitTransferFrom";
    else if (types.PermitBatchTransferFrom)
      primaryType = "PermitBatchTransferFrom";
    else if (types.ExclusiveDutchOrder) primaryType = "ExclusiveDutchOrder";
    else if (types.DutchOrder) primaryType = "DutchOrder";
    else primaryType = Object.keys(types)[0];

    signature = await account.signTypedData({
      domain,
      types,
      primaryType,
      message: permitData.values,
    });
    console.log(`[Uniswap] Signature generated successfully.`);
  }

  // 3. Execute swap
  console.log(`[Uniswap] Submitting swap request to Trading API...`);
  const swapRequest = prepareSwapRequest(quoteResponse, signature);

  const swapRes = await axios.post(`${API_URL}/swap`, swapRequest, { headers });
  const swapData = swapRes.data;

  // 4. Validate before broadcasting
  validateSwap(swapData.swap);

  console.log(`[Uniswap] Broadcasting swap transaction on-chain...`);
  const hash = await walletClient.sendTransaction({
    to: swapData.swap.to as `0x${string}`,
    data: swapData.swap.data as `0x${string}`,
    value: BigInt(swapData.swap.value || "0"),
  });

  console.log(`[Uniswap] Waiting for transaction confirmation...`);
  const receipt = await publicClient.waitForTransactionReceipt({ hash });

  console.log(
    `[Uniswap] Swap transaction confirmed! Tx hash: ${receipt.transactionHash}`,
  );

  return receipt.transactionHash;
}
