"use client";

import { Container } from "@/components/ui/container";
import { useTranslations } from "next-intl";
import { MapPin, Star } from "lucide-react";

const testimonials = [
  { name: "Maïwenn Côté", location: "Hochelaga, Montréal", quote: "My cat's litter box is in my bedroom. Was. Now I can have guests over again." },
  { name: "Anaïs Roberge", location: "Verdun, Montréal", quote: "It doesn't smell like flowers- it smells like nothing." },
  { name: "Darian Kovacevic", location: "Saint-Henri, Montréal", quote: "I thought my apartment just smelled like cats but it was the ammonia. Huge difference now- thank you!!" },
  { name: "Koralie Thibodeau", location: "Terrebonne, QC", quote: "My cat didn't notice I changed anything. My guests noticed immediately." },
  { name: "Yanis Beaulieu", location: "Villeray, Montréal", quote: "Real pet tax, is the litter box. Always paying with the smell. With Purrify, fini. I don't pay that anymore." },
  { name: "Éloïse Martel", location: "Boucherville, QC", quote: "Tried every spray, every powder, every litter, every 'odour eliminator.' This is the first one that actually eliminated the odour." },
  { name: "Zélie Paquin", location: "Outremont, Montréal", quote: "I have 3 cats. One box in the basement, one on the main floor. Even in February with the windows shut, my house smells like exactly 0 cats. Explain that." },
];

export function HomepageTestimonials() {
  const t = useTranslations('testimonialsSection');

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-950 dark:via-purple-950/20 dark:to-gray-900">
      <Container>
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 border border-purple-200 dark:border-purple-800 mb-6">
            <Star className="w-4 h-4 text-yellow-500 dark:text-yellow-400 fill-yellow-500 dark:fill-yellow-400" />
            <span className="text-purple-700 dark:text-purple-300 font-semibold text-sm">{t('customerLove')}</span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            {t('littersOfLove')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300 flex flex-col"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 text-yellow-400 dark:text-yellow-300 fill-yellow-400 dark:fill-yellow-300" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed flex-grow mb-4 italic">
                {`\u201C${testimonial.quote}\u201D`}
              </p>

              {/* Attribution */}
              <div className="flex items-center gap-2 pt-4 border-t border-gray-100 dark:border-gray-700">
                <div>
                  <p className="font-bold text-sm text-gray-900 dark:text-white">{testimonial.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
