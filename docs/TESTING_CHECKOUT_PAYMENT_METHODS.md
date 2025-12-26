# Testing Checkout Payment Methods

This guide walks you through testing the payment method configuration (Klarna, Afterpay, Affirm, etc.) in your checkout.

## ✅ Pre-Flight Verification

Your configuration is set up correctly:
- **Local environment:** ✅ `STRIPE_PAYMENT_METHOD_CONFIG_ID` set
- **Vercel production:** ✅ Environment variable configured
- **Code implementation:** ✅ Using payment method configuration
- **Configuration ID:** `pmc_1ROVxTDfDdetUGzQPjkl5qdf`

## 🧪 Manual Testing Steps

### 1. Start Development Server

```bash
npm run dev
```

Visit: http://localhost:3000

### 2. Add Products to Cart

1. Navigate to your product page
2. Add items to cart (total should be **>$35** for Klarna/Afterpay to show)
3. Proceed to checkout

### 3. Create Checkout Session

When you click the checkout button, your app will call `/api/create-checkout-session` which now includes:

```typescript
payment_method_configuration: 'pmc_1ROVxTDfDdetUGzQPjkl5qdf'
```

### 4. Verify Payment Methods in Stripe Checkout

You should see these payment methods (depending on cart amount and shipping country):

| Method | When Visible | Amount Range |
|--------|--------------|--------------|
| **Cards** | Always | Any |
| **Apple Pay** | If on Apple device | Any |
| **Google Pay** | If on Android/Chrome | Any |
| **Link** | Always | Any |
| **Klarna** | Cart > $35, Ships to US/CA/EU | $35 - $10,000 |
| **Affirm** | Cart > $50, Ships to US/CA | $50 - $30,000 |
| **Afterpay** | Cart > $35, Ships to US/CA/UK/AU | $35 - $2,000 |

### 5. Test Different Scenarios

#### Test 1: Low Amount ($10)
- **Expected:** Cards, Link, Apple Pay, Google Pay only
- **Why:** Below BNPL minimums

#### Test 2: Medium Amount ($50)
- **Expected:** All methods including Klarna, Affirm, Afterpay
- **Why:** Meets minimum thresholds

#### Test 3: High Amount ($500)
- **Expected:** All methods
- **Why:** Within all maximum thresholds

### 6. Test Klarna Payment (Test Mode)

1. Select **Klarna** as payment method
2. Enter test information:
   - Email: `test@example.com`
   - Phone: Any format (e.g., `123-456-7890`)
3. Complete the Klarna authorization flow
4. Verify payment succeeds

**Klarna Test Numbers:**
- All Klarna test payments auto-approve in Stripe test mode
- See: https://stripe.com/docs/payments/klarna#test-integration

### 7. Test Afterpay Payment (Test Mode)

1. Select **Afterpay** or **Clearpay** (depending on region)
2. Enter test information
3. Complete authorization
4. Verify payment succeeds

**Afterpay Test:**
- Test mode auto-approves
- See: https://stripe.com/docs/payments/afterpay-clearpay#test-integration

## 🔍 Debugging

### Payment Method Not Showing?

Check these conditions:

1. **Amount too low/high**
   ```bash
   Klarna: $35 - $10,000
   Affirm: $50 - $30,000
   Afterpay: $35 - $2,000
   ```

2. **Wrong shipping country**
   - Your checkout limits to `US` and `CA`
   - Klarna works in both
   - Afterpay works in both

3. **Configuration not loading**
   ```bash
   # Verify env variable
   npm run verify-payment-config

   # Restart dev server
   npm run dev
   ```

### Check Stripe Checkout Logs

1. Go to: https://dashboard.stripe.com/test/logs
2. Filter by "checkout.session.created"
3. Look for `payment_method_configuration` field
4. Should show: `pmc_1ROVxTDfDdetUGzQPjkl5qdf`

### Check Browser Console

Open DevTools → Network tab:
1. Find the request to `/api/create-checkout-session`
2. Check the response
3. Verify `sessionId` is returned
4. Check for any errors

## 📊 Verification Commands

```bash
# Verify configuration
npx tsx scripts/verify-payment-config.ts

# Check Sentry logs for checkout events
# (Look for "Creating Stripe checkout session" logs)

# Test checkout API directly (requires valid order ID)
curl -X POST http://localhost:3000/api/create-checkout-session \
  -H "Content-Type: application/json" \
  -d '{
    "orderId": "test-order-id",
    "customer": {
      "email": "test@example.com",
      "name": "Test User"
    }
  }'
```

## 🚀 Production Testing

After deploying to production:

```bash
git add .
git commit -m "feat: enable Klarna, Afterpay payment methods"
git push
```

Then test on production:
1. Visit: https://purrify.ca
2. Add items to cart ($50+)
3. Proceed to checkout
4. **Use Stripe test mode** if available, or
5. **Use real payment methods** (you can refund after)

## 📈 Monitoring

### Sentry Logs

Check Sentry for these log messages:
- "Creating Stripe checkout session"
- "Using payment method configuration"
- Should include `configId: pmc_1ROVxTDfDdetUGzQPjkl5qdf`

### Stripe Dashboard

Monitor payment method usage:
1. Go to: https://dashboard.stripe.com/payments
2. Filter by payment method
3. Track conversion rates by method

## 🎯 Success Criteria

✅ **Configuration verified:** All checks pass
✅ **Payment methods show:** Klarna, Afterpay, Affirm visible for qualifying orders
✅ **Test payments work:** Can complete test transactions
✅ **Logs confirm:** Sentry shows configuration ID in checkout logs
✅ **Production ready:** Deployed and tested on live site

## 📞 Support Resources

- **Stripe Docs:** https://stripe.com/docs/payments/payment-methods
- **Klarna Guide:** https://stripe.com/docs/payments/klarna
- **Afterpay Guide:** https://stripe.com/docs/payments/afterpay-clearpay
- **Test Cards:** https://stripe.com/docs/testing

## 🔧 Quick Verification Script

```bash
# Run this anytime to verify setup
npx tsx scripts/verify-payment-config.ts
```

---

**Last Updated:** 2025-12-26
**Configuration ID:** `pmc_1ROVxTDfDdetUGzQPjkl5qdf`
