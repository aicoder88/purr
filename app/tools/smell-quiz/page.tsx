import type { Metadata } from 'next';
import SmellQuizContent from './SmellQuizContent';

export const metadata: Metadata = {
  title: 'Cat Litter Smell Quiz | Find Your Purrify Match',
  description: 'Take the 2-minute smell quiz to assess litter-box odor risk and get the right Purrify size recommendation for your home.',
  keywords: [
    'cat litter smell quiz',
    'litter odor assessment',
    'cat odor control quiz',
    'ammonia smell quiz',
    'litter box odor solution',
  ],
  openGraph: {
    type: 'website',
    url: 'https://www.purrify.ca/tools/smell-quiz/',
    siteName: 'Purrify',
    title: 'Cat Litter Smell Quiz | Find Your Purrify Match',
    description: 'Take the 2-minute smell quiz to assess odor risk and get a product recommendation.',
    locale: 'en_CA',
    images: [
      {
        url: 'https://www.purrify.ca/optimized/logos/purrify-logo.png',
        width: 1200,
        height: 800,
        alt: 'Cat Litter Smell Quiz',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@purrifyhq',
    creator: '@purrifyhq',
    title: 'Cat Litter Smell Quiz | Find Your Purrify Match',
    description: 'Assess your litter-box odor risk and get the right Purrify size.',
    images: ['https://www.purrify.ca/optimized/logos/purrify-logo.png'],
  },
  alternates: {
    canonical: 'https://www.purrify.ca/tools/smell-quiz/',
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

const smellQuizSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.purrify.ca/tools/smell-quiz/#webpage',
      url: 'https://www.purrify.ca/tools/smell-quiz/',
      name: 'Cat Litter Smell Quiz | Find Your Purrify Match',
      description:
        'Take the 2-minute smell quiz to assess litter-box odor risk and get the right Purrify size recommendation.',
      inLanguage: 'en-CA',
      isPartOf: { '@id': 'https://www.purrify.ca/#website' },
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Cat Litter Smell Quiz',
      applicationCategory: 'UtilityApplication',
      operatingSystem: 'Any',
      url: 'https://www.purrify.ca/tools/smell-quiz/',
      description:
        'Interactive cat litter odor-risk quiz with score-based product recommendations for single and multi-cat homes.',
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
        { '@type': 'ListItem', position: 3, name: 'Smell Quiz', item: 'https://www.purrify.ca/tools/smell-quiz/' },
      ],
    },
  ],
};

export default function SmellQuizPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(smellQuizSchema) }}
      />
      <SmellQuizContent />
    </>
  );
}
