import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Operations Dashboard - Purrify Hub',
  robots: {
    index: false,
    follow: false,
  },
};

export default function OpsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
