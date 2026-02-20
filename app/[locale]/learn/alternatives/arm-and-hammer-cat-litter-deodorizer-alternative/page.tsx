import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locales, isValidLocale } from '@/i18n/config';
import { SITE_NAME } from '@/lib/constants';
import ArmAndHammerClient from '@/app/learn/alternatives/arm-and-hammer-cat-litter-deodorizer-alternative/ArmAndHammerClient';

interface LocalizedArmAndHammerPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocalizedArmAndHammerPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return { title: 'Not Found' };
  }

  const isFrench = locale === 'fr';
  const baseUrl = 'https://www.purrify.ca';
  const canonicalPath = `${baseUrl}${isFrench ? '/fr' : ''}/learn/alternatives/arm-and-hammer-cat-litter-deodorizer-alternative/`;

  return {
    title: isFrench
      ? `Arm & Hammer Ne Fonctionne Pas ? Meilleure Alternative | ${SITE_NAME}`
      : `Arm & Hammer Not Working? Better Alternative | ${SITE_NAME}`,
    description: isFrench
      ? "Comparez Purrify au désodorisant Arm & Hammer. Découvrez pourquoi le carbone actif surpasse le bicarbonate de soude pour le contrôle des odeurs."
      : 'Compare Purrify to Arm & Hammer litter deodorizer. Learn why activated carbon outperforms baking soda for odor control.',
    keywords: isFrench
      ? ['alternative arm hammer', 'meilleur désodorisant litière', 'carbone actif vs bicarbonate', 'comparaison']
      : ['arm hammer alternative', 'better litter deodorizer', 'activated carbon vs baking soda', 'comparison'],
    alternates: {
      canonical: canonicalPath,
      languages: {
        'en-CA': `${baseUrl}/learn/alternatives/arm-and-hammer-cat-litter-deodorizer-alternative/`,
        'fr-CA': `${baseUrl}/fr/learn/alternatives/arm-and-hammer-cat-litter-deodorizer-alternative/`,
        'en-US': `${baseUrl}/learn/alternatives/arm-and-hammer-cat-litter-deodorizer-alternative/`,
        'x-default': `${baseUrl}/learn/alternatives/arm-and-hammer-cat-litter-deodorizer-alternative/`,
      },
    },
    openGraph: {
      type: 'article',
      url: canonicalPath,
      siteName: SITE_NAME,
      title: isFrench
        ? `Alternative à Arm & Hammer | ${SITE_NAME}`
        : `Arm & Hammer Alternative | ${SITE_NAME}`,
      description: isFrench
        ? 'Pourquoi le carbone actif surpasse le bicarbonate.'
        : 'Why activated carbon outperforms baking soda.',
      locale: isFrench ? 'fr_CA' : 'en_CA',
      images: [
        {
          url: `${baseUrl}/optimized/logos/purrify-logo.png`,
          width: 1200,
          height: 800,
          alt: isFrench ? 'Alternative Arm & Hammer' : 'Arm & Hammer alternative',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@purrifyhq',
      creator: '@purrifyhq',
      title: isFrench
        ? `Alternative Arm & Hammer | ${SITE_NAME}`
        : `Arm & Hammer Alternative | ${SITE_NAME}`,
      description: isFrench
        ? 'Comparaison carbone actif vs bicarbonate.'
        : 'Activated carbon vs baking soda comparison.',
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

export default async function LocalizedArmAndHammerPage({ params }: LocalizedArmAndHammerPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  return <ArmAndHammerClient />;
}
