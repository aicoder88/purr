const path = require("node:path");

const withBundleAnalyzer =
  process.env.ANALYZE === "true"
    ? require("@next/bundle-analyzer")({ enabled: true })
    : (config) => config;

const withNextIntl = require("next-intl/plugin")();

const { REDIRECTS } = require("./config/redirects");
const { HEADERS } = require("./config/headers");
const { images, OPTIMIZE_PACKAGE_IMPORTS } = require("./config/images");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  output: "standalone",
  // outputFileTracingRoot removed to avoid Vercel deployment issues
  // complex excludes removed to rely on Next.js defaults
  outputFileTracingIncludes: {
    "/admin/*": ["./content/blog/**/*"],
    "/api/admin/*": ["./content/blog/**/*"],
    "/api/blog-posts": ["./content/blog/**/*"],
    "/blog": ["./content/blog/**/*"],
    "/blog/*": ["./content/blog/**/*"],
    "/blog/tag/*": ["./content/blog/**/*"],
  },

  images,
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
  },
  serverExternalPackages: ["sharp", "@anthropic-ai/sdk", "openai", "cheerio", "bcryptjs", "@prisma/client"],
  staticPageGenerationTimeout: 120,
  turbopack: {
    root: process.cwd(),
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

  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  trailingSlash: true,
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

module.exports = withNextIntl(withBundleAnalyzer(nextConfig));

// Injected content via Sentry wizard below
// Skip Sentry instrumentation in test environment to prevent network timeouts

if (process.env.DISABLE_SENTRY !== "true") {
  const { withSentryConfig } = require("@sentry/nextjs");

  const hasSentryAuthToken = !!process.env.SENTRY_AUTH_TOKEN;

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

    // Disable source maps and release creation if no auth token is available
    // This prevents warnings during build in environments without the token
    sourcemaps: {
      disable: !hasSentryAuthToken,
    },
    release: {
      create: hasSentryAuthToken,
    },

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
}
