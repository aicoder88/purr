/**
 * useEnhancedSEO Hook
 * Provides optimized SEO data to components with automatic i18n and currency handling
 * GEO (Generative Engine Optimization) compliant with ClaimReview and expert author schemas
 */

import { useTranslation } from '../lib/translation-context';
import { useCurrency } from '../lib/currency-context';
import { optimizeMetaTitle, optimizeMetaDescription } from '../lib/seo/meta-optimizer';
import { getLocalizedUrl, buildLanguageAlternates } from '../lib/seo-utils';
import { SITE_NAME } from '../lib/constants';
import {
  getClaimReviewSchema,
  type ScientificCitation
} from '../lib/scientific-citations';

export interface SEOConfig {
  path: string;
  title: string;
  description: string;
  targetKeyword?: string;
  schemaType?: 'product' | 'article' | 'faq' | 'location' | 'organization' | 'howto' | 'claimReview' | 'comparison';
  schemaData?: Record<string, any>;
  image?: string;
  keywords?: string[];
  noindex?: boolean;
  nofollow?: boolean;
  /** Include expert author schema for AI citation optimization (legacy) */
  includeExpertAuthor?: boolean;
  /** Include Veterinary Science Advisor schema for GEO compliance (Deprecated) */
  includeVeterinaryAdvisor?: boolean;
  /** Claims to generate ClaimReview schema for */
  claims?: string[];
  /** Scientific citations to include in the article schema */
  citations?: ScientificCitation[];
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export interface BreadcrumbData {
  items: BreadcrumbItem[];
  schema: object;
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
  /** Additional schemas (e.g., expert author, claim reviews) - render all in page head */
  additionalSchemas: object[];
  /** Breadcrumb data - currently not implemented, returns undefined */
  breadcrumb: BreadcrumbData | undefined;
  meta: {
    titleLength: number;
    descriptionLength: number;
    isTitleTruncated: boolean;
    isDescriptionTruncated: boolean;
    titleWarnings: string[];
    descriptionWarnings: string[];
  };
  /** Veterinary Science Advisor JSON-LD schema (Deprecated) */
  veterinaryAdvisorSchema: object | null;
  /** ClaimReview schemas for factual claims */
  claimReviewSchemas: object[];
  /** SpeakableSpecification schema for voice assistants */
  speakableSchema: object | null;
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
  const defaultImage = 'https://www.purrify.ca/images/Logos/purrify-logo.png';
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
 * Provides optimized SEO props with automatic i18n, currency, and schema support
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

  // Generate schema (if specified)
  let schema: object | null = null;
  if (config.schemaType && config.schemaData) {
    schema = generateSchema(
      config.schemaType,
      config.schemaData,
      canonicalUrl,
      locale,
      currency
    );
  }

  // Generate additional schemas
  const additionalSchemas: object[] = [];
  const claimReviewSchemas: object[] = [];

  // Add expert author schema if requested (legacy)
  if (config.includeExpertAuthor) {
    additionalSchemas.push(generateExpertAuthorSchema());
  }

  // Add Veterinary Science Advisor schema if requested (GEO)
  // Veterinary Science Advisor schema removed (Deprecated)
  if (config.includeVeterinaryAdvisor) {
    // No-op
  }

  // Generate ClaimReview schemas for specified claims
  if (config.claims && config.claims.length > 0) {
    config.claims.forEach(claim => {
      const claimSchema = getClaimReviewSchema(claim, canonicalUrl);
      if (claimSchema) {
        claimReviewSchemas.push(claimSchema);
        additionalSchemas.push(claimSchema);
      }
    });
  }

  // Generate SpeakableSpecification schema for voice assistants
  const speakableSchema = generateSpeakableSchema(canonicalUrl);
  additionalSchemas.push(speakableSchema);

  return {
    nextSeoProps,
    schema,
    additionalSchemas,
    breadcrumb: undefined, // Not implemented - breadcrumbs should be handled per-page
    meta: {
      titleLength: optimizedTitle.length,
      descriptionLength: optimizedDescription.length,
      isTitleTruncated: optimizedTitle.isTruncated,
      isDescriptionTruncated: optimizedDescription.isTruncated,
      titleWarnings: optimizedTitle.warnings,
      descriptionWarnings: optimizedDescription.warnings,
    },
    veterinaryAdvisorSchema: null,
    claimReviewSchemas,
    speakableSchema,
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
    case 'product': {
      const productSchema: Record<string, unknown> = {
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
      };
      // Only add aggregateRating if rating data is provided
      if (data.rating && data.rating.value && data.rating.count) {
        productSchema.aggregateRating = {
          '@type': 'AggregateRating',
          ratingValue: data.rating.value.toString(),
          reviewCount: data.rating.count.toString(),
          bestRating: '5',
          worstRating: '1',
        };
      }
      return productSchema;
    }

    case 'article': {
      // Ensure headline doesn't exceed 110 characters for Google guidelines
      const headline = data.headline?.length > 110 
        ? data.headline.substring(0, 107) + '...' 
        : data.headline;
      
      const articleSchema: Record<string, unknown> = {
        ...baseSchema,
        '@type': 'Article',
        headline,
        description: data.description,
        image: data.image || 'https://www.purrify.ca/images/Logos/purrify-logo.png',
        datePublished: data.datePublished || new Date().toISOString(),
        dateModified: data.dateModified || data.datePublished || new Date().toISOString(),
        author: {
          '@type': 'Organization',
          name: SITE_NAME,
          url: 'https://www.purrify.ca',
        },
        publisher: {
          '@type': 'Organization',
          name: SITE_NAME,
          url: 'https://www.purrify.ca',
          logo: {
            '@type': 'ImageObject',
            url: 'https://www.purrify.ca/images/Logos/purrify-logo.png',
            width: 400,
            height: 400,
          },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': url,
        },
      };
      
      // Add optional fields only if provided
      if (data.category) articleSchema.articleSection = data.category;
      if (data.keywords) articleSchema.keywords = data.keywords;
      if (data.wordCount) articleSchema.wordCount = data.wordCount;
      
      // Include scientific citations if provided
      if (data.citations?.length) {
        articleSchema.citation = data.citations.map((citation: ScientificCitation) => ({
          '@type': 'ScholarlyArticle',
          headline: citation.title,
          author: citation.authors,
          datePublished: citation.year,
          isPartOf: {
            '@type': 'Periodical',
            name: citation.journal,
          },
          identifier: citation.doi || citation.pmid,
          url: citation.url,
        }));
      }
      
      return articleSchema;
    }

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
          url: 'https://www.purrify.ca/images/Logos/purrify-logo.png',
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

    case 'howto':
      return {
        ...baseSchema,
        '@type': 'HowTo',
        name: data.name,
        description: data.description,
        image: data.image,
        totalTime: data.totalTime,
        step: data.steps?.map((step: { name: string; text: string; image?: string }, index: number) => ({
          '@type': 'HowToStep',
          position: index + 1,
          name: step.name,
          text: step.text,
          image: step.image,
        })),
      };

    case 'claimReview':
      return {
        ...baseSchema,
        '@type': 'ClaimReview',
        claimReviewed: data.claim,
        reviewRating: {
          '@type': 'Rating',
          ratingValue: data.rating,
          bestRating: 5,
          worstRating: 1,
          alternateName: data.ratingLabel || getRatingLabel(data.rating),
        },
        author: {
          '@type': 'Organization',
          name: SITE_NAME,
          url: 'https://www.purrify.ca',
        },
        datePublished: data.datePublished || new Date().toISOString(),
        itemReviewed: data.claimAuthor
          ? {
            '@type': 'Claim',
            author: {
              '@type': 'Organization',
              name: data.claimAuthor,
            },
          }
          : undefined,
      };

    case 'comparison':
      // Comparison pages use multiple ClaimReview schemas - return array
      if (data.claims && Array.isArray(data.claims)) {
        return data.claims.map((claim: { claim: string; rating: number; ratingLabel?: string }) => ({
          '@context': 'https://schema.org',
          '@type': 'ClaimReview',
          claimReviewed: claim.claim,
          reviewRating: {
            '@type': 'Rating',
            ratingValue: claim.rating,
            bestRating: 5,
            worstRating: 1,
            alternateName: claim.ratingLabel || getRatingLabel(claim.rating),
          },
          url,
          author: {
            '@type': 'Organization',
            name: SITE_NAME,
            url: 'https://www.purrify.ca',
          },
          datePublished: data.datePublished || new Date().toISOString(),
        }));
      }
      return baseSchema;

    default:
      return baseSchema;
  }
}

/**
 * Get human-readable rating label
 */
function getRatingLabel(rating: number): string {
  const labels: Record<number, string> = {
    1: 'False',
    2: 'Mostly False',
    3: 'Mixed',
    4: 'Mostly True',
    5: 'True',
  };
  return labels[rating] || 'Unknown';
}

/**
 * Generate Purrify Research Team expert author schema
 * Use for AI citation optimization
 */
function generateExpertAuthorSchema(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Purrify Research Team',
    url: 'https://www.purrify.ca/about/our-story',
    description:
      'Expert team specializing in activated carbon science and pet odor chemistry. We research and develop natural solutions for cat litter odor control.',
    knowsAbout: [
      'Activated Carbon Science',
      'Cat Litter Odor Chemistry',
      'Pet Care Science',
      'Ammonia Adsorption',
      'Natural Pet Products',
    ],
    memberOf: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: 'https://www.purrify.ca',
    },
    sameAs: ['https://www.instagram.com/purrifyhq'],
  };
}

/**
 * Generate SpeakableSpecification schema for voice assistants
 * GEO: Enables AI voice assistants to cite key content
 */
function generateSpeakableSchema(url: string): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': url,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.key-takeaway', '.faq-answer', '.article-summary', 'h1', 'h2'],
      xpath: [
        '/html/head/title',
        "//p[contains(@class, 'key-takeaway')]",
        "//div[contains(@class, 'faq-answer')]",
        "//p[contains(@class, 'article-summary')]",
      ],
    },
  };
}
