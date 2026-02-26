const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const files = [
    'cat-litter-box-apartment-miyazaki',
    'happy-cat-clean-litter-miyazaki',
    'molecular-odor-trapping-miyazaki'
];

async function optimize() {
    const baseDir = path.join(__dirname, '..');
    const outDir = path.join(baseDir, 'public/optimized/blog');
    if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir, { recursive: true });
    }

    for (const name of files) {
        const src = path.join(baseDir, `public/images/${name}.jpg`);
        const dst = path.join(outDir, `${name}-828w.webp`);

        console.log(`Optimizing ${name}...`);
        await sharp(src)
            .resize(828, null, { withoutEnlargement: true })
            .webp({ quality: 80, effort: 6 })
            .toFile(dst);

        console.log(`Created ${dst}`);
    }
}

optimize().catch(console.error);
