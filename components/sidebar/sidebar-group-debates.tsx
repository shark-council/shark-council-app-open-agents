import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Plus } from "lucide-react";
import Link from "next/link";

const debates = [
  { name: "Debate 01", url: "/" },
  { name: "Debate 02", url: "/" },
  { name: "Debate 03", url: "/" },
];

export function SidebarGroupDebates() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Debates</SidebarGroupLabel>
      <SidebarGroupAction asChild>
        <Link href="/">
          <Plus /> <span className="sr-only">New debate</span>
        </Link>
      </SidebarGroupAction>
      <SidebarGroupContent></SidebarGroupContent>
      <SidebarMenu>
        {debates.map((debate) => (
          <SidebarMenuItem key={debate.name}>
            <SidebarMenuButton asChild>
              <Link href={debate.url}>{debate.name}</Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
