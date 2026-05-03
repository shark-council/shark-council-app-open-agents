import { Debate } from "@/types/debate";

const demoDebate1: Debate = {
  id: "69f301d4affcda2138291a77",
  idea: "Is it safe to buy BTC right now considering yesterday's massive $629M institutional inflow?",
  agentIds: ["quant-expert-042", "macro-expert-017"],
  dexScreenerUrl:
    "https://dexscreener.com/base/0xfbb6eed8e7aa03b138556eedaf5d271a5e1e43ef",
  uniswapTrade: {
    chain: "Base",
    tokenSymbol: "cbBTC",
    tokenUrl:
      "https://basescan.org/token/0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf",
    status: "Open",
    entry: {
      date: new Date("2026-05-01T13:13:31Z"),
      tokenPrice: 78232.49,
      tokenAmount: 0.00000012,
      integratorFeeTokenAmount: 0.00000000036,
      transactionHash:
        "0xc56f6448ea2607699235eff30ca4da1ba9c45cfd5ff8ee112ce0bef1b143fdb4",
      transactionUrl:
        "https://basescan.org/tx/0xc56f6448ea2607699235eff30ca4da1ba9c45cfd5ff8ee112ce0bef1b143fdb4",
    },
  },
};

export const debateConfig = {
  demoDebate1,
  demoDebates: [demoDebate1],
};
