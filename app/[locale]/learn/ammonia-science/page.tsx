import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locales, isValidLocale } from '@/i18n/config';
import { SITE_NAME } from '@/lib/constants';
import { buildLocalizedMetadataAlternates } from '@/lib/seo-utils';
import AmmoniaSciencePageClient from '@/app/learn/ammonia-science/AmmoniaSciencePageClient';
import {
  createBreadcrumbSchema,
  createIndexedArticleSchema,
  serializeSchemaGraph,
} from '@/lib/seo/indexed-content-schema';

interface LocalizedAmmoniaSciencePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocalizedAmmoniaSciencePageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return { title: 'Not Found' };
  }

  const isFrench = locale === 'fr';
  const baseUrl = 'https://www.purrify.ca';
  const alternates = buildLocalizedMetadataAlternates('/learn/ammonia-science/', locale);
  const canonicalPath = alternates.canonical;

  return {
    title: isFrench
      ? `Pourquoi l'Urine de Chat Sent l'Ammoniac (et Solutions) | ${SITE_NAME}`
      : `Why Cat Urine Smells Like Ammonia (And Fixes) | ${SITE_NAME}`,
    description: isFrench
      ? "Découvrez pourquoi l'urine de chat sent l'ammoniac, les risques pour la santé et comment le carbone actif élimine les odeurs d'ammoniac."
      : 'Learn why cat urine smells like ammonia, health risks, and how activated carbon eliminates ammonia odors from litter boxes.',
    keywords: isFrench
      ? ['urine chat ammoniac', 'odeur ammoniac litière', 'risques santé ammoniac', 'éliminer odeur ammoniac']
      : ['cat urine ammonia smell', 'ammonia litter odor', 'ammonia health risks', 'eliminate ammonia odor'],
    alternates,
    openGraph: {
      type: 'article',
      url: canonicalPath,
      siteName: SITE_NAME,
      title: isFrench
        ? `Odeur d'Ammoniac dans la Litière | ${SITE_NAME}`
        : `Ammonia Smell in Cat Litter | ${SITE_NAME}`,
      description: isFrench
        ? "Pourquoi l'urine de chat sent l'ammoniac et comment régler le problème."
        : 'Why cat urine smells like ammonia and how to fix it.',
      locale: isFrench ? 'fr_CA' : 'en_CA',
      images: [
        {
          url: `${baseUrl}/optimized/logos/purrify-logo.png`,
          width: 1200,
          height: 800,
          alt: isFrench ? 'Science ammoniaque' : 'Ammonia science',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@purrifyhq',
      creator: '@purrifyhq',
      title: isFrench
        ? `Odeur d'Ammoniac | ${SITE_NAME}`
        : `Ammonia Odor | ${SITE_NAME}`,
      description: isFrench
        ? 'Causes et solutions pour les odeurs ammoniaquées.'
        : 'Causes and solutions for ammonia smells.',
      images: [`${baseUrl}/optimized/logos/purrify-logo.png`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function LocalizedAmmoniaSciencePage({ params }: LocalizedAmmoniaSciencePageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const isFrench = locale === 'fr';
  const articleSchema = createIndexedArticleSchema({
    locale,
    path: '/learn/ammonia-science/',
    title: isFrench
      ? `Pourquoi l'Urine de Chat Sent l'Ammoniac (et Solutions) | ${SITE_NAME}`
      : `Why Cat Urine Smells Like Ammonia (And Fixes) | ${SITE_NAME}`,
    description: isFrench
      ? "Découvrez pourquoi l'urine de chat sent l'ammoniac, les risques pour la santé et comment le carbone actif élimine les odeurs d'ammoniac."
      : 'Learn why cat urine smells like ammonia, health risks, and how activated carbon eliminates ammonia odors from litter boxes.',
    image: 'https://www.purrify.ca/optimized/blog/ammonia-science.webp',
    datePublished: '2024-01-20T12:00:00Z',
    dateModified: '2025-12-09T00:00:00Z',
    section: 'Pet Science',
    keywords: isFrench
      ? ['urine chat ammoniac', 'odeur ammoniac litière', 'risques santé ammoniac', 'éliminer odeur ammoniac']
      : ['cat urine ammonia smell', 'ammonia litter odor', 'ammonia health risks', 'eliminate ammonia odor'],
    wordCount: 2000,
  });

  const breadcrumbSchema = createBreadcrumbSchema(locale, [
    { name: isFrench ? 'Accueil' : 'Home', path: '/' },
    { name: 'Learn', path: '/learn/' },
    { name: isFrench ? 'Science de l’ammoniac' : 'Ammonia Science', path: '/learn/ammonia-science/' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeSchemaGraph(articleSchema, breadcrumbSchema),
        }}
      />
      <AmmoniaSciencePageClient />
    </>
  );
}
