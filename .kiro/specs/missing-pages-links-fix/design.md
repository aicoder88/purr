# Design Document

## Overview

This design addresses critical missing pages and broken links across the Purrify website by implementing province location pages, resolving the Montreal page routing issue, handling the missing partnership guide PDF, and fixing broken external retailer links. The solution leverages Next.js dynamic routing patterns already established for city pages and extends them to province-level pages.

## Architecture

### Current State Analysis

**Existing Location System:**
- City pages use dynamic routing at `/pages/locations/[citySlug].tsx`
- City data stored in `src/lib/locations/cities.ts` with `CityOdorProfile` type
- Cities link to province pages using two-letter codes (e.g., `/locations/qc`)
- Province pages do not currently exist, causing 404 errors

**Montreal Page Issue:**
- A standalone `/pages/montreal.tsx` file exists (legacy)
- Montreal is also accessible via `/locations/montreal` (dynamic routing)
- The `/montreal` route should redirect to `/locations/montreal` for consistency
- Reviews page incorrectly links to `/montreal` instead of `/locations/montreal`

**Partnership Guide:**
- B2B page references `/partnership-guide.pdf` at line 640
- File does not exist in `/public/` directory
- Should be removed and replaced with inline contact information

**External Retailer Links:**
- Need to identify and validate all external retailer links
- Broken links should be updated or removed

### Proposed Architecture

```
pages/
├── locations/
│   ├── [citySlug].tsx          # Existing - city pages
│   ├── province/
│   │   └── [provinceSlug].tsx  # New - province pages
│   └── index.tsx               # New - locations hub page
├── montreal.tsx                # Modified - redirect to /locations/montreal
└── b2b.tsx                     # Modified - remove PDF link

src/
├── lib/
│   └── locations/
│       ├── cities.ts           # Existing - city data
│       ├── provinces.ts        # New - province data and utilities
│       └── city-profile-seeds.json  # Existing
└── components/
    └── sections/
        └── locations/
            ├── createCityPage.tsx      # Existing
            └── ProvincePageTemplate.tsx # New - province page component
```

## Components and Interfaces

### 1. Province Data Structure

**File:** `src/lib/locations/provinces.ts`

```typescript
export interface ProvinceData {
  code: string;              // Two-letter code (on, qc, ab, etc.)
  name: string;              // Full name (Ontario, Quebec, etc.)
  nameFr: string;            // French name (Ontario, Québec, etc.)
  slug: string;              // URL slug (on, qc, ab, etc.)
  region: RegionTag;         // atlantic, central, prairies, west-coast, north
  population: number;        // Province population
  cities: string[];          // Array of city slugs in this province
  description: string;       // SEO description (English)
  descriptionFr: string;     // SEO description (French)
  metaKeywords: string[];    // SEO keywords
}

export const PROVINCES: Record<string, ProvinceData> = {
  on: {
    code: 'ON',
    name: 'Ontario',
    nameFr: 'Ontario',
    slug: 'on',
    region: 'central',
    population: 14826276,
    cities: ['toronto', 'ottawa', 'mississauga', 'hamilton', ...],
    description: 'Find Purrify cat litter deodorizer in Ontario...',
    descriptionFr: 'Trouvez le désodorisant pour litière Purrify en Ontario...',
    metaKeywords: ['cat litter Ontario', 'cat litter deodorizer Ontario', ...]
  },
  // ... other provinces
};

export function getProvinceBySlug(slug: string): ProvinceData | null;
export function getCitiesByProvince(provinceSlug: string): CityOdorProfile[];
export function getAllProvinces(): ProvinceData[];
```

### 2. Province Page Component

**File:** `src/components/sections/locations/ProvincePageTemplate.tsx`

```typescript
export interface ProvincePageTemplateProps {
  provinceSlug: string;
}

export function ProvincePageTemplate({ provinceSlug }: ProvincePageTemplateProps) {
  // Fetch province data and cities
  // Render province-specific content
  // Display list of cities with links
  // Include SEO metadata and structured data
}
```

**Component Structure:**
- Hero section with province name and description
- Statistics section (population, number of cities with Purrify)
- Cities grid with links to city pages
- Product information section
- Retailer information (if applicable)
- Call-to-action section
- Breadcrumb navigation

### 3. Province Dynamic Route

**File:** `pages/locations/province/[provinceSlug].tsx`

```typescript
export const getStaticPaths: GetStaticPaths = async () => {
  const provinces = getAllProvinces();
  const paths = provinces.map(province => ({
    params: { provinceSlug: province.slug }
  }));
  
  return {
    paths,
    fallback: false  // All provinces known at build time
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.provinceSlug as string;
  const province = getProvinceBySlug(slug);
  
  if (!province) {
    return { notFound: true };
  }
  
  return {
    props: { provinceSlug: slug },
    revalidate: 60 * 60 * 24  // 24 hours
  };
};
```

### 4. Montreal Redirect Handler

**File:** `pages/montreal.tsx` (modified)

```typescript
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    redirect: {
      destination: `/${locale === 'fr' ? 'fr/' : ''}locations/montreal`,
      permanent: true  // 301 redirect for SEO
    }
  };
};

export default function MontrealRedirect() {
  return null;
}
```

### 5. B2B Page Modifications

**File:** `pages/b2b.tsx`

Remove the partnership guide link section (around line 640) and replace with:

```typescript
<div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
    {locale === 'fr' ? 'Besoin de Plus d\'Information?' : 'Need More Information?'}
  </h4>
  <p className="text-gray-700 dark:text-gray-300 mb-4">
    {locale === 'fr' 
      ? 'Contactez notre équipe partenariats pour recevoir notre guide détaillé et discuter des opportunités.'
      : 'Contact our partnerships team to receive our detailed guide and discuss opportunities.'
    }
  </p>
  <div className="space-y-2">
    <a href="mailto:partners@purrify.ca" className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline">
      <Mail className="h-4 w-4" />
      partners@purrify.ca
    </a>
    <a href={CONTACT_INFO.phoneHref} className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline">
      <Phone className="h-4 w-4" />
      {CONTACT_INFO.phone}
    </a>
  </div>
</div>
```

### 6. Link Validation Utility

**File:** `src/lib/seo/link-validator.ts`

```typescript
export interface BrokenLink {
  sourceUrl: string;
  targetUrl: string;
  linkText: string;
  statusCode: number;
}

export async function validateExternalLinks(urls: string[]): Promise<BrokenLink[]>;
export async function validateInternalLinks(baseUrl: string): Promise<BrokenLink[]>;
export function generateLinkReport(brokenLinks: BrokenLink[]): string;
```

## Data Models

### Province Data

```typescript
// 10 provinces to create
const PROVINCE_SLUGS = ['on', 'qc', 'ab', 'mb', 'bc', 'ns', 'sk', 'nl', 'nb', 'pe'];

// Province metadata
interface ProvinceMetadata {
  code: string;
  name: string;
  nameFr: string;
  slug: string;
  region: 'atlantic' | 'central' | 'prairies' | 'west-coast';
  population: number;
  majorCities: string[];  // Top 5 cities by population
  description: string;
  descriptionFr: string;
}
```

### City-Province Mapping

Cities already have `provinceCode` in their data structure. We'll use this to:
1. Group cities by province
2. Generate province page city lists
3. Create breadcrumb navigation

### Structured Data Schema

**Province Page JSON-LD:**
```json
{
  "@context": "https://schema.org",
  "@type": "Place",
  "name": "Ontario",
  "address": {
    "@type": "PostalAddress",
    "addressRegion": "ON",
    "addressCountry": "CA"
  },
  "containsPlace": [
    {
      "@type": "City",
      "name": "Toronto",
      "url": "https://www.purrify.ca/locations/toronto"
    }
  ]
}
```

## Error Handling

### 404 Prevention
- All province slugs validated at build time
- Static generation ensures pages exist before deployment
- Fallback: false for province pages (no ISR needed)

### Redirect Handling
- Montreal page: 301 permanent redirect to `/locations/montreal`
- Invalid province slugs: Return 404
- Missing city data: Graceful fallback to province page

### Link Validation
- Pre-deployment script to check all internal links
- External link validation with retry logic
- Report generation for manual review

## Testing Strategy

### Unit Tests
- Province data utilities (`getProvinceBySlug`, `getCitiesByProvince`)
- City-province mapping functions
- Link validation utilities

### Integration Tests
- Province page rendering with real data
- Montreal redirect functionality
- Breadcrumb navigation between city and province pages

### E2E Tests (Playwright)
```typescript
test('Province pages are accessible', async ({ page }) => {
  const provinces = ['on', 'qc', 'ab', 'mb', 'bc', 'ns', 'sk', 'nl', 'nb', 'pe'];
  
  for (const province of provinces) {
    await page.goto(`/locations/${province}`);
    await expect(page).toHaveURL(`/locations/${province}`);
    await expect(page.locator('h1')).toBeVisible();
  }
});

test('Montreal redirects correctly', async ({ page }) => {
  await page.goto('/montreal');
  await expect(page).toHaveURL('/locations/montreal');
});

test('City pages link to province pages', async ({ page }) => {
  await page.goto('/locations/toronto');
  const provinceLink = page.locator('a[href="/locations/on"]');
  await expect(provinceLink).toBeVisible();
  await provinceLink.click();
  await expect(page).toHaveURL('/locations/on');
});

test('B2B page has no broken PDF link', async ({ page }) => {
  await page.goto('/b2b');
  const pdfLink = page.locator('a[href="/partnership-guide.pdf"]');
  await expect(pdfLink).toHaveCount(0);
});
```

### Link Validation Tests
- Script to crawl all pages and check for 404s
- Validate external retailer links return 200-299 status
- Check sitemap includes all new province pages

## SEO Considerations

### URL Structure
- Province pages: `/locations/{province-code}` (e.g., `/locations/on`)
- Consistent with existing city pattern: `/locations/{city-slug}`
- Clean, hierarchical structure for search engines

### Meta Tags
- Unique title and description for each province
- Bilingual support (EN/FR)
- Province-specific keywords
- Open Graph tags for social sharing

### Sitemap Updates
- Add all 10 province pages to sitemap
- Priority: 0.8 (higher than cities at 0.7)
- Change frequency: weekly
- Include in `public/sitemap-locations.xml`

### Internal Linking
- City pages link to parent province
- Province pages link to all cities within
- Breadcrumb navigation for SEO
- "Back to Locations" link on all location pages

### Structured Data
- Place schema for provinces
- LocalBusiness schema for cities
- BreadcrumbList schema for navigation
- Aggregate rating data where applicable

## Performance Optimization

### Static Generation
- All province pages pre-rendered at build time
- No runtime data fetching required
- Fast page loads with CDN caching

### Image Optimization
- Use existing `OptimizedImage` component
- Province-specific images (optional)
- Lazy loading for city grids

### Code Splitting
- Province page component in separate chunk
- Shared location utilities in common bundle
- Minimal JavaScript for static content

## Migration Strategy

### Phase 1: Create Province Infrastructure
1. Create `src/lib/locations/provinces.ts` with province data
2. Create `ProvincePageTemplate` component
3. Create dynamic route at `pages/locations/province/[provinceSlug].tsx`

### Phase 2: Fix Montreal Routing
1. Modify `pages/montreal.tsx` to redirect
2. Update `pages/reviews.tsx` to link to `/locations/montreal`
3. Remove legacy Montreal-specific files if any

### Phase 3: Remove Partnership Guide
1. Remove PDF link from `pages/b2b.tsx`
2. Add inline contact information
3. Verify no other references exist

### Phase 4: Validate External Links
1. Run link validation script
2. Identify broken retailer links
3. Update or remove broken links
4. Document changes

### Phase 5: Update Sitemaps
1. Regenerate sitemap with province pages
2. Update `next-sitemap.config.js` if needed
3. Verify all location pages included

### Phase 6: Testing and Deployment
1. Run unit and integration tests
2. Execute E2E tests for all new pages
3. Validate SEO metadata
4. Deploy to staging
5. Final validation
6. Deploy to production

## Rollback Plan

If issues arise:
1. Province pages can be removed without affecting city pages
2. Montreal redirect can be reverted to standalone page
3. B2B page changes are isolated and easily reverted
4. Sitemap can be regenerated from previous config

## Monitoring and Validation

### Post-Deployment Checks
- Verify all 10 province pages return 200 status
- Check Montreal redirect works correctly
- Validate B2B page has no broken links
- Confirm sitemap includes all new pages
- Monitor 404 errors in analytics

### SEO Monitoring
- Track province page indexing in Google Search Console
- Monitor organic traffic to new pages
- Check for crawl errors
- Validate structured data in Rich Results Test

### User Experience
- Monitor bounce rates on province pages
- Track click-through rates from province to city pages
- Analyze user navigation patterns
- Collect feedback on new pages
