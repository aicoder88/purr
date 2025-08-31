import { NextSeo } from 'next-seo';
import { Container } from '../../../src/components/ui/container';
import { Button } from '../../../src/components/ui/button';
import { useTranslation } from '../../../src/lib/translation-context';
import { SITE_NAME } from '../../../src/lib/constants';
import Link from 'next/link';
import { ArrowLeft, Star, Quote, Heart, Users, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export default function TestimonialsPageFR() {
  const { t, locale } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const pageTitle = `Témoignages Clients - ${SITE_NAME} Avis & Histoires de Succès`;
  const pageDescription = "Lisez de vrais témoignages clients et histoires de succès de propriétaires de chats qui ont expérimenté le pouvoir d'élimination des odeurs de Purrify. Voyez pourquoi des milliers font confiance à Purrify.";
  const canonicalUrl = 'https://purrify.ca/fr/customers/testimonials';

  const categories = [
    { id: 'all', name: 'Tous les Avis', count: 127 },
    { id: 'trial', name: 'Utilisateurs d\'Essai', count: 43 },
    { id: 'multiple-cats', name: 'Plusieurs Chats', count: 38 },
    { id: 'sensitive-cats', name: 'Chats Sensibles', count: 22 },
    { id: 'long-term', name: 'Utilisateurs Long-terme', count: 24 }
  ];

  const testimonials = [
    {
      id: 1,
      name: "Marie Dubois",
      location: "Montréal, QC",
      catNames: ["Moustache", "Luna"],
      rating: 5,
      category: ['trial', 'multiple-cats'],
      date: "2024-01-15",
      title: "Révolutionnaire pour notre foyer multi-chats!",
      text: "J'étais sceptique d'essayer un autre additif pour litière, mais le format d'essai m'a convaincue immédiatement. Nous avons deux chats et l'odeur de la litière devenait insupportable. En quelques heures après avoir ajouté Purrify, la différence était incroyable. J'ai commandé le format économique le lendemain même et je n'ai jamais regardé en arrière. Nos invités ne peuvent pas croire que nous avons des chats!",
      verified: true,
      helpful: 23,
      productUsed: "Format d'Essai → Format Économique"
    },
    {
      id: 2,
      name: "Jean-Pierre Tremblay",
      location: "Québec, QC",
      catNames: ["Ombre"],
      rating: 5,
      category: ['sensitive-cats', 'long-term'],
      date: "2023-11-08",
      title: "Parfait pour mon chat sensible",
      text: "Ombre a toujours été très particulier concernant sa litière. Tout changement d'odeur ou de texture et il l'évite complètement. J'étais inquiet d'ajouter quelque chose de nouveau, mais Purrify est complètement inodore et ne change pas la texture de la litière du tout. Il n'a même pas remarqué que c'était là, mais moi si! Plus de surprises matinales de litière.",
      verified: true,
      helpful: 18,
      productUsed: "Format Standard"
    },
    {
      id: 3,
      name: "Sylvie Lavoie",
      location: "Gatineau, QC",
      catNames: ["Mitaines", "Bottes", "Chaussettes"],
      rating: 5,
      category: ['multiple-cats', 'long-term'],
      date: "2023-09-22",
      title: "Trois chats, zéro odeur!",
      text: "Avec trois chats d'intérieur, notre maison commençait à sentir peu importe à quelle fréquence je nettoyais les litières. Une amie a recommandé Purrify et je suis si reconnaissante! Je l'utilise dans les trois bacs et la différence est du jour à la nuit. Même ma belle-mère, qui a le nez le plus sensible, ne peut pas dire que nous avons des chats quand elle visite.",
      verified: true,
      helpful: 31,
      productUsed: "Format Économique"
    },
    {
      id: 4,
      name: "François Leblanc",
      location: "Sherbrooke, QC",
      catNames: ["Gingembre"],
      rating: 5,
      category: ['trial'],
      date: "2024-02-03",
      title: "Sceptique devenu croyant",
      text: "Je serai honnête - je pensais que c'était juste un autre gadget. Mais ma femme a insisté pour qu'on essaie le format d'essai après avoir lu des avis en ligne. Je mange mes mots maintenant! La science fonctionne vraiment. Vous pouvez littéralement sentir la différence dès le premier jour. Nous sommes clients à vie maintenant.",
      verified: true,
      helpful: 15,
      productUsed: "Format d'Essai"
    },
    {
      id: 5,
      name: "Isabelle Martin",
      location: "Trois-Rivières, QC",
      catNames: ["Cléo"],
      rating: 5,
      category: ['sensitive-cats'],
      date: "2024-01-28",
      title: "Plus d'odeurs embarrassantes",
      text: "Je travaille de la maison et j'étais si embarrassée quand les clients venaient à cause de l'odeur de la litière. Cléo est très sensible aux parfums, donc la plupart des produits étaient hors de question. Purrify a été révolutionnaire - complètement naturel, aucun parfum, et ça fonctionne vraiment! Je peux avoir des réunions à la maison à nouveau sans souci.",
      verified: true,
      helpful: 27,
      productUsed: "Format Standard"
    },
    {
      id: 6,
      name: "Alain Côté",
      location: "Rimouski, QC",
      catNames: ["Max", "Ruby"],
      rating: 5,
      category: ['multiple-cats', 'long-term'],
      date: "2023-08-14",
      title: "Meilleur investissement pour propriétaires de chats",
      text: "Après 6 mois d'utilisation de Purrify, je peux dire avec confiance que c'est le meilleur argent que j'ai dépensé sur des fournitures pour chats. Deux chats dans un petit appartement signifiait auparavant une gestion constante des odeurs. Maintenant je saupoudre juste Purrify quand je change la litière et j'oublie complètement les odeurs. Mon appartement sent vraiment frais à nouveau!",
      verified: true,
      helpful: 19,
      productUsed: "Format Standard"
    },
    {
      id: 7,
      name: "Nathalie Bouchard",
      location: "Chicoutimi, QC",
      catNames: ["Fumée"],
      rating: 5,
      category: ['trial', 'long-term'],
      date: "2023-12-10",
      title: "D'essai à client fidèle",
      text: "J'ai commencé avec le format d'essai juste pour le tester. Fumée peut être capricieux concernant les changements à sa routine, mais il n'a pas dérangé Purrify du tout. Le contrôle des odeurs était si impressionnant que j'ai immédiatement commandé le format économique. Huit mois plus tard, je suis encore émerveillée de voir à quel point ça fonctionne bien. Je ne retournerai jamais à la litière ordinaire seule.",
      verified: true,
      helpful: 22,
      productUsed: "Format d'Essai → Format Économique"
    },
    {
      id: 8,
      name: "Pierre Gagnon",
      location: "Saguenay, QC",
      catNames: ["Luna", "Étoile"],
      rating: 5,
      category: ['multiple-cats'],
      date: "2024-01-05",
      title: "Enfin trouvé quelque chose qui fonctionne",
      text: "J'ai tout essayé - différentes litières, purificateurs d'air, bicarbonate de soude, vous nommez. Rien ne fonctionnait pour notre foyer à deux chats jusqu'à Purrify. La technologie de charbon activé piège vraiment les molécules d'odeur au lieu de juste les masquer. C'est de la science qui fonctionne! Notre maison sent enfin comme une maison, pas comme une litière.",
      verified: true,
      helpful: 25,
      productUsed: "Format Standard"
    }
  ];

  const filteredTestimonials = selectedCategory === 'all' 
    ? testimonials 
    : testimonials.filter(testimonial => testimonial.category.includes(selectedCategory));

  const stats = [
    { number: "4,9/5", label: "Note Moyenne", icon: Star },
    { number: "127+", label: "Avis Vérifiés", icon: Users },
    { number: "98%", label: "Recommanderaient", icon: Heart },
    { number: "24h", label: "Temps Moyen de Résultats", icon: Quote }
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
          type: 'website',
          images: [
            {
              url: 'https://purrify.ca/customer-testimonials-hero.jpg',
              width: 1200,
              height: 630,
              alt: 'Clients Purrify Heureux et Leurs Chats'
            }
          ]
        }}
      />

      <main className="min-h-screen bg-gradient-to-br from-[#FFFFFF] via-[#FFFFF5] to-[#FFFFFF] dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
        {/* Breadcrumb Navigation */}
        <Container>
          <nav className="py-4 text-sm">
            <ol className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 dark:text-gray-400">
              <li>
                <Link href="/fr" className="hover:text-[#FF3131] dark:hover:text-[#FF5050]">
                  Accueil
                </Link>
              </li>
              <li>/</li>
              <li>
                <span className="hover:text-[#FF3131] dark:hover:text-[#FF5050]">
                  Clients
                </span>
              </li>
              <li>/</li>
              <li className="text-[#FF3131] dark:text-[#FF5050] font-medium">Témoignages</li>
            </ol>
          </nav>
        </Container>

        {/* Hero Section */}
        <section className="py-16">
          <Container>
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#FF3131] to-[#5B2EFF] dark:from-[#FF5050] dark:to-[#3694FF] bg-clip-text text-transparent">
                Vraies Histoires, Vrais Résultats
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 leading-relaxed">
                Découvrez pourquoi des milliers de propriétaires de chats font confiance à Purrify pour éliminer les odeurs de litière. 
                Lisez des témoignages authentiques de clients qui ont expérimenté la différence.
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-[#FF3131] to-[#5B2EFF] rounded-full flex items-center justify-center mx-auto mb-4">
                      <stat.icon className="w-8 h-8 text-white dark:text-gray-100 dark:text-gray-100" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-gray-50 dark:text-gray-100 mb-2">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* Category Filter */}
        <section className="py-8 bg-white/50 dark:bg-gray-800/50">
          <Container>
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-[#FF3131] text-white dark:text-gray-100 shadow-lg'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-[#FF3131]/10 dark:hover:bg-[#FF5050]/10 border border-gray-200 dark:border-gray-700'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </Container>
        </section>

        {/* Testimonials Grid */}
        <section className="py-16">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTestimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400 dark:text-yellow-300" />
                        ))}
                      </div>
                      <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-1">
                        {testimonial.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {testimonial.name} • {testimonial.location}
                      </p>
                    </div>
                    {testimonial.verified && (
                      <div className="bg-[#03E46A] text-white dark:text-gray-100 px-2 py-1 rounded-full text-xs font-medium">
                        Vérifié
                      </div>
                    )}
                  </div>

                  {/* Quote */}
                  <div className="relative mb-6">
                    <Quote className="absolute -top-2 -left-2 w-8 h-8 text-[#FF3131]/20 dark:text-[#FF5050]/20" />
                    <p className="text-gray-700 dark:text-gray-200 dark:text-gray-300 leading-relaxed pl-6">
                      "{testimonial.text}"
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="border-t pt-4 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        Chat(s): {testimonial.catNames.join(', ')}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400 dark:text-gray-400">
                        {new Date(testimonial.date).toLocaleDateString('fr-CA')}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#5B2EFF] dark:text-[#3694FF] font-medium">
                        Utilisé: {testimonial.productUsed}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400">
                        {testimonial.helpful} trouvent utile
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-white/50 dark:bg-gray-800/50">
          <Container>
            <div className="bg-gradient-to-r from-[#5B2EFF] to-[#03E46A] dark:from-[#3694FF] dark:to-[#FF5050] rounded-3xl p-12 text-center text-white dark:text-gray-100">
              <h2 className="text-4xl font-bold mb-4">
                Prêt à Rejoindre Nos Clients Heureux?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Expérimentez les mêmes résultats d'élimination des odeurs dont nos clients raffolent
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/fr/products/trial-size">
                  <Button size="lg" className="bg-white text-[#5B2EFF] hover:bg-gray-100 font-bold">
                    Commencez avec le Format d'Essai - 4,99$
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="/fr/#products">
                  <Button size="lg" variant="outline" className="border-white text-white dark:text-gray-100 hover:bg-white hover:text-gray-900 transition-colors">
                    Voir Tous les Produits
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
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                Partagez Votre Histoire Purrify
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Avez-vous expérimenté de grands résultats avec Purrify? Nous aimerions vous entendre!
              </p>
              <Link href="/fr/support/contact">
                <Button size="lg" variant="outline">
                  Soumettez Votre Avis
                </Button>
              </Link>
            </div>
          </Container>
        </section>

        {/* Back Navigation */}
        <section className="py-8">
          <Container>
            <div className="text-center">
              <Link href="/fr/#testimonials">
                <Button variant="outline" size="lg">
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Retour à l'Accueil
                </Button>
              </Link>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}
