const path = require("node:path");

const withBundleAnalyzer =
  process.env.ANALYZE === "true"
    ? require("@next/bundle-analyzer")({ enabled: true })
    : (config) => config;

const withNextIntl = require("next-intl/plugin")();

// Existing configuration...

/**
 * Image Optimization
 *
 * Image optimization is handled separately via pnpm scripts:
 * - pnpm optimize-images:enhanced - Run enhanced optimization
 * - pnpm optimize-images:watch - Watch for changes in development
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
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
  {
    key: "Content-Security-Policy",
    value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' *.google.com *.gstatic.com *.googletagmanager.com; style-src 'self' 'unsafe-inline' *.googleapis.com; img-src 'self' blob: data: *.purrify.ca *.google.com *.gstatic.com *.facebook.com *.fna.fbcdn.net *.dicebear.com *.unsplash.com *.randomuser.me *.chico.ca *.pattesgriffes.com *.pitou-minou.ca *.doghausmtl.com *.coquetteetfinegueule.com *.animaleriegigi.com unpkg.com *.unpkg.com *.tile.openstreetmap.org; font-src 'self' data:; frame-src 'self' https://www.google.com https://maps.google.com; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; block-all-mixed-content; upgrade-insecure-requests;"
  },
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
    "private, no-store",
    [{ key: "Vary", value: "Authorization, Cookie, Accept-Encoding, Accept-Language" }],
  ],
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
  // --- SUBDOMAIN & LOCALE FIXES ---
  // Fix double mentions of locale in path for subdomains
  {
    source: "/fr/:path*",
    has: [{ type: "host", value: "fr.purrify.ca" }],
    destination: "https://www.purrify.ca/fr/:path*",
    permanent: true
  },
  {
    source: "/zh/:path*",
    has: [{ type: "host", value: "zh.purrify.ca" }],
    destination: "https://www.purrify.ca/zh/:path*",
    permanent: true
  },
  {
    source: "/es/:path*",
    has: [{ type: "host", value: "es.purrify.ca" }],
    destination: "https://www.purrify.ca/es/:path*",
    permanent: true
  },
  // Redirect subdomains to main domain with locale
  {
    source: "/:path*",
    has: [{ type: "host", value: "fr.purrify.ca" }],
    destination: "https://www.purrify.ca/fr/:path*",
    permanent: true
  },
  {
    source: "/:path*",
    has: [{ type: "host", value: "zh.purrify.ca" }],
    destination: "https://www.purrify.ca/zh/:path*",
    permanent: true
  },
  {
    source: "/:path*",
    has: [{ type: "host", value: "es.purrify.ca" }],
    destination: "https://www.purrify.ca/es/:path*",
    permanent: true
  },
  // Fix double locale paths (e.g. /fr/fr/...)
  {
    source: "/fr/fr/:path*",
    destination: "/fr/:path*",
    permanent: true
  },
  {
    source: "/zh/zh/:path*",
    destination: "/zh/:path*",
    permanent: true
  },
  {
    source: "/es/es/:path*",
    destination: "/es/:path*",
    permanent: true
  },

  // --- SPECIFIC FIXES ---
  {
    source: "/_ignore_locations/:path*",
    destination: "/stores",
    permanent: true
  },
  {
    source: "/:locale(fr|zh|es)/blog/how-to-use-cat-litter-deodorizer",
    destination: "/:locale/learn/how-to-use-deodorizer",
    permanent: true
  },

  // --- INVALID LOCATION REDIRECTS ---
  {
    source: "/:locale(fr|zh|es)?/locations/lake-louise",
    destination: "/:locale/stores",
    permanent: true
  },
  {
    source: "/:locale(fr|zh|es)?/locations/medicine-hat",
    destination: "/:locale/stores",
    permanent: true
  },
  {
    source: "/:locale(fr|zh|es)?/locations/tuktoyaktuk",
    destination: "/:locale/stores",
    permanent: true
  },
  {
    source: "/:locale(fr|zh|es)?/locations/kimberley",
    destination: "/:locale/stores",
    permanent: true
  },
  {
    source: "/:locale(fr|zh|es)?/locations/saguenay",
    destination: "/:locale/stores",
    permanent: true
  },
  {
    source: "/:locale(fr|zh|es)?/locations/victoria",
    destination: "/:locale/stores",
    permanent: true
  },
  {
    source: "/:locale(fr|zh|es)?/locations/swan-river",
    destination: "/:locale/stores",
    permanent: true
  },
  {
    source: "/:locale(fr|zh|es)?/locations/port-hawkesbury",
    destination: "/:locale/stores",
    permanent: true
  },
  {
    source: "/:locale(fr|zh|es)?/locations/fredericton",
    destination: "/:locale/stores",
    permanent: true
  },
  {
    source: "/:locale(fr|zh|es)?/locations/wabana",
    destination: "/:locale/stores",
    permanent: true
  },
  {
    source: "/:locale(fr|zh|es)?/locations/st-johns",
    destination: "/:locale/stores",
    permanent: true
  },
  {
    source: "/:locale(fr|zh|es)?/locations/penticton",
    destination: "/:locale/stores",
    permanent: true
  },
  {
    source: "/:locale(fr|zh|es)?/locations/labrador-city",
    destination: "/:locale/stores",
    permanent: true
  },
  {
    source: "/:locale(fr|zh|es)?/locations/sainte-anne-de-beaupre",
    destination: "/:locale/stores",
    permanent: true
  },
  {
    source: "/:locale(fr|zh|es)?/locations/grand-fallswindsor",
    destination: "/:locale/stores",
    permanent: true
  },
  {
    source: "/:locale(fr|zh|es)?/locations/campbell-river",
    destination: "/:locale/stores",
    permanent: true
  },
  {
    source: "/:locale(fr|zh|es)?/locations/inuvik",
    destination: "/:locale/stores",
    permanent: true
  },
  {
    source: "/:locale(fr|zh|es)?/locations/glace-bay",
    destination: "/:locale/stores",
    permanent: true
  },
  {
    source: "/:locale(fr|zh|es)?/locations/chilliwack",
    destination: "/:locale/stores",
    permanent: true
  },
  {
    source: "/:locale(fr|zh|es)?/locations/revelstoke",
    destination: "/:locale/stores",
    permanent: true
  },
  {
    source: "/:locale(fr|zh|es)?/locations/fort-smith",
    destination: "/:locale/stores",
    permanent: true
  },
  {
    source: "/:locale(fr|zh|es)?/locations/saint-albert",
    destination: "/:locale/stores",
    permanent: true
  },
  {
    source: "/:locale(fr|zh|es)?/locations/saint-anthony",
    destination: "/:locale/stores",
    permanent: true
  },
  {
    source: "/:locale(fr|zh|es)?/locations/saint-john",
    destination: "/:locale/stores",
    permanent: true
  },
  {
    source: "/:locale(fr|zh|es)?/locations/happy-valleygoose-bay",
    destination: "/:locale/stores",
    permanent: true
  },
  {
    source: "/:locale(fr|zh|es)?/locations/churchill",
    destination: "/:locale/stores",
    permanent: true
  },
  {
    source: "/:locale(fr|zh|es)?/locations/pictou",
    destination: "/:locale/stores",
    permanent: true
  },
  {
    source: "/:locale(fr|zh|es)?/locations/sainte-therese",
    destination: "/:locale/stores",
    permanent: true
  },
  {
    source: "/:locale(fr|zh|es)?/locations/iroquois-falls",
    destination: "/:locale/stores",
    permanent: true
  },
  {
    source: "/:locale(fr|zh|es)?/locations/bathurst",
    destination: "/:locale/stores",
    permanent: true
  },
  {
    source: "/:locale(fr|zh|es)?/locations/fort-saint-john",
    destination: "/:locale/stores",
    permanent: true
  },
  {
    source: "/:locale(fr|zh|es)?/locations/esquimalt",
    destination: "/:locale/stores",
    permanent: true
  },
  {
    source: "/:locale(fr|zh|es)?/locations/hope",
    destination: "/:locale/stores",
    permanent: true
  },
  {
    source: "/:locale(fr|zh|es)?/locations/iqaluit",
    destination: "/:locale/stores",
    permanent: true
  },
  {
    source: "/:locale(fr|zh|es)?/locations/sarnia-clearwater",
    destination: "/:locale/stores",
    permanent: true
  },
  {
    source: "/:locale(fr|zh|es)?/locations/delta",
    destination: "/:locale/stores",
    permanent: true
  },
  {
    source: "/:locale(fr|zh|es)?/locations/dauphin",
    destination: "/:locale/stores",
    permanent: true
  },
  {
    source: "/:locale(fr|zh|es)?/locations/corner-brook",
    destination: "/:locale/stores",
    permanent: true
  },
  {
    source: "/:locale(fr|zh|es)?/locations/powell-river",
    destination: "/:locale/stores",
    permanent: true
  },
  {
    source: "/:locale(fr|zh|es)?/locations/yellowknife",
    destination: "/:locale/stores",
    permanent: true
  },
  {
    source: "/:locale(fr|zh|es)?/locations/thompson",
    destination: "/:locale/stores",
    permanent: true
  },
  {
    source: "/:locale(fr|zh|es)?/locations/caraquet",
    destination: "/:locale/stores",
    permanent: true
  },
  {
    source: "/:locale(fr|zh|es)?/locations/ferryland",
    destination: "/:locale/stores",
    permanent: true
  },
  {
    source: "/:locale(fr|zh|es)?/locations/saint-boniface",
    destination: "/:locale/stores",
    permanent: true
  },
  {
    source: "/:locale(fr|zh|es)?/locations/kirkland-lake",
    destination: "/:locale/stores",
    permanent: true
  },
  {
    source: "/:locale(fr|zh|es)?/locations/vernon",
    destination: "/:locale/stores",
    permanent: true
  },
  {
    source: "/:locale(fr|zh|es)?/locations/mb",
    destination: "/:locale/stores",
    permanent: true
  },
  {
    source: "/:locale(fr|zh|es)?/locations/prince-rupert",
    destination: "/:locale/stores",
    permanent: true
  },
  {
    source: "/:locale(fr|zh|es)?/locations/saint-eustache",
    destination: "/:locale/stores",
    permanent: true
  },
  {
    source: "/:locale(fr|zh|es)?/locations/waskaganish",
    destination: "/:locale/stores",
    permanent: true
  },
  {
    source: "/:locale(fr|zh|es)?/locations/kamloops",
    destination: "/:locale/stores",
    permanent: true
  },
  {
    source: "/:locale(fr|zh|es)?/locations/brandon",
    destination: "/:locale/stores",
    permanent: true
  },
  {
    source: "/:locale(fr|zh|es)?/locations/nanaimo",
    destination: "/:locale/stores",
    permanent: true
  },
  {
    source: "/:locale(fr|zh|es)?/locations/moncton",
    destination: "/:locale/stores",
    permanent: true
  },
  {
    source: "/:locale(fr|zh|es)?/locations/brantford",
    destination: "/:locale/stores",
    permanent: true
  },
  {
    source: "/:locale(fr|zh|es)?/locations/chatham-kent",
    destination: "/:locale/stores",
    permanent: true
  },
  {
    source: "/:locale(fr|zh|es)?/locations/digby",
    destination: "/:locale/stores",
    permanent: true
  },
  {
    source: "/:locale(fr|zh|es)?/locations/west-vancouver",
    destination: "/:locale/stores",
    permanent: true
  },
  {
    source: "/:locale(fr|zh|es)?/locations/white-rock",
    destination: "/:locale/stores",
    permanent: true
  },

  {
    source: "/:path*",
    has: [
      {
        type: "host",
        value: "purrify.ca"
      }
    ],
    destination: "https://www.purrify.ca/:path*",
    permanent: true,
    locale: false
  },
  {
    source: "/:path*",
    has: [
      {
        type: "header",
        key: "x-forwarded-proto",
        value: "http"
      }
    ],
    destination: "https://www.purrify.ca/:path*",
    permanent: true,
    locale: false
  },
  {
    source: "/:path+/es/:path2*",
    destination: "/es/:path2*",
    permanent: true
  },
  {
    source: "/:path+/fr/:path2*",
    destination: "/fr/:path2*",
    permanent: true
  },
  {
    source: "/:path+/zh/:path2*",
    destination: "/zh/:path2*",
    permanent: true
  },
  {
    source: "//(.*)",
    destination: "/$1",
    permanent: true
  },
  {
    source: "/blog/purrify-vs-arm-hammer",
    destination: "/blog/activated-carbon-vs-baking-soda-comparison",
    permanent: true
  },
  {
    source: "/blog/safe-for-kittens",
    destination: "/blog/using-deodorizers-with-kittens",
    permanent: true
  },
  {
    source: "/blog/activated-carbon-science",
    destination: "/blog/activated-carbon-litter-additive-benefits",
    permanent: true
  },
  {
    source: "/blog/beyond-masking-odors",
    destination: "/blog/most-powerful-odor-absorber",
    permanent: true
  },
  {
    source: "/blog/fresh-home-multiple-cats",
    destination: "/blog/multi-cat-litter-deodorizer-guide",
    permanent: true
  },
  {
    source: "/:locale(fr|zh|es)/blog/activated-carbon-science",
    destination: "/:locale/blog/activated-carbon-litter-additive-benefits",
    permanent: true
  },
  {
    source: "/:locale(fr|zh|es)/blog/fresh-home-multiple-cats",
    destination: "/:locale/blog/multi-cat-litter-deodorizer-guide",
    permanent: true
  },
  {
    source: "/:locale(fr|zh|es)/blog/beyond-masking-odors",
    destination: "/:locale/blog/most-powerful-odor-absorber",
    permanent: true
  },
  {
    source: "/learn/purrify-vs-arm-hammer",
    destination: "/learn/activated-carbon-vs-baking-soda-deodorizers",
    permanent: true
  },
  {
    source: "/learn/safe-for-kittens",
    destination: "/learn/using-deodorizers-with-kittens",
    permanent: true
  },
  {
    source: "/learn/activated-carbon-vs-baking-soda",
    destination: "/learn/activated-carbon-vs-baking-soda-deodorizers",
    permanent: true
  },
  {
    source: "/learn/answers/how-to-control-cat-litter-odor",
    destination: "/learn/answers/how-to-eliminate-cat-litter-odor",
    permanent: true
  },
  {
    source: "/learn/answers/how-to-reduce-cat-litter-odor",
    destination: "/learn/answers/how-to-eliminate-cat-litter-odor",
    permanent: true
  },
  {
    source: "/learn/answers/how-to-stop-cat-litter-odor",
    destination: "/learn/answers/how-to-eliminate-cat-litter-odor",
    permanent: true
  },
  {
    source: "/learn/answers/how-to-prevent-cat-litter-smell",
    destination: "/learn/answers/how-to-eliminate-cat-litter-odor",
    permanent: true
  },
  {
    source: "/learn/answers/how-to-remove-cat-litter-smell-from-room",
    destination: "/learn/answers/how-to-keep-litter-box-from-smelling",
    permanent: true
  },
  {
    source: "/learn/answers/how-to-get-cat-litter-smell-out-of-house",
    destination: "/learn/answers/how-do-i-keep-my-house-from-smelling-like-cat-litter",
    permanent: true
  },
  {
    source: "/learn/answers/what-neutralizes-cat-litter-smell",
    destination: "/learn/answers/what-eliminates-cat-litter-odor",
    permanent: true
  },
  {
    source: "/learn/answers/what-cat-litter-smells-the-best",
    destination: "/learn/answers/what-cat-litter-controls-odor-best",
    permanent: true
  },
  {
    source: "/learn/answers/which-cat-litter-controls-odor-the-best",
    destination: "/learn/answers/what-cat-litter-controls-odor-best",
    permanent: true
  },
  {
    source: "/learn/answers/which-cat-litter-has-the-best-odor-control",
    destination: "/learn/answers/what-cat-litter-controls-odor-best",
    permanent: true
  },
  {
    source: "/learn/answers/which-cat-litter-smells-the-best",
    destination: "/learn/answers/what-cat-litter-controls-odor-best",
    permanent: true
  },
  {
    source: "/learn/answers/does-cat-litter-smell-like-ammonia",
    destination: "/learn/answers/why-does-my-house-smell-like-cat-pee",
    permanent: true
  },
  {
    source: "/learn/answers/why-does-cat-litter-smell-like-ammonia",
    destination: "/learn/answers/why-does-my-house-smell-like-cat-pee",
    permanent: true
  },
  {
    source: "/learn/answers/why-does-cat-litter-smell-so-bad",
    destination: "/learn/answers/how-do-i-stop-my-cat-litter-from-smelling",
    permanent: true
  },
  {
    source: "/learn/answers/is-cat-litter-smell-toxic",
    destination: "/learn/cat-litter-ammonia-health-risks",
    permanent: true
  },
  {
    source: "/learn/answers/is-cat-litter-smell-bad-for-you",
    destination: "/learn/cat-litter-ammonia-health-risks",
    permanent: true
  },
  {
    source: "/learn/answers/can-cat-litter-smell-make-you-sick",
    destination: "/learn/cat-litter-ammonia-health-risks",
    permanent: true
  },
  {
    source: "/learn/answers/can-i-use-essential-oils-in-cat-litter",
    destination: "/learn/safety",
    permanent: true
  },
  {
    source: "/learn/answers/how-to-get-rid-of-cat-odor-in-small-space",
    destination: "/learn/solutions/apartment-cat-smell-solution",
    permanent: true
  },
  {
    source: "/solutions/ammonia-smell-cat-litter",
    destination: "/learn/solutions/ammonia-smell-cat-litter",
    permanent: true
  },
  {
    source: "/solutions/apartment-cat-smell-solution",
    destination: "/learn/solutions/apartment-cat-smell-solution",
    permanent: true
  },
  {
    source: "/solutions/litter-box-smell-elimination",
    destination: "/learn/solutions/litter-box-smell-elimination",
    permanent: true
  },
  {
    source: "/solutions/multiple-cats-odor-control",
    destination: "/learn/solutions/multiple-cats-odor-control",
    permanent: true
  },
  {
    source: "/solutions/natural-cat-litter-additive",
    destination: "/learn/solutions/natural-cat-litter-additive",
    permanent: true
  },
  {
    source: "/solutions/senior-cat-litter-solutions",
    destination: "/learn/solutions/senior-cat-litter-solutions",
    permanent: true
  },
  {
    source: "/solutions",
    destination: "/learn",
    permanent: true
  },
  {
    source: "/products/purrify-20g",
    destination: "/products/trial-size",
    permanent: true
  },
  {
    source: "/products/purrify-50g",
    destination: "/products/standard",
    permanent: true
  },
  {
    source: "/products/purrify-120g",
    destination: "/products/family-pack",
    permanent: true
  },
  {
    source: "/products/medium-size",
    destination: "/products/standard",
    permanent: true,
    locale: false
  },
  {
    source: "/products/large-size",
    destination: "/products/family-pack",
    permanent: true,
    locale: false
  },
  {
    source: "/products/family",
    destination: "/products/family-pack",
    permanent: true,
    locale: false
  },
  {
    source: "/products/trial",
    destination: "/products/trial-size",
    permanent: true
  },
  {
    source: "/products/compare",
    destination: "/products",
    permanent: true
  },
  {
    source: "/trial",
    destination: "/products/trial-size",
    permanent: true
  },
  {
    source: "/:locale(fr|zh|es)/trial",
    destination: "/:locale/products/trial-size",
    permanent: true
  },
  {
    source: "/stockists",
    destination: "/stores",
    permanent: true
  },
  {
    source: "/fr/stockists",
    destination: "/fr/stores",
    permanent: true
  },
  {
    source: "/zh/stockists",
    destination: "/zh/stores",
    permanent: true
  },
  {
    source: "/es/stockists",
    destination: "/es/stores",
    permanent: true
  },
  {
    source: "/locations/ab",
    destination: "/locations/province/alberta",
    permanent: true
  },
  {
    source: "/locations/bc",
    destination: "/locations/province/british-columbia",
    permanent: true
  },
  {
    source: "/locations/mb",
    destination: "/locations/province/manitoba",
    permanent: true
  },
  {
    source: "/locations/ns",
    destination: "/locations/province/nova-scotia",
    permanent: true
  },
  {
    source: "/locations/on",
    destination: "/locations/province/ontario",
    permanent: true
  },
  {
    source: "/locations/qc",
    destination: "/locations/province/quebec",
    permanent: true
  },
  {
    source: "/locations/sk",
    destination: "/locations/province/saskatchewan",
    permanent: true
  },
  {
    source: "/locations/nb",
    destination: "/locations",
    permanent: true
  },
  {
    source: "/locations/nl",
    destination: "/locations",
    permanent: true
  },
  {
    source: "/locations/pe",
    destination: "/locations",
    permanent: true
  },
  {
    source: "/locations/nt",
    destination: "/locations",
    permanent: true
  },
  {
    source: "/locations/nu",
    destination: "/locations",
    permanent: true
  },
  {
    source: "/locations/yt",
    destination: "/locations",
    permanent: true
  },
  {
    source: "/locations/province/prince-edward-island",
    destination: "/locations",
    permanent: true
  },
  {
    source: "/locations/province/northwest-territories",
    destination: "/locations",
    permanent: true
  },
  {
    source: "/locations/province/nunavut",
    destination: "/locations",
    permanent: true
  },
  {
    source: "/locations/province/yukon",
    destination: "/locations",
    permanent: true
  },
  {
    source: "/locations/province/new-brunswick",
    destination: "/locations",
    permanent: true
  },
  {
    source: "/locations/province/newfoundland-and-labrador",
    destination: "/locations",
    permanent: true
  },
  {
    source: "/:locale(fr|zh|es)/locations/province/prince-edward-island",
    destination: "/:locale/locations",
    permanent: true
  },
  {
    source: "/:locale(fr|zh|es)/locations/province/northwest-territories",
    destination: "/:locale/locations",
    permanent: true
  },
  {
    source: "/:locale(fr|zh|es)/locations/province/nunavut",
    destination: "/:locale/locations",
    permanent: true
  },
  {
    source: "/:locale(fr|zh|es)/locations/province/yukon",
    destination: "/:locale/locations",
    permanent: true
  },
  {
    source: "/:locale(fr|zh|es)/locations/province/new-brunswick",
    destination: "/:locale/locations",
    permanent: true
  },
  {
    source: "/:locale(fr|zh|es)/locations/province/newfoundland-and-labrador",
    destination: "/:locale/locations",
    permanent: true
  },
  {
    source: "/es/locations/montreal",
    destination: "/es/stores",
    permanent: true
  },
  {
    source: "/es/locations/province/alberta",
    destination: "/es/stores",
    permanent: true
  },
  {
    source: "/es/locations/province/british-columbia",
    destination: "/es/stores",
    permanent: true
  },
  {
    source: "/es/locations/province/manitoba",
    destination: "/es/stores",
    permanent: true
  },
  {
    source: "/es/locations/province/nova-scotia",
    destination: "/es/stores",
    permanent: true
  },
  {
    source: "/es/locations/province/ontario",
    destination: "/es/stores",
    permanent: true
  },
  {
    source: "/es/locations/province/quebec",
    destination: "/es/stores",
    permanent: true
  },
  {
    source: "/es/locations/province/saskatchewan",
    destination: "/es/stores",
    permanent: true
  },
  {
    source: "/es/opiniones",
    destination: "/es/reviews",
    permanent: true
  },
  {
    source: "/es/reviews",
    destination: "/es/products",
    permanent: true
  },
  {
    source: "/purr/trial",
    destination: "/products/trial-size",
    permanent: true
  },
  {
    source: "/purr/products",
    destination: "/products",
    permanent: true
  },
  {
    source: "/purr/how-it-works",
    destination: "/learn/how-it-works",
    permanent: true
  },
  {
    source: "/purr",
    destination: "/products",
    permanent: true
  },
  {
    source: "/purrify-cat-litter-odor-eliminator-copy",
    destination: "/products",
    permanent: true
  },
  {
    source: "/checkout",
    destination: "/products",
    permanent: true
  },
  {
    source: "/checkout-2",
    destination: "/products",
    permanent: true
  },
  {
    source: "/cart",
    destination: "/products",
    permanent: true
  },
  {
    source: "/cart-2",
    destination: "/products",
    permanent: true
  },
  {
    source: "/order",
    destination: "/customer/portal",
    permanent: true
  },
  {
    source: "/orders",
    destination: "/customer/portal",
    permanent: true
  },
  {
    source: "/account",
    destination: "/customer/portal",
    permanent: true
  },
  {
    source: "/my-account",
    destination: "/customer/portal",
    permanent: true
  },
  {
    source: "/my-account-2",
    destination: "/customer/portal",
    permanent: true
  },
  {
    source: "/wishlist",
    destination: "/products",
    permanent: true
  },
  {
    source: "/shop",
    destination: "/products",
    permanent: true
  },
  {
    source: "/shopdsf",
    destination: "/products",
    permanent: true
  },
  {
    source: "/store",
    destination: "/products",
    permanent: true
  },
  {
    source: "/boutique",
    destination: "/products",
    permanent: true
  },
  {
    source: "/tienda",
    destination: "/products",
    permanent: true
  },
  {
    source: "/catalog",
    destination: "/products",
    permanent: true
  },
  {
    source: "/pricing",
    destination: "/products",
    permanent: true
  },
  {
    source: "/plans",
    destination: "/products",
    permanent: true
  },
  {
    source: "/subscribe",
    destination: "/products",
    permanent: true
  },
  {
    source: "/buy-now",
    destination: "/products",
    permanent: true
  },
  {
    source: "/purchase",
    destination: "/products",
    permanent: true
  },
  {
    source: "/order-now",
    destination: "/products",
    permanent: true
  },
  {
    source: "/signup",
    destination: "/products",
    permanent: true
  },
  {
    source: "/register",
    destination: "/products",
    permanent: true
  },
  {
    source: "/:locale(fr|zh|es)/checkout",
    destination: "/:locale/products",
    permanent: true
  },
  {
    source: "/login",
    destination: "/admin/login",
    permanent: false
  },
  {
    source: "/signin",
    destination: "/admin/login",
    permanent: false
  },
  {
    source: "/auth/signin",
    destination: "/admin/login",
    permanent: false
  },
  {
    source: "/sign-out",
    destination: "/",
    permanent: false
  },
  {
    source: "/logout",
    destination: "/",
    permanent: false
  },
  {
    source: "/affiliate/forgot-password",
    destination: "/affiliate",
    permanent: false
  },
  {
    source: "/support/contact",
    destination: "/contact",
    permanent: true
  },
  {
    source: "/contact-us",
    destination: "/contact",
    permanent: true
  },
  {
    source: "/get-in-touch",
    destination: "/contact",
    permanent: true
  },
  {
    source: "/faq",
    destination: "/support",
    permanent: true
  },
  {
    source: "/help",
    destination: "/support",
    permanent: true
  },
  {
    source: "/support-center",
    destination: "/support",
    permanent: true
  },
  {
    source: "/help-center",
    destination: "/support",
    permanent: true
  },
  {
    source: "/shipping",
    destination: "/support/shipping",
    permanent: true
  },
  {
    source: "/returns",
    destination: "/support",
    permanent: true
  },
  {
    source: "/guarantee",
    destination: "/support",
    permanent: true
  },
  {
    source: "/unsubscribe",
    destination: "/support",
    permanent: true
  },
  {
    source: "/about",
    destination: "/about/our-story",
    permanent: true
  },
  {
    source: "/company",
    destination: "/about/our-story",
    permanent: true
  },
  {
    source: "/team",
    destination: "/about/our-story",
    permanent: true
  },
  {
    source: "/mission",
    destination: "/about/our-story",
    permanent: true
  },
  {
    source: "/our-story",
    destination: "/about/our-story",
    permanent: true
  },
  {
    source: "/customers",
    destination: "/case-studies",
    permanent: true
  },
  {
    source: "/documents",
    destination: "/invest",
    permanent: true
  },
  {
    source: "/find-a-store",
    destination: "/stores",
    permanent: true
  },
  {
    source: "/find-store",
    destination: "/stores",
    permanent: true
  },
  {
    source: "/retail-locations",
    destination: "/stores",
    permanent: true
  },
  {
    source: "/where-to-buy",
    destination: "/stores",
    permanent: true
  },
  {
    source: "/store-locator",
    destination: "/stores",
    permanent: true
  },
  {
    source: "/affiliates",
    destination: "/affiliate",
    permanent: true
  },
  {
    source: "/partner",
    destination: "/affiliate",
    permanent: true
  },
  {
    source: "/partners",
    destination: "/affiliate",
    permanent: true
  },
  {
    source: "/referral-program",
    destination: "/referral",
    permanent: true
  },
  {
    source: "/guides/:path*",
    destination: "/learn/:path*",
    permanent: true
  },
  {
    source: "/education/:path*",
    destination: "/learn/:path*",
    permanent: true
  },
  {
    source: "/resources/:path*",
    destination: "/learn/:path*",
    permanent: true
  },
  {
    source: "/info",
    destination: "/learn",
    permanent: true
  },
  {
    source: "/blog/litter-box-odor-control",
    destination: "/learn/solutions/litter-box-smell-elimination",
    permanent: true
  },
  {
    source: "/blog/natural-odor-control",
    destination: "/learn/solutions/natural-cat-litter-additive",
    permanent: true
  },
  {
    source: "/blog/ammonia-smell-solutions",
    destination: "/learn/solutions/ammonia-smell-cat-litter",
    permanent: true
  },
  {
    source: "/blog/apartment-cat-owners",
    destination: "/learn/solutions/apartment-cat-smell-solution",
    permanent: true
  },
  {
    source: "/blog/multi-cat-solutions",
    destination: "/learn/solutions/multiple-cats-odor-control",
    permanent: true
  },
  {
    source: "/blog/senior-cat-care",
    destination: "/learn/solutions/senior-cat-litter-solutions",
    permanent: true
  },
  {
    source: "/blog/how-it-works",
    destination: "/learn/how-it-works",
    permanent: true
  },
  {
    source: "/blog/science",
    destination: "/learn/science",
    permanent: true
  },
  {
    source: "/blog/faq",
    destination: "/learn/faq",
    permanent: true
  },
  {
    source: "/blog/safety",
    destination: "/learn/safety",
    permanent: true
  },
  {
    source: "/blog/using-purrify",
    destination: "/learn/how-to-use-deodorizer",
    permanent: true
  },
  {
    source: "/blog/carbon-benefits",
    destination: "/learn/activated-carbon-benefits",
    permanent: true
  },
  {
    source: "/blog/how-often-change-cat-litter",
    destination: "/learn/cat-litter-guide",
    permanent: true
  },
  {
    source: "/blog/how-to-eliminate-cat-litter-odor",
    destination: "/learn/solutions/litter-box-smell-elimination",
    permanent: true
  },
  {
    source: "/blog/how-to-neutralize-ammonia-cat-litter",
    destination: "/learn/solutions/how-to-neutralize-ammonia-cat-litter",
    permanent: true
  },
  {
    source: "/blog/how-to-reduce-litter-box-odor",
    destination: "/learn/solutions/litter-box-smell-elimination",
    permanent: true
  },
  {
    source: "/blog/how-to-use-cat-litter-deodorizer",
    destination: "/learn/how-to-use-deodorizer",
    permanent: true
  },
  // All other blog posts redirect to their canonical /en/blog path
  {
    source: "/blog/:slug*",
    destination: "/en/blog/:slug*",
    permanent: true
  },
  {
    source: "/tos",
    destination: "/terms",
    permanent: true
  },
  {
    source: "/terms-of-service",
    destination: "/terms",
    permanent: true
  },
  {
    source: "/terms-and-conditions",
    destination: "/terms",
    permanent: true
  },
  {
    source: "/legal",
    destination: "/terms",
    permanent: true
  },
  {
    source: "/privacy",
    destination: "/privacy-policy",
    permanent: true
  },
  {
    source: "/comments/feed",
    destination: "/blog",
    permanent: true
  },
  {
    source: "/feed",
    destination: "/blog",
    permanent: true
  },
  {
    source: "/rss.xml",
    destination: "/blog",
    permanent: true
  },
  {
    source: "/feed.xml",
    destination: "/blog",
    permanent: true
  },
  {
    source: "/atom.xml",
    destination: "/blog",
    permanent: true
  },
  {
    source: "/sitemap_index.xml",
    destination: "/sitemap.xml",
    permanent: true
  },
  {
    source: "/wp-admin/:path*",
    destination: "/",
    permanent: true
  },
  {
    source: "/wp-login.php",
    destination: "/",
    permanent: true
  },
  {
    source: "/wordpress/:path*",
    destination: "/",
    permanent: true
  },
  {
    source: "/wp/:path*",
    destination: "/",
    permanent: true
  },
  {
    source: "/administrator/:path*",
    destination: "/",
    permanent: true
  },
  {
    source: "/phpmyadmin/:path*",
    destination: "/",
    permanent: true
  },
  {
    source: "/pma/:path*",
    destination: "/",
    permanent: true
  },
  {
    source: "/dbadmin/:path*",
    destination: "/",
    permanent: true
  },
  {
    source: "/mysql/:path*",
    destination: "/",
    permanent: true
  },
  {
    source: "/.env",
    destination: "/",
    permanent: true
  },
  {
    source: "/.git/:path*",
    destination: "/",
    permanent: true
  },
  {
    source: "/config/:path*",
    destination: "/",
    permanent: true
  },
  {
    source: "/wp-content/:path*",
    destination: "/",
    permanent: true
  },
  {
    source: "/wp-includes/:path*",
    destination: "/",
    permanent: true
  },
  {
    source: "/themes/:path*",
    destination: "/",
    permanent: true
  },
  {
    source: "/plugins/:path*",
    destination: "/",
    permanent: true
  },
  {
    source: "/category/:path*",
    destination: "/products",
    permanent: true
  },
  {
    source: "/tag/:path*",
    destination: "/products",
    permanent: true
  },
  {
    source: "/collections/:path*",
    destination: "/products",
    permanent: true
  },
  {
    source: "/collections",
    destination: "/products",
    permanent: true
  },
  {
    source: "/brands/:path*",
    destination: "/products",
    permanent: true
  },
  {
    source: "/brand/:path*",
    destination: "/products",
    permanent: true
  },
  {
    source: "/product/:path*",
    destination: "/products/:path*",
    permanent: true
  },
  {
    source: "/shop/:path*",
    destination: "/products/:path*",
    permanent: true
  },
  {
    source: "/store/:path*",
    destination: "/products/:path*",
    permanent: true
  },
  {
    source: "/producto/:path*",
    destination: "/products/:path*",
    permanent: true
  },
  {
    source: "/produit/:path*",
    destination: "/products/:path*",
    permanent: true
  },
  {
    source: "/www.",
    destination: "/",
    permanent: true
  },
  {
    source: "/:locale(fr|es|zh)/products/:path+/",
    destination: "/:locale/products/:path*",
    permanent: true
  },
  {
    source: "/:locale(fr|es|zh)/about",
    destination: "/:locale/about/our-story",
    permanent: true
  },
  {
    source: "/:locale(fr|es|zh)/contact-us",
    destination: "/:locale/contact",
    permanent: true
  },
  {
    source: "/demo/:path*",
    destination: "/",
    permanent: false
  },
  {
    source: "/test",
    destination: "/",
    permanent: false
  },
  {
    source: "/home-three",
    destination: "/",
    permanent: true
  },
  {
    source: "/services-two-2",
    destination: "/",
    permanent: true
  },
  {
    source: "/dn",
    destination: "/",
    permanent: true
  },
  {
    source: "/",
    has: [
      {
        type: "query",
        key: "p",
        value: "138"
      }
    ],
    destination: "/blog",
    permanent: true
  },
  {
    source: "/",
    has: [
      {
        type: "query",
        key: "p",
        value: "137"
      }
    ],
    destination: "/blog",
    permanent: true
  },
  {
    source: "/",
    has: [
      {
        type: "query",
        key: "p",
        value: "130"
      }
    ],
    destination: "/blog",
    permanent: true
  },
  {
    source: "/",
    has: [
      {
        type: "query",
        key: "p",
        value: "131"
      }
    ],
    destination: "/blog",
    permanent: true
  },
  {
    source: "/",
    has: [
      {
        type: "query",
        key: "p",
        value: "132"
      }
    ],
    destination: "/blog",
    permanent: true
  },
  {
    source: "/",
    has: [
      {
        type: "query",
        key: "p",
        value: "134"
      }
    ],
    destination: "/blog",
    permanent: true
  }
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
  productionBrowserSourceMaps: true,
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
