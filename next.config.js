const withBundleAnalyzer = process.env.ANALYZE === 'true'
  ? require('@next/bundle-analyzer')({ enabled: true })
  : (config) => config;

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
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'randomuser.me',
      }
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // Increase cache TTL to 1 year for better caching
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    unoptimized: false // Ensure all images are optimized
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
    // Enable optimizeCss for better CSS optimization
    optimizeCss: true,
    // Enable gzip compression
    gzipSize: true,
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
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
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
        source: '/optimized/(.*)',
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
      {
        source: '/_next/image(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  
  // Webpack configuration for optimizing JavaScript
  webpack: (config, { dev, isServer }) => {
    // Improve cache reliability
    config.cache = {
      type: 'filesystem',
      buildDependencies: {
        config: [__filename],
      },
      cacheDirectory: require('path').resolve(process.cwd(), '.next/cache/webpack'),
      maxAge: 86400000, // 24 hours
    };
    
    // Only apply optimizations in production builds
    if (!dev) {
      // Split chunks more aggressively
      config.optimization.splitChunks = {
        chunks: 'all',
        maxInitialRequests: 25,
        minSize: 20000,
        cacheGroups: {
          default: false,
          vendors: false,
          // Create a framework chunk for shared dependencies
          framework: {
            name: 'framework',
            test: /[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
            priority: 40,
            chunks: 'all',
          },
          // Create a commons chunk for frequently used modules
          commons: {
            name: 'commons',
            minChunks: 3,
            priority: 20,
            reuseExistingChunk: true,
          },
          // Create a lib chunk for third-party libraries
          lib: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              // Get the name of the package
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
              
              // Group Radix UI components together
              if (packageName.startsWith('@radix-ui')) {
                return 'radix';
              }
              
              // Group React Icons together
              if (packageName.startsWith('react-icons')) {
                return 'react-icons';
              }
              
              // Return a chunk name based on the package name
              return `npm.${packageName.replace('@', '')}`;
            },
            priority: 10,
            minChunks: 2,
            reuseExistingChunk: true,
          },
        },
      };
    }
    
    return config;
  },
};

module.exports = withBundleAnalyzer(nextConfig);