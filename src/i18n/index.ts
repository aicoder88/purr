// next-intl i18n configuration for App Router

export { routing, locales, defaultLocale } from './routing';
export { locales as availableLocales, defaultLocale as fallbackLocale } from './config';
export type { Locale } from './config';
export { isValidLocale, getLocaleFromPathname } from './config';

// Re-export routing helpers from next-intl
export { createNavigation } from 'next-intl/navigation';

// Lazy loading exports
export type { TranslationNamespace, NamespaceTranslationType } from './namespaces';
export { 
  getNamespacesForPathname, 
  ROUTE_NAMESPACE_MAP,
  CRITICAL_NAMESPACES,
  LAZY_NAMESPACES,
  getAllNamespaces 
} from './namespaces';
export type { TranslationModule, LoadingState } from './lazy-loader';
export {
  loadNamespace,
  loadNamespaces,
  prefetchNamespace,
  preloadCriticalNamespaces,
  isNamespaceCached,
  getNamespaceLoadState,
  getCacheStats,
  clearNamespaceCache,
  estimateMemoryUsage,
} from './lazy-loader';
export {
  loadNamespaceServer,
  loadNamespacesServer,
  loadCriticalNamespaces,
  mergeNamespaceModules,
  getServerCacheStats,
  clearServerCache,
} from './server-loader';
