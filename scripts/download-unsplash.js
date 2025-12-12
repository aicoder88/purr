const https = require('https');
const fs = require('fs');
const path = require('path');

const TARGET_DIR = path.join(__dirname, '../public/original-images');
const PUBLIC_DIR = path.join(__dirname, '../public'); // Fallback if regular script picks from here

// Ensure directories exist
if (!fs.existsSync(TARGET_DIR)) {
    fs.mkdirSync(TARGET_DIR, { recursive: true });
}

const IMAGES = [
    {
        name: 'standard-hero.jpg',
        url: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=1600&q=80'
    },
    {
        name: 'standard-happy-cat.jpg',
        url: 'https://images.unsplash.com/photo-1472491235688-bdc81a63246e?auto=format&fit=crop&w=1600&q=80'
    },
    {
        name: 'standard-solution.jpg',
        url: 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?auto=format&fit=crop&w=1600&q=80'
    }
];

async function downloadImage(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            if (response.statusCode !== 200) {
                return reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => { });
            reject(err);
        });
    });
}

async function run() {
    console.log('Downloading Unsplash images...');
    for (const img of IMAGES) {
        // We save to PUBLIC_DIR so the optimize script picks them up
        const dest = path.join(PUBLIC_DIR, img.name);
        try {
            console.log(`Downloading ${img.name}...`);
            await downloadImage(img.url, dest);
            console.log(`✓ Saved to ${dest}`);
        } catch (err) {
            console.error(`✗ Error downloading ${img.name}:`, err.message);
        }
    }
    console.log('Download complete. Run optimization script next.');
}

run();
