'use client';

import { Container } from "@/components/ui/container";
import { TESTIMONIALS } from "@/lib/constants";
import SectionHeader from "@/components/ui/section-header";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { createColorClasses, createSectionClasses, GRADIENTS, COLORS } from "@/lib/theme-utils";
import { generateStarRating, generateAvatarUrl, QuoteIcon, createStaggeredAnimation } from "@/lib/component-utils";

interface TestimonialCardProps {
  testimonial: {
    author: string;
    text: string;
    rating?: number;
  };
  index: number;
  colorScheme: 'red' | 'purple' | 'green';
}

const TestimonialCard = ({ testimonial, index, colorScheme }: TestimonialCardProps) => {
  const colors = createColorClasses(colorScheme);
  const staggerStyle = createStaggeredAnimation(index);

  return (
    <div
      className={`flex flex-col h-full ${colors.bg} backdrop-blur-sm p-8 rounded-2xl shadow-xl border ${colors.border} relative transition-all duration-500 hover:shadow-[#E0EFC7]/50 hover:-translate-y-2 group`}
      style={staggerStyle}
    >
      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10">
        <div className="rounded-full border-4 border-white bg-white dark:bg-gray-800 shadow-lg overflow-hidden w-16 h-16 group-hover:scale-110 transition-transform duration-300">
          <Image
            src={generateAvatarUrl(testimonial.author, index)}
            alt={`Portrait photo of ${testimonial.author}, satisfied Purrify customer`}
            width={64}
            height={64}
            sizes="64px"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
        <QuoteIcon color={colors.iconColor} />
      </div>
      <div className="pt-10">
        <div className="flex mb-2">
          {generateStarRating(testimonial.rating || 5)}
        </div>
        <p className={`${COLORS.text.primary} italic mb-6 leading-relaxed text-sm md:text-base line-clamp-4 md:line-clamp-6`}>
          “{testimonial.text}”
        </p>
        <div className="flex items-center justify-between">
          <p className={`font-bold ${colors.text} text-sm md:text-base`}>
            {testimonial.author}
          </p>
        </div>
      </div>
    </div>
  );
};

export function Testimonials() {
  const t = useTranslations();

  const colorSchemes: ('red' | 'purple' | 'green')[] = ['red', 'purple', 'green'];

  const sectionClasses = createSectionClasses('alternate');

  return (
    <section
      className={sectionClasses}
      id="testimonials-section"
      aria-labelledby="testimonials-heading"
    >
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <SectionHeader text={t('testimonialsSection.customerLove')} />
          <h2 id="testimonials-heading" className={`text-5xl font-bold tracking-tight mb-4 ${GRADIENTS.text.primary} ${GRADIENTS.text.primaryDark}`}>
            {t('testimonialsSection.littersOfLove')}
          </h2>
          <p className={`${COLORS.text.tertiary} text-xl max-w-2xl mx-auto`}>
            {t('testimonialsSection.dontJustTakeOurWord')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <button
              onClick={() => {
                const element = document.getElementById('testimonials-section');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className={`inline-flex items-center px-6 py-3 ${GRADIENTS.background.primary} text-white dark:text-gray-100 font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95`}
              aria-label={t('homepage.altText.customerTestimonials')}
            >
              {t('nav.testimonials')}
            </button>
            <button
              onClick={() => window.open('https://g.page/r/CUB8bZ_ibMbwEBM/review', '_blank')}
              className={`inline-flex items-center px-6 py-3 ${COLORS.surface.light} text-[#5B2EFF] font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 border-2 border-[#5B2EFF] hover:bg-[#5B2EFF] hover:text-white dark:text-gray-100`}
              aria-label={t('homepage.altText.leaveGoogleReview')}
            >
              <svg
                className="w-5 h-5 mr-2"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              {t('nav.leaveReview')}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.slice(0, 6).map((testimonial, index) => {
            const colorScheme = colorSchemes[index % colorSchemes.length];
            return (
              <TestimonialCard
                key={`testimonial-${testimonial.author.replaceAll(/\s+/g, '-').toLowerCase()}-${index}`}
                testimonial={testimonial}
                index={index}
                colorScheme={colorScheme}
              />
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <a
            href="https://g.page/r/CUB8bZ_ibMbwEBM/review"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center px-6 py-3 ${COLORS.surface.light} rounded-full shadow-md hover:shadow-lg text-[#5B2EFF] hover:text-[#5B2EFF]/80 font-medium transition-all duration-300 group`}
          >
            {t('testimonialsSection.readMoreReviews')}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
      </Container>
    </section>
  );
}
