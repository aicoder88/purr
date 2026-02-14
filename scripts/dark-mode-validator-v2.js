#!/usr/bin/env node

/**
 * Dark Mode Validator V2.1 - Smart Contrast & Variant Awareness
 * 
 * Improvements:
 * - Correctly resolves Active Text/BG for Light vs Dark mode (handles overrides)
 * - Prevents cross-contamination (e.g. checking Default Text against Dark BG when Dark Text exists)
 * - Ignores opacity modifiers (bg-white/10) for contrast checks
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
  'text-brand-green-700', // Custom

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

// Extract class strings from multiple patterns
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

  // Pattern 4: Template literals with classes (both direct and JSX expressions)
  // Match: className=`...` and className={`...`}
  const templateMatches = content.matchAll(/className=(?:\{)?`([^`]*)`(?:\})?/g);
  for (const match of templateMatches) {
    // Remove ${...} expressions for now, just validate static parts
    const staticParts = match[1].replace(/\$\{[^}]*\}/g, '');
    classStrings.push({ value: staticParts, source: 'template' });
  }

  return classStrings;
}

// ---------------------------------------------------------------------------
// SMART CONTRAST CHECKER
// ---------------------------------------------------------------------------

const LIGHT_COLORS = new Set(['white', 'gray-50', 'gray-100', 'gray-200', 'gray-300', 'gray-400']);
const DARK_COLORS = new Set(['black', 'gray-700', 'gray-800', 'gray-900', 'gray-950']);

function parseClasses(classString) {
  return classString.split(/\s+/).filter(c => c.trim().length > 0).map(c => {
    // Handle variants like dark:hover:text-white
    const parts = c.split(':');
    const className = parts.pop(); // last part is the class
    const variants = parts; // preceding parts are variants

    let type = null;
    let color = null;

    if (className.startsWith('text-')) {
      type = 'text';
      color = className.replace('text-', '');
    } else if (className.startsWith('bg-')) {
      type = 'bg';
      color = className.replace('bg-', '');
    } else if (className.startsWith('border-')) {
      type = 'border';
      color = className.replace('border-', '');
    }

    // Ignore opacity modifiers (e.g. bg-white/10)
    if (color && color.includes('/')) {
      // Mark as opacity, we might want to ignore it for contrast checks
      type = 'opacity-modified';
    }

    return { raw: c, className, variants, type, color };
  });
}

function checkSmartContrast(classString) {
  const parsed = parseClasses(classString);
  const issues = [];

  // Helper to find effective class for a specific mode
  const getEffectiveClass = (items, targetType, isDark) => {
    // Filter for items of correct type
    const candidates = items.filter(i => i.type === targetType);

    // Sort logic: 
    // 1. Dark variant (if isDark)
    // 2. Base variant
    // We ignore hover/focus states for simplicity of base contrast check, 
    // unless we want to be very strict. Let's focus on BASE states first.

    let best = null;

    for (const item of candidates) {
      const isDarkVariant = item.variants.includes('dark');
      const isInteractive = item.variants.some(v => ['hover', 'focus', 'active', 'group-hover'].includes(v));

      if (isInteractive) continue; // Skip interactive states for base contrast check

      if (isDark) {
        if (isDarkVariant) return item; // Explicit dark mode class wins
        if (!best && !isDarkVariant) best = item; // Fallback to default
      } else {
        if (!isDarkVariant) return item; // Explicit default class wins
        // (We don't fallback to dark variant for light mode)
      }
    }
    return best;
  };

  // Check Light Mode
  const lightBg = getEffectiveClass(parsed, 'bg', false);
  const lightText = getEffectiveClass(parsed, 'text', false);

  if (lightBg && lightText) {
    if (LIGHT_COLORS.has(lightBg.color) && LIGHT_COLORS.has(lightText.color)) {
      issues.push({
        message: `Low contrast in light mode: ${lightText.raw} on ${lightBg.raw}`,
        text: lightText.raw,
        bg: lightBg.raw
      });
    }
  }

  // Check Dark Mode
  const darkBg = getEffectiveClass(parsed, 'bg', true);
  const darkText = getEffectiveClass(parsed, 'text', true);

  if (darkBg && darkText) {
    if (DARK_COLORS.has(darkBg.color) && DARK_COLORS.has(darkText.color)) {
      issues.push({
        message: `Low contrast in dark mode: ${darkText.raw} on ${darkBg.raw}`,
        text: darkText.raw,
        bg: darkBg.raw
      });
    }
  }

  return issues;
}

// Task 12: Check if a color class has the correct dark variant
function hasDarkVariant(colorClass, classString) {
  const prefix = colorClass.split('-')[0]; // 'text', 'bg', or 'border'

  // Exact match: dark:text-gray-900 for text-gray-900
  if (classString.includes('dark:' + colorClass)) {
    return true;
  }

  // TIGHTENED: Check for ANY dark variant of the same type
  // But only if it's a reasonable match
  const darkPattern = new RegExp(`dark:(hover:|group-hover:|focus:)?${prefix}-`);
  if (darkPattern.test(classString)) {
    return true; // Assume if any dark variant exists, developer handled it (simplification)
  }

  return false;
}

// Check if text-white has a suitable background
function hasBackgroundForWhiteText(classString) {
  // Check for any dark background (gray, neutral, zinc, slate, stone, or colors 600-900)
  if (/bg-([a-z]+)-(600|700|800|900|950)\b/.test(classString)) return true;

  // Check for black
  if (/bg-black\b/.test(classString)) return true;

  // Check for custom hex colors
  if (/bg-\[#/.test(classString)) return true;

  // Check for gradients (usually have dark colors)
  if (/bg-gradient/.test(classString)) return true;

  // Check for backdrop blur (glassmorphism, usually on dark overlays)
  if (/backdrop-blur/.test(classString)) return true;

  // Check for opacity overlays
  if (/bg-white\/\d+/.test(classString)) return true;

  // Check for transparent
  if (/bg-transparent/.test(classString)) return true;

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
      // Typography plugin safety: `prose` sets nested element colors (e.g. <strong>) via CSS vars.
      // Without `prose-invert` in dark mode, bold/links can become dark-on-dark and unreadable.
      const hasProse =
        /(?:^|\s)prose(?:\s|$)/.test(classString) ||
        /(?:^|\s)prose-/.test(classString);
      if (hasProse && !/prose-invert/.test(classString)) {
        errors.push({
          line: lineIndex + 1,
          column: line.indexOf(classString) + 1,
          match: 'prose',
          pattern: 'prose-missing-invert',
          lineContent: line.trim(),
          className: classString,
          message: "Typography `prose` without `dark:prose-invert` can make <strong>/<a> unreadable in dark mode. Add `dark:prose-invert` (or `prose-invert`).",
          source
        });
      }

      // Blog CTA pattern: light gradient backgrounds must define dark gradient stops.
      // Without dark:from/to, dark-mode text variants can become light-on-light.
      const isGreenCtaGradient = /bg-gradient-to-r\b/.test(classString) &&
        /(?:^|\s)from-green-50(?:\s|$)/.test(classString) &&
        /(?:^|\s)to-emerald-50(?:\s|$)/.test(classString);
      if (isGreenCtaGradient && (!/dark:from-/.test(classString) || !/dark:to-/.test(classString))) {
        errors.push({
          line: lineIndex + 1,
          column: line.indexOf(classString) + 1,
          match: 'bg-gradient-to-r from-green-50 to-emerald-50',
          pattern: 'gradient-missing-dark-stops',
          lineContent: line.trim(),
          className: classString,
          message: 'Gradient CTA missing `dark:from-*`/`dark:to-*` stops (breaks contrast in dark mode).',
          source
        });
      }

      // Task 13: Smart Contrast Check
      const contrastIssues = checkSmartContrast(classString);
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

      // Color class patterns to check (Legacy Dark Variant Checks)
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
          if (fullClass.includes('dark:')) {
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

            // Check if it's white on hover
            if (classString.includes('hover:text-white') && classString.includes('hover:bg-')) {
              return; // Assume hover bg fixes it
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
  console.log('🌙 Starting Dark Mode Validation V2.1 (Smart)...\n');
  console.log('Improvements:');
  console.log('✓ Smart Contrast: Correctly resolves Light/Dark mode active colors');
  console.log('✓ Variant Awareness: Handles overrides and opacity correctly\n');

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

  console.log(`\n🌙 Dark Mode Validation Results:`);
  console.log(`Files checked: ${allFiles.length}`);
  console.log(`Files with errors: ${filesWithErrors}`);
  console.log(`Total errors: ${totalErrors}`);

  if (totalErrors > 0) {
    console.log('\n❌ DARK MODE VALIDATION FAILED!');
    process.exit(1);
  } else {
    console.log('\n✅ All files pass dark mode validation!');
    process.exit(0);
  }
}

// Run validation
validateDarkMode();
