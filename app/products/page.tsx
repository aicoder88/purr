export const dynamic = 'force-static';

import type { Metadata } from 'next';
import PageContent from './PageContent';

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
        url: 'https://www.purrify.ca/images/Logos/purrify-logo.png/',
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

export default function ProductsPage() {
  return <PageContent />;
}
