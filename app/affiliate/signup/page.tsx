import type { Metadata } from 'next';
import SignupContent from './SignupContent';

export const metadata: Metadata = {
  title: 'Join Affiliate Program | Purrify',
  description: 'Sign up for the Purrify affiliate program and start earning commissions.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AffiliateSignupPage() {
  return <SignupContent />;
}
