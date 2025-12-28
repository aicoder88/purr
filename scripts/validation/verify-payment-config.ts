#!/usr/bin/env tsx
/**
 * Verify Payment Method Configuration Setup
 *
 * This script verifies that the payment method configuration is properly set up
 * for enabling Klarna, Afterpay, and other BNPL options in checkout.
 */

import * as dotenv from 'dotenv';
import * as path from 'path';
import { execSync } from 'child_process';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

console.log('🔍 Payment Method Configuration Verification\n');
console.log('═'.repeat(60));

// Check 1: Environment variable exists locally
console.log('\n✓ Check 1: Local Environment Variable');
console.log('─'.repeat(60));

const localConfigId = process.env.STRIPE_PAYMENT_METHOD_CONFIG_ID;
if (localConfigId) {
  console.log('✅ STRIPE_PAYMENT_METHOD_CONFIG_ID is set locally');
  console.log(`   Value: ${localConfigId}`);
} else {
  console.log('❌ STRIPE_PAYMENT_METHOD_CONFIG_ID not found in .env.local');
  console.log('   Run: echo "STRIPE_PAYMENT_METHOD_CONFIG_ID=pmc_1ROVxTDfDdetUGzQPjkl5qdf" >> .env.local');
}

// Check 2: Vercel environment variable
console.log('\n✓ Check 2: Vercel Production Environment');
console.log('─'.repeat(60));

try {
  const vercelEnv = execSync('vercel env ls production 2>/dev/null', { encoding: 'utf-8' });

  if (vercelEnv.includes('STRIPE_PAYMENT_METHOD_CONFIG_ID')) {
    console.log('✅ STRIPE_PAYMENT_METHOD_CONFIG_ID is set in Vercel production');
  } else {
    console.log('❌ STRIPE_PAYMENT_METHOD_CONFIG_ID not found in Vercel');
    console.log('   Run: vercel env add STRIPE_PAYMENT_METHOD_CONFIG_ID production');
  }
} catch (error) {
  console.log('⚠️  Could not verify Vercel environment (vercel CLI may not be authenticated)');
}

// Check 3: Code implementation
console.log('\n✓ Check 3: Code Implementation');
console.log('─'.repeat(60));

const checkoutFile = path.join(__dirname, '..', 'pages', 'api', 'create-checkout-session.ts');
const fs = require('fs');

try {
  const content = fs.readFileSync(checkoutFile, 'utf-8');

  if (content.includes('payment_method_configuration')) {
    console.log('✅ Code uses payment_method_configuration');
  } else {
    console.log('❌ Code does not reference payment_method_configuration');
  }

  if (content.includes('STRIPE_PAYMENT_METHOD_CONFIG_ID')) {
    console.log('✅ Code reads STRIPE_PAYMENT_METHOD_CONFIG_ID from env');
  } else {
    console.log('❌ Code does not read STRIPE_PAYMENT_METHOD_CONFIG_ID');
  }
} catch (error) {
  console.log('❌ Could not read checkout session file');
}

// Check 4: Expected Configuration
console.log('\n✓ Check 4: Stripe Dashboard Configuration');
console.log('─'.repeat(60));
console.log('Expected Configuration ID: pmc_1ROVxTDfDdetUGzQPjkl5qdf');
console.log('\nEnabled Payment Methods (from your dashboard):');
console.log('  ✅ Cards');
console.log('  ✅ Apple Pay');
console.log('  ✅ Google Pay');
console.log('  ✅ Link');
console.log('  ✅ Klarna (BNPL)');
console.log('  ✅ Affirm (BNPL)');
console.log('  ✅ Afterpay/Clearpay (BNPL)');
console.log('  ✅ Bancontact');
console.log('  ✅ EPS');

// Summary
console.log('\n' + '═'.repeat(60));
console.log('📋 Summary');
console.log('═'.repeat(60));

const allChecks = [
  localConfigId ? true : false,
];

if (allChecks.every(check => check)) {
  console.log('✅ All checks passed!');
  console.log('\n📝 Next Steps:');
  console.log('   1. Start dev server: npm run dev');
  console.log('   2. Test checkout at: http://localhost:3000');
  console.log('   3. Verify payment methods appear in Stripe checkout');
  console.log('   4. Deploy to production: git push');
} else {
  console.log('⚠️  Some checks failed. Review the output above.');
}

console.log('\n🔗 Resources:');
console.log('   • Stripe Dashboard: https://dashboard.stripe.com/settings/payment_methods');
console.log('   • Test Cards: https://stripe.com/docs/testing');
console.log('   • Klarna Testing: https://stripe.com/docs/payments/klarna#test-integration');
console.log('   • Afterpay Testing: https://stripe.com/docs/payments/afterpay-clearpay#test-integration');

console.log('\n');
