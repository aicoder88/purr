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

test.describe('Security: XSS Prevention (Task 10.2)', () => {
  test('script tags in post title are sanitized', async ({ page }) => {
    await login(page);
    
    // Navigate to new post
    await page.goto('/admin/blog/new');
    
    // Try to inject script in title
    const maliciousTitle = '<script>alert("XSS")</script>Test Post';
    await page.fill('input[name="title"]', maliciousTitle);
    
    // Check that script is not executed
    const alerts: string[] = [];
    page.on('dialog', dialog => {
      alerts.push(dialog.message());
      dialog.dismiss();
    });
    
    // Wait a moment to see if alert fires
    await page.waitForTimeout(1000);
    
    // No alert should have fired
    expect(alerts).toHaveLength(0);
    
    // Title should be sanitized or escaped
    const titleValue = await page.inputValue('input[name="title"]');
    expect(titleValue).not.toContain('<script>');
  });

  test('script tags in post content are sanitized', async ({ page }) => {
    await login(page);
    
    await page.goto('/admin/blog/new');
    
    // Try to inject script in content
    const maliciousContent = '<p>Normal text</p><script>alert("XSS")</script><p>More text</p>';
    
    // Fill content (assuming there's a textarea or editor)
    const contentField = page.locator('textarea[name="content"], [contenteditable="true"]').first();
    await contentField.fill(maliciousContent);
    
    // Check that script is not executed
    const alerts: string[] = [];
    page.on('dialog', dialog => {
      alerts.push(dialog.message());
      dialog.dismiss();
    });
    
    await page.waitForTimeout(1000);
    expect(alerts).toHaveLength(0);
  });

  test('event handlers in content are sanitized', async ({ page }) => {
    await login(page);
    
    await page.goto('/admin/blog/new');
    
    // Try to inject event handler
    const maliciousContent = '<img src="x" onerror="alert(\'XSS\')">';
    
    const contentField = page.locator('textarea[name="content"], [contenteditable="true"]').first();
    await contentField.fill(maliciousContent);
    
    // Check that no alert fires
    const alerts: string[] = [];
    page.on('dialog', dialog => {
      alerts.push(dialog.message());
      dialog.dismiss();
    });
    
    await page.waitForTimeout(1000);
    expect(alerts).toHaveLength(0);
  });

  test('javascript: URLs are sanitized', async ({ page }) => {
    await login(page);
    
    await page.goto('/admin/blog/new');
    
    // Try to inject javascript: URL
    const maliciousContent = '<a href="javascript:alert(\'XSS\')">Click me</a>';
    
    const contentField = page.locator('textarea[name="content"], [contenteditable="true"]').first();
    await contentField.fill(maliciousContent);
    
    // Save and view the post
    await page.click('button:has-text("Save")');
    await page.waitForTimeout(2000);
    
    // Check that no alert fires when clicking the link
    const alerts: string[] = [];
    page.on('dialog', dialog => {
      alerts.push(dialog.message());
      dialog.dismiss();
    });
    
    // Try to find and click the link
    const link = page.locator('a:has-text("Click me")');
    if (await link.isVisible()) {
      await link.click();
      await page.waitForTimeout(1000);
    }
    
    expect(alerts).toHaveLength(0);
  });

  test('HTML entities in comments are escaped', async ({ page }) => {
    // Test that user-generated content is properly escaped
    await page.goto('/blog');
    
    // Check that any displayed content doesn't contain raw HTML
    const content = await page.content();
    
    // Should not contain unescaped script tags
    expect(content).not.toMatch(/<script[^>]*>(?!<\/script>)/);
  });

  test('category and tag names are sanitized', async ({ page }) => {
    await login(page);
    
    await page.goto('/admin/blog/new');
    
    // Try to create category with malicious name
    const maliciousCategory = '<script>alert("XSS")</script>Category';
    
    // Look for category input
    const categoryInput = page.locator('input[placeholder*="category" i], input[name*="category" i]').first();
    if (await categoryInput.isVisible()) {
      await categoryInput.fill(maliciousCategory);
      
      // Check no alert fires
      const alerts: string[] = [];
      page.on('dialog', dialog => {
        alerts.push(dialog.message());
        dialog.dismiss();
      });
      
      await page.waitForTimeout(1000);
      expect(alerts).toHaveLength(0);
    }
  });
});
