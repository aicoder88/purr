import type { Metadata } from 'next';
import LoginContent from './LoginContent';

export const metadata: Metadata = {
  title: 'Affiliate Login - Purrify',
  description: 'Sign in to your Purrify affiliate dashboard to track earnings and manage your account.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AffiliateLoginPage() {
  return <LoginContent />;
}
