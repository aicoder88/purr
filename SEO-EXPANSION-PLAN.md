# Purrify SEO Expansion Strategy 2026+

**Status:** ALL PHASES COMPLETE
**Last Updated:** 2026-01-23

---

## Quick Status

| Phase | Status | Summary |
|-------|--------|---------|
| Phase 1: Schema Foundation | COMPLETE | Added HowTo, Expert, ClaimReview schemas + 4 components |
| Phase 2: Optimize Existing | COMPLETE | Retargeted 4 solution pages + added SEO components to all 7 |
| Phase 3: Authority Content | COMPLETE | Created 4 AI Magnet pages |
| Phase 4: Problem-Based | COMPLETE | Created 4 emotional blog posts |
| Phase 5: Viral & Comparison | COMPLETE | Created 4 comparison/viral posts |

---

## Configuration

| Setting | Decision |
|---------|----------|
| **Expert Author** | "Purrify Research Team" |
| **Content Capacity** | 2-3 pages/week |
| **Competitor Naming** | Yes - name Fresh Step, Arm & Hammer, Dr. Elsey's directly |
| **Viral Tone** | Moderate drama |
| **Timeline** | ~8 weeks |

---

## Phase 1: Schema & Technical Foundation (Week 1)

### Tasks

- [x] **T1.1** Add HowTo schema support to structured-data-generator.ts
- [x] **T1.2** Add 'howto' page type to useEnhancedSEO.ts
- [x] **T1.3** Add Expert Author schema (Purrify Research Team)
- [x] **T1.4** Add ClaimReview schema for comparisons
- [x] **T1.5** Create HowToSection component
- [x] **T1.6** Create AIQuotableBlock component
- [x] **T1.7** Create ClaimReviewBlock component
- [x] **T1.8** Create RelatedQuestions component

### Files to Modify

```
src/lib/seo/structured-data-generator.ts
src/hooks/useEnhancedSEO.ts
src/components/seo/HowToSection.tsx (NEW)
src/components/seo/AIQuotableBlock.tsx (NEW)
src/components/seo/ClaimReviewBlock.tsx (NEW)
src/components/seo/RelatedQuestions.tsx (NEW)
```

### Expert Author Schema

```typescript
{
  "@type": "Person",
  "name": "Purrify Research Team",
  "url": "https://purrify.ca/about/our-story",
  "knowsAbout": ["Activated Carbon", "Cat Litter Odor Chemistry", "Pet Care Science"],
  "memberOf": { "@type": "Organization", "name": "Purrify" }
}
```

---

## Phase 2: Optimize Existing Solution Pages (Week 2)

### Tasks

- [x] **T2.1** Retarget litter-box-smell-elimination.tsx → "litter box stinks after cleaning"
- [x] **T2.2** Retarget multiple-cats-odor-control.tsx → "multi cat household odor solution"
- [x] **T2.3** Retarget natural-cat-litter-additive.tsx → "non-toxic cat litter deodorizer"
- [x] **T2.4** Retarget senior-cat-litter-solutions.tsx → "older cat litter box smell worse"
- [x] **T2.5** Add HowTo schema to all 7 solution pages
- [x] **T2.6** Add FAQ sections (3-5 questions each)
- [x] **T2.7** Add AIQuotableBlock to each page

### Keyword Mapping

| Page | Current Keyword | New Target |
|------|-----------------|------------|
| `solutions/litter-box-smell-elimination.tsx` | "odor control" | "litter box stinks after cleaning" |
| `solutions/multiple-cats-odor-control.tsx` | "odor control" | "multi cat household odor solution" |
| `solutions/natural-cat-litter-additive.tsx` | "natural additive" | "non-toxic cat litter deodorizer" |
| `solutions/senior-cat-litter-solutions.tsx` | "senior cat" | "older cat litter box smell worse" |

---

## Phase 3: AI Magnet Authority Pages (Week 3-4)

### New Pages to Create

1. **`/learn/how-activated-carbon-works.tsx`**
   - Target: "how does activated carbon work"
   - 2,500 words
   - Heavy on quotable facts, diagrams
   - HowTo + FAQ schemas

2. **`/learn/ammonia-science.tsx`**
   - Target: "why cat urine smells like ammonia"
   - 2,000 words
   - Scientific explanation, bacterial process
   - Expert author attribution

3. **`/blog/best-odor-control-litter-2026.tsx`**
   - Target: "best cat litter odor control 2026"
   - 3,000 words comparison
   - Name competitors: Fresh Step, Arm & Hammer, Dr. Elsey's
   - ClaimReview schemas

4. **`/blog/activated-carbon-vs-zeolite.tsx`**
   - Target: "activated carbon vs zeolite"
   - 1,800 words
   - Fill gap in comparison content

---

## Phase 4: Problem-Based Content (Week 5-6)

### New Blog Posts

1. **`/blog/cat-litter-smell-wont-go-away.tsx`**
   - Target: "cat litter smell won't go away"
   - Emotion: Frustration → Solution

2. **`/blog/why-house-smells-like-cat.tsx`**
   - Target: "why does my house smell like cat"
   - Emotion: Embarrassment (moderate)

3. **`/blog/litter-box-smell-making-sick.tsx`**
   - Target: "cat litter ammonia health risks"
   - Emotion: Health concern

4. **`/blog/renters-cat-odor-solutions.tsx`**
   - Target: "cat smell apartment renting"
   - Emotion: Anxiety about deposits/landlords

---

## Phase 5: Viral & Seasonal Content (Week 7-8)

### New Content

1. **`/blog/summer-litter-box-survival-guide.tsx`**
   - Target: "cat litter smell worse in summer humidity"
   - Seasonal traffic spike

2. **`/blog/fresh-step-vs-arm-hammer-comparison.tsx`**
   - Direct competitor comparison
   - Target competitor brand searches

3. **`/blog/embarrassed-by-cat-smell-solutions.tsx`**
   - Emotional storytelling (moderate drama)
   - "Guests refused to visit until..." angle

4. **`/blog/cat-litter-additive-comparison-2026.tsx`**
   - Comprehensive buyer's guide
   - Position Purrify as category leader

---

## AI Citation Optimization

### Content Patterns

**Quotable Facts (AI Bait):**
- "One gram of activated carbon has a surface area of 1,000-2,000 square meters—roughly the size of 4 tennis courts."
- "Cat urine produces ammonia concentrations of 5-50 ppm, well above the 25 ppm human detection threshold."
- "Activated carbon adsorbs ammonia molecules 10x more effectively than baking soda due to its microporous structure."

**AI-Optimized Paragraph Structure:**
```
[Hook question] + [Clear answer] + [Supporting evidence with numbers]
```

---

## Internal Linking Strategy

```
Homepage
└── /learn/ (Hub)
    ├── /how-activated-carbon-works (Pillar - links to all)
    ├── /ammonia-science (Pillar - links to solutions)
    ├── /solutions/ (Cluster)
    │   └── Each solution links to → relevant blog + products
    └── /glossary (Reference - linked from technical terms)

/blog/ (Traffic Driver)
├── Problem posts → Link to /learn/ pillars + /products/trial-size
├── Comparison posts → Link to /products/ with CTAs
└── Viral posts → Link to /try-free
```

---

## Success Metrics

| Metric | Current | Target (6mo) |
|--------|---------|--------------|
| Keywords ranking top 10 | ~10 | 50+ |
| Organic traffic | Baseline | +150% |
| Blog traffic share | 30% | 50% |
| AI mentions | 0 | 5+ queries |

---

## Continuation Prompts

### After Phase 1 Complete:
```
Continue SEO expansion. Phase 1 (Schema Foundation) is complete.
Read SEO-EXPANSION-PLAN.md and start Phase 2: Optimize Existing Solution Pages.
Retarget keywords and add HowTo schemas to the 4 solution pages.
```

### After Phase 2 Complete:
```
Continue SEO expansion. Phase 2 (Optimize Existing) is complete.
Read SEO-EXPANSION-PLAN.md and start Phase 3: Create AI Magnet Authority Pages.
Create the 4 new learn/blog pages targeting high-value keywords.
```

### After Phase 3 Complete:
```
Continue SEO expansion. Phase 3 (Authority Content) is complete.
Read SEO-EXPANSION-PLAN.md and start Phase 4: Create Problem-Based Content.
Create 4 emotional/problem-focused blog posts.
```

### After Phase 4 Complete:
```
Continue SEO expansion. Phase 4 (Problem-Based Content) is complete.
Read SEO-EXPANSION-PLAN.md and start Phase 5: Viral & Comparison Content.
Create final 4 posts including competitor comparisons.
```

### After Phase 5 Complete:
```
SEO expansion complete. Read SEO-EXPANSION-PLAN.md and run final validation.
Run: pnpm lint && pnpm check-types && pnpm build
Update all internal links and verify schema markup with Google Rich Results Test.
```
