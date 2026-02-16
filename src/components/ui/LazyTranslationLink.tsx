/**
 * LazyTranslationLink
 * 
 * A Next.js Link component that automatically prefetches translations
 * when the user hovers over or focuses the link.
 */

'use client';

import Link from 'next/link';
import { useCallback, useRef } from 'react';
import { usePrefetchTranslation } from '@/lib/translation-context-lazy';

interface LazyTranslationLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  prefetchTranslations?: boolean;
  prefetchDelay?: number;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onFocus?: () => void;
  [key: string]: unknown;
}

export function LazyTranslationLink({
  href,
  children,
  className,
  prefetchTranslations = true,
  prefetchDelay = 100,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  ...props
}: LazyTranslationLinkProps) {
  const prefetch = usePrefetchTranslation();
  const prefetchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const handleMouseEnter = useCallback(() => {
    if (prefetchTranslations) {
      // Delay prefetch slightly to avoid prefetching on quick mouse passes
      prefetchTimeoutRef.current = setTimeout(() => {
        prefetch(href);
      }, prefetchDelay);
    }
    
    onMouseEnter?.();
  }, [prefetchTranslations, prefetchDelay, prefetch, href, onMouseEnter]);
  
  const handleMouseLeave = useCallback(() => {
    // Cancel prefetch if user leaves before delay
    if (prefetchTimeoutRef.current) {
      clearTimeout(prefetchTimeoutRef.current);
      prefetchTimeoutRef.current = null;
    }
    
    onMouseLeave?.();
  }, [onMouseLeave]);
  
  const handleFocus = useCallback(() => {
    if (prefetchTranslations) {
      prefetch(href);
    }
    
    onFocus?.();
  }, [prefetchTranslations, prefetch, href, onFocus]);
  
  return (
    <Link
      href={href}
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      {...props}
    >
      {children}
    </Link>
  );
}
