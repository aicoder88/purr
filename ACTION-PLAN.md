# SEO Action Plan

Target: https://www.purrify.ca/

Status: In Progress

## Completed In This Pass

1. Removed sampled commercial `FAQPage` JSON-LD.
   Landed on: homepage schema generator, trial-size product page, blog article template, and retailer page.
   Result: keeps Product, Article, Organization, and Breadcrumb markup while dropping unsupported commercial FAQ markup.

2. Tightened metadata on audited weak templates.
   Landed on: blog article metadata generation and About page metadata.
   Result: descriptions are now normalized at the template level instead of drifting by page.

3. Fixed homepage informative-image alt coverage in core sections.
   Landed on: hero-video logo treatment and the Why Purrify card grid.
   Result: informative homepage images no longer default to empty alt text in those sections.

4. Added stronger crawl paths to underlinked commercial/supporting pages.
   Landed on: footer links for `/case-studies/` and `/viral/`.
   Result: two previously weakly linked URLs now receive persistent sitewide internal links.

## Immediate Priority

1. Finish the sitewide `FAQPage` cleanup.
   Impact: Removes unsupported or low-value schema from remaining commercial and mixed-intent templates.
   Remaining scope:
   `app/contact/ContactPageClient.tsx`
   `app/referral/page.tsx`
   `app/support/shipping/page.tsx`
   `app/support/subscription/page.tsx`
   `app/[locale]/blog/tag/[slug]/page.tsx`
   `app/[locale]/blog/category/[slug]/page.tsx`
   `src/hooks/useEnhancedSEO.ts`
   `src/components/seo/RelatedQuestions.tsx`
   Decision rule: keep `FAQPage` only on dedicated FAQ/help content where the page’s primary purpose is answering questions, not selling or routing traffic.

2. Repair the rest of the weak-link set.
   Impact: Improves crawl priority and ranking support for blog, B2B, case-study, affiliate, and support content.
   Remaining scope:
   add footer or hub links for `/b2b/sell-sheet/` and `/pos/`
   add contextual links from retailer, reviews, B2B, and support hubs to affiliate/signup/comparison pages flagged by the crawl
   extend “related content” modules from blog posts into solution and commercial pages where intent matches

3. Finish the homepage and shared-component image alt sweep.
   Impact: Improves accessibility and image-search context on the highest-authority URL.
   Remaining scope:
   confirm any remaining homepage empty-alt assets are truly decorative
   audit shared components that can appear on the homepage, especially logo/video/loading states and card-based image modules

## Quick Wins

1. Normalize metadata ranges by template.
   Scope: Keep titles near 30-60 characters and descriptions near 120-160 characters.
   Remaining scope:
   run the same normalization pattern across category, tag, support, solutions, and location templates
   add a sitemap-based metadata QA script into the publishing workflow

2. Reduce avoidable redirect chains.
   Scope: Review `/buy/purrify-12g` and social/profile links that currently bounce through 2 hops.

3. Add anchor context to icon/logo links where appropriate.
   Scope: Internal logo links and icon-only navigation should expose meaningful accessible names.

## Strategic Improvements

1. Build an internal-linking model by content cluster.
   Structure: blog → learn/solutions → product → retailer/B2B/support.
   Goal: Every strategic URL should receive multiple contextual internal links from relevant cluster pages.

2. Add sitemap-wide metadata QA to publishing workflows.
   Structure: run automated title/description linting across the XML sitemap before new pages ship.

3. Validate location-page uniqueness before expanding beyond the current footprint.
   Current state: 23 location pages, below the 30-page warning threshold.
   Goal: Preserve unique local content and avoid doorway-page patterns if more locations are added.

4. Deepen French template QA.
   Goal: Confirm that metadata, schema, and internal-link modules are as strong on `fr` pages as they are on English templates.

## Suggested Order

1. Remove the remaining commercial/mixed-intent `FAQPage` sources.
2. Add the next wave of internal links for `/pos/`, `/b2b/sell-sheet/`, affiliate, and support assets.
3. Run the remaining homepage/shared-component alt audit.
4. Normalize metadata across category, tag, support, and location templates.
5. Rerun schema, crawl, and metadata validation across the sitemap.
6. Rerun CWV and screenshot validation once a Node/browser-capable environment is available.

## Validation Checklist

- Rerun schema validation after removing the remaining commercial `FAQPage` sources.
- Rerun internal-link crawl and confirm the weak-link count drops materially from the current 25 flagged URLs.
- Recheck homepage images and confirm informative assets no longer ship with empty alt attributes.
- Rerun metadata checks on article, about, category, support, and location templates after normalization.
- Rerun PageSpeed with an API key or Lighthouse to collect mobile LCP, INP, and CLS.
- Capture desktop and mobile screenshots once browser automation is working again.
