# Purrify - Next.js Website

This is the official website for Purrify, a cat litter additive that eliminates odors at the source. The website is built with Next.js and optimized for SEO.

## Features

- **SEO Optimized**: Meta tags, structured data, sitemap, and robots.txt
- **Responsive Design**: Works on all devices
- **Performance Optimized**: Fast loading with Next.js Image optimization
- **Contact Form**: API route for form submissions
- **Vercel Deployment**: Ready to deploy on Vercel

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/purrify.git
   cd purrify
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Create a `.env.local` file in the root directory with the following variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   NEXT_PUBLIC_SITE_URL=https://purrify.ca
   ```

### Development

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Build

Build the application for production:

```bash
npm run build
# or
yarn build
```

### Deployment

The application is configured for deployment on Vercel. Simply push to your repository and Vercel will automatically deploy your changes.

## Project Structure

- `/pages`: Next.js pages and API routes
- `/components`: Reusable React components
- `/public`: Static assets
- `/styles`: CSS and styling files
- `/lib`: Utility functions and constants

## SEO Features

- Meta tags for each page
- Open Graph and Twitter card support
- JSON-LD structured data
- Sitemap generation
- Robots.txt configuration
