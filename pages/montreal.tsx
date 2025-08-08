import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { Layout } from '../src/components/layout/layout';
import { OptimizedImage } from '../src/components/performance/OptimizedImage';
import { SITE_NAME } from '../src/lib/constants';
import { MONTREAL_STRUCTURED_DATA, MONTREAL_SEO_CONFIG, QUEBEC_LEGAL_COMPLIANCE } from '../src/lib/montreal-seo-config';
import { useTranslation } from '../src/lib/translation-context';
import { Container } from '../src/components/ui/container';
import { Button } from '../src/components/ui/button';
import { MapPin, Phone, Clock, Truck, Shield, Star, ChevronRight } from 'lucide-react';

export default function Montreal() {
  const { t, locale } = useTranslation();
  
  const pageTitle = locale === 'fr' 
    ? 'Désodorisant Litière Chat Montréal - Où Acheter Purrify Québec'
    : 'Cat Litter Deodorizer Montreal Stores - Where to Buy Purrify Canada';
    
  const pageDescription = locale === 'fr'
    ? 'Trouvez le désodorisant pour litière de chat Purrify dans les boutiques d\'animaux indépendantes de Montréal. Charbon activé premium fabriqué au Canada. Emplacements, directions, prix.'
    : 'Find Purrify cat litter deodorizer at independent pet stores throughout Montreal. Premium activated carbon odor eliminator made in Canada. Store locations, directions, and pricing.';
    
  const canonicalUrl = `https://purrify.ca/${locale === 'fr' ? 'fr/' : ''}montreal`;

  // Montreal stores data with bilingual content
  const montrealStores = [
    {
      name: "Safari Animalerie Westmount", 
      nameEn: "Safari Pet Store Westmount",
      address: "4898 Sherbrooke St W, Westmount, QC H3Z 1H1",
      phone: "(514) 486-6666",
      hours: locale === 'fr' ? "Lun-Ven 9h-19h, Sam-Dim 9h-17h" : "Mon-Fri 9AM-7PM, Sat-Sun 9AM-5PM",
      coordinates: { lat: 45.4825, lng: -73.5917 },
      neighborhood: "Westmount",
      specialties: locale === 'fr' ? ["Service personnalisé", "Produits premium"] : ["Personal service", "Premium products"]
    }
  ];
  
  // Enhanced structured data for better SEO
  const baseStructuredData = {
    ...MONTREAL_STRUCTURED_DATA,
    "name": locale === 'fr' ? "Purrify - Désodorisant Litière Chat Montréal" : "Purrify - Cat Litter Deodorizer Montreal",
    "description": pageDescription,
    "url": canonicalUrl
  };

  // Local business structured data for each store location
  const storeStructuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Store",
      "name": "Purrify at Montreal Pet Stores",
      "description": "Find Purrify cat litter deodorizer at independent pet stores throughout Montreal and surrounding areas.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Montreal",
        "addressRegion": "QC",
        "addressCountry": "CA"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "45.5017",
        "longitude": "-73.5673"
      },
      "areaServed": [
        "Montreal", "Laval", "Longueuil", "Verdun", "Kirkland", "Saint-Eustache", "Sainte-Thérèse", "Sainte-Marthe-sur-le-Lac"
      ],
      "brand": {
        "@type": "Brand",
        "name": "Purrify"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Purrify Cat Litter Products",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Product",
              "name": "Purrify Cat Litter Deodorizer",
              "description": "Premium activated carbon cat litter additive for natural odor control",
              "brand": "Purrify",
              "category": "Pet Supplies"
            }
          }
        ]
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Where can I buy Purrify in Montreal?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Purrify is available at independent pet stores throughout Montreal, including locations in Verdun, Kirkland, Saint-Eustache, Sainte-Thérèse, and Laval. Visit any of our listed partner stores or call ahead to confirm availability."
          }
        },
        {
          "@type": "Question", 
          "name": "What makes Purrify ideal for Montreal cat owners?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Purrify is made in Canada with premium activated carbon, perfect for Montreal's long winters when windows stay closed. It provides natural odor control without harsh chemicals, ideal for apartments and small spaces common in Montreal."
          }
        },
        {
          "@type": "Question",
          "name": "How much does Purrify cost in Montreal?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Purrify is available in three sizes: 17g trial size for $6.99 CAD, 60g regular size for $19.99 CAD, and 120g large size for $29.99 CAD. Prices may vary by retailer."
          }
        }
      ]
    }
  ];

  const allStructuredData = [baseStructuredData, ...storeStructuredData];

  return (
    <Layout>
      <NextSeo
        title={pageTitle}
        description={pageDescription}
        canonical={canonicalUrl}
        openGraph={{
          type: 'website',
          url: canonicalUrl,
          title: pageTitle,
          description: pageDescription,
          images: [
            {
              url: 'https://purrify.ca/images/montreal-stores.jpg',
              width: 1200,
              height: 630,
              alt: 'Purrify cat litter deodorizer available at Montreal pet stores',
            },
          ],
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: 'cat litter deodorizer Montreal, Purrify Montreal stores, cat odor eliminator Quebec, natural litter additive Montreal, independent pet stores, activated carbon cat litter, pet stores Montreal, cat supplies Montreal, litter box odor control',
          },
          {
            name: 'geo.region',
            content: 'CA-QC'
          },
          {
            name: 'geo.placename', 
            content: 'Montreal, Quebec, Canada'
          },
          {
            name: 'geo.position',
            content: '45.5017;-73.5673'
          },
          {
            name: 'ICBM',
            content: '45.5017, -73.5673'
          },
          {
            name: 'author',
            content: 'Purrify Canada'
          },
          {
            name: 'robots',
            content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
          },
          {
            property: 'article:modified_time',
            content: new Date().toISOString()
          },
          {
            name: 'twitter:card',
            content: 'summary_large_image'
          },
          {
            name: 'twitter:site',
            content: '@PurrifyCanada'
          },
          {
            name: 'twitter:title',
            content: pageTitle
          },
          {
            name: 'twitter:description',
            content: pageDescription
          },
          {
            name: 'twitter:image',
            content: 'https://purrify.ca/images/montreal-stores.jpg'
          }
        ]}
      />
      
      {allStructuredData.map((data, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {locale === 'fr' 
              ? 'Désodorisant pour Litière de Chat Montréal | Purrify Canada' 
              : 'Cat Litter Deodorizer Montreal | Where to Buy Purrify in Quebec'
            }
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {locale === 'fr'
              ? 'Découvrez Purrify, l’additif au charbon activé premium pour litière de chat. Contrôle naturel des odeurs fabriqué au Canada, disponible dans les animaleries de Montréal et région.'
              : 'Discover Purrify’s premium activated carbon cat litter additive at Montreal area pet stores. Natural odor control made in Canada, available throughout Greater Montreal, Laval, and surrounding communities.'
            }
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-blue-900 mb-3">
              {locale === 'fr' ? 'Maintenant Disponible à Montréal!' : 'Now Available in Montreal & Surrounding Areas!'}
            </h2>
            <p className="text-blue-800">
              {locale === 'fr'
                ? 'Visitez votre animalerie locale indépendante pour trouver Purrify. Appelez à l’avance pour confirmer la disponibilité dans votre magasin préféré.'
                : 'Visit your local independent pet store to find Purrify. Call ahead to confirm availability at your preferred location in Montreal, Laval, Verdun, or surrounding areas.'
              }
            </p>
          </div>
        </section>

        {/* Store Locations */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {locale === 'fr' 
              ? 'Où Acheter Purrify dans la Région de Montréal | Magasins Partenaires'
              : 'Where to Buy Purrify in Montreal Area | Pet Store Locations'
            }
          </h2>
          <p className="text-lg text-gray-600 text-center mb-8 max-w-4xl mx-auto">
            {locale === 'fr'
              ? 'Trouvez Purrify dans ces animaleries de confiance à travers Montréal, Laval, Verdun et les communautés avoisinantes. Chaque magasin offre un service personnalisé et des conseils d’experts pour vos animaux de compagnie.'
              : 'Find Purrify at these trusted pet stores across Montreal, Laval, Verdun, and surrounding communities. Each location offers personalized service and expert advice for your pets.'
            }
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
            {/* Pattes et Griffes - Sainte-Thérèse */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-white rounded-lg border border-gray-200 flex items-center justify-center mr-3 flex-shrink-0">
                  <OptimizedImage
                    src="https://pattesgriffes.com/static/frontend/Sm/petshop_child/fr_FR/images/fonts/logo.svg"
                    alt="Pattes et Griffes Logo"
                    width={64}
                    height={64}
                    className="object-contain rounded"
                  />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold">Pattes et Griffes</h3>
                  <p className="text-gray-500 text-xs italic">Complete pet care and supplies</p>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <strong>Pattes et Griffes - Sainte-Thérèse</strong><br />
                  190 Bd du Curé-Labelle suite 1b<br />
                  Sainte-Thérèse, QC<br />
                  <span className="text-blue-600">(450) 818-1310</span><br />
                  <a href="https://pattesgriffes.com/storelocator.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-xs">Visit Website</a>
                </div>
              </div>
            </div>

            {/* Chico - Sainte-Thérèse */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-white rounded-lg border border-gray-200 flex items-center justify-center mr-3 flex-shrink-0">
                  <OptimizedImage
                    src="https://www.chico.ca/wp-content/themes/boutiquechico/img/chico.svg"
                    alt="Chico - Boutique d'animaux Logo"
                    width={64}
                    height={64}
                    className="object-contain rounded"
                  />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold">Chico - Boutique d'animaux</h3>
                  <p className="text-gray-500 text-xs italic">Premium pet boutique</p>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <strong>Chico - Sainte-Thérèse</strong><br />
                  95 Bd du Curé-Labelle Suite 8<br />
                  Sainte-Thérèse, QC<br />
                  <span className="text-blue-600">(450) 965-3906</span><br />
                  <a href="https://www.chico.ca/boutique/chico-sainte-therese/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-xs">Visit Website</a>
                </div>
              </div>
            </div>

            {/* Chico - Sainte-Marthe-sur-le-Lac */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-white rounded-lg border border-gray-200 flex items-center justify-center mr-3 flex-shrink-0">
                  <OptimizedImage
                    src="https://www.chico.ca/wp-content/themes/boutiquechico/img/chico.svg"
                    alt="Chico - Boutique d'animaux Logo"
                    width={64}
                    height={64}
                    className="object-contain rounded"
                  />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold">Chico - Boutique d'animaux</h3>
                  <p className="text-gray-500 text-xs italic">Premium pet boutique</p>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <strong>Chico - Sainte-Marthe-sur-le-Lac</strong><br />
                  2860 B Boul. des Promenades<br />
                  Sainte-Marthe-Sur-Le-Lac, QC<br />
                  <span className="text-blue-600">(450) 598-2860</span><br />
                  <a href="https://www.chico.ca/boutique/chico-ste-marthe/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-xs">Visit Website</a>
                </div>
              </div>
            </div>

            {/* Animal Shop GIGI */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-white rounded-lg border border-gray-200 flex items-center justify-center mr-3 flex-shrink-0">
                  <OptimizedImage
                    src="/optimized/gigi.webp"
                    alt="Animal Shop GIGI Pet Store Logo"
                    width={64}
                    height={64}
                    className="object-contain rounded"
                  />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold">Animal Shop GIGI</h3>
                  <p className="text-gray-500 text-xs italic">Family-owned pet store</p>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <strong>Animal Shop GIGI</strong><br />
                  356 Bd Arthur-Sauvé<br />
                  Saint-Eustache, QC<br />
                  <span className="text-blue-600">(450) 598-3444</span><br />
                  <a href="https://www.animaleriegigi.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-xs">Visit Website</a>
                </div>
              </div>
            </div>

            {/* Chico - Laval */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-white rounded-lg border border-gray-200 flex items-center justify-center mr-3 flex-shrink-0">
                  <OptimizedImage
                    src="https://www.chico.ca/wp-content/themes/boutiquechico/img/chico.svg"
                    alt="Chico - Boutique d'animaux Logo"
                    width={64}
                    height={64}
                    className="object-contain rounded"
                  />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold">Chico - Boutique d'animaux</h3>
                  <p className="text-gray-500 text-xs italic">Premium pet boutique</p>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <strong>Chico - Bd Arthur-Sauvé, Laval</strong><br />
                  4511 Bd Arthur-Sauvé<br />
                  Laval, QC<br />
                  <span className="text-blue-600">(450) 314-2442</span><br />
                  <a href="https://www.chico.ca/boutique/chico-laval-ouest/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-xs">Visit Website</a>
                </div>
              </div>
            </div>

            {/* Pattes et Griffes - Cartier Ouest */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-white rounded-lg border border-gray-200 flex items-center justify-center mr-3 flex-shrink-0">
                  <OptimizedImage
                    src="https://pattesgriffes.com/static/frontend/Sm/petshop_child/fr_FR/images/fonts/logo.svg"
                    alt="Pattes et Griffes Logo"
                    width={64}
                    height={64}
                    className="object-contain rounded"
                  />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold">Pattes et Griffes</h3>
                  <p className="text-gray-500 text-xs italic">Complete pet care and supplies</p>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <strong>Pattes et Griffes - Cartier Ouest</strong><br />
                  293 Bd Cartier Ouest<br />
                  Laval, QC<br />
                  <span className="text-blue-600">(450) 490-1414</span><br />
                  <a href="https://pattesgriffes.com/storelocator.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-xs">Visit Website</a>
                </div>
              </div>
            </div>

            {/* Pitou Minou & Compagnons Kirkland */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-white rounded-lg border border-gray-200 flex items-center justify-center mr-3 flex-shrink-0">
                  <OptimizedImage
                    src="/optimized/pitou-minou.webp"
                    alt="Pitou Minou & Compagnons - Pet Store Logo"
                    width={64}
                    height={64}
                    className="object-contain rounded"
                  />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold">Pitou Minou & Compagnons</h3>
                  <p className="text-gray-500 text-xs italic">Global Pet Foods location</p>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <strong>Pitou Minou Kirkland</strong><br />
                  16936 Route Transcanadienne<br />
                  Kirkland, QC<br />
                  <span className="text-blue-600">(514) 695-5005</span><br />
                  <a href="https://pitou-minou.ca/en/global-pet-foods-locations-quebec/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-xs">Visit Website</a>
                </div>
              </div>
            </div>

            {/* Chico - Boul. St-Laurent (Montreal) */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-white rounded-lg border border-gray-200 flex items-center justify-center mr-3 flex-shrink-0">
                  <OptimizedImage
                    src="https://www.chico.ca/wp-content/themes/boutiquechico/img/chico.svg"
                    alt="Chico - Boutique d'animaux Logo"
                    width={64}
                    height={64}
                    className="object-contain rounded"
                  />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold">Chico - Boutique d'animaux</h3>
                  <p className="text-gray-500 text-xs italic">Premium pet boutique</p>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <strong>Chico - Boul. St-Laurent (Montreal)</strong><br />
                  7001 Boul. Saint-Laurent<br />
                  Montreal, QC<br />
                  <span className="text-blue-600">(514) 657-5813</span><br />
                  <a href="https://www.chico.ca/boutique/chico-boul-st-laurent-montreal/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-xs">Visit Website</a>
                </div>
              </div>
            </div>

            {/* Doghaus */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-white rounded-lg border border-gray-200 flex items-center justify-center mr-3 flex-shrink-0">
                  <OptimizedImage
                    src="/optimized/doghaus.webp"
                    alt="Doghaus Montreal - Premium Pet Store Logo"
                    width={64}
                    height={64}
                    className="object-contain rounded"
                  />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold">Doghaus</h3>
                  <p className="text-gray-500 text-xs italic">Premium pet products & supplies</p>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <strong>Doghaus</strong><br />
                  5671 Rue Sherbrooke O<br />
                  Montreal, QC<br />
                  <span className="text-blue-600">(514) 483-3555</span><br />
                  <a href="https://www.doghausmtl.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-xs">Visit Website</a>
                </div>
              </div>
            </div>

            {/* KONG ANIMALERIE */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-white rounded-lg border border-gray-200 flex items-center justify-center mr-3 flex-shrink-0">
                  <OptimizedImage
                    src="/optimized/kong-animalerie.webp"
                    alt="KONG ANIMALERIE - Montreal Pet Store Logo"
                    width={64}
                    height={64}
                    className="object-contain rounded"
                  />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold">KONG ANIMALERIE</h3>
                  <p className="text-gray-500 text-xs italic">Full-service pet store</p>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <strong>KONG ANIMALERIE</strong><br />
                  5555 Bd Decarie<br />
                  Montreal, QC<br />
                  <span className="text-blue-600">(514) 662-8373</span><br />
                  <a href="https://www.facebook.com/konganimalerie/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-xs">Visit Website</a>
                </div>
              </div>
            </div>

            {/* Coquette et Finegueule */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-white rounded-lg border border-gray-200 flex items-center justify-center mr-3 flex-shrink-0">
                  <OptimizedImage
                    src="/optimized/coquette-finegueule.webp"
                    alt="Coquette et Finegueule - Pet Store with Grooming Logo"
                    width={64}
                    height={64}
                    className="object-contain rounded"
                  />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold">Coquette et Finegueule</h3>
                  <p className="text-gray-500 text-xs italic">Pet store with grooming services</p>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <strong>Coquette et Finegueule</strong><br />
                  5203 Av Bannantyne<br />
                  Verdun, QC<br />
                  <span className="text-blue-600">(514) 761-4221</span><br />
                  <a href="https://coquetteetfinegueule.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-xs">Visit Website</a>
                </div>
              </div>
            </div>

            {/* Pitou Minou & Compagnons Verdun */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-white rounded-lg border border-gray-200 flex items-center justify-center mr-3 flex-shrink-0">
                  <OptimizedImage
                    src="/optimized/pitou-minou.webp"
                    alt="Pitou Minou & Compagnons - Pet Store Logo"
                    width={64}
                    height={64}
                    className="object-contain rounded"
                  />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold">Pitou Minou & Compagnons</h3>
                  <p className="text-gray-500 text-xs italic">Global Pet Foods location</p>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <strong>Pitou Minou Verdun</strong><br />
                  4100 Rue Wellington<br />
                  Verdun, QC<br />
                  <span className="text-blue-600">(514) 732-0555</span><br />
                  <a href="https://www.pitouminou.com/en/global-pet-foods-locations-quebec/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-xs">Visit Website</a>
                </div>
              </div>
            </div>

            {/* Chico - Mont-Royal E */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-white rounded-lg border border-gray-200 flex items-center justify-center mr-3 flex-shrink-0">
                  <OptimizedImage
                    src="https://www.chico.ca/wp-content/themes/boutiquechico/img/chico.svg"
                    alt="Chico - Boutique d'animaux Logo"
                    width={64}
                    height={64}
                    className="object-contain rounded"
                  />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold">Chico - Boutique d'animaux</h3>
                  <p className="text-gray-500 text-xs italic">Premium pet boutique</p>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <strong>Chico - Mont-Royal E</strong><br />
                  2016 Avenue du Mont-Royal E<br />
                  Montreal, QC<br />
                  <span className="text-blue-600">(514) 521-0201</span><br />
                  <a href="https://www.chico.ca/boutique/chico-plateau-mont-royal-montreal/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-xs">Visit Website</a>
                </div>
              </div>
            </div>

            {/* Chico - Rue Ontario E */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-white rounded-lg border border-gray-200 flex items-center justify-center mr-3 flex-shrink-0">
                  <OptimizedImage
                    src="https://www.chico.ca/wp-content/themes/boutiquechico/img/chico.svg"
                    alt="Chico - Boutique d'animaux Logo"
                    width={64}
                    height={64}
                    className="object-contain rounded"
                  />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold">Chico - Boutique d'animaux</h3>
                  <p className="text-gray-500 text-xs italic">Premium pet boutique</p>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <strong>Chico - Rue Ontario E</strong><br />
                  3911 Rue Ontario E<br />
                  Montreal, QC<br />
                  <span className="text-blue-600">(514) 527-1371</span><br />
                  <a href="https://www.chico.ca/boutique/chico-rue-ontario-montreal/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-xs">Visit Website</a>
                </div>
              </div>
            </div>

            {/* Pattes et Griffes - Marche Centrale */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-white rounded-lg border border-gray-200 flex items-center justify-center mr-3 flex-shrink-0">
                  <OptimizedImage
                    src="https://pattesgriffes.com/static/frontend/Sm/petshop_child/fr_FR/images/fonts/logo.svg"
                    alt="Pattes et Griffes Logo"
                    width={64}
                    height={64}
                    className="object-contain rounded"
                  />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold">Pattes et Griffes</h3>
                  <p className="text-gray-500 text-xs italic">Complete pet care and supplies</p>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <strong>Pattes et Griffes - Marche Centrale</strong><br />
                  9185 Bd de l'Acadie<br />
                  Montreal, QC<br />
                  <span className="text-blue-600">(514) 389-0090</span><br />
                  <a href="https://pattesgriffes.com/storelocator.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-xs">Visit Website</a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">Can't Find Purrify at Your Local Store?</h3>
            <p className="text-yellow-700 mb-4">
              Ask your store manager to order Purrify! Many stores are happy to stock products their customers request.
            </p>
            <Link 
              href="/support/contact" 
              className="inline-block bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-700 transition-colors"
            >
              Contact Us for Store Requests
            </Link>
          </div>
        </section>

        {/* Why Choose Purrify in Montreal */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {locale === 'fr'
              ? 'Pourquoi les Propriétaires de Chats de Montréal Choisissent Purrify'
              : 'Why Montreal Cat Owners Choose Purrify | Premium Odor Control'
            }
          </h2>
          <p className="text-lg text-gray-600 text-center mb-8 max-w-4xl mx-auto">
            {locale === 'fr'
              ? 'Découvrez pourquoi des milliers de familles montréalaises font confiance à Purrify pour garder leur maison fraîche et accueillante toute l’année.'
              : 'Discover why thousands of Montreal families trust Purrify to keep their homes fresh and welcoming year-round, especially during Quebec’s long winter months.'
            }
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-blue-900 mb-3">
                {locale === 'fr' ? '🍁 Fabriqué au Canada' : '🍁 Made in Canada | Quebec Pride'}
              </h3>
              <p className="text-blue-800">
                Proudly manufactured in Canada with premium activated carbon. Supporting local business 
                while providing superior odor control for Montreal's cat families.
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-green-900 mb-3">
                {locale === 'fr' ? '❄️ Parfait pour les Hivers de Montréal' : '❄️ Perfect for Montreal Winters | Long-Lasting Freshness'}
              </h3>
              <p className="text-green-800">
                When windows stay closed during long Montreal winters, Purrify keeps your home fresh. 
                Natural odor elimination without harsh chemicals or overpowering fragrances.
              </p>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-purple-900 mb-3">
                {locale === 'fr' ? '🏠 Idéal pour les Petits Appartements' : '🏠 Ideal for Montreal Apartments | Compact Living Solutions'}
              </h3>
              <p className="text-purple-800">
                Many Montreal cat owners live in smaller spaces where litter box odors can be problematic. 
                Purrify provides powerful odor control perfect for apartments and condos.
              </p>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-orange-900 mb-3">
                {locale === 'fr' ? '🌿 Naturel et Sécuritaire' : '🌿 Natural & Safe | Family-Friendly Formula'}
              </h3>
              <p className="text-orange-800">
                Fragrance-free and non-toxic formula is safe for cats, kittens, and families. 
                No synthetic chemicals - just pure activated carbon odor elimination.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section for SEO */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {locale === 'fr' 
              ? 'Questions Fréquentes | Purrify à Montréal'
              : 'Frequently Asked Questions | Purrify in Montreal'
            }
          </h2>
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {locale === 'fr' 
                  ? 'Où puis-je acheter Purrify à Montréal?'
                  : 'Where can I buy Purrify in Montreal?'
                }
              </h3>
              <p className="text-gray-700">
                {locale === 'fr'
                  ? 'Purrify est disponible dans les animaleries indépendantes à travers Montréal, incluant des emplacements à Verdun, Kirkland, Saint-Eustache, Sainte-Thérèse, et Laval. Visitez n\'importe lequel de nos magasins partenaires listés ci-dessus ou appelez à l\'avance pour confirmer la disponibilité.'
                  : 'Purrify is available at independent pet stores throughout Montreal, including locations in Verdun, Kirkland, Saint-Eustache, Sainte-Thérèse, and Laval. Visit any of our listed partner stores above or call ahead to confirm availability at your preferred location.'
                }
              </p>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {locale === 'fr'
                  ? 'Qu\'est-ce qui rend Purrify idéal pour les propriétaires de chats de Montréal?'
                  : 'What makes Purrify ideal for Montreal cat owners?'
                }
              </h3>
              <p className="text-gray-700">
                {locale === 'fr'
                  ? 'Purrify est fabriqué au Canada avec du charbon activé premium, parfait pour les longs hivers de Montréal quand les fenêtres restent fermées. Il fournit un contrôle naturel des odeurs sans produits chimiques agressifs, idéal pour les appartements et petits espaces communs à Montréal.'
                  : 'Purrify is made in Canada with premium activated carbon, perfect for Montreal\'s long winters when windows stay closed. It provides natural odor control without harsh chemicals, ideal for apartments and small spaces common in Montreal.'
                }
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {locale === 'fr'
                  ? 'Combien coûte Purrify à Montréal?'
                  : 'How much does Purrify cost in Montreal?'
                }
              </h3>
              <p className="text-gray-700">
                {locale === 'fr'
                  ? 'Purrify est disponible en trois formats: format d\'essai de 17g pour 6,99$ CAD, format régulier de 60g pour 19,99$ CAD, et grand format de 120g pour 29,99$ CAD. Les prix peuvent varier selon le détaillant.'
                  : 'Purrify is available in three sizes: 17g trial size for $6.99 CAD, 60g regular size for $19.99 CAD, and 120g large size for $29.99 CAD. Prices may vary by retailer.'
                }
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {locale === 'fr'
                  ? 'Purrify est-il sécuritaire pour les chats et les chatons?'
                  : 'Is Purrify safe for cats and kittens?'
                }
              </h3>
              <p className="text-gray-700">
                {locale === 'fr'
                  ? 'Oui! Purrify est complètement sécuritaire pour les chats, chatons et familles. Notre formule naturelle sans parfum ne contient aucun produit chimique synthétique - seulement du charbon activé pur pour l\'élimination des odeurs.'
                  : 'Yes! Purrify is completely safe for cats, kittens, and families. Our natural, fragrance-free formula contains no synthetic chemicals - just pure activated carbon for odor elimination.'
                }
              </p>
            </div>
          </div>
        </section>

        {/* Local Testimonials */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {locale === 'fr' 
              ? 'Témoignages de Propriétaires de Chats de Montréal'
              : 'What Montreal Cat Owners Say | Customer Reviews'
            }
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <span className="font-bold text-blue-600">MF</span>
                </div>
                <div>
                  <h4 className="font-semibold">Marie Fournier</h4>
                  <p className="text-sm text-gray-600">Plateau Mont-Royal</p>
                </div>
              </div>
              <p className="text-gray-700 italic mb-3">
                "Living in a small apartment with my cat Biscuit, odor control is essential. 
                Purrify has been a game-changer - no more embarrassing smells when guests visit!"
              </p>
              <div className="text-yellow-400">★★★★★</div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <span className="font-bold text-green-600">JT</span>
                </div>
                <div>
                  <h4 className="font-semibold">Jean Tremblay</h4>
                  <p className="text-sm text-gray-600">Rosemont</p>
                </div>
              </div>
              <p className="text-gray-700 italic mb-3">
                "My two cats Pickles and Mochi love their litter box, and I love that Purrify keeps 
                our condo fresh all winter long. Found it at our local pet store - highly recommend!"
              </p>
              <div className="text-yellow-400">★★★★★</div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                  <span className="font-bold text-purple-600">SL</span>
                </div>
                <div>
                  <h4 className="font-semibold">Sophie Lavoie</h4>
                  <p className="text-sm text-gray-600">Westmount</p>
                </div>
              </div>
              <p className="text-gray-700 italic mb-3">
                "As a veterinary technician in Montreal, I recommend Purrify to all my clients. 
                It's natural, effective, and safe for cats of all ages. My own cat Noodle approves!"
              </p>
              <div className="text-yellow-400">★★★★★</div>
            </div>
          </div>
        </section>

        {/* Directions from Crescent Street */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Getting to Montreal Pet Stores
          </h2>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-8">
            <h3 className="text-xl font-semibold mb-4">From Downtown Montreal (Crescent Street Area)</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-blue-600 mb-2">To Local Pet Stores</h4>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>• Multiple independent pet stores throughout Montreal</li>
                  <li>• Call ahead to confirm Purrify availability</li>
                  <li>• Ask stores to order if not in stock</li>
                  <li>• <strong>Metro:</strong> Accessible by public transport</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-green-600 mb-2">To Independent Pet Stores</h4>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>• Visit any of the listed independent pet stores</li>
                  <li>• Call ahead to confirm Purrify availability</li>
                  <li>• Most locations accessible by public transport</li>
                  <li>• <strong>Support:</strong> Local businesses with personalized service</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Local Coverage Area */}
        <section className="mb-16 bg-gray-50 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {locale === 'fr'
              ? 'Zones de Service | Purrify dans le Grand Montréal'
              : 'Service Areas | Purrify Coverage in Greater Montreal'
            }
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="text-center">
              <h3 className="font-semibold text-lg mb-3 text-blue-900">
                {locale === 'fr' ? 'Montréal' : 'Montreal'}
              </h3>
              <ul className="text-sm space-y-1 text-gray-700">
                <li>Plateau Mont-Royal</li>
                <li>Ville-Marie</li>
                <li>Hochelaga-Maisonneuve</li>
                <li>Rosemont</li>
              </ul>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-lg mb-3 text-blue-900">Laval</h3>
              <ul className="text-sm space-y-1 text-gray-700">
                <li>Sainte-Thérèse</li>
                <li>Sainte-Marthe-sur-le-Lac</li>
                <li>Cartier Ouest</li>
                <li>Arthur-Sauvé</li>
              </ul>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-lg mb-3 text-blue-900">
                {locale === 'fr' ? 'Banlieues Sud' : 'South Shore'}
              </h3>
              <ul className="text-sm space-y-1 text-gray-700">
                <li>Verdun</li>
                <li>Saint-Eustache</li>
                <li>Westmount</li>
                <li>NDG</li>
              </ul>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-lg mb-3 text-blue-900">
                {locale === 'fr' ? 'Banlieues Ouest' : 'West Island'}
              </h3>
              <ul className="text-sm space-y-1 text-gray-700">
                <li>Kirkland</li>
                <li>Dollard-des-Ormeaux</li>
                <li>Pierrefonds</li>
                <li>Beaconsfield</li>
              </ul>
            </div>
          </div>
          <p className="text-center text-gray-600 mt-6 max-w-3xl mx-auto">
            {locale === 'fr'
              ? 'Purrify dessert fièrement toute la région métropolitaine de Montréal. Si vous ne voyez pas votre quartier listé, contactez-nous pour connaître le magasin le plus près de chez vous.'
              : 'Purrify proudly serves the entire Greater Montreal metropolitan area. If you don\'t see your neighborhood listed, contact us to find the nearest store location to you.'
            }
          </p>
        </section>

        {/* Product Information */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {locale === 'fr'
              ? 'Produits Purrify Disponibles à Montréal | Prix et Formats'
              : 'Purrify Products Available in Montreal | Sizes and Pricing'
            }
          </h2>
          <p className="text-lg text-gray-600 text-center mb-8 max-w-4xl mx-auto">
            {locale === 'fr'
              ? 'Choisissez le format parfait pour votre famille de chats. Tous les produits Purrify sont disponibles dans nos magasins partenaires à travers Montréal.'
              : 'Choose the perfect size for your cat family. All Purrify products are available at our partner stores throughout Montreal.'
            }
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center shadow-sm">
              <h3 className="text-xl font-semibold mb-3">17g Trial Size</h3>
              <div className="text-3xl font-bold text-blue-600 mb-2">$6.99 CAD</div>
              <p className="text-gray-600 mb-4">Perfect for trying Purrify or travel</p>
              <ul className="text-sm text-gray-700 text-left space-y-1 mb-4">
                <li>• 2-3 weeks of odor control</li>
                <li>• Ideal for 1 cat household</li>
                <li>• Risk-free trial size</li>
              </ul>
            </div>

            <div className="bg-blue-50 border border-blue-300 rounded-lg p-6 text-center shadow-sm relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </div>
              <h3 className="text-xl font-semibold mb-3">60g Regular Size</h3>
              <div className="text-3xl font-bold text-blue-600 mb-2">$19.99 CAD</div>
              <p className="text-gray-600 mb-4">Best value for most cat owners</p>
              <ul className="text-sm text-gray-700 text-left space-y-1 mb-4">
                <li>• 6-8 weeks of odor control</li>
                <li>• Perfect for 1-2 cats</li>
                <li>• Most economical choice</li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center shadow-sm">
              <h3 className="text-xl font-semibold mb-3">120g Large Size</h3>
              <div className="text-3xl font-bold text-blue-600 mb-2">$29.99 CAD</div>
              <p className="text-gray-600 mb-4">Maximum value for multi-cat homes</p>
              <ul className="text-sm text-gray-700 text-left space-y-1 mb-4">
                <li>• 10-12 weeks of odor control</li>
                <li>• Great for 2+ cats</li>
                <li>• Best long-term value</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Montreal Summary for SEO */}
        <section className="mb-16 bg-blue-50 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            {locale === 'fr'
              ? 'Purrify Montréal : Contrôle d\'Odeur Premium pour Chats'
              : 'Purrify Montreal: Premium Cat Odor Control Made in Canada'
            }
          </h2>
          <div className="max-w-4xl mx-auto text-gray-700 space-y-4">
            <p className="text-lg">
              {locale === 'fr'
                ? 'Purrify révolutionne le contrôle des odeurs de litière pour chat à Montréal avec son charbon activé premium fabriqué au Canada. Nos 15 magasins partenaires à travers la région métropolitaine offrent des solutions naturelles et sécuritaires pour garder votre maison fraîche pendant les longs hivers québécois.'
                : 'Purrify is revolutionizing cat litter odor control in Montreal with premium activated carbon made in Canada. Our 15 partner stores across the metropolitan area offer natural, safe solutions to keep your home fresh during Quebec\'s long winters.'
              }
            </p>
            <p>
              {locale === 'fr'
                ? 'Que vous viviez dans un appartement du Plateau Mont-Royal, un condo à Verdun, ou une maison à Kirkland, Purrify s\'adapte parfaitement aux espaces de vie montréalais. Notre formule sans parfum élimine naturellement les odeurs sans produits chimiques agressifs.'
                : 'Whether you live in a Plateau Mont-Royal apartment, a Verdun condo, or a Kirkland house, Purrify is perfectly suited for Montreal living spaces. Our fragrance-free formula naturally eliminates odors without harsh chemicals.'
              }
            </p>
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="text-center p-4 bg-white rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">
                  {locale === 'fr' ? '15+ Magasins' : '15+ Store Locations'}
                </h4>
                <p className="text-sm">
                  {locale === 'fr' ? 'À travers le Grand Montréal' : 'Across Greater Montreal'}
                </p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">
                  {locale === 'fr' ? '100% Canadien' : '100% Canadian Made'}
                </h4>
                <p className="text-sm">
                  {locale === 'fr' ? 'Charbon activé premium' : 'Premium activated carbon'}
                </p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">
                  {locale === 'fr' ? '3 Formats' : '3 Size Options'}
                </h4>
                <p className="text-sm">
                  {locale === 'fr' ? 'De 6,99$ à 29,99$ CAD' : 'From $6.99 to $29.99 CAD'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {locale === 'fr'
                ? 'Visitez Votre Animalerie Locale à Montréal Aujourd\'hui'
                : 'Visit Your Local Montreal Pet Store Today'
              }
            </h2>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              {locale === 'fr'
                ? 'Découvrez la différence que Purrify fait dans votre maison. Disponible maintenant dans les animaleries indépendantes à travers la région du Grand Montréal.'
                : 'Experience the difference Purrify makes in your home. Available now at independent pet stores throughout the Greater Montreal Area.'
              }
            </p>
            <div className="space-x-4">
              <Link 
                href="/support/contact" 
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                {locale === 'fr' ? 'Trouver le Magasin le Plus Près' : 'Find Nearest Store'}
              </Link>
              <Link 
                href="/products" 
                className="inline-block border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                {locale === 'fr' ? 'Voir Tous les Produits' : 'View All Products'}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
