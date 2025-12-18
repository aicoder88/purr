# Purrify Retailer Portal - Setup & Configuration Guide

This document outlines the complete setup required for the Purrify retailer portal system, including authentication, payments, order management, and automated shipping.

## Overview

The retailer portal allows wholesale customers to:
- Register for wholesale accounts (pending admin approval)
- Log in securely with JWT authentication
- Browse products at wholesale prices
- Place orders with minimum quantity requirements
- Pay via Stripe checkout
- Track orders through ShipStation integration
- Receive automated email notifications

---

## 1. Database Setup

### Run Prisma Migration

```bash
# Generate Prisma client with new retailer models
npx prisma generate

# Create migration for new tables
npx prisma migrate dev --name add_retailer_portal

# Or push schema directly to database (for development)
npx prisma db push
```

### New Database Tables Created:
- `retailers` - Retailer account information
- `shipping_addresses` - Retailer shipping addresses
- `billing_addresses` - Retailer billing addresses (optional)
- `retailer_orders` - Wholesale orders
- `retailer_order_items` - Order line items

### Updated Tables:
- `products` - Added `wholesalePrice`, `minimumOrder`, `retailerOrderItems` relation

---

## 2. Environment Variables

Add these to your `.env` file:

```bash
# Retailer Authentication
RETAILER_JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Stripe Configuration (existing, ensure they're set)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_BASE_URL=https://www.purrify.ca

# ShipStation API Credentials
SHIPSTATION_API_KEY=your-shipstation-api-key
SHIPSTATION_API_SECRET=your-shipstation-api-secret
```

### How to Get ShipStation API Credentials:
1. Log in to your ShipStation account
2. Go to Settings > API Settings
3. Copy your **API Key** and **API Secret**
4. Add them to your `.env` file

---

## 3. Install Required Dependencies

```bash
npm install bcryptjs @types/bcryptjs jsonwebtoken @types/jsonwebtoken
```

These packages are required for:
- `bcryptjs` - Password hashing and verification
- `jsonwebtoken` - JWT token generation and verification for retailer sessions

---

## 4. Stripe Configuration

### Update Stripe API Version
The retailer checkout endpoint uses `2025-01-27.acacia`. Ensure this matches your Stripe account settings.

### Stripe Webhook Events to Listen For:
- `checkout.session.completed` - Payment successful
- `checkout.session.expired` - Session expired

### Webhook Endpoint:
```
POST https://www.purrify.ca/api/webhooks/stripe
```

### Testing Webhooks Locally:
```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login to Stripe
stripe login

# Forward webhooks to local server
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

---

## 5. ShipStation Integration

### Setup Steps:

#### A. Configure Webhook in ShipStation
1. Log in to ShipStation
2. Navigate to **Settings > Integrations > Webhooks**
3. Click **Add Webhook**
4. Set URL: `https://www.purrify.ca/api/shipstation/webhook`
5. Select event: **Ship Notify**
6. Save webhook

#### B. Automatic Order Creation Flow
1. Retailer completes payment via Stripe
2. Stripe webhook marks order as `PAID`
3. Admin or automated process calls `/api/shipstation/create-order` with `orderId`
4. Order is created in ShipStation with status `awaiting_shipment`
5. When ShipStation ships the order, webhook updates order status to `SHIPPED`
6. Tracking number is automatically saved to database
7. Email notification sent to retailer with tracking info (TODO: implement email)

#### C. Manual Order Creation (for testing)
```bash
# Create ShipStation order after payment
curl -X POST https://www.purrify.ca/api/shipstation/create-order \
  -H "Content-Type: application/json" \
  -d '{"orderId": "retailer-order-id-here"}'
```

---

## 6. Email Notification System (TODO)

### Required Email Templates:

#### A. Retailer Registration
- **Trigger**: New retailer registers
- **Recipient**: Admin email
- **Content**: New wholesale application notification with approval link

#### B. Account Approved
- **Trigger**: Admin approves retailer account
- **Recipient**: Retailer email
- **Content**: Welcome message, login instructions, wholesale pricing

#### C. Account Rejected
- **Trigger**: Admin rejects retailer account
- **Recipient**: Retailer email
- **Content**: Rejection reason, contact information

#### D. Order Confirmation
- **Trigger**: Order payment successful (Stripe webhook)
- **Recipient**: Retailer email
- **Content**: Order summary, total amount, estimated shipping date

#### E. Order Shipped
- **Trigger**: ShipStation webhook (ship notify)
- **Recipient**: Retailer email
- **Content**: Tracking number, carrier info, delivery estimate

#### F. Order Delivered
- **Trigger**: ShipStation webhook (delivery notify)
- **Recipient**: Retailer email
- **Content**: Delivery confirmation, request for feedback

### Recommended Email Service:
- **SendGrid** (current for consumer emails)
- **Resend** (modern alternative)
- **AWS SES** (cost-effective for high volume)

### Implementation:
Create `/src/lib/retailer-emails.ts` with email templates and sending logic.

---

## 7. Admin Portal (TODO)

To fully manage retailer accounts, you'll need an admin portal with these features:

### Required Admin Functions:
1. **Approve/Reject Retailer Applications**
   - View pending retailer registrations
   - Approve or reject with notes
   - Set wholesale pricing tiers

2. **Manage Retailer Accounts**
   - Edit retailer information
   - Suspend/reactivate accounts
   - View order history

3. **Process Orders**
   - View all retailer orders
   - Manually create ShipStation orders
   - Update order status
   - Add tracking numbers manually

4. **Set Wholesale Pricing**
   - Configure wholesale prices per product
   - Set minimum order quantities
   - Create volume discounts

### Quick Admin Endpoint Examples:
```typescript
// Approve retailer
POST /api/admin/retailers/approve
{
  "retailerId": "retailer-id",
  "approvedBy": "admin-user-id"
}

// Update wholesale pricing
POST /api/admin/products/pricing
{
  "productId": "product-id",
  "wholesalePrice": 15.99,
  "minimumOrder": 24
}
```

---

## 8. Product Configuration

### Update Existing Products with Wholesale Pricing:

```typescript
// Example: Update product with wholesale info
await prisma.product.update({
  where: { id: 'product-id' },
  data: {
    wholesalePrice: 15.99,  // Consumer price might be $24.99
    minimumOrder: 24,        // Minimum case quantity
  },
});
```

### Wholesale Pricing Guidelines:
- **Consumer Price**: $24.99 (140g bag)
- **Wholesale Price**: $15.99 (36% discount)
- **Minimum Order**: 24 units (one case)

---

## 9. Testing the System

### Test Flow:

#### A. Register Retailer Account
1. Visit: `https://www.purrify.ca/retailer/portal/login`
2. Click "Apply for wholesale access"
3. Fill out registration form
4. Submit application (status: PENDING)

#### B. Approve Account (Manual Database Update)
```sql
-- Approve retailer account
UPDATE retailers
SET status = 'ACTIVE',
    approved_at = NOW(),
    approved_by = 'admin-user-id'
WHERE email = 'test-retailer@example.com';
```

#### C. Login to Portal
1. Visit: `https://www.purrify.ca/retailer/portal/login`
2. Enter email and password
3. Should redirect to dashboard

#### D. Create Test Order
1. Browse products at wholesale prices
2. Add items to cart (respecting minimum quantities)
3. Proceed to checkout
4. Complete payment via Stripe test mode

#### E. Verify Order in Database
```sql
SELECT * FROM retailer_orders ORDER BY created_at DESC LIMIT 1;
SELECT * FROM retailer_order_items WHERE order_id = 'order-id-from-above';
```

#### F. Create ShipStation Order (Manual)
```bash
curl -X POST http://localhost:3000/api/shipstation/create-order \
  -H "Content-Type: application/json" \
  -d '{"orderId": "retailer-order-id"}'
```

#### G. Simulate Shipment (ShipStation Webhook)
Use ShipStation UI to ship the order, or test webhook manually:
```bash
curl -X POST http://localhost:3000/api/shipstation/webhook \
  -H "Content-Type: application/json" \
  -d '{
    "resource_type": "SHIP_NOTIFY",
    "resource_url": "https://ssapi.shipstation.com/shipments/..."
  }'
```

---

## 10. Security Considerations

### Authentication:
- JWT tokens expire after 7 days
- Passwords hashed with bcrypt (10 rounds)
- Tokens stored in localStorage (consider httpOnly cookies for production)

### API Protection:
- All retailer endpoints require valid JWT token
- Order access restricted to order owner
- Stripe webhook signature verification enabled

### Data Encryption:
- Retailer addresses should be encrypted at application level (TODO)
- PCI compliance for payment data (handled by Stripe)

### Rate Limiting:
Consider adding rate limiting to:
- Login endpoint (prevent brute force)
- Registration endpoint (prevent spam)
- Order creation endpoint

---

## 11. Navigation Updates

### Add Retailer Portal Link to Header:

Update `/src/components/layout/Header.tsx`:

```tsx
// Add to navigation items
{
  label: 'For Retailers',
  href: '/retailers',
  dropdown: [
    { label: 'Wholesale Information', href: '/retailers' },
    { label: 'Portal Login', href: '/retailer/portal/login' },
  ]
}
```

---

## 12. Deployment Checklist

Before deploying to production:

- [ ] Run Prisma migration on production database
- [ ] Add all environment variables to Vercel
- [ ] Update Stripe API version if needed
- [ ] Configure ShipStation webhook with production URL
- [ ] Set up email notification system
- [ ] Implement admin approval portal
- [ ] Add rate limiting to authentication endpoints
- [ ] Enable HTTPS-only cookies for JWT tokens
- [ ] Test complete order flow end-to-end
- [ ] Set up monitoring for failed orders/webhooks
- [ ] Document admin procedures for order fulfillment

---

## 13. Future Enhancements

### Phase 2 Features:
- **Admin Dashboard**: Full admin portal for managing retailers and orders
- **Email Automation**: Complete email notification system
- **Inventory Management**: Real-time stock tracking
- **Advanced Pricing**: Volume discounts, promotional pricing
- **Reporting**: Sales analytics, top customers, revenue tracking
- **Multi-Currency**: USD support for US retailers
- **Credit Terms**: Net 30/60 payment terms for approved retailers

### Phase 3 Features:
- **Automatic Reordering**: AI-based demand forecasting
- **Dropshipping**: Direct-to-consumer fulfillment for retailers
- **Marketing Materials**: Downloadable assets and POS materials
- **Training Portal**: Product education for retail staff

---

## 14. Troubleshooting

### Common Issues:

#### Issue: "Invalid token" error when accessing portal
**Solution**: Token may have expired. Clear localStorage and login again.

#### Issue: ShipStation order creation fails
**Solution**:
1. Verify API credentials in `.env`
2. Check ShipStation API status
3. Ensure order is in `PAID` status
4. Verify shipping address is complete

#### Issue: Stripe webhook not triggering
**Solution**:
1. Check webhook endpoint in Stripe dashboard
2. Verify webhook secret matches `.env`
3. Test with Stripe CLI: `stripe trigger checkout.session.completed`

#### Issue: Retailer can't login (account pending)
**Solution**: Admin must manually approve account or create approval endpoint.

---

## 15. Support & Maintenance

### Log Monitoring:
- Monitor Vercel logs for API errors
- Set up alerts for failed Stripe webhooks
- Track ShipStation API rate limits

### Database Maintenance:
- Regular backups of retailer data
- Archive old orders (>1 year)
- Monitor database size and performance

### Customer Support:
- Email: wholesale@purrify.ca (TODO: set up)
- Phone: Display on retailer portal
- Response time: Within 24 hours for wholesale inquiries

---

## Contact

For questions about this implementation, contact the development team or refer to:
- Stripe Documentation: https://stripe.com/docs/api
- ShipStation API Docs: https://www.shipstation.com/docs/api/
- Prisma Documentation: https://www.prisma.io/docs/
- Next.js API Routes: https://nextjs.org/docs/api-routes/introduction

---

**Last Updated**: January 2025
**Version**: 1.0.0
**Status**: Initial Implementation - Requires Admin Portal & Email System
