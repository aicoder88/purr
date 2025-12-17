const { chromium } = require('playwright');
const PDFDocument = require('pdfkit');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();

  console.log('Navigating to pitch deck...');
  await page.goto('https://www.purrify.ca/dialergptpitchdeck', {
    waitUntil: 'networkidle',
    timeout: 60000
  });

  console.log('Waiting for initial load...');
  await page.waitForTimeout(3000);

  // Go to first slide
  await page.keyboard.press('Home');
  await page.waitForTimeout(1000);

  const slideCount = 19;
  const screenshots = [];

  console.log(`Capturing ${slideCount} slides as images...`);

  for (let i = 0; i < slideCount; i++) {
    console.log(`Capturing slide ${i + 1}/${slideCount}...`);
    await page.waitForTimeout(1500); // Wait for animations

    const screenshot = await page.screenshot({
      fullPage: false,
      type: 'png'
    });

    screenshots.push(screenshot);

    if (i < slideCount - 1) {
      await page.keyboard.press('ArrowRight');
    }
  }

  console.log('Creating PDF from screenshots...');

  const doc = new PDFDocument({
    size: [1920, 1080],
    margin: 0,
    autoFirstPage: false
  });

  doc.pipe(fs.createWriteStream('dialergptdeck.pdf'));

  for (let i = 0; i < screenshots.length; i++) {
    console.log(`Adding slide ${i + 1}/${slideCount} to PDF...`);
    doc.addPage({ size: [1920, 1080], margin: 0 });
    doc.image(screenshots[i], 0, 0, {
      width: 1920,
      height: 1080
    });
  }

  doc.end();

  console.log('PDF generation complete!');
  console.log(`Saved ${slideCount} slides to dialergptdeck.pdf`);

  await browser.close();
})();
