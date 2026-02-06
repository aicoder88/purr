#!/usr/bin/env node
/**
 * Blog Images Synchronization Script
 * 
 * Ensures all translations use the SAME image URLs as the English version.
 * Updates featuredImage.url and all <img src="..."> in content to match English.
 * Only changes image URLs, not alt text (alt text should remain translated).
 * 
 * Usage: node scripts/sync-blog-images.js [--dry-run] [--verbose]
 *   --dry-run    Show what would be changed without making changes
 *   --verbose    Show detailed output for each file
 */

const fs = require('fs');
const path = require('path');

// Configuration
const BLOG_DIR = path.join(__dirname, '..', 'content', 'blog');
const LOCALES = ['fr', 'zh', 'es']; // Locales to sync (excluding 'en')
const EN_LOCALE = 'en';

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
  featuredImagesSynced: 0,
  contentImagesSynced: 0,
  skipped: 0,
  errors: 0,
};

/**
 * Get all JSON files in a directory
 */
function getJsonFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(file => file.endsWith('.json'))
    .map(file => ({
      name: file,
      path: path.join(dir, file),
    }));
}

/**
 * Extract all image src URLs from HTML content
 */
function extractImagesFromContent(content) {
  const images = [];
  const imgRegex = /<img[^>]+src="([^"]+)"/g;
  let match;
  while ((match = imgRegex.exec(content)) !== null) {
    images.push(match[1]);
  }
  return images;
}

/**
 * Replace image src URLs in HTML content
 */
function replaceImagesInContent(content, imageMap) {
  let newContent = content;
  for (const [oldUrl, newUrl] of Object.entries(imageMap)) {
    if (oldUrl !== newUrl) {
      // Replace src attribute
      const regex = new RegExp(`src="${escapeRegex(oldUrl)}"`, 'g');
      newContent = newContent.replace(regex, `src="${newUrl}"`);
    }
  }
  return newContent;
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
 * Sync images for a single blog post
 */
function syncBlogPost(enFile, localeFile, locale, options = {}) {
  const { dryRun, verbose } = options;
  const slug = path.basename(enFile.name, '.json');
  
  stats.filesChecked++;

  // Read English version
  let enData;
  try {
    enData = JSON.parse(fs.readFileSync(enFile.path, 'utf-8'));
  } catch (e) {
    print(`  ❌ Error reading English file: ${e.message}\n`, 'red');
    stats.errors++;
    return false;
  }

  // Read locale version
  let localeData;
  try {
    localeData = JSON.parse(fs.readFileSync(localeFile.path, 'utf-8'));
  } catch (e) {
    print(`  ❌ Error reading ${locale.toUpperCase()} file: ${e.message}\n`, 'red');
    stats.errors++;
    return false;
  }

  const changes = [];
  let modified = false;

  // Sync featured image URL
  if (enData.featuredImage && enData.featuredImage.url) {
    const enFeaturedUrl = enData.featuredImage.url;
    
    if (!localeData.featuredImage) {
      localeData.featuredImage = { ...enData.featuredImage };
      changes.push(`Added featuredImage with URL: ${enFeaturedUrl}`);
      modified = true;
      stats.featuredImagesSynced++;
    } else if (localeData.featuredImage.url !== enFeaturedUrl) {
      const oldUrl = localeData.featuredImage.url;
      localeData.featuredImage.url = enFeaturedUrl;
      // Keep the locale's alt text (don't overwrite)
      changes.push(`Featured image URL: ${oldUrl} → ${enFeaturedUrl}`);
      modified = true;
      stats.featuredImagesSynced++;
    }
  }

  // Sync SEO ogImage
  if (enData.seo && enData.seo.ogImage) {
    if (!localeData.seo) {
      localeData.seo = {};
    }
    if (localeData.seo.ogImage !== enData.seo.ogImage) {
      const oldOg = localeData.seo.ogImage;
      localeData.seo.ogImage = enData.seo.ogImage;
      changes.push(`SEO ogImage: ${oldOg || 'none'} → ${enData.seo.ogImage}`);
      modified = true;
    }
  }

  // Build image mapping from content
  if (enData.content && localeData.content) {
    const enImages = extractImagesFromContent(enData.content);
    const localeImages = extractImagesFromContent(localeData.content);

    // Create a mapping: locale image -> English image (by position)
    const imageMap = {};
    let hasImageMismatch = false;

    for (let i = 0; i < Math.max(enImages.length, localeImages.length); i++) {
      if (i < enImages.length && i < localeImages.length) {
        if (enImages[i] !== localeImages[i]) {
          imageMap[localeImages[i]] = enImages[i];
          hasImageMismatch = true;
        }
      } else if (i < enImages.length && i >= localeImages.length) {
        // English has more images
        changes.push(`Missing image in translation: ${enImages[i]}`);
        hasImageMismatch = true;
      } else if (i >= enImages.length && i < localeImages.length) {
        // Locale has extra images
        changes.push(`Extra image in translation: ${localeImages[i]}`);
        hasImageMismatch = true;
      }
    }

    if (hasImageMismatch && Object.keys(imageMap).length > 0) {
      const newContent = replaceImagesInContent(localeData.content, imageMap);
      if (newContent !== localeData.content) {
        localeData.content = newContent;
        for (const [old, new_] of Object.entries(imageMap)) {
          changes.push(`Content image: ${old} → ${new_}`);
        }
        modified = true;
        stats.contentImagesSynced += Object.keys(imageMap).length;
      }
    }
  }

  // Save changes
  if (modified) {
    if (dryRun) {
      print(`  [DRY-RUN] Would update ${locale.toUpperCase()}/${slug}.json:\n`, 'yellow');
    } else {
      fs.writeFileSync(localeFile.path, JSON.stringify(localeData, null, 2) + '\n', 'utf-8');
      print(`  ✅ Updated ${locale.toUpperCase()}/${slug}.json:\n`, 'green');
      stats.filesUpdated++;
    }

    if (verbose || dryRun) {
      changes.forEach(change => {
        print(`     • ${change}\n`, 'gray');
      });
    }
    return true;
  } else {
    if (verbose) {
      print(`  ✓ ${locale.toUpperCase()}/${slug}.json - No changes needed\n`, 'gray');
    }
    stats.skipped++;
    return false;
  }
}

/**
 * Main sync function
 */
async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const verbose = args.includes('--verbose');
  const specificLocale = args.find(arg => LOCALES.includes(arg));
  const specificSlug = args.find(arg => arg && !arg.startsWith('--'));

  print('\n');
  print('='.repeat(80) + '\n', 'bold');
  print('BLOG IMAGES SYNCHRONIZATION\n', 'bold');
  print('='.repeat(80) + '\n', 'bold');

  if (dryRun) {
    print('🔍 DRY RUN MODE - No files will be modified\n\n', 'yellow');
  }

  // Determine which locales to process
  const localesToProcess = specificLocale ? [specificLocale] : LOCALES;

  // Get English files
  const enDir = path.join(BLOG_DIR, EN_LOCALE);
  const enFiles = getJsonFiles(enDir);

  print(`Found ${enFiles.length} English blog posts\n`, 'cyan');
  print(`Processing locales: ${localesToProcess.join(', ')}\n\n`, 'cyan');

  // Process each locale
  for (const locale of localesToProcess) {
    const localeDir = path.join(BLOG_DIR, locale);
    
    if (!fs.existsSync(localeDir)) {
      print(`⚠️  Directory not found: ${localeDir}\n`, 'yellow');
      continue;
    }

    print(`\n📁 Processing ${locale.toUpperCase()}...\n`, 'bold');

    for (const enFile of enFiles) {
      const slug = path.basename(enFile.name, '.json');

      // Skip if specific slug specified and doesn't match
      if (specificSlug && slug !== specificSlug) continue;

      const localeFilePath = path.join(localeDir, enFile.name);
      
      if (!fs.existsSync(localeFilePath)) {
        if (verbose) {
          print(`  ⚠️  Missing translation: ${locale}/${slug}.json\n`, 'yellow');
        }
        continue;
      }

      const localeFile = {
        name: enFile.name,
        path: localeFilePath,
      };

      syncBlogPost(enFile, localeFile, locale, { dryRun, verbose });
    }
  }

  // Print summary
  print('\n');
  print('='.repeat(80) + '\n', 'bold');
  print('SYNCHRONIZATION SUMMARY\n', 'bold');
  print('='.repeat(80) + '\n', 'bold');
  print(`Files checked: ${stats.filesChecked}\n`);
  print(`Files updated: ${stats.filesUpdated}\n`, stats.filesUpdated > 0 ? 'green' : 'reset');
  print(`Featured images synced: ${stats.featuredImagesSynced}\n`, stats.featuredImagesSynced > 0 ? 'green' : 'reset');
  print(`Content images synced: ${stats.contentImagesSynced}\n`, stats.contentImagesSynced > 0 ? 'green' : 'reset');
  print(`Files skipped (no changes): ${stats.skipped}\n`, 'gray');
  print(`Errors: ${stats.errors}\n`, stats.errors > 0 ? 'red' : 'reset');

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
