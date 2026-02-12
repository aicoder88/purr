export const dynamic = 'force-dynamic';

import type { Metadata } from 'next';
import PageContent from './PageContent';
import { getCommercialExperimentState } from '@/lib/experiments/commercial-server';
import { ServerExperimentViewTracker } from '@/components/experiments/ServerExperimentViewTracker';

export const metadata: Metadata = {
  title: 'Purrify Products - Activated Carbon Litter Additive',
  description: '★ 4.8 Rating | FREE Trial Available | Shop Purrify activated carbon litter additives. Eliminates odors instantly. Ships to USA & Canada. 30-day guarantee.',
  keywords: ['Purrify products', 'cat litter additive', 'activated carbon', 'odor control', 'trial size', 'family pack'],
  openGraph: {
    type: 'website',
    url: 'https://www.purrify.ca/products/',
    siteName: 'Purrify',
    title: 'Purrify Products - Activated Carbon Litter Additive',
    description: '★ 4.8 Rating | FREE Trial Available | Shop Purrify activated carbon litter additives. Eliminates odors instantly.',
    locale: 'en_CA',
    images: [
      {
        url: 'https://www.purrify.ca/images/Logos/purrify-logo.png',
        width: 1200,
        height: 800,
        alt: 'Purrify Products',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@purrifyhq',
    creator: '@purrifyhq',
    title: 'Purrify Products - Activated Carbon Litter Additive',
    description: '★ 4.8 Rating | FREE Trial Available | Shop Purrify activated carbon litter additives. Eliminates odors instantly.',
    images: ['https://www.purrify.ca/images/Logos/purrify-logo.png'],
  },
  alternates: {
    canonical: 'https://www.purrify.ca/products/',
    languages: {
      'en-CA': 'https://www.purrify.ca/products/',
      'fr-CA': 'https://www.purrify.ca/fr/products/',
      'zh-CN': 'https://www.purrify.ca/zh/products/',
      'es-US': 'https://www.purrify.ca/es/products/',
      'en-US': 'https://www.purrify.ca/products/',
      'x-default': 'https://www.purrify.ca/products/',
    },
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

export default async function ProductsPage() {
  const experiments = await getCommercialExperimentState();
  const experimentCopy = {
    heroHeadline: experiments.headline === 'variant'
      ? 'Stop Litter Box Odor at the Source'
      : 'Purrify Products - Activated Carbon Litter Additive',
    heroSubheadline: experiments.headline === 'variant'
      ? 'Choose the format that matches your home and eliminate ammonia before it spreads.'
      : 'Find the right size for your home and eliminate odors with activated carbon granules.',
    heroPrimaryCta: experiments.ctaCopy === 'variant'
      ? 'Choose My Best Fit'
      : 'Find My Perfect Size',
    heroProofOrder: experiments.proofOrder === 'variant'
      ? 'before-cta'
      : 'after-cta',
    finalCtaHeading: experiments.ctaCopy === 'variant'
      ? 'Ready to Get Odor Control Working This Week?'
      : 'Get Purrify Near You',
    finalCtaBody: experiments.ctaCopy === 'variant'
      ? 'Find a nearby retailer or contact us for the fastest way to start.'
      : 'Available at pet stores across Canada. Ask for Purrify at your favorite store.',
    finalCtaPrimary: experiments.ctaCopy === 'variant'
      ? 'Find Nearby Availability'
      : 'Find a Store',
    finalCtaSecondary: experiments.ctaCopy === 'variant'
      ? 'Talk to Product Support'
      : 'Questions? Contact Us',
  } as const;

  return (
    <>
      <ServerExperimentViewTracker assignments={experiments.assignments} />
      <PageContent experimentCopy={experimentCopy} />
    </>
  );
}
