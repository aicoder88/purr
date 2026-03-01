/**
 * Translation Namespaces for Route-Based Code Splitting
 * 
 * This file defines the namespace structure for lazy-loading translations.
 * Each namespace contains only the translation keys needed for specific routes.
 */

import type { TranslationType } from '@/translations/types';

// Define namespace types based on route groups
export type TranslationNamespace =
  | 'common'      // Shared across all pages (nav, footer, common UI)
  | 'home'        // Homepage specific
  | 'products'    // Products page
  | 'product'     // Individual product pages
  | 'learn'       // Learn section (how it works, science, etc.)
  | 'blog'        // Blog pages
  | 'retailers'   // B2B/retailer pages
  | 'contact'     // Contact page
  | 'reviews'     // Reviews page
  | 'affiliate'   // Affiliate program
  | 'referral'    // Referral program
  | 'locations'   // Location pages
  | 'checkout'    // Checkout/thank you pages
  | 'admin'       // Admin dashboard
  | 'account';    // User account pages

// Valid keys from TranslationType for each namespace
// These must match the actual interface properties
const NAMESPACE_KEY_MAP: Record<TranslationNamespace, (keyof TranslationType)[]> = {
  common: [
    'siteName',
    'siteDescription',
    'nav',
    'locationsMenu',
    'about',
    'footer',
    'footerNav',
    'notFoundPage',
    'structuredData',
    'ui',
    'announcementBar',
    'seo',
    'seoKeywords',
    'scrollingBar',
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
  product: [
    'products',
    'pricing',
    'freeTrial',
    'trustBadges',
  ],
  learn: [
    'scienceSection',
    'faq',
    'faqPage',
    'howItWorks',
    'sciencePage',
    'veterinarians',
    'results',
  ],
  blog: [
    'blog',
    'blogSection',
    'relatedArticles',
  ],
  retailers: [
    'retailers',
    'caseStudies',
    'b2bCaseStudies',
    'groomers',
    'catCafes',
    'shelters',
    'hospitality',
  ],
  contact: [
    'contact',
    'contactSection',
    'contactPage',
  ],
  reviews: [
    'reviews',
    'reviewsPage',
    'reviewSystem',
    'testimonialsSection',
  ],
  affiliate: [
    'affiliate',
    'affiliateDashboard',
  ],
  referral: [
    'referral',
  ],
  locations: [
    'cityPage',
    'locations',
    'maps',
  ],
  checkout: [
    'thankYou',
    'freeTrialPage',
    'tryFreePage',
    'forms',
  ],
  admin: [
    // Admin-specific keys would go here
  ],
  account: [
    // Account-specific keys would go here
  ],
};

// Export the key map for use by other modules
export { NAMESPACE_KEY_MAP };

// Helper type to extract namespace-specific translation type
export type NamespaceTranslationType<T extends TranslationNamespace> = Pick<
  TranslationType,
  (typeof NAMESPACE_KEY_MAP)[T][number]
>;

// Define critical namespaces that should be loaded immediately
export const CRITICAL_NAMESPACES: TranslationNamespace[] = ['common'];

// Define non-critical namespaces that can be lazy-loaded
export const LAZY_NAMESPACES: TranslationNamespace[] = [
  'home',
  'products',
  'product',
  'learn',
  'blog',
  'retailers',
  'contact',
  'reviews',
  'affiliate',
  'referral',
  'locations',
  'checkout',
  'admin',
  'account',
];

// Route to namespace mapping
// This maps URL patterns to the namespaces needed for those routes
export const ROUTE_NAMESPACE_MAP: Record<string, TranslationNamespace[]> = {
  // Home page
  '/': ['common', 'home'],
  
  // Product routes
  '/products': ['common', 'products'],
  '/buy': ['common', 'products', 'product'],
  
  // Learn routes
  '/learn': ['common', 'learn'],
  '/learn/how-it-works': ['common', 'learn'],
  '/learn/science': ['common', 'learn'],
  '/learn/faq': ['common', 'learn'],
  '/science': ['common', 'learn'],
  
  // Blog routes
  '/blog': ['common', 'blog'],
  '/[locale]/blog': ['common', 'blog'],
  
  // Retailer/B2B routes
  '/retailers': ['common', 'retailers'],
  '/b2b': ['common', 'retailers'],
  '/wholesale': ['common', 'retailers'],
  '/partner': ['common', 'retailers'],
  
  // Contact
  '/contact': ['common', 'contact'],
  
  // Reviews
  '/reviews': ['common', 'reviews'],
  
  // Affiliate
  '/affiliate': ['common', 'affiliate'],
  
  // Referral
  '/refer': ['common', 'referral'],
  '/referral': ['common', 'referral'],
  
  // Locations
  '/locations': ['common', 'locations'],
  '/stores': ['common', 'locations'],
  
  // Checkout/Thank you
  '/thank-you': ['common', 'checkout'],
  '/free-trial': ['common', 'checkout'],
  
  // Admin
  '/admin': ['common', 'admin'],
  
  // Account
  '/customer': ['common', 'account'],
};

// Helper function to get namespaces for a given pathname
export function getNamespacesForPathname(pathname: string): TranslationNamespace[] {
  // Exact match first
  if (ROUTE_NAMESPACE_MAP[pathname]) {
    return ROUTE_NAMESPACE_MAP[pathname];
  }
  
  // Try pattern matching
  for (const [route, namespaces] of Object.entries(ROUTE_NAMESPACE_MAP)) {
    // Handle dynamic segments
    const routePattern = route
      .replace(/\[.*?\]/g, '[^/]+') // Replace [...slug] with regex
      .replace(/\//g, '\\/');      // Escape forward slashes
    
    const regex = new RegExp(`^${routePattern}$`);
    if (regex.test(pathname)) {
      return namespaces;
    }
  }
  
  // Fallback to common only
  return ['common'];
}

// Get all available namespaces
export function getAllNamespaces(): TranslationNamespace[] {
  return [...CRITICAL_NAMESPACES, ...LAZY_NAMESPACES];
}
