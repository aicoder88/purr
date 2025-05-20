import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { google } from 'googleapis';

// Define validation schema with Zod
const freeGiveawayFormSchema = z.object({
  name: z.string().min(2).max(100).trim(),
  email: z.string().email().trim().toLowerCase(),
  catNames: z.array(z.string().optional()).optional(),
});

type FreeGiveawayFormData = z.infer<typeof freeGiveawayFormSchema>;

type ResponseData = {
  success: boolean;
  message: string;
};

// Rate limiting setup
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;
const ipRequestCounts = new Map<string, { count: number; resetTime: number }>();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Set security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Content-Security-Policy', "default-src 'self'");

  // Only allow POST method
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  // Apply rate limiting
  const clientIp = req.headers['x-forwarded-for'] as string || 'unknown';
  const now = Date.now();
  const ipData = ipRequestCounts.get(clientIp);

  if (ipData) {
    if (now < ipData.resetTime) {
      if (ipData.count >= MAX_REQUESTS_PER_WINDOW) {
        return res.status(429).json({
          success: false,
          message: 'Too many requests. Please try again later.',
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
    const validationResult = freeGiveawayFormSchema.safeParse(req.body);
    
    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        message: 'Invalid form data. Please check your inputs and try again.',
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
          // Return success response instead of exiting early
          return res.status(200).json({
            success: true,
            message: 'Your free bag request has been submitted successfully! We\'ll be in touch soon with shipping details.'
          });
        } else {
          console.log(`JSON POST method returned status: ${jsonResponse.status}. Trying URL params method...`);
        }
      } catch (jsonError) {
        console.log('Error with JSON POST method, trying URL params method...', jsonError);
      }
      
      // Method 2: Alternative POST approach with different fetch options
      // Still sending JSON data, but with different fetch configuration
      const getUrl = `https://script.google.com/macros/s/AKfycbyhSXCHntxmO0fb1IImlzs80doIllEWuHpF-eB72p11SgoN5_xUQf2SXU6Cx7h4XtjabA/exec`;
      
      // Using the same JSON data format as Method 1
      const getResponse = await fetch(getUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Using the same formData object to ensure consistent format
        body: JSON.stringify(formData),
        // Adding different fetch options that might help with CORS or other issues
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
      return res.status(500).json({
        success: false,
        message: 'Failed to save your information. Please try again later.',
      });
    }

    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Your free bag request has been submitted successfully! We\'ll be in touch soon with shipping details.'
    });
  } catch (error) {
    console.error('Error processing free giveaway form:', error instanceof Error ? error.message : 'Unknown error');
    return res.status(500).json({
      success: false,
      message: 'An error occurred while processing your request'
    });
  }
}

async function appendToGoogleSheet(data: {
  name: string;
  email: string;
  catNames: (string | undefined)[];
}) {
  try {
    // This function requires proper setup with Google Sheets API
    // You'll need to set up service account credentials and configure the spreadsheet
    
    // Load the credentials from environment variables
    const credentials = {
      client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    };

    // Use the provided spreadsheet ID that's editable by anyone with the link
    const spreadsheetId = '1UmhLcFjcG9SjlLyJsY9Dv-WaUDyGu6rHySAnjDoMGQY';
    
    // For this demo with a public spreadsheet, we'll use a simplified approach
    // In a production environment, you would use proper service account credentials
    if (!credentials.client_email || !credentials.private_key) {
      // If credentials aren't available, we'll use a direct approach for this demo
      // This is only for demonstration purposes with a public spreadsheet
      console.log('Using simplified approach for demo with public spreadsheet');
      
      // Log the data that would be sent to the spreadsheet
      console.log('Form submission data:', {
        name: data.name,
        email: data.email,
        catNames: data.catNames || [],
        timestamp: new Date().toISOString()
      });
      
      return true;
    }

    // Authenticate with Google
    const auth = new google.auth.JWT({
      email: credentials.client_email,
      key: credentials.private_key,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // Format the data for Google Sheets
    // Filter out undefined values and join cat names with commas
    const catNamesString = data.catNames
      .filter((name): name is string => typeof name === 'string' && name.trim() !== '')
      .join(', ');

    // Prepare the row data
    const values = [
      [
        data.name,
        data.email,
        catNamesString,
        new Date().toISOString(), // Timestamp
      ],
    ];

    // Append the data to the sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:D', // Adjust the range as needed
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values,
      },
    });

    return true;
  } catch (error) {
    console.error('Error in appendToGoogleSheet:', error);
    throw error;
  }
}