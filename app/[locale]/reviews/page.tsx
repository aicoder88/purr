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
    description: 'Read verified reviews from real cat owners who have transformed their homes with Purrify. ★ 4.9/5 average rating from 138+ customers across Canada.',
    alternates: {
      canonical: `https://www.purrify.ca/${locale}/reviews/`,
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
      ? 'Verified Reviews From Cat Owners Who Solved Odor Fast'
      : 'What Our Customers Are Saying',
    subheadline: experiments.headline === 'variant'
      ? 'Unfiltered experiences from households that switched to Purrify and measured the difference at home.'
      : 'Real reviews from real cat owners who have transformed their homes with Purrify.',
    ctaHeadline: experiments.ctaCopy === 'variant'
      ? 'Ready to Test This in Your Home?'
      : 'Ready to Experience the Difference?',
    ctaBody: experiments.ctaCopy === 'variant'
      ? 'Start with a low-risk trial and verify results in your own litter routine.'
      : 'Join thousands of satisfied cat owners who have eliminated litter box odors for good.',
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
