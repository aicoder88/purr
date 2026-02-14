"use client";

import { Container } from "@/components/ui/container";
import { useTranslation } from "@/lib/translation-context";

export function AgitationSection() {
  const { t } = useTranslation();

  const section = t.agitationSection;
  if (!section) return null;

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 transition-colors duration-300">
      <Container>
        <div className="max-w-2xl mx-auto text-center space-y-8">
          {/* Headline */}
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-gray-900 dark:text-white">
            {section.headline}
          </h2>

          {/* Emotional paragraphs - each on its own line for dramatic pacing */}
          <div className="space-y-6 text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed">
            {section.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* Pivot question */}
          <p className="text-2xl sm:text-3xl md:text-4xl font-black text-electric-indigo dark:text-purple-400 pt-4">
            {section.pivot}
          </p>

          {/* Transition teaser */}
          <p className="text-lg sm:text-xl text-gray-500 dark:text-gray-400 italic">
            {section.transition}
          </p>
        </div>
      </Container>
    </section>
  );
}
