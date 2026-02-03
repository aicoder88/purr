import { Resend } from 'resend';
import { RESEND_CONFIG, isResendConfigured } from '@/lib/resend-config';
import { OrderConfirmationEmailHTML, getOrderConfirmationEmailSubject } from '@/emails/order-confirmation';

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

export async function POST(req: Request): Promise<Response> {
    try {
        // Verify Resend is configured
        if (!isResendConfigured()) {
            console.error('[Thank You Email] Resend is not configured');
            return Response.json({
                error: 'Email service not configured',
                details: 'RESEND_API_KEY is missing or invalid'
            }, { status: 500 });
        }

        // Extract and validate request body
        const body = await req.json() as SendThankYouEmailRequest;
        const {
            customerEmail,
            customerName,
            orderNumber,
            productName,
            quantity,
            amount,
            locale = 'en'
        } = body;

        // Validate required fields
        if (!customerEmail || !productName || !quantity || !amount) {
            return Response.json({
                error: 'Missing required fields',
                required: ['customerEmail', 'productName', 'quantity', 'amount']
            }, { status: 400 });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(customerEmail)) {
            return Response.json({
                error: 'Invalid email address'
            }, { status: 400 });
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
            return Response.json({
                error: 'Failed to send email',
                details: error
            }, { status: 500 });
        }

        console.log('[Thank You Email] Email sent successfully:', {
            emailId: data?.id,
            to: customerEmail
        });

        return Response.json({
            success: true,
            emailId: data?.id,
            message: 'Thank you email sent successfully'
        });

    } catch (error) {
        console.error('[Thank You Email] Unexpected error:', error);
        return Response.json({
            error: 'Internal server error',
            message: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}
