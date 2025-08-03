import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { PRODUCTS } from "@/lib/constants";
import dynamic from "next/dynamic";
import NextImage from "../../../components/NextImage";
import { useTranslation } from "../../lib/translation-context";
import { useCart } from "../../lib/cart-context";
import { ReviewSystem } from '../reviews/ReviewSystem';
import { TouchGallery } from '../mobile/TouchGallery';
import { ecommerceEvents } from '../../lib/gtm-events';
import { useState, useEffect } from 'react';
import { ShoppingCart, Star, Check } from 'lucide-react';

// Dynamically import SectionHeader to reduce initial bundle size
const SectionHeader = dynamic(() => import("../ui/section-header"), { ssr: true });

export function Products() {
  const { t } = useTranslation();
  const { addToCart } = useCart();
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [addingToCart, setAddingToCart] = useState<string | null>(null);

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

  const handleAddToCart = async (product: any) => {
    setAddingToCart(product.id);
    try {
      await addToCart(product);
      // Track ecommerce event
      ecommerceEvents.addToCart({
        item_id: product.id,
        item_name: product.name,
        category: 'cat-litter-additive',
        price: product.price,
        quantity: 1
      });
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setTimeout(() => setAddingToCart(null), 1000);
    }
  };
  
  return (
    <section
      className="py-16 bg-gradient-to-br from-[#FFFFFF] via-[#FFFFF5] to-[#FFFFFF] dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 transition-colors duration-300"
      id="products"
    >
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-12">
          <SectionHeader text={t.productsSection?.forEveryCatHousehold || "FOR EVERY CAT HOUSEHOLD"} />
          <h2 className="text-5xl font-bold tracking-tight mb-6 bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80 dark:from-[#FF5050] dark:to-[#FF5050]/80 bg-clip-text text-transparent">
            {t.productsSection?.pickYourPowerLevel || "PICK YOUR PURRIFY POWER LEVEL"}
          </h2>
          <p className="text-gray-600 text-xl max-w-2xl mx-auto dark:text-gray-300">
            {t.productsSection?.subtitle || "Whether you have one kitten or multiple cats, we have the ideal Purrify size for your home."}
          </p>
        </div>

        {/* Power Level Indicator */}
        <div className="relative max-w-4xl mx-auto mb-12 px-4">
          <div className="h-3 bg-gradient-to-r from-[#E0EFC7] via-[#FF3131]/60 to-[#FF3131] rounded-full"></div>
          <div className="flex justify-between mt-2">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
              {t.productsSection?.powerLevels?.kittenPower || "Kitten Power"}
            </span>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
              {t.productsSection?.powerLevels?.standardPower || "Standard Power"}
            </span>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
              {t.productsSection?.powerLevels?.maximumPower || "Maximum Power"}
            </span>
          </div>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {PRODUCTS.map((product, index) => (
            <div
              key={product.id}
              className="bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-xl border border-[#E0EFC7] dark:border-gray-800 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(224,239,199,0.5)] hover:-translate-y-2 group relative"
              style={{ 
                transitionDelay: `${index * 100}ms`,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                opacity: isVisible ? 1 : 0
              }}
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              {/* Highlight for recommended product */}
              {index === 1 && (
                <div className="absolute -top-4 left-0 right-0 mx-auto w-max px-4 py-1 bg-[#FF3131] text-white font-bold text-sm rounded-full shadow-lg z-10">
                  {t.productsSection?.mostPopular || "MOST POPULAR"}
                </div>
              )}
              
              <div className="relative">
                <div className="relative bg-gradient-to-br from-[#FFFFF5] to-[#F8F9FA] dark:from-gray-800 dark:to-gray-700 rounded-t-2xl overflow-hidden group-hover:shadow-2xl transition-all duration-500">
                  <div className="relative h-72 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#FF3131]/5 to-[#FF3131]/10 z-10"></div>
                    <div className="relative h-full flex items-center justify-center p-8">
                      <NextImage
                        src={product.image}
                        alt={`${product.name} - ${product.description.split('\n')[0]}`}
                        width={180}
                        height={180}
                        className="max-w-[180px] max-h-[180px] mx-auto transition-transform duration-700 group-hover:scale-110"
                        style={{
                          objectFit: 'contain',
                          objectPosition: 'center'
                        }}
                        loading="lazy"
                        fetchPriority="auto"
                      />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#FF3131]/20 to-transparent p-4">
                      <p className="text-white font-bold text-sm drop-shadow-md line-clamp-2">
                        {t.products[product.id]?.description.split('\n')[0]}
                      </p>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80 px-5 py-2 rounded-full shadow-lg transform rotate-3 group-hover:rotate-0 transition-transform duration-300">
                    <span className="text-white font-bold text-lg">{product.size}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-8">
                <div className="mb-6">
                  <h3 className="font-bold text-2xl mb-3 bg-gradient-to-br from-[#6D28D9] via-[#8B5CF6] to-[#A78BFA] bg-clip-text text-transparent">
                    {t.products[product.id]?.name || product.name}
                  </h3>
                  
                  {/* Feature bullets from description */}
                  <div className="space-y-2 mb-4">
                    {(t.products[product.id]?.description || product.description).split('\n').map((line, i) => (
                      <div key={i} className="flex items-start">
                        {i > 0 && <div className="text-[#FF3131] mr-2 mt-1">•</div>}
                        <p className={`text-gray-700 dark:text-gray-300 ${i === 0 ? 'font-medium text-lg' : ''}`}>{line}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <span className="text-2xl font-bold bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80 bg-clip-text text-transparent">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.id === "purrify-17g" ? (
                    <a
                      href="https://buy.stripe.com/5kQ3cw7uEeak1LkcbT5gc04"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80 hover:from-[#FF3131]/90 hover:to-[#FF3131] text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 border-0 rounded-md px-6 py-3 text-lg"
                    >
                      {t.productsSection?.buyNow || "Buy Now"}
                    </a>
                  ) : (
                    <Button 
                      className="bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80 hover:from-[#FF3131]/90 hover:to-[#FF3131] text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 border-0"
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
