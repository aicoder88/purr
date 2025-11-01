import { cn } from '@/lib/utils';

interface ScrollAnchorProps {
  id: string;
  className?: string;
}

export function ScrollAnchor({ id, className }: ScrollAnchorProps) {
  return (
    <div
      id={id}
      data-scroll-anchor
      tabIndex={-1}
      className={cn('block h-0 w-full scroll-mt-24 md:scroll-mt-32', className)}
    />
  );
}
