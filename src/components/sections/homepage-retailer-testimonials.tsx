import { Container } from "@/components/ui/container";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { MapPin, Quote } from "lucide-react";
import type { TranslationType } from "@/translations/types";
import { getStoreLogo, hasWhiteBackground } from "@/lib/store-locations";

export async function HomepageRetailerTestimonials() {
  const t = await getTranslations();
  const testimonialLibrary = t.raw('testimonialLibrary') as TranslationType['testimonialLibrary'];
  const featuredTestimonials = testimonialLibrary.retailer.slice(0, 2);

  return (
    <section className="py-16 md:py-20 bg-[linear-gradient(180deg,#fff8ee_0%,#fffdf7_100%)] dark:bg-[linear-gradient(180deg,#111827_0%,#030712_100%)]">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('retailers.testimonials.title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {t('retailers.testimonials.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {featuredTestimonials.map((testimonial) => {
            const logoConfig = getStoreLogo(testimonial.businessName);
            const whiteBackground = hasWhiteBackground(testimonial.businessName);

            return (
              <article
                key={testimonial.id}
                className="rounded-3xl border border-amber-100/80 bg-white/95 p-7 shadow-lg shadow-amber-100/40 dark:border-gray-800 dark:bg-gray-900/90 dark:shadow-black/20"
              >
                <div className="flex items-start gap-4 mb-5">
                  <div
                    className={[
                      "relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border",
                      whiteBackground
                        ? "border-gray-200 bg-white dark:border-gray-700 dark:bg-white"
                        : "border-transparent bg-gradient-to-br from-brand-yellow via-brand-pink to-brand-pink",
                    ].join(' ')}
                  >
                    {logoConfig ? (
                      <Image
                        src={logoConfig.src}
                        alt={logoConfig.alt}
                        fill
                        sizes="56px"
                        className="object-contain p-2"
                      />
                    ) : (
                      <Quote className="h-6 w-6 text-white dark:text-white" />
                    )}
                  </div>

                  <div className="min-w-0">
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                      {testimonial.businessName}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {testimonial.businessType}
                    </p>
                    <p className="mt-1 flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                      <MapPin className="h-3.5 w-3.5" />
                      {testimonial.location}
                    </p>
                  </div>
                </div>

                <blockquote className="text-lg leading-relaxed text-gray-700 italic dark:text-gray-200">
                  “{testimonial.quote}”
                </blockquote>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
