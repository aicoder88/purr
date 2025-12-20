#!/usr/bin/env node

/**
 * Cache Optimization Script for Purrify
 * Analyzes and optimizes caching strategies across the application
 */

const fs = require('node:fs');
const path = require('node:path');

class CacheOptimizationAnalyzer {
  constructor() {
    this.projectRoot = process.cwd();
    this.cacheReport = {
      timestamp: new Date().toISOString(),
      strategies: {},
      recommendations: [],
      performance: {},
      configuration: {}
    };
  }

  log(message, type = 'info') {
    const timestamp = new Date().toLocaleTimeString();
    const prefix = {
      info: '🔧',
      success: '✅',
      warning: '⚠️',
      error: '❌'
    }[type];

    console.log(`${prefix} [${timestamp}] ${message}`);
  }

  // Analyze current caching configuration
  analyzeCacheConfig() {
    this.log('Analyzing cache configuration...');

    const nextConfigPath = path.join(this.projectRoot, 'next.config.js');

    if (fs.existsSync(nextConfigPath)) {
      const configContent = fs.readFileSync(nextConfigPath, 'utf8');

      // Analyze headers configuration
      const hasStaticCaching = configContent.includes('/_next/static/');
      const hasImageCaching = configContent.includes('/_next/image');
      const hasApiCaching = configContent.includes('/api/');
      const hasCompressionEnabled = configContent.includes('compression: true');
      const hasAdvancedCaching = configContent.includes('isrMemoryCacheSize');

      this.cacheReport.configuration = {
        staticAssetCaching: hasStaticCaching,
        imageCaching: hasImageCaching,
        apiCaching: hasApiCaching,
        compressionEnabled: hasCompressionEnabled,
        advancedCachingEnabled: hasAdvancedCaching,
        configurationScore: this.calculateConfigScore({
          hasStaticCaching,
          hasImageCaching,
          hasApiCaching,
          hasCompressionEnabled,
          hasAdvancedCaching
        })
      };

      this.log(`Configuration score: ${this.cacheReport.configuration.configurationScore}/100`, 'success');
    } else {
      this.log('next.config.js not found', 'warning');
    }
  }

  // Calculate configuration score
  calculateConfigScore(config) {
    let score = 0;
    if (config.hasStaticCaching) score += 25;
    if (config.hasImageCaching) score += 20;
    if (config.hasApiCaching) score += 20;
    if (config.hasCompressionEnabled) score += 15;
    if (config.hasAdvancedCachingEnabled) score += 20;
    return score;
  }

  // Analyze service worker caching
  analyzeServiceWorkerCache() {
    this.log('Analyzing service worker cache...');

    const swPath = path.join(this.projectRoot, 'public/sw.js');

    if (fs.existsSync(swPath)) {
      const swContent = fs.readFileSync(swPath, 'utf8');

      const hasCacheFirst = swContent.includes('cache-first');
      const hasNetworkFirst = swContent.includes('network-first');
      const hasStaleWhileRevalidate = swContent.includes('stale-while-revalidate');
      const hasBackgroundSync = swContent.includes('background-sync');

      this.cacheReport.strategies.serviceWorker = {
        implemented: true,
        cacheFirst: hasCacheFirst,
        networkFirst: hasNetworkFirst,
        staleWhileRevalidate: hasStaleWhileRevalidate,
        backgroundSync: hasBackgroundSync,
        score: this.calculateSWScore({
          hasCacheFirst,
          hasNetworkFirst,
          hasStaleWhileRevalidate,
          hasBackgroundSync
        })
      };

      this.log(`Service Worker score: ${this.cacheReport.strategies.serviceWorker.score}/100`, 'success');
    } else {
      this.cacheReport.strategies.serviceWorker = {
        implemented: false,
        score: 0
      };
      this.log('Service Worker not found', 'warning');
    }
  }

  calculateSWScore(config) {
    let score = 20; // Base score for having SW
    if (config.hasCacheFirst) score += 20;
    if (config.hasNetworkFirst) score += 20;
    if (config.hasStaleWhileRevalidate) score += 20;
    if (config.hasBackgroundSync) score += 20;
    return score;
  }

  // Analyze client-side caching
  analyzeClientSideCache() {
    this.log('Analyzing client-side cache implementation...');

    const cacheOptimizerPath = path.join(this.projectRoot, 'src/components/performance/CacheOptimizer.tsx');
    const cacheUtilsPath = path.join(this.projectRoot, 'src/lib/cache-utils.ts');

    const hasCacheOptimizer = fs.existsSync(cacheOptimizerPath);
    const hasCacheUtils = fs.existsSync(cacheUtilsPath);

    this.cacheReport.strategies.clientSide = {
      cacheOptimizer: hasCacheOptimizer,
      cacheUtils: hasCacheUtils,
      score: (hasCacheOptimizer ? 50 : 0) + (hasCacheUtils ? 50 : 0)
    };

    this.log(`Client-side cache score: ${this.cacheReport.strategies.clientSide.score}/100`, 'success');
  }

  // Generate performance recommendations
  generateRecommendations() {
    this.log('Generating cache optimization recommendations...');

    const config = this.cacheReport.configuration;
    const sw = this.cacheReport.strategies.serviceWorker;
    const client = this.cacheReport.strategies.clientSide;

    // Configuration recommendations
    if (!config.staticAssetCaching) {
      this.cacheReport.recommendations.push({
        category: 'Configuration',
        priority: 'high',
        title: 'Enable static asset caching',
        description: 'Add cache headers for static assets in next.config.js',
        impact: 'High performance improvement for repeat visits'
      });
    }

    if (!config.imageCaching) {
      this.cacheReport.recommendations.push({
        category: 'Configuration',
        priority: 'high',
        title: 'Enable image caching',
        description: 'Configure aggressive caching for optimized images',
        impact: 'Significant bandwidth savings and faster image loading'
      });
    }

    if (!config.compressionEnabled) {
      this.cacheReport.recommendations.push({
        category: 'Configuration',
        priority: 'medium',
        title: 'Enable compression',
        description: 'Add gzip/brotli compression for text assets',
        impact: 'Reduced bandwidth usage and faster loading'
      });
    }

    // Service Worker recommendations
    if (!sw.implemented) {
      this.cacheReport.recommendations.push({
        category: 'Service Worker',
        priority: 'high',
        title: 'Implement Service Worker caching',
        description: 'Add service worker for offline functionality and advanced caching',
        impact: 'Offline support and improved performance'
      });
    }

    if (sw.implemented && sw.score < 80) {
      this.cacheReport.recommendations.push({
        category: 'Service Worker',
        priority: 'medium',
        title: 'Enhance Service Worker strategies',
        description: 'Implement more sophisticated caching strategies',
        impact: 'Better cache hit rates and performance'
      });
    }

    // Client-side recommendations
    if (!client.cacheOptimizer) {
      this.cacheReport.recommendations.push({
        category: 'Client-side',
        priority: 'medium',
        title: 'Implement client-side cache optimizer',
        description: 'Add intelligent client-side caching for API responses',
        impact: 'Reduced API calls and faster user interactions'
      });
    }

    this.log(`Generated ${this.cacheReport.recommendations.length} recommendations`, 'success');
  }

  // Calculate overall performance score
  calculateOverallScore() {
    const configScore = this.cacheReport.configuration.configurationScore || 0;
    const swScore = this.cacheReport.strategies.serviceWorker.score || 0;
    const clientScore = this.cacheReport.strategies.clientSide.score || 0;

    const overallScore = Math.round((configScore + swScore + clientScore) / 3);

    this.cacheReport.performance.overallScore = overallScore;
    this.cacheReport.performance.breakdown = {
      configuration: configScore,
      serviceWorker: swScore,
      clientSide: clientScore
    };

    return overallScore;
  }

  // Generate HTML report
  generateHTMLReport() {
    const overallScore = this.calculateOverallScore();

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Purrify Cache Optimization Report</title>
    <style>
        body { font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; background: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; }
        .score { font-size: 3em; font-weight: bold; margin: 10px 0; }
        .content { padding: 30px; }
        .section { margin: 30px 0; }
        .metric-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin: 20px 0; }
        .metric-card { background: #f8f9fa; border-radius: 8px; padding: 20px; border-left: 4px solid #667eea; }
        .recommendation { background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 4px; padding: 15px; margin: 10px 0; }
        .high { border-left: 4px solid #e74c3c; }
        .medium { border-left: 4px solid #f39c12; }
        .low { border-left: 4px solid #27ae60; }
        .score-bar { width: 100%; height: 20px; background: #eee; border-radius: 10px; overflow: hidden; }
        .score-fill { height: 100%; background: linear-gradient(90deg, #e74c3c 0%, #f39c12 50%, #27ae60 100%); transition: width 0.3s; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🚀 Cache Optimization Report</h1>
            <div class="score">${overallScore}/100</div>
            <div class="score-bar">
                <div class="score-fill" style="width: ${overallScore}%"></div>
            </div>
            <p>Generated: ${new Date(this.cacheReport.timestamp).toLocaleString()}</p>
        </div>
        
        <div class="content">
            <div class="section">
                <h2>📊 Performance Breakdown</h2>
                <div class="metric-grid">
                    <div class="metric-card">
                        <h3>Configuration</h3>
                        <div class="score">${this.cacheReport.performance.breakdown.configuration}/100</div>
                        <p>Next.js cache headers and settings</p>
                    </div>
                    <div class="metric-card">
                        <h3>Service Worker</h3>
                        <div class="score">${this.cacheReport.performance.breakdown.serviceWorker}/100</div>
                        <p>Offline caching strategies</p>
                    </div>
                    <div class="metric-card">
                        <h3>Client-side</h3>
                        <div class="score">${this.cacheReport.performance.breakdown.clientSide}/100</div>
                        <p>Browser cache optimization</p>
                    </div>
                </div>
            </div>
            
            <div class="section">
                <h2>🔧 Recommendations</h2>
                ${this.cacheReport.recommendations.map(rec => `
                    <div class="recommendation ${rec.priority}">
                        <h4>${rec.title}</h4>
                        <p><strong>Category:</strong> ${rec.category}</p>
                        <p><strong>Description:</strong> ${rec.description}</p>
                        <p><strong>Impact:</strong> ${rec.impact}</p>
                        <small>Priority: ${rec.priority.toUpperCase()}</small>
                    </div>
                `).join('')}
            </div>
            
            <div class="section">
                <h2>📈 Implementation Status</h2>
                <ul>
                    <li>Static Asset Caching: ${this.cacheReport.configuration.staticAssetCaching ? '✅' : '❌'}</li>
                    <li>Image Caching: ${this.cacheReport.configuration.imageCaching ? '✅' : '❌'}</li>
                    <li>API Caching: ${this.cacheReport.configuration.apiCaching ? '✅' : '❌'}</li>
                    <li>Compression: ${this.cacheReport.configuration.compressionEnabled ? '✅' : '❌'}</li>
                    <li>Service Worker: ${this.cacheReport.strategies.serviceWorker.implemented ? '✅' : '❌'}</li>
                    <li>Client-side Cache: ${this.cacheReport.strategies.clientSide.cacheOptimizer ? '✅' : '❌'}</li>
                </ul>
            </div>
        </div>
    </div>
</body>
</html>`;

    const reportPath = path.join(this.projectRoot, 'cache-optimization-report.html');
    fs.writeFileSync(reportPath, html);
    this.log(`HTML report saved to ${reportPath}`, 'success');
  }

  // Main analysis process
  async analyze() {
    try {
      this.log('🚀 Starting cache optimization analysis...');

      this.analyzeCacheConfig();
      this.analyzeServiceWorkerCache();
      this.analyzeClientSideCache();
      this.generateRecommendations();

      const overallScore = this.calculateOverallScore();

      // Save JSON report
      const jsonPath = path.join(this.projectRoot, 'cache-optimization-report.json');
      fs.writeFileSync(jsonPath, JSON.stringify(this.cacheReport, null, 2));

      // Generate HTML report
      this.generateHTMLReport();

      this.log('📊 Cache Optimization Summary:', 'info');
      this.log(`  Overall Score: ${overallScore}/100`, 'info');
      this.log(`  Configuration: ${this.cacheReport.performance.breakdown.configuration}/100`, 'info');
      this.log(`  Service Worker: ${this.cacheReport.performance.breakdown.serviceWorker}/100`, 'info');
      this.log(`  Client-side: ${this.cacheReport.performance.breakdown.clientSide}/100`, 'info');
      this.log(`  Recommendations: ${this.cacheReport.recommendations.length}`, 'info');

      if (overallScore >= 80) {
        this.log('🎉 Excellent cache optimization!', 'success');
      } else if (overallScore >= 60) {
        this.log('👍 Good cache optimization, room for improvement.', 'warning');
      } else {
        this.log('🔧 Cache optimization needs attention.', 'warning');
      }

      this.log('📄 Reports saved:', 'info');
      this.log('  - cache-optimization-report.json', 'info');
      this.log('  - cache-optimization-report.html', 'info');

    } catch (error) {
      this.log(`Cache analysis failed: ${error.message}`, 'error');
      process.exit(1);
    }
  }
}

// CLI execution
if (require.main === module) {
  const analyzer = new CacheOptimizationAnalyzer();
  analyzer.analyze().catch(console.error);
}

module.exports = CacheOptimizationAnalyzer;
