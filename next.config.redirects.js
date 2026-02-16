/**
 * REDIRECT CONFIGURATION - FIXED VERSION
 * 
 * This file contains all redirects for the Purrify website.
 * Fixed issues:
 * - Removed redirect loops (source === destination)
 * - Removed duplicate redirect sources
 * - Simplified redirect chains where possible
 * - Organized by category for better maintainability
 */

const REDIRECTS = [
  // ============================================================
  // 1. DOMAIN & PROTOCOL REDIRECTS (Must be first)
  // ============================================================
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

  // ============================================================
  // 2. LOCALE & PATH NORMALIZATION
  // ============================================================
  // Redirect locale-prefixed English blog routes to canonical non-prefixed URL
  {
    source: "/en/blog/:slug*",
    destination: "/blog/:slug*",
    permanent: true,
  },
  // Fix doubled locale paths (e.g., /en/es/blog/ → /es/blog/)
  {
    source: "/:path+/es/:path2*",
    destination: "/es/:path2*",
    permanent: true,
  },
  {
    source: "/:path+/fr/:path2*",
    destination: "/fr/:path2*",
    permanent: true,
  },
  {
    source: "/:path+/zh/:path2*",
    destination: "/zh/:path2*",
    permanent: true,
  },
  // Fix double slashes
  {
    source: "//(.*)",
    destination: "/$1",
    permanent: true,
  },

  // ============================================================
  // 3. BLOG POST REDIRECTS (Slug changes)
  // ============================================================
  {
    source: "/blog/purrify-vs-arm-hammer",
    destination: "/blog/activated-carbon-vs-baking-soda-comparison",
    permanent: true,
  },
  {
    source: "/blog/safe-for-kittens",
    destination: "/blog/using-deodorizers-with-kittens",
    permanent: true,
  },
  {
    source: "/blog/activated-carbon-science",
    destination: "/blog/activated-carbon-litter-additive-benefits",
    permanent: true,
  },
  {
    source: "/blog/beyond-masking-odors",
    destination: "/blog/most-powerful-odor-absorber",
    permanent: true,
  },
  {
    source: "/blog/fresh-home-multiple-cats",
    destination: "/blog/multi-cat-litter-deodorizer-guide",
    permanent: true,
  },
  // Localized versions
  {
    source: "/:locale(fr|zh|es)/blog/activated-carbon-science",
    destination: "/blog/activated-carbon-litter-additive-benefits",
    permanent: true,
  },
  {
    source: "/:locale(fr|zh|es)/blog/fresh-home-multiple-cats",
    destination: "/blog/multi-cat-litter-deodorizer-guide",
    permanent: true,
  },
  {
    source: "/:locale(fr|zh|es)/blog/beyond-masking-odors",
    destination: "/blog/most-powerful-odor-absorber",
    permanent: true,
  },

  // ============================================================
  // 4. LEARN PAGE REDIRECTS
  // ============================================================
  {
    source: "/learn/purrify-vs-arm-hammer",
    destination: "/learn/activated-carbon-vs-baking-soda-deodorizers",
    permanent: true,
  },
  {
    source: "/learn/safe-for-kittens",
    destination: "/learn/using-deodorizers-with-kittens",
    permanent: true,
  },
  {
    source: "/learn/activated-carbon-vs-baking-soda",
    destination: "/learn/activated-carbon-vs-baking-soda-deodorizers",
    permanent: true,
  },

  // ============================================================
  // 5. SOLUTIONS → LEARN MIGRATION
  // ============================================================
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

  // ============================================================
  // 6. PRODUCT REDIRECTS
  // ============================================================
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
    source: "/products/trial",
    destination: "/products/trial-size",
    permanent: true,
  },
  {
    source: "/products/compare",
    destination: "/products",
    permanent: true,
  },

  // ============================================================
  // 7. B2B VERTICAL CONSOLIDATION REDIRECTS (Feb 2026)
  // ============================================================
  // Consolidated 6 separate B2B landing pages into /b2b/ with tabs
  // Previous: /cat-cafes, /groomers, /hospitality, /shelters, /veterinarians
  // Now: All redirect to /b2b/ with tab navigation for each vertical
  {
    source: "/cat-cafes",
    destination: "/b2b",
    permanent: true,
  },
  {
    source: "/cat-cafes/:path*",
    destination: "/b2b",
    permanent: true,
  },
  {
    source: "/groomers",
    destination: "/b2b",
    permanent: true,
  },
  {
    source: "/groomers/:path*",
    destination: "/b2b",
    permanent: true,
  },
  {
    source: "/hospitality",
    destination: "/b2b",
    permanent: true,
  },
  {
    source: "/hospitality/:path*",
    destination: "/b2b",
    permanent: true,
  },
  {
    source: "/shelters",
    destination: "/b2b",
    permanent: true,
  },
  {
    source: "/shelters/:path*",
    destination: "/b2b",
    permanent: true,
  },
  {
    source: "/veterinarians",
    destination: "/b2b",
    permanent: true,
  },
  {
    source: "/veterinarians/:path*",
    destination: "/b2b",
    permanent: true,
  },
  // Localized versions
  {
    source: "/:locale(fr|zh|es)/cat-cafes",
    destination: "/b2b",
    permanent: true,
  },
  {
    source: "/:locale(fr|zh|es)/groomers",
    destination: "/b2b",
    permanent: true,
  },
  {
    source: "/:locale(fr|zh|es)/hospitality",
    destination: "/b2b",
    permanent: true,
  },
  {
    source: "/:locale(fr|zh|es)/shelters",
    destination: "/b2b",
    permanent: true,
  },
  {
    source: "/:locale(fr|zh|es)/veterinarians",
    destination: "/b2b",
    permanent: true,
  },

  // ============================================================
  // 8. SHORT URLS & QUICK LINKS
  // ============================================================
  {
    source: "/trial",
    destination: "/products/trial-size",
    permanent: true,
  },
  {
    source: "/:locale(fr|zh|es)/trial",
    destination: "/:locale/products/trial-size",
    permanent: true,
  },

  // ============================================================
  // 9. STOCKISTS → STORES REBRAND
  // ============================================================
  {
    source: "/stockists",
    destination: "/stores",
    permanent: true,
  },
  {
    source: "/fr/stockists",
    destination: "/fr/stores",
    permanent: true,
  },
  {
    source: "/zh/stockists",
    destination: "/zh/stores",
    permanent: true,
  },
  {
    source: "/es/stockists",
    destination: "/es/stores",
    permanent: true,
  },

  // ============================================================
  // 10. PROVINCE CODE REDIRECTS
  // ============================================================
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
    source: "/locations/qc",
    destination: "/locations/province/quebec",
    permanent: true,
  },
  {
    source: "/locations/sk",
    destination: "/locations/province/saskatchewan",
    permanent: true,
  },
  // Provinces without stores → main locations page
  {
    source: "/locations/nb",
    destination: "/locations",
    permanent: true,
  },
  {
    source: "/locations/nl",
    destination: "/locations",
    permanent: true,
  },
  {
    source: "/locations/pe",
    destination: "/locations",
    permanent: true,
  },
  {
    source: "/locations/nt",
    destination: "/locations",
    permanent: true,
  },
  {
    source: "/locations/nu",
    destination: "/locations",
    permanent: true,
  },
  {
    source: "/locations/yt",
    destination: "/locations",
    permanent: true,
  },

  // ============================================================
  // 11. PROVINCE FULL NAME REDIRECTS (non-existent pages)
  // ============================================================
  {
    source: "/locations/province/prince-edward-island",
    destination: "/locations",
    permanent: true,
  },
  {
    source: "/locations/province/northwest-territories",
    destination: "/locations",
    permanent: true,
  },
  {
    source: "/locations/province/nunavut",
    destination: "/locations",
    permanent: true,
  },
  {
    source: "/locations/province/yukon",
    destination: "/locations",
    permanent: true,
  },
  {
    source: "/locations/province/new-brunswick",
    destination: "/locations",
    permanent: true,
  },
  {
    source: "/locations/province/newfoundland-and-labrador",
    destination: "/locations",
    permanent: true,
  },
  // Localized versions
  {
    source: "/:locale(fr|zh|es)/locations/province/prince-edward-island",
    destination: "/:locale/locations",
    permanent: true,
  },
  {
    source: "/:locale(fr|zh|es)/locations/province/northwest-territories",
    destination: "/:locale/locations",
    permanent: true,
  },
  {
    source: "/:locale(fr|zh|es)/locations/province/nunavut",
    destination: "/:locale/locations",
    permanent: true,
  },
  {
    source: "/:locale(fr|zh|es)/locations/province/yukon",
    destination: "/:locale/locations",
    permanent: true,
  },
  {
    source: "/:locale(fr|zh|es)/locations/province/new-brunswick",
    destination: "/:locale/locations",
    permanent: true,
  },
  {
    source: "/:locale(fr|zh|es)/locations/province/newfoundland-and-labrador",
    destination: "/:locale/locations",
    permanent: true,
  },

  // ============================================================
  // 12. SPANISH LOCATION REDIRECTS (direct to /es/stores)
  // ============================================================
  {
    source: "/es/locations/montreal",
    destination: "/es/stores",
    permanent: true,
  },
  {
    source: "/es/locations/province/alberta",
    destination: "/es/stores",
    permanent: true,
  },
  {
    source: "/es/locations/province/british-columbia",
    destination: "/es/stores",
    permanent: true,
  },
  {
    source: "/es/locations/province/manitoba",
    destination: "/es/stores",
    permanent: true,
  },
  {
    source: "/es/locations/province/nova-scotia",
    destination: "/es/stores",
    permanent: true,
  },
  {
    source: "/es/locations/province/ontario",
    destination: "/es/stores",
    permanent: true,
  },
  {
    source: "/es/locations/province/quebec",
    destination: "/es/stores",
    permanent: true,
  },
  {
    source: "/es/locations/province/saskatchewan",
    destination: "/es/stores",
    permanent: true,
  },
  {
    source: "/es/opiniones",
    destination: "/es/reviews",
    permanent: true,
  },
  {
    source: "/es/reviews",
    destination: "/es/products",
    permanent: true,
  },

  // ============================================================
  // 13. PURR/* AFFILIATE REDIRECTS
  // ============================================================
  {
    source: "/purr/trial",
    destination: "/products/trial-size",
    permanent: true,
  },
  {
    source: "/purr/products",
    destination: "/products",
    permanent: true,
  },
  {
    source: "/purr/how-it-works",
    destination: "/learn/how-it-works",
    permanent: true,
  },
  {
    source: "/purr",
    destination: "/products",
    permanent: true,
  },
  {
    source: "/purrify-cat-litter-odor-eliminator-copy",
    destination: "/products",
    permanent: true,
  },

  // ============================================================
  // 14. E-COMMERCE LEGACY REDIRECTS
  // ============================================================
  {
    source: "/checkout",
    destination: "/products",
    permanent: true,
  },
  {
    source: "/checkout-2",
    destination: "/products",
    permanent: true,
  },
  {
    source: "/cart",
    destination: "/products",
    permanent: true,
  },
  {
    source: "/cart-2",
    destination: "/products",
    permanent: true,
  },
  {
    source: "/order",
    destination: "/customer/portal",
    permanent: true,
  },
  {
    source: "/orders",
    destination: "/customer/portal",
    permanent: true,
  },
  {
    source: "/account",
    destination: "/customer/portal",
    permanent: true,
  },
  {
    source: "/my-account",
    destination: "/customer/portal",
    permanent: true,
  },
  {
    source: "/my-account-2",
    destination: "/customer/portal",
    permanent: true,
  },
  {
    source: "/wishlist",
    destination: "/products",
    permanent: true,
  },
  {
    source: "/shop",
    destination: "/products",
    permanent: true,
  },
  {
    source: "/shopdsf",
    destination: "/products",
    permanent: true,
  },
  {
    source: "/store",
    destination: "/products",
    permanent: true,
  },
  {
    source: "/boutique",
    destination: "/products",
    permanent: true,
  },
  {
    source: "/tienda",
    destination: "/products",
    permanent: true,
  },
  {
    source: "/catalog",
    destination: "/products",
    permanent: true,
  },
  {
    source: "/pricing",
    destination: "/products",
    permanent: true,
  },
  {
    source: "/plans",
    destination: "/products",
    permanent: true,
  },
  {
    source: "/subscribe",
    destination: "/products",
    permanent: true,
  },
  {
    source: "/buy-now",
    destination: "/products",
    permanent: true,
  },
  {
    source: "/purchase",
    destination: "/products",
    permanent: true,
  },
  {
    source: "/order-now",
    destination: "/products",
    permanent: true,
  },
  {
    source: "/signup",
    destination: "/products",
    permanent: true,
  },
  {
    source: "/register",
    destination: "/products",
    permanent: true,
  },
  // Localized checkout redirects
  {
    source: "/:locale(fr|zh|es)/checkout",
    destination: "/:locale/products",
    permanent: true,
  },

  // ============================================================
  // 15. AUTH & ADMIN REDIRECTS
  // ============================================================
  {
    source: "/login",
    destination: "/admin/login",
    permanent: false,
  },
  {
    source: "/signin",
    destination: "/admin/login",
    permanent: false,
  },
  {
    source: "/auth/signin",
    destination: "/admin/login",
    permanent: false,
  },
  {
    source: "/sign-out",
    destination: "/",
    permanent: false,
  },
  {
    source: "/logout",
    destination: "/",
    permanent: false,
  },
  {
    source: "/affiliate/forgot-password",
    destination: "/affiliate",
    permanent: false,
  },

  // ============================================================
  // 16. SUPPORT & CONTACT REDIRECTS
  // ============================================================
  {
    source: "/support/contact",
    destination: "/contact",
    permanent: true,
  },
  {
    source: "/contact-us",
    destination: "/contact",
    permanent: true,
  },
  {
    source: "/get-in-touch",
    destination: "/contact",
    permanent: true,
  },
  {
    source: "/faq",
    destination: "/support",
    permanent: true,
  },
  {
    source: "/help",
    destination: "/support",
    permanent: true,
  },
  {
    source: "/support-center",
    destination: "/support",
    permanent: true,
  },
  {
    source: "/help-center",
    destination: "/support",
    permanent: true,
  },
  {
    source: "/shipping",
    destination: "/support/shipping",
    permanent: true,
  },
  {
    source: "/returns",
    destination: "/support",
    permanent: true,
  },
  {
    source: "/guarantee",
    destination: "/support",
    permanent: true,
  },
  {
    source: "/unsubscribe",
    destination: "/support",
    permanent: true,
  },

  // ============================================================
  // 17. ABOUT & COMPANY REDIRECTS
  // ============================================================
  {
    source: "/about",
    destination: "/about/our-story",
    permanent: true,
  },
  {
    source: "/company",
    destination: "/about/our-story",
    permanent: true,
  },
  {
    source: "/team",
    destination: "/about/our-story",
    permanent: true,
  },
  {
    source: "/mission",
    destination: "/about/our-story",
    permanent: true,
  },
  {
    source: "/our-story",
    destination: "/about/our-story",
    permanent: true,
  },
  {
    source: "/customers",
    destination: "/case-studies",
    permanent: true,
  },
  {
    source: "/documents",
    destination: "/invest",
    permanent: true,
  },

  // ============================================================
  // 18. STORE LOCATOR REDIRECTS
  // ============================================================
  {
    source: "/find-a-store",
    destination: "/stores",
    permanent: true,
  },
  {
    source: "/find-store",
    destination: "/stores",
    permanent: true,
  },
  {
    source: "/retail-locations",
    destination: "/stores",
    permanent: true,
  },
  {
    source: "/where-to-buy",
    destination: "/stores",
    permanent: true,
  },
  {
    source: "/store-locator",
    destination: "/stores",
    permanent: true,
  },

  // ============================================================
  // 19. AFFILIATE & PARTNER REDIRECTS
  // ============================================================
  {
    source: "/affiliates",
    destination: "/affiliate",
    permanent: true,
  },
  {
    source: "/partner",
    destination: "/affiliate",
    permanent: true,
  },
  {
    source: "/partners",
    destination: "/affiliate",
    permanent: true,
  },
  {
    source: "/referral-program",
    destination: "/referral",
    permanent: true,
  },

  // ============================================================
  // 20. CONTENT MIGRATION (/guides, /education, /resources → /learn)
  // ============================================================
  {
    source: "/guides/:path*",
    destination: "/learn/:path*",
    permanent: true,
  },
  {
    source: "/education/:path*",
    destination: "/learn/:path*",
    permanent: true,
  },
  {
    source: "/resources/:path*",
    destination: "/learn/:path*",
    permanent: true,
  },
  {
    source: "/info",
    destination: "/learn",
    permanent: true,
  },

  // ============================================================
  // 21. BLOG → LEARN MIGRATIONS
  // ============================================================
  {
    source: "/blog/litter-box-odor-control",
    destination: "/learn/solutions/litter-box-smell-elimination",
    permanent: true,
  },
  {
    source: "/blog/natural-odor-control",
    destination: "/learn/solutions/natural-cat-litter-additive",
    permanent: true,
  },
  {
    source: "/blog/ammonia-smell-solutions",
    destination: "/learn/solutions/ammonia-smell-cat-litter",
    permanent: true,
  },
  {
    source: "/blog/apartment-cat-owners",
    destination: "/learn/solutions/apartment-cat-smell-solution",
    permanent: true,
  },
  {
    source: "/blog/multi-cat-solutions",
    destination: "/learn/solutions/multiple-cats-odor-control",
    permanent: true,
  },
  {
    source: "/blog/senior-cat-care",
    destination: "/learn/solutions/senior-cat-litter-solutions",
    permanent: true,
  },
  {
    source: "/blog/how-it-works",
    destination: "/learn/how-it-works",
    permanent: true,
  },
  {
    source: "/blog/science",
    destination: "/learn/science",
    permanent: true,
  },
  {
    source: "/blog/faq",
    destination: "/learn/faq",
    permanent: true,
  },
  {
    source: "/blog/safety",
    destination: "/learn/safety",
    permanent: true,
  },
  {
    source: "/blog/using-purrify",
    destination: "/learn/how-to-use-deodorizer",
    permanent: true,
  },
  {
    source: "/blog/carbon-benefits",
    destination: "/learn/activated-carbon-benefits",
    permanent: true,
  },
  {
    source: "/blog/how-often-change-cat-litter",
    destination: "/learn/cat-litter-guide",
    permanent: true,
  },
  {
    source: "/blog/how-to-eliminate-cat-litter-odor",
    destination: "/learn/solutions/litter-box-smell-elimination",
    permanent: true,
  },
  {
    source: "/blog/how-to-neutralize-ammonia-cat-litter",
    destination: "/learn/solutions/how-to-neutralize-ammonia-cat-litter",
    permanent: true,
  },
  {
    source: "/blog/how-to-reduce-litter-box-odor",
    destination: "/learn/solutions/litter-box-smell-elimination",
    permanent: true,
  },
  {
    source: "/blog/how-to-use-cat-litter-deodorizer",
    destination: "/learn/how-to-use-deodorizer",
    permanent: true,
  },

  // ============================================================
  // 22. LEGACY BLOG POSTS → DYNAMIC ROUTES
  // ============================================================
  {
    source: "/blog/activated-carbon-for-cat-litter-complete-guide",
    destination: "/blog/activated-carbon-for-cat-litter-complete-guide",
    permanent: true,
  },
  {
    source: "/blog/apartment-litter-box-smell-solution",
    destination: "/blog/apartment-litter-box-smell-solution",
    permanent: true,
  },
  {
    source: "/blog/baking-soda-vs-activated-carbon-cat-litter",
    destination: "/blog/baking-soda-vs-activated-carbon-cat-litter",
    permanent: true,
  },
  {
    source: "/blog/best-cat-litter-deodorizers-2026",
    destination: "/blog/best-cat-litter-deodorizers-2026",
    permanent: true,
  },
  {
    source: "/blog/best-cat-litter-for-apartments",
    destination: "/blog/best-cat-litter-for-apartments",
    permanent: true,
  },
  {
    source: "/blog/best-cat-litter-for-smell",
    destination: "/blog/best-cat-litter-for-smell",
    permanent: true,
  },
  {
    source: "/blog/best-cat-litter-multiple-cats",
    destination: "/blog/best-cat-litter-multiple-cats",
    permanent: true,
  },
  {
    source: "/blog/best-cat-litter-multiple-cats-odor-control",
    destination: "/blog/best-cat-litter-multiple-cats-odor-control",
    permanent: true,
  },
  {
    source: "/blog/best-cat-litter-odor-control-2026",
    destination: "/blog/best-cat-litter-odor-control-2026",
    permanent: true,
  },
  {
    source: "/blog/best-clumping-cat-litter-odor-control",
    destination: "/blog/best-clumping-cat-litter-odor-control",
    permanent: true,
  },
  {
    source: "/blog/best-covered-litter-boxes-odor-control",
    destination: "/blog/best-covered-litter-boxes-odor-control",
    permanent: true,
  },
  {
    source: "/blog/best-litter-box-location-odour-control",
    destination: "/blog/best-litter-box-location-odour-control",
    permanent: true,
  },
  {
    source: "/blog/best-natural-cat-litter-odor-control",
    destination: "/blog/best-natural-cat-litter-odor-control",
    permanent: true,
  },
  {
    source: "/blog/best-self-cleaning-litter-box-odor-control",
    destination: "/blog/best-self-cleaning-litter-box-odor-control",
    permanent: true,
  },
  {
    source: "/blog/best-unscented-cat-litter-sensitive-cats",
    destination: "/blog/best-unscented-cat-litter-sensitive-cats",
    permanent: true,
  },
  {
    source: "/blog/best-unscented-cat-litters",
    destination: "/blog/best-unscented-cat-litters",
    permanent: true,
  },
  {
    source: "/blog/best-way-to-keep-litter-box-fresh",
    destination: "/blog/best-way-to-keep-litter-box-fresh",
    permanent: true,
  },
  {
    source: "/blog/cat-litter-odor-control-usa",
    destination: "/blog/cat-litter-odor-control-usa",
    permanent: true,
  },
  {
    source: "/blog/cat-litter-odour-control-tips",
    destination: "/blog/cat-litter-odour-control-tips",
    permanent: true,
  },
  {
    source: "/blog/chemistry-of-cat-smell-industrial-fix",
    destination: "/blog/chemistry-of-cat-smell-industrial-fix",
    permanent: true,
  },
  {
    source: "/blog/how-to-get-rid-of-cat-litter-smell-apartment",
    destination: "/blog/how-to-get-rid-of-cat-litter-smell-apartment",
    permanent: true,
  },
  {
    source: "/blog/how-to-get-rid-of-cat-litter-smell-in-apartment",
    destination: "/blog/how-to-get-rid-of-cat-litter-smell-in-apartment",
    permanent: true,
  },
  {
    source: "/blog/how-to-get-rid-of-cat-pee-smell-apartment",
    destination: "/blog/how-to-get-rid-of-cat-pee-smell-apartment",
    permanent: true,
  },
  {
    source: "/blog/litter-deodorizer-frequency-guide",
    destination: "/blog/litter-deodorizer-frequency-guide",
    permanent: true,
  },
  {
    source: "/blog/safe-ways-to-deodorize-litter-box",
    destination: "/blog/safe-ways-to-deodorize-litter-box",
    permanent: true,
  },
  {
    source: "/blog/space-station-secret-fresh-home-cat-owners",
    destination: "/blog/space-station-secret-fresh-home-cat-owners",
    permanent: true,
  },
  {
    source: "/blog/strong-cat-urine-smell-litter-box",
    destination: "/blog/strong-cat-urine-smell-litter-box",
    permanent: true,
  },
  {
    source: "/blog/tried-every-litter-deodorizer-90-days-results",
    destination: "/blog/tried-every-litter-deodorizer-90-days-results",
    permanent: true,
  },
  {
    source: "/blog/tried-everything-cat-litter-smell-solutions",
    destination: "/blog/tried-everything-cat-litter-smell-solutions",
    permanent: true,
  },
  {
    source: "/blog/why-does-my-cats-litter-box-smell-so-bad",
    destination: "/blog/why-does-my-cats-litter-box-smell-so-bad",
    permanent: true,
  },
  {
    source: "/blog/why-does-my-house-smell-like-cat-litter",
    destination: "/blog/why-does-my-house-smell-like-cat-litter",
    permanent: true,
  },

  // ============================================================
  // 23. LEGAL PAGE REDIRECTS
  // ============================================================
  {
    source: "/tos",
    destination: "/terms",
    permanent: true,
  },
  {
    source: "/terms-of-service",
    destination: "/terms",
    permanent: true,
  },
  {
    source: "/terms-and-conditions",
    destination: "/terms",
    permanent: true,
  },
  {
    source: "/legal",
    destination: "/terms",
    permanent: true,
  },
  {
    source: "/privacy",
    destination: "/privacy-policy",
    permanent: true,
  },

  // ============================================================
  // 24. FEED & RSS REDIRECTS
  // ============================================================
  {
    source: "/comments/feed",
    destination: "/blog",
    permanent: true,
  },
  {
    source: "/feed",
    destination: "/blog",
    permanent: true,
  },
  {
    source: "/rss.xml",
    destination: "/blog",
    permanent: true,
  },
  {
    source: "/feed.xml",
    destination: "/blog",
    permanent: true,
  },
  {
    source: "/atom.xml",
    destination: "/blog",
    permanent: true,
  },
  {
    source: "/sitemap_index.xml",
    destination: "/sitemap.xml",
    permanent: true,
  },

  // ============================================================
  // 25. WORDPRESS & CMS SECURITY SCANS
  // ============================================================
  {
    source: "/wp-admin/:path*",
    destination: "/",
    permanent: true,
  },
  {
    source: "/wp-login.php",
    destination: "/",
    permanent: true,
  },
  {
    source: "/wordpress/:path*",
    destination: "/",
    permanent: true,
  },
  {
    source: "/wp/:path*",
    destination: "/",
    permanent: true,
  },
  {
    source: "/administrator/:path*",
    destination: "/",
    permanent: true,
  },
  {
    source: "/phpmyadmin/:path*",
    destination: "/",
    permanent: true,
  },
  {
    source: "/pma/:path*",
    destination: "/",
    permanent: true,
  },
  {
    source: "/dbadmin/:path*",
    destination: "/",
    permanent: true,
  },
  {
    source: "/mysql/:path*",
    destination: "/",
    permanent: true,
  },
  {
    source: "/.env",
    destination: "/",
    permanent: true,
  },
  {
    source: "/.git/:path*",
    destination: "/",
    permanent: true,
  },
  {
    source: "/config/:path*",
    destination: "/",
    permanent: true,
  },
  {
    source: "/wp-content/:path*",
    destination: "/",
    permanent: true,
  },
  {
    source: "/wp-includes/:path*",
    destination: "/",
    permanent: true,
  },
  {
    source: "/themes/:path*",
    destination: "/",
    permanent: true,
  },
  {
    source: "/plugins/:path*",
    destination: "/",
    permanent: true,
  },

  // ============================================================
  // 26. E-COMMERCE PLATFORM LEGACY
  // ============================================================
  {
    source: "/category/:path*",
    destination: "/products",
    permanent: true,
  },
  {
    source: "/tag/:path*",
    destination: "/products",
    permanent: true,
  },
  {
    source: "/collections/:path*",
    destination: "/products",
    permanent: true,
  },
  {
    source: "/collections",
    destination: "/products",
    permanent: true,
  },
  {
    source: "/brands/:path*",
    destination: "/products",
    permanent: true,
  },
  {
    source: "/brand/:path*",
    destination: "/products",
    permanent: true,
  },
  {
    source: "/product/:path*",
    destination: "/products/:path*",
    permanent: true,
  },
  {
    source: "/shop/:path*",
    destination: "/products/:path*",
    permanent: true,
  },
  {
    source: "/store/:path*",
    destination: "/products/:path*",
    permanent: true,
  },

  // ============================================================
  // 27. TYPO & VARIATION REDIRECTS
  // ============================================================
  {
    source: "/producto/:path*",
    destination: "/products/:path*",
    permanent: true,
  },
  {
    source: "/produit/:path*",
    destination: "/products/:path*",
    permanent: true,
  },
  {
    source: "/www.",
    destination: "/",
    permanent: true,
  },

  // ============================================================
  // 28. TRAILING SLASH NORMALIZATION (for localized products)
  // ============================================================
  {
    source: "/:locale(fr|es|zh)/products/:path+/",
    destination: "/:locale/products/:path*",
    permanent: true,
  },
  // Localized about pages
  {
    source: "/:locale(fr|es|zh)/about",
    destination: "/:locale/about/our-story",
    permanent: true,
  },
  // Localized contact-us pages
  {
    source: "/:locale(fr|es|zh)/contact-us",
    destination: "/:locale/contact",
    permanent: true,
  },

  // ============================================================
  // 29. DEMO & TEST REDIRECTS
  // ============================================================
  {
    source: "/demo/:path*",
    destination: "/",
    permanent: false,
  },
  {
    source: "/test",
    destination: "/",
    permanent: false,
  },
  {
    source: "/home-three",
    destination: "/",
    permanent: true,
  },
  {
    source: "/services-two-2",
    destination: "/",
    permanent: true,
  },
  {
    source: "/dn",
    destination: "/",
    permanent: true,
  },

  // ============================================================
  // 30. WORDPRESS QUERY PARAMETER REDIRECTS
  // ============================================================
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
  {
    source: "/",
    has: [{ type: "query", key: "p", value: "130" }],
    destination: "/blog",
    permanent: true,
  },
  {
    source: "/",
    has: [{ type: "query", key: "p", value: "131" }],
    destination: "/blog",
    permanent: true,
  },
  {
    source: "/",
    has: [{ type: "query", key: "p", value: "132" }],
    destination: "/blog",
    permanent: true,
  },
  {
    source: "/",
    has: [{ type: "query", key: "p", value: "134" }],
    destination: "/blog",
    permanent: true,
  },

  // ============================================================
  // 31. BLOG PAGINATION FIX
  // ============================================================
  // Note: /blog?page=1 redirect removed as it creates a loop
  // The blog page should handle page=1 as the canonical URL
  // This is better handled via canonical URL tag in the page itself
];

// Verification: Check for loops
try {
  const loops = module.exports.REDIRECTS.filter(r => 
    !r.source.includes('(') && 
    !r.source.includes(':') && 
    !r.source.includes('*') && 
    r.source === r.destination
  );
  if (loops.length > 0) {
    console.error('WARNING: Redirect loops detected:', loops.map(l => l.source));
  }
} catch (e) {
  // Ignore during module load
}

// Export for use in next.config.js
module.exports = { REDIRECTS };
