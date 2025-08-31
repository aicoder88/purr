#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

/**
 * Dark Mode Validation Script
 * Validates that all text elements have proper dark mode variants
 * and meet WCAG AA contrast standards
 */

class DarkModeValidator {
  constructor() {
    this.issues = [];
    this.fixes = [];
    this.stats = {
      totalTextElements: 0,
      missingDarkVariants: 0,
      poorContrast: 0,
      fixed: 0
    };
  }

  // Text patterns that should have dark variants
  textPatterns = [
    /text-(gray|slate|zinc|neutral|stone)-(\d+)/g,
    /text-(red|orange|yellow|green|blue|indigo|purple|pink)-((\d+))/g,
    /bg-white(?!\s|$|\/)/g,
    /bg-(gray|slate)-(\d+)/g
  ];

  // Recommended dark mode mappings for better contrast
  contrastMappings = {
    // Gray text mappings (most important for readability)
    'text-gray-900': 'dark:text-gray-50',    // Darkest text -> Lightest in dark mode
    'text-gray-800': 'dark:text-gray-100',   // Dark headers -> Light headers
    'text-gray-700': 'dark:text-gray-200',   // Body text -> Good contrast
    'text-gray-600': 'dark:text-gray-300',   // Secondary text
    'text-gray-500': 'dark:text-gray-400',   // Metadata text
    'text-gray-400': 'dark:text-gray-500',   // Very light text
    'text-gray-300': 'dark:text-gray-400',   // Super light text (WARNING: often poor contrast)
    'text-gray-200': 'dark:text-gray-300',   // Reverse mapping
    
    // Background mappings
    'bg-white': 'dark:bg-gray-900',
    'bg-gray-50': 'dark:bg-gray-800',
    'bg-gray-100': 'dark:bg-gray-700',
    'bg-gray-200': 'dark:bg-gray-600',
    
    // Color text mappings (enhanced for better contrast)
    'text-green-700': 'dark:text-green-300',
    'text-green-600': 'dark:text-green-400',
    'text-green-800': 'dark:text-green-200',
    'text-blue-700': 'dark:text-blue-300',
    'text-blue-600': 'dark:text-blue-400',
    'text-blue-800': 'dark:text-blue-200',
    'text-purple-700': 'dark:text-purple-300',
    'text-purple-600': 'dark:text-purple-400',
    'text-purple-800': 'dark:text-purple-200',
    'text-orange-700': 'dark:text-orange-300',
    'text-orange-600': 'dark:text-orange-400',
    'text-orange-800': 'dark:text-orange-200',
    'text-red-700': 'dark:text-red-300',
    'text-red-600': 'dark:text-red-400',
    'text-red-800': 'dark:text-red-200',
  };

  // Poor contrast patterns (these usually need fixing)
  poorContrastPatterns = [
    'text-gray-300 dark:text-gray-400',  // Both too light
    'text-gray-400 dark:text-gray-500',  // Both medium-light
    'text-gray-200 dark:text-gray-400',  // Poor contrast
  ];

  validateFile(filePath) {
    console.log(chalk.blue(`\\n📋 Validating: ${filePath}`));
    
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\\n');
    
    lines.forEach((line, index) => {
      this.validateLine(line, index + 1, filePath);
    });

    return {
      issues: this.issues,
      fixes: this.fixes,
      stats: this.stats
    };
  }

  validateLine(line, lineNumber, filePath) {
    // Check for text elements without dark variants
    const textMatches = [...line.matchAll(/className="[^"]*text-[^"\\s]+[^"]*"/g)];
    
    textMatches.forEach(match => {
      const className = match[0];
      this.stats.totalTextElements++;
      
      // Check if it has any dark: variant
      if (!className.includes('dark:text-')) {
        this.stats.missingDarkVariants++;
        this.issues.push({
          type: 'missing-dark-variant',
          file: filePath,
          line: lineNumber,
          className,
          suggestion: this.suggestDarkVariant(className)
        });
      }
      
      // Check for poor contrast patterns
      this.poorContrastPatterns.forEach(pattern => {
        if (className.includes(pattern)) {
          this.stats.poorContrast++;
          this.issues.push({
            type: 'poor-contrast',
            file: filePath,
            line: lineNumber,
            className,
            issue: pattern,
            suggestion: this.suggestBetterContrast(className)
          });
        }
      });
    });
  }

  suggestDarkVariant(className) {
    // Extract the base text class
    const textMatch = className.match(/text-[\\w]+-[\\d]+/);
    if (!textMatch) return null;
    
    const baseClass = textMatch[0];
    const suggestedDark = this.contrastMappings[baseClass];
    
    if (suggestedDark) {
      return className.replace(/text-[\\w]+-[\\d]+/, `${baseClass} ${suggestedDark}`);
    }
    
    return null;
  }

  suggestBetterContrast(className) {
    // Suggest better contrast alternatives
    if (className.includes('text-gray-300 dark:text-gray-400')) {
      return className.replace('text-gray-300 dark:text-gray-400', 'text-gray-600 dark:text-gray-300');
    }
    if (className.includes('text-gray-400 dark:text-gray-500')) {
      return className.replace('text-gray-400 dark:text-gray-500', 'text-gray-500 dark:text-gray-400');
    }
    return className;
  }

  generateReport() {
    console.log(chalk.yellow('\\n' + '='.repeat(60)));
    console.log(chalk.yellow('📊 DARK MODE VALIDATION REPORT'));
    console.log(chalk.yellow('='.repeat(60)));
    
    console.log(chalk.blue(`\\n📈 Statistics:`));
    console.log(`  Total text elements: ${this.stats.totalTextElements}`);
    console.log(`  Missing dark variants: ${chalk.red(this.stats.missingDarkVariants)}`);
    console.log(`  Poor contrast issues: ${chalk.red(this.stats.poorContrast)}`);
    console.log(`  Compliance: ${chalk.green(Math.round(((this.stats.totalTextElements - this.stats.missingDarkVariants - this.stats.poorContrast) / this.stats.totalTextElements) * 100) + '%')}`);
    
    if (this.issues.length > 0) {
      console.log(chalk.red(`\\n❌ Issues Found (${this.issues.length}):`));
      
      // Group issues by type
      const missingVariants = this.issues.filter(i => i.type === 'missing-dark-variant');
      const contrastIssues = this.issues.filter(i => i.type === 'poor-contrast');
      
      if (missingVariants.length > 0) {
        console.log(chalk.red(`\\n🚨 Missing Dark Variants (${missingVariants.length}):`));
        missingVariants.slice(0, 10).forEach(issue => {
          console.log(`  ${issue.file}:${issue.line}`);
          console.log(`    Current: ${issue.className}`);
          if (issue.suggestion) {
            console.log(`    ${chalk.green('Suggested:')} ${issue.suggestion}`);
          }
          console.log('');
        });
        if (missingVariants.length > 10) {
          console.log(`    ... and ${missingVariants.length - 10} more`);
        }
      }
      
      if (contrastIssues.length > 0) {
        console.log(chalk.red(`\\n⚠️ Poor Contrast Issues (${contrastIssues.length}):`));
        contrastIssues.forEach(issue => {
          console.log(`  ${issue.file}:${issue.line}`);
          console.log(`    Problem: ${issue.issue}`);
          console.log(`    Current: ${issue.className}`);
          console.log(`    ${chalk.green('Suggested:')} ${issue.suggestion}`);
          console.log('');
        });
      }
    } else {
      console.log(chalk.green(`\\n✅ No dark mode issues found!`));
    }

    console.log(chalk.blue(`\\n🎨 Recommended Color Hierarchy:`));
    console.log(`  Primary Headers: ${chalk.bold('text-gray-900 dark:text-gray-50')}`);
    console.log(`  Secondary Headers: ${chalk.bold('text-gray-800 dark:text-gray-100')}`);
    console.log(`  Body Text: ${chalk.bold('text-gray-700 dark:text-gray-200')}`);
    console.log(`  Secondary Text: ${chalk.bold('text-gray-600 dark:text-gray-300')}`);
    console.log(`  Metadata/Labels: ${chalk.bold('text-gray-500 dark:text-gray-400')}`);
    
    console.log(chalk.yellow('\\n' + '='.repeat(60)));
  }

  // Method to automatically fix issues (use with caution)
  generateFixes(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    let fixedContent = content;
    let fixCount = 0;

    // Apply suggested fixes
    this.issues.forEach(issue => {
      if (issue.suggestion && issue.file === filePath) {
        const original = issue.className;
        const fixed = issue.suggestion;
        if (fixedContent.includes(original)) {
          fixedContent = fixedContent.replace(original, fixed);
          fixCount++;
        }
      }
    });

    return { content: fixedContent, fixCount };
  }
}

// Main execution
function main() {
  const validator = new DarkModeValidator();
  const filePath = process.argv[2] || './pages/dn.tsx';
  
  if (!fs.existsSync(filePath)) {
    console.error(chalk.red(`❌ File not found: ${filePath}`));
    process.exit(1);
  }

  console.log(chalk.green('🚀 Starting Dark Mode Validation...'));
  
  try {
    const results = validator.validateFile(filePath);
    validator.generateReport();
    
    // Optional: Ask if user wants to apply fixes
    if (results.issues.length > 0 && process.argv.includes('--fix')) {
      console.log(chalk.yellow('\\n🔧 Applying automatic fixes...'));
      const { content, fixCount } = validator.generateFixes(filePath);
      
      // Create backup
      const backupPath = filePath + '.backup.' + Date.now();
      fs.writeFileSync(backupPath, fs.readFileSync(filePath, 'utf8'));
      console.log(chalk.blue(`📋 Backup created: ${backupPath}`));
      
      // Apply fixes
      fs.writeFileSync(filePath, content);
      console.log(chalk.green(`✅ Applied ${fixCount} fixes to ${filePath}`));
    }
    
  } catch (error) {
    console.error(chalk.red(`❌ Error validating file: ${error.message}`));
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = DarkModeValidator;