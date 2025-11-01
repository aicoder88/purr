import React, { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { useTranslation } from '../../lib/translation-context';
import type { CityConfig } from './client-locations-types';

const ClientLocationsLeafletMap = dynamic(
  () => import('./ClientLocationsLeafletMap').then(mod => mod.ClientLocationsLeafletMap),
  { ssr: false }
);

const createGoogleMapsLink = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

const BASE_CITY_CONFIGS: CityConfig[] = [
  {
    id: 'montreal',
    name: 'Montreal',
    labels: { en: 'Montreal', fr: 'Montréal' },
    center: [45.5089, -73.5617],
    zoom: 11.5,
    stores: [
      {
        id: 'chico-saint-laurent',
        name: 'Chico (Saint-Laurent)',
        address: '7001 Boulevard Saint-Laurent',
        city: 'Montreal',
        province: 'QC',
        postalCode: 'H2S 3E3',
        phone: '514-657-5813',
        website: 'https://www.chico.ca/boutique/chico-boul-st-laurent-montreal/',
        googleMapsUrl: createGoogleMapsLink('Chico 7001 Boulevard Saint-Laurent Montreal QC H2S 3E3'),
        coordinates: [45.5385, -73.619],
      },
      {
        id: 'doghaus',
        name: 'Doghaus',
        address: '5671 Rue Sherbrooke Ouest',
        city: 'Montreal',
        province: 'QC',
        postalCode: 'H4A 1W6',
        phone: '514-483-3555',
        website: 'https://www.doghausmtl.com/',
        googleMapsUrl: createGoogleMapsLink('Doghaus 5671 Rue Sherbrooke Ouest Montreal QC'),
        coordinates: [45.4745, -73.6146],
      },
      {
        id: 'pitou-minou-verdun',
        name: 'Pitou Minou & Compagnons (Verdun)',
        address: '4100 Rue Wellington',
        city: 'Verdun',
        province: 'QC',
        postalCode: 'H4G 1V7',
        phone: '514-732-0555',
        website: 'https://www.pitouminou.com/en/global-pet-foods-locations-quebec/',
        googleMapsUrl: createGoogleMapsLink('Pitou Minou & Compagnons 4100 Rue Wellington Verdun QC'),
        coordinates: [45.4576, -73.5695],
      },
    ],
  },
  {
    id: 'toronto',
    name: 'Toronto',
    labels: { en: 'Toronto', fr: 'Toronto' },
    center: [43.6532, -79.3832],
    zoom: 11.5,
    stores: [],
    comingSoonNote: {
      en: 'We are onboarding retail partners in Toronto. Contact us to stock Purrify in your store.',
      fr: 'Nous recrutons actuellement des partenaires détaillants à Toronto. Contactez-nous pour offrir Purrify dans votre magasin.',
    },
  },
  {
    id: 'vancouver',
    name: 'Vancouver',
    labels: { en: 'Vancouver', fr: 'Vancouver' },
    center: [49.2827, -123.1207],
    zoom: 12.5,
    stores: [
      {
        id: 'kk-pet-foods-dunbar',
        name: 'K&K Pet Foods Dunbar',
        address: '4595 Dunbar St',
        city: 'Vancouver',
        province: 'BC',
        phone: '+1 604-224-2513',
        website: 'https://www.kandkpetfoods.ca/',
        googleMapsUrl:
          'https://www.google.com/maps/search/?api=1&query=K%26K%20Pet%20Foods%20Dunbar&query_place_id=ChIJJxc8_RNzhlQRgIbbljzORyo',
        coordinates: [49.2426, -123.1848],
        notes: 'Ask for Pablo and mention you are part of the Purrify retailer network.',
      },
    ],
  },
  {
    id: 'calgary',
    name: 'Calgary',
    labels: { en: 'Calgary', fr: 'Calgary' },
    center: [51.0447, -114.0719],
    zoom: 11.2,
    stores: [],
    comingSoonNote: {
      en: 'Calgary retailers are in progress—reach out to be first on shelves.',
      fr: 'Des détaillants à Calgary arriveront bientôt — contactez-nous pour être les premiers en rayon.',
    },
  },
  {
    id: 'ottawa',
    name: 'Ottawa',
    labels: { en: 'Ottawa', fr: 'Ottawa' },
    center: [45.4215, -75.6972],
    zoom: 11.5,
    stores: [],
    comingSoonNote: {
      en: 'We are expanding into Ottawa. Partner with us to offer Purrify locally.',
      fr: 'Nous nous développons à Ottawa. Devenez partenaire pour offrir Purrify localement.',
    },
  },
  {
    id: 'quebec-city',
    name: 'Quebec City',
    labels: { en: 'Quebec City', fr: 'Québec' },
    center: [46.8139, -71.208],
    zoom: 12,
    stores: [],
    comingSoonNote: {
      en: 'Quebec City locations are coming soon. Get in touch to reserve launch inventory.',
      fr: 'Les points de vente à Québec arrivent bientôt. Contactez-nous pour réserver votre inventaire de lancement.',
    },
  },
];

interface ClientLocationsMapProps {
  className?: string;
  height?: string;
  showHeader?: boolean;
  headerTitle?: string;
  headerDescription?: string;
}

export const ClientLocationsMap: React.FC<ClientLocationsMapProps> = ({
  className = '',
  height = '480',
  showHeader = true,
  headerTitle,
  headerDescription
}) => {
  const { t, locale } = useTranslation();
  const localeKey = locale === 'fr' ? 'fr' : 'en';

  const defaultTitle = locale === 'fr'
    ? 'Nos Clients Actuels | Emplacements Purrify'
    : 'Our Current Clients | Purrify Locations';

  const defaultDescription = locale === 'fr'
    ? 'Découvrez où nos clients utilisent Purrify à travers le Canada. Chaque point représente une famille satisfaite qui a transformé l\'expérience de la litière de son chat.'
    : 'See where our clients are using Purrify across Canada. Each location represents a satisfied family who has transformed their cat litter experience.';

  const title = headerTitle || defaultTitle;
  const description = headerDescription || defaultDescription;
  const cities = useMemo(() => BASE_CITY_CONFIGS, []);
  const [activeCityId, setActiveCityId] = useState(cities[0]?.id ?? 'montreal');
  const activeCity = useMemo(
    () => cities.find(city => city.id === activeCityId) ?? cities[0],
    [activeCityId, cities]
  );

  return (
    <section className={`py-8 ${className}`}>
      {showHeader && (
        <div className="container mx-auto px-4 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-4 text-center">
            {title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 text-center max-w-4xl mx-auto">
            {description}
          </p>
        </div>
      )}

      <div className="container mx-auto px-4">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-2/3 w-full">
              <div className="overflow-hidden rounded-xl border border-gray-100 dark:border-gray-700 shadow-inner">
                {activeCity && (
                  <ClientLocationsLeafletMap city={activeCity} height={height} />
                )}
              </div>
            </div>
            <div className="lg:w-1/3 w-full">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {locale === 'fr'
                  ? '🗺️ Emplacements clients Purrify à travers le Canada - Montréal, Toronto, Vancouver et plus'
                  : '🗺️ Purrify client locations across Canada - Montreal, Toronto, Vancouver and more'}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {cities.map(city => {
                  const label = city.labels[localeKey];
                  const isActive = city.id === activeCityId;
                  return (
                    <button
                      key={city.id}
                      type="button"
                      onClick={() => setActiveCityId(city.id)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-[#FF3131] text-white dark:text-white shadow-lg'
                          : 'bg-blue-100 text-blue-900 dark:bg-blue-900/30 dark:text-blue-100 hover:bg-blue-200 dark:hover:bg-blue-900/50'
                      }`}
                      aria-pressed={isActive}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                  {locale === 'fr' ? 'Magasins vedettes' : 'Featured retailers'} —{' '}
                  {activeCity?.labels[localeKey]}
                </h3>
                {activeCity?.stores.length ? (
                  <ul className="space-y-3">
                    {activeCity.stores.map(store => (
                      <li
                        key={store.id}
                        className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/40 p-3"
                      >
                        <p className="font-medium text-gray-900 dark:text-gray-50">{store.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{store.address}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {store.city}, {store.province} {store.postalCode ?? ''}
                        </p>
                        {store.phone && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {locale === 'fr' ? 'Téléphone' : 'Phone'}: {store.phone}
                          </p>
                        )}
                        <div className="mt-2 flex flex-wrap gap-2">
                          {store.website && (
                            <a
                              href={store.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs font-semibold text-[#0F766E] dark:text-[#86efac] hover:underline"
                            >
                              {locale === 'fr' ? 'Site web' : 'Website'}
                            </a>
                          )}
                          {store.googleMapsUrl && (
                            <a
                              href={store.googleMapsUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs font-semibold text-[#0F766E] dark:text-[#86efac] hover:underline"
                            >
                              Google Maps
                            </a>
                          )}
                        </div>
                        {store.notes && (
                          <p className="mt-2 text-xs italic text-gray-500 dark:text-gray-400">
                            {store.notes}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-600 dark:text-gray-300 rounded-lg border border-dashed border-gray-300 dark:border-gray-700 p-4 bg-white/60 dark:bg-gray-900/20">
                    {activeCity?.comingSoonNote?.[localeKey] ??
                      (locale === 'fr'
                        ? 'De nouveaux détaillants seront annoncés sous peu. Communiquez avec nous pour être informé dès que possible.'
                        : 'New retail partners will be announced shortly. Contact us to be first to know.')}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
