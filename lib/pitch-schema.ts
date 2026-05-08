import { z } from "zod";

export const PitchDeckSchema = z.object({
  cover: z.object({
    companyName: z.string(),
    valueProposition: z.string(),
    targetAudience: z.string(),
    founderName: z.string(),
  }),
  problem: z.object({
    headline: z.string(),
    clarifyingParagraph: z.string(),
    facts: z.array(z.object({ headline: z.string(), data: z.string() })),
  }),
  opportunityGap: z.object({
    marketGap: z.string(),
    supportingParagraph: z.string(),
  }),
  opportunitySize: z.object({ tam: z.string(), sam: z.string(), som: z.string() }),
  solution: z.object({ description: z.string(), points: z.array(z.string()) }),
  operatingModel: z.object({
    columns: z.array(z.object({ headline: z.string(), paragraph: z.string() })),
  }),
  valueCreation: z.object({ headline: z.string(), paragraph: z.string() }),
  businessModel: z.object({ revenueStreams: z.string(), tractionEvidence: z.string() }),
  milestones: z.array(z.object({ year: z.string(), objective: z.string() })),
  goToMarket: z.object({
    columns: z.array(z.object({ headline: z.string(), points: z.array(z.string()) })),
  }),
  competitiveAdvantage: z.object({ headline: z.string(), description: z.string() }),
  team: z.object({
    members: z.array(
      z.object({ name: z.string(), role: z.string(), description: z.string() }),
    ),
  }),
  impact: z.object({ points: z.array(z.string()), vision: z.string() }),
  ask: z.object({ amount: z.string(), useOfFunds: z.string(), paragraph: z.string() }),
  thankYou: z.object({ message: z.string(), contactName: z.string() }),
});

export type PitchDeckJSON = z.infer<typeof PitchDeckSchema>;
