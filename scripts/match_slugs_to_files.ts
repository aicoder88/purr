
import fs from 'fs';
import path from 'path';

const blogDir = path.join(process.cwd(), 'content/blog/en');

function checkSlugs() {
    const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.json'));
    let issuesFound = false;

    console.log(`Checking ${files.length} files for slug mismatches...`);

    for (const file of files) {
        const filePath = path.join(blogDir, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        try {
            const json = JSON.parse(content);
            const filenameSlug = file.replace('.json', '');

            if (json.slug !== filenameSlug) {
                console.error(`❌ Mismatch in ${file}:`);
                console.error(`   Filename slug: ${filenameSlug}`);
                console.error(`   Content slug:  ${json.slug}`);
                issuesFound = true;

                // Auto-fix?
                // Ideally we trust the filename as the stable ID if that's what production uses.
                // But let's just report for now.

                // Let's actually auto-fix to match filename, as that's how file-system routing works best
                json.slug = filenameSlug;
                fs.writeFileSync(filePath, JSON.stringify(json, null, 2));
                console.log(`   ✅ Fixed slug to match filename.`);
            }
        } catch (e) {
            console.error(`Error parsing ${file}:`, e);
        }
    }

    if (!issuesFound) {
        console.log("✅ All slugs match their filenames.");
    }
}

checkSlugs();
