const fs = require('fs');
const path = require('path');

const BLOG_POSTS_PATH = path.join(__dirname, '../src/data/blog-posts.ts');
const CONTENT_DIR = path.join(__dirname, '../content/blog/en');

function parseBlogPosts() {
    const content = fs.readFileSync(BLOG_POSTS_PATH, 'utf8');
    const posts = [];

    // Simple regex to basic extraction - assuming standard formatting
    // Looking for objects with link and image properties
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

function audit() {
    const posts = parseBlogPosts();
    console.log(`Found ${posts.length} posts in registry.`);

    let discrepancies = 0;

    posts.forEach(post => {
        const jsonPath = path.join(CONTENT_DIR, `${post.slug}.json`);

        if (!fs.existsSync(jsonPath)) {
            console.warn(`[MISSING] JSON file not found for slug: ${post.slug}`);
            return;
        }

        try {
            const jsonContent = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
            const jsonImage = jsonContent.featuredImage?.url;
            const ogImage = jsonContent.seo?.ogImage;

            let hasIssue = false;
            const issues = [];

            if (jsonImage !== post.image) {
                hasIssue = true;
                issues.push(`featuredImage mismatch: registry=${post.image}, json=${jsonImage}`);
            }

            if (ogImage !== post.image) {
                hasIssue = true;
                issues.push(`ogImage mismatch: registry=${post.image}, json=${ogImage}`);
            }

            if (hasIssue) {
                console.log(`[MISMATCH] ${post.slug}`);
                issues.forEach(issue => console.log(`  - ${issue}`));
                discrepancies++;
            }

        } catch (e) {
            console.error(`Error parsing JSON for ${post.slug}:`, e.message);
        }
    });

    console.log('\nAudit complete.');
    console.log(`Total discrepancies found: ${discrepancies}`);
}

audit();
