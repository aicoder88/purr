const fs = require('fs');
const path = require('path');

const BLOG_POSTS_PATH = path.join(__dirname, '../src/data/blog-posts.ts');
const CONTENT_DIR = path.join(__dirname, '../content/blog/en');
const PAGES_DIR = path.join(__dirname, '../pages/blog');

function parseBlogPosts() {
    const content = fs.readFileSync(BLOG_POSTS_PATH, 'utf8');
    const posts = [];
    const regex = /{\s*title:[\s\S]*?image:\s*'([^']+)'[\s\S]*?link:\s*'\/blog\/([^']+)'/g;
    let match;
    while ((match = regex.exec(content)) !== null) {
        posts.push({
            image: match[1],
            slug: match[2]
        });
    }
    return posts;
}

function parseTsxImage(slug) {
    const tsxPath = path.join(PAGES_DIR, `${slug}.tsx`);
    if (!fs.existsSync(tsxPath)) return null;

    const content = fs.readFileSync(tsxPath, 'utf8');
    // Look for const heroImage = '...'
    const match = content.match(/const heroImage = '([^']+)';/);
    if (match) return match[1];

    // Fallback: look for hardcoded img src if no constant
    // strict matching might be hard, but let's try finding the main Image component src
    // <Image src="..." ... />
    // This is less reliable so maybe just stick to the constant for now as per the pattern seen.
    return null;
}

function audit() {
    console.log('Starting Blog Consistency Audit...\n');
    const posts = parseBlogPosts();
    console.log(`Registry contains ${posts.length} posts.`);

    let discrepancies = 0;
    const results = [];

    posts.forEach(post => {
        const jsonPath = path.join(CONTENT_DIR, `${post.slug}.json`);
        const tsxPath = path.join(PAGES_DIR, `${post.slug}.tsx`);

        let jsonImage = 'MISSING_FILE';
        let tsxImage = 'NO_STATIC_PAGE'; // default if no static page

        // Check JSON
        if (fs.existsSync(jsonPath)) {
            try {
                const jsonContent = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
                jsonImage = jsonContent.featuredImage?.url || 'MISSING_FIELD';
            } catch (e) {
                jsonImage = 'JSON_ERROR';
            }
        }

        // Check TSX
        if (fs.existsSync(tsxPath)) {
            tsxImage = parseTsxImage(post.slug) || 'NOT_FOUND_IN_TSX';
        }

        const issues = [];

        // Compare Registry vs JSON
        if (jsonImage !== 'MISSING_FILE' && jsonImage !== 'JSON_ERROR' && jsonImage !== post.image) {
            issues.push(`Registry vs JSON: '${post.image}' vs '${jsonImage}'`);
        }

        // Compare Registry vs TSX (only if TSX exists and image was found)
        if (tsxImage !== 'NO_STATIC_PAGE' && tsxImage !== 'NOT_FOUND_IN_TSX' && tsxImage !== post.image) {
            issues.push(`Registry vs TSX: '${post.image}' vs '${tsxImage}'`);
        }

        // Compare JSON vs TSX (only if both exist)
        if (jsonImage !== 'MISSING_FILE' && tsxImage !== 'NO_STATIC_PAGE' && tsxImage !== 'NOT_FOUND_IN_TSX' && jsonImage !== tsxImage) {
            // This might be redundant if both match registry, but good to check if they match each other but not registry
            if (!issues.some(i => i.includes('Registry vs'))) {
                issues.push(`JSON vs TSX: '${jsonImage}' vs '${tsxImage}'`);
            }
        }

        if (issues.length > 0) {
            discrepancies++;
            results.push({
                slug: post.slug,
                issues
            });
        }
    });

    if (results.length === 0) {
        console.log('\n✅ No inconsistencies found!');
    } else {
        console.log(`\n❌ Found ${discrepancies} posts with inconsistencies:\n`);
        results.forEach(r => {
            console.log(`Slug: ${r.slug}`);
            r.issues.forEach(i => console.log(`  - ${i}`));
            console.log('');
        });
    }
}

audit();
