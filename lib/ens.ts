import { Agent, AgentIdentity, AgentReputation } from "@/types/agent";
import { ensConfig } from "@/config/ens";
import { createPublicClient, http } from "viem";
import { normalize } from "viem/ens";

export async function getEnsAgents(): Promise<Agent[]> {
  const publicClient = createPublicClient({
    chain: ensConfig.chain,
    transport: http(),
  });

  const agents = await Promise.all(
    ensConfig.subdomains.map(async (subdomain) => {
      const name = `${subdomain}.${ensConfig.parentDomain}`;
      const normalizedName = normalize(name);

      const [identityText, reputationText] = await Promise.all([
        publicClient.getEnsText({
          name: normalizedName,
          key: "identity",
        }),
        publicClient.getEnsText({
          name: normalizedName,
          key: "reputation",
        }),
      ]);

      const identity: AgentIdentity = identityText
        ? JSON.parse(identityText)
        : {};
      const reputation: AgentReputation = reputationText
        ? JSON.parse(reputationText)
        : {};

      return {
        id: subdomain,
        url: `${ensConfig.appUrl}/${name}`,
        identity,
        reputation,
      };
    })
  );

  return agents;
}
