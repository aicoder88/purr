export interface LitterTypeItem {
  name: string;
  pros: string[];
  cons: string[];
  rating: number;
  bestFor: string;
  watchOut: string;
}

export interface MaintenanceTipItem {
  title: string;
  description: string;
}

export interface CommonProblemItem {
  problem: string;
  solution: string;
  link: string | null;
}

export interface TOCItem {
  id: string;
  label: string;
}

export interface DecisionStepItem {
  title: string;
  description: string;
  checklist: string[];
}

export interface MaintenanceScheduleItem {
  frequency: string;
  task: string;
  reason: string;
}

export interface WarningSignItem {
  sign: string;
  action: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface RelatedGuideItem {
  label: string;
  url: string;
}

export interface ExternalResourceItem {
  label: string;
  url: string;
}

export interface GuideCopy {
  trialCtaPrefix: string;
  breadcrumbAriaLabel: string;
  homeSrOnly: string;
  breadcrumbLearn: string;
  breadcrumbGuide: string;
  heroTitle: string;
  heroDescription: string;
  heroImageAlt: string;
  quickAnswerTitle: string;
  quickAnswerBody: string;
  tocTitle: string;
  tocItems: TOCItem[];
  litterTypesTitle: string;
  litterTypesDescription: string;
  litterTypesDeepDiveTitle: string;
  litterTypesDeepDiveParagraphs: string[];
  prosLabel: string;
  consLabel: string;
  bestForLabel: string;
  watchOutLabel: string;
  sectionImageAlt: string;
  decisionFrameworkTitle: string;
  decisionFrameworkIntro: string;
  decisionSteps: DecisionStepItem[];
  maintenanceTitle: string;
  maintenanceDescription: string;
  maintenanceImageAlt: string;
  setupTitle: string;
  setupParagraphs: string[];
  maintenanceScheduleTitle: string;
  maintenanceScheduleDescription: string;
  frequencyLabel: string;
  taskLabel: string;
  reasonLabel: string;
  maintenanceSchedule: MaintenanceScheduleItem[];
  problemsTitle: string;
  problemsDescription: string;
  problemLabel: string;
  solutionLabel: string;
  learnMoreLabel: string;
  solutionImageAlt: string;
  warningSignsTitle: string;
  warningSignsDescription: string;
  warningSigns: WarningSignItem[];
  relatedGuidesTitle: string;
  relatedGuidesDescription: string;
  relatedGuides: RelatedGuideItem[];
  externalResourcesTitle: string;
  externalResourcesDescription: string;
  externalResources: ExternalResourceItem[];
  faqTitle: string;
  faqItems: FAQItem[];
  ctaTitle: string;
  ctaDescription: string;
  readSuccessStoriesLabel: string;
  litterTypes: LitterTypeItem[];
  maintenanceTips: MaintenanceTipItem[];
  commonProblems: CommonProblemItem[];
}

export const GUIDE_COPY: Record<string, GuideCopy> = {
  en: {
    trialCtaPrefix: 'Send My FREE Trial',
    breadcrumbAriaLabel: 'Breadcrumb',
    homeSrOnly: 'Home',
    breadcrumbLearn: 'Learn',
    breadcrumbGuide: 'Cat Litter Guide',
    heroTitle: 'The Complete Cat Litter Guide',
    heroDescription:
      'Choose litter that fits your cat, your home, and your budget with a practical system that reduces odor, dust, and waste over the long term.',
    heroImageAlt: 'Modern cat litter box setup showing different litter types and maintenance tools',
    quickAnswerTitle: 'Quick Answer: What Is the Best Cat Litter Setup?',
    quickAnswerBody:
      'For most homes, the best setup is a low-dust clumping litter, consistent twice-daily scooping, a weekly reset routine, and an unscented activated carbon additive in granules. The exact litter brand matters less than execution. Most odor and tracking problems come from mismatched litter type, shallow fill depth, and inconsistent maintenance timing. Start by matching litter texture to your cat preference, then lock in a repeatable cleaning schedule. If odor spikes between scoops, treat it as a systems issue: improve airflow, adjust litter depth, and use a source-control additive instead of fragrance masking. This guide shows you how to make those decisions quickly and avoid expensive trial-and-error.',
    tocTitle: 'Table of Contents',
    tocItems: [
      { id: 'types', label: '1. Cat litter types compared' },
      { id: 'selection-framework', label: '2. 5-step selection framework' },
      { id: 'setup-routine', label: '3. Setup and daily routine' },
      { id: 'maintenance', label: '4. Core maintenance rules' },
      { id: 'maintenance-schedule', label: '5. Weekly and monthly schedule' },
      { id: 'problems', label: '6. Common problems and fixes' },
      { id: 'warning-signs', label: '7. Health and behavior warning signs' },
      { id: 'guide-faq', label: '8. FAQ for cat owners' },
    ],
    litterTypesTitle: 'Cat Litter Types Compared',
    litterTypesDescription:
      'Not all litters fail for the same reason. Some break down on odor, some on tracking, and some on cat acceptance. Compare tradeoffs before you buy.',
    litterTypesDeepDiveTitle: 'How to Read These Ratings',
    litterTypesDeepDiveParagraphs: [
      'A litter can score well in one category and still fail in your home. Example: a litter with strong clumping can still perform poorly if it is heavily perfumed and your cat avoids the box. This chart focuses on real-world behavior: clump integrity, dust output, odor carryover between scoops, and tolerance for multi-cat usage.',
      'When comparing products, prioritize consistency over novelty. A stable routine with a compatible litter usually outperforms constant product switching. If your current litter is accepted by your cat, you can often improve results more by adjusting box setup and maintenance cadence than by replacing the litter itself.',
      'Use these ratings as a decision shortcut, then validate with a 14-day test in your own home. Track odor at fixed times, not only right after cleaning. That gives you a realistic performance view and prevents false positives from short-lived fragrance effects.',
    ],
    prosLabel: 'Pros:',
    consLabel: 'Cons:',
    bestForLabel: 'Best for:',
    watchOutLabel: 'Watch out for:',
    sectionImageAlt: 'Various cat litter types displayed for comparison',
    decisionFrameworkTitle: 'A 5-Step Framework to Choose the Right Litter',
    decisionFrameworkIntro:
      'Most owners choose litter by brand familiarity, then spend months troubleshooting odor, dust, or box avoidance. Use this framework instead. It reduces random switching and helps you choose based on constraints that actually matter: cat preference, room ventilation, cleanup time, and household tolerance for dust and scent.',
    decisionSteps: [
      {
        title: 'Step 1: Start with cat preference, not marketing claims',
        description:
          'Cats care about texture, scent intensity, and box cleanliness. If your cat has used fine clumping litter for years, a sudden switch to large pellets can trigger box refusal even if odor control improves. Pick a baseline your cat already accepts, then optimize around it.',
        checklist: [
          'Match litter texture to your cat current comfort pattern.',
          'Avoid scented formulas for scent-sensitive cats.',
          'Run transitions over 7 to 10 days, not overnight.',
          'Track box visits after any litter change.',
        ],
      },
      {
        title: 'Step 2: Set performance targets before buying',
        description:
          'Define what "better" means in measurable terms: less odor between scoops, lower tracking on floor mats, or less dust during refill. Without targets, every new product feels promising for a few days and disappointing after a week.',
        checklist: [
          'Choose 2 primary goals for the next 14 days.',
          'Use fixed odor checks morning and evening.',
          'Record dust levels during pouring and scooping.',
          'Capture cleanup time so convenience is quantified.',
        ],
      },
      {
        title: 'Step 3: Match litter class to household load',
        description:
          'Single-cat and multi-cat homes have different stress profiles. Multi-cat homes saturate odor control faster and need stronger clump stability. Apartment homes need better source control because less air volume means smell concentration rises quickly.',
        checklist: [
          'Use larger boxes and deeper fill for multi-cat homes.',
          'Increase scoop frequency in warm or humid seasons.',
          'Prioritize low-dust formulas if anyone has respiratory sensitivity.',
          'Add unscented activated carbon granules for high-load homes.',
        ],
      },
      {
        title: 'Step 4: Build the maintenance system before odor appears',
        description:
          'A good litter fails quickly under reactive maintenance. Daily scoop timing, weekly resets, and monthly deep cleaning are what keep performance stable. The goal is to prevent odor spikes instead of repeatedly recovering from them.',
        checklist: [
          'Scoop at consistent times every day.',
          'Keep litter depth stable after each scoop.',
          'Schedule full reset and box wash weekly.',
          'Replace worn plastic boxes before they retain odor.',
        ],
      },
      {
        title: 'Step 5: Improve source control with additive layering',
        description:
          'Even high-end litters have limits under heavy ammonia load. Unscented activated carbon granules extend effective performance by adsorbing odor molecules at the source. This can reduce unnecessary full changes and smooth out performance through the week.',
        checklist: [
          'Use additive in thin layers, not one heavy dump.',
          'Reapply after major scoop cycles.',
          'Adjust amount by humidity and cat count.',
          'Keep formula fragrance-free for better cat tolerance.',
        ],
      },
    ],
    maintenanceTitle: 'Essential Maintenance Tips',
    maintenanceDescription:
      'The litter brand gets most of the attention, but maintenance quality is the main predictor of odor control. Treat litter care like a routine, not a rescue task.',
    maintenanceImageAlt: 'Cat owner performing proper litter box maintenance routine',
    setupTitle: 'How to Set Up a Litter Box System That Stays Fresh',
    setupParagraphs: [
      'Box size is the first lever. Most boxes are too small for full turning and digging behavior, which leads to edge urination, tracking, and mess concentration in one area. A practical baseline is a box at least 1.5 times your cat body length (excluding tail), with enough width to pivot comfortably.',
      'Placement matters more than most owners expect. Keep boxes in low-traffic zones with predictable access, but avoid trapping odor in sealed corners. If the only viable location is a bathroom or laundry area, use ventilation support and avoid storing strong-smell chemicals nearby. Cats are sensitive to environmental shifts.',
      'Depth control is a hidden variable. Too shallow and urine hits the box floor; too deep and clumps break during scooping. A stable 2.5 to 3.5 inch depth works for most clumping litters. Re-level litter after every scoop so use load is distributed evenly and saturation does not concentrate in one corner.',
      'For multi-cat homes, the practical rule remains one box per cat plus one extra. Spread boxes across at least two zones when possible. This lowers conflict behavior and reduces saturation pressure on any single box. If space is tight, increase scoop frequency and monitor hotspots twice daily.',
      'Avoid relying on fragrance to signal cleanliness. Strong scent can hide early odor buildup while still irritating cats and humans. If the room smells perfumed but waste odor returns quickly, you are masking symptoms. Shift to source control: faster waste removal, stable depth, airflow, and activated carbon granules.',
    ],
    maintenanceScheduleTitle: 'Weekly and Monthly Litter Care Schedule',
    maintenanceScheduleDescription:
      'Consistency beats intensity. This schedule is designed for real households where time is limited but results must be reliable. If your home has two or more cats, keep the same structure but tighten frequency where marked.',
    frequencyLabel: 'Frequency',
    taskLabel: 'Task',
    reasonLabel: 'Why it matters',
    maintenanceSchedule: [
      {
        frequency: 'Twice daily',
        task: 'Scoop solids and clumps, then re-level the surface.',
        reason: 'Removes ammonia sources early and prevents localized saturation.',
      },
      {
        frequency: 'Daily',
        task: 'Top up to target depth (2.5 to 3.5 inches).',
        reason: 'Keeps clump formation stable and protects the box floor from direct urine contact.',
      },
      {
        frequency: 'Every 2 to 3 days',
        task: 'Refresh activated carbon granules in thin layers.',
        reason: 'Maintains adsorption capacity across changing humidity and usage load.',
      },
      {
        frequency: 'Weekly',
        task: 'Full litter reset and box wash with mild unscented soap.',
        reason: 'Resets bacterial load and removes residue that drives persistent odor.',
      },
      {
        frequency: 'Weekly',
        task: 'Wash litter mats and nearby fabrics.',
        reason: 'Tracking residue can hold odor and create the impression that the box is failing.',
      },
      {
        frequency: 'Monthly',
        task: 'Deep clean walls/baseboards near litter zone and inspect for missed spray.',
        reason: 'Environmental odor buildup often gets misattributed to litter quality.',
      },
      {
        frequency: 'Every 6 to 12 months',
        task: 'Replace scratched or odor-retaining plastic boxes.',
        reason: 'Aging plastic can hold embedded odor even with correct daily cleaning.',
      },
    ],
    problemsTitle: 'Common Problems & Solutions',
    problemsDescription:
      'Most litter problems are multi-factor. Fix the system, not just one symptom, and validate changes over 7 to 14 days.',
    problemLabel: 'Problem:',
    solutionLabel: 'Solution:',
    learnMoreLabel: 'Learn More',
    solutionImageAlt: 'Happy multi-cat household with clean, odor-free environment',
    warningSignsTitle: 'Warning Signs You Should Not Ignore',
    warningSignsDescription:
      'A litter issue can sometimes signal a health issue. If behavior changes are sudden, painful, or persistent, involve your veterinarian early.',
    warningSigns: [
      {
        sign: 'Frequent box visits with very little urine output',
        action:
          'Treat as urgent. This can indicate urinary blockage risk, especially in male cats. Contact a vet immediately.',
      },
      {
        sign: 'Sudden box avoidance after months of normal use',
        action:
          'Check for pain triggers, not just litter preference. Rule out UTI or inflammation before behavior-only fixes.',
      },
      {
        sign: 'Blood in urine, vocalizing, or straining during urination',
        action:
          'Seek same-day veterinary care. Do not delay while testing new litter products.',
      },
      {
        sign: 'Large increase in urine volume or water intake',
        action:
          'Track changes and discuss with your vet. Metabolic conditions may be involved.',
      },
      {
        sign: 'Persistent coughing or sneezing around litter handling',
        action:
          'Switch to lower-dust options and review ventilation. Escalate to a medical review if symptoms persist.',
      },
      {
        sign: 'Strong ammonia smell returning within hours despite cleaning',
        action:
          'Audit the environment for hidden accidents and fabric odor retention; then increase source-control measures.',
      },
    ],
    relatedGuidesTitle: 'Related Guides',
    relatedGuidesDescription:
      'Use these supporting pages to troubleshoot specific edge cases and improve consistency across seasons, apartment layouts, and multi-cat households.',
    relatedGuides: [
      { label: 'How Activated Carbon Works', url: '/learn/how-it-works/' },
      { label: 'Safety Guidelines for Litter Additives', url: '/learn/safety/' },
      { label: 'Science Behind Odor Molecules', url: '/learn/science/' },
      { label: 'Common Questions and Troubleshooting', url: '/learn/faq/' },
    ],
    externalResourcesTitle: 'External References',
    externalResourcesDescription:
      'These independent veterinary and feline-care references are useful when evaluating behavior changes, hygiene protocols, and litter box management decisions.',
    externalResources: [
      { label: 'ASPCA - Common Cat Behavior Issues: Litter Box Problems', url: 'https://www.aspca.org/pet-care/cat-care/common-cat-behavior-issues/litter-box-problems' },
      { label: 'AAFP Cat Friendly Practice Guidance', url: 'https://catvets.com/guidelines' },
      { label: 'Cornell Feline Health Center', url: 'https://www.vet.cornell.edu/departments/riney-canine-health-center/feline-health-topics' },
    ],
    faqTitle: 'Frequently Asked Questions',
    faqItems: [
      {
        question: 'How often should I fully change cat litter?',
        answer:
          'Most single-cat homes do best with a weekly full reset, while multi-cat homes may need a shorter interval. The right schedule depends on scoop consistency, box size, and humidity. If odor rebounds before your planned reset, tighten interval first, then review litter depth and airflow.',
      },
      {
        question: 'Is clumping litter always better for odor control?',
        answer:
          'Clumping litter is usually easier to maintain because waste can be removed quickly, which reduces bacterial breakdown. But clumping alone does not solve all odor. Source control still depends on routine, room ventilation, and whether you use an unscented adsorbent additive like activated carbon granules.',
      },
      {
        question: 'Can I mix litters to improve performance?',
        answer:
          'You can, but test carefully. Mixed textures can lower cat acceptance if the feel changes too much. If you experiment, do it in small ratios over one to two weeks and track box behavior. Many homes get better results by keeping one litter and improving maintenance consistency.',
      },
      {
        question: 'What is the safest way to reduce litter dust?',
        answer:
          'Choose a low-dust formula, pour slowly from a lower height, and keep the area ventilated during refills. Avoid heavily perfumed products if anyone in the home is scent-sensitive. Dust management is easier when litter is stored dry and refill events are frequent but smaller.',
      },
      {
        question: 'Do covered boxes reduce smell better than open boxes?',
        answer:
          'Covered boxes can contain short-term odor but may trap humidity and concentrate smell inside, which some cats dislike. Performance depends on cleaning frequency and airflow. If you use a covered box, monitor acceptance closely and keep scoop timing strict to prevent buildup.',
      },
      {
        question: 'How do I know if my current setup is working?',
        answer:
          'Use objective checks for two weeks: odor check at fixed times, tracking cleanup time, and litter consumption pattern. If odor remains stable between scoops and your cat behavior is consistent, your system is working. Random spikes usually point to missed routine steps, not product failure.',
      },
    ],
    ctaTitle: 'Ready to Upgrade Your Litter Box Experience?',
    ctaDescription:
      "Try Purrify's activated carbon granules and transform any litter into an odor-eliminating system without relying on heavy fragrances.",
    readSuccessStoriesLabel: 'Read Success Stories',
    litterTypes: [
      {
        name: 'Clay Litter',
        pros: ['Affordable and widely available', 'Absorbs quickly', 'Familiar texture for many cats'],
        cons: ['High dust potential', 'Heavy to handle', 'Weak long-cycle odor control'],
        rating: 2,
        bestFor: 'Budget-first households testing litter preferences.',
        watchOut: 'Dust and odor rebound in warm or humid rooms.',
      },
      {
        name: 'Clumping Clay',
        pros: ['Forms scoopable clumps', 'Fast daily cleanup', 'Better urine isolation than non-clumping'],
        cons: ['Can still track heavily', 'Not biodegradable', 'Performance drops with shallow depth'],
        rating: 3,
        bestFor: 'Most households that can maintain a strict scoop routine.',
        watchOut: 'Needs stable fill depth to avoid broken clumps and floor adhesion.',
      },
      {
        name: 'Crystal / Silica',
        pros: ['Lower dust when quality is high', 'Good moisture management', 'Longer replacement interval'],
        cons: ['Higher cost', 'Some cats dislike texture', 'Odor handling varies by formula'],
        rating: 3,
        bestFor: 'Owners prioritizing lower dust and less frequent full changes.',
        watchOut: 'Monitor paw sensitivity and avoid abrupt transitions.',
      },
      {
        name: 'Natural / Biodegradable',
        pros: ['Plant or paper-based options', 'Often lighter to carry', 'Lower synthetic fragrance load'],
        cons: ['Clump quality varies widely', 'Can need more frequent resets', 'Performance differs by humidity'],
        rating: 4,
        bestFor: 'Eco-focused homes willing to test texture compatibility.',
        watchOut: 'Do not assume every natural formula controls odor equally.',
      },
      {
        name: 'Any Litter + Purrify Granules',
        pros: [
          'Boosts odor control without changing litter brand',
          'Works with existing maintenance routine',
          'Unscented source-control approach',
          'Can reduce premature full litter changes',
        ],
        cons: ['Adds a small recurring step', 'Needs dosage adjustment by cat count and humidity'],
        rating: 5,
        bestFor: 'Homes that want stable odor performance without constant litter switching.',
        watchOut: 'Apply in thin maintenance layers for best consistency.',
      },
    ],
    maintenanceTips: [
      {
        title: 'Daily Scooping',
        description:
          'Scoop morning and evening at fixed times. Consistency prevents odor spikes and gives you earlier warning when behavior changes.',
      },
      {
        title: 'Weekly Deep Clean',
        description:
          'Replace all litter weekly, wash the box with mild unscented soap, and dry fully before refilling to avoid residue buildup.',
      },
      {
        title: 'Use Purrify Granules',
        description:
          'Layer activated carbon granules through the week so odor adsorption stays active between major cleanings.',
      },
      {
        title: 'Monitor Health',
        description:
          'Track changes in frequency, volume, and behavior. Early detection of unusual patterns can prevent larger medical issues.',
      },
    ],
    commonProblems: [
      {
        problem: 'Strong odors even after scooping',
        solution:
          'Increase source control with activated carbon granules, confirm fill depth, and audit nearby fabrics for retained odor.',
        link: '/products/trial-size',
      },
      {
        problem: 'Litter tracking through the home',
        solution:
          'Use a larger textured mat, trim paw fur if needed, and avoid overfilling boxes above practical depth.',
        link: null,
      },
      {
        problem: 'Dust during pouring and scooping',
        solution:
          'Use lower-dust formulas, pour from lower height, and improve airflow during refill windows.',
        link: '/learn/safety',
      },
      {
        problem: 'Frequent full litter changes',
        solution:
          'Standardize scoop timing and additive refresh cycle to extend stable performance between complete resets.',
        link: '/learn/how-it-works',
      },
    ],
  },
  fr: {
    trialCtaPrefix: 'Envoyer Mon Essai GRATUIT',
    breadcrumbAriaLabel: 'Fil dAriane',
    homeSrOnly: 'Accueil',
    breadcrumbLearn: 'Apprendre',
    breadcrumbGuide: 'Guide de litiere',
    heroTitle: 'Le Guide Complet de la Litiere pour Chats',
    heroDescription:
      'Choisissez une litiere adaptee a votre chat avec une methode concrete pour reduire odeur, poussiere et entretien.',
    heroImageAlt: 'Installation moderne de bac a litiere avec differents types de litiere et outils dentretien',
    quickAnswerTitle: 'Reponse rapide',
    quickAnswerBody:
      'Pour la plupart des foyers, la base la plus fiable est une litiere agglomerante peu poussiereuse, un ramassage matin et soir, une profondeur stable, et un additif au charbon actif sans parfum en granules. Le resultat depend surtout de la methode et de la regularite, pas seulement de la marque inscrite sur le sac. Beaucoup de problemes d odeur viennent d une routine reactive: on intervient quand l odeur est deja installee au lieu de prevenir la saturation. Cette page vous donne une logique de decision concrete pour limiter les essais inutiles, reduire le temps de nettoyage, et garder une maison plus neutre jour apres jour.',
    tocTitle: 'Sommaire',
    tocItems: [
      { id: 'types', label: '1. Comparatif des litieres' },
      { id: 'selection-framework', label: '2. Methode de selection' },
      { id: 'setup-routine', label: '3. Installation et routine' },
      { id: 'maintenance', label: '4. Regles dentretien' },
      { id: 'maintenance-schedule', label: '5. Planning hebdomadaire' },
      { id: 'problems', label: '6. Problemes frequents' },
      { id: 'warning-signs', label: '7. Signaux dalerte' },
      { id: 'guide-faq', label: '8. FAQ' },
    ],
    litterTypesTitle: 'Comparatif des Types de Litiere',
    litterTypesDescription:
      'Chaque type de litiere a ses compromis. Comparez avant dacheter pour limiter essais et erreurs.',
    litterTypesDeepDiveTitle: 'Comment utiliser ce comparatif',
    litterTypesDeepDiveParagraphs: [
      'Le resultat final ne vient pas seulement de la formule de la litiere. Il depend du systeme complet: frequence de ramassage, profondeur constante, aeration autour du bac, et controle a la source des molecules d odeur. Une bonne litiere mal entretenue performe moins bien qu une litiere correcte avec un protocole stable.',
      'Evitez de juger une litiere sur les 24 premieres heures. Les impressions initiales sont souvent trompeuses, surtout si le produit contient du parfum. Faites plutot un test sur 14 jours avec des points de controle fixes: odeur le matin, odeur le soir, niveau de poussiere pendant le remplissage, et temps reel de nettoyage.',
      'Si votre chat accepte deja la texture actuelle, optimisez d abord la routine avant de changer de marque. Dans beaucoup de cas, un ajustement de profondeur, une meilleure repartition du ramassage, et une recharge reglee de granules de charbon actif donnent une amelioration plus durable qu un changement de produit toutes les semaines.',
    ],
    prosLabel: 'Avantages :',
    consLabel: 'Inconvenients :',
    bestForLabel: 'Ideal pour :',
    watchOutLabel: 'Attention :',
    sectionImageAlt: 'Differents types de litiere presentes pour comparaison',
    decisionFrameworkTitle: 'Methode en 5 etapes',
    decisionFrameworkIntro:
      'Cette methode aide a choisir la bonne litiere selon les contraintes reelles du foyer: sensibilite du chat, nombre de bacs possibles, temps disponible, humidite de la piece et niveau d odeur acceptable. L objectif est de reduire les decisions au hasard et de construire un systeme stable qui reste performant au dela des premiers jours.',
    decisionSteps: [
      {
        title: 'Etape 1: partir de la preference du chat',
        description:
          'Texture, parfum et proprete influencent directement l acceptance du bac. Un changement brutal vers une texture inhabituelle peut provoquer de l evitement meme si la litiere semble plus performante sur le papier. Conservez une base proche des habitudes de votre chat, puis optimisez progressivement.',
        checklist: ['Respecter la texture habituelle', 'Eviter parfum fort', 'Transition sur 7 a 10 jours', 'Observer la frequence'],
      },
      {
        title: 'Etape 2: definir des objectifs mesurables',
        description:
          'Mesurez odeur, poussiere et temps d entretien pour comparer objectivement. Sans objectif quantifie, chaque nouveau sac parait meilleur pendant deux jours puis deçoit. Fixer des indicateurs simples vous evite de confondre effet parfum et vrai controle de fond.',
        checklist: ['2 objectifs clairs', 'Controle matin et soir', 'Suivi poussiere', 'Suivi temps de nettoyage'],
      },
      {
        title: 'Etape 3: adapter au nombre de chats',
        description:
          'Les foyers multi-chats saturent plus vite et demandent un rythme plus strict. La charge en ammoniac augmente rapidement, surtout dans les petits espaces. Il faut donc renforcer la taille des bacs, la frequence de ramassage, et la regularite du controle a la source.',
        checklist: ['Bacs plus grands', 'Ramassage plus frequent', 'Faible poussiere', 'Granules charbon actif'],
      },
      {
        title: 'Etape 4: stabiliser la routine',
        description:
          'Une routine stable previent les pics d odeur et reduit les corrections d urgence. Le ramassage a horaires fixes est plus efficace qu un grand nettoyage occasionnel. Une fois la cadence stabilisee, les resultats deviennent plus previsibles et les interventions lourdes diminuent.',
        checklist: ['Horaires fixes', 'Profondeur constante', 'Reset hebdomadaire', 'Remplacement des bacs uses'],
      },
      {
        title: 'Etape 5: renforcer le controle a la source',
        description:
          'Les granules de charbon actif sans parfum renforcent les performances entre deux resets en adsorbant les molecules d odeur au lieu de les masquer. Une application en couches fines, reajustee selon humidite et nombre de chats, est generalement plus stable qu une seule application massive.',
        checklist: ['Couches fines', 'Recharge reguliere', 'Ajuster selon humidite', 'Eviter parfum agressif'],
      },
    ],
    maintenanceTitle: 'Conseils dEntretien Essentiels',
    maintenanceDescription:
      'La qualite de la routine quotidienne influence plus le resultat que la marque seule.',
    maintenanceImageAlt: 'Proprietaire de chat effectuant un entretien correct du bac a litiere',
    setupTitle: 'Installation recommandee',
    setupParagraphs: [
      'Choisissez un bac assez grand pour que le chat puisse tourner completement sans toucher les parois. Un bac trop court augmente les depots en bordure, le tracking et les projections hors zone. Une bonne dimension de depart facilite aussi la stabilite des clumps et reduit les zones de saturation.',
      'Placez la zone litiere dans un espace calme, accessible et correctement ventile. Un coin trop confine accelere l accumulation d humidite et renforce la perception d odeur, surtout en appartement. Si la piece est petite, compensez par un protocole de ramassage plus strict et une surveillance plus frequente.',
      'Maintenez une profondeur reguliere pour une agglomeration stable. Trop peu de matiere expose le fond du bac, trop de matiere fragilise parfois le ramassage et augmente la dispersion. Reajuster la profondeur apres chaque passage est une action simple qui change fortement la regularite de resultat.',
      'En multi-chats, augmentez le nombre de bacs et la frequence de ramassage. La regle pratique reste un bac par chat plus un. Quand l espace est limite, conservez au moins deux zones distinctes et compensez par des horaires de nettoyage fixes pour limiter la pression sur un seul point.',
      'Evitez les parfums forts si votre objectif est un controle durable. Le parfum peut masquer temporairement mais ne remplace pas la suppression a la source. Une strategie basee sur la routine, l aeration et les granules de charbon actif sans parfum est generalement plus stable et mieux toleree.',
      'Nettoyez chaque semaine les surfaces proches: tapis, plinthes, tissus et contours du bac. Une partie des odeurs percue vient de residus hors bac, pas de la litiere elle-meme. Sans ce nettoyage peripherique, la perception globale reste elevee meme quand la litiere est correcte.',
      'Planifiez un controle mensuel de l etat du bac. Le plastique use peut retenir des odeurs dans les micro-rayures et degradations de surface. Remplacer le bac au bon moment evite des semaines d ajustements inutiles sur la routine ou la formule de litiere.',
      'Documentez vos changements. Notez ce que vous modifiez, quand vous le modifiez, et comment evoluent odeur, poussiere et comportement. Cette trace transforme l entretien en processus pilotable au lieu d une suite d essais aleatoires.',
    ],
    maintenanceScheduleTitle: 'Planning simple et efficace',
    maintenanceScheduleDescription:
      'Un planning stable maintient la fraicheur et reduit les retours d odeur. L idee n est pas de nettoyer plus fort, mais de nettoyer au bon moment avec la bonne cadence. Ce cadre est concu pour etre realiste dans un foyer actif et rester efficace sur plusieurs semaines.',
    frequencyLabel: 'Frequence',
    taskLabel: 'Action',
    reasonLabel: 'Pourquoi',
    maintenanceSchedule: [
      { frequency: '2 fois / jour', task: 'Ramassage des dechets', reason: 'Limiter laccumulation dammoniaque' },
      { frequency: 'Tous les jours', task: 'Ajuster la profondeur', reason: 'Conserver une bonne agglomeration' },
      { frequency: 'Tous les 2-3 jours', task: 'Recharger en granules', reason: 'Maintenir ladsorption' },
      { frequency: 'Hebdomadaire', task: 'Reset complet + lavage', reason: 'Reduire charge bacterienne' },
      { frequency: 'Hebdomadaire', task: 'Laver tapis et textiles', reason: 'Eviter odeurs residuelles' },
      { frequency: 'Mensuel', task: 'Verifier zone autour du bac', reason: 'Detecter projections oubliees' },
      { frequency: '6-12 mois', task: 'Remplacer bacs uses', reason: 'Limiter retention dodeur du plastique' },
    ],
    problemsTitle: 'Problemes Courants et Solutions',
    problemsDescription:
      'Traitez les problemes de litiere comme un systeme complet: routine, profondeur, aeration, et source control.',
    problemLabel: 'Probleme :',
    solutionLabel: 'Solution :',
    learnMoreLabel: 'En savoir plus',
    solutionImageAlt: 'Foyer avec plusieurs chats dans un environnement propre et sans odeur',
    warningSignsTitle: 'Signaux a surveiller',
    warningSignsDescription:
      'Certaines difficultes de litiere peuvent signaler un probleme de sante et ne doivent pas etre traitees uniquement comme un sujet de produit. Si un changement est brutal, douloureux ou persistant, priorisez une evaluation veterinaire. Une intervention precoce evite des complications et clarifie rapidement la part medicale versus comportementale.',
    warningSigns: [
      { sign: 'Visites frequentes avec peu durine', action: 'Contact veterinaire rapide, surtout chez le male.' },
      { sign: 'Refus soudain du bac', action: 'Verifier douleur ou infection avant changement de litiere.' },
      { sign: 'Miaulements ou effort a la miction', action: 'Consultation le jour meme.' },
      { sign: 'Hausse nette de soif et mictions', action: 'Suivi et bilan medical conseille.' },
      { sign: 'Toux autour de la litiere', action: 'Passer a faible poussiere et ameliorer aeration.' },
      { sign: 'Odeur dammoniaque tres rapide', action: 'Verifier environnement + renforcer controle a la source.' },
    ],
    relatedGuidesTitle: 'Guides associes',
    relatedGuidesDescription:
      'Ces pages complementaires vous aident a traiter les cas particuliers: environnement sensible, questions de securite, ou analyse plus scientifique des odeurs.',
    relatedGuides: [
      { label: 'Comment fonctionne le charbon actif', url: '/learn/how-it-works/' },
      { label: 'Informations de securite', url: '/learn/safety/' },
      { label: 'Science des odeurs et de l ammoniac', url: '/learn/science/' },
      { label: 'FAQ et depannage', url: '/learn/faq/' },
    ],
    externalResourcesTitle: 'Ressources externes',
    externalResourcesDescription:
      'Ces references independantes peuvent aider a verifier les bonnes pratiques de gestion de bac, les signaux comportementaux et les points de vigilance veterinaire.',
    externalResources: [
      { label: 'ASPCA - Common Cat Behavior Issues: Litter Box Problems', url: 'https://www.aspca.org/pet-care/cat-care/common-cat-behavior-issues/litter-box-problems' },
      { label: 'AAFP Cat Friendly Practice Guidance', url: 'https://catvets.com/guidelines' },
      { label: 'Cornell Feline Health Center', url: 'https://www.vet.cornell.edu/departments/riney-canine-health-center/feline-health-topics' },
    ],
    faqTitle: 'Questions frequentes',
    faqItems: [
      {
        question: 'Quelle frequence de changement complet?',
        answer:
          'Pour de nombreux foyers avec un chat, un reset complet hebdomadaire fonctionne bien. En multi-chats, en periode chaude, ou avec ventilation limitee, la frequence doit souvent etre raccourcie. Le meilleur indicateur n est pas la date seule, mais la stabilite d odeur entre deux ramassages et la qualite des clumps.',
      },
      {
        question: 'Lagglomerante est-elle toujours meilleure?',
        answer:
          'Elle est souvent plus pratique car elle facilite le retrait rapide des zones souillees. Mais elle ne garantit pas a elle seule un bon controle d odeur. Le resultat depend du systeme complet: profondeur, rythme de ramassage, aeration, et controle a la source par granules de charbon actif sans parfum.',
      },
      {
        question: 'Puis-je melanger plusieurs litieres?',
        answer:
          'Oui, mais avec une transition progressive et une observation rigoureuse. Certaines combinaisons degradent la cohesion des clumps ou reduisent l acceptance du chat. Testez sur 10 a 14 jours avec un journal simple: frequence d usage, odeur, poussiere et temps de nettoyage.',
      },
      {
        question: 'Comment reduire la poussiere?',
        answer:
          'Choisissez une formule faible poussiere, versez plus lentement et reduisez la hauteur de versement. Aerez la piece pendant le remplissage et evitez les gestes brusques au tamisage. Si la sensibilite respiratoire est presente, priorisez regularite de petites recharges plutot qu un gros ajout ponctuel.',
      },
      {
        question: 'Bac couvert ou ouvert?',
        answer:
          'Le bac couvert peut limiter la diffusion immediate mais peut aussi concentrer humidite et odeur a l interieur. Certains chats l acceptent tres bien, d autres non. Le choix doit se faire sur comportement observe, qualite de nettoyage et ventilation reelle de la zone.',
      },
      {
        question: 'Comment verifier que le systeme fonctionne?',
        answer:
          'Utilisez un controle objectif sur deux semaines: odeur a horaires fixes, suivi du tracking, qualite des clumps, et comportement du chat. Si ces indicateurs restent stables, votre systeme est solide. Si des pics reviennent, ajustez la cadence avant de changer de produit.',
      },
    ],
    ctaTitle: 'Pret a Ameliorer Votre Experience de Litiere?',
    ctaDescription:
      'Essayez les granules de charbon actif Purrify pour renforcer votre routine sans parfum agressif.',
    readSuccessStoriesLabel: 'Lire les temoignages',
    litterTypes: [
      {
        name: 'Litiere en argile',
        pros: ['Abordable', 'Bonne absorption', 'Facile a trouver'],
        cons: ['Poussiereuse', 'Lourde', 'Controle des odeurs limite'],
        rating: 2,
        bestFor: 'Foyers avec budget serre.',
        watchOut: 'Poussiere et odeur en environnement chaud/humide.',
      },
      {
        name: 'Argile agglomerante',
        pros: ['Blocs solides', 'Ramassage facile', 'Meilleur controle'],
        cons: ['Toujours poussiereuse', 'Lourde', 'Non biodegradable'],
        rating: 3,
        bestFor: 'Routine reguliere avec ramassage strict.',
        watchOut: 'Profondeur instable = blocs fragiles.',
      },
      {
        name: 'Cristaux/Silice',
        pros: ['Bonne absorption', 'Peu de poussiere', 'Longue duree'],
        cons: ['Couteuse', 'Texture parfois refusee', 'Non jetable'],
        rating: 3,
        bestFor: 'Priorite faible poussiere.',
        watchOut: 'Verifier tolerance des pattes.',
      },
      {
        name: 'Naturelle/Biodegradable',
        pros: ['Base vegetale', 'Poids reduit', 'Option faible parfum'],
        cons: ['Qualite variable', 'Reset parfois plus frequent', 'Clumping inegal'],
        rating: 4,
        bestFor: 'Foyers eco-responsables.',
        watchOut: 'Tester en conditions reelles sur 14 jours.',
      },
      {
        name: 'Toute litiere + Purrify Granules',
        pros: ['Meilleur controle source', 'Compatible routine existante', 'Sans parfum', 'Performance plus stable'],
        cons: ['Etape supplementaire', 'Dosage a ajuster'],
        rating: 5,
        bestFor: 'Foyers cherchant stabilite sans changer de marque.',
        watchOut: 'Appliquer en couches fines et regulieres.',
      },
    ],
    maintenanceTips: [
      {
        title: 'Ramassage quotidien',
        description: 'Matin et soir a horaires fixes pour limiter laccumulation dodeur.',
      },
      {
        title: 'Nettoyage hebdomadaire',
        description: 'Reset complet et lavage doux pour reduire residues et bacteries.',
      },
      {
        title: 'Utiliser Purrify Granules',
        description: 'Recharge reguliere pour maintenir ladsorption entre deux resets.',
      },
      {
        title: 'Surveiller la sante',
        description: 'Observer les changements de comportement urinaire et agir rapidement.',
      },
    ],
    commonProblems: [
      {
        problem: 'Odeurs fortes',
        solution: 'Renforcer controle source, verifier profondeur et routine de ramassage.',
        link: '/products/trial-size',
      },
      {
        problem: 'Litiere qui se disperse',
        solution: 'Tapis plus grand, ajustement de profondeur, entretien des zones autour.',
        link: null,
      },
      {
        problem: 'Problemes de poussiere',
        solution: 'Formule faible poussiere, versage lent, meilleure ventilation.',
        link: '/learn/safety',
      },
      {
        problem: 'Changements trop frequents',
        solution: 'Planifier routine + recharge granules pour stabiliser la performance.',
        link: '/learn/how-it-works',
      },
    ],
  },
};
