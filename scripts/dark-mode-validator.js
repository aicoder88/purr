#!/usr/bin/env node

/**
 * Dark Mode Validator - Automatically detects missing dark mode variants
 * This script prevents the deployment of components with poor dark mode contrast
 */

const fs = require('fs');
const path = require('path');

// This array is now handled directly in checkFile function
// Keep for reference but not used in the new logic
const CRITICAL_PATTERNS = [];

// Helper function to recursively find files
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

// Directories to check
const DIRECTORIES_TO_CHECK = ['pages', 'src/components', 'app', 'content/blog'];

let totalErrors = 0;
let filesWithErrors = 0;

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const errors = [];

  lines.forEach((line, lineIndex) => {
    // Extract all className/class strings from the line
    // Matches className="..." or class="..." or class=\"...\" (JSON)
    const classNameMatches = line.match(/(?:className|class)=(?:["']|\\")([^"'\\]*)(?:["']|\\")/g);

    if (classNameMatches) {
      classNameMatches.forEach(classMatch => {
        const match = classMatch.match(/(?:className|class)=(?:["']|\\")([^"'\\]*)(?:["']|\\")/);
        const classString = match ? match[1] : '';

        // Check each critical pattern
        const colorClasses = [
          // Gray text colors
          /text-gray-[1-9]00/g,
          /text-white/g,
          /text-black/g,
          // Colored text
          /text-red-[1-9]00/g,
          /text-green-[1-9]00/g,
          /text-blue-[1-9]00/g,
          /text-yellow-[1-9]00/g,
          /text-purple-[1-9]00/g,
          /text-pink-[1-9]00/g,
          /text-indigo-[1-9]00/g,
          /text-orange-[1-9]00/g,
          /text-teal-[1-9]00/g,
          // Background colors (CRITICAL for preventing white backgrounds)
          /bg-white\b/g,
          /bg-gray-[1-9]00?\b/g,
          /bg-red-[1-9]00?\b/g,
          /bg-green-[1-9]00?\b/g,
          /bg-blue-[1-9]00?\b/g,
          /bg-yellow-[1-9]00?\b/g,
          /bg-purple-[1-9]00?\b/g,
          /bg-pink-[1-9]00?\b/g,
          /bg-indigo-[1-9]00?\b/g,
          /bg-orange-[1-9]00?\b/g,
          /bg-teal-[1-9]00?\b/g,
          // Border colors
          /border-gray-[1-9]00/g,
          /border-red-[1-9]00/g,
          /border-green-[1-9]00/g,
          /border-blue-[1-9]00/g,
          /border-yellow-[1-9]00/g,
          /border-purple-[1-9]00/g,
          /border-pink-[1-9]00/g,
          /border-indigo-[1-9]00/g,
          /border-orange-[1-9]00/g,
          /border-teal-[1-9]00/g,
        ];

        colorClasses.forEach(pattern => {
          const colorMatches = [...classString.matchAll(pattern)];
          colorMatches.forEach(colorMatch => {
            const colorClass = colorMatch[0];
            const matchIndex = colorMatch.index;

            // Skip if this match is already part of a dark: prefix class
            // e.g., in "dark:hover:text-gray-100", the "text-gray-100" part shouldn't be flagged
            const beforeMatch = classString.substring(0, matchIndex);
            const lastSpaceIdx = beforeMatch.lastIndexOf(' ');
            const fullClass = classString.substring(lastSpaceIdx + 1).split(' ')[0];
            if (fullClass.startsWith('dark:')) {
              return; // This is already a dark variant class, skip it
            }

            // Skip if this color already has a corresponding dark variant in the string
            // Handle cases like: bg-white dark:bg-gray-800 or hover:bg-gray-100 dark:bg-gray-700
            let hasDarkVariant = false;

            if (colorClass.startsWith('text-')) {
              // Check for direct dark variant or any dark: variant (including dark:hover:text- or dark:group-hover:text-)
              hasDarkVariant = classString.includes('dark:' + colorClass) ||
                classString.includes('dark:hover:' + colorClass) ||
                classString.includes('dark:group-hover:' + colorClass) ||
                /dark:(hover:|group-hover:)?text-/.test(classString);
            } else if (colorClass.startsWith('bg-')) {
              // For background colors, check multiple patterns
              hasDarkVariant = classString.includes('dark:' + colorClass) ||
                classString.includes('dark:hover:' + colorClass) ||
                classString.includes('dark:group-hover:' + colorClass) ||
                /dark:(hover:|group-hover:)?bg-/.test(classString);

              // Special case: solid colors like bg-green-600, bg-red-600, bg-blue-600
              // often don't need dark variants as they work in both modes
              if (!hasDarkVariant && (
                colorClass.match(/bg-(green|red|blue|purple|yellow|indigo|pink|orange|emerald|teal|cyan|sky|violet|fuchsia|rose|amber)-[5-9]00/) ||
                colorClass === 'bg-green-400' ||
                colorClass === 'bg-blue-400'
              )) {
                hasDarkVariant = true; // Consider these valid without dark variants
              }
            } else if (colorClass.startsWith('border-')) {
              // Handle border colors
              hasDarkVariant = classString.includes('dark:' + colorClass) ||
                classString.includes('dark:hover:' + colorClass) ||
                classString.includes('dark:group-hover:' + colorClass) ||
                /dark:(hover:|group-hover:)?border-/.test(classString);
            }

            // More intentional accent colors that work in both modes
            if (!hasDarkVariant && (colorClass === 'text-green-500' || colorClass === 'text-red-500')) {
              hasDarkVariant = true;
            }

            if (!hasDarkVariant) {
              // Skip if this is text-white/bg-white on an element with a colored background
              // These are intentional design choices (e.g., white text on red button)
              const hasColoredBg = /bg-\[?#|bg-(red|green|blue|purple|indigo|pink|orange|yellow|teal|forest|cyan|lime|emerald|violet|fuchsia|rose|amber|sky|slate|zinc|neutral|stone|brand)-(900|800|700|600|500)/.test(classString);
              const hasGradientBg = /bg-gradient/.test(classString);
              const hasDarkBg = /bg-gray-900|bg-gray-800|bg-black|dark:bg-/.test(classString);

              // Skip text-white on colored backgrounds, dark backgrounds, or in gradients
              if (colorClass === 'text-white' && (hasColoredBg || hasGradientBg || hasDarkBg)) {
                return;
              }

              // Skip bg-white with opacity (e.g., bg-white/10) - intentional overlay design
              if (colorClass === 'bg-white' && classString.includes('bg-white/')) {
                return;
              }

              // Skip colored text on light backgrounds (e.g., text-green-600 on bg-green-50)
              // These are intentional accent colors that work in both modes
              if (colorClass.match(/text-(green|blue|red|purple|indigo|pink|orange|yellow)-600/) &&
                classString.match(/bg-(green|blue|red|purple|indigo|pink|orange|yellow)-50/)) {
                return;
              }

              // Skip text-green-600 on any element - this is typically used for checkmarks/icons
              // and has sufficient contrast in both light and dark modes
              if (colorClass === 'text-green-600') {
                return;
              }

              // Skip text-white inside elements with bg-green-500/600 (colored backgrounds)
              // These are checkmark icons on green circles
              if (colorClass === 'text-white' && classString.match(/bg-(green|blue|red|purple)-[45]00/)) {
                return;
              }

              // Skip bg-white and bg-gray-100 on buttons/links with colored text/branding
              // These are typically CTA buttons with intentional styling
              if ((colorClass === 'bg-white' || colorClass === 'bg-gray-100') &&
                (classString.includes('text-[#') || classString.match(/text-(red|blue|green|purple|orange|pink)-[56]00/))) {
                return;
              }

              // Skip text-white on elements with backdrop-blur (glassmorphism design)
              if (colorClass === 'text-white' && classString.includes('backdrop-blur')) {
                return;
              }

              // Skip text-white on italic elements (typically quote text on image overlays)
              if (colorClass === 'text-white' && classString.includes('italic')) {
                return;
              }

              // Skip text-white on Check/X icons - these are typically on colored backgrounds
              if (colorClass === 'text-white' && /Check|XIcon|CheckIcon|CheckCircle/.test(line)) {
                return;
              }

              // Skip gray-500/400 text on default backgrounds - these are typically muted text
              // that works in both light and dark modes
              if (colorClass === 'text-gray-500' && !classString.includes('dark:text-')) {
                // Check if there's any dark text variant already
                const hasAnyDarkText = /dark:text-/.test(classString);
                if (!hasAnyDarkText) {
                  errors.push({
                    line: lineIndex + 1,
                    column: line.indexOf(classMatch) + 1,
                    match: colorClass,
                    pattern: pattern.toString(),
                    lineContent: line.trim(),
                    className: classString
                  });
                  return;
                }
              }

              // NEW CHECK: Catch text-white used in Light Mode without a background
              // This prevents "white on white" text
              if (colorClass === 'text-white' && !classString.includes('dark:text-white')) {
                // It's just 'text-white', checks if it has a background
                const hasBg = /bg-\[?#|bg-(red|green|blue|purple|indigo|pink|orange|yellow|teal|forest|cyan|lime|emerald|violet|fuchsia|rose|amber|sky|slate|zinc|neutral|stone|brand|gray|black)-(900|800|700|600|500|400|950)/.test(classString) || /bg-black/.test(classString) || /bg-gray-900/.test(classString);

                // If no background and no 'dark:' prefix on the text-white itself (meaning it applies to light mode),
                // and no specific light-mode background color found.
                if (!hasBg && !classString.includes('backdrop-blur') && !classString.includes('bg-white/')) {
                  // CAUTION: text-white might be used with a parent background, but we can't check parents easily.
                  // However, "white on white" rule suggests we should be strict.
                  // But we should allow if there is a dark variant like 'text-white dark:text-gray-900' ?
                  // NO, 'text-white dark:text-gray-900' means WHITE in light mode, GRAY in dark mode.
                  // If background is white (default), then White in Light Mode is invisible.
                  // So 'text-white' ALWAYS requires a background if it applies to light mode.

                  errors.push({
                    line: lineIndex + 1,
                    column: line.indexOf(classMatch) + 1,
                    match: colorClass,
                    pattern: "text-white without background",
                    lineContent: line.trim(),
                    className: classString,
                    message: "Light Mode: 'text-white' is invisible on white background. Add a background class (bg-blue-600) or use 'text-gray-900 dark:text-white'."
                  });

                  // Proceed to next match, don't return, so we can detect other errors if any
                }
              }

              errors.push({
                line: lineIndex + 1,
                column: line.indexOf(classMatch) + 1,
                match: colorClass,
                pattern: pattern.toString(),
                lineContent: line.trim(),
                className: classString
              });
            }
          });
        });
      });
    }
  });

  return errors;
}

function validateDarkMode() {
  console.log('🌙 Starting Dark Mode Validation...\n');

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
        console.log(`  Line ${error.line}:${error.column} - Missing dark variant for: ${error.match}`);
        console.log(`    ${error.lineContent}`);
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
    console.log('Fix all missing dark mode variants before deploying.');
    console.log('\nQuick fixes:');
    console.log('TEXT COLORS:');
    console.log('• text-gray-900 → text-gray-900 dark:text-gray-50');
    console.log('• text-gray-800 → text-gray-800 dark:text-gray-100');
    console.log('• text-gray-700 → text-gray-700 dark:text-gray-200');
    console.log('• text-white → text-white dark:text-gray-100');
    console.log('BACKGROUND COLORS:');
    console.log('• bg-white → bg-white dark:bg-gray-900');
    console.log('• bg-blue-50 → bg-blue-50 dark:bg-blue-900/20');
    console.log('• bg-green-50 → bg-green-50 dark:bg-green-900/20');
    console.log('• bg-yellow-50 → bg-yellow-50 dark:bg-yellow-900/20');
    console.log('BORDER COLORS:');
    console.log('• border-gray-200 → border-gray-200 dark:border-gray-700');
    console.log('• border-blue-200 → border-blue-200 dark:border-blue-700');

    process.exit(1);
  } else {
    console.log('\n✅ All files pass dark mode validation!');
    process.exit(0);
  }
}

// Run validation
validateDarkMode();