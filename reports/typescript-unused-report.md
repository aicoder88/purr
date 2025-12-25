# TypeScript Unused Identifier Report

Generated: 2025-12-25T14:12:53.271Z

- Total issues detected: 10
- Files impacted: 10

## Top Offenders
- pages/blog/[slug].tsx: 1 issue
- pages/locations/[citySlug].tsx: 1 issue
- src/components/sections/science-section.tsx: 1 issue
- src/components/sections/scrolling-announcement-bar.tsx: 1 issue
- src/components/social-proof/LivePurchaseNotifications.tsx: 1 issue
- src/components/subscription/SubscriptionSelector.tsx: 1 issue
- src/lib/blog/automated-content-generator.ts: 1 issue
- src/lib/blog/blog-repair-utility.ts: 1 issue
- src/lib/seo/broken-link-detector.ts: 1 issue
- src/lib/seo/redirect-analyzer.ts: 1 issue

## Detailed Findings
### pages/blog/[slug].tsx
  - 61,11 — 'SEOGenerator' is declared but its value is never read.

### pages/locations/[citySlug].tsx
  - 15,7 — 'HIGH_PRIORITY_CITY_SLUGS' is declared but its value is never read.

### src/components/sections/science-section.tsx
  - 9,13 — 't' is declared but its value is never read.

### src/components/sections/scrolling-announcement-bar.tsx
  - 5,9 — 't' is declared but its value is never read.

### src/components/social-proof/LivePurchaseNotifications.tsx
  - 172,48 — 'notification' is declared but its value is never read.

### src/components/subscription/SubscriptionSelector.tsx
  - 25,11 — 't' is declared but its value is never read.

### src/lib/blog/automated-content-generator.ts
  - 345,52 — 'count' is declared but its value is never read.

### src/lib/blog/blog-repair-utility.ts
  - 37,11 — 'generator' is declared but its value is never read.

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
e2e/security-csrf.spec.ts(20,28): error TS2304: Cannot find name 'context'.
pages/blog/[slug].tsx(61,11): error TS6133: 'SEOGenerator' is declared but its value is never read.
pages/index.tsx(215,34): error TS2304: Cannot find name 'standardPriceValue'.
pages/index.tsx(230,34): error TS2304: Cannot find name 'familyPriceValue'.
pages/locations/[citySlug].tsx(15,7): error TS6133: 'HIGH_PRIORITY_CITY_SLUGS' is declared but its value is never read.
pages/products/family-pack.tsx(392,37): error TS2304: Cannot find name 'standardPriceAmount'.
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
scripts/generate-location-pages.ts(383,7): error TS2552: Cannot find name '_totalPages'. Did you mean 'totalPages'?
scripts/generate-location-pages.ts(390,5): error TS2552: Cannot find name '_totalPages'. Did you mean 'totalPages'?
scripts/generate-location-pages.ts(393,30): error TS2552: Cannot find name '_totalPages'. Did you mean 'totalPages'?
scripts/generate-location-pages.ts(801,5): error TS2552: Cannot find name '_totalPages'. Did you mean 'totalPages'?
scripts/generate-location-pages.ts(804,30): error TS2552: Cannot find name '_totalPages'. Did you mean 'totalPages'?
scripts/generate-location-pages.ts(979,5): error TS2552: Cannot find name '_totalPages'. Did you mean 'totalPages'?
scripts/generate-location-pages.ts(982,30): error TS2552: Cannot find name '_totalPages'. Did you mean 'totalPages'?
scripts/generate-location-pages.ts(1198,46): error TS2304: Cannot find name '_totalPages'.
scripts/generate-location-pages.ts(1205,30): error TS2304: Cannot find name 'totalPages'.
src/components/admin/EnhancedSEOPanel.tsx(26,5): error TS2304: Cannot find name 'setLoadingLinks'.
src/components/admin/EnhancedSEOPanel.tsx(41,7): error TS2304: Cannot find name 'setLoadingLinks'.
src/components/admin/EnhancedSEOPanel.tsx(48,5): error TS2304: Cannot find name 'setLoadingCannibalization'.
src/components/admin/EnhancedSEOPanel.tsx(63,7): error TS2304: Cannot find name 'setLoadingCannibalization'.
src/components/sections/enhanced-product-comparison.tsx(244,37): error TS2304: Cannot find name 'setHoveredProduct'.
src/components/sections/enhanced-product-comparison.tsx(245,37): error TS2304: Cannot find name 'setHoveredProduct'.
src/components/sections/products/ProductCard.tsx(129,74): error TS2304: Cannot find name 'createButtonClasses'.
src/components/sections/science-section.tsx(9,13): error TS6133: 't' is declared but its value is never read.
src/components/sections/scrolling-announcement-bar.tsx(5,9): error TS6133: 't' is declared but its value is never read.
src/components/social-proof/LivePurchaseNotifications.tsx(172,48): error TS6133: 'notification' is declared but its value is never read.
src/components/subscription/SubscriptionSelector.tsx(25,11): error TS6133: 't' is declared but its value is never read.
src/lib/blog/automated-content-generator.ts(345,52): error TS6133: 'count' is declared but its value is never read.
src/lib/blog/blog-repair-utility.ts(37,11): error TS6133: 'generator' is declared but its value is never read.
src/lib/seo/broken-link-detector.ts(24,11): error TS6133: 'baseUrl' is declared but its value is never read.
src/lib/seo/keyword-optimizer.ts(49,18): error TS7006: Parameter 'k' implicitly has an 'any' type.
src/lib/seo/redirect-analyzer.ts(118,34): error TS6133: 'siteUrl' is declared but its value is never read.
```