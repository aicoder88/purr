import { z } from 'zod';
import { verifyOrigin } from '@/lib/security/origin-check';

// Define validation schema with Zod
const freeGiveawayFormSchema = z.object({
  name: z.string().min(2).max(100).trim(),
  email: z.string().email().trim().toLowerCase(),
  catNames: z.array(z.string().optional()).optional(),
});

type _ResponseData = {
  success: boolean;
  message: string;
};

// Rate limiting setup
import { checkRateLimit } from '@/lib/rate-limit';

export async function POST(req: Request): Promise<Response> {
  // Apply rate limiting
  const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';

  const rateLimitResult = await checkRateLimit(clientIp, 'sensitive');

  const securityHeaders = {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Content-Security-Policy': "default-src 'self'",
  };

  // Verify request origin
  if (!verifyOrigin(req)) {
    return Response.json({ success: false, message: 'Forbidden' }, { status: 403, headers: securityHeaders });
  }

  if (!rateLimitResult.success) {
    return Response.json({
      success: false,
      message: 'Too many requests. Please try again later.',
    }, {
      status: 429,
      headers: {
        ...securityHeaders,
        'Retry-After': rateLimitResult.retryAfter?.toString() || '60',
        'X-RateLimit-Limit': rateLimitResult.limit.toString(),
        'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
        'X-RateLimit-Reset': rateLimitResult.reset.toString(),
      }
    });
  }

  try {
    // Validate form data with Zod
    const body = await req.json();
    const validationResult = freeGiveawayFormSchema.safeParse(body);

    if (!validationResult.success) {
      return Response.json({
        success: false,
        message: 'Invalid form data. Please check your inputs and try again.',
      }, {
        status: 400,
        headers: {
          'X-Content-Type-Options': 'nosniff',
          'X-Frame-Options': 'DENY',
          'Content-Security-Policy': "default-src 'self'",
        }
      });
    }

    const { name, email, catNames } = validationResult.data;

    // Send data to Google Apps Script
    try {
      // Filter cat names to remove empty strings
      const filteredCatNames = catNames
        ?.filter((name): name is string => typeof name === 'string' && name.trim() !== '') || [];

      // Prepare the data for Google Apps Script - using 'cats' as the field name
      // and keeping it as an array as expected by the Google Apps Script
      const formData = {
        name,
        email,
        cats: filteredCatNames, // Send as array with the field name 'cats'
        timestamp: new Date().toISOString()
      };

      // Method 1: POST request with JSON body
      try {
        const jsonUrl = 'https://script.google.com/macros/s/AKfycbyhSXCHntxmO0fb1IImlzs80doIllEWuHpF-eB72p11SgoN5_xUQf2SXU6Cx7h4XtjabA/exec';

        const jsonResponse = await fetch(jsonUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (jsonResponse.ok) {
          // Return success response
          return Response.json({
            success: true,
            message: 'Your free bag request has been submitted successfully! We\'ll be in touch soon with shipping details.'
          }, {
            headers: {
              'X-Content-Type-Options': 'nosniff',
              'X-Frame-Options': 'DENY',
              'Content-Security-Policy': "default-src 'self'",
            }
          });
        }
      } catch (_jsonError) {
        // Ignore JSON POST error and try URL params method
      }

      // Method 2: Alternative POST approach with different fetch options
      const getUrl = "https://script.google.com/macros/s/AKfycbyhSXCHntxmO0fb1IImlzs80doIllEWuHpF-eB72p11SgoN5_xUQf2SXU6Cx7h4XtjabA/exec";

      const getResponse = await fetch(getUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        mode: 'cors',
        cache: 'no-cache',
      });

      if (!getResponse.ok) {
        throw new Error('Failed to submit to Google Apps Script');
      }
    } catch (_error) {
      return Response.json({
        success: false,
        message: 'Failed to save your information. Please try again later.',
      }, {
        status: 500,
        headers: {
          'X-Content-Type-Options': 'nosniff',
          'X-Frame-Options': 'DENY',
          'Content-Security-Policy': "default-src 'self'",
        }
      });
    }

    // Return success response
    return Response.json({
      success: true,
      message: 'Your free bag request has been submitted successfully! We\'ll be in touch soon with shipping details.'
    }, {
      headers: {
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'Content-Security-Policy': "default-src 'self'",
      }
    });
  } catch (_error) {
    return Response.json({
      success: false,
      message: 'An error occurred while processing your request'
    }, {
      status: 500,
      headers: {
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'Content-Security-Policy': "default-src 'self'",
      }
    });
  }
}
