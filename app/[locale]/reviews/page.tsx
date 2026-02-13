import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageContent from '@/app/reviews/PageContent';
import { locales, isValidLocale } from '@/i18n/config';
import { getCommercialExperimentState } from '@/lib/experiments/commercial-server';
import { ServerExperimentViewTracker } from '@/components/experiments/ServerExperimentViewTracker';

interface LocalizedReviewsPageProps {
  params: Promise<{ locale: string }>;
}

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocalizedReviewsPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return { title: 'Not Found' };
  }

  return {
    title: 'Purrify Reviews - What Cat Owners Are Saying',
    description: 'Read customer feedback about Purrify and learn how cat owners use an activated carbon additive to reduce litter box odor.',
    alternates: {
      canonical: locale === 'en'
        ? 'https://www.purrify.ca/reviews/'
        : `https://www.purrify.ca/${locale}/reviews/`,
      languages: {
        'en-CA': 'https://www.purrify.ca/reviews/',
        'fr-CA': 'https://www.purrify.ca/fr/reviews/',
        'zh-CN': 'https://www.purrify.ca/zh/reviews/',
        'es-US': 'https://www.purrify.ca/es/reviews/',
        'en-US': 'https://www.purrify.ca/reviews/',
        'x-default': 'https://www.purrify.ca/reviews/',
      },
    },
  };
}

export default async function LocalizedReviewsPage({ params }: LocalizedReviewsPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const experiments = await getCommercialExperimentState();
  const experimentCopy = {
    headline: experiments.headline === 'variant'
      ? 'Customer Feedback From Cat Owners'
      : 'What Our Customers Are Saying',
    subheadline: experiments.headline === 'variant'
      ? 'What to expect from an activated carbon additive, and how to use it in your own routine.'
      : 'What to expect from an activated carbon additive, and how to use it in your own routine.',
    ctaHeadline: experiments.ctaCopy === 'variant'
      ? 'Ready to Test This in Your Home?'
      : 'Ready to Experience the Difference?',
    ctaBody: experiments.ctaCopy === 'variant'
      ? 'Start with a low-risk trial and verify results in your own litter routine.'
      : 'Start with a low-risk trial and see how it fits into your litter routine.',
    primaryCta: experiments.ctaCopy === 'variant'
      ? 'See Product Options'
      : 'Shop Now',
    secondaryCta: experiments.ctaCopy === 'variant'
      ? 'Start Low-Risk Trial'
      : 'Try Free Sample',
    proofOrder: experiments.proofOrder === 'variant'
      ? 'trust-first'
      : 'reviews-first',
  } as const;

  return (
    <>
      <ServerExperimentViewTracker assignments={experiments.assignments} />
      <PageContent experimentCopy={experimentCopy} />
    </>
  );
}
