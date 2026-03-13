import type { Metadata } from 'next';
import { normalizeMetaDescription } from '@/lib/seo-utils';

const description = normalizeMetaDescription(
  "Learn how Purrify was founded, why we chose activated carbon granules, and how our Canada-based team helps cat owners solve litter box odor at the source."
);

export const metadata: Metadata = {
  title: 'Our Story: Mission Behind Purrify',
  description,
  alternates: {
    canonical: 'https://www.purrify.ca/about/our-story/',
    languages: {
      'en-CA': 'https://www.purrify.ca/about/our-story/',
      'x-default': 'https://www.purrify.ca/about/our-story/',
    },
  },
  openGraph: {
    title: 'Our Story: Mission Behind Purrify',
    description,
    url: 'https://www.purrify.ca/about/our-story/',
    type: 'website',
  },
};
