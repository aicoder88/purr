import { test, expect, Page } from '@playwright/test';

// Helper to login - moved to outer scope for performance
async function login(page: Page) {
  await page.goto('/admin/login');
  const email = process.env.ADMIN_EMAIL || 'admin@purrify.ca';
  const password = process.env.ADMIN_PASSWORD || 'admin123';

  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', password);
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL(/\/admin\/blog/, { timeout: 10000 });
}

test.describe('Security: CSRF Protection (Task 10.3)', () => {
  test('POST requests without proper origin are rejected', async ({ page}) => {
    await login(page);
    
    // Try to make a POST request with wrong origin
    const response = await context.request.post('/api/admin/blog/posts', {
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
    
    // Should return 401
    expect(response.status()).toBe(401);
  });

  test('PUT requests require authentication', async ({ page }) => {
    // Try to update without auth
    const response = await page.request.put('/api/admin/blog/posts', {
      data: {
        slug: 'test-post',
        title: 'Updated Title'
      }
    });
    
    // Should return 401
    expect(response.status()).toBe(401);
  });

  test('state-changing operations require valid session', async ({ page}) => {
    // Create a new context without session
    const newContext = await page.context().browser()?.newContext();
    if (!newContext) return;
    
    const newPage = await newContext.newPage();
    
    // Try to perform state-changing operation
    const response = await newPage.request.post('/api/admin/blog/posts', {
      data: {
        title: 'Unauthorized Post',
        content: 'Should be blocked',
        locale: 'en'
      }
    });
    
    // Should be rejected
    expect(response.status()).toBe(401);
    
    await newContext.close();
  });

  test('bulk operations require authentication', async ({ page }) => {
    const response = await page.request.post('/api/admin/blog/bulk-operations', {
      data: {
        operation: 'delete',
        slugs: ['post-1', 'post-2']
      }
    });
    
    // Should return 401
    expect(response.status()).toBe(401);
  });

  test('category management requires authentication', async ({ page }) => {
    const response = await page.request.post('/api/admin/blog/categories', {
      data: {
        name: 'New Category',
        slug: 'new-category'
      }
    });
    
    // Should return 401
    expect(response.status()).toBe(401);
  });

  test('media deletion requires authentication', async ({ page }) => {
    const response = await page.request.delete('/api/admin/blog/media/test-image.jpg');
    
    // Should return 401
    expect(response.status()).toBe(401);
  });
});
