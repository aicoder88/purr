import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locales, isValidLocale } from '@/i18n/config';
import { SITE_NAME } from '@/lib/constants';
import CatLitterAmmoniaHealthRisksClient from '@/app/learn/cat-litter-ammonia-health-risks/CatLitterAmmoniaHealthRisksClient';

interface LocalizedCatLitterAmmoniaHealthRisksPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocalizedCatLitterAmmoniaHealthRisksPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return { title: 'Not Found' };
  }

  const isFrench = locale === 'fr';
  const baseUrl = 'https://www.purrify.ca';
  const canonicalPath = `${baseUrl}${isFrench ? '/fr' : ''}/learn/cat-litter-ammonia-health-risks/`;

  return {
    title: isFrench
      ? `La Litière Ammoniac est-elle Dangereuse ? Guide Santé | ${SITE_NAME}`
      : `Is Cat Litter Ammonia Dangerous? Health Guide | ${SITE_NAME}`,
    description: isFrench
      ? "Guide complet sur les risques santé de l'ammoniac dans la litière. Effets respiratoires, toxicité et comment se protéger."
      : 'Complete guide on ammonia health risks from cat litter. Respiratory effects, toxicity, and how to protect yourself.',
    keywords: isFrench
      ? ['ammoniac litière danger', 'risques santé ammoniac', 'toxicité ammoniac chat', 'problèmes respiratoires']
      : ['cat litter ammonia dangerous', 'ammonia health risks', 'ammonia toxicity', 'respiratory problems'],
    alternates: {
      canonical: canonicalPath,
      languages: {
        'en-CA': `${baseUrl}/learn/cat-litter-ammonia-health-risks/`,
        'fr-CA': `${baseUrl}/fr/learn/cat-litter-ammonia-health-risks/`,
        'en-US': `${baseUrl}/learn/cat-litter-ammonia-health-risks/`,
        'x-default': `${baseUrl}/learn/cat-litter-ammonia-health-risks/`,
      },
    },
    openGraph: {
      type: 'article',
      url: canonicalPath,
      siteName: SITE_NAME,
      title: isFrench
        ? `Risques Ammoniac Litière | ${SITE_NAME}`
        : `Cat Litter Ammonia Risks | ${SITE_NAME}`,
      description: isFrench
        ? 'Risques santé et protection contre ammoniaque.'
        : 'Health risks and protection from ammonia.',
      locale: isFrench ? 'fr_CA' : 'en_CA',
      images: [
        {
          url: `${baseUrl}/optimized/logos/purrify-logo.png`,
          width: 1200,
          height: 800,
          alt: isFrench ? 'Risques ammoniac' : 'Ammonia risks',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@purrifyhq',
      creator: '@purrifyhq',
      title: isFrench
        ? `Risques Ammoniac | ${SITE_NAME}`
        : `Ammonia Risks | ${SITE_NAME}`,
      description: isFrench
        ? 'Santé et sécurité ammoniac litière.'
        : 'Health and safety of cat litter ammonia.',
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

export default async function LocalizedCatLitterAmmoniaHealthRisksPage({ params }: LocalizedCatLitterAmmoniaHealthRisksPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  return <CatLitterAmmoniaHealthRisksClient />;
}
