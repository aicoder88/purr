import { Metadata } from 'next';
import { SITE_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: `SEO Health Dashboard - ${SITE_NAME}`,
  description: 'Monitor SEO metrics and link optimization opportunities',
  robots: {
    index: false,
    follow: false,
  },
};
