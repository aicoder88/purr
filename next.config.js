/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['api.dicebear.com'],
  },
  // Ensure compatibility with Vercel deployment
  output: 'standalone',
};

module.exports = nextConfig;