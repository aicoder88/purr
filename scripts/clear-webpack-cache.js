const fs = require('fs');
const path = require('path');

const cacheDir = path.join(__dirname, '..', '.next', 'cache', 'webpack');

if (fs.existsSync(cacheDir)) {
  fs.rmSync(cacheDir, { recursive: true, force: true });
  console.log('[clear-webpack-cache] Cleared webpack cache');
} else {
  console.log('[clear-webpack-cache] No webpack cache to clear');
}
