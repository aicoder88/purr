const fs = require('fs');
const path = require('path');

// Configuration
const TITLE_MAX_LENGTH = 60;
const DESC_MIN_LENGTH = 120;
const DESC_MAX_LENGTH = 155;
const APP_DIR = '/Users/macpro/dev/purr/app';

// Results storage
const issues = {
  titleTooLong: [],
  titleTooShort: [],
  descTooLong: [],
  descTooShort: [],
  missingH1: [],
  multipleH1: [],
  missingMeta: []
};

// Helper to get string length
function getLength(str) {
  return str ? str.length : 0;
}

// Helper to extract metadata from file content
function extractMetadata(content, filePath) {
  const metadata = { title: null, description: null };
  
  // Try to find title
  const titleMatch = content.match(/title:\s*['"]([^'"]+)['"]/);
  if (titleMatch) {
    metadata.title = titleMatch[1];
  }
  
  // Try to find description
  const descMatch = content.match(/description:\s*['"]([^'"]+)['"]/);
  if (descMatch) {
    metadata.description = descMatch[1];
  }
  
  return metadata;
}

// Helper to count H1 tags in content
function countH1Tags(content) {
  const h1Regex = /<h1[^>]*>/gi;
  const matches = content.match(h1Regex);
  return matches ? matches.length : 0;
}

// Helper to find H1 content
function findH1Content(content) {
  const h1ContentRegex = /<h1[^>]*>(.*?)<\/h1>/is;
  const match = content.match(h1ContentRegex);
  if (match) {
    // Strip HTML tags
    return match[1].replace(/<[^>]+>/g, '').trim();
  }
  return null;
}

// Process a single file
function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const relativePath = path.relative('/Users/macpro/dev/purr', filePath);
  
  // Extract metadata
  const metadata = extractMetadata(content, filePath);
  
  // Check title
  if (metadata.title) {
    const titleLen = getLength(metadata.title);
    if (titleLen > TITLE_MAX_LENGTH) {
      issues.titleTooLong.push({
        file: relativePath,
        title: metadata.title,
        length: titleLen,
        suggested: metadata.title.substring(0, TITLE_MAX_LENGTH - 3) + '...'
      });
    }
  }
  
  // Check description
  if (metadata.description) {
    const descLen = getLength(metadata.description);
    if (descLen > DESC_MAX_LENGTH) {
      issues.descTooLong.push({
        file: relativePath,
        description: metadata.description,
        length: descLen,
        suggested: metadata.description.substring(0, DESC_MAX_LENGTH - 3) + '...'
      });
    } else if (descLen < DESC_MIN_LENGTH && descLen > 0) {
      issues.descTooShort.push({
        file: relativePath,
        description: metadata.description,
        length: descLen
      });
    }
  }
  
  // Check H1 tags
  const h1Count = countH1Tags(content);
  if (h1Count === 0) {
    const h1Content = findH1Content(content);
    if (!h1Content) {
      issues.missingH1.push({
        file: relativePath
      });
    }
  } else if (h1Count > 1) {
    issues.multipleH1.push({
      file: relativePath,
      count: h1Count
    });
  }
}

// Recursively find all page.tsx files
function findPageFiles(dir, files = []) {
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      findPageFiles(fullPath, files);
    } else if (item === 'page.tsx') {
      files.push(fullPath);
    }
  }
  
  return files;
}

// Main execution
console.log('🔍 Scanning for SEO meta tag issues...\n');

try {
  const pageFiles = findPageFiles(APP_DIR);
  console.log(`Found ${pageFiles.length} page.tsx files\n`);
  
  for (const file of pageFiles) {
    processFile(file);
  }
  
  // Print results
  console.log('='.repeat(80));
  console.log('SEO META AUDIT RESULTS');
  console.log('='.repeat(80));
  
  console.log('\n📛 TITLES TOO LONG (>60 chars):', issues.titleTooLong.length);
  if (issues.titleTooLong.length > 0) {
    issues.titleTooLong.forEach(item => {
      console.log(`\n  File: ${item.file}`);
      console.log(`  Current: "${item.title}" (${item.length} chars)`);
      console.log(`  Suggested: "${item.suggested}"`);
    });
  }
  
  console.log('\n\n📛 DESCRIPTIONS TOO LONG (>155 chars):', issues.descTooLong.length);
  if (issues.descTooLong.length > 0) {
    issues.descTooLong.forEach(item => {
      console.log(`\n  File: ${item.file}`);
      console.log(`  Current: "${item.description}" (${item.length} chars)`);
      console.log(`  Suggested: "${item.suggested}"`);
    });
  }
  
  console.log('\n\n⚠️ DESCRIPTIONS TOO SHORT (<120 chars):', issues.descTooShort.length);
  if (issues.descTooShort.length > 0) {
    issues.descTooShort.forEach(item => {
      console.log(`\n  File: ${item.file}`);
      console.log(`  Current: "${item.description}" (${item.length} chars)`);
    });
  }
  
  console.log('\n\n❌ MISSING H1:', issues.missingH1.length);
  if (issues.missingH1.length > 0) {
    issues.missingH1.forEach(item => {
      console.log(`  - ${item.file}`);
    });
  }
  
  console.log('\n\n❌ MULTIPLE H1:', issues.multipleH1.length);
  if (issues.multipleH1.length > 0) {
    issues.multipleH1.forEach(item => {
      console.log(`  - ${item.file} (${item.count} H1 tags)`);
    });
  }
  
  // Summary
  console.log('\n\n' + '='.repeat(80));
  console.log('SUMMARY');
  console.log('='.repeat(80));
  console.log(`Total pages scanned: ${pageFiles.length}`);
  console.log(`Titles too long: ${issues.titleTooLong.length}`);
  console.log(`Descriptions too long: ${issues.descTooLong.length}`);
  console.log(`Descriptions too short: ${issues.descTooShort.length}`);
  console.log(`Missing H1: ${issues.missingH1.length}`);
  console.log(`Multiple H1: ${issues.multipleH1.length}`);
  
} catch (error) {
  console.error('Error:', error.message);
}
