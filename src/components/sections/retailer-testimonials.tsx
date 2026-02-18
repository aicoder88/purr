import { Container } from '@/components/ui/container';
import { useTranslation } from '@/lib/translation-context';
import Image from 'next/image';
import { ReactNode } from 'react';

// Types
interface TestimonialLogo {
  src: string;
  alt: string;
  width: number;
  height: number;
  whiteBg?: boolean;
}

interface Testimonial {
  name: string;
  title: string;
  location: string;
  quote: string;
  logo: TestimonialLogo;
  stats: {
    label: string;
    value: string;
  };
}

interface BusinessMetric {
  icon: ReactNode;
  label: string;
  value: string;
  description: string;
}

// Shared gradient classes
const GRADIENTS = {
  primary: 'from-[#5B2EFF] to-[#3694FF]',
  primaryHover: 'hover:from-[#4C1EEB] hover:to-[#2563EB]',
  background: 'from-[#5B2EFF]/5 to-[#3694FF]/5 dark:from-[#3694FF]/10 dark:to-[#5B2EFF]/10',
} as const;

// Shared text color classes
const BRAND_TEXT = 'text-[#5B2EFF] dark:text-[#3694FF]';

// Icon components
function TrendUpIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  );
}

function DollarIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

// Data
const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Pattes et Griffes – Sainte‑Thérèse',
    title: 'Store Owner / Manager',
    location: 'Sainte‑Thérèse, QC',
    quote: "Our customers ask for Purrify by name now. It's an easy recommendation at the counter and reorders have been consistent month after month.",
    logo: {
      src: 'https://pattesgriffes.com/static/frontend/Sm/petshop_child/fr_FR/images/fonts/logo.svg',
      alt: 'Pattes et Griffes Logo',
      width: 64,
      height: 64,
      whiteBg: true
    },
    stats: {
      label: 'Average Reorder Cycle',
      value: '30 days'
    }
  },
  {
    name: 'Chico – Boul. St‑Laurent (Montreal)',
    title: 'Store Manager',
    location: 'Montreal, QC',
    quote: 'Simple to stock, strong margins, and it moves. The POS materials helped our team explain the benefits quickly to shoppers.',
    logo: {
      src: 'https://www.chico.ca/wp-content/themes/boutiquechico/img/chico.svg',
      alt: "Chico - Boutique d'animaux Logo",
      width: 64,
      height: 64,
      whiteBg: true
    },
    stats: {
      label: 'Shelf Sell‑Through',
      value: 'High'
    }
  },
  {
    name: 'KONG ANIMALERIE',
    title: 'Owner',
    location: 'Montreal, QC',
    quote: "Great add‑on at checkout. Customers come back for the larger sizes after trying it once, which tells us it's delivering results.",
    logo: {
      src: '/optimized/stores/kong-animalerie.webp',
      alt: 'KONG ANIMALERIE - Montreal Pet Store Logo',
      width: 64,
      height: 64,
      whiteBg: true
    },
    stats: {
      label: 'Repeat Purchases',
      value: 'Strong',
    },
  },
];

const BUSINESS_METRICS: BusinessMetric[] = [
  {
    icon: <TrendUpIcon />,
    label: 'Average Sales Increase',
    value: '156%',
    description: 'within first 6 months',
  },
  {
    icon: <HeartIcon />,
    label: 'Customer Satisfaction',
    value: '97%',
    description: 'repeat purchase rate',
  },
  {
    icon: <DollarIcon />,
    label: 'Profit Margin',
    value: '45%',
    description: 'average across all tiers',
  },
  {
    icon: <ClockIcon />,
    label: 'Inventory Turnover',
    value: '30 days',
    description: 'average turnover time',
  },
];

export function RetailerTestimonials() {
  const { t, locale } = useTranslation();
  const caseStudyCopy =
    locale === 'fr'
      ? {
        title: 'Vous voulez voir des etudes de cas detaillees?',
        description: "Telechargez nos histoires de succes retail pour voir comment d'autres magasins ont fait croitre leur activite avec Purrify.",
        download: 'Telecharger les etudes de cas',
        schedule: 'Planifier un appel avec un representant',
      }
      : {
        title: 'Want to see detailed case studies?',
        description: 'Download our retail success stories to see how other stores have grown their business with Purrify.',
        download: 'Download Case Studies',
        schedule: 'Schedule Call with Rep',
      };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <Container>
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">
            {t.retailers?.testimonials?.title || 'What Our Retail Partners Say'}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t.retailers?.testimonials?.description || 'Real feedback from successful pet store owners and managers across Canada.'}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {TESTIMONIALS.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="flex items-center mb-4">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mr-4 ${testimonial.logo?.whiteBg ? 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700' : `bg-gradient-to-br ${GRADIENTS.primary}`}`}>
                  {testimonial.logo && (
                    <Image src={testimonial.logo.src} alt={testimonial.logo.alt} width={testimonial.logo.width} height={testimonial.logo.height} className="object-contain w-10 h-10" />
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-gray-50">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{testimonial.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{testimonial.location}</p>
                </div>
              </div>

              <blockquote className="text-gray-700 dark:text-gray-200 italic mb-4">
                "{testimonial.quote}"
              </blockquote>

              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-300">{testimonial.stats.label}</span>
                  <span className={`font-bold ${BRAND_TEXT}`}>{testimonial.stats.value}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Business Metrics */}
        <div className={`bg-gradient-to-r ${GRADIENTS.background} rounded-2xl p-8`}>
          <h3 className="font-heading text-2xl font-bold text-gray-900 dark:text-gray-50 mb-8 text-center">
            {t.retailers?.testimonials?.metrics?.title || 'Proven Business Results'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {BUSINESS_METRICS.map((metric, index) => (
              <div key={index} className="text-center">
                <div className={`w-16 h-16 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg ${BRAND_TEXT}`}>
                  {metric.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-1">
                  {metric.value}
                </div>
                <div className="font-semibold text-gray-700 dark:text-gray-200 mb-1">
                  {metric.label}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {metric.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Case Study CTA */}
        <div className="mt-12 text-center">
          <h3 className="font-heading text-xl font-bold text-gray-900 dark:text-gray-50 mb-4">
            {caseStudyCopy.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {caseStudyCopy.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className={`bg-gradient-to-r ${GRADIENTS.primary} ${GRADIENTS.primaryHover} text-white dark:text-white font-bold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300`}>
              {caseStudyCopy.download}
            </button>
            <button className="border-2 border-[#5B2EFF] dark:border-[#3694FF] text-[#5B2EFF] dark:text-[#3694FF] hover:bg-[#5B2EFF] dark:hover:bg-[#3694FF] hover:text-white dark:hover:text-white font-bold py-3 px-8 rounded-lg transition-all duration-300">
              {caseStudyCopy.schedule}
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
