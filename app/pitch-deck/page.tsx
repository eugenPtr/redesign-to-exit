"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getState } from "@/lib/state";
import { PitchDeckSchema } from "@/lib/pitch-schema";
import type { PitchDeckJSON } from "@/lib/pitch-schema";
import { Slide01Cover } from "@/components/slides/Slide01Cover";
import { Slide02Problem } from "@/components/slides/Slide02Problem";
import { Slide03MarketGap } from "@/components/slides/Slide03MarketGap";
import { Slide04MarketOpportunity } from "@/components/slides/Slide04MarketOpportunity";
import { Slide05GrowthDrivers } from "@/components/slides/Slide05GrowthDrivers";
import { Slide06SolutionIntro } from "@/components/slides/Slide06SolutionIntro";
import { Slide07SolutionDetail } from "@/components/slides/Slide07SolutionDetail";
import { Slide08OperatingModel } from "@/components/slides/Slide08OperatingModel";
import { Slide09ValueCreation } from "@/components/slides/Slide09ValueCreation";
import { Slide10RevenueStreams } from "@/components/slides/Slide10RevenueStreams";
import { Slide11Milestones } from "@/components/slides/Slide11Milestones";
import { Slide12GoToMarket } from "@/components/slides/Slide12GoToMarket";
import { Slide13CompetitiveLandscape } from "@/components/slides/Slide13CompetitiveLandscape";
import { Slide14Team } from "@/components/slides/Slide14Team";
import { Slide15Impact } from "@/components/slides/Slide15Impact";
import { Slide16Ask } from "@/components/slides/Slide16Ask";
import { Slide17ThankYou } from "@/components/slides/Slide17ThankYou";

export default function PitchDeckPage() {
  const router = useRouter();
  const [deck, setDeck] = useState<PitchDeckJSON | null>(null);

  useEffect(() => {
    const state = getState();
    if (!state.pitchDeck) {
      router.replace("/");
      return;
    }
    const result = PitchDeckSchema.safeParse(state.pitchDeck);
    if (!result.success) {
      router.replace("/");
      return;
    }
    setDeck(result.data);
  }, [router]);

  if (!deck) return null;

  const cn = deck.cover.companyName;

  return (
    <>
      <div className="h-screen overflow-y-scroll snap-y snap-mandatory">
        <Slide01Cover data={deck.cover} />
        <Slide02Problem data={deck.problem} companyName={cn} />
        <Slide03MarketGap data={deck.opportunityGap} companyName={cn} />
        <Slide04MarketOpportunity data={deck.opportunitySize} companyName={cn} />
        <Slide05GrowthDrivers data={deck.marketGrowthDrivers} companyName={cn} />
        <Slide06SolutionIntro data={deck.solution} companyName={cn} />
        <Slide07SolutionDetail data={deck.solution} companyName={cn} />
        <Slide08OperatingModel data={deck.operatingModel} />
        <Slide09ValueCreation data={deck.valueCreation} companyName={cn} />
        <Slide10RevenueStreams data={deck.businessModel} companyName={cn} />
        <Slide11Milestones data={deck.milestones} companyName={cn} />
        <Slide12GoToMarket data={deck.goToMarket} companyName={cn} />
        <Slide13CompetitiveLandscape data={deck.competitiveAdvantage} companyName={cn} />
        <Slide14Team data={deck.team} companyName={cn} />
        <Slide15Impact data={deck.impact} companyName={cn} />
        <Slide16Ask data={deck.ask} companyName={cn} />
        <Slide17ThankYou data={deck.thankYou} companyName={cn} />
      </div>

      <Link
        href="/app"
        className="fixed bottom-4 left-4 text-[0.65rem] text-gray-300 hover:text-gray-500 z-50 transition-colors"
      >
        ← Back to framework
      </Link>
    </>
  );
}
