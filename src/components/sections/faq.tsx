import { Container } from "@/components/ui/container";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslation } from "../../lib/translation-context";
import Script from 'next/script';
import { createSectionClasses, createCardClasses, GRADIENTS, COLORS } from "@/lib/theme-utils";
import SectionHeader from "../ui/section-header";
import Link from "next/link";

interface FAQProps {
  includeStructuredData?: boolean;
}

export function FAQ({ includeStructuredData = false }: FAQProps) {
  const { t } = useTranslation();
  
  // Use the FAQ items from translations if available, otherwise use the hardcoded ones
  const faqs: Array<{ question: string; answer: string; link?: string }> = t.faq?.items || [
    {
      question: "How often should I use Purrify?",
      answer:
        "For best results, sprinkle Purrify on top of your cat's litter each time you change or add fresh litter. A thin layer is all you need for continuous odor control.",
    },
    {
      question: "Can I use Purrify around my cat?",
      answer:
        "Purrify uses the same type of coconut-shell activated carbon used widely in home water and air filtration. It contains no added fragrances or dyes.",
    },
    {
      question: "How long does one container of Purrify last?",
      answer:
        "This depends on how many cats you have and how often you change their litter. On average, our 65g container lasts about 1-2 months for a single cat household with regular litter changes.",
    },
    {
      question: "Can I use Purrify with any type of litter?",
      answer:
        "Yes! Purrify works effectively with all types of cat litter including clay, crystal, natural, clumping, and non-clumping varieties.",
    },
    {
      question: "How is Purrify different from scented litters or deodorizers?",
      answer:
        "Unlike scented products that mask odors, Purrify uses activated carbon technology to actually trap and neutralize odor molecules at the source. It doesn't add any scent to your home - it simply eliminates the bad ones.",
    },
    {
      question: "How does this differ from regular baking soda?",
      answer:
        "While baking soda can help with some odors through chemical reactions, our activated carbon works through physical adsorption - trapping odor molecules in its extensive network of microscopic pores. The surface area of Purrify is 1,150 square meters per gram compared to baking soda's approximately 0.2 square meters per gram, making it far more effective at capturing a wider range of odor molecules.",
    },
    {
      question: "Will my cat have any reaction to this?",
      answer:
        "Activated carbon is biologically inert and widely used in water filtration, air purification, and medical applications. Most cats show no signs of avoiding or reacting to the product when properly introduced. As with any new addition to the litter box, we recommend monitoring your cat's behavior during initial use.",
    },
    {
      question: "How soon will I notice results?",
      answer:
        "Many customers report noticing an improvement within hours of first application. The effect becomes more pronounced as the carbon fully integrates with your existing litter. For best results, apply a thin, even layer across the surface of clean litter.",
    },
    {
      question: "Is Purrify certified? Where can I find safety information?",
      answer:
        "Yes! Purrify meets NSF/ANSI 61, AWWA B604, and Food Chemicals Codex (FCC) standards. It's also Halal and Kosher certified. For complete technical specifications, certifications, and safety information, visit our safety information page.",
      link: "/learn/safety-information"
    },
  ];

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
        id="faq"
      >
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <SectionHeader text={t.faq?.commonQuestions || "Common Questions"} />
            <h2 className={`text-5xl font-bold tracking-tight mb-4 ${GRADIENTS.text.purple} leading-tight`}>
              {t.faq?.title || "Frequently Asked Questions"}
            </h2>
            <p className={`${COLORS.text.tertiary} text-lg`}>
              {t.faq?.subtitle || "Have questions about Purrify? Find answers to our most commonly asked questions below."}
            </p>
          </div>

          <div className={`max-w-3xl mx-auto ${cardClasses} p-8`}>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={`faq-${faq.question.slice(0, 20).replace(/\s+/g, '-').toLowerCase()}-${index}`}
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
                          Learn more →
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
              {t.faq?.stillHaveQuestions || "Still have questions?"}{" "}
              <a
                href="#contact"
                className={`${COLORS.text.purple} font-medium hover:opacity-80 transition-colors`}
              >
                {t.faq?.contactTeam || "Contact our team"}
              </a>{" "}
              {t.faq?.forMoreInfo || "for more information."}
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
