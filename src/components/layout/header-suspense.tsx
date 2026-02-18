'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import Header with SSR disabled to prevent hydration issues
// Header uses useSearchParams which requires client-side rendering
const Header = dynamic(() => import('./header').then(mod => ({ default: mod.Header })), {
  ssr: false,
  loading: () => <HeaderFallback />,
});

export function HeaderWithSuspense() {
  return (
    <Suspense fallback={<HeaderFallback />}>
      <Header />
    </Suspense>
  );
}

function HeaderFallback() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="w-32 h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        <div className="hidden md:flex items-center gap-4">
          <div className="w-20 h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="w-20 h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="w-20 h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </div>
        <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
      </div>
    </header>
  );
}
