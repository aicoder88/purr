"use client";

import { Container } from "@/components/ui/container";
import { useTranslation } from "@/lib/translation-context";
import { Home, Wind, Users, Bomb, ShieldAlert, Ghost, ArrowDown } from "lucide-react";

export function AgitationSection() {
  const { t } = useTranslation();

  const section = t.agitationSection;
  if (!section) return null;

  // Split paragraphs into timeline items
  const timelineItems = [
    { text: section.paragraphs[0], time: "5:30 PM", icon: Home },
    { text: section.paragraphs[2], time: "5:31 PM", icon: Users },
    { text: section.paragraphs[3], time: "Thinking...", icon: Bomb },
    { text: section.paragraphs[5], time: "Reality", icon: ShieldAlert },
  ];

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-white dark:bg-gray-950">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left Column: Visual Drama */}
          <div className="relative order-2 lg:order-1">
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-100 to-orange-100 dark:from-purple-900/20 dark:to-orange-900/20 rounded-[2rem] transform -rotate-2 scale-105 blur-2xl" />
            <div className="relative bg-white dark:bg-gray-900 rounded-[2rem] shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800">
              <img
                src="/images/embarrassed-host.png"
                alt="Embarrassed cat owner"
                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-8">
                <p className="text-white font-bold text-lg">
                  "i swear i just cleaned it..."
                </p>
              </div>
            </div>

            {/* Floating 'Reality' Card */}
            <div className="absolute -bottom-8 -right-8 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border border-red-100 dark:border-red-900 animate-bounce-subtle max-w-[200px] hidden md:block">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center">
                  <Bomb className="w-4 h-4 text-red-600 dark:text-red-400" />
                </div>
                <span className="font-bold text-red-600 dark:text-red-400 text-sm">Ammonia Bomb</span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Litter box odors can travel 20 ft in seconds.
              </p>
            </div>
          </div>

          {/* Right Column: Narrative Timeline */}
          <div className="order-1 lg:order-2">
            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-gray-900 dark:text-white mb-8 leading-[1.1]">
              {section.headline}
            </h2>

            <div className="space-y-8 relative pl-8 border-l-2 border-dashed border-gray-200 dark:border-gray-800 ml-4">
              {timelineItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="relative group">
                    <div className={`absolute -left-[41px] top-0 w-6 h-6 rounded-full border-4 border-white dark:border-gray-950 ${index === timelineItems.length - 1 ? 'bg-red-500' : 'bg-gray-300 dark:bg-gray-700 group-hover:bg-electric-indigo'
                      } transition-colors duration-300`} />

                    <div className="flex items-start gap-4">
                      <span className="text-xs font-bold uppercase tracking-wider text-gray-400 mt-1 w-20 shrink-0">
                        {item.time}
                      </span>
                      <div>
                        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 font-medium leading-relaxed">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* The Pivot */}
            <div className="mt-12 pl-4">
              <div className="bg-electric-indigo/5 dark:bg-electric-indigo/10 rounded-2xl p-8 border border-electric-indigo/20 shadow-lg shadow-electric-indigo/5 transition-all duration-300 hover:shadow-electric-indigo/10">
                <p className="text-3xl md:text-4xl lg:text-5xl font-black text-electric-indigo dark:text-purple-400 mb-4 leading-tight">
                  {section.pivot}
                </p>
                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 italic">
                  {section.transition}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
