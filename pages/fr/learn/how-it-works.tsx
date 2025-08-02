import { NextSeo } from "next-seo";
import { Container } from "../../../src/components/ui/container";
import { Button } from "../../../src/components/ui/button";
import { useTranslation } from "../../../src/lib/translation-context";
import { SITE_NAME } from "../../../src/lib/constants";
import NextImage from "../../../components/NextImage";
import Link from "next/link";
import {
  ArrowLeft,
  Microscope,
  Zap,
  Shield,
  Leaf,
  ChevronRight,
} from "lucide-react";

export default function HowItWorksPageFR() {
  const { t, locale } = useTranslation();

  const pageTitle = `Comment Fonctionne Purrify - ${SITE_NAME} Science du Charbon Activé`;
  const pageDescription =
    "Découvrez la science derrière la technologie de charbon activé de Purrify. Apprenez comment les micropores piègent les molécules d'odeur à la source pour un contrôle supérieur des odeurs de litière.";
  const canonicalUrl = "https://purrify.ca/fr/learn/how-it-works";

  const sciencePoints = [
    {
      icon: Microscope,
      title: "Structure du Charbon Activé",
      description:
        "Notre charbon activé contient des millions de pores microscopiques qui créent une surface énorme - jusqu'à 1 500 mètres carrés par gramme.",
      detail:
        "Ces pores sont spécifiquement dimensionnés pour piéger les molécules d'odeur tout en permettant à l'air de circuler librement dans la litière de votre chat.",
    },
    {
      icon: Zap,
      title: "Adsorption Moléculaire",
      description:
        "Les molécules d'odeur sont physiquement piégées dans la structure poreuse du charbon par un processus appelé adsorption.",
      detail:
        "Contrairement aux désodorisants qui masquent les odeurs, Purrify capture et retient réellement les molécules d'odeur, les empêchant d'atteindre votre nez.",
    },
    {
      icon: Shield,
      title: "Protection Durable",
      description:
        "Une fois piégées, les molécules d'odeur restent enfermées dans la structure du charbon jusqu'au changement de litière.",
      detail:
        "Cela fournit un contrôle continu des odeurs sans besoin de réapplication fréquente ou d'additifs chimiques.",
    },
    {
      icon: Leaf,
      title: "Naturel et Sûr",
      description:
        "Fabriqué à partir de coques de noix de coco, notre charbon activé est complètement naturel et sûr pour les chats et les humains.",
      detail:
        "Aucun produit chimique, parfum ou additif artificiel - juste du charbon activé pur faisant ce que la nature a prévu.",
    },
  ];

  const steps = [
    {
      number: "1",
      title: "Saupoudrez Purrify",
      description:
        "Ajoutez une fine couche de Purrify sur le dessus de la litière fraîche ou existante",
      image: "/optimized/panel_1.webp",
      tip: "Un peu suffit - seulement 1-2 cuillères à thé par changement de litière",
    },
    {
      number: "2",
      title: "Mélangez Délicatement",
      description:
        "Mélangez légèrement Purrify dans la couche supérieure de litière",
      image: "/optimized/panel_2.webp",
      tip: "Pas besoin de mélanger complètement - la couverture de surface est plus efficace",
    },
    {
      number: "3",
      title: "Profitez de la Fraîcheur",
      description: "Expérimentez un contrôle des odeurs immédiat et durable",
      image: "/optimized/panel_3.webp",
      tip: "Réappliquez lors de l'ajout de litière fraîche ou d'un changement complet",
    },
  ];

  const faqs = [
    {
      question: "À quelle vitesse Purrify commence-t-il à fonctionner?",
      answer:
        "Purrify commence à piéger les molécules d'odeur immédiatement au contact. La plupart des clients remarquent une réduction significative des odeurs dans les premières heures d'application.",
    },
    {
      question: "Le charbon activé est-il sûr si mon chat l'ingère?",
      answer:
        "Oui, le charbon activé est complètement sûr pour les chats. Il est même utilisé en médecine vétérinaire pour traiter les empoisonnements. Cependant, Purrify est conçu pour rester dans la litière, pas pour être consommé.",
    },
    {
      question: "Comment cela se compare-t-il au bicarbonate de soude?",
      answer:
        "Alors que le bicarbonate de soude neutralise les acides, le charbon activé piège physiquement une gamme beaucoup plus large de molécules d'odeur. Le charbon est plus efficace et dure plus longtemps que le bicarbonate de soude.",
    },
    {
      question: "Cela affectera-t-il les habitudes de litière de mon chat?",
      answer:
        "Non, Purrify est inodore et ne change pas la texture ou la sensation de la litière de votre chat. La plupart des chats ne remarquent même pas qu'il est là.",
    },
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
          type: "article",
          images: [
            {
              url: "https://purrify.ca/micropores_magnified_view.jpeg",
              width: 1200,
              height: 630,
              alt: "Micropores de Charbon Activé Sous Grossissement",
            },
          ],
        }}
      />

      <main className="min-h-screen bg-gradient-to-br from-[#FFFFFF] via-[#FFFFF5] to-[#FFFFFF] dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
        {/* Breadcrumb Navigation */}
        <Container>
          <nav className="py-4 text-sm">
            <ol className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
              <li>
                <Link
                  href="/fr"
                  className="hover:text-[#FF3131] dark:hover:text-[#FF5050]"
                >
                  Accueil
                </Link>
              </li>
              <li>/</li>
              <li>
                <span className="hover:text-[#FF3131] dark:hover:text-[#FF5050]">
                  Apprendre
                </span>
              </li>
              <li>/</li>
              <li className="text-[#FF3131] dark:text-[#FF5050] font-medium">
                Comment Ça Fonctionne
              </li>
            </ol>
          </nav>
        </Container>

        {/* Hero Section */}
        <section className="py-16">
          <Container>
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#FF3131] to-[#5B2EFF] dark:from-[#FF5050] dark:to-[#3694FF] bg-clip-text text-transparent">
                La Science Derrière Purrify
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Découvrez comment la technologie du charbon activé élimine les
                odeurs au niveau moléculaire, fournissant un contrôle supérieur
                des odeurs pour la litière de votre chat.
              </p>
              <div className="relative max-w-2xl mx-auto">
                <div className="absolute -inset-4 bg-gradient-to-r from-[#FF3131]/20 to-[#5B2EFF]/30 dark:from-[#FF5050]/10 dark:to-[#3694FF]/20 rounded-3xl blur-xl opacity-70"></div>
                <div className="relative">
                  <NextImage
                    src="/micropores_magnified_view.jpeg"
                    alt="Micropores de Charbon Activé Sous Grossissement"
                    width={600}
                    height={400}
                    className="w-full h-auto rounded-2xl shadow-2xl"
                  />
                  <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-lg text-sm">
                    Micropores grossis 1000x
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Science Explanation */}
        <section className="py-16 bg-white/50 dark:bg-gray-800/50">
          <Container>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                Comment Fonctionne le Charbon Activé
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Comprendre la science moléculaire qui rend Purrify si efficace
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {sciencePoints.map((point, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-r from-[#FF3131] to-[#5B2EFF] rounded-xl flex items-center justify-center">
                        <point.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">
                        {point.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                        {point.description}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                        {point.detail}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Step-by-Step Usage */}
        <section className="py-16">
          <Container>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                Comment Utiliser Purrify
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Étapes simples pour une efficacité maximale du contrôle des
                odeurs
              </p>
            </div>

            <div className="space-y-16">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}
                >
                  <div
                    className={`space-y-6 ${index % 2 === 1 ? "lg:col-start-2" : ""}`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-[#FF3131] to-[#5B2EFF] rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-2xl">
                          {step.number}
                        </span>
                      </div>
                      <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                      {step.description}
                    </p>
                    <div className="bg-[#E0EFC7]/50 dark:bg-gray-700/50 p-4 rounded-xl">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        💡 <strong>Conseil Pro:</strong> {step.tip}
                      </p>
                    </div>
                  </div>
                  <div className={`${index % 2 === 1 ? "lg:col-start-1" : ""}`}>
                    <div className="relative">
                      <div className="absolute -inset-4 bg-gradient-to-r from-[#FF3131]/20 to-[#5B2EFF]/30 dark:from-[#FF5050]/10 dark:to-[#3694FF]/20 rounded-3xl blur-xl opacity-70"></div>
                      <div className="relative">
                        <NextImage
                          src={step.image}
                          alt={step.title}
                          width={500}
                          height={400}
                          className="w-full h-auto rounded-2xl shadow-2xl"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white/50 dark:bg-gray-800/50">
          <Container>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                Questions Communes
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Tout ce que vous devez savoir sur la technologie du charbon
                activé
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
                >
                  <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-gray-100">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Avez-vous plus de questions sur le fonctionnement de Purrify?
              </p>
              <Link href="/fr/support/contact">
                <Button size="lg" variant="outline">
                  Contactez Nos Experts
                </Button>
              </Link>
            </div>
          </Container>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <Container>
            <div className="bg-gradient-to-r from-[#5B2EFF] to-[#03E46A] dark:from-[#3694FF] dark:to-[#FF5050] rounded-3xl p-12 text-center text-white">
              <h2 className="text-4xl font-bold mb-4">
                Prêt à Expérimenter la Science?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Essayez la technologie de charbon activé de Purrify sans risque
                avec notre format d'essai
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/fr/products/trial-size">
                  <Button
                    size="lg"
                    className="bg-white text-[#5B2EFF] hover:bg-gray-100 font-bold"
                  >
                    Essayez le Format d'Essai - 4,99$
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="/fr/#products">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-gray-900 dark:text-white hover:bg-white hover:text-gray-900 transition-colors"
                  >
                    Voir Tous Les Produits
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* Back Navigation */}
        <section className="py-8">
          <Container>
            <div className="text-center">
              <Link href="/fr/#how-it-works">
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
