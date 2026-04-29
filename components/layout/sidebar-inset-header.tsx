import { appConfig } from "@/config/app";
import { ExternalLinkIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { SidebarTrigger } from "../ui/sidebar";

export function SidebarInsetHeader() {
  return (
    <header className="flex h-16 items-center justify-between border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Button variant="link" asChild>
        <Link href={appConfig.gitHubUrl} target="_blank">
          GitHub <ExternalLinkIcon />
        </Link>
      </Button>
    </header>
  );
}
