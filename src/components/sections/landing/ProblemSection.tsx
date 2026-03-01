import { Container } from '@/components/ui/container';
import { ReactNode } from 'react';

interface ProblemCard {
  icon: ReactNode;
  title: string;
  description: string;
}

interface ProblemSectionProps {
  headline: string;
  problems: ProblemCard[];
}

export function ProblemSection({ headline, problems }: ProblemSectionProps) {
  return (
    <section className="bg-white bg-gray-900 py-16 lg:py-24">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-gray-50 tracking-tight">
            {headline}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="bg-gray-50 bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-lg bg-red-100 bg-red-900/30 flex items-center justify-center mb-4 text-red-600 text-red-400">
                {problem.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 text-gray-50 mb-2">
                {problem.title}
              </h3>
              <p className="text-gray-600 text-gray-400 leading-relaxed">
                {problem.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
