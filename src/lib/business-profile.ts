/**
 * Centralized NAP (Name, Address, Phone) data configuration
 * This should match exactly with Google Business Profile information
 * to ensure consistency across all local SEO implementations.
 */

export interface BusinessLocation {
  id: string;
  name: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  phone: string;
  email: string;
  website: string;
  geo: {
    latitude: number;
    longitude: number;
  };
  type: 'headquarters' | 'branch' | 'virtual';
  verified: boolean;
  googleBusinessProfileId?: string;
}

export interface BusinessHours {
  dayOfWeek: string;
  opens: string;
  closes: string;
  closed?: boolean;
}

export interface BusinessProfile {
  name: string;
  legalName: string;
  description: string;
  foundingDate: string;
  locations: BusinessLocation[];
  businessHours: BusinessHours[];
  socialMedia: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
    youtube?: string;
  };
  businessCategories: string[];
  serviceAreas: string[];
  languages: string[];
  paymentMethods: string[];
  currencies: string[];
}

// Primary business profile data - THIS MUST MATCH GOOGLE BUSINESS PROFILE
export const BUSINESS_PROFILE: BusinessProfile = {
  name: 'Purrify',
  legalName: 'Purrify Inc.',
  description: 'Premium activated carbon cat litter additive manufacturer. Eliminate odors at the molecular level with natural, fragrance-free products made in Canada.',
  foundingDate: '2023-01-01',

  locations: [
    {
      id: 'headquarters-mirabel',
      name: 'Purrify Headquarters',
      address: {
        streetAddress: '109-17680 Rue Charles',
        addressLocality: 'Mirabel',
        addressRegion: 'QC',
        postalCode: 'J7J 0T6',
        addressCountry: 'CA'
      },
      phone: '+1-250-432-9352',
      email: 'hello@purrify.ca',
      website: 'https://purrify.ca',
      geo: {
        latitude: 45.6501,
        longitude: -73.8359
      },
      type: 'headquarters',
      verified: true,
      googleBusinessProfileId: 'purrify-mirabel-hq' // Update with actual GBP ID
    }
  ],

  businessHours: [
    { dayOfWeek: 'Monday', opens: '08:00', closes: '20:00' },
    { dayOfWeek: 'Tuesday', opens: '08:00', closes: '20:00' },
    { dayOfWeek: 'Wednesday', opens: '08:00', closes: '20:00' },
    { dayOfWeek: 'Thursday', opens: '08:00', closes: '20:00' },
    { dayOfWeek: 'Friday', opens: '08:00', closes: '20:00' },
    { dayOfWeek: 'Saturday', opens: '09:00', closes: '20:00' },
    { dayOfWeek: 'Sunday', closed: true, opens: '', closes: '' }
  ],

  socialMedia: {
    facebook: 'https://facebook.com/purrifycanada',
    instagram: 'https://instagram.com/purrify.ca',
    twitter: 'https://twitter.com/purrifycanada',
    linkedin: 'https://linkedin.com/company/purrify'
  },

  businessCategories: [
    'Pet Supply Store',
    'Manufacturer',
    'Cat Care Products',
    'Pet Odor Control',
    'Natural Pet Products'
  ],

  serviceAreas: [
    'Canada',
    'Quebec',
    'Ontario',
    'British Columbia',
    'Alberta',
    'Manitoba',
    'Saskatchewan',
    'New Brunswick',
    'Nova Scotia',
    'Prince Edward Island',
    'Newfoundland and Labrador',
    'Northwest Territories',
    'Nunavut',
    'Yukon'
  ],

  languages: ['English', 'French'],
  paymentMethods: ['Cash', 'Credit Card', 'Debit Card', 'PayPal', 'Interac'],
  currencies: ['CAD']
};

// Helper functions for consistent NAP data usage
export const getBusinessName = () => BUSINESS_PROFILE.name;

export const getPrimaryLocation = () => BUSINESS_PROFILE.locations[0];

export const getFormattedAddress = (location?: BusinessLocation) => {
  const loc = location || getPrimaryLocation();
  return `${loc.address.streetAddress}, ${loc.address.addressLocality}, ${loc.address.addressRegion} ${loc.address.postalCode}, ${loc.address.addressCountry}`;
};

export const getPhoneNumber = (location?: BusinessLocation) => {
  const loc = location || getPrimaryLocation();
  return loc.phone;
};

export const getEmailAddress = (location?: BusinessLocation) => {
  const loc = location || getPrimaryLocation();
  return loc.email;
};

export const getBusinessHours = () => BUSINESS_PROFILE.businessHours;

export const getFormattedBusinessHours = (locale: 'en' | 'fr' = 'en') => {
  return BUSINESS_PROFILE.businessHours.map(hours => {
    if (hours.closed) {
      return {
        day: hours.dayOfWeek,
        hours: locale === 'fr' ? 'Fermé' : 'Closed'
      };
    }
    return {
      day: hours.dayOfWeek,
      hours: `${hours.opens} - ${hours.closes}`
    };
  });
};

// Generate structured data for LocalBusiness
export const getLocalBusinessStructuredData = (location?: BusinessLocation) => {
  const loc = location || getPrimaryLocation();

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `https://purrify.ca/locations/${loc.id}`,
    name: BUSINESS_PROFILE.name,
    legalName: BUSINESS_PROFILE.legalName,
    description: BUSINESS_PROFILE.description,
    foundingDate: BUSINESS_PROFILE.foundingDate,
    url: loc.website,
    telephone: loc.phone,
    email: loc.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: loc.address.streetAddress,
      addressLocality: loc.address.addressLocality,
      addressRegion: loc.address.addressRegion,
      postalCode: loc.address.postalCode,
      addressCountry: loc.address.addressCountry
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: loc.geo.latitude.toString(),
      longitude: loc.geo.longitude.toString()
    },
    openingHoursSpecification: BUSINESS_PROFILE.businessHours
      .filter(hours => !hours.closed)
      .map(hours => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: hours.dayOfWeek,
        opens: hours.opens,
        closes: hours.closes
      })),
    sameAs: Object.values(BUSINESS_PROFILE.socialMedia).filter(Boolean),
    areaServed: BUSINESS_PROFILE.serviceAreas.map(area => ({
      '@type': 'State',
      name: area
    })),
    paymentAccepted: BUSINESS_PROFILE.paymentMethods,
    currenciesAccepted: BUSINESS_PROFILE.currencies,
    availableLanguage: BUSINESS_PROFILE.languages
  };
};

// Generate citation data for local directory submissions
export const getCitationData = (location?: BusinessLocation) => {
  const loc = location || getPrimaryLocation();

  return {
    businessName: BUSINESS_PROFILE.name,
    address: getFormattedAddress(loc),
    phone: loc.phone,
    website: loc.website,
    email: loc.email,
    categories: BUSINESS_PROFILE.businessCategories,
    description: BUSINESS_PROFILE.description,
    hours: getFormattedBusinessHours(),
    socialMedia: BUSINESS_PROFILE.socialMedia
  };
};

// Validate NAP consistency across the site
export const validateNAPConsistency = (name: string, address: string, phone: string) => {
  const primaryLocation = getPrimaryLocation();
  const expectedAddress = getFormattedAddress(primaryLocation);
  const expectedPhone = primaryLocation.phone;

  return {
    nameMatch: name === BUSINESS_PROFILE.name,
    addressMatch: address === expectedAddress,
    phoneMatch: phone === expectedPhone,
    isConsistent: name === BUSINESS_PROFILE.name &&
                   address === expectedAddress &&
                   phone === expectedPhone
  };
};

export default BUSINESS_PROFILE;