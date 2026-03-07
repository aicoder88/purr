import type { Metadata } from 'next';

import LocalizedSearchPage, {
  generateMetadata as generateLocalizedMetadata,
} from '@/app/[locale]/search/page';
import { defaultLocale } from '@/i18n/config';

interface SearchPageProps {
  searchParams: Promise<{ q?: string | string[] }>;
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  return generateLocalizedMetadata({
    params: Promise.resolve({ locale: defaultLocale }),
    searchParams,
  });
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  return LocalizedSearchPage({
    params: Promise.resolve({ locale: defaultLocale }),
    searchParams,
  });
}
