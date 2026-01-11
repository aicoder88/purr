const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..');
const cacheDir = path.join(projectRoot, '.next', 'cache');
const nextDir = path.join(projectRoot, '.next');

// Next.js 16 uses proxy.ts instead of middleware.ts
// Check for conflicting middleware.ts file which would cause build errors
const middlewareFile = path.join(projectRoot, 'middleware.ts');
const middlewareFileJs = path.join(projectRoot, 'middleware.js');

if (fs.existsSync(middlewareFile) || fs.existsSync(middlewareFileJs)) {
  console.error('ERROR: middleware.ts/js detected!');
  console.error('Next.js 16 uses proxy.ts instead of middleware.ts.');
  console.error('Please migrate your middleware to proxy.ts and delete the middleware file.');
  console.error('See: https://nextjs.org/docs/messages/middleware-to-proxy');
  process.exit(1);
}

// Check for stale middleware artifacts in .next that could cause conflicts
const staleMiddlewarePaths = [
  path.join(nextDir, 'server', 'middleware.js'),
  path.join(nextDir, 'dev', 'server', 'middleware.js'),
];

let hasStaleMiddleware = false;
for (const stalePath of staleMiddlewarePaths) {
  if (fs.existsSync(stalePath)) {
    hasStaleMiddleware = true;
    break;
  }
}

if (hasStaleMiddleware) {
  console.log('Detected stale middleware artifacts, clearing entire .next directory...');
  if (fs.existsSync(nextDir)) {
    fs.rmSync(nextDir, { recursive: true, force: true });
    console.log('.next directory cleared.');
  }
} else if (fs.existsSync(cacheDir)) {
  console.log('Clearing webpack cache...');
  fs.rmSync(cacheDir, { recursive: true, force: true });
  console.log('Cache cleared.');
} else {
  console.log('No cache to clear.');
}
