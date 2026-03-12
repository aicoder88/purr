# Full SEO Audit Report

Date: 2026-03-12
Scope: full-site
Site: https://www.purrify.ca
Score band: Strong
Estimated score: 93/100
Score confidence: Medium

## Audit Summary

Purrify's technical SEO baseline is strong. The repo-level validators passed for metadata, canonicals, sitemap indexability, rendered head output, locale surface area, image SEO, and review schema fallback handling. Live-site checks also confirmed healthy `llms.txt`, security headers, social metadata, and a clean homepage redirect path.

The main confirmed gap was AI crawler management in production `robots.txt`, where several crawlers were inheriting `User-agent: *` rules instead of being explicitly managed. That has been fixed in the repo and only requires deployment to clear the live warning. Core Web Vitals remain unconfirmed because Google PageSpeed Insights rate-limited the audit run.

Top 3 issues:
- Production `robots.txt` did not explicitly manage `Applebot-Extended`, `anthropic-ai`, `FacebookBot`, and `Amazonbot`.
- Core Web Vitals data could not be collected during this run because PageSpeed Insights returned rate limits.
- Review schema validation passed only against the zero-review fallback state, not live populated review data.

Top 3 opportunities:
- Deploy the `robots.txt` crawler-management update.
- Capture mobile and desktop CWV with a PageSpeed API key or Search Console/CrUX data.
- Re-validate product rich results after live review aggregates exist.

## Evidence Snapshot

- `pnpm seo:validate:strict`: passed with 78 indexable pages, 0 errors, 0 warnings.
- `pnpm seo:validate:sitemap-indexability`: passed with 237 sitemap URLs checked, 0 redirects, 0 noindex URLs, 0 canonical mismatches.
- `pnpm seo:validate:rendered`: passed with 237 pages checked, 0 errors, 0 warnings.
- `pnpm seo:validate:inline-head`: passed with 149 App Router page files checked and 0 violations.
- `pnpm seo:validate:supported-locales`: passed for supported locales `en` and `fr`.
- `pnpm seo:validate:reviews`: passed for all tested product/locale combinations, with warnings that only zero-review fallback states were available.
- Live `robots.txt`: HTTP 200, 1 sitemap, explicit allows for major AI crawlers, 4 unmanaged AI crawlers detected before the repo fix.
- Live `llms.txt`: HTTP 200, quality score 100/100, `llms-full.txt` present.
- Live security headers: score 100/100.
- Live social meta: score 100/100.
- Live redirect check: homepage resolved directly with 0 hops.

## Findings Table

| Area | Severity | Confidence | Finding | Evidence | Fix |
| --- | --- | --- | --- | --- | --- |
| Crawlability | Warning | Confirmed | Production `robots.txt` does not explicitly manage four AI/search crawlers. | Live `robots_checker.py` reported unmanaged crawlers: `Applebot-Extended`, `anthropic-ai`, `FacebookBot`, `Amazonbot`. | Deploy the updated [`public/robots.txt`](public/robots.txt) so these crawlers are explicitly allowed. |
| Indexability | Pass | Confirmed | Sitemap URLs are indexable and canonically aligned. | `pnpm seo:validate:sitemap-indexability` checked 237 URLs with 0 redirects, 0 missing routes, 0 noindex URLs, 0 canonical mismatches. | No change needed. Keep this gate in CI. |
| Rendered SEO | Pass | Confirmed | Rendered metadata, canonical tags, hreflang, and JSON-LD output are clean across sitemap URLs. | `pnpm seo:validate:rendered` checked 237 pages with 0 errors and 0 warnings. | No change needed. Keep the rendered validator green before release. |
| On-page metadata | Pass | Confirmed | App Router metadata usage is consistent and avoids inline head tag drift. | `pnpm seo:validate:inline-head` scanned 149 page files with 0 violations. | No change needed. |
| Image SEO | Pass | Confirmed | Referenced images meet current runtime SEO validation rules. | `pnpm seo:validate:strict` reported 281 actionable images, 0 issues, 0 missing alt text. | No change needed. |
| AI search readiness | Pass | Confirmed | `llms.txt` and `llms-full.txt` are present and high quality. | Live `llms_txt_checker.py` returned HTTP 200 and score 100/100. | No change needed. |
| Security | Pass | Confirmed | Security headers support crawl safety and browser trust signals well. | Live `security_headers.py` returned 100/100 with HSTS, CSP, XFO, XCTO, Referrer-Policy, and Permissions-Policy present. | No change needed. |
| Rich results | Info | Confirmed | Review schema fallback is valid, but live review-populated schema has not yet been exercised. | `pnpm seo:validate:reviews` passed all 12 cases, each warning that no live aggregate review data was available. | Re-run rich results validation after live review counts populate. |
| Performance / CWV | Info | Hypothesis | Core Web Vitals could not be confirmed during this run. | `pagespeed.py` was rate-limited by the Google PSI API after retries. | Re-run with an API key or collect from Search Console/CrUX. |

## Prioritized Action Plan

1. Immediate blocker

- Deploy the updated `robots.txt` so crawler management on production matches the intended policy.

2. Quick wins

- Re-run PageSpeed Insights with an API key for both mobile and desktop to confirm LCP, INP, CLS, FCP, and TTFB.
- Add a lightweight post-deploy check that fetches live `robots.txt` and confirms the new crawler blocks are present.

3. Strategic improvements

- Validate live rich results once actual review aggregates exist and submit affected URLs through Google Rich Results Test.
- Continue using rendered sitemap validation in CI so metadata regressions are caught before deployment.
- Consider exporting periodic SEO evidence artifacts into `docs/seo/` for release-by-release comparison.

## Unknowns And Follow-ups

- Core Web Vitals are unknown for this audit run because PageSpeed Insights rate-limited the request.
- Search Console performance, coverage, and enhancement data were not part of this run.
- The review schema path with non-zero live aggregate ratings still needs verification after production data exists.

