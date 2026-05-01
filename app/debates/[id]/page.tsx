import { DebateChat } from "@/components/debates/debate-chat";
import { DebateDetails } from "@/components/debates/debate-details";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Spinner } from "@/components/ui/spinner";
import { debateConfig } from "@/config/debate";

export default async function DebatePage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;

  const debates = [debateConfig.demoDebate1, debateConfig.demoDebate2];
  const debate = debates.find((debate) => debate.id === id);

  if (!debate) {
    return (
      <main className="flex flex-1 flex-row items-center justify-center gap-2 px-4 py-4">
        <Spinner />
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main className="flex flex-1 flex-row items-start gap-4 px-4 py-4">
      <ScrollArea className="flex-3 h-[calc(100dvh-4rem-2rem-1rem)]">
        <DebateChat debate={debate} />
      </ScrollArea>
      <ScrollArea className="flex-2 h-[calc(100dvh-4rem-2rem-1rem)]">
        <DebateDetails debate={debate} />
      </ScrollArea>
    </main>
  );
}
