import type { ContentClass, ContentThresholds } from './types';

export const CONTENT_THRESHOLDS: Record<ContentClass, ContentThresholds> = {
  pillar_guide: {
    minWords: 1800,
    maxWords: 2400,
    minH2: 5,
    minH3: 3,
    minInlineImages: 3,
    maxWordsBetweenImages: 550,
    minInternalLinks: 4,
    minExternalLinks: 2,
  },
  comparison: {
    minWords: 1400,
    maxWords: 2200,
    minH2: 5,
    minH3: 2,
    minInlineImages: 3,
    maxWordsBetweenImages: 550,
    minInternalLinks: 4,
    minExternalLinks: 2,
  },
  how_to: {
    minWords: 1200,
    maxWords: 1800,
    minH2: 4,
    minH3: 2,
    minInlineImages: 2,
    maxWordsBetweenImages: 500,
    minInternalLinks: 4,
    minExternalLinks: 2,
  },
  quick_answer: {
    minWords: 900,
    maxWords: 1300,
    minH2: 3,
    minH3: 1,
    minInlineImages: 2,
    maxWordsBetweenImages: 500,
    minInternalLinks: 3,
    minExternalLinks: 1,
  },
};

export const CORE_LEARN_ROUTES = [
  {
    id: 'learn-cat-litter-guide',
    locale: 'en',
    url: '/learn/cat-litter-guide/',
  },
  {
    id: 'learn-cat-litter-guide',
    locale: 'fr',
    url: '/fr/learn/cat-litter-guide/',
  },
] as const;
