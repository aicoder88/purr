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
      name: t.subscriptionOfferExtended?.familyPlanTitle || 'Best Value Autoship – 3 × Regular size 120g',
      description:
        t.subscriptionOfferExtended?.familyDescription ||
        'Designed for multi-cat and allergy-prone homes. Our best price per scoop.',
      priceFormatted: formatProductPrice('familyAutoship', locale),
      perMonthLabel: formatPerMonth(familyAutoshipPrice),
      billingLabel: t.subscriptionOfferExtended?.quarterlyBilling || 'Billed every 3 months',
      shippingNote: t.subscriptionOfferExtended?.freeShippingIncluded || 'Free shipping included',
      savingsPercent: computeSavings(familyPrice, familyAutoshipPrice),
      features: [
        t.subscriptionOfferExtended?.includesThreeFamily || 'Includes 3 × Regular size 120g packs (delivered together)',
        t.subscriptionOfferExtended?.freeShippingIncluded || 'Free shipping included',
        t.subscriptionOfferExtended?.priorityCustomerSupport || 'Priority customer support',
      ],
      highlight: true,
      badge: t.subscriptionOfferExtended?.bestValueBadge || 'Best Value',
      linkKey: 'familyAutoship',
      ctaLabel: t.subscriptionOfferExtended?.startAutoship || 'Start Autoship',
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-950 dark:via-purple-950/20 dark:to-gray-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-80 h-80 bg-purple-300/20 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-300/20 dark:bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <Container className="relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header - Enhanced */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/40 dark:to-pink-900/40 rounded-full mb-8 border border-purple-200 dark:border-purple-800 shadow-lg">
              <Zap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <span className="font-bold text-purple-700 dark:text-purple-300">{t.subscriptionOfferExtended?.autoshipBadge || 'Quarterly Autoship'}</span>
            </div>
            
            <h2 className="font-heading text-5xl md:text-7xl font-black tracking-tight mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 dark:from-purple-400 dark:via-pink-400 dark:to-orange-400 bg-clip-text text-transparent leading-tight">
              {t.subscriptionOfferExtended?.headline || 'Subscribe & Save'}
            </h2>
            
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed font-medium">
              {t.subscriptionOfferExtended?.supportingCopy || 'Choose the bundle that automatically restocks every 3 months, keeps your home fresh, and protects your budget.'}
            </p>
          </div>

          {/* Subscription Plans - Enhanced */}
          <div className="flex justify-center mb-16">
            {plans.map(plan => {
              const paymentLink = getPaymentLink(plan.linkKey);
              const savingsLabel = plan.savingsPercent > 0 ? formatSavingsText(plan.savingsPercent) : null;

              return (
                <div
                  key={plan.id}
                  className={`relative overflow-hidden rounded-3xl transition-all duration-500 bg-white dark:bg-gray-800 shadow-2xl hover:shadow-purple-500/30 dark:hover:shadow-purple-500/50 hover:scale-[1.03] max-w-md border-2 ${
                    plan.highlight ? 'border-purple-300 dark:border-purple-600' : 'border-gray-200 dark:border-gray-700'
                  }`}
                >
                  {/* Gradient overlay */}
                  {plan.highlight && (
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-orange-500/5 dark:from-purple-500/10 dark:via-pink-500/10 dark:to-orange-500/10 pointer-events-none" aria-hidden="true" />
                  )}
                  
                  {/* Badge */}
                  {plan.badge && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white dark:text-gray-100 px-6 py-2 rounded-full shadow-xl text-sm font-black uppercase tracking-wide">
                        {plan.badge}
                      </div>
                    </div>
                  )}

                  <div className="pt-14 px-8 pb-8 space-y-6 relative">
                    {/* Title & Description */}
                    <div className="space-y-3 text-center">
                      <h3 className="font-heading text-2xl md:text-3xl font-black text-gray-900 dark:text-white leading-tight">
                        {plan.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                        {plan.description}
                      </p>
                    </div>

                    {/* Pricing */}
                    <div className="text-center space-y-3 py-4">
                      <div className="text-5xl font-black bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                        {plan.priceFormatted}
                      </div>
                      <p className="text-base font-bold text-purple-600 dark:text-purple-400">
                        {plan.perMonthLabel}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {plan.billingLabel}
                      </p>

                      {/* Shipping Callout - Enhanced */}
                      <div className={`rounded-xl p-4 font-bold text-base shadow-lg ${
                        plan.id === 'family-autoship'
                          ? 'bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/40 dark:to-emerald-900/40 text-green-800 dark:text-green-200 border-2 border-green-400 dark:border-green-600'
                          : 'bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/40 dark:to-orange-900/40 text-amber-900 dark:text-amber-200 border-2 border-amber-400 dark:border-amber-600'
                      }`}>
                        {plan.id === 'family-autoship'
                          ? '✓ FREE SHIPPING INCLUDED'
                          : '+ Shipping costs apply'}
                      </div>

                      {/* Savings Badge */}
                      {savingsLabel && (
                        <div className="inline-block bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/50 dark:to-emerald-900/50 text-green-800 dark:text-green-200 px-5 py-2 rounded-full text-sm font-black border-2 border-green-300 dark:border-green-700 shadow-md">
                          {savingsLabel}
                        </div>
                      )}
                    </div>

                    {/* Features */}
                    <ul className="space-y-4 text-base py-4">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3 text-gray-700 dark:text-gray-200">
                          <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full p-1 mt-0.5 flex-shrink-0">
                            <Check className="w-4 h-4 text-white dark:text-gray-100" />
                          </div>
                          <span className="font-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <div className="pt-4">
                      {paymentLink ? (
                        <Button
                          asChild
                          className="w-full py-6 text-xl font-black transition-all duration-300 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 text-white dark:text-gray-100 shadow-2xl hover:shadow-purple-500/50 hover:scale-105"
                        >
                          <a href={paymentLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3">
                            <Zap className="w-6 h-6" />
                            {plan.ctaLabel}
                          </a>
                        </Button>
                      ) : (
                        <Button
                          className="w-full py-6 text-xl font-black bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 opacity-60"
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

          {/* Trust Indicators - Enhanced */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center group">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-5 rounded-2xl mb-4 shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <Truck className="w-10 h-10 text-white dark:text-gray-100" />
              </div>
              <h4 className="font-black text-lg text-gray-900 dark:text-white mb-2">
                {t.homepage.subscription.fastDelivery}
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                {t.homepage.subscription.quickReliableShipping}
              </p>
            </div>
            
            <div className="flex flex-col items-center group">
              <div className="bg-gradient-to-br from-pink-500 to-pink-600 p-5 rounded-2xl mb-4 shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <Shield className="w-10 h-10 text-white dark:text-gray-100" />
              </div>
              <h4 className="font-black text-lg text-gray-900 dark:text-white mb-2">
                {t.homepage.subscription.thirtyDayGuarantee}
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                {t.homepage.subscription.moneyBackPromise}
              </p>
            </div>
            
            <div className="flex flex-col items-center group">
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-5 rounded-2xl mb-4 shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <Clock className="w-10 h-10 text-white dark:text-gray-100" />
              </div>
              <h4 className="font-black text-lg text-gray-900 dark:text-white mb-2">
                {t.homepage.subscription.skipAnytime}
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                {t.homepage.subscription.fullControlDeliveries}
              </p>
            </div>
            
            <div className="flex flex-col items-center group">
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-5 rounded-2xl mb-4 shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <Star className="w-10 h-10 text-white dark:text-gray-100" />
              </div>
              <h4 className="font-black text-lg text-gray-900 dark:text-white mb-2">
                {t.homepage.subscription.fiveStarRated}
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                {t.homepage.subscription.lovedByCustomers}
              </p>
            </div>
          </div>

          {/* Social Proof - Enhanced */}
          <div className="mt-16 text-center bg-white dark:bg-gray-800 rounded-3xl p-10 shadow-2xl border-2 border-purple-200 dark:border-purple-800">
            <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg font-semibold">
              {t.homepage.subscription.joinSatisfiedCustomers}
            </p>
            <div className="flex justify-center items-center space-x-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-8 h-8 fill-yellow-400 text-yellow-400 dark:text-yellow-300" />
              ))}
              <span className="ml-3 text-gray-900 dark:text-white font-black text-xl">
                {t.homepage.subscription.reviewsRating}
              </span>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-300 italic font-medium max-w-2xl mx-auto leading-relaxed">
              "{t.homepage.subscription.testimonialQuote}"
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}