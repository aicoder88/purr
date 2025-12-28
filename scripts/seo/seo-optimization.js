#!/usr/bin/env node

/**
 * SEO Optimization Script for Purrify
 * Generates sitemaps, robots.txt, and validates structured data
 */

const fs = require('node:fs');
const path = require('node:path');

class SEOOptimizer {
  constructor() {
    this.projectRoot = process.cwd();
    this.publicDir = path.join(this.projectRoot, 'public');
  }

  log(message, type = 'info') {
    const timestamp = new Date().toLocaleTimeString();
    const prefix = {
      info: '🔍',
      success: '✅',
      warning: '⚠️',
      error: '❌'
    }[type];
    
    console.log(`${prefix} [${timestamp}] ${message}`);
  }

  // Generate comprehensive sitemap
  async generateSitemap() {
    this.log('Generating sitemap...');
    
    try {
      // Use the working sitemap generation script
      const { execSync } = require('node:child_process');
      execSync('npm run generate-enhanced-sitemap', { cwd: this.projectRoot, stdio: 'inherit' });
      this.log('Sitemap generated successfully', 'success');
    } catch (error) {
      this.log(`Sitemap generation failed: ${error.message}`, 'error');
      // Don't throw - continue with other optimizations
    }
  }

  // Validate robots.txt
  validateRobotsTxt() {
    this.log('Validating robots.txt...');
    
    const robotsPath = path.join(this.publicDir, 'robots.txt');
    
    if (!fs.existsSync(robotsPath)) {
      this.log('robots.txt not found, creating default...', 'warning');
      this.createDefaultRobotsTxt();
    } else {
      const content = fs.readFileSync(robotsPath, 'utf8');
      if (!content.includes('Sitemap:')) {
        this.log('robots.txt missing sitemap reference', 'warning');
      } else {
        this.log('robots.txt validation passed', 'success');
      }
    }
  }

  // Create default robots.txt
  createDefaultRobotsTxt() {
    const robotsContent = `User-agent: *
Allow: /

# Sitemaps
Sitemap: https://www.purrify.ca/sitemap.xml
Sitemap: https://www.purrify.ca/sitemap-index.xml

# Block admin and private areas
Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /checkout/success
Disallow: /checkout/cancel

# Allow important pages
Allow: /
Allow: /fr/
Allow: /products/
Allow: /learn/
Allow: /customers/
Allow: /support/
Allow: /about/

# Crawl delay
Crawl-delay: 1`;

    const robotsPath = path.join(this.publicDir, 'robots.txt');
    fs.writeFileSync(robotsPath, robotsContent);
    this.log('Default robots.txt created', 'success');
  }

  // Validate structured data
  validateStructuredData() {
    this.log('Validating structured data implementation...');
    
    const structuredDataPath = path.join(this.projectRoot, 'src/components/seo/AdvancedStructuredData.tsx');
    
    if (!fs.existsSync(structuredDataPath)) {
      this.log('Structured data component not found', 'error');
      return false;
    }

    const content = fs.readFileSync(structuredDataPath, 'utf8');
    const requiredSchemas = [
      'Organization',
      'Product',
      'Website',
      'BreadcrumbList',
      'FAQPage'
    ];

    const missingSchemas = requiredSchemas.filter(schema => 
      !content.includes(`"@type": "${schema}"`)
    );

    if (missingSchemas.length > 0) {
      this.log(`Missing structured data schemas: ${missingSchemas.join(', ')}`, 'warning');
    } else {
      this.log('Structured data validation passed', 'success');
    }

    return missingSchemas.length === 0;
  }

  // Check meta tags in pages
  validateMetaTags() {
    this.log('Validating meta tags...');
    
    const pagesDir = path.join(this.projectRoot, 'pages');
    const pages = this.getAllPages(pagesDir);
    
    let issues = 0;
    
    pages.forEach(page => {
      const content = fs.readFileSync(page, 'utf8');
      
      // Check for Head component or NextSeo
      if (!content.includes('import Head from') && !content.includes('<Head>') && !content.includes('NextSeo')) {
        this.log(`${path.relative(this.projectRoot, page)}: Missing Head component or NextSeo`, 'warning');
        issues++;
      }
      
      // Check for title
      if (!content.includes('<title>') && !content.includes('title:') && !content.includes('title=')) {
        this.log(`${path.relative(this.projectRoot, page)}: Missing title tag`, 'warning');
        issues++;
      }
      
      // Check for meta description
      if (!content.includes('name="description"') && !content.includes('description:') && !content.includes('description=')) {
        this.log(`${path.relative(this.projectRoot, page)}: Missing meta description`, 'warning');
        issues++;
      }
    });
    
    if (issues === 0) {
      this.log('Meta tags validation passed', 'success');
    } else {
      this.log(`Found ${issues} meta tag issues`, 'warning');
    }
    
    return issues;
  }

  // Get all page files
  getAllPages(dir, pages = []) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory() && !file.startsWith('_') && file !== 'api') {
        this.getAllPages(filePath, pages);
      } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        pages.push(filePath);
      }
    });
    
    return pages;
  }

  // Generate SEO report
  generateSEOReport() {
    this.log('Generating SEO report...');
    
    const report = {
      timestamp: new Date().toISOString(),
      sitemap: {
        generated: fs.existsSync(path.join(this.publicDir, 'sitemap.xml')),
        index: fs.existsSync(path.join(this.publicDir, 'sitemap-index.xml'))
      },
      robots: {
        exists: fs.existsSync(path.join(this.publicDir, 'robots.txt'))
      },
      structuredData: {
        implemented: this.validateStructuredData()
      },
      metaTags: {
        issues: this.validateMetaTags()
      },
      recommendations: []
    };

    // Add recommendations
    if (!report.sitemap.generated) {
      report.recommendations.push('Generate XML sitemap');
    }
    
    if (!report.robots.exists) {
      report.recommendations.push('Create robots.txt file');
    }
    
    if (!report.structuredData.implemented) {
      report.recommendations.push('Implement structured data schemas');
    }
    
    if (report.metaTags.issues > 0) {
      report.recommendations.push(`Fix ${report.metaTags.issues} meta tag issues`);
    }

    // Save report
    const reportPath = path.join(this.projectRoot, 'seo-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    this.log(`SEO report saved to ${reportPath}`, 'success');
    
    // Display summary
    this.log('SEO Optimization Summary:', 'info');
    this.log(`  Sitemap: ${report.sitemap.generated ? '✅' : '❌'}`);
    this.log(`  Robots.txt: ${report.robots.exists ? '✅' : '❌'}`);
    this.log(`  Structured Data: ${report.structuredData.implemented ? '✅' : '❌'}`);
    this.log(`  Meta Tag Issues: ${report.metaTags.issues}`);
    
    if (report.recommendations.length > 0) {
      this.log('Recommendations:', 'warning');
      report.recommendations.forEach(rec => this.log(`  - ${rec}`));
    }
    
    return report;
  }

  // Main optimization process
  async optimize() {
    try {
      this.log('🔍 Starting SEO optimization...');
      
      await this.generateSitemap();
      this.validateRobotsTxt();
      const report = this.generateSEOReport();
      
      const score = this.calculateSEOScore(report);
      this.log(`🎯 SEO Score: ${score}/100`, score >= 80 ? 'success' : 'warning');
      
      this.log('✅ SEO optimization completed', 'success');
      
    } catch (error) {
      this.log(`SEO optimization failed: ${error.message}`, 'error');
      process.exit(1);
    }
  }

  // Calculate SEO score
  calculateSEOScore(report) {
    let score = 0;
    
    if (report.sitemap.generated) score += 25;
    if (report.sitemap.index) score += 10;
    if (report.robots.exists) score += 20;
    if (report.structuredData.implemented) score += 25;
    if (report.metaTags.issues === 0) score += 20;
    
    return Math.min(score, 100);
  }
}

// CLI execution
if (require.main === module) {
  const optimizer = new SEOOptimizer();
  optimizer.optimize().catch(console.error);
}

module.exports = SEOOptimizer;
