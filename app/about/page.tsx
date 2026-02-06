export const dynamic = 'force-static';

import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    url: '/about',
    title: 'About Purrify',
    description: 'Learn about Purrify and our mission to eliminate cat litter odors naturally.',
  },
};

export default function AboutRedirectPage() {
  redirect('/about/our-story');
}
