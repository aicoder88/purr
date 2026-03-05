'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Locale } from '@/i18n/config';
import { Button } from '@/components/ui/button';
import { PRODUCTS } from '@/lib/constants';
import { localizePath } from '@/lib/i18n/locale-path';
import type { RecommendProductToolInput } from '@/lib/chat/tools';
import { getAutoshipVariant } from '@/lib/chat/tools';

interface ProductCardProps {
  locale: Locale;
  recommendation: RecommendProductToolInput;
  shopNowLabel: string;
  tryAutoshipLabel: string;
  onProductClick?: (productId: string) => void;
}

function getProductPath(productId: string, locale: Locale): string {
  if (productId === 'purrify-12g') {
    return localizePath('/products/trial-size', locale);
  }

  return localizePath(`/products?select=${encodeURIComponent(productId)}`, locale);
}

export function ProductCard({
  locale,
  recommendation,
  shopNowLabel,
  tryAutoshipLabel,
  onProductClick,
}: ProductCardProps) {
  const product = PRODUCTS.find((item) => item.id === recommendation.product_id);
  if (!product) {
    return null;
  }

  const autoshipId = getAutoshipVariant(recommendation.product_id);
  const showAutoship = recommendation.suggest_autoship === true && autoshipId !== null;

  const productPath = getProductPath(recommendation.product_id, locale);
  const autoshipPath = autoshipId ? getProductPath(autoshipId, locale) : '';

  return (
    <div className="mt-3 rounded-xl border border-gray-200 bg-white p-3 shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <div className="flex gap-3">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="64px"
            className="object-contain p-1"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-gray-900 dark:text-gray-100">{product.name}</p>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">${product.price.toFixed(2)}</p>
          <p className="mt-1 text-xs text-gray-600 dark:text-gray-300">{recommendation.reason}</p>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <Button asChild size="sm" className="h-8">
          <Link
            href={productPath}
            onClick={() => onProductClick?.(recommendation.product_id)}
          >
            {shopNowLabel}
          </Link>
        </Button>

        {showAutoship ? (
          <Button asChild size="sm" variant="outline" className="h-8 border-gray-300 dark:border-gray-600">
            <Link
              href={autoshipPath}
              onClick={() => {
                if (autoshipId) {
                  onProductClick?.(autoshipId);
                }
              }}
            >
              {tryAutoshipLabel}
            </Link>
          </Button>
        ) : null}
      </div>
    </div>
  );
}
