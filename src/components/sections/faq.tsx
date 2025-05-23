import { Container } from "@/components/ui/container";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslation } from "../../lib/translation-context";

export function FAQ() {
  const { t } = useTranslation();
  
  // Use the FAQ items from translations if available, otherwise use the hardcoded ones
  const faqs = t.faq?.items || [
    {
      question: "How often should I use Purrify?",
      answer:
        "For best results, sprinkle Purrify on top of your cat's litter each time you change or add fresh litter. A thin layer is all you need for continuous odor control.",
    },
    {
      question: "Is Purrify safe for my cat?",
      answer:
        "Purrify is made from the same natural activated coconut carbon used worldwide in indoor air and drinking water filtration systems! It contains no harmful chemicals or fragrances that could irritate your cat or affect their litter box habits.",
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
  ];

  return (
    <section
      className="py-12 bg-gradient-to-br from-white to-orange-50"
      id="faq"
    >
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block px-4 py-1 bg-[#E0EFC7] rounded-full text-[#FF3131] font-medium text-sm mb-4">
            {t.faq?.commonQuestions || "Common Questions"}
          </div>
          <h2 className="text-5xl font-bold tracking-tight mb-4 text-[#5B2EFF]">
            {t.faq?.title || "Frequently Asked Questions"}
          </h2>
          <p className="text-gray-600 text-lg">
            {t.faq?.subtitle || "Have questions about Purrify? Find answers to our most commonly asked questions below."}
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-[#FFFFFF]/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-[#E0EFC7]">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-b border-[#E0EFC7] last:border-0"
              >
                <AccordionTrigger className="text-left font-bold text-lg hover:text-[#5B2EFF] transition-colors py-3 flex items-center">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 leading-relaxed text-base pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600">
            {t.faq?.stillHaveQuestions || "Still have questions?"}{" "}
            <a
              href="#contact"
              className="text-[#5B2EFF] font-medium hover:text-[#5B2EFF]/80 transition-colors"
            >
              {t.faq?.contactTeam || "Contact our team"}
            </a>{" "}
            {t.faq?.forMoreInfo || "for more information."}
          </p>
        </div>
      </Container>
    </section>
  );
}
