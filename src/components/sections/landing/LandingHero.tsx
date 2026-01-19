'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { ChevronRight, Home } from 'lucide-react';
import { useTranslation } from '@/lib/translation-context';

interface LandingHeroProps {
  breadcrumb: string;
  headline: string;
  subheadline: string;
  primaryCTA: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
  image: string;
  imageAlt?: string;
}

export function LandingHero({
  breadcrumb,
  headline,
  subheadline,
  primaryCTA,
  secondaryCTA,
  image,
  imageAlt = '',
}: LandingHeroProps) {
  const { t } = useTranslation();

  return (
    <section className="bg-white dark:bg-gray-900 py-12 lg:py-20">
      <Container>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <li>
              <Link
                href="/"
                className="flex items-center gap-1 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
              >
                <Home className="w-4 h-4" />
                <span>{t.nav?.home || ""}</span>
              </Link>
            </li>
            <li>
              <ChevronRight className="w-4 h-4 text-gray-400 dark:text-gray-500" />
            </li>
            <li>
              <span className="text-gray-900 dark:text-gray-100 font-medium">
                {breadcrumb}
              </span>
            </li>
          </ol>
        </nav>

        {/* Hero Content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Column */}
          <div className="order-2 lg:order-1">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 tracking-tight mb-6">
              {headline}
            </h1>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
              {subheadline}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="text-base px-8 py-6">
                <Link href={primaryCTA.href}>{primaryCTA.label}</Link>
              </Button>
              {secondaryCTA && (
                <Link
                  href={secondaryCTA.href}
                  className="inline-flex items-center justify-center gap-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 font-medium transition-colors py-3"
                >
                  {secondaryCTA.label}
                  <ChevronRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          </div>

          {/* Image Column */}
          <div className="order-1 lg:order-2 relative">
            <div className="relative aspect-square lg:aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800">
              <Image
                src={image}
                alt={imageAlt || headline}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
