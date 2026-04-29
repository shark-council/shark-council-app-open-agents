import Image from "next/image";

export default function IndexPage() {
  return (
    <main className="flex flex-1 flex-col items-center px-4 py-8">
      <div className="max-w-2xl">
        {/* Hero */}
        <Image
          src="/images/hero.png"
          alt="Hero"
          priority={false}
          width="100"
          height="100"
          sizes="100vw"
          className="w-full rounded-md"
        />
        <h2 className="text-3xl font-bold tracking-tight text-center mt-6">
          Let ENS sharks roast your trade ideas, then execute the winners using
          Uniswap API
        </h2>
      </div>
    </main>
  );
}
