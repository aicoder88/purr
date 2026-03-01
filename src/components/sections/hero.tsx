"use client";

import { Container } from "@/components/ui/container";
import { useTranslation } from "@/lib/translation-context";
import { HeroContent } from "./hero/HeroContent";
import { HeroVideo } from "./hero/HeroVideo";

export function Hero() {
  const { t, locale } = useTranslation();

  return (
    <section className="relative w-full overflow-x-clip bg-white pb-12 pt-16 transition-colors duration-300 md:pb-16 md:pt-20 bg-gray-950">
      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 lg:gap-16 items-center">
          <HeroContent t={t} locale={locale} />
          <div className="relative h-full flex items-center justify-center lg:justify-end">
            <HeroVideo playLabel={t.hero.ariaLabels.playVideo} posterAlt={t.hero.ariaLabels.posterAlt} />
          </div>
        </div>
      </Container>
    </section>
  );
}
