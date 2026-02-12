export const dynamic = 'force-static';

import type { Metadata } from 'next';
import PageContent from './PageContent';

export const metadata: Metadata = {
  title: 'Purrify Family Pack (240g) - Best Value for Multi-Cat Homes',
  description: 'Best value cat litter freshener for multi-cat homes. 240g activated charcoal provides 2 months of odor control. Natural, works with any litter.',
  keywords: ['cat litter freshener', 'family pack', 'multi-cat', 'activated charcoal', 'odor control', '240g', 'best value'],
  openGraph: {
    type: 'website',
    url: 'https://www.purrify.ca/products/family-pack/',
    siteName: 'Purrify',
    title: 'Purrify Family Pack (240g) - Best Value for Multi-Cat Homes',
    description: 'Best value cat litter freshener for multi-cat homes. 240g activated charcoal from coconut shells. Best value per gram.',
    locale: 'en_CA',
    images: [
      {
        url: 'https://www.purrify.ca/optimized/140g-640w.avif/',
        width: 1200,
        height: 1200,
        alt: 'Purrify 240g Family Pack',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@purrifyhq',
    creator: '@purrifyhq',
    title: 'Purrify Family Pack (240g) - Best Value for Multi-Cat Homes',
    description: 'Best value cat litter freshener for multi-cat homes. 240g activated charcoal additive.',
    images: ['https://www.purrify.ca/optimized/140g-640w.avif'],
  },
  alternates: {
    canonical: 'https://www.purrify.ca/products/family-pack/',
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

export default function FamilyPackPage() {
  return <PageContent />;
}
