// Sample blog posts data
export type HowToStep = {
  name: string;
  text: string;
  position: number;
  image?: string;
};

export type HowToData = {
  name: string;
  description: string;
  totalTime?: string; // ISO 8601 duration format (e.g., "PT5M" for 5 minutes)
  estimatedCost?: {
    currency: string;
    value: string;
  };
  supply?: string[];
  tool?: string[];
  steps: HowToStep[];
};

export type BlogPost = {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  image: string;
  link: string;
  content?: string;
  locale?: 'en' | 'fr' | 'zh';
  heroImageAlt?: string;
  heroImageCaption?: string;
  heroImageCredit?: string;
  secondaryImages?: Array<{
    url: string;
    alt: string;
    caption?: string;
    credit?: string;
  }>;
  toc?: Array<{ title: string; id: string }>;
  faq?: Array<{ question: string; answerHtml: string }>;
  cta?: { text: string; url: string };
  howTo?: HowToData | null;
};

// Generate dynamic blog posts based on actual blog pages
function generateLatestBlogPosts(): BlogPost[] {
  const now = Date.now();

  return [
    // FEATURED POST - Pinned to top of homepage
    {
      title: 'How to Eliminate Cat Litter Smell: The NASA-Inspired Solution That Actually Works',
      excerpt: 'Tried everything for cat litter odor? Discover activated carbon - the same technology NASA uses in space. No perfumes, no chemicals. Traps ammonia molecules instantly.',
      author: 'Purrify Team',
      date: '2025-12-29', // Fixed publication date
      image: '/optimized/activated-carbon-benefits.webp',
      link: '/blog/space-station-secret-fresh-home-cat-owners'
    },
    {
      title: 'Most Powerful Odor Absorber for Cat Litter: Science-Backed 2025 Guide',
      excerpt: 'Break down the most powerful odor absorber technologies for cat litter, including how activated carbon outperforms zeolite and perfumes without overwhelming your cat.',
      author: 'Odor Science Research Team',
      date: new Date(now - 0 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Today
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1600&q=80',
      link: '/blog/most-powerful-odor-absorber'
    },
    {
      title: 'Embarrassed When Guests Visit? 5 Ways to Eliminate Cat Litter Smell Before Company Arrives',
      excerpt: "Stop panicking before guests arrive! These proven fast-acting solutions eliminate embarrassing cat litter odors in 24 hours so you can entertain with confidence.",
      author: 'Odor Control Specialist Team',
      date: new Date(now - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 1 day ago
      image: '/optimized/blog/embarrassed-hero.jpg',
      link: '/blog/embarrassed-guests-visit-cat-litter-smell'
    },
    {
      title: 'Tried Everything for Cat Litter Smell? Why Most Solutions Fail (And What Actually Works)',
      excerpt: "Nothing working for cat litter smell? Discover why baking soda, air fresheners, and cheap deodorizers fail—and the scientific solution that actually works.",
      author: 'Odor Science Expert Team',
      date: new Date(now - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 2 days ago
      image: '/optimized/blog/tried-hero.jpg',
      link: '/blog/tried-everything-cat-litter-smell-solutions'
    },
    {
      title: 'Why Cat Litter Smells Worse in Winter (And 5 Solutions That Don\'t Require Opening Windows)',
      excerpt: "Closed windows trapping unbearable cat litter smell? Discover 5 proven solutions that eliminate winter odors without freezing your home.",
      author: 'Seasonal Odor Control Team',
      date: new Date(now - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 3 days ago
      image: 'https://images.unsplash.com/photo-1483306130718-042b74ae6faa?auto=format&fit=crop&w=1600&q=80',
      link: '/blog/cat-litter-smell-worse-winter'
    },
    {
      title: 'Why Cat Litter Smells Worse in Summer (And 4 Solutions That Actually Work)',
      excerpt: "Heat doesn't just make you uncomfortable—it makes cat litter ammonia evaporate 10x faster. Discover the science behind summer odor problems and proven solutions.",
      author: 'Seasonal Odor Control Team',
      date: new Date(now - 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 4 days ago
      image: 'https://images.unsplash.com/photo-1561948955-570b270e7c36?auto=format&fit=crop&w=1600&q=80',
      link: '/blog/cat-litter-smell-worse-summer'
    },
    {
      title: 'Strong Cat Urine Smell in Litter Box? Proven Home Odor Fixes',
      excerpt: "Stop saying 'my house smells like cat litter' with this layered guide covering airflow, cleaning routines, and smart litter upgrades for a truly fresh home.",
      author: 'Clean Home Specialist Team',
      date: new Date(now - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 5 days ago
      image: '/optimized/strong-cat-urine-smell.webp',
      link: '/blog/strong-cat-urine-smell-litter-box'
    },
    {
      title: "House Smells Like Cat Litter? 7 Proven Solutions to Control Cat Litter Smell",
      excerpt: "Is your house smelling like cat litter? Discover 7 proven methods to control cat litter smell and eliminate strong urine odors from your litter box permanently.",
      author: "Odor Control Specialist Team",
      date: new Date(now - 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 6 days ago
      image: "/optimized/house-smells-cat-litter.webp",
      link: "/blog/house-smells-like-cat-litter-solutions"
    },
    {
      title: "Best Multi-Cat Litter Deodorizer: Ultimate Odor Control Guide 2024",
      excerpt: "Discover the most effective litter deodorizer for multi-cat households. Expert solutions to eliminate strong odors from multiple cats using proven activated carbon technology.",
      author: "Multi-Cat Specialist Team",
      date: new Date(now - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 days ago
      image: "/optimized/multi-cat-deodorizer.webp",
      link: "/blog/multi-cat-litter-deodorizer-guide"
    },
    {
      title: "The Complete Guide to Cat Litter Deodorizers: How to Use Them Effectively",
      excerpt: "Master the art of using cat litter deodorizers with our comprehensive guide. Learn proper application techniques, timing, and maintenance tips for maximum odor control.",
      author: "Dr. Sarah Mitchell",
      date: new Date(now - 8 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 8 days ago
      image: "/optimized/cat-litter-deodorizer-guide.webp",
      link: "/blog/how-to-use-cat-litter-deodorizer"
    },
    {
      title: "Activated Carbon vs Baking Soda Cat Litter Additives: Complete Comparison",
      excerpt: "Discover how Purrify's activated carbon technology compares to traditional baking soda approaches. See which solution provides superior odor control for your home.",
      author: "Pet Care Expert Team",
      date: new Date(now - 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 10 days ago
      image: "/optimized/activated-carbon-vs-baking-soda.webp",
      link: "/blog/activated-carbon-vs-baking-soda-comparison"
    },
    {
      title: "Using Litter Deodorizers with Kittens: A Care Guide",
      excerpt: "Learn how households use Purrify around kittens, including key considerations, gradual introduction guidelines, and practical veterinary-informed tips for young cats.",
      author: "Dr. Emily Rodriguez, DVM",
      date: new Date(now - 12 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 12 days ago
      image: "/optimized/deodorizers-with-kittens.webp",
      link: "/blog/using-deodorizers-with-kittens"
    },
    {
      title: "Best Cat Litter Odor Remover for Small Apartments: Space-Saving Solutions",
      excerpt: "Living in a small apartment with cats? Discover the most effective odor control strategies and products specifically designed for compact living spaces.",
      author: "Urban Pet Living Specialist",
      date: new Date(now - 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 14 days ago
      image: "/optimized/small-apartment-odor-control.webp",
      link: "/blog/best-litter-odor-remover-small-apartments"
    },
    {
      title: "Activated Carbon Cat Litter Additive Benefits: The Science Behind Odor Elimination",
      excerpt: "Explore the scientific benefits of activated carbon in cat litter additives. Learn how this natural solution provides superior odor control compared to traditional methods.",
      author: "Dr. Nathan Hale, Environmental Scientist",
      date: new Date(now - 16 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 16 days ago
      image: "/optimized/activated-carbon-benefits.webp",
      link: "/blog/activated-carbon-litter-additive-benefits"
    }
  ];
}

export const sampleBlogPosts: BlogPost[] = generateLatestBlogPosts();

// Function to get blog post content
export function getBlogPostContent(): string {
  // For now, we'll just return the same content for all posts
  // In a real app, you would have different content for each post
  return `
    <p>Activated carbon is a remarkable material with a unique ability to eliminate odors at the molecular level. Unlike traditional odor control products that simply mask smells with fragrances, activated carbon actually captures and traps odor molecules through a process called adsorption.</p>
    <h2>How Activated Carbon Works</h2>
    <p>The secret to activated carbon's effectiveness lies in its structure. When carbon is "activated" through a special heating process, it develops millions of microscopic pores, creating an enormous surface area. Just one gram of activated carbon can have a surface area equivalent to several tennis courts!</p>
    <p>These micropores act like tiny magnets for odor molecules, pulling them in and trapping them so they can no longer reach your nose. This is particularly effective for ammonia and sulfur compounds - the primary culprits behind cat litter box odors.</p>
    <h2>Why Purrify's Activated Carbon is Different</h2>
    <p>Not all activated carbon is created equal. Purrify uses a premium coconut shell-derived activated carbon that offers several advantages:</p>
    <ul>
      <li>Higher adsorption capacity than coal-based carbon</li>
      <li>More micropores for capturing smaller odor molecules</li>
      <li>Coconut shell source material</li>
      <li>No harmful additives or fragrances</li>
    </ul>
    <p>Our specialized activation process creates the optimal pore structure specifically designed to target pet odor molecules.</p>
    <h2>The Science of Odor Elimination</h2>
    <p>When you add Purrify to your cat's litter, the activated carbon immediately begins working to capture odor molecules before they can escape into the air. The process happens in three stages:</p>
    <ol>
      <li><strong>Attraction:</strong> Odor molecules are drawn to the carbon's surface</li>
      <li><strong>Adsorption:</strong> Molecules bind to the carbon through van der Waals forces</li>
      <li><strong>Retention:</strong> Molecules remain trapped within the carbon's structure</li>
    </ol>
    <p>This process is entirely physical rather than chemical and relies on the same type of activated carbon commonly used in household water and air filtration.</p>
    <h2>Conclusion</h2>
    <p>Understanding the science behind activated carbon helps explain why Purrify is so effective at eliminating cat litter odors. By targeting odors at the molecular level rather than masking them, Purrify provides a truly fresh-smelling home without the need for artificial fragrances or harsh chemicals.</p>
  `;
}
