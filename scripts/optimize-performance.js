#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');
const { execSync } = require('node:child_process');

console.log('🚀 Starting performance optimization...');

// Check if sharp is installed
try {
  require('sharp');
} catch {
  console.log('📦 Installing sharp for image optimization...');
  execSync('npm install sharp', { stdio: 'inherit' });
}

// Create optimized directory if it doesn't exist
const optimizedDir = path.join(__dirname, '../public/optimized');
if (!fs.existsSync(optimizedDir)) {
  fs.mkdirSync(optimizedDir, { recursive: true });
}

// Critical images that need optimization
const criticalImages = [
  'cat_rose_thumbnail.jpg',
  'purrify-logo.png',
  'purrify-logo-icon.png',
  'purrify-logo-text.png',
  '20g.png',
  '60g.png',
  '140g.png'
];

async function optimizeImage(inputPath, outputPath, options = {}) {
  const sharp = require('sharp');
  
  try {
    const image = sharp(inputPath);
    
    // Get image metadata
    const metadata = await image.metadata();
    
    // Determine output format based on input
    const isPNG = metadata.format === 'png';
    const isJPEG = metadata.format === 'jpeg' || metadata.format === 'jpg';
    
    if (isPNG) {
      // Optimize PNG to WebP
      await image
        .webp({ 
          quality: options.quality || 85,
          effort: 6,
          nearLossless: true
        })
        .toFile(outputPath.replace('.png', '.webp'));
      
      // Also create AVIF version
      await image
        .avif({ 
          quality: options.quality || 80,
          effort: 9
        })
        .toFile(outputPath.replace('.png', '.avif'));
    } else if (isJPEG) {
      // Optimize JPEG to WebP
      await image
        .webp({ 
          quality: options.quality || 85,
          effort: 6
        })
        .toFile(outputPath.replace('.jpg', '.webp').replace('.jpeg', '.webp'));
      
      // Also create AVIF version
      await image
        .avif({ 
          quality: options.quality || 80,
          effort: 9
        })
        .toFile(outputPath.replace('.jpg', '.avif').replace('.jpeg', '.avif'));
    }
    
    console.log(`✅ Optimized: ${path.basename(inputPath)}`);
  } catch (error) {
    console.error(`❌ Error optimizing ${inputPath}:`, error.message);
  }
}

async function optimizeCriticalImages() {
  console.log('🖼️  Optimizing critical images...');
  
  for (const image of criticalImages) {
    const inputPath = path.join(__dirname, '../public', image);
    const outputPath = path.join(optimizedDir, image);
    
    if (fs.existsSync(inputPath)) {
      await optimizeImage(inputPath, outputPath);
    } else {
      console.log(`⚠️  Image not found: ${image}`);
    }
  }
}

async function createImageDimensions() {
  console.log('📏 Creating image dimensions file...');
  
  const sharp = require('sharp');
  const dimensions = {};
  
  for (const image of criticalImages) {
    const inputPath = path.join(__dirname, '../public', image);
    
    if (fs.existsSync(inputPath)) {
      try {
        const metadata = await sharp(inputPath).metadata();
        dimensions[image] = {
          width: metadata.width,
          height: metadata.height,
          format: metadata.format
        };
      } catch (error) {
        console.error(`❌ Error getting dimensions for ${image}:`, error.message);
      }
    }
  }
  
  const dimensionsPath = path.join(__dirname, '../public/image-dimensions.json');
  fs.writeFileSync(dimensionsPath, JSON.stringify(dimensions, null, 2));
  console.log('✅ Image dimensions saved to public/image-dimensions.json');
}

async function optimizeVideos() {
  console.log('🎥 Optimizing videos...');
  
  const videosDir = path.join(__dirname, '../public/videos');
  if (!fs.existsSync(videosDir)) {
    console.log('⚠️  Videos directory not found');
    return;
  }
  
  const videos = fs.readdirSync(videosDir).filter(file => 
    file.endsWith('.mp4') || file.endsWith('.mov') || file.endsWith('.avi')
  );
  
  for (const video of videos) {
    const inputPath = path.join(videosDir, video);
    const outputPath = path.join(videosDir, video.replace(/\.[^/.]+$/, '_optimized.mp4'));
    
    if (!fs.existsSync(outputPath)) {
      try {
        // Use ffmpeg to optimize video (if available)
        execSync(`ffmpeg -i "${inputPath}" -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k "${outputPath}"`, { stdio: 'inherit' });
        console.log(`✅ Optimized video: ${video}`);
      } catch {
        console.log(`⚠️  FFmpeg not available, skipping video optimization for ${video}`);
      }
    }
  }
}

async function generateCriticalCSS() {
  console.log('🎨 Generating critical CSS...');
  
  const criticalCSSPath = path.join(__dirname, '../src/styles/critical.css');
  const outputPath = path.join(__dirname, '../public/critical.css');
  
  if (fs.existsSync(criticalCSSPath)) {
    try {
      // Copy critical CSS to public for inline loading
      fs.copyFileSync(criticalCSSPath, outputPath);
      console.log('✅ Critical CSS copied to public directory');
    } catch (error) {
      console.error('❌ Error copying critical CSS:', error.message);
    }
  }
}

async function updateManifest() {
  console.log('📱 Updating manifest.json...');
  
  const manifestPath = path.join(__dirname, '../public/manifest.json');
  const manifest = {
    name: 'Purrify - Cat Litter Odor Control',
    short_name: 'Purrify',
    description: 'Activated carbon cat litter additive that eliminates odors at the molecular level',
    start_url: '/',
    display: 'standalone',
    background_color: '#FFFFFF',
    theme_color: '#FF3131',
    icons: [
      {
        src: '/optimized/purrify-logo-icon.webp',
        sizes: '192x192',
        type: 'image/webp'
      },
      {
        src: '/optimized/purrify-logo-icon.webp',
        sizes: '512x512',
        type: 'image/webp'
      }
    ]
  };
  
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log('✅ Manifest updated');
}

async function main() {
  try {
    await optimizeCriticalImages();
    await createImageDimensions();
    await optimizeVideos();
    await generateCriticalCSS();
    await updateManifest();
    
    console.log('🎉 Performance optimization completed!');
    console.log('\n📊 Next steps:');
    console.log('1. Run "npm run build" to test the optimizations');
    console.log('2. Use Lighthouse to measure Core Web Vitals');
    console.log('3. Monitor LCP, FID, and CLS scores');
    
  } catch (error) {
    console.error('❌ Performance optimization failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  optimizeCriticalImages,
  createImageDimensions,
  optimizeVideos,
  generateCriticalCSS,
  updateManifest
}; 