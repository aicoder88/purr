
const fs = require('fs');
const path = require('path');

const contentDir = path.join(process.cwd(), 'content', 'blog', 'en');
const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.json'));

const posts = files.map(file => {
    const content = fs.readFileSync(path.join(contentDir, file), 'utf-8');
    return JSON.parse(content);
});

// Sort by publishDate descending
posts.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());

const PAGE_SIZE = 15;
const page = 3;
const startIndex = (page - 1) * PAGE_SIZE;
const endIndex = startIndex + PAGE_SIZE;

const page3Posts = posts.slice(startIndex, endIndex);

console.log('Page 3 posts:', page3Posts.length);
page3Posts.forEach(post => {
    console.log('Slug:', post.slug);
    console.log('Featured:', post.featuredImage?.url);
    const contentImages = (post.content.match(/<img[^>]+src="([^">]+)"/g) || [])
        .map(img => img.match(/src="([^">]+)"/)[1]);
    console.log('Images:', JSON.stringify(contentImages));
    console.log('---');
});
