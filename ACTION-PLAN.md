# SEO Action Plan

Date: 2026-03-12
Site: https://www.purrify.ca

## Immediate

1. Deploy the `robots.txt` update from [`public/robots.txt`](public/robots.txt).
2. After deploy, fetch `https://www.purrify.ca/robots.txt` and confirm these user agents are present:
   `Applebot-Extended`, `anthropic-ai`, `FacebookBot`, `Amazonbot`.

## Quick Wins

1. Re-run Core Web Vitals collection with a Google PageSpeed API key for:
   `https://www.purrify.ca` mobile and desktop.
2. Save the resulting LCP, INP, CLS, FCP, and TTFB values into the next SEO audit artifact.
3. Re-run `pnpm seo:validate:rendered` after deployment if any metadata or routing changes ship alongside this fix.

## Strategic

1. Re-test rich results after live review aggregates exist, not just the zero-review fallback state.
2. Compare live CrUX/Search Console data against the rendered and sitemap validators so technical passes are paired with user-performance evidence.
3. Keep the following validation commands in the release checklist:
   `pnpm seo:validate:strict`
   `pnpm seo:validate:sitemap-indexability`
   `pnpm seo:validate:rendered`
   `pnpm seo:validate:inline-head`

## Current Status

- Confirmed fixed in repo: AI crawler management gap in `robots.txt`.
- Confirmed healthy: sitemap indexability, rendered metadata, images, locale SEO surface, social meta, `llms.txt`, security headers.
- Still unconfirmed: live CWV metrics, live non-zero review rich results.
