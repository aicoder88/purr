const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const files = [
    '17g-transparent.png',
    '60g-transparent.png',
    '140g-transparent.png'
];

const srcDir = path.join(process.cwd(), 'public/images/products');
const outDir = path.join(process.cwd(), 'public/optimized');

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

async function optimize() {
    for (const file of files) {
        const input = path.join(srcDir, file);
        if (!fs.existsSync(input)) {
            console.log(`Missing ${input}`);
            continue;
        }

        // Create webp
        await sharp(input)
            .webp({ quality: 80 })
            .toFile(path.join(outDir, file.replace(/\.(png|webp)$/, '.webp')));

        console.log(`Optimized ${file}`);
    }
}

optimize();
