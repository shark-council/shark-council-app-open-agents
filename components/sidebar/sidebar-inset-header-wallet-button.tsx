"use client";

import { appConfig } from "@/config/app";
import { formatAddress } from "@/lib/utils";
import { GlobeIcon, LogOutIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export function SidebarInsetHeaderWalletButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" className="h-auto gap-2 py-1.5 pl-3 pr-5">
          <Avatar>
            <AvatarFallback>
              <UserIcon />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start">
            <p>Demo Wallet</p>
            <p className="text-xs text-muted-foreground">
              {formatAddress(appConfig.demoWallet.address)}
            </p>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-full">
        <DropdownMenuItem asChild>
          <Link
            href={appConfig.demoWallet.baseBlockchainExplorer}
            target="_blank"
          >
            <GlobeIcon /> Base Blockchain Explorer
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href={appConfig.demoWallet.sepoliaBlockchainExplorer}
            target="_blank"
          >
            <GlobeIcon /> Sepolia Blockchain Explorer
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem disabled={true}>
          <LogOutIcon /> Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
