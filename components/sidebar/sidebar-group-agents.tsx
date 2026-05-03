"use client";

import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useEnsAgents } from "@/hooks/use-ens-agents";
import { BotIcon, Plus } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Spinner } from "../ui/spinner";

export function SidebarGroupAgents() {
  const { data: agents, isLoading, isError } = useEnsAgents();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>ENS sharks</SidebarGroupLabel>
      <SidebarGroupAction asChild>
        <Link href="/agents/listing">
          <Plus /> <span className="sr-only">List ENS shark</span>
        </Link>
      </SidebarGroupAction>
      <SidebarMenu>
        {isLoading && (
          <SidebarMenuItem>
            <div className="flex items-center gap-2 p-2">
              <Spinner />
              <p className="text-sm text-muted-foreground">Loading...</p>
            </div>
          </SidebarMenuItem>
        )}
        {isError && (
          <SidebarMenuItem>
            <span className="text-sm text-destructive p-2">Failed to load</span>
          </SidebarMenuItem>
        )}
        {agents?.map((agent) => (
          <SidebarMenuItem key={agent.id}>
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
