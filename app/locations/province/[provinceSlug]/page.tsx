import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ChevronRight, Home, CheckCircle2, Star, ShieldCheck, Truck } from 'lucide-react';
import {
  Province,
  getProvinceBySlug,
  locationsByProvince,
} from '@/data/locations';
import { getTranslation } from '@/translations';
import type { TranslationType } from '@/translations/types';
import { SITE_NAME, SITE_URL } from '@/lib/constants';
import { LocalShippingUrgency } from '@/components/sections/locations/LocalShippingUrgency';
import { CityLeadCaptureCTA } from '@/components/sections/locations/CityLeadCaptureCTA';

interface ProvincePageProps {
  params: Promise<{
    provinceSlug: string;
  }>;
}

const PROVINCE_DISPLAY_OVERRIDES: Record<string, string> = {
  'Newfoundland and Labrador': 'Newfoundland & Labrador',
};

const PROVINCE_HERO_FALLBACKS: Record<string, string> = {
  ON: '/optimized/locations/ontario.png',
  QC: '/optimized/locations/quebec.png',
  AB: '/optimized/locations/alberta.png',
  BC: '/optimized/locations/british-columbia.png',
  NS: '/optimized/locations/atlantic.png',
  NB: '/optimized/locations/atlantic.png',
  PE: '/optimized/locations/atlantic.png',
  NL: '/optimized/locations/atlantic.png',
  MB: '/optimized/locations/prairies.png',
  SK: '/optimized/locations/prairies.png',
  YT: '/optimized/locations/north.png',
  NT: '/optimized/locations/north.png',
  NU: '/optimized/locations/north.png',
};

const GRADIENTS = {
  pageBackground: 'bg-gradient-to-br from-orange-50 to-pink-50 dark:from-gray-900 dark:to-gray-800',
  headingText: 'bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent',
  blueSection: 'bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20',
};

const hashString = (value: string): number => {
  let hash = 0;

  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }

  return Math.abs(hash);
};

const resolveProvinceHeroImage = (province: Province): string => {
  return PROVINCE_HERO_FALLBACKS[province.code] ?? PROVINCE_HERO_FALLBACKS.ON;
};

const normalizeCopyFragment = (value: string): string =>
  value.replace(/[.!?]+$/g, '').trim().toLowerCase();

type ProvinceTestimonialContext = {
  cityName: string;
  provinceName: string;
  painPoint: string;
  climateTip: string;
  housingHighlight: string;
};

const PROVINCE_TESTIMONIAL_TEMPLATES = [
  (context: ProvinceTestimonialContext) =>
    `In ${context.cityName}, ${context.painPoint}. Purrify keeps our place fresh without adding perfume.`,
  (context: ProvinceTestimonialContext) =>
    `Between ${context.housingHighlight} and ${context.climateTip}, we needed something reliable. Purrify is the first additive that kept odors under control.`,
  (context: ProvinceTestimonialContext) =>
    `We tried sprays and scented products in ${context.provinceName}, but this worked better right away. The litter box area finally smells clean.`,
  (context: ProvinceTestimonialContext) =>
    `Our routine in ${context.cityName} is simple now: scoop, add Purrify, done. No heavy fragrance, just cleaner air.`,
  (context: ProvinceTestimonialContext) =>
    `${context.climateTip} used to make odor spikes worse for us in ${context.cityName}. Purrify fixed that without changing our litter brand.`,
];

const buildProvinceTestimonial = (
  province: Province
): {
  quote: string;
  author: string;
} => {
  const anchorCity = province.cities[0];
  const cityName = anchorCity?.name ?? province.name;
  const painPoint = normalizeCopyFragment(
    anchorCity?.profile.scentPainPoints[0] ?? 'litter box odor would take over the room'
  );
  const climateTip = normalizeCopyFragment(
    anchorCity?.profile.climateConsiderations[0] ?? 'seasonal weather shifts'
  );
  const housingHighlight = normalizeCopyFragment(
    anchorCity?.profile.housingHighlights[0] ?? 'multi-cat households'
  );
  const context: ProvinceTestimonialContext = {
    cityName,
    provinceName: province.name,
    painPoint,
    climateTip,
    housingHighlight,
  };
  const hash = hashString(province.slug);
  const template = PROVINCE_TESTIMONIAL_TEMPLATES[
    hash % PROVINCE_TESTIMONIAL_TEMPLATES.length
  ];
  const authorLabels = [
    `${cityName} cat parent`,
    `${province.name} multi-cat household`,
    `${cityName} foster home`,
  ];

  return {
    quote: template(context),
    author: authorLabels[hash % authorLabels.length],
  };
};

/** Replace {{key}} placeholders with values */
const interpolate = (template: string, vars: Record<string, string>): string =>
  Object.entries(vars).reduce(
    (result, [key, value]) => result.replace(new RegExp(`{{${key}}}`, 'g'), value),
    template
  );

// Generate static params for all provinces
export async function generateStaticParams() {
  // Pre-render ALL province pages
  const paths = locationsByProvince.map((province) => ({
    provinceSlug: province.slug,
  }));

  return paths;
}

// Generate metadata for each province page
export async function generateMetadata({ params }: ProvincePageProps): Promise<Metadata> {
  const { provinceSlug } = await params;
  const province = getProvinceBySlug(provinceSlug);

  if (!province) {
    return {
      title: 'Province Not Found',
    };
  }

  const t = getTranslation('en');
  const locations = t.locations;
  const displayName = PROVINCE_DISPLAY_OVERRIDES[province.name] ?? province.name;
  const seoTitle = locations
    ? `${interpolate(locations.province.heading, { province: displayName })} (${province.code}) | ${SITE_NAME}`
    : `${displayName} | ${SITE_NAME}`;
  const seoDescription = locations
    ? interpolate(locations.province.description, { province: province.name })
    : `Find Purrify in ${province.name}`;
  const canonicalUrl = `${SITE_URL}/locations/province/${province.slug}/`;
  const heroImage = resolveProvinceHeroImage(province);

  return {
    title: seoTitle,
    description: seoDescription,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en-CA': `${SITE_URL}/locations/province/${province.slug}/`,
        'fr-CA': `${SITE_URL}/fr/locations/province/${province.slug}/`,
        'en-US': `${SITE_URL}/locations/province/${province.slug}/`,
        'x-default': `${SITE_URL}/locations/province/${province.slug}/`,
      },
    },
    keywords: [`cat litter ${province.name}`, `pet supplies ${province.name}`, `cat litter delivery ${province.name}`, `purrify ${province.name}`],
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: canonicalUrl,
      type: 'website',
      siteName: SITE_NAME,
      locale: 'en_CA',
      images: [
        {
          url: heroImage,
          width: 1200,
          height: 630,
          alt: `${province.name} Province Page`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@purrifyhq',
      creator: '@purrifyhq',
      title: seoTitle,
      description: seoDescription,
      images: [heroImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

// Breadcrumb schema
function generateBreadcrumbSchema(t: TranslationType, province: Province) {
  const displayName = PROVINCE_DISPLAY_OVERRIDES[province.name] ?? province.name;

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: t.nav.home,
        item: `${SITE_URL}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Locations',
        item: `${SITE_URL}/locations`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: displayName,
        item: `${SITE_URL}/locations/province/${province.slug}`,
      },
    ],
  };
}

export default async function ProvincePage({ params }: ProvincePageProps) {
  const { provinceSlug } = await params;
  const province = getProvinceBySlug(provinceSlug);

  if (!province) {
    notFound();
  }

  const t = getTranslation('en');
  const locations = t.locations;

  if (!locations) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  const otherProvinces = locationsByProvince.filter(
    (candidateProvince) => candidateProvince.slug !== province.slug
  );

  const displayName = PROVINCE_DISPLAY_OVERRIDES[province.name] ?? province.name;
  const breadcrumb = generateBreadcrumbSchema(t, province);
  const heroImage = resolveProvinceHeroImage(province);
  const provinceTestimonial = buildProvinceTestimonial(province);

  return (
    <>
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <div className={`min-h-screen ${GRADIENTS.pageBackground}`}>
        {/* Visual Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="bg-white/50 dark:bg-gray-800/50 border-b border-orange-100 dark:border-gray-700"
        >
          <div className="max-w-6xl mx-auto px-4">
            <ol className="flex items-center space-x-2 text-sm py-3">
              <li className="flex items-center">
                <Link
                  href="/"
                  className="text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                >
                  <Home className="h-4 w-4" />
                  <span className="sr-only">{t.nav.home}</span>
                </Link>
              </li>
              <li className="flex items-center">
                <ChevronRight className="h-4 w-4 mx-2 text-gray-400 dark:text-gray-500" />
                <Link
                  href="/locations/"
                  className="text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                >
                  Locations
                </Link>
              </li>
              <li className="flex items-center">
                <ChevronRight className="h-4 w-4 mx-2 text-gray-400 dark:text-gray-500" />
                <span
                  className="font-medium text-gray-900 dark:text-gray-100"
                  aria-current="page"
                >
                  {displayName}
                </span>
              </li>
            </ol>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative overflow-hidden pt-20 pb-16 md:pt-32 md:pb-24">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <Image
              src={heroImage}
              alt={`${province.name} background`}
              fill
              sizes="100vw"
              className="object-cover opacity-20 dark:opacity-30"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-50/50 to-orange-50 dark:via-gray-900/50 dark:to-gray-900" />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
            <span className="inline-flex items-center px-4 py-1 rounded-full bg-white/80 dark:bg-gray-800/70 border border-orange-200 dark:border-orange-500/60 text-xs sm:text-sm font-semibold uppercase tracking-widest text-orange-600 dark:text-orange-300 mb-6 shadow-sm">
              {locations.province.badge}
            </span>
            <h1 className="font-heading text-4xl md:text-7xl font-bold text-gray-900 dark:text-gray-50 mb-6 drop-shadow-sm">
              {interpolate(locations.province.heading, { province: province.name })}
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-200 max-w-3xl mx-auto mb-10 leading-relaxed">
              {interpolate(locations.province.description, { province: province.name })}
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/products/trial-size/"
                className="inline-flex items-center px-8 py-4 font-bold text-white dark:text-gray-100 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg shadow-xl hover:from-orange-600 hover:to-pink-600 transition-all transform hover:-translate-y-1"
              >
                {locations.hub.shopCta}
              </Link>
              <Link
                href="#province-cities"
                className="inline-flex items-center px-8 py-4 font-bold text-orange-600 dark:text-orange-300 bg-white dark:bg-gray-800/80 border border-orange-200 dark:border-orange-500/50 rounded-lg shadow-lg hover:bg-orange-50 dark:hover:bg-gray-700 transition-all transform hover:-translate-y-1"
              >
                {locations.province.viewCityGuide}
              </Link>
            </div>

            {/* Trust Signals */}
            <div className="mt-12 flex flex-wrap justify-center gap-8 text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500 dark:text-yellow-400 fill-yellow-500" />
                <span className="font-semibold">4.8/5 Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-green-500 dark:text-green-400" />
                <span className="font-semibold">Trusted by 10,000+</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                <span className="font-semibold">Fast Shipping</span>
              </div>
            </div>
          </div>
        </section>

        {/* Shipping Urgency Section */}
        <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
          <LocalShippingUrgency
            cityName={province.cities[0]?.name || province.name}
            provinceName={province.name}
            provinceCode={province.code}
          />
        </div>

        {/* Main Content - Cities Grid */}
        <section id="province-cities" className="py-24 px-4 bg-white dark:bg-gray-900">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-heading text-3xl md:text-5xl font-bold text-gray-900 dark:text-gray-50 mb-4">
                {interpolate(locations.province.citiesHeading, { province: province.name })}
              </h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-orange-500 to-pink-500 mx-auto rounded-full" />
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {province.cities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/locations/${city.slug}`}
                  className="group relative flex flex-col rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/40 p-8 transition-all hover:border-orange-300 dark:hover:border-orange-500/40 hover:shadow-2xl hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                >
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronRight className="w-5 h-5 text-orange-500 dark:text-orange-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50 group-hover:text-orange-600 dark:group-hover:text-orange-300 mb-2">
                    {city.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 leading-relaxed">
                    {interpolate(locations.province.cityCardDescription, { city: city.name })}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Purrify Section */}
        <section className={`py-24 px-4 ${GRADIENTS.blueSection}`}>
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-8 leading-tight">
                  Why {province.name} Cat Parents Love Purrify
                </h2>
                <div className="space-y-6 text-lg text-gray-700 dark:text-gray-200">
                  <div className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <p><span className="font-bold text-gray-900 dark:text-gray-50">Natural Ingredients:</span> Fragrance-free activated carbon is safe for even the most sensitive {province.name} cats.</p>
                  </div>
                  <div className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <p><span className="font-bold text-gray-900 dark:text-gray-50">Industrial Strength:</span> Eliminates ammonia odors instantly, keeping your home fresh without strong perfumes.</p>
                  </div>
                  <div className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <p><span className="font-bold text-gray-900 dark:text-gray-50">Fast Shipping:</span> Direct to your door anywhere in {province.name} within 2-3 business days.</p>
                  </div>
                  {province.cities[0]?.profile && (
                    <div className="flex gap-4">
                      <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                      <p><span className="font-bold text-gray-900 dark:text-gray-50">Climate Optimized:</span> Works 24/7 regardless of {province.cities[0].profile.climateConsiderations[0]?.toLowerCase() || 'humidity or temperature'}.</p>
                    </div>
                  )}
                </div>

                <div className="mt-10">
                  <CityLeadCaptureCTA
                    cityName={`All of ${province.name}`}
                    provinceName={province.name}
                    citySlug={province.slug}
                    provinceCode={province.code}
                    scentFocus={province.cities[0]?.profile?.scentPainPoints[0] || 'Litter box odors in multi-cat homes'}
                  />
                </div>
              </div>
              <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src={heroImage}
                  alt={`${province.name} lifestyle`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent dark:from-black/60" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white dark:text-gray-100 font-semibold italic text-lg leading-snug">
                    &quot;{provinceTestimonial.quote}&quot;
                  </p>
                  <p className="text-orange-200 dark:text-orange-300 mt-2 text-sm font-bold uppercase tracking-wider">— {provinceTestimonial.author}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Explore Other Provinces */}
        <section className="py-24 px-4 bg-gray-50 dark:bg-gray-900/50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-heading text-3xl font-bold text-gray-900 dark:text-gray-50 mb-10">
              {locations.province.exploreOther}
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {otherProvinces.map((candidateProvince) => (
                <Link
                  key={candidateProvince.slug}
                  href={`/locations/province/${candidateProvince.slug}`}
                  className="inline-flex items-center rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-6 py-3 text-sm font-bold text-gray-700 dark:text-gray-200 transition-all hover:border-orange-300 dark:hover:border-orange-500 hover:text-orange-600 dark:hover:text-orange-400 hover:shadow-md"
                >
                  {candidateProvince.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
