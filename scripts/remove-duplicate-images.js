const fs = require('fs');
const path = require('path');

// Configuration
const PUBLIC_DIR = path.join(__dirname, '../public');
const IMAGE_DIMENSIONS_PATH = path.join(PUBLIC_DIR, 'image-dimensions.json');
const DRY_RUN = false; // Set to false to actually delete files

// Load image dimensions data
let imageDimensions;
try {
  imageDimensions = JSON.parse(fs.readFileSync(IMAGE_DIMENSIONS_PATH, 'utf8'));
} catch (error) {
  console.error('Error loading image dimensions:', error);
  process.exit(1);
}

// Load constants to see which images are referenced in the code
let constants;
try {
  // Read the constants file as text to parse image references
  const constantsPath = path.join(__dirname, '../src/lib/constants.ts');
  constants = fs.readFileSync(constantsPath, 'utf8');
} catch (error) {
  console.error('Error loading constants:', error);
  process.exit(1);
}

// Function to check if an image is referenced in the code
function isImageReferenced(imagePath) {
  // Normalize path for comparison
  const normalizedPath = imagePath.replace(/\\/g, '/');
  const filename = path.basename(normalizedPath);
  
  // Check if the image is referenced in constants.ts
  return constants.includes(`"${filename}"`) ||
         constants.includes(`'${filename}'`) ||
         constants.includes(`"/${filename}"`) ||
         constants.includes(`'/${filename}'`) ||
         constants.includes(`"/images/${filename}"`) ||
         constants.includes(`'/images/${filename}'`);
}

// Function to check if a file is directly referenced in any component
function isDirectlyReferenced(filename) {
  try {
    // Read all component files
    const componentsDir = path.join(__dirname, '../src/components');
    const componentFiles = getAllFiles(componentsDir);
    
    for (const file of componentFiles) {
      const content = fs.readFileSync(file, 'utf8');
      if (content.includes(`"${filename}"`) ||
          content.includes(`'${filename}'`) ||
          content.includes(`"./${filename}"`) ||
          content.includes(`'./${filename}'`) ||
          content.includes(`"/${filename}"`) ||
          content.includes(`'/${filename}'`)) {
        console.log(`File ${filename} is directly referenced in ${file}`);
        return true;
      }
    }
    return false;
  } catch (error) {
    console.error(`Error checking direct references: ${error}`);
    return false;
  }
}

// Helper function to get all files recursively
function getAllFiles(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  let fileList = [];
  
  for (const file of files) {
    const fullPath = path.join(dir, file.name);
    if (file.isDirectory()) {
      fileList = fileList.concat(getAllFiles(fullPath));
    } else {
      fileList.push(fullPath);
    }
  }
  
  return fileList;
}

// Function to get all image files in a directory
function getImageFiles(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  
  const imageFiles = [];
  
  for (const file of files) {
    const fullPath = path.join(dir, file.name);
    
    if (file.isDirectory()) {
      // Skip optimized, images, and original-images directories
      if (file.name !== 'optimized' && file.name !== 'images' && file.name !== 'original-images' && file.name !== 'videos') {
        imageFiles.push(...getImageFiles(fullPath));
      }
    } else {
      // Check if it's an image file
      const ext = path.extname(file.name).toLowerCase();
      if (['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif'].includes(ext)) {
        imageFiles.push(fullPath);
      }
    }
  }
  
  return imageFiles;
}

// Group images by base name (without extension)
function groupImagesByBaseName(imageFiles) {
  const groups = {};
  
  for (const file of imageFiles) {
    const filename = path.basename(file);
    const ext = path.extname(filename).toLowerCase();
    const baseName = path.basename(filename, ext);
    
    if (!groups[baseName]) {
      groups[baseName] = [];
    }
    
    groups[baseName].push({
      path: file,
      ext: ext,
      filename: filename
    });
  }
  
  return groups;
}

// Main function to identify and remove duplicate images
function removeDuplicateImages() {
  console.log('Scanning for duplicate images...');
  
  // Get all image files
  const imageFiles = getImageFiles(PUBLIC_DIR);
  console.log(`Found ${imageFiles.length} image files in total`);
  
  // Group images by base name
  const imageGroups = groupImagesByBaseName(imageFiles);
  
  // Track statistics
  let duplicatesFound = 0;
  let filesDeleted = 0;
  
  // Process each group to identify duplicates
  for (const [baseName, files] of Object.entries(imageGroups)) {
    // Skip if there's only one file with this base name
    if (files.length <= 1) continue;
    
    duplicatesFound++;
    
    console.log(`\nFound ${files.length} files for "${baseName}":`);
    files.forEach(file => console.log(`  - ${file.path}`));
    
    // Determine which file to keep
    let fileToKeep = null;
    
    // Check for direct references to WebP files
    const directlyReferencedWebP = files.find(file =>
      file.ext === '.webp' && isDirectlyReferenced(file.filename)
    );
    
    // If there's a directly referenced WebP file, keep it regardless
    if (directlyReferencedWebP) {
      fileToKeep = directlyReferencedWebP;
      console.log(`Keeping directly referenced WebP file: ${fileToKeep.path}`);
    } else {
      // First, check if any of the files are referenced in the code
      const referencedFiles = files.filter(file => isImageReferenced(file.filename));
      
      if (referencedFiles.length > 0) {
        // If multiple files are referenced, prefer PNG
        const pngFile = referencedFiles.find(file => file.ext === '.png');
        if (pngFile) {
          fileToKeep = pngFile;
        } else {
          // Otherwise keep the first referenced file
          fileToKeep = referencedFiles[0];
        }
      } else {
        // If no files are referenced, prefer PNG over JPG
        const pngFile = files.find(file => file.ext === '.png');
        if (pngFile) {
          fileToKeep = pngFile;
        } else {
          // Otherwise keep the first file
          fileToKeep = files[0];
        }
      }
    }
    
    console.log(`Keeping: ${fileToKeep.path}`);
    
    // Delete the other files
    for (const file of files) {
      if (file.path !== fileToKeep.path) {
        console.log(`Deleting: ${file.path}`);
        
        if (!DRY_RUN) {
          try {
            fs.unlinkSync(file.path);
            filesDeleted++;
          } catch (error) {
            console.error(`Error deleting ${file.path}:`, error);
          }
        } else {
          // In dry run mode, just count the files that would be deleted
          filesDeleted++;
        }
      }
    }
  }
  
  console.log('\nSummary:');
  console.log(`Found ${duplicatesFound} sets of duplicate images`);
  console.log(`${DRY_RUN ? 'Would delete' : 'Deleted'} ${filesDeleted} duplicate files`);
  
  if (DRY_RUN) {
    console.log('\nThis was a dry run. No files were actually deleted.');
    console.log('To delete the files, set DRY_RUN = false in the script.');
  }
}

// Run the main function
removeDuplicateImages();