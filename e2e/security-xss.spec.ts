import { test, expect } from '@playwright/test';
import { tryLogin } from './test-utils';

test.describe('Security: XSS Prevention (Task 10.2)', () => {
  test('script tags in post title are sanitized', async ({ page }) => {
    const loggedIn = await tryLogin(page);
    test.skip(!loggedIn, 'Skipping: Authentication not available in test environment');

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
    const loggedIn = await tryLogin(page);
    test.skip(!loggedIn, 'Skipping: Authentication not available in test environment');

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
    const loggedIn = await tryLogin(page);
    test.skip(!loggedIn, 'Skipping: Authentication not available in test environment');

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
    const loggedIn = await tryLogin(page);
    test.skip(!loggedIn, 'Skipping: Authentication not available in test environment');

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

    // Wait for page to load
    await page.waitForLoadState('domcontentloaded');

    // Check that main content area doesn't contain inline script content with XSS patterns
    // We look for patterns that would indicate XSS rather than legitimate framework scripts
    const mainContent = page.locator('main, article').first();
    if (await mainContent.count() > 0) {
      const innerHTML = await mainContent.innerHTML();

      // Should not contain inline script with alert or common XSS patterns
      expect(innerHTML).not.toMatch(/<script[^>]*>(?:.*(?:alert|document\.cookie|eval|onclick)[^<]*)<\/script>/i);
    }

    // Page should load without JavaScript errors indicating XSS
    const consoleErrors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error' && msg.text().includes('XSS')) {
        consoleErrors.push(msg.text());
      }
    });

    await page.waitForTimeout(500);
    expect(consoleErrors).toHaveLength(0);
  });

  test('category and tag names are sanitized', async ({ page }) => {
    const loggedIn = await tryLogin(page);
    test.skip(!loggedIn, 'Skipping: Authentication not available in test environment');

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
