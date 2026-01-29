import { NextSeo } from 'next-seo';
import Link from 'next/link';
import Image from 'next/image';
import { GetStaticProps } from 'next';
import { useTranslation } from '../src/lib/translation-context';
import { MapPin, Phone, Globe, Search, Navigation, Store as StoreIcon } from 'lucide-react';
import { useState, useMemo } from 'react';
import { buildAvailabilityUrl, getPriceValidityDate } from '../src/lib/seo-utils';
import { useEnhancedSEO } from '../src/hooks/useEnhancedSEO';

// ============================================================================
// Types
// ============================================================================

interface Store {
  name: string;
  location: string;
  address: string;
  phone: string;
  url: string;
  description: string;
  region: 'montreal' | 'laval' | 'quebec' | 'ontario' | 'bc';
  type: 'independent' | 'franchise' | 'chain';
}

interface LogoConfig {
  src: string;
  alt: string;
  className: string;
  width: number;
  height: number;
}

// ============================================================================
// Logo Configuration (matching homepage exactly)
// ============================================================================

const DEFAULT_LOGO_CONFIG = {
  className: 'w-12 h-12 object-contain',
  width: 48,
  height: 48,
} as const;

const STORE_LOGOS: Record<string, Omit<LogoConfig, 'className' | 'width' | 'height'>> = {
  'Chico': { src: '/optimized/chico-logo.svg', alt: 'Chico - Boutique d\'animaux Logo' },
  'Pattes et Griffes': { src: '/optimized/pattes.webp', alt: 'Pattes et Griffes Logo' },
  'GIGI': { src: '/optimized/gigi.webp', alt: 'Animal Shop GIGI - Pet Store Logo' },
  'Pitou Minou': { src: '/optimized/pitou-minou.webp', alt: 'Pitou Minou & Compagnons - Pet Store Logo' },
  'Doghaus': { src: '/optimized/doghaus.webp', alt: 'Doghaus Montreal - Premium Pet Store Logo' },
  'Kong': { src: '/optimized/kong-animalerie.webp', alt: 'KONG ANIMALERIE - Montreal Pet Store Logo' },
  'Coquette': { src: '/optimized/coquette-finegueule.webp', alt: 'Coquette et Finegueule - Pet Store with Grooming Logo' },
  'Animalerie Mamiwouff': { src: '/optimized/animalerie-mamiwouff.webp', alt: 'Animalerie Mamiwouff - Family-Owned Pet Store Logo' },
  'Animalerie Lamifidel': { src: '/optimized/lamifidel.avif', alt: 'Animalerie Lamifidel - Complete Pet Care and Supplies Logo' },
  'Animalerie Petmobile Nathamo': { src: '/optimized/nathamo.avif', alt: 'Animalerie Petmobile Nathamo - Complete Pet Care and Supplies Logo' },
  'Animalerie Club Wouf Miaou': { src: '/optimized/woofmiao-logo.webp', alt: 'Animalerie Club Wouf Miaou - Pet Store Logo' },
  'K&K Pet Foods': { src: '/optimized/kk.avif', alt: 'K&K Pet Foods Dunbar - Premium Pet Products & Supplies Logo' },
  'Viva Pets': { src: '/optimized/viva-pets.avif', alt: 'Viva Pets - Premium Pet Products & Supplies Logo' },
  'Little Bit Western': { src: '/optimized/little-bit-western.avif', alt: 'Little Bit Western Feed and Supplies Inc. - Pet and Feed Store Logo' },
};

const WHITE_BG_STORES = Object.keys(STORE_LOGOS);

const getStoreLogo = (storeName: string): LogoConfig | null => {
  const matchingKey = Object.keys(STORE_LOGOS).find(key => storeName.includes(key));
  if (!matchingKey) return null;

  const logoData = STORE_LOGOS[matchingKey];
  return {
    ...logoData,
    ...DEFAULT_LOGO_CONFIG,
  };
};

const hasWhiteBackground = (storeName: string): boolean => {
  return WHITE_BG_STORES.some(key => storeName.includes(key));
};

// ============================================================================
// Store Data (matching homepage exactly)
// ============================================================================

const getStoresWithTranslations = (t: ReturnType<typeof import('../src/lib/translation-context').useTranslation>['t']): Store[] => [
  {
    name: "Pattes et Griffes (Sainte-Thérèse)",
    location: "Sainte-Thérèse, QC J7E 2X5",
    address: "190 Boulevard du Curé-Labelle, Sainte-Thérèse, QC J7E 2X5",
    phone: "1-450-818-1310",
    url: "https://www.pattesgriffes.com/pages/trouvez-une-boutique",
    description: t.storesSection?.storeDescriptions?.completePetCareAndSupplies || "",
    region: 'montreal',
    type: 'franchise'
  },
  {
    name: "Chico (Sainte-Thérèse)",
    location: "Sainte-Thérèse, QC J7E 2Z7",
    address: "95 Boulevard du Curé-Labelle, Sainte-Thérèse, QC J7E 2Z7",
    phone: "1-450-965-3906",
    url: "https://www.chico.ca/boutique/chico-sainte-therese/",
    description: t.storesSection?.storeDescriptions?.premiumPetBoutique || "",
    region: 'montreal',
    type: 'franchise'
  },
  {
    name: "Chico (Sainte-Marthe-sur-le-Lac)",
    location: "Sainte-Marthe-sur-le-Lac, QC J0N 1P0",
    address: "2860 B Boulevard des Promenades, Sainte-Marthe-sur-le-Lac, QC J0N 1P0",
    phone: "1-450-598-2860",
    url: "https://www.chico.ca/boutique/chico-ste-marthe/",
    description: t.storesSection?.storeDescriptions?.premiumPetBoutique || "",
    region: 'montreal',
    type: 'franchise'
  },
  {
    name: "Animal Shop GIGI",
    location: "Saint-Eustache, QC J7R 2J3",
    address: "356 Boulevard Arthur-Sauvé, Saint-Eustache, QC J7R 2J3",
    phone: "1-450-598-3444",
    url: "https://www.animaleriegigi.com/",
    description: t.storesSection?.storeDescriptions?.familyOwnedPetStore || "",
    region: 'montreal',
    type: 'independent'
  },
  {
    name: "Chico (Laval-Est)",
    location: "Laval, QC H7E 0A4",
    address: "5405 Boulevard Robert-Bourassa, Laval, QC H7E 0A4",
    phone: "1-450-239-0354",
    url: "https://www.chico.ca/en/boutique/chico-laval-east/",
    description: t.storesSection?.storeDescriptions?.premiumPetBoutique || "",
    region: 'laval',
    type: 'franchise'
  },
  {
    name: "Chico (Laval Ouest)",
    location: "Laval, QC H7R 5P8",
    address: "4511 Bd Arthur-Sauvé, Laval, QC H7R 5P8",
    phone: "1-450-314-2442",
    url: "https://www.chico.ca/boutique/chico-laval-ouest/",
    description: t.storesSection?.storeDescriptions?.premiumPetBoutique || "",
    region: 'laval',
    type: 'franchise'
  },
  {
    name: "Pattes et Griffes (Laval)",
    location: "Laval, QC H7S 1M9",
    address: "1682 Boulevard Saint-Martin Ouest, Laval, QC H7S 1M9",
    phone: "1-579-640-1857",
    url: "https://www.pattesgriffes.com/pages/trouvez-une-boutique",
    description: t.storesSection?.storeDescriptions?.completePetCareAndSupplies || "",
    region: 'laval',
    type: 'franchise'
  },
  {
    name: "Pitou Minou & Compagnons (Kirkland)",
    location: "Kirkland, QC H9H 0C5",
    address: "16936 Autoroute Transcanadienne, Kirkland, QC H9H 0C5",
    phone: "1-514-695-5005",
    url: "https://pitou-minou.ca/global-pet-foods-succursales-quebec/",
    description: t.storesSection?.storeDescriptions?.globalPetFoodsLocation || "",
    region: 'montreal',
    type: 'franchise'
  },
  {
    name: "Chico (Saint-Laurent)",
    location: "Montreal, QC H2S 3E3",
    address: "7001 Boulevard Saint-Laurent, Montréal, QC H2S 3E3",
    phone: "1-514-657-5813",
    url: "https://www.chico.ca/boutique/chico-boul-st-laurent-montreal/",
    description: t.storesSection?.storeDescriptions?.premiumPetBoutique || "",
    region: 'montreal',
    type: 'franchise'
  },
  {
    name: "Doghaus",
    location: "Montreal, QC H4A 1W6",
    address: "5671 Rue Sherbrooke Ouest, Montréal, QC H4A 1W6",
    phone: "514-483-3555",
    url: "https://www.doghausmtl.com/",
    description: t.storesSection?.storeDescriptions?.premiumPetProductsAndSupplies || "",
    region: 'montreal',
    type: 'independent'
  },
  {
    name: "Kong Animalerie",
    location: "Montreal, QC H3W 3H8",
    address: "5555 Bd Décarie, Montréal, QC H3W 3H8",
    phone: "514-662-8373",
    url: "https://www.facebook.com/konganimalerie/",
    description: t.storesSection?.storeDescriptions?.fullServicePetStore || "",
    region: 'montreal',
    type: 'independent'
  },
  {
    name: "Coquette et Finegueule",
    location: "Verdun, QC H4H 1E6",
    address: "5203 Rue Bannantyne, Verdun, QC H4H 1E6",
    phone: "514-761-4221",
    url: "https://coquetteetfinegueule.com/",
    description: t.storesSection?.storeDescriptions?.petStoreWithGroomingServices || "",
    region: 'montreal',
    type: 'independent'
  },
  {
    name: "Pitou Minou & Compagnons (Verdun)",
    location: "Verdun, QC H4G 1V7",
    address: "4100 Rue Wellington, Verdun, QC H4G 1V7",
    phone: "514-732-0555",
    url: "https://pitou-minou.ca/global-pet-foods-succursales-quebec/",
    description: t.storesSection?.storeDescriptions?.globalPetFoodsLocation || "",
    region: 'montreal',
    type: 'franchise'
  },
  {
    name: "Chico (Plateau Mont-Royal)",
    location: "Montreal, QC H2H 1J6",
    address: "2016 Avenue du Mont-Royal E., Montréal, QC H2H 1J6",
    phone: "514-521-0201",
    url: "https://www.chico.ca/boutique/chico-plateau-mont-royal-montreal/",
    description: t.storesSection?.storeDescriptions?.premiumPetBoutique || "",
    region: 'montreal',
    type: 'franchise'
  },
  {
    name: "Chico (Hochelaga-Maisonneuve)",
    location: "Montreal, QC H1L 2M4",
    address: "8646 Rue Hochelaga, Montréal, QC H1L 2M4",
    phone: "514-419-9850",
    url: "https://www.chico.ca/boutique/chico-rue-ontario-montreal/",
    description: t.storesSection?.storeDescriptions?.premiumPetBoutique || "",
    region: 'montreal',
    type: 'franchise'
  },
  {
    name: "Chico (Plateau Mont-Royal — Ontario)",
    location: "Montreal, QC H1W 1S7",
    address: "3911 Rue Ontario E., Montréal, QC H1W 1S7",
    phone: "514-527-1371",
    url: "https://www.chico.ca/boutique/chico-rue-ontario-montreal/",
    description: t.storesSection?.storeDescriptions?.premiumPetBoutique || "",
    region: 'montreal',
    type: 'franchise'
  },
  {
    name: "Animalerie Mamiwouff Inc",
    location: "Saint-Césaire, QC J0L 1T0",
    address: "2048 Route 112, Saint-Césaire, QC J0L 1T0",
    phone: "450-469-4560",
    url: "https://www.animaleriemamiwouff.com/",
    description: t.storesSection?.storeDescriptions?.familyOwnedPetStore || "",
    region: 'quebec',
    type: 'independent'
  },
  {
    name: "Animalerie Lamifidel",
    location: "Alma, QC G8B 2V6",
    address: "1295 Avenue du Pont S, Alma, QC G8B 2V6",
    phone: "418-668-0117",
    url: "https://www.lamifidel.net/",
    description: t.storesSection?.storeDescriptions?.completePetCareAndSupplies || "",
    region: 'quebec',
    type: 'independent'
  },
  {
    name: "Animalerie Petmobile Nathamo",
    location: "Shawinigan, QC G0X 1L0",
    address: "161 Rue de l'Hydravion, Shawinigan, QC G0X 1L0",
    phone: "819-695-2329",
    url: "",
    description: t.storesSection?.storeDescriptions?.completePetCareAndSupplies || "",
    region: 'quebec',
    type: 'independent'
  },
  {
    name: "Animalerie Club Wouf Miaou",
    location: "Trois-Rivières, QC G9A 6M1",
    address: "3175 boulevard des Récollets, Trois-Rivières, QC G9A 6M1",
    phone: "+1 819-376-0973",
    url: "https://woufmiaou.ca/",
    description: t.storesSection?.storeDescriptions?.completePetCareAndSupplies || "",
    region: 'quebec',
    type: 'independent'
  },
  {
    name: "Little Bit Western Feed and Supplies Inc.",
    location: "Timmins, ON P4N 2S2",
    address: "372 Algonquin Blvd.West, TIMMINS, ON P4N 2S2",
    phone: "",
    url: "https://www.littlebitwestern.ca/",
    description: t.storesSection?.storeDescriptions?.completePetCareAndSupplies || "",
    region: 'ontario',
    type: 'independent'
  },
  {
    name: "K&K Pet Foods Dunbar",
    location: "Vancouver, BC V6S 2G2",
    address: "4595 Dunbar St, Vancouver, BC V6S 2G2",
    phone: "+1 604-224-2513",
    url: "https://www.kandkpetfoods.ca/",
    description: t.storesSection?.storeDescriptions?.premiumPetProductsAndSupplies || "",
    region: 'bc',
    type: 'independent'
  },
  {
    name: "Viva Pets",
    location: "Montreal, QC",
    address: "Montreal, QC",
    phone: "780-489-7387",
    url: "https://www.vivapets.ca/",
    description: t.storesSection?.storeDescriptions?.premiumPetProductsAndSupplies || "",
    region: 'montreal',
    type: 'independent'
  },
];

// ============================================================================
// Logo Image Component
// ============================================================================

function StoreLogoImage({
  logoConfig,
  storeName
}: {
  logoConfig: LogoConfig | null;
  storeName: string;
}) {
  const [hasError, setHasError] = useState(false);

  if (!logoConfig || hasError) {
    return <StoreIcon className="w-6 h-6 text-white dark:text-gray-100" />;
  }

  return (
    <Image
      src={logoConfig.src}
      alt={logoConfig.alt || storeName}
      width={logoConfig.width}
      height={logoConfig.height}
      className={logoConfig.className}
      onError={() => setHasError(true)}
    />
  );
}

// ============================================================================
// Page Component
// ============================================================================

export default function StoresPage() {
  const { t, locale } = useTranslation();
  const stores = getStoresWithTranslations(t);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');

  const pageTitle = locale === 'fr'
    ? 'Magasins Purrify - Trouvez un Détaillant Près de Chez Vous'
    : 'Purrify Stores - Find a Retailer Near You';

  const pageDescription = locale === 'fr'
    ? 'Trouvez les animaleries qui vendent Purrify près de chez vous. Découvrez nos détaillants partenaires au Québec, Ontario et Colombie-Britannique.'
    : 'Find pet stores selling Purrify near you. Discover our partner retailers across Quebec, Ontario, and British Columbia.';

  const priceValidUntil = getPriceValidityDate();
  const availabilityUrl = buildAvailabilityUrl();

  // Use enhanced SEO hook for automated optimization
  const { nextSeoProps } = useEnhancedSEO({
    path: '/stores',
    title: pageTitle,
    description: pageDescription,
    targetKeyword: 'Purrify stores Canada',
    image: 'https://www.purrify.ca/optimized/logo-light.webp',
    keywords: [
      'Purrify stores',
      'pet store locator Canada',
      'where to buy Purrify',
      'cat litter deodorizer retailers',
      'pet supply stores near me',
      'Purrify dealers',
      'animal boutique Quebec',
    ],
  });

  const canonicalUrl = nextSeoProps.canonical;

  // Filter stores based on search and filters
  const filteredStores = useMemo(() => {
    return stores.filter(store => {
      const matchesSearch = searchQuery === '' ||
        store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        store.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        store.address.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRegion = selectedRegion === 'all' || store.region === selectedRegion;
      const matchesType = selectedType === 'all' || store.type === selectedType;

      return matchesSearch && matchesRegion && matchesType;
    });
  }, [stores, searchQuery, selectedRegion, selectedType]);

  // Group stores by region
  const storesByRegion = useMemo(() => {
    const grouped = filteredStores.reduce((acc, store) => {
      if (!acc[store.region]) {
        acc[store.region] = [];
      }
      acc[store.region].push(store);
      return acc;
    }, {} as Record<string, Store[]>);

    // Sort each region's stores by name
    Object.keys(grouped).forEach(region => {
      grouped[region].sort((a, b) => a.name.localeCompare(b.name));
    });

    return grouped;
  }, [filteredStores]);

  const regions = [
    { value: 'all', label: locale === 'fr' ? 'Toutes les régions' : 'All regions' },
    { value: 'montreal', label: locale === 'fr' ? 'Grand Montréal' : 'Greater Montreal' },
    { value: 'laval', label: 'Laval' },
    { value: 'quebec', label: locale === 'fr' ? 'Autres régions du Québec' : 'Other Quebec Regions' },
    { value: 'ontario', label: 'Ontario' },
    { value: 'bc', label: locale === 'fr' ? 'Colombie-Britannique' : 'British Columbia' },
  ];

  const storeTypes = [
    { value: 'all', label: locale === 'fr' ? 'Tous les types' : 'All types' },
    { value: 'independent', label: locale === 'fr' ? 'Indépendant' : 'Independent' },
    { value: 'franchise', label: 'Franchise' },
    { value: 'chain', label: locale === 'fr' ? 'Chaîne' : 'Chain' }
  ];

  const regionLabels: Record<string, { en: string; fr: string }> = {
    montreal: { en: 'Greater Montreal', fr: 'Grand Montréal' },
    laval: { en: 'Laval', fr: 'Laval' },
    quebec: { en: 'Other Quebec Regions', fr: 'Autres régions du Québec' },
    ontario: { en: 'Ontario', fr: 'Ontario' },
    bc: { en: 'British Columbia', fr: 'Colombie-Britannique' },
  };

  // Structured data for store locator
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": pageTitle,
    "description": pageDescription,
    "url": canonicalUrl,
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": stores.length,
      "itemListElement": stores.map((store, index) => ({
        "@type": "Store",
        "position": index + 1,
        "name": store.name,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": store.address.split(',')[0],
          "addressLocality": store.location.split(',')[0],
          "addressRegion": store.location.includes('QC') ? 'QC' : store.location.includes('ON') ? 'ON' : 'BC',
          "addressCountry": "CA"
        },
        "telephone": store.phone || undefined,
        "url": store.url || undefined,
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Purrify Cat Litter Products",
          "itemListElement": [{
            "@type": "Offer",
            "itemOffered": {
              "@type": "Product",
              "name": "Purrify Activated Carbon Cat Litter Deodorizer",
              "brand": "Purrify"
            },
            "availability": availabilityUrl,
            "priceValidUntil": priceValidUntil
          }]
        }
      }))
    }
  };

  return (
    <>
      <NextSeo
        {...nextSeoProps}
        additionalMetaTags={[
          ...nextSeoProps.additionalMetaTags,
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
          <div className="flex justify-center mb-6">
            <Image
              src="/optimized/logo-light.webp"
              alt="Purrify Logo"
              width={480}
              height={220}
              className="h-12 w-auto filter drop-shadow-sm transition-all duration-300 dark:hidden"
            />
            <Image
              src="/optimized/logo-dark.webp"
              alt="Purrify Logo"
              width={480}
              height={220}
              className="h-12 w-auto filter drop-shadow-sm transition-all duration-300 hidden dark:block"
            />
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {locale === 'fr'
              ? 'Trouvez Purrify Près de Chez Vous'
              : 'Find Purrify Near You'
            }
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            {locale === 'fr'
              ? `Découvrez les ${stores.length} animaleries partenaires qui vendent Purrify à travers le Canada.`
              : `Discover our ${stores.length} partner pet stores selling Purrify across Canada.`
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
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-red dark:focus:ring-brand-red-400 focus:border-transparent"
                />
              </div>

              {/* Region Filter */}
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-red dark:focus:ring-brand-red-400 focus:border-transparent"
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
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-red dark:focus:ring-brand-red-400 focus:border-transparent"
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
                ? `${filteredStores.length} magasin(s) trouvé(s)`
                : `${filteredStores.length} store(s) found`
              }
            </div>
          </div>
        </section>

        {/* Store Listings */}
        <section className="mb-16">
          {Object.keys(storesByRegion).length === 0 ? (
            <div className="text-center py-12">
              <h3 className="font-heading text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {locale === 'fr'
                  ? 'Aucun magasin trouvé'
                  : 'No stores found'
                }
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {locale === 'fr'
                  ? 'Essayez de modifier vos critères de recherche ou contactez-nous.'
                  : 'Try adjusting your search criteria or contact us.'
                }
              </p>
              <Link
                href="/contact"
                className="inline-block bg-brand-red text-white dark:text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-red/90 transition-colors"
              >
                {locale === 'fr' ? 'Contactez-nous' : 'Contact Us'}
              </Link>
            </div>
          ) : (
            Object.entries(storesByRegion).map(([region, regionStores]) => (
              <div key={region} className="mb-12">
                <h2 className="font-heading text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  {locale === 'fr' ? regionLabels[region]?.fr : regionLabels[region]?.en}
                  <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">
                    ({regionStores.length})
                  </span>
                </h2>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {regionStores.map(store => {
                    const logoConfig = getStoreLogo(store.name);
                    const shouldUseWhiteBg = hasWhiteBackground(store.name);

                    return (
                      <div
                        key={`${store.name}-${store.location}`}
                        className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
                      >
                        {/* Store Header with Logo */}
                        <div className="flex items-start gap-4 mb-4">
                          <div className={`w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 ${shouldUseWhiteBg
                              ? 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700'
                              : 'bg-gradient-to-br from-brand-red to-brand-red/80'
                            }`}>
                            <StoreLogoImage logoConfig={logoConfig} storeName={store.name} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-heading text-lg font-semibold text-gray-900 dark:text-white mb-1 truncate">
                              {store.name}
                            </h3>
                            <span className={`inline-block px-2 py-0.5 text-xs rounded-full ${store.type === 'independent'
                                ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                                : store.type === 'franchise'
                                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
                                  : 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300'
                              }`}>
                              {store.type === 'independent' && (locale === 'fr' ? 'Indépendant' : 'Independent')}
                              {store.type === 'franchise' && 'Franchise'}
                              {store.type === 'chain' && (locale === 'fr' ? 'Chaîne' : 'Chain')}
                            </span>
                          </div>
                        </div>

                        {/* Description */}
                        {store.description && (
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 italic">
                            {store.description}
                          </p>
                        )}

                        {/* Address */}
                        <div className="flex items-start gap-3 mb-3">
                          <MapPin className="h-5 w-5 text-gray-400 dark:text-gray-500 mt-0.5 flex-shrink-0" />
                          <div className="text-sm text-gray-700 dark:text-gray-300">
                            {store.address}
                          </div>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-2 mb-4">
                          {store.phone && (
                            <div className="flex items-center gap-3">
                              <Phone className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                              <a
                                href={`tel:${store.phone.replace(/[^0-9+]/g, '')}`}
                                className="text-sm text-brand-red hover:underline"
                              >
                                {store.phone}
                              </a>
                            </div>
                          )}

                          {store.url && (
                            <div className="flex items-center gap-3">
                              <Globe className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                              <a
                                href={store.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                              >
                                {locale === 'fr' ? 'Visiter le site' : 'Visit website'}
                              </a>
                            </div>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                          <a
                            href={`https://maps.google.com/maps?q=${encodeURIComponent(store.address)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-brand-red text-white dark:text-white text-sm font-medium rounded-lg hover:bg-brand-red/90 transition-colors"
                          >
                            <Navigation className="h-4 w-4" />
                            {locale === 'fr' ? 'Obtenir l\'itinéraire' : 'Get Directions'}
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </section>

        {/* Call to Action */}
        <section className="text-center bg-gradient-to-br from-brand-red/5 to-brand-red/10 dark:from-brand-red/10 dark:to-brand-red/20 rounded-2xl p-8">
          <h2 className="font-heading text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {locale === 'fr'
              ? 'Votre magasin ne vend pas encore Purrify?'
              : 'Your store doesn\'t carry Purrify yet?'
            }
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            {locale === 'fr'
              ? 'Demandez à votre animalerie locale de commander Purrify ou contactez-nous pour devenir un détaillant partenaire.'
              : 'Ask your local pet store to order Purrify or contact us to become a partner retailer.'
            }
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-block bg-brand-red text-white dark:text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-red/90 transition-colors"
            >
              {locale === 'fr' ? 'Demander à mon magasin' : 'Request for my store'}
            </Link>
            <Link
              href="/b2b"
              className="inline-block border-2 border-brand-red text-brand-red dark:text-brand-red-400 px-6 py-3 rounded-lg font-semibold hover:bg-brand-red/10 transition-colors"
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
    revalidate: 3600,
  };
};
