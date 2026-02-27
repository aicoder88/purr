#!/usr/bin/env tsx
/**
 * ISR Audit Script
 * 
 * Checks for proper ISR configuration across blog and product pages.
 * Reports pages missing `export const revalidate = ...` or using `dynamic = 'force-static'`
 * which prevents ISR.
 */

import { glob } from 'glob';
import * as fs from 'fs';
import * as path from 'path';

interface ISRViolation {
  file: string;
  issue: 'missing-revalidate' | 'force-static' | 'force-dynamic';
  line?: number;
  context?: string;
}

const TARGET_PATTERNS = [
  'app/**/blog/**/*.tsx',
  'app/**/products/**/*.tsx',
  'app/blog/**/*.tsx',
  'app/products/**/*.tsx',
];

const EXCLUDE_PATTERNS = [
  '**/layout.tsx',
  '**/loading.tsx',
  '**/error.tsx',
  '**/not-found.tsx',
  '**/*.test.tsx',
  '**/*.spec.tsx',
];

async function auditISR(): Promise<void> {
  console.log('🔍 Auditing ISR configuration...\n');

  const violations: ISRViolation[] = [];
  const checkedFiles: string[] = [];

  // Find all target files
  for (const pattern of TARGET_PATTERNS) {
    const files = await glob(pattern, {
      cwd: process.cwd(),
      absolute: true,
      ignore: EXCLUDE_PATTERNS,
    });

    for (const file of files) {
      if (checkedFiles.includes(file)) continue;
      checkedFiles.push(file);

      const content = fs.readFileSync(file, 'utf-8');
      const lines = content.split('\n');

      // Check for force-static
      const forceStaticMatch = content.match(/export\s+const\s+dynamic\s*=\s*['"]force-static['"]/);
      if (forceStaticMatch) {
        const lineIndex = lines.findIndex(l => l.includes('force-static'));
        violations.push({
          file: path.relative(process.cwd(), file),
          issue: 'force-static',
          line: lineIndex + 1,
          context: lines[lineIndex]?.trim(),
        });
        continue;
      }

      // Check for force-dynamic
      const forceDynamicMatch = content.match(/export\s+const\s+dynamic\s*=\s*['"]force-dynamic['"]/);
      if (forceDynamicMatch) {
        const lineIndex = lines.findIndex(l => l.includes('force-dynamic'));
        violations.push({
          file: path.relative(process.cwd(), file),
          issue: 'force-dynamic',
          line: lineIndex + 1,
          context: lines[lineIndex]?.trim(),
        });
        continue;
      }

      // Check for revalidate
      const hasRevalidate = content.match(/export\s+const\s+revalidate\s*=/);
      if (!hasRevalidate) {
        violations.push({
          file: path.relative(process.cwd(), file),
          issue: 'missing-revalidate',
        });
      }
    }
  }

  // Report results
  console.log(`✅ Checked ${checkedFiles.length} files\n`);

  if (violations.length === 0) {
    console.log('✨ No ISR issues found! All pages properly configured.');
    process.exit(0);
  }

  // Group by issue type
  const forceStatic = violations.filter(v => v.issue === 'force-static');
  const forceDynamic = violations.filter(v => v.issue === 'force-dynamic');
  const missingRevalidate = violations.filter(v => v.issue === 'missing-revalidate');

  if (forceStatic.length > 0) {
    console.log(`❌ Pages with 'force-static' (prevents ISR):`);
    forceStatic.forEach(v => {
      console.log(`   ${v.file}${v.line ? `:${v.line}` : ''}`);
      if (v.context) console.log(`      ${v.context}`);
    });
    console.log('');
  }

  if (forceDynamic.length > 0) {
    console.log(`⚠️  Pages with 'force-dynamic' (disables static generation):`);
    forceDynamic.forEach(v => {
      console.log(`   ${v.file}${v.line ? `:${v.line}` : ''}`);
      if (v.context) console.log(`      ${v.context}`);
    });
    console.log('');
  }

  if (missingRevalidate.length > 0) {
    console.log(`⚠️  Pages missing 'revalidate' (no ISR):`);
    missingRevalidate.forEach(v => {
      console.log(`   ${v.file}`);
    });
    console.log('');
  }

  console.log(`\n📊 Summary: ${violations.length} issue(s) found`);
  console.log('   - force-static: ' + forceStatic.length);
  console.log('   - force-dynamic: ' + forceDynamic.length);
  console.log('   - missing-revalidate: ' + missingRevalidate.length);
  console.log('\n💡 To fix:');
  console.log('   - Replace force-static with revalidate = <seconds> for ISR');
  console.log('   - Add export const revalidate = 3600 for hourly revalidation');

  process.exit(1);
}

auditISR().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
