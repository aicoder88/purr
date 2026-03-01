'use client';

import Image from 'next/image';
import { Quote, Star } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';

export function SocialProofSection() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <section className="py-12 bg-white bg-gray-800">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-gradient-to-br from-brand-light to-white from-gray-700 to-gray-800 rounded-2xl p-8 md:p-12 shadow-lg border border-brand-light border-gray-700">
            <Quote className="absolute top-6 left-6 w-12 h-12 text-brand-purple/20 text-purple-400/20" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              {/* Testimonial Content */}
              <div className="md:col-span-2">
                <h2 className="font-heading text-2xl font-bold text-brand-purple text-purple-400 mb-4">
                  {`"${t('productsPage.testimonial.headline')}"`}
                </h2>
                <blockquote className="text-lg text-gray-700 text-gray-200 mb-6 leading-relaxed">
                  {`"${t('productsPage.testimonial.quote')}"`}
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400 fill-yellow-300 text-yellow-300" />
                    ))}
                  </div>
                  <span className="text-gray-600 text-gray-300">
                    — <span className="font-semibold">{t('productsPage.testimonial.author')}</span>, {t('productsPage.testimonial.location')} ({t('productsPage.testimonial.details')})
                  </span>
                </div>
              </div>
              {/* Image */}
              <div className="relative hidden md:block">
                <div className="relative h-64 w-full rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src="/optimized/marketing/sarah-montreal-testimonial.png"
                    alt={locale === 'fr' ? "Sarah de Montréal avec ses chats dans son appartement" : "Sarah from Montreal with her cats in her apartment"}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Transition: Curiosity hook to science */}
          <p className="text-center mt-8 text-lg text-gray-700 text-gray-300 max-w-2xl mx-auto">
            {locale === 'fr'
              ? "Comment un simple sachet peut-il éliminer une odeur aussi tenace? La réponse tient dans un seul grain..."
              : "How does a simple pouch eliminate such a stubborn smell? The answer fits in a single grain..."}
          </p>
        </div>
      </Container>
    </section>
  );
}
