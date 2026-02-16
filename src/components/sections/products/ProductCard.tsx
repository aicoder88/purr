import Image from 'next/image';
import { GRADIENTS, COLORS, TRANSITIONS, createButtonClasses } from "@/lib/theme-utils";
import { createStaggeredAnimation } from "@/lib/component-utils";
import { TranslationType } from '@/translations/types';
import { getPaymentLink } from '@/lib/payment-links';

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
  t: TranslationType;
}

export const ProductCard = ({
  product,
  index,
  isVisible,
  t
}: ProductCardProps) => {
  const staggerStyle = createStaggeredAnimation(index);

  // Map product IDs to payment link keys
  const getPaymentLinkKey = (productId: string): 'trialSingle' | 'familyAutoship' | 'jumboAutoship' => {
    if (productId === 'purrify-12g') return 'trialSingle';
    if (productId === 'purrify-120g') return 'familyAutoship';
    return 'jumboAutoship'; // purrify-240g
  };

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
      {/* Popular badge - High contrast for WCAG AA compliance */}
      {index === 1 && (
        <div className="absolute -top-4 left-0 right-0 mx-auto w-max px-4 py-1 bg-[#DC2626] text-white font-bold text-sm rounded-full shadow-lg z-30">
          {t.productsSection?.mostPopular || ""}
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

          {/* Size badge - High contrast for WCAG AA compliance */}
          <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-red-700 dark:bg-red-800 bg-gradient-to-r from-[#DC2626] to-[#B91C1C] dark:from-red-700 dark:to-red-800 px-3 sm:px-5 py-1.5 sm:py-2 rounded-full shadow-lg transform rotate-2 group-hover:rotate-0 transition-transform duration-300 z-30">
            <span className="text-white dark:text-white font-bold text-sm sm:text-lg drop-shadow-md bg-inherit">{product.size}</span>
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
          </div>

          <a
            href={getPaymentLink(getPaymentLinkKey(product.id)) || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full inline-flex items-center justify-center ${createButtonClasses('primary')} text-lg`}
          >
            {product.id === "purrify-12g"
              ? (t.productsSection?.buyNow || "")
              : (t.productsSection?.subscribeNow || "")}
          </a>
        </div>
      </div>
    </div>
  );
};