#!/usr/bin/env ts-node
/**
 * Test Blog Storage Connection
 * 
 * Quick test to verify database connection and ContentStore works
 * Run: npx ts-node scripts/test-blog-storage.ts
 */

import { ContentStore } from '../../src/lib/blog/content-store';

async function testStorage() {
  console.log('🧪 Testing Blog Storage Connection...\n');
  
  const store = new ContentStore();
  
  try {
    // Test 1: Get all posts
    console.log('Test 1: Fetching all posts...');
    const posts = await store.getAllPosts('en', true);
    console.log(`✅ Found ${posts.length} posts\n`);
    
    // Test 2: Get categories
    console.log('Test 2: Fetching categories...');
    const categories = await store.getCategories();
    console.log(`✅ Found ${categories.length} categories\n`);
    
    // Test 3: Get tags
    console.log('Test 3: Fetching tags...');
    const tags = await store.getTags();
    console.log(`✅ Found ${tags.length} tags\n`);
    
    console.log('✅ All tests passed! Database storage is working correctly.\n');
    
    if (posts.length > 0) {
      console.log('Sample post:');
      console.log(`  - Title: ${posts[0].title}`);
      console.log(`  - Slug: ${posts[0].slug}`);
      console.log(`  - Status: ${posts[0].status}`);
      console.log(`  - Author: ${posts[0].author}`);
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error);
    console.error('\nTroubleshooting:');
    console.error('1. Make sure DATABASE_URL is set in .env');
    console.error('2. Run: npx prisma generate');
    console.error('3. Run: npx prisma db push');
    process.exit(1);
  }
}

testStorage()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
