# 01 — Modular Scaffold

Status: ready-for-agent

## What to build

Wire the application skeleton so every future slice slots in without structural changes. No step data yet — just the architecture and types.

---

### Framework Data Module (`lib/framework-data.ts`)

Define the `Step` type and export an empty `STEPS: Step[]` array. The type must accommodate all framework columns — future issues fill the data:

```typescript
type SubQuestion = {
  id: string
  question: string
  placeholder: string  // shows optimal answer format
}

type Step = {
  number: number
  title: string
  description: string         // why this step matters
  subQuestions: SubQuestion[]
  designMoveExample: string   // photography example from framework (LLM inspiration, not template)
  howToDoItExample: string[]  // photography example action items from framework
  exitImpact: string          // e.g. "From person → company", "✅ Transferable ops"
  pitchSlide: string          // which pitch deck slide this feeds
}

export const STEPS: Step[] = []  // filled in issues 02 and 03
```

---

### Prompts Module (`lib/prompts.ts`)

Two exported functions with final signatures. Implementations can be stubs. Structure and types must be final:

```typescript
type StepContext = {
  stepNumber: number
  stepDef: Step
  userAnswers: Record<string, string>   // questionId → answer
}

type PriorStepContext = {
  stepNumber: number
  title: string
  answers: Record<string, string>
  acceptedDesignMove: string
}

export function buildStepPrompt(
  current: StepContext,
  priorSteps: PriorStepContext[]
): string

export function buildPitchPrompt(
  allSteps: PriorStepContext[]
): string
```

**Prompt design principles** (encode these in the final implementation in issue 02, stub here):
- System prompt role: business transformation advisor helping solo founders redesign their business into an exitable company
- The photography business in `designMoveExample` is illustrative only — the LLM must adapt to any industry
- Design move output: one punchy sentence in the style of the framework examples (e.g. "We are a premium X for Y and Z")
- How-to output: 3–5 concrete action items specific to the user's actual answers, not generic advice
- Cumulative context: all prior accepted design moves pass through so advice is coherent and builds on previous steps

---

### State Manager (`lib/state.ts`)

Typed localStorage wrapper under key `gia-design-to-exit-state`:

```typescript
type StepState = {
  answers: Record<string, string>
  designMove: string
  howToDoIt: string[]
  completedAt: string   // ISO timestamp
}

type AppState = {
  steps: Record<number, StepState>
  pitchDeck: PitchDeckJSON | null
}

export function getState(): AppState
export function saveStepState(stepNum: number, payload: Omit<StepState, 'completedAt'>): void
export function savePitchDeck(json: PitchDeckJSON): void
export function resetState(): void
```

---

### LLM Client (`lib/llm-client.ts`)

Thin Anthropic SDK wrapper — server-side only, never in client bundle:

```typescript
export async function callStepAdvisor(
  prompt: string
): Promise<{ designMove: string; howToDoIt: string[] }>

export async function callPitchGenerator(
  prompt: string
): Promise<string>  // raw JSON string, validated in API route
```

Model: `claude-sonnet-4-6`. API key from `ANTHROPIC_API_KEY` env var.

---

### API Routes

**`app/api/step/route.ts`** (POST):
- Body: `{ stepNumber, currentAnswers, priorContext }`
- Calls `buildStepPrompt` + `callStepAdvisor`
- Returns `{ designMove: string, howToDoIt: string[] }`

**`app/api/pitch/route.ts`** (POST):
- Body: `{ allSteps: PriorStepContext[] }`
- Calls `buildPitchPrompt` + `callPitchGenerator`
- Returns raw JSON (validated in issue 04)

---

### Tailwind Config (`tailwind.config.ts`)

```typescript
colors: {
  'brand-bg': '#FFFFFF',
  'brand-headline': '#3924D9',
  'brand-text': '#5E5E5E',
}
```

---

### App Shell

**Root layout** (`app/layout.tsx`): sidebar + main content area side by side.

**Sidebar** (`components/Sidebar.tsx`):
- Reads `STEPS` array and `getState()`
- Step states: locked (grey, not clickable), active (highlighted, `brand-headline`), completed (checkmark, clickable to revisit)
- Shows step number + title for each of the 16 steps

**Step Screen Controller** (`components/StepScreen.tsx`):
- Accepts `stepNumber: number` prop
- Reads step definition from `STEPS[stepNumber - 1]`
- Renders: step number badge, title (`brand-headline`), description (`brand-text`), sub-question inputs with placeholder text
- No LLM wiring yet — submit button can be a stub

**Home page** (`app/page.tsx`): renders StepScreen for step 1 (will be empty until issue 02 fills data).

---

## Acceptance criteria

- [ ] `Step` type exported from `lib/framework-data.ts` with all fields including `designMoveExample`, `howToDoItExample`, `exitImpact`, `pitchSlide`
- [ ] `STEPS` array exported (empty — filled in later issues)
- [ ] `buildStepPrompt` and `buildPitchPrompt` exported from `lib/prompts.ts` with correct signatures
- [ ] `lib/state.ts` passes typed round-trip: write step state, read it back, no data loss
- [ ] `lib/llm-client.ts` calls Anthropic SDK, returns correct shapes, API key never in client bundle
- [ ] `/api/step` and `/api/pitch` routes exist, accept correct body shapes, return correct shapes
- [ ] Tailwind has `brand-bg`, `brand-headline`, `brand-text` tokens
- [ ] Sidebar renders 16 step slots with correct lock/active/complete states
- [ ] `StepScreen` controller renders step header + sub-question inputs from framework data
- [ ] `pnpm build` passes with no type errors

## Blocked by

None — can start immediately.
