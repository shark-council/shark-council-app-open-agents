import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { agentConfig } from "@/config/agent";
import { ExternalLinkIcon, Plus } from "lucide-react";
import Link from "next/link";

const agents = [
  agentConfig.quantExpert042,
  agentConfig.sentimentExpert009,
  agentConfig.macroExpert017,
];

export function SidebarGroupAgents() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>ENS sharks</SidebarGroupLabel>
      <SidebarGroupAction asChild>
        <Link href="/">
          <Plus /> <span className="sr-only">New ENS shark</span>
        </Link>
      </SidebarGroupAction>
      <SidebarGroupContent></SidebarGroupContent>
      <SidebarMenu>
        {agents.map((agent) => (
          <SidebarMenuItem key={agent.identity.name}>
            <SidebarMenuButton asChild>
              <Link href={agent.url} target="_blank">
                {agent.identity.name} <ExternalLinkIcon />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
