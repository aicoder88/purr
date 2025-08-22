import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

import { useTranslation } from "../../lib/translation-context";
import { Check, Star, Truck, Shield, Clock, Zap } from 'lucide-react';


export function SubscriptionOffer() {
  const { t } = useTranslation();
  

  const subscriptionPlans = [
    {
      id: 'monthly',
      name: t.subscriptionOfferExtended?.monthlyDelivery || 'Monthly Delivery',
      price: 14.99,
      originalPrice: 24.99,
      savings: 40,
      interval: t.subscriptionOfferExtended?.month || 'month',
      description: t.subscriptionOfferExtended?.perfectForSingleCat || 'Perfect for single-cat households',
      features: [
        // t.subscriptionOfferExtended?.freeShippingEveryMonth || 'Free shipping every month', // TODO: Restore when free shipping is available
        t.subscriptionOfferExtended?.skipOrCancelAnytime || 'Skip or cancel anytime',
        t.subscriptionOfferExtended?.fortyPercentSavings || '40% savings vs one-time purchase',
        t.subscriptionOfferExtended?.priorityCustomerSupport || 'Priority customer support'
      ]
    },
    {
      id: 'quarterly',
      name: t.subscriptionOfferExtended?.quarterlyDelivery || 'Quarterly Delivery',
      price: 29.99,
      originalPrice: 74.97,
      savings: 60,
      interval: `3 ${t.subscriptionOfferExtended?.months || 'months'}`,
      description: t.subscriptionOfferExtended?.mostPopularMultiCat || 'Most popular for multi-cat homes',
      features: [
        // t.subscriptionOfferExtended?.freeShippingEveryThreeMonths || 'Free shipping every 3 months', // TODO: Restore when free shipping is available
        t.subscriptionOfferExtended?.skipOrCancelAnytime || 'Skip or cancel anytime',
        t.subscriptionOfferExtended?.sixtyPercentSavings || '60% savings vs one-time purchase',
        t.subscriptionOfferExtended?.priorityCustomerSupport || 'Priority customer support',
        t.subscriptionOfferExtended?.bonusFreeCatCareGuide || 'Bonus: Free cat care guide'
      ],
      popular: true
    },
    {
      id: 'biannual',
      name: t.subscriptionOfferExtended?.biAnnualDelivery || 'Bi-Annual Delivery',
      price: 41.98,
      originalPrice: 149.94,
      savings: 72,
      interval: `6 ${t.subscriptionOfferExtended?.months || 'months'}`,
      description: t.subscriptionOfferExtended?.bestValueLargeFamilies || 'Best value for large families',
      features: [
        // t.subscriptionOfferExtended?.freeShippingEverySixMonths || 'Free shipping every 6 months', // TODO: Restore when free shipping is available
        t.subscriptionOfferExtended?.skipOrCancelAnytime || 'Skip or cancel anytime',
        t.subscriptionOfferExtended?.seventyTwoPercentSavings || '72% savings vs one-time purchase',
        t.subscriptionOfferExtended?.priorityCustomerSupport || 'Priority customer support',
        t.subscriptionOfferExtended?.bonusFreeCatToys || 'Bonus: Free cat toys'
      ]
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-[#FF3131]/5 via-[#FFFFF5] to-[#FF3131]/10">
      <Container>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80 text-white px-6 py-2 rounded-full mb-6">
              <Zap className="w-5 h-5 mr-2" />
              <span className="font-bold">{t.subscriptionOfferExtended?.neverRunOutAgain || "NEVER RUN OUT AGAIN"}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t.subscriptionOfferExtended?.subscribeAndSaveUpTo || "Subscribe & Save Up to"}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80">
                {t.subscriptionOfferExtended?.seventyTwoPercent || "72%"}
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t.subscriptionOfferExtended?.joinThousandsHappyCatParents || "Join thousands of happy cat parents who never worry about odors again."} {' '}
              {t.subscriptionOfferExtended?.getPurrifyDelivered || "Get Purrify delivered automatically and save money every month."}
            </p>
          </div>

          {/* Subscription Plans */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {subscriptionPlans.map((plan) => (
              <div
                key={plan.id}
                className={`relative bg-white rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105 ${
                  plan.popular ? 'ring-4 ring-[#FF3131]/20 scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80 text-white px-6 py-2 rounded-full text-sm font-bold">
                      {t.subscriptionOfferExtended?.mostPopular || "MOST POPULAR"}
                    </div>
                  </div>
                )}
                
                <div className="p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-600 mb-4">{plan.description}</p>
                    
                    <div className="mb-4">
                      <div className="flex items-center justify-center mb-2">
                        <span className="text-4xl font-bold text-[#FF3131]">${plan.price}</span>
                        <span className="text-gray-500 ml-2">/ {plan.interval}</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2">
                        <span className="text-gray-400 line-through">${plan.originalPrice}</span>
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
                          {t.subscriptionOfferExtended?.save || "Save"} {plan.savings}%
                        </span>
                      </div>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    className={`w-full py-4 text-lg font-bold transition-all duration-300 ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80 hover:from-[#FF3131]/90 hover:to-[#FF3131] text-white shadow-lg hover:shadow-xl' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-800 border-2 border-gray-200 hover:border-[#FF3131]/30'
                    }`}
                    
                  >
                    {plan.popular ? (t.subscriptionOfferExtended?.selectPlan || 'Select Plan') : (t.subscriptionOfferExtended?.selectPlan || 'Select Plan')}
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-[#FF3131]/10 p-4 rounded-full mb-3">
                <Truck className="w-8 h-8 text-[#FF3131]" />
              </div>
              {/* <h4 className="font-bold text-gray-900 mb-1">Free Shipping</h4>
              <p className="text-gray-600 text-sm">On all subscription orders</p> */}
              <h4 className="font-bold text-gray-900 mb-1">Fast Delivery</h4>
              <p className="text-gray-600 text-sm">Quick and reliable shipping</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-[#FF3131]/10 p-4 rounded-full mb-3">
                <Shield className="w-8 h-8 text-[#FF3131]" />
              </div>
              <h4 className="font-bold text-gray-900 mb-1">30-Day Guarantee</h4>
              <p className="text-gray-600 text-sm">100% money-back promise</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-[#FF3131]/10 p-4 rounded-full mb-3">
                <Clock className="w-8 h-8 text-[#FF3131]" />
              </div>
              <h4 className="font-bold text-gray-900 mb-1">Skip Anytime</h4>
              <p className="text-gray-600 text-sm">Full control over deliveries</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-[#FF3131]/10 p-4 rounded-full mb-3">
                <Star className="w-8 h-8 text-[#FF3131]" />
              </div>
              <h4 className="font-bold text-gray-900 mb-1">5-Star Rated</h4>
              <p className="text-gray-600 text-sm">Loved by 10,000+ customers</p>
            </div>
          </div>

          {/* Social Proof */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">Join over 10,000 satisfied customers:</p>
            <div className="flex justify-center items-center space-x-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="ml-2 text-gray-700 font-medium">4.9/5 from 2,847 reviews</span>
            </div>
            <p className="text-sm text-gray-500 italic">
              &quot;I&apos;ve saved over $200 this year with my subscription, and my cats&apos; litter box never smells!&quot; - Sarah M.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
