/**
 * Server-side Translation Loader
 * 
 * Utilities for loading translations in Server Components.
 * This enables route-based code splitting on the server.
 */

import { readFile } from 'fs/promises';
import { join } from 'path';
import type { TranslationNamespace } from './namespaces';
import type { TranslationModule } from './lazy-loader';
import type { Locale } from './config';

// Cache for server-side namespace loading
const serverCache = new Map<string, TranslationModule>();

/**
 * Load a namespace on the server
 * This reads directly from the JSON files
 */
export async function loadNamespaceServer(
  locale: Locale,
  namespace: TranslationNamespace
): Promise<TranslationModule> {
  const cacheKey = `${locale}:${namespace}`;
  
  // Check cache
  const cached = serverCache.get(cacheKey);
  if (cached) {
    return cached;
  }
  
  try {
    const filePath = join(
      process.cwd(),
      'src',
      'translations',
      'namespaces',
      locale,
      `${namespace}.json`
    );
    
    const content = await readFile(filePath, 'utf-8');
    const data = JSON.parse(content) as TranslationModule;
    
    // Cache for reuse
    serverCache.set(cacheKey, data);
    
    return data;
  } catch (error) {
    console.error(
      `[i18n:server] Failed to load namespace "${namespace}" for locale "${locale}":`,
      error
    );
    
    // Return empty object on error (graceful degradation)
    return {};
  }
}

/**
 * Load multiple namespaces on the server
 */
export async function loadNamespacesServer(
  locale: Locale,
  namespaces: TranslationNamespace[]
): Promise<Record<TranslationNamespace, TranslationModule>> {
  const results = await Promise.all(
    namespaces.map(async (ns) => ({
      namespace: ns,
      module: await loadNamespaceServer(locale, ns),
    }))
  );
  
  const modules = {} as Record<TranslationNamespace, TranslationModule>;
  
  for (const result of results) {
    modules[result.namespace] = result.module;
  }
  
  return modules;
}

/**
 * Load critical namespaces for initial render
 * This should be called in the root layout
 */
export async function loadCriticalNamespaces(
  locale: Locale
): Promise<TranslationModule> {
  return loadNamespaceServer(locale, 'common');
}

/**
 * Get server cache stats (for debugging)
 */
export function getServerCacheStats(): {
  size: number;
  keys: string[];
} {
  return {
    size: serverCache.size,
    keys: Array.from(serverCache.keys()),
  };
}

/**
 * Clear server cache (useful for HMR in development)
 */
export function clearServerCache(): void {
  serverCache.clear();
}

// Type for the full translation shape (used for merging)
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Merge multiple namespace modules into a single translation object
 * Used for passing to the client provider
 */
export function mergeNamespaceModules(
  modules: TranslationModule[]
): TranslationModule {
  return modules.reduce((acc, module) => deepMerge(acc, module), {});
}

/**
 * Deep merge two objects
 */
function deepMerge<T extends Record<string, unknown>>(
  target: T,
  source: DeepPartial<T>
): T {
  const result = { ...target };
  
  for (const key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      result[key] = deepMerge(
        (result[key] as Record<string, unknown>) || {},
        source[key] as Record<string, unknown>
      ) as T[Extract<keyof T, string>];
    } else if (source[key] !== undefined) {
      result[key] = source[key] as T[Extract<keyof T, string>];
    }
  }
  
  return result;
}
