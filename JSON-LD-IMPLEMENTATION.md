# Comprehensive JSON-LD Structured Data Implementation

This document outlines the complete JSON-LD structured data implementation for the Purrify e-commerce website, designed to maximize search visibility and rich snippets across all key pages.

## Overview

The implementation provides comprehensive structured data for:
- Homepage with organization, website, and product catalog schemas
- Product pages with detailed product, offer, and review schemas
- Learn pages with article schemas and FAQ data
- Location pages with local business schemas for 7 Canadian cities
- Multilingual support for English (en), French (fr), and Chinese (zh)

## Core Components

### 1. Enhanced SEO Utilities (`src/lib/seo-utils.ts`)

Extended the existing SEO utilities with advanced schema generators:

#### New Functions Added:
- `generateFAQSchema(locale)` - FAQ page structured data
- `generateOfferSchema(product, locale)` - Enhanced product offers with shipping details
- `generateLocalBusinessSchema(cityName, province, locale)` - Local business data for cities
- `generateReviewSchema(productId, locale)` - Customer review schemas
- `generateHomepageSchema(locale)` - Complete homepage schema graph
- `generateProductPageSchema(productId, locale)` - Comprehensive product page schemas
- `generateArticlePageSchema(title, description, path, locale, options)` - Article/blog schemas
- `generateLocationPageSchema(cityName, province, locale)` - Location page schemas
- `generateJSONLD(schema)` - Utility to generate script tags

### 2. JSON-LD Schema Component (`src/components/seo/json-ld-schema.tsx`)

React component for easy schema implementation:

```typescript
// Usage Examples:
<HomepageSchema locale='en' />
<ProductSchema productId='purrify-60g' locale='en' />
<ArticleSchema title="..." description="..." path="/learn/..." />
<LocationSchema cityName='Montreal' province='Quebec' />
```

## Implementation by Page Type

### Homepage Schema (`pages/index.tsx`)

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

### Product Pages

**Pages Implemented:**
- `/products/trial-size` - Purrify 17g ($6.99)
- `/products/standard` - Purrify 60g ($19.99) 
- `/products/family-pack` - Purrify 120g ($29.99)
- `/products/compare` - Product comparison page

**Schemas per Product Page:**
- **Product Schema** - Complete product information
  - Brand, manufacturer, category, SKU, MPN, GTIN13
  - Physical properties (weight, size, color, material)
  - Usage and audience targeting
  - Multi-language support
- **Offer Schema** - Detailed pricing and availability
  - Canadian dollar pricing (CAD)
  - Shipping details and delivery times
  - Return policy information
  - Stock availability
- **Review Schema** - Customer testimonials
  - 5-star ratings from real customers
  - Review text and author information
  - Publication dates
- **AggregateRating Schema** - Overall product ratings
  - 4.9/5 average rating
  - 127+ reviews
- **Breadcrumb Schema** - Navigation structure

### Learn/Article Pages

**Pages Implemented:**
- `/learn/activated-carbon-benefits` - Educational article
- `/learn/how-it-works` - Science explanation
- Additional learn pages as needed

**Article Schema Features:**
- Complete article metadata (title, description, URL)
- Author and publisher information
- Publication and modification dates
- Word count and reading time
- Article categories and keywords
- Educational content classification
- FAQ integration where relevant

### Location Pages

**Cities Implemented:**
- Montreal, Quebec
- Toronto, Ontario  
- Vancouver, British Columbia
- Calgary, Alberta (ready)
- Ottawa, Ontario (ready)
- Hamilton, Ontario (ready)
- Quebec City, Quebec (ready)

**Local Business Schema per City:**
- Organization and LocalBusiness types
- City-specific geo-coordinates
- Local address and contact information
- Service area definitions
- Operating hours
- Local product offerings
- Customer service contact points
- Multi-language availability

## Rich Snippet Optimizations

### Product Rich Snippets
- Star ratings display in search results
- Price and availability information
- Product images and descriptions
- Shipping and return policy details

### FAQ Rich Snippets
- Expandable Q&A in search results
- Localized question and answer pairs
- Multiple FAQ entries per page

### Local Business Rich Snippets
- Business hours and location
- Contact information
- Service area coverage
- Customer rating information

### Article Rich Snippets
- Publication dates and author info
- Reading time estimates
- Article categorization
- Related topic connections

## Multilingual Implementation

### Language Support
- **English (en)** - Default language, purrify.ca
- **French (fr)** - fr.purrify.ca subdomain
- **Chinese (zh)** - zh.purrify.ca subdomain

### Localized Content
- All schema text content translated
- Currency formatting (CAD for all locales)
- Date formatting per locale standards
- Appropriate language tags (en-CA, fr-CA, zh-CN)

## SEO Performance Benefits

### Expected Improvements
1. **Rich Snippets Display**
   - Product prices and ratings in search results
   - FAQ expansions directly in SERP
   - Local business information panels

2. **Enhanced Click-Through Rates**
   - Visual elements (stars, prices) attract more clicks
   - Detailed information builds trust before clicking
   - Local search prominence for city pages

3. **Voice Search Optimization**
   - Structured FAQ data for voice queries
   - Local business info for "near me" searches
   - Product information for shopping queries

4. **Knowledge Graph Integration**
   - Business entity recognition
   - Product catalog understanding
   - Local presence establishment

## Technical Implementation Details

### Schema Validation
All schemas follow schema.org standards and validate against:
- Google's Rich Results Test
- Schema.org validator
- Structured Data Testing Tool

### Performance Considerations
- Schemas generated server-side for better performance
- Minimal client-side JavaScript for schema generation
- Efficient caching of locale-specific schemas

### Error Handling
- Graceful fallbacks for missing product data
- Default values for incomplete information
- Validation checks before schema output

## Maintenance and Updates

### Regular Updates Needed
1. **Product Information**
   - Pricing updates
   - Availability changes
   - New product additions

2. **Review Data**
   - Fresh customer testimonials
   - Updated rating averages
   - Review count maintenance

3. **Business Information**
   - Contact details
   - Operating hours
   - Service area expansions

### Monitoring
- Google Search Console for rich snippet performance
- Schema validation tools for error detection
- Search result appearance monitoring

## Files Modified

### Core Implementation
- `src/lib/seo-utils.ts` - Extended with comprehensive schema generators
- `src/components/seo/json-ld-schema.tsx` - New React component

### Page Updates
- `pages/index.tsx` - Homepage schema implementation
- `pages/products/trial-size.tsx` - Trial size product schema
- `pages/products/standard.tsx` - Standard size product schema (NEW)
- `pages/products/family-pack.tsx` - Family pack product schema (NEW)
- `pages/learn/activated-carbon-benefits.tsx` - Article schema
- `pages/learn/how-it-works.tsx` - Article schema
- `pages/locations/montreal.tsx` - Local business schema
- `pages/locations/toronto.tsx` - Local business schema
- `pages/locations/vancouver.tsx` - Local business schema

## Usage Examples

### Adding Schema to New Product Page
```typescript
import { ProductSchema } from '../../src/components/seo/json-ld-schema';

// In your page component
<ProductSchema productId='new-product-id' locale={locale} />
```

### Adding Schema to New Article
```typescript
import { ArticleSchema } from '../../src/components/seo/json-ld-schema';

<ArticleSchema
  title="Article Title"
  description="Article description"
  path="/learn/new-article"
  locale='en'
  options={{
    category: 'Pet Care',
    keywords: ['keyword1', 'keyword2'],
    wordCount: 2000,
    readingTime: 8
  }}
/>
```

### Adding Schema to New Location
```typescript
import { LocationSchema } from '../../src/components/seo/json-ld-schema';

<LocationSchema
  cityName='CityName'
  province='Province'
  locale='en'
/>
```

This implementation provides comprehensive JSON-LD structured data coverage across all key pages, maximizing search visibility and rich snippet opportunities for the Purrify e-commerce website.