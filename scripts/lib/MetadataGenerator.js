const fs = require('fs');
const path = require('path');

/**
 * MetadataGenerator
 * 
 * Creates and maintains image metadata JSON file with dimensions,
 * formats, paths, and blur placeholders.
 */
class MetadataGenerator {
  constructor(metadataPath) {
    this.metadataPath = metadataPath;
    this.metadata = {};
  }

  /**
   * Load existing metadata from file
   * @returns {Object} Existing metadata or empty object
   */
  loadExistingMetadata() {
    try {
      if (fs.existsSync(this.metadataPath)) {
        const content = fs.readFileSync(this.metadataPath, 'utf8');
        this.metadata = JSON.parse(content);
        return this.metadata;
      }
    } catch (error) {
      console.warn('Error loading existing metadata:', error.message);
    }
    return {};
  }

  /**
   * Generate metadata from processing results
   * @param {Array} results - Array of processing results
   * @returns {Object} Generated metadata
   */
  generateMetadata(results) {
    const metadata = {};
    
    for (const result of results) {
      if (!result || !result.path) continue;
      
      metadata[result.path] = {
        width: result.width,
        height: result.height,
        aspectRatio: result.aspectRatio,
        formats: result.formats || {},
        sizes: this.generateSizesString(result.width),
        ...(result.blurDataURL && { blurDataURL: result.blurDataURL })
      };
    }
    
    return metadata;
  }

  /**
   * Update existing metadata with new results
   * @param {Object} existingMetadata - Current metadata
   * @param {Array} newResults - New processing results
   * @returns {Object} Updated metadata
   */
  updateMetadata(existingMetadata, newResults) {
    const updated = { ...existingMetadata };
    
    for (const result of newResults) {
      if (!result || !result.path) continue;
      
      updated[result.path] = {
        width: result.width,
        height: result.height,
        aspectRatio: result.aspectRatio,
        formats: result.formats || {},
        sizes: this.generateSizesString(result.width),
        ...(result.blurDataURL && { blurDataURL: result.blurDataURL })
      };
    }
    
    return updated;
  }

  /**
   * Remove metadata entries for images that no longer exist
   * @param {Object} metadata - Current metadata
   * @param {Array} existingPaths - Array of existing image paths
   * @returns {Object} Cleaned metadata
   */
  cleanupMetadata(metadata, existingPaths) {
    const cleaned = {};
    const existingSet = new Set(existingPaths);
    
    for (const [path, data] of Object.entries(metadata)) {
      if (existingSet.has(path)) {
        cleaned[path] = data;
      } else {
        console.log(`Removing metadata for deleted image: ${path}`);
      }
    }
    
    return cleaned;
  }

  /**
   * Validate metadata structure
   * @param {Object} metadata - Metadata to validate
   * @returns {Object} Validation result
   */
  validateMetadata(metadata) {
    const errors = [];
    const warnings = [];
    
    if (!metadata || typeof metadata !== 'object') {
      errors.push('Metadata must be an object');
      return { valid: false, errors, warnings };
    }
    
    for (const [path, data] of Object.entries(metadata)) {
      // Check required fields
      if (!data.width || !data.height) {
        errors.push(`Missing dimensions for ${path}`);
      }
      
      if (!data.formats || typeof data.formats !== 'object') {
        errors.push(`Missing or invalid formats for ${path}`);
      }
      
      // Check format paths exist
      if (data.formats) {
        for (const [format, paths] of Object.entries(data.formats)) {
          if (!Array.isArray(paths)) {
            errors.push(`Invalid format paths for ${path} (${format})`);
          }
        }
      }
      
      // Warnings for optional fields
      if (!data.blurDataURL && data.width * data.height > 100000) {
        warnings.push(`Large image ${path} missing blur placeholder`);
      }
    }
    
    return {
      valid: errors.length === 0,
      errors,
      warnings
    };
  }

  /**
   * Write metadata to file
   * @param {Object} metadata - Metadata to write
   * @returns {Promise<void>}
   */
  async writeMetadataFile(metadata) {
    try {
      // Validate before writing
      const validation = this.validateMetadata(metadata);
      
      if (!validation.valid) {
        console.error('Metadata validation failed:');
        validation.errors.forEach(err => console.error(`  - ${err}`));
        throw new Error('Invalid metadata structure');
      }
      
      if (validation.warnings.length > 0) {
        console.warn('Metadata validation warnings:');
        validation.warnings.forEach(warn => console.warn(`  - ${warn}`));
      }
      
      // Write to file
      const content = JSON.stringify(metadata, null, 2);
      fs.writeFileSync(this.metadataPath, content, 'utf8');
      
      console.log(`✓ Metadata file written: ${this.metadataPath}`);
      console.log(`  Total entries: ${Object.keys(metadata).length}`);
    } catch (error) {
      console.error('Error writing metadata file:', error.message);
      throw error;
    }
  }

  /**
   * Generate responsive sizes string for Next.js Image component
   * @param {number} maxWidth - Maximum width of the image
   * @returns {string} Sizes string
   */
  generateSizesString(maxWidth) {
    if (maxWidth <= 640) {
      return '100vw';
    } else if (maxWidth <= 1200) {
      return '(max-width: 640px) 100vw, 50vw';
    } else {
      return '(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw';
    }
  }

  /**
   * Get metadata for a specific image
   * @param {string} imagePath - Path to the image
   * @returns {Object|null} Metadata for the image or null
   */
  getImageMetadata(imagePath) {
    if (!this.metadata || Object.keys(this.metadata).length === 0) {
      this.loadExistingMetadata();
    }
    
    return this.metadata[imagePath] || null;
  }

  /**
   * Check if metadata exists for an image
   * @param {string} imagePath - Path to the image
   * @returns {boolean} True if metadata exists
   */
  hasMetadata(imagePath) {
    if (!this.metadata || Object.keys(this.metadata).length === 0) {
      this.loadExistingMetadata();
    }
    
    return imagePath in this.metadata;
  }
}

module.exports = MetadataGenerator;
