import { useState, useCallback } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Check, Zap, Calendar, Shield, Truck, Star } from 'lucide-react';
import { useTranslation } from '../../lib/translation-context';
import { formatCurrencyValue } from '../../lib/pricing';
import { getPaymentLink } from '../../lib/payment-links';
import {
  SUBSCRIPTION_PLANS,
  SubscriptionPlan,
  SubscriptionOptimizer
} from '../../lib/subscription-optimizer';

interface SubscriptionSelectorProps {
  productId: string;
  onPlanSelect: (plan: SubscriptionPlan) => void;
  selectedPlan?: SubscriptionPlan | null;
}

export function SubscriptionSelector({
  productId,
  onPlanSelect,
  selectedPlan = null
}: SubscriptionSelectorProps) {
  const { t, locale } = useTranslation();
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

  const handlePlanSelect = useCallback((plan: SubscriptionPlan) => {
    onPlanSelect(plan);
  }, [onPlanSelect]);

  const getPaymentLinkForPlan = (plan: SubscriptionPlan): string | null => {
    const linkKey = SubscriptionOptimizer.getPaymentLinkKey(plan.id, productId);
    return linkKey ? getPaymentLink(linkKey) : null;
  };

  const calculateMonthlyPrice = (plan: SubscriptionPlan): number => {
    return plan.billingPeriod === 'quarterly'
      ? plan.price / 3
      : plan.billingPeriod === 'biannual'
        ? plan.price / 6
        : plan.price;
  };

  const getBillingPeriodText = (plan: SubscriptionPlan): string => {
    switch (plan.billingPeriod) {
      case 'monthly':
        return 'per month';
      case 'quarterly':
        return 'per month (billed quarterly)';
      case 'biannual':
        return 'per month (billed every 6 months)';
      default:
        return 'per month';
    }
  };

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h3 className="font-heading text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Subscribe & Save
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          Get Purrify delivered automatically and save up to 30%
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {SUBSCRIPTION_PLANS.map((plan) => {
          const isSelected = selectedPlan?.id === plan.id;
          const isRecommended = plan.id === 'quarterly';
          const monthlyPrice = calculateMonthlyPrice(plan);
          const paymentLink = getPaymentLinkForPlan(plan);
          const ltv = SubscriptionOptimizer.calculateLTV(plan, 12);

          return (
            <div
              key={plan.id}
              className={`
                relative bg-white dark:bg-gray-800 rounded-2xl p-6 border-2 transition-all duration-300
                ${isSelected
                  ? 'border-[#FF3131] shadow-xl scale-105'
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                }
                ${isRecommended ? 'ring-4 ring-amber-400/20' : ''}
                ${hoveredPlan === plan.id ? 'shadow-lg' : ''}
              `}
              onMouseEnter={() => setHoveredPlan(plan.id)}
              onMouseLeave={() => setHoveredPlan(null)}
            >
              {/* Recommended badge */}
              {isRecommended && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-gray-900 dark:text-gray-800 px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                  ⭐ MOST POPULAR
                </div>
              )}

              {/* Plan header */}
              <div className="text-center mb-6">
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {plan.name}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {plan.description}
                </p>
              </div>

              {/* Pricing */}
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-[#FF3131] dark:text-[#FF5555] mb-1">
                  {formatCurrencyValue(monthlyPrice, locale)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {getBillingPeriodText(plan)}
                </div>
                {plan.savingsPercentage > 0 && (
                  <div className="inline-block bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 px-3 py-1 rounded-full text-sm font-bold mt-2">
                    Save {plan.savingsPercentage}%
                  </div>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 dark:text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Value metrics */}
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mb-6">
                <div className="text-center text-sm text-gray-600 dark:text-gray-300">
                  <div className="font-semibold text-gray-900 dark:text-white mb-1">
                    Annual Value: {formatCurrencyValue(ltv, locale)}
                  </div>
                  <div>Retention Rate: {Math.round(plan.retentionRate * 100)}%</div>
                </div>
              </div>

              {/* Action button */}
              {paymentLink ? (
                <Button
                  asChild
                  className={`
                    w-full py-3 font-bold transition-all duration-300
                    ${isSelected || isRecommended
                      ? 'bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80 text-white hover:from-[#FF3131]/90 hover:to-[#FF3131] shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-[#FF3131] hover:text-white'
                    }
                  `}
                >
                  <a
                    href={paymentLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handlePlanSelect(plan)}
                  >
                    {isSelected ? 'Selected' : isRecommended ? 'Get Started' : 'Choose Plan'}
                  </a>
                </Button>
              ) : (
                <Button
                  className={`
                    w-full py-3 font-bold transition-all duration-300
                    ${isSelected || isRecommended
                      ? 'bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80 text-white hover:from-[#FF3131]/90 hover:to-[#FF3131]'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-[#FF3131] hover:text-white'
                    }
                  `}
                  onClick={() => handlePlanSelect(plan)}
                >
                  {isSelected ? 'Selected' : isRecommended ? 'Get Started' : 'Choose Plan'}
                </Button>
              )}

              {/* Trust indicators */}
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                <div className="flex items-center justify-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <Shield className="w-3 h-3" />
                    <span>Secure</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Truck className="w-3 h-3" />
                    <span>Free Shipping</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>Cancel Anytime</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Benefits section */}
      <div className="mt-12 bg-gradient-to-r from-[#FF3131]/5 to-[#FF3131]/10 dark:from-gray-800 dark:to-gray-700/80 rounded-2xl p-8 border border-[#FF3131]/10 dark:border-gray-600">
        <div className="text-center mb-6">
          <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Why Subscribe?
          </h4>
        </div>

        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="flex justify-center mb-2">
              <Zap className="w-8 h-8 text-[#FF3131]" />
            </div>
            <div className="font-bold text-gray-900 dark:text-white mb-1">
              Save Money
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Up to 30% savings vs one-time purchases
            </div>
          </div>
          <div>
            <div className="flex justify-center mb-2">
              <Truck className="w-8 h-8 text-[#FF3131]" />
            </div>
            <div className="font-bold text-gray-900 dark:text-white mb-1">
              Free Shipping
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Always free, always on time
            </div>
          </div>
          <div>
            <div className="flex justify-center mb-2">
              <Star className="w-8 h-8 text-[#FF3131]" />
            </div>
            <div className="font-bold text-gray-900 dark:text-white mb-1">
              VIP Treatment
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Priority support & exclusive perks
            </div>
          </div>
        </div>
      </div>

      {/* FAQ section */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Questions? {' '}
          <Link href="/support/subscription" className="text-[#FF3131] hover:underline">
            View subscription FAQ
          </Link>
        </p>
      </div>
    </div>
  );
}
