const { execSync } = require('node:child_process');
const path = require('node:path');

console.log('🔍 Checking TypeScript types...');

try {
  // Run TypeScript compiler in noEmit mode to just check types
  execSync('npx tsc --noEmit', { 
    stdio: 'inherit',
    cwd: path.resolve(__dirname, '..')
  });
  console.log('✅ TypeScript check passed!');
  process.exit(0);
} catch (error) {
  console.error('❌ TypeScript check failed!');
  process.exit(1);
}