import { useEffect, useRef } from 'react';
import { onCLS, onINP, onFCP, onLCP, onTTFB } from 'web-vitals';

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

      // Debug logging is disabled in production

      // Send to analytics (Google Analytics 4)
      if (typeof globalThis.window !== 'undefined' && window.gtag) {
        window.gtag('event', metric.name, {
          metric_id: metric.id,
          metric_value: metric.value,
          metric_delta: metric.delta,
        });
      }

      // Send to other analytics platforms
      reportToAnalytics(metric);
    };

    // Measure all Core Web Vitals
    onCLS(reportMetric);
    onINP(reportMetric);
    onFCP(reportMetric);
    onLCP(reportMetric);
    onTTFB(reportMetric);

  }, [onMetric, debug]);

  return null; // This is a monitoring component with no UI
}

function getMetricRating(name: string, value: number): 'good' | 'needs-improvement' | 'poor' {
  const thresholds = {
    CLS: { good: 0.1, poor: 0.25 },
    INP: { good: 200, poor: 500 },
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
  if (typeof globalThis.window !== 'undefined' && window.va) {
    window.va('event', {
      name: 'Core Web Vitals',
      metric: metric.name,
      value: metric.value,
      rating: getMetricRating(metric.name, metric.value)
    });
  }

  // Report to custom analytics endpoint
  if (typeof globalThis.window !== 'undefined') {
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
    if (typeof globalThis.window === 'undefined') return;

    // Monitor page load performance
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'navigation') {
          // Page load metrics captured silently
        }
      }
    });

    observer.observe({ entryTypes: ['navigation'] });

    return () => observer.disconnect();
  }, []); // Empty deps is correct - only setup once on mount
}

// Real User Monitoring component
export function RealUserMonitoring() {
  // Use refs to maintain latest values in callbacks without re-subscribing
  const urlRef = useRef<string>('');
  
  useEffect(() => {
    if (typeof globalThis.window === 'undefined') return;
    
    // Keep ref updated with current URL for use in callbacks
    urlRef.current = window.location.href;

    // Monitor resource loading
    const resourceObserver = new PerformanceObserver((list) => {
      const resources = list.getEntries();
      const slowResources = resources.filter(entry => entry.duration > 1000);

      if (slowResources.length > 0) {
        console.warn('Slow loading resources detected:', slowResources);

        // Use ref to get current URL without stale closure
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
            url: urlRef.current
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
            url: urlRef.current
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
  }, []); // Empty deps - observers should only be created once

  return null;
}

// Performance budget monitoring
export function PerformanceBudgetMonitor() {
  // Use ref to avoid stale closure issues with window.location.href
  const urlRef = useRef<string>('');
  const userAgentRef = useRef<string>('');
  
  useEffect(() => {
    if (typeof globalThis.window === 'undefined') return;
    
    // Store current values in refs to avoid stale closures
    urlRef.current = window.location.href;
    userAgentRef.current = navigator.userAgent;

    const checkBudgets = () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (!navigation) return;

      const budgets = {
        LCP: 2500, // ms
        FCP: 1800, // ms
        TTI: 3800, // ms
        TotalBlockingTime: 200, // ms
        CumulativeLayoutShift: 0.1
      };

      const metrics = {
        LCP: navigation.loadEventEnd - navigation.startTime,
        FCP: navigation.domContentLoadedEventEnd - navigation.startTime,
        TTI: navigation.domInteractive - navigation.startTime
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
            url: urlRef.current,
            userAgent: userAgentRef.current
          })
        }).catch(() => {});
      }
    };

    window.addEventListener('load', checkBudgets);
    return () => window.removeEventListener('load', checkBudgets);
  }, []); // Empty deps - only run once on mount

  return null;
}

