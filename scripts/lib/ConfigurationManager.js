const fs = require('fs');
const path = require('path');

/**
 * ConfigurationManager
 * 
 * Loads and manages image optimization configuration profiles.
 * Provides profile selection based on image path patterns.
 */
class ConfigurationManager {
  constructor(configPath = null) {
    this.configPath = configPath || path.join(process.cwd(), 'image-optimization.config.js');
    this.config = null;
  }

  /**
   * Load configuration from file
   * @returns {Object} Configuration object
   */
  loadConfig() {
    try {
      if (!fs.existsSync(this.configPath)) {
        console.warn('Configuration file not found, using defaults');
        return this.getDefaultConfig();
      }

      // Clear require cache to get fresh config
      delete require.cache[require.resolve(this.configPath)];
      this.config = require(this.configPath);

      if (!this.validateConfig(this.config)) {
        console.warn('Invalid configuration, using defaults');
        return this.getDefaultConfig();
      }

      return this.config;
    } catch (error) {
      console.error('Error loading configuration:', error.message);
      return this.getDefaultConfig();
    }
  }

  /**
   * Get optimization profile for an image based on its path
   * @param {string} imagePath - Path to the image file
   * @returns {Object} Optimization profile
   */
  getProfile(imagePath) {
    if (!this.config) {
      this.config = this.loadConfig();
    }

    const normalizedPath = imagePath.toLowerCase();

    // Check for product images
    if (normalizedPath.includes('/products/') || normalizedPath.includes('/product/')) {
      return this.config.profiles.product;
    }

    // Check for blog images
    if (normalizedPath.includes('/blog/') || normalizedPath.includes('/articles/')) {
      return this.config.profiles.blog;
    }

    // Check for thumbnails
    if (normalizedPath.includes('/thumb') || normalizedPath.includes('/avatar')) {
      return this.config.profiles.thumbnail;
    }

    // Default profile
    return this.config.profiles.default;
  }

  /**
   * Validate configuration structure
   * @param {Object} config - Configuration to validate
   * @returns {boolean} True if valid
   */
  validateConfig(config) {
    if (!config || typeof config !== 'object') {
      return false;
    }

    // Check required top-level properties
    if (!config.profiles || typeof config.profiles !== 'object') {
      return false;
    }

    // Validate each profile
    const requiredProfiles = ['product', 'blog', 'thumbnail', 'default'];
    for (const profileName of requiredProfiles) {
      if (!config.profiles[profileName]) {
        console.warn(`Missing required profile: ${profileName}`);
        return false;
      }

      const profile = config.profiles[profileName];
      
      // Validate profile structure
      if (!this.validateProfile(profile)) {
        console.warn(`Invalid profile: ${profileName}`);
        return false;
      }
    }

    return true;
  }

  /**
   * Validate individual profile
   * @param {Object} profile - Profile to validate
   * @returns {boolean} True if valid
   */
  validateProfile(profile) {
    const requiredFields = ['name', 'quality', 'maxWidth', 'responsiveSizes', 'formats'];
    
    for (const field of requiredFields) {
      if (!(field in profile)) {
        return false;
      }
    }

    // Validate quality (1-100)
    if (profile.quality < 1 || profile.quality > 100) {
      return false;
    }

    // Validate maxWidth
    if (profile.maxWidth < 1) {
      return false;
    }

    // Validate responsiveSizes is array
    if (!Array.isArray(profile.responsiveSizes) || profile.responsiveSizes.length === 0) {
      return false;
    }

    // Validate formats is array
    if (!Array.isArray(profile.formats) || profile.formats.length === 0) {
      return false;
    }

    // Validate formats are supported
    const supportedFormats = ['avif', 'webp', 'jpg', 'jpeg', 'png'];
    for (const format of profile.formats) {
      if (!supportedFormats.includes(format)) {
        return false;
      }
    }

    return true;
  }

  /**
   * Get default configuration
   * @returns {Object} Default configuration
   */
  getDefaultConfig() {
    return {
      profiles: {
        product: {
          name: 'product',
          quality: 85,
          maxWidth: 1920,
          responsiveSizes: [640, 828, 1080, 1200, 1920],
          formats: ['avif', 'webp', 'jpg'],
          compressionLevel: 6,
          preserveMetadata: false
        },
        blog: {
          name: 'blog',
          quality: 80,
          maxWidth: 1200,
          responsiveSizes: [640, 828, 1200],
          formats: ['avif', 'webp', 'jpg'],
          compressionLevel: 6,
          preserveMetadata: false
        },
        thumbnail: {
          name: 'thumbnail',
          quality: 75,
          maxWidth: 400,
          responsiveSizes: [200, 400],
          formats: ['avif', 'webp'],
          compressionLevel: 6,
          preserveMetadata: false
        },
        default: {
          name: 'default',
          quality: 80,
          maxWidth: 1920,
          responsiveSizes: [640, 828, 1080, 1200, 1920],
          formats: ['avif', 'webp', 'jpg'],
          compressionLevel: 6,
          preserveMetadata: false
        }
      },
      concurrency: 2,
      skipOnCI: true,
      errorThreshold: 0.1
    };
  }

  /**
   * Get concurrency setting
   * @returns {number} Max concurrent operations
   */
  getConcurrency() {
    if (!this.config) {
      this.config = this.loadConfig();
    }
    return this.config.concurrency || 2;
  }

  /**
   * Check if should skip on CI
   * @returns {boolean} True if should skip
   */
  shouldSkipOnCI() {
    if (!this.config) {
      this.config = this.loadConfig();
    }
    return this.config.skipOnCI !== false;
  }

  /**
   * Get error threshold
   * @returns {number} Error threshold (0-1)
   */
  getErrorThreshold() {
    if (!this.config) {
      this.config = this.loadConfig();
    }
    return this.config.errorThreshold || 0.1;
  }
}

module.exports = ConfigurationManager;
