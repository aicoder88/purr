/**
 * Cache Optimizer Component for Purrify
 * Implements client-side caching strategies and cache warming
 */

"use client";

import { useEffect, useCallback, useState } from "react";
import { gtmEvent } from "../../lib/gtm-events";

interface CacheOptimizerProps {
  enabled?: boolean;
  preloadRoutes?: string[];
  warmupDelay?: number;
  maxCacheSize?: number;
}

interface CacheEntry {
  data: any;
  timestamp: number;
  expires: number;
  size: number;
  hits: number;
}

interface CacheStats {
  totalSize: number;
  entryCount: number;
  hitRate: number;
  totalHits: number;
  totalMisses: number;
}

export const CacheOptimizer: React.FC<CacheOptimizerProps> = ({
  enabled = true,
  preloadRoutes = [],
  warmupDelay = 2000,
  maxCacheSize = 10 * 1024 * 1024, // 10MB
}) => {
  const [cacheStats, setCacheStats] = useState<CacheStats>({
    totalSize: 0,
    entryCount: 0,
    hitRate: 0,
    totalHits: 0,
    totalMisses: 0,
  });

  // Cache management
  const cache = useCallback(() => {
    if (typeof window === "undefined") return null;

    const CACHE_KEY = "purrify_cache";
    const STATS_KEY = "purrify_cache_stats";

    // Helper functions
    const updateStats = (type: "hit" | "miss"): void => {
      try {
        const stats = JSON.parse(
          localStorage.getItem(STATS_KEY) || '{"hits": 0, "misses": 0}',
        );
        stats[type === "hit" ? "hits" : "misses"]++;
        localStorage.setItem(STATS_KEY, JSON.stringify(stats));
      } catch (error) {
        console.warn("Stats update error:", error);
      }
    };

    const getCurrentCacheSize = (): number => {
      let totalSize = 0;
      const keys = Object.keys(localStorage);

      keys.forEach((key) => {
        if (key.startsWith(CACHE_KEY)) {
          try {
            const item = localStorage.getItem(key);
            if (item) {
              const entry = JSON.parse(item);
              totalSize += entry.size || 0;
            }
          } catch (error) {
            // Invalid entry, remove it
            localStorage.removeItem(key);
          }
        }
      });

      return totalSize;
    };

    const updateCacheStats = (): void => {
      const keys = Object.keys(localStorage);
      let totalSize = 0;
      let entryCount = 0;

      keys.forEach((key) => {
        if (key.startsWith(CACHE_KEY)) {
          try {
            const item = localStorage.getItem(key);
            if (item) {
              const entry = JSON.parse(item);
              totalSize += entry.size || 0;
              entryCount++;
            }
          } catch (error) {
            localStorage.removeItem(key);
          }
        }
      });

      const stats = JSON.parse(
        localStorage.getItem(STATS_KEY) || '{"hits": 0, "misses": 0}',
      );
      const totalRequests = stats.hits + stats.misses;
      const hitRate =
        totalRequests > 0 ? (stats.hits / totalRequests) * 100 : 0;

      setCacheStats({
        totalSize,
        entryCount,
        hitRate,
        totalHits: stats.hits,
        totalMisses: stats.misses,
      });
    };

    const evictLeastUsed = (): void => {
      const keys = Object.keys(localStorage);
      let leastUsedKey = "";
      let leastHits = Infinity;

      keys.forEach((key) => {
        if (key.startsWith(CACHE_KEY)) {
          try {
            const entry = JSON.parse(localStorage.getItem(key) || "{}");
            if (entry.hits < leastHits) {
              leastHits = entry.hits;
              leastUsedKey = key;
            }
          } catch (error) {
            // Invalid entry, remove it
            localStorage.removeItem(key);
          }
        }
      });

      if (leastUsedKey) {
        localStorage.removeItem(leastUsedKey);
      }
    };

    return {
      get: (key: string): any => {
        try {
          const cached = localStorage.getItem(`${CACHE_KEY}_${key}`);
          if (!cached) {
            updateStats("miss");
            return null;
          }

          const entry: CacheEntry = JSON.parse(cached);

          // Check expiration
          if (Date.now() > entry.expires) {
            localStorage.removeItem(`${CACHE_KEY}_${key}`);
            updateStats("miss");
            return null;
          }

          // Update hit count
          entry.hits++;
          localStorage.setItem(`${CACHE_KEY}_${key}`, JSON.stringify(entry));
          updateStats("hit");

          return entry.data;
        } catch (error) {
          console.warn("Cache get error:", error);
          return null;
        }
      },

      set: (key: string, data: any, ttl: number = 300000): boolean => {
        try {
          const serialized = JSON.stringify(data);
          const size = new Blob([serialized]).size;

          // Check if adding this would exceed max cache size
          if (getCurrentCacheSize() + size > maxCacheSize) {
            evictLeastUsed();
          }

          const entry: CacheEntry = {
            data,
            timestamp: Date.now(),
            expires: Date.now() + ttl,
            size,
            hits: 0,
          };

          localStorage.setItem(`${CACHE_KEY}_${key}`, JSON.stringify(entry));
          updateCacheStats();

          return true;
        } catch (error) {
          console.warn("Cache set error:", error);
          return false;
        }
      },

      delete: (key: string): void => {
        localStorage.removeItem(`${CACHE_KEY}_${key}`);
        updateCacheStats();
      },

      clear: (): void => {
        const keys = Object.keys(localStorage);
        keys.forEach((key) => {
          if (key.startsWith(CACHE_KEY)) {
            localStorage.removeItem(key);
          }
        });
        updateCacheStats();
      },

      evictLeastUsed: (): void => {
        const keys = Object.keys(localStorage);
        let leastUsedKey = "";
        let leastHits = Infinity;

        keys.forEach((key) => {
          if (key.startsWith(CACHE_KEY)) {
            try {
              const item = localStorage.getItem(key);
              if (item) {
                const entry = JSON.parse(item);
                if (entry.hits < leastHits) {
                  leastHits = entry.hits;
                  leastUsedKey = key;
                }
              }
            } catch (error) {
              // Invalid entry, remove it
              localStorage.removeItem(key);
            }
          }
        });

        if (leastUsedKey) {
          localStorage.removeItem(leastUsedKey);
        }
      },

      updateCacheStats: updateCacheStats,
      getCurrentCacheSize: getCurrentCacheSize,
    };
  }, [maxCacheSize]);

  // Preload critical resources
  const preloadResources = useCallback(async () => {
    if (!enabled || typeof window === "undefined") return;

    const cacheInstance = cache();
    if (!cacheInstance) return;

    // Preload critical routes
    const criticalRoutes = [
      "/api/products",
      "/api/testimonials",
      ...preloadRoutes,
    ];

    for (const route of criticalRoutes) {
      try {
        // Check if already cached
        const cached = cacheInstance.get(route);
        if (cached) continue;

        // Fetch and cache
        const response = await fetch(route);
        if (response.ok) {
          const data = await response.json();
          cacheInstance.set(route, data, 600000); // 10 minutes

          gtmEvent("cache_preload", {
            route,
            success: true,
            cache_size: cacheStats.totalSize,
          });
        }
      } catch (error) {
        console.warn(`Failed to preload ${route}:`, error);
        gtmEvent("cache_preload", {
          route,
          success: false,
          error:
            error instanceof Error ? error.message : "Unknown error occurred",
        });
      }
    }
  }, [enabled, preloadRoutes, cache, cacheStats.totalSize]);

  // Service Worker cache integration
  const setupServiceWorkerCache = useCallback(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator))
      return;

    navigator.serviceWorker.ready.then((registration) => {
      // Send cache configuration to service worker
      registration.active?.postMessage({
        type: "CACHE_CONFIG",
        config: {
          maxCacheSize,
          enabled,
          routes: preloadRoutes,
        },
      });
    });
  }, [enabled, maxCacheSize, preloadRoutes]);

  // Cache warming strategy
  const warmupCache = useCallback(() => {
    if (!enabled) return;

    setTimeout(() => {
      preloadResources();

      // Warm up critical images
      const criticalImages = [
        "/optimized/17g.webp",
        "/optimized/60g.webp",
        "/optimized/120g.webp",
        "/hero-cat.webp",
      ];

      criticalImages.forEach((src) => {
        const img = new Image();
        img.src = src;
      });

      gtmEvent("cache_warmup", {
        routes_preloaded: preloadRoutes.length,
        images_preloaded: criticalImages.length,
        cache_enabled: enabled,
      });
    }, warmupDelay);
  }, [enabled, warmupDelay, preloadResources, preloadRoutes.length]);

  // Cache performance monitoring
  const monitorCachePerformance = useCallback(() => {
    if (!enabled || typeof window === "undefined") return;

    const cacheInstance = cache();
    if (!cacheInstance) return;

    // Update stats periodically
    const interval = setInterval(() => {
      cacheInstance.updateCacheStats();

      // Report to GTM every 5 minutes
      if (cacheStats.totalHits + cacheStats.totalMisses > 0) {
        gtmEvent("cache_performance", {
          hit_rate: cacheStats.hitRate,
          total_size: cacheStats.totalSize,
          entry_count: cacheStats.entryCount,
          total_hits: cacheStats.totalHits,
          total_misses: cacheStats.totalMisses,
        });
      }
    }, 300000); // 5 minutes

    return () => clearInterval(interval);
  }, [enabled, cache, cacheStats]);

  // Initialize cache optimization
  useEffect(() => {
    if (!enabled) return;

    setupServiceWorkerCache();
    warmupCache();
    const cleanup = monitorCachePerformance();

    // Initial stats update
    const cacheInstance = cache();
    if (cacheInstance) {
      cacheInstance.updateCacheStats();
    }

    return cleanup;
  }, [
    enabled,
    setupServiceWorkerCache,
    warmupCache,
    monitorCachePerformance,
    cache,
  ]);

  // Cleanup expired entries on visibility change
  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        const cacheInstance = cache();
        if (cacheInstance) {
          // Clean up expired entries
          const keys = Object.keys(localStorage);
          keys.forEach((key) => {
            if (key.startsWith("purrify_cache_")) {
              try {
                const entry = JSON.parse(localStorage.getItem(key) || "{}");
                if (Date.now() > entry.expires) {
                  localStorage.removeItem(key);
                }
              } catch (error) {
                localStorage.removeItem(key);
              }
            }
          });
          cacheInstance.updateCacheStats();
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [enabled, cache]);

  // Development cache stats display
  if (process.env.NODE_ENV === "development" && enabled) {
    return (
      <div className="fixed bottom-4 right-4 bg-black/80 text-white p-2 rounded text-xs font-mono z-50">
        <div>Cache: {(cacheStats.totalSize / 1024).toFixed(1)}KB</div>
        <div>Entries: {cacheStats.entryCount}</div>
        <div>Hit Rate: {cacheStats.hitRate.toFixed(1)}%</div>
      </div>
    );
  }

  return null;
};

export default CacheOptimizer;
