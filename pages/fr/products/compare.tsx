import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Container } from '../../../src/components/ui/container';
import { Button } from '../../../src/components/ui/button';
import { 
  CheckCircle, 
  Package, 
  Clock, 
  DollarSign, 
  Users,
  ChevronRight,
  Home,
  Star,
  Award,
  Zap
} from 'lucide-react';

const ProductComparePage: NextPage = () => {
  const products = [
    {
      id: 'trial',
      name: 'Taille d\'Essai 17g',
      subtitle: 'Parfait pour les Nouveaux Utilisateurs',
      price: '4,99$',
      originalPrice: null,
      savings: null,
      duration: '1 changement de litière',
      cats: '1 chat',
      features: [
        'Essayez avant de vous engager',
        'Introduction sans risque',
        'Portion parfaite',
        'Même formule puissante',
        'Garantie de remboursement'
      ],
      bestFor: 'Nouveaux clients qui veulent tester Purrify',
      popular: false,
      recommended: false,
      cta: 'Commencer l\'Essai',
      ctaLink: '/products/trial-size',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'small',
      name: 'Taille Moyenne 60g',
      subtitle: 'Idéal pour les Foyers à Un Chat',
      price: '12,99$',
      originalPrice: '15,99$',
      savings: '3,00$',
      duration: '3-4 changements de litière',
      cats: '1 chat',
      features: [
        'Choix économique',
        'Prolonge la vie de la litière 3-4x',
        'Élimine complètement les odeurs',
        'Fonctionne avec toute litière',
        'Formule écologique'
      ],
      bestFor: 'Propriétaires d\'un chat recherchant la valeur',
      popular: true,
      recommended: false,
      cta: 'Choisir Petite Taille',
      ctaLink: '/#products',
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'large',
      name: 'Grande Taille 120g',
      subtitle: 'Meilleure Valeur pour Foyers Multi-Chats',
      price: '29,99$',
      originalPrice: '39,99$',
      savings: '10,00$',
      duration: '8-10 changements de litière',
      cats: '2-3 chats',
      features: [
        'Valeur maximale par gramme',
        'Économies en vrac incluses',
        'Parfait pour plusieurs chats',
        'Approvisionnement durable',
        'Livraison gratuite incluse'
      ],
      bestFor: 'Foyers multi-chats recherchant la valeur maximale',
      popular: false,
      recommended: true,
      cta: 'Obtenir la Meilleure Valeur',
      ctaLink: '/#products',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const comparisonFeatures = [
    {
      feature: 'Élimination d\'Odeurs',
      trial: true,
      small: true,
      large: true
    },
    {
      feature: 'Fonctionne avec Toute Litière',
      trial: true,
      small: true,
      large: true
    },
    {
      feature: 'Prolonge la Vie de la Litière',
      trial: true,
      small: true,
      large: true
    },
    {
      feature: 'Garantie de Remboursement',
      trial: true,
      small: true,
      large: true
    },
    {
      feature: 'Livraison Gratuite',
      trial: false,
      small: false,
      large: true
    },
    {
      feature: 'Économies en Vrac',
      trial: false,
      small: true,
      large: true
    },
    {
      feature: 'Convient Multi-Chats',
      trial: false,
      small: true,
      large: true
    }
  ];

  const usageCalculator = [
    {
      cats: 1,
      litterChanges: 'Hebdomadaire',
      trial: '1 semaine',
      small: '3-4 semaines',
      large: '8-10 semaines'
    },
    {
      cats: 2,
      litterChanges: '2x par semaine',
      trial: '3-4 jours',
      small: '1,5-2 semaines',
      large: '4-5 semaines'
    },
    {
      cats: 3,
      litterChanges: '3x par semaine',
      trial: '2-3 jours',
      small: '1 semaine',
      large: '2,5-3 semaines'
    }
  ];

  return (
    <>
      <Head>
        <title>Comparer les Produits Purrify - Trouvez la Taille Parfaite | Purrify</title>
        <meta 
          name="description" 
          content="Comparez toutes les tailles d'additif de litière au charbon actif Purrify. Trouvez l'option parfaite pour votre foyer - de la taille d'essai aux économies en vrac." 
        />
        <meta name="keywords" content="comparaison Purrify, tailles additif litière chat, taille essai, économies vrac, multi-chat, comparaison produits" />
        <link rel="canonical" href="https://purrify.com/fr/products/compare" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Comparer les Produits Purrify - Trouvez la Taille Parfaite" />
        <meta property="og:description" content="Comparez toutes les tailles Purrify et trouvez l'additif de litière au charbon actif parfait pour vos besoins." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://purrify.com/fr/products/compare" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Comparer les Produits Purrify",
              "description": "Comparez toutes les tailles d'additif de litière au charbon actif Purrify et trouvez l'option parfaite pour votre foyer.",
              "url": "https://purrify.com/fr/products/compare",
              "inLanguage": "fr",
              "mainEntity": {
                "@type": "ItemList",
                "itemListElement": products.map((product, index) => ({
                  "@type": "Product",
                  "position": index + 1,
                  "name": product.name,
                  "description": product.subtitle,
                  "offers": {
                    "@type": "Offer",
                    "price": product.price.replace('$', '').replace(',', '.'),
                    "priceCurrency": "CAD"
                  }
                }))
              }
            })
          }}
        />
      </Head>

      <main className="min-h-screen bg-[#FFFFF5] dark:bg-gray-900 transition-colors duration-300">
        {/* Breadcrumb Navigation */}
        <section className="py-4 border-b border-[#E0EFC7] dark:border-gray-800">
          <Container>
            <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <Link href="/fr/" className="hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors">
                <Home className="w-4 h-4" />
              </Link>
              <span>/</span>
              <Link href="/fr/#products" className="hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors">
                Produits
              </Link>
              <span>/</span>
              <span className="text-gray-900 dark:text-gray-100">Comparer</span>
            </nav>
          </Container>
        </section>

        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-[#5B2EFF] to-[#FF3131]">
          <Container>
            <div className="text-center text-white dark:text-gray-100 max-w-4xl mx-auto">
              <Package className="w-16 h-16 mx-auto mb-6 opacity-90" />
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Comparer les Produits Purrify
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Trouvez la taille parfaite pour votre foyer - de l'essai aux économies en vrac
              </p>
            </div>
          </Container>
        </section>

        {/* Product Comparison Cards */}
        <section className="py-16">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <div 
                  key={product.id} 
                  className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl border-2 ${
                    product.recommended 
                      ? 'border-[#FF3131] dark:border-[#FF5050]' 
                      : 'border-[#E0EFC7] dark:border-gray-700'
                  } overflow-hidden transform hover:scale-105 transition-transform duration-300`}
                >
                  {/* Popular Badge */}
                  {product.popular && (
                    <div className="absolute top-4 right-4 bg-green-500 text-white dark:text-gray-100 px-3 py-1 rounded-full text-sm font-bold flex items-center">
                      <Star className="w-4 h-4 mr-1" />
                      Populaire
                    </div>
                  )}
                  
                  {/* Recommended Badge */}
                  {product.recommended && (
                    <div className="absolute top-4 right-4 bg-[#FF3131] text-white dark:text-gray-100 px-3 py-1 rounded-full text-sm font-bold flex items-center">
                      <Award className="w-4 h-4 mr-1" />
                      Meilleure Valeur
                    </div>
                  )}

                  {/* Header */}
                  <div className={`bg-gradient-to-r ${product.color} p-6 text-white dark:text-gray-100`}>
                    <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
                    <p className="opacity-90 mb-4">{product.subtitle}</p>
                    <div className="flex items-baseline">
                      <span className="text-4xl font-bold">{product.price}</span>
                      {product.originalPrice && (
                        <span className="ml-2 text-lg line-through opacity-70">{product.originalPrice}</span>
                      )}
                    </div>
                    {product.savings && (
                      <p className="text-sm mt-1 opacity-90">Économisez {product.savings}</p>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center">
                        <Clock className="w-6 h-6 mx-auto mb-2 text-[#5B2EFF]" />
                        <p className="text-sm text-gray-600 dark:text-gray-300">Durée</p>
                        <p className="font-semibold text-gray-900 dark:text-gray-100">{product.duration}</p>
                      </div>
                      <div className="text-center">
                        <Users className="w-6 h-6 mx-auto mb-2 text-[#5B2EFF]" />
                        <p className="text-sm text-gray-600 dark:text-gray-300">Idéal Pour</p>
                        <p className="font-semibold text-gray-900 dark:text-gray-100">{product.cats}</p>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-6">
                      <h4 className="font-bold mb-3 text-gray-900 dark:text-gray-100">Caractéristiques:</h4>
                      <ul className="space-y-2">
                        {product.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                            <CheckCircle className="w-4 h-4 text-green-500 dark:text-green-400 mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Best For */}
                    <div className="mb-6 p-4 bg-[#E0EFC7]/30 dark:bg-gray-700/30 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        <span className="font-semibold">Idéal pour:</span> {product.bestFor}
                      </p>
                    </div>

                    {/* CTA Button */}
                    <Link href={`/fr${product.ctaLink}`}>
                      <Button 
                        size="lg" 
                        className={`w-full ${
                          product.recommended 
                            ? 'bg-[#FF3131] hover:bg-[#FF3131]/90 text-white dark:text-gray-100' 
                            : 'bg-[#5B2EFF] hover:bg-[#5B2EFF]/90 text-white dark:text-gray-100'
                        }`}
                      >
                        {product.cta}
                        <ChevronRight className="w-5 h-5 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Feature Comparison Table */}
        <section className="py-16 bg-[#E0EFC7]/30 dark:bg-gray-800/50">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                Comparaison des Caractéristiques
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Voyez comment nos produits se comparent côte à côte
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#5B2EFF] text-white dark:text-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-left font-bold">Caractéristique</th>
                      <th className="px-6 py-4 text-center font-bold">Essai 17g</th>
                      <th className="px-6 py-4 text-center font-bold">Moyen 60g</th>
                      <th className="px-6 py-4 text-center font-bold">Grand 120g</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonFeatures.map((row, index) => (
                      <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-700/50' : 'bg-white dark:bg-gray-800'}`}>
                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">
                          {row.feature}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {row.trial ? (
                            <CheckCircle className="w-6 h-6 text-green-500 dark:text-green-400 mx-auto" />
                          ) : (
                            <span className="text-gray-400 dark:text-gray-500">—</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {row.small ? (
                            <CheckCircle className="w-6 h-6 text-green-500 dark:text-green-400 mx-auto" />
                          ) : (
                            <span className="text-gray-400 dark:text-gray-500">—</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {row.large ? (
                            <CheckCircle className="w-6 h-6 text-green-500 dark:text-green-400 mx-auto" />
                          ) : (
                            <span className="text-gray-400 dark:text-gray-500">—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Container>
        </section>

        {/* Usage Calculator */}
        <section className="py-16">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                Combien de Temps Chaque Taille Durera-t-elle?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Estimez la durée selon la taille de votre foyer
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-[#5B2EFF] to-[#FF3131] text-white dark:text-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-left font-bold">Nombre de Chats</th>
                      <th className="px-6 py-4 text-center font-bold">Changements Typiques</th>
                      <th className="px-6 py-4 text-center font-bold">Essai 17g</th>
                      <th className="px-6 py-4 text-center font-bold">Moyen 60g</th>
                      <th className="px-6 py-4 text-center font-bold">Grand 120g</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usageCalculator.map((row, index) => (
                      <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-700/50' : 'bg-white dark:bg-gray-800'}`}>
                        <td className="px-6 py-4 font-bold text-[#5B2EFF]">
                          {row.cats} Chat{row.cats > 1 ? 's' : ''}
                        </td>
                        <td className="px-6 py-4 text-center text-gray-600 dark:text-gray-300">
                          {row.litterChanges}
                        </td>
                        <td className="px-6 py-4 text-center font-medium text-gray-900 dark:text-gray-100">
                          {row.trial}
                        </td>
                        <td className="px-6 py-4 text-center font-medium text-gray-900 dark:text-gray-100">
                          {row.small}
                        </td>
                        <td className="px-6 py-4 text-center font-medium text-gray-900 dark:text-gray-100">
                          {row.large}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Container>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-[#5B2EFF] to-[#FF3131]">
          <Container>
            <div className="text-center text-white dark:text-gray-100 max-w-3xl mx-auto">
              <Zap className="w-16 h-16 mx-auto mb-6 opacity-90" />
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Toujours Pas Sûr de la Taille à Choisir?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Commencez avec notre taille d'essai sans risque et découvrez la différence Purrify par vous-même.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/fr/products/trial-size">
                  <Button size="lg" className="bg-white text-[#5B2EFF] hover:bg-gray-100 font-bold">
                    Essayez Sans Risque - 4,99$
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="/fr/support/contact">
                  <Button size="lg" variant="outline" className="border-white text-gray-900 dark:text-white dark:text-gray-100 hover:bg-white hover:text-gray-900 transition-colors">
                    Obtenez des Conseils Personnalisés
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* Related Pages */}
        <section className="py-16">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                En Savoir Plus sur Purrify
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/fr/learn/how-it-works" className="group">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-[#E0EFC7] dark:border-gray-700 hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100 group-hover:text-[#5B2EFF] transition-colors">
                    Comment Ça Fonctionne
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Découvrez la science derrière notre technologie au charbon actif et pourquoi elle est si efficace.
                  </p>
                </div>
              </Link>
              
              <Link href="/fr/customers/testimonials" className="group">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-[#E0EFC7] dark:border-gray-700 hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100 group-hover:text-[#5B2EFF] transition-colors">
                    Avis Clients
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Voyez ce que des milliers de clients satisfaits disent de leur expérience avec Purrify.
                  </p>
                </div>
              </Link>
              
              <Link href="/fr/learn/cat-litter-guide" className="group">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-[#E0EFC7] dark:border-gray-700 hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100 group-hover:text-[#5B2EFF] transition-colors">
                    Guide de Litière
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Apprenez sur les différents types de litière et comment choisir la meilleure option pour votre chat.
                  </p>
                </div>
              </Link>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
};

export default ProductComparePage;
