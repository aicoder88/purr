# SEO Structured Data Integration Guide

This guide shows how to integrate structured data into Next.js pages using the StructuredDataGenerator system.

## Components

### StructuredData Component

The main component for rendering Schema.org JSON-LD structured data.

```tsx
import { StructuredData } from '@/components/seo/StructuredData';
```

### Convenience Components

Pre-configured components for common schema types:

- `ProductStructuredData` - For product pages
- `BlogPostStructuredData` - For blog posts
- `OrganizationStructuredData` - For organization info
- `BreadcrumbsStructuredData` - For breadcrumb navigation
- `FAQStructuredData` - For FAQ pages

## Usage Examples

### Product Page

```tsx
import { ProductStructuredData } from '@/components/seo/StructuredData';
import { createProductData, getFullUrl } from '@/lib/seo/seo-helpers';

export default function ProductPage() {
  const productData = createProductData({
    name: 'Purrify 12g Trial Size',
    description: 'Try Purrify risk-free with our 12g trial size.',
    images: [
      'https://purrify.ca/images/trial-size.jpg',
      'https://purrify.ca/images/trial-size-2.jpg'
    ],
    price: 9.99,
    currency: 'CAD',
    inStock: true,
    url: getFullUrl('/products/trial-size'),
    sku: 'PURR-TRIAL-12G',
    brand: 'Purrify',
    rating: {
      value: 4.8,
      count: 127
    }
  });

  return (
    <>
      <ProductStructuredData data={productData} validate={process.env.NODE_ENV === 'development'} />
      {/* Page content */}
    </>
  );
}
```

### Blog Post Page

```tsx
import { BlogPostStructuredData } from '@/components/seo/StructuredData';
import { createBlogPostData, getFullUrl, formatDateISO } from '@/lib/seo/seo-helpers';

export default function BlogPost({ post }) {
  const blogData = createBlogPostData({
    title: post.title,
    excerpt: post.excerpt,
    featuredImage: post.image,
    publishDate: formatDateISO(post.publishedAt),
    modifiedDate: formatDateISO(post.updatedAt),
    author: post.author || 'Purrify Team',
    url: getFullUrl(`/blog/${post.slug}`),
    categories: post.categories,
    tags: post.tags,
    wordCount: post.wordCount
  });

  return (
    <>
      <BlogPostStructuredData data={blogData} />
      {/* Page content */}
    </>
  );
}
```

### Homepage with Organization

```tsx
import { OrganizationStructuredData } from '@/components/seo/StructuredData';
import { createOrganizationData } from '@/lib/seo/seo-helpers';

export default function HomePage() {
  const orgData = createOrganizationData({
    name: 'Purrify',
    url: 'https://purrify.ca',
    logo: 'https://purrify.ca/purrify-logo.png',
    description: 'Natural cat litter odor control using activated carbon technology',
    email: 'support@purrify.ca',
    socialProfiles: [
      'https://facebook.com/purrify',
      'https://twitter.com/purrify',
      'https://instagram.com/purrify'
    ]
  });

  return (
    <>
      <OrganizationStructuredData data={orgData} />
      {/* Page content */}
    </>
  );
}
```

### Breadcrumbs

```tsx
import { BreadcrumbsStructuredData } from '@/components/seo/StructuredData';
import { getFullUrl } from '@/lib/seo/seo-helpers';

export default function ProductPage() {
  const breadcrumbs = [
    { name: 'Home', url: getFullUrl('/') },
    { name: 'Products', url: getFullUrl('/products') },
    { name: 'Trial Size', url: getFullUrl('/products/trial-size') }
  ];

  return (
    <>
      <BreadcrumbsStructuredData data={breadcrumbs} />
      {/* Page content */}
    </>
  );
}
```

### FAQ Page

```tsx
import { FAQStructuredData } from '@/components/seo/StructuredData';

export default function FAQPage() {
  const faqs = [
    {
      question: 'How does Purrify work?',
      answer: 'Purrify uses activated carbon to absorb and neutralize odors at the molecular level.'
    },
    {
      question: 'Is Purrify safe for cats?',
      answer: 'Yes, Purrify is 100% natural and safe for cats, humans, and the environment.'
    }
  ];

  return (
    <>
      <FAQStructuredData data={faqs} />
      {/* Page content */}
    </>
  );
}
```

## Validation

Enable validation in development to catch schema errors:

```tsx
<ProductStructuredData 
  data={productData} 
  validate={process.env.NODE_ENV === 'development'} 
/>
```

Validation errors and warnings will appear in the console.

## Direct Generator Usage

For advanced use cases, use the StructuredDataGenerator directly:

```tsx
import { StructuredDataGenerator } from '@/lib/seo/structured-data-generator';

const generator = new StructuredDataGenerator({
  baseUrl: 'https://purrify.ca',
  organizationName: 'Purrify',
  organizationLogo: 'https://purrify.ca/logo.png'
});

// Generate schema
const schema = generator.generateProduct(productData);

// Validate schema
const validation = generator.validateSchema(schema);
if (!validation.valid) {
  console.error('Validation errors:', validation.errors);
}

// Render in page
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: schema }}
/>
```

## Testing Structured Data

### Google Rich Results Test

Test your structured data with Google's tool:
https://search.google.com/test/rich-results

### Schema.org Validator

Validate against Schema.org specifications:
https://validator.schema.org/

### Browser DevTools

Inspect the rendered JSON-LD in your page source:

1. View page source (Ctrl+U / Cmd+U)
2. Search for `application/ld+json`
3. Verify the JSON structure

## Best Practices

1. **Always include required fields** - Each schema type has required fields that must be present
2. **Use absolute URLs** - All URLs should be absolute (https://...)
3. **Validate dates** - Use ISO 8601 format (YYYY-MM-DDTHH:mm:ss.sssZ)
4. **Keep descriptions concise** - Meta descriptions should be 150-160 characters
5. **Include images** - Always provide high-quality images for products and articles
6. **Update modified dates** - Keep dateModified current when content changes
7. **Test regularly** - Use Google's Rich Results Test after changes

## Common Issues

### Missing Required Fields

```
Error: Product missing required field: offers
```

**Solution:** Ensure all required fields are provided in your data object.

### Invalid URL Format

```
Error: url is not a valid URL
```

**Solution:** Use `getFullUrl()` helper to ensure absolute URLs.

### Invalid Date Format

```
Error: datePublished is not a valid ISO 8601 date
```

**Solution:** Use `formatDateISO()` helper to format dates correctly.

## Migration from Inline JSON-LD

If you have existing inline JSON-LD, migrate to the component system:

**Before:**
```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'Product Name',
      // ... more fields
    })
  }}
/>
```

**After:**
```tsx
<ProductStructuredData data={productData} />
```

Benefits:
- Type safety with TypeScript
- Automatic validation
- Consistent schema generation
- Easier maintenance
- Reusable across pages
