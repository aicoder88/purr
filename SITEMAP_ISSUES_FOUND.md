# Sitemap Issues Analysis Report

**Date:** 2026-02-11  
**Agent:** Agent 7 - Sitemap SEO Fix  
**Project:** Purrify.ca

---

## AHREFS DATA SUMMARY

| Issue Type | Crawled | Change | Added | New |
|------------|---------|--------|-------|-----|
| 3XX redirect in sitemap | 164 | 151 | 121 | 30 |
| Noindex page in sitemap | 20 | - | 18 | 2 |
| Non-canonical page in sitemap | 20 | 18 | 6 | 12 |
| Pages added to sitemaps | 201 | 199 | - | - |
| Indexable page not in sitemap | 1 | 101 | 1 | 102 removed |

---

## ISSUES FOUND

### 1. 3XX REDIRECTS IN SITEMAP (HIGH PRIORITY)

These URLs are in the sitemap but redirect elsewhere:

| URL in Sitemap | Redirects To | Status |
|----------------|--------------|--------|
| `/about/` | `/about/our-story/` | 301 |
| `/buy/` | `/products/` | 301 |
| `/free-trial/` | `/try-free/` | 301 |
| `/documents/` | `/invest/` | 301 |
| `/support/contact/` | `/contact/` | 301 |
| `/montreal/` | `/locations/montreal` | 301 |

**ADDITIONAL REDIRECTS TO EXCLUDE:**
- `/products/purrify-20g` → `/products/trial-size`
- `/products/purrify-50g` → `/products/standard`
- `/products/purrify-120g` → `/products/family-pack`
- `/products/medium-size` → `/products/standard`
- `/products/large-size` → `/products/family-pack`
- `/products/family` → `/products/family-pack`
- `/trial` → `/products/trial-size`
- `/free` → `/products/trial-size`
- `/checkout` → `/products`
- `/cart-2` → `/products`
- `/about` → `/about/our-story`
- `/stockists` → `/stores`
- `/tos` → `/terms`
- `/privacy` → `/privacy-policy`
- `/my-account` → `/customer/portal`
- All province abbreviations: `/locations/ab`, `/locations/bc`, etc.

---

### 2. NOINDEX PAGES IN SITEMAP (CRITICAL)

Pages that are marked `noindex` but still appear in sitemap:

| URL | robots directive | Reason |
|-----|------------------|--------|
| `/free/` | `index: false` | Redirect page |
| `/buy/` | `index: false` | Redirect page |
| `/admin/*` | `index: false, follow: false` | Admin portal |
| `/affiliate/dashboard/*` | No explicit robots | Protected auth pages |
| `/affiliate/login` | No explicit robots | Protected auth page |
| `/affiliate/activate` | No explicit robots | Protected auth page |
| `/affiliate/signup` | No explicit robots | Protected auth page |
| `/customer/portal/` | No robots in metadata | Protected auth page |
| `/customer/referrals/` | No robots in metadata | Protected auth page |
| `/retailer/portal/login/` | No explicit robots | Protected auth page |
| `/thank-you/` | `index: false` | Post-purchase |
| `/thank-you/upsell/` | `index: false` | Post-purchase |
| `/pos/` | `index: false` | Internal tool |
| `/results/` | **MISSING noindex** | Should be noindex |
| `/dialergptpitchdeck/` | `index: false` | Private page |

---

### 3. NON-CANONICAL PAGES IN SITEMAP

| URL | Issue |
|-----|-------|
| `/es/opiniones/` | Page exists but has redirect in next.config.js to `/es/reviews` which then redirects to `/es/products` |

**Note:** The `/es/opiniones/` page IS currently indexable with its own canonical, but next.config.js has a redirect rule that may cause issues.

---

### 4. INDEXABLE PAGES NOT IN SITEMAP

The sitemap IS missing some important indexable pages based on the additionalPaths analysis:

**Already in additionalPaths (GOOD):**
- `/`, `/fr/`, `/zh/`, `/es/`, `/us/`
- `/blog/`, `/fr/blog/`, `/zh/blog/`, `/es/blog/`
- `/products/*` (all variants)
- `/learn/*` (most pages)
- `/reviews/`, `/fr/reviews/`, `/es/reviews/`
- `/stores/`, `/fr/stores/`, `/zh/stores/`, `/es/stores/`
- `/b2b/`, `/fr/b2b/`
- `/contact/`, `/fr/contact/`, `/es/contact/`
- `/about/our-story/`, `/fr/about/our-story/`

**POTENTIALLY MISSING:**
- `/referral/` - Already in additionalPaths
- `/affiliate/` - Already in additionalPaths
- `/fun/` - Already covered by page discovery
- `/veterinarians/`, `/shelters/`, `/groomers/`, `/cat-cafes/`, `/hospitality/` - Static pages

---

## RECOMMENDED FIXES

### Fix 1: Add noindex to /results page
The `/results/` page should have `robots: { index: false }` since it's a utility/results page.

### Fix 2: Update next-sitemap.config.js

1. **Add to exclude list:**
   - Ensure all redirecting URLs are excluded
   - Ensure all noindex pages are excluded
   - Add missing patterns:
     ```javascript
     '/free-trial', '/fr/free-trial', '/zh/free-trial', '/es/free-trial',
     '/buy', '/fr/buy', '/zh/buy', '/es/buy',
     '/results', '/fr/results', '/zh/results', '/es/results',
     '/dialergptpitchdeck',
     ```

2. **Add to additionalPaths:**
   - Homepage variants (already there)
   - Product pages (already there)
   - Blog locale pages (already there)

### Fix 3: Fix /es/opiniones redirect conflict
Either:
- Option A: Remove the redirect from next.config.js and keep the page
- Option B: Remove the page and let the redirect work

---

## VERIFICATION CHECKLIST

After implementing fixes:

- [ ] Run `pnpm build` to generate new sitemap
- [ ] Check sitemap-0.xml does NOT contain:
  - [ ] `/about/`
  - [ ] `/buy/`
  - [ ] `/free/`
  - [ ] `/checkout`
  - [ ] `/admin/*`
  - [ ] `/affiliate/dashboard/*`
  - [ ] `/customer/portal/`
  - [ ] `/results/` (if made noindex)
  - [ ] `/thank-you/`
  
- [ ] Check sitemap-0.xml DOES contain:
  - [ ] `/`
  - [ ] `/blog/`
  - [ ] `/products/`
  - [ ] `/learn/`
  - [ ] `/about/our-story/`
  - [ ] `/reviews/`
  - [ ] `/stores/`
  - [ ] All locale variants

---

## SUMMARY

**Current Status:** The `next-sitemap.config.js` already has comprehensive exclusions and additionalPaths configured. The issues in Ahrefs may be from:
1. An older version of the sitemap before fixes were applied
2. Some pages missing explicit noindex directives
3. Some redirect patterns not being caught

**Key Actions Needed:**
1. Add noindex to `/results` page
2. Add `/dialergptpitchdeck` to exclude list
3. Verify all French/Chinese customer pages are excluded
4. Consider removing `/es/opiniones` redirect if the page should exist
