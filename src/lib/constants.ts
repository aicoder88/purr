export const SITE_NAME = "Purrify";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.purrify.ca";
export const SITE_DESCRIPTION =
  "Activated carbon cat litter additive that eliminates odors at the source.";

export const GOOGLE_MAPS_EMBED_ID = "1tp1A30e-7ixcKLz4hrvMI1cY0FPhs2A";

export const PRODUCTS = [
  {
    id: "purrify-12g",
    name: "The Skeptic's Sample 12g",
    description: "12g · One Week of Proof\nOne sprinkle delivers days of fresher litter\nYour nose gets the proof—your wallet risks just $4.76 shipping",
    price: 4.76,
    image: "/optimized/17g-transparent-v2.webp",
    size: "12g",
    shippingIncluded: true,
    shippingNote: "Shipping included",
  },
  {
    id: "purrify-50g",
    name: "Purrify Goldilocks Bag 50g",
    description: "50g · Regular Size\nOne month of freshness for single-cat homes.\nPair with quarterly autoship to lock in savings.",
    price: 14.99,
    image: "/optimized/60g-transparent.webp",
    size: "50g",
    shippingIncluded: false,
    shippingNote: "Shipping calculated at checkout",
  },
  {
    id: "purrify-50g-autoship",
    name: "Purrify Goldilocks Bag 50g Autoship",
    description: "Quarterly autoship of 3×50g bags\nDesigned for uninterrupted freshness with built-in savings and shipping included.",
    price: 31.99,
    image: "/optimized/60g-transparent.webp",
    size: "3 × 50g (quarterly)",
    shippingIncluded: true,
    shippingNote: "Shipping included",
    subscription: {
      frequency: "Every 3 months",
      quantity: 3,
      bestFor: "Continuous single-cat odor control",
    },
  },
  {
    id: "purrify-120g",
    name: "Purrify Family Size 120g",
    description: "120g · Best Value Per Gram\nNot too little, not too much—the size most customers reorder\nLasts 7+ days per application, or double up for two full weeks of freshness\nThe perfect amount for 1-2 cats without buying more than you need",
    price: 29.99,
    image: "/optimized/60g-transparent.webp",
    size: "120g",
    shippingIncluded: false,
    shippingNote: "Shipping calculated at checkout",
  },
  {
    id: "purrify-120g-autoship",
    name: "Purrify Family Size 120g Autoship",
    description: "Family Size autoship\n3×120g packs delivered quarterly with free shipping included\nSet it once, forget the reordering—you're always stocked for fresh litter boxes",
    price: 49.99,
    image: "/optimized/60g-transparent.webp",
    size: "3 × 120g (quarterly)",
    shippingIncluded: true,
    shippingNote: "Free shipping included",
    subscription: {
      frequency: "Every 3 months",
      quantity: 3,
      bestFor: "Multi-cat and allergy-prone homes",
    },
  },
  {
    id: "purrify-240g",
    name: "Purrify Family Size 240g",
    description: "240g · Best Value Per Gram\nDouble the supply at less than double the price—the math just makes sense\nLasts 7+ days per application across multiple litter boxes\nThe go-to size for multi-cat homes that refuse to compromise on freshness",
    price: 54.99,
    image: "/optimized/140g-transparent.webp",
    size: "240g",
    shippingIncluded: false,
    shippingNote: "Shipping calculated at checkout",
  },
  {
    id: "purrify-240g-autoship",
    name: "Purrify Family Size 240g Autoship",
    description: "Family Size autoship\n3×240g packs delivered quarterly with free shipping included\nThe bulk supply that keeps multi-cat homes fresh without ever running out",
    price: 79.99,
    image: "/optimized/140g-transparent.webp",
    size: "3 × 240g (quarterly)",
    shippingIncluded: true,
    shippingNote: "Free shipping included",
    subscription: {
      frequency: "Every 3 months",
      quantity: 3,
      bestFor: "Large multi-cat households",
    },
  },
  {
    id: "purrify-12g-bump",
    name: "Purrify 12g (Trial Bump)",
    description: "One-time offer: Add a trial size for just $4.76 shipping & handling anywhere in Canada!",
    price: 4.76,
    image: "/optimized/17g-transparent-v2.webp",
    size: "12g",
    shippingIncluded: true,
    shippingNote: "Ships with your order",
  },
];

// USD prices (1:1 conversion from CAD - same numbers, different currency)
export const USD_PRICES: Record<string, number> = {
  'purrify-12g': 4.76,
  'purrify-50g': 14.99,
  'purrify-50g-autoship': 31.99,
  'purrify-120g': 29.99,
  'purrify-120g-autoship': 49.99,
  'purrify-240g': 54.99,
  'purrify-240g-autoship': 79.99,
  'purrify-12g-bump': 4.76,
};

export const FEATURES = [
  {
    title: "Odor Elimination",
    description:
      "Purrify's advanced formula effectively eliminates unpleasant litter box odors at their source.",
    icon: "Zap",
  },
  {
    title: "Cat-Friendly",
    description:
      "Designed with your cat's well-being in mind, it's gentle, and completely pet-friendly.",
    icon: "Heart",
  },
  {
    title: "Long-Lasting Freshness",
    description:
      "A single sprinkle keeps your home odor-free for days. Enjoy continuous freshness without constant upkeep.",
    icon: "Clock",
  },
  {
    title: "Works with Any Litter",
    description:
      "Compatible with any litter type, so you don't have to switch what your cat already loves.",
    icon: "Check",
  },
  {
    title: "Cost-Effective",
    description:
      "Extends the life of your cat's litter by preventing odor buildup, saving you money and reducing waste.",
    icon: "DollarSign",
  },
];

export type Testimonial = {
  name: string;
  text: string;
  avatar?: string;
  stars?: number;
};

export const TESTIMONIALS: Testimonial[] = [
  // Intentionally empty until backed by a real, verifiable review system.
];

// Import centralized business profile for NAP consistency
import BUSINESS_PROFILE, {
  getFormattedAddress,
  getPhoneNumber,
  getEmailAddress,
  getFormattedBusinessHours,
  getPhoneNumberInternational,
  getPhoneNumberHref,
  getPhoneNumberE164
} from './business-profile';

export const PHONE_NUMBER = {
  display: getPhoneNumber(),
  international: getPhoneNumberInternational(),
  e164: getPhoneNumberE164(),
  telLink: getPhoneNumberHref(),
  tagline: 'Call 1-450-6-ODORS-3',
  description: 'See what we did there? We trapped those pesky odors right inside our digits so they can\'t escape and stink up your day!',
};

export const PHONE_MESSAGING = {
  headline: 'Need Help? We\'re Just a Call Away',
  callout: 'Call 1 (450) 663-6773',
  explanation: 'Our friendly customer support team is ready to help you with any questions about Purrify, orders, or product recommendations. We\'re here Monday-Friday 9AM-5PM EST.',
  cta: 'Have a question? Give us a call and we\'ll get your litter box smelling fresh again!'
};

export const SOCIAL_LINKS = {
  x: BUSINESS_PROFILE.socialMedia.twitter ?? 'https://x.com/PurrifyHQ',
  twitter: BUSINESS_PROFILE.socialMedia.twitter ?? 'https://x.com/PurrifyHQ', // Alias for x
  instagram: BUSINESS_PROFILE.socialMedia.instagram ?? 'https://www.instagram.com/purrifyhq/',
  linkedin: BUSINESS_PROFILE.socialMedia.linkedin ?? 'https://www.linkedin.com/company/purrify',
  youtube: BUSINESS_PROFILE.socialMedia.youtube ?? 'https://www.youtube.com/@PurrifyHQ',
  tiktok: BUSINESS_PROFILE.socialMedia.tiktok ?? 'https://www.tiktok.com/@purrifyhq',
  facebook: BUSINESS_PROFILE.socialMedia.facebook ?? 'https://www.facebook.com/purrify',
  trustpilot: BUSINESS_PROFILE.socialMedia.trustpilot ?? 'https://www.trustpilot.com/review/purrify.ca',
  googleBusiness: BUSINESS_PROFILE.socialMedia.googleBusiness ?? 'https://share.google/S4ckzwuljW3gDUOqr',
  googleReviews: BUSINESS_PROFILE.socialMedia.googleReviews ?? 'https://g.page/r/CUB8bZ_ibMbwEBI/review',
  crunchbase: BUSINESS_PROFILE.socialMedia.crunchbase ?? 'https://www.crunchbase.com/organization/purrify',
  bingPlaces: BUSINESS_PROFILE.socialMedia.bingPlaces ?? 'https://www.bing.com/forbusiness/singleEntity?bizid=dc537d86-4d9b-47d2-9c8f-5019712edd9f',
  yelp: BUSINESS_PROFILE.socialMedia.yelp ?? 'https://www.yelp.ca/biz/purrify-montreal',
  medium: BUSINESS_PROFILE.socialMedia.medium ?? 'https://medium.com/@purrify',
  whop: BUSINESS_PROFILE.socialMedia.whop ?? 'https://whop.com/purrify',
  producthunt: BUSINESS_PROFILE.socialMedia.producthunt ?? 'https://www.producthunt.com/products/purrify',
  wellfound: BUSINESS_PROFILE.socialMedia.wellfound ?? 'https://wellfound.com/company/purrify'
} as const;

export const CONTACT_INFO = {
  address: getFormattedAddress(),
  phone: PHONE_NUMBER.display,
  phoneInternational: PHONE_NUMBER.international,
  phoneHref: PHONE_NUMBER.telLink,
  email: getEmailAddress(),
  hours: getFormattedBusinessHours('en').reduce((acc, item) => {
    const dayKey = item.day.toLowerCase();
    acc[dayKey] = item.hours;
    return acc;
  }, {} as Record<string, string>),
  social: SOCIAL_LINKS,
};
