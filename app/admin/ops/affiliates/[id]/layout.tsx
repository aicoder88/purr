import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Affiliate Details - Purrify Hub',
};

export default function AffiliateDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
