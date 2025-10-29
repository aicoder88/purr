export const SITE_NAME = "Purrify";
export const SITE_DESCRIPTION =
  "Activated carbon cat litter additive that eliminates odors at the source.";

export const PRODUCTS = [
  {
    id: "purrify-12g",
    name: "Purrify 12g",
    description: "Trial size - Single Use Sample\nTrial size: Only enough for one litter box change. Ideal for trying Purrify before committing to a larger size.",
    price: 4.99,
    image: "/optimized/20g.webp",
    size: "12g",
    shippingIncluded: true,
    shippingNote: "Shipping included",
  },
  {
    id: "purrify-50g",
    name: "Purrify 50g",
    description: "Ideal for One Cat\nOne month of freshness for single-cat homes.\nPair with quarterly autoship to lock in savings.",
    price: 14.99,
    image: "/optimized/60g.webp",
    size: "50g",
    shippingIncluded: false,
    shippingNote: "Shipping calculated at checkout",
  },
  {
    id: "purrify-50g-autoship",
    name: "Purrify 50g Autoship",
    description: "Quarterly autoship of 3×50g bags\nDesigned for uninterrupted freshness with built-in savings and shipping included.",
    price: 31.99,
    image: "/optimized/60g.webp",
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
    name: "Purrify Regular size 120g",
    description: "Perfect for two cats\nDouble the power for multi-cat households.\nMaximum odor control.",
    price: 29.99,
    image: "/optimized/140g.webp",
    size: "120g",
    shippingIncluded: false,
    shippingNote: "Shipping calculated at checkout",
  },
  {
    id: "purrify-120g-autoship",
    name: "Purrify 120g Autoship",
    description: "Best value bundle\n3×120g regular size packs delivered every quarter with shipping included and deepest savings.",
    price: 49.99,
    image: "/optimized/140g.webp",
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
    name: "Purrify Large size 240g",
    description: "Large size\nFor large multi-cat households or extended supply.",
    price: 54.99,
    image: "/optimized/140g.webp",
    size: "240g",
    shippingIncluded: false,
    shippingNote: "Shipping calculated at checkout",
  },
  {
    id: "purrify-240g-autoship",
    name: "Purrify 240g Autoship",
    description: "Large size autoship\n3×240g packs delivered every quarter with shipping included.",
    price: 79.99,
    image: "/optimized/140g.webp",
    size: "3 × 240g (quarterly)",
    shippingIncluded: true,
    shippingNote: "Free shipping included",
    subscription: {
      frequency: "Every 3 months",
      quantity: 3,
      bestFor: "Large multi-cat households",
    },
  },
];

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

export const TESTIMONIALS = [
  {
    name: "Aisha M., Mile End",
    text: "My rescue cat is super picky about litter changes, but with Purrify I can keep his box fresh way longer. Tiny Montreal apartment + sensitive cat = this stuff is a lifesaver! No more weird chemical smells either.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=aisha",
    stars: 5
  },
  {
    name: "Jean-Marc D., Hochelaga",
    text: "Mon chat est difficile, mais avec Purrify, sa litière reste fraîche plus longtemps. J'ai essayé des trucs à 30$ qui marchaient pas, mais ça c'est différent. Ça sent vraiment rien!",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jeanmarc",
    stars: 5
  },
  {
    name: "Priya S., Saint-Laurent",
    text: "My cats used to make the whole basement smell terrible. Started using the 120g size for both of them - game changer! Guests don't even know we have cats now.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=priya",
    stars: 5
  },
  {
    name: "François B., Rosemont",
    text: "L'hiver quand tu peux pas ouvrir les fenêtres, l'odeur de litière me rendait fou. Purrify a changé ma vie - plus d'odeur pantoute, même dans mon petit appart!",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=francois",
    stars: 5
  },
  {
    name: "Kenji T., Verdun",
    text: "My senior cat has some digestive issues, so odor control is crucial. The 50g size lasts about a month and keeps everything fresh. Worth every penny for peace of mind.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=kenji",
    stars: 5
  },
  {
    name: "Fatima R., Côte-des-Neiges",
    text: "Started with the 12g trial for my kitten. Worked so well I immediately ordered the 50g! No more embarrassing smells when friends come over.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=fatima",
    stars: 5
  },
  {
    name: "Maria C., Longueuil",
    text: "Ma chatte est super capricieuse avec sa litière, mais depuis que j'utilise Purrify, elle semble plus confortable. Plus d'odeurs bizarres qui traînent dans la maison!",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=maria",
    stars: 5
  },
  {
    name: "Dr. Amara Chen, Westmount",
    text: "As a veterinarian, I'm always skeptical of 'miracle' products. But Purrify's activated carbon approach is scientifically sound. My clinic cat's litter area stays remarkably fresh.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=amara",
    stars: 5
  },
  {
    name: "Kai L., Outremont",
    text: "Eco-conscious cat parent here! Love that it's just activated charcoal - no weird chemicals for my cat to inhale. The 120g size is perfect for my two-cat household.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=kai",
    stars: 5
  },
  {
    name: "Samuel I., Laval",
    text: "J'étais sceptique, mais mon chat avait des problèmes digestifs et l'odeur était insupportable. Purrify a vraiment réglé le problème - j'en commande maintenant à chaque mois!",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=samuel",
    stars: 5
  },
  {
    name: "Alex J., Hochelaga",
    text: "My cat has some serious digestive issues, but this stuff makes the litter box completely odorless. It's honestly like magic! Already ordering the larger size for next month.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
    stars: 5
  },
  {
    name: "Noor A., West Island",
    text: "Three cats in a small townhouse. You can imagine the chaos! The 120g size handles all three beautifully. My mother-in-law finally visits again! 😂",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=noor",
    stars: 5
  },
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
  yelp: BUSINESS_PROFILE.socialMedia.yelp ?? 'https://biz.yelp.com/settings',
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
