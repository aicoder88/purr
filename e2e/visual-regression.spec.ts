import { test, expect } from '@playwright/test';

const PRODUCTION_URL = 'https://www.purrify.ca';
const LOCAL_URL = 'http://localhost:3010';

const pages = [
    { name: 'home', path: '/' },
    { name: 'about', path: '/about/our-story' },
    { name: 'science', path: '/science' },
    { name: 'contact', path: '/contact' },
    { name: 'blog', path: '/blog' },
    // Batch 1 Blog Posts
    { name: 'post-activated-carbon', path: '/blog/activated-carbon-for-cat-litter-complete-guide' },
    { name: 'post-apartment-solution', path: '/blog/apartment-litter-box-smell-solution' },
    { name: 'post-best-deodorizers', path: '/blog/best-cat-litter-deodorizers-2026' },
    { name: 'post-best-apartments', path: '/blog/best-cat-litter-for-apartments' },
    { name: 'post-best-smell', path: '/blog/best-cat-litter-for-smell' },
    { name: 'post-multiple-cats', path: '/blog/best-cat-litter-multiple-cats' },
    { name: 'post-multiple-cats-odor', path: '/blog/best-cat-litter-multiple-cats-odor-control' },
    { name: 'post-odor-control-2026', path: '/blog/best-cat-litter-odor-control-2026' },
    { name: 'post-clumping-odor', path: '/blog/best-clumping-cat-litter-odor-control' },
    { name: 'post-covered-boxes', path: '/blog/best-covered-litter-boxes-odor-control' },
    { name: 'post-litter-location', path: '/blog/best-litter-box-location-odour-control' },
    { name: 'post-natural-odor', path: '/blog/best-natural-cat-litter-odor-control' },
    { name: 'post-self-cleaning', path: '/blog/best-self-cleaning-litter-box-odor-control' },
    { name: 'post-unscented-sensitive', path: '/blog/best-unscented-cat-litter-sensitive-cats' },
];

test.describe('Visual Regression: Production vs Local', () => {
    for (const p of pages) {
        test(`Compare ${p.name}`, async ({ page }) => {
            // Increase timeout for production hits
            test.setTimeout(180_000);

            const targetUrl = process.env.BASE_URL === 'production' ? PRODUCTION_URL : LOCAL_URL;

            console.log(`Navigating to ${targetUrl}${p.path}...`);
            await page.goto(`${targetUrl}${p.path}`, {
                waitUntil: 'domcontentloaded',
                timeout: 120_000
            });

            // Wait for steady state
            await page.waitForTimeout(5000);

            await expect(page).toHaveScreenshot(`${p.name}.png`, {
                fullPage: true,
                maxDiffPixelRatio: 0.1,
                animations: 'disabled',
                timeout: 60_000
            });
        });
    }
});
