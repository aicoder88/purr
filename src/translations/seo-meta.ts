/**
 * SEO Meta Content
 * Optimized meta titles and descriptions for all major pages
 *
 * Guidelines:
 * - Titles: 50-60 characters (front-load keywords)
 * - Descriptions: 140-155 characters (include benefits, CTAs, numbers)
 * - All content optimized for CTR and conversions
 */

import { LocaleCode } from '../lib/seo/types';
import { SITE_URL } from '@/lib/constants';

export interface PageMeta {
  title: string;
  description: string;
  targetKeyword?: string;
  schema?: Record<string, unknown>;
  lastUpdated?: string;
  datePublished?: string;
}

export interface SEOMetaContent {
  // Core pages
  homepage: PageMeta;

  // Product pages
  products: {
    trial: PageMeta;
    standard: PageMeta;
    family: PageMeta;
  };

  // Learn pages
  learn: {
    howItWorks: PageMeta;
    activatedCarbonBenefits: PageMeta;
    activatedCarbonVsBakingSoda: PageMeta;
    usingDeodorizersWithKittens: PageMeta;
    faq: PageMeta;
    safety: PageMeta;
    ammoniaHealthRisks: PageMeta;
    // Solutions sub-pages
    solutions: {
      ammoniaSmellCatLitter: PageMeta;
      howToNeutralizeAmmonia: PageMeta;
      litterBoxSmellElimination: PageMeta;
      multipleCatsOdorControl: PageMeta;
    };
  };

  // Blog posts (top 10 by impressions from GSC data)
  blog: {
    mostPowerfulOdorAbsorber: PageMeta;
    activatedCarbonVsBakingSoda: PageMeta;
    bestLitterOdorRemoverSmallApartments: PageMeta;
    catLitterSmellWorseSummer: PageMeta;
    activatedCarbonCatLitter: PageMeta;
    ecoFriendlyCatLitter: PageMeta;
    wholesaleCatLitter: PageMeta;
    catLitterOdorControl: PageMeta;
    smallApartmentCatCare: PageMeta;
    naturalCatLitterAdditive: PageMeta;
    triedEverythingCatLitterSmell: PageMeta;
    activatedCarbonVsZeolite: PageMeta;
  };
}

// English SEO Meta
export const seoMetaEn: SEOMetaContent = {
  homepage: {
    title: 'Purrify | Activated Carbon Cat Litter Deodorizer — Try Free',
    description: 'Activated carbon eliminates 99% of cat litter ammonia in 30 seconds — here\'s the science behind it. Compare to baking soda. Try it risk-free today.',
    targetKeyword: 'cat litter smell',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          name: 'Purrify',
          url: SITE_URL,
          logo: `${SITE_URL}/images/purrify-logo.png`,
          sameAs: ['https://facebook.com/purrify', 'https://instagram.com/purrify']
        },
        {
          '@type': 'WebSite',
          name: 'Purrify',
          url: SITE_URL
        }
      ]
    },
    lastUpdated: '2026-02-13'
  },

  products: {
    trial: {
      title: 'Free Cat Litter Deodorizer Trial | Science-Backed | Purrify',
      description: 'Test the power of activated carbon for yourself. See how it neutralizes ammonia on contact. Just $4.76 shipping. Risk-free trial. Claim yours now!',
      targetKeyword: 'cat litter deodorizer',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: 'Purrify Activated Carbon Cat Litter Additive - Free Trial',
        description: 'Free trial of activated carbon cat litter additive. Eliminates 99% of ammonia odor in 60 seconds. Just pay shipping.',
        brand: { '@type': 'Brand', name: 'Purrify' },
        offers: {
          '@type': 'Offer',
          price: '4.76',
          priceCurrency: 'CAD',
          availability: 'https://schema.org/InStock'
        }
      },
      lastUpdated: '2026-02-13'
    },
    standard: {
      title: 'Best Cat Litter Odor Eliminator - 50g Standard | Purrify',
      description: 'Keep your home smelling like home again. Activated carbon stops litter box smell without perfumes or cover-ups. 99% effective. Shop now!',
      targetKeyword: 'cat litter odor eliminator',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: 'Purrify Activated Carbon Cat Litter Additive - 50g Standard',
        description: '50g standard size activated carbon cat litter additive. Stops litter box smell for 30 days, 99% effective.',
        brand: { '@type': 'Brand', name: 'Purrify' },
        offers: {
          '@type': 'Offer',
          price: '19.99',
          priceCurrency: 'CAD',
          availability: 'https://schema.org/InStock'
        }
      },
      lastUpdated: '2026-02-13'
    },
    family: {
      title: 'Multi Cat Litter Deodorizer - 240g Family | Purrify',
      description: 'The solution for multi-cat households. Activated carbon removes the toughest ammonia smells instantly. Best value for serious odor control.',
      targetKeyword: 'multi cat litter deodorizer',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: 'Purrify Activated Carbon Cat Litter Additive - 240g Family',
        description: '240g family size activated carbon cat litter additive for 3+ cats. Best value, removes ammonia smell instantly.',
        brand: { '@type': 'Brand', name: 'Purrify' },
        offers: {
          '@type': 'Offer',
          price: '39.99',
          priceCurrency: 'CAD',
          availability: 'https://schema.org/InStock'
        }
      },
      lastUpdated: '2026-02-13'
    }
  },

  learn: {
    howItWorks: {
      title: 'How Activated Carbon Eliminates Cat Litter Odor Fast',
      description: 'Water-filter grade activated carbon neutralizes ammonia on a molecular level. Learn the science behind 99% odor elimination without chemicals.',
      targetKeyword: 'activated carbon cat litter',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'How Activated Carbon Eliminates Cat Litter Odor Fast',
        description: 'Discover how water-filter grade activated carbon neutralizes ammonia in 30 seconds. See the science behind 99% odor elimination.',
        author: {
          '@type': 'Person',
          name: 'Dr. Sarah Chen',
          jobTitle: 'Veterinary Consultant',
          url: `${SITE_URL}/about/our-story/`
        },
        publisher: { '@type': 'Organization', name: 'Purrify' }
      },
      lastUpdated: '2026-02-13'
    },
    activatedCarbonBenefits: {
      title: 'Activated Carbon Cat Litter Benefits [2026 Guide]',
      description: 'Explore the 7+ proven benefits of activated carbon for your cat\'s litter box. 100% natural, non-toxic, and highly effective odor control.',
      targetKeyword: 'activated carbon benefits',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Activated Carbon Cat Litter Benefits [2026 Guide]',
        description: '7+ proven benefits of activated carbon for cat litter odor control. Eliminates 99% of ammonia, lasts 30 days, 100% natural.',
        author: {
          '@type': 'Person',
          name: 'Dr. Sarah Chen',
          jobTitle: 'Veterinary Consultant',
          url: `${SITE_URL}/about/our-story/`
        },
        publisher: { '@type': 'Organization', name: 'Purrify' }
      },
      lastUpdated: '2026-02-13'
    },
    activatedCarbonVsBakingSoda: {
      title: 'Baking Soda vs Activated Carbon: A Science-Backed Comparison',
      description: 'Why activated carbon is 2x more effective than baking soda at neutralizing ammonia. Compare evidence, safety, and long-term cost for cat parents.',
      targetKeyword: 'baking soda vs activated charcoal',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Baking Soda vs Activated Carbon: Which Works Better?',
        description: 'Baking soda masks odor, activated carbon eliminates it. See the science behind why 10,000+ cat owners switched.',
        author: {
          '@type': 'Person',
          name: 'Dr. Sarah Chen',
          jobTitle: 'Veterinary Consultant',
          url: `${SITE_URL}/about/our-story/`
        },
        publisher: { '@type': 'Organization', name: 'Purrify' }
      },
      lastUpdated: '2026-02-13'
    },
    usingDeodorizersWithKittens: {
      title: 'Is Cat Litter Deodorizer Safe for Kittens? [Expert Guide]',
      description: 'Respiratory safety for kittens is critical. Learn which ingredients are safe, what to avoid, and the research behind carbon-based additives.',
      targetKeyword: 'cat litter deodorizer safe for kittens',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Is Cat Litter Deodorizer Safe for Kittens? [Expert Guide]',
        description: 'Not all deodorizers are kitten-safe. Learn which ingredients to avoid, what\'s safe, and how to protect your kitten\'s respiratory system.',
        author: {
          '@type': 'Person',
          name: 'Dr. Sarah Chen',
          jobTitle: 'Veterinary Consultant',
          url: `${SITE_URL}/about/our-story/`
        },
        publisher: { '@type': 'Organization', name: 'Purrify' }
      },
      lastUpdated: '2026-02-13'
    },
    faq: {
      title: 'Cat Litter Odor Control FAQ - Evidence-Based Answers',
      description: 'Get clear answers about safety, usage, and effectiveness of activated carbon. 10,000+ cat parents trust this science-first approach. Read more.',
      targetKeyword: 'cat litter odor control',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Cat Litter Odor Control FAQ - Your Questions Answered',
        description: 'Get answers about activated carbon cat litter additive. Safety, usage, effectiveness & more. 10,000+ customers trust Purrify.',
        author: {
          '@type': 'Person',
          name: 'Dr. Sarah Chen',
          jobTitle: 'Veterinary Consultant',
          url: `${SITE_URL}/about/our-story/`
        },
        publisher: { '@type': 'Organization', name: 'Purrify' }
      },
      lastUpdated: '2026-02-13'
    },
    safety: {
      title: 'Is Activated Carbon Safe for Cats? [Science Review]',
      description: 'Non-toxic, food-grade coconut shell carbon is safe for pets. See why active carbon is the choice for water filters and respiratory safety.',
      targetKeyword: 'activated carbon safe for cats',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Is Activated Carbon Safe for Cats? [Science Review]',
        description: '100% food-grade coconut shell activated carbon. Non-toxic, dust-free, pet-friendly. Used in water filters & air purifiers. Safe for cats & kittens.',
        author: {
          '@type': 'Person',
          name: 'Dr. Sarah Chen',
          jobTitle: 'Veterinary Consultant',
          url: `${SITE_URL}/about/our-story/`
        },
        publisher: { '@type': 'Organization', name: 'Purrify' }
      },
      lastUpdated: '2026-02-13'
    },
    ammoniaHealthRisks: {
      title: 'Cat Litter Ammonia Health Risks: What Owners Must Know',
      description: 'Is ammonia from cat litter dangerous? Learn safe exposure levels, health risks for you and your cat, plus proven solutions to reduce ammonia in your home.',
      targetKeyword: 'cat litter ammonia health risks',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Cat Litter Ammonia Health Risks: What Owners Must Know',
        description: 'Is ammonia from cat litter dangerous? Learn safe exposure levels, health risks for you and your cat, plus proven solutions.',
        author: {
          '@type': 'Person',
          name: 'Dr. Sarah Chen',
          jobTitle: 'Veterinary Consultant',
          url: `${SITE_URL}/about/our-story/`
        },
        publisher: { '@type': 'Organization', name: 'Purrify' }
      },
      lastUpdated: '2026-02-13'
    },
    solutions: {
      ammoniaSmellCatLitter: {
        title: 'Why Cat Litter Smells Like Ammonia & How to Stop It',
        description: 'Strong ammonia smell means bacteria are winning. Here\'s the science of why it happens and the 3-step solution that works in 24 hours.',
        targetKeyword: 'cat litter smells like ammonia',
        schema: {
          '@context': 'https://schema.org',
          '@type': 'HowTo',
          name: 'Why Cat Litter Smells Like Ammonia & How to Stop It',
          description: 'Strong ammonia smell means bacteria are winning. Here\'s the science of why it happens and the 3-step solution that works in 24 hours.',
          totalTime: 'PT24H'
        },
        lastUpdated: '2026-02-13'
      },
      howToNeutralizeAmmonia: {
        title: 'How to Stop Ammonia Smell in Cat Litter [3 Steps]',
        description: 'Eliminate that eye-watering ammonia odor from your litter box. Activated carbon neutralizes ammonia at the molecular level. See the science + solution.',
        targetKeyword: 'how to stop ammonia smell in cat litter',
        schema: {
          '@context': 'https://schema.org',
          '@type': 'HowTo',
          name: 'How to Stop Ammonia Smell in Cat Litter [3 Steps]',
          description: 'Eliminate that eye-watering ammonia odor from your litter box. Activated carbon neutralizes ammonia at the molecular level.',
          totalTime: 'PT24H'
        },
        lastUpdated: '2026-02-13'
      },
      litterBoxSmellElimination: {
        title: 'Litter Box Smell Elimination: Complete Guide 2026',
        description: 'End litter box odor permanently with proven methods. From daily maintenance to activated carbon technology. 10,000+ cat owners use this system.',
        targetKeyword: 'litter box smell elimination',
        schema: {
          '@context': 'https://schema.org',
          '@type': 'HowTo',
          name: 'Litter Box Smell Elimination: Complete Guide 2026',
          description: 'End litter box odor permanently with proven methods. From daily maintenance to activated carbon technology.',
          totalTime: 'PT24H'
        },
        lastUpdated: '2026-02-13'
      },
      multipleCatsOdorControl: {
        title: 'Multi Cat Odor Control: Keep Your Home Fresh | Purrify',
        description: '2+ cats creating unbearable litter box smell? Learn the odor control system that works for multi-cat households. Activated carbon + maintenance tips.',
        targetKeyword: 'multiple cats odor control',
        schema: {
          '@context': 'https://schema.org',
          '@type': 'HowTo',
          name: 'Multi Cat Odor Control: Keep Your Home Fresh',
          description: '2+ cats creating unbearable litter box smell? Learn the odor control system that works for multi-cat households.',
          totalTime: 'PT60D'
        },
        lastUpdated: '2026-02-13'
      }
    }
  },

  blog: {
    mostPowerfulOdorAbsorber: {
      title: 'I Tested 12 Cat Litter Odor Absorbers - What Actually Works',
      description: 'After 90 days testing every odor absorber from baking soda to zeolite, one clear winner emerged. See the results with photos.',
      targetKeyword: 'most powerful odor absorber',
      datePublished: '2025-07-26',
      lastUpdated: '2026-02-13',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: 'I Tested 12 Cat Litter Odor Absorbers - What Actually Works',
        description: 'After 90 days testing every odor absorber from baking soda to zeolite, one clear winner emerged.',
        datePublished: '2025-07-26',
        dateModified: '2026-02-13',
        author: {
          '@type': 'Person',
          name: 'Dr. Sarah Chen',
          jobTitle: 'Veterinary Consultant',
          url: `${SITE_URL}/about/our-story/`
        },
        publisher: {
          '@type': 'Organization',
          name: 'Purrify',
          logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/purrify-logo.png` }
        }
      }
    },
    activatedCarbonVsBakingSoda: {
      title: 'Activated Carbon vs Baking Soda: Which Kills Odor?',
      description: '7-day test results: Activated carbon eliminated 99% of odor vs 47% for baking soda. See the shocking difference in our lab test. Get free trial!',
      targetKeyword: 'activated carbon vs baking soda',
      datePublished: '2025-10-06',
      lastUpdated: '2026-02-13',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: 'Activated Carbon vs Baking Soda: Which Kills Odor?',
        description: '7-day test results: Activated carbon eliminated 99% of odor vs 47% for baking soda.',
        datePublished: '2025-10-06',
        dateModified: '2026-02-13',
        author: {
          '@type': 'Person',
          name: 'Dr. Sarah Chen',
          jobTitle: 'Veterinary Consultant',
          url: `${SITE_URL}/about/our-story/`
        },
        publisher: {
          '@type': 'Organization',
          name: 'Purrify',
          logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/purrify-logo.png` }
        }
      }
    },
    bestLitterOdorRemoverSmallApartments: {
      title: 'Best Litter Odor Remover for Small Apartments [500 sq ft]',
      description: 'Tested in 500 sq ft apartment: activated carbon eliminates smell in 30 seconds, lasts 30 days. Perfect for condos & small spaces. Ships free!',
      targetKeyword: 'best litter for apartments with no ventilation',
      datePublished: '2025-10-14',
      lastUpdated: '2026-02-13',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: 'Best Litter Odor Remover for Small Apartments [500 sq ft]',
        description: 'Tested in 500 sq ft apartment: activated carbon eliminates smell in 30 seconds.',
        datePublished: '2025-10-14',
        dateModified: '2026-02-13',
        author: {
          '@type': 'Person',
          name: 'Dr. Sarah Chen',
          jobTitle: 'Veterinary Consultant',
          url: `${SITE_URL}/about/our-story/`
        },
        publisher: {
          '@type': 'Organization',
          name: 'Purrify',
          logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/purrify-logo.png` }
        }
      }
    },
    catLitterSmellWorseSummer: {
      title: 'Why Cat Litter Smells Worse in Summer [+ Fix 2026]',
      description: 'Heat increases ammonia evaporation by 3x. Activated carbon neutralizes summer odor instantly. Stop the seasonal smell spike. Get your free trial!',
      targetKeyword: 'cat litter smell worse summer',
      datePublished: '2025-07-06',
      lastUpdated: '2026-02-13',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: 'Why Cat Litter Smells Worse in Summer [+ Fix 2026]',
        description: 'Heat increases ammonia evaporation by 3x. Activated carbon neutralizes summer odor instantly.',
        datePublished: '2025-07-06',
        dateModified: '2026-02-13',
        author: {
          '@type': 'Person',
          name: 'Dr. Sarah Chen',
          jobTitle: 'Veterinary Consultant',
          url: `${SITE_URL}/about/our-story/`
        },
        publisher: {
          '@type': 'Organization',
          name: 'Purrify',
          logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/purrify-logo.png` }
        }
      }
    },
    activatedCarbonCatLitter: {
      title: 'Activated Carbon Cat Litter: Complete Guide 2026',
      description: 'Everything about activated carbon for cat litter odor. How it works, benefits, safety, usage tips. 99% effective, 100% natural. Try it free today!',
      targetKeyword: 'activated carbon cat litter',
      datePublished: '2025-07-13',
      lastUpdated: '2026-02-13',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: 'Activated Carbon Cat Litter: Complete Guide 2026',
        description: 'Everything about activated carbon for cat litter odor.',
        datePublished: '2025-07-13',
        dateModified: '2026-02-13',
        author: {
          '@type': 'Person',
          name: 'Dr. Sarah Chen',
          jobTitle: 'Veterinary Consultant',
          url: `${SITE_URL}/about/our-story/`
        },
        publisher: {
          '@type': 'Organization',
          name: 'Purrify',
          logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/purrify-logo.png` }
        }
      }
    },
    ecoFriendlyCatLitter: {
      title: 'Eco-Friendly Cat Litter Guide: Best Sustainable 2026',
      description: 'Compare eco-friendly cat litter options. Coconut shell activated carbon is 100% natural, biodegradable, reusable. Eliminate odor sustainably!',
      targetKeyword: 'eco-friendly cat litter',
      datePublished: '2025-09-22',
      lastUpdated: '2026-02-13',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: 'Eco-Friendly Cat Litter Guide: Best Sustainable 2026',
        description: 'Compare eco-friendly cat litter options.',
        datePublished: '2025-09-22',
        dateModified: '2026-02-13',
        author: {
          '@type': 'Person',
          name: 'Dr. Sarah Chen',
          jobTitle: 'Veterinary Consultant',
          url: `${SITE_URL}/about/our-story/`
        },
        publisher: {
          '@type': 'Organization',
          name: 'Purrify',
          logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/purrify-logo.png` }
        }
      }
    },
    wholesaleCatLitter: {
      title: 'Wholesale Cat Litter Deodorizer: Complete Buyer Guide',
      description: 'Wholesale pricing on activated carbon cat litter additive. Perfect for pet stores, groomers, shelters. Proven 99% odor elimination. Contact us!',
      targetKeyword: 'wholesale cat litter',
      datePublished: '2025-08-16',
      lastUpdated: '2026-02-13',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: 'Wholesale Cat Litter Deodorizer: Complete Buyer Guide',
        description: 'Wholesale pricing on activated carbon cat litter additive.',
        datePublished: '2025-08-16',
        dateModified: '2026-02-13',
        author: {
          '@type': 'Person',
          name: 'Dr. Sarah Chen',
          jobTitle: 'Veterinary Consultant',
          url: `${SITE_URL}/about/our-story/`
        },
        publisher: {
          '@type': 'Organization',
          name: 'Purrify',
          logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/purrify-logo.png` }
        }
      }
    },
    catLitterOdorControl: {
      title: 'Ultimate Cat Litter Odor Control Guide [2026]',
      description: 'Master cat litter odor control with activated carbon. Eliminate 99% of ammonia smell, maintain freshness 30+ days. Free trial - just pay shipping!',
      targetKeyword: 'cat litter odor control',
      datePublished: '2025-06-22',
      lastUpdated: '2026-02-13',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: 'Ultimate Cat Litter Odor Control Guide [2026]',
        description: 'Master cat litter odor control with activated carbon.',
        datePublished: '2025-06-22',
        dateModified: '2026-02-13',
        author: {
          '@type': 'Person',
          name: 'Dr. Sarah Chen',
          jobTitle: 'Veterinary Consultant',
          url: `${SITE_URL}/about/our-story/`
        },
        publisher: {
          '@type': 'Organization',
          name: 'Purrify',
          logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/purrify-logo.png` }
        }
      }
    },
    smallApartmentCatCare: {
      title: 'Small Apartment Cat Care: Complete Guide 2026',
      description: 'Essential tips for cats in small apartments. Odor control, space-saving litter boxes, ventilation. Activated carbon eliminates smell instantly!',
      targetKeyword: 'small apartment cat care',
      datePublished: '2025-07-04',
      lastUpdated: '2026-02-13',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: 'Small Apartment Cat Care: Complete Guide 2026',
        description: 'Essential tips for cats in small apartments.',
        datePublished: '2025-07-04',
        dateModified: '2026-02-13',
        author: {
          '@type': 'Person',
          name: 'Dr. Sarah Chen',
          jobTitle: 'Veterinary Consultant',
          url: `${SITE_URL}/about/our-story/`
        },
        publisher: {
          '@type': 'Organization',
          name: 'Purrify',
          logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/purrify-logo.png` }
        }
      }
    },
    naturalCatLitterAdditive: {
      title: 'Natural Cat Litter Additive: 100% Coconut Carbon',
      description: 'Stop litter box smell with 100% natural coconut shell activated carbon. No chemicals, no perfumes, no toxins. 99% effective odor elimination!',
      targetKeyword: 'natural cat litter additive',
      datePublished: '2025-09-01',
      lastUpdated: '2026-02-13',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: 'Natural Cat Litter Additive: 100% Coconut Carbon',
        description: 'Stop litter box smell with 100% natural coconut shell activated carbon.',
        datePublished: '2025-09-01',
        dateModified: '2026-02-13',
        author: {
          '@type': 'Person',
          name: 'Dr. Sarah Chen',
          jobTitle: 'Veterinary Consultant',
          url: `${SITE_URL}/about/our-story/`
        },
        publisher: {
          '@type': 'Organization',
          name: 'Purrify',
          logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/purrify-logo.png` }
        }
      }
    },
    triedEverythingCatLitterSmell: {
      title: "Tried Everything for Cat Litter Smell? Here's What Worked",
      description: "Baking soda, charcoal bags, air fresheners - nothing worked until I found this. Real solutions from someone who tried them all.",
      targetKeyword: 'tried everything cat litter smell',
      datePublished: '2025-06-11',
      lastUpdated: '2026-02-13',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: "Tried Everything for Cat Litter Smell? Here's What Worked",
        description: "Baking soda, charcoal bags, air fresheners - nothing worked until I found this.",
        datePublished: '2025-06-11',
        dateModified: '2026-02-13',
        author: {
          '@type': 'Person',
          name: 'Dr. Sarah Chen',
          jobTitle: 'Veterinary Consultant',
          url: `${SITE_URL}/about/our-story/`
        },
        publisher: {
          '@type': 'Organization',
          name: 'Purrify',
          logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/purrify-logo.png` }
        }
      }
    },
    activatedCarbonVsZeolite: {
      title: 'Activated Carbon vs Zeolite for Cat Litter: Which Wins?',
      description: 'Scientific comparison of activated carbon and zeolite for cat litter odor control. See test results, pros/cons, and which absorbs ammonia better.',
      targetKeyword: 'activated carbon vs zeolite cat litter',
      datePublished: '2025-10-13',
      lastUpdated: '2026-02-13',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: 'Activated Carbon vs Zeolite for Cat Litter: Which Wins?',
        description: 'Scientific comparison of activated carbon and zeolite for cat litter odor control.',
        datePublished: '2025-10-13',
        dateModified: '2026-02-13',
        author: {
          '@type': 'Person',
          name: 'Dr. Sarah Chen',
          jobTitle: 'Veterinary Consultant',
          url: `${SITE_URL}/about/our-story/`
        },
        publisher: {
          '@type': 'Organization',
          name: 'Purrify',
          logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/purrify-logo.png` }
        }
      }
    }
  }
};

// French SEO Meta
export const seoMetaFr: SEOMetaContent = {
  homepage: {
    title: 'Désodorisant Litière Chat | Élimine 99% Odeurs - Purrify',
    description: 'Éliminez 99% des odeurs de litière en 30 secondes avec Purrify. Charbon actif de qualité NASA, 100% naturel. Essai gratuit disponible! Achetez maintenant!',
    targetKeyword: 'désodorisant litière chat',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          name: 'Purrify',
          url: `${SITE_URL}/fr`,
          logo: `${SITE_URL}/images/purrify-logo.png`
        },
        {
          '@type': 'WebSite',
          name: 'Purrify France',
          url: `${SITE_URL}/fr`
        }
      ]
    },
    lastUpdated: '2026-02-13'
  },

  products: {
    trial: {
      title: 'Essai Désodorisant Litière | GRATUIT 12g - Purrify',
      description: 'Essai GRATUIT du désodorisant litière Purrify. Charbon actif élimine 99% odeurs d\'ammoniaque. Format découverte 12g. Juste 4,76$ livraison! Achetez!',
      targetKeyword: 'essai désodorisant litière',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: 'Purrify Essai Gratuit 12g',
        description: 'Essai gratuit du désodorisant litière au charbon actif. Élimine 99% des odeurs d\'ammoniaque.',
        brand: { '@type': 'Brand', name: 'Purrify' },
        offers: {
          '@type': 'Offer',
          price: '4.76',
          priceCurrency: 'CAD',
          availability: 'https://schema.org/InStock'
        }
      },
      lastUpdated: '2026-02-13'
    },
    standard: {
      title: 'Désodorisant Litière Standard 50g | Naturel - Purrify',
      description: 'Désodorisant litière standard 50g au charbon actif. Élimine les odeurs 30 jours, 100% naturel. Format régulier idéal 1 chat. Achetez maintenant!',
      targetKeyword: 'désodorisant litière standard',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: 'Purrify Désodorisant Litière Standard 50g',
        description: 'Désodorisant litière standard 50g au charbon actif. Élimine les odeurs pendant 30 jours.',
        brand: { '@type': 'Brand', name: 'Purrify' },
        offers: {
          '@type': 'Offer',
          price: '19.99',
          priceCurrency: 'CAD',
          availability: 'https://schema.org/InStock'
        }
      },
      lastUpdated: '2026-02-13'
    },
    family: {
      title: 'Désodorisant Multi-Chats 120g | Pack Famille - Purrify',
      description: 'Désodorisant multi-chats 120g pour 2-3 chats. Charbon actif élimine odeurs 60+ jours. Pack famille économique. Livraison gratuite! Achetez!',
      targetKeyword: 'désodorisant multi-chats',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: 'Purrify Désodorisant Multi-Chats 120g',
        description: 'Désodorisant multi-chats 120g au charbon actif. Pour 2-3 chats, élimine les odeurs pendant 60+ jours.',
        brand: { '@type': 'Brand', name: 'Purrify' },
        offers: {
          '@type': 'Offer',
          price: '34.99',
          priceCurrency: 'CAD',
          availability: 'https://schema.org/InStock'
        }
      },
      lastUpdated: '2026-02-13'
    }
  },

  learn: {
    howItWorks: {
      title: 'Charbon Actif Litière Chat | Comment Ça Marche - Purrify',
      description: 'Charbon actif litière chat: découvrez la science derrière 99% d\'élimination des odeurs en 30 secondes. NASA-grade, 100% naturel. En savoir plus!',
      targetKeyword: 'charbon actif litière chat',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Charbon Actif Litière Chat: Comment Ça Marche',
        description: 'Découvrez la science derrière 99% d\'élimination des odeurs en 30 secondes avec le charbon actif NASA-grade.',
        author: { '@type': 'Organization', name: 'Purrify' }
      },
      lastUpdated: '2026-02-13'
    },
    activatedCarbonBenefits: {
      title: 'Avantages Charbon Actif | 7 Bienfaits Prouvés - Purrify',
      description: 'Avantages charbon actif litière: élimine 99% ammoniaque, dure 30 jours, 100% naturel. 7+ bénéfices scientifiques. Découvrez plus maintenant!',
      targetKeyword: 'avantages charbon actif',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Avantages du Charbon Actif: 7 Bienfaits Prouvés',
        description: 'Découvrez les 7+ bénéfices scientifiques du charbon actif pour litière: élimine 99% ammoniaque, dure 30 jours.',
        author: { '@type': 'Organization', name: 'Purrify' }
      },
      lastUpdated: '2026-02-13'
    },
    activatedCarbonVsBakingSoda: {
      title: 'Bicarbonate vs Charbon Actif Litière | Lequel Choisir?',
      description: 'Bicarbonate vs charbon actif: le bicarbonate masque, le charbon élimine 99% des odeurs. Test comparatif 7 jours. Essai gratuit disponible!',
      targetKeyword: 'bicarbonate vs charbon actif',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Bicarbonate vs Charbon Actif Litière: Lequel Choisir?',
        description: 'Comparaison complète: le bicarbonate masque, le charbon élimine 99% des odeurs. Test comparatif de 7 jours.',
        author: { '@type': 'Organization', name: 'Purrify' }
      },
      lastUpdated: '2026-02-13'
    },
    usingDeodorizersWithKittens: {
      title: 'Désodorisant Litière Chatons | Guide Sécurité 2026 - Purrify',
      description: 'Désodorisant litière chatons: charbon actif 100% sûr pour bébés chats. Approuvé vétérinaire, sans danger respiratoire. Achetez maintenant!',
      targetKeyword: 'désodorisant litière chatons',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Désodorisant Litière Chatons: Guide Sécurité 2026',
        description: 'Guide complet sur la sécurité du charbon actif pour chatons. 100% sûr pour bébés chats, approuvé vétérinaire.',
        author: { '@type': 'Organization', name: 'Purrify' }
      },
      lastUpdated: '2026-02-13'
    },
    faq: {
      title: 'Contrôle Odeur Litière | FAQ & Questions - Purrify',
      description: 'Contrôle odeur litière: FAQ complète sur charbon actif Purrify. Sécurité, utilisation, efficacité 99%. 10 000+ clients satisfaits. En savoir plus!',
      targetKeyword: 'contrôle odeur litière',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Contrôle Odeur Litière: FAQ Complète',
        description: 'FAQ complète sur le charbon actif Purrify. Questions sur sécurité, utilisation et efficacité à 99%.',
        author: { '@type': 'Organization', name: 'Purrify' }
      },
      lastUpdated: '2026-02-13'
    },
    safety: {
      title: 'Charbon Actif Sans Danger Chats? | Sécurité Vétérinaire',
      description: 'Charbon actif sans danger chats: 100% alimentaire, non-toxique, sans poussière. Approuvé vétérinaire, utilisé filtres eau. Achetez en confiance!',
      targetKeyword: 'charbon actif sans danger chats',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Le Charbon Actif Est-Il Sans Danger pour les Chats?',
        description: 'Analyse complète de la sécurité du charbon actif: 100% alimentaire, non-toxique, sans poussière. Approuvé vétérinaire.',
        author: { '@type': 'Organization', name: 'Purrify' }
      },
      lastUpdated: '2026-02-13'
    },
    ammoniaHealthRisks: {
      title: 'Risques Santé Ammoniaque Litière | Guide 2026 - Purrify',
      description: 'Risques santé ammoniaque litière chat: niveaux dangereux, symptômes, solutions. Protégez votre famille et chat. Découvrez Purrify maintenant!',
      targetKeyword: 'risques santé ammoniaque litière chat',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Risques Santé Ammoniaque Litière: Guide 2026',
        description: 'Guide complet sur les risques santé de l\'ammoniaque dans la litière: niveaux dangereux, symptômes et solutions.',
        author: { '@type': 'Organization', name: 'Purrify' }
      },
      lastUpdated: '2026-02-13'
    },
    solutions: {
      ammoniaSmellCatLitter: {
        title: 'Litière Sent Ammoniaque? | Solution Naturelle 24h - Purrify',
        description: 'Litière sent ammoniaque? Solution charbon actif Purrify élimine odeurs en 24h. 99% d\'efficacité prouvée. Essayez gratuitement maintenant!',
        targetKeyword: 'litière sent ammoniaque',
        schema: {
          '@context': 'https://schema.org',
          '@type': 'HowTo',
          name: 'Solution Litière Qui Sent l\'Ammoniaque',
          description: 'Solution naturelle au charbon actif pour éliminer les odeurs d\'ammoniaque en 24h. 99% d\'efficacité prouvée.',
          totalTime: 'PT24H'
        },
        lastUpdated: '2026-02-13'
      },
      howToNeutralizeAmmonia: {
        title: 'Éliminer Odeur Ammoniaque Litière | 3 Étapes - Purrify',
        description: 'Éliminer odeur ammoniaque litière: charbon actif neutralise molécules niveau moléculaire. Résultats en 24h, 99% efficace. Achetez maintenant!',
        targetKeyword: 'éliminer odeur ammoniaque litière',
        schema: {
          '@context': 'https://schema.org',
          '@type': 'HowTo',
          name: 'Éliminer l\'Odeur d\'Ammoniaque de la Litière',
          description: 'Guide en 3 étapes pour neutraliser l\'ammoniaque au niveau moléculaire avec le charbon actif.',
          totalTime: 'PT24H'
        },
        lastUpdated: '2026-02-13'
      },
      litterBoxSmellElimination: {
        title: 'Élimination Odeur Bac Litière | Guide Complet 2026 - Purrify',
        description: 'Élimination odeur bac litière: méthodes prouvées 99% efficaces. Charbon actif NASA-grade. Fini les odeurs! Essai gratuit disponible!',
        targetKeyword: 'élimination odeur bac litière',
        schema: {
          '@context': 'https://schema.org',
          '@type': 'HowTo',
          name: 'Élimination Odeur Bac à Litière: Guide Complet',
          description: 'Méthodes prouvées à 99% d\'efficacité pour éliminer les odeurs de bac à litière avec charbon actif NASA-grade.',
          totalTime: 'PT24H'
        },
        lastUpdated: '2026-02-13'
      },
      multipleCatsOdorControl: {
        title: 'Contrôle Odeurs Multi-Chats | Pack 120g - Purrify',
        description: 'Contrôle odeurs multi-chats pour 2+ chats. Pack famille 120g, fraîcheur 60+ jours. Solution puissante maison fraîche. Achetez maintenant!',
        targetKeyword: 'contrôle odeurs multi-chats',
        schema: {
          '@context': 'https://schema.org',
          '@type': 'HowTo',
          name: 'Contrôle Odeurs Multi-Chats avec Pack 120g',
          description: 'Solution pour contrôler les odeurs avec 2+ chats. Pack famille 120g pour 60+ jours de fraîcheur.',
          totalTime: 'PT60D'
        },
        lastUpdated: '2026-02-13'
      }
    }
  },

  blog: {
    mostPowerfulOdorAbsorber: {
      title: 'Absorbeur Odeur Litière Le Plus Puissant [Testé 12]',
      description: 'Nous avons testé 12 éliminateurs. 1 seul a éliminé l\'odeur en 30 secondes. Voir quel charbon actif bat bicarbonate de 52%. Essai gratuit!',
      targetKeyword: 'absorbeur odeur le plus puissant',
      datePublished: '2025-09-10',
      lastUpdated: '2026-02-13',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: 'Absorbeur Odeur Litière Le Plus Puissant [Testé 12]',
        description: 'Test de 12 éliminateurs d\'odeurs. Un seul a éliminé l\'odeur en 30 secondes.',
        datePublished: '2025-09-10',
        dateModified: '2026-02-13',
        author: {
          '@type': 'Person',
          name: 'Dr. Sarah Chen',
          jobTitle: 'Veterinary Consultant',
          url: `${SITE_URL}/about/our-story/`
        },
        publisher: {
          '@type': 'Organization',
          name: 'Purrify',
          logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/purrify-logo.png` }
        }
      }
    },
    activatedCarbonVsBakingSoda: {
      title: 'Charbon Actif vs Bicarbonate: Lequel Tue Odeur?',
      description: 'Test 7 jours: charbon actif élimine 99% odeur vs 47% bicarbonate. Voir la différence choquante dans notre test labo. Essai gratuit!',
      targetKeyword: 'charbon actif vs bicarbonate',
      datePublished: '2025-08-03',
      lastUpdated: '2026-02-13',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: 'Charbon Actif vs Bicarbonate: Lequel Tue l\'Odeur?',
        description: 'Test de 7 jours en laboratoire: charbon actif élimine 99% odeur vs 47% bicarbonate.',
        datePublished: '2025-08-03',
        dateModified: '2026-02-13',
        author: {
          '@type': 'Person',
          name: 'Dr. Sarah Chen',
          jobTitle: 'Veterinary Consultant',
          url: `${SITE_URL}/about/our-story/`
        },
        publisher: {
          '@type': 'Organization',
          name: 'Purrify',
          logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/purrify-logo.png` }
        }
      }
    },
    bestLitterOdorRemoverSmallApartments: {
      title: 'Meilleur Anti-Odeur Litière Petits Apparts [500 pi²]',
      description: 'Testé dans appart 500 pi²: charbon actif élimine odeur en 30 secondes, dure 30 jours. Parfait condos & petits espaces. Livraison gratuite!',
      targetKeyword: 'anti-odeur litière petits appartements',
      datePublished: '2025-06-20',
      lastUpdated: '2026-02-13',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: 'Meilleur Anti-Odeur Litière pour Petits Appartements [500 pi²]',
        description: 'Testé dans un appartement de 500 pi²: le charbon actif élimine les odeurs en 30 secondes.',
        datePublished: '2025-06-20',
        dateModified: '2026-02-13',
        author: {
          '@type': 'Person',
          name: 'Dr. Sarah Chen',
          jobTitle: 'Veterinary Consultant',
          url: `${SITE_URL}/about/our-story/`
        },
        publisher: {
          '@type': 'Organization',
          name: 'Purrify',
          logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/purrify-logo.png` }
        }
      }
    },
    catLitterSmellWorseSummer: {
      title: 'Pourquoi Litière Sent Plus Fort Été [+ Solution 2026]',
      description: 'Chaleur augmente évaporation ammoniaque 3x. Charbon actif neutralise odeur été instantanément. Stop à la puanteur saisonnière. Essai gratuit!',
      targetKeyword: 'litière sent plus fort été',
      datePublished: '2025-06-29',
      lastUpdated: '2026-02-13',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: 'Pourquoi la Litière Sent Plus Fort en Été [+ Solution 2026]',
        description: 'La chaleur augmente l\'évaporation de l\'ammoniaque 3x. Solution pour neutraliser instantanément.',
        datePublished: '2025-06-29',
        dateModified: '2026-02-13',
        author: {
          '@type': 'Person',
          name: 'Dr. Sarah Chen',
          jobTitle: 'Veterinary Consultant',
          url: `${SITE_URL}/about/our-story/`
        },
        publisher: {
          '@type': 'Organization',
          name: 'Purrify',
          logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/purrify-logo.png` }
        }
      }
    },
    activatedCarbonCatLitter: {
      title: 'Charbon Actif Litière Chat: Guide Complet 2026',
      description: 'Tout sur charbon actif pour odeur litière. Fonctionnement, avantages, sécurité, conseils. Efficace à 99%, 100% naturel. Essayez gratuitement!',
      targetKeyword: 'charbon actif litière chat',
      datePublished: '2025-08-02',
      lastUpdated: '2026-02-13',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: 'Charbon Actif Litière Chat: Guide Complet 2026',
        description: 'Tout sur le charbon actif pour odeur de litière: fonctionnement, avantages, sécurité et conseils.',
        datePublished: '2025-08-02',
        dateModified: '2026-02-13',
        author: {
          '@type': 'Person',
          name: 'Dr. Sarah Chen',
          jobTitle: 'Veterinary Consultant',
          url: `${SITE_URL}/about/our-story/`
        },
        publisher: {
          '@type': 'Organization',
          name: 'Purrify',
          logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/purrify-logo.png` }
        }
      }
    },
    ecoFriendlyCatLitter: {
      title: 'Litière Chat Écologique: Meilleure Durable 2026',
      description: 'Comparez options litière écologique. Charbon actif coco 100% naturel, biodégradable, réutilisable. Éliminez odeurs durablement!',
      targetKeyword: 'litière chat écologique',
      datePublished: '2025-05-31',
      lastUpdated: '2026-02-13',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: 'Litière Chat Écologique: La Meilleure Option Durable 2026',
        description: 'Comparaison des options de litière écologique. Charbon actif coco 100% naturel.',
        datePublished: '2025-05-31',
        dateModified: '2026-02-13',
        author: {
          '@type': 'Person',
          name: 'Dr. Sarah Chen',
          jobTitle: 'Veterinary Consultant',
          url: `${SITE_URL}/about/our-story/`
        },
        publisher: {
          '@type': 'Organization',
          name: 'Purrify',
          logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/purrify-logo.png` }
        }
      }
    },
    wholesaleCatLitter: {
      title: 'Désodorisant Litière Gros: Guide Acheteur Complet',
      description: 'Prix de gros sur additif charbon actif litière chat. Parfait animaleries, toiletteurs, refuges. Élimination odeur prouvée 99%. Contactez-nous!',
      targetKeyword: 'litière gros',
      datePublished: '2025-10-03',
      lastUpdated: '2026-02-13',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: 'Désodorisant Litière en Gros: Guide Acheteur Complet',
        description: 'Prix de gros sur additif charbon actif. Parfait pour animaleries, toiletteurs et refuges.',
        datePublished: '2025-10-03',
        dateModified: '2026-02-13',
        author: {
          '@type': 'Person',
          name: 'Dr. Sarah Chen',
          jobTitle: 'Veterinary Consultant',
          url: `${SITE_URL}/about/our-story/`
        },
        publisher: {
          '@type': 'Organization',
          name: 'Purrify',
          logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/purrify-logo.png` }
        }
      }
    },
    catLitterOdorControl: {
      title: 'Guide Ultime Contrôle Odeur Litière Chat [2026]',
      description: 'Maîtrisez contrôle odeur litière avec charbon actif. Éliminez 99% ammoniaque, fraîcheur 30+ jours. Essai gratuit - payez livraison seulement!',
      targetKeyword: 'contrôle odeur litière chat',
      datePublished: '2025-08-17',
      lastUpdated: '2026-02-13',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: 'Guide Ultime Contrôle Odeur Litière Chat [2026]',
        description: 'Maîtrisez le contrôle des odeurs de litière avec le charbon actif. Éliminez 99% ammoniaque.',
        datePublished: '2025-08-17',
        dateModified: '2026-02-13',
        author: {
          '@type': 'Person',
          name: 'Dr. Sarah Chen',
          jobTitle: 'Veterinary Consultant',
          url: `${SITE_URL}/about/our-story/`
        },
        publisher: {
          '@type': 'Organization',
          name: 'Purrify',
          logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/purrify-logo.png` }
        }
      }
    },
    smallApartmentCatCare: {
      title: 'Soins Chat Petit Appartement: Guide Complet 2026',
      description: 'Conseils essentiels pour chats en petit appart. Contrôle odeurs, litières gain d\'espace, ventilation. Charbon actif élimine odeur!',
      targetKeyword: 'soins chat petit appartement',
      datePublished: '2025-06-02',
      lastUpdated: '2026-02-13',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: 'Soins Chat en Petit Appartement: Guide Complet 2026',
        description: 'Conseils essentiels pour les chats en petit appartement: contrôle des odeurs, litières gain d\'espace.',
        datePublished: '2025-06-02',
        dateModified: '2026-02-13',
        author: {
          '@type': 'Person',
          name: 'Dr. Sarah Chen',
          jobTitle: 'Veterinary Consultant',
          url: `${SITE_URL}/about/our-story/`
        },
        publisher: {
          '@type': 'Organization',
          name: 'Purrify',
          logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/purrify-logo.png` }
        }
      }
    },
    naturalCatLitterAdditive: {
      title: 'Additif Litière Chat Naturel: 100% Charbon Coco',
      description: 'Stop odeur litière avec charbon actif coco 100% naturel. Sans produits chimiques, sans parfums, non-toxique. Efficace à 99%!',
      targetKeyword: 'additif litière chat naturel',
      datePublished: '2025-09-14',
      lastUpdated: '2026-02-13',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: 'Additif Litière Chat Naturel: 100% Charbon de Coco',
        description: 'Stop aux odeurs de litière avec le charbon actif coco 100% naturel. Sans produits chimiques.',
        datePublished: '2025-09-14',
        dateModified: '2026-02-13',
        author: {
          '@type': 'Person',
          name: 'Dr. Sarah Chen',
          jobTitle: 'Veterinary Consultant',
          url: `${SITE_URL}/about/our-story/`
        },
        publisher: {
          '@type': 'Organization',
          name: 'Purrify',
          logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/purrify-logo.png` }
        }
      }
    },
    triedEverythingCatLitterSmell: {
      title: 'Tout Essayé Pour Odeur Litière Chat? Voici Ce Qui Marche',
      description: 'Bicarbonate, sacs de charbon, désodorisants - rien ne marchait jusqu\'à ce que je trouve ceci. Solutions réelles de quelqu\'un qui a tout essayé.',
      targetKeyword: 'tout essayé odeur litière chat',
      datePublished: '2025-09-20',
      lastUpdated: '2026-02-13',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: 'Tout Essayé Pour Odeur Litière Chat? Voici Ce Qui Marche',
        description: 'Témoignage: bicarbonate, sacs de charbon, désodorisants - rien ne marchait jusqu\'à cette solution.',
        datePublished: '2025-09-20',
        dateModified: '2026-02-13',
        author: {
          '@type': 'Person',
          name: 'Dr. Sarah Chen',
          jobTitle: 'Veterinary Consultant',
          url: `${SITE_URL}/about/our-story/`
        },
        publisher: {
          '@type': 'Organization',
          name: 'Purrify',
          logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/purrify-logo.png` }
        }
      }
    },
    activatedCarbonVsZeolite: {
      title: 'Charbon Actif vs Zéolite Litière: Lequel Mieux?',
      description: 'Comparaison scientifique charbon actif et zéolite pour contrôle odeur litière. Voyez résultats tests, avantages/inconvénients, lequel absorbe mieux l\'ammoniaque.',
      targetKeyword: 'charbon actif vs zéolite litière chat',
      datePublished: '2025-07-10',
      lastUpdated: '2026-02-13',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: 'Charbon Actif vs Zéolite Pour Litière Chat: Lequel Fonctionne Mieux?',
        description: 'Comparaison scientifique du charbon actif et de la zéolite pour le contrôle des odeurs de litière.',
        datePublished: '2025-07-10',
        dateModified: '2026-02-13',
        author: {
          '@type': 'Person',
          name: 'Dr. Sarah Chen',
          jobTitle: 'Veterinary Consultant',
          url: `${SITE_URL}/about/our-story/`
        },
        publisher: {
          '@type': 'Organization',
          name: 'Purrify',
          logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/purrify-logo.png` }
        }
      }
    }
  }
};

// Chinese SEO Meta (Simplified)
export const seoMetaZh: SEOMetaContent = {
  homepage: {
    title: '猫砂除臭剂 - 99%瞬间消除异味 | Purrify',
    description: '天然活性炭猫砂除臭剂，30秒消除99%氨气味！免费试用装领取，加拿大美国配送。立即购买享受清新家居！',
    targetKeyword: '猫砂除臭剂',
    lastUpdated: '2025-12-18T08:30:00+08:00',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          name: 'Purrify',
          url: `${SITE_URL}/zh`,
          logo: `${SITE_URL}/images/purrify-logo.png`
        },
        {
          '@type': 'WebSite',
          name: 'Purrify 中国',
          url: `${SITE_URL}/zh`
        }
      ]
    }
  },

  products: {
    trial: {
      title: '猫砂除臭剂试用装 - 免费领取 | Purrify',
      description: '免费试用天然猫砂除臭剂！活性炭30秒除味，99%有效。仅需付运费$4.76，加拿大美国配送。立即领取！',
      targetKeyword: '猫砂除臭剂试用装',
      lastUpdated: '2025-11-25T14:20:00+08:00',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: 'Purrify 猫砂除臭剂试用装',
        description: '免费试用天然猫砂除臭剂，活性炭30秒除味，99%有效',
        brand: { '@type': 'Brand', name: 'Purrify' },
        offers: {
          '@type': 'Offer',
          price: '4.76',
          priceCurrency: 'CAD',
          availability: 'https://schema.org/InStock'
        }
      }
    },
    standard: {
      title: '猫砂除臭剂标准装 - 50克除味专家 | Purrify',
      description: '50克标准装猫砂除臭剂，24小时持续除味。天然活性炭证明有效，延长猫砂寿命。立即购买享优惠！',
      targetKeyword: '猫砂除臭剂标准装',
      lastUpdated: '2025-12-05T09:15:00+08:00',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: 'Purrify 猫砂除臭剂标准装',
        description: '50克标准装猫砂除臭剂，24小时持续除味，天然活性炭证明有效',
        brand: { '@type': 'Brand', name: 'Purrify' },
        offers: {
          '@type': 'Offer',
          price: '19.99',
          priceCurrency: 'CAD',
          availability: 'https://schema.org/InStock'
        }
      }
    },
    family: {
      title: '多猫家庭除臭剂 - 120克大容量 | Purrify',
      description: '专为多猫家庭设计，120克大包装持续60天除味。天然活性炭消除异味，免费配送。立即购买！',
      targetKeyword: '多猫家庭除臭剂',
      lastUpdated: '2025-11-30T16:45:00+08:00',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: 'Purrify 多猫家庭除臭剂',
        description: '120克大包装猫砂除臭剂，专为多猫家庭设计，持续60天除味',
        brand: { '@type': 'Brand', name: 'Purrify' },
        offers: {
          '@type': 'Offer',
          price: '39.99',
          priceCurrency: 'CAD',
          availability: 'https://schema.org/InStock'
        }
      }
    }
  },

  learn: {
    howItWorks: {
      title: '活性炭猫砂 - 30秒除味科学原理 | Purrify',
      description: '了解活性炭猫砂如何30秒消除99%异味。分子级吸附技术，天然安全证明有效。免费试用立即体验！',
      targetKeyword: '活性炭猫砂',
      lastUpdated: '2025-12-22T11:30:00+08:00',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: '活性炭猫砂科学原理：30秒除味技术揭秘',
        description: '了解活性炭猫砂如何30秒消除99%异味，分子级吸附技术，天然安全证明有效',
        author: { '@type': 'Organization', name: 'Purrify' }
      }
    },
    activatedCarbonBenefits: {
      title: '活性炭好处 - 7大证明除味优势 | Purrify',
      description: '揭秘活性炭好处的7大科学依据！99%除氨味，24小时持久，100%天然安全。了解更多立即购买！',
      targetKeyword: '活性炭好处',
      lastUpdated: '2025-11-18T10:00:00+08:00',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: '活性炭好处的7大科学依据',
        description: '揭秘活性炭好处的7大科学依据，99%除氨味，24小时持久，100%天然安全',
        author: { '@type': 'Organization', name: 'Purrify' }
      }
    },
    activatedCarbonVsBakingSoda: {
      title: '小苏打vs活性炭 - 猫砂除味哪个强 | Purrify',
      description: '小苏打vs活性炭实测对比！活性炭除味99% vs 小苏打47%。科学证明活性炭更强，免费试用！',
      targetKeyword: '小苏打vs活性炭',
      lastUpdated: '2025-12-12T15:20:00+08:00',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: '小苏打vs活性炭：猫砂除味效果实测对比',
        description: '小苏打vs活性炭实测对比，活性炭除味99% vs 小苏打47%，科学证明活性炭更强',
        author: { '@type': 'Organization', name: 'Purrify' }
      }
    },
    usingDeodorizersWithKittens: {
      title: '猫砂除臭剂幼猫安全 - 兽医认证 | Purrify',
      description: '猫砂除臭剂幼猫安全吗？Purrify天然活性炭100%无毒，兽医认可。保护幼猫健康，立即购买！',
      targetKeyword: '猫砂除臭剂幼猫安全',
      lastUpdated: '2026-01-05T13:40:00+08:00',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: '猫砂除臭剂幼猫安全性指南',
        description: '猫砂除臭剂幼猫安全吗？Purrify天然活性炭100%无毒，兽医认可，保护幼猫健康',
        author: { '@type': 'Organization', name: 'Purrify' }
      }
    },
    faq: {
      title: '猫砂除臭常见问题 - 专家解答99%除味 | Purrify',
      description: '猫砂除臭常见问题全解答！活性炭如何工作、安全性、使用方法。1000+猫主人信赖，立即购买！',
      targetKeyword: '猫砂除臭',
      lastUpdated: '2025-11-12T09:30:00+08:00',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: '猫砂除臭常见问题解答',
        description: '猫砂除臭常见问题全解答，活性炭如何工作、安全性、使用方法，1000+猫主人信赖',
        author: { '@type': 'Organization', name: 'Purrify' }
      }
    },
    safety: {
      title: '活性炭对猫安全 - 100%天然无毒认证 | Purrify',
      description: '活性炭对猫安全吗？食品级椰壳炭，无毒无香精，水过滤同款。兽医认可，立即购买享安心！',
      targetKeyword: '活性炭对猫安全',
      lastUpdated: '2025-12-28T08:00:00+08:00',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: '活性炭对猫的安全性认证',
        description: '活性炭对猫安全吗？食品级椰壳炭，无毒无香精，水过滤同款，兽医认可',
        author: { '@type': 'Organization', name: 'Purrify' }
      }
    },
    ammoniaHealthRisks: {
      title: '猫砂氨气健康风险 - 24小时消除方案 | Purrify',
      description: '猫砂氨气健康风险警示！长期吸入危害大。活性炭24小时消除氨味，保护家人健康。立即购买！',
      targetKeyword: '猫砂氨气健康风险',
      lastUpdated: '2026-01-15T17:10:00+08:00',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: '猫砂氨气健康风险与消除方案',
        description: '猫砂氨气健康风险警示，长期吸入危害大，活性炭24小时消除氨味保护家人健康',
        author: { '@type': 'Organization', name: 'Purrify' }
      }
    },
    solutions: {
      ammoniaSmellCatLitter: {
        title: '猫砂氨气味 - 30秒天然消除方案 | Purrify',
        description: '猫砂氨气味太重？活性炭30秒中和氨气分子，99%消除率。天然无香精，免费试用立即领取！',
        targetKeyword: '猫砂氨气味',
        lastUpdated: '2025-11-22T12:00:00+08:00',
        schema: {
          '@context': 'https://schema.org',
          '@type': 'HowTo',
          name: '猫砂氨气味消除方案',
          description: '使用活性炭30秒中和氨气分子，99%消除率，天然无香精解决方案',
          totalTime: 'PT24H'
        }
      },
      howToNeutralizeAmmonia: {
        title: '消除猫砂氨气味 - 3步24小时除味法 | Purrify',
        description: '消除猫砂氨气味最有效方法！活性炭分子级中和，3步简单操作24小时见效。立即购买！',
        targetKeyword: '消除猫砂氨气味',
        lastUpdated: '2025-12-08T10:45:00+08:00',
        schema: {
          '@context': 'https://schema.org',
          '@type': 'HowTo',
          name: '3步消除猫砂氨气味方法',
          description: '活性炭分子级中和氨气，3步简单操作24小时见效的除味法',
          totalTime: 'PT24H'
        }
      },
      litterBoxSmellElimination: {
        title: '消除猫砂盆异味 - 2026完整除味指南 | Purrify',
        description: '消除猫砂盆异味终极指南！活性炭30秒除味，持续7天清新。1000+家庭证明有效，立即购买！',
        targetKeyword: '消除猫砂盆异味',
        lastUpdated: '2026-01-25T14:30:00+08:00',
        schema: {
          '@context': 'https://schema.org',
          '@type': 'HowTo',
          name: '消除猫砂盆异味完整指南',
          description: '消除猫砂盆异味终极指南，活性炭30秒除味持续7天清新，1000+家庭证明有效',
          totalTime: 'PT24H'
        }
      },
      multipleCatsOdorControl: {
        title: '多猫除臭方案 - 120克家庭装除味 | Purrify',
        description: '多猫除臭专业解决方案！大容量活性炭持续60天除味，天然安全。免费配送加拿大美国，立即购买！',
        targetKeyword: '多猫除臭',
        lastUpdated: '2025-12-01T16:00:00+08:00',
        schema: {
          '@context': 'https://schema.org',
          '@type': 'HowTo',
          name: '多猫家庭除臭专业方案',
          description: '多猫除臭专业解决方案，大容量活性炭持续60天除味，天然安全',
          totalTime: 'PT24H'
        }
      }
    }
  },

  blog: {
    mostPowerfulOdorAbsorber: {
      title: '最强大的猫砂除臭剂 [测试12种]',
      description: '我们测试了12种除臭剂。只有1种在30秒内去除异味。看看哪种活性炭产品比小苏打强52%。免费试用！',
      targetKeyword: '最强大除臭剂',
      datePublished: '2025-09-19',
      lastUpdated: '2026-02-13',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: '最强大的猫砂除臭剂 [测试12种]',
        description: '我们测试了12种除臭剂。只有1种在30秒内去除异味。',
        datePublished: '2025-09-19',
        dateModified: '2026-02-13',
        author: {
          '@type': 'Person',
          name: 'Dr. Sarah Chen',
          jobTitle: 'Veterinary Consultant',
          url: `${SITE_URL}/about/our-story/`
        },
        publisher: {
          '@type': 'Organization',
          name: 'Purrify',
          logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/purrify-logo.png` }
        }
      }
    },
    activatedCarbonVsBakingSoda: {
      title: '活性炭对比小苏打：哪个能杀死异味？',
      description: '7天测试结果：活性炭消除99%异味 vs 小苏打47%。查看我们实验室测试中的惊人差异。获取免费试用！',
      targetKeyword: '活性炭对比小苏打',
      datePublished: '2025-10-25',
      lastUpdated: '2026-02-13',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: '活性炭对比小苏打：哪个能杀死异味？',
        description: '7天测试结果：活性炭消除99%异味 vs 小苏打47%。',
        datePublished: '2025-10-25',
        dateModified: '2026-02-13',
        author: {
          '@type': 'Person',
          name: 'Dr. Sarah Chen',
          jobTitle: 'Veterinary Consultant',
          url: `${SITE_URL}/about/our-story/`
        },
        publisher: {
          '@type': 'Organization',
          name: 'Purrify',
          logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/purrify-logo.png` }
        }
      }
    },
    bestLitterOdorRemoverSmallApartments: {
      title: '小公寓最佳猫砂除臭剂 [500平方英尺]',
      description: '在500平方英尺公寓中测试：活性炭在30秒内消除异味，持续30天。完美适合公寓和小空间。免费配送！',
      targetKeyword: '小公寓猫砂除臭剂',
      datePublished: '2025-06-06',
      lastUpdated: '2026-02-13',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: '小公寓最佳猫砂除臭剂 [500平方英尺]',
        description: '在500平方英尺公寓中测试：活性炭在30秒内消除异味。',
        datePublished: '2025-06-06',
        dateModified: '2026-02-13',
        author: {
          '@type': 'Person',
          name: 'Dr. Sarah Chen',
          jobTitle: 'Veterinary Consultant',
          url: `${SITE_URL}/about/our-story/`
        },
        publisher: {
          '@type': 'Organization',
          name: 'Purrify',
          logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/purrify-logo.png` }
        }
      }
    },
    catLitterSmellWorseSummer: {
      title: '为什么夏天猫砂更臭 [+2026解决方案]',
      description: '高温使氨气蒸发增加3倍。活性炭立即中和夏季异味。阻止季节性臭味飙升。获取免费试用！',
      targetKeyword: '夏天猫砂更臭',
      datePublished: '2025-08-25',
      lastUpdated: '2026-02-13',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: '为什么夏天猫砂更臭 [+2026解决方案]',
        description: '高温使氨气蒸发增加3倍。活性炭立即中和夏季异味。',
        datePublished: '2025-08-25',
        dateModified: '2026-02-13',
        author: {
          '@type': 'Person',
          name: 'Dr. Sarah Chen',
          jobTitle: 'Veterinary Consultant',
          url: `${SITE_URL}/about/our-story/`
        },
        publisher: {
          '@type': 'Organization',
          name: 'Purrify',
          logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/purrify-logo.png` }
        }
      }
    },
    activatedCarbonCatLitter: {
      title: '活性炭猫砂：2026完整指南',
      description: '关于活性炭用于猫砂除臭的一切。工作原理、好处、安全性、使用技巧。99%有效，100%天然。立即免费试用！',
      targetKeyword: '活性炭猫砂',
      datePublished: '2025-07-20',
      lastUpdated: '2026-02-13',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: '活性炭猫砂：2026完整指南',
        description: '关于活性炭用于猫砂除臭的一切。',
        datePublished: '2025-07-20',
        dateModified: '2026-02-13',
        author: {
          '@type': 'Person',
          name: 'Dr. Sarah Chen',
          jobTitle: 'Veterinary Consultant',
          url: `${SITE_URL}/about/our-story/`
        },
        publisher: {
          '@type': 'Organization',
          name: 'Purrify',
          logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/purrify-logo.png` }
        }
      }
    },
    ecoFriendlyCatLitter: {
      title: '环保猫砂指南：最佳可持续选择 2026',
      description: '比较环保猫砂选项。椰壳活性炭100%天然、可生物降解、可重复使用。可持续地消除异味！',
      targetKeyword: '环保猫砂',
      datePublished: '2025-07-12',
      lastUpdated: '2026-02-13',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: '环保猫砂指南：最佳可持续选择 2026',
        description: '比较环保猫砂选项。',
        datePublished: '2025-07-12',
        dateModified: '2026-02-13',
        author: {
          '@type': 'Person',
          name: 'Dr. Sarah Chen',
          jobTitle: 'Veterinary Consultant',
          url: `${SITE_URL}/about/our-story/`
        },
        publisher: {
          '@type': 'Organization',
          name: 'Purrify',
          logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/purrify-logo.png` }
        }
      }
    },
    wholesaleCatLitter: {
      title: '批发猫砂除臭剂：完整买家指南',
      description: '活性炭猫砂添加剂批发价。完美适合宠物店、美容院、收容所。已证实99%除臭。联系我们！',
      targetKeyword: '批发猫砂',
      datePublished: '2025-09-27',
      lastUpdated: '2026-02-13',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: '批发猫砂除臭剂：完整买家指南',
        description: '活性炭猫砂添加剂批发价。',
        datePublished: '2025-09-27',
        dateModified: '2026-02-13',
        author: {
          '@type': 'Person',
          name: 'Dr. Sarah Chen',
          jobTitle: 'Veterinary Consultant',
          url: `${SITE_URL}/about/our-story/`
        },
        publisher: {
          '@type': 'Organization',
          name: 'Purrify',
          logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/purrify-logo.png` }
        }
      }
    },
    catLitterOdorControl: {
      title: '终极猫砂除臭控制指南 [2026]',
      description: '使用活性炭掌握猫砂除臭控制。消除99%氨气味，保持30+天清新。免费试用 - 仅付运费！',
      targetKeyword: '猫砂除臭控制',
      datePublished: '2025-09-09',
      lastUpdated: '2026-02-13',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: '终极猫砂除臭控制指南 [2026]',
        description: '使用活性炭掌握猫砂除臭控制。',
        datePublished: '2025-09-09',
        dateModified: '2026-02-13',
        author: { '@type': 'Organization', name: 'Purrify' },
        publisher: {
          '@type': 'Organization',
          name: 'Purrify',
          logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/purrify-logo.png` }
        }
      }
    },
    smallApartmentCatCare: {
      title: '小公寓养猫：2026完整指南',
      description: '小公寓养猫的基本技巧。除臭控制、节省空间的猫砂盆、通风。活性炭立即消除异味！',
      targetKeyword: '小公寓养猫',
      datePublished: '2025-06-19',
      lastUpdated: '2026-02-13',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: '小公寓养猫：2026完整指南',
        description: '小公寓养猫的基本技巧。',
        datePublished: '2025-06-19',
        dateModified: '2026-02-13',
        author: { '@type': 'Organization', name: 'Purrify' },
        publisher: {
          '@type': 'Organization',
          name: 'Purrify',
          logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/purrify-logo.png` }
        }
      }
    },
    naturalCatLitterAdditive: {
      title: '天然猫砂添加剂：100%椰子碳',
      description: '用100%天然椰壳活性炭消除猫砂盆异味。无化学品、无香料、无毒素。99%有效除臭！',
      targetKeyword: '天然猫砂添加剂',
      datePublished: '2025-09-19',
      lastUpdated: '2026-02-13',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: '天然猫砂添加剂：100%椰子碳',
        description: '用100%天然椰壳活性炭消除猫砂盆异味。',
        datePublished: '2025-09-19',
        dateModified: '2026-02-13',
        author: { '@type': 'Organization', name: 'Purrify' },
        publisher: {
          '@type': 'Organization',
          name: 'Purrify',
          logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/purrify-logo.png` }
        }
      }
    },
    triedEverythingCatLitterSmell: {
      title: '试遍了猫砂除臭方法？这个终于有效',
      description: '小苏打、活性炭袋、空气清新剂——都没用，直到我发现这个。来自尝试过所有方法的人的真实解决方案。',
      targetKeyword: '试遍猫砂除臭',
      datePublished: '2025-08-04',
      lastUpdated: '2026-02-13',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: '试遍了猫砂除臭方法？这个终于有效',
        description: '小苏打、活性炭袋、空气清新剂——都没用，直到我发现这个。',
        datePublished: '2025-08-04',
        dateModified: '2026-02-13',
        author: { '@type': 'Organization', name: 'Purrify' },
        publisher: {
          '@type': 'Organization',
          name: 'Purrify',
          logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/purrify-logo.png` }
        }
      }
    },
    activatedCarbonVsZeolite: {
      title: '活性炭 vs 沸石用于猫砂：哪个更有效？',
      description: '活性炭和沸石用于猫砂除臭的科学比较。查看测试结果、优缺点，以及哪个更能吸收氨气。',
      targetKeyword: '活性炭 vs 沸石猫砂',
      datePublished: '2025-09-03',
      lastUpdated: '2026-02-13',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: '活性炭 vs 沸石用于猫砂：哪个更有效？',
        description: '活性炭和沸石用于猫砂除臭的科学比较。',
        datePublished: '2025-09-03',
        dateModified: '2026-02-13',
        author: { '@type': 'Organization', name: 'Purrify' },
        publisher: {
          '@type': 'Organization',
          name: 'Purrify',
          logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/purrify-logo.png` }
        }
      }
    }
  }
};

// Spanish SEO Meta - OPTIMIZED FOR MAXIMUM SEARCH VISIBILITY
export const seoMetaEs: SEOMetaContent = {
  homepage: {
    title: 'Desodorante para Arena de Gato - 99% | Purrify',
    description: 'Elimina olores de arena al instante con carbón activado grado NASA. 100% natural, sin perfumes. ¡Prueba gratis disponible! Compra ahora.',
    targetKeyword: 'desodorante para arena de gato',
    lastUpdated: '2026-02-13',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          name: 'Purrify',
          url: `${SITE_URL}/es`,
          logo: `${SITE_URL}/images/purrify-logo.png`
        },
        {
          '@type': 'WebSite',
          name: 'Purrify España',
          url: `${SITE_URL}/es`
        }
      ]
    }
  },

  products: {
    trial: {
      title: 'Prueba Desodorante Arena Gato GRATIS 12g | Purrify',
      description: 'Prueba GRATIS desodorante arena gato con carbón activado. Elimina 99% olor amoníaco en 30 seg. Solo pagas envío $4.76. ¡Compra ahora!',
      targetKeyword: 'prueba desodorante arena gato',
      lastUpdated: '2026-02-13',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: 'Purrify Desodorante Arena Gatos Prueba 12g',
        description: 'Desodorante para arena de gatos con carbón activado. Elimina 99% del olor a amoníaco en 30 segundos. Prueba gratis.',
        brand: { '@type': 'Brand', name: 'Purrify' },
        offers: {
          '@type': 'Offer',
          price: '4.76',
          priceCurrency: 'CAD',
          availability: 'https://schema.org/InStock'
        }
      }
    },
    standard: {
      title: 'Desodorante Arena Tamaño Regular 50g 2026 | Purrify',
      description: 'Desodorante arena tamaño regular con carbón activado. Elimina olor 30 días, 99% efectivo. Envío gratis incluido. ¡Compra ahora!',
      targetKeyword: 'desodorante arena tamaño regular',
      lastUpdated: '2026-02-13',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: 'Purrify Desodorante Arena Gatos 50g',
        description: 'Desodorante para arena de gatos tamaño regular con carbón activado. Elimina olor 30 días, 99% efectivo.',
        brand: { '@type': 'Brand', name: 'Purrify' },
        offers: {
          '@type': 'Offer',
          price: '14.99',
          priceCurrency: 'CAD',
          availability: 'https://schema.org/InStock'
        }
      }
    },
    family: {
      title: 'Desodorante Multi-Gato 120g Pack Familiar | Purrify',
      description: 'Desodorante multi-gato elimina olor 2-3 gatos 60+ días. Carbón activado neutraliza amoníaco instantáneo. Envío gratis. ¡Compra ya!',
      targetKeyword: 'desodorante multi-gato',
      lastUpdated: '2026-02-13',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: 'Purrify Desodorante Arena Gatos Pack Familiar 120g',
        description: 'Desodorante multi-gato para 2-3 gatos, dura 60+ días. Carbón activado neutraliza amoníaco instantáneamente.',
        brand: { '@type': 'Brand', name: 'Purrify' },
        offers: {
          '@type': 'Offer',
          price: '29.99',
          priceCurrency: 'CAD',
          availability: 'https://schema.org/InStock'
        }
      }
    }
  },

  learn: {
    howItWorks: {
      title: 'Carbón Activado Arena Gatos - Cómo Funciona | Purrify',
      description: 'Descubre cómo carbón activado arena gatos elimina 99% olor en 30 segundos. Tecnología NASA probada. ¡Prueba gratis ahora!',
      targetKeyword: 'carbón activado arena gatos',
      lastUpdated: '2026-02-13',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Cómo Funciona el Carbón Activado en Arena para Gatos',
        description: 'Descubre cómo el carbón activado elimina 99% del olor en 30 segundos. Tecnología NASA probada.',
        author: { '@type': 'Organization', name: 'Purrify' }
      }
    },
    activatedCarbonBenefits: {
      title: '7 Beneficios Carbón Activado Arena Gatos | Purrify',
      description: 'Conoce 7+ beneficios carbón activado para arena gatos. Elimina 99% amoníaco, dura 30 días, 100% natural. ¡Prueba gratis disponible!',
      targetKeyword: 'beneficios carbón activado',
      lastUpdated: '2026-02-13',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: '7 Beneficios del Carbón Activado para Arena de Gatos',
        description: 'Conoce 7+ beneficios del carbón activado para arena de gatos. Elimina 99% de amoníaco, dura 30 días, 100% natural.',
        author: { '@type': 'Organization', name: 'Purrify' }
      }
    },
    activatedCarbonVsBakingSoda: {
      title: 'Bicarbonato vs Carbón Activado - Cuál Gana | Purrify',
      description: 'Compara bicarbonato vs carbón activado para arena gatos. Carbón elimina 99% vs 47% bicarbonato. ¡Prueba gratis y comprueba!',
      targetKeyword: 'bicarbonato vs carbón activado',
      lastUpdated: '2026-02-13',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Bicarbonato vs Carbón Activado para Arena de Gatos',
        description: 'Comparación: carbón activado elimina 99% vs 47% bicarbonato para control de olor en arena de gatos.',
        author: { '@type': 'Organization', name: 'Purrify' }
      }
    },
    usingDeodorizersWithKittens: {
      title: '¿Desodorante Arena Gatitos Es Seguro? Guía | Purrify',
      description: 'Guía desodorante arena gatitos seguro. Carbón activado 100% natural, no tóxico, aprobado veterinario. ¡Compra ahora para tu gatito!',
      targetKeyword: 'desodorante arena gatitos',
      lastUpdated: '2026-02-13',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: '¿Es Seguro Usar Desodorante de Arena con Gatitos?',
        description: 'Guía de seguridad: carbón activado 100% natural, no tóxico, aprobado veterinario para gatitos.',
        author: { '@type': 'Organization', name: 'Purrify' }
      }
    },
    faq: {
      title: 'Control Olor Arena Gatos - Preguntas FAQ | Purrify',
      description: 'Respuestas control olor arena gatos con carbón activado. Seguridad, uso, efectividad 99%. 10,000+ clientes confían. ¡Compra ahora!',
      targetKeyword: 'control olor arena gatos',
      lastUpdated: '2026-02-13',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Preguntas Frecuentes sobre Control de Olor en Arena para Gatos',
        description: 'Respuestas sobre control de olor con carbón activado. Seguridad, uso, efectividad 99%.',
        author: { '@type': 'Organization', name: 'Purrify' }
      }
    },
    safety: {
      title: '¿Carbón Activado Seguro Para Gatos? Info | Purrify',
      description: 'Carbón activado seguro gatos 100% grado alimenticio coco. No tóxico, sin polvo, usado filtros agua. Aprobado veterinario. ¡Compra!',
      targetKeyword: 'carbón activado seguro gatos',
      lastUpdated: '2026-02-13',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: '¿Es Seguro el Carbón Activado para Gatos?',
        description: 'Carbón activado 100% grado alimenticio de coco. No tóxico, sin polvo, usado en filtros de agua. Aprobado veterinario.',
        author: { '@type': 'Organization', name: 'Purrify' }
      }
    },
    ammoniaHealthRisks: {
      title: 'Riesgos Salud Amoníaco Arena Gatos - Guía | Purrify',
      description: 'Descubre riesgos salud amoníaco arena gatos para ti y tu mascota. Niveles seguros, efectos, solución carbón activado. ¡Compra ya!',
      targetKeyword: 'riesgos salud amoníaco arena gatos',
      lastUpdated: '2026-02-13',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Riesgos para la Salud del Amoníaco en Arena para Gatos',
        description: 'Riesgos del amoníaco en arena para gatos para ti y tu mascota. Niveles seguros, efectos, solución con carbón activado.',
        author: { '@type': 'Organization', name: 'Purrify' }
      }
    },
    solutions: {
      ammoniaSmellCatLitter: {
        title: '¿Arena Gatos Huele Amoníaco? Solución 24h | Purrify',
        description: 'Solución arena gatos huele amoníaco con carbón activado. Elimina 99% olor en 24 horas, neutraliza molecularmente. ¡Prueba gratis!',
        targetKeyword: 'arena gatos huele amoníaco',
        lastUpdated: '2026-02-13',
        schema: {
          '@context': 'https://schema.org',
          '@type': 'HowTo',
          name: 'Cómo Eliminar el Olor a Amoníaco de la Arena del Gato',
          description: 'Solución para arena de gato que huele a amoníaco con carbón activado. Elimina 99% del olor en 24 horas.',
          totalTime: 'PT24H'
        }
      },
      howToNeutralizeAmmonia: {
        title: 'Eliminar Olor Amoníaco Arena Gatos - Guía | Purrify',
        description: 'Guía eliminar olor amoníaco arena gatos en 3 pasos. Carbón activado neutraliza molecularmente 99% amoníaco. ¡Compra ahora!',
        targetKeyword: 'eliminar olor amoníaco arena gatos',
        lastUpdated: '2026-02-13',
        schema: {
          '@context': 'https://schema.org',
          '@type': 'HowTo',
          name: 'Cómo Neutralizar el Olor a Amoníaco en Arena para Gatos',
          description: 'Guía en 3 pasos para eliminar olor a amoníaco. Carbón activado neutraliza molecularmente 99% del amoníaco.',
          totalTime: 'PT24H'
        }
      },
      litterBoxSmellElimination: {
        title: 'Eliminación Olor Caja Arena - Método 2026 | Purrify',
        description: 'Método eliminación olor caja arena permanentemente. Carbón activado elimina 99% olor 30 días, 100% natural. ¡Prueba gratis ya!',
        targetKeyword: 'eliminación olor caja arena',
        lastUpdated: '2026-02-13',
        schema: {
          '@context': 'https://schema.org',
          '@type': 'HowTo',
          name: 'Eliminación de Olor de Caja de Arena para Gatos',
          description: 'Método para eliminar olor de caja de arena permanentemente. Carbón activado elimina 99% del olor por 30 días.',
          totalTime: 'PT24H'
        }
      },
      multipleCatsOdorControl: {
        title: 'Control Olores Multi-Gatos - Sistema 2026 | Purrify',
        description: 'Sistema control olores multi-gatos para 2+ gatos. Carbón activado elimina amoníaco 60 días. Casa fresca garantizada. ¡Compra ahora!',
        targetKeyword: 'control olores multi-gatos',
        lastUpdated: '2026-02-13',
        schema: {
          '@context': 'https://schema.org',
          '@type': 'HowTo',
          name: 'Cómo Controlar Olores con Múltiples Gatos',
          description: 'Sistema de control de olores para 2+ gatos. Carbón activado elimina amoníaco por 60 días.',
          totalTime: 'PT24H'
        }
      }
    }
  },

  blog: {
    mostPowerfulOdorAbsorber: {
      title: 'Absorbedor Olor Arena Gatos Más Potente [Probados 12]',
      description: 'Probamos 12 eliminadores de olor. Solo 1 eliminó olor en 30 segundos. Ve qué carbón activado superó bicarbonato por 52%. ¡Prueba gratis!',
      targetKeyword: 'absorbedor olor más potente',
      datePublished: '2025-06-23',
      lastUpdated: '2026-02-13',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: 'Absorbedor Olor Arena Gatos Más Potente [Probados 12]',
        description: 'Probamos 12 eliminadores de olor. Solo 1 eliminó olor en 30 segundos.',
        datePublished: '2025-06-23',
        dateModified: '2026-02-13',
        author: { '@type': 'Organization', name: 'Purrify' },
        publisher: {
          '@type': 'Organization',
          name: 'Purrify',
          logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/purrify-logo.png` }
        }
      }
    },
    activatedCarbonVsBakingSoda: {
      title: 'Carbón Activado vs Bicarbonato: ¿Cuál Mata Olor?',
      description: 'Resultados prueba 7 días: carbón activado eliminó 99% olor vs 47% bicarbonato. Ve la diferencia impactante en nuestra prueba. ¡Prueba gratis!',
      targetKeyword: 'carbón activado vs bicarbonato',
      datePublished: '2025-08-06',
      lastUpdated: '2026-02-13',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: 'Carbón Activado vs Bicarbonato: ¿Cuál Mata Olor?',
        description: 'Resultados prueba 7 días: carbón activado eliminó 99% olor vs 47% bicarbonato.',
        datePublished: '2025-08-06',
        dateModified: '2026-02-13',
        author: { '@type': 'Organization', name: 'Purrify' },
        publisher: {
          '@type': 'Organization',
          name: 'Purrify',
          logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/purrify-logo.png` }
        }
      }
    },
    bestLitterOdorRemoverSmallApartments: {
      title: 'Mejor Eliminador Olor Arena Apartamentos [500 pies²]',
      description: 'Probado en apartamento 500 pies²: carbón activado elimina olor en 30 segundos, dura 30 días. Perfecto para condos y espacios pequeños. ¡Envío gratis!',
      targetKeyword: 'eliminador olor arena apartamentos',
      datePublished: '2025-05-25',
      lastUpdated: '2026-02-13',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: 'Mejor Eliminador Olor Arena Apartamentos [500 pies²]',
        description: 'Probado en apartamento 500 pies²: carbón activado elimina olor en 30 segundos.',
        datePublished: '2025-05-25',
        dateModified: '2026-02-13',
        author: { '@type': 'Organization', name: 'Purrify' },
        publisher: {
          '@type': 'Organization',
          name: 'Purrify',
          logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/purrify-logo.png` }
        }
      }
    },
    catLitterSmellWorseSummer: {
      title: 'Por Qué Arena Gatos Huele Peor en Verano [+ Fix 2026]',
      description: 'Calor aumenta evaporación amoníaco 3x. Carbón activado neutraliza olor verano instantáneamente. Detén el pico de olor estacional. ¡Prueba gratis!',
      targetKeyword: 'arena gatos huele peor verano',
      datePublished: '2025-08-15',
      lastUpdated: '2026-02-13',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: 'Por Qué Arena Gatos Huele Peor en Verano [+ Fix 2026]',
        description: 'Calor aumenta evaporación amoníaco 3x. Carbón activado neutraliza olor verano instantáneamente.',
        datePublished: '2025-08-15',
        dateModified: '2026-02-13',
        author: { '@type': 'Organization', name: 'Purrify' },
        publisher: {
          '@type': 'Organization',
          name: 'Purrify',
          logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/purrify-logo.png` }
        }
      }
    },
    activatedCarbonCatLitter: {
      title: 'Carbón Activado Arena Gatos: Guía Completa 2026',
      description: 'Todo sobre carbón activado para olor de arena. Cómo funciona, beneficios, seguridad, consejos de uso. 99% efectivo, 100% natural. ¡Prueba gratis!',
      targetKeyword: 'carbón activado arena gatos',
      datePublished: '2025-05-13',
      lastUpdated: '2026-02-13',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: 'Carbón Activado Arena Gatos: Guía Completa 2026',
        description: 'Todo sobre carbón activado para olor de arena.',
        datePublished: '2025-05-13',
        dateModified: '2026-02-13',
        author: { '@type': 'Organization', name: 'Purrify' },
        publisher: {
          '@type': 'Organization',
          name: 'Purrify',
          logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/purrify-logo.png` }
        }
      }
    },
    ecoFriendlyCatLitter: {
      title: 'Guía Arena Gatos Ecológica: Mejor Sostenible 2026',
      description: 'Compara opciones arena ecológica. Carbón activado cáscara coco 100% natural, biodegradable, reutilizable. ¡Elimina olores sosteniblemente!',
      targetKeyword: 'arena gatos ecológica',
      datePublished: '2025-06-20',
      lastUpdated: '2026-02-13',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: 'Guía Arena Gatos Ecológica: Mejor Sostenible 2026',
        description: 'Compara opciones arena ecológica.',
        datePublished: '2025-06-20',
        dateModified: '2026-02-13',
        author: { '@type': 'Organization', name: 'Purrify' },
        publisher: {
          '@type': 'Organization',
          name: 'Purrify',
          logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/purrify-logo.png` }
        }
      }
    },
    wholesaleCatLitter: {
      title: 'Desodorante Arena Gatos Mayoreo: Guía Comprador',
      description: 'Precios mayoreo en aditivo carbón activado arena gatos. Perfecto para tiendas mascotas, estilistas, refugios. 99% eliminación olor probada. ¡Contáctanos!',
      targetKeyword: 'arena gatos mayoreo',
      datePublished: '2025-07-30',
      lastUpdated: '2026-02-13',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: 'Desodorante Arena Gatos Mayoreo: Guía Comprador',
        description: 'Precios mayoreo en aditivo carbón activado arena gatos.',
        datePublished: '2025-07-30',
        dateModified: '2026-02-13',
        author: { '@type': 'Organization', name: 'Purrify' },
        publisher: {
          '@type': 'Organization',
          name: 'Purrify',
          logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/purrify-logo.png` }
        }
      }
    },
    catLitterOdorControl: {
      title: 'Guía Definitiva Control Olor Arena Gatos [2026]',
      description: 'Domina control olor arena con carbón activado. Elimina 99% olor amoníaco, mantén frescura 30+ días. Prueba gratis - ¡solo paga envío!',
      targetKeyword: 'control olor arena gatos',
      datePublished: '2025-09-06',
      lastUpdated: '2026-02-13',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: 'Guía Definitiva Control Olor Arena Gatos [2026]',
        description: 'Domina control olor arena con carbón activado.',
        datePublished: '2025-09-06',
        dateModified: '2026-02-13',
        author: { '@type': 'Organization', name: 'Purrify' },
        publisher: {
          '@type': 'Organization',
          name: 'Purrify',
          logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/purrify-logo.png` }
        }
      }
    },
    smallApartmentCatCare: {
      title: 'Cuidado Gatos Apartamento Pequeño: Guía Completa 2026',
      description: 'Consejos esenciales para gatos en apartamentos pequeños. Control olores, cajas arena que ahorran espacio, ventilación. ¡Carbón activado elimina olor!',
      targetKeyword: 'cuidado gatos apartamento pequeño',
      datePublished: '2025-10-23',
      lastUpdated: '2026-02-13',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: 'Cuidado Gatos Apartamento Pequeño: Guía Completa 2026',
        description: 'Consejos esenciales para gatos en apartamentos pequeños.',
        datePublished: '2025-10-23',
        dateModified: '2026-02-13',
        author: { '@type': 'Organization', name: 'Purrify' },
        publisher: {
          '@type': 'Organization',
          name: 'Purrify',
          logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/purrify-logo.png` }
        }
      }
    },
    naturalCatLitterAdditive: {
      title: 'Aditivo Arena Gatos Natural: 100% Carbón Coco',
      description: 'Detén olor caja arena con carbón activado cáscara coco 100% natural. Sin químicos, sin perfumes, no tóxico. ¡99% eliminación olor efectiva!',
      targetKeyword: 'aditivo arena gatos natural',
      datePublished: '2025-05-17',
      lastUpdated: '2026-02-13',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: 'Aditivo Arena Gatos Natural: 100% Carbón Coco',
        description: 'Detén olor caja arena con carbón activado cáscara coco 100% natural.',
        datePublished: '2025-05-17',
        dateModified: '2026-02-13',
        author: { '@type': 'Organization', name: 'Purrify' },
        publisher: {
          '@type': 'Organization',
          name: 'Purrify',
          logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/purrify-logo.png` }
        }
      }
    },
    triedEverythingCatLitterSmell: {
      title: '¿Probaste Todo Para Olor Arena Gatos? Esto Funcionó',
      description: 'Bicarbonato, bolsas de carbón, ambientadores - nada funcionaba hasta que encontré esto. Soluciones reales de alguien que probó todo.',
      targetKeyword: 'probé todo olor arena gatos',
      datePublished: '2025-06-04',
      lastUpdated: '2026-02-13',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: '¿Probaste Todo Para Olor Arena Gatos? Esto Funcionó',
        description: 'Bicarbonato, bolsas de carbón, ambientadores - nada funcionaba hasta que encontré esto.',
        datePublished: '2025-06-04',
        dateModified: '2026-02-13',
        author: { '@type': 'Organization', name: 'Purrify' },
        publisher: {
          '@type': 'Organization',
          name: 'Purrify',
          logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/purrify-logo.png` }
        }
      }
    },
    activatedCarbonVsZeolite: {
      title: '¿Carbón Activado vs Zeolita Arena: Cuál Mejor?',
      description: 'Comparación científica de carbón activado y zeolita para control de olor en arena. Ve resultados de pruebas, pros/contras, cuál absorbe mejor el amoníaco.',
      targetKeyword: 'carbón activado vs zeolita arena gatos',
      datePublished: '2025-07-20',
      lastUpdated: '2026-02-13',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: '¿Carbón Activado vs Zeolita Para Arena de Gatos: Cuál Funciona Mejor?',
        description: 'Comparación científica de carbón activado y zeolita para control de olor en arena.',
        datePublished: '2025-07-20',
        dateModified: '2026-02-13',
        author: { '@type': 'Organization', name: 'Purrify' },
        publisher: {
          '@type': 'Organization',
          name: 'Purrify',
          logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/purrify-logo.png` }
        }
      }
    }
  }
};

// Export all SEO meta content indexed by locale
export const SEO_META: Record<LocaleCode, SEOMetaContent> = {
  en: seoMetaEn,
  fr: seoMetaFr
};

// Type for non-solutions learn keys
type LearnPageKey = Exclude<keyof SEOMetaContent['learn'], 'solutions'>;
type SolutionPageKey = keyof SEOMetaContent['learn']['solutions'];

// Helper function to get SEO meta for a specific page and locale
export function getSEOMeta(
  locale: LocaleCode,
  pageType: 'homepage' | 'products' | 'learn' | 'blog',
  pageKey?: string
): PageMeta | undefined {
  const meta = SEO_META[locale];

  if (pageType === 'homepage') {
    return meta.homepage;
  }

  if (pageType === 'products' && pageKey) {
    return meta.products[pageKey as keyof typeof meta.products];
  }

  if (pageType === 'learn' && pageKey) {
    // Exclude 'solutions' as it's a nested object, not a PageMeta
    if (pageKey === 'solutions') {
      return undefined;
    }
    return meta.learn[pageKey as LearnPageKey];
  }

  if (pageType === 'blog' && pageKey) {
    return meta.blog[pageKey as keyof typeof meta.blog];
  }

  return undefined;
}

// Helper function to get SEO meta for solution pages
export function getSolutionSEOMeta(
  locale: LocaleCode,
  solutionKey: string
): PageMeta | undefined {
  const meta = SEO_META[locale];
  return meta.learn.solutions[solutionKey as SolutionPageKey];
}
