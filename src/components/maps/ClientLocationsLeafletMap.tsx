'use client';

import { useEffect, useMemo } from 'react';
import type { FC } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import type { CityConfig, MapStore } from './client-locations-types';
import 'leaflet/dist/leaflet.css';

type LeafletMapProps = {
  city: CityConfig;
  height: string;
};

const MapCityUpdater: FC<{ center: [number, number]; zoom: number }> = ({ center, zoom }) => {
  const map = useMap();

  useEffect(() => {
    map.flyTo(center, zoom, { duration: 0.6, easeLinearity: 0.35 });
  }, [center, zoom, map]);

  return null;
};

const StoreMarkers: FC<{ stores: MapStore[] }> = ({ stores }) => {
  return (
    <>
      {stores.map(store => (
        <CircleMarker
          key={store.id}
          center={store.coordinates}
          radius={10}
          pathOptions={{ color: '#FF3131', fillColor: '#FF4C4C', fillOpacity: 0.85 } as any}
        >
          <Popup>
            <div className="space-y-1">
              <p className="font-semibold text-gray-900 dark:text-gray-100">{store.name}</p>
              <p className="text-sm text-gray-700 dark:text-gray-300">{store.address}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {store.city}, {store.province} {store.postalCode ?? ''}
              </p>
              {store.phone && (
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  <span className="font-medium">Phone:</span> {store.phone}
                </p>
              )}
              {store.website && (
                <p className="text-xs">
                  <a
                    href={store.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0F766E] dark:text-[#86efac] hover:underline"
                  >
                    Visit website
                  </a>
                </p>
              )}
              {store.googleMapsUrl && (
                <p className="text-xs">
                  <a
                    href={store.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0F766E] dark:text-[#86efac] hover:underline"
                  >
                    Open in Google Maps
                  </a>
                </p>
              )}
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </>
  );
};

export const ClientLocationsLeafletMap: FC<LeafletMapProps> = ({ city, height }) => {
  const computedHeight = useMemo(() => {
    return height.endsWith('px') ? height : `${height}px`;
  }, [height]);

  return (
    <MapContainer
      center={city.center as any}
      zoom={city.zoom}
      scrollWheelZoom={false}
      style={{ height: computedHeight, width: '100%', borderRadius: '0.75rem' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapCityUpdater center={city.center} zoom={city.zoom} />
      <StoreMarkers stores={city.stores} />
    </MapContainer>
  );
};

export default ClientLocationsLeafletMap;
