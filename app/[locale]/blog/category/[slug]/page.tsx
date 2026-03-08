import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { TaxonomyHubPage } from '@/components/blog/TaxonomyHubPage';
import { ContentStore } from '@/lib/blog/content-store';
import {
  buildTaxonomyHubData,
  CANONICAL_CATEGORY_SLUGS,
  type CanonicalCategorySlug,
} from '@/lib/blog/taxonomy';
import { defaultLocale, isValidLocale, locales } from '@/i18n/config';
import { SITE_NAME, SITE_URL } from '@/lib/constants';
import {
  getTaxonomyFaq,
  getTaxonomyTerm,
} from '@/translations/blog-taxonomy';

interface CategoryHubPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export const dynamic = 'force-static';
export const dynamicParams = false;

const categorySlugSet = new Set<string>(CANONICAL_CATEGORY_SLUGS);

const getBlogBasePath = (locale: string) => (
  locale === 'en' ? '/blog' : `/${locale}/blog`
);

const getCategoryPath = (locale: string, slug: string, trailingSlash = false) => (
  `${getBlogBasePath(locale)}/category/${slug}${trailingSlash ? '/' : ''}`
);

export async function generateStaticParams() {
  const store = new ContentStore();
  const params: Array<{ locale: string; slug: CanonicalCategorySlug }> = [];

  for (const locale of locales.filter((value) => value !== defaultLocale)) {
    const posts = await store.getAllPosts(locale, false);

    for (const slug of CANONICAL_CATEGORY_SLUGS) {
      if (buildTaxonomyHubData(posts, 'category', slug)) {
        params.push({ locale, slug });
      }
    }
  }

  return params;
}

export async function generateMetadata({ params }: CategoryHubPageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!isValidLocale(locale) || !categorySlugSet.has(slug)) {
    return { title: 'Not Found' };
  }

  const store = new ContentStore();
  const posts = await store.getAllPosts(locale, false);
  const hub = buildTaxonomyHubData(posts, 'category', slug as CanonicalCategorySlug);

  if (!hub) {
    return { title: 'Not Found' };
  }

  const term = getTaxonomyTerm(locale, 'category', slug as CanonicalCategorySlug);
  const title = locale === 'fr'
    ? `${term.label} | Blog ${SITE_NAME}`
    : `${term.label} Blog Guides | ${SITE_NAME}`;
  const description = term.description;
  const canonicalPath = `${SITE_URL}${getCategoryPath(locale, slug, true)}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
      languages: {
        'en-CA': `${SITE_URL}${getCategoryPath('en', slug, true)}`,
        'fr-CA': `${SITE_URL}${getCategoryPath('fr', slug, true)}`,
        'x-default': `${SITE_URL}${getCategoryPath('en', slug, true)}`,
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

export default async function LocalizedCategoryHubPage({ params }: CategoryHubPageProps) {
  const { locale, slug } = await params;

  if (!isValidLocale(locale) || !categorySlugSet.has(slug)) {
    notFound();
  }

  const store = new ContentStore();
  const posts = await store.getAllPosts(locale, false);
  const hub = buildTaxonomyHubData(posts, 'category', slug as CanonicalCategorySlug);

  if (!hub) {
    notFound();
  }

  const term = getTaxonomyTerm(locale, 'category', slug as CanonicalCategorySlug);
  const faq = getTaxonomyFaq(locale, 'category', slug as CanonicalCategorySlug, hub.posts.length);
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: term.label,
    description: term.description,
    url: `${SITE_URL}${getCategoryPath(locale, slug, true)}`,
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

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <TaxonomyHubPage locale={locale} hub={hub} />
    </>
  );
}
