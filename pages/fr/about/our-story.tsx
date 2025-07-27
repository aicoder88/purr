import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Container } from '../../../src/components/ui/container';
import { Button } from '../../../src/components/ui/button';
import { 
  Heart, 
  Users, 
  Award, 
  Target,
  Lightbulb,
  Leaf,
  ChevronRight,
  Home,
  Calendar,
  MapPin,
  Mail,
  Shield,
  Zap
} from 'lucide-react';

const OurStoryPage: NextPage = () => {
  const milestones = [
    {
      year: "2019",
      title: "Le Problème Découvert",
      description: "Notre fondatrice, propriétaire de plusieurs chats, luttait contre les odeurs persistantes du bac à litière malgré avoir essayé tous les produits sur le marché.",
      icon: Lightbulb
    },
    {
      year: "2020",
      title: "Recherche et Développement",
      description: "Partenariat avec des scientifiques des matériaux pour développer une formule de charbon actif spécialement conçue pour l'élimination des odeurs de litière pour chat.",
      icon: Target
    },
    {
      year: "2021",
      title: "Premier Prototype",
      description: "Création du premier prototype Purrify et test avec des propriétaires de chats locaux. Les résultats ont dépassé toutes les attentes avec 95% de réduction d'odeurs.",
      icon: Zap
    },
    {
      year: "2022",
      title: "Lancement du Produit",
      description: "Lancement officiel de Purrify à travers le Canada, aidant des milliers de propriétaires de chats à créer des maisons plus fraîches et propres.",
      icon: Award
    },
    {
      year: "2023",
      title: "Expansion et Croissance",
      description: "Expansion de la gamme de produits avec plusieurs tailles et début de l'expédition internationale pour servir les propriétaires de chats mondialement.",
      icon: Users
    },
    {
      year: "2024",
      title: "Focus sur la Durabilité",
      description: "Lancement d'emballages écologiques et d'expédition neutre en carbone, renforçant notre engagement envers la responsabilité environnementale.",
      icon: Leaf
    }
  ];

  const values = [
    {
      icon: Heart,
      title: "Philosophie Animaux d'Abord",
      description: "Chaque décision que nous prenons considère d'abord la santé et le bonheur des chats et de leurs familles."
    },
    {
      icon: Shield,
      title: "Sécurité et Qualité",
      description: "Tous les produits subissent des tests rigoureux pour s'assurer qu'ils sont sécuritaires pour les animaux, les familles et l'environnement."
    },
    {
      icon: Leaf,
      title: "Responsabilité Environnementale",
      description: "Nous nous engageons à des pratiques durables et à réduire notre empreinte environnementale à chaque étape."
    },
    {
      icon: Users,
      title: "Succès Client",
      description: "Notre succès se mesure par la satisfaction et l'amélioration de la qualité de vie de nos clients et de leurs animaux."
    }
  ];

  const team = [
    {
      name: "Sarah Chen",
      role: "Fondatrice et PDG",
      bio: "Amoureuse des chats depuis toujours avec une formation en sciences environnementales. La lutte personnelle de Sarah contre les odeurs de litière a mené à la création de Purrify.",
      location: "Toronto, ON"
    },
    {
      name: "Dr. Michael Rodriguez",
      role: "Directeur Scientifique en Chef",
      bio: "Scientifique des matériaux avec plus de 15 ans d'expérience en technologie du charbon actif. Dirige notre développement de produits et assurance qualité.",
      location: "Vancouver, BC"
    },
    {
      name: "Emma Thompson",
      role: "Directrice de l'Expérience Client",
      bio: "Ancienne technicienne vétérinaire passionnée par l'amélioration de la vie des animaux et de leurs familles grâce à de meilleurs produits.",
      location: "Montréal, QC"
    },
    {
      name: "David Kim",
      role: "Directeur des Opérations",
      bio: "Expert en chaîne d'approvisionnement s'assurant que chaque commande Purrify soit traitée rapidement et livrée de manière fiable à travers le Canada et au-delà.",
      location: "Calgary, AB"
    }
  ];

  const stats = [
    {
      number: "50 000+",
      label: "Clients Satisfaits",
      description: "Propriétaires de chats à travers le Canada et internationalement"
    },
    {
      number: "98%",
      label: "Taux de Satisfaction",
      description: "Clients qui recommanderaient Purrify"
    },
    {
      number: "2M+",
      label: "Changements de Litière Améliorés",
      description: "Changements de bac à litière estimés rendus meilleurs"
    },
    {
      number: "500T",
      label: "CO2 Compensé",
      description: "Grâce au programme d'expédition neutre en carbone"
    }
  ];

  return (
    <>
      <Head>
        <title>Notre Histoire - La Mission Derrière l'Additif de Litière Purrify | Purrify</title>
        <meta 
          name="description" 
          content="Découvrez l'histoire fondatrice de Purrify, notre mission, et l'équipe dédiée à résoudre les problèmes d'odeur de litière pour chat. Notre engagement envers les animaux, les familles et l'environnement." 
        />
        <meta name="keywords" content="histoire Purrify, mission entreprise, innovation litière chat, soins animaux, responsabilité environnementale, entreprise canadienne" />
        <link rel="canonical" href="https://purrify.com/fr/about/our-story" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Notre Histoire - La Mission Derrière Purrify" />
        <meta property="og:description" content="Découvrez l'histoire derrière Purrify et notre mission d'aider les propriétaires de chats à créer des maisons plus fraîches et propres." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://purrify.com/fr/about/our-story" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AboutPage",
              "name": "Notre Histoire",
              "description": "L'histoire derrière l'additif de litière pour chat Purrify et notre mission d'aider les propriétaires de chats à créer des maisons plus fraîches et propres.",
              "url": "https://purrify.com/fr/about/our-story",
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
              <span className="text-gray-900 dark:text-gray-100">À Propos</span>
              <span>/</span>
              <span className="text-gray-900 dark:text-gray-100">Notre Histoire</span>
            </nav>
          </Container>
        </section>

        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-[#5B2EFF] to-[#FF3131]">
          <Container>
            <div className="text-center text-white max-w-4xl mx-auto">
              <Heart className="w-16 h-16 mx-auto mb-6 opacity-90" />
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Notre Histoire
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Née de la frustration d'un propriétaire de chat, devenue une mission pour aider les familles partout
              </p>
              <p className="text-lg opacity-80 max-w-2xl mx-auto">
                Ce qui a commencé comme la lutte d'une personne contre les odeurs persistantes de bac à litière est devenu 
                une histoire de succès canadienne, aidant plus de 50 000 propriétaires de chats à créer des maisons plus fraîches et propres.
              </p>
            </div>
          </Container>
        </section>

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

        {/* Company Timeline */}
        <section className="py-16 bg-[#E0EFC7]/30 dark:bg-gray-800/50">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                Notre Parcours
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Du problème à la solution: la chronologie Purrify
              </p>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-[#5B2EFF] hidden lg:block"></div>
              
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div key={index} className={`flex flex-col lg:flex-row items-center gap-8 ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}>
                    {/* Content */}
                    <div className="lg:w-1/2">
                      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-[#E0EFC7] dark:border-gray-700">
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 bg-[#5B2EFF] rounded-full flex items-center justify-center mr-4">
                            <milestone.icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-[#FF3131]">{milestone.year}</div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                              {milestone.title}
                            </h3>
                          </div>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300">
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                    
                    {/* Timeline dot */}
                    <div className="hidden lg:block w-6 h-6 bg-[#FF3131] rounded-full border-4 border-white dark:border-gray-900 z-10"></div>
                    
                    {/* Spacer */}
                    <div className="lg:w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* Company Values */}
        <section className="py-16">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                Nos Valeurs
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Les principes qui guident tout ce que nous faisons
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <div key={index} className="text-center bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-[#E0EFC7] dark:border-gray-700">
                  <div className="w-16 h-16 bg-[#5B2EFF] rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-[#E0EFC7]/30 dark:bg-gray-800/50">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                Rencontrez Notre Équipe
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Les personnes passionnées derrière le succès de Purrify
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-[#E0EFC7] dark:border-gray-700 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#5B2EFF] to-[#FF3131] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-1 text-gray-900 dark:text-gray-100">
                    {member.name}
                  </h3>
                  <p className="text-[#5B2EFF] font-semibold mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                    {member.bio}
                  </p>
                  <div className="flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm">
                    <MapPin className="w-4 h-4 mr-1" />
                    {member.location}
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Stats Section */}
        <section className="py-16">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                Notre Impact
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                La différence que nous avons faite ensemble
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-[#E0EFC7] dark:border-gray-700">
                  <div className="text-4xl font-bold text-[#FF3131] mb-2">
                    {stat.number}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                    {stat.label}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {stat.description}
                  </p>
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
                  <Button size="lg" variant="outline" className="border-white text-gray-900 dark:text-white hover:bg-white hover:text-gray-900 transition-colors">
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
                  <Button className="bg-[#5B2EFF] hover:bg-[#5B2EFF]/90 text-white">
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
      </main>
    </>
  );
};

export default OurStoryPage;
