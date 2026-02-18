import { SITE_NAME, SITE_DESCRIPTION, PRODUCTS, CONTACT_INFO, SOCIAL_LINKS } from './constants';
import { getProductPrice, getPriceRange } from './pricing';
import type { Currency } from './geo/currency-detector';

// SEO utilities for comprehensive structured data and multilingual support

interface TranslatedContent {
  en: string;
  fr: string;
}

export type OfferAvailability = 'InStock' | 'OutOfStock' | 'PreOrder';
type LocaleCode = 'en' | 'fr';

const DEFAULT_LOCALE: LocaleCode = 'en';
const SUPPORTED_LOCALES: LocaleCode[] = ['en', 'fr'];
const LOCALE_HREFLANG_MAP: Record<LocaleCode, string> = {
  en: 'en-CA',    // English - Canada (primary market)
  fr: 'fr-CA',    // French - Canada
};
const SCHEMA_ORG_BASE_URL = 'https://schema.org';
const DEFAULT_PRICE_VALIDITY_DAYS = 365;
const DEFAULT_META_DESCRIPTION_PADDING =
  'Explore Purrify activated carbon technology that neutralizes tough litter box odors and keeps homes fresh.';
const DEFAULT_META_TITLE_SUFFIX = ' | Purrify';
const META_TITLE_MAX_LENGTH = 60;
// Google typically displays 120-155 characters for meta descriptions
// Using 120-155 range for optimal SERP display
const META_DESCRIPTION_MIN_LENGTH = 120;
const META_DESCRIPTION_MAX_LENGTH = 155;

export const getPriceValidityDate = (validForDays: number = DEFAULT_PRICE_VALIDITY_DAYS) => {
  const validityDate = new Date();
  validityDate.setDate(validityDate.getDate() + validForDays);
  return validityDate.toISOString().split('T')[0];
};

export const buildAvailabilityUrl = (availability: OfferAvailability = 'InStock') =>
  `${SCHEMA_ORG_BASE_URL}/${availability}`;

/**
 * Strips @context from a schema object, useful for items in a @graph
 */
export const stripContext = (schema: unknown) => {
  if (!schema || typeof schema !== 'object') return schema;
  const { '@context': _context, ...rest } = schema as Record<string, unknown>;
  return rest;
};

export const SEO_TRANSLATIONS = {
  siteDescription: {
    en: SITE_DESCRIPTION,
    fr: "Additif de litiere pour chat a base de charbon actif qui elimine les odeurs a la source."
  },
  organizationDescription: {
    en: "Premium activated carbon cat litter additive that eliminates odors at the molecular level. Made in Canada with natural ingredients.",
    fr: "Additif premium pour litiere pour chat a base de charbon actif qui elimine les odeurs au niveau moleculaire. Fabrique au Canada avec des ingredients naturels."
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
      'controle des odeurs de litiere pour chat',
      'litiere pour chat au charbon actif',
      'additif naturel pour litiere de chat',
      "controle des odeurs sans parfum pour animaux",
      'desodorisant pour litiere de chat',
      'elimination des odeurs d\'animaux',
      'controle moleculaire des odeurs',
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
    ],
    es: [
      'control de olores arena gatos',
      'arena gatos carbon activado',
      'aditivo natural arena gatos',
      'control olores mascotas sin fragancia',
      'desodorizante arena gatos',
      'eliminacion olores mascotas',
      'control molecular olores',
      'productos cuidado gatos'
    ]
  },
  breadcrumbNames: {
    home: { en: 'Home', fr: 'Accueil', zh: '首页', es: 'Inicio' },
    products: { en: 'Products', fr: 'Produits', zh: '产品', es: 'Productos' },
    learn: { en: 'Learn', fr: 'Apprendre', zh: '了解', es: 'Aprender' },
    faq: { en: 'FAQ', fr: 'FAQ', zh: '常见问题', es: 'FAQ' },
    'trial-size': { en: 'Trial Size', fr: 'Taille d\'Essai', zh: '试用装', es: 'Prueba' },
    'activated-carbon-benefits': { en: 'Activated Carbon Benefits', fr: 'Avantages du Charbon Actif', zh: '活性炭的好处', es: 'Beneficios del Carbon Activado' },
    'how-it-works': { en: 'How It Works', fr: 'Comment Ca Marche', zh: '工作原理', es: 'Como Funciona' },
    contact: { en: 'Contact', fr: 'Contact', zh: '联系我们', es: 'Contacto' },
    testimonials: { en: 'Testimonials', fr: 'Temoignages', zh: '客户评价', es: 'Testimonios' }
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
  const normalizedPath = normalizeCanonicalPath(path);

  // Special handling for blog paths which are only available under /[locale]/blog
  // but redirected from /blog. We want to point to the 200 OK version.
  const isBlogPath = normalizedPath.startsWith('/blog/') || normalizedPath === '/blog';
  const localePrefix = (locale === 'en' && isBlogPath) ? '/en' : (locale === 'en' ? '' : `/${locale}`);

  if (normalizedPath === '/') {
    return `${baseUrl}/`;
  }

  return `${baseUrl}${localePrefix}${normalizedPath.replace(/^\/(en|fr|zh|es)(\/|$)/, '/')}`;
};

export type LanguageAlternate = {
  locale: LocaleCode;
  hrefLang: string;
  href: string;
};

export const buildLanguageAlternates = (canonicalPath: string): LanguageAlternate[] => {
  const normalizedPath = normalizeCanonicalPath(canonicalPath);

  // Build alternates for all supported locales with proper self-referencing
  const alternates = SUPPORTED_LOCALES.map(locale => ({
    locale,
    hrefLang: LOCALE_HREFLANG_MAP[locale],
    href: getLocalizedUrl(normalizedPath, locale),
  }));

  // For English (CA), we want to be consistent with the canonical URL
  const enCaHref = getLocalizedUrl(normalizedPath, 'en');

  // Add en-US variant - points to /us for homepage, or locale equivalent for other pages
  const isRootPath = normalizedPath === '/' || normalizedPath === '';
  const usHref = isRootPath
    ? 'https://www.purrify.ca/us/'
    : enCaHref;

  const result: LanguageAlternate[] = [...alternates];

  result.push({
    locale: DEFAULT_LOCALE,
    hrefLang: 'en-US',
    href: usHref,
  });

  // Add x-default pointing to the default locale version
  result.push({
    locale: DEFAULT_LOCALE,
    hrefLang: 'x-default',
    href: enCaHref,
  });

  return result;
};

function normalizeCanonicalPath(path: string | undefined) {
  if (!path || path === '/') {
    return '/';
  }

  const withLeadingSlash = path.startsWith('/') ? path : `/${path}`;
  const trimmed = withLeadingSlash.replace(/\/+$/, '');

  // Ensure trailing slash for consistency with next.config.js trailingSlash: true
  return trimmed.length === 0 ? '/' : `${trimmed}/`;
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
  return trimmed.endsWith('...') ? trimmed : `${trimmed}...`;
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
        fr: 'Qu\'est-ce que Purrify et comment ca marche ?',
        zh: 'Purrify是什么，它是如何工作的？',
        es: 'Que es Purrify y como funciona?'
      },
      answer: {
        en: 'Purrify is an activated carbon additive for cat litter that eliminates odors at the molecular level. The activated carbon has millions of microscopic pores that trap and neutralize odor-causing compounds.',
        fr: 'Purrify est un additif au charbon actif pour litiere de chat qui elimine les odeurs au niveau moleculaire. Le charbon actif contient des millions de pores microscopiques qui piegent et neutralisent les composes responsables des odeurs.',
        zh: 'Purrify是一种用于猫砂的活性炭添加剂，在分子级别消除异味。活性炭含有数百万个微观孔隙，可以捕获和中和产生异味的化合物。',
        es: 'Purrify es un aditivo de carbon activado para arena de gatos que elimina olores a nivel molecular. El carbon activado tiene millones de poros microscopicos que atrapan y neutralizan compuestos que causan olores.'
      }
    },
    {
      question: {
        en: 'Can Purrify be used around cats and people?',
        fr: 'Peut-on utiliser Purrify pres des chats et des personnes ?',
        zh: 'Purrify可以在猫和人周围使用吗？',
        es: 'Se puede usar Purrify cerca de gatos y personas?'
      },
      answer: {
        en: 'Purrify uses the same type of activated carbon commonly found in household water and air filtration and contains no added fragrances or dyes.',
        fr: 'Purrify utilise le meme type de charbon actif que l\'on retrouve couramment dans les filtres a eau et a air domestiques, sans parfums ni colorants ajoutes.',
        zh: 'Purrify采用与家用净水和空气过滤中常见的同类活性炭，不添加香精或染料。',
        es: 'Purrify usa el mismo tipo de carbon activado que se encuentra comunmente en filtros de agua y aire domesticos y no contiene fragancias ni colorantes agregados.'
      }
    },
    {
      question: {
        en: 'How much Purrify should I use?',
        fr: 'Combien de Purrify dois-je utiliser ?',
        zh: '我应该使用多少Purrify？',
        es: 'Cuanto Purrify debo usar?'
      },
      answer: {
        en: 'For optimal results, use approximately 1-2 tablespoons of Purrify per standard litter box. Mix it thoroughly with your existing litter when you do a complete change.',
        fr: 'Pour des resultats optimaux, utilisez environ 1 a 2 cuilleres a soupe de Purrify par bac a litiere standard. Melangez-le soigneusement avec votre litiere existante lors d\'un changement complet.',
        zh: '为获得最佳效果，每个标准猫砂盆大约使用1-2汤匙Purrify。在完全更换时，将其与现有猫砂充分混合。',
        es: 'Para resultados optimos, usa aproximadamente 1-2 cucharadas de Purrify por caja de arena estandar. Mezclalo completamente con tu arena existente cuando hagas un cambio completo.'
      }
    },
    {
      question: {
        en: 'Does Purrify work with all types of litter?',
        fr: 'Purrify fonctionne-t-il avec tous les types de litiere ?',
        zh: 'Purrify适用于所有类型的猫砂吗？',
        es: 'Funciona Purrify con todos los tipos de arena?'
      },
      answer: {
        en: 'Yes! Purrify is designed to work with any type of cat litter - clay, clumping, crystal, natural, or biodegradable. It enhances the odor control properties of whatever litter you\'re already using.',
        fr: 'Oui ! Purrify est concu pour fonctionner avec tout type de litiere pour chat - argile, agglomerante, cristal, naturelle ou biodegradable. Il ameliore les proprietes de controle des odeurs de la litiere que vous utilisez deja.',
        zh: '是的！Purrify设计为适用于任何类型的猫砂 - 黏土、结团、水晶、天然或可生物降解的。它增强了您已经使用的任何猫砂的异味控制特性。',
        es: 'Si! Purrify esta disenado para funcionar con cualquier tipo de arena para gatos - arcilla, aglomerante, cristal, natural o biodegradable. Mejora las propiedades de control de olores de cualquier arena que ya estes usando.'
      }
    },
    {
      question: {
        en: 'How long does Purrify last?',
        fr: 'Combien de temps dure Purrify ?',
        zh: 'Purrify能持续多长时间？',
        es: 'Cuanto dura Purrify?'
      },
      answer: {
        en: 'Purrify extends the life of your litter by 2-3 times. Instead of changing litter weekly, you can typically go 2-3 weeks with the same litter when using Purrify, depending on usage frequency.',
        fr: 'Purrify prolonge la duree de vie de votre litiere de 2 a 3 fois. Au lieu de changer la litiere chaque semaine, vous pouvez generalement utiliser la meme litiere pendant 2 a 3 semaines avec Purrify, selon la frequence d\'utilisation.',
        zh: 'Purrify可以将猫砂的使用寿命延长2-3倍。使用Purrify时，您通常可以使用同一批猫砂2-3周，而不是每周更换，具体取决于使用频率。',
        es: 'Purrify extiende la vida de tu arena por 2-3 veces. En lugar de cambiar la arena semanalmente, tipicamente puedes pasar 2-3 semanas con la misma arena usando Purrify, dependiendo de la frecuencia de uso.'
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
    sku: product.id,
    mpn: `PURRIFY-${product.id.toUpperCase()}`,
    offers: {
      '@type': 'Offer',
      price: product.price.toFixed(2),
      priceCurrency: 'CAD',
      availability: buildAvailabilityUrl(),
      url: localizedUrl,
      priceValidUntil: getPriceValidityDate(),
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: SITE_NAME
      }
    },
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
    image: options?.image || 'https://www.purrify.ca/images/Logos/purrify-logo.png',
    author: {
      '@type': 'Person',
      name: options?.author || 'Dr. Sarah Chen',
      jobTitle: 'Veterinary Consultant',
      url: 'https://www.purrify.ca/about/our-story/'
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.purrify.ca/images/Logos/purrify-logo.png',
        width: 400,
        height: 400
      }
    },
    datePublished: options?.datePublished || new Date().toISOString(),
    dateModified: options?.dateModified || new Date().toISOString(),
    articleSection: options?.category || 'Pet Care',
    keywords: options?.keywords?.join(', ') || getLocalizedKeywords(locale).join(', '),
    inLanguage: locale === 'fr' ? 'fr-CA' : 'en-CA',
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

  // Filter valid social links (must be URLs)
  const validSocialLinks = Object.values(SOCIAL_LINKS).filter(
    (url): url is string => typeof url === 'string' && url.startsWith('http')
  );

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${baseUrl}/#organization`,
    name: SITE_NAME,
    url: baseUrl,
    logo: `${baseUrl}/images/Logos/purrify-logo.png`,
    image: `${baseUrl}/images/Logos/purrify-logo.png`,
    description: getLocalizedContent(SEO_TRANSLATIONS.organizationDescription, locale),
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Mirabel',
      addressRegion: 'QC',
      postalCode: 'J7J 0T6',
      addressCountry: 'CA'
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: CONTACT_INFO.phoneInternational,
        email: CONTACT_INFO.email,
        contactType: 'customer service',
        areaServed: ['CA', 'US'],
        availableLanguage: ['English', 'French']
      }
    ],
    sameAs: validSocialLinks,
    knowsAbout: getLocalizedKeywords(locale),
  };
};

// Generate breadcrumb schema with localization
export const generateBreadcrumbSchema = (path: string, localeInput: string) => {
  const locale = normalizeLocale(localeInput);
  const pathSegments = path.split('/').filter(segment => segment !== '' && segment !== locale);
  const baseUrl = 'https://www.purrify.ca';

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
    itemListElement: breadcrumbs.map((breadcrumb, index) => {
      // Ensure the URL is absolute
      const itemUrl = breadcrumb.url.startsWith('http')
        ? breadcrumb.url
        : `${baseUrl}${breadcrumb.url}`;

      return {
        '@type': 'ListItem',
        position: index + 1,
        name: breadcrumb.name,
        item: itemUrl
      };
    })
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
    inLanguage: locale === 'fr' ? 'fr-CA' : 'en-CA',
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
export const generateOfferSchema = (product: Product, localeInput: string, currency: string = 'CAD') => {
  const locale = normalizeLocale(localeInput);
  const localizedUrl = getLocalizedUrl(`/products/${product.id}`, locale);

  return {
    '@type': 'Offer',
    price: product.price.toFixed(2),
    priceCurrency: currency,
    availability: buildAvailabilityUrl(),
    url: localizedUrl,
    seller: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: 'https://www.purrify.ca'
    },
    priceValidUntil: getPriceValidityDate(),
    itemCondition: 'https://schema.org/NewCondition',
    eligibleRegion: [
      { '@type': 'Country', name: 'CA' },
      { '@type': 'Country', name: 'US' }
    ],
    shippingDetails: {
      '@type': 'OfferShippingDetails',
      shippingDestination: [
        { '@type': 'DefinedRegion', addressCountry: 'CA' },
        { '@type': 'DefinedRegion', addressCountry: 'US' }
      ],
      shippingRate: {
        '@type': 'MonetaryAmount',
        value: '0',
        currency: currency
      },
      deliveryTime: {
        '@type': 'ShippingDeliveryTime',
        handlingTime: {
          '@type': 'QuantitativeValue',
          minValue: 1,
          maxValue: 2,
          unitCode: 'DAY'
        },
        transitTime: {
          '@type': 'QuantitativeValue',
          minValue: 3,
          maxValue: 7,
          unitCode: 'DAY'
        }
      }
    }
  };
};

// Generate local business schema for city pages
export const generateLocalBusinessSchema = (cityName: string, province: string, localeInput: string, currency: string = 'CAD') => {
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
    logo: 'https://www.purrify.ca/images/Logos/purrify-logo.png',
    image: 'https://www.purrify.ca/images/Logos/purrify-logo.png',
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
      availableLanguage: locale === 'fr' ? 'French' : 'English'
    },
    openingHoursSpecification: Object.entries(CONTACT_INFO.hours)
      .filter(([, hours]) => hours !== 'Closed')
      .map(([day, hours]) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: day.charAt(0).toUpperCase() + day.slice(1),
        opens: hours.split(' - ')[0],
        closes: hours.split(' - ')[1]
      })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Cat Litter Odor Control Products',
      itemListElement: PRODUCTS.map(product => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Product',
          name: product.name,
          description: product.description.split('\n')[0]
        },
        price: getProductPrice(product.id as typeof PRODUCTS[number]['id'], currency as Currency).toFixed(2),
        priceCurrency: currency
      }))
    },
    priceRange: getPriceRange(currency as Currency, locale).formatted
  };
};

// Generate review schema - removed to fix ESLint issues
// This functionality can be implemented when testimonials constants are properly typed

// Generate comprehensive homepage schema
export const generateHomepageSchema = (localeInput: string, currency: string = 'CAD') => {
  const locale = normalizeLocale(localeInput);
  const baseUrl = 'https://www.purrify.ca';

  return {
    '@context': 'https://schema.org',
    '@graph': [
      // Website Schema
      stripContext(generateWebsiteSchema(locale)),

      // Organization Schema
      stripContext(generateOrganizationSchema(locale)),

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
            offers: generateOfferSchema(product, locale, currency),
            hasMerchantReturnPolicy: {
              '@type': 'MerchantReturnPolicy',
              applicableCountry: ['CA', 'US'],
              returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
              merchantReturnDays: 30,
              returnMethod: 'https://schema.org/ReturnByMail',
              returnFees: 'https://schema.org/FreeReturn'
            }
          }
        }))
      },

      // FAQ Schema for homepage FAQ section
      stripContext(generateFAQSchema(locale))
    ]
  };
};

// Generate complete product page schema
export const generateProductPageSchema = (productId: string, localeInput: string, currency: string = 'CAD') => {
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
          logo: `${baseUrl}/images/Logos/purrify-logo.png`
        },
        manufacturer: {
          '@type': 'Organization',
          name: SITE_NAME,
          url: baseUrl
        },
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
        offers: generateOfferSchema(product, locale, currency),
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
        hasMerchantReturnPolicy: {
          '@type': 'MerchantReturnPolicy',
          applicableCountry: ['CA', 'US'],
          returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
          merchantReturnDays: 30,
          returnMethod: 'https://schema.org/ReturnByMail',
          returnFees: 'https://schema.org/FreeReturn'
        }
      },

      // Breadcrumb Schema
      stripContext(generateBreadcrumbSchema(`/products/${productId}`, locale))
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

  // Ensure headline doesn't exceed 110 characters
  const headline = title?.length > 110 ? title.substring(0, 107) + '...' : title;

  // Ensure dates are in ISO 8601 format
  const now = new Date().toISOString();
  const datePublished = options?.datePublished
    ? (options.datePublished.includes('T') ? options.datePublished : new Date(options.datePublished).toISOString())
    : now;
  const dateModified = options?.dateModified
    ? (options.dateModified.includes('T') ? options.dateModified : new Date(options.dateModified).toISOString())
    : datePublished;

  // Build article schema with required properties for Google Rich Results
  const articleSchema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': url,
    headline,
    description,
    url,
    image: options?.image || `${baseUrl}/images/Logos/purrify-logo.png`,
    author: {
      '@type': 'Person',
      name: options?.author || 'Dr. Sarah Chen',
      jobTitle: 'Veterinary Consultant',
      url: 'https://www.purrify.ca/about/our-story/'
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/Logos/purrify-logo.png`,
        width: 400,
        height: 400
      }
    },
    datePublished,
    dateModified,
    inLanguage: locale === 'fr' ? 'fr-CA' : 'en-CA',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url
    },
  };

  // Only add optional fields if they have values
  if (options?.category) articleSchema.articleSection = options.category;
  if (options?.keywords?.length) articleSchema.keywords = options.keywords.join(', ');
  if (options?.wordCount) articleSchema.wordCount = options.wordCount;
  if (options?.readingTime) articleSchema.timeRequired = `PT${options.readingTime}M`;

  // Return only the article schema (not @graph) for cleaner markup
  // Breadcrumb should be added separately at page level if needed
  return articleSchema;
};

// Generate location page schema
export const generateLocationPageSchema = (cityName: string, province: string, localeInput: string, currency: string = 'CAD') => {
  const locale = normalizeLocale(localeInput);
  const url = getLocalizedUrl(`/locations/${cityName.toLowerCase()}`, locale);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      // Local Business Schema
      generateLocalBusinessSchema(cityName, province, locale, currency),

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
        offers: PRODUCTS.map(product => generateOfferSchema(product, locale, currency))
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
