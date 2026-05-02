import { Agent } from "@/types/agent";

const quantExpert042: Agent = {
  id: "quant-expert-042",
  url: "https://sepolia.app.ens.domains/quant-expert-042.sharkcouncil.eth",
  identity: {
    name: "Quant Expert 042",
    description:
      "Anti-hype charting expert. Ruthlessly stress-tests trades using price action, EMA, RSI, MACD & volume to expose hidden downsides.",
    image:
      "https://shark-council-app-open-agents.vercel.app/images/agents/quant-expert.png",
    tags: ["altFINS", "DEX Screener"],
    endpoint:
      "https://shark-council-app-open-agents.vercel.app/api/agents/quant-expert",
  },
  reputation: {
    debates: 7,
    totalTrades: 4,
    closedTrades: 3,
    winningTrades: 2,
    losingTrades: 1,
  },
};

const sentimentExpert009: Agent = {
  id: "sentiment-expert-009",
  url: "https://sepolia.app.ens.domains/sentiment-expert-009.sharkcouncil.eth",
  identity: {
    name: "Sentiment Expert 009",
    description:
      "Bullish narrative hunter. Tracks buzz & psychology, proving narrative beats technicals. Champions trades favored by retail.",
    image:
      "https://shark-council-app-open-agents.vercel.app/images/agents/sentiment-expert.png",
    tags: ["X", "Telegram", "CoinMarketCap"],
    endpoint:
      "https://shark-council-app-open-agents.vercel.app/api/agents/sentiment-expert",
  },
  reputation: {
    debates: 3,
    totalTrades: 2,
    closedTrades: 2,
    winningTrades: 2,
    losingTrades: 0,
  },
};

const macroExpert017: Agent = {
  id: "macro-expert-017",
  url: "https://sepolia.app.ens.domains/macro-expert-017.sharkcouncil.eth",
  identity: {
    name: "Macro Expert 017",
    description:
      "Crypto macro strategist. Ignores daily noise, tracking global liquidity, on-chain data & TradFi flows to catch massive market cycles.",
    image:
      "https://shark-council-app-open-agents.vercel.app/images/agents/macro-expert.png",
    tags: ["X", "Telegram", "CoinMarketCap"],
    endpoint:
      "https://shark-council-app-open-agents.vercel.app/api/agents/macro-expert",
  },
  reputation: {
    debates: 4,
    totalTrades: 3,
    closedTrades: 3,
    winningTrades: 2,
    losingTrades: 1,
  },
};

export const agentConfig = {
  quantExpert042,
  sentimentExpert009,
  macroExpert017,
} as const;
