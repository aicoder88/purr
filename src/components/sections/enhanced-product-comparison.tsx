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

  const standardPriceAmount = getProductPrice('standard');
  const familyPriceAmount = getProductPrice('family');
  const standardAutoshipPriceAmount = getProductPrice('standardAutoship');
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

  const standardAutoshipSavings = computeQuarterlySavings(standardPriceAmount, standardAutoshipPriceAmount);
  const familyAutoshipSavings = computeQuarterlySavings(familyPriceAmount, familyAutoshipPriceAmount);

  const products: ProductCard[] = [
    {
      id: 'purrify-12g',
      name: t.products?.['purrify-12g']?.name || 'Purrify 12g',
      subtitle: t.productComparison?.products?.[0]?.name || 'Trial Size',
      badge: t.enhancedProductComparison?.trial || 'TRIAL',
      badgeColor: 'bg-blue-500',
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
          label: pricingCopy.oneTimeLabel,
          priceFormatted: formatProductPrice('trial', locale),
          subLabel: pricingCopy.shippingIncluded,
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
      subtitle: t.enhancedProductComparison?.autoshipHero || t.enhancedProductComparison?.mostPopular || 'Most Popular',
      badge: t.enhancedProductComparison?.autoshipHighlight || 'SUBSCRIBE & SAVE',
      badgeColor: 'bg-green-500',
      description:
        t.enhancedProductComparison?.idealForSingleCat ||
        'Ideal for single-cat households with quarterly autoship savings.',
      duration: t.productComparison?.products?.[1]?.duration || '4-6 weeks',
      coverage: t.productComparison?.products?.[1]?.cats || '1-3 cats',
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
          key: 'standard-autoship',
          type: 'subscription',
          label: pricingCopy.autoshipLabel,
          priceFormatted: formatProductPrice('standardAutoship', locale),
          subLabel: `${pricingCopy.billedEvery} 3 ${pricingCopy.months}`,
          perMonth: formatPerMonthLabel(standardAutoshipPriceAmount / 3),
          shippingNote: pricingCopy.shippingIncluded,
          savings: standardAutoshipSavings,
          action: 'link',
          linkKey: 'standardAutoship',
          ctaLabel: pricingCopy.startAutoship,
          icon: 'zap',
          highlight: true,
          ctaEmphasis: 'contrast',
        },
        {
          key: 'standard-single',
          type: 'one-time',
          label: pricingCopy.oneTimeLabel,
          priceFormatted: formatProductPrice('standard', locale),
          subLabel: pricingCopy.plusShipping,
          shippingNote: pricingCopy.shippingCalculated,
          action: 'cart',
          linkKey: 'standardSingle',
          ctaLabel: t.homepage.enhancedComparison.chooseThisSize,
          icon: 'cart',
          cartProductId: 'purrify-50g',
          ctaEmphasis: 'secondary',
        },
      ],
    },
    {
      id: 'purrify-120g',
      name: t.products?.['purrify-120g']?.name || 'Purrify 120g',
      subtitle: pricingCopy.bestValueBadge,
      badge: pricingCopy.bestValueBadge,
      badgeColor: 'bg-purple-600',
      description:
        t.enhancedProductComparison?.perfectForMultiCat ||
        'Perfect for multi-cat households and allergy-prone homes.',
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
          label: pricingCopy.autoshipBestLabel,
          priceFormatted: formatProductPrice('familyAutoship', locale),
          subLabel: `${pricingCopy.billedEvery} 3 ${pricingCopy.months}`,
          perMonth: formatPerMonthLabel(familyAutoshipPriceAmount / 3),
          shippingNote: pricingCopy.freeShipping,
          savings: familyAutoshipSavings,
          action: 'link',
          linkKey: 'familyAutoship',
          ctaLabel: pricingCopy.startAutoship,
          icon: 'zap',
          highlight: true,
          badgeLabel: `${pricingCopy.bestValueBadge} • ${pricingCopy.recommended}`,
          ctaEmphasis: 'contrast',
        },
        {
          key: 'family-single',
          type: 'one-time',
          label: pricingCopy.oneTimeLabel,
          priceFormatted: formatProductPrice('family', locale),
          subLabel: pricingCopy.plusShipping,
          shippingNote: pricingCopy.shippingCalculated,
          action: 'cart',
          linkKey: 'familySingle',
          ctaLabel: t.homepage.enhancedComparison.chooseThisSize,
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
        'bg-white text-[#FF3131] hover:bg-white/90 dark:bg-gray-100 dark:text-[#FF3131] shadow-xl hover:shadow-2xl',
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
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12 lg:mb-16 px-4">
            <div className="inline-flex items-center bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80 text-white dark:text-gray-100 px-4 sm:px-6 py-2 rounded-full mb-4 sm:mb-6 shadow-lg">
              <TrendingUp className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
              <span className="font-bold text-sm sm:text-base">{t.enhancedProductComparison?.compareAndSave || "COMPARE & SAVE"}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white dark:text-gray-100 mb-3 sm:mb-4 leading-tight">
              {t.homepage.enhancedComparison.chooseYourPerfectSize}
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              {t.homepage.enhancedComparison.allSizesDeliver}
            </p>
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
                          ? 'relative overflow-hidden rounded-2xl border border-[#FF3131]/40 bg-gradient-to-br from-[#FF3131]/95 via-[#FF3131]/85 to-[#FF3131]/75 text-white dark:text-gray-100 p-5 shadow-2xl'
                          : 'rounded-2xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 p-5 shadow-md';
                        return (
                          <div key={option.key} className={cardClass}>
                            {option.badgeLabel ? (
                              <div className="absolute -top-3 right-4 bg-white/20 dark:bg-white/10 text-white dark:text-gray-100 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm border border-white/30">
                                {option.badgeLabel}
                              </div>
                            ) : null}
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                              <div>
                                <p className={`text-xs uppercase tracking-wide font-semibold ${isHighlighted ? 'text-white/80' : 'text-[#FF3131]'}`}>
                                  {option.label}
                                </p>
                                <div className={`text-2xl sm:text-3xl font-bold ${isHighlighted ? 'text-white' : 'text-[#FF3131] dark:text-[#FF5555]'}`}>
                                  {option.priceFormatted}
                                </div>
                                {option.perMonth ? (
                                  <p className={`text-sm font-medium ${isHighlighted ? 'text-white/85' : 'text-gray-700 dark:text-gray-200'}`}>
                                    {option.perMonth}
                                  </p>
                                ) : null}
                                {option.subLabel ? (
                                  <p className={`text-xs mt-1 ${isHighlighted ? 'text-white/80' : 'text-gray-600 dark:text-gray-300'}`}>
                                    {option.subLabel}
                                  </p>
                                ) : null}
                                {option.shippingNote ? (
                                  <p className={`text-xs mt-1 font-medium ${isHighlighted ? 'text-white' : 'text-gray-700 dark:text-gray-200'}`}>
                                    {option.shippingNote}
                                  </p>
                                ) : null}
                              </div>
                              {option.savings ? (
                                <div
                                  className={`${isHighlighted ? 'bg-white text-[#FF3131]' : 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200'} px-3 py-1.5 rounded-full text-xs font-semibold border ${isHighlighted ? 'border-white/70' : 'border-green-200 dark:border-green-700'}`}
                                >
                                  {formatSavingsLabel(option.savings)}
                                </div>
                              ) : null}
                            </div>
                            <div className="mt-4">
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
                      <p className="text-xs sm:text-sm text-[#FF3131] dark:text-[#FF5555] font-medium">
                        {t.enhancedProductComparison?.chosenByCustomers || '🔥 68% of customers choose this bundle'}
                      </p>
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
