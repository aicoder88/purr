const path = require("node:path");

const withBundleAnalyzer =
  process.env.ANALYZE === "true"
    ? require("@next/bundle-analyzer")({ enabled: true })
    : (config) => config;

/**
 * Image Optimization
 *
 * Image optimization is handled separately via npm scripts:
 * - npm run optimize-images:enhanced - Run enhanced optimization
 * - npm run optimize-images:watch - Watch for changes in development
 *
 * This keeps the build process fast and allows optimization to run
 * independently. Images are optimized once and cached.
 */

const REMOTE_IMAGE_HOSTS = [
  "api.dicebear.com",
  "purrify.ca",
  "images.unsplash.com",
  "randomuser.me",
  "cdn.purrify.ca",
  "www.chico.ca",
  "pattesgriffes.com",
  "pitou-minou.ca",
  "www.doghausmtl.com",
  "scontent.fymq2-1.fna.fbcdn.net",
  "coquetteetfinegueule.com",
  "www.animaleriegigi.com",
];

const SECURITY_HEADERS = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-XSS-Protection", value: "1; mode=block" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  { key: "Cross-Origin-Embedder-Policy", value: "unsafe-none" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
];

const CACHE_HEADER_CONFIGS = [
  ["/images/(.*)", "public, max-age=31536000, immutable"],
  ["/optimized/(.*)", "public, max-age=31536000, immutable"],
  ["/_next/static/(.*)", "public, max-age=31536000, immutable"],
  ["/_next/image(.*)", "public, max-age=31536000, immutable"],
  ["/sitemap.xml", "public, max-age=3600"],
  ["/robots.txt", "public, max-age=86400"],
  [
    "/api/(.*)",
    "public, max-age=300, s-maxage=600",
    [{ key: "Vary", value: "Accept-Encoding, Accept-Language" }],
  ],
  ["/api/products", "public, max-age=3600, s-maxage=7200"],
  ["/api/testimonials", "public, max-age=1800, s-maxage=3600"],
  [
    "/fonts/(.*)",
    "public, max-age=31536000, immutable",
    [{ key: "Cross-Origin-Resource-Policy", value: "cross-origin" }],
  ],
  [
    "/:path*\\.(css|js|woff|woff2|ttf|eot)",
    "public, max-age=31536000, immutable",
  ],
  [
    "/:path*\\.(jpg|jpeg|png|gif|ico|svg|webp|avif)",
    "public, max-age=2592000",
    [{ key: "Vary", value: "Accept" }],
  ],
  ["/static/(.*)", "public, max-age=31536000, immutable"],
  [
    "/videos/(.*)",
    "public, max-age=31536000, immutable",
    [{ key: "Accept-Ranges", value: "bytes" }],
  ],
];

const HEADERS = [
  { source: "/(.*)", headers: SECURITY_HEADERS },
  ...CACHE_HEADER_CONFIGS.map(([source, cacheControl, extraHeaders = []]) => ({
    source,
    headers: [{ key: "Cache-Control", value: cacheControl }, ...extraHeaders],
  })),
];

const REDIRECTS = [
  {
    source: "/:path*",
    has: [{ type: "host", value: "purrify.ca" }],
    destination: "https://www.purrify.ca/:path*",
    permanent: true,
    locale: false,
  },
  {
    source: "/:path*",
    has: [{ type: "header", key: "x-forwarded-proto", value: "http" }],
    destination: "https://www.purrify.ca/:path*",
    permanent: true,
    locale: false,
  },
  {
    source: "/blog/purrify-vs-arm-hammer",
    destination: "/blog/activated-carbon-vs-baking-soda-comparison",
    permanent: true,
  },
  {
    source: "/learn/purrify-vs-arm-hammer",
    destination: "/learn/activated-carbon-vs-baking-soda-deodorizers",
    permanent: true,
  },
  {
    source: "/blog/safe-for-kittens",
    destination: "/blog/using-deodorizers-with-kittens",
    permanent: true,
  },
  {
    source: "/learn/safe-for-kittens",
    destination: "/learn/using-deodorizers-with-kittens",
    permanent: true,
  },
  {
    source: "//(.*)",
    destination: "/$1",
    permanent: true,
  },
  {
    source: "/products/purrify-20g",
    destination: "/products/trial-size",
    permanent: true,
  },
  {
    source: "/products/purrify-50g",
    destination: "/products/standard",
    permanent: true,
  },
  {
    source: "/products/purrify-120g",
    destination: "/products/family-pack",
    permanent: true,
  },
  {
    source: "/products/medium-size",
    destination: "/products/standard",
    permanent: true,
    locale: false,
  },
  {
    source: "/products/large-size",
    destination: "/products/family-pack",
    permanent: true,
    locale: false,
  },
  {
    source: "/products/family",
    destination: "/products/family-pack",
    permanent: true,
    locale: false,
  },
  {
    source: "/demo/:path*",
    destination: "/",
    permanent: false,
  },
  {
    source: "/support/contact",
    destination: "/contact",
    permanent: true,
  },
  {
    source: "/customers",
    destination: "/case-studies",
    permanent: true,
  },

  // Solutions pages moved to /learn/solutions
  {
    source: "/solutions/ammonia-smell-cat-litter",
    destination: "/learn/solutions/ammonia-smell-cat-litter",
    permanent: true,
  },
  {
    source: "/solutions/apartment-cat-smell-solution",
    destination: "/learn/solutions/apartment-cat-smell-solution",
    permanent: true,
  },
  {
    source: "/solutions/litter-box-smell-elimination",
    destination: "/learn/solutions/litter-box-smell-elimination",
    permanent: true,
  },
  {
    source: "/solutions/multiple-cats-odor-control",
    destination: "/learn/solutions/multiple-cats-odor-control",
    permanent: true,
  },
  {
    source: "/solutions/natural-cat-litter-additive",
    destination: "/learn/solutions/natural-cat-litter-additive",
    permanent: true,
  },
  {
    source: "/solutions/senior-cat-litter-solutions",
    destination: "/learn/solutions/senior-cat-litter-solutions",
    permanent: true,
  },
  {
    source: "/solutions",
    destination: "/learn",
    permanent: true,
  },

  // E-commerce & Legacy artifacts
  {
    source: "/checkout",
    destination: "/products",
    permanent: true,
  },
  {
    source: "/cart-2",
    destination: "/products",
    permanent: true,
  },
  {
    source: "/products/compare",
    destination: "/products",
    permanent: true,
  },
  {
    source: "/comments/feed",
    destination: "/blog",
    permanent: true,
  },

  // WordPress legacy query parameters
  {
    source: "/",
    has: [{ type: "query", key: "p", value: "138" }],
    destination: "/blog",
    permanent: true,
  },
  {
    source: "/",
    has: [{ type: "query", key: "p", value: "137" }],
    destination: "/blog",
    permanent: true,
  },

  // Province code redirects to standard URLs
  {
    source: "/locations/ab",
    destination: "/locations/province/alberta",
    permanent: true,
  },
  {
    source: "/locations/bc",
    destination: "/locations/province/british-columbia",
    permanent: true,
  },
  {
    source: "/locations/mb",
    destination: "/locations/province/manitoba",
    permanent: true,
  },
  {
    source: "/locations/nb",
    destination: "/locations/province/new-brunswick",
    permanent: true,
  },
  {
    source: "/locations/nl",
    destination: "/locations/province/newfoundland-and-labrador",
    permanent: true,
  },
  {
    source: "/locations/ns",
    destination: "/locations/province/nova-scotia",
    permanent: true,
  },
  {
    source: "/locations/on",
    destination: "/locations/province/ontario",
    permanent: true,
  },
  {
    source: "/locations/pe",
    destination: "/locations/province/prince-edward-island",
    permanent: true,
  },
  {
    source: "/locations/qc",
    destination: "/locations/province/quebec",
    permanent: true,
  },
  {
    source: "/locations/sk",
    destination: "/locations/province/saskatchewan",
    permanent: true,
  },
  {
    source: "/locations/nt",
    destination: "/locations/province/northwest-territories",
    permanent: true,
  },
  {
    source: "/locations/nu",
    destination: "/locations/province/nunavut",
    permanent: true,
  },
  {
    source: "/locations/yt",
    destination: "/locations/province/yukon",
    permanent: true,
  },
];

const OPTIMIZE_PACKAGE_IMPORTS = [
  "lucide-react",
  "framer-motion",
  "recharts",
  // Radix UI packages
  "@radix-ui/react-accordion",
  "@radix-ui/react-alert-dialog",
  "@radix-ui/react-aspect-ratio",
  "@radix-ui/react-checkbox",
  "@radix-ui/react-collapsible",
  "@radix-ui/react-dialog",
  "@radix-ui/react-dropdown-menu",
  "@radix-ui/react-icons",
  "@radix-ui/react-label",
  "@radix-ui/react-navigation-menu",
  "@radix-ui/react-popover",
  "@radix-ui/react-progress",
  "@radix-ui/react-radio-group",
  "@radix-ui/react-scroll-area",
  "@radix-ui/react-select",
  "@radix-ui/react-separator",
  "@radix-ui/react-slider",
  "@radix-ui/react-switch",
  "@radix-ui/react-tabs",
  "@radix-ui/react-toast",
  "@radix-ui/react-toggle",
  "@radix-ui/react-tooltip",
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  outputFileTracingRoot: __dirname,
  outputFileTracingExcludes: {
    "/api/health/storage": ["./public/**/*"],
  },
  outputFileTracingIncludes: {
    "/admin/*": ["./content/blog/**/*"],
    "/api/admin/*": ["./content/blog/**/*"],
    "/api/blog-posts": ["./content/blog/**/*"],
    "/blog/*": ["./content/blog/**/*"],
  },

  images: {
    remotePatterns: REMOTE_IMAGE_HOSTS.map((hostname) => ({
      protocol: "https",
      hostname,
    })),
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 180, 256, 384],
    qualities: [75, 90],
    minimumCacheTTL: 31536000,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  experimental: {
    // optimizeCss: true, // Disabled: incompatible with Next.js 16 Turbopack (requires lightningcss native binary)
    scrollRestoration: true,
    esmExternals: true,
    optimizePackageImports: OPTIMIZE_PACKAGE_IMPORTS,
    // Next.js 15 performance enhancements
    webpackBuildWorker: true,
    optimizeServerReact: true,
    parallelServerCompiles: true,
    parallelServerBuildTraces: true,
  },
  serverExternalPackages: ["sharp", "@anthropic-ai/sdk", "openai", "cheerio"],
  staticPageGenerationTimeout: 120,
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
    reactRemoveProperties: process.env.NODE_ENV === "production",
    styledComponents: false,
    emotion: false,
  },
  typescript: {
    tsconfigPath: "./tsconfig.json",
  },
  distDir: ".next",
  i18n: {
    locales: ["en", "fr", "zh"],
    defaultLocale: "en",
    localeDetection: false,
    domains: [
      {
        domain: "www.purrify.ca",
        defaultLocale: "en",
      },
      {
        domain: "fr.purrify.ca",
        defaultLocale: "fr",
      },
      {
        domain: "zh.purrify.ca",
        defaultLocale: "zh",
      },
    ],
  },
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  trailingSlash: false,
  async redirects() {
    return REDIRECTS;
  },
  async headers() {
    return HEADERS;
  },
  webpack(config, { isServer }) {
    const { IgnorePlugin } = require("webpack");

    // Resolve configuration
    config.resolve = config.resolve ?? {};
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(process.cwd(), "src"),
      "zod/lib/locales": false,
    };

    // Plugin configuration
    config.plugins = config.plugins ?? [];
    config.plugins.push(
      new IgnorePlugin({
        resourceRegExp: /^zod\/lib\/locales\/(?!en)/,
      }),
    );

    // Module rules
    config.module = config.module ?? {};
    config.module.rules = config.module.rules ?? [];
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    // Production optimizations
    if (process.env.NODE_ENV === "production") {
      config.optimization = config.optimization ?? {};
      config.optimization.moduleIds = "deterministic";
      config.optimization.usedExports = true;
      config.optimization.sideEffects = true;
      config.optimization.concatenateModules = true;

      // Split chunks optimization
      if (!isServer) {
        config.optimization.splitChunks = {
          ...config.optimization.splitChunks,
          chunks: "all",
          cacheGroups: {
            default: false,
            vendors: false,
            // Core framework bundle
            framework: {
              name: "framework",
              chunks: "all",
              test: /[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types)[\\/]/,
              priority: 40,
              enforce: true,
            },
            // Large libraries
            lib: {
              test: /[\\/]node_modules[\\/]/,
              name(module) {
                const packageName = module.context.match(
                  /[\\/]node_modules[\\/](.*?)([\\/]|$)/,
                )?.[1];
                return `lib.${packageName?.replace("@", "")}`;
              },
              priority: 30,
              minChunks: 1,
              reuseExistingChunk: true,
            },
            // Common components
            commons: {
              name: "commons",
              minChunks: 2,
              priority: 20,
            },
          },
        };
      }
    }

    return config;
  },
};

module.exports = withBundleAnalyzer(nextConfig);

// Injected content via Sentry wizard below

const { withSentryConfig } = require("@sentry/nextjs");

module.exports = withSentryConfig(module.exports, {
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options

  org: "purrify",
  project: "javascript-nextjs",

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  tunnelRoute: "/monitoring",

  webpack: {
    // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,

    // Tree-shaking options for reducing bundle size
    treeshake: {
      // Automatically tree-shake Sentry logger statements to reduce bundle size
      removeDebugLogging: true,
    },
  },
});
