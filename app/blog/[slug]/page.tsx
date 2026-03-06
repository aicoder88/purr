import type { Metadata } from 'next';
import LocalizedBlogPostPage, {
  generateMetadata as generateLocalizedMetadata,
} from '@/app/[locale]/blog/[slug]/page';
import { ContentStore } from '@/lib/blog/content-store';
import { defaultLocale } from '@/i18n/config';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamic = 'force-static';

export async function generateStaticParams() {
  const store = new ContentStore();
  const posts = await store.getAllPosts(defaultLocale, false);
  return posts.map((post) => ({ slug: post.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;

  const metadata = await generateLocalizedMetadata({
    params: Promise.resolve({ locale: defaultLocale, slug }),
  });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.purrify.ca';
  const canonicalUrl = `${siteUrl}/blog/${slug}/`;

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

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  return LocalizedBlogPostPage({
    params: Promise.resolve({ locale: defaultLocale, slug }),
  });
}
