import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Plus } from "lucide-react";
import Link from "next/link";

const debates = [
  {
    name: "Should I long BTC if Powell gives a clear dovish signal today, considering the massive $464B open interest?",
    url: "/",
  },
  {
    name: "Does it make sense to short Bitcoin if the FOMC delivers a hawkish surprise alongside the 3.75% rate hold?",
    url: "/",
  },
  {
    name: "Is now a good time to go long on BTC, betting that the 3.75% rate hold brings a dovish transition speech?",
    url: "/",
  },
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
      <SidebarMenu>
        {debates.map((debate, index) => (
          <SidebarMenuItem key={index}>
            <SidebarMenuButton asChild>
              <Link href={debate.url}>
                <span>{debate.name}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
