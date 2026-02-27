import type { Metadata } from 'next';
import SignupContent from './SignupContent';

export const metadata: Metadata = {
  title: 'Join Affiliate Program',
  description: 'Sign up for the Purrify affiliate program and start earning commissions.',
  alternates: {
    canonical: 'https://www.purrify.ca/affiliate/signup/',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.purrify.ca/affiliate/signup/',
    title: 'Join Affiliate Program',
    description: 'Sign up for the Purrify affiliate program and start earning commissions.',
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function AffiliateSignupPage() {
  return <SignupContent />;
}
