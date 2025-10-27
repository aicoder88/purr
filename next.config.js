const path = require('path');

const withBundleAnalyzer =
  process.env.ANALYZE === 'true'
    ? require('@next/bundle-analyzer')({ enabled: true })
    : (config) => config;

const REMOTE_IMAGE_HOSTS = [
  'api.dicebear.com',
  'purrify.ca',
  'images.unsplash.com',
  'randomuser.me',
  'cdn.purrify.ca',
  'www.chico.ca',
  'pattesgriffes.com',
  'pitou-minou.ca',
  'www.doghausmtl.com',
  'scontent.fymq2-1.fna.fbcdn.net',
  'coquetteetfinegueule.com',
  'www.animaleriegigi.com',
];

const SECURITY_HEADERS = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
  { key: 'Cross-Origin-Embedder-Policy', value: 'unsafe-none' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
  { key: 'Cross-Origin-Resource-Policy', value: 'same-origin' },
];

const CACHE_HEADER_CONFIGS = [
  ['/images/(.*)', 'public, max-age=31536000, immutable'],
  ['/optimized/(.*)', 'public, max-age=31536000, immutable'],
  ['/_next/static/(.*)', 'public, max-age=31536000, immutable'],
  ['/_next/image(.*)', 'public, max-age=31536000, immutable'],
  ['/manifest.json', 'public, max-age=86400'],
  ['/sw.js', 'public, max-age=0, must-revalidate'],
  ['/sitemap.xml', 'public, max-age=3600'],
  ['/robots.txt', 'public, max-age=86400'],
  ['/api/(.*)', 'public, max-age=300, s-maxage=600', [{ key: 'Vary', value: 'Accept-Encoding, Accept-Language' }]],
  ['/api/products', 'public, max-age=3600, s-maxage=7200'],
  ['/api/testimonials', 'public, max-age=1800, s-maxage=3600'],
  ['/fonts/(.*)', 'public, max-age=31536000, immutable', [{ key: 'Cross-Origin-Resource-Policy', value: 'cross-origin' }]],
  ['/:path*\\.(css|js|woff|woff2|ttf|eot)', 'public, max-age=31536000, immutable'],
  ['/:path*\\.(jpg|jpeg|png|gif|ico|svg|webp|avif)', 'public, max-age=2592000', [{ key: 'Vary', value: 'Accept' }]],
  ['/static/(.*)', 'public, max-age=31536000, immutable'],
  ['/videos/(.*)', 'public, max-age=31536000, immutable', [{ key: 'Accept-Ranges', value: 'bytes' }]],
];

const HEADERS = [
  { source: '/(.*)', headers: SECURITY_HEADERS },
  ...CACHE_HEADER_CONFIGS.map(([source, cacheControl, extraHeaders = []]) => ({
    source,
    headers: [{ key: 'Cache-Control', value: cacheControl }, ...extraHeaders],
  })),
];

const REDIRECTS = [
  {
    source: '/:path*',
    has: [{ type: 'host', value: 'purrify.ca' }],
    destination: 'https://www.purrify.ca/:path*',
    permanent: true,
    locale: false,
  },
  {
    source: '/:path*',
    has: [{ type: 'header', key: 'x-forwarded-proto', value: 'http' }],
    destination: 'https://www.purrify.ca/:path*',
    permanent: true,
    locale: false,
  },
  {
    source: '/blog/purrify-vs-arm-hammer',
    destination: '/blog/activated-carbon-vs-baking-soda-comparison',
    permanent: true,
  },
  {
    source: '/learn/purrify-vs-arm-hammer',
    destination: '/learn/activated-carbon-vs-baking-soda-deodorizers',
    permanent: true,
  },
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
  {
    source: '//(.*)',
    destination: '/$1',
    permanent: true,
  },
  {
    source: '/products/purrify-20g',
    destination: '/products/trial-size',
    permanent: true,
  },
  {
    source: '/products/purrify-50g',
    destination: '/products/standard',
    permanent: true,
  },
  {
    source: '/products/purrify-120g',
    destination: '/products/family-pack',
    permanent: true,
  },
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
  {
    source: '/products/family',
    destination: '/products/family-pack',
    permanent: true,
    locale: false,
  },
  {
    source: '/demo/:path*',
    destination: '/',
    permanent: false,
  },
  {
    source: '/contact',
    destination: '/support/contact',
    permanent: true,
  },
  {
    source: '/customers',
    destination: '/case-studies',
    permanent: true,
  },
  {
    source: '/products',
    destination: '/products/compare',
    permanent: false,
  },
];

const OPTIMIZE_PACKAGE_IMPORTS = [
  'lucide-react',
  '@radix-ui/react-icons',
  'framer-motion',
  '@radix-ui/react-dialog',
  '@radix-ui/react-dropdown-menu',
  'recharts',
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  outputFileTracingRoot: __dirname,
  eslint: { ignoreDuringBuilds: true },
  images: {
    remotePatterns: REMOTE_IMAGE_HOSTS.map((hostname) => ({ protocol: 'https', hostname })),
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 180, 256, 384],
    minimumCacheTTL: 31536000,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
    esmExternals: true,
    optimizePackageImports: OPTIMIZE_PACKAGE_IMPORTS,
  },
  serverExternalPackages: ['sharp'],
  staticPageGenerationTimeout: 120,
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
    reactRemoveProperties: process.env.NODE_ENV === 'production',
  },
  typescript: {
    ignoreBuildErrors: process.env.CI === 'true' || process.env.VERCEL === '1',
    tsconfigPath: './tsconfig.json',
  },
  distDir: '.next',
  i18n: {
    locales: ['en', 'fr', 'zh'],
    defaultLocale: 'en',
    localeDetection: false,
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
  webpack(config) {
    const { IgnorePlugin } = require('webpack');
    config.resolve = config.resolve ?? {};
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(process.cwd(), 'src'),
      'zod/lib/locales': false,
    };

    config.plugins = config.plugins ?? [];
    config.plugins.push(
      new IgnorePlugin({
        resourceRegExp: /^zod\/lib\/locales\/(?!en)/,
      })
    );

    config.module = config.module ?? {};
    config.module.rules = config.module.rules ?? [];
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

module.exports = withBundleAnalyzer(nextConfig);
