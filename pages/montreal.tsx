import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { OptimizedImage } from '../src/components/performance/OptimizedImage';
import { MONTREAL_STRUCTURED_DATA } from '../src/lib/montreal-seo-config';
import { useTranslation } from '../src/lib/translation-context';

export default function Montreal() {
  const { locale } = useTranslation();
  
  const pageTitle = locale === 'fr' 
    ? 'Désodorisant Litière Chat Montréal - Où Acheter Purrify Québec'
    : 'Cat Litter Deodorizer Montreal Stores - Where to Buy Purrify Canada';
    
  const pageDescription = locale === 'fr'
    ? 'Trouvez le désodorisant pour litière de chat Purrify dans les boutiques d\'animaux indépendantes de Montréal. Charbon activé premium fabriqué au Canada. Emplacements, directions, prix.'
    : 'Find Purrify cat litter deodorizer at independent pet stores throughout Montreal. Premium activated carbon odor eliminator made in Canada. Store locations, directions, and pricing.';
    
  const canonicalUrl = `https://www.purrify.ca/${locale === 'fr' ? 'fr/' : ''}montreal`;

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
    <>
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
              url: 'https://www.purrify.ca/optimized/kong-animalerie.webp',
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
            content: 'https://www.purrify.ca/optimized/kong-animalerie.webp'
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

      <div className="max-w-6xl mx-auto px-4 py-12 bg-white dark:bg-gray-900 min-h-screen">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {locale === 'fr' 
              ? 'Désodorisant pour Litière de Chat Montréal | Purrify Canada' 
              : 'Cat Litter Deodorizer Montreal | Where to Buy Purrify in Quebec'
            }
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            {locale === 'fr'
              ? 'Découvrez Purrify, l’additif au charbon activé premium pour litière de chat. Contrôle naturel des odeurs fabriqué au Canada, disponible dans les animaleries de Montréal et région.'
              : 'Discover Purrify’s premium activated carbon cat litter additive at Montreal area pet stores. Natural odor control made in Canada, available throughout Greater Montreal, Laval, and surrounding communities.'
            }
          </p>
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-blue-900 dark:text-blue-100 mb-3">
              {locale === 'fr' ? 'Maintenant Disponible à Montréal!' : 'Now Available in Montreal & Surrounding Areas!'}
            </h2>
            <p className="text-blue-800 dark:text-blue-200">
              {locale === 'fr'
                ? 'Visitez votre animalerie locale indépendante pour trouver Purrify. Appelez à l’avance pour confirmer la disponibilité dans votre magasin préféré.'
                : 'Visit your local independent pet store to find Purrify. Call ahead to confirm availability at your preferred location in Montreal, Laval, Verdun, or surrounding areas.'
              }
            </p>
          </div>
        </section>

        {/* Store Locations */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            {locale === 'fr' 
              ? 'Où Acheter Purrify dans la Région de Montréal | Magasins Partenaires'
              : 'Where to Buy Purrify in Montreal Area | Pet Store Locations'
            }
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 text-center mb-8 max-w-4xl mx-auto">
            {locale === 'fr'
              ? 'Trouvez Purrify dans ces animaleries de confiance à travers Montréal, Laval, Verdun et les communautés avoisinantes. Chaque magasin offre un service personnalisé et des conseils d’experts pour vos animaux de compagnie.'
              : 'Find Purrify at these trusted pet stores across Montreal, Laval, Verdun, and surrounding communities. Each location offers personalized service and expert advice for your pets.'
            }
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
            {/* Pattes et Griffes - Sainte-Thérèse */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-white dark:bg-gray-900 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <OptimizedImage
                    src="https://pattesgriffes.com/static/frontend/Sm/petshop_child/fr_FR/images/fonts/logo.svg"
                    alt="Pattes et Griffes Logo"
                    width={56}
                    height={56}
                    className="w-14 h-14 object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold">Pattes et Griffes</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-xs italic">{locale === 'fr' ? 'Soins et fournitures complètes pour animaux' : 'Complete pet care and supplies'}</p>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <strong>Pattes et Griffes (Sainte‑Thérèse)</strong><br />
                  190 Bd du Curé‑Labelle, suite 1B<br />
                  Sainte‑Thérèse, QC J7E 2X5<br />
                  <span className="text-blue-600 dark:text-blue-400">(450) 818-1310</span><br />
                  <a href="https://pattesgriffes.com/storelocator.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline text-xs">{locale === 'fr' ? 'Visiter le Site Web' : 'Visit Website'}</a>
                </div>
              </div>
            </div>

            {/* Chico - Sainte-Thérèse */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center mr-3 flex-shrink-0">
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
                  <p className="text-gray-500 dark:text-gray-400 text-xs italic">{locale === 'fr' ? 'Boutique premium pour animaux' : 'Premium pet boutique'}</p>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <strong>Chico (Sainte‑Thérèse)</strong><br />
                  95 Bd du Curé‑Labelle, suite 8<br />
                  Sainte‑Thérèse, QC J7E 2X5<br />
                  <span className="text-blue-600 dark:text-blue-400">(450) 965-3906</span><br />
                  <a href="https://www.chico.ca/boutique/chico-sainte-therese/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline text-xs">{locale === 'fr' ? 'Visiter le Site Web' : 'Visit Website'}</a>
                </div>
              </div>
            </div>

            {/* Chico - Sainte-Marthe-sur-le-Lac */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center mr-3 flex-shrink-0">
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
                  <p className="text-gray-500 dark:text-gray-400 text-xs italic">{locale === 'fr' ? 'Boutique premium pour animaux' : 'Premium pet boutique'}</p>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <strong>Chico (Sainte‑Marthe‑sur‑le‑Lac)</strong><br />
                  2860 Boul. des Promenades<br />
                  Sainte‑Marthe‑sur‑le‑Lac, QC J0N 1P0<br />
                  <span className="text-blue-600 dark:text-blue-400">(450) 598-2860</span><br />
                  <a href="https://www.chico.ca/boutique/chico-ste-marthe/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline text-xs">{locale === 'fr' ? 'Visiter le Site Web' : 'Visit Website'}</a>
                </div>
              </div>
            </div>

            {/* Animal Shop GIGI */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center mr-3 flex-shrink-0">
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
                  <p className="text-gray-500 dark:text-gray-400 text-xs italic">{locale === 'fr' ? 'Animalerie familiale' : 'Family-owned pet store'}</p>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <strong>Animal Shop GIGI</strong><br />
                  356 Bd Arthur‑Sauvé<br />
                  Saint‑Eustache, QC J7P 2A3<br />
                  <span className="text-blue-600 dark:text-blue-400">(450) 598-3444</span><br />
                  <a href="https://www.animaleriegigi.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline text-xs">{locale === 'fr' ? 'Visiter le Site Web' : 'Visit Website'}</a>
                </div>
              </div>
            </div>

            {/* Chico - Laval */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center mr-3 flex-shrink-0">
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
                  <p className="text-gray-500 dark:text-gray-400 text-xs italic">{locale === 'fr' ? 'Boutique premium pour animaux' : 'Premium pet boutique'}</p>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <strong>Chico (Laval)</strong><br />
                  4511 Bd Arthur‑Sauvé<br />
                  Laval, QC H7R 3X1<br />
                  <span className="text-blue-600 dark:text-blue-400">(450) 314-2442</span><br />
                  <a href="https://www.chico.ca/boutique/chico-laval-ouest/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline text-xs">{locale === 'fr' ? 'Visiter le Site Web' : 'Visit Website'}</a>
                </div>
              </div>
            </div>

            {/* Pattes et Griffes - Cartier Ouest */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-white dark:bg-gray-900 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <OptimizedImage
                    src="https://pattesgriffes.com/static/frontend/Sm/petshop_child/fr_FR/images/fonts/logo.svg"
                    alt="Pattes et Griffes Logo"
                    width={56}
                    height={56}
                    className="w-14 h-14 object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold">Pattes et Griffes</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-xs italic">{locale === 'fr' ? 'Soins et fournitures complètes pour animaux' : 'Complete pet care and supplies'}</p>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <strong>Pattes et Griffes (Laval)</strong><br />
                  293 Bd Cartier Ouest<br />
                  Laval, QC H7N 2K3<br />
                  <span className="text-blue-600 dark:text-blue-400">(450) 490-1414</span><br />
                  <a href="https://pattesgriffes.com/storelocator.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline text-xs">{locale === 'fr' ? 'Visiter le Site Web' : 'Visit Website'}</a>
                </div>
              </div>
            </div>

            {/* Pitou Minou & Compagnons Kirkland */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center mr-3 flex-shrink-0">
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
                  <p className="text-gray-500 dark:text-gray-400 text-xs italic">{locale === 'fr' ? 'Succursale Global Pet Foods' : 'Global Pet Foods location'}</p>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <strong>Pitou Minou & Compagnons (Kirkland)</strong><br />
                  16936 Route Transcanadienne<br />
                  Kirkland, QC H9H 5J1<br />
                  <span className="text-blue-600 dark:text-blue-400">(514) 695-5005</span><br />
                  <a href="https://pitou-minou.ca/en/global-pet-foods-locations-quebec/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline text-xs">{locale === 'fr' ? 'Visiter le Site Web' : 'Visit Website'}</a>
                </div>
              </div>
            </div>

            {/* Chico - Boul. St-Laurent (Montreal) */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center mr-3 flex-shrink-0">
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
                  <p className="text-gray-500 dark:text-gray-400 text-xs italic">{locale === 'fr' ? 'Boutique premium pour animaux' : 'Premium pet boutique'}</p>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <strong>Chico (Saint‑Laurent)</strong><br />
                  7001 Boul. Saint‑Laurent<br />
                  Montreal, QC H2S 3E3<br />
                  <span className="text-blue-600 dark:text-blue-400">(514) 657-5813</span><br />
                  <a href="https://www.chico.ca/boutique/chico-boul-st-laurent-montreal/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline text-xs">{locale === 'fr' ? 'Visiter le Site Web' : 'Visit Website'}</a>
                </div>
              </div>
            </div>

            {/* Doghaus */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center mr-3 flex-shrink-0">
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
                  <p className="text-gray-500 dark:text-gray-400 text-xs italic">Premium pet products & supplies</p>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <strong>Doghaus</strong><br />
                  5671 Rue Sherbrooke Ouest<br />
                  Montreal, QC H4A 1W6<br />
                  <span className="text-blue-600 dark:text-blue-400">(514) 483-3555</span><br />
                  <a href="https://www.doghausmtl.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline text-xs">{locale === 'fr' ? 'Visiter le Site Web' : 'Visit Website'}</a>
                </div>
              </div>
            </div>

            {/* KONG ANIMALERIE */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center mr-3 flex-shrink-0">
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
                  <p className="text-gray-500 dark:text-gray-400 text-xs italic">{locale === 'fr' ? 'Animalerie à service complet' : 'Full-service pet store'}</p>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <strong>Kong Animalerie</strong><br />
                  5555 Bd Décarie<br />
                  Montreal, QC H3W 3H8<br />
                  <span className="text-blue-600 dark:text-blue-400">(514) 662-8373</span><br />
                  <a href="https://www.facebook.com/konganimalerie/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline text-xs">{locale === 'fr' ? 'Visiter le Site Web' : 'Visit Website'}</a>
                </div>
              </div>
            </div>

            {/* Coquette et Finegueule */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center mr-3 flex-shrink-0">
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
                  <p className="text-gray-500 dark:text-gray-400 text-xs italic">{locale === 'fr' ? 'Animalerie avec services de toilettage' : 'Pet store with grooming services'}</p>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <strong>Coquette et Finegueule</strong><br />
                  5203 Avenue Bannantyne<br />
                  Verdun, QC H4H 1E1<br />
                  <span className="text-blue-600 dark:text-blue-400">(514) 761-4221</span><br />
                  <a href="https://coquetteetfinegueule.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline text-xs">{locale === 'fr' ? 'Visiter le Site Web' : 'Visit Website'}</a>
                </div>
              </div>
            </div>

            {/* Pitou Minou & Compagnons Verdun */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center mr-3 flex-shrink-0">
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
                  <p className="text-gray-500 dark:text-gray-400 text-xs italic">{locale === 'fr' ? 'Succursale Global Pet Foods' : 'Global Pet Foods location'}</p>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <strong>Pitou Minou Verdun</strong><br />
                  4100 Rue Wellington<br />
                  Verdun, QC H4G 1V7<br />
                  <span className="text-blue-600 dark:text-blue-400">(514) 732-0555</span><br />
                  <a href="https://www.pitouminou.com/en/global-pet-foods-locations-quebec/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline text-xs">{locale === 'fr' ? 'Visiter le Site Web' : 'Visit Website'}</a>
                </div>
              </div>
            </div>

            {/* Chico - Mont-Royal E */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center mr-3 flex-shrink-0">
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
                  <p className="text-gray-500 dark:text-gray-400 text-xs italic">{locale === 'fr' ? 'Boutique premium pour animaux' : 'Premium pet boutique'}</p>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <strong>Chico (Plateau Mont‑Royal)</strong><br />
                  2016 Avenue du Mont‑Royal Est<br />
                  Montreal, QC H2H 1J8<br />
                  <span className="text-blue-600 dark:text-blue-400">(514) 521-0201</span><br />
                  <a href="https://www.chico.ca/boutique/chico-plateau-mont-royal-montreal/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline text-xs">{locale === 'fr' ? 'Visiter le Site Web' : 'Visit Website'}</a>
                </div>
              </div>
            </div>

            {/* Chico - Rue Ontario E */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center mr-3 flex-shrink-0">
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
                  <p className="text-gray-500 dark:text-gray-400 text-xs italic">{locale === 'fr' ? 'Boutique premium pour animaux' : 'Premium pet boutique'}</p>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <strong>Chico (Hochelaga‑Maisonneuve)</strong><br />
                  3911 Rue Ontario Est<br />
                  Montreal, QC H1W 1S5<br />
                  <span className="text-blue-600 dark:text-blue-400">(514) 527-1371</span><br />
                  <a href="https://www.chico.ca/boutique/chico-rue-ontario-montreal/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline text-xs">{locale === 'fr' ? 'Visiter le Site Web' : 'Visit Website'}</a>
                </div>
              </div>
            </div>

            {/* Pattes et Griffes - Marche Centrale */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-white dark:bg-gray-900 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <OptimizedImage
                    src="https://pattesgriffes.com/static/frontend/Sm/petshop_child/fr_FR/images/fonts/logo.svg"
                    alt="Pattes et Griffes Logo"
                    width={56}
                    height={56}
                    className="w-14 h-14 object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold">Pattes et Griffes</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-xs italic">{locale === 'fr' ? 'Soins et fournitures complètes pour animaux' : 'Complete pet care and supplies'}</p>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <strong>Pattes et Griffes (Marché Central)</strong><br />
                  9185 Bd de l'Acadie<br />
                  Montreal, QC H4N 3C5<br />
                  <span className="text-blue-600 dark:text-blue-400">(514) 389-0090</span><br />
                  <a href="https://pattesgriffes.com/storelocator.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline text-xs">{locale === 'fr' ? 'Visiter le Site Web' : 'Visit Website'}</a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 dark:text-yellow-100 mb-2">
              {locale === 'fr' 
                ? 'Vous ne trouvez pas Purrify dans votre magasin local?'
                : 'Can\'t Find Purrify at Your Local Store?'
              }
            </h3>
            <p className="text-yellow-700 dark:text-yellow-200 mb-4">
              {locale === 'fr'
                ? 'Demandez à votre gérant de magasin de commander Purrify! Plusieurs magasins sont heureux de stocker des produits que leurs clients demandent.'
                : 'Ask your store manager to order Purrify! Many stores are happy to stock products their customers request.'
              }
            </p>
            <Link 
              href="/support/contact" 
              className="inline-block bg-yellow-600 text-white dark:text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-700 transition-colors"
            >
              {locale === 'fr'
                ? 'Contactez-nous pour Demandes de Magasin'
                : 'Contact Us for Store Requests'
              }
            </Link>
          </div>
        </section>

        {/* Why Choose Purrify in Montreal */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            {locale === 'fr'
              ? 'Pourquoi les Propriétaires de Chats de Montréal Choisissent Purrify'
              : 'Why Montreal Cat Owners Choose Purrify | Premium Odor Control'
            }
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 text-center mb-8 max-w-4xl mx-auto">
            {locale === 'fr'
              ? 'Découvrez pourquoi plus de 1 000 familles montréalaises font confiance à Purrify pour garder leur maison fraîche et accueillante toute l’année.'
              : 'Discover why 1,000+ Montreal families trust Purrify to keep their homes fresh and welcoming year-round, especially during Quebec’s long winter months.'
            }
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-3">
                {locale === 'fr' ? '🍁 Fabriqué au Canada' : '🍁 Made in Canada | Quebec Pride'}
              </h3>
              <p className="text-blue-800 dark:text-blue-200">
                Proudly manufactured in Canada with premium activated carbon. Supporting local business 
                while providing superior odor control for Montreal's cat families.
              </p>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-green-900 dark:text-green-100 mb-3">
                {locale === 'fr' ? '❄️ Parfait pour les Hivers de Montréal' : '❄️ Perfect for Montreal Winters | Long-Lasting Freshness'}
              </h3>
              <p className="text-green-800 dark:text-green-200">
                When windows stay closed during long Montreal winters, Purrify keeps your home fresh. 
                Natural odor elimination without harsh chemicals or overpowering fragrances.
              </p>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-purple-900 dark:text-purple-100 mb-3">
                {locale === 'fr' ? '🏠 Idéal pour les Petits Appartements' : '🏠 Ideal for Montreal Apartments | Compact Living Solutions'}
              </h3>
              <p className="text-purple-800 dark:text-purple-200">
                Many Montreal cat owners live in smaller spaces where litter box odors can be problematic. 
                Purrify provides powerful odor control perfect for apartments and condos.
              </p>
            </div>

            <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-orange-900 dark:text-orange-100 mb-3">
                {locale === 'fr' ? '🌿 Naturel & Sans Parfum' : '🌿 Natural & Fragrance-Free | Family-Friendly Formula'}
              </h3>
              <p className="text-orange-800 dark:text-orange-200">
                Fragrance-free formula that uses the same type of activated carbon found in many water and air filters. 
                No added fragrances or dyes — just activated carbon odor elimination.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section for SEO */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            {locale === 'fr' 
              ? 'Questions Fréquentes | Purrify à Montréal'
              : 'Frequently Asked Questions | Purrify in Montreal'
            }
          </h2>
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                {locale === 'fr' 
                  ? 'Où puis-je acheter Purrify à Montréal?'
                  : 'Where can I buy Purrify in Montreal?'
                }
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                {locale === 'fr'
                  ? 'Purrify est disponible dans les animaleries indépendantes à travers Montréal, incluant des emplacements à Verdun, Kirkland, Saint-Eustache, Sainte-Thérèse, et Laval. Visitez n\'importe lequel de nos magasins partenaires listés ci-dessus ou appelez à l\'avance pour confirmer la disponibilité.'
                  : 'Purrify is available at independent pet stores throughout Montreal, including locations in Verdun, Kirkland, Saint-Eustache, Sainte-Thérèse, and Laval. Visit any of our listed partner stores above or call ahead to confirm availability at your preferred location.'
                }
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                {locale === 'fr'
                  ? 'Qu\'est-ce qui rend Purrify idéal pour les propriétaires de chats de Montréal?'
                  : 'What makes Purrify ideal for Montreal cat owners?'
                }
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                {locale === 'fr'
                  ? 'Purrify est fabriqué au Canada avec du charbon activé premium, parfait pour les longs hivers de Montréal quand les fenêtres restent fermées. Il fournit un contrôle naturel des odeurs sans produits chimiques agressifs, idéal pour les appartements et petits espaces communs à Montréal.'
                  : 'Purrify is made in Canada with premium activated carbon, perfect for Montreal\'s long winters when windows stay closed. It provides natural odor control without harsh chemicals, ideal for apartments and small spaces common in Montreal.'
                }
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                {locale === 'fr'
                  ? 'Combien coûte Purrify à Montréal?'
                  : 'How much does Purrify cost in Montreal?'
                }
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                {locale === 'fr'
                  ? 'Purrify est disponible en trois formats: format d\'essai de 17g pour 6,99$ CAD, format régulier de 60g pour 19,99$ CAD, et grand format de 120g pour 29,99$ CAD. Les prix peuvent varier selon le détaillant.'
                  : 'Purrify is available in three sizes: 17g trial size for $6.99 CAD, 60g regular size for $19.99 CAD, and 120g large size for $29.99 CAD. Prices may vary by retailer.'
                }
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                {locale === 'fr'
                  ? 'Peut-on utiliser Purrify près des chats et des chatons?'
                  : 'Can Purrify be used around cats and kittens?'
                }
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                {locale === 'fr'
                  ? 'Purrify utilise le même type de charbon activé qu\'on trouve couramment dans les filtres à eau et à air domestiques et ne contient aucun parfum ni colorant ajouté.'
                  : 'Purrify uses the same type of activated carbon commonly found in household water and air filters and contains no added fragrances or dyes.'
                }
              </p>
            </div>
          </div>
        </section>

        {/* Local Testimonials */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            {locale === 'fr' 
              ? 'Témoignages de Propriétaires de Chats de Montréal'
              : 'What Montreal Cat Owners Say | Customer Reviews'
            }
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <span className="font-bold text-blue-600 dark:text-blue-400 dark:text-blue-400">MF</span>
                </div>
                <div>
                  <h4 className="font-semibold">Marie Fournier</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Plateau Mont-Royal</p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 italic mb-3">
                {locale === 'fr'
                  ? '"Vivant dans un petit appartement avec mon chat Biscuit, le contrôle des odeurs est essentiel. Purrify a été révolutionnaire - plus d\'odeurs embarrassantes quand les invités arrivent!"'
                  : '"Living in a small apartment with my cat Biscuit, odor control is essential. Purrify has been a game-changer - no more embarrassing smells when guests visit!"'
                }
              </p>
              <div className="text-yellow-400 dark:text-yellow-300">★★★★★</div>
            </div>

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <span className="font-bold text-green-600 dark:text-green-400 dark:text-green-400">JT</span>
                </div>
                <div>
                  <h4 className="font-semibold">Jean Tremblay</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Rosemont</p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 italic mb-3">
                {locale === 'fr'
                  ? '"Mes deux chats Cornichon et Mochi adorent leur litière, et j\'adore que Purrify garde notre condo frais tout l\'hiver. Trouvé dans notre animalerie locale - je le recommande fortement!"'
                  : '"My two cats Pickles and Mochi love their litter box, and I love that Purrify keeps our condo fresh all winter long. Found it at our local pet store - highly recommend!"'
                }
              </p>
              <div className="text-yellow-400 dark:text-yellow-300">★★★★★</div>
            </div>

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                  <span className="font-bold text-purple-600 dark:text-purple-400">SL</span>
                </div>
                <div>
                  <h4 className="font-semibold">Sophie Lavoie</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Westmount</p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 italic mb-3">
                {locale === 'fr'
                  ? '"En tant que technicienne vétérinaire à Montréal, je recommande Purrify à mes clients. C\'est naturel, efficace et sans parfum — mon propre chat Nouille approuve!"'
                  : '"As a veterinary technician in Montreal, I recommend Purrify to my clients. It\'s natural, effective, and fragrance-free — my own cat Noodle approves!"'
                }
              </p>
              <div className="text-yellow-400 dark:text-yellow-300">★★★★★</div>
            </div>
          </div>
        </section>

        {/* Directions from Crescent Street */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            {locale === 'fr'
              ? 'Se Rendre aux Animaleries de Montréal'
              : 'Getting to Montreal Pet Stores'
            }
          </h2>
          
          <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-8">
            <h3 className="text-xl font-semibold mb-4">
              {locale === 'fr' 
                ? 'Depuis le centre-ville de Montréal (secteur rue Crescent)'
                : 'From Downtown Montreal (Crescent Street Area)'
              }
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-blue-600 dark:text-blue-400 dark:text-blue-400 mb-2">
                  {locale === 'fr' ? 'Vers les Animaleries Locales' : 'To Local Pet Stores'}
                </h4>
                <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-200 dark:text-gray-300">
                  <li>
                    {locale === 'fr' 
                      ? '• Multiples animaleries indépendantes à travers Montréal'
                      : '• Multiple independent pet stores throughout Montreal'
                    }
                  </li>
                  <li>
                    {locale === 'fr'
                      ? '• Appelez à l\'avance pour confirmer la disponibilité de Purrify'
                      : '• Call ahead to confirm Purrify availability'
                    }
                  </li>
                  <li>
                    {locale === 'fr'
                      ? '• Demandez aux magasins de commander si pas en stock'
                      : '• Ask stores to order if not in stock'
                    }
                  </li>
                  <li>
                    <strong>{locale === 'fr' ? 'Métro:' : 'Metro:'}</strong>
                    {' '}
                    {locale === 'fr'
                      ? 'Accessible par transport en commun'
                      : 'Accessible by public transport'
                    }
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-green-600 dark:text-green-400 dark:text-green-400 mb-2">
                  {locale === 'fr' ? 'Vers les Animaleries Indépendantes' : 'To Independent Pet Stores'}
                </h4>
                <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-200 dark:text-gray-300">
                  <li>
                    {locale === 'fr'
                      ? '• Visitez n\'importe laquelle des animaleries indépendantes listées'
                      : '• Visit any of the listed independent pet stores'
                    }
                  </li>
                  <li>
                    {locale === 'fr'
                      ? '• Appelez à l\'avance pour confirmer la disponibilité de Purrify'
                      : '• Call ahead to confirm Purrify availability'
                    }
                  </li>
                  <li>
                    {locale === 'fr'
                      ? '• La plupart des emplacements accessibles par transport en commun'
                      : '• Most locations accessible by public transport'
                    }
                  </li>
                  <li>
                    <strong>{locale === 'fr' ? 'Soutien:' : 'Support:'}</strong>
                    {' '}
                    {locale === 'fr'
                      ? 'Entreprises locales avec service personnalisé'
                      : 'Local businesses with personalized service'
                    }
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Local Coverage Area */}
        <section className="mb-16 bg-gray-50 dark:bg-gray-900 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            {locale === 'fr'
              ? 'Zones de Service | Purrify dans le Grand Montréal'
              : 'Service Areas | Purrify Coverage in Greater Montreal'
            }
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="text-center">
              <h3 className="font-semibold text-lg mb-3 text-blue-900 dark:text-blue-100">
                {locale === 'fr' ? 'Montréal' : 'Montreal'}
              </h3>
              <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-200 dark:text-gray-300">
                <li>Plateau Mont-Royal</li>
                <li>Ville-Marie</li>
                <li>Hochelaga-Maisonneuve</li>
                <li>Rosemont</li>
              </ul>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-lg mb-3 text-blue-900 dark:text-blue-100">Laval</h3>
              <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-200 dark:text-gray-300">
                <li>Sainte-Thérèse</li>
                <li>Sainte-Marthe-sur-le-Lac</li>
                <li>Cartier Ouest</li>
                <li>Arthur-Sauvé</li>
              </ul>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-lg mb-3 text-blue-900 dark:text-blue-100">
                {locale === 'fr' ? 'Banlieues Sud' : 'South Shore'}
              </h3>
              <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-200 dark:text-gray-300">
                <li>Verdun</li>
                <li>Saint-Eustache</li>
                <li>Westmount</li>
                <li>NDG</li>
              </ul>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-lg mb-3 text-blue-900 dark:text-blue-100">
                {locale === 'fr' ? 'Banlieues Ouest' : 'West Island'}
              </h3>
              <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-200 dark:text-gray-300">
                <li>Kirkland</li>
                <li>Dollard-des-Ormeaux</li>
                <li>Pierrefonds</li>
                <li>Beaconsfield</li>
              </ul>
            </div>
          </div>
          <p className="text-center text-gray-600 dark:text-gray-300 mt-6 max-w-3xl mx-auto">
            {locale === 'fr'
              ? 'Purrify dessert fièrement toute la région métropolitaine de Montréal. Si vous ne voyez pas votre quartier listé, contactez-nous pour connaître le magasin le plus près de chez vous.'
              : 'Purrify proudly serves the entire Greater Montreal metropolitan area. If you don\'t see your neighborhood listed, contact us to find the nearest store location to you.'
            }
          </p>
        </section>

        {/* Montreal Area Map for SEO */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            {locale === 'fr'
              ? 'Région de Service | Carte de Montréal et Environs'
              : 'Service Area | Montreal and Surrounding Regions Map'
            }
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 text-center mb-8 max-w-4xl mx-auto">
            {locale === 'fr'
              ? 'Purrify dessert toute la région métropolitaine de Montréal, incluant Laval, la Rive-Sud, et les communautés environnantes. Trouvez un magasin près de chez vous.'
              : 'Purrify serves the entire Greater Montreal metropolitan area, including Laval, South Shore, and surrounding communities. Find a store near you.'
            }
          </p>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d179885.84065830146!2d-73.85493127969524!3d45.50166742063907!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc91a541c64b70d%3A0x654e3138211fefef!2sMontreal%2C%20QC!5e0!3m2!1sen!2sca!4v1704067200000!5m2!1sen!2sca"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={locale === 'fr' ? 'Carte de Montréal - Zone de Service Purrify' : 'Montreal Map - Purrify Service Area'}
                className="rounded-lg"
              />
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {locale === 'fr'
                    ? '🗺️ Région de service Purrify: Montréal, Laval, Longueuil, et communautés environnantes'
                    : '🗺️ Purrify service area: Montreal, Laval, Longueuil, and surrounding communities'
                  }
                </p>
                <div className="flex flex-wrap justify-center gap-2 mt-2 text-xs text-gray-500 dark:text-gray-400">
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 rounded">
                    {locale === 'fr' ? 'Montréal' : 'Montreal'}
                  </span>
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 rounded">Laval</span>
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 rounded">Longueuil</span>
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 rounded">Kirkland</span>
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 rounded">Verdun</span>
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 rounded">
                    {locale === 'fr' ? 'Sainte-Thérèse' : 'Sainte-Thérèse'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Information */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            {locale === 'fr'
              ? 'Produits Purrify Disponibles à Montréal | Prix et Formats'
              : 'Purrify Products Available in Montreal | Sizes and Pricing'
            }
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 text-center mb-8 max-w-4xl mx-auto">
            {locale === 'fr'
              ? 'Choisissez le format parfait pour votre famille de chats. Tous les produits Purrify sont disponibles dans nos magasins partenaires à travers Montréal.'
              : 'Choose the perfect size for your cat family. All Purrify products are available at our partner stores throughout Montreal.'
            }
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 text-center shadow-sm">
              <h3 className="text-xl font-semibold mb-3">
                {locale === 'fr' ? 'Format d\'Essai 17g' : '17g Trial Size'}
              </h3>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 dark:text-blue-400 mb-2">
                {locale === 'fr' ? '6,99$ CAD' : '$6.99 CAD'}
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {locale === 'fr' ? 'Parfait pour essayer Purrify ou voyager' : 'Perfect for trying Purrify or travel'}
              </p>
              <ul className="text-sm text-gray-700 dark:text-gray-200 dark:text-gray-300 text-left space-y-1 mb-4">
                <li>
                  {locale === 'fr' ? '• 2-3 semaines de contrôle des odeurs' : '• 2-3 weeks of odor control'}
                </li>
                <li>
                  {locale === 'fr' ? '• Idéal pour foyer à 1 chat' : '• Ideal for 1 cat household'}
                </li>
                <li>
                  {locale === 'fr' ? '• Format d\'essai sans risque' : '• Risk-free trial size'}
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-300 rounded-lg p-6 text-center shadow-sm relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white dark:text-white px-3 py-1 rounded-full text-sm font-semibold">
                {locale === 'fr' ? 'Plus Populaire' : 'Most Popular'}
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {locale === 'fr' ? 'Format Régulier 60g' : '60g Regular Size'}
              </h3>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 dark:text-blue-400 mb-2">
                {locale === 'fr' ? '19,99$ CAD' : '$19.99 CAD'}
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {locale === 'fr' ? 'Meilleur rapport qualité-prix pour la plupart des propriétaires de chats' : 'Best value for most cat owners'}
              </p>
              <ul className="text-sm text-gray-700 dark:text-gray-200 dark:text-gray-300 text-left space-y-1 mb-4">
                <li>
                  {locale === 'fr' ? '• 6-8 semaines de contrôle des odeurs' : '• 6-8 weeks of odor control'}
                </li>
                <li>
                  {locale === 'fr' ? '• Parfait pour 1-2 chats' : '• Perfect for 1-2 cats'}
                </li>
                <li>
                  {locale === 'fr' ? '• Choix le plus économique' : '• Most economical choice'}
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 text-center shadow-sm">
              <h3 className="text-xl font-semibold mb-3">
                {locale === 'fr' ? 'Grand Format 120g' : '120g Large Size'}
              </h3>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 dark:text-blue-400 mb-2">
                {locale === 'fr' ? '29,99$ CAD' : '$29.99 CAD'}
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {locale === 'fr' ? 'Valeur maximale pour foyers multi-chats' : 'Maximum value for multi-cat homes'}
              </p>
              <ul className="text-sm text-gray-700 dark:text-gray-200 dark:text-gray-300 text-left space-y-1 mb-4">
                <li>
                  {locale === 'fr' ? '• 10-12 semaines de contrôle des odeurs' : '• 10-12 weeks of odor control'}
                </li>
                <li>
                  {locale === 'fr' ? '• Parfait pour 2+ chats' : '• Great for 2+ cats'}
                </li>
                <li>
                  {locale === 'fr' ? '• Meilleure valeur à long terme' : '• Best long-term value'}
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Montreal Summary for SEO */}
        <section className="mb-16 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            {locale === 'fr'
              ? 'Purrify Montréal : Contrôle d\'Odeur Premium pour Chats'
              : 'Purrify Montreal: Premium Cat Odor Control Made in Canada'
            }
          </h2>
          <div className="max-w-4xl mx-auto text-gray-700 dark:text-gray-200 dark:text-gray-300 space-y-4">
            <p className="text-lg">
              {locale === 'fr'
                ? 'Purrify révolutionne le contrôle des odeurs de litière pour chat à Montréal avec son charbon activé premium fabriqué au Canada. Nos 15 magasins partenaires à travers la région métropolitaine offrent des solutions naturelles et sans parfum pour garder votre maison fraîche pendant les longs hivers québécois.'
                : 'Purrify is revolutionizing cat litter odor control in Montreal with premium activated carbon made in Canada. Our 15 partner stores across the metropolitan area offer natural, fragrance-free solutions to help keep your home fresh during Quebec\'s long winters.'
              }
            </p>
            <p>
              {locale === 'fr'
                ? 'Que vous viviez dans un appartement du Plateau Mont-Royal, un condo à Verdun, ou une maison à Kirkland, Purrify s\'adapte parfaitement aux espaces de vie montréalais. Notre formule sans parfum élimine naturellement les odeurs sans produits chimiques agressifs.'
                : 'Whether you live in a Plateau Mont-Royal apartment, a Verdun condo, or a Kirkland house, Purrify is perfectly suited for Montreal living spaces. Our fragrance-free formula naturally eliminates odors without harsh chemicals.'
              }
            </p>
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  {locale === 'fr' ? '15+ Magasins' : '15+ Store Locations'}
                </h4>
                <p className="text-sm">
                  {locale === 'fr' ? 'À travers le Grand Montréal' : 'Across Greater Montreal'}
                </p>
              </div>
              <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  {locale === 'fr' ? '100% Canadien' : '100% Canadian Made'}
                </h4>
                <p className="text-sm">
                  {locale === 'fr' ? 'Charbon activé premium' : 'Premium activated carbon'}
                </p>
              </div>
              <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
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
          <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {locale === 'fr'
                ? 'Visitez Votre Animalerie Locale à Montréal Aujourd\'hui'
                : 'Visit Your Local Montreal Pet Store Today'
              }
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              {locale === 'fr'
                ? 'Découvrez la différence que Purrify fait dans votre maison. Disponible maintenant dans les animaleries indépendantes à travers la région du Grand Montréal.'
                : 'Experience the difference Purrify makes in your home. Available now at independent pet stores throughout the Greater Montreal Area.'
              }
            </p>
            <div className="space-x-4">
              <Link 
                href="/support/contact" 
                className="inline-block bg-blue-600 text-white dark:text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                {locale === 'fr' ? 'Trouver le Magasin le Plus Près' : 'Find Nearest Store'}
              </Link>
              <Link 
                href="/products" 
                className="inline-block border border-blue-600 text-blue-600 dark:text-blue-400 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 dark:bg-blue-900/20 transition-colors"
              >
                {locale === 'fr' ? 'Voir Tous les Produits' : 'View All Products'}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
