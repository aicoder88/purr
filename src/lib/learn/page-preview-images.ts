export type PagePreviewImage = {
  image: string;
  alt: string;
};

export const LEARN_PAGE_PREVIEW_IMAGES: Record<string, PagePreviewImage> = {
  '/learn/how-activated-carbon-works': {
    image: '/optimized/blog/ammonia-science.webp',
    alt: 'Activated carbon molecular structure showing porous surface',
  },
  '/learn/solutions/ammonia-smell-cat-litter': {
    image: '/optimized/blog/ammonia-hero-ghibli.webp',
    alt: 'Curious cat sitting beside a litter box with ammonia wisps rising like little spirits',
  },
  '/learn/solutions/how-to-neutralize-ammonia-cat-litter': {
    image: '/optimized/blog/ammonia-neutralize-hero-cinematic-v2.webp',
    alt: 'How to neutralize ammonia smell in cat litter box',
  },
  '/learn/solutions/apartment-cat-smell-solution': {
    image: '/optimized/blog/apartment-hero.webp',
    alt: 'Modern apartment with cat - clean, odor-free living space',
  },
  '/learn/solutions/litter-box-smell-elimination': {
    image: '/optimized/blog/litter-box-hero.webp',
    alt: 'Clean litter box with cat - complete odor elimination',
  },
  '/learn/solutions/multiple-cats-odor-control': {
    image: '/optimized/blog/multiple-cats-together.webp',
    alt: 'Multiple cats living together in clean, odor-free environment',
  },
  '/learn/solutions/natural-cat-litter-additive': {
    image: '/optimized/blog/litter-box-hero.webp',
    alt: 'Non-toxic cat litter deodorizer for safe odor control',
  },
  '/learn/solutions/senior-cat-litter-solutions': {
    image: '/optimized/blog/senior-cat-hero.png',
    alt: 'Senior cat litter solutions for comfort and mobility',
  },
};

export function getLearnPagePreviewImage(path: string): PagePreviewImage | null {
  const normalizedPath = path.length > 1 && path.endsWith('/')
    ? path.slice(0, -1)
    : path;

  return LEARN_PAGE_PREVIEW_IMAGES[normalizedPath] ?? null;
}
