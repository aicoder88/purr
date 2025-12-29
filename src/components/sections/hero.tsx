import { Container } from "@/components/ui/container";
import { useTranslation } from "../../lib/translation-context";
import { HeroContent } from "./hero/HeroContent";
import { HeroVideo } from "./hero/HeroVideo";

export function Hero() {
  const { t, locale } = useTranslation();

  return (
    <section className="relative w-full pt-24 pb-20 overflow-hidden bg-mesh-gradient transition-colors duration-300" style={{ willChange: 'auto' }}>

      {/* Animated decorative background - reduced blur on mobile for performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden sm:block">
        <div className="absolute top-20 left-10 w-96 h-96 bg-white/20 dark:bg-white/5 rounded-full blur-xl sm:blur-3xl animate-pulse mix-blend-overlay"></div>
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-electric-indigo/20 dark:bg-electric-indigo/10 rounded-full blur-xl sm:blur-3xl animate-pulse mix-blend-overlay" style={{ animationDelay: '1s' }}></div>
      </div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <HeroContent t={t} locale={locale} />
          <div className="relative lg:h-full flex items-center">
            <HeroVideo t={t} />
          </div>
        </div>
      </Container>

      {/* Enhanced scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-gray-400 dark:border-gray-500 flex justify-center p-1">
          <div className="w-1 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-scroll-down"></div>
        </div>
      </div>
    </section>
  );
}