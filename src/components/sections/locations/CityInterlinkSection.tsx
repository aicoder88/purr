import Link from 'next/link';

import {
  getProvinceByName,
  locationsByProvince,
  type LocationCity,
} from '@/data/locations';

interface CityInterlinkSectionProps {
  cityName: string;
  provinceName: string;
}

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

export function CityInterlinkSection({
  cityName,
  provinceName,
}: CityInterlinkSectionProps) {
  const province = getProvinceByName(provinceName);

  if (!province) {
    return null;
  }

  const siblingCities = province.cities.filter(
    (city) => normalize(city.name) !== normalize(cityName)
  );

  const buildCityTagline = (city: LocationCity) => {
    const scentFocus = city.profile.scentPainPoints[0];
    if (!scentFocus) {
      return `Best cat litter odor control for ${city.name}, ${province.name}`;
    }
    return `${scentFocus} in ${city.name}`;
  };

  const otherProvinces = locationsByProvince.filter(
    (candidateProvince) => normalize(candidateProvince.name) !== normalize(provinceName)
  );

  return (
    <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto space-y-12">
        {siblingCities.length > 0 && (
          <div>
            <h2 className="font-heading text-3xl font-bold text-center mb-8 text-gray-900 dark:text-gray-50">
              Explore More {province.name} Cities
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {siblingCities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/locations/${city.slug}`}
                  prefetch={false}
                  className="group flex flex-col rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/70 p-4 shadow-sm transition hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-500 dark:focus-visible:ring-orange-400"
                >
                  <span className="text-lg font-semibold text-gray-900 dark:text-gray-50 group-hover:text-orange-600 dark:group-hover:text-orange-300">
                    {city.name}
                  </span>
                  <span className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                    {buildCityTagline(city)}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div>
          <h2 className="font-heading text-3xl font-bold text-center mb-8 text-gray-900 dark:text-gray-50">
            Browse Canadian Provinces
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {otherProvinces.map((candidateProvince) => (
              <Link
                key={candidateProvince.slug}
                href={`/locations/province/${candidateProvince.slug}`}
                prefetch={false}
                className="inline-flex items-center rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/70 px-4 py-2 text-sm font-medium text-gray-900 dark:text-gray-100 transition hover:border-orange-300 dark:hover:border-orange-500/70 hover:text-orange-600 dark:hover:text-orange-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-500 dark:focus-visible:ring-orange-400"
              >
                {candidateProvince.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
