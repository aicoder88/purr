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
    };
    ariaLabels: {
      shopNow: string;
      reviews: string;
      playVideo: string;
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
    natural: {
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
    adding: string;
    viewAllProducts: string;
  };
  
  // Stores Section
  storesSection?: {
    availableInStores: string;
    soldInFollowingStores: string;
    subtitle: string;
    requestStoreAvailability: string;
    dontSeeLocalStore: string;
    callStore: string;
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
    naturalIngredients: string;
    easyApplication: string;
    moneyBackGuarantee: string;
    // freeShipping: string; // TODO: Restore when free shipping is available
    bulkDiscount: string;
    prioritySupport: string;
    bonusGuide: string;
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
    bonusGuide: string;
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
    neverRunOutAgain: string;
    subscribeAndSaveUpTo: string;
    seventyTwoPercent: string;
    joinThousandsHappyCatParents: string;
    getPurrifyDelivered: string;
    monthlyDelivery: string;
    quarterlyDelivery: string;
    biAnnualDelivery: string;
    perfectForSingleCat: string;
    mostPopularMultiCat: string;
    bestValueLargeFamilies: string;
    // freeShippingEveryMonth: string; // TODO: Restore when free shipping is available
    // freeShippingEveryThreeMonths: string; // TODO: Restore when free shipping is available
    // freeShippingEverySixMonths: string; // TODO: Restore when free shipping is available
    skipOrCancelAnytime: string;
    fortyPercentSavings: string;
    sixtyPercentSavings: string;
    seventyTwoPercentSavings: string;
    priorityCustomerSupport: string;
    bonusFreeCatCareGuide: string;
    bonusFreeCatToys: string;
    mostPopular: string;
    save: string;
    month: string;
    months: string;
    selectPlan: string;
    joinThePurrifyFamily: string;
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
}