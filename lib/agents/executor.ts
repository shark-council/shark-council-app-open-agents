import { ChatOpenAI } from "@langchain/openai";
import { BaseMessage, createAgent, tool } from "langchain";
import { privateKeyToAccount } from "viem/accounts";
import z from "zod";
import { getErrorString } from "../error";

const PRIVATE_KEY = process.env.PRIVATE_KEY as `0x${string}`;

const account = privateKeyToAccount(PRIVATE_KEY);

const model = new ChatOpenAI({
  model: "google/gemini-3-flash-preview",
  apiKey: process.env.OPEN_ROUTER_API_KEY,
  configuration: {
    baseURL: "https://openrouter.ai/api/v1",
  },
  temperature: 0,
});

const getWalletAddress = tool(
  async ({}) => {
    try {
      console.log(`[Executor] Getting wallet address...`);

      return account.address;
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

const systemPrompt = `
# Role

- You are Executor, an AI Agent with a crypto wallet.

# Context

- Current date: ${new Date().toISOString()}

# Rules

- ...
`;

const agent = createAgent({
  model,
  tools: [getWalletAddress],
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
