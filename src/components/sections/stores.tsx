"use client";

import { Container } from "@/components/ui/container";
import Image from "next/image";
import { useLocale } from "next-intl";
import { useTranslation as __useTranslation } from "@/lib/translation-context";
import { useState, useEffect, type FormEvent } from "react";


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


const DEFAULT_LOGO_CONFIG = {
  className: 'w-16 h-16 object-contain',
  width: 64,
  height: 64,
} as const;

// Logo lookup map - more efficient than if/else chain
const STORE_LOGOS: Record<string, Omit<LogoConfig, 'className' | 'width' | 'height'>> = {
  'Chico': { src: '/optimized/logos/chico-logo.svg', alt: 'Chico - Boutique d\'animaux Logo' },
  'Pattes et Griffes': { src: '/optimized/stores/pattes.webp', alt: 'Pattes et Griffes Logo' },
  'GIGI': { src: '/optimized/marketing/gigi.webp', alt: 'Animal Shop GIGI - Pet Store Logo' },
  'Pitou Minou': { src: '/optimized/stores/pitou-minou.webp', alt: 'Pitou Minou & Compagnons - Pet Store Logo' },
  'Doghaus': { src: '/optimized/stores/doghaus.webp', alt: 'Doghaus Montreal - Premium Pet Store Logo' },
  'Kong': { src: '/optimized/stores/kong-animalerie.webp', alt: 'KONG ANIMALERIE - Montreal Pet Store Logo' },
  'Coquette': { src: '/optimized/stores/coquette-finegueule.webp', alt: 'Coquette et Finegueule - Pet Store with Grooming Logo' },
  'Animalerie Mamiwouff': { src: '/optimized/stores/animalerie-mamiwouff.webp', alt: 'Animalerie Mamiwouff - Family-Owned Pet Store Logo' },
  'Animalerie Lamifidel': { src: '/optimized/stores/lamifidel.avif', alt: 'Animalerie Lamifidel - Complete Pet Care and Supplies Logo' },
  'Animalerie Petmobile Nathamo': { src: '/optimized/stores/nathamo.avif', alt: 'Animalerie Petmobile Nathamo - Complete Pet Care and Supplies Logo' },
  'Animalerie Club Wouf Miaou': { src: '/optimized/stores/woofmiao-logo.webp', alt: 'Animalerie Club Wouf Miaou - Pet Store Logo' },
  'K&K Pet Foods': { src: '/optimized/stores/kk.avif', alt: 'K&K Pet Foods Dunbar - Premium Pet Products & Supplies Logo' },
  'Viva Pets': { src: '/optimized/stores/viva-pets.avif', alt: 'Viva Pets - Premium Pet Products & Supplies Logo' },
  'Little Bit Western': { src: '/optimized/stores/little-bit-western.avif', alt: 'Little Bit Western Feed and Supplies Inc. - Pet and Feed Store Logo' },
  'Best Cat': { src: '/optimized/stores/bestcat.png', alt: 'Best Cat - Premium Pet Products and Supplies Logo' },
  'Camlachie Feed': { src: '/optimized/stores/camlachie-feed.jpg', alt: 'Camlachie Feed - Pet and Farm Supplies Logo' },
};

// List of stores that should have white background for their logo
const WHITE_BG_STORES = Object.keys(STORE_LOGOS);

type SupportedLocale = 'en' | 'fr' | 'zh' | 'es';

const storesUiCopy: Record<SupportedLocale, {
  sectionBadge: string;
  headingPrefix: string;
  headingHighlight: string;
  subtitle: string;
  websiteLabel: string;
  requestTitle: string;
  requestSubtitle: string;
  requestButton: string;
}> = {
  en: {
    sectionBadge: 'Find Purrify Near You',
    headingPrefix: 'Our Retail',
    headingHighlight: 'Partners',
    subtitle: 'Find Purrify at these premium pet retailers across Montreal and beyond.',
    websiteLabel: 'Website',
    requestTitle: "Don't see your favorite store?",
    requestSubtitle: "Let us know where you shop, and we'll contact them!",
    requestButton: 'Request a Store',
  },
  fr: {
    sectionBadge: 'Trouvez Purrify pres de vous',
    headingPrefix: 'Nos partenaires',
    headingHighlight: 'detail',
    subtitle: 'Trouvez Purrify dans des animaleries premium a Montreal et ailleurs.',
    websiteLabel: 'Site web',
    requestTitle: 'Vous ne voyez pas votre boutique preferee?',
    requestSubtitle: 'Dites-nous ou vous magasinez, et nous les contacterons.',
    requestButton: 'Demander un magasin',
  },
  zh: {
    sectionBadge: '在你附近找到 Purrify',
    headingPrefix: '我们的零售',
    headingHighlight: '合作伙伴',
    subtitle: '在蒙特利尔及周边优质宠物门店找到 Purrify。',
    websiteLabel: '官网',
    requestTitle: '没看到你常去的门店？',
    requestSubtitle: '告诉我们你常去哪里，我们会联系他们！',
    requestButton: '申请新增门店',
  },
  es: {
    sectionBadge: 'Encuentra Purrify cerca de ti',
    headingPrefix: 'Nuestros socios',
    headingHighlight: 'minoristas',
    subtitle: 'Encuentra Purrify en tiendas premium para mascotas en Montreal y mas alla.',
    websiteLabel: 'Sitio web',
    requestTitle: 'No ves tu tienda favorita?',
    requestSubtitle: 'Dinos donde compras y nos pondremos en contacto con ellos.',
    requestButton: 'Solicitar una tienda',
  },
};

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
    description: t.storesSection?.storeDescriptions?.completePetCareAndSupplies || 'Complete pet care and supplies'
  },
  {
    name: "Chico (Sainte‑Thérèse)",
    location: "Sainte‑Thérèse, QC J7E 2Z7",
    address: "95 Boulevard du Curé-Labelle, Sainte-Thérèse, QC J7E 2Z7",
    phone: "1-450-965-3906",
    url: "https://www.chico.ca/boutique/chico-sainte-therese/",
    description: t.storesSection?.storeDescriptions?.premiumPetBoutique || 'Premium pet boutique'
  },
  {
    name: "Chico (Sainte‑Marthe‑sur‑le‑Lac)",
    location: "Sainte‑Marthe‑sur‑le‑Lac, QC J0N 1P0",
    address: "2860 B Boulevard des Promenades, Sainte-Marthe-sur-le-Lac, QC J0N 1P0",
    phone: "1-450-598-2860",
    url: "https://www.chico.ca/boutique/chico-ste-marthe/",
    description: t.storesSection?.storeDescriptions?.premiumPetBoutique || 'Premium pet boutique'
  },
  {
    name: "Animal Shop GIGI",
    location: "Saint‑Eustache, QC J7R 2J3",
    address: "356 Boulevard Arthur-Sauvé, Saint-Eustache, QC J7R 2J3",
    phone: "1-450-598-3444",
    url: "https://www.animaleriegigi.com/",
    description: t.storesSection?.storeDescriptions?.familyOwnedPetStore || 'Family-owned pet store'
  },
  {
    name: "Chico (Laval-Est)",
    location: "Laval, QC H7E 0A4",
    address: "5405 Boulevard Robert-Bourassa, Laval, QC H7E 0A4",
    phone: "1-450-239-0354",
    url: "https://www.chico.ca/en/boutique/chico-laval-east/",
    description: t.storesSection?.storeDescriptions?.premiumPetBoutique || 'Premium pet boutique'
  },
  {
    name: "Chico (Laval Ouest)",
    location: "Laval, QC H7R 5P8",
    address: "4511 Bd Arthur-Sauvé, Laval, QC H7R 5P8",
    phone: "1-450-314-2442",
    url: "https://www.chico.ca/boutique/chico-laval-ouest/",
    description: t.storesSection?.storeDescriptions?.premiumPetBoutique || 'Premium pet boutique'
  },
  {
    name: "Pattes et Griffes (Laval)",
    location: "Laval, QC H7S 1M9",
    address: "1682 Boulevard Saint-Martin Ouest, Laval, QC H7S 1M9",
    phone: "1-579-640-1857",
    url: "https://www.pattesgriffes.com/pages/trouvez-une-boutique",
    description: t.storesSection?.storeDescriptions?.completePetCareAndSupplies || 'Complete pet care and supplies'
  },
  {
    name: "Pitou Minou & Compagnons (Kirkland)",
    location: "Kirkland, QC H9H 0C5",
    address: "16936 Autoroute Transcanadienne, Kirkland, QC H9H 0C5",
    phone: "1-514-695-5005",
    url: "https://pitou-minou.ca/global-pet-foods-succursales-quebec/",
    description: t.storesSection?.storeDescriptions?.globalPetFoodsLocation || 'Global Pet Foods location'
  },
  {
    name: "Chico (Saint‑Laurent)",
    location: "Montreal, QC H2S 3E3",
    address: "7001 Boulevard Saint-Laurent, Montréal, QC H2S 3E3",
    phone: "1-514-657-5813",
    url: "https://www.chico.ca/boutique/chico-boul-st-laurent-montreal/",
    description: t.storesSection?.storeDescriptions?.premiumPetBoutique || 'Premium pet boutique'
  },
  {
    name: "Doghaus",
    location: "Montreal, QC H4A 1W6",
    address: "5671 Rue Sherbrooke Ouest, Montréal, QC H4A 1W6",
    phone: "514-483-3555",
    url: "https://www.doghausmtl.com/",
    description: t.storesSection?.storeDescriptions?.premiumPetProductsAndSupplies || 'Premium pet products and supplies'
  },
  {
    name: "Kong Animalerie",
    location: "Montreal, QC H3W 3H8",
    address: "5555 Bd Décarie, Montréal, QC H3W 3H8",
    phone: "514-662-8373",
    url: "https://www.facebook.com/konganimalerie/",
    description: t.storesSection?.storeDescriptions?.fullServicePetStore || 'Full-service pet store'
  },
  {
    name: "Coquette et Finegueule",
    location: "Verdun, QC H4H 1E6",
    address: "5203 Rue Bannantyne, Verdun, QC H4H 1E6",
    phone: "514-761-4221",
    url: "https://coquetteetfinegueule.com/",
    description: t.storesSection?.storeDescriptions?.petStoreWithGroomingServices || 'Pet store with grooming services'
  },
  {
    name: "Pitou Minou & Compagnons (Verdun)",
    location: "Verdun, QC H4G 1V7",
    address: "4100 Rue Wellington, Verdun, QC H4G 1V7",
    phone: "514-732-0555",
    url: "https://pitou-minou.ca/global-pet-foods-succursales-quebec/",
    description: t.storesSection?.storeDescriptions?.globalPetFoodsLocation || 'Global Pet Foods location'
  },
  {
    name: "Chico (Plateau Mont‑Royal)",
    location: "Montreal, QC H2H 1J6",
    address: "2016 Avenue du Mont-Royal E., Montréal, QC H2H 1J6",
    phone: "514-521-0201",
    url: "https://www.chico.ca/boutique/chico-plateau-mont-royal-montreal/",
    description: t.storesSection?.storeDescriptions?.premiumPetBoutique || 'Premium pet boutique'
  },
  {
    name: "Chico (Hochelaga‑Maisonneuve)",
    location: "Montreal, QC H1L 2M4",
    address: "8646 Rue Hochelaga, Montréal, QC H1L 2M4",
    phone: "514-419-9850",
    url: "https://www.chico.ca/boutique/chico-rue-ontario-montreal/",
    description: t.storesSection?.storeDescriptions?.premiumPetBoutique || 'Premium pet boutique'
  },
  {
    name: "Chico (Plateau Mont-Royal — alternate)",
    location: "Montreal, QC H1W 1S7",
    address: "3911 Rue Ontario E., Montréal, QC H1W 1S7",
    phone: "514-527-1371",
    url: "https://www.chico.ca/boutique/chico-rue-ontario-montreal/",
    description: t.storesSection?.storeDescriptions?.premiumPetBoutique || 'Premium pet boutique'
  },
  {
    name: "Animalerie Mamiwouff Inc",
    location: "Saint-Césaire, QC J0L 1T0",
    address: "2048 Route 112, Saint-Césaire, QC J0L 1T0",
    phone: "450-469-4560",
    url: "https://www.animaleriemamiwouff.com/",
    description: t.storesSection?.storeDescriptions?.familyOwnedPetStore || 'Family-owned pet store'
  },
  {
    name: "Animalerie Lamifidel",
    location: "Alma, QC G8B 2V6",
    address: "1295 Avenue du Pont S, Alma, QC G8B 2V6",
    phone: "418-668-0117",
    url: "https://www.lamifidel.net/",
    description: t.storesSection?.storeDescriptions?.completePetCareAndSupplies || 'Complete pet care and supplies'
  },
  {
    name: "Animalerie Petmobile Nathamo",
    location: "Shawinigan, QC G0X 1L0",
    address: "161 Rue de l'Hydravion, Shawinigan, QC G0X 1L0",
    phone: "819-695-2329",
    url: "",
    description: t.storesSection?.storeDescriptions?.completePetCareAndSupplies || 'Complete pet care and supplies'
  },
  {
    name: "Animalerie Club Wouf Miaou",
    location: "Trois-Rivières, QC G9A 6M1",
    address: "3175 boulevard des Récollets, Trois-Rivières, QC G9A 6M1",
    phone: "+1 819-376-0973",
    url: "https://woufmiaou.ca/",
    description: t.storesSection?.storeDescriptions?.completePetCareAndSupplies || 'Complete pet care and supplies'
  },
  {
    name: "Little Bit Western Feed and Supplies Inc.",
    location: "Timmins, ON P4N 2S2",
    address: "372 Algonquin Blvd.West, TIMMINS, ON P4N 2S2",
    phone: "",
    url: "https://www.littlebitwestern.ca/",
    description: t.storesSection?.storeDescriptions?.completePetCareAndSupplies || 'Complete pet care and supplies'
  },
  {
    name: "K&K Pet Foods Dunbar",
    location: "Vancouver, BC V6S 2G2",
    address: "4595 Dunbar St, Vancouver, BC V6S 2G2",
    phone: "+1 604-224-2513",
    url: "https://www.kandkpetfoods.ca/",
    description: t.storesSection?.storeDescriptions?.premiumPetProductsAndSupplies || 'Premium pet products and supplies'
  },
  {
    name: "Viva Pets",
    location: "Montreal, QC",
    address: "Montreal, QC",
    phone: "780-489-7387",
    url: "https://www.vivapets.ca/",
    description: t.storesSection?.storeDescriptions?.premiumPetProductsAndSupplies || 'Premium pet products and supplies'
  },
  {
    name: "Best Cat",
    location: "Burlington, ON L7N 2R4",
    address: "3455 Fairview St., Unit 15A, Burlington, ON L7N 2R4",
    phone: "1-905-333-4060",
    url: "https://bestcat.ca/",
    description: t.storesSection?.storeDescriptions?.premiumPetProductsAndSupplies || 'Premium pet products and supplies'
  },
  {
    name: "Camlachie Feed",
    location: "Camlachie, ON N0N 1E0",
    address: "3912 Egremont Rd, Camlachie, Ontario, N0N 1E0",
    phone: "519-899-2285",
    url: "https://www.camlachiefeed.ca/",
    description: t.storesSection?.storeDescriptions?.completePetCareAndSupplies || 'Complete pet care and supplies'
  },
];

// ============================================================================
// Subcomponents
// ============================================================================


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

  // Reset error state when storeName changes
  useEffect(() => {
    setHasError(false);
  }, [storeName]);

  if (!logoConfig || hasError) {
    return <span className="text-3xl">🏪</span>;
  }

  return (
    <div className="relative w-full h-full p-2">
      <Image
        src={logoConfig.src}
        alt={logoConfig.alt || storeName}
        fill
        sizes="(max-width: 768px) 64px, 64px"
        className="object-contain"
        onError={() => {
          setHasError(true);
        }}
      />
    </div>
  );
}

export function Stores() {
  const locale = useLocale();
  const { t } = __useTranslation();
  const uiCopy = storesUiCopy[locale as SupportedLocale] || storesUiCopy.en;
  const stores = getStoresWithTranslations(t);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [requestForm, setRequestForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleRequestStore = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const safeMessage = requestForm.message.replace(/[<>"'&]/g, '').trim();
      const message = [
        'Store availability request from website visitor.',
        '',
        `Requested store details: ${safeMessage}`,
        '',
        'Please contact this customer and follow up with the retailer.',
      ].join('\n');

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: requestForm.name.trim(),
          email: requestForm.email.trim().toLowerCase(),
          message,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus('success');
        setStatusMessage(t.storesSection?.requestSuccess || 'Thank you! We\'ll reach out to help get Purrify at your local store.');
        setRequestForm({
          name: '',
          email: '',
          message: '',
        });
      } else {
        setSubmitStatus('error');
        setStatusMessage(data.message || t.storesSection?.requestError || 'Failed to send request. Please try again or contact us directly.');
      }
    } catch {
      setSubmitStatus('error');
      setStatusMessage(t.storesSection?.requestError || 'An error occurred. Please contact us directly at support@purrify.ca');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="stores" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Container>
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#FF8E3C]"></span>
            <span className="text-[#FF8E3C] font-bold tracking-wider text-sm uppercase flex items-center gap-2">
              <span className="text-lg">📍</span> {uiCopy.sectionBadge}
            </span>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#FF8E3C]"></span>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">
            {uiCopy.headingPrefix}
            <span className="bg-gradient-to-r from-[#FF8E3C] to-[#FF5050] bg-clip-text text-transparent ml-2">
              {uiCopy.headingHighlight}
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10">
            {uiCopy.subtitle}
          </p>

          {/* Search/Filter Controls - Placeholder for future implementation if needed, utilizing browser search for now via the grid below */}
        </div>



        {/* Stores Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stores.map((store, index) => {
            const logoConfig = getStoreLogo(store.name);
            const shouldUseWhiteBg = hasWhiteBackground(store.name);

            return (
              <div
                key={`${store.name}-${store.location}`}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:border-orange-200 dark:hover:border-orange-900/50 transition-all duration-300 hover:-translate-y-1 group"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div
                      className={
                        "w-16 h-16 rounded-xl flex items-center justify-center shadow-md overflow-hidden " +
                        (shouldUseWhiteBg ? "bg-white dark:bg-white" : "bg-gradient-to-br from-[#FF8E3C] to-[#FF5050]")
                      }
                    >
                      <StoreLogoImage logoConfig={logoConfig} storeName={store.name} />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-[17px] text-gray-900 dark:text-white mb-2.5 group-hover:text-[#FF8E3C] transition-colors leading-tight">
                      {store.name}
                    </h3>

                    <div className="space-y-2">
                      <a
                        href={`https://maps.google.com/?q=${encodeURIComponent(`${store.address}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex min-h-[44px] items-start rounded-lg px-1 text-[14px] text-gray-600 dark:text-gray-300 hover:text-[#FF8E3C] dark:hover:text-[#FF8E3C] transition-colors gap-2.5"
                        aria-label={`View ${store.name} on Google Maps`}
                      >
                        <svg className="w-4 h-4 text-gray-400 dark:text-gray-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="leading-snug">
                          {store.address.includes(',') ? (
                            <>
                              <span className="block font-medium dark:text-gray-200">{store.address.substring(0, store.address.indexOf(','))}</span>
                              <span className="block text-[13px] text-gray-500 dark:text-gray-400 mt-0.5">{store.address.substring(store.address.indexOf(',') + 1).trim()}</span>
                            </>
                          ) : (
                            <span className="font-medium dark:text-gray-200">{store.address}</span>
                          )}
                        </span>
                      </a>

                      {store.phone && (
                        <a
                          href={`tel:${store.phone.replace(/[^\d+]/g, '')}`}
                          className="flex min-h-[44px] items-center rounded-lg px-1 text-[14px] text-gray-600 dark:text-gray-300 hover:text-[#FF8E3C] dark:hover:text-[#FF8E3C] transition-colors gap-2.5"
                          aria-label={`Call ${store.name} at ${store.phone}`}
                        >
                          <svg className="w-4 h-4 text-gray-400 dark:text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <span className="font-medium dark:text-gray-200">{store.phone}</span>
                        </a>
                      )}

                      {store.url && (
                        <a
                          href={store.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex min-h-[44px] items-center rounded-lg px-1 text-[14px] text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors gap-2.5"
                          aria-label={`${uiCopy.websiteLabel} - ${store.name}`}
                        >
                          <WebsiteIcon className="w-4 h-4 flex-shrink-0 mt-0.5" />
                          <span className="font-medium">{uiCopy.websiteLabel}</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Request Store CTA */}
        <div className="mt-20 text-center">
          <div className="inline-block p-1 bg-gradient-to-r from-[#FF8E3C] to-[#FF5050] rounded-2xl shadow-lg shadow-orange-500/20">
            <div className="bg-white dark:bg-gray-900 rounded-xl px-8 py-10 md:px-16">
              <h3 className="font-heading text-2xl font-black text-gray-900 dark:text-white mb-3">
                {uiCopy.requestTitle}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-lg mx-auto">
                {uiCopy.requestSubtitle}
              </p>
              <form onSubmit={handleRequestStore} className="max-w-xl mx-auto space-y-4 text-left">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="block">
                    <span className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1.5">
                      {t.contactPage?.form?.fullName}
                    </span>
                    <input
                      type="text"
                      required
                      minLength={2}
                      maxLength={50}
                      value={requestForm.name}
                      onChange={(event) => setRequestForm((prev) => ({ ...prev, name: event.target.value }))}
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-3 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF8E3C] focus:border-transparent"
                    />
                  </label>
                  <label className="block">
                    <span className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1.5">
                      {t.contactPage?.form?.emailAddress}
                    </span>
                    <input
                      type="email"
                      required
                      maxLength={100}
                      value={requestForm.email}
                      onChange={(event) => setRequestForm((prev) => ({ ...prev, email: event.target.value }))}
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-3 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF8E3C] focus:border-transparent"
                    />
                  </label>
                </div>
                <label className="block">
                  <span className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1.5">
                    {t.contactPage?.form?.message}
                  </span>
                  <textarea
                    required
                    minLength={10}
                    maxLength={300}
                    rows={4}
                    value={requestForm.message}
                    onChange={(event) => setRequestForm((prev) => ({ ...prev, message: event.target.value }))}
                    placeholder={t.contactPage?.form?.messagePlaceholder}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-3 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF8E3C] focus:border-transparent"
                  />
                </label>
                <button
                  type="submit"
                  disabled={isSubmitting || submitStatus === 'success'}
                  className="bg-gradient-to-r from-[#FF8E3C] to-[#FF5050] dark:from-[#CC5C00] dark:to-[#CC2727] hover:from-[#E67E30] hover:to-[#E64040] dark:hover:from-[#B35200] dark:hover:to-[#991D1D] text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 active:scale-95 border-0 flex items-center justify-center gap-2 mx-auto min-w-[240px] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {t.storesSection?.sending || "Sending..."}
                    </>
                  ) : submitStatus === 'success' ? (
                    <>
                      <span className="text-xl">✅</span>
                      {t.storesSection?.requestSent || "Request Sent!"}
                    </>
                  ) : (
                    <>
                      <span className="text-xl">📝</span>
                      {t.storesSection?.requestStoreAvailability || uiCopy.requestButton}
                    </>
                  )}
                </button>
              </form>
              {submitStatus !== 'idle' && statusMessage && (
                <p
                  role="status"
                  aria-live="polite"
                  className={`mt-4 text-sm font-medium ${submitStatus === 'success' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}
                >
                  {statusMessage}
                </p>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
} 
