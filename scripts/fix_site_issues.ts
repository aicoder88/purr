import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

const CONTENT_DIR = path.join(process.cwd(), 'content/blog/en');
const PUBLIC_DIR = path.join(process.cwd(), 'public');

async function fix() {
    const files = await glob(path.join(CONTENT_DIR, '*.json'));
    console.log(`Scanning ${files.length} files for fixes...`);

    for (const file of files) {
        let content = fs.readFileSync(file, 'utf-8');
        let json = JSON.parse(content);
        let modified = false;

        // Fix 1: Specific Slug Update
        if (json.slug === 'how-to-get-rid-of-cat-pee-smell-apartment') {
            console.log(`Fixing slug for ${path.basename(file)}`);
            json.slug = 'how-to-get-rid-of-cat-pee-smell-apartment';
            modified = true;
        }

        // Fix 2: Image Extensions
        // We look for image references in content string and try to find a matching file
        // with a different extension in public/optimized or public/images

        // We will use a replace with callback to handle this
        const imgRegex = /src="([^"]+)"/g;

        // We need to replace in the stringified JSON content field, BUT we should parse it first
        // actually we already parsed 'json'. 'json.content' is the HTML string.

        const manualMappings: Record<string, string> = {
            // Renaming fixes
            '/optimized/active-carbon-macro-obsidian.png': '/optimized/activated-carbon-macro-obsidian.webp',
            '/optimized/active-carbon-macro-obsidian.webp': '/optimized/activated-carbon-macro-obsidian.webp',
            '/optimized/fresh-home-panorama-ghibli.png': '/optimized/fresh-home-cat-panorama.webp',

            // Missing /images/ mappings to optimized equivalents
            '/images/apartment-cat-litter-smell.jpg': '/optimized/apartment-hero.webp',
            '/images/small-space-litter-box-setup.jpg': '/optimized/apartment-odor-control-small-space-ghibli.webp',
            '/images/apartment-cat-fresh-home.jpg': '/optimized/apartment-fresh-cat-ghibli.webp',

            '/images/cat-litter-change-frequency.jpg': '/optimized/frequency-hero-ghibli.webp',
            '/images/multi-cat-litter-schedule.jpg': '/optimized/frequency-chart.png',
            '/images/extend-litter-freshness.jpg': '/optimized/fresh-cat-nap-ghibli.webp',

            '/images/unscented-cat-litter-options.jpg': '/optimized/sensitive-cat-no-scent-ghibli.webp',
            '/images/fragrance-free-litter-deodorizer.jpg': '/optimized/safe-cat-litter.webp',
            '/images/sensitive-cat-unscented-litter.jpg': '/optimized/sensitive-cat-no-scent-ghibli.webp',

            '/images/self-cleaning-litter-box-comparison.jpg': '/optimized/litter-types-comparison-ghibli.webp',
            '/images/litter-robot-odor-upgrade.jpg': '/optimized/litter-box-hero.webp', // corrected fallback
            '/optimized/modern-litter-box.webp': '/optimized/litter-box-hero.webp', // fix previous run error
            '/images/automatic-litter-box-fresh-home.jpg': '/optimized/fresh-home-hero-ghibli.webp',
            '/images/cat-using-automatic-litter-box.jpg': '/optimized/cat-using-covered-litter-box.webp',

            '/images/litter-box-location-airflow.jpg': '/optimized/ventilation.webp',
            '/images/litter-box-placement-home.jpg': '/optimized/placement.webp',
            '/images/apartment-litter-box-solutions.jpg': '/optimized/apartment-hero.webp',
            '/images/litter-box-odour-solutions.jpg': '/optimized/regular_size_solution.webp',

            '/images/cat-litter-smell-comparison.jpg': '/optimized/litter-types-comparison-ghibli.webp',
            '/images/activated-carbon-litter-odour.jpg': '/optimized/activated-carbon-benefits.webp',
            '/images/multi-cat-litter-odour-control.jpg': '/optimized/multi-cat-deodorizer.webp',
            '/images/cat-litter-natural-odour-control.jpg': '/optimized/natural-cat-litter.webp'
        };

        if (json.content) {
            let newContent = json.content;

            // Apply manual mappings first
            for (const [oldSrc, newSrc] of Object.entries(manualMappings)) {
                if (newContent.includes(oldSrc)) {
                    console.log(`Applying manual mapping: ${oldSrc} -> ${newSrc}`);
                    newContent = newContent.replaceAll(oldSrc, newSrc);
                    modified = true; // Mark as modified if any manual mapping is applied
                }
            }

            // Find all src attributes
            // basic regex approach
            const replies: Map<string, string> = new Map();
            let match;
            while ((match = imgRegex.exec(newContent)) !== null) {
                const originalSrc = match[1];
                if (originalSrc.startsWith('http')) continue;

                const fullPath = path.join(PUBLIC_DIR, originalSrc.replace(/^\//, ''));
                if (!fs.existsSync(fullPath)) {
                    // File missing. Look for alternatives.
                    const dir = path.dirname(fullPath);
                    const ext = path.extname(fullPath);
                    const name = path.basename(fullPath, ext);

                    // Check optimized folder first if not already there
                    const searchPaths = [
                        dir,
                        path.join(PUBLIC_DIR, 'optimized'),
                        path.join(PUBLIC_DIR, 'images')
                    ];

                    const extensions = ['.webp', '.avif', '.jpg', '.png', '.jpeg'];

                    let found = false;
                    for (const searchDir of searchPaths) {
                        for (const tryExt of extensions) {
                            const tryPath = path.join(searchDir, name + tryExt);
                            if (fs.existsSync(tryPath)) {
                                // Found it!
                                // Construct new URL
                                const relative = path.relative(PUBLIC_DIR, tryPath);
                                const newUrl = '/' + relative; // ensure leading slash
                                replies.set(originalSrc, newUrl);
                                found = true;
                                console.log(`Found replacement for ${originalSrc} -> ${newUrl}`);
                                break;
                            }
                        }
                        if (found) break;
                    }
                }
            }

            // Apply replacements
            for (const [oldSrc, newSrc] of replies) {
                // simplistic replaceAll
                newContent = newContent.replaceAll(oldSrc, newSrc);
            }

            if (newContent !== json.content) {
                json.content = newContent;
                modified = true;
            }
        }

        // Also check featuredImage
        if (json.featuredImage?.url) {
            const originalSrc = json.featuredImage.url;
            const fullPath = path.join(PUBLIC_DIR, originalSrc.replace(/^\//, ''));
            if (!fs.existsSync(fullPath)) {
                // Same logic
                const name = path.basename(fullPath, path.extname(fullPath));
                const extensions = ['.webp', '.avif', '.jpg', '.png'];
                for (const ext of extensions) {
                    // only checking same dir + optimized dir for featured image to be safe
                    const tryPaths = [
                        path.join(path.dirname(fullPath), name + ext),
                        path.join(PUBLIC_DIR, 'optimized', name + ext)
                    ];
                    for (const p of tryPaths) {
                        if (fs.existsSync(p)) {
                            const newUrl = '/' + path.relative(PUBLIC_DIR, p);
                            json.featuredImage.url = newUrl;
                            console.log(`Fixed FeaturedImage: ${originalSrc} -> ${newUrl}`);
                            modified = true;
                        }
                    }
                    if (modified) break;
                }
            }
        }

        if (modified) {
            fs.writeFileSync(file, JSON.stringify(json, null, 2));
            console.log(`Updated ${path.basename(file)}`);
        }
    }
}

fix();
