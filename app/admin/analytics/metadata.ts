import { Metadata } from 'next';
import { SITE_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: `Analytics Dashboard - ${SITE_NAME}`,
  description: 'Business analytics and insights - UTM attribution, customer segmentation, and A/B testing',
  robots: {
    index: false,
    follow: false,
  },
};
