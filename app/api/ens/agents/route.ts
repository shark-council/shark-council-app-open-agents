import { createFailedApiResponse, createSuccessApiResponse } from "@/lib/api";
import { createEnsAgent, getEnsAgents } from "@/lib/ens";
import { getErrorString } from "@/lib/error";
import { NextRequest } from "next/server";
import z from "zod";

export async function GET() {
  try {
    console.log("[ENS Agents API] Handling get request...");

    const agents = await getEnsAgents();

    return createSuccessApiResponse({ agents });
  } catch (error) {
    console.error(
      `[ENS Agents API] Failed to handle get request: ${getErrorString(error)}`,
    );
    return createFailedApiResponse({ message: getErrorString(error) }, 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log("[ENS Agents API] Handling post request...");

    const bodySchema = z.object({
      subdomain: z.string(),
      identity: z.object({
        name: z.string(),
        description: z.string(),
        image: z.string().url(),
        tags: z.array(z.string()),
        endpoint: z.string().url(),
      }),
      reputation: z
        .object({
          debates: z.number(),
          totalTrades: z.number(),
          closedTrades: z.number(),
          winningTrades: z.number(),
          losingTrades: z.number(),
        })
        .optional(),
    });

    const body = await request.json();

    const bodyParseResult = bodySchema.safeParse(body);
    if (!bodyParseResult.success) {
      return createFailedApiResponse({ message: "Invalid request body" }, 400);
    }

    const { subdomain, identity, reputation } = bodyParseResult.data;

    const result = await createEnsAgent(subdomain, identity, reputation);

    return createSuccessApiResponse({ ...result });
  } catch (error) {
    console.error(
      `[ENS Agents API] Failed to handle post request: ${getErrorString(error)}`,
    );
    return createFailedApiResponse({ message: getErrorString(error) }, 500);
  }
}
