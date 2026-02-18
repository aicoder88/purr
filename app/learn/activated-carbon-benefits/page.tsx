export const dynamic = 'force-static';

import type { Metadata } from 'next';
import { SITE_NAME } from '../../../src/lib/constants';
import ActivatedCarbonBenefitsContent from './ActivatedCarbonBenefitsContent';

export const metadata: Metadata = {
  title: `Activated Carbon Litter Benefits Guide | ${SITE_NAME}`,
  description: 'Discover how activated carbon litter additive benefits your cat and home. Learn the science behind odor elimination and safety.',
  keywords: ['activated carbon cat litter', 'activated carbon litter additive benefits', 'cat litter deodorizer', 'activated carbon odor control', 'natural cat litter odor eliminator'],
  alternates: {
    canonical: 'https://www.purrify.ca/learn/activated-carbon-benefits/',
    languages: {
      'en-CA': 'https://www.purrify.ca/learn/activated-carbon-benefits',
      'fr-CA': 'https://www.purrify.ca/fr/learn/activated-carbon-benefits',
      'en-US': 'https://www.purrify.ca/es/learn/activated-carbon-benefits',
      'x-default': 'https://www.purrify.ca/es/learn/activated-carbon-benefits',
    },
  },
  openGraph: {
    type: 'article',
    url: 'https://www.purrify.ca/learn/activated-carbon-benefits/',
    title: 'Activated Carbon Litter Benefits Guide',
    description: 'Discover how activated carbon litter additive benefits your cat and home. Learn the science behind odor elimination and safety.',
    locale: 'en_CA',
    images: [
      {
        url: 'https://www.purrify.ca/optimized/benefits-hero-science.webp',
        width: 1200,
        height: 800,
        alt: 'Activated carbon litter additive benefits - science guide',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@purrifyhq',
    creator: '@purrifyhq',
  },
};

export default function ActivatedCarbonBenefitsPage() {
  return <ActivatedCarbonBenefitsContent />;
}
