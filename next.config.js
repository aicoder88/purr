const withBundleAnalyzer = process.env.ANALYZE === 'true'
  ? require('@next/bundle-analyzer')({ enabled: true })
  : (config) => config;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  
  // Enhanced image optimization with advanced performance settings
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
      },
      {
        protocol: 'https',
        hostname: 'cdn.purrify.ca',
      },
      {
        protocol: 'https',
        hostname: 'www.chico.ca',
      },
      {
        protocol: 'https',
        hostname: 'pattesgriffes.com',
      },
      {
        protocol: 'https',
        hostname: 'pitou-minou.ca',
      },
      {
        protocol: 'https',
        hostname: 'www.doghausmtl.com',
      },
      {
        protocol: 'https',
        hostname: 'scontent.fymq2-1.fna.fbcdn.net',
      },
      {
        protocol: 'https',
        hostname: 'coquetteetfinegueule.com',
      },
      {
        protocol: 'https',
        hostname: 'www.animaleriegigi.com',
      }
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 86400, // 24 hours cache
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    unoptimized: false,
    loader: 'default'
  },
  
  // Advanced compression and optimization
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  
  // Performance optimizations
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
  
  // Move deprecated options out of experimental
  serverExternalPackages: ['sharp'],
  staticPageGenerationTimeout: 120,
  
  // Move turbo config to turbopack
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
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
  
  // i18n configuration for multiple languages
  i18n: {
    locales: ['en', 'fr', 'zh'],
    defaultLocale: 'en',
    localeDetection: false,
    // Specify domain-specific locales if needed
    domains: [
      {
        domain: 'purrify.ca',
        defaultLocale: 'en',
      },
      {
        domain: 'fr.purrify.ca',
        defaultLocale: 'fr',
      },
      {
        domain: 'zh.purrify.ca',
        defaultLocale: 'zh',
      },
    ],
  },
  
  // Add debug logging for build process
  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2,
  },
  
  // No trailing slash for consistent URLs
  trailingSlash: false,
  
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
          // Add security headers for better Core Web Vitals  
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'unsafe-none',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
          {
            key: 'Cross-Origin-Resource-Policy',
            value: 'same-origin',
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
        source: '/manifest.json',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400', // 24 hours
          },
        ],
      },
      {
        source: '/sw.js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate', // Always check for updates
          },
        ],
      },
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600', // 1 hour
          },
        ],
      },
      {
        source: '/robots.txt',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400', // 24 hours
          },
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=300, s-maxage=600', // 5 min browser, 10 min CDN
          },
          {
            key: 'Vary',
            value: 'Accept-Encoding, Accept-Language',
          },
        ],
      },
      {
        source: '/api/products',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=7200', // 1 hour browser, 2 hours CDN
          },
        ],
      },
      {
        source: '/api/testimonials',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=1800, s-maxage=3600', // 30 min browser, 1 hour CDN
          },
        ],
      },
      {
        source: '/fonts/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Cross-Origin-Resource-Policy',
            value: 'cross-origin',
          },
        ],
      },
      {
        source: '/:path*\\.(css|js|woff|woff2|ttf|eot)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*\\.(jpg|jpeg|png|gif|ico|svg|webp|avif)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000', // 30 days
          },
          {
            key: 'Vary',
            value: 'Accept',
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
      // Add specific headers for video files
      {
        source: '/videos/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Accept-Ranges',
            value: 'bytes',
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
      // Split chunks more aggressively for better performance
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
            enforce: true,
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
              
              // Group Framer Motion together
              if (packageName.startsWith('framer-motion')) {
                return 'framer-motion';
              }
              
              // Group Chart.js together
              if (packageName.startsWith('chart.js') || packageName.startsWith('react-chartjs')) {
                return 'charts';
              }
              
              // Return a chunk name based on the package name
              return `npm.${packageName.replace('@', '')}`;
            },
            priority: 10,
            minChunks: 2,
            reuseExistingChunk: true,
          },
          // Create a critical chunk for above-the-fold content
          critical: {
            name: 'critical',
            test: /[\\/]src[\\/]components[\\/]sections[\\/]hero/,
            priority: 50,
            chunks: 'all',
            enforce: true,
          },
        },
      };
      
      // Enable tree shaking for better bundle size
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;
      
      // Enable module concatenation for better performance
      config.optimization.concatenateModules = true;
      
      // Add performance hints
      config.performance = {
        hints: 'warning',
        maxEntrypointSize: 512000, // 500KB
        maxAssetSize: 512000, // 500KB
      };
    }
    
    // Optimize module resolution
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(process.cwd(), 'src'),
    };
    
    // Add babel plugins for production optimization
    if (!dev) {
      config.module = config.module || {};
      config.module.rules = config.module.rules || [];
      
      // Add rule for optimizing SVGs
      config.module.rules.push({
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              svgo: true,
              svgoConfig: {
                plugins: [
                  {
                    name: 'removeViewBox',
                    active: false,
                  },
                  {
                    name: 'removeDimensions',
                    active: true,
                  },
                ],
              },
            },
          },
        ],
      });
    }

    return config;
  },
};

module.exports = withBundleAnalyzer(nextConfig);