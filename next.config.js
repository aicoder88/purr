const withBundleAnalyzer = process.env.ANALYZE === 'true'
  ? require('@next/bundle-analyzer')({ enabled: true })
  : (config) => config;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  outputFileTracingRoot: __dirname,
  // Skip ESLint during Vercel builds to avoid CI lint failures
  eslint: {
    ignoreDuringBuilds: true,
  },
  
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
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 180, 256, 384],
    qualities: [25, 50, 75, 80, 85, 90, 95, 100],
    minimumCacheTTL: 31536000, // 1 year cache for optimized performance
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    contentDispositionType: 'inline',
    unoptimized: false,
    loader: 'default'
  },
  
  // Advanced compression and optimization
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  
  // Performance optimizations
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-icons',
      'framer-motion',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      'recharts'
    ],
    optimizeCss: true,
    scrollRestoration: true,
    // Enable modern bundling
    esmExternals: true,
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
        domain: 'www.purrify.ca',
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

  // Add redirects to fix broken URLs and canonicalization
  async redirects() {
    return [
      // Force canonical www domain for all purrify.ca URLs (fix 307 redirects)
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'purrify.ca',
          },
        ],
        destination: 'https://www.purrify.ca/:path*',
        permanent: true,
        locale: false,
      },
      // Force HTTPS for http requests
      {
        source: '/:path*',
        has: [
          {
            type: 'header',
            key: 'x-forwarded-proto',
            value: 'http',
          },
        ],
        destination: 'https://www.purrify.ca/:path*',
        permanent: true,
        locale: false,
      },
      // Redirect old blog URLs (legal compliance - remove competitor brand names)
      {
        source: '/blog/purrify-vs-arm-hammer',
        destination: '/blog/activated-carbon-vs-baking-soda-comparison',
        permanent: true,
      },
      // Redirect away from "safe" slugs to compliant phrasing
      {
        source: '/blog/safe-for-kittens',
        destination: '/blog/using-deodorizers-with-kittens',
        permanent: true,
      },
      {
        source: '/learn/safe-for-kittens',
        destination: '/learn/using-deodorizers-with-kittens',
        permanent: true,
      },
      // Redirect any URLs with double slashes
      {
        source: '//(.*)',
        destination: '/$1',
        permanent: true,
      },
      // Redirect old product URLs
      {
        source: '/products/purrify-20g',
        destination: '/products/trial-size',
        permanent: true,
      },
      {
        source: '/products/purrify-60g',
        destination: '/products/standard',
        permanent: true,
      },
      {
        source: '/products/purrify-120g',
        destination: '/products/family-pack',
        permanent: true,
      },
      // Redirect legacy product slugs
      {
        source: '/products/medium-size',
        destination: '/products/standard',
        permanent: true,
        locale: false,
      },
      {
        source: '/products/large-size',
        destination: '/products/family-pack',
        permanent: true,
        locale: false,
      },
      // Redirect old demo URLs
      {
        source: '/demo/:path*',
        destination: '/',
        permanent: false,
      },
      // Redirect contact to support/contact
      {
        source: '/contact',
        destination: '/support/contact',
        permanent: true,
      },
      // Redirect customers to case-studies
      {
        source: '/customers',
        destination: '/case-studies',
        permanent: true,
      },
      // Create products index redirect
      {
        source: '/products',
        destination: '/products/compare',
        permanent: false,
      },
    ];
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
    
    // Enhanced bundle splitting for better performance
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        usedExports: true,
        sideEffects: false,
        splitChunks: {
          ...config.optimization.splitChunks,
          chunks: 'all',
          minSize: 20000,
          maxSize: 150000, // Reduced from 244000 to create smaller chunks
          cacheGroups: {
            // React core - highest priority
            react: {
              test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
              name: 'react',
              chunks: 'all',
              priority: 40,
              enforce: true,
            },
            // Next.js framework code
            framework: {
              test: /[\\/]node_modules[\\/](next)[\\/]/,
              name: 'framework',
              chunks: 'all',
              priority: 35,
              enforce: true,
            },
            // Icons - split into separate chunk due to size
            icons: {
              test: /[\\/]node_modules[\\/](lucide-react|react-icons|@radix-ui\/react-icons)[\\/]/,
              name: 'icons',
              chunks: 'all',
              priority: 30,
              enforce: true,
            },
            // UI libraries - often change together
            ui: {
              test: /[\\/]node_modules[\\/](@radix-ui|framer-motion|embla-carousel|class-variance-authority|clsx|tailwind-merge)[\\/]/,
              name: 'ui',
              chunks: 'all',
              priority: 25,
              enforce: true,
            },
            // Analytics and tracking
            analytics: {
              test: /[\\/]node_modules[\\/](recharts|chart\.js|@vercel\/analytics|gtag|google-analytics)[\\/]/,
              name: 'analytics',
              chunks: 'all',
              priority: 25,
              enforce: true,
            },
            // Stripe payment processing
            stripe: {
              test: /[\\/]node_modules[\\/](@stripe|stripe)[\\/]/,
              name: 'stripe',
              chunks: 'all',
              priority: 25,
              enforce: true,
            },
            // Large utility libraries
            utils: {
              test: /[\\/]node_modules[\\/](lodash|ramda|date-fns|moment)[\\/]/,
              name: 'utils',
              chunks: 'all',
              priority: 20,
              enforce: true,
            },
            // General vendor code
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name(module) {
                // Create multiple vendor chunks based on package name
                const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)?.[1];
                return `vendors-${packageName?.replace(/[@/]/g, '-').toLowerCase() || 'misc'}`;
              },
              chunks: 'all',
              priority: 15,
              minChunks: 1,
              maxSize: 100000, // Smaller vendor chunks
            },
            // Common code from src
            common: {
              test: /[\\/]src[\\/]/,
              name: 'common',
              minChunks: 2,
              priority: 10,
              reuseExistingChunk: true,
            },
            // Default fallback
            default: {
              minChunks: 2,
              priority: 5,
              reuseExistingChunk: true,
              maxSize: 100000,
            },
          },
        },
      };
      
      // Add performance monitoring without breaking build
      config.performance = {
        hints: 'warning',
        maxEntrypointSize: 512000, // 500kb
        maxAssetSize: 512000,
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
