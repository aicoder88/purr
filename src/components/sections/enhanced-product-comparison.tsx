import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import Link from 'next/link';

import { useTranslations, useLocale } from "next-intl";
import { useCurrency } from "@/lib/currency-context";
import { CheckCircle, ChevronRight, MapPin } from 'lucide-react';
import { IconMoneyBack, IconCustomerLove } from '@/components/icons/custom-trust-icons';
import { IconLongLasting, IconAnyLitter } from '@/components/icons/custom-benefit-icons';
import Image from 'next/image';
import { formatProductPrice } from '@/lib/pricing';
import { getPaymentLink } from '@/lib/payment-links';
import { cn } from "@/lib/utils";

type ProductCard = {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  duration: string;
  idealFor: string;
  features: string[];
  bestFor: string;
  image: string;
  imageSize: 'sm' | 'md' | 'lg';
  color: string;
  badge?: {
    type: 'popular' | 'recommended' | 'trial';
    label: string;
  };
  ctaType: 'stripe' | 'store';
  stripeLink?: string | null;
};

export function EnhancedProductComparison() {
  const t = useTranslations();
  const locale = useLocale();
  const { currency } = useCurrency();

  const trialPrice = formatProductPrice('trial', currency, locale);
  const trialLink = getPaymentLink('trialSingle');

  // Product display names
  const productDisplayNames: Record<string, { name: string; nameFr: string; subtitle: string; subtitleFr: string }> = {
    trial: {
      name: 'Free Trial',
      nameFr: 'Format Essai',
      subtitle: '12g · One Week of Proof',
      subtitleFr: '12g · Une semaine de preuve'
    },
    regular: {
      name: 'The Goldilocks Bag',
      nameFr: 'Le Format Parfait',
      subtitle: '50g · Regular Size',
      subtitleFr: '50g · Format Standard'
    },
    large: {
      name: 'Family Size',
      nameFr: 'Format Famille',
      subtitle: '120g · Best Value Per Gram',
      subtitleFr: '120g · Meilleur rapport qualité-prix'
    },
  };

  // Default product data for fallback
  const defaultProducts = [
    {
      features: [
        'One week of fresh-air confidence',
        'Just $4.76 shipping',
        'Zero risk, zero commitment'
      ],
      bestFor: "Cat parents who've been burned before. Test it yourself. Your nose doesn't lie."
    },
    {
      features: [
        'One month supply',
        'Most popular choice',
        'Works with any litter'
      ],
      bestFor: "Single cat homes. The size that keeps customers coming back."
    },
    {
      features: [
        'Best value per gram',
        'Flexible dosing',
        'Perfect for multiple boxes'
      ],
      bestFor: "Multi-cat households, foster parents, or anyone who's lost count."
    }
  ];

  // Helper function to get translated features array with fallback
  const getTranslatedFeatures = (index: number): string[] => {
    const prefix = `productComparison.product${index + 1}.features`;
    const translated = t(prefix);
    // If translation exists and is an array, use it; otherwise use default
    if (translated && translated !== prefix) {
      try {
        // Try to parse as JSON array if it's stored as a string
        const parsed = JSON.parse(translated as string);
        if (Array.isArray(parsed)) return parsed;
      } catch {
        // If not JSON, return as single item array or check individual keys
      }
    }
    return defaultProducts[index]?.features || [];
  };

  // Helper function to get translated bestFor string with fallback
  const getTranslatedBestFor = (index: number): string => {
    const key = `productComparison.product${index + 1}.bestFor`;
    const translated = t(key);
    return translated !== key ? translated : defaultProducts[index]?.bestFor || '';
  };

  const products: ProductCard[] = [
    {
      id: 'purrify-12g',
      name: locale === 'fr' ? productDisplayNames.trial.nameFr : productDisplayNames.trial.name,
      subtitle: locale === 'fr' ? productDisplayNames.trial.subtitleFr : productDisplayNames.trial.subtitle,
      description: 'One sprinkle delivers 7 full days of zero litter box smell. Your nose gets the proof, your wallet risks just $4.76 shipping. Over 1,000 cat parents tried the sample and became customers—now it\'s your turn.',
      duration: '7+ days',
      idealFor: '1 cat',
      features: getTranslatedFeatures(0),
      bestFor: getTranslatedBestFor(0),
      image: '/optimized/17g-transparent-v2.webp',
      imageSize: 'sm',
      color: 'from-green-500 to-green-600',
      badge: {
        type: 'trial',
        label: locale === 'fr' ? 'ÉCHANTILLON' : 'FREE TRIAL',
      },
      ctaType: 'stripe',
      stripeLink: trialLink,
    },
    {
      id: 'purrify-50g',
      name: locale === 'fr' ? productDisplayNames.regular.nameFr : productDisplayNames.regular.name,
      subtitle: locale === 'fr' ? productDisplayNames.regular.subtitleFr : productDisplayNames.regular.subtitle,
      description: 'Not too little, not too much—this is the size most customers reorder. Lasts about a month of fresh litter for single-cat homes. The perfect amount without waste.',
      duration: '30 days',
      idealFor: '1 cat',
      features: getTranslatedFeatures(1),
      bestFor: getTranslatedBestFor(1),
      image: '/optimized/60g-transparent.webp',
      imageSize: 'md',
      color: 'from-deep-coral to-rose-600',
      badge: {
        type: 'popular',
        label: t('productComparison.popular') || 'POPULAR',
      },
      ctaType: 'store',
    },
    {
      id: 'purrify-120g',
      name: locale === 'fr' ? productDisplayNames.large.nameFr : productDisplayNames.large.name,
      subtitle: locale === 'fr' ? productDisplayNames.large.subtitleFr : productDisplayNames.large.subtitle,
      description: 'Best value per gram. Lasts 7+ days per application across multiple litter boxes. Perfect for multi-cat homes that refuse to compromise on freshness.',
      duration: '7+ days per application',
      idealFor: '2+ cats',
      features: getTranslatedFeatures(2),
      bestFor: getTranslatedBestFor(2),
      image: '/optimized/60g-transparent.webp',
      imageSize: 'lg',
      color: 'from-electric-indigo to-purple-600',
      badge: {
        type: 'recommended',
        label: t('productComparison.bestValue') || 'BEST VALUE',
      },
      ctaType: 'store',
    },
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900/50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-deep-coral/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-electric-indigo/5 rounded-full blur-3xl" />
      </div>

      <Container className="relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t('productComparison.title') || "Choose Your Perfect Size"}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {locale === 'fr'
              ? "Tous les formats contiennent exactement la même formule. Choisissez simplement la quantité dont vous avez besoin."
              : "All sizes contain the exact same formula. Just pick how much you need."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {products.map((product) => {
            const isRecommended = product.badge?.type === 'recommended';

            return (
              <div
                key={product.id}
                className={cn(
                  "relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl border-2 overflow-hidden transform hover:scale-105 transition-transform duration-300 flex flex-col h-full",
                  isRecommended
                    ? "border-brand-red dark:border-red-500"
                    : "border-brand-light dark:border-gray-700"
                )}
              >
                {/* Popular Badge */}
                {product.badge?.type === 'popular' && (
                  <div className="absolute top-4 right-4 bg-green-500 dark:bg-green-500 text-white dark:text-white px-3 py-1 rounded-full text-sm font-bold flex items-center shadow-md z-10">
                    <IconCustomerLove className="w-4 h-4 mr-1" />
                    {product.badge.label}
                  </div>
                )}

                {/* Recommended Badge */}
                {product.badge?.type === 'recommended' && (
                  <div className="absolute top-4 right-4 bg-brand-red text-white dark:text-gray-100 px-3 py-1 rounded-full text-sm font-bold flex items-center shadow-md z-10">
                    <IconMoneyBack className="w-4 h-4 mr-1" />
                    {product.badge.label}
                  </div>
                )}

                {/* Trial Badge */}
                {product.badge?.type === 'trial' && (
                  <div className="absolute top-4 right-4 bg-brand-light dark:bg-emerald-900/40 text-brand-dark dark:text-emerald-400 px-3 py-1 rounded-full text-sm font-bold flex items-center shadow-md z-10">
                    <IconLongLasting className="w-4 h-4 mr-1" />
                    {product.badge.label}
                  </div>
                )}

                {/* Header with Image */}
                <div className={cn("bg-gradient-to-r p-6 text-white dark:text-gray-100 min-h-[160px]", product.color)}>
                  <div className="flex items-center gap-4">
                    {/* Product Image */}
                    <div className={cn(
                      "relative flex-shrink-0",
                      product.imageSize === 'sm' && "w-20 h-24",
                      product.imageSize === 'md' && "w-24 h-28",
                      product.imageSize === 'lg' && "w-28 h-32"
                    )}>
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain drop-shadow-lg"
                        sizes="(max-width: 768px) 80px, 112px"
                      />
                    </div>
                    {/* Product Info */}
                    <div className="flex-1">
                      <h3 className="font-heading text-2xl font-bold mb-1">{product.name}</h3>
                      <p className="text-sm opacity-80">{product.subtitle}</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center">
                      <IconLongLasting className="w-8 h-8 mx-auto mb-2 text-brand-purple dark:text-purple-400 drop-shadow-sm" />
                      <p className="text-sm text-gray-600 dark:text-gray-300">{t('productComparison.duration') || "Duration"}</p>
                      <p className="font-semibold text-gray-900 dark:text-gray-100">{product.duration}</p>
                    </div>
                    <div className="text-center">
                      <IconAnyLitter className="w-8 h-8 mx-auto mb-2 text-brand-purple dark:text-purple-400 drop-shadow-sm" />
                      <p className="text-sm text-gray-600 dark:text-gray-300">{t('productComparison.idealFor') || "Ideal For"}</p>
                      <p className="font-semibold text-gray-900 dark:text-gray-100">{product.idealFor}</p>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="font-heading font-bold mb-3 text-gray-900 dark:text-gray-100">{t('productComparison.features') || "Features"}:</h4>
                    <ul className="space-y-2">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                          <CheckCircle className="w-4 h-4 text-green-500 dark:text-green-400 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Best For */}
                  <div className="mb-6 p-4 bg-brand-light/30 dark:bg-gray-700/30 rounded-lg min-h-[88px]">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      <span className="font-semibold">{t('productComparison.idealFor') || "Ideal For"}:</span> {product.bestFor}
                    </p>
                  </div>

                  {/* CTA Button */}
                  <div className="mt-auto">
                    {product.ctaType === 'stripe' && product.stripeLink ? (
                      // Trial product: Direct Stripe checkout with compelling CTA
                      <div className="space-y-3">
                        <a href={product.stripeLink} target="_blank" rel="noopener noreferrer" className="block w-full">
                          <Button
                            size="lg"
                            className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white dark:text-white font-bold shadow-lg hover:shadow-xl transition-all"
                          >
                            <IconMoneyBack className="w-6 h-6 mr-2 -ml-2" />
                            {locale === 'fr' ? "Envoyer Mon Essai GRATUIT" : "Send My FREE Trial"}
                            <ChevronRight className="w-5 h-5 ml-2" />
                          </Button>
                        </a>
                        <p className="text-xs text-center text-gray-500 dark:text-gray-400 italic">
                          {locale === 'fr' ? `Juste ${trialPrice} pour l'expédition partout au Canada` : `Just ${trialPrice} shipping anywhere in Canada`}
                        </p>
                      </div>
                    ) : (
                      // Other products: Find a Store (B2B)
                      <div className="space-y-3">
                        <Link href={`${locale === 'fr' ? '/fr' : ''}/stores`}>
                          <Button
                            size="lg"
                            className="w-full bg-brand-purple hover:bg-brand-purple/90 text-white dark:text-gray-100"
                          >
                            <MapPin className="w-5 h-5 mr-2" />
                            {t('nav.findStore') || "Get Purrify Near You"}
                            <ChevronRight className="w-5 h-5 ml-2" />
                          </Button>
                        </Link>
                        {/* Invisible placeholder to match trial card's shipping text height */}
                        <p className="h-4 text-xs text-center text-gray-500 dark:text-gray-400 invisible" aria-hidden="true" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
