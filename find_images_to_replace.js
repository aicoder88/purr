
const fs = require('fs');
const path = require('path');

const contentDir = path.join(process.cwd(), 'content', 'blog', 'en');
const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.json'));

const posts = files.map(file => path.join(contentDir, file))
    .map(filePath => {
        const content = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(content);
    });

// Sort by publishDate descending
posts.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());

const PAGE_SIZE = 15;
const page = 3;
const startIndex = (page - 1) * PAGE_SIZE;
const endIndex = startIndex + PAGE_SIZE;

const page3Posts = posts.slice(startIndex, endIndex);

const uniqueImages = new Set();
const imagesToProcess = [];

page3Posts.forEach(post => {
    const images = [];
    if (post.featuredImage?.url) images.push(post.featuredImage.url);

    const contentImages = (post.content.match(/<img[^>]+src="([^">]+)"/g) || [])
        .map(img => img.match(/src="([^">]+)"/)[1]);
    images.push(...contentImages);

    images.forEach(imgUrl => {
        if (uniqueImages.has(imgUrl)) return;
        uniqueImages.add(imgUrl);

        const filename = path.basename(imgUrl);
        const lowerName = filename.toLowerCase();

        // Exclude criteria for replacement
        if (lowerName.includes('ghibli')) return;
        // if (lowerName.includes('purrify')) return; // Allow purrify if it's generic, but safer to skip product shots
        if (lowerName.includes('bag')) return;
        if (lowerName.includes('bottle')) return;
        if (lowerName.includes('spray')) return;
        if (lowerName.includes('logo')) return;
        if (lowerName.includes('icon')) return;
        if (lowerName.includes('avatar')) return;
        if (lowerName.includes('testimonial')) return;

        imagesToProcess.push({
            postSlug: post.slug,
            imagePath: imgUrl,
            filename: filename
        });
    });
});
console.log(JSON.stringify(imagesToProcess, null, 2));
