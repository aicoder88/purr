import type { Metadata } from 'next';
import LocalizedCategoryHubPage, {
  generateMetadata as generateLocalizedMetadata,
} from '@/app/[locale]/blog/category/[slug]/page';
import { ContentStore } from '@/lib/blog/content-store';
import {
  buildTaxonomyHubData,
  CANONICAL_CATEGORY_SLUGS,
} from '@/lib/blog/taxonomy';
import { defaultLocale } from '@/i18n/config';

interface CategoryHubPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamic = 'force-static';
export const dynamicParams = false;

export async function generateStaticParams() {
  const store = new ContentStore();
  const posts = await store.getAllPosts(defaultLocale, false, { includeContent: false });

  return CANONICAL_CATEGORY_SLUGS
    .filter((slug) => buildTaxonomyHubData(posts, 'category', slug))
    .map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: CategoryHubPageProps): Promise<Metadata> {
  const { slug } = await params;
  const metadata = await generateLocalizedMetadata({
    params: Promise.resolve({ locale: defaultLocale, slug }),
  });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.purrify.ca';
  const canonicalUrl = `${siteUrl}/blog/category/${slug}/`;

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

export default async function CategoryHubPage({ params }: CategoryHubPageProps) {
  const { slug } = await params;

  return LocalizedCategoryHubPage({
    params: Promise.resolve({ locale: defaultLocale, slug }),
  });
}
