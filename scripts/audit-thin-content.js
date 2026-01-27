const fs = require('fs');
const path = require('path');

const blogDir = path.join(process.cwd(), 'content/blog/en');
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.json'));

const results = [];

files.forEach(file => {
    const filePath = path.join(blogDir, file);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    const content = data.content || '';
    const imgCount = (content.match(/<img/g) || []).length;
    const wordCount = content.replace(/<[^>]*>/g, ' ').split(/\s+/).filter(Boolean).length;

    results.push({
        slug: data.slug || file.replace('.json', ''),
        title: data.title,
        wordCount,
        imageCountInContent: imgCount,
        hasFeaturedImage: !!data.featuredImage,
        hasFaq: !!(data.faq || content.includes('faq')),
        hasHowTo: !!(data.howTo || content.includes('Step')),
    });
});

console.log(JSON.stringify(results, null, 2));
