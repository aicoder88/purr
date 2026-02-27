'use client';

import Image from 'next/image';
import { Container } from '@/components/ui/container';
import { Clock, Droplets, Shield, Heart } from 'lucide-react';
import { MaintenanceTipItem } from './GuideCopy';

const MAINTENANCE_ICONS = [Clock, Droplets, Shield, Heart];

interface MaintenanceSectionProps {
  copy: {
    maintenanceTitle: string;
    maintenanceDescription: string;
    maintenanceImageAlt: string;
    maintenanceTips: MaintenanceTipItem[];
  };
}

export default function MaintenanceSection({ copy }: MaintenanceSectionProps) {
  return (
    <>
      <section className="py-16 bg-[#E0EFC7]/30 dark:bg-gray-800/50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">{copy.maintenanceTitle}</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">{copy.maintenanceDescription}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {copy.maintenanceTips.map((tip, index) => {
              const TipIcon = MAINTENANCE_ICONS[index] || Clock;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-[#5B2EFF] dark:bg-[#818CF8] rounded-full flex items-center justify-center mx-auto mb-4">
                    <TipIcon className="w-8 h-8 text-white dark:text-gray-900" />
                  </div>
                  <h3 className="font-heading text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">{tip.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{tip.description}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="py-8">
        <Container>
          <div className="max-w-4xl mx-auto">
            <Image
              src="/optimized/marketing/step-2-mix.webp"
              alt={copy.maintenanceImageAlt}
              width={1600}
              height={1067}
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
        </Container>
      </section>
    </>
  );
}
