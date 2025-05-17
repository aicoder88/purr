const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function optimizeImages() {
  const outputDir = path.join(__dirname, '../public/images');
  
  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Optimize icon logo
  const iconPath = path.join(__dirname, '../public/purrify-logo-icon.png');
  
  // Create favicon (16x16)
  await sharp(iconPath)
    .resize(16, 16)
    .toFile(path.join(outputDir, 'favicon.png'));
    
  // Create small icon (32x32)
  await sharp(iconPath)
    .resize(32, 32)
    .toFile(path.join(outputDir, 'icon-32.png'));
    
  // Create medium icon (64x64)
  await sharp(iconPath)
    .resize(64, 64)
    .toFile(path.join(outputDir, 'icon-64.png'));
    
  // Create large icon (128x128)
  await sharp(iconPath)
    .resize(128, 128)
    .toFile(path.join(outputDir, 'icon-128.png'));
    
  // Create apple touch icon (180x180)
  await sharp(iconPath)
    .resize(180, 180)
    .toFile(path.join(outputDir, 'apple-touch-icon.png'));
  
  // Optimize text logo
  const textPath = path.join(__dirname, '../public/purrify-logo-text.png');
  
  // Create small text logo (120x40)
  await sharp(textPath)
    .resize(120, 40)
    .toFile(path.join(outputDir, 'logo-text-120.png'));
    
  // Create medium text logo (180x60)
  await sharp(textPath)
    .resize(180, 60)
    .toFile(path.join(outputDir, 'logo-text-180.png'));
    
  // Create large text logo (240x80)
  await sharp(textPath)
    .resize(240, 80)
    .toFile(path.join(outputDir, 'logo-text-240.png'));
    
  console.log('Images optimized successfully!');
}

optimizeImages().catch(err => {
  console.error('Error optimizing images:', err);
  process.exit(1);
});