"use client";

import { cn } from "@/lib/utils";
import { Debate } from "@/types/debate";
import { ClassValue } from "clsx";
import { BotIcon, ChartCandlestickIcon, RefreshCcw } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";

export function DebateDetails(props: {
  debate: Debate;
  className?: ClassValue;
}) {
  return (
    <div className={cn("flex flex-col gap-3", props.className)}>
      <Card>
        <CardHeader className="border-b">
          <CardTitle>
            <ChartCandlestickIcon className="size-4 mb-1 mr-1 inline" />
            Chart
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative w-full pb-[125%] min-[1400px]:pb-[65%]">
            <iframe
              className="absolute top-0 left-0 w-full h-full border-0 rounded-xl"
              src={`${props.debate.dexScreenerUrl}?embed=1&loadChartSettings=0&trades=0&info=0&chartLeftToolbar=0&chartTheme=dark&theme=dark&chartStyle=0&chartType=price&interval=15`}
            ></iframe>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="border-b">
          <CardTitle>
            <BotIcon className="size-4 mb-1 mr-1 inline" />
            ENS sharks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            {props.debate.agents.map((agent, index) => (
              <div className="flex flex-row items-center gap-2" key={index}>
                <Avatar size="sm">
                  <AvatarImage
                    src={agent.identity.image}
                    alt={agent.identity.name}
                  />
                </Avatar>
                <p>{agent.identity.name}</p>
                <p>/</p>
                <Button variant="link" className="p-0" asChild>
                  <Link href={agent.url} target="_blank">
                    {agent.id}
                  </Link>
                </Button>
              </div>
            ))}
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
            <RefreshCcw className="size-4 mb-1 mr-1 inline" /> Uniswap trade
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
