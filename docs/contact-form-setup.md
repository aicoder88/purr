# Contact Form Setup Guide

This document explains how to set up and configure the contact form with EmailJS.

## Overview

The contact form uses [EmailJS](https://www.emailjs.com/) to send emails directly from the client-side without requiring a backend email service. The form still uses our API endpoint for validation, but the actual email sending is handled by EmailJS.

## Setup Instructions

### 1. Create an EmailJS Account

1. Go to [EmailJS](https://www.emailjs.com/) and create an account
2. Verify your email address

### 2. Add an Email Service

1. In the EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the authentication steps
5. Give your service a name (e.g., "Purrify Contact Form")
6. Note the **Service ID** (it will look like `service_xxxxxxx`)

### 3. Create an Email Template

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

### 4. Get Your User ID

1. In the EmailJS dashboard, go to "Account"
2. Find your **User ID** (it will look like `user_xxxxxxxxxxxxxxxx`)

### 5. Update Environment Variables

Update the following environment variables in your `.env.production` file:

```
NEXT_PUBLIC_EMAILJS_USER_ID=your_user_id_here
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id_here
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id_here
```

## Testing

After setting up EmailJS, you should test the contact form to ensure it's working correctly:

1. Fill out the contact form with test data
2. Submit the form
3. Check the console for any errors
4. Verify that you receive the email at your configured email address

## Troubleshooting

If the contact form is not working:

1. Check the browser console for any errors
2. Verify that the EmailJS credentials are correct
3. Make sure the template variables match the ones used in the code
4. Check the EmailJS dashboard for any failed email attempts
5. Ensure your email service is properly configured and authenticated

## Security Considerations

- The EmailJS User ID, Service ID, and Template ID are exposed in the client-side code
- EmailJS has rate limiting to prevent abuse
- For additional security, consider implementing server-side email sending in the future

## Additional Resources

- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [EmailJS React Integration](https://www.emailjs.com/docs/examples/reactjs/)