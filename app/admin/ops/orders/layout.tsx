import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Orders - Purrify Hub',
};

export default function OrdersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
