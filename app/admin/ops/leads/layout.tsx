import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Leads - Purrify Hub',
};

export default function LeadsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
