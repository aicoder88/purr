/**
 * Montreal/Quebec Bilingual SEO Configuration
 * Optimized for local market, bilingual audience, and conversion
 * Following Quebec language laws (Bill 101) and cultural nuances
 */

export interface MontrealSEOConfig {
  location: string;
  keywords: {
    en: string[];
    fr: string[];
  };
  businessHours: string;
  serviceAreas: string[];
  competitors: string[];
  localEvents: string[];
}

export const MONTREAL_SEO_CONFIG: MontrealSEOConfig = {
  location: "Montreal, Quebec, Canada",
  keywords: {
    en: [
      // Primary English keywords
      "cat litter deodorizer montreal",
      "pet odor control montreal",
      "activated carbon cat litter canada",
      "natural cat litter additive quebec",
      "cat smell eliminator montreal",
      "odor control pets downtown montreal",
      "cat litter montreal stores",
      "pet supplies plateau mont royal",
      "cat odor eliminator verdun",
      "natural pet deodorizer westmount",
      
      // Long-tail local keywords
      "best cat litter odor control montreal 2025",
      "where to buy cat deodorizer montreal",
      "natural cat litter additive old port montreal",
      "cat litter smell solution montreal apartment",
      "fragrance-free cat litter products montreal",
      "cat odor eliminator delivery montreal",
      
      // Neighborhood-specific
      "cat litter deodorizer plateau", 
      "pet odor control mile end",
      "cat supplies westmount square",
      "pet deodorizer griffintown",
      "cat litter additive notre dame de grace"
    ],
    fr: [
      // Primary French keywords (Bill 101 compliant)
      "désodorisant litière chat montréal",
      "contrôle odeurs animaux montréal", 
      "charbon activé litière chat québec",
      "additif litière naturel canada français",
      "éliminateur odeur chat montréal",
      "produit anti-odeur chat plateau",
      "litière désodorisante montréal",
      "fournitures animaux mont-royal",
      "désodorisant naturel chat verdun",
      "contrôle odeur appartement montréal",
      
      // Long-tail French keywords
      "meilleur désodorisant litière chat montréal 2025",
      "où acheter désodorisant chat montréal",
      "additif litière naturel vieux-port montréal",
      "solution odeur litière appartement montréal",
      "désodorisant sans parfum pour chat magasins montréal",
      "éliminer odeur chat livraison montréal",
      
      // Quebec-specific cultural terms
      "désodorisant litière minou montréal",
      "produit anti-odeur chat québécois",
      "additif litière fait au canada français"
    ]
  },
  businessHours: "Monday-Friday 9AM-6PM EST, Saturday 10AM-4PM EST",
  serviceAreas: [
    "Montreal", "Laval", "Longueuil", "Brossard", "Saint-Lambert",
    "Westmount", "Outremont", "Mount Royal", "Verdun", "Plateau-Mont-Royal",
    "Mile End", "Griffintown", "Old Port", "Downtown Montreal", 
    "Notre-Dame-de-Grâce", "Côte-Saint-Luc", "Hampstead", "Montreal West"
  ],
  competitors: [
    "arm & hammer", "world's best", "dr. elsey's", "fresh step", 
    "tidy cats", "pestell", "catit", "hagen"
  ],
  localEvents: [
    "Salon National des Animaux de Compagnie", 
    "Montreal Pet Expo",
    "Festival des Animaux Montréal"
  ]
};

export const QUEBEC_LEGAL_COMPLIANCE = {
  // Bill 101 (Loi 101) compliance
  primaryLanguage: "fr",
  requiredBilingual: true,
  frenchFirst: true,
  
  // Quebec consumer protection
  returnPolicy: "30 jours de garantie de remboursement", // French first
  returnPolicyEn: "30-day money-back guarantee",
  
  // Quebec tax information
  taxDisplay: "Prix incluent TPS/TVQ applicable", // Must show Quebec taxes
  taxDisplayEn: "Prices include applicable GST/QST",
  
  // Quebec privacy laws
  privacyCompliance: "PIPEDA",
  dataRetention: "Tel que requis par la loi québécoise",
  dataRetentionEn: "As required by Quebec law"
};

// Montreal-specific structured data
export const MONTREAL_STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Purrify - Désodorisant Litière Chat Montréal",
  "description": {
    "@language": "fr",
    "@value": "Désodorisant naturel pour litière de chat à base de charbon activé. Élimination des odeurs garantie 7 jours. Fabriqué au Canada."
  },
  "additionalProperty": [
    {
      "@type": "PropertyValue",
      "name": "Service Area",
      "value": "Greater Montreal Area, Laval, South Shore"
    },
    {
      "@type": "PropertyValue", 
      "name": "Languages",
      "value": "Français, English"
    },
    {
      "@type": "PropertyValue",
      "name": "Quebec Compliant",
      "value": "Bill 101 Compliant, PIPEDA Compliant"
    }
  ],
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Montreal",
    "addressRegion": "QC", 
    "addressCountry": "CA"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 45.5017,
    "longitude": -73.5673
  },
  "areaServed": [
    {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 45.5017,
        "longitude": -73.5673
      },
      "geoRadius": "50000" // 50km radius
    }
  ],
  "serviceArea": {
    "@type": "GeoShape",
    "addressCountry": "CA",
    "addressRegion": "QC"
  },
  "url": "https://www.purrify.ca/montreal",
  "alternateName": [
    "https://purrify.ca/fr/montreal",
    "https://fr.purrify.ca/montreal"  
  ],
  "sameAs": [
    "https://www.facebook.com/purrify.montreal",
    "https://www.instagram.com/purrify.mtl"
  ],
  "priceRange": "$6.99-$29.99 CAD",
  "paymentAccepted": ["Cash", "Credit Card", "Debit", "Interac", "PayPal"],
  "currenciesAccepted": "CAD"
};

// Google Ads optimization structure
export const MONTREAL_GOOGLE_ADS_STRUCTURE = {
  campaigns: {
    "Montreal_Cat_Litter_FR": {
      type: "Search",
      language: "fr",
      location: "Montreal, QC",
      budget: 50, // Daily budget CAD
      keywords: MONTREAL_SEO_CONFIG.keywords.fr.slice(0, 20),
      negativeKeywords: ["gratuit", "cheap", "pas cher", "chien", "dog"],
      adSchedule: "Monday-Sunday 8AM-10PM EST"
    },
    "Montreal_Cat_Litter_EN": {
      type: "Search", 
      language: "en",
      location: "Montreal, QC",
      budget: 30, // Daily budget CAD
      keywords: MONTREAL_SEO_CONFIG.keywords.en.slice(0, 15),
      negativeKeywords: ["free", "cheap", "dog", "puppy"],
      adSchedule: "Monday-Sunday 8AM-10PM EST"
    },
    "Quebec_Retargeting": {
      type: "Display",
      language: ["fr", "en"],
      location: "Quebec Province",
      budget: 25,
      audiences: ["previous_visitors", "cart_abandoners", "video_viewers"]
    }
  },
  
  // Conversion tracking
  conversions: {
    "Purchase": { value: 19.99, currency: "CAD" },
    "Trial_Request": { value: 6.99, currency: "CAD" },
    "Newsletter_Signup": { value: 2.00, currency: "CAD" },
    "Video_View": { value: 0.50, currency: "CAD" }
  },
  
  // A/B testing variants for Montreal
  adVariants: {
    fr: {
      headlines: [
        "Éliminez les Odeurs de Litière - Garantie 7 Jours",
        "Désodorisant Naturel pour Chat - Livraison Montréal",
        "Fini les Mauvaises Odeurs! Additif Litière Premium"
      ],
      descriptions: [
        "Charbon activé naturel. Fonctionne avec toute litière. Fabriqué au Canada.",
        "Solution écologique pour éliminer les odeurs. Essai gratuit disponible.",
        "Recommandé par les vétérinaires montréalais. Livraison rapide."
      ]
    },
    en: {
      headlines: [
        "Eliminate Litter Odors - 7-Day Guarantee Montreal",
        "Natural Cat Deodorizer - Montreal Delivery", 
        "End Bad Smells! Premium Litter Additive"
      ],
      descriptions: [
        "Natural activated carbon. Works with any litter. Made in Canada.",
        "Fragrance-free odor elimination. Free trial available.",
        "Recommended by Montreal veterinarians. Fast delivery."
      ]
    }
  }
};

// Performance marketing funnel for Montreal
export const MONTREAL_MARKETING_FUNNEL = {
  awareness: {
    channels: ["SEO", "Google Ads", "Facebook Ads", "Instagram", "TikTok"],
    content: ["Blog posts", "Videos", "Infographics", "Local PR"],
    metrics: ["Impressions", "CTR", "Brand searches", "Video views"]
  },
  
  consideration: {
    channels: ["Retargeting", "Email", "Content Marketing", "Reviews"],
    content: ["Product comparisons", "Testimonials", "Free samples", "Vet endorsements"],
    metrics: ["Time on site", "Pages per session", "Download rate", "Engagement"]
  },
  
  conversion: {
    channels: ["Website", "Phone", "Local stores", "Amazon"],
    content: ["Product pages", "Checkout flow", "Trust signals", "Guarantees"],
    metrics: ["Conversion rate", "AOV", "Cart abandonment", "ROAS"]
  },
  
  retention: {
    channels: ["Email", "SMS", "Loyalty program", "Subscription"],
    content: ["Care tips", "Exclusive offers", "New products", "Community"],
    metrics: ["LTV", "Repeat rate", "Referral rate", "Churn rate"]
  }
};
