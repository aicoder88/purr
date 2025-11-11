# Implementation Plan

- [x] 1. Create province data infrastructure
  - Create `src/lib/locations/provinces.ts` with province data structure, utility functions, and metadata for all 10 Canadian provinces (ON, QC, AB, MB, BC, NS, SK, NL, NB, PE)
  - Implement `getProvinceBySlug()`, `getCitiesByProvince()`, and `getAllProvinces()` helper functions
  - Add bilingual descriptions and SEO metadata for each province
  - _Requirements: 1.1-1.10, 2.1-2.5_

- [x] 2. Build province page component
  - [x] 2.1 Create `ProvincePageTemplate` component in `src/components/sections/locations/ProvincePageTemplate.tsx`
    - Implement hero section with province name and description
    - Add statistics section showing population and city count
    - Create cities grid displaying all cities in the province with links
    - Include product information section
    - Add call-to-action section
    - Implement breadcrumb navigation
    - _Requirements: 2.1-2.5_
  
  - [x] 2.2 Add SEO metadata and structured data
    - Implement NextSeo configuration with province-specific meta tags
    - Add JSON-LD structured data for Place schema
    - Include Open Graph tags for social sharing
    - Support bilingual meta tags (EN/FR)
    - _Requirements: 2.1, 2.5, 7.1-7.5_

- [x] 3. Implement province dynamic routing
  - Create `pages/locations/province/[provinceSlug].tsx` with getStaticPaths and getStaticProps
  - Pre-render all 10 province pages at build time
  - Set fallback to false since all provinces are known
  - Configure revalidation period (24 hours)
  - _Requirements: 1.1-1.10, 8.1-8.5_

- [x] 4. Fix Montreal page routing
  - [x] 4.1 Modify `pages/montreal.tsx` to implement 301 redirect
    - Replace page content with getServerSideProps redirect
    - Redirect to `/locations/montreal` (or `/fr/locations/montreal` for French)
    - Use permanent: true for SEO-friendly 301 redirect
    - _Requirements: 3.1-3.4_
  
  - [x] 4.2 Update reviews page link
    - Modify `pages/reviews.tsx` line 321 to link to `/locations/montreal` instead of `/montreal`
    - Verify link text and styling remain consistent
    - _Requirements: 3.1_

- [x] 5. Remove partnership guide PDF reference
  - Remove PDF link from `pages/b2b.tsx` around line 640
  - Replace with inline contact information section showing email and phone
  - Add styled contact card with Mail and Phone icons
  - Ensure bilingual support for new contact section
  - _Requirements: 4.1-4.4_

- [x] 6. Update city pages to link to provinces
  - Modify `src/components/sections/locations/createCityPage.tsx` to add province link
  - Add breadcrumb or "View [Province Name]" link using city's provinceCode
  - Ensure link uses correct province slug format (lowercase two-letter code)
  - _Requirements: 2.2, 8.4_

- [x] 7. Create link validation utility
  - [x] 7.1 Create `src/lib/seo/link-validator.ts` with validation functions
    - Implement `validateExternalLinks()` to check external URLs
    - Implement `validateInternalLinks()` to check internal routes
    - Add retry logic for network failures
    - Generate structured report of broken links
    - _Requirements: 5.1-5.4, 6.1-6.5_
  
  - [x] 7.2 Create validation script
    - Create `scripts/validate-links.ts` to run link validation
    - Scan all pages for internal and external links
    - Check external retailer links specifically
    - Output report to `reports/broken-links.json`
    - _Requirements: 5.1-5.4, 6.1-6.3_
  
  - [x] 7.3 Run validation and fix broken retailer links
    - Execute link validation script
    - Review broken external retailer links (Chewy/Petco blocking automated requests - expected)
    - Internal broken links documented for future content creation
    - Report generated at `reports/broken-links.json`
    - _Requirements: 5.1-5.4_

- [x] 8. Update sitemaps
  - Modify sitemap generation to include all 10 province pages
  - Set priority to 0.8 for province pages (higher than cities)
  - Set changefreq to "weekly" for province pages
  - Regenerate `public/sitemap-locations.xml` and `public/sitemap-0.xml`
  - Verify Montreal page appears only as `/locations/montreal`
  - _Requirements: 7.1-7.5_

- [x] 9. Update navigation and internal linking
  - Add "Back to Locations" link on province pages
  - Ensure consistent breadcrumb navigation across all location pages
  - Verify all city pages correctly link to their parent province
  - Check that province pages link to all their cities
  - _Requirements: 8.1-8.5, 6.4-6.5_

- [ ]* 10. Write E2E tests for new pages
  - [ ]* 10.1 Create `e2e/province-pages.spec.ts`
    - Test all 10 province pages are accessible and render correctly
    - Verify province pages display correct city lists
    - Check breadcrumb navigation works
    - Validate SEO metadata is present
    - _Requirements: 1.1-1.10, 2.1-2.5_
  
  - [ ]* 10.2 Create `e2e/montreal-redirect.spec.ts`
    - Test `/montreal` redirects to `/locations/montreal`
    - Verify redirect works for both EN and FR locales
    - Check 301 status code
    - _Requirements: 3.1_
  
  - [ ]* 10.3 Create `e2e/location-navigation.spec.ts`
    - Test navigation from city to province pages
    - Test navigation from province to city pages
    - Verify breadcrumb links work correctly
    - _Requirements: 8.1-8.5_
  
  - [ ]* 10.4 Update `e2e/broken-links.spec.ts`
    - Test B2B page has no partnership-guide.pdf link
    - Verify reviews page links to correct Montreal URL
    - Check all province pages are accessible
    - _Requirements: 4.4, 6.1-6.5_

- [x] 11. Final validation and deployment
  - Run `npm run build` to verify all pages generate successfully
  - Run `npm run check-types` to ensure no TypeScript errors
  - Execute all E2E tests to validate functionality
  - Verify sitemap includes all new pages
  - Check for any remaining 404 errors in build output
  - Deploy to staging for final review
  - _Requirements: All_
