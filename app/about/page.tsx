import { permanentRedirect } from 'next/navigation';
import { buildPageMetadata } from '@/lib/seo/page-metadata';

export const metadata = buildPageMetadata({
  title: 'About Purrify',
  description:
    'Learn about Purrify and our mission to eliminate cat litter odors naturally with activated carbon technology.',
  canonicalUrl: 'https://www.purrify.ca/about/our-story/',
  image: 'https://www.purrify.ca/optimized/marketing/mission.webp',
  imageAlt: 'Purrify mission and origin story',
  robots: {
    index: false,
    follow: false,
  },
});

export default function AboutRedirectPage() {
  permanentRedirect('/about/our-story/');
}
