import { privateKeyToAccount } from "viem/accounts";

export function getWalletAddress(): `0x${string}` {
  const PRIVATE_KEY = process.env.PRIVATE_KEY;

  if (!PRIVATE_KEY) throw new Error("PRIVATE_KEY is not set");

  const account = privateKeyToAccount(PRIVATE_KEY as `0x${string}`);

  return account.address;
}
