export interface LitterTypeItem {
  name: string;
  pros: string[];
  cons: string[];
  rating: number;
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

export interface GuideCopy {
  trialCtaPrefix: string;
  breadcrumbAriaLabel: string;
  homeSrOnly: string;
  breadcrumbLearn: string;
  breadcrumbGuide: string;
  heroTitle: string;
  heroDescription: string;
  heroImageAlt: string;
  litterTypesTitle: string;
  litterTypesDescription: string;
  prosLabel: string;
  consLabel: string;
  sectionImageAlt: string;
  maintenanceTitle: string;
  maintenanceDescription: string;
  maintenanceImageAlt: string;
  problemsTitle: string;
  problemsDescription: string;
  problemLabel: string;
  solutionLabel: string;
  learnMoreLabel: string;
  solutionImageAlt: string;
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
    heroDescription: 'Everything you need to know about choosing, using, and maintaining cat litter for a happy, healthy home',
    heroImageAlt: 'Modern cat litter box setup showing different litter types and maintenance tools',
    litterTypesTitle: 'Cat Litter Types Compared',
    litterTypesDescription: "Not all litters are created equal. Here's how different types stack up against each other.",
    prosLabel: 'Pros:',
    consLabel: 'Cons:',
    sectionImageAlt: 'Various cat litter types displayed for comparison',
    maintenanceTitle: 'Essential Maintenance Tips',
    maintenanceDescription: 'Keep your litter box fresh and your cat happy with these proven maintenance practices.',
    maintenanceImageAlt: 'Cat owner performing proper litter box maintenance routine',
    problemsTitle: 'Common Problems & Solutions',
    problemsDescription: 'Facing litter box issues? Here are the most common problems and their proven solutions.',
    problemLabel: 'Problem:',
    solutionLabel: 'Solution:',
    learnMoreLabel: 'Learn More',
    solutionImageAlt: 'Happy multi-cat household with clean, odor-free environment',
    ctaTitle: 'Ready to Upgrade Your Litter Box Experience?',
    ctaDescription: "Try Purrify's activated carbon additive and transform any litter into an odor-eliminating powerhouse.",
    readSuccessStoriesLabel: 'Read Success Stories',
    litterTypes: [
      { name: 'Clay Litter', pros: ['Affordable', 'Good absorption', 'Easy to find'], cons: ['Dusty', 'Heavy', 'Not biodegradable', 'Poor odor control'], rating: 2 },
      { name: 'Clumping Clay', pros: ['Forms solid clumps', 'Easy scooping', 'Better odor control'], cons: ['Still dusty', 'Heavy', 'Can be tracked', 'Not biodegradable'], rating: 3 },
      { name: 'Crystal/Silica', pros: ['Excellent absorption', 'Low dust', 'Long-lasting'], cons: ['Expensive', 'Sharp crystals', 'Not flushable'], rating: 3 },
      { name: 'Natural/Biodegradable', pros: ['Plant- or paper-based', 'Low dust', 'Flushable options'], cons: ['More expensive', 'Variable quality', 'May need frequent changes'], rating: 4 },
      { name: 'Any Litter + Purrify', pros: ['Superior odor elimination', 'Extends litter life', 'Works with any type', 'Fragrance-free additive'], cons: ['Additional cost (but saves money overall)'], rating: 5 },
    ],
    maintenanceTips: [
      { title: 'Daily Scooping', description: 'Remove solid waste daily to maintain freshness and prevent odor buildup.' },
      { title: 'Weekly Deep Clean', description: 'Replace all litter weekly and wash the box with mild soap and water.' },
      { title: 'Use Purrify', description: 'Add Purrify activated carbon to eliminate odors and extend litter life by up to 50%.' },
      { title: 'Monitor Health', description: "Watch for changes in your cat's bathroom habits as they can indicate health issues." },
    ],
    commonProblems: [
      { problem: 'Strong Odors', solution: 'Add Purrify activated carbon additive for superior odor elimination', link: '/products/trial-size' },
      { problem: 'Litter Tracking', solution: 'Use a larger litter mat and consider switching to low-tracking litter types', link: null },
      { problem: 'Dust Issues', solution: 'Choose low-dust litters and pour slowly to minimize airborne particles', link: null },
      { problem: 'Frequent Changes', solution: 'Purrify extends litter life by neutralizing odors, reducing waste and costs', link: '/learn/how-it-works' },
    ],
  },
  fr: {
    trialCtaPrefix: 'Envoyer Mon Essai GRATUIT',
    breadcrumbAriaLabel: "Fil d'Ariane",
    homeSrOnly: 'Accueil',
    breadcrumbLearn: 'Apprendre',
    breadcrumbGuide: 'Guide de litiere',
    heroTitle: 'Le Guide Complet de la Litiere pour Chats',
    heroDescription: 'Tout ce que vous devez savoir pour choisir, utiliser et entretenir la litiere pour un foyer sain et heureux',
    heroImageAlt: 'Installation moderne de bac a litiere avec differents types de litiere et outils dentretien',
    litterTypesTitle: 'Comparatif des Types de Litiere',
    litterTypesDescription: 'Toutes les litieres ne se valent pas. Voici comment les principaux types se comparent.',
    prosLabel: 'Avantages :',
    consLabel: 'Inconvenients :',
    sectionImageAlt: 'Differents types de litiere presentes pour comparaison',
    maintenanceTitle: 'Conseils dEntretien Essentiels',
    maintenanceDescription: 'Gardez votre bac frais et votre chat heureux avec ces pratiques dentretien.',
    maintenanceImageAlt: 'Proprietaire de chat effectuant un entretien correct du bac a litiere',
    problemsTitle: 'Problemes Courants et Solutions',
    problemsDescription: 'Vous avez des problemes de litiere? Voici les plus frequents avec des solutions concretes.',
    problemLabel: 'Probleme :',
    solutionLabel: 'Solution :',
    learnMoreLabel: 'En savoir plus',
    solutionImageAlt: 'Foyer avec plusieurs chats dans un environnement propre et sans odeur',
    ctaTitle: 'Pret a Ameliorer Votre Experience de Litiere?',
    ctaDescription: 'Essayez ladditif au charbon actif Purrify et transformez nimporte quelle litiere en solution anti-odeur.',
    readSuccessStoriesLabel: 'Lire les temoignages',
    litterTypes: [
      { name: 'Litiere en argile', pros: ['Abordable', 'Bonne absorption', 'Facile a trouver'], cons: ['Poussiereuse', 'Lourde', 'Non biodegradable', 'Controle des odeurs limite'], rating: 2 },
      { name: 'Argile agglomerante', pros: ['Forme des blocs solides', 'Ramassage facile', 'Meilleur controle des odeurs'], cons: ['Toujours poussiereuse', 'Lourde', 'Peut se disperser', 'Non biodegradable'], rating: 3 },
      { name: 'Cristaux/Silice', pros: ['Excellente absorption', 'Peu de poussiere', 'Longue duree'], cons: ['Couteuse', 'Cristaux parfois pointus', 'Non jetable aux toilettes'], rating: 3 },
      { name: 'Naturelle/Biodegradable', pros: ['Base vegetale ou papier', 'Faible poussiere', 'Certaines options jetables'], cons: ['Plus chere', 'Qualite variable', 'Changement parfois plus frequent'], rating: 4 },
      { name: 'Toute litiere + Purrify', pros: ['Elimination superieure des odeurs', 'Prolonge la duree de la litiere', 'Compatible avec tout type', 'Additif sans parfum'], cons: ['Cout additionnel (mais economies globales)'], rating: 5 },
    ],
    maintenanceTips: [
      { title: 'Ramassage quotidien', description: 'Retirez les dechets solides chaque jour pour conserver la fraicheur et limiter les odeurs.' },
      { title: 'Nettoyage hebdomadaire', description: 'Remplacez toute la litiere chaque semaine et lavez le bac avec un savon doux.' },
      { title: 'Utiliser Purrify', description: 'Ajoutez du charbon actif Purrify pour eliminer les odeurs et prolonger la duree de vie de la litiere.' },
      { title: 'Surveiller la sante', description: 'Observe les changements dhabitudes de toilette de votre chat, ils peuvent indiquer un probleme de sante.' },
    ],
    commonProblems: [
      { problem: 'Odeurs fortes', solution: 'Ajoutez ladditif au charbon actif Purrify pour une elimination superieure des odeurs', link: '/products/trial-size' },
      { problem: 'Litiere qui se disperse', solution: 'Utilisez un tapis plus grand et envisagez une litiere a faible dispersion', link: null },
      { problem: 'Problemes de poussiere', solution: 'Choisissez des litieres peu poussiereuses et versez lentement pour limiter les particules', link: null },
      { problem: 'Changements trop frequents', solution: 'Purrify prolonge la duree de la litiere en neutralisant les odeurs, ce qui reduit dechets et couts', link: '/learn/how-it-works' },
    ],
  },
};
