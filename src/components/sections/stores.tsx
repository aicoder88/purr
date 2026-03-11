import { Container } from "@/components/ui/container";
import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import {
  getStoreLogo,
  hasWhiteBackground,
  RETAILER_LOCATIONS,
  type StoreLogoConfig,
} from "@/lib/store-locations";
import { StoresRequestForm } from "./StoresRequestForm";

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

// ============================================================================
// Constants
// ============================================================================

type SupportedLocale = 'en' | 'fr';

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
};

// ============================================================================
// Store Data
// ============================================================================

const getStoresWithTranslations = (t: Awaited<ReturnType<typeof getTranslations>>): Store[] => {
  const description = (descriptionKey: string, fallback: string) => (
    t.has(descriptionKey as never) ? t(descriptionKey as never) : fallback
  );

  return RETAILER_LOCATIONS.map((store) => ({
    name: store.name,
    location: store.location,
    address: store.address,
    phone: store.phone,
    url: store.url,
    description: description(store.descriptionKey, store.descriptionFallback),
  }));
};

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
function StoreLogoImage({ logoConfig, storeName }: { logoConfig: StoreLogoConfig | null; storeName: string }) {
  if (!logoConfig) {
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
      />
    </div>
  );
}

export async function Stores() {
  const locale = await getLocale();
  const t = await getTranslations();
  const uiCopy = storesUiCopy[locale as SupportedLocale] || storesUiCopy.en;
  const stores = getStoresWithTranslations(t);

  return (
    <section
      id="stores"
      className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
    >
      <Container>
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-brand-pink"></span>
            <span className="font-bold tracking-wider text-sm uppercase flex items-center gap-2">
              <span className="text-lg">📍</span>
              <span className="bg-gradient-to-r from-brand-yellow via-brand-pink to-brand-pink bg-clip-text text-transparent">
                {uiCopy.sectionBadge}
              </span>
            </span>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-brand-yellow"></span>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">
            {uiCopy.headingPrefix}
            <span className="bg-gradient-to-r from-brand-yellow via-brand-pink to-brand-pink bg-clip-text text-transparent ml-2">
              {uiCopy.headingHighlight}
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10">
            {uiCopy.subtitle}
          </p>

          {/* Search/Filter Controls - Placeholder for future implementation if needed, utilizing browser search for now via the grid below */}
        </div>



        {/* Stores Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stores.map((store, index) => {
            const logoConfig = getStoreLogo(store.name, {
              className: 'w-16 h-16 object-contain',
              width: 64,
              height: 64,
            });
            const shouldUseWhiteBg = hasWhiteBackground(store.name);

            return (
              <div
                key={`${store.name}-${store.location}`}
                className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:border-orange-200 dark:hover:border-orange-900/50 transition-all duration-300 hover:-translate-y-1 group"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div
                      className={
                        "w-10 h-10 rounded-lg flex items-center justify-center shadow-sm overflow-hidden " +
                        (shouldUseWhiteBg ? "bg-white dark:bg-white border border-gray-100 dark:border-gray-700" : "bg-gradient-to-br from-brand-yellow via-brand-pink to-brand-pink")
                      }
                    >
                      <StoreLogoImage logoConfig={logoConfig} storeName={store.name} />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-[15px] text-gray-900 dark:text-white mb-1 group-hover:text-brand-pink transition-colors leading-tight truncate">
                      {store.name}
                    </h3>

                    <div className="space-y-0">
                      <a
                        href={`https://maps.google.com/?q=${encodeURIComponent(`${store.address}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start rounded-lg px-0.5 py-0.5 text-[13px] text-gray-600 dark:text-gray-300 hover:text-brand-pink dark:hover:text-brand-pink transition-colors gap-2"
                      >
                        <svg className="w-3 h-3 text-gray-400 dark:text-gray-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="leading-snug">
                          {store.address.includes(',') ? (
                            <>
                              <span className="block font-medium dark:text-gray-200">{store.address.substring(0, store.address.indexOf(','))}</span>
                              <span className="block text-[12px] text-gray-500 dark:text-gray-400">{store.address.substring(store.address.indexOf(',') + 1).trim()}</span>
                            </>
                          ) : (
                            <span className="font-medium dark:text-gray-200">{store.address}</span>
                          )}
                        </span>
                      </a>

                      {store.phone && (
                        <a
                          href={`tel:${store.phone.replace(/[^\d+]/g, '')}`}
                          className="flex items-center rounded-lg px-0.5 py-0.5 text-[13px] text-gray-600 dark:text-gray-300 hover:text-brand-pink dark:hover:text-brand-pink transition-colors gap-2"
                        >
                          <svg className="w-3 h-3 text-gray-400 dark:text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                          className="flex items-center rounded-lg px-0.5 py-0.5 text-[13px] text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors gap-2"
                        >
                          <WebsiteIcon className="w-3 h-3 flex-shrink-0" />
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
          <div className="inline-block p-1 bg-gradient-to-r from-brand-yellow via-brand-pink to-brand-pink rounded-2xl shadow-lg shadow-pink-500/20">
            <div className="bg-white dark:bg-gray-900 rounded-xl px-8 py-10 md:px-16">
              <h3 className="font-heading text-2xl font-black text-gray-900 dark:text-white mb-3">
                {uiCopy.requestTitle}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-lg mx-auto">
                {uiCopy.requestSubtitle}
              </p>
              <StoresRequestForm
                fullNameLabel={t("contactPage.form.fullName")}
                emailLabel={t("contactPage.form.emailAddress")}
                messageLabel={t("contactPage.form.message")}
                messagePlaceholder={t("contactPage.form.messagePlaceholder")}
                requestButtonLabel={t.has("storesSection.requestStoreAvailability") ? t("storesSection.requestStoreAvailability") : uiCopy.requestButton}
                sendingLabel={t.has("storesSection.sending") ? t("storesSection.sending") : "Sending..."}
                successLabel={t.has("storesSection.requestSent") ? t("storesSection.requestSent") : "Request Sent!"}
                successMessage={t.has("storesSection.requestSuccess") ? t("storesSection.requestSuccess") : "Thank you! We'll reach out to help get Purrify at your local store."}
                errorMessage={t.has("storesSection.requestError") ? t("storesSection.requestError") : "An error occurred. Please contact us directly at support@purrify.ca"}
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
