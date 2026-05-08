# Issues: Pitch Deck Template Replica

> All issues belong to the same feature. Implement in order — later issues depend on earlier ones.

---

## Issue 1: Add `lucide-react` dependency

**Type:** chore

Install `lucide-react` for operating model slide icons (Lightbulb, Cloud, Trophy).

**Acceptance:** `import { Lightbulb } from "lucide-react"` compiles without error.

---

## Issue 2: Swap font from Geist Sans to DM Sans

**Type:** improvement

- Replace `Geist` import with `DM_Sans` in `app/layout.tsx`, loading weights 300–700.
- Update the CSS font variable in `app/globals.css` to point to the new font variable.
- Verify font loads in dev browser.

**Acceptance:** App renders with DM Sans at all weights. No Geist font loaded.

---

## Issue 3: Update PitchDeckSchema to match template

**Type:** improvement

Update `lib/pitch-schema.ts` with the following changes:

- `opportunityGap`: add `bulletPoints: z.array(z.string())`
- `opportunitySize`: add `description: z.string()`
- Add top-level `marketGrowthDrivers: z.object({ rows: z.array(z.object({ trend, marketEffect, source })) })`
- `solution`: add `solutionName: z.string()` and `positioningPhrase: z.string()`
- `businessModel`: replace `revenueStreams: string` and `tractionEvidence: string` with `points: z.array(z.string())`
- `team.members`: replace `description: string` with `points: z.array(z.string())`
- `ask`: replace `amount`, `useOfFunds`, `paragraph` with `sectionTitle: z.string()` and `paragraph: z.string()`
- `thankYou`: add `contact: z.string()` and `date: z.string()`
- Remove `icon` from `operatingModel.columns` (icons hardcoded by index)

**Acceptance:** `PitchDeckSchema.parse(validObject)` succeeds. `PitchDeckSchema.parse(invalidObject)` throws with a clear Zod error.

---

## Issue 4: Update AI pitch prompt to match new schema

**Type:** improvement

Update `lib/prompts.ts`:

- Replace `PITCH_SCHEMA_DESCRIPTION` constant with the updated schema shape (matching Issue 3).
- Add `marketGrowthDrivers` to `SLIDE_STEP_MAPPING` (Steps 14, 10 — AI threat, market timing).
- Update guidance for `solution` to reflect two new fields (`solutionName`, `positioningPhrase`).
- Update guidance for `businessModel`, `team`, `ask`, `thankYou` to reflect new field shapes.
- Instruct the model to generate 2–3 rows for `marketGrowthDrivers.rows` with real trend names, market effects, and credible sources.

**Acceptance:** Calling `buildPitchPrompt(steps)` returns a prompt string that mentions all new fields. The existing pitch generation API route produces valid JSON against the new schema.

---

## Issue 5: Build `SlideWrapper` shared component

**Type:** feature

Create `components/slides/SlideWrapper.tsx`:

- Outer `<section>`: `w-screen h-screen snap-start flex items-center justify-center overflow-hidden bg-white`
- Inner slide div: width `min(100vw, calc(100vh * 16 / 9))`, height `min(100vh, calc(100vw * 9 / 16))`, `relative overflow-hidden bg-white`
- Optional `companyName` prop: when provided, renders small blue label centered at ~5% from top
- Children rendered inside the inner div

**Acceptance:** Slide container maintains 16:9 ratio at 1440×900 and 1920×1080 viewports. Content does not overflow.

---

## Issue 6: Build CoverSlide

**Type:** feature

Props: `cover: PitchDeckJSON["cover"]`

Layout (all absolute within 16:9 container):
- Company name: top-center, ~5% from top, small blue
- Value proposition: ~50% from top, ~7% from left, `~text-[5.5vw]` font-light blue
- Target audience ("For whom"): immediately below VP, ~68%, same left, `~text-[3.5vw]` font-light gray
- Founder name: ~90% from top, ~7% from left, small gray

**Acceptance:** Visual matches PDF page 1.

---

## Issue 7: Build ProblemSlide

**Type:** feature

Props: `problem: PitchDeckJSON["problem"]`

Layout:
- No company name (unique for this slide)
- Left ~66% white panel: spaced label "PROBLEM STATEMENT" top-left, large blue headline filling ~20–75% vertical, small gray clarifying paragraph at ~75%
- Right ~34% full blue panel (`bg-brand-headline`): "Facts" white label, 3 numbered items (01/02/03) each with large number, bold headline, and data text — all white

**Acceptance:** Visual matches PDF page 2.

---

## Issue 8: Build MarketGapSlide

**Type:** feature

Props: `opportunityGap: PitchDeckJSON["opportunityGap"]`, `companyName: string`

Layout:
- Company name top-center
- Left ~40%: "THE OPPORTUNITY" label, large blue "market gap" headline, bold supporting paragraph, bullet list
- Right ~55%: bordered placeholder box centered vertically

**Acceptance:** Visual matches PDF page 3.

---

## Issue 9: Build MarketOpportunitySlide + TAMSAMSOMChart

**Type:** feature

Props: `opportunitySize: PitchDeckJSON["opportunitySize"]`, `companyName: string`

Two sub-components:

**`TAMSAMSOMChart`** — pure SVG component:
- Three concentric circles (TAM outermost gray stroke, SAM middle blue stroke, SOM innermost teal stroke)
- Labels positioned inside each ring: "TAM: {value}", "SAM: {value}", "SOM: {value}"
- No external dependencies

**`MarketOpportunitySlide`** — layout:
- Company name top-center
- Left ~40%: "THE OPPORTUNITY" label, large blue "market opportunity" headline, short description text
- Right ~55%: `TAMSAMSOMChart` centered

**Acceptance:** Visual matches PDF page 4. Three circles visible with correct stroke colors and labels.

---

## Issue 10: Build MarketGrowthDriversSlide + GrowthDriversTable

**Type:** feature

Props: `marketGrowthDrivers: PitchDeckJSON["marketGrowthDrivers"]`, `companyName: string`

Two sub-components:

**`GrowthDriversTable`** — pure table component:
- Gray header row: Trend | Market Effect | Source
- Data rows with alternating light gray background
- No borders, clean minimal style

**`MarketGrowthDriversSlide`** — layout:
- Company name top-center
- Left ~40%: "WHY NOW" label, large blue "market growth drivers" headline
- Right ~55%: `GrowthDriversTable` positioned ~20% from top

**Acceptance:** Visual matches PDF page 5. Table rows and headers visible.

---

## Issue 11: Build SolutionIntroSlide

**Type:** feature

Props: `solution: PitchDeckJSON["solution"]`, `companyName: string`

Layout:
- Company name top-center
- Left ~40%: "OUR SOLUTION" label, large blue `solutionName`, gray `positioningPhrase`
- Right ~55%: `points` listed as plain text items, vertically centered

**Acceptance:** Visual matches PDF page 6.

---

## Issue 12: Build SolutionDetailSlide

**Type:** feature

Props: `solution: PitchDeckJSON["solution"]`, `companyName: string`

Layout:
- Company name top-center (small, just below top edge)
- "OUR SOLUTION" label ~9% from top
- `description` as full-width large blue headline ~12–25%
- Bottom half split: left `points` as plain bullet list, right bordered image placeholder

**Acceptance:** Visual matches PDF page 7.

---

## Issue 13: Build OperatingModelSlide

**Type:** feature

Props: `operatingModel: PitchDeckJSON["operatingModel"]`, expects exactly 3 columns

Layout:
- No company name header
- "OUR OPERATING MODEL" spaced label top-left
- 3 equal-width full-height columns
  - Column 0 and 2: white background, blue headline and paragraph text
  - Column 1 (center): `bg-brand-headline`, white headline and paragraph text
  - Each column: Lucide icon (Lightbulb / Cloud / Trophy by index) in a circle, then headline, then paragraph
  - Icon circle: outlined circle ring around icon, white stroke on blue bg, blue stroke on white bg

**Acceptance:** Visual matches PDF page 8.

---

## Issue 14: Build ValueCreationSlide

**Type:** feature

Props: `valueCreation: PitchDeckJSON["valueCreation"]`, `companyName: string`

Layout:
- Company name top-center
- Left ~40%: "OUR SOLUTION" label, large blue multi-line `headline`, gray `paragraph`
- Right ~55%: bordered chart placeholder centered

**Acceptance:** Visual matches PDF page 9.

---

## Issue 15: Build RevenueStreamsSlide

**Type:** feature

Props: `businessModel: PitchDeckJSON["businessModel"]`, `companyName: string`

Layout:
- Company name top-center
- Left ~40%: "BUSINESS MODEL" label, large blue multi-line "revenue streams & traction" display headline
- Right ~55%: `points` as bullet list with `·` prefix, small gray text, vertically centered

**Acceptance:** Visual matches PDF page 10.

---

## Issue 16: Build MilestonesSlide

**Type:** feature

Props: `milestones: PitchDeckJSON["milestones"]`, `companyName: string`

Layout:
- Company name top-center
- Top ~50% white: "KEY MILESTONES" label, large blue "from MVP to Scale"
- Bottom ~50% `bg-brand-headline`: 4 equally spaced columns
  - Each: year as large white text (~`text-[6vw]`), objective as small white text below
  - Last column (index 3) year rendered in teal (`text-[#4AE5C8]`)

**Acceptance:** Visual matches PDF page 11.

---

## Issue 17: Build GoToMarketSlide

**Type:** feature

Props: `goToMarket: PitchDeckJSON["goToMarket"]`, `companyName: string`

Layout:
- Company name top-center
- "GO TO MARKET" label ~12%
- Large blue "a lean growth strategy" headline ~15–30%
- Below ~35%: columns displayed in a CSS grid — first 3 fill row 1, remaining fill row 2
  - Each column: bold dark headline, plain text items below

**Acceptance:** Visual matches PDF page 12.

---

## Issue 18: Build CompetitiveLandscapeSlide

**Type:** feature

Props: `competitiveAdvantage: PitchDeckJSON["competitiveAdvantage"]`, `companyName: string`

Layout:
- Company name top-center
- Left ~40%: "COMPETITIVE ADVANTAGE" label, large blue `headline`, gray `description`
- Right ~55%: bordered chart placeholder

**Acceptance:** Visual matches PDF page 13.

---

## Issue 19: Build TeamSlide

**Type:** feature

Props: `team: PitchDeckJSON["team"]`, `companyName: string`

Layout:
- Company name top-center
- "OUR TEAM" label, large blue "Team" headline
- 3 columns below: each with a circle avatar placeholder (gray outlined), bold `name`, role, then `points` as plain text lines

**Acceptance:** Visual matches PDF page 14.

---

## Issue 20: Build ImpactSlide

**Type:** feature

Props: `impact: PitchDeckJSON["impact"]`, `companyName: string`

Layout:
- Company name top-center
- Left ~45%: "THE IMPACT" label, then 3 numbered items — each with large blue number (01/02/03, `~text-[5vw]` font-light) and short phrase to the right
- Right ~55%: tall gray placeholder box occupying ~80% of slide height; blue overlay div at bottom-right with `vision` text in white

**Acceptance:** Visual matches PDF page 15.

---

## Issue 21: Build AskSlide

**Type:** feature

Props: `ask: PitchDeckJSON["ask"]`, `companyName: string`

Layout:
- Company name top-center
- "ASK" label ~10%
- Large blue "Financials & Funding ask" display headline ~12–28%
- Bold `sectionTitle` ~42%
- Gray `paragraph` text ~47–55%

**Acceptance:** Visual matches PDF page 16.

---

## Issue 22: Build ThankYouSlide

**Type:** feature

Props: `thankYou: PitchDeckJSON["thankYou"]`

Layout (no company name header, no label):
- Large blue `message` ~40–60%, left-aligned at ~18% from left
- `contactName` small gray ~65%, same left
- `contact` small gray ~69%, same left
- `date` very small gray, bottom-center ~93%

**Acceptance:** Visual matches PDF page 17.

---

## Issue 23: Rewrite PitchDeckPage orchestrator

**Type:** improvement

Rewrite `app/pitch-deck/page.tsx` as a thin orchestrator:

- Remove all inline slide JSX
- Import all 17 slide components
- Wrap in `<div className="h-screen overflow-y-scroll snap-y snap-mandatory">`
- Render slides in order, passing only required props from `deck`
- Remove `SlideNumber` and `SlideLabel` helper functions

**Acceptance:** All 17 slides render in sequence. Scroll-snap transitions between slides.
