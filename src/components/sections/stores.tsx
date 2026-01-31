"use client";

import { Container } from "@/components/ui/container";
import Image from "next/image";
import SectionHeader from "../ui/section-header";
import { useTranslation } from "../../lib/translation-context";
import { useState } from "react";

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
}

interface LogoConfig {
  src: string;
  alt: string;
  className: string;
  width: number;
  height: number;
}

// ============================================================================
// Constants
// ============================================================================

const GRADIENTS = {
  section: 'bg-gradient-to-br from-[#FFFFFF] via-[#FFFFF5] to-[#FFFFFF] dark:from-gray-900 dark:via-gray-950 dark:to-gray-900',
  redButton: 'bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80 hover:from-[#FF3131]/90 hover:to-[#FF3131]',
  redIcon: 'bg-gradient-to-br from-[#FF3131] to-[#FF3131]/80 dark:from-[#FF5050] dark:to-[#FF5050]/80',
} as const;

const DEFAULT_LOGO_CONFIG = {
  className: 'w-16 h-16 object-contain',
  width: 64,
  height: 64,
} as const;

// Logo lookup map - more efficient than if/else chain
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

// List of stores that should have white background for their logo
const WHITE_BG_STORES = Object.keys(STORE_LOGOS);

// ============================================================================
// Helper Functions
// ============================================================================

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
// Store Data
// ============================================================================

const getStoresWithTranslations = (t: ReturnType<typeof import('../../lib/translation-context').useTranslation>['t']): Store[] => [
  {
    name: "Pattes et Griffes (Sainte‑Thérèse)",
    location: "Sainte‑Thérèse, QC J7E 2X5",
    address: "190 Boulevard du Curé-Labelle, Sainte-Thérèse, QC J7E 2X5",
    phone: "1-450-818-1310",
    url: "https://www.pattesgriffes.com/pages/trouvez-une-boutique",
    description: t.storesSection?.storeDescriptions?.completePetCareAndSupplies || ""
  },
  {
    name: "Chico (Sainte‑Thérèse)",
    location: "Sainte‑Thérèse, QC J7E 2Z7",
    address: "95 Boulevard du Curé-Labelle, Sainte-Thérèse, QC J7E 2Z7",
    phone: "1-450-965-3906",
    url: "https://www.chico.ca/boutique/chico-sainte-therese/",
    description: t.storesSection?.storeDescriptions?.premiumPetBoutique || ""
  },
  {
    name: "Chico (Sainte‑Marthe‑sur‑le‑Lac)",
    location: "Sainte‑Marthe‑sur‑le‑Lac, QC J0N 1P0",
    address: "2860 B Boulevard des Promenades, Sainte-Marthe-sur-le-Lac, QC J0N 1P0",
    phone: "1-450-598-2860",
    url: "https://www.chico.ca/boutique/chico-ste-marthe/",
    description: t.storesSection?.storeDescriptions?.premiumPetBoutique || ""
  },
  {
    name: "Animal Shop GIGI",
    location: "Saint‑Eustache, QC J7R 2J3",
    address: "356 Boulevard Arthur-Sauvé, Saint-Eustache, QC J7R 2J3",
    phone: "1-450-598-3444",
    url: "https://www.animaleriegigi.com/",
    description: t.storesSection?.storeDescriptions?.familyOwnedPetStore || ""
  },
  {
    name: "Chico (Laval-Est)",
    location: "Laval, QC H7E 0A4",
    address: "5405 Boulevard Robert-Bourassa, Laval, QC H7E 0A4",
    phone: "1-450-239-0354",
    url: "https://www.chico.ca/en/boutique/chico-laval-east/",
    description: t.storesSection?.storeDescriptions?.premiumPetBoutique || ""
  },
  {
    name: "Chico (Laval Ouest)",
    location: "Laval, QC H7R 5P8",
    address: "4511 Bd Arthur-Sauvé, Laval, QC H7R 5P8",
    phone: "1-450-314-2442",
    url: "https://www.chico.ca/boutique/chico-laval-ouest/",
    description: t.storesSection?.storeDescriptions?.premiumPetBoutique || ""
  },
  {
    name: "Pattes et Griffes (Laval)",
    location: "Laval, QC H7S 1M9",
    address: "1682 Boulevard Saint-Martin Ouest, Laval, QC H7S 1M9",
    phone: "1-579-640-1857",
    url: "https://www.pattesgriffes.com/pages/trouvez-une-boutique",
    description: t.storesSection?.storeDescriptions?.completePetCareAndSupplies || ""
  },
  {
    name: "Pitou Minou & Compagnons (Kirkland)",
    location: "Kirkland, QC H9H 0C5",
    address: "16936 Autoroute Transcanadienne, Kirkland, QC H9H 0C5",
    phone: "1-514-695-5005",
    url: "https://pitou-minou.ca/global-pet-foods-succursales-quebec/",
    description: t.storesSection?.storeDescriptions?.globalPetFoodsLocation || ""
  },
  {
    name: "Chico (Saint‑Laurent)",
    location: "Montreal, QC H2S 3E3",
    address: "7001 Boulevard Saint-Laurent, Montréal, QC H2S 3E3",
    phone: "1-514-657-5813",
    url: "https://www.chico.ca/boutique/chico-boul-st-laurent-montreal/",
    description: t.storesSection?.storeDescriptions?.premiumPetBoutique || ""
  },
  {
    name: "Doghaus",
    location: "Montreal, QC H4A 1W6",
    address: "5671 Rue Sherbrooke Ouest, Montréal, QC H4A 1W6",
    phone: "514-483-3555",
    url: "https://www.doghausmtl.com/",
    description: t.storesSection?.storeDescriptions?.premiumPetProductsAndSupplies || ""
  },
  {
    name: "Kong Animalerie",
    location: "Montreal, QC H3W 3H8",
    address: "5555 Bd Décarie, Montréal, QC H3W 3H8",
    phone: "514-662-8373",
    url: "https://www.facebook.com/konganimalerie/",
    description: t.storesSection?.storeDescriptions?.fullServicePetStore || ""
  },
  {
    name: "Coquette et Finegueule",
    location: "Verdun, QC H4H 1E6",
    address: "5203 Rue Bannantyne, Verdun, QC H4H 1E6",
    phone: "514-761-4221",
    url: "https://coquetteetfinegueule.com/",
    description: t.storesSection?.storeDescriptions?.petStoreWithGroomingServices || ""
  },
  {
    name: "Pitou Minou & Compagnons (Verdun)",
    location: "Verdun, QC H4G 1V7",
    address: "4100 Rue Wellington, Verdun, QC H4G 1V7",
    phone: "514-732-0555",
    url: "https://pitou-minou.ca/global-pet-foods-succursales-quebec/",
    description: t.storesSection?.storeDescriptions?.globalPetFoodsLocation || ""
  },
  {
    name: "Chico (Plateau Mont‑Royal)",
    location: "Montreal, QC H2H 1J6",
    address: "2016 Avenue du Mont-Royal E., Montréal, QC H2H 1J6",
    phone: "514-521-0201",
    url: "https://www.chico.ca/boutique/chico-plateau-mont-royal-montreal/",
    description: t.storesSection?.storeDescriptions?.premiumPetBoutique || ""
  },
  {
    name: "Chico (Hochelaga‑Maisonneuve)",
    location: "Montreal, QC H1L 2M4",
    address: "8646 Rue Hochelaga, Montréal, QC H1L 2M4",
    phone: "514-419-9850",
    url: "https://www.chico.ca/boutique/chico-rue-ontario-montreal/",
    description: t.storesSection?.storeDescriptions?.premiumPetBoutique || ""
  },
  {
    name: "Chico (Plateau Mont-Royal — alternate)",
    location: "Montreal, QC H1W 1S7",
    address: "3911 Rue Ontario E., Montréal, QC H1W 1S7",
    phone: "514-527-1371",
    url: "https://www.chico.ca/boutique/chico-rue-ontario-montreal/",
    description: t.storesSection?.storeDescriptions?.premiumPetBoutique || ""
  },
  {
    name: "Animalerie Mamiwouff Inc",
    location: "Saint-Césaire, QC J0L 1T0",
    address: "2048 Route 112, Saint-Césaire, QC J0L 1T0",
    phone: "450-469-4560",
    url: "https://www.animaleriemamiwouff.com/",
    description: t.storesSection?.storeDescriptions?.familyOwnedPetStore || ""
  },
  {
    name: "Animalerie Lamifidel",
    location: "Alma, QC G8B 2V6",
    address: "1295 Avenue du Pont S, Alma, QC G8B 2V6",
    phone: "418-668-0117",
    url: "https://www.lamifidel.net/",
    description: t.storesSection?.storeDescriptions?.completePetCareAndSupplies || ""
  },
  {
    name: "Animalerie Petmobile Nathamo",
    location: "Shawinigan, QC G0X 1L0",
    address: "161 Rue de l'Hydravion, Shawinigan, QC G0X 1L0",
    phone: "819-695-2329",
    url: "",
    description: t.storesSection?.storeDescriptions?.completePetCareAndSupplies || ""
  },
  {
    name: "Animalerie Club Wouf Miaou",
    location: "Trois-Rivières, QC G9A 6M1",
    address: "3175 boulevard des Récollets, Trois-Rivières, QC G9A 6M1",
    phone: "+1 819-376-0973",
    url: "https://woufmiaou.ca/",
    description: t.storesSection?.storeDescriptions?.completePetCareAndSupplies || ""
  },
  {
    name: "Little Bit Western Feed and Supplies Inc.",
    location: "Timmins, ON P4N 2S2",
    address: "372 Algonquin Blvd.West, TIMMINS, ON P4N 2S2",
    phone: "",
    url: "https://www.littlebitwestern.ca/",
    description: t.storesSection?.storeDescriptions?.completePetCareAndSupplies || ""
  },
  {
    name: "K&K Pet Foods Dunbar",
    location: "Vancouver, BC V6S 2G2",
    address: "4595 Dunbar St, Vancouver, BC V6S 2G2",
    phone: "+1 604-224-2513",
    url: "https://www.kandkpetfoods.ca/",
    description: t.storesSection?.storeDescriptions?.premiumPetProductsAndSupplies || ""
  },
  {
    name: "Viva Pets",
    location: "Montreal, QC",
    address: "Montreal, QC",
    phone: "780-489-7387",
    url: "https://www.vivapets.ca/",
    description: t.storesSection?.storeDescriptions?.premiumPetProductsAndSupplies || ""
  },
];

// ============================================================================
// Subcomponents
// ============================================================================

function StoreIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
      />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    </svg>
  );
}

function WebsiteIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 4v1m0 14v1m8-8h-1M5 12H4m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  );
}

// Component to handle logo display with fallback
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
      onError={() => {
        setHasError(true);
      }}
    />
  );
}

export function Stores() {
  const { t } = useTranslation();
  const stores = getStoresWithTranslations(t);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleRequestStore = async () => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Store Availability Request',
          email: 'customer@purrify.ca',
          message: 'A customer has requested Purrify at their local pet store. Please follow up to understand which store they would like us to contact.',
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus('success');
        setStatusMessage(t.storesSection?.requestSuccess || 'Thank you! We\'ll reach out to help get Purrify at your local store.');
      } else {
        setSubmitStatus('error');
        setStatusMessage(data.message || t.storesSection?.requestError || 'Failed to send request. Please try again or contact us directly.');
      }
    } catch (error) {
      setSubmitStatus('error');
      setStatusMessage(t.storesSection?.requestError || 'An error occurred. Please contact us directly at support@purrify.ca');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className="py-16 bg-gradient-to-br from-[#FFFFFF] via-[#FFFFF5] to-[#FFFFFF] dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 transition-colors duration-300"
      id="stores"
    >
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-12">
          <SectionHeader text={t.storesSection?.availableInStores || ""} />
          <h2 className="font-heading text-5xl font-bold tracking-tight mb-6 bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80 dark:from-[#FF5050] dark:to-[#FF5050]/80 bg-clip-text text-transparent">
            {t.storesSection?.soldInFollowingStores || ""}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-xl max-w-2xl mx-auto">
            {t.storesSection?.subtitle || ""}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {stores.map((store, index) => {
            const logoConfig = getStoreLogo(store.name);
            const shouldUseWhiteBg = hasWhiteBackground(store.name);

            return (
              <div
                key={`${store.name}-${store.location}`}
                className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg border border-[#E0EFC7] dark:border-gray-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div
                      className={
                        "w-20 h-20 rounded-full flex items-center justify-center " +
                        (shouldUseWhiteBg ? "bg-white dark:bg-gray-900" : "bg-gradient-to-br from-[#FF3131] to-[#FF3131]/80 dark:from-[#FF5050] dark:to-[#FF5050]/80")
                      }
                    >
                      <StoreLogoImage logoConfig={logoConfig} storeName={store.name} />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading text-lg font-bold text-gray-900 dark:text-gray-100 mb-1">
                      {store.name}
                    </h3>
                    <p className="text-[#FF3131] font-medium text-sm mb-1">
                      {store.location}
                    </p>
                    {store.description && (
                      <p className="text-gray-500 dark:text-gray-400 text-xs mb-2 italic">
                        {store.description}
                      </p>
                    )}
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                      {store.address}
                    </p>
                    <div className="flex flex-wrap gap-2 items-center">
                      {store.phone && (
                        <a
                          href={`tel:${store.phone}`}
                          className="inline-flex items-center text-sm text-[#FF3131] hover:text-[#FF3131]/80 transition-colors duration-200 mb-1"
                        >
                          <PhoneIcon className="w-4 h-4 mr-1" />
                          {store.phone}
                        </a>
                      )}
                      {store.url && (
                        <a
                          href={store.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200 ml-2"
                        >
                          <WebsiteIcon className="w-4 h-4 mr-1" />
                          Website
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {t.storesSection?.dontSeeLocalStore || ""}
          </p>
          <button
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80 hover:from-[#FF3131]/90 hover:to-[#FF3131] text-white dark:text-gray-100 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-0 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleRequestStore}
            disabled={isSubmitting || submitStatus === 'success'}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white dark:text-gray-100" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {t.storesSection?.sending || ""}
              </>
            ) : submitStatus === 'success' ? (
              <>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {t.storesSection?.requestSent || ""}
              </>
            ) : (
              t.storesSection?.requestStoreAvailability || ""
            )}
          </button>

          {submitStatus !== 'idle' && statusMessage && (
            <div className={`mt-4 p-4 rounded-lg ${submitStatus === 'success'
                ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 border border-green-200 dark:border-green-800'
                : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 border border-red-200 dark:border-red-800'
              }`}>
              <p className="text-sm font-medium">{statusMessage}</p>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
} 
