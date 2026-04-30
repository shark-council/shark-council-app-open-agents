import { DebateChat } from "@/components/debates/debate-chat";
import { DebateDetails } from "@/components/debates/debate-details";

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
    <main className="flex flex-1 flex-row gap-4 px-4 py-4">
      <DebateChat className="flex-3" />
      <DebateDetails className="flex-2" />
    </main>
  );
}
