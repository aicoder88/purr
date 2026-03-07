import { cache } from 'react';

import type { Locale } from '@/i18n/config';
import { ContentStore } from '@/lib/blog/content-store';
import { getTranslation } from '@/translations';
import type { BlogPost } from '@/types/blog';
import type { TranslationType } from '@/translations/types';

export type SearchDocumentType = 'blog' | 'faq' | 'learn' | 'product' | 'review' | 'support';

export interface SearchDocument {
  id: string;
  type: SearchDocumentType;
  title: string;
  summary: string;
  answer: string;
  url: string;
  keywords: string[];
  updatedAt?: string;
  featured?: boolean;
}

export interface SearchResult extends SearchDocument {
  score: number;
}

export interface SearchSectionCard {
  type: SearchDocumentType;
  label: string;
  title: string;
  summary: string;
  url: string;
  count: number;
}

export interface SearchExperience {
  copy: NonNullable<TranslationType['searchPage']>;
  locale: Locale;
  query: string;
  allDocuments: SearchDocument[];
  results: SearchResult[];
  bestAnswer: SearchResult | null;
  groupedResults: Array<{
    type: SearchDocumentType;
    label: string;
    results: SearchResult[];
  }>;
  featuredAnswers: SearchDocument[];
  recentGuides: SearchDocument[];
  relatedQueries: string[];
  sectionCards: SearchSectionCard[];
}

const RESULT_TYPE_ORDER: SearchDocumentType[] = ['faq', 'learn', 'blog', 'product', 'support', 'review'];
const MAX_RESULTS = 24;

const INTENT_KEYWORDS = {
  faq: ['how', 'what', 'why', 'when', 'can', 'safe', 'safety', 'faq', 'question', 'comment', 'quoi', 'pourquoi', 'quand', 'peut', 'sur', 'securite'],
  product: ['buy', 'shop', 'trial', 'sample', 'price', 'pricing', 'size', 'sizes', 'product', 'products', 'acheter', 'essai', 'format', 'prix', 'produit', 'produits'],
  support: ['support', 'shipping', 'delivery', 'return', 'returns', 'track', 'tracking', 'refund', 'order', 'contact', 'livraison', 'retour', 'suivi', 'commande', 'remboursement'],
  review: ['review', 'reviews', 'testimonial', 'testimonials', 'feedback', 'avis', 'temoignage', 'retour'],
  learn: ['science', 'works', 'guide', 'learn', 'ammonia', 'carbon', 'odor', 'odeur', 'charbon', 'ammoniac', 'apprendre', 'guide'],
};

const CURATED_KEYWORDS: Record<string, string[]> = {
  blogHub: ['blog', 'guides', 'comparisons', 'odor control', 'cat litter', 'articles'],
  learnHub: ['learn', 'science', 'setup', 'safety', 'guides'],
  howItWorks: ['how it works', 'activated carbon', 'adsorption', 'ammonia', 'odor control'],
  science: ['science', 'citations', 'adsorption', 'micropores', 'ammonia'],
  faqHub: ['faq', 'questions', 'answers', 'safety', 'shipping'],
  safety: ['safety', 'specifications', 'handling', 'SDS', 'carbon safety'],
  catLitterGuide: ['cat litter guide', 'litter types', 'maintenance', 'odor routine'],
  productsHub: ['products', 'pricing', 'sizes', 'shipping', 'trial size'],
  trialSize: ['trial size', 'sample', 'starter', 'first order'],
  reviewsHub: ['reviews', 'feedback', 'customer stories', 'testimonials'],
  supportHub: ['support', 'orders', 'returns', 'contact', 'help center'],
  shipping: ['shipping', 'delivery', 'tracking', 'returns', 'refund'],
};

function getSearchCopy(locale: Locale) {
  const translation = getTranslation(locale);
  if (!translation.searchPage) {
    throw new Error(`Missing searchPage translations for locale "${locale}"`);
  }

  return translation.searchPage;
}

function getLocalizedPath(locale: Locale, path: string) {
  const normalized = path.endsWith('/') ? path : `${path}/`;
  if (locale === 'fr') {
    return `/fr${normalized === '/' ? '' : normalized}`;
  }

  return normalized;
}

function getSearchPath(locale: Locale, query: string) {
  const basePath = getLocalizedPath(locale, '/search');
  return `${basePath}?q=${encodeURIComponent(query)}`;
}

function normalizeText(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function normalizeQuery(rawQuery?: string) {
  return (rawQuery ?? '').trim().replace(/\s+/g, ' ').slice(0, 120);
}

function tokenize(value: string) {
  return normalizeText(value)
    .split(' ')
    .filter((token) => token.length > 1);
}

function buildCuratedDocuments(locale: Locale, copy: NonNullable<TranslationType['searchPage']>): SearchDocument[] {
  const section = copy.destinations;

  return [
    {
      id: 'curated:blog-hub',
      type: 'blog',
      title: section.blogHub.title,
      summary: section.blogHub.summary,
      answer: section.blogHub.summary,
      url: getLocalizedPath(locale, '/blog'),
      keywords: CURATED_KEYWORDS.blogHub,
      featured: true,
    },
    {
      id: 'curated:learn-hub',
      type: 'learn',
      title: section.learnHub.title,
      summary: section.learnHub.summary,
      answer: section.learnHub.summary,
      url: getLocalizedPath(locale, '/learn'),
      keywords: CURATED_KEYWORDS.learnHub,
      featured: true,
    },
    {
      id: 'curated:how-it-works',
      type: 'learn',
      title: section.howItWorks.title,
      summary: section.howItWorks.summary,
      answer: section.howItWorks.summary,
      url: getLocalizedPath(locale, '/learn/how-it-works'),
      keywords: CURATED_KEYWORDS.howItWorks,
    },
    {
      id: 'curated:science',
      type: 'learn',
      title: section.science.title,
      summary: section.science.summary,
      answer: section.science.summary,
      url: getLocalizedPath(locale, '/learn/science'),
      keywords: CURATED_KEYWORDS.science,
      featured: true,
    },
    {
      id: 'curated:faq',
      type: 'faq',
      title: section.faqHub.title,
      summary: section.faqHub.summary,
      answer: section.faqHub.summary,
      url: getLocalizedPath(locale, '/learn/faq'),
      keywords: CURATED_KEYWORDS.faqHub,
      featured: true,
    },
    {
      id: 'curated:safety',
      type: 'learn',
      title: section.safety.title,
      summary: section.safety.summary,
      answer: section.safety.summary,
      url: getLocalizedPath(locale, '/learn/safety'),
      keywords: CURATED_KEYWORDS.safety,
    },
    {
      id: 'curated:cat-litter-guide',
      type: 'learn',
      title: section.catLitterGuide.title,
      summary: section.catLitterGuide.summary,
      answer: section.catLitterGuide.summary,
      url: getLocalizedPath(locale, '/learn/cat-litter-guide'),
      keywords: CURATED_KEYWORDS.catLitterGuide,
    },
    {
      id: 'curated:products',
      type: 'product',
      title: section.productsHub.title,
      summary: section.productsHub.summary,
      answer: section.productsHub.summary,
      url: getLocalizedPath(locale, '/products'),
      keywords: CURATED_KEYWORDS.productsHub,
      featured: true,
    },
    {
      id: 'curated:trial-size',
      type: 'product',
      title: section.trialSize.title,
      summary: section.trialSize.summary,
      answer: section.trialSize.summary,
      url: getLocalizedPath(locale, '/products/trial-size'),
      keywords: CURATED_KEYWORDS.trialSize,
    },
    {
      id: 'curated:reviews',
      type: 'review',
      title: section.reviewsHub.title,
      summary: section.reviewsHub.summary,
      answer: section.reviewsHub.summary,
      url: getLocalizedPath(locale, '/reviews'),
      keywords: CURATED_KEYWORDS.reviewsHub,
      featured: true,
    },
    {
      id: 'curated:support',
      type: 'support',
      title: section.supportHub.title,
      summary: section.supportHub.summary,
      answer: section.supportHub.summary,
      url: getLocalizedPath(locale, '/support'),
      keywords: CURATED_KEYWORDS.supportHub,
      featured: true,
    },
    {
      id: 'curated:shipping',
      type: 'support',
      title: section.shipping.title,
      summary: section.shipping.summary,
      answer: section.shipping.summary,
      url: getLocalizedPath(locale, '/support/shipping'),
      keywords: CURATED_KEYWORDS.shipping,
    },
  ];
}

function buildFaqDocuments(locale: Locale, translation: TranslationType): SearchDocument[] {
  const faqItems = translation.faqPage?.faqItems ?? [];

  return faqItems.map((item, index) => ({
    id: `faq:${index + 1}`,
    type: 'faq',
    title: item.question,
    summary: item.answer,
    answer: item.answer,
    url: `${getLocalizedPath(locale, '/learn/faq')}#faq-${index + 1}`,
    keywords: tokenize(`${item.question} ${item.answer}`),
    featured: index < 4,
  }));
}

function buildBlogDocuments(locale: Locale, posts: BlogPost[]): SearchDocument[] {
  const basePath = locale === 'fr' ? '/fr/blog' : '/blog';

  return posts.map((post, index) => ({
    id: `blog:${post.slug}`,
    type: 'blog',
    title: post.title,
    summary: post.excerpt,
    answer: post.excerpt,
    url: `${basePath}/${post.slug}/`,
    keywords: [
      ...post.tags,
      ...post.categories,
      ...post.seo.keywords,
    ],
    updatedAt: post.modifiedDate || post.publishDate,
    featured: index < 6,
  }));
}

function getTypeIntentBoost(type: SearchDocumentType, tokens: string[]) {
  const matchesFaq = tokens.some((token) => INTENT_KEYWORDS.faq.includes(token));
  const matchesProduct = tokens.some((token) => INTENT_KEYWORDS.product.includes(token));
  const matchesSupport = tokens.some((token) => INTENT_KEYWORDS.support.includes(token));
  const matchesReview = tokens.some((token) => INTENT_KEYWORDS.review.includes(token));
  const matchesLearn = tokens.some((token) => INTENT_KEYWORDS.learn.includes(token));

  if (type === 'faq' && matchesFaq) return 14;
  if (type === 'product' && matchesProduct) return 18;
  if (type === 'support' && matchesSupport) return 18;
  if (type === 'review' && matchesReview) return 14;
  if ((type === 'learn' || type === 'blog') && matchesLearn) return 10;

  return 0;
}

function scoreDocument(document: SearchDocument, query: string) {
  const normalizedQuery = normalizeText(query);
  const tokens = tokenize(query);
  const title = normalizeText(document.title);
  const summary = normalizeText(document.summary);
  const answer = normalizeText(document.answer);
  const keywords = normalizeText(document.keywords.join(' '));

  let score = 0;

  if (title === normalizedQuery) {
    score += 120;
  } else if (title.includes(normalizedQuery)) {
    score += 70;
  }

  if (summary.includes(normalizedQuery)) {
    score += 30;
  }

  if (answer.includes(normalizedQuery)) {
    score += 20;
  }

  for (const token of tokens) {
    if (title.includes(token)) score += 16;
    if (summary.includes(token)) score += 8;
    if (answer.includes(token)) score += 6;
    if (keywords.includes(token)) score += 12;
  }

  score += getTypeIntentBoost(document.type, tokens);

  if (document.featured) {
    score += 4;
  }

  if (document.id.startsWith('curated:') && score > 0) {
    score -= 6;
  }

  return score;
}

const getSearchDocuments = cache(async (locale: Locale) => {
  const translation = getTranslation(locale);
  const copy = getSearchCopy(locale);
  const contentStore = new ContentStore();
  const posts = await contentStore.getAllPosts(locale, false);

  const curatedDocuments = buildCuratedDocuments(locale, copy);
  const faqDocuments = buildFaqDocuments(locale, translation);
  const blogDocuments = buildBlogDocuments(locale, posts);

  return {
    copy,
    documents: [...curatedDocuments, ...faqDocuments, ...blogDocuments],
    recentGuides: blogDocuments.slice(0, 6),
    featuredAnswers: [
      ...faqDocuments.slice(0, 4),
      ...curatedDocuments.filter((document) => document.featured).slice(0, 4),
    ].slice(0, 8),
  };
});

function buildSectionCards(
  locale: Locale,
  documents: SearchDocument[],
  copy: NonNullable<TranslationType['searchPage']>
): SearchSectionCard[] {
  const counts = documents.reduce<Record<SearchDocumentType, number>>((acc, document) => {
    acc[document.type] += 1;
    return acc;
  }, {
    blog: 0,
    faq: 0,
    learn: 0,
    product: 0,
    review: 0,
    support: 0,
  });

  return [
    {
      type: 'blog',
      label: copy.documentTypes.blog,
      title: copy.destinations.blogHub.title,
      summary: copy.destinations.blogHub.summary,
      url: getLocalizedPath(locale, '/blog'),
      count: counts.blog,
    },
    {
      type: 'faq',
      label: copy.documentTypes.faq,
      title: copy.destinations.faqHub.title,
      summary: copy.destinations.faqHub.summary,
      url: getLocalizedPath(locale, '/learn/faq'),
      count: counts.faq,
    },
    {
      type: 'learn',
      label: copy.documentTypes.learn,
      title: copy.destinations.learnHub.title,
      summary: copy.destinations.learnHub.summary,
      url: getLocalizedPath(locale, '/learn'),
      count: counts.learn,
    },
    {
      type: 'product',
      label: copy.documentTypes.product,
      title: copy.destinations.productsHub.title,
      summary: copy.destinations.productsHub.summary,
      url: getLocalizedPath(locale, '/products'),
      count: counts.product,
    },
    {
      type: 'support',
      label: copy.documentTypes.support,
      title: copy.destinations.supportHub.title,
      summary: copy.destinations.supportHub.summary,
      url: getLocalizedPath(locale, '/support'),
      count: counts.support,
    },
    {
      type: 'review',
      label: copy.documentTypes.review,
      title: copy.destinations.reviewsHub.title,
      summary: copy.destinations.reviewsHub.summary,
      url: getLocalizedPath(locale, '/reviews'),
      count: counts.review,
    },
  ];
}

function buildGroupedResults(results: SearchResult[], copy: NonNullable<TranslationType['searchPage']>) {
  return RESULT_TYPE_ORDER
    .map((type) => ({
      type,
      label: copy.documentTypes[type],
      results: results.filter((result) => result.type === type).slice(0, type === 'faq' ? 6 : 4),
    }))
    .filter((group) => group.results.length > 0);
}

function buildRelatedQueries(copy: NonNullable<TranslationType['searchPage']>, query: string, results: SearchResult[]) {
  const normalizedQuery = normalizeText(query);
  const queryTokens = new Set(tokenize(query));

  return copy.quickQueries
    .filter((candidate) => normalizeText(candidate) !== normalizedQuery)
    .map((candidate) => {
      const candidateTokens = tokenize(candidate);
      const overlap = candidateTokens.filter((token) => queryTokens.has(token)).length;
      const resultOverlap = results.some((result) =>
        tokenize(`${result.title} ${result.summary}`).some((token) => candidateTokens.includes(token))
      ) ? 1 : 0;

      return {
        candidate,
        score: overlap * 4 + resultOverlap,
      };
    })
    .sort((left, right) => right.score - left.score || left.candidate.localeCompare(right.candidate))
    .map((item) => item.candidate)
    .slice(0, 6);
}

export async function getSearchExperience(locale: Locale, rawQuery?: string): Promise<SearchExperience> {
  const { copy, documents, recentGuides, featuredAnswers } = await getSearchDocuments(locale);
  const query = normalizeQuery(rawQuery);

  const results = query.length === 0
    ? []
    : documents
      .map((document) => ({
        ...document,
        score: scoreDocument(document, query),
      }))
      .filter((document) => document.score > 0)
      .sort((left, right) => {
        if (right.score !== left.score) {
          return right.score - left.score;
        }

        return left.title.localeCompare(right.title);
      })
      .slice(0, MAX_RESULTS);

  return {
    copy,
    locale,
    query,
    allDocuments: documents,
    results,
    bestAnswer: results[0] ?? null,
    groupedResults: buildGroupedResults(results, copy),
    featuredAnswers,
    recentGuides,
    relatedQueries: query.length === 0 ? copy.quickQueries.slice(0, 6) : buildRelatedQueries(copy, query, results),
    sectionCards: buildSectionCards(locale, documents, copy),
  };
}

export function getSearchSummaryCopy(experience: SearchExperience) {
  const answerLabel = experience.results.length === 1
    ? experience.copy.answerLabelSingular
    : experience.copy.answerLabelPlural;
  const sectionCount = experience.groupedResults.length;
  const sectionLabel = sectionCount === 1
    ? experience.copy.sectionLabelSingular
    : experience.copy.sectionLabelPlural;

  return `${experience.results.length} ${answerLabel} ${experience.copy.acrossLabel} ${sectionCount} ${sectionLabel}`;
}

export function getSearchHref(locale: Locale, query: string) {
  return getSearchPath(locale, query);
}
