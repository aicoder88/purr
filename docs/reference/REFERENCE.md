# Technical Reference Guide

This document consolidates key technical references and implementation guides for the Purrify e-commerce platform.

## Table of Contents

1. [Dark Mode Standards](#dark-mode-standards)
2. [SEO Playbook](#seo-playbook)
3. [Structured Data (JSON-LD)](#structured-data-json-ld)
4. [Site Structure](#site-structure)
5. [Canadian Cities List](#canadian-cities-list)

---

## Dark Mode Standards

### Color Scheme Reference

#### Typography Hierarchy
```css
/* Primary Headers (H1-H2) */
text-gray-900 dark:text-gray-50

/* Secondary Headers (H3-H4) */
text-gray-800 dark:text-gray-100

/* Body Text */
text-gray-700 dark:text-gray-200

/* Secondary Text */
text-gray-600 dark:text-gray-300

/* Metadata/Labels */
text-gray-500 dark:text-gray-400
```

#### Background System
```css
/* Primary Backgrounds */
bg-white dark:bg-gray-900

/* Secondary Backgrounds */
bg-gray-50 dark:bg-gray-800

/* Card/Component Backgrounds */
bg-gray-100 dark:bg-gray-700

/* Overlay Backgrounds */
backdrop-blur-lg bg-white/95 dark:bg-gray-900/95
```

#### Color-Coded Elements
```css
/* Success/Green */
text-green-700 dark:text-green-300
bg-green-500/20 dark:bg-green-500/30

/* Info/Blue */
text-blue-700 dark:text-blue-300
bg-blue-500/20 dark:bg-blue-500/30

/* Warning/Orange */
text-orange-700 dark:text-orange-300
bg-orange-500/20 dark:bg-orange-500/30

/* Error/Red */
text-red-700 dark:text-red-300
bg-red-500/20 dark:bg-red-500/30

/* Purple/Accent */
text-purple-700 dark:text-purple-300
bg-purple-500/20 dark:bg-purple-500/30
```

### Validation & Testing

**WCAG AA Compliance Required:**
- All text elements must have minimum 4.5:1 contrast ratio
- Use `npm run validate-dark-mode` to verify
- Build fails without 0 violations

**Common Patterns to Replicate:**
- ✅ `text-gray-900 dark:text-gray-50` - Headers
- ✅ `text-gray-800 dark:text-gray-100` - Good pattern
- ✅ `text-gray-700 dark:text-gray-200` - Body text
- ❌ `text-gray-300 dark:text-gray-400` - Too low contrast (avoid!)
- ❌ `text-white` without `dark:text-gray-100` - Incomplete

### Key Improvements

1. **Background System**: Enhanced backdrop-blur with proper opacity (bg-white/95 dark:bg-gray-800/95)
2. **Typography Hierarchy**: Systematic color mapping for all text sizes and weights
3. **Contrast Fixes**: Eliminated all poor contrast issues
4. **Border Enhancement**: All borders include dark variants
5. **Color-Coded Elements**: Improved contrast for themed sections

---

## SEO Playbook: Canadian City Domination

### Mission & KPIs

**Primary Goals:**
- Become the top organic result for "cat litter smell", "cat litter odor", and "cat litter odour" plus every major Canadian city
- Win featured snippets and local packs for odor-neutralizing queries in English and French
- Hit 12% click-through rate from location SERPs, 4% conversion rate on city pages
- Grow organic sessions +20% month-over-month during rollout

**Tracking Metrics:**
- Google Search Console (city + keyword segmentation)
- GA4 ecommerce conversion
- Rank trackers for target query set

### Keyword Universe

**Core Head Terms:**
- cat litter smell removal
- cat litter odor eliminator
- cat litter odour neutralizer
- remove cat litter smell
- best cat litter for smell
- stop cat litter smell fast

**Synonym & Intent Matrix:**
- Smell, odor, odour, stink, scent, freshener, deodorizer
- Intent alignment: problem identification, product search, DIY vs professional, subscription

**Local Modifiers:**
- {city}, {city + province}, "Canada"
- Neighborhood clusters (e.g., "Toronto condo", "Calgary basement")
- Weather-driven queries ("winter windows closed", "humid summer")
- Retailer modifiers ("PetSmart", "Global Pet Foods")

**Supporting Content Pillars:**
- Apartment & condo living
- Multi-cat households
- Hypoallergenic solutions
- Compostable litter
- Winter ventilation
- Litter box placement
- Pet health tie-ins

### Technical SEO Foundations

**Global Metadata:**
- Confirm coverage via `pages/_app.tsx` with `NextSeo` defaults
- Ensure canonical URLs and OpenGraph setup
- Include alternate hreflang for future locales

**Sitemap & Crawlability:**
- `next-sitemap.config.js` auto-includes every city and province route
- Regenerate sitemap nightly
- Ping Google & Bing via deployment hook

**URL Structure:**
- Clean format: `/locations/{city-slug}`
- Canonical tags for duplicate content (province rollups vs city detail)

**Core Web Vitals:**
- Audit `src/components/sections` for heavy images
- Lazy-load non-critical components
- Ship compressed hero assets in `public/`

**Structured Data:**
- Extend `LocationSchema` to output `LocalBusiness`, `Product`, `FAQPage`, and `BreadcrumbList`
- Align with bilingual content requirements
- Validate against schema.org standards

**Error Handling:**
- Server-side redirects for legacy/missing city pages
- Log crawl errors and surface through custom reports in `scripts/`

### City Landing Page Framework

**Data Structure:**
- Consolidate city data in `src/lib/locations/cities.ts`
- Include: name, province, population, climate, housing mix, pet ownership stats, scent pain points
- Render via shared component in `src/components/sections/locations` for scalability

**Content Standardization:**

H1 Pattern:
```
"{City} Cat Litter Odor Eliminator"
```

H2 Pattern:
```
"Stop cat litter smell/odour in {City}"
```

**Dynamic Copy Blocks:**
- Climate-specific advice
- Apartment vs detached home guidance
- Retailer callouts
- Testimonials
- FAQ
- Review snippets
- CTA sections (free shipping, trial)

**Bilingual Readiness:**
- Feed localized strings through `useTranslation`
- Populate `src/translations/{en,fr}.json` with city-specific keys
- Support smell/odor/odour variants

**Image Optimization:**
- Descriptive `alt` text with local modifiers (e.g., "Toronto condo cat litter odor free")

**Internal Linking:**
- Keep `CityInterlinkSection` but add province hubs
- Create `pages/locations/province/{province}.tsx`
- Cluster top metro areas, seasonal guides, nearest retailers

### Supporting Content & Funnel Alignment

**Knowledge Center:**
- Launch "Fresh Home" guides in `pages/learn/`
- Map to each pain point with structured FAQ modules
- Include downloadable checklists

**Blog Strategy:**
- Series answering "how to get rid of cat litter smell in {city}"
- Leverage weather, housing, lifestyle cues
- Target 2 posts per week leading into launch

**Multimedia:**
- Video transcripts for small condos, basements, multi-cat homes
- YouTube hosting with embeds

**User-Generated Content:**
- Scent challenge submission form
- Highlight winners on location pages

**Comparison Pages:**
- vs top national competitors (Global Pet Foods, PetSmart, Pet Valu)
- Retailer-specific keywords and affiliate opportunities

### Off-Page & Local Authority

**Google Business Profiles:**
- Optimize for each major metro
- Weekly posts targeting odor keywords
- Link to respective city pages

**Local Citations:**
- Partner with municipal pet shelters, vet clinics, cat cafes
- Secure directory listings with consistent NAP
- Reference virtual HQ + city-specific service area

**PR Campaigns:**
- "Winter Odour Relief Tour", "Summer Litter Stink Audit"
- Earn regional news coverage and backlinks

**Influencer & Community:**
- Collaborate with Canadian pet influencers, bilingual bloggers
- Reddit community engagement
- Exclusive odor challenge trials

**Retailer Co-Marketing:**
- Encourage retailers to publish landing pages
- Link back with "cat litter odor" anchors

### Conversion & UX Signals

**Mid-Funnel CTAs:**
- Free odor audit quiz
- Sample kit offers
- Subscribe & save (multi-cat households)

**Trust Signals:**
- Canadian-made badges
- Carbon-neutral shipping
- Third-party reviews above fold

**Interactive Elements:**
- Odor score calculator
- Schema-friendly outputs
- Exit intent offers tailored to search intent

### Analytics & Testing

**GA4 Custom Dimensions:**
- `locationSlug`
- `odorIntentKeyword`

**Event Tracking:**
- CTA clicks
- Quiz starts
- Store locator interactions
- FAQ expansions

**Rank Tracking:**
- API or manual import script in `scripts/track-keywords.ts`
- Cover head terms + city combos

**Automation:**
- Sitemap diff checks per release
- Lighthouse audits per release
- Store results in `reports/`

**Search Console:**
- Regex filters for smell/odor/odour queries (EN & FR)

### Implementation Roadmap

**Phase 0 (Week 0-1):**
- Audit existing city pages
- Inventory missing provinces/territories
- Document content gaps
- Create keyword sheet
- Finalize data schema for `cities.ts`

**Phase 1 (Week 2-5):**
- Ship shared city template
- Migrate top 25 metro pages
- Enrich metadata
- Deploy structured data enhancements
- Regenerate sitemap
- Benchmark rankings

**Phase 2 (Week 6-10):**
- Roll out programmatic copy to remaining cities
- Launch province hubs
- Release supporting guides
- Begin citation outreach

**Phase 3 (Week 11-16):**
- Activate PR + influencer campaigns
- Publish video assets
- Integrate UGC
- Iterate based on analytics

**Phase 4 (Ongoing):**
- Quarterly keyword refresh
- Content updates for seasonality
- Monitor competitors
- Expand French-first experiences

### Ownership & Next Actions

**Team Assignments:**
- SEO lead: Partner with engineering on template refactor
- Content team: Keyword sheet and copy modules
- Partnerships lead: Citation securing

**Immediate Priorities:**
1. Schedule technical backlog grooming
2. Prep data ingestion for city attributes
3. Brief creative on asset needs

**Success Measurement:**
- Weekly SEO standup
- Monthly executive rollup

---

## Structured Data (JSON-LD)

### Overview

Comprehensive JSON-LD implementation for maximum search visibility and rich snippets:

- Homepage: organization, website, product catalog schemas
- Product pages: product, offer, review schemas
- Learn pages: article schemas and FAQ data
- Location pages: local business schemas for 7 Canadian cities
- Multilingual support: English (en), French (fr), Chinese (zh)

### Core Components

#### Enhanced SEO Utilities (`src/lib/seo-utils.ts`)

**Schema Generators:**
- `generateFAQSchema(locale)` - FAQ page structured data
- `generateOfferSchema(product, locale)` - Product offers with shipping
- `generateLocalBusinessSchema(cityName, province, locale)` - Local business data
- `generateReviewSchema(productId, locale)` - Customer review schemas
- `generateHomepageSchema(locale)` - Complete homepage schema graph
- `generateProductPageSchema(productId, locale)` - Product page schemas
- `generateArticlePageSchema(title, description, path, locale, options)` - Article/blog schemas
- `generateLocationPageSchema(cityName, province, locale)` - Location page schemas
- `generateJSONLD(schema)` - Utility to generate script tags

#### JSON-LD Schema Component (`src/components/seo/json-ld-schema.tsx`)

```typescript
// Usage Examples:
<HomepageSchema locale='en' />
<ProductSchema productId='purrify-50g' locale='en' />
<ArticleSchema title="..." description="..." path="/learn/..." />
<LocationSchema cityName='Montreal' province='Quebec' />
```

### Implementation by Page Type

#### Homepage Schema (`pages/index.tsx`)

**Implemented Schemas:**
- Organization schema with complete business information
- Website schema with search functionality
- Product catalog schema with all available products
- FAQ schema for homepage FAQ section

**Key Features:**
- Complete business profile with contact information
- Product listings with pricing and availability
- Comprehensive FAQ data
- Social media profiles
- Geo-location data

#### Product Pages

**Pages Implemented:**
- `/products/trial-size` - Purrify 12g ($4.76)
- `/products/standard` - Purrify 50g ($19.99)
- `/products/family-pack` - Purrify 120g ($29.99)
- `/products/compare` - Product comparison page

**Schemas per Product Page:**
- **Product Schema**: Brand, SKU, MPN, GTIN13, physical properties, usage, audience targeting, multi-language support
- **Offer Schema**: CAD pricing, shipping details, delivery times, return policy, stock availability
- **Review Schema**: 5-star ratings, review text, author information, publication dates
- **AggregateRating Schema**: 4.9/5 average rating, 127+ reviews
- **Breadcrumb Schema**: Navigation structure

#### Learn/Article Pages

**Pages Implemented:**
- `/learn/activated-carbon-benefits` - Educational article
- `/learn/how-it-works` - Science explanation
- Additional learn pages as needed

**Article Schema Features:**
- Complete metadata (title, description, URL)
- Author and publisher information
- Publication and modification dates
- Word count and reading time
- Categories and keywords
- Educational content classification
- FAQ integration

#### Location Pages

**Cities Implemented:**
- Montreal, Quebec
- Toronto, Ontario
- Vancouver, British Columbia
- Calgary, Alberta
- Ottawa, Ontario
- Hamilton, Ontario
- Quebec City, Quebec

**Local Business Schema per City:**
- Organization and LocalBusiness types
- City-specific geo-coordinates
- Local address and contact information
- Service area definitions
- Operating hours
- Local product offerings
- Customer service contact points
- Multi-language availability

### Rich Snippet Optimizations

**Product Rich Snippets:**
- Star ratings in search results
- Price and availability information
- Product images and descriptions
- Shipping and return policy details

**FAQ Rich Snippets:**
- Expandable Q&A in search results
- Localized question and answer pairs
- Multiple FAQ entries per page

**Local Business Rich Snippets:**
- Business hours and location
- Contact information
- Service area coverage
- Customer rating information

**Article Rich Snippets:**
- Publication dates and author info
- Reading time estimates
- Article categorization
- Related topic connections

### Multilingual Implementation

**Language Support:**
- **English (en)** - Default language, purrify.ca
- **French (fr)** - fr.purrify.ca subdomain
- **Chinese (zh)** - zh.purrify.ca subdomain

**Localized Content:**
- All schema text content translated
- Currency formatting (CAD for all locales)
- Date formatting per locale standards
- Appropriate language tags (en-CA, fr-CA, zh-CN)

### SEO Performance Benefits

**Expected Improvements:**
1. **Rich Snippets Display**: Product prices/ratings in SERP, FAQ expansions, local business panels
2. **Enhanced Click-Through Rates**: Visual elements attract more clicks, detailed information builds trust
3. **Voice Search Optimization**: Structured FAQ data, local business info for "near me" searches
4. **Knowledge Graph Integration**: Business entity recognition, product catalog understanding, local presence

### Schema Validation

All schemas follow schema.org standards and validate against:
- Google's Rich Results Test
- Schema.org validator
- Structured Data Testing Tool

### Performance Considerations

- Schemas generated server-side for better performance
- Minimal client-side JavaScript for schema generation
- Efficient caching of locale-specific schemas

### Maintenance & Updates

**Regular Updates Needed:**
1. **Product Information**: Pricing updates, availability changes, new products
2. **Review Data**: Fresh customer testimonials, updated rating averages
3. **Business Information**: Contact details, operating hours, service area expansions

**Monitoring:**
- Google Search Console for rich snippet performance
- Schema validation tools for error detection
- Search result appearance monitoring

---

## Site Structure

### Core Pages
- `/` - Homepage
- `/404` - 404 error page
- `/offline` - Offline page
- `/server-sitemap.xml` - XML sitemap

### Marketing & Content
- `/about/our-story` - Company story
- `/b2b` - B2B portal
- `/case-studies` - Case studies
- `/customers/case-studies` - Customer testimonials
- `/customers/testimonials` - Testimonials
- `/retailers` - Retailer program
- `/reviews` - Product reviews

### Products
- `/products/compare` - Product comparison
- `/products/family-pack` - Purrify 120g
- `/products/standard` - Purrify 50g
- `/products/trial-size` - Purrify 12g (trial)

### Checkout & Customer Tools
- `/checkout` - Stripe checkout page
- `/customer/portal` - Customer account portal
- `/customer/referrals` - Referral program
- `/refer/[code]` - Referral link handler

### Learn Hub
- `/learn/activated-carbon-benefits` - Carbon benefits
- `/learn/cat-litter-guide` - Litter guide
- `/learn/faq` - FAQ section
- `/learn/how-it-works` - How Purrify works
- `/learn/how-to-use-deodorizer` - Usage guide
- `/learn/purrify-vs-arm-hammer` - Comparison
- `/learn/safety` - Safety information
- `/learn/science` - Science explanation
- `/learn/using-deodorizers-with-kittens` - Kitten safety

### Blog
- `/blog` - Blog landing page
- `/blog/[slug]` - Dynamic blog posts
- Full post listing available in blog section

### Solutions Library
- `/solutions/ammonia-smell-cat-litter` - Ammonia solutions
- `/solutions/apartment-cat-smell-solution` - Apartment solutions
- `/solutions/litter-box-smell-elimination` - Elimination guide
- `/solutions/multiple-cats-odor-control` - Multi-cat odor
- `/solutions/natural-cat-litter-additive` - Natural solutions
- `/solutions/senior-cat-litter-solutions` - Senior cat care

### City Landing Pages
- `/locations/calgary` - Calgary, Alberta
- `/locations/hamilton` - Hamilton, Ontario
- `/locations/montreal` - Montreal, Quebec
- `/locations/ottawa` - Ottawa, Ontario
- `/locations/quebec-city` - Quebec City, Quebec
- `/locations/toronto` - Toronto, Ontario
- `/locations/vancouver` - Vancouver, British Columbia

### Policy & Support
- `/privacy` - Privacy policy alias
- `/privacy-policy` - Privacy policy
- `/support/contact` - Contact support
- `/support/shipping` - Shipping information
- `/terms` - Terms alias
- `/tos` - Terms of service

### Administrative (Protected/Utility)
- `/admin/referral-analytics` - Referral analytics dashboard

### Multilingual Routes

All core pages available under:
- `/fr/` - French language routes
- `/zh/` - Chinese language routes

---

## Canadian Cities List

### Alberta
Banff, Brooks, Calgary, Edmonton, Fort McMurray, Grande Prairie, Jasper, Lake Louise, Lethbridge, Medicine Hat, Red Deer, Saint Albert

### British Columbia
Barkerville, Burnaby, Campbell River, Chilliwack, Courtenay, Cranbrook, Dawson Creek, Delta, Esquimalt, Fort Saint James, Fort Saint John, Hope, Kamloops, Kelowna, Kimberley, Kitimat, Langley, Nanaimo, Nelson, New Westminster, North Vancouver, Oak Bay, Penticton, Powell River, Prince George, Prince Rupert, Quesnel, Revelstoke, Rossland, Trail, Vancouver, Vernon, Victoria, West Vancouver, White Rock

### Manitoba
Brandon, Churchill, Dauphin, Flin Flon, Kildonan, Saint Boniface, Swan River, Thompson, Winnipeg, York Factory

### New Brunswick
Bathurst, Caraquet, Dalhousie, Fredericton, Miramichi, Moncton, Saint John

### Newfoundland and Labrador
Argentia, Bonavista, Channel-Port aux Basques, Corner Brook, Ferryland, Gander, Grand Falls–Windsor, Happy Valley–Goose Bay, Harbour Grace, Labrador City, Placentia, Saint Anthony, St. John's, Wabana

### Northwest Territories
Fort Smith, Hay River, Inuvik, Tuktoyaktuk, Yellowknife

### Nova Scotia
Baddeck, Digby, Glace Bay, Halifax, Liverpool, Louisbourg, Lunenburg, Pictou, Port Hawkesbury, Springhill, Sydney, Yarmouth

### Nunavut
Iqaluit

### Ontario
Bancroft, Barrie, Belleville, Brampton, Brantford, Brockville, Burlington, Cambridge, Chatham, Chatham-Kent, Cornwall, Elliot Lake, Etobicoke, Fort Erie, Fort Frances, Gananoque, Guelph, Hamilton, Iroquois Falls, Kapuskasing, Kawartha Lakes, Kenora, Kingston, Kirkland Lake, Kitchener, Laurentian Hills, London, Midland, Mississauga, Moose Factory, Moosonee, Niagara Falls, Niagara-on-the-Lake, North Bay, North York, Oakville, Orillia, Oshawa, Ottawa, Parry Sound, Perth, Peterborough, Picton, Port Colborne, Saint Catharines, Saint Thomas, Sarnia-Clearwater, Sault Sainte Marie, Scarborough, Simcoe, Stratford, Sudbury, Temiskaming Shores, Thorold, Thunder Bay, Timmins, Toronto, Trenton, Waterloo, Welland, West Nipissing, Windsor, Woodstock, York

### Prince Edward Island
Borden, Cavendish, Charlottetown, Souris, Summerside

### Quebec
Asbestos, Baie-Comeau, Beloeil, Cap-de-la-Madeleine, Chambly, Charlesbourg, Châteauguay, Chibougamau, Côte-Saint-Luc, Dorval, Gaspé, Gatineau, Granby, Havre-Saint-Pierre, Hull, Jonquière, Kuujjuaq, La Salle, La Tuque, Lachine, Laval, Lévis, Longueuil, Magog, Matane, Montreal, Montréal-Nord, Percé, Port-Cartier, Quebec, Rimouski, Rouyn-Noranda, Saguenay, Saint-Eustache, Saint-Hubert, Sainte-Anne-de-Beaupré, Sainte-Foy, Sainte-Thérèse, Sept-Îles, Sherbrooke, Sorel-Tracy, Trois-Rivières, Val-d'Or, Waskaganish

### Saskatchewan
Batoche, Cumberland House, Estevan, Flin Flon, Moose Jaw, Prince Albert, Regina, Saskatoon, Uranium City

### Yukon
(No cities currently listed)
