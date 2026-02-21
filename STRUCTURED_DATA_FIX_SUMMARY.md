# Structured Data Fix Summary

## Date: 2026-02-21

## Issues Fixed

Based on the Google Search Console report (`purrify.ca_structured_data_that_contains_markup_errors_20260221.csv`), the following issues have been addressed:

### 1. Title Pattern Fix - " | Free Delivery | Purrify | Purrify"

**Problem:** The translation files contained titles with " | Free Delivery" suffix which could combine with layout-added " | Purrify" to create duplicates.

**Files Modified:**
- `src/translations/namespaces/en/locations.json` (line 4)
- `src/translations/en.ts` (line 3098)
- `src/i18n/messages/en.json` (line 3248)

**Change:**
```diff
- "title": "Best Cat Litter Deodorizer in {{city}} | Free Delivery",
+ "title": "Best Cat Litter Deodorizer in {{city}} | Purrify",
```

### 2. Missing `image` Field for Merchant Listing

**Problem:** Product structured data in location pages was missing the required `image` field for Merchant listing.

**Files Modified:**
- `src/components/sections/locations/createCityPage.tsx`

**Change:** Added `image` field to Product schema:
```typescript
{
  '@type': 'Product',
  name: `Purrify Cat Litter Odor Eliminator - ${profile.name}`,
  image: 'https://www.purrify.ca/optimized/logos/purrify-logo.png',  // Added
  offers: {
    // ...
  }
}
```

### 3. Missing `price` Field for Nested Offer

**Problem:** Offer schema in location pages was missing the required `price` field.

**Files Modified:**
- `src/components/sections/locations/createCityPage.tsx`

**Change:** Added `price` and `priceCurrency` fields to Offer schema:
```typescript
offers: {
  '@type': 'Offer',
  price: '29.99',           // Added
  priceCurrency: 'CAD',     // Added
  availability: 'https://schema.org/InStock',
  areaServed: {
    // ...
  }
}
```

### 4. Missing `address` Field for Local Business

**Problem:** LocalBusiness schema was missing the required `address` field.

**Files Modified:**
- `src/components/sections/locations/createCityPage.tsx`

**Change:** Added `address` field to LocalBusiness schema:
```typescript
{
  '@type': 'LocalBusiness',
  name: `Purrify - ${profile.name}`,
  // ...
  address: {                // Added
    '@type': 'PostalAddress',
    addressLocality: profile.name,
    addressRegion: provinceName,
    addressCountry: 'CA',
  },
  // ...
}
```

## Affected URLs

The following URLs will benefit from these fixes:

### Location Pages (Fixed):
- https://www.purrify.ca/locations/brampton/
- https://www.purrify.ca/locations/calgary/
- https://www.purrify.ca/locations/edmonton/
- https://www.purrify.ca/locations/montreal/
- https://www.purrify.ca/locations/surrey/
- https://www.purrify.ca/locations/vancouver/

### Other Pages with Pre-existing Schema (May Still Need Review):
- https://www.purrify.ca/learn/safety/ - Has Product snippet errors (needs offers or review)
- https://www.purrify.ca/retailers/ - Has Product snippet errors
- https://www.purrify.ca/us/ - Has Product snippet errors
- https://www.purrify.ca/products/ - Has Merchant listing errors (applicableCountry for return policy)
- https://www.purrify.ca/products/trial-size/ - Has inLanguage issue
- https://www.purrify.ca/stores/ - Has Local Business position property issue
- https://www.purrify.ca/tools/cat-litter-calculator/ - Has Software App aggregateRating issue

## Remaining Issues to Address

### 1. `/learn/safety/`, `/retailers/`, `/us/` - Product Snippet Errors
These pages have Product markup but are missing required fields:
- `aggregateRating` or `offers` or `review`

**Recommendation:** Either:
- Add proper Offer schema with price/availability
- Remove Product schema if these pages don't actually sell products
- Add AggregateRating schema if reviews are available

### 2. `/products/` - Merchant Return Policy
The MerchantReturnPolicy is missing `applicableCountry` field in some offers.

**Fix:** Ensure all `hasMerchantReturnPolicy` objects include:
```typescript
hasMerchantReturnPolicy: {
  '@type': 'MerchantReturnPolicy',
  applicableCountry: 'CA',  // or ['CA', 'US']
  // ...
}
```

### 3. `/products/trial-size/` - inLanguage Issue
The `inLanguage` property is not recognized for certain schema types.

**Fix:** Remove `inLanguage` from Product/Merchant listing schemas, or use proper language codes.

### 4. `/stores/` - Local Business position Property
The `position` property in ListItem is being flagged incorrectly.

**Note:** This is actually valid for BreadcrumbList - may be a false positive from Google.

### 5. `/tools/cat-litter-calculator/` - Software App
Missing `aggregateRating` or `review` for SoftwareApplication schema.

**Fix:** Either add review data or change schema type to WebPage/Article.

## Testing Recommendations

1. **Validate Structured Data:**
   Use Google's Rich Results Test:
   https://search.google.com/test/rich-results

2. **Validate Schema.org:**
   Use Schema Markup Validator:
   https://validator.schema.org/

3. **Monitor Google Search Console:**
   - Wait 3-7 days after deployment
   - Check for reduced error counts in Enhancement reports
   - Monitor for new issues

## Files Changed

```
src/translations/namespaces/en/locations.json
src/translations/en.ts
src/i18n/messages/en.json
src/components/sections/locations/createCityPage.tsx
scripts/fix-structured-data-errors.ts (new)
STRUCTURED_DATA_FIX_SUMMARY.md (new)
```

## Script for Future Use

The `scripts/fix-structured-data-errors.ts` script can be run for future bulk fixes:

```bash
npx tsx scripts/fix-structured-data-errors.ts
```

## Next Steps

1. Deploy these changes to production
2. Request re-indexing in Google Search Console for affected URLs
3. Monitor for improvements in the structured data errors report
4. Address remaining issues in `/learn/safety/`, `/retailers/`, `/us/` pages
