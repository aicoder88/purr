'use client';

import dynamic from 'next/dynamic';

const LaserCursor = dynamic(
  () => import('../ui/paw-cursor').then((mod) => ({ default: mod.LaserCursor })),
  { ssr: false }
);

const ScrollToTopButton = dynamic(
  () => import('../ui/scroll-to-top'),
  { ssr: false }
);

const MobileFloatingCTA = dynamic(
  () => import('../ui/MobileFloatingCTA').then((mod) => ({ default: mod.MobileFloatingCTA })),
  { ssr: false }
);

export function AppChrome() {
  return (
    <>
      <LaserCursor />
      <ScrollToTopButton />
      <MobileFloatingCTA />
    </>
  );
}
