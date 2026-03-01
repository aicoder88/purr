/**
 * HowToSection Component
 *
 * Renders a step-by-step guide with HowTo schema markup for SEO.
 * Optimized for AI citations and rich snippets in search results.
 */

import { useMemo } from 'react';
import Image from 'next/image';

export interface HowToStep {
  name: string;
  text: string;
  image?: string;
  tip?: string;
}

export interface HowToSectionProps {
  /** Title of the how-to guide */
  title: string;
  /** Description of what the guide covers */
  description: string;
  /** Array of steps */
  steps: HowToStep[];
  /** Optional image for the overall guide */
  image?: string;
  /** Optional total time in ISO 8601 duration format (e.g., "PT5M" for 5 minutes) */
  totalTime?: string;
  /** Optional human-readable time string */
  timeDisplay?: string;
  /** URL of the page (for schema) */
  url?: string;
  /** Whether to include the JSON-LD schema in head */
  includeSchema?: boolean;
  /** Custom className for styling */
  className?: string;
}

export function HowToSection({
  title,
  description,
  steps,
  image,
  totalTime,
  timeDisplay,
  url,
  includeSchema = false,
  className = '',
}: HowToSectionProps) {
  // Generate HowTo schema
  const schema = useMemo(() => {
    const schemaObj: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: title,
      description: description,
      step: steps.map((step, index) => ({
        '@type': 'HowToStep',
        position: index + 1,
        name: step.name,
        text: step.text,
        ...(step.image && { image: step.image }),
      })),
    };

    if (image) {
      schemaObj.image = image;
    }

    if (totalTime) {
      schemaObj.totalTime = totalTime;
    }

    if (url) {
      schemaObj.url = url;
    }

    return schemaObj;
  }, [title, description, steps, image, totalTime, url]);

  return (
    <>
      {includeSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}

      <section className={`how-to-section ${className}`}>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 text-gray-50 mb-2">
            {title}
          </h2>
          <p className="text-gray-700 text-gray-300">{description}</p>
          {timeDisplay && (
            <p className="text-sm text-gray-500 text-gray-400 mt-2">
              <span className="font-medium">Time needed:</span> {timeDisplay}
            </p>
          )}
        </div>

        <ol className="space-y-6">
          {steps.map((step, index) => (
            <li
              key={index}
              className="relative pl-12 pb-6 border-l-2 border-green-200 border-green-800 last:border-l-0 last:pb-0"
            >
              {/* Step number circle */}
              <div className="absolute left-0 top-0 -translate-x-1/2 w-8 h-8 rounded-full bg-green-500 bg-green-600 text-white text-gray-100 flex items-center justify-center font-bold text-sm">
                {index + 1}
              </div>

              <div className="bg-gray-50 bg-gray-800 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 text-gray-50 mb-2">
                  {step.name}
                </h3>
                <p className="text-gray-700 text-gray-300">{step.text}</p>

                {step.tip && (
                  <div className="mt-3 p-3 bg-amber-50 bg-amber-900/20 border-l-4 border-amber-400 border-amber-500 rounded-r">
                    <p className="text-sm text-amber-800 text-amber-200">
                      <span className="font-medium">Pro tip:</span> {step.tip}
                    </p>
                  </div>
                )}

                {step.image && (
                  <div className="mt-3">
                    <Image
                      src={step.image}
                      alt={`Step ${index + 1}: ${step.name}`}
                      width={1200}
                      height={675}
                      className="rounded-lg max-w-full h-auto"
                    />
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}

export default HowToSection;
