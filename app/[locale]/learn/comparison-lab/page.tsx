import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ComparisonLabHubClient from '@/components/comparison-lab/ComparisonLabHubClient';
import { isValidLocale, locales, type Locale } from '@/i18n/config';
import { getComparisonLabGraph, getComparisonLabMetadata } from '@/lib/comparison-lab/seo';

interface LocalizedComparisonLabPageProps {
  params: Promise<{ locale: string }>;
}

export const dynamic = 'force-static';
export const dynamicParams = false;

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LocalizedComparisonLabPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return { title: 'Not Found' };
  }

  return getComparisonLabMetadata(locale as Locale);
}

export default async function LocalizedComparisonLabPage({
  params,
}: LocalizedComparisonLabPageProps) {
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
            '@graph': getComparisonLabGraph(locale as Locale),
          }),
        }}
      />
      <ComparisonLabHubClient />
    </>
  );
}
