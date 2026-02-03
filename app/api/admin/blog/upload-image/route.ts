import { ImageOptimizer } from '@/lib/blog/image-optimizer';
import { requireAuth } from '@/lib/auth/session';

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

export async function POST(request: Request) {
  // Check authentication
  const { authorized } = await requireAuth();
  if (!authorized) {
    return Response.json({ success: false, error: 'Unauthorized' } as UploadResponse, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const uploadedFile = formData.get('image') as File | null;
    const slugValue = formData.get('slug') as string | null;

    if (!uploadedFile) {
      return Response.json({ success: false, error: 'No file uploaded' } as UploadResponse, { status: 400 });
    }

    // Validate file
    const optimizer = new ImageOptimizer();
    const validation = optimizer.validateImage(uploadedFile);
    if (!validation.valid) {
      return Response.json({ success: false, error: validation.error } as UploadResponse, { status: 400 });
    }

    // Generate slug from filename or use timestamp
    const rawSlug = slugValue || `blog-${Date.now()}`;

    // Sanitize slug to prevent path traversal
    const slug = sanitizeSlug(rawSlug);

    // Optimize image
    const result = await optimizer.optimizeImage(uploadedFile, slug);

    return Response.json({
      success: true,
      url: result.optimized.webp[0], // Return WebP as primary
      optimized: result.optimized,
      width: result.width,
      height: result.height
    } as UploadResponse);
  } catch (error) {
    console.error('Error uploading image:', error);
    return Response.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to upload image'
    } as UploadResponse, { status: 500 });
  }
}
