import { test } from '@playwright/test';

test.describe('Blog Section Debug', () => {
  test('should debug page structure and find blog section', async ({ page }) => {
    // Navigate to homepage
    await page.goto('/');

    // Wait for page to load completely
    await page.waitForLoadState('load');

    // Get page title to confirm we're on the right page
    const title = await page.title();
    console.log(`Page title: ${title}`);

    // Check all sections on the page
    const sections = page.locator('section');
    const sectionCount = await sections.count();
    console.log(`Found ${sectionCount} sections on the page`);

    for (let i = 0; i < sectionCount; i++) {
      const section = sections.nth(i);
      const id = await section.getAttribute('id') || 'no-id';
      const className = await section.getAttribute('class') || 'no-class';
      console.log(`Section ${i + 1}: id="${id}" class="${className}"`);
    }

    // Look for any element that might contain blog content
    const blogKeywords = ['blog', 'article', 'post'];
    for (const keyword of blogKeywords) {
      const elements = page.locator(`*:has-text("${keyword}")`);
      const count = await elements.count();
      if (count > 0) {
        console.log(`Found ${count} elements containing "${keyword}"`);
      }
    }

    // Look for text that might indicate blog section
    const blogTexts = [
      'From Our Blog',
      'Cat Care Tips',
      'Latest Articles',
      'Blog',
      'Read Full Article'
    ];

    for (const text of blogTexts) {
      const element = page.locator(`text="${text}"`);
      const isVisible = await element.isVisible().catch(() => false);
      if (isVisible) {
        console.log(`Found blog-related text: "${text}"`);

        // Get the parent section of this text
        const parentSection = element.locator('xpath=ancestor::section[1]');
        const parentExists = await parentSection.count();
        if (parentExists > 0) {
          const sectionId = await parentSection.getAttribute('id') || 'no-id';
          const sectionClass = await parentSection.getAttribute('class') || 'no-class';
          console.log(`  Parent section: id="${sectionId}" class="${sectionClass}"`);
        }
      }
    }

    // Look for images that might be blog post images
    const images = page.locator('img');
    const imageCount = await images.count();
    console.log(`Found ${imageCount} images on the page`);

    // Check for specific blog-related image paths
    for (let i = 0; i < Math.min(imageCount, 10); i++) {
      const img = images.nth(i);
      const src = await img.getAttribute('src') || '';
      const alt = await img.getAttribute('alt') || '';

      if (src.includes('blog') || alt.toLowerCase().includes('blog') || src.includes('optimized')) {
        console.log(`Potential blog image ${i + 1}: src="${src}" alt="${alt}"`);
      }
    }

    // Check the page source for blog-related content
    const content = await page.content();
    const hasBlogSection = content.includes('blog') || content.includes('Blog');
    console.log(`Page contains blog-related content: ${hasBlogSection}`);

    // Try to screenshot for debugging
    await page.screenshot({ path: 'test-results/homepage-debug.png', fullPage: true });
    console.log('Screenshot saved to test-results/homepage-debug.png');
  });
});
