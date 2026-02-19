# Stripe Integration

### Local Development Setup
1. Install Stripe CLI: `brew install stripe/stripe-cli/stripe`
2. Login: `stripe login`
3. Forward webhooks to local:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```
4. Copy webhook signing secret to `.env.local`:
   ```
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```

### Testing Payments Locally
1. Use Stripe test cards: `4242 4242 4242 4242`
2. Any future expiry date
3. Any 3-digit CVC

### Debugging Stripe
```bash
# View webhook events
stripe listen --print-secret

# View recent events
stripe events list

# Test webhook locally
stripe trigger payment_intent.succeeded
```
