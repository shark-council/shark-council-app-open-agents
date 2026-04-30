import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ExternalLinkIcon, Plus } from "lucide-react";
import Link from "next/link";

// TODO: Fill in urls
const agents = [
  {
    name: "Quant Expert 042",
    url: "https://sepolia.app.ens.domains/quant-expert-042.sharkcouncil.eth",
  },
  { name: "Sentiment Expert 009", url: "/" },
  { name: "Macro Expert 017", url: "/" },
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
          <SidebarMenuItem key={agent.name}>
            <SidebarMenuButton asChild>
              <Link href={agent.url} target="_blank">
                {agent.name} <ExternalLinkIcon />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
