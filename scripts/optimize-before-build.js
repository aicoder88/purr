const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Create optimized directory if it doesn't exist
const optimizedDir = path.join(__dirname, '../public/optimized');
if (!fs.existsSync(optimizedDir)) {
  fs.mkdirSync(optimizedDir, { recursive: true });
}

// Create original-images directory if it doesn't exist
const originalImagesDir = path.join(__dirname, '../public/original-images');
if (!fs.existsSync(originalImagesDir)) {
  fs.mkdirSync(originalImagesDir, { recursive: true });
}

console.log('🔍 Starting pre-build optimization process...');

try {
  // Clear webpack cache to ensure fresh build
  console.log('🧹 Clearing webpack cache...');
  execSync('node scripts/clear-webpack-cache.js', { stdio: 'inherit' });
  console.log('✅ Webpack cache cleared');

  // Run the comprehensive image optimization script
  console.log('🖼️ Optimizing all images...');
  execSync('node scripts/optimize-all-images.js', { stdio: 'inherit' });
  console.log('✅ Image optimization complete');
  
  // Add width and height attributes to images
  console.log('📏 Adding width and height attributes to images...');
  execSync('node scripts/add-image-dimensions.js', { stdio: 'inherit' });
  console.log('✅ Image dimensions added');
  
  // Analyze JS bundles if in production mode
  if (process.env.NODE_ENV === 'production') {
    console.log('📊 Analyzing JavaScript bundles...');
    execSync('node scripts/analyze-js.js', { stdio: 'inherit' });
    console.log('✅ Bundle analysis complete');
  }
  
  console.log('🚀 Pre-build optimization complete! Ready to build.');
} catch (error) {
  console.error('❌ Error during pre-build optimization:', error);
  process.exit(1);
}