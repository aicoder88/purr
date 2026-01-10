# Spanish Translation Implementation Plan

**Goal**: Add complete Spanish language support for LA market expansion

## Current State

### Already Complete
- `src/translations/es.ts` exists with 2,400+ lines of Spanish translations
- `next.config.js` has `es` locale configured with domain `es.purrify.ca`
- Translation context (`src/lib/translation-context.tsx`) supports Spanish
- Core pages (homepage, products, checkout) use `useTranslation()` and will work once translations are complete

### Gaps Identified
1. **contact.tsx** - Has Spanish translations in `es.ts` but page uses hardcoded arrays
2. **about/our-story.tsx** - Uses `enStoryData` directly, no `esStoryData` exists
3. **Blog content** - No Spanish posts in `/content/blog/es/`
4. **es.ts audit** - May have missing keys for newer features

---

## Implementation Tasks

### Phase 1: Connect Existing Translations (1-2 hours)

#### Task 1.1: Refactor contact.tsx to use translations
**File**: `pages/contact.tsx`

**Changes**:
- Replace hardcoded `contactMethods` array (lines 42-68) with `t.contactPage.contactMethods`
- Replace hardcoded `faqs` array (lines 70-87) with `t.contactPage.faqs`
- Replace hardcoded page title/description (lines 29-30) with translation keys
- Use `t.contactPage.businessHours`, `t.contactPage.location` for those sections
- Update form labels to use `t.contactPage.form.*`

**Note**: The Spanish translations already exist in `es.ts` lines 830-904

#### Task 1.2: Create esStoryData and update our-story.tsx
**Files**:
- `src/lib/page-data.ts` - Add `esStoryData` (translate from `enStoryData`/`frStoryData`)
- `pages/about/our-story.tsx` - Add locale-aware data selection

**Changes to page-data.ts**:
```typescript
export const esStoryData = {
  milestones: [...], // Translate from enStoryData
  values: [...],
  team: [...],
  stats: [...]
};
```

**Changes to our-story.tsx**:
```typescript
import { enStoryData, frStoryData, esStoryData } from '../../src/lib/page-data';

const storyDataByLocale = { en: enStoryData, fr: frStoryData, es: esStoryData, zh: enStoryData };
const storyData = storyDataByLocale[locale as keyof typeof storyDataByLocale] || enStoryData;
const { values, team, stats } = storyData;
```

---

### Phase 2: Audit and Complete es.ts (2-3 hours)

#### Task 2.1: Compare es.ts against types.ts interface
- Read `src/translations/types.ts` to identify all required keys
- Check each section in `es.ts` for completeness
- Add any missing translations

#### Task 2.2: LA market-specific updates
- Update shipping messaging to emphasize USA delivery
- Add "Los Angeles" to location modifiers if relevant
- Ensure pricing shows USD where applicable

---

### Phase 3: Create Spanish Blog Content (3-4 hours)

#### Task 3.1: Create blog directory structure
```bash
mkdir -p content/blog/es
```

#### Task 3.2: Translate priority blog posts (10 posts)

**Priority posts for LA apartment dwellers**:
1. `best-cat-litter-for-apartments.json` - High apartment density in LA
2. `apartment-litter-box-smell-solution.json` - Direct problem solver
3. `how-to-get-rid-of-cat-litter-smell-in-apartment.json` - SEO target
4. `best-litter-odor-remover-small-apartments.json` - Specific to small spaces
5. `how-to-eliminate-cat-litter-odor.json` - Core buyer intent

**Product education posts**:
6. `activated-carbon-for-cat-litter-complete-guide.json` - Product understanding
7. `how-to-use-cat-litter-deodorizer.json` - Usage instructions

**Multi-cat and general**:
8. `multi-cat-litter-deodorizer-guide.json` - Multi-cat households
9. `best-cat-litter-odor-control-2026.json` - Year-current content
10. `cat-litter-odor-control-usa.json` - USA market focus

**For each post**:
- Create Spanish JSON file in `/content/blog/es/`
- Translate title, excerpt, content, SEO metadata
- Keep same slug for URL consistency
- Update `locale: "es"` field

#### Task 3.3: Verify categories.json and tags.json have Spanish entries
**Files**:
- `content/categories.json`
- `content/tags.json`

---

### Phase 4: Testing and Verification (1-2 hours)

#### Task 4.1: Manual page testing
Navigate to each Spanish page and verify:
- [ ] `/es` - Homepage renders in Spanish
- [ ] `/es/products/trial-size` - Product page in Spanish
- [ ] `/es/products/standard` - Product page in Spanish
- [ ] `/es/contact` - Contact page uses Spanish from translations
- [ ] `/es/about/our-story` - Story page uses esStoryData
- [ ] `/es/blog` - Blog index shows Spanish posts
- [ ] `/es/blog/[slug]` - Individual posts render in Spanish

#### Task 4.2: Run validation scripts
```bash
pnpm lint
pnpm check-types
pnpm validate-dark-mode
```

#### Task 4.3: SEO verification
- Verify hreflang tags include `es` alternate
- Check Spanish meta descriptions render correctly
- Validate structured data in Spanish pages

---

## Critical Files Summary

| File | Action |
|------|--------|
| `pages/contact.tsx` | Refactor to use `t.contactPage.*` |
| `pages/about/our-story.tsx` | Add locale-aware story data selection |
| `src/lib/page-data.ts` | Add `esStoryData` object |
| `src/translations/es.ts` | Audit for missing keys, add any gaps |
| `content/blog/es/*.json` | Create 10 translated blog posts |
| `content/categories.json` | Verify Spanish entries |
| `content/tags.json` | Verify Spanish entries |

---

## Language Guidelines for LA Market

- Use **neutral/Latin American Spanish** (not Castilian)
- Consider **Mexican Spanish vocabulary** (largest LA Hispanic demographic)
- Emphasize **apartment living** solutions
- Highlight **USA shipping** prominently
- Use **USD pricing** for US market pages

---

## Verification Checklist

- [ ] All core pages render in Spanish without English fallback text
- [ ] Contact form works and sends emails
- [ ] Product pages show Spanish descriptions and pricing
- [ ] Blog posts display correctly with Spanish content
- [ ] No console errors on Spanish pages
- [ ] Pre-commit checks pass (`pnpm lint && pnpm check-types && pnpm validate-dark-mode`)
