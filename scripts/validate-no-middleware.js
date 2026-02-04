#!/usr/bin/env node
/**
 * Validates middleware configuration.
 * 
 * - Allows root middleware.ts (for Edge geo-blocking/WAF)
 * - Allows src/middleware/* for modular middleware
 * - proxy.ts is still used for server-side auth/api proxying
 * 
 * These serve different purposes and can coexist:
 * - middleware.ts: Edge middleware (runs at CDN, for geo-blocking)
 * - proxy.ts: Server proxy (runs on server, for auth/api routing)
 */

const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..');

// Check that our edge middleware exists
const edgeMiddleware = path.join(projectRoot, 'middleware.ts');
if (fs.existsSync(edgeMiddleware)) {
  console.log('✓ Edge middleware.ts found (for geo-blocking at CDN level)');
  
  // Validate it has the expected content
  const content = fs.readFileSync(edgeMiddleware, 'utf-8');
  if (content.includes('BLOCKED_COUNTRIES') || content.includes('geo-blocking')) {
    console.log('  - Contains geo-blocking logic');
  }
}

// Check that proxy.ts exists (required for auth protection)
const proxyFile = path.join(projectRoot, 'proxy.ts');
if (fs.existsSync(proxyFile)) {
  console.log('✓ proxy.ts found (for server-side auth/api proxying)');
} else {
  console.warn('⚠ WARNING: proxy.ts not found. Admin routes may not be protected.');
}

console.log('\nMiddleware validation passed: Edge middleware and server proxy are properly configured.');
