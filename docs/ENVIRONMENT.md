# Environment Configuration

This guide explains how to set up environment variables for local development and production deployments.

## Local Development

1. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

2. Update the values in `.env.local` with your local configuration.
   - Never commit `.env.local` to version control.

3. Required environment variables:
   ```env
   # EmailJS (get these from your EmailJS dashboard)
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id_here
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id_here
   ```

## Production (Vercel)

1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Add the following required variables:

   | Variable Name | Description |
   |---------------|-------------|
   | `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | Your EmailJS public key |
   | `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | Your EmailJS service ID |
   | `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | Your EmailJS template ID |
   | `STRIPE_SECRET_KEY` | Your Stripe secret key (if using Stripe) |
   | `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Your Stripe publishable key (if using Stripe) |
   | `STRIPE_WEBHOOK_SECRET` | Your Stripe webhook secret (if using Stripe webhooks) |
   | `NEXTAUTH_SECRET` | A random string for NextAuth.js (if using authentication) |
   | `NEXTAUTH_URL` | Your production URL (e.g., https://purrify.ca) |

## Security Best Practices

- Never commit sensitive information to version control
- Use `.env.local` for local development and add it to `.gitignore`
- In production, use platform-specific secret management (e.g., Vercel Environment Variables)
- Rotate API keys and secrets regularly
- Use the principle of least privilege when generating API keys
- Monitor and audit access to sensitive environment variables

## Environment Validation

The application includes runtime environment validation. If required variables are missing or invalid, you'll see an error message when starting the application.

To validate environment variables manually:

```typescript
import { validateServerEnv } from '@/lib/env-validator';

// This will throw an error if required variables are missing
try {
  validateServerEnv();
  console.log('✅ Environment variables are valid');
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
```
