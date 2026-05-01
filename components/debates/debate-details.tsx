"use client";

import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { BotIcon, ChartCandlestickIcon } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { agentConfig } from "@/config/agent";
import Link from "next/link";
import { Button } from "../ui/button";

export function DebateDetails(props: { className?: ClassValue }) {
  return (
    <div className={cn("flex flex-col gap-3", props.className)}>
      <Card>
        <CardHeader className="border-b">
          <CardTitle>
            <BotIcon className="size-4 mb-1 mr-1 inline" />
            ENS sharks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center gap-2">
              <Avatar size="sm">
                <AvatarImage
                  src={agentConfig.sentimentExpert009.identity.image}
                  alt={agentConfig.sentimentExpert009.identity.name}
                />
              </Avatar>
              <p>{agentConfig.sentimentExpert009.identity.name}</p>
              <p>/</p>
              <Button variant="link" className="p-0" asChild>
                <Link href={agentConfig.sentimentExpert009.url} target="_blank">
                  {agentConfig.sentimentExpert009.id}
                </Link>
              </Button>
            </div>
            <div className="flex flex-row items-center gap-2">
              <Avatar size="sm">
                <AvatarImage
                  src={agentConfig.quantExpert042.identity.image}
                  alt={agentConfig.quantExpert042.identity.name}
                />
              </Avatar>
              <p>{agentConfig.quantExpert042.identity.name}</p>
              <p>/</p>
              <Button variant="link" className="p-0" asChild>
                <Link href={agentConfig.quantExpert042.url} target="_blank">
                  {agentConfig.quantExpert042.id}
                </Link>
              </Button>
            </div>
            <Separator />
            <div className="flex flex-row gap-2">
              <p className="text-muted-foreground">Integrator fee:</p>
              <p>NA</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="border-b">
          <CardTitle>
            <ChartCandlestickIcon className="size-4 mb-1 mr-1 inline" /> Uniswap
            trade
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2">
              <p className="text-muted-foreground">Chain:</p>
              <p>NA</p>
            </div>
            <div className="flex flex-row gap-2">
              <p className="text-muted-foreground">Token:</p>
              <p>NA</p>
            </div>
            <div className="flex flex-row gap-2">
              <p className="text-muted-foreground">Status:</p>
              <p>NA</p>
            </div>
            <Separator />
            <p className="font-bold">Entry</p>
            <div className="flex flex-row gap-2">
              <p className="text-muted-foreground">Chain:</p>
              <p>NA</p>
            </div>
            <div className="flex flex-row gap-2">
              <p className="text-muted-foreground">Price:</p>
              <p>NA</p>
            </div>
            <div className="flex flex-row gap-2">
              <p className="text-muted-foreground">Amount:</p>
              <p>NA</p>
            </div>
            <div className="flex flex-row gap-2">
              <p className="text-muted-foreground">Transaction hash:</p>
              <p>NA</p>
            </div>
            <Separator />
            <p className="font-bold">Exit</p>
            <div className="flex flex-row gap-2">
              <p className="text-muted-foreground">Date:</p>
              <p>NA</p>
            </div>
            <div className="flex flex-row gap-2">
              <p className="text-muted-foreground">Price:</p>
              <p>NA</p>
            </div>
            <div className="flex flex-row gap-2">
              <p className="text-muted-foreground">Amount:</p>
              <p>NA</p>
            </div>
            <div className="flex flex-row gap-2">
              <p className="text-muted-foreground">Transaction hash:</p>
              <p>NA</p>
            </div>
            <div className="flex flex-row gap-2">
              <p className="text-muted-foreground">PnL:</p>
              <p>NA</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
