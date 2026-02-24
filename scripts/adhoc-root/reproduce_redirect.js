const urlsToTest = [
    // Original issue
    "https://www.purrify.ca/blog/how-to-eliminate-cat-litter-odor",

    // Product pages (should redirect to /products/)
    "https://www.purrify.ca/products/standard",
    "https://www.purrify.ca/products/family-pack",
    "https://www.purrify.ca/products/trial-size",

    // Retailers (should be 200 OK)
    "https://www.purrify.ca/retailers",
];

async function checkUrl(url) {
    console.log(`\nTesting: ${url}`);
    try {
        const response = await fetch(url, { redirect: 'manual' });
        console.log(`Status: ${response.status}`);
        console.log(`Location: ${response.headers.get('location')}`);

        if (response.status >= 300 && response.status < 400) {
            const nextUrl = new URL(response.headers.get('location'), url).href;
            console.log(`-> Redirects to: ${nextUrl}`);
            // Follow one hop to see where it goes
            const nextResponse = await fetch(nextUrl, { redirect: 'manual' });
            console.log(`   Next Status: ${nextResponse.status}`);
            console.log(`   Next Location: ${nextResponse.headers.get('location')}`);
        }
    } catch (error) {
        console.error(`Error fetching ${url}:`, error.message);
    }
}

async function runTests() {
    for (const url of urlsToTest) {
        await checkUrl(url);
    }
}

runTests();
