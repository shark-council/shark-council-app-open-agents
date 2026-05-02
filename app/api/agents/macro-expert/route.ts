import { createFailedApiResponse, createSuccessApiResponse } from "@/lib/api";
import { getErrorString } from "@/lib/error";

// TODO: Implement macro expert agent and update this API route
export async function POST() {
  try {
    console.log("[Macro Expert API] Handling post request...");

    const response = "No response";

    return createSuccessApiResponse({ response });
  } catch (error) {
    console.error(
      `[Macro Expert API] Failed to handle post request: ${getErrorString(error)}`,
    );
    return createFailedApiResponse({ message: "Internal server error" }, 500);
  }
}
