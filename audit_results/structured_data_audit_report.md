# Structured Data (JSON-LD) Audit Report
**Project:** Purrify  
**Date:** 2026-01-30  
**Audited by:** Agent 74/100

## Executive Summary

The Purrify project has extensive JSON-LD structured data implementation across both Pages Router (`pages/`) and App Router (`app/`) architectures. The implementation is generally well-structured with proper schema.org vocabulary usage.

**Overall Status:** ✅ GOOD with minor issues

---

## 1. Organization Schema

### Location: `pages/_app.tsx` (lines 184-207)

**Status:** ✅ CORRECT

```javascript
{
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: canonicalUrl,
  logo: '/optimized/purrify-logo.avif',
  sameAs: Object.values(SOCIAL_LINKS),
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: CONTACT_INFO.phoneInternational,
      contactType: 'customer service',
      areaServed: 'CA',
      availableLanguage: ['English', 'French'],
    },
  ],
}
```

**Findings:**
- ✅ Valid `@context` (https://schema.org)
- ✅ Valid `@type` (Organization)
- ✅ Required properties present (name, url, logo)
- ✅ Social profiles included via `sameAs`
- ✅ Contact point information included
- ⚠️ **Issue:** Logo path is relative (`/optimized/purrify-logo.avif`) instead of absolute URL
- ⚠️ **Issue:** Only includes `areaServed: 'CA'` but website serves both CA and US

---

## 2. Product Schema

### Locations:
- `pages/products/standard.tsx` (lines 148-265)
- `pages/products/family-pack.tsx` (lines 165-179 via `useEnhancedSEO`)
- `pages/products/trial-size.tsx` (lines 115-128 via `useEnhancedSEO`)
- `pages/products/index.tsx` (lines 264-371 - CollectionPage)

**Status:** ✅ CORRECT with minor issues

**Standard Product Schema (pages/products/standard.tsx):**
```javascript
{
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": canonicalUrl,
  "name": "Purrify 50g - Natural Cat Litter Freshener...",
  "description": "...",
  "image": ["https://www.purrify.ca/optimized/60g.webp"],
  "brand": { "@type": "Brand", "name": "Purrify" },
  "sku": "purrify-50g",
  "mpn": "PURRIFY-50G",
  "offers": { ... },
  "aggregateRating": { ... }
}
```

**Findings:**
- ✅ Valid Product schema structure
- ✅ Required properties: name, description, image, brand, offers
- ✅ SKU and MPN included
- ✅ AggregateRating included
- ✅ Shipping details included (OfferShippingDetails)
- ✅ Return policy included (MerchantReturnPolicy)
- ⚠️ **Conflict:** Standard page has TWO separate Product schemas:
  1. Lines 141-146: Generated from `useEnhancedSEO` hook
  2. Lines 148-265: Hardcoded inline schema
  This creates duplicate/conflicting Product schemas on the same page
- ⚠️ **Hardcoded values:** aggregateRating values are hardcoded ("4.9", "138") instead of dynamic

---

## 3. Article/BlogPosting Schema

### Locations:
- `pages/blog/how-to-use-cat-litter-deodorizer.tsx` (lines 39-103 - HowTo schema)
- `pages/learn/how-it-works.tsx` (lines 124-128 via `useEnhancedSEO`)
- `pages/learn/faq.tsx` (lines 159-163)
- App router blog pages via `app/blog/[slug]/page.tsx`

**Status:** ✅ CORRECT

**HowTo Schema (blog/how-to-use-cat-litter-deodorizer.tsx):**
```javascript
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Cat Litter Deodorizer Additive: Step-by-Step Guide",
  "totalTime": "PT5M",
  "estimatedCost": { "@type": "MonetaryAmount", "currency": "CAD", "value": "15" },
  "step": [...],
  "author": { "@type": "Organization", "name": "Purrify" }
}
```

**Findings:**
- ✅ Valid HowTo schema for step-by-step guides
- ✅ Article schema generated via `useEnhancedSEO` hook
- ✅ Proper author/publisher attribution
- ✅ Date published/modified included
- ✅ Word count and reading time available

---

## 4. FAQPage Schema

### Locations:
- `pages/learn/faq.tsx` (lines 95-119 via `useEnhancedSEO`)
- `app/contact/page.tsx` (lines 149-164)
- `pages/products/family-pack.tsx` (lines 175 via `generateFAQSchema`)
- `pages/products/trial-size.tsx` (lines 124 via `generateFAQSchema`)

**Status:** ✅ CORRECT

**FAQ Schema (app/contact/page.tsx):**
```javascript
{
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How does Purrify work?',
      acceptedAnswer: { '@type': 'Answer', text: '...' }
    }
  ]
}
```

**Findings:**
- ✅ Valid FAQPage schema structure
- ✅ Questions and Answers properly nested
- ✅ Generated both from translations and hardcoded
- ✅ Contact page includes FAQ schema (good for rich snippets)

---

## 5. ContactPage Schema

### Location: `app/contact/page.tsx`

**Status:** ❌ MISSING

**Findings:**
- ❌ No `ContactPage` schema type implemented
- The contact page only has FAQPage schema, not ContactPage schema
- Should include:
  - `@type: "ContactPage"`
  - Main organization info
  - Contact methods
  - Business hours
  - Location details

**Recommendation:** Add ContactPage schema:
```javascript
{
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contact Purrify",
  "description": "...",
  "mainEntity": {
    "@type": "Organization",
    "name": "Purrify",
    "contactPoint": [...]
  }
}
```

---

## 6. BreadcrumbList Schema

### Implementation:
- `src/lib/seo-utils.ts` - `generateBreadcrumbSchema()` function (lines 460-499)
- Used in: `pages/products/index.tsx` (line 358)

**Status:** ⚠️ PARTIAL

**Findings:**
- ✅ Breadcrumb schema generator exists in `seo-utils.ts`
- ✅ Proper structure with `ListItem` elements
- ✅ Position and URL included for each breadcrumb
- ⚠️ **Issue:** Not consistently used across all pages
- ⚠️ **Issue:** `useEnhancedSEO` hook returns `breadcrumb: undefined` (line 238)

**Pages missing breadcrumb schema:**
- Product detail pages (standard, trial-size, family-pack)
- Blog pages
- Learn pages

---

## 7. Additional Schemas Found

### Website Schema (`src/lib/seo-utils.ts` lines 501-528)
- ✅ WebSite schema with search action
- ✅ Proper `@id` references

### LocalBusiness Schema (`src/lib/seo-utils.ts` lines 613-688)
- ✅ For location pages
- ✅ Geo coordinates included
- ✅ Opening hours included

### ClaimReview Schema (`src/hooks/useEnhancedSEO.ts` lines 436-463)
- ✅ For fact-checking/comparison content
- ✅ Rating system implemented

### SpeakableSpecification Schema (`src/hooks/useEnhancedSEO.ts` lines 541-557)
- ✅ For voice assistant optimization
- ✅ CSS selectors and XPath included

### CollectionPage Schema (`pages/products/index.tsx`)
- ✅ ItemList with multiple products
- ✅ Breadcrumb schema included in @graph

---

## 8. Schema Conflicts Detected

### Issue 1: Duplicate Product Schemas on `/products/standard`
**Severity:** HIGH

The page has TWO separate Product schemas:
1. From `useEnhancedSEO` hook (lines 141-146)
2. Hardcoded inline (lines 148-265)

**Impact:** Google may ignore one or both schemas due to confusion

### Issue 2: Organization Schema Duplication
**Severity:** MEDIUM

- Global Organization schema in `_app.tsx`
- Additional Organization schema in homepage via `generateHomepageSchema()`

**Impact:** Redundant but not conflicting (same entity)

---

## 9. Required Properties Verification

| Schema Type | @context | @type | Required Props | Status |
|------------|----------|-------|----------------|--------|
| Organization | ✅ | ✅ | name, url ✅ | PASS |
| Product | ✅ | ✅ | name, image, offers ✅ | PASS |
| Article | ✅ | ✅ | headline, author, publisher ✅ | PASS |
| FAQPage | ✅ | ✅ | mainEntity ✅ | PASS |
| BreadcrumbList | ✅ | ✅ | itemListElement ✅ | PASS |
| HowTo | ✅ | ✅ | name, step ✅ | PASS |
| ContactPage | ❌ | ❌ | Missing entirely | FAIL |

---

## 10. Recommendations

### High Priority
1. **Fix duplicate Product schemas** on `/products/standard` - remove hardcoded version or merge with hook-generated
2. **Add ContactPage schema** to `/contact` page
3. **Fix logo URL** in Organization schema to use absolute URL

### Medium Priority
4. **Implement breadcrumb schema** consistently across all pages
5. **Make aggregateRating values dynamic** from actual review data
6. **Expand areaServed** in Organization schema to include 'US'

### Low Priority
7. **Add review schema** for individual testimonials (currently removed)
8. **Add VideoObject schema** if video content is added
9. **Add QAPage schema** for Q&A sections (different from FAQ)

---

## 11. Test Coverage

### E2E Tests (`e2e/seo/schema-rendering.spec.ts`)
- ✅ Product schema validation
- ✅ Article schema validation  
- ✅ FAQPage schema validation
- ✅ Organization schema validation
- ✅ Meta tags validation
- ✅ Hreflang validation
- ✅ Schema uniqueness validation

### Build Scripts (`scripts/validate-schemas.ts`)
- ✅ Schema validation utilities exist
- ⚠️ Build-time validation is manual only

---

## Summary

| Category | Count |
|----------|-------|
| Schemas Implemented | 9 types |
| Pages with Schemas | 40+ pages |
| Critical Issues | 1 (duplicate Product) |
| Missing Schemas | 1 (ContactPage) |
| Minor Issues | 4 |

**Overall Grade: B+**

The structured data implementation is comprehensive and mostly correct. The main issue is the duplicate Product schema on the standard product page which should be resolved to ensure proper rich snippet display in search results.
