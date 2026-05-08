import type { Step } from "./framework-data";

export type StepContext = {
  stepNumber: number;
  stepDef: Step;
  userAnswers: Record<string, string>;
};

export type PriorStepContext = {
  stepNumber: number;
  title: string;
  answers: Record<string, string>;
  acceptedDesignMove: string;
};

export type PromptMessages = {
  system: string;
  user: string;
};

const SYSTEM_PROMPT = `You are a business transformation advisor helping solo founders redesign their businesses into exitable companies. Your framework has 16 steps that progressively transform a personal income source into a sellable business asset.

You work with all types of solo founders: coaches, consultants, doctors, creatives, service providers, and specialists. The photography business used in your training materials is purely illustrative — you adapt your advice to any industry.

Your tone is direct, confident, and specific. You don't give generic business advice. Every suggestion references the founder's actual situation.`;

function buildPriorContext(priorSteps: PriorStepContext[]): string {
  if (priorSteps.length === 0) {
    return "## Business context so far\nThis is the first step — no prior context yet.";
  }
  const entries = priorSteps
    .map(
      (p) =>
        `### Step ${p.stepNumber}: ${p.title}\nAnswers: ${JSON.stringify(p.answers)}\nAccepted design move: "${p.acceptedDesignMove}"`,
    )
    .join("\n\n");
  return `## Business context so far\n${entries}`;
}

export function buildStepPrompt(
  current: StepContext,
  priorSteps: PriorStepContext[],
): PromptMessages {
  const { stepNumber, stepDef, userAnswers } = current;

  const answersSection = stepDef.subQuestions
    .map((q) => `**${q.question}**\n${userAnswers[q.id] ?? "(not answered)"}`)
    .join("\n\n");

  const user = [
    buildPriorContext(priorSteps),
    "",
    `## Step ${stepNumber}: ${stepDef.title}`,
    "",
    "### What this step is about",
    stepDef.description,
    "",
    "### Framework example (photography business — illustrative only)",
    `Current state: "I am a photographer specializing in executive portraits."`,
    `Example design move: "${stepDef.designMoveExample}"`,
    `Example how-to: ${stepDef.howToDoItExample.join("; ")}`,
    "",
    "### This founder's answers",
    answersSection,
    "",
    "### Your task",
    "1. Write ONE design move sentence for this founder. It should:",
    "   - Sound like how a company (not a person) describes itself",
    "   - Be specific to their actual industry and clients",
    "   - Be punchy enough to open a pitch deck",
    '   - Follow the style: "We [verb] [specific offer] for [specific who]"',
    "",
    '2. Write 3–5 "How to do it" action items. They should:',
    "   - Be concrete and sequenced (what to do first, second, third)",
    "   - Reference this founder's actual situation, not generic advice",
    "   - Be implementable in the next 30 days",
    "",
    "Respond with valid JSON only:",
    '{ "designMove": "...", "howToDoIt": ["...", "...", "..."] }',
  ].join("\n");

  return { system: SYSTEM_PROMPT, user };
}

export function buildPitchPrompt(allSteps: PriorStepContext[]): string {
  const context =
    allSteps.length === 0
      ? "(no steps completed yet)"
      : allSteps
          .map(
            (p) =>
              `Step ${p.stepNumber} — ${p.title}\nAnswers: ${JSON.stringify(p.answers)}\nAccepted Design Move: ${p.acceptedDesignMove}`,
          )
          .join("\n\n");

  return [
    SYSTEM_PROMPT,
    "",
    "Generate a professional investor pitch deck as JSON matching the PitchDeckJSON schema (cover, problem, opportunityGap, opportunitySize, solution, operatingModel, valueCreation, businessModel, milestones, goToMarket, competitiveAdvantage, team, impact, ask, thankYou).",
    "Ground every slide in the founder's answers and accepted design moves below — no generic filler.",
    "Output JSON only.",
    "",
    "Founder context across 16 framework steps:",
    context,
  ].join("\n");
}
