/**
 * Page Images Mapping
 * Maps page URLs to their featured images for use in RelatedContent and other SEO components
 * enhanced to fallback to blog-posts.ts data
 */

import { sampleBlogPosts } from '../../data/blog-posts';

export interface PageImage {
  image: string;
  alt: string;
}

/**
 * Image mapping for all pages in topic clusters
 * Combined from RelatedArticles data and additional pages
 */
export const PAGE_IMAGES: Record<string, PageImage> = {
  // Blog posts
  '/blog/strong-cat-urine-smell-litter-box': {
    image: '/optimized/strong-cat-urine-smell.webp',
    alt: 'Close up of a clean, odor-free litter box environment',
  },
  '/blog/activated-carbon-litter-additive-benefits': {
    image: '/optimized/carbon_magnified_image.webp',
    alt: "Microscopic view of activated carbon's porous structure",
  },
  '/blog/how-to-use-cat-litter-deodorizer': {
    image: '/optimized/before-after.webp',
    alt: 'Before and after using deodorizer in litter box',
  },
  '/blog/best-litter-odor-remover-small-apartments': {
    image: '/optimized/17g-transparent-v2.webp',
    alt: 'Compact 12g product ideal for small apartments',
  },
  '/blog/multi-cat-litter-deodorizer-guide': {
    image: '/optimized/three-bags-no-bg.webp',
    alt: 'Multiple product sizes for multi-cat households',
  },
  '/blog/using-deodorizers-with-kittens': {
    image: '/optimized/gigi.webp',
    alt: 'Kitten next to litter box',
  },
  '/blog/house-smells-like-cat-litter-solutions': {
    image: '/optimized/house-smells-cat-litter.webp',
    alt: 'Modern living room with fresh, clean air',
  },
  '/blog/activated-carbon-vs-baking-soda-comparison': {
    image: '/optimized/activated-carbon-vs-baking-soda-comparison.webp',
    alt: 'Scientific comparison between activated carbon and baking soda for odor control',
  },
  '/blog/tried-everything-cat-litter-smell-solutions': {
    image: '/optimized/tried-hero.jpg',
    alt: 'Frustrated cat owner seeking solutions',
  },
  '/blog/most-powerful-odor-absorber': {
    image: '/optimized/scientific-odor-control.webp',
    alt: 'Powerful activated carbon odor absorption',
  },
  '/blog/cat-litter-smell-worse-summer': {
    image: '/optimized/summer-fresh-cat.webp',
    alt: 'Summer heat affecting litter odor',
  },
  '/blog/cat-litter-smell-worse-winter': {
    image: '/optimized/winter-fresh-cat.webp',
    alt: 'Winter indoor air quality for cats',
  },
  '/blog/embarrassed-guests-visit-cat-litter-smell': {
    image: '/optimized/embarrassed-hero.jpg',
    alt: 'Welcoming guests to a fresh home',
  },
  '/blog/powder-vs-spray-litter-deodorizer': {
    image: '/optimized/frequency-hero.webp',
    alt: 'Comparing deodorizer application methods',
  },
  '/blog/tried-every-litter-deodorizer-90-days-results': {
    image: '/optimized/90day-hero.webp',
    alt: '90-day deodorizer comparison test',
  },
  '/blog/activated-carbon-vs-zeolite-cat-litter': {
    image: '/optimized/carbon_magnified_image.webp',
    alt: 'Comparison of odor control materials',
  },

  // Learn pages
  '/learn/solutions/ammonia-smell-cat-litter': {
    image: '/optimized/catonbed.avif',
    alt: 'Cat relaxing on a freshly made bed in a clean home',
  },
  '/learn/solutions/apartment-cat-smell-solution': {
    image: '/optimized/small-apartment-odor-control.webp',
    alt: 'Modern apartment living space',
  },
  '/learn/solutions/natural-cat-litter-additive': {
    image: '/optimized/natural-cat-litter.webp',
    alt: 'Natural ingredients for cat care',
  },
  '/learn/solutions/multiple-cats-odor-control': {
    image: '/optimized/multiple-cats-together.webp',
    alt: 'Multiple cats in a home environment',
  },
  '/learn/solutions/litter-box-smell-elimination': {
    image: '/optimized/before-after.webp',
    alt: 'Litter box odor elimination guide',
  },
  '/learn/solutions/how-to-neutralize-ammonia-cat-litter': {
    image: '/optimized/catonbed.avif',
    alt: 'Guide to neutralizing ammonia smell',
  },
  '/learn/solutions/senior-cat-litter-solutions': {
    image: '/optimized/gigi.webp',
    alt: 'Senior cat care solutions',
  },
  '/learn/how-it-works': {
    image: '/optimized/cat-litter-deodorizer-guide.webp',
    alt: 'Scientific explanation of odor control',
  },
  '/learn/activated-carbon-benefits': {
    image: '/optimized/activated-carbon-benefits.webp',
    alt: 'Happy cat owner in fresh environment',
  },
  '/learn/cat-litter-guide': {
    image: '/optimized/cat-litter-deodorizer-guide.webp',
    alt: 'Complete cat care setup guide',
  },
  '/learn/activated-carbon-vs-baking-soda-deodorizers': {
    image: '/optimized/activated-carbon-vs-baking-soda-comparison.webp',
    alt: 'Comparison of activated carbon vs baking soda for cat litter',
  },
  '/learn/how-to-use-deodorizer': {
    image: '/optimized/before-after.webp',
    alt: 'How to use cat litter deodorizer',
  },
  '/learn/using-deodorizers-with-kittens': {
    image: '/optimized/gigi.webp',
    alt: 'Safe deodorizer use for kittens',
  },
  '/learn/safety': {
    image: '/optimized/gigi.webp',
    alt: 'Cat litter deodorizer safety information',
  },
  '/learn/science': {
    image: '/optimized/carbon_magnified_image.webp',
    alt: 'Science behind activated carbon',
  },
  '/learn/faq': {
    image: '/optimized/cat-litter-deodorizer-guide.webp',
    alt: 'Frequently asked questions',
  },
  '/learn/cat-litter-ammonia-health-risks': {
    image: '/optimized/catonbed.avif',
    alt: 'Understanding cat litter ammonia risks',
  },

  // Product pages
  '/products': {
    image: '/optimized/three-bags-no-bg.webp',
    alt: 'Purrify product lineup',
  },
  '/products/trial-size': {
    image: '/optimized/17g-transparent-v2.webp',
    alt: 'Trial size Purrify pouch',
  },
  '/products/standard': {
    image: '/optimized/60g-transparent.webp',
    alt: 'Standard Purrify pouch',
  },
  '/products/family-pack': {
    image: '/optimized/three-bags-no-bg.webp',
    alt: 'Family pack Purrify bundle',
  },

  // Other pages
  '/contact': {
    image: '/optimized/cat-litter-deodorizer-guide.webp',
    alt: 'Contact us for support',
  },
  '/support/shipping': {
    image: '/optimized/three-bags-no-bg.webp',
    alt: 'Shipping information',
  },
};

/**
 * Get image for a page URL
 * Returns a default fallback if no specific image is mapped
 */
export function getPageImage(url: string): PageImage {
  // 1. Check manual mapping first
  if (PAGE_IMAGES[url]) {
    return PAGE_IMAGES[url];
  }

  // 2. Check blog posts data
  const blogPost = sampleBlogPosts.find((post) => post.link === url);
  if (blogPost) {
    return {
      image: blogPost.image,
      alt: blogPost.heroImageAlt || blogPost.title,
    };
  }

  // 3. Fallback
  return {
    image: '/optimized/cat-litter-deodorizer-guide.webp',
    alt: 'Purrify cat litter deodorizer',
  };
}

/**
 * Check if a page has a mapped image
 */
export function hasPageImage(url: string): boolean {
  return url in PAGE_IMAGES;
}
