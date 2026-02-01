import { Metadata } from 'next';
import { SITE_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: `Referral Analytics Dashboard - ${SITE_NAME}`,
  description: 'Comprehensive analytics and insights for the referral program',
  robots: {
    index: false,
    follow: false,
  },
};
