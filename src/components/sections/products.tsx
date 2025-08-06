import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { PRODUCTS } from "@/lib/constants";
import dynamic from "next/dynamic";
import NextImage from "../../../components/NextImage";
import { useTranslation } from "../../lib/translation-context";
import { useCart } from "../../lib/cart-context";
import { ReviewSystem } from '../reviews/ReviewSystem';
import { ecommerceEvents } from '../../lib/gtm-events';
import { useState, useEffect } from 'react';
import { ShoppingCart, Plus, Minus } from 'lucide-react';

// Dynamically import SectionHeader to reduce initial bundle size
const SectionHeader = dynamic(() => import("../ui/section-header"), { ssr: true });

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  size: string;
}

export function Products() {
  const { t } = useTranslation();
  const { addToCart, updateQuantity, items } = useCart();
  const [isVisible, setIsVisible] = useState(false);
  const [addingToCart, setAddingToCart] = useState<string | null>(null);
  const [quantities, setQuantities] = useState<{[key: string]: number}>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('products');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const handleAddToCart = async (product: Product) => {
    setAddingToCart(product.id);
    const quantity = quantities[product.id] || 1;
    try {
      // Add the specified quantity
      for (let i = 0; i < quantity; i++) {
        addToCart(product.id);
      }
      // Track ecommerce event
      ecommerceEvents.addToCart({
        item_id: product.id,
        item_name: product.name,
        category: 'cat-litter-additive',
        price: product.price,
        quantity: quantity
      });
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setTimeout(() => setAddingToCart(null), 1000);
    }
  };

  const getCartQuantity = (productId: string) => {
    const cartItem = items.find(item => item.id === productId);
    return cartItem?.quantity || 0;
  };

  const updateProductQuantity = (productId: string, delta: number) => {
    const currentQty = quantities[productId] || 1;
    const newQty = Math.max(1, currentQty + delta);
    setQuantities(prev => ({ ...prev, [productId]: newQty }));
  };
  
  return (
    <section
      className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-[#FFFFFF] via-[#FFFFF5] to-[#FFFFFF] dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 transition-colors duration-300"
      id="products"
    >
      <Container>
        <div className="max-w-4xl mx-auto text-center mb-8 sm:mb-12 lg:mb-16 px-4">
          <SectionHeader text={t.productsSection?.forEveryCatHousehold || "FOR EVERY CAT HOUSEHOLD"} />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 sm:mb-6 bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80 dark:from-[#FF5050] dark:to-[#FF5050]/80 bg-clip-text text-transparent leading-tight">
            {t.productsSection?.pickYourPowerLevel || "PICK YOUR PURRIFY POWER LEVEL"}
          </h2>
          <p className="text-gray-600 text-base sm:text-lg lg:text-xl max-w-3xl mx-auto dark:text-gray-300 leading-relaxed">
            {t.productsSection?.subtitle || "Whether you have one kitten or multiple cats, we have the ideal Purrify size for your home."}
          </p>
        </div>

        {/* Power Level Indicator */}
        <div className="relative max-w-4xl mx-auto mb-8 sm:mb-12 px-4">
          <div className="h-2 sm:h-3 bg-gradient-to-r from-[#E0EFC7] via-[#FF3131]/60 to-[#FF3131] rounded-full"></div>
          <div className="flex justify-between mt-2 gap-2">
            <span className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300 text-left">
              {t.productsSection?.powerLevels?.kittenPower || "Kitten Power"}
            </span>
            <span className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300 text-center">
              {t.productsSection?.powerLevels?.standardPower || "Standard Power"}
            </span>
            <span className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300 text-right">
              {t.productsSection?.powerLevels?.maximumPower || "Maximum Power"}
            </span>
          </div>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {PRODUCTS.map((product, index) => (
            <div
              key={product.id}
              className="bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-xl border border-[#E0EFC7] dark:border-gray-800 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(224,239,199,0.5)] hover:-translate-y-2 group relative z-10"
              style={{ 
                transitionDelay: `${index * 100}ms`,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                opacity: isVisible ? 1 : 0
              }}
              
            >
              {/* Highlight for recommended product */}
              {index === 1 && (
                <div className="absolute -top-4 left-0 right-0 mx-auto w-max px-4 py-1 bg-[#FF3131] text-white font-bold text-sm rounded-full shadow-lg z-30">
                  {t.productsSection?.mostPopular || "MOST POPULAR"}
                </div>
              )}
              
              <div className="relative">
                <div className="relative bg-gradient-to-br from-[#FFFFF5] to-[#F8F9FA] dark:from-gray-800 dark:to-gray-700 rounded-t-2xl overflow-hidden group-hover:shadow-2xl transition-all duration-500">
                  <div className="relative h-60 sm:h-72 overflow-hidden">
                    {/* Background overlay - kept subtle */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#FF3131]/3 to-[#FF3131]/8 z-10"></div>
                    
                    {/* Product image container with proper containment */}
                    <div className="relative h-full flex items-center justify-center p-4 sm:p-8 z-20">
                      <div className="relative max-w-[140px] sm:max-w-[180px] max-h-[140px] sm:max-h-[180px]">
                        <NextImage
                          src={product.image}
                          alt={`${product.name} - ${product.description.split('\n')[0]}`}
                          width={180}
                          height={180}
                          className="w-full h-full mx-auto transition-transform duration-700 group-hover:scale-110 object-contain"
                          loading="lazy"
                          fetchPriority="auto"
                        />
                      </div>
                    </div>
                    
                    {/* Bottom description overlay with better contrast */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 sm:p-4 z-20">
                      <p className="text-white font-bold text-xs sm:text-sm drop-shadow-lg line-clamp-2">
                        {t.products[product.id]?.description.split('\n')[0]}
                      </p>
                    </div>
                  </div>
                  
                  {/* Size badge with improved positioning and contrast */}
                  <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-gradient-to-r from-[#FF3131] to-[#FF3131]/90 px-3 sm:px-5 py-1.5 sm:py-2 rounded-full shadow-lg transform rotate-2 group-hover:rotate-0 transition-transform duration-300 z-30">
                    <span className="text-white font-bold text-sm sm:text-lg drop-shadow-md">{product.size}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 sm:p-6 lg:p-8">
                <div className="mb-4 sm:mb-6">
                  <h3 className="font-bold text-xl sm:text-2xl mb-2 sm:mb-3 bg-gradient-to-br from-[#6D28D9] via-[#8B5CF6] to-[#A78BFA] bg-clip-text text-transparent leading-tight">
                    {t.products[product.id]?.name || product.name}
                  </h3>
                  
                  {/* Feature bullets from description */}
                  <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
                    {(t.products[product.id]?.description || product.description).split('\n').map((line, i) => (
                      <div key={i} className="flex items-start">
                        {i > 0 && <div className="text-[#FF3131] mr-2 mt-1 flex-shrink-0">•</div>}
                        <p className={`text-gray-700 dark:text-gray-300 ${i === 0 ? 'font-medium text-base sm:text-lg' : 'text-sm sm:text-base'} leading-tight`}>{line}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-3 pt-3 sm:pt-4 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex justify-between items-center">
                    <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80 bg-clip-text text-transparent">
                      ${product.price.toFixed(2)}
                    </span>
                    {getCartQuantity(product.id) > 0 && (
                      <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                        {getCartQuantity(product.id)} in cart
                      </span>
                    )}
                  </div>
                  
                  {product.id === "purrify-17g" ? (
                    <a
                      href="https://buy.stripe.com/5kQ3cw7uEeak1LkcbT5gc04"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80 hover:from-[#FF3131]/90 hover:to-[#FF3131] text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 border-0 rounded-md px-6 py-3 text-lg"
                    >
                      {t.productsSection?.buyNow || "Buy Now"}
                    </a>
                  ) : (
                    <div className="space-y-2">
                      {/* Quantity Controls */}
                      <div className="flex items-center justify-center space-x-3">
                        <button
                          onClick={() => updateProductQuantity(product.id, -1)}
                          className="w-8 h-8 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors"
                        >
                          <Minus className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                        </button>
                        <span className="text-lg font-semibold min-w-[2rem] text-center text-gray-900 dark:text-gray-100">
                          {quantities[product.id] || 1}
                        </span>
                        <button
                          onClick={() => updateProductQuantity(product.id, 1)}
                          className="w-8 h-8 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors"
                        >
                          <Plus className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                        </button>
                      </div>
                      
                      <Button 
                        className="w-full bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80 hover:from-[#FF3131]/90 hover:to-[#FF3131] text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 border-0"
                        onClick={() => handleAddToCart(product)}
                        disabled={addingToCart === product.id}
                      >
                        {addingToCart === product.id ? (
                          <div className="flex items-center">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            {t.productsSection?.adding || "Adding..."}
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            {t.productsSection?.addToCart || "Add to Cart"}
                          </div>
                        )}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Customer Reviews Section */}
        <div className="mt-16">
          <ReviewSystem 
            compact={true}
            maxReviews={3}
            showFilters={false}
          />
        </div>
      </Container>
    </section>
  );
}
