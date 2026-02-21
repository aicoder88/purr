import type { Metadata } from 'next';
import SignupContent from './SignupContent';

export const metadata: Metadata = {
  title: 'Join Affiliate Program',
  description: 'Sign up for the Purrify affiliate program and start earning commissions.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function AffiliateSignupPage() {
  return <SignupContent />;
}
