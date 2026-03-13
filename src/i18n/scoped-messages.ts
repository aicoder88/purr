import { cache } from 'react';
import { defaultLocale, isValidLocale, type Locale } from '@/i18n/config';
import type { TranslationType } from '@/translations/types';

export type MessageScope =
  | 'root'
  | 'home'
  | 'products'
  | 'learn'
  | 'blog'
  | 'retailers'
  | 'affiliate'
  | 'checkout'
  | 'results'
  | 'locations'
  | 'contact'
  | 'reviews';

const SCOPE_MESSAGE_KEYS: Record<MessageScope, string[]> = {
  root: [
    'accessibility',
    'announcementBar',
    'chat',
    'footer',
    'footerNav',
    'locationsMenu',
    'nav',
    'siteDescription',
    'siteName',
    'ui',
  ],
  home: [
    'about',
    'agitationSection',
    'benefits',
    'benefitsSection',
    'blogSection',
    'calculatorSection',
    'cta',
    'contactPage',
    'emailCapture',
    'enhancedProductComparison',
    'features',
    'featuresSection',
    'freeGiveaway',
    'hero',
    'homepage',
    'howItWorks',
    'madeInCanada',
    'maps',
    'productComparison',
    'productsSection',
    'reviewsSection',
    'scienceSection',
    'scrollingBar',
    'storesSection',
    'subscriptionOffer',
    'testimonialLibrary',
    'testimonialsSection',
    'trustBadges',
    'urgencyBanner',
    'whyPurrify',
  ],
  products: [
    'enhancedProductComparison',
    'hero',
    'paymentSecurity',
    'pricing',
    'productComparison',
    'productPages',
    'products',
    'productsHero',
    'productsPage',
    'scienceSection',
    'subscriptionOfferExtended',
    'testimonialLibrary',
    'testimonialsSection',
    'upsell',
  ],
  learn: [
    'ammonia',
    'comparisonLab',
    'faq',
    'faqPage',
    'howItWorks',
    'homepage',
    'relatedArticles',
    'results',
    'safetyPage',
    'sciencePage',
    'scienceSection',
    'testimonialLibrary',
    'testimonialsSection',
    'veterinarians',
  ],
  blog: [
    'blog',
    'productComparison',
    'products',
    'relatedArticles',
    'socialFollow',
  ],
  retailers: [
    'b2bCaseStudies',
    'caseStudies',
    'catCafes',
    'contact',
    'groomers',
    'hospitality',
    'locations',
    'maps',
    'productComparison',
    'retailers',
    'shelters',
    'storesSection',
    'testimonialLibrary',
    'wholesalePricing',
  ],
  affiliate: [
    'affiliate',
    'affiliateDashboard',
  ],
  checkout: [
    'forms',
    'freeTrialPage',
    'thankYou',
    'tryFreePage',
    'upsell',
  ],
  results: ['results'],
  locations: [
    'cityPage',
    'locations',
    'maps',
  ],
  contact: [
    'contact',
    'contactPage',
    'contactSection',
  ],
  reviews: [
    'relatedArticles',
    'reviews',
    'reviewsPage',
  ],
};

const getAllMessages = cache(async (locale: Locale): Promise<TranslationType> => {
  const translationModule = await import(`@/translations/${locale}.ts`);
  return translationModule[locale] as TranslationType;
});

function normalizeLocale(locale?: string): Locale {
  if (locale && isValidLocale(locale)) {
    return locale;
  }

  return defaultLocale;
}

export async function getScopedMessages(
  locale: string | undefined,
  scopes: MessageScope[]
): Promise<Partial<TranslationType>> {
  const resolvedLocale = normalizeLocale(locale);
  const allMessages = await getAllMessages(resolvedLocale);
  const allMessagesRecord = allMessages as unknown as Record<string, unknown>;
  const selectedKeys = new Set<string>();

  for (const scope of scopes) {
    for (const key of SCOPE_MESSAGE_KEYS[scope]) {
      selectedKeys.add(key);
    }
  }

  return Object.fromEntries(
    Array.from(selectedKeys)
      .filter((key) => allMessagesRecord[key] !== undefined)
      .map((key) => [key, allMessagesRecord[key]])
  ) as Partial<TranslationType>;
}
