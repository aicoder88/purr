import { z } from 'zod';

// Define validation schema with Zod
const freeGiveawayFormSchema = z.object({
  name: z.string().min(2).max(100).trim(),
  email: z.string().email().trim().toLowerCase(),
  catNames: z.array(z.string().optional()).optional(),
});

type ResponseData = {
  success: boolean;
  message: string;
};

// Rate limiting setup
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;
const ipRequestCounts = new Map<string, { count: number; resetTime: number }>();

export async function POST(req: Request): Promise<Response> {
  // Apply rate limiting
  const clientIp = req.headers.get('x-forwarded-for') || 'unknown';
  const now = Date.now();
  const ipData = ipRequestCounts.get(clientIp);

  if (ipData) {
    if (now < ipData.resetTime) {
      if (ipData.count >= MAX_REQUESTS_PER_WINDOW) {
        return Response.json({
          success: false,
          message: 'Too many requests. Please try again later.',
        }, { 
          status: 429,
          headers: {
            'X-Content-Type-Options': 'nosniff',
            'X-Frame-Options': 'DENY',
            'Content-Security-Policy': "default-src 'self'",
          }
        });
      }
      ipData.count += 1;
    } else {
      ipRequestCounts.set(clientIp, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    }
  } else {
    ipRequestCounts.set(clientIp, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
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

    // Log the form submission data for demonstration purposes
    console.log('Form submission data:', {
      name,
      email,
      catNames: catNames || [],
      timestamp: new Date().toISOString()
    });
    
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
          console.log('Successfully submitted to Google Apps Script via JSON POST');
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
        } else {
          console.log(`JSON POST method returned status: ${jsonResponse.status}. Trying URL params method...`);
        }
      } catch (jsonError) {
        console.log('Error with JSON POST method, trying URL params method...', jsonError);
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
        console.error(`Failed to submit to Google Apps Script: ${getResponse.status} ${getResponse.statusText}`);
        throw new Error(`Failed to submit to Google Apps Script: ${getResponse.statusText}`);
      }
      
      console.log('Successfully submitted to Google Apps Script via URL parameters');
    } catch (error) {
      console.error('Error submitting to Google Apps Script:', error);
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
  } catch (error) {
    console.error('Error processing free giveaway form:', error instanceof Error ? error.message : 'Unknown error');
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
