# Ahrefs Remediation Plan

Date: 2026-03-08

## Completed in this pass

- Removed unsupported `en-US` hreflang alternates from shared SEO helpers, root metadata, localized metadata, learn/support/product/review/referral/tool pages, and sitemap generation.
- Removed noindex routes from the sitemap:
  - `/referral/`
  - `/terms/`
- Added a local inventory script and generated reports:
  - `scripts/seo/audit-ahrefs-issues.mjs`
  - `reports/ahrefs-issue-inventory.json`
  - `reports/ahrefs-issue-inventory.md`
- Split `app/documents/page.tsx` into a server route plus client child component so metadata, canonical, Open Graph, and Twitter tags are emitted by `generateMetadata`.
- Removed the conflicting `/documents -> /invest/` redirect from `config/redirects.js` so `/documents/` remains the canonical resource center.
- Repaired legacy document links in `public/documents/**`:
  - corrected resource-center links so they no longer bounce through the removed redirect
  - corrected stale English filenames in legacy HTML
  - corrected broken relative links in `public/documents/index.html`
- Reduced the highest-signal literal metadata debt in:
  - `app/case-studies/page.tsx`
  - `app/invest/page.tsx`
  - `app/invest/metadata.ts`
  - `app/tools/cat-litter-calculator/page.tsx`
  - `app/tools/cat-litter-calculator/metadata.ts`
- Re-ran the Ahrefs inventory after the changes.

## Current high-confidence issue map

### Hreflang / locale mismatch

- Remaining intentional `en-US` cluster:
  - `app/us/page.tsx`
- Root `html lang` normalization is already being corrected in:
  - `app/layout.tsx`

### Canonical / Open Graph defects

- Resolved for `app/documents/page.tsx`
  - client-side head tags removed
  - malformed canonical removed
  - server metadata now emits canonical, OG, and Twitter fields

### Redirect / internal link issues

- Resolved for `/documents`
  - `/documents/` remains the live resource center
  - the redirect to `/invest/` was removed
  - legacy internal resource links now resolve directly to live document assets

### Remaining inventory after this pass

From `reports/ahrefs-issue-inventory.md`:

- Unsupported hreflang hits: 1
- Noindex routes in sitemap: 0
- Client-side head-tag pages: 0
- Malformed canonical templates: 0
- Literal title too long: 0
- Literal description too short: 153
- Literal description too long: 10
- Metadata exports missing openGraph: 27
- Page files missing H1: 60

## Recommended next implementation order

1. Continue the description-length pass on high-value crawlable pages
   - prioritize `app/learn/**`, `app/support/**`, `app/science/page.tsx`, and localized learn/blog hubs
   - focus on pages that are indexed and already linked from core navigation

2. Triage `missingOpenGraph`
   - separate real public-page gaps from admin/internal false positives
   - patch public pages first (`app/free/page.tsx`, `app/montreal/page.tsx`, `app/support/contact/page.tsx`, `app/pos/page.tsx`)

3. Address the remaining `en-US` hreflang cluster
   - inspect `app/us/page.tsx`
   - decide whether it should keep a US-only canonical strategy or align with supported locale alternates only

## Validation notes

- Re-ran `node scripts/seo/audit-ahrefs-issues.mjs` successfully after the remediation.
- `pnpm lint` and `pnpm check-types` could not be run in this workspace because `node_modules/` is absent, and the repo scripts shell out to `pnpm` during presteps.
