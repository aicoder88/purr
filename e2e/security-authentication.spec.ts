import { test, expect } from '@playwright/test';

test.describe('Security: Authentication (Task 10.1)', () => {
  test('admin endpoints require authentication', async ({ page }) => {
    // Try to access admin dashboard without auth
    await page.goto('/admin/blog');
    
    // Should redirect to login page
    await expect(page).toHaveURL(/\/admin\/login/);
  });

  test('API endpoints require authentication', async ({ page }) => {
    // Try to access API endpoint without auth
    const response = await page.request.get('/api/admin/blog/posts');

    // Should return 401 Unauthorized
    expect(response.status()).toBe(401);
  });

  test('invalid credentials are rejected', async ({ page }) => {
    await page.goto('/admin/login');
    
    // Fill in invalid credentials
    await page.fill('input[name="email"]', 'invalid@example.com');
    await page.fill('input[name="password"]', 'wrongpassword');
    await page.click('button[type="submit"]');
    
    // Should show error message
    await expect(page.locator('text=/error|invalid|incorrect/i')).toBeVisible({ timeout: 5000 });
    
    // Should still be on login page
    await expect(page).toHaveURL(/\/admin\/login/);
  });

  test('valid credentials allow access', async ({ page }) => {
    await page.goto('/admin/login');
    
    // Use test credentials (should be set in env)
    const email = process.env.ADMIN_EMAIL || 'admin@purrify.ca';
    const password = process.env.ADMIN_PASSWORD || 'admin123';
    
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', password);
    await page.click('button[type="submit"]');
    
    // Should redirect to admin dashboard
    await expect(page).toHaveURL(/\/admin\/blog/, { timeout: 10000 });
  });

  test('session persists across page reloads', async ({ page }) => {
    // Login first
    await page.goto('/admin/login');
    const email = process.env.ADMIN_EMAIL || 'admin@purrify.ca';
    const password = process.env.ADMIN_PASSWORD || 'admin123';
    
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', password);
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/\/admin\/blog/, { timeout: 10000 });
    
    // Reload page
    await page.reload();
    
    // Should still be authenticated
    await expect(page).toHaveURL(/\/admin\/blog/);
    await expect(page.locator('text=/logout|sign out/i')).toBeVisible();
  });

  test('logout clears session', async ({ page }) => {
    // Login first
    await page.goto('/admin/login');
    const email = process.env.ADMIN_EMAIL || 'admin@purrify.ca';
    const password = process.env.ADMIN_PASSWORD || 'admin123';
    
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', password);
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/\/admin\/blog/, { timeout: 10000 });
    
    // Logout
    await page.click('text=/logout|sign out/i');
    
    // Try to access admin page again
    await page.goto('/admin/blog');
    
    // Should redirect to login
    await expect(page).toHaveURL(/\/admin\/login/);
  });
});
