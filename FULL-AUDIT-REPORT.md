# SEO Full Audit Report

Target: https://www.purrify.ca/

Scope: Full-site audit with homepage analysis, sitemap sampling, internal-link crawl, and representative page samples (`/`, `/products/trial-size/`, `/about/our-story/`, `/blog/best-cat-litter-deodorizers-2026/`)

Business type detected: E-commerce / DTC retail with strong educational content and retail-location coverage

Overall rating: Good

Overall SEO health score: 76/100

Score confidence: Medium-Low

## Environment Limitations

- `pagespeed.py` was rate-limited by the Google PageSpeed API, so Core Web Vitals could not be confirmed in this run.
- Playwright browser launch failed, so visual/mobile verification was not completed.
- The audit is evidence-backed, but performance and rendered-layout conclusions should be treated as incomplete until CWV and screenshots are rerun.

## Audit Summary

Top 3 issues:
- Warning: Sampled commercial templates use `FAQPage` schema, which is generally not eligible for commercial rich results.
- Warning: Internal-link distribution is uneven; a 21-page crawl surfaced 25 URLs with one or fewer incoming internal links.
- Warning: Homepage image accessibility and metadata QA still have template-level gaps.

Top 3 opportunities:
- Strong crawl/indexation baseline: correct canonicals, working sitemap, valid homepage hreflang, and excellent security headers.
- Strong AI-search readiness: `llms.txt`, `llms-full.txt`, and explicit AI crawler directives are already live.
- Strong topical coverage: 255 sitemap URLs with meaningful clusters in blog, learn, products, locations, and French content.

## Category Scores

| Category | Score | Notes |
| --- | --- | --- |
| Technical SEO | 86/100 | Strong robots, sitemap, canonical, hreflang, HTTPS, and headers; minor redirect-chain cleanup remains. |
| Content Quality | 78/100 | Good topical depth and E-E-A-T support pages; readability and template QA can improve. |
| On-Page SEO | 72/100 | Titles/H1s are generally solid, but internal-link equity and snippet consistency need work. |
| Schema / Structured Data | 64/100 | Rich Product and Article markup exists, but FAQ schema is misapplied on sampled commercial templates. |
| Performance (CWV) | Insufficient data | PageSpeed was rate-limited; no reliable LCP/INP/CLS measurements were collected. |
| Image Optimization | 78/100 | Formats are modern and dimensions exist on some assets, but several homepage images still have empty alt text. |
| AI Search Readiness | 95/100 | Excellent `llms.txt` and AI crawler management for a retail brand. |

## Findings Table

| Area | Severity | Confidence | Finding | Evidence | Fix |
| --- | --- | --- | --- | --- | --- |
| Structured Data | Warning | Confirmed | Commercial templates are using `FAQPage` schema on sampled homepage, product, and article URLs. | `FAQPage` blocks were present in parsed schema for `/`, `/products/trial-size/`, and `/blog/best-cat-litter-deodorizers-2026/`. | Remove `FAQPage` JSON-LD from commercial templates and keep the visible FAQ content in HTML while preserving Product and Article schema. |
| Internal Linking | Warning | Confirmed | Multiple pages have weak internal-link support. | `internal_links.py` crawled 21 pages, found 87 unique URLs, and flagged 25 pages with one or fewer incoming internal links. | Add contextual links from hubs, related articles, product pages, and support pages to underlinked URLs. |
| Images | Warning | Confirmed | The homepage ships informative images with empty alt attributes. | A BeautifulSoup check found 7 of 46 homepage images with `alt=""`, including `ammonia-science.webp` and several marketing images. | Add descriptive alt text to informative images; reserve empty alt text for clearly decorative media only. |
| Metadata QA | Warning | Confirmed | Meta descriptions are inconsistent across templates. | The sampled article meta description is 170 characters; the About page meta description is 106 characters. | Add metadata linting across sitemap URLs and normalize template-level title/description ranges. |
| Redirect Hygiene | Info | Confirmed | Some links use multi-hop redirect chains. | `broken_links.py` found 3 chains over one hop, including `/buy/purrify-12g` routing to Stripe. | Reduce avoidable internal redirects and use cleaner first-party pre-checkout paths where possible. |
| Technical SEO | Pass | Confirmed | Crawl, indexation, and internationalization signals are strong. | `robots.txt` returned 200 with sitemap discovery; homepage canonical and hreflang aligned; `security_headers.py` scored 100/100. | Preserve the current technical baseline. |
| AI Search Readiness | Pass | Confirmed | AI-crawler and LLM-readability setup is strong. | `llms.txt` and `llms-full.txt` both returned 200; AI bots are explicitly managed in `robots.txt`. | Maintain and extend this setup as content expands. |
| Performance | Info | Hypothesis | Core Web Vitals were not measurable in this run. | PageSpeed was rate-limited and Playwright failed to launch. | Rerun PageSpeed with an API key and validate mobile rendering/CWV separately. |

## Detailed Findings

### 1. Structured Data

**Finding:** Commercial templates are using `FAQPage` schema on sampled core URLs.

**Evidence:** Parsed schema from the homepage, trial-size product page, and a comparison article all included `FAQPage` JSON-LD alongside valid Product or Article data.

**Impact:** For a commercial retail site, FAQ rich results are generally not available, so this markup creates maintenance overhead without likely SERP upside.

**Fix:** Remove `FAQPage` JSON-LD from commercial templates. Keep the visible FAQ blocks in HTML and retain only eligible schema such as Product, Offer, MerchantReturnPolicy, Article, Organization, and BreadcrumbList where relevant.

### 2. Internal Linking and Crawl Equity

**Finding:** A meaningful slice of the site is underlinked in the sampled crawl.

**Evidence:** `internal_links.py` crawled 21 pages and found 25 URLs with one or fewer incoming links, including blog posts, `/case-studies`, `/b2b/sell-sheet`, `/pos`, and affiliate/signup content.

**Impact:** Weak internal linking lowers discovery priority, weakens relevance signals, and makes important non-homepage URLs less likely to accumulate authority.

**Fix:** Build internal-link modules from blog posts to solution pages, from solution pages to product pages, and from retailer/B2B hubs to supporting assets. Prioritize pages that are commercial or high-intent but currently have only one internal mention.

### 3. Image Accessibility and Image SEO

**Finding:** Homepage image alt coverage is incomplete.

**Evidence:** 7 of 46 homepage images were missing alt text in source, including science and marketing assets that appear descriptive rather than decorative.

**Impact:** This weakens accessibility, image-search understanding, and contextual relevance around key visual sections.

**Fix:** Run a homepage image audit and add descriptive alt text to informative visuals. Leave `alt=""` only on assets that are purely decorative and redundant with nearby copy.

### 4. Metadata Consistency

**Finding:** Metadata quality varies by page template.

**Evidence:** The homepage and product page are well tuned at 147-148 characters for the description, but the article sample is 170 characters and the About page is only 106 characters.

**Impact:** Snippet truncation and underspecified descriptions reduce CTR control and suggest inconsistent editorial QA.

**Fix:** Add a metadata QA pass across the sitemap and tune each template family separately: articles, about pages, product pages, solution pages, and location pages.

### 5. Strengths Worth Preserving

**Finding:** The site already has several above-average SEO foundations.

**Evidence:** `robots.txt` and `sitemap.xml` are healthy; homepage hreflang passed; security headers scored 100/100; `llms.txt` and `llms-full.txt` are present; the sampled article includes author, publish date, editorial-policy links, and supporting topical clusters.

**Impact:** These are real competitive advantages, especially for multilingual discovery and AI-search readiness.

**Fix:** Preserve the current technical and AI-search posture while fixing template-level weaknesses instead of redesigning the whole stack.

## Unknowns and Follow-ups

- CWV remains unverified. Rerun PageSpeed or Lighthouse to confirm mobile LCP, INP, and CLS.
- Visual/mobile rendering remains unverified because Playwright could not launch a browser session in this environment.
- The site has 23 location pages, which is below the 30-page warning threshold, but those templates should still be spot-checked for uniqueness before expanding further.
- French pages were discovered in sitemap and hreflang, but French template parity was not deeply sampled in this audit.

## Evidence Collected

- `robots_checker.py`: homepage robots returned 200 and exposed one sitemap.
- Sitemap sample: 255 URLs discovered, heavily concentrated in `fr`, `blog`, `locations`, and `learn`.
- `security_headers.py`: 100/100 with HSTS, CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, and Permissions-Policy present.
- `redirect_checker.py`: homepage had no redirect hops.
- `broken_links.py`: 113 checked links, 0 broken, 34 redirected, 3 redirect chains over one hop.
- `hreflang_checker.py`: homepage hreflang passed with `en-CA`, `fr-CA`, and `x-default`.
- `llms_txt_checker.py`: `llms.txt` and `llms-full.txt` were found with a quality score of 100/100.
- `parse_html.py` samples: homepage, trial-size product page, About page, and a comparison article.
- `readability.py`: homepage readability was difficult (`Flesch 43.9`, FKGL `12.5`), acceptable for an educated audience but worth simplifying in dense blocks.
