import { Metadata } from 'next';
import { SITE_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: `A/B Tests - ${SITE_NAME}`,
  description: 'Create and manage A/B test experiments',
  robots: {
    index: false,
    follow: false,
  },
};
