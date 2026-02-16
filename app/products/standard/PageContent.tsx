"use client";
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/lib/translation-context';
import { useCurrency } from '@/lib/currency-context';
import { getSEOMeta } from '@/translations/seo-meta';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Check, Star, ShoppingCart, Heart, Zap, Truck, MapPin, ChevronRight } from 'lucide-react';
import { RelatedContent } from '@/components/seo/RelatedContent';
import { ProductFAQ } from '@/components/product/ProductFAQ';
import { GuaranteeBadge } from '@/components/ui/GuaranteeBadge';
import { getPriceValidityDate,  generateFAQSchema, stripContext } from '@/lib/seo-utils';
import {  getProductPrice } from '@/lib/pricing';
import { getPaymentLink } from '@/lib/payment-links';
import { useEffect, useRef, useCallback, useState } from 'react';
import { useEnhancedSEO } from '@/hooks/useEnhancedSEO';
import { useAggregateReview } from '@/hooks/useAggregateReview';
import { trackTikTokClientEvent } from '@/lib/tiktok-tracking';
type SupportedLocale = 'en' | 'fr' | 'zh' | 'es';
const STANDARD_PAGE_COPY: Record<SupportedLocale, {
  breadcrumbProducts: string;
  badgeMostPopular: string;
  verifiedStories: string;
  heroDescription: string;
  shipsNextBusinessDay: string;
  lifestyleImageAlt: string;
  provenBadge: string;
  headlineTop: string;
  headlineBottom: string;
  scienceDescription: string;
  benefits: string[];
  valueCardOneTitle: string;
  valueCardOneBody: string;
  valueCardTwoTitle: string;
  valueCardTwoBody: string;
  valueCardThreeTitle: string;
  valueCardThreeBody: string;
  detailHeadlineTop: string;
  detailHeadlineBottom: string;
  detailDescription: string;
  resultsLabel: string;
  testimonialQuote: string;
  testimonialAttribution: string;
  granulesImageAlt: string;
  backToAllSizes: string;
  productFaqName: string;
}> = {
  en: {
    breadcrumbProducts: 'Products',
    badgeMostPopular: 'Most Popular',
    verifiedStories: 'Activated carbon additive',
    heroDescription: 'The perfect solution for single-cat households. 50 grams of high-surface-area activated carbon that traps ammonia before it ever reaches your nose.',
    shipsNextBusinessDay: 'Ships Next Business Day',
    lifestyleImageAlt: 'Purrify Regular Size in action',
    provenBadge: 'Scientifically Proven',
    headlineTop: 'Stop Masking.',
    headlineBottom: 'Start Eliminating.',
    scienceDescription: "Most deodorizers use heavy perfumes to hide smells. Purrify works like a magnet-trapping ammonia gas molecules inside millions of microscopic pores. It's the same filtration-grade technology used in drinking water systems and hospital air purifiers.",
    benefits: [
      'Ideal for single-cat households',
      '4-6 weeks of continuous odor control',
      'Advanced activated carbon formula',
      '100% natural, fragrance-free, and safe',
      'Works instantly on litter box smells',
    ],
    valueCardOneTitle: 'Professional Grade',
    valueCardOneBody: 'Used by vets and professional cleaning services across Canada.',
    valueCardTwoTitle: '100% Cat Safe',
    valueCardTwoBody: 'Fragrance-free, chemical-free, and safe if accidentally ingested.',
    valueCardThreeTitle: 'Best Value',
    valueCardThreeBody: 'One regular size replaces 4-5 spray cans or expensive plugins.',
    detailHeadlineTop: 'High-Surface Area',
    detailHeadlineBottom: 'Molecular Filtration',
    detailDescription: 'Our activated carbon is sourced from premium coconut shells, processed to maximize the surface area that "captures" odor particles. Just one gram has a surface area equivalent to a tennis court.',
    resultsLabel: 'Real Results',
    testimonialQuote: `"My husband used to complain the second he walked through the door. Since we started using the Regular Size, he doesn't even notice the litter area anymore! Game changer for our small apartment."`,
    testimonialAttribution: '- Sarah L., Toronto',
    granulesImageAlt: 'Purrify carbon granules close-up',
    backToAllSizes: 'Back to all sizes',
    productFaqName: 'Standard Size (50g)',
  },
  fr: {
    breadcrumbProducts: 'Produits',
    badgeMostPopular: 'Le plus populaire',
    verifiedStories: 'Additif au charbon actif',
    heroDescription: 'La solution ideale pour les foyers avec un seul chat. 50 grammes de charbon actif a grande surface qui capte lammoniac avant meme que vous le sentiez.',
    shipsNextBusinessDay: 'Expedie le prochain jour ouvrable',
    lifestyleImageAlt: 'Format standard Purrify en action',
    provenBadge: 'Scientifiquement prouve',
    headlineTop: 'Arretez de masquer.',
    headlineBottom: 'Commencez a eliminer.',
    scienceDescription: "La plupart des desodorisants utilisent des parfums lourds pour masquer les odeurs. Purrify agit comme un aimant et capture les molecules dammoniac dans des millions de pores microscopiques. Cest la meme technologie de filtration utilisee pour leau potable et les purificateurs dair hospitaliers.",
    benefits: [
      'Ideal pour les foyers avec un chat',
      '4-6 semaines de controle continu des odeurs',
      'Formule avancee au charbon actif',
      '100% naturel, sans parfum et sur',
      'Agit instantanement sur les odeurs de litiere',
    ],
    valueCardOneTitle: 'Qualite professionnelle',
    valueCardOneBody: 'Utilise par des veterinaires et des services de nettoyage professionnels partout au Canada.',
    valueCardTwoTitle: '100% sur pour les chats',
    valueCardTwoBody: 'Sans parfum, sans produits chimiques et sur meme en cas dingestion accidentelle.',
    valueCardThreeTitle: 'Meilleur rapport qualite-prix',
    valueCardThreeBody: 'Un format standard remplace 4-5 aerosols ou diffuseurs couteux.',
    detailHeadlineTop: 'Surface elevee',
    detailHeadlineBottom: 'Filtration moleculaire',
    detailDescription: 'Notre charbon actif provient de coques de noix de coco de qualite superieure et est traite pour maximiser la surface qui capture les particules odorantes. Un seul gramme offre une surface equivalente a un court de tennis.',
    resultsLabel: 'Resultats reels',
    testimonialQuote: '"Mon mari se plaignait des quil franchissait la porte. Depuis que nous utilisons le format standard, il ne remarque meme plus la zone de litiere. Un vrai changement pour notre petit appartement."',
    testimonialAttribution: '- Sarah L., Toronto',
    granulesImageAlt: 'Gros plan des granules de carbone Purrify',
    backToAllSizes: 'Retour a tous les formats',
    productFaqName: 'Format standard (50g)',
  },
  zh: {
    breadcrumbProducts: '产品',
    badgeMostPopular: '最受欢迎',
    verifiedStories: '活性炭添加剂',
    heroDescription: '单猫家庭的理想选择。50克高比表面积活性炭，在异味进入鼻子前先吸附氨气。',
    shipsNextBusinessDay: '下一个工作日发货',
    lifestyleImageAlt: 'Purrify 标准装使用场景',
    provenBadge: '科学验证',
    headlineTop: '别再掩盖异味。',
    headlineBottom: '开始真正消除。',
    scienceDescription: '多数除味产品依赖浓香掩盖气味。Purrify 像磁铁一样，把氨分子锁进数百万个微孔中。这与饮用水系统和医院空气净化器使用的是同级过滤技术。',
    benefits: [
      '非常适合单猫家庭',
      '持续 4-6 周除味',
      '高性能活性炭配方',
      '100% 天然、无香精、更安全',
      '可立即改善猫砂盆异味',
    ],
    valueCardOneTitle: '专业级品质',
    valueCardOneBody: '已被加拿大多家兽医机构和专业清洁服务采用。',
    valueCardTwoTitle: '100% 猫咪安全',
    valueCardTwoBody: '无香精、无化学添加，误食也更安心。',
    valueCardThreeTitle: '性价比更高',
    valueCardThreeBody: '一包标准装可替代 4-5 罐喷雾或昂贵插电除味器。',
    detailHeadlineTop: '高比表面积',
    detailHeadlineBottom: '分子级过滤',
    detailDescription: '我们的活性炭来自优质椰壳，经工艺优化后拥有更高比表面积来捕捉异味颗粒。仅 1 克的表面积就接近一个网球场。',
    resultsLabel: '真实效果',
    testimonialQuote: '"我丈夫以前一进门就会抱怨。用了标准装后，他几乎感觉不到猫砂区的味道了。对我们的小公寓来说是巨大改变。"',
    testimonialAttribution: '- Sarah L., 多伦多',
    granulesImageAlt: 'Purrify 活性炭颗粒特写',
    backToAllSizes: '返回全部规格',
    productFaqName: '标准装 (50g)',
  },
  es: {
    breadcrumbProducts: 'Productos',
    badgeMostPopular: 'Mas popular',
    verifiedStories: 'Aditivo de carbon activado',
    heroDescription: 'La solucion perfecta para hogares con un solo gato. 50 gramos de carbon activado de alta superficie que atrapa el amoniaco antes de que llegue a tu nariz.',
    shipsNextBusinessDay: 'Envia el siguiente dia habil',
    lifestyleImageAlt: 'Tamano regular de Purrify en uso',
    provenBadge: 'Comprobado cientificamente',
    headlineTop: 'Deja de enmascarar.',
    headlineBottom: 'Empieza a eliminar.',
    scienceDescription: 'La mayoria de los desodorizantes usan perfumes fuertes para ocultar olores. Purrify funciona como un iman y atrapa moleculas de amoniaco dentro de millones de poros microscopicos. Es la misma tecnologia de filtracion usada en sistemas de agua potable y purificadores de aire hospitalarios.',
    benefits: [
      'Ideal para hogares con un solo gato',
      '4-6 semanas de control continuo de olores',
      'Formula avanzada de carbon activado',
      '100% natural, sin fragancia y seguro',
      'Actua al instante sobre olores de la caja de arena',
    ],
    valueCardOneTitle: 'Grado profesional',
    valueCardOneBody: 'Usado por veterinarios y servicios de limpieza profesional en Canada.',
    valueCardTwoTitle: '100% seguro para gatos',
    valueCardTwoBody: 'Sin fragancias, sin quimicos y seguro incluso si se ingiere accidentalmente.',
    valueCardThreeTitle: 'Mejor valor',
    valueCardThreeBody: 'Un tamano regular reemplaza 4-5 aerosoles o difusores costosos.',
    detailHeadlineTop: 'Alta superficie',
    detailHeadlineBottom: 'Filtracion molecular',
    detailDescription: 'Nuestro carbon activado proviene de cascara de coco premium y se procesa para maximizar la superficie que captura particulas de olor. Un solo gramo tiene una superficie equivalente a una cancha de tenis.',
    resultsLabel: 'Resultados reales',
    testimonialQuote: '"Mi esposo solia quejarse apenas entraba por la puerta. Desde que usamos el tamano regular, ya ni nota el area de la caja de arena. Cambio total para nuestro apartamento pequeno."',
    testimonialAttribution: '- Sarah L., Toronto',
    granulesImageAlt: 'Primer plano de granulos de carbono Purrify',
    backToAllSizes: 'Volver a todos los tamanos',
    productFaqName: 'Tamano estandar (50g)',
  },
};
export default function StandardSizePage() {
  const { t, locale } = useTranslation();
  const copy = STANDARD_PAGE_COPY[locale as SupportedLocale] || STANDARD_PAGE_COPY.en;
  const { currency } = useCurrency();
  const viewTracked = useRef(false);
  const purchaseCardsRef = useRef<HTMLDivElement>(null);
  const [_quantity, _setQuantity] = useState(1);
  const priceValidUntil = getPriceValidityDate(90);
  const productKey = 'standard'; // 50g Standard Size
  const productName = t.products?.["purrify-50g"]?.name || "";
  const numericPrice = getProductPrice(productKey, currency);
  // Track ViewContent on page load
  useEffect(() => {
    if (viewTracked.current) return;
    viewTracked.current = true;
    trackTikTokClientEvent('ViewContent', {
      content_id: productKey,
      content_name: productName,
      content_type: 'product',
      value: numericPrice,
      currency: 'CAD',
    });
  }, [productKey, productName, numericPrice]);
  // Track AddToCart + InitiateCheckout when user clicks buy
  const handleBuyClick = useCallback((isAutoship: boolean, quantity: number = 1) => {
    const price = isAutoship ? getProductPrice('standardAutoship', currency) : numericPrice;
    const name = isAutoship ? `${productName} - Autoship` : productName;
    trackTikTokClientEvent('AddToCart', {
      content_id: productKey,
      content_name: name,
      content_type: 'product',
      quantity: quantity,
      value: price * quantity,
      currency: 'CAD',
    });
    trackTikTokClientEvent('InitiateCheckout', {
      content_id: productKey,
      content_name: name,
      content_type: 'product',
      quantity: quantity,
      value: price * quantity,
      currency: 'CAD',
    });
  }, [numericPrice, productName, productKey, currency]);
  // Handler for sticky cart
  const _handleStickyAddToCart = useCallback((quantity: number) => {
    handleBuyClick(false, quantity);
  }, [handleBuyClick]);
  // Use optimized SEO meta content
  const seoMeta = getSEOMeta(locale as 'en' | 'fr' | 'zh' | 'es', 'products', 'standard');
  const pageTitle = seoMeta?.title || `${productName} - Cat Litter Freshener & Charcoal Additive | Purrify`;
  const pageDescription = seoMeta?.description || "Best cat litter freshener for single-cat homes. 50g activated charcoal cat litter additive eliminates ammonia odors for 4-6 weeks. Natural, fragrance-free, works with any litter. Ships to USA & Canada.";
  // Get aggregate review data
  const { data: reviewData } = useAggregateReview(productKey, locale);
  // Use enhanced SEO hook
  const { _nextSeoProps, schema } = useEnhancedSEO({
    path: '/products/standard',
    title: pageTitle,
    description: pageDescription,
    targetKeyword: 'cat litter freshener',
    schemaType: 'product',
    schemaData: {
      name: productName,
      description: pageDescription,
      image: 'https://www.purrify.ca/optimized/60g-transparent.webp',
      price: numericPrice.toFixed(2),
      priceValidUntil,
      availability: 'https://schema.org/InStock',
      rating: {
        value: reviewData.ratingValue,
        count: reviewData.reviewCount,
      },
    },
    image: 'https://www.purrify.ca/optimized/60g-transparent.webp',
    keywords: ['cat litter freshener', 'charcoal litter additive', 'cat litter deodorizer', 'odor eliminator'],
  });
  const _singleCheckoutUrl = getPaymentLink('standardSingle') || '#';
  const _autoshipCheckoutUrl = getPaymentLink('standardAutoship') || '#';
  // Optimized images
  const heroImage = "/optimized/60g-transparent.webp";
  const solutionImage = "/optimized/90day-solution.webp";
  const productImage = "/optimized/60g-transparent.webp";
  const benefits = copy.benefits;
  const productFaqType = 'standard';
  const productFaqName = copy.productFaqName;
  return (
    <>
      {/* Enhanced Product JSON-LD from useEnhancedSEO hook */}
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                stripContext(schema),
                // FAQ Schema for product page
                stripContext(generateFAQSchema(locale)),
              ],
            }),
          }}
        />
      )}
      <main className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-950 dark:via-purple-950/20 dark:to-gray-900">
        {/* Breadcrumb Navigation */}
        <Container>
          <nav className="py-6 text-sm">
            <ol className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
              <li>
                <Link href={locale === 'fr' ? '/fr' : '/'} className="hover:text-deep-coral transition-colors">
                  {t.nav?.home || 'Home'}
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href={`${locale !== 'en' ? `/${locale}` : ''}/#products`} className="hover:text-deep-coral transition-colors">
                  {copy.breadcrumbProducts}
                </Link>
              </li>
              <li>/</li>
              <li className="text-deep-coral font-semibold">{productName}</li>
            </ol>
          </nav>
        </Container>
        {/* Hero Section */}
        <section className="pb-16 pt-4">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Product Image Stage */}
              <div className="relative">
                <div className="absolute -inset-10 bg-gradient-to-tr from-electric-indigo/20 to-deep-coral/20 rounded-[40px] blur-3xl opacity-60 animate-pulse"></div>
                <div className="relative bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 rounded-[32px] p-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)]">
                  <Image
                    src={productImage}
                    alt={productName}
                    width={600}
                    height={600}
                    priority
                    className="w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)] hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-8 right-8">
                    <div className="bg-deep-coral text-white dark:text-white px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-xl flex items-center gap-2">
                      <Zap className="w-4 h-4 fill-current" />
                      {copy.badgeMostPopular}
                    </div>
                  </div>
                </div>
              </div>
              {/* Product Info */}
              <div className="space-y-8">
                <div>
                  <h1 className="font-heading text-5xl md:text-6xl font-black mb-6 tracking-tight text-gray-900 dark:text-white leading-[1.1]">
                    <span className="bg-gradient-to-r from-deep-coral to-electric-indigo bg-clip-text text-transparent">
                      {productName}
                    </span>
                  </h1>
                  <div className="flex flex-wrap items-center gap-3 mb-6">
                    <div className="inline-flex items-center gap-2 bg-white/50 dark:bg-gray-800/50 px-3 py-1 rounded-full border border-gray-100 dark:border-gray-700 text-sm font-bold text-gray-700 dark:text-gray-300">
                      <Zap className="w-4 h-4" />
                      {copy.provenBadge}
                    </div>
                    <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">{copy.verifiedStories}</span>
                  </div>
                  <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl">
                    {copy.heroDescription}
                  </p>
                </div>
                {/* B2B: Find a Store CTA */}
                <div ref={purchaseCardsRef} className="bg-white dark:bg-gray-900 border-2 border-deep-coral rounded-3xl p-8 shadow-xl">
                  <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-4">
                    {t.productsSection?.askYourStore || "Ask for Purrify at Your Local Store"}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {t.productsSection?.availableAtStores || "Available at pet stores across Canada"}
                  </p>
                  <Button asChild className="w-full bg-deep-coral hover:bg-deep-coral/90 text-white dark:text-white font-bold py-6 rounded-2xl shadow-lg shadow-deep-coral/20">
                    <Link href={`${locale !== 'en' ? `/${locale}` : ''}/stores`} className="flex items-center justify-center gap-2">
                      <MapPin className="w-5 h-5" />
                      {t.nav?.findStore || "Find a Store"}
                      <ChevronRight className="w-5 h-5" />
                    </Link>
                  </Button>
                </div>
                {/* Quick Trust */}
                <div className="flex flex-wrap gap-4 pt-2">
                  <GuaranteeBadge size="md" />
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800 rounded-md">
                    <Truck className="w-4 h-4" />
                    {copy.shipsNextBusinessDay}
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>
        {/* Product-Specific FAQ */}
        <section className="py-12 bg-white/30 dark:bg-gray-900/30">
          <Container>
            <div className="max-w-3xl mx-auto">
              <ProductFAQ productType={productFaqType} productName={productFaqName} />
            </div>
          </Container>
        </section>
        {/* Feature/Lifestyle Section 1 */}
        <section className="py-24 bg-white/50 dark:bg-black/20 overflow-hidden">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="order-2 lg:order-1 relative">
                <div className="absolute -inset-4 bg-gradient-to-tr from-purple-500/10 to-pink-500/10 rounded-3xl blur-2xl"></div>
                <Image
                  src={heroImage}
                  alt={copy.lifestyleImageAlt}
                  width={800}
                  height={600}
                  className="relative rounded-[40px] shadow-2xl border-8 border-white dark:border-gray-800"
                />
              </div>
              <div className="order-1 lg:order-2 space-y-8">
                <div className="inline-block bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">
                  {copy.provenBadge}
                </div>
                <h2 className="font-heading text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight">
                  {copy.headlineTop} <br />
                  <span className="text-electric-indigo">{copy.headlineBottom}</span>
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  {copy.scienceDescription}
                </p>
                <div className="space-y-4">
                  {benefits.map((benefit, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                        <Check className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
                      </div>
                      <span className="font-bold text-gray-700 dark:text-gray-200">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </section>
        {/* Values Block */}
        <section className="py-24">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-md border border-white/20 dark:border-gray-700/30 p-10 rounded-[32px] text-center space-y-4 hover:-translate-y-2 transition-transform">
                <div className="w-16 h-16 bg-electric-indigo/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Star className="w-8 h-8 text-electric-indigo" />
                </div>
                <h3 className="font-heading text-2xl font-black text-gray-900 dark:text-white">{copy.valueCardOneTitle}</h3>
                <p className="text-gray-600 dark:text-gray-400">{copy.valueCardOneBody}</p>
              </div>
              <div className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-md border border-white/20 dark:border-gray-700/30 p-10 rounded-[32px] text-center space-y-4 hover:-translate-y-2 transition-transform">
                <div className="w-16 h-16 bg-deep-coral/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-8 h-8 text-deep-coral" />
                </div>
                <h3 className="font-heading text-2xl font-black text-gray-900 dark:text-white">{copy.valueCardTwoTitle}</h3>
                <p className="text-gray-600 dark:text-gray-400">{copy.valueCardTwoBody}</p>
              </div>
              <div className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-md border border-white/20 dark:border-gray-700/30 p-10 rounded-[32px] text-center space-y-4 hover:-translate-y-2 transition-transform">
                <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <ShoppingCart className="w-8 h-8 text-green-500 dark:text-green-400" />
                </div>
                <h3 className="font-heading text-2xl font-black text-gray-900 dark:text-white">{copy.valueCardThreeTitle}</h3>
                <p className="text-gray-600 dark:text-gray-400">{copy.valueCardThreeBody}</p>
              </div>
            </div>
          </Container>
        </section>
        {/* Product Detail Image */}
        <section className="py-24 bg-gray-900 dark:bg-gray-900 text-white dark:text-white overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-electric-indigo/20 to-deep-coral/20 opacity-40"></div>
          <Container className="relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-8">
                <h2 className="font-heading text-4xl md:text-5xl font-black leading-tight text-white dark:text-white">
                  {copy.detailHeadlineTop} <br />
                  <span className="text-deep-coral">{copy.detailHeadlineBottom}</span>
                </h2>
                <p className="text-xl text-gray-400 dark:text-gray-300 leading-relaxed">
                  {copy.detailDescription}
                </p>
                <div className="bg-white/10 dark:bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 dark:border-white/5">
                  <p className="text-deep-coral font-black mb-2 uppercase tracking-widest text-sm">{copy.resultsLabel}</p>
                  <p className="italic text-lg text-white dark:text-white">{copy.testimonialQuote}</p>
                  <p className="mt-4 font-bold text-white dark:text-white">{copy.testimonialAttribution}</p>
                </div>
              </div>
              <div className="relative">
                <Image
                  src={solutionImage}
                  alt={copy.granulesImageAlt}
                  width={800}
                  height={800}
                  className="rounded-[40px] shadow-2xl grayscale brightness-110 hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </div>
          </Container>
        </section>
        {/* Bottom CTA - B2B: Find a Store */}
        <section className="py-32 bg-white dark:bg-gray-950">
          <Container>
            <div className="bg-gradient-to-r from-deep-coral/5 to-electric-indigo/5 border border-gray-100 dark:border-gray-800 rounded-[48px] p-12 md:p-24 text-center space-y-10">
              <div className="max-w-3xl mx-auto space-y-6">
                <h2 className="font-heading text-4xl md:text-6xl font-black text-gray-900 dark:text-white">
                  {t.productsSection?.askYourStore || "Ask for Purrify at Your Local Store"}
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                  {t.productsSection?.availableAtStores || "Available at pet stores across Canada"}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button asChild size="lg" className="h-20 px-12 text-xl font-black bg-deep-coral hover:bg-deep-coral/90 text-white dark:text-white rounded-[24px] shadow-2xl shadow-deep-coral/20 min-w-[280px]">
                  <Link href={`${locale !== 'en' ? `/${locale}` : ''}/stores`} className="flex items-center gap-3">
                    <MapPin className="w-5 h-5" />
                    {t.nav?.findStore || "Find a Store"}
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </Container>
        </section>
        {/* Back navigation */}
        <section className="py-12 border-t border-gray-100 dark:border-gray-900">
          <Container className="text-center">
            <Link href={`${locale !== 'en' ? `/${locale}` : ''}/#products`} className="inline-flex items-center text-gray-500 dark:text-gray-400 hover:text-deep-coral font-bold gap-2 transition-colors">
              <ArrowLeft className="w-5 h-5" /> {copy.backToAllSizes}
            </Link>
          </Container>
        </section>
        {/* Related Articles */}
        <section className="py-24 border-t border-gray-200 dark:border-gray-800">
          <Container>
            <RelatedContent currentUrl="/products/standard" />
          </Container>
        </section>
      </main>
    </>
  );
}