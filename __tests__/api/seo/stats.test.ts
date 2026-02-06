/**
 * SEO Stats API Tests
 * Tests for GET /api/seo/stats
 */

import { GET } from '../../../app/api/seo/stats/route';
import { NextResponse } from 'next/server';

describe('/api/seo/stats', () => {
  async function getResponseData(response: NextResponse) {
    return response.json();
  }

  it('should return SEO stats', async () => {
    const response = await GET();

    expect(response.status).toBe(200);
    expect(response).toBeInstanceOf(NextResponse);
    const data = await getResponseData(response);
    expect(data.success).toBe(true);
    expect(data.data).toBeDefined();
    expect(data.generatedAt).toBeDefined();
  });

  it('should include pages stats', async () => {
    const response = await GET();

    expect(response.status).toBe(200);
    const data = await getResponseData(response);

    expect(data.data.pages).toBeDefined();
    expect(data.data.pages.total).toBeGreaterThan(0);
    expect(data.data.pages.withEnhancedSEO).toBeGreaterThan(0);
    expect(data.data.pages.coverage).toMatch(/\d+%/);
  });

  it('should include cluster stats', async () => {
    const response = await GET();

    expect(response.status).toBe(200);
    const data = await getResponseData(response);

    expect(data.data.clusters).toBeDefined();
    expect(data.data.clusters.total).toBeGreaterThanOrEqual(0);
    expect(Array.isArray(data.data.clusters.clusters)).toBe(true);
  });

  it('should include link stats', async () => {
    const response = await GET();

    expect(response.status).toBe(200);
    const data = await getResponseData(response);

    expect(data.data.links).toBeDefined();
    expect(typeof data.data.links.suggestionsTotal).toBe('number');
    expect(typeof data.data.links.highPriority).toBe('number');
    expect(typeof data.data.links.mediumPriority).toBe('number');
    expect(typeof data.data.links.lowPriority).toBe('number');
  });

  it('should include schema stats', async () => {
    const response = await GET();

    expect(response.status).toBe(200);
    const data = await getResponseData(response);

    expect(data.data.schema).toBeDefined();
    expect(typeof data.data.schema.productPages).toBe('number');
    expect(typeof data.data.schema.blogPages).toBe('number');
    expect(typeof data.data.schema.learnPages).toBe('number');
    expect(typeof data.data.schema.faqEnabled).toBe('boolean');
    expect(typeof data.data.schema.breadcrumbsEnabled).toBe('boolean');
    expect(typeof data.data.schema.aggregateRatingEnabled).toBe('boolean');
  });

  it('should include meta stats', async () => {
    const response = await GET();

    expect(response.status).toBe(200);
    const data = await getResponseData(response);

    expect(data.data.meta).toBeDefined();
    expect(typeof data.data.meta.averageTitleLength).toBe('number');
    expect(typeof data.data.meta.averageDescriptionLength).toBe('number');
    expect(typeof data.data.meta.pagesWithTargetKeyword).toBe('number');
  });

  it('should return valid ISO timestamp', async () => {
    const response = await GET();

    expect(response.status).toBe(200);
    const data = await getResponseData(response);

    const timestamp = new Date(data.generatedAt);
    expect(timestamp.toString()).not.toBe('Invalid Date');
  });

  it('should show aggregate rating as enabled (Phase 8 complete)', async () => {
    const response = await GET();

    expect(response.status).toBe(200);
    const data = await getResponseData(response);

    expect(data.data.schema.aggregateRatingEnabled).toBe(true);
  });
});
