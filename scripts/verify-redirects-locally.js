const { REDIRECTS } = require('../config/redirects');

const TEST_CASES = [
    { path: '/products/standard', expectedDest: '/products/' }, // Alias should consolidate to products hub
    { path: '/products/family-pack', expectedDest: '/products/' }, // Alias should consolidate to products hub
    { path: '/products/trial-size', expectedDest: null }, // Canonical page should remain indexable
    { path: '/es/opiniones', expectedDest: '/products/' }, // Specific ES route should bypass /es/:path* catchall
    { path: '/retailers', expectedDest: null }, // Should NOT match any rule
    { path: '/blog/how-to-eliminate-cat-litter-odor', expectedDest: null }, // Should NOT match (removed self-loop)
];

function verify() {
    console.log('Verifying redirects...\n');
    let errors = 0;

    // 1. Check for self-loops
    console.log('Checking for self-referencing loops...');
    REDIRECTS.forEach(r => {
        // Naively check if source == destination (ignoring some regex complexity for now)
        // Most problematic ones were exact matches or simple appends
        if (r.source === r.destination) {
            console.error(`❌ Self-loop detected: ${r.source} -> ${r.destination}`);
            errors++;
        }
        // Check for "source + /" == destination
        if (r.source + '/' === r.destination) {
            // This is the specific 308 loop pattern with trailingSlash: true
            // BUT, only if it's NOT a regex.
            if (!r.source.includes(':') && !r.source.includes('(')) {
                console.error(`❌ Trailing slash loop detected: ${r.source} -> ${r.destination}`);
                errors++;
            }
        }
    });

    if (errors === 0) console.log('✅ No obvious self-loops found.\n');

    // 2. Check specific test cases
    console.log('Checking specific routes...');
    TEST_CASES.forEach(({ path, expectedDest }) => {
        const match = REDIRECTS.find(r => r.source === path);
        if (expectedDest === null) {
            if (match) {
                console.error(`❌ ${path} should NOT match any rule, but matched: ${match.source} -> ${match.destination}`);
                errors++;
            } else {
                console.log(`✅ ${path} matches no rules (as expected).`);
            }
        } else {
            if (!match) {
                console.error(`❌ ${path} did NOT match any rule. Expected: ${expectedDest}`);
                errors++;
            } else if (match.destination !== expectedDest) {
                console.error(`❌ ${path} matched wrong destination. Got: ${match.destination}, Expected: ${expectedDest}`);
                errors++;
            } else {
                console.log(`✅ ${path} -> ${expectedDest}`);
            }
        }
    });

    console.log('\nVerification complete.');
    if (errors > 0) {
        console.error(`Found ${errors} errors.`);
        process.exit(1);
    } else {
        console.log('All checks passed!');
    }
}

verify();
