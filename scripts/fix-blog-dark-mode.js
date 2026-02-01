
const fs = require('fs');
const path = require('path');
const glob = require('glob');

const DIRECTORY = 'content/blog';

// Replacements to apply
// ORDER MATTERS: Specific patterns first
const REPLACEMENTS = [
    // Text Colors
    { pattern: /text-gray-900(?![ \"]*dark:)/g, replacement: 'text-gray-900 dark:text-gray-50' },
    { pattern: /text-gray-800(?![ \"]*dark:)/g, replacement: 'text-gray-800 dark:text-gray-100' },
    { pattern: /text-gray-700(?![ \"]*dark:)/g, replacement: 'text-gray-700 dark:text-gray-200' },
    { pattern: /text-gray-600(?![ \"]*dark:)/g, replacement: 'text-gray-600 dark:text-gray-300' },
    { pattern: /text-gray-500(?![ \"]*dark:)/g, replacement: 'text-gray-500 dark:text-gray-400' },
    { pattern: /text-gray-400(?![ \"]*dark:)/g, replacement: 'text-gray-400 dark:text-gray-500' },

    // Text Colors - Colored
    { pattern: /text-green-900(?![ \"]*dark:)/g, replacement: 'text-green-900 dark:text-green-100' },
    { pattern: /text-blue-900(?![ \"]*dark:)/g, replacement: 'text-blue-900 dark:text-blue-100' },
    { pattern: /text-amber-900(?![ \"]*dark:)/g, replacement: 'text-amber-900 dark:text-amber-100' },
    { pattern: /text-purple-900(?![ \"]*dark:)/g, replacement: 'text-purple-900 dark:text-purple-100' },

    { pattern: /text-green-800(?![ \"]*dark:)/g, replacement: 'text-green-800 dark:text-green-200' },
    { pattern: /text-blue-800(?![ \"]*dark:)/g, replacement: 'text-blue-800 dark:text-blue-200' },
    { pattern: /text-amber-800(?![ \\" ]*dark:)/g, replacement: 'text-amber-800 dark:text-amber-200' },
    { pattern: /text-yellow-800(?![ \"]*dark:)/g, replacement: 'text-yellow-800 dark:text-yellow-200' },
    { pattern: /text-purple-800(?![ \"]*dark:)/g, replacement: 'text-purple-800 dark:text-purple-200' },

    { pattern: /text-green-700(?![ \"]*dark:)/g, replacement: 'text-green-700 dark:text-green-300' },
    { pattern: /text-blue-700(?![ \"]*dark:)/g, replacement: 'text-blue-700 dark:text-blue-300' },
    { pattern: /text-orange-700(?![ \"]*dark:)/g, replacement: 'text-orange-700 dark:text-orange-300' },
    { pattern: /text-purple-600(?![ \"]*dark:)/g, replacement: 'text-purple-600 dark:text-purple-400' },

    // Backgrounds
    { pattern: /bg-white(?![ \"]*dark:)/g, replacement: 'bg-white dark:bg-gray-900' },
    { pattern: /bg-gray-50(?![ \"]*dark:)/g, replacement: 'bg-gray-50 dark:bg-gray-800' },
    { pattern: /bg-gray-100(?![ \"]*dark:)/g, replacement: 'bg-gray-100 dark:bg-gray-800' },
    { pattern: /bg-green-50(?![ \"]*dark:)/g, replacement: 'bg-green-50 dark:bg-green-900/20' },
    { pattern: /bg-blue-50(?![ \"]*dark:)/g, replacement: 'bg-blue-50 dark:bg-blue-900/20' },
    { pattern: /bg-amber-50(?![ \"]*dark:)/g, replacement: 'bg-amber-50 dark:bg-amber-900/20' },
    { pattern: /bg-yellow-50(?![ \"]*dark:)/g, replacement: 'bg-yellow-50 dark:bg-yellow-900/20' },
    { pattern: /bg-orange-50(?![ \"]*dark:)/g, replacement: 'bg-orange-50 dark:bg-orange-900/20' },

    // Borders
    { pattern: /border-gray-100(?![ \"]*dark:)/g, replacement: 'border-gray-100 dark:border-gray-800' },
    { pattern: /border-gray-200(?![ \"]*dark:)/g, replacement: 'border-gray-200 dark:border-gray-700' },
    { pattern: /border-green-100(?![ \"]*dark:)/g, replacement: 'border-green-100 dark:border-green-800' },
    { pattern: /border-blue-100(?![ \"]*dark:)/g, replacement: 'border-blue-100 dark:border-blue-800' },
    { pattern: /border-green-500(?![ \"]*dark:)/g, replacement: 'border-green-500 dark:border-green-700' },
    { pattern: /border-blue-500(?![ \"]*dark:)/g, replacement: 'border-blue-500 dark:border-blue-700' },
    { pattern: /border-orange-100(?![ \"]*dark:)/g, replacement: 'border-orange-100 dark:border-orange-900/20' },
    { pattern: /border-amber-100(?![ \"]*dark:)/g, replacement: 'border-amber-100 dark:border-amber-900/20' },
];

function fixFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;

    REPLACEMENTS.forEach(({ pattern, replacement }) => {
        content = content.replace(pattern, replacement);
    });

    // Deduplicate dark variants
    content = content.replace(/(dark:[\w:/-]+)\s+\1/g, '$1');

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content);
        console.log(`✅ Fixed ${filePath}`);
        return true;
    }
    return false;
}

// Find files
const files = glob.sync(`${DIRECTORY}/**/*.json`);
console.log(`Checking ${files.length} files...`);

let fixedCount = 0;
files.forEach(file => {
    if (fixFile(file)) fixedCount++;
});

console.log(`Fixed ${fixedCount} files.`);
