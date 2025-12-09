import React from 'react';

interface PredictiveLoadingConfig {
  enableHoverPrefetch: boolean;
  enableScrollPrefetch: boolean;
  enableUserBehaviorPrediction: boolean;
  prefetchDelay: number;
  maxPrefetches: number;
}

interface UserInteraction {
  type: string;
  element: string;
  timestamp: number;
  path: string;
}

interface CartEvent {
  type: string;
  productId: string;
  timestamp: number;
}

interface UserBehavior {
  pageViews: string[];
  timeOnPage: Record<string, number>;
  interactions: UserInteraction[];
  cartEvents: CartEvent[];
  lastActivity: number;
}

class PredictiveLoader {
  private config: PredictiveLoadingConfig;
  private prefetchQueue: Set<string>;
  private userBehavior: UserBehavior;
  private intersectionObserver?: IntersectionObserver;
  private hoverTimeout?: NodeJS.Timeout;

  constructor(config: Partial<PredictiveLoadingConfig> = {}) {
    this.config = {
      enableHoverPrefetch: true,
      enableScrollPrefetch: true,
      enableUserBehaviorPrediction: true,
      prefetchDelay: 65, // 65ms sweet spot for hover
      maxPrefetches: 10,
      ...config
    };

    this.prefetchQueue = new Set();
    this.userBehavior = this.loadUserBehavior();
    
    if (typeof window !== 'undefined') {
      this.initializePredictiveLoading();
    }
  }

  private loadUserBehavior(): UserBehavior {
    if (typeof window === 'undefined') {
      return {
        pageViews: [],
        timeOnPage: {},
        interactions: [],
        cartEvents: [],
        lastActivity: Date.now()
      };
    }

    const stored = localStorage.getItem('purrify_user_behavior');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (err) {
        console.warn('Failed to parse user behavior data:', err);
      }
    }

    return {
      pageViews: [],
      timeOnPage: {},
      interactions: [],
      cartEvents: [],
      lastActivity: Date.now()
    };
  }

  private saveUserBehavior(): void {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('purrify_user_behavior', JSON.stringify(this.userBehavior));
      } catch (err) {
        console.warn('Failed to save user behavior data:', err);
      }
    }
  }

  private initializePredictiveLoading(): void {
    this.trackPageView();
    this.setupHoverPrefetch();
    this.setupScrollPrefetch();
    this.setupUserBehaviorTracking();
    this.predictNextPages();
  }

  private trackPageView(): void {
    const currentPath = window.location.pathname;
    this.userBehavior.pageViews.push(currentPath);
    
    // Keep only last 50 page views
    if (this.userBehavior.pageViews.length > 50) {
      this.userBehavior.pageViews = this.userBehavior.pageViews.slice(-50);
    }

    // Track time on page
    const startTime = Date.now();
    const handleBeforeUnload = () => {
      const timeSpent = Date.now() - startTime;
      this.userBehavior.timeOnPage[currentPath] = 
        (this.userBehavior.timeOnPage[currentPath] || 0) + timeSpent;
      this.saveUserBehavior();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
  }

  private setupHoverPrefetch(): void {
    if (!this.config.enableHoverPrefetch) return;

    document.addEventListener('mouseover', (event) => {
      const target = event.target as HTMLElement;
      const link = target.closest('a[href]') as HTMLAnchorElement;
      
      if (link && this.shouldPrefetchLink(link.href)) {
        if (this.hoverTimeout) {
          clearTimeout(this.hoverTimeout);
        }

        this.hoverTimeout = setTimeout(() => {
          this.prefetchPage(link.href);
          
          // If it's a product link, prefetch checkout data
          if (this.isProductLink(link.href)) {
            this.prefetchCheckoutData(link.href);
          }
        }, this.config.prefetchDelay);
      }
    });

    document.addEventListener('mouseout', () => {
      if (this.hoverTimeout) {
        clearTimeout(this.hoverTimeout);
      }
    });
  }

  private setupScrollPrefetch(): void {
    if (!this.config.enableScrollPrefetch) return;

    this.intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          const links = target.querySelectorAll('a[href]') as NodeListOf<HTMLAnchorElement>;
          
          links.forEach((link) => {
            if (this.shouldPrefetchLink(link.href)) {
              // Delay prefetch to avoid overwhelming
              setTimeout(() => {
                this.prefetchPage(link.href);
              }, Math.random() * 2000 + 1000); // 1-3 second delay
            }
          });
        }
      });
    }, {
      rootMargin: '50px 0px', // Start prefetching 50px before element is visible
      threshold: 0.1
    });

    // Observe footer and bottom sections
    const observeElements = document.querySelectorAll('footer, .prefetch-zone');
    observeElements.forEach((element) => {
      this.intersectionObserver!.observe(element);
    });
  }

  private setupUserBehaviorTracking(): void {
    // Track clicks
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      const clickedElement = target.closest('[data-track]') || target;
      
      this.userBehavior.interactions.push({
        type: 'click',
        element: clickedElement.tagName.toLowerCase(),
        timestamp: Date.now(),
        path: window.location.pathname
      });

      this.userBehavior.lastActivity = Date.now();
      this.saveUserBehavior();
    });

    // Track cart events
    window.addEventListener('cartUpdated', ((event: CustomEvent) => {
      this.userBehavior.cartEvents.push({
        type: event.detail.type,
        productId: event.detail.productId,
        timestamp: Date.now()
      });

      // Prefetch checkout when items added to cart
      if (event.detail.type === 'add' && this.userBehavior.cartEvents.length >= 1) {
        this.prefetchCheckoutPage();
      }
    }) as EventListener);
  }

  private predictNextPages(): void {
    if (!this.config.enableUserBehaviorPrediction) return;

    const predictions = this.generatePagePredictions();
    
    predictions.slice(0, 3).forEach((prediction, index) => {
      // Stagger predictions to avoid overwhelming
      setTimeout(() => {
        this.prefetchPage(prediction.path);
      }, (index + 1) * 3000); // 3s, 6s, 9s delays
    });
  }

  private generatePagePredictions(): Array<{ path: string; confidence: number }> {
    const currentPath = window.location.pathname;
    const predictions: Array<{ path: string; confidence: number }> = [];

    // Analyze user behavior patterns
    const recentPages = this.userBehavior.pageViews.slice(-10);
    const pageSequences = this.findCommonSequences(recentPages);

    // Predict based on common sequences
    pageSequences.forEach((sequence) => {
      if (sequence.from === currentPath && sequence.confidence > 0.3) {
        predictions.push({
          path: sequence.to,
          confidence: sequence.confidence
        });
      }
    });

    // Add path-based predictions
    const pathPredictions = this.getPathBasedPredictions(currentPath);
    predictions.push(...pathPredictions);

    // Sort by confidence and remove duplicates
    const uniquePredictions = predictions
      .filter((p, index) => predictions.findIndex(p2 => p2.path === p.path) === index)
      .sort((a, b) => b.confidence - a.confidence);

    return uniquePredictions;
  }

  private findCommonSequences(pages: string[]): Array<{ from: string; to: string; confidence: number }> {
    const sequences: Record<string, Record<string, number>> = {};
    
    for (let i = 0; i < pages.length - 1; i++) {
      const from = pages[i];
      const to = pages[i + 1];
      
      if (!sequences[from]) sequences[from] = {};
      sequences[from][to] = (sequences[from][to] || 0) + 1;
    }

    const result: Array<{ from: string; to: string; confidence: number }> = [];
    
    Object.entries(sequences).forEach(([from, transitions]) => {
      const totalFromPage = Object.values(transitions).reduce((sum, count) => sum + count, 0);
      
      Object.entries(transitions).forEach(([to, count]) => {
        result.push({
          from,
          to,
          confidence: count / totalFromPage
        });
      });
    });

    return result;
  }

  private getPathBasedPredictions(currentPath: string): Array<{ path: string; confidence: number }> {
    const predictions: Array<{ path: string; confidence: number }> = [];

    // Homepage visitors likely to visit products
    if (currentPath === '/') {
      predictions.push(
        { path: '/products/trial-size', confidence: 0.7 },
        { path: '/products/compare', confidence: 0.6 },
        { path: '/learn/how-it-works', confidence: 0.5 }
      );
    }

    // Product page visitors likely to checkout
    if (currentPath.includes('/products/')) {
      predictions.push(
        { path: '/checkout', confidence: 0.8 },
        { path: '/learn/faq', confidence: 0.4 },
        { path: '/reviews', confidence: 0.3 }
      );
    }

    // Learning page visitors likely to buy
    if (currentPath.includes('/learn/')) {
      predictions.push(
        { path: '/products/trial-size', confidence: 0.6 },
        { path: '/products/compare', confidence: 0.5 }
      );
    }

    return predictions;
  }

  private shouldPrefetchLink(href: string): boolean {
    try {
      const url = new URL(href, window.location.origin);
      
      // Only prefetch same-origin links
      if (url.origin !== window.location.origin) return false;
      
      // Skip if already prefetched
      if (this.prefetchQueue.has(url.pathname)) return false;
      
      // Skip if queue is full
      if (this.prefetchQueue.size >= this.config.maxPrefetches) return false;
      
      // Skip certain paths
      const skipPaths = ['/api/', '/admin/', '/_next/', '/static/'];
      if (skipPaths.some(path => url.pathname.startsWith(path))) return false;
      
      return true;
    } catch {
      return false;
    }
  }

  private isProductLink(href: string): boolean {
    return href.includes('/products/') || href.includes('/trial-size');
  }

  public async prefetchPage(href: string): Promise<void> {
    try {
      const url = new URL(href, window.location.origin);
      
      if (this.prefetchQueue.has(url.pathname)) return;
      this.prefetchQueue.add(url.pathname);

      // Create link element for prefetching
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = url.pathname;
      document.head.appendChild(link);

      // Track prefetch
      this.trackPrefetch(url.pathname, 'page');

      // Remove after 30 seconds to avoid memory leaks
      setTimeout(() => {
        if (link.parentNode) {
          link.parentNode.removeChild(link);
        }
        this.prefetchQueue.delete(url.pathname);
      }, 30000);

    } catch (error) {
      console.warn('Failed to prefetch page:', error);
    }
  }

  private async prefetchCheckoutData(productHref: string): Promise<void> {
    try {
      // Extract product info from URL
      const productId = this.extractProductId(productHref);
      if (!productId) return;

      const response = await fetch('/api/edge/prefetch-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId,
          quantity: 1,
          userAgent: navigator.userAgent,
          location: this.getUserLocation()
        })
      });

      if (response.ok) {
        this.trackPrefetch(productHref, 'checkout-data');
      }

    } catch (err) {
      console.warn('Failed to prefetch checkout data:', err);
    }
  }

  private async prefetchCheckoutPage(): Promise<void> {
    this.prefetchPage('/checkout');
    
    // Also prefetch Stripe resources
    const stripeScript = document.createElement('link');
    stripeScript.rel = 'dns-prefetch';
    stripeScript.href = 'https://checkout.stripe.com';
    document.head.appendChild(stripeScript);
  }

  private extractProductId(href: string): string | null {
    if (href.includes('trial-size') || href.includes('20g')) return '12g';
    if (href.includes('50g') || href.includes('60g')) return '50g';
    if (href.includes('120g') || href.includes('140g')) return '120g';
    return null;
  }

  private getUserLocation(): string {
    // Simple location detection - in production use more sophisticated method
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (timezone.includes('Toronto') || timezone.includes('Montreal')) return 'ON';
    if (timezone.includes('Vancouver')) return 'BC';
    if (timezone.includes('Calgary')) return 'AB';
    return 'ON'; // Default to Ontario
  }

  private trackPrefetch(path: string, type: 'page' | 'checkout-data'): void {
    // Track prefetch analytics
    if (window.gtag) {
      window.gtag('event', 'prefetch', {
        event_category: 'performance',
        event_label: type,
        custom_parameter_1: path
      });
    }
  }

  // Public methods for manual control
  public prefetchProduct(productId: string, quantity: number = 1): void {
    void quantity;
    this.prefetchCheckoutData(`/products/${productId}`);
  }

  public prefetchNext(paths: string[]): void {
    paths.forEach((path, index) => {
      setTimeout(() => {
        this.prefetchPage(path);
      }, index * 1000);
    });
  }

  public clearPrefetchQueue(): void {
    this.prefetchQueue.clear();
  }

  public getPredictions(): Array<{ path: string; confidence: number }> {
    return this.generatePagePredictions();
  }
}

// Create global instance
let predictiveLoader: PredictiveLoader | null = null;

export function initializePredictiveLoading(config?: Partial<PredictiveLoadingConfig>): PredictiveLoader {
  if (typeof window !== 'undefined' && !predictiveLoader) {
    predictiveLoader = new PredictiveLoader(config);
  }
  return predictiveLoader!;
}

export function getPredictiveLoader(): PredictiveLoader | null {
  return predictiveLoader;
}

// React hook for predictive loading
export function usePredictiveLoading(config?: Partial<PredictiveLoadingConfig>) {
  const [loader, setLoader] = React.useState<PredictiveLoader | null>(null);

  React.useEffect(() => {
    const instance = initializePredictiveLoading(config);
    setLoader(instance);

    return () => {
      if (instance) {
        instance.clearPrefetchQueue();
      }
    };
  }, [config]);

  return {
    prefetchProduct: loader?.prefetchProduct.bind(loader),
    prefetchNext: loader?.prefetchNext.bind(loader),
    getPredictions: loader?.getPredictions.bind(loader),
    clearQueue: loader?.clearPrefetchQueue.bind(loader)
  };
}

// Helper function to prefetch based on user interaction
export function prefetchOnInteraction(element: HTMLElement, targetPath: string): void {
  const handler = () => {
    if (predictiveLoader) {
      predictiveLoader.prefetchPage(targetPath);
    }
    element.removeEventListener('mouseenter', handler);
  };

  element.addEventListener('mouseenter', handler, { once: true });
}

export { PredictiveLoader };
export type { PredictiveLoadingConfig, UserBehavior };
