import { Container } from '@/components/ui/container';
import { NextPage } from "next";
import Head from "next/head";
import { SITE_NAME } from "@/lib/constants";
import { useTranslation } from "@/lib/translation-context";

const PrivacyPolicyPage: NextPage = () => {
  const { t, locale } = useTranslation();
  
  return (
    <Container>
      <Head>
        <title>{t.privacyPolicy.title} | {SITE_NAME}</title>
        <meta name="description" content={t.privacyPolicy.sections[0].content} />
        <link rel="canonical" href="https://purrify.ca/zh/privacy-policy" />
        <link rel="alternate" hrefLang="zh" href="https://purrify.ca/zh/privacy-policy" />
        <link rel="alternate" hrefLang="en" href="https://purrify.ca/privacy-policy" />
        <link rel="alternate" hrefLang="fr" href="https://purrify.ca/fr/privacy-policy" />
      </Head>
      
      <div className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-50 mb-8">{t.privacyPolicy.title}</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 dark:text-gray-300 mb-6">{t.privacyPolicy.lastUpdated}</p>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-50 mb-4">1. {t.privacyPolicy.sections[0].title}</h2>
              <p className="text-gray-700 dark:text-gray-200 mb-4">
                {t.privacyPolicy.sections[0].content}
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-200 mb-4 space-y-2">
                {t.privacyPolicy.sections[0].items?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            {t.privacyPolicy.sections.slice(1).map((section, index) => (
              <section key={index + 1} className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-50 mb-4">
                  {index + 2}. {section.title}
                </h2>
                <p className="text-gray-700 dark:text-gray-200 mb-4">
                  {section.content}
                </p>
                {section.items && Array.isArray(section.items) && section.items.length > 0 && (
                  <ul className="list-disc list-inside text-gray-700 dark:text-gray-200 mb-4 space-y-2">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex}>{item}</li>
                    ))}
                  </ul>
                )}
                {section.title === t.privacyPolicy.sections[t.privacyPolicy.sections.length - 1].title && (
                  <p className="text-gray-700 dark:text-gray-200">
                    {t.privacyPolicy.contactInfo.email}: {t.privacyPolicy.contactInfo.email}<br />
                    {t.privacyPolicy.contactInfo.phone}: {t.privacyPolicy.contactInfo.phone}<br />
                    {t.privacyPolicy.contactInfo.address}
                  </p>
                )}
              </section>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default PrivacyPolicyPage;
