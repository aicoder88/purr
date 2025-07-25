export interface TranslationType {
  // Common
  siteName: string;
  siteDescription: string;
  
  // Navigation
  nav: {
    home: string;
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
}