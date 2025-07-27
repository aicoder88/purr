import React, { useEffect } from 'react';
import { gtmEvent } from '../../lib/gtm-events';

interface PerformanceMetrics {
  lcp?: number;
  fid?: number;
  cls?: number;
  fcp?: number;
  ttfb?: number;
  loadTime?: number;
}

interface PerformanceMonitorProps {
  enabled?: boolean;
  reportInterval?: number;
  sampleRate?: number;
}

export const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({
  enabled = true,
  reportInterval = 30000, // 30 seconds
  sampleRate = 0.1 // 10% of users
}) => {
  useEffect(() => {
    if (!enabled || Math.random() > sampleRate) return;

    let metrics: PerformanceMetrics = {};
    let reportTimeout: NodeJS.Timeout;

    // Core Web Vitals monitoring
    const observeWebVitals = () => {
      // Largest Contentful Paint (LCP)
      if ('PerformanceObserver' in window) {
        try {
          const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1] as any;
            metrics.lcp = lastEntry.startTime;
            
            gtmEvent('web_vitals', {
              metric_name: 'LCP',
              metric_value: Math.round(lastEntry.startTime),
              metric_rating: lastEntry.startTime <= 2500 ? 'good' : lastEntry.startTime <= 4000 ? 'needs-improvement' : 'poor',
              page_path: window.location.pathname
            });
          });
          
          lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

          // First Contentful Paint (FCP)
          const fcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1] as any;
            metrics.fcp = lastEntry.startTime;
            
            gtmEvent('web_vitals', {
              metric_name: 'FCP',
              metric_value: Math.round(lastEntry.startTime),
              metric_rating: lastEntry.startTime <= 1800 ? 'good' : lastEntry.startTime <= 3000 ? 'needs-improvement' : 'poor',
              page_path: window.location.pathname
            });
          });
          
          fcpObserver.observe({ entryTypes: ['paint'] });

          // Cumulative Layout Shift (CLS)
          const clsObserver = new PerformanceObserver((list) => {
            let clsValue = 0;
            for (const entry of list.getEntries() as any[]) {
              if (!entry.hadRecentInput) {
                clsValue += entry.value;
              }
            }
            
            if (clsValue > 0) {
              metrics.cls = clsValue;
              
              gtmEvent('web_vitals', {
                metric_name: 'CLS',
                metric_value: Math.round(clsValue * 1000) / 1000,
                metric_rating: clsValue <= 0.1 ? 'good' : clsValue <= 0.25 ? 'needs-improvement' : 'poor',
                page_path: window.location.pathname
              });
            }
          });
          
          clsObserver.observe({ entryTypes: ['layout-shift'] });

          // First Input Delay (FID)
          const fidObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1] as any;
            metrics.fid = lastEntry.processingStart - lastEntry.startTime;
            
            gtmEvent('web_vitals', {
              metric_name: 'FID',
              metric_value: Math.round(lastEntry.processingStart - lastEntry.startTime),
              metric_rating: (lastEntry.processingStart - lastEntry.startTime) <= 100 ? 'good' : (lastEntry.processingStart - lastEntry.startTime) <= 300 ? 'needs-improvement' : 'poor',
              page_path: window.location.pathname
            });
          });
          
          fidObserver.observe({ entryTypes: ['first-input'] });

        } catch (error) {
          console.warn('Performance Observer not fully supported:', error);
        }
      }
    };

    // Navigation Timing API
    const observeNavigationTiming = () => {
      if ('performance' in window && 'getEntriesByType' in performance) {
        const navigationEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
        
        if (navigationEntries.length > 0) {
          const entry = navigationEntries[0];
          
          // Time to First Byte (TTFB)
          metrics.ttfb = entry.responseStart - entry.requestStart;
          
          // Total Load Time
          metrics.loadTime = entry.loadEventEnd - entry.fetchStart;
          
          gtmEvent('performance_timing', {
            ttfb: Math.round(metrics.ttfb),
            load_time: Math.round(metrics.loadTime),
            dom_content_loaded: Math.round(entry.domContentLoadedEventEnd - entry.fetchStart),
            dom_interactive: Math.round(entry.domInteractive - entry.fetchStart),
            page_path: window.location.pathname
          });
        }
      }
    };

    // Resource Timing
    const observeResourceTiming = () => {
      if ('performance' in window && 'getEntriesByType' in performance) {
        const resourceEntries = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
        
        // Analyze slow resources
        const slowResources = resourceEntries.filter(entry => 
          entry.duration > 1000 && entry.initiatorType !== 'xmlhttprequest'
        );
        
        if (slowResources.length > 0) {
          slowResources.forEach(resource => {
            gtmEvent('slow_resource', {
              resource_url: resource.name,
              resource_type: resource.initiatorType,
              duration: Math.round(resource.duration),
              size: resource.transferSize || 0,
              page_path: window.location.pathname
            });
          });
        }

        // Analyze large resources
        const largeResources = resourceEntries.filter(entry => 
          (entry.transferSize || 0) > 500000 // > 500KB
        );
        
        if (largeResources.length > 0) {
          largeResources.forEach(resource => {
            gtmEvent('large_resource', {
              resource_url: resource.name,
              resource_type: resource.initiatorType,
              size: resource.transferSize || 0,
              duration: Math.round(resource.duration),
              page_path: window.location.pathname
            });
          });
        }
      }
    };

    // Memory Usage (if available)
    const observeMemoryUsage = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        
        gtmEvent('memory_usage', {
          used_heap: Math.round(memory.usedJSHeapSize / 1024 / 1024), // MB
          total_heap: Math.round(memory.totalJSHeapSize / 1024 / 1024), // MB
          heap_limit: Math.round(memory.jsHeapSizeLimit / 1024 / 1024), // MB
          page_path: window.location.pathname
        });
      }
    };

    // Connection Quality
    const observeConnectionQuality = () => {
      if ('connection' in navigator) {
        const connection = (navigator as any).connection;
        
        gtmEvent('connection_quality', {
          effective_type: connection.effectiveType,
          downlink: connection.downlink,
          rtt: connection.rtt,
          save_data: connection.saveData,
          page_path: window.location.pathname
        });
      }
    };

    // Device Performance Score
    const calculateDeviceScore = () => {
      let score = 100;
      
      // CPU cores
      const cores = navigator.hardwareConcurrency || 1;
      if (cores < 4) score -= 20;
      else if (cores >= 8) score += 10;
      
      // Memory (if available)
      if ('deviceMemory' in navigator) {
        const memory = (navigator as any).deviceMemory;
        if (memory < 4) score -= 30;
        else if (memory >= 8) score += 10;
      }
      
      // Connection
      if ('connection' in navigator) {
        const connection = (navigator as any).connection;
        if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
          score -= 40;
        } else if (connection.effectiveType === '4g') {
          score += 10;
        }
      }
      
      gtmEvent('device_performance', {
        device_score: Math.max(0, Math.min(100, score)),
        cpu_cores: cores,
        device_memory: (navigator as any).deviceMemory || 'unknown',
        page_path: window.location.pathname
      });
    };

    // Error Monitoring
    const monitorErrors = () => {
      window.addEventListener('error', (event) => {
        gtmEvent('javascript_error', {
          error_message: event.message,
          error_filename: event.filename,
          error_line: event.lineno,
          error_column: event.colno,
          page_path: window.location.pathname
        });
      });

      window.addEventListener('unhandledrejection', (event) => {
        gtmEvent('promise_rejection', {
          error_message: event.reason?.message || 'Unknown promise rejection',
          page_path: window.location.pathname
        });
      });
    };

    // Initialize monitoring
    const initializeMonitoring = () => {
      observeWebVitals();
      
      // Wait for page load to get accurate timing
      if (document.readyState === 'complete') {
        observeNavigationTiming();
        observeResourceTiming();
        observeMemoryUsage();
        observeConnectionQuality();
        calculateDeviceScore();
      } else {
        window.addEventListener('load', () => {
          setTimeout(() => {
            observeNavigationTiming();
            observeResourceTiming();
            observeMemoryUsage();
            observeConnectionQuality();
            calculateDeviceScore();
          }, 1000);
        });
      }
      
      monitorErrors();
    };

    // Periodic reporting
    const startPeriodicReporting = () => {
      reportTimeout = setInterval(() => {
        if (Object.keys(metrics).length > 0) {
          gtmEvent('performance_summary', {
            ...metrics,
            page_path: window.location.pathname,
            timestamp: Date.now()
          });
        }
      }, reportInterval);
    };

    // Start monitoring
    initializeMonitoring();
    startPeriodicReporting();

    // Cleanup
    return () => {
      if (reportTimeout) {
        clearInterval(reportTimeout);
      }
    };
  }, [enabled, reportInterval, sampleRate]);

  return null; // This component doesn't render anything
};

// Hook for manual performance tracking
export const usePerformanceTracking = () => {
  const trackCustomMetric = (metricName: string, value: number, unit: string = 'ms') => {
    gtmEvent('custom_performance_metric', {
      metric_name: metricName,
      metric_value: value,
      metric_unit: unit,
      page_path: window.location.pathname,
      timestamp: Date.now()
    });
  };

  const trackUserTiming = (name: string, startTime?: number) => {
    if ('performance' in window && 'mark' in performance) {
      const markName = `${name}-start`;
      
      if (startTime) {
        performance.mark(markName);
        return () => {
          const endMarkName = `${name}-end`;
          performance.mark(endMarkName);
          performance.measure(name, markName, endMarkName);
          
          const measures = performance.getEntriesByName(name, 'measure');
          if (measures.length > 0) {
            const duration = measures[measures.length - 1].duration;
            trackCustomMetric(name, duration);
          }
        };
      } else {
        performance.mark(markName);
        return markName;
      }
    }
    
    return () => {}; // Fallback for unsupported browsers
  };

  const trackPageInteraction = (interactionType: string, elementId?: string) => {
    gtmEvent('page_interaction', {
      interaction_type: interactionType,
      element_id: elementId,
      page_path: window.location.pathname,
      timestamp: Date.now()
    });
  };

  return {
    trackCustomMetric,
    trackUserTiming,
    trackPageInteraction
  };
};

export default PerformanceMonitor;
