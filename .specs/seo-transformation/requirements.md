# SEO Transformation Requirements

## User Stories

### Epic 1: Technical SEO Foundation
**As a** site owner
**I want** all pages to be properly indexed and crawlable
**So that** Google can discover and rank all my content

**As a** site visitor
**I want** all links to work correctly
**So that** I don't encounter broken pages or dead ends

### Epic 2: Search Result Optimization
**As a** potential customer searching Google
**I want** to see compelling, complete page titles and descriptions
**So that** I know what the page offers and want to click it

**As a** potential customer
**I want** to see rich results with ratings, FAQs, and product details
**So that** I can make informed decisions from the search results

### Epic 3: Content Discovery
**As a** potential customer
**I want** to find content that answers my specific questions
**So that** I can solve my cat litter odor problems

**As a** site visitor
**I want** to easily navigate to related content
**So that** I can learn more without searching

### Epic 4: Performance & Conversion
**As a** site visitor
**I want** pages to load quickly
**So that** I don't bounce due to slow performance

**As a** potential customer
**I want** to see social proof and detailed product information
**So that** I can trust the product and make a purchase

---

## Acceptance Criteria (EARS Notation)

### AC-1: Site Crawlability & Indexing

**AC-1.1** WHEN a user visits a URL that no longer exists THE SYSTEM SHALL redirect them to a relevant active page with HTTP 301 status

**AC-1.2** THE SYSTEM SHALL include all indexable pages in the sitemap.xml file

**AC-1.3** WHEN Google crawls the sitemap THE SYSTEM SHALL return only canonical URLs with HTTP 200 status

**AC-1.4** THE SYSTEM SHALL exclude all noindex pages from sitemap.xml

**AC-1.5** THE SYSTEM SHALL exclude all redirected URLs from sitemap.xml

**AC-1.6** WHEN a page is rendered THE SYSTEM SHALL include at least 3 internal links to related content

**AC-1.7** THE SYSTEM SHALL ensure every indexable page has at least 1 incoming internal link

**AC-1.8** THE SYSTEM SHALL ensure important pages have 5-10 incoming internal links

### AC-2: Meta Tag Optimization

**AC-2.1** THE SYSTEM SHALL ensure all page titles are between 50-60 characters

**AC-2.2** THE SYSTEM SHALL ensure all meta descriptions are between 140-155 characters

**AC-2.3** THE SYSTEM SHALL include keyword-rich, benefit-driven meta descriptions on all pages

**AC-2.4** WHEN a page title exceeds 60 characters THE SYSTEM SHALL remove the " | Purrify" suffix to fit within limits

**AC-2.5** THE SYSTEM SHALL front-load keywords in page titles (most important words first)

### AC-3: Social Sharing Optimization

**AC-3.1** THE SYSTEM SHALL include Open Graph meta tags on all indexable pages

**AC-3.2** THE SYSTEM SHALL include Twitter Card meta tags on all indexable pages

**AC-3.3** WHEN generating Open Graph tags THE SYSTEM SHALL ensure og:url matches the canonical URL

**AC-3.4** THE SYSTEM SHALL include valid og:image URLs that return HTTP 200 status

**AC-3.5** THE SYSTEM SHALL specify image dimensions in og:image:width and og:image:height

### AC-4: Structured Data Validation

**AC-4.1** WHEN generating Product schema THE SYSTEM SHALL include all required fields: name, image, description, offers, price, priceCurrency, availability

**AC-4.2** WHEN generating Article schema THE SYSTEM SHALL include all required fields: headline, image, datePublished, dateModified, author

**AC-4.3** WHEN generating FAQ schema THE SYSTEM SHALL include at least 2 questions with answers

**AC-4.4** THE SYSTEM SHALL pass Google Rich Results Test with 0 errors for all pages with structured data

**AC-4.5** THE SYSTEM SHALL pass Schema.org validator with 0 errors for all structured data

**AC-4.6** WHEN a product has reviews THE SYSTEM SHALL include aggregateRating with reviewCount in Product schema

**AC-4.7** THE SYSTEM SHALL use ISO 8601 format for all date fields in structured data

**AC-4.8** WHEN generating Organization schema THE SYSTEM SHALL include valid logo URL with dimensions

### AC-5: Heading Structure

**AC-5.1** THE SYSTEM SHALL include exactly one H1 tag per page

**AC-5.2** THE SYSTEM SHALL ensure the H1 tag contains the primary target keyword

**AC-5.3** THE SYSTEM SHALL ensure all pages have a non-empty H1 tag

**AC-5.4** THE SYSTEM SHALL use heading hierarchy (H1 → H2 → H3) without skipping levels

### AC-6: Content Optimization

**AC-6.1** WHEN creating content for long-tail keywords THE SYSTEM SHALL include the target keyword 8-10 times throughout the content

**AC-6.2** WHEN creating FAQ sections THE SYSTEM SHALL structure answers in 40-60 word paragraphs for featured snippet optimization

**AC-6.3** WHEN creating comparison content THE SYSTEM SHALL include comparison tables with clear data

**AC-6.4** THE SYSTEM SHALL include "Related Articles" sections with 3-5 contextual internal links

**AC-6.5** WHEN creating hub pages THE SYSTEM SHALL link to all relevant spoke pages

**AC-6.6** WHEN creating spoke pages THE SYSTEM SHALL link back to the hub page

### AC-7: Performance Optimization

**AC-7.1** THE SYSTEM SHALL ensure all pages achieve Lighthouse performance score of 90+ on mobile

**AC-7.2** WHEN rendering images THE SYSTEM SHALL use lazy loading for below-the-fold images

**AC-7.3** THE SYSTEM SHALL serve images in WebP format with appropriate fallbacks

**AC-7.4** THE SYSTEM SHALL ensure all images return HTTP 200 status (no broken images)

**AC-7.5** THE SYSTEM SHALL implement resource hints (preload, prefetch) for critical assets

**AC-7.6** THE SYSTEM SHALL achieve Core Web Vitals thresholds: LCP < 2.5s, FID < 100ms, CLS < 0.1

### AC-8: Redirect & Canonical Management

**AC-8.1** WHEN a canonical tag is used THE SYSTEM SHALL ensure it points to the final destination URL (not a redirect)

**AC-8.2** THE SYSTEM SHALL avoid redirect chains (maximum 1 redirect hop)

**AC-8.3** WHEN implementing hreflang tags THE SYSTEM SHALL ensure they point to active, non-redirected pages

### AC-9: Internationalization

**AC-9.1** WHEN a page has localized versions THE SYSTEM SHALL include hreflang tags for all language variants

**AC-9.2** THE SYSTEM SHALL ensure hreflang URLs return HTTP 200 status

**AC-9.3** WHEN generating localized meta tags THE SYSTEM SHALL use appropriate language-specific content

### AC-10: Monitoring & Validation

**AC-10.1** WHEN deployment completes THE SYSTEM SHALL validate all pages pass Google Rich Results Test

**AC-10.2** THE SYSTEM SHALL ensure Ahrefs site audit shows under 20 total issues

**AC-10.3** THE SYSTEM SHALL ensure Google Search Console shows 0 coverage errors

**AC-10.4** THE SYSTEM SHALL ensure sitemap.xml validates in Google Search Console

---

## Edge Cases & Constraints

### Edge Cases
1. **Localized content with missing translations**: If a translated meta description doesn't exist, fall back to English version
2. **Products without reviews**: Product schema should omit aggregateRating if no reviews exist
3. **Dynamic content**: Ensure dynamically generated pages (e.g., city pages) are included in sitemap
4. **Image optimization**: Handle both static images in `/public/` and dynamic images from CMS
5. **Redirect conflicts**: When multiple redirects exist for the same path, prioritize the most recent

### Constraints
1. **Character limits**: Titles max 60 chars, descriptions max 155 chars (strict)
2. **Schema validation**: Must pass both Google Rich Results Test AND Schema.org validator
3. **Performance budget**: All pages must achieve 90+ Lighthouse mobile score
4. **No fabrication**: Never create fake contact info, social handles, or file paths (per CLAUDE.md)
5. **Existing patterns**: Follow existing SEO patterns in `src/lib/seo-utils.ts` and `src/lib/seo/defaultSeoConfig.ts`
6. **Currency handling**: Ensure structured data uses correct currency (USD or CAD) based on geo-detection

### Non-Functional Requirements
1. **Scalability**: Sitemap generation must handle 500+ pages efficiently
2. **Maintainability**: All SEO logic centralized in `src/lib/seo-utils.ts`
3. **Testability**: All meta tag generation must be unit testable
4. **Monitoring**: Integration with Google Search Console API for automated issue detection
5. **Documentation**: All schema generation functions must include JSDoc comments

---

## Success Metrics

### Primary KPIs (90 days post-implementation)
- Organic clicks: 50-100+ per day (from current 1.8/day)
- Average SERP position: < 10.0 for top 20 keywords (from current 16.7)
- Click-through rate: 3-5%+ (from current 1.05%)
- Google Search Console coverage errors: 0 (from current unknown)
- Ahrefs site audit issues: < 20 (from current 63)

### Secondary KPIs
- Pages in sitemap: 100% of indexable pages (currently missing 126 pages)
- Rich results validation: 0 errors (from current 138 errors)
- Schema.org validation: 0 errors (from current 32 errors)
- Broken images: 0 (from current 24)
- Pages with 404s: 0 (from current 18)
- Orphan pages: 0 (from current 10)

### Business Impact Metrics
- Organic revenue: $3,750+/month by month 6 (conservative projection)
- Conversion rate: 2.5-3% (from estimated 2%)
- Average order value: $50-60

---

## Out of Scope (Phase 1)

The following are explicitly OUT OF SCOPE for the initial implementation:

1. **Backlink building campaigns** (Phase 9 in plan) - requires manual outreach
2. **Content creation for new articles** - requires separate content writing phase
3. **A/B testing different meta descriptions** - requires experimentation framework
4. **International expansion beyond current languages** - requires translation resources
5. **Paid search optimization** - this is organic SEO only
6. **Social media optimization beyond OG tags** - separate channel strategy
7. **Email marketing integration** - separate marketing automation
8. **Affiliate program setup** - separate business development
9. **Video SEO** - no video content currently

---

## Dependencies

### External Dependencies
1. **Google Search Console access** - required for validation
2. **Ahrefs account** - required for audit validation (already exists)
3. **Google Rich Results Test API** - required for structured data validation
4. **Schema.org validator** - required for schema validation

### Internal Dependencies
1. **Existing SEO utilities** - `src/lib/seo-utils.ts` must remain backward compatible
2. **Translation system** - `src/translations/*.ts` must be updated for new meta content
3. **Prisma schema** - must support any new data requirements
4. **Image optimization pipeline** - must handle WebP conversion
5. **Build system** - sitemap generation must run during build

### Technical Dependencies
1. **Next.js 16** - static generation for SEO pages
2. **TypeScript** - strict type checking for SEO data
3. **Tailwind CSS** - styling for new content sections
4. **pnpm** - package management (per CLAUDE.md)

---

## Risk Assessment

### High Risk
1. **Breaking existing schema** - Changes to structured data could break rich results
   - Mitigation: Comprehensive testing with Google Rich Results Test before deployment
2. **Redirect loops** - Incorrect redirects could create infinite loops
   - Mitigation: Automated redirect chain detection in pre-commit validation
3. **Performance regression** - New optimizations could slow down build times
   - Mitigation: Performance benchmarking before/after changes

### Medium Risk
1. **Translation gaps** - Optimized English meta descriptions may not have French/Chinese equivalents
   - Mitigation: Generate all translations before deployment
2. **Schema validation changes** - Google may change validation rules
   - Mitigation: Regular monitoring and quick response process
3. **Sitemap size** - Large sitemaps (500+ URLs) may have generation issues
   - Mitigation: Split into multiple sitemap files if needed

### Low Risk
1. **Image optimization failures** - Some images may fail WebP conversion
   - Mitigation: Fallback to original format
2. **Content length variations** - Some meta descriptions may be edge cases for length
   - Mitigation: Automated truncation with ellipsis

---

## Approval Checklist

Before approving this requirements document:

- [ ] All user stories clearly state business value
- [ ] All acceptance criteria use EARS notation
- [ ] No ambiguous language (should, might, could)
- [ ] Each criterion is testable and measurable
- [ ] Edge cases are documented and addressed
- [ ] Success metrics are specific and time-bound
- [ ] Dependencies are identified and feasible
- [ ] Risks are assessed with mitigation strategies
- [ ] Out-of-scope items are clearly defined

---

**Ready for approval?** Reply `y` to proceed to Phase 2: Architecture Design, or `refine [feedback]` to iterate on requirements.
