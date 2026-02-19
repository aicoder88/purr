"use client";

import { Container } from "@/components/ui/container";
import SectionHeader from "@/components/ui/section-header";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";

import Image from 'next/image';

export function About() {
  const t = useTranslations();
  const locale = useLocale();
  const aboutUiCopy =
    locale === 'fr'
      ? {
        discoverScience: 'Decouvrez la science',
        behindOur: 'derriere notre',
        activatedCarbonFormula: 'formule au charbon active',
        granulesAlt: 'Granules de charbon active - elimination naturelle des odeurs',
        poresAlt: 'Vue microscopique des pores du charbon actif',
        happyCatAlt: 'Chat heureux dans un foyer frais et propre',
      }
      : {
        discoverScience: 'Discover the science',
        behindOur: 'behind our',
        activatedCarbonFormula: 'activated carbon formula',
        granulesAlt: 'Activated carbon granules - natural odor elimination',
        poresAlt: 'Microscopic view of activated carbon pores',
        happyCatAlt: 'Happy cat in fresh, clean home environment',
      };
  return (
    <section className="pt-20 pb-16 bg-gradient-to-b from-[#FFFFF5] to-background dark:from-gray-900 dark:to-gray-800 transition-colors duration-300" id="about">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <SectionHeader text={t('features.longLastingFreshness.title')} />

          <h2 className="font-heading text-4xl md:text-5xl mt-3 font-bold tracking-tight mb-4 bg-gradient-to-r from-[#FF3131] to-[#FF3131]/80 dark:from-[#FF5050] dark:to-[#FF5050]/80 bg-clip-text text-transparent">{t('about.naturalAndEffective')}</h2>

          <div className="relative group flex flex-col items-center my-8">
            {/* Pre-allocate space for the image with a fixed height container */}
            <div className="absolute -inset-4 bg-gradient-to-r from-[#FF3131]/20 to-[#5B2EFF]/30 dark:from-[#FF3131]/10 dark:to-[#5B2EFF]/20 rounded-3xl blur-xl opacity-70 group-hover:opacity-100 transition duration-700"></div>
            <div className="relative overflow-hidden rounded-3xl shadow-2xl group-hover:shadow-[#E0EFC7]/50 dark:shadow-white/20 transition duration-300 w-10/12 h-[400px] bg-white dark:bg-white/95 p-4">
              <Image
                src="/optimized/Carbon-sktech.webp"
                alt={t('homepage.altText.scientificDiagram')}
                width={800}
                height={400}
                className="w-full h-[120%] object-cover object-top -mt-[10%] group-hover:scale-105 transition duration-700"
                sizes="(max-width: 768px) 100vw, 800px"
                priority={true}
              />
            </div>
          </div>

          <p className="text-3xl font-semibold text-foreground mb-6">
            {t('features.catFriendly.description')} <Link href={`${locale === 'fr' ? '/fr' : ''}/learn/science`} className="text-[#FF3131] hover:text-[#FF3131]/80 underline font-medium">{aboutUiCopy.discoverScience}</Link> {aboutUiCopy.behindOur} <Link href={`${locale === 'fr' ? '/fr' : ''}/products/trial-size`} className="text-[#5B2EFF] hover:text-[#5B2EFF]/80 underline font-medium">{aboutUiCopy.activatedCarbonFormula}</Link>.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="hidden md:block">
            <div className="grid grid-cols-2 gap-4">
              <div className="overflow-hidden rounded-xl shadow-lg">
                <Image
                  src="/optimized/activated-carbon-granules-macro.webp"
                  alt={aboutUiCopy.granulesAlt}
                  width={400}
                  height={300}
                  sizes="(max-width: 768px) 50vw, 200px"
                  className="w-full aspect-[4/3] object-cover transform hover:scale-110 transition duration-500"
                  loading="lazy"
                />
              </div>
              <div className="overflow-hidden rounded-xl shadow-lg">
                <Image
                  src="/optimized/activated-carbon-macro-obsidian.webp"
                  alt={aboutUiCopy.poresAlt}
                  width={400}
                  height={300}
                  sizes="(max-width: 768px) 50vw, 200px"
                  className="w-full aspect-[4/3] object-cover transform hover:scale-110 transition duration-500"
                  loading="lazy"
                />
              </div>
              <div className="overflow-hidden rounded-xl shadow-lg col-span-2">
                <Image
                  src="/optimized/happy-cat-ghibli.webp"
                  alt={aboutUiCopy.happyCatAlt}
                  width={800}
                  height={400}
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="w-full aspect-[2/1] object-cover transform hover:scale-110 transition duration-500"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <p className="text-gray-700 dark:text-gray-200 leading-relaxed text-lg dark:text-gray-300">
              {t('features.odorElimination.description')}
            </p>
            <p className="text-gray-700 dark:text-gray-200 leading-relaxed text-lg dark:text-gray-300">
              {t('features.catFriendly.description')}
            </p>
            <p className="text-gray-700 dark:text-gray-200 leading-relaxed text-lg dark:text-gray-300">
              <span className="font-bold text-[#FF3131] dark:text-[#FF5050]">
                {t('siteName')} {t('features.odorElimination.title')}.
              </span>
            </p>
            <p className="text-gray-700 dark:text-gray-200 leading-relaxed text-lg dark:text-gray-300">
              {t('features.longLastingFreshness.description')} {t('features.worksWithAnyLitter.description')}
            </p>
          </div>
        </div>

        {/* Card removed as requested */}

        {/* Floating particles - using fixed positioning instead of absolute to prevent layout shifts */}
        <div className="relative mt-16 h-20">
          <div
            className="fixed -top-10 left-1/4 w-8 h-8 bg-[#E0EFC7] rounded-full opacity-50 pointer-events-none"
            style={{ animationDuration: "3s" }}
          ></div>
          <div
            className="fixed top-20 right-1/3 w-6 h-6 bg-[#FF3131]/30 rounded-full opacity-40 pointer-events-none"
            style={{ animationDuration: "5s" }}
          ></div>
          <div
            className="fixed -bottom-10 right-1/4 w-10 h-10 bg-[#E0EFC7]/70 rounded-full opacity-60 pointer-events-none"
            style={{ animationDuration: "4s" }}
          ></div>
        </div>
      </Container>
    </section>
  );
}
