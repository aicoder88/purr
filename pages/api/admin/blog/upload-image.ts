import type { NextApiRequest, NextApiResponse } from 'next';
import { ImageOptimizer } from '@/lib/blog/image-optimizer';
import { requireAuth } from '@/lib/auth/session';
import { withRateLimit, RATE_LIMITS } from '@/lib/security/rate-limit';
import { withCSRFProtection } from '@/lib/security/csrf';
import formidable from 'formidable';
import fs from 'fs/promises';

/**
 * Sanitize slug to prevent path traversal attacks
 * Removes any characters that are not lowercase letters, numbers, or hyphens
 */
function sanitizeSlug(slug: string): string {
  if (!slug || typeof slug !== 'string') {
    throw new Error('Invalid slug: must be a non-empty string');
  }

  // Trim whitespace and convert to lowercase
  const trimmed = slug.trim().toLowerCase();

  // Check for path traversal attempts
  if (trimmed.includes('..') || trimmed.includes('/') || trimmed.includes('\\')) {
    throw new Error('Invalid slug: path traversal detected');
  }

  // Sanitize: remove any characters that are not lowercase letters, numbers, or hyphens
  const sanitized = trimmed.replace(/[^a-z0-9-]/g, '').substring(0, 100);

  if (sanitized.length === 0) {
    throw new Error('Invalid slug: cannot be empty after sanitization');
  }

  return sanitized;
}

// Disable body parser for file uploads
export const config = {
  api: {
    bodyParser: false
  }
};

interface UploadResponse {
  success: boolean;
  url?: string;
  optimized?: {
    avif: string[];
    webp: string[];
    jpg: string[];
  };
  width?: number;
  height?: number;
  error?: string;
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UploadResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  // Check authentication
  const { authorized } = await requireAuth(req, res);
  if (!authorized) {
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }

  try {
    const form = formidable({
      maxFileSize: 10 * 1024 * 1024, // 10MB
      keepExtensions: true
    });

    const [fields, files] = await form.parse(req);

    const uploadedFile = files.image?.[0];
    if (!uploadedFile) {
      return res.status(400).json({ success: false, error: 'No file uploaded' });
    }

    // Read file
    const fileBuffer = await fs.readFile(uploadedFile.filepath);
    const file = new File([new Uint8Array(fileBuffer)], uploadedFile.originalFilename || 'image.jpg', {
      type: uploadedFile.mimetype || 'image/jpeg'
    });

    // Validate file
    const optimizer = new ImageOptimizer();
    const validation = optimizer.validateImage(file);
    if (!validation.valid) {
      return res.status(400).json({ success: false, error: validation.error });
    }

    // Generate slug from filename or use timestamp
    const rawSlug = fields.slug?.[0] || `blog-${Date.now()}`;

    // Sanitize slug to prevent path traversal
    const slug = sanitizeSlug(rawSlug);

    // Optimize image
    const result = await optimizer.optimizeImage(file, slug);

    // Clean up temp file
    await fs.unlink(uploadedFile.filepath);

    return res.status(200).json({
      success: true,
      url: result.optimized.webp[0], // Return WebP as primary
      optimized: result.optimized,
      width: result.width,
      height: result.height
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to upload image'
    });
  }
}

// Apply rate limiting first, then CSRF protection for uploads
export default withRateLimit(RATE_LIMITS.UPLOAD, withCSRFProtection(handler));
