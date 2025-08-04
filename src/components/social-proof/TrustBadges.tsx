import React from 'react';
import { Shield, Award, RefreshCw, Truck, Users, Star } from 'lucide-react';

interface TrustBadge {
  id: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  highlight?: string;
  color: string;
}

interface TrustBadgesProps {
  variant?: 'horizontal' | 'grid' | 'compact';
  showIcons?: boolean;
  maxBadges?: number;
  className?: string;
}

const TRUST_BADGES: TrustBadge[] = [
  {
    id: 'money-back',
    icon: RefreshCw,
    title: '30-Day Money Back',
    description: 'Not satisfied? Get a full refund within 30 days',
    highlight: '100% Guaranteed',
    color: 'text-green-600'
  },
  {
    id: 'secure-payment',
    icon: Shield,
    title: 'Secure Payment',
    description: 'SSL encrypted checkout with Stripe',
    highlight: '256-bit SSL',
    color: 'text-blue-600'
  },
  {
    id: 'fast-shipping',
    icon: Truck,
    title: 'Fast & Free Shipping',
    description: 'Free shipping on orders over $25',
    highlight: 'Same Day Processing',
    color: 'text-purple-600'
  },
  {
    id: 'customer-satisfaction',
    icon: Star,
    title: '4.9/5 Customer Rating',
    description: 'Based on 2,500+ verified reviews',
    highlight: '98% Satisfaction',
    color: 'text-yellow-600'
  },
  {
    id: 'trusted-customers',
    icon: Users,
    title: '10,000+ Happy Customers',
    description: 'Trusted by cat owners across Canada',
    highlight: 'Since 2019',
    color: 'text-indigo-600'
  },
  {
    id: 'quality-guarantee',
    icon: Award,
    title: 'Premium Quality',
    description: 'Food-grade activated carbon, lab tested',
    highlight: 'Certified Safe',
    color: 'text-red-600'
  }
];

export const TrustBadges: React.FC<TrustBadgesProps> = ({
  variant = 'horizontal',
  showIcons = true,
  maxBadges,
  className = ''
}) => {
  const badges = maxBadges ? TRUST_BADGES.slice(0, maxBadges) : TRUST_BADGES;

  const getLayoutClasses = () => {
    switch (variant) {
      case 'grid':
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
      case 'compact':
        return 'flex flex-wrap justify-center gap-4';
      default:
        return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4';
    }
  };

  const getBadgeClasses = () => {
    switch (variant) {
      case 'grid':
        return 'bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow';
      case 'compact':
        return 'bg-white dark:bg-gray-800 rounded-lg p-3 shadow-md border border-gray-200 dark:border-gray-700 flex items-center space-x-3 hover:shadow-lg transition-shadow';
      default:
        return 'bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md border border-gray-200 dark:border-gray-700 text-center hover:shadow-lg transition-shadow';
    }
  };

  if (variant === 'compact') {
    return (
      <div className={`${getLayoutClasses()} ${className}`}>
        {badges.map((badge) => (
          <div key={badge.id} className={getBadgeClasses()}>
            {showIcons && (
              <div className={`w-8 h-8 ${badge.color} flex-shrink-0`}>
                <badge.icon className="w-full h-full" />
              </div>
            )}
            <div className="text-left">
              <div className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
                {badge.title}
              </div>
              {badge.highlight && (
                <div className={`text-xs font-medium ${badge.color}`}>
                  {badge.highlight}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'grid') {
    return (
      <div className={`${getLayoutClasses()} ${className}`}>
        {badges.map((badge) => (
          <div key={badge.id} className={getBadgeClasses()}>
            {showIcons && (
              <div className={`w-12 h-12 ${badge.color} mx-auto mb-4`}>
                <badge.icon className="w-full h-full" />
              </div>
            )}
            <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">
              {badge.title}
            </h3>
            {badge.highlight && (
              <div className={`text-sm font-semibold ${badge.color} mb-2`}>
                {badge.highlight}
              </div>
            )}
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              {badge.description}
            </p>
          </div>
        ))}
      </div>
    );
  }

  // Default horizontal layout
  return (
    <div className={`${getLayoutClasses()} ${className}`}>
      {badges.map((badge) => (
        <div key={badge.id} className={getBadgeClasses()}>
          {showIcons && (
            <div className={`w-8 h-8 ${badge.color} mx-auto mb-3`}>
              <badge.icon className="w-full h-full" />
            </div>
          )}
          <div className="font-semibold text-gray-900 dark:text-gray-100 text-sm mb-1">
            {badge.title}
          </div>
          {badge.highlight && (
            <div className={`text-xs font-medium ${badge.color} mb-2`}>
              {badge.highlight}
            </div>
          )}
          <p className="text-gray-600 dark:text-gray-300 text-xs leading-relaxed">
            {badge.description}
          </p>
        </div>
      ))}
    </div>
  );
};

// Specific trust badge components for different use cases
export const SecurityBadges: React.FC<{ className?: string }> = ({ className = '' }) => (
  <TrustBadges
    variant="compact"
    maxBadges={3}
    className={className}
  />
);

export const CheckoutTrustBadges: React.FC<{ className?: string }> = ({ className = '' }) => {
  const checkoutBadges = TRUST_BADGES.filter(badge => 
    ['money-back', 'secure-payment', 'fast-shipping'].includes(badge.id)
  );

  return (
    <div className={`flex flex-col space-y-3 ${className}`}>
      {checkoutBadges.map((badge) => (
        <div key={badge.id} className="flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
          <div className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0">
            <badge.icon className="w-full h-full" />
          </div>
          <div>
            <div className="font-semibold text-green-800 dark:text-green-200 text-sm">
              {badge.title}
            </div>
            <div className="text-green-700 dark:text-green-300 text-xs">
              {badge.description}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const SocialProofBadges: React.FC<{ className?: string }> = ({ className = '' }) => {
  const socialBadges = TRUST_BADGES.filter(badge => 
    ['customer-satisfaction', 'trusted-customers', 'quality-guarantee'].includes(badge.id)
  );

  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${className}`}>
      {socialBadges.map((badge) => (
        <div key={badge.id} className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <div className={`w-10 h-10 ${badge.color} mx-auto mb-3`}>
            <badge.icon className="w-full h-full" />
          </div>
          <div className="font-bold text-gray-900 dark:text-gray-100 mb-1">
            {badge.highlight}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300">
            {badge.title}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrustBadges;
