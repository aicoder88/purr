# SEO Playbook: Canadian City Domination

## Mission & KPIs
- Become the top organic result for "cat litter smell", "cat litter odor", and "cat litter odour" plus every major Canadian city before national B2C launch.
- Win featured snippets and local packs for odor-neutralizing queries in English and French.
- Hit a 12% click-through rate from location SERPs, 4% conversion rate to purchase on city pages, and grow organic sessions +20% month over month during rollout.
- Track success through Google Search Console (city + keyword segmentation), GA4 ecommerce conversion, and rank trackers scoped to the target query set.

## Keyword Universe & Topical Mapping
- **Core head terms**: cat litter smell removal, cat litter odor eliminator, cat litter odour neutralizer, remove cat litter smell, best cat litter for smell, stop cat litter smell fast.
- **Synonym & intent matrix**: cover smell, odor, odour, stink, scent, freshener, deodorizer; align with intents (problem identification, product search, DIY vs professional solutions, subscription).
- **Local modifiers**: {city}, {city + province}, "Canada", neighborhood clusters (e.g., "Toronto condo", "Calgary basement", "Montreal appartement"), weather-driven queries ("winter windows closed", "humid summer"), and retailer modifiers ("PetSmart", "Global Pet Foods").
- **Supporting content pillars**: apartment & condo living, multi-cat households, hypoallergenic solutions, compostable litter, winter ventilation, litter box placement, pet health tie-ins.
- Build keyword lists per province in a shared sheet, update quarterly, and pipe targets into translation JSON to drive on-page copy variation.

## Technical SEO Foundations (Site-Wide)
- Confirm global metadata coverage via `pages/_app.tsx` and ensure `NextSeo` default config includes canonical URLs, OpenGraph, and alternate hreflang for future locales.
- Expand `next-sitemap.config.js` to auto-include every city and province route, regenerate sitemap nightly, and ping Google & Bing via deployment hook.
- Enforce clean URL structure (`/locations/{city-slug}`) and add canonical tags when duplicate content (province rollups vs city detail) is unavoidable.
- Optimize Core Web Vitals: audit `src/components/sections` for heavy images, lazy-load non-critical components, ship compressed hero assets in `public/`.
- Harden structured data: extend `LocationSchema` to output `LocalBusiness`, `Product`, `FAQPage`, and `BreadcrumbList` schemas; align with bilingual content requirements.
- Implement server-side redirects for legacy or missing city pages and log crawl errors; surface through a custom report in `scripts/`.

## City Landing Page Framework
- Consolidate city data in `src/lib/locations/cities.ts` (name, province, population, climate, housing mix, pet ownership stats, scent pain points) and render via a shared component in `src/components/sections/locations` to keep copy scalable.
- Standardize hero H1 pattern: "{City} Cat Litter Odor Eliminator"; include synonyms in H2 ("Stop cat litter smell/odour in {City}").
- Expand dynamic copy blocks: climate-specific advice, apartment vs detached home guidance, retailer callouts, testimonials, FAQ, review snippets, and CTA sections referencing free shipping and trial.
- Bake in bilingual readiness: feed localized strings through `useTranslation` and populate `src/translations/{en,fr}.json` with city-specific keys for smell/odor/odour variants.
- Tag all imagery with descriptive `alt` text containing local modifiers (e.g., "Toronto condo cat litter odor free").
- Strengthen internal linking: keep `CityInterlinkSection` but add province hubs (`pages/locations/province/{province}.tsx`) that cluster and surface the top metro areas, seasonal guides, and nearest retailers.

## Supporting Content & Funnel Alignment
- Launch a "Fresh Home" knowledge center in `pages/learn/` with guides mapped to each pain point; embed structured FAQ modules and downloadable checklists.
- Produce blog series answering "how to get rid of cat litter smell in {city}" leveraging weather, housing, and lifestyle cues; publish 2 per week leading into launch.
- Develop video transcripts and shorts demonstrating Purrify use in small condos, basements, and multi-cat homes; host on YouTube and embed.
- Encourage user-generated reviews and scent challenge stories; create a submission form and highlight winners on location pages.
- Build comparison pages vs top national competitors (`Global Pet Foods`, `PetSmart`, `Pet Valu`) with retailer-specific keywords and affiliate opportunities.

## Off-Page & Local Authority
- Spin up or optimize Google Business Profiles for each major metro; post weekly updates targeting odor keywords and link to respective city pages.
- Earn local citations: partner with municipal pet shelters, vet clinics, and cat cafes; secure directory listings with consistent NAP referencing a virtual HQ + city-specific service area.
- Run seasonal PR campaigns ("Winter Odour Relief Tour", "Summer Litter Stink Audit") to earn regional news coverage and backlinks.
- Collaborate with Canadian pet influencers, bilingual bloggers, and Reddit communities; offer exclusive odor challenge trials and capture testimonials.
- Encourage retailers to publish co-marketing landing pages linking back with "cat litter odor" anchors.

## Conversion, UX, & Trust Signals
- Mirror top-of-funnel search intent with mid-page CTAs: free odor audit quiz, sample kit, subscribe & save for multi-cat households.
- Surface trust badges (Canadian-made, carbon-neutral shipping) and third-party reviews above the fold.
- Add interactive calculator (odor score vs time) using data per city; embed schema-friendly outputs.
- Implement exit intent offers tailored to search intent (e.g., "Still smelling litter? Try the 7-day freshness plan").

## Analytics, Testing, & Automation
- Configure GA4 custom dimensions for `locationSlug` and `odorIntentKeyword` to segment performance of city pages.
- Instrument `src/lib/analytics` to send events for CTA clicks, quiz starts, store locator interactions, and FAQ expansions.
- Establish rank tracking via API or manual import script inside `scripts/track-keywords.ts` covering head terms + city combos.
- Automate sitemap diff checks and lighthouse audits per release; store results in `reports/`.
- Set up Search Console regex filters for smell/odor/odour queries across English and French.

## Implementation Roadmap
- **Phase 0 (Week 0-1)**: Audit existing city pages, inventory missing provinces/territories, document content gaps, create keyword sheet, finalize data schema for `cities.ts`.
- **Phase 1 (Week 2-5)**: Ship shared city template, migrate top 25 metro pages, enrich metadata, deploy structured data enhancements, regenerate sitemap, and benchmark rankings.
- **Phase 2 (Week 6-10)**: Roll out programmatic copy to remaining cities, launch province hubs, release supporting guides, begin citation outreach.
- **Phase 3 (Week 11-16)**: Activate PR + influencer campaigns, publish video assets, integrate UGC, iterate based on analytics.
- **Phase 4 (Ongoing)**: Quarterly keyword refresh, content updates for seasonality, monitor competitors, and expand to French-first experiences.

## Ownership & Next Actions
- Assign SEO lead to partner with engineering on template refactor; content team to own keyword sheet and copy modules; partnerships lead to secure citations.
- Immediately schedule technical backlog grooming session, prep data ingestion for city attributes, and brief creative on asset needs.
- After plan sign-off, create corresponding tickets in the project tracker and align on success measurement cadence (weekly SEO standup, monthly executive rollup).
