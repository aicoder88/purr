'use client';

import { LocalizedMeta } from '@/components/seo/LocalizedMeta';
import { useTranslation } from '@/lib/translation-context';

export default function PrivacyPolicyPage() {
  const { t } = useTranslation();

  return (
    <>
      <LocalizedMeta
        title="Privacy Policy - Purrify Cat Litter Additive Data Protection"
        description="Learn how Purrify collects, uses, and protects your information. Read our privacy policy for details on data usage, security, and your rights."
        canonicalPath="/privacy-policy"
      />
      <main className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="font-heading text-4xl font-bold mb-6 text-gray-900 dark:text-gray-50">
          {t.privacyPolicy.title}
        </h1>

        {t.privacyPolicy.sections.map((section: { title: string; content: string; items?: string[] }, index: number) => (
          <div key={index} className={index > 0 ? "mt-8" : ""}>
            <h2 className="font-heading text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-50">
              {section.title}
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-200">
              {section.content}
            </p>
            {section.items && section.items.length > 0 && (
              <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-200">
                {section.items.map((item: string, itemIndex: number) => (
                  <li key={itemIndex} dangerouslySetInnerHTML={{ __html: item }} />
                ))}
              </ul>
            )}
          </div>
        ))}

        <div className="mt-8">
          <h2 className="font-heading text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-50">
            Contact Us
          </h2>
          <p className="mb-4 text-gray-700 dark:text-gray-200">
            If you have any questions, concerns, or requests regarding this Privacy Policy or your personal information, please contact us:
          </p>
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
            <p className="mb-2 text-gray-700 dark:text-gray-200">
              <strong>Email:</strong>{" "}
              <a
                href={`mailto:${t.privacyPolicy.contactInfo.email}`}
                className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300"
              >
                {t.privacyPolicy.contactInfo.email}
              </a>
            </p>
            <p className="mb-2 text-gray-700 dark:text-gray-200">
              <strong>Address:</strong> {t.privacyPolicy.contactInfo.address}
            </p>
            <p className="text-gray-700 dark:text-gray-200">
              <strong>Phone:</strong>{" "}
              <a
                href={`tel:${t.privacyPolicy.contactInfo.phone.replace(/[^0-9+]/g, '')}`}
                className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300"
              >
                {t.privacyPolicy.contactInfo.phone}
              </a>
            </p>
          </div>

          <p className="mt-8 text-sm text-gray-500 dark:text-gray-400">
            {t.privacyPolicy.lastUpdated}
          </p>
        </div>
      </main>
    </>
  );
}
