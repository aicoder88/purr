import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getPaymentLink } from '@/lib/payment-links';

interface BlogProductCTAProps {
  locale: string;
  categories?: string[];
  tags?: string[];
}

type CTAVariant = 'trial' | 'family' | 'odor';

function getVariant(categories: string[], tags: string[]): CTAVariant {
  const haystack = [...categories, ...tags].map((s) => s.toLowerCase());

  const isMultiCat = haystack.some((s) =>
    s.includes('multi') || s.includes('multiple') || s.includes('plusieurs') || s.includes('family')
  );
  if (isMultiCat) return 'family';

  const isOdor = haystack.some((s) =>
    s.includes('odor') || s.includes('odour') || s.includes('smell') || s.includes('ammonia') ||
    s.includes('odeur') || s.includes('senteur')
  );
  if (isOdor) return 'odor';

  return 'trial';
}

const copy = {
  trial: {
    en: {
      heading: 'Ready to eliminate litter box odors?',
      body: 'Try Purrify free — just pay shipping. 30-day money-back guarantee.',
      cta: 'Get Your Free Trial',
    },
    fr: {
      heading: "Prêt à éliminer les odeurs de litière?",
      body: "Essayez Purrify gratuitement — payez seulement la livraison. Garantie 30 jours.",
      cta: 'Obtenez votre essai gratuit',
    },
  },
  family: {
    en: {
      heading: 'Multiple cats? We have the right size.',
      body: 'Our large 120g format is perfect for multi-cat households — up to 30 days of control. 30-day guarantee.',
      cta: 'Shop Family Size',
    },
    fr: {
      heading: 'Plusieurs chats? Nous avons la bonne taille.',
      body: 'Notre grand format 120g est parfait pour les foyers multi-chats — jusqu\'à 30 jours de contrôle. Garantie 30 jours.',
      cta: 'Commander le Format Familial',
    },
  },
  odor: {
    en: {
      heading: 'Stop masking odors — eliminate them.',
      body: 'Activated carbon physically traps ammonia molecules. Try the science-backed solution free — just pay shipping.',
      cta: 'Try It Free',
    },
    fr: {
      heading: 'Arrêtez de masquer les odeurs — éliminez-les.',
      body: 'Le charbon actif piège physiquement les molécules d\'ammoniaque. Essayez la solution scientifique gratuitement.',
      cta: 'Essayer Gratuitement',
    },
  },
} as const;

const hrefs = {
  trial: { en: '/buy/purrify-12g', fr: '/fr/buy/purrify-12g' },
  family: { en: '/stores', fr: '/fr/stores' },
  odor: { en: '/buy/purrify-12g', fr: '/fr/buy/purrify-12g' },
} as const;

export function BlogProductCTA({ locale, categories = [], tags = [] }: BlogProductCTAProps) {
  const variant = getVariant(categories, tags);
  const lang = locale === 'fr' ? 'fr' : 'en';
  const t = copy[variant][lang];

  // For trial/odor variants, use Stripe payment link if available
  let href: string = hrefs[variant][lang];
  if (variant !== 'family') {
    const stripeLink = getPaymentLink('trialSingle');
    if (stripeLink) href = stripeLink;
  }

  return (
    <aside className="my-12 rounded-2xl border border-brand-purple/20 bg-gradient-to-r from-brand-purple/5 to-transparent p-6 md:p-8 dark:border-purple-800/40 dark:from-purple-950/20">
      <h3 className="text-lg font-heading font-bold text-gray-900 dark:text-white">
        {t.heading}
      </h3>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
        {t.body}
      </p>
      <Link
        href={href}
        className="mt-4 inline-flex items-center gap-2 rounded-full bg-gray-900 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
      >
        {t.cta}
        <ArrowRight className="w-4 h-4" />
      </Link>
    </aside>
  );
}
