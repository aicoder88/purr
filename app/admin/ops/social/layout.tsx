import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Social Media - Purrify Hub',
};

export default function SocialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
