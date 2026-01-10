# Zendesk Setup Documentation for Purrify

## Overview

This document covers the Zendesk integration for Purrify (purrify.ca). The integration includes:
- Zendesk API client for ticket creation
- Contact form integration (replacing EmailJS)
- B2B inquiry ticket routing
- Web Widget for live chat/support

## Configuration

### Environment Variables

Add to `.env.local`:

```bash
# Zendesk Configuration
ZENDESK_SUBDOMAIN=purrifyca
ZENDESK_EMAIL=hello@purrify.ca
ZENDESK_API_TOKEN=<your-api-token>

# Web Widget (get from Zendesk Admin Center > Channels > Classic > Web Widget)
NEXT_PUBLIC_ZENDESK_WIDGET_KEY=<your-widget-key>
```

### Getting the Web Widget Key

1. Go to https://purrifyca.zendesk.com/admin
2. Navigate to: **Channels** > **Classic** > **Web Widget**
3. Copy the widget key from the embed code
4. Add to `.env.local` as `NEXT_PUBLIC_ZENDESK_WIDGET_KEY`

## Code Integration

### Files Created/Modified

| File | Purpose |
|------|---------|
| `src/lib/zendesk.ts` | Core Zendesk API client |
| `pages/api/zendesk/create-ticket.ts` | Ticket creation endpoint |
| `pages/api/contact.ts` | Updated to use Zendesk (with Resend fallback) |
| `pages/api/contact-b2b.ts` | B2B inquiries now create Zendesk tickets |
| `pages/_document.tsx` | Web Widget script added |

### API Endpoints

#### POST `/api/zendesk/create-ticket`

Creates a Zendesk ticket. Supports three types:

**Contact Ticket:**
```json
{
  "type": "contact",
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Your message here",
  "locale": "en",
  "orderNumber": "ORD-123",
  "product": "Standard 50g"
}
```

**B2B Ticket:**
```json
{
  "type": "b2b",
  "businessName": "Pet Store Inc",
  "contactName": "Jane Smith",
  "email": "jane@petstore.com",
  "phone": "555-1234",
  "businessType": "retailer",
  "location": "Toronto, ON",
  "catCount": 50,
  "message": "Interested in wholesale pricing",
  "locale": "en"
}
```

**Refund Ticket:**
```json
{
  "type": "refund",
  "name": "John Doe",
  "email": "john@example.com",
  "orderNumber": "ORD-123",
  "reason": "Product did not meet expectations",
  "product": "Family 120g"
}
```

---

## Macros to Create (Manual Setup Required)

Create these macros in Zendesk Admin Center:
**Admin** > **Workspaces** > **Agent tools** > **Macros**

### 1. Order Status Self-Service

**Title:** Order Status Self-Service
**Actions:**
- Add comment (public):

```
Hi {{ticket.requester.first_name}},

Thanks for reaching out about your order!

You can track your order status anytime:

1. Visit our Order Tracking page: https://purrify.ca/support/orders
2. Enter your order number and email address
3. View real-time shipping updates

If you don't have your order number, check your email for the order confirmation we sent when you placed your order.

Need more help? Just reply to this email and we'll look into it for you.

Best,
The Purrify Team
```

---

### 2. Shipping Times

**Title:** Shipping Times
**Actions:**
- Add comment (public):

```
Hi {{ticket.requester.first_name}},

Here are our standard shipping times:

**Canada:**
| Province | Standard | Express |
|----------|----------|---------|
| Ontario | 2-4 days | 1-2 days |
| Quebec | 3-5 days | 1-2 days |
| BC, Alberta | 4-6 days | 2-3 days |
| Other provinces | 5-7 days | 2-4 days |

**Free Shipping:** Orders over $25 qualify for free standard shipping!

**Tracking:** You'll receive a tracking number via email once your order ships.

Let us know if you have any other questions!

Best,
The Purrify Team
```

---

### 3. How to Use Purrify

**Title:** How to Use Purrify
**Actions:**
- Add comment (public):

```
Hi {{ticket.requester.first_name}},

Using Purrify is simple! Here's how:

**Step 1: Prepare Your Litter Box**
Start with a clean litter box filled with your regular cat litter.

**Step 2: Apply Purrify**
Sprinkle a thin layer of Purrify on top of the litter. For a standard litter box, use about 1-2 tablespoons.

**Step 3: Mix It In**
Gently mix Purrify into the top layer of litter with a scoop.

**Step 4: Repeat as Needed**
Reapply after each litter change, or add a little extra if you notice odors returning.

**Pro Tips:**
- Works with any type of cat litter (clumping, non-clumping, crystal, etc.)
- Safe for automatic litter boxes
- One 50g container lasts about 4-6 weeks for one cat

For detailed guides and videos, visit: https://purrify.ca/learn/how-to-use-purrify

Questions? We're here to help!

Best,
The Purrify Team
```

---

### 4. Refund Request Received

**Title:** Refund Request Received
**Actions:**
- Add comment (public):
- Set priority: High
- Add tags: refund-processing

```
Hi {{ticket.requester.first_name}},

We've received your refund request and we're sorry to hear Purrify didn't meet your expectations.

**What happens next:**
1. Our team will review your request within 1-2 business days
2. If approved, refunds are processed to your original payment method
3. You'll receive a confirmation email once the refund is initiated
4. Refunds typically appear in 5-10 business days depending on your bank

We have a 30-day satisfaction guarantee, so if you're within that window, we've got you covered.

If you have any questions in the meantime, just reply to this email.

Best,
The Purrify Team
```

---

### 5. Subscription Management

**Title:** Subscription Management
**Actions:**
- Add comment (public):

```
Hi {{ticket.requester.first_name}},

You can manage your Purrify subscription anytime through your account:

**To modify your subscription:**
1. Log in at https://purrify.ca/account
2. Click on "Subscriptions" or "Autoship"
3. From there you can:
   - Change delivery frequency
   - Update shipping address
   - Pause your subscription
   - Cancel your subscription

**Save 15%:** Remember, Autoship subscribers always save 15% on every order!

If you're having trouble accessing your account or need help with changes, just reply and we'll take care of it for you.

Best,
The Purrify Team
```

---

### 6. B2B Welcome

**Title:** B2B Welcome
**Actions:**
- Add comment (public):
- Set priority: High
- Add tags: b2b-response

```
Hi {{ticket.requester.first_name}},

Thank you for your interest in partnering with Purrify! We're excited to explore how we can work together.

**Our wholesale program includes:**
- Competitive wholesale pricing (tiered based on volume)
- Marketing support and POS materials
- Dedicated account management
- Flexible ordering and payment terms
- Product training for your team

**Next steps:**
1. We'll review your inquiry and assess fit
2. A member of our B2B team will reach out within 1-2 business days
3. We'll discuss your specific needs and provide a custom quote

In the meantime, you can learn more about our products at https://purrify.ca/learn

Looking forward to connecting!

Best,
The Purrify B2B Team
wholesale@purrify.ca
```

---

### 7. Troubleshooting: Still Smelly

**Title:** Troubleshooting - Still Smelly
**Actions:**
- Add comment (public):

```
Hi {{ticket.requester.first_name}},

Sorry to hear you're still experiencing odor issues! Let's troubleshoot:

**Common fixes:**

1. **Use enough Purrify:** For best results, use 1-2 tablespoons per litter box. Multi-cat households may need more.

2. **Mix it in:** Gently mix Purrify into the top layer of litter for better contact with waste.

3. **Clean litter box regularly:** Scoop daily and change litter completely every 1-2 weeks.

4. **Check litter depth:** Maintain 2-3 inches of litter for proper odor control.

5. **Consider litter type:** Purrify works with all litter types, but some low-quality litters may need more help.

6. **Multi-cat tip:** For multiple cats, use more Purrify and consider additional litter boxes.

**Still not working?**
Please reply with:
- How many cats do you have?
- What type of litter are you using?
- How much Purrify are you applying?

We'll help you find the right solution!

Best,
The Purrify Team
```

---

### 8. After Hours

**Title:** After Hours Auto-Response
**Actions:**
- Add comment (public):

```
Hi {{ticket.requester.first_name}},

Thanks for reaching out to Purrify! We've received your message.

Our support hours are Monday-Friday, 9am-5pm Eastern Time. We'll get back to you on the next business day.

**In the meantime:**
- Track your order: https://purrify.ca/support/orders
- Browse our FAQ: https://purrify.ca/learn/faq
- Learn how to use Purrify: https://purrify.ca/learn/how-to-use-purrify

We appreciate your patience!

Best,
The Purrify Team
```

---

### 9. Closing - Resolved

**Title:** Closing - Resolved
**Actions:**
- Add comment (public):
- Set status: Solved

```
Hi {{ticket.requester.first_name}},

Glad we could help! I'm marking this ticket as resolved.

If you have any more questions in the future, don't hesitate to reach out. We're always here to help.

**Quick links:**
- Shop: https://purrify.ca/shop
- FAQ: https://purrify.ca/learn/faq
- Contact: support@purrify.ca

Thanks for choosing Purrify! 🐱

Best,
The Purrify Team
```

---

### 10. French Greeting (Salutation en français)

**Title:** French Greeting
**Actions:**
- Add comment (public):

```
Bonjour {{ticket.requester.first_name}},

Merci de nous avoir contactés! Nous avons bien reçu votre message.

Nous vous répondrons dans les plus brefs délais, généralement sous 24 heures ouvrables.

**En attendant:**
- Suivre votre commande: https://purrify.ca/fr/support/orders
- Consulter notre FAQ: https://purrify.ca/fr/learn/faq

Cordialement,
L'équipe Purrify
```

---

## Triggers to Create (Optional Automation)

### Auto-Tag French Tickets

**Conditions:**
- Ticket is created
- Ticket language is French OR Description contains "bonjour" OR "merci" OR "commande"

**Actions:**
- Add tags: french
- Set ticket language: French

### B2B Inquiry Routing

**Conditions:**
- Ticket is created
- Tags contain "b2b" OR "wholesale-inquiry"

**Actions:**
- Set priority: High
- Add tags: b2b-priority

### After Hours Auto-Reply

**Conditions:**
- Ticket is created
- Current time is outside business hours (Mon-Fri 9am-5pm ET)

**Actions:**
- Send email using "After Hours" macro content

---

## Testing Checklist

- [ ] Submit contact form on purrify.ca → verify ticket appears in Zendesk
- [ ] Submit B2B inquiry → verify high-priority ticket with B2B tags
- [ ] Test Web Widget (after adding widget key) → verify chat/form works
- [ ] Send email to support@purrify.ca → verify ticket creation
- [ ] Test macros by applying to tickets
- [ ] Verify multi-language ticket creation (en, fr, zh tags)

---

## Verified Working

The following was tested and confirmed working:
- ✅ Zendesk API connection successful
- ✅ Test tickets created (IDs 2 and 3 in Zendesk)
- ✅ Contact form creates Zendesk tickets
- ✅ B2B form creates high-priority tickets
- ✅ TypeScript compilation passes
- ✅ ESLint passes

---

## Next Steps

1. **Add Web Widget Key** - Get from Zendesk Admin and add to `.env.local`
2. **Create Macros** - Use the templates above in Zendesk Admin
3. **Configure Triggers** - Set up automation rules
4. **Migrate FAQ to Help Center** - Import top articles
5. **Install Stripe App** - For order context in tickets
6. **Go Live** - Deploy to production
