"use client";

import {
  QueryClient,
  QueryClientProvider as TRQQueryClientProvider,
} from "@tanstack/react-query";

export function QueryClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();

  return (
    <TRQQueryClientProvider client={queryClient}>
      {children}
    </TRQQueryClientProvider>
  );
}
