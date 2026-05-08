# 02 — Step 1: Tracer Bullet

Status: complete

## What to build

Implement Step 1 end-to-end as the canonical reference. The pattern established here — data shape, prompt structure, UI flow, LLM output style — is what Steps 2–16 replicate.

---

### Step 1 Data — `lib/framework-data.ts`

Populated in `STEPS[0]`: 4 sub-questions, `designMoveExample`, `howToDoItExample`, `exitImpact`, `pitchSlide`. See source.

---

### Prompt structure — `lib/prompts.ts`

`buildStepPrompt` returns `{ system, user }` (`PromptMessages`). Three parts:

- **System** — advisor persona, illustrative-only photography disclaimer, tone directive
- **Prior context** — "no prior context yet" for step 1; later steps accumulate accepted moves
- **Current step** — description, framework example, founder's answers, task instructions

`callStepAdvisor` in `lib/llm-client.ts` passes `system:` and `messages:` separately to the Anthropic API.

---

### UI layout — `components/StepScreen.tsx`

**Two-column, 55/45 split** (questions left, output right). Not vertical stacking.

#### Left column
- Step badge, title, description
- Sub-question textareas (read-only when completed)
- "See redesign suggestion" button — disabled until all questions answered; hidden when completed

#### Right column
Four states:
1. **Placeholder** — "Answer all questions to unlock your redesign suggestion." (centered)
2. **Loading** — spinner centered in panel
3. **Output** — editable design move textarea + numbered how-to list
4. **Completed** — read-only design move card + numbered how-to list (no editing — deferred feature)

#### Footer bar (below both columns)
Separate container, full width, border-top:
- **← Back** (left) — disabled on step 1; always visible
- **Continue →** (right) — disabled until output exists; auto-saves output before navigating

#### Keyboard shortcuts (when no textarea/input focused)
- `←` — Back
- `→` — Continue (same conditions as button)

#### State transitions
`placeholder → loading → output → completed`

Revisiting a completed step restores two-column layout with saved answers (read-only left) and accepted output (read-only right).

**No explicit Accept step.** Continue saves output automatically.

---

### Key decisions log

| Decision | Chosen | Rejected |
|---|---|---|
| Layout | Two-column 55/45 | Vertical stacking (original spec) |
| Save trigger | Continue auto-saves | Explicit Accept button |
| Continue enables | As soon as output exists | Only after Accept |
| Right panel loading | Spinner in right panel | Spinner on button |
| Completed state | Two-column read-only | Full-width card |
| Editing completed steps | Not supported (future) | Edit button restoring textarea |
| Nav buttons | Footer bar: Back + Continue | Inline per-column |
| Keyboard shortcut for submit | Removed (← → for nav only) | Cmd+Enter |

---

## Acceptance criteria

- [x] Step 1 entry fully populated in `STEPS` array
- [x] `buildStepPrompt` returns `{ system, user }` with three-part structure
- [x] Step 1 prompt instructs LLM to adapt to founder's industry
- [x] "See redesign suggestion" calls `/api/step`, returns `{ designMove, howToDoIt }`
- [x] Design move textarea editable in output state
- [x] How-to renders as numbered list
- [x] Continue saves to state; sidebar updates (checkmark, Step 2 unlocks)
- [x] Revisiting completed Step 1 loads saved answers and design move (read-only)
- [x] "See redesign suggestion" disabled until all sub-questions answered
- [x] Brand colors applied throughout
- [x] No API key in client bundle
- [x] `pnpm build` passes
- [x] ← / → arrow keys navigate (no textarea focused)
- [x] Footer: ← Back (left), Continue → (right, disabled until output)

## Blocked by

- `01-modular-scaffold.md`

---

**HITL checkpoint**: Human reviews quality of LLM output (are design moves specific and punchy?), UI clarity, and whether prompt needs adjustment. Sign-off required before `03-steps-2-16.md` begins.
