import type { Metadata } from 'next';
import CalculatorContent from './CalculatorContent';

export const metadata: Metadata = {
  title: 'Cat Litter Cost Calculator | Compare Litter Types',
  description: 'Free cat litter calculator: compare annual costs across clay, silica, tofu, and natural litters. Estimate usage, costs, and savings with our interactive tool.',
  keywords: ['cat litter calculator', 'litter cost calculator', 'cat litter comparison', 'annual litter cost', 'cat litter savings'],
  openGraph: {
    type: 'website',
    url: 'https://www.purrify.ca/tools/cat-litter-calculator/',/
    siteName: 'Purrify',
    title: 'Cat Litter Cost Calculator | Compare Litter Types',
    description: 'Free cat litter calculator: compare annual costs across litter types.',
    locale: 'en_CA',
    images: [
      {
        url: 'https://www.purrify.ca/optimized/logos/purrify-logo.png',/
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
    images: ['https://www.purrify.ca/optimized/logos/purrify-logo.png'/],
  },
  alternates: {
    canonical: 'https://www.purrify.ca/tools/cat-litter-calculator/',/
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

const calculatorSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.purrify.ca/tools/cat-litter-calculator/#webpage',
      url: 'https://www.purrify.ca/tools/cat-litter-calculator/',/
      name: 'Cat Litter Cost Calculator | Compare Litter Types',
      description: 'Free cat litter calculator: compare annual costs across clay, silica, tofu, and natural litters.',
      inLanguage: 'en-CA',
      isPartOf: { '@id': 'https://www.purrify.ca/#website' },
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Cat Litter Cost Calculator',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web Browser',
      url: 'https://www.purrify.ca/tools/cat-litter-calculator/',/
      description: 'Free interactive calculator comparing annual cat litter costs across clay, silica, tofu, wood, and natural litter types. Includes Purrify savings estimation.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'CAD',
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.purrify.ca/' },
        { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.purrify.ca/tools/'/ },
        { '@type': 'ListItem', position: 3, name: 'Cat Litter Calculator', item: 'https://www.purrify.ca/tools/cat-litter-calculator/'/ },
      ],
    },
  ],
};

export default function CatLitterCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(calculatorSchema) }}
      />
      <CalculatorContent />
    </>
  );
}
