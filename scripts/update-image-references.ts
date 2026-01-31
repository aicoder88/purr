import { glob } from 'glob';
import fs from 'fs';
import path from 'path';

async function updateReferences() {
    console.log('Starting reference updates...');

    // Define files to scan
    const files = await glob([
        'src/**/*.{ts,tsx}',
        'content/**/*.{json,md}',
        'pages/**/*.{ts,tsx}',
        'app/**/*.{ts,tsx}'
    ]);

    console.log(`Scanning ${files.length} files for image references...`);

    let updatedFiles = 0;
    let totalReplacements = 0;

    const publicDir = path.join(process.cwd(), 'public');

    for (const file of files) {
        let content = fs.readFileSync(file, 'utf8');
        let hasChanges = false;

        // Regex to find image paths: starts with / and ends with extension, possibly inside quotes
        // capturing group 1: quotes
        // capturing group 2: the path
        // capturing group 3: extension
        // unexpected match complexity, let's keep it simple and safe.
        // We look for strings that look like paths ending in image extensions.

        const imagePathRegex = /(['"])([\/][a-zA-Z0-9_.\/-]+)\.(png|jpg|jpeg)(['"])/gi;

        const newContent = content.replace(imagePathRegex, (match, quote1, urlPath, ext, quote2) => {
            // urlPath comes without extension
            // full match is like "/images/foo.png"

            const fullPath = `${urlPath}.${ext}`;
            const webpPath = `${urlPath}.webp`;

            // Check if local file exists
            const localOriginalPath = path.join(publicDir, fullPath);
            const localWebpPath = path.join(publicDir, webpPath);

            if (fs.existsSync(localWebpPath)) {
                // WebP exists, safe to replace
                // console.log(`Found optimized match for ${fullPath} -> ${webpPath}`);
                hasChanges = true;
                totalReplacements++;
                return `${quote1}${webpPath}${quote2}`;
            } else {
                // Only log if it looks like a local file but webp is missing
                // (could be external url, or small file that wasn't optimized)
                // console.log(`No optimization found for ${fullPath} (or file not local)`);
                return match;
            }
        });

        if (hasChanges) {
            fs.writeFileSync(file, newContent, 'utf8');
            console.log(`Updated references in ${file}`);
            updatedFiles++;
        }
    }

    console.log('Reference update complete.');
    console.log(`Updated ${updatedFiles} files.`);
    console.log(`Replaced ${totalReplacements} references.`);
}

updateReferences();
