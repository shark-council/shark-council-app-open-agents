import { PrivateKeyAccount, privateKeyToAccount } from "viem/accounts";

export function getAccount(): PrivateKeyAccount {
  const PRIVATE_KEY = process.env.PRIVATE_KEY;
  if (!PRIVATE_KEY) {
    throw new Error("PRIVATE_KEY is not set");
  }
  return privateKeyToAccount(PRIVATE_KEY as `0x${string}`);
}

export function getAccountWalletAddress(): `0x${string}` {
  const account = getAccount();
  return account.address;
}
