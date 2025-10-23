import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { useState, useCallback } from 'react';
import { useTranslation } from "../../lib/translation-context";
import { useCart } from "../../lib/cart-context";
import { Check, X, TrendingUp, Award, Zap, ShoppingCart } from 'lucide-react';
import NextImage from "../../../components/NextImage";
import { formatProductPrice, getProductPrice, formatCurrencyValue } from '../../lib/pricing';
import { getPaymentLink, PaymentLinkKey } from '../../lib/payment-links';

type PurchaseAction = 'link' | 'cart';

type PurchaseOption = {
  key: string;
  type: 'subscription' | 'one-time';
  label: string;
  priceFormatted: string;
  subLabel?: string;
  perMonth?: string;
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
  badge: string;
  badgeColor: string;
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
    bonusGuide: boolean;
  };
  image: string;
  purchaseOptions: PurchaseOption[];
  recommended?: boolean;
};


export function EnhancedProductComparison() {
  const { t, locale } = useTranslation();
  const { addToCart } = useCart();
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [addingToCart, setAddingToCart] = useState<string | null>(null);

  const handleAddToCart = useCallback(async (productId: string) => {
    setAddingToCart(productId);
    try {
      addToCart(productId);
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Failed to add to cart:', err);
      }
    } finally {
      setTimeout(() => setAddingToCart(null), 1000);
    }
  }, [addToCart]);

  const handleMouseEnter = useCallback((productId: string) => {
    setHoveredProduct(productId);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredProduct(null);
  }, []);

  const handleAddToCartClick = useCallback((productId: string) => {
    handleAddToCart(productId);
  }, [handleAddToCart]);

  const familyPriceAmount = getProductPrice('family');
  const familyAutoshipPriceAmount = getProductPrice('familyAutoship');

  const computeQuarterlySavings = (oneTimePrice: number, subscriptionPrice: number) => {
    if (oneTimePrice <= 0 || subscriptionPrice <= 0) return 0;
    const baseline = oneTimePrice * 3;
    if (baseline <= 0) return 0;
    const savingsRatio = 1 - subscriptionPrice / baseline;
    return Math.max(0, Math.round(savingsRatio * 100));
  };

  const formatPerMonthLabel = (value: number) => {
    const formatted = formatCurrencyValue(value, locale);
    const template = t.pricing?.perMonth || '≈ {price}/month';
    return template.replace('{price}', formatted);
  };

  const formatSavingsLabel = (percentage: number) => {
    const template = t.pricing?.saveVsOneTime || 'Save {percent}% vs one-time';
    return template.replace('{percent}', percentage.toString());
  };

  const pricingCopy = {
    oneTimeLabel: t.pricing?.oneTimeLabel || 'One-time purchase',
    autoshipLabel: t.pricing?.autoshipLabel || 'Autoship & Save',
    autoshipBestLabel:
      t.pricing?.autoshipBestLabel || t.pricing?.autoshipLabel || 'Autoship & Save',
    billedEvery: t.pricing?.billedEvery || 'Billed every',
    months: t.pricing?.months || 'months',
    shippingIncluded: t.pricing?.shippingIncluded || 'Shipping included',
    freeShipping: t.pricing?.freeShipping || 'Free shipping included',
    plusShipping: t.pricing?.plusShipping || '+ shipping',
    shippingCalculated: t.pricing?.shippingCalculated || 'Shipping calculated at checkout',
    startAutoship: t.pricing?.startAutoship || 'Start Autoship',
    buyNow: t.pricing?.buyNow || 'Buy Now',
    linkComingSoon: t.pricing?.linkComingSoon || 'Payment link coming soon',
    recommended: t.pricing?.recommended || 'Most recommended',
    bestValueBadge: t.enhancedProductComparison?.bestValue || 'BEST VALUE',
  };

  const familyAutoshipSavings = computeQuarterlySavings(familyPriceAmount, familyAutoshipPriceAmount);

  const products: ProductCard[] = [
    {
      id: 'purrify-12g',
      name: t.products?.['purrify-12g']?.name || 'Purrify 12g',
      subtitle: t.productComparison?.products?.[0]?.name || 'Trial Size',
      badge: t.enhancedProductComparison?.trial || 'ONE-TIME PURCHASE',
      badgeColor: 'bg-blue-500 dark:bg-blue-600',
      description: t.enhancedProductComparison?.perfectForFirstTime || 'Perfect for first-time users',
      duration: t.productComparison?.products?.[0]?.duration || '1-2 weeks',
      coverage: t.productComparison?.products?.[0]?.cats || '1-2 cats',
      features: {
        odorControl: true,
        naturalIngredients: true,
        easyApplication: true,
        moneyBackGuarantee: true,
        freeShipping: true,
        bulkDiscount: false,
        prioritySupport: false,
        bonusGuide: false,
      },
      image: '/optimized/20g.webp',
      purchaseOptions: [
        {
          key: 'trial-single',
          type: 'one-time',
          label: '💰 ONE-TIME PRICE',
          priceFormatted: formatProductPrice('trial', locale),
          subLabel: 'Pay once, no recurring charges • Shipping included',
          shippingNote: pricingCopy.shippingIncluded,
          action: 'link',
          linkKey: 'trialSingle',
          ctaLabel: t.homepage.enhancedComparison.tryRiskFree,
          icon: 'cart',
          ctaEmphasis: 'primary',
        },
      ],
    },
    {
      id: 'purrify-50g',
      name: t.products?.['purrify-50g']?.name || 'Purrify 50g',
      subtitle: 'Monthly Subscription Option',
      badge: 'PAY MONTHLY',
      badgeColor: 'bg-blue-600 dark:bg-blue-700',
      description:
        'Perfect for single-cat households that want fresh Purrify delivered each month.',
      duration: t.productComparison?.products?.[1]?.duration || 'Up to 1 month of freshness!',
      coverage: t.productComparison?.products?.[1]?.cats || '1-2 cats',
      features: {
        odorControl: true,
        naturalIngredients: true,
        easyApplication: true,
        moneyBackGuarantee: true,
        freeShipping: true,
        bulkDiscount: true,
        prioritySupport: true,
        bonusGuide: true,
      },
      image: '/optimized/60g.webp',
      purchaseOptions: [
        {
          key: 'standard-monthly',
          type: 'subscription',
          label: '📅 MONTHLY SUBSCRIPTION',
          priceFormatted: formatProductPrice('standard', locale),
          subLabel: 'Auto-delivered every month • Cancel anytime',
          perMonth: 'Per month',
          shippingNote: 'Shipping included',
          action: 'cart',
          linkKey: 'standardSingle',
          ctaLabel: 'Subscribe Now',
          icon: 'zap',
          cartProductId: 'purrify-50g',
          ctaEmphasis: 'primary',
        },
      ],
    },
    {
      id: 'purrify-120g',
      name: t.products?.['purrify-120g']?.name || 'Purrify 120g',
      subtitle: '⭐ BEST VALUE - SAVE 40%',
      badge: '💎 SUBSCRIBE EVERY 3 MONTHS',
      badgeColor: 'bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-500 dark:from-amber-500 dark:via-yellow-500 dark:to-amber-600',
      description:
        'The #1 choice for multi-cat homes. Delivered every 3 months at the lowest price per oz.',
      duration: t.productComparison?.products?.[2]?.duration || '8-12 weeks',
      coverage: t.productComparison?.products?.[2]?.cats || '3+ cats',
      features: {
        odorControl: true,
        naturalIngredients: true,
        easyApplication: true,
        moneyBackGuarantee: true,
        bulkDiscount: true,
        prioritySupport: true,
        bonusGuide: true,
      },
      image: '/optimized/140g.webp',
      purchaseOptions: [
        {
          key: 'family-autoship',
          type: 'subscription',
          label: '💎 SUBSCRIBE EVERY 3 MONTHS',
          priceFormatted: formatProductPrice('familyAutoship', locale),
          subLabel: `That's ${formatPerMonthLabel(familyAutoshipPriceAmount / 3)} • Free Premium Shipping`,
          perMonth: formatPerMonthLabel(familyAutoshipPriceAmount / 3),
          shippingNote: '🚚 Delivered Every 3 Months - Cancel Anytime',
          savings: familyAutoshipSavings,
          action: 'link',
          linkKey: 'familyAutoship',
          ctaLabel: '🔥 GET BEST VALUE - SAVE NOW',
          icon: 'zap',
          highlight: true,
          badgeLabel: `⭐ MOST POPULAR • ${pricingCopy.recommended}`,
          ctaEmphasis: 'contrast',
        },
        {
          key: 'family-single',
          type: 'one-time',
          label: 'One-Time Purchase',
          priceFormatted: formatProductPrice('family', locale),
          subLabel: 'No subscription • Shipping calculated at checkout',
          shippingNote: pricingCopy.shippingCalculated,
          action: 'cart',
          linkKey: 'familySingle',
          ctaLabel: 'Buy Once',
          icon: 'cart',
          cartProductId: 'purrify-120g',
          ctaEmphasis: 'secondary',
        },
      ],
      recommended: true,
    },
  ];

  const renderOptionButton = (option: PurchaseOption, productId: string) => {
    const paymentLink = option.linkKey ? getPaymentLink(option.linkKey) : null;
    const Icon = option.icon === 'zap' ? Zap : ShoppingCart;

    const baseClass = 'w-full py-3 sm:py-4 text-sm sm:text-base lg:text-lg font-bold transition-all duration-300';

    const emphasisClassMap: Record<NonNullable<PurchaseOption['ctaEmphasis']>, string> = {
      primary:
        'bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80 hover:from-[#FF3131]/90 hover:to-[#FF3131] text-white dark:text-gray-100 shadow-lg hover:shadow-xl',
      secondary:
        'bg-gray-100 dark:bg-gray-700 hover:bg-[#FF3131] hover:text-white dark:text-gray-100 text-gray-800 dark:text-white border-2 border-gray-200 dark:border-gray-600 hover:border-[#FF3131] dark:hover:border-[#FF3131]',
      contrast:
        'bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-400 dark:from-amber-500 dark:via-yellow-500 dark:to-amber-500 text-gray-900 dark:text-gray-900 hover:from-amber-300 hover:via-yellow-300 hover:to-amber-300 dark:hover:from-amber-400 dark:hover:via-yellow-400 dark:hover:to-amber-400 shadow-2xl hover:shadow-3xl font-black uppercase tracking-widest transform hover:scale-105 transition-all duration-200 border-4 border-white dark:border-gray-900 animate-pulse-button',
    };

    const buttonClass = `${baseClass} ${emphasisClassMap[option.ctaEmphasis || 'secondary']}`;

    if (paymentLink) {
      return (
        <Button asChild className={buttonClass}>
          <a
            href={paymentLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2"
          >
            <Icon className="w-4 sm:w-5 h-4 sm:h-5" />
            {option.ctaLabel}
          </a>
        </Button>
      );
    }

    if (option.action === 'cart') {
      const targetProductId = option.cartProductId || productId;
      return (
        <Button
          className={buttonClass}
          onClick={() => handleAddToCartClick(targetProductId)}
          disabled={addingToCart === targetProductId}
        >
          {addingToCart === targetProductId ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 sm:h-5 w-4 sm:w-5 border-b-2 border-current"></div>
              {t.productsSection?.adding || 'Adding...'}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Icon className="w-4 sm:w-5 h-4 sm:h-5" />
              {option.ctaLabel}
            </div>
          )}
        </Button>
      );
    }

    return (
      <Button className={`${buttonClass} opacity-80`} disabled>
        <div className="flex items-center gap-2">
          <Icon className="w-4 sm:w-5 h-4 sm:h-5" />
          {pricingCopy.linkComingSoon}
        </div>
      </Button>
    );
  };

  // Dynamic feature labels based on product size
  const getFeatureLabels = (productId: string) => {
    let odorControlLabel = t.enhancedProductComparison?.odorControl || '7-Day Odor Control';

    if (productId === 'purrify-12g') {
      odorControlLabel = t.enhancedProductComparison?.odorControlTrial || '7-Day Odor Control';
    } else if (productId === 'purrify-50g') {
      odorControlLabel = t.enhancedProductComparison?.odorControlMedium || '14-Day Odor Control';
    } else if (productId === 'purrify-120g') {
      odorControlLabel = t.enhancedProductComparison?.odorControlLarge || '30-Day Odor Control';
    }

    return {
      odorControl: odorControlLabel,
      naturalIngredients: t.enhancedProductComparison?.naturalIngredients || '100% Natural Ingredients',
      easyApplication: t.enhancedProductComparison?.easyApplication || 'Easy Application',
      moneyBackGuarantee: t.enhancedProductComparison?.moneyBackGuarantee || '30-Day Money Back Guarantee',
      freeShipping: t.enhancedProductComparison?.freeShipping || 'Shipping Included',
      bulkDiscount: t.enhancedProductComparison?.bulkDiscount || 'Bulk Discount Available',
      prioritySupport: t.enhancedProductComparison?.prioritySupport || 'Priority Customer Support',
      bonusGuide: t.enhancedProductComparison?.bonusGuide || 'Bonus Cat Care Guide'
    };
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-black">
      <Container>
        <div className="max-w-7xl mx-auto">
          {/* Header with Clear Section Title */}
          <div className="text-center mb-12 sm:mb-16 lg:mb-20 px-4">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white mb-6 leading-tight">
              {t.homepage.enhancedComparison.chooseYourPerfectSize}
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 dark:text-gray-200 max-w-4xl mx-auto font-semibold mb-8 leading-relaxed">
              {t.homepage.enhancedComparison.allSizesDeliver}
            </p>

            {/* Billing Period Legend */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 flex-wrap mb-6">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-blue-500 dark:bg-blue-400"></div>
                <span className="text-gray-700 dark:text-gray-200 font-semibold">Pay Per Month</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 dark:from-amber-500 dark:via-yellow-500 dark:to-amber-600"></div>
                <span className="text-gray-700 dark:text-gray-200 font-semibold">Subscribe Every 3 Months (Best Value ⭐)</span>
              </div>
            </div>
          </div>

          {/* Product Comparison Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12">
            {products.map((product) => (
              <div
                key={product.id}
                className={`relative bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-600 rounded-2xl shadow-xl dark:shadow-2xl dark:shadow-black/30 transition-all duration-300 hover:shadow-2xl dark:hover:shadow-black/40 min-h-[620px] sm:min-h-[660px] lg:min-h-[700px] ${
                  hoveredProduct === product.id ? 'scale-[1.02]' : ''
                } ${product.recommended ? 'ring-4 ring-[#FF3131]/20 dark:ring-[#FF3131]/50 scale-[1.02]' : ''}`}
                onMouseEnter={() => handleMouseEnter(product.id)}
                onMouseLeave={handleMouseLeave}
              >
                {/* Top Section with Badge and Popular Indicator */}
                <div className="relative px-4 sm:px-6 pt-6 pb-2">
                  {/* Badge */}
                  <div className={`absolute -top-3 left-1/2 transform -translate-x-1/2 ${product.badgeColor} text-white dark:text-gray-100 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg`}>
                    {product.badge}
                  </div>

                  {/* Popularity Indicator */}
                  {product.recommended && (
                    <div className="absolute top-2 right-2 bg-[#FF3131] text-white dark:text-gray-100 p-2 rounded-full shadow-lg">
                      <Award className="w-5 h-5" />
                    </div>
                  )}
                </div>

                <div className="px-4 sm:px-6 pb-4 sm:pb-6 flex-1 flex flex-col">
                  {/* Product Image Section */}
                  <div className="text-center mb-6">
                    {/* Size Badge - Positioned above image */}
                    <div className="flex justify-center mb-3">
                      <div className="bg-gradient-to-r from-[#FF3131] to-[#FF3131]/90 px-3 py-1.5 rounded-full shadow-lg border-2 border-white dark:border-gray-800">
                        <span className="text-white dark:text-gray-100 font-bold text-xs sm:text-sm drop-shadow-sm">{product.name.split(' ')[1]}</span>
                      </div>
                    </div>
                    
                    {/* Image Container - NO absolute positioning */}
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 mb-4 mx-auto max-w-[200px] sm:max-w-[220px]">
                      <div className="bg-white dark:bg-gray-800/95 dark:bg-white dark:bg-gray-800/98 rounded-lg p-4">
                        <NextImage
                          src={product.image}
                          alt={product.name}
                          width={200}
                          height={200}
                          className="rounded-lg shadow-sm object-contain w-full h-auto max-h-[120px] sm:max-h-[140px] mx-auto"
                          sizes="(max-width: 640px) 120px, (max-width: 1024px) 140px, 160px"
                        />
                      </div>
                    </div>
                    
                    {/* Product Info - Clear separation */}
                    <div className="space-y-3">
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white dark:text-gray-100 leading-tight">{product.name}</h3>
                      <p className="text-[#FF3131] dark:text-[#FF5555] font-semibold text-sm sm:text-base">{product.subtitle}</p>
                      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed max-w-[280px] mx-auto">{product.description}</p>
                    </div>
                  </div>

                  {/* Purchase Options */}
                  <div className="mb-4 sm:mb-6 space-y-4">
                    {product.purchaseOptions
                      .filter(option => option.type === 'subscription')
                      .map(option => {
                        const isHighlighted = option.highlight;
                        const cardClass = isHighlighted
                          ? 'relative overflow-hidden rounded-3xl border-4 border-amber-400 dark:border-amber-500 bg-gradient-to-br from-purple-600 via-fuchsia-600 to-pink-600 dark:from-purple-700 dark:via-fuchsia-700 dark:to-pink-700 text-white dark:text-gray-100 p-6 shadow-2xl transform hover:scale-[1.02] transition-all duration-300 animate-pulse-subtle'
                          : 'rounded-2xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 p-5 shadow-md';
                        return (
                          <div key={option.key} className={cardClass}>
                            {/* Animated shimmer effect for highlighted option */}
                            {isHighlighted && (
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 dark:via-white/5 to-transparent animate-shimmer pointer-events-none" />
                            )}

                            {option.badgeLabel ? (
                              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 dark:from-amber-500 dark:via-yellow-500 dark:to-amber-600 text-gray-900 dark:text-gray-900 px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-black shadow-xl border-2 border-white dark:border-gray-900 whitespace-nowrap uppercase tracking-wider animate-bounce-subtle">
                                {option.badgeLabel}
                              </div>
                            ) : null}

                            <div className="flex flex-col gap-5 mt-2">
                              <div className="text-center">
                                <p className={`text-sm uppercase tracking-widest font-black mb-3 ${isHighlighted ? 'text-amber-300 dark:text-amber-200' : 'text-[#FF3131]'}`}>
                                  {option.label}
                                </p>
                                <div className={`text-5xl sm:text-6xl font-black mb-2 ${isHighlighted ? 'text-white dark:text-white drop-shadow-2xl' : 'text-[#FF3131] dark:text-[#FF5555]'}`}>
                                  {option.priceFormatted}
                                </div>
                                {option.perMonth ? (
                                  <p className={`text-lg font-bold mb-2 ${isHighlighted ? 'text-white/95 dark:text-gray-100' : 'text-gray-700 dark:text-gray-200'}`}>
                                    {option.perMonth}
                                  </p>
                                ) : null}
                                {option.subLabel ? (
                                  <p className={`text-sm ${isHighlighted ? 'text-white/90 dark:text-gray-200' : 'text-gray-600 dark:text-gray-300'}`}>
                                    {option.subLabel}
                                  </p>
                                ) : null}
                                {option.shippingNote ? (
                                  <div className={`mt-3 inline-block ${isHighlighted ? 'bg-white/20 dark:bg-white/10' : 'bg-gray-100 dark:bg-gray-700'} px-4 py-2 rounded-full`}>
                                    <p className={`text-sm font-bold ${isHighlighted ? 'text-white dark:text-white' : 'text-gray-700 dark:text-gray-200'}`}>
                                      {option.shippingNote}
                                    </p>
                                  </div>
                                ) : null}
                              </div>

                              {option.savings ? (
                                <div className="flex justify-center">
                                  <div
                                    className={`${isHighlighted ? 'bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-400 dark:from-amber-500 dark:via-yellow-500 dark:to-amber-500 text-gray-900 dark:text-gray-900 animate-pulse-glow' : 'bg-gradient-to-r from-green-500 to-green-600 dark:from-green-600 dark:to-green-700 text-white dark:text-gray-100'} px-6 py-3 rounded-2xl text-lg sm:text-xl font-black border-4 ${isHighlighted ? 'border-white dark:border-gray-900 shadow-2xl' : 'border-green-400 dark:border-green-700 shadow-xl'} transform hover:scale-110 transition-all duration-200 uppercase tracking-wider`}
                                  >
                                    🎉 {formatSavingsLabel(option.savings)}
                                  </div>
                                </div>
                              ) : null}
                            </div>
                            <div className="mt-5">
                              {renderOptionButton(option, option.cartProductId || product.id)}
                            </div>
                          </div>
                        );
                      })}

                    {product.purchaseOptions
                      .filter(option => option.type !== 'subscription')
                      .map(option => (
                        <div key={option.key} className="rounded-2xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 p-5 shadow-sm">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                            <div>
                              <p className="text-xs uppercase tracking-wide font-semibold text-gray-600 dark:text-gray-300">
                                {option.label}
                              </p>
                              <div className="text-2xl sm:text-3xl font-bold text-[#FF3131] dark:text-[#FF5555]">
                                {option.priceFormatted}
                              </div>
                              {option.subLabel ? (
                                <p className="text-xs mt-1 text-gray-600 dark:text-gray-300">
                                  {option.subLabel}
                                </p>
                              ) : null}
                              {option.shippingNote ? (
                                <p className="text-xs mt-1 font-medium text-gray-700 dark:text-gray-200">
                                  {option.shippingNote}
                                </p>
                              ) : null}
                            </div>
                            {option.savings ? (
                              <div className="bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 px-3 py-1.5 rounded-full text-xs font-semibold border border-green-200 dark:border-green-700">
                                {formatSavingsLabel(option.savings)}
                              </div>
                            ) : null}
                          </div>
                          <div className="mt-4">
                            {renderOptionButton(option, option.cartProductId || product.id)}
                          </div>
                        </div>
                      ))}
                  </div>

                  {/* Key Stats */}
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6 p-3 sm:p-4 bg-gray-50 dark:bg-gray-700/70 rounded-lg border border-gray-100 dark:border-gray-600">
                    <div className="text-center">
                      <div className="font-bold text-[#FF3131] dark:text-[#FF5555] text-sm sm:text-base leading-tight">{product.duration}</div>
                      <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-medium mt-1">{t.homepage.enhancedComparison.duration}</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-[#FF3131] dark:text-[#FF5555] text-sm sm:text-base leading-tight">{product.coverage}</div>
                      <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-medium mt-1">{t.homepage.enhancedComparison.coverage}</div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex-1 space-y-2 sm:space-y-3 mb-4 sm:mb-6 overflow-visible">
                    {Object.entries(getFeatureLabels(product.id)).map(([key, label]) => {
                      const isIncluded = product.features[key as keyof typeof product.features];
                      return (
                        <div key={key} className="flex items-start gap-2 sm:gap-3">
                          {isIncluded ? (
                            <Check className="w-4 sm:w-5 h-4 sm:h-5 text-green-500 dark:text-green-400 mt-0.5 flex-shrink-0" />
                          ) : (
                            <X className="w-4 sm:w-5 h-4 sm:h-5 text-gray-300 dark:text-gray-500 mt-0.5 flex-shrink-0" />
                          )}
                          <span className={`text-xs sm:text-sm leading-tight font-medium ${isIncluded ? 'text-gray-800 dark:text-gray-200' : 'text-gray-400 dark:text-gray-500'}`}>
                            {label}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {product.recommended && (
                    <div className="mt-3 sm:mt-4 text-center">
                      <div className="bg-gradient-to-r from-amber-400/20 via-yellow-400/20 to-amber-400/20 dark:from-amber-500/30 dark:via-yellow-500/30 dark:to-amber-500/30 border-2 border-amber-400 dark:border-amber-500 rounded-2xl p-4 animate-pulse-subtle">
                        <p className="text-sm sm:text-base text-amber-900 dark:text-amber-200 font-black uppercase tracking-wide">
                          🔥 {t.enhancedProductComparison?.chosenByCustomers || '68% Choose This Bundle'}
                        </p>
                        <p className="text-xs text-amber-800 dark:text-amber-300 font-semibold mt-1">
                          Join 1,000+ Happy Cat Owners
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="bg-gradient-to-r from-[#FF3131]/5 to-[#FF3131]/10 dark:from-[#FF3131]/10 dark:to-[#FF3131]/20 rounded-2xl p-8 border border-[#FF3131]/10 dark:border-[#FF3131]/30">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white dark:text-gray-100 mb-2">{t.homepage.enhancedComparison.whyChoosePurrify}</h3>
              <p className="text-gray-600 dark:text-gray-300">{t.homepage.enhancedComparison.joinThousands}</p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-[#FF3131] dark:text-[#FF5555] mb-1">1,000+</div>
                <div className="text-gray-600 dark:text-gray-300 font-medium">{t.homepage.enhancedComparison.happyCustomers}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#FF3131] dark:text-[#FF5555] mb-1">4.9/5</div>
                <div className="text-gray-600 dark:text-gray-300 font-medium">{t.homepage.enhancedComparison.averageRating}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#FF3131] dark:text-[#FF5555] mb-1">99%</div>
                <div className="text-gray-600 dark:text-gray-300 font-medium">{t.homepage.enhancedComparison.satisfactionRate}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#FF3131] dark:text-[#FF5555] mb-1">7 Days</div>
                <div className="text-gray-600 dark:text-gray-300 font-medium">{t.homepage.enhancedComparison.odorFreeGuarantee}</div>
              </div>
            </div>
          </div>

          {/* Money-Back Guarantee */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 px-6 py-3 rounded-full">
              <Zap className="w-5 h-5 mr-2" />
              <span className="font-bold">{t.enhancedProductComparison?.moneyBackGuaranteeText || '30-Day Money-Back Guarantee - Try Risk-Free!'}</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
