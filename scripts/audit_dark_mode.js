const puppeteer = require('puppeteer');
const fs = require('fs');

const URLs = [
    '/',
    '/case-studies/',
    '/products/',
    '/products/standard/',
    '/blog/',
    '/learn/',
    '/learn/how-it-works/',
    '/learn/faq/',
    '/support/',
    '/about/our-story/',
    '/stores/',
    '/b2b/',
];

const BASE_URL = 'http://localhost:3000';

async function checkPage(url) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    const fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`;

    console.log(`Checking ${fullUrl}...`);

    try {
        await page.goto(fullUrl, { waitUntil: 'networkidle0' });

        // Switch to dark mode
        await page.evaluate(() => {
            localStorage.setItem('purrify-ui-theme', 'dark');
            document.documentElement.classList.add('dark');
        });

        // Wait a bit for transitions
        await new Promise(r => setTimeout(r, 500));

        const issues = await page.evaluate(() => {
            const results = [];

            function getLuminance(rgb) {
                const [r, g, b] = rgb.match(/\d+/g).map(Number).map(v => {
                    v /= 255;
                    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
                });
                return 0.2126 * r + 0.7152 * g + 0.0722 * b;
            }

            function getContrast(l1, l2) {
                const brightest = Math.max(l1, l2);
                const darkest = Math.min(l1, l2);
                return (brightest + 0.05) / (darkest + 0.05);
            }

            const elements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, a, div');
            elements.forEach(el => {
                const style = window.getComputedStyle(el);
                if (el.innerText && el.innerText.trim().length > 0 && style.display !== 'none' && style.visibility !== 'hidden' && parseFloat(style.opacity) > 0) {
                    const color = style.color;
                    const bgColor = style.backgroundColor;

                    // Recursive function to find actual background color
                    let actualBgColor = bgColor;
                    let parent = el.parentElement;
                    while (actualBgColor === 'rgba(0, 0, 0, 0)' || actualBgColor === 'transparent') {
                        if (!parent) break;
                        actualBgColor = window.getComputedStyle(parent).backgroundColor;
                        parent = parent.parentElement;
                    }

                    if (actualBgColor && actualBgColor !== 'rgba(0, 0, 0, 0)') {
                        const l1 = getLuminance(color);
                        const l2 = getLuminance(actualBgColor);
                        const contrast = getContrast(l1, l2);

                        if (contrast < 3) { // Threshold for "broken" contrast (WCAG AA is 4.5:1, but 3:1 is a good start for "hard to read")
                            results.push({
                                tag: el.tagName,
                                text: el.innerText.substring(0, 50),
                                color,
                                bgColor: actualBgColor,
                                contrast: contrast.toFixed(2),
                                selector: getSelector(el)
                            });
                        }
                    }
                }
            });

            function getSelector(el) {
                if (el.id) return `#${el.id}`;
                if (el.className) return `.${el.className.split(' ').join('.')}`;
                return el.tagName.toLowerCase();
            }

            return results;
        });

        await browser.close();
        return { url, issues };
    } catch (e) {
        console.error(`Error checking ${url}: ${e.message}`);
        await browser.close();
        return { url, error: e.message };
    }
}

async function run() {
    const report = [];
    for (const url of URLs) {
        const result = await checkPage(url);
        report.push(result);
    }

    fs.writeFileSync('dark_mode_audit_report.json', JSON.stringify(report, null, 2));
    console.log('Audit complete. Results saved to dark_mode_audit_report.json');
}

run();
