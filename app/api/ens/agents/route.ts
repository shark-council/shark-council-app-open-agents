import { createFailedApiResponse, createSuccessApiResponse } from "@/lib/api";
import { getEnsAgents } from "@/lib/ens";
import { getErrorString } from "@/lib/error";

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
