"use client";

import React from 'react';


/*
 * TrustBadges Component
 * Displays various trust indicators and social proof badges.
 * Temporarily simplified to resolve build issues.
 */

interface TrustBadgesProps {
  variant?: 'horizontal' | 'grid' | 'compact' | 'elegant';
  showIcons?: boolean;
  maxBadges?: number;
  className?: string;
}

export const TrustBadges: React.FC<TrustBadgesProps> = ({
  className = ''
}) => {
  return (
    <div className={`p-4 border border-dashed border-gray-300 dark:border-gray-600 rounded text-center text-sm ${className}`}>
      Trust Badges Placeholder
    </div>
  );
};

export const SecurityBadges: React.FC<{ className?: string }> = ({ className = '' }) => (
  <TrustBadges className={className} />
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
