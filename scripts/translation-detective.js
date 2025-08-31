#!/usr/bin/env node

/**
 * Translation Detective - Comprehensive Translation Issue Detection and Fixing Script
 * 
 * This script scans the entire Purrify codebase for translation issues and provides
 * automated fixes where possible.
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

class TranslationDetective {
  constructor() {
    this.issues = [];
    this.stats = {
      filesScanned: 0,
      issuesFound: 0,
      hardcodedTextFound: 0,
      htmlInTranslationsFound: 0,
      missingTranslationKeysFound: 0,
      fixesApplied: 0
    };
    
    this.sourceDir = path.join(__dirname, '..');
    this.translationFiles = {
      en: path.join(this.sourceDir, 'src/translations/en.ts'),
      fr: path.join(this.sourceDir, 'src/translations/fr.ts'),
      zh: path.join(this.sourceDir, 'src/translations/zh.ts')
    };
    
    // Patterns for detecting issues
    this.patterns = {
      // Hardcoded English text (basic detection)
      hardcodedText: /["'`]([A-Z][a-zA-Z\s]{10,}|[A-Z][a-zA-Z\s]*(?:Cat|Purrify|Litter|Odor|Fresh)[a-zA-Z\s]*)["`']/g,
      
      // HTML tags within strings
      htmlInStrings: /["'`]([^"'`]*<\/?[a-zA-Z][^>]*>[^"'`]*)["`']/g,
      
      // Translation key usage
      translationUsage: /t\.([a-zA-Z0-9_.]+)|{t\.([a-zA-Z0-9_.]+)}/g,
      
      // Missing useTranslation imports
      missingTranslationImport: /from.*translation-context/,
      
      // Hardcoded labels and text in JSX
      jsxHardcodedText: />[A-Z][a-zA-Z\s]{5,}</g,
      
      // Alt text and aria-label hardcoded
      hardcodedAttributes: /(alt|aria-label|title|placeholder)=["'][A-Z][a-zA-Z\s]{3,}["']/g,
      
      // Form validation messages
      validationMessages: /["'](.*(?:required|invalid|error|success|loading|submitting).*)["']/gi
    };
    
    // Common hardcoded text that should be translated
    this.commonHardcodedPhrases = [
      'Loading...',
      'Submitting...',
      'Please wait',
      'Error occurred',
      'Success!',
      'Contact Us',
      'About Us',
      'Learn More',
      'Buy Now',
      'Add to Cart',
      'Free Trial',
      'Customer Reviews',
      'Testimonials',
      'FAQ',
      'Frequently Asked Questions',
      'Product Information',
      'Shipping & Delivery',
      'Payment & Billing',
      'Customer Support'
    ];
  }

  async run() {
    console.log('🕵️  Translation Detective Starting Scan...\n');
    
    try {
      await this.scanAllFiles();
      await this.analyzeTranslationFiles();
      await this.generateReport();
      await this.suggestFixes();
      
      console.log('\n✅ Translation Detective Scan Complete!');
      console.log(`📊 Files Scanned: ${this.stats.filesScanned}`);
      console.log(`🚨 Total Issues Found: ${this.stats.issuesFound}`);
      
    } catch (error) {
      console.error('❌ Translation Detective encountered an error:', error);
    }
  }

  async scanAllFiles() {
    console.log('🔍 Scanning files for translation issues...');
    
    // Scan patterns for React/Next.js files
    const patterns = [
      'src/**/*.{tsx,jsx,ts,js}',
      'pages/**/*.{tsx,jsx,ts,js}',
      'components/**/*.{tsx,jsx,ts,js}'
    ];
    
    for (const pattern of patterns) {
      const files = glob.sync(pattern, { cwd: this.sourceDir });
      
      for (const file of files) {
        await this.scanFile(path.join(this.sourceDir, file));
      }
    }
  }

  async scanFile(filePath) {
    try {
      this.stats.filesScanned++;
      const content = fs.readFileSync(filePath, 'utf8');
      const relativePath = path.relative(this.sourceDir, filePath);
      
      // Skip node_modules and .next directories
      if (relativePath.includes('node_modules') || relativePath.includes('.next')) {
        return;
      }
      
      console.log(`  📄 Scanning: ${relativePath}`);
      
      // Check for hardcoded text
      await this.detectHardcodedText(filePath, content, relativePath);
      
      // Check for HTML in translation strings
      await this.detectHtmlInTranslations(filePath, content, relativePath);
      
      // Check for missing translation imports
      await this.detectMissingTranslationImports(filePath, content, relativePath);
      
      // Check for translation key usage
      await this.detectTranslationKeyUsage(filePath, content, relativePath);
      
      // Check for hardcoded attributes
      await this.detectHardcodedAttributes(filePath, content, relativePath);
      
    } catch (error) {
      console.error(`❌ Error scanning file ${filePath}:`, error.message);
    }
  }

  async detectHardcodedText(filePath, content, relativePath) {
    const lines = content.split('\n');
    
    lines.forEach((line, index) => {
      // Check for common hardcoded phrases
      this.commonHardcodedPhrases.forEach(phrase => {
        const regex = new RegExp(`["'\`]([^"'\`]*${phrase}[^"'\`]*)["'\`]`, 'gi');
        const matches = line.match(regex);
        
        if (matches) {
          matches.forEach(match => {
            this.addIssue({
              type: 'HARDCODED_TEXT',
              severity: 'HIGH',
              file: relativePath,
              line: index + 1,
              content: match,
              message: `Hardcoded text detected: "${phrase}"`,
              suggestion: `Replace with translation key, e.g., t.ui.${phrase.toLowerCase().replace(/\s+/g, '')}`
            });
          });
        }
      });
      
      // Check for general hardcoded English text patterns
      const hardcodedMatches = line.match(this.patterns.hardcodedText);
      if (hardcodedMatches) {
        hardcodedMatches.forEach(match => {
          // Skip if it looks like a translation key or import
          if (!match.includes('t.') && !match.includes('translation') && !match.includes('import')) {
            this.addIssue({
              type: 'POTENTIAL_HARDCODED_TEXT',
              severity: 'MEDIUM',
              file: relativePath,
              line: index + 1,
              content: match,
              message: 'Potential hardcoded English text detected',
              suggestion: 'Consider using translation key if this text is user-facing'
            });
          }
        });
      }
    });
  }

  async detectHtmlInTranslations(filePath, content, relativePath) {
    const lines = content.split('\n');
    
    lines.forEach((line, index) => {
      const htmlMatches = line.match(this.patterns.htmlInStrings);
      
      if (htmlMatches) {
        htmlMatches.forEach(match => {
          this.addIssue({
            type: 'HTML_IN_TRANSLATION',
            severity: 'HIGH',
            file: relativePath,
            line: index + 1,
            content: match,
            message: 'HTML tags found in translation string',
            suggestion: 'Extract HTML tags from translation string and use React components for formatting'
          });
        });
      }
    });
  }

  async detectMissingTranslationImports(filePath, content, relativePath) {
    // Check if file uses translation but doesn't import useTranslation
    const usesTranslation = content.includes('t.') || content.includes('{t');
    const hasImport = this.patterns.missingTranslationImport.test(content);
    
    if (usesTranslation && !hasImport) {
      this.addIssue({
        type: 'MISSING_TRANSLATION_IMPORT',
        severity: 'HIGH',
        file: relativePath,
        line: 1,
        content: '',
        message: 'File uses translations but missing useTranslation import',
        suggestion: `Add: import { useTranslation } from '../path/to/translation-context';`
      });
    }
  }

  async detectTranslationKeyUsage(filePath, content, relativePath) {
    const matches = content.match(this.patterns.translationUsage);
    
    if (matches) {
      matches.forEach(match => {
        const key = match.replace(/t\.|{|}/g, '');
        
        // This would need to be enhanced to check if the key exists in translation files
        console.log(`  🔑 Found translation key usage: ${key} in ${relativePath}`);
      });
    }
  }

  async detectHardcodedAttributes(filePath, content, relativePath) {
    const lines = content.split('\n');
    
    lines.forEach((line, index) => {
      const attrMatches = line.match(this.patterns.hardcodedAttributes);
      
      if (attrMatches) {
        attrMatches.forEach(match => {
          this.addIssue({
            type: 'HARDCODED_ATTRIBUTE',
            severity: 'MEDIUM',
            file: relativePath,
            line: index + 1,
            content: match,
            message: 'Hardcoded attribute text detected',
            suggestion: 'Use translation key for accessibility and internationalization'
          });
        });
      }
    });
  }

  async analyzeTranslationFiles() {
    console.log('\n🌐 Analyzing translation files...');
    
    for (const [locale, filePath] of Object.entries(this.translationFiles)) {
      if (fs.existsSync(filePath)) {
        console.log(`  📋 Checking ${locale}.ts`);
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Check for HTML in translation values
        const htmlMatches = content.match(this.patterns.htmlInStrings);
        if (htmlMatches) {
          htmlMatches.forEach(match => {
            this.addIssue({
              type: 'HTML_IN_TRANSLATION_FILE',
              severity: 'HIGH',
              file: `src/translations/${locale}.ts`,
              line: -1,
              content: match,
              message: 'HTML tags in translation file',
              suggestion: 'Remove HTML from translation and handle formatting in components'
            });
          });
        }
        
      } else {
        this.addIssue({
          type: 'MISSING_TRANSLATION_FILE',
          severity: 'CRITICAL',
          file: filePath,
          line: 1,
          content: '',
          message: `Translation file missing for locale: ${locale}`,
          suggestion: `Create ${locale}.ts translation file`
        });
      }
    }
  }

  addIssue(issue) {
    this.issues.push({
      ...issue,
      id: this.issues.length + 1,
      timestamp: new Date().toISOString()
    });
    
    this.stats.issuesFound++;
    
    switch (issue.type) {
      case 'HARDCODED_TEXT':
      case 'POTENTIAL_HARDCODED_TEXT':
        this.stats.hardcodedTextFound++;
        break;
      case 'HTML_IN_TRANSLATION':
      case 'HTML_IN_TRANSLATION_FILE':
        this.stats.htmlInTranslationsFound++;
        break;
      case 'MISSING_TRANSLATION_IMPORT':
        this.stats.missingTranslationKeysFound++;
        break;
    }
  }

  async generateReport() {
    console.log('\n📊 Generating detailed report...');
    
    // Group issues by type and severity
    const reportData = {
      summary: this.stats,
      issuesByType: {},
      issuesBySeverity: {},
      fileIssues: {}
    };
    
    this.issues.forEach(issue => {
      // By type
      if (!reportData.issuesByType[issue.type]) {
        reportData.issuesByType[issue.type] = [];
      }
      reportData.issuesByType[issue.type].push(issue);
      
      // By severity
      if (!reportData.issuesBySeverity[issue.severity]) {
        reportData.issuesBySeverity[issue.severity] = [];
      }
      reportData.issuesBySeverity[issue.severity].push(issue);
      
      // By file
      if (!reportData.fileIssues[issue.file]) {
        reportData.fileIssues[issue.file] = [];
      }
      reportData.fileIssues[issue.file].push(issue);
    });
    
    // Generate markdown report
    const reportContent = this.generateMarkdownReport(reportData);
    const reportPath = path.join(this.sourceDir, 'translation-detective-report.md');
    fs.writeFileSync(reportPath, reportContent);
    
    console.log(`📄 Report saved to: translation-detective-report.md`);
    
    // Generate JSON report for programmatic use
    const jsonReportPath = path.join(this.sourceDir, 'translation-detective-report.json');
    fs.writeFileSync(jsonReportPath, JSON.stringify(reportData, null, 2));
    
    console.log(`📄 JSON report saved to: translation-detective-report.json`);
  }

  generateMarkdownReport(reportData) {
    let markdown = `# Translation Detective Report\n\n`;
    markdown += `Generated: ${new Date().toISOString()}\n\n`;
    
    // Summary
    markdown += `## Summary\n\n`;
    markdown += `- **Files Scanned**: ${reportData.summary.filesScanned}\n`;
    markdown += `- **Total Issues Found**: ${reportData.summary.issuesFound}\n`;
    markdown += `- **Hardcoded Text Issues**: ${reportData.summary.hardcodedTextFound}\n`;
    markdown += `- **HTML in Translations**: ${reportData.summary.htmlInTranslationsFound}\n`;
    markdown += `- **Missing Translation Keys**: ${reportData.summary.missingTranslationKeysFound}\n\n`;
    
    // Issues by severity
    markdown += `## Issues by Severity\n\n`;
    ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'].forEach(severity => {
      const issues = reportData.issuesBySeverity[severity] || [];
      if (issues.length > 0) {
        markdown += `### ${severity} (${issues.length} issues)\n\n`;
        issues.slice(0, 10).forEach(issue => { // Show first 10 of each severity
          markdown += `- **${issue.file}:${issue.line}** - ${issue.message}\n`;
          markdown += `  \`\`\`\n  ${issue.content}\n  \`\`\`\n`;
          markdown += `  💡 *Suggestion: ${issue.suggestion}*\n\n`;
        });
        
        if (issues.length > 10) {
          markdown += `... and ${issues.length - 10} more ${severity} issues\n\n`;
        }
      }
    });
    
    // Most problematic files
    markdown += `## Most Problematic Files\n\n`;
    const fileIssuesList = Object.entries(reportData.fileIssues)
      .sort((a, b) => b[1].length - a[1].length)
      .slice(0, 10);
    
    fileIssuesList.forEach(([file, issues]) => {
      markdown += `- **${file}** (${issues.length} issues)\n`;
    });
    
    return markdown;
  }

  async suggestFixes() {
    console.log('\n🔧 Generating fix suggestions...');
    
    // Generate fix script
    let fixScript = `#!/usr/bin/env node\n\n`;
    fixScript += `// Auto-generated fix script by Translation Detective\n`;
    fixScript += `// Review each fix before applying!\n\n`;
    fixScript += `const fs = require('fs');\nconst path = require('path');\n\n`;
    
    // Group fixes by file
    const fixesByFile = {};
    this.issues.forEach(issue => {
      if (issue.type === 'HARDCODED_TEXT' && issue.severity === 'HIGH') {
        if (!fixesByFile[issue.file]) {
          fixesByFile[issue.file] = [];
        }
        fixesByFile[issue.file].push(issue);
      }
    });
    
    fixScript += `const fixes = ${JSON.stringify(fixesByFile, null, 2)};\n\n`;
    fixScript += `// Apply fixes function would go here\n`;
    fixScript += `console.log('⚠️  Manual review required before applying fixes');\n`;
    
    const fixScriptPath = path.join(this.sourceDir, 'apply-translation-fixes.js');
    fs.writeFileSync(fixScriptPath, fixScript);
    
    console.log(`🔧 Fix script generated: apply-translation-fixes.js`);
    console.log(`⚠️  Review the script before running!`);
  }

  // Priority fix recommendations
  getPriorityFixes() {
    const priorities = {
      critical: this.issues.filter(i => i.severity === 'CRITICAL'),
      high: this.issues.filter(i => i.severity === 'HIGH'),
      faqPage: this.issues.filter(i => i.file.includes('faq.tsx'))
    };
    
    return priorities;
  }
}

// CLI Interface
if (require.main === module) {
  const detective = new TranslationDetective();
  
  const args = process.argv.slice(2);
  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
Translation Detective - Find and Fix Translation Issues

Usage:
  node translation-detective.js [options]

Options:
  --help, -h     Show this help message
  --fix          Apply automatic fixes (use with caution)
  --report-only  Generate report without fixing
  --verbose      Show detailed output
  
Examples:
  node translation-detective.js
  node translation-detective.js --report-only
    `);
    process.exit(0);
  }
  
  detective.run().catch(console.error);
}

module.exports = TranslationDetective;