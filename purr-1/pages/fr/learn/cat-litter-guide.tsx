import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Container } from '../../../src/components/ui/container';
import { Button } from '../../../src/components/ui/button';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Droplets, 
  Shield, 
  Heart,
  ChevronRight,
  Home,
  BookOpen,
  Star
} from 'lucide-react';

const CatLitterGuidePage: NextPage = () => {
  const litterTypes = [
    {
      name: "Litière d'Argile",
      pros: ["Abordable", "Bonne absorption", "Facile à trouver"],
      cons: ["Poussiéreuse", "Lourde", "Pas écologique", "Contrôle d'odeur limité"],
      rating: 2
    },
    {
      name: "Argile Agglomérante",
      pros: ["Forme des blocs solides", "Ramassage facile", "Meilleur contrôle d'odeur"],
      cons: ["Toujours poussiéreuse", "Lourde", "Peut être traînée", "Non biodégradable"],
      rating: 3
    },
    {
      name: "Cristaux/Silice",
      pros: ["Excellente absorption", "Peu de poussière", "Longue durée"],
      cons: ["Coûteuse", "Cristaux tranchants", "Non jetable aux toilettes"],
      rating: 3
    },
    {
      name: "Naturelle/Biodégradable",
      pros: ["Écologique", "Peu de poussière", "Options jetables aux toilettes"],
      cons: ["Plus coûteuse", "Qualité variable", "Changements fréquents nécessaires"],
      rating: 4
    },
    {
      name: "Toute Litière + Purrify",
      pros: ["Élimination d'odeur supérieure", "Prolonge la vie de la litière", "Fonctionne avec tout type", "Additif écologique"],
      cons: ["Coût supplémentaire (mais économise globalement)"],
      rating: 5
    }
  ];

  const maintenanceTips = [
    {
      icon: Clock,
      title: "Ramassage Quotidien",
      description: "Retirez les déchets solides quotidiennement pour maintenir la fraîcheur et prévenir les odeurs."
    },
    {
      icon: Droplets,
      title: "Nettoyage Hebdomadaire",
      description: "Remplacez toute la litière chaque semaine et lavez le bac avec du savon doux et de l'eau."
    },
    {
      icon: Shield,
      title: "Utilisez Purrify",
      description: "Ajoutez le charbon actif Purrify pour éliminer les odeurs et prolonger la vie de la litière jusqu'à 50%."
    },
    {
      icon: Heart,
      title: "Surveillez la Santé",
      description: "Observez les changements dans les habitudes de votre chat car ils peuvent indiquer des problèmes de santé."
    }
  ];

  const commonProblems = [
    {
      problem: "Odeurs Fortes",
      solution: "Ajoutez l'additif au charbon actif Purrify pour une élimination d'odeur supérieure",
      link: "/products/trial-size"
    },
    {
      problem: "Litière Traînée",
      solution: "Utilisez un tapis plus grand et considérez changer pour des litières anti-traînée",
      link: null
    },
    {
      problem: "Problèmes de Poussière",
      solution: "Choisissez des litières peu poussiéreuses et versez lentement pour minimiser les particules",
      link: null
    },
    {
      problem: "Changements Fréquents",
      solution: "Purrify prolonge la vie de la litière en neutralisant les odeurs, réduisant les déchets et coûts",
      link: "/learn/how-it-works"
    }
  ];

  return (
    <>
      <Head>
        <title>Guide Complet de Litière pour Chat - Types, Conseils et Meilleures Pratiques | Purrify</title>
        <meta 
          name="description" 
          content="Guide complet des types de litière pour chat, conseils d'entretien et résolution des problèmes courants. Apprenez à choisir la meilleure litière pour votre chat." 
        />
        <meta name="keywords" content="guide litière chat, types litière, soins chat, contrôle odeur, entretien litière, Purrify" />
        <link rel="canonical" href="https://purrify.com/fr/learn/cat-litter-guide" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Guide Complet de Litière pour Chat - Types, Conseils et Meilleures Pratiques" />
        <meta property="og:description" content="Tout ce que vous devez savoir sur la litière pour chat - du choix du bon type aux conseils d'entretien et résolution de problèmes." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://purrify.com/fr/learn/cat-litter-guide" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": "Guide Complet de Litière pour Chat - Types, Conseils et Meilleures Pratiques",
              "description": "Guide complet des types de litière pour chat, conseils d'entretien et résolution des problèmes courants.",
              "author": {
                "@type": "Organization",
                "name": "Purrify"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Purrify",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://purrify.com/optimized/purrify-logo-text.webp"
                }
              },
              "datePublished": "2024-01-01",
              "dateModified": "2024-01-01",
              "inLanguage": "fr"
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
              <Link href="/fr/learn/how-it-works" className="hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors">
                Apprendre
              </Link>
              <span>/</span>
              <span className="text-gray-900 dark:text-gray-100">Guide de Litière</span>
            </nav>
          </Container>
        </section>

        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-[#5B2EFF] to-[#FF3131]">
          <Container>
            <div className="text-center text-white max-w-4xl mx-auto">
              <BookOpen className="w-16 h-16 mx-auto mb-6 opacity-90" />
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Le Guide Complet de Litière pour Chat
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Tout ce que vous devez savoir pour choisir, utiliser et entretenir la litière pour un foyer heureux et sain
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/fr/products/trial-size">
                  <Button size="lg" className="bg-white text-[#5B2EFF] hover:bg-gray-100 font-bold">
                    Essayez Purrify - 4,99$
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* Litter Types Comparison */}
        <section className="py-16">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                Comparaison des Types de Litière
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Toutes les litières ne se valent pas. Voici comment les différents types se comparent.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {litterTypes.map((litter, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-[#E0EFC7] dark:border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                      {litter.name}
                    </h3>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-5 h-5 ${i < litter.rating ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'}`} 
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2">Avantages:</h4>
                      <ul className="space-y-1">
                        {litter.pros.map((pro, i) => (
                          <li key={i} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2">Inconvénients:</h4>
                      <ul className="space-y-1">
                        {litter.cons.map((con, i) => (
                          <li key={i} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                            <XCircle className="w-4 h-4 text-red-500 mr-2 flex-shrink-0" />
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Maintenance Tips */}
        <section className="py-16 bg-[#E0EFC7]/30 dark:bg-gray-800/50">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                Conseils d'Entretien Essentiels
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Gardez votre bac à litière frais et votre chat heureux avec ces pratiques d'entretien éprouvées.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {maintenanceTips.map((tip, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-[#5B2EFF] rounded-full flex items-center justify-center mx-auto mb-4">
                    <tip.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">
                    {tip.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {tip.description}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Common Problems & Solutions */}
        <section className="py-16">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                Problèmes Courants et Solutions
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Vous rencontrez des problèmes avec le bac à litière? Voici les problèmes les plus courants et leurs solutions éprouvées.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {commonProblems.map((item, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-[#E0EFC7] dark:border-gray-700">
                  <h3 className="text-xl font-bold mb-3 text-red-600 dark:text-red-400">
                    Problème: {item.problem}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    <span className="font-semibold text-green-600 dark:text-green-400">Solution:</span> {item.solution}
                  </p>
                  {item.link && (
                    <Link href={`/fr${item.link}`}>
                      <Button variant="outline" size="sm">
                        En Savoir Plus
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-[#5B2EFF] to-[#FF3131]">
          <Container>
            <div className="text-center text-white max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Prêt à Améliorer Votre Expérience de Bac à Litière?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Essayez l'additif au charbon actif Purrify et transformez n'importe quelle litière en une centrale d'élimination d'odeurs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/fr/products/trial-size">
                  <Button size="lg" className="bg-white text-[#5B2EFF] hover:bg-gray-100 font-bold">
                    Commencez avec la Taille d'Essai - 4,99$
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="/fr/customers/testimonials">
                  <Button size="lg" variant="outline" className="border-white text-gray-900 dark:text-white hover:bg-white hover:text-gray-900 transition-colors">
                    Lire les Témoignages
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* Related Articles */}
        <section className="py-16">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                Articles Connexes
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/fr/learn/how-it-works" className="group">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-[#E0EFC7] dark:border-gray-700 hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100 group-hover:text-[#5B2EFF] transition-colors">
                    Comment Fonctionne Purrify
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Découvrez la science derrière le charbon actif et comment il élimine les odeurs au niveau moléculaire.
                  </p>
                </div>
              </Link>
              
              <Link href="/fr/customers/testimonials" className="group">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-[#E0EFC7] dark:border-gray-700 hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100 group-hover:text-[#5B2EFF] transition-colors">
                    Témoignages de Clients
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Lisez les expériences réelles de propriétaires de chats qui ont transformé leurs bacs à litière avec Purrify.
                  </p>
                </div>
              </Link>
              
              <Link href="/fr/support/contact" className="group">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-[#E0EFC7] dark:border-gray-700 hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100 group-hover:text-[#5B2EFF] transition-colors">
                    Besoin d'Aide?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Vous avez des questions sur les types de litière ou Purrify? Notre équipe est là pour vous aider à trouver la solution parfaite.
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

export default CatLitterGuidePage;
