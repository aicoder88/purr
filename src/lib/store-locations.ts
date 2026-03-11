export type RetailerRegion =
  | 'montreal'
  | 'laval'
  | 'quebec'
  | 'ontario'
  | 'bc'
  | 'alberta';

export type RetailerType = 'independent' | 'franchise' | 'chain';

export interface RetailerLocation {
  name: string;
  location: string;
  address: string;
  phone: string;
  url: string;
  descriptionKey: string;
  descriptionFallback: string;
  region: RetailerRegion;
  type: RetailerType;
}

export interface StoreLogoConfig {
  src: string;
  alt: string;
  className: string;
  width: number;
  height: number;
}

const DEFAULT_LOGO_CONFIG = {
  className: 'w-16 h-16 object-contain',
  width: 64,
  height: 64,
} as const;

const STORE_LOGOS: Record<string, Omit<StoreLogoConfig, 'className' | 'width' | 'height'>> = {
  'Chico': { src: '/optimized/logos/chico-logo.svg', alt: 'Chico - Boutique d\'animaux Logo' },
  'Pattes et Griffes': { src: '/optimized/stores/pattes.webp', alt: 'Pattes et Griffes Logo' },
  'GIGI': { src: '/optimized/marketing/gigi.webp', alt: 'Animal Shop GIGI - Pet Store Logo' },
  'Pitou Minou': { src: '/optimized/stores/pitou-minou.webp', alt: 'Pitou Minou & Compagnons - Pet Store Logo' },
  'Doghaus': { src: '/optimized/stores/doghaus.webp', alt: 'Doghaus Montreal - Premium Pet Store Logo' },
  'Kong': { src: '/optimized/stores/kong-animalerie.webp', alt: 'KONG ANIMALERIE - Montreal Pet Store Logo' },
  'Coquette': { src: '/optimized/stores/coquette-finegueule.webp', alt: 'Coquette et Finegueule - Pet Store with Grooming Logo' },
  'Animalerie Mamiwouff': { src: '/optimized/stores/animalerie-mamiwouff.webp', alt: 'Animalerie Mamiwouff - Family-Owned Pet Store Logo' },
  'Animalerie Lamifidel': { src: '/optimized/stores/lamifidel.avif', alt: 'Animalerie Lamifidel - Complete Pet Care and Supplies Logo' },
  'Animalerie Petmobile Nathamo': { src: '/optimized/stores/nathamo.avif', alt: 'Animalerie Petmobile Nathamo - Complete Pet Care and Supplies Logo' },
  'Animalerie Club Wouf Miaou': { src: '/optimized/stores/woofmiao-logo.webp', alt: 'Animalerie Club Wouf Miaou - Pet Store Logo' },
  'K&K Pet Foods': { src: '/optimized/stores/kk.avif', alt: 'K&K Pet Foods Dunbar - Premium Pet Products & Supplies Logo' },
  'Viva Pets': { src: '/optimized/stores/viva-pets.avif', alt: 'Viva Pets - Premium Pet Products & Supplies Logo' },
  'Little Bit Western': { src: '/optimized/stores/little-bit-western.avif', alt: 'Little Bit Western Feed and Supplies Inc. - Pet and Feed Store Logo' },
  'Best Cat': { src: '/optimized/stores/bestcat.png', alt: 'Best Cat - Premium Pet Products and Supplies Logo' },
  'Camlachie Feed': { src: '/optimized/stores/camlachie-feed.jpg', alt: 'Camlachie Feed - Pet and Farm Supplies Logo' },
};

const WHITE_BG_STORES = Object.keys(STORE_LOGOS);

export const RETAILER_LOCATIONS: RetailerLocation[] = [
  {
    name: 'Pattes et Griffes (Sainte-Thérèse)',
    location: 'Sainte-Thérèse, QC J7E 2X5',
    address: '190 Boulevard du Curé-Labelle, Sainte-Thérèse, QC J7E 2X5',
    phone: '1-450-818-1310',
    url: 'https://www.pattesgriffes.com/pages/trouvez-une-boutique',
    descriptionKey: 'storesSection.storeDescriptions.completePetCareAndSupplies',
    descriptionFallback: 'Complete pet care and supplies',
    region: 'montreal',
    type: 'franchise',
  },
  {
    name: 'Chico (Sainte-Thérèse)',
    location: 'Sainte-Thérèse, QC J7E 2Z7',
    address: '95 Boulevard du Curé-Labelle, Sainte-Thérèse, QC J7E 2Z7',
    phone: '1-450-965-3906',
    url: 'https://www.chico.ca/boutique/chico-sainte-therese/',
    descriptionKey: 'storesSection.storeDescriptions.premiumPetBoutique',
    descriptionFallback: 'Premium pet boutique',
    region: 'montreal',
    type: 'franchise',
  },
  {
    name: 'Chico (Sainte-Marthe-sur-le-Lac)',
    location: 'Sainte-Marthe-sur-le-Lac, QC J0N 1P0',
    address: '2860 B Boulevard des Promenades, Sainte-Marthe-sur-le-Lac, QC J0N 1P0',
    phone: '1-450-598-2860',
    url: 'https://www.chico.ca/boutique/chico-ste-marthe/',
    descriptionKey: 'storesSection.storeDescriptions.premiumPetBoutique',
    descriptionFallback: 'Premium pet boutique',
    region: 'montreal',
    type: 'franchise',
  },
  {
    name: 'Animal Shop GIGI',
    location: 'Saint-Eustache, QC J7R 2J3',
    address: '356 Boulevard Arthur-Sauvé, Saint-Eustache, QC J7R 2J3',
    phone: '1-450-598-3444',
    url: 'https://www.animaleriegigi.com/',
    descriptionKey: 'storesSection.storeDescriptions.familyOwnedPetStore',
    descriptionFallback: 'Family-owned pet store',
    region: 'montreal',
    type: 'independent',
  },
  {
    name: 'Chico (Laval-Est)',
    location: 'Laval, QC H7E 0A4',
    address: '5405 Boulevard Robert-Bourassa, Laval, QC H7E 0A4',
    phone: '1-450-239-0354',
    url: 'https://www.chico.ca/en/boutique/chico-laval-east/',
    descriptionKey: 'storesSection.storeDescriptions.premiumPetBoutique',
    descriptionFallback: 'Premium pet boutique',
    region: 'laval',
    type: 'franchise',
  },
  {
    name: 'Chico (Laval Ouest)',
    location: 'Laval, QC H7R 5P8',
    address: '4511 Bd Arthur-Sauvé, Laval, QC H7R 5P8',
    phone: '1-450-314-2442',
    url: 'https://www.chico.ca/boutique/chico-laval-ouest/',
    descriptionKey: 'storesSection.storeDescriptions.premiumPetBoutique',
    descriptionFallback: 'Premium pet boutique',
    region: 'laval',
    type: 'franchise',
  },
  {
    name: 'Pattes et Griffes (Laval)',
    location: 'Laval, QC H7S 1M9',
    address: '1682 Boulevard Saint-Martin Ouest, Laval, QC H7S 1M9',
    phone: '1-579-640-1857',
    url: 'https://www.pattesgriffes.com/pages/trouvez-une-boutique',
    descriptionKey: 'storesSection.storeDescriptions.completePetCareAndSupplies',
    descriptionFallback: 'Complete pet care and supplies',
    region: 'laval',
    type: 'franchise',
  },
  {
    name: 'Pitou Minou & Compagnons (Kirkland)',
    location: 'Kirkland, QC H9H 0C5',
    address: '16936 Autoroute Transcanadienne, Kirkland, QC H9H 0C5',
    phone: '1-514-695-5005',
    url: 'https://pitou-minou.ca/global-pet-foods-succursales-quebec/',
    descriptionKey: 'storesSection.storeDescriptions.globalPetFoodsLocation',
    descriptionFallback: 'Global Pet Foods location',
    region: 'montreal',
    type: 'franchise',
  },
  {
    name: 'Chico (Saint-Laurent)',
    location: 'Montreal, QC H2S 3E3',
    address: '7001 Boulevard Saint-Laurent, Montréal, QC H2S 3E3',
    phone: '1-514-657-5813',
    url: 'https://www.chico.ca/boutique/chico-boul-st-laurent-montreal/',
    descriptionKey: 'storesSection.storeDescriptions.premiumPetBoutique',
    descriptionFallback: 'Premium pet boutique',
    region: 'montreal',
    type: 'franchise',
  },
  {
    name: 'Doghaus',
    location: 'Montreal, QC H4A 1W6',
    address: '5671 Rue Sherbrooke Ouest, Montréal, QC H4A 1W6',
    phone: '514-483-3555',
    url: 'https://www.doghausmtl.com/',
    descriptionKey: 'storesSection.storeDescriptions.premiumPetProductsAndSupplies',
    descriptionFallback: 'Premium pet products and supplies',
    region: 'montreal',
    type: 'independent',
  },
  {
    name: 'Kong Animalerie',
    location: 'Montreal, QC H3W 3H8',
    address: '5555 Bd Décarie, Montréal, QC H3W 3H8',
    phone: '514-662-8373',
    url: 'https://www.facebook.com/konganimalerie/',
    descriptionKey: 'storesSection.storeDescriptions.fullServicePetStore',
    descriptionFallback: 'Full-service pet store',
    region: 'montreal',
    type: 'independent',
  },
  {
    name: 'Coquette et Finegueule',
    location: 'Verdun, QC H4H 1E6',
    address: '5203 Rue Bannantyne, Verdun, QC H4H 1E6',
    phone: '514-761-4221',
    url: 'https://coquetteetfinegueule.com/',
    descriptionKey: 'storesSection.storeDescriptions.petStoreWithGroomingServices',
    descriptionFallback: 'Pet store with grooming services',
    region: 'montreal',
    type: 'independent',
  },
  {
    name: 'Pitou Minou & Compagnons (Verdun)',
    location: 'Verdun, QC H4G 1V7',
    address: '4100 Rue Wellington, Verdun, QC H4G 1V7',
    phone: '514-732-0555',
    url: 'https://pitou-minou.ca/global-pet-foods-succursales-quebec/',
    descriptionKey: 'storesSection.storeDescriptions.globalPetFoodsLocation',
    descriptionFallback: 'Global Pet Foods location',
    region: 'montreal',
    type: 'franchise',
  },
  {
    name: 'Chico (Plateau Mont-Royal)',
    location: 'Montreal, QC H2H 1J6',
    address: '2016 Avenue du Mont-Royal E., Montréal, QC H2H 1J6',
    phone: '514-521-0201',
    url: 'https://www.chico.ca/boutique/chico-plateau-mont-royal-montreal/',
    descriptionKey: 'storesSection.storeDescriptions.premiumPetBoutique',
    descriptionFallback: 'Premium pet boutique',
    region: 'montreal',
    type: 'franchise',
  },
  {
    name: 'Chico (Hochelaga-Maisonneuve)',
    location: 'Montreal, QC H1L 2M4',
    address: '8646 Rue Hochelaga, Montréal, QC H1L 2M4',
    phone: '514-419-9850',
    url: 'https://www.chico.ca/boutique/chico-rue-ontario-montreal/',
    descriptionKey: 'storesSection.storeDescriptions.premiumPetBoutique',
    descriptionFallback: 'Premium pet boutique',
    region: 'montreal',
    type: 'franchise',
  },
  {
    name: 'Chico (Plateau Mont-Royal - Ontario)',
    location: 'Montreal, QC H1W 1S7',
    address: '3911 Rue Ontario E., Montréal, QC H1W 1S7',
    phone: '514-527-1371',
    url: 'https://www.chico.ca/boutique/chico-rue-ontario-montreal/',
    descriptionKey: 'storesSection.storeDescriptions.premiumPetBoutique',
    descriptionFallback: 'Premium pet boutique',
    region: 'montreal',
    type: 'franchise',
  },
  {
    name: 'Animalerie Mamiwouff Inc',
    location: 'Saint-Césaire, QC J0L 1T0',
    address: '2048 Route 112, Saint-Césaire, QC J0L 1T0',
    phone: '450-469-4560',
    url: 'https://www.animaleriemamiwouff.com/',
    descriptionKey: 'storesSection.storeDescriptions.familyOwnedPetStore',
    descriptionFallback: 'Family-owned pet store',
    region: 'quebec',
    type: 'independent',
  },
  {
    name: 'Animalerie Lamifidel',
    location: 'Alma, QC G8B 2V6',
    address: '1295 Avenue du Pont S, Alma, QC G8B 2V6',
    phone: '418-668-0117',
    url: 'https://www.lamifidel.net/',
    descriptionKey: 'storesSection.storeDescriptions.completePetCareAndSupplies',
    descriptionFallback: 'Complete pet care and supplies',
    region: 'quebec',
    type: 'independent',
  },
  {
    name: 'Animalerie Petmobile Nathamo',
    location: 'Shawinigan, QC G0X 1L0',
    address: '161 Rue de l\'Hydravion, Shawinigan, QC G0X 1L0',
    phone: '819-695-2329',
    url: 'https://animalerienathamo.square.site/',
    descriptionKey: 'storesSection.storeDescriptions.completePetCareAndSupplies',
    descriptionFallback: 'Complete pet care and supplies',
    region: 'quebec',
    type: 'independent',
  },
  {
    name: 'Animalerie Club Wouf Miaou',
    location: 'Trois-Rivières, QC G9A 6M1',
    address: '3175 boulevard des Récollets, Trois-Rivières, QC G9A 6M1',
    phone: '+1 819-376-0973',
    url: 'https://woufmiaou.ca/',
    descriptionKey: 'storesSection.storeDescriptions.completePetCareAndSupplies',
    descriptionFallback: 'Complete pet care and supplies',
    region: 'quebec',
    type: 'independent',
  },
  {
    name: 'Little Bit Western Feed and Supplies Inc.',
    location: 'Timmins, ON P4N 2S2',
    address: '372 Algonquin Blvd.West, Timmins, ON P4N 2S2',
    phone: '',
    url: 'https://www.littlebitwestern.ca/',
    descriptionKey: 'storesSection.storeDescriptions.completePetCareAndSupplies',
    descriptionFallback: 'Complete pet care and supplies',
    region: 'ontario',
    type: 'independent',
  },
  {
    name: 'K&K Pet Foods Dunbar',
    location: 'Vancouver, BC V6S 2G2',
    address: '4595 Dunbar St, Vancouver, BC V6S 2G2',
    phone: '+1 604-224-2513',
    url: 'https://www.kandkpetfoods.ca/',
    descriptionKey: 'storesSection.storeDescriptions.premiumPetProductsAndSupplies',
    descriptionFallback: 'Premium pet products and supplies',
    region: 'bc',
    type: 'independent',
  },
  {
    name: 'Viva Pets',
    location: 'Edmonton, AB T5P 4S1',
    address: '15004 107 Avenue Northwest, Edmonton, AB T5P 4S1',
    phone: '780-489-7387',
    url: 'https://web.facebook.com/people/Viva-Pets-YEG/61582377628485',
    descriptionKey: 'storesSection.storeDescriptions.premiumPetProductsAndSupplies',
    descriptionFallback: 'Premium pet products and supplies',
    region: 'alberta',
    type: 'independent',
  },
  {
    name: 'Best Cat',
    location: 'Burlington, ON L7N 2R4',
    address: '3455 Fairview St., Unit 15A, Burlington, ON L7N 2R4',
    phone: '1-905-333-4060',
    url: 'https://bestcat.ca/',
    descriptionKey: 'storesSection.storeDescriptions.premiumPetProductsAndSupplies',
    descriptionFallback: 'Premium pet products and supplies',
    region: 'ontario',
    type: 'independent',
  },
  {
    name: 'Camlachie Feed',
    location: 'Camlachie, ON N0N 1E0',
    address: '3912 Egremont Rd, Camlachie, ON N0N 1E0',
    phone: '519-899-2285',
    url: 'https://www.camlachiefeed.ca/',
    descriptionKey: 'storesSection.storeDescriptions.completePetCareAndSupplies',
    descriptionFallback: 'Complete pet care and supplies',
    region: 'ontario',
    type: 'independent',
  },
];

export function getStoreLogo(
  storeName: string,
  overrides: Partial<Pick<StoreLogoConfig, 'className' | 'width' | 'height'>> = {}
): StoreLogoConfig | null {
  const matchingKey = Object.keys(STORE_LOGOS).find((key) => storeName.includes(key));

  if (!matchingKey) {
    return null;
  }

  return {
    ...STORE_LOGOS[matchingKey],
    ...DEFAULT_LOGO_CONFIG,
    ...overrides,
  };
}

export function hasWhiteBackground(storeName: string): boolean {
  return WHITE_BG_STORES.some((key) => storeName.includes(key));
}
