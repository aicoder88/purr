import { NextApiRequest, NextApiResponse } from 'next';
import rateLimit from 'express-rate-limit';
import { runMiddleware } from '../../src/lib/api-middleware';

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // limit each IP to 3 requests per windowMs for retailer inquiries
  message: 'Too many retailer inquiries from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

interface RetailerInquiryData {
  businessName: string;
  contactName: string;
  email: string;
  phone?: string;
  position?: string;
  businessType: string;
  locations?: string;
  currentProducts?: string;
  message?: string;
}

function validateRetailerInquiry(data: unknown): RetailerInquiryData {
  if (!data || typeof data !== 'object') {
    throw new Error('Invalid request data');
  }

  const requestData = data as Record<string, unknown>;
  const { businessName, contactName, email, phone, position, businessType, locations, currentProducts, message } = requestData;

  // Required field validation
  if (!businessName || typeof businessName !== 'string' || businessName.trim().length < 2) {
    throw new Error('Business name is required and must be at least 2 characters');
  }

  if (!contactName || typeof contactName !== 'string' || contactName.trim().length < 2) {
    throw new Error('Contact name is required and must be at least 2 characters');
  }

  if (!email || typeof email !== 'string') {
    throw new Error('Email is required');
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error('Please provide a valid email address');
  }

  if (!businessType || typeof businessType !== 'string') {
    throw new Error('Business type is required');
  }

  // Valid business types
  const validBusinessTypes = [
    'independent-pet-store',
    'pet-store-chain',
    'veterinary-clinic',
    'grooming-salon',
    'distributor',
    'other'
  ];

  if (!validBusinessTypes.includes(businessType)) {
    throw new Error('Please select a valid business type');
  }

  // Sanitize and return validated data
  return {
    businessName: businessName.trim().substring(0, 100),
    contactName: contactName.trim().substring(0, 100),
    email: email.trim().toLowerCase().substring(0, 254),
    phone: phone && typeof phone === 'string' ? phone.trim().substring(0, 20) : undefined,
    position: position && typeof position === 'string' ? position.trim().substring(0, 100) : undefined,
    businessType,
    locations: locations && typeof locations === 'string' ? locations.trim().substring(0, 10) : undefined,
    currentProducts: currentProducts && typeof currentProducts === 'string' ? currentProducts.trim().substring(0, 500) : undefined,
    message: message && typeof message === 'string' ? message.trim().substring(0, 1000) : undefined,
  };
}

async function sendRetailerNotification(inquiryData: RetailerInquiryData) {
  try {
    // In a real implementation, you would:
    // 1. Send email to wholesale team
    // 2. Add to CRM system
    // 3. Create lead in sales pipeline
    // 4. Send auto-response to retailer

    console.log('New retailer inquiry received:', {
      businessName: inquiryData.businessName,
      contactName: inquiryData.contactName,
      email: inquiryData.email,
      businessType: inquiryData.businessType,
      timestamp: new Date().toISOString()
    });

    // For now, we'll just log the inquiry
    // TODO: Integrate with email service and CRM

  } catch (error) {
    console.error('Failed to send retailer notification:', error);
    // Don't throw here - we don't want to fail the API call if notification fails
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Apply rate limiting
  try {
    await runMiddleware(req, res, limiter);
  } catch {
    return res.status(429).json({
      success: false,
      error: 'Too many requests. Please try again later.'
    });
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({
      success: false,
      error: 'Method not allowed. Please use POST.'
    });
  }

  try {
    // Validate and sanitize input data
    const validatedData = validateRetailerInquiry(req.body);

    // Send notifications (email, CRM, etc.)
    await sendRetailerNotification(validatedData);

    // Log successful submission for analytics
    console.log('Retailer inquiry processed successfully:', {
      businessType: validatedData.businessType,
      hasPhone: !!validatedData.phone,
      hasMessage: !!validatedData.message,
      timestamp: new Date().toISOString()
    });

    res.status(200).json({
      success: true,
      message: 'Thank you for your interest! We will contact you within 72 hours to discuss partnership opportunities.'
    });

  } catch (err) {
    console.error('Retailer inquiry error:', err);

    // Return user-friendly error message
    const errorMessage = err instanceof Error ? err.message : 'An error occurred processing your inquiry';

    res.status(400).json({
      success: false,
      error: errorMessage
    });
  }
}
