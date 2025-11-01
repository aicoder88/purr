export type MapStore = {
  id: string;
  name: string;
  address: string;
  city: string;
  province: string;
  postalCode?: string;
  phone?: string;
  website?: string;
  googleMapsUrl?: string;
  coordinates: [number, number];
  notes?: string;
};

export type CityConfig = {
  id: string;
  name: string;
  labels: {
    en: string;
    fr: string;
  };
  center: [number, number];
  zoom: number;
  stores: MapStore[];
  comingSoonNote?: {
    en: string;
    fr: string;
  };
};
