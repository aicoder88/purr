import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

// Get the current directory in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const SRC_DIR = path.join(__dirname, '..', 'src');
const PAGES_DIR = path.join(__dirname, '..', 'pages');
const FILE_EXTENSIONS = ['.tsx', '.jsx', '.ts', '.js'];
const EXCLUDE_DIRS = ['node_modules', '.next', 'out', 'public'];

// Patterns to search and replace
const PATTERNS = [
  // Fix array index in keys
  {
    name: 'array-index-keys',
    pattern: /key=\{[^}]*\bindex\b[^}]*}/g,
    replace: (match, fileContent, filePath) => {
      // Try to find a better key from the item properties
      const lines = fileContent.split('\n');
      const lineNumber = lines.findIndex(line => line.includes(match));
      if (lineNumber === -1) return match;
      
      // Get the map line
      const mapLine = lines[lineNumber];
      const mapMatch = mapLine.match(/(\w+)\.map\(/);
      if (!mapMatch) return match;
      
      const arrayName = mapMatch[1];
      
      // Try to find the array definition
      const arrayDefLine = lines.findIndex((line, idx) => 
        idx < lineNumber && 
        line.includes(`const ${arrayName} = [`) || 
        line.includes(`const ${arrayName}:`)
      );
      
      if (arrayDefLine === -1) return match;
      
      // Try to find an id or name property in the array items
      const arrayDef = lines[arrayDefLine];
      if (arrayDef.includes('id:')) {
        return match.replace(/key=\{[^}]*\bindex\b[^}]*}/, 'key={item.id}');
      } else if (arrayDef.includes('name:')) {
        return match.replace(/key=\{[^}]*\bindex\b[^}]*}/, 'key={`item-${item.name}`}');
      } else {
        // Fallback to using a stable key with index
        return match.replace(/key=\{[^}]*\bindex\b[^}]*}/, 'key={`item-${index}`}');
      }
    }
  },
  
  // Fix unused variables
  {
    name: 'unused-variables',
    pattern: /const \{ (\w+) \} = useTranslation\(\);/g,
    replace: (match, varName, fileContent) => {
      // Check if the variable is used in the file
      const varUsage = new RegExp(`\\b${varName}\\b`);
      if (!varUsage.test(fileContent.replace(match, ''))) {
        return '// Removed unused translation import';
      }
      return match;
    }
  },
  
  // Fix component naming
  {
    name: 'component-naming',
    pattern: /import (\w+) from ['"]([^'"]+)\.(tsx|jsx|ts|js)['"]/g,
    replace: (match, importName, importPath) => {
      if (/^[A-Z]/.test(importName)) {
        return match; // Already PascalCase
      }
      const newImportName = importName.replace(/^[a-z]/, char => char.toUpperCase());
      return `import ${newImportName} from '${importPath}.tsx';`;
    }
  }
];

// Find all relevant files
function findFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !EXCLUDE_DIRS.includes(file)) {
      findFiles(filePath, fileList);
    } else if (FILE_EXTENSIONS.includes(path.extname(file))) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Process a single file
function processFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // Apply all patterns
    PATTERNS.forEach(pattern => {
      const newContent = content.replace(pattern.pattern, (...args) => {
        const result = pattern.replace(...args, content);
        if (result !== args[0]) modified = true;
        return result;
      });
      
      if (newContent !== content) {
        content = newContent;
        console.log(`Applied ${pattern.name} fix to ${filePath}`);
      }
    });
    
    // Write back if modified
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Updated ${filePath}`);
    }
    
    return modified;
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return false;
  }
}

// Main function
function main() {
  console.log('🔍 Finding files...');
  const files = [
    ...findFiles(SRC_DIR),
    ...findFiles(PAGES_DIR)
  ];
  
  console.log(`🔄 Processing ${files.length} files...`);
  let modifiedCount = 0;
  
  files.forEach(filePath => {
    if (processFile(filePath)) {
      modifiedCount++;
    }
  });
  
  console.log(`\n✨ Done! Modified ${modifiedCount} out of ${files.length} files.`);
  
  // Format the code after modifications
  console.log('\n🎨 Formatting code with Prettier...');
  try {
    execSync('npx prettier --write "{src,pages}/**/*.{js,jsx,ts,tsx}"', { stdio: 'inherit' });
  } catch (error) {
    console.warn('⚠️ Prettier formatting failed:', error.message);
  }
}

// Run the script
main();
