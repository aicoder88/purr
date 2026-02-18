
import { Container } from '@/components/ui/container';
import { ReferralDashboard } from '@/components/referral/ReferralDashboard';
import type { Metadata } from 'next';
import { SITE_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: `Referral Program - Give $5, Get $5 | ${SITE_NAME}`,
  description: 'Share Purrify with friends and earn rewards. Give $5 off to your friends and get $5 credit when they make their first purchase.',
  keywords: [
    'purrify referral',
    'referral program',
    'give 5 get 5',
    'cat litter referral',
    'pet product rewards',
    'share and earn',
  ],
  alternates: {
    canonical: 'https://www.purrify.ca/referral/',
    languages: {
      'en-CA': 'https://www.purrify.ca/referral/',
      'fr-CA': 'https://www.purrify.ca/fr/referral/',
      'zh-CN': 'https://www.purrify.ca/zh/referral/',
      'es-US': 'https://www.purrify.ca/es/referral/',
      'en-US': 'https://www.purrify.ca/referral/',
      'x-default': 'https://www.purrify.ca/referral/',
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
  openGraph: {
    type: 'website',
    url: 'https://www.purrify.ca/referral/',
    siteName: SITE_NAME,
    title: `Referral Program - Give $5, Get $5 | ${SITE_NAME}`,
    description: 'Share Purrify with friends and earn rewards. Give $5 off to your friends and get $5 credit when they make their first purchase.',
    locale: 'en_CA',
    images: [
      {
        url: 'https://www.purrify.ca/images/Logos/purrify-logo.png',
        width: 1200,
        height: 800,
        alt: `${SITE_NAME} Referral Program`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@purrifyhq',
    creator: '@purrifyhq',
    title: `Referral Program - Give $5, Get $5 | ${SITE_NAME}`,
    description: 'Share Purrify with friends and earn rewards. Give $5 off to your friends and get $5 credit.',
    images: ['https://www.purrify.ca/images/Logos/purrify-logo.png'],
  },
  other: {
    'last-modified': '2025-11-17',
  },
};

// Service schema for Referral Program
const schema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Purrify Referral Program',
  description: 'Share Purrify with friends and earn rewards. Give $5 off to your friends and get $5 credit when they make their first purchase.',
  provider: {
    '@type': 'Organization',
    name: 'Purrify',
  },
  serviceType: 'Referral Program',
  offers: {
    '@type': 'Offer',
    description: 'Give $5 off to friends, get $5 credit',
  },
};

export default function ReferralPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-2">
                Give $5, Get $5
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Share your unique referral code and earn rewards
              </p>
            </div>

            <ReferralDashboard />
          </div>
        </Container>
      </main>
    </>
  );
}
