import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ComparisonMethodologyPageClient from '@/components/comparison-lab/ComparisonMethodologyPageClient';
import { isValidLocale, locales, type Locale } from '@/i18n/config';
import {
  getComparisonMethodologyGraph,
  getComparisonMethodologyMetadata,
} from '@/lib/comparison-lab/seo';

interface LocalizedComparisonMethodologyPageProps {
  params: Promise<{ locale: string }>;
}

export const dynamic = 'force-static';
export const dynamicParams = false;

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LocalizedComparisonMethodologyPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return { title: 'Not Found' };
  }

  return getComparisonMethodologyMetadata(locale as Locale);
}

export default async function LocalizedComparisonMethodologyPage({
  params,
}: LocalizedComparisonMethodologyPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': getComparisonMethodologyGraph(locale as Locale),
          }),
        }}
      />
      <ComparisonMethodologyPageClient />
    </>
  );
}
