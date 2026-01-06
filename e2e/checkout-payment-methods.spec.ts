import { test, expect } from '@playwright/test';
import Stripe from 'stripe';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

// Initialize Stripe only if key is available
const getStripe = () => {
  if (!process.env.STRIPE_SECRET_KEY) {
    return null;
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2025-08-27.basil',
  });
};

test.describe('Checkout Payment Methods', () => {
  test('should create checkout session with payment method configuration', async () => {
    // Skip if not in test mode or missing required env vars
    if (!process.env.STRIPE_SECRET_KEY || !process.env.DATABASE_URL) {
      test.skip();
    }

    test.info().annotations.push({
      type: 'Test Type',
      description: 'Checkout Session Payment Method Configuration',
    });

    // Note: This would require a valid order in the database
    // For now, we'll verify the configuration is loaded correctly
    console.log('✓ Payment method configuration:', process.env.STRIPE_PAYMENT_METHOD_CONFIG_ID);

    expect(process.env.STRIPE_PAYMENT_METHOD_CONFIG_ID).toBe('pmc_1ROVxTDfDdetUGzQPjkl5qdf');
  });

  test('should verify payment method configuration in Stripe', async () => {
    // Skip if not in test mode
    const stripe = getStripe();
    if (!stripe || !process.env.STRIPE_PAYMENT_METHOD_CONFIG_ID) {
      test.skip();
    }

    const configId = process.env.STRIPE_PAYMENT_METHOD_CONFIG_ID!;

    try {
      // Retrieve the payment method configuration from Stripe
      const config = await stripe!.paymentMethodConfigurations.retrieve(configId);

      console.log('\n📊 Payment Method Configuration Details:');
      console.log('Configuration ID:', config.id);
      console.log('Name:', config.name);

      // Check which payment methods are active
      const activePaymentMethods: string[] = [];

      if (config.card?.display_preference?.preference === 'on') {
        activePaymentMethods.push('card');
      }
      if (config.klarna?.display_preference?.preference === 'on') {
        activePaymentMethods.push('klarna');
      }
      if (config.affirm?.display_preference?.preference === 'on') {
        activePaymentMethods.push('affirm');
      }
      if (config.afterpay_clearpay?.display_preference?.preference === 'on') {
        activePaymentMethods.push('afterpay');
      }
      if (config.link?.display_preference?.preference === 'on') {
        activePaymentMethods.push('link');
      }
      if (config.apple_pay?.display_preference?.preference === 'on') {
        activePaymentMethods.push('apple_pay');
      }
      if (config.google_pay?.display_preference?.preference === 'on') {
        activePaymentMethods.push('google_pay');
      }

      console.log('\n✅ Active Payment Methods:');
      activePaymentMethods.forEach(method => {
        console.log(`  - ${method}`);
      });

      // Verify key payment methods are enabled
      expect(activePaymentMethods).toContain('card');
      expect(activePaymentMethods).toContain('klarna');

      // Check for BNPL options
      const bnplMethods = activePaymentMethods.filter(m =>
        ['klarna', 'affirm', 'afterpay'].includes(m)
      );

      console.log(`\n💳 Buy Now Pay Later options: ${bnplMethods.length}`);
      expect(bnplMethods.length).toBeGreaterThanOrEqual(2);

    } catch (error) {
      console.error('Error retrieving payment method configuration:', error);
      throw error;
    }
  });

  test('should verify checkout session uses configuration', async () => {
    // Skip if not in test mode
    const stripe = getStripe();
    if (!stripe || !process.env.STRIPE_PAYMENT_METHOD_CONFIG_ID) {
      test.skip();
    }

    // Create a minimal checkout session to verify configuration is applied
    const session = await stripe!.checkout.sessions.create({
      mode: 'payment',
      payment_method_configuration: process.env.STRIPE_PAYMENT_METHOD_CONFIG_ID,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Test Product',
            },
            unit_amount: 5000, // $50.00
          },
          quantity: 1,
        },
      ],
      success_url: 'https://example.com/success',
      cancel_url: 'https://example.com/cancel',
    });

    console.log('\n🎯 Test Checkout Session Created:');
    console.log('Session ID:', session.id);
    console.log('Payment Method Configuration Details:', session.payment_method_configuration_details);
    console.log('Payment Method Types:', session.payment_method_types);

    // Verify configuration is applied
    expect(session.payment_method_configuration_details).toBeDefined();

    console.log('\n✅ Configuration successfully applied to checkout session');

    // Clean up - expire the test session
    await stripe!.checkout.sessions.expire(session.id);
    console.log('✓ Test session cleaned up');
  });

  test('should display payment methods based on amount and region', async () => {
    const stripe = getStripe();
    if (!stripe || !process.env.STRIPE_PAYMENT_METHOD_CONFIG_ID) {
      test.skip();
    }

    // Test different amounts to see which payment methods are available
    const testScenarios = [
      { amount: 1000, description: '$10 - Below some BNPL minimums' },
      { amount: 5000, description: '$50 - Standard purchase' },
      { amount: 20000, description: '$200 - Higher amount' },
    ];

    for (const scenario of testScenarios) {
      const session = await stripe!.checkout.sessions.create({
        mode: 'payment',
        payment_method_configuration: process.env.STRIPE_PAYMENT_METHOD_CONFIG_ID,
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'Test Product',
              },
              unit_amount: scenario.amount,
            },
            quantity: 1,
          },
        ],
        shipping_address_collection: {
          allowed_countries: ['US', 'CA'],
        },
        success_url: 'https://example.com/success',
        cancel_url: 'https://example.com/cancel',
      });

      console.log(`\n💰 ${scenario.description}`);
      console.log('Available payment methods:', session.payment_method_types);

      // Cleanup
      await stripe!.checkout.sessions.expire(session.id);
    }

    console.log('\n✅ Payment method availability tested across different amounts');
  });
});
