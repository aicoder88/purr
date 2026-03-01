import { useState, useCallback } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Check, Zap, Calendar, Shield, Truck, Star } from 'lucide-react';

import { formatCurrencyValue } from '@/lib/pricing';
import { getPaymentLink } from '@/lib/payment-links';
import {
  SUBSCRIPTION_PLANS,
  SubscriptionPlan,
  SubscriptionOptimizer
} from '@/lib/subscription-optimizer';

interface SubscriptionSelectorProps {
  productId: string;
  onPlanSelect: (plan: SubscriptionPlan) => void;
  selectedPlan?: SubscriptionPlan | null;
}

type SupportedLocale = 'en' | 'fr' | 'zh' | 'es';

const SUBSCRIPTION_UI_COPY: Record<SupportedLocale, {
  heading: string;
  subtitle: string;
  mostPopular: string;
  perMonth: string;
  billedQuarterly: string;
  billedBiannual: string;
  savePrefix: string;
  annualValue: string;
  retentionRate: string;
  buttonSelected: string;
  buttonGetStarted: string;
  buttonChoosePlan: string;
  trustSecure: string;
  trustFreeShipping: string;
  trustCancelAnytime: string;
  whySubscribe: string;
  saveMoneyTitle: string;
  saveMoneyDescription: string;
  freeShippingTitle: string;
  freeShippingDescription: string;
  vipTitle: string;
  vipDescription: string;
  faqPrompt: string;
  faqLink: string;
}> = {
  en: {
    heading: 'Subscribe & Save',
    subtitle: 'Get Purrify delivered automatically and save up to 30%',
    mostPopular: 'MOST POPULAR',
    perMonth: 'per month',
    billedQuarterly: 'per month (billed quarterly)',
    billedBiannual: 'per month (billed every 6 months)',
    savePrefix: 'Save',
    annualValue: 'Annual Value:',
    retentionRate: 'Retention Rate:',
    buttonSelected: 'Selected',
    buttonGetStarted: 'Get Started',
    buttonChoosePlan: 'Choose Plan',
    trustSecure: 'Secure',
    trustFreeShipping: 'Free Shipping',
    trustCancelAnytime: 'Cancel Anytime',
    whySubscribe: 'Why Subscribe?',
    saveMoneyTitle: 'Save Money',
    saveMoneyDescription: 'Up to 30% savings vs one-time purchases',
    freeShippingTitle: 'Free Shipping',
    freeShippingDescription: 'Always free, always on time',
    vipTitle: 'VIP Treatment',
    vipDescription: 'Priority support & exclusive perks',
    faqPrompt: 'Questions?',
    faqLink: 'View subscription FAQ',
  },
  fr: {
    heading: 'Abonnez-vous et economisez',
    subtitle: "Recevez Purrify automatiquement et economisez jusqua 30%",
    mostPopular: 'LE PLUS POPULAIRE',
    perMonth: 'par mois',
    billedQuarterly: 'par mois (facture trimestriellement)',
    billedBiannual: 'par mois (facture tous les 6 mois)',
    savePrefix: 'Economisez',
    annualValue: 'Valeur annuelle :',
    retentionRate: 'Taux de retention :',
    buttonSelected: 'Selectionne',
    buttonGetStarted: 'Commencer',
    buttonChoosePlan: 'Choisir ce plan',
    trustSecure: 'Securise',
    trustFreeShipping: 'Livraison gratuite',
    trustCancelAnytime: 'Annuler a tout moment',
    whySubscribe: 'Pourquoi sabonner ?',
    saveMoneyTitle: 'Economisez',
    saveMoneyDescription: 'Jusqua 30% deconomies vs achat ponctuel',
    freeShippingTitle: 'Livraison gratuite',
    freeShippingDescription: 'Toujours gratuite et ponctuelle',
    vipTitle: 'Traitement VIP',
    vipDescription: 'Support prioritaire et avantages exclusifs',
    faqPrompt: 'Des questions ?',
    faqLink: "Voir la FAQ d'abonnement",
  },
  zh: {
    heading: '订阅更省',
    subtitle: '自动配送 Purrify，最高可节省 30%',
    mostPopular: '最受欢迎',
    perMonth: '每月',
    billedQuarterly: '每月（按季度计费）',
    billedBiannual: '每月（每6个月计费）',
    savePrefix: '节省',
    annualValue: '年度价值：',
    retentionRate: '续订率：',
    buttonSelected: '已选择',
    buttonGetStarted: '立即开始',
    buttonChoosePlan: '选择套餐',
    trustSecure: '安全支付',
    trustFreeShipping: '免费配送',
    trustCancelAnytime: '随时取消',
    whySubscribe: '为什么订阅？',
    saveMoneyTitle: '更省钱',
    saveMoneyDescription: '相比单次购买最高可省 30%',
    freeShippingTitle: '免费配送',
    freeShippingDescription: '始终免费，准时送达',
    vipTitle: 'VIP 体验',
    vipDescription: '优先支持与专属权益',
    faqPrompt: '有问题？',
    faqLink: '查看订阅常见问题',
  },
  es: {
    heading: 'Suscribete y ahorra',
    subtitle: 'Recibe Purrify automaticamente y ahorra hasta 30%',
    mostPopular: 'MAS POPULAR',
    perMonth: 'por mes',
    billedQuarterly: 'por mes (facturado trimestralmente)',
    billedBiannual: 'por mes (facturado cada 6 meses)',
    savePrefix: 'Ahorra',
    annualValue: 'Valor anual:',
    retentionRate: 'Tasa de retencion:',
    buttonSelected: 'Seleccionado',
    buttonGetStarted: 'Comenzar',
    buttonChoosePlan: 'Elegir plan',
    trustSecure: 'Seguro',
    trustFreeShipping: 'Envio gratis',
    trustCancelAnytime: 'Cancela cuando quieras',
    whySubscribe: 'Por que suscribirte?',
    saveMoneyTitle: 'Ahorra dinero',
    saveMoneyDescription: 'Hasta 30% de ahorro vs compras individuales',
    freeShippingTitle: 'Envio gratis',
    freeShippingDescription: 'Siempre gratis y a tiempo',
    vipTitle: 'Beneficios VIP',
    vipDescription: 'Soporte prioritario y ventajas exclusivas',
    faqPrompt: 'Preguntas?',
    faqLink: 'Ver FAQ de suscripcion',
  },
};

export function SubscriptionSelector({
  productId,
  onPlanSelect,
  selectedPlan = null
}: SubscriptionSelectorProps) {
  const locale = useLocale();
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

  const copy = SUBSCRIPTION_UI_COPY[locale as SupportedLocale] || SUBSCRIPTION_UI_COPY.en;
  const localePrefix = locale === 'en' ? '' : `/${locale}`;

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
        return copy.perMonth;
      case 'quarterly':
        return copy.billedQuarterly;
      case 'biannual':
        return copy.billedBiannual;
      default:
        return copy.perMonth;
    }
  };

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h3 className="font-heading text-2xl font-bold text-gray-900 text-white mb-2">
          {copy.heading}
        </h3>
        <p className="text-gray-600 text-gray-300">
          {copy.subtitle}
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
                relative bg-white bg-gray-800 rounded-2xl p-6 border-2 transition-all duration-300
                ${isSelected
                  ? 'border-[#FF3131] shadow-xl scale-105'
                  : 'border-gray-200 border-gray-600 hover:border-gray-300 hover:border-gray-500'
                }
                ${isRecommended ? 'ring-4 ring-amber-400/20' : ''}
                ${hoveredPlan === plan.id ? 'shadow-lg' : ''}
              `}
              onMouseEnter={() => setHoveredPlan(plan.id)}
              onMouseLeave={() => setHoveredPlan(null)}
            >
              {isRecommended && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-gray-900 text-gray-800 px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                  ⭐ {copy.mostPopular}
                </div>
              )}

              <div className="text-center mb-6">
                <h4 className="text-xl font-bold text-gray-900 text-white mb-2">
                  {plan.name}
                </h4>
                <p className="text-sm text-gray-600 text-gray-300">
                  {plan.description}
                </p>
              </div>

              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-[#FF3131] text-[#FF5555] mb-1">
                  {formatCurrencyValue(monthlyPrice, locale)}
                </div>
                <div className="text-sm text-gray-600 text-gray-300">
                  {getBillingPeriodText(plan)}
                </div>
                {plan.savingsPercentage > 0 && (
                  <div className="inline-block bg-green-100 bg-green-900/30 text-green-800 text-green-400 px-3 py-1 rounded-full text-sm font-bold mt-2">
                    {copy.savePrefix} {plan.savingsPercentage}%
                  </div>
                )}
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700 text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="bg-gray-50 bg-gray-700/50 rounded-lg p-4 mb-6">
                <div className="text-center text-sm text-gray-600 text-gray-300">
                  <div className="font-semibold text-gray-900 text-white mb-1">
                    {copy.annualValue} {formatCurrencyValue(ltv, locale)}
                  </div>
                  <div>{copy.retentionRate} {Math.round(plan.retentionRate * 100)}%</div>
                </div>
              </div>

              {paymentLink ? (
                <Button
                  asChild
                  className={`
                    w-full py-3 font-bold transition-all duration-300
                    ${isSelected || isRecommended
                      ? 'bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80 text-white hover:from-[#FF3131]/90 hover:to-[#FF3131] shadow-lg'
                      : 'bg-gray-100 bg-gray-700 text-gray-800 text-white hover:bg-[#FF3131] hover:text-white'
                    }
                  `}
                >
                  <a
                    href={paymentLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handlePlanSelect(plan)}
                  >
                    {isSelected ? copy.buttonSelected : isRecommended ? copy.buttonGetStarted : copy.buttonChoosePlan}
                  </a>
                </Button>
              ) : (
                <Button
                  className={`
                    w-full py-3 font-bold transition-all duration-300
                    ${isSelected || isRecommended
                      ? 'bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80 text-white hover:from-[#FF3131]/90 hover:to-[#FF3131]'
                      : 'bg-gray-100 bg-gray-700 text-gray-800 text-white hover:bg-[#FF3131] hover:text-white'
                    }
                  `}
                  onClick={() => handlePlanSelect(plan)}
                >
                  {isSelected ? copy.buttonSelected : isRecommended ? copy.buttonGetStarted : copy.buttonChoosePlan}
                </Button>
              )}

              <div className="mt-4 pt-4 border-t border-gray-200 border-gray-600">
                <div className="flex items-center justify-center gap-4 text-xs text-gray-500 text-gray-400">
                  <div className="flex items-center gap-1">
                    <Shield className="w-3 h-3" />
                    <span>{copy.trustSecure}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Truck className="w-3 h-3" />
                    <span>{copy.trustFreeShipping}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{copy.trustCancelAnytime}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-12 bg-gradient-to-r from-[#FF3131]/5 to-[#FF3131]/10 from-gray-800 to-gray-700/80 rounded-2xl p-8 border border-[#FF3131]/10 border-gray-600">
        <div className="text-center mb-6">
          <h4 className="text-xl font-bold text-gray-900 text-white mb-2">
            {copy.whySubscribe}
          </h4>
        </div>

        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="flex justify-center mb-2">
              <Zap className="w-8 h-8 text-[#FF3131]" />
            </div>
            <div className="font-bold text-gray-900 text-white mb-1">
              {copy.saveMoneyTitle}
            </div>
            <div className="text-sm text-gray-600 text-gray-300">
              {copy.saveMoneyDescription}
            </div>
          </div>
          <div>
            <div className="flex justify-center mb-2">
              <Truck className="w-8 h-8 text-[#FF3131]" />
            </div>
            <div className="font-bold text-gray-900 text-white mb-1">
              {copy.freeShippingTitle}
            </div>
            <div className="text-sm text-gray-600 text-gray-300">
              {copy.freeShippingDescription}
            </div>
          </div>
          <div>
            <div className="flex justify-center mb-2">
              <Star className="w-8 h-8 text-[#FF3131]" />
            </div>
            <div className="font-bold text-gray-900 text-white mb-1">
              {copy.vipTitle}
            </div>
            <div className="text-sm text-gray-600 text-gray-300">
              {copy.vipDescription}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600 text-gray-300">
          {copy.faqPrompt} {' '}
          <Link href={`${localePrefix}/support/subscription`} className="text-[#FF3131] hover:underline">
            {copy.faqLink}
          </Link>
        </p>
      </div>
    </div>
  );
}
