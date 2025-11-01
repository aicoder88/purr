/**
 * Unified Optimizer Coordinator
 * Centralized management of all optimization systems
 * Provides single entry point for performance, conversion, UX, and analytics optimization
 */

import { performanceOptimizer, UltimatePerformanceOptimizer } from './performance-optimizer';
import { conversionOptimizer, UltimateConversionOptimizer } from './conversion-optimizer';
import { appleUXOptimizer, AppleUXOptimizer } from './apple-ux-optimizer';
import { analyticsOptimizer, UltimateAnalyticsOptimizer } from './analytics-optimizer';
import { isBrowser, getMontrealContext, MONTREAL_CONFIG } from './optimizer-utils';

interface OptimizationConfig {
  enablePerformance?: boolean;
  enableConversion?: boolean;
  enableUX?: boolean;
  enableAnalytics?: boolean;
  montrealOptimizations?: boolean;
  debug?: boolean;
}

interface OptimizationStatus {
  performance: {
    enabled: boolean;
    initialized: boolean;
    metrics: {
      lcp?: number;
      fid?: number;
      cls?: number;
    };
  };
  conversion: {
    enabled: boolean;
    initialized: boolean;
    trackingActive: boolean;
  };
  ux: {
    enabled: boolean;
    initialized: boolean;
    enhancementsActive: boolean;
  };
  analytics: {
    enabled: boolean;
    initialized: boolean;
    experimentsActive: number;
  };
  montreal: {
    detected: boolean;
    language: 'en' | 'fr';
    season: string;
    optimizationsActive: boolean;
  };
}

export class UnifiedOptimizer {
  private config: Required<OptimizationConfig>;
  private performance: UltimatePerformanceOptimizer;
  private conversion: UltimateConversionOptimizer;
  private ux: AppleUXOptimizer;
  private analytics: UltimateAnalyticsOptimizer;
  private initialized: boolean = false;
  private montrealContext: ReturnType<typeof getMontrealContext>;

  constructor(config: OptimizationConfig = {}) {
    this.config = {
      enablePerformance: config.enablePerformance ?? true,
      enableConversion: config.enableConversion ?? true,
      enableUX: config.enableUX ?? true,
      enableAnalytics: config.enableAnalytics ?? true,
      montrealOptimizations: config.montrealOptimizations ?? true,
      debug: config.debug ?? false
    };

    // Get Montreal context
    this.montrealContext = getMontrealContext();

    // Initialize optimizers (use existing singletons)
    this.performance = performanceOptimizer;
    this.conversion = conversionOptimizer;
    this.ux = appleUXOptimizer;
    this.analytics = analyticsOptimizer;

    // Auto-initialize if in browser
    if (isBrowser()) {
      this.initialize();
    }
  }

  /**
   * Initialize all enabled optimizers
   */
  public initialize(): void {
    if (this.initialized) {
      this.log('Optimizer already initialized');
      return;
    }

    this.log('Initializing Unified Optimizer...');

    try {
      // Initialize Montreal-specific optimizations first
      if (this.config.montrealOptimizations && this.montrealContext.isMontrealUser) {
        this.initializeMontrealOptimizations();
      }

      // Initialize each optimizer
      if (this.config.enablePerformance) {
        this.log('Performance optimizer enabled');
      }

      if (this.config.enableConversion) {
        this.log('Conversion optimizer enabled');
      }

      if (this.config.enableUX) {
        this.log('UX optimizer enabled');
      }

      if (this.config.enableAnalytics) {
        this.log('Analytics optimizer enabled');
      }

      this.initialized = true;
      this.log('Unified Optimizer initialized successfully');

      // Track initialization
      this.trackInitialization();
    } catch (error) {
      console.error('Failed to initialize Unified Optimizer:', error);
    }
  }

  /**
   * Initialize Montreal-specific optimizations across all systems
   */
  private initializeMontrealOptimizations(): void {
    this.log('Initializing Montreal optimizations', this.montrealContext);

    // Apply Montreal-specific performance optimizations
    if (this.config.enablePerformance) {
      this.performance.optimizeForMontreal();
    }

    // No need to call conversion optimizer - it auto-detects Montreal in constructor

    // Apply seasonal UI optimizations
    if (this.montrealContext.season === 'winter' && isBrowser()) {
      document.documentElement.classList.add('montreal-winter-mode');
    }
  }

  /**
   * Track a conversion event through the conversion optimizer
   */
  public trackConversion(
    type: 'primary' | 'secondary' | 'micro',
    action: string,
    value?: number
  ): void {
    if (!this.config.enableConversion) return;

    this.conversion.trackConversion(type, action, value);
    this.log(`Conversion tracked: ${type} - ${action}`, { value });
  }

  /**
   * Get comprehensive optimization status
   */
  public getStatus(): OptimizationStatus {
    return {
      performance: {
        enabled: this.config.enablePerformance,
        initialized: this.initialized,
        metrics: {
          // Performance metrics would be retrieved from performance optimizer
        }
      },
      conversion: {
        enabled: this.config.enableConversion,
        initialized: this.initialized,
        trackingActive: this.config.enableConversion
      },
      ux: {
        enabled: this.config.enableUX,
        initialized: this.initialized,
        enhancementsActive: this.config.enableUX
      },
      analytics: {
        enabled: this.config.enableAnalytics,
        initialized: this.initialized,
        experimentsActive: 0 // Would be retrieved from analytics optimizer
      },
      montreal: {
        detected: this.montrealContext.isMontrealUser,
        language: this.montrealContext.language,
        season: this.montrealContext.season,
        optimizationsActive: this.config.montrealOptimizations && this.montrealContext.isMontrealUser
      }
    };
  }

  /**
   * Get performance optimization report
   */
  public getPerformanceReport() {
    if (!this.config.enablePerformance) {
      return { error: 'Performance optimizer not enabled' };
    }

    return this.performance.getCostOptimizationReport();
  }

  /**
   * Get Montreal analytics report
   */
  public getMontrealAnalyticsReport() {
    if (!this.config.enableAnalytics) {
      return { error: 'Analytics optimizer not enabled' };
    }

    return this.analytics.generateMontrealAnalyticsReport();
  }

  /**
   * Get optimal ad campaigns for Montreal
   */
  public getOptimalAdCampaigns() {
    if (!this.config.enableConversion) {
      return [];
    }

    return this.conversion.getOptimalAdCampaigns();
  }

  /**
   * Get retargeting audiences
   */
  public getRetargetingAudiences() {
    if (!this.config.enableConversion) {
      return [];
    }

    return this.conversion.getRetargetingAudiences();
  }

  /**
   * Enable or disable specific optimizer
   */
  public toggleOptimizer(
    optimizer: 'performance' | 'conversion' | 'ux' | 'analytics',
    enabled: boolean
  ): void {
    switch (optimizer) {
      case 'performance':
        this.config.enablePerformance = enabled;
        break;
      case 'conversion':
        this.config.enableConversion = enabled;
        break;
      case 'ux':
        this.config.enableUX = enabled;
        break;
      case 'analytics':
        this.config.enableAnalytics = enabled;
        break;
    }

    this.log(`${optimizer} optimizer ${enabled ? 'enabled' : 'disabled'}`);
  }

  /**
   * Get Montreal-specific configuration
   */
  public getMontrealConfig() {
    return {
      context: this.montrealContext,
      config: MONTREAL_CONFIG,
      optimizationsEnabled: this.config.montrealOptimizations
    };
  }

  /**
   * Track initialization event
   */
  private trackInitialization(): void {
    if (!isBrowser()) return;

    // Track via GTM if available
    if (window.gtag) {
      window.gtag('event', 'optimizer_initialized', {
        event_category: 'optimization',
        event_label: 'unified_optimizer',
        montreal_user: this.montrealContext.isMontrealUser,
        language: this.montrealContext.language,
        season: this.montrealContext.season,
        performance_enabled: this.config.enablePerformance,
        conversion_enabled: this.config.enableConversion,
        ux_enabled: this.config.enableUX,
        analytics_enabled: this.config.enableAnalytics
      });
    }
  }

  /**
   * Debug logging
   */
  private log(message: string, data?: unknown): void {
    if (this.config.debug) {
      console.log(`[UnifiedOptimizer] ${message}`, data || '');
    }
  }

  /**
   * Get all optimizers (for advanced usage)
   */
  public getOptimizers() {
    return {
      performance: this.performance,
      conversion: this.conversion,
      ux: this.ux,
      analytics: this.analytics
    };
  }
}

// ============================================================================
// Singleton Instance
// ============================================================================

/**
 * Default unified optimizer instance
 * Auto-initializes with all optimizations enabled
 */
export const unifiedOptimizer = new UnifiedOptimizer({
  enablePerformance: true,
  enableConversion: true,
  enableUX: true,
  enableAnalytics: true,
  montrealOptimizations: true,
  debug: process.env.NODE_ENV === 'development'
});

// ============================================================================
// Convenience Functions
// ============================================================================

/**
 * Track conversion event (convenience wrapper)
 */
export const trackConversion = (
  type: 'primary' | 'secondary' | 'micro',
  action: string,
  value?: number
): void => {
  unifiedOptimizer.trackConversion(type, action, value);
};

/**
 * Get optimization status (convenience wrapper)
 */
export const getOptimizationStatus = (): OptimizationStatus => {
  return unifiedOptimizer.getStatus();
};

/**
 * Get Montreal context (convenience wrapper)
 */
export const getMontrealOptimizationContext = () => {
  return unifiedOptimizer.getMontrealConfig();
};

// ============================================================================
// Global Type Declarations
// ============================================================================

declare global {
  interface Window {
    purrifyOptimizer?: UnifiedOptimizer;
    gtag?: (...args: unknown[]) => void;
  }
}

// Expose to window for debugging
if (isBrowser()) {
  window.purrifyOptimizer = unifiedOptimizer;
}

// ============================================================================
// Export Types
// ============================================================================

export type { OptimizationConfig, OptimizationStatus };
