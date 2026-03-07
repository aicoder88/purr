import { Container } from "@/components/ui/container";
import { MapPin, Star } from "lucide-react";
import { getTranslations } from "next-intl/server";
import type { TranslationType } from "@/translations/types";

export async function HomepageTestimonials() {
  const t = await getTranslations();
  const testimonialLibrary = t.raw('testimonialLibrary') as TranslationType['testimonialLibrary'];
  const testimonials = testimonialLibrary.consumer;

  return (
    <section className="py-14 md:py-16 bg-[linear-gradient(180deg,#fffdf8_0%,#fff8ee_100%)] dark:bg-[linear-gradient(180deg,#030712_0%,#111827_100%)]">
      <Container>
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-brand-yellow/25 via-brand-pink/25 to-brand-pink/25 border border-brand-pink/30 mb-5">
            <Star className="w-4 h-4 text-yellow-500 dark:text-yellow-400 fill-yellow-500 dark:fill-yellow-400" />
            <span className="text-gray-900 dark:text-gray-100 font-semibold text-sm">{t('testimonialsSection.customerLove')}</span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            {t('testimonialsSection.littersOfLove')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white/95 dark:bg-gray-900/95 rounded-2xl p-6 border border-amber-100 dark:border-gray-800 hover:border-amber-200 dark:hover:border-gray-700 transition-colors duration-300 flex flex-col"
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
                  <p className="font-bold text-sm text-gray-900 dark:text-white">{testimonial.author}</p>
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
