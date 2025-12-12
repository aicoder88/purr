import React from 'react';
import { Shield, Award, RefreshCw, Truck, Users, Star } from 'lucide-react';
import { useTranslation } from '../../lib/translation-context';

interface TrustBadge {
  id: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  titleKey: string;
  descriptionKey: string;
  highlightKey?: string;
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
    titleKey: 'moneyBack',
    descriptionKey: 'moneyBack',
    highlightKey: 'moneyBack',
    color: 'text-green-600 dark:text-green-400'
  },
  {
    id: 'secure-payment',
    icon: Shield,
    titleKey: 'securePayment',
    descriptionKey: 'securePayment',
    highlightKey: 'securePayment',
    color: 'text-blue-600 dark:text-blue-400 dark:text-blue-300'
  },
  {
    id: 'fast-shipping',
    icon: Truck,
    titleKey: 'fastShipping',
    descriptionKey: 'fastShipping',
    highlightKey: 'fastShipping',
    color: 'text-purple-600 dark:text-purple-400'
  },
  {
    id: 'customer-satisfaction',
    icon: Star,
    titleKey: 'customerRating',
    descriptionKey: 'customerRating',
    highlightKey: 'customerRating',
    color: 'text-yellow-600 dark:text-yellow-400'
  },
  {
    id: 'trusted-customers',
    icon: Users,
    titleKey: 'happyCustomers',
    descriptionKey: 'happyCustomers',
    highlightKey: 'happyCustomers',
    color: 'text-indigo-600 dark:text-indigo-400'
  },
  {
    id: 'quality-guarantee',
    icon: Award,
    titleKey: 'premiumQuality',
    descriptionKey: 'premiumQuality',
    highlightKey: 'premiumQuality',
    color: 'text-red-600 dark:text-red-400'
  }
];

export const TrustBadges: React.FC<TrustBadgesProps> = ({
  variant = 'horizontal',
  showIcons = true,
  maxBadges,
  className = ''
}) => {
  const { t } = useTranslation();
  const badges = maxBadges ? TRUST_BADGES.slice(0, maxBadges) : TRUST_BADGES;

  const getTrustBadgeText = (badge: TrustBadge, textType: 'title' | 'description' | 'highlight') => {
    const trustBadge = t.trustBadges?.[badge.titleKey as keyof typeof t.trustBadges];
    if (trustBadge && typeof trustBadge === 'object') {
      return trustBadge[textType] || '';
    }
    return '';
  };

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
                {getTrustBadgeText(badge, 'title')}
              </div>
              {badge.highlightKey && (
                <div className={`text-xs font-medium ${badge.color}`}>
                  {getTrustBadgeText(badge, 'highlight')}
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
            <h3 className="font-heading font-bold text-gray-900 dark:text-gray-100 mb-2">
              {getTrustBadgeText(badge, 'title')}
            </h3>
            {badge.highlightKey && (
              <div className={`text-sm font-semibold ${badge.color} mb-2`}>
                {getTrustBadgeText(badge, 'highlight')}
              </div>
            )}
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              {getTrustBadgeText(badge, 'description')}
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
            {getTrustBadgeText(badge, 'title')}
          </div>
          {badge.highlightKey && (
            <div className={`text-xs font-medium ${badge.color} mb-2`}>
              {getTrustBadgeText(badge, 'highlight')}
            </div>
          )}
          <p className="text-gray-600 dark:text-gray-300 text-xs leading-relaxed">
            {getTrustBadgeText(badge, 'description')}
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
  const { t } = useTranslation();
  const checkoutBadges = TRUST_BADGES.filter(badge => 
    ['money-back', 'secure-payment', 'fast-shipping'].includes(badge.id)
  );

  const getTrustBadgeText = (badge: TrustBadge, textType: 'title' | 'description' | 'highlight') => {
    const trustBadge = t.trustBadges?.[badge.titleKey as keyof typeof t.trustBadges];
    if (trustBadge && typeof trustBadge === 'object') {
      return trustBadge[textType] || '';
    }
    return '';
  };

  return (
    <div className={`flex flex-col space-y-3 ${className}`}>
      {checkoutBadges.map((badge) => (
        <div key={badge.id} className="flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
          <div className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0">
            <badge.icon className="w-full h-full" />
          </div>
          <div>
            <div className="font-semibold text-green-800 dark:text-green-200 text-sm">
              {getTrustBadgeText(badge, 'title')}
            </div>
            <div className="text-green-700 dark:text-green-300 dark:text-green-400 text-xs">
              {getTrustBadgeText(badge, 'description')}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const SocialProofBadges: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { t } = useTranslation();
  const socialBadges = TRUST_BADGES.filter(badge => 
    ['customer-satisfaction', 'trusted-customers', 'quality-guarantee'].includes(badge.id)
  );

  const getTrustBadgeText = (badge: TrustBadge, textType: 'title' | 'description' | 'highlight') => {
    const trustBadge = t.trustBadges?.[badge.titleKey as keyof typeof t.trustBadges];
    if (trustBadge && typeof trustBadge === 'object') {
      return trustBadge[textType] || '';
    }
    return '';
  };

  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${className}`}>
      {socialBadges.map((badge) => (
        <div key={badge.id} className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <div className={`w-10 h-10 ${badge.color} mx-auto mb-3`}>
            <badge.icon className="w-full h-full" />
          </div>
          <div className="font-bold text-gray-900 dark:text-gray-100 mb-1">
            {getTrustBadgeText(badge, 'highlight')}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300">
            {getTrustBadgeText(badge, 'title')}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrustBadges;
