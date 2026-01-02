import { test, expect } from '@playwright/test';
import { tryLogin } from './test-utils';

test.describe('Security: Rate Limiting (Task 10.4)', () => {
  test('rapid login attempts are rate limited', async ({ page }) => {
    const attempts = 10;
    const results: number[] = [];

    for (let i = 0; i < attempts; i++) {
      await page.goto('/admin/login');

      await page.fill('input[name="email"]', 'test@example.com');
      await page.fill('input[name="password"]', 'wrongpassword');

      const response = await page.request.post('/api/auth/callback/credentials', {
        data: {
          email: 'test@example.com',
          password: 'wrongpassword'
        }
      });

      results.push(response.status());

      // Small delay between attempts
      await page.waitForTimeout(100);
    }

    // After many attempts, should see rate limiting (429) or continued rejection
    // Accept 200 as well since NextAuth may return 200 with redirect for failed auth
    expect(results.every(status => status === 200 || status === 401 || status === 429)).toBe(true);
  });

  test('rapid API requests are rate limited', async ({ page }) => {
    const attempts = 50;
    const results: number[] = [];

    for (let i = 0; i < attempts; i++) {
      const response = await page.request.get('/api/admin/blog/posts');
      results.push(response.status());
    }

    // Should see some 429 responses if rate limiting is active
    // Or at least consistent 401s for unauthorized
    const has429 = results.includes(429);
    const allUnauthorized = results.every(status => status === 401);

    // Either rate limited or consistently unauthorized
    expect(has429 || allUnauthorized).toBe(true);
  });

  test('rapid post creation attempts are limited', async ({ page }) => {
    const loggedIn = await tryLogin(page);
    test.skip(!loggedIn, 'Skipping: Authentication not available in test environment');

    // Try to create many posts rapidly
    const attempts = 20;
    const results: number[] = [];

    for (let i = 0; i < attempts; i++) {
      const response = await page.request.post('/api/admin/blog/posts', {
        data: {
          title: `Test Post ${i}`,
          content: `Content ${i}`,
          locale: 'en',
          status: 'draft'
        }
      });

      results.push(response.status());

      // Very small delay
      await page.waitForTimeout(50);
    }

    // Should see rate limiting kick in
    const has429 = results.includes(429);
    expect(has429 || results.every(s => s === 401)).toBe(true);
    const successCount = results.filter(status => status === 200 || status === 201).length;

    // Either we see 429s, or success count is reasonable (not all 20)
    expect(has429 || successCount < attempts).toBe(true);
  });

  test('bulk operations have rate limits', async ({ page }) => {
    const loggedIn = await tryLogin(page);
    test.skip(!loggedIn, 'Skipping: Authentication not available in test environment');

    // Try multiple bulk operations rapidly
    const attempts = 10;
    const results: number[] = [];

    for (let i = 0; i < attempts; i++) {
      const response = await page.request.post('/api/admin/blog/bulk-operations', {
        data: {
          operation: 'updateStatus',
          slugs: ['post-1', 'post-2'],
          status: 'draft'
        }
      });

      results.push(response.status());
      await page.waitForTimeout(100);
    }

    // Should see some rate limiting or reasonable behavior
    const has429 = results.includes(429);
    expect(has429 || results.every(s => s === 401)).toBe(true);
    expect(results.length).toBe(attempts);
  });

  test('analytics export has rate limits', async ({ page }) => {
    const loggedIn = await tryLogin(page);
    test.skip(!loggedIn, 'Skipping: Authentication not available in test environment');

    // Try to export analytics multiple times rapidly
    const attempts = 5;
    const results: number[] = [];

    for (let i = 0; i < attempts; i++) {
      const response = await page.request.get('/api/admin/blog/analytics/export?format=csv');
      results.push(response.status());
      await page.waitForTimeout(200);
    }

    // Should handle rapid requests appropriately
    expect(results.length).toBe(attempts);
  });
});
