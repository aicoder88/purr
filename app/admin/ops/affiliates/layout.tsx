import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Affiliates - Purrify Hub',
};

export default function AffiliatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
