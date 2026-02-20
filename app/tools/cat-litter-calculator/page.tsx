import type { Metadata } from 'next';
import CalculatorContent from './CalculatorContent';

export const metadata: Metadata = {
  title: 'Cat Litter Cost Calculator | Compare Litter Types | Purrify',
  description: 'Free cat litter calculator: compare annual costs across clay, silica, tofu, and natural litters. Estimate usage, costs, and savings with our interactive tool.',
  keywords: ['cat litter calculator', 'litter cost calculator', 'cat litter comparison', 'annual litter cost', 'cat litter savings'],
  openGraph: {
    type: 'website',
    url: 'https://www.purrify.ca/tools/cat-litter-calculator/',
    siteName: 'Purrify',
    title: 'Cat Litter Cost Calculator | Compare Litter Types',
    description: 'Free cat litter calculator: compare annual costs across litter types.',
    locale: 'en_CA',
    images: [
      {
        url: 'https://www.purrify.ca/optimized/logos/purrify-logo.png',
        width: 1200,
        height: 800,
        alt: 'Cat Litter Cost Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@purrifyhq',
    creator: '@purrifyhq',
    title: 'Cat Litter Cost Calculator | Compare Litter Types',
    description: 'Free cat litter calculator: compare annual costs across litter types.',
    images: ['https://www.purrify.ca/optimized/logos/purrify-logo.png'],
  },
  alternates: {
    canonical: 'https://www.purrify.ca/tools/cat-litter-calculator/',
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

export default function CatLitterCalculatorPage() {
  return <CalculatorContent />;
}
