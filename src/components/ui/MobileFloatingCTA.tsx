'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

/**
 * MobileFloatingCTA - A floating call-to-action button for mobile devices
 *
 * Displays a fixed-position button that links to the products page.
 * Automatically hides on:
 * - Desktop screens (md breakpoint and above)
 * - Product pages (they have their own add-to-cart)
 * - Checkout pages
 * - Cart pages
 */
export function MobileFloatingCTA() {
  const pathname = usePathname();
  const t = useTranslations();
  const locale = useLocale();
  const [isClient, setIsClient] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Determine if the CTA should be hidden based on current route
  const shouldHide = (): boolean => {
    const currentPath = pathname || "";

    // Pages where floating CTA should NOT appear
    const hiddenRoutes = [
      '/products',        // Product listing page (has its own CTAs)
      '/cart',            // Cart page
      '/checkout',        // Checkout flow
      '/admin',           // Admin pages
      '/invest',          // Investment page
      '/dn',              // Domain page
    ];

    // Check if current path starts with any hidden route
    const isHiddenRoute = hiddenRoutes.some(route =>
      currentPath === route || currentPath.startsWith(`${route}/`)
    );

    return isHiddenRoute;
  };

  // Don't render during SSR or on excluded pages
  if (!isClient || shouldHide()) {
    return null;
  }

  // Build the products link with locale prefix
  const productsLink = locale === 'en'
    ? '/products'
    : `/${locale}/products`;

  return (
    <Link
      href={productsLink}
      className="
        fixed bottom-20 right-4 z-40
        md:hidden
        flex items-center justify-center
        w-14 h-14 rounded-full
        bg-orange-500 hover:bg-orange-600
        dark:bg-orange-600 dark:hover:bg-orange-500
        text-white dark:text-gray-100
        shadow-lg hover:shadow-xl
        transition-all duration-200
        hover:scale-105
        focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2
        dark:focus:ring-orange-500 dark:focus:ring-offset-gray-900
      "
      aria-label={t('nav.buyNow') || 'Buy Now'}
    >
      <ShoppingBag className="w-6 h-6" aria-hidden="true" />
    </Link>
  );
}

export default MobileFloatingCTA;
