# TypeScript Unused Identifier Report

Generated: 2025-12-25T13:55:42.455Z

- Total issues detected: 45
- Files impacted: 44

## Top Offenders
- scripts/generate-location-pages.ts: 2 issues
- e2e/security-csrf.spec.ts: 1 issue
- pages/admin/login.tsx: 1 issue
- pages/admin/referral-analytics.tsx: 1 issue
- pages/api/health/storage.ts: 1 issue
- pages/api/robots.ts: 1 issue
- pages/blog/[slug].tsx: 1 issue
- pages/blog/cat-litter-smell-worse-winter.tsx: 1 issue
- pages/blog/category/[slug].tsx: 1 issue
- pages/blog/preview/[token].tsx: 1 issue
- pages/dialergptpitchdeck.tsx: 1 issue
- pages/index.tsx: 1 issue
- pages/invest.tsx: 1 issue
- pages/learn/solutions/ammonia-smell-cat-litter.tsx: 1 issue
- pages/learn/solutions/natural-cat-litter-additive.tsx: 1 issue
- pages/locations/[citySlug].tsx: 1 issue
- pages/refer/[code].tsx: 1 issue
- pages/thank-you/upsell.tsx: 1 issue
- scripts/seo-fix.ts: 1 issue
- src/components/admin/AIContentGenerator.tsx: 1 issue
- src/components/admin/BulkActionsToolbar.tsx: 1 issue
- src/components/mobile/TouchGallery.tsx: 1 issue
- src/components/newsletter/NewsletterSignup.tsx: 1 issue
- src/components/sections/about.tsx: 1 issue
- src/components/sections/enhanced-product-comparison.tsx: 1 issue

## Detailed Findings
### scripts/generate-location-pages.ts
  - 698,9 — 'cityList' is declared but its value is never read.
  - 1215,35 — 'totalPages' is declared but its value is never read.

### e2e/security-csrf.spec.ts
  - 57,74 — 'context' is declared but its value is never read.

### pages/admin/login.tsx
  - 7,9 — 'router' is declared but its value is never read.

### pages/admin/referral-analytics.tsx
  - 18,24 — 'setSystemHealth' is declared but its value is never read.

### pages/api/health/storage.ts
  - 165,3 — 'req' is declared but its value is never read.

### pages/api/robots.ts
  - 3,33 — 'req' is declared but its value is never read.

### pages/blog/[slug].tsx
  - 64,11 — 'seoGen' is declared but its value is never read.

### pages/blog/cat-litter-smell-worse-winter.tsx
  - 11,7 — 'ventilationImage' is declared but its value is never read.

### pages/blog/category/[slug].tsx
  - 168,9 — 'seoGenerator' is declared but its value is never read.

### pages/blog/preview/[token].tsx
  - 106,72 — 'query' is declared but its value is never read.

### pages/dialergptpitchdeck.tsx
  - 3,8 — 'React' is declared but its value is never read.

### pages/index.tsx
  - 30,10 — 'formatProductPrice' is declared but its value is never read.

### pages/invest.tsx
  - 123,114 — 'index' is declared but its value is never read.

### pages/learn/solutions/ammonia-smell-cat-litter.tsx
  - 2,1 — 'ArticleSchema' is declared but its value is never read.

### pages/learn/solutions/natural-cat-litter-additive.tsx
  - 2,1 — 'ArticleSchema' is declared but its value is never read.

### pages/locations/[citySlug].tsx
  - 15,7 — 'HIGH_PRIORITY_CITY_SLUGS' is declared but its value is never read.

### pages/refer/[code].tsx
  - 4,10 — 'User' is declared but its value is never read.

### pages/thank-you/upsell.tsx
  - 65,20 — 'session_id' is declared but its value is never read.

### scripts/seo-fix.ts
  - 5,1 — 'path' is declared but its value is never read.

### src/components/admin/AIContentGenerator.tsx
  - 2,41 — 'FileText' is declared but its value is never read.

### src/components/admin/BulkActionsToolbar.tsx
  - 2,28 — 'Calendar' is declared but its value is never read.

### src/components/mobile/TouchGallery.tsx
  - 2,37 — 'Circle' is declared but its value is never read.

### src/components/newsletter/NewsletterSignup.tsx
  - 2,16 — 'Check' is declared but its value is never read.

### src/components/sections/about.tsx
  - 3,1 — 'dynamic' is declared but its value is never read.

### src/components/sections/enhanced-product-comparison.tsx
  - 3,1 — 'useState' is declared but its value is never read.

### src/components/sections/how-it-works.tsx
  - 2,1 — 'SectionHeader' is declared but its value is never read.

### src/components/sections/locations/createCityPage.tsx
  - 388,47 — 'index' is declared but its value is never read.

### src/components/sections/locations/ProvincePageTemplate.tsx
  - 36,9 — 'otherCities' is declared but its value is never read.

### src/components/sections/products.tsx
  - 14,11 — 'Product' is declared but never used.

### src/components/sections/products/ProductCard.tsx
  - 1,1 — 'Button' is declared but its value is never read.

### src/components/sections/retailer-contact.tsx
  - 4,1 — All imports in import declaration are unused.

### src/components/sections/science-section.tsx
  - 9,13 — 't' is declared but its value is never read.

### src/components/sections/scrolling-announcement-bar.tsx
  - 5,9 — 't' is declared but its value is never read.

### src/components/social-proof/LivePurchaseNotifications.tsx
  - 171,48 — 'notification' is declared but its value is never read.

### src/components/subscription/SubscriptionSelector.tsx
  - 25,11 — 't' is declared but its value is never read.

### src/components/video/SolutionVideos.tsx
  - 1,23 — 'VideoGallery' is declared but its value is never read.

### src/lib/blog/automated-content-generator.ts
  - 345,52 — 'count' is declared but its value is never read.

### src/lib/blog/blog-repair-utility.ts
  - 37,11 — 'generator' is declared but its value is never read.

### src/lib/blog/image-optimizer.ts
  - 80,44 — 'format' is declared but its value is never read.

### src/lib/blog/seo-scorer.ts
  - 500,11 — 'words' is declared but its value is never read.

### src/lib/blog/sitemap-generator.ts
  - 4,1 — 'BlogPost' is declared but its value is never read.

### src/lib/seo-utils.ts
  - 2,42 — 'formatProductPrice' is declared but its value is never read.

### src/lib/seo/broken-link-detector.ts
  - 24,11 — 'baseUrl' is declared but its value is never read.

### src/lib/seo/redirect-analyzer.ts
  - 118,34 — 'siteUrl' is declared but its value is never read.

---

### Raw TypeScript Output
```
.next/types/validator.ts(1036,39): error TS2307: Cannot find module '../../pages/api/analytics/conversion-metrics.js' or its corresponding type declarations.
.next/types/validator.ts(1045,39): error TS2307: Cannot find module '../../pages/api/analytics/optimization.js' or its corresponding type declarations.
.next/types/validator.ts(1198,39): error TS2307: Cannot find module '../../pages/api/order-management.js' or its corresponding type declarations.
.next/types/validator.ts(1216,39): error TS2307: Cannot find module '../../pages/api/payment-validation.js' or its corresponding type declarations.
.next/types/validator.ts(1243,39): error TS2307: Cannot find module '../../pages/api/referrals/notifications.js' or its corresponding type declarations.
.next/types/validator.ts(1279,39): error TS2307: Cannot find module '../../pages/api/retailer-inquiry.js' or its corresponding type declarations.
.next/types/validator.ts(1342,39): error TS2307: Cannot find module '../../pages/api/security/risk-assessment.js' or its corresponding type declarations.
.next/types/validator.ts(1378,39): error TS2307: Cannot find module '../../pages/api/trial-conversion.js' or its corresponding type declarations.
.next/types/validator.ts(1387,39): error TS2307: Cannot find module '../../pages/api/trial-users.js' or its corresponding type declarations.
e2e/security-csrf.spec.ts(57,74): error TS6133: 'context' is declared but its value is never read.
pages/admin/login.tsx(7,9): error TS6133: 'router' is declared but its value is never read.
pages/admin/referral-analytics.tsx(18,24): error TS6133: 'setSystemHealth' is declared but its value is never read.
pages/api/health/storage.ts(165,3): error TS6133: 'req' is declared but its value is never read.
pages/api/robots.ts(3,33): error TS6133: 'req' is declared but its value is never read.
pages/blog/[slug].tsx(64,11): error TS6133: 'seoGen' is declared but its value is never read.
pages/blog/cat-litter-smell-worse-winter.tsx(11,7): error TS6133: 'ventilationImage' is declared but its value is never read.
pages/blog/category/[slug].tsx(168,9): error TS6133: 'seoGenerator' is declared but its value is never read.
pages/blog/preview/[token].tsx(106,72): error TS6133: 'query' is declared but its value is never read.
pages/dialergptpitchdeck.tsx(3,8): error TS6133: 'React' is declared but its value is never read.
pages/index.tsx(30,10): error TS6133: 'formatProductPrice' is declared but its value is never read.
pages/index.tsx(215,34): error TS2304: Cannot find name 'standardPriceValue'.
pages/index.tsx(230,34): error TS2304: Cannot find name 'familyPriceValue'.
pages/invest.tsx(123,114): error TS6133: 'index' is declared but its value is never read.
pages/learn/solutions/ammonia-smell-cat-litter.tsx(2,1): error TS6133: 'ArticleSchema' is declared but its value is never read.
pages/learn/solutions/natural-cat-litter-additive.tsx(2,1): error TS6133: 'ArticleSchema' is declared but its value is never read.
pages/locations/[citySlug].tsx(15,7): error TS6133: 'HIGH_PRIORITY_CITY_SLUGS' is declared but its value is never read.
pages/products/family-pack.tsx(392,37): error TS2552: Cannot find name 'standardPriceAmount'. Did you mean 'standardPrice'?
pages/products/trial-size.tsx(73,38): error TS2304: Cannot find name 'priceValidUntil'.
pages/products/trial-size.tsx(74,35): error TS2304: Cannot find name 'availabilityUrl'.
pages/products/trial-size.tsx(85,15): error TS2304: Cannot find name 'generateFAQSchema'.
pages/products/trial-size.tsx(192,31): error TS2304: Cannot find name 'trialPrice'.
pages/products/trial-size.tsx(238,62): error TS2304: Cannot find name 'trialPrice'.
pages/products/trial-size.tsx(389,51): error TS2304: Cannot find name 'trialPrice'.
pages/products/trial-size.tsx(486,48): error TS2304: Cannot find name 'trialPrice'.
pages/products/trial-size.tsx(506,45): error TS2304: Cannot find name 'trialPrice'.
pages/products/trial-size.tsx(515,19): error TS2304: Cannot find name 'trialPrice'.
pages/products/trial-size.tsx(533,45): error TS2304: Cannot find name 'trialPrice'.
pages/refer/[code].tsx(4,10): error TS6133: 'User' is declared but its value is never read.
pages/thank-you/upsell.tsx(65,20): error TS6133: 'session_id' is declared but its value is never read.
scripts/generate-location-pages.ts(698,9): error TS6133: 'cityList' is declared but its value is never read.
scripts/generate-location-pages.ts(1215,35): error TS6133: 'totalPages' is declared but its value is never read.
scripts/seo-fix.ts(5,1): error TS6133: 'path' is declared but its value is never read.
src/components/admin/AIContentGenerator.tsx(2,41): error TS6133: 'FileText' is declared but its value is never read.
src/components/admin/BulkActionsToolbar.tsx(2,28): error TS6133: 'Calendar' is declared but its value is never read.
src/components/admin/EnhancedSEOPanel.tsx(26,5): error TS2304: Cannot find name 'setLoadingLinks'.
src/components/admin/EnhancedSEOPanel.tsx(41,7): error TS2304: Cannot find name 'setLoadingLinks'.
src/components/admin/EnhancedSEOPanel.tsx(48,5): error TS2552: Cannot find name 'setLoadingCannibalization'. Did you mean 'setCannibalization'?
src/components/admin/EnhancedSEOPanel.tsx(63,7): error TS2552: Cannot find name 'setLoadingCannibalization'. Did you mean 'setCannibalization'?
src/components/mobile/TouchGallery.tsx(2,37): error TS6133: 'Circle' is declared but its value is never read.
src/components/newsletter/NewsletterSignup.tsx(2,16): error TS6133: 'Check' is declared but its value is never read.
src/components/sections/about.tsx(3,1): error TS6133: 'dynamic' is declared but its value is never read.
src/components/sections/enhanced-product-comparison.tsx(3,1): error TS6133: 'useState' is declared but its value is never read.
src/components/sections/enhanced-product-comparison.tsx(244,37): error TS2304: Cannot find name 'setHoveredProduct'.
src/components/sections/enhanced-product-comparison.tsx(245,37): error TS2304: Cannot find name 'setHoveredProduct'.
src/components/sections/how-it-works.tsx(2,1): error TS6133: 'SectionHeader' is declared but its value is never read.
src/components/sections/locations/createCityPage.tsx(388,47): error TS6133: 'index' is declared but its value is never read.
src/components/sections/locations/ProvincePageTemplate.tsx(36,9): error TS6133: 'otherCities' is declared but its value is never read.
src/components/sections/products.tsx(14,11): error TS6196: 'Product' is declared but never used.
src/components/sections/products/ProductCard.tsx(1,1): error TS6133: 'Button' is declared but its value is never read.
src/components/sections/retailer-contact.tsx(4,1): error TS6192: All imports in import declaration are unused.
src/components/sections/science-section.tsx(9,13): error TS6133: 't' is declared but its value is never read.
src/components/sections/scrolling-announcement-bar.tsx(5,9): error TS6133: 't' is declared but its value is never read.
src/components/social-proof/LivePurchaseNotifications.tsx(171,48): error TS6133: 'notification' is declared but its value is never read.
src/components/subscription/SubscriptionSelector.tsx(25,11): error TS6133: 't' is declared but its value is never read.
src/components/video/SolutionVideos.tsx(1,23): error TS6133: 'VideoGallery' is declared but its value is never read.
src/lib/blog/automated-content-generator.ts(345,52): error TS6133: 'count' is declared but its value is never read.
src/lib/blog/blog-repair-utility.ts(37,11): error TS6133: 'generator' is declared but its value is never read.
src/lib/blog/image-optimizer.ts(80,44): error TS6133: 'format' is declared but its value is never read.
src/lib/blog/seo-scorer.ts(500,11): error TS6133: 'words' is declared but its value is never read.
src/lib/blog/sitemap-generator.ts(4,1): error TS6133: 'BlogPost' is declared but its value is never read.
src/lib/seo-utils.ts(2,42): error TS6133: 'formatProductPrice' is declared but its value is never read.
src/lib/seo/broken-link-detector.ts(24,11): error TS6133: 'baseUrl' is declared but its value is never read.
src/lib/seo/keyword-optimizer.ts(49,18): error TS7006: Parameter 'k' implicitly has an 'any' type.
src/lib/seo/redirect-analyzer.ts(118,34): error TS6133: 'siteUrl' is declared but its value is never read.
```