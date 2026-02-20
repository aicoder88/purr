# Vercel WAF Rollout for Edge Request Reduction

This document defines the firewall configuration used with the code changes that reduced public-session traffic and narrowed proxy scope.

## Goals (7-day window)

- Reduce total Edge Requests by at least 30%.
- Reduce `/api/auth/session` requests by at least 80%.
- Reduce `meta-externalagent` volume by at least 70%.
- Preserve crawl access for `googlebot`, `bingbot`, `applebot`, and `ahrefsbot`.

## Baseline Snapshot (Before Enforcing Rules)

Capture these from Vercel Usage/Analytics before changing firewall enforcement:

- Requests by route:
  - `/api/auth/session`
  - `/404`
  - `/`
  - `/[locale]`
- Requests by bot/user-agent:
  - `meta-externalagent`
  - `vercel-screenshot-bot`
  - `gpt-actions`
  - `chatgpt-user`
  - `amazonbot`
  - `googlebot`, `bingbot`, `applebot`, `ahrefsbot`

## Firewall Rules (Balanced Policy)

Apply these in Vercel Firewall:

1. Block low-value high-volume agents:
   - `meta-externalagent`
   - `vercel-screenshot-bot`
   - `gpt-actions`
2. Rate-limit (do not block outright):
   - `chatgpt-user`
   - `amazonbot`
3. Geo block:
   - Block country `SG`.
4. Keep indexing/search bots allowed:
   - `googlebot`
   - `bingbot`
   - `applebot`
   - `ahrefsbot`
5. Ensure these remain publicly reachable:
   - `/robots.txt`
   - `/sitemap.xml`

## Rollout Steps

1. Configure rules in monitor/rate-limit mode for 24 hours.
2. Review request/error deltas and crawl behavior.
3. Move block rules to enforce mode.
4. Re-check 24h and 7d metrics against baseline.

## Validation Checklist

- Blocked agents return denied responses.
- Allowed bots still receive successful responses on indexable pages.
- `/robots.txt` and `/sitemap.xml` remain accessible.
- Admin authentication flow is unaffected.

## Rollback

If SEO or legit traffic regresses:

1. Disable the newest WAF rule first.
2. Keep rate-limit rules while disabling hard blocks.
3. Re-compare route and bot metrics against baseline snapshot.
