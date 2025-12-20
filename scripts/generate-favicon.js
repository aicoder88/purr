const sharp = require('sharp');
const fs = require('node:fs');
const path = require('node:path');

const inputFile = path.join(__dirname, '../public/purrify-dark-mode-logo.png');
const outputDir = path.join(__dirname, '../public/images');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

async function generateFavicons() {
    console.log('Generating favicons from dark mode logo...');

    const sizes = [
        { size: 16, name: 'favicon.png' },
        { size: 32, name: 'icon-32.png' },
        { size: 64, name: 'icon-64.png' },
        { size: 128, name: 'icon-128.png' },
        { size: 180, name: 'apple-touch-icon.png' },
    ];

    for (const { size, name } of sizes) {
        const outputPath = path.join(outputDir, name);

        await sharp(inputFile)
            .resize(size, size, {
                fit: 'contain',
                background: { r: 0, g: 0, b: 0, alpha: 0 }
            })
            .png()
            .toFile(outputPath);

        console.log(`✓ Generated ${name} (${size}x${size})`);
    }

    // Also copy to public root for favicon.png
    const rootFaviconPath = path.join(__dirname, '../public/favicon.png');
    await sharp(inputFile)
        .resize(32, 32, {
            fit: 'contain',
            background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .png()
        .toFile(rootFaviconPath);

    console.log(`✓ Generated favicon.png in public root (32x32)`);

    console.log('\n✅ All favicons generated successfully!');
}

generateFavicons().catch(err => {
    console.error('Error generating favicons:', err);
    process.exit(1);
});
