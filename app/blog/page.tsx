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
  return generateLocalizedMetadata({
    params: Promise.resolve({ locale: defaultLocale }),
    searchParams,
  });
}

export default function BlogIndexPage({ searchParams }: BlogIndexPageProps) {
  return LocalizedBlogIndexPage({
    params: Promise.resolve({ locale: defaultLocale }),
    searchParams,
  });
}
