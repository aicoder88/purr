'use client';

import { Container } from '@/components/ui/container';
import { CheckCircle, XCircle, Star } from 'lucide-react';
import { LitterTypeItem } from './GuideCopy';

interface LitterTypesSectionProps {
  copy: {
    litterTypesTitle: string;
    litterTypesDescription: string;
    litterTypesDeepDiveTitle: string;
    litterTypesDeepDiveParagraphs: string[];
    prosLabel: string;
    consLabel: string;
    bestForLabel: string;
    watchOutLabel: string;
    litterTypes: LitterTypeItem[];
  };
}

export default function LitterTypesSection({ copy }: LitterTypesSectionProps) {
  return (
    <section id="types" className="py-16">
      <Container>
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-gray-900 text-gray-100">{copy.litterTypesTitle}</h2>
          <p className="text-xl text-gray-600 text-gray-300 max-w-3xl mx-auto">{copy.litterTypesDescription}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {copy.litterTypes.map((litter, index) => (
            <div key={index} className="bg-white bg-gray-800 rounded-xl p-6 shadow-lg border border-[#E0EFC7] border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading text-xl font-bold text-gray-900 text-gray-100">{litter.name}</h3>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < litter.rating ? 'text-yellow-400 fill-current' : 'text-gray-300 text-gray-600'}`} />
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-green-600 text-green-400 mb-2">{copy.prosLabel}</h4>
                  <ul className="space-y-1">
                    {litter.pros.map((pro, i) => (
                      <li key={i} className="flex items-center text-sm text-gray-600 text-gray-300">
                        <CheckCircle className="w-4 h-4 text-green-500 text-green-400 mr-2 flex-shrink-0" />
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-red-600 text-red-400 mb-2">{copy.consLabel}</h4>
                  <ul className="space-y-1">
                    {litter.cons.map((con, i) => (
                      <li key={i} className="flex items-center text-sm text-gray-600 text-gray-300">
                        <XCircle className="w-4 h-4 text-red-500 text-red-400 mr-2 flex-shrink-0" />
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 border-t border-gray-200 border-gray-700">
                  <p className="text-sm text-gray-700 text-gray-300 mb-2">
                    <span className="font-semibold text-gray-900 text-gray-100">{copy.bestForLabel}</span> {litter.bestFor}
                  </p>
                  <p className="text-sm text-gray-700 text-gray-300">
                    <span className="font-semibold text-gray-900 text-gray-100">{copy.watchOutLabel}</span> {litter.watchOut}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gray-50 bg-gray-800 border border-gray-200 border-gray-700 rounded-xl p-6 md:p-8">
          <h3 className="font-heading text-2xl font-bold text-gray-900 text-gray-100 mb-4">{copy.litterTypesDeepDiveTitle}</h3>
          <div className="space-y-4">
            {copy.litterTypesDeepDiveParagraphs.map((paragraph, index) => (
              <p key={index} className="text-gray-700 text-gray-300">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
