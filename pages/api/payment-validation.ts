import { NextApiRequest, NextApiResponse } from 'next';
import { PaymentValidator } from '../../src/lib/payment-validation';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { type, sessionId, paymentIntentId, refundId } = req.body;

      if (!type) {
        return res.status(400).json({ error: 'Validation type is required' });
      }

      let validationResult;

      switch (type) {
        case 'checkout_session':
          if (!sessionId) {
            return res.status(400).json({ error: 'Session ID is required for checkout session validation' });
          }
          validationResult = await PaymentValidator.validateCheckoutSession(sessionId);
          break;

        case 'payment_intent':
          if (!paymentIntentId) {
            return res.status(400).json({ error: 'Payment Intent ID is required for payment intent validation' });
          }
          validationResult = await PaymentValidator.validatePaymentIntent(paymentIntentId);
          break;

        case 'refund':
          if (!refundId) {
            return res.status(400).json({ error: 'Refund ID is required for refund validation' });
          }
          validationResult = await PaymentValidator.validateRefund(refundId);
          break;

        case 'security_check':
          const { email, amount, currency, ipAddress, userAgent } = req.body;
          if (!email || !amount || !currency) {
            return res.status(400).json({ error: 'Email, amount, and currency are required for security check' });
          }
          
          const securityCheck = await PaymentValidator.performSecurityCheck({
            email,
            amount,
            currency,
            ipAddress,
            userAgent,
          });

          return res.status(200).json({ 
            success: true, 
            securityCheck,
            recommendation: securityCheck.recommendation 
          });

        default:
          return res.status(400).json({ error: 'Invalid validation type' });
      }

      if (validationResult) {
        const statusCode = validationResult.isValid ? 200 : 400;
        res.status(statusCode).json({ 
          success: validationResult.isValid, 
          validation: validationResult 
        });
      }
    } catch (error) {
      console.error('Payment validation failed:', error);
      res.status(500).json({ error: 'Payment validation failed' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: 'Method not allowed' });
  }
}