import { createFailedApiResponse, createSuccessApiResponse } from "@/lib/api";
import { getErrorString } from "@/lib/error";
import { executeUniswapSwap } from "@/lib/uniswap";
import { NextRequest } from "next/server";
import { isAddress, type Address } from "viem";
import z from "zod";

export async function POST(request: NextRequest) {
  try {
    console.log("[Uniswap Swap API] Handling post request...");

    const bodySchema = z.object({
      tokenIn: z.string().refine(isAddress),
      tokenOut: z.string().refine(isAddress),
      amount: z.string(),
    });

    const body = await request.json();

    const bodyParseResult = bodySchema.safeParse(body);
    if (!bodyParseResult.success) {
      return createFailedApiResponse({ message: "Invalid request body" }, 400);
    }

    const { tokenIn, tokenOut, amount } = bodyParseResult.data;

    const transactionHash = await executeUniswapSwap(
      tokenIn as Address,
      tokenOut as Address,
      amount,
    );

    return createSuccessApiResponse({ transactionHash });
  } catch (error) {
    console.error(
      `[Uniswap Swap API] Failed to handle post request: ${getErrorString(error)}`,
    );
    return createFailedApiResponse({ message: getErrorString(error) }, 500);
  }
}
