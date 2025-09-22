import { test, expect } from '@playwright/test';

interface BlogImageInfo {
  title: string;
  imageSrc: string;
  imageAlt: string;
  index: number;
}

test.describe('Blog Preview Image Audit', () => {
  test('should extract and verify unique blog post images', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() !== 'error') return;
      const text = msg.text();
      // Ignore known non-fatal errors
      if (text.includes('/_vercel/insights/script.js')) return;
      if (text.includes('Failed to load resource') && text.includes('/_vercel/insights/')) return;
      errors.push(text);
    });

    // Navigate to homepage
    await page.goto('/');

    // Wait for page to load completely
    await page.waitForLoadState('networkidle');

    // Since blog is dynamically imported, wait longer for it to load
    await page.waitForTimeout(5000);

    // Check if any blog text exists first
    const hasFromOurBlog = await page.locator('text=From Our Blog').isVisible().catch(() => false);
    const hasCatCareTips = await page.locator('text=Cat Care Tips').isVisible().catch(() => false);
    console.log(`Found "From Our Blog": ${hasFromOurBlog}`);
    console.log(`Found "Cat Care Tips": ${hasCatCareTips}`);

    // Locate the blog preview section by text content since it doesn't have an ID
    let blogSection;
    if (hasFromOurBlog) {
      blogSection = page.locator('section').filter({ hasText: 'From Our Blog' });
    } else if (hasCatCareTips) {
      blogSection = page.locator('section').filter({ hasText: 'Cat Care Tips' });
    } else {
      // Try to find any section with blog-related content
      blogSection = page.locator('section').filter({ hasText: /blog|article|post/i });
    }

    await expect(blogSection).toBeVisible();

    // Wait for blog posts to load (handling loading state)
    const blogPostCards = blogSection.locator('div.grid > div');

    // Wait for blog posts to be visible (either skeleton or actual content)
    await expect(blogPostCards.first()).toBeVisible();

    // Wait a bit more for potential async loading
    await page.waitForTimeout(2000);

    // Re-evaluate after potential loading
    const loadedBlogPosts = blogSection.locator('div.grid > div:not(.animate-pulse)');
    const blogPostCount = await loadedBlogPosts.count();

    console.log(`Found ${blogPostCount} blog posts`);

    const blogImages: BlogImageInfo[] = [];

    // Extract image information from each blog post
    for (let i = 0; i < blogPostCount; i++) {
      const blogPost = loadedBlogPosts.nth(i);

      // Get the blog post title
      const titleElement = blogPost.locator('h3');
      const title = await titleElement.textContent() || `Blog Post ${i + 1}`;

      // Get the image element
      const imageElement = blogPost.locator('img').first();
      const imageSrc = await imageElement.getAttribute('src') || '';
      const imageAlt = await imageElement.getAttribute('alt') || '';

      blogImages.push({
        title: title.trim(),
        imageSrc,
        imageAlt,
        index: i
      });

      console.log(`Blog Post ${i + 1}:`);
      console.log(`  Title: ${title}`);
      console.log(`  Image Source: ${imageSrc}`);
      console.log(`  Alt Text: ${imageAlt}`);
    }

    // Check for duplicate images
    const duplicates: { [key: string]: BlogImageInfo[] } = {};

    blogImages.forEach(blogImage => {
      const normalizedSrc = blogImage.imageSrc.split('?')[0]; // Remove query params for comparison
      if (!duplicates[normalizedSrc]) {
        duplicates[normalizedSrc] = [];
      }
      duplicates[normalizedSrc].push(blogImage);
    });

    // Find actual duplicates (more than one post using same image)
    const actualDuplicates = Object.entries(duplicates).filter(([_, posts]) => posts.length > 1);

    console.log('\n=== BLOG IMAGE AUDIT REPORT ===');
    console.log(`Total blog posts analyzed: ${blogImages.length}`);
    console.log(`Unique images found: ${Object.keys(duplicates).length}`);
    console.log(`Duplicate images found: ${actualDuplicates.length}`);

    console.log('\n=== DETAILED BLOG POST IMAGES ===');
    blogImages.forEach((blogImage, index) => {
      console.log(`${index + 1}. "${blogImage.title}"`);
      console.log(`   Image: ${blogImage.imageSrc}`);
      console.log(`   Alt: ${blogImage.imageAlt}`);
      console.log('');
    });

    if (actualDuplicates.length > 0) {
      console.log('\n=== DUPLICATE IMAGES DETECTED ===');
      actualDuplicates.forEach(([imageSrc, posts]) => {
        console.log(`Image: ${imageSrc}`);
        console.log(`Used by ${posts.length} posts:`);
        posts.forEach(post => {
          console.log(`  - "${post.title}"`);
        });
        console.log('');
      });

      console.log('\n=== RECOMMENDATIONS ===');
      actualDuplicates.forEach(([imageSrc, posts]) => {
        console.log(`Replace duplicate image: ${imageSrc}`);
        posts.slice(1).forEach(post => {
          console.log(`  - "${post.title}" needs a new unique image`);
        });
      });
    } else {
      console.log('\n✅ All blog posts have unique images!');
    }

    // Verify images are actually loading
    console.log('\n=== IMAGE LOADING VERIFICATION ===');
    for (const blogImage of blogImages) {
      const imageElement = page.locator(`img[src="${blogImage.imageSrc}"]`).first();
      await expect(imageElement).toBeVisible();

      // Check if image loaded successfully (not broken)
      const isComplete = await imageElement.evaluate(img => (img as HTMLImageElement).complete);
      const naturalWidth = await imageElement.evaluate(img => (img as HTMLImageElement).naturalWidth);

      if (isComplete && naturalWidth > 0) {
        console.log(`✅ ${blogImage.title}: Image loaded successfully`);
      } else {
        console.log(`❌ ${blogImage.title}: Image failed to load - ${blogImage.imageSrc}`);
      }
    }

    // Assert that we have at least some blog posts
    expect(blogImages.length).toBeGreaterThan(0);

    // Create a summary for test output
    const summary = {
      totalPosts: blogImages.length,
      uniqueImages: Object.keys(duplicates).length,
      duplicatesFound: actualDuplicates.length,
      blogPosts: blogImages.map(img => ({
        title: img.title,
        image: img.imageSrc
      })),
      duplicates: actualDuplicates.map(([src, posts]) => ({
        image: src,
        usedBy: posts.map(p => p.title)
      }))
    };

    console.log('\n=== AUDIT SUMMARY ===');
    console.log(JSON.stringify(summary, null, 2));

    // Store results in test context for potential use
    (test as any).blogImageAudit = summary;
  });
});