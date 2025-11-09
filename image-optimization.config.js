/**
 * Image Optimization Configuration
 * 
 * Defines optimization profiles for different image types.
 * Each profile specifies quality, dimensions, formats, and compression settings.
 */

module.exports = {
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
      compressionLevel: 7,
      preserveMetadata: false
    },
    thumbnail: {
      name: 'thumbnail',
      quality: 75,
      maxWidth: 400,
      responsiveSizes: [200, 400],
      formats: ['avif', 'webp'],
      compressionLevel: 8,
      preserveMetadata: false
    },
    default: {
      name: 'default',
      quality: 80,
      maxWidth: 1920,
      responsiveSizes: [640, 828, 1080, 1200, 1920],
      formats: ['avif', 'webp', 'jpg'],
      compressionLevel: 7,
      preserveMetadata: false
    }
  },
  concurrency: 2,
  skipOnCI: true,
  errorThreshold: 0.1  // 10% - halt build if more than 10% of images fail
};
