import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/container';

type Article = {
  title: string;
  href: string;
  image: string;
  alt: string;
};

const ALL_ARTICLES: Article[] = [
  {
    title: 'Strong Cat Urine Smell Solutions',
    href: '/blog/strong-cat-urine-smell-litter-box',
    image: 'https://images.unsplash.com/photo-1541959833400-049d37f97c18?auto=format&fit=crop&w=1200&q=80',
    alt: 'Calm cat resting on a sofa in a bright living room'
  },
  {
    title: 'Activated Carbon Litter Additive Benefits',
    href: '/blog/activated-carbon-litter-additive-benefits',
    image: '/optimized/carbon_magnified_image.webp',
    alt: "Microscopic view of activated carbon's porous structure",
  },
  {
    title: 'How to Use a Cat Litter Deodorizer',
    href: '/blog/how-to-use-cat-litter-deodorizer',
    image: '/optimized/before-after.webp',
    alt: 'Before and after using deodorizer in litter box',
  },
  {
    title: 'Best Litter Odor Remover for Small Apartments',
    href: '/blog/best-litter-odor-remover-small-apartments',
    image: '/optimized/20g.webp',
    alt: 'Compact 20g product ideal for small apartments',
  },
  {
    title: 'Multi-Cat Litter Deodorizer Guide',
    href: '/blog/multi-cat-litter-deodorizer-guide',
    image: '/optimized/three_bags_no_bg.webp',
    alt: 'Multiple product sizes for multi-cat households',
  },
  {
    title: 'Using Deodorizers with Kittens',
    href: '/blog/using-deodorizers-with-kittens',
    image: '/optimized/gigi.webp',
    alt: 'Kitten next to litter box',
  },
  {
    title: 'House Smells Like Cat Litter Solutions',
    href: '/blog/house-smells-like-cat-litter-solutions',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1200&q=80',
    alt: 'Modern living room with fresh, clean air'
  },
  {
    title: 'Activated Carbon vs Baking Soda Comparison',
    href: '/blog/activated-carbon-vs-baking-soda-comparison',
    image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=1200&q=80',
    alt: 'Natural odor control comparison setup'
  },
  {
    title: 'Ammonia Smell from Cat Litter Solution',
    href: '/solutions/ammonia-smell-cat-litter',
    image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=1200&q=80',
    alt: 'Cat sitting near fresh litter box'
  },
  {
    title: 'Apartment Cat Smell Solution',
    href: '/solutions/apartment-cat-smell-solution',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80',
    alt: 'Modern apartment living space'
  },
  {
    title: 'Natural Cat Litter Additive Guide',
    href: '/solutions/natural-cat-litter-additive',
    image: 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?auto=format&fit=crop&w=1200&q=80',
    alt: 'Natural ingredients for cat care'
  },
  {
    title: 'Multiple Cats Odor Control Solutions',
    href: '/solutions/multiple-cats-odor-control',
    image: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=1200&q=80',
    alt: 'Multiple cats in a home environment'
  },
  {
    title: 'How Cat Litter Deodorizers Work',
    href: '/learn/how-it-works',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80',
    alt: 'Scientific explanation of odor control'
  },
  {
    title: 'Activated Carbon Benefits for Cat Owners',
    href: '/learn/activated-carbon-benefits',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1200&q=80',
    alt: 'Happy cat owner in fresh environment'
  },
  {
    title: 'Cat Litter Guide: Complete Care Manual',
    href: '/learn/cat-litter-guide',
    image: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=1200&q=80',
    alt: 'Complete cat care setup guide'
  },
];

export function RelatedArticles({ currentPath, limit = 3 }: { currentPath?: string; limit?: number }) {
  const items = ALL_ARTICLES.filter(a => a.href !== currentPath).slice(0, limit);

  if (items.length === 0) return null;

  return (
    <section aria-label="Related articles" className="py-12">
      <Container>
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Related Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <article key={item.href} className="group rounded-xl overflow-hidden border border-[#E0EFC7] dark:border-gray-700 bg-white dark:bg-gray-800/80 shadow-sm hover:shadow-md transition-all">
              <Link href={item.href} className="block focus:outline-none focus:ring-2 focus:ring-[#03E46A]">
                <div className="relative aspect-video overflow-hidden">
                  <Image src={item.image} alt={item.alt} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-[#5B2EFF] dark:text-[#3694FF] group-hover:text-[#5B2EFF]/80 dark:group-hover:text-[#3694FF]/80">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#03E46A] dark:text-[#3694FF] mt-2">Read more →</p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default RelatedArticles;
