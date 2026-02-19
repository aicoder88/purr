import * as React from 'react';
import { ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslations, useLocale } from 'next-intl';

export interface GuaranteeBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Size variant for the badge
   * - 'sm': Compact size for inline use with CTAs
   * - 'md': Default size for standalone use
   */
  size?: 'sm' | 'md';
  /**
   * Whether to show the icon
   */
  showIcon?: boolean;
}

/**
 * A trust-building badge displaying the 30-Day Money-Back Guarantee.
 * Can be placed inline with CTAs or as a standalone trust signal.
 */
export function GuaranteeBadge({
  className,
  size = 'md',
  showIcon = true,
  ...props
}: GuaranteeBadgeProps) {
  const t = useTranslations();

  const sizeClasses = {
    sm: 'px-2.5 py-1 text-xs gap-1.5',
    md: 'px-3 py-1.5 text-sm gap-2',
  };

  const iconSizes = {
    sm: 'h-3.5 w-3.5',
    md: 'h-4 w-4',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-md border font-medium',
        'bg-green-50 text-green-700 border-green-200',
        'dark:bg-green-900/20 dark:text-green-300 dark:border-green-800',
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {showIcon && (
        <ShieldCheck
          className={cn(
            'flex-shrink-0',
            iconSizes[size]
          )}
          aria-hidden="true"
        />
      )}
      <span>{t('ui.moneyBackGuarantee')}</span>
    </div>
  );
}

export default GuaranteeBadge;
