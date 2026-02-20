import { BlogTopic, GeneratedImage } from './types';

const FALLBACK_IMAGES: GeneratedImage[] = [
  {
    kind: 'HERO',
    url: '/optimized/blog/activated-carbon-benefits.webp',
    alt: 'Cat litter deodorizer - activated carbon granules keeping litter box fresh',
    caption: 'Activated carbon absorbs odor molecules before they escape the litter box.',
    credit: 'Purrify Product Image',
    keywords: ['cat litter deodorizer', 'activated carbon']
  },
  {
    kind: 'SECTION',
    url: 'https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?auto=format&fit=crop&w=1600&q=80',
    alt: 'Multi-cat household litter routine checklist on counter',
    caption: 'Routine checklists keep multi-cat households ahead of odor spikes.',
    credit: 'Photo by Andrew Neel on Unsplash',
    keywords: ['multi cat odor plan']
  },
  {
    kind: 'SECTION',
    url: '/optimized/blog/house-smells-cat-litter.webp',
    alt: 'Frustrated apartment renter holding nose near litter box',
    caption: 'Odor emergencies happen fast in small apartments without airflow.',
    credit: 'Purrify Product Image',
    keywords: ['apartment litter smell']
  },
  {
    kind: 'SECTION',
    url: 'https://images.unsplash.com/photo-1472491235688-bdc81a63246e?auto=format&fit=crop&w=1600&q=80',
    alt: 'Activated carbon close-up showing porous surface area',
    caption: 'One gram of activated carbon packs thousands of square meters of surface area.',
    credit: 'Photo by Mike Petrucci on Unsplash',
    keywords: ['activated carbon science']
  }
];

type UnsplashPhoto = {
  id: string;
  alt_description: string | null;
  description: string | null;
  urls: { raw: string };
  user: { name: string; links: { html: string } };
};

const buildUnsplashUrl = (raw: string) => `${raw}&auto=format&fit=crop&w=1600&q=80`;

export async function selectImages(topic: BlogTopic, desiredCount = 3): Promise<GeneratedImage[]> {
  const key = process.env.UNSPLASH_ACCESS_KEY;
  if (!key) {
    return FALLBACK_IMAGES.slice(0, desiredCount).map((image, index) => ({
      ...image,
      kind: index === 0 ? 'HERO' : 'SECTION',
    }));
  }

  const query = [topic.primaryKeyword, 'cat litter', 'activated carbon', topic.targetAudience.split(' ')[0]]
    .filter(Boolean)
    .join(' ');

  const response = await fetch(
    `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=${Math.max(10, desiredCount * 3)}&content_filter=high&orientation=landscape`,
    {
      headers: {
        Authorization: `Client-ID ${key}`,
        'Accept-Version': 'v1',
      },
    }
  );

  if (!response.ok) {
    return FALLBACK_IMAGES.slice(0, desiredCount);
  }

  const json = await response.json();
  const results: UnsplashPhoto[] = json.results ?? [];

  if (!results.length) {
    return FALLBACK_IMAGES.slice(0, desiredCount);
  }

  const mapped: GeneratedImage[] = results.slice(0, desiredCount).map((photo, index) => ({
    kind: index === 0 ? 'HERO' : 'SECTION',
    url: buildUnsplashUrl(photo.urls.raw),
    alt: `${topic.primaryKeyword} - ${photo.alt_description ?? photo.description ?? topic.hook}`,
    caption: photo.description ?? undefined,
    credit: `Photo by ${photo.user.name} on Unsplash (${photo.user.links.html})`,
    keywords: [topic.primaryKeyword, ...topic.secondaryKeywords].slice(0, 4),
  }));

  return mapped;
}
