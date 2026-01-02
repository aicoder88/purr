# Purrify Site Optimization Report - January 2026

## Executive Summary

Deep analysis completed across SEO, conversion optimization, B2B/B2C strategy, automation, and performance. This report prioritizes ROI-focused actions for an e-commerce site preparing for advertising investment.

**Key Metrics (Last 28 Days from GSC):**
- **41 clicks** | **5,445 impressions** | **0.75% CTR** | **Position 15.6**
- USA has more impressions (2,143) than Canada (1,690) but only 0.37% CTR - major opportunity
- Mobile outperforms desktop on position (6.6 vs 19.2)
- Brand query "purrify" drives 46% of all clicks

---

## Sprint 1 Completion Status (January 2, 2026)

### Completed Items

| Item | Status | Commits |
|------|--------|---------|
| Abandoned Cart - DB Schema | ✅ Done | `bc60b14` - Cart + EmailSubscriber models |
| Sticky Add-to-Cart | ✅ Done | `ca32f3f` - StickyAddToCart component |
| Money-Back Guarantee Badge | ✅ Done | `62cb98c` - GuaranteeBadge component |
| Clean Sitemaps | ✅ Done | `a0fb9ac` - Exclusions for admin, 404, redirects |
| Product Schema | ✅ Done | `87b9e78` - JSON-LD on product pages |
| Review Request Emails | ✅ Done | `ca32f3f` - Cron + email template |
| B2B Vertical Pages | ✅ Done | `ca32f3f` - All 5 pages created |
| UTM Attribution | ✅ Done | `f9853dc` - Tracking utility + hook |
| Mobile Floating CTA | ✅ Done | `cffba62` - MobileFloatingCTA component |
| serverExternalPackages | ✅ Done | `127a060` - AI packages externalized |
| /results page | ✅ Done | `ca32f3f` - Testimonials landing page |
| /ammonia-control page | ✅ Existed | Enhanced previously |

### Needs Refinement

| Item | Issue | Priority |
|------|-------|----------|
| Veterinarians page | Missing VeterinarianPartnership + VeterinarianContact sections | Medium |
| B2B pages translations | Using fallback strings only, no FR/ZH translations | Low |
| Abandoned cart system | Has email template but missing cron trigger endpoint | High |
| Sticky Add-to-Cart | Not yet integrated into product pages | High |
| Guarantee Badge | Not yet added to all CTAs across site | Medium |

### Not Started

| Item | Notes | Sprint |
|------|-------|--------|
| Remove @emotion packages | Still in package.json (-15KB) | Sprint 2 |
| Abandoned Cart CRON job | Need `pages/api/cron/abandoned-cart.ts` | Sprint 2 |
| /try-free landing page | Only `/free` exists, need dedicated ad landing | Sprint 2 |
| Hero simplification | Not fully simplified with pricing above fold | Sprint 2 |
| Exit-intent email capture | Not implemented | Sprint 2 |
| Quantity selector | Not added to product pages | Sprint 2 |
| Guarantee standardization | 7-day vs 30-day inconsistency | Sprint 2 |
| CTA button href fix | `cta.tsx` line 97 | Sprint 2 |
| Weight mismatch fix | `standard.tsx` line 182 | Sprint 2 |
| Dynamic import Leaflet | -40KB potential | Sprint 3 |
| SSG for homepage | Not added | Sprint 3 |
| B2B sell sheets/PDFs | Not created | Sprint 3 |
| Lead nurturing sequence | Not built | Sprint 3 |
| Low stock notifications | Not built | Sprint 4 |
| Customer LTV tracking | Not built | Sprint 4 |
| hreflang on product pages | Still incomplete | Sprint 3 |

---

## Sprint 2: Pre-Advertising Critical Path

**Goal:** Complete all items required before starting paid advertising campaigns.

### Sprint 2A: Abandoned Cart System (High ROI)

| Task | File(s) | Effort |
|------|---------|--------|
| Create abandoned cart cron job | `pages/api/cron/abandoned-cart.ts` | 2 hours |
| Add cart tracking middleware | `src/middleware.ts` or checkout flow | 1 hour |
| Test email flow end-to-end | Manual testing | 1 hour |
| Add vercel.json cron schedule | `vercel.json` | 5 min |

### Sprint 2B: Conversion Quick Fixes

| Task | File(s) | Effort |
|------|---------|--------|
| Fix CTA button href (broken) | `src/components/sections/cta.tsx:97` | 10 min |
| Fix weight mismatch (50g shows 120g) | `pages/products/standard.tsx:182` | 10 min |
| Standardize guarantee to 30-day | Search all files for "7-day" | 30 min |
| Shorten CTA text (52→20 chars) | `src/components/sections/hero/HeroContent.tsx` | 10 min |
| Add quantity selector to products | `pages/products/*.tsx` | 1 hour |
| Integrate StickyAddToCart | `pages/products/standard.tsx`, `family-pack.tsx` | 30 min |
| Add GuaranteeBadge to all CTAs | Site-wide search | 1 hour |

### Sprint 2C: Performance (-55KB Bundle)

| Task | File(s) | Effort |
|------|---------|--------|
| Remove @emotion/react | `package.json`, find/replace imports | 30 min |
| Remove @emotion/styled | `package.json`, find/replace imports | 30 min |
| Verify no @emotion usage | `grep -r "@emotion" src/` | 10 min |

### Sprint 2D: Ad Landing Pages

| Task | File(s) | Effort |
|------|---------|--------|
| Create /try-free page | `pages/try-free.tsx` | 2 hours |
| Simplify hero with pricing above fold | `src/components/sections/hero/` | 2 hours |
| Add exit-intent email capture | New popup component | 3 hours |
| Fix /buy and /free-trial 404s | Redirects or pages | 30 min |

### Sprint 2 Deliverables Checklist

- [ ] Abandoned cart emails sending automatically
- [ ] All CTAs have working links
- [ ] All CTAs show guarantee badge
- [ ] Product weights accurate
- [ ] 30-day guarantee consistent everywhere
- [ ] Quantity selector on product pages
- [ ] @emotion removed (-15KB)
- [ ] /try-free landing page live
- [ ] Exit-intent popup capturing emails
- [ ] Hero shows pricing above fold

---

## Sprint 3: SEO & Content Optimization

### Sprint 3A: Technical SEO

| Task | File(s) | Effort |
|------|---------|--------|
| Add hreflang to product pages | `pages/products/*.tsx` | 2 hours |
| Add hreflang to learn pages | `pages/learn/**/*.tsx` | 2 hours |
| Dynamic import Leaflet map | Location pages | 1 hour |
| Add SSG to homepage | `pages/index.tsx` | 30 min |
| Fix duplicate sitemap submissions in GSC | Google Search Console | 30 min |

### Sprint 3B: Content Creation

| Task | Notes | Effort |
|------|-------|--------|
| Blog: "Best Cat Litter for Smell" | Comparison listicle | 3 hours |
| Blog: "How to Reduce Litter Box Odor" | Educational | 2 hours |
| Optimize product pages for "cat litter freshener" | Copy updates | 1 hour |
| Add "charcoal cat litter additive" to descriptions | Copy updates | 30 min |

### Sprint 3C: B2B Enhancement

| Task | Notes | Effort |
|------|-------|--------|
| Complete veterinarians page sections | Add Partnership + Contact | 2 hours |
| Create downloadable B2B sell sheet PDF | Design + content | 4 hours |
| Create case study template | For each vertical | 2 hours |
| Add B2B lead nurturing email sequence | 3-5 emails | 4 hours |

### Sprint 3 Deliverables Checklist

- [ ] All pages have proper hreflang
- [ ] Leaflet dynamically imported
- [ ] Homepage uses SSG
- [ ] 2 new keyword-targeted blog posts
- [ ] B2B sell sheet downloadable
- [ ] Veterinarians page complete
- [ ] B2B lead nurturing active

---

## Sprint 4: Advanced Automation & Analytics

### Sprint 4A: Inventory & Operations

| Task | Notes | Effort |
|------|-------|--------|
| Low stock notifications | Email when inventory < threshold | 4 hours |
| Customer LTV tracking | Add to Order model, calculate | 6 hours |
| Subscription reminder emails | Before renewal | 3 hours |

### Sprint 4B: Advanced Analytics

| Task | Notes | Effort |
|------|-------|--------|
| UTM → Order attribution dashboard | Admin panel view | 4 hours |
| Customer segmentation by LTV | Query + display | 3 hours |
| A/B test framework setup | For landing pages | 6 hours |

### Sprint 4C: Satellite Site Strategy

| Task | Notes | Effort |
|------|-------|--------|
| ecocatlitters → Purrify backlink | Featured brand section | 2 hours |
| catlittersmell → problem/solution article | Link to Purrify | 3 hours |
| Create content calendar for satellites | 1 post/week rotation | 2 hours |

---

## Quick Stats

| Metric | Value |
|--------|-------|
| Vercel Project | purr (Next.js 16, Node 22.x) |
| Domains | www.purrify.ca, fr.purrify.ca, zh.purrify.ca |
| Indexed URLs | 461 |
| Satellite Sites | 10+ (ecocatlitters, finepinecatlitter, catlittersmell, etc.) |
| Blog Posts | 16+ |
| Locales | EN, FR, ZH |

---

## Google Search Console Insights

### Top Queries (28 days)

| Query | Clicks | Impressions | CTR | Position |
|-------|--------|-------------|-----|----------|
| purrify | 19 | 781 | 2.43% | 4.5 |
| purrify reviews | 2 | 10 | 20.00% | 1.3 |
| ammonia smell cat litter | 0 | 3 | 0% | 15.0 |
| activated carbon cat litter | 0 | 2 | 0% | 9.0 |

**Opportunities:**
- "ammonia smell cat litter" - good position (15) but 0 clicks → improve meta description
- USA market underperforming (0.37% CTR vs 1.07% Canada) → geo-targeted content

### Top Pages

| Page | Clicks | Impressions | Position |
|------|--------|-------------|----------|
| Homepage | 27 | 1,170 | 4.7 |
| /reviews | 2 | 123 | 2.9 |
| /retailers | 2 | 210 | 35.9 |
| /blog/cat-litter-smell-worse-summer | 1 | 182 | 3.2 |

### Device Breakdown

| Device | Clicks | Impressions | CTR | Position |
|--------|--------|-------------|-----|----------|
| Desktop | 25 | 3,870 | 0.65% | 19.2 |
| Mobile | 13 | 1,520 | 0.86% | 6.6 |
| Tablet | 3 | 55 | 5.45% | 9.5 |

**Insight:** Mobile ranks better but gets fewer impressions - prioritize mobile experience.

---

## SEO Deep Dive

### Strengths
- Comprehensive structured data (Product, Organization, FAQ, LocalBusiness)
- 3 locales with hreflang implementation
- 16+ SEO-optimized blog posts
- Extensive location pages (30+ Canadian cities)
- Good image optimization (AVIF/WebP, 1-year cache)

### Issues to Fix

1. **Sitemap Cleanup Needed:** ✅ DONE (Sprint 1)
   - ~~Remove `/admin/*` pages from sitemap~~
   - ~~Remove `/404`, `/sentry-example-page`~~
   - ~~Remove redirected URLs (old province codes like `/locations/ab`)~~
   - Fix duplicate sitemap submissions in GSC (Sprint 3)

2. **Missing Product Schema on Product Pages:** ✅ DONE (Sprint 1)
   - ~~Homepage has product catalog schema~~
   - ~~Individual product pages need AggregateRating, Offer details~~

3. **Incomplete hreflang Coverage:** (Sprint 3)
   - Only homepage and blog index have full hreflang
   - Product pages, learn pages missing

### Content Opportunities

| Keyword Gap | Search Intent | Content Recommendation | Sprint |
|-------------|---------------|----------------------|--------|
| "best cat litter for smell" | Comparison | Create listicle + Purrify featured | Sprint 3 |
| "how to reduce litter box odor" | Informational | Educational blog post | Sprint 3 |
| "cat litter freshener" | Product | Optimize product pages for term | Sprint 3 |
| "charcoal cat litter additive" | Product variant | Add to product descriptions | Sprint 3 |

---

## Conversion Optimization

### Homepage Issues

1. **Hero Complexity:** Too many competing messages (Sprint 2)
   - Recommendation: Single clear headline + price + CTA

2. **Pricing Hidden:** Must scroll to see prices (Sprint 2)
   - Recommendation: Show all 3 price points in hero section

3. **No Sticky CTA:** ✅ DONE - Mobile Floating CTA added (Sprint 1)

### Product Page Issues

1. **Sticky Add-to-Cart:** ✅ Component created, needs integration (Sprint 2)

2. **Inconsistent Guarantees:** Says "7-Day" and "30-Day" in different places (Sprint 2)
   - Recommendation: Standardize to 30-day everywhere

3. **Missing Quantity Selector:** Can't add multiples (Sprint 2)
   - Recommendation: Add quantity input

### Quick Wins

| Fix | File | Impact | Status |
|-----|------|--------|--------|
| Add link to CTA button (currently no href) | `cta.tsx` line 97 | Broken conversion path | Sprint 2 |
| Shorten CTA text (52 chars → 20) | `HeroContent.tsx` | Better mobile UX | Sprint 2 |
| Add payment logos near checkout | Product pages | +trust | Sprint 2 |
| Fix weight mismatches (50g shows as 120g) | `standard.tsx` line 182 | Accuracy | Sprint 2 |

---

## B2B Opportunities

### Current B2B Assets
- `/retailers` page with wholesale tiers
- `/b2b` alternate entry
- `/retailer/portal/login` (existing retailer customers)
- Retailer CRM system in database

### B2B Verticals ✅ DONE (Sprint 1)

| Vertical | URL | Status |
|----------|-----|--------|
| Veterinary Clinics | `/veterinarians` | ✅ Created (needs refinement) |
| Cat Cafes | `/cat-cafes` | ✅ Created |
| Animal Shelters | `/shelters` | ✅ Created |
| Pet Groomers | `/groomers` | ✅ Created |
| Airbnb/Rentals | `/hospitality` | ✅ Created |

### B2B Gaps Remaining

| Item | Status | Sprint |
|------|--------|--------|
| Veterinarians missing sections | Needs Partnership + Contact | Sprint 3 |
| B2B page translations | EN only, no FR/ZH | Sprint 4 |
| Downloadable sell sheets | Not created | Sprint 3 |
| Case studies | Not created | Sprint 3 |

---

## Automation Opportunities

### Status

| Feature | Status | Sprint |
|---------|--------|--------|
| **Abandoned Cart Recovery** | ⚠️ Partial - DB + email template, no cron | Sprint 2 |
| Post-purchase review requests | ✅ DONE | Sprint 1 |
| Lead nurturing sequence (B2B) | Not started | Sprint 3 |
| Low stock notifications | Not started | Sprint 4 |
| Customer LTV tracking | Not started | Sprint 4 |

### Database Schema ✅ DONE (Sprint 1)

Cart and EmailSubscriber models added to `prisma/schema.prisma`.

---

## Performance Optimization

### Status

| Action | Impact | Status |
|--------|--------|--------|
| Remove `@emotion/react` + `@emotion/styled` | -15KB bundle | Sprint 2 |
| Add AI packages to `serverExternalPackages` | -150KB+ client | ✅ DONE |
| Dynamic import Leaflet map | -40KB for most users | Sprint 3 |

### Already Optimized (Good)
- `optimizePackageImports` for heavy libs
- Webpack tree-shaking enabled
- AVIF/WebP images with 1-year cache
- Smart chunking strategy
- GTM uses `lazyOnload` strategy
- `content-visibility: auto` for CLS

---

## Pre-Advertising Checklist

### Must Complete Before Ad Spend

- [ ] ~~Fix 404s on `/buy` and `/free-trial`~~ (Sprint 2)
- [ ] ~~Implement exit-intent email capture~~ (Sprint 2)
- [x] Add money-back guarantee badge (component created, needs integration)
- [ ] ~~Create dedicated `/try-free` landing page~~ (Sprint 2)
- [ ] ~~Add pricing above fold on homepage~~ (Sprint 2)
- [ ] ~~Set up abandoned cart recovery emails~~ (Sprint 2)
- [x] UTM tracking created (needs order integration verification)

### Landing Pages

| Traffic Source | Landing Page | Status |
|----------------|--------------|--------|
| Facebook/Instagram | `/try-free` | Sprint 2 |
| Google Search (problem) | `/ammonia-control` | ✅ Exists |
| Google Search (brand) | Homepage | ✅ Exists |
| TikTok/Reels | `/results` | ✅ Created |

---

## Sprint Summary

| Sprint | Focus | Estimated Effort |
|--------|-------|------------------|
| Sprint 1 | Foundation (DB, components, pages) | ✅ COMPLETE |
| Sprint 2 | Pre-advertising critical path | ~20 hours |
| Sprint 3 | SEO + Content + B2B enhancement | ~25 hours |
| Sprint 4 | Advanced automation + analytics | ~30 hours |

---

## Files Modified/Created (Sprint 1)

### New Files
- `pages/veterinarians.tsx` - B2B veterinary page
- `pages/cat-cafes.tsx` - B2B cat cafe page
- `pages/shelters.tsx` - B2B shelter page
- `pages/groomers.tsx` - B2B groomer page
- `pages/hospitality.tsx` - B2B hospitality page
- `pages/results.tsx` - Testimonials landing page
- `src/components/product/StickyAddToCart.tsx` - Sticky cart component
- `src/components/ui/MobileFloatingCTA.tsx` - Mobile floating button
- `src/components/ui/GuaranteeBadge.tsx` - Guarantee badge
- `src/components/sections/veterinarian-hero.tsx` - Vet hero section
- `src/components/sections/veterinarian-benefits.tsx` - Vet benefits
- `src/lib/tracking/utm.ts` - UTM capture utility
- `src/hooks/useUTM.ts` - UTM React hook
- `src/emails/abandoned-cart.tsx` - Abandoned cart email template
- `src/emails/review-request.tsx` - Review request email template
- `src/lib/cart-tracking.ts` - Cart tracking utility
- `pages/api/cron/review-requests.ts` - Review request cron

### Modified Files
- `prisma/schema.prisma` - Added Cart, EmailSubscriber, CartStatus, SubscriberStatus
- `next-sitemap.config.js` - Added exclusion patterns
- `next.config.js` - Added serverExternalPackages
- `pages/products/standard.tsx` - Added Product Schema JSON-LD
- `pages/products/family-pack.tsx` - Added Product Schema JSON-LD
- `pages/_app.tsx` - Added UTM capture
- `src/translations/types.ts` - Added B2B page types
- `src/components/layout/layout.tsx` - Added MobileFloatingCTA

---

*Report generated: January 1, 2026*
*Sprint 1 completed: January 2, 2026*
*Analysis by: 5 specialized agents (SEO, Frontend, UX, Backend, Performance)*
