/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Metadata } from 'next';
import type { Locale } from '@/i18n/config';
import { SITE_NAME, SITE_URL } from '@/lib/constants';
import {
  COMPARISON_ENTRIES,
  COMPARISON_LAB_BASE_PATH,
  COMPARISON_LAB_METHODOLOGY_PATH,
  type ComparisonEntry,
  getComparisonPath,
} from '@/lib/comparison-lab/data';
import { localizePath } from '@/lib/i18n/locale-path';
import { stripContext } from '@/lib/seo-utils';
import { getTranslation } from '@/translations';

type FAQItem = {
  question?: string;
  answer?: string;
};

function asRecord(value: unknown): Record<string, any> {
  return typeof value === 'object' && value !== null ? (value as Record<string, any>) : {};
}

function getComparisonLabCopy(locale: Locale): Record<string, any> {
  return asRecord(getTranslation(locale).comparisonLab);
}

function toAbsoluteUrl(path: string, locale: Locale): string {
  const localizedPath = localizePath(path, locale).replace(/\/$/, '');
  return `${SITE_URL}${localizedPath}/`;
}

function buildBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return stripContext({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  });
}

function buildFaqSchema(items: FAQItem[]) {
  if (items.length === 0) {
    return null;
  }

  return stripContext({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items
      .filter((item) => item.question && item.answer)
      .map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
  });
}

export function getComparisonLabMetadata(locale: Locale): Metadata {
  const comparisonLab = getComparisonLabCopy(locale);
  const hub = (comparisonLab.hub ?? {}) as Record<string, string>;
  const canonicalUrl = toAbsoluteUrl(COMPARISON_LAB_BASE_PATH, locale);
  const imageUrl = `${SITE_URL}/optimized/blog/activated-carbon-vs-baking-soda-comparison.webp`;

  return {
    title: hub.metaTitle,
    description: hub.metaDescription,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en-CA': toAbsoluteUrl(COMPARISON_LAB_BASE_PATH, 'en'),
        'fr-CA': toAbsoluteUrl(COMPARISON_LAB_BASE_PATH, 'fr'),
        'x-default': toAbsoluteUrl(COMPARISON_LAB_BASE_PATH, 'en'),
      },
    },
    openGraph: {
      type: 'website',
      url: canonicalUrl,
      siteName: SITE_NAME,
      title: hub.metaTitle,
      description: hub.metaDescription,
      locale: locale === 'fr' ? 'fr_CA' : 'en_CA',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: hub.metaImageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: hub.metaTitle,
      description: hub.metaDescription,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export function getComparisonLabGraph(locale: Locale): Record<string, unknown>[] {
  const comparisonLab = getComparisonLabCopy(locale);
  const shared = asRecord(comparisonLab.shared);
  const hub = asRecord(comparisonLab.hub);
  const faqItems = Array.isArray(hub.faq) ? (hub.faq as FAQItem[]) : [];
  const breadcrumbItems = [
    { name: (shared.breadcrumbHome as string | undefined) ?? 'Home', url: SITE_URL },
    { name: (shared.breadcrumbLearn as string | undefined) ?? 'Learn', url: toAbsoluteUrl('/learn', locale) },
    { name: hub.breadcrumbLabel ?? 'Comparison Lab', url: toAbsoluteUrl(COMPARISON_LAB_BASE_PATH, locale) },
  ];

  const collectionPage = stripContext({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: hub.title ?? hub.metaTitle,
    description: hub.metaDescription,
    url: toAbsoluteUrl(COMPARISON_LAB_BASE_PATH, locale),
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: COMPARISON_ENTRIES.map((entry, index) => {
        const pages = asRecord(comparisonLab.pages);
        const pageCopy = asRecord(pages[entry.translationKey]);

        return {
          '@type': 'ListItem',
          position: index + 1,
          url: toAbsoluteUrl(getComparisonPath(entry.slug), locale),
          name: pageCopy.title,
          description: pageCopy.summary,
        };
      }),
    },
  });

  return [collectionPage, buildBreadcrumbSchema(breadcrumbItems), buildFaqSchema(faqItems)].filter(
    Boolean
  ) as Record<string, unknown>[];
}

export function getComparisonMethodologyMetadata(locale: Locale): Metadata {
  const comparisonLab = getComparisonLabCopy(locale);
  const methodology = (comparisonLab.methodology ?? {}) as Record<string, string>;
  const canonicalUrl = toAbsoluteUrl(COMPARISON_LAB_METHODOLOGY_PATH, locale);
  const imageUrl = `${SITE_URL}/optimized/blog/tried-science.avif`;

  return {
    title: methodology.metaTitle,
    description: methodology.metaDescription,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en-CA': toAbsoluteUrl(COMPARISON_LAB_METHODOLOGY_PATH, 'en'),
        'fr-CA': toAbsoluteUrl(COMPARISON_LAB_METHODOLOGY_PATH, 'fr'),
        'x-default': toAbsoluteUrl(COMPARISON_LAB_METHODOLOGY_PATH, 'en'),
      },
    },
    openGraph: {
      type: 'article',
      url: canonicalUrl,
      siteName: SITE_NAME,
      title: methodology.metaTitle,
      description: methodology.metaDescription,
      locale: locale === 'fr' ? 'fr_CA' : 'en_CA',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: methodology.metaImageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: methodology.metaTitle,
      description: methodology.metaDescription,
      images: [imageUrl],
    },
  };
}

export function getComparisonMethodologyGraph(locale: Locale): Record<string, unknown>[] {
  const comparisonLab = getComparisonLabCopy(locale);
  const shared = asRecord(comparisonLab.shared);
  const hub = asRecord(comparisonLab.hub);
  const methodology = asRecord(comparisonLab.methodology);
  const faqItems = Array.isArray(methodology.faq) ? (methodology.faq as FAQItem[]) : [];
  const url = toAbsoluteUrl(COMPARISON_LAB_METHODOLOGY_PATH, locale);

  const articleSchema = stripContext({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: methodology.metaTitle,
    description: methodology.metaDescription,
    url,
    image: `${SITE_URL}/optimized/blog/tried-science.avif`,
    datePublished: '2026-03-07',
    dateModified: '2026-03-07',
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/optimized/logos/purrify-logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  });

  const breadcrumbItems = [
    { name: (shared.breadcrumbHome as string | undefined) ?? 'Home', url: SITE_URL },
    { name: (shared.breadcrumbLearn as string | undefined) ?? 'Learn', url: toAbsoluteUrl('/learn', locale) },
    { name: (hub.breadcrumbLabel as string | undefined) ?? 'Comparison Lab', url: toAbsoluteUrl(COMPARISON_LAB_BASE_PATH, locale) },
    { name: methodology.breadcrumbLabel ?? 'Methodology', url },
  ];

  return [articleSchema, buildBreadcrumbSchema(breadcrumbItems), buildFaqSchema(faqItems)].filter(
    Boolean
  ) as Record<string, unknown>[];
}

export function getComparisonPageMetadata(locale: Locale, entry: ComparisonEntry): Metadata {
  const comparisonLab = getComparisonLabCopy(locale);
  const pageCopy = (comparisonLab.pages?.[entry.translationKey] ?? {}) as Record<string, string>;
  const canonicalUrl = toAbsoluteUrl(getComparisonPath(entry.slug), locale);
  const imageUrl = `${SITE_URL}${entry.heroImage}`;

  return {
    title: pageCopy.metaTitle,
    description: pageCopy.metaDescription,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en-CA': toAbsoluteUrl(getComparisonPath(entry.slug), 'en'),
        'fr-CA': toAbsoluteUrl(getComparisonPath(entry.slug), 'fr'),
        'x-default': toAbsoluteUrl(getComparisonPath(entry.slug), 'en'),
      },
    },
    openGraph: {
      type: 'article',
      url: canonicalUrl,
      siteName: SITE_NAME,
      title: pageCopy.metaTitle,
      description: pageCopy.metaDescription,
      locale: locale === 'fr' ? 'fr_CA' : 'en_CA',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: pageCopy.heroImageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageCopy.metaTitle,
      description: pageCopy.metaDescription,
      images: [imageUrl],
    },
  };
}

export function getComparisonPageGraph(
  locale: Locale,
  entry: ComparisonEntry
): Record<string, unknown>[] {
  const comparisonLab = getComparisonLabCopy(locale);
  const shared = asRecord(comparisonLab.shared);
  const hub = asRecord(comparisonLab.hub);
  const pages = asRecord(comparisonLab.pages);
  const pageCopy = asRecord(pages[entry.translationKey]);
  const faqItems = Array.isArray(pageCopy.faq) ? (pageCopy.faq as FAQItem[]) : [];
  const url = toAbsoluteUrl(getComparisonPath(entry.slug), locale);

  const articleSchema = stripContext({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: pageCopy.metaTitle,
    description: pageCopy.metaDescription,
    url,
    image: `${SITE_URL}${entry.heroImage}`,
    datePublished: entry.publishedAt,
    dateModified: entry.updatedAt,
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/optimized/logos/purrify-logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  });

  const breadcrumbItems = [
    { name: (shared.breadcrumbHome as string | undefined) ?? 'Home', url: SITE_URL },
    { name: (shared.breadcrumbLearn as string | undefined) ?? 'Learn', url: toAbsoluteUrl('/learn', locale) },
    { name: (hub.breadcrumbLabel as string | undefined) ?? 'Comparison Lab', url: toAbsoluteUrl(COMPARISON_LAB_BASE_PATH, locale) },
    { name: pageCopy.title ?? pageCopy.metaTitle, url },
  ];

  return [articleSchema, buildBreadcrumbSchema(breadcrumbItems), buildFaqSchema(faqItems)].filter(
    Boolean
  ) as Record<string, unknown>[];
}
