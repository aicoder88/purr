"use client";

import { ReactNode, useCallback, useMemo, useState, MutableRefObject, useEffect } from 'react';
import { useIntersectionObserver } from '@/lib/component-utils';

interface LazyLoadProps {
  children: ReactNode;
  placeholder?: ReactNode;
  className?: string;
  rootMargin?: string;
  threshold?: number | number[];
  once?: boolean;
}

export function LazyLoad({
  children,
  placeholder = null,
  className,
  rootMargin = '200px 0px',
  threshold = 0.1,
  once = true
}: LazyLoadProps) {
  const [isVisible, setIsVisible] = useState(false);

  const observerOptions = useMemo<IntersectionObserverInit>(
    () => ({ rootMargin, threshold }),
    [rootMargin, threshold]
  );

  const preloadOffset = useMemo(() => {
    const firstMarginValue = rootMargin.trim().split(/\s+/)[0] || '200px';
    const parsed = Number.parseInt(firstMarginValue, 10);
    return Number.isFinite(parsed) ? Math.max(parsed, 0) : 200;
  }, [rootMargin]);

  const handleVisibilityChange = useCallback(
    (visible: boolean) => {
      if (visible) {
        setIsVisible(true);
      } else if (!once) {
        setIsVisible(false);
      }
    },
    [once]
  );

  const containerRef = useIntersectionObserver(handleVisibilityChange, observerOptions);

  useEffect(() => {
    if (!once || isVisible) {
      return;
    }

    const loadIfPassedViewport = () => {
      const element = containerRef.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      if (rect.top <= window.innerHeight + preloadOffset) {
        setIsVisible(true);
      }
    };

    loadIfPassedViewport();
    window.addEventListener('scroll', loadIfPassedViewport, { passive: true });
    window.addEventListener('resize', loadIfPassedViewport);

    return () => {
      window.removeEventListener('scroll', loadIfPassedViewport);
      window.removeEventListener('resize', loadIfPassedViewport);
    };
  }, [containerRef, isVisible, once, preloadOffset]);

  return (
    <div
      ref={containerRef as MutableRefObject<HTMLDivElement | null>}
      className={className}
      aria-busy={!isVisible}
    >
      {isVisible ? children : placeholder}
    </div>
  );
}
