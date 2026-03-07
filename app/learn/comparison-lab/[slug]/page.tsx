import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ComparisonTemplatePageClient from '@/components/comparison-lab/ComparisonTemplatePageClient';
import { COMPARISON_ENTRIES, getComparisonEntry } from '@/lib/comparison-lab/data';
import { getComparisonPageGraph, getComparisonPageMetadata } from '@/lib/comparison-lab/seo';

interface ComparisonTemplatePageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = 'force-static';
export const dynamicParams = false;

export async function generateStaticParams() {
  return COMPARISON_ENTRIES.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: ComparisonTemplatePageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getComparisonEntry(slug);

  if (!entry) {
    return { title: 'Not Found' };
  }

  return getComparisonPageMetadata('en', entry);
}

export default async function ComparisonTemplatePage({
  params,
}: ComparisonTemplatePageProps) {
  const { slug } = await params;
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
            '@graph': getComparisonPageGraph('en', entry),
          }),
        }}
      />
      <ComparisonTemplatePageClient entry={entry} />
    </>
  );
}
