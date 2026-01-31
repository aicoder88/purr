"use client";

import React from "react";
import Image from "next/image";
import { useTranslation } from "../../lib/translation-context";
import { GOOGLE_MAPS_EMBED_ID } from "../../lib/constants";

interface ClientLocationsMapProps {
  className?: string;
  height?: string;
  showHeader?: boolean;
  headerTitle?: string;
  headerDescription?: string;
}

const CITY_COORDINATES = {
  montreal: { lat: 45.5017, lng: -73.5673, zoom: 11 },
  toronto: { lat: 43.6532, lng: -79.3832, zoom: 11 },
  vancouver: { lat: 49.2827, lng: -123.1207, zoom: 11 },
  calgary: { lat: 51.0447, lng: -114.0719, zoom: 11 },
  ottawa: { lat: 45.4215, lng: -75.6972, zoom: 11 },
  quebec: { lat: 46.8139, lng: -71.208, zoom: 11 },
};

export const ClientLocationsMap: React.FC<ClientLocationsMapProps> = ({
  className = "",
  height = "480",
  showHeader = true,
  headerTitle,
  headerDescription,
}) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = React.useState(true);
  const [activeCity, setActiveCity] = React.useState<
    keyof typeof CITY_COORDINATES | null
  >(null);

  const title =
    headerTitle ||
    t.maps?.findNearYou ||
    "Find Purrify Near You | Retail Store Locations";
  const description =
    headerDescription ||
    t.maps?.discoverWhere ||
    "Discover where to buy Purrify across Canada.";

  const handleCityClick = (cityKey: keyof typeof CITY_COORDINATES) => {
    if (activeCity === cityKey) return;
    setIsLoading(true);
    setActiveCity(cityKey);
  };

  const getMapSrc = () => {
    const baseUrl = `https://www.google.com/maps/d/embed?mid=${GOOGLE_MAPS_EMBED_ID}&ehbc=2E312F`;
    if (activeCity && CITY_COORDINATES[activeCity]) {
      const { lat, lng, zoom } = CITY_COORDINATES[activeCity];
      return `${baseUrl}&ll=${lat},${lng}&z=${zoom}`;
    }
    return baseUrl;
  };

  return (
    <section className={`py-8 ${className}`}>
      {showHeader && (
        <div className="container mx-auto px-4 mb-8">
          <div className="flex justify-center mb-6">
            <Image
              src="/optimized/logo-light.webp"
              alt="Purrify Logo"
              width={160}
              height={160}
              loading="lazy"
              className="h-10 w-auto filter drop-shadow-sm transition-all duration-300 dark:hidden"
            />
            <Image
              src="/optimized/logo-dark.webp"
              alt="Purrify Logo"
              width={160}
              height={160}
              loading="lazy"
              className="h-10 w-auto filter drop-shadow-sm transition-all duration-300 hidden dark:block"
            />
          </div>
          <h2 className="font-heading text-3xl font-bold text-brand-dark dark:text-gray-50 mb-4 text-center">
            {title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 text-center max-w-4xl mx-auto">
            {description}
          </p>
        </div>
      )}

      <div className="container mx-auto px-4">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm relative min-h-[500px]">
          {isLoading && (
            <div
              className={`absolute inset-0 z-10 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg m-4 animate-pulse`}
              style={{ height }}
            >
              <div className="text-center">
                <svg
                  className="w-10 h-10 text-gray-400 dark:text-gray-300 animate-spin mx-auto mb-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <p className="text-gray-500 dark:text-gray-300 font-medium">
                  Loading Map...
                </p>
              </div>
            </div>
          )}

          <iframe
            key={activeCity || ""}
            src={getMapSrc()}
            width="100%"
            height={height}
            style={{
              border: 0,
              opacity: isLoading ? 0 : 1,
              transition: "opacity 0.5s ease-in-out",
            }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={t.maps?.iframeTitle || ""}
            className="rounded-lg"
            onLoad={() => setIsLoading(false)}
          />
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t.maps?.retailStores || ""}
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-2 text-xs text-gray-500 dark:text-gray-400">
              {(
                Object.keys(CITY_COORDINATES) as Array<
                  keyof typeof CITY_COORDINATES
                >
              ).map((cityKey) => (
                <button
                  key={cityKey}
                  onClick={() => handleCityClick(cityKey)}
                  className={`px-3 py-1.5 rounded transition-all duration-200 ${activeCity === cityKey
                    ? "bg-brand-green text-white shadow-md transform scale-105 font-medium"
                    : "bg-brand-green-light/50 dark:bg-brand-green-light/10 hover:bg-brand-green-light hover:text-brand-dark dark:hover:bg-brand-green-light/20"
                    }`}
                >
                  {t.maps?.cities[cityKey] ||
                    cityKey.charAt(0).toUpperCase() + cityKey.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
