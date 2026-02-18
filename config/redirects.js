/** @type {import('next').Redirect[]} */
const REDIRECTS = [

  // --- DOMAIN & PROTOCOL NORMALIZATION ---
  // Redirect non-www to www
  {
    source: "/:path*",
    has: [{ type: "host", value: "purrify.ca" }],
    destination: "https://www.purrify.ca/:path*",
    permanent: true
  },
  // Redirect HTTP to HTTPS
  {
    source: "/:path*",
    has: [{ type: "header", key: "x-forwarded-proto", value: "http" }],
    destination: "https://www.purrify.ca/:path*",
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
    destination: "/stores/",
    permanent: true
  },
  {
    source: "/:locale(fr)/blog/how-to-use-cat-litter-deodorizer",
    destination: "/:locale/learn/how-to-use-deodorizer/",
    permanent: true
  },
  {
    source: "/:locale(zh|es)/blog/how-to-use-cat-litter-deodorizer",
    destination: "/learn/how-to-use-deodorizer/",
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
    source: "/:locale(fr)/locations/revelstoke",
    destination: "/:locale/stores/",
    permanent: true
  },
  {
    source: "/:locale(zh|es)/locations/revelstoke",
    destination: "/stores/",
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

  // Catchall for removed locales
  {
    source: "/zh/:path*",
    destination: "/:path*",
    permanent: true
  },
  {
    source: "/es/:path*",
    destination: "/:path*",
    permanent: true
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
    destination: "/products/",
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
  // Redirect /en/blog/* to canonical /blog/* (English is default, no locale prefix needed)
  {
    source: "/en/blog/:slug*",
    destination: "/blog/:slug*",
    permanent: true
  },
  // Trailing slash normalization for blog posts (without /en/ prefix)
  {
    source: "/blog/:slug",
    destination: "/blog/:slug/",
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
    source: "/:locale(fr)/about/",
    destination: "/:locale/about/our-story/",
    permanent: true
  },
  {
    source: "/:locale(zh|es)/about/",
    destination: "/about/our-story/",
    permanent: true
  },
  {
    source: "/:locale(fr)/about",
    destination: "/:locale/about/our-story",
    permanent: true
  },
  {
    source: "/:locale(zh|es)/about",
    destination: "/about/our-story",
    permanent: true
  },
  {
    source: "/:locale(fr)/contact-us",
    destination: "/:locale/contact",
    permanent: true
  },
  {
    source: "/:locale(zh|es)/contact-us",
    destination: "/contact",
    permanent: true
  },
  {
    source: "/demo/:path*",
    destination: "/",
    permanent: false
  },
  // ============================================================
  // CATCH-ALL REDIRECTS (Must be last)
  // ============================================================
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
  // Legacy WordPress query param redirects
  { source: "/", has: [{ type: "query", key: "p", value: "138" }], destination: "/blog", permanent: true },
  { source: "/", has: [{ type: "query", key: "p", value: "137" }], destination: "/blog", permanent: true },
  { source: "/", has: [{ type: "query", key: "p", value: "130" }], destination: "/blog", permanent: true },
  { source: "/", has: [{ type: "query", key: "p", value: "131" }], destination: "/blog", permanent: true },
  { source: "/", has: [{ type: "query", key: "p", value: "132" }], destination: "/blog", permanent: true },
  { source: "/", has: [{ type: "query", key: "p", value: "134" }], destination: "/blog", permanent: true },
];

module.exports = { REDIRECTS };
