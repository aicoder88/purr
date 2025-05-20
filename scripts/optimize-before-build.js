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
  // Run the image optimization script
  console.log('🖼️ Optimizing images...');
  execSync('node scripts/optimize-images.js', { stdio: 'inherit' });
  console.log('✅ Image optimization complete');
  
  // Add any other pre-build optimization steps here
  
  console.log('🚀 Pre-build optimization complete! Ready to build.');
} catch (error) {
  console.error('❌ Error during pre-build optimization:', error);
  process.exit(1);
}