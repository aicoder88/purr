#!/usr/bin/env node

const fs = require('fs');
const { execSync } = require('child_process');

// Get specific violations from the validator
function getViolations() {
  try {
    const result = execSync('npm run validate-dark-mode', { encoding: 'utf8', stdio: 'pipe' });
    return result;
  } catch (error) {
    return error.stdout + error.stderr;
  }
}

// Parse violations from output
function parseViolations(output) {
  const violations = [];
  const lines = output.split('\n');
  let currentFile = null;
  
  for (const line of lines) {
    if (line.startsWith('❌ ')) {
      currentFile = line.replace('❌ ', '').trim();
    } else if (line.match(/Line \d+:\d+ - Missing dark variant for:/)) {
      const match = line.match(/Line (\d+):\d+ - Missing dark variant for: (.+)/);
      if (match && currentFile) {
        const [, lineNumber, classPattern] = match;
        const nextLine = lines[lines.indexOf(line) + 1];
        if (nextLine && nextLine.trim()) {
          violations.push({
            file: currentFile,
            line: parseInt(lineNumber),
            pattern: classPattern.trim(),
            code: nextLine.trim()
          });
        }
      }
    }
  }
  
  return violations;
}

// Fix specific violations
function fixViolations(violations) {
  const fileChanges = new Map();
  
  // Group by file
  violations.forEach(violation => {
    if (!fileChanges.has(violation.file)) {
      fileChanges.set(violation.file, []);
    }
    fileChanges.get(violation.file).push(violation);
  });
  
  let totalFixed = 0;
  
  fileChanges.forEach((violationsInFile, fileName) => {
    try {
      const fullPath = `pages/${fileName}`;
      if (!fs.existsSync(fullPath)) return;
      
      let content = fs.readFileSync(fullPath, 'utf8');
      const lines = content.split('\n');
      let hasChanges = false;
      
      // Sort by line number descending to avoid line number shifts
      violationsInFile.sort((a, b) => b.line - a.line);
      
      violationsInFile.forEach(violation => {
        const lineIndex = violation.line - 1;
        if (lineIndex >= 0 && lineIndex < lines.length) {
          const originalLine = lines[lineIndex];
          
          // Skip if line is commented out
          if (originalLine.trim().startsWith('//')) return;
          
          let newLine = originalLine;
          
          // Common fixes
          const fixes = [
            { pattern: /text-yellow-600(\b)/g, replace: 'text-yellow-600 dark:text-yellow-400$1' },
            { pattern: /text-red-600(\b)/g, replace: 'text-red-600 dark:text-red-400$1' },
            { pattern: /text-green-600(\b)/g, replace: 'text-green-600 dark:text-green-400$1' },
            { pattern: /text-blue-600(\b)/g, replace: 'text-blue-600 dark:text-blue-400$1' },
            { pattern: /text-indigo-600(\b)/g, replace: 'text-indigo-600 dark:text-indigo-400$1' },
            { pattern: /text-indigo-700(\b)/g, replace: 'text-indigo-700 dark:text-indigo-300$1' },
            { pattern: /text-indigo-800(\b)/g, replace: 'text-indigo-800 dark:text-indigo-200$1' },
            { pattern: /text-red-700(\b)/g, replace: 'text-red-700 dark:text-red-300$1' },
            { pattern: /text-red-800(\b)/g, replace: 'text-red-800 dark:text-red-200$1' },
            { pattern: /text-green-700(\b)/g, replace: 'text-green-700 dark:text-green-300$1' },
            { pattern: /text-green-800(\b)/g, replace: 'text-green-800 dark:text-green-200$1' },
            { pattern: /text-blue-700(\b)/g, replace: 'text-blue-700 dark:text-blue-300$1' },
            { pattern: /text-blue-800(\b)/g, replace: 'text-blue-800 dark:text-blue-200$1' },
            { pattern: /text-blue-900(\b)/g, replace: 'text-blue-900 dark:text-blue-100$1' },
            { pattern: /text-gray-400(\b)/g, replace: 'text-gray-400 dark:text-gray-500$1' },
            { pattern: /text-indigo-200(\b)/g, replace: 'text-indigo-200 dark:text-indigo-300$1' },
            { pattern: /text-white(\b)/g, replace: 'text-white dark:text-gray-100$1' },
            { pattern: /text-yellow-400(\b)/g, replace: 'text-yellow-400 dark:text-yellow-300$1' },
          ];
          
          fixes.forEach(fix => {
            if (newLine.includes(violation.pattern) && fix.pattern.test(newLine)) {
              newLine = newLine.replace(fix.pattern, fix.replace);
            }
          });
          
          if (newLine !== originalLine) {
            lines[lineIndex] = newLine;
            hasChanges = true;
            totalFixed++;
          }
        }
      });
      
      if (hasChanges) {
        fs.writeFileSync(fullPath, lines.join('\n'));
        console.log(`✅ Fixed ${violationsInFile.length} violations in ${fileName}`);
      }
      
    } catch (error) {
      console.error(`❌ Error fixing ${fileName}:`, error.message);
    }
  });
  
  return totalFixed;
}

function main() {
  console.log('🌙 Analyzing remaining dark mode violations...\n');
  
  const output = getViolations();
  const violations = parseViolations(output);
  
  console.log(`Found ${violations.length} specific violations to fix\n`);
  
  if (violations.length === 0) {
    console.log('🎉 No violations found! Dark mode compliance achieved.');
    return;
  }
  
  // Show first few violations for debugging
  console.log('Sample violations:');
  violations.slice(0, 5).forEach(v => {
    console.log(`  ${v.file}:${v.line} - ${v.pattern}`);
  });
  console.log('');
  
  const fixed = fixViolations(violations);
  
  console.log(`\n🎉 Fixed ${fixed} violations!`);
  
  // Run validation again to see progress
  console.log('\n📊 Running validation to check progress...\n');
  try {
    execSync('npm run validate-dark-mode', { stdio: 'inherit' });
  } catch (error) {
    console.log('Validation completed with remaining issues.');
  }
}

main();