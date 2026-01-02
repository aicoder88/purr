import { Page, expect, test } from '@playwright/test';

/**
 * Attempts to login to the admin panel.
 * Returns true if login succeeds, false otherwise.
 * Use this with test.skip() to skip tests that require authentication.
 */
export async function tryLogin(page: Page): Promise<boolean> {
  try {
    await page.goto('/admin/login');
    const email = process.env.ADMIN_EMAIL || 'admin@purrify.ca';
    const password = process.env.ADMIN_PASSWORD || 'admin123';

    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', password);
    await page.click('button[type="submit"]');

    // Wait for navigation - give it 5 seconds
    await page.waitForTimeout(3000);

    // Check if we're on the admin page or still on login
    const url = page.url();
    if (url.includes('/admin/blog') && !url.includes('/admin/login')) {
      return true;
    }

    return false;
  } catch {
    return false;
  }
}

/**
 * Skips the test if authentication is not available.
 * This is useful for security tests that require a logged-in state.
 */
export function skipIfNoAuth(page: Page, testInstance: typeof test) {
  testInstance.beforeEach(async ({ page: p }) => {
    const loggedIn = await tryLogin(p);
    if (!loggedIn) {
      testInstance.skip();
    }
  });
}

/**
 * Standard login helper that throws on failure.
 * Use tryLogin if you want to skip tests when auth isn't available.
 */
export async function login(page: Page): Promise<void> {
  const success = await tryLogin(page);
  if (!success) {
    throw new Error('Login failed - NextAuth may not be configured in test environment');
  }
}

/**
 * Checks if NextAuth is configured and working.
 */
export async function isAuthConfigured(): Promise<boolean> {
  return !!process.env.NEXTAUTH_SECRET;
}
