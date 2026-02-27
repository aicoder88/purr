'use client';

import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

interface CTASectionProps {
  localePrefix: string;
  copy: {
    ctaTitle: string;
    ctaDescription: string;
    readSuccessStoriesLabel: string;
    trialCtaPrefix: string;
  };
  trialCtaLabel: string;
  trialCheckoutUrl: string;
}

export default function CTASection({ localePrefix, copy, trialCtaLabel, trialCheckoutUrl }: CTASectionProps) {
  return (
    <section className="py-16 bg-gradient-to-br from-[#5B2EFF] to-[#FF3131]">
      <Container>
        <div className="text-center text-white dark:text-gray-100 max-w-3xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">{copy.ctaTitle}</h2>
          <p className="text-xl mb-8 opacity-90">{copy.ctaDescription}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={trialCheckoutUrl} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-white dark:bg-gray-900 text-[#5B2EFF] dark:text-[#818CF8] hover:bg-gray-100 dark:hover:bg-gray-700 font-bold">
                {trialCtaLabel}
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </a>
            <Link href={`${localePrefix}/reviews`}>
              <Button size="lg" variant="outline" className="border-white dark:border-gray-600 text-gray-900 dark:text-gray-50 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 transition-colors">
                {copy.readSuccessStoriesLabel}
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
