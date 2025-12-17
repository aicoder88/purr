import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import type { ImageOptimizationResult } from '@/types/blog';

export class ImageOptimizer {
  private sizes = [640, 828, 1200, 1920];
  private outputDir = path.join(process.cwd(), 'public', 'optimized', 'blog');

  /**
   * Optimize an image and generate multiple formats and sizes
   */
  async optimizeImage(file: File, slug: string): Promise<ImageOptimizationResult> {
    const buffer = Buffer.from(await file.arrayBuffer());
    const metadata = await sharp(buffer).metadata();

    const result: ImageOptimizationResult = {
      original: file.name,
      optimized: { avif: [], webp: [], jpg: [] },
      sizes: this.sizes,
      width: metadata.width || 1920,
      height: metadata.height || 1080
    };

    // Ensure output directory exists
    await fs.mkdir(this.outputDir, { recursive: true });

    // Generate responsive sizes
    for (const size of this.sizes) {
      if (size > (metadata.width || 0)) continue;

      const resized = await sharp(buffer)
        .resize(size, null, { withoutEnlargement: true })
        .toBuffer();

      // Generate AVIF (best compression)
      try {
        const avif = await sharp(resized).avif({ quality: 80 }).toBuffer();
        const avifPath = `${slug}-${size}w.avif`;
        await fs.writeFile(path.join(this.outputDir, avifPath), avif);
        result.optimized.avif.push(`/optimized/blog/${avifPath}`);
      } catch (error) {
        console.warn('AVIF generation failed, skipping:', error);
      }

      // Generate WebP (good compression, wide support)
      const webp = await sharp(resized).webp({ quality: 85 }).toBuffer();
      const webpPath = `${slug}-${size}w.webp`;
      await fs.writeFile(path.join(this.outputDir, webpPath), webp);
      result.optimized.webp.push(`/optimized/blog/${webpPath}`);

      // Generate JPG fallback (universal support)
      const jpg = await sharp(resized).jpeg({ quality: 85, progressive: true }).toBuffer();
      const jpgPath = `${slug}-${size}w.jpg`;
      await fs.writeFile(path.join(this.outputDir, jpgPath), jpg);
      result.optimized.jpg.push(`/optimized/blog/${jpgPath}`);
    }

    return result;
  }

  /**
   * Optimize an image from a URL (for automated content generation)
   */
  async optimizeImageFromUrl(url: string, slug: string): Promise<ImageOptimizationResult> {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const file = new File([arrayBuffer], 'image.jpg', { type: 'image/jpeg' });

    return this.optimizeImage(file, slug);
  }

  /**
   * Generate responsive image srcset string
   */
  generateSrcSet(optimizedPaths: string[], format: 'avif' | 'webp' | 'jpg'): string {
    return optimizedPaths
      .map((path, index) => {
        const size = this.sizes[index];
        return `${path} ${size}w`;
      })
      .join(', ');
  }

  /**
   * Generate picture element HTML with all formats
   */
  generatePictureHtml(
    result: ImageOptimizationResult,
    alt: string,
    className?: string
  ): string {
    const avifSrcSet = this.generateSrcSet(result.optimized.avif, 'avif');
    const webpSrcSet = this.generateSrcSet(result.optimized.webp, 'webp');
    const jpgSrcSet = this.generateSrcSet(result.optimized.jpg, 'jpg');
    const fallbackSrc = result.optimized.jpg[result.optimized.jpg.length - 1];

    return `
<picture>
  ${avifSrcSet ? `<source srcset="${avifSrcSet}" type="image/avif" sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw" />` : ''}
  <source srcset="${webpSrcSet}" type="image/webp" sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw" />
  <source srcset="${jpgSrcSet}" type="image/jpeg" sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw" />
  <img 
    src="${fallbackSrc}" 
    alt="${alt}" 
    width="${result.width}" 
    height="${result.height}"
    ${className ? `class="${className}"` : ''}
    loading="lazy"
    decoding="async"
  />
</picture>`.trim();
  }

  /**
   * Delete optimized images for a slug
   */
  async deleteOptimizedImages(slug: string): Promise<void> {
    try {
      const files = await fs.readdir(this.outputDir);
      const slugFiles = files.filter(file => file.startsWith(slug));

      await Promise.all(
        slugFiles.map(file => fs.unlink(path.join(this.outputDir, file)))
      );
    } catch (error) {
      console.error(`Error deleting optimized images for ${slug}:`, error);
    }
  }

  /**
   * Get image dimensions from buffer
   */
  async getImageDimensions(buffer: Buffer): Promise<{ width: number; height: number }> {
    const metadata = await sharp(buffer).metadata();
    return {
      width: metadata.width || 0,
      height: metadata.height || 0
    };
  }

  /**
   * Validate image file
   */
  validateImage(file: File): { valid: boolean; error?: string } {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
    const dangerousExtensions = ['.php', '.sh', '.exe', '.bat', '.cmd', '.com', '.pif', '.scr', '.vbs', '.js', '.jar', '.app'];

    // Check MIME type
    if (!allowedTypes.includes(file.type)) {
      return {
        valid: false,
        error: 'Invalid file type. Only JPEG, PNG, and WebP are allowed.'
      };
    }

    // Check file extension
    const fileName = file.name.toLowerCase();
    const hasAllowedExtension = allowedExtensions.some(ext => fileName.endsWith(ext));

    if (!hasAllowedExtension) {
      return {
        valid: false,
        error: 'Invalid file extension. Only .jpg, .jpeg, .png, and .webp are allowed.'
      };
    }

    // Check for double extensions (e.g., .jpg.php)
    const hasDangerousExtension = dangerousExtensions.some(ext => fileName.includes(ext));
    if (hasDangerousExtension) {
      return {
        valid: false,
        error: 'Invalid file name. File contains dangerous extension.'
      };
    }

    // Check for multiple dots (potential double extension)
    const parts = fileName.split('.');
    if (parts.length > 2) {
      return {
        valid: false,
        error: 'Invalid file name. Multiple extensions not allowed.'
      };
    }

    if (file.size > maxSize) {
      return {
        valid: false,
        error: 'File too large. Maximum size is 10MB.'
      };
    }

    return { valid: true };
  }

  /**
   * Calculate compression ratio
   */
  async calculateCompressionRatio(originalBuffer: Buffer, optimizedBuffer: Buffer): Promise<number> {
    const originalSize = originalBuffer.length;
    const optimizedSize = optimizedBuffer.length;
    return Math.round(((originalSize - optimizedSize) / originalSize) * 100);
  }
}
