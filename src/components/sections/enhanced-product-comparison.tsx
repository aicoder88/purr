import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { useState } from 'react';

import { useTranslation } from "../../lib/translation-context";
import { Check, Star, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { formatProductPrice, getProductPrice, formatCurrencyValue } from '../../lib/pricing';
import { getPaymentLink, PaymentLinkKey } from '../../lib/payment-links';
import { cn } from "@/lib/utils";

type PurchaseAction = 'link' | 'cart';

type PurchaseOption = {
  key: string;
  type: 'subscription' | 'one-time';
  label: string;
  priceFormatted: string;
  subLabel?: string;
  perMonth?: string;
  totalPrice?: string;
  shippingNote?: string;
  savings?: number;
  action: PurchaseAction;
  linkKey?: PaymentLinkKey;
  ctaLabel: string;
  icon?: 'cart' | 'zap';
  highlight?: boolean;
  badgeLabel?: string;
  cartProductId?: string;
  ctaEmphasis?: 'primary' | 'secondary' | 'contrast';
};

type ProductCard = {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  badge?: string;
  badgeColor?: string;
  duration: string;
  coverage: string;
  features: {
    odorControl: boolean;
    naturalIngredients: boolean;
    easyApplication: boolean;
    moneyBackGuarantee: boolean;
    freeShipping?: boolean;
    bulkDiscount: boolean;
    prioritySupport: boolean;
  };
  image: string;
  purchaseOptions: PurchaseOption[];
  recommended?: boolean;
};

export function EnhancedProductComparison() {
  const { t, locale } = useTranslation();
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  const familyPriceAmount = getProductPrice('family');
  const familyAutoshipPriceAmount = getProductPrice('familyAutoship');

  const computeQuarterlySavings = (oneTimePrice: number, subscriptionPrice: number) => {
    if (oneTimePrice <= 0 || subscriptionPrice <= 0) return 0;
    const baseline = oneTimePrice * 3;
    if (baseline <= 0) return 0;
    const savingsRatio = 1 - subscriptionPrice / baseline;
    return Math.max(0, Math.round(savingsRatio * 100));
  };

  const formatSavingsLabel = (percentage: number) => {
    const template = t.pricing?.saveVsOneTime || 'Save {percent}%';
    return template.replace('{percent}', percentage.toString());
  };

  const familyAutoshipSavings = computeQuarterlySavings(familyPriceAmount, familyAutoshipPriceAmount);

  const products: ProductCard[] = [
    {
      id: 'purrify-12g',
      name: t.products?.['purrify-12g']?.name || 'FREE Trial',
      subtitle: '12g Pack',
      badge: 'FREE TRIAL',
      badgeColor: 'bg-green-600 dark:bg-green-700',
      description: 'Try Purrify FREE - just pay shipping & handling.',
      duration: '1 Week',
      coverage: '1 Cat',
      features: {
        odorControl: true,
        naturalIngredients: true,
        easyApplication: true,
        moneyBackGuarantee: true,
        freeShipping: true,
        bulkDiscount: false,
        prioritySupport: false
      },
      image: '/optimized/20g.webp',
      purchaseOptions: [
        {
          key: 'trial-single',
          type: 'one-time',
          label: 'FREE',
          priceFormatted: 'FREE',
          subLabel: `Just ${formatProductPrice('trial', locale)} shipping & handling`,
          shippingNote: 'Limit one per customer',
          action: 'link',
          linkKey: 'trialSingle',
          ctaLabel: 'Get FREE Trial',
          icon: 'cart',
          ctaEmphasis: 'secondary',
        },
      ],
    },
    {
      id: 'purrify-120g',
      name: t.products?.['purrify-120g']?.name || 'Regular',
      subtitle: '120g Pack',
      badge: 'MOST POPULAR',
      badgeColor: 'bg-deep-coral',
      description: 'The #1 choice for single or dual cat homes.',
      duration: '3 Months',
      coverage: '1-2 Cats',
      features: {
        odorControl: true,
        naturalIngredients: true,
        easyApplication: true,
        moneyBackGuarantee: false,
        bulkDiscount: false,
        prioritySupport: false,
        freeShipping: true,
      },
      image: '/optimized/60g-yellow.avif',
      purchaseOptions: [
        {
          key: 'family-autoship',
          type: 'subscription',
          label: 'Subscribe',
          priceFormatted: formatCurrencyValue(familyAutoshipPriceAmount / 3, locale),
          subLabel: 'per month, billed quarterly',
          totalPrice: `at ${formatProductPrice('familyAutoship', locale)} every 3 months`,
          savings: familyAutoshipSavings,
          action: 'link',
          linkKey: 'familyAutoship',
          ctaLabel: 'Subscribe & Save',
          icon: 'zap',
          highlight: true,
          ctaEmphasis: 'primary',
        },
      ],
      recommended: true,
    },
    {
      id: 'purrify-240g',
      name: t.products?.['purrify-240g']?.name || 'Large',
      subtitle: '240g Pack',
      badge: 'BEST VALUE',
      badgeColor: 'bg-electric-indigo',
      description: 'Maximum savings for multi-cat households.',
      duration: '3 Months',
      coverage: '3+ Cats',
      features: {
        odorControl: true,
        naturalIngredients: true,
        easyApplication: true,
        moneyBackGuarantee: true,
        bulkDiscount: true,
        prioritySupport: false,
        freeShipping: true,
      },
      image: '/optimized/140g.webp',
      purchaseOptions: [
        {
          key: 'jumbo-autoship',
          type: 'subscription',
          label: 'Subscribe',
          priceFormatted: formatCurrencyValue(getProductPrice('jumboAutoship') / 3, locale),
          subLabel: 'per month, billed quarterly',
          totalPrice: `at ${formatProductPrice('jumboAutoship', locale)} every 3 months`,
          savings: computeQuarterlySavings(getProductPrice('jumbo'), getProductPrice('jumboAutoship')),
          action: 'link',
          linkKey: 'jumboAutoship' as PaymentLinkKey,
          ctaLabel: 'Subscribe & Save',
          icon: 'zap',
          ctaEmphasis: 'primary',
        },
      ],
    },
  ];

  const getFeatureLabels = (productId: string) => {
    if (productId === 'purrify-12g') {
      return {
        odorControl: '1 Week Odor Control',
        naturalIngredients: '100% Natural',
        easyApplication: 'Easy Application',
        moneyBackGuarantee: '30-Day Guarantee',
        freeShipping: 'Shipping Included',
        bulkDiscount: 'Bulk Discount',
        prioritySupport: 'Priority Support'
      };
    }
    return {
      odorControl: '3 months of Odor Control',
      naturalIngredients: '100% Natural',
      easyApplication: 'Easy Application',
      moneyBackGuarantee: '30-Day Guarantee',
      freeShipping: 'Free Shipping',
      bulkDiscount: 'Bulk Discount',
      prioritySupport: 'Priority Support'
    };
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900/50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-deep-coral/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-electric-indigo/5 rounded-full blur-3xl" />
      </div>

      <Container className="relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Choose Your Perfect Size
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Simple pricing. No hidden fees. Cancel anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
          {products.map((product) => {
            const preferredOption = product.purchaseOptions[0];
            const isSubscription = preferredOption.type === 'subscription';

            return (
              <div
                key={product.id}
                className={cn(
                  "relative bg-white dark:bg-gray-800 rounded-3xl border transition-all duration-300 group",
                  product.recommended
                    ? "border-deep-coral shadow-xl md:scale-105 z-10"
                    : "border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl hover:border-gray-300 dark:hover:border-gray-600"
                )}
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                {product.recommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-deep-coral text-white dark:text-gray-100 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" />
                    Most Popular
                  </div>
                )}

                <div className="p-6 flex flex-col h-full">
                  <div className="text-center mb-6">
                    <h3 className="font-heading text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      {product.name}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm font-medium uppercase tracking-wide mb-4">
                      {product.subtitle}
                    </p>

                    <div className="relative w-48 h-48 mx-auto mb-6">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain drop-shadow-xl transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>

                    {isSubscription && preferredOption.totalPrice ? (
                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-2 font-medium">
                        {preferredOption.priceFormatted} per month (Billed {preferredOption.totalPrice})
                      </p>
                    ) : preferredOption.priceFormatted === 'FREE' ? (
                      <div className="mb-2">
                        <span className="text-4xl font-black text-green-600 dark:text-green-400 tracking-tight">
                          {preferredOption.priceFormatted}
                        </span>
                        {preferredOption.subLabel && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {preferredOption.subLabel}
                          </p>
                        )}
                        {preferredOption.shippingNote && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {preferredOption.shippingNote}
                          </p>
                        )}
                      </div>
                    ) : (
                      <div className="mb-2">
                        <span className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">
                          {preferredOption.priceFormatted}
                        </span>
                      </div>
                    )}

                    {preferredOption.savings ? (
                      <div className="inline-block bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full text-sm font-bold mb-4">
                        Save {formatSavingsLabel(preferredOption.savings)}
                      </div>
                    ) : preferredOption.priceFormatted === 'FREE' ? (
                      <div className="inline-block bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full text-sm font-bold mb-4">
                        🎁 Limited Time Offer
                      </div>
                    ) : (
                      <div className="h-8 mb-4" /> // Spacer
                    )}

                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6 min-h-[40px]">
                      {product.description}
                    </p>

                    <Button
                      asChild
                      className={cn(
                        "w-full py-5 sm:py-6 text-base sm:text-lg font-bold rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-1 min-h-[44px]",
                        isSubscription
                          ? "bg-deep-coral hover:bg-deep-coral/90 text-white shadow-deep-coral/25"
                          : preferredOption.priceFormatted === 'FREE'
                            ? "bg-green-600 hover:bg-green-500 text-white shadow-green-600/25"
                            : "bg-gray-900 hover:bg-gray-800 text-white"
                      )}
                    >
                      <a href={getPaymentLink(preferredOption.linkKey!) || '#'} target="_blank" rel="noopener noreferrer">
                        {preferredOption.ctaLabel} <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                      </a>
                    </Button>
                  </div>

                  <div className="border-t border-gray-100 dark:border-gray-700 pt-6 mt-auto">
                    <ul className="space-y-3">
                      {Object.entries(getFeatureLabels(product.id)).map(([key, label]) => {
                        const isIncluded = product.features[key as keyof typeof product.features];
                        if (!isIncluded) return null;
                        return (
                          <li key={key} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300">
                            <div className="mt-0.5 bg-green-100 dark:bg-green-900/30 rounded-full p-0.5">
                              <Check className="w-3 h-3 text-green-600 dark:text-green-400" />
                            </div>
                            {label}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
