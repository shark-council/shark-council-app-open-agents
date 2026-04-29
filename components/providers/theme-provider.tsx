"use client";

import { ThemeProvider as NTProvider } from "next-themes";
import * as React from "react";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NTProvider>) {
  return <NTProvider {...props}>{children}</NTProvider>;
}
