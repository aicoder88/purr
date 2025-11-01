/**
 * Minimal cache handler for Next.js
 * Implements basic in-memory caching with file system persistence
 */

interface CacheEntry<T = unknown> {
  value: T;
  lastModified: number;
  size: number;
  tags?: string[];
};

type FileSystem = {
  readFile: (path: string) => Promise<string | null>;
  writeFile: (path: string, data: string) => Promise<void>;
  unlink: (path: string) => Promise<void>;
  mkdirp: (path: string) => Promise<void>;
};

type CacheOptions = {
  dev: boolean;
  flushToDisk?: boolean;
  serverDistDir: string;
  appDir?: boolean;
  minimalMode?: boolean;
  maxMemorySize?: number;
};

export class PurrifyIncrementalCache<T = unknown> {
  private cache = new Map<string, CacheEntry<T>>();
  private tags = new Map<string, Set<string>>();
  private currentMemorySize = 0;
  private lastCleanup = Date.now();
  private readonly cleanupInterval = 5 * 60 * 1000; // 5 minutes

  constructor(private readonly fs: FileSystem, private readonly options: CacheOptions) {
    // Start periodic cleanup
    this.startCleanupInterval();
  }

  private getFilePath(key: string): string {
    const safeKey = key.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    return `${this.options.serverDistDir}/cache/${safeKey}.json`;
  }

  private async startCleanupInterval(): Promise<void> {
    setInterval(() => {
      this.cleanup().catch(err => {
        console.error('Error during periodic cache cleanup:', err);
      });
    }, this.cleanupInterval);
  }

  async get(key: string): Promise<T | null> {
    // Try memory cache first
    const memoryEntry = this.cache.get(key);
    if (memoryEntry) {
      return memoryEntry.value as T;
    }
    
    // Try disk cache if enabled
    if (this.options.flushToDisk) {
      try {
        const filePath = this.getFilePath(key);
        const data = await this.fs.readFile(filePath);
        if (data) {
          const entry = JSON.parse(data) as CacheEntry<T>;
          this.cache.set(key, entry);
          return entry.value as T;
        }
      } catch (err) {
        console.error('Cache read error:', err);
      }
    }
    
    return null;
  }

  async set(key: string, value: T, tags?: string[]): Promise<void> {
    const serializedValue = JSON.stringify(value);
    const entry: CacheEntry<T> = {
      value,
      lastModified: Date.now(),
      size: new TextEncoder().encode(serializedValue).length,
      tags,
    };

    // Ensure we have enough space
    this.ensureMemorySpace(JSON.stringify(value).length);

    // Update memory cache
    this.cache.set(key, entry);
    this.currentMemorySize += JSON.stringify(value).length;

    // Persist to disk if enabled
    if (this.options.flushToDisk) {
      try {
        await this.fs.writeFile(this.getFilePath(key), JSON.stringify(entry));
      } catch (err) {
        console.error('Cache write error:', err);
      }
    }
  }

  private ensureMemorySpace(requiredSize: number): void {
    // If we don't have enough space, remove oldest entries until we do
    if (this.currentMemorySize + requiredSize > (this.options.maxMemorySize || 50 * 1024 * 1024)) {
      // Sort entries by last modified time (oldest first)
      const entries = Array.from(this.cache.entries())
        .sort((a, b) => a[1].lastModified - b[1].lastModified);

      for (const [key, entry] of entries) {
        this.currentMemorySize -= entry.size;
        this.cache.delete(key);

        if (this.currentMemorySize + requiredSize <= (this.options.maxMemorySize || 50 * 1024 * 1024)) {
          break;
        }
      }
    }
  }

  async cleanup(): Promise<void> {
    const now = Date.now();
    const CACHE_CLEANUP_THRESHOLD_MS = 60 * 60 * 1000; // 1 hour in milliseconds

    for (const [key, entry] of this.cache.entries()) {
      // Remove entries older than 1 hour
      if (now - entry.lastModified > CACHE_CLEANUP_THRESHOLD_MS) {
        this.currentMemorySize -= JSON.stringify(entry.value).length;
        this.cache.delete(key);

        // Clean up from disk if enabled
        if (this.options.flushToDisk) {
          try {
            await this.fs.unlink(this.getFilePath(key));
          } catch (err) {
            console.error('Cache cleanup error:', err);
          }
        }
      }
    }

    this.lastCleanup = now;
  }

  // Get all keys in the cache (for debugging/development)
  getKeys(): string[] {
    return Array.from(this.cache.keys());
  }

  // Get cache statistics
  getStats(): { size: number; count: number; maxSize: number } {
    return {
      size: this.currentMemorySize,
      count: this.cache.size,
      maxSize: this.options.maxMemorySize || 50 * 1024 * 1024,
    };
  }
}

// Factory function to create a cache handler instance
export function createCacheHandler(params: {
  fs: {
    readFile: (path: string) => Promise<string>;
    writeFile: (path: string, data: string) => Promise<void>;
    unlink: (path: string) => Promise<void>;
    mkdirp: (path: string) => Promise<void>;
  };
  dev: boolean;
  flushToDisk?: boolean;
  serverDistDir: string;
  appDir?: boolean;
  minimalMode?: boolean;
  maxMemoryCacheSize?: number;
}): PurrifyIncrementalCache {
  const fs: FileSystem = {
    readFile: async (path: string) => {
      try {
        const result = await params.fs.readFile(path);
        return result;
      } catch {
        return null;
      }
    },
    writeFile: (path: string, data: string) =>
      params.fs.mkdirp(path).then(() => params.fs.writeFile(path, data)),
    unlink: (path: string) => params.fs.unlink(path).catch(() => {}),
    mkdirp: (path: string) => params.fs.mkdirp(path)
  };

  return new PurrifyIncrementalCache(fs, {
    dev: params.dev,
    flushToDisk: params.flushToDisk,
    serverDistDir: params.serverDistDir,
    appDir: params.appDir,
    minimalMode: params.minimalMode,
    maxMemorySize: params.maxMemoryCacheSize
  });
}
