'use client';

import Image from 'next/image';
import { Zap } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { useLocale } from 'next-intl';

export function ScienceSection() {
  const locale = useLocale();

  return (
    <section className="py-12 bg-brand-purple/5 bg-brand-purple/10">
      <Container>
        <div className="max-w-5xl mx-auto">
          <div className="bg-white bg-gray-800 rounded-xl border border-brand-purple/20 shadow-md overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="w-8 h-8 text-brand-purple" />
                  <h2 className="font-heading font-bold text-2xl text-gray-900 text-gray-100">
                    {locale === 'fr'
                      ? "Un grain. La superficie d'un demi-terrain de football."
                      : "One Gram. Half a Football Field of Surface Area."}
                  </h2>
                </div>
                <p className="text-lg text-gray-700 text-gray-200 mb-6 leading-relaxed">
                  {locale === 'fr'
                    ? "À l'intérieur de chaque grain de charbon actif se trouvent des millions de tunnels microscopiques. Quand les molécules d'ammoniac passent à côté, elles sont piégées de façon permanente."
                    : "Inside every grain of activated carbon are millions of microscopic tunnels. When ammonia molecules float past, they get trapped permanently."}
                </p>
                <p className="text-gray-600 text-gray-400 text-base border-l-4 border-brand-purple/30 pl-4 italic">
                  {locale === 'fr'
                    ? "Ce n'est pas du camouflage. C'est de la capture moléculaire — la même technologie utilisée dans les masques à gaz, les usines de traitement d'eau et la filtration d'air des hôpitaux."
                    : "This isn't masking. It's molecular capture — the same technology used in gas masks, water treatment plants, and hospital air filtration."}
                </p>
              </div>
              <div className="relative h-64 md:h-auto min-h-[300px]">
                <Image
                  src="/optimized/blog/microscopic-carbon-structure.png"
                  alt={locale === 'fr' ? "Structure microscopique du charbon actif piégeant les molécules" : "Microscopic structure of activated carbon trapping molecules"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6 md:hidden">
                  <span className="text-sm font-medium drop-shadow-md" style={{ color: 'white' }}>
                    {locale === 'fr' ? "Vue microscopique" : "Microscopic View"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Transition to trust signals */}
          <p className="text-center mt-10 text-gray-600 text-gray-300">
            {locale === 'fr'
              ? "La science est impressionnante. Mais voici ce qui compte vraiment pour vous et votre chat:"
              : "The science is impressive. But here's what actually matters for you and your cat:"}
          </p>
        </div>
      </Container>
    </section>
  );
}
