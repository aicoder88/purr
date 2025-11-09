import { Button } from "@/components/ui/button";
import { useState } from 'react';
import { ShoppingCart, Plus, Minus, Check } from 'lucide-react';
import Image from 'next/image';
import { createButtonClasses, GRADIENTS, COLORS, TRANSITIONS } from "@/lib/theme-utils";
import { LoadingSpinner, CheckIcon, createStaggeredAnimation } from "@/lib/component-utils";
import { ecommerceEvents } from '../../../lib/gtm-events';
import { TranslationType } from '../../../translations/types';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  size: string;
}

interface ProductCardProps {
  product: Product;
  index: number;
  isVisible: boolean;
  addingToCart: string | null;
  addedToCart: string | null;
  quantities: {[key: string]: number};
  cartQuantity: number;
  t: TranslationType;
  onAddToCart: (product: Product) => void;
  onUpdateQuantity: (productId: string, delta: number) => void;
}

const QuantityControl = ({
  productId,
  quantity,
  onUpdate,
  productName
}: {
  productId: string;
  quantity: number;
  onUpdate: (productId: string, delta: number) => void;
  productName: string;
}) => (
  <div className="flex items-center justify-center space-x-3">
    <button
      onClick={() => onUpdate(productId, -1)}
      className={`w-8 h-8 ${COLORS.surface.light} hover:bg-gray-200 dark:hover:bg-gray-600 focus:bg-gray-200 dark:focus:bg-gray-600 rounded-full flex items-center justify-center ${TRANSITIONS.default} focus:outline-none focus:ring-2 focus:ring-[#FF3131] dark:focus:ring-[#FF5050] focus:ring-offset-2`}
      aria-label={`Decrease quantity for ${productName}`}
      disabled={quantity === 1}
    >
      <Minus className={`w-4 h-4 ${COLORS.text.tertiary}`} />
    </button>
    <span
      className={`text-lg font-semibold min-w-[2rem] text-center ${COLORS.text.primary}`}
      aria-live="polite"
      aria-label={`Current quantity: ${quantity}`}
    >
      {quantity}
    </span>
    <button
      onClick={() => onUpdate(productId, 1)}
      className={`w-8 h-8 ${COLORS.surface.light} hover:bg-gray-200 dark:hover:bg-gray-600 focus:bg-gray-200 dark:focus:bg-gray-600 rounded-full flex items-center justify-center ${TRANSITIONS.default} focus:outline-none focus:ring-2 focus:ring-[#FF3131] dark:focus:ring-[#FF5050] focus:ring-offset-2`}
      aria-label={`Increase quantity for ${productName}`}
    >
      <Plus className={`w-4 h-4 ${COLORS.text.tertiary}`} />
    </button>
  </div>
);

const CartBadge = ({ quantity }: { quantity: number }) => (
  <span
    className="text-sm text-green-600 dark:text-green-400 font-medium bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded-full"
    aria-live="polite"
  >
    {quantity} in cart
  </span>
);

export const ProductCard = ({
  product,
  index,
  isVisible,
  addingToCart,
  addedToCart,
  quantities,
  cartQuantity,
  t,
  onAddToCart,
  onUpdateQuantity
}: ProductCardProps) => {
  const currentQuantity = quantities[product.id] || 1;
  const isAdding = addingToCart === product.id;
  const isAdded = addedToCart === product.id;
  const staggerStyle = createStaggeredAnimation(index);

  const cardClasses = `bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-xl border ${COLORS.border.accent} ${TRANSITIONS.slow} hover:shadow-[0_20px_50px_rgba(224,239,199,0.5)] hover:-translate-y-2 group relative z-10`;

  return (
    <div
      className={cardClasses}
      style={{
        ...staggerStyle,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        opacity: isVisible ? 1 : 0
      }}
    >
      {/* Popular badge */}
      {index === 1 && (
        <div className="absolute -top-4 left-0 right-0 mx-auto w-max px-4 py-1 bg-[#FF3131] text-white dark:text-gray-100 font-bold text-sm rounded-full shadow-lg z-30">
          {t.productsSection?.mostPopular || "MOST POPULAR"}
        </div>
      )}

      <div className="relative">
        <div className="relative bg-gradient-to-br from-[#FFFFF5] to-[#F8F9FA] dark:from-gray-800 dark:to-gray-700 rounded-t-2xl overflow-hidden group-hover:shadow-2xl transition-all duration-500">
          <div className="relative h-60 sm:h-72 overflow-hidden">
            {/* Background overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#FF3131]/3 to-[#FF3131]/8 z-10"></div>

            {/* Product image */}
            <div className="relative h-full flex items-center justify-center p-4 sm:p-8 z-20">
              <div className="relative max-w-[140px] sm:max-w-[180px] max-h-[140px] sm:max-h-[180px] mx-auto">
                <Image
                  src={product.image}
                  alt={`${product.name} activated carbon cat litter additive package showing ${product.size} size for odor elimination`}
                  width={180}
                  height={180}
                  className="w-full h-full mx-auto transition-transform duration-700 group-hover:scale-110 object-contain"
                  loading="lazy"
                  fetchPriority="auto"
                  priority={index === 0}
                  style={{
                    aspectRatio: '1/1',
                    width: '100%',
                    height: 'auto'
                  }}
                  sizes="(max-width: 640px) 140px, (max-width: 1024px) 160px, 180px"
                />
              </div>
            </div>

            {/* Description overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 sm:p-4 z-20">
              <p className="text-white dark:text-gray-100 font-bold text-xs sm:text-sm drop-shadow-lg line-clamp-2">
                {t.products[product.id]?.description.split('\n')[0]}
              </p>
            </div>
          </div>

          {/* Size badge */}
          <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-gradient-to-r from-[#FF3131] to-[#FF3131]/90 px-3 sm:px-5 py-1.5 sm:py-2 rounded-full shadow-lg transform rotate-2 group-hover:rotate-0 transition-transform duration-300 z-30">
            <span className="text-white dark:text-gray-100 font-bold text-sm sm:text-lg drop-shadow-md">{product.size}</span>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6 lg:p-8">
        <div className="mb-4 sm:mb-6">
          <h3 className={`font-bold text-xl sm:text-2xl mb-2 sm:mb-3 ${GRADIENTS.text.purple} leading-tight`}>
            {t.products[product.id]?.name || product.name}
          </h3>

          {/* Feature bullets */}
          <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
            {(t.products[product.id]?.description || product.description).split('\n').map((line: string, i: number) => (
              <div key={i} className="flex items-start">
                {i > 0 && <div className="text-[#FF3131] mr-2 mt-1 flex-shrink-0">•</div>}
                <p className={`${COLORS.text.tertiary} ${i === 0 ? 'font-medium text-base sm:text-lg' : 'text-sm sm:text-base'} leading-tight`}>
                  {line}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className={`space-y-3 pt-3 sm:pt-4 border-t ${COLORS.border.default}`}>
          <div className="flex justify-between items-center">
            <span className={`text-xl sm:text-2xl font-bold ${GRADIENTS.text.primary}`}>
              ${product.price.toFixed(2)}
            </span>
            {cartQuantity > 0 && <CartBadge quantity={cartQuantity} />}
          </div>

          {product.id === "purrify-12g" ? (
            <a
              href="https://buy.stripe.com/5kQ3cw7uEeak1LkcbT5gc04"
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full inline-flex items-center justify-center ${createButtonClasses('primary')} text-lg`}
            >
              {t.productsSection?.buyNow || "Buy Now"}
            </a>
          ) : (
            <div className="space-y-2">
              <QuantityControl
                productId={product.id}
                quantity={currentQuantity}
                onUpdate={onUpdateQuantity}
                productName={product.name}
              />

              <Button
                className={`w-full font-bold shadow-lg hover:shadow-xl ${TRANSITIONS.default} border-0 ${
                  isAdded
                    ? 'bg-green-600 hover:bg-green-700 text-white dark:text-white dark:text-gray-100'
                    : createButtonClasses('primary')
                }`}
                onClick={() => onAddToCart(product)}
                disabled={isAdding || isAdded}
              >
                {isAdding ? (
                  <div className="flex items-center">
                    <LoadingSpinner />
                    <span className="ml-2">{t.productsSection?.adding || "Adding..."}</span>
                  </div>
                ) : isAdded ? (
                  <div className="flex items-center">
                    <CheckIcon />
                    <span className="ml-2">Added to Cart!</span>
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
  );
};