import { sepolia } from "viem/chains";

export const ensConfig = {
  chain: sepolia,
  appUrl: "https://sepolia.app.ens.domains",
  nameWrapperAddress: "0x0635513f179D50A207757E05759CbD106d7dFcE8",
  parentDomain: "sharkcouncil.eth",
  subdomains: ["quant-expert-042", "sentiment-expert-009"],
} as const;
