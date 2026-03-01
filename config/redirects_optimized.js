/** @type {import('next').Redirect[]} */
const REDIRECTS = [

  // --- DOMAIN & PROTOCOL NORMALIZATION ---
  // Redirect non-www to www (FIXED: Include trailing slash to prevent double redirect)
  {
    source: "/:path*",
    has: [{ type: "host", value: "purrify.ca" }],
    destination: "https://www.purrify.ca/:path*/",
    permanent: true
  },
  // Redirect HTTP to HTTPS
  {
    source: "/:path*",
    has: [{ type: "header", key: "x-forwarded-proto", value: "http" }],
    destination: "https://www.purrify.ca/:path*/",
    permanent: true
  },

  // --- SUBDOMAIN & LOCALE FIXES ---
  // Fix double mentions of locale in path for subdomains
  {
    source: "/fr/:path*",
    has: [{ type: "host", value: "fr.purrify.ca" }],
    destination: "https://www.purrify.ca/fr/:path*",
    permanent: true
  },
  {
    source: "/:path*",
    has: [{ type: "host", value: "zh.purrify.ca" }],
    destination: "https://www.purrify.ca/:path*",
    permanent: true
  },
  {
    source: "/:path*",
    has: [{ type: "host", value: "es.purrify.ca" }],
    destination: "https://www.purrify.ca/:path*",
    permanent: true
  },
  // Fix double locale paths (e.g. /fr/fr/...)
  {
    source: "/fr/fr/:path*",
    destination: "/fr/:path*",
    permanent: true
  },

  // --- LOCALE REMOVAL (OPTIMIZED WITH TRAILING SLASHES) ---
  // These redirect removed locales AND add trailing slash in one hop
  {
    source: "/zh/:path*",
    destination: "/:path*/",  // Added trailing slash
    permanent: true
  },
  {
    source: "/es/:path*",
    destination: "/:path*/",  // Added trailing slash
    permanent: true
  },
  // English locale - redirect /en/blog/* to /blog/*
  {
    source: "/en/blog/:slug*",
    destination: "/blog/:slug*/",  // Added trailing slash
    permanent: true
  },
  // General /en/ removal
  {
    source: "/en/:path*",
    destination: "/:path*/",  // Added trailing slash
    permanent: true
  },

  // --- PATH RESTRUCTURE REDIRECTS (WITH TRAILING SLASHES) ---
  // Solutions pages moved to /learn/solutions/
  {
    source: "/solutions/ammonia-smell-cat-litter",
    destination: "/learn/solutions/ammonia-smell-cat-litter/",
    permanent: true
  },
  {
    source: "/solutions/apartment-cat-smell-solution",
    destination: "/learn/solutions/apartment-cat-smell-solution/",
    permanent: true
  },
  {
    source: "/solutions/litter-box-smell-elimination",
    destination: "/learn/solutions/litter-box-smell-elimination/",
    permanent: true
  },
  {
    source: "/solutions/multiple-cats-odor-control",
    destination: "/learn/solutions/multiple-cats-odor-control/",
    permanent: true
  },
  {
    source: "/solutions/natural-cat-litter-additive",
    destination: "/learn/solutions/natural-cat-litter-additive/",
    permanent: true
  },
  {
    source: "/solutions/senior-cat-litter-solutions",
    destination: "/learn/solutions/senior-cat-litter-solutions/",
    permanent: true
  },
  {
    source: "/solutions",
    destination: "/learn/",
    permanent: true
  },

  // --- FRENCH LOCALIZED SOLUTIONS REDIRECTS ---
  {
    source: "/:locale(fr)/solutions/ammonia-smell-cat-litter",
    destination: "/:locale/learn/solutions/ammonia-smell-cat-litter/",
    permanent: true
  },
  {
    source: "/:locale(fr)/solutions/apartment-cat-smell-solution",
    destination: "/:locale/learn/solutions/apartment-cat-smell-solution/",
    permanent: true
  },
  {
    source: "/:locale(fr)/solutions/litter-box-smell-elimination",
    destination: "/:locale/learn/solutions/litter-box-smell-elimination/",
    permanent: true
  },
  {
    source: "/:locale(fr)/solutions/multiple-cats-odor-control",
    destination: "/:locale/learn/solutions/multiple-cats-odor-control/",
    permanent: true
  },
  {
    source: "/:locale(fr)/solutions/natural-cat-litter-additive",
    destination: "/:locale/learn/solutions/natural-cat-litter-additive/",
    permanent: true
  },

  // --- BLOG TO LEARN REDIRECTS ---
  {
    source: "/blog/how-to-use-cat-litter-deodorizer",
    destination: "/learn/how-to-use-deodorizer/",
    permanent: true
  },
  {
    source: "/blog/how-to-use-cat-litter-deodorizer/",
    destination: "/learn/how-to-use-deodorizer/",
    permanent: true
  },
  {
    source: "/blog/how-it-works",
    destination: "/learn/how-it-works/",
    permanent: true
  },
  {
    source: "/blog/science",
    destination: "/learn/science/",
    permanent: true
  },
  {
    source: "/blog/faq",
    destination: "/learn/faq/",
    permanent: true
  },
  {
    source: "/blog/safety",
    destination: "/learn/safety/",
    permanent: true
  },
  {
    source: "/blog/using-purrify",
    destination: "/learn/how-to-use-deodorizer/",
    permanent: true
  },
  {
    source: "/blog/carbon-benefits",
    destination: "/learn/activated-carbon-benefits/",
    permanent: true
  },

  // --- FRENCH BLOG TO LEARN ---
  {
    source: "/:locale(fr)/blog/how-to-use-cat-litter-deodorizer",
    destination: "/:locale/learn/how-to-use-deodorizer/",
    permanent: true
  },
  {
    source: "/:locale(fr)/blog/how-it-works",
    destination: "/:locale/learn/how-it-works/",
    permanent: true
  },
  {
    source: "/:locale(fr)/blog/science",
    destination: "/:locale/learn/science/",
    permanent: true
  },

  // --- BLOG POST RENAMES ---
  {
    source: "/blog/purrify-vs-arm-hammer",
    destination: "/blog/activated-carbon-vs-baking-soda-comparison/",
    permanent: true
  },
  {
    source: "/blog/safe-for-kittens",
    destination: "/blog/using-deodorizers-with-kittens/",
    permanent: true
  },
  {
    source: "/blog/activated-carbon-science",
    destination: "/blog/activated-carbon-litter-additive-benefits/",
    permanent: true
  },
  {
    source: "/blog/beyond-masking-odors",
    destination: "/blog/most-powerful-odor-absorber/",
    permanent: true
  },
  {
    source: "/blog/fresh-home-multiple-cats",
    destination: "/blog/multi-cat-litter-deodorizer-guide/",
    permanent: true
  },

  // --- LEARN PAGE REDIRECTS ---
  {
    source: "/learn/purrify-vs-arm-hammer",
    destination: "/learn/activated-carbon-vs-baking-soda-deodorizers/",
    permanent: true
  },
  {
    source: "/learn/safe-for-kittens",
    destination: "/learn/using-deodorizers-with-kittens/",
    permanent: true
  },
  {
    source: "/learn/activated-carbon-vs-baking-soda",
    destination: "/learn/activated-carbon-vs-baking-soda-deodorizers/",
    permanent: true
  },

  // --- PRODUCT REDIRECTS ---
  {
    source: "/products/purrify-20g",
    destination: "/products/trial-size/",
    permanent: true
  },
  {
    source: "/products/purrify-50g",
    destination: "/products/",
    permanent: true
  },
  {
    source: "/products/purrify-120g",
    destination: "/products/",
    permanent: true
  },
  {
    source: "/products/medium-size",
    destination: "/products/",
    permanent: true
  },
  {
    source: "/products/large-size",
    destination: "/products/",
    permanent: true
  },
  {
    source: "/products/family",
    destination: "/products/",
    permanent: true
  },
  {
    source: "/products/trial",
    destination: "/products/trial-size/",
    permanent: true
  },
  {
    source: "/products/compare",
    destination: "/products/",
    permanent: true
  },

  // --- TRIAL REDIRECTS ---
  {
    source: "/trial",
    destination: "/products/trial-size/",
    permanent: true
  },
  {
    source: "/:locale(fr)/trial",
    destination: "/:locale/products/trial-size/",
    permanent: true
  },

  // --- STOCKISTS/STORES REDIRECTS ---
  {
    source: "/stockists",
    destination: "/stores/",
    permanent: true
  },
  {
    source: "/fr/stockists",
    destination: "/fr/stores/",
    permanent: true
  },
  {
    source: "/zh/stockists",
    destination: "/stores/",
    permanent: true
  },
  {
    source: "/es/stockists",
    destination: "/stores/",
    permanent: true
  },

  // --- LOCATION PROVINCE REDIRECTS ---
  {
    source: "/locations/ab{/}?",
    destination: "/locations/province/alberta/",
    permanent: true
  },
  {
    source: "/locations/bc{/}?",
    destination: "/locations/province/british-columbia/",
    permanent: true
  },
  {
    source: "/locations/mb{/}?",
    destination: "/locations/province/manitoba/",
    permanent: true
  },
  {
    source: "/locations/ns{/}?",
    destination: "/locations/province/nova-scotia/",
    permanent: true
  },
  {
    source: "/locations/on{/}?",
    destination: "/locations/province/ontario/",
    permanent: true
  },
  {
    source: "/locations/qc{/}?",
    destination: "/locations/province/quebec/",
    permanent: true
  },
  {
    source: "/locations/sk{/}?",
    destination: "/locations/province/saskatchewan/",
    permanent: true
  },
  // Provinces with no stores → redirect to /locations
  {
    source: "/locations/nb{/}?",
    destination: "/locations/",
    permanent: true
  },
  {
    source: "/locations/nl{/}?",
    destination: "/locations/",
    permanent: true
  },
  {
    source: "/locations/pe{/}?",
    destination: "/locations/",
    permanent: true
  },
  {
    source: "/locations/nt{/}?",
    destination: "/locations/",
    permanent: true
  },
  {
    source: "/locations/nu{/}?",
    destination: "/locations/",
    permanent: true
  },
  {
    source: "/locations/yt{/}?",
    destination: "/locations/",
    permanent: true
  },
  {
    source: "/locations/province/prince-edward-island{/}?",
    destination: "/locations/",
    permanent: true
  },
  {
    source: "/locations/province/northwest-territories{/}?",
    destination: "/locations/",
    permanent: true
  },
  {
    source: "/locations/province/nunavut{/}?",
    destination: "/locations/",
    permanent: true
  },
  {
    source: "/locations/province/yukon{/}?",
    destination: "/locations/",
    permanent: true
  },
  {
    source: "/locations/province/new-brunswick{/}?",
    destination: "/locations/",
    permanent: true
  },
  {
    source: "/locations/province/newfoundland-and-labrador{/}?",
    destination: "/locations/",
    permanent: true
  },

  // --- FRENCH LOCATION REDIRECTS ---
  {
    source: "/:locale(fr)/locations/province/prince-edward-island",
    destination: "/:locale/locations/",
    permanent: true
  },
  {
    source: "/:locale(fr)/locations/province/northwest-territories",
    destination: "/:locale/locations/",
    permanent: true
  },
  {
    source: "/:locale(fr)/locations/province/nunavut",
    destination: "/:locale/locations/",
    permanent: true
  },
  {
    source: "/:locale(fr)/locations/province/yukon",
    destination: "/:locale/locations/",
    permanent: true
  },
  {
    source: "/:locale(fr)/locations/province/new-brunswick",
    destination: "/:locale/locations/",
    permanent: true
  },
  {
    source: "/:locale(fr)/locations/province/newfoundland-and-labrador",
    destination: "/:locale/locations/",
    permanent: true
  },

  // --- SPANISH LOCATION REDIRECTS (to stores) ---
  {
    source: "/es/locations/:path*",
    destination: "/stores/",
    permanent: true
  },
  {
    source: "/es/opiniones",
    destination: "/products/",
    permanent: true
  },
  {
    source: "/es/reviews",
    destination: "/products/",
    permanent: true
  },

  // --- LEGACY PURR PATHS ---
  {
    source: "/purr/trial",
    destination: "/products/trial-size/",
    permanent: true
  },
  {
    source: "/purr/products",
    destination: "/products/",
    permanent: true
  },
  {
    source: "/purr/how-it-works",
    destination: "/learn/how-it-works/",
    permanent: true
  },
  {
    source: "/purr",
    destination: "/products/",
    permanent: true
  },
  {
    source: "/purrify-cat-litter-odor-eliminator-copy",
    destination: "/products/",
    permanent: true
  },

  // --- SHOP/CHECKOUT REDIRECTS ---
  {
    source: "/checkout",
    destination: "/products/",
    permanent: true
  },
  {
    source: "/checkout-2",
    destination: "/products/",
    permanent: true
  },
  {
    source: "/cart",
    destination: "/products/",
    permanent: true
  },
  {
    source: "/cart-2",
    destination: "/products/",
    permanent: true
  },
  {
    source: "/order",
    destination: "/customer/portal/",
    permanent: true
  },
  {
    source: "/orders",
    destination: "/customer/portal/",
    permanent: true
  },
  {
    source: "/account",
    destination: "/customer/portal/",
    permanent: true
  },
  {
    source: "/my-account",
    destination: "/customer/portal/",
    permanent: true
  },
  {
    source: "/my-account-2",
    destination: "/customer/portal/",
    permanent: true
  },
  {
    source: "/wishlist",
    destination: "/products/",
    permanent: true
  },
  {
    source: "/shop",
    destination: "/products/",
    permanent: true
  },
  {
    source: "/shopdsf",
    destination: "/products/",
    permanent: true
  },
  {
    source: "/store",
    destination: "/products/",
    permanent: true
  },
  {
    source: "/boutique",
    destination: "/products/",
    permanent: true
  },
  {
    source: "/tienda",
    destination: "/products/",
    permanent: true
  },
  {
    source: "/catalog",
    destination: "/products/",
    permanent: true
  },
  {
    source: "/pricing",
    destination: "/products/",
    permanent: true
  },
  {
    source: "/plans",
    destination: "/products/",
    permanent: true
  },
  {
    source: "/subscribe",
    destination: "/products/",
    permanent: true
  },
  {
    source: "/buy-now",
    destination: "/products/",
    permanent: true
  },
  {
    source: "/purchase",
    destination: "/products/",
    permanent: true
  },
  {
    source: "/order-now",
    destination: "/products/",
    permanent: true
  },
  {
    source: "/signup",
    destination: "/products/",
    permanent: true
  },
  {
    source: "/register",
    destination: "/products/",
    permanent: true
  },
  {
    source: "/:locale(fr)/checkout",
    destination: "/:locale/products/",
    permanent: true
  },

  // --- LOGIN/LOGOUT REDIRECTS ---
  {
    source: "/login",
    destination: "/admin/login/",
    permanent: false
  },
  {
    source: "/signin",
    destination: "/admin/login/",
    permanent: false
  },
  {
    source: "/auth/signin",
    destination: "/admin/login/",
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
    destination: "/affiliate/",
    permanent: false
  },

  // --- SUPPORT/CONTACT REDIRECTS ---
  {
    source: "/support/contact",
    destination: "/contact/",
    permanent: true
  },
  {
    source: "/contact-us",
    destination: "/contact/",
    permanent: true
  },
  {
    source: "/get-in-touch",
    destination: "/contact/",
    permanent: true
  },
  {
    source: "/faq",
    destination: "/support/",
    permanent: true
  },
  {
    source: "/help",
    destination: "/support/",
    permanent: true
  },
  {
    source: "/support-center",
    destination: "/support/",
    permanent: true
  },
  {
    source: "/help-center",
    destination: "/support/",
    permanent: true
  },
  {
    source: "/shipping",
    destination: "/support/shipping/",
    permanent: true
  },
  {
    source: "/returns",
    destination: "/support/",
    permanent: true
  },
  {
    source: "/guarantee",
    destination: "/support/",
    permanent: true
  },
  {
    source: "/unsubscribe",
    destination: "/support/",
    permanent: true
  },

  // --- ABOUT REDIRECTS ---
  {
    source: "/about",
    destination: "/about/our-story/",
    permanent: true
  },
  {
    source: "/company",
    destination: "/about/our-story/",
    permanent: true
  },
  {
    source: "/team",
    destination: "/about/our-story/",
    permanent: true
  },
  {
    source: "/mission",
    destination: "/about/our-story/",
    permanent: true
  },
  {
    source: "/our-story",
    destination: "/about/our-story/",
    permanent: true
  },

  // --- CUSTOMER REDIRECTS ---
  {
    source: "/customers",
    destination: "/case-studies/",
    permanent: true
  },
  {
    source: "/customers/case-studies",
    destination: "/case-studies/",
    permanent: true
  },
  {
    source: "/customers/testimonials",
    destination: "/reviews/",
    permanent: true
  },
  {
    source: "/reviews",
    destination: "/reviews/",
    permanent: true
  },
  {
    source: "/documents",
    destination: "/invest/",
    permanent: true
  },

  // --- STORE LOCATOR REDIRECTS ---
  {
    source: "/find-a-store",
    destination: "/stores/",
    permanent: true
  },
  {
    source: "/find-store",
    destination: "/stores/",
    permanent: true
  },
  {
    source: "/retail-locations",
    destination: "/stores/",
    permanent: true
  },
  {
    source: "/where-to-buy",
    destination: "/stores/",
    permanent: true
  },
  {
    source: "/store-locator",
    destination: "/stores/",
    permanent: true
  },
  {
    source: "/retailers",
    destination: "/stores/",
    permanent: true
  },

  // --- AFFILIATE REDIRECTS ---
  {
    source: "/affiliates",
    destination: "/affiliate/",
    permanent: true
  },
  {
    source: "/partner",
    destination: "/affiliate/",
    permanent: true
  },
  {
    source: "/partners",
    destination: "/affiliate/",
    permanent: true
  },

  // --- REFERRAL REDIRECTS ---
  {
    source: "/referral-program",
    destination: "/referral/",
    permanent: true
  },

  // --- GUIDES/RESOURCES REDIRECTS ---
  {
    source: "/guides/:path*",
    destination: "/learn/:path*/",
    permanent: true
  },
  {
    source: "/education/:path*",
    destination: "/learn/:path*/",
    permanent: true
  },
  {
    source: "/resources/:path*",
    destination: "/learn/:path*/",
    permanent: true
  },
  {
    source: "/info",
    destination: "/learn/",
    permanent: true
  },

  // --- BLOG TO LEARN SOLUTIONS ---
  {
    source: "/blog/litter-box-odor-control",
    destination: "/learn/solutions/litter-box-smell-elimination/",
    permanent: true
  },
  {
    source: "/blog/natural-odor-control",
    destination: "/learn/solutions/natural-cat-litter-additive/",
    permanent: true
  },
  {
    source: "/blog/ammonia-smell-solutions",
    destination: "/learn/solutions/ammonia-smell-cat-litter/",
    permanent: true
  },
  {
    source: "/blog/apartment-cat-owners",
    destination: "/learn/solutions/apartment-cat-smell-solution/",
    permanent: true
  },
  {
    source: "/blog/multi-cat-solutions",
    destination: "/learn/solutions/multiple-cats-odor-control/",
    permanent: true
  },
  {
    source: "/blog/senior-cat-care",
    destination: "/learn/solutions/senior-cat-litter-solutions/",
    permanent: true
  },
  {
    source: "/blog/how-to-eliminate-cat-litter-odor",
    destination: "/learn/solutions/litter-box-smell-elimination/",
    permanent: true
  },
  {
    source: "/blog/how-to-neutralize-ammonia-cat-litter",
    destination: "/learn/solutions/how-to-neutralize-ammonia-cat-litter/",
    permanent: true
  },
  // --- LEGACY BLOG POSTS ---
  {
    source: "/blog/how-to-use-cat-litter-deodorizer/",
    destination: "/learn/how-to-use-deodorizer/",
    permanent: true
  },

  // --- TERMS/PRIVACY REDIRECTS ---
  {
    source: "/tos",
    destination: "/terms/",
    permanent: true
  },
  {
    source: "/terms-of-service",
    destination: "/terms/",
    permanent: true
  },
  {
    source: "/terms-and-conditions",
    destination: "/terms/",
    permanent: true
  },
  {
    source: "/legal",
    destination: "/terms/",
    permanent: true
  },
  {
    source: "/privacy",
    destination: "/privacy-policy/",
    permanent: true
  },

  // --- FEED/RSS REDIRECTS ---
  {
    source: "/comments/feed",
    destination: "/blog/",
    permanent: true
  },
  {
    source: "/feed",
    destination: "/blog/",
    permanent: true
  },
  {
    source: "/rss.xml",
    destination: "/blog/",
    permanent: true
  },
  {
    source: "/feed.xml",
    destination: "/blog/",
    permanent: true
  },
  {
    source: "/atom.xml",
    destination: "/blog/",
    permanent: true
  },
  {
    source: "/sitemap_index.xml",
    destination: "/sitemap.xml",
    permanent: true
  },

  // --- WORDPRESS/SECURITY REDIRECTS ---
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
    destination: "/products/",
    permanent: true
  },
  {
    source: "/tag/:path*",
    destination: "/products/",
    permanent: true
  },
  {
    source: "/collections/:path*",
    destination: "/products/",
    permanent: true
  },
  {
    source: "/collections",
    destination: "/products/",
    permanent: true
  },
  {
    source: "/brands/:path*",
    destination: "/products/",
    permanent: true
  },
  {
    source: "/brand/:path*",
    destination: "/products/",
    permanent: true
  },
  {
    source: "/product/:path*",
    destination: "/products/:path*/",
    permanent: true
  },
  {
    source: "/shop/:path*",
    destination: "/products/:path*/",
    permanent: true
  },
  {
    source: "/store/:path*",
    destination: "/products/:path*/",
    permanent: true
  },
  {
    source: "/producto/:path*",
    destination: "/products/:path*/",
    permanent: true
  },
  {
    source: "/produit/:path*",
    destination: "/products/:path*/",
    permanent: true
  },
  {
    source: "/www.",
    destination: "/",
    permanent: true
  },

  // --- FRENCH ABOUT REDIRECTS ---
  {
    source: "/:locale(fr)/about/",
    destination: "/:locale/about/our-story/",
    permanent: true
  },
  {
    source: "/:locale(fr)/about",
    destination: "/:locale/about/our-story/",
    permanent: true
  },
  {
    source: "/:locale(fr)/contact-us",
    destination: "/:locale/contact/",
    permanent: true
  },

  // --- DEMO/TEST REDIRECTS ---
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

  // --- DOUBLE SLASH FIX ---
  {
    source: "//(.*)",
    destination: "/$1",
    permanent: true
  },

  // --- SPECIFIC FIXES ---
  {
    source: "/_ignore_locations/:path*",
    destination: "/stores/",
    permanent: true
  },
  {
    source: "/:locale(fr)/blog/how-to-use-cat-litter-deodorizer",
    destination: "/:locale/learn/how-to-use-deodorizer/",
    permanent: true
  },

  // --- INVALID LOCATION REDIRECTS (OPTIMIZED) ---
  // These redirect to /stores/ with trailing slash
  {
    source: "/fr/locations/lake-louise{/}?",
    destination: "/fr/stores/",
    permanent: true
  },
  {
    source: "/locations/lake-louise{/}?",
    destination: "/stores/",
    permanent: true
  },
  {
    source: "/fr/locations/medicine-hat{/}?",
    destination: "/fr/stores/",
    permanent: true
  },
  {
    source: "/locations/medicine-hat{/}?",
    destination: "/stores/",
    permanent: true
  },
  {
    source: "/fr/locations/tuktoyaktuk{/}?",
    destination: "/fr/stores/",
    permanent: true
  },
  {
    source: "/locations/tuktoyaktuk{/}?",
    destination: "/stores/",
    permanent: true
  },
  {
    source: "/fr/locations/kimberley{/}?",
    destination: "/fr/stores/",
    permanent: true
  },
  {
    source: "/locations/kimberley{/}?",
    destination: "/stores/",
    permanent: true
  },
  {
    source: "/fr/locations/saguenay{/}?",
    destination: "/fr/stores/",
    permanent: true
  },
  {
    source: "/locations/saguenay{/}?",
    destination: "/stores/",
    permanent: true
  },
  {
    source: "/fr/locations/victoria{/}?",
    destination: "/fr/stores/",
    permanent: true
  },
  {
    source: "/locations/victoria{/}?",
    destination: "/stores/",
    permanent: true
  },
  {
    source: "/fr/locations/swan-river{/}?",
    destination: "/fr/stores/",
    permanent: true
  },
  {
    source: "/locations/swan-river{/}?",
    destination: "/stores/",
    permanent: true
  },
  {
    source: "/fr/locations/port-hawkesbury{/}?",
    destination: "/fr/stores/",
    permanent: true
  },
  {
    source: "/locations/port-hawkesbury{/}?",
    destination: "/stores/",
    permanent: true
  },
  {
    source: "/fr/locations/fredericton{/}?",
    destination: "/fr/stores/",
    permanent: true
  },
  {
    source: "/locations/fredericton{/}?",
    destination: "/stores/",
    permanent: true
  },
  {
    source: "/fr/locations/wabana{/}?",
    destination: "/fr/stores/",
    permanent: true
  },
  {
    source: "/locations/wabana{/}?",
    destination: "/stores/",
    permanent: true
  },
  {
    source: "/fr/locations/st-johns{/}?",
    destination: "/fr/stores/",
    permanent: true
  },
  {
    source: "/locations/st-johns{/}?",
    destination: "/stores/",
    permanent: true
  },
  {
    source: "/fr/locations/penticton{/}?",
    destination: "/fr/stores/",
    permanent: true
  },
  {
    source: "/locations/penticton{/}?",
    destination: "/stores/",
    permanent: true
  },
  {
    source: "/fr/locations/labrador-city{/}?",
    destination: "/fr/stores/",
    permanent: true
  },
  {
    source: "/locations/labrador-city{/}?",
    destination: "/stores/",
    permanent: true
  },
  {
    source: "/fr/locations/sainte-anne-de-beaupre{/}?",
    destination: "/fr/stores/",
    permanent: true
  },
  {
    source: "/locations/sainte-anne-de-beaupre{/}?",
    destination: "/stores/",
    permanent: true
  },
  {
    source: "/fr/locations/grand-fallswindsor{/}?",
    destination: "/fr/stores/",
    permanent: true
  },
  {
    source: "/locations/grand-fallswindsor{/}?",
    destination: "/stores/",
    permanent: true
  },
  {
    source: "/fr/locations/campbell-river{/}?",
    destination: "/fr/stores/",
    permanent: true
  },
  {
    source: "/locations/campbell-river{/}?",
    destination: "/stores/",
    permanent: true
  },
  {
    source: "/fr/locations/inuvik{/}?",
    destination: "/fr/stores/",
    permanent: true
  },
  {
    source: "/locations/inuvik{/}?",
    destination: "/stores/",
    permanent: true
  },
  {
    source: "/fr/locations/glace-bay{/}?",
    destination: "/fr/stores/",
    permanent: true
  },
  {
    source: "/locations/glace-bay{/}?",
    destination: "/stores/",
    permanent: true
  },
  {
    source: "/fr/locations/chilliwack{/}?",
    destination: "/fr/stores/",
    permanent: true
  },
  {
    source: "/locations/chilliwack{/}?",
    destination: "/stores/",
    permanent: true
  },
  {
    source: "/:locale(fr)/locations/revelstoke",
    destination: "/:locale/stores/",
    permanent: true
  },
  {
    source: "/fr/locations/fort-smith{/}?",
    destination: "/fr/stores/",
    permanent: true
  },
  {
    source: "/locations/fort-smith{/}?",
    destination: "/stores/",
    permanent: true
  },
  {
    source: "/fr/locations/saint-albert{/}?",
    destination: "/fr/stores/",
    permanent: true
  },
  {
    source: "/locations/saint-albert{/}?",
    destination: "/stores/",
    permanent: true
  },
  {
    source: "/fr/locations/saint-anthony{/}?",
    destination: "/fr/stores/",
    permanent: true
  },
  {
    source: "/locations/saint-anthony{/}?",
    destination: "/stores/",
    permanent: true
  },
  {
    source: "/fr/locations/saint-john{/}?",
    destination: "/fr/stores/",
    permanent: true
  },
  {
    source: "/locations/saint-john{/}?",
    destination: "/stores/",
    permanent: true
  },
  {
    source: "/fr/locations/happy-valleygoose-bay{/}?",
    destination: "/fr/stores/",
    permanent: true
  },
  {
    source: "/locations/happy-valleygoose-bay{/}?",
    destination: "/stores/",
    permanent: true
  },
  {
    source: "/fr/locations/churchill{/}?",
    destination: "/fr/stores/",
    permanent: true
  },
  {
    source: "/locations/churchill{/}?",
    destination: "/stores/",
    permanent: true
  },
  {
    source: "/fr/locations/pictou{/}?",
    destination: "/fr/stores/",
    permanent: true
  },
  {
    source: "/locations/pictou{/}?",
    destination: "/stores/",
    permanent: true
  },
  {
    source: "/fr/locations/sainte-therese{/}?",
    destination: "/fr/stores/",
    permanent: true
  },
  {
    source: "/locations/sainte-therese{/}?",
    destination: "/stores/",
    permanent: true
  },
  {
    source: "/fr/locations/iroquois-falls{/}?",
    destination: "/fr/stores/",
    permanent: true
  },
  {
    source: "/locations/iroquois-falls{/}?",
    destination: "/stores/",
    permanent: true
  },
  {
    source: "/fr/locations/bathurst{/}?",
    destination: "/fr/stores/",
    permanent: true
  },
  {
    source: "/locations/bathurst{/}?",
    destination: "/stores/",
    permanent: true
  },
  {
    source: "/fr/locations/fort-saint-john{/}?",
    destination: "/fr/stores/",
    permanent: true
  },
  {
    source: "/locations/fort-saint-john{/}?",
    destination: "/stores/",
    permanent: true
  },
  {
    source: "/fr/locations/esquimalt{/}?",
    destination: "/fr/stores/",
    permanent: true
  },
  {
    source: "/locations/esquimalt{/}?",
    destination: "/stores/",
    permanent: true
  },
  {
    source: "/fr/locations/hope{/}?",
    destination: "/fr/stores/",
    permanent: true
  },
  {
    source: "/locations/hope{/}?",
    destination: "/stores/",
    permanent: true
  },
  {
    source: "/fr/locations/iqaluit{/}?",
    destination: "/fr/stores/",
    permanent: true
  },
  {
    source: "/locations/iqaluit{/}?",
    destination: "/stores/",
    permanent: true
  },
  {
    source: "/fr/locations/sarnia-clearwater{/}?",
    destination: "/fr/stores/",
    permanent: true
  },
  {
    source: "/locations/sarnia-clearwater{/}?",
    destination: "/stores/",
    permanent: true
  },
  {
    source: "/fr/locations/delta{/}?",
    destination: "/fr/stores/",
    permanent: true
  },
  {
    source: "/locations/delta{/}?",
    destination: "/stores/",
    permanent: true
  },
  {
    source: "/fr/locations/dauphin{/}?",
    destination: "/fr/stores/",
    permanent: true
  },
  {
    source: "/locations/dauphin{/}?",
    destination: "/stores/",
    permanent: true
  },
  {
    source: "/fr/locations/corner-brook{/}?",
    destination: "/fr/stores/",
    permanent: true
  },
  {
    source: "/locations/corner-brook{/}?",
    destination: "/stores/",
    permanent: true
  },
  {
    source: "/fr/locations/powell-river{/}?",
    destination: "/fr/stores/",
    permanent: true
  },
  {
    source: "/locations/powell-river{/}?",
    destination: "/stores/",
    permanent: true
  },
  {
    source: "/fr/locations/yellowknife{/}?",
    destination: "/fr/stores/",
    permanent: true
  },
  {
    source: "/locations/yellowknife{/}?",
    destination: "/stores/",
    permanent: true
  },
  {
    source: "/fr/locations/thompson{/}?",
    destination: "/fr/stores/",
    permanent: true
  },
  {
    source: "/locations/thompson{/}?",
    destination: "/stores/",
    permanent: true
  },
  {
    source: "/fr/locations/caraquet{/}?",
    destination: "/fr/stores/",
    permanent: true
  },
  {
    source: "/locations/caraquet{/}?",
    destination: "/stores/",
    permanent: true
  },
  {
    source: "/fr/locations/ferryland{/}?",
    destination: "/fr/stores/",
    permanent: true
  },
  {
    source: "/locations/ferryland{/}?",
    destination: "/stores/",
    permanent: true
  },
  {
    source: "/fr/locations/saint-boniface{/}?",
    destination: "/fr/stores/",
    permanent: true
  },
  {
    source: "/locations/saint-boniface{/}?",
    destination: "/stores/",
    permanent: true
  },
  {
    source: "/fr/locations/kirkland-lake{/}?",
    destination: "/fr/stores/",
    permanent: true
  },
  {
    source: "/locations/kirkland-lake{/}?",
    destination: "/stores/",
    permanent: true
  },
  {
    source: "/fr/locations/vernon{/}?",
    destination: "/fr/stores/",
    permanent: true
  },
  {
    source: "/locations/vernon{/}?",
    destination: "/stores/",
    permanent: true
  },
  {
    source: "/fr/locations/mb{/}?",
    destination: "/fr/stores/",
    permanent: true
  },
  {
    source: "/locations/mb{/}?",
    destination: "/stores/",
    permanent: true
  },
  {
    source: "/fr/locations/prince-rupert{/}?",
    destination: "/fr/stores/",
    permanent: true
  },
  {
    source: "/locations/prince-rupert{/}?",
    destination: "/stores/",
    permanent: true
  },
  {
    source: "/fr/locations/saint-eustache{/}?",
    destination: "/fr/stores/",
    permanent: true
  },
  {
    source: "/locations/saint-eustache{/}?",
    destination: "/stores/",
    permanent: true
  },
  {
    source: "/fr/locations/waskaganish{/}?",
    destination: "/fr/stores/",
    permanent: true
  },
  {
    source: "/locations/waskaganish{/}?",
    destination: "/stores/",
    permanent: true
  },
  {
    source: "/fr/locations/kamloops{/}?",
    destination: "/fr/stores/",
    permanent: true
  },
  {
    source: "/locations/kamloops{/}?",
    destination: "/stores/",
    permanent: true
  },
  {
    source: "/fr/locations/brandon{/}?",
    destination: "/fr/stores/",
    permanent: true
  },
  {
    source: "/locations/brandon{/}?",
    destination: "/stores/",
    permanent: true
  },
  {
    source: "/fr/locations/nanaimo{/}?",
    destination: "/fr/stores/",
    permanent: true
  },
  {
    source: "/locations/nanaimo{/}?",
    destination: "/stores/",
    permanent: true
  },
  {
    source: "/fr/locations/moncton{/}?",
    destination: "/fr/stores/",
    permanent: true
  },
  {
    source: "/locations/moncton{/}?",
    destination: "/stores/",
    permanent: true
  },
  {
    source: "/fr/locations/brantford{/}?",
    destination: "/fr/stores/",
    permanent: true
  },
  {
    source: "/locations/brantford{/}?",
    destination: "/stores/",
    permanent: true
  },
  {
    source: "/fr/locations/chatham-kent{/}?",
    destination: "/fr/stores/",
    permanent: true
  },
  {
    source: "/locations/chatham-kent{/}?",
    destination: "/stores/",
    permanent: true
  },
  {
    source: "/fr/locations/digby{/}?",
    destination: "/fr/stores/",
    permanent: true
  },
  {
    source: "/locations/digby{/}?",
    destination: "/stores/",
    permanent: true
  },
  {
    source: "/fr/locations/west-vancouver{/}?",
    destination: "/fr/stores/",
    permanent: true
  },
  {
    source: "/locations/west-vancouver{/}?",
    destination: "/stores/",
    permanent: true
  },
  {
    source: "/fr/locations/white-rock{/}?",
    destination: "/fr/stores/",
    permanent: true
  },
  {
    source: "/locations/white-rock{/}?",
    destination: "/stores/",
    permanent: true
  },

  // --- ANSWER REDIRECTS ---
  {
    source: "/learn/answers/how-to-control-cat-litter-odor",
    destination: "/learn/answers/how-to-eliminate-cat-litter-odor/",
    permanent: true
  },
  {
    source: "/learn/answers/how-to-reduce-cat-litter-odor",
    destination: "/learn/answers/how-to-eliminate-cat-litter-odor/",
    permanent: true
  },
  {
    source: "/learn/answers/how-to-stop-cat-litter-odor",
    destination: "/learn/answers/how-to-eliminate-cat-litter-odor/",
    permanent: true
  },
  {
    source: "/learn/answers/how-to-prevent-cat-litter-smell",
    destination: "/learn/answers/how-to-eliminate-cat-litter-odor/",
    permanent: true
  },
  {
    source: "/learn/answers/how-to-remove-cat-litter-smell-from-room",
    destination: "/learn/answers/how-to-keep-litter-box-from-smelling/",
    permanent: true
  },
  {
    source: "/learn/answers/how-to-get-cat-litter-smell-out-of-house",
    destination: "/learn/answers/how-do-i-keep-my-house-from-smelling-like-cat-litter/",
    permanent: true
  },
  {
    source: "/learn/answers/what-neutralizes-cat-litter-smell",
    destination: "/learn/answers/what-eliminates-cat-litter-odor/",
    permanent: true
  },
  {
    source: "/learn/answers/what-cat-litter-smells-the-best",
    destination: "/learn/answers/what-cat-litter-controls-odor-best/",
    permanent: true
  },
  {
    source: "/learn/answers/which-cat-litter-controls-odor-the-best",
    destination: "/learn/answers/what-cat-litter-controls-odor-best/",
    permanent: true
  },
  {
    source: "/learn/answers/which-cat-litter-has-the-best-odor-control",
    destination: "/learn/answers/what-cat-litter-controls-odor-best/",
    permanent: true
  },
  {
    source: "/learn/answers/which-cat-litter-smells-the-best",
    destination: "/learn/answers/what-cat-litter-controls-odor-best/",
    permanent: true
  },
  {
    source: "/learn/answers/does-cat-litter-smell-like-ammonia",
    destination: "/learn/answers/why-does-my-house-smell-like-cat-pee/",
    permanent: true
  },
  {
    source: "/learn/answers/why-does-cat-litter-smell-like-ammonia",
    destination: "/learn/answers/why-does-my-house-smell-like-cat-pee/",
    permanent: true
  },
  {
    source: "/learn/answers/why-does-cat-litter-smell-so-bad",
    destination: "/learn/answers/how-do-i-stop-my-cat-litter-from-smelling/",
    permanent: true
  },
  {
    source: "/learn/answers/is-cat-litter-smell-toxic",
    destination: "/learn/cat-litter-ammonia-health-risks/",
    permanent: true
  },
  {
    source: "/learn/answers/is-cat-litter-smell-bad-for-you",
    destination: "/learn/cat-litter-ammonia-health-risks/",
    permanent: true
  },
  {
    source: "/learn/answers/can-cat-litter-smell-make-you-sick",
    destination: "/learn/cat-litter-ammonia-health-risks/",
    permanent: true
  },
  {
    source: "/learn/answers/can-i-use-essential-oils-in-cat-litter",
    destination: "/learn/safety/",
    permanent: true
  },
  {
    source: "/learn/answers/how-to-get-rid-of-cat-odor-in-small-space",
    destination: "/learn/solutions/apartment-cat-smell-solution/",
    permanent: true
  },

  // --- FRENCH BLOG RENAMES ---
  {
    source: "/:locale(fr)/blog/activated-carbon-science",
    destination: "/:locale/blog/activated-carbon-litter-additive-benefits/",
    permanent: true
  },
  {
    source: "/:locale(fr)/blog/fresh-home-multiple-cats",
    destination: "/:locale/blog/multi-cat-litter-deodorizer-guide/",
    permanent: true
  },
  {
    source: "/:locale(fr)/blog/beyond-masking-odors",
    destination: "/:locale/blog/most-powerful-odor-absorber/",
    permanent: true
  },

  // --- FREE/OTHER REDIRECTS ---
  {
    source: "/free",
    destination: "/free/",
    permanent: true
  },

  // --- MONTREAL REDIRECT ---
  {
    source: "/montreal",
    destination: "/fr/montreal/",
    permanent: true
  },

  // --- LEGACY WORDPRESS QUERY PARAM REDIRECTS ---
  { source: "/", has: [{ type: "query", key: "p", value: "138" }], destination: "/blog/", permanent: true },
  { source: "/", has: [{ type: "query", key: "p", value: "137" }], destination: "/blog/", permanent: true },
  { source: "/", has: [{ type: "query", key: "p", value: "130" }], destination: "/blog/", permanent: true },
  { source: "/", has: [{ type: "query", key: "p", value: "131" }], destination: "/blog/", permanent: true },
  { source: "/", has: [{ type: "query", key: "p", value: "132" }], destination: "/blog/", permanent: true },
  { source: "/", has: [{ type: "query", key: "p", value: "134" }], destination: "/blog/", permanent: true },
];

module.exports = { REDIRECTS };
