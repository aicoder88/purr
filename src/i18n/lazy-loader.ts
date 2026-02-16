/**
 * Lazy Translation Loader
 * 
 * Dynamically loads translation namespaces on-demand.
 * Each namespace is loaded as a separate chunk to enable code splitting.
 */

import type { TranslationNamespace } from './namespaces';
import type { TranslationType } from '@/translations/types';
import type { Locale } from './config';

// Type for a translation module
export type TranslationModule = Partial<TranslationType>;

// Cache for loaded namespaces
const namespaceCache: Map<string, TranslationModule> = new Map();

// Track ongoing loads to prevent duplicate requests
const pendingLoads: Map<string, Promise<TranslationModule>> = new Map();

// Loading states for monitoring
export type LoadingState = 'idle' | 'loading' | 'loaded' | 'error';

interface NamespaceLoadState {
  state: LoadingState;
  error?: Error;
  loadedAt?: number;
}

const loadStates: Map<string, NamespaceLoadState> = new Map();

// Create cache key
function getCacheKey(locale: Locale, namespace: TranslationNamespace): string {
  return `${locale}:${namespace}`;
}

// Get load state for a namespace
export function getNamespaceLoadState(
  locale: Locale,
  namespace: TranslationNamespace
): LoadingState {
  return loadStates.get(getCacheKey(locale, namespace))?.state ?? 'idle';
}

// Check if namespace is cached
export function isNamespaceCached(
  locale: Locale,
  namespace: TranslationNamespace
): boolean {
  return namespaceCache.has(getCacheKey(locale, namespace));
}

// Prefetch a namespace (load it in background without blocking)
export function prefetchNamespace(
  locale: Locale,
  namespace: TranslationNamespace
): void {
  const cacheKey = getCacheKey(locale, namespace);

  // Skip if already cached or loading
  if (namespaceCache.has(cacheKey) || pendingLoads.has(cacheKey)) {
    return;
  }

  // Load in background
  loadNamespace(locale, namespace).catch(() => {
    // Silently fail on prefetch errors
  });
}

// Dynamically load a namespace
export async function loadNamespace(
  locale: Locale,
  namespace: TranslationNamespace
): Promise<TranslationModule> {
  const cacheKey = getCacheKey(locale, namespace);

  // Return from cache if available
  const cached = namespaceCache.get(cacheKey);
  if (cached) {
    return cached;
  }

  // Return pending promise if already loading
  const pending = pendingLoads.get(cacheKey);
  if (pending) {
    return pending;
  }

  // Mark as loading
  loadStates.set(cacheKey, { state: 'loading' });

  // Create load promise
  const loadPromise = importNamespace(locale, namespace);
  pendingLoads.set(cacheKey, loadPromise);

  try {
    const loadedModule = await loadPromise;

    // Cache the result
    namespaceCache.set(cacheKey, loadedModule);
    loadStates.set(cacheKey, {
      state: 'loaded',
      loadedAt: Date.now()
    });

    return loadedModule;
  } catch (error) {
    loadStates.set(cacheKey, {
      state: 'error',
      error: error instanceof Error ? error : new Error(String(error))
    });
    throw error;
  } finally {
    pendingLoads.delete(cacheKey);
  }
}

// Load multiple namespaces in parallel
export async function loadNamespaces(
  locale: Locale,
  namespaces: TranslationNamespace[]
): Promise<Record<TranslationNamespace, TranslationModule>> {
  const results = await Promise.allSettled(
    namespaces.map(async (ns) => ({
      namespace: ns,
      module: await loadNamespace(locale, ns),
    }))
  );

  const modules = {} as Record<TranslationNamespace, TranslationModule>;

  for (const result of results) {
    if (result.status === 'fulfilled') {
      modules[result.value.namespace] = result.value.module;
    } else {
      console.error('[i18n] Failed to load namespace:', result.reason);
    }
  }

  return modules;
}

// Import a namespace module dynamically
async function importNamespace(
  locale: Locale,
  namespace: TranslationNamespace
): Promise<TranslationModule> {
  try {
    // Dynamic import based on locale and namespace
    // This creates separate chunks for each namespace
    const importedModule = await import(
      /* webpackChunkName: "i18n-[locale]-[namespace]" */
      /* webpackMode: "lazy" */
      `@/translations/namespaces/${locale}/${namespace}.json`
    );

    return importedModule.default ?? importedModule;
  } catch (error) {
    console.error(`[i18n] Failed to load namespace "${namespace}" for locale "${locale}":`, error);

    // Fallback: try to load from the main translation file
    // This ensures we don't break if a namespace file is missing
    try {
      const fallbackModule = await import(
        /* webpackChunkName: "i18n-[locale]-fallback" */
        `@/translations/${locale}`
      );

      const translations = fallbackModule[locale] ?? fallbackModule.default ?? fallbackModule;

      // Extract only the keys relevant to this namespace
      return extractNamespaceKeys(translations, namespace);
    } catch (fallbackError) {
      throw new Error(
        `Failed to load namespace "${namespace}" for locale "${locale}" and fallback failed: ${fallbackError}`
      );
    }
  }
}

// Extract namespace-specific keys from full translation object
function extractNamespaceKeys(
  translations: TranslationType,
  namespace: TranslationNamespace
): TranslationModule {
  // Import the namespace key map
  const { NAMESPACE_KEY_MAP } = require('./namespaces');

  const keys: (keyof TranslationType)[] = NAMESPACE_KEY_MAP[namespace] ?? [];
  const result: TranslationModule = {};

  for (const key of keys) {
    if (key in translations) {
      result[key] = translations[key] as never;
    }
  }

  return result;
}

// Preload critical namespaces (called during app initialization)
export async function preloadCriticalNamespaces(locale: Locale): Promise<void> {
  const { CRITICAL_NAMESPACES } = await import('./namespaces');
  await Promise.all(
    CRITICAL_NAMESPACES.map((ns) => loadNamespace(locale, ns))
  );
}

// Get cache stats for debugging
export function getCacheStats(): {
  cached: number;
  pending: number;
  totalSize: number;
} {
  let totalSize = 0;
  for (const mod of namespaceCache.values()) {
    totalSize += JSON.stringify(mod).length;
  }

  return {
    cached: namespaceCache.size,
    pending: pendingLoads.size,
    totalSize,
  };
}

// Clear cache (useful for memory management in long-running sessions)
export function clearNamespaceCache(): void {
  namespaceCache.clear();
  pendingLoads.clear();
  loadStates.clear();
}

// Estimate memory usage
export function estimateMemoryUsage(): string {
  const stats = getCacheStats();
  const sizeInKB = (stats.totalSize / 1024).toFixed(2);
  return `${stats.cached} namespaces cached (~${sizeInKB} KB)`;
}
