const fs = require('fs');
const path = require('path');

// Get all JSON filenames in content/blog/en/
const blogDir = path.join(process.cwd(), 'content/blog/en');
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.json')).map(f => f.replace('.json', ''));

// Read blog-posts.ts to extract slugs
const registryContent = fs.readFileSync('src/data/blog-posts.ts', 'utf8');
const slugMatches = registryContent.match(/link:\s*['"]\/blog\/([^'"]+)['"]/g) || [];
const registrySlugs = slugMatches.map(m => m.match(/\/blog\/([^'"]+)/)[1]);

// Find mismatches: slugs in registry that don't have matching files
const missingFiles = [];
registrySlugs.forEach(slug => {
    if (!files.includes(slug)) {
        missingFiles.push(slug);
    }
});

// Find orphan files: files that aren't in registry
const orphanFiles = [];
files.forEach(file => {
    if (!registrySlugs.includes(file)) {
        orphanFiles.push(file);
    }
});

console.log('=== SLUG vs FILENAME AUDIT ===');
console.log('Total registered posts:', registrySlugs.length);
console.log('Total JSON files:', files.length);
console.log('');
console.log('MISSING FILES (registry slug has no matching .json file):', missingFiles.length);
missingFiles.forEach(s => console.log('  - ' + s));
console.log('');
console.log('ORPHAN FILES (JSON file not in registry):', orphanFiles.length);
orphanFiles.forEach(f => console.log('  - ' + f));
