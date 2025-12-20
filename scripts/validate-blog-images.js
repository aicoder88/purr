#!/usr/bin/env node

/**
 * Blog Image Validator - Ensures all blog post images exist and are accessible
 */

const fs = require('node:fs');
const path = require('node:path');

function validateBlogImages() {
  console.log('📸 Starting Blog Image Validation...\n');

  let totalErrors = 0;

  try {
    // Read blog posts data directly from the file
    const blogPostsFile = fs.readFileSync(path.join(process.cwd(), 'src/data/blog-posts.ts'), 'utf8');

    // Extract image paths using regex
    const imageMatches = blogPostsFile.match(/image:\s*['"`]([^'"`]+)['"`]/g);
    const imagePaths = imageMatches ? imageMatches.map(match =>
      match.replace(/image:\s*['"`]([^'"`]+)['"`]/, '$1')
    ) : [];

    console.log(`Found ${imagePaths.length} image references...\n`);

    imagePaths.forEach((imagePath, index) => {

      // Handle different image path formats
      let fullImagePath;
      if (imagePath.startsWith('/optimized/')) {
        fullImagePath = path.join(process.cwd(), 'public', imagePath);
      } else if (imagePath.startsWith('/')) {
        fullImagePath = path.join(process.cwd(), 'public', imagePath);
      } else if (imagePath.startsWith('http')) {
        // External URL - we can't validate these locally
        console.log(`⚠️  External URL (can't validate locally)`);
        console.log(`   URL: ${imagePath}\n`);
        return;
      } else {
        fullImagePath = path.join(process.cwd(), 'public', imagePath);
      }

      // Check if image file exists
      if (!fs.existsSync(fullImagePath)) {
        totalErrors++;
        console.log(`❌ Missing image: ${imagePath}`);
        console.log(`   Expected: ${fullImagePath}\n`);
      } else {
        console.log(`✅ Image found: ${imagePath}`);
      }
    });

    console.log('\n📸 Blog Image Validation Results:');
    console.log(`Images checked: ${imagePaths.length}`);
    console.log(`Missing images: ${totalErrors}`);

    if (totalErrors > 0) {
      console.log('\n❌ BLOG IMAGE VALIDATION FAILED!');
      console.log('Fix missing images before deploying.');
      console.log('\nSuggested fixes:');
      console.log('• Add missing images to /public/optimized/ folder');
      console.log('• Use existing images: 120g.webp, 50g.webp, 12g.webp');
      console.log('• Update blog post data to reference correct image paths');
      process.exit(1);
    } else {
      console.log('\n✅ All blog post images are available!');
      process.exit(0);
    }

  } catch (err) {
    console.error('Error validating blog images:', err);
    process.exit(1);
  }
}

// Run validation
validateBlogImages();
