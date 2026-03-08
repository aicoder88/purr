import { SITE_NAME, SITE_URL } from '@/lib/constants';
import { getLocalizedUrl, normalizeLocale, stripContext } from '@/lib/seo-utils';

type SchemaLocale = 'en' | 'fr';

export interface IndexedBreadcrumbItem {
  name: string;
  path: string;
}

export interface IndexedFaqItem {
  question: string;
  answer: string;
}

interface BaseSchemaOptions {
  locale: string;
  path: string;
  title: string;
  description: string;
  image?: string;
}

interface ArticleSchemaOptions extends BaseSchemaOptions {
  datePublished?: string;
  dateModified?: string;
  section?: string;
  keywords?: string[];
  wordCount?: number;
}

function toSchemaLocale(locale: string): SchemaLocale {
  return normalizeLocale(locale);
}

function toSchemaLanguage(locale: string) {
  return toSchemaLocale(locale) === 'fr' ? 'fr-CA' : 'en-CA';
}

function toAbsolutePath(path: string, locale: string) {
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  return getLocalizedUrl(path, locale);
}

export function createIndexedWebPageSchema({
  locale,
  path,
  title,
  description,
  image,
  type = 'WebPage',
}: BaseSchemaOptions & { type?: 'WebPage' | 'CollectionPage' }) {
  const url = toAbsolutePath(path, locale);
  const pageSchema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': type,
    '@id': url,
    url,
    name: title,
    description,
    inLanguage: toSchemaLanguage(locale),
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
    },
  };

  if (image) {
    pageSchema.primaryImageOfPage = {
      '@type': 'ImageObject',
      url: image,
    };
  }

  return pageSchema;
}

export function createIndexedArticleSchema({
  locale,
  path,
  title,
  description,
  image,
  datePublished,
  dateModified,
  section,
  keywords,
  wordCount,
}: ArticleSchemaOptions) {
  const url = toAbsolutePath(path, locale);
  const articleSchema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${url}#article`,
    url,
    headline: title,
    description,
    inLanguage: toSchemaLanguage(locale),
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: `${SITE_URL}/`,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/optimized/logos/purrify-logo.png`,
        width: 400,
        height: 400,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };

  if (image) {
    articleSchema.image = image;
  }

  if (datePublished) {
    articleSchema.datePublished = datePublished;
  }

  if (dateModified) {
    articleSchema.dateModified = dateModified;
  }

  if (section) {
    articleSchema.articleSection = section;
  }

  if (keywords?.length) {
    articleSchema.keywords = keywords.join(', ');
  }

  if (wordCount) {
    articleSchema.wordCount = wordCount;
  }

  return articleSchema;
}

export function createBreadcrumbSchema(locale: string, items: IndexedBreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: toAbsolutePath(item.path, locale),
    })),
  };
}

export function createFaqSchema(items: IndexedFaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function serializeSchemaGraph(...schemas: Array<Record<string, unknown> | null | undefined>) {
  const graph = schemas.filter(Boolean).map((schema) => stripContext(schema)) as Record<string, unknown>[];

  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': graph,
  });
}
