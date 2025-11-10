import type { NextApiRequest, NextApiResponse } from 'next';
import { ImageOptimizer } from '@/lib/blog/image-optimizer';
import { requireAuth } from '@/lib/auth/session';
import { withRateLimit, RATE_LIMITS } from '@/lib/security/rate-limit';
import formidable from 'formidable';
import fs from 'fs/promises';

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
    const slug = fields.slug?.[0] || `blog-${Date.now()}`;

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

// Apply rate limiting for uploads
export default withRateLimit(RATE_LIMITS.UPLOAD, handler);
