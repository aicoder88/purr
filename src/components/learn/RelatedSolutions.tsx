import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { ChevronRight, Wind, Sparkles, Building2, Cat, Users, Leaf, Heart } from 'lucide-react';

interface Solution {
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const ALL_SOLUTIONS: Solution[] = [
  {
    title: 'Ammonia Smell Solutions',
    description: 'Stop sharp ammonia odors at the source',
    href: '/learn/solutions/ammonia-smell-cat-litter',
    icon: Wind,
  },
  {
    title: 'How to Neutralize Ammonia',
    description: 'Step-by-step guide to ammonia elimination',
    href: '/learn/solutions/how-to-neutralize-ammonia-cat-litter',
    icon: Sparkles,
  },
  {
    title: 'Apartment Cat Smell',
    description: 'Keep small spaces fresh and odor-free',
    href: '/learn/solutions/apartment-cat-smell-solution',
    icon: Building2,
  },
  {
    title: 'Litter Box Odor Elimination',
    description: 'Complete guide to litter box freshness',
    href: '/learn/solutions/litter-box-smell-elimination',
    icon: Cat,
  },
  {
    title: 'Multiple Cats Odor Control',
    description: 'Solutions for multi-cat households',
    href: '/learn/solutions/multiple-cats-odor-control',
    icon: Users,
  },
  {
    title: 'Natural Cat Litter Additives',
    description: 'Compare natural odor control options',
    href: '/learn/solutions/natural-cat-litter-additive',
    icon: Leaf,
  },
  {
    title: 'Senior Cat Solutions',
    description: 'Gentle options for older cats',
    href: '/learn/solutions/senior-cat-litter-solutions',
    icon: Heart,
  },
];

interface RelatedSolutionsProps {
  currentPath: string;
  limit?: number;
}

export function RelatedSolutions({ currentPath, limit = 3 }: RelatedSolutionsProps) {
  const solutions = ALL_SOLUTIONS.filter(s => s.href !== currentPath).slice(0, limit);

  if (solutions.length === 0) return null;

  return (
    <section className="py-12 bg-gray-50 bg-gray-800/50">
      <Container>
        <h2 className="font-heading text-2xl md:text-3xl font-bold mb-6 text-gray-900 text-gray-100">
          Related Solutions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {solutions.map((solution) => {
            const Icon = solution.icon;
            return (
              <Link
                key={solution.href}
                href={solution.href}
                className="group flex items-start gap-4 p-4 bg-white bg-gray-800 rounded-xl border border-gray-200 border-gray-700 hover:border-[#03E46A] hover:border-[#03E46A] transition-all hover:shadow-md"
              >
                <div className="flex-shrink-0 p-2 bg-[#5B2EFF]/10 bg-[#3694FF]/10 rounded-lg">
                  <Icon className="w-5 h-5 text-[#5B2EFF] text-[#3694FF]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-heading font-semibold text-gray-900 text-gray-100 group-hover:text-[#5B2EFF] group-hover:text-[#3694FF] transition-colors">
                    {solution.title}
                  </h3>
                  <p className="text-sm text-gray-600 text-gray-400 mt-1">
                    {solution.description}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 text-gray-500 flex-shrink-0 transition-transform group-hover:translate-x-1" />
              </Link>
            );
          })}
        </div>
        <div className="mt-6 text-center">
          <Link
            href="/learn/solutions"
            className="inline-flex items-center text-[#5B2EFF] text-[#3694FF] font-medium hover:underline"
          >
            View all solutions
            <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </Container>
    </section>
  );
}

export default RelatedSolutions;
