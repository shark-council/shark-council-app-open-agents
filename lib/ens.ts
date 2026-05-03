import { ensConfig } from "@/config/ens";
import { Agent, AgentIdentity, AgentReputation } from "@/types/agent";
import {
  createPublicClient,
  createWalletClient,
  http,
  namehash,
  parseAbi,
} from "viem";
import { normalize } from "viem/ens";
import { getWalletAccount } from "./wallet";

export async function getEnsAgents(): Promise<Agent[]> {
  const publicClient = createPublicClient({
    chain: ensConfig.chain,
    transport: http(),
  });

  const agents = await Promise.all(
    ensConfig.subdomains.map(async (subdomain) => {
      const name = `${subdomain}.${ensConfig.parentDomain}`;
      const normalizedName = normalize(name);

      const [identityText, reputationText] = await Promise.all([
        publicClient.getEnsText({
          name: normalizedName,
          key: "identity",
        }),
        publicClient.getEnsText({
          name: normalizedName,
          key: "reputation",
        }),
      ]);

      const identity: AgentIdentity = identityText
        ? JSON.parse(identityText)
        : {};
      const reputation: AgentReputation = reputationText
        ? JSON.parse(reputationText)
        : {};

      return {
        id: subdomain,
        url: `${ensConfig.appUrl}/${name}`,
        identity,
        reputation,
      };
    }),
  );

  return agents;
}

export async function createEnsAgent(
  subdomain: string,
  identity: AgentIdentity,
  reputation: AgentReputation = {
    debates: 0,
    totalTrades: 0,
    closedTrades: 0,
    winningTrades: 0,
    losingTrades: 0,
  },
): Promise<{
  fullName: string;
  transactions: {
    register: string;
    identity: string;
    reputation: string;
  };
}> {
  const account = getWalletAccount();
  const publicClient = createPublicClient({
    chain: ensConfig.chain,
    transport: http(),
  });
  const walletClient = createWalletClient({
    account,
    chain: ensConfig.chain,
    transport: http(),
  });

  const parentNode = namehash(ensConfig.parentDomain);
  const fullName = `${subdomain}.${ensConfig.parentDomain}`;
  const normalizedName = normalize(fullName);
  const node = namehash(normalizedName);

  // 1. Get Resolver for parent to use as default
  const resolverAddress = await publicClient.getEnsResolver({
    name: normalize(ensConfig.parentDomain),
  });

  if (!resolverAddress) {
    throw new Error(`No resolver found for ${ensConfig.parentDomain}`);
  }

  // NameWrapper ABI for setSubnodeRecord
  const wrapperAbi = parseAbi([
    "function setSubnodeRecord(bytes32 parentNode, string label, address owner, address resolver, uint64 ttl, uint32 fuses, uint64 expiry) external",
  ]);

  // Public Resolver ABI
  const resolverAbi = parseAbi([
    "function setText(bytes32 node, string key, string value) external",
  ]);

  console.log(`[ENS Lib] Creating subdomain ${fullName} via NameWrapper...`);

  const { request: registerRequest } = await publicClient.simulateContract({
    account,
    address: ensConfig.nameWrapperAddress,
    abi: wrapperAbi,
    functionName: "setSubnodeRecord",
    args: [
      parentNode,
      subdomain, // pass the plaintext string label directly
      account.address,
      resolverAddress,
      BigInt(0), // ttl
      0, // fuses
      BigInt(0), // expiry (0 uses parent expiry)
    ],
  });
  const registerHash = await walletClient.writeContract(registerRequest);
  await publicClient.waitForTransactionReceipt({ hash: registerHash });
  console.log(`[ENS Lib] Subdomain created and wrapped: ${registerHash}`);

  console.log(`[ENS Lib] Setting identity text record...`);
  const { request: identityRequest } = await publicClient.simulateContract({
    account,
    address: resolverAddress,
    abi: resolverAbi,
    functionName: "setText",
    args: [node, "identity", JSON.stringify(identity)],
  });
  const identityHash = await walletClient.writeContract(identityRequest);
  await publicClient.waitForTransactionReceipt({ hash: identityHash });

  console.log(`[ENS Lib] Setting reputation text record...`);
  const { request: reputationRequest } = await publicClient.simulateContract({
    account,
    address: resolverAddress,
    abi: resolverAbi,
    functionName: "setText",
    args: [node, "reputation", JSON.stringify(reputation)],
  });
  const reputationHash = await walletClient.writeContract(reputationRequest);
  await publicClient.waitForTransactionReceipt({ hash: reputationHash });

  return {
    fullName,
    transactions: {
      register: registerHash,
      identity: identityHash,
      reputation: reputationHash,
    },
  };
}
