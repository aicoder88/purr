#!/usr/bin/env tsx
/**
 * Backfill script: Sanitize all existing blog JSON files
 * 
 * This script reads all blog post JSON files, applies sanitization to their
 * content (including FAQ answers), and writes the sanitized version back.
 * 
 * Run with: npx tsx scripts/blog/backfill-sanitize-existing.ts
 */

import fs from 'node:fs';
import path from 'node:path';
import { sanitizeHTML, sanitizeText, sanitizeURL } from '@/lib/security/sanitize';
import type { BlogPost } from '@/types/blog';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog');

/**
 * Sanitize a single FAQ item
 */
function sanitizeFAQItem(item: { question: string; answerHtml: string }): { question: string; answerHtml: string } {
  return {
    question: sanitizeText(item.question),
    answerHtml: sanitizeHTML(item.answerHtml),
  };
}

/**
 * Check if a string contains dangerous HTML patterns
 */
function containsDangerousPatterns(content: string): boolean {
  const dangerousPatterns = [
    /<script\b/i,
    /<iframe\b/i,
    /<object\b/i,
    /<embed\b/i,
    /javascript:/i,
    /on\w+\s*=/i,
  ];
  return dangerousPatterns.some(pattern => pattern.test(content));
}

/**
 * Sanitize a blog post object
 */
function sanitizeBlogPostData(post: BlogPost): BlogPost {
  const sanitized: BlogPost = {
    ...post,
    title: sanitizeText(post.title),
    excerpt: sanitizeText(post.excerpt),
    content: sanitizeHTML(post.content),
    author: {
      name: sanitizeText(post.author?.name || ''),
      avatar: post.author?.avatar,
    },
    seo: {
      title: sanitizeText(post.seo?.title || ''),
      description: sanitizeText(post.seo?.description || ''),
      keywords: Array.isArray(post.seo?.keywords)
        ? post.seo.keywords.map((k) => sanitizeText(k))
        : [],
      ogImage: post.seo?.ogImage,
      canonical: post.seo?.canonical,
    },
    featuredImage: post.featuredImage ? {
      url: sanitizeURL(post.featuredImage.url || ''),
      alt: sanitizeText(post.featuredImage.alt || ''),
      width: post.featuredImage.width || 0,
      height: post.featuredImage.height || 0,
    } : {
      url: '',
      alt: '',
      width: 0,
      height: 0,
    },
  };

  // Sanitize FAQ if present
  if (Array.isArray(post.faq)) {
    sanitized.faq = post.faq.map(sanitizeFAQItem);
  }

  return sanitized;
}

/**
 * Process all blog JSON files
 */
async function processAllPosts(): Promise<{
  processed: number;
  modified: number;
  errors: number;
  dangerousFound: string[];
}> {
  const stats = {
    processed: 0,
    modified: 0,
    errors: 0,
    dangerousFound: [] as string[],
  };

  // Get all locale directories
  const localeDirs = fs.readdirSync(CONTENT_DIR)
    .filter(name => {
      const fullPath = path.join(CONTENT_DIR, name);
      return fs.statSync(fullPath).isDirectory();
    });

  for (const locale of localeDirs) {
    const localePath = path.join(CONTENT_DIR, locale);
    const files = fs.readdirSync(localePath)
      .filter(f => f.endsWith('.json'));

    for (const file of files) {
      const filePath = path.join(localePath, file);
      const relativePath = path.join('content/blog', locale, file);

      try {
        const content = fs.readFileSync(filePath, 'utf-8');
        let post: BlogPost;

        try {
          post = JSON.parse(content) as BlogPost;
        } catch (parseErr) {
          console.error(`❌ Failed to parse ${relativePath}:`, parseErr);
          stats.errors++;
          continue;
        }

        stats.processed++;

        // Check for dangerous patterns before sanitization
        let hadDangerousContent = false;
        if (containsDangerousPatterns(post.content)) {
          console.warn(`⚠️  Dangerous patterns found in content: ${relativePath}`);
          hadDangerousContent = true;
        }
        if (post.faq) {
          for (const faq of post.faq) {
            if (containsDangerousPatterns(faq.answerHtml)) {
              console.warn(`⚠️  Dangerous patterns found in FAQ answer: ${relativePath}`);
              hadDangerousContent = true;
              break;
            }
          }
        }

        if (hadDangerousContent) {
          stats.dangerousFound.push(relativePath);
        }

        // Sanitize the post
        const sanitized = sanitizeBlogPostData(post);

        // Compare with original to check if modified
        const originalStr = JSON.stringify(post, null, 2);
        const sanitizedStr = JSON.stringify(sanitized, null, 2);

        if (originalStr !== sanitizedStr) {
          fs.writeFileSync(filePath, sanitizedStr, 'utf-8');
          console.log(`✅ Sanitized and saved: ${relativePath}`);
          stats.modified++;
        } else {
          console.log(`⏭️  No changes needed: ${relativePath}`);
        }
      } catch (err) {
        console.error(`❌ Failed to process ${relativePath}:`, err);
        stats.errors++;
      }
    }
  }

  return stats;
}

/**
 * Main function
 */
async function main() {
  console.log('🔍 Starting blog JSON sanitization backfill...\n');

  // Check if content directory exists
  if (!fs.existsSync(CONTENT_DIR)) {
    console.error(`❌ Content directory not found: ${CONTENT_DIR}`);
    process.exit(1);
  }

  const stats = await processAllPosts();

  console.log('\n📊 Summary:');
  console.log(`   Files processed: ${stats.processed}`);
  console.log(`   Files modified: ${stats.modified}`);
  console.log(`   Errors: ${stats.errors}`);

  if (stats.dangerousFound.length > 0) {
    console.log(`\n⚠️  Files with dangerous patterns (now sanitized): ${stats.dangerousFound.length}`);
    for (const file of stats.dangerousFound) {
      console.log(`   - ${file}`);
    }
  }

  if (stats.errors > 0) {
    console.error('\n❌ Some files failed to process. Check logs above.');
    process.exit(1);
  }

  console.log('\n✨ Backfill complete!');
}

main().catch((err) => {
  console.error('💥 Unexpected error:', err);
  process.exit(1);
});
