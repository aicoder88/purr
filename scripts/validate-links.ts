#!/usr/bin/env node

/**
 * Link Validation Script
 * Scans all pages for broken internal and external links
 */

import * as fs from 'fs';
import * as path from 'path';
import { glob } from 'glob';
import {
  validateExternalLinks,
  validateInternalLinks,
  generateValidationReport,
  extractLinks,
  type LinkValidationResult,
} from '../src/lib/seo/link-validator';

// Known external links to check (social media, partners, etc.)
const PRIORITY_EXTERNAL_LINKS = [
  'https://x.com/PurrifyHQ',
  'https://www.instagram.com/purrifyhq/',
  'https://www.linkedin.com/company/purrify',
  'https://www.tiktok.com/@purrifyhq',
  'https://www.youtube.com/@PurrifyHQ',
];

// Valid internal routes (all existing pages)
const VALID_ROUTES = [
  '/',
  '/free',
  '/contact',
  '/reviews',
  '/case-studies',
  '/stockists',
  
  // Products
  '/products/trial-size',
  '/products/standard',
  '/products/family-pack',
  '/products/compare',
  
  // Learn
  '/learn/how-it-works',
  '/learn/science',
  '/learn/safety',
  '/learn/faq',
  '/learn/cat-litter-guide',
  '/learn/how-to-use-deodorizer',
  '/learn/activated-carbon-benefits',
  '/learn/activated-carbon-vs-baking-soda-deodorizers',
  '/learn/using-deodorizers-with-kittens',
  
  // Solutions
  '/solutions/ammonia-smell-cat-litter',
  '/solutions/apartment-cat-smell-solution',
  '/solutions/litter-box-smell-elimination',
  '/solutions/multiple-cats-odor-control',
  '/solutions/natural-cat-litter-additive',
  '/solutions/senior-cat-litter-solutions',
  
  // Blog
  '/blog',
  '/blog/house-smells-like-cat-litter-solutions',
  '/blog/tried-everything-cat-litter-smell-solutions',
  '/blog/activated-carbon-vs-baking-soda-comparison',
  '/blog/using-deodorizers-with-kittens',
  '/blog/multi-cat-litter-deodorizer-guide',
  '/blog/activated-carbon-litter-additive-benefits',
  '/blog/best-litter-odor-remover-small-apartments',
  '/blog/how-to-use-cat-litter-deodorizer',
  
  // Support
  '/support',
  '/support/contact',
  '/support/shipping',
  
  // Customer
  '/customer/portal',
  '/customer/referrals',
  '/customers/testimonials',
  '/customers/case-studies',
  
  // Support
  '/support/subscription',
  
  // Locations
  '/locations',
  '/locations/montreal',
  '/locations/toronto',
  '/locations/vancouver',
  '/locations/calgary',
  '/locations/ottawa',
  '/locations/province/on',
  '/locations/province/qc',
  '/locations/province/ab',
  '/locations/province/bc',
  '/locations/province/mb',
  '/locations/province/sk',
  '/locations/province/ns',
  '/locations/province/nb',
  '/locations/province/nl',
  '/locations/province/pe',
  
  // B2B & Admin
  '/b2b',
  '/retailer/portal/login',
  '/admin/login',
  '/admin/blog',
  '/admin/blog/new',
  '/admin/blog/analytics',
];

async function scanPageFiles(): Promise<{ internal: string[]; external: string[] }> {
  const allInternal = new Set<string>();
  const allExternal = new Set<string>();
  
  // Scan pages directory
  const pageFiles = await glob('pages/**/*.{tsx,ts,jsx,js}', {
    ignore: ['pages/api/**', 'pages/_*.tsx'],
  });
  
  // Scan components
  const componentFiles = await glob('src/components/**/*.{tsx,ts,jsx,js}');
  
  const allFiles = [...pageFiles, ...componentFiles];
  
  console.log(`Scanning ${allFiles.length} files for links...`);
  
  for (const file of allFiles) {
    const content = fs.readFileSync(file, 'utf-8');
    const links = extractLinks(content);
    
    links.internal.forEach(link => allInternal.add(link));
    links.external.forEach(link => allExternal.add(link));
  }
  
  return {
    internal: Array.from(allInternal),
    external: Array.from(allExternal),
  };
}

async function main() {
  console.log('🔍 Starting link validation...\n');
  
  try {
    // Scan files for links
    const { internal, external } = await scanPageFiles();
    
    console.log(`Found ${internal.length} internal links`);
    console.log(`Found ${external.length} external links\n`);
    
    // Validate internal links
    console.log('Validating internal links...');
    const internalResults = validateInternalLinks(internal, VALID_ROUTES);
    const brokenInternal = internalResults.filter(r => r.status === 'broken');
    
    if (brokenInternal.length > 0) {
      console.log(`❌ Found ${brokenInternal.length} broken internal links:`);
      brokenInternal.forEach(link => {
        console.log(`  - ${link.url}`);
      });
    } else {
      console.log('✅ All internal links are valid');
    }
    
    console.log('\n');
    
    // Validate external links (prioritize social media and partner links)
    console.log('Validating external links...');
    console.log('Checking priority external links first...\n');
    
    const priorityResults = await validateExternalLinks(PRIORITY_EXTERNAL_LINKS);
    const brokenPriority = priorityResults.filter(r => r.status !== 'valid');
    
    if (brokenPriority.length > 0) {
      console.log(`❌ Found ${brokenPriority.length} broken priority links:`);
      brokenPriority.forEach(link => {
        console.log(`  - ${link.url} (${link.statusCode || link.error})`);
      });
    } else {
      console.log('✅ All priority external links are valid');
    }
    
    console.log('\n');
    
    // Validate other external links (sample to avoid overwhelming)
    const otherExternal = external.filter(url => !PRIORITY_EXTERNAL_LINKS.includes(url));
    const sampleSize = Math.min(otherExternal.length, 20);
    const sampleExternal = otherExternal.slice(0, sampleSize);
    
    if (sampleExternal.length > 0) {
      console.log(`Checking sample of ${sampleSize} other external links...`);
      const externalResults = await validateExternalLinks(sampleExternal);
      const brokenExternal = externalResults.filter(r => r.status !== 'valid');
      
      if (brokenExternal.length > 0) {
        console.log(`❌ Found ${brokenExternal.length} broken external links:`);
        brokenExternal.forEach(link => {
          console.log(`  - ${link.url} (${link.statusCode || link.error})`);
        });
      } else {
        console.log('✅ All sampled external links are valid');
      }
    }
    
    // Generate report
    const allResults: LinkValidationResult[] = [
      ...internalResults,
      ...priorityResults,
    ];
    
    const report = generateValidationReport(allResults);
    
    // Ensure reports directory exists
    const reportsDir = path.join(process.cwd(), 'reports');
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, { recursive: true });
    }
    
    // Write report
    const reportPath = path.join(reportsDir, 'broken-links.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    console.log(`\n📊 Report saved to ${reportPath}`);
    console.log(`\nSummary:`);
    console.log(`  Total links checked: ${report.totalLinks}`);
    console.log(`  Valid: ${report.validLinks}`);
    console.log(`  Broken: ${report.brokenLinks}`);
    console.log(`  Errors: ${report.errorLinks}`);
    
    // Exit with error if broken links found
    if (report.brokenLinks > 0 || report.errorLinks > 0) {
      console.log('\n⚠️  Broken or error links detected!');
      process.exit(1);
    }
    
    console.log('\n✅ Link validation complete!');
  } catch (error) {
    console.error('❌ Error during link validation:', error);
    process.exit(1);
  }
}

main();
