# WordPress Integration Guide

This guide explains how to connect your WordPress site to your Purrify website to display blog posts.

## Overview

The integration allows you to:
1. Manage blog content through WordPress admin interface
2. Display the 2 most recent blog posts on the Purrify homepage
3. Have a dedicated blog page showing all posts
4. Have individual blog post pages with full content

## Setup Instructions

### 1. WordPress Setup

1. **Create a WordPress site**:
   - You can use WordPress.com or self-host WordPress on your own server
   - For self-hosting, you'll need a hosting provider that supports WordPress (e.g., Bluehost, SiteGround, etc.)
   - For this guide, we'll assume you're using a self-hosted WordPress installation

2. **Install and configure WordPress**:
   - Download WordPress from [wordpress.org](https://wordpress.org/download/)
   - Follow the [WordPress installation guide](https://wordpress.org/support/article/how-to-install-wordpress/)
   - Set up your admin account

3. **Configure WordPress REST API**:
   - The WordPress REST API is enabled by default in WordPress 4.7+
   - Ensure your WordPress site is publicly accessible (not password protected)
   - If using a security plugin, make sure it doesn't block the REST API endpoints

4. **Install necessary plugins**:
   - Install and activate the [JWT Authentication for WP REST API](https://wordpress.org/plugins/jwt-authentication-for-wp-rest-api/) plugin for secure API access
   - Install and activate the [Advanced Custom Fields](https://wordpress.org/plugins/advanced-custom-fields/) plugin if you need custom fields

5. **Create sample blog posts**:
   - Create at least 2-3 blog posts in WordPress
   - Add featured images to each post
   - Publish the posts

### 2. Domain Configuration (Cloudflare/Namecheap)

1. **Set up a subdomain for WordPress** (recommended):
   - Log in to your Namecheap account
   - Go to the Domain List and select your domain
   - Click "Manage" and then "Advanced DNS"
   - Add a new CNAME record:
     - Type: CNAME
     - Host: blog (or your preferred subdomain)
     - Value: Your WordPress hosting provider's domain
     - TTL: Automatic

2. **Cloudflare configuration**:
   - Log in to your Cloudflare account
   - Select your domain
   - Go to the DNS section
   - Ensure the CNAME record for your WordPress subdomain is present
   - Enable Cloudflare proxy (orange cloud) for the subdomain
   - Go to SSL/TLS section and set SSL mode to "Full" or "Full (strict)"

3. **Configure CORS in Cloudflare** (if needed):
   - In Cloudflare, go to Rules > Transform Rules
   - Create a new Transform Rule
   - Set conditions to match your WordPress API endpoints
   - Add headers to allow cross-origin requests:
     ```
     Access-Control-Allow-Origin: https://www.purrify.ca
     Access-Control-Allow-Methods: GET, OPTIONS
     Access-Control-Allow-Headers: Content-Type
     ```

### 3. Purrify Website Configuration

1. **Set environment variables**:
   - Copy the WordPress API URL to your `.env.production` file:
   ```
   WORDPRESS_API_URL=https://blog.yourdomain.com/wp-json/wp/v2
   ```
   - Replace `blog.yourdomain.com` with your actual WordPress domain

2. **Deploy the updated website**:
   - Commit and push your changes
   - Deploy the website to your hosting provider

## Testing the Integration

1. Visit your Purrify homepage to verify that the 2 most recent blog posts appear
2. Click on a blog post to ensure it opens the full article
3. Visit the blog page to ensure all posts are listed
4. Create a new post in WordPress and verify it appears on your site

## Troubleshooting

If blog posts aren't appearing:

1. **Check WordPress API access**:
   - Visit `https://your-wordpress-site.com/wp-json/wp/v2/posts` in your browser
   - You should see JSON data of your posts
   - If not, check your WordPress REST API settings

2. **Check environment variables**:
   - Verify that `WORDPRESS_API_URL` is set correctly
   - Restart your Next.js server after changing environment variables

3. **Check browser console**:
   - Open browser developer tools and look for API errors
   - CORS issues will appear as errors in the console

4. **Check server logs**:
   - Look for API connection errors in your server logs

## Advanced Configuration

### Custom Post Types

If you want to use custom post types:

1. Register the custom post type in WordPress with `'show_in_rest' => true`
2. Update the API endpoints in your Next.js code to use the custom post type

### Authentication

For private WordPress sites:

1. Configure JWT authentication in WordPress
2. Update the API calls in Next.js to include authentication headers

## Maintenance

1. **Keep WordPress updated**:
   - Regularly update WordPress core, themes, and plugins
   - Back up your WordPress site regularly

2. **Monitor performance**:
   - Watch for slow API responses
   - Consider caching strategies if needed