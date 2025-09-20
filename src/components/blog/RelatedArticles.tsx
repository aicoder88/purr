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
                  <p className="text-sm text-[#03E46A] mt-2">Read more →</p>
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
