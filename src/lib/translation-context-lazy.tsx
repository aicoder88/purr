/**
 * Lazy Translation Context
 * 
 * Provides dynamic, namespace-based translation loading with:
 * - Route-based code splitting
 * - On-demand namespace loading
 * - Prefetching for upcoming routes
 * - Fallback to full translations during migration
 */

'use client';

import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
  useMemo,
  useCallback,
  useRef,
} from 'react';
import { usePathname } from 'next/navigation';
import type { TranslationType } from '@/translations/types';
import type { Locale } from '@/i18n/config';
import type { TranslationNamespace } from '@/i18n/namespaces';
import {
  loadNamespaces,
  prefetchNamespace,
  getCacheStats,
  type TranslationModule,
} from '@/i18n/lazy-loader';
import { getNamespacesForPathname } from '@/i18n/namespaces';
import { translations as fullTranslations } from '@/translations';

// Loading state type
export type TranslationLoadingState =
  | { status: 'loading'; loaded: string[]; pending: string[] }
  | { status: 'loaded'; loaded: string[] }
  | { status: 'error'; error: Error; loaded: string[] };

// Context type
interface LazyTranslationContextType {
  t: TranslationType;
  locale: Locale;
  loadingState: TranslationLoadingState;

  // Actions
  loadNamespace: (namespace: TranslationNamespace) => Promise<void>;
  loadNamespaces: (namespaces: TranslationNamespace[]) => Promise<void>;
  prefetchNamespace: (namespace: TranslationNamespace) => void;

  // Debug
  getCacheStats: () => { cached: number; pending: number; totalSize: number };
}

const LazyTranslationContext = createContext<LazyTranslationContextType | null>(null);

// Props for the provider
interface LazyTranslationProviderProps {
  children: ReactNode;
  locale: Locale;

  // Initial namespaces to load immediately (critical path)
  initialNamespaces?: TranslationNamespace[];

  // Enable lazy loading (false = use full translations, for migration period)
  enableLazyLoading?: boolean;
}

// Deep merge utility for combining namespace translations
function deepMerge(
  target: Record<string, unknown>,
  source: Record<string, unknown>
): Record<string, unknown> {
  const result = { ...target };

  for (const key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      result[key] = deepMerge(
        (result[key] as Record<string, unknown>) || {},
        source[key] as Record<string, unknown>
      );
    } else {
      result[key] = source[key];
    }
  }

  return result;
}

export function LazyTranslationProvider({
  children,
  locale,
  initialNamespaces = ['common'],
  enableLazyLoading = true,
}: LazyTranslationProviderProps) {
  const pathname = usePathname();

  // Get full translations as base (for fallback during migration)
  const baseTranslations = useMemo(() => {
    return fullTranslations[locale] || fullTranslations.en;
  }, [locale]);

  // State for loaded namespace modules
  const [loadedModules, setLoadedModules] = useState<Record<string, TranslationModule>>({});
  const [loadingState, setLoadingState] = useState<TranslationLoadingState>({
    status: 'loading',
    loaded: [],
    pending: initialNamespaces,
  });

  // Track mounted state to prevent state updates after unmount
  const isMountedRef = useRef(true);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // Load namespaces function
  const loadNamespacesFn = useCallback(async (
    namespaces: TranslationNamespace[]
  ): Promise<void> => {
    if (!enableLazyLoading) {
      return;
    }

    // Filter out already loaded namespaces
    const newNamespaces = namespaces.filter(
      (ns) => !loadedModules[ns]
    );

    if (newNamespaces.length === 0) {
      return;
    }

    // Update loading state
    setLoadingState({
      status: 'loading',
      loaded: Object.keys(loadedModules),
      pending: newNamespaces,
    });

    try {
      const modules = await loadNamespaces(locale, newNamespaces);

      if (!isMountedRef.current) return;

      setLoadedModules((prev) => ({
        ...prev,
        ...modules,
      }));

      setLoadingState({
        status: 'loaded',
        loaded: [...Object.keys(loadedModules), ...newNamespaces],
      });
    } catch (error) {
      if (!isMountedRef.current) return;

      console.error('[LazyTranslation] Failed to load namespaces:', error);
      setLoadingState({
        status: 'error',
        error: error instanceof Error ? error : new Error(String(error)),
        loaded: Object.keys(loadedModules),
      });
    }
  }, [locale, loadedModules, enableLazyLoading]);

  // Load single namespace
  const loadNamespaceFn = useCallback(async (
    namespace: TranslationNamespace
  ): Promise<void> => {
    await loadNamespacesFn([namespace]);
  }, [loadNamespacesFn]);

  // Prefetch namespace
  const prefetchNamespaceFn = useCallback((namespace: TranslationNamespace): void => {
    if (!enableLazyLoading) return;
    prefetchNamespace(locale, namespace);
  }, [locale, enableLazyLoading]);

  // Auto-load namespaces based on current route
  useEffect(() => {
    if (!enableLazyLoading || !pathname) return;

    const routeNamespaces = getNamespacesForPathname(pathname);

    // Always include common
    const namespacesToLoad: TranslationNamespace[] = [
      'common',
      ...routeNamespaces.filter((ns): ns is TranslationNamespace => ns !== 'common'),
    ];

    loadNamespacesFn(namespacesToLoad);
  }, [pathname, locale, loadNamespacesFn, enableLazyLoading]);

  // Merge all loaded modules into final translation object
  const translations = useMemo((): TranslationType => {
    if (!enableLazyLoading) {
      return baseTranslations;
    }

    let result: Record<string, unknown> = {};

    // Merge loaded namespace modules
    for (const mod of Object.values(loadedModules)) {
      result = deepMerge(result, mod as Record<string, unknown>);
    }

    // Merge with base translations for any missing keys (migration fallback)
    const merged = deepMerge(
      baseTranslations as unknown as Record<string, unknown>,
      result
    );

    return merged as unknown as TranslationType;
  }, [baseTranslations, loadedModules, enableLazyLoading]);

  // Get cache stats
  const getCacheStatsFn = useCallback(() => {
    return getCacheStats();
  }, []);

  // Context value
  const contextValue = useMemo((): LazyTranslationContextType => ({
    t: translations,
    locale,
    loadingState,
    loadNamespace: loadNamespaceFn,
    loadNamespaces: loadNamespacesFn,
    prefetchNamespace: prefetchNamespaceFn,
    getCacheStats: getCacheStatsFn,
  }), [
    translations,
    locale,
    loadingState,
    loadNamespaceFn,
    loadNamespacesFn,
    prefetchNamespaceFn,
    getCacheStatsFn,
  ]);

  return (
    <LazyTranslationContext.Provider value={contextValue}>
      {children}
    </LazyTranslationContext.Provider>
  );
}

// Hook to use lazy translations
export function useLazyTranslation(): LazyTranslationContextType {
  const context = useContext(LazyTranslationContext);

  if (!context) {
    throw new Error('useLazyTranslation must be used within LazyTranslationProvider');
  }

  return context;
}

// Hook to check if specific namespace is loaded
export function useNamespaceLoaded(namespace: TranslationNamespace): boolean {
  const context = useContext(LazyTranslationContext);

  if (!context) {
    return false;
  }

  return context.loadingState.status === 'loaded' ||
    (context.loadingState.status === 'loading' &&
      context.loadingState.loaded.includes(namespace));
}

// Hook for translations with automatic namespace loading
export function useTranslationWithNamespace(
  namespaces: TranslationNamespace | TranslationNamespace[]
) {
  const context = useContext(LazyTranslationContext);

  if (!context) {
    throw new Error('useTranslationWithNamespace must be used within LazyTranslationProvider');
  }

  // Create a stable key for the namespaces to avoid complex dependency expressions
  const nsKey = Array.isArray(namespaces) ? namespaces.sort().join(',') : namespaces;

  // Memoize the array to provide a stable dependency for useEffect
  const nsArray = useMemo(() => {
    return Array.isArray(namespaces) ? namespaces : [namespaces];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nsKey]);

  useEffect(() => {
    context.loadNamespaces(nsArray);
  }, [nsArray, context]);

  return context;
}

// Hook to prefetch translations for a route (call on hover/link prefetch)
export function usePrefetchTranslation() {
  const context = useContext(LazyTranslationContext);

  return useCallback((pathname: string) => {
    if (!context) return;

    const namespaces = getNamespacesForPathname(pathname);
    namespaces.forEach((ns) => context.prefetchNamespace(ns));
  }, [context]);
}
