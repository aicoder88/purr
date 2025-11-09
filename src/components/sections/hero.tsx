import { Container } from "@/components/ui/container";
import { useTranslation } from "../../lib/translation-context";
import { HeroContent } from "./hero/HeroContent";
import { HeroVideo } from "./hero/HeroVideo";

export function Hero() {
  const { t, locale } = useTranslation();

  return (
    <section className="relative w-full pt-20 pb-16 overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-950 dark:via-purple-950/20 dark:to-gray-900 transition-colors duration-300" style={{ willChange: 'auto' }}>

      {/* Enhanced animated decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300/30 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-300/30 dark:bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-orange-300/30 dark:bg-orange-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <HeroContent t={t} locale={locale} />
          <HeroVideo t={t} />
        </div>
      </Container>

      {/* Enhanced scroll indicator */}
      <div className="w-full -mt-4 text-center flex flex-col items-center">
        <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-full p-2 shadow-lg">
          <svg
            className="w-6 h-6 text-white dark:text-gray-100 animate-bounce"
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
      </div>
    </section>
  );
}