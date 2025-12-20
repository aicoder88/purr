/**
 * Script to clear Next.js webpack cache
 * 
 * This script deletes the webpack cache directories to resolve caching issues
 * that can occur during development, such as the "Caching failed for pack" error.
 * 
 * Usage: node scripts/clear-webpack-cache.js
 */

const fs = require('node:fs');
const path = require('node:path');
// Import rimraf correctly for v5
const { rimraf } = require('rimraf');

// Paths to webpack cache directories
const cacheDirs = [
  '.next/cache/webpack/client-development',
  '.next/cache/webpack/server-development',
  '.next/cache/webpack/client-development-fallback',
  '.next/cache/webpack/server-development-fallback'
];

async function clearWebpackCache() {
  console.log('Clearing Next.js webpack cache...');
  
  for (const dir of cacheDirs) {
    const fullPath = path.join(process.cwd(), dir);
    
    // Check if directory exists
    if (fs.existsSync(fullPath)) {
      try {
        // Use rimraf correctly for v5
        await rimraf(fullPath);
        console.log(`✓ Cleared ${dir}`);
      } catch (error) {
        console.error(`✗ Failed to clear ${dir}: ${error.message}`);
      }
    } else {
      console.log(`- Skipped ${dir} (directory does not exist)`);
    }
  }
  
  console.log('\nWebpack cache cleared successfully!');
  console.log('\nIf you continue to experience caching issues, consider adding this to your package.json scripts:');
  console.log('  "predev": "node scripts/clear-webpack-cache.js && node scripts/optimize-before-build.js"');
}

clearWebpackCache().catch(error => {
  console.error('Error clearing webpack cache:', error);
  process.exit(1);
});