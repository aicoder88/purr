/**
 * Script to extract translation namespaces from full translation files
 * 
 * Run with: tsx scripts/extract-namespaces.ts
 */

import * as fs from 'fs';
import * as path from 'path';

const LOCALES = ['en', 'fr', 'zh', 'es'] as const;
type Locale = typeof LOCALES[number];

// Define namespace key mappings
const NAMESPACE_KEYS: Record<string, string[]> = {
  common: [
    'siteName',
    'siteDescription',
    'nav',
    'locationsMenu',
    'footer',
    'footerNav',
    'notFoundPage',
    'structuredData',
    'ui',
    'announcementBar',
    'seo',
    'seoKeywords',
  ],
  home: [
    'hero',
    'features',
    'benefits',
    'benefitsSection',
    'howItWorks',
    'productsSection',
    'cta',
    'trustBar',
    'about',
    'newsletter',
    'homepage',
    'featuresSection',
    'sectionTeasers',
    'trustBadges',
    'emailCapture',
    'reviewsSection',
    'freeGiveaway',
    'enhancedProductComparison',
    'subscriptionOffer',
    'urgencyBanner',
    'agitationSection',
    'calculatorSection',
    'socialProofBadges',
    'scrollingBar',
  ],
  products: [
    'products',
    'pricing',
    'productsHero',
    'productComparison',
    'productsPage',
    'subscriptionOfferExtended',
    'paymentSecurity',
    'testimonialsSection',
    'storesSection',
    'upsell',
    'productPages',
  ],
  product: ['products', 'pricing', 'freeTrial', 'trustBadges'],
  learn: ['scienceSection', 'faq', 'faqPage', 'howItWorks', 'sciencePage', 'veterinarians'],
  blog: ['blog', 'blogSection', 'relatedArticles'],
  retailers: [
    'retailers',
    'caseStudies',
    'b2bCaseStudies',
    'wholesalePricing',
    'groomers',
    'catCafes',
    'shelters',
    'hospitality',
  ],
  contact: ['contact', 'contactSection', 'contactPage'],
  reviews: ['reviews', 'reviewsPage', 'reviewSystem', 'testimonialsSection'],
  affiliate: ['affiliate', 'affiliateDashboard'],
  referral: ['referral'],
  locations: ['cityPage', 'locations', 'maps'],
  checkout: ['thankYou', 'freeTrialPage', 'tryFreePage', 'forms'],
  admin: [],
  account: [],
};

async function extractNamespaces() {
  const baseDir = path.resolve(__dirname, '..');
  const outputBaseDir = path.join(baseDir, 'src', 'translations', 'namespaces');

  for (const locale of LOCALES) {
    console.log(`\n📦 Processing ${locale.toUpperCase()} translations...`);
    
    // Import the translation file
    const translationModule = await import(path.join(baseDir, 'src', 'translations', `${locale}.ts`));
    const translations = translationModule[locale] || translationModule.default;
    
    if (!translations) {
      console.error(`❌ Could not load translations for ${locale}`);
      continue;
    }

    // Create output directory for this locale
    const localeOutputDir = path.join(outputBaseDir, locale);
    fs.mkdirSync(localeOutputDir, { recursive: true });

    // Extract each namespace
    for (const [namespace, keys] of Object.entries(NAMESPACE_KEYS)) {
      const namespaceData: Record<string, unknown> = {};
      
      for (const key of keys) {
        if (key in translations) {
          namespaceData[key] = translations[key];
        }
      }

      // Write namespace JSON file
      const outputPath = path.join(localeOutputDir, `${namespace}.json`);
      fs.writeFileSync(outputPath, JSON.stringify(namespaceData, null, 2));
      
      const size = JSON.stringify(namespaceData).length;
      console.log(`  ✓ ${namespace}.json (${(size / 1024).toFixed(2)} KB)`);
    }
  }

  console.log('\n✅ Namespace extraction complete!');
}

extractNamespaces().catch(console.error);
