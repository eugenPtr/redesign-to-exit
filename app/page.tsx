import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-10 bg-brand-bg px-6">
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-6xl font-bold tracking-tight text-brand-headline">
          Redesign to Exit
        </h1>
        <p className="max-w-md text-base text-brand-text">
          A 16-step framework to transform your personal income source into a sellable business asset.
        </p>
      </div>
      <div className="flex gap-4">
        <Link
          href="/app"
          className="rounded-md bg-brand-headline px-8 py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
        >
          Enter App
        </Link>
        <Link
          href="/app?demo=true"
          className="rounded-md border-2 border-brand-headline px-8 py-3 text-sm font-semibold text-brand-headline hover:bg-brand-headline/5 transition-colors"
        >
          Enter Demo
        </Link>
      </div>
    </main>
  );
}
