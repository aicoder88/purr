import type { Metadata } from 'next';
import { Container } from '@/components/ui/container';
import UpsellClient from './UpsellClient';
import { SITE_NAME } from '@/lib/constants';

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(): Promise<Metadata> {
  const title = 'Special One-Time Offer - Purrify';
  const description = 'Exclusive one-time offer for new customers. Save 25% on quarterly autoship subscription.';

  return {
    title,
    description,
    keywords: ['Purrify order confirmation', 'thank you', 'order complete'],
    robots: {
      index: false,
      follow: false,
    },
    alternates: {
      canonical: 'https://www.purrify.ca/thank-you/upsell/',
      languages: {
        'en-CA': 'https://www.purrify.ca/thank-you/upsell/',
        'fr-CA': 'https://www.purrify.ca/fr/thank-you/upsell/',
        'en-US': 'https://www.purrify.ca/thank-you/upsell/',
        'x-default': 'https://www.purrify.ca/thank-you/upsell/',
      },
    },
    openGraph: {
      url: 'https://www.purrify.ca/thank-you/upsell/',
      siteName: SITE_NAME,
      locale: 'en_CA',
      title,
      description,
      images: [
        {
          url: 'https://www.purrify.ca/images/Logos/purrify-logo.png',
          width: 1200,
          height: 630,
          alt: 'Purrify',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@purrifyhq',
      creator: '@purrifyhq',
      title,
      description,
      images: ['https://www.purrify.ca/images/Logos/purrify-logo.png'],
    },
  };
}

export default async function UpsellPage({ searchParams }: Props) {
  const params = await searchParams;
  const email = typeof params.email === 'string' ? params.email : undefined;
  const sessionId = typeof params.session_id === 'string' ? params.session_id : undefined;

  return (
    <Container>
      <UpsellClient initialEmail={email} sessionId={sessionId} />
    </Container>
  );
}
