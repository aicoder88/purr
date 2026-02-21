#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const inputPath = process.argv[2];

if (!inputPath) {
  console.error('Usage: node scripts/lint/summarize-eslint.mjs <eslint-json-file>');
  process.exit(1);
}

const absolutePath = path.resolve(inputPath);
const raw = fs.readFileSync(absolutePath, 'utf8');
const report = JSON.parse(raw);

const ruleCounts = new Map();
const fileCounts = new Map();
let total = 0;
let errors = 0;
let warnings = 0;

for (const file of report) {
  const messages = Array.isArray(file.messages) ? file.messages : [];
  if (messages.length === 0) {
    continue;
  }

  let fileIssueCount = 0;
  for (const message of messages) {
    if (!message.ruleId) {
      continue;
    }
    fileIssueCount += 1;
    total += 1;
    if (message.severity === 2) {
      errors += 1;
    } else if (message.severity === 1) {
      warnings += 1;
    }

    ruleCounts.set(message.ruleId, (ruleCounts.get(message.ruleId) ?? 0) + 1);
  }

  if (fileIssueCount > 0) {
    fileCounts.set(file.filePath, fileIssueCount);
  }
}

const topRules = [...ruleCounts.entries()].sort((a, b) => b[1] - a[1]);
const topFiles = [...fileCounts.entries()].sort((a, b) => b[1] - a[1]);

console.log(`ESLint summary for ${absolutePath}`);
console.log(`Total issues: ${total} (errors: ${errors}, warnings: ${warnings})`);
console.log('');
console.log('By rule:');
for (const [rule, count] of topRules) {
  console.log(`- ${rule}: ${count}`);
}
console.log('');
console.log('By file:');
for (const [file, count] of topFiles) {
  console.log(`- ${file}: ${count}`);
}
