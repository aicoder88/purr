import type { Metadata } from 'next';
import CalculatorContent from './CalculatorContent';

const CALCULATOR_TITLE = 'Cat Litter Cost Calculator | Annual Cost Comparison';
const CALCULATOR_DESCRIPTION =
  'Use this free calculator to compare annual cat litter costs across clay, crystal, tofu, wood, and natural litters and estimate savings.';
const CALCULATOR_APP_DESCRIPTION =
  'Interactive cat litter cost calculator that compares annual spend across clay, crystal, tofu, wood, and natural litters with savings estimates.';

export const metadata: Metadata = {
  title: CALCULATOR_TITLE,
  description: CALCULATOR_DESCRIPTION,
  keywords: ['cat litter calculator', 'litter cost calculator', 'cat litter comparison', 'annual litter cost', 'cat litter savings'],
  openGraph: {
    type: 'website',
    url: 'https://www.purrify.ca/tools/cat-litter-calculator/',
    siteName: 'Purrify',
    title: CALCULATOR_TITLE,
    description: CALCULATOR_DESCRIPTION,
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
    title: CALCULATOR_TITLE,
    description: CALCULATOR_DESCRIPTION,
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

const calculatorSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.purrify.ca/tools/cat-litter-calculator/#webpage',
      url: 'https://www.purrify.ca/tools/cat-litter-calculator/',
      name: CALCULATOR_TITLE,
      description: CALCULATOR_DESCRIPTION,
      inLanguage: 'en-CA',
      isPartOf: { '@id': 'https://www.purrify.ca/#website' },
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Cat Litter Cost Calculator',
      applicationCategory: 'UtilityApplication',
      operatingSystem: 'Any',
      url: 'https://www.purrify.ca/tools/cat-litter-calculator/',
      image: 'https://www.purrify.ca/optimized/logos/purrify-logo.png',
      description: CALCULATOR_APP_DESCRIPTION,
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
        { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.purrify.ca/tools/' },
        { '@type': 'ListItem', position: 3, name: 'Cat Litter Calculator', item: 'https://www.purrify.ca/tools/cat-litter-calculator/' },
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
