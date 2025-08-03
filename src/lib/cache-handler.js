/**
 * Advanced Cache Handler for Purrify
 * Implements intelligent caching strategies with Redis fallback and memory optimization
 */

const { IncrementalCache } = require('next/dist/server/lib/incremental-cache');

class PurrifyIncrementalCacheHandler extends IncrementalCache {
  constructor(options) {
    super(options);
    this.memoryCache = new Map();
    this.maxMemorySize = 52428800; // 50MB
    this.currentMemorySize = 0;
    this.hitCount = 0;
    this.missCount = 0;
    this.lastCleanup = Date.now();
    this.cleanupInterval = 5 * 60 * 1000; // 5 minutes
  }

  // Enhanced get method with memory optimization
  async get(key, ctx = {}) {
    // Check memory cache first
    const memoryResult = this.getFromMemory(key);
    if (memoryResult) {
      this.hitCount++;
      return memoryResult;
    }

    // Fallback to default cache
    const result = await super.get(key, ctx);
    
    if (result) {
      this.hitCount++;
      // Store in memory cache if not too large
      this.setInMemory(key, result);
    } else {
      this.missCount++;
    }

    // Periodic cleanup
    this.performPeriodicCleanup();

    return result;
  }

  // Enhanced set method with intelligent storage
  async set(key, data, ctx = {}) {
    // Set in memory cache
    this.setInMemory(key, data);
    
    // Set in default cache
    return super.set(key, data, ctx);
  }

  // Memory cache operations
  getFromMemory(key) {
    const cached = this.memoryCache.get(key);
    if (!cached) return null;

    // Check expiration
    if (cached.expires && Date.now() > cached.expires) {
      this.memoryCache.delete(key);
      this.currentMemorySize -= cached.size;
      return null;
    }

    // Update access time for LRU
    cached.lastAccess = Date.now();
    return cached.data;
  }

  setInMemory(key, data) {
    const serialized = JSON.stringify(data);
    const size = Buffer.byteLength(serialized, 'utf8');
    
    // Don't cache if too large
    if (size > this.maxMemorySize * 0.1) return;

    // Ensure we have space
    this.ensureMemorySpace(size);

    const cacheEntry = {
      data,
      size,
      lastAccess: Date.now(),
      expires: this.calculateExpiration(key),
      created: Date.now()
    };

    this.memoryCache.set(key, cacheEntry);
    this.currentMemorySize += size;
  }

  // Intelligent expiration based on content type
  calculateExpiration(key) {
    const now = Date.now();
    
    // Static assets - 1 hour
    if (key.includes('/_next/static/') || key.includes('.css') || key.includes('.js')) {
      return now + (60 * 60 * 1000);
    }
    
    // API routes - 5 minutes
    if (key.includes('/api/')) {
      return now + (5 * 60 * 1000);
    }
    
    // Pages - 15 minutes
    if (key.includes('/pages/') || key.includes('html')) {
      return now + (15 * 60 * 1000);
    }
    
    // Images - 30 minutes
    if (key.includes('.jpg') || key.includes('.png') || key.includes('.webp')) {
      return now + (30 * 60 * 1000);
    }
    
    // Default - 10 minutes
    return now + (10 * 60 * 1000);
  }

  // Memory management
  ensureMemorySpace(requiredSize) {
    while (this.currentMemorySize + requiredSize > this.maxMemorySize) {
      this.evictLeastRecentlyUsed();
    }
  }

  evictLeastRecentlyUsed() {
    let oldestKey = null;
    let oldestTime = Date.now();

    for (const [key, entry] of this.memoryCache.entries()) {
      if (entry.lastAccess < oldestTime) {
        oldestTime = entry.lastAccess;
        oldestKey = key;
      }
    }

    if (oldestKey) {
      const entry = this.memoryCache.get(oldestKey);
      this.memoryCache.delete(oldestKey);
      this.currentMemorySize -= entry.size;
    }
  }

  // Periodic cleanup of expired entries
  performPeriodicCleanup() {
    const now = Date.now();
    if (now - this.lastCleanup < this.cleanupInterval) return;

    const expiredKeys = [];
    for (const [key, entry] of this.memoryCache.entries()) {
      if (entry.expires && now > entry.expires) {
        expiredKeys.push(key);
      }
    }

    for (const key of expiredKeys) {
      const entry = this.memoryCache.get(key);
      this.memoryCache.delete(key);
      this.currentMemorySize -= entry.size;
    }

    this.lastCleanup = now;
  }

  // Cache statistics
  getStats() {
    const totalRequests = this.hitCount + this.missCount;
    const hitRate = totalRequests > 0 ? (this.hitCount / totalRequests) * 100 : 0;

    return {
      hitCount: this.hitCount,
      missCount: this.missCount,
      hitRate: hitRate.toFixed(2) + '%',
      memoryUsage: `${(this.currentMemorySize / 1024 / 1024).toFixed(2)}MB`,
      cacheSize: this.memoryCache.size,
      maxMemorySize: `${(this.maxMemorySize / 1024 / 1024).toFixed(2)}MB`
    };
  }

  // Enhanced revalidation with smart invalidation
  async revalidateTag(tag) {
    // Smart invalidation based on tag patterns
    const keysToInvalidate = [];
    
    for (const key of this.memoryCache.keys()) {
      if (this.shouldInvalidateForTag(key, tag)) {
        keysToInvalidate.push(key);
      }
    }

    // Remove from memory cache
    for (const key of keysToInvalidate) {
      const entry = this.memoryCache.get(key);
      if (entry) {
        this.memoryCache.delete(key);
        this.currentMemorySize -= entry.size;
      }
    }

    // Call parent revalidation
    return super.revalidateTag(tag);
  }

  shouldInvalidateForTag(key, tag) {
    // Product-related invalidation
    if (tag === 'products' && (key.includes('/products') || key.includes('/api/products'))) {
      return true;
    }
    
    // Testimonials invalidation
    if (tag === 'testimonials' && (key.includes('/testimonials') || key.includes('/api/testimonials'))) {
      return true;
    }
    
    // Blog invalidation
    if (tag === 'blog' && key.includes('/blog')) {
      return true;
    }
    
    return false;
  }
}

module.exports = PurrifyIncrementalCacheHandler;
