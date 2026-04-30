import { DebateChat } from "@/components/debates/debate-chat";

export default async function DebatePage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;

  return (
    <main className="flex flex-1 flex-row gap-4 px-4 py-4">
      <div className="flex-1">
        <DebateChat />
      </div>
      <div className="flex-1 bg-accent">
        <p className="text-accent-foreground">This is debate {id}!</p>
      </div>
    </main>
  );
}
