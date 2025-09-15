import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { useState } from 'react';
import { useTranslation } from "../../lib/translation-context";
import { useCart } from "../../lib/cart-context";
import { Check, X, TrendingUp, Award, Zap, ShoppingCart } from 'lucide-react';
import NextImage from "../../../components/NextImage";


export function EnhancedProductComparison() {
  const { t } = useTranslation();
  const { addToCart } = useCart();
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [addingToCart, setAddingToCart] = useState<string | null>(null);

  const handleAddToCart = async (productId: string) => {
    setAddingToCart(productId);
    try {
      addToCart(productId);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Failed to add to cart:', error);
      }
    } finally {
      setTimeout(() => setAddingToCart(null), 1000);
    }
  };

  const products = [
    {
      id: 'purrify-17g',
      name: t.products?.['purrify-17g']?.name || 'Purrify 17g',
      subtitle: t.productComparison?.products?.[0]?.name || 'Trial Size',
      price: 6.99,
      originalPrice: 9.99,
      image: '/optimized/20g.webp',
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
        freeShipping: false,
        bulkDiscount: false,
        prioritySupport: false,
        bonusGuide: false
      },
      savings: 30,
      popularity: 1
    },
    {
      id: 'purrify-60g',
      name: t.products?.['purrify-60g']?.name || 'Purrify 60g',
      subtitle: t.enhancedProductComparison?.mostPopular || 'Most Popular',
      price: 19.99,
      originalPrice: 24.99,
      image: '/optimized/60g.webp',
      badge: t.enhancedProductComparison?.bestValue || 'BEST VALUE',
      badgeColor: 'bg-green-500',
      description: t.enhancedProductComparison?.idealForSingleCat || 'Ideal for single-cat households',
      duration: t.productComparison?.products?.[1]?.duration || '4-6 weeks',
      coverage: t.productComparison?.products?.[1]?.cats || '1-3 cats',
      features: {
        odorControl: true,
        naturalIngredients: true,
        easyApplication: true,
        moneyBackGuarantee: true,
        // freeShipping: true, // TODO: Restore when free shipping is available
        bulkDiscount: false,
        prioritySupport: true,
        bonusGuide: true
      },
      savings: 20,
      popularity: 3
    },
    {
      id: 'purrify-120g',
      name: t.products?.['purrify-120g']?.name || 'Purrify 120g',
      subtitle: t.productsSection?.powerLevels?.maximumPower || 'Maximum Power',
      price: 29.99,
      originalPrice: 39.99,
      image: '/optimized/140g.webp',
      badge: t.enhancedProductComparison?.premium || 'PREMIUM',
      badgeColor: 'bg-purple-500',
      description: t.enhancedProductComparison?.perfectForMultiCat || 'Perfect for multi-cat households',
      duration: t.productComparison?.products?.[2]?.duration || '8-12 weeks',
      coverage: t.productComparison?.products?.[2]?.cats || '3+ cats',
      features: {
        odorControl: true,
        naturalIngredients: true,
        easyApplication: true,
        moneyBackGuarantee: true,
        // freeShipping: true, // TODO: Restore when free shipping is available
        bulkDiscount: true,
        prioritySupport: true,
        bonusGuide: true
      },
      savings: 25,
      popularity: 2
    }
  ];

  const featureLabels = {
    odorControl: t.enhancedProductComparison?.odorControl || '7-Day Odor Control',
    naturalIngredients: t.enhancedProductComparison?.naturalIngredients || '100% Natural Ingredients',
    easyApplication: t.enhancedProductComparison?.easyApplication || 'Easy Application',
    moneyBackGuarantee: t.enhancedProductComparison?.moneyBackGuarantee || '30-Day Money Back Guarantee',
    // freeShipping: t.enhancedProductComparison?.freeShipping || 'Free Shipping', // TODO: Restore when free shipping is available
    bulkDiscount: t.enhancedProductComparison?.bulkDiscount || 'Bulk Discount Available',
    prioritySupport: t.enhancedProductComparison?.prioritySupport || 'Priority Customer Support',
    bonusGuide: t.enhancedProductComparison?.bonusGuide || 'Bonus Cat Care Guide'
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
                } ${product.popularity === 3 ? 'ring-4 ring-[#FF3131]/20 dark:ring-[#FF3131]/50 scale-[1.02]' : ''}`}
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                {/* Top Section with Badge and Popular Indicator */}
                <div className="relative px-4 sm:px-6 pt-6 pb-2">
                  {/* Badge */}
                  <div className={`absolute -top-3 left-1/2 transform -translate-x-1/2 ${product.badgeColor} text-white dark:text-gray-100 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg`}>
                    {product.badge}
                  </div>

                  {/* Popularity Indicator */}
                  {product.popularity === 3 && (
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
                          width={128}
                          height={128}
                          className="rounded-lg shadow-sm object-contain w-full h-auto max-h-[120px] sm:max-h-[140px] mx-auto"
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

                  {/* Pricing */}
                  <div className="text-center mb-4 sm:mb-6">
                    <div className="flex items-center justify-center mb-2 gap-2">
                      <span className="text-2xl sm:text-3xl font-bold text-[#FF3131] dark:text-[#FF5555]">${product.price}</span>
                      <span className="text-gray-500 dark:text-gray-400 line-through text-lg sm:text-xl">${product.originalPrice}</span>
                    </div>
                    <div className="bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold inline-block border border-green-200 dark:border-green-700 shadow-sm">
                      {t.subscriptionOfferExtended?.save || 'Save'} {product.savings}%
                    </div>
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
                    {Object.entries(featureLabels).map(([key, label]) => {
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

                  {/* CTA Button */}
                  <div className="mt-auto">
                    {product.id === 'purrify-17g' ? (
                      <Button
                        asChild
                        className="w-full py-3 sm:py-4 text-sm sm:text-base lg:text-lg font-bold transition-all duration-300 bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80 hover:from-[#FF3131]/90 hover:to-[#FF3131] text-white dark:text-gray-100 shadow-lg hover:shadow-xl"
                      >
                        <a
                          href="https://buy.stripe.com/5kQ3cw7uEeak1LkcbT5gc04"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full h-full flex items-center justify-center gap-2"
                        >
                          <ShoppingCart className="w-4 sm:w-5 h-4 sm:h-5" />
                          {t.homepage.enhancedComparison.tryRiskFree}
                        </a>
                      </Button>
                    ) : (
                      <Button
                        className={`w-full py-3 sm:py-4 text-sm sm:text-base lg:text-lg font-bold transition-all duration-300 ${
                          product.popularity === 3
                            ? 'bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80 hover:from-[#FF3131]/90 hover:to-[#FF3131] text-white dark:text-gray-100 shadow-lg hover:shadow-xl border-2 border-transparent'
                            : 'bg-gray-100 dark:bg-gray-700 hover:bg-[#FF3131] hover:text-white dark:text-gray-100 text-gray-800 dark:text-white dark:text-gray-100 border-2 border-gray-200 dark:border-gray-500 hover:border-[#FF3131] dark:hover:border-[#FF3131]'
                        }`}
                        onClick={() => handleAddToCart(product.id)}
                        disabled={!!addingToCart}
                      >
                        {addingToCart === product.id ? (
                          <div className="flex items-center gap-2">
                            <div className="animate-spin rounded-full h-4 sm:h-5 w-4 sm:w-5 border-b-2 border-white"></div>
                            {t.productsSection?.adding || 'Adding...'}
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <ShoppingCart className="w-4 sm:w-5 h-4 sm:h-5" />
                            {t.homepage.enhancedComparison.chooseThisSize}
                          </div>
                        )}
                      </Button>
                    )}

                    {/* Urgency for popular product */}
                    {product.popularity === 3 && (
                      <div className="mt-3 sm:mt-4 text-center">
                        <p className="text-xs sm:text-sm text-[#FF3131] dark:text-[#FF5555] font-medium">
                          {t.enhancedProductComparison?.chosenByCustomers || '🔥 68% of customers choose'}
                        </p>
                      </div>
                    )}
                  </div>
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
