import type { Metadata } from 'next';
import LocalizedTagHubPage, {
  generateMetadata as generateLocalizedMetadata,
} from '@/app/[locale]/blog/tag/[slug]/page';
import { ContentStore } from '@/lib/blog/content-store';
import {
  buildTaxonomyHubData,
  CANONICAL_TAG_SLUGS,
} from '@/lib/blog/taxonomy';
import { defaultLocale } from '@/i18n/config';

interface TagHubPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamic = 'force-static';
export const dynamicParams = false;

export async function generateStaticParams() {
  const store = new ContentStore();
  const posts = await store.getAllPosts(defaultLocale, false, { includeContent: false });

  return CANONICAL_TAG_SLUGS
    .filter((slug) => buildTaxonomyHubData(posts, 'tag', slug))
    .map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: TagHubPageProps): Promise<Metadata> {
  const { slug } = await params;
  const metadata = await generateLocalizedMetadata({
    params: Promise.resolve({ locale: defaultLocale, slug }),
  });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.purrify.ca';
  const canonicalUrl = `${siteUrl}/blog/tag/${slug}/`;

  return {
    ...metadata,
    alternates: {
      ...metadata.alternates,
      canonical: canonicalUrl,
    },
    openGraph: {
      ...metadata.openGraph,
      url: canonicalUrl,
    },
  };
}

export default async function TagHubPage({ params }: TagHubPageProps) {
  const { slug } = await params;

  return LocalizedTagHubPage({
    params: Promise.resolve({ locale: defaultLocale, slug }),
  });
}
