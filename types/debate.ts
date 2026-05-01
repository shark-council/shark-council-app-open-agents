import { Agent } from "./agent";

export type Debate = {
  id: string;
  idea: string;
  agents: Agent[];
  dexScreenerUrl: string;
};

export type DebateChatMessageRole =
  | "user"
  | "orchestrator"
  | "sentiment-expert"
  | "quant-expert";

export type DebateChatMessageType = "thinking" | "message" | "final";

export type DebateChatMessage = {
  id: string;
  role: DebateChatMessageRole;
  type: DebateChatMessageType;
  content: string;
};
