import { Debate } from "@/types/debate";
import { agentConfig } from "./agent";

const demoDebate1: Debate = {
  id: "69f301d4affcda2138291a77",
  idea: "Should I buy BTC if Powell gives a clear dovish signal today, considering the massive $464B open interest?",
  agents: [agentConfig.quantExpert042, agentConfig.sentimentExpert009],
  dexScreenerUrl:
    "https://dexscreener.com/base/0xfbb6eed8e7aa03b138556eedaf5d271a5e1e43ef",
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
