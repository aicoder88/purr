import React from 'react';
import Link from 'next/link';

interface SetupInstructionsProps {
  feature: string;
  envVar: string;
  docsUrl: string;
  description: string;
}

/**
 * SetupInstructions Component
 * 
 * Displays helpful setup instructions when optional environment variables
 * are missing. Provides links to documentation and shows example values.
 */
export default function SetupInstructions({
  feature,
  envVar,
  docsUrl,
  description
}: SetupInstructionsProps) {
  return (
    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg
            className="h-6 w-6 text-yellow-600 dark:text-yellow-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-200">
            {feature} Not Configured
          </h3>
          <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
            <p>{description}</p>
          </div>
          
          <div className="mt-4">
            <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-2">
              To enable this feature:
            </h4>
            <ol className="list-decimal list-inside space-y-2 text-sm text-yellow-700 dark:text-yellow-300">
              <li>
                Get your API key from the service provider
              </li>
              <li>
                Add it to your environment variables:
                <code className="block mt-1 px-3 py-2 bg-yellow-100 dark:bg-yellow-900/40 rounded text-xs font-mono">
                  {envVar}=your_api_key_here
                </code>
              </li>
              <li>
                Redeploy your application or restart the development server
              </li>
            </ol>
          </div>
          
          <div className="mt-4">
            <Link
              href={docsUrl}
              className="inline-flex items-center text-sm font-medium text-yellow-800 dark:text-yellow-200 hover:text-yellow-900 dark:hover:text-yellow-100"
            >
              View Setup Documentation
              <svg
                className="ml-1 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * MultipleSetupInstructions Component
 * 
 * Displays multiple setup instructions in a compact list format
 */
interface MultipleSetupInstructionsProps {
  instructions: Array<{
    feature: string;
    envVar: string;
    docsUrl: string;
    description: string;
  }>;
}

export function MultipleSetupInstructions({ instructions }: MultipleSetupInstructionsProps) {
  if (instructions.length === 0) {
    return null;
  }
  
  return (
    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg
            className="h-6 w-6 text-blue-600 dark:text-blue-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-lg font-medium text-blue-800 dark:text-blue-200">
            Optional Features Available
          </h3>
          <p className="mt-2 text-sm text-blue-700 dark:text-blue-300">
            The following features can be enabled by adding environment variables:
          </p>
          
          <div className="mt-4 space-y-3">
            {instructions.map((instruction, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-md p-4 border border-blue-200 dark:border-blue-700"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {instruction.feature}
                    </h4>
                    <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                      {instruction.description}
                    </p>
                    <code className="mt-2 inline-block px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs font-mono text-gray-800 dark:text-gray-200">
                      {instruction.envVar}
                    </code>
                  </div>
                  <Link
                    href={instruction.docsUrl}
                    className="ml-4 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 whitespace-nowrap"
                  >
                    Setup →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
