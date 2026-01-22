/**
 * useEnhancedSEO Hook
 * Provides optimized SEO data to components with automatic i18n and currency handling
 */

import { useTranslation } from '../lib/translation-context';
import { useCurrency } from '../lib/currency-context';
import { optimizeMetaTitle, optimizeMetaDescription } from '../lib/seo/meta-optimizer';
import { getLocalizedUrl, buildLanguageAlternates } from '../lib/seo-utils';
import { SITE_NAME } from '../lib/constants';
import { useBreadcrumb, type BreadcrumbItem } from './useBreadcrumb';

export interface SEOConfig {
  path: string;
  title: string;
  description: string;
  targetKeyword?: string;
  schemaType?: 'product' | 'article' | 'faq' | 'location' | 'organization';
  schemaData?: Record<string, any>;
  image?: string;
  keywords?: string[];
  noindex?: boolean;
  nofollow?: boolean;
  includeBreadcrumb?: boolean;
}

export interface EnhancedSEOResult {
  nextSeoProps: {
    title: string;
    description: string;
    canonical: string;
    languageAlternates: Array<{ hrefLang: string; href: string }>;
    openGraph: {
      type: string;
      url: string;
      title: string;
      description: string;
      locale: string;
      images: Array<{
        url: string;
        width?: number;
        height?: number;
        alt: string;
      }>;
    };
    twitter: {
      cardType: string;
      handle?: string;
      site?: string;
    };
    additionalMetaTags: ReadonlyArray<{
      name: string;
      content: string;
    }>;
    noindex?: boolean;
    nofollow?: boolean;
  };
  schema: object | null;
  breadcrumb?: {
    items: BreadcrumbItem[];
    schema: object;
  };
  meta: {
    titleLength: number;
    descriptionLength: number;
    isTitleTruncated: boolean;
    isDescriptionTruncated: boolean;
    titleWarnings: string[];
    descriptionWarnings: string[];
  };
}

/**
 * Generate Open Graph image data
 */
function generateOGImage(image: string | undefined, title: string): Array<{
  url: string;
  width?: number;
  height?: number;
  alt: string;
}> {
  const defaultImage = 'https://www.purrify.ca/purrify-logo.png';
  const imageUrl = image || defaultImage;

  return [
    {
      url: imageUrl,
      width: 1200,
      height: 800,
      alt: title,
    },
  ];
}

/**
 * Generate locale string for Open Graph
 */
function getOGLocale(locale: string): string {
  const localeMap: Record<string, string> = {
    en: 'en_CA',
    fr: 'fr_CA',
    zh: 'zh_CN',
    es: 'es_ES',
  };

  return localeMap[locale] || 'en_CA';
}

/**
 * Enhanced SEO Hook
 * Provides optimized SEO props with automatic i18n, currency, breadcrumb, and schema support
 */
export function useEnhancedSEO(config: SEOConfig): EnhancedSEOResult {
  const { t, locale } = useTranslation();
  const { currency } = useCurrency();

  // Optimize meta content
  const optimizedTitle = optimizeMetaTitle(config.title, config.targetKeyword);
  const optimizedDescription = optimizeMetaDescription(
    config.description,
    config.targetKeyword
  );

  // Build canonical and alternates
  const canonicalUrl = getLocalizedUrl(config.path, locale);
  const languageAlternates = buildLanguageAlternates(config.path);

  // Always call hook to follow React rules, then conditionally use result
  const breadcrumbResult = useBreadcrumb(config.path);
  const breadcrumbData = config.includeBreadcrumb ? breadcrumbResult : undefined;

  // Build NextSeo props
  const nextSeoProps = {
    title: optimizedTitle.title,
    description: optimizedDescription.description,
    canonical: canonicalUrl,
    languageAlternates,
    openGraph: {
      type: config.schemaType === 'article' ? 'article' : 'website',
      url: canonicalUrl,
      title: optimizedTitle.title,
      description: optimizedDescription.description,
      locale: getOGLocale(locale),
      images: generateOGImage(config.image, optimizedTitle.title),
    },
    twitter: {
      cardType: 'summary_large_image',
      handle: '@purrifyhq',
      site: '@purrifyhq',
    },
    additionalMetaTags: [
      ...(config.keywords
        ? [
            {
              name: 'keywords',
              content: config.keywords.join(', '),
            },
          ]
        : []),
      {
        name: 'author',
        content: SITE_NAME,
      },
    ],
    noindex: config.noindex,
    nofollow: config.nofollow,
  };

  // Generate main schema (if specified)
  let schema: object | null = null;
  if (config.schemaType && config.schemaData) {
    const mainSchema = generateSchema(
      config.schemaType,
      config.schemaData,
      canonicalUrl,
      locale,
      currency
    );

    // If breadcrumb is requested, combine schemas using @graph
    if (breadcrumbData) {
      schema = {
        '@context': 'https://schema.org',
        '@graph': [mainSchema, breadcrumbData.schema],
      };
    } else {
      schema = mainSchema;
    }
  } else if (breadcrumbData) {
    // Only breadcrumb schema, no main schema
    schema = breadcrumbData.schema;
  }

  return {
    nextSeoProps,
    schema,
    breadcrumb: breadcrumbData,
    meta: {
      titleLength: optimizedTitle.length,
      descriptionLength: optimizedDescription.length,
      isTitleTruncated: optimizedTitle.isTruncated,
      isDescriptionTruncated: optimizedDescription.isTruncated,
      titleWarnings: optimizedTitle.warnings,
      descriptionWarnings: optimizedDescription.warnings,
    },
  };
}

/**
 * Generate structured data schema based on type
 */
function generateSchema(
  type: string,
  data: Record<string, any>,
  url: string,
  locale: string,
  currency: string
): object {
  const baseSchema = {
    '@context': 'https://schema.org',
    '@id': url,
    url,
    inLanguage: locale === 'fr' ? 'fr-CA' : locale === 'zh' ? 'zh-CN' : 'en-CA',
  };

  switch (type) {
    case 'product':
      return {
        ...baseSchema,
        '@type': 'Product',
        name: data.name,
        description: data.description,
        image: data.image,
        brand: {
          '@type': 'Brand',
          name: SITE_NAME,
        },
        offers: {
          '@type': 'Offer',
          url,
          priceCurrency: currency,
          price: data.price,
          priceValidUntil: data.priceValidUntil,
          availability: data.availability || 'https://schema.org/InStock',
          itemCondition: 'https://schema.org/NewCondition',
        },
        aggregateRating: data.rating
          ? {
              '@type': 'AggregateRating',
              ratingValue: data.rating.value,
              reviewCount: data.rating.count,
              bestRating: 5,
              worstRating: 1,
            }
          : undefined,
      };

    case 'article':
      return {
        ...baseSchema,
        '@type': 'Article',
        headline: data.headline,
        description: data.description,
        image: data.image,
        datePublished: data.datePublished,
        dateModified: data.dateModified || new Date().toISOString(),
        author: {
          '@type': 'Organization',
          name: SITE_NAME,
          url: 'https://www.purrify.ca',
        },
        publisher: {
          '@type': 'Organization',
          name: SITE_NAME,
          logo: {
            '@type': 'ImageObject',
            url: 'https://www.purrify.ca/purrify-logo.png',
            width: 400,
            height: 400,
          },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': url,
        },
        articleSection: data.category,
        keywords: data.keywords,
        wordCount: data.wordCount,
      };

    case 'faq':
      return {
        ...baseSchema,
        '@type': 'FAQPage',
        mainEntity: data.questions.map((q: { question: string; answer: string }) => ({
          '@type': 'Question',
          name: q.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: q.answer,
          },
        })),
      };

    case 'location':
      return {
        ...baseSchema,
        '@type': 'LocalBusiness',
        name: data.name,
        description: data.description,
        address: {
          '@type': 'PostalAddress',
          streetAddress: data.address?.street,
          addressLocality: data.address?.city,
          addressRegion: data.address?.region,
          postalCode: data.address?.postalCode,
          addressCountry: data.address?.country || 'CA',
        },
        geo: data.geo
          ? {
              '@type': 'GeoCoordinates',
              latitude: data.geo.lat,
              longitude: data.geo.lng,
            }
          : undefined,
        telephone: data.phone,
        priceRange: data.priceRange,
      };

    case 'organization':
      return {
        ...baseSchema,
        '@type': 'Organization',
        name: SITE_NAME,
        description: data.description,
        url: 'https://www.purrify.ca',
        logo: {
          '@type': 'ImageObject',
          url: 'https://www.purrify.ca/purrify-logo.png',
          width: 400,
          height: 400,
        },
        sameAs: data.socialLinks || [],
        contactPoint: data.contactPoint
          ? {
              '@type': 'ContactPoint',
              telephone: data.contactPoint.telephone,
              contactType: data.contactPoint.type || 'customer support',
              email: data.contactPoint.email,
            }
          : undefined,
      };

    default:
      return baseSchema;
  }
}
