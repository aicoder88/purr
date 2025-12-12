import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

type AffiliateSignupData = {
  name: string;
  email: string;
  website: string;
  audience: string;
  trafficSource: string;
  monthlyVisitors: string;
  experience: string;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data: AffiliateSignupData = req.body;

    // Validate required fields
    if (!data.name || !data.email || !data.audience || !data.trafficSource || !data.monthlyVisitors || !data.experience) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // Send email notification via Resend
    const emailContent = `
      <h2>New Affiliate Application</h2>
      <p>A new affiliate has applied to join the Purrify affiliate program.</p>

      <h3>Applicant Information:</h3>
      <ul>
        <li><strong>Name:</strong> ${data.name}</li>
        <li><strong>Email:</strong> ${data.email}</li>
        <li><strong>Website/Social:</strong> ${data.website || 'Not provided'}</li>
        <li><strong>Audience:</strong> ${data.audience}</li>
        <li><strong>Primary Traffic Source:</strong> ${data.trafficSource}</li>
        <li><strong>Monthly Visitors/Followers:</strong> ${data.monthlyVisitors}</li>
        <li><strong>Affiliate Experience:</strong> ${data.experience}</li>
      </ul>

      ${data.message ? `
        <h3>Message:</h3>
        <p>${data.message}</p>
      ` : ''}

      <hr />
      <p style="color: #666; font-size: 12px;">
        This email was sent from the Purrify affiliate signup form at ${new Date().toLocaleString()}
      </p>
    `;

    // Log the email attempt for debugging
    console.log('Attempting to send email to:', process.env.ADMIN_EMAIL || 'hello@purrify.ca');
    console.log('Applicant:', data.name, data.email);

    const emailResult = await resend.emails.send({
      from: 'onboarding@resend.dev', // Use Resend's verified domain for testing
      to: process.env.ADMIN_EMAIL || 'hello@purrify.ca',
      replyTo: data.email,
      subject: `New Affiliate Application: ${data.name}`,
      html: emailContent,
    });

    console.log('Email sent successfully:', emailResult);

    return res.status(200).json({
      success: true,
      message: 'Application submitted successfully'
    });
  } catch (error) {
    console.error('Affiliate signup error:', error);
    return res.status(500).json({
      error: 'Failed to submit application. Please try again later.'
    });
  }
}
