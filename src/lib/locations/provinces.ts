import { cityOdorProfiles, CityOdorProfile, ProvinceCode, RegionTag } from './cities';

export interface ProvinceData {
  code: ProvinceCode;
  name: string;
  nameFr: string;
  slug: string;
  region: RegionTag;
  population: number;
  description: string;
  descriptionFr: string;
  metaKeywords: string[];
}

export const PROVINCES: Record<string, ProvinceData> = {
  on: {
    code: 'ON',
    name: 'Ontario',
    nameFr: 'Ontario',
    slug: 'on',
    region: 'central',
    population: 14826276,
    description: 'Find Purrify cat litter deodorizer across Ontario. From Toronto to Ottawa, discover natural odor control solutions for your cat in Canada\'s most populous province.',
    descriptionFr: 'Trouvez le désodorisant pour litière Purrify partout en Ontario. De Toronto à Ottawa, découvrez des solutions naturelles de contrôle des odeurs pour votre chat dans la province la plus peuplée du Canada.',
    metaKeywords: [
      'cat litter Ontario',
      'cat litter deodorizer Ontario',
      'cat litter smell Ontario',
      'cat litter odor control Ontario',
      'best cat litter Ontario',
      'natural cat litter additive Ontario'
    ]
  },
  qc: {
    code: 'QC',
    name: 'Quebec',
    nameFr: 'Québec',
    slug: 'qc',
    region: 'central',
    population: 8604495,
    description: 'Discover Purrify cat litter deodorizer throughout Quebec. From Montreal to Quebec City, find effective odor elimination for your cat litter in French Canada.',
    descriptionFr: 'Découvrez le désodorisant pour litière Purrify partout au Québec. De Montréal à Québec, trouvez une élimination efficace des odeurs pour la litière de votre chat au Canada français.',
    metaKeywords: [
      'cat litter Quebec',
      'litière chat Québec',
      'désodorisant litière Québec',
      'cat litter deodorizer Quebec',
      'odeur litière chat Québec',
      'meilleure litière Québec'
    ]
  },
  ab: {
    code: 'AB',
    name: 'Alberta',
    nameFr: 'Alberta',
    slug: 'ab',
    region: 'prairies',
    population: 4442879,
    description: 'Get Purrify cat litter deodorizer in Alberta. From Calgary to Edmonton, keep your home fresh with natural activated carbon odor control for cat litter.',
    descriptionFr: 'Obtenez le désodorisant pour litière Purrify en Alberta. De Calgary à Edmonton, gardez votre maison fraîche avec un contrôle naturel des odeurs au charbon actif pour litière de chat.',
    metaKeywords: [
      'cat litter Alberta',
      'cat litter deodorizer Alberta',
      'cat litter smell Alberta',
      'Calgary cat litter',
      'Edmonton cat litter',
      'Alberta pet supplies'
    ]
  },
  mb: {
    code: 'MB',
    name: 'Manitoba',
    nameFr: 'Manitoba',
    slug: 'mb',
    region: 'prairies',
    population: 1383765,
    description: 'Find Purrify cat litter deodorizer in Manitoba. Winnipeg and beyond - eliminate cat litter odors naturally with activated carbon technology.',
    descriptionFr: 'Trouvez le désodorisant pour litière Purrify au Manitoba. Winnipeg et au-delà - éliminez naturellement les odeurs de litière pour chat avec la technologie au charbon actif.',
    metaKeywords: [
      'cat litter Manitoba',
      'cat litter deodorizer Manitoba',
      'Winnipeg cat litter',
      'cat litter smell Manitoba',
      'Manitoba pet supplies'
    ]
  },
  bc: {
    code: 'BC',
    name: 'British Columbia',
    nameFr: 'Colombie-Britannique',
    slug: 'bc',
    region: 'west-coast',
    population: 5214805,
    description: 'Shop Purrify cat litter deodorizer in British Columbia. From Vancouver to Victoria, enjoy fresh air with natural cat litter odor elimination.',
    descriptionFr: 'Achetez le désodorisant pour litière Purrify en Colombie-Britannique. De Vancouver à Victoria, profitez d\'un air frais avec l\'élimination naturelle des odeurs de litière pour chat.',
    metaKeywords: [
      'cat litter British Columbia',
      'cat litter BC',
      'Vancouver cat litter',
      'Victoria cat litter',
      'cat litter deodorizer BC',
      'BC pet supplies'
    ]
  },
  ns: {
    code: 'NS',
    name: 'Nova Scotia',
    nameFr: 'Nouvelle-Écosse',
    slug: 'ns',
    region: 'atlantic',
    population: 992055,
    description: 'Get Purrify cat litter deodorizer in Nova Scotia. Halifax and coastal communities - control cat litter odors naturally with activated carbon.',
    descriptionFr: 'Obtenez le désodorisant pour litière Purrify en Nouvelle-Écosse. Halifax et les communautés côtières - contrôlez naturellement les odeurs de litière pour chat avec du charbon actif.',
    metaKeywords: [
      'cat litter Nova Scotia',
      'Halifax cat litter',
      'cat litter deodorizer Nova Scotia',
      'cat litter smell Nova Scotia',
      'Nova Scotia pet supplies'
    ]
  },
  sk: {
    code: 'SK',
    name: 'Saskatchewan',
    nameFr: 'Saskatchewan',
    slug: 'sk',
    region: 'prairies',
    population: 1179844,
    description: 'Find Purrify cat litter deodorizer in Saskatchewan. From Regina to Saskatoon, eliminate cat litter odors with natural activated carbon technology.',
    descriptionFr: 'Trouvez le désodorisant pour litière Purrify en Saskatchewan. De Regina à Saskatoon, éliminez les odeurs de litière pour chat avec la technologie naturelle au charbon actif.',
    metaKeywords: [
      'cat litter Saskatchewan',
      'Regina cat litter',
      'Saskatoon cat litter',
      'cat litter deodorizer Saskatchewan',
      'Saskatchewan pet supplies'
    ]
  },
  nl: {
    code: 'NL',
    name: 'Newfoundland and Labrador',
    nameFr: 'Terre-Neuve-et-Labrador',
    slug: 'nl',
    region: 'atlantic',
    population: 521542,
    description: 'Shop Purrify cat litter deodorizer in Newfoundland and Labrador. Keep your home fresh with natural odor control for cat litter across the province.',
    descriptionFr: 'Achetez le désodorisant pour litière Purrify à Terre-Neuve-et-Labrador. Gardez votre maison fraîche avec un contrôle naturel des odeurs pour la litière de chat dans toute la province.',
    metaKeywords: [
      'cat litter Newfoundland',
      'cat litter Labrador',
      'cat litter deodorizer NL',
      'Newfoundland pet supplies',
      'cat litter smell Newfoundland'
    ]
  },
  nb: {
    code: 'NB',
    name: 'New Brunswick',
    nameFr: 'Nouveau-Brunswick',
    slug: 'nb',
    region: 'atlantic',
    population: 789225,
    description: 'Get Purrify cat litter deodorizer in New Brunswick. Natural activated carbon odor control for cat litter throughout the Maritime province.',
    descriptionFr: 'Obtenez le désodorisant pour litière Purrify au Nouveau-Brunswick. Contrôle naturel des odeurs au charbon actif pour la litière de chat dans toute la province maritime.',
    metaKeywords: [
      'cat litter New Brunswick',
      'cat litter deodorizer NB',
      'New Brunswick pet supplies',
      'cat litter smell New Brunswick',
      'Maritime cat litter'
    ]
  },
  pe: {
    code: 'PE',
    name: 'Prince Edward Island',
    nameFr: 'Île-du-Prince-Édouard',
    slug: 'pe',
    region: 'atlantic',
    population: 164318,
    description: 'Find Purrify cat litter deodorizer on Prince Edward Island. Natural odor elimination for cat litter in Canada\'s smallest province.',
    descriptionFr: 'Trouvez le désodorisant pour litière Purrify à l\'Île-du-Prince-Édouard. Élimination naturelle des odeurs pour la litière de chat dans la plus petite province du Canada.',
    metaKeywords: [
      'cat litter PEI',
      'cat litter Prince Edward Island',
      'cat litter deodorizer PEI',
      'PEI pet supplies',
      'cat litter smell PEI'
    ]
  }
};

/**
 * Get province data by slug
 */
export function getProvinceBySlug(slug: string): ProvinceData | null {
  const normalizedSlug = slug.toLowerCase();
  return PROVINCES[normalizedSlug] || null;
}

/**
 * Get all cities for a specific province
 */
export function getCitiesByProvince(provinceSlug: string): CityOdorProfile[] {
  const province = getProvinceBySlug(provinceSlug);
  if (!province) {
    return [];
  }

  return cityOdorProfiles.filter(
    city => city.provinceCode === province.code
  );
}

/**
 * Get all provinces
 */
export function getAllProvinces(): ProvinceData[] {
  return Object.values(PROVINCES);
}

/**
 * Get province by province code (e.g., 'ON', 'QC')
 */
export function getProvinceByCode(code: ProvinceCode): ProvinceData | null {
  return Object.values(PROVINCES).find(p => p.code === code) || null;
}

/**
 * Get city count for a province
 */
export function getCityCountByProvince(provinceSlug: string): number {
  return getCitiesByProvince(provinceSlug).length;
}
