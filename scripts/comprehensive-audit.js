const fs = require('fs');
const path = require('path');

const BLOG_POSTS_PATH = path.join(__dirname, '../src/data/blog-posts.ts');
const CONTENT_DIR = path.join(__dirname, '../content/blog/en');

function parseBlogPosts() {
    const content = fs.readFileSync(BLOG_POSTS_PATH, 'utf8');
    const posts = [];

    // Regex to extract title, image, and slug (link)
    const regex = /{\s*title:\s*'([^']+)'[\s\S]*?image:\s*'([^']+)'[\s\S]*?link:\s*'\/blog\/([^']+)'/g;

    let match;
    while ((match = regex.exec(content)) !== null) {
        posts.push({
            title: match[1],
            registryImage: match[2],
            slug: match[3]
        });
    }
    return posts;
}

function countWords(html) {
    if (!html) return 0;
    // Strip HTML tags
    const text = html.replace(/<[^>]*>/g, ' ');
    // Split by whitespace and filter empty strings
    return text.split(/\s+/).filter(word => word.length > 0).length;
}

function audit() {
    const posts = parseBlogPosts();
    console.log(`Found ${posts.length} posts in registry.\n`);

    const results = [];

    posts.forEach(post => {
        const jsonPath = path.join(CONTENT_DIR, `${post.slug}.json`);
        let wordCount = 0;
        let jsonImage = 'MISSING_FILE';
        let ogImage = 'MISSING_FILE';
        let fileExists = false;
        let notes = [];

        if (fs.existsSync(jsonPath)) {
            fileExists = true;
            try {
                const jsonContent = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
                jsonImage = jsonContent.featuredImage?.url || 'MISSING_FIELD';
                ogImage = jsonContent.seo?.ogImage || 'MISSING_FIELD';
                wordCount = countWords(jsonContent.content || '');

                // Count images in content (looking for img tags or markdown images)
                // Note: Content might be HTML or Markdown. The regex attempts to catch both standard HTML img tags and Markdown ![]() syntax if present.
                // It also looks for our custom component usage if detectable, but sticking to standard patterns first.
                const imgTagCount = (jsonContent.content.match(/<img[^>]+>/g) || []).length;
                // Assuming images might also be passed as specific fields or components we can't easily grep without more context, 
                // but standard HTML content usually has <img>. 
                // If the user uses a specific component like <Image />, we should look for that too.
                const componentImgCount = (jsonContent.content.match(/<(?:Image|img|Picture)[^>]*>/g) || []).length;
                const totalImages = Math.max(imgTagCount, componentImgCount);

                const wordsPerImage = totalImages > 0 ? Math.round(wordCount / totalImages) : wordCount;

                if (jsonImage !== post.registryImage) {
                    notes.push(`Image Mismatch (Reg: ${post.registryImage}, JSON: ${jsonImage})`);
                }
                if (ogImage !== post.registryImage && ogImage !== 'MISSING_FIELD') {
                    notes.push(`OG Image Mismatch`);
                }
                if (wordCount < 800) {
                    notes.push(`Thin Content (<800 words)`);
                }
                if (wordCount > 300 && totalImages === 0) {
                    notes.push(`No Images in Content`);
                } else if (totalImages > 0 && wordsPerImage > 400) {
                    notes.push(`Low Image Freq (~1/${wordsPerImage}w)`);
                }
            } catch (e) {
                notes.push(`JSON Parse Error`);
            }
        } else {
            notes.push(`JSON File Missing`);
        }

        results.push({
            slug: post.slug,
            wordCount,
            imageStatus: notes.length === 0 ? 'OK' : 'NEEDS_ATTENTION',
            registryImage: post.registryImage,
            notes: notes.join('; ')
        });
    });

    // Output readable table
    console.log('Slug | Words | Images | Status | Notes');
    console.log('---|---|---|---|---');
    results.forEach(r => {
        console.log(`${r.slug} | ${r.wordCount} | ${r.imageStatus} | ${r.notes}`);
    });
}

audit();
