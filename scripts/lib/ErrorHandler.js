const fs = require('node:fs');

/**
 * ErrorHandler
 * 
 * Manages errors during image optimization and generates processing reports.
 */
class ErrorHandler {
  constructor(errorThreshold = 0.1) {
    this.errorThreshold = errorThreshold;
    this.errors = [];
  }

  /**
   * Log an error
   * @param {string} filePath - Path to the file that failed
   * @param {Error} error - Error object
   */
  logError(filePath, error) {
    const errorEntry = {
      filePath,
      error: error.message || String(error),
      timestamp: Date.now()
    };
    
    this.errors.push(errorEntry);
    console.error(`✗ Error processing ${filePath}: ${errorEntry.error}`);
  }

  /**
   * Check if build should halt based on error threshold
   * @param {number} errorCount - Number of errors
   * @param {number} totalCount - Total number of images
   * @returns {boolean} True if should halt
   */
  shouldHaltBuild(errorCount, totalCount) {
    if (totalCount === 0) return false;
    
    const errorRate = errorCount / totalCount;
    return errorRate > this.errorThreshold;
  }

  /**
   * Generate processing report
   * @param {Object} stats - Processing statistics
   * @returns {Object} Processing report
   */
  generateReport(stats) {
    const report = {
      timestamp: new Date().toISOString(),
      totalImages: stats.totalImages || 0,
      successful: stats.successful || 0,
      failed: stats.failed || 0,
      skipped: stats.skipped || 0,
      errors: this.errors,
      statistics: {
        totalSizeReduction: stats.totalSizeReduction || 0,
        averageProcessingTime: stats.successful > 0 
          ? (stats.totalProcessingTime / stats.successful) 
          : 0,
        formatBreakdown: stats.formatBreakdown || {
          avif: 0,
          webp: 0,
          jpg: 0
        }
      }
    };
    
    return report;
  }

  /**
   * Write processing report to file
   * @param {Object} report - Report to write
   * @param {string} outputPath - Path to write report
   * @returns {Promise<void>}
   */
  async writeReport(report, outputPath) {
    try {
      const content = JSON.stringify(report, null, 2);
      fs.writeFileSync(outputPath, content, 'utf8');
      console.log(`\n✓ Processing report written: ${outputPath}`);
    } catch (error) {
      console.error('Error writing processing report:', error.message);
    }
  }

  /**
   * Get all errors
   * @returns {Array} Array of error entries
   */
  getErrors() {
    return this.errors;
  }

  /**
   * Get error count
   * @returns {number} Number of errors
   */
  getErrorCount() {
    return this.errors.length;
  }

  /**
   * Clear all errors
   */
  clearErrors() {
    this.errors = [];
  }

  /**
   * Print error summary
   */
  printErrorSummary() {
    if (this.errors.length === 0) {
      console.log('\n✓ No errors encountered');
      return;
    }
    
    console.log('\n' + '='.repeat(60));
    console.log('Error Summary');
    console.log('='.repeat(60));
    console.log(`Total errors: ${this.errors.length}\n`);
    
    // Group errors by type
    const errorTypes = {};
    for (const error of this.errors) {
      const errorMsg = error.error;
      if (!errorTypes[errorMsg]) {
        errorTypes[errorMsg] = [];
      }
      errorTypes[errorMsg].push(error.filePath);
    }
    
    // Print grouped errors
    for (const [errorMsg, files] of Object.entries(errorTypes)) {
      console.log(`${errorMsg} (${files.length} files):`);
      files.slice(0, 5).forEach(file => console.log(`  - ${file}`));
      if (files.length > 5) {
        console.log(`  ... and ${files.length - 5} more`);
      }
      console.log('');
    }
    
    console.log('='.repeat(60) + '\n');
  }
}

module.exports = ErrorHandler;
