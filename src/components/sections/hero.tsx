import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { TESTIMONIALS } from "@/lib/constants";
import SectionHeader from "../ui/section-header";
import { useInterval, scrollToSection } from "@/lib/utils";
import dynamic from "next/dynamic";
import { useTranslation } from "../../lib/translation-context";

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
    <section className="relative container pt-20 pb-0 overflow-hidden bg-gradient-to-br from-[#FFFFFF] via-[#FFFFF5] to-[#FFFFFF]">
      
      {/* Decorative elements - using CSS variables for better performance */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-[#FF3131]/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#E0EFC7]/30 rounded-full blur-3xl"></div>
      <div className="absolute top-40 right-20 w-20 h-20 bg-[#5B2EFF]/20 rounded-full blur-xl"></div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <SectionHeader text={t.seo.keywords.split(',')[1]} />
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
              <RotatingText texts={[t.hero.catLitter,t.hero.rabbitLitter,t.hero.fridgeSmells,t.hero.ferretCage]} />
              <span className="block bg-gradient-to-r from-[#1E1B4B] to-[#1E1B4B]/80 bg-clip-text text-transparent">
                {t.features.odorElimination.title} {t.features.worksWithAnyLitter.title.split(' ')[0]}
              </span>
            </h1>
            <p className="text-xl text-[#333333] font-light">
              {t.siteDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                onClick={() => scrollToSection("testimonials")}
                size="lg"
                variant="outline"
                className="bg-gradient-primary text-white font-bold py-6 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 border-0"
              >
                {t.nav.testimonials}
              </Button>
            </div>
          </div>
          
          <div className="relative group flex flex-col items-center">
            <div className="absolute -inset-4 bg-gradient-to-r from-[#FF3131]/20 to-[#5B2EFF]/30 rounded-3xl blur-xl opacity-70 group-hover:opacity-100 transition duration-700"></div>
            <div className="relative overflow-hidden rounded-3xl shadow-2xl group-hover:shadow-[#E0EFC7]/50 transition duration-300">
              <video
                poster="/cat_rose_thumbnail.jpg"
                className="w-10/12 h-auto object-contain group-hover:scale-105 transition duration-700 mx-auto"
                autoPlay
                muted
                playsInline
                preload="auto"
                aria-label="Cat with rose video"
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
            
            {/* Feature Showcase */}
            <div className="mt-8 mb-6 w-full">
              <div className="bg-[#FFFFFF]/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-[#E0EFC7]/30 transition-all duration-500 max-w-2xl mx-auto hover:shadow-[#E0EFC7]/50 hover:-translate-y-1">
                <div className="grid grid-cols-2 gap-4">
                  {/* Feature 1 */}
                  <div className="flex flex-col items-center text-center p-3 rounded-xl bg-gradient-to-br from-[#FF3131]/5 to-[#5B2EFF]/5">
                    <div className="w-10 h-10 mb-2 rounded-full bg-[#FF3131]/10 flex items-center justify-center">
                      <svg className="w-5 h-5 text-[#FF3131]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <h3 className="text-base font-semibold mb-1">Molecular Level</h3>
                    <p className="text-xs text-gray-600">Eliminates odors at their source</p>
                  </div>

                  {/* Feature 2 */}
                  <div className="flex flex-col items-center text-center p-3 rounded-xl bg-gradient-to-br from-[#5B2EFF]/5 to-[#FF3131]/5">
                    <div className="w-10 h-10 mb-2 rounded-full bg-[#5B2EFF]/10 flex items-center justify-center">
                      <svg className="w-5 h-5 text-[#5B2EFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-base font-semibold mb-1">7-Day Freshness</h3>
                    <p className="text-xs text-gray-600">Long-lasting odor control</p>
                  </div>

                  {/* Feature 3 */}
                  <div className="flex flex-col items-center text-center p-3 rounded-xl bg-gradient-to-br from-[#FF3131]/5 to-[#5B2EFF]/5">
                    <div className="w-10 h-10 mb-2 rounded-full bg-[#FF3131]/10 flex items-center justify-center">
                      <svg className="w-5 h-5 text-[#FF3131]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h3 className="text-base font-semibold mb-1">100% Natural</h3>
                    <p className="text-xs text-gray-600">Safe for cats & environment</p>
                  </div>

                  {/* Feature 4 */}
                  <div className="flex flex-col items-center text-center p-3 rounded-xl bg-gradient-to-br from-[#5B2EFF]/5 to-[#FF3131]/5">
                    <div className="w-10 h-10 mb-2 rounded-full bg-[#5B2EFF]/10 flex items-center justify-center">
                      <svg className="w-5 h-5 text-[#5B2EFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </div>
                    <h3 className="text-base font-semibold mb-1">Universal Fit</h3>
                    <p className="text-xs text-gray-600">Works with any litter type</p>
                  </div>
                </div>

                {/* Trust Indicators */}
                <div className="mt-4 flex justify-center items-center space-x-6 text-xs text-gray-500">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span>4.9/5 Rating</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>30-Day Guarantee</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-blue-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
                    </svg>
                    <span>Free Shipping</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Empty div to maintain spacing */}
            <div className="mt-4"></div>
          </div>
        </div>
      </Container>
      
      {/* Full width scroll indicator arrow only */}
      <div className="w-full -mt-4 text-center flex flex-col items-center">
        <svg
          className="w-6 h-6 text-[#0072CE] animate-bounce bg-white/80 rounded-full p-1"
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

// Memoized rotating text component to prevent unnecessary re-renders
function RotatingText({ texts }: { texts: string[] }) {
  const [index, setIndex] = useState(0);

  useInterval(() => {
    setIndex((prevIndex) => (prevIndex + 1) % texts.length);
  }, 2000);

  return (
    <span
      className="block bg-clip-text text-transparent pb-2"
      style={{
        backgroundImage: "linear-gradient(135deg, #6D28D9 0%, #8B5CF6 50%, #A78BFA 100%)",
        lineHeight: "1.3",
        minHeight: "1.4em",
        display: "flex",
        alignItems: "center",
        fontSize: "98%"
      }}
    >
      {texts[index]}
    </span>
  );
}
