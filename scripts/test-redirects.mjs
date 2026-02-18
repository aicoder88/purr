import { REDIRECTS } from '../config/redirects.js';

async function testRedirects() {
    const tests = [
        { source: '/_ignore_locations/richmond', expected: '/stores/' },
        { source: '/zh/blog/test', expected: '/blog/test' },
        { source: '/es/locations/montreal', expected: '/stores/' },
        { source: '/zh/products/standard/', expected: '/products/standard/' },
        { source: '/es/about', expected: '/about/our-story/' },
    ];

    console.log('--- Redirect Verification ---');

    for (const test of tests) {
        // Note: We can't easily test Next.js server-side redirects in a simple script
        // but we can check if our logic in config/redirects.js matches.
        const match = REDIRECTS.find(r => {
            if (r.source === test.source) return true;
            // Simple regex check for parameter matches
            const regexSource = r.source
                .replace(/:path\*/g, '(.*)')
                .replace(/:path/g, '([^/]+)')
                .replace(/:slug\*/g, '(.*)')
                .replace(/:locale\(zh\|es\)/g, '(zh|es)')
                .replace(/:locale\(fr\)/g, '(fr)');

            const regex = new RegExp(`^${regexSource}$`);
            return regex.test(test.source);
        });

        if (match) {
            console.log(`✅ MATCH: ${test.source} -> ${match.destination}`);
        } else {
            console.log(`❌ FAIL: No match found for ${test.source}`);
        }
    }
}

testRedirects();
