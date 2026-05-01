import { uniswapConfig } from "@/config/uniswap";
import { ChatOpenAI } from "@langchain/openai";
import { BaseMessage, createAgent, tool } from "langchain";
import z from "zod";
import {
  getWalletAddress,
  getWalletNativeBalance,
  getWalletTokenBalance,
} from "../wallet";
import { getErrorString } from "../error";
import { executeSwap } from "../uniswap";

const model = new ChatOpenAI({
  model: "google/gemini-3-flash-preview",
  apiKey: process.env.OPEN_ROUTER_API_KEY,
  configuration: {
    baseURL: "https://openrouter.ai/api/v1",
  },
  temperature: 0,
});

const getWalletAddressTool = tool(
  async ({}) => {
    try {
      console.log(`[Executor] Getting wallet address...`);
      return getWalletAddress();
    } catch (error) {
      console.error(
        `[Executor] Getting wallet address failed, error: ${getErrorString(error)}`,
        error,
      );
      return "Failed to get wallet address";
    }
  },
  {
    name: "get_wallet_address",
    description: "Get the wallet address.",
    schema: z.object({}),
  },
);

const getWalletNativeBalanceTool = tool(
  async ({ chainId }) => {
    try {
      console.log(
        `[Executor] Getting wallet native balance for chain ${chainId}...`,
      );
      const balance = await getWalletNativeBalance(chainId);
      return `Wallet native balance on chain ${chainId}: ${balance}`;
    } catch (error) {
      console.error(
        `[Executor] Getting wallet native balance failed, error: ${getErrorString(error)}`,
        error,
      );
      return `Failed to get wallet native balance: ${getErrorString(error)}`;
    }
  },
  {
    name: "get_wallet_native_balance",
    description:
      "Get the wallet native token balance of the agent's wallet for a given chainId.",
    schema: z.object({
      chainId: z
        .number()
        .describe("The ID of the blockchain network (e.g., 8453 for Base)"),
    }),
  },
);

const getWalletTokenBalanceTool = tool(
  async ({ chainId, tokenAddress }) => {
    try {
      console.log(
        `[Executor] Getting wallet token balance for ${tokenAddress} on chain ${chainId}...`,
      );
      const balance = await getWalletTokenBalance(chainId, tokenAddress);
      return `Wallet token balance for ${tokenAddress} on chain ${chainId}: ${balance}`;
    } catch (error) {
      console.error(
        `[Executor] Getting wallet token balance failed, error: ${getErrorString(error)}`,
        error,
      );
      return `Failed to get wallet token balance: ${getErrorString(error)}`;
    }
  },
  {
    name: "get_wallet_token_balance",
    description:
      "Get the wallet ERC20 token balance of the agent's wallet for a given chainId and tokenAddress.",
    schema: z.object({
      chainId: z
        .number()
        .describe("The ID of the blockchain network (e.g., 8453 for Base)"),
      tokenAddress: z
        .string()
        .describe("The address of the ERC20 token contract"),
    }),
  },
);

const getUniswapSwapChainTool = tool(
  async ({}) => {
    try {
      console.log(`[Executor] Getting Uniswap swap chain...`);

      return JSON.stringify(uniswapConfig.chain);
    } catch (error) {
      console.error(
        `[Executor] Getting Uniswap swap chain failed, error: ${getErrorString(error)}`,
        error,
      );
      return "Failed to get Uniswap swap chain";
    }
  },
  {
    name: "get_uniswap_swap_chain",
    description: "Get the Uniswap swap chain.",
    schema: z.object({}),
  },
);

const getUniswapSwapTokensTool = tool(
  async ({}) => {
    try {
      console.log(`[Executor] Getting Uniswap swap tokens...`);

      return JSON.stringify(uniswapConfig.tokens);
    } catch (error) {
      console.error(
        `[Executor] Getting Uniswap swap tokens failed, error: ${getErrorString(error)}`,
        error,
      );
      return "Failed to get Uniswap swap tokens";
    }
  },
  {
    name: "get_uniswap_swap_tokens",
    description: "Get the Uniswap swap tokens.",
    schema: z.object({}),
  },
);

const executeUniswapSwapTool = tool(
  async ({ tokenIn, tokenOut, amount }) => {
    try {
      console.log(`[Executor] Executing swap...`);
      const transactionHash = await executeSwap(
        tokenIn as `0x${string}`,
        tokenOut as `0x${string}`,
        amount,
      );
      return `Swap executed successfully, transaction hash: ${transactionHash}`;
    } catch (error) {
      console.error(
        `[Executor] Swap execution failed, error: ${getErrorString(error)}`,
        error,
      );
      return `Failed to execute swap: ${getErrorString(error)}`;
    }
  },
  {
    name: "execute_uniswap_swap",
    description: "Execute a token swap on Uniswap.",
    schema: z.object({
      tokenIn: z.string().describe("The address of the token to swap from"),
      tokenOut: z.string().describe("The address of the token to swap to"),
      amount: z.string().describe("The amount of tokenIn to swap (wei)"),
    }),
  },
);

const systemPrompt = `
# Role

- You are Executor, an AI Agent with a crypto wallet and a set of crypto tools.

# Context

- Current date: ${new Date().toISOString()}

# Tools

- \`get_wallet_address\`: Get the wallet address.
- \`get_native_balance\`: Get the native token balance of the agent's wallet for a given chainId.
- \`get_token_balance\`: Get the ERC20 token balance of the agent's wallet for a given chainId and tokenAddress.
- \`get_uniswap_swap_chain\`: Get the Uniswap swap chain details.
- \`get_uniswap_swap_tokens\`: Get the Uniswap swap tokens.
- \`execute_uniswap_swap\`: Execute a token swap on Uniswap (Requires tokenIn, tokenOut, and amount in wei).

# Rules

- Do not hallucinate.
- Your answers and actions must be based strictly on the output and capabilities of your tools.
`;

const agent = createAgent({
  model,
  tools: [
    getWalletAddressTool,
    getUniswapSwapChainTool,
    getUniswapSwapTokensTool,
    getWalletNativeBalanceTool,
    getWalletTokenBalanceTool,
    executeUniswapSwapTool,
  ],
  systemPrompt,
});

export async function invokeAgent(
  messages: BaseMessage[],
): Promise<BaseMessage> {
  console.log("[Executor] Invoking agent...");

  const response = await agent.invoke({ messages });
  const lastMessage = response.messages[response.messages.length - 1];
  return lastMessage;
}
