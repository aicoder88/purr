"use client";

import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Globe, Search, Navigation, Store as StoreIcon } from 'lucide-react';
import { useState, useMemo } from 'react';
import {
  getStoreLogo,
  hasWhiteBackground,
  RETAILER_LOCATIONS,
  type RetailerLocation,
  type StoreLogoConfig,
} from '@/lib/store-locations';


// Note: This page uses client-side features (useState, useMemo) for interactivity
// Metadata is defined in page.tsx (Server Component)

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
  region: RetailerLocation['region'];
  type: RetailerLocation['type'];
}

// ============================================================================
// Shared retailer data
// ============================================================================

const STORES: Store[] = RETAILER_LOCATIONS.map((store) => ({
  name: store.name,
  location: store.location,
  address: store.address,
  phone: store.phone,
  url: store.url,
  description: store.descriptionFallback,
  region: store.region,
  type: store.type,
}));

// ============================================================================
// Logo Image Component
// ============================================================================

function StoreLogoImage({
  logoConfig,
  storeName
}: {
  logoConfig: StoreLogoConfig | null;
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
  const stores = STORES;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');

  const canonicalUrl = 'https://www.purrify.ca/stores/';

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
    { value: 'all', label: 'All regions' },
    { value: 'montreal', label: 'Greater Montreal' },
    { value: 'laval', label: 'Laval' },
    { value: 'quebec', label: 'Other Quebec Regions' },
    { value: 'ontario', label: 'Ontario' },
    { value: 'bc', label: 'British Columbia' },
    { value: 'alberta', label: 'Alberta' },
  ];

  const storeTypes = [
    { value: 'all', label: 'All types' },
    { value: 'independent', label: 'Independent' },
    { value: 'franchise', label: 'Franchise' },
    { value: 'chain', label: 'Chain' }
  ];

  const regionLabels: Record<string, string> = {
    montreal: 'Greater Montreal',
    laval: 'Laval',
    quebec: 'Other Quebec Regions',
    ontario: 'Ontario',
    bc: 'British Columbia',
    alberta: 'Alberta',
  };

  // Structured data for store locator
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Purrify Stores - Find a Retailer Near You",
    "description": `Find pet stores selling Purrify near you. Discover our ${stores.length} partner retailers across Quebec, Ontario, British Columbia, and Alberta.`,
    "url": canonicalUrl,
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": stores.length,
      "itemListElement": stores.map((store, index) => {
        const storeItem: Record<string, unknown> = {
          "@type": "LocalBusiness",
          "name": store.name,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": store.address.split(',')[0],
            "addressLocality": store.location.split(',')[0],
            "addressRegion": store.location.includes('QC') ? 'QC' : store.location.includes('ON') ? 'ON' : store.location.includes('AB') ? 'AB' : 'BC',
            "addressCountry": "CA"
          }
        };

        // Only add optional fields if they exist
        if (store.phone) {
          storeItem["telephone"] = store.phone;
        }
        if (store.url) {
          storeItem["url"] = store.url;
        }

        return {
          "@type": "ListItem",
          "position": index + 1,
          "item": storeItem,
        };
      })
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="max-w-7xl mx-auto px-4 py-12 bg-white dark:bg-gray-900 min-h-screen">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Image
              src="/optimized/logos/logo-light-pink.webp"
              alt="Purrify Logo"
              width={480}
              height={230}
              className="h-12 w-auto filter drop-shadow-sm transition-all duration-300 dark:hidden"
            />
            <Image
              src="/optimized/logos/logo-dark.webp"
              alt="Purrify Logo"
              width={480}
              height={220}
              className="h-12 w-auto filter drop-shadow-sm transition-all duration-300 hidden dark:block"
            />
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Find Purrify Near You
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Discover our {stores.length} partner pet stores selling Purrify across Canada.
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
                  placeholder="Search by city, name..."
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
              {filteredStores.length} store(s) found
            </div>
          </div>
        </section>

        {/* Store Listings */}
        <section className="mb-16">
          {Object.keys(storesByRegion).length === 0 ? (
            <div className="text-center py-12">
              <h3 className="font-heading text-xl font-semibold text-gray-900 dark:text-white mb-4">
                No stores found
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Try adjusting your search criteria or contact us.
              </p>
              <Link
                href="/contact/"
                className="inline-block bg-brand-red-600 text-white dark:text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-red-700 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          ) : (
            Object.entries(storesByRegion).map(([region, regionStores]) => (
              <div key={region} className="mb-12">
                <h2 className="font-heading text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  {regionLabels[region]}
                  <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">
                    ({regionStores.length})
                  </span>
                </h2>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {regionStores.map(store => {
                    const logoConfig = getStoreLogo(store.name, {
                      className: 'w-12 h-12 object-contain',
                      width: 48,
                      height: 48,
                    });
                    const shouldUseWhiteBg = hasWhiteBackground(store.name);

                    return (
                      <div
                        key={`${store.name}-${store.location}`}
                        className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
                      >
                        {/* Store Header with Logo */}
                        <div className="flex items-start gap-4 mb-2">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${shouldUseWhiteBg
                            ? 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700'
                            : 'bg-gradient-to-br from-brand-red to-brand-red/80'
                            }`}>
                            <StoreLogoImage logoConfig={logoConfig} storeName={store.name} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-heading text-base font-semibold text-gray-900 dark:text-white mb-0.5 truncate">
                              {store.name}
                            </h3>
                            <span className={`inline-block px-2 py-0.5 text-[10px] uppercase tracking-wider font-bold rounded-full ${store.type === 'independent'
                              ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                              : store.type === 'franchise'
                                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
                                : 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300'
                              }`}>
                              {store.type === 'independent' && 'Independent'}
                              {store.type === 'franchise' && 'Franchise'}
                              {store.type === 'chain' && 'Chain'}
                            </span>
                          </div>
                        </div>

                        {/* Description */}
                        {store.description && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 italic">
                            {store.description}
                          </p>
                        )}

                        {/* Address */}
                        <div className="flex items-start gap-3 mb-2">
                          <MapPin className="h-4 w-4 text-gray-400 dark:text-gray-500 mt-0.5 flex-shrink-0" />
                          <div className="text-[13px] text-gray-700 dark:text-gray-300 leading-snug w-full">
                            {store.address.includes(',') ? (
                              <>
                                <span className="block font-medium dark:text-gray-200">{store.address.substring(0, store.address.indexOf(','))}</span>
                                <span className="block text-gray-500 dark:text-gray-400">{store.address.substring(store.address.indexOf(',') + 1).trim()}</span>
                              </>
                            ) : (
                              <span className="font-medium dark:text-gray-200">{store.address}</span>
                            )}
                          </div>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-1 mb-3">
                          {store.phone && (
                            <div className="flex items-center gap-3">
                              <Phone className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                              <a
                                href={`tel:${store.phone.replace(/[^0-9+]/g, '')}`}
                                className="text-[13px] text-brand-red hover:underline"
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
                                className="text-[13px] text-blue-600 dark:text-blue-400 hover:underline"
                              >
                                Website
                              </a>
                            </div>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                          <a
                            href={`https://maps.google.com/maps?q=${encodeURIComponent(store.address)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-brand-red-600 text-white dark:text-white text-sm font-medium rounded-lg hover:bg-brand-red-700 transition-colors"
                          >
                            <Navigation className="h-4 w-4" />
                            Get Directions
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
            Your store doesn&apos;t carry Purrify yet?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            Ask your local pet store to order Purrify or contact us to become a partner retailer.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact/"
              className="inline-block bg-brand-red-600 text-white dark:text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-red-700 transition-colors"
            >
              Request for my store
            </Link>
            <Link
              href="/b2b/"
              className="inline-block border-2 border-brand-red-700 text-brand-red-700 dark:border-brand-red-700 dark:text-brand-red-700 px-6 py-3 rounded-lg font-semibold hover:bg-brand-red-700/10 dark:hover:bg-brand-red-700/10 transition-colors"
            >
              Become a retailer
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
