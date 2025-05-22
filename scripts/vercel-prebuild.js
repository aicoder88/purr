const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Vercel prebuild process...');

// Create optimized directory if it doesn't exist
const optimizedDir = path.join(__dirname, '../public/optimized');
if (!fs.existsSync(optimizedDir)) {
  fs.mkdirSync(optimizedDir, { recursive: true });
  console.log('✅ Created optimized directory');
}

// Create original-images directory if it doesn't exist
const originalImagesDir = path.join(__dirname, '../public/original-images');
if (!fs.existsSync(originalImagesDir)) {
  fs.mkdirSync(originalImagesDir, { recursive: true });
  console.log('✅ Created original-images directory');
}

// Check if we have any JPG files in the optimized directory
const optimizedFiles = fs.readdirSync(optimizedDir);
console.log(`Found ${optimizedFiles.length} files in optimized directory`);
console.log('Files:', optimizedFiles.slice(0, 5).join(', ') + (optimizedFiles.length > 5 ? '...' : ''));

// Check if image-dimensions.json exists
const imageDimensionsPath = path.join(__dirname, '../public/image-dimensions.json');
const imageDimensionsExists = fs.existsSync(imageDimensionsPath);
console.log(`image-dimensions.json exists: ${imageDimensionsExists}`);

try {
  // Run the image optimization script
  console.log('🖼️ Optimizing all images...');
  execSync('node scripts/optimize-all-images.js', { stdio: 'inherit' });
  console.log('✅ Image optimization complete');
  
  // Add width and height attributes to images
  console.log('📏 Adding width and height attributes to images...');
  execSync('node scripts/add-image-dimensions.js', { stdio: 'inherit' });
  console.log('✅ Image dimensions added');
  
  // Check if WebP files were created
  const optimizedFilesAfter = fs.readdirSync(optimizedDir);
  const webpFiles = optimizedFilesAfter.filter(file => file.endsWith('.webp'));
  console.log(`Created ${webpFiles.length} WebP files`);
  console.log('WebP files:', webpFiles.slice(0, 5).join(', ') + (webpFiles.length > 5 ? '...' : ''));
  
  // Convert JPG files to WebP if WebP files don't exist
  if (webpFiles.length === 0) {
    console.log('⚠️ No WebP files found, converting JPG files to WebP...');
    const jpgFiles = optimizedFilesAfter.filter(file => file.endsWith('.jpg'));
    
    try {
      // Check if sharp is available
      const sharp = require('sharp');
      
      // Process each JPG file
      const conversionPromises = jpgFiles.map(jpgFile => {
        return new Promise((resolve, reject) => {
          const baseName = jpgFile.replace('.jpg', '');
          const webpFile = `${baseName}.webp`;
          const jpgPath = path.join(optimizedDir, jpgFile);
          const webpPath = path.join(optimizedDir, webpFile);
          
          // Convert JPG to WebP using sharp
          sharp(jpgPath)
            .webp({ quality: 80 })
            .toFile(webpPath)
            .then(() => {
              console.log(`Converted ${jpgFile} to WebP: ${webpFile}`);
              resolve();
            })
            .catch(err => {
              console.error(`Error converting ${jpgFile} to WebP:`, err);
              // Fallback to copy if conversion fails
              fs.copyFileSync(jpgPath, webpPath);
              console.log(`Fallback: Copied ${jpgFile} to ${webpFile}`);
              resolve();
            });
        });
      });
      
      // Wait for all conversions to complete
      Promise.all(conversionPromises)
        .then(() => {
          console.log(`✅ Converted ${jpgFiles.length} JPG files to WebP`);
        })
        .catch(err => {
          console.error('Error during WebP conversion:', err);
        });
    } catch (error) {
      console.error('Error loading sharp module:', error);
      
      // Fallback to copying if sharp is not available
      jpgFiles.forEach(jpgFile => {
        const baseName = jpgFile.replace('.jpg', '');
        const webpFile = `${baseName}.webp`;
        const jpgPath = path.join(optimizedDir, jpgFile);
        const webpPath = path.join(optimizedDir, webpFile);
        
        // Copy the JPG file to a WebP file as fallback
        fs.copyFileSync(jpgPath, webpPath);
        console.log(`Fallback: Copied ${jpgFile} to ${webpFile}`);
      });
    }
  }
  
  console.log('🚀 Vercel prebuild process complete!');
} catch (error) {
  console.error('❌ Error during Vercel prebuild process:', error);
  // Don't exit with error to allow build to continue
  console.log('Continuing with build despite optimization errors...');
}