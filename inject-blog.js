const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, 'content/blog/en/activated-carbon-for-cat-litter-complete-guide.json');
const htmlPath = path.join(__dirname, 'temp-blog-body.html');

const post = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
const newContent = fs.readFileSync(htmlPath, 'utf-8');

post.content = newContent;
post.readingTime = 15;

fs.writeFileSync(jsonPath, JSON.stringify(post, null, 2), 'utf-8');
console.log('Successfully injected new HTML content into ' + jsonPath);
