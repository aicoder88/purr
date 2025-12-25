# TypeScript Unused Identifier Report

Generated: 2025-12-25T13:45:42.258Z

- Total issues detected: 126
- Files impacted: 69

## Top Offenders
- pages/products/standard.tsx: 8 issues
- pages/products/trial-size.tsx: 7 issues
- src/components/analytics/ReferralAnalyticsDashboard.tsx: 7 issues
- src/components/referrals/SocialShareTools.tsx: 5 issues
- src/components/customer/CustomerSupport.tsx: 4 issues
- src/components/mobile/MobilePayment.tsx: 4 issues
- src/components/referrals/ViralReferralSystem.tsx: 4 issues
- src/lib/locations/testimonial-templates.ts: 4 issues
- pages/index.tsx: 3 issues
- pages/products/family-pack.tsx: 3 issues
- src/components/reviews/ReviewSystem.tsx: 3 issues
- src/components/sections/hero/HeroContent.tsx: 3 issues
- src/components/sections/locations/createCityPage.tsx: 3 issues
- src/components/sections/retailer-contact.tsx: 3 issues
- pages/retailer/portal/login.tsx: 2 issues
- pages/thank-you.tsx: 2 issues
- scripts/generate-location-pages.ts: 2 issues
- src/components/admin/EnhancedSEOPanel.tsx: 2 issues
- src/components/admin/PostAnalyticsView.tsx: 2 issues
- src/components/sections/enhanced-product-comparison.tsx: 2 issues
- src/components/sections/subscription-offer.tsx: 2 issues
- src/lib/cache-utils.ts: 2 issues
- src/lib/seo/keyword-optimizer.ts: 2 issues
- src/lib/seo/structured-data-generator.ts: 2 issues
- e2e/security-csrf.spec.ts: 1 issue

## Detailed Findings
### pages/products/standard.tsx
  - 5,1 — 'SITE_NAME' is declared but its value is never read.
  - 8,55 — 'Users' is declared but its value is never read.
  - 12,96 — 'generateFAQSchema' is declared but its value is never read.
  - 15,1 — 'cn' is declared but its value is never read.
  - 23,9 — 'productPriceValue' is declared but its value is never read.
  - 30,9 — 'priceValidUntil' is declared but its value is never read.
  - 31,9 — 'availabilityUrl' is declared but its value is never read.
  - 38,9 — 'lifestyleImage' is declared but its value is never read.

### pages/products/trial-size.tsx
  - 5,1 — 'SITE_NAME' is declared but its value is never read.
  - 12,10 — 'PRODUCT_PRICES' is declared but its value is never read.
  - 15,11 — 't' is declared but its value is never read.
  - 24,9 — 'standardPrice' is declared but its value is never read.
  - 25,9 — 'familyPrice' is declared but its value is never read.
  - 30,9 — 'standardPriceString' is declared but its value is never read.
  - 31,9 — 'familyPriceString' is declared but its value is never read.

### src/components/analytics/ReferralAnalyticsDashboard.tsx
  - 16,3 — 'Filter' is declared but its value is never read.
  - 19,3 — 'AlertCircle' is declared but its value is never read.
  - 22,3 — 'Calendar' is declared but its value is never read.
  - 23,3 — 'Zap' is declared but its value is never read.
  - 314,30 — 'trends' is declared but its value is never read.
  - 452,33 — 'trends' is declared but its value is never read.
  - 640,29 — 'trends' is declared but its value is never read.

### src/components/referrals/SocialShareTools.tsx
  - 2,88 — 'Check' is declared but its value is never read.
  - 105,10 — 'selectedTemplate' is declared but its value is never read.
  - 105,28 — 'setSelectedTemplate' is declared but its value is never read.
  - 107,10 — 'customMessage' is declared but its value is never read.
  - 107,25 — 'setCustomMessage' is declared but its value is never read.

### src/components/customer/CustomerSupport.tsx
  - 2,36 — 'Clock' is declared but its value is never read.
  - 2,43 — 'CheckCircle' is declared but its value is never read.
  - 2,56 — 'X' is declared but its value is never read.
  - 2,59 — 'FileText' is declared but its value is never read.

### src/components/mobile/MobilePayment.tsx
  - 178,43 — 'event' is declared but its value is never read.
  - 285,33 — 'paymentData' is declared but its value is never read.
  - 398,3 — 'amount' is declared but its value is never read.
  - 399,3 — 'onPaymentSuccess' is declared but its value is never read.

### src/components/referrals/ViralReferralSystem.tsx
  - 2,70 — 'Zap' is declared but its value is never read.
  - 4,1 — 'Input' is declared but its value is never read.
  - 137,33 — 'userId' is declared but its value is never read.
  - 512,40 — 'index' is declared but its value is never read.

### src/lib/locations/testimonial-templates.ts
  - 191,4 — 'context' is declared but its value is never read.
  - 195,4 — 'context' is declared but its value is never read.
  - 199,4 — 'context' is declared but its value is never read.
  - 204,4 — 'context' is declared but its value is never read.

### pages/index.tsx
  - 50,9 — 'trialPrice' is declared but its value is never read.
  - 51,9 — 'standardPrice' is declared but its value is never read.
  - 52,9 — 'familyPrice' is declared but its value is never read.

### pages/products/family-pack.tsx
  - 3,67 — 'HelpCircle' is declared but its value is never read.
  - 32,9 — 'doubleStandardPrice' is declared but its value is never read.
  - 33,9 — 'savingsComparedToStandard' is declared but its value is never read.

### src/components/reviews/ReviewSystem.tsx
  - 2,44 — 'Calendar' is declared but its value is never read.
  - 7,1 — 'Container' is declared but its value is never read.
  - 8,1 — 'useTranslation' is declared but its value is never read.

### src/components/sections/hero/HeroContent.tsx
  - 5,1 — All imports in import declaration are unused.
  - 66,7 — 'PathCard' is declared but its value is never read.
  - 118,34 — 'locale' is declared but its value is never read.

### src/components/sections/locations/createCityPage.tsx
  - 38,7 — 'toSentenceCase' is declared but its value is never read.
  - 45,7 — 'capitalize' is declared but its value is never read.
  - 402,47 — 'index' is declared but its value is never read.

### src/components/sections/retailer-contact.tsx
  - 5,1 — 'emailjs' is declared but its value is never read.
  - 6,1 — All imports in import declaration are unused.
  - 10,9 — 't' is declared but its value is never read.

### pages/retailer/portal/login.tsx
  - 4,35 — 'User' is declared but its value is never read.
  - 4,41 — 'Phone' is declared but its value is never read.

### pages/thank-you.tsx
  - 8,3 — 'Share2' is declared but its value is never read.
  - 17,1 — 'Image' is declared but its value is never read.

### scripts/generate-location-pages.ts
  - 698,9 — 'cityList' is declared but its value is never read.
  - 1215,35 — 'totalPages' is declared but its value is never read.

### src/components/admin/EnhancedSEOPanel.tsx
  - 15,10 — 'loadingLinks' is declared but its value is never read.
  - 16,10 — 'loadingCannibalization' is declared but its value is never read.

### src/components/admin/PostAnalyticsView.tsx
  - 2,41 — 'ExternalLink' is declared but its value is never read.
  - 2,55 — 'Download' is declared but its value is never read.

### src/components/sections/enhanced-product-comparison.tsx
  - 5,17 — 'Zap' is declared but its value is never read.
  - 58,10 — 'hoveredProduct' is declared but its value is never read.

### src/components/sections/subscription-offer.tsx
  - 28,9 — 'standardPrice' is declared but its value is never read.
  - 30,9 — 'standardAutoshipPrice' is declared but its value is never read.

### src/lib/cache-utils.ts
  - 264,11 — 'decompress' is declared but its value is never read.
  - 358,19 — 'target' is declared but its value is never read.

### src/lib/seo/keyword-optimizer.ts
  - 252,11 — 'contentLower' is declared but its value is never read.
  - 438,11 — 'contentLower' is declared but its value is never read.

### src/lib/seo/structured-data-generator.ts
  - 635,67 — 'warnings' is declared but its value is never read.
  - 717,60 — 'warnings' is declared but its value is never read.

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

### pages/blog/tried-every-litter-deodorizer-90-days-results.tsx
  - 1,1 — 'React' is declared but its value is never read.

### pages/dialergptpitchdeck.tsx
  - 3,8 — 'React' is declared but its value is never read.

### pages/invest.tsx
  - 123,114 — 'index' is declared but its value is never read.

### pages/learn/solutions/ammonia-smell-cat-litter.tsx
  - 2,1 — 'ArticleSchema' is declared but its value is never read.

### pages/learn/solutions/natural-cat-litter-additive.tsx
  - 2,1 — 'ArticleSchema' is declared but its value is never read.

### pages/locations/[citySlug].tsx
  - 15,7 — 'HIGH_PRIORITY_CITY_SLUGS' is declared but its value is never read.

### pages/privacy-policy.tsx
  - 1,1 — 'React' is declared but its value is never read.

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

### src/components/admin/SetupInstructions.tsx
  - 1,1 — 'React' is declared but its value is never read.

### src/components/mobile/TouchGallery.tsx
  - 2,37 — 'Circle' is declared but its value is never read.

### src/components/newsletter/NewsletterSignup.tsx
  - 2,16 — 'Check' is declared but its value is never read.

### src/components/sections/about.tsx
  - 3,1 — 'dynamic' is declared but its value is never read.

### src/components/sections/how-it-works.tsx
  - 2,1 — 'SectionHeader' is declared but its value is never read.

### src/components/sections/locations/ProvincePageTemplate.tsx
  - 36,9 — 'otherCities' is declared but its value is never read.

### src/components/sections/products.tsx
  - 14,11 — 'Product' is declared but never used.

### src/components/sections/products/ProductCard.tsx
  - 1,1 — 'Button' is declared but its value is never read.

### src/components/sections/science-section.tsx
  - 9,13 — 't' is declared but its value is never read.

### src/components/sections/scrolling-announcement-bar.tsx
  - 5,9 — 't' is declared but its value is never read.

### src/components/social-proof/LivePurchaseNotifications.tsx
  - 171,48 — 'notification' is declared but its value is never read.

### src/components/subscription/SubscriptionSelector.tsx
  - 25,11 — 't' is declared but its value is never read.

### src/components/ui/loading-spinner.tsx
  - 1,1 — 'React' is declared but its value is never read.

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

### src/lib/component-utils.tsx
  - 1,8 — 'React' is declared but its value is never read.

### src/lib/seo-utils.ts
  - 2,42 — 'formatProductPrice' is declared but its value is never read.

### src/lib/seo/broken-link-detector.ts
  - 24,11 — 'baseUrl' is declared but its value is never read.

### src/lib/seo/redirect-analyzer.ts
  - 118,34 — 'siteUrl' is declared but its value is never read.

### src/lib/translation-context.tsx
  - 1,8 — 'React' is declared but its value is never read.

---

### Raw TypeScript Output
```
e2e/security-csrf.spec.ts(57,74): error TS6133: 'context' is declared but its value is never read.
pages/admin/login.tsx(7,9): error TS6133: 'router' is declared but its value is never read.
pages/admin/referral-analytics.tsx(18,24): error TS6133: 'setSystemHealth' is declared but its value is never read.
pages/api/health/storage.ts(165,3): error TS6133: 'req' is declared but its value is never read.
pages/api/robots.ts(3,33): error TS6133: 'req' is declared but its value is never read.
pages/blog/[slug].tsx(64,11): error TS6133: 'seoGen' is declared but its value is never read.
pages/blog/cat-litter-smell-worse-winter.tsx(11,7): error TS6133: 'ventilationImage' is declared but its value is never read.
pages/blog/category/[slug].tsx(168,9): error TS6133: 'seoGenerator' is declared but its value is never read.
pages/blog/preview/[token].tsx(106,72): error TS6133: 'query' is declared but its value is never read.
pages/blog/tried-every-litter-deodorizer-90-days-results.tsx(1,1): error TS6133: 'React' is declared but its value is never read.
pages/dialergptpitchdeck.tsx(3,8): error TS6133: 'React' is declared but its value is never read.
pages/index.tsx(50,9): error TS6133: 'trialPrice' is declared but its value is never read.
pages/index.tsx(51,9): error TS6133: 'standardPrice' is declared but its value is never read.
pages/index.tsx(52,9): error TS6133: 'familyPrice' is declared but its value is never read.
pages/invest.tsx(123,114): error TS6133: 'index' is declared but its value is never read.
pages/learn/solutions/ammonia-smell-cat-litter.tsx(2,1): error TS6133: 'ArticleSchema' is declared but its value is never read.
pages/learn/solutions/natural-cat-litter-additive.tsx(2,1): error TS6133: 'ArticleSchema' is declared but its value is never read.
pages/locations/[citySlug].tsx(15,7): error TS6133: 'HIGH_PRIORITY_CITY_SLUGS' is declared but its value is never read.
pages/privacy-policy.tsx(1,1): error TS6133: 'React' is declared but its value is never read.
pages/products/family-pack.tsx(3,67): error TS6133: 'HelpCircle' is declared but its value is never read.
pages/products/family-pack.tsx(32,9): error TS6133: 'doubleStandardPrice' is declared but its value is never read.
pages/products/family-pack.tsx(33,9): error TS6133: 'savingsComparedToStandard' is declared but its value is never read.
pages/products/standard.tsx(5,1): error TS6133: 'SITE_NAME' is declared but its value is never read.
pages/products/standard.tsx(8,55): error TS6133: 'Users' is declared but its value is never read.
pages/products/standard.tsx(12,96): error TS6133: 'generateFAQSchema' is declared but its value is never read.
pages/products/standard.tsx(15,1): error TS6133: 'cn' is declared but its value is never read.
pages/products/standard.tsx(23,9): error TS6133: 'productPriceValue' is declared but its value is never read.
pages/products/standard.tsx(30,9): error TS6133: 'priceValidUntil' is declared but its value is never read.
pages/products/standard.tsx(31,9): error TS6133: 'availabilityUrl' is declared but its value is never read.
pages/products/standard.tsx(38,9): error TS6133: 'lifestyleImage' is declared but its value is never read.
pages/products/trial-size.tsx(5,1): error TS6133: 'SITE_NAME' is declared but its value is never read.
pages/products/trial-size.tsx(12,10): error TS6133: 'PRODUCT_PRICES' is declared but its value is never read.
pages/products/trial-size.tsx(15,11): error TS6133: 't' is declared but its value is never read.
pages/products/trial-size.tsx(24,9): error TS6133: 'standardPrice' is declared but its value is never read.
pages/products/trial-size.tsx(25,9): error TS6133: 'familyPrice' is declared but its value is never read.
pages/products/trial-size.tsx(30,9): error TS6133: 'standardPriceString' is declared but its value is never read.
pages/products/trial-size.tsx(31,9): error TS6133: 'familyPriceString' is declared but its value is never read.
pages/refer/[code].tsx(4,10): error TS6133: 'User' is declared but its value is never read.
pages/retailer/portal/login.tsx(4,35): error TS6133: 'User' is declared but its value is never read.
pages/retailer/portal/login.tsx(4,41): error TS6133: 'Phone' is declared but its value is never read.
pages/thank-you.tsx(8,3): error TS6133: 'Share2' is declared but its value is never read.
pages/thank-you.tsx(17,1): error TS6133: 'Image' is declared but its value is never read.
pages/thank-you/upsell.tsx(65,20): error TS6133: 'session_id' is declared but its value is never read.
scripts/generate-location-pages.ts(698,9): error TS6133: 'cityList' is declared but its value is never read.
scripts/generate-location-pages.ts(1215,35): error TS6133: 'totalPages' is declared but its value is never read.
scripts/seo-fix.ts(5,1): error TS6133: 'path' is declared but its value is never read.
src/components/admin/AIContentGenerator.tsx(2,41): error TS6133: 'FileText' is declared but its value is never read.
src/components/admin/BulkActionsToolbar.tsx(2,28): error TS6133: 'Calendar' is declared but its value is never read.
src/components/admin/EnhancedSEOPanel.tsx(15,10): error TS6133: 'loadingLinks' is declared but its value is never read.
src/components/admin/EnhancedSEOPanel.tsx(16,10): error TS6133: 'loadingCannibalization' is declared but its value is never read.
src/components/admin/PostAnalyticsView.tsx(2,41): error TS6133: 'ExternalLink' is declared but its value is never read.
src/components/admin/PostAnalyticsView.tsx(2,55): error TS6133: 'Download' is declared but its value is never read.
src/components/admin/SetupInstructions.tsx(1,1): error TS6133: 'React' is declared but its value is never read.
src/components/analytics/ReferralAnalyticsDashboard.tsx(16,3): error TS6133: 'Filter' is declared but its value is never read.
src/components/analytics/ReferralAnalyticsDashboard.tsx(19,3): error TS6133: 'AlertCircle' is declared but its value is never read.
src/components/analytics/ReferralAnalyticsDashboard.tsx(22,3): error TS6133: 'Calendar' is declared but its value is never read.
src/components/analytics/ReferralAnalyticsDashboard.tsx(23,3): error TS6133: 'Zap' is declared but its value is never read.
src/components/analytics/ReferralAnalyticsDashboard.tsx(314,30): error TS6133: 'trends' is declared but its value is never read.
src/components/analytics/ReferralAnalyticsDashboard.tsx(452,33): error TS6133: 'trends' is declared but its value is never read.
src/components/analytics/ReferralAnalyticsDashboard.tsx(640,29): error TS6133: 'trends' is declared but its value is never read.
src/components/customer/CustomerSupport.tsx(2,36): error TS6133: 'Clock' is declared but its value is never read.
src/components/customer/CustomerSupport.tsx(2,43): error TS6133: 'CheckCircle' is declared but its value is never read.
src/components/customer/CustomerSupport.tsx(2,56): error TS6133: 'X' is declared but its value is never read.
src/components/customer/CustomerSupport.tsx(2,59): error TS6133: 'FileText' is declared but its value is never read.
src/components/mobile/MobilePayment.tsx(178,43): error TS6133: 'event' is declared but its value is never read.
src/components/mobile/MobilePayment.tsx(285,33): error TS6133: 'paymentData' is declared but its value is never read.
src/components/mobile/MobilePayment.tsx(398,3): error TS6133: 'amount' is declared but its value is never read.
src/components/mobile/MobilePayment.tsx(399,3): error TS6133: 'onPaymentSuccess' is declared but its value is never read.
src/components/mobile/TouchGallery.tsx(2,37): error TS6133: 'Circle' is declared but its value is never read.
src/components/newsletter/NewsletterSignup.tsx(2,16): error TS6133: 'Check' is declared but its value is never read.
src/components/referrals/SocialShareTools.tsx(2,88): error TS6133: 'Check' is declared but its value is never read.
src/components/referrals/SocialShareTools.tsx(105,10): error TS6133: 'selectedTemplate' is declared but its value is never read.
src/components/referrals/SocialShareTools.tsx(105,28): error TS6133: 'setSelectedTemplate' is declared but its value is never read.
src/components/referrals/SocialShareTools.tsx(107,10): error TS6133: 'customMessage' is declared but its value is never read.
src/components/referrals/SocialShareTools.tsx(107,25): error TS6133: 'setCustomMessage' is declared but its value is never read.
src/components/referrals/ViralReferralSystem.tsx(2,70): error TS6133: 'Zap' is declared but its value is never read.
src/components/referrals/ViralReferralSystem.tsx(4,1): error TS6133: 'Input' is declared but its value is never read.
src/components/referrals/ViralReferralSystem.tsx(137,33): error TS6133: 'userId' is declared but its value is never read.
src/components/referrals/ViralReferralSystem.tsx(512,40): error TS6133: 'index' is declared but its value is never read.
src/components/reviews/ReviewSystem.tsx(2,44): error TS6133: 'Calendar' is declared but its value is never read.
src/components/reviews/ReviewSystem.tsx(7,1): error TS6133: 'Container' is declared but its value is never read.
src/components/reviews/ReviewSystem.tsx(8,1): error TS6133: 'useTranslation' is declared but its value is never read.
src/components/sections/about.tsx(3,1): error TS6133: 'dynamic' is declared but its value is never read.
src/components/sections/enhanced-product-comparison.tsx(5,17): error TS6133: 'Zap' is declared but its value is never read.
src/components/sections/enhanced-product-comparison.tsx(58,10): error TS6133: 'hoveredProduct' is declared but its value is never read.
src/components/sections/hero/HeroContent.tsx(5,1): error TS6192: All imports in import declaration are unused.
src/components/sections/hero/HeroContent.tsx(66,7): error TS6133: 'PathCard' is declared but its value is never read.
src/components/sections/hero/HeroContent.tsx(118,34): error TS6133: 'locale' is declared but its value is never read.
src/components/sections/how-it-works.tsx(2,1): error TS6133: 'SectionHeader' is declared but its value is never read.
src/components/sections/locations/createCityPage.tsx(38,7): error TS6133: 'toSentenceCase' is declared but its value is never read.
src/components/sections/locations/createCityPage.tsx(45,7): error TS6133: 'capitalize' is declared but its value is never read.
src/components/sections/locations/createCityPage.tsx(402,47): error TS6133: 'index' is declared but its value is never read.
src/components/sections/locations/ProvincePageTemplate.tsx(36,9): error TS6133: 'otherCities' is declared but its value is never read.
src/components/sections/products.tsx(14,11): error TS6196: 'Product' is declared but never used.
src/components/sections/products/ProductCard.tsx(1,1): error TS6133: 'Button' is declared but its value is never read.
src/components/sections/retailer-contact.tsx(5,1): error TS6133: 'emailjs' is declared but its value is never read.
src/components/sections/retailer-contact.tsx(6,1): error TS6192: All imports in import declaration are unused.
src/components/sections/retailer-contact.tsx(10,9): error TS6133: 't' is declared but its value is never read.
src/components/sections/science-section.tsx(9,13): error TS6133: 't' is declared but its value is never read.
src/components/sections/scrolling-announcement-bar.tsx(5,9): error TS6133: 't' is declared but its value is never read.
src/components/sections/subscription-offer.tsx(28,9): error TS6133: 'standardPrice' is declared but its value is never read.
src/components/sections/subscription-offer.tsx(30,9): error TS6133: 'standardAutoshipPrice' is declared but its value is never read.
src/components/social-proof/LivePurchaseNotifications.tsx(171,48): error TS6133: 'notification' is declared but its value is never read.
src/components/subscription/SubscriptionSelector.tsx(25,11): error TS6133: 't' is declared but its value is never read.
src/components/ui/loading-spinner.tsx(1,1): error TS6133: 'React' is declared but its value is never read.
src/components/video/SolutionVideos.tsx(1,23): error TS6133: 'VideoGallery' is declared but its value is never read.
src/lib/blog/automated-content-generator.ts(345,52): error TS6133: 'count' is declared but its value is never read.
src/lib/blog/blog-repair-utility.ts(37,11): error TS6133: 'generator' is declared but its value is never read.
src/lib/blog/image-optimizer.ts(80,44): error TS6133: 'format' is declared but its value is never read.
src/lib/blog/seo-scorer.ts(500,11): error TS6133: 'words' is declared but its value is never read.
src/lib/blog/sitemap-generator.ts(4,1): error TS6133: 'BlogPost' is declared but its value is never read.
src/lib/cache-utils.ts(264,11): error TS6133: 'decompress' is declared but its value is never read.
src/lib/cache-utils.ts(358,19): error TS6133: 'target' is declared but its value is never read.
src/lib/component-utils.tsx(1,8): error TS6133: 'React' is declared but its value is never read.
src/lib/locations/testimonial-templates.ts(191,4): error TS6133: 'context' is declared but its value is never read.
src/lib/locations/testimonial-templates.ts(195,4): error TS6133: 'context' is declared but its value is never read.
src/lib/locations/testimonial-templates.ts(199,4): error TS6133: 'context' is declared but its value is never read.
src/lib/locations/testimonial-templates.ts(204,4): error TS6133: 'context' is declared but its value is never read.
src/lib/seo-utils.ts(2,42): error TS6133: 'formatProductPrice' is declared but its value is never read.
src/lib/seo/broken-link-detector.ts(24,11): error TS6133: 'baseUrl' is declared but its value is never read.
src/lib/seo/keyword-optimizer.ts(49,18): error TS7006: Parameter 'k' implicitly has an 'any' type.
src/lib/seo/keyword-optimizer.ts(252,11): error TS6133: 'contentLower' is declared but its value is never read.
src/lib/seo/keyword-optimizer.ts(438,11): error TS6133: 'contentLower' is declared but its value is never read.
src/lib/seo/redirect-analyzer.ts(118,34): error TS6133: 'siteUrl' is declared but its value is never read.
src/lib/seo/structured-data-generator.ts(635,67): error TS6133: 'warnings' is declared but its value is never read.
src/lib/seo/structured-data-generator.ts(717,60): error TS6133: 'warnings' is declared but its value is never read.
src/lib/translation-context.tsx(1,8): error TS6133: 'React' is declared but its value is never read.
```