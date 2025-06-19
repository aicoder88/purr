import { Container } from "@/components/ui/container";
import SectionHeader from "../ui/section-header";
import { useTranslation } from "../../lib/translation-context";

// Store data - you can modify this list as needed
const STORES = [
  {
    name: "Pattes et Griffes - Sainte- Thérèse",
    location: "Sainte-Thérèse, QC",
    address: "190 Bd du Curé-Labelle suite 1b",
    phone: "450-818-1310",
    url: "https://pattesgriffes.com/storelocator.html"
  },
  {
    name: "Chico - Boutique d'animaux | Sainte-Thérèse",
    location: "Sainte-Thérèse, QC", 
    address: "95 Bd du Curé-Labelle Suite 8",
    phone: "450-965-3906",
    url: "https://www.chico.ca/boutique/chico-sainte-therese/"
  },
  {
    name: "Chico - Boutique d'animaux | Sainte-Marthe-sur-le-Lac",
    location: "Sainte-Marthe-Sur-Le-Lac, QC",
    address: "2860 B Boul. des Promenades",
    phone: "450-598-2860",
    url: "https://www.chico.ca/boutique/chico-ste-marthe/"
  },
  {
    name: "Animal Shop Animal GIGI",
    location: "Saint-Eustache, QC",
    address: "356 Bd Arthur-Sauvé",
    phone: "450-598-3444",
    url: "https://www.animaleriegigi.com/"
  },
  {
    name: "Chico - Boutique d'animaux | Bd Arthur-Sauvé, Laval",
    location: "Laval, QC",
    address: "4511 Bd Arthur-Sauvé",
    phone: "450-314-2442",
    url: "https://www.chico.ca/boutique/chico-laval-ouest/"
  },
  {
    name: "Pattes et Griffes - Cartier Ouest",
    location: "Laval, QC",
    address: "293 Bd Cartier Ouest",
    phone: "450-490-1414",
    url: "https://pattesgriffes.com/storelocator.html"
  },
  {
    name: "Pitou Minou & Compagnons Kirkland",
    location: "Kirkland, QC",
    address: "16936 Route Transcanadienne",
    phone: "514-695-5005",
    url: "https://pitou-minou.ca/en/global-pet-foods-locations-quebec/"
  },
  {
    name: "Chico - Boutique d'animaux | Boul. St-Laurent (Montreal)",
    location: "Montreal, QC",
    address: "7001 Boul. Saint-Laurent",
    phone: "514-657-5813",
    url: "https://www.chico.ca/boutique/chico-boul-st-laurent-montreal/"
  },
  {
    name: "Doghaus",
    location: "Montreal, QC",
    address: "5671 Rue Sherbrooke O",
    phone: "514-483-3555",
    url: "https://www.doghausmtl.com/"
  },
  {
    name: "KONG ANIMALERIE",
    location: "Montreal, QC",
    address: "5555 Bd Decarie",
    phone: "514-662-8373",
    url: "https://www.facebook.com/konganimalerie/"
  },
  {
    name: "Coquette et Finegueule Animalerie avec toilettage - Pet store with grooming",
    location: "Verdun, QC",
    address: "5203 Av Bannantyne",
    phone: "514-761-4221",
    url: "https://coquetteetfinegueule.com/"
  },
  {
    name: "Pitou Minou & Compagnons Verdun | Global Pet Foods Verdun",
    location: "Verdun, QC",
    address: "4100 Rue Wellington",
    phone: "514-732-0555",
    url: "https://www.pitouminou.com/en/global-pet-foods-locations-quebec/"
  },
  {
    name: "Chico - Boutique d'animaux | Mont-Royal E",
    location: "Montreal, QC",
    address: "2016 Avenue du Mont-Royal E",
    phone: "514-521-0201",
    url: "https://www.chico.ca/boutique/chico-plateau-mont-royal-montreal/"
  },
  {
    name: "Chico - Boutique d'animaux | Rue Ontario E",
    location: "Montreal, QC",
    address: "3911 Rue Ontario E",
    phone: "514-527-1371",
    url: "https://www.chico.ca/boutique/chico-rue-ontario-montreal/"
  },
  {
    name: "Pattes et Griffes - Marche Centrale",
    location: "Montreal, QC",
    address: "9185 Bd de l'Acadie",
    phone: "514-389-0090",
    url: "https://pattesgriffes.com/storelocator.html"
  },
];

export function Stores() {
  const { t } = useTranslation();
  
  return (
    <section
      className="py-16 bg-gradient-to-br from-[#FFFFFF] via-[#FFFFF5] to-[#FFFFFF]"
      id="stores"
    >
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-12">
          <SectionHeader text={t.storesSection?.availableInStores || "AVAILABLE IN STORES"} />
          <h2 className="text-5xl font-bold tracking-tight mb-6 bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80 bg-clip-text text-transparent">
            {t.storesSection?.soldInFollowingStores || "SOLD IN THE FOLLOWING STORES"}
          </h2>
          <p className="text-gray-600 text-xl max-w-2xl mx-auto">
            {t.storesSection?.subtitle || "Find Purrify at your favorite pet stores across Canada. Visit any of these locations to purchase our premium cat litter additive."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {STORES.map((store, index) => (
            <div
              key={`${store.name}-${store.location}`}
              className="bg-white rounded-2xl p-6 shadow-lg border border-[#E0EFC7] hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div
                    className={
                      "w-12 h-12 rounded-full flex items-center justify-center " +
                      (store.name.includes('Chico') || store.name.includes('Pattes et Griffes') || store.name.includes('GIGI')
                        ? "bg-white"
                        : "bg-gradient-to-br from-[#FF3131] to-[#FF3131]/80")
                    }
                  >
                    {store.name.includes('Chico') ? (
                      <img
                        src="https://www.chico.ca/wp-content/themes/boutiquechico/img/chico.svg"
                        alt="Chico Logo"
                        className="w-10 h-10"
                      />
                    ) : store.name.includes('Pattes et Griffes') ? (
                      <img
                        src="https://pattesgriffes.com/static/frontend/Sm/petshop_child/fr_FR/images/fonts/logo.svg"
                        alt="Pattes et Griffes Logo"
                        className="w-12 h-12 object-contain"
                      />
                    ) : store.name.includes('GIGI') ? (
                      <img
                        src="https://animalgigi.com/img/logo.png"
                        alt="Animalerie GIGI Logo"
                        className="w-12 h-12 object-contain"
                      />
                    ) : (
                      <svg 
                        className="w-6 h-6 text-white" 
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
                    )}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {store.name}
                  </h3>
                  <p className="text-[#FF3131] font-medium text-sm mb-1">
                    {store.location}
                  </p>
                  <p className="text-gray-600 text-sm mb-2">
                    {store.address}
                  </p>
                  {store.phone && (
                    <a 
                      href={`tel:${store.phone}`}
                      className="inline-flex items-center text-sm text-[#FF3131] hover:text-[#FF3131]/80 transition-colors duration-200 mb-1"
                    >
                      <svg 
                        className="w-4 h-4 mr-1" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
                        />
                      </svg>
                      {store.phone}
                    </a>
                  )}
                  {store.url && (
                    <a
                      href={store.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200 ml-2"
                    >
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v1m0 14v1m8-8h-1M5 12H4m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                      Website
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            {t.storesSection?.dontSeeLocalStore || "Don't see your local store? Contact us to request Purrify at your favorite pet store!"}
          </p>
          <button 
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80 hover:from-[#FF3131]/90 hover:to-[#FF3131] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-0"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            {t.storesSection?.requestStoreAvailability || "Request Store Availability"}
          </button>
        </div>
      </Container>
    </section>
  );
} 