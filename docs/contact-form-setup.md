# Contact Form Setup Guide

This document explains how to set up and configure the contact form with EmailJS.

## Overview

The contact form uses [EmailJS](https://www.emailjs.com/) to send emails directly from the client-side without requiring a backend email service. The form still uses our API endpoint for validation, but the actual email sending is handled by EmailJS.

## Setup Instructions

### 1. Create an EmailJS Account

1. Go to [EmailJS](https://www.emailjs.com/) and create an account
2. Verify your email address

### 2. Get Your API Keys

1. In the EmailJS dashboard, go to "Account" > "API Keys"
2. Note your **Public Key** and **Private Key**
   - The Public Key is used to initialize EmailJS
   - The Private Key provides additional security for sending emails

### 3. Add an Email Service

1. In the EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the authentication steps
5. Give your service a name (e.g., "Purrify Contact Form")
6. Note the **Service ID** (it will look like `service_xxxxxxx`)

### 4. Create an Email Template

1. In the EmailJS dashboard, go to "Email Templates"
2. Click "Create New Template"
3. Design your email template with the following variables:
   - `{{name}}` - The sender's name
   - `{{email}}` - The sender's email
   - `{{message}}` - The message content
   - `{{subject}}` - The email subject
   - `{{date}}` - The submission date
4. Save the template
5. Note the **Template ID** (it will look like `template_xxxxxxx`)

### 5. Update Environment Variables

Update your environment variables securely:

1. For local development, update the following in your `.env.production` file:

```
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id_here
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id_here
```

2. **IMPORTANT SECURITY NOTE**: Never add private keys to files that might be committed to version control!

3. For production deployment, add your environment variables directly to your hosting platform:
   - Vercel: Add them in the project settings under "Environment Variables"
   - Netlify: Add them in the site settings under "Build & deploy" > "Environment variables"
   - Other platforms: Refer to their documentation for adding environment variables

## Testing

After setting up EmailJS, you should test the contact form to ensure it's working correctly:

1. Fill out the contact form with test data
2. Submit the form
3. Check the console for any errors
4. Verify that you receive the email at your configured email address

## Troubleshooting

If the contact form is not working:

1. Check the browser console for any errors
2. Verify that the EmailJS credentials are correct:
   - `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` should match your EmailJS public key
   - `NEXT_PUBLIC_EMAILJS_SERVICE_ID` should start with "service_" and match your configured service
   - `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` should start with "template_" and match your template
   - For production, ensure your private key is securely added to your hosting platform's environment variables
3. Make sure the template variables match the ones used in the code:
   - `{{name}}`, `{{email}}`, `{{message}}`, `{{subject}}`, and `{{date}}`
4. Check the EmailJS dashboard for any failed email attempts:
   - Go to https://dashboard.emailjs.com/admin/history to view your email history
5. Ensure your email service is properly configured and authenticated:
   - Check if your email provider requires any additional security settings
   - Some providers may block emails sent through third-party services
6. If you see the error "Failed to send email. Please try again or contact us directly at hello@purrify.ca":
   - This usually indicates an issue with the EmailJS configuration
   - Verify that your EmailJS account is active and not in a trial period that has expired
   - Check if you've reached your monthly email sending limit

### Common Error: "rm -f .git/index.lock"

If you see a Git-related error like "rm -f .git/index.lock" when deploying:
1. This is unrelated to the contact form functionality
2. It indicates a Git lock file issue during deployment
3. You can safely ignore this message if your site deploys successfully
4. If deployment fails, run the command `rm -f .git/index.lock` in your project directory to remove the lock file

## Secure Deployment with Vercel

To securely deploy your application with sensitive environment variables:

1. Log in to your [Vercel dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to "Settings" > "Environment Variables"
4. Add the following environment variables:
   - `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`: Your EmailJS public key
   - `NEXT_PUBLIC_EMAILJS_SERVICE_ID`: Your EmailJS service ID
   - `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`: Your EmailJS template ID
5. Click "Save"
6. Redeploy your application to apply the new environment variables

This approach keeps your sensitive information secure and separate from your codebase.

## Security Considerations

- The EmailJS User ID, Service ID, and Template ID are exposed in the client-side code
- EmailJS has rate limiting to prevent abuse
- For additional security, consider implementing server-side email sending in the future

## Additional Resources

- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [EmailJS React Integration](https://www.emailjs.com/docs/examples/reactjs/)