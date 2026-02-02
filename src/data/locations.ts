import { cityOdorProfiles, type CityOdorProfile } from '../lib/locations/cities';

// Location data is now generated from cityOdorProfiles so that UI components,
// metadata, and analytics all read from a single source of truth.

export interface LocationCity {
  name: string;
  slug: string;
  provinceCode: string;
  profile: CityOdorProfile;
}

export interface Province {
  name: string;
  slug: string;
  code: string;
  region: CityOdorProfile['region'];
  cities: LocationCity[];
}

const slugify = (value: string): string =>
  value
    .trim()
    .toLowerCase()
    .replaceAll(/['’]/g, '')
    .replaceAll(/[^a-z0-9]+/g, '-')
    .replaceAll(/^-+|-+$/g, '');

const provinceMap = new Map<string, Province>();

for (const profile of cityOdorProfiles) {
  const provinceName = profile.province;
  const provinceSlug = slugify(provinceName);

  if (!provinceMap.has(provinceName)) {
    provinceMap.set(provinceName, {
      name: provinceName,
      slug: provinceSlug,
      code: profile.provinceCode,
      region: profile.region,
      cities: [],
    });
  }

  const province = provinceMap.get(provinceName);

  if (province) {
    province.cities.push({
      name: profile.name,
      slug: profile.slug,
      provinceCode: profile.provinceCode,
      profile,
    });
  }
}

const sortByName = <T extends { name: string }>(items: T[]): T[] =>
  items.sort((a, b) => a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }));

const provinces: Province[] = sortByName(Array.from(provinceMap.values())).map(
  (province) => ({
    ...province,
    cities: sortByName(province.cities),
  })
);

export const locationsByProvince: Province[] = provinces;

export function getAllCities(): LocationCity[] {
  return locationsByProvince.flatMap((province) => province.cities);
}

export function getCitiesByProvince(provinceCode: string): LocationCity[] {
  const province = getProvinceByCode(provinceCode);
  return province ? province.cities : [];
}

export function getProvinceByCode(provinceCode: string): Province | undefined {
  return locationsByProvince.find((province) => province.code === provinceCode);
}

export function getProvinceByName(provinceName: string): Province | undefined {
  return locationsByProvince.find(
    (province) => province.name.toLowerCase() === provinceName.toLowerCase()
  );
}

export function getProvinceBySlug(provinceSlug: string): Province | undefined {
  return locationsByProvince.find((province) => province.slug === provinceSlug);
}

export function getCityInProvinceByName(
  provinceName: string,
  cityName: string
): LocationCity | undefined {
  const province = getProvinceByName(provinceName);
  if (!province) {
    return undefined;
  }

  return province.cities.find(
    (city) => city.name.toLowerCase() === cityName.toLowerCase()
  );
}

export function getCityBySlug(slug: string): LocationCity | undefined {
  if (!slug) return undefined;
  const normalizedSlug = slug.toLowerCase();
  return getAllCities().find((city) => city.slug.toLowerCase() === normalizedSlug);
}

export function getAllProvinceSlugs(): string[] {
  return locationsByProvince.map((province) => province.slug);
}
