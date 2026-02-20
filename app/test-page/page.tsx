import type { Metadata } from 'next';
import { SITE_NAME, SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: `Test Page | ${SITE_NAME}`,
  description: 'Internal test page for Purrify.',
  alternates: {
    canonical: `${SITE_URL}/test-page/`,
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function TestPage() {
    return <div>Test Page Works</div>;
}
