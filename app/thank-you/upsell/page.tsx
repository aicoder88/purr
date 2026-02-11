import type { Metadata } from 'next';
import { Container } from '@/components/ui/container';
import UpsellClient from './UpsellClient';

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  return {
    title: 'Special One-Time Offer - Purrify',
    description: 'Exclusive one-time offer for new customers. Save 25% on quarterly autoship subscription.',
    robots: {
      index: false,
      follow: false,
    },
    alternates: {
      canonical: '/thank-you/upsell',
    },
    openGraph: {
      url: 'https://www.purrify.ca/thank-you/upsell',
      title: 'Special One-Time Offer - Purrify',
      description: 'Exclusive one-time offer for new customers. Save 25% on quarterly autoship subscription.',
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
