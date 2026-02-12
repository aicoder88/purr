'use client';

import { Container } from '../../../src/components/ui/container';
import { Button } from '../../../src/components/ui/button';
import { useTranslation } from '../../../src/lib/translation-context';
import { useCurrency } from '../../../src/lib/currency-context';
import { RelatedContent } from '../../../src/components/seo/RelatedContent';
import { formatProductPrice } from '../../../src/lib/pricing';
import { getPaymentLink } from '../../../src/lib/payment-links';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Microscope, Zap, Shield, Leaf, ChevronRight, Home } from 'lucide-react';

type SupportedLocale = 'en' | 'fr' | 'zh' | 'es';

interface SciencePoint {
  title: string;
  description: string;
  detail: string;
}

interface StepItem {
  number: string;
  title: string;
  description: string;
  image: string;
  tip: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

interface HowItWorksCopy {
  breadcrumbAriaLabel: string;
  breadcrumbLearn: string;
  breadcrumbCurrent: string;
  heroTitle: string;
  heroDescription: string;
  heroImageAlt: string;
  heroImageCaption: string;
  scienceHeading: string;
  scienceSubheading: string;
  usageHeading: string;
  usageSubheading: string;
  proTipLabel: string;
  faqHeading: string;
  faqSubheading: string;
  faqPrompt: string;
  faqContactButton: string;
  ctaTitle: string;
  ctaDescription: string;
  viewProductsButton: string;
  backToHomepage: string;
  trialPrefix: string;
  sciencePoints: SciencePoint[];
  steps: StepItem[];
  faqs: FaqItem[];
}

const HOW_IT_WORKS_COPY: Record<SupportedLocale, HowItWorksCopy> = {
  en: {
    breadcrumbAriaLabel: 'Breadcrumb',
    breadcrumbLearn: 'Learn',
    breadcrumbCurrent: 'How It Works',
    heroTitle: 'The Science Behind Purrify',
    heroDescription: "Discover how activated carbon technology eliminates odors at the molecular level, providing superior odor control for your cat's litter box.",
    heroImageAlt: 'Activated Carbon Micropores Under Magnification',
    heroImageCaption: 'Micropores magnified 1000x',
    scienceHeading: 'How Activated Carbon Works',
    scienceSubheading: 'Understanding the molecular science that makes Purrify so effective',
    usageHeading: 'How to Use Purrify',
    usageSubheading: 'Simple steps for maximum odor control effectiveness',
    proTipLabel: 'Pro Tip:',
    faqHeading: 'Common Questions',
    faqSubheading: 'Everything you need to know about activated carbon technology',
    faqPrompt: 'Have more questions about how Purrify works?',
    faqContactButton: 'Contact Our Experts',
    ctaTitle: 'Ready to Experience the Science?',
    ctaDescription: "Try Purrify's activated carbon technology risk-free with our trial size",
    viewProductsButton: 'View All Products',
    backToHomepage: 'Back to Homepage',
    trialPrefix: 'Send My FREE Trial',
    sciencePoints: [
      {
        title: 'Activated Carbon Structure',
        description: 'Our activated carbon contains millions of microscopic pores that create an enormous surface area - up to 1,500 square meters per gram.',
        detail: "These pores are specifically sized to trap odor molecules while allowing air to flow freely through your cat's litter box.",
      },
      {
        title: 'Molecular Adsorption',
        description: "Odor molecules are physically trapped within the carbon's pore structure through a process called adsorption.",
        detail: "Unlike air fresheners that mask odors, Purrify actually captures and holds odor molecules, preventing them from reaching your nose.",
      },
      {
        title: 'Long-Lasting Protection',
        description: 'Once trapped, odor molecules remain locked in the carbon structure until the litter is changed.',
        detail: 'This provides continuous odor control without the need for frequent reapplication or chemical additives.',
      },
      {
        title: 'Natural & Fragrance-Free',
        description: 'Made from coconut shells, our activated carbon is the same type used in household water and air filters.',
        detail: 'No added fragrances or dyes - just pure activated carbon doing the work.',
      },
    ],
    steps: [
      {
        number: '1',
        title: 'Sprinkle Purrify',
        description: 'Add a thin layer of Purrify on top of fresh or existing litter',
        image: '/optimized/step-1-sprinkle.webp',
        tip: 'A little goes a long way - just 1-2 teaspoons per litter box change',
      },
      {
        number: '2',
        title: 'Mix Gently',
        description: 'Lightly mix Purrify into the top layer of litter',
        image: '/optimized/step-2-mix.webp',
        tip: 'No need to completely blend - surface coverage is most effective',
      },
      {
        number: '3',
        title: 'Enjoy Freshness',
        description: 'Experience immediate and long-lasting odor control',
        image: '/optimized/step-3-enjoy.webp',
        tip: 'Reapply when adding fresh litter or doing a complete change',
      },
    ],
    faqs: [
      {
        question: 'How quickly does Purrify start working?',
        answer: 'Purrify begins trapping odor molecules immediately upon contact. Most customers notice a significant reduction in odors within the first few hours of application.',
      },
      {
        question: 'What if my cat ingests some activated carbon?',
        answer: 'Activated carbon used in household filtration is biologically inert. Purrify is designed to stay in the litter; monitor your cat as usual and consult your veterinarian if you have concerns.',
      },
      {
        question: 'How does this compare to baking soda?',
        answer: 'While baking soda neutralizes acids, activated carbon physically traps a much wider range of odor molecules. Carbon is more effective and longer-lasting than baking soda.',
      },
      {
        question: "Will this affect my cat's litter box habits?",
        answer: "No, Purrify is odorless and doesn't change the texture or feel of your cat's litter. Most cats don't even notice it's there.",
      },
    ],
  },
  fr: {
    breadcrumbAriaLabel: "Fil d'Ariane",
    breadcrumbLearn: 'Apprendre',
    breadcrumbCurrent: 'Comment ca marche',
    heroTitle: 'La science derriere Purrify',
    heroDescription: 'Decouvrez comment la technologie du charbon actif elimine les odeurs au niveau moleculaire pour un controle superieur des odeurs de litiere.',
    heroImageAlt: 'Micropores de charbon actif sous grossissement',
    heroImageCaption: 'Micropores grossis 1000x',
    scienceHeading: 'Comment fonctionne le charbon actif',
    scienceSubheading: 'Comprendre la science moleculaire qui rend Purrify si efficace',
    usageHeading: 'Comment utiliser Purrify',
    usageSubheading: 'Des etapes simples pour un maximum de controle des odeurs',
    proTipLabel: 'Conseil pro :',
    faqHeading: 'Questions frequentes',
    faqSubheading: 'Tout ce que vous devez savoir sur la technologie du charbon actif',
    faqPrompt: 'Vous avez dautres questions sur le fonctionnement de Purrify?',
    faqContactButton: 'Contacter nos experts',
    ctaTitle: 'Pret a decouvrir la science?',
    ctaDescription: 'Essayez la technologie Purrify sans risque avec notre format essai',
    viewProductsButton: 'Voir tous les produits',
    backToHomepage: "Retour a l'accueil",
    trialPrefix: 'Envoyer Mon Essai GRATUIT',
    sciencePoints: [
      {
        title: 'Structure du charbon actif',
        description: 'Notre charbon actif contient des millions de pores microscopiques qui creent une surface enorme, jusqua 1 500 m2 par gramme.',
        detail: 'Ces pores sont dimensionnes pour pieger les molecules odorantes tout en laissant circuler lair dans le bac.',
      },
      {
        title: 'Adsorption moleculaire',
        description: 'Les molecules odorantes sont piegees dans la structure poreuse du carbone via ladsorption.',
        detail: 'Contrairement aux parfums qui masquent les odeurs, Purrify capture et retient les molecules.',
      },
      {
        title: 'Protection longue duree',
        description: 'Une fois piegees, les molecules restent bloquees jusquau remplacement de la litiere.',
        detail: 'Vous obtenez un controle continu sans reappliquer constamment ni ajouter de produits chimiques.',
      },
      {
        title: 'Naturel et sans parfum',
        description: 'Fabrique a partir de coques de noix de coco, notre charbon actif est du meme type que celui utilise dans les filtres domestiques.',
        detail: 'Sans parfum ni colorant, uniquement du charbon actif pur.',
      },
    ],
    steps: [
      {
        number: '1',
        title: 'Saupoudrer Purrify',
        description: 'Ajoutez une fine couche de Purrify sur une litiere neuve ou existante',
        image: '/optimized/step-1-sprinkle.webp',
        tip: 'Une petite quantite suffit, environ 1 a 2 cuilleres a cafe par changement de bac',
      },
      {
        number: '2',
        title: 'Melanger doucement',
        description: 'Melangez legerement Purrify dans la couche superieure',
        image: '/optimized/step-2-mix.webp',
        tip: 'Pas besoin de melanger en profondeur, la surface est la zone la plus efficace',
      },
      {
        number: '3',
        title: 'Profiter de la fraicheur',
        description: 'Profitez dun controle des odeurs immediat et durable',
        image: '/optimized/step-3-enjoy.webp',
        tip: 'Reappliquez lors de lajout de litiere propre ou dun changement complet',
      },
    ],
    faqs: [
      {
        question: 'A quelle vitesse Purrify agit-il?',
        answer: 'Purrify commence a pieger les molecules odorantes immediatement. La plupart des clients remarquent une baisse nette des odeurs en quelques heures.',
      },
      {
        question: 'Que faire si mon chat ingere un peu de charbon actif?',
        answer: 'Le charbon actif utilise en filtration domestique est biologiquement inerte. Purrify reste dans la litiere; surveillez votre chat et consultez votre veterinaire en cas de doute.',
      },
      {
        question: 'Comment cela se compare-t-il au bicarbonate?',
        answer: 'Le bicarbonate neutralise certains acides, alors que le charbon actif piege un spectre beaucoup plus large de molecules odorantes.',
      },
      {
        question: 'Est-ce que cela modifie les habitudes de litiere de mon chat?',
        answer: "Non, Purrify est inodore et ne modifie pas la texture de la litiere. La plupart des chats ne remarquent aucune difference.",
      },
    ],
  },
  zh: {
    breadcrumbAriaLabel: '面包屑导航',
    breadcrumbLearn: '学习中心',
    breadcrumbCurrent: '工作原理',
    heroTitle: 'Purrify 背后的科学原理',
    heroDescription: '了解活性炭技术如何在分子层面消除异味，为猫砂盆提供更强除味效果。',
    heroImageAlt: '放大显示的活性炭微孔结构',
    heroImageCaption: '微孔放大 1000 倍',
    scienceHeading: '活性炭如何工作',
    scienceSubheading: '理解让 Purrify 高效除味的分子科学',
    usageHeading: '如何使用 Purrify',
    usageSubheading: '简单步骤，获得更高除味效率',
    proTipLabel: '专业提示：',
    faqHeading: '常见问题',
    faqSubheading: '你需要了解的活性炭除味知识',
    faqPrompt: '还想了解更多 Purrify 工作原理？',
    faqContactButton: '联系专家',
    ctaTitle: '准备亲自体验科学除味了吗？',
    ctaDescription: '立即无风险试用 Purrify 活性炭技术',
    viewProductsButton: '查看全部产品',
    backToHomepage: '返回首页',
    trialPrefix: '发送我的免费试用',
    sciencePoints: [
      {
        title: '活性炭结构',
        description: '我们的活性炭含有数百万微孔，每克可形成高达 1500 平方米的巨大比表面积。',
        detail: '这些微孔专门用于捕捉异味分子，同时保持猫砂盆空气流通。',
      },
      {
        title: '分子吸附',
        description: '异味分子会通过吸附过程被物理锁定在活性炭孔隙结构中。',
        detail: '与只会掩盖异味的香氛不同，Purrify 会真正捕捉并固定异味分子。',
      },
      {
        title: '长效保护',
        description: '一旦被捕捉，异味分子会持续锁定在活性炭结构中，直到更换猫砂。',
        detail: '无需频繁补加，也无需化学添加剂，即可持续控味。',
      },
      {
        title: '天然无香精',
        description: '采用椰壳活性炭，与家用净水和空气过滤常用材料同级。',
        detail: '不添加香精或色素，只靠纯活性炭发挥作用。',
      },
    ],
    steps: [
      {
        number: '1',
        title: '撒入 Purrify',
        description: '在新猫砂或现有猫砂表层均匀撒一薄层',
        image: '/optimized/step-1-sprinkle.webp',
        tip: '少量即可，每次换砂约 1-2 茶匙',
      },
      {
        number: '2',
        title: '轻轻混合',
        description: '将 Purrify 轻轻混入猫砂上层',
        image: '/optimized/step-2-mix.webp',
        tip: '无需深度搅拌，表层覆盖通常更有效',
      },
      {
        number: '3',
        title: '享受清新',
        description: '体验即时且持久的异味控制',
        image: '/optimized/step-3-enjoy.webp',
        tip: '补充新猫砂或整盆更换时重新添加',
      },
    ],
    faqs: [
      {
        question: 'Purrify 多快开始起效？',
        answer: 'Purrify 接触后会立即开始捕捉异味分子。多数用户在数小时内就能感受到明显改善。',
      },
      {
        question: '如果猫咪误食了少量活性炭怎么办？',
        answer: '家用过滤级活性炭通常是惰性材料。Purrify 设计用于猫砂中，如有担忧请按平时观察并咨询兽医。',
      },
      {
        question: '和小苏打相比效果如何？',
        answer: '小苏打主要中和部分酸性物质，而活性炭可物理捕捉更广泛的异味分子，通常更持久。',
      },
      {
        question: '会影响猫咪使用猫砂盆习惯吗？',
        answer: '不会。Purrify 无气味，也不会改变猫砂触感，大多数猫咪几乎无感。',
      },
    ],
  },
  es: {
    breadcrumbAriaLabel: 'Miga de pan',
    breadcrumbLearn: 'Aprender',
    breadcrumbCurrent: 'Como Funciona',
    heroTitle: 'La Ciencia Detras de Purrify',
    heroDescription: 'Descubre como la tecnologia de carbon activado elimina olores a nivel molecular para un control superior en la caja de arena.',
    heroImageAlt: 'Microporos de carbon activado bajo aumento',
    heroImageCaption: 'Microporos ampliados 1000x',
    scienceHeading: 'Como Funciona el Carbon Activado',
    scienceSubheading: 'Entiende la ciencia molecular que hace a Purrify tan efectivo',
    usageHeading: 'Como Usar Purrify',
    usageSubheading: 'Pasos simples para un maximo control de olores',
    proTipLabel: 'Consejo pro:',
    faqHeading: 'Preguntas Comunes',
    faqSubheading: 'Todo lo que necesitas saber sobre la tecnologia de carbon activado',
    faqPrompt: 'Tienes mas preguntas sobre como funciona Purrify?',
    faqContactButton: 'Contacta a nuestros expertos',
    ctaTitle: 'Listo para Probar la Ciencia?',
    ctaDescription: 'Prueba la tecnologia de carbon activado de Purrify sin riesgo con nuestro tamano de prueba',
    viewProductsButton: 'Ver todos los productos',
    backToHomepage: 'Volver al inicio',
    trialPrefix: 'Enviar Mi Prueba GRATIS',
    sciencePoints: [
      {
        title: 'Estructura de Carbon Activado',
        description: 'Nuestro carbon activado contiene millones de poros microscopicos que crean una enorme area superficial de hasta 1,500 m2 por gramo.',
        detail: 'Estos poros estan dimensionados para atrapar moleculas de olor y permitir el flujo de aire en la caja de arena.',
      },
      {
        title: 'Adsorcion Molecular',
        description: 'Las moleculas de olor quedan atrapadas fisicamente en la estructura porosa del carbon mediante adsorcion.',
        detail: 'A diferencia de los ambientadores que enmascaran, Purrify captura y retiene las moleculas de olor.',
      },
      {
        title: 'Proteccion de Larga Duracion',
        description: 'Una vez atrapadas, las moleculas permanecen bloqueadas en el carbon hasta cambiar la arena.',
        detail: 'Esto ofrece control continuo de olor sin reaplicaciones frecuentes ni aditivos quimicos.',
      },
      {
        title: 'Natural y Sin Fragancia',
        description: 'Hecho de cascara de coco, nuestro carbon activado es el mismo tipo usado en filtros de agua y aire domesticos.',
        detail: 'Sin fragancias ni tintes; solo carbon activado puro haciendo el trabajo.',
      },
    ],
    steps: [
      {
        number: '1',
        title: 'Espolvorea Purrify',
        description: 'Agrega una capa fina de Purrify sobre arena nueva o existente',
        image: '/optimized/step-1-sprinkle.webp',
        tip: 'Rinde mucho: 1-2 cucharaditas por cambio de caja suelen ser suficientes',
      },
      {
        number: '2',
        title: 'Mezcla suavemente',
        description: 'Mezcla ligeramente Purrify en la capa superior de arena',
        image: '/optimized/step-2-mix.webp',
        tip: 'No hace falta mezclar por completo; la cobertura superficial funciona mejor',
      },
      {
        number: '3',
        title: 'Disfruta frescura',
        description: 'Experimenta control de olor inmediato y duradero',
        image: '/optimized/step-3-enjoy.webp',
        tip: 'Reaplica al agregar arena fresca o al hacer un cambio completo',
      },
    ],
    faqs: [
      {
        question: 'Que tan rapido empieza a funcionar Purrify?',
        answer: 'Purrify empieza a atrapar moleculas de olor al contacto. La mayoria nota una reduccion significativa en pocas horas.',
      },
      {
        question: 'Que pasa si mi gato ingiere algo de carbon activado?',
        answer: 'El carbon activado de filtracion domestica suele ser biologicamente inerte. Purrify esta disenado para quedarse en la arena; monitorea a tu gato y consulta a tu veterinario si tienes dudas.',
      },
      {
        question: 'Como se compara con bicarbonato?',
        answer: 'El bicarbonato neutraliza acidos, mientras que el carbon activado atrapa fisicamente una gama mas amplia de moleculas de olor y dura mas.',
      },
      {
        question: 'Afectara los habitos de caja de arena de mi gato?',
        answer: 'No. Purrify no tiene olor y no cambia la textura de la arena. La mayoria de los gatos ni lo nota.',
      },
    ],
  },
};

const SCIENCE_ICONS = [Microscope, Zap, Shield, Leaf];

export default function HowItWorksPageClient() {
  const { locale } = useTranslation();
  const { currency } = useCurrency();

  const localePrefix = locale === 'en' ? '' : `/${locale}`;
  const copy = HOW_IT_WORKS_COPY[locale as SupportedLocale] || HOW_IT_WORKS_COPY.en;

  const trialPrice = formatProductPrice('trial', currency, locale);
  const trialCheckoutUrl = getPaymentLink('trialSingle') || `${localePrefix}/products/trial-size`;
  const trialSizeCtaLabel = `${copy.trialPrefix} - ${trialPrice}`;

  const breadcrumbItems = [
    { name: copy.breadcrumbLearn, path: `${localePrefix}/learn` },
    { name: copy.breadcrumbCurrent, path: `${localePrefix}/learn/how-it-works` },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#FFFFFF] via-[#FFFFF5] to-[#FFFFFF] dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
      {/* Breadcrumb Navigation */}
      <section className="py-4 border-b border-gray-200 dark:border-gray-800">
        <Container>
          <nav aria-label={copy.breadcrumbAriaLabel} className="flex items-center space-x-2 text-sm">
            <Link
              href={localePrefix || '/'}
              className="flex items-center text-gray-500 dark:text-gray-400 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors"
            >
              <Home className="w-4 h-4" />
            </Link>
            {breadcrumbItems.map((item, index, arr) => (
              <span key={item.path} className="flex items-center">
                <ChevronRight className="w-4 h-4 mx-1 text-gray-400 dark:text-gray-500" />
                {index === arr.length - 1 ? (
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.path}
                    className="text-gray-500 dark:text-gray-400 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors"
                  >
                    {item.name}
                  </Link>
                )}
              </span>
            ))}
          </nav>
        </Container>
      </section>

      {/* Hero Section */}
      <section className="py-16">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#FF3131] to-[#5B2EFF] dark:from-[#FF5050] dark:to-[#3694FF] bg-clip-text text-transparent">
              {copy.heroTitle}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              {copy.heroDescription}
            </p>
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#FF3131]/20 to-[#5B2EFF]/30 dark:from-[#FF5050]/10 dark:to-[#3694FF]/20 rounded-3xl blur-xl opacity-70"></div>
              <div className="relative">
                <Image
                  src="/optimized/micropores-magnified.webp"
                  alt={copy.heroImageAlt}
                  width={600}
                  height={400}
                  sizes="(max-width: 768px) 100vw, 600px"
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
                <div className="absolute bottom-4 left-4 bg-black/70 text-white dark:text-gray-100 px-3 py-1 rounded-lg text-sm">
                  {copy.heroImageCaption}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Science Explanation */}
      <section className="py-16 bg-white dark:bg-gray-800/50">
        <Container>
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              {copy.scienceHeading}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {copy.scienceSubheading}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {copy.sciencePoints.map((point, index) => {
              const Icon = SCIENCE_ICONS[index] || Microscope;
              return (
                <div key={index} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-r from-[#FF3131] to-[#5B2EFF] rounded-xl flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white dark:text-gray-100" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">
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
              );
            })}
          </div>
        </Container>
      </section>

      {/* Step-by-Step Usage */}
      <section className="py-16">
        <Container>
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              {copy.usageHeading}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {copy.usageSubheading}
            </p>
          </div>

          <div className="space-y-16">
            {copy.steps.map((step, index) => (
              <div key={index} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-[#FF3131] to-[#5B2EFF] rounded-full flex items-center justify-center">
                      <span className="text-white dark:text-gray-100 font-bold text-2xl">{step.number}</span>
                    </div>
                    <h3 className="font-heading text-3xl font-bold text-gray-900 dark:text-gray-100">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                    {step.description}
                  </p>
                  <div className="bg-[#E0EFC7]/50 dark:bg-gray-700/50 p-4 rounded-xl">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      💡 <strong>{copy.proTipLabel}</strong> {step.tip}
                    </p>
                  </div>
                </div>
                <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-[#FF3131]/20 to-[#5B2EFF]/30 dark:from-[#FF5050]/10 dark:to-[#3694FF]/20 rounded-3xl blur-xl opacity-70"></div>
                    <div className="relative">
                      <Image
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
      <section className="py-16 bg-white dark:bg-gray-800/50">
        <Container>
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              {copy.faqHeading}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {copy.faqSubheading}
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {copy.faqs.map((faq, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                <h3 className="font-heading text-lg font-bold mb-3 text-gray-900 dark:text-gray-100">
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
              {copy.faqPrompt}
            </p>
            <Link href={`${localePrefix}/contact`}>
              <Button size="lg" variant="outline">
                {copy.faqContactButton}
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <Container>
          <div className="bg-gradient-to-r from-[#5B2EFF] to-[#03E46A] dark:from-[#3694FF] dark:to-[#FF5050] rounded-3xl p-12 text-center text-white dark:text-gray-100">
            <h2 className="font-heading text-4xl font-bold mb-4">
              {copy.ctaTitle}
            </h2>
            <p className="text-xl mb-8 opacity-90">
              {copy.ctaDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={trialCheckoutUrl} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-white dark:bg-gray-900 text-[#5B2EFF] hover:bg-gray-100 dark:hover:bg-gray-700 font-bold">
                  {trialSizeCtaLabel}
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </a>
              <Link href={`${localePrefix}/#products`}>
                <Button size="lg" variant="outline" className="border-white dark:border-gray-600 text-gray-900 dark:text-gray-50 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 transition-colors">
                  {copy.viewProductsButton}
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
            <Link href={`${localePrefix}/#how-it-works`}>
              <Button variant="outline" size="lg">
                <ArrowLeft className="w-5 h-5 mr-2" />
                {copy.backToHomepage}
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* Related Articles */}
      <section className="py-16 border-t border-gray-200 dark:border-gray-800">
        <Container>
          <RelatedContent currentUrl="/learn/how-it-works" />
        </Container>
      </section>
    </main>
  );
}
