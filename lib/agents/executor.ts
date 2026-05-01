import { ChatOpenAI } from "@langchain/openai";
import { BaseMessage, createAgent, tool } from "langchain";
import z from "zod";
import { getErrorString } from "../error";
import { getAccountWalletAddress } from "../account";

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

      return getAccountWalletAddress();
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
  tools: [getWalletAddressTool],
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
