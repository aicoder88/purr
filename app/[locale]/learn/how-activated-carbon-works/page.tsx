import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locales, isValidLocale } from '@/i18n/config';
import { SITE_NAME } from '@/lib/constants';
import { LEARN_PAGE_PREVIEW_IMAGES } from '@/lib/learn/page-preview-images';
import { buildLocalizedMetadataAlternates } from '@/lib/seo-utils';
import HowActivatedCarbonWorksClient from '@/app/learn/how-activated-carbon-works/HowActivatedCarbonWorksClient';
import {
  createBreadcrumbSchema,
  createFaqSchema,
  createIndexedArticleSchema,
  serializeSchemaGraph,
} from '@/lib/seo/indexed-content-schema';

interface LocalizedHowActivatedCarbonWorksPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocalizedHowActivatedCarbonWorksPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return { title: 'Not Found' };
  }

  const isFrench = locale === 'fr';
  const baseUrl = 'https://www.purrify.ca';
  const heroImage = `${baseUrl}${LEARN_PAGE_PREVIEW_IMAGES['/learn/how-activated-carbon-works'].image}`;
  const alternates = buildLocalizedMetadataAlternates('/learn/how-activated-carbon-works/', locale);
  const canonicalPath = alternates.canonical;

  return {
    title: isFrench
      ? `Comment Fonctionne le Carbone Actif ? Guide Scientifique | ${SITE_NAME}`
      : `How Does Activated Carbon Work? Science Guide | ${SITE_NAME}`,
    description: isFrench
      ? "Guide scientifique complet sur le fonctionnement du carbone actif. Découvrez l'adsorption, la surface spécifique et les micropores."
      : 'Comprehensive science guide on how activated carbon works. Learn about adsorption, surface area, and micropores.',
    keywords: isFrench
      ? ['comment fonctionne carbone actif', 'guide scientifique', 'adsorption', 'surface spécifique']
      : ['how does activated carbon work', 'science guide', 'adsorption', 'surface area'],
    alternates,
    openGraph: {
      type: 'article',
      url: canonicalPath,
      siteName: SITE_NAME,
      title: isFrench
        ? `Comment Fonctionne le Carbone Actif | ${SITE_NAME}`
        : `How Does Activated Carbon Work | ${SITE_NAME}`,
      description: isFrench
        ? 'Guide scientifique sur le carbone actif.'
        : 'Science guide on activated carbon.',
      locale: isFrench ? 'fr_CA' : 'en_CA',
      images: [
        {
          url: heroImage,
          width: 1200,
          height: 675,
          alt: isFrench ? 'Carbone actif' : 'Activated carbon',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@purrifyhq',
      creator: '@purrifyhq',
      title: isFrench
        ? `Fonctionnement Carbone Actif | ${SITE_NAME}`
        : `Activated Carbon Works | ${SITE_NAME}`,
      description: isFrench
        ? 'Science et mécanisme du carbone actif.'
        : 'Science and mechanism of activated carbon.',
      images: [heroImage],
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

export default async function LocalizedHowActivatedCarbonWorksPage({ params }: LocalizedHowActivatedCarbonWorksPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const isFrench = locale === 'fr';
  const articleSchema = createIndexedArticleSchema({
    locale,
    path: '/learn/how-activated-carbon-works/',
    title: isFrench
      ? `Comment Fonctionne le Carbone Actif ? Guide Scientifique | ${SITE_NAME}`
      : `How Does Activated Carbon Work? Science Guide | ${SITE_NAME}`,
    description: isFrench
      ? "Guide scientifique complet sur le fonctionnement du carbone actif. Découvrez l'adsorption, la surface spécifique et les micropores."
      : 'Comprehensive science guide on how activated carbon works. Learn about adsorption, surface area, and micropores.',
    image: 'https://www.purrify.ca/optimized/blog/ammonia-science.webp',
    datePublished: '2024-01-20T12:00:00Z',
    dateModified: '2025-12-09T00:00:00Z',
    section: 'Science & Technology',
    keywords: isFrench
      ? ['comment fonctionne carbone actif', 'guide scientifique', 'adsorption', 'surface spécifique']
      : ['how does activated carbon work', 'science guide', 'adsorption', 'surface area'],
  });

  const breadcrumbSchema = createBreadcrumbSchema(locale, [
    { name: isFrench ? 'Accueil' : 'Home', path: '/' },
    { name: 'Learn', path: '/learn/' },
    { name: isFrench ? 'Fonctionnement du carbone actif' : 'How Activated Carbon Works', path: '/learn/how-activated-carbon-works/' },
  ]);

  const faqSchema = createFaqSchema([
    {
      question: 'How does activated carbon work to remove odors?',
      answer: 'Activated carbon removes odors through adsorption, a physical process where odor molecules stick to the carbon surface and become trapped inside its porous structure.',
    },
    {
      question: 'What is the difference between adsorption and absorption?',
      answer: 'Adsorption happens on the surface of a material, while absorption means molecules move into the bulk of a material. Activated carbon removes odors through adsorption.',
    },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeSchemaGraph(articleSchema, breadcrumbSchema, faqSchema),
        }}
      />
      <HowActivatedCarbonWorksClient />
    </>
  );
}
