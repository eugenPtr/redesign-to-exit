"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getState } from "@/lib/state";
import type { PitchDeckJSON } from "@/lib/pitch-schema";

export default function PitchDeckPage() {
  const router = useRouter();
  const [deck, setDeck] = useState<PitchDeckJSON | null>(null);

  useEffect(() => {
    const state = getState();
    if (!state.pitchDeck) {
      router.replace("/");
      return;
    }
    setDeck(state.pitchDeck);
  }, [router]);

  if (!deck) return null;

  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory">
      {/* 1 — Cover */}
      <section className="min-h-screen snap-start flex flex-col items-center justify-center bg-brand-bg px-12 text-center">
        <SlideNumber n={1} />
        <h1 className="text-6xl font-bold text-brand-headline mb-6">{deck.cover.companyName}</h1>
        <p className="text-xl text-brand-text max-w-xl mb-4">{deck.cover.valueProposition}</p>
        <p className="text-sm text-brand-text mb-1">{deck.cover.targetAudience}</p>
        <p className="text-sm font-medium text-brand-text">{deck.cover.founderName}</p>
      </section>

      {/* 2 — Problem */}
      <section className="min-h-screen snap-start flex flex-col items-center justify-center bg-brand-bg px-12">
        <SlideNumber n={2} />
        <SlideLabel>Problem</SlideLabel>
        <h2 className="text-4xl font-bold text-brand-headline text-center mb-6 max-w-2xl">
          {deck.problem.headline}
        </h2>
        <p className="text-base text-brand-text text-center max-w-xl mb-10">
          {deck.problem.clarifyingParagraph}
        </p>
        <div className="flex gap-6 flex-wrap justify-center">
          {deck.problem.facts.map((f, i) => (
            <div
              key={i}
              className="rounded-xl border border-zinc-200 p-6 text-center min-w-[180px]"
            >
              <p className="text-2xl font-bold text-brand-headline mb-1">{f.data}</p>
              <p className="text-xs text-brand-text">{f.headline}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3 — Opportunity Gap */}
      <section className="min-h-screen snap-start flex flex-col items-center justify-center bg-brand-bg px-12 text-center">
        <SlideNumber n={3} />
        <SlideLabel>Opportunity Gap</SlideLabel>
        <h2 className="text-4xl font-bold text-brand-headline mb-6 max-w-2xl">
          {deck.opportunityGap.marketGap}
        </h2>
        <p className="text-base text-brand-text max-w-xl">
          {deck.opportunityGap.supportingParagraph}
        </p>
      </section>

      {/* 4 — Opportunity Size */}
      <section className="min-h-screen snap-start flex flex-col items-center justify-center bg-brand-bg px-12 text-center">
        <SlideNumber n={4} />
        <SlideLabel>Market Size</SlideLabel>
        <div className="flex gap-10 flex-wrap justify-center">
          {(["tam", "sam", "som"] as const).map((key) => (
            <div key={key} className="flex flex-col items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-brand-text">
                {key.toUpperCase()}
              </span>
              <span className="text-4xl font-bold text-brand-headline">{deck.opportunitySize[key]}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 5 — Solution */}
      <section className="min-h-screen snap-start flex flex-col items-center justify-center bg-brand-bg px-12">
        <SlideNumber n={5} />
        <SlideLabel>Solution</SlideLabel>
        <p className="text-lg text-brand-text text-center max-w-xl mb-8">
          {deck.solution.description}
        </p>
        <ul className="space-y-3 max-w-lg w-full">
          {deck.solution.points.map((pt, i) => (
            <li key={i} className="flex gap-3 text-sm text-brand-text">
              <span className="shrink-0 font-bold text-brand-headline">—</span>
              <span>{pt}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 6 — Operating Model */}
      <section className="min-h-screen snap-start flex flex-col items-center justify-center bg-brand-bg px-12">
        <SlideNumber n={6} />
        <SlideLabel>Operating Model</SlideLabel>
        <div className="flex gap-8 flex-wrap justify-center max-w-4xl">
          {deck.operatingModel.columns.map((col, i) => (
            <div key={i} className="flex-1 min-w-[220px] max-w-xs">
              <h3 className="text-lg font-bold text-brand-headline mb-3">{col.headline}</h3>
              <p className="text-sm text-brand-text">{col.paragraph}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7 — Value Creation */}
      <section className="min-h-screen snap-start flex flex-col items-center justify-center bg-brand-bg px-12 text-center">
        <SlideNumber n={7} />
        <SlideLabel>Value Creation</SlideLabel>
        <h2 className="text-4xl font-bold text-brand-headline mb-6 max-w-2xl">
          {deck.valueCreation.headline}
        </h2>
        <p className="text-base text-brand-text max-w-xl">{deck.valueCreation.paragraph}</p>
      </section>

      {/* 8 — Business Model & Traction */}
      <section className="min-h-screen snap-start flex flex-col items-center justify-center bg-brand-bg px-12">
        <SlideNumber n={8} />
        <SlideLabel>Business Model & Traction</SlideLabel>
        <div className="flex gap-8 flex-wrap justify-center max-w-3xl">
          <div className="flex-1 min-w-[220px]">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-brand-text mb-3">
              Revenue Streams
            </h3>
            <p className="text-sm text-brand-text">{deck.businessModel.revenueStreams}</p>
          </div>
          <div className="flex-1 min-w-[220px]">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-brand-text mb-3">
              Traction
            </h3>
            <p className="text-sm text-brand-text">{deck.businessModel.tractionEvidence}</p>
          </div>
        </div>
      </section>

      {/* 9 — Milestones */}
      <section className="min-h-screen snap-start flex flex-col items-center justify-center bg-brand-bg px-12">
        <SlideNumber n={9} />
        <SlideLabel>Milestones</SlideLabel>
        <div className="flex gap-6 flex-wrap justify-center max-w-4xl">
          {deck.milestones.map((m, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-2 rounded-xl border border-zinc-200 px-6 py-5 min-w-[160px]"
            >
              <span className="text-xl font-bold text-brand-headline">{m.year}</span>
              <span className="text-xs text-brand-text text-center">{m.objective}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 10 — Go-to-Market */}
      <section className="min-h-screen snap-start flex flex-col items-center justify-center bg-brand-bg px-12">
        <SlideNumber n={10} />
        <SlideLabel>Go-to-Market</SlideLabel>
        <div className="flex gap-8 flex-wrap justify-center max-w-4xl">
          {deck.goToMarket.columns.map((col, i) => (
            <div key={i} className="flex-1 min-w-[200px] max-w-xs">
              <h3 className="text-lg font-bold text-brand-headline mb-3">{col.headline}</h3>
              <ul className="space-y-2">
                {col.points.map((pt, j) => (
                  <li key={j} className="flex gap-2 text-sm text-brand-text">
                    <span className="shrink-0 text-brand-headline font-bold">—</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 11 — Competitive Advantage */}
      <section className="min-h-screen snap-start flex flex-col items-center justify-center bg-brand-bg px-12 text-center">
        <SlideNumber n={11} />
        <SlideLabel>Competitive Advantage</SlideLabel>
        <h2 className="text-4xl font-bold text-brand-headline mb-6 max-w-2xl">
          {deck.competitiveAdvantage.headline}
        </h2>
        <p className="text-base text-brand-text max-w-xl">{deck.competitiveAdvantage.description}</p>
      </section>

      {/* 12 — Team */}
      <section className="min-h-screen snap-start flex flex-col items-center justify-center bg-brand-bg px-12">
        <SlideNumber n={12} />
        <SlideLabel>Team</SlideLabel>
        <div className="flex gap-6 flex-wrap justify-center max-w-4xl">
          {deck.team.members.map((m, i) => (
            <div
              key={i}
              className="flex flex-col gap-1 rounded-xl border border-zinc-200 p-6 min-w-[200px] max-w-xs"
            >
              <p className="font-bold text-brand-headline">{m.name}</p>
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-text">{m.role}</p>
              <p className="text-sm text-brand-text mt-2">{m.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 13 — Impact */}
      <section className="min-h-screen snap-start flex flex-col items-center justify-center bg-brand-bg px-12">
        <SlideNumber n={13} />
        <SlideLabel>Impact</SlideLabel>
        <ul className="space-y-3 max-w-lg w-full mb-8">
          {deck.impact.points.map((pt, i) => (
            <li key={i} className="flex gap-3 text-sm text-brand-text">
              <span className="shrink-0 font-bold text-brand-headline">—</span>
              <span>{pt}</span>
            </li>
          ))}
        </ul>
        <p className="text-lg font-semibold text-brand-headline text-center max-w-xl">
          {deck.impact.vision}
        </p>
      </section>

      {/* 14 — Ask */}
      <section className="min-h-screen snap-start flex flex-col items-center justify-center bg-brand-bg px-12 text-center">
        <SlideNumber n={14} />
        <SlideLabel>The Ask</SlideLabel>
        <p className="text-6xl font-bold text-brand-headline mb-4">{deck.ask.amount}</p>
        <p className="text-base font-medium text-brand-text mb-6 max-w-md">{deck.ask.useOfFunds}</p>
        <p className="text-sm text-brand-text max-w-xl">{deck.ask.paragraph}</p>
      </section>

      {/* 15 — Thank You */}
      <section className="min-h-screen snap-start flex flex-col items-center justify-center bg-brand-bg px-12 text-center">
        <SlideNumber n={15} />
        <h2 className="text-5xl font-bold text-brand-headline mb-6">{deck.thankYou.message}</h2>
        <p className="text-lg text-brand-text mb-10">{deck.thankYou.contactName}</p>
        <Link
          href="/app"
          className="rounded-md border border-zinc-200 px-6 py-2 text-sm font-medium text-brand-text hover:border-zinc-300"
        >
          ← Back to framework
        </Link>
      </section>
    </div>
  );
}

function SlideNumber({ n }: { n: number }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-widest text-zinc-300 mb-6">
      {n} / 15
    </p>
  );
}

function SlideLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-wide text-brand-text mb-4">
      {children}
    </p>
  );
}
