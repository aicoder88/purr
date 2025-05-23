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
              <RotatingText texts={["Cat Litter", "Rabbit Litter", "Fridge smells", "Ferret cage"]} />
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
                poster="/optimized/cat_rose_thumbnail.webp"
                className="w-10/12 h-auto object-contain group-hover:scale-105 transition duration-700 mx-auto"
                autoPlay
                muted
                playsInline
                preload="metadata"
                aria-label="Cat with rose video"
                title="Purrify Cat Litter Additive Demo"
                role="presentation"
                loop
                tabIndex={-1}
                itemScope
                itemType="https://schema.org/VideoObject"
              >
                <source src="/videos/cat_rose_optimized.webm" type="video/webm" />
                <source src="/videos/cat_rose_optimized.mp4" type="video/mp4" />
                <meta itemProp="name" content="Purrify Cat Litter Additive Demo" />
                <meta itemProp="description" content="A demonstration of Purrify activated carbon cat litter additive that eliminates odors at the molecular level" />
                <meta itemProp="thumbnailUrl" content="/cat_rose_thumbnail.jpg" />
                <meta itemProp="uploadDate" content="2023-09-01T08:00:00+08:00" />
                <meta itemProp="duration" content="PT30S" />
                Your browser does not support the video tag.
              </video>
            </div>
            
            {/* Testimonials moved below the video but above scroll indicator */}
            <div className="mt-8 mb-6 w-full">
              <div className="bg-[#FFFFFF]/90 backdrop-blur-sm rounded-xl p-5 shadow-lg border border-[#E0EFC7]/30 transition-all duration-500 max-w-md mx-auto hover:shadow-[#E0EFC7]/50 hover:-translate-y-1">
                <div className="flex mb-1">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 text-yellow-400 fill-current"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                      </svg>
                    ))}
                </div>
                <p className="text-[#0072CE] font-medium line-clamp-2 text-lg italic">
                  "{TESTIMONIALS[currentTestimonial].text.split(".")[0]}."
                </p>
                <p className="text-sm text-[#333333] font-semibold mt-1">
                  - {TESTIMONIALS[currentTestimonial].name}
                </p>
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
