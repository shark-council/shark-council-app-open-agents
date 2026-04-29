import { QueryClientProvider } from "@/components/providers/query-client-provider";
import { Toaster } from "@/components/ui/sonner";
import { appConfig } from "@/config/app";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Fira_Code, Outfit } from "next/font/google";

const fontSans = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = Fira_Code({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: {
    default: `${appConfig.name} - ${appConfig.description}`,
    template: `%s - ${appConfig.name}`,
  },
  description: appConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("antialiased", fontSans.variable, fontMono.variable)}
      suppressHydrationWarning
    >
      <body className="min-h-dvh flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <QueryClientProvider>
            <div className="flex-1">{children}</div>
            <Toaster />
          </QueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
