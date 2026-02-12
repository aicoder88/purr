import type { Metadata } from 'next';
import PageContent from './PageContent';
import { SITE_NAME } from '@/lib/constants';
import { getCommercialExperimentState } from '@/lib/experiments/commercial-server';
import { ServerExperimentViewTracker } from '@/components/experiments/ServerExperimentViewTracker';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Purrify Reviews - What Cat Owners Are Saying',
  description: 'Read verified reviews from real cat owners who have transformed their homes with Purrify. ★ 4.9/5 average rating from 138+ customers across Canada.',
  keywords: ['Purrify reviews', 'cat litter freshener reviews', 'customer testimonials', 'verified reviews', 'cat owner feedback'],
  openGraph: {
    type: 'website',
    url: 'https://www.purrify.ca/reviews/',
    siteName: SITE_NAME,
    title: 'Purrify Reviews - What Cat Owners Are Saying',
    description: 'Read verified reviews from real cat owners who have transformed their homes with Purrify. ★ 4.9/5 average rating from 138+ customers.',
    locale: 'en_CA',
    images: [
      {
        url: 'https://www.purrify.ca/images/Logos/purrify-logo.png',
        width: 1200,
        height: 800,
        alt: 'Purrify Customer Reviews',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@purrifyhq',
    creator: '@purrifyhq',
    title: 'Purrify Reviews - What Cat Owners Are Saying',
    description: 'Read verified reviews from real cat owners who have transformed their homes with Purrify. ★ 4.9/5 average rating from 138+ customers.',
    images: ['https://www.purrify.ca/images/Logos/purrify-logo.png'],
  },
  alternates: {
    canonical: 'https://www.purrify.ca/reviews/',
    languages: {
      'en-CA': 'https://www.purrify.ca/reviews',
      'fr-CA': 'https://www.purrify.ca/fr/reviews',
      'zh-CN': 'https://www.purrify.ca/zh/reviews',
      'es-US': 'https://www.purrify.ca/es/reviews',
      'en-US': 'https://www.purrify.ca/reviews',
      'x-default': 'https://www.purrify.ca/reviews',
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
  other: {
    'last-modified': '2025-12-09',
  },
};

// Product schema with AggregateRating for Reviews page
const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: SITE_NAME,
  description: 'Activated carbon cat litter deodorizer that eliminates odors at the molecular level',
  image: [
    'https://www.purrify.ca/optimized/60g-transparent.webp',
    'https://www.purrify.ca/optimized/120g-transparent.webp',
    'https://www.purrify.ca/images/Logos/purrify-logo.png',
  ],
  brand: {
    '@type': 'Brand',
    name: SITE_NAME,
  },
  offers: {
    '@type': 'Offer',
    priceCurrency: 'CAD',
    price: '4.76',
    availability: 'https://schema.org/InStock',
    url: 'https://www.purrify.ca',
    itemCondition: 'https://schema.org/NewCondition',
  },
};

export default async function ReviewsPage() {
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <PageContent experimentCopy={experimentCopy} />
    </>
  );
}
