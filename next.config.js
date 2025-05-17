/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['api.dicebear.com', 'purrify.ca'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Ensure compatibility with Vercel deployment
  output: 'standalone',
  // Improve performance
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Enable strict mode for better type safety
  typescript: {
    ignoreBuildErrors: false,
  },
};

module.exports = nextConfig;