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

export const sampleBlogPosts: BlogPost[] = [
  {
    title: "How Activated Carbon Eliminates Cat Litter Odors",
    excerpt: "Learn the science behind how activated carbon effectively eliminates cat litter odors at the molecular level, rather than just masking them.",
    author: "Dr. Feline Expert",
    date: new Date().toISOString().split('T')[0],
    image: "/carbon_magnified_image.png",
    link: "/blog/activated-carbon-science"
  },
  {
    title: "5 Tips for a Fresher Home with Multiple Cats",
    excerpt: "Living with multiple cats doesn't mean your home has to smell like it. Discover practical tips for maintaining a fresh-smelling home.",
    author: "Cat Care Specialist",
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    image: "/three_bags_no_bg.png",
    link: "/blog/fresh-home-multiple-cats"
  },
  {
    title: "Why Traditional Odor Control Products Fall Short",
    excerpt: "Most cat litter odor products only mask smells temporarily. Find out why Purrify's approach is fundamentally different and more effective.",
    author: "Environmental Scientist",
    date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    image: "/micropores_magnified_view.jpeg",
    link: "/blog/beyond-masking-odors"
  }
];

// Function to get blog post content
export function getBlogPostContent(slug: string): string {
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
      <li>Environmentally sustainable source material</li>
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
    <p>This process is entirely physical rather than chemical, making it safe for your pets and home.</p>
    <h2>Conclusion</h2>
    <p>Understanding the science behind activated carbon helps explain why Purrify is so effective at eliminating cat litter odors. By targeting odors at the molecular level rather than masking them, Purrify provides a truly fresh-smelling home without the need for artificial fragrances or harsh chemicals.</p>
  `;
}