# PRD: Pitch Deck Template Replica

## Problem Statement

The generated pitch deck bears no visual resemblance to the GIA pitch deck template. The current implementation centers all content, uses incorrect slide proportions, lacks colored panel layouts, applies wrong typography scale, and shows slide counters not present in the template. Founders using the app receive a deck that is structurally and visually incoherent — not something they can show investors.

## Solution

Rebuild the pitch deck renderer as a strict 1:1 replica of the 17-slide GIA template. Each slide is a fixed 16:9 container with template-faithful layout: left-aligned display type, colored panels (blue right column, blue bottom half, blue center column), company name top-center, spaced uppercase section labels, and DM Sans light-weight font. Data-driven charts (TAM/SAM/SOM concentric circles, growth drivers table) replace chart placeholders. The Zod schema and AI prompt are updated to produce data that maps exactly to the new slide structures.

## User Stories

1. As a founder, I want the pitch deck to match the GIA template proportions exactly, so that I can show it to investors without redesigning it.
2. As a founder, I want each slide to be 16:9, so that the deck looks correct in fullscreen presentation mode.
3. As a founder, I want the cover slide to show my company name at the top center, my value proposition as a large display headline, and my name at the bottom left, so that the opening slide has the same impact as the template.
4. As a founder, I want the problem slide to have a white left panel with my headline and a blue right panel with three numbered facts, so that key statistics are visually highlighted.
5. As a founder, I want the market gap slide to show my headline on the left with bullet points and a chart placeholder on the right, so that the layout matches the template.
6. As a founder, I want the market opportunity slide to display TAM/SAM/SOM as SVG concentric circles on the right side, so that investors can immediately grasp market size visually.
7. As a founder, I want the market growth drivers slide to show a table with Trend, Market Effect, and Source columns, so that the "why now" argument is presented structurally.
8. As a founder, I want two solution slides — one introducing the solution name and positioning, one detailing the description — so that the solution section gets enough depth.
9. As a founder, I want the operating model slide to show three equal columns (with the center column in blue) each containing a circle icon, headline, and paragraph, so that the three pillars are visually distinguished.
10. As a founder, I want the value creation slide to show my process headline on the left and a chart placeholder on the right, so that the layout matches the template.
11. As a founder, I want the revenue streams slide to show my bullet points on the right side of a large display headline, so that the business model information is scannable.
12. As a founder, I want the milestones slide to split into a white top half with the section headline and a blue bottom half with four milestone years, so that the timeline has visual weight.
13. As a founder, I want the last milestone year to appear in teal, so that the scale stage is visually distinct.
14. As a founder, I want the go-to-market slide to show a full-width headline above a 3+2 column grid of strategy categories, so that all channels are visible at a glance.
15. As a founder, I want the competitive landscape slide to show my headline on the left and a chart placeholder on the right, so that I have space to add a competitive matrix.
16. As a founder, I want the team slide to show three members each with a circle avatar placeholder, bold name, role, and bullet points, so that investor introductions are structured.
17. As a founder, I want the impact slide to show three numbered items on the left and a photo placeholder with a blue vision overlay on the right, so that the aspirational message has visual power.
18. As a founder, I want the ask slide to show "Financials & Funding ask" as the display headline with a section title and paragraph below, so that the funding request is clearly framed.
19. As a founder, I want the thank you slide to show my message, name, contact, and a confidentiality line at the bottom, so that the deck closes professionally.
20. As a founder, I want the company name to appear at the top center of every slide (except cover, problem, and operating model), so that the deck is branded throughout.
21. As a founder, I want each slide section to have an uppercase spaced label (e.g. "THE OPPORTUNITY", "WHY NOW"), so that the slide category is immediately identifiable.
22. As a founder, I want the deck to use DM Sans at light weight for display headings, so that the typography matches the template's thin geometric style.
23. As a founder, I want slides to scroll with snap behavior, so that navigation between slides feels like a real presentation.
24. As a founder, I want no slide counter visible, so that the presentation is clean and uncluttered.
25. As a founder, I want the AI to generate data that matches the new slide schema exactly, so that all new slide fields are populated with meaningful content.

## Implementation Decisions

### 1. Slide container: fixed 16:9 aspect ratio

Each slide uses a container sized as:
- `width: min(100vw, calc(100vh * 16 / 9))`
- `height: min(100vh, calc(100vw * 9 / 16))`

This correctly letterboxes on non-16:9 viewports without distorting content. The outer wrapper is `w-screen h-screen` with scroll-snap. Typography uses `vw`-based arbitrary Tailwind values (e.g. `text-[5.5vw]`) so it scales proportionally with slide width on standard landscape monitors.

### 2. Font: DM Sans replacing Geist Sans

DM Sans loaded via `next/font/google` at weights 300, 400, 500, 600, 700. Display headings use weight 300 (light) to match the template's thin geometric aesthetic. The CSS font variable is updated globally.

### 3. Slide components: one file per slide

17 slide components in `components/slides/`, each receiving only the slice of `PitchDeckJSON` it needs. A shared `SlideWrapper` component handles the 16:9 container, company name placement, and scroll-snap section.

### 4. Schema changes

The Zod schema (`PitchDeckSchema`) is updated as follows:

```
opportunityGap:    + bulletPoints: string[]
opportunitySize:   + description: string
marketGrowthDrivers: NEW { rows: { trend, marketEffect, source }[] }
solution:          + solutionName: string
                   + positioningPhrase: string
                   (existing description + points kept for slide 7)
operatingModel.columns: icon field removed (hardcoded per column index)
businessModel:     revenueStreams: string → points: string[]
                   tractionEvidence removed (merged into points)
team.members:      description: string → points: string[]
ask:               amount + useOfFunds + paragraph → sectionTitle + paragraph
thankYou:          + contact: string
                   + date: string
```

### 5. Operating model icons

Icons are hardcoded to column index (0 = Lightbulb, 1 = Cloud, 2 = Trophy) using Lucide React. No icon field in schema — avoids requiring AI to know valid icon names.

### 6. Data-driven charts

- **TAM/SAM/SOM**: SVG concentric circles, three nested `<circle>` elements. Sizes are fixed ratios (TAM 45% radius, SAM 32%, SOM 20% of container). Labels come from schema strings.
- **Growth drivers table**: HTML table with gray header row and alternating gray data rows. Column headers are hardcoded (Trend, Market Effect, Source). Data from `marketGrowthDrivers.rows`.
- **All other "chart/image" placeholder slots**: styled bordered box with placeholder text.

### 7. AI prompt update

`PITCH_SCHEMA_DESCRIPTION` in `prompts.ts` is updated to reflect the new schema shape. Guidance added for `marketGrowthDrivers` rows (2–3 rows, each with real trend, effect, and source). Slide-to-step mapping updated to include `marketGrowthDrivers: Steps 14, 10 (AI threat, market timing)`.

### 8. Navigation

No visible navigation UI. Scroll-snap handles slide transitions. Company name is the only persistent chrome element.

## Testing Decisions

Good tests verify external behavior against a known input — not implementation details like class names or DOM structure.

**Modules to test:**

- **PitchDeckSchema** — validate that valid AI-generated JSON parses without error; validate that missing required fields (e.g. absent `marketGrowthDrivers`) fail with a clear Zod error message.
- **TAMSAMSOMChart** — given `{ tam: "$1B", sam: "$200M", som: "$50M" }`, verify that three circles render and labels appear in the output.
- **GrowthDriversTable** — given two rows, verify that all six cell values appear in the rendered output.

No prior test art exists in the codebase — these would be the first tests.

## Out of Scope

- Image upload for solution/impact slides (only styled placeholder boxes for image slots)
- AI-generated or stock images
- PDF export or print stylesheet
- Slide editing / live editing of generated content
- Animated slide transitions (beyond CSS scroll-snap)
- Mobile / portrait viewport support
- Keyboard navigation between slides

## Further Notes

- The template PDF is 17 pages. Current implementation has 15 slides. Two new slides are added: **Market Growth Drivers** (WHY NOW table) and the **Solution** is split into two slides (intro + detail), bringing total to 17.
- `lucide-react` must be added as a dependency for operating model icons.
- The pitch deck page is client-rendered (`"use client"`) and reads from in-memory state — no server changes required.
- The `marketGrowthDrivers` addition is the only new top-level key in the schema; all other changes are field-level modifications within existing keys.
