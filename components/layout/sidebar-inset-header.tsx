import { appConfig } from "@/config/app";
import Link from "next/link";
import { Button } from "../ui/button";
import { SidebarTrigger } from "../ui/sidebar";
import { ExternalLinkIcon } from "lucide-react";

export function SidebarInsetHeader() {
  return (
    <header className="flex h-16 items-center justify-between border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Button variant="link" asChild>
        <Link href={appConfig.gitHubUrl} target="_blank">
          <ExternalLinkIcon /> GitHub
        </Link>
      </Button>
    </header>
  );
}
