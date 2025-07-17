import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { TESTIMONIALS } from "@/lib/constants";
import SectionHeader from "../ui/section-header";
import { useInterval, scrollToSection } from "@/lib/utils";
import dynamic from "next/dynamic";
import { useTranslation } from "../../lib/translation-context";
import { RotatingText } from "../ui/rotating-text";

// Dynamically import NextImage to reduce initial bundle size
const NextImage = dynamic(() => import("../../../components/NextImage"), {
  ssr: true,
});

export function Hero() {
  const { t } = useTranslation();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Testimonial rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000); // Increased to 5 seconds for better readability
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative container pt-20 pb-0 overflow-hidden bg-gradient-to-br from-[#FFFFFF] via-[#FFFFF5] to-[#FFFFFF] dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 transition-colors duration-300">
      
      {/* Decorative elements - using CSS variables for better performance */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-[#FF3131]/20 dark:bg-[#FF5050]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#E0EFC7]/30 dark:bg-[#3694FF]/10 rounded-full blur-3xl"></div>
      <div className="absolute top-40 right-20 w-20 h-20 bg-[#5B2EFF]/20 dark:bg-[#5B2EFF]/10 rounded-full blur-xl"></div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <SectionHeader text={t.seo.keywords.split(',')[1]} />
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
              <RotatingText texts={[t.hero.catLitter,t.hero.rabbitLitter,t.hero.fridgeSmells,t.hero.ferretCage]} />
              <span className="block bg-gradient-to-r from-[#1E1B4B] to-[#1E1B4B]/80 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                {t.features.odorElimination.title}
              </span>
            </h1>
            <p className="text-xl text-[#333333] dark:text-gray-300 font-light">
              {t.siteDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                onClick={() => scrollToSection("testimonials")}
                size="lg"
                variant="outline"
                className="bg-gradient-primary text-white font-bold py-6 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 border-0"
                aria-label="View customer testimonials"
              >
                {t.nav.testimonials}
              </Button>
              <Button
                onClick={() => window.open('https://g.page/r/CUB8bZ_ibMbwEBM/review', '_blank')}
                size="lg"
                variant="outline"
                className="bg-white dark:bg-gray-800 text-[#5B2EFF] dark:text-[#3694FF] font-bold py-6 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 border-2 border-[#5B2EFF] dark:border-[#3694FF] hover:bg-[#5B2EFF] dark:hover:bg-[#3694FF] hover:text-white dark:hover:text-white"
                aria-label="Leave a Google review"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                {t.nav.leaveReview}
              </Button>
            </div>
          </div>
          
          <div className="relative group flex flex-col items-center">
            <div className="absolute -inset-4 bg-gradient-to-r from-[#FF3131]/20 to-[#5B2EFF]/30 dark:from-[#FF5050]/10 dark:to-[#3694FF]/20 rounded-3xl blur-xl opacity-70 group-hover:opacity-100 transition duration-700"></div>
            <div className="relative overflow-hidden rounded-3xl shadow-2xl dark:shadow-gray-800 group-hover:shadow-[#E0EFC7]/50 dark:group-hover:shadow-[#3694FF]/30 transition duration-300">
              <video
                poster="/cat_rose_thumbnail.jpg"
                className="w-10/12 h-auto object-contain group-hover:scale-105 transition duration-700 mx-auto dark:brightness-90 dark:contrast-100"
                autoPlay
                muted
                playsInline
                preload="auto"
                aria-label="Purrify Cat Litter Additive Effectiveness Demonstration"
                role="presentation"
                loop
                tabIndex={-1}
                itemScope
                itemType="https://schema.org/VideoObject"
                onError={(e) => {
                  console.error('Video playback error:', e);
                  const video = e.target as HTMLVideoElement;
                  video.style.display = 'none';
                }}
                onLoadedData={(e) => {
                  console.log('Video loaded successfully');
                }}
              >
                <source src="https://purrify.ca/videos/cat_rose_optimized.webm" type="video/webm" />
                <source src="https://purrify.ca/videos/cat_rose_optimized.mp4" type="video/mp4" />
                <meta itemProp="thumbnailUrl" content="/cat_rose_thumbnail.jpg" />
                <meta itemProp="uploadDate" content="2023-09-01T08:00:00+08:00" />
                <meta itemProp="duration" content="PT30S" />
                Your browser does not support the video tag.
              </video>
            </div>
            
            {/* Feature Showcase - HIDDEN */}
            {/*
            <div className="mt-8 mb-6 w-full">
              <div className="bg-[#FFFFFF]/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-[#E0EFC7]/30 dark:border-gray-700 transition-all duration-500 max-w-2xl mx-auto hover:shadow-[#E0EFC7]/50 dark:hover:shadow-[#3694FF]/30 hover:-translate-y-1">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-center text-center p-3 rounded-xl bg-gradient-to-br from-[#FF3131]/5 to-[#5B2EFF]/5 dark:from-[#FF5050]/10 dark:to-[#3694FF]/10">
                    <div className="w-10 h-10 mb-2 rounded-full bg-[#FF3131]/10 dark:bg-[#FF5050]/20 flex items-center justify-center" aria-hidden="true">
                      <svg className="w-5 h-5 text-[#FF3131] dark:text-[#FF5050]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <h3 className="text-base font-semibold mb-1 dark:text-white">{t.benefits.molecular.title}</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-300">{t.benefits.molecular.description}</p>
                  </div>

                  <div className="flex flex-col items-center text-center p-3 rounded-xl bg-gradient-to-br from-[#5B2EFF]/5 to-[#FF3131]/5 dark:from-[#3694FF]/10 dark:to-[#FF5050]/10">
                    <div className="w-10 h-10 mb-2 rounded-full bg-[#5B2EFF]/10 dark:bg-[#3694FF]/20 flex items-center justify-center" aria-hidden="true">
                      <svg className="w-5 h-5 text-[#5B2EFF] dark:text-[#3694FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-base font-semibold mb-1 dark:text-white">{t.benefits.sevenDayFreshness.title}</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-300">{t.benefits.sevenDayFreshness.description}</p>
                  </div>

                  <div className="flex flex-col items-center text-center p-3 rounded-xl bg-gradient-to-br from-[#FF3131]/5 to-[#5B2EFF]/5 dark:from-[#FF5050]/10 dark:to-[#3694FF]/10">
                    <div className="w-10 h-10 mb-2 rounded-full bg-[#FF3131]/10 dark:bg-[#FF5050]/20 flex items-center justify-center" aria-hidden="true">
                      <svg className="w-5 h-5 text-[#FF3131] dark:text-[#FF5050]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <h3 className="text-base font-semibold mb-1 dark:text-white">{t.benefits.natural.title}</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-300">{t.benefits.natural.description}</p>
                  </div>

                  <div className="flex flex-col items-center text-center p-3 rounded-xl bg-gradient-to-br from-[#5B2EFF]/5 to-[#FF3131]/5 dark:from-[#3694FF]/10 dark:to-[#FF5050]/10">
                    <div className="w-10 h-10 mb-2 rounded-full bg-[#5B2EFF]/10 dark:bg-[#3694FF]/20 flex items-center justify-center" aria-hidden="true">
                      <svg className="w-5 h-5 text-[#5B2EFF] dark:text-[#3694FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-base font-semibold mb-1 dark:text-white">{t.benefits.universalFit.title}</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-300">{t.benefits.universalFit.description}</p>
                  </div>

                  <div className="flex flex-col items-center text-center p-3 rounded-xl bg-gradient-to-br from-[#FF3131]/5 to-[#5B2EFF]/5 dark:from-[#FF5050]/10 dark:to-[#3694FF]/10">
                    <div className="w-10 h-10 mb-2 rounded-full bg-[#FF3131]/10 dark:bg-[#FF5050]/20 flex items-center justify-center" aria-hidden="true">
                      <svg className="w-5 h-5 text-[#FF3131] dark:text-[#FF5050]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <h3 className="text-base font-semibold mb-1 dark:text-white">{t.benefits.highlyRated.title}</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-300">{t.benefits.highlyRated.description}</p>
                  </div>
                </div>

                <div className="mt-4 flex justify-center items-center space-x-6 text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span>Highly Rated</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>30-Day Money-Back Guarantee</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-blue-500 dark:text-blue-400 mr-1" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
                    </svg>
                    <span>Free Shipping in Canada</span>
                  </div>
                </div>
              </div>
            </div>
            */}
            
            {/* Empty div to maintain spacing */}
            <div className="mt-4"></div>
          </div>
        </div>
      </Container>
      
      {/* Full width scroll indicator arrow only */}
      <div className="w-full -mt-4 text-center flex flex-col items-center">
        <svg
          className="w-6 h-6 text-[#0072CE] dark:text-[#3694FF] animate-bounce bg-white/80 dark:bg-gray-800/80 rounded-full p-1"
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
