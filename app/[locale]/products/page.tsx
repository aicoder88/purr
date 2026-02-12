import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageContent from '@/app/products/PageContent';
import { locales, isValidLocale } from '@/i18n/config';
import { getCommercialExperimentState } from '@/lib/experiments/commercial-server';
import { ServerExperimentViewTracker } from '@/components/experiments/ServerExperimentViewTracker';

interface LocalizedProductsPageProps {
  params: Promise<{ locale: string }>;
}

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocalizedProductsPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return { title: 'Not Found' };
  }

  const localizedPath = `https://www.purrify.ca/${locale}/products/`;

  return {
    title: 'Purrify Products - Activated Carbon Litter Additive',
    description: '★ 4.8 Rating | FREE Trial Available | Shop Purrify activated carbon litter additives. Eliminates odors instantly. Ships to USA & Canada. 30-day guarantee.',
    alternates: {
      canonical: localizedPath,
      languages: {
        'en-CA': 'https://www.purrify.ca/products/',
        'fr-CA': 'https://www.purrify.ca/fr/products/',
        'zh-CN': 'https://www.purrify.ca/zh/products/',
        'es-US': 'https://www.purrify.ca/es/products/',
        'en-US': 'https://www.purrify.ca/products/',
        'x-default': 'https://www.purrify.ca/products/',
      },
    },
  };
}

export default async function LocalizedProductsPage({ params }: LocalizedProductsPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

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
