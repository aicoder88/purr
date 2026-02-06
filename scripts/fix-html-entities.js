#!/usr/bin/env node

/**
 * Fix HTML Entity Encoding Errors in JSX/TSX Files
 * 
 * This script finds and replaces &amp; with & in JSX/TSX files.
 * In JSX strings, you should use & directly, not &amp;
 * 
 * Usage: node scripts/fix-html-entities.js
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Directories to search
const searchDirs = [
    'app/**/*.{tsx,ts,jsx,js}',
    'src/**/*.{tsx,ts,jsx,js}',
    'pages/**/*.{tsx,ts,jsx,js}',
];

// Files to exclude
const excludePatterns = [
    '**/node_modules/**',
    '**/.next/**',
    '**/dist/**',
    '**/build/**',
];

let totalFiles = 0;
let totalReplacements = 0;
const changedFiles = [];

console.log('🔍 Searching for HTML entity encoding errors...\n');

// Process each search directory
searchDirs.forEach(pattern => {
    const files = glob.sync(pattern, {
        ignore: excludePatterns,
        cwd: process.cwd(),
        absolute: true,
    });

    files.forEach(filePath => {
        try {
            const content = fs.readFileSync(filePath, 'utf8');

            // Check if file contains &amp;
            if (!content.includes('&amp;')) {
                return;
            }

            // Count occurrences before replacement
            const matches = content.match(/&amp;/g);
            if (!matches) return;

            const count = matches.length;

            // Replace &amp; with &
            const newContent = content.replace(/&amp;/g, '&');

            // Write back to file
            fs.writeFileSync(filePath, newContent, 'utf8');

            totalFiles++;
            totalReplacements += count;
            changedFiles.push({
                file: path.relative(process.cwd(), filePath),
                count,
            });

            console.log(`✅ ${path.relative(process.cwd(), filePath)}: ${count} replacement${count > 1 ? 's' : ''}`);
        } catch (error) {
            console.error(`❌ Error processing ${filePath}:`, error.message);
        }
    });
});

console.log('\n' + '='.repeat(60));
console.log('📊 Summary:');
console.log('='.repeat(60));
console.log(`Files modified: ${totalFiles}`);
console.log(`Total replacements: ${totalReplacements}`);

if (changedFiles.length > 0) {
    console.log('\n📝 Changed files:');
    changedFiles.forEach(({ file, count }) => {
        console.log(`  - ${file} (${count} replacement${count > 1 ? 's' : ''})`);
    });
}

console.log('\n✨ Done! All HTML entity encoding errors have been fixed.');
console.log('💡 Tip: Run `pnpm lint` to verify the changes.\n');
