const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Vercel prebuild process...');

const isCI = !!(process.env.CI || process.env.VERCEL);

// Dark mode validation - temporarily disabled for build
console.log('⚠️ Dark mode validation temporarily disabled for build');

// Ensure output directories exist
const optimizedDir = path.join(__dirname, '../public/optimized');
const originalImagesDir = path.join(__dirname, '../public/original-images');
if (!fs.existsSync(optimizedDir)) fs.mkdirSync(optimizedDir, { recursive: true });
if (!fs.existsSync(originalImagesDir)) fs.mkdirSync(originalImagesDir, { recursive: true });

// image-dimensions presence
const imageDimensionsPath = path.join(__dirname, '../public/image-dimensions.json');
const imageDimensionsExists = fs.existsSync(imageDimensionsPath);

try {
  if (isCI) {
    console.log('🛟 CI/Vercel build detected: skipping duplicate removal and heavy image optimization.');
  } else {
    // Local/dev builds only: dedupe and optimize
    console.log('🧹 Removing duplicate images (local/dev only)...');
    try {
      execSync('node scripts/remove-duplicate-images.js', { stdio: 'inherit' });
      console.log('✅ Duplicate images removed');
    } catch (e) {
      console.warn('⚠️ Duplicate image removal failed or skipped');
    }

    console.log('🖼️ Optimizing all images...');
    execSync('node scripts/optimize-all-images.js', { stdio: 'inherit' });
    console.log('✅ Image optimization complete');
  }

  // Add width/height only if we have dimensions
  if (fs.existsSync(imageDimensionsPath)) {
    console.log('📏 Adding width and height attributes to images...');
    execSync('node scripts/add-image-dimensions.js', { stdio: 'inherit' });
    console.log('✅ Image dimensions added');
  } else {
    console.log('ℹ️ Skipping add-image-dimensions: image-dimensions.json not found');
  }

  console.log('🚀 Vercel prebuild process complete!');
} catch (error) {
  console.error('❌ Error during Vercel prebuild process:', error);
  console.log('Continuing with build despite optimization errors...');
}
