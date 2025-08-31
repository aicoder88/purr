import { NextPage } from 'next';
import Link from 'next/link';
import { Container } from '../../../src/components/ui/container';
import { Button } from '../../../src/components/ui/button';
import { LocalizedMeta } from '../../../src/components/seo/LocalizedMeta';
import { PageLayout } from '../../../src/components/layout/PageLayout';
import { Breadcrumbs } from '../../../src/components/layout/Breadcrumbs';
import { HeroSection } from '../../../src/components/layout/HeroSection';
import { TimelineSection } from '../../../src/components/sections/timeline/TimelineSection';
import { GridSection } from '../../../src/components/sections/grid/GridSection';
import { frStoryData } from '../../../src/lib/page-data';
import { 
  Heart, 
  Users, 
  ChevronRight,
  Mail,
  MapPin
} from 'lucide-react';

const OurStoryPage: NextPage = () => {
  const { milestones, values, team, stats } = frStoryData;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "Notre Histoire",
    "description": "L'histoire derrière l'additif de litière pour chat Purrify et notre mission d'aider les propriétaires de chats à créer des maisons plus fraîches et propres.",
    "url": "https://purrify.ca/fr/about/our-story",
    "inLanguage": "fr",
    "mainEntity": {
      "@type": "Organization",
      "name": "Purrify",
      "description": "Entreprise canadienne créant des additifs innovants de litière pour chat pour l'élimination d'odeurs",
      "foundingDate": "2019",
      "founders": [
        {
          "@type": "Person",
          "name": "Sarah Chen"
        }
      ]
    }
  };

  return (
    <>
      <LocalizedMeta
        title="Notre Histoire - La Mission Derrière l'Additif de Litière Purrify | Purrify"
        description="Découvrez l'histoire fondatrice de Purrify, notre mission, et l'équipe dédiée à résoudre les problèmes d'odeur de litière pour chat. Notre engagement envers les animaux, les familles et l'environnement."
        keywords="histoire Purrify, mission entreprise, innovation litière chat, soins animaux, responsabilité environnementale, entreprise canadienne"
        canonicalPath="/about/our-story"
        ogTitle="Notre Histoire - La Mission Derrière Purrify"
        ogDescription="Découvrez l'histoire derrière Purrify et notre mission d'aider les propriétaires de chats à créer des maisons plus fraîches et propres."
        structuredData={structuredData}
      />

      <PageLayout>
        <Breadcrumbs 
          items={[
            { label: "À Propos" },
            { label: "Notre Histoire" }
          ]} 
        />

        <HeroSection
          icon={Heart}
          title="Notre Histoire"
          subtitle="Née de la frustration d'un propriétaire de chat, devenue une mission pour aider les familles partout"
          description="Ce qui a commencé comme la lutte d'une personne contre les odeurs persistantes de bac à litière est devenu une histoire de succès canadienne, aidant plus de 50 000 propriétaires de chats à créer des maisons plus fraîches et propres."
        />

        {/* Mission Statement */}
        <section className="py-16">
          <Container>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-gray-100">
                Notre Mission
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Révolutionner l'expérience de propriété de chat en créant des produits innovants, sécuritaires et 
                environnementalement responsables qui éliminent les odeurs, réduisent les déchets, et renforcent le lien 
                entre les chats et leurs familles.
              </p>
              <div className="bg-[#E0EFC7]/30 dark:bg-gray-800/50 rounded-xl p-8">
                <p className="text-lg text-gray-700 dark:text-gray-300 italic">
                  "Nous croyons que chaque chat mérite un environnement propre et confortable, et chaque famille mérite 
                  de profiter de sa maison sans compromis. C'est pourquoi nous nous dédions à créer des produits qui 
                  fonctionnent mieux, durent plus longtemps, et respectent notre planète."
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                  — Sarah Chen, Fondatrice et PDG
                </p>
              </div>
            </div>
          </Container>
        </section>

        <TimelineSection
          title="Notre Parcours"
          subtitle="Du problème à la solution: la chronologie Purrify"
          items={milestones}
        />

        <GridSection
          title="Nos Valeurs"
          subtitle="Les principes qui guident tout ce que nous faisons"
          items={values}
          columns={4}
        />

        <GridSection
          title="Rencontrez Notre Équipe"
          subtitle="Les personnes passionnées derrière le succès de Purrify"
          items={team}
          columns={4}
          className="py-16 bg-[#E0EFC7]/30 dark:bg-gray-800/50"
          renderItem={(member, index) => {
            const teamMember = member as { name: string; role: string; bio: string; location: string };
            return (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-[#E0EFC7] dark:border-gray-700 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-[#5B2EFF] to-[#FF3131] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-10 h-10 text-white dark:text-white dark:text-gray-100" />
                </div>
                <h3 className="text-xl font-bold mb-1 text-gray-900 dark:text-gray-100">
                  {teamMember.name}
                </h3>
                <p className="text-[#5B2EFF] font-semibold mb-3">
                  {teamMember.role}
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                  {teamMember.bio}
                </p>
                <div className="flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm">
                  <MapPin className="w-4 h-4 mr-1" />
                  {teamMember.location}
                </div>
              </div>
            );
          }}
        />

        <GridSection
          title="Notre Impact"
          subtitle="La différence que nous avons faite ensemble"
          items={stats}
          columns={4}
          renderItem={(stat, index) => {
            const statItem = stat as { number: string; label: string; description: string };
            return (
              <div key={index} className="text-center bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-[#E0EFC7] dark:border-gray-700">
                <div className="text-4xl font-bold text-[#FF3131] mb-2">
                  {statItem.number}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                  {statItem.label}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {statItem.description}
                </p>
              </div>
            );
          }}
        />

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-[#5B2EFF] to-[#FF3131]">
          <Container>
            <div className="text-center text-white dark:text-white dark:text-gray-100 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Rejoignez Notre Histoire
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Devenez partie de la famille Purrify et découvrez la différence que la passion, 
                l'innovation et un véritable soin peuvent faire dans votre maison.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/fr/products/trial-size">
                  <Button size="lg" className="bg-white text-[#5B2EFF] hover:bg-gray-100 font-bold">
                    Essayez Purrify Aujourd'hui - 4,99$
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="/fr/support/contact">
                  <Button size="lg" variant="outline" className="border-white text-gray-900 dark:text-white dark:text-gray-100 hover:bg-white hover:text-gray-900 transition-colors">
                    Contactez-Nous
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* Contact Info */}
        <section className="py-16">
          <Container>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-gray-100">
                Connectez-Vous Avec Nous
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Nous adorons entendre de nos clients et des amoureux de chats. 
                Partagez votre histoire, posez des questions, ou dites simplement bonjour!
              </p>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-[#E0EFC7] dark:border-gray-700">
                <div className="flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-[#5B2EFF] mr-3" />
                  <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    hello@purrify.com
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Nous répondons généralement dans les 24 heures
                </p>
                <Link href="/fr/support/contact">
                  <Button className="bg-[#5B2EFF] hover:bg-[#5B2EFF]/90 text-white dark:text-white dark:text-gray-100">
                    Contactez-Nous
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* Related Pages */}
        <section className="py-16 bg-[#E0EFC7]/30 dark:bg-gray-800/50">
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
                    Découvrez la science et l'innovation derrière notre technologie au charbon actif.
                  </p>
                </div>
              </Link>
              
              <Link href="/fr/customers/testimonials" className="group">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-[#E0EFC7] dark:border-gray-700 hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100 group-hover:text-[#5B2EFF] transition-colors">
                    Histoires de Clients
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Lisez les expériences réelles de propriétaires de chats qui ont transformé leurs maisons avec Purrify.
                  </p>
                </div>
              </Link>
              
              <Link href="/fr/products/compare" className="group">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-[#E0EFC7] dark:border-gray-700 hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100 group-hover:text-[#5B2EFF] transition-colors">
                    Trouvez Votre Taille Parfaite
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Comparez nos options de produits et trouvez la taille Purrify idéale pour votre foyer.
                  </p>
                </div>
              </Link>
            </div>
          </Container>
        </section>
      </PageLayout>
    </>
  );
};

export default OurStoryPage;
