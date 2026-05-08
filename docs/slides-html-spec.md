# Slides HTML Spec — Tailwind Pseudocode

All slides share this outer shell:

```html
<!-- OUTER SECTION (one per slide) -->
<section class="w-screen h-screen snap-start flex items-center justify-center overflow-hidden bg-white">
  <!-- SLIDE INNER — fixed 16:9 -->
  <div class="relative bg-white overflow-hidden"
       style="width:min(100vw,calc(100vh*16/9)); height:min(100vh,calc(100vw*9/16))">
    <!-- slide content here -->
  </div>
</section>
```

Shared token reference:
- `BLUE`     = `text-[#3924D9]` / `bg-[#3924D9]`
- `GRAY`     = `text-gray-400`
- `DARK`     = `text-gray-600`
- `TEAL`     = `text-[#4AE5C8]`
- `LABEL`    = `text-[0.7vw] tracking-[0.15em] uppercase text-gray-400`
- `CONAME`   = `text-[0.85vw] text-[#3924D9]`
- `DISPLAY`  = `text-[5.5vw] font-light leading-[1.05] text-[#3924D9]`
- `DISPLAY-M`= `text-[4.5vw] font-light leading-[1.05] text-[#3924D9]`
- `BODY`     = `text-[1.2vw] font-light text-gray-500 leading-relaxed`

---

## Slide 1 — Cover

```html
<div class="absolute inset-0 bg-white">

  <!-- Company name — top center -->
  <div class="absolute top-[6%] left-0 right-0 flex justify-center">
    <span class="CONAME">Company name</span>
  </div>

  <!-- Main content — vertically centered in lower half -->
  <div class="absolute left-[7%] top-[48%]">
    <!-- Value proposition — large display -->
    <h1 class="text-[5.5vw] font-light leading-[1.05] text-[#3924D9] max-w-[75%]">
      Value proposition title
    </h1>
    <!-- Target audience — subtitle, gray, slightly smaller -->
    <p class="text-[3.5vw] font-light text-gray-400 mt-[0.5vw]">
      For whom
    </p>
  </div>

  <!-- Founder name — bottom left -->
  <div class="absolute bottom-[7%] left-[7%]">
    <span class="text-[0.9vw] text-gray-400">Founder name</span>
  </div>

</div>
```

---

## Slide 2 — Problem

```html
<div class="absolute inset-0 flex">

  <!-- LEFT PANEL — white, ~66% width -->
  <div class="relative w-[66%] h-full bg-white">

    <!-- Company name top-center of full slide -->
    <div class="absolute top-[6%] left-0 right-0 flex justify-center" style="right:-51%">
      <span class="CONAME">Company</span>
    </div>

    <!-- Label -->
    <p class="absolute top-[16%] left-[10%] LABEL">Problem Statement</p>

    <!-- Big headline -->
    <h2 class="absolute top-[22%] left-[8%] right-[5%]
               text-[5.5vw] font-light leading-[1.05] text-[#3924D9]">
      problem statement
      as headline
    </h2>

    <!-- Clarifying paragraph — bottom left -->
    <p class="absolute bottom-[18%] left-[8%] right-[10%] BODY">
      Short clarifying paragraph
    </p>

  </div>

  <!-- RIGHT PANEL — full blue, ~34% width -->
  <div class="w-[34%] h-full bg-[#3924D9] flex flex-col px-[3vw] py-[8%]">

    <!-- "Facts" label -->
    <p class="text-[1vw] text-white mb-[6%]">Facts</p>

    <!-- 3 numbered facts, evenly spaced -->
    <div class="flex flex-col gap-[6%] flex-1">
      <!-- Fact item (repeat x3) -->
      <div class="flex items-start gap-[1vw]">
        <span class="text-[4.5vw] font-light text-white leading-none">01</span>
        <div class="flex flex-col mt-[0.5vw]">
          <p class="text-[1vw] font-semibold text-white">Headline</p>
          <p class="text-[1vw] text-white/80 font-light">Data or statistics</p>
        </div>
      </div>
      <!-- 02, 03 same structure -->
    </div>

  </div>

</div>
```

---

## Slide 3 — Market Gap

```html
<div class="absolute inset-0 bg-white">

  <!-- Company name -->
  <div class="absolute top-[6%] left-0 right-0 flex justify-center">
    <span class="CONAME">Company name</span>
  </div>

  <!-- LEFT content block -->
  <div class="absolute left-[8%] top-[14%] w-[38%]">
    <p class="LABEL mb-[2vw]">The Opportunity</p>
    <h2 class="DISPLAY mb-[2vw]">market gap</h2>
    <p class="text-[1.2vw] font-semibold text-gray-700 mb-[1vw]">
      Supporting paragraph goes here
    </p>
    <ul class="flex flex-col gap-[0.4vw]">
      <li class="BODY">Lorem ipsum</li>
      <li class="BODY">Lorem ipsum</li>
      <li class="BODY">Lorem ipsum</li>
    </ul>
  </div>

  <!-- RIGHT — chart placeholder box -->
  <div class="absolute right-[5%] top-[18%] bottom-[12%] w-[48%]
              border border-gray-200 flex items-center justify-center">
    <span class="text-[1.2vw] text-gray-300">Chart may be added here if needed</span>
  </div>

</div>
```

---

## Slide 4 — Market Opportunity

```html
<div class="absolute inset-0 bg-white">

  <!-- Company name -->
  <div class="absolute top-[6%] left-0 right-0 flex justify-center">
    <span class="CONAME">Company name</span>
  </div>

  <!-- LEFT content -->
  <div class="absolute left-[8%] top-[32%] w-[38%]">
    <p class="LABEL mb-[2vw]">The Opportunity</p>
    <h2 class="DISPLAY mb-[1.5vw]">
      market
      opportunity
    </h2>
    <p class="BODY">Short text goes here</p>
  </div>

  <!-- RIGHT — SVG concentric circles -->
  <div class="absolute right-[3%] top-[10%] bottom-[10%] w-[50%]
              flex items-center justify-center">
    <svg viewBox="0 0 400 400" class="w-full h-full">
      <!-- TAM — outermost, thin gray stroke -->
      <circle cx="200" cy="200" r="180" fill="none" stroke="#d1d5db" stroke-width="1.5"/>
      <text x="310" y="90" class="text-gray-400" font-size="14" fill="#6b7280">TAM:</text>

      <!-- SAM — middle, blue stroke -->
      <circle cx="200" cy="230" r="130" fill="none" stroke="#3924D9" stroke-width="1.5"/>
      <text x="240" y="180" font-size="14" fill="#6b7280">SAM:</text>

      <!-- SOM — innermost, teal stroke -->
      <circle cx="200" cy="270" r="75" fill="none" stroke="#4AE5C8" stroke-width="1.5"/>
      <text x="220" y="260" font-size="14" fill="#6b7280">SOM:</text>
    </svg>
  </div>

</div>
```

---

## Slide 5 — Market Growth Drivers

```html
<div class="absolute inset-0 bg-white">

  <!-- Company name -->
  <div class="absolute top-[6%] left-0 right-0 flex justify-center">
    <span class="CONAME">Company name</span>
  </div>

  <!-- LEFT headline -->
  <div class="absolute left-[8%] top-[28%] w-[36%]">
    <p class="LABEL mb-[2vw]">Why Now</p>
    <h2 class="DISPLAY">
      market
      growth
      drivers
    </h2>
  </div>

  <!-- RIGHT — table -->
  <div class="absolute right-[5%] top-[20%] w-[50%]">
    <table class="w-full border-collapse">
      <!-- Header row -->
      <thead>
        <tr class="bg-gray-100">
          <th class="text-left text-[0.9vw] font-semibold text-gray-700 px-[1vw] py-[1.2vw] w-1/3">
            Trend
          </th>
          <th class="text-left text-[0.9vw] font-semibold text-gray-700 px-[1vw] py-[1.2vw] w-1/3">
            Market Effect
          </th>
          <th class="text-left text-[0.9vw] font-semibold text-gray-700 px-[1vw] py-[1.2vw] w-1/3">
            Source
          </th>
        </tr>
      </thead>
      <tbody>
        <!-- Data row (repeat per row) -->
        <tr class="bg-gray-50 my-[1.5vw]">
          <td class="text-[0.9vw] text-gray-500 font-light px-[1vw] py-[2vw]"></td>
          <td class="text-[0.9vw] text-gray-500 font-light px-[1vw] py-[2vw]"></td>
          <td class="text-[0.9vw] text-gray-500 font-light px-[1vw] py-[2vw]"></td>
        </tr>
        <!-- gap between rows — table rows are separated by margin-like spacing -->
        <tr class="h-[1.5vw]"><td colspan="3"></td></tr>
        <tr class="bg-gray-50">
          <!-- row 2 same structure -->
        </tr>
      </tbody>
    </table>
  </div>

</div>
```

---

## Slide 6 — Solution Intro

```html
<div class="absolute inset-0 bg-white">

  <!-- Company name -->
  <div class="absolute top-[6%] left-0 right-0 flex justify-center">
    <span class="CONAME">Company name</span>
  </div>

  <!-- LEFT — solution name -->
  <div class="absolute left-[8%] top-[28%] w-[38%]">
    <p class="LABEL mb-[2vw]">Our Solution</p>
    <h2 class="DISPLAY mb-[1vw]">
      Solution
      Name
    </h2>
    <p class="text-[1.2vw] font-light text-gray-400">Short positioning phrase</p>
  </div>

  <!-- RIGHT — solution points list -->
  <div class="absolute right-[5%] top-[30%] w-[44%] flex flex-col gap-[0.6vw]">
    <!-- repeat per point -->
    <p class="text-[1.3vw] font-light text-gray-500">Short solution description</p>
    <p class="text-[1.3vw] font-light text-gray-500">Short solution description</p>
    <p class="text-[1.3vw] font-light text-gray-500">Short solution description</p>
    <p class="text-[1.3vw] font-light text-gray-500">Short solution description</p>
    <p class="text-[1.3vw] font-light text-gray-500">Short solution description</p>
    <p class="text-[1.3vw] font-light text-gray-500">Short solution description</p>
  </div>

</div>
```

---

## Slide 7 — Solution Detail

```html
<div class="absolute inset-0 bg-white">

  <!-- Company name — top, very close to edge -->
  <div class="absolute top-[4%] left-0 right-0 flex justify-center">
    <span class="CONAME">Company name</span>
  </div>

  <!-- Label + full-width headline at top -->
  <div class="absolute left-[8%] top-[8%] right-[8%]">
    <p class="LABEL mb-[1vw]">Our Solution</p>
    <h2 class="text-[4.5vw] font-light leading-[1.05] text-[#3924D9]">
      Solution description
    </h2>
  </div>

  <!-- BOTTOM HALF — split left/right -->

  <!-- Left — solution points -->
  <div class="absolute left-[8%] top-[42%] w-[35%] flex flex-col gap-[0.6vw]">
    <p class="BODY">Short solution description</p>
    <p class="BODY">Short solution description</p>
    <p class="BODY">Short solution description</p>
    <p class="BODY">Short solution description</p>
    <p class="BODY">Short solution description</p>
    <p class="BODY">Short solution description</p>
  </div>

  <!-- Right — image placeholder -->
  <div class="absolute right-[5%] top-[32%] bottom-[8%] w-[48%]
              border border-gray-200 flex items-center justify-center">
    <span class="text-[1.2vw] text-gray-300">Image may be added here if needed</span>
  </div>

</div>
```

---

## Slide 8 — Operating Model

```html
<!-- NOTE: no company name on this slide -->
<div class="absolute inset-0 flex">

  <!-- Label — top left of whole slide -->
  <p class="absolute top-[8%] left-[5%] text-[0.65vw] tracking-[0.15em] uppercase text-gray-400 leading-[1.6]">
    Our Operating<br/>Model
  </p>

  <!-- COLUMN 1 — white bg -->
  <div class="w-1/3 h-full bg-white flex flex-col items-center justify-center gap-[2vw] px-[3vw]">
    <!-- Icon circle -->
    <div class="w-[12vw] h-[12vw] rounded-full border border-gray-300
                flex items-center justify-center">
      <Lightbulb class="w-[4vw] h-[4vw] text-gray-700 stroke-[1]" />
    </div>
    <h3 class="text-[1.5vw] font-light text-[#3924D9]">Headline</h3>
    <p class="BODY text-center">Paragraph</p>
  </div>

  <!-- COLUMN 2 — blue bg (center) -->
  <div class="w-1/3 h-full bg-[#3924D9] flex flex-col items-center justify-center gap-[2vw] px-[3vw]">
    <!-- Icon circle — white stroke on blue -->
    <div class="w-[12vw] h-[12vw] rounded-full border-2 border-white
                flex items-center justify-center">
      <Cloud class="w-[4vw] h-[4vw] text-white stroke-[1]" />
    </div>
    <h3 class="text-[1.5vw] font-light text-white">Headline</h3>
    <p class="text-[1.2vw] font-light text-white/80 text-center">Paragraph</p>
  </div>

  <!-- COLUMN 3 — white bg -->
  <div class="w-1/3 h-full bg-white flex flex-col items-center justify-center gap-[2vw] px-[3vw]">
    <div class="w-[12vw] h-[12vw] rounded-full border border-gray-300
                flex items-center justify-center">
      <Trophy class="w-[4vw] h-[4vw] text-gray-700 stroke-[1]" />
    </div>
    <h3 class="text-[1.5vw] font-light text-[#3924D9]">Headline</h3>
    <p class="BODY text-center">Paragraph</p>
  </div>

</div>
```

---

## Slide 9 — Value Creation Process

```html
<div class="absolute inset-0 bg-white">

  <!-- Company name -->
  <div class="absolute top-[6%] left-0 right-0 flex justify-center">
    <span class="CONAME">Company name</span>
  </div>

  <!-- LEFT -->
  <div class="absolute left-[8%] top-[18%] w-[36%]">
    <p class="LABEL mb-[2vw]">Our Solution</p>
    <h2 class="DISPLAY mb-[1.5vw]">
      value
      creation
      process
    </h2>
    <p class="BODY">Short paragraph goes here</p>
  </div>

  <!-- RIGHT — chart placeholder -->
  <div class="absolute right-[5%] top-[18%] bottom-[8%] w-[48%]
              border border-gray-200 flex items-center justify-center">
    <span class="text-[1.2vw] text-gray-300">Chart may be added here if needed</span>
  </div>

</div>
```

---

## Slide 10 — Revenue Streams & Traction

```html
<div class="absolute inset-0 bg-white">

  <!-- Company name -->
  <div class="absolute top-[6%] left-0 right-0 flex justify-center">
    <span class="CONAME">Company name</span>
  </div>

  <!-- LEFT — large multi-line headline -->
  <div class="absolute left-[8%] top-[28%] w-[36%]">
    <p class="LABEL mb-[2vw]">Business Model</p>
    <h2 class="DISPLAY">
      revenue
      streams &
      traction
    </h2>
  </div>

  <!-- RIGHT — bullet points -->
  <div class="absolute right-[5%] top-[30%] w-[44%] flex flex-col gap-[1vw]">
    <!-- repeat per point -->
    <div class="flex items-start gap-[0.8vw]">
      <span class="text-[1.2vw] text-gray-400 mt-[0.1vw]">·</span>
      <p class="BODY">Add revenue streams & traction evidence</p>
    </div>
  </div>

</div>
```

---

## Slide 11 — Milestones

```html
<div class="absolute inset-0 flex flex-col">

  <!-- TOP HALF — white -->
  <div class="h-[50%] bg-white relative flex flex-col justify-end px-[8%] pb-[3%]">

    <!-- Company name -->
    <div class="absolute top-[12%] left-0 right-0 flex justify-center">
      <span class="CONAME">Company name</span>
    </div>

    <p class="LABEL mb-[1.5vw]">Key Milestones</p>
    <h2 class="text-[4.5vw] font-light leading-[1.05] text-[#3924D9]">
      from MVP to Scale
    </h2>
  </div>

  <!-- BOTTOM HALF — full blue -->
  <div class="h-[50%] bg-[#3924D9] flex items-start px-[8%] pt-[4%] gap-[0]">

    <!-- 4 milestone columns — evenly spaced -->
    <!-- Column 1 — white year -->
    <div class="flex-1 flex flex-col gap-[1vw]">
      <span class="text-[5.5vw] font-light text-white leading-none">2026</span>
      <p class="text-[0.9vw] font-light text-white/80 max-w-[80%]">
        MVP: objective goes here
      </p>
    </div>

    <!-- Column 2 — white year -->
    <div class="flex-1 flex flex-col gap-[1vw]">
      <span class="text-[5.5vw] font-light text-white leading-none">2030</span>
      <p class="text-[0.9vw] font-light text-white/80 max-w-[80%]">
        Build: objective goes here
      </p>
    </div>

    <!-- Column 3 — white year -->
    <div class="flex-1 flex flex-col gap-[1vw]">
      <span class="text-[5.5vw] font-light text-white leading-none">2035</span>
      <p class="text-[0.9vw] font-light text-white/80 max-w-[80%]">
        Run: objective goes here
      </p>
    </div>

    <!-- Column 4 — TEAL year (scale phase) -->
    <div class="flex-1 flex flex-col gap-[1vw]">
      <span class="text-[5.5vw] font-light text-[#4AE5C8] leading-none">2035+</span>
      <p class="text-[0.9vw] font-light text-white/80 max-w-[80%]">
        Scale: objective goes here
      </p>
    </div>

  </div>

</div>
```

---

## Slide 12 — Go To Market

```html
<div class="absolute inset-0 bg-white">

  <!-- Company name -->
  <div class="absolute top-[6%] left-0 right-0 flex justify-center">
    <span class="CONAME">Company name</span>
  </div>

  <!-- Label + full-width headline -->
  <div class="absolute left-[8%] top-[11%] right-[8%]">
    <p class="LABEL mb-[1.5vw]">Go To Market</p>
    <h2 class="text-[4.5vw] font-light leading-[1.05] text-[#3924D9]">
      a lean growth strategy
    </h2>
  </div>

  <!-- GRID of strategy columns — 3 top, 2 bottom -->
  <div class="absolute left-[8%] right-[8%] top-[38%] bottom-[8%]
              grid grid-cols-3 gap-x-[3vw] gap-y-[2vw]">
    <!-- Column item (repeat) -->
    <div class="flex flex-col gap-[0.5vw]">
      <h4 class="text-[1vw] font-semibold text-gray-700">Headline</h4>
      <p class="text-[0.85vw] font-light text-gray-400">Text goes here</p>
      <p class="text-[0.85vw] font-light text-gray-400">Text goes here</p>
      <p class="text-[0.85vw] font-light text-gray-400">Text goes here</p>
      <p class="text-[0.85vw] font-light text-gray-400">Text goes here</p>
      <p class="text-[0.85vw] font-light text-gray-400">Text goes here</p>
    </div>
    <!-- 4 more columns with same structure -->
    <!-- 6th grid cell (3rd col, 2nd row) is empty in template -->
  </div>

</div>
```

---

## Slide 13 — Competitive Landscape

```html
<div class="absolute inset-0 bg-white">

  <!-- Company name -->
  <div class="absolute top-[6%] left-0 right-0 flex justify-center">
    <span class="CONAME">Company name</span>
  </div>

  <!-- LEFT -->
  <div class="absolute left-[8%] top-[16%] w-[36%]">
    <p class="LABEL mb-[2vw]">Competitive Advantage</p>
    <h2 class="DISPLAY mb-[1.5vw]">
      competitive
      landscape
    </h2>
    <p class="BODY">Description goes here</p>
  </div>

  <!-- RIGHT — chart placeholder -->
  <div class="absolute right-[5%] top-[18%] bottom-[8%] w-[48%]
              border border-gray-200 flex items-center justify-center">
    <span class="text-[1.2vw] text-gray-300">Chart may be added here if needed</span>
  </div>

</div>
```

---

## Slide 14 — Team

```html
<div class="absolute inset-0 bg-white">

  <!-- Company name -->
  <div class="absolute top-[6%] left-0 right-0 flex justify-center">
    <span class="CONAME">Company name</span>
  </div>

  <!-- Label + headline -->
  <div class="absolute left-[8%] top-[10%]">
    <p class="LABEL mb-[1.5vw]">Our Team</p>
    <h2 class="text-[4.5vw] font-light leading-[1.05] text-[#3924D9]">Team</h2>
  </div>

  <!-- 3 member columns -->
  <div class="absolute left-[8%] right-[8%] top-[38%] bottom-[8%] flex gap-[4vw]">

    <!-- Member card (repeat x3) -->
    <div class="flex-1 flex flex-col gap-[1vw]">
      <!-- Avatar circle -->
      <div class="w-[7vw] h-[7vw] rounded-full border border-gray-200
                  flex items-center justify-center">
        <span class="text-[0.9vw] text-gray-300">Picture</span>
      </div>
      <!-- Name -->
      <h4 class="text-[1vw] font-semibold text-gray-700 mt-[0.5vw]">Headline</h4>
      <!-- Bio points -->
      <p class="text-[0.85vw] font-light text-gray-400">Text goes here</p>
      <p class="text-[0.85vw] font-light text-gray-400">Text goes here</p>
      <p class="text-[0.85vw] font-light text-gray-400">Text goes here</p>
      <p class="text-[0.85vw] font-light text-gray-400">Text goes here</p>
      <p class="text-[0.85vw] font-light text-gray-400">Text goes here</p>
    </div>

  </div>

</div>
```

---

## Slide 15 — Impact

```html
<div class="absolute inset-0 bg-white">

  <!-- Company name -->
  <div class="absolute top-[6%] left-0 right-0 flex justify-center">
    <span class="CONAME">Company name</span>
  </div>

  <!-- LEFT — numbered impact items -->
  <div class="absolute left-[8%] top-[18%] w-[40%] flex flex-col gap-[4%]">
    <p class="LABEL mb-[3%]">The Impact</p>

    <!-- Item (repeat x3) -->
    <div class="flex items-center gap-[2vw]">
      <span class="text-[5vw] font-light text-[#3924D9] leading-none">01</span>
      <p class="text-[1.2vw] font-light text-gray-600">Short phrase here</p>
    </div>
    <div class="flex items-center gap-[2vw]">
      <span class="text-[5vw] font-light text-[#3924D9] leading-none">02</span>
      <p class="text-[1.2vw] font-light text-gray-600">Short phrase here</p>
    </div>
    <div class="flex items-center gap-[2vw]">
      <span class="text-[5vw] font-light text-[#3924D9] leading-none">03</span>
      <p class="text-[1.2vw] font-light text-gray-600">Short phrase here</p>
    </div>
  </div>

  <!-- RIGHT — photo placeholder + blue vision overlay -->
  <div class="absolute right-0 top-0 bottom-0 w-[55%] bg-gray-100 overflow-hidden">
    <!-- Photo placeholder (gray bg) -->

    <!-- Blue vision overlay — bottom right, extends slightly beyond slide right -->
    <div class="absolute bottom-[18%] left-[8%] right-0 bg-[#3924D9] px-[2vw] py-[1.5vw]">
      <p class="text-[2.5vw] font-light text-white leading-[1.1]">
        vision for the
        future
      </p>
    </div>
  </div>

</div>
```

---

## Slide 16 — Ask

```html
<div class="absolute inset-0 bg-white">

  <!-- Company name -->
  <div class="absolute top-[6%] left-0 right-0 flex justify-center">
    <span class="CONAME">Company name</span>
  </div>

  <!-- Label -->
  <p class="absolute top-[10%] left-[8%] LABEL">Ask</p>

  <!-- Large headline -->
  <h2 class="absolute top-[13%] left-[8%] right-[8%]
             text-[4.5vw] font-light leading-[1.05] text-[#3924D9]">
    Financials & Funding ask
  </h2>

  <!-- Section title + paragraph -->
  <div class="absolute top-[42%] left-[8%] w-[50%]">
    <h4 class="text-[1.1vw] font-semibold text-gray-700 mb-[1vw]">
      write a title in this section
    </h4>
    <p class="text-[0.9vw] font-light text-gray-500 leading-relaxed">
      Paragraph text goes here...
    </p>
  </div>

</div>
```

---

## Slide 17 — Thank You

```html
<div class="absolute inset-0 bg-white">

  <!-- Company name -->
  <div class="absolute top-[6%] left-0 right-0 flex justify-center">
    <span class="CONAME">Company name</span>
  </div>

  <!-- Large message — lower left, ~40% from top -->
  <div class="absolute left-[18%] top-[38%] right-[8%]">
    <h2 class="text-[4.5vw] font-light leading-[1.1] text-[#3924D9]">
      Thank You & invitation
      message goes here
    </h2>

    <!-- Name + contact below headline -->
    <p class="text-[0.9vw] font-light text-gray-400 mt-[2vw]">Name</p>
    <p class="text-[0.9vw] font-light text-gray-400 mt-[0.3vw]">Contact</p>
  </div>

  <!-- Bottom center — date/confidential -->
  <div class="absolute bottom-[6%] left-0 right-0 flex justify-center">
    <span class="text-[0.75vw] text-gray-300 tracking-wide">
      Month. Year. Confidential
    </span>
  </div>

</div>
```
