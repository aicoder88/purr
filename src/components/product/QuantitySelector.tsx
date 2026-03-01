import { useCallback } from 'react';
import { Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface QuantitySelectorProps {
  /** Current quantity value */
  quantity: number;
  /** Callback when quantity changes */
  onChange: (quantity: number) => void;
  /** Minimum quantity allowed */
  min?: number;
  /** Maximum quantity allowed */
  max?: number;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Optional className for the container */
  className?: string;
  /** Translation for quantity aria-label */
  quantityLabel?: string;
  /** Translation for decrease button aria-label */
  decreaseLabel?: string;
  /** Translation for increase button aria-label */
  increaseLabel?: string;
}

/**
 * QuantitySelector - A reusable quantity input with +/- buttons
 *
 * Features:
 * - Configurable min/max values
 * - Multiple size variants
 * - Full dark mode support
 * - Accessible with aria labels
 */
export function QuantitySelector({
  quantity,
  onChange,
  min = 1,
  max = 10,
  size = 'md',
  className,
  quantityLabel = 'Quantity',
  decreaseLabel = 'Decrease quantity',
  increaseLabel = 'Increase quantity',
}: QuantitySelectorProps) {
  const handleDecrease = useCallback(() => {
    if (quantity > min) {
      onChange(quantity - 1);
    }
  }, [quantity, min, onChange]);

  const handleIncrease = useCallback(() => {
    if (quantity < max) {
      onChange(quantity + 1);
    }
  }, [quantity, max, onChange]);

  const sizeClasses = {
    sm: {
      container: 'gap-1',
      button: 'p-1.5',
      icon: 'w-3 h-3',
      value: 'w-6 text-sm',
    },
    md: {
      container: 'gap-2',
      button: 'p-2',
      icon: 'w-4 h-4',
      value: 'w-8 text-base',
    },
    lg: {
      container: 'gap-3',
      button: 'p-3',
      icon: 'w-5 h-5',
      value: 'w-10 text-lg',
    },
  };

  const classes = sizeClasses[size];

  return (
    <div
      className={cn(
        'inline-flex items-center bg-gray-100 bg-gray-800 rounded-lg p-1',
        classes.container,
        className
      )}
      role="group"
      aria-label={quantityLabel}
    >
      <button
        type="button"
        onClick={handleDecrease}
        disabled={quantity <= min}
        className={cn(
          'rounded-md transition-colors',
          'text-gray-700 text-gray-300',
          'hover:bg-gray-200 hover:bg-gray-700',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'focus:outline-none focus:ring-2 focus:ring-deep-coral focus:ring-offset-1',
          'focus:ring-offset-gray-800',
          classes.button
        )}
        aria-label={decreaseLabel}
      >
        <Minus className={classes.icon} />
      </button>
      <span
        className={cn(
          'text-center font-bold text-gray-900 text-white',
          classes.value
        )}
        aria-live="polite"
        aria-atomic="true"
      >
        {quantity}
      </span>
      <button
        type="button"
        onClick={handleIncrease}
        disabled={quantity >= max}
        className={cn(
          'rounded-md transition-colors',
          'text-gray-700 text-gray-300',
          'hover:bg-gray-200 hover:bg-gray-700',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'focus:outline-none focus:ring-2 focus:ring-deep-coral focus:ring-offset-1',
          'focus:ring-offset-gray-800',
          classes.button
        )}
        aria-label={increaseLabel}
      >
        <Plus className={classes.icon} />
      </button>
    </div>
  );
}

export default QuantitySelector;
