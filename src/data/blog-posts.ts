// Sample blog posts data
export type BlogPost = {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  image: string;
  link: string;
  content?: string;
};

// Generate dynamic blog posts based on actual blog pages
function generateLatestBlogPosts(): BlogPost[] {
  const now = Date.now();
  
  return [
    {
      title: 'Strong Cat Urine Smell in Litter Box? Proven Home Odor Fixes',
      excerpt: "Stop saying 'my house smells like cat litter' with this layered guide covering airflow, cleaning routines, and smart litter upgrades for a truly fresh home.",
      author: 'Clean Home Specialist Team',
      date: new Date(now - 0 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Today
      image: '/optimized/multi-cat-household.webp',
      link: '/blog/strong-cat-urine-smell-litter-box'
    },
    {
      title: "House Smells Like Cat Litter? 7 Proven Solutions to Control Cat Litter Smell",
      excerpt: "Is your house smelling like cat litter? Discover 7 proven methods to control cat litter smell and eliminate strong urine odors from your litter box permanently.",
      author: "Odor Control Specialist Team",
      date: new Date(now - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 1 day ago
      image: "/optimized/140g.webp",
      link: "/blog/house-smells-like-cat-litter-solutions"
    },
    {
      title: "Best Multi-Cat Litter Deodorizer: Ultimate Odor Control Guide 2024",
      excerpt: "Discover the most effective litter deodorizer for multi-cat households. Expert solutions to eliminate strong odors from multiple cats using proven activated carbon technology.",
      author: "Multi-Cat Specialist Team",
      date: new Date(now - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 2 days ago
      image: "/optimized/140g.webp",
      link: "/blog/multi-cat-litter-deodorizer-guide"
    },
    {
      title: "The Complete Guide to Cat Litter Deodorizers: How to Use Them Effectively",
      excerpt: "Master the art of using cat litter deodorizers with our comprehensive guide. Learn proper application techniques, timing, and maintenance tips for maximum odor control.",
      author: "Dr. Sarah Mitchell",
      date: new Date(now - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 3 days ago
      image: "/optimized/60g.webp",
      link: "/blog/how-to-use-cat-litter-deodorizer"
    },
    {
      title: "Activated Carbon vs Baking Soda Cat Litter Additives: Complete Comparison",
      excerpt: "Discover how Purrify's activated carbon technology compares to traditional baking soda approaches. See which solution provides superior odor control for your home.",
      author: "Pet Care Expert Team",
      date: new Date(now - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 5 days ago
      image: "/optimized/140g.webp",
      link: "/blog/activated-carbon-vs-baking-soda-additives"
    },
    {
      title: "Using Litter Deodorizers with Kittens: A Care Guide",
      excerpt: "Learn how households use Purrify around kittens, including key considerations, gradual introduction guidelines, and practical veterinary-informed tips for young cats.",
      author: "Dr. Emily Rodriguez, DVM",
      date: new Date(now - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 1 week ago
      image: "/optimized/20g.webp",
      link: "/blog/using-deodorizers-with-kittens"
    },
    {
      title: "Best Cat Litter Odor Remover for Small Apartments: Space-Saving Solutions",
      excerpt: "Living in a small apartment with cats? Discover the most effective odor control strategies and products specifically designed for compact living spaces.",
      author: "Urban Pet Living Specialist",
      date: new Date(now - 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 10 days ago
      image: "/optimized/carbon_magnified_image.webp",
      link: "/blog/best-litter-odor-remover-small-apartments"
    },
    {
      title: "Activated Carbon Cat Litter Additive Benefits: The Science Behind Odor Elimination",
      excerpt: "Explore the scientific benefits of activated carbon in cat litter additives. Learn how this natural solution provides superior odor control compared to traditional methods.",
      author: "Dr. Nathan Hale, Environmental Scientist",
      date: new Date(now - 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 2 weeks ago
      image: "/optimized/micropores_magnified_view.webp",
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
