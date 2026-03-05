# Blog SEO Expansion — Master Prompt v2

---

## Per-Post Input (fill before each run)

```
FILE: content/blog/en/<slug>.json
PRIMARY KEYWORD: <keyword>
INTENT TYPE: informational | commercial-investigation | problem-solution
PAA QUESTIONS (from SERPs):
  1. <question>
  2. <question>
  3. <question>
PRIORITY NOTES: <any specific angle, competitor gap, or thin section to address>
```

---

## Workflow (2 phases — do not skip Phase 1)

### Phase 1: Audit (output before writing)

1. Read the current post JSON.
2. Report: current word count, missing sections, keyword gaps, internal link opportunities.
3. Propose an H2 outline with awareness-sequencing labels:
   - Problem-Aware (pain point, why it matters)
   - Solution-Aware (science, comparisons, alternatives)
   - Product-Aware (Purrify positioning, CTA)
4. **Stop and wait for approval** before Phase 2.

### Phase 2: Expand & Validate

1. Write the expanded post following all rules below.
2. Write the updated JSON directly using the file-writing tool.
3. Run the QA validation (see bottom of this doc).

---

## Definition of Done

Every expanded post must satisfy ALL of the following:

| # | Requirement | Detail |
|---|-------------|--------|
| 1 | **Word count** | Match tier from BLOG_STYLE_GUIDE.md (typically 2,000–2,800 for Tier 1). Zero-fluff, high Information Gain. |
| 2 | **TL;DR** | Exactly 1 quick-answer box at the top, 40–50 words answering the core search intent. |
| 3 | **Jump-link TOC** | Mini table of contents right after TL;DR, linking to major H2s. |
| 4 | **Related Guides box** | Exactly 1, near the bottom, with 6–8 contextually relevant internal links. |
| 5 | **Internal links** | 8–15 unique targets woven naturally. Minimum: 3 Blog, 2 Learn, 1 Tool, 1 Product. Descriptive anchor text. Never link the same target twice. |
| 6 | **Comparison table** | 1 where relevant (most posts). |
| 7 | **FAQ** | Exactly 5–7 questions targeting PAA variants. Use the PAA questions from Phase 1 input + fill gaps. |
| 8 | **readingTime** | Computed at 200 wpm, rounded up. |
| 9 | **seo.description** | 150–160 chars. Curiosity-inducing hook (pattern interrupt) containing the primary keyword. |
| 10 | **Styling** | Preserve all existing Tailwind classes and `dark:` variants. Do not remove styling. |
| 11 | **Entities** | Use HTML entities: `&rsquo;` `&ldquo;` `&rdquo;` `&mdash;` `&ndash;` |
| 12 | **JSON integrity** | Keep all existing JSON keys not explicitly updated. Output must remain valid JSON. |
| 13 | **No duplicate content** | Do not reuse the same paragraph, example, or statistic across multiple posts. |

---

## Copywriting & Persuasion Engine

### Structural Rules

- **Short paragraphs**: Max 2–3 sentences. Break up walls of text.
- **Bucket brigades**: Short transitional phrases on their own line to maintain momentum. Examples: "Here is the ugly truth:", "But it gets worse.", "Now, pay close attention.", "Listen:"
- **Fascinations**: Write bullet points as curiosity-building hooks, not flat descriptions. Example: "The invisible household gas that turns ordinary baking soda into a muddy paste — and what to use instead."

### Awareness Sequencing

Structure H2s to guide the reader through this arc:

1. **Problem-Aware** — Name the pain. Make them feel it.
2. **Solution-Aware** — Educate on the science. Compare approaches.
3. **Product-Aware** — Position Purrify as the logical conclusion.

### The Offer Frame

Frame the CTA not as a purchase, but as a risk-free, high-leverage trade. Highlight the massive value of the trial against the trivial $4.76 shipping cost.

### The Underdog Voice

Subtly position Purrify as a dedicated, independent team of cat parents who got obsessive about odor science — not a faceless corporation.

### CTA Placement (strict)

- **Max 2 CTAs** in the body.
- **First CTA**: After the 2nd H2 (reader is hooked).
- **Second CTA**: In or after the FAQ section.
- **CTA text**: "Try a free sample (pay $4.76 shipping)" linking to `/products/trial-size`.

---

## Safety & Accuracy (Zero Hallucinations)

- Any numeric claim (ppm limits, chemical breakdown, etc.) must be supported by a single external link to a high-authority, non-competitor source.
- **Max 2 external link domains total**. Multiple citations can reference the same domain.
- Do not fabricate statistics, study names, or institution endorsements.

---

## JSON Fields to Update

On every post, update these fields:

| Field | Rule |
|-------|------|
| `content` | Full replacement with expanded HTML. |
| `modifiedDate` | Today's date in ISO format (YYYY-MM-DD). |
| `readingTime` | Computed at 200 wpm, rounded up. |
| `faq` | Exactly 5–7 Q&A pairs. |
| `tags` | 10–15 relevant tags. |
| `seo.keywords` | 8–12 highly relevant semantic variants. |
| `seo.description` | 150–160 chars (see rule #9 above). |

All other existing fields must be preserved unchanged.

---

## Internal Link Targets

Choose from these based on contextual relevance. Do not force irrelevant links.

### Blog Posts
- `/blog/activated-carbon-for-cat-litter-complete-guide`
- `/blog/how-to-neutralize-ammonia-cat-litter`
- `/blog/most-powerful-odor-absorber`
- `/blog/baking-soda-vs-activated-carbon-cat-litter`
- `/blog/best-clumping-cat-litter-odor-control`
- `/blog/best-natural-cat-litter-odor-control`
- `/blog/best-unscented-cat-litters`
- `/blog/best-cat-litter-multiple-cats`
- `/blog/best-cat-litter-for-apartments`
- `/blog/cat-litter-smell-worse-summer`
- `/blog/cat-litter-smell-worse-winter`
- `/blog/how-often-change-cat-litter`
- `/blog/litter-deodorizer-frequency-guide`
- `/blog/best-way-to-keep-litter-box-fresh`
- `/blog/fresh-step-vs-arm-hammer-comparison`
- `/blog/cat-litter-odor-myths`
- `/blog/how-to-reduce-litter-box-odor`
- `/blog/fragrance-free-litter-deodorizer`
- `/blog/multi-cat-litter-deodorizer-guide`

### Learn Pages
- `/learn/how-activated-carbon-works`
- `/learn/ammonia-science`
- `/learn/cat-litter-ammonia-health-risks`
- `/learn/science`
- `/learn/safety`
- `/learn/how-it-works`
- `/learn/solutions/litter-box-smell-elimination`
- `/learn/solutions/apartment-cat-smell-solution`
- `/learn/solutions/multiple-cats-odor-control`

### Tools
- `/tools/cat-litter-calculator`
- `/tools/smell-quiz`

### Product
- `/products/trial-size`

---

## QA Validation (run after writing)

After writing the file, output a brief QA report verifying:

```
QA Report: <slug>
--------------------------
Word count (HTML stripped): <n> (target: <range>)
readingTime:                <n> min
Internal links:             <n> (min 8, breakdown: Blog <n>, Learn <n>, Tool <n>, Product <n>)
Duplicate link targets:     <none | list>
External link domains:      <list> (max 2)
FAQ count:                  <n> (target: 5-7)
seo.description length:     <n> chars (target: 150-160)
Tags count:                 <n> (target: 10-15)
seo.keywords count:         <n> (target: 8-12)
JSON valid:                 yes/no
Entities used (no curly quotes in raw text): yes/no
```

---

## Differentiation Rule

Never write generic content. Every post must contain at least one of:
- An original data point, calculation, or comparison the reader cannot find elsewhere.
- A contrarian take backed by evidence.
- A specific, actionable protocol with quantities and timing.
