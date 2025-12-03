const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const INPUT_FILE = path.join(__dirname, '../public/purrify text round logo.png');

// Define all outputs
const OUTPUTS = [
    { path: '../public/social-logo.png', width: 400, height: 400 },
    { path: '../public/favicon.png', width: 32, height: 32 },
    { path: '../public/images/favicon.png', width: 32, height: 32 },
    { path: '../public/images/icon-32.png', width: 32, height: 32 },
    { path: '../public/images/icon-64.png', width: 64, height: 64 },
    { path: '../public/images/icon-128.png', width: 128, height: 128 },
    { path: '../public/images/apple-touch-icon.png', width: 180, height: 180 }
];

async function generateLogos() {
    try {
        console.log('Generating logos from:', INPUT_FILE);

        // Ensure public/images exists
        const imagesDir = path.join(__dirname, '../public/images');
        if (!fs.existsSync(imagesDir)) {
            await fs.promises.mkdir(imagesDir, { recursive: true });
        }

        // Since the input is already the desired "round logo", we just resize it.
        // We use sharp to resize for each target.

        for (const output of OUTPUTS) {
            const outputPath = path.join(__dirname, output.path);

            await sharp(INPUT_FILE)
                .resize(output.width, output.height)
                .png()
                .toFile(outputPath);

            console.log(`Created ${outputPath} (${output.width}x${output.height})`);
        }

        console.log('Done!');

    } catch (error) {
        console.error('Error generating logos:', error);
        process.exit(1);
    }
}

generateLogos();
