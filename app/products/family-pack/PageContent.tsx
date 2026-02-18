'use client';
import { useCallback, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Check, MapPin, Shield, Star, Truck, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { RelatedContent } from '@/components/seo/RelatedContent';
import { ProductFAQ } from '@/components/product/ProductFAQ';
import { GuaranteeBadge } from '@/components/ui/GuaranteeBadge';
import { useCurrency } from '@/lib/currency-context';
import { localizePath } from '@/lib/i18n/locale-path';
import { formatCurrencyValue, formatProductPrice, getProductPrice } from '@/lib/pricing';
import { getSEOMeta } from '@/translations/seo-meta';
import { SITE_NAME } from '@/lib/constants';
import { generateFAQSchema, getPriceValidityDate, stripContext } from '@/lib/seo-utils';
import { trackTikTokClientEvent } from '@/lib/tiktok-tracking';
import { useTranslation } from '@/lib/translation-context';
import { useEnhancedSEO } from '@/hooks/useEnhancedSEO';
import { useAggregateReview } from '@/hooks/useAggregateReview';
type FamilyCopy = {
  breadcrumbAria: string;
  productsLabel: string;
  pageLabel: string;
  heroTitle: string;
  heroSubtitle: string;
  badge: string;
  reviewsLabel: string;
  benefits: string[];
  storesTitle: string;
  storesBody: string;
  storeButton: string;
  reviewButton: string;
  shippingNote: string;
  autoshipNote: string;
  valueHeading: string;
  valueSubheading: string;
  cards: Array<{ stat: string; title: string; body: string }>;
  calculatorHeading: string;
  calculatorStandard: string;
  calculatorFamily: string;
  calculatorNote: string;
  storiesHeading: string;
  storiesCta: string;
  sizeHeading: string;
  sizeSubheading: string;
  sizeCards: Array<{ title: string; subtitle: string; cta: string; href: string; active?: boolean }>;
  backButton: string;
  imageOneTitle: string;
  imageOneBody: string;
  imageTwoTitle: string;
  imageTwoBody: string;
  imageThreeTitle: string;
  imageThreeBody: string;
};
const EN_COPY: FamilyCopy = {
  breadcrumbAria: 'Breadcrumb',
  productsLabel: 'Products',
  pageLabel: 'Family Pack',
  heroTitle: 'Purrify Family Pack',
  heroSubtitle: '120g Cat Litter Odor Control',
  badge: 'BEST VALUE',
  reviewsLabel: 'reviews',
  benefits: [
    'Best value per gram for larger cat households',
    'Built for 3+ cat environments and higher odor load',
    'Adsorption-based ammonia control with weekly refresh',
    'Fragrance-free carbon from coconut shell feedstock',
    'Less reordering and more predictable monthly cost',
  ],
  storesTitle: 'Find Purrify at Your Local Store',
  storesBody: 'Available through pet stores across Canada and online delivery options.',
  storeButton: 'Find a Store',
  reviewButton: 'Read Reviews',
  shippingNote: 'Ships within 24 hours',
  autoshipNote: 'Free shipping on autoship bundles',
  valueHeading: 'Maximum Value for Multi-Cat Homes',
  valueSubheading: 'The family format is designed for higher usage and stronger odor conditions.',
  cards: [
    { stat: '60', title: 'Days of Coverage', body: 'Roughly two months for many multi-cat routines.' },
    { stat: '25%', title: 'Cost Efficiency', body: 'Lower cost-per-gram versus smaller formats.' },
    { stat: '3+', title: 'Cat Households', body: 'Designed for heavier daily litter demand.' },
  ],
  calculatorHeading: 'Family Pack Value Snapshot',
  calculatorStandard: 'Standard Size (50g)',
  calculatorFamily: 'Family Pack (120g)',
  calculatorNote: 'Higher total volume with lower unit cost.',
  storiesHeading: 'Multi-Cat Success Stories',
  storiesCta: 'Read All Multi-Cat Stories',
  sizeHeading: 'Find Your Perfect Size',
  sizeSubheading: 'Choose the right package for your litter volume.',
  sizeCards: [
    { title: 'Trial Size', subtitle: '12g - Single-use test', cta: 'View Trial Size', href: '/products/trial-size' },
    { title: 'Standard Size', subtitle: '50g - Typical one-month use', cta: 'View Standard Size', href: '/products/standard' },
    { title: 'Family Pack', subtitle: '120g - Best value per gram', cta: 'Currently Viewing', href: '/products/family-pack', active: true },
  ],
  backButton: 'Back to All Products',
  imageOneTitle: 'Ideal for Multi-Cat Homes',
  imageOneBody: 'Higher-volume format for consistently fresh litter areas.',
  imageTwoTitle: 'Handles Heavy Usage',
  imageTwoBody: 'Built for daily odor load in larger households.',
  imageThreeTitle: 'Best Value Option',
  imageThreeBody: 'Lower price-per-gram for long-term use.',
};
const COPY: Record<'en' | 'fr', FamilyCopy> = {
  en: EN_COPY,
  fr: {
    ...EN_COPY,
    breadcrumbAria: 'Fil d Ariane',
    productsLabel: 'Produits',
    pageLabel: 'Format Famille',
    heroTitle: 'Purrify Format Famille',
    heroSubtitle: 'Controle des odeurs 120g',
    reviewsLabel: 'avis',
    reviewButton: 'Lire les Avis',
    backButton: 'Retour aux Produits',
  },
};
const TESTIMONIALS: Array<{ name: string; text: string; rating: number; petName: string }> = [];
export default function FamilyPackPage() {
  const { t, locale } = useTranslation();
  const { currency } = useCurrency();
  const language = locale === 'fr' ? locale : 'en';
  const copy = COPY[language];
  const viewTracked = useRef(false);
  const productKey = 'family';
  const productName = t.products?.['purrify-120g']?.name || 'Purrify Family Size';
  const priceValidUntil = getPriceValidityDate(90);
  const familyPriceAmount = getProductPrice('family', currency);
  const standardPriceAmount = getProductPrice('standard', currency);
  const familyPrice = formatProductPrice('family', currency, locale);
  const standardPrice = formatProductPrice('standard', currency, locale);
  const familyPerUnit = familyPriceAmount / 12;
  const standardPerUnit = standardPriceAmount / 5;
  const seoMeta = getSEOMeta(locale, 'products', 'family');
  const pageTitle = seoMeta?.title || `${SITE_NAME} Family Pack`;
  const pageDescription = seoMeta?.description || 'Family-size activated carbon litter additive for multi-cat homes.';
  const { data: reviewData } = useAggregateReview(productKey, locale);
  const { schema } = useEnhancedSEO({
    path: '/products/family-pack',
    title: pageTitle,
    description: pageDescription,
    targetKeyword: 'cat litter freshener family pack',
    schemaType: 'product',
    schemaData: {
      name: t.products?.['purrify-120g']?.name || 'Purrify Family Size',
      description: pageDescription,
      image: ['https://www.purrify.ca/optimized/60g-transparent.webp'],
      price: familyPriceAmount.toFixed(2),
      priceValidUntil,
      availability: 'https://schema.org/InStock',
      sku: 'purrify-120g',
      mpn: 'PURRIFY-120G',
      shippingRate: '0',
      rating: {
        value: reviewData.ratingValue,
        count: reviewData.reviewCount,
      },
    },
    image: 'https://www.purrify.ca/optimized/60g-transparent.webp',
  });
  useEffect(() => {
    if (viewTracked.current) return;
    viewTracked.current = true;
    trackTikTokClientEvent('ViewContent', {
      content_id: 'purrify-120g',
      content_name: productName,
      content_type: 'product',
      value: familyPriceAmount,
      currency: 'CAD',
    });
  }, [familyPriceAmount, productName]);
  const handleBuyClick = useCallback(() => {
    trackTikTokClientEvent('AddToCart', {
      content_id: 'purrify-120g',
      content_name: productName,
      content_type: 'product',
      quantity: 1,
      value: familyPriceAmount,
      currency: 'CAD',
    });
    trackTikTokClientEvent('InitiateCheckout', {
      content_id: 'purrify-120g',
      content_name: productName,
      content_type: 'product',
      quantity: 1,
      value: familyPriceAmount,
      currency: 'CAD',
    });
  }, [familyPriceAmount, productName]);
  const checkoutUrl = localizePath('/checkout', locale);
  const heroImage = '/optimized/60g-transparent.webp';
  const sectionImage1 = '/optimized/multi-cat-home-ghibli.webp';
  const solutionImage = '/optimized/multi-cat-success-ghibli.webp';
  return (
    <>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [stripContext(schema), stripContext(generateFAQSchema(locale))],
            }),
          }}
        />
      )}
      <main className="min-h-screen bg-gradient-to-br from-[#FFFFFF] via-[#FFFFF5] to-[#FFFFFF] dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
        <Container>
          <nav aria-label={copy.breadcrumbAria} className="py-4 text-sm">
            <ol className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
              <li>
                <Link href={localizePath('/', locale)} className="hover:text-[#FF3131] dark:hover:text-[#FF5050]">
                  {t.nav.home}
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href={localizePath('/products', locale)} className="hover:text-[#FF3131] dark:hover:text-[#FF5050]">
                  {copy.productsLabel}
                </Link>
              </li>
              <li>/</li>
              <li className="text-[#FF3131] dark:text-[#FF5050] font-medium">{copy.pageLabel}</li>
            </ol>
          </nav>
        </Container>
        <section className="py-12">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-[#FF3131]/20 to-[#5B2EFF]/30 dark:from-[#FF5050]/10 dark:to-[#3694FF]/20 rounded-3xl blur-xl opacity-70" />
                <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl">
                  <Image src={heroImage} alt={copy.heroTitle} width={400} height={400} className="w-full h-auto object-contain" />
                  <div className="absolute top-4 right-4 bg-[#03E46A] text-white dark:text-gray-100 px-3 py-1 rounded-full text-sm font-bold">
                    {copy.badge}
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80 dark:from-[#FF5050] dark:to-[#FF5050]/80 bg-clip-text text-transparent">
                    {copy.heroTitle}
                  </h1>
                  <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">{copy.heroSubtitle}</p>
                </div>
                <div className="space-y-3">
                  {copy.benefits.map((benefit) => (
                    <div key={benefit} className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-[#03E46A] flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-5">
                  <div className="rounded-2xl border-2 border-[#FF3131] bg-white dark:bg-gray-900 p-8 shadow-xl">
                    <h3 className="font-heading text-xl font-bold text-gray-900 dark:text-white mb-4">{copy.storesTitle}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">{copy.storesBody}</p>
                    <Button asChild className="w-full bg-[#FF3131] hover:bg-[#FF3131]/90 text-white dark:text-white font-bold py-6 rounded-2xl shadow-lg">
                      <Link href={localizePath('/stores', locale)} className="flex items-center justify-center gap-2">
                        <MapPin className="w-5 h-5" />
                        {copy.storeButton}
                      </Link>
                    </Button>
                  </div>
                  <div className="flex space-x-3">
                    <Link href={localizePath('/reviews', locale)} className="flex-1">
                      <Button variant="outline" size="lg" className="w-full">
                        <Users className="w-5 h-5 mr-2" />
                        {copy.reviewButton}
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="border-t pt-6 space-y-4">
                  <div className="flex flex-wrap gap-3">
                    <GuaranteeBadge size="md" />
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800 rounded-md">
                      <Truck className="w-4 h-4" />
                      {copy.shippingNote}
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Check className="w-4 h-4 text-[#03E46A] mr-2" />
                    {copy.autoshipNote}
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>
        <section className="py-12 bg-gray-50 dark:bg-gray-900/30">
          <Container>
            <div className="max-w-3xl mx-auto">
              <ProductFAQ productType="family" productName={copy.pageLabel} />
            </div>
          </Container>
        </section>
        <section className="py-16 bg-white dark:bg-gray-800/50">
          <Container>
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl font-bold mb-4 text-gray-900 dark:text-gray-50">{copy.valueHeading}</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">{copy.valueSubheading}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {copy.cards.map((card, index) => (
                <div key={card.title} className="text-center">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${index === 0 ? 'bg-[#FF3131]' : index === 1 ? 'bg-[#5B2EFF]' : 'bg-[#03E46A]'}`}>
                    <span className="text-white dark:text-gray-100 font-bold text-xl">{card.stat}</span>
                  </div>
                  <h3 className="font-heading text-xl font-bold mb-2 text-gray-900 dark:text-gray-50">{card.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{card.body}</p>
                </div>
              ))}
            </div>
            <div className="mt-12 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl p-8">
              <h3 className="font-heading text-2xl font-bold text-center mb-6 text-gray-900 dark:text-gray-50">{copy.calculatorHeading}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">{copy.calculatorStandard}</div>
                  <div className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">{standardPrice}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{`${formatCurrencyValue(standardPerUnit, locale)} / 10g`}</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">{copy.calculatorFamily}</div>
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">{familyPrice}</div>
                  <div className="text-sm text-green-600 dark:text-green-400 font-semibold">{`${formatCurrencyValue(familyPerUnit, locale)} / 10g`}</div>
                </div>
              </div>
              <div className="mt-6 text-center">
                <p className="text-lg font-bold text-gray-800 dark:text-gray-200">{copy.calculatorNote}</p>
              </div>
            </div>
          </Container>
        </section>
        {TESTIMONIALS.length > 0 && (
          <section className="py-16">
            <Container>
              <div className="text-center mb-12">
                <h2 className="font-heading text-3xl font-bold mb-4 text-gray-900 dark:text-gray-50">
                  {copy.storiesHeading}
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {TESTIMONIALS.map((testimonial) => (
                  <article key={testimonial.name} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, index) => (
                        <Star key={index} className="w-5 h-5 fill-yellow-400 text-yellow-400 dark:text-yellow-300" />
                      ))}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">{`"${testimonial.text}"`}</p>
                    <p className="font-semibold text-gray-900 dark:text-gray-50">{testimonial.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.petName}</p>
                  </article>
                ))}
              </div>
              <div className="text-center mt-12">
                <Link href={localizePath('/reviews', locale)}>
                  <Button variant="outline" size="lg">{copy.storiesCta}</Button>
                </Link>
              </div>
            </Container>
          </section>
        )}
        <section className="py-16 bg-white dark:bg-gray-800/50">
          <Container>
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl font-bold mb-4 text-gray-900 dark:text-gray-50">{copy.sizeHeading}</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">{copy.sizeSubheading}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {copy.sizeCards.map((card) => (
                <div key={card.title} className={`${card.active ? 'bg-gradient-to-br from-[#03E46A]/10 to-[#5B2EFF]/10 dark:from-[#03E46A]/10 dark:to-[#3694FF]/10 border-2 border-[#03E46A]' : 'bg-white dark:bg-gray-800'} p-6 rounded-xl shadow-lg text-center`}>
                  {card.active && (
                    <div className="bg-[#03E46A] text-white dark:text-gray-100 px-3 py-1 rounded-full text-sm font-bold mb-4 inline-block">
                      {copy.badge}
                    </div>
                  )}
                  <h3 className="font-heading text-xl font-bold mb-2 text-gray-900 dark:text-gray-50">{card.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{card.subtitle}</p>
                  {card.active ? (
                    <Button className="w-full">{card.cta}</Button>
                  ) : (
                    <Link href={localizePath(card.href, locale)}>
                      <Button variant="outline" className="w-full">{card.cta}</Button>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </Container>
        </section>
        <section className="py-8">
          <Container>
            <div className="text-center">
              <Link href={localizePath('/products', locale)}>
                <Button variant="outline" size="lg">
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  {copy.backButton}
                </Button>
              </Link>
            </div>
          </Container>
        </section>
        <section className="py-8">
          <Container>
            <div className="max-w-5xl mx-auto relative rounded-3xl overflow-hidden shadow-2xl">
              <Image src={heroImage} alt={copy.imageOneTitle} width={1600} height={1067} className="w-full h-auto" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-8 text-white dark:text-gray-100">
                  <h2 className="font-heading text-3xl font-bold mb-2">{copy.imageOneTitle}</h2>
                  <p className="text-xl opacity-90">{copy.imageOneBody}</p>
                </div>
              </div>
            </div>
          </Container>
        </section>
        <section className="py-8">
          <Container>
            <div className="max-w-5xl mx-auto relative rounded-3xl overflow-hidden shadow-2xl">
              <Image src={sectionImage1} alt={copy.imageTwoTitle} width={1600} height={1067} className="w-full h-auto" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-8 text-white dark:text-gray-100">
                  <h3 className="font-heading text-2xl font-bold mb-2">{copy.imageTwoTitle}</h3>
                  <p className="text-lg opacity-90">{copy.imageTwoBody}</p>
                </div>
              </div>
            </div>
          </Container>
        </section>
        <section className="py-8">
          <Container>
            <div className="max-w-3xl mx-auto relative rounded-3xl overflow-hidden shadow-2xl">
              <Image src={solutionImage} alt={copy.imageThreeTitle} width={1600} height={1067} className="w-full h-auto" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-8 text-white dark:text-gray-100">
                  <h3 className="font-heading text-2xl font-bold mb-2">{copy.imageThreeTitle}</h3>
                  <p className="text-lg opacity-90">{copy.imageThreeBody}</p>
                </div>
              </div>
            </div>
          </Container>
        </section>
        <section className="py-16 border-t border-gray-200 dark:border-gray-800">
          <Container>
            <RelatedContent currentUrl="/products/family-pack" />
          </Container>
        </section>
        <section className="py-8 text-center">
          <Container>
            <a href={checkoutUrl} onClick={handleBuyClick}>
              <Button size="lg" className="bg-[#FF3131] hover:bg-[#FF3131]/90 text-white dark:text-white">
                <Shield className="w-5 h-5 mr-2" />
                {familyPrice}
              </Button>
            </a>
          </Container>
        </section>
      </main>
    </>
  );
}