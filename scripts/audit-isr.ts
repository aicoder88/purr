#!/usr/bin/env ts-node
/**
 * ISR Audit Script
 * 
 * Finds all ISR revalidate settings and suggests optimizations.
 * Run with: npx ts-node scripts/audit-isr.ts
 */

import { execSync } from 'child_process';
import { readFileSync } from 'fs';
import { globSync } from 'glob';

interface ISREntry {
  file: string;
  line: number;
  revalidateValue: number;
  context: string;
}

function parseRevalidateValue(context: string): number | null {
  // Match export const revalidate = NUMBER
  const match = context.match(/revalidate\s*=\s*(\d+)/);
  if (match) {
    return parseInt(match[1], 10);
  }
  return null;
}

function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) return `${Math.round(seconds / 60)}m`;
  if (seconds < 86400) return `${Math.round(seconds / 3600)}h`;
  return `${Math.round(seconds / 86400)}d`;
}

function getRecommendation(seconds: number, file: string): string {
  if (seconds < 60) {
    return '⚠️  CRITICAL: Less than 1 minute - This will cause excessive ISR writes!';
  }
  if (seconds < 3600) {
    return '⚠️  WARNING: Less than 1 hour - Consider increasing to 3600 or more';
  }
  if (seconds === 3600) {
    // Check if it's a data-heavy page
    if (file.includes('blog') || file.includes('product')) {
      return '💡 TIP: Blog/product pages can often use 86400 (24h) instead';
    }
    return '✅ OK: 1 hour is reasonable for dynamic content';
  }
  if (seconds <= 86400) {
    return '✅ GOOD: Daily revalidation is appropriate for most content';
  }
  return '✅ EXCELLENT: Weekly+ revalidation is great for static content';
}

function main() {
  console.log('🔍 ISR Audit Report');
  console.log('===================\n');

  // Find all TypeScript/TSX files with revalidate
  const files = globSync('**/*.{ts,tsx}', {
    ignore: ['node_modules/**', '.next/**', '__tests__/**', 'scripts/**'],
  });

  const entries: ISREntry[] = [];

  for (const file of files) {
    try {
      const content = readFileSync(file, 'utf-8');
      const lines = content.split('\n');

      lines.forEach((line, index) => {
        if (line.includes('revalidate') && line.includes('export')) {
          const value = parseRevalidateValue(line);
          if (value !== null) {
            entries.push({
              file,
              line: index + 1,
              revalidateValue: value,
              context: line.trim(),
            });
          }
        }
      });
    } catch (e) {
      // Skip files that can't be read
    }
  }

  // Sort by revalidate value (lowest first - most concerning)
  entries.sort((a, b) => a.revalidateValue - b.revalidateValue);

  if (entries.length === 0) {
    console.log('No ISR revalidate settings found.');
    return;
  }

  console.log(`Found ${entries.length} ISR configuration(s):\n`);

  let totalDailyWrites = 0;

  for (const entry of entries) {
    const duration = formatDuration(entry.revalidateValue);
    const dailyWrites = Math.ceil(86400 / entry.revalidateValue);
    totalDailyWrites += dailyWrites;

    console.log(`📄 ${entry.file}:${entry.line}`);
    console.log(`   Value: ${entry.revalidateValue}s (${duration})`);
    console.log(`   Est. daily ISR writes: ~${dailyWrites}`);
    console.log(`   ${getRecommendation(entry.revalidateValue, entry.file)}`);
    console.log();
  }

  console.log('===================');
  console.log(`📊 Total estimated daily ISR writes: ~${totalDailyWrites}`);
  console.log();

  // Summary
  const critical = entries.filter(e => e.revalidateValue < 60).length;
  const warning = entries.filter(e => e.revalidateValue >= 60 && e.revalidateValue < 3600).length;
  const good = entries.filter(e => e.revalidateValue >= 3600).length;

  console.log('Summary:');
  console.log(`  🔴 Critical (< 1m): ${critical}`);
  console.log(`  🟡 Warning (< 1h):  ${warning}`);
  console.log(`  🟢 OK (>= 1h):      ${good}`);
  console.log();

  if (critical > 0) {
    console.log('⚠️  URGENT: Fix critical ISR settings immediately!');
    console.log('   These are causing excessive ISR writes.');
  }

  if (totalDailyWrites > 100) {
    console.log('💡 TIP: Consider increasing revalidate times to reduce ISR writes.');
    console.log('   Each ISR write consumes function resources.');
  }
}

main();
