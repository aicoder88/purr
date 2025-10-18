export const SITE_NAME = "Purrify";
export const SITE_DESCRIPTION =
  "Activated carbon cat litter additive that eliminates odors at the source.";

export const PRODUCTS = [
  {
    id: "purrify-12g",
    name: "Purrify 12g",
    description: "Trial size - Single Use Sample\nTrial size: Only enough for one litter box change. Ideal for trying Purrify before committing to a larger size.",
    price: 6.99,
    image: "/optimized/20g.webp",
    size: "12g",
  },
  {
    id: "purrify-50g",
    name: "Purrify 50g",
    description: "Ideal for One Cat\nOur most popular size for single-cat homes.\nOne month of freshness!",
    price: 19.99,
    image: "/optimized/60g.webp",
    size: "50g",
  },
  {
    id: "purrify-120g",
    name: "Purrify 120g",
    description: "Perfect for Two Cats\nDouble the power for multi-cat households.\nMaximum odor control.",
    price: 29.99,
    image: "/optimized/140g.webp",
    size: "120g",
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
import {
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
};

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
};
