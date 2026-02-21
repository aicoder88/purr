#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const write = process.argv.includes('--write');
const root = process.cwd();

/**
 * Deterministic line-level replacements for known lint patterns.
 * Safe to run repeatedly.
 */
const replacements = [
  {
    file: 'src/components/admin/AdminLayout.tsx',
    find: /\(session\?\.user as any\)\?\.role/g,
    replace: 'session?.user?.role',
    label: 'AdminLayout role cast',
  },
  {
    file: 'src/components/sections/hero/useVideoPlayer.ts',
    find: /dependencies: any\[] = \[\]/g,
    replace: 'dependencies: unknown[] = []',
    label: 'useVideoPlayer dependency typing',
  },
  {
    file: 'src/components/admin/AIContentGenerator.tsx',
    find: /tone: e\.target\.value as any/g,
    replace: "tone: e.target.value as AIGenerationConfig['tone']",
    label: 'AI tone cast',
  },
  {
    file: 'src/components/admin/AIContentGenerator.tsx',
    find: /length: e\.target\.value as any/g,
    replace: "length: e.target.value as AIGenerationConfig['length']",
    label: 'AI length cast',
  },
  {
    file: 'src/components/admin/AIContentGenerator.tsx',
    find: /targetAudience: e\.target\.value as any/g,
    replace: "targetAudience: e.target.value as AIGenerationConfig['targetAudience']",
    label: 'AI audience cast',
  },
  {
    file: '__mocks__/cheerio.ts',
    find: /export default \{ load \};/g,
    replace: 'const cheerioMock = { load };\nexport default cheerioMock;',
    label: 'cheerio named default export',
  },
  {
    file: 'app/layout.tsx',
    find: /(\{\/\* Raw <script> so data-cfasync="false" lands on the element itself\.[\s\S]*?\*\/\}\n)(\s*<script)/m,
    replace: `$1            {/* eslint-disable-next-line @next/next/next-script-for-ga */}\n$2`,
    label: 'GTM eslint suppression',
  },
];

const touched = new Map();

for (const job of replacements) {
  const fullPath = path.join(root, job.file);
  if (!fs.existsSync(fullPath)) {
    continue;
  }

  const original = fs.readFileSync(fullPath, 'utf8');
  const updated = original.replace(job.find, job.replace);
  if (updated !== original) {
    touched.set(job.file, (touched.get(job.file) ?? 0) + 1);
    if (write) {
      fs.writeFileSync(fullPath, updated, 'utf8');
    }
  }
}

const mode = write ? 'write' : 'dry-run';
console.log(`[fix-eslint-known-issues] mode=${mode}`);
if (touched.size === 0) {
  console.log('[fix-eslint-known-issues] no changes');
  process.exit(0);
}

for (const [file, count] of touched.entries()) {
  console.log(`[fix-eslint-known-issues] ${file}: ${count} replacement set(s)`);
}
