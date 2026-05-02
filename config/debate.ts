import { Debate } from "@/types/debate";
import { agentConfig } from "./agent";

const demoDebate1: Debate = {
  id: "69f301d4affcda2138291a77",
  idea: "Is it safe to buy BTC right now considering yesterday's massive $629M institutional inflow?",
  agents: [agentConfig.quantExpert042, agentConfig.sentimentExpert009],
  dexScreenerUrl:
    "https://dexscreener.com/base/0xfbb6eed8e7aa03b138556eedaf5d271a5e1e43ef",
  uniswapTrade: {
    chain: "Base",
    tokenSymbol: "cbBTC",
    tokenUrl:
      "https://basescan.org/token/0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf",
    status: "Open",
    // status: "Closed",
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
    // exit: {
    //   date: new Date("2026-05-01T15:26:09Z"),
    //   tokenPrice: 78365.48,
    //   tokenAmount: 0.00000012,
    //   integratorFeeTokenAmount: 0.00000000036,
    //   transactionHash:
    //     "0x0724e421383ee1936dae5563e24beaf88120d3e235466330881ea37209b33295",
    //   transactionUrl:
    //     "https://basescan.org/tx/0x0724e421383ee1936dae5563e24beaf88120d3e235466330881ea37209b33295",
    //   pnlPercentage: 0.17,
    // },
  },
};

const demoDebate2: Debate = {
  id: "69f301dcbc8553bd11810a4f",
  idea: "Does it make sense to buy ETH if the FOMC delivers a hawkish surprise alongside the 3.75% rate hold?",
  agents: [agentConfig.quantExpert042, agentConfig.sentimentExpert009],
  dexScreenerUrl:
    "https://dexscreener.com/base/0x6c561B446416E1A00E8E93E221854d6eA4171372",
};

export const debateConfig = {
  demoDebate1,
  demoDebate2,
};
