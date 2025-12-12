const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '../public'); // Adjust if needed
const OPTIMIZED_DIR = path.join(PUBLIC_DIR, 'optimized');

// List of "Mega Images" to resize (Source files in public)
const MEGA_IMAGES = [
    '60g.png',
    '20g_o.png',
    'three_bags_no_bg.png', // This one has transparency
    'before after.png',
    'catcoco.png',
    'cost effective.png'
];

// List of Science Page images to convert/optimize
const SCIENCE_IMAGES = [
    'happy-cat-fresh-home.png',
    'content-cat-owner.png',
    'science-microscope-research.png',
    'chemistry-lab-testing.png',
    'molecular-structure-pore.png'
];

async function remediate() {
    console.log('Starting Image Remediation...');

    // 1. Resize Mega Images
    console.log('\n--- Resizing Mega Images ---');
    for (const file of MEGA_IMAGES) {
        const inputPath = path.join(PUBLIC_DIR, file);
        if (fs.existsSync(inputPath)) {
            console.log(`Processing ${file}...`);
            try {
                const metadata = await sharp(inputPath).metadata();
                const originalWidth = metadata.width;

                // Resize if larger than 1200w
                if (originalWidth > 1200) {
                    const buffer = await sharp(inputPath)
                        .resize(1200, null, { withoutEnlargement: true })
                        .png({ quality: 80, compressionLevel: 9 }) // High compression
                        .toBuffer();

                    fs.writeFileSync(inputPath, buffer); // Overwrite source !
                    console.log(`✓ Resized ${file} from ${originalWidth}w to 1200w (Overwrote in public/)`);
                } else {
                    console.log(`- ${file} is already ${originalWidth}w (Skipped resize)`);
                }

                // Delete from optimized to force regeneration
                const optimizedPath = path.join(OPTIMIZED_DIR, file);
                if (fs.existsSync(optimizedPath)) {
                    fs.unlinkSync(optimizedPath);
                    console.log(`✓ Deleted ${file} from optimized/ to force regeneration`);
                }

            } catch (err) {
                console.error(`✗ Error processing ${file}:`, err.message);
            }
        } else {
            console.log(`! ${file} not found in public/`);
        }
    }

    // 2. Convert Science Images to WebP
    console.log('\n--- Converting Science Images ---');
    for (const file of SCIENCE_IMAGES) {
        const inputPath = path.join(PUBLIC_DIR, file);
        if (fs.existsSync(inputPath)) {
            console.log(`Processing ${file}...`);
            try {
                const baseName = path.basename(file, path.extname(file));

                // 1. Resize source to max 1200w (overwrite source)
                const metadata = await sharp(inputPath).metadata();
                if (metadata.width > 1200) {
                    const buffer = await sharp(inputPath)
                        .resize(1200, null, { withoutEnlargement: true })
                        .png({ quality: 80, compressionLevel: 9 })
                        .toBuffer();
                    fs.writeFileSync(inputPath, buffer);
                    console.log(`✓ Resized source ${file} to 1200w`);
                }

                // 2. Generate WebP in optimized/
                const webpPath = path.join(OPTIMIZED_DIR, `${baseName}.webp`);
                await sharp(inputPath)
                    .resize(1200, null, { withoutEnlargement: true })
                    .webp({ quality: 80 })
                    .toFile(webpPath);
                console.log(`✓ Generated ${baseName}.webp in optimized/`);

                // 3. Generate AVIF in optimized/
                const avifPath = path.join(OPTIMIZED_DIR, `${baseName}.avif`);
                await sharp(inputPath)
                    .resize(1200, null, { withoutEnlargement: true })
                    .avif({ quality: 80 })
                    .toFile(avifPath);
                console.log(`✓ Generated ${baseName}.avif in optimized/`);

            } catch (err) {
                console.error(`✗ Error processing ${file}:`, err.message);
            }
        } else {
            console.log(`! ${file} not found in public/`);
        }
    }

    console.log('\nRemediation Complete. Please run "npm run optimize-images:enhanced" to regenerate other assets if needed.');
}

remediate();
