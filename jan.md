# Purrify Site Optimization Report - January 2026

## Executive Summary

Deep analysis completed across SEO, conversion optimization, B2B/B2C strategy, automation, and performance. This report prioritizes ROI-focused actions for an e-commerce site preparing for advertising investment.

**Key Metrics (Last 28 Days from GSC):**
- **41 clicks** | **5,445 impressions** | **0.75% CTR** | **Position 15.6**
- USA has more impressions (2,143) than Canada (1,690) but only 0.37% CTR - major opportunity
- Mobile outperforms desktop on position (6.6 vs 19.2)
- Brand query "purrify" drives 46% of all clicks

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

## Priority Actions - Ranked by ROI

### TIER 1: CRITICAL (Do This Week)

| # | Action | Impact | Effort | Category |
|---|--------|--------|--------|----------|
| 1 | **Implement Abandoned Cart Recovery** | +10-15% recovered sales | Medium | Automation |
| 2 | **Add Sticky Add-to-Cart** on product pages | +25-35% product conversions | Low | UI/UX |
| 3 | **Simplify Hero + Lead with FREE Trial** | +15-25% engagement | Low | Conversion |
| 4 | **Add Money-Back Guarantee Badge** to all CTAs | +10-15% trust | Low | Conversion |
| 5 | **Remove Unused @emotion Packages** | -15KB bundle | Low | Performance |

### TIER 2: HIGH PRIORITY (Next 2 Weeks)

| # | Action | Impact | Effort | Category |
|---|--------|--------|--------|----------|
| 6 | **Clean Sitemaps** (remove admin, 404, redirect URLs) | Better crawl efficiency | Low | SEO |
| 7 | **Add Product Schema** to product pages | Rich snippets in SERPs | Low | SEO |
| 9 | **Post-Purchase Review Request Emails** | +10-30% reviews | Low | Automation |


### TIER 3: MEDIUM PRIORITY (Next 30 Days)

| # | Action | Impact | Effort | Category |
|---|--------|--------|--------|----------|
| 11 | **Create Ad-Specific Landing Pages** | Better ad ROI | Medium | Conversion |
| 12 | **B2B Vertical Pages** (vets, shelters, cat cafes) | New revenue channel | High | B2B |
| 14 | **UTM Attribution Storage** | Ad spend optimization | Low | Tracking |
| 15 | **Mobile Floating CTA Button** | +15-25% mobile conversions | Low | UI/UX |

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

1. **Sitemap Cleanup Needed:**
   - Remove `/admin/*` pages from sitemap
   - Remove `/404`, `/sentry-example-page`
   - Remove redirected URLs (old province codes like `/locations/ab`)
   - Fix duplicate sitemap submissions in GSC

2. **Missing Product Schema on Product Pages:**
   - Homepage has product catalog schema
   - Individual product pages need AggregateRating, Offer details

3. **Incomplete hreflang Coverage:**
   - Only homepage and blog index have full hreflang
   - Product pages, learn pages missing

### Content Opportunities

| Keyword Gap | Search Intent | Content Recommendation |
|-------------|---------------|----------------------|
| "best cat litter for smell" | Comparison | Create listicle + Purrify featured |
| "how to reduce litter box odor" | Informational | Educational blog post |
| "cat litter freshener" | Product | Optimize product pages for term |
| "charcoal cat litter additive" | Product variant | Add to product descriptions |

---

## Conversion Optimization

### Homepage Issues

1. **Hero Complexity:** Too many competing messages
   - Recommendation: Single clear headline + price + CTA

2. **Pricing Hidden:** Must scroll to see prices
   - Recommendation: Show all 3 price points in hero section

3. **No Sticky CTA:** Users lose purchase option when scrolling
   - Recommendation: Add floating "Buy Now" button

### Product Page Issues


2. **Inconsistent Guarantees:** Says "7-Day" and "30-Day" in different places
   - Recommendation: Standardize to 30-day everywhere

3. **Missing Quantity Selector:** Can't add multiples
   - Recommendation: Add quantity input

### Quick Wins

| Fix | File | Impact |
|-----|------|--------|
| Add link to CTA button (currently no href) | `cta.tsx` line 97 | Broken conversion path |
| Shorten CTA text (52 chars → 20) | `HeroContent.tsx` | Better mobile UX |
| Add payment logos near checkout | Product pages | +trust |
| Fix weight mismatches (sometimes it says 120g, when that product is the 50g standard size) | `standard.tsx` line 182 | Accuracy |

---

## B2B Opportunities

### Current B2B Assets
- `/retailers` page with wholesale tiers
- `/b2b` alternate entry
- `/retailer/portal/login` (existing retailer customers)
- Retailer CRM system in database

### Missing B2B Verticals

| Vertical | URL to Create | Value Proposition |
|----------|---------------|-------------------|
| Veterinary Clinics | `/veterinarians` | Health benefits, recommend to clients |
| Cat Cafes | `/cat-cafes` | High-visibility locations, volume |
| Animal Shelters | `/shelters` | CSR angle, bulk discounts |
| Pet Groomers | `/groomers` | Value-add service offering |
| Airbnb/Rentals | `/hospitality` | Pet-friendly property must-have |

### B2B Automation Gaps
- No downloadable sell sheets or case studies

---

## Automation Opportunities

### Must Build

| Feature | ROI Potential | Effort |
|---------|---------------|--------|
| **Abandoned Cart Recovery** | Very High (+10-15% recovery) | 1 week |
| Post-purchase review requests | High (+reviews = +conversions) | 2 days |
| Lead nurturing sequence (B2B) | High (higher AOV) | 1 week |
| Low stock notifications | Medium (prevent stockouts) | 2 days |
| Customer LTV tracking | Medium (enables segmentation) | 1 week |

### Recommended Schema Additions

```prisma
model Cart {
  id              String      @id @default(cuid())
  email           String?
  sessionId       String      @unique
  items           CartItem[]
  status          CartStatus  @default(ACTIVE)
  lastActivityAt  DateTime    @default(now())
  emailsSent      Int         @default(0)
  @@index([status, lastActivityAt])
}

model EmailSubscriber {
  id              String      @id @default(cuid())
  email           String      @unique
  source          String?     // signup, checkout, referral
  locale          String      @default("en")
  welcomeEmailSent Boolean    @default(false)
  @@index([status])
}
```

---

## Performance Optimization

### Quick Wins

| Action | Impact | Effort |
|--------|--------|--------|
| Remove `@emotion/react` + `@emotion/styled` | -15KB bundle | 5 min |
| Add AI packages to `serverExternalPackages` | -150KB+ client | 5 min |
| Dynamic import Leaflet map | -40KB for most users | 30 min |

### Already Optimized (Good)
- `optimizePackageImports` for heavy libs
- Webpack tree-shaking enabled
- AVIF/WebP images with 1-year cache
- Smart chunking strategy
- GTM uses `lazyOnload` strategy
- `content-visibility: auto` for CLS

### Recommendations

1. **Add SSG to Homepage:**
```tsx
export async function getStaticProps({ locale }) {
  return { props: { locale }, revalidate: 3600 };
}
```

2. **Update next.config.js:**
```js
serverExternalPackages: ["sharp", "@anthropic-ai/sdk", "openai", "cheerio"],
```

3. **Remove from package.json:**
```json
// DELETE these unused packages:
"@emotion/react": "^11.14.0",
"@emotion/styled": "^11.14.1",
```

---

## Satellite Site Network

You have 10+ satellite domains on Vercel - leverage for backlinking:

| Domain | Status | Opportunity |
|--------|--------|-------------|
| ecocatlitters | Active | Link to Purrify as "featured brand" |
| finepinecatlitter | Active | Comparison article with Purrify |
| catlittersmell | Active | Problem-solution linking to Purrify |
| healthy-cat-litter | Active | Health-focused content → Purrify |
| premiumcatlitter | Active | Premium positioning |
| thenaturalcatlitter | Active | Natural/eco angle |
| backtobasicscatlitter | Active | Simple solution messaging |
| allnaturalcatlitter | Active | Ingredient-focused content |

**Strategy:** Each satellite can target different keywords and funnel to Purrify for purchase.

---

## Pre-Advertising Checklist

### Must Complete Before Ad Spend

- [ ] Fix 404s on `/buy` and `/free-trial` (high-intent URLs)
- [ ] Implement exit-intent email capture (15% off offer)
- [ ] Add money-back guarantee badge to ALL CTAs
- [ ] Create dedicated landing page for trial offer
- [ ] Add pricing above fold on homepage
- [ ] Set up abandoned cart recovery emails
- [ ] Verify UTM tracking flows to order metadata

### Landing Pages Needed

| Traffic Source | Landing Page | Key Elements |
|----------------|--------------|--------------|
| Facebook/Instagram | `/try-free` | Visual, emotional, trial focus |
| Google Search (problem) | `/ammonia-control` | Educational, solution |
| Google Search (brand) | Homepage | Full experience |
| TikTok/Reels | `/results` | Video testimonials, before/after |

---

## Summary: Top 5 ROI Actions

1. **Abandoned Cart Recovery** - Immediate revenue recovery from existing traffic
2. **Sticky Add-to-Cart** - Convert more of your product page visitors
3. **Newsletter/Email Capture** - Build remarketing list before ad spend
4. **Sitemap + Schema Cleanup** - Get better rankings for free
5. **B2B Vertical Pages** - Higher AOV, recurring orders

---

## Files Modified/Created

This analysis examined:
- `prisma/schema.prisma` - Database models
- `pages/api/` - API routes and automation
- `src/components/sections/` - UI components
- `src/lib/` - Business logic
- `next.config.js` - Build configuration
- `public/sitemap*.xml` - SEO sitemaps
- `vercel.json` - Cron jobs

---

*Report generated: January 1, 2026*
*Analysis by: 5 specialized agents (SEO, Frontend, UX, Backend, Performance)*
