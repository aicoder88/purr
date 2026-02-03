/**
 * Link Suggestions API Tests
 * Tests for GET /api/seo/link-suggestions
 */

import { GET } from '../../../app/api/seo/link-suggestions/route';

describe('/api/seo/link-suggestions', () => {
  function createRequest(url: string): Request {
    return new Request(url);
  }

  async function getResponseData(response: Response) {
    return response.json();
  }

  it('should return all suggestions without parameters', async () => {
    const req = createRequest('http://localhost:3000/api/seo/link-suggestions');
    const response = await GET(req);

    expect(response.status).toBe(200);
    const data = await getResponseData(response);
    expect(data.success).toBe(true);
    expect(data.data).toBeDefined();
    expect(Array.isArray(data.data.suggestions)).toBe(true);
    expect(data.data.total).toBeGreaterThanOrEqual(0);
    expect(typeof data.data.highPriority).toBe('number');
    expect(typeof data.data.mediumPriority).toBe('number');
    expect(typeof data.data.lowPriority).toBe('number');
  });

  it('should filter by page', async () => {
    const req = createRequest('http://localhost:3000/api/seo/link-suggestions?page=/blog');
    const response = await GET(req);

    expect(response.status).toBe(200);
    const data = await getResponseData(response);
    expect(data.success).toBe(true);
    // All suggestions should be FROM the /blog page
    data.data.suggestions.forEach((s: { fromPage: string }) => {
      expect(s.fromPage).toBe('/blog');
    });
  });

  it('should get incoming link suggestions with direction=to', async () => {
    const req = createRequest('http://localhost:3000/api/seo/link-suggestions?page=/products/trial-size&direction=to');
    const response = await GET(req);

    expect(response.status).toBe(200);
    const data = await getResponseData(response);
    expect(data.success).toBe(true);
    // All suggestions should be TO the /products/trial-size page
    data.data.suggestions.forEach((s: { toPage: string }) => {
      expect(s.toPage).toBe('/products/trial-size');
    });
  });

  it('should filter by priority', async () => {
    const req = createRequest('http://localhost:3000/api/seo/link-suggestions?priority=high');
    const response = await GET(req);

    expect(response.status).toBe(200);
    const data = await getResponseData(response);
    expect(data.success).toBe(true);
    // All suggestions should be high priority
    data.data.suggestions.forEach((s: { priority: string }) => {
      expect(s.priority).toBe('high');
    });
  });

  it('should respect limit parameter', async () => {
    const req = createRequest('http://localhost:3000/api/seo/link-suggestions?limit=5');
    const response = await GET(req);

    expect(response.status).toBe(200);
    const data = await getResponseData(response);
    expect(data.success).toBe(true);
    expect(data.data.suggestions.length).toBeLessThanOrEqual(5);
  });

  it('should group suggestions when requested', async () => {
    const req = createRequest('http://localhost:3000/api/seo/link-suggestions?grouped=true&limit=20');
    const response = await GET(req);

    expect(response.status).toBe(200);
    const data = await getResponseData(response);
    expect(data.success).toBe(true);
    expect(data.grouped).toBeDefined();
    expect(typeof data.grouped).toBe('object');
  });

  it('should return suggestions with correct structure', async () => {
    const req = createRequest('http://localhost:3000/api/seo/link-suggestions?limit=1');
    const response = await GET(req);

    expect(response.status).toBe(200);
    const data = await getResponseData(response);

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
