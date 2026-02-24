import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us - Purrify Customer Support',
  description:
    'Get in touch with the Purrify team for product questions, business inquiries, and customer support.',
  alternates: {
    canonical: 'https://www.purrify.ca/contact/',
  },
  openGraph: {
    title: 'Contact Us - Purrify Customer Support',
    description:
      'Get in touch with the Purrify team for product questions, business inquiries, and customer support.',
    url: 'https://www.purrify.ca/contact/',
    type: 'website',
    siteName: 'Purrify',
    images: [
      {
        url: 'https://www.purrify.ca/optimized/logos/purrify-logo.png',
        width: 1200,
        height: 800,
        alt: 'Purrify Customer Support',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@purrifyhq',
    creator: '@purrifyhq',
    title: 'Contact Us - Purrify Customer Support',
    description:
      'Get in touch with the Purrify team for product questions, business inquiries, and customer support.',
    images: ['https://www.purrify.ca/optimized/logos/purrify-logo.png'],
  },
};

export { default } from './ContactPageClient';
