import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
import Script from 'next/script';

type ProductType = 'trial' | 'standard' | 'family' | 'jumbo';

interface FAQ {
  question: string;
  answer: string;
}

interface ProductFAQProps {
  productType: ProductType;
  productName?: string;
  includeStructuredData?: boolean;
}

// Product-specific FAQ data
const PRODUCT_FAQS: Record<ProductType, FAQ[]> = {
  trial: [
    {
      question: "How long does the Trial Size (12g) last?",
      answer: "The 12g Trial Size typically lasts 2-3 weeks for a single cat household with regular litter changes. It's perfect for testing Purrify before committing to a larger size."
    },
    {
      question: "Is this enough to see results?",
      answer: "Absolutely! Most customers notice a significant difference within the first 24-48 hours. The trial size gives you enough product to experience the full odor-eliminating power of activated carbon."
    },
    {
      question: "How do I use Purrify?",
      answer: "Simply sprinkle a thin, even layer of Purrify on top of your cat's litter after cleaning or adding fresh litter. There's no mixing required—the activated carbon works from the surface to trap odor molecules."
    },
    {
      question: "Is Purrify safe for my cat?",
      answer: "Yes! Purrify uses food-grade coconut shell activated carbon—the same type used in water filtration and medical applications. It's fragrance-free, chemical-free, and completely safe if accidentally ingested."
    },
    {
      question: "Can I upgrade to a larger size later?",
      answer: "Of course! Once you experience the difference, you can upgrade to our Regular (120g) or Family Pack (240g) sizes. Many customers save 30% by subscribing to our Autoship program."
    }
  ],
  standard: [
    {
      question: "How long does the 50g size last?",
      answer: "The 50g Standard Size lasts approximately 4-6 weeks for a single cat household. For homes with 2 cats, expect about 3-4 weeks of effective odor control."
    },
    {
      question: "Is this the right size for me?",
      answer: "The 50g is ideal for single-cat households or those wanting to try a mid-range option. If you have multiple cats, consider our 120g Regular or 240g Family Pack for better value."
    },
    {
      question: "How do I use Purrify?",
      answer: "Simply sprinkle a thin, even layer of Purrify on top of your cat's litter after cleaning or adding fresh litter. There's no mixing required—the activated carbon works from the surface to trap odor molecules."
    },
    {
      question: "Is Purrify safe for my cat?",
      answer: "Yes! Purrify uses food-grade coconut shell activated carbon—the same type used in water filtration and medical applications. It's fragrance-free, chemical-free, and completely safe if accidentally ingested."
    },
    {
      question: "What type of litter does it work with?",
      answer: "Purrify works with all litter types including clay, crystal, natural wood, paper, and both clumping and non-clumping varieties. The activated carbon technology adapts to any litter substrate."
    }
  ],
  family: [
    {
      question: "How long does the Regular Size (120g) last?",
      answer: "The 120g Regular Size provides approximately 2-3 months of odor control for single-cat homes, or 6-8 weeks for multi-cat households (2-3 cats). It's our most popular size for good reason!"
    },
    {
      question: "Is this good for multiple cats?",
      answer: "Yes! The 120g size is specifically designed for multi-cat households. The extra capacity handles the increased ammonia output from multiple cats without losing effectiveness."
    },
    {
      question: "How do I use Purrify?",
      answer: "Simply sprinkle a thin, even layer of Purrify on top of your cat's litter after cleaning or adding fresh litter. There's no mixing required—the activated carbon works from the surface to trap odor molecules."
    },
    {
      question: "Is Purrify safe for kittens?",
      answer: "Yes! Purrify is safe for cats of all ages, including kittens. It's made from food-grade coconut shell activated carbon with no fragrances or chemicals. Even if ingested, it passes through safely."
    },
    {
      question: "How does Subscribe & Save work?",
      answer: "With Autoship, you save 30% on every order and get free shipping. Your Purrify arrives automatically on your schedule—every 1, 2, or 3 months. Cancel or modify anytime with no penalties."
    }
  ],
  jumbo: [
    {
      question: "How long does the Family Pack (240g) last?",
      answer: "The 240g Family Pack provides 4-6 months of odor control for single-cat homes, or 3-4 months for households with 3+ cats. It's our best value for serious cat parents."
    },
    {
      question: "Is this the right choice for my home?",
      answer: "If you have 3 or more cats, multiple litter boxes, or simply want the best value per gram, the Family Pack is your ideal choice. It's also perfect for those who prefer less frequent reordering."
    },
    {
      question: "How do I use Purrify?",
      answer: "Simply sprinkle a thin, even layer of Purrify on top of your cat's litter after cleaning or adding fresh litter. There's no mixing required—the activated carbon works from the surface to trap odor molecules."
    },
    {
      question: "Is Purrify safe for all my cats?",
      answer: "Absolutely! Purrify is safe for cats of all ages and breeds. It's made from food-grade coconut shell activated carbon with no fragrances, dyes, or chemicals. Even if ingested, it passes through harmlessly."
    },
    {
      question: "Can I split this between multiple litter boxes?",
      answer: "Yes! Many customers with multiple litter boxes use the Family Pack to maintain odor control across all boxes. Just sprinkle a thin layer on each—a little goes a long way."
    }
  ]
};

export function ProductFAQ({
  productType,
  productName,
  includeStructuredData = true
}: ProductFAQProps) {
  const faqs = PRODUCT_FAQS[productType] || PRODUCT_FAQS.family;

  // Generate structured data for product-specific FAQ
  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      }
    }))
  };

  return (
    <>
      {includeStructuredData && (
        <Script
          id={`product-faq-structured-data-${productType}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqStructuredData)
          }}
        />
      )}

      <div className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-3xl p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-electric-indigo/10 dark:bg-electric-indigo/20 rounded-xl flex items-center justify-center">
            <HelpCircle className="w-5 h-5 text-electric-indigo" />
          </div>
          <h3 className="font-heading text-xl font-bold text-gray-900 dark:text-white">
            Common Questions{productName ? ` about ${productName}` : ''}
          </h3>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={`product-faq-${index}`}
              value={`item-${index}`}
              className="border-b border-gray-200 dark:border-gray-700 last:border-0"
            >
              <AccordionTrigger className="text-left font-semibold text-base text-gray-900 dark:text-white hover:text-electric-indigo dark:hover:text-electric-indigo transition-colors py-4">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </>
  );
}

export default ProductFAQ;
