const fs = require('fs');
const path = require('path');

const cacheDir = path.join(__dirname, '..', '.next', 'cache');

if (fs.existsSync(cacheDir)) {
  console.log('Clearing webpack cache...');
  fs.rmSync(cacheDir, { recursive: true, force: true });
  console.log('Cache cleared.');
} else {
  console.log('No cache to clear.');
}
