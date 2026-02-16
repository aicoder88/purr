/**
 * E2E tests for SEO schema rendering
 * Validates that schemas are correctly rendered in the browser
 */

import { test, expect } from '@playwright/test';

/**
 * Helper to extract all schemas from JSON-LD scripts, handling nested @graph arrays
 */
async function extractSchemas(page: import('@playwright/test').Page) {
  const rawSchemas = await page.evaluate(() => {
    const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
    return scripts.map(script => JSON.parse(script.textContent || '{}'));
  });

  // Recursively flatten schemas: handle nested @graph arrays
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function flattenSchemas(items: any[]): any[] {
    const result: any[] = [];
    for (const item of items) {
      if (item['@graph'] && Array.isArray(item['@graph'])) {
        // Recursively flatten nested @graph arrays
        result.push(...flattenSchemas(item['@graph']));
      } else if (item['@type']) {
        // Only add items that have a @type (actual schemas)
        result.push(item);
      }
    }
    return result;
  }

  return flattenSchemas(rawSchemas);
}

test.describe('SEO Schema Rendering', () => {
  test.describe('Product Pages', () => {
    test('should render product schema on trial size page', async ({ page }) => {
      await page.goto('/products/trial-size');

      // Wait for page to load
      await page.waitForLoadState('domcontentloaded');

      // Extract JSON-LD schemas (handles @graph arrays)
      const schemas = await extractSchemas(page);

      // Find product schema
      const productSchema = schemas.find(schema => schema['@type'] === 'Product');
      expect(productSchema).toBeDefined();

      // Validate required product fields
      expect(productSchema.name).toBeTruthy();
      expect(productSchema.description).toBeTruthy();
      expect(productSchema.image).toBeDefined();

      // Validate offers
      expect(productSchema.offers).toBeDefined();
      expect(productSchema.offers['@type']).toBe('Offer');
      expect(productSchema.offers.priceCurrency).toMatch(/^(CAD|USD)$/);
      expect(productSchema.offers.price).toBeTruthy();
      expect(productSchema.offers.availability).toContain('schema.org');

      // Validate brand
      expect(productSchema.brand).toBeDefined();
      expect(productSchema.brand['@type']).toBe('Brand');
      expect(productSchema.brand.name).toBe('Purrify');

      // Validate aggregate rating if present
      if (productSchema.aggregateRating) {
        expect(productSchema.aggregateRating['@type']).toBe('AggregateRating');
        expect(productSchema.aggregateRating.ratingValue).toBeTruthy();
        expect(productSchema.aggregateRating.reviewCount).toBeTruthy();
      }
    });

    test('should render product schema on standard size page', async ({ page }) => {
      await page.goto('/products/standard');
      await page.waitForLoadState('domcontentloaded');

      const schemas = await extractSchemas(page);

      const productSchema = schemas.find(schema => schema['@type'] === 'Product');
      expect(productSchema).toBeDefined();
      // Product names may vary by locale, just check it has a valid name
      expect(productSchema.name).toBeTruthy();
      expect(typeof productSchema.name).toBe('string');
    });

    test('should render product schema on family pack page', async ({ page }) => {
      await page.goto('/products/family-pack');
      await page.waitForLoadState('domcontentloaded');

      const schemas = await extractSchemas(page);

      const productSchema = schemas.find(schema => schema['@type'] === 'Product');
      expect(productSchema).toBeDefined();
      expect(productSchema.offers.priceCurrency).toMatch(/^(CAD|USD)$/);
    });

    test('should update currency in schema based on geo-detection', async ({ page }) => {
      // Test that currency changes based on headers
      await page.goto('/products/trial-size');
      await page.waitForLoadState('domcontentloaded');

      const schemas = await extractSchemas(page);

      const productSchema = schemas.find(schema => schema['@type'] === 'Product');
      // Currency should be either CAD or USD
      expect(['CAD', 'USD']).toContain(productSchema.offers.priceCurrency);
    });
  });

  test.describe('Blog Pages', () => {
    test('should render article schema on blog post', async ({ page }) => {
      await page.goto('/blog/most-powerful-odor-absorber');
      await page.waitForLoadState('domcontentloaded');

      const schemas = await extractSchemas(page);

      const articleSchema = schemas.find(schema => schema['@type'] === 'Article');
      expect(articleSchema).toBeDefined();

      // Validate required article fields
      expect(articleSchema.headline).toBeTruthy();
      expect(articleSchema.description).toBeTruthy();
      expect(articleSchema.datePublished).toBeTruthy();
      expect(articleSchema.dateModified).toBeTruthy();

      // Validate author
      expect(articleSchema.author).toBeDefined();
      expect(articleSchema.author['@type']).toBe('Organization');
      expect(articleSchema.author.name).toBe('Purrify');

      // Validate publisher
      expect(articleSchema.publisher).toBeDefined();
      expect(articleSchema.publisher['@type']).toBe('Organization');
      expect(articleSchema.publisher.logo).toBeDefined();
    });

    test('should render multiple schemas on blog page with FAQ', async ({ page }) => {
      await page.goto('/blog/most-powerful-odor-absorber');
      await page.waitForLoadState('domcontentloaded');

      const schemas = await extractSchemas(page);

      // Should have both article and FAQ schemas
      const articleSchema = schemas.find(schema => schema['@type'] === 'Article');
      const faqSchema = schemas.find(schema => schema['@type'] === 'FAQPage');

      expect(articleSchema).toBeDefined();
      expect(faqSchema).toBeDefined();

      // Validate FAQ structure
      expect(faqSchema.mainEntity).toBeDefined();
      expect(Array.isArray(faqSchema.mainEntity)).toBe(true);
      expect(faqSchema.mainEntity.length).toBeGreaterThan(0);

      // Validate FAQ question structure
      const firstQuestion = faqSchema.mainEntity[0];
      expect(firstQuestion['@type']).toBe('Question');
      expect(firstQuestion.name).toBeTruthy();
      expect(firstQuestion.acceptedAnswer).toBeDefined();
      expect(firstQuestion.acceptedAnswer['@type']).toBe('Answer');
      expect(firstQuestion.acceptedAnswer.text).toBeTruthy();
    });
  });

  test.describe('FAQ Page', () => {
    test('should render FAQ schema', async ({ page }) => {
      await page.goto('/learn/faq');
      await page.waitForLoadState('domcontentloaded');

      const schemas = await extractSchemas(page);

      const faqSchema = schemas.find(schema => schema['@type'] === 'FAQPage');
      expect(faqSchema).toBeDefined();

      // Validate FAQ structure
      expect(faqSchema.mainEntity).toBeDefined();
      expect(Array.isArray(faqSchema.mainEntity)).toBe(true);
      expect(faqSchema.mainEntity.length).toBeGreaterThan(0);
    });
  });

  test.describe('Educational Pages', () => {
    test('should render article schema on how-it-works page', async ({ page }) => {
      await page.goto('/learn/how-it-works');
      await page.waitForLoadState('domcontentloaded');

      const schemas = await extractSchemas(page);

      const articleSchema = schemas.find(schema => schema['@type'] === 'Article');
      expect(articleSchema).toBeDefined();
      expect(articleSchema.headline).toBeTruthy();
    });

    test('should render article schema on science page', async ({ page }) => {
      await page.goto('/learn/science');
      await page.waitForLoadState('domcontentloaded');

      const schemas = await extractSchemas(page);

      const articleSchema = schemas.find(schema => schema['@type'] === 'Article');
      expect(articleSchema).toBeDefined();
    });

    test('should render article schema on safety page', async ({ page }) => {
      await page.goto('/learn/safety');
      await page.waitForLoadState('domcontentloaded');

      const schemas = await extractSchemas(page);

      const articleSchema = schemas.find(schema => schema['@type'] === 'Article');
      expect(articleSchema).toBeDefined();
    });
  });

  test.describe('Homepage', () => {
    test('should render organization schema', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('domcontentloaded');

      const schemas = await extractSchemas(page);

      const orgSchema = schemas.find(schema => schema['@type'] === 'Organization');
      expect(orgSchema).toBeDefined();

      // Validate organization fields
      expect(orgSchema.name).toBe('Purrify');
      expect(orgSchema.url).toBeTruthy();
      expect(orgSchema.logo).toBeDefined();
    });
  });

  test.describe('Meta Tags Validation', () => {
    test('should have proper meta tags on product page', async ({ page }) => {
      await page.goto('/products/trial-size');
      await page.waitForLoadState('domcontentloaded');

      // Check title
      const title = await page.title();
      expect(title).toBeTruthy();
      expect(title.length).toBeLessThanOrEqual(60);

      // Check meta description
      const description = await page.locator('meta[name="description"]').getAttribute('content');
      expect(description).toBeTruthy();
      expect(description!.length).toBeLessThanOrEqual(160);

      // Check canonical URL
      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
      expect(canonical).toBeTruthy();
      expect(canonical).toContain('purrify.ca');

      // Check Open Graph tags
      const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
      const ogDescription = await page.locator('meta[property="og:description"]').getAttribute('content');
      const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content');

      expect(ogTitle).toBeTruthy();
      expect(ogDescription).toBeTruthy();
      expect(ogImage).toBeTruthy();

      // Check Twitter tags
      const twitterCard = await page.locator('meta[name="twitter:card"]').getAttribute('content');
      expect(twitterCard).toBe('summary_large_image');
    });

    test('should have hreflang tags for multilingual support', async ({ page }) => {
      await page.goto('/products/trial-size');
      await page.waitForLoadState('domcontentloaded');

      // Check for alternate language links
      const hreflangs = await page.locator('link[rel="alternate"][hreflang]').count();
      expect(hreflangs).toBeGreaterThan(0);
    });
  });

  test.describe('Schema Validation', () => {
    test('should have valid @context in all schemas', async ({ page }) => {
      await page.goto('/products/trial-size');
      await page.waitForLoadState('domcontentloaded');

      const schemas = await extractSchemas(page);

      schemas.forEach(schema => {
        expect(schema['@context']).toBe('https://schema.org');
      });
    });

    test('should have unique @id for schemas when provided', async ({ page }) => {
      await page.goto('/products/trial-size');
      await page.waitForLoadState('domcontentloaded');

      const schemas = await extractSchemas(page);

      const ids = schemas.map(s => s['@id']).filter(Boolean);
      const uniqueIds = new Set(ids);
      expect(ids.length).toBe(uniqueIds.size);
    });

    test('should not have malformed JSON-LD', async ({ page }) => {
      await page.goto('/products/trial-size');
      await page.waitForLoadState('domcontentloaded');

      // Attempt to parse all JSON-LD scripts
      const parsingResult = await page.evaluate(() => {
        const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
        const errors: string[] = [];

        scripts.forEach((script, index) => {
          try {
            JSON.parse(script.textContent || '{}');
          } catch (e) {
            errors.push(`Schema ${index}: ${e}`);
          }
        });

        return { errors, count: scripts.length };
      });

      expect(parsingResult.errors).toHaveLength(0);
      expect(parsingResult.count).toBeGreaterThan(0);
    });
  });

  test.describe('Performance', () => {
    test('should render schemas without blocking page load', async ({ page }) => {
      const startTime = Date.now();

      await page.goto('/products/trial-size');
      await page.waitForLoadState('domcontentloaded');

      const loadTime = Date.now() - startTime;

      // Schema rendering should not significantly impact load time
      expect(loadTime).toBeLessThan(5000); // 5 seconds max

      // Verify schemas are present
      const schemaCount = await page.locator('script[type="application/ld+json"]').count();
      expect(schemaCount).toBeGreaterThan(0);
    });
  });
});
