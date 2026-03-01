'use client';

import dynamic from 'next/dynamic';
import { ComponentProps, useEffect, useState, useRef } from 'react';
import { ClientLocationsMap as OriginalClientLocationsMap } from './ClientLocationsMap';

const ClientLocationsMap = dynamic(
  () => import('./ClientLocationsMap').then((mod) => mod.ClientLocationsMap),
  {
    ssr: false,
    loading: () => <div className="h-[620px] w-full bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg" aria-hidden="true" />
  }
);

function getReservedSectionHeight(height?: string, showHeader = true): number {
  const parsedHeight = Number.parseInt(height ?? '600', 10);
  const safeMapHeight = Number.isFinite(parsedHeight) ? parsedHeight : 600;
  const headerSpace = showHeader ? 220 : 0;

  return safeMapHeight + headerSpace;
}

export function LazyClientLocationsMap(props: ComponentProps<typeof OriginalClientLocationsMap>) {
  const [isInViewport, setIsInViewport] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const reservedHeight = getReservedSectionHeight(props.height, props.showHeader !== false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const element = containerRef.current;
    if (!element) {
      setIsInViewport(true);
      return;
    }

    // Use Intersection Observer to only load when component is near viewport
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry && entry.isIntersecting) {
            setIsInViewport(true);
            observer.disconnect();
          }
        },
        {
          // Start loading when component is 200px below viewport
          rootMargin: '200px 0px',
          threshold: 0
        }
      );

      observer.observe(element);
      return () => observer.disconnect();
    } else {
      // Fallback for browsers without IntersectionObserver
      setIsInViewport(true);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className={props.className}
      style={{ minHeight: `${reservedHeight}px` }}
    >
      {isInViewport ? (
        <ClientLocationsMap {...props} />
      ) : (
        <div
          className="w-full bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg"
          style={{ minHeight: `${reservedHeight}px` }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
