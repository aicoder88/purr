'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { CommonProblemItem } from './GuideCopy';

interface ProblemsSectionProps {
  localePrefix: string;
  copy: {
    problemsTitle: string;
    problemsDescription: string;
    problemLabel: string;
    solutionLabel: string;
    learnMoreLabel: string;
    solutionImageAlt: string;
    commonProblems: CommonProblemItem[];
  };
}

export default function ProblemsSection({ localePrefix, copy }: ProblemsSectionProps) {
  return (
    <>
      <section id="problems" className="py-16">
        <Container>
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-gray-900 text-gray-100">{copy.problemsTitle}</h2>
            <p className="text-xl text-gray-600 text-gray-300 max-w-3xl mx-auto">{copy.problemsDescription}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {copy.commonProblems.map((item, index) => (
              <div key={index} className="bg-white bg-gray-800 rounded-xl p-6 shadow-lg border border-[#E0EFC7] border-gray-700">
                <h3 className="font-heading text-xl font-bold mb-3 text-red-600 text-red-400">
                  {copy.problemLabel} {item.problem}
                </h3>
                <p className="text-gray-600 text-gray-300 mb-4">
                  <span className="font-semibold text-green-600 text-green-400">{copy.solutionLabel}</span> {item.solution}
                </p>
                {item.link && (
                  <Link href={`${localePrefix}${item.link}`}>
                    <Button variant="outline" size="sm">
                      {copy.learnMoreLabel}
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-8">
        <Container>
          <div className="max-w-4xl mx-auto">
            <Image
              src="/optimized/blog/benefits-happy-cats.avif"
              alt={copy.solutionImageAlt}
              width={1600}
              height={1067}
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
        </Container>
      </section>
    </>
  );
}
