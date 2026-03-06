'use client';

import React from 'react';
import { Shield, Truck, Lock, Leaf, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

interface TrustBadgesProps {
  variant?: 'horizontal' | 'grid' | 'compact' | 'elegant';
  showIcons?: boolean;
  maxBadges?: number;
  className?: string;
}

interface BadgeConfig {
  key: string;
  icon: React.ReactNode;
  titleKey: string;
  descriptionKey: string;
  highlightKey: string;
}

const BADGES: BadgeConfig[] = [
  {
    key: 'moneyBack',
    icon: <Shield className="w-5 h-5" />,
    titleKey: 'trustBadges.moneyBack.title',
    descriptionKey: 'trustBadges.moneyBack.description',
    highlightKey: 'trustBadges.moneyBack.highlight',
  },
  {
    key: 'securePayment',
    icon: <Lock className="w-5 h-5" />,
    titleKey: 'trustBadges.securePayment.title',
    descriptionKey: 'trustBadges.securePayment.description',
    highlightKey: 'trustBadges.securePayment.highlight',
  },
  {
    key: 'fastShipping',
    icon: <Truck className="w-5 h-5" />,
    titleKey: 'trustBadges.fastShipping.title',
    descriptionKey: 'trustBadges.fastShipping.description',
    highlightKey: 'trustBadges.fastShipping.highlight',
  },
  {
    key: 'premiumQuality',
    icon: <Leaf className="w-5 h-5" />,
    titleKey: 'trustBadges.premiumQuality.title',
    descriptionKey: 'trustBadges.premiumQuality.description',
    highlightKey: 'trustBadges.premiumQuality.highlight',
  },
  {
    key: 'happyCustomers',
    icon: <MapPin className="w-5 h-5" />,
    titleKey: 'trustBadges.happyCustomers.title',
    descriptionKey: 'trustBadges.happyCustomers.description',
    highlightKey: 'trustBadges.happyCustomers.highlight',
  },
];

export const TrustBadges: React.FC<TrustBadgesProps> = ({
  variant = 'horizontal',
  showIcons = true,
  maxBadges = 5,
  className = '',
}) => {
  const t = useTranslations();
  const visibleBadges = BADGES.slice(0, maxBadges);

  if (variant === 'compact') {
    return (
      <div className={cn('flex flex-wrap items-center justify-center gap-x-6 gap-y-2', className)}>
        {visibleBadges.map((badge) => (
          <div key={badge.key} className="flex items-center gap-1.5 text-sm text-gray-300">
            {showIcons && <span className="text-brand-pink">{badge.icon}</span>}
            <span className="font-medium text-gray-200">{t(badge.highlightKey)}</span>
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'elegant') {
    return (
      <div className={cn('flex flex-wrap items-center justify-center gap-3', className)}>
        {visibleBadges.map((badge, i) => (
          <React.Fragment key={badge.key}>
            <div className="flex items-center gap-2 text-sm">
              {showIcons && <span className="text-brand-yellow">{badge.icon}</span>}
              <span className="font-semibold text-gray-200">{t(badge.titleKey)}</span>
            </div>
            {i < visibleBadges.length - 1 && (
              <span className="text-gray-600" aria-hidden="true">|</span>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  }

  const gridCols = variant === 'grid'
    ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'
    : 'flex flex-wrap items-start justify-center gap-6';

  return (
    <div className={cn(gridCols, className)}>
      {visibleBadges.map((badge) => (
        <div
          key={badge.key}
          className="flex flex-col items-center text-center gap-2 max-w-[160px]"
        >
          {showIcons && (
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-pink/10 text-brand-pink">
              {badge.icon}
            </div>
          )}
          <div>
            <p className="text-sm font-semibold text-gray-200">{t(badge.titleKey)}</p>
            <p className="text-xs text-gray-400 mt-0.5">{t(badge.highlightKey)}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export const SecurityBadges: React.FC<{ className?: string }> = ({ className = '' }) => (
  <TrustBadges variant="compact" maxBadges={3} className={className} />
);

export const CheckoutTrustBadges: React.FC<{ className?: string }> = ({ className = '' }) => (
  <TrustBadges variant="elegant" maxBadges={3} className={className} />
);

export const SocialProofBadges: React.FC<{ className?: string }> = ({ className = '' }) => (
  <TrustBadges variant="compact" maxBadges={4} className={className} />
);

export default TrustBadges;
