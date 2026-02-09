#!/usr/bin/env node

/**
 * Scrape Google People Also Ask using Playwright
 * 
 * ⚠️  WARNING: This violates Google's Terms of Service.
 * ⚠️  Google actively blocks automation and may CAPTCHA or ban IPs.
 * ⚠️  Use residential proxies and anti-detection measures.
 * ⚠️  For educational purposes only.
 * 
 * RECOMMENDED: Use AlsoAsked API or Answer Socrates instead (see README.md)
 * 
 * Usage:
 *   node scrape-paa-playwright.js "cat litter odor control"
 * 
 * Requirements:
 *   npm install playwright
 *   npx playwright install chromium
 * 
 * Optional (for proxies):
 *   npm install proxy-chain
 */

const { chromium } = require('playwright');
const fs = require('fs');

// Anti-detection measures
const USER_AGENTS = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0',
];

const VIEWPORTS = [
  { width: 1920, height: 1080 },
  { width: 1366, height: 768 },
  { width: 1440, height: 900 },
];

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function scrapePAA(query, options = {}) {
  const {
    depth = 2,        // How many levels of PAA to click
    maxQuestions = 20,
    proxy = null,     // 'http://user:pass@proxy:port'
  } = options;

  console.log(`🔍 Searching: "${query}"`);
  console.log(`📊 Max depth: ${depth}, Max questions: ${maxQuestions}\n`);

  const browserOptions = {
    headless: false, // Set to true for production, false to see browser
    args: [
      '--disable-blink-features=AutomationControlled',
      '--disable-web-security',
      '--disable-features=IsolateOrigins,site-per-process',
    ],
  };

  if (proxy) {
    browserOptions.proxy = { server: proxy };
  }

  const browser = await chromium.launch(browserOptions);
  
  const context = await browser.newContext({
    userAgent: USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)],
    viewport: VIEWPORTS[Math.floor(Math.random() * VIEWPORTS.length)],
    locale: 'en-US',
    timezoneId: 'America/New_York',
    permissions: ['geolocation'],
    geolocation: { latitude: 40.7128, longitude: -74.0060 }, // NYC
  });

  // Hide automation indicators
  await context.addInitScript(() => {
    Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
    Object.defineProperty(navigator, 'plugins', { get: () => [1, 2, 3, 4, 5] });
    Object.defineProperty(navigator, 'languages', { get: () => ['en-US', 'en'] });
    window.chrome = { runtime: {} };
  });

  const page = await context.newPage();

  try {
    // Navigate to Google
    await page.goto('https://www.google.com', { waitUntil: 'networkidle' });
    
    // Handle cookie consent if present
    try {
      const consentButton = await page.$('button:has-text("Reject all")');
      if (consentButton) {
        await consentButton.click();
        await sleep(1000);
      }
    } catch (e) {
      // No consent dialog
    }

    // Search
    await page.fill('textarea[name="q"]', query);
    await page.press('textarea[name="q"]', 'Enter');
    await page.waitForLoadState('networkidle');

    // Wait for results
    await page.waitForSelector('#search', { timeout: 10000 });
    await sleep(2000 + Math.random() * 2000); // Random delay

    const allQuestions = new Map(); // Use Map to dedupe
    let currentDepth = 0;

    async function extractVisiblePAA() {
      const paaData = await page.evaluate(() => {
        const questions = [];
        const paaElements = document.querySelectorAll('[data-attrid="wa:/description"]');
        
        paaElements.forEach(el => {
          const questionEl = el.closest('[data-related-question]');
          if (questionEl) {
            const question = questionEl.querySelector('[role="button"]')?.textContent?.trim();
            const answer = el.textContent?.trim();
            if (question && !questions.find(q => q.question === question)) {
              questions.push({ question, answer: answer?.substring(0, 200) });
            }
          }
        });

        // Alternative selector
        if (questions.length === 0) {
          document.querySelectorAll('div[jsname="Cpkphb"]').forEach(el => {
            const question = el.querySelector('div[role="button"] span')?.textContent?.trim();
            if (question && !questions.find(q => q.question === question)) {
              questions.push({ question, answer: '' });
            }
          });
        }

        return questions;
      });

      return paaData;
    }

    async function clickExpandableQuestions() {
      const buttons = await page.$$('[role="button"][aria-expanded="false"]');
      
      for (const button of buttons.slice(0, 3)) { // Click first 3
        try {
          await button.click();
          await sleep(1000 + Math.random() * 1000);
        } catch (e) {
          // Button might not be clickable
        }
      }
    }

    // Main extraction loop
    while (currentDepth < depth && allQuestions.size < maxQuestions) {
      console.log(`\n📍 Depth ${currentDepth + 1}/${depth}`);
      
      // Extract visible questions
      const questions = await extractVisiblePAA();
      
      for (const q of questions) {
        if (!allQuestions.has(q.question)) {
          allQuestions.set(q.question, q);
          console.log(`  ✅ ${q.question}`);
        }
      }

      // Click to expand more
      if (currentDepth < depth - 1) {
        await clickExpandableQuestions();
      }

      currentDepth++;
      await sleep(1500 + Math.random() * 1500);
    }

    await browser.close();

    const results = Array.from(allQuestions.values());
    console.log(`\n✅ Found ${results.length} unique questions`);
    
    return results;

  } catch (error) {
    console.error('❌ Error:', error.message);
    await browser.close();
    throw error;
  }
}

async function main() {
  const query = process.argv[2];

  if (!query) {
    console.log('⚠️  WARNING: This tool violates Google\'s Terms of Service.');
    console.log('⚠️  Your IP may be blocked or CAPTCHA'd.\n');
    console.log('RECOMMENDED: Use AlsoAsked API or Answer Socrates instead.\n');
    console.log('Usage: node scrape-paa-playwright.js "your search query"');
    console.log('\nOptions:');
    console.log('  --depth=3        How many levels to click (default: 2)');
    console.log('  --max=50         Max questions to collect (default: 20)');
    console.log('  --proxy=URL      Use proxy (http://user:pass@host:port)');
    process.exit(0);
  }

  // Parse options
  const depth = process.argv.find(arg => arg.startsWith('--depth='))?.split('=')[1] || 2;
  const max = process.argv.find(arg => arg.startsWith('--max='))?.split('=')[1] || 20;
  const proxy = process.argv.find(arg => arg.startsWith('--proxy='))?.split('=')[1];

  try {
    const results = await scrapePAA(query, {
      depth: parseInt(depth),
      maxQuestions: parseInt(max),
      proxy,
    });

    // Save results
    const outputFile = `paa-${query.replace(/\s+/g, '-').toLowerCase()}.json`;
    fs.writeFileSync(outputFile, JSON.stringify(results, null, 2));
    
    console.log(`\n📁 Saved to: ${outputFile}`);
    console.log('\nNext steps:');
    console.log('  1. Convert to CSV: questions.csv');
    console.log('  2. Run: node generate-answers.js questions.csv');
    console.log('  3. Run: node bulk-page-generator.js questions-answers.json');

  } catch (error) {
    console.error('\n❌ Scraping failed:', error.message);
    console.log('\n💡 Troubleshooting:');
    console.log('   - Google may have detected automation');
    console.log('   - Try using residential proxies (--proxy=)');
    console.log('   - Try Again with longer delays (edit sleep values)');
    console.log('   - Consider using AlsoAsked API instead (more reliable)');
    process.exit(1);
  }
}

main();
