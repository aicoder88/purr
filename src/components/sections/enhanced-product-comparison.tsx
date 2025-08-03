import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { useState } from 'react';
import { useTranslation } from "../../lib/translation-context";
import { useCart } from "../../lib/cart-context";
import { Check, X, Star, TrendingUp, Award, Zap, ShoppingCart } from 'lucide-react';
import NextImage from "../../../components/NextImage";
import { PRODUCTS } from "@/lib/constants";

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
      console.error('Failed to add to cart:', error);
    } finally {
      setTimeout(() => setAddingToCart(null), 1000);
    }
  };

  const products = [
    {
      id: 'purrify-17g',
      name: 'Purrify 17g',
      subtitle: 'Trial Size',
      price: 6.99,
      originalPrice: 9.99,
      image: '/optimized/20g.webp',
      badge: 'TRIAL',
      badgeColor: 'bg-blue-500',
      description: 'Perfect for first-time users',
      duration: '1 week',
      coverage: '1 cat',
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
      name: 'Purrify 60g',
      subtitle: 'Most Popular',
      price: 19.99,
      originalPrice: 24.99,
      image: '/optimized/60g.webp',
      badge: 'BEST VALUE',
      badgeColor: 'bg-green-500',
      description: 'Ideal for single-cat households',
      duration: '1 month',
      coverage: '1-2 cats',
      features: {
        odorControl: true,
        naturalIngredients: true,
        easyApplication: true,
        moneyBackGuarantee: true,
        freeShipping: true,
        bulkDiscount: false,
        prioritySupport: true,
        bonusGuide: true
      },
      savings: 20,
      popularity: 3
    },
    {
      id: 'purrify-120g',
      name: 'Purrify 120g',
      subtitle: 'Maximum Power',
      price: 29.99,
      originalPrice: 39.99,
      image: '/optimized/140g.webp',
      badge: 'PREMIUM',
      badgeColor: 'bg-purple-500',
      description: 'Perfect for multi-cat households',
      duration: '2 months',
      coverage: '2-4 cats',
      features: {
        odorControl: true,
        naturalIngredients: true,
        easyApplication: true,
        moneyBackGuarantee: true,
        freeShipping: true,
        bulkDiscount: true,
        prioritySupport: true,
        bonusGuide: true
      },
      savings: 25,
      popularity: 2
    }
  ];

  const featureLabels = {
    odorControl: '7-Day Odor Control',
    naturalIngredients: '100% Natural Ingredients',
    easyApplication: 'Easy Application',
    moneyBackGuarantee: '30-Day Money Back Guarantee',
    freeShipping: 'Free Shipping',
    bulkDiscount: 'Bulk Discount Available',
    prioritySupport: 'Priority Customer Support',
    bonusGuide: 'Bonus Cat Care Guide'
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Container>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80 text-white px-6 py-2 rounded-full mb-6">
              <TrendingUp className="w-5 h-5 mr-2" />
              <span className="font-bold">{t.enhancedProductComparison?.compareAndSave || "COMPARE & SAVE"}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {t.enhancedProductComparison?.chooseYourPerfectSize || "Choose Your Perfect Purrify Size"}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t.enhancedProductComparison?.subtitle || "All sizes deliver the same powerful odor elimination. Choose based on your household size and usage frequency."}
            </p>
          </div>

          {/* Product Comparison Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {products.map((product) => (
              <div
                key={product.id}
                className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl ${
                  hoveredProduct === product.id ? 'scale-105 z-10' : ''
                } ${product.popularity === 3 ? 'ring-4 ring-[#FF3131]/20 scale-105' : ''}`}
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                {/* Badge */}
                <div className={`absolute -top-4 left-1/2 transform -translate-x-1/2 ${product.badgeColor} text-white px-6 py-2 rounded-full text-sm font-bold`}>
                  {product.badge}
                </div>

                {/* Popularity Indicator */}
                {product.popularity === 3 && (
                  <div className="absolute top-4 right-4 bg-[#FF3131] text-white p-2 rounded-full">
                    <Award className="w-5 h-5" />
                  </div>
                )}

                <div className="p-6">
                  {/* Product Image */}
                  <div className="text-center mb-6 min-h-[180px] flex flex-col justify-end">
                    <div className="relative w-32 h-32 mx-auto mb-4">
                      <NextImage
                        src={product.image}
                        alt={product.name}
                        width={128}
                        height={128}
                        className="rounded-lg shadow-md object-contain"
                        style={{ maxWidth: '100%', height: 'auto' }}
                      />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">{product.name}</h3>
                    <p className="text-[#FF3131] font-medium mb-2">{product.subtitle}</p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{product.description}</p>
                  </div>

                  {/* Pricing */}
                  <div className="text-center mb-6">
                    <div className="flex items-center justify-center mb-2">
                      <span className="text-3xl font-bold text-[#FF3131]">${product.price}</span>
                      <span className="text-gray-400 dark:text-gray-500 line-through ml-2">${product.originalPrice}</span>
                    </div>
                    <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 px-3 py-1 rounded-full text-sm font-medium inline-block">
                      Save {product.savings}%
                    </div>
                  </div>

                  {/* Key Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-center">
                      <div className="font-bold text-[#FF3131]">{product.duration}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">Duration</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-[#FF3131]">{product.coverage}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">Coverage</div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-3 mb-6 max-h-[300px] overflow-y-auto pr-2">
                    {Object.entries(featureLabels).map(([key, label]) => {
                      const isIncluded = product.features[key as keyof typeof product.features];
                      return (
                        <div key={key} className="flex items-start">
                          {isIncluded ? (
                            <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          ) : (
                            <X className="w-5 h-5 text-gray-300 dark:text-gray-600 mr-3 mt-0.5 flex-shrink-0" />
                          )}
                          <span className={`text-sm leading-tight ${isIncluded ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400 dark:text-gray-500'}`}>
                            {label}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* CTA Button */}
                  {product.id === 'purrify-17g' ? (
                    <Button
                      asChild
                      className="w-full py-4 text-lg font-bold transition-all duration-300 bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80 hover:from-[#FF3131]/90 hover:to-[#FF3131] text-white shadow-lg hover:shadow-xl"
                    >
                      <a
                        href="https://buy.stripe.com/5kQ3cw7uEeak1LkcbT5gc04"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full h-full flex items-center justify-center"
                      >
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        Try Risk-Free
                      </a>
                    </Button>
                  ) : (
                    <Button
                      className={`w-full py-4 text-lg font-bold transition-all duration-300 ${
                        product.popularity === 3
                          ? 'bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80 hover:from-[#FF3131]/90 hover:to-[#FF3131] text-white shadow-lg hover:shadow-xl'
                          : 'bg-gray-100 dark:bg-gray-700 hover:bg-[#FF3131] hover:text-white text-gray-800 dark:text-gray-200 border-2 border-gray-200 dark:border-gray-600 hover:border-[#FF3131]'
                      }`}
                      onClick={() => handleAddToCart(product.id)}
                      disabled={!!addingToCart}
                    >
                      {addingToCart === product.id ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Adding...
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <ShoppingCart className="w-5 h-5 mr-2" />
                          Choose This Size
                        </div>
                      )}
                    </Button>
                  )}

                  {/* Urgency for popular product */}
                  {product.popularity === 3 && (
                    <div className="mt-4 text-center">
                      <p className="text-sm text-[#FF3131] font-medium">
                        🔥 Chosen by 68% of customers
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="bg-gradient-to-r from-[#FF3131]/5 to-[#FF3131]/10 rounded-2xl p-8">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Why Choose Purrify?</h3>
              <p className="text-gray-600 dark:text-gray-300">Join thousands of satisfied cat parents who trust Purrify</p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-[#FF3131] mb-1">10,000+</div>
                <div className="text-gray-600 dark:text-gray-300">Happy Customers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#FF3131] mb-1">4.9/5</div>
                <div className="text-gray-600 dark:text-gray-300">Average Rating</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#FF3131] mb-1">99%</div>
                <div className="text-gray-600 dark:text-gray-300">Satisfaction Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#FF3131] mb-1">7 Days</div>
                <div className="text-gray-600 dark:text-gray-300">Odor-Free Guarantee</div>
              </div>
            </div>
          </div>

          {/* Money-Back Guarantee */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 px-6 py-3 rounded-full">
              <Zap className="w-5 h-5 mr-2" />
              <span className="font-bold">30-Day Money-Back Guarantee - Try Risk-Free!</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
