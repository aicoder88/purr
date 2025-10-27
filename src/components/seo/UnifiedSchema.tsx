import React from 'react';
import Script from 'next/script';
import { SITE_NAME, SITE_DESCRIPTION, CONTACT_INFO, SOCIAL_LINKS } from '../../lib/constants';
import { useTranslation } from '../../lib/translation-context';
import { buildAvailabilityUrl, getPriceValidityDate } from '../../lib/seo-utils';

// Type definitions for page data
interface ProductData {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  availability?: string;
  rating?: number;
  reviewCount?: number;
}

interface ArticleData {
  headline: string;
  description: string;
  image: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  keywords?: string[];
}

interface FAQItem {
  question: string;
  answer: string;
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface UnifiedSchemaProps {
  pageType?: 'home' | 'product' | 'article' | 'faq' | 'location' | 'default';
  product?: ProductData;
  article?: ArticleData;
  faqs?: FAQItem[];
  breadcrumbs?: BreadcrumbItem[];
  includeOrganization?: boolean;
  includeWebsite?: boolean;
}

/**
 * Unified Schema Component
 * Consolidates all structured data into a single, efficient component
 * Replaces: comprehensive-structured-data, enhanced-structured-data,
 *           AdvancedStructuredData, json-ld-schema, and others
 */
export const UnifiedSchema: React.FC<UnifiedSchemaProps> = ({
  pageType = 'default',
  product,
  article,
  faqs,
  breadcrumbs,
  includeOrganization = true,
  includeWebsite = true,
}) => {
  const { locale } = useTranslation();
  const baseUrl = `https://www.purrify.ca${locale === 'fr' ? '/fr' : locale === 'zh' ? '/zh' : ''}`;
  const mainUrl = 'https://www.purrify.ca';

  // Build the @graph array with all schemas
  const graphSchemas: any[] = [];

  // 1. Organization Schema (always include on all pages for brand consistency)
  if (includeOrganization) {
    graphSchemas.push({
      '@type': 'Organization',
      '@id': `${mainUrl}/#organization`,
      name: SITE_NAME,
      url: mainUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${mainUrl}/purrify-logo.png`,
        width: 512,
        height: 512,
      },
      description: SITE_DESCRIPTION,
      foundingDate: '2023',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Mirabel',
        addressRegion: 'QC',
        postalCode: 'J7J 0T6',
        addressCountry: 'CA',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: CONTACT_INFO.phoneInternational,
        contactType: 'customer service',
        email: CONTACT_INFO.email,
        areaServed: ['CA', 'US'],
        availableLanguage: ['English', 'French', 'Chinese'],
      },
      sameAs: [
        SOCIAL_LINKS.facebook,
        SOCIAL_LINKS.instagram,
        SOCIAL_LINKS.x,
      ].filter(Boolean),
    });
  }

  // 2. Website Schema
  if (includeWebsite) {
    graphSchemas.push({
      '@type': 'WebSite',
      '@id': `${mainUrl}/#website`,
      url: mainUrl,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      publisher: {
        '@id': `${mainUrl}/#organization`,
      },
      inLanguage: locale === 'fr' ? 'fr-CA' : locale === 'zh' ? 'zh-CN' : 'en-CA',
    });
  }

  // 3. Product Schema (for product pages)
  if (product) {
    graphSchemas.push({
      '@type': 'Product',
      '@id': `${mainUrl}/products/${product.id}#product`,
      name: product.name,
      description: product.description,
      image: product.image,
      brand: {
        '@type': 'Brand',
        name: SITE_NAME,
      },
      offers: {
        '@type': 'Offer',
        url: `${mainUrl}/products/${product.id}`,
        priceCurrency: 'CAD',
        price: product.price.toFixed(2),
        availability: product.availability || buildAvailabilityUrl(),
        priceValidUntil: getPriceValidityDate(),
        seller: {
          '@id': `${mainUrl}/#organization`,
        },
      },
      ...(product.rating && product.reviewCount && {
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: product.rating,
          reviewCount: product.reviewCount,
          bestRating: 5,
          worstRating: 1,
        },
      }),
    });
  }

  // 4. Article Schema (for blog posts)
  if (article) {
    graphSchemas.push({
      '@type': 'Article',
      headline: article.headline,
      description: article.description,
      image: article.image,
      author: {
        '@type': 'Person',
        name: article.author,
      },
      publisher: {
        '@id': `${mainUrl}/#organization`,
      },
      datePublished: article.datePublished,
      dateModified: article.dateModified || article.datePublished,
      ...(article.keywords && {
        keywords: article.keywords.join(', '),
      }),
    });
  }

  // 5. FAQ Schema (for FAQ pages or pages with FAQs)
  if (faqs && faqs.length > 0) {
    graphSchemas.push({
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    });
  }

  // 6. Breadcrumb Schema (if breadcrumbs provided)
  if (breadcrumbs && breadcrumbs.length > 0) {
    graphSchemas.push({
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: `${mainUrl}${crumb.url}`,
      })),
    });
  }

  // 7. LocalBusiness Schema (for location pages)
  if (pageType === 'location') {
    graphSchemas.push({
      '@type': 'LocalBusiness',
      '@id': `${baseUrl}#localbusiness`,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      url: baseUrl,
      telephone: CONTACT_INFO.phoneInternational,
      email: CONTACT_INFO.email,
      priceRange: '$-$$',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Mirabel',
        addressRegion: 'QC',
        addressCountry: 'CA',
      },
    });
  }

  // Combine all schemas into a single @graph
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': graphSchemas,
  };

  return (
    <Script
      id="unified-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      strategy="beforeInteractive"
    />
  );
};

// Export a simple hook for backward compatibility
export const useUnifiedSchema = () => {
  return { locale: useTranslation().locale };
};
