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

// Complete blog posts based on actual blog pages in content/blog/en/
function generateLatestBlogPosts(): BlogPost[] {
  return [
    // FEATURED POST - Pinned to top of homepage
    {
      title: 'How to Eliminate Cat Litter Smell: The NASA-Inspired Solution That Actually Works',
      excerpt: 'Tried everything for cat litter odor? Discover activated carbon - the same technology NASA uses in space. No perfumes, no chemicals. Traps ammonia molecules instantly.',
      author: 'Purrify Team',
      date: '2025-12-29',
      image: '/optimized/blog/scientific-odor-control.png',
      link: '/blog/space-station-secret-fresh-home-cat-owners'
    },
    {
      title: 'How to Get Rid of Cat Pee Smell in Apartment (Complete Guide)',
      excerpt: "Cat pee smell in your apartment? Here's exactly how to eliminate the odor from carpet, hardwood, concrete, and walls—before your landlord notices or your deposit disappears.",
      author: 'Purrify Team',
      date: '2026-01-28',
      image: '/optimized/blog/cat-litter-hero.png',
      link: '/blog/how-to-get-rid-of-cat-pee-smell-apartment'
    },
    {
      title: 'Fragrance-Free Litter Deodorizer (Why Your Cat Needs One)',
      excerpt: "Strong fragrances are the #1 reason cats avoid their litter box. Here's why fragrance-free deodorizers work better—and how to eliminate odors without overwhelming your cat's sensitive nose.",
      author: 'Purrify Team',
      date: '2026-01-27',
      image: '/optimized/benefits-hero-science.webp',
      link: '/blog/fragrance-free-litter-deodorizer'
    },
    {
      title: 'Safe Ways to Deodorize a Litter Box (Vet-Approved Methods)',
      excerpt: "Worried about your cat's sensitive nose? Here are 7 vet-approved, non-toxic ways to eliminate litter box odor without risking your cat's health. No harsh chemicals, no overpowering scents.",
      author: 'Purrify Team',
      date: '2026-01-26',
      image: '/optimized/science-diagram.webp',
      link: '/blog/safe-ways-to-deodorize-litter-box'
    },
    {
      title: 'Why Your Home Still Smells Like Cat: The Chemistry Behind Persistent Odor (And the Industrial Fix)',
      excerpt: 'Understanding the molecular science of cat odor reveals why air fresheners fail. Discover how filtration-grade activated carbon - the same technology in water filters and hospital air systems - actually eliminates smell.',
      author: 'Purrify Team',
      date: '2025-12-29',
      image: '/optimized/blog/lavender-cat-ghibli.png',
      link: '/blog/chemistry-of-cat-smell-industrial-fix'
    },
    {
      title: 'Why Does My House Smell Like Cat Litter? (Complete Fix Guide)',
      excerpt: "That lingering litter box smell isn't inevitable. Learn why cat odour spreads through your home and discover the science-backed solutions that actually work.",
      author: 'Purrify Team',
      date: '2026-01-03',
      image: '/optimized/cat_long_lasting_freshness_800x500.webp',
      link: '/blog/why-does-my-house-smell-like-cat-litter'
    },
    {
      title: "Why Does My Cat's Litter Box Smell So Bad? The Science Behind the Stink",
      excerpt: "Tired of holding your breath near the litter box? Discover why cat litter smells so bad and the science-backed solution that eliminates odors at the molecular level.",
      author: 'Purrify Team',
      date: '2026-01-02',
      image: '/optimized/blog/cat-fresh-home-ammonia.jpg',
      link: '/blog/why-does-my-cats-litter-box-smell-so-bad'
    },
    {
      title: 'Best Way to Keep Litter Box Fresh: A Complete Guide for Cat Owners',
      excerpt: 'Stop the daily battle with litter box odor. Learn the proven methods that actually work - from proper maintenance to molecular trapping technology used in water filtration.',
      author: 'Purrify Team',
      date: '2026-01-02',
      image: '/optimized/blog/happy-owner-cat-ghibli.png',
      link: '/blog/best-way-to-keep-litter-box-fresh'
    },
    {
      title: 'Activated Carbon for Cat Litter: The Complete Guide to Molecular Odor Control',
      excerpt: 'Learn how activated carbon eliminates cat litter odor at the molecular level. The same filtration technology as drinking water systems - now for your litter box.',
      author: 'Purrify Team',
      date: '2026-01-02',
      image: '/optimized/carbon-828w.webp',
      link: '/blog/activated-carbon-for-cat-litter-complete-guide'
    },
    {
      title: 'Top 10 Best Cat Litters for Odor Control (2026 Guide)',
      excerpt: "Looking for the best cat litter for odor control? We compare clumping, crystal, natural, and hybrid litters by odor-fighting technology—plus the upgrade that makes any litter work better.",
      author: 'Purrify Team',
      date: '2026-01-03',
      image: '/optimized/standard-hero-828w.webp',
      link: '/blog/best-cat-litter-odor-control-2026'
    },
    {
      title: 'Best Cat Litter Deodorizers (2026 Comparison)',
      excerpt: 'Comparing cat litter deodorizer types: powder, spray, crystal, enzyme, and activated carbon. Which actually eliminates odour versus just masking it? Science-based guide.',
      author: 'Purrify Team',
      date: '2026-01-03',
      image: '/optimized/blog/90day-solution.jpg',
      link: '/blog/best-cat-litter-deodorizers-2026'
    },
    {
      title: 'Cat Litter Odour Control Tips: The Ultimate Guide (2026)',
      excerpt: 'Discover proven cat litter odour control tips from daily habits to advanced solutions. Learn why most methods fail and the science-backed approach that actually eliminates litter box smell.',
      author: 'Purrify Team',
      date: '2026-01-03',
      image: '/optimized/cat-litter-deodorizer-guide.webp',
      link: '/blog/cat-litter-odour-control-tips'
    },
    {
      title: 'Best Litter Box Location for Odour Control (2026 Guide)',
      excerpt: "Where you place your cat's litter box dramatically affects odour. Learn the science behind optimal litter box placement and discover locations that minimise smell throughout your home.",
      author: 'Purrify Team',
      date: '2026-01-03',
      image: '/optimized/placement-828w.jpg',
      link: '/blog/best-litter-box-location-odour-control'
    },
    {
      title: 'How Often Should You Change Cat Litter? (Complete Schedule)',
      excerpt: "Learn exactly how often to change cat litter for different litter types, plus scooping schedules and signs that indicate it's time for a complete refresh. Includes multi-cat household adjustments.",
      author: 'Purrify Team',
      date: '2026-01-03',
      image: '/optimized/blog/frequency-hero.png',
      link: '/blog/how-often-change-cat-litter'
    },
    {
      title: 'Best Cat Litter for Smell: Honest Reviews & What Actually Works (2026)',
      excerpt: "Tired of litter that claims to control odour but doesn't deliver? We tested popular cat litters and reveal what actually eliminates smell—plus why activated carbon outperforms fragrance masking.",
      author: 'Purrify Team',
      date: '2026-01-02',
      image: '/optimized/standard-happy-cat.avif',
      link: '/blog/best-cat-litter-for-smell'
    },
    {
      title: 'Best Cat Litter for Apartments: Small Space Odor Control (2026)',
      excerpt: 'Living in an apartment with cats? Limited ventilation makes litter odour worse. Compare the best cat litters for apartments and discover the small-space solution that actually works.',
      author: 'Purrify Team',
      date: '2026-01-03',
      image: '/optimized/blog/apartment-odor-control-small-space-ghibli.png',
      link: '/blog/best-cat-litter-for-apartments'
    },
    {
      title: 'Best Cat Litter for Multiple Cats (2026 Complete Guide)',
      excerpt: 'Multi-cat households need litter that handles heavy use, controls intense odours, and stays fresh longer. Compare clumping, crystal, and natural litters with activated carbon for serious odour control.',
      author: 'Purrify Team',
      date: '2026-01-21',
      image: '/optimized/blog/multi-cat-happy-home-ghibli.png',
      link: '/blog/best-cat-litter-multiple-cats'
    },
    {
      title: 'Best Cat Litter for Multiple Cats: The Multi-Cat Odor Control Guide (2026)',
      excerpt: "Multi-cat households face exponential odor challenges—not just double the smell, but 4x worse. Here's how to choose litter that actually handles the ammonia load, plus the upgrade that scales with you.",
      author: 'Purrify Team',
      date: '2026-01-03',
      image: '/optimized/multiple-cats-together-1080w.webp',
      link: '/blog/best-cat-litter-multiple-cats-odor-control'
    },
    {
      title: 'Best Clumping Cat Litters for Maximum Odor Control (2026)',
      excerpt: 'Clumping cat litter excels at liquid absorption, but odor control requires more. Compare clumping litter technologies and discover the upgrade that eliminates what clumping alone misses.',
      author: 'Purrify Team',
      date: '2026-01-03',
      image: '/optimized/cat-favorite-litter-640w.webp',
      link: '/blog/best-clumping-cat-litter-odor-control'
    },
    {
      title: 'Best Natural Cat Litters for Odor Control (2026 Eco Guide)',
      excerpt: "Looking for eco-friendly cat litter that actually controls odour? Compare pine, corn, wheat, tofu, and other natural litters—plus the 100% natural upgrade that eliminates what plant-based litters miss.",
      author: 'Purrify Team',
      date: '2026-01-03',
      image: '/optimized/natural-cat-litter.avif',
      link: '/blog/best-natural-cat-litter-odor-control'
    },
    {
      title: 'Best Unscented Cat Litters for Sensitive Cats (2026 Guide)',
      excerpt: "Looking for fragrance-free litter that still controls odour? We review the best unscented options and reveal how to eliminate smell without artificial perfumes.",
      author: 'Purrify Team',
      date: '2026-01-03',
      image: '/optimized/ventilation.webp',
      link: '/blog/best-unscented-cat-litters'
    },
    {
      title: 'Best Unscented Cat Litter for Sensitive Cats (2026)',
      excerpt: 'Fragrances can trigger respiratory issues and litter box avoidance in sensitive cats. Find truly fragrance-free litters with natural odour control that cats actually use.',
      author: 'Purrify Team',
      date: '2026-01-21',
      image: '/optimized/blog/sensitive-cat-no-scent-ghibli.png',
      link: '/blog/best-unscented-cat-litter-sensitive-cats'
    },
    {
      title: 'Best Covered Litter Boxes for Odor Control (2026 Guide)',
      excerpt: 'Do covered litter boxes really contain odour better than open ones? We examine the pros and cons of enclosed boxes and reveal the science behind true odour elimination.',
      author: 'Purrify Team',
      date: '2026-01-03',
      image: '/optimized/cat_rose_thumbnail.webp',
      link: '/blog/best-covered-litter-boxes-odor-control'
    },
    {
      title: 'Best Self-Cleaning Litter Boxes for Odor Control (2026 Comparison)',
      excerpt: 'Automatic litter boxes promise hands-off convenience, but do they actually control odour? We compare top self-cleaning boxes and reveal how to maximize their odour-fighting potential.',
      author: 'Purrify Team',
      date: '2026-01-03',
      image: '/optimized/catcoco-1080w.jpg',
      link: '/blog/best-self-cleaning-litter-box-odor-control'
    },
    {
      title: 'How to Get Rid of Cat Litter Smell in Apartment (Complete Guide)',
      excerpt: "Living in a small space with a cat means litter box odour has nowhere to hide. Learn apartment-specific strategies to eliminate—not mask—cat litter smell.",
      author: 'Purrify Team',
      date: '2026-01-03',
      image: '/optimized/blog/tried-relief.jpg',
      link: '/blog/how-to-get-rid-of-cat-litter-smell-in-apartment'
    },

    {
      title: 'Apartment Litter Box Smell: The Complete Solution Guide',
      excerpt: "Living in an apartment with cats? Learn how to eliminate litter box odor in small spaces without air fresheners, candles, or constant cleaning.",
      author: 'Purrify Team',
      date: '2026-01-02',
      image: '/optimized/catonbed-1080w.webp',
      link: '/blog/apartment-litter-box-smell-solution'
    },
    {
      title: 'Best Cat Litter Odor Remover for Small Apartments: Urban Solutions',
      excerpt: 'Stop cat litter smell in tiny apartments. 5 proven methods to eliminate odors and keep neighbors happy. Works in studios and small spaces!',
      author: 'Purrify Team',
      date: '2024-02-01',
      image: '/optimized/blog/apartment-cat-lifestyle.png',
      link: '/blog/best-litter-odor-remover-small-apartments'
    },
    {
      title: 'How to Neutralize Ammonia in Cat Litter: 5 Proven Methods',
      excerpt: 'Cat litter smells like ammonia? Learn exactly what neutralizes ammonia and the 5 most effective methods to eliminate that harsh smell permanently.',
      author: 'Purrify Team',
      date: '2024-12-29',
      image: '/optimized/blog/ammonia-neutralized-magic-litter-ghibli.png',
      link: '/blog/how-to-neutralize-ammonia-cat-litter'
    },
    {
      title: 'How to Eliminate Cat Litter Odor: A Complete Guide',
      excerpt: 'Discover proven methods to keep your home fresh and odor-free with natural cat litter deodorizing solutions. Learn how activated carbon technology can transform your cat care routine.',
      author: 'Purrify Team',
      date: '2024-11-09',
      image: '/optimized/blog/fresh-home-hero-ghibli.png',
      link: '/blog/how-to-eliminate-cat-litter-odor'
    },
    {
      title: 'How to Reduce Litter Box Odor: 7 Expert Tips That Actually Work',
      excerpt: "Tired of litter box smell taking over your home? Skip the scented litters and air fresheners. These 7 science-backed methods eliminate odors at the source.",
      author: 'Purrify Team',
      date: '2025-01-02',
      image: '/optimized/pet-safety-home.webp',
      link: '/blog/how-to-reduce-litter-box-odor'
    },
    {
      title: 'Cat Litter Odor Control in America: What US Cat Owners Need to Know',
      excerpt: "From small NYC apartments to Texas ranch homes, American cat owners face unique litter box challenges. Here's why activated carbon beats traditional odor control methods.",
      author: 'Purrify Team',
      date: '2026-01-02',
      image: '/optimized/happy-owner.webp',
      link: '/blog/cat-litter-odor-control-usa'
    },
    {
      title: "I Tried Every Litter Deodorizer Method for 90 Days—Here's What Actually Worked",
      excerpt: 'My apartment smelled like a petting zoo. I spent $300 testing every deodorizer method I could find. Here\'s what finally eliminated the ammonia smell completely.',
      author: 'Purrify Team',
      date: '2025-10-06',
      image: '/optimized/blog/90day-hero.jpg',
      link: '/blog/tried-every-litter-deodorizer-90-days-results'
    },
    {
      title: 'Powder vs Spray Litter Deodorizer: I Used Both for 60 Days—Here\'s What Actually Works',
      excerpt: 'Spray deodorizers seem convenient, but they fail after 8 hours. I tested both formats for 60 days with 2 cats. Here\'s why powder wins every time—and the science behind it.',
      author: 'Purrify Team',
      date: '2024-12-22',
      image: '/optimized/activated-carbon-granules.jpg',
      link: '/blog/powder-vs-spray-litter-deodorizer'
    },
    {
      title: 'How Often to Add Litter Deodorizer? 100-Day Frequency Guide',
      excerpt: 'I tested every litter deodorizer frequency for 100 days to find the exact schedule that keeps ammonia under 5ppm. Here are the results for single and multi-cat homes.',
      author: 'Purrify Team',
      date: '2025-01-15',
      image: '/optimized/blog/frequency-hero-ghibli.png',
      link: '/blog/litter-deodorizer-frequency-guide'
    },
    {
      title: 'Most Powerful Odor Absorber for Cat Litter: Activated Carbon Guide',
      excerpt: 'Discover why activated carbon is the most powerful odor absorber for cat litter. Learn the science behind ammonia control and how to layer Purrify for maximum effectiveness.',
      author: 'Purrify Team',
      date: '2024-11-09',
      image: '/optimized/blog/most-powerful-absorber-hero-ghibli.png',
      link: '/blog/most-powerful-odor-absorber'
    },
    {
      title: 'Activated Carbon Litter Additive Benefits: The Science Behind Superior Odor Control',
      excerpt: 'Baking soda not working? Activated carbon destroys ammonia 10x better. See the science behind instant cat litter odor elimination!',
      author: 'Purrify Team',
      date: '2024-01-15',
      image: '/optimized/blog/activated-carbon-science-benefits-ghibli.png',
      link: '/blog/activated-carbon-litter-additive-benefits'
    },
    {
      title: 'Activated Carbon vs Baking Soda: The Ultimate Comparison',
      excerpt: 'Baking soda failing? See why 89% switch to activated carbon. Shocking test reveals which works better for cat litter smell!',
      author: 'Purrify Team',
      date: '2024-01-15',
      image: '/optimized/activated-carbon-vs-baking-soda.webp',
      link: '/blog/activated-carbon-vs-baking-soda-comparison'
    },
    {
      title: 'Embarrassed When Guests Visit? 5 Ways to Eliminate Cat Litter Smell Before Company Arrives',
      excerpt: "Stop being embarrassed when guests visit! 5 proven ways to eliminate cat litter smell in 24 hours before company arrives. Never apologize for odors again.",
      author: 'Purrify Team',
      date: '2025-01-20',
      image: '/optimized/blog/embarrassed-hero.jpg',
      link: '/blog/embarrassed-guests-visit-cat-litter-smell'
    },
    {
      title: 'Tried Everything for Cat Litter Smell? Why Most Solutions Fail (And What Actually Works)',
      excerpt: "Nothing working for cat litter smell? Discover why baking soda, air fresheners, and cheap deodorizers fail—and the scientific solution that actually works.",
      author: 'Purrify Team',
      date: '2025-01-20',
      image: '/optimized/blog/tried-hero.jpg',
      link: '/blog/tried-everything-cat-litter-smell-solutions'
    },
    {
      title: "Why Cat Litter Smells Worse in Winter (And 5 Solutions That Don't Require Opening Windows)",
      excerpt: "Cat litter smell unbearable in winter? Closed windows trap ammonia odors. Discover 5 proven solutions that work without opening windows in cold weather.",
      author: 'Purrify Team',
      date: '2025-11-09',
      image: '/optimized/blog/winter-fresh-cat.png',
      link: '/blog/cat-litter-smell-worse-winter'
    },
    {
      title: 'Why Cat Litter Smells Worse in Summer (And 4 Solutions That Actually Work)',
      excerpt: "Cat litter smell unbearable in summer? Discover why heat makes ammonia odors 10x stronger and 4 science-backed solutions that work in hot weather.",
      author: 'Purrify Team',
      date: '2025-01-20',
      image: '/optimized/blog/summer-fresh-cat.png',
      link: '/blog/cat-litter-smell-worse-summer'
    },
    {
      title: 'Strong Cat Urine Smell in the Litter Box? Try This Layered Fix',
      excerpt: 'Stop strong cat urine smell fast. Proven layered fix with airflow, hygiene tips, and activated carbon for instant freshness at home.',
      author: 'Purrify Team',
      date: '2025-11-09',
      image: '/optimized/blog/strong-odor-hero-ghibli.png',
      link: '/blog/strong-cat-urine-smell-litter-box'
    },
    {
      title: 'House Smells Like Cat Litter? 7 Proven Solutions to Control Cat Litter Smell',
      excerpt: 'Stop embarrassing cat litter odors in 24 hours. 7 proven methods to eliminate litter box smell and keep your home fresh.',
      author: 'Purrify Team',
      date: '2024-12-15',
      image: '/optimized/safe-cat-litter.webp',
      link: '/blog/house-smells-like-cat-litter-solutions'
    },
    {
      title: 'Best Multi-Cat Litter Deodorizer: Ultimate Odor Control Guide',
      excerpt: 'Discover the most effective litter deodorizer for multi-cat households. Expert solutions to eliminate strong odors from multiple cats using proven activated carbon technology.',
      author: 'Purrify Team',
      date: '2024-09-16',
      image: '/optimized/multi-cat-deodorizer.webp',
      link: '/blog/multi-cat-litter-deodorizer-guide'
    },
    {
      title: 'How to Use Cat Litter Deodorizer Additive: Complete Step-by-Step Guide',
      excerpt: 'Step-by-step guide to using cat litter deodorizer correctly. Avoid common mistakes and maximize odor control with expert tips.',
      author: 'Purrify Team',
      date: '2024-01-15',
      image: '/optimized/blog/applying-deodorizer-ghibli.png',
      link: '/blog/how-to-use-cat-litter-deodorizer'
    },
    {
      title: 'Using Cat Litter Deodorizers with Kittens: A Care Guide',
      excerpt: 'Complete guide to using litter deodorizers with kittens. Learn when, how, and what products work best for tiny paws. Natural, chemical-free options!',
      author: 'Purrify Team',
      date: '2024-01-25',
      image: '/optimized/blog/kitten-looking-curious-ghibli.png',
      link: '/blog/using-deodorizers-with-kittens'
    },
    {
      title: '10 Cat Litter Odor Myths That Waste Money (Science-Backed)',
      excerpt: "I tested 10 common cat litter odor control myths—coffee grounds, perfume sprays, daily scooping tricks—and measured the ammonia levels for each. Here's what actually works.",
      author: 'Purrify Team',
      date: '2024-12-09',
      image: '/optimized/blog/90day-science.jpg',
      link: '/blog/cat-litter-odor-myths'
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
