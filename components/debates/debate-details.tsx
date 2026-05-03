"use client";

import { cn, formatDecimal, formatHash } from "@/lib/utils";
import { Debate } from "@/types/debate";
import { ClassValue } from "clsx";
import { BotIcon, ChartCandlestickIcon, RefreshCcw } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";

export function DebateDetails(props: {
  debate: Debate;
  className?: ClassValue;
}) {
  return (
    <div className={cn("flex flex-col gap-3", props.className)}>
      {/* Chart */}
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
      {/* ENS sharks */}
      <Card className="border border-accent/40 bg-accent/5">
        <CardHeader className="border-b">
          <CardTitle>
            <BotIcon className="size-4 mb-1 mr-1 inline" />
            ENS sharks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            {props.debate.agentIds.map((agentId, index) => (
              <p key={index}>{agentId}</p>
              // <div className="flex flex-row items-center gap-2" key={index}>
              //   <Avatar size="sm">
              //     <AvatarImage
              //       src={agent.identity.image}
              //       alt={agent.identity.name}
              //     />
              //   </Avatar>
              //   <p>{agent.identity.name}</p>
              //   <p>/</p>
              //   <Button variant="link" className="p-0" asChild>
              //     <Link href={agent.url} target="_blank">
              //       {agent.id}
              //     </Link>
              //   </Button>
              // </div>
            ))}
          </div>
        </CardContent>
      </Card>
      {/* Uniswap trade */}
      <Card className="border border-primary/40 bg-primary/5">
        <CardHeader className="border-b">
          <CardTitle>
            <RefreshCcw className="size-4 mb-1 mr-1 inline" /> Uniswap trade
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            {/* Chain */}
            <div className="flex flex-row gap-2">
              <p className="text-muted-foreground">Chain:</p>
              <p>{props.debate.uniswapTrade?.chain || "NA"}</p>
            </div>
            {/* Token */}
            <div className="flex flex-row items-center gap-2">
              <p className="text-muted-foreground">Token:</p>
              {props.debate.uniswapTrade ? (
                <Button variant="link" className="h-auto p-0" asChild>
                  <Link
                    href={props.debate.uniswapTrade.tokenUrl}
                    target="_blank"
                  >
                    {props.debate.uniswapTrade.tokenSymbol}
                  </Link>
                </Button>
              ) : (
                <p>NA</p>
              )}
            </div>
            {/* Status */}
            <div className="flex flex-row gap-2">
              <p className="text-muted-foreground">Status:</p>
              <p>{props.debate.uniswapTrade?.status || "NA"}</p>
            </div>
            <Separator className="my-2" />
            {/* Entry */}
            <p className="font-bold">Entry</p>
            {/* Entry date */}
            <div className="flex flex-row gap-2">
              <p className="text-muted-foreground">Date:</p>
              <p>
                {props.debate.uniswapTrade?.entry?.date.toLocaleString() ||
                  "NA"}
              </p>
            </div>
            {/* Entry price */}
            <div className="flex flex-row gap-2">
              <p className="text-muted-foreground">Price ($):</p>
              <p>{props.debate.uniswapTrade?.entry?.tokenPrice || "NA"}</p>
            </div>
            {/* Entry amount */}
            <div className="flex flex-row gap-2">
              <p className="text-muted-foreground">Amount:</p>
              <p>
                {props.debate.uniswapTrade?.entry?.tokenAmount != null
                  ? formatDecimal(props.debate.uniswapTrade.entry.tokenAmount)
                  : "NA"}
              </p>
            </div>
            {/* Entry integrator fee amount */}
            <div className="flex flex-row gap-2">
              <p className="text-muted-foreground">Integrator fee amount:</p>
              <p>
                {props.debate.uniswapTrade?.entry?.integratorFeeTokenAmount !=
                null
                  ? formatDecimal(
                      props.debate.uniswapTrade.entry.integratorFeeTokenAmount,
                    )
                  : "NA"}
              </p>
            </div>
            {/* Entry transaction */}
            <div className="flex flex-row items-center gap-2">
              <p className="text-muted-foreground">Transaction:</p>
              {props.debate.uniswapTrade?.entry ? (
                <Button variant="link" className="h-auto p-0" asChild>
                  <Link
                    href={props.debate.uniswapTrade.entry.transactionUrl}
                    target="_blank"
                  >
                    {formatHash(
                      props.debate.uniswapTrade.entry.transactionHash,
                    )}
                  </Link>
                </Button>
              ) : (
                <p>NA</p>
              )}
            </div>
            <Separator className="my-2" />
            {/* Exit */}
            <p className="font-bold">Exit</p>
            {/* Exit date */}
            <div className="flex flex-row gap-2">
              <p className="text-muted-foreground">Date:</p>
              <p>
                {props.debate.uniswapTrade?.exit?.date.toLocaleString() || "NA"}
              </p>
            </div>
            {/* Exit price */}
            <div className="flex flex-row gap-2">
              <p className="text-muted-foreground">Price ($):</p>
              <p>{props.debate.uniswapTrade?.exit?.tokenPrice || "NA"}</p>
            </div>
            {/* Exit amount */}
            <div className="flex flex-row gap-2">
              <p className="text-muted-foreground">Amount:</p>
              <p>
                {props.debate.uniswapTrade?.exit?.tokenAmount != null
                  ? formatDecimal(props.debate.uniswapTrade.exit.tokenAmount)
                  : "NA"}
              </p>
            </div>
            {/* Exit integrator fee amount */}
            <div className="flex flex-row gap-2">
              <p className="text-muted-foreground">Integrator fee amount:</p>
              <p>
                {props.debate.uniswapTrade?.exit?.integratorFeeTokenAmount !=
                null
                  ? formatDecimal(
                      props.debate.uniswapTrade.exit.integratorFeeTokenAmount,
                    )
                  : "NA"}
              </p>
            </div>
            {/* Exit transaction */}
            <div className="flex flex-row gap-2">
              <p className="text-muted-foreground">Transaction:</p>
              {props.debate.uniswapTrade?.exit ? (
                <Button variant="link" className="h-auto p-0" asChild>
                  <Link
                    href={props.debate.uniswapTrade.exit.transactionUrl}
                    target="_blank"
                  >
                    {formatHash(props.debate.uniswapTrade.exit.transactionHash)}
                  </Link>
                </Button>
              ) : (
                <p>NA</p>
              )}
            </div>
            {/* Exit PnL */}
            <div className="flex flex-row gap-2">
              <p className="text-muted-foreground">PnL (%):</p>
              {props.debate.uniswapTrade?.exit?.pnlPercentage ? (
                <p>
                  {props.debate.uniswapTrade.exit.pnlPercentage > 0
                    ? `+${props.debate.uniswapTrade.exit.pnlPercentage}`
                    : props.debate.uniswapTrade.exit.pnlPercentage}
                </p>
              ) : (
                <p>NA</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
