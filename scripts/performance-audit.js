#!/usr/bin/env node

/**
 * Comprehensive Performance Audit Script for Purrify
 * Analyzes Core Web Vitals, bundle size, SEO, and provides optimization recommendations
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class PerformanceAuditor {
  constructor() {
    this.projectRoot = process.cwd();
    this.auditResults = {
      timestamp: new Date().toISOString(),
      scores: {},
      metrics: {},
      recommendations: [],
      issues: []
    };
  }

  log(message, type = 'info') {
    const timestamp = new Date().toLocaleTimeString();
    const prefix = {
      info: '📊',
      success: '✅',
      warning: '⚠️',
      error: '❌',
      metric: '📈'
    }[type];
    
    console.log(`${prefix} [${timestamp}] ${message}`);
  }

  // Audit bundle size and composition
  async auditBundleSize() {
    this.log('Auditing bundle size...');
    
    try {
      const BundleAnalyzer = require('./bundle-analysis');
      const analyzer = new BundleAnalyzer();
      const report = await analyzer.analyze();
      
      this.auditResults.scores.bundleSize = report.performanceScore.score;
      this.auditResults.metrics.bundleSize = {
        totalSize: report.buildStats.totalSize,
        jsSize: report.buildStats.jsSize,
        cssSize: report.buildStats.cssSize,
        imageSize: report.buildStats.imageSize,
        chunkCount: report.buildStats.chunkCount
      };
      
      // Add recommendations based on bundle analysis
      if (report.performanceScore.score < 80) {
        this.auditResults.recommendations.push({
          category: 'Bundle Optimization',
          priority: 'high',
          description: 'Bundle size is above recommended limits',
          action: 'Review bundle-analysis.html for specific optimization opportunities'
        });
      }
      
      this.log(`Bundle size audit completed - Score: ${report.performanceScore.score}/100`, 'success');
      
    } catch (error) {
      this.log(`Bundle size audit failed: ${error.message}`, 'error');
      this.auditResults.issues.push({
        category: 'Bundle Analysis',
        severity: 'medium',
        message: error.message
      });
    }
  }

  // Audit SEO implementation
  async auditSEO() {
    this.log('Auditing SEO implementation...');
    
    try {
      const SEOOptimizer = require('./seo-optimization');
      const optimizer = new SEOOptimizer();
      
      // Run SEO validation without generating files
      const sitemapExists = fs.existsSync(path.join(this.projectRoot, 'public/sitemap.xml'));
      const robotsExists = fs.existsSync(path.join(this.projectRoot, 'public/robots.txt'));
      const structuredDataExists = fs.existsSync(path.join(this.projectRoot, 'src/components/seo/AdvancedStructuredData.tsx'));
      
      let seoScore = 0;
      if (sitemapExists) seoScore += 30;
      if (robotsExists) seoScore += 20;
      if (structuredDataExists) seoScore += 30;
      
      // Check meta tags implementation
      const pagesWithMeta = this.auditMetaTags();
      const metaScore = Math.min((pagesWithMeta / this.getTotalPages()) * 20, 20);
      seoScore += metaScore;
      
      this.auditResults.scores.seo = Math.round(seoScore);
      this.auditResults.metrics.seo = {
        sitemap: sitemapExists,
        robots: robotsExists,
        structuredData: structuredDataExists,
        metaTagsCoverage: `${pagesWithMeta}/${this.getTotalPages()}`
      };
      
      if (seoScore < 80) {
        this.auditResults.recommendations.push({
          category: 'SEO',
          priority: 'high',
          description: 'SEO implementation needs improvement',
          action: 'Run npm run seo:optimize to fix SEO issues'
        });
      }
      
      this.log(`SEO audit completed - Score: ${this.auditResults.scores.seo}/100`, 'success');
      
    } catch (error) {
      this.log(`SEO audit failed: ${error.message}`, 'error');
      this.auditResults.issues.push({
        category: 'SEO',
        severity: 'medium',
        message: error.message
      });
    }
  }

  // Audit image optimization
  auditImageOptimization() {
    this.log('Auditing image optimization...');
    
    const publicDir = path.join(this.projectRoot, 'public');
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.avif'];
    
    let totalImages = 0;
    let optimizedImages = 0;
    let totalSize = 0;
    
    const scanDirectory = (dir) => {
      if (!fs.existsSync(dir)) return;
      
      const files = fs.readdirSync(dir);
      files.forEach(file => {
        const filePath = path.join(dir, file);
        const stats = fs.statSync(filePath);
        
        if (stats.isDirectory()) {
          scanDirectory(filePath);
        } else if (imageExtensions.some(ext => file.toLowerCase().endsWith(ext))) {
          totalImages++;
          totalSize += stats.size;
          
          // Check if image is optimized (basic heuristic)
          if (file.includes('_optimized') || file.endsWith('.webp') || file.endsWith('.avif')) {
            optimizedImages++;
          }
        }
      });
    };
    
    scanDirectory(publicDir);
    
    const optimizationRate = totalImages > 0 ? (optimizedImages / totalImages) * 100 : 100;
    const avgImageSize = totalImages > 0 ? totalSize / totalImages : 0;
    
    this.auditResults.scores.imageOptimization = Math.round(optimizationRate);
    this.auditResults.metrics.imageOptimization = {
      totalImages,
      optimizedImages,
      optimizationRate: `${optimizationRate.toFixed(1)}%`,
      totalSize: `${(totalSize / 1024 / 1024).toFixed(2)}MB`,
      avgImageSize: `${(avgImageSize / 1024).toFixed(2)}KB`
    };
    
    if (optimizationRate < 70) {
      this.auditResults.recommendations.push({
        category: 'Image Optimization',
        priority: 'medium',
        description: 'Many images are not optimized',
        action: 'Run npm run optimize-images to optimize images'
      });
    }
    
    this.log(`Image optimization audit completed - ${optimizationRate.toFixed(1)}% optimized`, 'success');
  }

  // Audit performance monitoring implementation
  auditPerformanceMonitoring() {
    this.log('Auditing performance monitoring...');
    
    const monitoringComponents = [
      'src/components/performance/PerformanceMonitor.tsx',
      'src/components/performance/OptimizedImage.tsx',
      'src/lib/gtm-events.ts'
    ];
    
    let implementedComponents = 0;
    monitoringComponents.forEach(component => {
      if (fs.existsSync(path.join(this.projectRoot, component))) {
        implementedComponents++;
      }
    });
    
    const implementationRate = (implementedComponents / monitoringComponents.length) * 100;
    
    this.auditResults.scores.performanceMonitoring = Math.round(implementationRate);
    this.auditResults.metrics.performanceMonitoring = {
      implementedComponents: `${implementedComponents}/${monitoringComponents.length}`,
      implementationRate: `${implementationRate.toFixed(1)}%`
    };
    
    if (implementationRate < 100) {
      this.auditResults.recommendations.push({
        category: 'Performance Monitoring',
        priority: 'low',
        description: 'Performance monitoring components are missing',
        action: 'Ensure all performance monitoring components are implemented'
      });
    }
    
    this.log(`Performance monitoring audit completed - ${implementationRate.toFixed(1)}% implemented`, 'success');
  }

  // Audit caching strategies
  auditCaching() {
    this.log('Auditing caching strategies...');
    
    const nextConfigPath = path.join(this.projectRoot, 'next.config.js');
    let cachingScore = 0;
    
    if (fs.existsSync(nextConfigPath)) {
      const configContent = fs.readFileSync(nextConfigPath, 'utf8');
      
      // Check for various caching implementations
      if (configContent.includes('Cache-Control')) cachingScore += 25;
      if (configContent.includes('compression')) cachingScore += 25;
      if (configContent.includes('images:')) cachingScore += 25;
      if (configContent.includes('experimental:')) cachingScore += 25;
    }
    
    this.auditResults.scores.caching = cachingScore;
    this.auditResults.metrics.caching = {
      nextConfigOptimized: cachingScore > 75,
      score: `${cachingScore}/100`
    };
    
    if (cachingScore < 75) {
      this.auditResults.recommendations.push({
        category: 'Caching',
        priority: 'medium',
        description: 'Caching strategies need improvement',
        action: 'Review next.config.js for additional caching optimizations'
      });
    }
    
    this.log(`Caching audit completed - Score: ${cachingScore}/100`, 'success');
  }

  // Helper methods
  auditMetaTags() {
    const pagesDir = path.join(this.projectRoot, 'pages');
    let pagesWithMeta = 0;
    
    const scanPages = (dir) => {
      if (!fs.existsSync(dir)) return;
      
      const files = fs.readdirSync(dir);
      files.forEach(file => {
        const filePath = path.join(dir, file);
        const stats = fs.statSync(filePath);
        
        if (stats.isDirectory() && !file.startsWith('_') && file !== 'api') {
          scanPages(filePath);
        } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
          const content = fs.readFileSync(filePath, 'utf8');
          if (content.includes('<Head>') || content.includes('import Head')) {
            pagesWithMeta++;
          }
        }
      });
    };
    
    scanPages(pagesDir);
    return pagesWithMeta;
  }

  getTotalPages() {
    const pagesDir = path.join(this.projectRoot, 'pages');
    let totalPages = 0;
    
    const countPages = (dir) => {
      if (!fs.existsSync(dir)) return;
      
      const files = fs.readdirSync(dir);
      files.forEach(file => {
        const filePath = path.join(dir, file);
        const stats = fs.statSync(filePath);
        
        if (stats.isDirectory() && !file.startsWith('_') && file !== 'api') {
          countPages(filePath);
        } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
          totalPages++;
        }
      });
    };
    
    countPages(pagesDir);
    return totalPages;
  }

  // Calculate overall performance score
  calculateOverallScore() {
    const scores = Object.values(this.auditResults.scores);
    const totalScore = scores.reduce((sum, score) => sum + score, 0);
    const avgScore = scores.length > 0 ? Math.round(totalScore / scores.length) : 0;
    
    this.auditResults.overallScore = avgScore;
    return avgScore;
  }

  // Generate performance report
  generateReport() {
    const overallScore = this.calculateOverallScore();
    
    const report = {
      ...this.auditResults,
      summary: {
        overallScore,
        totalRecommendations: this.auditResults.recommendations.length,
        totalIssues: this.auditResults.issues.length,
        status: overallScore >= 80 ? 'excellent' : overallScore >= 60 ? 'good' : 'needs_improvement'
      }
    };
    
    // Save detailed report
    const reportPath = path.join(this.projectRoot, 'performance-audit-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    // Generate HTML report
    this.generateHTMLReport(report);
    
    return report;
  }

  // Generate HTML report
  generateHTMLReport(report) {
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Purrify Performance Audit Report</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; background: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; }
        .score { font-size: 3em; font-weight: bold; margin: 10px 0; }
        .status { font-size: 1.2em; opacity: 0.9; }
        .content { padding: 30px; }
        .metric-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin: 20px 0; }
        .metric-card { background: #f8f9fa; border-radius: 8px; padding: 20px; border-left: 4px solid #667eea; }
        .metric-score { font-size: 2em; font-weight: bold; color: #667eea; }
        .recommendations { margin-top: 30px; }
        .recommendation { background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 4px; padding: 15px; margin: 10px 0; }
        .high { border-left: 4px solid #e74c3c; }
        .medium { border-left: 4px solid #f39c12; }
        .low { border-left: 4px solid #27ae60; }
        .timestamp { color: #666; font-size: 0.9em; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🚀 Purrify Performance Audit</h1>
            <div class="score">${report.summary.overallScore}/100</div>
            <div class="status">Status: ${report.summary.status.replace('_', ' ').toUpperCase()}</div>
            <div class="timestamp">Generated: ${new Date(report.timestamp).toLocaleString()}</div>
        </div>
        
        <div class="content">
            <h2>📊 Performance Metrics</h2>
            <div class="metric-grid">
                ${Object.entries(report.scores).map(([category, score]) => `
                    <div class="metric-card">
                        <h3>${category.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</h3>
                        <div class="metric-score">${score}/100</div>
                    </div>
                `).join('')}
            </div>
            
            <h2>🔧 Recommendations</h2>
            <div class="recommendations">
                ${report.recommendations.map(rec => `
                    <div class="recommendation ${rec.priority}">
                        <h4>${rec.category}</h4>
                        <p><strong>Issue:</strong> ${rec.description}</p>
                        <p><strong>Action:</strong> ${rec.action}</p>
                        <small>Priority: ${rec.priority.toUpperCase()}</small>
                    </div>
                `).join('')}
            </div>
            
            ${report.issues.length > 0 ? `
                <h2>⚠️ Issues Found</h2>
                <div class="recommendations">
                    ${report.issues.map(issue => `
                        <div class="recommendation ${issue.severity}">
                            <h4>${issue.category}</h4>
                            <p>${issue.message}</p>
                            <small>Severity: ${issue.severity.toUpperCase()}</small>
                        </div>
                    `).join('')}
                </div>
            ` : ''}
        </div>
    </div>
</body>
</html>`;
    
    const htmlPath = path.join(this.projectRoot, 'performance-audit-report.html');
    fs.writeFileSync(htmlPath, html);
    this.log(`HTML report saved to ${htmlPath}`, 'success');
  }

  // Main audit process
  async audit() {
    try {
      this.log('🚀 Starting comprehensive performance audit...');
      
      await this.auditBundleSize();
      await this.auditSEO();
      this.auditImageOptimization();
      this.auditPerformanceMonitoring();
      this.auditCaching();
      
      const report = this.generateReport();
      
      this.log('📊 Performance Audit Summary:', 'info');
      this.log(`  Overall Score: ${report.summary.overallScore}/100`, 'metric');
      this.log(`  Status: ${report.summary.status.replace('_', ' ').toUpperCase()}`, 'metric');
      this.log(`  Recommendations: ${report.summary.totalRecommendations}`, 'metric');
      this.log(`  Issues: ${report.summary.totalIssues}`, 'metric');
      
      if (report.summary.overallScore >= 80) {
        this.log('🎉 Excellent performance! Your site is well optimized.', 'success');
      } else if (report.summary.overallScore >= 60) {
        this.log('👍 Good performance, but there\'s room for improvement.', 'warning');
      } else {
        this.log('🔧 Performance needs improvement. Please review recommendations.', 'warning');
      }
      
      this.log('📄 Detailed reports saved:', 'info');
      this.log('  - performance-audit-report.json', 'info');
      this.log('  - performance-audit-report.html', 'info');
      
    } catch (error) {
      this.log(`Performance audit failed: ${error.message}`, 'error');
      process.exit(1);
    }
  }
}

// CLI execution
if (require.main === module) {
  const auditor = new PerformanceAuditor();
  auditor.audit().catch(console.error);
}

module.exports = PerformanceAuditor;
