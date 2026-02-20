"use client";

import Image from "next/image";
import { Container } from "@/components/ui/container";
import { useTranslations, useLocale } from "next-intl";
import { Bomb } from "lucide-react";

export function AgitationSection() {
  const t = useTranslations('agitationSection');
  const locale = useLocale();

  // Fallback paragraphs in case translations aren't loaded
  const paragraphs: string[] = [];
  for (let i = 0; i < 8; i++) {
    try {
      const p = t(`paragraphs.${i}`);
      if (p && !p.startsWith('agitationSection.')) {
        paragraphs.push(p);
      }
    } catch {
      break;
    }
  }

  const headline = t('headline');
  const badge = t('badge');
  const transition = t('transition');
  const imageCaption = t('ui.imageCaption');
  const floatingCardTitle = t('ui.floatingCardTitle');
  const floatingCardDescription = t('ui.floatingCardDescription');

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-white dark:bg-gray-950">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left Column: Visual Drama */}
          <div className="relative order-2 lg:order-1">
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-100 to-orange-100 dark:from-purple-900/20 dark:to-orange-900/20 rounded-[2rem] transform -rotate-2 scale-105 blur-2xl" />
            <div className="relative bg-white dark:bg-gray-900 rounded-[2rem] shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800">
              <Image
                src="/images/embarrassed-host.png"
                alt={t('ui.imageAlt')}
                width={800}
                height={600}
                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-8">
                <p className="text-gray-50 font-bold text-lg">
                  {imageCaption}
                </p>
              </div>
            </div>

            {/* Floating Card */}
            <div className="absolute -bottom-8 -right-8 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border border-red-100 dark:border-red-900 max-w-[200px] hidden md:block">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center">
                  <Bomb className="w-4 h-4 text-red-600 dark:text-red-400" />
                </div>
                <span className="font-bold text-red-600 dark:text-red-400 text-sm">{floatingCardTitle}</span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {floatingCardDescription}
              </p>
            </div>
          </div>

          {/* Right Column: Flowing Narrative */}
          <div className="order-1 lg:order-2">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 mb-6">
              <span className="text-red-700 dark:text-red-400 font-semibold text-sm">{badge}</span>
            </div>

            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-gray-900 dark:text-white mb-10 leading-[1.1]">
              {headline}
            </h2>

            <div className="space-y-6">
              {paragraphs.map((paragraph, index) => {
                // Short punchy lines get special treatment
                const isShort = paragraph.length < 30;
                const isEmphasis = paragraph === "It's not fine." || paragraph === "And there it is." || paragraph === "That smell." || paragraph === "Because what are they going to say?";

                return (
                  <p
                    key={index}
                    className={`leading-relaxed ${
                      isEmphasis
                        ? "text-2xl md:text-3xl font-black text-gray-900 dark:text-white"
                        : isShort
                          ? "text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-200"
                          : "text-lg md:text-xl text-gray-700 dark:text-gray-300 font-medium"
                    }`}
                  >
                    {paragraph}
                  </p>
                );
              })}
            </div>

            {/* The Transition */}
            {transition && (
              <div className="mt-12">
                <div className="bg-electric-indigo/5 dark:bg-electric-indigo/10 rounded-2xl p-8 border border-electric-indigo/20 shadow-lg shadow-electric-indigo/5">
                  <p className="text-xl md:text-2xl font-bold text-electric-indigo dark:text-purple-400 leading-relaxed">
                    {transition}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
