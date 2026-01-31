"use client";

import { Container } from "@/components/ui/container";
import Image from 'next/image';
import { useTranslation } from "../../lib/translation-context";
import Link from "next/link";

export function HowItWorks() {
  const { t, locale } = useTranslation();

  const steps = (t.howItWorks?.steps || []).map((step, index) => ({
    number: step.number,
    title: step.title,
    description: step.description,
    icon: ["✨", "🔄", "😌"][index],
    image: ["/optimized/panel_1.webp", "/optimized/panel_2.webp", "/optimized/panel_3.webp"][index],
  }));

  return (
    <section
      className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-950 dark:via-purple-950/20 dark:to-gray-900 transition-colors duration-300 relative overflow-hidden"
      id="how-it-works"
    >
      {/* Animated background elements - hidden on mobile for performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden sm:block">
        <div className="absolute top-40 right-20 w-64 h-64 bg-purple-300/20 dark:bg-purple-500/10 rounded-full blur-xl sm:blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 left-20 w-80 h-80 bg-pink-300/20 dark:bg-pink-500/10 rounded-full blur-xl sm:blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <Container className="relative z-10">
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-heading text-5xl md:text-7xl font-black tracking-tight mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 dark:from-purple-400 dark:via-pink-400 dark:to-orange-400 bg-clip-text text-transparent">
            Ridiculously Easy to Use
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative mt-16">
          {/* Enhanced connecting line with gradient */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-purple-300 via-pink-300 to-orange-300 dark:from-purple-700 dark:via-pink-700 dark:to-orange-700 hidden md:block rounded-full shadow-lg"></div>

          {steps.map((step, index) => (
            <div
              key={step.number}
              className="relative group"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="bg-white dark:bg-gray-800 backdrop-blur-sm rounded-3xl p-10 h-full border-2 border-purple-200 dark:border-purple-800 shadow-2xl transition-all duration-500 hover:shadow-purple-500/30 dark:hover:shadow-purple-500/50 hover:-translate-y-4 z-10 relative">
                <div
                  className={`absolute -top-8 left-1/2 -translate-x-1/2 ${index === 0
                      ? "bg-gradient-to-r from-purple-600 to-purple-500"
                      : index === 1
                        ? "bg-gradient-to-r from-pink-600 to-pink-500"
                        : "bg-gradient-to-r from-orange-600 to-orange-500"
                    } text-white w-20 h-20 rounded-full flex items-center justify-center font-black text-3xl shadow-2xl group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 z-20 border-4 border-white dark:border-gray-900`}
                >
                  {step.number}
                </div>
                <div className="text-center mt-8">
                  <div className="overflow-hidden rounded-2xl mb-6 h-[250px] sm:h-[400px] flex items-center justify-center shadow-xl border-2 border-gray-100 dark:border-gray-700">
                    <Image
                      src={step.image}
                      alt={`Step ${step.number}: ${step.title} - ${step.description}`}
                      width={400}
                      height={400}
                      loading="lazy"
                      quality={90}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <h3
                    className={`font-black text-2xl sm:text-3xl mb-4 ${index === 0
                        ? "text-purple-600 dark:text-purple-400"
                        : index === 1
                          ? "text-pink-600 dark:text-pink-400"
                          : "text-orange-600 dark:text-orange-400"
                      }`}
                  >
                    {step.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed font-medium">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </Container>
    </section>
  );
}