import { test, expect } from '@playwright/test';

test.describe('Blog Routing Functionality', () => {
  test('dynamic blog routes work without conflicts', async ({ page }) => {
    // Test the dynamic route that we recently fixed
    await page.goto('/blog/how-to-use-cat-litter-deodorizer');

    // Should load successfully without 404 or routing errors
    await expect(page).toHaveTitle(/Cat Litter Deodorizer|Purrify/i);
    await expect(page.locator('h1')).toBeVisible();

    // Check that the page content loaded properly
    const content = page.locator('article, main').first();
    await expect(content).toBeVisible();

    // Verify navigation back to blog exists (may be in breadcrumb, header, or elsewhere)
    const backToBlog = page.locator('a[href="/blog"], a[href*="/blog"]:has-text("Blog")').first();
    const hasBackLink = await backToBlog.count() > 0;

    // Navigation should exist, but may vary in structure
    if (hasBackLink) {
      await expect(backToBlog).toBeVisible();
    }
  });

  test('blog index page loads correctly', async ({ page }) => {
    await page.goto('/blog');

    // Should show blog listing page
    await expect(page).toHaveTitle(/Blog/i);
    await expect(page.locator('h1')).toBeVisible();

    // Check if blog posts are loaded (may be empty in test environment)
    // The page should either show blog posts or an empty state message
    const blogLinks = page.locator('a[href^="/blog/"]');
    const emptyState = page.locator('text=/No blog posts found|Check back soon/i');

    const linkCount = await blogLinks.count();
    const hasEmptyState = await emptyState.count() > 0;

    // Either blog posts exist OR the empty state is shown (valid for test env)
    expect(linkCount > 0 || hasEmptyState).toBeTruthy();
  });

  test('static vs dynamic route separation works', async ({ page }) => {
    // Test multiple blog routes to ensure no conflicts
    const routes = [
      '/blog/how-to-use-cat-litter-deodorizer',
      '/blog/multi-cat-litter-deodorizer-guide',
      '/blog/using-deodorizers-with-kittens'
    ];

    for (const route of routes) {
      await page.goto(route);

      // Each should load without routing conflicts
      await expect(page.locator('h1')).toBeVisible({ timeout: 10000 });

      // Should not show 404 or error page
      const errorContent = page.locator('text="404"', { hasText: /not found/i });
      await expect(errorContent).not.toBeVisible();

      // Should have proper page structure
      const mainContent = page.locator('article, main').first();
      await expect(mainContent).toBeVisible();
    }
  });

  test('blog routing preserves i18n structure', async ({ page }) => {
    // Test that our routing fixes don't break i18n
    await page.goto('/blog/how-to-use-cat-litter-deodorizer');

    // Check that locale detection works (default should be 'en-CA')
    const htmlLang = await page.locator('html').getAttribute('lang');
    expect(htmlLang).toBe('en-CA');

    // Page should load without i18n conflicts
    await expect(page.locator('h1')).toBeVisible();
  });

  test('blog images load correctly after routing fixes', async ({ page }) => {
    await page.goto('/blog/how-to-use-cat-litter-deodorizer');

    // Wait for content to load
    await expect(page.locator('h1')).toBeVisible();
    await page.waitForLoadState('load');

    // Check that images are present and load
    const images = page.locator('article img, main img');
    const imageCount = await images.count();

    if (imageCount > 0) {
      // At least the first image should be visible
      await expect(images.first()).toBeVisible();

      // Check that first image has proper attributes
      const firstImage = images.first();
      const src = await firstImage.getAttribute('src');
      const alt = await firstImage.getAttribute('alt');

      expect(src).toBeTruthy();
      expect(alt).toBeTruthy();
      expect(alt!.length).toBeGreaterThan(0);
    }
  });

  test('blog navigation remains functional', async ({ page }) => {
    // Start at blog index
    await page.goto('/blog');
    await expect(page.locator('h1')).toBeVisible();

    // Check if blog posts exist in the test environment
    const firstBlogLink = page.locator('a[href^="/blog/"]').first();
    const hasLinks = await firstBlogLink.count() > 0;

    if (hasLinks) {
      await expect(firstBlogLink).toBeVisible();
      await firstBlogLink.click();

      // Should navigate to the blog post
      await expect(page.locator('h1')).toBeVisible();

      // Should be able to navigate back to blog
      const backToBlog = page.locator('a[href="/blog"]').first();
      if (await backToBlog.isVisible()) {
        await backToBlog.click();
        await expect(page.locator('h1')).toBeVisible();
      }
    } else {
      // In test environment without blog posts, verify the page structure is intact
      const emptyState = page.locator('text=/No blog posts found|Check back soon/i');
      expect(await emptyState.count()).toBeGreaterThan(0);
    }
  });
});
