# Technical SEO CI Migration

As of March 8, 2026, CI includes explicit technical SEO gates in addition to the generic lint, typecheck, and unit-test jobs.

Current SEO CI coverage:

- `pnpm prebuild:seo`
  - SEO compliance validation
  - image validation
  - canonical validation
  - App Router metadata contract validation
  - supported-locale SEO surface validation
  - sitemap and indexability validation
  - rendered SEO validation
- `pnpm test:e2e`
  - includes `e2e/seo`, which now also checks rendered canonical, `og:url`, robots, and JSON-LD output

Host policy:

- The canonical default host for SEO tooling is `https://www.purrify.ca`.
- Environment overrides are still supported through `NEXT_PUBLIC_SITE_URL` or `SITE_URL`.
- Mixed non-`www` script defaults should not be reintroduced.

Examples:

```bash
NEXT_PUBLIC_SITE_URL=https://staging.example.com pnpm prebuild:seo
SITE_URL=https://staging.example.com pnpm seo:validate:sitemap
```
