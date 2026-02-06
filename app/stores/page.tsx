export const dynamic = 'force-static';

import type { Metadata } from 'next';
import PageContent from './PageContent';

export const metadata: Metadata = {
  title: 'Find Purrify Near You - Store Locator | Purrify',
  description: 'Find pet stores selling Purrify near you. Discover our partner retailers across Quebec, Ontario, and British Columbia. 25+ locations across Canada.',
  keywords: ['Purrify stores', 'pet store locator', 'find Purrify', 'cat litter additive retailers', 'where to buy Purrify'],
  openGraph: {
    title: 'Find Purrify Near You - Store Locator',
    description: 'Find pet stores selling Purrify near you. Discover our partner retailers across Quebec, Ontario, and British Columbia.',
    url: 'https://www.purrify.ca/stores',
    images: [
      {
        url: 'https://www.purrify.ca/images/Logos/purrify-logo.png',
        width: 1200,
        height: 630,
        alt: 'Purrify Store Locator',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.purrify.ca/stores',
  },
};

export default function StoresPage() {
  return <PageContent />;
}
