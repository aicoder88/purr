import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { TaxonomyHubPage } from '@/components/blog/TaxonomyHubPage';
import { ContentStore } from '@/lib/blog/content-store';
import {
  buildTaxonomyHubData,
  CANONICAL_TAG_SLUGS,
  type CanonicalTagSlug,
} from '@/lib/blog/taxonomy';
import { defaultLocale, isValidLocale, locales } from '@/i18n/config';
import { SITE_NAME, SITE_URL } from '@/lib/constants';
import {
  getTaxonomyTerm,
} from '@/translations/blog-taxonomy';

interface TagHubPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export const dynamic = 'force-static';
export const dynamicParams = false;

const tagSlugSet = new Set<string>(CANONICAL_TAG_SLUGS);

const getBlogBasePath = (locale: string) => (
  locale === 'en' ? '/blog' : `/${locale}/blog`
);

const getTagPath = (locale: string, slug: string, trailingSlash = false) => (
  `${getBlogBasePath(locale)}/tag/${slug}${trailingSlash ? '/' : ''}`
);

export async function generateStaticParams() {
  const store = new ContentStore();
  const params: Array<{ locale: string; slug: CanonicalTagSlug }> = [];

  for (const locale of locales.filter((value) => value !== defaultLocale)) {
    const posts = await store.getAllPosts(locale, false, { includeContent: false });

    for (const slug of CANONICAL_TAG_SLUGS) {
      if (buildTaxonomyHubData(posts, 'tag', slug)) {
        params.push({ locale, slug });
      }
    }
  }

  return params;
}

export async function generateMetadata({ params }: TagHubPageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!isValidLocale(locale) || !tagSlugSet.has(slug)) {
    return { title: 'Not Found' };
  }

  const store = new ContentStore();
  const posts = await store.getAllPosts(locale, false, { includeContent: false });
  const hub = buildTaxonomyHubData(posts, 'tag', slug as CanonicalTagSlug);

  if (!hub) {
    return { title: 'Not Found' };
  }

  const term = getTaxonomyTerm(locale, 'tag', slug as CanonicalTagSlug);
  const title = locale === 'fr'
    ? `${term.label} | Blog ${SITE_NAME}`
    : `${term.label} Tag Archive | ${SITE_NAME}`;
  const description = term.description;
  const canonicalPath = `${SITE_URL}${getTagPath(locale, slug, true)}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
      languages: {
        'en-CA': `${SITE_URL}${getTagPath('en', slug, true)}`,
        'fr-CA': `${SITE_URL}${getTagPath('fr', slug, true)}`,
        'x-default': `${SITE_URL}${getTagPath('en', slug, true)}`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalPath,
      type: 'website',
      siteName: SITE_NAME,
      locale: locale === 'fr' ? 'fr_CA' : 'en_CA',
      images: [
        {
          url: `${SITE_URL}/optimized/logos/purrify-logo.png`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${SITE_URL}/optimized/logos/purrify-logo.png`],
    },
  };
}

export default async function LocalizedTagHubPage({ params }: TagHubPageProps) {
  const { locale, slug } = await params;

  if (!isValidLocale(locale) || !tagSlugSet.has(slug)) {
    notFound();
  }

  const store = new ContentStore();
  const posts = await store.getAllPosts(locale, false, { includeContent: false });
  const hub = buildTaxonomyHubData(posts, 'tag', slug as CanonicalTagSlug);

  if (!hub) {
    notFound();
  }

  const term = getTaxonomyTerm(locale, 'tag', slug as CanonicalTagSlug);
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: term.label,
    description: term.description,
    url: `${SITE_URL}${getTagPath(locale, slug, true)}`,
    isPartOf: {
      '@type': 'Blog',
      name: `${SITE_NAME} Blog`,
      url: `${SITE_URL}${getBlogBasePath(locale)}/`,
    },
    inLanguage: locale === 'fr' ? 'fr-CA' : 'en-CA',
    hasPart: hub.posts.slice(0, 10).map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      url: `${SITE_URL}${getBlogBasePath(locale)}/${post.slug}/`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <TaxonomyHubPage locale={locale} hub={hub} />
    </>
  );
}
