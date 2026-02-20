'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Award, Check, CheckCircle2, ChevronRight, FileCheck, Home, Leaf, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { useTranslations, useLocale } from 'next-intl';
import { localizePath } from '@/lib/i18n/locale-path';

type SafetyCopy = {
  breadcrumbAria: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  labTitle: string;
  labDescription: string;
  carbonTitle: string;
  carbonDescription: string;
  featuresHeading: string;
  featuresSubheading: string;
  features: Array<{ title: string; description: string }>;
  bestPracticesTitle: string;
  bestPracticesBody: string;
  specsHeading: string;
  specsSubheading: string;
  specsNote: string;
  propertyHeader: string;
  valueHeader: string;
  particleTitle: string;
  particlePrimary: string;
  particleSecondary: string;
  certificationsHeading: string;
  certificationsSubheading: string;
  certifications: string[];
  applicationsHeading: string;
  applications: string[];
  ctaTitle: string;
  ctaBody: string;
  ctaButton: string;
};

const SAFETY_COPY: Record<'en' | 'fr', SafetyCopy> = {
  en: {
    breadcrumbAria: 'Breadcrumb',
    badge: 'Safety Documentation',
    title: 'Safety Information & Technical Datasheet',
    subtitle: 'Purrify Activated Carbon - Granular Coconut Shell Carbon (8x30 mesh)',
    description: 'Filtration-grade activated carbon designed for odor control in litter environments. Built for high adsorption performance, low dust, and consistent granule quality.',
    labTitle: 'Laboratory-Tested Quality',
    labDescription: 'Built to meet recognized drinking-water and quality standards.',
    carbonTitle: 'Premium Coconut Shell Carbon',
    carbonDescription: 'High-micropore activated carbon optimized for ammonia capture.',
    featuresHeading: 'Features & Benefits',
    featuresSubheading: 'Performance characteristics used in odor and filtration applications.',
    features: [
      { title: 'Microporous Structure', description: 'High affinity for small odor molecules including ammonia.' },
      { title: 'High Hardness', description: 'Low attrition for stable performance over use cycles.' },
      { title: 'Low Dust Profile', description: 'Cleaner handling with reduced loose particles.' },
      { title: 'Consistent Sizing', description: 'Uniform granules for predictable application behavior.' },
    ],
    bestPracticesTitle: 'Best Practices for Small Pet Environments',
    bestPracticesBody: 'For rodent or small-pet odor control, keep carbon contained in sealed pouches or cartridges, maintain ventilation, and rinse away loose particles before use.',
    specsHeading: 'Typical Specifications',
    specsSubheading: 'Values shown are typical reference ranges.',
    specsNote: 'Contact Purrify support for purchase-specific certificate data.',
    propertyHeader: 'Property',
    valueHeader: 'Value',
    particleTitle: 'Available Particle Sizes',
    particlePrimary: '8x30 mesh (2.36 - 0.60 mm) - standard odor and filtration size',
    particleSecondary: 'Additional mesh sizes available on request.',
    certificationsHeading: 'Certifications & Standards',
    certificationsSubheading: 'Compliance targets used for quality and safety review.',
    certifications: [
      'NSF/ANSI 61 and AWWA B604 guideline alignment',
      'Food Chemicals Codex (FCC) compliant',
      'Halal and Kosher compliant',
      'Manufactured from sustainable coconut shell feedstock',
    ],
    applicationsHeading: 'Common Applications',
    applications: [
      'Litter box odor control and ammonia reduction',
      'Water purification and air filtration support',
      'Multi-cat and high-load odor environments',
    ],
    ctaTitle: 'Need Safety or Compliance Help?',
    ctaBody: 'Our team can share additional technical references and usage guidance.',
    ctaButton: 'Contact Support',
  },
  fr: {
    breadcrumbAria: 'Fil d Ariane',
    badge: 'Documentation de securite',
    title: 'Informations de Securite et Fiche Technique',
    subtitle: 'Charbon active Purrify - Charbon granule de coque de noix de coco (8x30 mesh)',
    description: 'Charbon active de qualite filtration concu pour le controle des odeurs de litiere. Performance d adsorption elevee, faible poussiere et granulometrie stable.',
    labTitle: 'Qualite Testee en Laboratoire',
    labDescription: 'Concu pour respecter des normes reconnues de qualite et de securite.',
    carbonTitle: 'Charbon Premium de Coque de Coco',
    carbonDescription: 'Structure microporeuse optimisee pour capter l ammoniac.',
    featuresHeading: 'Caracteristiques et Avantages',
    featuresSubheading: 'Proprietes de performance utilisees pour les applications odeur et filtration.',
    features: [
      { title: 'Structure Microporeuse', description: 'Forte affinite pour les petites molecules odorantes, dont l ammoniac.' },
      { title: 'Haute Durete', description: 'Faible attrition pour une performance stable dans le temps.' },
      { title: 'Faible Teneur en Poussiere', description: 'Manipulation plus propre avec moins de particules libres.' },
      { title: 'Granulometrie Homogene', description: 'Granules regulieres pour un comportement d application previsible.' },
    ],
    bestPracticesTitle: 'Bonnes Pratiques pour Petits Animaux',
    bestPracticesBody: 'Pour les petits animaux, utilisez le charbon dans des sachets ou cartouches fermes, assurez une bonne ventilation et rincez les particules libres avant usage.',
    specsHeading: 'Specifications Typiques',
    specsSubheading: 'Les valeurs ci-dessous sont des plages de reference.',
    specsNote: 'Contactez le support Purrify pour les certificats propres a votre achat.',
    propertyHeader: 'Propriete',
    valueHeader: 'Valeur',
    particleTitle: 'Tailles de Particules Disponibles',
    particlePrimary: '8x30 mesh (2,36 - 0,60 mm) - taille standard odeur et filtration',
    particleSecondary: 'Autres tailles de maille disponibles sur demande.',
    certificationsHeading: 'Certifications et Normes',
    certificationsSubheading: 'References de conformite utilisees pour la revue qualite et securite.',
    certifications: [
      'Alignement avec les lignes directrices NSF/ANSI 61 et AWWA B604',
      'Conforme Food Chemicals Codex (FCC)',
      'Conforme Halal et Kasher',
      'Fabrique a partir de coques de noix de coco durables',
    ],
    applicationsHeading: 'Applications Courantes',
    applications: [
      'Controle des odeurs de litiere et reduction de l ammoniac',
      'Purification de l eau et filtration de l air',
      'Foyers multi-chats et charges odorantes elevees',
    ],
    ctaTitle: 'Besoin d Aide Securite ou Conformite?',
    ctaBody: 'Notre equipe peut partager des references techniques supplementaires et des conseils d utilisation.',
    ctaButton: 'Contacter le Support',
  },
};


const SPECIFICATIONS = [
  { key: 'Iodine Number', value: '>= 1000 mg/g' },
  { key: 'Moisture (as packed)', value: '<= 5%' },
  { key: 'CTC Adsorption', value: '>= 50%' },
  { key: 'Ash Content', value: '<= 4%' },
  { key: 'Hardness', value: '>= 98%' },
  { key: 'Apparent Density', value: '~430-540 kg/m3' },
  { key: 'BET Surface Area', value: '~1050 m2/g' },
];

export default function SafetyPageClient() {
  const t = useTranslations();
  const locale = useLocale() as 'en' | 'fr';
  const language = locale === 'fr' ? locale : 'en';
  const copy = SAFETY_COPY[language as 'en' | 'fr'];

  const features = [
    { icon: Leaf, ...copy.features[0] },
    { icon: ShieldCheck, ...copy.features[1] },
    { icon: CheckCircle2, ...copy.features[2] },
    { icon: Award, ...copy.features[3] },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#FFFFFF] via-[#FFFFF5] to-[#FFFFFF] dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
      <section className="py-4 border-b border-gray-200 dark:border-gray-800">
        <Container>
          <nav aria-label={copy.breadcrumbAria} className="flex items-center space-x-2 text-sm">
            <Link
              href={localizePath('/', locale)}
              className="flex items-center text-gray-500 dark:text-gray-400 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors"
            >
              <Home className="w-4 h-4" />
            </Link>
            <span className="flex items-center">
              <ChevronRight className="w-4 h-4 mx-1 text-gray-400 dark:text-gray-500" />
              <span className="text-gray-500 dark:text-gray-400">{t('nav.learn')}</span>
            </span>
            <span className="flex items-center">
              <ChevronRight className="w-4 h-4 mx-1 text-gray-400 dark:text-gray-500" />
              <span className="font-medium text-gray-900 dark:text-gray-100">{copy.title}</span>
            </span>
          </nav>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#FF3131] to-[#5B2EFF] rounded-full mb-6">
              <FileCheck className="w-8 h-8 text-white dark:text-gray-100" />
            </div>
            <p className="text-sm font-semibold tracking-wide uppercase text-[#FF3131] dark:text-[#FF5050] mb-3">
              {copy.badge}
            </p>
            <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#FF3131] to-[#5B2EFF] bg-clip-text text-transparent">
              {copy.title}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-3 leading-relaxed">
              {copy.subtitle}
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-200 leading-relaxed max-w-3xl mx-auto">
              {copy.description}
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/optimized/marketing/quality-control-lab.webp"
                alt={copy.labTitle}
                width={1600}
                height={1067}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent flex items-end">
                <div className="p-8 text-white dark:text-gray-100">
                  <h2 className="font-heading text-2xl font-bold mb-2">{copy.labTitle}</h2>
                  <p className="text-lg opacity-90">{copy.labDescription}</p>
                </div>
              </div>
            </div>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/optimized/products/activated-carbon-granules.webp"
                alt={copy.carbonTitle}
                width={1600}
                height={1067}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent flex items-end">
                <div className="p-8 text-white dark:text-gray-100">
                  <h2 className="font-heading text-2xl font-bold mb-2">{copy.carbonTitle}</h2>
                  <p className="text-lg opacity-90">{copy.carbonDescription}</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-14 bg-white dark:bg-gray-800/20">
        <Container>
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              {copy.featuresHeading}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {copy.featuresSubheading}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#FF3131] to-[#5B2EFF] rounded-lg flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-white dark:text-gray-100" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold mb-2 text-gray-900 dark:text-white">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-green-100 dark:bg-green-900/30 rounded-xl p-6 border-l-4 border-green-600 dark:border-green-400">
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">{copy.bestPracticesTitle}</h3>
            <p className="text-gray-800 dark:text-gray-100 leading-relaxed">{copy.bestPracticesBody}</p>
          </div>
        </Container>
      </section>

      <section className="py-14">
        <Container>
          <div className="text-center mb-10">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-3 text-gray-900 dark:text-white">
              {copy.specsHeading}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-1">{copy.specsSubheading}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{copy.specsNote}</p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-[#FF3131] to-[#5B2EFF] text-white dark:text-gray-100">
                      <th className="px-6 py-4 text-left font-bold">{copy.propertyHeader}</th>
                      <th className="px-6 py-4 text-left font-bold">{copy.valueHeader}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {SPECIFICATIONS.map((spec) => (
                      <tr key={spec.key} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{spec.key}</td>
                        <td className="px-6 py-4 text-gray-700 dark:text-gray-200">{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
              <h3 className="font-heading font-bold text-gray-900 dark:text-white mb-2">{copy.particleTitle}</h3>
              <p className="text-gray-700 dark:text-gray-200 mb-1">{copy.particlePrimary}</p>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{copy.particleSecondary}</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-14 bg-gradient-to-r from-[#5B2EFF] to-[#FF3131]">
        <Container>
          <div className="text-center text-white dark:text-gray-100 mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white dark:bg-gray-900 rounded-full mb-6">
              <Award className="w-8 h-8 text-[#5B2EFF]" />
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">{copy.certificationsHeading}</h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">{copy.certificationsSubheading}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-10">
            {copy.certifications.map((cert) => (
              <div key={cert} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg flex items-start space-x-4">
                <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <p className="text-gray-800 dark:text-gray-100">{cert}</p>
              </div>
            ))}
          </div>

          <div className="max-w-4xl mx-auto bg-white/10 dark:bg-black/20 rounded-2xl p-6">
            <h3 className="font-heading text-2xl font-bold text-white dark:text-gray-100 mb-4">{copy.applicationsHeading}</h3>
            <ul className="space-y-2 text-white/95 dark:text-gray-100">
              {copy.applications.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">{copy.ctaTitle}</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">{copy.ctaBody}</p>
            <Link href={localizePath('/contact', locale)}>
              <Button size="lg" className="bg-gradient-to-r from-[#FF3131] to-[#5B2EFF] text-white dark:text-gray-100">
                {copy.ctaButton}
              </Button>
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
