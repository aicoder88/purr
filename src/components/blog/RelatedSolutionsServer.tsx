import Link from 'next/link';
import { ChevronRight, Wind, Sparkles, Building2, Cat, Users, Leaf, Heart } from 'lucide-react';
import { Container } from '@/components/ui/container';
import type { Locale } from '@/i18n/config';
import { localizePath } from '@/lib/i18n/locale-path';
import { getLearnPagePreviewImage } from '@/lib/learn/page-preview-images';
import { getOptimizedStaticImageData } from '@/lib/static-image-optimization';
import Image from 'next/image';

interface Solution {
  title: Record<'en' | 'fr', string>;
  description: Record<'en' | 'fr', string>;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const ALL_SOLUTIONS: Solution[] = [
  {
    title: { en: 'Ammonia Smell Solutions', fr: "Solutions contre l'odeur d'ammoniaque" },
    description: { en: 'Stop sharp ammonia odors at the source', fr: "Stoppez les odeurs d'ammoniaque à la source" },
    href: '/learn/solutions/ammonia-smell-cat-litter',
    icon: Wind,
  },
  {
    title: { en: 'How to Neutralize Ammonia', fr: "Comment neutraliser l'ammoniaque" },
    description: { en: 'Step-by-step guide to ammonia elimination', fr: "Guide étape par étape pour éliminer l'ammoniaque" },
    href: '/learn/solutions/how-to-neutralize-ammonia-cat-litter',
    icon: Sparkles,
  },
  {
    title: { en: 'Apartment Cat Smell', fr: "Odeur de chat en appartement" },
    description: { en: 'Keep small spaces fresh and odor-free', fr: 'Gardez les petits espaces frais et sans odeur' },
    href: '/learn/solutions/apartment-cat-smell-solution',
    icon: Building2,
  },
  {
    title: { en: 'Litter Box Odor Elimination', fr: 'Élimination des odeurs de litière' },
    description: { en: 'Complete guide to litter box freshness', fr: 'Guide complet pour une litière plus fraîche' },
    href: '/learn/solutions/litter-box-smell-elimination',
    icon: Cat,
  },
  {
    title: { en: 'Multiple Cats Odor Control', fr: 'Contrôle des odeurs pour plusieurs chats' },
    description: { en: 'Solutions for multi-cat households', fr: 'Solutions pour les foyers avec plusieurs chats' },
    href: '/learn/solutions/multiple-cats-odor-control',
    icon: Users,
  },
  {
    title: { en: 'Natural Cat Litter Additives', fr: 'Additifs naturels pour litière' },
    description: { en: 'Compare natural odor control options', fr: "Comparez les options naturelles contre les odeurs" },
    href: '/learn/solutions/natural-cat-litter-additive',
    icon: Leaf,
  },
  {
    title: { en: 'Senior Cat Solutions', fr: 'Solutions pour chats âgés' },
    description: { en: 'Gentle options for older cats', fr: 'Options douces pour les chats âgés' },
    href: '/learn/solutions/senior-cat-litter-solutions',
    icon: Heart,
  },
];

const SECTION_COPY = {
  en: {
    title: 'Related Solutions',
    viewAll: 'View all solutions',
  },
  fr: {
    title: 'Solutions associées',
    viewAll: 'Voir toutes les solutions',
  },
} as const;

interface RelatedSolutionsServerProps {
  locale: Locale;
  currentPath: string;
  limit?: number;
}

export function RelatedSolutionsServer({
  locale,
  currentPath,
  limit = 3,
}: RelatedSolutionsServerProps) {
  const normalizedCurrentPath = currentPath.replace(/^\/(en|fr)(?=\/|$)/, '') || '/';
  const lang = locale === 'fr' ? 'fr' : 'en';
  const copy = SECTION_COPY[lang];
  const solutions = ALL_SOLUTIONS.filter((solution) => solution.href !== normalizedCurrentPath).slice(0, limit);

  if (solutions.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-800/50">
      <Container>
        <h2 className="font-heading text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
          {copy.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {solutions.map((solution) => {
            const Icon = solution.icon;
            const preview = getLearnPagePreviewImage(solution.href);
            const image = preview?.image;
            const alt = preview?.alt || solution.title[lang];
            const optimizedImage = image
              ? getOptimizedStaticImageData(image, { preferredWidth: 640 })
              : null;

            return (
              <Link
                key={solution.href}
                href={localizePath(solution.href, locale)}
                prefetch={false}
                className="group flex items-start gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-[#03E46A] dark:hover:border-[#03E46A] transition-all hover:shadow-md"
              >
                {optimizedImage ? (
                  <div className="relative h-16 w-16 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700 flex-shrink-0">
                    <Image
                      src={optimizedImage.src}
                      alt={alt}
                      fill
                      sizes="64px"
                      className="object-cover"
                      {...(optimizedImage.blurDataURL ? {
                        placeholder: 'blur' as const,
                        blurDataURL: optimizedImage.blurDataURL,
                      } : {})}
                    />
                  </div>
                ) : (
                  <div className="flex-shrink-0 p-2 bg-[#5B2EFF]/10 dark:bg-[#3694FF]/10 rounded-lg">
                    <Icon className="w-5 h-5 text-[#5B2EFF] dark:text-[#3694FF]" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-heading font-semibold text-gray-900 dark:text-gray-100 group-hover:text-[#5B2EFF] dark:group-hover:text-[#3694FF] transition-colors">
                    {solution.title[lang]}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {solution.description[lang]}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 dark:text-gray-500 flex-shrink-0 transition-transform group-hover:translate-x-1" />
              </Link>
            );
          })}
        </div>
        <div className="mt-6 text-center">
          <Link
            href={localizePath('/learn/solutions', locale)}
            prefetch={false}
            className="inline-flex items-center text-[#5B2EFF] dark:text-[#3694FF] font-medium hover:underline"
          >
            {copy.viewAll}
            <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
