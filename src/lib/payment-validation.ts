import Stripe from 'stripe';

export interface PaymentValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  metadata?: Record<string, unknown>;
}

export interface PaymentSecurityCheck {
  riskScore: number;
  flags: string[];
  recommendation: 'approve' | 'review' | 'decline';
}

export class PaymentValidator {
  private static stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2025-07-30.basil',
  });

  static async validateCheckoutSession(sessionId: string): Promise<PaymentValidationResult> {
    const result: PaymentValidationResult = {
      isValid: true,
      errors: [],
      warnings: [],
    };

    try {
      const session = await this.stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['payment_intent', 'customer'],
      });

      if (!session) {
        result.isValid = false;
        result.errors.push('Session not found');
        return result;
      }

      if (session.payment_status !== 'paid' && session.payment_status !== 'no_payment_required') {
        result.warnings.push(`Payment status: ${session.payment_status}`);
      }

      if (session.status !== 'complete') {
        result.warnings.push(`Session status: ${session.status}`);
      }

      const amountReceived = session.amount_total || 0;
      const expectedAmount = this.calculateExpectedAmount(session.line_items?.data || []);
      
      if (Math.abs(amountReceived - expectedAmount) > 1) {
        result.errors.push(`Amount mismatch: received ${amountReceived}, expected ${expectedAmount}`);
        result.isValid = false;
      }

      result.metadata = {
        sessionId: session.id,
        customerId: session.customer,
        paymentIntentId: session.payment_intent,
        amountReceived,
        currency: session.currency,
      };

    } catch (error) {
      result.isValid = false;
      result.errors.push(`Validation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }

    return result;
  }

  static async validatePaymentIntent(paymentIntentId: string): Promise<PaymentValidationResult> {
    const result: PaymentValidationResult = {
      isValid: true,
      errors: [],
      warnings: [],
    };

    try {
      const paymentIntent = await this.stripe.paymentIntents.retrieve(paymentIntentId);

      if (!paymentIntent) {
        result.isValid = false;
        result.errors.push('Payment intent not found');
        return result;
      }

      if (paymentIntent.status !== 'succeeded') {
        result.warnings.push(`Payment intent status: ${paymentIntent.status}`);
      }

      if (paymentIntent.amount_received !== paymentIntent.amount) {
        result.errors.push(`Amount mismatch in payment intent`);
        result.isValid = false;
      }

      result.metadata = {
        paymentIntentId: paymentIntent.id,
        status: paymentIntent.status,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        receiptEmail: paymentIntent.receipt_email,
      };

    } catch (error) {
      result.isValid = false;
      result.errors.push(`Payment intent validation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }

    return result;
  }

  static async performSecurityCheck(checkoutData: {
    email: string;
    amount: number;
    currency: string;
    ipAddress?: string;
    userAgent?: string;
  }): Promise<PaymentSecurityCheck> {
    const check: PaymentSecurityCheck = {
      riskScore: 0,
      flags: [],
      recommendation: 'approve',
    };

    const amountUSD = checkoutData.currency === 'cad' 
      ? checkoutData.amount * 0.74 
      : checkoutData.amount;

    if (amountUSD > 50000) {
      check.riskScore += 30;
      check.flags.push('High amount transaction');
    }

    const emailDomain = checkoutData.email.split('@')[1]?.toLowerCase();
    const suspiciousDomains = ['tempmail.org', '10minutemail.com', 'guerrillamail.com'];
    if (suspiciousDomains.includes(emailDomain)) {
      check.riskScore += 20;
      check.flags.push('Suspicious email domain');
    }

    const recentTransactions = await this.getRecentTransactionsByEmail(checkoutData.email);
    if (recentTransactions > 3) {
      check.riskScore += 15;
      check.flags.push('Multiple recent transactions');
    }

    if (checkoutData.userAgent && this.isSuspiciousUserAgent(checkoutData.userAgent)) {
      check.riskScore += 10;
      check.flags.push('Suspicious user agent');
    }

    if (check.riskScore >= 50) {
      check.recommendation = 'decline';
    } else if (check.riskScore >= 25) {
      check.recommendation = 'review';
    }

    return check;
  }

  private static calculateExpectedAmount(lineItems: Array<{ amount_total?: number }>): number {
    return lineItems.reduce((total, item) => {
      return total + (item.amount_total || 0);
    }, 0);
  }

  private static async getRecentTransactionsByEmail(email: string): Promise<number> {
    try {
      const oneDayAgo = Math.floor(Date.now() / 1000) - 86400;
      const charges = await this.stripe.charges.list({
        limit: 10,
        created: { gte: oneDayAgo },
      });

      return charges.data.filter(charge => 
        charge.billing_details?.email === email
      ).length;
    } catch {
      return 0;
    }
  }

  private static isSuspiciousUserAgent(userAgent: string): boolean {
    const suspiciousPatterns = [
      /bot/i,
      /crawler/i,
      /spider/i,
      /curl/i,
      /wget/i,
      /python-requests/i,
    ];

    return suspiciousPatterns.some(pattern => pattern.test(userAgent));
  }

  static async validateRefund(refundId: string): Promise<PaymentValidationResult> {
    const result: PaymentValidationResult = {
      isValid: true,
      errors: [],
      warnings: [],
    };

    try {
      const refund = await this.stripe.refunds.retrieve(refundId);

      if (!refund) {
        result.isValid = false;
        result.errors.push('Refund not found');
        return result;
      }

      if (refund.status !== 'succeeded') {
        result.warnings.push(`Refund status: ${refund.status}`);
      }

      result.metadata = {
        refundId: refund.id,
        status: refund.status,
        amount: refund.amount,
        chargeId: refund.charge,
      };

    } catch (error) {
      result.isValid = false;
      result.errors.push(`Refund validation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }

    return result;
  }
}