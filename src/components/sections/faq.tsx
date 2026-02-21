import { Container } from "@/components/ui/container";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslations } from "next-intl";
import Script from 'next/script';
import { createSectionClasses, createCardClasses, GRADIENTS, COLORS } from "@/lib/theme-utils";
import SectionHeader from "@/components/ui/section-header";
import Link from "next/link";

interface FAQProps {
  includeStructuredData?: boolean;
}

export function FAQ({ includeStructuredData = false }: FAQProps) {
  const t = useTranslations();
  
  // Build FAQ items from individual translation keys
  // Check if the first item exists to determine if translations are available
  const hasTranslations = t('faq.item1.question') !== 'faq.item1.question';
  
  const faqs: Array<{ question: string; answer: string; link?: string }> = hasTranslations ? [
    {
      question: t('faq.item1.question'),
      answer: t('faq.item1.answer'),
      link: t('faq.item1.link') || undefined
    },
    {
      question: t('faq.item2.question'),
      answer: t('faq.item2.answer'),
      link: t('faq.item2.link') || undefined
    },
    {
      question: t('faq.item3.question'),
      answer: t('faq.item3.answer'),
      link: t('faq.item3.link') || undefined
    },
    {
      question: t('faq.item4.question'),
      answer: t('faq.item4.answer'),
      link: t('faq.item4.link') || undefined
    },
    {
      question: t('faq.item5.question'),
      answer: t('faq.item5.answer'),
      link: t('faq.item5.link') || undefined
    },
    {
      question: t('faq.item6.question'),
      answer: t('faq.item6.answer'),
      link: t('faq.item6.link') || undefined
    },
    {
      question: t('faq.item7.question'),
      answer: t('faq.item7.answer'),
      link: t('faq.item7.link') || undefined
    },
    {
      question: t('faq.item8.question'),
      answer: t('faq.item8.answer'),
      link: t('faq.item8.link') || undefined
    },
    {
      question: t('faq.item9.question'),
      answer: t('faq.item9.answer'),
      link: t('faq.item9.link') || undefined
    }
  ] : [];

  // Generate structured data for FAQ
  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': 'https://www.purrify.ca/faq',
    mainEntity: faqs.map((faq, index) => ({
      '@type': 'Question',
      '@id': `https://www.purrify.ca/faq#question-${index + 1}`,
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
        author: {
          '@type': 'Organization',
          name: 'Purrify',
          url: 'https://www.purrify.ca'
        }
      }
    }))
  };

  const sectionClasses = createSectionClasses('light');
  const cardClasses = createCardClasses(true);

  return (
    <>
      {includeStructuredData && (
        <Script
          id="faq-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqStructuredData)
          }}
        />
      )}
      <section
        className={`${sectionClasses} py-12`}
        id="faq-section"
      >
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <SectionHeader text={t('faq.commonQuestions')} />
            <h2 className={`text-5xl font-bold tracking-tight mb-4 ${GRADIENTS.text.purple} leading-tight`}>
              {t('faq.title')}
            </h2>
            <p className={`${COLORS.text.tertiary} text-lg`}>
              {t('faq.subtitle')}
            </p>
          </div>

          <div className={`max-w-3xl mx-auto ${cardClasses} p-8`}>
            <Accordion type="single" collapsible className="w-full" aria-label={t('faq.title')}>
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={`faq-${faq.question.slice(0, 20).replaceAll(/\s+/g, '-').toLowerCase()}-${index}`}
                  value={`item-${index}`}
                  className={`border-b ${COLORS.border.accent} last:border-0`}
                >
                  <AccordionTrigger className={`text-left font-bold text-lg ${COLORS.text.primary} hover:${COLORS.text.purple} transition-colors py-3 flex items-center`}>
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className={`${COLORS.text.tertiary} leading-relaxed text-base pb-4`}>
                    {faq.answer}
                    {faq.link && (
                      <>
                        {' '}
                        <Link href={faq.link} className={`${COLORS.text.purple} font-medium hover:opacity-80 transition-colors underline`}>
                          {t('faq.learnMore')} →
                        </Link>
                      </>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="mt-12 text-center">
            <p className={COLORS.text.tertiary}>
              {t('faq.stillHaveQuestions')}{" "}
              <a
                href="#contact"
                className={`${COLORS.text.purple} font-medium hover:opacity-80 transition-colors`}
              >
                {t('faq.contactTeam')}
              </a>{" "}
              {t('faq.forMoreInfo')}
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
