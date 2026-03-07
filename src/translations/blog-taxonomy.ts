import type { Locale } from '@/i18n/config';
import type {
  CanonicalCategorySlug,
  CanonicalTagSlug,
  CanonicalTaxonomySlug,
  TaxonomyKind,
} from '@/lib/blog/taxonomy';

export interface TaxonomyFaqItem {
  question: string;
  answer: string;
}

interface TaxonomyTermCopy {
  label: string;
  description: string;
}

interface TaxonomyPageStrings {
  backToBlog: string;
  articleCount: (count: number) => string;
  featuredTitle: string;
  latestTitle: string;
  latestEmpty: string;
  readArticle: string;
  keyGuidesTitle: string;
  faqTitle: string;
  relatedCategoriesTitle: string;
  relatedTagsTitle: string;
  browseCategory: string;
  browseTag: string;
  categoryEyebrow: string;
  tagEyebrow: string;
  updatedLabel: string;
  minRead: string;
}

interface TaxonomyLocaleCopy {
  ui: TaxonomyPageStrings;
  category: Record<CanonicalCategorySlug, TaxonomyTermCopy>;
  tag: Record<CanonicalTagSlug, TaxonomyTermCopy>;
}

const COPY: Record<Locale, TaxonomyLocaleCopy> = {
  en: {
    ui: {
      backToBlog: 'Back to Blog',
      articleCount: (count) => `${count} article${count === 1 ? '' : 's'}`,
      featuredTitle: 'Featured Posts',
      latestTitle: 'More in This Hub',
      latestEmpty: 'No additional articles yet.',
      readArticle: 'Read Article',
      keyGuidesTitle: 'Key Guides',
      faqTitle: 'Frequently Asked Questions',
      relatedCategoriesTitle: 'Related Categories',
      relatedTagsTitle: 'Related Tags',
      browseCategory: 'Browse category',
      browseTag: 'Browse tag',
      categoryEyebrow: 'Blog Category',
      tagEyebrow: 'Blog Tag',
      updatedLabel: 'Updated',
      minRead: 'min read',
    },
    category: {
      'odor-control': {
        label: 'Odor Control',
        description: 'Strategies, product comparisons, and science-backed guidance for eliminating litter box odor.',
      },
      'science-education': {
        label: 'Science & Education',
        description: 'Evidence-based explainers on ammonia, activated carbon, and the chemistry behind litter box smell.',
      },
      'buying-guide': {
        label: 'Buying Guide',
        description: 'Hands-on comparisons and shortlist guides for choosing the right litter, box, or deodorizer.',
      },
      'apartment-living': {
        label: 'Apartment Living',
        description: 'Small-space odor control advice for apartments, condos, studios, and homes with limited airflow.',
      },
      'product-reviews': {
        label: 'Product Reviews',
        description: 'Review-style breakdowns of litter boxes, litter types, and odor-control options.',
      },
      'tips-advice': {
        label: 'Tips & Advice',
        description: 'Practical routines, cleanup habits, and setup tips that keep cat homes fresher day to day.',
      },
      'cat-care': {
        label: 'Cat Care',
        description: 'Guidance that connects litter box odor issues with cat routines, comfort, and behavior.',
      },
      'product-guides': {
        label: 'Product Guides',
        description: 'Step-by-step guidance for choosing, using, and comparing odor-control products.',
      },
      'cat-health': {
        label: 'Cat Health',
        description: 'Health-focused advice for sensitive cats, fragrance-free setups, and safer litter box routines.',
      },
      'how-to': {
        label: 'How-To',
        description: 'Actionable, step-by-step fixes for common litter box odor problems.',
      },
      'product-comparison': {
        label: 'Product Comparison',
        description: 'Head-to-head breakdowns of product types, ingredients, and odor-control approaches.',
      },
      'multi-cat': {
        label: 'Multi-Cat',
        description: 'Odor-control planning for homes where multiple cats intensify litter box traffic and ammonia load.',
      },
      'litter-boxes': {
        label: 'Litter Boxes',
        description: 'Advice focused on box styles, placement, and enclosure decisions that affect odor spread.',
      },
      'seasonal-odor-control': {
        label: 'Seasonal Odor Control',
        description: 'Season-specific odor control guidance for heat, humidity, closed-window winters, and airflow changes.',
      },
      'eco-friendly': {
        label: 'Eco-Friendly',
        description: 'Low-perfume, lower-waste, and natural-litter guidance for eco-conscious cat households.',
      },
      'us-customers': {
        label: 'US Customers',
        description: 'Buying and odor-control guidance tailored to shoppers and households in the United States.',
      },
      'cat-litter': {
        label: 'Cat Litter',
        description: 'Core litter-type education covering clumping, natural, crystal, and specialty litters.',
      },
      'cat-safety': {
        label: 'Cat Safety',
        description: 'Safety-first guidance for choosing cat-safe deodorizing methods and avoiding harsh additives.',
      },
      'kitten-care': {
        label: 'Kitten Care',
        description: 'Litter box and deodorizer guidance tailored to kittens and early litter box habits.',
      },
    },
    tag: {
      'activated-carbon': {
        label: 'Activated Carbon',
        description: 'Posts that explain how activated carbon traps odor molecules and where it fits into litter routines.',
      },
      'cat-litter': {
        label: 'Cat Litter',
        description: 'Articles about litter formats, materials, and how litter choice affects odor performance.',
      },
      'odor-elimination': {
        label: 'Odor Elimination',
        description: 'Guides focused on actually removing litter box odor instead of masking it with fragrance.',
      },
      'multi-cat': {
        label: 'Multi-Cat Households',
        description: 'Posts for households where more cats mean stronger odor load, heavier use, and tighter routines.',
      },
      'apartment-living': {
        label: 'Apartment Living',
        description: 'Advice for keeping smaller spaces fresh when the litter box is close to everyday living areas.',
      },
      'eco-friendly': {
        label: 'Eco-Friendly',
        description: 'Natural-litter, lower-waste, and ingredient-conscious posts for eco-minded cat owners.',
      },
      'pet-care': {
        label: 'Pet Care',
        description: 'Cat comfort, safety, and sensitivity considerations tied to litter box odor control.',
      },
      'cleaning-tips': {
        label: 'Cleaning Tips',
        description: 'Maintenance routines, cleaning workflows, and setup changes that reduce odor buildup.',
      },
      'ammonia-control': {
        label: 'Ammonia Control',
        description: 'Posts centered on ammonia smell, why it spikes, and how to reduce it before it spreads.',
      },
      'unscented-litter': {
        label: 'Unscented Litter',
        description: 'Fragrance-free litter and deodorizer advice for sensitive cats and scent-averse households.',
      },
      'litter-boxes': {
        label: 'Litter Boxes',
        description: 'Posts about box design, placement, and hardware choices that change odor performance.',
      },
    },
  },
  fr: {
    ui: {
      backToBlog: 'Retour au blog',
      articleCount: (count) => `${count} article${count === 1 ? '' : 's'}`,
      featuredTitle: 'Articles en vedette',
      latestTitle: 'Plus dans cette page',
      latestEmpty: 'Aucun autre article pour le moment.',
      readArticle: 'Lire l’article',
      keyGuidesTitle: 'Guides clés',
      faqTitle: 'Questions fréquentes',
      relatedCategoriesTitle: 'Catégories liées',
      relatedTagsTitle: 'Tags liés',
      browseCategory: 'Voir la catégorie',
      browseTag: 'Voir le tag',
      categoryEyebrow: 'Catégorie du blog',
      tagEyebrow: 'Tag du blog',
      updatedLabel: 'Mis à jour',
      minRead: 'min de lecture',
    },
    category: {
      'odor-control': {
        label: 'Contrôle des odeurs',
        description: 'Conseils, comparatifs et explications pratiques pour éliminer les odeurs de litière.',
      },
      'science-education': {
        label: 'Science et éducation',
        description: 'Explications fondées sur les preuves au sujet de l’ammoniac, du charbon actif et de la chimie des odeurs.',
      },
      'buying-guide': {
        label: 'Guide d’achat',
        description: 'Comparatifs et sélections pour choisir la bonne litière, le bon bac ou le bon désodorisant.',
      },
      'apartment-living': {
        label: 'Vie en appartement',
        description: 'Conseils de contrôle des odeurs pour les petits espaces, studios et logements peu ventilés.',
      },
      'product-reviews': {
        label: 'Évaluations de produits',
        description: 'Analyses de bacs, de litières et de solutions anti-odeurs.',
      },
      'tips-advice': {
        label: 'Conseils et astuces',
        description: 'Habitudes, routines et ajustements pratiques pour garder la maison plus fraîche au quotidien.',
      },
      'cat-care': {
        label: 'Soins pour chats',
        description: 'Conseils qui relient les problèmes d’odeur de litière au confort et au comportement du chat.',
      },
      'product-guides': {
        label: 'Guides produits',
        description: 'Guides pratiques pour choisir, utiliser et comparer les produits de contrôle des odeurs.',
      },
      'cat-health': {
        label: 'Santé des chats',
        description: 'Conseils orientés santé pour les chats sensibles et les routines sans parfum.',
      },
      'how-to': {
        label: 'Guide pratique',
        description: 'Méthodes étape par étape pour corriger les problèmes courants d’odeur de litière.',
      },
      'product-comparison': {
        label: 'Comparaison de produits',
        description: 'Comparatifs directs entre produits, ingrédients et approches de contrôle des odeurs.',
      },
      'multi-cat': {
        label: 'Foyers multi-chats',
        description: 'Organisation anti-odeurs pour les maisons où plusieurs chats augmentent le trafic et l’ammoniac.',
      },
      'litter-boxes': {
        label: 'Bacs à litière',
        description: 'Conseils sur les modèles de bacs, le placement et les boîtiers qui changent la diffusion des odeurs.',
      },
      'seasonal-odor-control': {
        label: 'Contrôle des odeurs saisonnier',
        description: 'Conseils pour l’été, l’humidité, l’hiver fenêtres fermées et les changements de ventilation.',
      },
      'eco-friendly': {
        label: 'Écologique',
        description: 'Conseils sur les litières naturelles, les routines plus sobres et les choix à faible parfum.',
      },
      'us-customers': {
        label: 'Clients États-Unis',
        description: 'Conseils d’achat et de contrôle des odeurs adaptés aux foyers et clients américains.',
      },
      'cat-litter': {
        label: 'Litière pour chat',
        description: 'Guides sur les types de litière: agglomérante, naturelle, cristaux et options spécialisées.',
      },
      'cat-safety': {
        label: 'Sécurité du chat',
        description: 'Conseils pour choisir des méthodes désodorisantes sûres et éviter les additifs agressifs.',
      },
      'kitten-care': {
        label: 'Soins des chatons',
        description: 'Conseils de litière et de désodorisation adaptés aux chatons et à leurs premières habitudes.',
      },
    },
    tag: {
      'activated-carbon': {
        label: 'Charbon actif',
        description: 'Articles qui expliquent comment le charbon actif piège les molécules d’odeur dans la litière.',
      },
      'cat-litter': {
        label: 'Litière pour chat',
        description: 'Articles sur les matériaux de litière et leur impact sur le contrôle des odeurs.',
      },
      'odor-elimination': {
        label: 'Élimination des odeurs',
        description: 'Guides axés sur l’élimination des odeurs plutôt que sur leur simple masquage.',
      },
      'multi-cat': {
        label: 'Foyers multi-chats',
        description: 'Articles pour les foyers où plusieurs chats renforcent l’odeur et la charge d’entretien.',
      },
      'apartment-living': {
        label: 'Vie en appartement',
        description: 'Conseils pour garder un petit espace frais lorsque le bac est proche des pièces de vie.',
      },
      'eco-friendly': {
        label: 'Écologique',
        description: 'Articles sur les litières naturelles, les ingrédients plus sobres et les routines à faible déchet.',
      },
      'pet-care': {
        label: 'Soins des animaux',
        description: 'Conseils liés au confort, à la sécurité et aux sensibilités du chat autour de la litière.',
      },
      'cleaning-tips': {
        label: 'Conseils de nettoyage',
        description: 'Routines d’entretien et gestes de nettoyage qui limitent l’accumulation d’odeurs.',
      },
      'ammonia-control': {
        label: 'Contrôle de l’ammoniac',
        description: 'Articles centrés sur l’odeur d’ammoniac, ses causes et les moyens de la réduire.',
      },
      'unscented-litter': {
        label: 'Litière sans parfum',
        description: 'Conseils sans parfum pour les chats sensibles et les foyers qui évitent les odeurs artificielles.',
      },
      'litter-boxes': {
        label: 'Bacs à litière',
        description: 'Articles sur les choix de bac, de capot et de placement qui changent la gestion des odeurs.',
      },
    },
  },
};

const INTRO_OVERRIDES: Partial<Record<Locale, Partial<Record<TaxonomyKind, Partial<Record<CanonicalTaxonomySlug, string[]>>>>>> = {
  en: {
    category: {
      'odor-control': [
        'This hub pulls together Purrify’s best odor-control content into one place, from quick odor fixes to longer-form product comparisons and ammonia explainers.',
        'If you are trying to make litter smell disappear instead of covering it up, start with the featured posts below and then use the related modules to narrow into ammonia, apartments, multi-cat homes, or litter type decisions.',
      ],
      'apartment-living': [
        'Apartment odor problems escalate faster because the litter box sits closer to bedrooms, kitchens, and HVAC return paths.',
        'This hub collects the apartment-specific guides that matter most: placement, airflow, litter choice, ammonia control, and fragrance-free routines that work in smaller spaces.',
      ],
      'multi-cat': [
        'Multi-cat homes create a heavier odor load, faster ammonia buildup, and less room for inconsistent scooping routines.',
        'Use this hub to compare litter choices, deodorizer strategies, and maintenance rhythms that hold up when more than one cat shares the same air.',
      ],
    },
    tag: {
      'activated-carbon': [
        'Activated carbon is the core technology behind Purrify’s odor-control approach, and this hub groups every post that explains how it works in real litter box conditions.',
        'Use it when you want the science, safety context, and product-comparison content that connects adsorption theory to daily litter box performance.',
      ],
      'ammonia-control': [
        'Ammonia is the sharp smell most cat owners notice first, and it is usually the clearest sign that litter odor is no longer staying contained.',
        'These articles focus on what causes ammonia spikes, how litter choice changes the outcome, and which routines reduce that smell before it spreads through the room.',
      ],
    },
  },
  fr: {
    category: {
      'odor-control': [
        'Cette page rassemble les meilleurs articles Purrify sur le contrôle des odeurs: comparatifs, explications sur l’ammoniac et routines concrètes.',
        'Commencez par les articles en vedette, puis utilisez les modules liés pour aller vers l’ammoniac, les appartements, les foyers multi-chats ou le choix de litière.',
      ],
    },
    tag: {
      'activated-carbon': [
        'Le charbon actif est la technologie centrale de l’approche Purrify, et cette page réunit les articles qui expliquent son rôle dans la litière.',
        'Utilisez-la pour relier la science de l’adsorption aux performances réelles du bac à litière.',
      ],
    },
  },
};

export function getTaxonomyUi(locale: Locale): TaxonomyPageStrings {
  return COPY[locale]?.ui ?? COPY.en.ui;
}

export function getTaxonomyTerm(locale: Locale, kind: TaxonomyKind, slug: CanonicalTaxonomySlug): TaxonomyTermCopy {
  const localeCopy = COPY[locale] ?? COPY.en;
  return kind === 'category'
    ? localeCopy.category[slug as CanonicalCategorySlug]
    : localeCopy.tag[slug as CanonicalTagSlug];
}

export function getTaxonomyIntro(
  locale: Locale,
  kind: TaxonomyKind,
  slug: CanonicalTaxonomySlug,
  postCount: number
): string[] {
  const override = INTRO_OVERRIDES[locale]?.[kind]?.[slug];

  if (override) {
    return override;
  }

  const term = getTaxonomyTerm(locale, kind, slug);

  if (locale === 'fr') {
    return [
      `Cette page ${kind === 'category' ? 'de catégorie' : 'de tag'} regroupe ${postCount} article${postCount === 1 ? '' : 's'} autour de ${term.label.toLowerCase()}.`,
      `${term.description} Utilisez les articles en vedette, les guides clés et les liens internes pour aller directement vers le sujet le plus utile.`,
    ];
  }

  return [
    `This ${kind} hub collects ${postCount} article${postCount === 1 ? '' : 's'} related to ${term.label.toLowerCase()}.`,
    `${term.description} Use the featured posts, key guides, and internal links below to move quickly into the most relevant angle.`,
  ];
}

export function getTaxonomyFaq(
  locale: Locale,
  kind: TaxonomyKind,
  slug: CanonicalTaxonomySlug,
  postCount: number
): TaxonomyFaqItem[] {
  const term = getTaxonomyTerm(locale, kind, slug);

  if (locale === 'fr') {
    return [
      {
        question: `Que couvre ${kind === 'category' ? 'cette catégorie' : 'ce tag'} ${term.label} ?`,
        answer: `${term.label} regroupe ${postCount} article${postCount === 1 ? '' : 's'} autour de ${term.description.toLowerCase()}`,
      },
      {
        question: 'Par quel article commencer ?',
        answer: 'Commencez par les articles en vedette. Ils donnent le meilleur point d’entrée avant de passer aux guides plus spécialisés ou comparatifs.',
      },
      {
        question: 'Comment utiliser cette page pour naviguer dans le blog ?',
        answer: 'Utilisez les modules de catégories liées, de tags liés et de guides clés pour passer d’un problème précis à des solutions plus ciblées sans repartir du blog principal.',
      },
    ];
  }

  return [
    {
      question: `What does this ${kind} hub cover?`,
      answer: `${term.label} currently groups ${postCount} article${postCount === 1 ? '' : 's'} focused on ${term.description.toLowerCase()}`,
    },
    {
      question: 'Which article should I start with?',
      answer: 'Start with the featured posts. They provide the strongest entry points before you branch into narrower comparisons, FAQs, or solution-specific guides.',
    },
    {
      question: 'How should I use this page?',
      answer: 'Use the related categories, related tags, and key guides modules to move from a broad topic into more specific odor-control questions without restarting your search.',
    },
  ];
}
