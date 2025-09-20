import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { OptimizedImage } from '../src/components/performance/OptimizedImage';
import { SITE_NAME } from '../src/lib/constants';
import { useTranslation } from '../src/lib/translation-context';
import { Button } from '../src/components/ui/button';
import { MapPin, Phone, Clock, Globe, Star, Search, Navigation } from 'lucide-react';
import { useState, useMemo } from 'react';

interface StockistLocation {
  id: string;
  name: string;
  nameEn?: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  phone: string;
  website?: string;
  email?: string;
  coordinates: { lat: number; lng: number };
  hours?: string;
  specialties?: string[];
  verified: boolean;
  lastUpdated: string;
  region: 'montreal' | 'quebec' | 'ontario' | 'bc' | 'alberta' | 'atlantic';
  type: 'independent' | 'chain' | 'franchise';
  products: ('trial' | 'regular' | 'large')[];
}

const STOCKIST_LOCATIONS: StockistLocation[] = [
  // Montreal Area
  {
    id: 'pattes-griffes-ste-therese',
    name: 'Pattes et Griffes',
    address: '190 Bd du Curé-Labelle suite 1b',
    city: 'Sainte-Thérèse',
    province: 'QC',
    postalCode: 'J7E 2X5',
    phone: '(450) 818-1310',
    website: 'https://pattesgriffes.com',
    coordinates: { lat: 45.6388, lng: -73.8398 },
    specialties: ['Complete pet care', 'Expert advice'],
    verified: true,
    lastUpdated: '2024-01-15',
    region: 'montreal',
    type: 'independent',
    products: ['trial', 'regular', 'large']
  },
  {
    id: 'chico-ste-therese',
    name: 'Chico - Boutique d\'animaux',
    address: '95 Bd du Curé-Labelle Suite 8',
    city: 'Sainte-Thérèse',
    province: 'QC',
    postalCode: 'J7E 2X4',
    phone: '(450) 965-3906',
    website: 'https://www.chico.ca/boutique/chico-sainte-therese/',
    coordinates: { lat: 45.6385, lng: -73.8395 },
    specialties: ['Premium pet products', 'Boutique experience'],
    verified: true,
    lastUpdated: '2024-01-15',
    region: 'montreal',
    type: 'franchise',
    products: ['regular', 'large']
  },
  {
    id: 'animal-shop-gigi',
    name: 'Animal Shop GIGI',
    address: '356 Bd Arthur-Sauvé',
    city: 'Saint-Eustache',
    province: 'QC',
    postalCode: 'J7R 2R8',
    phone: '(450) 598-3444',
    website: 'https://www.animaleriegigi.com/',
    coordinates: { lat: 45.5653, lng: -73.9058 },
    specialties: ['Family-owned', 'Personal service'],
    verified: true,
    lastUpdated: '2024-01-15',
    region: 'montreal',
    type: 'independent',
    products: ['trial', 'regular']
  },
  {
    id: 'pitou-minou-kirkland',
    name: 'Pitou Minou & Compagnons',
    address: '16936 Route Transcanadienne',
    city: 'Kirkland',
    province: 'QC',
    postalCode: 'H9H 3C7',
    phone: '(514) 695-5005',
    website: 'https://pitou-minou.ca/en/global-pet-foods-locations-quebec/',
    coordinates: { lat: 45.4459, lng: -73.8684 },
    specialties: ['Global Pet Foods', 'Premium nutrition'],
    verified: true,
    lastUpdated: '2024-01-15',
    region: 'montreal',
    type: 'franchise',
    products: ['regular', 'large']
  },
  {
    id: 'doghaus-montreal',
    name: 'Doghaus',
    address: '5671 Rue Sherbrooke O',
    city: 'Montreal',
    province: 'QC',
    postalCode: 'H4A 1W4',
    phone: '(514) 483-3555',
    website: 'https://www.doghausmtl.com/',
    coordinates: { lat: 45.4732, lng: -73.6165 },
    specialties: ['Premium products', 'Modern boutique'],
    verified: true,
    lastUpdated: '2024-01-15',
    region: 'montreal',
    type: 'independent',
    products: ['trial', 'regular', 'large']
  },
  {
    id: 'coquette-finegueule',
    name: 'Coquette et Finegueule',
    address: '5203 Av Bannantyne',
    city: 'Verdun',
    province: 'QC',
    postalCode: 'H4H 1K5',
    phone: '(514) 761-4221',
    website: 'https://coquetteetfinegueule.com/',
    coordinates: { lat: 45.4641, lng: -73.5684 },
    specialties: ['Grooming services', 'Local favorite'],
    verified: true,
    lastUpdated: '2024-01-15',
    region: 'montreal',
    type: 'independent',
    products: ['trial', 'regular']
  }
];

export default function Stockists() {
  const { t, locale } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');

  const pageTitle = locale === 'fr'
    ? 'Trouvez un Détaillant Purrify - Magasins Près de Chez Vous Canada'
    : 'Find a Purrify Retailer - Store Locator Canada';

  const pageDescription = locale === 'fr'
    ? 'Localisez les magasins qui vendent Purrify près de chez vous. Trouvez des animaleries, boutiques d\'animaux et détaillants à travers le Canada avec notre outil de localisation interactif.'
    : 'Locate stores selling Purrify near you. Find pet stores, animal boutiques, and retailers across Canada with our interactive store locator tool.';

  const canonicalUrl = `https://www.purrify.ca/${locale === 'fr' ? 'fr/' : ''}stockists`;

  // Filter stockists based on search and filters
  const filteredStockists = useMemo(() => {
    return STOCKIST_LOCATIONS.filter(stockist => {
      const matchesSearch = searchQuery === '' ||
        stockist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stockist.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stockist.province.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stockist.address.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRegion = selectedRegion === 'all' || stockist.region === selectedRegion;
      const matchesType = selectedType === 'all' || stockist.type === selectedType;

      return matchesSearch && matchesRegion && matchesType;
    });
  }, [searchQuery, selectedRegion, selectedType]);

  // Group stockists by region
  const stockistsByRegion = useMemo(() => {
    const grouped = filteredStockists.reduce((acc, stockist) => {
      if (!acc[stockist.region]) {
        acc[stockist.region] = [];
      }
      acc[stockist.region].push(stockist);
      return acc;
    }, {} as Record<string, StockistLocation[]>);

    // Sort each region's stockists by city name
    Object.keys(grouped).forEach(region => {
      grouped[region].sort((a, b) => a.city.localeCompare(b.city));
    });

    return grouped;
  }, [filteredStockists]);

  const regions = [
    { value: 'all', label: locale === 'fr' ? 'Toutes les régions' : 'All regions' },
    { value: 'montreal', label: locale === 'fr' ? 'Grand Montréal' : 'Greater Montreal' },
    { value: 'quebec', label: locale === 'fr' ? 'Québec' : 'Quebec' },
    { value: 'ontario', label: 'Ontario' },
    { value: 'bc', label: 'British Columbia' },
    { value: 'alberta', label: 'Alberta' },
    { value: 'atlantic', label: locale === 'fr' ? 'Provinces Atlantiques' : 'Atlantic Provinces' }
  ];

  const storeTypes = [
    { value: 'all', label: locale === 'fr' ? 'Tous les types' : 'All types' },
    { value: 'independent', label: locale === 'fr' ? 'Indépendant' : 'Independent' },
    { value: 'franchise', label: locale === 'fr' ? 'Franchise' : 'Franchise' },
    { value: 'chain', label: locale === 'fr' ? 'Chaîne' : 'Chain' }
  ];

  // Structured data for store locator
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": pageTitle,
    "description": pageDescription,
    "url": canonicalUrl,
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": STOCKIST_LOCATIONS.length,
      "itemListElement": STOCKIST_LOCATIONS.map((stockist, index) => ({
        "@type": "Store",
        "position": index + 1,
        "name": stockist.name,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": stockist.address,
          "addressLocality": stockist.city,
          "addressRegion": stockist.province,
          "postalCode": stockist.postalCode,
          "addressCountry": "CA"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": stockist.coordinates.lat,
          "longitude": stockist.coordinates.lng
        },
        "telephone": stockist.phone,
        "url": stockist.website,
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Purrify Cat Litter Products",
          "itemListElement": stockist.products.map(product => ({
            "@type": "Offer",
            "itemOffered": {
              "@type": "Product",
              "name": `Purrify ${product} size`,
              "brand": "Purrify"
            }
          }))
        }
      }))
    }
  };

  return (
    <>
      <NextSeo
        title={pageTitle}
        description={pageDescription}
        canonical={canonicalUrl}
        openGraph={{
          type: 'website',
          url: canonicalUrl,
          title: pageTitle,
          description: pageDescription,
          images: [
            {
              url: 'https://www.purrify.ca/images/store-locator.jpg',
              width: 1200,
              height: 630,
              alt: 'Find Purrify retailers and stockists near you across Canada',
            },
          ],
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: 'Purrify stockists, pet store locator Canada, where to buy Purrify, cat litter deodorizer retailers, pet supply stores near me, Purrify dealers, animal boutique locator',
          },
          {
            name: 'geo.region',
            content: 'CA'
          },
          {
            name: 'geo.placename',
            content: 'Canada'
          }
        ]}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="max-w-7xl mx-auto px-4 py-12 bg-white dark:bg-gray-900 min-h-screen">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {locale === 'fr'
              ? 'Trouvez un Détaillant Purrify Près de Chez Vous'
              : 'Find a Purrify Retailer Near You'
            }
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            {locale === 'fr'
              ? 'Découvrez les animaleries et boutiques d\'animaux qui vendent Purrify à travers le Canada. Utilisez notre localisateur de magasins pour trouver le détaillant le plus proche de chez vous.'
              : 'Discover pet stores and animal boutiques selling Purrify across Canada. Use our store locator to find the nearest retailer to you.'
            }
          </p>
        </section>

        {/* Search and Filters */}
        <section className="mb-12">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-8">
            <div className="grid gap-4 md:grid-cols-3">
              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5" />
                <input
                  type="text"
                  placeholder={locale === 'fr' ? 'Rechercher par ville, nom...' : 'Search by city, name...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                />
              </div>

              {/* Region Filter */}
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
              >
                {regions.map(region => (
                  <option key={region.value} value={region.value}>
                    {region.label}
                  </option>
                ))}
              </select>

              {/* Store Type Filter */}
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
              >
                {storeTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              {locale === 'fr'
                ? `${filteredStockists.length} détaillant(s) trouvé(s)`
                : `${filteredStockists.length} retailer(s) found`
              }
            </div>
          </div>
        </section>

        {/* Store Listings */}
        <section className="mb-16">
          {Object.keys(stockistsByRegion).length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {locale === 'fr'
                  ? 'Aucun détaillant trouvé'
                  : 'No retailers found'
                }
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {locale === 'fr'
                  ? 'Essayez de modifier vos critères de recherche ou contactez-nous pour demander l\'ajout d\'un nouveau magasin.'
                  : 'Try adjusting your search criteria or contact us to request a new store be added.'
                }
              </p>
              <Link
                href="/support/contact"
                className="inline-block bg-blue-600 text-white dark:text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                {locale === 'fr' ? 'Contactez-nous' : 'Contact Us'}
              </Link>
            </div>
          ) : (
            Object.entries(stockistsByRegion).map(([region, stockists]) => (
              <div key={region} className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 capitalize">
                  {region === 'montreal' && locale === 'fr' ? 'Grand Montréal' :
                   region === 'quebec' && locale === 'fr' ? 'Québec' :
                   region === 'atlantic' && locale === 'fr' ? 'Provinces Atlantiques' :
                   region.charAt(0).toUpperCase() + region.slice(1)}
                </h2>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {stockists.map(stockist => (
                    <div
                      key={stockist.id}
                      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
                    >
                      {/* Store Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                            {stockist.name}
                          </h3>
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                              stockist.type === 'independent'
                                ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200'
                                : stockist.type === 'franchise'
                                ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200'
                                : 'bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-200'
                            }`}>
                              {stockist.type === 'independent' && (locale === 'fr' ? 'Indépendant' : 'Independent')}
                              {stockist.type === 'franchise' && 'Franchise'}
                              {stockist.type === 'chain' && (locale === 'fr' ? 'Chaîne' : 'Chain')}
                            </span>
                            {stockist.verified && (
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 text-yellow-500 dark:text-yellow-400 fill-current" />
                                <span className="text-xs text-gray-600 dark:text-gray-400">
                                  {locale === 'fr' ? 'Vérifié' : 'Verified'}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Address */}
                      <div className="flex items-start gap-3 mb-3">
                        <MapPin className="h-5 w-5 text-gray-400 dark:text-gray-500 mt-0.5 flex-shrink-0" />
                        <div className="text-sm text-gray-700 dark:text-gray-300">
                          <div>{stockist.address}</div>
                          <div>{stockist.city}, {stockist.province} {stockist.postalCode}</div>
                        </div>
                      </div>

                      {/* Contact Info */}
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-3">
                          <Phone className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                          <a
                            href={`tel:${stockist.phone}`}
                            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                          >
                            {stockist.phone}
                          </a>
                        </div>

                        {stockist.website && (
                          <div className="flex items-center gap-3">
                            <Globe className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                            <a
                              href={stockist.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                            >
                              {locale === 'fr' ? 'Visiter le site web' : 'Visit website'}
                            </a>
                          </div>
                        )}
                      </div>

                      {/* Products Available */}
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                          {locale === 'fr' ? 'Produits disponibles:' : 'Products available:'}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {stockist.products.map(product => (
                            <span
                              key={product}
                              className="inline-block px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
                            >
                              {product === 'trial' && (locale === 'fr' ? 'Essai 17g' : 'Trial 17g')}
                              {product === 'regular' && (locale === 'fr' ? 'Régulier 60g' : 'Regular 60g')}
                              {product === 'large' && (locale === 'fr' ? 'Grand 120g' : 'Large 120g')}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Specialties */}
                      {stockist.specialties && stockist.specialties.length > 0 && (
                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                            {locale === 'fr' ? 'Spécialités:' : 'Specialties:'}
                          </h4>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {stockist.specialties.join(', ')}
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex gap-2">
                          <a
                            href={`https://maps.google.com/maps?q=${encodeURIComponent(
                              `${stockist.address}, ${stockist.city}, ${stockist.province}, Canada`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white dark:text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors"
                          >
                            <Navigation className="h-4 w-4" />
                            {locale === 'fr' ? 'Itinéraire' : 'Directions'}
                          </a>
                          <a
                            href={`tel:${stockist.phone}`}
                            className="flex items-center justify-center gap-2 px-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm font-medium rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                          >
                            <Phone className="h-4 w-4" />
                            {locale === 'fr' ? 'Appeler' : 'Call'}
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </section>

        {/* Call to Action */}
        <section className="text-center bg-blue-50 dark:bg-blue-900/20 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {locale === 'fr'
              ? 'Votre magasin ne vend pas encore Purrify?'
              : 'Your store doesn\'t carry Purrify yet?'
            }
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            {locale === 'fr'
              ? 'Encouragez votre animalerie locale à commander Purrify ou contactez-nous pour devenir un détaillant officiel.'
              : 'Encourage your local pet store to order Purrify or contact us to become an official retailer.'
            }
          </p>
          <div className="space-x-4">
            <Link
              href="/support/contact"
              className="inline-block bg-blue-600 text-white dark:text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              {locale === 'fr' ? 'Demander à mon magasin' : 'Request for my store'}
            </Link>
            <Link
              href="/b2b"
              className="inline-block border border-blue-600 text-blue-600 dark:text-blue-400 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
            >
              {locale === 'fr' ? 'Devenir détaillant' : 'Become a retailer'}
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
    revalidate: 3600, // Revalidate every hour
  };
};
