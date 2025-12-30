# Ammonia Control Page - Implementation Plan

## Task Overview

| # | Task | Dependencies | Est. Lines |
|---|------|--------------|------------|
| T1 | Create LandingHero component | - | ~80 |
| T2 | Create TrustBar component | - | ~50 |
| T3 | Create ProblemSection component | - | ~70 |
| T4 | Create SolutionSection component | - | ~60 |
| T5 | Create BenefitPillars component | - | ~80 |
| T6 | Create StatsBar component | - | ~50 |
| T7 | Create FinalCTA component | - | ~60 |
| T8 | Add translations (en.ts) | - | ~100 |
| T9 | Add translations (fr.ts) | T8 | ~100 |
| T10 | Add translations (zh.ts) | T8 | ~100 |
| T11 | Create page file | T1-T10 | ~150 |
| T12 | Add structured data | T11 | ~50 |
| T13 | Validate & test | T11 | - |

---

## Tasks

### T1: Create LandingHero Component
**File:** `src/components/sections/landing/LandingHero.tsx`
**Traces to:** AC-1.1

**Implementation:**
- Two-column layout (text left, image right)
- Breadcrumb navigation at top
- H1 headline, subheadline paragraph
- Primary CTA button, secondary text link
- next/image for hero image
- Responsive: stacks on mobile
- Dark mode support

**Done criteria:**
- [ ] Component renders with all props
- [ ] Responsive layout works
- [ ] Dark mode colors correct
- [ ] No TypeScript errors

---

### T2: Create TrustBar Component
**File:** `src/components/sections/landing/TrustBar.tsx`
**Traces to:** AC-1.2

**Implementation:**
- Horizontal centered layout
- Star rating display (filled stars)
- Customer count with icon
- Optional badge images
- Subtle background (gray-50/gray-800)

**Done criteria:**
- [ ] Displays rating, count, badges
- [ ] Centered on all screen sizes
- [ ] Dark mode support

---

### T3: Create ProblemSection Component
**File:** `src/components/sections/landing/ProblemSection.tsx`
**Traces to:** AC-1.3

**Implementation:**
- Section headline (H2)
- Three-column card grid
- Each card: icon, title (H3), description
- Cards with subtle shadow, rounded corners
- Grid stacks to single column on mobile

**Done criteria:**
- [ ] Three cards display correctly
- [ ] Icons render (use Lucide icons)
- [ ] Responsive grid works
- [ ] Dark mode support

---

### T4: Create SolutionSection Component
**File:** `src/components/sections/landing/SolutionSection.tsx`
**Traces to:** AC-1.4

**Implementation:**
- Tinted background (blue-50/gray-800)
- Section headline (H2)
- Centered diagram image with next/image
- Description paragraph below
- Optional id prop for anchor linking

**Done criteria:**
- [ ] Tinted background displays
- [ ] Image centered and responsive
- [ ] Anchor link works (#how-it-works)
- [ ] Dark mode support

---

### T5: Create BenefitPillars Component
**File:** `src/components/sections/landing/BenefitPillars.tsx`
**Traces to:** AC-1.5

**Implementation:**
- Section headline (H2)
- Three-column layout
- Each pillar: large icon (64px), title (H3), description
- Optional "Learn more" link per pillar
- Clean style (no card backgrounds)

**Done criteria:**
- [ ] Three pillars display
- [ ] Icons sized correctly (64px)
- [ ] Responsive layout
- [ ] Dark mode support

---

### T6: Create StatsBar Component
**File:** `src/components/sections/landing/StatsBar.tsx`
**Traces to:** AC-1.7

**Implementation:**
- Medium tinted background (blue-100/gray-700)
- Four-column grid
- Each stat: large number (text-5xl), small label
- 2x2 grid on mobile

**Done criteria:**
- [ ] Four stats display
- [ ] Numbers prominently sized
- [ ] 2x2 on mobile, 4-col on desktop
- [ ] Dark mode support

---

### T7: Create FinalCTA Component
**File:** `src/components/sections/landing/FinalCTA.tsx`
**Traces to:** AC-1.10

**Implementation:**
- Solid brand-green background
- White text throughout
- Centered headline (H2), subheadline
- Primary button (white bg, green text)
- Optional secondary link
- Benefit list with checkmark icons

**Done criteria:**
- [ ] Solid color background
- [ ] White text readable
- [ ] Buttons styled correctly
- [ ] Benefits with checkmarks

---

### T8: Add English Translations
**File:** `src/translations/en.ts`
**Traces to:** All AC

**Implementation:**
Add `ammonia` key with all required translations:
- meta (title, description)
- hero (headline, subheadline, cta, secondaryCta)
- problem (headline, card1-3 with title/description)
- solution (headline, description)
- benefits (headline, pillar1-3 with title/description)
- stats (days, savings, customers, rating)
- faq (headline, q1-a1 through q8-a8)
- cta (headline, subheadline, button, benefit1-2)

**Done criteria:**
- [ ] All keys added
- [ ] No TypeScript errors
- [ ] Content matches requirements doc

---

### T9: Add French Translations
**File:** `src/translations/fr.ts`
**Traces to:** All AC

**Implementation:**
- Copy structure from T8
- Translate all content to French

**Done criteria:**
- [ ] All keys match en.ts structure
- [ ] Content translated to French
- [ ] No TypeScript errors

---

### T10: Add Chinese Translations
**File:** `src/translations/zh.ts`
**Traces to:** All AC

**Implementation:**
- Copy structure from T8
- Translate all content to Chinese

**Done criteria:**
- [ ] All keys match en.ts structure
- [ ] Content translated to Chinese
- [ ] No TypeScript errors

---

### T11: Create Page File
**File:** `pages/ammonia-control.tsx`
**Traces to:** All AC
**Dependencies:** T1-T10

**Implementation:**
- Import all landing components
- NextSeo configuration
- Compose sections in correct order:
  1. LandingHero
  2. TrustBar
  3. ProblemSection
  4. SolutionSection (id="how-it-works")
  5. BenefitPillars
  6. Testimonials (reuse existing, filter relevant)
  7. StatsBar
  8. FAQ (reuse existing component)
  9. BlogPreview (reuse existing, filter relevant)
  10. FinalCTA
- Define data constants (problems, benefits, stats, faq items)
- Use translations throughout

**Done criteria:**
- [ ] Page renders without errors
- [ ] All sections display correctly
- [ ] Navigation/links work
- [ ] Dark mode works throughout
- [ ] Mobile responsive

---

### T12: Add Structured Data
**File:** `pages/ammonia-control.tsx` (update)
**Traces to:** AC-3.2
**Dependencies:** T11

**Implementation:**
- Add Product schema with ratings
- Add FAQPage schema with all questions
- Add BreadcrumbList schema
- Use existing StructuredData component or inline script

**Done criteria:**
- [ ] Product schema valid (test with Google tool)
- [ ] FAQPage schema valid
- [ ] BreadcrumbList schema valid

---

### T13: Validate & Test
**Dependencies:** T11, T12

**Implementation:**
Run all validation commands:
```bash
npm run lint
npm run check-types
npm run validate-dark-mode
npm run build
```

Test manually:
- Desktop view
- Mobile view (responsive)
- Dark mode toggle
- All links work
- Schema validation (Google Rich Results Test)

**Done criteria:**
- [ ] Lint passes (0 warnings)
- [ ] TypeScript passes (0 errors)
- [ ] Dark mode validation passes
- [ ] Build succeeds
- [ ] Manual testing complete

---

## Execution Order

```
Phase A: Components (can be parallel)
├── T1: LandingHero
├── T2: TrustBar
├── T3: ProblemSection
├── T4: SolutionSection
├── T5: BenefitPillars
├── T6: StatsBar
└── T7: FinalCTA

Phase B: Translations (sequential)
├── T8: en.ts
├── T9: fr.ts (after T8)
└── T10: zh.ts (after T8)

Phase C: Integration (sequential)
├── T11: Page file (after A & B)
├── T12: Structured data (after T11)
└── T13: Validate (after T12)
```

---

## Image Assets Needed

Before T11, ensure these exist:
- `/public/images/landing/ammonia-hero.webp` - Hero illustration
- `/public/images/landing/ammonia-diagram.webp` - How zeolite works

(Can use placeholder images initially)

---

## Status

| Task | Status | Notes |
|------|--------|-------|
| T1 | completed | LandingHero component created |
| T2 | completed | TrustBar component created |
| T3 | completed | ProblemSection component created |
| T4 | completed | SolutionSection component created |
| T5 | completed | BenefitPillars component created |
| T6 | completed | StatsBar (not used in final) |
| T7 | completed | FinalCTA component created |
| T8 | completed | English translations added |
| T9 | completed | French translations added |
| T10 | completed | Chinese translations added |
| T11 | completed | Page file created |
| T12 | completed | Structured data added |
| T13 | completed | Validations passed, content already ~2,500 words |

---

*Phase 3 Complete*
