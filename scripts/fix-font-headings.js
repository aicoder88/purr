#!/usr/bin/env node

/**
 * Font Heading Fix Script
 *
 * This script automatically adds the 'font-heading' class to all h1, h2, and h3
 * elements that are missing it across the entire codebase.
 *
 * Usage:
 *   node scripts/fix-font-headings.js          # Dry run (preview changes)
 *   node scripts/fix-font-headings.js --apply  # Apply changes
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Check if we should apply changes or just preview
const DRY_RUN = !process.argv.includes('--apply');

// Track statistics
const stats = {
  filesProcessed: 0,
  filesModified: 0,
  headingsFixed: 0,
  headingsSkipped: 0,
  errors: []
};

// Directories to scan
const directories = [
  'pages/**/*.tsx',
  'src/components/**/*.tsx'
];

/**
 * Fix font-heading class in a single file
 */
function fixFontHeadingsInFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    let fixCount = 0;

    // Regex to match h1, h2, h3 elements with className
    // This regex captures:
    // - <h1, <h2, or <h3
    // - optional whitespace
    // - className="..."
    // - the class content
    const headingRegex = /(<h[123]\s+)(className=["']([^"']*?)["'])/g;

    const newContent = content.replace(headingRegex, (match, openTag, classNameAttr, classes) => {
      // Check if font-heading is already present
      if (classes.includes('font-heading')) {
        stats.headingsSkipped++;
        return match;
      }

      // Add font-heading to the beginning of the class list
      // This ensures it has proper priority
      const newClasses = `font-heading ${classes}`;
      modified = true;
      fixCount++;
      stats.headingsFixed++;

      return `${openTag}className="${newClasses}"`;
    });

    if (modified) {
      if (!DRY_RUN) {
        fs.writeFileSync(filePath, newContent, 'utf8');
      }
      stats.filesModified++;
      const prefix = DRY_RUN ? '🔍' : '✅';
      console.log(`${prefix} Fixed ${fixCount} heading(s) in: ${filePath}`);
    }

    stats.filesProcessed++;
  } catch (error) {
    stats.errors.push({ file: filePath, error: error.message });
    console.error(`❌ Error processing ${filePath}:`, error.message);
  }
}

/**
 * Main execution
 */
function main() {
  console.log('🔍 Starting font-heading fix script...\n');

  if (DRY_RUN) {
    console.log('⚠️  DRY RUN MODE - No files will be modified');
    console.log('   Run with --apply flag to apply changes\n');
  } else {
    console.log('✏️  APPLY MODE - Files will be modified\n');
  }

  console.log('📁 Scanning directories:');
  directories.forEach(dir => console.log(`   - ${dir}`));
  console.log('');

  // Collect all files to process
  const allFiles = [];
  directories.forEach(pattern => {
    const files = glob.sync(pattern, { cwd: process.cwd() });
    allFiles.push(...files);
  });

  console.log(`📝 Found ${allFiles.length} files to process\n`);

  // Process each file
  allFiles.forEach(file => {
    const fullPath = path.join(process.cwd(), file);
    fixFontHeadingsInFile(fullPath);
  });

  // Print summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 SUMMARY');
  console.log('='.repeat(60));
  console.log(`Files processed:     ${stats.filesProcessed}`);
  console.log(`Files modified:      ${stats.filesModified}`);
  console.log(`Headings fixed:      ${stats.headingsFixed}`);
  console.log(`Headings skipped:    ${stats.headingsSkipped}`);
  console.log(`Errors encountered:  ${stats.errors.length}`);

  if (stats.errors.length > 0) {
    console.log('\n❌ Errors:');
    stats.errors.forEach(({ file, error }) => {
      console.log(`   ${file}: ${error}`);
    });
  }

  console.log('='.repeat(60));

  if (stats.filesModified > 0) {
    if (DRY_RUN) {
      console.log('\n🔍 Dry run complete! Run with --apply to make these changes.');
      console.log('   Example: node scripts/fix-font-headings.js --apply');
    } else {
      console.log('\n✅ Font-heading fixes applied successfully!');
      console.log('⚠️  Please run the following to verify:');
      console.log('   npm run lint');
      console.log('   npm run check-types');
      console.log('   npm run validate-dark-mode');
    }
  } else {
    console.log('\n✨ No files needed modification - all headings already have font-heading!');
  }
}

// Run the script
main();
