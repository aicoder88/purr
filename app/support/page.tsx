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
    canonical: '/support',
    languages: {
      'en-CA': 'https://www.purrify.ca/support',
      'fr-CA': 'https://www.purrify.ca/fr/support',
      'zh-CN': 'https://www.purrify.ca/zh/support',
      'es': 'https://www.purrify.ca/es/support',
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
        url: 'https://www.purrify.ca/optimized/90day-hero.webp',
        width: 1200,
        height: 800,
        alt: `Customer Support - Purrify Help Center`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@purrifyhq',
    creator: '@purrifyhq',
  },
};

// Client component for the interactive parts
import SupportPageClient from './SupportPageClient';

export default function SupportPage() {
  return <SupportPageClient />;
}
