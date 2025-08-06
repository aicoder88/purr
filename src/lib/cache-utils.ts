/**
 * Cache Utilities for Purrify
 * Advanced caching helpers and strategies
 */

// Define structured types for cached data
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  testimonial: string;
}

export interface CacheConfig {
  ttl: number;
  maxSize?: number;
  strategy: 'lru' | 'fifo' | 'lfu';
  compression?: boolean;
}

// Define interfaces for cache items
export interface CacheItem<T> {
  data: T;
  timestamp: number;
  expires: number;
  hits: number;
  size: number;
  compressed: boolean;
}

// Cache strategies for different content types
export const CACHE_STRATEGIES = {
  // Static assets - long cache
  static: {
    ttl: 31536000000, // 1 year
    strategy: 'lru' as const,
    compression: true
  },
  
  // API responses - medium cache
  api: {
    ttl: 300000, // 5 minutes
    strategy: 'lfu' as const,
    compression: true
  },
  
  // Product data - longer cache
  products: {
    ttl: 3600000, // 1 hour
    strategy: 'lru' as const,
    compression: true
  },
  
  // Testimonials - medium cache
  testimonials: {
    ttl: 1800000, // 30 minutes
    strategy: 'lru' as const,
    compression: false
  },
  
  // User preferences - persistent
  preferences: {
    ttl: 86400000, // 24 hours
    strategy: 'lru' as const,
    compression: false
  },
  
  // Images - long cache
  images: {
    ttl: 2592000000, // 30 days
    strategy: 'lru' as const,
    compression: false
  }
} as const;

// Advanced cache class with multiple strategies
export class AdvancedCache<T = unknown> {
  private cache = new Map<string, CacheItem<T>>();
  private accessOrder: string[] = [];
  private config: CacheConfig;
  private maxSize: number;

  constructor(config: CacheConfig, maxSize: number = 100) {
    this.config = config;
    this.maxSize = maxSize;
  }

  // Get item from cache
  get(key: string): T | null {
    const item = this.cache.get(key);
    if (!item) {
      return null;
    }
    
    // Check if expired
    if (Date.now() > item.expires) {
      this.cache.delete(key);
      return null;
    }
    
    // Update access patterns
    item.hits++;
    this.updateAccessOrder(key);
    
    // Return the cached data
    return item.data;
  }

  // Set item in cache
  set(key: string, data: T): boolean {
    try {
      // Ensure space
      this.ensureSpace();
      
      // Handle compression if needed
      let item: CacheItem<T>;
      
      if (this.config.compression) {
        const compressedData = this.compress(data);
        const size = this.calculateSize(compressedData);
        
        // Store the compressed data with proper typing
        item = {
          data: JSON.parse(compressedData) as T, // Parse back to ensure type safety
          timestamp: Date.now(),
          expires: Date.now() + this.config.ttl,
          hits: 0,
          size,
          compressed: true
        };
      } else {
        const size = this.calculateSize(data);
        
        item = {
          data,
          timestamp: Date.now(),
          expires: Date.now() + this.config.ttl,
          hits: 0,
          size,
          compressed: false
        };
      }
      
      this.cache.set(key, item);
      this.updateAccessOrder(key);
      return true;
    } catch (error) {
      console.warn('Cache set error:', error);
      return false;
    }
  }

  // Delete item from cache
  delete(key: string): boolean {
    const deleted = this.cache.delete(key);
    this.accessOrder = this.accessOrder.filter(k => k !== key);
    return deleted;
  }

  // Clear entire cache
  clear(): void {
    this.cache.clear();
    this.accessOrder = [];
  }

  // Get cache statistics
  getStats() {
    const items = Array.from(this.cache.values());
    const totalSize = items.reduce((sum, item) => sum + item.size, 0);
    const totalHits = items.reduce((sum, item) => sum + item.hits, 0);
    
    return {
      size: this.cache.size,
      totalSize,
      totalHits,
      strategy: this.config.strategy,
      ttl: this.config.ttl,
      compression: this.config.compression
    };
  }

  // Ensure cache doesn't exceed max size
  private ensureSpace(): void {
    while (this.cache.size >= this.maxSize) {
      this.evictItem();
    }
  }

  // Evict item based on strategy
  private evictItem(): void {
    let keyToEvict: string | null = null;
    
    switch (this.config.strategy) {
      case 'lru':
        keyToEvict = this.accessOrder[0] || null;
        break;
        
      case 'fifo':
        keyToEvict = this.getOldestKey();
        break;
        
      case 'lfu':
        keyToEvict = this.getLeastFrequentKey();
        break;
    }
    
    if (keyToEvict) {
      this.delete(keyToEvict);
    }
  }

  // Get oldest key by timestamp
  private getOldestKey(): string | null {
    let oldestKey: string | null = null;
    let oldestTime = Date.now();
    
    for (const [key, item] of this.cache.entries()) {
      if (item.timestamp < oldestTime) {
        oldestTime = item.timestamp;
        oldestKey = key;
      }
    }
    
    return oldestKey;
  }

  // Get least frequently used key
  private getLeastFrequentKey(): string | null {
    let leastUsedKey: string | null = null;
    let leastHits = Infinity;
    
    for (const [key, item] of this.cache.entries()) {
      if (item.hits < leastHits) {
        leastHits = item.hits;
        leastUsedKey = key;
      }
    }
    
    return leastUsedKey;
  }

  // Update access order for LRU
  private updateAccessOrder(key: string): void {
    this.accessOrder = this.accessOrder.filter(k => k !== key);
    this.accessOrder.push(key);
  }

  // Simple compression (JSON stringify for now)
  private compress(data: T): string {
    return JSON.stringify(data);
  }

  // Simple decompression
  private decompress(data: string): T {
    return JSON.parse(data) as T;
  }

  // Calculate approximate size
  private calculateSize(data: unknown): number {
    return new Blob([JSON.stringify(data)]).size;
  }
}

// Cache manager for different content types
export class CacheManager {
  private caches = new Map<string, AdvancedCache>();
  
  constructor() {
    // Initialize caches for different content types
    Object.entries(CACHE_STRATEGIES).forEach(([type, config]) => {
      this.caches.set(type, new AdvancedCache(config));
    });
  }

  // Get cache for specific type
  getCache(type: keyof typeof CACHE_STRATEGIES): AdvancedCache | null {
    return this.caches.get(type) || null;
  }

  // Convenience methods for common operations
  cacheProduct(id: string, product: Product): boolean {
    const cache = this.getCache('products');
    return cache ? cache.set(`product_${id}`, product) : false;
  }

  getProduct(id: string): Product | null {
    const cache = this.getCache('products');
    return cache ? cache.get(`product_${id}`) as Product | null : null;
  }

  cacheTestimonials(testimonials: Testimonial[]): boolean {
    const cache = this.getCache('testimonials');
    return cache ? cache.set('all_testimonials', testimonials) : false;
  }

  getTestimonials(): Testimonial[] | null {
    const cache = this.getCache('testimonials');
    return cache ? cache.get('all_testimonials') as Testimonial[] | null : null;
  }

  cacheApiResponse<T>(endpoint: string, data: T): boolean {
    const cache = this.getCache('api');
    return cache ? cache.set(`api_${endpoint}`, data) : false;
  }

  getApiResponse<T>(endpoint: string): T | null {
    const cache = this.getCache('api');
    return cache ? cache.get(`api_${endpoint}`) as T | null : null;
  }

  // Get overall statistics
  getAllStats() {
    const stats: Record<string, unknown> = {};
    
    for (const [type, cache] of this.caches.entries()) {
      stats[type] = cache.getStats();
    }
    
    return stats;
  }

  // Clear all caches
  clearAll(): void {
    for (const cache of this.caches.values()) {
      cache.clear();
    }
  }

  // Clear specific cache type
  clearType(type: keyof typeof CACHE_STRATEGIES): boolean {
    const cache = this.getCache(type);
    if (cache) {
      cache.clear();
      return true;
    }
    return false;
  }
}

// Global cache manager instance
export const globalCacheManager = new CacheManager();

// Cache decorators for functions
export function cached<T extends (...args: unknown[]) => unknown>(
  type: keyof typeof CACHE_STRATEGIES,
  keyGenerator?: (...args: Parameters<T>) => string
) {
  return function(target: unknown, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    
    descriptor.value = function(...args: Parameters<T>) {
      const cache = globalCacheManager.getCache(type);
      if (!cache) return originalMethod.apply(this, args);
      
      const key = keyGenerator ? keyGenerator(...args) : `${propertyKey}_${JSON.stringify(args)}`;
      
      // Try to get from cache
      const cached = cache.get(key);
      if (cached !== null) return cached;
      
      // Execute original method and cache result
      const result = originalMethod.apply(this, args);
      cache.set(key, result);
      
      return result;
    };
    
    return descriptor;
  };
}

// React hook for cache management
export function useCache(type: keyof typeof CACHE_STRATEGIES) {
  const cache = globalCacheManager.getCache(type);
  
  return {
    get: (key: string) => cache?.get(key) || null,
    set: <T>(key: string, data: T) => cache?.set(key, data) || false,
    delete: (key: string) => cache?.delete(key) || false,
    clear: () => cache?.clear(),
    stats: () => cache?.getStats()
  };
}
