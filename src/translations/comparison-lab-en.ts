export const comparisonLabEn = {
  shared: {
    breadcrumbHome: 'Home',
    breadcrumbLearn: 'Learn',
    intentLabels: {
      vs: 'VS Lab',
      best: 'Best Lab',
      alternative: 'Alternative Lab',
    },
    updatedLabel: 'Updated',
    publishedLabel: 'Published',
    reviewCadenceLabel: 'Review cycle',
    reviewCadenceValue: 'Quarterly or after major evidence changes',
    quickVerdictTitle: 'Quick verdict',
    methodologyCalloutTitle: 'How this page was built',
    methodologyLinkLabel: 'Read the full testing methodology',
    comparisonTableEyebrow: 'Structured comparison',
    firstPartyEvidenceEyebrow: 'First-party evidence',
    sourcePublishedLabel: 'Source published:',
    sourceUpdatedLabel: 'Source updated:',
    openEvidenceLabel: 'Open evidence',
    relatedReadingEyebrow: 'Supporting reads',
    relatedReadingTitle: 'Related reading',
    openReadingLabel: 'Open guide',
    faqEyebrow: 'Questions',
    faqTitle: 'Frequently asked questions',
  },
  hub: {
    metaTitle: 'Comparison Lab for Cat Litter Odor Control | Purrify',
    metaDescription:
      'Transparent cat litter odor comparisons with methodology, update dates, first-party evidence, tables, and FAQs for vs, best, and alternative queries.',
    metaImageAlt: 'Comparison Lab methodology and evidence hub',
    breadcrumbLabel: 'Comparison Lab',
    hero: {
      eyebrow: 'Transparent comparison system',
      title: 'Comparison Lab: repeatable comparisons for vs, best, and alternative queries',
      description:
        'Every comparison in this lab shows how we tested, what we updated, which evidence was first-party, and where confidence is high or limited.',
      primaryCta: 'Read methodology',
      secondaryCta: 'Browse templates',
    },
    metrics: {
      templatesLabel: 'Seed templates',
      standardsLabel: 'Evidence standards',
      evidenceLabel: 'Linked evidence sources',
    },
    comparisonTypes: {
      eyebrow: 'Framework',
      title: 'Three template families, one evidence standard',
      methodologyLinkLabel: 'Methodology requirements',
      cards: [
        {
          title: 'VS comparisons',
          description:
            'Head-to-head evaluations with one scoring frame, one claim review, and direct links to the first-party pages that shaped the verdict.',
        },
        {
          title: 'Best pages',
          description:
            'Ranked option sets that show why each choice earned its place, where the evidence is strongest, and which user context changes the recommendation.',
        },
        {
          title: 'Alternative pages',
          description:
            'Switching guides that explain where a current solution breaks down, what to look for instead, and how strong the evidence really is.',
        },
      ],
    },
    featured: {
      eyebrow: 'Template library',
      title: 'Structured comparison pages seeded from existing content',
      description:
        'Each template cross-links into the blog, science pages, and ClaimReview support so the system can scale without losing transparency.',
      methodologyLinkLabel: 'Methodology requirements',
      openTemplateLabel: 'Open template',
    },
    standards: {
      eyebrow: 'Lab standards',
      title: 'What every lab page must show',
      description:
        'The system is designed for citation-friendly clarity: update dates, testing notes, comparison tables, FAQs, and explicit evidence trails.',
      cta: 'See the scoring and update rules',
      items: [
        {
          title: 'Transparent freshness',
          description:
            'Each page shows publish and update dates so readers can judge whether the comparison is current enough for the decision they are making.',
        },
        {
          title: 'Visible methodology',
          description:
            'The scoring logic, evidence ladder, and update triggers live on a public methodology page instead of being implied in the copy.',
        },
        {
          title: 'Structured tables',
          description:
            'Every page uses a scan-friendly table so the comparison can be cited, summarized, and rechecked without rereading the whole article.',
        },
        {
          title: 'First-party proof',
          description:
            'Evidence cards point back to the site’s own testing pages, science explainers, and comparison articles so claims are traceable.',
        },
      ],
    },
    faqEyebrow: 'Hub FAQ',
    faq: [
      {
        question: 'Why build a separate comparison lab instead of more blog posts?',
        answer:
          'The lab turns comparisons into durable assets with repeatable structure. That makes updates easier, evidence more explicit, and citations more likely.',
      },
      {
        question: 'Does every lab page link to methodology?',
        answer:
          'Yes. The methodology link is part of the template so readers can always inspect the scoring frame and evidence rules behind a verdict.',
      },
      {
        question: 'What counts as first-party evidence here?',
        answer:
          'Existing Purrify tests, logs, comparison articles, and science explainers that the site already publishes and dates. Unsupported claims do not qualify.',
      },
    ],
  },
  methodology: {
    metaTitle: 'Comparison Lab Methodology | Purrify',
    metaDescription:
      'See how the Purrify Comparison Lab scores odor-control comparisons, updates pages, applies claim reviews, and links first-party evidence.',
    metaImageAlt: 'Comparison Lab methodology page',
    breadcrumbLabel: 'Methodology',
    hero: {
      eyebrow: 'Methodology',
      title: 'How the Comparison Lab scores, updates, and cites every page',
      description:
        'This methodology exists so the comparison system can scale without becoming a black box. Every template follows the same process, evidence ladder, and review rules.',
      primaryCta: 'Open the lab',
      reviewNote: 'Methodology version reviewed on March 7, 2026',
    },
    process: {
      eyebrow: 'Workflow',
      title: 'The four-step comparison workflow',
      description:
        'Every page starts from a fixed workflow so structure stays consistent even when the query type changes.',
      steps: [
        {
          title: 'Define the decision',
          description:
            'We identify the user decision behind the query first: head-to-head choice, best option set, or switch-to-an-alternative scenario.',
        },
        {
          title: 'Pull dated evidence',
          description:
            'We collect the existing first-party pages and science explainers already on the site, then surface their publish or update dates directly on the page.',
        },
        {
          title: 'Score with one rubric',
          description:
            'Pages use the same scoring frame so “duration,” “odor chemistry fit,” and “maintenance burden” mean the same thing across the lab.',
        },
        {
          title: 'Publish with update triggers',
          description:
            'Each page is reviewed on a recurring cadence and also when a linked source changes enough to alter the verdict or table.',
        },
      ],
    },
    scoring: {
      title: 'Core scoring weights',
      description:
        'Weights can shift by query intent, but the comparison dimensions themselves stay fixed so conclusions remain comparable across pages.',
      weights: [
        {
          title: 'Odor chemistry fit: highest weight',
          description:
            'Does the option actually solve ammonia and other litter-box odor compounds, or does it mainly mask them?',
        },
        {
          title: 'Duration under normal use',
          description:
            'How long does performance hold before the user needs to refresh, reapply, or fully replace the solution?',
        },
        {
          title: 'Maintenance burden',
          description:
            'How much effort does the method demand in a real routine: daily spraying, frequent resets, or stable weekly upkeep?',
        },
        {
          title: 'Cost stability and household fit',
          description:
            'We look at whether the approach stays practical for apartments, multi-cat homes, or owners trying to reduce spend over time.',
        },
      ],
    },
    evidence: {
      title: 'Evidence ladder',
      description:
        'Not every source carries the same weight. The lab separates first-party testing from explanatory support so readers can see what is measured versus inferred.',
      items: [
        {
          title: 'Level 1: dated first-party tests',
          description:
            'Timed comparisons, tracked logs, and side-by-side routines published on the site with a clear date and setup notes.',
        },
        {
          title: 'Level 2: explanatory first-party articles',
          description:
            'Comparison articles or solution pages that explain why a method wins or fails, even when they do not contain the deepest raw testing detail.',
        },
        {
          title: 'Level 3: science explainers',
          description:
            'Science pages help interpret mechanisms and chemistry, but they do not replace direct testing for product-level verdicts.',
        },
      ],
    },
    updates: {
      eyebrow: 'Freshness policy',
      title: 'When a page gets updated',
      description:
        'Every lab page has both a calendar review and event-driven triggers so stale comparisons do not quietly linger.',
      items: [
        {
          title: 'Quarterly review window',
          description:
            'Pages are revisited on a recurring schedule even if no major change is obvious, so update dates remain meaningful.',
        },
        {
          title: 'Evidence change trigger',
          description:
            'If a linked test page, alternative page, or science explainer changes enough to shift the conclusion, the lab page is updated immediately.',
        },
        {
          title: 'Template improvement trigger',
          description:
            'When the scoring rubric or evidence standard gets better, the templates are revised and high-value pages are refreshed first.',
        },
      ],
    },
    exclusions: {
      title: 'What the lab does not do',
      description:
        'The templates are built to reduce fabrication risk. If the evidence is weak, the page says so instead of pretending confidence.',
      items: [
        'It does not invent lab results, prices, or manufacturer claims that are not already supported on the site.',
        'It does not hide uncertainty when evidence is partial or only explanatory.',
        'It does not publish a verdict without a visible table, update date, and methodology path.',
      ],
      cta: 'Return to the template library',
    },
    faqEyebrow: 'Methodology FAQ',
    faq: [
      {
        question: 'Why not use only one giant comparison article?',
        answer:
          'A single article can rank, but it does not scale cleanly. Separate templates let each query have its own verdict, table, FAQ, and update trail.',
      },
      {
        question: 'Can a page still rank if evidence is limited?',
        answer:
          'Yes, but the template should make the limits obvious. Transparency is better than overclaiming, especially for AI citation surfaces.',
      },
      {
        question: 'How do claim reviews fit in?',
        answer:
          'A claim review gives one plain-language judgment on the most important disputed statement on the page. It complements the table instead of replacing it.',
      },
    ],
  },
  pages: {
    activatedCarbonVsBakingSoda: {
      metaTitle: 'Activated Carbon vs Baking Soda for Cat Litter | Comparison Lab | Purrify',
      metaDescription:
        'Transparent activated carbon vs baking soda comparison with claim review, methodology, structured table, FAQ, and linked first-party evidence.',
      title: 'Activated Carbon vs Baking Soda for Cat Litter Odor',
      heroImageAlt: 'Activated carbon granules beside baking soda for litter box odor control',
      summary:
        'This page compares two odor-control approaches on ammonia handling, duration, maintenance burden, and real-world fit. It uses existing first-party tests plus science explainers rather than marketing copy.',
      verdict:
        'Activated carbon wins on sustained ammonia control because it physically adsorbs odor molecules, while baking soda gives only short-lived relief and does not solve the core gas problem.',
      methodologyCallout:
        'We scored both approaches against the same criteria used across the lab: odor chemistry match, duration, upkeep, cost stability, and household fit. Evidence comes from the existing 90-day test, the long-form comparison article, and the ammonia explainer.',
      quickPoints: [
        'Activated carbon stays aligned with the chemistry of litter-box odor because it traps ammonia instead of trying to neutralize an alkaline gas with another alkaline material.',
        'Baking soda can offer short-lived odor relief, but the site’s existing tests show the effect fades fast under real litter-box use.',
        'For households that need lower maintenance and better long-term stability, the evidence stack points consistently toward activated carbon.',
      ],
      claimReview: {
        claim: 'Baking soda neutralizes cat litter ammonia for days.',
        verdict: 'False',
        explanation:
          'The site’s science and testing pages both point the same way: baking soda is alkaline, ammonia is alkaline, and the real-world reduction fades quickly once the box is under normal use.',
        evidence: [
          'The 90-day deodorizer test reports strong early drop-off for baking soda rather than sustained control.',
          'The long-form comparison explains why ammonia chemistry does not match the neutralization claim.',
          'The ammonia explainer supports the mechanism behind the failure.',
        ],
      },
      table: {
        title: 'Side-by-side scorecard',
        description:
          'Each row reflects the same scoring frame used across the lab so verdicts can be compared consistently.',
        columns: ['Criterion', 'Activated carbon', 'Baking soda', 'Why it matters'],
        rows: [
          [
            'Ammonia handling',
            'Physically adsorbs odor molecules',
            'Short-lived help, then drops off',
            'Ammonia is the hardest everyday litter-box odor to control well.',
          ],
          [
            'Duration',
            'Holds up across a longer refresh window',
            'Needs frequent reapplication',
            'Short duration drives cost and maintenance burden.',
          ],
          [
            'Maintenance burden',
            'Lower-touch routine once layered into litter',
            'More frequent top-ups to maintain effect',
            'The better option is the one people can actually sustain.',
          ],
          [
            'Multi-cat fit',
            'Stronger fit for heavier odor load',
            'Breaks down faster as odor load rises',
            'High-load homes expose weak methods quickly.',
          ],
          [
            'Confidence level',
            'Backed by both testing and science pages',
            'Supported mainly as a weak short-term helper',
            'Verdicts are stronger when both evidence layers agree.',
          ],
        ],
      },
      evidence: {
        title: 'First-party evidence behind this verdict',
        description:
          'These are the exact site pages this template leans on, with publish or update dates surfaced for freshness.',
        items: [
          {
            eyebrow: 'Existing comparison',
            title: 'Technology comparison article',
            description:
              'Long-form activated carbon vs baking soda breakdown with mechanism, timeline, and cost framing.',
          },
          {
            eyebrow: '90-day test',
            title: 'Side-by-side deodorizer results',
            description:
              'Tracked routine comparing multiple methods, including the sustained drop in performance for baking soda.',
          },
          {
            eyebrow: 'Science explainer',
            title: 'Ammonia chemistry context',
            description:
              'Mechanism page explaining why ammonia formation and alkalinity matter for the comparison.',
          },
        ],
      },
      related: {
        items: [
          {
            eyebrow: 'Format test',
            title: 'Powder vs spray deodorizer',
            description:
              'Useful if the decision is about deodorizer format, not just chemistry.',
          },
          {
            eyebrow: 'Absorber guide',
            title: 'Most powerful odor absorber',
            description:
              'Broader look at which absorbent approach performs best when odor load increases.',
          },
          {
            eyebrow: 'Science page',
            title: 'How activated carbon works',
            description:
              'Mechanism-first explainer for readers who want the pore-structure logic behind the verdict.',
          },
        ],
      },
      faq: [
        {
          question: 'Why does activated carbon keep winning ammonia comparisons?',
          answer:
            'Because the site’s own testing and science pages both support the same mechanism: activated carbon traps odor molecules instead of relying on temporary neutralization.',
        },
        {
          question: 'Is baking soda useless in a litter box?',
          answer:
            'Not entirely. It can offer limited short-term help, but this template does not treat it as a durable answer for sustained ammonia control.',
        },
        {
          question: 'What makes this different from the existing blog post?',
          answer:
            'The lab version adds a durable structure: update dates, a visible claim review, first-party evidence cards, a standard table, and a methodology path.',
        },
      ],
    },
    bestCatLitterOdorControl: {
      metaTitle: 'Best Cat Litter for Odor Control | Comparison Lab | Purrify',
      metaDescription:
        'Structured best cat litter odor control comparison with methodology, update dates, table, FAQs, and linked first-party evidence.',
      title: 'Best Cat Litter for Odor Control',
      heroImageAlt: 'Different cat litter technologies arranged for odor control comparison',
      summary:
        'This template turns the existing best-litter content into a durable comparison asset by separating technology types, use cases, and the limits of each option.',
      verdict:
        'No single litter type fully solves ammonia on its own, but premium clumping clay and silica crystals lead most households while activated carbon remains the clearest cross-category upgrade.',
      methodologyCallout:
        'We kept the comparison at the technology level rather than brand level so the page can stay durable. Scoring reflects odor performance, maintenance burden, cost range, and household fit.',
      quickPoints: [
        'Premium clumping clay remains the strongest all-around fit for most homes when cost and routine balance matter.',
        'Silica crystals can edge ahead on odor duration, but the fit depends more on cat tolerance and user habits.',
        'Activated carbon is treated here as an upgrade layer, not a litter type, because the evidence shows it solves a different part of the odor problem.',
      ],
      claimReview: {
        claim: 'One litter type fully eliminates ammonia on its own.',
        verdict: 'Mostly False',
        explanation:
          'The existing guide itself says every litter technology leaves an ammonia gap. The best choice depends on household context, and the strongest evidence points to layering an upgrade on top of the base litter.',
        evidence: [
          'The 2026 guide compares technology strengths and explicitly calls out the ammonia gap shared across litter types.',
          'The 90-day deodorizer test supports the need for a separate odor-trapping layer.',
          'The ammonia explainer shows why gas control is a distinct problem from liquid absorption.',
        ],
      },
      table: {
        title: 'Technology comparison table',
        description:
          'The rows below stay at the technology level so the page remains durable even as specific brands change.',
        columns: ['Option', 'Odor control', 'Maintenance burden', 'Cost range', 'Best fit', 'Evidence note'],
        rows: [
          [
            'Premium clumping clay',
            'Strong all-around baseline',
            'Moderate daily upkeep',
            '$10 to $18 per month',
            'Most households',
            'Best balance in the current guide.',
          ],
          [
            'Silica crystals',
            'Very strong duration',
            'Low day-to-day upkeep',
            '$20 to $35 per month',
            'Apartments and slower scoop cycles',
            'Stronger duration, weaker fit for texture-sensitive cats.',
          ],
          [
            'Natural clumping',
            'Moderate',
            'Moderate to high',
            '$20 to $30 per month',
            'Eco-focused homes',
            'Good fit when biodegradability matters more than maximum odor duration.',
          ],
          [
            'Tofu and plant fiber',
            'Moderate',
            'Moderate to high',
            '$25 to $40 per month',
            'Sensitive cats and low-dust preference',
            'Useful niche fit, but not the strongest pure odor winner.',
          ],
          [
            'Activated carbon upgrade',
            'Targets the ammonia gap directly',
            'Weekly refresh layer',
            'Add-on cost',
            'Any litter already working for the cat',
            'Best treated as a system upgrade, not a litter replacement.',
          ],
        ],
      },
      evidence: {
        title: 'First-party evidence behind this ranking',
        description:
          'The lab page is only as durable as the sources underneath it, so each evidence card exposes the base content directly.',
        items: [
          {
            eyebrow: 'Buying guide',
            title: '2026 litter technology guide',
            description:
              'Current ranking page comparing clay, crystals, natural litters, and tofu by technology rather than pure brand hype.',
          },
          {
            eyebrow: '90-day test',
            title: 'Deodorizer routine results',
            description:
              'Supports the add-on upgrade logic by showing how a separate odor-control layer changes real-world outcomes.',
          },
          {
            eyebrow: 'Science explainer',
            title: 'Why ammonia remains the hard problem',
            description:
              'Mechanism page showing why liquid control and gas control should not be treated as identical.',
          },
        ],
      },
      related: {
        items: [
          {
            eyebrow: 'Natural option',
            title: 'Best natural cat litter for odor control',
            description:
              'Use this when the decision is mostly about eco profile and biodegradability.',
          },
          {
            eyebrow: 'Sensitive-cat option',
            title: 'Best unscented cat litters',
            description:
              'Useful for homes prioritizing low fragrance and lower irritation risk.',
          },
          {
            eyebrow: 'Maintenance guide',
            title: 'How often to change cat litter',
            description:
              'Good follow-up for anyone whose “best litter” decision is really a routine problem.',
          },
        ],
      },
      faq: [
        {
          question: 'Why not rank only brands on this page?',
          answer:
            'Technology-level ranking stays durable longer and avoids rebuilding the page every time a brand changes packaging, scent line, or availability.',
        },
        {
          question: 'Does this page say clumping clay is always the winner?',
          answer:
            'No. It says clumping clay is the strongest all-around baseline for many homes, while crystals, natural litters, and tofu each win in narrower contexts.',
        },
        {
          question: 'Why include activated carbon if it is not a litter type?',
          answer:
            'Because the evidence on the site repeatedly shows the ammonia problem sits beside litter choice, not fully inside it.',
        },
      ],
    },
    armAndHammerAlternative: {
      metaTitle: 'Arm and Hammer Cat Litter Deodorizer Alternative | Comparison Lab | Purrify',
      metaDescription:
        'Transparent Arm and Hammer alternative comparison with methodology, claim review, structured table, FAQ, and linked first-party evidence.',
      title: 'Arm and Hammer Cat Litter Deodorizer Alternative',
      heroImageAlt: 'Alternative comparison between baking-soda deodorizer and activated carbon',
      summary:
        'This template turns the existing alternative page into a durable switching asset with dated evidence, a repeatable table, and one clear claim review.',
      verdict:
        'The alternative case is strongest when the household’s problem is persistent ammonia smell. In that scenario, the existing site evidence favors activated carbon over a baking-soda-led approach.',
      methodologyCallout:
        'Alternative pages score the current solution on where it breaks down, then compare the switch option on chemistry fit, maintenance load, cost stability, and likelihood of better long-term performance.',
      quickPoints: [
        'The strongest switch argument is not “brand versus brand” but chemistry mismatch versus chemistry fit.',
        'A user looking for an alternative usually wants to know what fails first, how fast, and what a lower-maintenance replacement looks like.',
        'The existing site pages already support the switching narrative, so the template mainly makes that evidence easier to audit.',
      ],
      claimReview: {
        claim: 'Baking-soda deodorizer keeps ammonia controlled for days in real use.',
        verdict: 'Mostly False',
        explanation:
          'The alternative page, the long-form comparison, and the 90-day test all point to the same pattern: short-lived improvement followed by performance drop-off under normal litter-box conditions.',
        evidence: [
          'The alternative page frames the core weakness as the mismatch between baking soda and ammonia chemistry.',
          'The technology comparison explains why the relief window is limited.',
          'The 90-day test shows quick decline under a real routine.',
        ],
      },
      table: {
        title: 'Switch-versus-stay comparison',
        description:
          'This table is built for alternative intent: what keeps failing now, and what changes if the user switches?',
        columns: ['Criterion', 'Stay with baking-soda approach', 'Switch to activated carbon', 'Why this matters'],
        rows: [
          [
            'Ammonia control',
            'Limited and inconsistent over time',
            'Stronger sustained control',
            'Switch pages should focus on the pain that triggers the search.',
          ],
          [
            'Reapplication load',
            'Higher frequency',
            'Lower-frequency refresh pattern',
            'Users searching alternatives often want less upkeep, not just different copy.',
          ],
          [
            'Fragrance burden',
            'Often paired with scent-driven masking',
            'Works as a fragrance-free layer',
            'Sensitive cats and apartments amplify this difference.',
          ],
          [
            'Cost stability',
            'Can look cheap upfront but erodes with repeat use',
            'More stable when performance holds longer',
            'Alternative queries usually hide a cost-frustration story underneath.',
          ],
          [
            'Confidence level',
            'Backed mainly as a weak baseline option',
            'Backed by the strongest first-party evidence on the site',
            'Readers need to see whether the switch case is evidence-led or only promotional.',
          ],
        ],
      },
      evidence: {
        title: 'First-party evidence behind the switch case',
        description:
          'The template only claims what the existing site pages already support and dates.',
        items: [
          {
            eyebrow: 'Alternative page',
            title: 'Existing Arm and Hammer alternative guide',
            description:
              'Core switch narrative explaining why a baking-soda-led solution stops being persuasive when ammonia is the real problem.',
          },
          {
            eyebrow: 'Technology comparison',
            title: 'Activated carbon vs baking soda article',
            description:
              'Useful for the side-by-side mechanism, performance timeline, and maintenance framing.',
          },
          {
            eyebrow: '90-day test',
            title: 'Longer-horizon routine evidence',
            description:
              'Adds practical support for why the alternative case strengthens over time rather than just on day one.',
          },
        ],
      },
      related: {
        items: [
          {
            eyebrow: 'Brand comparison',
            title: 'Fresh Step vs Arm and Hammer',
            description:
              'Helpful if the reader is still comparing mainstream litter options before changing the odor-control layer.',
          },
          {
            eyebrow: 'Format comparison',
            title: 'Powder vs spray deodorizer',
            description:
              'Useful when the pain point is not just the ingredient but the upkeep format.',
          },
          {
            eyebrow: 'Science page',
            title: 'How activated carbon works',
            description:
              'Mechanism-first read for someone who wants proof before switching.',
          },
        ],
      },
      faq: [
        {
          question: 'Why turn an alternative page into a lab template?',
          answer:
            'Because alternative intent is durable. The template makes the switch logic more transparent by surfacing dates, evidence, and one visible claim review.',
        },
        {
          question: 'Does this page attack a competitor brand directly?',
          answer:
            'No. The strongest part of the comparison is the chemistry and upkeep tradeoff, not brand-level rhetoric.',
        },
        {
          question: 'What should be updated first if this page changes later?',
          answer:
            'The linked evidence cards and the table, because those are the fastest signals to drift if new testing or new supporting pages land.',
        },
      ],
    },
  },
};
