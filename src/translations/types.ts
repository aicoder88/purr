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
  };

  // Structured Data
  structuredData: {
    organization: {
      name: string;
      contactPoint: {
        telephone: string;
        contactType: string;
        areaServed: string;
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
    aiSupport: string;
    sendMessage: string;
    replyTime: string;
  };

  // Footer
  footer: {
    quickLinks: string;
    openingHours: string;
    contactUs: string;
    allRightsReserved: string;
    aiSupport: string;
  };

  // Free Trial
  freeTrial: {
    urgentBanner: string;
    free: string;
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
    freeShipping: string;
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
    freeShipping: string;
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
    freeShipping: string;
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
}
