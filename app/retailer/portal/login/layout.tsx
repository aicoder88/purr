import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Retailer Portal Login',
  description: 'Log in to your Purrify retailer portal to manage wholesale orders and account settings.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function RetailerLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
