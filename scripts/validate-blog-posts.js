#!/usr/bin/env node
/**
 * Blog Posts Validation Script
 * 
 * Validates all blog posts across all locales (en, fr, zh, es).
 * Checks JSON syntax, required fields, image existence, content length,
 * and reports missing translations.
 * 
 * Usage: node scripts/validate-blog-posts.js [--fix] [--json]
 *   --fix   Attempt to auto-fix minor issues
 *   --json  Output report as JSON
 */

const fs = require('fs');
const path = require('path');

// Configuration
const BLOG_DIR = path.join(__dirname, '..', 'content', 'blog');
const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const OPTIMIZED_DIR = path.join(PUBLIC_DIR, 'optimized');
const IMAGES_DIR = path.join(PUBLIC_DIR, 'images');
const LOCALES = ['en', 'fr', 'zh', 'es'];

// Colors for terminal output
const COLORS = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m',
};

// Validation state
const report = {
  summary: {
    totalPosts: 0,
    validPosts: 0,
    postsWithErrors: 0,
    postsWithWarnings: 0,
    missingTranslations: 0,
    missingImages: 0,
    jsonErrors: 0,
  },
  byLocale: {},
  errors: [],
  warnings: [],
  missingTranslations: [],
  missingImages: [],
};

// Initialize report structure for each locale
LOCALES.forEach(locale => {
  report.byLocale[locale] = {
    total: 0,
    valid: 0,
    errors: 0,
    warnings: 0,
  };
});

/**
 * Get all JSON files in a directory
 */
function getJsonFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(file => file.endsWith('.json'))
    .map(file => path.join(dir, file));
}

/**
 * Check if a file exists
 */
function fileExists(filePath) {
  // Handle both absolute and relative paths
  if (filePath.startsWith('/')) {
    return fs.existsSync(filePath);
  }
  // Try in public directory
  const fullPath = path.join(PUBLIC_DIR, filePath);
  return fs.existsSync(fullPath);
}

/**
 * Extract image URLs from content HTML
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
 * Validate a single blog post
 */
function validateBlogPost(filePath, locale) {
  const filename = path.basename(filePath);
  const slug = filename.replace('.json', '');
  const result = {
    file: filename,
    locale,
    slug,
    errors: [],
    warnings: [],
    missingImages: [],
  };

  // Read and parse JSON
  let data;
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    data = JSON.parse(content);
  } catch (e) {
    result.errors.push(`JSON parse error: ${e.message}`);
    report.summary.jsonErrors++;
    return result;
  }

  // Check required fields
  const requiredFields = ['id', 'slug', 'title', 'content', 'excerpt', 'featuredImage', 'locale'];
  for (const field of requiredFields) {
    if (!data[field]) {
      result.errors.push(`Missing required field: ${field}`);
    }
  }

  // Check featuredImage structure
  if (data.featuredImage) {
    if (!data.featuredImage.url) {
      result.errors.push('featuredImage.url is missing');
    } else {
      // Check if featured image exists
      if (!fileExists(data.featuredImage.url)) {
        result.missingImages.push(data.featuredImage.url);
        result.errors.push(`Featured image not found: ${data.featuredImage.url}`);
        report.summary.missingImages++;
      }
    }
    if (!data.featuredImage.alt) {
      result.warnings.push('featuredImage.alt is missing (recommended for accessibility)');
    }
  }

  // Check author
  if (!data.author) {
    result.warnings.push('Author information is missing');
  } else if (!data.author.name) {
    result.warnings.push('Author name is missing');
  }

  // Check dates
  if (!data.publishDate) {
    result.warnings.push('publishDate is missing');
  } else if (!/^\d{4}-\d{2}-\d{2}$/.test(data.publishDate)) {
    result.warnings.push(`Invalid publishDate format: ${data.publishDate} (expected YYYY-MM-DD)`);
  }

  // Check SEO fields
  if (data.seo) {
    if (!data.seo.metaTitle) {
      result.warnings.push('SEO metaTitle is missing');
    }
    if (!data.seo.metaDescription) {
      result.warnings.push('SEO metaDescription is missing');
    }
  } else {
    result.warnings.push('SEO section is missing');
  }

  // Check content images
  if (data.content) {
    const contentImages = extractImagesFromContent(data.content);
    for (const imgUrl of contentImages) {
      if (!fileExists(imgUrl)) {
        result.missingImages.push(imgUrl);
        result.errors.push(`Content image not found: ${imgUrl}`);
        report.summary.missingImages++;
      }
    }
  }

  // Check content length (warn if very short)
  if (data.content) {
    const textContent = data.content.replace(/<[^>]+>/g, '');
    const wordCount = textContent.split(/\s+/).length;
    if (wordCount < 200) {
      result.warnings.push(`Content is very short (${wordCount} words)`);
    }
  }

  // Check status
  if (!data.status) {
    result.warnings.push('Status field is missing (defaults to draft)');
  } else if (!['published', 'draft', 'archived'].includes(data.status)) {
    result.warnings.push(`Unknown status: ${data.status}`);
  }

  return result;
}

/**
 * Find missing translations by comparing to English
 */
function findMissingTranslations() {
  const enDir = path.join(BLOG_DIR, 'en');
  const enFiles = getJsonFiles(enDir).map(f => path.basename(f));

  for (const locale of LOCALES.filter(l => l !== 'en')) {
    const localeDir = path.join(BLOG_DIR, locale);
    if (!fs.existsSync(localeDir)) continue;

    const localeFiles = getJsonFiles(localeDir).map(f => path.basename(f));
    
    // Find missing translations
    for (const enFile of enFiles) {
      if (!localeFiles.includes(enFile)) {
        report.missingTranslations.push({
          locale,
          file: enFile,
          type: 'missing',
        });
        report.summary.missingTranslations++;
      }
    }

    // Find extra translations (not in English)
    for (const localeFile of localeFiles) {
      if (!enFiles.includes(localeFile)) {
        report.missingTranslations.push({
          locale,
          file: localeFile,
          type: 'orphan',
        });
      }
    }
  }
}

/**
 * Compare content length across locales
 */
function compareContentLengths() {
  const enDir = path.join(BLOG_DIR, 'en');
  const enFiles = getJsonFiles(enDir);

  for (const enFile of enFiles) {
    let enData;
    try {
      enData = JSON.parse(fs.readFileSync(enFile, 'utf-8'));
    } catch (e) {
      continue; // Skip files that can't be parsed
    }
    
    const enContent = enData.content || '';
    const enText = enContent.replace(/<[^>]+>/g, '');
    const enWordCount = enText.split(/\s+/).length;
    const slug = path.basename(enFile, '.json');

    for (const locale of LOCALES.filter(l => l !== 'en')) {
      const localeFile = path.join(BLOG_DIR, locale, `${slug}.json`);
      if (!fs.existsSync(localeFile)) continue;

      let localeData;
      try {
        localeData = JSON.parse(fs.readFileSync(localeFile, 'utf-8'));
      } catch (e) {
        continue; // Skip files that can't be parsed
      }
      
      const localeContent = localeData.content || '';
      const localeText = localeContent.replace(/<[^>]+>/g, '');
      const localeWordCount = localeText.split(/\s+/).length;

      // Check if translation is significantly shorter (less than 50%)
      if (enWordCount > 0 && localeWordCount < enWordCount * 0.5) {
        report.warnings.push({
          locale,
          file: `${locale}/${slug}.json`,
          slug,
          messages: [`Translation is much shorter than English (${localeWordCount} vs ${enWordCount} words)`],
        });
      }
    }
  }
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
 * Print report to console
 */
function printReport() {
  print('\n');
  print('='.repeat(80) + '\n', 'bold');
  print('BLOG POSTS VALIDATION REPORT\n', 'bold');
  print('='.repeat(80) + '\n', 'bold');

  // Summary
  print('\n📊 SUMMARY\n', 'bold');
  print(`Total posts checked: ${report.summary.totalPosts}\n`);
  print(`Valid posts: ${report.summary.validPosts}\n`, 'green');
  print(`Posts with errors: ${report.summary.postsWithErrors}\n`, report.summary.postsWithErrors > 0 ? 'red' : 'reset');
  print(`Posts with warnings: ${report.summary.postsWithWarnings}\n`, report.summary.postsWithWarnings > 0 ? 'yellow' : 'reset');
  print(`Missing translations: ${report.summary.missingTranslations}\n`, report.summary.missingTranslations > 0 ? 'yellow' : 'reset');
  print(`Missing images: ${report.summary.missingImages}\n`, report.summary.missingImages > 0 ? 'red' : 'reset');
  print(`JSON errors: ${report.summary.jsonErrors}\n`, report.summary.jsonErrors > 0 ? 'red' : 'reset');

  // By locale
  print('\n📍 BY LOCALE\n', 'bold');
  for (const [locale, stats] of Object.entries(report.byLocale)) {
    const localeLabel = locale.toUpperCase();
    print(`  ${localeLabel}: ${stats.total} posts`);
    if (stats.errors > 0) print(` (${stats.errors} errors)`, 'red');
    if (stats.warnings > 0) print(` (${stats.warnings} warnings)`, 'yellow');
    print('\n');
  }

  // Errors
  if (report.errors.length > 0) {
    print('\n❌ ERRORS\n', 'bold');
    report.errors.forEach(err => {
      print(`  [${err.locale.toUpperCase()}] ${err.file}\n`, 'red');
      err.messages.forEach(msg => {
        print(`    • ${msg}\n`);
      });
    });
  }

  // Warnings
  if (report.warnings.length > 0) {
    print('\n⚠️  WARNINGS\n', 'bold');
    report.warnings.forEach((warn, i) => {
      if (i < 20) { // Limit warnings displayed
        print(`  [${warn.locale?.toUpperCase() || 'ALL'}] ${warn.file}\n`, 'yellow');
        warn.messages?.forEach(msg => {
          print(`    • ${msg}\n`);
        });
      }
    });
    if (report.warnings.length > 20) {
      print(`  ... and ${report.warnings.length - 20} more warnings\n`, 'yellow');
    }
  }

  // Missing translations
  if (report.missingTranslations.length > 0) {
    print('\n🌐 MISSING TRANSLATIONS\n', 'bold');
    const missing = report.missingTranslations.filter(t => t.type === 'missing');
    const orphans = report.missingTranslations.filter(t => t.type === 'orphan');

    if (missing.length > 0) {
      print('\n  Not translated from English:\n', 'yellow');
      missing.forEach(item => {
        print(`    • [${item.locale.toUpperCase()}] ${item.file}\n`);
      });
    }

    if (orphans.length > 0) {
      print('\n  Orphan translations (not in English):\n', 'cyan');
      orphans.forEach(item => {
        print(`    • [${item.locale.toUpperCase()}] ${item.file}\n`);
      });
    }
  }

  // Missing images
  if (report.missingImages.length > 0) {
    print('\n🖼️  MISSING IMAGES\n', 'bold');
    report.missingImages.forEach(item => {
      print(`  • ${item}\n`, 'red');
    });
  }

  print('\n' + '='.repeat(80) + '\n', 'bold');
}

/**
 * Main validation function
 */
async function main() {
  const args = process.argv.slice(2);
  const outputJson = args.includes('--json');
  const fixMode = args.includes('--fix');

  print('\n🔍 Validating blog posts...\n', 'cyan');

  // Validate each locale
  for (const locale of LOCALES) {
    const localeDir = path.join(BLOG_DIR, locale);
    if (!fs.existsSync(localeDir)) {
      print(`Directory not found: ${localeDir}\n`, 'yellow');
      continue;
    }

    const files = getJsonFiles(localeDir);
    report.byLocale[locale].total = files.length;
    report.summary.totalPosts += files.length;

    for (const file of files) {
      const validation = validateBlogPost(file, locale);
      
      if (validation.errors.length > 0) {
        report.errors.push({
          locale,
          file: validation.file,
          slug: validation.slug,
          messages: validation.errors,
          missingImages: validation.missingImages,
        });
        report.byLocale[locale].errors++;
        report.summary.postsWithErrors++;
      }

      if (validation.warnings.length > 0) {
        report.warnings.push({
          locale,
          file: validation.file,
          slug: validation.slug,
          messages: validation.warnings,
        });
        report.byLocale[locale].warnings++;
        report.summary.postsWithWarnings++;
      }

      if (validation.errors.length === 0 && validation.warnings.length === 0) {
        report.byLocale[locale].valid++;
        report.summary.validPosts++;
      }

      // Collect missing images
      if (validation.missingImages.length > 0) {
        validation.missingImages.forEach(img => {
          if (!report.missingImages.includes(img)) {
            report.missingImages.push(img);
          }
        });
      }
    }
  }

  // Find missing translations
  findMissingTranslations();

  // Compare content lengths
  compareContentLengths();

  // Output
  if (outputJson) {
    console.log(JSON.stringify(report, null, 2));
  } else {
    printReport();
  }

  // Exit with error code if there are errors
  process.exit(report.summary.postsWithErrors > 0 ? 1 : 0);
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
