import Image from 'next/image';
import { Container } from '@/components/ui/container';

interface SolutionSectionProps {
  id?: string;
  headline: string;
  description: string;
  diagramSrc: string;
  diagramAlt?: string;
}

export function SolutionSection({
  id,
  headline,
  description,
  diagramSrc,
  diagramAlt = '',
}: SolutionSectionProps) {
  return (
    <section
      id={id}
      className="bg-blue-50 bg-gray-800 py-16 lg:py-24 scroll-mt-20"
    >
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-gray-50 tracking-tight">
            {headline}
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Diagram */}
          <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-white bg-gray-700 shadow-lg mb-8">
            <Image
              src={diagramSrc}
              alt={diagramAlt}
              fill
              className="object-contain p-4"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>

          {/* Description */}
          <p className="text-lg text-gray-700 text-gray-300 text-center leading-relaxed max-w-3xl mx-auto">
            {description}
          </p>
        </div>
      </Container>
    </section>
  );
}
