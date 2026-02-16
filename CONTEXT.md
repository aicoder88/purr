# Purrify.ca — Clean Context Handoff
_Last updated: 2026-02-16_

---

## Business Overview

- **Product:** Purrify — activated carbon cat litter additive, single product in 4 sizes
- **Domain:** purrify.ca | Stack: Next.js 15 + TypeScript + Prisma + Stripe + Vercel
- **Primary goal:** Rank #1 for "cat litter odour" + maximize direct DTC sales
- **Markets:** Canada (primary), expanding to US (LA Spanish market) and has existing Chinese-only retail stores

---

## GSC Data — Last 28 Days (live as of 2026-02-16)

| Metric | Value |
|---|---|
| Total Clicks | 98 |
| Impressions | 12,963 |
| CTR | 0.76% |
| Avg Position | 13.3 |

### Top Queries
| Query | Clicks | Impressions | CTR | Position |
|---|---|---|---|---|
| purrify (brand) | 29 | 501 | 5.79% | 5.0 |
| cat litter smells like ammonia | 1 | 106 | 0.94% | 11.7 |
| arm and hammer vs fresh step | 1 | 10 | 10.00% | 3.3 |
| activated charcoal vs baking soda | 1 | 11 | 9.09% | 1.0 |

### Top Pages by Clicks
| Page | Clicks | Impressions | CTR | Position |
|---|---|---|---|---|
| / (homepage) | 38 | 1,201 | 3.16% | 8.5 |
| /blog/best-litter-odor-remover-small-apartments | 7 | 650 | 1.08% | 10.5 |
| /blog/fresh-step-vs-arm-hammer-comparison | 7 | 662 | 1.06% | 3.0 |
| /learn/activated-carbon-vs-baking-soda-deodorizers | 5 | **2,101** | 0.24% | 13.1 |
| /learn/solutions/apartment-cat-smell-solution | 5 | 192 | 2.60% | 9.6 |
| /blog/activated-carbon-vs-baking-soda-comparison | 4 | 875 | 0.46% | 4.8 |
| /learn/cat-litter-ammonia-health-risks | 3 | 449 | 0.67% | 5.7 |
| /learn/solutions/ammonia-smell-cat-litter | 3 | 1,061 | 0.28% | 12.0 |

### Critical SEO Opportunity (Quick Wins)
These pages are on page 2, one push to page 1 = major traffic:
1. `/learn/activated-carbon-vs-baking-soda-deodorizers` — 2,101 impressions, position 13.1, only 0.24% CTR. Getting to position ~5 could mean 50+ clicks/month from this page alone.
2. `/learn/solutions/ammonia-smell-cat-litter` — 1,061 impressions, position 12.0
3. Homepage — position 8.5, getting to top 3 is the main long-term goal

### Duplicate URL Issue
`/learn/solutions/ammonia-smell-cat-litter` and `/learn/solutions/ammonia-smell-cat-litter/` both appear in GSC — canonical/trailing slash inconsistency causing split signals.

---

## PageSpeed Scores (current)

| Page | Mobile | Desktop | Notes |
|---|---|---|---|
| Homepage | 67 | 78 | Worst — needs work |
| Products | 77 | 90 | SEO: 85 mobile (should be 100) |
| Blog Index | 77 | 97 | |
| How It Works | 76 | 97 | |

- No Core Web Vitals field data (insufficient real traffic)
- SEO 85 on Products mobile is a gap — needs investigation

---

## Google Analytics GA Data (Last 28 Days — Live)

  ┌────────────────────────────────────────────────────┬───────────────┬─────────────┬──────────────┐
  │                        Page                        │   Sessions    │ Bounce Rate │ Avg Duration │
  ├────────────────────────────────────────────────────┼───────────────┼─────────────┼──────────────┤
  │ / (homepage)                                       │ 113           │ 42%         │ 4m 59s       │
  ├────────────────────────────────────────────────────┼───────────────┼─────────────┼──────────────┤
  │ /blog                                              │ 22            │ 23%         │ 2m 29s       │
  ├────────────────────────────────────────────────────┼───────────────┼─────────────┼──────────────┤
  │ /products/trial-size                               │ 11            │ 9%          │ 2m 16s       │
  ├────────────────────────────────────────────────────┼───────────────┼─────────────┼──────────────┤
  │ /products                                          │ 10            │ 20%         │ 4m 11s       │
  ├────────────────────────────────────────────────────┼───────────────┼─────────────┼──────────────┤
  │ /blog/activated-carbon-vs-baking-soda-comparison   │ 8             │ 0%          │ 10m 57s      │
  ├────────────────────────────────────────────────────┼───────────────┼─────────────┼──────────────┤
  │ /learn/solutions/ammonia-smell-cat-litter          │ 5             │ 20%         │ 15s ⚠️        │
  ├────────────────────────────────────────────────────┼───────────────┼─────────────┼──────────────┤
  │ /learn/activated-carbon-vs-baking-soda-deodorizers │ 0 GA sessions │ —           │ —            │
  └────────────────────────────────────────────────────┴───────────────┴─────────────┴──────────────┘

---

## Completed Work (from current git state)

- [x] Deleted B2B vertical pages (`cat-cafes`, `groomers`, `hospitality`, `shelters`, `veterinarians`) — consolidated into `/b2b/` with vertical components at `app/b2b/_components/verticals/`
- [x] Deleted scripts graveyard (100+ one-off scripts)
- [x] Deleted `audit_results/`, cold email templates, dark mode validator scripts
- [x] PageSpeed issues fixed (per user)
- [x] Homepage CTA padding fixed
- [x] Reduced Vercel edge requests (commit: `a5c1bc06`)
- [x] Fixed Sentry errors (useTranslation server error, chunk loading, performanceMetrics)

---

## Remaining P0 Issues

### 1. Remove `force-dynamic` from Products Page (HIGHEST PRIORITY)
**File:** `app/[locale]/products/page.tsx:12`
```
export const dynamic = 'force-dynamic';
```
**Cause:** Experiment/A/B testing system (`getCommercialExperimentState` imported from `@/lib/experiments/commercial-server`)
**Action:** User does NOT want A/B testing. Remove the entire experiment system:
- Remove `import { getCommercialExperimentState }`
- Remove `import { ServerExperimentViewTracker }`
- Remove `export const dynamic = 'force-dynamic'`
- Delete `src/lib/experiments/` directory entirely
- Delete `src/components/experiments/` directory
- Make products page static (no dynamic export needed)

### 2. Fix Trailing Slash / Canonical Inconsistency
Two patterns exist:
- Blog uses `/${locale}/blog/` (includes `/en/` prefix for English)
- Products hardcodes `https://www.purrify.ca/products/` (no `/en/`)
- `/ammonia-smell-cat-litter` vs `/ammonia-smell-cat-litter/` both indexed

Enforce one pattern everywhere. Recommend: no locale prefix for English, trailing slash consistent.

### 3. Products Page SEO Score 85 (mobile)
Investigate why Products page SEO is 85 on mobile but 100 on desktop. Likely a missing meta tag or viewport issue specific to the localized route.

---

## Remaining P1 Issues

### 4. Content: Push `/learn/activated-carbon-vs-baking-soda-deodorizers` to Page 1
This page has 2,101 impressions at position 13.1 — it's the single biggest traffic lever right now.
- Add internal links from homepage, products page, and related blog posts pointing to this URL
- Improve the page's content depth / headings to target the exact query
- Add FAQ schema targeting "activated charcoal vs baking soda for odors" (currently ranking #1 for that exact query on another page)

### 5. Homepage Mobile Performance: 67
Identify and fix what's dragging mobile score down (likely render-blocking resources, LCP image, or translation bundle size).

### 6. Language Strategy: zh/es
- **zh:** Keep — has real Chinese retail stores
- **es:** Keep — LA expansion planned
- **Risk:** AI-generated translations may trigger thin content penalty from Google
- **Action:** Add `<meta name="robots" content="noindex">` to zh/es pages temporarily OR audit quality before indexing

---

## Remaining P2 Issues

### 7. Vercel Edge Request Costs
Already reduced (commit `a5c1bc06`). Investigate further:
- Check which routes are edge-rendered vs static
- Middleware runs on every request — audit `middleware.ts` for unnecessary executions

### 8. next.config.js Size
Currently still large. Could split redirects into `next.config.redirects.js` (already partially done per git status).

---

## Key File Paths

| Purpose | Path |
|---|---|
| Localized products page | `app/[locale]/products/page.tsx` |
| Products page content | `app/products/PageContent.tsx` or `app/products/page.tsx` |
| Experiment system (DELETE) | `src/lib/experiments/` |
| Experiment components (DELETE) | `src/components/experiments/` |
| B2B consolidated page | `app/b2b/page.tsx` |
| B2B vertical components | `app/b2b/_components/verticals/` |
| Next config | `next.config.js` |
| Redirects | `next.config.redirects.js` |
| i18n config | `src/i18n/config.ts` or `i18n/config.ts` |
| Blog index | `app/[locale]/blog/page.tsx` |

---

## Architecture Notes

- 4 locales: `en`, `fr`, `zh`, `es`
- `[locale]` catch-all routes for most pages
- Some pages exist at both `/products/` (root) and `/[locale]/products/` — check for duplication
- next-intl for i18n
- Prisma + Supabase/Postgres for blog content
- Stripe for payments (redirect checkout flow)

---

## Next Actions (Priority Order)

1. **Remove experiment system** → fixes `force-dynamic` on products page → biggest perf win
2. **Fix canonical/trailing slash** → consolidate split URL signals
3. **Internal link push** for `/learn/activated-carbon-vs-baking-soda-deodorizers` → biggest traffic lever
4. **Fix Products SEO 85 mobile** → investigate and fix
5. **Fix homepage mobile perf 67** → identify bottleneck
6. **Re-auth GA MCP** → `gcloud auth application-default login`
7. **Audit zh/es index status** → decide noindex vs quality-audit

---

## What NOT to Do

- Do NOT add new features or scripts
- Do NOT create new vertical B2B pages (consolidated into /b2b/)
- Do NOT add A/B testing or experiment infrastructure
- Do NOT add more redirects without first checking if they're needed
- zh/es translations are AI-generated — do not treat as high-quality content
