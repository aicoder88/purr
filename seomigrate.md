# SEO Migration Tracker

**Started:** 2026-01-21
**Status:** Phase 5 Complete (All Phases Complete)

## Overview

Migrating all pages to use the `useEnhancedSEO` hook with proper schema.org structured data.

### Infrastructure (Already Complete)
- ✅ `useEnhancedSEO` hook - supports product, article, faq, location, organization schemas
- ✅ `useBreadcrumb` hook - auto-generates breadcrumb schema
- ✅ Schema utilities in `src/lib/seo-utils.ts`
- ✅ JSON-LD wrapper component
- ✅ Fixed conditional hook call bug in useEnhancedSEO (line 129)

---

## Migration Progress

### Phase 1: Business Pages (5 pages) ✅ COMPLETE
**Status:** ✅ Complete - 2026-01-21

| Page | Old Implementation | New Implementation | Status |
|------|-------------------|-------------------|--------|
| `/groomers.tsx` | NextSeo only, NO schema | useEnhancedSEO + organization + breadcrumbs | ✅ Done |
| `/shelters.tsx` | NextSeo only, NO schema | useEnhancedSEO + organization + breadcrumbs | ✅ Done |
| `/cat-cafes.tsx` | NextSeo only, NO schema | useEnhancedSEO + organization + breadcrumbs | ✅ Done |
| `/b2b.tsx` | Manual JSON-LD | useEnhancedSEO + organization + breadcrumbs | ✅ Done |
| `/retailers.tsx` | Manual JSON-LD | useEnhancedSEO + FAQ + breadcrumbs + Organization | ✅ Done |

**Changes Made:**
- Added `useEnhancedSEO` hook to all 5 pages
- Added visual breadcrumb navigation to all pages
- Integrated schema.org Organization schema via hook
- Retailers page kept separate Organization schema (B2B offer catalog)
- Fixed bug in useEnhancedSEO hook (conditional useBreadcrumb call)

---

### Phase 2: Product Pages (4 pages) ✅ COMPLETE
**Status:** ✅ Complete - 2026-01-22

Note: Only 4 product pages exist (not 8 as originally estimated).

| Page | Old Implementation | New Implementation | Status |
|------|-------------------|-------------------|--------|
| `/products/index.tsx` | Manual Head + JSON-LD | useEnhancedSEO + CollectionPage schema + breadcrumbs | ✅ Done |
| `/products/standard.tsx` | NextSeo + manual schema | useEnhancedSEO + product schema + breadcrumbs | ✅ Already done |
| `/products/trial-size.tsx` | NextSeo + manual schema | useEnhancedSEO + product schema + breadcrumbs | ✅ Already done |
| `/products/family-pack.tsx` | NextSeo + manual schema | useEnhancedSEO + product schema + breadcrumbs | ✅ Already done |

**Changes Made:**
- Migrated `/products/index.tsx` to useEnhancedSEO hook
- Added visual breadcrumb navigation with proper accessibility (aria-label, aria-current)
- Combined CollectionPage, Breadcrumb, and Website schemas in @graph
- Three product detail pages were already using useEnhancedSEO (standard, trial-size, family-pack)

---

### Phase 3: Location Pages (210+ pages) ✅ COMPLETE
**Status:** ✅ Complete - 2026-01-22

Note: Affects 1 index + 13 province + ~196 city pages = 210 total pages via 3 file changes.

| Component | Old Implementation | New Implementation | Status |
|-----------|-------------------|-------------------|--------|
| `pages/locations/index.tsx` | NextSeo only | useEnhancedSEO + breadcrumbs | ✅ Done |
| `pages/locations/province/[provinceSlug].tsx` | NextSeo only | useEnhancedSEO + breadcrumbs | ✅ Done |
| `src/components/sections/locations/createCityPage.tsx` | NextSeo + manual JSON-LD | useEnhancedSEO + breadcrumbs in @graph | ✅ Done |

**Changes Made:**
- Added `useEnhancedSEO` hook to all 3 location page files
- Added visual breadcrumb navigation with proper accessibility (aria-label, aria-current)
- Combined breadcrumb schema with existing schemas using @graph pattern
- Breadcrumb hierarchy: Home > Locations (index), Home > Locations > Province (province pages), Home > Locations > City (city pages)

---

### Phase 4: Blog Posts (171 posts) ✅ COMPLETE
**Status:** ✅ Complete - 2026-01-22

Note: Affects blog index + dynamic template + category/tag archives = 171+ pages via 4 file changes.

| Component | Old Implementation | New Implementation | Status |
|-----------|-------------------|-------------------|--------|
| `pages/blog/index.tsx` | Manual Head | useEnhancedSEO + CollectionPage + breadcrumbs | ✅ Done |
| `pages/blog/[slug].tsx` | Manual Head + JSON-LD | useEnhancedSEO + BlogPosting/HowTo + breadcrumbs | ✅ Done |
| `pages/blog/category/[slug].tsx` | Manual Head | useEnhancedSEO + CollectionPage + breadcrumbs | ✅ Done |
| `pages/blog/tag/[slug].tsx` | Manual Head | useEnhancedSEO + CollectionPage + breadcrumbs | ✅ Done |

**Changes Made:**
- Added `useEnhancedSEO` hook to all 4 blog page files
- Added visual breadcrumb navigation with proper accessibility (aria-label, aria-current)
- Combined multiple schemas in @graph (BlogPosting, HowTo, BreadcrumbList, CollectionPage)
- Blog index uses CollectionPage schema with ItemList of recent posts
- Blog post template preserves existing HowTo schema for tutorial posts
- Category/tag archives use CollectionPage schema with filtered posts

---

### Phase 5: Learn/Info Pages (~21 pages) ✅ COMPLETE
**Status:** ✅ Complete - 2026-01-22

| Page | Old Implementation | New Implementation | Status |
|------|-------------------|-------------------|--------|
| `/contact.tsx` | NextSeo + manual schema | useEnhancedSEO + FAQ + breadcrumbs | ✅ Done |
| `/terms.tsx` | Manual Head only | useEnhancedSEO + article + breadcrumbs | ✅ Done |
| `/results.tsx` | Manual Head + JSON-LD | useEnhancedSEO + product + breadcrumbs | ✅ Done |
| `/reviews.tsx` | Manual Head + JSON-LD | useEnhancedSEO + product + breadcrumbs | ✅ Done |
| `/learn/how-it-works.tsx` | useEnhancedSEO (breadcrumb update) | Standardized visual breadcrumb | ✅ Done |
| `/learn/science.tsx` | useEnhancedSEO (breadcrumb update) | Standardized visual breadcrumb | ✅ Done |
| `/learn/safety.tsx` | useEnhancedSEO (breadcrumb update) | Standardized visual breadcrumb | ✅ Done |
| `/learn/faq.tsx` | useEnhancedSEO (breadcrumb update) | Standardized visual breadcrumb | ✅ Done |
| `/learn/activated-carbon-benefits.tsx` | NextSeo + ArticleSchema | useEnhancedSEO + article + breadcrumbs | ✅ Done |
| `/learn/activated-carbon-vs-baking-soda-deodorizers.tsx` | NextSeo + ArticleSchema | useEnhancedSEO + article + breadcrumbs | ✅ Done |
| `/learn/cat-litter-guide.tsx` | NextSeo + manual JSON-LD | useEnhancedSEO + article + breadcrumbs | ✅ Done |
| `/learn/glossary.tsx` | NextSeo + manual JSON-LD | useEnhancedSEO + DefinedTermSet + breadcrumbs | ✅ Done |
| `/learn/how-to-use-deodorizer.tsx` | NextSeo + manual JSON-LD | useEnhancedSEO + HowTo + breadcrumbs | ✅ Done |
| `/learn/using-deodorizers-with-kittens.tsx` | NextSeo + manual JSON-LD | useEnhancedSEO + article + breadcrumbs | ✅ Done |
| `/learn/solutions/how-to-neutralize-ammonia-cat-litter.tsx` | NextSeo + ArticleSchema | useEnhancedSEO + article + breadcrumbs | ✅ Done |
| `/learn/solutions/litter-box-smell-elimination.tsx` | NextSeo + ArticleSchema | useEnhancedSEO + article + breadcrumbs | ✅ Done |
| `/learn/solutions/senior-cat-litter-solutions.tsx` | NextSeo + ArticleSchema | useEnhancedSEO + article + breadcrumbs | ✅ Done |
| `/learn/solutions/ammonia-smell-cat-litter.tsx` | NextSeo + ArticleSchema | useEnhancedSEO + article + breadcrumbs | ✅ Done |
| `/learn/solutions/natural-cat-litter-additive.tsx` | NextSeo + ArticleSchema | useEnhancedSEO + article + breadcrumbs | ✅ Done |
| `/learn/solutions/apartment-cat-smell-solution.tsx` | NextSeo + ArticleSchema | useEnhancedSEO + article + breadcrumbs | ✅ Done |
| `/learn/solutions/multiple-cats-odor-control.tsx` | NextSeo + ArticleSchema | useEnhancedSEO + article + breadcrumbs | ✅ Done |

**Note:** Root pages /about.tsx, /privacy.tsx, /shipping.tsx do not exist. Only /contact, /terms, /results, /reviews at root level.

**Changes Made:**
- Full migration for contact.tsx, terms.tsx, results.tsx, reviews.tsx (4 pages)
- Standardized breadcrumb pattern for learn pages that already had useEnhancedSEO (4 pages)
- Full migration for activated-carbon-benefits.tsx (1 page)
- Full migration for remaining 12 learn pages (5 learn/ + 7 learn/solutions/)
- Fixed `item.url` → `item.path` type error in all migrated pages
- Added conditional `{schema && (...)}` for null-safe JSON-LD rendering
- Fixed missing `</main>` closing tags and removed redundant nested divs in solution pages

---

## Key Files

| File | Purpose |
|------|---------|
| `src/hooks/useEnhancedSEO.ts` | Main SEO hook with schema support |
| `src/hooks/useBreadcrumb.ts` | Breadcrumb schema generator |
| `src/lib/seo-utils.ts` | Schema generation utilities |
| `src/components/seo/json-ld-schema.tsx` | JSON-LD wrapper component |

---

## Validation Commands

```bash
# Run all validations
pnpm check-types && pnpm validate-dark-mode && pnpm validate-hydration

# SEO validation
pnpm seo:validate
```

---

## Migration Complete Summary

All 5 phases completed successfully:

| Phase | Pages | Status |
|-------|-------|--------|
| Phase 1: Business Pages | 5 | ✅ Complete |
| Phase 2: Product Pages | 4 | ✅ Complete |
| Phase 3: Location Pages | 210+ | ✅ Complete |
| Phase 4: Blog Posts | 171+ | ✅ Complete |
| Phase 5: Learn/Info Pages | 21 | ✅ Complete |

**Total Pages Migrated:** ~410+ pages

**Validation Results (2026-01-22):**
- `pnpm check-types` - ✅ Pass
- `pnpm validate-dark-mode` - ✅ Pass (411 files, 0 errors)
- `pnpm validate-hydration` - ✅ Pass (118 page files, 0 issues)
