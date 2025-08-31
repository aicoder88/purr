import { NextSeo } from 'next-seo';
import { Container } from '../../../src/components/ui/container';
import { Button } from '../../../src/components/ui/button';
import { useTranslation } from '../../../src/lib/translation-context';
import { SITE_NAME } from '../../../src/lib/constants';
import NextImage from '../../../components/NextImage';
import Link from 'next/link';
import { ArrowLeft, Atom, Zap, Shield, Microscope, FlaskConical, CheckCircle } from 'lucide-react';

export default function SciencePageFR() {
  const { t, locale } = useTranslation();
  
  const pageTitle = `La Science Derrière ${SITE_NAME} - Technologie du Charbon Actif`;
  const pageDescription = "Découvrez comment la technologie du charbon actif de Purrify élimine les odeurs au niveau moléculaire. Apprenez la science qui rend notre additif pour litière si efficace.";
  const canonicalUrl = `https://purrify.ca/fr/learn/science`;

  const scienceFacts = [
    {
      icon: Atom,
      title: "Adsorption Moléculaire",
      description: "Le charbon actif possède des millions de pores microscopiques qui piègent les molécules d'odeur par adsorption physique et chimique, les éliminant définitivement de l'air."
    },
    {
      icon: Microscope,
      title: "Puissance de Surface",
      description: "Un seul gramme de charbon actif a une surface de 500-1500 mètres carrés - équivalent à 6-18 terrains de tennis de pouvoir anti-odeur."
    },
    {
      icon: Zap,
      title: "Action Instantanée",
      description: "Contrairement aux agents masquants qui couvrent les odeurs, le charbon actif capture et retient physiquement les molécules d'odeur, offrant des résultats immédiats et durables."
    },
    {
      icon: Shield,
      title: "Sûr et Naturel",
      description: "Fabriqué à partir de coques de noix de coco par chauffage contrôlé, notre charbon actif est complètement sûr pour les chats et les humains tout en étant écologique."
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Libération des Molécules d'Odeur",
      description: "Quand les chats utilisent la litière, l'ammoniac et d'autres composés odorants sont libérés dans l'air."
    },
    {
      step: "2", 
      title: "Activation du Charbon",
      description: "Les particules de charbon actif de Purrify commencent immédiatement à attirer ces molécules d'odeur vers leur surface poreuse."
    },
    {
      step: "3",
      title: "Capture Moléculaire",
      description: "Les molécules d'odeur sont piégées dans les pores microscopiques du charbon par les forces de van der Waals et les liaisons chimiques."
    },
    {
      step: "4",
      title: "Élimination Permanente",
      description: "Une fois capturées, les molécules d'odeur restent verrouillées dans la structure du charbon, éliminant les odeurs plutôt que de les masquer."
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
          type: 'article',
          images: [
            {
              url: 'https://purrify.ca/optimized/science-hero.webp',
              width: 1200,
              height: 630,
              alt: 'Science du Charbon Actif Purrify',
            },
          ],
        }}
      />

      <main className="min-h-screen bg-gradient-to-br from-[#FFFFFF] via-[#FFFFF5] to-[#FFFFFF] dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
        {/* Breadcrumb Navigation */}
        <Container className="pt-8">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <Link href="/fr/" className="hover:text-[#FF3131] dark:hover:text-[#FF5050]">
                  Accueil
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/fr/learn/how-it-works" className="hover:text-[#FF3131] dark:hover:text-[#FF5050]">
                  Apprendre
                </Link>
              </li>
              <li>/</li>
              <li className="text-[#FF3131] dark:text-[#FF5050] font-medium">Science</li>
            </ol>
          </nav>
        </Container>

        {/* Hero Section */}
        <section className="py-12">
          <Container>
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#FF3131] to-[#5B2EFF] rounded-full mb-6">
                <FlaskConical className="w-8 h-8 text-white dark:text-gray-100" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#FF3131] to-[#5B2EFF] bg-clip-text text-transparent">
                La Science Derrière Purrify
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Découvrez comment la technologie du charbon actif élimine les odeurs au niveau moléculaire, 
                offrant un contrôle supérieur des odeurs qui est à la fois sûr et efficace pour vos amis félins.
              </p>
              <Link href="/fr/products/trial-size">
                <Button size="lg" className="bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80 hover:from-[#FF3131]/90 hover:to-[#FF3131] text-white dark:text-gray-100 font-bold shadow-lg hover:shadow-xl transition-all duration-300">
                  Essayez la Science - 6,99$
                </Button>
              </Link>
            </div>
          </Container>
        </section>

        {/* Science Facts Grid */}
        <section className="py-16 bg-white/50 dark:bg-gray-800/20">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white dark:text-gray-100">
                Comment Fonctionne le Charbon Actif
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Comprendre la science moléculaire qui rend Purrify si efficace pour éliminer les odeurs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {scienceFacts.map((fact, index) => (
                <div 
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-r from-[#FF3131] to-[#5B2EFF] rounded-lg flex items-center justify-center">
                        <fact.icon className="w-6 h-6 text-white dark:text-gray-100" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white dark:text-gray-100">
                        {fact.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {fact.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Process Timeline */}
        <section className="py-16">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white dark:text-gray-100">
                Le Processus d'Élimination des Odeurs
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Suivez le parcours des molécules d'odeur de leur libération à leur élimination permanente.
              </p>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#FF3131] to-[#5B2EFF] rounded-full hidden md:block"></div>

              <div className="space-y-12">
                {processSteps.map((step, index) => (
                  <div 
                    key={index}
                    className={`flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col`}
                  >
                    <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                        <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white dark:text-gray-100">
                          {step.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>

                    {/* Step number */}
                    <div className="w-16 h-16 bg-gradient-to-r from-[#FF3131] to-[#5B2EFF] rounded-full flex items-center justify-center text-white dark:text-gray-100 font-bold text-xl shadow-lg z-10 my-4 md:my-0">
                      {step.step}
                    </div>

                    <div className="w-full md:w-5/12"></div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* Research & Testing */}
        <section className="py-16 bg-gradient-to-r from-[#5B2EFF] to-[#FF3131]">
          <Container>
            <div className="text-center text-white dark:text-gray-100">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Prouvé par la Science, Aimé par les Chats
              </h2>
              <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
                Notre formule de charbon actif a été testée et prouvée efficace pour éliminer 
                l'ammoniac, le sulfure d'hydrogène et autres odeurs communes de litière.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">99,9%</div>
                  <div className="text-lg opacity-90">Élimination des Odeurs</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">100%</div>
                  <div className="text-lg opacity-90">Sûr et Naturel</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">24/7</div>
                  <div className="text-lg opacity-90">Protection Continue</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/fr/products/trial-size">
                  <Button size="lg" className="bg-white text-[#5B2EFF] hover:bg-gray-100 font-bold">
                    Découvrez la Science
                  </Button>
                </Link>
                <Link href="/fr/learn/how-it-works">
                  <Button size="lg" variant="outline" className="border-white text-white dark:text-gray-100 hover:bg-white hover:text-[#5B2EFF] transition-colors">
                    En Savoir Plus
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* Back to Learn */}
        <section className="py-8 border-t border-gray-200 dark:border-gray-800">
          <Container>
            <Link 
              href="/fr/learn/how-it-works"
              className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour à Apprendre
            </Link>
          </Container>
        </section>
      </main>
    </>
  );
}
