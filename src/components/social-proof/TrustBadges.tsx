"use client";

import React from 'react';
import { Shield, Award, RefreshCw, Truck, Users, Star } from 'lucide-react';
import { useTranslations } from 'next-intl';

/*
 * TrustBadges Component
 * Displays various trust indicators and social proof badges.
 * Temporarily simplified to resolve build issues.
 */

// Placeholder interface to make other components happy
interface TrustBadge {
  id: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  titleKey: string;
  descriptionKey: string;
  highlightKey?: string;
  color: string;
}

interface TrustBadgesProps {
  variant?: 'horizontal' | 'grid' | 'compact' | 'elegant';
  showIcons?: boolean;
  maxBadges?: number;
  className?: string;
}

const TRUST_BADGES: TrustBadge[] = [
  {
    id: 'money-back',
    icon: RefreshCw,
    titleKey: 'moneyBack',
    descriptionKey: 'moneyBack',
    highlightKey: 'moneyBack',
    color: 'text-emerald-600 dark:text-emerald-400'
  },
  {
    id: 'secure-payment',
    icon: Shield,
    titleKey: 'securePayment',
    descriptionKey: 'securePayment',
    highlightKey: 'securePayment',
    color: 'text-blue-600 dark:text-blue-400'
  },
  {
    id: 'fast-shipping',
    icon: Truck,
    titleKey: 'fastShipping',
    descriptionKey: 'fastShipping',
    highlightKey: 'fastShipping',
    color: 'text-indigo-600 dark:text-indigo-400'
  },
  {
    id: 'customer-satisfaction',
    icon: Star,
    titleKey: 'customerRating',
    descriptionKey: 'customerRating',
    highlightKey: 'customerRating',
    color: 'text-amber-600 dark:text-amber-400'
  }
];

export const TrustBadges: React.FC<TrustBadgesProps> = ({
  variant = 'horizontal',
  showIcons = true,
  maxBadges,
  className = ''
}) => {
  return (
    <div className={`p-4 border border-dashed border-gray-300 dark:border-gray-600 rounded text-center text-sm ${className}`}>
      Trust Badges Placeholder
    </div>
  );
};

export const SecurityBadges: React.FC<{ className?: string }> = ({ className = '' }) => (
  <TrustBadges variant="compact" maxBadges={3} className={className} />
);

export const CheckoutTrustBadges: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`p-2 border border-dashed border-green-300 dark:border-green-600 rounded text-center text-xs ${className}`}>
      Checkout Trust Badges Placeholder
    </div>
  );
};

export const SocialProofBadges: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`p-2 border border-dashed border-blue-300 dark:border-blue-600 rounded text-center text-xs ${className}`}>
      Social Proof Badges Placeholder
    </div>
  );
};

export default TrustBadges;
