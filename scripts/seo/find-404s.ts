
import * as fs from 'fs';
import * as path from 'path';
import { glob } from 'fast-glob';

// Configuration
const PAGES_DIR = path.join(process.cwd(), 'pages');
const APP_DIR = path.join(process.cwd(), 'app');
const SRC_DIR = path.join(process.cwd(), 'src');

/**
 * Extract all valid routes from pages and app directories
 */
async function getValidRoutes(): Promise<Set<string>> {
    const routes = new Set<string>();

    // 1. Scan pages directory
    if (fs.existsSync(PAGES_DIR)) {
        const pageFiles = await glob('**/*.{tsx,ts,jsx,js}', {
            cwd: PAGES_DIR,
            ignore: ['**/_*.{tsx,ts,jsx,js}', '**/api/**'],
        });

        for (const file of pageFiles) {
            let route = '/' + file
                .replace(/\.(tsx|ts|jsx|js)$/, '')
                .replace(/\/index$/, '')
                .replace(/^index$/, '');

            if (route === '') route = '/';
            routes.add(route);
        }
    }

    // 2. Scan app directory (if exists)
    if (fs.existsSync(APP_DIR)) {
        const appFiles = await glob('**/page.{tsx,ts,jsx,js}', {
            cwd: APP_DIR,
        });

        for (const file of appFiles) {
            let route = '/' + file
                .replace(/\/page\.(tsx|ts|jsx|js)$/, '');

            if (route === '') route = '/';
            routes.add(route);
        }
    }

    return routes;
}

/**
 * Extract links from a file
 */
function extractLinks(content: string): string[] {
    const links: string[] = [];
    // Match href="/..." or href={'/...'}
    const hrefMatches = content.matchAll(/href=["'](\/[^"']*)["']/g);
    for (const match of hrefMatches) {
        links.push(match[1]);
    }

    // Match Link component href prop
    // <Link href="/..." ...>
    // This is covered by above regex usually, but let's be careful with JSX expressions

    return links;
}

/**
 * Check if a route matches a valid route pattern (handling dynamic routes)
 */
function isValidRoute(route: string, validRoutes: Set<string>): boolean {
    // 1. Direct match
    if (validRoutes.has(route)) return true;

    // 2. Localized routes (strip locale)
    const locales = ['/en', '/fr', '/es', '/zh'];
    for (const locale of locales) {
        if (route.startsWith(locale)) {
            const stripped = route.substring(locale.length) || '/';
            if (validRoutes.has(stripped)) return true;
            // Also check dynamic matching for stripped route
            if (matchDynamicRoute(stripped, validRoutes)) return true;
        }
    }

    // 3. Dynamic match
    if (matchDynamicRoute(route, validRoutes)) return true;

    return false;
}

function matchDynamicRoute(route: string, validRoutes: Set<string>): boolean {
    const routeParts = route.split('/').filter(Boolean);

    for (const validRoute of validRoutes) {
        if (!validRoute.includes('[')) continue; // Skip non-dynamic routes

        const validParts = validRoute.split('/').filter(Boolean);
        if (validParts.length !== routeParts.length) continue;

        let match = true;
        for (let i = 0; i < validParts.length; i++) {
            const validPart = validParts[i];
            const routePart = routeParts[i];

            if (validPart.startsWith('[') && validPart.endsWith(']')) {
                // Dynamic segment matches anything
                continue;
            }

            if (validPart !== routePart) {
                match = false;
                break;
            }
        }

        if (match) return true;
    }

    return false;
}

async function main() {
    console.log('🔍 Scanning for 404 links...');

    const validRoutes = await getValidRoutes();
    console.log(`✅ Found ${validRoutes.size} valid routes.`);

    // Files to scan for links
    const scanFiles = await glob('**/*.{tsx,ts,jsx,js}', {
        cwd: SRC_DIR,
        ignore: ['**/*.test.*', '**/*.spec.*', '**/__tests__/**'],
    });

    console.log(`📂 Scanning ${scanFiles.length} files in src/ for links...`);

    let brokenLinksCount = 0;
    const brokenLinksMap = new Map<string, string[]>();

    for (const file of scanFiles) {
        const filePath = path.join(SRC_DIR, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        const links = extractLinks(content);

        for (const link of links) {
            // Ignore external links, anchors, mailto, tel
            if (link.startsWith('http') || link.startsWith('#') || link.startsWith('mailto:') || link.startsWith('tel:')) continue;

            // Remove query params and hash
            const cleanLink = link.split('?')[0].split('#')[0];

            if (!isValidRoute(cleanLink, validRoutes)) {
                // Likely a broken link
                // Check if it's a file in public/ (like images)
                if (cleanLink.match(/\.(png|jpg|jpeg|gif|svg|webp|avif|pdf)$/)) {
                    // Assume it works if it's a file, or check public dir
                    const publicPath = path.join(process.cwd(), 'public', cleanLink);
                    if (fs.existsSync(publicPath)) continue;
                }

                if (!brokenLinksMap.has(cleanLink)) {
                    brokenLinksMap.set(cleanLink, []);
                }
                brokenLinksMap.get(cleanLink)?.push(file);
                brokenLinksCount++;
            }
        }
    }

    console.log('\n❌ Potential Broken Links (404s):');
    for (const [link, files] of brokenLinksMap.entries()) {
        console.log(`\n🔗 ${link}`);
        console.log(`   Found in:`);
        files.slice(0, 5).forEach(f => console.log(`   - src/${f}`));
        if (files.length > 5) console.log(`   ... and ${files.length - 5} more files`);
    }

    console.log(`\nFound ${brokenLinksMap.size} unique broken URLs.`);
}

main().catch(console.error);
