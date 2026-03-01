import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface FinalCTAProps {
  headline: string;
  subheadline?: string;
  primaryCTA: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
  benefits?: string[];
}

export function FinalCTA({
  headline,
  subheadline,
  primaryCTA,
  secondaryCTA,
  benefits = [],
}: FinalCTAProps) {
  return (
    <section className="bg-green-600 dark:bg-green-700 py-16 lg:py-24">
      <Container>
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white dark:text-gray-100 mb-4">
            {headline}
          </h2>
          {subheadline && (
            <p className="text-lg text-green-100 dark:text-green-200 mb-8">{subheadline}</p>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button
              asChild
              size="lg"
              className="bg-white dark:bg-gray-100 text-green-700 dark:text-green-800 hover:bg-green-50 dark:hover:bg-gray-200 hover:text-green-800 dark:hover:text-green-900 text-base px-8 py-6"
            >
              <Link href={primaryCTA.href}>{primaryCTA.label}</Link>
            </Button>
            {secondaryCTA && (
              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-transparent border-white dark:border-gray-200 text-white dark:text-gray-100 hover:bg-white/10 dark:hover:bg-white/20 text-base px-8 py-6"
              >
                <Link href={secondaryCTA.href}>{secondaryCTA.label}</Link>
              </Button>
            )}
          </div>

          {benefits.length > 0 && (
            <div className="flex flex-wrap justify-center gap-6 text-sm text-green-100 dark:text-green-200">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-300 dark:text-green-400" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
