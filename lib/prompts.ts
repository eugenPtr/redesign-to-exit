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
  prompts: Record<string, string> = {},
): PromptMessages {
  const { stepNumber, stepDef, userAnswers } = current;

  const answersSection = stepDef.subQuestions
    .map((q) => `**${q.question}**\n${userAnswers[q.id] ?? "(not answered)"}`)
    .join("\n\n");

  const taskInstructions =
    prompts["step_task_instructions"] ??
    [
      "1. Write ONE design move sentence for this founder. It should:",
      "   - Sound like how a company (not a person) describes itself",
      "   - Be specific to their actual industry and clients",
      "   - Be punchy enough to open a pitch deck",
      '   - Follow the style: "We [verb] [specific offer] for [specific who]"',
      "",
      '2. Write exactly 3 "How to do it" action items. Each must be 1–4 short sentences (max 30 words per item). They should:',
      "   - Be concrete and sequenced (what to do first, second, third)",
      "   - Reference this founder's actual situation, not generic advice",
      "",
      "Respond with valid JSON only:",
      '{ "designMove": "...", "howToDoIt": ["...", "...", "..."] }',
    ].join("\n");

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
    taskInstructions,
  ].join("\n");

  return { system: prompts["step_system"] ?? SYSTEM_PROMPT, user };
}

const PITCH_SYSTEM_PROMPT = `You are a pitch deck writer for a business transformation advisor firm. You are given a solo founder's complete 16-step business redesign — their original situation, their accepted design moves at each step, and their answers throughout. Your job is to write a concise, compelling investor pitch deck that tells a coherent exit story based entirely on what this founder has built.

Do not use generic filler. Every claim must be grounded in their actual answers.
Write as if this deck will be shown to serious investors or potential acquirers.`;

const PITCH_SCHEMA_DESCRIPTION = `STRICT LENGTH LIMITS — slide titles render at large display size, overflow = broken layout:
- cover.valueProposition: max 8 words
- cover.targetAudience: max 6 words
- problem.headline: max 8 words — punchy fragment, not a full sentence
- problem.facts[].headline: max 5 words
- problem.facts[].data: max 20 words
- opportunityGap.marketGap: max 8 words
- opportunityGap.bulletPoints[]: max 15 words each
- solution.solutionName: max 4 words (brand name only)
- solution.positioningPhrase: max 10 words
- solution.description: max 20 words
- solution.points[]: max 15 words each
- competitiveAdvantage.headline: max 8 words
- impact.vision: max 12 words
- ask.sectionTitle: max 5 words

{
  "cover": { "companyName": string, "valueProposition": string, "targetAudience": string, "founderName": string },
  "problem": { "headline": string, "clarifyingParagraph": string, "facts": [{ "headline": string, "data": string }] },
  "opportunityGap": { "marketGap": string, "supportingParagraph": string, "bulletPoints": string[] },
  "opportunitySize": { "tam": string, "sam": string, "som": string, "description": string },
  "marketGrowthDrivers": { "rows": [{ "trend": string, "marketEffect": string, "source": string }] },
  "solution": { "solutionName": string, "positioningPhrase": string, "description": string, "points": string[] },
  "operatingModel": { "columns": [{ "headline": string, "paragraph": string }] },
  "valueCreation": { "headline": string, "paragraph": string },
  "businessModel": { "points": string[] },
  "milestones": [{ "year": string, "objective": string }],
  "goToMarket": { "columns": [{ "headline": string, "points": string[] }] },
  "competitiveAdvantage": { "headline": string, "description": string },
  "team": { "members": [{ "name": string, "role": string, "points": string[] }] },
  "impact": { "points": string[], "vision": string },
  "ask": { "sectionTitle": string, "paragraph": string },
  "thankYou": { "message": string, "contactName": string, "contact": string, "date": string }
}`;

const SLIDE_STEP_MAPPING = `Slide-to-step mapping (use these steps as the primary source for each slide):
- cover: Steps 1, 2 (business identity, customer)
- problem: Steps 1, 2, 14 (current state before transformation, AI threat)
- opportunityGap: Steps 2, 10 (customer clarity, market expansion) — include 3 bullet points
- opportunitySize: Steps 1, 2, 10 (market data across steps) — include a short description sentence
- marketGrowthDrivers: Steps 14, 10 (AI threat, market timing) — 2-3 rows, each with a real trend, market effect, and source citation
- solution: Steps 3, 4, 11 — solutionName is the product/service brand name, positioningPhrase is a short tagline, description is 1 sentence, points are 5-6 feature bullets
- operatingModel: Steps 4, 5, 6 (delivery systems, founder role, team capacity) — exactly 3 columns
- valueCreation: Steps 7, 8, 9 (recurring revenue, transferable assets, reduced dependency)
- businessModel: Steps 3, 7, 15 — 4-6 bullet points covering revenue streams and traction evidence
- milestones: Steps 10, 11, 16 — exactly 4 milestones with years (e.g. 2026, 2028, 2030, 2035+)
- goToMarket: Steps 2, 6, 13 — exactly 5 columns with 4-5 points each
- competitiveAdvantage: Steps 8, 14 (transferable assets, AI defensibility)
- team: Steps 5, 6 — each member gets 4-5 bio bullet points instead of a description paragraph
- impact: Steps 11, 15 — exactly 3 impact points, vision is a short aspirational statement
- ask: Step 16 — sectionTitle is the funding round name, paragraph covers use of funds and return expectation
- thankYou: Step 1 — contact is email/phone, date is the current month and year`;

export function buildPitchPrompt(
  allSteps: PriorStepContext[],
  prompts: Record<string, string> = {},
): PromptMessages {
  const context =
    allSteps.length === 0
      ? "(no steps completed yet)"
      : allSteps
          .map(
            (p) =>
              `### Step ${p.stepNumber}: ${p.title}\nDesign move: "${p.acceptedDesignMove}"\nKey answers: ${JSON.stringify(p.answers)}`,
          )
          .join("\n\n");

  const user = [
    "## Founder context across 16 framework steps",
    "",
    context,
    "",
    prompts["slide_step_mapping"] ?? SLIDE_STEP_MAPPING,
    "",
    "## Output schema",
    "Return ONLY a valid JSON object matching this exact schema. No markdown, no explanation, no extra text.",
    "",
    PITCH_SCHEMA_DESCRIPTION,
  ].join("\n");

  return { system: prompts["pitch_system"] ?? PITCH_SYSTEM_PROMPT, user };
}
