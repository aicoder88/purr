import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Container } from '../../../src/components/ui/container';
import { Button } from '../../../src/components/ui/button';
import { 
  Truck, 
  Clock, 
  MapPin, 
  Package,
  Shield,
  CreditCard,
  Globe,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  Home,
  Plane,
  Calendar,
  DollarSign
} from 'lucide-react';

const ShippingPage: NextPage = () => {
  const shippingOptions = [
    {
      name: "Expédition Standard",
      price: "Gratuite sur commandes 25$+",
      paidPrice: "4,99$ sous 25$",
      time: "5-7 jours ouvrables",
      description: "Livraison fiable Postes Canada à votre porte",
      icon: Truck,
      popular: true
    },
    {
      name: "Expédition Express",
      price: "9,99$",
      paidPrice: null,
      time: "2-3 jours ouvrables",
      description: "Livraison plus rapide via Postes Canada Xpresspost",
      icon: Plane,
      popular: false
    },
    {
      name: "Expédition Prioritaire",
      price: "14,99$",
      paidPrice: null,
      time: "1-2 jours ouvrables",
      description: "Livraison le lendemain dans les grandes villes",
      icon: Clock,
      popular: false
    }
  ];

  const provinces = [
    { name: "Ontario", time: "3-5 jours", express: "1-2 jours" },
    { name: "Québec", time: "3-5 jours", express: "1-2 jours" },
    { name: "Colombie-Britannique", time: "5-7 jours", express: "2-3 jours" },
    { name: "Alberta", time: "4-6 jours", express: "2-3 jours" },
    { name: "Manitoba", time: "5-7 jours", express: "2-3 jours" },
    { name: "Saskatchewan", time: "5-7 jours", express: "2-3 jours" },
    { name: "Nouvelle-Écosse", time: "5-7 jours", express: "3-4 jours" },
    { name: "Nouveau-Brunswick", time: "5-7 jours", express: "3-4 jours" },
    { name: "Terre-Neuve", time: "7-10 jours", express: "4-5 jours" },
    { name: "Î.-P.-É.", time: "6-8 jours", express: "3-4 jours" },
    { name: "Territoires du Nord-Ouest", time: "10-14 jours", express: "5-7 jours" },
    { name: "Nunavut", time: "14-21 jours", express: "7-10 jours" },
    { name: "Yukon", time: "10-14 jours", express: "5-7 jours" }
  ];

  const internationalCountries = [
    { name: "États-Unis", time: "7-14 jours", cost: "12,99$" },
    { name: "Royaume-Uni", time: "10-21 jours", cost: "19,99$" },
    { name: "Union Européenne", time: "10-21 jours", cost: "19,99$" },
    { name: "Australie", time: "14-28 jours", cost: "24,99$" },
    { name: "Autres Pays", time: "14-35 jours", cost: "Nous contacter" }
  ];

  const faqItems = [
    {
      question: "Quand ma commande sera-t-elle expédiée?",
      answer: "Les commandes passées avant 14h EST du lundi au vendredi sont expédiées le jour même. Les commandes de fin de semaine sont expédiées le lundi suivant."
    },
    {
      question: "Comment puis-je suivre mon colis?",
      answer: "Vous recevrez un numéro de suivi par courriel une fois votre commande expédiée. Suivez votre colis directement sur le site web de Postes Canada."
    },
    {
      question: "Que faire si mon colis est endommagé?",
      answer: "Nous emballons toutes les commandes avec soin, mais si des dommages surviennent pendant l'expédition, contactez-nous dans les 48 heures pour un remplacement gratuit."
    },
    {
      question: "Puis-je changer mon adresse de livraison?",
      answer: "Contactez-nous immédiatement si vous devez changer votre adresse. Une fois expédié, nous ne pouvons pas modifier le lieu de livraison."
    },
    {
      question: "Livrez-vous aux boîtes postales?",
      answer: "Oui, nous livrons aux boîtes postales au Canada en utilisant les services de Postes Canada."
    },
    {
      question: "Qu'en est-il des frais de douane?",
      answer: "Les commandes canadiennes n'ont pas de frais supplémentaires. Les clients internationaux peuvent être responsables des droits de douane et taxes."
    }
  ];

  return (
    <>
      <Head>
        <title>Information d'Expédition - Livraison Rapide et Fiable à Travers le Canada | Purrify</title>
        <meta 
          name="description" 
          content="Découvrez les options d'expédition Purrify, délais de livraison et coûts. Expédition gratuite sur commandes 25$+. Livraison rapide à travers le Canada et expédition internationale disponible." 
        />
        <meta name="keywords" content="expédition Purrify, délais livraison, coûts expédition, Postes Canada, livraison gratuite, livraison internationale" />
        <link rel="canonical" href="https://purrify.com/fr/support/shipping" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Information d'Expédition - Livraison Rapide et Fiable" />
        <meta property="og:description" content="Livraison Purrify rapide et fiable à travers le Canada. Expédition gratuite sur commandes 25$+. Expédition internationale disponible." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://purrify.com/fr/support/shipping" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Information d'Expédition",
              "description": "Options d'expédition Purrify, délais de livraison et coûts pour le Canada et la livraison internationale.",
              "url": "https://purrify.com/fr/support/shipping",
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
              <Link href="/fr/support/contact" className="hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors">
                Support
              </Link>
              <span>/</span>
              <span className="text-gray-900 dark:text-gray-100">Expédition</span>
            </nav>
          </Container>
        </section>

        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-[#5B2EFF] to-[#FF3131]">
          <Container>
            <div className="text-center text-white dark:text-gray-100 max-w-4xl mx-auto">
              <Truck className="w-16 h-16 mx-auto mb-6 opacity-90" />
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Information d'Expédition
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Livraison rapide et fiable à travers le Canada et au-delà
              </p>
              <div className="bg-white/10 rounded-lg p-4 inline-block">
                <p className="text-lg font-semibold">
                  🚚 Expédition gratuite sur commandes 25$+ • 📦 Traitement le jour même • 🇨🇦 Livraison partout au Canada
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* Shipping Options */}
        <section className="py-16">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                Choisissez Votre Vitesse d'Expédition
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Sélectionnez l'option de livraison qui vous convient le mieux
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {shippingOptions.map((option, index) => (
                <div 
                  key={index} 
                  className={`relative bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-2 ${
                    option.popular 
                      ? 'border-[#FF3131] dark:border-[#FF5050]' 
                      : 'border-[#E0EFC7] dark:border-gray-700'
                  } hover:shadow-xl transition-shadow`}
                >
                  {option.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-[#FF3131] text-white dark:text-gray-100 px-4 py-1 rounded-full text-sm font-bold">
                        Plus Populaire
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-[#5B2EFF] rounded-full flex items-center justify-center mx-auto mb-4">
                      <option.icon className="w-8 h-8 text-white dark:text-gray-100" />
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">
                      {option.name}
                    </h3>
                    
                    <div className="mb-4">
                      <p className="text-2xl font-bold text-[#FF3131] mb-1">
                        {option.price}
                      </p>
                      {option.paidPrice && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {option.paidPrice}
                        </p>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-center mb-4 text-gray-600 dark:text-gray-300">
                      <Clock className="w-4 h-4 mr-2" />
                      <span className="font-semibold">{option.time}</span>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {option.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Delivery Times by Province */}
        <section className="py-16 bg-[#E0EFC7]/30 dark:bg-gray-800/50">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                Délais de Livraison par Province
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Délais de livraison estimés pour l'expédition standard à travers le Canada
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#5B2EFF] text-white dark:text-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-left font-bold">Province/Territoire</th>
                      <th className="px-6 py-4 text-center font-bold">Expédition Standard</th>
                      <th className="px-6 py-4 text-center font-bold">Expédition Express</th>
                    </tr>
                  </thead>
                  <tbody>
                    {provinces.map((province, index) => (
                      <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-700/50' : 'bg-white dark:bg-gray-800'}`}>
                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">
                          {province.name}
                        </td>
                        <td className="px-6 py-4 text-center text-gray-600 dark:text-gray-300">
                          {province.time}
                        </td>
                        <td className="px-6 py-4 text-center text-gray-600 dark:text-gray-300">
                          {province.express}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Container>
        </section>

        {/* International Shipping */}
        <section className="py-16">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                Expédition Internationale
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Nous expédions Purrify dans le monde entier avec une livraison internationale fiable
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {internationalCountries.map((country, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-[#E0EFC7] dark:border-gray-700">
                  <div className="flex items-center mb-4">
                    <Globe className="w-6 h-6 text-[#5B2EFF] mr-3" />
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                      {country.name}
                    </h3>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Délai de Livraison:</span>
                      <span className="font-semibold text-gray-900 dark:text-gray-100">{country.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Coût d'Expédition:</span>
                      <span className="font-semibold text-[#FF3131]">{country.cost}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
              <div className="flex items-start">
                <AlertCircle className="w-6 h-6 text-yellow-600 dark:text-yellow-400 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-yellow-800 dark:text-yellow-200 mb-2">
                    Notes sur l'Expédition Internationale:
                  </h4>
                  <ul className="text-yellow-700 dark:text-yellow-300 dark:text-yellow-400 space-y-1 text-sm">
                    <li>• Des droits de douane et taxes peuvent s'appliquer et sont la responsabilité du client</li>
                    <li>• Les délais de livraison sont des estimations et peuvent varier selon le traitement douanier</li>
                    <li>• Certains pays peuvent avoir des restrictions d'importation sur certains produits</li>
                    <li>• Contactez-nous pour des devis d'expédition vers des pays non listés ci-dessus</li>
                  </ul>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Order Processing */}
        <section className="py-16 bg-[#E0EFC7]/30 dark:bg-gray-800/50">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                Traitement et Exécution des Commandes
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Comment nous traitons votre commande du clic à la livraison
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#5B2EFF] rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="w-8 h-8 text-white dark:text-gray-100" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-gray-100">
                  Commande Passée
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Traitement de paiement sécurisé et courriel de confirmation envoyé
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-[#FF3131] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="w-8 h-8 text-white dark:text-gray-100" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-gray-100">
                  Traitement
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Commandes passées avant 14h EST expédiées le jour même (lun-ven)
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-[#03E46A] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="w-8 h-8 text-white dark:text-gray-100" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-gray-100">
                  Expédié
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Numéro de suivi fourni par courriel pour surveiller le colis
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-[#FFB800] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white dark:text-gray-100" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-gray-100">
                  Livré
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Livraison sécurisée à votre porte avec confirmation de signature si requis
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* Shipping FAQ */}
        <section className="py-16">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                FAQ Expédition
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Questions courantes sur l'expédition et la livraison Purrify
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              {faqItems.map((item, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-[#E0EFC7] dark:border-gray-700">
                  <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-gray-100">
                    {item.question}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-[#5B2EFF] to-[#FF3131]">
          <Container>
            <div className="text-center text-white dark:text-gray-100 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Prêt à Commander Purrify?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Obtenez une livraison rapide et fiable directement à votre porte. Expédition gratuite sur commandes 25$+.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/fr/products/trial-size">
                  <Button size="lg" className="bg-white text-[#5B2EFF] hover:bg-gray-100 font-bold">
                    Commander Taille d'Essai - 4,99$
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="/fr/#products">
                  <Button size="lg" variant="outline" className="border-white text-gray-900 dark:text-white dark:text-gray-100 hover:bg-white hover:text-gray-900 transition-colors">
                    Voir Tous les Produits
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
                Besoin de Plus d'Information?
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/fr/support/contact" className="group">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-[#E0EFC7] dark:border-gray-700 hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100 group-hover:text-[#5B2EFF] transition-colors">
                    Contacter le Support
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Vous avez des questions sur l'expédition? Notre équipe de service client est là pour vous aider.
                  </p>
                </div>
              </Link>
              
              <Link href="/fr/products/compare" className="group">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-[#E0EFC7] dark:border-gray-700 hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100 group-hover:text-[#5B2EFF] transition-colors">
                    Comparer les Produits
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Trouvez la taille Purrify parfaite pour votre foyer et vos besoins d'expédition.
                  </p>
                </div>
              </Link>
              
              <Link href="/fr/customers/testimonials" className="group">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-[#E0EFC7] dark:border-gray-700 hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100 group-hover:text-[#5B2EFF] transition-colors">
                    Avis Clients
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Voyez ce que les clients à travers le Canada disent de leur expérience Purrify.
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

export default ShippingPage;
