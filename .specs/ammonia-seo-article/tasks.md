# Implementation Plan: Ammonia-Focused SEO Blog Article

## Task Overview

| Task | Description | Est. | Requirement |
|------|-------------|------|-------------|
| T0 | Source images (incl. ammonia molecule, pore structure) | - | AC-IMG-1 to AC-IMG-5 |
| T1 | Create blog post JSON file | - | AC-1, AC-2, AC-5, AC-6 |
| T2 | Write header and intro section | - | AC-2.1 |
| T3 | Write "Why ammonia" science section | - | AC-2.3 |
| T4 | Write 5 methods section | - | AC-2.2 |
| T4.5 | Write "Why Purrify's Carbon" + testimonials | - | AC-2.2, AC-2.4 |
| T5 | Write comparison table | - | AC-2.4 |
| T6 | Write baking soda section | - | AC-2.3 |
| T7 | Write FAQ section | - | AC-3.1, AC-3.2 |
| T8 | Add CTA and internal links | - | AC-4.1, AC-4.2 |
| T9 | Validate build and dark mode | - | AC-6.3 |

---

## Tasks

### T0: Source and Download Images
**Status:** pending
**File:** `public/optimized/blog/`

**Done Criteria:**
- [ ] Search Unsplash/Pexels/Web for best matching images
- [ ] Download 4-5 high-quality images:
  - Hero: Cat in clean home / fresh environment
  - Ammonia molecule: NH3 molecular structure diagram/3D render
  - Pore structure: Micropore/mesopore visualization showing carbon structure
  - Methods: Cat near litter box or carbon granules close-up
  - Comparison: Before/after or side-by-side visual
- [ ] Resize all images to max 800x800px (blog limit)
- [ ] Save to `/public/optimized/blog/` with descriptive names
- [ ] Verify images are appropriate and on-brand

**Search queries to try:**
- "cat clean home fresh"
- "ammonia molecule NH3 structure"
- "ammonia molecular diagram"
- "activated carbon pore structure micropore"
- "activated carbon granules close up"
- "cat litter box clean"
- "happy cat indoor"

---

### T1: Create Blog Post JSON Structure
**Status:** pending
**File:** `content/blog/en/how-to-neutralize-ammonia-cat-litter.json`

**Done Criteria:**
- [ ] JSON file created with correct schema
- [ ] SEO metadata includes all 10 target keywords
- [ ] Featured image set to `/optimized/cat-clean-home.jpg`
- [ ] Slug: `how-to-neutralize-ammonia-cat-litter`
- [ ] Categories: `["Odor Control"]`

---

### T2: Write Header and Intro Section
**Status:** pending
**Depends on:** T1

**Done Criteria:**
- [ ] H1 contains exact phrase "How to Neutralize Ammonia in Cat Litter"
- [ ] Direct answer within first 150 words (featured snippet optimization)
- [ ] Category badge: "Odor Control"
- [ ] Reading time calculated

**Content outline:**
```
Header:
- Badge: Odor Control
- H1: How to Neutralize Ammonia in Cat Litter: 5 Proven Methods
- Subtitle: Direct answer - "Activated carbon is the most effective..."

Intro paragraph:
- Hook: Problem statement
- Direct answer: What neutralizes ammonia
- Preview of 5 methods
```

---

### T3: Write "Why Ammonia" Science Section
**Status:** pending
**Depends on:** T2

**Done Criteria:**
- [ ] Explains urea → bacteria → ammonia process
- [ ] Image: `/optimized/carbon_magnified_image.webp` with SEO alt text
- [ ] Dark mode styling applied

**Content outline:**
```
H2: Why Does Cat Litter Smell Like Ammonia?
- Bacteria break down urea in urine
- Produces ammonia gas (NH3)
- Gets worse over time / warm conditions
- Why masking doesn't work
```

---

### T4: Write 5 Methods Section
**Status:** pending
**Depends on:** T3

**Done Criteria:**
- [ ] 5 distinct methods listed with H3 headings
- [ ] Method 1 (Activated Carbon) positioned as best solution
- [ ] Image: `/optimized/activated-carbon-granules.webp`
- [ ] Each method has actionable steps

**Content outline:**
```
H2: 5 Proven Methods to Neutralize Ammonia in Cat Litter

H3: 1. Activated Carbon Additive (Most Effective)
- How it works (adsorption)
- Application instructions
- Mention Purrify

H3: 2. Improve Ventilation
- Airflow disperses ammonia
- Placement tips

H3: 3. Scoop Twice Daily
- Removes ammonia source quickly
- Morning/evening routine

H3: 4. Enzyme Cleaners for Deep Cleaning
- Monthly box cleaning
- Breaks down residue

H3: 5. Optimize Litter Box Placement
- Avoid enclosed spaces
- Cross-breeze positioning
```

---

### T4.5: Write "Why Purrify's Carbon is Optimized for Ammonia" Section
**Status:** pending
**Depends on:** T4

**Done Criteria:**
- [ ] Explains pore size optimization (micro, meso, macro pores)
- [ ] Shows ammonia molecule diagram with pore size matching
- [ ] Image: New ammonia molecule + pore structure image from T0
- [ ] Explains why pore distribution matters for NH3 specifically
- [ ] Includes 3-4 testimonials from hero section

**Content outline:**
```
H2: Why Purrify's Activated Carbon is Optimized for Ammonia

Ammonia Molecule Section:
- NH3 molecule size (~0.26 nm diameter)
- Image: Ammonia molecule diagram
- Small molecule = needs micropores to trap effectively

Pore Structure Section:
- Micropores (<2nm): Trap small molecules like ammonia
- Mesopores (2-50nm): Allow ammonia access to micropores
- Macropores (>50nm): Initial entry points
- Image: Pore structure visualization
- Purrify's optimized distribution = maximum ammonia capture

Surface Area:
- 1,150 m²/g surface area
- Equivalent to 4 tennis courts per teaspoon
- vs baking soda: only 0.2 m²/g

Testimonials Box:
Pull 3-4 from hero-testimonials.ts:
- "No more ammonia smell hitting you in the face!"
- "The activated carbon actually bonds with ammonia molecules - real science!"
- "Zero smell itself and actually eliminates the ammonia. Finally!"
- "Tried baking soda for months - this is 10x better!"
```

---

### T5: Write Comparison Table
**Status:** pending
**Depends on:** T4

**Done Criteria:**
- [ ] Table comparing all methods
- [ ] Columns: Method, Effectiveness, Cost, Duration
- [ ] Image: `/optimized/activated-carbon-vs-baking-soda.webp`
- [ ] Proper dark mode table styling

**Content outline:**
```
H2: Which Method Works Best? (Comparison)

| Method | Effectiveness | Monthly Cost | Duration |
|--------|---------------|--------------|----------|
| Activated Carbon | 95% | $8-15 | 6-8 weeks |
| Ventilation | 40% | $0 | Continuous |
| Frequent Scooping | 60% | $0 | Daily effort |
| Enzyme Cleaners | 70% | $10-20 | Monthly |
| Box Placement | 30% | $0 | Permanent |
```

---

### T6: Write Baking Soda Section
**Status:** pending
**Depends on:** T5

**Done Criteria:**
- [ ] Explains why baking soda fails (pH science)
- [ ] Links to `/blog/activated-carbon-litter-additive-benefits`
- [ ] Not dismissive, educational tone

**Content outline:**
```
H2: Why Baking Soda Doesn't Neutralize Ammonia

- Baking soda is alkaline (base)
- Ammonia is also alkaline (base)
- Base + Base = no reaction
- Only works on acidic odors (30% of smell)
- Link to science article
```

---

### T7: Write FAQ Section
**Status:** pending
**Depends on:** T6

**Done Criteria:**
- [ ] 5 FAQ questions using exact search query phrasing
- [ ] Each answer is concise (2-3 sentences)
- [ ] Schema-ready structure (can add JSON-LD later)
- [ ] Dark mode card styling

**Questions (exact GSC phrases):**
1. "How do I neutralize ammonia in cat litter?"
2. "Why does my cat litter smell like ammonia?"
3. "What is the best cat litter for ammonia smell?"
4. "How do you stop ammonia smell in cat litter?"
5. "What neutralizes ammonia naturally?"

---

### T8: Add CTA and Internal Links
**Status:** pending
**Depends on:** T7

**Done Criteria:**
- [ ] CTA box linking to `/products/compare`
- [ ] 3 internal links placed contextually:
  - `/blog/strong-cat-urine-smell-litter-box`
  - `/blog/activated-carbon-litter-additive-benefits`
  - `/blog/cat-litter-odor-myths`
- [ ] Related posts array populated

---

### T9: Validate Build and Dark Mode
**Status:** pending
**Depends on:** T8

**Done Criteria:**
- [ ] `npm run build` passes
- [ ] `npm run validate-dark-mode` passes
- [ ] `npm run lint` passes
- [ ] Article renders correctly at `/blog/how-to-neutralize-ammonia-cat-litter`

---

## Execution Order

```
T0 → T1 → T2 → T3 → T4 → T4.5 → T5 → T6 → T7 → T8 → T9
```

T0 (images) runs first so image paths are known for content tasks.
T4.5 adds Purrify differentiation + testimonials after methods section.

---

Ready for approval? Reply `y` to begin execution, or `refine [feedback]` to iterate.
