"use client";

import {
  Sidebar as OriginSidebar,
  SidebarContent,
} from "@/components/ui/sidebar";
import { SidebarFooter } from "./sidebar-footer";
import { SidebarGroupAgents } from "./sidebar-group-agents";
import { SidebarGroupDebates } from "./sidebar-group-debates";
import { SidebarHeader } from "./sidebar-header";

export function Sidebar({
  ...props
}: React.ComponentProps<typeof OriginSidebar>) {
  return (
    <OriginSidebar {...props}>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroupDebates />
        <SidebarGroupAgents />
      </SidebarContent>
      <SidebarFooter />
    </OriginSidebar>
  );
}
