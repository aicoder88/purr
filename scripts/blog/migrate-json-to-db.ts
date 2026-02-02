#!/usr/bin/env ts-node
/**
 * Blog Post JSON to Database Migration Script
 * 
 * Migrates blog posts from content/blog/en/*.json files to PostgreSQL database.
 * Session 1.1.4a - First 14 custom blog posts
 * 
 * IMPORTANT: Handles dates carefully to avoid 500 errors
 */

import fs from 'node:fs';
import path from 'node:path';
import { BlogPostStatus } from '@/generated/client/client';
import prismaSingleton from '@/lib/prisma';

if (!prismaSingleton) {
  throw new Error('Database not configured');
}
const prisma = prismaSingleton;

interface JSONBlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
  };
  publishDate: string;
  modifiedDate: string;
  status: 'draft' | 'scheduled' | 'published';
  scheduledDate?: string;
  featuredImage: {
    url: string;
    alt: string;
    width: number;
    height: number;
  };
  categories: string[];
  tags: string[];
  locale: string;
  translations: Record<string, string>;
  seo: {
    title: string;
    description: string;
    keywords: string[];
    ogImage?: string;
    canonical?: string;
  };
  readingTime: number;
  howTo?: unknown;
  faq?: Array<{ question: string; answerHtml: string }>;
  citations?: Array<{ text: string; url: string }>;
}

interface MigrationResult {
  success: string[];
  failed: { slug: string; error: string }[];
  skipped: string[];
}

async function parsePublishDate(dateStr: string): Promise<Date> {
  // Handle various date formats safely
  if (!dateStr || dateStr === 'undefined' || dateStr === 'null') {
    // Return a default date (30 days ago) if no date provided
    const defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() - 30);
    return defaultDate;
  }

  try {
    const parsed = new Date(dateStr);
    // Validate the date is valid
    if (isNaN(parsed.getTime())) {
      console.warn(`  ⚠️ Invalid date: "${dateStr}", using current date`);
      return new Date();
    }
    return parsed;
  } catch (error) {
    console.warn(`  ⚠️ Error parsing date "${dateStr}", using current date`);
    return new Date();
  }
}

async function migratePost(jsonPath: string): Promise<{ success: boolean; error?: string }> {
  try {
    const content = fs.readFileSync(jsonPath, 'utf-8');
    const jsonPost: JSONBlogPost = JSON.parse(content);

    // Check if post already exists
    const existing = await prisma.blogPost.findUnique({
      where: { slug: jsonPost.slug }
    });

    if (existing) {
      return { success: false, error: 'Already exists in database' };
    }

    // Parse dates carefully
    const publishedAt = await parsePublishDate(jsonPost.publishDate);
    const createdAt = await parsePublishDate(jsonPost.publishDate);
    const updatedAt = new Date(); // Use current time for updatedAt

    // Parse scheduled date if present
    let scheduledFor: Date | undefined = undefined;
    if (jsonPost.status === 'scheduled' && jsonPost.scheduledDate) {
      scheduledFor = await parsePublishDate(jsonPost.scheduledDate);
    }

    // Map status to Prisma enum
    let status: BlogPostStatus = BlogPostStatus.PUBLISHED;
    if (jsonPost.status === 'draft') {
      status = BlogPostStatus.DRAFT;
    } else if (jsonPost.status === 'scheduled') {
      status = BlogPostStatus.SCHEDULED;
    }

    // Prepare hero image fields
    const heroImageUrl = jsonPost.featuredImage?.url || '/optimized/default.webp';
    const heroImageAlt = jsonPost.featuredImage?.alt || jsonPost.title;

    // Extract keywords from SEO and tags
    const keywords = jsonPost.seo?.keywords || jsonPost.tags || [];

    // Calculate word count from content
    const textContent = jsonPost.content.replace(/<[^>]*>/g, '');
    const wordCount = textContent.split(/\s+/).filter(w => w.length > 0).length;

    // Build meta description
    const metaDescription = jsonPost.seo?.description || jsonPost.excerpt?.substring(0, 160) || '';

    // Prepare internal/external links from citations
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let externalLinks: any = undefined;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let internalLinks: any = undefined;

    if (jsonPost.citations && jsonPost.citations.length > 0) {
      const external = jsonPost.citations.filter(c =>
        c.url && !c.url.includes('purrify.ca')
      );
      const internal = jsonPost.citations.filter(c =>
        c.url && c.url.includes('purrify.ca')
      );

      if (external.length > 0) externalLinks = external;
      if (internal.length > 0) internalLinks = internal;
    }

    // Prepare FAQ
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let faqJson: any = undefined;
    if (jsonPost.faq && jsonPost.faq.length > 0) {
      faqJson = jsonPost.faq;
    }

    // Prepare TOC (Table of Contents) - extract headings
    const headingMatches = jsonPost.content.match(/<h[2-3][^>]*>([^<]+)<\/h[2-3]>/g);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let toc: any = undefined;
    if (headingMatches && headingMatches.length > 0) {
      toc = headingMatches.map((h, index) => {
        const text = h.replace(/<[^>]*>/g, '').trim();
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        return { id: `${id}-${index}`, text, level: h.includes('<h2') ? 2 : 3 };
      });
    }

    // Create the blog post
    const createdPost = await prisma.blogPost.create({
      data: {
        slug: jsonPost.slug,
        locale: jsonPost.locale || 'en',
        title: jsonPost.title,
        author: jsonPost.author?.name || 'Purrify Research Lab',
        excerpt: jsonPost.excerpt,
        content: jsonPost.content,
        heroImageUrl,
        heroImageAlt,
        keywords,
        metaDescription,
        toc,
        faq: faqJson,
        internalLinks,
        externalLinks,
        wordCount,
        status,
        scheduledFor,
        publishedAt,
        createdAt,
        updatedAt,
      }
    });

    console.log(`  ✅ Created: ${createdPost.slug} (ID: ${createdPost.id.substring(0, 8)}...)`);
    console.log(`     Published: ${publishedAt.toISOString().split('T')[0]}, Words: ${wordCount}`);

    return { success: true };
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    return { success: false, error: errorMsg };
  }
}

async function migrateBatch(startIndex: number, count: number): Promise<MigrationResult> {
  const result: MigrationResult = { success: [], failed: [], skipped: [] };

  const contentDir = path.join(process.cwd(), 'content', 'blog', 'en');
  const files = fs.readdirSync(contentDir)
    .filter(f => f.endsWith('.json'))
    .sort();

  console.log(`📁 Found ${files.length} total JSON files`);
  console.log(`🎯 Processing batch: ${startIndex + 1} to ${startIndex + count} (first ${count} posts)\n`);

  // Get the batch of files
  const batchFiles = files.slice(startIndex, startIndex + count);

  for (let i = 0; i < batchFiles.length; i++) {
    const file = batchFiles[i];
    const fileNum = startIndex + i + 1;
    const filePath = path.join(contentDir, file);
    const slug = file.replace('.json', '');

    console.log(`[${fileNum}/${count}] Processing: ${slug}`);

    const outcome = await migratePost(filePath);

    if (outcome.success) {
      result.success.push(slug);
    } else if (outcome.error?.includes('Already exists')) {
      console.log(`  ⏭️  Skipped: Already in database`);
      result.skipped.push(slug);
    } else {
      console.error(`  ❌ Failed: ${outcome.error}`);
      result.failed.push({ slug, error: outcome.error || 'Unknown error' });
    }

    console.log(''); // Empty line for readability
  }

  return result;
}

async function main() {
  console.log('='.repeat(60));
  console.log('🚀 Session 1.1.4a: Blog JSON to Database Migration');
  console.log('='.repeat(60));
  console.log();

  try {
    // Check database connection
    await prisma.$connect();
    console.log('✅ Database connection established\n');

    // Migrate first 14 posts (Session 1.1.4a)
    const results = await migrateBatch(0, 14);

    // Summary
    console.log('='.repeat(60));
    console.log('📊 Migration Summary');
    console.log('='.repeat(60));
    console.log(`✅ Successful: ${results.success.length}`);
    console.log(`⏭️  Skipped (already exist): ${results.skipped.length}`);
    console.log(`❌ Failed: ${results.failed.length}`);
    console.log();

    if (results.success.length > 0) {
      console.log('Successfully migrated:');
      results.success.forEach(slug => console.log(`  ✓ ${slug}`));
      console.log();
    }

    if (results.failed.length > 0) {
      console.log('Failed migrations:');
      results.failed.forEach(({ slug, error }) => console.log(`  ✗ ${slug}: ${error}`));
      console.log();
    }

    // Show total count in database
    const totalInDb = await prisma.blogPost.count();
    console.log(`📈 Total posts in database: ${totalInDb}`);

  } catch (error) {
    console.error('💥 Migration failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run migration
main()
  .then(() => {
    console.log('\n🎉 Migration completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Fatal error:', error);
    process.exit(1);
  });
