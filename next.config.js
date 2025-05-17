/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Enhanced image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
      },
      {
        protocol: 'https',
        hostname: 'purrify.ca',
      }
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // Improve performance
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
    // Enable React optimizations in production
    reactRemoveProperties: process.env.NODE_ENV === 'production',
  },
  
  // Enable strict mode for better type safety
  typescript: {
    ignoreBuildErrors: false,
  },
  
  // Set the output directory that Vercel expects
  distDir: '.next',
  
  // Optimize for SEO
  poweredByHeader: false,
  
  // Compression for better performance
  compress: true,
  
  // i18n configuration for multiple languages
  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'en',
    localeDetection: false,
  },
  
  // Trailing slash for consistent URLs
  trailingSlash: true,
  
  // Optimize for Core Web Vitals
  experimental: {
    // Scroll restoration for better UX
    scrollRestoration: true,
  },
  
  // Optimize asset loading - don't use assetPrefix as it can cause issues
  assetPrefix: '',
  
  // Configure headers for security and caching
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;