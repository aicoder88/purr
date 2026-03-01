
"use client";

import React from "react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";

function LocationsMapLoading() {
  const t = useTranslations();

  return (
    <div className="h-[600px] w-full bg-gray-100 bg-gray-800 rounded-xl animate-pulse flex flex-col items-center justify-center border border-gray-200 border-gray-700">
      <div className="w-12 h-12 border-4 border-orange-500 border-orange-400 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-gray-500 text-gray-400 font-medium">
        {t('maps.loadingMap') ?? ""}
      </p>
    </div>
  );
}

// Dynamic import for the map component to avoid SSR issues with Leaflet
const RetailerMap = dynamic(() => import("./LeafletRetailerMap"), {
  ssr: false,
  loading: () => <LocationsMapLoading />,
});

interface ClientLocationsMapProps {
  className?: string;
  height?: string;
  showHeader?: boolean;
  headerTitle?: string;
  headerDescription?: string;
}

function normalizeHeight(height?: string): number {
  const parsedHeight = Number.parseInt(height ?? "600", 10);
  return Number.isFinite(parsedHeight) ? parsedHeight : 600;
}

export const ClientLocationsMap: React.FC<ClientLocationsMapProps> = ({
  className = "",
  height,
  showHeader = true,
  headerTitle,
  headerDescription,
}) => {
  const t = useTranslations();
  const mapHeight = normalizeHeight(height);

  const title = headerTitle ?? t('maps.findNearYou') ?? "";
  const description = headerDescription ?? t('maps.discoverWhere') ?? "";

  return (
    <section className={`overflow-x-clip py-12 md:py-20 ${className}`}>
      {showHeader && (
        <div className="container mx-auto px-4 mb-10 md:mb-14">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-brand-dark text-white mb-6 tracking-tight">
              {title}
            </h2>
            <p className="text-lg md:text-xl text-gray-600 text-gray-300 leading-relaxed max-w-2xl mx-auto">
              {description}
            </p>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4">
        <RetailerMap height={mapHeight} />
      </div>
    </section>
  );
};
