'use client';

import Image from 'next/image';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { BookOpen, ChevronRight } from 'lucide-react';

interface HeroSectionProps {
  localePrefix: string;
  copy: {
    heroTitle: string;
    heroDescription: string;
    heroImageAlt: string;
    trialCtaPrefix: string;
  };
  trialCtaLabel: string;
  trialCheckoutUrl: string;
}

export default function HeroSection({ copy, trialCtaLabel, trialCheckoutUrl }: HeroSectionProps) {
  return (
    <>
      <section className="py-16 bg-gradient-to-br from-[#5B2EFF] to-[#FF3131]">
        <Container>
          <div className="text-center text-white dark:text-gray-100 max-w-4xl mx-auto">
            <BookOpen className="w-16 h-16 mx-auto mb-6 opacity-90" />
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">{copy.heroTitle}</h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">{copy.heroDescription}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={trialCheckoutUrl} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-white dark:bg-gray-900 text-[#5B2EFF] dark:text-[#818CF8] hover:bg-gray-100 dark:hover:bg-gray-700 font-bold">
                  {trialCtaLabel}
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </a>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-8">
        <Container>
          <div className="max-w-4xl mx-auto">
            <Image
              src="/optimized/blog/litter-guide-hero-setup.webp"
              alt={copy.heroImageAlt}
              width={1600}
              height={1067}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </Container>
      </section>
    </>
  );
}
