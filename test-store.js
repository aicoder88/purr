
const { ContentStore } = require('./src/lib/blog/content-store');

async function test() {
    const store = new ContentStore();
    const slug = 'best-cat-litter-for-smell';
    const post = await store.getPost(slug, 'en');

    if (post) {
        console.log(`FOUND: ${slug}`);
        console.log(`Title: ${post.title}`);
    } else {
        console.log(`NOT FOUND: ${slug}`);
    }
}

test().catch(console.error);
