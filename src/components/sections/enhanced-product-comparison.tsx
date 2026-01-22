import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { useState } from 'react';
import Link from 'next/link';

import { useTranslation } from "../../lib/translation-context";
import { Check, Star, ArrowRight, MapPin } from 'lucide-react';
import Image from 'next/image';
import { formatProductPrice, getProductPrice, formatCurrencyValue } from '../../lib/pricing';
import { getPaymentLink, PaymentLinkKey } from '../../lib/payment-links';
import { cn } from "@/lib/utils";

// Feature label configurations
const FEATURE_LABELS = {
  trial: {
    odorControl: '1 Week Odor Control',
    naturalIngredients: '100% Natural',
    easyApplication: 'Easy Application',
    moneyBackGuarantee: '30-Day Guarantee',
    freeShipping: 'Shipping Included',
    bulkDiscount: 'Bulk Discount',
    prioritySupport: 'Priority Support',
  },
  standard: {
    odorControl: '7+ days per application',
    naturalIngredients: '100% Natural',
    easyApplication: 'Easy Application',
    moneyBackGuarantee: '30-Day Guarantee',
    bulkDiscount: 'Bulk Discount',
    prioritySupport: 'Priority Support',
  },
} as const;

// Pure utility function for savings calculation
function computeQuarterlySavings(oneTimePrice: number, subscriptionPrice: number): number {
  if (oneTimePrice <= 0 || subscriptionPrice <= 0) return 0;
  const baseline = oneTimePrice * 3;
  if (baseline <= 0) return 0;
  const savingsRatio = 1 - subscriptionPrice / baseline;
  return Math.max(0, Math.round(savingsRatio * 100));
}

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
  imageSize: 'sm' | 'md' | 'lg'; // Visual scale to show relative product sizes
  purchaseOptions: PurchaseOption[];
  recommended?: boolean;
};

export function EnhancedProductComparison() {
  const { t, locale } = useTranslation();
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  const familyPriceAmount = getProductPrice('family');
  const familyAutoshipPriceAmount = getProductPrice('familyAutoship');

  const formatSavingsLabel = (percentage: number) => {
    const template = t.pricing?.saveVsOneTime || 'Save {percent}%';
    return template.replace('{percent}', percentage.toString());
  };

  const familyAutoshipSavings = computeQuarterlySavings(familyPriceAmount, familyAutoshipPriceAmount);

  const products: ProductCard[] = [
    {
      id: 'purrify-12g',
      name: t.products?.['purrify-12g']?.name || 'The Skeptic\'s Sample',
      subtitle: '12g · One Week of Proof',
      badge: 'FREE TRIAL',
      badgeColor: 'bg-green-600 dark:bg-green-700',
      description: 'You\'ve heard the promises. The "miracle" sprays. The "revolutionary" crystals. All lies. Here\'s the truth: This works. Or you\'re out $4.76 in shipping.',
      duration: '7+ days',
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
      image: '/optimized/17gpink.webp',
      imageSize: 'sm',
      purchaseOptions: [
        {
          key: 'trial-single',
          type: 'one-time',
          label: 'FREE',
          priceFormatted: 'FREE',
          subLabel: `Just ${formatProductPrice('trial', locale)} shipping & handling anywhere in Canada`,
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
      name: t.products?.['purrify-120g']?.name || 'Regular Size',
      subtitle: '120g · The Goldilocks Bag',
      badge: 'MOST POPULAR',
      badgeColor: 'bg-deep-coral',
      description: 'This is the size most customers reorder. Know why? Because it works. Lasts 7+ days per application. Use more, it lasts longer. Starting to smell? Sprinkle more. It\'s that simple.',
      duration: '7+ days per application',
      coverage: '1-2 Cats',
      features: {
        odorControl: true,
        naturalIngredients: true,
        easyApplication: true,
        moneyBackGuarantee: false,
        bulkDiscount: false,
        prioritySupport: false,
      },
      image: '/optimized/60g.webp',
      imageSize: 'md',
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
      name: t.products?.['purrify-240g']?.name || 'Family Size',
      subtitle: '240g · Best Value Per Gram',
      badge: 'BEST VALUE',
      badgeColor: 'bg-electric-indigo',
      description: 'Double the supply. Same powerful formula. For multi-cat households who need serious odor control. Or foster parents who\'ve lost count. Lasts 7+ days per application. The more you use, the longer it works. Your litter box, your rules.',
      duration: '7+ days per application',
      coverage: '3+ Cats',
      features: {
        odorControl: true,
        naturalIngredients: true,
        easyApplication: true,
        moneyBackGuarantee: true,
        bulkDiscount: true,
        prioritySupport: false,
      },
      image: '/optimized/140g-640w.avif',
      imageSize: 'lg',
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
    return productId === 'purrify-12g' ? FEATURE_LABELS.trial : FEATURE_LABELS.standard;
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
            {t.enhancedProductComparison?.chooseYourPerfectSize || ""}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t.enhancedProductComparison?.subtitle || ""}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
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
                    {t.enhancedProductComparison?.mostPopular || ""}
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

                    {/* Image container with size-based scaling to show relative product sizes */}
                    <div className="relative h-56 mx-auto mb-6 flex items-end justify-center">
                      <div className={cn(
                        "relative transition-all duration-300",
                        product.imageSize === 'sm' && "w-28 h-36",
                        product.imageSize === 'md' && "w-36 h-48",
                        product.imageSize === 'lg' && "w-44 h-56"
                      )}>
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className={cn(
                            "object-contain drop-shadow-xl transition-transform duration-500 group-hover:scale-110"
                          )}
                          sizes="(max-width: 768px) 50vw, 200px"
                        />
                      </div>
                    </div>

                    {/* B2C: HIDDEN PRICING SECTION
                    <div className="min-h-[80px] flex flex-col justify-center">
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
                    </div>

                    {preferredOption.savings ? (
                      <div className="inline-block bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full text-sm font-bold mb-4">
                        Save {formatSavingsLabel(preferredOption.savings)}
                      </div>
                    ) : preferredOption.priceFormatted === 'FREE' ? (
                      <div className="inline-block bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full text-sm font-bold mb-4">
                        🎁 Limited Time Offer
                      </div>
                    ) : (
                      <div className="h-8 mb-4" />
                    )}
                    */}

                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6 min-h-[40px]">
                      {product.description}
                    </p>

                    {/* B2C: ORIGINAL PURCHASE BUTTON
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
                    */}
                    <Button
                      asChild
                      className="w-full py-5 sm:py-6 text-base sm:text-lg font-bold rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-1 min-h-[44px] bg-deep-coral hover:bg-deep-coral/90 text-white dark:text-gray-100 shadow-deep-coral/25"
                    >
                      <Link href="/stores">
                        <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                        {t.nav?.findStore || "Get Purrify Near You"} <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                      </Link>
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
