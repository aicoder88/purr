#!/usr/bin/env node
/**
 * Blog Routes Test Script
 * 
 * This script validates the blog routing and content structure.
 * It can be extended to perform automated HTTP testing.
 * 
 * Usage:
 *   node scripts/test-blog-routes.js              # List all routes
 *   node scripts/test-blog-routes.js --validate   # Validate JSON files
 *   node scripts/test-blog-routes.js --check-urls # Check URL accessibility (requires server)
 */

const fs = require('fs');
const path = require('path');

// Configuration
const CONTENT_DIR = path.join(__dirname, '..', 'content', 'blog');
const LOCALES = ['en', 'fr', 'zh', 'es'];
const BASE_URL = process.env.BASE_URL || 'https://www.purrify.ca';

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m'
};

/**
 * Get all blog posts for a locale
 */
function getPostsForLocale(locale) {
  const localeDir = path.join(CONTENT_DIR, locale);
  
  if (!fs.existsSync(localeDir)) {
    return [];
  }
  
  return fs.readdirSync(localeDir)
    .filter(file => file.endsWith('.json'))
    .map(file => ({
      slug: file.replace('.json', ''),
      file: path.join(localeDir, file)
    }));
}

/**
 * Validate JSON file
 */
function validateJson(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    JSON.parse(content);
    return { valid: true, error: null };
  } catch (error) {
    return { valid: false, error: error.message };
  }
}

/**
 * Extract post metadata
 */
function getPostMetadata(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(content);
    return {
      title: data.title || 'Untitled',
      status: data.status || 'unknown',
      hasFeaturedImage: !!data.featuredImage?.url,
      publishDate: data.publishDate || 'unknown'
    };
  } catch (error) {
    return { error: error.message };
  }
}

/**
 * Generate all blog URLs
 */
function generateUrls() {
  const urls = {
    index: [],
    posts: []
  };
  
  LOCALES.forEach(locale => {
    // Index URL
    urls.index.push({
      locale,
      url: `${BASE_URL}/${locale}/blog/`,
      localPath: `/blog/`
    });
    
    // Post URLs
    const posts = getPostsForLocale(locale);
    posts.forEach(post => {
      urls.posts.push({
        locale,
        slug: post.slug,
        url: `${BASE_URL}/${locale}/blog/${post.slug}`,
        localPath: `/blog/${post.slug}`,
        file: post.file
      });
    });
  });
  
  // Add redirect URL
  urls.index.push({
    locale: 'redirect',
    url: `${BASE_URL}/blog/`,
    localPath: '/blog/',
    note: 'Redirects to /en/blog/'
  });
  
  return urls;
}

/**
 * Print section header
 */
function printHeader(title) {
  console.log('\n' + colors.cyan + '='.repeat(60) + colors.reset);
  console.log(colors.cyan + title + colors.reset);
  console.log(colors.cyan + '='.repeat(60) + colors.reset);
}

/**
 * Print summary statistics
 */
function printSummary(stats) {
  printHeader('SUMMARY');
  
  console.log(`\n${colors.blue}Total Posts by Locale:${colors.reset}`);
  LOCALES.forEach(locale => {
    const count = stats.byLocale[locale] || 0;
    const status = count === 49 
      ? colors.green + '✅' 
      : colors.yellow + '⚠️';
    console.log(`  ${status} ${locale.toUpperCase()}: ${count} posts${colors.reset}`);
  });
  
  console.log(`\n${colors.blue}JSON Validation:${colors.reset}`);
  console.log(`  ${colors.green}✅ Valid: ${stats.validJson}${colors.reset}`);
  console.log(`  ${stats.invalidJson > 0 ? colors.red : colors.green}❌ Invalid: ${stats.invalidJson}${colors.reset}`);
  
  console.log(`\n${colors.blue}Total Files:${colors.reset} ${stats.totalFiles}`);
  console.log(`${colors.blue}Total URLs:${colors.reset} ${stats.totalUrls}`);
  
  // Overall status
  const allLocalesComplete = LOCALES.every(locale => (stats.byLocale[locale] || 0) === 49);
  const noInvalidJson = stats.invalidJson === 0;
  
  console.log(`\n${colors.cyan}Overall Status:${colors.reset}`);
  if (allLocalesComplete && noInvalidJson) {
    console.log(colors.green + '  ✅ ALL CHECKS PASSED - Blog is ready!' + colors.reset);
  } else {
    console.log(colors.yellow + '  ⚠️  Some issues need attention' + colors.reset);
  }
}

/**
 * Main function
 */
function main() {
  const args = process.argv.slice(2);
  const validateMode = args.includes('--validate');
  const listMode = args.includes('--list');
  const helpMode = args.includes('--help') || args.includes('-h');
  
  if (helpMode) {
    console.log(`
${colors.cyan}Blog Routes Test Script${colors.reset}

Usage:
  node scripts/test-blog-routes.js [options]

Options:
  --validate    Validate all JSON files
  --list        List all blog URLs
  --help, -h    Show this help message

Examples:
  node scripts/test-blog-routes.js           # Show summary
  node scripts/test-blog-routes.js --list    # List all URLs
  node scripts/test-blog-routes.js --validate # Validate JSON files
`);
    return;
  }
  
  console.log(colors.cyan + `
╔══════════════════════════════════════════════════════════╗
║           BLOG ROUTES TEST SCRIPT                        ║
╚══════════════════════════════════════════════════════════╝
` + colors.reset);
  
  const urls = generateUrls();
  const stats = {
    byLocale: {},
    validJson: 0,
    invalidJson: 0,
    totalFiles: 0,
    totalUrls: urls.index.length + urls.posts.length
  };
  
  // Count by locale
  LOCALES.forEach(locale => {
    stats.byLocale[locale] = urls.posts.filter(p => p.locale === locale).length;
  });
  
  // Validate JSON files
  if (validateMode || !listMode) {
    printHeader('JSON VALIDATION');
    
    let invalidFiles = [];
    urls.posts.forEach(post => {
      const result = validateJson(post.file);
      stats.totalFiles++;
      
      if (result.valid) {
        stats.validJson++;
      } else {
        stats.invalidJson++;
        invalidFiles.push({ file: post.file, error: result.error });
      }
    });
    
    console.log(`\n${colors.green}✅ Valid JSON files: ${stats.validJson}${colors.reset}`);
    
    if (stats.invalidJson > 0) {
      console.log(`${colors.red}❌ Invalid JSON files: ${stats.invalidJson}${colors.reset}`);
      console.log(`\n${colors.red}Invalid files:${colors.reset}`);
      invalidFiles.forEach(({ file, error }) => {
        console.log(`  - ${path.relative(process.cwd(), file)}`);
        console.log(`    ${colors.gray}${error}${colors.reset}`);
      });
    }
  }
  
  // List URLs
  if (listMode) {
    printHeader('BLOG INDEX URLS');
    urls.index.forEach(item => {
      const note = item.note ? ` ${colors.gray}(${item.note})${colors.reset}` : '';
      console.log(`  ${colors.blue}${item.url}${colors.reset}${note}`);
    });
    
    printHeader('BLOG POST URLS');
    LOCALES.forEach(locale => {
      const localePosts = urls.posts.filter(p => p.locale === locale);
      console.log(`\n${colors.yellow}[${locale.toUpperCase()}] ${localePosts.length} posts${colors.reset}`);
      
      localePosts.slice(0, 10).forEach(post => {
        console.log(`  ${colors.gray}${post.url}${colors.reset}`);
      });
      
      if (localePosts.length > 10) {
        console.log(`  ${colors.gray}... and ${localePosts.length - 10} more${colors.reset}`);
      }
    });
  }
  
  // Sample posts with metadata
  if (!listMode && !validateMode) {
    printHeader('SAMPLE POSTS');
    
    LOCALES.forEach(locale => {
      const posts = urls.posts.filter(p => p.locale === locale);
      if (posts.length > 0) {
        const sample = posts[0];
        const meta = getPostMetadata(sample.file);
        
        console.log(`\n${colors.yellow}[${locale.toUpperCase()}]${colors.reset}`);
        console.log(`  Slug: ${colors.cyan}${sample.slug}${colors.reset}`);
        console.log(`  Title: ${meta.title || 'N/A'}`);
        console.log(`  Status: ${meta.status || 'N/A'}`);
        console.log(`  Featured Image: ${meta.hasFeaturedImage ? colors.green + '✅' : colors.red + '❌'}${colors.reset}`);
      }
    });
  }
  
  // Print summary
  printSummary(stats);
  
  // Export for CI/CD (optional)
  if (args.includes('--json')) {
    const output = {
      timestamp: new Date().toISOString(),
      stats,
      urls: {
        index: urls.index,
        posts: urls.posts.map(p => ({
          locale: p.locale,
          slug: p.slug,
          url: p.url
        }))
      }
    };
    
    const outputPath = path.join(__dirname, '..', 'blog-routes-report.json');
    fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
    console.log(`\n${colors.gray}Report saved to: ${outputPath}${colors.reset}`);
  }
  
  // Exit with appropriate code for CI/CD
  const allLocalesComplete = LOCALES.every(locale => (stats.byLocale[locale] || 0) === 49);
  const noInvalidJson = stats.invalidJson === 0;
  
  if (!allLocalesComplete || !noInvalidJson) {
    process.exit(1);
  }
}

// Run main function
main();
