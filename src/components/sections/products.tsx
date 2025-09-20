import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { PRODUCTS } from "@/lib/constants";
import dynamic from "next/dynamic";
import NextImage from "../../../components/NextImage";
import { useTranslation } from "../../lib/translation-context";
import { useCart } from "../../lib/cart-context";
import { ReviewSystem } from '../reviews/ReviewSystem';
import { ecommerceEvents } from '../../lib/gtm-events';
import { useState, useCallback } from 'react';
import { createSectionClasses, GRADIENTS, COLORS } from "@/lib/theme-utils";
import { useIntersectionObserver } from "@/lib/component-utils";
import { ProductCard } from "./products/ProductCard";

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
  const [addedToCart, setAddedToCart] = useState<string | null>(null);
  const [quantities, setQuantities] = useState<{[key: string]: number}>({});

  const sectionRef = useIntersectionObserver((isIntersecting) => {
    if (isIntersecting) {
      setIsVisible(true);
    }
  });

  const handleAddToCart = useCallback(async (product: Product) => {
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

      // Show success state
      setAddingToCart(null);
      setAddedToCart(product.id);

      // Reset to normal state after 2 seconds
      setTimeout(() => {
        setAddedToCart(null);
      }, 2000);
    } catch (err) {
      console.error('Failed to add to cart:', err);
      setAddingToCart(null);
    }
  }, [addToCart, quantities]);

  const getCartQuantity = useCallback((productId: string) => {
    const cartItem = items.find(item => item.id === productId);
    return cartItem?.quantity || 0;
  }, [items]);

  const updateProductQuantity = useCallback((productId: string, delta: number) => {
    const currentQty = quantities[productId] || 1;
    const newQty = Math.max(1, currentQty + delta);
    setQuantities(prev => ({ ...prev, [productId]: newQty }));
  }, [quantities]);
  
  const sectionClasses = createSectionClasses('light');

  return (
    <section
      ref={sectionRef}
      className={`${sectionClasses} py-12 sm:py-16 lg:py-20`}
      id="products"
      aria-labelledby="products-heading"
    >
      <Container>
        <div className="max-w-4xl mx-auto text-center mb-8 sm:mb-12 lg:mb-16 px-4">
          <SectionHeader text={t.productsSection?.forEveryCatHousehold || "FOR EVERY CAT HOUSEHOLD"} />
          <h2 id="products-heading" className={`text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 sm:mb-6 ${GRADIENTS.text.primary} ${GRADIENTS.text.primaryDark} leading-tight`}>
            {t.productsSection?.pickYourPowerLevel || "PICK YOUR PURRIFY POWER LEVEL"}
          </h2>
          <p className={`${COLORS.text.tertiary} text-base sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed`}>
            {t.productsSection?.subtitle || "Whether you have one kitten or multiple cats, we have the ideal Purrify size for your home."}
          </p>
        </div>

        {/* Power Level Indicator */}
        <div className="relative max-w-4xl mx-auto mb-8 sm:mb-12 px-4">
          <div className="h-2 sm:h-3 bg-gradient-to-r from-[#E0EFC7] via-[#FF3131]/60 to-[#FF3131] rounded-full"></div>
          <div className="flex justify-between mt-2 gap-2">
            <span className={`text-xs sm:text-sm font-medium ${COLORS.text.tertiary} text-left`}>
              {t.productsSection?.powerLevels?.kittenPower || "Kitten Power"}
            </span>
            <span className={`text-xs sm:text-sm font-medium ${COLORS.text.tertiary} text-center`}>
              {t.productsSection?.powerLevels?.standardPower || "Standard Power"}
            </span>
            <span className={`text-xs sm:text-sm font-medium ${COLORS.text.tertiary} text-right`}>
              {t.productsSection?.powerLevels?.maximumPower || "Maximum Power"}
            </span>
          </div>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {PRODUCTS.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              isVisible={isVisible}
              addingToCart={addingToCart}
              addedToCart={addedToCart}
              quantities={quantities}
              cartQuantity={getCartQuantity(product.id)}
              t={t}
              onAddToCart={handleAddToCart}
              onUpdateQuantity={updateProductQuantity}
            />
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
