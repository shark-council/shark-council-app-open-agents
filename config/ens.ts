import { sepolia } from "viem/chains";

export const ensConfig = {
  chain: sepolia,
  appUrl: "https://sepolia.app.ens.domains",
  parentDomain: "sharkcouncil.eth",
  subdomains: ["quant-expert-042", "sentiment-expert-009"],
} as const;
