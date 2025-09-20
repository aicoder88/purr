import { test, expect, Page } from '@playwright/test';

test.describe('Retailers Page Comprehensive Testing', () => {
  let page: Page;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    // Set default viewport for desktop testing
    await page.setViewportSize({ width: 1280, height: 720 });
  });

  test('1. Page Load & Performance Analysis', async () => {
    console.log('🚀 Starting Page Load & Performance Analysis...');

    // Measure page load time
    const startTime = Date.now();
    await page.goto('http://localhost:3005/retailers');
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;

    console.log(`⏱️ Page load time: ${loadTime}ms`);

    // Check that page loads successfully
    await expect(page).toHaveTitle(/.*[Rr]etailer.*|.*[Pp]artner.*|.*[Ww]holesale.*/);

    // Check essential elements are present
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();

    console.log('✅ Page loads successfully with core elements');

    // Test responsive breakpoints
    const breakpoints = [
      { width: 375, height: 667, name: 'Mobile' },
      { width: 768, height: 1024, name: 'Tablet' },
      { width: 1024, height: 768, name: 'Desktop Small' },
      { width: 1440, height: 900, name: 'Desktop Large' }
    ];

    for (const breakpoint of breakpoints) {
      await page.setViewportSize({ width: breakpoint.width, height: breakpoint.height });
      await page.waitForTimeout(500); // Allow for responsive adjustments

      // Verify layout doesn't break
      const isScrollable = await page.evaluate(() => {
        return document.body.scrollHeight > window.innerHeight;
      });

      console.log(`📱 ${breakpoint.name} (${breakpoint.width}x${breakpoint.height}): Layout ${isScrollable ? 'scrollable' : 'fits viewport'}`);
    }

    // Reset to desktop for remaining tests
    await page.setViewportSize({ width: 1280, height: 720 });
  });

  test('2. Conversion Elements Analysis', async () => {
    console.log('🎯 Starting Conversion Elements Analysis...');

    await page.goto('http://localhost:3005/retailers');
    await page.waitForLoadState('networkidle');

    // Look for main hero CTA
    const heroCTA = page.locator('button, a').filter({ hasText: /start.*partnership|partner.*today|get.*started|apply.*now/i }).first();
    if (await heroCTA.count() > 0) {
      await expect(heroCTA).toBeVisible();
      console.log('✅ Hero CTA found and visible');

      // Test hover effect
      await heroCTA.hover();
      await page.waitForTimeout(300);
      console.log('✅ Hero CTA hover effect tested');
    } else {
      console.log('⚠️ No hero CTA with expected text found');
    }

    // Look for pricing section CTAs
    const pricingCTAs = page.locator('button, a').filter({ hasText: /contact.*sales|get.*quote|request.*pricing|learn.*more/i });
    const pricingCTACount = await pricingCTAs.count();
    console.log(`📊 Found ${pricingCTACount} pricing-related CTAs`);

    // Look for contact form submission button
    const formSubmitButton = page.locator('button[type="submit"], input[type="submit"]');
    if (await formSubmitButton.count() > 0) {
      await expect(formSubmitButton.first()).toBeVisible();
      console.log('✅ Form submission button found and visible');
    }

    // Count all CTAs
    const allCTAs = page.locator('button:visible, a[href]:visible').filter({ hasText: /.+/ });
    const ctaCount = await allCTAs.count();
    console.log(`🔗 Total interactive CTAs found: ${ctaCount}`);

    // Test CTA accessibility
    for (let i = 0; i < Math.min(ctaCount, 5); i++) {
      const cta = allCTAs.nth(i);
      const ctaText = await cta.textContent();

      // Check if CTA has proper attributes
      const hasRole = await cta.getAttribute('role');
      const hasAriaLabel = await cta.getAttribute('aria-label');
      const tagName = await cta.evaluate(el => el.tagName.toLowerCase());

      console.log(`🔍 CTA "${ctaText?.slice(0, 30)}...": ${tagName}${hasRole ? ` role="${hasRole}"` : ''}${hasAriaLabel ? ` aria-label` : ''}`);
    }
  });

  test('3. Visual Design Assessment', async () => {
    console.log('🎨 Starting Visual Design Assessment...');

    await page.goto('http://localhost:3005/retailers');
    await page.waitForLoadState('networkidle');

    // Take screenshot of hero section
    const heroSection = page.locator('main').first();
    await heroSection.screenshot({ path: '/Users/macpro/dev/purrsite/test-screenshots/retailers-hero.png' });
    console.log('📸 Hero section screenshot saved');

    // Take full page screenshot
    await page.screenshot({ path: '/Users/macpro/dev/purrsite/test-screenshots/retailers-full-page.png', fullPage: true });
    console.log('📸 Full page screenshot saved');

    // Check for gradients and animations
    const elementsWithGradient = page.locator('[class*="gradient"], [style*="gradient"]');
    const gradientCount = await elementsWithGradient.count();
    console.log(`🌈 Found ${gradientCount} elements with gradients`);

    // Check color contrast by examining text elements
    const textElements = page.locator('h1, h2, h3, p, span').filter({ hasText: /.+/ });
    const textCount = await textElements.count();
    console.log(`📝 Found ${textCount} text elements for contrast analysis`);

    // Sample a few text elements for color analysis
    for (let i = 0; i < Math.min(textCount, 5); i++) {
      const element = textElements.nth(i);
      const styles = await element.evaluate(el => {
        const computed = window.getComputedStyle(el);
        return {
          color: computed.color,
          backgroundColor: computed.backgroundColor,
          fontSize: computed.fontSize,
          fontWeight: computed.fontWeight
        };
      });

      const text = await element.textContent();
      console.log(`🎨 Text "${text?.slice(0, 30)}...": ${styles.color} on ${styles.backgroundColor}`);
    }

    // Check for dark mode toggle or theme indicators
    const themeElements = page.locator('[class*="dark"], [data-theme], [class*="theme"]');
    const themeCount = await themeElements.count();
    console.log(`🌙 Found ${themeCount} theme-related elements`);
  });

  test('4. Content & Messaging Analysis', async () => {
    console.log('📝 Starting Content & Messaging Analysis...');

    await page.goto('http://localhost:3005/retailers');
    await page.waitForLoadState('networkidle');

    const pageContent = await page.textContent('body');

    // Check for profit margin mentions
    const profitMarginMentions = pageContent?.match(/\d+%.*profit|profit.*\d+%|margin.*\d+%/gi) || [];
    console.log(`💰 Profit margin mentions: ${profitMarginMentions.length > 0 ? profitMarginMentions.join(', ') : 'None found'}`);

    // Check for partner/retailer count
    const partnerCounts = pageContent?.match(/\d+\+?\s*(?:partners?|retailers?|stores?)/gi) || [];
    console.log(`🤝 Partner count mentions: ${partnerCounts.length > 0 ? partnerCounts.join(', ') : 'None found'}`);

    // Check for urgency elements
    const urgencyTerms = ['24.*hour', 'fast.*approval', 'quick.*start', 'immediate', 'instant', 'same.*day'];
    const urgencyMentions = urgencyTerms.filter(term => new RegExp(term, 'i').test(pageContent || ''));
    console.log(`⚡ Urgency elements: ${urgencyMentions.length > 0 ? urgencyMentions.join(', ') : 'None found'}`);

    // Check for social proof elements
    const socialProofTerms = ['testimonial', 'review', 'success.*story', 'case.*study', 'trusted.*by'];
    const socialProofMentions = socialProofTerms.filter(term => new RegExp(term, 'i').test(pageContent || ''));
    console.log(`🏆 Social proof elements: ${socialProofMentions.length > 0 ? socialProofMentions.join(', ') : 'None found'}`);

    // Check headline effectiveness
    const headlines = await page.locator('h1, h2').allTextContents();
    console.log('📢 Key headlines found:');
    headlines.forEach((headline, index) => {
      console.log(`  ${index + 1}. "${headline}"`);
    });

    // Look for conversion-focused language
    const conversionTerms = ['start.*partnership', 'join.*program', 'become.*partner', 'apply.*now', 'get.*started'];
    const conversionMentions = conversionTerms.filter(term => new RegExp(term, 'i').test(pageContent || ''));
    console.log(`🎯 Conversion language: ${conversionMentions.length > 0 ? conversionMentions.join(', ') : 'None found'}`);
  });

  test('5. Form Functionality Testing', async () => {
    console.log('📋 Starting Form Functionality Testing...');

    await page.goto('http://localhost:3005/retailers');
    await page.waitForLoadState('networkidle');

    // Look for forms
    const forms = page.locator('form');
    const formCount = await forms.count();
    console.log(`📝 Found ${formCount} forms on the page`);

    if (formCount > 0) {
      const form = forms.first();

      // Find input fields
      const inputs = form.locator('input, textarea, select');
      const inputCount = await inputs.count();
      console.log(`🔤 Form has ${inputCount} input fields`);

      // Test form fields
      for (let i = 0; i < inputCount; i++) {
        const input = inputs.nth(i);
        const inputType = await input.getAttribute('type') || 'text';
        const inputName = await input.getAttribute('name') || `field-${i}`;
        const isRequired = await input.getAttribute('required') !== null;

        console.log(`  📝 Field ${i + 1}: ${inputName} (${inputType})${isRequired ? ' *required' : ''}`);

        // Test basic interaction
        if (inputType !== 'submit' && inputType !== 'button') {
          await input.click();

          // Test validation by trying to submit empty required fields
          if (isRequired && inputType === 'email') {
            await input.fill('invalid-email');
            await input.blur();
            await page.waitForTimeout(100);

            // Clear and test again
            await input.fill('');
            await input.blur();
            await page.waitForTimeout(100);
          } else if (isRequired) {
            await input.fill('test value');
            await input.blur();
            await page.waitForTimeout(100);
            await input.fill('');
            await input.blur();
            await page.waitForTimeout(100);
          }
        }
      }

      // Look for submit button
      const submitButton = form.locator('button[type="submit"], input[type="submit"]');
      if (await submitButton.count() > 0) {
        await expect(submitButton.first()).toBeVisible();
        console.log('✅ Submit button found and visible');

        // Test submit button styles and states
        const submitText = await submitButton.first().textContent();
        console.log(`🔘 Submit button text: "${submitText}"`);
      }
    } else {
      console.log('⚠️ No forms found on the page');
    }
  });

  test('6. Accessibility & Usability Testing', async () => {
    console.log('♿ Starting Accessibility & Usability Testing...');

    await page.goto('http://localhost:3005/retailers');
    await page.waitForLoadState('networkidle');

    // Test keyboard navigation
    console.log('⌨️ Testing keyboard navigation...');

    // Find all focusable elements
    const focusableElements = page.locator('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
    const focusableCount = await focusableElements.count();
    console.log(`🎯 Found ${focusableCount} focusable elements`);

    // Test tab navigation through first few elements
    const maxTabTests = Math.min(focusableCount, 8);
    for (let i = 0; i < maxTabTests; i++) {
      await page.keyboard.press('Tab');
      await page.waitForTimeout(100);

      const focusedElement = page.locator(':focus');
      if (await focusedElement.count() > 0) {
        const tagName = await focusedElement.evaluate(el => el.tagName.toLowerCase());
        const textContent = await focusedElement.textContent();
        console.log(`  Tab ${i + 1}: ${tagName} - "${textContent?.slice(0, 30)}..."`);
      }
    }

    // Check for alt text on images
    const images = page.locator('img');
    const imageCount = await images.count();
    console.log(`🖼️ Found ${imageCount} images`);

    for (let i = 0; i < Math.min(imageCount, 5); i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      const src = await img.getAttribute('src');
      console.log(`  Image ${i + 1}: ${src?.slice(0, 30)}... alt="${alt || 'MISSING'}"`);
    }

    // Check for proper heading hierarchy
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').allTextContents();
    console.log('📋 Heading hierarchy:');
    const headingElements = page.locator('h1, h2, h3, h4, h5, h6');
    const headingCount = await headingElements.count();

    for (let i = 0; i < headingCount; i++) {
      const heading = headingElements.nth(i);
      const tagName = await heading.evaluate(el => el.tagName.toLowerCase());
      const text = await heading.textContent();
      console.log(`  ${tagName.toUpperCase()}: "${text}"`);
    }

    // Check for ARIA labels and roles
    const ariaElements = page.locator('[aria-label], [aria-labelledby], [role]');
    const ariaCount = await ariaElements.count();
    console.log(`🔍 Found ${ariaCount} elements with ARIA attributes`);
  });

  test('7. Mobile Responsiveness Testing', async () => {
    console.log('📱 Starting Mobile Responsiveness Testing...');

    // Test on mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('http://localhost:3005/retailers');
    await page.waitForLoadState('networkidle');

    // Take mobile screenshot
    await page.screenshot({ path: '/Users/macpro/dev/purrsite/test-screenshots/retailers-mobile.png', fullPage: true });
    console.log('📸 Mobile screenshot saved');

    // Check touch target sizes
    const buttons = page.locator('button, a[href]');
    const buttonCount = await buttons.count();
    console.log(`👆 Testing ${buttonCount} touch targets...`);

    for (let i = 0; i < Math.min(buttonCount, 10); i++) {
      const button = buttons.nth(i);
      const boundingBox = await button.boundingBox();

      if (boundingBox) {
        const { width, height } = boundingBox;
        const isAdequateSize = width >= 44 && height >= 44;
        const buttonText = await button.textContent();

        console.log(`  Touch target ${i + 1}: ${width.toFixed(0)}×${height.toFixed(0)}px ${isAdequateSize ? '✅' : '⚠️'} - "${buttonText?.slice(0, 20)}..."`);
      }
    }

    // Check for horizontal scrolling (should not occur)
    const hasHorizontalScroll = await page.evaluate(() => {
      return document.body.scrollWidth > window.innerWidth;
    });

    if (hasHorizontalScroll) {
      console.log('⚠️ Horizontal scrolling detected on mobile');
    } else {
      console.log('✅ No horizontal scrolling on mobile');
    }

    // Test mobile navigation if present
    const mobileMenuToggle = page.locator('[class*="menu"], [class*="burger"], [class*="hamburger"]').first();
    if (await mobileMenuToggle.count() > 0) {
      console.log('📱 Mobile menu toggle found');
      await mobileMenuToggle.click();
      await page.waitForTimeout(500);

      // Check if menu opened
      const visibleNavItems = page.locator('nav a:visible, [class*="menu"] a:visible');
      const navItemCount = await visibleNavItems.count();
      console.log(`  📱 Mobile menu shows ${navItemCount} navigation items`);
    }

    // Reset viewport
    await page.setViewportSize({ width: 1280, height: 720 });
  });

  test('8. Performance Metrics Collection', async () => {
    console.log('⚡ Starting Performance Metrics Collection...');

    // Enable performance metrics
    await page.goto('http://localhost:3005/retailers');

    // Get performance metrics
    const performanceMetrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const paint = performance.getEntriesByType('paint');

      return {
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
        firstPaint: paint.find(p => p.name === 'first-paint')?.startTime || 0,
        firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0,
        domInteractive: navigation.domInteractive - navigation.navigationStart,
        domComplete: navigation.domComplete - navigation.navigationStart
      };
    });

    console.log('📊 Performance Metrics:');
    console.log(`  DOM Content Loaded: ${performanceMetrics.domContentLoaded.toFixed(2)}ms`);
    console.log(`  Load Complete: ${performanceMetrics.loadComplete.toFixed(2)}ms`);
    console.log(`  First Paint: ${performanceMetrics.firstPaint.toFixed(2)}ms`);
    console.log(`  First Contentful Paint: ${performanceMetrics.firstContentfulPaint.toFixed(2)}ms`);
    console.log(`  DOM Interactive: ${performanceMetrics.domInteractive.toFixed(2)}ms`);
    console.log(`  DOM Complete: ${performanceMetrics.domComplete.toFixed(2)}ms`);

    // Check for console errors
    const logs: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        logs.push(`Console Error: ${msg.text()}`);
      }
    });

    await page.reload();
    await page.waitForLoadState('networkidle');

    if (logs.length > 0) {
      console.log('❌ Console Errors Found:');
      logs.forEach(log => console.log(`  ${log}`));
    } else {
      console.log('✅ No console errors found');
    }
  });
});