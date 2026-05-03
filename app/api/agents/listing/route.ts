import { createFailedApiResponse, createSuccessApiResponse } from "@/lib/api";
import { getErrorString } from "@/lib/error";
import { NextRequest } from "next/server";
import z from "zod";

export async function POST(request: NextRequest) {
  try {
    console.log("[Agent Listing API] Handling post request...");

    const bodySchema = z.object({
      name: z.string().trim().min(1),
      description: z.string().trim().min(1),
      image: z.url(),
      endpoint: z.url(),
      wallet: z
        .string()
        .trim()
        .regex(/^0x[a-fA-F0-9]{40}$/, "Invalid wallet address"),
      email: z.email(),
    });

    const body = await request.json();

    const bodyParseResult = bodySchema.safeParse(body);
    if (!bodyParseResult.success) {
      return createFailedApiResponse({ message: "Invalid request body" }, 400);
    }

    console.log(
      "[Agent Listing API] Listing request payload:",
      bodyParseResult.data,
    );

    return createSuccessApiResponse();
  } catch (error) {
    console.error(
      `[Agent Listing API] Failed to handle post request: ${getErrorString(error)}`,
    );
    return createFailedApiResponse({ message: getErrorString(error) }, 500);
  }
}
