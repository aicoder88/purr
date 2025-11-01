const { chromium } = require('playwright');

(async () => {
  console.log('🚀 Starting Comprehensive Retailers Page Analysis...\n');

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Set default viewport
  await page.setViewportSize({ width: 1280, height: 720 });

  try {
    // 1. Page Load & Performance Analysis
    console.log('=== 1. PAGE LOAD & PERFORMANCE ===');
    const startTime = Date.now();
    await page.goto('http://localhost:3005/retailers');
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;

    console.log(`⏱️ Page load time: ${loadTime}ms`);

    // Check title
    const title = await page.title();
    console.log(`📄 Page title: "${title}"`);

    // Test responsive breakpoints
    console.log('\n📱 Testing responsive breakpoints:');
    const breakpoints = [
      { width: 375, height: 667, name: 'Mobile' },
      { width: 768, height: 1024, name: 'Tablet' },
      { width: 1024, height: 768, name: 'Desktop Small' },
      { width: 1440, height: 900, name: 'Desktop Large' }
    ];

    for (const breakpoint of breakpoints) {
      await page.setViewportSize({ width: breakpoint.width, height: breakpoint.height });
      await page.waitForTimeout(500);

      const isScrollable = await page.evaluate(() => {
        return document.body.scrollHeight > window.innerHeight;
      });

      console.log(`  ${breakpoint.name} (${breakpoint.width}x${breakpoint.height}): Layout ${isScrollable ? 'scrollable' : 'fits viewport'}`);
    }

    await page.setViewportSize({ width: 1280, height: 720 });

    // 2. Conversion Elements Analysis
    console.log('\n=== 2. CONVERSION ELEMENTS ===');

    // Find all CTAs
    const ctaSelectors = [
      'button:visible',
      'a[href]:visible',
      '[role="button"]:visible'
    ];

    let totalCTAs = 0;
    for (const selector of ctaSelectors) {
      const elements = await page.locator(selector).count();
      totalCTAs += elements;
    }
    console.log(`🔗 Total CTAs found: ${totalCTAs}`);

    // Look for specific conversion elements
    const conversionElements = [
      { pattern: /start.*partnership|partner.*today|get.*started|apply.*now/i, name: 'Hero CTA' },
      { pattern: /contact.*sales|get.*quote|request.*pricing/i, name: 'Pricing CTA' },
      { pattern: /submit|send|apply/i, name: 'Form Submit' }
    ];

    for (const element of conversionElements) {
      const found = await page.locator('button, a').filter({ hasText: element.pattern }).count();
      console.log(`  ${element.name}: ${found > 0 ? '✅ Found' : '❌ Not found'} (${found} instances)`);
    }

    // 3. Visual Design Assessment
    console.log('\n=== 3. VISUAL DESIGN ===');

    // Take screenshots
    await page.screenshot({ path: '/Users/macpro/dev/purrsite/test-screenshots/retailers-full-page.png', fullPage: true });
    console.log('📸 Full page screenshot saved');

    // Check for gradients
    const gradientElements = await page.locator('[class*="gradient"], [style*="gradient"]').count();
    console.log(`🌈 Elements with gradients: ${gradientElements}`);

    // Analyze text elements
    const headings = await page.locator('h1, h2, h3').allTextContents();
    console.log('📋 Main headings found:');
    headings.forEach((heading, index) => {
      console.log(`  H${index + 1}: "${heading}"`);
    });

    // 4. Content & Messaging Analysis
    console.log('\n=== 4. CONTENT & MESSAGING ===');

    const pageContent = await page.textContent('body');

    // Check for profit margin mentions
    const profitMarginMentions = pageContent.match(/\d+%.*profit|profit.*\d+%|margin.*\d+%/gi) || [];
    console.log(`💰 Profit margin mentions: ${profitMarginMentions.length > 0 ? profitMarginMentions.join(', ') : 'None found'}`);

    // Check for partner counts
    const partnerCounts = pageContent.match(/\d+\+?\s*(?:partners?|retailers?|stores?)/gi) || [];
    console.log(`🤝 Partner count mentions: ${partnerCounts.length > 0 ? partnerCounts.join(', ') : 'None found'}`);

    // Check for urgency elements
    const urgencyTerms = ['24.*hour', 'fast.*approval', 'quick.*start', 'immediate', 'instant', 'same.*day'];
    const urgencyMentions = urgencyTerms.filter(term => new RegExp(term, 'i').test(pageContent));
    console.log(`⚡ Urgency elements: ${urgencyMentions.length > 0 ? urgencyMentions.join(', ') : 'None found'}`);

    // 5. Form Functionality
    console.log('\n=== 5. FORM FUNCTIONALITY ===');

    const forms = await page.locator('form').count();
    console.log(`📝 Forms found: ${forms}`);

    if (forms > 0) {
      const inputs = await page.locator('form input, form textarea, form select').count();
      console.log(`🔤 Total form fields: ${inputs}`);

      // Check for required fields
      const requiredFields = await page.locator('form [required]').count();
      console.log(`✅ Required fields: ${requiredFields}`);

      // Check for submit button
      const submitButtons = await page.locator('form button[type="submit"], form input[type="submit"]').count();
      console.log(`🔘 Submit buttons: ${submitButtons}`);
    }

    // 6. Accessibility Analysis
    console.log('\n=== 6. ACCESSIBILITY ===');

    // Check images for alt text
    const images = await page.locator('img').count();
    let imagesWithAlt = 0;

    for (let i = 0; i < images; i++) {
      const alt = await page.locator('img').nth(i).getAttribute('alt');
      if (alt && alt.trim() !== '') {
        imagesWithAlt++;
      }
    }

    console.log(`🖼️ Images: ${images} total, ${imagesWithAlt} with alt text (${Math.round(imagesWithAlt/images*100)}%)`);

    // Check heading hierarchy
    const h1Count = await page.locator('h1').count();
    const h2Count = await page.locator('h2').count();
    const h3Count = await page.locator('h3').count();
    console.log(`📋 Heading structure: ${h1Count} H1, ${h2Count} H2, ${h3Count} H3`);

    // 7. Mobile Responsiveness
    console.log('\n=== 7. MOBILE RESPONSIVENESS ===');

    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(1000);

    // Take mobile screenshot
    await page.screenshot({ path: '/Users/macpro/dev/purrsite/test-screenshots/retailers-mobile.png', fullPage: true });
    console.log('📸 Mobile screenshot saved');

    // Check for horizontal scroll
    const hasHorizontalScroll = await page.evaluate(() => {
      return document.body.scrollWidth > window.innerWidth;
    });

    console.log(`📱 Horizontal scroll: ${hasHorizontalScroll ? '❌ Present' : '✅ None'}`);

    // Check touch target sizes
    const buttons = await page.locator('button:visible, a[href]:visible').all();
    let adequateTouchTargets = 0;

    for (let i = 0; i < Math.min(buttons.length, 10); i++) {
      const boundingBox = await buttons[i].boundingBox();
      if (boundingBox && boundingBox.width >= 44 && boundingBox.height >= 44) {
        adequateTouchTargets++;
      }
    }

    const touchTargetPercentage = Math.round(adequateTouchTargets / Math.min(buttons.length, 10) * 100);
    console.log(`👆 Touch targets: ${adequateTouchTargets}/${Math.min(buttons.length, 10)} adequate (${touchTargetPercentage}%)`);

    // 8. Performance Metrics
    console.log('\n=== 8. PERFORMANCE METRICS ===');

    await page.goto('http://localhost:3005/retailers');
    await page.waitForLoadState('networkidle');

    const performanceMetrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0];
      const paint = performance.getEntriesByType('paint');

      return {
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
        firstPaint: paint.find(p => p.name === 'first-paint')?.startTime || 0,
        firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0,
        resourceCount: performance.getEntriesByType('resource').length
      };
    });

    console.log(`⚡ DOM Content Loaded: ${performanceMetrics.domContentLoaded.toFixed(2)}ms`);
    console.log(`⚡ Load Complete: ${performanceMetrics.loadComplete.toFixed(2)}ms`);
    console.log(`⚡ First Paint: ${performanceMetrics.firstPaint.toFixed(2)}ms`);
    console.log(`⚡ First Contentful Paint: ${performanceMetrics.firstContentfulPaint.toFixed(2)}ms`);
    console.log(`📦 Resources loaded: ${performanceMetrics.resourceCount}`);

    console.log('\n🎉 Analysis Complete! Check test-screenshots/ for visual captures.');

  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await browser.close();
  }
})();