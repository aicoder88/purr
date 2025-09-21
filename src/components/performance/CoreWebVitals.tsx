import { useEffect } from 'react';
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

interface MetricValue {
  id: string;
  name: string;
  value: number;
  delta: number;
  entries: PerformanceEntry[];
}

interface WebVitalsProps {
  onMetric?: (metric: MetricValue) => void;
  debug?: boolean;
}

export function CoreWebVitals({ onMetric, debug = false }: WebVitalsProps) {
  useEffect(() => {
    const reportMetric = (metric: MetricValue) => {
      // Custom analytics reporting
      if (onMetric) {
        onMetric(metric);
      }

      // Debug logging
      if (debug) {
        console.log(`[Core Web Vitals] ${metric.name}:`, {
          value: metric.value,
          rating: getMetricRating(metric.name, metric.value),
          id: metric.id
        });
      }

      // Send to analytics (Google Analytics 4)
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', metric.name, {
          custom_map: { metric_id: 'dimension1' },
          metric_id: metric.id,
          metric_value: metric.value,
          metric_delta: metric.delta,
        });
      }

      // Send to other analytics platforms
      reportToAnalytics(metric);
    };

    // Measure all Core Web Vitals
    getCLS(reportMetric);
    getFID(reportMetric);
    getFCP(reportMetric);
    getLCP(reportMetric);
    getTTFB(reportMetric);

  }, [onMetric, debug]);

  return null; // This is a monitoring component with no UI
}

function getMetricRating(name: string, value: number): 'good' | 'needs-improvement' | 'poor' {
  const thresholds = {
    CLS: { good: 0.1, poor: 0.25 },
    FID: { good: 100, poor: 300 },
    FCP: { good: 1800, poor: 3000 },
    LCP: { good: 2500, poor: 4000 },
    TTFB: { good: 800, poor: 1800 }
  };

  const threshold = thresholds[name as keyof typeof thresholds];
  if (!threshold) return 'good';

  if (value <= threshold.good) return 'good';
  if (value <= threshold.poor) return 'needs-improvement';
  return 'poor';
}

function reportToAnalytics(metric: MetricValue) {
  // Report to Vercel Analytics if available
  if (typeof window !== 'undefined' && window.va) {
    window.va('track', 'Core Web Vitals', {
      metric: metric.name,
      value: metric.value,
      rating: getMetricRating(metric.name, metric.value)
    });
  }

  // Report to custom analytics endpoint
  if (typeof window !== 'undefined') {
    fetch('/api/analytics/web-vitals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        metric: metric.name,
        value: metric.value,
        id: metric.id,
        rating: getMetricRating(metric.name, metric.value),
        url: window.location.href,
        timestamp: Date.now()
      })
    }).catch(() => {
      // Silently fail - don't break the user experience
    });
  }
}

// Performance monitoring hook for components
export function usePerformanceMonitoring() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Monitor page load performance
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'navigation') {
          const navEntry = entry as PerformanceNavigationTiming;
          console.log('Page Load Metrics:', {
            domContentLoaded: navEntry.domContentLoadedEventEnd - navEntry.domContentLoadedEventStart,
            loadComplete: navEntry.loadEventEnd - navEntry.loadEventStart,
            timeToInteractive: navEntry.domInteractive - navEntry.navigationStart
          });
        }
      }
    });

    observer.observe({ entryTypes: ['navigation'] });

    return () => observer.disconnect();
  }, []);
}

// Real User Monitoring component
export function RealUserMonitoring() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Monitor resource loading
    const resourceObserver = new PerformanceObserver((list) => {
      const resources = list.getEntries();
      const slowResources = resources.filter(entry => entry.duration > 1000);

      if (slowResources.length > 0) {
        console.warn('Slow loading resources detected:', slowResources);

        // Report slow resources
        fetch('/api/analytics/performance-issues', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'slow-resources',
            resources: slowResources.map(r => ({
              name: r.name,
              duration: r.duration,
              size: (r as PerformanceResourceTiming).transferSize
            })),
            url: window.location.href
          })
        }).catch(() => {});
      }
    });

    resourceObserver.observe({ entryTypes: ['resource'] });

    // Monitor long tasks
    const longTaskObserver = new PerformanceObserver((list) => {
      const longTasks = list.getEntries();
      if (longTasks.length > 0) {
        console.warn('Long tasks detected:', longTasks);

        fetch('/api/analytics/performance-issues', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'long-tasks',
            tasks: longTasks.map(t => ({
              duration: t.duration,
              startTime: t.startTime
            })),
            url: window.location.href
          })
        }).catch(() => {});
      }
    });

    if ('PerformanceObserver' in window) {
      try {
        longTaskObserver.observe({ entryTypes: ['longtask'] });
      } catch {
        // Browser doesn't support longtask
      }
    }

    return () => {
      resourceObserver.disconnect();
      longTaskObserver.disconnect();
    };
  }, []);

  return null;
}

// Performance budget monitoring
export function PerformanceBudgetMonitor() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkBudgets = () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;

      const budgets = {
        LCP: 2500, // ms
        FCP: 1800, // ms
        TTI: 3800, // ms
        TotalBlockingTime: 200, // ms
        CumulativeLayoutShift: 0.1
      };

      const metrics = {
        LCP: navigation.loadEventEnd - navigation.navigationStart,
        FCP: navigation.domContentLoadedEventEnd - navigation.navigationStart,
        TTI: navigation.domInteractive - navigation.navigationStart
      };

      const violations = Object.entries(metrics)
        .filter(([metric, value]) => value > budgets[metric as keyof typeof budgets])
        .map(([metric, value]) => ({ metric, value, budget: budgets[metric as keyof typeof budgets] }));

      if (violations.length > 0) {
        console.warn('Performance budget violations:', violations);

        fetch('/api/analytics/budget-violations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            violations,
            url: window.location.href,
            userAgent: navigator.userAgent
          })
        }).catch(() => {});
      }
    };

    window.addEventListener('load', checkBudgets);
    return () => window.removeEventListener('load', checkBudgets);
  }, []);

  return null;
}

// Global type declarations for analytics
declare global {
  interface Window {
    gtag?: (command: string, ...args: unknown[]) => void;
    va?: (command: string, ...args: unknown[]) => void;
  }
}