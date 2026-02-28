import type { Metadata } from 'next';
import LocalizedBlogIndexPage, {
  generateMetadata as generateLocalizedMetadata,
} from '@/app/[locale]/blog/page';
import { defaultLocale } from '@/i18n/config';

interface BlogIndexPageProps {
  searchParams: Promise<{ page?: string }>;
}

export const dynamic = 'force-static';

export async function generateMetadata({ searchParams }: BlogIndexPageProps): Promise<Metadata> {
  const metadata = await generateLocalizedMetadata({
    params: Promise.resolve({ locale: defaultLocale }),
    searchParams,
  });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.purrify.ca';
  const canonicalUrl = `${siteUrl}/blog/`;

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

export default function BlogIndexPage({ searchParams }: BlogIndexPageProps) {
  return LocalizedBlogIndexPage({
    params: Promise.resolve({ locale: defaultLocale }),
    searchParams,
  });
}
