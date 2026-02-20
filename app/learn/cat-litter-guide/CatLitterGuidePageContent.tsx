'use client';

import Link from 'next/link';
import { Container } from '../../../src/components/ui/container';
import { Button } from '../../../src/components/ui/button';
import { useTranslation } from '../../../src/lib/translation-context';
import { useLocale } from 'next-intl';
import { useEnhancedSEO } from '@/hooks/useEnhancedSEO';
import Image from 'next/image';
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
  Star,
} from 'lucide-react';
import { RelatedContent } from '@/components/seo/RelatedContent';
import { formatProductPrice } from '../../../src/lib/pricing';
import { getPaymentLink } from '../../../src/lib/payment-links';

type SupportedLocale = 'en' | 'fr' | 'zh' | 'es';

interface LitterTypeItem {
  name: string;
  pros: string[];
  cons: string[];
  rating: number;
}

interface MaintenanceTipItem {
  title: string;
  description: string;
}

interface CommonProblemItem {
  problem: string;
  solution: string;
  link: string | null;
}

interface GuideCopy {
  trialCtaPrefix: string;
  breadcrumbAriaLabel: string;
  homeSrOnly: string;
  breadcrumbLearn: string;
  breadcrumbGuide: string;
  heroTitle: string;
  heroDescription: string;
  heroImageAlt: string;
  litterTypesTitle: string;
  litterTypesDescription: string;
  prosLabel: string;
  consLabel: string;
  sectionImageAlt: string;
  maintenanceTitle: string;
  maintenanceDescription: string;
  maintenanceImageAlt: string;
  problemsTitle: string;
  problemsDescription: string;
  problemLabel: string;
  solutionLabel: string;
  learnMoreLabel: string;
  solutionImageAlt: string;
  ctaTitle: string;
  ctaDescription: string;
  readSuccessStoriesLabel: string;
  litterTypes: LitterTypeItem[];
  maintenanceTips: MaintenanceTipItem[];
  commonProblems: CommonProblemItem[];
}

const GUIDE_COPY: Record<SupportedLocale, GuideCopy> = {
  en: {
    trialCtaPrefix: 'Send My FREE Trial',
    breadcrumbAriaLabel: 'Breadcrumb',
    homeSrOnly: 'Home',
    breadcrumbLearn: 'Learn',
    breadcrumbGuide: 'Cat Litter Guide',
    heroTitle: 'The Complete Cat Litter Guide',
    heroDescription: 'Everything you need to know about choosing, using, and maintaining cat litter for a happy, healthy home',
    heroImageAlt: 'Modern cat litter box setup showing different litter types and maintenance tools',
    litterTypesTitle: 'Cat Litter Types Compared',
    litterTypesDescription: "Not all litters are created equal. Here's how different types stack up against each other.",
    prosLabel: 'Pros:',
    consLabel: 'Cons:',
    sectionImageAlt: 'Various cat litter types displayed for comparison',
    maintenanceTitle: 'Essential Maintenance Tips',
    maintenanceDescription: 'Keep your litter box fresh and your cat happy with these proven maintenance practices.',
    maintenanceImageAlt: 'Cat owner performing proper litter box maintenance routine',
    problemsTitle: 'Common Problems & Solutions',
    problemsDescription: 'Facing litter box issues? Here are the most common problems and their proven solutions.',
    problemLabel: 'Problem:',
    solutionLabel: 'Solution:',
    learnMoreLabel: 'Learn More',
    solutionImageAlt: 'Happy multi-cat household with clean, odor-free environment',
    ctaTitle: 'Ready to Upgrade Your Litter Box Experience?',
    ctaDescription: "Try Purrify's activated carbon additive and transform any litter into an odor-eliminating powerhouse.",
    readSuccessStoriesLabel: 'Read Success Stories',
    litterTypes: [
      {
        name: 'Clay Litter',
        pros: ['Affordable', 'Good absorption', 'Easy to find'],
        cons: ['Dusty', 'Heavy', 'Not biodegradable', 'Poor odor control'],
        rating: 2,
      },
      {
        name: 'Clumping Clay',
        pros: ['Forms solid clumps', 'Easy scooping', 'Better odor control'],
        cons: ['Still dusty', 'Heavy', 'Can be tracked', 'Not biodegradable'],
        rating: 3,
      },
      {
        name: 'Crystal/Silica',
        pros: ['Excellent absorption', 'Low dust', 'Long-lasting'],
        cons: ['Expensive', 'Sharp crystals', 'Not flushable'],
        rating: 3,
      },
      {
        name: 'Natural/Biodegradable',
        pros: ['Plant- or paper-based', 'Low dust', 'Flushable options'],
        cons: ['More expensive', 'Variable quality', 'May need frequent changes'],
        rating: 4,
      },
      {
        name: 'Any Litter + Purrify',
        pros: ['Superior odor elimination', 'Extends litter life', 'Works with any type', 'Fragrance-free additive'],
        cons: ['Additional cost (but saves money overall)'],
        rating: 5,
      },
    ],
    maintenanceTips: [
      {
        title: 'Daily Scooping',
        description: 'Remove solid waste daily to maintain freshness and prevent odor buildup.',
      },
      {
        title: 'Weekly Deep Clean',
        description: 'Replace all litter weekly and wash the box with mild soap and water.',
      },
      {
        title: 'Use Purrify',
        description: 'Add Purrify activated carbon to eliminate odors and extend litter life by up to 50%.',
      },
      {
        title: 'Monitor Health',
        description: "Watch for changes in your cat's bathroom habits as they can indicate health issues.",
      },
    ],
    commonProblems: [
      {
        problem: 'Strong Odors',
        solution: 'Add Purrify activated carbon additive for superior odor elimination',
        link: '/products/trial-size',
      },
      {
        problem: 'Litter Tracking',
        solution: 'Use a larger litter mat and consider switching to low-tracking litter types',
        link: null,
      },
      {
        problem: 'Dust Issues',
        solution: 'Choose low-dust litters and pour slowly to minimize airborne particles',
        link: null,
      },
      {
        problem: 'Frequent Changes',
        solution: 'Purrify extends litter life by neutralizing odors, reducing waste and costs',
        link: '/learn/how-it-works',
      },
    ],
  },
  fr: {
    trialCtaPrefix: 'Envoyer Mon Essai GRATUIT',
    breadcrumbAriaLabel: "Fil d'Ariane",
    homeSrOnly: 'Accueil',
    breadcrumbLearn: 'Apprendre',
    breadcrumbGuide: 'Guide de litiere',
    heroTitle: 'Le Guide Complet de la Litiere pour Chats',
    heroDescription: 'Tout ce que vous devez savoir pour choisir, utiliser et entretenir la litiere pour un foyer sain et heureux',
    heroImageAlt: 'Installation moderne de bac a litiere avec differents types de litiere et outils dentretien',
    litterTypesTitle: 'Comparatif des Types de Litiere',
    litterTypesDescription: 'Toutes les litieres ne se valent pas. Voici comment les principaux types se comparent.',
    prosLabel: 'Avantages :',
    consLabel: 'Inconvenients :',
    sectionImageAlt: 'Differents types de litiere presentes pour comparaison',
    maintenanceTitle: 'Conseils dEntretien Essentiels',
    maintenanceDescription: 'Gardez votre bac frais et votre chat heureux avec ces pratiques dentretien.',
    maintenanceImageAlt: 'Proprietaire de chat effectuant un entretien correct du bac a litiere',
    problemsTitle: 'Problemes Courants et Solutions',
    problemsDescription: 'Vous avez des problemes de litiere? Voici les plus frequents avec des solutions concretes.',
    problemLabel: 'Probleme :',
    solutionLabel: 'Solution :',
    learnMoreLabel: 'En savoir plus',
    solutionImageAlt: 'Foyer avec plusieurs chats dans un environnement propre et sans odeur',
    ctaTitle: 'Pret a Ameliorer Votre Experience de Litiere?',
    ctaDescription: 'Essayez ladditif au charbon actif Purrify et transformez nimporte quelle litiere en solution anti-odeur.',
    readSuccessStoriesLabel: 'Lire les temoignages',
    litterTypes: [
      {
        name: 'Litiere en argile',
        pros: ['Abordable', 'Bonne absorption', 'Facile a trouver'],
        cons: ['Poussiereuse', 'Lourde', 'Non biodegradable', 'Controle des odeurs limite'],
        rating: 2,
      },
      {
        name: 'Argile agglomerante',
        pros: ['Forme des blocs solides', 'Ramassage facile', 'Meilleur controle des odeurs'],
        cons: ['Toujours poussiereuse', 'Lourde', 'Peut se disperser', 'Non biodegradable'],
        rating: 3,
      },
      {
        name: 'Cristaux/Silice',
        pros: ['Excellente absorption', 'Peu de poussiere', 'Longue duree'],
        cons: ['Couteuse', 'Cristaux parfois pointus', 'Non jetable aux toilettes'],
        rating: 3,
      },
      {
        name: 'Naturelle/Biodegradable',
        pros: ['Base vegetale ou papier', 'Faible poussiere', 'Certaines options jetables'],
        cons: ['Plus chere', 'Qualite variable', 'Changement parfois plus frequent'],
        rating: 4,
      },
      {
        name: 'Toute litiere + Purrify',
        pros: ['Elimination superieure des odeurs', 'Prolonge la duree de la litiere', 'Compatible avec tout type', 'Additif sans parfum'],
        cons: ['Cout additionnel (mais economies globales)'],
        rating: 5,
      },
    ],
    maintenanceTips: [
      {
        title: 'Ramassage quotidien',
        description: 'Retirez les dechets solides chaque jour pour conserver la fraicheur et limiter les odeurs.',
      },
      {
        title: 'Nettoyage hebdomadaire',
        description: 'Remplacez toute la litiere chaque semaine et lavez le bac avec un savon doux.',
      },
      {
        title: 'Utiliser Purrify',
        description: 'Ajoutez du charbon actif Purrify pour eliminer les odeurs et prolonger la duree de vie de la litiere.',
      },
      {
        title: 'Surveiller la sante',
        description: 'Observe les changements dhabitudes de toilette de votre chat, ils peuvent indiquer un probleme de sante.',
      },
    ],
    commonProblems: [
      {
        problem: 'Odeurs fortes',
        solution: 'Ajoutez ladditif au charbon actif Purrify pour une elimination superieure des odeurs',
        link: '/products/trial-size',
      },
      {
        problem: 'Litiere qui se disperse',
        solution: 'Utilisez un tapis plus grand et envisagez une litiere a faible dispersion',
        link: null,
      },
      {
        problem: 'Problemes de poussiere',
        solution: 'Choisissez des litieres peu poussiereuses et versez lentement pour limiter les particules',
        link: null,
      },
      {
        problem: 'Changements trop frequents',
        solution: 'Purrify prolonge la duree de la litiere en neutralisant les odeurs, ce qui reduit dechets et couts',
        link: '/learn/how-it-works',
      },
    ],
  },
  zh: {
    trialCtaPrefix: '领取我的免费试用',
    breadcrumbAriaLabel: '面包屑导航',
    homeSrOnly: '首页',
    breadcrumbLearn: '学习中心',
    breadcrumbGuide: '猫砂指南',
    heroTitle: '完整猫砂使用指南',
    heroDescription: '从选择到使用与维护，帮助你打造更健康、更清新的养猫环境',
    heroImageAlt: '展示不同猫砂类型与维护工具的现代猫砂盆场景',
    litterTypesTitle: '猫砂类型对比',
    litterTypesDescription: '不同猫砂差异很大。下面是常见类型的优缺点对比。',
    prosLabel: '优点：',
    consLabel: '缺点：',
    sectionImageAlt: '用于比较的多种猫砂类型展示',
    maintenanceTitle: '关键维护建议',
    maintenanceDescription: '通过这些经过验证的方法，让猫砂盆更清新、猫咪更舒适。',
    maintenanceImageAlt: '猫主人进行正确猫砂盆维护',
    problemsTitle: '常见问题与解决方案',
    problemsDescription: '遇到猫砂盆问题？这里整理了最常见情况及对应方案。',
    problemLabel: '问题：',
    solutionLabel: '解决方案：',
    learnMoreLabel: '了解更多',
    solutionImageAlt: '多猫家庭在无异味环境中愉快生活',
    ctaTitle: '准备升级你的猫砂体验了吗？',
    ctaDescription: '试试 Purrify 活性炭添加剂，让任何猫砂都具备高效除味能力。',
    readSuccessStoriesLabel: '查看真实评价',
    litterTypes: [
      {
        name: '膨润土猫砂',
        pros: ['价格亲民', '吸收性好', '容易购买'],
        cons: ['粉尘较多', '较重', '不可生物降解', '除味能力一般'],
        rating: 2,
      },
      {
        name: '结团膨润土',
        pros: ['结团明显', '铲屎方便', '除味更好'],
        cons: ['仍有粉尘', '较重', '容易带出', '不可生物降解'],
        rating: 3,
      },
      {
        name: '水晶/硅胶猫砂',
        pros: ['吸收力强', '低粉尘', '使用时间较长'],
        cons: ['价格偏高', '晶体可能偏硬', '不建议冲厕'],
        rating: 3,
      },
      {
        name: '天然/可降解猫砂',
        pros: ['植物或纸基材', '低粉尘', '部分可冲厕'],
        cons: ['价格更高', '品质差异大', '可能需要更频繁更换'],
        rating: 4,
      },
      {
        name: '任意猫砂 + Purrify',
        pros: ['更强除味效果', '延长猫砂使用寿命', '适配任意猫砂', '无香精添加'],
        cons: ['有额外成本（但总体更省）'],
        rating: 5,
      },
    ],
    maintenanceTips: [
      {
        title: '每日清理',
        description: '每天清除固体排泄物，保持清新并减少异味堆积。',
      },
      {
        title: '每周深度清洁',
        description: '每周整体更换猫砂，并用温和清洁剂清洗猫砂盆。',
      },
      {
        title: '添加 Purrify',
        description: '加入 Purrify 活性炭，帮助高效吸附异味并延长猫砂寿命。',
      },
      {
        title: '关注健康信号',
        description: '留意猫咪如厕习惯变化，这些变化可能反映健康问题。',
      },
    ],
    commonProblems: [
      {
        problem: '异味明显',
        solution: '加入 Purrify 活性炭添加剂，获得更强除味效果',
        link: '/products/trial-size',
      },
      {
        problem: '猫砂带出严重',
        solution: '使用更大猫砂垫，并考虑低带出猫砂类型',
        link: null,
      },
      {
        problem: '粉尘问题',
        solution: '选择低粉尘猫砂，并慢慢倒入以减少悬浮颗粒',
        link: null,
      },
      {
        problem: '更换频率太高',
        solution: 'Purrify 可通过中和异味延长猫砂使用时间，减少浪费和成本',
        link: '/learn/how-it-works',
      },
    ],
  },
  es: {
    trialCtaPrefix: 'Enviar Mi Prueba GRATIS',
    breadcrumbAriaLabel: 'Miga de pan',
    homeSrOnly: 'Inicio',
    breadcrumbLearn: 'Aprender',
    breadcrumbGuide: 'Guia de Arena para Gatos',
    heroTitle: 'La Guia Completa de Arena para Gatos',
    heroDescription: 'Todo lo que necesitas saber para elegir, usar y mantener la arena en un hogar limpio y saludable',
    heroImageAlt: 'Configuracion moderna de caja de arena con distintos tipos y herramientas de mantenimiento',
    litterTypesTitle: 'Comparativa de Tipos de Arena',
    litterTypesDescription: 'No todas las arenas son iguales. Asi se comparan las opciones mas comunes.',
    prosLabel: 'Ventajas:',
    consLabel: 'Desventajas:',
    sectionImageAlt: 'Varios tipos de arena para gatos mostrados para comparacion',
    maintenanceTitle: 'Consejos Esenciales de Mantenimiento',
    maintenanceDescription: 'Mantén la caja de arena fresca y a tu gato feliz con estas practicas comprobadas.',
    maintenanceImageAlt: 'Persona realizando mantenimiento correcto de la caja de arena',
    problemsTitle: 'Problemas Comunes y Soluciones',
    problemsDescription: 'Tienes problemas con la caja de arena? Aqui tienes los mas comunes y como resolverlos.',
    problemLabel: 'Problema:',
    solutionLabel: 'Solucion:',
    learnMoreLabel: 'Aprender mas',
    solutionImageAlt: 'Hogar con varios gatos en ambiente limpio y sin olores',
    ctaTitle: 'Listo para Mejorar tu Experiencia con la Caja de Arena?',
    ctaDescription: 'Prueba el aditivo de carbon activado de Purrify y convierte cualquier arena en una solucion real contra olores.',
    readSuccessStoriesLabel: 'Leer historias de exito',
    litterTypes: [
      {
        name: 'Arena de arcilla',
        pros: ['Economica', 'Buena absorcion', 'Facil de encontrar'],
        cons: ['Polvorienta', 'Pesada', 'No biodegradable', 'Control de olor limitado'],
        rating: 2,
      },
      {
        name: 'Arcilla aglomerante',
        pros: ['Forma grumos solidos', 'Facil de retirar', 'Mejor control de olor'],
        cons: ['Sigue siendo polvorienta', 'Pesada', 'Puede rastrearse', 'No biodegradable'],
        rating: 3,
      },
      {
        name: 'Cristal/Silica',
        pros: ['Excelente absorcion', 'Bajo polvo', 'Larga duracion'],
        cons: ['Mas costosa', 'Cristales afilados', 'No apta para inodoro'],
        rating: 3,
      },
      {
        name: 'Natural/Biodegradable',
        pros: ['Base vegetal o papel', 'Bajo polvo', 'Opciones desechables'],
        cons: ['Mas cara', 'Calidad variable', 'Puede requerir cambios frecuentes'],
        rating: 4,
      },
      {
        name: 'Cualquier arena + Purrify',
        pros: ['Eliminacion superior de olores', 'Extiende la vida de la arena', 'Funciona con cualquier tipo', 'Aditivo sin fragancia'],
        cons: ['Costo adicional (pero ahorro total)'],
        rating: 5,
      },
    ],
    maintenanceTips: [
      {
        title: 'Limpieza diaria',
        description: 'Retira desechos solidos todos los dias para mantener frescura y evitar acumulacion de olor.',
      },
      {
        title: 'Limpieza profunda semanal',
        description: 'Cambia toda la arena semanalmente y lava la caja con jabon suave y agua.',
      },
      {
        title: 'Usa Purrify',
        description: 'Agrega carbon activado Purrify para eliminar olores y extender la vida util de la arena.',
      },
      {
        title: 'Monitorea la salud',
        description: 'Observa cambios en los habitos de bano de tu gato, ya que pueden indicar problemas de salud.',
      },
    ],
    commonProblems: [
      {
        problem: 'Olores fuertes',
        solution: 'Agrega aditivo de carbon activado Purrify para una mejor eliminacion de olores',
        link: '/products/trial-size',
      },
      {
        problem: 'Arena fuera de la caja',
        solution: 'Usa una alfombrilla mas grande y considera arenas de bajo rastreo',
        link: null,
      },
      {
        problem: 'Problemas de polvo',
        solution: 'Elige arenas de bajo polvo y vierte lentamente para minimizar particulas en el aire',
        link: null,
      },
      {
        problem: 'Cambios muy frecuentes',
        solution: 'Purrify extiende la vida de la arena neutralizando olores, reduciendo residuos y costos',
        link: '/learn/how-it-works',
      },
    ],
  },
};

const MAINTENANCE_ICONS = [Clock, Droplets, Shield, Heart];

export default function CatLitterGuidePageContent() {
  const locale = useLocale();
  const localePrefix = locale === 'en' ? '' : `/${locale}`;
  const homePath = localePrefix || '/';
  const copy = GUIDE_COPY[locale as SupportedLocale] || GUIDE_COPY.en;

  const { schema, additionalSchemas } = useEnhancedSEO({
    path: '/learn/cat-litter-guide',
    title: 'Cat Litter Guide: Types & Best Practices',
    description: 'Comprehensive guide to cat litter types, maintenance tips, and solving common problems. Learn how to choose the best litter for your cat and keep it fresh longer.',
    targetKeyword: 'cat litter guide',
    schemaType: 'article',
    schemaData: {
      headline: 'Complete Cat Litter Guide - Types, Tips & Best Practices',
      description: 'Comprehensive guide to cat litter types, maintenance tips, and solving common problems. Learn how to choose the best litter for your cat and keep it fresh longer.',
      image: 'https://www.purrify.ca/optimized/blog/litter-guide-hero-setup.webp',
      datePublished: '2024-01-01T10:00:00Z',
      dateModified: new Date().toISOString(),
      category: 'Pet Care Guides',
      keywords: ['cat litter guide', 'cat litter types', 'litter maintenance tips', 'clay litter', 'clumping litter', 'silica litter', 'natural cat litter'],
    },
    image: 'https://www.purrify.ca/optimized/blog/litter-guide-hero-setup.webp',
    keywords: ['cat litter guide', 'cat litter types', 'litter maintenance tips', 'clay litter', 'clumping litter', 'silica litter', 'natural cat litter'],
  });

  const trialPrice = formatProductPrice('trial', locale);
  const trialCheckoutUrl = getPaymentLink('trialSingle') || `${localePrefix}/products/trial-size`;
  const trialCtaLabel = `${copy.trialCtaPrefix} - ${trialPrice}`;

  // Unique images for cat litter guide - different from all other posts
  const heroImage = '/optimized/blog/litter-guide-hero-setup.webp';
  const sectionImage1 = '/optimized/blog/safe-cat-litter.webp';
  const sectionImage2 = '/optimized/marketing/step-2-mix.webp';
  const solutionImage = '/optimized/blog/benefits-happy-cats.avif';

  const breadcrumbItems = [
    { name: copy.breadcrumbLearn, path: `${localePrefix}/learn` },
    { name: copy.breadcrumbGuide, path: `${localePrefix}/learn/cat-litter-guide` },
  ];

  const allSchemas = [schema, ...additionalSchemas].filter(Boolean);

  return (
    <>
      {allSchemas.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              allSchemas.length === 1
                ? allSchemas[0]
                : { '@context': 'https://schema.org', '@graph': allSchemas }
            ),
          }}
        />
      )}
      <main className="min-h-screen bg-[#FFFFF5] dark:bg-gray-900 transition-colors duration-300">
        {/* Breadcrumb Navigation */}
        <section className="py-4 border-b border-[#E0EFC7] dark:border-gray-800">
          <Container>
            <nav aria-label={copy.breadcrumbAriaLabel} className="flex items-center text-sm">
              <Link href={homePath} className="text-gray-500 dark:text-gray-400 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors">
                <Home className="w-4 h-4" />
                <span className="sr-only">{copy.homeSrOnly}</span>
              </Link>
              {breadcrumbItems.map((item, index, arr) => (
                <span key={item.path} className="flex items-center">
                  <ChevronRight className="w-4 h-4 mx-1 text-gray-400 dark:text-gray-500" />
                  {index === arr.length - 1 ? (
                    <span aria-current="page" className="font-medium text-gray-900 dark:text-gray-100">{item.name}</span>
                  ) : (
                    <Link href={item.path} className="text-gray-500 dark:text-gray-400 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors">
                      {item.name}
                    </Link>
                  )}
                </span>
              ))}
            </nav>
          </Container>
        </section>

        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-[#5B2EFF] to-[#FF3131]">
          <Container>
            <div className="text-center text-white dark:text-gray-100 max-w-4xl mx-auto">
              <BookOpen className="w-16 h-16 mx-auto mb-6 opacity-90" />
              <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">
                {copy.heroTitle}
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                {copy.heroDescription}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href={trialCheckoutUrl} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="bg-white dark:bg-gray-900 text-[#5B2EFF] dark:text-[#818CF8] hover:bg-gray-100 dark:hover:bg-gray-700 font-bold">
                    {trialCtaLabel}
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </a>
              </div>
            </div>
          </Container>
        </section>

        {/* Hero Image */}
        <section className="py-8">
          <Container>
            <div className="max-w-4xl mx-auto">
              <Image
                src={heroImage}
                alt={copy.heroImageAlt}
                width={1600}
                height={1067}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </Container>
        </section>

        {/* Litter Types Comparison */}
        <section className="py-16">
          <Container>
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                {copy.litterTypesTitle}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                {copy.litterTypesDescription}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {copy.litterTypes.map((litter, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-[#E0EFC7] dark:border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-heading text-xl font-bold text-gray-900 dark:text-gray-100">
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
                      <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2">{copy.prosLabel}</h4>
                      <ul className="space-y-1">
                        {litter.pros.map((pro, i) => (
                          <li key={i} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                            <CheckCircle className="w-4 h-4 text-green-500 dark:text-green-400 mr-2 flex-shrink-0" />
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2">{copy.consLabel}</h4>
                      <ul className="space-y-1">
                        {litter.cons.map((con, i) => (
                          <li key={i} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                            <XCircle className="w-4 h-4 text-red-500 dark:text-red-400 mr-2 flex-shrink-0" />
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

        {/* Section Image - Different Litter Types */}
        <section className="py-8">
          <Container>
            <div className="max-w-4xl mx-auto">
              <Image
                src={sectionImage1}
                alt={copy.sectionImageAlt}
                width={1600}
                height={1067}
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
          </Container>
        </section>

        {/* Maintenance Tips */}
        <section className="py-16 bg-[#E0EFC7]/30 dark:bg-gray-800/50">
          <Container>
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                {copy.maintenanceTitle}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                {copy.maintenanceDescription}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {copy.maintenanceTips.map((tip, index) => {
                const TipIcon = MAINTENANCE_ICONS[index] || Clock;
                return (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-[#5B2EFF] dark:bg-[#818CF8] rounded-full flex items-center justify-center mx-auto mb-4">
                      <TipIcon className="w-8 h-8 text-white dark:text-gray-900" />
                    </div>
                    <h3 className="font-heading text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">
                      {tip.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {tip.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>

        {/* Section Image - Cat Owner Maintenance */}
        <section className="py-8">
          <Container>
            <div className="max-w-4xl mx-auto">
              <Image
                src={sectionImage2}
                alt={copy.maintenanceImageAlt}
                width={1600}
                height={1067}
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
          </Container>
        </section>

        {/* Common Problems & Solutions */}
        <section className="py-16">
          <Container>
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                {copy.problemsTitle}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                {copy.problemsDescription}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {copy.commonProblems.map((item, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-[#E0EFC7] dark:border-gray-700">
                  <h3 className="font-heading text-xl font-bold mb-3 text-red-600 dark:text-red-400">
                    {copy.problemLabel} {item.problem}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    <span className="font-semibold text-green-600 dark:text-green-400">{copy.solutionLabel}</span> {item.solution}
                  </p>
                  {item.link && (
                    <Link href={`${localePrefix}${item.link}`}>
                      <Button variant="outline" size="sm">
                        {copy.learnMoreLabel}
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Solution Image - Happy Multi-Cat Household */}
        <section className="py-8">
          <Container>
            <div className="max-w-4xl mx-auto">
              <Image
                src={solutionImage}
                alt={copy.solutionImageAlt}
                width={1600}
                height={1067}
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
          </Container>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-[#5B2EFF] to-[#FF3131]">
          <Container>
            <div className="text-center text-white dark:text-gray-100 max-w-3xl mx-auto">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
                {copy.ctaTitle}
              </h2>
              <p className="text-xl mb-8 opacity-90">
                {copy.ctaDescription}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href={trialCheckoutUrl} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="bg-white dark:bg-gray-900 text-[#5B2EFF] dark:text-[#818CF8] hover:bg-gray-100 dark:hover:bg-gray-700 font-bold">
                    {trialCtaLabel}
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </a>
                <Link href={`${localePrefix}/reviews`}>
                  <Button size="lg" variant="outline" className="border-white dark:border-gray-600 text-gray-900 dark:text-gray-50 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 transition-colors">
                    {copy.readSuccessStoriesLabel}
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* Related Articles */}
        <section className="py-16">
          <Container>
            <RelatedContent currentUrl="/learn/cat-litter-guide" />
          </Container>
        </section>
      </main>
    </>
  );
}
