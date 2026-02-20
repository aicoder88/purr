#!/usr/bin/env node
/**
 * update-blog-json.js
 * 
 * Updates blog content JSON files with categorized image paths.
 * Parses JSON, traverses structure, updates image paths.
 * Uses parse/transform/serialize (not raw regex) to preserve formatting.
 * 
 * Usage: node scripts/migration-helpers/update-blog-json.js [--dry-run] [--verbose] [--mapping=<file>]
 */

const fs = require('fs');
const path = require('path');

// Parse CLI arguments
const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');
const isVerbose = args.includes('--verbose');
const mappingPath = args.find(arg => arg.startsWith('--mapping='))?.split('=')[1];

// Statistics
const stats = {
  filesProcessed: 0,
  filesModified: 0,
  imagesUpdated: 0,
  imagesUnchanged: 0,
  errors: [],
};

// Known image path mappings (old -> new)
// Can be loaded from file or use default patterns
const DEFAULT_PATH_PATTERNS = [
  { from: /^\/images\//, to: '/optimized/' },
  { from: /^\/optimized\/(.*)$/, to: '/optimized/blog/$1' }, // Fallback pattern
];

/**
 * Load custom path mappings from file
 */
function loadPathMappings() {
  if (!mappingPath) return null;
  
  const fullPath = path.resolve(process.cwd(), mappingPath);
  if (!fs.existsSync(fullPath)) {
    console.warn(`Mapping file not found: ${fullPath}`);
    return null;
  }
  
  try {
    const content = fs.readFileSync(fullPath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`Error loading mapping file: ${error.message}`);
    return null;
  }
}

/**
 * Apply path transformation based on patterns
 */
function transformImagePath(oldPath, patterns) {
  if (!oldPath || typeof oldPath !== 'string') return oldPath;
  
  // Check if already categorized
  if (oldPath.match(/^\/optimized\/(blog|products|marketing|logos|team|misc|locations)\//)) {
    return oldPath; // Already categorized
  }
  
  // Apply custom patterns first
  if (patterns) {
    for (const mapping of patterns) {
      if (oldPath === mapping.from) {
        return mapping.to;
      }
    }
  }
  
  // Apply default patterns
  for (const pattern of DEFAULT_PATH_PATTERNS) {
    const match = oldPath.match(pattern.from);
    if (match) {
      // Extract filename and determine category
      const filename = path.basename(oldPath);
      const category = categorizeImage(filename, oldPath);
      return `/optimized/${category}/${filename}`;
    }
  }
  
  return oldPath;
}

/**
 * Categorize an image based on filename and path
 */
function categorizeImage(filename, fullPath) {
  const lowerName = filename.toLowerCase();
  const lowerPath = fullPath.toLowerCase();
  
  // Team images
  if (lowerPath.includes('team/') || lowerName.includes('team')) {
    return 'team';
  }
  
  // Logo images
  if (lowerName.includes('logo') || lowerName.includes('favicon') || lowerName.includes('apple-touch')) {
    return 'logos';
  }
  
  // Product images
  if (lowerName.match(/\d+g/) || lowerName.includes('bag') || lowerName.includes('product')) {
    return 'products';
  }
  
  // Marketing/educational images
  if (lowerName.includes('marketing') || lowerName.includes('benefit') || lowerName.includes('comparison')) {
    return 'marketing';
  }
  
  // Blog hero/content images
  if (lowerName.includes('hero') || lowerName.includes('blog') || lowerName.includes('guide')) {
    return 'blog';
  }
  
  // Location images
  if (lowerPath.includes('location') || lowerPath.includes('province')) {
    return 'locations';
  }
  
  // Default to misc
  return 'misc';
}

/**
 * Recursively traverse and update object properties
 */
function traverseAndUpdate(obj, imageKeys, pathPatterns) {
  let modified = false;
  
  if (typeof obj !== 'object' || obj === null) {
    return { value: obj, modified };
  }
  
  if (Array.isArray(obj)) {
    const newArray = [];
    for (let i = 0; i < obj.length; i++) {
      const result = traverseAndUpdate(obj[i], imageKeys, pathPatterns);
      newArray[i] = result.value;
      if (result.modified) modified = true;
    }
    return { value: newArray, modified };
  }
  
  const newObj = {};
  for (const [key, value] of Object.entries(obj)) {
    // Check if this key should be treated as an image path
    const isImageKey = imageKeys.includes(key);
    
    if (isImageKey && typeof value === 'string') {
      // Transform the image path
      const newPath = transformImagePath(value, pathPatterns);
      newObj[key] = newPath;
      
      if (newPath !== value) {
        modified = true;
        stats.imagesUpdated++;
        if (isVerbose) {
          console.log(`    ${key}: ${value} → ${newPath}`);
        }
      } else {
        stats.imagesUnchanged++;
      }
    } else if (typeof value === 'object' && value !== null) {
      // Recurse into nested objects
      const result = traverseAndUpdate(value, imageKeys, pathPatterns);
      newObj[key] = result.value;
      if (result.modified) modified = true;
    } else {
      newObj[key] = value;
    }
  }
  
  return { value: newObj, modified };
}

/**
 * Find all blog JSON files
 */
function findBlogJsonFiles() {
  const blogDir = path.join(process.cwd(), 'content', 'blog');
  const files = [];
  
  if (!fs.existsSync(blogDir)) {
    console.warn(`Blog directory not found: ${blogDir}`);
    return files;
  }
  
  const locales = fs.readdirSync(blogDir);
  
  for (const locale of locales) {
    const localeDir = path.join(blogDir, locale);
    if (!fs.statSync(localeDir).isDirectory()) continue;
    
    const jsonFiles = fs.readdirSync(localeDir)
      .filter(f => f.endsWith('.json'))
      .map(f => path.join(localeDir, f));
    
    files.push(...jsonFiles);
  }
  
  return files;
}

/**
 * Process a single blog JSON file
 */
function processBlogFile(filePath, pathPatterns) {
  if (isVerbose) {
    console.log(`Processing: ${path.relative(process.cwd(), filePath)}`);
  }
  
  let content;
  try {
    content = fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    stats.errors.push({ file: filePath, error: `Read error: ${error.message}` });
    return false;
  }
  
  let json;
  try {
    json = JSON.parse(content);
  } catch (error) {
    stats.errors.push({ file: filePath, error: `Parse error: ${error.message}` });
    return false;
  }
  
  // Keys that contain image paths
  const imageKeys = ['url', 'src', 'image', 'ogImage', 'avatar'];
  
  const result = traverseAndUpdate(json, imageKeys, pathPatterns);
  
  if (result.modified) {
    const newContent = JSON.stringify(result.value, null, 2);
    
    if (!isDryRun) {
      // Preserve original newline at end if present
      const hasTrailingNewline = content.endsWith('\n');
      const output = newContent + (hasTrailingNewline ? '\n' : '');
      fs.writeFileSync(filePath, output, 'utf8');
    }
    
    stats.filesModified++;
    if (!isVerbose) {
      console.log(`✓ ${path.relative(process.cwd(), filePath)}`);
    }
    return true;
  }
  
  if (isVerbose) {
    console.log(`  (no changes)`);
  }
  
  return false;
}

/**
 * Main function
 */
function main() {
  console.log('='.repeat(60));
  console.log('Phase 2: Update Blog JSON Files');
  console.log('='.repeat(60));
  console.log(`Mode: ${isDryRun ? 'DRY RUN (no changes will be made)' : 'LIVE'}`);
  console.log('');
  
  const pathPatterns = loadPathMappings();
  if (pathPatterns) {
    console.log(`Loaded ${pathPatterns.length} path mappings`);
  }
  
  const files = findBlogJsonFiles();
  console.log(`Found ${files.length} blog JSON files`);
  console.log('');
  
  for (const filePath of files) {
    stats.filesProcessed++;
    processBlogFile(filePath, pathPatterns);
  }
  
  // Print summary
  console.log('');
  console.log('='.repeat(60));
  console.log('Summary');
  console.log('='.repeat(60));
  console.log(`Files processed: ${stats.filesProcessed}`);
  console.log(`Files modified: ${stats.filesModified}`);
  console.log(`Images updated: ${stats.imagesUpdated}`);
  console.log(`Images unchanged: ${stats.imagesUnchanged}`);
  
  if (stats.errors.length > 0) {
    console.log('');
    console.log(`Errors: ${stats.errors.length}`);
    for (const err of stats.errors) {
      console.error(`  ${path.relative(process.cwd(), err.file)}: ${err.error}`);
    }
  }
  
  if (isDryRun) {
    console.log('');
    console.log('(Dry run - no files were modified)');
  }
  
  process.exit(stats.errors.length > 0 ? 1 : 0);
}

main();
