export interface TranslationType {
  // Common
  siteName: string;
  siteDescription: string;

  // Navigation
  nav: {
    home: string;
    products: string;
    learn: string;
    howItWorks: string;
    about: string;
    whyPurrify: string;
    tryFree?: string;
    testimonials: string;
    leaveReview: string;
    contact: string;
    blog: string;
    privacyPolicy: string;
    termsOfService: string;
    // Dropdown items
    trialSize: string;
    compareSizes: string;
    viewAllProducts: string;
    howItWorksPage: string;
    faq: string;
    science: string;
    buyNow: string;
    retailers: string;
    wholesalePricing: string;
    becomePartner: string;
    marketingSupport: string;
    // Partner Programs
    partnerPrograms?: string;
    forGroomers?: string;
    forShelters?: string;
    affiliateProgram?: string;
    b2bInquiry?: string;
    customerReviews?: string;
    shipsToUSA?: string;
    // Learn dropdown items
    safetyInfo?: string;
    activatedCarbonBenefits?: string;
    catLitterGuide?: string;
    howToUse?: string;
    technologyComparison?: string;
    solutions?: string;
    // Solutions dropdown items
    ammoniaSmellControl?: string;
    apartmentLiving?: string;
    litterBoxOdor?: string;
    multipleCats?: string;
    naturalAdditive?: string;
    seniorCats?: string;
    // UI elements
    toggleMenu?: string;
    toggleTheme?: string;
    signOut?: string;
    signedIn?: string;
    // SEO FIX (Feb 2026): Added missing nav keys
    litterCalculator?: string;
    catLitterAnswers?: string;
    scienceHub?: string;
    carbonVsBakingSoda?: string;
    // B2B pivot keys
    findStore?: string;
    findNearYou?: string;
    whereToBuy?: string;
    askForPurrify?: string;
    // About dropdown items
    ourStory?: string;
  };

  // Locations Menu
  locationsMenu?: {
    selectProvince: string;
    hoverPrompt: string;
    provinceCitiesHeading: string;
    viewProvinceGuide: string;
  };

  // About Section
  about: {
    naturalAndEffective: string;
  };

  // Hero section
  hero: {
    catLitter: string;
    rabbitLitter: string;
    fridgeSmells: string;
    ferretCage: string;
    eliminateCatOdors: string;
    instantly: string;
    description: string;
    headline?: string;
    subheadline?: string;
    socialProof: {
      trustNumber: string;
      trustText: string;
      ratingText: string;
    };
    pricing?: {
      trial: string;
      standard: string;
      family: string;
    };
    buttons: {
      shopNow: string;
      reviews: string;
      learnMore?: string;
      tryFree?: string;
    };
    ariaLabels: {
      shopNow: string;
      reviews: string;
      playVideo: string;
    };
    dualPath?: {
      consumer: {
        title: string;
        description: string;
        cta: string;
      };
      retailer: {
        title: string;
        description: string;
        cta: string;
      };
    };
    simplified?: {
      free: string;
      justPayShipping: string;
      freeShippingOver?: string;
      headline?: string;
      subheadline?: string;
      noMore: string;
      litterBoxSmell: string;
      valueProposition: string;
      trialSize: string;
      standard: string;
      familyPack: string;
      plusSH: string;
      thirtyDayGuarantee: string;
      getFreeSample: string;
      soldThisWeek: string;
      limitedStock: string;
      moneyBackGuarantee: string;
    };
  };

  productsHero: {
    pill: string;
    headline: string;
    subheadline: string;
    scienceButton: string;
    guarantee: string;
    findSizeButton: string;
  };

  // Products
  products: {
    [key: string]: {
      name: string;
      description: string;
    };
  };

  // Features
  features: {
    odorElimination: {
      title: string;
      description: string;
    };
    catFriendly: {
      title: string;
      description: string;
    };
    longLastingFreshness: {
      title: string;
      description: string;
    };
    natural: {
      title: string;
      description: string;
    };
    worksWithAnyLitter: {
      title: string;
      description: string;
    };
    costEffective: {
      title: string;
      description: string;
    };
    freePurrify: {
      title: string;
      description: string;
    };
    beforeAfter: {
      title: string;
      description: string;
    };
  };

  // Benefits
  benefits: {
    molecular: {
      title: string;
      description: string;
    };
    sevenDayFreshness: {
      title: string;
      description: string;
    };
    natural: {
      title: string;
      description: string;
    };
    universalFit: {
      title: string;
      description: string;
    };
    highlyRated: {
      title: string;
      description: string;
    };
  };

  // Benefits Section (homepage benefits component)
  benefitsSection?: {
    sectionHeader: string;
    title: string;
    subtitle: string;
    items: Array<{
      title: string;
      description: string;
    }>;
  };

  // Science Section (homepage component)
  scienceSection?: {
    badge: string;
    headline: string;
    headlineHighlight: string;
    description: string;
    learnMore: string;
    features: Array<{
      title: string;
      description: string;
    }>;
    floatingLabel: {
      title: string;
      description: string;
    };
    naturalBadge: {
      title: string;
      subtitle: string;
    };
  };

  // Features Section (homepage component)
  featuresSection?: {
    badge: string;
    title: string;
    paragraph1: string;
    paragraph2: string;
    tagline: string;
    learnMore: string;
  };

  // Calculator Section (homepage component)
  calculatorSection?: {
    title: string;
    description: string;
  };

  // Section Header highlights
  sectionHeaderHighlights?: string[];

  // Trust Bar
  trustBar?: {
    happyCats: string;
    reviews: string;
  };

  // Social Proof Badges
  socialProofBadges?: {
    trustedVerified: string;
    findUsOn: string;
    viewOnPlatform: string;
    platforms: {
      trustpilot: string;
      googleBusiness: string;
      crunchbase: string;
      productHunt: string;
      yelp: string;
      wellfound: string;
    };
  };

  // How It Works
  howItWorks?: {
    simpleAs123: string;
    steps: {
      number: string;
      title: string;
      description: string;
    }[];
    litterTypes: {
      clumping: string;
      crystal: string;
      natural: string;
      clay: string;
      nonClumping: string;
    };
    learnTheScience?: string;
    compareSizes?: string;
    coconutDescription?: string;
  };

  // Products Section
  productsSection?: {
    forEveryCatHousehold: string;
    pickYourPowerLevel: string;
    subtitle: string;
    powerLevels: {
      kittenPower: string;
      standardPower: string;
      maximumPower: string;
    };
    mostPopular: string;
    addToCart: string;
    buyNow: string;
    subscribeNow: string;
    adding: string;
    viewAllProducts: string;
    stickyCart?: string;
    quantity?: string;
    decreaseQuantity?: string;
    increaseQuantity?: string;
    // B2B pivot keys
    findNearYou?: string;
    askYourStore?: string;
    availableAtStores?: string;
  };

  pricing?: {
    oneTimeLabel: string;
    autoshipLabel: string;
    autoshipBestLabel: string;
    billedEvery: string;
    months: string;
    shippingIncluded: string;
    freeShipping: string;
    plusShipping: string;
    shippingCalculated: string;
    startAutoship: string;
    buyNow: string;
    linkComingSoon: string;
    recommended: string;
    perMonth: string;
    saveVsOneTime: string;
    trialSizeSection: string;
    quarterlyAutoshipSection: string;
    stripeShippingNote: string;
  };

  announcementBar: {
    freeShipping: {
      line1: string;
      line2: string;
    };
    madeInCanada: {
      line1: string;
      line2: string;
    };
    naturalCarbon: {
      line1: string;
      line2: string;
    };
    socialProof: {
      line1: string;
      line2: string;
    };
    moneyBack: {
      line1: string;
      line2: string;
    };
  };

  // Stores Section
  storesSection?: {
    availableInStores: string;
    soldInFollowingStores: string;
    subtitle: string;
    requestStoreAvailability: string;
    dontSeeLocalStore: string;
    callStore: string;
    sending: string;
    requestSent: string;
    requestSuccess: string;
    requestError: string;
    storeDescriptions: {
      completePetCareAndSupplies: string;
      premiumPetBoutique: string;
      familyOwnedPetStore: string;
      globalPetFoodsLocation: string;
      premiumPetProductsAndSupplies: string;
      fullServicePetStore: string;
      petStoreWithGroomingServices: string;
    };
  };

  // Call to Action
  cta?: {
    title: string;
    subtitle: string;
    buttonText: string;
    joinText: string;
    guarantee: string;
    // B2B pivot keys
    b2bTitle?: string;
    b2bSubtitle?: string;
    b2bButtonText?: string;
    b2bGuarantee?: string;
  };

  // FAQ
  faq: {
    title?: string;
    commonQuestions?: string;
    subtitle?: string;
    stillHaveQuestions?: string;
    contactTeam?: string;
    forMoreInfo?: string;
    learnMore?: string;
    items: {
      question: string;
      answer: string;
      link?: string;
    }[];
  };

  // Contact
  contact: {
    title?: string;
    subtitle?: string;
    address: string;
    phone: string;
    email: string;
    courriel?: string;
    hours: {
      title?: string;
      monday: string;
      tuesday: string;
      wednesday: string;
      thursday: string;
      friday: string;
      saturday: string;
      sunday: string;
    };
    form?: {
      name: string;
      email: string;
      message: string;
      submit: string;
    };
  };

  // Newsletter
  newsletter?: {
    title: string;
    subtitle: string;
    placeholder: string;
    buttonText: string;
    successMessage: string;
    errorMessage: string;
    errorInvalidEmail?: string;
    errorGeneric?: string;
    privacyText?: string;
    joinFamily?: {
      title: string;
      subtitle: string;
      benefits: {
        firstOrder: string;
        firstOrderDesc: string;
        catCareTips: string;
        catCareTipsDesc: string;
        earlyAccess: string;
        earlyAccessDesc: string;
        communityStories: string;
        communityStoriesDesc: string;
      };
      emailPlaceholder: string;
      ctaButton: string;
      joinText: string;
      welcomeMessage?: string;
      features: {
        weeklyTips: string;
        exclusiveOffers: string;
        earlyAccessProducts: string;
      };
    };
    popup?: {
      title: string;
      description: string;
      buttonText: string;
    };
    footer?: {
      title: string;
      description: string;
      placeholder: string;
      buttonText: string;
    };
    inline?: {
      title: string;
      description: string;
      buttonText: string;
      successText: string;
    };
  };

  // Free Giveaway Form
  freeGiveaway?: {
    formTitle: string;
    fullName: string;
    emailAddress: string;
    catNames: string;
    catNamePlaceholder: string;
    addAnotherCat: string;
    submitting: string;
    submitButton: string;
    successMessage: string;
    errorMessage: string;
    errorGeneric: string;
    privacyNotice: string;
  };

  // 404 Not Found Page
  notFoundPage?: {
    title: string;
    description: string;
    lookingFor: string;
    returnHome: string;
    suggestedPages: {
      home: { title: string; description: string };
      products: { title: string; description: string };
      howItWorks: { title: string; description: string };
      blog: { title: string; description: string };
      contact: { title: string; description: string };
    };
  };

  // SEO
  seo: {
    keywords: string;
    openGraph: {
      title: string;
      description: string;
    };
    metaDescription: string;
  };

  // Structured Data
  structuredData: {
    organization: {
      name: string;
      description: string;
      foundingDate: string;
      areaServed: string;
      contactPoint: {
        telephone: string;
        email: string;
        contactType: string;
        areaServed: string[];
        availableLanguage: string[];
      };
    };
    product: {
      name: string;
      description: string;
    };
    localBusiness: {
      type: string;
      name: string;
      description: string;
    };
    breadcrumb: {
      home: string;
    };
    video: {
      name: string;
      description: string;
    };
    website: {
      name: string;
      description: string;
      inLanguage: string;
    };
    offerCatalog: {
      name: string;
      priceRange: string;
      products: {
        trial: {
          name: string;
          description: string;
          sku: string;
        };
        standard: {
          name: string;
          description: string;
          sku: string;
        };
        family: {
          name: string;
          description: string;
          sku: string;
        };
      };
    };
    faqPage: {
      questions: Array<{
        question: string;
        answer: string;
      }>;
    };
  };

  // Blog Section
  blogSection: {
    catCareTips: string;
    fromOurBlog: string;
    description: string;
    newPost: string;
    readFullArticle: string;
    viewAllArticles: string;
  };

  // Contact Section
  contactSection: {
    getInTouch: string;
    ourLocation: string;
    phoneNumber: string;
    phoneDescription: string;
    openingHours: string;
    weekdays: string;
    saturday: string;
    sunday: string;
    sendMessage: string;
    replyTime: string;
  };

  // Footer
  footer: {
    quickLinks: string;
    openingHours: string;
    contactUs: string;
    allRightsReserved: string;
  };

  // Footer Navigation
  footerNav?: {
    // Section headers
    trustedReviews: string;
    products: string;
    learn: string;
    popularArticles: string;
    company: string;
    // Product links
    trialSize: string;
    standardSize: string;
    familyPack: string;
    compareSizes: string;
    // Learn links
    howItWorks: string;
    faq: string;
    science: string;
    scienceHub?: string;
    safetyInfo: string;
    catLitterGuide: string;
    catLitterAnswers: string;
    carbonVsBakingSoda: string;
    ammoniaSolutions: string;
    litterCalculator: string;
    // Article links
    houseSmells: string;
    multiCatGuide: string;
    triedEverything: string;
    powerfulAbsorber: string;
    smallApartments: string;
    // Company links
    about: string;
    blog: string;
    locations: string;
    stockists: string;
    testimonials: string;
    retailers: string;
    retailerPortal: string;
    hospitality: string;
    groomers?: string;
    shelters: string;
    b2bInquiry?: string;
    invest: string;
    affiliateProgram: string;
    results?: string;
    contact: string;
    privacyPolicy: string;
    termsOfService: string;
    // Review platforms
    trustpilot: string;
    googleReviews: string;
    // SEO
    sitemap?: string;
    // New Pages
    caseStudies?: string;
    fun?: string;
    viral?: string;
  };

  // Free Trial
  freeTrial: {
    urgentBanner: string;
    free: string;
  };

  // Free Trial Page
  freeTrialPage: {
    urgentBanner: string;
    free: string;
    claimTrial: string;
    whatYouGet: string;
    freeTrialBag: string;
    // freeShippingDoor: string; // TODO: Restore when free shipping is available
    expertTips: string;
    zeroCommitment: string;
    attention: string;
    limitedQuantity: string;
    alreadyClaimed: string;
    countdownLabels: {
      hours: string;
      minutes: string;
      seconds: string;
    };
    testimonials: Array<{
      text: string;
      author: string;
    }>;
    testimonialsTestUsers: string;
    claimNow: string;
    warningHighDemand: string;
    privacyNotice: string;
    zeroCommitmentGift: string;
    instantOdorElimination: string;
    completeInstructions: string;
    noShippingFees: string;
    disappearsIn: string;
    limitedTo500: string;
    yourFreeTrialWaits: string;
    betaTestersHeader: string;
    claimFreeTrialNow: string;
    attention100Free: string;
    noCreditCard: string;
    limitedTimeOffer: string;
    restrictionsApply: string;
    highDemandWarning: string;
    disclaimer: string;
  };

  // Contact Page
  contactPage: {
    title: string;
    subtitle: string;
    chooseContactMethod: string;
    contactReasons: Array<{
      value: string;
      label: string;
    }>;
    contactMethods: Array<{
      title: string;
      description: string;
      responseTime: string;
    }>;
    form: {
      fullName: string;
      emailAddress: string;
      subject: string;
      message: string;
      contactReason: string;
      orderNumber: string;
      submit: string;
      submitting: string;
      successMessage: string;
      errorMessage: string;
      sendingMessage: string;
      sendMessage: string;
      subjectPlaceholder: string;
      messagePlaceholder: string;
      orderNumberPlaceholder: string;
      contactNow: string;
    };
    faqs: Array<{
      question: string;
      answer: string;
    }>;
    businessHours: {
      title: string;
      weekdays: string;
      saturday: string;
      sunday: string;
      closed: string;
    };
    location: {
      title: string;
      address: string;
      shippingNote: string;
    };
    frequentlyAskedQuestions: string;
    quickAnswersCommon: string;
    dontSeeQuestion: string;
    viewCompleteFAQ: string;
    backToHome: string;
  };

  // Product Comparison
  productComparison: {
    title: string;
    subtitle: string;
    findPerfectSize: string;
    products: Array<{
      id: string;
      name: string;
      subtitle: string;
      duration: string;
      cats: string;
      features: string[];
      bestFor: string;
      cta: string;
    }>;
    comparisonFeatures: Array<{
      feature: string;
    }>;
    usageCalculator: {
      title: string;
      subtitle: string;
      numberOfCats: string;
      typicalChanges: string;
      estimateDuration: string;
    };
    stillUnsure: string;
    stillUnsureDescription: string;
    getPersonalizedAdvice: string;
    tryRiskFree: string;
    learnMoreAboutPurrify: string;
    featuresComparison: string;
    seeHowProductsCompare: string;
    howLongWillEachSizeLast: string;
    popular: string;
    bestValue: string;
    perfectForFirstTime: string;
    idealForSingleCat: string;
    perfectForMultiCat: string;
    economicChoice: string;
    maxValuePerGram: string;
    bulkSavingsIncluded: string;
    sustainableSupply: string;
    // freeShippingIncluded: string; // TODO: Restore when free shipping is available
    features: string;
    idealFor: string;
    duration: string;
    saveMoney: string;
    getBestValue: string;
    chooseThisSize: string;
    tryWithoutRisk: string;
    chooseSmallSize: string;

    // SEO
    seo: {
      title: string;
      description: string;
    };

    // Table Headers
    tableHeaders: {
      feature: string;
      trial: string;
      regular: string;
      large: string;
    };

    // Calculation Units
    units: {
      cat: string;
      cats: string;
      week: string;
      weeks: string;
      day: string;
      days: string;
      weekly: string;
      perWeek: string;
    };

    // Related Pages
    relatedPages: Array<{
      title: string;
      description: string;
      link: string;
    }>;
  };

  // Products Page - Direct Response Copywriting Style
  productsPage?: {
    hero?: {
      headline: string;
      subheadline: string;
      supporting: string;
    };
    quickDecision?: {
      title: string;
      subtitle: string;
      trial?: {
        question: string;
        answer: string;
        detail: string;
      };
      regular?: {
        question: string;
        answer: string;
        detail: string;
      };
      large?: {
        question: string;
        answer: string;
        detail: string;
      };
    };
    trustSignals?: {
      waterFilter?: {
        title: string;
        description: string;
      };
      ingredients?: {
        title: string;
        description: string;
      };
      science?: {
        title: string;
        description: string;
      };
    };
    products?: {
      trial?: {
        name: string;
        subtitle: string;
        features: string[];
        bestFor: string;
      };
      regular?: {
        name: string;
        subtitle: string;
        features: string[];
        bestFor: string;
      };
      large?: {
        name: string;
        subtitle: string;
        features: string[];
        bestFor: string;
      };
    };
    whatYouGet?: {
      title: string;
      subtitle: string;
      benefits: Array<{
        title: string;
        description: string;
      }>;
    };
    didYouKnow?: {
      title: string;
      body: string;
    };
    cta?: {
      title: string;
      subtitle: string;
      secondary: string;
    };
    relatedPages?: Array<{
      title: string;
      description: string;
      link: string;
    }>;
    testimonial?: {
      quote: string;
      author: string;
      location: string;
      details: string;
      headline: string;
    };
  };

  // Privacy Policy
  privacyPolicy: {
    title: string;
    lastUpdated: string;
    sections: Array<{
      title: string;
      content: string;
      items?: string[];
    }>;
    contactInfo: {
      email: string;
      phone: string;
      address: string;
    };
  };

  // FAQ Items
  faqItems: Array<{
    id: number;
    category: string;
    question: string;
    answer: string;
    popular: boolean;
    tags: string[];
  }>;

  // FAQ Categories
  faqCategories: Array<{
    id: string;
    name: string;
    count: number;
  }>;

  // FAQ Page
  faqPage: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    popularQuestions: string;
    quickAnswers: string;
    categories: string;
    questionsFound: string;
    questionsFoundPlural?: string;
    clearSearch: string;
    noQuestionsFound: string;
    adjustSearchTerms: string;
    stillHaveQuestions: string;
    cantFindWhatLooking: string;
    customerSupportReady: string;
    emailSupport: string;
    detailedEmailHelp: string;
    liveChat: string;
    realTimeChatHelp: string;
    phoneSupport: string;
    speakDirectlyTeam: string;
    contactUs: string;
    startChat: string;
    callNow: string;
    readyToTryPurrify: string;
    startWithRiskFreeTrial: string;
    compareAllSizes: string;
    tryRiskFree?: string;
    learnMoreAboutPurrify?: string;
    howItWorks?: string;
    learnScience?: string;
    catLitterGuide?: string;
    completeGuide?: string;
    customerStories?: string;
    realExperiences?: string;
    popularTag?: string;
    breadcrumbs?: {
      home: string;
      learn: string;
      faq: string;
    };
    categoryList?: Array<{
      name: string;
    }>;
    faqItems?: Array<{
      question: string;
      answer: string;
    }>;
  };

  // Enhanced Product Comparison
  enhancedProductComparison?: {
    compareAndSave: string;
    chooseYourPerfectSize: string;
    purrifySize?: string;
    subtitle: string;
    trial: string;
    mostPopular: string;
    bestValue: string;
    premium: string;
    perfectForFirstTime: string;
    idealForSingleCat: string;
    perfectForMultiCat: string;
    duration: string;
    coverage: string;
    odorControl: string;
    odorControlTrial: string;
    odorControlMedium: string;
    odorControlLarge: string;
    naturalIngredients: string;
    easyApplication: string;
    moneyBackGuarantee: string;
    freeShipping: string;
    freeShippingDetailed?: string;
    bulkDiscount: string;
    prioritySupport: string;
    tryRiskFree: string;
    chooseThisSize: string;
    chosenByCustomers: string;
    whyChoosePurrify: string;
    joinThousands: string;
    happyCustomers: string;
    averageRating: string;
    satisfactionRate: string;
    odorFreeGuarantee: string;
    moneyBackGuaranteeText: string;
    autoshipHero?: string;
    autoshipHighlight?: string;
  };

  // Subscription Offer
  subscriptionOffer?: {
    subscribeAndSave: string;
    neverRunOut: string;
    subtitle: string;
    monthly: string;
    everyTwoMonths: string;
    quarterly: string;
    save: string;
    mostFlexible: string;
    bestValue: string;
    maxSavings: string;
    oneTimePurchase: string;
    subscriptionBenefits: string;
    // freeShipping: string; // TODO: Restore when free shipping is available
    exclusiveDiscounts: string;
    prioritySupport: string;
    flexibleSchedule: string;
    cancelAnytime: string;
    startSubscription: string;
    selectPlan: string;
    popularChoice: string;
  };

  // Urgency Banner
  urgencyBanner?: {
    limitedTime: string;
    saveToday: string;
    onAllOrders: string;
    // freeShipping: string; // TODO: Restore when free shipping is available
    hurryOffer: string;
    claimDiscount: string;
    timeLeft: string;
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
    onlyLeft: string;
    inStock: string;
    orderNow: string;
  };

  // Email Capture Popup
  emailCapture?: {
    waitDontGo: string;
    exclusiveOffer: string;
    subtitle: string;
    emailPlaceholder: string;
    claimDiscount: string;
    noThanks: string;
    instantAccess: string;
    limitedTime: string;
    successMessage: string;
    errorMessage: string;
  };

  // Reviews Section
  reviewsSection?: {
    customerReviews: string;
    realStories: string;
    verifiedReviews: string;
    averageRating: string;
    readMore: string;
    writeReview: string;
    helpful: string;
    verified: string;
    productUsed: string;
    catsOwned: string;
    useCase: string;
  };

  // Case Studies
  caseStudies?: {
    customerSuccess: string;
    realResults: string;
    detailedStories: string;
    averageOdorReduction: string;
    timeToSeeResults: string;
    customerSatisfaction: string;
    catsPerStudy: string;
    theChallenge: string;
    theSolution: string;
    theResults: string;
    longTermOutcome: string;
    keyPainPoints: string;
    implementation: string;
    writeYourStory: string;
    joinSatisfied: string;
    shopPurrify: string;
    tryFreeSample: string;
    moreCustomerStories: string;
    videoTestimonials: string;
    productComparison: string;
  };

  // Additional Subscription Offer Translations
  subscriptionOfferExtended: {
    autoshipBadge?: string;
    headline?: string;
    supportingCopy?: string;
    perMonthLabel?: string;
    saveVsOneTime?: string;
    skipOrCancelAnytime: string;
    shippingIncluded?: string;
    freeShippingIncluded?: string;
    priorityCustomerSupport: string;
    startAutoship: string;
    linkComingSoon?: string;
    quarterlyBilling?: string;
    autoshipHero?: string;
    autoshipHighlight?: string;
    standardPlanTitle?: string;
    standardDescription?: string;
    includesThreeStandard?: string;
    familyPlanTitle?: string;
    familyDescription?: string;
    includesThreeFamily?: string;
    bestValueBadge?: string;
    save?: string;
    joinThePurrifyFamily?: string;
  };

  // Payment Security
  paymentSecurity: {
    securePayment: string;
    sslEncrypted: string;
    sslEncryptedCheckout: string;
  };

  // Testimonials Section
  testimonialsSection: {
    customerLove: string;
    littersOfLove: string;
    dontJustTakeOurWord: string;
    readMoreReviews: string;
  };

  // Trust Badges
  trustBadges?: {
    moneyBack: {
      title: string;
      description: string;
      highlight: string;
    };
    securePayment: {
      title: string;
      description: string;
      highlight: string;
    };
    fastShipping: {
      title: string;
      description: string;
      highlight: string;
    };
    customerRating: {
      title: string;
      description: string;
      highlight: string;
    };
    happyCustomers: {
      title: string;
      description: string;
      highlight: string;
    };
    premiumQuality: {
      title: string;
      description: string;
      highlight: string;
    };
  };

  // Common UI Elements
  ui: {
    // Review System
    allRatings: string;
    allSizes: string;
    newestFirst: string;
    oldestFirst: string;
    highestRated: string;
    lowestRated: string;
    mostHelpful: string;
    verifiedPurchase: string;

    // Payment & Cart
    securePayment: string;
    shoppingCart: string;

    // General
    happyCustomers: string;
    moneyBack: string;
    averageRating: string;
    satisfactionRate: string;
    // freeShipping: string; // TODO: Restore when free shipping is available
    skipAnytime: string;
    highlyRated: string;
    errorDetails: string;
    moneyBackGuarantee: string;
  };

  // Exit Intent Popup
  exitPopup?: {
    title: string;
    subtitle: string;
    description: string;
    placeholder: string;
    button: string;
    noThanks: string;
    successTitle: string;
    successMessage: string;
  };

  // Homepage specific translations
  homepage: {
    seo: {
      pageTitle: string;
      keywords: string;
      openGraphImageAlt: string;
      videoAlt: string;
      videoDescription: string;
      videoEffectivenessDemo: string;
    };
    trustBadges: {
      securePayment: {
        title: string;
        description: string;
        detail: string;
      };
    };
    socialProof: {
      nationalDelivery: string;
      fastDelivery: string;
      recentOrders: string;
    };
    hero: {
      videoAriaLabel: string;
      videoFallbackText: string;
      videoDescriptions: string;
      highlyRated: string;
      moneyBackGuarantee: string;
      freeShippingCanada: string;
    };
    enhancedComparison: {
      duration: string;
      coverage: string;
      chooseYourPerfectSize: string;
      allSizesDeliver: string;
      whyChoosePurrify: string;
      joinThousands: string;
      happyCustomers: string;
      averageRating: string;
      satisfactionRate: string;
      odorFreeGuarantee: string;
      tryRiskFree: string;
      chooseThisSize: string;
    };
    altText: {
      scientificDiagram: string;
      productPackages: string;
      microscopicView: string;
      happyCat: string;
      happyCatAlt: string;
      userAvatar: string;
      customerTestimonials: string;
      leaveGoogleReview: string;
      litterCompatibility: string;
    };
    subscription: {
      fastDelivery: string;
      quickReliableShipping: string;
      skipAnytime: string;
      fullControlDeliveries: string;
      lovedByCustomers: string;
      joinSatisfiedCustomers: string;
      thirtyDayGuarantee: string;
      moneyBackPromise: string;
      fiveStarRated: string;
      reviewsRating: string;
      testimonialQuote: string;
    };
  };

  // Blog
  blog: {
    multiCat: {
      title: string;
      description: string;
      category: string;
      publishDate: string;
      readTime: string;
      breadcrumb: string;
      stats: {
        title: string;
        strongerOdors: string;
        litterBoxes: string;
        moreDeodorizer: string;
        maintenance: string;
      };
    };
    odorAbsorber: {
      title: string;
      description: string;
      category: string;
      publishDate: string;
      readTime: string;
      breadcrumb: string;
      stats: {
        title: string;
        ammoniaReduction: string;
        adsorptionSpeed: string;
        safeUsage: string;
        refreshTiming: string;
      };
    };
  };

  // Retailers & B2B
  retailers: {
    seo: {
      pageTitle: string;
      description: string;
      openGraphAlt: string;
      keywords: string;
    };
    map: {
      title: string;
      description: string;
    };
    hero: {
      badge: string;
      title: string;
      subtitle: string;
      description: string;
      boostYour?: string;
      petStoreProfits?: string;
      mainDescription?: string;
      retailerCount?: string;
      marginHighlight?: string;
      stats?: {
        profitMargins?: {
          value: string;
          label: string;
        };
        repurchaseRate?: {
          value: string;
          label: string;
        };
        setupTime?: {
          value: string;
          label: string;
        };
      };
      cta: {
        primary: string;
        secondary: string;
        startPartnership?: string;
        viewPricing?: string;
      };
      trustIndicators?: {
        label: string;
        types: {
          petStores: string;
          vetClinics: string;
          groomers: string;
          distributors: string;
        };
      };
      valueProps?: {
        highMargin?: {
          title: string;
          highlight: string;
          description: string;
        };
        customerLoyalty?: {
          title: string;
          highlight: string;
          description: string;
        };
        completeSupport?: {
          title: string;
          highlight: string;
          description: string;
        };
      };
    };
    benefits: {
      pricing: {
        title: string;
        description: string;
      };
      marketing: {
        title: string;
        description: string;
      };
      proven: {
        title: string;
        description: string;
      };
      highDemand: {
        title: string;
        description: string;
      };
      highMargins: {
        title: string;
        description: string;
      };
      easyStocking: {
        title: string;
        description: string;
      };
      marketingSupport: {
        title: string;
        description: string;
      };
      customerLoyalty: {
        title: string;
        description: string;
      };
      fastMoving: {
        title: string;
        description: string;
      };
      title: string;
      description: string;
      success: {
        title: string;
      };
    };
    pricing: {
      title: string;
      description: string;
      tiers: {
        starter: {
          name: string;
          description: string;
        };
        growth: {
          name: string;
          description: string;
        };
        enterprise: {
          name: string;
          description: string;
        };
      };
      additional: {
        title: string;
        description: string;
      };
    };
    marketing: {
      title: string;
      description: string;
      coop: {
        title: string;
        description: string;
      };
    };
    testimonials: {
      title: string;
      description: string;
      metrics: {
        title: string;
      };
    };
    wholesalePricing?: {
      sectionBadge?: string;
      title?: string;
      titleHighlight?: string;
      subtitle?: string;
      packageIncludes?: string;
      tiers?: {
        starter?: {
          name: string;
          description: string;
          contents: string[];
          features: string[];
          badge: string;
          cta: string;
        };
        growth?: {
          name: string;
          description: string;
          contents: string[];
          features: string[];
          badge: string;
          cta: string;
        };
        scale?: {
          name: string;
          description: string;
          contents: string[];
          features: string[];
          badge: string;
          cta: string;
        };
      };
      trustSignals?: {
        noSetupFees: string;
        approval72hr: string;
        provenROI: string;
      };
      bottomCta?: {
        title: string;
        description: string;
        setupNote: string;
        primaryButton: string;
        secondaryButton?: string;
      };
    };
    contact: {
      title: string;
      description: string;
      sectionBadge?: string;
      sectionTitle?: string;
      sectionTitleHighlight?: string;
      sectionDescription?: string;
      setupNote?: string;
      formTitle?: string;
      formSubtitle?: string;
      form?: {
        title?: string;
        subtitle?: string;
        fields?: {
          businessName?: {
            label: string;
            placeholder: string;
            required?: boolean;
          };
          contactName?: {
            label: string;
            placeholder: string;
            required?: boolean;
          };
          email?: {
            label: string;
            placeholder: string;
            required?: boolean;
          };
          phone?: {
            label: string;
            placeholder: string;
            required?: boolean;
          };
          position?: {
            label: string;
            placeholder: string;
            required?: boolean;
          };
          businessType?: {
            label: string;
            placeholder: string;
            required?: boolean;
            options?: {
              independentPetStore?: string;
              petStoreChain?: string;
              vetClinic?: string;
              veterinaryClinic?: string;
              groomer?: string;
              groomingSalon?: string;
              breeder?: string;
              distributor?: string;
              onlineRetailer?: string;
              other?: string;
            };
          };
          locations?: {
            label: string;
            placeholder: string;
            required?: boolean;
          };
          currentProducts?: {
            label: string;
            placeholder: string;
            required?: boolean;
          };
          monthlyVolume?: {
            label: string;
            placeholder: string;
            required?: boolean;
          };
          message?: {
            label: string;
            placeholder: string;
            required?: boolean;
          };
        };
        submit?: string;
        submitting?: string;
        submitButton?: string;
        required?: string;
      };
      success?: {
        title?: string;
        description?: string;
        welcome?: string;
        responseTime?: string;
        whatNext?: string;
        steps?: string[];
        submitAnother?: string;
        backToRetailers?: string;
        nextSteps?: {
          title?: string;
          step1?: {
            title: string;
            description: string;
          };
          step2?: {
            title: string;
            description: string;
          };
          step3?: {
            title: string;
            description: string;
          };
        };
        timeline?: {
          title?: string;
          approval?: {
            value: string;
            label: string;
          };
          firstShipment?: {
            value: string;
            label: string;
          };
          firstSales?: {
            value: string;
            label: string;
          };
        };
        needHelp?: string;
      };
      successStories?: {
        title?: string;
        subtitle?: string;
        stories?: {
          petPalace?: {
            businessName?: string;
            business?: string;
            businessType?: string;
            quote: string;
            metric?: string;
            author?: string;
            role?: string;
            location?: string;
          };
          healthyPaws?: {
            businessName?: string;
            business?: string;
            businessType?: string;
            quote: string;
            metric?: string;
            author?: string;
            role?: string;
            location?: string;
          };
          [key: string]: {
            businessName?: string;
            business?: string;
            businessType?: string;
            quote: string;
            metric?: string;
            author?: string;
            role?: string;
            location?: string;
          } | undefined;
        };
      };
      contactInfo?: {
        title?: string;
        subtitle?: string;
        wholesaleEmail?: string;
        emailLabel?: string;
        emailHint?: string;
        businessHours?: {
          title?: string;
          hours?: string;
        };
        copied?: string;
        copyFailed?: string;
        email?: {
          label: string;
          value: string;
        };
        phone?: {
          label: string;
          value: string;
        };
        hours?: {
          label: string;
          value: string;
        };
      };
      urgencyStats?: {
        title?: string;
        approvalTime?: {
          value: string;
          label: string;
        };
        setupFees?: {
          value: string;
          label: string;
        };
        currentPartners?: {
          value: string;
          label: string;
        };
        retailers?: {
          value: string;
          label: string;
        };
        margin?: {
          value: string;
          label: string;
        };
        support?: {
          value: string;
          label: string;
        };
      };
      errors?: {
        general?: string;
        requiredFields?: string;
        invalidEmail?: string;
        invalidPhone?: string;
        defaultSuccess?: string;
        submitFailed?: string;
      };
    };
  };

  seoKeywords?: {
    headTerms: string[];
    symptomVariants: string[];
    solutionVariants: string[];
    modifiers: {
      housing: string[];
      seasonal: string[];
      retailer: string[];
    };
  };

  // Scrolling Announcement Bar
  scrollingBar?: {
    freeShipping: string;
    madeInCanada: string;
  };

  // Maps
  maps?: {
    findNearYou: string;
    discoverWhere: string;
    retailStores: string;
    cities: {
      montreal: string;
      quebec: string;
      toronto: string;
      vancouver: string;
      calgary: string;
      ottawa: string;
    };
    iframeTitle: string;
  };

  // Upsell Page
  upsell?: {
    pageTitle: string;
    metaDescription: string;
    offerExpired: string;
    offerExpiresIn: string;
    headline: string;
    subheadline: string;
    saveBadge: string;
    productTitle: string;
    productSubtitle: string;
    youSave: string;
    benefit1: string;
    benefit2: string;
    benefit3: string;
    benefit4: string;
    benefit5: string;
    processing: string;
    addToOrder: string;
    noThanks: string;
    feature1Title: string;
    feature1Description: string;
    feature2Title: string;
    feature2Description: string;
    feature3Title: string;
    feature3Description: string;
    testimonialText: string;
    testimonialAuthor: string;
    faqTitle: string;
    faq1Question: string;
    faq1Answer: string;
    faq2Question: string;
    faq2Answer: string;
    faq3Question: string;
    faq3Answer: string;
    bottomNote: string;
    returnHome: string;
  };

  // Affiliate Page
  affiliate?: {
    metaTitle: string;
    metaDescription: string;
    hero: {
      badge: string;
      title: string;
      subtitle: string;
      primaryCTA: string;
      secondaryCTA: string;
    };
    calculator: {
      title: string;
      subtitle: string;
      standardProduct: string;
      familyPack: string;
      perSale: string;
      monthlyIncome: string;
      yearlyIncome: string;
      disclaimer: string;
      cta: string;
    };
    howItWorks: {
      title: string;
      step1: {
        title: string;
        description: string;
      };
      step2: {
        title: string;
        description: string;
      };
      step3: {
        title: string;
        description: string;
      };
    };
    benefits: {
      title: string;
      subtitle: string;
      benefit1: {
        title: string;
        description: string;
      };
      benefit2: {
        title: string;
        description: string;
      };
      benefit3: {
        title: string;
        description: string;
      };
      benefit4: {
        title: string;
        description: string;
      };
    };
    testimonials: {
      title: string;
      testimonial1: {
        quote: string;
        name: string;
        role: string;
      };
      testimonial2: {
        quote: string;
        name: string;
        role: string;
      };
      testimonial3: {
        quote: string;
        name: string;
        role: string;
      };
    };
    faq: {
      title: string;
      question1: string;
      answer1: string;
      question2: string;
      answer2: string;
      question3: string;
      answer3: string;
      question4: string;
      answer4: string;
      question5: string;
      answer5: string;
    };
    finalCTA: {
      title: string;
      subtitle: string;
      cta: string;
      disclaimer: string;
    };
  };

  // Ammonia Control Landing Page
  ammonia: {
    meta: {
      title: string;
      description: string;
    };
    breadcrumb: string;
    hero: {
      headline: string;
      subheadline: string;
      cta: string;
      secondaryCta: string;
    };
    trust: {
      happyCats: string;
    };
    understanding: {
      headline: string;
      intro: string;
      chemistry: { title: string; description: string; formula: string };
      factors: { title: string; point1: string; point2: string; point3: string; point4: string };
      health: { title: string; description: string };
    };
    problem: {
      headline: string;
      intro?: string;
      card1: { title: string; description: string };
      card2: { title: string; description: string };
      card3: { title: string; description: string };
      card4: { title: string; description: string };
    };
    solution: {
      headline: string;
      intro?: string;
      description: string;
      adsorption: { title: string; description: string };
      pores: { title: string; micro: string; meso: string; macro: string; description?: string };
      surface: { title: string; stat: string; comparison: string; explanation?: string };
    };
    benefits: {
      headline: string;
      intro?: string;
      pillar1: { title: string; intro?: string; description: string; detail?: string };
      pillar2: { title: string; intro?: string; description: string; detail?: string };
      pillar3: { title: string; intro?: string; description: string; detail?: string };
    };
    howToUse: {
      headline: string;
      intro: string;
      step1: { number?: string; title: string; description: string };
      step2: { number?: string; title: string; description: string };
      step3: { number?: string; title: string; description: string };
      proTip?: { title: string; description: string };
      tips: { title: string; tip1: string; tip2: string; tip3: string };
    };
    results: {
      headline: string;
      intro: string;
      day1: { title: string; description: string };
      day3: { title: string; description: string };
      week1: { title: string; description: string };
      ongoing: { title: string; description: string };
    };
    comparison: {
      headline: string;
      intro: string;
      headers: {
        method: string;
        effectiveness: string;
        duration: string;
        safety: string;
      };
      purrify: {
        method: string;
        effectiveness: string;
        duration: string;
        safety: string;
      };
      bakingSoda: {
        method: string;
        effectiveness: string;
        duration: string;
        safety: string;
      };
      scented: {
        method: string;
        effectiveness: string;
        duration: string;
        safety: string;
      };
      airFreshener: {
        method: string;
        effectiveness: string;
        duration: string;
        safety: string;
      };
      frequentChanges: {
        method: string;
        effectiveness: string;
        duration: string;
        safety: string;
      };
      note: string;
    };
    stats: {
      days: { value: string; label: string };
      savings: { value: string; label: string };
      surfaceArea?: { value: string; label: string };
      natural?: { value: string; label: string };
      customers?: { value: string; label: string };
      rating?: { value: string; label: string };
    };
    faq: {
      headline: string;
      q1: string; a1: string;
      q2: string; a2: string;
      q3: string; a3: string;
      q4: string; a4: string;
      q5: string; a5: string;
      q6: string; a6: string;
      q7: string; a7: string;
      q8: string; a8: string;
    };
    cta: {
      headline: string;
      subheadline: string;
      button: string;
      secondaryButton: string;
      benefit1?: string;
      benefit2: string;
    };
  };

  // B2B Vertical Pages (optional - fallbacks used when not provided)
  veterinarians?: B2BPageType;
  catCafes?: B2BPageType;
  shelters?: B2BPageType;
  groomers?: B2BPageType;
  hospitality?: B2BPageType;
  results?: B2BPageType;

  // B2B Case Studies Section
  b2bCaseStudies?: {
    badge: string;
    title: string;
    subtitle: string;
    cta: string;
    ctaButton: string;
    businessTypes: {
      veterinarian: string;
      catCafe: string;
      shelter: string;
      groomer: string;
      hospitality: string;
    };
    labels: {
      challenge: string;
      solution: string;
      catsServed: string;
    };
  };

  // Referral Program - Sprint 6C
  referral?: {
    dashboard: {
      title: string;
      loginRequired: string;
      signIn: string;
      retry: string;
      generateDescription: string;
      generateButton: string;
      generating: string;
    };
    stats: {
      completedReferrals: string;
      totalEarned: string;
      availableCredit: string;
      pending: string;
    };
    milestone: {
      title: string;
      referrals: string;
      nextReward: string;
    };
    rewards: {
      title: string;
      credit: string;
      available: string;
    };
    activity: {
      title: string;
      completed: string;
      pending: string;
    };
    widget: {
      title: string;
      giveGet: string;
      description: string;
      shareDescription: string;
      yourCode: string;
      shareLink: string;
      copy: string;
      copyCode: string;
      copyLink: string;
      copied: string;
      shareVia: string;
      howItWorks: string;
      step1: string;
      step2: string;
      step3: string;
    };
    share: {
      email: string;
      sms: string;
      link: string;
    };
    checkout: {
      haveCode: string;
      enterReferralCode: string;
      enterCode: string;
      emailRequired: string;
      invalidCode: string;
      error: string;
      apply: string;
      applying: string;
      applied: string;
      referredBy: string;
      off: string;
      remove: string;
      discountNote: string;
    };
  };

  // Try Free Page - Landing page for ad campaigns
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tryFreePage?: Record<string, any>;

  // City Page Translations (for location-based SEO pages)
  cityPage?: {
    seo: {
      title: string;
      descriptionWithPopulation: string;
      descriptionDefault: string;
    };
    loading: string;
    hero: {
      heading: string;
      subheading: string;
    };
    whyChoose: {
      heading: string;
      perfectFor: string;
      fastShipping: string;
      worksWithAllBrands: string;
    };
    cta: {
      tryInCity: string;
      seeHowItWorks: string;
      shopOnline: string;
      submitVideo: string;
      writeReview: string;
      exploreTestimonials: string;
    };
    whereToFind: {
      heading: string;
      localStore: {
        heading: string;
        description: string;
        tip: string;
      };
      orderDirect: {
        heading: string;
        description: string;
      };
    };
    playbook: {
      heading: string;
      step1: string;
      step2: string;
      step3: string;
    };
    testimonials: {
      heading: string;
      wasHelpful: string;
      shareStory: {
        heading: string;
        description: string;
      };
    };
    provinceWide: {
      heading: string;
      description: string;
      averageRating: string;
      happyHomes: string;
      fastShipping: string;
    };
    faq: {
      heading: string;
      delivery: {
        question: string;
        answer: string;
      };
      painPoint: {
        question: string;
        answer: string;
      };
      litterBrands: {
        question: string;
        answer: string;
      };
      climate: {
        question: string;
        answer: string;
      };
      stores: {
        question: string;
        answer: string;
      };
      multiCat: {
        question: string;
        answer: string;
      };
    };
  };

  // Locations Hub and Province Pages
  locations?: {
    hub: {
      badge: string;
      heading: string;
      description: string;
      selectProvince: string;
      whyChoose: string;
      benefit1: string;
      benefit2: string;
      benefit3: string;
      shopCta: string;
      citiesAvailable: string;
      cityAvailable: string;
      viewGuide: string;
      fastShipping: {
        title: string;
        description: string;
      };
      naturalSolution: {
        title: string;
        description: string;
      };
      localSupport: {
        title: string;
        description: string;
      };
    };
    province: {
      badge: string;
      heading: string;
      description: string;
      citiesHeading: string;
      viewCityGuide: string;
      cityCardDescription: string;
      exploreOther: string;
      orderOnline: string;
      orderDescription: string;
    };
  };

  // Thank You / Order Confirmation Page
  thankYou?: {
    heading: string;
    headingWithName: string;
    subheading: string;
    subheadingExtended: string;
    orderConfirmed: string;
    orderNumber: string;
    product: string;
    quantity: string;
    total: string;
    expectedDelivery: string;
    deliveryCA: string;
    deliveryUS: string;
    deliveryIntl: string;
    shipsWithin: string;
    confirmationSent: string;
    checkSpam: string;
    trackingInfo: string;
    whatToExpect: {
      heading: string;
      step1Title: string;
      step1Desc: string;
      step2Title: string;
      step2Desc: string;
      step2Item1: string;
      step2Item2: string;
      step2Item3: string;
      step2Item4: string;
      step3Title: string;
      step3Desc: string;
      proTip: string;
      proTipText: string;
    };
    shareSection: {
      heading: string;
      description: string;
      generating: string;
      whatsapp: string;
      facebook: string;
      email: string;
    };
    autoshipCta: {
      heading: string;
      saveBadge: string;
      description: string;
      savings: string;
      shipping: string;
      cancel: string;
      button: string;
    };
    helpSection: {
      question: string;
      weAreHere: string;
      returnHome: string;
    };
    questionsHeading: string;
    questionsDescription: string;
    contactSupport: string;
    continueShopping: string;
    referralCta: {
      heading: string;
      description: string;
      button: string;
    };
  };

  // Reviews Page
  reviews?: {
    heading: string;
    subheading: string;
    verifiedPurchase: string;
    helpful: string;
    writeReview: string;
    filterBy: string;
    allRatings: string;
    sortBy: string;
    mostRecent: string;
    mostHelpful: string;
    highestRated: string;
    lowestRated: string;
    showingReviews: string;
    noReviews: string;
    loadMore: string;
  };

  // Reviews Page (Full Page)
  reviewsPage?: {
    pageTitle: string;
    metaDescription: string;
    badge: string;
    heading: string;
    description: string;
    breadcrumb: {
      home: string;
      reviews: string;
    };
    stats: {
      averageRating: string;
      verifiedReviews: string;
      happyCustomers: string;
      monthsInMarket: string;
    };
    reviewCard: {
      verified: string;
      product: string;
      cats: string;
      useCase: string;
    };
    trustSection: {
      heading: string;
      verifiedTitle: string;
      verifiedDesc: string;
      ratingTitle: string;
      ratingDesc: string;
      customersTitle: string;
      customersDesc: string;
    };
    ctaSection: {
      heading: string;
      description: string;
      shopNow: string;
      tryFreeSample: string;
    };
    relatedLinks: {
      heading: string;
      comparison: string;
      comparisonDesc: string;
      caseStudies: string;
      caseStudiesDesc: string;
      usageInfo: string;
      usageInfoDesc: string;
      storeLocations: string;
      storeLocationsDesc: string;
    };
  };

  // Related Articles Section
  relatedArticles?: {
    title: string;
    readMore: string;
  };

  // Review System Component
  reviewSystem?: {
    customerReviews: string;
    reviews: string;
    basedOn: string;
    wouldRecommend: string;
    verifiedPurchases: string;
    viewAllReviews: string;
    loadMoreReviews: string;
    filters: {
      allRatings: string;
      stars: string;
      star: string;
      allSizes: string;
      trial: string;
      regular: string;
      large: string;
    };
    sort: {
      newestFirst: string;
      oldestFirst: string;
      highestRated: string;
      lowestRated: string;
      mostHelpful: string;
    };
    review: {
      verifiedPurchase: string;
      size: string;
      cat: string;
      cats: string;
      usingFor: string;
      helpful: string;
      recommendsProduct: string;
    };
  };

  // Social Follow CTA
  socialFollow?: {
    headline: string;
    description: string;
    followOn: string;
  };

  // Offline Page
  offlinePage?: {
    title: string;
    description: string;
    tryAgain: string;
    goHome: string;
    availableOffline: string;
    cachedPages: {
      homepage: string;
      trialSize: string;
      howItWorks: string;
      contactSupport: string;
    };
    emergencyContact: string;
  };

  // Forms (standardized messages)
  forms?: {
    success: {
      general: string;
      b2bContact: string;
      retailerContact: string;
      hospitalityContact: string;
      shelterContact: string;
      groomerContact: string;
      vetContact: string;
      catCafeContact: string;
    };
    errors: {
      pleaseEnterTitle: string;
      invalidEmail: string;
      requiredField: string;
      submitFailed: string;
    };
  };

  // Product Pages
  productPages?: {
    cancelAnytime: string;
    shipsFree: string;
    subscribeAndSave: string;
    save: string;
    savePercent: string;
    perMonth: string;
    billedQuarterly: string;
    shippingSavings: string;
    save25vsStandard: string;
    save25FamilyPack: string;
  };

  // Affiliate Dashboard
  affiliateDashboard?: {
    // Page titles
    pageTitle: string;
    loginTitle: string;

    // Navigation & common
    dashboard: string;
    earnings: string;
    payouts: string;
    settings: string;
    logout: string;

    // Dashboard overview
    overview: {
      welcome: string;
      yourCode: string;
      copyCode: string;
      copiedCode: string;
      shareLink: string;
      copyLink: string;
      copiedLink: string;
    };

    // Stats cards
    stats: {
      totalClicks: string;
      totalConversions: string;
      conversionRate: string;
      pendingEarnings: string;
      availableBalance: string;
      totalEarnings: string;
      pendingNote: string;
    };

    // Recent conversions table
    conversions: {
      title: string;
      noConversions: string;
      date: string;
      orderId: string;
      orderAmount: string;
      commission: string;
      status: string;
      statusPending: string;
      statusCleared: string;
      statusPaid: string;
      statusVoided: string;
    };

    // Payouts section
    payoutsSection: {
      title: string;
      requestPayout: string;
      minimumPayout: string;
      payoutMethod: string;
      paypalEmail: string;
      etransferEmail: string;
      amount: string;
      requestedDate: string;
      processedDate: string;
      status: string;
      statusPending: string;
      statusProcessing: string;
      statusCompleted: string;
      statusRejected: string;
      noPayouts: string;
      insufficientBalance: string;
      payoutRequested: string;
    };

    // Settings section
    settingsSection: {
      title: string;
      payoutSettings: string;
      payoutMethodLabel: string;
      paypalOption: string;
      etransferOption: string;
      emailLabel: string;
      saveSettings: string;
      settingsSaved: string;
    };

    // Marketing assets section
    assets: {
      title: string;
      description: string;
      banners: string;
      productImages: string;
      socialPosts: string;
      brandGuide: string;
      brandColors: string;
      guidelines: string;
      downloadAll: string;
      copyText: string;
    };

    // Login form
    login: {
      title: string;
      email: string;
      password: string;
      rememberMe: string;
      forgotPassword: string;
      loginButton: string;
      loggingIn: string;
      noAccount: string;
      applyNow: string;
      invalidCredentials: string;
      accountInactive: string;
    };

    // Errors
    errors: {
      loadFailed: string;
      saveFailed: string;
      payoutFailed: string;
      sessionExpired: string;
    };
  };

  // Science Page
  sciencePage?: {
    seo: {
      title: string;
      description: string;
    };
    breadcrumb: {
      home: string;
      learn: string;
      science: string;
    };
    hero: {
      heading: string;
      description: string;
      ctaButton: string;
    };
    understanding: {
      sectionTitle: string;
      description: string;
      ammonia: {
        title: string;
        subtitle: string;
        smell: string;
        moleculeSize: string;
        problem: string;
        whyHard: string;
      };
      mercaptans: {
        title: string;
        subtitle: string;
        smell: string;
        moleculeSize: string;
        problem: string;
        whyHard: string;
      };
      breakthrough: string;
    };
    imageCaptions: {
      freshHome: {
        title: string;
        description: string;
      };
      noOdors: {
        title: string;
        description: string;
      };
    };
    poreSize: {
      sectionTitle: string;
      description: string;
      micropores: {
        size: string;
        title: string;
        specialist: string;
        target: string;
        density: string;
        function: string;
      };
      mesopores: {
        size: string;
        title: string;
        specialist: string;
        target: string;
        density: string;
        function: string;
      };
      macropores: {
        size: string;
        title: string;
        specialist: string;
        target: string;
        density: string;
        function: string;
      };
      surfaceArea: {
        title: string;
        description: string;
        iodineNumber: string;
        ctcAdsorption: string;
        hardness: string;
        moisture: string;
      };
    };
    scienceFacts: {
      sectionTitle: string;
      description: string;
      facts: Array<{
        title: string;
        description: string;
      }>;
    };
    microscopicView: {
      imageCaptions: {
        microscope: string;
        labTesting: string;
        molecular: string;
      };
      whatYoureLookingAt: {
        title: string;
        description: string;
        bullets: Array<string>;
      };
      quote: {
        text: string;
        attribution: string;
      };
    };
    technicalPerformance: {
      sectionTitle: string;
      description: string;
      particleSize: {
        title: string;
        effectiveSize: string;
        meanDiameter: string;
        uniformityCoefficient: string;
        whyMatters: string;
      };
      adsorption: {
        title: string;
        halfLength: string;
        apparentDensity: string;
        betSurface: string;
        whyMatters: string;
      };
    };
    engineeredPerformance: {
      title: string;
      description: string;
      stats: {
        temperatureRange: string;
        temperatureLabel: string;
        performanceLabel: string;
        pressureLossLabel: string;
      };
    };
    processTimeline: {
      sectionTitle: string;
      description: string;
      steps: Array<{
        title: string;
        description: string;
      }>;
    };
    researchSection: {
      title: string;
      description: string;
      stats: {
        ammoniaSize: string;
        ammoniaSizeLabel: string;
        poreTypes: string;
        poreTypesLabel: string;
        surfaceArea: string;
        surfaceAreaLabel: string;
      };
      buttons: {
        experience: string;
        learnMore: string;
      };
    };
    backToLearn: string;
  };

}

// Common B2B page structure - permissive to allow fallback strings
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type B2BPageType = Record<string, any>;
