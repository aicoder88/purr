import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locales, isValidLocale } from '@/i18n/config';
import { SITE_NAME } from '@/lib/constants';
import FAQPageClient from '@/app/learn/faq/FAQPageClient';

interface LocalizedFAQPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocalizedFAQPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return { title: 'Not Found' };
  }

  const isFrench = locale === 'fr';
  const baseUrl = 'https://www.purrify.ca';
  const canonicalPath = `${baseUrl}${isFrench ? '/fr' : ''}/learn/faq/`;

  return {
    title: isFrench
      ? `FAQ Litière pour Chat - Questions sur le Carbone Actif | ${SITE_NAME}`
      : `Cat Litter Odor FAQ - Activated Carbon Questions | ${SITE_NAME}`,
    description: isFrench
      ? "Obtenez des réponses d'experts sur les additifs de litière au carbone actif : comment ils fonctionnent, conseils d'utilisation, sécurité et dépannage."
      : 'Get expert answers about activated carbon cat litter additives: how they work, usage tips, safety, and troubleshooting. Coconut shell carbon works best.',
    keywords: isFrench
      ? ['FAQ carbone actif', 'litière chat carbone actif', 'carbone actif noix de coco', 'contrôle odeur litière']
      : ['activated carbon cat litter FAQ', 'activated carbon vs baking soda', 'coconut shell activated carbon', 'cat litter odor control'],
    alternates: {
      canonical: canonicalPath,
      languages: {
        'en-CA': `${baseUrl}/learn/faq/`,
        'fr-CA': `${baseUrl}/fr/learn/faq/`,
        'en-US': `${baseUrl}/learn/faq/`,
        'x-default': `${baseUrl}/learn/faq/`,
      },
    },
    openGraph: {
      type: 'website',
      url: canonicalPath,
      siteName: SITE_NAME,
      title: isFrench
        ? `FAQ Litière pour Chat - Questions sur le Carbone Actif | ${SITE_NAME}`
        : `Cat Litter Odor FAQ - Activated Carbon Questions | ${SITE_NAME}`,
      description: isFrench
        ? "Obtenez des réponses d'experts sur les additifs de litière au carbone actif."
        : 'Get expert answers about activated carbon cat litter additives.',
      locale: isFrench ? 'fr_CA' : 'en_CA',
      images: [
        {
          url: `${baseUrl}/optimized/blog/cat-owner-questions-ghibli.webp`,
          width: 1200,
          height: 800,
          alt: isFrench ? 'Propriétaire de chat avec des questions' : 'Cat owner with questions about Purrify',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@purrifyhq',
      creator: '@purrifyhq',
      title: isFrench
        ? `FAQ Litière pour Chat | ${SITE_NAME}`
        : `Cat Litter Odor FAQ | ${SITE_NAME}`,
      description: isFrench
        ? "Réponses d'experts sur le carbone actif pour litière."
        : 'Expert answers about activated carbon cat litter.',
      images: [`${baseUrl}/optimized/blog/cat-owner-questions-ghibli.webp`],
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

export default async function LocalizedFAQPage({ params }: LocalizedFAQPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  return <FAQPageClient />;
}
