import { createFailedApiResponse } from "@/lib/api";
import { getErrorString } from "@/lib/error";
import { NextRequest } from "next/server";
import z from "zod";

// TODO: Implement
export async function POST(request: NextRequest) {
  try {
    console.log("[Executor API] Handling post request...");

    const bodySchema = z.object({
      message: z.string(),
    });

    const body = await request.json();

    const bodyParseResult = bodySchema.safeParse(body);
    if (!bodyParseResult.success) {
      return createFailedApiResponse({ message: "Invalid request body" }, 400);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { message } = bodyParseResult.data;

    throw new Error("Not implemented");
  } catch (error) {
    console.error(
      `[Executor API] Failed to handle post request: ${getErrorString(error)}`,
    );
    return createFailedApiResponse({ message: "Internal server error" }, 500);
  }
}
