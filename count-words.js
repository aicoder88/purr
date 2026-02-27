const fs = require('fs');

const html = fs.readFileSync('temp-blog-body.html', 'utf-8');
const text = html.replace(/<[^>]*>?/gm, '');
const words = text.trim().split(/\s+/).length;

console.log(`Word count: ${words}`);
