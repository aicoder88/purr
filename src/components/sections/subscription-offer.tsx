import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

import { useTranslation } from "../../lib/translation-context";
import { Check, Star, Truck, Shield, Clock, Zap } from 'lucide-react';
import { formatProductPrice, getProductPrice, formatCurrencyValue } from '../../lib/pricing';
import { getPaymentLink, PaymentLinkKey } from '../../lib/payment-links';

type SubscriptionPlan = {
  id: string;
  name: string;
  description: string;
  priceFormatted: string;
  perMonthLabel: string;
  billingLabel: string;
  shippingNote: string;
  savingsPercent: number;
  features: string[];
  highlight?: boolean;
  badge?: string;
  linkKey: PaymentLinkKey;
  ctaLabel: string;
};


export function SubscriptionOffer() {
  const { t, locale } = useTranslation();
  const standardPrice = getProductPrice('standard');
  const familyPrice = getProductPrice('family');
  const standardAutoshipPrice = getProductPrice('standardAutoship');
  const familyAutoshipPrice = getProductPrice('familyAutoship');

  const computeSavings = (oneTimePrice: number, autoshipPrice: number) => {
    if (oneTimePrice <= 0 || autoshipPrice <= 0) return 0;
    const baseline = oneTimePrice * 3;
    if (baseline <= 0) return 0;
    return Math.max(0, Math.round((1 - autoshipPrice / baseline) * 100));
  };

  const formatPerMonth = (price: number) => {
    const formatted = formatCurrencyValue(price / 3, locale);
    const template = t.subscriptionOfferExtended?.perMonthLabel || '≈ {price}/month effective';
    return template.replace('{price}', formatted);
  };

  const formatSavingsText = (percent: number) => {
    const template = t.subscriptionOfferExtended?.saveVsOneTime || 'Save {percent}% vs one-time purchase';
    return template.replace('{percent}', percent.toString());
  };

  const plans: SubscriptionPlan[] = [
    {
      id: 'family-autoship',
      name: t.subscriptionOfferExtended?.familyPlanTitle || 'Best Value Autoship – 3 × 120g',
      description:
        t.subscriptionOfferExtended?.familyDescription ||
        'Designed for multi-cat and allergy-prone homes. Our best price per scoop.',
      priceFormatted: formatProductPrice('familyAutoship', locale),
      perMonthLabel: formatPerMonth(familyAutoshipPrice),
      billingLabel: t.subscriptionOfferExtended?.quarterlyBilling || 'Billed every 3 months',
      shippingNote: t.subscriptionOfferExtended?.freeShippingIncluded || 'Free shipping included',
      savingsPercent: computeSavings(familyPrice, familyAutoshipPrice),
      features: [
        t.subscriptionOfferExtended?.includesThreeFamily || 'Includes 3 × 120g family packs (delivered together)',
        t.subscriptionOfferExtended?.freeShippingIncluded || 'Free shipping included',
        t.subscriptionOfferExtended?.priorityCustomerSupport || 'Priority customer support',
        t.subscriptionOfferExtended?.bonusFreeCatCareGuide || 'Bonus: Free cat care guide',
      ],
      highlight: true,
      badge: t.subscriptionOfferExtended?.bestValueBadge || 'Best Value',
      linkKey: 'familyAutoship',
      ctaLabel: t.subscriptionOfferExtended?.startAutoship || 'Start Autoship',
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-[#FF3131]/5 via-[#FFFFF5] to-[#FF3131]/10 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
      <Container>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80 text-white dark:text-gray-100 px-6 py-2 rounded-full mb-6 shadow-lg">
              <Zap className="w-5 h-5 mr-2" />
              <span className="font-bold">{t.subscriptionOfferExtended?.autoshipBadge || 'Quarterly Autoship'}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-50 mb-4">
              {t.subscriptionOfferExtended?.headline || 'Set & forget your litter odor defense'}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t.subscriptionOfferExtended?.supportingCopy || 'Choose the bundle that automatically restocks every 3 months, keeps your home fresh, and protects your budget.'}
            </p>
          </div>

          {/* Subscription Plans */}
          <div className="flex justify-center mb-12">
            {plans.map(plan => {
              const paymentLink = getPaymentLink(plan.linkKey);
              const savingsLabel = plan.savingsPercent > 0 ? formatSavingsText(plan.savingsPercent) : null;

              return (
                <div
                  key={plan.id}
                  className={`relative overflow-hidden rounded-2xl transition-all duration-300 bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl hover:scale-[1.02] max-w-md ${
                    plan.highlight ? 'ring-4 ring-[#FF3131]/25 scale-[1.02]' : ''
                  }`}
                >
                  {plan.highlight && (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#FF3131]/12 via-transparent to-transparent pointer-events-none" aria-hidden="true" />
                  )}
                  {plan.badge ? (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80 text-white dark:text-gray-100 px-5 py-1.5 rounded-full shadow-lg text-xs font-semibold uppercase tracking-wide">
                        {plan.badge}
                      </div>
                    </div>
                  ) : null}

                  <div className="p-8 space-y-6 relative">
                    <div className="space-y-2 text-center">
                      <h3 className={`text-2xl font-bold ${plan.highlight ? 'text-[#FF3131]' : 'text-gray-900 dark:text-gray-50'}`}>{plan.name}</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{plan.description}</p>
                    </div>

                    <div className="text-center space-y-3">
                      <div className="text-4xl font-extrabold text-gray-900 dark:text-gray-50">{plan.priceFormatted}</div>
                      <p className="text-sm font-medium text-[#FF3131]">{plan.perMonthLabel}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{plan.billingLabel}</p>

                      {/* Prominent Shipping Callout */}
                      <div className={`rounded-lg p-3 font-semibold text-sm ${
                        plan.id === 'family-autoship'
                          ? 'bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-200 border-2 border-green-500 dark:border-green-500'
                          : 'bg-amber-100 dark:bg-amber-900/40 text-amber-900 dark:text-amber-200 border-2 border-amber-500 dark:border-amber-500'
                      }`}>
                        {plan.id === 'family-autoship'
                          ? '✓ FREE SHIPPING INCLUDED'
                          : '+ Shipping costs apply'}
                      </div>

                      {savingsLabel ? (
                        <span className="inline-block mt-2 bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 px-4 py-1.5 rounded-full text-xs font-semibold border border-green-200 dark:border-green-700">
                          {savingsLabel}
                        </span>
                      ) : null}
                    </div>

                    <ul className="space-y-3 text-sm">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3 text-gray-700 dark:text-gray-200">
                          <Check className="w-4 h-4 text-[#03E46A] mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div>
                      {paymentLink ? (
                        <Button
                          asChild
                          className={`w-full py-4 text-lg font-bold transition-all duration-300 ${
                            plan.highlight
                              ? 'bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80 hover:from-[#FF3131]/90 hover:to-[#FF3131] text-white dark:text-gray-100 shadow-lg hover:shadow-xl'
                              : 'bg-gray-100 dark:bg-gray-700 hover:bg-[#FF3131] hover:text-white dark:text-gray-100 text-gray-800 dark:text-gray-100 border-2 border-gray-200 dark:border-gray-600 hover:border-[#FF3131] dark:hover:border-[#FF3131]'
                          }`}
                        >
                          <a href={paymentLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                            <Zap className="w-5 h-5" />
                            {plan.ctaLabel}
                          </a>
                        </Button>
                      ) : (
                        <Button
                          className={`w-full py-4 text-lg font-bold transition-all duration-300 ${
                            plan.highlight
                              ? 'bg-gradient-to-r from-[#FF3131] to-[#FF3131]/60 text-white dark:text-gray-100 opacity-80'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300 opacity-80'
                          }`}
                          disabled
                        >
                          {t.subscriptionOfferExtended?.linkComingSoon || 'Payment link coming soon'}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Trust Indicators */}
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-[#FF3131]/10 p-4 rounded-full mb-3">
                <Truck className="w-8 h-8 text-[#FF3131]" />
              </div>
              {/* <h4 className="font-bold text-gray-900 dark:text-gray-50 mb-1">Free Shipping</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">On all subscription orders</p> */}
              <h4 className="font-bold text-gray-900 dark:text-gray-50 mb-1">{t.homepage.subscription.fastDelivery}</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{t.homepage.subscription.quickReliableShipping}</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-[#FF3131]/10 p-4 rounded-full mb-3">
                <Shield className="w-8 h-8 text-[#FF3131]" />
              </div>
              <h4 className="font-bold text-gray-900 dark:text-gray-50 mb-1">{t.homepage.subscription.thirtyDayGuarantee}</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{t.homepage.subscription.moneyBackPromise}</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-[#FF3131]/10 p-4 rounded-full mb-3">
                <Clock className="w-8 h-8 text-[#FF3131]" />
              </div>
              <h4 className="font-bold text-gray-900 dark:text-gray-50 mb-1">{t.homepage.subscription.skipAnytime}</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{t.homepage.subscription.fullControlDeliveries}</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-[#FF3131]/10 p-4 rounded-full mb-3">
                <Star className="w-8 h-8 text-[#FF3131]" />
              </div>
              <h4 className="font-bold text-gray-900 dark:text-gray-50 mb-1">{t.homepage.subscription.fiveStarRated}</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{t.homepage.subscription.lovedByCustomers}</p>
            </div>
          </div>

          {/* Social Proof */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 dark:text-gray-300 mb-4">{t.homepage.subscription.joinSatisfiedCustomers}</p>
            <div className="flex justify-center items-center space-x-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400 dark:text-yellow-300" />
              ))}
              <span className="ml-2 text-gray-700 dark:text-gray-200 font-medium">{t.homepage.subscription.reviewsRating}</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 italic">
              {t.homepage.subscription.testimonialQuote}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
