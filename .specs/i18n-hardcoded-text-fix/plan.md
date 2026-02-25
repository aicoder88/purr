# i18n Hardcoded Text Fix Plan

## Overview

**Goal**: Eliminate all hardcoded English text from user-facing pages and ensure full translation support for French (fr)

**Current State**: 58% of pages properly use translations, 14.6% have hardcoded text issues.

---

## Audit Summary

| Category | Pages | Action |
|----------|-------|--------|
| Properly translated | 52 | None needed |
| Redirect pages | 7 | Skip (no UI) |
| Blog/CMS pages | 14 | Skip (dynamic content) |
| System pages (404, offline) | 3 | Skip (acceptable) |
| **Needs fixing** | **13** | **Translate** |

---

## Priority Tiers

### Tier 1: Critical (Customer-Facing, High Traffic)
| Page | File | Hardcoded Items | Effort |
|------|------|-----------------|--------|
| Reviews | `pages/reviews.tsx` | 6 reviews, headings, UI | High |
| Thank You | `pages/thank-you.tsx` | Order confirmation, delivery times | Medium |
| Locations Hub | `pages/locations/index.tsx` | Headings, descriptions, CTAs | Medium |
| Province Pages | `pages/locations/province/[provinceSlug].tsx` | Section titles, CTAs | Medium |
| City Pages | `src/components/sections/locations/createCityPage.tsx` | SEO, headings, all content | High |

### Tier 2: Important (Customer Portal)
| Page | File | Hardcoded Items | Effort |
|------|------|-----------------|--------|
| Customer Portal | `pages/customer/portal.tsx` | Loading states | Low |
| Referrals Dashboard | `pages/customer/referrals.tsx` | Tab labels, demo data | Medium |
| Referral Landing | `pages/refer/[code].tsx` | Offer UI text | Medium |

### Tier 3: Business (Lower Priority)
| Page | File | Hardcoded Items | Effort |
|------|------|-----------------|--------|
| Investor Page | `pages/invest.tsx` | Tab labels, section titles | Medium |
| Retailer Login | `pages/retailer/portal/login.tsx` | Form labels | Low |
| Spanish Reviews | `pages/es/opiniones.tsx` | Consolidate with main reviews | Medium |

---

## Implementation Plan

### Phase 1: Add Translation Keys (Day 1)

#### Task 1.1: Create `cityPage` translations
Add to `src/translations/en.ts`:
```typescript
cityPage: {
  seo: {
    title: "Cat Litter Deodorizer in {{city}} | Purrify Activated Carbon",
    description: "Cat litter smell in {{city}}? Purrify activated carbon eliminates ammonia odors naturally. Ships fast across {{province}}.",
  },
  hero: {
    badge: "{{city}} Cat Owners",
    heading: "Eliminate Cat Litter Odors in {{city}}",
    subheading: "Trusted by {{population}}+ cat owners across {{province}}",
  },
  sections: {
    whyPurrify: "Why {{city}} Cat Owners Choose Purrify",
    howItWorks: "How Purrify Works",
    testimonials: "What {{city}} Cat Owners Say",
    faq: "Common Questions from {{city}} Residents",
    cta: "Try Purrify Risk-Free",
  },
  climate: {
    title: "Designed for {{city}}'s Climate",
    description: "Our activated carbon formula is optimized for {{climate}}.",
  },
  shipping: {
    title: "Fast Shipping to {{city}}",
    description: "Free shipping on orders over $35. Delivered within {{days}} business days.",
  },
}
```

#### Task 1.2: Create `locations` translations
```typescript
locations: {
  hub: {
    badge: "Nationwide Coverage",
    heading: "Cat Litter Odor Control Across Canada",
    description: "Discover Purrify locations throughout Canada...",
    selectProvince: "Select Your Province",
    whyChoose: "Why Choose Purrify?",
  },
  province: {
    badge: "Province Guide",
    heading: "Cat Litter Odor Control in {{province}}",
    citiesHeading: "Cities We Serve in {{province}}",
    viewCityGuide: "View City Guide",
    exploreOther: "Explore Other Provinces",
  },
}
```

#### Task 1.3: Create `thankYou` translations
```typescript
thankYou: {
  heading: "Thank You!",
  subheading: "Your order has been confirmed.",
  orderConfirmed: "Order Confirmed",
  orderNumber: "Order Number",
  product: "Product",
  quantity: "Quantity",
  total: "Total",
  expectedDelivery: "Expected Delivery",
  deliveryCA: "7-10 business days within Canada",
  deliveryUS: "10-14 business days to the United States",
  deliveryIntl: "14-21 business days international",
}
```

#### Task 1.4: Create `reviews` translations
```typescript
reviews: {
  heading: "What Cat Owners Say",
  subheading: "Real reviews from real customers",
  verifiedPurchase: "Verified Purchase",
  helpful: "Helpful",
  // Reviews data will be in a separate array
}
```

### Phase 2: Add French Translations (Day 2)

#### Task 2.1: Translate `cityPage` to French
Add to `src/translations/fr.ts`:
```typescript
cityPage: {
  seo: {
    title: "Désodorisant pour litière à {{city}} | Purrify Charbon Actif",
    description: "Odeur de litière à {{city}}? Le charbon actif Purrify élimine naturellement les odeurs d'ammoniaque.",
  },
  // ... full French translations
}
```

#### Task 2.2: Translate `locations` to French
#### Task 2.3: Translate `thankYou` to French
#### Task 2.4: Translate `reviews` to French

### Phase 3: Add Chinese Translations (Day 3)

#### Task 3.1-3.4: Same as Phase 2 for Chinese (`zh.ts`)

### Phase 4: Add Spanish Translations (Day 4)

#### Task 4.1-4.4: Same as Phase 2 for Spanish (`es.ts`)
#### Task 4.5: Consolidate `pages/es/opiniones.tsx` into main reviews system

### Phase 5: Update Components (Day 5-6)

#### Task 5.1: Update City Page Template
File: `src/components/sections/locations/createCityPage.tsx`

**Before:**
```typescript
const seoTitle = `Cat Litter Deodorizer in ${profile.name} | Purrify Activated Carbon`;
```

**After:**
```typescript
const seoTitle = t.cityPage.seo.title
  .replace('{{city}}', profile.name)
  .replace('{{province}}', provinceName);
```

#### Task 5.2: Update Locations Index
File: `pages/locations/index.tsx`
- Replace all hardcoded headings with `t.locations.hub.*`

#### Task 5.3: Update Province Page
File: `pages/locations/province/[provinceSlug].tsx`
- Replace hardcoded text with `t.locations.province.*`

#### Task 5.4: Update Thank You Page
File: `pages/thank-you.tsx`
- Replace order confirmation text with `t.thankYou.*`

#### Task 5.5: Update Reviews Page
File: `pages/reviews.tsx`
- Replace hardcoded reviews with translated data
- Use `t.reviews.*` for UI strings

### Phase 6: Tier 2 Pages (Day 7)

#### Task 6.1: Customer Portal (`pages/customer/portal.tsx`)
#### Task 6.2: Referrals Dashboard (`pages/customer/referrals.tsx`)
#### Task 6.3: Referral Landing (`pages/refer/[code].tsx`)

### Phase 7: Tier 3 Pages (Day 8)

#### Task 7.1: Investor Page (`pages/invest.tsx`)
#### Task 7.2: Retailer Login (`pages/retailer/portal/login.tsx`)

---

## Validation Checklist

After each phase, run:
```bash
npm run lint && npm run check-types && npm run build
```

### Manual Testing
For each fixed page, verify:
- [ ] English (www.purrify.ca) displays correctly
- [ ] French (fr.purrify.ca) displays French text
- [ ] Chinese (zh.purrify.ca) displays Chinese text
- [ ] Spanish (es.purrify.ca or /es/*) displays Spanish text
- [ ] No console errors
- [ ] SEO meta tags are translated
- [ ] Dynamic content (city names, etc.) interpolates correctly

---

## Files to Modify

### Translation Files
1. `src/translations/en.ts` - Add new keys
2. `src/translations/fr.ts` - Add French translations
3. `src/translations/zh.ts` - Add Chinese translations
4. `src/translations/es.ts` - Add Spanish translations

### Page/Component Files
1. `src/components/sections/locations/createCityPage.tsx`
2. `pages/locations/index.tsx`
3. `pages/locations/province/[provinceSlug].tsx`
4. `pages/thank-you.tsx`
5. `pages/reviews.tsx`
6. `pages/customer/portal.tsx`
7. `pages/customer/referrals.tsx`
8. `pages/refer/[code].tsx`
9. `pages/invest.tsx`
10. `pages/retailer/portal/login.tsx`
11. `pages/es/opiniones.tsx` (consolidate/remove)

---

## Estimated Effort

| Phase | Tasks | Effort |
|-------|-------|--------|
| Phase 1: English keys | 4 | 2 hours |
| Phase 2: French | 4 | 3 hours |
| Phase 3: Chinese | 4 | 3 hours |
| Phase 4: Spanish | 5 | 3 hours |
| Phase 5: Components (Tier 1) | 5 | 4 hours |
| Phase 6: Tier 2 | 3 | 2 hours |
| Phase 7: Tier 3 | 2 | 1 hour |
| **Total** | **27 tasks** | **~18 hours** |

---

## Success Criteria

1. All 13 pages with hardcoded text now use `useTranslation()`
2. All 4 languages (en, fr, zh, es) display correctly
3. No hardcoded English strings in JSX (except system pages)
4. Build passes without errors
5. Manual QA confirms translations display properly

---

## Notes

- **Do NOT translate**: Legal pages (privacy-policy, terms), blog content (CMS), admin pages
- **Province/City names**: Keep in original language (Calgary stays Calgary in French)
- **Interpolation**: Use `{{variable}}` syntax for dynamic content
- **Fallbacks**: English should be fallback if translation missing
