import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import LearnPageClient from '@/app/learn/LearnPageClient';
import { locales, isValidLocale } from '@/i18n/config';
import { getCommercialExperimentState } from '@/lib/experiments/commercial-server';
import { ServerExperimentViewTracker } from '@/components/experiments/ServerExperimentViewTracker';

interface LocalizedLearnPageProps {
  params: Promise<{ locale: string }>;
}

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocalizedLearnPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return { title: 'Not Found' };
  }

  return {
    title: 'Cat Litter Odor Guides & Science | Purrify',
    description: 'Comprehensive guides on cat litter odor control. Learn how activated carbon works, explore solutions for every situation, and discover Purrify science.',
    alternates: {
      canonical: locale === 'en'
        ? 'https://www.purrify.ca/learn/'
        : `https://www.purrify.ca/${locale}/learn/`,
      languages: {
        'en-CA': 'https://www.purrify.ca/learn/',
        'fr-CA': 'https://www.purrify.ca/fr/learn/',
        'zh-CN': 'https://www.purrify.ca/zh/learn/',
        'es-US': 'https://www.purrify.ca/es/learn/',
        'en-US': 'https://www.purrify.ca/learn/',
        'x-default': 'https://www.purrify.ca/learn/',
      },
    },
  };
}

export default async function LocalizedLearnPage({ params }: LocalizedLearnPageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const experiments = await getCommercialExperimentState();
  const experimentCopy = {
    headline: experiments.headline === 'variant'
      ? 'The Fastest Path to an Odor-Free Litter Routine'
      : 'Learn Everything About Cat Litter Odor Control',
    subheadline: experiments.headline === 'variant'
      ? 'Start with what works in real homes, then dig into the science and step-by-step guides.'
      : 'Explore our comprehensive guides, scientific explanations, and targeted solutions to keep your home fresh and your cat happy.',
    proofLead: experiments.proofOrder === 'variant'
      ? 'Start with the proof cat owners care about.'
      : 'Understand the science first, then choose the right solution.',
    ctaHeadline: experiments.ctaCopy === 'variant'
      ? 'Ready to Put This Into Practice?'
      : 'Ready to Experience the Difference?',
    ctaBody: experiments.ctaCopy === 'variant'
      ? 'Apply what you learned with a low-risk trial and validate results in your own home.'
      : 'Put what you\'ve learned into practice. Try Purrify risk-free with our trial size and see why thousands of cat parents swear by it.',
    ctaLabel: experiments.ctaCopy === 'variant'
      ? 'Start My Low-Risk Trial'
      : 'Try Purrify Risk-Free',
    proofOrder: experiments.proofOrder === 'variant'
      ? 'before-guides'
      : 'after-guides',
  } as const;

  return (
    <>
      <ServerExperimentViewTracker assignments={experiments.assignments} />
      <LearnPageClient experimentCopy={experimentCopy} />
    </>
  );
}
