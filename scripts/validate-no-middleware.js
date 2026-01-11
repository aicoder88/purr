#!/usr/bin/env node
/**
 * Validates that no middleware.ts/js files exist in the project root.
 * Next.js 16+ uses proxy.ts instead of middleware.ts.
 *
 * Run this script before build to catch accidental middleware file creation.
 */

const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..');

const forbiddenFiles = [
  'middleware.ts',
  'middleware.js',
  'middleware.mjs',
  'src/middleware.ts',
  'src/middleware.js',
  'src/middleware.mjs',
];

let hasErrors = false;

for (const file of forbiddenFiles) {
  const filePath = path.join(projectRoot, file);
  if (fs.existsSync(filePath)) {
    console.error(`ERROR: Found forbidden file: ${file}`);
    console.error('Next.js 16 uses proxy.ts instead of middleware.ts.');
    console.error('Please migrate your code to proxy.ts and delete the middleware file.');
    console.error('See: https://nextjs.org/docs/messages/middleware-to-proxy');
    hasErrors = true;
  }
}

// Check that proxy.ts exists (required for auth protection)
const proxyFile = path.join(projectRoot, 'proxy.ts');
if (!fs.existsSync(proxyFile)) {
  console.warn('WARNING: proxy.ts not found. Admin routes may not be protected.');
}

if (hasErrors) {
  process.exit(1);
}

console.log('Middleware validation passed: No conflicting middleware files found.');
