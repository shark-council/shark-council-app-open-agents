export type Agent = {
  id: string;
  url: string;
  identity: AgentIdentity;
  reputation: AgentReputation;
};

export type AgentIdentity = {
  name: string;
  description: string;
  image: string;
  tags: string[];
  endpoint: string;
};

export type AgentReputation = {
  debates: number;
  totalTrades: number;
  closedTrades: number;
  winningTrades: number;
  losingTrades: number;
};
