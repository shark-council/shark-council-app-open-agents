import { DebateChat } from "@/components/debates/debate-chat";
import { DebateDetails } from "@/components/debates/debate-details";
import { ScrollArea } from "@/components/ui/scroll-area";

export default async function DebatePage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id } = await params;

  return (
    <main className="flex flex-1 flex-row items-start gap-4 px-4 py-4">
      <ScrollArea className="flex-3 h-[calc(100dvh-4rem-2rem-1rem)]">
        <DebateChat />
      </ScrollArea>
      <ScrollArea className="flex-2 h-[calc(100dvh-4rem-2rem-1rem)]">
        <DebateDetails />
      </ScrollArea>
    </main>
  );
}
