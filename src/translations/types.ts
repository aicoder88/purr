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
    socialProof: {
      trustNumber: string;
      trustText: string;
      ratingText: string;
    };
    buttons: {
      shopNow: string;
      reviews: string;
      learnMore?: string;
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
  };

  // FAQ
  faq: {
    title?: string;
    commonQuestions?: string;
    subtitle?: string;
    stillHaveQuestions?: string;
    contactTeam?: string;
    forMoreInfo?: string;
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
      features: {
        weeklyTips: string;
        exclusiveOffers: string;
        earlyAccessProducts: string;
      };
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
  };

  // Enhanced Product Comparison
  enhancedProductComparison?: {
    compareAndSave: string;
    chooseYourPerfectSize: string;
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
      cta: {
        primary: string;
        secondary: string;
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
    contact: {
      title: string;
      description: string;
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
      benefit1: string;
      benefit2: string;
    };
  };
}
