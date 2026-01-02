import { test, expect } from '@playwright/test';
import { tryLogin } from './test-utils';

test.describe('Security: File Upload Security (Task 10.5)', () => {
  test('executable files are rejected', async ({ page }) => {
    const loggedIn = await tryLogin(page);
    test.skip(!loggedIn, 'Skipping: Authentication not available in test environment');

    // Navigate to media library or post editor
    await page.goto('/admin/blog/new');

    // Create a fake executable file
    const executableContent = Buffer.from('#!/bin/bash\necho "malicious"');

    // Look for file upload input
    const fileInput = page.locator('input[type="file"]').first();

    if (await fileInput.isVisible()) {
      // Try to upload .sh file
      await fileInput.setInputFiles({
        name: 'malicious.sh',
        mimeType: 'application/x-sh',
        buffer: executableContent
      });

      // Should show error message
      await expect(page.locator('text=/invalid|not allowed|unsupported/i')).toBeVisible({ timeout: 5000 });
    }
  });

  test('PHP files are rejected', async ({ page }) => {
    const loggedIn = await tryLogin(page);
    test.skip(!loggedIn, 'Skipping: Authentication not available in test environment');

    await page.goto('/admin/blog/new');

    const phpContent = Buffer.from('<?php system($_GET["cmd"]); ?>');

    const fileInput = page.locator('input[type="file"]').first();

    if (await fileInput.isVisible()) {
      await fileInput.setInputFiles({
        name: 'shell.php',
        mimeType: 'application/x-php',
        buffer: phpContent
      });

      await expect(page.locator('text=/invalid|not allowed|unsupported/i')).toBeVisible({ timeout: 5000 });
    }
  });

  test('oversized files are rejected', async ({ page }) => {
    const loggedIn = await tryLogin(page);
    test.skip(!loggedIn, 'Skipping: Authentication not available in test environment');

    await page.goto('/admin/blog/new');

    // Create a large file (e.g., 20MB if limit is 10MB)
    const largeContent = Buffer.alloc(20 * 1024 * 1024, 'a');

    const fileInput = page.locator('input[type="file"]').first();

    if (await fileInput.isVisible()) {
      await fileInput.setInputFiles({
        name: 'large-image.jpg',
        mimeType: 'image/jpeg',
        buffer: largeContent
      });

      // Should show size error
      await expect(page.locator('text=/too large|size limit|maximum size/i')).toBeVisible({ timeout: 5000 });
    }
  });

  test('only image files are accepted for media', async ({ page }) => {
    const loggedIn = await tryLogin(page);
    test.skip(!loggedIn, 'Skipping: Authentication not available in test environment');

    await page.goto('/admin/blog/new');

    // Try to upload a text file
    const textContent = Buffer.from('This is not an image');

    const fileInput = page.locator('input[type="file"]').first();

    if (await fileInput.isVisible()) {
      await fileInput.setInputFiles({
        name: 'document.txt',
        mimeType: 'text/plain',
        buffer: textContent
      });

      // Should show file type error
      await expect(page.locator('text=/invalid|not allowed|image only|unsupported/i')).toBeVisible({ timeout: 5000 });
    }
  });

  test('files with double extensions are rejected', async ({ page }) => {
    const loggedIn = await tryLogin(page);
    test.skip(!loggedIn, 'Skipping: Authentication not available in test environment');

    await page.goto('/admin/blog/new');

    const maliciousContent = Buffer.from('malicious content');

    const fileInput = page.locator('input[type="file"]').first();

    if (await fileInput.isVisible()) {
      // Try file with double extension
      await fileInput.setInputFiles({
        name: 'image.jpg.php',
        mimeType: 'image/jpeg',
        buffer: maliciousContent
      });

      // Should be rejected
      await expect(page.locator('text=/invalid|not allowed|unsupported/i')).toBeVisible({ timeout: 5000 });
    }
  });

  test('SVG files are sanitized or rejected', async ({ page }) => {
    const loggedIn = await tryLogin(page);
    test.skip(!loggedIn, 'Skipping: Authentication not available in test environment');

    await page.goto('/admin/blog/new');

    // SVG with embedded script
    const maliciousSVG = Buffer.from(`
      <svg xmlns="http://www.w3.org/2000/svg">
        <script>alert('XSS')</script>
        <circle cx="50" cy="50" r="40" />
      </svg>
    `);

    const fileInput = page.locator('input[type="file"]').first();

    if (await fileInput.isVisible()) {
      await fileInput.setInputFiles({
        name: 'image.svg',
        mimeType: 'image/svg+xml',
        buffer: maliciousSVG
      });

      // Either rejected or sanitized (no alert should fire)
      const alerts: string[] = [];
      page.on('dialog', dialog => {
        alerts.push(dialog.message());
        dialog.dismiss();
      });

      await page.waitForTimeout(2000);
      expect(alerts).toHaveLength(0);
    }
  });

  test('file upload requires authentication', async ({ page }) => {
    // Try to upload without being logged in
    const response = await page.request.post('/api/admin/blog/media', {
      multipart: {
        file: {
          name: 'test.jpg',
          mimeType: 'image/jpeg',
          buffer: Buffer.from('fake image data')
        }
      }
    });

    // Should return 401 or 403
    expect([401, 403]).toContain(response.status());
  });

  test('valid image files are accepted', async ({ page }) => {
    const loggedIn = await tryLogin(page);
    test.skip(!loggedIn, 'Skipping: Authentication not available in test environment');

    await page.goto('/admin/blog/new');

    // Create a minimal valid JPEG (1x1 pixel)
    const validJPEG = Buffer.from([
      0xFF, 0xD8, 0xFF, 0xE0, 0x00, 0x10, 0x4A, 0x46,
      0x49, 0x46, 0x00, 0x01, 0x01, 0x00, 0x00, 0x01,
      0x00, 0x01, 0x00, 0x00, 0xFF, 0xDB, 0x00, 0x43,
      0x00, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
      0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
      0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
      0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
      0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
      0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
      0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
      0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
      0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xC0, 0x00,
      0x0B, 0x08, 0x00, 0x01, 0x00, 0x01, 0x01, 0x01,
      0x11, 0x00, 0xFF, 0xC4, 0x00, 0x14, 0x00, 0x01,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0xFF, 0xDA, 0x00, 0x08, 0x01, 0x01, 0x00, 0x00,
      0x3F, 0x00, 0x7F, 0xFF, 0xD9
    ]);

    const fileInput = page.locator('input[type="file"]').first();

    if (await fileInput.isVisible()) {
      await fileInput.setInputFiles({
        name: 'valid-image.jpg',
        mimeType: 'image/jpeg',
        buffer: validJPEG
      });

      // Should not show error (or show success)
      await page.waitForTimeout(2000);

      // Check that no error message is shown
      const errorVisible = await page.locator('text=/invalid|not allowed|error/i').isVisible().catch(() => false);
      expect(errorVisible).toBe(false);
    }
  });
});
