import { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';
import { RESEND_CONFIG, isResendConfigured } from '../../../src/lib/resend-config';
import { OrderConfirmationEmailHTML, getOrderConfirmationEmailSubject } from '../../../src/emails/order-confirmation';

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendThankYouEmailRequest {
    customerEmail: string;
    customerName?: string;
    orderNumber?: string;
    productName: string;
    quantity: number;
    amount: number; // Amount in cents
    locale?: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // Verify Resend is configured
        if (!isResendConfigured()) {
            console.error('[Thank You Email] Resend is not configured');
            return res.status(500).json({
                error: 'Email service not configured',
                details: 'RESEND_API_KEY is missing or invalid'
            });
        }

        // Extract and validate request body
        const {
            customerEmail,
            customerName,
            orderNumber,
            productName,
            quantity,
            amount,
            locale = 'en'
        } = req.body as SendThankYouEmailRequest;

        // Validate required fields
        if (!customerEmail || !productName || !quantity || !amount) {
            return res.status(400).json({
                error: 'Missing required fields',
                required: ['customerEmail', 'productName', 'quantity', 'amount']
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(customerEmail)) {
            return res.status(400).json({
                error: 'Invalid email address'
            });
        }

        // Validate locale
        const validLocales = ['en', 'fr', 'zh'];
        const emailLocale = validLocales.includes(locale) ? locale : 'en';

        console.log('[Thank You Email] Preparing to send email:', {
            to: customerEmail,
            product: productName,
            amount: amount / 100,
            locale: emailLocale
        });

        // Generate email HTML
        const emailHTML = OrderConfirmationEmailHTML({
            customerEmail,
            customerName,
            orderNumber,
            productName,
            quantity,
            amount,
            locale: emailLocale
        });

        const emailSubject = getOrderConfirmationEmailSubject(emailLocale);

        // Send email via Resend
        const { data, error } = await resend.emails.send({
            from: `${RESEND_CONFIG.fromName} <${RESEND_CONFIG.fromEmail}>`,
            to: customerEmail,
            subject: emailSubject,
            html: emailHTML,
        });

        if (error) {
            console.error('[Thank You Email] Resend API error:', error);
            return res.status(500).json({
                error: 'Failed to send email',
                details: error
            });
        }

        console.log('[Thank You Email] Email sent successfully:', {
            emailId: data?.id,
            to: customerEmail
        });

        return res.status(200).json({
            success: true,
            emailId: data?.id,
            message: 'Thank you email sent successfully'
        });

    } catch (error) {
        console.error('[Thank You Email] Unexpected error:', error);
        return res.status(500).json({
            error: 'Internal server error',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}
