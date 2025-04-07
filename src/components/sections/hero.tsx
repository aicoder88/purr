import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { TESTIMONIALS } from "@/lib/constants";
import SectionHeader from "../ui/section-header";
import { FaPaw } from "react-icons/fa";
import { scrollToSection } from "@/lib/utils";

export function Hero() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [paws, setPaws] = useState<
    { x: number; y: number; id: number; rotation: number }[]
  >([]);
  const idRef = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const delay = 100; // delay in milliseconds
    let lastTime = 0;
    let prevPos = { x: 0, y: 0 };

    const handleMouseMove = (event: MouseEvent) => {
      const now = Date.now();
      const { clientX: x, clientY: y } = event;
      if (now - lastTime >= delay) {
        const dx = x - prevPos.x;
        const dy = y - prevPos.y;

        let rotation = 0;

        // Determine dominant direction
        if (Math.abs(dx) > Math.abs(dy)) {
          rotation = dx > 0 ? 90 : 270; // Right or Left
        } else {
          rotation = dy > 0 ? 180 : 0; // Down or Up
        }

        // Adjust position to be slightly offset (1-3mm) from the cursor
        const offsetX = Math.random() * 3 - 1.5; // Random offset between -1.5 and 1.5
        const offsetY = Math.random() * 3 - 1.5;

        setPaws((prev) => [
          ...prev,
          { x: x + offsetX, y: y + offsetY, rotation, id: idRef.current++ },
        ]);

        prevPos = { x, y };
        lastTime = now;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPaws((prev) => prev.slice(-2)); // Keep last 10 paws
    }, 200); // Adjust based on how long you want them to stay
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative container py-20 overflow-hidden bg-gradient-to-br from-[#FFFFFF] via-[#FFFFF5] to-[#FFFFFF]">
      {paws.map((paw) => (
        <span
          key={paw.id}
          className="absolute gap-[10px] pointer-events-none transition-transform duration-300 ease-out -translate-x-1/2 -translate-y-1/2"
          style={{
            top: paw.y,
            left: paw.x,
            transform: `translate(-50%, -50%) rotate(${paw.rotation}deg)`,
          }}
        >
          <FaPaw className="text-[#FF3131] w-4 h-4 opacity-50 -translate-x-1/2 -translate-y-1/2" />
        </span>
      ))}
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-[#FF3131]/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#E0EFC7]/30 rounded-full blur-3xl"></div>
      <div className="absolute top-40 right-20 w-20 h-20 bg-[#5B2EFF]/20 rounded-full blur-xl"></div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <SectionHeader text="Attention Cat Owners!" />
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
              <span
                className="block"
                style={{
                  background:
                    "linear-gradient(135deg, #6D28D9 0%, #8B5CF6 50%, #A78BFA 100%)",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}
              >
                Science-Backed
              </span>
              <span className=" block bg-gradient-to-r from-[#1E1B4B] to-[#1E1B4B]/80 bg-clip-text text-transparent">
                Odor Elimination
              </span>
              {/* <span className="block bg-clip-text bg-gradient-to-r text-transparent from-[#0072CE] to-[#0072CE]/40 -">
                Experience
              </span> */}
              {/* <span className="block">Before They Escape</span> */}
            </h1>
            <p className="text-xl text-[#333333] font-light">
              Montreal's premium activated carbon cat litter additive with an
              incredible 1,150 m²/gm surface area to capture odors at the
              molecular level.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:bg-[#FFFFF5] font-bold rounded-xl py-6 px-8 hover:shadow-xl transition-all duration-300bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:bg-[#FFFFF5] font-bold rounded-xl py-6 px-8 hover:shadow-xl transition-all duration-300bg-gradient-primary active:scale-75  text-white font-bold py-6 px-8 rounded-xl bg-gradient-primary shadow-lg hover:shadow-xl transition-all duration-300 border-0 hide-for-info-mode"
              >
                ORDER NOW
              </Button>
              <Button
                onClick={() => scrollToSection("testimonials")}
                size="lg"
                variant="outline"
                className="bg-gradient-primary active:scale-75  text-white font-bold py-6 px-8 rounded-xl bg-gradient-primary shadow-lg hover:shadow-xl transition-all duration-300 border-0"
              >
                SEE FEEDBACK
              </Button>
            </div>
            <Button
              onClick={() => scrollToSection("calculator")}
              size="lg"
              variant="outline"
              className="bg-gradient-to-t from-[#03E46A] to-[#008541]/40  hover:bg-[#FFFFF5] font-bold rounded-xl py-6 px-8 hover:shadow-xl transition-all duration-300"
            >
              CHECKOUT OUR CAT LITTER SAVINGS CALCULATOR
            </Button>
          </div>
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-[#FF3131]/20 to-[#5B2EFF]/30 rounded-3xl blur-xl opacity-70 group-hover:opacity-100 transition duration-700"></div>
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
                  <p className="text-[#0072CE] font-medium line-clamp-2">
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
        <p className="text-sm text-[#0072CE] mb-2 bg-white/80 px-3 py-1 rounded-full">
          Scroll to discover
        </p>
        <svg
          className="w-6 h-6 text-[#0072CE] animate-bounce bg-white/80 rounded-full p-1"
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
