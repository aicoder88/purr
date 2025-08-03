// Google Tag Manager Event Tracking for Purrify
// This file contains all the dataLayer events for comprehensive tracking

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

// Initialize dataLayer if it doesn't exist
if (typeof window !== 'undefined' && !window.dataLayer) {
  window.dataLayer = [];
}

// Helper function to push events to dataLayer
export const gtmEvent = (eventName: string, parameters: Record<string, any> = {}) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...parameters
    });
    console.log('GTM Event:', eventName, parameters);
  }
};

// E-commerce Events
export const ecommerceEvents = {
  // Product Views
  viewItem: (item: {
    item_id: string;
    item_name: string;
    category: string;
    price: number;
    currency?: string;
  }) => {
    gtmEvent('view_item', {
      currency: item.currency || 'CAD',
      value: item.price,
      items: [{
        item_id: item.item_id,
        item_name: item.item_name,
        category: item.category,
        price: item.price,
        quantity: 1
      }]
    });
  },

  // Add to Cart
  addToCart: (item: {
    item_id: string;
    item_name: string;
    category: string;
    price: number;
    quantity: number;
    currency?: string;
  }) => {
    gtmEvent('add_to_cart', {
      currency: item.currency || 'CAD',
      value: item.price * item.quantity,
      items: [{
        item_id: item.item_id,
        item_name: item.item_name,
        category: item.category,
        price: item.price,
        quantity: item.quantity
      }]
    });
  },

  // Remove from Cart
  removeFromCart: (item: {
    item_id: string;
    item_name: string;
    category: string;
    price: number;
    quantity: number;
    currency?: string;
  }) => {
    gtmEvent('remove_from_cart', {
      currency: item.currency || 'CAD',
      value: item.price * item.quantity,
      items: [{
        item_id: item.item_id,
        item_name: item.item_name,
        category: item.category,
        price: item.price,
        quantity: item.quantity
      }]
    });
  },

  // Begin Checkout
  beginCheckout: (items: any[], value: number, currency = 'CAD') => {
    gtmEvent('begin_checkout', {
      currency,
      value,
      items
    });
  },

  // Purchase
  purchase: (transactionId: string, items: any[], value: number, currency = 'CAD') => {
    gtmEvent('purchase', {
      transaction_id: transactionId,
      currency,
      value,
      items
    });
  },

  // View Cart
  viewCart: (items: any[], value: number, currency = 'CAD') => {
    gtmEvent('view_cart', {
      currency,
      value,
      items
    });
  }
};

// User Engagement Events
export const engagementEvents = {
  // Page Views (Enhanced)
  pageView: (pagePath: string, pageTitle: string, language?: string) => {
    gtmEvent('page_view', {
      page_path: pagePath,
      page_title: pageTitle,
      language: language || 'en',
      timestamp: new Date().toISOString()
    });
  },

  // Scroll Tracking
  scrollDepth: (depth: number, pagePath: string) => {
    gtmEvent('scroll', {
      scroll_depth: depth,
      page_path: pagePath
    });
  },

  // File Downloads
  fileDownload: (fileName: string, fileType: string, downloadUrl: string) => {
    gtmEvent('file_download', {
      file_name: fileName,
      file_type: fileType,
      download_url: downloadUrl
    });
  },

  // External Link Clicks
  externalLink: (linkUrl: string, linkText: string) => {
    gtmEvent('click', {
      event_category: 'external_link',
      event_label: linkUrl,
      link_text: linkText,
      outbound: true
    });
  },

  // Video Interactions
  videoPlay: (videoTitle: string, videoDuration: number) => {
    gtmEvent('video_start', {
      video_title: videoTitle,
      video_duration: videoDuration
    });
  },

  videoComplete: (videoTitle: string, videoDuration: number) => {
    gtmEvent('video_complete', {
      video_title: videoTitle,
      video_duration: videoDuration
    });
  }
};

// Form Events
export const formEvents = {
  // Form Starts
  formStart: (formName: string, formLocation: string) => {
    gtmEvent('form_start', {
      form_name: formName,
      form_location: formLocation
    });
  },

  // Form Submissions
  formSubmit: (formName: string, formLocation: string, success: boolean) => {
    gtmEvent('form_submit', {
      form_name: formName,
      form_location: formLocation,
      success: success
    });
  },

  // Newsletter Signup
  newsletterSignup: (location: string, variant: string) => {
    gtmEvent('sign_up', {
      method: 'newsletter',
      location: location,
      variant: variant
    });
  },

  // Contact Form
  contactForm: (inquiryType: string, location: string) => {
    gtmEvent('generate_lead', {
      form_type: 'contact',
      inquiry_type: inquiryType,
      location: location
    });
  }
};

// Search Events
export const searchEvents = {
  // Site Search
  search: (searchTerm: string, resultsCount: number) => {
    gtmEvent('search', {
      search_term: searchTerm,
      results_count: resultsCount
    });
  },

  // FAQ Search
  faqSearch: (searchTerm: string, resultsCount: number) => {
    gtmEvent('search', {
      search_term: searchTerm,
      results_count: resultsCount,
      search_type: 'faq'
    });
  }
};

// Social Media Events
export const socialEvents = {
  // Social Share
  share: (platform: string, contentType: string, contentId: string) => {
    gtmEvent('share', {
      method: platform,
      content_type: contentType,
      content_id: contentId
    });
  },

  // Social Login
  socialLogin: (platform: string) => {
    gtmEvent('login', {
      method: platform
    });
  }
};

// Custom Purrify Events
export const purrifyEvents = {
  // Product Interest
  productInterest: (productId: string, interactionType: string) => {
    gtmEvent('product_interest', {
      product_id: productId,
      interaction_type: interactionType
    });
  },

  // Trial Request
  trialRequest: (productId: string, source: string) => {
    gtmEvent('trial_request', {
      product_id: productId,
      source: source
    });
  },

  // How It Works Engagement
  howItWorksStep: (stepNumber: number, stepName: string) => {
    gtmEvent('how_it_works_step', {
      step_number: stepNumber,
      step_name: stepName
    });
  },

  // Testimonial Interaction
  testimonialView: (testimonialId: string, location: string) => {
    gtmEvent('testimonial_view', {
      testimonial_id: testimonialId,
      location: location
    });
  },

  // FAQ Interaction
  faqClick: (question: string, category: string) => {
    gtmEvent('faq_click', {
      question: question,
      category: category
    });
  },

  // Store Locator
  storeClick: (storeName: string, storeType: string) => {
    gtmEvent('store_click', {
      store_name: storeName,
      store_type: storeType
    });
  },

  // Language Switch
  languageSwitch: (fromLanguage: string, toLanguage: string) => {
    gtmEvent('language_switch', {
      from_language: fromLanguage,
      to_language: toLanguage
    });
  },

  // Mobile App Install
  appInstall: (source: string) => {
    gtmEvent('app_install', {
      source: source,
      app_name: 'Purrify PWA'
    });
  },

  // Social Proof Interaction
  socialProofClick: (notificationType: string, productId: string) => {
    gtmEvent('social_proof_click', {
      notification_type: notificationType,
      product_id: productId
    });
  },

  // Trust Badge Click
  trustBadgeClick: (badgeType: string, location: string) => {
    gtmEvent('trust_badge_click', {
      badge_type: badgeType,
      location: location
    });
  }
};

// Error Tracking
export const errorEvents = {
  // JavaScript Errors
  jsError: (errorMessage: string, errorStack: string, pagePath: string) => {
    gtmEvent('exception', {
      description: errorMessage,
      fatal: false,
      error_stack: errorStack,
      page_path: pagePath
    });
  },

  // Form Errors
  formError: (formName: string, fieldName: string, errorType: string) => {
    gtmEvent('form_error', {
      form_name: formName,
      field_name: fieldName,
      error_type: errorType
    });
  },

  // Payment Errors
  paymentError: (errorCode: string, paymentMethod: string) => {
    gtmEvent('payment_error', {
      error_code: errorCode,
      payment_method: paymentMethod
    });
  }
};

// Performance Events
export const performanceEvents = {
  // Page Load Time
  pageLoadTime: (loadTime: number, pagePath: string) => {
    gtmEvent('timing_complete', {
      name: 'page_load',
      value: loadTime,
      page_path: pagePath
    });
  },

  // Core Web Vitals
  webVitals: (metric: string, value: number, rating: string) => {
    gtmEvent('web_vitals', {
      metric_name: metric,
      metric_value: value,
      metric_rating: rating
    });
  }
};

export default {
  gtmEvent,
  ecommerceEvents,
  engagementEvents,
  formEvents,
  searchEvents,
  socialEvents,
  purrifyEvents,
  errorEvents,
  performanceEvents
};
