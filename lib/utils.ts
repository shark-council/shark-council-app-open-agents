import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function formatHash(hash: string) {
  return `${hash.slice(0, 6)}...${hash.slice(-4)}`;
}

export function formatDecimal(value: number) {
  const decimalFormatter = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 20,
    useGrouping: false,
  });

  return decimalFormatter.format(value);
}
