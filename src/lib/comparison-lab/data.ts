import type { ClaimRating } from '@/components/seo/ClaimReviewBlock';

export type ComparisonIntent = 'vs' | 'best' | 'alternative';

export interface ComparisonEvidenceSource {
  href: string;
  publishedAt: string;
  updatedAt?: string;
}

export interface ComparisonEntry {
  id: string;
  slug: string;
  translationKey: string;
  intent: ComparisonIntent;
  publishedAt: string;
  updatedAt: string;
  heroImage: string;
  claimRating: ClaimRating;
  evidence: ComparisonEvidenceSource[];
  relatedReadings: string[];
}

export const COMPARISON_LAB_BASE_PATH = '/learn/comparison-lab';
export const COMPARISON_LAB_METHODOLOGY_PATH = `${COMPARISON_LAB_BASE_PATH}/methodology`;

export const COMPARISON_ENTRIES: ComparisonEntry[] = [
  {
    id: 'activated-carbon-vs-baking-soda',
    slug: 'activated-carbon-vs-baking-soda',
    translationKey: 'activatedCarbonVsBakingSoda',
    intent: 'vs',
    publishedAt: '2026-03-07',
    updatedAt: '2026-03-07',
    heroImage: '/optimized/blog/activated-carbon-vs-baking-soda-comparison.webp',
    claimRating: 1,
    evidence: [
      {
        href: '/blog/activated-carbon-vs-baking-soda-comparison/',
        publishedAt: '2024-01-15',
        updatedAt: '2024-01-15',
      },
      {
        href: '/blog/tried-every-litter-deodorizer-90-days-results/',
        publishedAt: '2025-10-06',
        updatedAt: '2025-10-06',
      },
      {
        href: '/learn/ammonia-science/',
        publishedAt: '2024-01-20',
      },
    ],
    relatedReadings: [
      '/blog/powder-vs-spray-litter-deodorizer/',
      '/blog/most-powerful-odor-absorber/',
      '/learn/how-activated-carbon-works/',
    ],
  },
  {
    id: 'best-cat-litter-odor-control',
    slug: 'best-cat-litter-odor-control',
    translationKey: 'bestCatLitterOdorControl',
    intent: 'best',
    publishedAt: '2026-03-07',
    updatedAt: '2026-03-07',
    heroImage: '/optimized/blog/best-litter-smell-ghibli.webp',
    claimRating: 2,
    evidence: [
      {
        href: '/blog/best-cat-litter-odor-control-2026/',
        publishedAt: '2026-01-03',
        updatedAt: '2026-03-05',
      },
      {
        href: '/blog/tried-every-litter-deodorizer-90-days-results/',
        publishedAt: '2025-10-06',
        updatedAt: '2025-10-06',
      },
      {
        href: '/learn/ammonia-science/',
        publishedAt: '2024-01-20',
      },
    ],
    relatedReadings: [
      '/blog/best-natural-cat-litter-odor-control/',
      '/blog/best-unscented-cat-litters/',
      '/blog/how-often-change-cat-litter/',
    ],
  },
  {
    id: 'arm-and-hammer-alternative',
    slug: 'arm-and-hammer-alternative',
    translationKey: 'armAndHammerAlternative',
    intent: 'alternative',
    publishedAt: '2026-03-07',
    updatedAt: '2026-03-07',
    heroImage: '/optimized/blog/activated-carbon-vs-baking-soda-comparison.webp',
    claimRating: 2,
    evidence: [
      {
        href: '/learn/alternatives/arm-and-hammer-cat-litter-deodorizer-alternative/',
        publishedAt: '2025-01-25',
      },
      {
        href: '/blog/activated-carbon-vs-baking-soda-comparison/',
        publishedAt: '2024-01-15',
        updatedAt: '2024-01-15',
      },
      {
        href: '/blog/tried-every-litter-deodorizer-90-days-results/',
        publishedAt: '2025-10-06',
        updatedAt: '2025-10-06',
      },
    ],
    relatedReadings: [
      '/blog/fresh-step-vs-arm-hammer-comparison/',
      '/blog/powder-vs-spray-litter-deodorizer/',
      '/learn/how-activated-carbon-works/',
    ],
  },
];

export function getComparisonEntry(slug: string): ComparisonEntry | null {
  return COMPARISON_ENTRIES.find((entry) => entry.slug === slug) ?? null;
}

export function getComparisonPath(slug: string): string {
  return `${COMPARISON_LAB_BASE_PATH}/${slug}`;
}
