#!/usr/bin/env node

/**
 * Refactor Translation Automation Script
 * 
 * This script automates the process of finding hardcoded strings in React/Next.js
 * components and suggests replacements with translation keys.
 * 
 * Usage:
 * - node scripts/refactor-translations.js --scan [path]  # Scan for hardcoded strings
 * - node scripts/refactor-translations.js --check       # Check translation completeness
 * - node scripts/refactor-translations.js --fix [path]  # Auto-fix simple patterns
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class TranslationRefactorer {
  constructor() {
    this.translationFiles = {
      en: './src/translations/en.ts',
      fr: './src/translations/fr.ts', 
      zh: './src/translations/zh.ts'
    };
    
    this.typesFile = './src/translations/types.ts';
    
    // Common patterns that indicate hardcoded content
    this.hardcodedPatterns = [
      // French hardcoded text
      /['"`]([^'"`]*(?:é|è|à|ç|ô|û|î|ê|â|ù|ï|ë|ÿ|É|È|À|Ç|Ô|Û|Î|Ê|Â|Ù|Ï|Ë|Ÿ)[^'"`]*)['"`]/g,
      // Chinese hardcoded text  
      /['"`]([^'"`]*[\u4e00-\u9fff][^'"`]*)['"`]/g,
      // Common English phrases that should be translated
      /['"`](Contact us|Get started|Learn more|Read more|Try now|Sign up|Log in|About us|Privacy Policy|Terms of Service|FAQ|Help|Support)['"`]/gi,
      // Form labels and placeholders
      /placeholder=["']([^"']+)["']/g,
      /title=["']([^"']+)["']/g,
      // Common UI text
      /['"`](Loading|Error|Success|Warning|Cancel|Save|Delete|Edit|Update|Submit|Next|Previous|Back|Continue|Finish)['"`]/g
    ];
    
    // Suggested translation key mappings
    this.keyMappings = {
      'Contact us': 'common.contactUs',
      'Get started': 'common.getStarted', 
      'Learn more': 'common.learnMore',
      'Read more': 'common.readMore',
      'Try now': 'common.tryNow',
      'Sign up': 'auth.signUp',
      'Log in': 'auth.logIn',
      'Loading': 'common.loading',
      'Error': 'common.error',
      'Success': 'common.success',
      'Cancel': 'common.cancel',
      'Save': 'common.save',
      'Privacy Policy': 'legal.privacyPolicy',
      'Terms of Service': 'legal.termsOfService',
      'FAQ': 'common.faq'
    };
  }

  /**
   * Scan directory for hardcoded strings
   */
  async scanForHardcodedStrings(scanPath = './pages') {
    console.log(`🔍 Scanning ${scanPath} for hardcoded strings...`);
    
    const results = [];
    
    try {
      const files = this.getReactFiles(scanPath);
      
      for (const file of files) {
        const content = fs.readFileSync(file, 'utf-8');
        const hardcoded = this.findHardcodedStrings(content, file);
        
        if (hardcoded.length > 0) {
          results.push({
            file,
            hardcoded
          });
        }
      }
      
      this.displayScanResults(results);
      return results;
      
    } catch (error) {
      console.error('❌ Error scanning files:', error.message);
      return [];
    }
  }

  /**
   * Get all React/Next.js files recursively
   */
  getReactFiles(dir) {
    const files = [];
    
    const scan = (currentDir) => {
      if (!fs.existsSync(currentDir)) return;
      
      const items = fs.readdirSync(currentDir);
      
      for (const item of items) {
        const fullPath = path.join(currentDir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
          scan(fullPath);
        } else if (stat.isFile() && /\.(tsx?|jsx?)$/.test(item)) {
          files.push(fullPath);
        }
      }
    };
    
    scan(dir);
    return files;
  }

  /**
   * Find hardcoded strings in file content
   */
  findHardcodedStrings(content, filePath) {
    const found = [];
    const lines = content.split('\n');
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Skip import statements and comments
      if (line.trim().startsWith('import') || 
          line.trim().startsWith('//') || 
          line.trim().startsWith('/*') ||
          line.trim().startsWith('*')) {
        continue;
      }
      
      for (const pattern of this.hardcodedPatterns) {
        let match;
        const regex = new RegExp(pattern.source, pattern.flags);
        
        while ((match = regex.exec(line)) !== null) {
          const text = match[1] || match[0];
          
          // Filter out likely non-translatable content
          if (this.shouldTranslate(text)) {
            found.push({
              line: i + 1,
              text: text,
              fullLine: line.trim(),
              suggestedKey: this.suggestTranslationKey(text, filePath)
            });
          }
        }
      }
    }
    
    return found;
  }

  /**
   * Determine if text should be translated
   */
  shouldTranslate(text) {
    // Skip short strings, URLs, file paths, class names, etc.
    if (text.length < 3) return false;
    if (/^[a-z-]+$/.test(text)) return false; // CSS classes
    if (/^https?:\/\//.test(text)) return false; // URLs
    if (/^\/[\/\w-]*$/.test(text)) return false; // Paths
    if (/^\w+\.(png|jpg|svg|css|js)$/.test(text)) return false; // File names
    if (/^#[0-9a-fA-F]{3,6}$/.test(text)) return false; // Hex colors
    if (/^\d+(\.\d+)?(px|em|rem|%)$/.test(text)) return false; // CSS units
    
    return true;
  }

  /**
   * Suggest translation key based on content and context
   */
  suggestTranslationKey(text, filePath) {
    // Use predefined mappings if available
    if (this.keyMappings[text]) {
      return this.keyMappings[text];
    }
    
    // Generate key based on file path and content
    const fileName = path.basename(filePath, path.extname(filePath));
    const cleanText = text
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    
    // Create camelCase key
    const words = cleanText.split(' ');
    const key = words.map((word, index) => 
      index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
    ).join('');
    
    return `${fileName}.${key}`;
  }

  /**
   * Display scan results
   */
  displayScanResults(results) {
    if (results.length === 0) {
      console.log('✅ No hardcoded strings found!');
      return;
    }
    
    console.log(`\n📊 Found ${results.length} files with hardcoded strings:\n`);
    
    let totalStrings = 0;
    
    for (const result of results) {
      console.log(`📁 ${result.file}`);
      console.log(`   Found ${result.hardcoded.length} hardcoded strings:`);
      
      for (const item of result.hardcoded) {
        console.log(`   Line ${item.line}: "${item.text}"`);
        console.log(`   → Suggested key: ${item.suggestedKey}`);
        console.log(`   → Context: ${item.fullLine}`);
        console.log();
        totalStrings++;
      }
      
      console.log();
    }
    
    console.log(`📈 Total hardcoded strings found: ${totalStrings}`);
  }

  /**
   * Check translation completeness
   */
  async checkTranslationCompleteness() {
    console.log('🔍 Checking translation completeness...');
    
    try {
      const translations = {};
      
      // Load all translation files
      for (const [locale, filePath] of Object.entries(this.translationFiles)) {
        if (fs.existsSync(filePath)) {
          // Simple extraction - in real implementation you'd want proper AST parsing
          const content = fs.readFileSync(filePath, 'utf-8');
          translations[locale] = this.extractTranslationKeys(content);
        } else {
          console.warn(`⚠️  Translation file not found: ${filePath}`);
          translations[locale] = new Set();
        }
      }
      
      // Compare completeness
      const locales = Object.keys(translations);
      if (locales.length < 2) {
        console.log('❌ Need at least 2 translation files to compare');
        return;
      }
      
      const baseLocale = locales[0];
      const baseKeys = translations[baseLocale];
      
      console.log(`\n📊 Translation Completeness Report:`);
      console.log(`Base locale (${baseLocale}): ${baseKeys.size} keys\n`);
      
      for (let i = 1; i < locales.length; i++) {
        const locale = locales[i];
        const keys = translations[locale];
        const missing = [...baseKeys].filter(key => !keys.has(key));
        const extra = [...keys].filter(key => !baseKeys.has(key));
        
        console.log(`📍 ${locale.toUpperCase()} Translation:`);
        console.log(`   Total keys: ${keys.size}`);
        console.log(`   Missing: ${missing.length} keys`);
        console.log(`   Extra: ${extra.length} keys`);
        console.log(`   Completeness: ${((keys.size - missing.length) / baseKeys.size * 100).toFixed(1)}%`);
        
        if (missing.length > 0) {
          console.log(`   Missing keys: ${missing.slice(0, 10).join(', ')}${missing.length > 10 ? '...' : ''}`);
        }
        
        console.log();
      }
      
    } catch (error) {
      console.error('❌ Error checking translations:', error.message);
    }
  }

  /**
   * Extract translation keys from file content
   * Note: This is a simplified implementation. For production use,
   * you'd want proper AST parsing with TypeScript compiler API
   */
  extractTranslationKeys(content, prefix = '') {
    const keys = new Set();
    
    // Match object keys in translation files
    const keyRegex = /^\s*(\w+):/gm;
    let match;
    
    while ((match = keyRegex.exec(content)) !== null) {
      const key = prefix ? `${prefix}.${match[1]}` : match[1];
      keys.add(key);
    }
    
    return keys;
  }

  /**
   * Auto-fix simple translation patterns
   */
  async autoFix(targetPath = './pages') {
    console.log('🔧 Auto-fixing simple translation patterns...');
    
    const results = await this.scanForHardcodedStrings(targetPath);
    let fixedCount = 0;
    
    for (const result of results) {
      const content = fs.readFileSync(result.file, 'utf-8');
      let newContent = content;
      let fileFixed = false;
      
      for (const item of result.hardcoded) {
        // Only fix simple, safe patterns
        if (this.keyMappings[item.text]) {
          const oldPattern = `"${item.text}"`;
          const newPattern = `{t.${this.keyMappings[item.text]}}`;
          
          if (newContent.includes(oldPattern)) {
            newContent = newContent.replace(oldPattern, newPattern);
            fileFixed = true;
            fixedCount++;
          }
        }
      }
      
      if (fileFixed) {
        // Ensure the file imports useTranslation
        if (!newContent.includes('useTranslation')) {
          const importLine = "import { useTranslation } from '@/lib/translation-context';";
          const lines = newContent.split('\n');
          
          // Find the last import line
          let lastImportIndex = -1;
          for (let i = 0; i < lines.length; i++) {
            if (lines[i].trim().startsWith('import ')) {
              lastImportIndex = i;
            }
          }
          
          if (lastImportIndex >= 0) {
            lines.splice(lastImportIndex + 1, 0, importLine);
            newContent = lines.join('\n');
          }
        }
        
        // Add useTranslation hook if not present
        if (!newContent.includes('const { t') && newContent.includes('{t.')) {
          newContent = newContent.replace(
            /const (\w+): NextPage = \(\) => {/,
            `const $1: NextPage = () => {
  const { t } = useTranslation();`
          );
        }
        
        fs.writeFileSync(result.file, newContent);
        console.log(`✅ Fixed ${result.file}`);
      }
    }
    
    console.log(`\n🎉 Auto-fixed ${fixedCount} hardcoded strings!`);
  }
}

// CLI interface
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  const path = args[1] || './pages';
  
  const refactorer = new TranslationRefactorer();
  
  switch (command) {
    case '--scan':
      await refactorer.scanForHardcodedStrings(path);
      break;
      
    case '--check':
      await refactorer.checkTranslationCompleteness();
      break;
      
    case '--fix':
      await refactorer.autoFix(path);
      break;
      
    default:
      console.log(`
📝 Translation Refactoring Tool

Usage:
  node scripts/refactor-translations.js --scan [path]   Scan for hardcoded strings
  node scripts/refactor-translations.js --check        Check translation completeness  
  node scripts/refactor-translations.js --fix [path]   Auto-fix simple patterns

Examples:
  node scripts/refactor-translations.js --scan ./pages/fr
  node scripts/refactor-translations.js --check
  node scripts/refactor-translations.js --fix ./pages
      `);
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = TranslationRefactorer;