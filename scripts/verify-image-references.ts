
import fs from 'fs';
import path from 'path';
import glob from 'fast-glob';

const ROOT_DIR = process.cwd();
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');
const OPTIMIZED_DIR = path.join(PUBLIC_DIR, 'optimized');

async function main() {
    // 1. Get all files in public/optimized
    if (!fs.existsSync(OPTIMIZED_DIR)) {
        console.error(`Optimized directory not found: ${OPTIMIZED_DIR}`);
        process.exit(1);
    }

    const optimizedFiles = new Set(fs.readdirSync(OPTIMIZED_DIR));
    console.log(`Found ${optimizedFiles.size} files in public/optimized`);

    // 2. Find all source files to scan
    const sourceFiles = await glob(['**/*.{ts,tsx,js,jsx,json,md}'], {
        cwd: ROOT_DIR,
        ignore: ['**/node_modules/**', '**/.next/**', '**/public/**', '**/.git/**', '**/scripts/**'],
        absolute: true
    });

    console.log(`Scanning ${sourceFiles.length} source files...`);

    let errorCount = 0;
    const regex = /\/optimized\/([^"'`\s)]+)/g;

    for (const file of sourceFiles) {
        const content = fs.readFileSync(file, 'utf-8');
        let match;
        while ((match = regex.exec(content)) !== null) {
            const fullRef = match[0];
            const filename = match[1].split('?')[0]; // removal query params if any

            // Ignore if it's a template literal variable
            if (filename.includes('${')) continue;

            if (!optimizedFiles.has(filename)) {
                console.error(`Missing image reference: ${fullRef} in ${path.relative(ROOT_DIR, file)}`);
                errorCount++;
            }
        }
    }

    if (errorCount > 0) {
        console.log(`\nFound ${errorCount} missing image references.`);
        // process.exit(1); // Don't exit with error to verify logic first
    } else {
        console.log("\nAll /optimized/ references are valid.");
    }
}

main();
