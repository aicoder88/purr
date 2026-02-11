import type { Metadata } from 'next';
import LoginContent from './LoginContent';

export const metadata: Metadata = {
  title: 'Affiliate Login | Purrify',
  description: 'Log in to your Purrify affiliate account.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AffiliateLoginPage() {
  return <LoginContent />;
}
