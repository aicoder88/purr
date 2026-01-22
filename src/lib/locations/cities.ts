import cityProfileSeedsData from './city-profile-seeds.json';

export type ProvinceCode =
  | 'AB'
  | 'BC'
  | 'MB'
  | 'NB'
  | 'NL'
  | 'NS'
  | 'NT'
  | 'NU'
  | 'ON'
  | 'PE'
  | 'QC'
  | 'SK'
  | 'YT';

export type RegionTag = 'atlantic' | 'central' | 'prairies' | 'west-coast' | 'north';

export type EnglishQueryVariant = 'city-first' | 'in-first';
export type FrenchQueryVariant = 'city-first' | 'province-first';

const DEFAULT_ENGLISH_QUERY_VARIANT: EnglishQueryVariant = 'in-first';
const DEFAULT_FRENCH_QUERY_VARIANT: FrenchQueryVariant = 'province-first';

const DEFAULT_CORE_HEAD_TERMS = [
  'cat litter smell',
  'cat litter odor',
  'cat litter odour',
  'cat litter smell removal',
  'best cat litter for smell',
  'cat litter deodorizer',
] as const;

const ENGLISH_QUERY_PHRASES = [
  'best cat litter for smell',
  'cat litter deodorizer',
  'cat litter odor',
  'cat litter odour',
  'cat litter smell',
  'remove cat litter smell',
  'stop cat litter smell',
] as const;

const FRENCH_QUERY_PHRASES = [
  'éliminer odeur bac à litière',
  'meilleure litière contre odeur',
  'neutraliser odeur litière chat',
  'odeur litière pour chat',
  'odeurs litière chat',
] as const;

export interface CityOdorProfile {
  slug: string;
  name: string;
  province: string;
  provinceCode: ProvinceCode;
  region: RegionTag;
  metroPopulation: number | null;
  populationLabel: string;
  housingHighlights: string[];
  climateConsiderations: string[];
  scentPainPoints: string[];
  retailerAllies: string[];
  englishQueries: string[];
  frenchQueries: string[];
  coreHeadTerms: string[];
  /** Whether this city should be indexed by search engines. Defaults to true. */
  indexed: boolean;
}

export interface CityProfileSeed {
  slug: string;
  name: string;
  province: string;
  provinceCode: ProvinceCode;
  region: RegionTag;
  metroPopulation: number | null;
  populationLabel: string;
  housingHighlights: string[];
  climateConsiderations: string[];
  scentPainPoints: string[];
  retailerAllies: string[];
  englishQueryVariant?: EnglishQueryVariant;
  frenchQueryVariant?: FrenchQueryVariant;
  /** Whether this city should be indexed by search engines. Defaults to true if not specified. */
  indexed?: boolean;
}

const cityProfileSeeds = cityProfileSeedsData as CityProfileSeed[];

const buildEnglishQueries = (
  cityName: string,
  provinceCode: ProvinceCode,
  variant: EnglishQueryVariant
): string[] =>
  ENGLISH_QUERY_PHRASES.flatMap((phrase) =>
    variant === 'city-first'
      ? [`${phrase} ${cityName}`, `${phrase} ${cityName} ${provinceCode}`, `${phrase} in ${cityName}`]
      : [`${phrase} in ${cityName}`, `${phrase} ${cityName}`, `${phrase} ${cityName} ${provinceCode}`]
  );

const buildFrenchQueries = (cityName: string, provinceName: string, variant: FrenchQueryVariant): string[] =>
  FRENCH_QUERY_PHRASES.flatMap((phrase) =>
    variant === 'city-first'
      ? [`${phrase} ${cityName}`, `${phrase} ${provinceName}`]
      : [`${phrase} ${provinceName}`, `${phrase} ${cityName}`]
  );

const appendScentPainPointSuffix = (painPoints: string[], cityName: string): string[] => [
  ...painPoints,
  `${cityName} pet parents want low-maintenance smell control`,
];

export const cityOdorProfiles: CityOdorProfile[] = cityProfileSeeds.map((seed) => {
  const {
    englishQueryVariant,
    frenchQueryVariant,
    scentPainPoints,
    housingHighlights,
    climateConsiderations,
    retailerAllies,
    indexed,
    ...base
  } = seed;

  const englishVariant = englishQueryVariant ?? DEFAULT_ENGLISH_QUERY_VARIANT;
  const frenchVariant = frenchQueryVariant ?? DEFAULT_FRENCH_QUERY_VARIANT;

  return {
    ...base,
    housingHighlights: [...housingHighlights],
    climateConsiderations: [...climateConsiderations],
    scentPainPoints: appendScentPainPointSuffix(scentPainPoints, base.name),
    retailerAllies: [...retailerAllies],
    englishQueries: buildEnglishQueries(base.name, base.provinceCode, englishVariant),
    frenchQueries: buildFrenchQueries(base.name, base.province, frenchVariant),
    coreHeadTerms: [...DEFAULT_CORE_HEAD_TERMS],
    indexed: indexed ?? true, // Default to indexed if not specified
  };
});

