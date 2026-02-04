import type { Metadata } from 'next';
import { SITE_NAME } from '@/lib/constants';
import dynamic from 'next/dynamic';

// Dynamically import the heavy contact page content to reduce initial bundle size
const ContactPageContent = dynamic(
  () => import('./ContactPageContent').then((mod) => mod.ContactPageContent),
  {
    loading: () => (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-950 dark:via-purple-950/20 dark:to-gray-900 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-12 w-72 bg-gray-200 dark:bg-gray-700 rounded-lg" />
          <div className="h-4 w-96 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
      </div>
    ),
  }
);

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
