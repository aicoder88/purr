# SEO Transformation Implementation Tasks

## Overview

This document breaks down the SEO transformation into **50 discrete tasks** organized into **10 phases**. Each task includes:
- Clear description and scope
- Requirements mapping (AC-X.X)
- File paths to modify/create
- Dependencies on other tasks
- Done criteria for validation

**Estimated Total Effort**: ~80-100 hours over 4-6 weeks

---

## Task Dependency Graph

```
PHASE 1: Foundation (No Dependencies)
├─ T1: Install dependencies
├─ T2: Create SEO utilities structure
└─ T3: Add TypeScript types

PHASE 2: Meta Tag Optimization (Depends on Phase 1)
├─ T4: Enhanced meta title optimizer ───┐
├─ T5: Enhanced meta description optimizer ──┤
├─ T6: Meta content validator ───────────────┤
├─ T7: Add SEO meta translations ────────────┤
└─ T8: Update all pages with optimized meta ─┴─> T9: Meta validation tests

PHASE 3: Schema Validation (Depends on Phase 1)
├─ T10: Product schema validator ───┐
├─ T11: Article schema validator ───┤
├─ T12: FAQ schema validator ────────┤
├─ T13: Organization schema validator ┤
├─ T14: Add currency to Product schema ┤
└─ T15: Add image dimensions to schemas ┴─> T16: Schema validation tests

PHASE 4: Sitemap Generation (Depends on Phase 1)
├─ T17: Page scanner ───────┐
├─ T18: Dynamic route handlers ─┤
├─ T19: Enhanced sitemap generator ┤
├─ T20: Sitemap validator ──────────┤
└─ T21: Language alternates ────────┴─> T22: Sitemap generation tests

PHASE 5: Internal Linking (Depends on Phase 1, 4)
├─ T23: Link graph builder ─────┐
├─ T24: Link extraction utility ─┤
├─ T25: Relevance scorer ────────┤
├─ T26: Link suggestion engine ──┤
└─ T27: Auto-linking component ──┴─> T28: Link analysis tests

PHASE 6: Validation System (Depends on Phase 2, 3, 4, 5)
├─ T29: Pre-build validation script ───┐
├─ T30: Image SEO validator ───────────┤
├─ T31: OG canonical validator ────────┤
└─ T32: Integration with prebuild hook ┴─> T33: Validation system tests

PHASE 7: Runtime Enhancements (Depends on Phase 2, 3)
├─ T34: useEnhancedSEO hook ───┐
├─ T35: Enhanced schema component ┤
└─ T36: Update page components ───┴─> T37: Runtime tests

PHASE 8: SEO APIs (Depends on Phase 2, 3, 5, 6)
├─ T38: SEO validation API ────┐
├─ T39: Link suggestion API ───┤
└─ T40: SEO stats API ──────────┴─> T41: API tests

PHASE 9: Content Optimization (Depends on Phase 2, 7)
├─ T42: Rewrite homepage meta ─────┐
├─ T43: Rewrite product page meta ─┤
├─ T44: Rewrite blog post meta ────┤
├─ T45: Rewrite learn page meta ───┤
└─ T46: Add missing meta descriptions ┴─> T47: Meta content tests

PHASE 10: Monitoring & Documentation (Depends on Phase 8)
├─ T48: SEO health dashboard ──┐
├─ T49: Build report generator ┤
└─ T50: Documentation update ───┴─> COMPLETE
```

---

## PHASE 1: Foundation & Setup

### T1: Install Required Dependencies

**Requirements**: None (setup)
**Dependencies**: None
**Effort**: 15 minutes

**Description**: Install npm packages needed for SEO validation and optimization.

**Files**:
- `package.json`

**Actions**:
```bash
pnpm add cheerio fast-glob ajv ajv-formats
pnpm add -D puppeteer lighthouse html-validate
```

**Done Criteria**:
- [ ] All packages installed successfully
- [ ] `pnpm install` runs without errors
- [ ] TypeScript types available for new packages

---

### T2: Create SEO Utilities File Structure

**Requirements**: AC-10.1 (Centralized SEO logic)
**Dependencies**: None
**Effort**: 30 minutes

**Description**: Create new directory structure for enhanced SEO utilities without modifying existing code.

**Files to Create**:
- `src/lib/seo/enhanced-seo-utils.ts` (new)
- `src/lib/seo/schema-validator.ts` (new)
- `src/lib/seo/link-graph-analyzer.ts` (new)
- `src/lib/seo/redirect-manager.ts` (new)
- `src/lib/seo/meta-optimizer.ts` (new)
- `src/lib/seo/types.ts` (new)

**Actions**:
1. Create `src/lib/seo/` directory
2. Create empty TypeScript files with basic exports
3. Add barrel export `src/lib/seo/index.ts`

**Done Criteria**:
- [ ] All files created
- [ ] TypeScript compiles without errors
- [ ] Files export at least one function/type
- [ ] Barrel export imports all modules

---

### T3: Add TypeScript Types for SEO

**Requirements**: AC-10.1
**Dependencies**: T2
**Effort**: 45 minutes

**Description**: Define comprehensive TypeScript types for SEO data models.

**Files to Modify**:
- `src/lib/seo/types.ts`

**Actions**:
1. Define `PageSEOMetadata` interface
2. Define `SitemapEntry` interface
3. Define `LinkGraphNode` interface
4. Define `ValidationError` interface
5. Define `ValidationResult` interface
6. Define schema type interfaces (ProductSchema, ArticleSchema, etc.)

**Code**:
```typescript
// src/lib/seo/types.ts
export interface PageSEOMetadata {
  path: string;
  locale: 'en' | 'fr' | 'zh' | 'es';
  title: string;
  titleLength: number;
  description: string;
  descriptionLength: number;
  keywords: string[];
  targetKeyword?: string;
  canonicalUrl: string;
  // ... (full interface from design.md)
}

export interface ValidationError {
  page: string;
  severity: 'critical' | 'error' | 'warning';
  type: 'meta' | 'schema' | 'links' | 'images' | 'sitemap';
  field: string;
  message: string;
  fix?: string;
}

// ... (all interfaces from design.md)
```

**Done Criteria**:
- [ ] All interfaces defined
- [ ] TypeScript compiles without errors
- [ ] JSDoc comments added to all interfaces
- [ ] Exported from `src/lib/seo/index.ts`

---

## PHASE 2: Meta Tag Optimization

### T4: Enhanced Meta Title Optimizer

**Requirements**: AC-2.1, AC-2.4, AC-2.5
**Dependencies**: T2, T3
**Effort**: 2 hours

**Description**: Create function that optimizes meta titles with smart truncation and keyword front-loading.

**Files to Modify**:
- `src/lib/seo/meta-optimizer.ts`

**Actions**:
1. Import existing `normalizeMetaTitle` from `seo-utils.ts`
2. Create `optimizeMetaTitle()` function
3. Implement keyword front-loading logic
4. Implement smart suffix removal (remove " | Purrify" if too long)
5. Add validation warnings

**Code Skeleton**:
```typescript
export function optimizeMetaTitle(
  title: string,
  targetKeyword?: string,
  locale?: LocaleCode
): {
  title: string;
  isTruncated: boolean;
  length: number;
  warnings: string[];
} {
  const warnings: string[] = [];

  // 1. Front-load target keyword if not already at start
  let optimized = title;
  if (targetKeyword && !title.toLowerCase().startsWith(targetKeyword.toLowerCase())) {
    const keywordPattern = new RegExp(targetKeyword, 'i');
    if (keywordPattern.test(title)) {
      // Move keyword to front
      optimized = title.replace(keywordPattern, '').trim();
      optimized = `${targetKeyword} - ${optimized}`;
      warnings.push('Moved target keyword to front of title');
    }
  }

  // 2. Check length and truncate if needed
  if (optimized.length > 60) {
    // Try removing suffix first
    if (optimized.includes(' | Purrify')) {
      optimized = optimized.replace(' | Purrify', '');
      warnings.push('Removed suffix to fit length limit');
    }

    // Still too long? Truncate
    if (optimized.length > 60) {
      optimized = optimized.slice(0, 59).trimEnd() + '…';
      warnings.push('Truncated title to 60 characters');
    }
  }

  // 3. Use existing normalization for final cleanup
  const normalized = normalizeMetaTitle(optimized);

  return {
    title: normalized,
    isTruncated: normalized.length < title.length,
    length: normalized.length,
    warnings,
  };
}
```

**Done Criteria**:
- [ ] Function implemented
- [ ] Front-loads keywords correctly
- [ ] Removes suffix when needed
- [ ] Truncates to max 60 characters
- [ ] Returns warnings array
- [ ] Unit tests pass (see T9)

---

### T5: Enhanced Meta Description Optimizer

**Requirements**: AC-2.2, AC-2.3
**Dependencies**: T2, T3
**Effort**: 2 hours

**Description**: Create function that optimizes meta descriptions with benefit-driven language and CTAs.

**Files to Modify**:
- `src/lib/seo/meta-optimizer.ts`

**Actions**:
1. Import existing `normalizeMetaDescription` from `seo-utils.ts`
2. Create `optimizeMetaDescription()` function
3. Ensure 140-155 character range
4. Add CTA if space permits
5. Validate benefit-driven language

**Code Skeleton**:
```typescript
export function optimizeMetaDescription(
  description: string,
  targetKeyword?: string,
  locale?: LocaleCode
): {
  description: string;
  isTruncated: boolean;
  length: number;
  warnings: string[];
} {
  const warnings: string[] = [];
  let optimized = description;

  // 1. Check for target keyword
  if (targetKeyword && !description.toLowerCase().includes(targetKeyword.toLowerCase())) {
    warnings.push(`Consider adding target keyword: "${targetKeyword}"`);
  }

  // 2. Check for benefit-driven language
  const benefitWords = ['stop', 'eliminate', 'instant', 'free', 'proven', 'guaranteed'];
  const hasBenefit = benefitWords.some(word => description.toLowerCase().includes(word));
  if (!hasBenefit) {
    warnings.push('Consider adding benefit-driven words (stop, eliminate, instant, etc.)');
  }

  // 3. Ensure optimal length (140-155 chars)
  if (optimized.length < 140) {
    // Try adding CTA
    const ctas = ['Try it free.', 'Shop now.', 'Learn more.', 'Get started.'];
    const cta = ctas[0]; // Choose based on context
    if (optimized.length + cta.length + 1 <= 155) {
      optimized = `${optimized} ${cta}`;
      warnings.push('Added CTA to reach optimal length');
    }
  }

  if (optimized.length > 155) {
    optimized = optimized.slice(0, 154).trimEnd() + '…';
    warnings.push('Truncated description to 155 characters');
  }

  // 4. Use existing normalization
  const normalized = normalizeMetaDescription(optimized);

  return {
    description: normalized,
    isTruncated: normalized.length < description.length,
    length: normalized.length,
    warnings,
  };
}
```

**Done Criteria**:
- [ ] Function implemented
- [ ] Validates keyword presence
- [ ] Checks for benefit-driven language
- [ ] Adds CTA when appropriate
- [ ] Ensures 140-155 character range
- [ ] Unit tests pass (see T9)

---

### T6: Meta Content Validator

**Requirements**: AC-2.1, AC-2.2, AC-2.3
**Dependencies**: T4, T5
**Effort**: 1.5 hours

**Description**: Create validator that scores meta content quality and provides suggestions.

**Files to Modify**:
- `src/lib/seo/meta-optimizer.ts`

**Actions**:
1. Create `validateMetaContent()` function
2. Implement scoring algorithm (0-100)
3. Generate actionable suggestions
4. Check for numbers, year, CTAs

**Code Skeleton**:
```typescript
export function validateMetaContent(
  title: string,
  description: string,
  targetKeyword?: string
): {
  isValid: boolean;
  score: number; // 0-100
  suggestions: string[];
} {
  const suggestions: string[] = [];
  let score = 100;

  // Title validation
  if (targetKeyword && !title.toLowerCase().includes(targetKeyword.toLowerCase())) {
    suggestions.push(`Include target keyword "${targetKeyword}" in title`);
    score -= 20;
  }

  // Benefit-driven language
  const benefitWords = ['stop', 'eliminate', 'instant', 'free', 'proven', 'guaranteed'];
  const hasBenefit = benefitWords.some(word =>
    title.toLowerCase().includes(word) || description.toLowerCase().includes(word)
  );
  if (!hasBenefit) {
    suggestions.push('Add benefit-driven words (stop, eliminate, instant, etc.)');
    score -= 15;
  }

  // Numbers (proven to increase CTR)
  const hasNumber = /\d+/.test(title) || /\d+/.test(description);
  if (!hasNumber) {
    suggestions.push('Add numbers for credibility (e.g., "99% effective", "10,000+ customers")');
    score -= 10;
  }

  // Year (freshness signal)
  const currentYear = new Date().getFullYear();
  const hasYear = title.includes(String(currentYear)) || description.includes(String(currentYear));
  if (!hasYear) {
    suggestions.push(`Add current year (${currentYear}) for freshness`);
    score -= 5;
  }

  // CTA in description
  const ctaWords = ['try', 'get', 'shop', 'buy', 'learn', 'discover', 'see'];
  const hasCTA = ctaWords.some(word => description.toLowerCase().includes(word));
  if (!hasCTA) {
    suggestions.push('Add call-to-action to description');
    score -= 10;
  }

  return {
    isValid: score >= 70,
    score,
    suggestions,
  };
}
```

**Done Criteria**:
- [ ] Validator implemented
- [ ] Scoring algorithm works correctly
- [ ] Suggestions are actionable
- [ ] Returns valid boolean (score >= 70)
- [ ] Unit tests pass (see T9)

---

### T7: Add SEO Meta Translations

**Requirements**: AC-2.1, AC-2.2, AC-2.3
**Dependencies**: None
**Effort**: 4 hours

**Description**: Create centralized SEO meta content for all major pages in all languages.

**Files to Create**:
- `src/translations/seo-meta.ts` (new)

**Files to Modify**:
- `src/translations/en.ts` (add import reference)
- `src/translations/fr.ts` (add import reference)
- `src/translations/zh.ts` (add import reference)
- `src/translations/es.ts` (add import reference)

**Actions**:
1. Create `SEO_META` object with structure for all pages
2. Write optimized meta content for English (en)
3. Translate to French (fr)
4. Translate to Chinese (zh)
5. Translate to Spanish (es)

**Code Skeleton**:
```typescript
// src/translations/seo-meta.ts
export const SEO_META = {
  en: {
    homepage: {
      title: "Stop Cat Litter Smell Instantly - Activated Carbon Odor Eliminator",
      description: "No more embarrassing cat smell! Our activated carbon eliminates 99% of ammonia odor in 30 seconds. Guests will think you don't have cats. Free trial + free shipping.",
      targetKeyword: "cat litter smell",
    },
    products: {
      trial: {
        title: "FREE Cat Litter Deodorizer Trial - Just Pay $4.76 Shipping",
        description: "Try our #1 activated carbon cat litter additive FREE. Eliminates ammonia smell instantly. See why 10,000+ customers love Purrify. Just pay shipping.",
        targetKeyword: "free cat litter deodorizer",
      },
      standard: {
        title: "Best Cat Litter Odor Eliminator - 50g Activated Carbon [2026]",
        description: "Our most popular size! Eliminates 99% of cat litter ammonia smell for 30 days. Works with any litter. 10,000+ happy customers. Free shipping Canada & USA.",
        targetKeyword: "best cat litter odor eliminator",
      },
      family: {
        title: "Multi-Cat Litter Deodorizer - 120g Activated Carbon for 2+ Cats",
        description: "Perfect for multi-cat homes! Eliminates even the strongest ammonia smell. Lasts 60+ days. Stop being embarrassed by cat odor. Free shipping.",
        targetKeyword: "multi-cat litter deodorizer",
      },
    },
    blog: {
      odorAbsorber: {
        title: "Most Powerful Cat Litter Odor Absorber [Tested 12 Products 2026]",
        description: "We tested 12 odor eliminators. Only 1 removed ammonia smell in 30 seconds. See the shocking results and learn which works best for apartments.",
        targetKeyword: "most powerful odor absorber",
      },
      smallApartments: {
        title: "Best Cat Litter Odor Remover for Small Apartments [2026 Guide]",
        description: "Living in a small space? Discover the odor eliminator that works in 500 sq ft apartments. Stop worrying about guests smelling your litter box.",
        targetKeyword: "cat litter odor remover small apartments",
      },
      activatedCarbonBenefits: {
        title: "Activated Carbon Cat Litter Benefits [Science-Backed Guide 2026]",
        description: "Learn how activated carbon eliminates cat litter smell at the molecular level. Science-backed benefits, usage tips, and why it beats baking soda.",
        targetKeyword: "activated carbon cat litter benefits",
      },
      // ... all other blog posts
    },
    learn: {
      howItWorks: {
        title: "How Activated Carbon Eliminates Cat Litter Smell [The Science]",
        description: "Discover how water-filter grade activated carbon traps ammonia molecules at the source. Stop masking odors - eliminate them permanently with science.",
        targetKeyword: "how activated carbon works",
      },
      activatedCarbonBenefits: {
        title: "Activated Carbon Benefits for Cat Litter [Complete Guide 2026]",
        description: "Complete guide to activated carbon benefits: molecular odor elimination, safety for cats, cost savings, and environmental impact. Evidence-based.",
        targetKeyword: "activated carbon benefits",
      },
      faq: {
        title: "Cat Litter Odor Control FAQ - Your Questions Answered [2026]",
        description: "Get answers to all your cat litter odor questions. How it works, safety, usage, and effectiveness. Evidence-based answers from pet care experts.",
        targetKeyword: "cat litter odor control faq",
      },
      // ... all other learn pages
    },
  },
  fr: {
    // French translations
    homepage: {
      title: "Éliminez l'odeur de litière instantanément - Charbon actif",
      description: "Fini l'odeur embarrassante! Notre charbon actif élimine 99% de l'ammoniac en 30 secondes. Vos invités penseront que vous n'avez pas de chat.",
      targetKeyword: "odeur litière chat",
    },
    // ... all pages in French
  },
  zh: {
    // Chinese translations
    homepage: {
      title: "立即消除猫砂异味 - 活性炭除臭剂",
      description: "不再尴尬！我们的活性炭在30秒内消除99%的氨气异味。客人会以为您没有养猫。免费试用+免运费。",
      targetKeyword: "猫砂异味",
    },
    // ... all pages in Chinese
  },
  es: {
    // Spanish translations
    homepage: {
      title: "Elimina el olor de la arena para gatos al instante - Carbón activado",
      description: "¡No más vergüenza! Nuestro carbón activado elimina el 99% del olor a amoníaco en 30 segundos. Tus invitados pensarán que no tienes gatos.",
      targetKeyword: "olor arena gatos",
    },
    // ... all pages in Spanish
  },
};
```

**Pages to Include** (minimum):
- Homepage
- Products: trial, standard, family
- Blog: top 10 posts by impressions from GSC data
- Learn: how-it-works, activated-carbon-benefits, faq, safety

**Done Criteria**:
- [ ] SEO_META object created with all pages
- [ ] All English meta content written
- [ ] All French translations added
- [ ] All Chinese translations added
- [ ] All Spanish translations added
- [ ] All titles 50-60 characters
- [ ] All descriptions 140-155 characters
- [ ] All include target keywords
- [ ] Benefit-driven language used
- [ ] Numbers/stats included where possible

---

### T8: Update Pages with Optimized Meta

**Requirements**: AC-2.1, AC-2.2, AC-2.3, AC-2.4, AC-2.5
**Dependencies**: T4, T5, T7
**Effort**: 6 hours

**Description**: Update all major pages to use optimized meta content from SEO_META.

**Files to Modify** (minimum 20 pages):
- `pages/index.tsx` (homepage)
- `pages/products/trial-size.tsx`
- `pages/products/standard.tsx`
- `pages/products/family-pack.tsx`
- `pages/blog/most-powerful-odor-absorber.tsx`
- `pages/blog/best-litter-odor-remover-small-apartments.tsx`
- `pages/blog/activated-carbon-litter-additive-benefits.tsx`
- `pages/blog/cat-litter-smell-worse-summer.tsx`
- `pages/blog/how-to-use-cat-litter-deodorizer.tsx`
- `pages/learn/how-it-works.tsx`
- `pages/learn/activated-carbon-benefits.tsx`
- `pages/learn/activated-carbon-vs-baking-soda-deodorizers.tsx`
- `pages/learn/faq.tsx`
- ... (continue for all high-traffic pages)

**Actions for Each Page**:
1. Import SEO_META
2. Use `useTranslation()` hook to get locale
3. Extract SEO meta for current page
4. Replace hardcoded title/description with SEO_META values
5. Ensure NextSeo component uses optimized values

**Code Pattern**:
```typescript
// BEFORE:
import { NextSeo } from 'next-seo';

export default function TrialSizePage() {
  return (
    <>
      <NextSeo
        title="Trial Size | Purrify"
        description="Try Purrify activated carbon cat litter additive."
      />
      {/* content */}
    </>
  );
}

// AFTER:
import { NextSeo } from 'next-seo';
import { useTranslation } from '@/lib/translation-context';
import { SEO_META } from '@/translations/seo-meta';

export default function TrialSizePage() {
  const { locale } = useTranslation();
  const seo = SEO_META[locale].products.trial;

  return (
    <>
      <NextSeo
        title={seo.title}
        description={seo.description}
        // ... rest of SEO config
      />
      {/* content */}
    </>
  );
}
```

**Done Criteria**:
- [ ] All 20+ high-traffic pages updated
- [ ] All pages use SEO_META
- [ ] All pages pass meta length validation
- [ ] No hardcoded meta content remains
- [ ] Build completes successfully
- [ ] Manual verification: view source shows optimized meta

---

### T9: Meta Tag Validation Tests

**Requirements**: AC-2.1, AC-2.2, AC-2.3
**Dependencies**: T4, T5, T6
**Effort**: 2 hours

**Description**: Create comprehensive unit tests for meta tag optimization functions.

**Files to Create**:
- `__tests__/lib/seo/meta-optimizer.test.ts`

**Actions**:
1. Test `optimizeMetaTitle()`
2. Test `optimizeMetaDescription()`
3. Test `validateMetaContent()`
4. Test edge cases (empty strings, special characters, etc.)

**Code Skeleton**:
```typescript
// __tests__/lib/seo/meta-optimizer.test.ts
import {
  optimizeMetaTitle,
  optimizeMetaDescription,
  validateMetaContent,
} from '@/lib/seo/meta-optimizer';

describe('optimizeMetaTitle', () => {
  it('should front-load target keyword', () => {
    const result = optimizeMetaTitle(
      'Best Solution for Cat Litter Smell',
      'cat litter smell'
    );
    expect(result.title).toMatch(/^cat litter smell/i);
  });

  it('should truncate long titles to 60 characters', () => {
    const longTitle = 'A'.repeat(100);
    const result = optimizeMetaTitle(longTitle);
    expect(result.length).toBeLessThanOrEqual(60);
    expect(result.isTruncated).toBe(true);
  });

  it('should remove suffix if title too long', () => {
    const result = optimizeMetaTitle(
      'Very Long Product Title That Exceeds The Maximum Character Limit | Purrify'
    );
    expect(result.title).not.toContain('| Purrify');
    expect(result.length).toBeLessThanOrEqual(60);
  });

  it('should return warnings for optimizations', () => {
    const result = optimizeMetaTitle(
      'Best Cat Litter Deodorizer Solution Product | Purrify',
      'cat litter deodorizer'
    );
    expect(result.warnings.length).toBeGreaterThan(0);
  });
});

describe('optimizeMetaDescription', () => {
  it('should ensure description is 140-155 characters', () => {
    const shortDesc = 'Short description.';
    const result = optimizeMetaDescription(shortDesc);
    expect(result.length).toBeGreaterThanOrEqual(140);
    expect(result.length).toBeLessThanOrEqual(155);
  });

  it('should add CTA if space permits', () => {
    const desc = 'This is a good description that is somewhat long but not quite at the optimal length yet.';
    const result = optimizeMetaDescription(desc);
    const ctas = ['try', 'get', 'shop', 'learn', 'discover'];
    const hasCTA = ctas.some(cta => result.description.toLowerCase().includes(cta));
    expect(hasCTA).toBe(true);
  });

  it('should truncate long descriptions', () => {
    const longDesc = 'A'.repeat(200);
    const result = optimizeMetaDescription(longDesc);
    expect(result.length).toBeLessThanOrEqual(155);
    expect(result.isTruncated).toBe(true);
  });
});

describe('validateMetaContent', () => {
  it('should score highly for optimal meta content', () => {
    const result = validateMetaContent(
      'Stop Cat Litter Smell 2026 - 99% Effective Odor Eliminator',
      'Eliminate 99% of cat litter ammonia smell in 30 seconds. Join 10,000+ happy customers. Free trial available. Shop now and get free shipping.',
      'cat litter smell'
    );
    expect(result.score).toBeGreaterThanOrEqual(90);
    expect(result.isValid).toBe(true);
  });

  it('should penalize missing keyword', () => {
    const result = validateMetaContent(
      'Best Product Ever',
      'Great description with all the features.',
      'cat litter smell'
    );
    expect(result.score).toBeLessThan(90);
    expect(result.suggestions).toContain(expect.stringContaining('keyword'));
  });

  it('should suggest adding numbers', () => {
    const result = validateMetaContent(
      'Cat Litter Deodorizer',
      'Great odor eliminator for cats.',
      'cat litter'
    );
    expect(result.suggestions).toContain(expect.stringContaining('numbers'));
  });
});
```

**Done Criteria**:
- [ ] All test files created
- [ ] 15+ test cases implemented
- [ ] All tests pass
- [ ] Code coverage > 80% for meta optimizer functions
- [ ] Edge cases covered (empty, null, special chars)

---

## PHASE 3: Schema Validation & Enhancement

### T10: Product Schema Validator

**Requirements**: AC-4.1, AC-4.2, AC-4.6, AC-4.7
**Dependencies**: T2, T3
**Effort**: 3 hours

**Description**: Create validator for Product schema against Google Shopping requirements.

**Files to Create**:
- `src/lib/seo/schema-validator.ts`

**Actions**:
1. Create `validateProductSchema()` function
2. Validate required fields (price, currency, availability, image)
3. Validate price format and validity
4. Validate availability URL format
5. Validate aggregateRating if present
6. Return actionable errors and warnings

**Code Skeleton**:
```typescript
// src/lib/seo/schema-validator.ts
import { ValidationResult, ValidationError } from './types';

export function validateProductSchema(schema: any): ValidationResult {
  const errors: ValidationError[] = [];

  // Required: offers.price
  if (!schema.offers?.price) {
    errors.push({
      field: 'offers.price',
      message: 'Price is required for product rich results',
      severity: 'error',
      fix: 'Add price to Product offers',
    });
  } else {
    // Validate price format
    const price = parseFloat(schema.offers.price);
    if (isNaN(price) || price <= 0) {
      errors.push({
        field: 'offers.price',
        message: 'Price must be a positive number',
        severity: 'error',
      });
    }
  }

  // Required: offers.priceCurrency
  if (!schema.offers?.priceCurrency) {
    errors.push({
      field: 'offers.priceCurrency',
      message: 'Currency is required (CAD or USD)',
        severity: 'error',
    });
  } else if (!['CAD', 'USD'].includes(schema.offers.priceCurrency)) {
    errors.push({
      field: 'offers.priceCurrency',
      message: 'Currency must be CAD or USD',
      severity: 'error',
    });
  }

  // Required: offers.availability
  if (!schema.offers?.availability) {
    errors.push({
      field: 'offers.availability',
      message: 'Availability is required',
      severity: 'error',
    });
  } else if (!schema.offers.availability.startsWith('https://schema.org/')) {
    errors.push({
      field: 'offers.availability',
      message: 'Availability must be a schema.org URL (e.g., https://schema.org/InStock)',
      severity: 'error',
      fix: 'Use buildAvailabilityUrl() helper',
    });
  }

  // Required: image
  if (!schema.image || schema.image.length === 0) {
    errors.push({
      field: 'image',
      message: 'At least one image is required',
      severity: 'error',
    });
  }

  // Validate aggregateRating if present
  if (schema.aggregateRating) {
    if (!schema.aggregateRating.ratingValue) {
      errors.push({
        field: 'aggregateRating.ratingValue',
        message: 'Rating value is required if aggregateRating is present',
        severity: 'error',
      });
    }
    if (!schema.aggregateRating.reviewCount) {
      errors.push({
        field: 'aggregateRating.reviewCount',
        message: 'Review count is required if aggregateRating is present',
        severity: 'error',
      });
    }
  }

  // Warning: missing aggregateRating
  if (!schema.aggregateRating) {
    errors.push({
      field: 'aggregateRating',
      message: 'Consider adding aggregateRating for better visibility',
      severity: 'warning',
    });
  }

  return {
    isValid: errors.filter(e => e.severity === 'error').length === 0,
    errors: errors.filter(e => e.severity === 'error'),
    warnings: errors.filter(e => e.severity === 'warning'),
  };
}
```

**Done Criteria**:
- [ ] Function implemented
- [ ] Validates all required fields
- [ ] Validates field formats
- [ ] Returns actionable fix suggestions
- [ ] Distinguishes errors from warnings
- [ ] Unit tests pass (see T16)

---

### T11: Article Schema Validator

**Requirements**: AC-4.2, AC-4.7
**Dependencies**: T10
**Effort**: 2 hours

**Description**: Create validator for Article schema.

**Files to Modify**:
- `src/lib/seo/schema-validator.ts`

**Actions**:
1. Create `validateArticleSchema()` function
2. Validate required fields (headline, image, datePublished, author, publisher)
3. Validate date formats (ISO 8601)
4. Validate publisher logo dimensions

**Code Skeleton**:
```typescript
export function validateArticleSchema(schema: any): ValidationResult {
  const errors: ValidationError[] = [];

  // Required: headline
  if (!schema.headline) {
    errors.push({
      field: 'headline',
      message: 'Headline is required for Article schema',
      severity: 'error',
    });
  }

  // Required: image
  if (!schema.image) {
    errors.push({
      field: 'image',
      message: 'Image is required for Article schema',
      severity: 'error',
    });
  }

  // Required: datePublished
  if (!schema.datePublished) {
    errors.push({
      field: 'datePublished',
      message: 'datePublished is required',
      severity: 'error',
    });
  } else {
    // Validate ISO 8601 format
    const dateRegex = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(.\d{3})?Z)?$/;
    if (!dateRegex.test(schema.datePublished)) {
      errors.push({
        field: 'datePublished',
        message: 'datePublished must be in ISO 8601 format (YYYY-MM-DD or YYYY-MM-DDTHH:mm:ss.sssZ)',
        severity: 'error',
      });
    }
  }

  // Required: author
  if (!schema.author) {
    errors.push({
      field: 'author',
      message: 'Author is required',
      severity: 'error',
    });
  }

  // Required: publisher
  if (!schema.publisher) {
    errors.push({
      field: 'publisher',
      message: 'Publisher is required',
      severity: 'error',
    });
  } else {
    // Validate publisher logo
    if (!schema.publisher.logo?.url) {
      errors.push({
        field: 'publisher.logo.url',
        message: 'Publisher logo URL is required',
        severity: 'error',
      });
    }
    if (!schema.publisher.logo?.width || !schema.publisher.logo?.height) {
      errors.push({
        field: 'publisher.logo',
        message: 'Publisher logo must have width and height',
        severity: 'error',
      });
    }
  }

  return {
    isValid: errors.filter(e => e.severity === 'error').length === 0,
    errors: errors.filter(e => e.severity === 'error'),
    warnings: errors.filter(e => e.severity === 'warning'),
  };
}
```

**Done Criteria**:
- [ ] Function implemented
- [ ] Validates all required fields
- [ ] Validates ISO 8601 date format
- [ ] Validates publisher logo dimensions
- [ ] Unit tests pass (see T16)

---

### T12: FAQ Schema Validator

**Requirements**: AC-4.3
**Dependencies**: T10
**Effort**: 1.5 hours

**Description**: Create validator for FAQ schema.

**Files to Modify**:
- `src/lib/seo/schema-validator.ts`

**Actions**:
1. Create `validateFAQSchema()` function
2. Validate minimum 2 questions
3. Validate each question has name and acceptedAnswer

**Code Skeleton**:
```typescript
export function validateFAQSchema(schema: any): ValidationResult {
  const errors: ValidationError[] = [];

  // Required: mainEntity (array of questions)
  if (!schema.mainEntity || !Array.isArray(schema.mainEntity)) {
    errors.push({
      field: 'mainEntity',
      message: 'mainEntity must be an array of questions',
      severity: 'error',
    });
    return {
      isValid: false,
      errors,
      warnings: [],
    };
  }

  // Minimum 2 questions
  if (schema.mainEntity.length < 2) {
    errors.push({
      field: 'mainEntity',
      message: 'FAQ schema must have at least 2 questions',
      severity: 'error',
    });
  }

  // Validate each question
  schema.mainEntity.forEach((question: any, index: number) => {
    if (!question.name) {
      errors.push({
        field: `mainEntity[${index}].name`,
        message: `Question ${index + 1} must have a "name" field`,
        severity: 'error',
      });
    }

    if (!question.acceptedAnswer?.text) {
      errors.push({
        field: `mainEntity[${index}].acceptedAnswer.text`,
        message: `Question ${index + 1} must have an accepted answer with text`,
        severity: 'error',
      });
    }
  });

  return {
    isValid: errors.filter(e => e.severity === 'error').length === 0,
    errors: errors.filter(e => e.severity === 'error'),
    warnings: errors.filter(e => e.severity === 'warning'),
  };
}
```

**Done Criteria**:
- [ ] Function implemented
- [ ] Validates minimum 2 questions
- [ ] Validates question structure
- [ ] Unit tests pass (see T16)

---

### T13: Organization Schema Validator

**Requirements**: AC-4.8
**Dependencies**: T10
**Effort**: 1 hour

**Description**: Create validator for Organization schema.

**Files to Modify**:
- `src/lib/seo/schema-validator.ts`

**Actions**:
1. Create `validateOrganizationSchema()` function
2. Validate logo URL and dimensions
3. Validate required fields (name, url, logo)

**Done Criteria**:
- [ ] Function implemented
- [ ] Validates logo dimensions
- [ ] Unit tests pass (see T16)

---

### T14: Add Currency Parameter to Product Schema

**Requirements**: AC-4.1 (Dynamic currency)
**Dependencies**: T3
**Effort**: 1.5 hours

**Description**: Update Product schema generation to accept dynamic currency parameter.

**Files to Modify**:
- `src/lib/seo-utils.ts` - `generateProductStructuredData()`
- `src/lib/seo-utils.ts` - `generateOfferSchema()`
- `src/lib/seo-utils.ts` - `generateProductPageSchema()`

**Actions**:
1. Add `currency` parameter to `generateProductStructuredData()`
2. Add `currency` parameter to `generateOfferSchema()`
3. Use `getProductPrice(productId, currency)` for correct price
4. Update all schema generation to use dynamic currency

**Code Changes**:
```typescript
// BEFORE:
export const generateProductStructuredData = (productId: string, localeInput: string) => {
  // ...
  offers: {
    '@type': 'Offer',
    price: product.price.toString(), // ❌ Hardcoded price
    priceCurrency: 'CAD', // ❌ Hardcoded currency
  }
}

// AFTER:
export const generateProductStructuredData = (
  productId: string,
  localeInput: string,
  currency: 'CAD' | 'USD' = 'CAD'
) => {
  // ...
  offers: {
    '@type': 'Offer',
    price: getProductPrice(productId, currency).toFixed(2), // ✅ Dynamic price
    priceCurrency: currency, // ✅ Dynamic currency
  }
}
```

**Done Criteria**:
- [ ] All schema functions accept currency parameter
- [ ] Currency defaults to CAD if not provided
- [ ] Prices use `getProductPrice()` with correct currency
- [ ] No hardcoded 'CAD' or prices remain
- [ ] Unit tests updated for currency parameter
- [ ] Build completes successfully

---

### T15: Add Image Dimensions to All Schemas

**Requirements**: AC-3.5, AC-4.8
**Dependencies**: T14
**Effort**: 2 hours

**Description**: Update all structured data to include image dimensions for rich results.

**Files to Modify**:
- `src/lib/seo-utils.ts` - all schema generation functions

**Actions**:
1. Update Product schema to use ImageObject with dimensions
2. Update Article schema image field
3. Update Organization schema logo field
4. Ensure all images have width/height

**Code Changes**:
```typescript
// BEFORE:
image: [`${baseUrl}${product.image}`], // ❌ Just URL

// AFTER:
image: [
  {
    '@type': 'ImageObject',
    url: `${baseUrl}${product.image}`,
    width: 1200, // ✅ Required for rich results
    height: 800, // ✅ Required for rich results
  }
],
```

**Image Dimensions**:
- Product images: 1200x800
- Article images: 1200x630 (OG standard)
- Organization logo: 512x512

**Done Criteria**:
- [ ] All Product schemas have image dimensions
- [ ] All Article schemas have image dimensions
- [ ] Organization logo has dimensions
- [ ] All images use ImageObject type
- [ ] Schemas pass Google Rich Results Test
- [ ] Unit tests updated

---

### T16: Schema Validation Tests

**Requirements**: AC-4.4, AC-4.5
**Dependencies**: T10, T11, T12, T13, T14, T15
**Effort**: 3 hours

**Description**: Create comprehensive tests for all schema validators.

**Files to Create**:
- `__tests__/lib/seo/schema-validator.test.ts`

**Actions**:
1. Test `validateProductSchema()`
2. Test `validateArticleSchema()`
3. Test `validateFAQSchema()`
4. Test `validateOrganizationSchema()`
5. Test with valid and invalid schemas
6. Test edge cases

**Done Criteria**:
- [ ] All test files created
- [ ] 20+ test cases implemented
- [ ] All tests pass
- [ ] Code coverage > 80%
- [ ] Valid schemas pass validation
- [ ] Invalid schemas fail with correct errors

---

## PHASE 4: Sitemap Generation System

### T17: Page Scanner Utility

**Requirements**: AC-1.2
**Dependencies**: T1, T2
**Effort**: 2.5 hours

**Description**: Create utility to scan all pages in `pages/` directory and identify indexable pages.

**Files to Create**:
- `scripts/seo/lib/page-scanner.ts`

**Actions**:
1. Use `fast-glob` to scan `pages/**/*.tsx`
2. Filter out admin, API, _app, _document, etc.
3. Identify static vs dynamic routes
4. Return list of all indexable pages

**Code Skeleton**:
```typescript
// scripts/seo/lib/page-scanner.ts
import fg from 'fast-glob';
import path from 'path';

export interface ScannedPage {
  filePath: string;
  routePath: string;
  pageType: 'static' | 'dynamic' | 'catch-all';
  isIndexable: boolean;
  reason?: string; // If not indexable
}

export async function scanAllPages(): Promise<ScannedPage[]> {
  const pagesDir = path.join(process.cwd(), 'pages');

  // Scan for all .tsx files
  const files = await fg('**/*.tsx', {
    cwd: pagesDir,
    ignore: [
      'api/**',        // API routes
      '_*.tsx',        // Next.js internals (_app, _document, _error)
      '404.tsx',       // Error pages
      '500.tsx',
      'admin/**',      // Admin pages
      '**/portal/**',  // Customer/retailer portals
    ],
  });

  const pages: ScannedPage[] = files.map(file => {
    const routePath = filePathToRoute(file);
    const pageType = determinePageType(file);
    const isIndexable = shouldIndex(file, routePath);

    return {
      filePath: file,
      routePath,
      pageType,
      isIndexable,
      reason: !isIndexable ? getNoindexReason(file) : undefined,
    };
  });

  return pages;
}

function filePathToRoute(filePath: string): string {
  // Convert file path to route
  // pages/blog/my-post.tsx -> /blog/my-post
  // pages/index.tsx -> /
  // pages/products/[id].tsx -> /products/[id] (mark as dynamic)

  let route = filePath
    .replace(/\.tsx$/, '')
    .replace(/\/index$/, '')
    .replace(/\[\.\.\..*\]/, '[...]'); // Catch-all routes

  if (route === 'index' || route === '') {
    return '/';
  }

  return `/${route}`;
}

function determinePageType(filePath: string): 'static' | 'dynamic' | 'catch-all' {
  if (filePath.includes('[...')) return 'catch-all';
  if (filePath.includes('[')) return 'dynamic';
  return 'static';
}

function shouldIndex(filePath: string, routePath: string): boolean {
  // Define noindex patterns
  const noindexPatterns = [
    '/offline',
    '/sentry-example-page',
    '/dialergptpitchdeck',
    '/customer/portal',
    '/retailer/portal',
    '/affiliate/dashboard',
    '/admin/',
  ];

  return !noindexPatterns.some(pattern => routePath.includes(pattern));
}

function getNoindexReason(filePath: string): string {
  if (filePath.includes('admin')) return 'Admin page';
  if (filePath.includes('portal')) return 'User portal';
  if (filePath.includes('offline')) return 'Offline fallback';
  return 'Excluded from indexing';
}
```

**Done Criteria**:
- [ ] Scanner implemented
- [ ] Correctly identifies all page types
- [ ] Filters out non-indexable pages
- [ ] Returns structured data
- [ ] Unit tests pass

---

### T18: Dynamic Route Handlers

**Requirements**: AC-1.2
**Dependencies**: T17
**Effort**: 2 hours

**Description**: Create handlers to fetch dynamic routes (blog posts, locations, etc.).

**Files to Create**:
- `scripts/seo/lib/dynamic-routes.ts`

**Actions**:
1. Create handler for blog post slugs
2. Create handler for location city slugs
3. Create handler for province slugs
4. Aggregate all dynamic routes

**Code Skeleton**:
```typescript
// scripts/seo/lib/dynamic-routes.ts
import fs from 'fs';
import path from 'path';

export interface DynamicRoute {
  pattern: string;
  routes: string[];
}

export async function getAllDynamicRoutes(): Promise<DynamicRoute[]> {
  return [
    await getBlogPostRoutes(),
    await getLocationRoutes(),
    await getProvinceRoutes(),
  ];
}

async function getBlogPostRoutes(): Promise<DynamicRoute> {
  // Scan blog content directory
  const blogDir = path.join(process.cwd(), 'content/blog/en');

  if (!fs.existsSync(blogDir)) {
    return { pattern: '/blog/[slug]', routes: [] };
  }

  const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.json'));
  const slugs = files.map(f => f.replace('.json', ''));
  const routes = slugs.map(slug => `/blog/${slug}`);

  return {
    pattern: '/blog/[slug]',
    routes,
  };
}

async function getLocationRoutes(): Promise<DynamicRoute> {
  // Get all city slugs from city data
  const cities = [
    'toronto', 'montreal', 'vancouver', 'calgary', 'edmonton',
    'ottawa', 'winnipeg', 'quebec-city', 'hamilton', 'kitchener',
    // ... all cities
  ];

  const routes = cities.map(city => `/locations/${city}`);

  return {
    pattern: '/locations/[citySlug]',
    routes,
  };
}

async function getProvinceRoutes(): Promise<DynamicRoute> {
  const provinces = [
    'ontario', 'quebec', 'british-columbia', 'alberta',
    'manitoba', 'saskatchewan', 'nova-scotia',
  ];

  const routes = provinces.map(prov => `/locations/province/${prov}`);

  return {
    pattern: '/locations/province/[provinceSlug]',
    routes,
  };
}
```

**Done Criteria**:
- [ ] All dynamic routes handled
- [ ] Blog posts discovered correctly
- [ ] Location pages discovered
- [ ] Returns structured data
- [ ] Unit tests pass

---

### T19: Enhanced Sitemap Generator

**Requirements**: AC-1.2, AC-1.3, AC-1.4, AC-1.5
**Dependencies**: T17, T18
**Effort**: 4 hours

**Description**: Create script to generate comprehensive sitemap from scanned pages.

**Files to Create**:
- `scripts/seo/generate-enhanced-sitemap.ts`

**Actions**:
1. Combine static and dynamic pages
2. Generate sitemap XML
3. Add changefreq and priority based on page type
4. Add language alternates
5. Write to `public/sitemap.xml`

**Code Skeleton**:
```typescript
// scripts/seo/generate-enhanced-sitemap.ts
import fs from 'fs';
import path from 'path';
import { scanAllPages } from './lib/page-scanner';
import { getAllDynamicRoutes } from './lib/dynamic-routes';

interface SitemapURL {
  loc: string;
  lastmod: string;
  changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly';
  priority: number;
  alternates?: Array<{ hrefLang: string; href: string }>;
}

const PAGE_METADATA: Record<string, { changefreq: any; priority: number }> = {
  '/': { changefreq: 'daily', priority: 1.0 },
  '/products/trial-size': { changefreq: 'weekly', priority: 0.9 },
  '/products/standard': { changefreq: 'weekly', priority: 0.9 },
  '/products/family-pack': { changefreq: 'weekly', priority: 0.9 },
  '/blog/*': { changefreq: 'weekly', priority: 0.8 },
  '/learn/*': { changefreq: 'monthly', priority: 0.7 },
  '/locations/*': { changefreq: 'monthly', priority: 0.6 },
  default: { changefreq: 'monthly', priority: 0.5 },
};

export async function generateSitemap() {
  console.log('🔍 Scanning all pages...');
  const scannedPages = await scanAllPages();
  const indexablePages = scannedPages.filter(p => p.isIndexable);

  console.log('🔍 Fetching dynamic routes...');
  const dynamicRoutes = await getAllDynamicRoutes();

  // Combine static and dynamic pages
  const allRoutes: string[] = [
    ...indexablePages.map(p => p.routePath),
    ...dynamicRoutes.flatMap(dr => dr.routes),
  ];

  // Remove duplicates
  const uniqueRoutes = [...new Set(allRoutes)];

  console.log(`📄 Found ${uniqueRoutes.length} total pages`);

  // Generate sitemap URLs
  const baseUrl = 'https://www.purrify.ca';
  const lastmod = new Date().toISOString();

  const sitemapUrls: SitemapURL[] = uniqueRoutes.map(route => {
    const metadata = getPageMetadata(route);

    return {
      loc: `${baseUrl}${route}`,
      lastmod,
      changefreq: metadata.changefreq,
      priority: metadata.priority,
      alternates: buildLanguageAlternates(route),
    };
  });

  // Generate XML
  const xml = generateSitemapXML(sitemapUrls);

  // Write to file
  const outputPath = path.join(process.cwd(), 'public', 'sitemap.xml');
  fs.writeFileSync(outputPath, xml, 'utf-8');

  console.log(`✅ Sitemap generated: ${outputPath}`);
  console.log(`📊 Stats:
  - Total URLs: ${sitemapUrls.length}
  - Blog posts: ${sitemapUrls.filter(u => u.loc.includes('/blog/')).length}
  - Products: ${sitemapUrls.filter(u => u.loc.includes('/products/')).length}
  - Learn pages: ${sitemapUrls.filter(u => u.loc.includes('/learn/')).length}
  - Locations: ${sitemapUrls.filter(u => u.loc.includes('/locations/')).length}
  `);

  return {
    urls: sitemapUrls,
    stats: {
      totalPages: sitemapUrls.length,
    },
  };
}

function getPageMetadata(route: string) {
  // Check for exact match
  if (PAGE_METADATA[route]) {
    return PAGE_METADATA[route];
  }

  // Check for pattern match
  for (const [pattern, metadata] of Object.entries(PAGE_METADATA)) {
    if (pattern.endsWith('*')) {
      const prefix = pattern.slice(0, -1);
      if (route.startsWith(prefix)) {
        return metadata;
      }
    }
  }

  return PAGE_METADATA.default;
}

function buildLanguageAlternates(route: string) {
  const locales = ['en', 'fr', 'zh', 'es'];
  const baseUrl = 'https://www.purrify.ca';

  return locales.map(locale => ({
    hrefLang: locale === 'en' ? 'en-CA' : locale === 'fr' ? 'fr-CA' : locale === 'zh' ? 'zh-CN' : 'es',
    href: locale === 'en' ? `${baseUrl}${route}` : `${baseUrl}/${locale}${route}`,
  }));
}

function generateSitemapXML(urls: SitemapURL[]): string {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"';
  xml += ' xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';

  urls.forEach(url => {
    xml += '  <url>\n';
    xml += `    <loc>${url.loc}</loc>\n`;
    xml += `    <lastmod>${url.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
    xml += `    <priority>${url.priority}</priority>\n`;

    // Add language alternates
    if (url.alternates) {
      url.alternates.forEach(alt => {
        xml += `    <xhtml:link rel="alternate" hreflang="${alt.hrefLang}" href="${alt.href}" />\n`;
      });
    }

    xml += '  </url>\n';
  });

  xml += '</urlset>';

  return xml;
}

// Run if called directly
if (require.main === module) {
  generateSitemap().catch(console.error);
}
```

**Done Criteria**:
- [ ] Generator implemented
- [ ] All indexable pages included
- [ ] Dynamic routes included
- [ ] Language alternates added
- [ ] Sitemap XML valid
- [ ] File written to `public/sitemap.xml`
- [ ] Stats logged to console

---

### T20: Sitemap Validator

**Requirements**: AC-1.3, AC-1.4, AC-1.5, AC-8.3
**Dependencies**: T19
**Effort**: 2.5 hours

**Description**: Create validator to ensure sitemap has no broken links, redirects, or noindex pages.

**Files to Create**:
- `scripts/seo/validate-sitemap.ts`

**Actions**:
1. Read sitemap.xml
2. For each URL, check HTTP status
3. Detect redirects (301/302)
4. Detect noindex meta tags
5. Validate hreflang URLs exist
6. Report all issues

**Code Skeleton**:
```typescript
// scripts/seo/validate-sitemap.ts
import fs from 'fs';
import path from 'path';
import cheerio from 'cheerio';

interface SitemapIssue {
  url: string;
  issue: 'redirect' | '404' | 'noindex' | 'non-canonical' | 'slow' | 'hreflang-broken';
  details: string;
}

export async function validateSitemap(): Promise<{
  isValid: boolean;
  errors: SitemapIssue[];
}> {
  console.log('🔍 Validating sitemap...');

  const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
  const sitemapXML = fs.readFileSync(sitemapPath, 'utf-8');

  const $ = cheerio.load(sitemapXML, { xmlMode: true });
  const urls = $('url > loc').map((_, el) => $(el).text()).get();

  console.log(`📊 Checking ${urls.length} URLs...`);

  const errors: SitemapIssue[] = [];

  for (const url of urls) {
    const issues = await validateURL(url);
    errors.push(...issues);
  }

  const isValid = errors.length === 0;

  if (isValid) {
    console.log('✅ Sitemap validation passed!');
  } else {
    console.error(`❌ Sitemap validation failed with ${errors.length} issues:`);
    errors.forEach(err => {
      console.error(`  - ${err.url}: ${err.issue} - ${err.details}`);
    });
  }

  return { isValid, errors };
}

async function validateURL(url: string): Promise<SitemapIssue[]> {
  const issues: SitemapIssue[] = [];

  try {
    const response = await fetch(url, {
      redirect: 'manual', // Don't follow redirects
      signal: AbortSignal.timeout(10000), // 10 second timeout
    });

    // Check for redirects
    if (response.status >= 300 && response.status < 400) {
      issues.push({
        url,
        issue: 'redirect',
        details: `URL redirects to ${response.headers.get('location')} (${response.status})`,
      });
      return issues; // Don't check further
    }

    // Check for 404
    if (response.status === 404) {
      issues.push({
        url,
        issue: '404',
        details: 'Page not found',
      });
      return issues;
    }

    // Check for other errors
    if (response.status >= 400) {
      issues.push({
        url,
        issue: '404',
        details: `HTTP ${response.status}`,
      });
      return issues;
    }

    // Check for noindex
    const html = await response.text();
    const $ = cheerio.load(html);
    const robotsMeta = $('meta[name="robots"]').attr('content');

    if (robotsMeta && robotsMeta.includes('noindex')) {
      issues.push({
        url,
        issue: 'noindex',
        details: 'Page has noindex meta tag',
      });
    }

    // Check canonical matches
    const canonical = $('link[rel="canonical"]').attr('href');
    if (canonical && canonical !== url) {
      issues.push({
        url,
        issue: 'non-canonical',
        details: `Canonical points to ${canonical}`,
      });
    }

  } catch (error: any) {
    if (error.name === 'AbortError') {
      issues.push({
        url,
        issue: 'slow',
        details: 'Page took > 10 seconds to load',
      });
    } else {
      issues.push({
        url,
        issue: '404',
        details: `Fetch error: ${error.message}`,
      });
    }
  }

  return issues;
}

// Run if called directly
if (require.main === module) {
  validateSitemap().then(result => {
    process.exit(result.isValid ? 0 : 1);
  });
}
```

**Done Criteria**:
- [ ] Validator implemented
- [ ] Checks all URLs in sitemap
- [ ] Detects redirects
- [ ] Detects 404s
- [ ] Detects noindex tags
- [ ] Validates canonical URLs
- [ ] Reports all issues
- [ ] Exits with error code if invalid

---

### T21: Add Language Alternates to Sitemap

**Requirements**: AC-9.1, AC-9.2
**Dependencies**: T19
**Effort**: 1 hour

**Description**: Ensure all sitemap entries have language alternates.

**Files to Modify**:
- `scripts/seo/generate-enhanced-sitemap.ts`

**Actions**:
1. Verify `buildLanguageAlternates()` is called for all URLs
2. Add xhtml namespace to sitemap
3. Validate alternate URLs exist

**Done Criteria**:
- [ ] All sitemap URLs have language alternates
- [ ] xhtml namespace present in sitemap
- [ ] Alternate URLs follow pattern: /fr/*, /zh/*, /es/*
- [ ] Sitemap validates in Google Search Console

---

### T22: Sitemap Generation Tests

**Requirements**: AC-1.2, AC-1.3
**Dependencies**: T17, T18, T19, T20
**Effort**: 2 hours

**Description**: Create tests for sitemap generation and validation.

**Files to Create**:
- `__tests__/scripts/seo/sitemap-generation.test.ts`

**Done Criteria**:
- [ ] Tests for page scanner
- [ ] Tests for dynamic route handlers
- [ ] Tests for sitemap generator
- [ ] Tests for sitemap validator
- [ ] All tests pass

---

## PHASE 5: Internal Linking System

### T23: Link Graph Builder

**Requirements**: AC-1.7, AC-1.8
**Dependencies**: T2, T3
**Effort**: 3 hours

**Description**: Create link graph analyzer to track internal linking structure.

**Files to Create**:
- `src/lib/seo/link-graph-analyzer.ts`

**Actions**:
1. Create `LinkGraphAnalyzer` class
2. Implement `buildGraph()` method
3. Implement `findOrphanPages()` method
4. Implement `findWeakPages()` method
5. Implement `findDeadEndPages()` method

**Done Criteria**:
- [ ] Class implemented
- [ ] Graph built correctly
- [ ] Finds orphan pages (0 incoming links)
- [ ] Finds weak pages (1 incoming link)
- [ ] Finds dead end pages (0 outgoing links)
- [ ] Unit tests pass (see T28)

---

### T24: Link Extraction Utility

**Requirements**: AC-1.6
**Dependencies**: T23
**Effort**: 2 hours

**Description**: Create utility to extract internal links from page content.

**Files to Modify**:
- `src/lib/seo/link-graph-analyzer.ts`

**Actions**:
1. Use Cheerio to parse HTML
2. Extract all `<a>` and `<Link>` tags
3. Filter for internal links only
4. Extract anchor text and context

**Done Criteria**:
- [ ] Utility implemented
- [ ] Extracts all internal links
- [ ] Filters external links
- [ ] Captures anchor text
- [ ] Unit tests pass

---

### T25: Relevance Scorer

**Requirements**: AC-6.1
**Dependencies**: T24
**Effort**: 2.5 hours

**Description**: Create scoring algorithm for link relevance based on keywords and context.

**Files to Modify**:
- `src/lib/seo/link-graph-analyzer.ts`

**Actions**:
1. Create `calculateRelevance()` function
2. Implement keyword matching
3. Implement semantic similarity
4. Score based on topic clusters

**Done Criteria**:
- [ ] Scorer implemented
- [ ] Returns 0-100 relevance score
- [ ] Considers keyword overlap
- [ ] Unit tests pass

---

### T26: Link Suggestion Engine

**Requirements**: AC-1.7, AC-1.8, AC-6.1
**Dependencies**: T23, T24, T25
**Effort**: 3 hours

**Description**: Create engine to suggest internal links for pages.

**Files to Modify**:
- `src/lib/seo/link-graph-analyzer.ts`

**Actions**:
1. Implement `suggestLinksForPage()` method
2. Use relevance scorer
3. Prioritize by authority flow
4. Generate anchor text suggestions

**Done Criteria**:
- [ ] Engine implemented
- [ ] Returns top 10 suggestions
- [ ] Suggestions are relevant
- [ ] Includes anchor text
- [ ] Unit tests pass (see T28)

---

### T27: Auto-Linking Component

**Requirements**: AC-6.4
**Dependencies**: T26
**Effort**: 2 hours

**Description**: Create React component that automatically adds internal links to content.

**Files to Create**:
- `src/components/seo/AutoLinkedContent.tsx`

**Actions**:
1. Parse content into paragraphs
2. Identify keyword phrases
3. Match with internal pages
4. Insert contextual links (max 1 per paragraph)

**Done Criteria**:
- [ ] Component implemented
- [ ] Adds links intelligently
- [ ] Max 1 link per paragraph
- [ ] Total max 5-10 links per page
- [ ] Doesn't over-link
- [ ] Works with blog content

---

### T28: Link Analysis Tests

**Requirements**: AC-1.7, AC-1.8
**Dependencies**: T23, T24, T25, T26, T27
**Effort**: 2.5 hours

**Description**: Create tests for link graph and suggestion system.

**Files to Create**:
- `__tests__/lib/seo/link-graph-analyzer.test.ts`
- `__tests__/components/seo/AutoLinkedContent.test.tsx`

**Done Criteria**:
- [ ] Tests for link graph builder
- [ ] Tests for link extraction
- [ ] Tests for relevance scorer
- [ ] Tests for suggestion engine
- [ ] Tests for auto-linking component
- [ ] All tests pass

---

## PHASE 6: Build-Time Validation System

### T29: Pre-Build Validation Script

**Requirements**: AC-10.1, AC-10.2, AC-10.3
**Dependencies**: T4, T5, T10, T11, T12, T19, T23
**Effort**: 4 hours

**Description**: Create comprehensive validation script that runs before builds.

**Files to Create**:
- `scripts/seo/validate-seo-compliance.ts`

**Actions**:
1. Scan all pages
2. Validate meta tags (title/description lengths)
3. Validate structured data
4. Check for orphan pages
5. Check for broken links
6. Generate validation report
7. Fail build if critical errors found

**Code Skeleton**:
```typescript
// scripts/seo/validate-seo-compliance.ts
import { scanAllPages } from './lib/page-scanner';
import { validateMetaContent } from '@/lib/seo/meta-optimizer';
import { validateProductSchema, validateArticleSchema } from '@/lib/seo/schema-validator';
import { LinkGraphAnalyzer } from '@/lib/seo/link-graph-analyzer';

interface ValidationError {
  page: string;
  severity: 'critical' | 'error' | 'warning';
  type: 'meta' | 'schema' | 'links' | 'images' | 'sitemap';
  field: string;
  message: string;
  fix?: string;
}

export async function validateAllPages(options: {
  failOnError?: boolean;
  failOnWarning?: boolean;
} = {}): Promise<{
  passed: boolean;
  errors: ValidationError[];
  warnings: ValidationError[];
  stats: {
    totalPages: number;
    pagesWithErrors: number;
    pagesWithWarnings: number;
    orphanPages: number;
    brokenLinks: number;
  };
}> {
  console.log('🔍 Starting SEO compliance validation...\n');

  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];

  // 1. Scan all pages
  console.log('📄 Scanning pages...');
  const pages = await scanAllPages();
  const indexablePages = pages.filter(p => p.isIndexable);
  console.log(`  Found ${indexablePages.length} indexable pages\n`);

  // 2. Validate meta tags
  console.log('🏷️  Validating meta tags...');
  for (const page of indexablePages) {
    const metaErrors = await validatePageMeta(page.routePath);
    errors.push(...metaErrors.filter(e => e.severity === 'error'));
    warnings.push(...metaErrors.filter(e => e.severity === 'warning'));
  }
  console.log(`  Found ${errors.length} errors, ${warnings.length} warnings\n`);

  // 3. Validate structured data
  console.log('📊 Validating structured data...');
  for (const page of indexablePages) {
    const schemaErrors = await validatePageSchema(page.routePath);
    errors.push(...schemaErrors.filter(e => e.severity === 'error'));
    warnings.push(...schemaErrors.filter(e => e.severity === 'warning'));
  }
  console.log(`  Schema validation complete\n`);

  // 4. Check for orphan pages
  console.log('🔗 Analyzing internal links...');
  const linkAnalyzer = new LinkGraphAnalyzer();
  await linkAnalyzer.buildGraph(indexablePages.map(p => p.routePath));
  const orphanPages = linkAnalyzer.findOrphanPages();
  const weakPages = linkAnalyzer.findWeakPages();

  orphanPages.forEach(page => {
    errors.push({
      page,
      severity: 'error',
      type: 'links',
      field: 'incomingLinks',
      message: 'Page has 0 incoming links (orphan page)',
      fix: 'Add internal links pointing to this page from related content',
    });
  });

  weakPages.forEach(({ page, incomingFrom }) => {
    warnings.push({
      page,
      severity: 'warning',
      type: 'links',
      field: 'incomingLinks',
      message: `Page has only 1 incoming link (from ${incomingFrom})`,
      fix: 'Add 2-4 more internal links to strengthen page authority',
    });
  });

  console.log(`  Found ${orphanPages.length} orphan pages, ${weakPages.length} weak pages\n`);

  // 5. Generate report
  const stats = {
    totalPages: indexablePages.length,
    pagesWithErrors: new Set(errors.map(e => e.page)).size,
    pagesWithWarnings: new Set(warnings.map(e => e.page)).size,
    orphanPages: orphanPages.length,
    brokenLinks: 0, // TODO: implement broken link check
  };

  console.log('\n📊 Validation Summary:');
  console.log(`  Total Pages: ${stats.totalPages}`);
  console.log(`  Pages with Errors: ${stats.pagesWithErrors}`);
  console.log(`  Pages with Warnings: ${stats.pagesWithWarnings}`);
  console.log(`  Orphan Pages: ${stats.orphanPages}`);
  console.log(`  Total Errors: ${errors.length}`);
  console.log(`  Total Warnings: ${warnings.length}\n`);

  // 6. Determine pass/fail
  const hasErrors = errors.length > 0;
  const hasWarnings = warnings.length > 0;
  const passed = options.failOnError ? !hasErrors : (options.failOnWarning ? !hasWarnings : true);

  if (!passed) {
    console.error('❌ SEO validation FAILED\n');
    console.error('Errors:');
    errors.slice(0, 10).forEach(err => {
      console.error(`  ${err.page}: [${err.type}] ${err.message}`);
      if (err.fix) {
        console.error(`    Fix: ${err.fix}`);
      }
    });
    if (errors.length > 10) {
      console.error(`  ... and ${errors.length - 10} more errors`);
    }
  } else {
    console.log('✅ SEO validation PASSED\n');
  }

  return { passed, errors, warnings, stats };
}

async function validatePageMeta(route: string): Promise<ValidationError[]> {
  // TODO: Read page file, extract meta tags, validate lengths
  return [];
}

async function validatePageSchema(route: string): Promise<ValidationError[]> {
  // TODO: Read page file, extract schema, validate
  return [];
}

// CLI
if (require.main === module) {
  const args = process.argv.slice(2);
  const failOnError = args.includes('--fail-on-error');
  const failOnWarning = args.includes('--fail-on-warning');

  validateAllPages({ failOnError, failOnWarning }).then(result => {
    process.exit(result.passed ? 0 : 1);
  });
}
```

**Done Criteria**:
- [ ] Script implemented
- [ ] Validates all meta tags
- [ ] Validates all schemas
- [ ] Detects orphan pages
- [ ] Generates comprehensive report
- [ ] Fails build on critical errors
- [ ] Can be run from command line

---

### T30: Image SEO Validator

**Requirements**: AC-7.4
**Dependencies**: T29
**Effort**: 2 hours

**Description**: Create validator to check all images meet SEO requirements.

**Files to Create**:
- `scripts/seo/validate-image-seo.ts`

**Actions**:
1. Scan all Image components
2. Check for alt text
3. Validate image URLs return 200
4. Check file sizes
5. Validate OG images meet requirements

**Done Criteria**:
- [ ] Validator implemented
- [ ] Checks all Image components
- [ ] Validates alt text present
- [ ] Checks image accessibility
- [ ] Reports issues

---

### T31: OG Canonical Validator

**Requirements**: AC-3.3, AC-3.4
**Dependencies**: T29
**Effort**: 1.5 hours

**Description**: Validate Open Graph URL matches canonical URL.

**Files to Create**:
- `src/lib/seo/og-canonical-validator.ts`

**Actions**:
1. Extract OG url from page
2. Extract canonical url from page
3. Compare for exact match
4. Report mismatches

**Done Criteria**:
- [ ] Validator implemented
- [ ] Detects URL mismatches
- [ ] Reports all issues
- [ ] Unit tests pass

---

### T32: Integration with Prebuild Hook

**Requirements**: AC-10.1
**Dependencies**: T29, T30, T31
**Effort**: 30 minutes

**Description**: Add SEO validation to prebuild script in package.json.

**Files to Modify**:
- `package.json`

**Actions**:
1. Update `prebuild` script to run SEO validation
2. Ensure validation runs before Next.js build
3. Build fails if validation fails

**Code Changes**:
```json
{
  "scripts": {
    "prebuild": "node scripts/validate-no-middleware.js && tsx scripts/seo/validate-seo-compliance.ts --fail-on-error && node scripts/vercel-prebuild.js"
  }
}
```

**Done Criteria**:
- [ ] Prebuild script updated
- [ ] SEO validation runs before build
- [ ] Build fails on validation errors
- [ ] Tested locally

---

### T33: Validation System Tests

**Requirements**: AC-10.1, AC-10.2, AC-10.3
**Dependencies**: T29, T30, T31, T32
**Effort**: 2 hours

**Description**: Create tests for validation system.

**Files to Create**:
- `__tests__/scripts/seo/validate-seo-compliance.test.ts`

**Done Criteria**:
- [ ] Tests for main validation script
- [ ] Tests for image validator
- [ ] Tests for OG validator
- [ ] All tests pass

---

## PHASE 7: Runtime Enhancements

### T34: useEnhancedSEO Hook

**Requirements**: AC-2.1, AC-2.2, AC-4.1
**Dependencies**: T4, T5, T14
**Effort**: 3 hours

**Description**: Create React hook that provides optimized SEO data to components.

**Files to Create**:
- `src/hooks/useEnhancedSEO.ts`

**Actions**:
1. Create `useEnhancedSEO()` hook
2. Use translation and currency contexts
3. Call meta optimization functions
4. Generate validated schema
5. Return NextSeo props and schema

**Code Skeleton**:
```typescript
// src/hooks/useEnhancedSEO.ts
import { useTranslation } from '@/lib/translation-context';
import { useCurrency } from '@/lib/currency-context';
import { optimizeMetaTitle, optimizeMetaDescription } from '@/lib/seo/meta-optimizer';
import { getLocalizedUrl, buildLanguageAlternates } from '@/lib/seo-utils';
import { generateProductPageSchema, generateArticlePageSchema } from '@/lib/seo-utils';

export interface SEOConfig {
  path: string;
  title: string;
  description: string;
  targetKeyword?: string;
  schemaType?: 'product' | 'article' | 'faq' | 'location';
  schemaData?: Record<string, any>;
  image?: string;
  keywords?: string[];
}

export interface EnhancedSEOResult {
  nextSeoProps: {
    title: string;
    description: string;
    canonical: string;
    languageAlternates: any[];
    openGraph: any;
    twitter: any;
    additionalMetaTags: any[];
  };
  schema: object | null;
  meta: {
    titleLength: number;
    descriptionLength: number;
    isTitleTruncated: boolean;
    isDescriptionTruncated: boolean;
  };
}

export function useEnhancedSEO(config: SEOConfig): EnhancedSEOResult {
  const { t, locale } = useTranslation();
  const { currency } = useCurrency();

  // Optimize meta tags
  const optimizedTitle = optimizeMetaTitle(config.title, config.targetKeyword, locale);
  const optimizedDescription = optimizeMetaDescription(
    config.description,
    config.targetKeyword,
    locale
  );

  // Warn in development
  if (process.env.NODE_ENV === 'development') {
    const warnings = [
      ...optimizedTitle.warnings,
      ...optimizedDescription.warnings,
    ];
    if (warnings.length > 0) {
      console.warn(`[SEO] ${config.path}:`, warnings);
    }
  }

  // Generate canonical and alternates
  const canonical = getLocalizedUrl(config.path, locale);
  const languageAlternates = buildLanguageAlternates(config.path);

  // Generate structured data
  let schema: object | null = null;
  if (config.schemaType && config.schemaData) {
    switch (config.schemaType) {
      case 'product':
        schema = generateProductPageSchema(config.schemaData.productId, locale, currency);
        break;
      case 'article':
        schema = generateArticlePageSchema(
          config.title,
          config.description,
          config.path,
          locale,
          config.schemaData
        );
        break;
      // ... other schema types
    }
  }

  return {
    nextSeoProps: {
      title: optimizedTitle.title,
      description: optimizedDescription.description,
      canonical,
      languageAlternates,
      openGraph: {
        type: config.schemaType === 'product' ? 'product' : 'website',
        url: canonical,
        title: optimizedTitle.title,
        description: optimizedDescription.description,
        locale: locale === 'fr' ? 'fr_CA' : locale === 'zh' ? 'zh_CN' : locale === 'es' ? 'es' : 'en_CA',
        images: config.image ? [{ url: config.image, width: 1200, height: 630 }] : [],
      },
      twitter: {
        handle: '@purrify',
        site: '@purrify',
        cardType: 'summary_large_image',
      },
      additionalMetaTags: config.keywords ? [
        { name: 'keywords', content: config.keywords.join(', ') },
      ] : [],
    },
    schema,
    meta: {
      titleLength: optimizedTitle.length,
      descriptionLength: optimizedDescription.length,
      isTitleTruncated: optimizedTitle.isTruncated,
      isDescriptionTruncated: optimizedDescription.isTruncated,
    },
  };
}
```

**Done Criteria**:
- [ ] Hook implemented
- [ ] Uses translation context
- [ ] Uses currency context
- [ ] Optimizes meta tags
- [ ] Generates schema
- [ ] Returns complete NextSeo props
- [ ] Warns in development
- [ ] Unit tests pass (see T37)

---

### T35: Enhanced Schema Component

**Requirements**: AC-4.1, AC-4.2
**Dependencies**: T14, T15
**Effort**: 1 hour

**Description**: Update JSONLDSchema component to use dynamic currency.

**Files to Modify**:
- `src/components/seo/json-ld-schema.tsx`

**Actions**:
1. Add currency prop
2. Pass currency to schema generation functions
3. Update all schema types

**Done Criteria**:
- [ ] Component updated
- [ ] Accepts currency prop
- [ ] Passes currency to generators
- [ ] Works with all schema types

---

### T36: Update Page Components to Use Hook

**Requirements**: AC-2.1, AC-2.2, AC-4.1
**Dependencies**: T34, T35
**Effort**: 4 hours

**Description**: Update high-traffic pages to use `useEnhancedSEO()` hook.

**Files to Modify** (minimum 10 pages):
- `pages/index.tsx`
- `pages/products/trial-size.tsx`
- `pages/products/standard.tsx`
- `pages/products/family-pack.tsx`
- `pages/blog/most-powerful-odor-absorber.tsx`
- `pages/blog/best-litter-odor-remover-small-apartments.tsx`
- `pages/learn/how-it-works.tsx`
- `pages/learn/faq.tsx`
- ... (more pages)

**Migration Pattern**:
```typescript
// BEFORE:
import { NextSeo } from 'next-seo';
import { SEO_META } from '@/translations/seo-meta';

export default function MyPage() {
  const { locale } = useTranslation();
  const seo = SEO_META[locale].myPage;

  return (
    <>
      <NextSeo title={seo.title} description={seo.description} />
      {/* content */}
    </>
  );
}

// AFTER:
import { NextSeo } from 'next-seo';
import { useEnhancedSEO } from '@/hooks/useEnhancedSEO';
import { SEO_META } from '@/translations/seo-meta';

export default function MyPage() {
  const { locale } = useTranslation();
  const seo = SEO_META[locale].myPage;

  const { nextSeoProps, schema } = useEnhancedSEO({
    path: '/my-page',
    title: seo.title,
    description: seo.description,
    targetKeyword: seo.targetKeyword,
    schemaType: 'article',
    image: '/images/my-page-hero.jpg',
  });

  return (
    <>
      <NextSeo {...nextSeoProps} />
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      {/* content */}
    </>
  );
}
```

**Done Criteria**:
- [ ] 10+ pages migrated to use hook
- [ ] All pages pass validation
- [ ] Schema generated correctly
- [ ] Meta tags optimized
- [ ] Build completes successfully

---

### T37: Runtime Enhancement Tests

**Requirements**: AC-2.1, AC-2.2, AC-4.1
**Dependencies**: T34, T35, T36
**Effort**: 2 hours

**Description**: Create tests for runtime SEO enhancements.

**Files to Create**:
- `__tests__/hooks/useEnhancedSEO.test.ts`
- `e2e/seo/schema-rendering.spec.ts`

**Done Criteria**:
- [ ] Tests for useEnhancedSEO hook
- [ ] E2E tests for schema rendering
- [ ] All tests pass

---

## PHASE 8: SEO APIs

### T38: SEO Validation API

**Requirements**: AC-10.1
**Dependencies**: T29
**Effort**: 2 hours

**Description**: Create API endpoint for on-demand SEO validation.

**Files to Create**:
- `pages/api/seo/validate.ts`

**Actions**:
1. Accept POST request with page path
2. Run validation for specific page
3. Return validation results

**Done Criteria**:
- [ ] API implemented
- [ ] Validates meta tags
- [ ] Validates schema
- [ ] Returns actionable results
- [ ] API tests pass (see T41)

---

### T39: Link Suggestion API

**Requirements**: AC-6.1
**Dependencies**: T26
**Effort**: 2 hours

**Description**: Create API endpoint to get link suggestions for a page.

**Files to Create**:
- `pages/api/seo/suggest-links.ts`

**Actions**:
1. Accept GET request with page path
2. Use link suggestion engine
3. Return top 10 suggestions with anchor text

**Done Criteria**:
- [ ] API implemented
- [ ] Returns relevant suggestions
- [ ] Includes anchor text
- [ ] API tests pass (see T41)

---

### T40: SEO Stats API

**Requirements**: Monitoring & Analytics
**Dependencies**: T29, T38
**Effort**: 2 hours

**Description**: Create API endpoint to get overall SEO health stats.

**Files to Create**:
- `pages/api/seo/stats.ts`

**Actions**:
1. Aggregate validation results
2. Calculate health score
3. Return stats object

**Done Criteria**:
- [ ] API implemented
- [ ] Returns comprehensive stats
- [ ] Calculates health score
- [ ] API tests pass (see T41)

---

### T41: API Tests

**Requirements**: AC-10.1
**Dependencies**: T38, T39, T40
**Effort**: 1.5 hours

**Description**: Create tests for SEO APIs.

**Files to Create**:
- `__tests__/pages/api/seo/validate.test.ts`
- `__tests__/pages/api/seo/suggest-links.test.ts`
- `__tests__/pages/api/seo/stats.test.ts`

**Done Criteria**:
- [ ] Tests for all API endpoints
- [ ] Tests for success and error cases
- [ ] All tests pass

---

## PHASE 9: Content Optimization

### T42: Rewrite Homepage Meta

**Requirements**: AC-2.1, AC-2.2, AC-2.3
**Dependencies**: T7, T8
**Effort**: 30 minutes

**Description**: Finalize and optimize homepage meta content.

**Files to Modify**:
- `src/translations/seo-meta.ts` (homepage section)

**Actions**:
1. Ensure title 50-60 characters
2. Ensure description 140-155 characters
3. Include numbers, benefits, CTA
4. Add 2026 for freshness

**Done Criteria**:
- [ ] Homepage meta optimized
- [ ] Passes validation
- [ ] Score > 90

---

### T43: Rewrite Product Page Meta

**Requirements**: AC-2.1, AC-2.2, AC-2.3
**Dependencies**: T7, T8
**Effort**: 1 hour

**Description**: Optimize all 3 product pages meta content.

**Files to Modify**:
- `src/translations/seo-meta.ts` (products section)

**Actions**:
1. Trial size meta
2. Standard size meta
3. Family pack meta

**Done Criteria**:
- [ ] All 3 products optimized
- [ ] All pass validation
- [ ] All score > 90

---

### T44: Rewrite Blog Post Meta

**Requirements**: AC-2.1, AC-2.2, AC-2.3
**Dependencies**: T7, T8
**Effort**: 3 hours

**Description**: Optimize top 10 blog posts by impressions.

**Files to Modify**:
- `src/translations/seo-meta.ts` (blog section)

**Actions**:
1. most-powerful-odor-absorber
2. best-litter-odor-remover-small-apartments
3. activated-carbon-litter-additive-benefits
4. cat-litter-smell-worse-summer
5. how-to-use-cat-litter-deodorizer
6. using-deodorizers-with-kittens
7. multi-cat-litter-deodorizer-guide
8. cat-litter-smell-worse-winter
9. strong-cat-urine-smell-litter-box
10. embarrassed-guests-visit-cat-litter-smell

**Done Criteria**:
- [ ] All 10 posts optimized
- [ ] All pass validation
- [ ] All score > 85

---

### T45: Rewrite Learn Page Meta

**Requirements**: AC-2.1, AC-2.2, AC-2.3
**Dependencies**: T7, T8
**Effort**: 1.5 hours

**Description**: Optimize learn pages meta content.

**Files to Modify**:
- `src/translations/seo-meta.ts` (learn section)

**Actions**:
1. how-it-works
2. activated-carbon-benefits
3. activated-carbon-vs-baking-soda-deodorizers
4. faq
5. safety

**Done Criteria**:
- [ ] All 5 learn pages optimized
- [ ] All pass validation
- [ ] All score > 85

---

### T46: Add Missing Meta Descriptions

**Requirements**: AC-2.3
**Dependencies**: T7, T8
**Effort**: 2 hours

**Description**: Add meta descriptions to 19 pages that are missing them.

**Files to Modify**:
- Identify 19 pages without descriptions
- Add to `src/translations/seo-meta.ts`

**Actions**:
1. Run audit to find pages without meta description
2. Write optimized descriptions for each
3. Add to SEO_META

**Done Criteria**:
- [ ] All 19 pages identified
- [ ] All descriptions written
- [ ] All 140-155 characters
- [ ] All pass validation

---

### T47: Meta Content Tests

**Requirements**: AC-2.1, AC-2.2, AC-2.3
**Dependencies**: T42, T43, T44, T45, T46
**Effort**: 1 hour

**Description**: Validate all meta content meets quality standards.

**Files to Create**:
- `__tests__/translations/seo-meta.test.ts`

**Actions**:
1. Test all titles 50-60 characters
2. Test all descriptions 140-155 characters
3. Test all include target keywords
4. Test all pass quality validation

**Done Criteria**:
- [ ] All tests created
- [ ] All meta content passes
- [ ] No content over/under limits

---

## PHASE 10: Monitoring & Documentation

### T48: SEO Health Dashboard

**Requirements**: Monitoring
**Dependencies**: T40
**Effort**: 4 hours

**Description**: Create admin dashboard to monitor SEO health.

**Files to Create**:
- `pages/admin/seo/dashboard.tsx`

**Actions**:
1. Fetch SEO stats from API
2. Display health score
3. Show top issues
4. Show progress over time

**Done Criteria**:
- [ ] Dashboard created
- [ ] Shows health score
- [ ] Lists current issues
- [ ] Visual charts
- [ ] Admin can access

---

### T49: Build Report Generator

**Requirements**: Monitoring
**Dependencies**: T29
**Effort**: 2 hours

**Description**: Generate SEO report after each build.

**Files to Create**:
- `scripts/seo/generate-seo-report.ts`

**Actions**:
1. Run after postbuild
2. Generate report JSON
3. Log summary to console
4. Save to `.next/seo-report.json`

**Done Criteria**:
- [ ] Report generator created
- [ ] Runs after build
- [ ] Saves report file
- [ ] Logs summary

---

### T50: Documentation Update

**Requirements**: Documentation
**Dependencies**: All previous tasks
**Effort**: 3 hours

**Description**: Update project documentation with SEO enhancements.

**Files to Modify**:
- `README.md`
- `CLAUDE.md`
- Create `docs/SEO_GUIDE.md`

**Actions**:
1. Document new SEO utilities
2. Document useEnhancedSEO hook
3. Document validation system
4. Create SEO maintenance guide

**Done Criteria**:
- [ ] README updated
- [ ] CLAUDE.md updated with SEO commands
- [ ] SEO_GUIDE.md created
- [ ] All features documented

---

## Summary

**Total Tasks**: 50
**Estimated Effort**: 80-100 hours
**Timeline**: 4-6 weeks (with 1-2 developers)

**Critical Path**:
1. Foundation (Phase 1) → 2 hours
2. Meta Optimization (Phase 2) → 16 hours
3. Schema Validation (Phase 3) → 16 hours
4. Sitemap Generation (Phase 4) → 14 hours
5. Validation System (Phase 6) → 12 hours
6. Runtime Enhancements (Phase 7) → 10 hours
7. Content Optimization (Phase 9) → 8 hours

**Phases can run in parallel**:
- Phase 2, 3, 4, 5 can start once Phase 1 is complete
- Phase 6 requires Phase 2, 3, 4, 5
- Phase 7 requires Phase 2, 3
- Phase 8 requires Phase 6
- Phase 9 requires Phase 2, 7
- Phase 10 requires Phase 8

---

**Ready for approval?** Reply `y` to begin implementation, or `refine [feedback]` to iterate on the task plan.
