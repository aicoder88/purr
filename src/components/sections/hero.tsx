import { Container } from "@/components/ui/container";
import { useState, useEffect } from "react";
import { useTranslation } from "../../lib/translation-context";
import { createSectionClasses, GRADIENTS } from "@/lib/theme-utils";
import { HeroContent } from "./hero/HeroContent";
import { HeroVideo } from "./hero/HeroVideo";

export function Hero() {
  const { t, locale } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const sectionClasses = createSectionClasses('light');

  return (
    <section className="relative w-full pt-20 pb-16 overflow-hidden bg-gradient-to-br from-[#FFFFFF] via-[#FFFFF5] to-[#FFFFFF] dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 transition-colors duration-300" style={{ willChange: 'auto' }}>

      {/* Decorative background elements */}
      <div className="hidden md:block absolute top-20 left-10 w-64 h-64 bg-[#FF3131]/20 dark:bg-[#FF5050]/10 rounded-full blur-3xl" style={{ transform: 'translateZ(0)', willChange: 'auto' }}></div>
      <div className="hidden md:block absolute bottom-20 right-10 w-80 h-80 bg-[#E0EFC7]/30 dark:bg-[#3694FF]/10 rounded-full blur-3xl" style={{ transform: 'translateZ(0)', willChange: 'auto' }}></div>
      <div className="hidden md:block absolute top-40 right-20 w-20 h-20 bg-[#5B2EFF]/20 dark:bg-[#5B2EFF]/10 rounded-full blur-xl" style={{ transform: 'translateZ(0)', willChange: 'auto' }}></div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <HeroContent t={t} locale={locale} />
          <HeroVideo t={t} />
        </div>
      </Container>

      {/* Scroll indicator */}
      <div className="w-full -mt-4 text-center flex flex-col items-center">
        <svg
          className="w-6 h-6 text-[#0072CE] dark:text-[#3694FF] animate-bounce bg-white dark:bg-gray-800/80 rounded-full p-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
