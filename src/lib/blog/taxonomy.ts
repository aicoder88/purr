import type { BlogPost } from '@/types/blog';

export const CANONICAL_CATEGORY_SLUGS = [
  'odor-control',
  'science-education',
  'buying-guide',
  'apartment-living',
  'product-reviews',
  'tips-advice',
  'cat-care',
  'product-guides',
  'cat-health',
  'how-to',
  'product-comparison',
  'multi-cat',
  'litter-boxes',
  'seasonal-odor-control',
  'eco-friendly',
  'us-customers',
  'cat-litter',
  'cat-safety',
  'kitten-care',
] as const;

export const CANONICAL_TAG_SLUGS = [
  'activated-carbon',
  'cat-litter',
  'odor-elimination',
  'multi-cat',
  'apartment-living',
  'eco-friendly',
  'pet-care',
  'cleaning-tips',
  'ammonia-control',
  'unscented-litter',
  'litter-boxes',
] as const;

export type CanonicalCategorySlug = (typeof CANONICAL_CATEGORY_SLUGS)[number];
export type CanonicalTagSlug = (typeof CANONICAL_TAG_SLUGS)[number];
export type TaxonomyKind = 'category' | 'tag';
export type CanonicalTaxonomySlug = CanonicalCategorySlug | CanonicalTagSlug;

export interface TaxonomyCount<TSlug extends string> {
  slug: TSlug;
  count: number;
}

export interface TaxonomyHubData {
  kind: TaxonomyKind;
  slug: CanonicalTaxonomySlug;
  posts: BlogPost[];
  featuredPosts: BlogPost[];
  remainingPosts: BlogPost[];
  relatedCategories: TaxonomyCount<CanonicalCategorySlug>[];
  relatedTags: TaxonomyCount<CanonicalTagSlug>[];
}

const CATEGORY_ALIAS_GROUPS: Record<CanonicalCategorySlug, string[]> = {
  'odor-control': [
    'Odor Control',
    'Odour Control',
    'odor-control',
    'Contrôle des Odeurs',
    'Contrôle des odeurs',
    'contrôle-odeurs',
    'contrôle-odeur',
    'Odor Control Solutions',
  ],
  'science-education': [
    'Science & Education',
    'Science & Technology',
    'Science et Éducation',
    'Science et education',
    'Science',
    'science',
    'Education',
    'Éducation',
    'Odor Control Science',
  ],
  'buying-guide': [
    'Buying Guide',
    'Guide d\'Achat',
    'Guide d\'achat',
    'Guide d achat',
  ],
  'apartment-living': [
    'Apartment Living',
    'Vie en Appartement',
    'Vie en appartement',
    'Small Spaces',
    'Petits espaces',
    'Urban Living Solutions',
  ],
  'product-reviews': [
    'Product Reviews',
    'Évaluations de produits',
    'Evaluations de produits',
  ],
  'tips-advice': [
    'Tips',
    'tips',
    'Tips & Guides',
    'Tips & Advice',
    'Tips & How-To',
    'Conseils',
    'Conseils & Guides',
    'Conseils & Guide Pratique',
    'Guide Pratique',
    'Home Tips',
    'Maintenance',
    'Real Talk',
    'Conseils et astuces',
  ],
  'cat-care': [
    'Cat Care',
    'Soins pour chats',
  ],
  'product-guides': [
    'Product Guide',
    'Guide Produit',
    'Guide de Produits',
    'Product Education',
    'Éducation Produit',
    'Product News',
    'Nouvelles du produit',
    'Guides produits',
  ],
  'cat-health': [
    'Cat Health',
    'Santé des Chats',
    'Sante des chats',
  ],
  'how-to': [
    'How-To',
    'Guide Pratique',
    'Guide pratique',
  ],
  'product-comparison': [
    'Product Comparison',
    'Product Comparisons',
    'product-comparison',
    'Comparison',
    'comparaison-produits',
    'Comparaison de produits',
  ],
  'multi-cat': [
    'Multi-Cat',
    'Multi-Cat Homes',
    'Multi-Chats',
    'Foyers Multi-Chats',
    'Foyers multi-chats',
  ],
  'litter-boxes': [
    'Litter Boxes',
    'Bacs à litière',
    'Bacs a litiere',
  ],
  'seasonal-odor-control': [
    'Seasonal Odor Control',
    'Contrôle des odeurs saisonnier',
    'Controle des odeurs saisonnier',
  ],
  'eco-friendly': [
    'Eco-Friendly',
    'Écologique',
    'Ecologique',
  ],
  'us-customers': [
    'US Customers',
    'Clients États-Unis',
    'Clients Etats-Unis',
  ],
  'cat-litter': [
    'Cat Litter',
    'Clumping Litter',
    'Litière pour chat',
    'Litiere pour chat',
  ],
  'cat-safety': [
    'Cat Safety',
    'Sécurité du chat',
    'Securite du chat',
  ],
  'kitten-care': [
    'Kitten Care',
    'Soins des chatons',
  ],
};

const TAG_ALIAS_GROUPS: Record<CanonicalTagSlug, string[]> = {
  'activated-carbon': [
    'activated carbon',
    'activated-carbon',
    'activated charcoal',
    'charbon actif',
  ],
  'cat-litter': [
    'cat litter',
    'cat-litter',
    'litière',
    'litter',
  ],
  'odor-elimination': [
    'odor elimination',
    'odour elimination',
    'odeur',
    'smell',
    'deodorizer',
    'désodorisant',
  ],
  'multi-cat': [
    'multi-cat',
    'multi cat',
    'multiple cats',
    'multi chats',
    'foyers multi-chats',
  ],
  'apartment-living': [
    'apartment',
    'small space',
    'studio',
    'appartement',
  ],
  'eco-friendly': [
    'eco',
    'natural',
    'biodegradable',
    'pine',
    'corn',
    'wheat',
    'tofu',
    'écologique',
  ],
  'pet-care': [
    'cat care',
    'kitten',
    'sensitive cats',
    'cat health',
    'safe',
    'asthma',
    'non toxic',
    'sans parfum',
  ],
  'cleaning-tips': [
    'how to',
    'guide',
    'tips',
    'maintenance',
    'deep clean',
    'placement',
    'instructions',
  ],
  'ammonia-control': [
    'ammonia',
    'ammoniac',
  ],
  'unscented-litter': [
    'unscented',
    'fragrance free',
    'fragrance-free',
    'sans parfum',
  ],
  'litter-boxes': [
    'litter box',
    'litter robot',
    'self-cleaning',
    'covered litter box',
    'hooded litter box',
    'bac à litière',
  ],
};

const categoryAliasMap = buildAliasMap(CATEGORY_ALIAS_GROUPS);
const tagAliasMap = buildAliasMap(TAG_ALIAS_GROUPS);

function normalizeTaxonomyText(value: string): string {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');
}

function buildAliasMap<TSlug extends string>(groups: Record<TSlug, string[]>): Map<string, TSlug> {
  const aliases = new Map<string, TSlug>();

  for (const [slug, values] of Object.entries(groups) as Array<[TSlug, string[]]>) {
    aliases.set(normalizeTaxonomyText(slug), slug);

    for (const value of values) {
      aliases.set(normalizeTaxonomyText(value), slug);
    }
  }

  return aliases;
}

function collectUniqueSlugs<TSlug extends string>(values: Iterable<TSlug>): TSlug[] {
  const seen = new Set<TSlug>();
  const result: TSlug[] = [];

  for (const value of values) {
    if (seen.has(value)) {
      continue;
    }

    seen.add(value);
    result.push(value);
  }

  return result;
}

function parsePublishTime(post: BlogPost): number {
  const timestamp = new Date(post.publishDate).getTime();
  return Number.isFinite(timestamp) ? timestamp : 0;
}

export function resolveCanonicalCategorySlug(value: string): CanonicalCategorySlug | null {
  return categoryAliasMap.get(normalizeTaxonomyText(value)) ?? null;
}

export function resolveCanonicalTagSlugs(value: string): CanonicalTagSlug[] {
  const normalizedValue = normalizeTaxonomyText(value);
  const directHit = tagAliasMap.get(normalizeTaxonomyText(value));

  if (directHit) {
    return [directHit];
  }

  const matches = (Object.entries(TAG_ALIAS_GROUPS) as Array<[CanonicalTagSlug, string[]]>)
    .filter(([, patterns]) => patterns.some((pattern) => normalizedValue.includes(normalizeTaxonomyText(pattern))))
    .map(([slug]) => slug);

  return collectUniqueSlugs(matches);
}

export function getCanonicalCategorySlugsForPost(post: BlogPost): CanonicalCategorySlug[] {
  return collectUniqueSlugs(
    (post.categories ?? [])
      .map((category) => resolveCanonicalCategorySlug(category))
      .filter((category): category is CanonicalCategorySlug => category !== null)
  );
}

export function getCanonicalTagSlugsForPost(post: BlogPost): CanonicalTagSlug[] {
  const rawValues = [...(post.tags ?? [])];
  return collectUniqueSlugs(
    rawValues.flatMap((value) => resolveCanonicalTagSlugs(value))
  );
}

export function postMatchesCategorySlug(post: BlogPost, slug: string): boolean {
  return getCanonicalCategorySlugsForPost(post).some((categorySlug) => categorySlug === slug);
}

export function postMatchesTagSlug(post: BlogPost, slug: string): boolean {
  return getCanonicalTagSlugsForPost(post).some((tagSlug) => tagSlug === slug);
}

export function getAvailableTaxonomySlugs(
  posts: BlogPost[],
  kind: TaxonomyKind
): CanonicalTaxonomySlug[] {
  const counts = new Map<string, number>();

  for (const post of posts) {
    const slugs = kind === 'category'
      ? getCanonicalCategorySlugsForPost(post)
      : getCanonicalTagSlugsForPost(post);

    for (const slug of slugs) {
      counts.set(slug, (counts.get(slug) ?? 0) + 1);
    }
  }

  const canonicalSlugs = kind === 'category' ? CANONICAL_CATEGORY_SLUGS : CANONICAL_TAG_SLUGS;

  return canonicalSlugs.filter((slug) => (counts.get(slug) ?? 0) > 0);
}

export function buildTaxonomyHubData(
  posts: BlogPost[],
  kind: TaxonomyKind,
  slug: CanonicalTaxonomySlug
): TaxonomyHubData | null {
  const matchingPosts = posts
    .filter((post) => (
      kind === 'category'
        ? getCanonicalCategorySlugsForPost(post).includes(slug as CanonicalCategorySlug)
        : getCanonicalTagSlugsForPost(post).includes(slug as CanonicalTagSlug)
    ))
    .sort((a, b) => parsePublishTime(b) - parsePublishTime(a));

  if (matchingPosts.length === 0) {
    return null;
  }

  const relatedCategoryCounts = new Map<CanonicalCategorySlug, number>();
  const relatedTagCounts = new Map<CanonicalTagSlug, number>();

  for (const post of matchingPosts) {
    for (const categorySlug of getCanonicalCategorySlugsForPost(post)) {
      if (kind === 'category' && categorySlug === slug) {
        continue;
      }

      relatedCategoryCounts.set(categorySlug, (relatedCategoryCounts.get(categorySlug) ?? 0) + 1);
    }

    for (const tagSlug of getCanonicalTagSlugsForPost(post)) {
      if (kind === 'tag' && tagSlug === slug) {
        continue;
      }

      relatedTagCounts.set(tagSlug, (relatedTagCounts.get(tagSlug) ?? 0) + 1);
    }
  }

  return {
    kind,
    slug,
    posts: matchingPosts,
    featuredPosts: matchingPosts.slice(0, 3),
    remainingPosts: matchingPosts.slice(3),
    relatedCategories: sortCounts(relatedCategoryCounts).slice(0, 6),
    relatedTags: sortCounts(relatedTagCounts).slice(0, 6),
  };
}

function sortCounts<TSlug extends string>(counts: Map<TSlug, number>): TaxonomyCount<TSlug>[] {
  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([slug, count]) => ({ slug, count }));
}
