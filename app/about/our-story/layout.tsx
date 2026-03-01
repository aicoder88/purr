import type { Metadata } from 'next';

import { metadata as ourStoryMetadata } from './metadata';

export const metadata: Metadata = ourStoryMetadata;

export default function OurStoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
