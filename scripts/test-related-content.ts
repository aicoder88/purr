
import { getRelatedPages } from '../src/lib/seo/topic-clusters';

const orphanUrl = '/blog/non-existent-cluster-page';
const related = getRelatedPages(orphanUrl, 3);

console.log('--- Related Pages for Orphan URL ---');
console.log(JSON.stringify(related, null, 2));

if (related.length === 3) {
    console.log('SUCCESS: Fallback logic working, returned 3 posts.');
} else {
    console.log(`FAILURE: Expected 3 posts, got ${related.length}.`);
    process.exit(1);
}
