import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ComparisonTemplatePageClient from '@/components/comparison-lab/ComparisonTemplatePageClient';
import { COMPARISON_ENTRIES, getComparisonEntry } from '@/lib/comparison-lab/data';
import { isValidLocale, locales, type Locale } from '@/i18n/config';
import { getComparisonPageGraph, getComparisonPageMetadata } from '@/lib/comparison-lab/seo';

interface LocalizedComparisonTemplatePageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export const dynamic = 'force-static';
export const dynamicParams = false;

export async function generateStaticParams() {
  return locales.flatMap((locale) =>
    COMPARISON_ENTRIES.map((entry) => ({ locale, slug: entry.slug }))
  );
}

export async function generateMetadata({
  params,
}: LocalizedComparisonTemplatePageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!isValidLocale(locale)) {
    return { title: 'Not Found' };
  }

  const entry = getComparisonEntry(slug);

  if (!entry) {
    return { title: 'Not Found' };
  }

  return getComparisonPageMetadata(locale as Locale, entry);
}

export default async function LocalizedComparisonTemplatePage({
  params,
}: LocalizedComparisonTemplatePageProps) {
  const { locale, slug } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const entry = getComparisonEntry(slug);

  if (!entry) {
    notFound();
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': getComparisonPageGraph(locale as Locale, entry),
          }),
        }}
      />
      <ComparisonTemplatePageClient entry={entry} />
    </>
  );
}
