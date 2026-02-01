import type { Metadata } from 'next';
import SignupContent from './SignupContent';

export const metadata: Metadata = {
  title: 'Join Purrify Affiliate Program - Apply Now',
  description: 'Apply to become a Purrify affiliate partner. Start at 20% commission and grow up to 30% as a Partner. Plus get free products every month!',
  keywords: ['affiliate signup', 'earn commission', 'partner program', 'affiliate application'],
  alternates: {
    canonical: '/affiliate/signup',
  },
  openGraph: {
    title: 'Join Purrify Affiliate Program - Apply Now',
    description: 'Apply to become a Purrify affiliate partner. Start at 20% commission and grow up to 30% as a Partner.',
    url: 'https://www.purrify.ca/affiliate/signup',
    type: 'website',
  },
};

export default function AffiliateSignupPage() {
  return <SignupContent />;
}
