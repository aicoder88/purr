import { CreditCard } from 'lucide-react';

interface BNPLBadgeProps {
  price: number;
  locale?: string;
  className?: string;
}

/**
 * Buy Now Pay Later badge showing installment payment options
 * Displays "4 interest-free payments of $X" for Klarna/Afterpay
 */
export function BNPLBadge({ price, locale = 'en', className = '' }: BNPLBadgeProps) {
  // Calculate installment amount (4 payments)
  const installmentAmount = (price / 4).toFixed(2);

  // Format for locale
  const formatPrice = (amount: string) => {
    if (locale === 'fr') {
      return `${amount} $`;
    }
    return `$${amount}`;
  };

  const installmentText = locale === 'fr'
    ? `ou 4 paiements de ${formatPrice(installmentAmount)} sans intérêts`
    : `or 4 interest-free payments of ${formatPrice(installmentAmount)}`;

  const providerText = locale === 'fr' ? 'avec Klarna' : 'with Klarna';

  return (
    <div className={`flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 ${className}`}>
      <CreditCard className="w-4 h-4 text-pink-500 dark:text-pink-400 flex-shrink-0" />
      <span>
        {installmentText}{' '}
        <span className="font-semibold text-pink-600 dark:text-pink-400">{providerText}</span>
      </span>
    </div>
  );
}

/**
 * Compact BNPL badge for tighter layouts
 */
export function BNPLBadgeCompact({ price, locale = 'en', className = '' }: BNPLBadgeProps) {
  const installmentAmount = (price / 4).toFixed(2);

  const formatPrice = (amount: string) => {
    if (locale === 'fr') {
      return `${amount} $`;
    }
    return `$${amount}`;
  };

  return (
    <div className={`inline-flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 ${className}`}>
      <span className="bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 px-2 py-0.5 rounded-full font-medium">
        {locale === 'fr' ? '4x' : '4×'} {formatPrice(installmentAmount)}
      </span>
      <span>{locale === 'fr' ? 'sans intérêts' : 'interest-free'}</span>
    </div>
  );
}

/**
 * Full BNPL section with provider logos for checkout areas
 */
export function BNPLSection({ price, locale = 'en', className = '' }: BNPLBadgeProps) {
  const installmentAmount = (price / 4).toFixed(2);

  const formatPrice = (amount: string) => {
    if (locale === 'fr') {
      return `${amount} $`;
    }
    return `$${amount}`;
  };

  return (
    <div className={`bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/10 dark:to-purple-900/10 border border-pink-100 dark:border-pink-800/30 rounded-xl p-4 ${className}`}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-10 h-10 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center shadow-sm">
          <CreditCard className="w-5 h-5 text-pink-500 dark:text-pink-400" />
        </div>
        <div>
          <p className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
            {locale === 'fr' ? 'Payez en 4 fois' : 'Pay in 4'}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {locale === 'fr'
              ? `4 paiements de ${formatPrice(installmentAmount)} sans intérêts avec Klarna ou Afterpay`
              : `4 interest-free payments of ${formatPrice(installmentAmount)} with Klarna or Afterpay`
            }
          </p>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              {locale === 'fr' ? 'Aucun intérêt' : 'No interest'}
            </span>
            <span className="text-gray-300 dark:text-gray-600">•</span>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              {locale === 'fr' ? 'Aucuns frais' : 'No fees'}
            </span>
            <span className="text-gray-300 dark:text-gray-600">•</span>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              {locale === 'fr' ? 'Approbation instantanée' : 'Instant approval'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BNPLBadge;
