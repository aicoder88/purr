import { test, expect, Page } from '@playwright/test';
import { tryLogin } from './test-utils';

test.describe('Security: CSRF Protection (Task 10.3)', () => {
  test('POST requests without proper origin are rejected', async ({ page }) => {
    const loggedIn = await tryLogin(page);
    test.skip(!loggedIn, 'Skipping: Authentication not available in test environment');

    // Try to make a POST request with wrong origin
    const response = await page.request.post('/api/admin/blog/posts', {
      headers: {
        'Origin': 'https://evil-site.com',
        'Content-Type': 'application/json'
      },
      data: {
        title: 'Malicious Post',
        content: 'This should be blocked',
        locale: 'en'
      }
    });

    // Should be rejected (403 or 401)
    expect([401, 403]).toContain(response.status());
  });

  test('DELETE requests require authentication', async ({ page }) => {
    // Try to delete without auth
    const response = await page.request.delete('/api/admin/blog/posts?slug=test-post');

    // Should return 401 (Unauthorized) or 403 (Forbidden - CSRF protection)
    expect([401, 403]).toContain(response.status());
  });

  test('PUT requests require authentication', async ({ page }) => {
    // Try to update without auth
    const response = await page.request.put('/api/admin/blog/posts', {
      data: {
        slug: 'test-post',
        title: 'Updated Title'
      }
    });

    // Should return 401 (Unauthorized) or 403 (Forbidden - CSRF protection)
    expect([401, 403]).toContain(response.status());
  });

  test('state-changing operations require valid session', async ({ page }) => {
    // Create a new context without session
    const newContext = await page.context().browser()?.newContext();
    if (!newContext) {
      test.skip();
      return;
    }

    const newPage = await newContext.newPage();

    // Try to perform state-changing operation
    const response = await newPage.request.post('/api/admin/blog/posts', {
      data: {
        title: 'Unauthorized Post',
        content: 'Should be blocked',
        locale: 'en'
      }
    });

    // Should be rejected (401 Unauthorized or 403 Forbidden from CSRF protection)
    expect([401, 403]).toContain(response.status());

    await newContext.close();
  });

  test('bulk operations require authentication', async ({ page }) => {
    const response = await page.request.post('/api/admin/blog/bulk-operations', {
      data: {
        operation: 'delete',
        slugs: ['post-1', 'post-2']
      }
    });

    // Should return 401 (Unauthorized) or 403 (Forbidden - CSRF protection)
    expect([401, 403]).toContain(response.status());
  });

  test('category management requires authentication', async ({ page }) => {
    const response = await page.request.post('/api/admin/blog/categories', {
      data: {
        name: 'New Category',
        slug: 'new-category'
      }
    });

    // Should return 401 or 403
    expect([401, 403]).toContain(response.status());
  });

  test('media deletion requires authentication', async ({ page }) => {
    const response = await page.request.delete('/api/admin/blog/media/test-image.jpg');

    // Should return 401 or 403
    expect([401, 403]).toContain(response.status());
  });
});
