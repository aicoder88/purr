'use client';

import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { ChevronRight } from 'lucide-react';
import { ReactNode } from 'react';

interface Pillar {
  icon: ReactNode;
  title: string;
  description: string;
  link?: { label: string; href: string };
}

interface BenefitPillarsProps {
  headline: string;
  pillars: Pillar[];
}

export function BenefitPillars({ headline, pillars }: BenefitPillarsProps) {
  return (
    <section className="bg-white dark:bg-gray-900 py-16 lg:py-24">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 tracking-tight">
            {headline}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
          {pillars.map((pillar, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6 text-green-600 dark:text-green-400">
                {pillar.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">
                {pillar.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                {pillar.description}
              </p>
              {pillar.link && (
                <Link
                  href={pillar.link.href}
                  className="inline-flex items-center gap-1 text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium transition-colors"
                >
                  {pillar.link.label}
                  <ChevronRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
