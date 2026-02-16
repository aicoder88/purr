/**
 * useTranslationNamespaces Hook
 * 
 * A declarative hook for components to specify which translation
 * namespaces they require. This enables:
 * - Automatic namespace loading
 * - Prefetching on component mount
 * - Error boundaries for missing translations
 */

'use client';

import { useEffect, useCallback, useMemo } from 'react';
import { useLazyTranslation, usePrefetchTranslation } from '@/lib/translation-context-lazy';
import type { TranslationNamespace } from '@/i18n/namespaces';

interface UseTranslationNamespacesOptions {
  /** Namespaces required by this component */
  namespaces: TranslationNamespace | TranslationNamespace[];

  /** Whether to load immediately on mount */
  loadImmediately?: boolean;

  /** Whether to prefetch related namespaces */
  prefetchRelated?: boolean;
}

interface UseTranslationNamespacesReturn {
  /** Whether all required namespaces are loaded */
  isLoaded: boolean;

  /** Loading status */
  status: 'idle' | 'loading' | 'loaded' | 'error';

  /** Manually trigger load (if not loading immediately) */
  load: () => Promise<void>;

  /** Prefetch additional namespaces */
  prefetch: (...namespaces: TranslationNamespace[]) => void;
}

/**
 * Hook to declare translation namespace dependencies
 * 
 * @example
 * ```tsx
 * // In a component
 * function ProductPage() {
 *   const { isLoaded } = useTranslationNamespaces({
 *     namespaces: ['products', 'common'],
 *     loadImmediately: true,
 *   });
 *   
 *   if (!isLoaded) return <Loading />;
 *   
 *   return <div>...</div>;
 * }
 * ```
 */
export function useTranslationNamespaces(
  options: UseTranslationNamespacesOptions
): UseTranslationNamespacesReturn {
  const { namespaces, loadImmediately = true, prefetchRelated = false } = options;

  // Create a stable key for namespaces array
  const nsKey = Array.isArray(namespaces) ? namespaces.sort().join(',') : namespaces;

  // Memoize the array to provide a stable dependency
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const nsArray = useMemo(() => Array.isArray(namespaces) ? namespaces : [namespaces], [nsKey]);

  const context = useLazyTranslation();
  // prefetch is available but not used directly in the effect, we use context.prefetchNamespace
  usePrefetchTranslation();

  // Load namespaces on mount if requested
  useEffect(() => {
    if (loadImmediately) {
      context.loadNamespaces(nsArray);
    }

    // Prefetch related namespaces for faster navigation
    if (prefetchRelated) {
      const relatedNamespaces = getRelatedNamespaces(nsArray);
      relatedNamespaces.forEach((ns) => context.prefetchNamespace(ns));
    }
  }, [loadImmediately, prefetchRelated, nsArray, context]);

  // Manual load function
  const load = useCallback(async () => {
    await context.loadNamespaces(nsArray);
  }, [context, nsArray]);

  // Prefetch function
  const prefetchFn = useCallback((...additionalNamespaces: TranslationNamespace[]) => {
    additionalNamespaces.forEach((ns) => context.prefetchNamespace(ns));
  }, [context]);

  // Check if all required namespaces are loaded
  const isLoaded = nsArray.every((ns) =>
    context.loadingState.status === 'loaded' ||
    (context.loadingState.status === 'loading' &&
      context.loadingState.loaded.includes(ns))
  );

  return {
    isLoaded,
    status: context.loadingState.status,
    load,
    prefetch: prefetchFn,
  };
}

/**
 * Get related namespaces that are commonly used together
 */
function getRelatedNamespaces(namespaces: TranslationNamespace[]): TranslationNamespace[] {
  const relatedMap: Record<TranslationNamespace, TranslationNamespace[]> = {
    common: ['home', 'products'],
    home: ['products', 'reviews'],
    products: ['product', 'checkout'],
    product: ['products', 'checkout'],
    learn: ['blog'],
    blog: ['common'],
    retailers: ['contact', 'checkout'],
    contact: ['retailers', 'checkout'],
    reviews: ['common', 'products'],
    affiliate: ['common', 'retailers'],
    referral: ['common', 'checkout'],
    locations: ['common', 'products'],
    checkout: ['products', 'common'],
    admin: ['common'],
    account: ['common'],
  };

  const related = new Set<TranslationNamespace>();

  for (const ns of namespaces) {
    const relatedNs = relatedMap[ns] || [];
    relatedNs.forEach((r) => related.add(r));
  }

  // Don't include already-loaded namespaces
  return Array.from(related).filter((ns) => !namespaces.includes(ns));
}

/**
 * Hook for page-level translation loading
 * Automatically loads namespaces based on the current route
 * 
 * Note: This hook uses window.location which is only available on the client.
 * For server components, use loadNamespacesServer from '@/i18n/server-loader'
 */
export function usePageTranslations(
  additionalNamespaces?: TranslationNamespace[]
): UseTranslationNamespacesReturn {
  // Get route-based namespaces (client-side only)
  const getRouteNamespaces = useCallback((): TranslationNamespace[] => {
    if (typeof window === 'undefined') {
      return ['common'];
    }

    const pathname = window.location.pathname;

    // Simple route matching
    if (pathname === '/') return ['home'];
    if (pathname.startsWith('/products')) return ['products'];
    if (pathname.startsWith('/learn') || pathname.startsWith('/science')) return ['learn'];
    if (pathname.startsWith('/blog')) return ['blog'];
    if (pathname.startsWith('/retailers') || pathname.startsWith('/b2b')) return ['retailers'];
    if (pathname.startsWith('/contact')) return ['contact'];
    if (pathname.startsWith('/reviews')) return ['reviews'];
    if (pathname.startsWith('/affiliate')) return ['affiliate'];
    if (pathname.startsWith('/refer')) return ['referral'];
    if (pathname.startsWith('/locations') || pathname.startsWith('/stores')) return ['locations'];
    if (pathname.startsWith('/thank-you') || pathname.startsWith('/checkout')) return ['checkout'];

    return ['common'];
  }, []);

  const routeNamespaces = getRouteNamespaces();
  const allNamespaces = additionalNamespaces
    ? [...new Set([...routeNamespaces, ...additionalNamespaces])]
    : routeNamespaces;

  return useTranslationNamespaces({
    namespaces: allNamespaces,
    loadImmediately: true,
    prefetchRelated: true,
  });
}
