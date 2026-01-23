/**
 * SEO Validation API Tests
 * Tests for POST /api/seo/validate
 */

import { createMocks } from 'node-mocks-http';
import handler from '../../../pages/api/seo/validate';

describe('/api/seo/validate', () => {
  it('should reject non-POST requests', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(405);
    expect(JSON.parse(res._getData())).toEqual({
      success: false,
      error: 'Method not allowed. Use POST.',
    });
  });

  it('should require title, description, or schema', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {},
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(JSON.parse(res._getData()).error).toContain('Provide title/description');
  });

  describe('meta validation', () => {
    it('should validate title and description', async () => {
      const { req, res } = createMocks({
        method: 'POST',
        body: {
          title: 'Best Cat Litter Odor Eliminator - Purrify',
          description: 'Stop cat litter smell instantly with our activated carbon odor eliminator. Free shipping on all orders.',
        },
      });

      await handler(req, res);

      expect(res._getStatusCode()).toBe(200);
      const data = JSON.parse(res._getData());
      expect(data.success).toBe(true);
      expect(data.meta).toBeDefined();
      expect(data.meta.score).toBeGreaterThanOrEqual(0);
      expect(data.meta.score).toBeLessThanOrEqual(100);
      expect(Array.isArray(data.meta.suggestions)).toBe(true);
    });

    it('should include title length info', async () => {
      const { req, res } = createMocks({
        method: 'POST',
        body: {
          title: 'Test Title',
        },
      });

      await handler(req, res);

      expect(res._getStatusCode()).toBe(200);
      const data = JSON.parse(res._getData());
      expect(data.meta.title).toBeDefined();
      expect(data.meta.title.length).toBe(10);
      expect(data.meta.title.isOptimal).toBe(false); // Too short
    });

    it('should include description length info', async () => {
      const { req, res } = createMocks({
        method: 'POST',
        body: {
          description: 'A'.repeat(150),
        },
      });

      await handler(req, res);

      expect(res._getStatusCode()).toBe(200);
      const data = JSON.parse(res._getData());
      expect(data.meta.description).toBeDefined();
      expect(data.meta.description.length).toBe(150);
      expect(data.meta.description.isOptimal).toBe(true);
    });

    it('should validate with target keyword', async () => {
      const { req, res } = createMocks({
        method: 'POST',
        body: {
          title: 'Best Cat Litter Deodorizer',
          description: 'Eliminate cat litter smell with our premium deodorizer.',
          targetKeyword: 'cat litter deodorizer',
        },
      });

      await handler(req, res);

      expect(res._getStatusCode()).toBe(200);
      const data = JSON.parse(res._getData());
      expect(data.meta.score).toBeGreaterThan(0);
    });
  });

  describe('schema validation', () => {
    it('should validate valid Product schema', async () => {
      const { req, res } = createMocks({
        method: 'POST',
        body: {
          schema: {
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: 'Purrify Cat Litter Freshener',
            image: 'https://purrify.ca/images/product.jpg',
            description: 'Activated carbon cat litter additive',
            offers: {
              '@type': 'Offer',
              price: '14.99',
              priceCurrency: 'CAD',
              availability: 'https://schema.org/InStock',
            },
          },
        },
      });

      await handler(req, res);

      expect(res._getStatusCode()).toBe(200);
      const data = JSON.parse(res._getData());
      expect(data.schema).toBeDefined();
      expect(data.schema.isValid).toBe(true);
      expect(data.schema.errors).toHaveLength(0);
    });

    it('should detect invalid schema', async () => {
      const { req, res } = createMocks({
        method: 'POST',
        body: {
          schema: {
            '@context': 'https://schema.org',
            '@type': 'Product',
            // Missing required fields: name, image, description, offers
          },
        },
      });

      await handler(req, res);

      expect(res._getStatusCode()).toBe(200);
      const data = JSON.parse(res._getData());
      expect(data.schema).toBeDefined();
      expect(data.schema.isValid).toBe(false);
      expect(data.schema.errors.length).toBeGreaterThan(0);
    });

    it('should validate both meta and schema', async () => {
      const { req, res } = createMocks({
        method: 'POST',
        body: {
          title: 'Test Product',
          description: 'A test product description for testing.',
          schema: {
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: 'Test Product',
            image: 'https://example.com/image.jpg',
            description: 'Test description',
            offers: {
              '@type': 'Offer',
              price: '9.99',
              priceCurrency: 'USD',
              availability: 'https://schema.org/InStock',
            },
          },
        },
      });

      await handler(req, res);

      expect(res._getStatusCode()).toBe(200);
      const data = JSON.parse(res._getData());
      expect(data.meta).toBeDefined();
      expect(data.schema).toBeDefined();
    });
  });
});
