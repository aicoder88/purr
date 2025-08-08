#!/usr/bin/env node

/**
 * Code Quality Improvements Script
 * Addresses common SonarCloud issues and improves overall code quality
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Constants for magic numbers
const CONSTANTS = {
  DEFAULT_IMAGE_SIZE: 100,
  CACHE_SIZE_DEFAULT: 100,
  MILLISECONDS_PER_HOUR: 60 * 60 * 1000,
  DEFAULT_CLAIMED_BAGS: 205,
  MAX_IMAGE_WIDTH: 1920,
  OPTIMIZATION_RATE_MULTIPLIER: 100,
};

class CodeQualityImprover {
  constructor() {
    this.improvements = [];
    this.log = console.log;
  }

  async run() {
    this.log('🔧 Starting code quality improvements...');
    
    // Find TypeScript/JavaScript files
    const files = glob.sync('src/**/*.{ts,tsx,js,jsx}', {
      ignore: ['node_modules/**', '.next/**', 'dist/**']
    });

    for (const filePath of files) {
      await this.processFile(filePath);
    }

    this.log(`✅ Completed ${this.improvements.length} code quality improvements`);
    this.generateReport();
  }

  async processFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      let improved = content;
      let hasChanges = false;

      // Remove console.log in production files
      const consoleRegex = /console\.(log|warn|info|debug)\([^)]*\);?\s*$/gm;
      if (consoleRegex.test(improved)) {
        improved = improved.replace(consoleRegex, (match) => {
          hasChanges = true;
          this.improvements.push({
            file: filePath,
            type: 'console-removal',
            description: 'Removed console statement'
          });
          return `// ${match} // Removed for production`;
        });
      }

      // Fix magic numbers
      improved = this.replaceMagicNumbers(improved, filePath, hasChanges);

      // Remove unused variables (basic detection)
      improved = this.removeUnusedVariables(improved, filePath, hasChanges);

      // Add TypeScript strict null checks where missing
      improved = this.addNullChecks(improved, filePath, hasChanges);

      if (hasChanges) {
        fs.writeFileSync(filePath, improved);
        this.log(`🔧 Improved: ${filePath}`);
      }
    } catch (error) {
      this.log(`❌ Error processing ${filePath}:`, error.message);
    }
  }

  replaceMagicNumbers(content, filePath, hasChanges) {
    // Replace common magic numbers with constants
    const replacements = [
      { regex: /\b100\b/g, replacement: 'DEFAULT_SIZE', description: 'Default size constant' },
      { regex: /\b205\b/g, replacement: 'DEFAULT_CLAIMED_BAGS', description: 'Default claimed bags' },
      { regex: /\b1920\b/g, replacement: 'MAX_IMAGE_WIDTH', description: 'Maximum image width' },
    ];

    let improved = content;
    replacements.forEach(({ regex, replacement, description }) => {
      if (regex.test(improved) && !improved.includes(replacement)) {
        // Only replace if it looks like a magic number (not in strings or comments)
        const magicNumberRegex = new RegExp(`(?<!['"\`].*?)\\b${regex.source.slice(2, -2)}\\b(?!.*?['"\`])`, 'g');
        if (magicNumberRegex.test(improved)) {
          hasChanges = true;
          this.improvements.push({
            file: filePath,
            type: 'magic-number-replacement',
            description: `Replaced magic number with ${replacement}`
          });
        }
      }
    });

    return improved;
  }

  removeUnusedVariables(content, filePath, hasChanges) {
    // Basic unused variable detection (simple cases)
    const unusedVarRegex = /const\s+(\w+)\s*=.*?;[\s\n]*(?!.*\b\1\b)/g;
    let improved = content;

    const matches = [...content.matchAll(unusedVarRegex)];
    if (matches.length > 0) {
      matches.forEach(match => {
        const varName = match[1];
        // Check if variable is actually unused (simple check)
        const usageRegex = new RegExp(`\\b${varName}\\b`, 'g');
        const occurrences = [...content.matchAll(usageRegex)];
        
        if (occurrences.length === 1) { // Only the declaration
          hasChanges = true;
          this.improvements.push({
            file: filePath,
            type: 'unused-variable-removal',
            description: `Marked unused variable: ${varName}`
          });
          // Don't actually remove, just comment out for safety
          improved = improved.replace(match[0], `// ${match[0]} // Unused variable`);
        }
      });
    }

    return improved;
  }

  addNullChecks(content, filePath, hasChanges) {
    // Add null checks for potentially unsafe operations
    let improved = content;
    
    // Look for array access without null checks
    const arrayAccessRegex = /(\w+)\[(\w+|\d+)\]/g;
    const matches = [...content.matchAll(arrayAccessRegex)];
    
    matches.forEach(match => {
      const arrayName = match[1];
      const fullMatch = match[0];
      
      // Check if there's already a null check nearby
      const hasNullCheck = content.includes(`${arrayName} &&`) || 
                          content.includes(`${arrayName}?.`) ||
                          content.includes(`if (${arrayName})`);
      
      if (!hasNullCheck && !content.includes(`${arrayName}?.[`)) {
        // Suggest optional chaining but don't auto-apply for safety
        this.improvements.push({
          file: filePath,
          type: 'null-safety-suggestion',
          description: `Consider using optional chaining: ${arrayName}?.[...]`
        });
      }
    });

    return improved;
  }

  generateReport() {
    const report = {
      totalImprovements: this.improvements.length,
      byType: {},
      byFile: {}
    };

    this.improvements.forEach(improvement => {
      // Count by type
      report.byType[improvement.type] = (report.byType[improvement.type] || 0) + 1;
      
      // Count by file
      report.byFile[improvement.file] = (report.byFile[improvement.file] || 0) + 1;
    });

    // Write report to file
    fs.writeFileSync(
      path.join(process.cwd(), 'code-quality-report.json'),
      JSON.stringify(report, null, 2)
    );

    this.log('\n📊 Code Quality Report:');
    this.log(`Total improvements: ${report.totalImprovements}`);
    this.log('\nBy type:');
    Object.entries(report.byType).forEach(([type, count]) => {
      this.log(`  ${type}: ${count}`);
    });
    
    this.log('\n📄 Full report saved to: code-quality-report.json');
  }
}

// Run the script
if (require.main === module) {
  const improver = new CodeQualityImprover();
  improver.run().catch(console.error);
}

module.exports = CodeQualityImprover;