import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Retailers - Purrify Hub',
};

export default function RetailersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
