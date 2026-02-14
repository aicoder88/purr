# Pages Router to App Router Migration Cleanup Plan

**Project:** `/Users/macpro/dev/purr` (Purrify - Next.js 16, React 19)
**Goal:** Complete the migration by fixing all broken code, removing legacy Pages Router patterns, and migrating all 87 API routes.

---

## Issues Found (6 categories, ~100+ files affected)

### Phase 1: Fix Breaking Shared Components (7 files)

These components import `next/router` and use an `isAppRouter` conditional hack that violates React's rules of hooks (`const router = isAppRouter ? null : useRouter()`). Remove all Pages Router support.

| File | Issue | Fix |
|------|-------|-----|
| `src/components/layout/header.tsx:19,50,177-179` | `useRouter` from `next/router`, conditional hook call, `router.events` | Remove `next/router` import, remove `isAppRouter` prop, use `usePathname()` from `next/navigation` for route change detection |
| `src/components/layout/layout.tsx:4,16-17` | `useRouter` for `router.pathname` | **Delete entire file** - replaced by `src/components/layout/AppLayout.tsx` |
| `src/components/ui/MobileFloatingCTA.tsx:5,24` | `useRouter` conditional hook call | Remove `next/router`, remove `isAppRouter` prop, use `usePathname()` |
| `src/components/admin/AdminLayout.tsx:4` | `useRouter` from `next/router` | Replace with `usePathname()` from `next/navigation` |
| `src/components/admin/ops/OpsLayout.tsx:4` | `useRouter` from `next/router` | Replace with `usePathname()` from `next/navigation` |
| `src/components/affiliate/AffiliateLayout.tsx:4` | `useRouter` from `next/router` | Replace with `usePathname()` from `next/navigation` |
| `src/components/seo/Breadcrumbs.tsx:7,16-17,100-101` | `useRouter` for `router.asPath` | Replace with `usePathname()` from `next/navigation` |
| `src/lib/translation-context.tsx:8,72` | Dynamic import of `next/router` | Remove the Pages Router branch, use only `next/navigation` |

For each file:
- Remove `import { useRouter } from 'next/router'`
- Remove `isAppRouter` prop from interface and usage
- Replace `router.pathname` / `router.asPath` with `usePathname()` from `next/navigation`
- Replace `router.events.on('routeChangeStart', ...)` with a `useEffect` that watches `pathname` changes
- Replace `router.push()` with `useRouter()` from `next/navigation` (different API: no `router.events`, no `router.asPath`)

### Phase 2: Replace NextSeo with Metadata API in App Router Pages (4 files)

`next-seo`'s `<NextSeo>` component renders `<head>` tags client-side, which conflicts with App Router's server-side Metadata API.

| File | Fix |
|------|-----|
| `app/try-free/page.tsx:17,92` | Replace `<NextSeo>` with `export const metadata` or `generateMetadata()` |
| `app/results/page.tsx:3,112` | Replace `<NextSeo>` with `export const metadata` or `generateMetadata()` |
| `src/components/sections/locations/createCityPage.tsx` | Replace NextSeo with metadata export in the page that uses this template |
| `src/components/sections/locations/ProvincePageTemplate.tsx` | Replace NextSeo with metadata export in the page that uses this template |
| `src/lib/seo/defaultSeoConfig.ts` | Review if still needed; may be removable after all NextSeo usage is gone |

### Phase 3: Delete Legacy Pages Router Files

| File/Directory | Reason |
|----------------|--------|
| `pages/_error.tsx` | Redundant - `app/error.tsx` and `app/not-found.tsx` already exist. Uses `getInitialProps` (Pages Router only) |
| `pages/server-sitemap.xml.js` | Uses `getServerSideProps`. Already replaced by `app/api/sitemap/route.ts` |
| `pages/blog/` | Empty (only .DS_Store) |
| `pages/learn/` | Empty (only .DS_Store) |
| `pages/locations/` | Empty (only .DS_Store) |
| `pages/admin/` | Empty (only .DS_Store) |
| `pages/retailer/` | Empty (only .DS_Store) |

### Phase 4: Upgrade app/error.tsx

The current `app/error.tsx` is bare-bones (35 lines, no Sentry, no status codes, no suggestions). Port the rich error UI from the deleted `pages/_error.tsx`:
- Add Sentry error reporting (`Sentry.captureException(error)`)
- Add suggested pages navigation
- Add contextual error messages
- Keep `'use client'` directive and `reset` button
- Use App Router's Metadata API instead of NextSeo

### Phase 5: Migrate All 87 API Routes from pages/api/ to app/api/

Convert each `pages/api/*.ts` file from:
```ts
export default async function handler(req: NextApiRequest, res: NextApiResponse) { ... }
```
To App Router route handler:
```ts
export async function GET(req: Request) { return Response.json(...) }
export async function POST(req: Request) { return Response.json(...) }
```

**Key conversion patterns:**
- `req.method === 'GET'` -> separate `GET`/`POST`/`PUT`/`DELETE` exports
- `req.body` -> `await req.json()`
- `req.query` -> `new URL(req.url).searchParams` or route params
- `res.status(200).json(data)` -> `return Response.json(data, { status: 200 })`
- `res.setHeader()` -> `return new Response(body, { headers: {...} })`
- `NextApiRequest`/`NextApiResponse` types -> `Request` / `Response`
- Dynamic routes `[id].ts` -> `[id]/route.ts`
- Catch-all `[...nextauth].ts` -> `[...nextauth]/route.ts`

**API routes to migrate (grouped by domain):**

**Auth (1 file):**
- `pages/api/auth/[...nextauth].ts` -> `app/api/auth/[...nextauth]/route.ts`

**Admin Blog (18 files):**
- `pages/api/admin/blog/posts.ts` -> `app/api/admin/blog/posts/route.ts`
- `pages/api/admin/blog/posts/[slug].ts` -> `app/api/admin/blog/posts/[slug]/route.ts`
- `pages/api/admin/blog/categories.ts` -> `app/api/admin/blog/categories/route.ts`
- `pages/api/admin/blog/categories/[id].ts` -> `app/api/admin/blog/categories/[id]/route.ts`
- `pages/api/admin/blog/tags.ts` -> `app/api/admin/blog/tags/route.ts`
- `pages/api/admin/blog/tags/[id].ts` -> `app/api/admin/blog/tags/[id]/route.ts`
- `pages/api/admin/blog/analytics.ts` -> `app/api/admin/blog/analytics/route.ts`
- `pages/api/admin/blog/analytics/[slug].ts` -> `app/api/admin/blog/analytics/[slug]/route.ts`
- `pages/api/admin/blog/analytics/export.ts` -> `app/api/admin/blog/analytics/export/route.ts`
- `pages/api/admin/blog/bulk-operations.ts` -> `app/api/admin/blog/bulk-operations/route.ts`
- `pages/api/admin/blog/generate-content.ts` -> `app/api/admin/blog/generate-content/route.ts`
- `pages/api/admin/blog/generation-history.ts` -> `app/api/admin/blog/generation-history/route.ts`
- `pages/api/admin/blog/media.ts` -> `app/api/admin/blog/media/route.ts`
- `pages/api/admin/blog/media/[id].ts` -> `app/api/admin/blog/media/[id]/route.ts`
- `pages/api/admin/blog/preview.ts` -> `app/api/admin/blog/preview/route.ts`
- `pages/api/admin/blog/seo-autofix.ts` -> `app/api/admin/blog/seo-autofix/route.ts`
- `pages/api/admin/blog/templates.ts` -> `app/api/admin/blog/templates/route.ts`
- `pages/api/admin/blog/update-sitemap.ts` -> `app/api/admin/blog/update-sitemap/route.ts`
- `pages/api/admin/blog/upload-image.ts` -> `app/api/admin/blog/upload-image/route.ts`

**Admin Affiliates (8 files):**
- `pages/api/admin/affiliates/index.ts` -> `app/api/admin/affiliates/route.ts`
- `pages/api/admin/affiliates/[id]/index.ts` -> `app/api/admin/affiliates/[id]/route.ts`
- `pages/api/admin/affiliates/[id]/status.ts` -> `app/api/admin/affiliates/[id]/status/route.ts`
- `pages/api/admin/affiliates/applications/index.ts` -> `app/api/admin/affiliates/applications/route.ts`
- `pages/api/admin/affiliates/applications/[id]/approve.ts` -> `app/api/admin/affiliates/applications/[id]/approve/route.ts`
- `pages/api/admin/affiliates/applications/[id]/reject.ts` -> `app/api/admin/affiliates/applications/[id]/reject/route.ts`
- `pages/api/admin/affiliates/payouts/index.ts` -> `app/api/admin/affiliates/payouts/route.ts`
- `pages/api/admin/affiliates/payouts/[id]/process.ts` -> `app/api/admin/affiliates/payouts/[id]/process/route.ts`
- `pages/api/admin/affiliates/stats.ts` -> `app/api/admin/affiliates/stats/route.ts`

**Admin Ops (8 files):**
- `pages/api/admin/ops/stats.ts` -> `app/api/admin/ops/stats/route.ts`
- `pages/api/admin/ops/leads/index.ts` -> `app/api/admin/ops/leads/route.ts`
- `pages/api/admin/ops/leads/[id].ts` -> `app/api/admin/ops/leads/[id]/route.ts`
- `pages/api/admin/ops/leads/bulk.ts` -> `app/api/admin/ops/leads/bulk/route.ts`
- `pages/api/admin/ops/leads/import.ts` -> `app/api/admin/ops/leads/import/route.ts`
- `pages/api/admin/ops/leads/sync.ts` -> `app/api/admin/ops/leads/sync/route.ts`
- `pages/api/admin/ops/retailers/[id]/approve.ts` -> `app/api/admin/ops/retailers/[id]/approve/route.ts`
- `pages/api/admin/ops/retailers/[id]/reject.ts` -> `app/api/admin/ops/retailers/[id]/reject/route.ts`
- `pages/api/admin/ops/social/post.ts` -> `app/api/admin/ops/social/post/route.ts`
- `pages/api/admin/ops/social/submissions.ts` -> `app/api/admin/ops/social/submissions/route.ts`

**Admin Analytics & AB Tests (4 files):**
- `pages/api/admin/analytics/customers.ts` -> `app/api/admin/analytics/customers/route.ts`
- `pages/api/admin/analytics/utm.ts` -> `app/api/admin/analytics/utm/route.ts`
- `pages/api/admin/ab-tests/index.ts` -> `app/api/admin/ab-tests/route.ts`
- `pages/api/admin/ab-tests/[slug].ts` -> `app/api/admin/ab-tests/[slug]/route.ts`

**Affiliate (10 files):**
- `pages/api/affiliate/signup.ts` -> `app/api/affiliate/signup/route.ts`
- `pages/api/affiliate/activate.ts` -> `app/api/affiliate/activate/route.ts`
- `pages/api/affiliate/track.ts` -> `app/api/affiliate/track/route.ts`
- `pages/api/affiliate/dashboard/stats.ts` -> `app/api/affiliate/dashboard/stats/route.ts`
- `pages/api/affiliate/dashboard/clicks.ts` -> `app/api/affiliate/dashboard/clicks/route.ts`
- `pages/api/affiliate/dashboard/conversions.ts` -> `app/api/affiliate/dashboard/conversions/route.ts`
- `pages/api/affiliate/dashboard/links.ts` -> `app/api/affiliate/dashboard/links/route.ts`
- `pages/api/affiliate/dashboard/payouts.ts` -> `app/api/affiliate/dashboard/payouts/route.ts`
- `pages/api/affiliate/dashboard/payout-request.ts` -> `app/api/affiliate/dashboard/payout-request/route.ts`
- `pages/api/affiliate/dashboard/settings.ts` -> `app/api/affiliate/dashboard/settings/route.ts`
- `pages/api/affiliate/dashboard/chart-data.ts` -> `app/api/affiliate/dashboard/chart-data/route.ts`

**Referrals (7 files):**
- `pages/api/referrals/track.ts` -> `app/api/referrals/track/route.ts`
- `pages/api/referrals/generate.ts` -> `app/api/referrals/generate/route.ts`
- `pages/api/referrals/apply.ts` -> `app/api/referrals/apply/route.ts`
- `pages/api/referrals/stats.ts` -> `app/api/referrals/stats/route.ts`
- `pages/api/referrals/validate.ts` -> `app/api/referrals/validate/route.ts`
- `pages/api/referrals/validate/[code].ts` -> `app/api/referrals/validate/[code]/route.ts`
- `pages/api/referrals/dashboard/[userId].ts` -> `app/api/referrals/dashboard/[userId]/route.ts`

**Cron (7 files):**
- `pages/api/cron/daily-tasks.ts` -> `app/api/cron/daily-tasks/route.ts`
- `pages/api/cron/abandoned-cart.ts` -> `app/api/cron/abandoned-cart/route.ts`
- `pages/api/cron/cleanup-old-revisions.ts` -> `app/api/cron/cleanup-old-revisions/route.ts`
- `pages/api/cron/generate-blog-post.ts` -> `app/api/cron/generate-blog-post/route.ts`
- `pages/api/cron/low-stock-alerts.ts` -> `app/api/cron/low-stock-alerts/route.ts`
- `pages/api/cron/publish-scheduled-posts.ts` -> `app/api/cron/publish-scheduled-posts/route.ts`
- `pages/api/cron/review-requests.ts` -> `app/api/cron/review-requests/route.ts`
- `pages/api/cron/subscription-reminders.ts` -> `app/api/cron/subscription-reminders/route.ts`

**Webhooks (2 files):**
- `pages/api/webhooks/stripe.ts` -> `app/api/webhooks/stripe/route.ts`
- `pages/api/webhooks/generate-blog-post.ts` -> `app/api/webhooks/generate-blog-post/route.ts`

**Other standalone routes (12 files):**
- `pages/api/blog-posts.ts` -> `app/api/blog-posts/route.ts`
- `pages/api/free-giveaway.ts` -> `app/api/free-giveaway/route.ts`
- `pages/api/analytics/referrals.ts` -> `app/api/analytics/referrals/route.ts`
- `pages/api/ab-test/track.ts` -> `app/api/ab-test/track/route.ts`
- `pages/api/email/send-thank-you-email.ts` -> `app/api/email/send-thank-you-email/route.ts`
- `pages/api/edge/prefetch-checkout.ts` -> `app/api/edge/prefetch-checkout/route.ts`
- `pages/api/health/storage.ts` -> `app/api/health/storage/route.ts`
- `pages/api/retailer/login.ts` -> `app/api/retailer/login/route.ts`
- `pages/api/retailer/register.ts` -> `app/api/retailer/register/route.ts`
- `pages/api/seo/link-suggestions.ts` -> `app/api/seo/link-suggestions/route.ts`
- `pages/api/seo/stats.ts` -> `app/api/seo/stats/route.ts`
- `pages/api/seo/validate.ts` -> `app/api/seo/validate/route.ts`
- `pages/api/tracking/tiktok.ts` -> `app/api/tracking/tiktok/route.ts`
- `pages/api/upsell/send-email.ts` -> `app/api/upsell/send-email/route.ts`
- `pages/api/sentry-example-api.ts` -> `app/api/sentry-example-api/route.ts`
- `pages/api/zendesk/create-ticket.ts` -> `app/api/zendesk/create-ticket/route.ts`

**Note:** Some app/api/ routes already exist (checkout, contact, contact-b2b, contact-retailer, csrf-token, leads/city, orders, robots, sitemap, subscribe). These won't be overwritten - only check for conflicts.

### Phase 6: Cleanup & Documentation Updates

1. **Delete the entire `pages/` directory** after all routes are migrated
2. **Update `CLAUDE.md`:**
   - Change "Next.js 16 (Pages Router)" to "Next.js 16 (App Router)"
   - Update project structure table (remove `pages/` references, add `app/` details)
   - Update code patterns section (remove `getServerSideProps` examples, add App Router patterns)
   - Update hydration safety section (replace `GetServerSideProps` pattern with App Router `redirect()`)
   - Remove `pages/_app.tsx` reference in Currency System section
   - Update API route examples to App Router pattern
3. **Remove `next-seo` from `package.json`** if no remaining usage after Phase 2
4. **Uncomment i18n middleware in `proxy.ts`** (lines 70-123 are commented out) or verify it's intentionally disabled
5. **Run validation:** `pnpm lint && pnpm check-types && pnpm build`

---

## Execution Order

1. **Phase 1** first (fix breaking shared components) - this unblocks the rest
2. **Phase 2** (NextSeo -> Metadata API) - fixes SEO in app/ pages
3. **Phase 3** (delete legacy pages files) - cleanup
4. **Phase 4** (upgrade error page) - preserve the good UX from _error.tsx
5. **Phase 5** (migrate 87 API routes) - largest effort, batch by domain
6. **Phase 6** (cleanup & docs) - final polish
7. **Validate** with `pnpm lint && pnpm check-types && pnpm build`
