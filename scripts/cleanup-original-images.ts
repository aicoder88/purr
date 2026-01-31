import { glob } from 'glob';
import fs from 'fs';
import path from 'path';


async function cleanupImages() {
    console.log('Starting image cleanup...');

    const originalImages = await glob('public/**/*.{png,jpg,jpeg}', {
        ignore: ['public/public_backup/**']
    });

    console.log(`Found ${originalImages.length} images to check for cleanup.`);

    let movedCount = 0;
    let keptCount = 0;

    const backupBaseDir = path.join(process.cwd(), 'public_backup');

    // Ensure backup dir exists
    if (!fs.existsSync(backupBaseDir)) {
        fs.mkdirSync(backupBaseDir);
    }

    for (const imagePath of originalImages) {
        const ext = path.extname(imagePath);
        const webpPath = imagePath.replace(ext, '.webp');

        if (fs.existsSync(webpPath)) {
            // WebP exists, safe to move original

            // Calculate destination path
            // imagePath is like "public/images/foo.png"
            // we want "public_backup/images/foo.png"
            // so we replace "public/" with "public_backup/" at the start

            const relativePath = path.relative('public', imagePath);
            const backupPath = path.join(backupBaseDir, relativePath);
            const backupDir = path.dirname(backupPath);

            // Ensure directory exists
            if (!fs.existsSync(backupDir)) {
                fs.mkdirSync(backupDir, { recursive: true });
            }

            // Move file
            fs.renameSync(imagePath, backupPath);
            // console.log(`Moved ${imagePath} -> ${backupPath}`);
            movedCount++;
        } else {
            // console.log(`Kept ${imagePath} (no WebP equivalent)`);
            keptCount++;
        }
    }

    console.log('Cleanup complete.');
    console.log(`Moved to backup: ${movedCount}`);
    console.log(`Kept in public: ${keptCount}`);
}

cleanupImages();
