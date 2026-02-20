const isDev = process.env.NODE_ENV === 'development';

// CSP: 'unsafe-eval' allowed only in dev mode for debugging/hot reload
// 'unsafe-inline' kept for GTM compatibility
const scriptSrc = isDev
  ? "'self' 'unsafe-eval' 'unsafe-inline' *.google.com *.gstatic.com *.googletagmanager.com static.hotjar.com analytics.ahrefs.com"
  : "'self' 'unsafe-inline' *.google.com *.gstatic.com *.googletagmanager.com static.hotjar.com analytics.ahrefs.com";

const connectSrc = "'self' *.googletagmanager.com *.google-analytics.com *.analytics.google.com *.g.doubleclick.net *.hotjar.com *.hotjar.io analytics.ahrefs.com *.ahrefs.com wss://*.hotjar.com";
const frameSrc = "'self' https://www.google.com https://maps.google.com https://www.googletagmanager.com https://tagassistant.google.com";
const trackingImgSrc = "*.google-analytics.com *.googletagmanager.com *.g.doubleclick.net *.hotjar.com *.hotjar.io analytics.ahrefs.com *.ahrefs.com";

// Next.js dev runtimes can register extra Trusted Types policy names
// (for example `nextjs#bundler` with webpack). Keep this list explicit
// and environment-aware so local hydration does not break.
const trustedTypesPolicies = isDev
  ? "'allow-duplicates' nextjs nextjs-hydration nextjs#bundler gtm googletagmanager"
  : "'allow-duplicates' nextjs nextjs-hydration gtm googletagmanager";

const SECURITY_HEADERS = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-XSS-Protection", value: "1; mode=block" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  { key: "Cross-Origin-Embedder-Policy", value: "unsafe-none" },
  // Tag Assistant preview uses a cross-origin popup handshake.
  { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
  // CSP Note: 'unsafe-inline' for scripts is required for GTM.
  // In a production app, consider implementing nonce-based CSP for stricter security.
  // Trusted Types: Allow all policies in development to prevent TrustedScriptURL/TrustedHTML errors
  {
    key: "Content-Security-Policy",
    value: `default-src 'self'; script-src ${scriptSrc}; style-src 'self' 'unsafe-inline' *.googleapis.com; img-src 'self' blob: data: *.purrify.ca *.google.com *.gstatic.com *.facebook.com *.fna.fbcdn.net *.dicebear.com *.unsplash.com *.randomuser.me unpkg.com *.unpkg.com *.tile.openstreetmap.org ${trackingImgSrc}; font-src 'self' data:; connect-src ${connectSrc}; frame-src ${frameSrc}; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; block-all-mixed-content; upgrade-insecure-requests; trusted-types ${trustedTypesPolicies};`
  },
];

// [source, cacheControl, extraHeaders?]
const CACHE_HEADER_CONFIGS = [
  ["/images/(.*)", "public, max-age=31536000, immutable"],
  ["/optimized/(.*)", "public, max-age=31536000, immutable"],
  ["/_next/static/(.*)", "public, max-age=31536000, immutable"],
  ["/_next/image(.*)", "public, max-age=31536000, immutable"],
  ["/sitemap.xml", "public, max-age=3600"],
  ["/robots.txt", "public, max-age=86400"],
  // Note: External resource caching (e.g., OpenStreetMap tiles) must be configured
  // at the CDN/proxy level (Vercel Edge Config, Cloudflare, etc.)
  [
    "/api/(.*)",
    "private, no-store",
    [{ key: "Vary", value: "Authorization, Cookie, Accept-Encoding, Accept-Language" }],
  ],
  [
    "/fonts/(.*)",
    "public, max-age=31536000, immutable",
    [{ key: "Cross-Origin-Resource-Policy", value: "cross-origin" }],
  ],
  ["/:path*\\.(css|js|woff|woff2|ttf|eot)", "public, max-age=31536000, immutable"],
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

/** @type {import('next').Header[]} */
const HEADERS = [
  { source: "/(.*)", headers: SECURITY_HEADERS },
  ...CACHE_HEADER_CONFIGS.map(([source, cacheControl, extraHeaders = []]) => ({
    source,
    headers: [{ key: "Cache-Control", value: cacheControl }, ...extraHeaders],
  })),
];

module.exports = { HEADERS };
