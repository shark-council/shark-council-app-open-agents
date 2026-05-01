import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { agentConfig } from "@/config/agent";
import { BotIcon, Plus } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

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
        <Link href="/agents/listing">
          <Plus /> <span className="sr-only">List ENS shark</span>
        </Link>
      </SidebarGroupAction>
      <SidebarMenu>
        {agents.map((agent, index) => (
          <SidebarMenuItem key={index}>
            <SidebarMenuButton asChild>
              <Link href={agent.url} target="_blank">
                <Avatar size="sm">
                  <AvatarImage
                    src={agent.identity.image}
                    alt={agent.identity.name}
                  />
                  <AvatarFallback>
                    <BotIcon />
                  </AvatarFallback>
                </Avatar>
                <p>{agent.id}</p>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
