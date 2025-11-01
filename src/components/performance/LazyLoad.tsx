import { ReactNode, useCallback, useMemo, useState, MutableRefObject } from 'react';
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
