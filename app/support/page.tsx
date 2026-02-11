import type { Metadata } from 'next';
import Link from 'next/link';
import { Mail, Phone, Truck, MessageCircle, Clock, HelpCircle, Package, Shield } from 'lucide-react';

import { Container } from '../../src/components/ui/container';
import { Button } from '../../src/components/ui/button';
import { SITE_NAME, CONTACT_INFO } from '../../src/lib/constants';
import { buildLanguageAlternates } from '../../src/lib/seo-utils';


export const metadata: Metadata = {
  title: `Customer Support - ${SITE_NAME} Help Center`,
  description: 'Need help? Fast support for orders, shipping, returns. Email, phone, or WhatsApp available 7 days/week. Response within 24 hours. Ships to USA & Canada.',
  keywords: ['customer support', 'help center', 'contact purrify', 'order help'],
  alternates: {
    canonical: 'https://www.purrify.ca/support',
    languages: {
      'en-CA': 'https://www.purrify.ca/support',
      'fr-CA': 'https://www.purrify.ca/fr/support',
      'zh-CN': 'https://www.purrify.ca/zh/support',
      'es-US': 'https://www.purrify.ca/es/support',
      'en-US': 'https://www.purrify.ca/support',
      'x-default': 'https://www.purrify.ca/support',
    },
  },
  openGraph: {
    type: 'website',
    url: 'https://www.purrify.ca/support',
    title: `Customer Support - ${SITE_NAME} Help Center`,
    description: 'Need help? Fast support for orders, shipping, returns. Email, phone, or WhatsApp available 7 days/week.',
    locale: 'en_CA',
    images: [
      {
        url: 'https://www.purrify.ca/customer-support-hero.jpg',
        width: 1200,
        height: 800,
        alt: `Customer Support - ${SITE_NAME} Help Center`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@purrifyhq',
    creator: '@purrifyhq',
  },
  other: {
    'last-modified': '2025-11-18',
  },
};

// CustomerService schema
const customerServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'CustomerService',
  name: 'Purrify Customer Support',
  description: 'Fast support for orders, shipping, returns. Email, phone, or WhatsApp available 7 days/week.',
  url: 'https://www.purrify.ca/support',
  provider: {
    '@type': 'Organization',
    name: 'Purrify',
  },
  availableChannel: [
    {
      '@type': 'ServiceChannel',
      serviceType: 'Email Support',
      serviceSmsNumber: CONTACT_INFO.email,
    },
    {
      '@type': 'ServiceChannel',
      serviceType: 'Phone Support',
      servicePhone: CONTACT_INFO.phone,
    },
  ],
  areaServed: ['CA', 'US'],
};

// Client component for the interactive parts
import SupportPageClient from './SupportPageClient';

export default function SupportPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(customerServiceSchema) }}
      />
      <SupportPageClient />
    </>
  );
}
