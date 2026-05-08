# 04 — Pitch Deck

Status: ready-for-agent

## What to build

After all 16 steps are complete, generate and render a shareable investor pitch deck grounded in the founder's actual answers and accepted design moves.

---

### Generate Button

Appears on the home/dashboard view only when all 16 steps have `completedAt` set in state. On click, calls `/api/pitch` and shows a loading state. On success, saves to state and navigates to `/pitch-deck`.

---

### `buildPitchPrompt` in `lib/prompts.ts`

The stub from Issue 01 gets its full implementation here. The prompt must:

**System role:**
```
You are a pitch deck writer for a business transformation advisor firm. You are given a solo founder's complete 16-step business redesign — their original situation, their accepted design moves at each step, and their answers throughout. Your job is to write a concise, compelling investor pitch deck that tells a coherent exit story based entirely on what this founder has built.

Do not use generic filler. Every claim must be grounded in their actual answers.
Write as if this deck will be shown to serious investors or potential acquirers.
```

**Context block:** all 16 steps formatted as:
```
### Step N: [Title]
Design move: "[accepted move]"
Key answers: [structured key-value of their answers]
```

**Output instruction:**
```
Return ONLY a valid JSON object matching this exact schema. No markdown, no explanation, no extra text.
```

Then include the full `PitchDeckJSON` schema so the LLM knows the exact structure.

**Slide-to-step mapping** (inform the LLM which steps feed which slides):
- Cover: Steps 1, 2 (business identity, customer)
- Problem: Steps 1, 2, 14 (current state before transformation, AI threat)
- Opportunity Gap: Steps 2, 10 (customer clarity, market expansion)
- Opportunity Size (TAM/SAM/SOM): Steps 1, 2, 10 (market data across steps)
- Solution: Steps 3, 4, 11 (productized offer, delivery systems, scalable layer)
- Operating Model: Steps 4, 5, 6 (delivery systems, founder role, team capacity)
- Value Creation: Steps 7, 8, 9 (recurring revenue, transferable assets, reduced dependency)
- Business Model & Traction: Steps 3, 7, 15 (productized offers, recurring revenue, KPIs)
- Milestones: Steps 10, 11, 16 (expansion, platform, ask milestones)
- Go-to-Market: Steps 2, 6, 13 (customer clarity, team, investor/partnerships)
- Competitive Advantage: Steps 8, 14 (transferable assets, AI defensibility)
- Team: Steps 5, 6 (founder role, team capacity)
- Impact: Steps 11, 15 (scalable layer, long-term performance)
- Ask: Step 16 (the ask)
- Thank You: Step 1 (founder name/company)

---

### Zod Schema (`lib/pitch-schema.ts`)

```typescript
import { z } from 'zod'

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
    members: z.array(z.object({ name: z.string(), role: z.string(), description: z.string() })),
  }),
  impact: z.object({ points: z.array(z.string()), vision: z.string() }),
  ask: z.object({ amount: z.string(), useOfFunds: z.string(), paragraph: z.string() }),
  thankYou: z.object({ message: z.string(), contactName: z.string() }),
})

export type PitchDeckJSON = z.infer<typeof PitchDeckSchema>
```

Use in `/api/pitch` route: `PitchDeckSchema.parse(JSON.parse(rawOutput))` — throws with a clear error on bad LLM output.

---

### `/api/pitch` Route

POST handler:
1. Receive `{ allSteps: PriorStepContext[] }`
2. Call `buildPitchPrompt(allSteps)`
3. Call `callPitchGenerator(prompt)`
4. Parse and validate: `PitchDeckSchema.parse(JSON.parse(rawOutput))`
5. Return validated JSON

On Zod parse failure, return 422 with the validation error message — not a 500.

---

### `/pitch-deck` Route (`app/pitch-deck/page.tsx`)

Reads `pitchDeck` from state. If null, redirect to `/`. Otherwise renders 15 slides as full-screen snap-scroll sections.

**Slide order and content mapping:**

| # | Slide | Key content fields |
|---|-------|--------------------|
| 1 | Cover | `companyName`, `valueProposition`, `targetAudience`, `founderName` |
| 2 | Problem | `headline`, `clarifyingParagraph`, `facts[]` (stat cards) |
| 3 | Opportunity Gap | `marketGap`, `supportingParagraph` |
| 4 | Opportunity Size | TAM / SAM / SOM as three stat blocks |
| 5 | Solution | `description`, `points[]` as bullet list |
| 6 | Operating Model | `columns[]` as side-by-side panels |
| 7 | Value Creation | `headline` large, `paragraph` below |
| 8 | Business Model & Traction | `revenueStreams`, `tractionEvidence` |
| 9 | Milestones | `milestones[]` as timeline |
| 10 | Go-to-Market | `columns[]` as side-by-side panels with bullets |
| 11 | Competitive Advantage | `headline` large, `description` |
| 12 | Team | `members[]` as cards with name, role, description |
| 13 | Impact | `points[]` as bullets, `vision` statement |
| 14 | Ask | `amount` large, `useOfFunds`, `paragraph` |
| 15 | Thank You | `message`, `contactName` |

**Styling:**
- Each slide: `min-h-screen`, `snap-start`, `scroll-snap-type: y mandatory` on container
- Headings and key stats: `brand-headline` (`#3924D9`)
- Body copy: `brand-text` (`#5E5E5E`)
- Backgrounds: `brand-bg` (`#FFFFFF`)
- Clean, minimal — professional enough to share with investors

No LLM calls at render time. Pure read from state.

---

## Acceptance criteria

- [ ] Generate button appears only after all 16 steps have `completedAt` in state
- [ ] `/api/pitch` validates output with Zod schema; returns 422 with clear error on bad LLM output
- [ ] `lib/pitch-schema.ts` exports `PitchDeckSchema` and `PitchDeckJSON` type
- [ ] `/pitch-deck` renders all 15 slides with correct titles and typed content fields
- [ ] Snap-scroll works — one slide per full viewport, scroll snaps between slides
- [ ] Brand colors applied across all slides
- [ ] `/pitch-deck` redirects to `/` if `pitchDeck` is null in state
- [ ] No LLM call on `/pitch-deck` render
- [ ] `pnpm build` passes with no type errors

## Blocked by

- `03-steps-2-16-data-and-prompts.md`
