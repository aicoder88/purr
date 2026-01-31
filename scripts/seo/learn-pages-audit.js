#!/usr/bin/env node
/**
 * Learn Pages Content Audit
 * Analyzes static pages for content quality
 */

const fs = require('fs');
const path = require('path');

const LEARN_DIR = path.join(process.cwd(), 'pages/learn');
const MIN_WORD_COUNT = 300;

// Extract text content from TSX files
function extractTextFromTsx(content) {
  // Extract string literals
  const strings = [];
  
  // Match quoted strings
  const quoteRegex = /["']([^"']{10,})["']/g;
  let match;
  while ((match = quoteRegex.exec(content)) !== null) {
    strings.push(match[1]);
  }
  
  // Match JSX text content (between tags)
  const jsxTextRegex = />([^<]{10,})</g;
  while ((match = jsxTextRegex.exec(content)) !== null) {
    strings.push(match[1].trim());
  }
  
  // Match translation keys
  const translationRegex = /t\.([a-zA-Z_]+\.[a-zA-Z_]+)/g;
  const translationKeys = [];
  while ((match = translationRegex.exec(content)) !== null) {
    translationKeys.push(match[1]);
  }
  
  return {
    text: strings.join(' '),
    wordCount: strings.join(' ').split(/\s+/).filter(w => w.length > 0).length,
    translationKeys: [...new Set(translationKeys)]
  };
}

// Check for internal links
function extractLinks(content) {
  const links = [];
  const linkRegex = /href="([^"]+)"/g;
  let match;
  while ((match = linkRegex.exec(content)) !== null) {
    const url = match[1];
    if (url.startsWith('/') && !url.startsWith('//')) {
      links.push(url);
    }
  }
  return [...new Set(links)];
}

// Check image references
function extractImageRefs(content) {
  const images = [];
  const imgRegex = /src="([^"]+)"/g;
  let match;
  while ((match = imgRegex.exec(content)) !== null) {
    const src = match[1];
    if (src.startsWith('/')) {
      images.push(src);
    }
  }
  return [...new Set(images)];
}

async function auditLearnPages() {
  const results = {
    totalPages: 0,
    pagesWithData: [],
    contentIssues: [],
    imageIssues: [],
    missingTranslations: []
  };
  
  // Read translation files to check for missing keys
  const translations = {};
  const translationFiles = ['en.ts', 'fr.ts', 'es.ts', 'zh.ts'];
  for (const file of translationFiles) {
    const filePath = path.join(process.cwd(), 'src/translations', file);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      translations[file.replace('.ts', '')] = content;
    }
  }
  
  // Function to check if translation key exists
  function checkTranslationKey(key, locale) {
    if (!translations[locale]) return false;
    const parts = key.split('.');
    let content = translations[locale];
    for (const part of parts) {
      const regex = new RegExp(`${part}[:\\s]`, 'i');
      if (!regex.test(content)) return false;
    }
    return true;
  }
  
  function processDir(dir, relativePath = '') {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        processDir(filePath, path.join(relativePath, file));
      } else if (file.endsWith('.tsx')) {
        results.totalPages++;
        const content = fs.readFileSync(filePath, 'utf-8');
        const extracted = extractTextFromTsx(content);
        const links = extractLinks(content);
        const images = extractImageRefs(content);
        
        const pageData = {
          path: path.join(relativePath, file),
          wordCount: extracted.wordCount,
          translationKeys: extracted.translationKeys,
          links,
          images,
          hasSeoMetadata: content.includes('pageTitle') || content.includes('pageDescription') || content.includes('NextSeo'),
          hasStructuredData: content.includes('JSON-LD') || content.includes('generateJSONLD')
        };
        
        results.pagesWithData.push(pageData);
        
        // Check for thin content
        if (extracted.wordCount < MIN_WORD_COUNT && extracted.translationKeys.length === 0) {
          results.contentIssues.push({
            path: pageData.path,
            issue: 'thin_content',
            wordCount: extracted.wordCount,
            message: `Page has only ${extracted.wordCount} words of direct content`
          });
        }
        
        // Check for missing SEO
        if (!pageData.hasSeoMetadata) {
          results.contentIssues.push({
            path: pageData.path,
            issue: 'missing_seo',
            message: 'Page missing SEO metadata'
          });
        }
        
        // Check for missing structured data
        if (!pageData.hasStructuredData) {
          results.contentIssues.push({
            path: pageData.path,
            issue: 'missing_structured_data',
            message: 'Page missing JSON-LD structured data'
          });
        }
        
        // Check image files exist
        for (const img of images) {
          const imgPath = path.join(process.cwd(), 'public', img.replace('/optimized/', '').replace('/images/', ''));
          const optimizedPath = path.join(process.cwd(), 'public', img);
          if (!fs.existsSync(imgPath) && !fs.existsSync(optimizedPath)) {
            // Try without the optimized prefix
            const altPath = path.join(process.cwd(), 'public', img.replace('/optimized', ''));
            if (!fs.existsSync(altPath)) {
              results.imageIssues.push({
                path: pageData.path,
                image: img,
                message: 'Referenced image not found'
              });
            }
          }
        }
      }
    }
  }
  
  processDir(LEARN_DIR);
  
  return results;
}

auditLearnPages().then(results => {
  console.log('\n' + '='.repeat(80));
  console.log('LEARN PAGES CONTENT AUDIT REPORT');
  console.log('='.repeat(80));
  
  console.log('\n📊 OVERVIEW');
  console.log('-'.repeat(40));
  console.log(`Total Learn Pages: ${results.totalPages}`);
  
  console.log('\n\n📝 CONTENT QUALITY ISSUES');
  console.log('-'.repeat(40));
  const criticalIssues = results.contentIssues.filter(i => i.issue === 'thin_content');
  if (criticalIssues.length === 0) {
    console.log('✅ No thin content detected in learn pages!');
  } else {
    console.log(`⚠️  Found ${criticalIssues.length} pages with thin content:\n`);
    criticalIssues.forEach(issue => {
      console.log(`  • ${issue.path}`);
      console.log(`    ${issue.message}`);
    });
  }
  
  const seoIssues = results.contentIssues.filter(i => i.issue === 'missing_seo');
  console.log(`\n\n🔍 SEO METADATA CHECK`);
  console.log('-'.repeat(40));
  if (seoIssues.length === 0) {
    console.log('✅ All pages have SEO metadata!');
  } else {
    console.log(`⚠️  ${seoIssues.length} pages missing SEO metadata`);
  }
  
  const structuredIssues = results.contentIssues.filter(i => i.issue === 'missing_structured_data');
  console.log(`\n\n📋 STRUCTURED DATA CHECK`);
  console.log('-'.repeat(40));
  if (structuredIssues.length === 0) {
    console.log('✅ All pages have structured data!');
  } else {
    console.log(`⚠️  ${structuredIssues.length} pages missing structured data`);
  }
  
  console.log('\n\n🖼️ IMAGE REFERENCES');
  console.log('-'.repeat(40));
  if (results.imageIssues.length === 0) {
    console.log('✅ All referenced images found!');
  } else {
    console.log(`⚠️  Found ${results.imageIssues.length} missing images:\n`);
    results.imageIssues.slice(0, 10).forEach(issue => {
      console.log(`  • ${issue.path}`);
      console.log(`    Missing: ${issue.image}`);
    });
  }
  
  console.log('\n\n📈 INTERNAL LINKING (Top 10)');
  console.log('-'.repeat(40));
  const pagesByLinks = results.pagesWithData
    .sort((a, b) => b.links.length - a.links.length)
    .slice(0, 10);
  pagesByLinks.forEach(page => {
    console.log(`  ${page.links.length} links - ${page.path}`);
  });
  
  const avgLinks = results.pagesWithData.reduce((sum, p) => sum + p.links.length, 0) / results.pagesWithData.length;
  console.log(`\nAverage links per page: ${avgLinks.toFixed(1)}`);
  
  console.log('\n' + '='.repeat(80));
  console.log('END OF LEARN PAGES AUDIT');
  console.log('='.repeat(80) + '\n');
  
  // Save report
  const reportPath = path.join(process.cwd(), 'reports/learn-pages-audit.json');
  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
  console.log(`📄 Detailed report saved to: ${reportPath}\n`);
  
}).catch(error => {
  console.error('Audit failed:', error);
  process.exit(1);
});
