import * as fs from 'fs';
import * as path from 'path';

const reportPath = path.join(process.cwd(), 'static-page-analysis.json');
const report = JSON.parse(fs.readFileSync(reportPath, 'utf-8'));

const pagesToOptimize = report.pages.canOptimize;

console.log(`Optimizing ${pagesToOptimize.length} pages...`);

pagesToOptimize.forEach((page: { file: string }) => {
    const filePath = path.join(process.cwd(), 'app', page.file);
    let content = fs.readFileSync(filePath, 'utf-8');

    if (content.includes("export const dynamic = 'force-static'")) {
        console.log(`⏭️  Already optimized: ${page.file}`);
        return;
    }

    // Insert at the top, but after any imports if we want to be clean, 
    // though Next.js doesn't mind if it's at the very top.
    // We'll put it at line 1.
    content = `export const dynamic = 'force-static';\n\n` + content;

    fs.writeFileSync(filePath, content);
    console.log(`✅ Optimized: ${page.file}`);
});

console.log('Done!');
