import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface ScrollAnchorProps {
  id: string;
  className?: string;
  onVisible?: () => void;
}

export function ScrollAnchor({ id, className, onVisible }: ScrollAnchorProps) {
  const ref = useRef<HTMLDivElement>(null);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    if (!onVisible || !ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTriggeredRef.current) {
            hasTriggeredRef.current = true;
            onVisible();
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px',
      }
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [onVisible]);

  return (
    <div
      ref={ref}
      id={id}
      data-scroll-anchor
      tabIndex={-1}
      className={cn('block h-0 w-full scroll-mt-24 md:scroll-mt-32', className)}
    />
  );
}
