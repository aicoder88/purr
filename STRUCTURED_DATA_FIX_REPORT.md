
# Structured Data Fix Report

## Issues Identified from CSV

### 1. Missing `image` field for Merchant listing
**Affected URLs:**
- /locations/brampton/
- /locations/calgary/
- /locations/edmonton/
- /locations/montreal/
- /locations/surrey/
- /locations/vancouver/
- /products/

**Fix Required:**
Add image field to Product structured data in the offers:
```typescript
// In createCityPage.tsx, add to Product schema:
image: 'https://www.purrify.ca/optimized/logos/purrify-logo.png',
```

### 2. Missing `price` or `priceSpecification.price` for nested Offer
**Affected URLs:** Same as above

**Fix Required:**
Ensure Offer has price field:
```typescript
offers: {
  '@type': 'Offer',
  price: '29.99',  // Add actual product price
  priceCurrency: 'CAD',
  // ... rest of offer
}
```

### 3. Missing `address` field for Local Business
**Affected URLs:**
- /locations/brampton/
- /locations/calgary/
- /locations/edmonton/
- /locations/montreal/
- /locations/surrey/
- /locations/vancouver/

**Fix Required:**
Add address to LocalBusiness schema:
```typescript
address: {
  '@type': 'PostalAddress',
  addressLocality: cityName,
  addressRegion: province,
  addressCountry: 'CA'
}
```

### 4. Missing `aggregateRating` or `offers` or `review` for Product snippet
**Affected URLs:**
- /learn/safety/
- /locations/* (all city pages)
- /retailers/
- /us/

**Note:** These pages have Product markup without required fields. 
Recommendation: Either:
a) Add the required fields (offers with price)
b) Remove Product schema if not actually selling products on these pages

## Manual Fixes Required

The following files need manual code changes:

1. **app/locations/[citySlug]/page.tsx**
   - Update generateLocalBusinessSchema to include address
   
2. **src/components/sections/locations/createCityPage.tsx**
   - Add image field to Product schema (around line 363)
   - Add price field to Offer schema
   - Add address to LocalBusiness schema (around line 381)

3. **src/lib/seo-utils.ts**
   - Update generateLocalBusinessSchema function to always include address
   - Update generateProductPageSchema to ensure image is included in offers

4. **app/learn/safety/page.tsx** (if it has Product schema)
   - Remove Product schema or add required offers/review fields

5. **app/retailers/page.tsx** (if it has Product schema)
   - Remove Product schema or add required offers/review fields

6. **app/us/page.tsx** (if it has Product schema)
   - Remove Product schema or add required offers/review fields
