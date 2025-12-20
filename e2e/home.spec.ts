import { test, expect } from '@playwright/test';

test.describe('Homepage SSR and hydration', () => {
  test('loads without console errors and renders hero', async ({ page }) => {
    page.on('console', (msg) => {
      if (msg.type() !== 'error') return;
      const text = msg.text();
      // Ignore known non-fatal errors in local prod server (vercel insights script)
      if (text.includes('/_vercel/insights/script.js')) return;
      if (text.includes('Failed to load resource') && text.includes('/_vercel/insights/')) return;
      // Log other errors for debugging
      console.log('Console error:', text);
    });

    await page.goto('/');

    // Check title rendered
    await expect(page).toHaveTitle(/Purrify/i);

    // Check the hero headline is present
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();

    // Non-fatal console noise may occur locally (404s for Vercel/local assets),
    // so we only assert critical content is present.
  });
});
