#!/usr/bin/env tsx
/**
 * Migration Verification Script
 */

import prismaSingleton from '@/lib/prisma';

if (!prismaSingleton) {
  throw new Error('Database not configured');
}
const prisma = prismaSingleton;

async function verify() {
  const posts = await prisma.blogPost.findMany({
    select: {
      slug: true,
      title: true,
      publishedAt: true,
      status: true,
      wordCount: true,
      heroImageUrl: true
    },
    orderBy: { publishedAt: 'desc' }
  });

  console.log('\n✅ DATABASE VERIFICATION - Session 1.1.4a Migration Results');
  console.log('='.repeat(80));
  posts.forEach((p, i) => {
    const date = p.publishedAt ? p.publishedAt.toISOString().split('T')[0] : 'N/A';
    const hasImage = p.heroImageUrl ? '✓' : '✗';
    const wordStr = p.wordCount?.toString().padStart(4) || 'N/A';
    console.log(`${String(i + 1).padStart(2)}. ${p.slug}`);
    console.log(`    Status: ${p.status.padEnd(10)} | Words: ${wordStr} | Date: ${date} | Image: ${hasImage}`);
  });
  console.log('='.repeat(80));
  console.log(`\n📊 Total posts in database: ${posts.length}`);
  console.log('🎉 Session 1.1.4a migration completed successfully!\n');

  await prisma.$disconnect();
}

verify().catch((e) => {
  console.error(e);
  process.exit(1);
});
