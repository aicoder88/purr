#!/usr/bin/env node

/**
 * Production Build Script for Purrify
 * Comprehensive build process with performance optimization and SEO
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

class ProductionBuilder {
  constructor() {
    this.projectRoot = process.cwd();
    this.startTime = Date.now();
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

  async runCommand(command, description) {
    this.log(`${description}...`);
    try {
      execSync(command, { stdio: 'inherit' });
      this.log(`${description} completed`, 'success');
    } catch (error) {
      this.log(`${description} failed: ${error.message}`, 'error');
      throw error;
    }
  }

  // Pre-build optimizations
  async preBuildOptimizations() {
    this.log('Running pre-build optimizations...');
    
    // Generate sitemap
    try {
      execSync('npm run generate-enhanced-sitemap', { stdio: 'inherit' });
      this.log('Sitemap generated', 'success');
    } catch (error) {
      this.log(`Sitemap generation failed: ${error.message}`, 'warning');
    }

    // Optimize images (if script exists)
    const optimizeImagesScript = path.join(this.projectRoot, 'scripts', 'optimize-images.js');
    if (fs.existsSync(optimizeImagesScript)) {
      await this.runCommand('node scripts/optimize-images.js', 'Image optimization');
    }

    // Type checking
    await this.runCommand('npx tsc --noEmit', 'TypeScript type checking');
  }

  // Main build process
  async buildApplication() {
    this.log('Building application...');
    
    // Set production environment
    process.env.NODE_ENV = 'production';
    process.env.NEXT_TELEMETRY_DISABLED = '1';
    
    // Build with Next.js
    await this.runCommand('npx next build', 'Next.js build');
  }

  // Post-build optimizations
  async postBuildOptimizations() {
    this.log('Running post-build optimizations...');
    
    // Bundle analysis
    const BundleAnalyzer = require('./bundle-analysis');
    const analyzer = new BundleAnalyzer();
    
    try {
      const report = await analyzer.analyze();
      this.log(`Bundle analysis completed - Score: ${report.performanceScore.score}/100`, 'success');
      
      // Warn if performance score is low
      if (report.performanceScore.score < 80) {
        this.log(`Performance score (${report.performanceScore.score}) is below 80. Check bundle-analysis.html for recommendations.`, 'warning');
      }
    } catch (error) {
      this.log(`Bundle analysis failed: ${error.message}`, 'warning');
    }

    // Generate build manifest
    this.generateBuildManifest();
  }

  // Generate build manifest with metadata
  generateBuildManifest() {
    const buildTime = Date.now();
    const buildDuration = buildTime - this.startTime;
    
    const manifest = {
      buildTime: new Date(buildTime).toISOString(),
      buildDuration: `${(buildDuration / 1000).toFixed(2)}s`,
      nodeVersion: process.version,
      platform: process.platform,
      environment: process.env.NODE_ENV || 'development',
      features: {
        pwa: true,
        i18n: true,
        analytics: true,
        performance_monitoring: true,
        structured_data: true,
        image_optimization: true,
        bundle_analysis: true
      },
      optimizations: {
        compression: true,
        tree_shaking: true,
        code_splitting: true,
        image_optimization: true,
        css_optimization: true,
        service_worker: true
      }
    };

    const manifestPath = path.join(this.projectRoot, '.next', 'build-manifest-custom.json');
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
    this.log('Build manifest generated', 'success');
  }

  // Validate build output
  async validateBuild() {
    this.log('Validating build output...');
    
    const buildDir = path.join(this.projectRoot, '.next');
    const requiredFiles = [
      'build-manifest.json',
      'static',
      'server'
    ];

    const missingFiles = requiredFiles.filter(file => 
      !fs.existsSync(path.join(buildDir, file))
    );

    if (missingFiles.length > 0) {
      throw new Error(`Missing build files: ${missingFiles.join(', ')}`);
    }

    // Check critical files
    const criticalFiles = [
      'static/chunks/pages/_app.js',
      'static/chunks/pages/index.js',
      'server/pages/_document.js'
    ];

    const missingCritical = criticalFiles.filter(file => 
      !fs.existsSync(path.join(buildDir, file))
    );

    if (missingCritical.length > 0) {
      this.log(`Missing critical files: ${missingCritical.join(', ')}`, 'warning');
    } else {
      this.log('Build validation passed', 'success');
    }
  }

  // Performance recommendations
  generatePerformanceReport() {
    const buildDir = path.join(this.projectRoot, '.next');
    const staticDir = path.join(buildDir, 'static');
    
    if (!fs.existsSync(staticDir)) return;

    let totalSize = 0;
    let fileCount = 0;

    const calculateDirSize = (dir) => {
      const files = fs.readdirSync(dir);
      files.forEach(file => {
        const filePath = path.join(dir, file);
        const stats = fs.statSync(filePath);
        
        if (stats.isDirectory()) {
          calculateDirSize(filePath);
        } else {
          totalSize += stats.size;
          fileCount++;
        }
      });
    };

    calculateDirSize(staticDir);

    const report = {
      totalSize: `${(totalSize / 1024 / 1024).toFixed(2)}MB`,
      fileCount,
      avgFileSize: `${(totalSize / fileCount / 1024).toFixed(2)}KB`,
      buildDuration: `${((Date.now() - this.startTime) / 1000).toFixed(2)}s`
    };

    this.log(`Build Summary:`, 'info');
    this.log(`  Total Size: ${report.totalSize}`);
    this.log(`  File Count: ${report.fileCount}`);
    this.log(`  Avg File Size: ${report.avgFileSize}`);
    this.log(`  Build Duration: ${report.buildDuration}`);
  }

  // Main build process
  async build() {
    try {
      this.log('🚀 Starting Purrify production build...');
      
      await this.preBuildOptimizations();
      await this.buildApplication();
      await this.postBuildOptimizations();
      await this.validateBuild();
      
      this.generatePerformanceReport();
      
      const totalTime = ((Date.now() - this.startTime) / 1000).toFixed(2);
      this.log(`🎉 Production build completed successfully in ${totalTime}s`, 'success');
      
    } catch (error) {
      this.log(`Build failed: ${error.message}`, 'error');
      process.exit(1);
    }
  }
}

// CLI execution
if (require.main === module) {
  const builder = new ProductionBuilder();
  builder.build().catch(console.error);
}

module.exports = ProductionBuilder;
