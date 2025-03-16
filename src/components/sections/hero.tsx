import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { TESTIMONIALS } from "@/lib/constants";

export function Hero() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-[#FFFFFF] via-[#FFFFF5] to-[#FFFFFF]">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-[#FB6A43]/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#E0EFC7]/30 rounded-full blur-3xl"></div>
      <div className="absolute top-40 right-20 w-20 h-20 bg-[#6A43FB]/20 rounded-full blur-xl"></div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-block px-4 py-1 bg-[#E0EFC7] rounded-full text-[#FB6A43] font-medium text-sm mb-2">
              Revolutionary Cat Litter Additive
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
              <span className="block">Attention</span>
              <span className="block bg-gradient-to-r from-[#FB6A43] to-[#FB6A43]/80 bg-clip-text text-transparent">
                Cat Owners!
              </span>
              <span className="block text-[#6A43FB]">Purrify Traps Odors</span>
              <span className="block">Before They Escape</span>
            </h1>
            <p className="text-xl text-[#333333] font-light">
              No Sprays. No Chemicals. No Hassle. Just Pure Freshness.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#FB6A43] to-[#FB6A43]/90 hover:from-[#FB6A43]/90 hover:to-[#FB6A43] text-white font-bold py-6 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-0"
              >
                ORDER NOW
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[#6A43FB] text-[#6A43FB] hover:bg-[#FFFFF5] font-medium rounded-xl"
              >
                SEE FEEDBACK
              </Button>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-[#FB6A43]/20 to-[#6A43FB]/30 rounded-3xl blur-xl opacity-70 group-hover:opacity-100 transition duration-700"></div>
            <div className="relative overflow-hidden rounded-3xl shadow-2xl group-hover:shadow-[#E0EFC7]/50 transition duration-300">
              <img
                src="https://images.unsplash.com/photo-1570824104453-508955ab713e?w=800&q=80"
                alt="Happy cat with Purrify"
                className="w-full h-auto object-cover group-hover:scale-105 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="bg-[#FFFFFF]/90 backdrop-blur-sm rounded-xl p-4 transition-all duration-500">
                  <div className="flex mb-1">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <svg
                          key={i}
                          className="w-4 h-4 text-yellow-400 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                        </svg>
                      ))}
                  </div>
                  <p className="text-[#6A43FB] font-medium line-clamp-2">
                    "{TESTIMONIALS[currentTestimonial].text.split(".")[0]}."
                  </p>
                  <p className="text-sm text-[#333333]">
                    - {TESTIMONIALS[currentTestimonial].name}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-20">
        <p className="text-sm text-[#6A43FB] mb-2 bg-white/80 px-3 py-1 rounded-full">
          Scroll to discover
        </p>
        <svg
          className="w-6 h-6 text-[#6A43FB] animate-bounce bg-white/80 rounded-full p-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
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
