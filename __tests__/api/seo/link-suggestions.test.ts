/**
 * Link Suggestions API Tests
 * Tests for GET /api/seo/link-suggestions
 */

import { createMocks } from 'node-mocks-http';
import handler from '../../../pages/api/seo/link-suggestions';

describe('/api/seo/link-suggestions', () => {
  it('should reject non-GET requests', async () => {
    const { req, res } = createMocks({
      method: 'POST',
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(405);
    expect(JSON.parse(res._getData())).toEqual({
      success: false,
      error: 'Method not allowed. Use GET.',
    });
  });

  it('should return all suggestions without parameters', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    const data = JSON.parse(res._getData());
    expect(data.success).toBe(true);
    expect(data.data).toBeDefined();
    expect(Array.isArray(data.data.suggestions)).toBe(true);
    expect(data.data.total).toBeGreaterThanOrEqual(0);
    expect(typeof data.data.highPriority).toBe('number');
    expect(typeof data.data.mediumPriority).toBe('number');
    expect(typeof data.data.lowPriority).toBe('number');
  });

  it('should filter by page', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        page: '/blog',
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    const data = JSON.parse(res._getData());
    expect(data.success).toBe(true);
    // All suggestions should be FROM the /blog page
    data.data.suggestions.forEach((s: { fromPage: string }) => {
      expect(s.fromPage).toBe('/blog');
    });
  });

  it('should get incoming link suggestions with direction=to', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        page: '/products/trial-size',
        direction: 'to',
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    const data = JSON.parse(res._getData());
    expect(data.success).toBe(true);
    // All suggestions should be TO the /products/trial-size page
    data.data.suggestions.forEach((s: { toPage: string }) => {
      expect(s.toPage).toBe('/products/trial-size');
    });
  });

  it('should filter by priority', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        priority: 'high',
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    const data = JSON.parse(res._getData());
    expect(data.success).toBe(true);
    // All suggestions should be high priority
    data.data.suggestions.forEach((s: { priority: string }) => {
      expect(s.priority).toBe('high');
    });
  });

  it('should respect limit parameter', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        limit: '5',
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    const data = JSON.parse(res._getData());
    expect(data.success).toBe(true);
    expect(data.data.suggestions.length).toBeLessThanOrEqual(5);
  });

  it('should group suggestions when requested', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        grouped: 'true',
        limit: '20',
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    const data = JSON.parse(res._getData());
    expect(data.success).toBe(true);
    expect(data.grouped).toBeDefined();
    expect(typeof data.grouped).toBe('object');
  });

  it('should return suggestions with correct structure', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        limit: '1',
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    const data = JSON.parse(res._getData());

    if (data.data.suggestions.length > 0) {
      const suggestion = data.data.suggestions[0];
      expect(suggestion).toHaveProperty('fromPage');
      expect(suggestion).toHaveProperty('toPage');
      expect(suggestion).toHaveProperty('reason');
      expect(suggestion).toHaveProperty('priority');
      expect(['high', 'medium', 'low']).toContain(suggestion.priority);
    }
  });
});
