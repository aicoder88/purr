import type { NextApiRequest, NextApiResponse } from 'next';

type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

type ResponseData = {
  success: boolean;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Only allow POST method
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { name, email, message } = req.body as ContactFormData;

    // Validate form data
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields' 
      });
    }

    // In a real implementation, you would send the email here
    // For example, using a service like SendGrid, Mailgun, or AWS SES
    // For now, we'll just simulate a successful email send
    
    console.log('Contact form submission:', { name, email, message });

    // Return success response
    return res.status(200).json({ 
      success: true, 
      message: 'Message sent successfully!' 
    });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'An error occurred while sending your message' 
    });
  }
}