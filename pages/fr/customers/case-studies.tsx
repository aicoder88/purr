import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Container } from '../../../src/components/ui/container';
import { Button } from '../../../src/components/ui/button';
import { 
  User, 
  Calendar, 
  MapPin, 
  Quote,
  TrendingUp,
  Clock,
  DollarSign,
  Heart,
  ChevronRight,
  Home,
  Star,
  CheckCircle
} from 'lucide-react';

const CaseStudiesPage: NextPage = () => {
  const caseStudies = [
    {
      id: 1,
      name: "Sarah & Mittens",
      location: "Toronto, ON",
      cats: 1,
      duration: "6 mois",
      challenge: "Odeurs fortes dans un petit appartement",
      solution: "A commencé avec la taille d'essai 17g, utilise maintenant 60g mensuellement",
      results: [
        "95% de réduction des odeurs du bac à litière",
        "Vie de la litière prolongée de 1 semaine à 3 semaines",
        "Économisé plus de 200$ annuellement sur les coûts de litière",
        "Plus d'embarras lors des visites d'invités"
      ],
      quote: "J'étais sceptique au début, mais Purrify a complètement transformé mon petit appartement. La différence était notable en quelques heures, et maintenant je ne peux plus imaginer la vie sans.",
      image: "/optimized/testimonial-sarah.webp",
      beforeAfter: {
        before: "Plaintes quotidiennes des voisins, changements fréquents de litière, vaporisateurs d'odeur coûteux",
        after: "Appartement sans odeur, litière qui dure 3x plus longtemps, voisins heureux"
      },
      productUsed: "Taille Moyenne 60g",
      satisfaction: 5
    },
    {
      id: 2,
      name: "Foyer Multi-Chats de Mike",
      location: "Vancouver, BC",
      cats: 3,
      duration: "1 an",
      challenge: "Gérer les odeurs avec 3 chats dans un foyer occupé",
      solution: "Utilise la grande taille 120g toutes les 6 semaines",
      results: [
        "Éliminé le besoin de plusieurs bacs à litière",
        "Réduit les changements de litière de quotidien à hebdomadaire",
        "Niveaux de stress familial considérablement diminués",
        "Invités à nouveau confortables de visiter"
      ],
      quote: "Avec trois chats, notre maison sentait terrible malgré le nettoyage constant. Purrify nous a redonné notre maison. C'est un changement révolutionnaire pour toute notre famille.",
      image: "/optimized/testimonial-mike.webp",
      beforeAfter: {
        before: "Plusieurs bacs à litière, nettoyage quotidien, odeurs accablantes, isolement social",
        after: "Un seul bac à litière, entretien hebdomadaire, maison sans odeur, vie sociale active"
      },
      productUsed: "Grande Taille 120g",
      satisfaction: 5
    },
    {
      id: 3,
      name: "Le Parcours du Chat Senior d'Emma",
      location: "Montréal, QC",
      cats: 1,
      duration: "8 mois",
      challenge: "Chat senior avec problèmes de santé causant des odeurs plus fortes",
      solution: "Utilisation régulière de la taille 60g avec approbation vétérinaire",
      results: [
        "Meilleur suivi de la santé du chat grâce à un environnement plus propre",
        "Stress réduit pour le chat et le propriétaire",
        "Dignité maintenue pour l'animal vieillissant",
        "Administration de médicaments plus facile dans un espace propre"
      ],
      quote: "Quand mon chat de 16 ans a développé des problèmes rénaux, les odeurs sont devenues accablantes. Purrify nous a aidés à maintenir un environnement propre et confortable pendant son traitement.",
      image: "/optimized/testimonial-emma.webp",
      beforeAfter: {
        before: "Odeurs constantes affectant la qualité de vie, surveillance de santé difficile",
        after: "Environnement propre soutenant la gestion de la santé et le confort"
      },
      productUsed: "Taille Moyenne 60g",
      satisfaction: 5
    },
    {
      id: 4,
      name: "La Famille Johnson",
      location: "Calgary, AB",
      cats: 2,
      duration: "2 ans",
      challenge: "Allergies des enfants aggravées par la poussière et les odeurs de litière",
      solution: "Changé pour une combinaison litière naturelle + Purrify",
      results: [
        "Réduit les symptômes d'allergie des enfants",
        "Éliminé le besoin de nettoyants chimiques agressifs",
        "Créé un environnement domestique plus sain",
        "Les enfants peuvent maintenant aider avec les soins des animaux"
      ],
      quote: "Les allergies de nos enfants s'aggravaient, et nous pensions devoir reloger nos chats. Purrify nous a permis de garder notre famille ensemble tout en créant une maison plus saine.",
      image: "/optimized/testimonial-johnson.webp",
      beforeAfter: {
        before: "Allergies des enfants, produits chimiques agressifs, relogement potentiel des animaux",
        after: "Environnement sain, solutions naturelles, famille heureuse avec animaux"
      },
      productUsed: "Taille Moyenne 60g (2 unités)",
      satisfaction: 5
    }
  ];

  const metrics = [
    {
      icon: TrendingUp,
      value: "94%",
      label: "Réduction Moyenne d'Odeurs",
      description: "Basé sur les sondages clients"
    },
    {
      icon: Clock,
      value: "3,2x",
      label: "Extension de Vie de Litière",
      description: "Amélioration typique"
    },
    {
      icon: DollarSign,
      value: "180$",
      label: "Économies Annuelles Moyennes",
      description: "Sur litière et produits de nettoyage"
    },
    {
      icon: Heart,
      value: "98%",
      label: "Satisfaction Client",
      description: "Recommanderaient aux autres"
    }
  ];

  return (
    <>
      <Head>
        <title>Études de Cas Clients - Vraies Histoires de Succès Purrify | Purrify</title>
        <meta 
          name="description" 
          content="Lisez des études de cas détaillées de comment Purrify a transformé la vie de vrais clients. Voyez les résultats avant et après, économies et améliorations de vie." 
        />
        <meta name="keywords" content="études de cas Purrify, histoires de succès clients, résultats avant après, solutions odeur litière chat, témoignages" />
        <link rel="canonical" href="https://purrify.com/fr/customers/case-studies" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Études de Cas Clients - Vraies Histoires de Succès Purrify" />
        <meta property="og:description" content="Découvrez comment Purrify a transformé la vie de vrais clients avec des études de cas détaillées montrant les résultats avant et après." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://purrify.com/fr/customers/case-studies" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": "Études de Cas Clients - Vraies Histoires de Succès Purrify",
              "description": "Études de cas détaillées de comment l'additif de litière au charbon actif Purrify a transformé la vie des clients.",
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
              <Link href="/fr/customers/testimonials" className="hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors">
                Clients
              </Link>
              <span>/</span>
              <span className="text-gray-900 dark:text-gray-100">Études de Cas</span>
            </nav>
          </Container>
        </section>

        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-[#5B2EFF] to-[#FF3131]">
          <Container>
            <div className="text-center text-white dark:text-white dark:text-gray-100 max-w-4xl mx-auto">
              <User className="w-16 h-16 mx-auto mb-6 opacity-90" />
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Vraies Études de Cas Clients
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Histoires de succès détaillées montrant comment Purrify a transformé de vrais foyers
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/fr/products/trial-size">
                  <Button size="lg" className="bg-white text-[#5B2EFF] hover:bg-gray-100 font-bold">
                    Commencez Votre Histoire de Succès - 4,99$
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* Success Metrics */}
        <section className="py-16 bg-[#E0EFC7]/30 dark:bg-gray-800/50">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                Résultats Prouvés Dans Toutes les Études de Cas
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Améliorations constantes rapportées par nos clients
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {metrics.map((metric, index) => (
                <div key={index} className="text-center bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-[#E0EFC7] dark:border-gray-700">
                  <div className="w-16 h-16 bg-[#5B2EFF] rounded-full flex items-center justify-center mx-auto mb-4">
                    <metric.icon className="w-8 h-8 text-white dark:text-white dark:text-gray-100" />
                  </div>
                  <div className="text-3xl font-bold text-[#FF3131] mb-2">{metric.value}</div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                    {metric.label}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {metric.description}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Case Studies */}
        <section className="py-16">
          <Container>
            <div className="space-y-16">
              {caseStudies.map((study, index) => (
                <div key={study.id} className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 items-center`}>
                  {/* Image */}
                  <div className="lg:w-1/3">
                    <div className="bg-gradient-to-br from-[#5B2EFF]/10 to-[#FF3131]/10 rounded-2xl p-8 text-center">
                      <div className="w-24 h-24 bg-[#5B2EFF] rounded-full flex items-center justify-center mx-auto mb-4">
                        <User className="w-12 h-12 text-white dark:text-white dark:text-gray-100" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">
                        {study.name}
                      </h3>
                      <div className="flex items-center justify-center text-gray-600 dark:text-gray-300 mb-2">
                        <MapPin className="w-4 h-4 mr-1" />
                        {study.location}
                      </div>
                      <div className="flex items-center justify-center text-gray-600 dark:text-gray-300 mb-4">
                        <Calendar className="w-4 h-4 mr-1" />
                        Utilise Purrify depuis {study.duration}
                      </div>
                      <div className="flex justify-center">
                        {[...Array(study.satisfaction)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="lg:w-2/3">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-[#E0EFC7] dark:border-gray-700">
                      {/* Challenge & Solution */}
                      <div className="mb-6">
                        <h4 className="text-lg font-bold mb-2 text-red-600 dark:text-red-400">
                          Le Défi:
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                          {study.challenge}
                        </p>
                        
                        <h4 className="text-lg font-bold mb-2 text-green-600 dark:text-green-400">
                          La Solution:
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300">
                          {study.solution}
                        </p>
                      </div>

                      {/* Results */}
                      <div className="mb-6">
                        <h4 className="text-lg font-bold mb-3 text-gray-900 dark:text-gray-100">
                          Résultats Obtenus:
                        </h4>
                        <ul className="space-y-2">
                          {study.results.map((result, i) => (
                            <li key={i} className="flex items-center text-gray-600 dark:text-gray-300">
                              <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                              {result}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Quote */}
                      <div className="mb-6 p-4 bg-[#E0EFC7]/30 dark:bg-gray-700/30 rounded-lg relative">
                        <Quote className="w-8 h-8 text-[#5B2EFF] opacity-50 absolute top-2 left-2" />
                        <p className="text-gray-700 dark:text-gray-300 italic pl-8 pt-2">
                          "{study.quote}"
                        </p>
                      </div>

                      {/* Before & After */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-4 border-red-500">
                          <h5 className="font-bold text-red-700 dark:text-red-400 mb-2">Avant Purrify:</h5>
                          <p className="text-sm text-red-600 dark:text-red-300">{study.beforeAfter.before}</p>
                        </div>
                        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-500">
                          <h5 className="font-bold text-green-700 dark:text-green-400 mb-2">Après Purrify:</h5>
                          <p className="text-sm text-green-600 dark:text-green-300 dark:text-green-400">{study.beforeAfter.after}</p>
                        </div>
                      </div>

                      {/* Product Used */}
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">Produit Utilisé:</span>
                          <span className="ml-2 font-semibold text-[#5B2EFF]">{study.productUsed}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-sm text-gray-500 dark:text-gray-400">Foyer:</span>
                          <span className="ml-2 font-semibold text-gray-900 dark:text-gray-100">
                            {study.cats} chat{study.cats > 1 ? 's' : ''}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-[#5B2EFF] to-[#FF3131]">
          <Container>
            <div className="text-center text-white dark:text-white dark:text-gray-100 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Prêt à Écrire Votre Propre Histoire de Succès?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Rejoignez des milliers de clients satisfaits qui ont transformé leurs maisons avec Purrify.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/fr/products/trial-size">
                  <Button size="lg" className="bg-white text-[#5B2EFF] hover:bg-gray-100 font-bold">
                    Commencez Votre Essai - 4,99$
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="/fr/products/compare">
                  <Button size="lg" variant="outline" className="border-white text-gray-900 dark:text-white dark:text-gray-100 hover:bg-white hover:text-gray-900 transition-colors">
                    Comparer Toutes les Tailles
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* Share Your Story */}
        <section className="py-16">
          <Container>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-gray-100">
                Partagez Votre Histoire Purrify
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Avez-vous vécu des résultats incroyables avec Purrify? Nous aimerions présenter votre histoire de succès et aider d'autres propriétaires de chats à découvrir la différence.
              </p>
              <Link href="/fr/support/contact">
                <Button size="lg" className="bg-[#5B2EFF] hover:bg-[#5B2EFF]/90 text-white dark:text-white dark:text-gray-100">
                  Soumettez Votre Histoire
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </Container>
        </section>

        {/* Related Pages */}
        <section className="py-16 bg-[#E0EFC7]/30 dark:bg-gray-800/50">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                Explorez Plus d'Expériences Clients
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/fr/customers/testimonials" className="group">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-[#E0EFC7] dark:border-gray-700 hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100 group-hover:text-[#5B2EFF] transition-colors">
                    Témoignages Clients
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Lisez des avis rapides et des évaluations de clients vérifiés à travers le Canada.
                  </p>
                </div>
              </Link>
              
              <Link href="/fr/learn/how-it-works" className="group">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-[#E0EFC7] dark:border-gray-700 hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100 group-hover:text-[#5B2EFF] transition-colors">
                    Comment Ça Fonctionne
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Comprenez la science derrière ces résultats incroyables et pourquoi Purrify est si efficace.
                  </p>
                </div>
              </Link>
              
              <Link href="/fr/support/contact" className="group">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-[#E0EFC7] dark:border-gray-700 hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100 group-hover:text-[#5B2EFF] transition-colors">
                    Obtenez des Conseils Personnalisés
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Contactez notre équipe pour des recommandations personnalisées basées sur votre situation spécifique.
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

export default CaseStudiesPage;
