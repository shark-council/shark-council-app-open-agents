import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { debateConfig } from "@/config/debate";
import { Plus } from "lucide-react";
import Link from "next/link";

const debates = [debateConfig.demoDebate1];

export function SidebarGroupDebates() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Debates</SidebarGroupLabel>
      <SidebarGroupAction asChild>
        <Link href="/">
          <Plus /> <span className="sr-only">New debate</span>
        </Link>
      </SidebarGroupAction>
      <SidebarMenu>
        {debates.map((debate, index) => (
          <SidebarMenuItem key={index}>
            <SidebarMenuButton asChild>
              <Link href={`/debates/${debate.id}`}>
                <span>{debate.idea}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
