import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/container';
import { useTranslation } from '@/lib/translation-context';

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
    image: '/optimized/strong-cat-urine-smell.webp',
    alt: 'Odor-free home environment for cats'
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
    image: '/optimized/17g-transparent.webp',
    alt: 'Compact 12g product ideal for small apartments',
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
    image: '/optimized/house-smells-cat-litter.webp',
    alt: 'Modern living room with fresh, clean air'
  },
  {
    title: 'Activated Carbon vs Baking Soda Comparison',
    href: '/blog/activated-carbon-vs-baking-soda-comparison',
    image: '/optimized/activated-carbon-vs-baking-soda-comparison.webp',
    alt: 'Scientific comparison of odor control methods'
  },
  {
    title: 'Tried Everything for Cat Litter Smell?',
    href: '/blog/tried-everything-cat-litter-smell-solutions',
    image: '/optimized/tried-hero.jpg',
    alt: 'Frustrated cat owner seeking solutions'
  },
  {
    title: 'Most Powerful Odor Absorber',
    href: '/blog/most-powerful-odor-absorber',
    image: '/optimized/scientific-odor-control.webp',
    alt: 'Powerful activated carbon odor absorption'
  },
  {
    title: 'Cat Litter Smells Worse in Summer',
    href: '/blog/cat-litter-smell-worse-summer',
    image: '/optimized/summer-fresh-cat.webp',
    alt: 'Summer heat affecting litter odor'
  },
  {
    title: 'Cat Litter Smells Worse in Winter',
    href: '/blog/cat-litter-smell-worse-winter',
    image: '/optimized/winter-fresh-cat.webp',
    alt: 'Winter indoor air quality for cats'
  },
  {
    title: 'Embarrassed When Guests Visit?',
    href: '/blog/embarrassed-guests-visit-cat-litter-smell',
    image: '/optimized/embarrassed-hero.jpg',
    alt: 'Welcoming guests to a fresh home'
  },
  {
    title: 'Purrify vs Spray Litter Deodorizer',
    href: '/blog/powder-vs-spray-litter-deodorizer',
    image: '/optimized/frequency-hero.webp',
    alt: 'Comparing deodorizer application methods'
  },
  {
    title: '90 Days Testing Every Deodorizer',
    href: '/blog/tried-every-litter-deodorizer-90-days-results',
    image: '/optimized/90day-hero.webp',
    alt: '90-day deodorizer comparison test'
  },
  {
    title: 'Ammonia Smell from Cat Litter Solution',
    href: '/learn/solutions/ammonia-smell-cat-litter',
    image: '/optimized/catonbed.avif',
    alt: 'Cat relaxing on a freshly made bed in a clean home'
  },
  {
    title: 'Apartment Cat Smell Solution',
    href: '/learn/solutions/apartment-cat-smell-solution',
    image: '/optimized/small-apartment-odor-control.webp',
    alt: 'Modern apartment living space'
  },
  {
    title: 'Natural Cat Litter Additive Guide',
    href: '/learn/solutions/natural-cat-litter-additive',
    image: '/optimized/natural-cat-litter.webp',
    alt: 'Natural ingredients for cat care'
  },
  {
    title: 'Multiple Cats Odor Control Solutions',
    href: '/learn/solutions/multiple-cats-odor-control',
    image: '/optimized/multiple-cats-together.webp',
    alt: 'Multiple cats in a home environment'
  },
  {
    title: 'How Cat Litter Deodorizers Work',
    href: '/learn/how-it-works',
    image: '/optimized/cat-litter-deodorizer-guide.webp',
    alt: 'Scientific explanation of odor control'
  },
  {
    title: 'Activated Carbon Benefits for Cat Owners',
    href: '/learn/activated-carbon-benefits',
    image: '/optimized/activated-carbon-science-benefits-ghibli.webp',
    alt: 'Happy cat owner in fresh environment'
  },
  {
    title: 'Cat Litter Guide: Complete Care Manual',
    href: '/learn/cat-litter-guide',
    image: '/optimized/cat-litter-deodorizer-guide.webp',
    alt: 'Complete cat care setup guide'
  },
  {
    title: 'How to Neutralize Ammonia in Cat Litter',
    href: '/learn/solutions/how-to-neutralize-ammonia-cat-litter',
    image: '/images/ammonia-science.webp',
    alt: 'Scientific approach to neutralizing ammonia odors'
  },
  {
    title: 'Litter Box Smell Elimination Guide',
    href: '/learn/solutions/litter-box-smell-elimination',
    image: '/images/litter-box-hero.webp',
    alt: 'Clean litter box in a fresh home'
  },
  {
    title: 'Senior Cat Litter Solutions',
    href: '/learn/solutions/senior-cat-litter-solutions',
    image: '/optimized/cat_long_lasting_freshness_800x500.webp',
    alt: 'Comfortable litter solutions for senior cats'
  },
];

export function RelatedArticles({ currentPath, limit = 3 }: { currentPath?: string; limit?: number }) {
  const { t } = useTranslation();
  const items = ALL_ARTICLES.filter(a => a.href !== currentPath).slice(0, limit);

  if (items.length === 0) return null;

  return (
    <section aria-label="Related articles" className="py-12">
      <Container>
        <h2 className="font-heading text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
          {t.relatedArticles?.title || ""}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <article key={item.href} className="group rounded-xl overflow-hidden border border-[#E0EFC7] dark:border-gray-700 bg-white dark:bg-gray-800/80 shadow-sm hover:shadow-md transition-all">
              <Link href={item.href} className="block focus:outline-none focus:ring-2 focus:ring-[#03E46A]">
                <div className="relative aspect-video overflow-hidden">
                  <Image src={item.image} alt={item.alt} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-4">
                  <h3 className="font-heading text-lg font-semibold text-[#5B2EFF] dark:text-[#3694FF] group-hover:text-[#5B2EFF]/80 dark:group-hover:text-[#3694FF]/80">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#03E46A] dark:text-[#3694FF] mt-2">
                    {t.relatedArticles?.readMore || ""} →
                  </p>
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
