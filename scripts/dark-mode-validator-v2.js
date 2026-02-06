#!/usr/bin/env node

/**
 * Dark Mode Validator V2 - Tightened rules with contrast awareness
 *
 * Improvements:
 * - Task 12: Specific allowed class pairs instead of broad regex
 * - Task 13: Low-contrast detection (light-on-light, dark-on-dark)
 * - Task 14: Parses cn(), clsx(), and template literals
 */

const fs = require('fs');
const path = require('path');

// Directories to check
const DIRECTORIES_TO_CHECK = ['pages', 'src/components', 'app', 'content/blog'];

let totalErrors = 0;
let filesWithErrors = 0;

// Task 12: Specific allowed pairs (not broad regex)
const ALLOWED_PAIRS = new Set([
  // Intentional accent colors that work in both modes
  'text-green-600', 'text-green-500', 'text-red-500', 'text-blue-500',

  // Solid backgrounds that work in both modes (600-900 range)
  'bg-green-600', 'bg-green-700', 'bg-green-800', 'bg-green-900',
  'bg-red-600', 'bg-red-700', 'bg-red-800', 'bg-red-900',
  'bg-blue-600', 'bg-blue-700', 'bg-blue-800', 'bg-blue-900',
  'bg-purple-600', 'bg-purple-700', 'bg-purple-800', 'bg-purple-900',
  'bg-indigo-600', 'bg-indigo-700', 'bg-indigo-800', 'bg-indigo-900',
  'bg-yellow-600', 'bg-yellow-700', 'bg-yellow-800', 'bg-yellow-900',
  'bg-pink-600', 'bg-pink-700', 'bg-pink-800', 'bg-pink-900',
  'bg-orange-600', 'bg-orange-700', 'bg-orange-800', 'bg-orange-900',
  'bg-emerald-600', 'bg-emerald-700', 'bg-emerald-800', 'bg-emerald-900',
  'bg-teal-600', 'bg-teal-700', 'bg-teal-800', 'bg-teal-900',
  'bg-cyan-600', 'bg-cyan-700', 'bg-cyan-800', 'bg-cyan-900',
  'bg-sky-600', 'bg-sky-700', 'bg-sky-800', 'bg-sky-900',
  'bg-violet-600', 'bg-violet-700', 'bg-violet-800', 'bg-violet-900',
  'bg-fuchsia-600', 'bg-fuchsia-700', 'bg-fuchsia-800', 'bg-fuchsia-900',
  'bg-rose-600', 'bg-rose-700', 'bg-rose-800', 'bg-rose-900',
  'bg-amber-600', 'bg-amber-700', 'bg-amber-800', 'bg-amber-900',

  // Allow 400-500 for specific use cases
  'bg-green-400', 'bg-blue-400', 'bg-green-500', 'bg-blue-500', 'bg-red-500', 'bg-purple-500',
]);

// Task 13: Low-contrast pairs to detect
const LOW_CONTRAST_PAIRS = [
  // Light text on light backgrounds
  { text: /text-(white|gray-[1-4]00)\b/, bg: /bg-(white|gray-[1-4]00)\b/, mode: 'light' },

  // Dark text on dark backgrounds
  { text: /text-(black|gray-[7-9]00)\b/, bg: /bg-(black|gray-[7-9]00)\b/, mode: 'dark' },

  // Gray-on-gray low contrast
  { text: /text-gray-200\b/, bg: /bg-gray-100\b/, mode: 'light' },
  { text: /text-gray-300\b/, bg: /bg-gray-200\b/, mode: 'light' },
  { text: /text-gray-800\b/, bg: /bg-gray-900\b/, mode: 'dark' },
  { text: /text-gray-700\b/, bg: /bg-gray-800\b/, mode: 'dark' },
];

// Helper: Find files recursively
function findFiles(dir, extensions = ['.tsx', '.ts', '.json']) {
  const files = [];

  function scanDirectory(currentDir) {
    if (!fs.existsSync(currentDir)) return;

    const entries = fs.readdirSync(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        scanDirectory(fullPath);
      } else if (entry.isFile() && extensions.some(ext => entry.name.endsWith(ext))) {
        files.push(fullPath);
      }
    }
  }

  scanDirectory(dir);
  return files;
}

// Task 14: Extract class strings from multiple patterns
function extractClassStrings(content) {
  const classStrings = [];

  // Pattern 1: className="..." or class="..."
  const directMatches = content.matchAll(/(?:className|class)=["']([^"']*)["']/g);
  for (const match of directMatches) {
    classStrings.push({ value: match[1], source: 'direct' });
  }

  // Pattern 2: JSON escaped: class=\"...\"
  const jsonMatches = content.matchAll(/(?:className|class)=\\"([^\\"]*)\\"/g);
  for (const match of jsonMatches) {
    classStrings.push({ value: match[1], source: 'json' });
  }

  // Pattern 3: cn(...) or clsx(...) function calls
  const cnMatches = content.matchAll(/(?:cn|clsx)\s*\(\s*["']([^"']*)["']/g);
  for (const match of cnMatches) {
    classStrings.push({ value: match[1], source: 'cn' });
  }

  // Pattern 4: Template literals with classes
  const templateMatches = content.matchAll(/className=`([^`]*)`/g);
  for (const match of templateMatches) {
    // Remove ${...} expressions for now, just validate static parts
    const staticParts = match[1].replace(/\$\{[^}]*\}/g, '');
    classStrings.push({ value: staticParts, source: 'template' });
  }

  return classStrings;
}

// Task 12: Check if a color class has the correct dark variant
function hasDarkVariant(colorClass, classString) {
  const prefix = colorClass.split('-')[0]; // 'text', 'bg', or 'border'

  // Exact match: dark:text-gray-900 for text-gray-900
  if (classString.includes('dark:' + colorClass)) {
    return true;
  }

  // With modifiers: dark:hover:text-gray-900
  if (classString.includes('dark:hover:' + colorClass)) {
    return true;
  }

  if (classString.includes('dark:group-hover:' + colorClass)) {
    return true;
  }

  // TIGHTENED: Check for ANY dark variant of the same type
  // But only if it's a reasonable match
  const darkPattern = new RegExp(`dark:(hover:|group-hover:)?${prefix}-`);
  if (darkPattern.test(classString)) {
    // Found a dark variant for the same property type
    // Additional validation: ensure it's a different shade
    const lightMatch = colorClass.match(/-(white|black|gray-\d+|[a-z]+-\d+)$/);
    const darkMatches = classString.match(new RegExp(`dark:(?:hover:|group-hover:)?${prefix}-(white|black|gray-\\d+|[a-z]+-\\d+)`, 'g'));

    if (lightMatch && darkMatches) {
      const lightShade = lightMatch[1];
      for (const darkMatch of darkMatches) {
        const darkShadeMatch = darkMatch.match(/-(white|black|gray-\d+|[a-z]+-\d+)$/);
        if (darkShadeMatch && darkShadeMatch[1] !== lightShade) {
          // Found a different shade for dark mode
          return true;
        }
      }
    }
  }

  return false;
}

// Task 13: Check for low-contrast pairs
function checkContrast(classString) {
  const issues = [];

  for (const pair of LOW_CONTRAST_PAIRS) {
    const hasText = pair.text.test(classString);
    const hasBg = pair.bg.test(classString);

    if (hasText && hasBg) {
      const textMatch = classString.match(pair.text);
      const bgMatch = classString.match(pair.bg);

      issues.push({
        type: 'low-contrast',
        mode: pair.mode,
        text: textMatch[0],
        bg: bgMatch[0],
        message: `Low contrast in ${pair.mode} mode: ${textMatch[0]} on ${bgMatch[0]}`
      });
    }
  }

  return issues;
}

// Check if text-white has a suitable background
function hasBackgroundForWhiteText(classString) {
  // Check for dark backgrounds
  if (/bg-(black|gray-[7-9]00)\b/.test(classString)) return true;

  // Check for colored backgrounds (500-900)
  if (/bg-(red|green|blue|purple|indigo|pink|orange|yellow|teal|emerald|cyan|sky|violet|fuchsia|rose|amber)-(500|600|700|800|900)\b/.test(classString)) return true;

  // Check for custom hex colors
  if (/bg-\[#/.test(classString)) return true;

  // Check for gradients (usually have dark colors)
  if (/bg-gradient/.test(classString)) return true;

  // Check for backdrop blur (glassmorphism, usually on dark overlays)
  if (/backdrop-blur/.test(classString)) return true;

  // Check for opacity overlays
  if (/bg-white\/\d+/.test(classString)) return true;

  return false;
}

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const errors = [];

  // Task 14: Extract class strings from all patterns
  lines.forEach((line, lineIndex) => {
    const classStringsInLine = extractClassStrings(line);

    classStringsInLine.forEach(({ value: classString, source }) => {
      // Task 13: Check for low-contrast pairs
      const contrastIssues = checkContrast(classString);
      contrastIssues.forEach(issue => {
        errors.push({
          line: lineIndex + 1,
          column: line.indexOf(classString) + 1,
          match: `${issue.text} with ${issue.bg}`,
          pattern: 'low-contrast',
          lineContent: line.trim(),
          className: classString,
          message: issue.message,
          source
        });
      });

      // Color class patterns to check
      const colorPatterns = [
        // Text colors
        { pattern: /text-gray-[1-9]00\b/g, type: 'text' },
        { pattern: /text-white\b/g, type: 'text' },
        { pattern: /text-black\b/g, type: 'text' },
        { pattern: /text-(red|green|blue|yellow|purple|pink|indigo|orange|teal|emerald|cyan|sky|violet|fuchsia|rose|amber)-[1-9]00\b/g, type: 'text' },

        // Background colors
        { pattern: /bg-white\b/g, type: 'bg' },
        { pattern: /bg-gray-[1-9]00\b/g, type: 'bg' },
        { pattern: /bg-(red|green|blue|yellow|purple|pink|indigo|orange|teal|emerald|cyan|sky|violet|fuchsia|rose|amber)-[1-9]00\b/g, type: 'bg' },

        // Border colors
        { pattern: /border-gray-[1-9]00\b/g, type: 'border' },
        { pattern: /border-(red|green|blue|yellow|purple|pink|indigo|orange|teal|emerald|cyan|sky|violet|fuchsia|rose|amber)-[1-9]00\b/g, type: 'border' },
      ];

      colorPatterns.forEach(({ pattern, type }) => {
        const colorMatches = [...classString.matchAll(pattern)];

        colorMatches.forEach(colorMatch => {
          const colorClass = colorMatch[0];
          const matchIndex = colorMatch.index;

          // Skip if this is already part of a dark: variant
          const beforeMatch = classString.substring(0, matchIndex);
          const lastSpaceIdx = beforeMatch.lastIndexOf(' ');
          const fullClass = classString.substring(lastSpaceIdx + 1).split(' ')[0];
          if (fullClass.startsWith('dark:')) {
            return;
          }

          // Task 12: Check allowed pairs (specific, not broad)
          if (ALLOWED_PAIRS.has(colorClass)) {
            return;
          }

          // Task 12: Check if has dark variant (tightened logic)
          if (hasDarkVariant(colorClass, classString)) {
            return;
          }

          // Special handling for text-white
          if (colorClass === 'text-white') {
            // Check if it has a suitable background
            if (hasBackgroundForWhiteText(classString)) {
              return;
            }

            // Check for special contexts (icons, quotes, etc.)
            if (classString.includes('italic') || /Check|XIcon|CheckIcon|CheckCircle/.test(line)) {
              return;
            }

            errors.push({
              line: lineIndex + 1,
              column: line.indexOf(classString) + 1,
              match: colorClass,
              pattern: 'text-white-without-bg',
              lineContent: line.trim(),
              className: classString,
              message: "text-white without dark background - invisible on white backgrounds! Add bg-blue-600 or use 'text-gray-900 dark:text-white'",
              source
            });
            return;
          }

          // Special handling for bg-white with opacity
          if (colorClass === 'bg-white' && classString.includes('bg-white/')) {
            return;
          }

          // Colored text on matching light backgrounds (accent design)
          if (colorClass.match(/text-(green|blue|red|purple|indigo|pink|orange|yellow)-600/) &&
            classString.match(/bg-(green|blue|red|purple|indigo|pink|orange|yellow)-50/)) {
            return;
          }

          // If we reach here, it's missing a dark variant
          errors.push({
            line: lineIndex + 1,
            column: line.indexOf(classString) + 1,
            match: colorClass,
            pattern: pattern.toString(),
            lineContent: line.trim(),
            className: classString,
            message: `Missing dark mode variant for ${colorClass}`,
            source
          });
        });
      });
    });
  });

  return errors;
}

function validateDarkMode() {
  console.log('🌙 Starting Dark Mode Validation V2...\n');
  console.log('Improvements:');
  console.log('✓ Task 12: Tightened exception rules (specific pairs, not broad regex)');
  console.log('✓ Task 13: Low-contrast detection (light-on-light, dark-on-dark)');
  console.log('✓ Task 14: Parses cn(), clsx(), and template literals\n');

  const allFiles = [];
  DIRECTORIES_TO_CHECK.forEach(dir => {
    const files = findFiles(dir);
    allFiles.push(...files);
  });

  console.log(`Checking ${allFiles.length} files...\n`);

  allFiles.forEach(filePath => {
    const errors = checkFile(filePath);

    if (errors.length > 0) {
      filesWithErrors++;
      totalErrors += errors.length;

      console.log(`❌ ${filePath}`);
      errors.forEach(error => {
        console.log(`  Line ${error.line}:${error.column} [${error.source}] - ${error.message || 'Missing dark variant'}`);
        console.log(`    Found: ${error.match}`);
        console.log(`    Context: ${error.lineContent.substring(0, 120)}...`);
        console.log('');
      });
    }
  });

  console.log('\n🌙 Dark Mode Validation Results:');
  console.log(`Files checked: ${allFiles.length}`);
  console.log(`Files with errors: ${filesWithErrors}`);
  console.log(`Total errors: ${totalErrors}`);

  if (totalErrors > 0) {
    console.log('\n❌ DARK MODE VALIDATION FAILED!');
    console.log('\nQuick fixes:');
    console.log('TEXT COLORS:');
    console.log('• text-gray-900 → text-gray-900 dark:text-gray-50');
    console.log('• text-gray-700 → text-gray-700 dark:text-gray-200');
    console.log('• text-white → text-white dark:text-gray-100 (+ ensure dark bg)');
    console.log('BACKGROUND COLORS:');
    console.log('• bg-white → bg-white dark:bg-gray-900');
    console.log('• bg-gray-100 → bg-gray-100 dark:bg-gray-800');
    console.log('LOW CONTRAST:');
    console.log('• text-gray-200 on bg-gray-100 → use text-gray-700 instead');
    console.log('• text-gray-800 on bg-gray-900 → use text-gray-200 instead');

    process.exit(1);
  } else {
    console.log('\n✅ All files pass dark mode validation!');
    process.exit(0);
  }
}

// Run validation
validateDarkMode();
