import { NextSeo } from 'next-seo';
import { Container } from '../../../src/components/ui/container';
import { Button } from '../../../src/components/ui/button';
import { useTranslation } from '../../../src/lib/translation-context';
import { SITE_NAME } from '../../../src/lib/constants';
import NextImage from '../../../components/NextImage';
import Link from 'next/link';
import { ArrowLeft, Check, Star, ShoppingCart, Heart, Users } from 'lucide-react';

export default function TrialSizePageFR() {
  const { t, locale } = useTranslation();
  
  const pageTitle = `${SITE_NAME} Format d'Essai - Additif de Charbon Activé 17g pour Litière`;
  const pageDescription = "Essayez Purrify sans risque avec notre format d'essai de 17g. Parfait pour un changement de litière. Découvrez pourquoi des milliers de propriétaires de chats adorent le pouvoir d'élimination des odeurs de Purrify.";
  const canonicalUrl = 'https://purrify.ca/fr/products/trial-size';

  const benefits = [
    "Parfait pour tester avec votre chat",
    "Suffisant pour un changement complet de litière",
    "Façon sans risque d'expérimenter Purrify",
    "Même formule puissante que les produits pleine grandeur",
    "Expédition rapide - essayez-le cette semaine"
  ];

  const testimonials = [
    {
      name: "Marie L.",
      text: "Le format d'essai m'a convaincue immédiatement. J'ai commandé le format économique le lendemain!",
      rating: 5
    },
    {
      name: "Jean-Pierre R.", 
      text: "Sceptique au début, mais l'essai a prouvé que ça fonctionne. Plus d'odeurs de litière.",
      rating: 5
    }
  ];

  return (
    <>
      <NextSeo
        title={pageTitle}
        description={pageDescription}
        canonical={canonicalUrl}
        openGraph={{
          title: pageTitle,
          description: pageDescription,
          url: canonicalUrl,
          type: 'product',
          images: [
            {
              url: 'https://purrify.ca/purrify-trial-17g.jpg',
              width: 1200,
              height: 630,
              alt: 'Purrify Format d\'Essai 17g'
            }
          ]
        }}
      />

      <main className="min-h-screen bg-gradient-to-br from-[#FFFFFF] via-[#FFFFF5] to-[#FFFFFF] dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
        {/* Breadcrumb Navigation */}
        <Container>
          <nav className="py-4 text-sm">
            <ol className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
              <li>
                <Link href="/fr" className="hover:text-[#FF3131] dark:hover:text-[#FF5050]">
                  Accueil
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/fr/#products" className="hover:text-[#FF3131] dark:hover:text-[#FF5050]">
                  Produits
                </Link>
              </li>
              <li>/</li>
              <li className="text-[#FF3131] dark:text-[#FF5050] font-medium">Format d'Essai</li>
            </ol>
          </nav>
        </Container>

        {/* Hero Section */}
        <section className="py-12">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Product Image */}
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-[#FF3131]/20 to-[#5B2EFF]/30 dark:from-[#FF5050]/10 dark:to-[#3694FF]/20 rounded-3xl blur-xl opacity-70"></div>
                <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl">
                  <NextImage
                    src="/purrify-trial-17g.jpg"
                    alt="Purrify Format d'Essai 17g"
                    width={400}
                    height={400}
                    className="w-full h-auto object-contain"
                  />
                  <div className="absolute top-4 right-4 bg-[#FF3131] text-white px-3 py-1 rounded-full text-sm font-bold">
                    FORMAT D'ESSAI
                  </div>
                </div>
              </div>

              {/* Product Details */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80 dark:from-[#FF5050] dark:to-[#FF5050]/80 bg-clip-text text-transparent">
                    Purrify Format d'Essai
                  </h1>
                  <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
                    Additif de Charbon Activé 17g pour Litière de Chat
                  </p>
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-gray-600 dark:text-gray-400">(127 avis)</span>
                  </div>
                  <div className="text-3xl font-bold text-[#5B2EFF] dark:text-[#3694FF] mb-6">
                    4,99$ CAD
                  </div>
                </div>

                {/* Benefits List */}
                <div className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-[#03E46A] flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="space-y-4">
                  <Button 
                    size="lg" 
                    className="w-full bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80 hover:from-[#FF3131]/90 hover:to-[#FF3131] text-white font-bold py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Acheter le Format d'Essai
                  </Button>
                  
                  <div className="flex space-x-3">
                    <Button variant="outline" size="lg" className="flex-1">
                      <Heart className="w-5 h-5 mr-2" />
                      Liste de Souhaits
                    </Button>
                    <Link href="/fr/customers/testimonials">
                      <Button variant="outline" size="lg" className="flex-1">
                        <Users className="w-5 h-5 mr-2" />
                        Lire les Avis
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Trust Indicators */}
                <div className="border-t pt-6 space-y-2">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Check className="w-4 h-4 text-[#03E46A] mr-2" />
                    Garantie de remboursement de 30 jours
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Check className="w-4 h-4 text-[#03E46A] mr-2" />
                    Livraison gratuite sur commandes de plus de 25$
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Check className="w-4 h-4 text-[#03E46A] mr-2" />
                    Expédié dans les 24 heures
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* How It Works Section */}
        <section className="py-16 bg-white/50 dark:bg-gray-800/50">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                Comment Fonctionne le Format d'Essai
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Parfait pour les nouveaux utilisateurs qui veulent tester l'efficacité de Purrify
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#FF3131] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">Commandez l'Essai</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Recevez votre format d'essai de 17g livré à votre porte
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-[#5B2EFF] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">Testez et Expérimentez</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Utilisez pour un changement complet de litière et voyez la différence
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-[#03E46A] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">Adorez et Recommandez</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Rejoignez des milliers de clients satisfaits avec une commande pleine grandeur
                </p>
              </div>
            </div>

            <div className="text-center mt-12">
              <Link href="/fr/learn/how-it-works">
                <Button variant="outline" size="lg">
                  En Savoir Plus sur le Fonctionnement de Purrify
                </Button>
              </Link>
            </div>
          </Container>
        </section>

        {/* Customer Testimonials */}
        <section className="py-16">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                Ce que Disent les Utilisateurs d'Essai
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">"{testimonial.text}"</p>
                  <p className="font-semibold text-gray-900 dark:text-gray-100">- {testimonial.name}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/fr/customers/testimonials">
                <Button variant="outline" size="lg">
                  Lire Toutes les Histoires de Clients
                </Button>
              </Link>
            </div>
          </Container>
        </section>

        {/* Related Products */}
        <section className="py-16 bg-white/50 dark:bg-gray-800/50">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                Prêt pour Plus?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Passez à nos produits pleine grandeur pour un contrôle continu des odeurs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center">
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">Format Standard</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">100g - Parfait pour usage régulier</p>
                <div className="text-2xl font-bold text-[#5B2EFF] dark:text-[#3694FF] mb-4">12,99$</div>
                <Button className="w-full">Voir Format Standard</Button>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center">
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">Format Économique</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">500g - Meilleure valeur pour plusieurs chats</p>
                <div className="text-2xl font-bold text-[#5B2EFF] dark:text-[#3694FF] mb-4">39,99$</div>
                <Button className="w-full">Voir Format Économique</Button>
              </div>
            </div>
          </Container>
        </section>

        {/* Back to Products */}
        <section className="py-8">
          <Container>
            <div className="text-center">
              <Link href="/fr/#products">
                <Button variant="outline" size="lg">
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Retour à Tous les Produits
                </Button>
              </Link>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}
