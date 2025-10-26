import { FEATURE_DESCRIPTIONS } from './common';
import { CONTACT_INFO } from '../lib/constants';

export const en = {
  // Common
  siteName: "Purrify",
  siteDescription: "Stop being embarrassed by cat litter smell! Water-filter grade activated carbon eliminates ammonia odor instantly. No more stinky litter box - guests will think you don't have cats.",
  
  // Navigation
  nav: {
    home: "Home",
    products: "Products",
    learn: "Learn",
    howItWorks: "How It Works",
    about: "About",
    whyPurrify: "Why Purrify",
    tryFree: "Try Free Trial",
    testimonials: "Testimonials",
    leaveReview: "Leave a Review",
    contact: "Contact",
    blog: "Blog",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    // Dropdown items
    trialSize: "12g Trial Size",
    compareSizes: "Compare Sizes", 
    viewAllProducts: "View All Products",
    howItWorksPage: "How It Works",
    faq: "FAQ",
    science: "Science",
    buyNow: "Buy Now!",
    retailers: "For Retailers",
    wholesalePricing: "Wholesale Pricing",
    becomePartner: "Become a Partner",
    marketingSupport: "Marketing Support"
  },

  locationsMenu: {
    selectProvince: "Select a Province",
    hoverPrompt: "Hover a province to view cities.",
    provinceCitiesHeading: "{{province}} Cities",
    viewProvinceGuide: "View the {{province}} province guide"
  },
  seoKeywords: {
    headTerms: [
      'cat litter smell',
      'cat litter odor',
      'cat litter odour',
      'cat litter smell removal',
      'best cat litter for smell',
      'cat litter deodorizer'
    ],
    symptomVariants: [
      'strong ammonia litter smell',
      'litter box smells in apartment',
      'why does my litter box smell so bad',
      'cat litter smell embarrassing guests'
    ],
    solutionVariants: [
      'natural cat litter odor eliminator',
      'activated carbon litter additive',
      'cat litter deodorizer without perfume',
      'how to neutralize cat litter smell fast'
    ],
    modifiers: {
      housing: ['condo', 'apartment', 'basement', 'multi-cat home'],
      seasonal: ['winter windows closed', 'humid summer', 'Canadian winter air', 'rainy season ventilation'],
      retailer: ['PetSmart', 'Pet Valu', 'Global Pet Foods', 'Bosleys', 'Ren\'s Pets']
    }
  },
  
  // Products
  products: {
    "purrify-12g": {
      name: "Purrify 12g Trial",
      description: "Skeptical? Try This First!\nJust $4.99 to prove your litter box can smell fresh. See results in 24 hours. Perfect 'try before you buy' size."
    },
    "purrify-50g": {
      name: "Purrify 50g Standard",
      description: "Single Cat Fresh Air Solution\n🏆 Most Popular! One month of odor-free bliss for one cat. Stop dreading litter box duty - start enjoying fresh air again."
    },
    "purrify-120g": {
      name: "Purrify Regular size 120g",
      description: "Multiple Cats? Maximum Power!\nFor homes with 2+ cats. Double-strength formula eliminates even the strongest multi-cat ammonia smell. Your guests will be amazed."
    }
  },

  pricing: {
    oneTimeLabel: "One-time purchase",
    autoshipLabel: "Autoship & Save",
    autoshipBestLabel: "Best Value Autoship",
    billedEvery: "Billed every",
    months: "months",
    shippingIncluded: "Shipping included",
    freeShipping: "Free shipping included",
    plusShipping: "+ shipping",
    shippingCalculated: "Shipping calculated at checkout",
    startAutoship: "Start Autoship",
    buyNow: "Buy Now",
    linkComingSoon: "Payment link coming soon",
    recommended: "Most recommended",
    perMonth: "≈ {price}/month",
    saveVsOneTime: "Save {percent}% vs one-time"
  },

  // Hero Section
  hero: {
    catLitter: "Cat Litter Odor Eliminator",
    rabbitLitter: "Rabbit Litter Deodorizer",
    fridgeSmells: "Fridge Odor Control",
    ferretCage: "Ferret Cage Smell Killer",
    eliminateCatOdors: "What NASA Discovered About Eliminating Odors (And Why Cat Owners Care)",
    instantly: "",
    description: "This activated coconut uses molecular trapping technology—the same principle NASA developed for cleaning air to breathe in space. One sprinkle eliminates litter box odor for 7 full days. Your guests will ask \"You have cats?\" with genuine surprise.",
    socialProof: {
      trustNumber: "1,000+",
      trustText: "cat parents say goodbye to litter box smell",
      ratingText: "4.8/5 stars - 'My apartment doesn't stink anymore!'"
    },
    buttons: {
      shopNow: "Stop The Stink - Try Risk-Free $24.95",
      reviews: "⚗️ Proof It Works",
      learnMore: "How It Kills Odor"
    },
    ariaLabels: {
      shopNow: "Shop Purrify products now",
      reviews: "Read 138+ customer reviews",
      playVideo: "Play demonstration video showing Purrify eliminating cat litter odors"
    },
    dualPath: {
      consumer: {
        title: "For Your Cat",
        description: "Individual cat owners - instant checkout, direct delivery",
        cta: "Buy Now for Your Cat"
      },
      retailer: {
        title: "Pet Stores & Retailers",
        description: "Wholesale pricing, bulk orders, marketing support",
        cta: "Wholesale Portal"
      }
    }
  },
  
  // Features
  features: {
    odorElimination: {
      title: "Locks Away Ammonia Smell",
      description: "***Air-and-water-filter grade activated carbon*** doesn't just mask odors - it locks away ammonia molecules at the source. Your nose will thank you!"
    },
    catFriendly: {
      title: "Used in Water & Air Filters Worldwide",
      description: "Natural coconut carbon with zero chemicals, fragrances, or dyes.\n\nThe same type used in water and air filters around the world, powerful enough for multiple cats."
    },
    longLastingFreshness: {
      title: "7 Days of Fresh Air Guaranteed",
      description: "One sprinkle = a full week without that embarrassing litter box smell. Stop constantly cleaning - start breathing easy."
    },
    worksWithAnyLitter: {
      title: "Made with Sustainable Coconuts",
      description: "Pure coconut shells are activated with high pressure and steam to open millions of holes and tunnels to lock away odor."
    },
    costEffective: {
      title: "Saves Money on Litter",
      description: "Extends litter life by preventing odor buildup. Use less, change less often, breathe easier. Your wallet will love it too."
    },
    freePurrify: {
      title: "Free Purrify",
      description: "Get a free Purrify sample with your first order."
    },
    beforeAfter: {
      title: "Before & After",
      description: "See the difference Purrify makes in your cat's litter box."
    }
  },
  
  // How It Works
  howItWorks: {
    simpleAs123: "Fresh Air in 60 Seconds - Simple as 1-2-3",
    steps: [
      {
        number: "01",
        title: "Open & Pour",
        description: "Tear open the bag - your nose will immediately notice the difference! No assembly, no complicated instructions."
      },
      {
        number: "02",
        title: "Sprinkle the Magic",
        description: "Just sprinkle a thin layer on top of clean litter. Works with ANY brand - clay, crystal, clumping, you name it."
      },
      {
        number: "03",
        title: "Mix It In & Breathe Easy!",
        description: "Gently mix and watch (smell?) the magic happen. 7 days of fresh air starts NOW. Your guests will be amazed."
      }
    ],
    litterTypes: {
      clumping: "CLUMPING",
      crystal: "CRYSTAL",
      natural: "NATURAL",
      clay: "CLAY",
      nonClumping: "NON-CLUMPING"
    }
  },
  
  // Products Section
  productsSection: {
    forEveryCatHousehold: "FOR EVERY CAT HOUSEHOLD",
    pickYourPowerLevel: "PICK YOUR PURRIFY POWER LEVEL",
    subtitle: "Whether you have one kitten or multiple cats, we have the ideal Purrify size for your home.",
    powerLevels: {
      kittenPower: "Kitten Power",
      standardPower: "Standard Power",
      maximumPower: "Maximum Power"
    },
    mostPopular: "MOST POPULAR",
    addToCart: "Add to Cart",
    buyNow: "Buy Now",
    adding: "Adding...",
    viewAllProducts: "VIEW ALL PRODUCTS"
  },
  
  // Stores Section
  storesSection: {
    availableInStores: "AVAILABLE IN STORES",
    soldInFollowingStores: "SOLD IN THE FOLLOWING STORES",
    subtitle: "Find Purrify at your favorite pet stores across Canada. Visit any of these locations to purchase our premium cat litter additive.",
    requestStoreAvailability: "Request Store Availability",
    dontSeeLocalStore: "Don't see your local store? Contact us to request Purrify at your favorite pet store!",
    callStore: "Call Store",
    storeDescriptions: {
      completePetCareAndSupplies: "Complete pet care and supplies",
      premiumPetBoutique: "Premium pet boutique", 
      familyOwnedPetStore: "Family-owned pet store",
      globalPetFoodsLocation: "Global Pet Foods location",
      premiumPetProductsAndSupplies: "Premium pet products & supplies",
      fullServicePetStore: "Full-service pet store",
      petStoreWithGroomingServices: "Pet store with grooming services"
    }
  },
  
  // Call to Action
  cta: {
    title: "Stop Being Embarrassed by Cat Litter Smell!",
    subtitle: "Join 1,000+ cat parents who finally have fresh-smelling homes. No more holding your breath, no more apologizing to guests. Get your confidence back - start breathing easy again.",
    buttonText: "ELIMINATE THE STINK NOW",
    joinText: "Join 1,000+ families with odor-free homes - Visit your local store",
    guarantee: "Proven results you can smell (or can't smell!)"
  },
  
  // FAQ
  faq: {
    title: "Frequently Asked Questions",
    commonQuestions: "Common Questions",
    subtitle: "Have questions about Purrify? Find answers to our most commonly asked questions below.",
    stillHaveQuestions: "Still have questions?",
    contactTeam: "Contact our team",
    forMoreInfo: "for more information.",
    items: [
      {
        question: "What is Purrify?",
        answer: "Purrify is an activated carbon cat litter additive that eliminates odors at the source, rather than masking them with fragrances."
      },
      {
        question: "How does Purrify work?",
        answer: "Purrify uses activated carbon technology to trap and neutralize odor molecules through adsorption, effectively eliminating cat litter odors at the molecular level."
      },
      {
        question: "Can I use Purrify for rodents like hamsters, mice, or rats?",
        answer: "Yes! Purrify uses the same type of activated carbon found in hospital water filtration and veterinary applications. When used properly in sealed pouches or containers with proper ventilation, it can be suitable for odor control in rodent environments. Always minimize dust exposure and rinse before use if needed. For detailed usage guidelines and precautions for small pets, see our complete safety information page.",
        link: "/learn/safety"
      },
      {
        question: "How long does Purrify last?",
        answer: "A single application of Purrify can keep your litter box odor-free for up to 7 days, depending on usage and the number of cats."
      },
      {
        question: "Can Purrify be used with any type of cat litter?",
        answer: "Yes, Purrify works with all types of cat litter including clay, clumping, crystal, and natural litters."
      },
      {
        question: "How often should I use Purrify?",
        answer: "For best results, sprinkle Purrify on top of your cat's litter each time you change or add fresh litter. A thin layer is all you need for continuous odor control."
      },
      {
        question: "How long does one bag of Purrify last?",
        answer: "This depends on how many cats you have and how often you change their litter. On average, our 50g bag lasts about 1-2 months for a single cat household with regular litter changes."
      },
      {
        question: "How is Purrify different from scented litters or deodorizers?",
        answer: "Unlike scented products that mask odors, Purrify uses activated carbon technology to actually trap and neutralize odor molecules at the source. It doesn't add any scent to your home - it simply eliminates the bad ones."
      },
      {
        question: "Is Purrify certified? Where can I find safety information?",
        answer: "Yes! Purrify meets NSF/ANSI 61, AWWA B604, and Food Chemicals Codex (FCC) standards. It's also Halal and Kosher certified. For complete technical specifications, certifications, and detailed safety information including rodent usage guidelines, visit our safety information page.",
        link: "/learn/safety"
      }
    ]
  },
  
  // Contact
  contact: {
    title: "Contact Us",
    subtitle: "We're here to help",
    address: "109-17680 Rue Charles, Mirabel, QC J7J 0T6",
    phone: CONTACT_INFO.phone,
    email: "hello@purrify.ca",
    courriel: "hello@purrify.ca",
    hours: {
      title: "Opening Hours",
      monday: "08:00 am - 8:00 pm",
      tuesday: "08:00 am - 8:00 pm",
      wednesday: "08:00 am - 8:00 pm",
      thursday: "08:00 am - 8:00 pm",
      friday: "08:00 am - 8:00 pm",
      saturday: "09:00 am - 8:00 pm",
      sunday: "Closed"
    },
    form: {
      name: "Name",
      email: "Email",
      message: "Message",
      submit: "Send"
    }
  },
  
  // Newsletter
  newsletter: {
    title: "Subscribe to our newsletter",
    subtitle: "Stay updated with the latest news and promotions",
    placeholder: "Your email address",
    buttonText: "Subscribe",
    successMessage: "Thank you for subscribing!",
    errorMessage: "An error occurred. Please try again.",
    joinFamily: {
      title: "Join the Purrify Family",
      subtitle: "Get 10% off your first order plus exclusive cat care tips",
      benefits: {
        firstOrder: "10% Off First Order",
        firstOrderDesc: "Exclusive discount for new subscribers",
        catCareTips: "Cat Care Tips", 
        catCareTipsDesc: "Weekly expert advice and litter tips",
        earlyAccess: "Early Access",
        earlyAccessDesc: "Be first to know about new products",
        communityStories: "Community Stories",
        communityStoriesDesc: "Success stories from other cat owners"
      },
      emailPlaceholder: "Enter your email address",
      ctaButton: "Get 10% Off Your First Order",
      joinText: "Join 1,000+ happy customers • No spam, unsubscribe anytime",
      features: {
        weeklyTips: "✓ Weekly tips",
        exclusiveOffers: "✓ Exclusive offers", 
        earlyAccessProducts: "✓ Early access"
      }
    }
  },
  
  // Free Giveaway Form
  freeGiveaway: {
    formTitle: "Enter Your Details",
    fullName: "Full Name",
    emailAddress: "Email Address",
    catNames: "Names of Your Cats",
    catNamePlaceholder: "Name of Cat {index}",
    addAnotherCat: "Add Another Cat",
    submitting: "Submitting...",
    submitButton: "GET MY FREE BAG NOW",
    successMessage: "Your free bag request has been submitted successfully!",
    errorMessage: "Failed to submit your request. Please try again.",
    errorGeneric: "An error occurred. Please try again later.",
    privacyNotice: "By submitting this form, you're allowing us to contact you about your free Purrify sample. We respect your privacy and will never share your information with third parties."
  },
  
  // SEO
  seo: {
    keywords: "cat litter, odor control, activated carbon, cat litter additive, pet odor, cat odor elimination, natural odor control, cat care, pet supplies, cat video",
    openGraph: {
      title: "Purrify - Cat Litter Odor Control",
      description: "Activated carbon cat litter additive that eliminates odors at the source."
    },
    metaDescription: "Purrify is a premium activated carbon cat litter additive that eliminates odors at the molecular level. Made from natural coconut shell carbon, it provides 7-day freshness and works with any litter type. Trusted by 1,000+ cat owners across Canada."
  },
  
  // Structured Data
  structuredData: {
    organization: {
      name: "Purrify",
      description: "Premium activated carbon cat litter additive that eliminates odors at the molecular level. Made in Canada with natural coconut shell carbon.",
      foundingDate: "2023",
      contactPoint: {
        telephone: CONTACT_INFO.phoneInternational,
        email: "hello@purrify.ca",
        contactType: "customer service",
        areaServed: ["CA", "US"],
        availableLanguage: ["English", "French", "Chinese"]
      },
      areaServed: "Canada"
    },
    product: {
      name: "Purrify Activated Carbon Cat Litter Additive",
      description: "Activated carbon cat litter additive that eliminates odors at the source."
    },
    localBusiness: {
      type: "PetStore",
      name: "Purrify",
      description: "Activated carbon cat litter additive that eliminates odors at the source."
    },
    breadcrumb: {
      home: "Home"
    },
    video: {
      name: "Purrify Cat Litter Additive Effectiveness Demonstration",
      description: "See how Purrify effectively eliminates cat litter odors at the source."
    },
    website: {
      name: "Purrify - Activated Carbon Cat Litter Additive",
      description: "Premium activated carbon cat litter additive that eliminates odors at the molecular level.",
      inLanguage: "en-CA"
    },
    offerCatalog: {
      name: "Cat Litter Odor Control Products",
      products: {
        trial: {
          name: "Purrify 12g Trial Size",
          description: "Trial size activated carbon cat litter additive - perfect for testing",
          sku: "purrify-12g"
        },
        standard: {
          name: "Purrify 50g Standard Size",
          description: "Most popular size - one month supply for single cat households",
          sku: "purrify-50g"
        },
        family: {
          name: "Purrify 120g Family Pack",
          description: "Large size perfect for multi-cat households - maximum odor control",
          sku: "purrify-120g"
        }
      },
      priceRange: "$6.99 - $29.99"
    },
    faqPage: {
      questions: [
        {
          question: "What is Purrify and how does it work?",
          answer: "Purrify is an activated carbon additive for cat litter that eliminates odors at the molecular level. The activated carbon has millions of microscopic pores that trap and neutralize odor-causing compounds, providing superior odor control compared to traditional litter alone."
        },
        {
          question: "Can Purrify be used around cats and people?",
          answer: "Purrify uses the same type of activated carbon commonly found in household water and air filtration. It contains no added fragrances or dyes."
        },
        {
          question: "How much Purrify should I use?",
          answer: "For optimal results, use approximately 1-2 tablespoons of Purrify per standard litter box. Mix it thoroughly with your existing litter when you do a complete change. The 12g trial size is perfect for one litter box change."
        },
        {
          question: "Does Purrify work with all types of litter?",
          answer: "Yes! Purrify is designed to work with any type of cat litter - clay, clumping, crystal, natural, or biodegradable. It enhances the odor control properties of whatever litter you're already using."
        }
      ]
    }
  },

  // Blog Section
  blogSection: {
    catCareTips: "Cat Care Tips",
    fromOurBlog: "From Our Blog",
    description: "Expert advice and tips for cat owners",
    newPost: "New Post",
    readFullArticle: "Read Full Article",
    viewAllArticles: "View All Articles"
  },

  // Contact Section
  contactSection: {
    getInTouch: "Get in Touch",
    ourLocation: "Our Location",
    phoneNumber: "Phone Number",
    phoneDescription: "We locked those stubborn odors right inside our phone number. Call 1-450-6-ODORS-3 (that's 1 (450) 663-6773) and see how serious we are about fresh air.",
    openingHours: "Opening Hours",
    weekdays: "Weekdays",
    saturday: "Saturday",
    sunday: "Sunday",
    sendMessage: "Send Message",
    replyTime: "We'll reply within 24 hours"
  },

  // Benefits
  benefits: {
    molecular: {
      title: "Molecular Level",
      description: "Eliminates odors at the source"
    },
    sevenDayFreshness: {
      title: "7-Day Freshness",
      description: "Long-lasting odor control"
    },
    natural: {
      title: "100% Natural",
      description: "No added fragrances; coconut shell activated carbon"
    },
    universalFit: {
      title: "Universal Fit",
      description: "Works with all litter types"
    },
    highlyRated: {
      title: "Highly Rated",
      description: "30-day money-back guarantee\nFast shipping in Canada"
    }
  },

  about: {
    naturalAndEffective: "Natural & Effective"
  },

  footer: {
    quickLinks: "Quick Links",
    openingHours: "Opening Hours",
    contactUs: "Contact Us",
    allRightsReserved: "All Rights Reserved"
  },

  // Free Trial
  freeTrial: {
    urgentBanner: "Limited Time Offer",
    free: "Free"
  },

  // Enhanced Product Comparison
  enhancedProductComparison: {
    compareAndSave: "COMPARE & SAVE",
    chooseYourPerfectSize: "Choose Your Perfect Size",
    purrifySize: "Purrify Size",
    subtitle: "All sizes deliver the same powerful odor elimination. Choose based on your household size and usage frequency.",
    trial: "TRIAL",
    mostPopular: "MOST POPULAR",
    bestValue: "BEST VALUE",
    premium: "Premium",
    perfectForFirstTime: "Perfect for first-time users",
    idealForSingleCat: "Ideal for single-cat homes",
    perfectForMultiCat: "Perfect for multi-cat households",
    duration: "Duration",
    coverage: "Coverage",
    odorControl: "7-Day Odor Control",
    odorControlTrial: "7-Day Odor Control",
    odorControlMedium: "14-Day Odor Control",
    odorControlLarge: "30-day odor control",
    naturalIngredients: "100% Natural Ingredients",
    easyApplication: "Easy Application",
    moneyBackGuarantee: "30-Day Money Back Guarantee",
    freeShipping: "Shipping included",
    freeShippingDetailed: "Shipping is included.",
    autoshipHero: "Autoship & Save",
    autoshipHighlight: "Subscribe & Save",
    bulkDiscount: "Bulk Discount Available",
    prioritySupport: "Priority Customer Support",
    tryRiskFree: "Try Risk-Free",
    chooseThisSize: "Choose This Size",
    chosenByCustomers: "🔥 68% of customers choose this bundle",
    whyChoosePurrify: "Why Choose Purrify?",
    joinThousands: "Join 1,000+ cat owners who trust Purrify",
    happyCustomers: "Happy Customers",
    averageRating: "Average Rating",
    satisfactionRate: "Satisfaction Rate",
    odorFreeGuarantee: "Odor-Free Guarantee",
    moneyBackGuaranteeText: "30-day money-back guarantee - Try risk-free!"
  },

  // Subscription Offer
  subscriptionOffer: {
    subscribeAndSave: "Subscribe & Save",
    neverRunOut: "Never Run Out Again",
    subtitle: "Set up automatic deliveries to lock in exclusive savings. Cancel anytime.",
    monthly: "Monthly",
    everyTwoMonths: "Every 2 Months",
    quarterly: "Quarterly",
    save: "Save",
    mostFlexible: "Most Flexible",
    bestValue: "Best Value",
    maxSavings: "Maximum Savings",
    oneTimePurchase: "One-Time Purchase",
    subscriptionBenefits: "Subscription Benefits",
    // fastShipping: "Fast shipping on every order", // TODO: Restore when offer is available
    exclusiveDiscounts: "Subscriber-only discounts",
    prioritySupport: "Priority customer support",
    flexibleSchedule: "Flexible delivery schedule",
    cancelAnytime: "Cancel anytime",
    startSubscription: "Start Subscription",
    selectPlan: "Select Plan",
    popularChoice: "Popular Choice"
  },

  // Urgency Banner
  urgencyBanner: {
    limitedTime: "Limited Time Offer",
    saveToday: "Save Today",
    onAllOrders: "on all orders",
    // freeShipping: "+ Free Shipping", // TODO: Restore when free shipping is available
    hurryOffer: "Hurry! This offer ends soon",
    claimDiscount: "Claim Discount",
    timeLeft: "Time Left",
    days: "days",
    hours: "hours",
    minutes: "minutes",
    seconds: "seconds",
    onlyLeft: "only left",
    inStock: "in stock",
    orderNow: "Order Now"
  },

  // Email Capture Popup
  emailCapture: {
    waitDontGo: "Wait! Don't leave yet!",
    exclusiveOffer: "Unlock an exclusive offer",
    subtitle: "Before you go, grab 15% off your first order",
    emailPlaceholder: "Enter your email address",
    claimDiscount: "Claim 15% Discount",
    noThanks: "No thanks",
    instantAccess: "Instant access to your discount code",
    limitedTime: "Limited-time offer—don't miss out!",
    successMessage: "Success! Check your inbox for the discount code.",
    errorMessage: "Something went wrong—please try again."
  },

  // Reviews Section
  reviewsSection: {
    customerReviews: "Customer Reviews",
    realStories: "Real stories from happy cat parents",
    verifiedReviews: "Verified Reviews",
    averageRating: "Average Rating",
    readMore: "Read More",
    writeReview: "Write a Review",
    helpful: "Helpful",
    verified: "Verified",
    productUsed: "Product Used",
    catsOwned: "Cats Owned",
    useCase: "Use Case"
  },

  // Case Studies
  caseStudies: {
    customerSuccess: "Customer Success Stories",
    realResults: "Real results from real customers",
    detailedStories: "See how Purrify transforms homes across Canada through detailed case studies",
    averageOdorReduction: "Average Odor Reduction",
    timeToSeeResults: "Time to See Results",
    customerSatisfaction: "Customer Satisfaction",
    catsPerStudy: "Cats per Study",
    theChallenge: "The Challenge",
    theSolution: "The Solution",
    theResults: "The Results",
    longTermOutcome: "Long-Term Outcome",
    keyPainPoints: "Key Pain Points",
    implementation: "Implementation",
    writeYourStory: "Ready to write your own success story?",
    joinSatisfied: "Join 1,000+ satisfied customers transforming their homes with Purrify.",
    shopPurrify: "Shop Purrify",
    tryFreeSample: "Try a Free Sample",
    moreCustomerStories: "More Customer Stories",
    videoTestimonials: "Video Testimonials",
    productComparison: "Product Comparison"
  },

  // Additional Subscription Offer Translations
  subscriptionOfferExtended: {
    autoshipBadge: "Quarterly Autoship",
    headline: "Set & forget your litter odor defense",
    supportingCopy: "Choose the bundle that automatically restocks every 3 months, keeps your home fresh, and protects your budget.",
    perMonthLabel: "≈ {price}/month effective",
    saveVsOneTime: "Save {percent}% vs one-time purchase",
    skipOrCancelAnytime: "Skip or cancel anytime",
    shippingIncluded: "Shipping included",
    freeShippingIncluded: "Free shipping included",
    priorityCustomerSupport: "Priority customer support",
    startAutoship: "Start Autoship",
    linkComingSoon: "Payment link coming soon",
    quarterlyBilling: "Billed every 3 months",
    autoshipHero: "Autoship & Save",
    autoshipHighlight: "Subscribe & Save",
    standardPlanTitle: "Quarterly Autoship – 3 × 50g",
    standardDescription: "Perfect for single-cat households that want fresh odor control every month.",
    includesThreeStandard: "Includes 3 × 50g bags delivered together",
    familyPlanTitle: "Best Value Autoship – 3 × Regular size 120g",
    familyDescription: "Designed for multi-cat and allergy-prone homes. Our best price per scoop.",
    includesThreeFamily: "Includes 3 × Regular size 120g packs (delivered together)",
    bestValueBadge: "Best Value",
    save: "Save",
    joinThePurrifyFamily: "Join the Purrify Family"
  },

  // Payment Security
  paymentSecurity: {
    securePayment: "Secure Payment",
    sslEncrypted: "256-bit SSL",
    sslEncryptedCheckout: "SSL encrypted checkout with Stripe"
  },

  // Testimonials Section
  testimonialsSection: {
    customerLove: "Customer Love",
    littersOfLove: "Real Results From Happy Cat Parents",
    dontJustTakeOurWord: "Don't just take our word for it. Here's what our customers have to say about Purrify.",
    readMoreReviews: "Read More Reviews"
  },

  // Trust Badges
  trustBadges: {
    moneyBack: {
      title: "30-Day Money Back",
      description: "Not satisfied? Get a full refund within 30 days",
      highlight: "100% Guaranteed"
    },
    securePayment: {
      title: "Secure Payment",
      description: "SSL encrypted checkout with Stripe",
      highlight: "256-bit SSL"
    },
    fastShipping: {
      title: "Fast Shipping",
      description: "Quick and reliable delivery",
      highlight: "Same Day Processing"
    },
    customerRating: {
      title: "4.9/5 Customer Rating",
      description: "Based on 138 verified reviews",
      highlight: "98% Satisfaction"
    },
    happyCustomers: {
      title: "1,000+ Happy Customers",
      description: "Trusted by cat owners across Canada",
      highlight: "Since 2019"
    },
    premiumQuality: {
      title: "Premium Quality",
      description: "Filtration-grade activated carbon used in water and air filters",
      highlight: "Fragrance-Free"
    }
  },

  // Free Trial Page
  freeTrialPage: {
    urgentBanner: "LIMITED TIME OFFER",
    free: "FREE",
    claimTrial: "Claim Your FREE Purrify Trial",
    whatYouGet: "What You Get:",
    freeTrialBag: "12g Purrify Trial Size worth $4.99",
    // fastShippingDoor: "Fast shipping to your door", // TODO: Restore when offer is available
    expertTips: "Expert cat care tips and guides",
    zeroCommitment: "Zero commitment - this is our gift to you",
    attention: "ATTENTION: For cat owners tired of holding their breath",
    limitedQuantity: "Limited to first 500 cat owners only",
    alreadyClaimed: "Already claimed",
    countdownLabels: {
      hours: "HOURS",
      minutes: "MINS",
      seconds: "SECS"
    },
    testimonials: [
      {
        text: "I couldn't believe it. Within HOURS, my entire house smelled fresh again. I even had my mother-in-law over for the first time in months!",
        author: "Jennifer M., Montreal"
      },
      {
        text: "My husband thought I had completely thrown out the litter. The smell had just... vanished.",
        author: "Lisa K., Mirabel, QC"
      }
    ],
    testimonialsTestUsers: "What our beta testers say:",
    claimNow: "CLAIM YOUR FREE TRIAL NOW",
    warningHighDemand: "⚠️ WARNING: Due to high demand, we cannot guarantee availability after the timer expires.",
    privacyNotice: "100% Free. No credit card required.",
    zeroCommitmentGift: "Zero commitment - this is our gift to you",
    instantOdorElimination: "Experience instant odor elimination magic",
    completeInstructions: "Complete instructions for best results",
    noShippingFees: "No shipping fees, no hidden costs, no catch",
    disappearsIn: "WARNING: This offer disappears in:",
    limitedTo500: "Limited to first 500 cat owners only.",
    yourFreeTrialWaits: "Your free trial awaits - but only if you act now.",
    betaTestersHeader: "What our beta testers say:",
    claimFreeTrialNow: "CLAIM YOUR FREE TRIAL NOW",
    attention100Free: "100% Free. No credit card required.",
    noCreditCard: "No credit card required.",
    limitedTimeOffer: "Limited time offer. One free sample per household.",
    restrictionsApply: "Shipping restrictions may apply. We reserve the right to end this promotion at any time.",
    highDemandWarning: "Due to high demand, we cannot guarantee availability after the timer expires",
    disclaimer: "100% Free. No credit card required. Limited time offer. One free sample per household. Shipping restrictions may apply. We reserve the right to end this promotion at any time."
  },

  // Contact Page
  contactPage: {
    title: "We're Here to Help",
    subtitle: "Our friendly customer support team is ready to assist you with expert advice and solutions.",
    chooseContactMethod: "Choose How to Contact Us",
    contactReasons: [
      { value: "general", label: "General Question" },
      { value: "order", label: "Order Status" },
      { value: "product", label: "Product Question" },
      { value: "shipping", label: "Shipping Issue" },
      { value: "return", label: "Return/Exchange" },
      { value: "other", label: "Other" }
    ],
    contactMethods: [
      {
        title: "Email Support",
        description: "Get detailed help with your questions",
        responseTime: "Response within 24 hours"
      },
      {
        title: "Phone Support", 
        description: "Speak directly with our team",
        responseTime: "Mon-Fri 9AM-5PM EST"
      },
      {
        title: "Live Chat",
        description: "Chat with us in real-time",
        responseTime: "Available Now"
      }
    ],
    form: {
      fullName: "Full Name",
      emailAddress: "Email Address", 
      subject: "Subject",
      message: "Message",
      contactReason: "Contact Reason",
      orderNumber: "Order Number (if applicable)",
      submit: "Send Message",
      submitting: "Sending...",
      successMessage: "Thank you for contacting us! We'll respond within 24 hours.",
      errorMessage: "Sorry, there was an error sending your message. Please try again or contact us directly.",
      sendingMessage: "Sending Message...",
      sendMessage: "Send Message",
      subjectPlaceholder: "Brief description of your request",
      messagePlaceholder: "Please provide details about your question or concern...",
      orderNumberPlaceholder: "e.g. PUR-12345",
      contactNow: "Contact Now"
    },
    faqs: [
      {
        question: "How long does shipping take?",
        answer: "Standard shipping takes 3-5 business days within Canada. We also offer expedited shipping options."
      },
      {
        question: "Can I use Purrify around my cat?", 
        answer: "Purrify uses the same type of activated carbon found in many home water filters and contains no added fragrances or dyes."
      },
      {
        question: "How do I use Purrify?",
        answer: "Simply sprinkle 1-2 tablespoons of Purrify over your existing litter after cleaning. It works with all litter types."
      }
    ],
    businessHours: {
      title: "Business Hours",
      weekdays: "Monday - Friday: 9:00 AM - 5:00 PM EST",
      saturday: "Saturday: 10:00 AM - 2:00 PM EST",
      sunday: "Sunday: Closed",
      closed: "Closed"
    },
    location: {
      title: "Our Location",
      address: "Montreal, Quebec, Canada",
      shippingNote: "We ship across Canada and offer local pickup in the Montreal area."
    },
    frequentlyAskedQuestions: "Frequently Asked Questions",
    quickAnswersCommon: "Quick answers to common questions",
    dontSeeQuestion: "Don't see your question here?",
    viewCompleteFAQ: "View Complete FAQ",
    backToHome: "Back to Home"
  },

  // Product Comparison
  productComparison: {
    title: "Choose Your Perfect Size",
    subtitle: "Find the ideal Purrify size for your household",
    findPerfectSize: "Find your perfect size based on your needs",
    products: [
      {
        id: "trial",
        name: "Trial Size",
        subtitle: "Perfect for first-time users",
    duration: "One week duration",
    cats: "For one cat",
        features: ["12g activated carbon", "Risk-free trial", "Perfect introduction"],
        bestFor: "New customers wanting to try Purrify",
        cta: "Try Risk-Free"
      },
      {
        id: "standard", 
        name: "Standard Size",
        subtitle: "Most popular choice",
        duration: "4-6 weeks",
        cats: "1-3 cats",
        features: ["75g activated carbon", "Best value", "Most popular"],
        bestFor: "Regular households with 1-3 cats",
        cta: "Choose This Size"
      },
      {
        id: "large",
        name: "Large Size", 
        subtitle: "Best value for multi-cat homes",
    duration: "4-week duration",
    cats: "For 1-2 cats",
        features: ["150g activated carbon", "Maximum savings", "Bulk discount"],
        bestFor: "Multi-cat households and heavy users",
        cta: "Get Best Value"
      }
    ],
    comparisonFeatures: [
      { feature: "Odor elimination" },
      { feature: "Fragrance-free" },
      { feature: "Works with all litters" },
      { feature: "Natural ingredients" },
      { feature: "Money-back guarantee" }
    ],
    usageCalculator: {
      title: "Usage Calculator",
      subtitle: "Calculate how long each size will last",
      numberOfCats: "Number of cats:",
      typicalChanges: "Litter changes per week:",
      estimateDuration: "Estimated duration:"
    },
    stillUnsure: "Still unsure which size is right for you?",
    getPersonalizedAdvice: "Get personalized advice from our team",
    tryRiskFree: "Try Risk-Free",
    learnMoreAboutPurrify: "Learn more about how Purrify works",
    featuresComparison: "Features Comparison",
    seeHowProductsCompare: "See how our products compare",
    howLongWillEachSizeLast: "How long will each size last?",
    popular: "POPULAR",
    bestValue: "BEST VALUE", 
    perfectForFirstTime: "Perfect for first-time users",
    idealForSingleCat: "Ideal for single cat households",
    perfectForMultiCat: "Perfect for multi-cat households",
    economicChoice: "Most economic choice for large families",
    maxValuePerGram: "Maximum value per gram",
    bulkSavingsIncluded: "Bulk savings included",
    sustainableSupply: "Sustainable supply for heavy users",
    // fastShippingIncluded: "Fast shipping included", // TODO: Restore when offer is available
    features: "Features",
    idealFor: "Ideal For",
    duration: "Duration",
    saveMoney: "Save Money",
    getBestValue: "Get Best Value",
    chooseThisSize: "Choose This Size",
    tryWithoutRisk: "Try Without Risk",
    chooseSmallSize: "Choose Small Size"
  },

  // Privacy Policy
  privacyPolicy: {
    title: "Privacy Policy",
    lastUpdated: "Last updated: January 2025",
    sections: [
      {
        title: "Information We Collect",
        content: "We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support.",
        items: [
          "Personal information (name, email address, phone number)",
          "Payment information (processed securely through Stripe)",
          "Shipping and billing addresses",
          "Communication preferences and customer service interactions"
        ]
      },
      {
        title: "How We Use Your Information", 
        content: "We use the information we collect to provide, maintain, and improve our services, process transactions, and communicate with you."
      },
      {
        title: "Information Sharing",
        content: "We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy."
      },
      {
        title: "Data Security",
        content: "We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction."
      },
      {
        title: "Contact Us",
        content: "If you have any questions about this Privacy Policy, please contact us using the information below."
      }
    ],
    contactInfo: {
      email: "Email",
      phone: "Phone", 
      address: "Purrify Canada, Montreal, Quebec, Canada"
    }
  },

  // FAQ Items
  faqItems: [
    {
      id: 1,
      category: "product",
      question: "What is Purrify and how does it work?",
      answer: "Purrify is an activated carbon additive for cat litter that eliminates odors at the molecular level. The activated carbon has millions of microscopic pores that trap and neutralize odor-causing compounds, providing superior odor control compared to traditional litter alone.",
      popular: true,
      tags: ["activated carbon", "odor control", "how it works"]
    },
    {
      id: 2,
      category: "product",
      question: "Can Purrify be used around cats and people?",
      answer: "Purrify uses the same type of activated carbon commonly used in household water filters and air purifiers. It contains no added fragrances or dyes.",
      popular: true,
      tags: ["usage", "filtration-grade", "fragrance-free"]
    },
    {
      id: 3,
      category: "usage",
      question: "How much Purrify should I use?",
      answer: "For optimal results, use approximately 1-2 tablespoons of Purrify per standard litter box. Mix it thoroughly with your existing litter when you do a complete change. The 12g trial size is perfect for one litter box change.",
      popular: true,
      tags: ["dosage", "application", "mixing"]
    },
    {
      id: 4,
      category: "product",
      question: "Does Purrify work with all types of litter?",
      answer: "Yes! Purrify is designed to work with any type of cat litter - clay, clumping, crystal, natural, or biodegradable. It enhances the odor control properties of whatever litter you're already using.",
      popular: true,
      tags: ["compatibility", "all litter types", "enhancement"]
    },
    {
      id: 5,
      category: "usage",
      question: "How long does Purrify last?",
      answer: "Purrify extends the life of your litter by 2-3 times. Instead of changing litter weekly, you can typically go 2-3 weeks with the same litter when using Purrify, depending on the number of cats and usage frequency.",
      popular: false,
      tags: ["duration", "litter life", "cost savings"]
    },
    {
      id: 6,
      category: "shipping",
      question: "How fast is shipping?",
      answer: "We offer free standard shipping (5-7 business days) on orders over $25. Express shipping (2-3 days) is available for $9.99, and priority shipping (1-2 days) for $14.99. Orders placed before 2 PM EST ship the same day.",
      popular: true,
      tags: ["shipping speed", "delivery times", "same day"]
    },
    {
      id: 7,
      category: "product",
      question: "What sizes are available?",
      answer: "We offer three sizes: 12g Trial Size ($4.99 with shipping included) for first-time users, 50g Regular Size ($14.99 + shipping) for single-cat households, and 120g Large Size ($29.99) for multi-cat homes. The large size delivers the best value per gram, and our autoship bundles include free shipping.",
      popular: false,
      tags: ["sizes", "pricing", "value"]
    },
    {
      id: 8,
      category: "usage",
      question: "Can I use Purrify with automatic litter boxes?",
      answer: "Yes, Purrify works excellently with automatic litter boxes. Simply mix it with your litter as usual. The activated carbon won't interfere with the automatic mechanisms and will provide superior odor control.",
      popular: false,
      tags: ["automatic litter box", "compatibility", "mechanisms"]
    },
    {
      id: 9,
      category: "payment",
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, and Google Pay. All transactions are processed securely through Stripe with 256-bit SSL encryption.",
      popular: false,
      tags: ["payment methods", "security", "credit cards"]
    },
    {
      id: 10,
      category: "shipping",
      question: "Do you ship internationally?",
      answer: "Yes, we ship to many countries worldwide. Shipping costs vary by destination: USA ($12.99), UK/EU ($19.99), Australia ($24.99). Delivery times range from 7-35 days depending on location. Customs duties may apply.",
      popular: false,
      tags: ["international shipping", "worldwide", "customs"]
    },
    {
      id: 11,
      category: "product",
      question: "Is there a money-back guarantee?",
      answer: "Yes! We offer a 30-day money-back guarantee. If you're not completely satisfied with Purrify, contact us within 30 days of purchase for a full refund. We stand behind our product 100%.",
      popular: true,
      tags: ["guarantee", "refund", "30 days"]
    },
    {
      id: 12,
      category: "usage",
      question: "How do I know if Purrify is working?",
      answer: "You'll notice the difference within hours! The most obvious sign is dramatically reduced odor from the litter box. You'll also find that your litter stays fresher longer, requiring less frequent complete changes.",
      popular: false,
      tags: ["effectiveness", "results", "timeline"]
    },
    {
      id: 13,
      category: "support",
      question: "How can I contact customer support?",
      answer: "You can reach us via email at hello@purrify.com, through our contact form, or by phone during business hours. We typically respond to emails within 24 hours and are always happy to help with any questions.",
      popular: false,
      tags: ["contact", "support", "response time"]
    },
    {
      id: 14,
      category: "product",
      question: "Can Purrify help with multiple cats?",
      answer: "Absolutely! Purrify is especially effective in multi-cat households where odor control is more challenging. We recommend our 120g Large Size for homes with 2-3 cats, as it provides the best value and longest-lasting results.",
      popular: false,
      tags: ["multiple cats", "multi-cat", "large size"]
    },
    {
      id: 15,
      category: "usage",
      question: "Do I need to change how I clean the litter box?",
      answer: "No changes needed! Continue your normal scooping routine. Purrify works in the background to eliminate odors. You may find you can go longer between complete litter changes, saving you time and money.",
      popular: false,
      tags: ["cleaning routine", "scooping", "maintenance"]
    },
    {
      id: 16,
      category: "shipping",
      question: "Can I track my order?",
      answer: "Yes! Once your order ships, you'll receive a tracking number via email. You can track your package directly on the Canada Post website or through our order tracking system.",
      popular: false,
      tags: ["tracking", "order status", "Canada Post"]
    }
  ],

  // FAQ Categories
  faqCategories: [
    { id: "all", name: "All Questions", count: 24 },
    { id: "product", name: "Product Information", count: 8 },
    { id: "usage", name: "Usage & Application", count: 6 },
    { id: "shipping", name: "Shipping & Delivery", count: 5 },
    { id: "payment", name: "Payment & Billing", count: 3 },
    { id: "support", name: "Customer Support", count: 2 }
  ],

  // FAQ Page
  faqPage: {
    title: "Frequently Asked Questions",
    subtitle: "Everything you need to know about Purrify",
    searchPlaceholder: "Search for answers...",
    popularQuestions: "Most Popular Questions",
    quickAnswers: "Quick answers to what customers ask most",
    categories: "Categories",
    questionsFound: "Question",
    questionsFoundPlural: "Questions Found",
    clearSearch: "Clear Search",
    noQuestionsFound: "No questions found",
    adjustSearchTerms: "Try adjusting your search terms or category filter",
    stillHaveQuestions: "Still Have Questions?",
    cantFindWhatLooking: "Can't find what you're looking for? Our customer support team is here to help!",
    customerSupportReady: "Our customer support team is ready to help!",
    emailSupport: "Email Support",
    detailedEmailHelp: "Get detailed answers via email",
    liveChat: "Live Chat",
    realTimeChatHelp: "Chat with us in real-time",
    phoneSupport: "Phone Support", 
    speakDirectlyTeam: "Speak with our team directly",
    contactUs: "Contact Us",
    startChat: "Start Chat",
    callNow: "Call Now",
    readyToTryPurrify: "Ready to Try Purrify?",
    startWithRiskFreeTrial: "Start with our risk-free trial size and experience the difference for yourself.",
    compareAllSizes: "Compare All Sizes",
    tryRiskFree: "Try Risk-Free - $4.99",
    learnMoreAboutPurrify: "Learn More About Purrify",
    howItWorks: "How It Works",
    learnScience: "Learn the science behind our activated carbon technology and why it's so effective.",
    catLitterGuide: "Cat Litter Guide",
    completeGuide: "Complete guide to cat litter types, maintenance tips, and best practices.",
    customerStories: "Customer Stories",
    realExperiences: "Read real experiences from cat owners who transformed their homes with Purrify.",
    popularTag: "Popular",
    breadcrumbs: {
      home: "Home",
      learn: "Learn",
      faq: "FAQ"
    }
  },

  // Common UI Elements
  ui: {
    // Review System
    allRatings: "All Ratings",
    allSizes: "All Sizes",
    newestFirst: "Newest First",
    oldestFirst: "Oldest First",
    highestRated: "Highest Rated",
    lowestRated: "Lowest Rated",
    mostHelpful: "Most Helpful",
    verifiedPurchase: "Verified Purchase",
    
    // Payment & Cart
    securePayment: "Secure Payment",
    shoppingCart: "Shopping Cart",
    
    // General
    happyCustomers: "Happy Customers",
    moneyBack: "Money Back",
    averageRating: "Average Rating",
    satisfactionRate: "Satisfaction Rate",
    // freeShipping: "Free Shipping", // TODO: Restore when free shipping is available
    skipAnytime: "Skip Anytime",
    highlyRated: "Highly Rated",
    errorDetails: "Error Details"
  },

  // Homepage specific translations
  homepage: {
    seo: {
      pageTitle: "Cat Litter Odor Control Additive",
      keywords: "cat litter odor control, activated carbon cat litter, natural cat litter additive, fragrance-free pet odor control, cat litter deodorizer, pet odor elimination, cat care products, natural odor control, cat litter solution, pet supplies Canada",
      openGraphImageAlt: "Premium Cat Litter Odor Control Solution",
      videoAlt: "Purrify Cat Litter Additive Effectiveness Demonstration",
      videoDescription: "Purrify Cat Litter Additive in Action - Before and After Demonstration",
      videoEffectivenessDemo: "Purrify Cat Litter Additive Effectiveness Demonstration"
    },
    trustBadges: {
      securePayment: {
        title: "Secure Payment",
        description: "256-bit SSL",
        detail: "SSL encrypted checkout with Stripe"
      }
    },
    socialProof: {
      nationalDelivery: "100% Natural • Made in Canada",
      fastDelivery: "Fast delivery Canada-wide",
      recentOrders: "orders this week"
    },
    hero: {
      videoAriaLabel: "Demonstration video showing Purrify activated carbon litter additive eliminating cat litter odors before and after application",
      videoFallbackText: "Your browser does not support the video tag. This video demonstrates Purrify activated carbon litter additive eliminating odors before and after application to cat litter.",
      videoDescriptions: "English Descriptions",
      highlyRated: "Highly Rated",
      moneyBackGuarantee: "30-Day Money-Back Guarantee",
      freeShippingCanada: "Free Shipping in Canada"
    },
    enhancedComparison: {
      duration: "Duration",
      coverage: "Coverage",
      chooseYourPerfectSize: "Choose Your Perfect Size",
      allSizesDeliver: "All sizes deliver the same powerful odor elimination. Choose based on your household size and usage frequency.",
      whyChoosePurrify: "Turn Cat Odor Problems Into a Thing of the Past",
      joinThousands: "Join 1,000+ satisfied cat parents who trust Purrify",
      happyCustomers: "Happy Customers",
      averageRating: "Average Rating",
      satisfactionRate: "Satisfaction Rate",
      odorFreeGuarantee: "Odor-Free Guarantee",
      tryRiskFree: "Try Risk-Free",
      chooseThisSize: "Choose This Size"
    },
    altText: {
      scientificDiagram: "Scientific diagram showing activated carbon molecular structure with micropores that trap odor molecules",
      productPackages: "Three Purrify product packages showing different sizes: 12g trial, 50g standard, and 120g family pack",
      microscopicView: "Microscopic view of activated carbon showing porous structure that captures odor molecules",
      happyCat: "Happy cat resting peacefully in a fresh, odor-free home environment",
      happyCatAlt: "Happy cat",
      userAvatar: "User",
      customerTestimonials: "View customer testimonials",
      leaveGoogleReview: "Leave a Google review",
      litterCompatibility: "Cat enjoying their favorite litter while Purrify works with every type of litter"
    },
    subscription: {
      fastDelivery: "Fast Delivery",
      quickReliableShipping: "Quick and reliable shipping",
      skipAnytime: "Skip Anytime",
      fullControlDeliveries: "Full control over deliveries",
      lovedByCustomers: "Loved by 1,000+ customers",
      joinSatisfiedCustomers: "Join over 1,000 satisfied customers:",
      thirtyDayGuarantee: "30-Day Guarantee",
      moneyBackPromise: "100% money-back promise",
      fiveStarRated: "5-Star Rated",
      reviewsRating: "4.9/5 from 138 reviews",
      testimonialQuote: "\"I've saved over $200 this year with my subscription, and my cats' litter box never smells!\" - Sarah M."
    }
  },

  // Blog
  blog: {
    multiCat: {
      title: "7 Ways to Control Multi-Cat Litter Odor",
      description: "Overwhelmed by multiple cat litter box smell? These 7 proven methods eliminate even the strongest multi-cat ammonia odors. Stop dreading coming home to that awful stink!",
      category: "Multi-Cat Household Guide",
      publishDate: "Published September 16, 2024",
      readTime: "12 min read",
      breadcrumb: "Multi-Cat Solutions",
      stats: {
        title: "Multi-Cat Household Stats",
        strongerOdors: "Stronger odors vs single cat",
        litterBoxes: "Litter boxes per cat minimum",
        moreDeodorizer: "More deodorizer needed",
        maintenance: "Maintenance required"
      }
    },
    odorAbsorber: {
      title: "Most Powerful Odor Absorber for Cat Litter: Science-Backed 2025 Guide",
      description: "Discover the most powerful odor absorber strategies for cat litter boxes. Compare activated carbon, zeolite, and hybrid systems so your home may stay fresh without harsh perfumes.",
      category: "Odor Science & Technology",
      publishDate: "Published October 19, 2025",
      readTime: "14 min read",
      breadcrumb: "Odor Science",
      stats: {
        title: "Odor Elimination Benchmarks",
        ammoniaReduction: "Independent lab data shows up to 92% ammonia reduction with activated carbon layers",
        adsorptionSpeed: "Porous carbon structure traps odor molecules in under 60 seconds",
        safeUsage: "Fragrance-free, no added chemicals-designed for sensitive cats",
        refreshTiming: "Refresh carbon every scoop or litter top-up for consistent performance"
      }
    }
  },

  // Retailers & B2B
  retailers: {
    seo: {
      pageTitle: "Wholesale & Retail Partners",
      description: "Join our retail network. Wholesale pricing, marketing support, and proven products for pet stores and retailers across Canada."
    },
    hero: {
      badge: "Business Partnership",
      title: "Partner with Purrify",
      subtitle: "Wholesale Success",
      description: "Join hundreds of pet stores and retailers offering Canada's #1 activated carbon cat litter additive. Proven sales, loyal customers, marketing support included.",
      cta: {
        primary: "View Wholesale Pricing",
        secondary: "Become a Partner"
      }
    },
    benefits: {
      pricing: {
        title: "Wholesale Pricing",
        description: "Up to 50% margins with volume discounts"
      },
      marketing: {
        title: "Marketing Support",
        description: "POS materials, training, co-op advertising"
      },
      proven: {
        title: "Proven Product",
        description: "4.8/5 stars, high repeat purchase rate"
      },
      highDemand: {
        title: "High Customer Demand",
        description: "Pet owners actively seek odor solutions. Purrify addresses the #1 complaint about cat ownership - litter box odors."
      },
      highMargins: {
        title: "Premium Margins",
        description: "Small, lightweight product with high perceived value. Better margins than traditional heavy cat litter products."
      },
      easyStocking: {
        title: "Easy to Stock",
        description: "Compact packaging saves shelf space. No refrigeration required. Long shelf life with no expiration concerns."
      },
      marketingSupport: {
        title: "Complete Marketing Support",
        description: "We provide everything you need: shelf displays, product training, customer education materials, and co-op advertising."
      },
      customerLoyalty: {
        title: "Builds Customer Loyalty",
        description: "When Purrify solves their odor problem, customers become loyal to your store. They return monthly and recommend to friends."
      },
      fastMoving: {
        title: "Fast-Moving Inventory",
        description: "Unlike slow-moving pet accessories, Purrify is a consumable product with predictable monthly reorders."
      },
      title: "Why Retailers Choose Purrify",
      description: "Join hundreds of successful pet stores and retailers who have added Purrify to their product lineup with outstanding results.",
      success: {
        title: "Real Success Stories"
      }
    },
    pricing: {
      title: "Wholesale Pricing Tiers",
      description: "Flexible pricing options designed to maximize your margins while providing exceptional value to your customers.",
      tiers: {
        starter: {
          name: "Starter",
          description: "Perfect for small pet stores"
        },
        growth: {
          name: "Growth",
          description: "Most popular for established stores"
        },
        enterprise: {
          name: "Enterprise",
          description: "For chains and large retailers"
        }
      },
      additional: {
        title: "Volume Discounts Available",
        description: "Looking for larger quantities? We offer custom pricing for chains, distributors, and high-volume retailers. Contact us for a personalized quote."
      }
    },
    marketing: {
      title: "Complete Marketing Support",
      description: "We provide everything you need to successfully sell Purrify. From in-store displays to staff training, we've got you covered.",
      coop: {
        title: "Co-op Advertising Program",
        description: "Qualify for advertising credits to promote Purrify in your local market. We'll help cover costs for newspaper ads, radio spots, and local marketing campaigns."
      }
    },
    testimonials: {
      title: "What Our Retail Partners Say",
      description: "Real feedback from successful pet store owners and managers across Canada.",
      metrics: {
        title: "Proven Business Results"
      }
    },
    contact: {
      title: "Become a Purrify Retail Partner",
      description: "Ready to add Canada's #1 cat litter additive to your store? Fill out the form below and we'll get back to you within 24 hours."
    }
  },

  // Scrolling Announcement Bar
  scrollingBar: {
    freeShipping: "Free Shipping on All Subscription Orders",
    madeInCanada: "Manufactured in Canada from Domestic and Globally Sourced Ingredients"
  }
}; 
