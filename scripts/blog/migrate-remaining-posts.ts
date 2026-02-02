#!/usr/bin/env tsx
/**
 * Session 1.1.4b - Migrate Remaining Blog Posts
 * 
 * Migrates remaining blog posts from content/blog/en/*.json to database.
 * Batch 2: Posts 15-31 (17 posts)
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
  author: { name: string; avatar?: string };
  publishDate: string;
  modifiedDate: string;
  status: 'draft' | 'scheduled' | 'published';
  scheduledDate?: string;
  featuredImage: { url: string; alt: string; width: number; height: number };
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
  faq?: Array<{ question: string; answerHtml: string }>;
  citations?: Array<{ text: string; url: string }>;
}

async function parseDate(dateStr: string): Promise<Date> {
  if (!dateStr || dateStr === 'undefined' || dateStr === 'null') {
    const d = new Date();
    d.setDate(d.getDate() - 30);
    return d;
  }
  try {
    const parsed = new Date(dateStr);
    if (isNaN(parsed.getTime())) return new Date();
    return parsed;
  } catch {
    return new Date();
  }
}

async function migratePost(jsonPath: string): Promise<{ success: boolean; skipped?: boolean; error?: string }> {
  try {
    const content = fs.readFileSync(jsonPath, 'utf-8');
    const jsonPost: JSONBlogPost = JSON.parse(content);

    // Check if exists
    const existing = await prisma.blogPost.findUnique({ where: { slug: jsonPost.slug } });
    if (existing) return { success: false, skipped: true };

    // Parse dates
    const publishedAt = await parseDate(jsonPost.publishDate);
    const createdAt = await parseDate(jsonPost.publishDate);
    const updatedAt = new Date();

    let scheduledFor: Date | undefined;
    if (jsonPost.status === 'scheduled' && jsonPost.scheduledDate) {
      scheduledFor = await parseDate(jsonPost.scheduledDate);
    }

    // Map status
    let status: BlogPostStatus = BlogPostStatus.PUBLISHED;
    if (jsonPost.status === 'draft') status = BlogPostStatus.DRAFT;
    else if (jsonPost.status === 'scheduled') status = BlogPostStatus.SCHEDULED;

    // Extract data
    const heroImageUrl = jsonPost.featuredImage?.url || '/optimized/default.webp';
    const heroImageAlt = jsonPost.featuredImage?.alt || jsonPost.title;
    const keywords = jsonPost.seo?.keywords || jsonPost.tags || [];
    const textContent = jsonPost.content.replace(/<[^>]*>/g, '');
    const wordCount = textContent.split(/\s+/).filter(w => w.length > 0).length;
    const metaDescription = jsonPost.seo?.description || jsonPost.excerpt?.substring(0, 160) || '';

    // Links
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let externalLinks: any, internalLinks: any;
    if (jsonPost.citations?.length) {
      externalLinks = jsonPost.citations.filter(c => c.url && !c.url.includes('purrify.ca'));
      internalLinks = jsonPost.citations.filter(c => c.url && c.url.includes('purrify.ca'));
      if (!externalLinks.length) externalLinks = undefined;
      if (!internalLinks.length) internalLinks = undefined;
    }

    // FAQ
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let faqJson: any = jsonPost.faq?.length ? jsonPost.faq : undefined;

    // TOC
    const headingMatches = jsonPost.content.match(/<h[2-3][^>]*>([^<]+)<\/h[2-3]>/g);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let toc: any;
    if (headingMatches?.length) {
      toc = headingMatches.map((h, i) => {
        const text = h.replace(/<[^>]*>/g, '').trim();
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        return { id: `${id}-${i}`, text, level: h.includes('<h2') ? 2 : 3 };
      });
    }

    // Create post
    await prisma.blogPost.create({
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

    console.log(`  ✅ ${jsonPost.slug} (${wordCount} words, ${publishedAt.toISOString().split('T')[0]})`);
    return { success: true };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : String(error) };
  }
}

async function main() {
  console.log('='.repeat(70));
  console.log('🚀 Session 1.1.4b: Migrating Remaining Blog Posts');
  console.log('='.repeat(70));

  await prisma.$connect();

  const contentDir = path.join(process.cwd(), 'content', 'blog', 'en');
  const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.json')).sort();

  // Get already migrated slugs
  const existing = await prisma.blogPost.findMany({ select: { slug: true } });
  const existingSlugs = new Set(existing.map(p => p.slug));

  // Filter to only unmigrated
  const toMigrate = files.filter(f => !existingSlugs.has(f.replace('.json', '')));

  console.log(`\n📁 Total JSON files: ${files.length}`);
  console.log(`📊 Already migrated: ${existingSlugs.size}`);
  console.log(`🎯 Remaining to migrate: ${toMigrate.length}\n`);

  const results = { success: 0, skipped: 0, failed: [] as { file: string; error: string }[] };

  for (let i = 0; i < toMigrate.length; i++) {
    const file = toMigrate[i];
    const filePath = path.join(contentDir, file);

    process.stdout.write(`[${i + 1}/${toMigrate.length}] ${file.replace('.json', '')}... `);

    const result = await migratePost(filePath);

    if (result.success) {
      results.success++;
    } else if (result.skipped) {
      console.log('SKIPPED (already exists)');
      results.skipped++;
    } else {
      console.log(`FAILED: ${result.error}`);
      results.failed.push({ file, error: result.error || 'Unknown' });
    }
  }

  console.log('\n' + '='.repeat(70));
  console.log('📊 Migration Summary');
  console.log('='.repeat(70));
  console.log(`✅ Successful: ${results.success}`);
  console.log(`⏭️  Skipped: ${results.skipped}`);
  console.log(`❌ Failed: ${results.failed.length}`);

  if (results.failed.length) {
    console.log('\nFailed files:');
    results.failed.forEach(f => console.log(`  ✗ ${f.file}: ${f.error}`));
  }

  const totalInDb = await prisma.blogPost.count();
  console.log(`\n📈 Total posts in database: ${totalInDb}`);

  await prisma.$disconnect();
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
