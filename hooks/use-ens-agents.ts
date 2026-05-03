import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Agent } from "@/types/agent";
import { ApiResponse } from "@/types/api";

const fetchEnsAgents = async (): Promise<Agent[]> => {
  const { data } =
    await axios.get<ApiResponse<{ agents: Agent[] }>>("/api/ens/agents");
  if (!data.isSuccess) {
    throw new Error(data.error?.message || "Failed to fetch ENS agents");
  }
  return data.data?.agents || [];
};

export const useEnsAgents = () => {
  return useQuery({
    queryKey: ["ens", "agents"],
    queryFn: fetchEnsAgents,
  });
};
