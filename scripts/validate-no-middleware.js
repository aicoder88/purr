#!/usr/bin/env node
/**
 * Validates Next.js 16 request interception configuration.
 *
 * Next.js 16 does not allow both middleware.ts and proxy.ts.
 * We standardize on proxy.ts.
 */

const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..');
const rootMiddlewareFile = path.join(projectRoot, 'middleware.ts');
const srcMiddlewareFile = path.join(projectRoot, 'src', 'middleware.ts');

// Check that proxy.ts exists (required for auth protection)
const proxyFile = path.join(projectRoot, 'proxy.ts');
if (fs.existsSync(proxyFile)) {
  console.log('✓ proxy.ts found');
} else {
  console.error('✗ proxy.ts not found.');
  process.exit(1);
}

if (fs.existsSync(rootMiddlewareFile) || fs.existsSync(srcMiddlewareFile)) {
  const offenders = [];
  if (fs.existsSync(rootMiddlewareFile)) offenders.push('middleware.ts');
  if (fs.existsSync(srcMiddlewareFile)) offenders.push('src/middleware.ts');

  console.error(`✗ Disallowed file(s) found: ${offenders.join(', ')}`);
  console.error('  Next.js 16 allows proxy.ts only. Remove middleware.ts to avoid build failures.');
  process.exit(1);
}

console.log('Middleware validation passed: proxy.ts-only configuration is valid.');
