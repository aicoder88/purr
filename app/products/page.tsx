import type { Metadata } from 'next';
import PageContent from './PageContent';

export const metadata: Metadata = {
  title: 'Purrify Products - Activated Carbon Litter Additive',
  description: '★ 4.8 Rating | FREE Trial Available | Shop Purrify activated carbon litter additives. Eliminates odors instantly. Ships to USA & Canada. 30-day guarantee.',
  keywords: ['Purrify products', 'cat litter additive', 'activated carbon', 'odor control', 'trial size', 'family pack'],
  openGraph: {
    title: 'Purrify Products - Activated Carbon Litter Additive',
    description: '★ 4.8 Rating | FREE Trial Available | Shop Purrify activated carbon litter additives. Eliminates odors instantly.',
    url: 'https://www.purrify.ca/products',
    images: [
      {
        url: 'https://www.purrify.ca/images/purrify-logo.png',
        width: 1200,
        height: 630,
        alt: 'Purrify Products',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.purrify.ca/products',
  },
};

export default function ProductsPage() {
  return <PageContent />;
}
