import sharp from 'sharp';
import { glob } from 'glob';
import path from 'path';
import fs from 'fs';

async function optimizeImages() {
    console.log('Starting image optimization...');

    // Find all PNG and JPG images in public folder
    // Ignoring the public_backup folder if it exists to avoid re-processing
    const images = await glob('public/**/*.{png,jpg,jpeg}', {
        ignore: ['public/public_backup/**']
    });

    console.log(`Found ${images.length} images to check.`);

    let convertedCount = 0;
    let skippedCount = 0;
    let smallCount = 0;

    for (const imagePath of images) {
        try {
            const stats = fs.statSync(imagePath);

            // Skip small images (less than 100KB)
            if (stats.size < 100 * 1024) {
                smallCount++;
                continue;
            }

            const ext = path.extname(imagePath);
            const webpPath = imagePath.replace(ext, '.webp');

            // Skip if WebP already exists and is newer? 
            // For now, let's just overwrite or skip if exists to be safe, 
            // but the goal is to optimize, so let's generate it.

            await sharp(imagePath)
                .webp({ quality: 80 })
                .toFile(webpPath);

            console.log(`Converted: ${imagePath} (${(stats.size / 1024).toFixed(0)}KB) → ${webpPath}`);
            convertedCount++;
        } catch (error) {
            console.error(`Failed to convert ${imagePath}:`, error);
        }
    }

    console.log('Optimization complete.');
    console.log(`Converted: ${convertedCount}`);
    console.log(`Skipped (small < 100KB): ${smallCount}`);
}

optimizeImages();
