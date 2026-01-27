const fs = require('fs');
const path = require('path');

const BLOG_POSTS_PATH = path.join(__dirname, '../src/data/blog-posts.ts');
const CONTENT_DIR = path.join(__dirname, '../content/blog/en');

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

function fix() {
    const posts = parseBlogPosts();
    let fixedCount = 0;

    posts.forEach(post => {
        const jsonPath = path.join(CONTENT_DIR, `${post.slug}.json`);

        if (!fs.existsSync(jsonPath)) {
            console.log(`[SKIP] File not found: ${post.slug}`);
            return;
        }

        try {
            let contentRaw = fs.readFileSync(jsonPath, 'utf8');
            const jsonContent = JSON.parse(contentRaw);
            let modified = false;

            // Update featuredImage
            if (jsonContent.featuredImage && jsonContent.featuredImage.url !== post.image) {
                console.log(`[FIX] ${post.slug}: featuredImage ${jsonContent.featuredImage.url} -> ${post.image}`);
                jsonContent.featuredImage.url = post.image;
                modified = true;
            }

            // Update ogImage
            if (jsonContent.seo && jsonContent.seo.ogImage !== post.image) {
                console.log(`[FIX] ${post.slug}: ogImage ${jsonContent.seo.ogImage} -> ${post.image}`);
                jsonContent.seo.ogImage = post.image;
                modified = true;
            }

            if (modified) {
                // We use string replacement to preserve indentation if possible, but JSON.stringify is safer for correctness
                // To preserve as much formatting as possible, we'll try to use the formatted stringify
                fs.writeFileSync(jsonPath, JSON.stringify(jsonContent, null, 2));
                fixedCount++;
            }

        } catch (e) {
            console.error(`Error fixing ${post.slug}:`, e.message);
        }
    });

    console.log(`\nFixed ${fixedCount} files.`);
}

fix();
