import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Free Trial - Purrify',
  description: 'Get your free Purrify trial. Just pay shipping. Eliminate cat litter odors naturally with activated carbon.',
  alternates: {
    canonical: '/free-trial',
  },
};

export default function FreeTrialRedirectPage() {
  redirect('/try-free');
}
