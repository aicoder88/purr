# SEO Follow-ups (SEMrush)

This TODO tracks remaining items from the latest SEMrush crawl after implementing fixes (hreflang, canonical, structured data, sitemaps, and llms.txt). Items marked [infra] are DNS/hosting configurations; [content] require copy/IA updates.

- [ ] DNS: Ensure `fr.purrify.ca` and `zh.purrify.ca` resolve correctly for all paths [infra]
  - Action: Verify A/ALIAS or CNAME in DNS and Vercel domain mappings for both subdomains.

- [ ] Re-crawl validation in SEMrush (full project) [ops]
  - Action: Trigger new crawl to confirm reductions for: hreflang conflicts, incorrect hreflang, multiple canonicals, temp redirects, invalid structured data.

- [ ] Slow page load: 1 page flagged [perf]
  - Likely heavy content page. Action: capture core web vitals on production and identify specific offenders (LCP/CLS/TTI). Optimize image sizes or defer non-critical sections further if needed.

- [ ] Low text-to-HTML ratio: 31 pages [content]
  - Action: add short, unique intro/outro copy to thin sections; ensure dynamic/utility pages are noindex where appropriate.

- [ ] Title too long: 2 pages [content]
  - Action: shorten titles to ~50–60 chars without truncation; confirm in each page’s Head/NextSeo.

- [ ] Missing/short titles: 8 pages [content]
  - Action: audit all routes with `NextSeo`/`Head` to ensure explicit `title`. (Most are covered; re-check after crawl.)

- [ ] Low word count: 2 pages [content]
  - Action: add supporting text (100–200 words) or set `noindex` if intentionally thin.

- [ ] Internal linking depth: 14 pages with one incoming link; 10 need >3 clicks to reach [content/IA]
  - Action: add Related Articles to Learn pages; add contextual links in product and support pages; ensure footer nav links include key leaf pages.

## Retailers Page & Menu Fixes

- [x] Retailers: After form submit, change confirmation copy to "we will get back to you within 72 hours".
- [x] Retailers: Update any approval/confirmation timing from 24 hours to 72 hours (e.g., "Approval 24hrs" badges/metrics).
- [x] Retailers: Change CTA copy to "Join 17 established Montreal and surrounding-area retailers already earning high margins with Purrify." (was "Join 17 established retailers...").
- [x] Header menu: Keep dropdowns open until user clicks outside or chooses another menu item; do not auto-dismiss too quickly.
- [x] Header menu: Ensure only one dropdown opens at a time and dropdowns don’t overlap.

- [x] Retailers: Reduce excessive vertical spacing between sections by removing wrapper padding on the page and tightening section paddings (hero pb-16; wholesale/contact py-16).

## Email Delivery

- [x] Retailers application email: Ensure full, labeled form data is included in the email body (both plain-text and HTML), and add common template keys (`name`, `email`, `message`, `subject`, `date`) for compatibility.
