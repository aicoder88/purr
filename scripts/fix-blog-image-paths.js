#!/usr/bin/env node
/**
 * Blog Image Path Fixer Script
 * 
 * Finds all references to /images/ (legacy paths) in blog posts
 * and maps them to appropriate /optimized/ alternatives.
 * Updates the JSON files with corrected paths.
 * 
 * Usage: node scripts/fix-blog-image-paths.js [--dry-run] [--verbose] [--locale=fr]
 *   --dry-run       Show what would be changed without making changes
 *   --verbose       Show detailed output for each change
 *   --locale=fr     Only process specific locale (en, fr, zh, es)
 */

const fs = require('fs');
const path = require('path');

// Configuration
const BLOG_DIR = path.join(__dirname, '..', 'content', 'blog');
const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const OPTIMIZED_DIR = path.join(PUBLIC_DIR, 'optimized');
const IMAGES_DIR = path.join(PUBLIC_DIR, 'images');
const LOCALES = ['en', 'fr', 'zh', 'es'];

// Image path mappings (legacy -> optimized)
// These are common patterns that can be auto-mapped
const PATH_MAPPINGS = {
  // General patterns
  '/images/': '/optimized/',
};

// Specific filename mappings (for cases where names changed)
const FILENAME_MAPPINGS = {};

// Colors for terminal output
const COLORS = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m',
  bold: '\x1b[1m',
};

// Statistics
const stats = {
  filesChecked: 0,
  filesUpdated: 0,
  pathsFixed: 0,
  missingInOptimized: [],
  missingInImages: [],
  errors: 0,
};

/**
 * Get all JSON files in a directory recursively
 */
function getJsonFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  const files = [];
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      files.push(...getJsonFiles(fullPath));
    } else if (item.endsWith('.json')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

/**
 * Check if a file exists in the optimized directory
 */
function existsInOptimized(filename) {
  const optimizedPath = path.join(OPTIMIZED_DIR, filename);
  return fs.existsSync(optimizedPath);
}

/**
 * Check if a file exists in the images directory
 */
function existsInImages(filename) {
  const imagesPath = path.join(IMAGES_DIR, filename);
  return fs.existsSync(imagesPath);
}

/**
 * Find alternative file with different extension in optimized
 */
function findAlternative(filename) {
  const baseName = filename.replace(/\.[^.]+$/, '');
  const extensions = ['.webp', '.avif', '.jpg', '.png'];
  
  for (const ext of extensions) {
    const altPath = path.join(OPTIMIZED_DIR, baseName + ext);
    if (fs.existsSync(altPath)) {
      return baseName + ext;
    }
  }
  
  return null;
}

/**
 * Get the correct path for an image
 */
function getCorrectPath(originalPath) {
  // Already in optimized
  if (originalPath.startsWith('/optimized/')) {
    return originalPath;
  }

  // Handle /images/ paths
  if (originalPath.startsWith('/images/')) {
    const filename = path.basename(originalPath);
    
    // Check if there's a specific mapping
    if (FILENAME_MAPPINGS[filename]) {
      return '/optimized/' + FILENAME_MAPPINGS[filename];
    }
    
    // Check if file exists in optimized with same name
    if (existsInOptimized(filename)) {
      return '/optimized/' + filename;
    }
    
    // Try to find alternative extension
    const alternative = findAlternative(filename);
    if (alternative) {
      return '/optimized/' + alternative;
    }
    
    // Try different base names (common patterns)
    const baseName = filename.replace(/\.[^.]+$/, '');
    const patterns = [
      `${baseName}.webp`,
      `${baseName}.avif`,
      `${baseName}-ghibli.webp`,
      `${baseName}-ghibli.avif`,
    ];
    
    for (const pattern of patterns) {
      if (existsInOptimized(pattern)) {
        return '/optimized/' + pattern;
      }
    }
    
    // Return mapped path anyway (it might exist at runtime)
    return '/optimized/' + filename;
  }

  // Return unchanged for other paths
  return originalPath;
}

/**
 * Extract all image references from a blog post
 */
function extractImageReferences(data) {
  const images = [];

  // Featured image
  if (data.featuredImage && data.featuredImage.url) {
    images.push({
      type: 'featuredImage.url',
      path: data.featuredImage.url,
      parent: data.featuredImage,
      key: 'url',
    });
  }

  // SEO ogImage
  if (data.seo && data.seo.ogImage) {
    images.push({
      type: 'seo.ogImage',
      path: data.seo.ogImage,
      parent: data.seo,
      key: 'ogImage',
    });
  }

  // Author avatar
  if (data.author && data.author.avatar) {
    images.push({
      type: 'author.avatar',
      path: data.author.avatar,
      parent: data.author,
      key: 'avatar',
    });
  }

  // Content images
  if (data.content) {
    const imgRegex = /<img[^>]+src="([^"]+)"/g;
    let match;
    while ((match = imgRegex.exec(data.content)) !== null) {
      images.push({
        type: 'content',
        path: match[1],
        contentMatch: match,
      });
    }
  }

  return images;
}

/**
 * Fix image paths in a blog post
 */
function fixBlogPost(filePath, options = {}) {
  const { dryRun, verbose } = options;
  const filename = path.basename(filePath);
  const relativePath = path.relative(BLOG_DIR, filePath);
  
  stats.filesChecked++;

  // Read file
  let data;
  let originalContent;
  try {
    originalContent = fs.readFileSync(filePath, 'utf-8');
    data = JSON.parse(originalContent);
  } catch (e) {
    print(`  ❌ Error reading ${relativePath}: ${e.message}\n`, 'red');
    stats.errors++;
    return false;
  }

  const changes = [];
  let modified = false;

  // Extract and fix image references
  const images = extractImageReferences(data);

  for (const img of images) {
    if (img.path.startsWith('/images/')) {
      const correctPath = getCorrectPath(img.path);
      
      if (correctPath !== img.path) {
        changes.push({
          type: img.type,
          old: img.path,
          new: correctPath,
        });

        // Update the data
        if (img.type === 'content') {
          // For content, we need to replace in the string
          data.content = data.content.replace(
            new RegExp(`src="${escapeRegex(img.path)}"`, 'g'),
            `src="${correctPath}"`
          );
        } else if (img.parent && img.key) {
          // For other fields, update directly
          img.parent[img.key] = correctPath;
        }

        modified = true;
        stats.pathsFixed++;

        // Track missing files
        const filename = path.basename(correctPath);
        if (!existsInOptimized(filename)) {
          if (!stats.missingInOptimized.includes(correctPath)) {
            stats.missingInOptimized.push(correctPath);
          }
        }
      }
    }
  }

  // Save changes
  if (modified) {
    if (dryRun) {
      print(`  [DRY-RUN] Would update ${relativePath}:\n`, 'yellow');
    } else {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf-8');
      print(`  ✅ Fixed ${relativePath}:\n`, 'green');
      stats.filesUpdated++;
    }

    if (verbose || dryRun) {
      changes.forEach(change => {
        print(`     ${change.type}:\n`, 'gray');
        print(`       ${change.old}\n`, 'red');
        print(`       → ${change.new}\n`, 'green');
      });
    }
    return true;
  } else {
    if (verbose) {
      print(`  ✓ ${relativePath} - No legacy paths found\n`, 'gray');
    }
    return false;
  }
}

/**
 * Escape special regex characters
 */
function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Print colored message
 */
function print(message, color = 'reset') {
  if (process.stdout.isTTY) {
    process.stdout.write(`${COLORS[color]}${message}${COLORS.reset}`);
  } else {
    process.stdout.write(message);
  }
}

/**
 * Generate mapping suggestions report
 */
function generateSuggestions() {
  if (stats.missingInOptimized.length === 0) return;

  print('\n⚠️  MISSING FILES IN /optimized/:\n', 'yellow');
  print('The following paths were referenced but the files may not exist:\n', 'gray');
  
  stats.missingInOptimized.forEach(missing => {
    const filename = path.basename(missing);
    print(`  • ${missing}\n`);
    
    // Suggest alternatives
    const alternative = findAlternative(filename);
    if (alternative) {
      print(`    💡 Found alternative: /optimized/${alternative}\n`, 'cyan');
    }
    
    // Check if exists in /images/
    if (existsInImages(filename)) {
      print(`    💡 File exists in /images/: /images/${filename}\n`, 'cyan');
    }
  });
}

/**
 * Main fix function
 */
async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const verbose = args.includes('--verbose');
  
  // Parse locale filter
  const localeArg = args.find(arg => arg.startsWith('--locale='));
  const specificLocale = localeArg ? localeArg.split('=')[1] : null;

  print('\n');
  print('='.repeat(80) + '\n', 'bold');
  print('BLOG IMAGE PATH FIXER\n', 'bold');
  print('='.repeat(80) + '\n', 'bold');

  if (dryRun) {
    print('🔍 DRY RUN MODE - No files will be modified\n\n', 'yellow');
  }

  // Determine which locales to process
  const localesToProcess = specificLocale ? [specificLocale] : LOCALES;
  print(`Processing locales: ${localesToProcess.join(', ')}\n\n`, 'cyan');

  // Process each locale
  for (const locale of localesToProcess) {
    const localeDir = path.join(BLOG_DIR, locale);
    
    if (!fs.existsSync(localeDir)) {
      if (verbose) print(`⚠️  Directory not found: ${localeDir}\n`, 'yellow');
      continue;
    }

    print(`\n📁 Processing ${locale.toUpperCase()}...\n`, 'bold');

    const files = getJsonFiles(localeDir);
    
    for (const file of files) {
      fixBlogPost(file, { dryRun, verbose });
    }
  }

  // Print summary
  print('\n');
  print('='.repeat(80) + '\n', 'bold');
  print('FIX SUMMARY\n', 'bold');
  print('='.repeat(80) + '\n', 'bold');
  print(`Files checked: ${stats.filesChecked}\n`);
  print(`Files updated: ${stats.filesUpdated}\n`, stats.filesUpdated > 0 ? 'green' : 'reset');
  print(`Paths fixed: ${stats.pathsFixed}\n`, stats.pathsFixed > 0 ? 'green' : 'reset');
  print(`Errors: ${stats.errors}\n`, stats.errors > 0 ? 'red' : 'reset');

  // Generate suggestions for missing files
  generateSuggestions();

  if (dryRun && stats.filesUpdated > 0) {
    print('\n💡 Run without --dry-run to apply changes\n', 'yellow');
  }

  print('\n');

  // Exit with error code if there were errors
  process.exit(stats.errors > 0 ? 1 : 0);
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
