# 05 — UI Typography Restyle

Status: ready-for-agent

## What to fix

Address typography and readability issues flagged in design review. Visual design is generally positive — these are targeted fixes only.

---

### 1. Header font — switch to neutral typeface

The header font (e.g. "Define the Business") uses a decorative typeface that hurts readability.

- Replace with a neutral sans-serif: Inter, DM Sans, or system-ui
- Keep emphasis via weight/size, not font decoration

### 2. Typeface consolidation — max 3 families

Multiple typefaces detected across text elements.

- Audit all `font-*` / `fontFamily` usages across components
- Reduce to ≤ 3 families with clear role assignments:
  - **Display/headings** — neutral sans-serif (same as fix #1)
  - **Body** — same family or a legible companion
  - **Mono** — only if code blocks are present

### 3. Body letter spacing — loosen slightly

Current spacing is too tight.

- Apply `tracking-wide` (Tailwind) or `letter-spacing: 0.01em` to body copy
- Do not apply to headings — only body/paragraph text

### 4. Body line height — increase to ≥ 1.6

Line height is compressed and hinders readability.

- Apply `leading-relaxed` (Tailwind, = `1.625`) to body paragraphs
- Check step description text, sub-question labels, how-to-do-it lists

---

## Acceptance criteria

- [ ] Header uses neutral typeface
- [ ] ≤ 3 distinct font families across entire app
- [ ] Body letter-spacing loosened (`tracking-wide` or equivalent)
- [ ] Body line-height ≥ 1.6 (`leading-relaxed` or equivalent)
- [ ] Spot-checked: Step 1 screen + pitch deck renderer
