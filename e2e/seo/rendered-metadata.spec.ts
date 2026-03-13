import { expect, test } from '@playwright/test';

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.SITE_URL ||
  'https://www.purrify.ca'
).replace(/\/$/, '');

function expectedCanonical(pathname: string): string {
  const normalizedPath = pathname === '/' ? '/' : `${pathname.replace(/\/$/, '')}/`;
  return `${SITE_URL}${normalizedPath}`;
}

async function getHeadValue(
  page: import('@playwright/test').Page,
  selector: string,
  attribute: string,
): Promise<string | null> {
  return page.locator(selector).first().getAttribute(attribute);
}

test.describe('Rendered SEO Metadata', () => {
  test('renders canonical, og:url, robots, and JSON-LD for public indexable pages', async ({
    page,
  }) => {
    const pages = ['/', '/learn/faq', '/results', '/viral'];

    for (const pathname of pages) {
      await page.goto(pathname);
      await page.waitForLoadState('domcontentloaded');

      const canonical = await getHeadValue(page, 'link[rel="canonical"]', 'href');
      const ogUrl = await getHeadValue(page, 'meta[property="og:url"]', 'content');
      const robots = await getHeadValue(page, 'meta[name="robots"]', 'content');
      const jsonLdCount = await page.locator('script[type="application/ld+json"]').count();

      expect(canonical).toBe(expectedCanonical(pathname));
      expect(ogUrl).toBe(expectedCanonical(pathname));
      expect((robots ?? '').toLowerCase()).not.toContain('noindex');
      expect(jsonLdCount).toBeGreaterThan(0);
    }
  });

  test('renders noindex on redirect-style utility pages', async ({ page }) => {
    await page.goto('/buy');
    await page.waitForLoadState('domcontentloaded');

    const canonical = await getHeadValue(page, 'link[rel="canonical"]', 'href');
    const ogUrl = await getHeadValue(page, 'meta[property="og:url"]', 'content');
    const robots = await getHeadValue(page, 'meta[name="robots"]', 'content');

    expect(canonical).toBe(expectedCanonical('/buy'));
    expect(ogUrl).toBe(expectedCanonical('/buy'));
    expect((robots ?? '').toLowerCase()).toContain('noindex');
  });
});
