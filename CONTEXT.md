# Purrify.ca — Clean Context Handoff
_Last updated: 2026-02-18_

---

## Business Overview

- **Product:** Purrify — activated carbon cat litter additive, single product in 4 sizes
- **Domain:** purrify.ca | Stack: Next.js 16 + TypeScript + Prisma + Stripe + Vercel
- **Primary goal:** Rank #1 for "cat litter odour" + maximize direct DTC sales
- **Markets:** Canada (primary), expanding to US

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
| Homepage | 67 | 78 | **PRIORITY** — needs work |
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

## Completed Work

- [x] Deleted B2B vertical pages (`cat-cafes`, `groomers`, `hospitality`, `shelters`, `veterinarians`) — consolidated into `/b2b/` with vertical components at `app/b2b/_components/verticals/`
- [x] Deleted scripts graveyard (100+ one-off scripts)
- [x] Deleted `audit_results/`, cold email templates, dark mode validator scripts
- [x] PageSpeed issues fixed (per user)
- [x] Homepage CTA padding fixed
- [x] Reduced Vercel edge requests (commit: `a5c1bc06`)
- [x] Fixed Sentry errors (useTranslation server error, chunk loading, performanceMetrics)
- [x] **Removed experiment system** — `src/lib/experiments/` and `src/components/experiments/` deleted
- [x] **Products page no longer uses `force-dynamic`** — now static
- [x] **Updated steering docs** — `.kiro/steering/` now reflects App Router (not Pages Router)
- [x] **Removed A/B testing from homepage Hero** — eliminated blocking API call to `/api/ab-test/track`
- [x] **Moved announcement bar animation styles to global CSS** — removed `dangerouslySetInnerHTML` blocking render
- [x] **Optimized HeroVideo for mobile** — lazy loading poster on mobile, reduced quality, `preload="none"` for video on mobile
- [x] **Fixed Products Page SEO 85 mobile** — Added `viewport` export to `app/[locale]/products/page.tsx`, removed zh-CN/es-US locale references
- [x] **Fixed trailing slash inconsistency** — `trailingSlash: true` already in next.config.js, cleaned up canonical URLs across 38 files
- [x] **Cleaned up zh-CN and es-US locale references** — Removed from 38+ page metadata files (only en/fr supported)
- [x] **Added preconnect hints** — Added DNS preconnect for Google Tag Manager, Google Analytics, and fonts in layout.tsx

---

## Remaining P0 Issues

### 1. Homepage Mobile Performance: 67 (HIGHEST PRIORITY)
**File:** `app/page.tsx` already uses `export const dynamic = 'force-static'`

**Investigation needed:**
- Render-blocking resources (CSS/JS)
- LCP image optimization
- Translation bundle size
- Third-party scripts

**Quick wins to try:**
- Add `priority` prop to hero LCP image (already has `priority={true}`)
- Check if any heavy components can be lazy-loaded
- Audit third-party scripts (analytics, tracking)

**Completed:**
- Preconnect hints added for GTM, GA, and fonts
- HeroVideo already optimized with `preload="none"` on mobile

---

## Remaining P1 Issues

### 4. Content: Push `/learn/activated-carbon-vs-baking-soda-deodorizers` to Page 1
This page has 2,101 impressions at position 13.1 — it's the single biggest traffic lever right now.
- ✅ Internal links already exist from: footer, Products page (Related Pages section), Learn hub page, Science section, How It Works section
- Improve the page's content depth / headings to target the exact query
- ✅ FAQ schema already exists on the page targeting "activated charcoal vs baking soda for odors"

---

## Remaining P2 Issues

### 6. Vercel Edge Request Costs
Already reduced (commit `a5c1bc06`). Investigate further:
- Check which routes are edge-rendered vs static
- Middleware runs on every request — audit `proxy.ts` for unnecessary executions

### 7. next.config.js Size
Currently still large. Could split redirects into `next.config.redirects.js` (already partially done per git status).

---

## Key File Paths

| Purpose | Path |
|---|---|
| Homepage | `app/page.tsx` |
| Localized products page | `app/[locale]/products/page.tsx` |
| Root products page | `app/products/page.tsx` |
| Products page content | `app/products/PageContent.tsx` |
| B2B consolidated page | `app/b2b/page.tsx` |
| B2B vertical components | `app/b2b/_components/verticals/` |
| Next config | `next.config.js` |
| Redirects | `next.config.redirects.js` |
| i18n config | `src/i18n/config.ts` |
| Blog index | `app/[locale]/blog/page.tsx` |

---

## Architecture Notes

- 2 locales: `en`, `fr`
- `[locale]` catch-all routes for most pages
- Some pages exist at both `/products/` (root) and `/[locale]/products/` — check for duplication
- next-intl for i18n
- Prisma + Supabase/Postgres for blog content
- Stripe for payments (redirect checkout flow)
- **App Router** — NOT Pages Router (migrated)

---

## Next Actions (Priority Order)

1. **Fix homepage mobile perf 67** → Run PageSpeed analysis, identify bottlenecks
2. **Fix Products SEO 85 mobile** → Compare localized vs root meta tags
3. **Fix trailing slash inconsistency** → Configure `trailingSlash` in next.config.js
4. **Internal link push** for `/learn/activated-carbon-vs-baking-soda-deodorizers` → biggest traffic lever
5. **Re-auth GA MCP** → `gcloud auth application-default login`

---

## What NOT to Do

- Do NOT add new features or scripts
- Do NOT create new vertical B2B pages (consolidated into /b2b/)
- Do NOT add A/B testing or experiment infrastructure
- Do NOT add more redirects without first checking if they're needed
- Blog content is JSON files in `content/blog/{en,fr}/` — zh/es locale support has been removed
- **Do NOT push changes unless explicitly instructed by the USER**
