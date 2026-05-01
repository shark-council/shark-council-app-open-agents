"use client";

import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

// TODO: Add agent wallet address, balance
// TODO: Add trade chain, transactions
export function DebateDetails(props: { className?: ClassValue }) {
  return (
    <div className={cn("flex flex-col gap-3", props.className)}>
      <Card>
        <CardHeader className="border-b">
          <CardTitle>Started</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{new Date("2026-04-30T09:42:42Z").toLocaleString()}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="border-b">
          <CardTitle>ENS sharks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <p>Sentiment Expert 009</p>
            <p>Quant Expert 042</p>
            <p>Fee: NA</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="border-b">
          <CardTitle>Uniswap trade</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <p>Token: NA</p>
            <p>Status: NA</p>
            <p>Entry date: NA</p>
            <p>Entry price: NA</p>
            <p>Entry amount: NA</p>
            <p>Exit date: NA</p>
            <p>Exit price: NA</p>
            <p>Exit amount: NA</p>
            <p>PnL: NA</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="border-b">
          <CardTitle>Chart</CardTitle>
        </CardHeader>
        <CardContent>
          <p>NA</p>
        </CardContent>
      </Card>
    </div>
  );
}
