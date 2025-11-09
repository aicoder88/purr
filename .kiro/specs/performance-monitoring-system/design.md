# Design Document

## Overview

The Performance Monitoring System will provide comprehensive tracking of Core Web Vitals, bundle sizes, and runtime performance metrics. It integrates with Vercel Analytics, implements performance budgets, and provides real-time dashboards for monitoring application health. The system will catch performance regressions before deployment and provide actionable optimization recommendations.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Client-Side Monitoring                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ Web Vitals   │  │  Component   │  │   Network    │     │
│  │   Tracker    │  │   Profiler   │  │   Monitor    │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                  Analytics Aggregation                       │
│              (Vercel Analytics / Custom API)                 │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                  Build-Time Monitoring                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Bundle     │  │  Lighthouse  │  │ Performance  │     │
│  │   Analyzer   │  │    Audit     │  │   Budgets    │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              Performance Dashboard & Alerts                  │
└─────────────────────────────────────────────────────────────┘
```

## Components and Interfaces

### 1. Web Vitals Tracker

**Purpose**: Measure and report Core Web Vitals

**Interface**:
```typescript
import { onCLS, onFID, onFCP, onLCP, onTTFB, onINP } from 'web-vitals';

interface WebVitalsMetric {
  name: 'CLS' | 'FID' | 'FCP' | 'LCP' | 'TTFB' | 'INP';
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
  navigationType: string;
}

class WebVitalsTracker {
  initialize(): void {
    onCLS(this.sendToAnalytics);
    onFID(this.sendToAnalytics);
    onFCP(this.sendToAnalytics);
    onLCP(this.sendToAnalytics);
    onTTFB(this.sendToAnalytics);
    onINP(this.sendToAnalytics);
  }
  
  private sendToAnalytics(metric: WebVitalsMetric): void {
    // Send to Vercel Analytics
    if (window.va) {
      window.va('event', {
        name: metric.name,
        data: {
          value: metric.value,
          rating: metric.rating,
          page: window.location.pathname
        }
      });
    }
    
    // Send to custom API for aggregation
    fetch('/api/analytics/web-vitals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(metric)
    });
  }
}
```

### 2. Bundle Analyzer

**Purpose**: Analyze and report on bundle sizes

**Interface**:
```typescript
interface BundleAnalysis {
  totalSize: number;
  gzippedSize: number;
  chunks: ChunkInfo[];
  libraries: LibraryInfo[];
  recommendations: string[];
}

interface ChunkInfo {
  name: string;
  size: number;
  gzippedSize: number;
  modules: string[];
}

interface LibraryInfo {
  name: string;
  size: number;
  version: string;
  treeshakeable: boolean;
}

class BundleAnalyzer {
  async analyze(): Promise<BundleAnalysis>;
  async compareWithBaseline(current: BundleAnalysis, baseline: BundleAnalysis): Promise<BundleComparison>;
  async generateReport(analysis: BundleAnalysis): Promise<void>;
}
```

**Implementation** (`scripts/bundle-analyzer.js`):
```javascript
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const fs = require('fs');

async function analyzeBundles() {
  // Run Next.js build with analyzer
  process.env.ANALYZE = 'true';
  await require('next/dist/build').default(process.cwd());
  
  // Parse bundle stats
  const stats = JSON.parse(
    fs.readFileSync('.next/analyze/client.json', 'utf8')
  );
  
  const analysis = {
    totalSize: calculateTotalSize(stats),
    gzippedSize: calculateGzippedSize(stats),
    chunks: extractChunks(stats),
    libraries: extractLibraries(stats),
    recommendations: generateRecommendations(stats)
  };
  
  // Check against budgets
  const budgets = require('../performance-budgets.json');
  const violations = checkBudgets(analysis, budgets);
  
  if (violations.length > 0) {
    console.error('Performance budget violations:', violations);
    process.exit(1);
  }
  
  // Write report
  fs.writeFileSync(
    'reports/bundle-analysis.json',
    JSON.stringify(analysis, null, 2)
  );
}
```

### 3. Performance Budget Enforcer

**Purpose**: Enforce performance budgets at build time

**Configuration** (`performance-budgets.json`):
```json
{
  "bundles": {
    "main": {
      "maxSize": 300000,
      "maxGzippedSize": 100000
    },
    "framework": {
      "maxSize": 200000,
      "maxGzippedSize": 70000
    }
  },
  "pages": {
    "/": {
      "maxLoadTime": 2000,
      "maxLCP": 2500,
      "maxCLS": 0.1,
      "maxINP": 200
    },
    "/products/*": {
      "maxLoadTime": 2500,
      "maxLCP": 2500,
      "maxCLS": 0.1,
      "maxINP": 200
    }
  },
  "assets": {
    "images": {
      "maxSize": 500000
    },
    "fonts": {
      "maxSize": 100000
    }
  }
}
```

### 4. Lighthouse CI Integration

**Purpose**: Run Lighthouse audits in CI/CD pipeline

**Configuration** (`.lighthouserc.json`):
```json
{
  "ci": {
    "collect": {
      "url": [
        "http://localhost:3000/",
        "http://localhost:3000/products/standard",
        "http://localhost:3000/blog"
      ],
      "numberOfRuns": 3,
      "settings": {
        "preset": "desktop",
        "throttling": {
          "rttMs": 40,
          "throughputKbps": 10240,
          "cpuSlowdownMultiplier": 1
        }
      }
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", {"minScore": 0.9}],
        "categories:accessibility": ["error", {"minScore": 1.0}],
        "categories:best-practices": ["error", {"minScore": 0.95}],
        "categories:seo": ["error", {"minScore": 1.0}]
      }
    },
    "upload": {
      "target": "temporary-public-storage"
    }
  }
}
```

### 5. Performance Dashboard

**Purpose**: Display real-time performance metrics

**Interface**:
```typescript
interface PerformanceDashboard {
  currentMetrics: {
    lcp: number;
    cls: number;
    inp: number;
    ttfb: number;
  };
  trends: {
    period: '7d' | '30d' | '90d';
    data: MetricTrend[];
  };
  pagePerformance: PageMetrics[];
  alerts: PerformanceAlert[];
}

interface MetricTrend {
  date: string;
  lcp: number;
  cls: number;
  inp: number;
}

interface PageMetrics {
  path: string;
  views: number;
  avgLCP: number;
  avgCLS: number;
  avgINP: number;
  score: number;
}

interface PerformanceAlert {
  type: 'regression' | 'budget-violation' | 'error-spike';
  severity: 'critical' | 'warning';
  message: string;
  timestamp: number;
}
```

## Data Models

### Performance Metrics Schema

```typescript
interface PerformanceMetrics {
  timestamp: number;
  page: string;
  device: 'mobile' | 'desktop';
  metrics: {
    lcp: number;
    cls: number;
    inp: number;
    fcp: number;
    ttfb: number;
  };
  navigation: {
    type: 'navigate' | 'reload' | 'back_forward';
    redirectCount: number;
  };
  connection: {
    effectiveType: '4g' | '3g' | '2g' | 'slow-2g';
    downlink: number;
    rtt: number;
  };
}
```

## Error Handling

- Gracefully handle analytics API failures
- Continue build even if Lighthouse fails (with warnings)
- Retry failed metric submissions
- Log errors without blocking user experience

## Testing Strategy

### Unit Tests
- Web Vitals tracking
- Bundle size calculations
- Budget validation logic

### Integration Tests
- End-to-end Lighthouse audit
- Bundle analysis pipeline
- Dashboard data aggregation

## Performance Considerations

- Minimal client-side overhead (<5KB)
- Batch metric submissions
- Use requestIdleCallback for non-critical tracking
- Implement sampling for high-traffic pages

## Integration Points

### Next.js App

```typescript
// pages/_app.tsx
import { useEffect } from 'react';
import { WebVitalsTracker } from '@/lib/performance/web-vitals-tracker';

export function reportWebVitals(metric: any) {
  const tracker = new WebVitalsTracker();
  tracker.sendToAnalytics(metric);
}

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const tracker = new WebVitalsTracker();
    tracker.initialize();
  }, []);
  
  return <Component {...pageProps} />;
}
```

### CI/CD Pipeline

```yaml
# .github/workflows/performance.yml
name: Performance Monitoring
on: [pull_request]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: npm install
      - run: npm run build
      - run: npm run start &
      - run: npx @lhci/cli@0.12.x autorun
      
  bundle-analysis:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: npm install
      - run: npm run analyze
      - run: npm run check-budgets
```
