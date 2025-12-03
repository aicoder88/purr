const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputFile = path.join(__dirname, '../public/purrify-dark-mode-logo.png');
const outputDir = path.join(__dirname, '../public/images');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

async function generateManifestIcons() {
    console.log('Generating manifest icons from dark mode logo...');

    const sizes = [
        { size: 192, name: 'icon-192.png' },
        { size: 512, name: 'icon-512.png' },
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

    console.log('\n✅ All manifest icons generated successfully!');
}

generateManifestIcons().catch(err => {
    console.error('Error generating manifest icons:', err);
    process.exit(1);
});
