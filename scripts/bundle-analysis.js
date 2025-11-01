#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * Comprehensive Bundle Analysis Script for Purrify
 * Analyzes bundle size, dependencies, and performance metrics
 */

class BundleAnalyzer {
  constructor() {
    this.projectRoot = process.cwd();
    this.buildDir = path.join(this.projectRoot, '.next');
    this.outputDir = path.join(this.projectRoot, 'reports');
    this.thresholds = {
      totalBundleSize: 500 * 1024, // 500KB
      chunkSize: 200 * 1024, // 200KB
      firstLoadJS: 130 * 1024, // 130KB (Next.js recommendation)
      imageSize: 100 * 1024, // 100KB per image
      unusedDependencies: 10 // Max 10 unused deps
    };
  }

  // Ensure output directory exists
  ensureOutputDir() {
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
  }

  // Run Next.js bundle analyzer
  async runBundleAnalyzer() {
    console.log('🔍 Running Next.js Bundle Analyzer...');
    
    try {
      // Set environment variable for bundle analysis
      process.env.ANALYZE = 'true';
      
      // Build with bundle analyzer
      execSync('npm run build', { 
        stdio: 'inherit',
        env: { ...process.env, ANALYZE: 'true' }
      });
      
      console.log('✅ Bundle analysis complete. Check the generated HTML files.');
    } catch (error) {
      console.error('❌ Bundle analysis failed:', error.message);
    }
  }

  // Analyze build output
  analyzeBuildOutput() {
    console.log('📊 Analyzing build output...');
    
    const buildManifest = path.join(this.buildDir, 'build-manifest.json');
    const pagesManifest = path.join(this.buildDir, 'server/pages-manifest.json');
    
    let analysis = {
      timestamp: new Date().toISOString(),
      totalPages: 0,
      totalChunks: 0,
      largestChunks: [],
      firstLoadJS: 0,
      warnings: [],
      recommendations: []
    };

    try {
      // Analyze build manifest
      if (fs.existsSync(buildManifest)) {
        const manifest = JSON.parse(fs.readFileSync(buildManifest, 'utf8'));
        analysis.totalPages = Object.keys(manifest.pages).length;
        
        // Calculate first load JS size
        const sharedFiles = manifest.pages['/'] || [];
        let firstLoadSize = 0;
        
        sharedFiles.forEach(file => {
          const filePath = path.join(this.buildDir, 'static', file);
          if (fs.existsSync(filePath)) {
            firstLoadSize += fs.statSync(filePath).size;
          }
        });
        
        analysis.firstLoadJS = firstLoadSize;
        
        if (firstLoadSize > this.thresholds.firstLoadJS) {
          analysis.warnings.push({
            type: 'LARGE_FIRST_LOAD',
            message: `First Load JS (${(firstLoadSize / 1024).toFixed(1)}KB) exceeds recommended ${(this.thresholds.firstLoadJS / 1024).toFixed(1)}KB`,
            severity: 'high'
          });
        }
      }

      // Analyze static chunks
      const staticDir = path.join(this.buildDir, 'static/chunks');
      if (fs.existsSync(staticDir)) {
        const chunks = fs.readdirSync(staticDir);
        analysis.totalChunks = chunks.length;
        
        const chunkSizes = chunks.map(chunk => {
          const chunkPath = path.join(staticDir, chunk);
          const stats = fs.statSync(chunkPath);
          return {
            name: chunk,
            size: stats.size,
            sizeKB: (stats.size / 1024).toFixed(1)
          };
        }).sort((a, b) => b.size - a.size);
        
        analysis.largestChunks = chunkSizes.slice(0, 10);
        
        // Check for oversized chunks
        chunkSizes.forEach(chunk => {
          if (chunk.size > this.thresholds.chunkSize) {
            analysis.warnings.push({
              type: 'LARGE_CHUNK',
              message: `Chunk ${chunk.name} (${chunk.sizeKB}KB) exceeds recommended ${(this.thresholds.chunkSize / 1024).toFixed(1)}KB`,
              severity: 'medium'
            });
          }
        });
      }

    } catch (error) {
      console.error('Error analyzing build output:', error);
    }

    return analysis;
  }

  // Analyze dependencies
  analyzeDependencies() {
    console.log('📦 Analyzing dependencies...');
    
    const packageJson = path.join(this.projectRoot, 'package.json');
    const packageLock = path.join(this.projectRoot, 'package-lock.json');
    
    let depAnalysis = {
      totalDependencies: 0,
      totalDevDependencies: 0,
      heavyDependencies: [],
      unusedDependencies: [],
      duplicateDependencies: [],
      securityIssues: []
    };

    try {
      const pkg = JSON.parse(fs.readFileSync(packageJson, 'utf8'));
      depAnalysis.totalDependencies = Object.keys(pkg.dependencies || {}).length;
      depAnalysis.totalDevDependencies = Object.keys(pkg.devDependencies || {}).length;

      // Analyze heavy dependencies
      const heavyDeps = [
        '@next/bundle-analyzer',
        'next',
        'react',
        'react-dom',
        '@radix-ui/react-dialog',
        'lucide-react'
      ];

      heavyDeps.forEach(dep => {
        if (pkg.dependencies && pkg.dependencies[dep]) {
          depAnalysis.heavyDependencies.push({
            name: dep,
            version: pkg.dependencies[dep]
          });
        }
      });

      // Check for potential unused dependencies (basic check)
      const srcDir = path.join(this.projectRoot, 'src');
      const pagesDir = path.join(this.projectRoot, 'pages');
      
      if (fs.existsSync(srcDir) || fs.existsSync(pagesDir)) {
        const allDeps = { ...pkg.dependencies, ...pkg.devDependencies };
        const unusedCandidates = [];
        
        Object.keys(allDeps).forEach(dep => {
          // Skip certain deps that might not be directly imported
          const skipDeps = ['next', '@types/', 'eslint', 'typescript', 'tailwindcss'];
          if (skipDeps.some(skip => dep.includes(skip))) return;
          
          try {
            const grepResult = execSync(`grep -r "from '${dep}'" src/ pages/ 2>/dev/null || true`, { encoding: 'utf8' });
            const importResult = execSync(`grep -r "import.*${dep}" src/ pages/ 2>/dev/null || true`, { encoding: 'utf8' });
            
            if (!grepResult.trim() && !importResult.trim()) {
              unusedCandidates.push(dep);
            }
          } catch (error) {
            // Ignore grep errors
          }
        });
        
        depAnalysis.unusedDependencies = unusedCandidates.slice(0, 10); // Limit output
      }

    } catch (error) {
      console.error('Error analyzing dependencies:', error);
    }

    return depAnalysis;
  }

  // Analyze images
  analyzeImages() {
    console.log('🖼️ Analyzing images...');
    
    const publicDir = path.join(this.projectRoot, 'public');
    let imageAnalysis = {
      totalImages: 0,
      totalSize: 0,
      largeImages: [],
      unoptimizedImages: [],
      recommendations: []
    };

    try {
      const analyzeDirectory = (dir, relativePath = '') => {
        const items = fs.readdirSync(dir);
        
        items.forEach(item => {
          const fullPath = path.join(dir, item);
          const stats = fs.statSync(fullPath);
          
          if (stats.isDirectory()) {
            analyzeDirectory(fullPath, path.join(relativePath, item));
          } else if (stats.isFile()) {
            const ext = path.extname(item).toLowerCase();
            const imageExts = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif', '.svg'];
            
            if (imageExts.includes(ext)) {
              imageAnalysis.totalImages++;
              imageAnalysis.totalSize += stats.size;
              
              const imageInfo = {
                path: path.join(relativePath, item),
                size: stats.size,
                sizeKB: (stats.size / 1024).toFixed(1),
                format: ext.substring(1)
              };
              
              // Check for large images
              if (stats.size > this.thresholds.imageSize) {
                imageAnalysis.largeImages.push(imageInfo);
              }
              
              // Check for unoptimized formats
              if (['.jpg', '.jpeg', '.png'].includes(ext) && stats.size > 50 * 1024) {
                imageAnalysis.unoptimizedImages.push({
                  ...imageInfo,
                  suggestion: 'Consider converting to WebP or AVIF format'
                });
              }
            }
          }
        });
      };

      if (fs.existsSync(publicDir)) {
        analyzeDirectory(publicDir);
      }

      // Generate recommendations
      if (imageAnalysis.largeImages.length > 0) {
        imageAnalysis.recommendations.push({
          type: 'LARGE_IMAGES',
          message: `Found ${imageAnalysis.largeImages.length} images larger than ${(this.thresholds.imageSize / 1024).toFixed(1)}KB`,
          action: 'Consider compressing or using Next.js Image optimization'
        });
      }

      if (imageAnalysis.unoptimizedImages.length > 0) {
        imageAnalysis.recommendations.push({
          type: 'UNOPTIMIZED_FORMATS',
          message: `Found ${imageAnalysis.unoptimizedImages.length} images that could be optimized`,
          action: 'Convert to modern formats (WebP/AVIF) and use responsive images'
        });
      }

    } catch (error) {
      console.error('Error analyzing images:', error);
    }

    return imageAnalysis;
  }

  // Generate performance score
  calculatePerformanceScore(buildAnalysis, depAnalysis, imageAnalysis) {
    let score = 100;
    const issues = [];

    // Bundle size penalties
    if (buildAnalysis.firstLoadJS > this.thresholds.firstLoadJS) {
      const penalty = Math.min(20, (buildAnalysis.firstLoadJS - this.thresholds.firstLoadJS) / 1024);
      score -= penalty;
      issues.push(`Large first load JS bundle (-${penalty.toFixed(1)} points)`);
    }

    // Large chunks penalty
    const largeChunks = buildAnalysis.largestChunks.filter(chunk => chunk.size > this.thresholds.chunkSize);
    if (largeChunks.length > 0) {
      const penalty = Math.min(15, largeChunks.length * 3);
      score -= penalty;
      issues.push(`${largeChunks.length} oversized chunks (-${penalty} points)`);
    }

    // Dependencies penalty
    if (depAnalysis.unusedDependencies.length > this.thresholds.unusedDependencies) {
      const penalty = Math.min(10, depAnalysis.unusedDependencies.length - this.thresholds.unusedDependencies);
      score -= penalty;
      issues.push(`Potential unused dependencies (-${penalty} points)`);
    }

    // Images penalty
    if (imageAnalysis.largeImages.length > 0) {
      const penalty = Math.min(15, imageAnalysis.largeImages.length * 2);
      score -= penalty;
      issues.push(`${imageAnalysis.largeImages.length} large images (-${penalty} points)`);
    }

    return {
      score: Math.max(0, Math.round(score)),
      grade: score >= 90 ? 'A' : score >= 80 ? 'B' : score >= 70 ? 'C' : score >= 60 ? 'D' : 'F',
      issues
    };
  }

  // Generate comprehensive report
  generateReport(buildAnalysis, depAnalysis, imageAnalysis, performanceScore) {
    const report = {
      metadata: {
        timestamp: new Date().toISOString(),
        projectName: 'Purrify',
        nodeVersion: process.version,
        nextVersion: this.getNextVersion()
      },
      performanceScore,
      buildAnalysis,
      dependencyAnalysis: depAnalysis,
      imageAnalysis,
      recommendations: this.generateRecommendations(buildAnalysis, depAnalysis, imageAnalysis)
    };

    // Save JSON report
    const jsonPath = path.join(this.outputDir, 'bundle-analysis.json');
    fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2));

    // Generate HTML report
    this.generateHTMLReport(report);

    console.log("\n📋 Report generated:");
    console.log(`   JSON: ${jsonPath}`);
    console.log(`   HTML: ${path.join(this.outputDir, 'bundle-analysis.html')}`);

    return report;
  }

  // Get Next.js version
  getNextVersion() {
    try {
      const packageJson = path.join(this.projectRoot, 'package.json');
      const pkg = JSON.parse(fs.readFileSync(packageJson, 'utf8'));
      return pkg.dependencies?.next || pkg.devDependencies?.next || 'unknown';
    } catch {
      return 'unknown';
    }
  }

  // Generate recommendations
  generateRecommendations(buildAnalysis, depAnalysis, imageAnalysis) {
    const recommendations = [];

    // Bundle optimization
    if (buildAnalysis.firstLoadJS > this.thresholds.firstLoadJS) {
      recommendations.push({
        category: 'Bundle Optimization',
        priority: 'high',
        title: 'Reduce First Load JS Bundle Size',
        description: 'Your first load JS bundle is larger than recommended',
        actions: [
          'Enable tree shaking for unused code',
          'Use dynamic imports for non-critical components',
          'Consider code splitting strategies',
          'Review and optimize heavy dependencies'
        ]
      });
    }

    // Dependency optimization
    if (depAnalysis.unusedDependencies.length > 5) {
      recommendations.push({
        category: 'Dependencies',
        priority: 'medium',
        title: 'Remove Unused Dependencies',
        description: 'Several dependencies appear to be unused',
        actions: [
          'Review and remove unused packages',
          'Use bundle analyzer to identify heavy dependencies',
          'Consider lighter alternatives for heavy packages'
        ]
      });
    }

    // Image optimization
    if (imageAnalysis.largeImages.length > 0) {
      recommendations.push({
        category: 'Image Optimization',
        priority: 'high',
        title: 'Optimize Large Images',
        description: 'Several images are larger than recommended',
        actions: [
          'Use Next.js Image component for automatic optimization',
          'Convert images to modern formats (WebP, AVIF)',
          'Implement responsive images with proper sizes',
          'Compress images before uploading'
        ]
      });
    }

    return recommendations;
  }

  // Generate HTML report
  generateHTMLReport(report) {
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Purrify Bundle Analysis Report</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; background: white; border-radius: 8px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { text-align: center; margin-bottom: 30px; }
        .score { font-size: 3em; font-weight: bold; color: ${report.performanceScore.score >= 80 ? '#22c55e' : report.performanceScore.score >= 60 ? '#f59e0b' : '#ef4444'}; }
        .grade { font-size: 1.5em; margin-top: 10px; }
        .section { margin: 30px 0; }
        .section h2 { color: #374151; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px; }
        .metric { display: inline-block; margin: 10px 20px 10px 0; padding: 15px; background: #f9fafb; border-radius: 6px; min-width: 150px; }
        .metric-label { font-size: 0.9em; color: #6b7280; }
        .metric-value { font-size: 1.4em; font-weight: bold; color: #111827; }
        .warning { background: #fef3cd; border: 1px solid #fbbf24; border-radius: 4px; padding: 10px; margin: 10px 0; }
        .recommendation { background: #ecfdf5; border: 1px solid #10b981; border-radius: 4px; padding: 15px; margin: 15px 0; }
        .chunk-list { max-height: 300px; overflow-y: auto; }
        .chunk-item { display: flex; justify-content: space-between; padding: 8px; border-bottom: 1px solid #e5e7eb; }
        table { width: 100%; border-collapse: collapse; margin: 15px 0; }
        th, td { padding: 12px; text-align: left; border-bottom: 1px solid #e5e7eb; }
        th { background: #f9fafb; font-weight: 600; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🚀 Purrify Bundle Analysis Report</h1>
            <div class="score">${report.performanceScore.score}</div>
            <div class="grade">Grade: ${report.performanceScore.grade}</div>
            <p>Generated on ${new Date(report.metadata.timestamp).toLocaleString()}</p>
        </div>

        <div class="section">
            <h2>📊 Performance Overview</h2>
            <div class="metric">
                <div class="metric-label">Total Pages</div>
                <div class="metric-value">${report.buildAnalysis.totalPages}</div>
            </div>
            <div class="metric">
                <div class="metric-label">Total Chunks</div>
                <div class="metric-value">${report.buildAnalysis.totalChunks}</div>
            </div>
            <div class="metric">
                <div class="metric-label">First Load JS</div>
                <div class="metric-value">${(report.buildAnalysis.firstLoadJS / 1024).toFixed(1)}KB</div>
            </div>
            <div class="metric">
                <div class="metric-label">Total Dependencies</div>
                <div class="metric-value">${report.dependencyAnalysis.totalDependencies}</div>
            </div>
            <div class="metric">
                <div class="metric-label">Total Images</div>
                <div class="metric-value">${report.imageAnalysis.totalImages}</div>
            </div>
        </div>

        <div class="section">
            <h2>⚠️ Issues Found</h2>
            ${report.performanceScore.issues.map(issue => `<div class="warning">${issue}</div>`).join('')}
        </div>

        <div class="section">
            <h2>📦 Largest Chunks</h2>
            <div class="chunk-list">
                ${report.buildAnalysis.largestChunks.map(chunk => 
                    `<div class="chunk-item">
                        <span>${chunk.name}</span>
                        <span>${chunk.sizeKB}KB</span>
                    </div>`
                ).join('')}
            </div>
        </div>

        <div class="section">
            <h2>🎯 Recommendations</h2>
            ${report.recommendations.map(rec => 
                `<div class="recommendation">
                    <h3>${rec.title} (${rec.priority} priority)</h3>
                    <p>${rec.description}</p>
                    <ul>
                        ${rec.actions.map(action => `<li>${action}</li>`).join('')}
                    </ul>
                </div>`
            ).join('')}
        </div>
    </div>
</body>
</html>`;

    const htmlPath = path.join(this.outputDir, 'bundle-analysis.html');
    fs.writeFileSync(htmlPath, html);
  }

  // Main analysis function
  async analyze() {
    console.log('🚀 Starting Purrify Bundle Analysis...\n');
    
    this.ensureOutputDir();
    
    // Run all analyses
    const buildAnalysis = this.analyzeBuildOutput();
    const depAnalysis = this.analyzeDependencies();
    const imageAnalysis = this.analyzeImages();
    const performanceScore = this.calculatePerformanceScore(buildAnalysis, depAnalysis, imageAnalysis);
    
    // Generate report
    const report = this.generateReport(buildAnalysis, depAnalysis, imageAnalysis, performanceScore);
    
    // Print summary
    console.log(`\n🎯 Performance Score: ${performanceScore.score}/100 (${performanceScore.grade})`);
    console.log(`📊 Total Issues: ${performanceScore.issues.length}`);
    console.log(`📦 Bundle Size: ${(buildAnalysis.firstLoadJS / 1024).toFixed(1)}KB`);
    console.log(`🖼️ Images: ${imageAnalysis.totalImages} (${(imageAnalysis.totalSize / 1024 / 1024).toFixed(1)}MB)`);
    
    return report;
  }
}

// CLI execution
if (require.main === module) {
  const analyzer = new BundleAnalyzer();
  
  const command = process.argv[2];
  
  switch (command) {
    case 'analyze':
      analyzer.analyze().catch(console.error);
      break;
    case 'bundle':
      analyzer.runBundleAnalyzer().catch(console.error);
      break;
    default:
      console.log('Usage: node bundle-analysis.js [analyze|bundle]');
      console.log('  analyze - Run full analysis');
      console.log('  bundle  - Run Next.js bundle analyzer');
  }
}

module.exports = BundleAnalyzer;
