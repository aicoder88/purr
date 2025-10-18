import { SITE_NAME, SITE_DESCRIPTION, PRODUCTS, CONTACT_INFO, SOCIAL_LINKS } from './constants';

// SEO utilities for comprehensive structured data and multilingual support

interface TranslatedContent {
  en: string;
  fr: string;
  zh: string;
}

export type OfferAvailability = 'InStock' | 'OutOfStock' | 'PreOrder';
type LocaleCode = 'en' | 'fr' | 'zh';

const DEFAULT_LOCALE: LocaleCode = 'en';
const SUPPORTED_LOCALES: LocaleCode[] = ['en', 'fr', 'zh'];
const LOCALE_HREFLANG_MAP: Record<LocaleCode, string> = {
  en: 'en-CA',
  fr: 'fr-CA',
  zh: 'zh-CN',
};
const SCHEMA_ORG_BASE_URL = 'https://schema.org';
const DEFAULT_PRICE_VALIDITY_DAYS = 365;
const DEFAULT_META_DESCRIPTION_PADDING =
  'Explore Purrify activated carbon technology that neutralizes tough litter box odors and keeps homes fresh.';
const DEFAULT_META_TITLE_SUFFIX = ' | Purrify';
const META_TITLE_MAX_LENGTH = 60;
const META_DESCRIPTION_MIN_LENGTH = 110;
const META_DESCRIPTION_MAX_LENGTH = 160;

export const getPriceValidityDate = (validForDays: number = DEFAULT_PRICE_VALIDITY_DAYS) => {
  const validityDate = new Date();
  validityDate.setDate(validityDate.getDate() + validForDays);
  return validityDate.toISOString().split('T')[0];
};

export const buildAvailabilityUrl = (availability: OfferAvailability = 'InStock') =>
  `${SCHEMA_ORG_BASE_URL}/${availability}`;

export const SEO_TRANSLATIONS = {
  siteDescription: {
    en: SITE_DESCRIPTION,
    fr: "Additif de litière pour chat à base de charbon actif qui élimine les odeurs à la source.",
    zh: "活性炭猫砂添加剂，从源头消除异味。"
  },
  organizationDescription: {
    en: "Premium activated carbon cat litter additive that eliminates odors at the molecular level. Made in Canada with natural ingredients.",
    fr: "Additif premium pour litière pour chat à base de charbon actif qui élimine les odeurs au niveau moléculaire. Fabriqué au Canada avec des ingrédients naturels.",
    zh: "优质活性炭猫砂添加剂，在分子级别消除异味。采用天然成分在加拿大制造。"
  },
  keywords: {
    en: [
      'cat litter odor control',
      'activated carbon cat litter',
      'natural cat litter additive',
      'fragrance-free pet odor control',
      'cat litter deodorizer',
      'pet odor elimination',
      'molecular odor control',
      'cat care products'
    ],
    fr: [
      'contrôle des odeurs de litière pour chat',
      'litière pour chat au charbon actif',
      'additif naturel pour litière de chat',
      "contrôle des odeurs sans parfum pour animaux",
      'désodorisant pour litière de chat',
      'élimination des odeurs d\'animaux',
      'contrôle moléculaire des odeurs',
      'produits de soins pour chats'
    ],
    zh: [
      '猫砂异味控制',
      '活性炭猫砂',
      '天然猫砂添加剂',
      '无香宠物异味控制',
      '猫砂除臭剂',
      '宠物异味消除',
      '分子级异味控制',
      '猫咪护理产品'
    ]
  },
  breadcrumbNames: {
    home: { en: 'Home', fr: 'Accueil', zh: '首页' },
    products: { en: 'Products', fr: 'Produits', zh: '产品' },
    learn: { en: 'Learn', fr: 'Apprendre', zh: '了解' },
    faq: { en: 'FAQ', fr: 'FAQ', zh: '常见问题' },
    'trial-size': { en: 'Trial Size', fr: 'Taille d\'Essai', zh: '试用装' },
    'activated-carbon-benefits': { en: 'Activated Carbon Benefits', fr: 'Avantages du Charbon Actif', zh: '活性炭的好处' },
    'how-it-works': { en: 'How It Works', fr: 'Comment Ça Marche', zh: '工作原理' },
    contact: { en: 'Contact', fr: 'Contact', zh: '联系我们' },
    testimonials: { en: 'Testimonials', fr: 'Témoignages', zh: '客户评价' }
  }
};

// Generate localized URLs
export const normalizeLocale = (locale: string): LocaleCode => {
  if (SUPPORTED_LOCALES.includes(locale as LocaleCode)) {
    return locale as LocaleCode;
  }

  return DEFAULT_LOCALE;
};

export const getLocalizedUrl = (path: string, localeInput: string) => {
  const locale = normalizeLocale(localeInput);
  const baseUrl = 'https://www.purrify.ca';
  const localePrefix = locale === 'en' ? '' : `/${locale}`;
  const normalizedPath = normalizeCanonicalPath(path);

  if (normalizedPath === '/') {
    return `${baseUrl}${localePrefix}/`;
  }

  return `${baseUrl}${localePrefix}${normalizedPath}`;
};

export type LanguageAlternate = {
  locale: LocaleCode;
  hrefLang: string;
  href: string;
};

export const buildLanguageAlternates = (canonicalPath: string): LanguageAlternate[] => {
  const normalizedPath = normalizeCanonicalPath(canonicalPath);

  const alternates = SUPPORTED_LOCALES.map(locale => ({
    locale,
    hrefLang: LOCALE_HREFLANG_MAP[locale],
    href: getLocalizedUrl(normalizedPath, locale),
  }));

  const defaultHref = getLocalizedUrl(normalizedPath, DEFAULT_LOCALE);

  return [
    ...alternates,
    {
      locale: DEFAULT_LOCALE,
      hrefLang: 'x-default',
      href: defaultHref,
    },
  ];
};

function normalizeCanonicalPath(path: string | undefined) {
  if (!path || path === '/') {
    return '/';
  }

  const withLeadingSlash = path.startsWith('/') ? path : `/${path}`;
  const trimmed = withLeadingSlash.replace(/\/+$/, '');

  return trimmed.length === 0 ? '/' : trimmed;
}

// Generate localized content
export const getLocalizedContent = (content: TranslatedContent, localeInput: string) => {
  const locale = normalizeLocale(localeInput);
  return content[locale] || content.en;
};

// Get localized keywords as array
export const getLocalizedKeywords = (localeInput: string): string[] => {
  const locale = normalizeLocale(localeInput);
  return SEO_TRANSLATIONS.keywords[locale] || SEO_TRANSLATIONS.keywords.en;
};

const appendEllipsis = (value: string) => {
  const trimmed = value.trim();
  return trimmed.endsWith('…') ? trimmed : `${trimmed}…`;
};

const ensureSentenceTermination = (value: string) => {
  const trimmed = value.trim();

  if (!trimmed) {
    return trimmed;
  }

  return /[.!?]$/.test(trimmed) ? trimmed : `${trimmed}.`;
};

export const normalizeMetaTitle = (
  rawTitle: string | undefined,
  fallback: string = `${SITE_NAME}${DEFAULT_META_TITLE_SUFFIX}`
): string => {
  const base = (rawTitle || fallback).trim();

  if (!base) {
    return fallback;
  }

  if (base.length <= META_TITLE_MAX_LENGTH) {
    return base;
  }

  const truncated = base.slice(0, META_TITLE_MAX_LENGTH - 1).trimEnd();
  return appendEllipsis(truncated);
};

export const normalizeMetaDescription = (
  rawDescription: string | undefined,
  fallback: string = DEFAULT_META_DESCRIPTION_PADDING
): string => {
  let description = (rawDescription || '').trim();

  if (!description) {
    description = fallback;
  }

  if (description.length < META_DESCRIPTION_MIN_LENGTH) {
    const padding = ensureSentenceTermination(description);
    const extended = `${padding} ${DEFAULT_META_DESCRIPTION_PADDING}`.trim();
    description = extended;
  }

  if (description.length > META_DESCRIPTION_MAX_LENGTH) {
    const truncated = description.slice(0, META_DESCRIPTION_MAX_LENGTH - 1).trimEnd();
    return appendEllipsis(truncated);
  }

  return description;
};

// Generate comprehensive FAQ data for different locales
export const generateLocalizedFAQs = (localeInput: string) => {
  const locale = normalizeLocale(localeInput);
  const baseFAQs = [
    {
      question: {
        en: 'What is Purrify and how does it work?',
        fr: 'Qu\'est-ce que Purrify et comment ça marche ?',
        zh: 'Purrify是什么，它是如何工作的？'
      },
      answer: {
        en: 'Purrify is an activated carbon additive for cat litter that eliminates odors at the molecular level. The activated carbon has millions of microscopic pores that trap and neutralize odor-causing compounds.',
        fr: 'Purrify est un additif au charbon actif pour litière de chat qui élimine les odeurs au niveau moléculaire. Le charbon actif contient des millions de pores microscopiques qui piègent et neutralisent les composés responsables des odeurs.',
        zh: 'Purrify是一种用于猫砂的活性炭添加剂，在分子级别消除异味。活性炭含有数百万个微观孔隙，可以捕获和中和产生异味的化合物。'
      }
    },
    {
      question: {
        en: 'Can Purrify be used around cats and people?',
        fr: 'Peut-on utiliser Purrify près des chats et des personnes ?',
        zh: 'Purrify可以在猫和人周围使用吗？'
      },
      answer: {
        en: 'Purrify uses the same type of activated carbon commonly found in household water and air filtration and contains no added fragrances or dyes.',
        fr: 'Purrify utilise le même type de charbon actif que l’on retrouve couramment dans les filtres à eau et à air domestiques, sans parfums ni colorants ajoutés.',
        zh: 'Purrify采用与家用净水和空气过滤中常见的同类活性炭，不添加香精或染料。'
      }
    },
    {
      question: {
        en: 'How much Purrify should I use?',
        fr: 'Combien de Purrify dois-je utiliser ?',
        zh: '我应该使用多少Purrify？'
      },
      answer: {
        en: 'For optimal results, use approximately 1-2 tablespoons of Purrify per standard litter box. Mix it thoroughly with your existing litter when you do a complete change.',
        fr: 'Pour des résultats optimaux, utilisez environ 1 à 2 cuillères à soupe de Purrify par bac à litière standard. Mélangez-le soigneusement avec votre litière existante lors d\'un changement complet.',
        zh: '为获得最佳效果，每个标准猫砂盆大约使用1-2汤匙Purrify。在完全更换时，将其与现有猫砂充分混合。'
      }
    },
    {
      question: {
        en: 'Does Purrify work with all types of litter?',
        fr: 'Purrify fonctionne-t-il avec tous les types de litière ?',
        zh: 'Purrify适用于所有类型的猫砂吗？'
      },
      answer: {
        en: 'Yes! Purrify is designed to work with any type of cat litter - clay, clumping, crystal, natural, or biodegradable. It enhances the odor control properties of whatever litter you\'re already using.',
        fr: 'Oui ! Purrify est conçu pour fonctionner avec tout type de litière pour chat - argile, agglomérante, cristal, naturelle ou biodégradable. Il améliore les propriétés de contrôle des odeurs de la litière que vous utilisez déjà.',
        zh: '是的！Purrify设计为适用于任何类型的猫砂 - 黏土、结团、水晶、天然或可生物降解的。它增强了您已经使用的任何猫砂的异味控制特性。'
      }
    },
    {
      question: {
        en: 'How long does Purrify last?',
        fr: 'Combien de temps dure Purrify ?',
        zh: 'Purrify能持续多长时间？'
      },
      answer: {
        en: 'Purrify extends the life of your litter by 2-3 times. Instead of changing litter weekly, you can typically go 2-3 weeks with the same litter when using Purrify, depending on usage frequency.',
        fr: 'Purrify prolonge la durée de vie de votre litière de 2 à 3 fois. Au lieu de changer la litière chaque semaine, vous pouvez généralement utiliser la même litière pendant 2 à 3 semaines avec Purrify, selon la fréquence d\'utilisation.',
        zh: 'Purrify可以将猫砂的使用寿命延长2-3倍。使用Purrify时，您通常可以使用同一批猫砂2-3周，而不是每周更换，具体取决于使用频率。'
      }
    }
  ];

  return baseFAQs.map(faq => ({
    question: getLocalizedContent(faq.question, locale),
    answer: getLocalizedContent(faq.answer, locale)
  }));
};

// Generate product structured data with localization
export const generateProductStructuredData = (productId: string, localeInput: string) => {
  const locale = normalizeLocale(localeInput);
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return null;

  const baseUrl = 'https://www.purrify.ca';
  const localizedUrl = getLocalizedUrl(`/products/${productId}`, locale);

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': localizedUrl,
    name: product.name,
    description: product.description,
    image: [`${baseUrl}${product.image}`],
    brand: {
      '@type': 'Brand',
      name: SITE_NAME
    },
    category: 'Pet Supplies > Cat Care > Litter Additives',
    sku: product.id,
    mpn: `PURRIFY-${product.id.toUpperCase()}`,
    offers: {
      '@type': 'Offer',
      price: product.price.toString(),
      priceCurrency: 'CAD',
      availability: buildAvailabilityUrl(),
      url: localizedUrl,
      priceValidUntil: getPriceValidityDate()
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '127',
      bestRating: '5',
      worstRating: '1'
    },
    inLanguage: locale === 'fr' ? 'fr-CA' : locale === 'zh' ? 'zh-CN' : 'en-CA'
  };
};

// Generate article structured data with localization  
export const generateArticleStructuredData = (title: string, description: string, path: string, localeInput: string, options?: {
  author?: string;
  datePublished?: string;
  dateModified?: string;
  keywords?: string[];
  category?: string;
  image?: string;
}) => {
  const locale = normalizeLocale(localeInput);
  const url = getLocalizedUrl(path, locale);
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': url,
    headline: title,
    description: description,
    url: url,
    image: options?.image || 'https://www.purrify.ca/purrify-logo.png',
    author: {
      '@type': 'Organization',
      name: SITE_NAME
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.purrify.ca/purrify-logo.png'
      }
    },
    datePublished: options?.datePublished || new Date().toISOString(),
    dateModified: options?.dateModified || new Date().toISOString(),
    articleSection: options?.category || 'Pet Care',
    keywords: options?.keywords?.join(', ') || getLocalizedKeywords(locale).join(', '),
    inLanguage: locale === 'fr' ? 'fr-CA' : locale === 'zh' ? 'zh-CN' : 'en-CA',
    about: {
      '@type': 'Thing',
      name: 'Cat Litter Odor Control'
    }
  };
};

// Generate comprehensive organization schema with localization
export const generateOrganizationSchema = (localeInput: string) => {
  const locale = normalizeLocale(localeInput);
  const baseUrl = 'https://www.purrify.ca';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${baseUrl}/#organization`,
    name: SITE_NAME,
    alternateName: SITE_NAME,
    url: baseUrl,
    logo: `${baseUrl}/purrify-logo.png`,
    image: `${baseUrl}/purrify-logo.png`,
    description: getLocalizedContent(SEO_TRANSLATIONS.organizationDescription, locale),
    foundingDate: '2023',
    address: {
      '@type': 'PostalAddress',
      streetAddress: CONTACT_INFO.address.split(',')[0],
      addressLocality: 'Mirabel',
      addressRegion: 'QC',
      postalCode: 'J7J 0T6',
      addressCountry: 'CA'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '45.6501',
      longitude: '-73.8359'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: CONTACT_INFO.phoneInternational,
      email: CONTACT_INFO.email,
      contactType: 'customer service',
      areaServed: ['CA', 'US'],
      availableLanguage: ['English', 'French', 'Chinese']
    },
    sameAs: Object.values(SOCIAL_LINKS),
    knowsAbout: getLocalizedKeywords(locale),
    areaServed: {
      '@type': 'Country',
      name: 'Canada'
    },
    currenciesAccepted: 'CAD',
    paymentAccepted: ['Credit Card', 'PayPal', 'Stripe']
  };
};

// Generate breadcrumb schema with localization
export const generateBreadcrumbSchema = (path: string, localeInput: string) => {
  const locale = normalizeLocale(localeInput);
  const pathSegments = path.split('/').filter(segment => segment !== '' && segment !== locale);
  
  const breadcrumbs = [
    {
      name: getLocalizedContent(SEO_TRANSLATIONS.breadcrumbNames.home, locale),
      url: getLocalizedUrl('/', locale)
    }
  ];

  let currentPath = '';
  
  pathSegments.forEach((segment) => {
    currentPath += `/${segment}`;
    
    // Get localized name for common segments
    const segmentKey = segment as keyof typeof SEO_TRANSLATIONS.breadcrumbNames;
    const localizedName = SEO_TRANSLATIONS.breadcrumbNames[segmentKey] 
      ? getLocalizedContent(SEO_TRANSLATIONS.breadcrumbNames[segmentKey], locale)
      : segment.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    
    breadcrumbs.push({
      name: localizedName,
      url: getLocalizedUrl(currentPath, locale)
    });
  });

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((breadcrumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: breadcrumb.name,
      item: breadcrumb.url
    }))
  };
};

// Generate website schema with localization
export const generateWebsiteSchema = (localeInput: string) => {
  const locale = normalizeLocale(localeInput);
  const baseUrl = 'https://www.purrify.ca';
  const localizedUrl = getLocalizedUrl('', locale);
  
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${baseUrl}/#website`,
    name: SITE_NAME,
    alternateName: `${SITE_NAME} - ${getLocalizedContent(SEO_TRANSLATIONS.siteDescription, locale)}`,
    url: localizedUrl || baseUrl,
    description: getLocalizedContent(SEO_TRANSLATIONS.siteDescription, locale),
    inLanguage: locale === 'fr' ? 'fr-CA' : locale === 'zh' ? 'zh-CN' : 'en-CA',
    publisher: {
      '@id': `${baseUrl}/#organization`
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${localizedUrl || baseUrl}/search?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  };
};

// Generate FAQ schema with localization
export const generateFAQSchema = (localeInput: string) => {
  const locale = normalizeLocale(localeInput);
  const faqs = generateLocalizedFAQs(locale);
  
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
};

// Product interface for type safety
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  size: string;
}

// Generate enhanced product offer schema
export const generateOfferSchema = (product: Product, localeInput: string) => {
  const locale = normalizeLocale(localeInput);
  const localizedUrl = getLocalizedUrl(`/products/${product.id}`, locale);
  
  return {
    '@type': 'Offer',
    price: product.price.toString(),
    priceCurrency: 'CAD',
    availability: buildAvailabilityUrl(),
    url: localizedUrl,
    seller: {
      '@type': 'Organization',
      name: SITE_NAME
    },
    priceValidUntil: getPriceValidityDate(),
    itemCondition: 'https://schema.org/NewCondition',
    shippingDetails: {
      '@type': 'OfferShippingDetails',
      shippingRate: {
        '@type': 'MonetaryAmount',
        value: '0',
        currency: 'CAD'
      },
      deliveryTime: {
        '@type': 'ShippingDeliveryTime',
        handlingTime: {
          '@type': 'QuantitativeValue',
          minValue: 1,
          maxValue: 2,
          unitCode: 'd'
        },
        transitTime: {
          '@type': 'QuantitativeValue',
          minValue: 2,
          maxValue: 5,
          unitCode: 'd'
        }
      }
    },
    hasMerchantReturnPolicy: {
      '@type': 'MerchantReturnPolicy',
      returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
      merchantReturnDays: 30,
      returnMethod: 'https://schema.org/ReturnByMail',
      returnFees: 'https://schema.org/FreeReturn'
    }
  };
};

// Generate local business schema for city pages
export const generateLocalBusinessSchema = (cityName: string, province: string, localeInput: string) => {
  const locale = normalizeLocale(localeInput);
  const cityCoordinates = {
    'Montreal': { lat: '45.5017', lon: '-73.5673' },
    'Toronto': { lat: '43.6532', lon: '-79.3832' },
    'Vancouver': { lat: '49.2827', lon: '-123.1207' },
    'Calgary': { lat: '51.0447', lon: '-114.0719' },
    'Edmonton': { lat: '53.5461', lon: '-113.4938' },
    'Ottawa': { lat: '45.4215', lon: '-75.6972' },
    'Winnipeg': { lat: '49.8951', lon: '-97.1384' }
  };
  
  const coords = cityCoordinates[cityName as keyof typeof cityCoordinates] || { lat: '45.4215', lon: '-75.6972' };
  
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness'],
    '@id': `https://www.purrify.ca/#organization-${cityName.toLowerCase()}`,
    name: `${SITE_NAME} - ${cityName}`,
    description: getLocalizedContent(SEO_TRANSLATIONS.organizationDescription, locale),
    url: getLocalizedUrl(`/locations/${cityName.toLowerCase()}`, locale),
    logo: 'https://www.purrify.ca/purrify-logo.png',
    image: 'https://www.purrify.ca/purrify-logo.png',
    address: {
      '@type': 'PostalAddress',
      addressLocality: cityName,
      addressRegion: province,
      addressCountry: 'CA'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: coords.lat,
      longitude: coords.lon
    },
    areaServed: {
      '@type': 'City',
      name: `${cityName}, ${province}`,
      containedInPlace: {
        '@type': 'AdministrativeArea',
        name: province
      }
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: CONTACT_INFO.phoneInternational,
      email: CONTACT_INFO.email,
      contactType: 'customer service',
      areaServed: 'CA',
      availableLanguage: locale === 'fr' ? 'French' : locale === 'zh' ? 'Chinese' : 'English'
    },
    openingHoursSpecification: Object.entries(CONTACT_INFO.hours).map(([day, hours]) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: `https://schema.org/${day.charAt(0).toUpperCase() + day.slice(1)}`,
      opens: hours === 'Closed' ? undefined : hours.split(' - ')[0],
      closes: hours === 'Closed' ? undefined : hours.split(' - ')[1]
    })).filter(spec => spec.opens && spec.closes),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Cat Litter Odor Control Products',
      itemListElement: PRODUCTS.map(product => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Product',
          name: product.name,
          description: product.description.split('\n')[0]
        }
      }))
    },
    priceRange: '$6.99 - $29.99'
  };
};

// Generate review schema - removed to fix ESLint issues
// This functionality can be implemented when testimonials constants are properly typed

// Generate comprehensive homepage schema
export const generateHomepageSchema = (localeInput: string) => {
  const locale = normalizeLocale(localeInput);
  const baseUrl = 'https://www.purrify.ca';
  
  return {
    '@context': 'https://schema.org',
    '@graph': [
      // Website Schema
      generateWebsiteSchema(locale),
      
      // Organization Schema
      generateOrganizationSchema(locale),
      
      // Product Collection
      {
        '@type': 'ItemList',
        '@id': `${baseUrl}/#products`,
        name: 'Purrify Cat Litter Additive Products',
        description: 'Complete range of activated carbon cat litter additives for odor control',
        numberOfItems: PRODUCTS.length,
        itemListElement: PRODUCTS.map((product, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'Product',
            '@id': getLocalizedUrl(`/products/${product.id}`, locale),
            name: product.name,
            description: product.description.split('\n')[0],
            image: `${baseUrl}${product.image}`,
            offers: generateOfferSchema(product, locale)
          }
        }))
      },
      
      // FAQ Schema for homepage FAQ section
      generateFAQSchema(locale)
    ]
  };
};

// Generate complete product page schema
export const generateProductPageSchema = (productId: string, localeInput: string) => {
  const locale = normalizeLocale(localeInput);
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return null;
  
  const baseUrl = 'https://www.purrify.ca';
  const localizedUrl = getLocalizedUrl(`/products/${productId}`, locale);
  
  return {
    '@context': 'https://schema.org',
    '@graph': [
      // Main Product Schema
      {
        '@type': 'Product',
        '@id': localizedUrl,
        name: product.name,
        description: product.description,
        image: [`${baseUrl}${product.image}`],
        brand: {
          '@type': 'Brand',
          name: SITE_NAME,
          logo: `${baseUrl}/purrify-logo.png`
        },
        manufacturer: {
          '@type': 'Organization',
          name: SITE_NAME,
          url: baseUrl
        },
        category: 'Pet Supplies > Cat Care > Litter Additives',
        sku: product.id,
        mpn: `PURRIFY-${product.id.toUpperCase()}`,
        gtin13: `978${product.id.slice(-10).padStart(10, '0')}`,
        weight: {
          '@type': 'QuantitativeValue',
          value: product.size,
          unitCode: 'GRM'
        },
        size: product.size,
        color: 'Black',
        material: 'Activated Carbon',
        offers: generateOfferSchema(product, locale),
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: '127',
          bestRating: '5',
          worstRating: '1'
        },
        // review: generateReviewSchema(productId, locale), // Temporarily removed
        additionalProperty: [
          {
            '@type': 'PropertyValue',
            name: 'Pet Type',
            value: 'Cat'
          },
          {
            '@type': 'PropertyValue',
            name: 'Ingredient',
            value: 'Activated Carbon from Coconut Shells'
          },
          {
            '@type': 'PropertyValue',
            name: 'Usage',
            value: 'Cat Litter Additive'
          }
        ],
        isAccessoryOrSparePartFor: {
          '@type': 'Product',
          name: 'Cat Litter'
        },
        audience: {
          '@type': 'Audience',
          name: 'Cat Owners'
        },
        inLanguage: locale === 'fr' ? 'fr-CA' : locale === 'zh' ? 'zh-CN' : 'en-CA'
      },
      
      // Breadcrumb Schema
      generateBreadcrumbSchema(`/products/${productId}`, locale)
    ]
  };
};

// Generate article page schema for learn pages
export const generateArticlePageSchema = (title: string, description: string, path: string, localeInput: string, options?: {
  author?: string;
  datePublished?: string;
  dateModified?: string;
  keywords?: string[];
  category?: string;
  image?: string;
  wordCount?: number;
  readingTime?: number;
}) => {
  const locale = normalizeLocale(localeInput);
  const url = getLocalizedUrl(path, locale);
  const baseUrl = 'https://www.purrify.ca';
  
  return {
    '@context': 'https://schema.org',
    '@graph': [
      // Main Article Schema
      {
        '@type': 'Article',
        '@id': url,
        headline: title,
        description: description,
        url: url,
        image: options?.image || `${baseUrl}/purrify-logo.png`,
        author: {
          '@type': 'Organization',
          name: SITE_NAME,
          url: baseUrl,
          logo: `${baseUrl}/purrify-logo.png`
        },
        publisher: {
          '@type': 'Organization',
          name: SITE_NAME,
          logo: {
            '@type': 'ImageObject',
            url: `${baseUrl}/purrify-logo.png`,
            width: 400,
            height: 400
          },
          url: baseUrl
        },
        datePublished: options?.datePublished || new Date().toISOString(),
        dateModified: options?.dateModified || new Date().toISOString(),
        articleSection: options?.category || 'Pet Care',
        keywords: options?.keywords?.join(', ') || getLocalizedKeywords(locale).join(', '),
        wordCount: options?.wordCount || 1500,
        timeRequired: options?.readingTime ? `PT${options.readingTime}M` : 'PT8M',
        inLanguage: locale === 'fr' ? 'fr-CA' : locale === 'zh' ? 'zh-CN' : 'en-CA',
        about: {
          '@type': 'Thing',
          name: 'Cat Litter Odor Control',
          description: 'Information about controlling cat litter odors using activated carbon'
        },
        mainEntity: {
          '@type': 'Thing',
          name: title,
          description: description
        },
        isPartOf: {
          '@type': 'WebSite',
          '@id': `${baseUrl}/#website`
        },
        potentialAction: {
          '@type': 'ReadAction',
          target: url
        }
      },
      
      // Breadcrumb Schema
      generateBreadcrumbSchema(path, locale),
      
      // FAQ Schema if it's a how-to or benefits article
      ...(path.includes('benefits') || path.includes('how') ? [generateFAQSchema(locale)] : [])
    ]
  };
};

// Generate location page schema
export const generateLocationPageSchema = (cityName: string, province: string, localeInput: string) => {
  const locale = normalizeLocale(localeInput);
  const url = getLocalizedUrl(`/locations/${cityName.toLowerCase()}`, locale);
  
  return {
    '@context': 'https://schema.org',
    '@graph': [
      // Local Business Schema
      generateLocalBusinessSchema(cityName, province, locale),
      
      // Service Area Schema
      {
        '@type': 'Service',
        '@id': `${url}/#service`,
        name: `Cat Litter Odor Control Services in ${cityName}`,
        description: `Professional-grade activated carbon cat litter additive delivery in ${cityName}, ${province}`,
        provider: {
          '@id': `https://www.purrify.ca/#organization-${cityName.toLowerCase()}`
        },
        areaServed: {
          '@type': 'City',
          name: `${cityName}, ${province}`
        },
        serviceType: 'Pet Product Delivery',
        offers: PRODUCTS.map(product => generateOfferSchema(product, locale))
      },
      
      // Breadcrumb Schema
      generateBreadcrumbSchema(`/locations/${cityName.toLowerCase()}`, locale)
    ]
  };
};

// Generate JSON-LD script tag
export const generateJSONLD = (schema: object) => {
  return {
    __html: JSON.stringify(schema, null, 2)
  };
};

// Utility to combine multiple schemas
export const combineSchemas = (...schemas: (object | null | undefined)[]) => {
  return schemas.filter(Boolean);
};

const seoUtils = {
  SEO_TRANSLATIONS,
  getLocalizedUrl,
  getLocalizedContent,
  getLocalizedKeywords,
  generateLocalizedFAQs,
  generateProductStructuredData,
  generateArticleStructuredData,
  generateOrganizationSchema,
  generateBreadcrumbSchema,
  generateWebsiteSchema,
  generateFAQSchema,
  generateOfferSchema,
  generateLocalBusinessSchema,
  // generateReviewSchema, // Temporarily removed
  generateHomepageSchema,
  generateProductPageSchema,
  generateArticlePageSchema,
  generateLocationPageSchema,
  generateJSONLD,
  combineSchemas
};

export default seoUtils;
