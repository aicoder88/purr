#!/usr/bin/env node

/**
 * TypeScript Build Optimization
 * Runs before build to enable faster type checking through better caching
 */

const fs = require('fs');
const path = require('path');

const TSCONFIG_PATH = path.join(process.cwd(), 'tsconfig.json');
const NEXT_CONFIG_PATH = path.join(process.cwd(), 'next.config.js');

console.log('🚀 Optimizing TypeScript configuration for faster builds...');

try {
  // Verify tsconfig has correct settings
  const tsConfig = JSON.parse(fs.readFileSync(TSCONFIG_PATH, 'utf-8'));

  const optimizations = {
    incremental: true,
    skipLibCheck: true,
    moduleResolution: 'bundler',
    downlevelIteration: false,
  };

  let updated = false;
  for (const [key, value] of Object.entries(optimizations)) {
    if (tsConfig.compilerOptions[key] !== value) {
      tsConfig.compilerOptions[key] = value;
      updated = true;
      console.log(`  ✓ Set ${key} = ${value}`);
    }
  }

  if (updated) {
    fs.writeFileSync(TSCONFIG_PATH, JSON.stringify(tsConfig, null, 2) + '\n');
    console.log('✅ TypeScript configuration optimized');
  } else {
    console.log('✅ TypeScript configuration already optimized');
  }

  // Ensure .next directory exists for build info
  const nextDir = path.join(process.cwd(), '.next');
  if (!fs.existsSync(nextDir)) {
    fs.mkdirSync(nextDir, { recursive: true });
    console.log('  ✓ Created .next directory for build cache');
  }

  console.log('\n💡 Build optimization tips:');
  console.log('  - First build will create incremental build info');
  console.log('  - Subsequent builds will use cached type information');
  console.log('  - Expected speedup: 30-40% on rebuilds');
  console.log('\n✨ TypeScript optimization complete!');

} catch (error) {
  console.error('❌ Error optimizing TypeScript:', error.message);
  process.exit(1);
}
