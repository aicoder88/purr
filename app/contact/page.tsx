import type { Metadata } from 'next';
import { SITE_NAME } from '@/lib/constants';
import { ContactPageContent } from './ContactPageContent';

export const metadata: Metadata = {
  title: `Contact Us - ${SITE_NAME} Customer Support & Help`,
  description:
    'Get in touch with the Purrify team for product questions, business inquiries, and customer support. Fast response times and expert assistance.',
  keywords: [
    'contact purrify',
    'cat litter customer support',
    'purrify help',
    'activated carbon questions',
    'pet product support',
  ],
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: `Contact Us - ${SITE_NAME}`,
    description: 'Get in touch with the Purrify team for support and inquiries.',
    url: 'https://www.purrify.ca/contact',
    type: 'website',
  },
};

export default function ContactPage() {
  return <ContactPageContent />;
}
