import { CONTACT_INFO } from '../lib/constants';

export const fr = {
  // Common
  siteName: "Purrify",
  siteDescription: "Additif de litière pour chat à base de charbon actif qui élimine les odeurs à la source.",

  // Navigation
  nav: {
    home: "Accueil",
    products: "Produits",
    learn: "Apprendre",
    howItWorks: "Comment Ça Marche",
    about: "À Propos",
    whyPurrify: "Pourquoi Purrify",
    tryFree: "Essai GRATUIT",
    testimonials: "Témoignages",
    leaveReview: "Laisser un Avis",
    contact: "Contact",
    blog: "Blog",
    privacyPolicy: "Politique de Confidentialité",
    termsOfService: "Conditions d'Utilisation",
    // Dropdown items
    trialSize: "Essai GRATUIT (Frais envoi seul.)",
    compareSizes: "Comparer les Tailles",
    viewAllProducts: "Voir Tous les Produits",
    howItWorksPage: "Comment Ça Marche",
    faq: "FAQ",
    science: "Science",
    buyNow: "Acheter Maintenant !",
    retailers: "Pour Détaillants",
    wholesalePricing: "Prix de Gros",
    becomePartner: "Devenir Partenaire",
    marketingSupport: "Support Marketing",
    // Partner Programs
    partnerPrograms: "Programmes Partenaires",
    forGroomers: "Pour Toiletteurs",
    forShelters: "Pour Refuges",
    affiliateProgram: "Programme d'Affiliation",
    b2bInquiry: "Demande B2B",
    customerReviews: "Avis Clients",
    shipsToUSA: "Expédition aux États-Unis",
    // Learn dropdown items
    safetyInfo: "Informations de Sécurité",
    activatedCarbonBenefits: "Avantages du Charbon Actif",
    catLitterGuide: "Guide de la Litière pour Chats",
    howToUse: "Comment Utiliser",
    technologyComparison: "Comparaison des Technologies",
    solutions: "Solutions",
    // Solutions dropdown items
    ammoniaSmellControl: "Contrôle des Odeurs d'Ammoniaque",
    apartmentLiving: "Vie en Appartement",
    litterBoxOdor: "Odeur de Bac à Litière",
    multipleCats: "Plusieurs Chats",
    naturalAdditive: "Additif Naturel",
    seniorCats: "Chats Âgés",
    // UI elements
    toggleMenu: "Basculer le menu",
    toggleTheme: "Basculer le thème",
    signOut: "Se Déconnecter",
    signedIn: "Connecté",
    // SEO FIX (Feb 2026): Added missing nav keys
    catLitterAnswers: "Q&R sur la Litière",
    scienceHub: "Références Scientifiques",
    carbonVsBakingSoda: "Charbon vs Bicarbonate",
    // B2B pivot keys
    findStore: "Trouvez Purrify Près de Vous",
    findNearYou: "Trouver Près de Vous",
    whereToBuy: "Où Acheter",
    askForPurrify: "Demandez Purrify dans Votre Magasin",
    // About dropdown items
    ourStory: "Notre Histoire"
  },

  locationsMenu: {
    selectProvince: "Sélectionnez une province",
    hoverPrompt: "Survolez une province pour voir les villes.",
    provinceCitiesHeading: "Villes de {{province}}",
    viewProvinceGuide: "Voir le guide de la province {{province}}"
  },
  seoKeywords: {
    headTerms: [
      'odeur litière chat',
      'odeurs bac à litière',
      'neutraliser odeur litière',
      'éliminer odeur litière',
      'meilleure litière contre odeur',
      'désodorisant litière naturel'
    ],
    symptomVariants: [
      'odeur ammoniaque litière',
      'litière sent dans appartement',
      'pourquoi ma litière sent mauvais',
      'odeur de litière embarrassante'
    ],
    solutionVariants: [
      'désodorisant litière sans parfum',
      'charbon actif pour litière',
      'neutraliser odeur bac à litière rapidement',
      'astuce pour enlever odeur litière chat'
    ],
    modifiers: {
      housing: ['condo', 'appartement', 'sous-sol', 'maison multi-chats'],
      seasonal: ['fenêtres fermées en hiver', 'été humide', 'hiver canadien', 'saison des pluies'],
      retailer: ['Mondou', 'Pet Valu', 'Global Pet Foods', 'Ren\'s Pets', 'PetSmart']
    }
  },

  // Products
  products: {
    "purrify-12g": {
      name: "Essai GRATUIT",
      description: "Essayez Purrify GRATUITEMENT !\nJuste 4,76 $ pour les frais d'envoi partout au Canada\n\nLimite d'un par client"
    },
    "purrify-50g": {
      name: "Le Format Parfait",
      description: "50g · Format Standard\nIdéal pour un Chat\nNotre taille la plus populaire pour les foyers avec un seul chat."
    },
    "purrify-120g": {
      name: "Format Famille",
      description: "120g · Le Meilleur Rapport Qualité-Prix\nParfait pour les foyers multi-chats.\nContrôle maximal des odeurs."
    }
  },

  pricing: {
    oneTimeLabel: "Achat unique",
    autoshipLabel: "Abonnement & économies",
    autoshipBestLabel: "Meilleur abonnement",
    billedEvery: "Facturé tous les",
    months: "mois",
    shippingIncluded: "Livraison incluse",
    freeShipping: "Livraison gratuite incluse",
    plusShipping: "+ frais de livraison",
    shippingCalculated: "Frais de livraison calculés à la caisse",
    startAutoship: "Activer l'abonnement",
    buyNow: "Acheter maintenant",
    linkComingSoon: "Lien de paiement bientôt disponible",
    recommended: "Recommandé",
    perMonth: "≈ {price}/mois",
    saveVsOneTime: "Économisez {percent}% vs achat unique",
    trialSizeSection: "Essai GRATUIT - Frais d'envoi seulement",
    quarterlyAutoshipSection: "S'abonner & économiser - Abonnement trimestriel",
    stripeShippingNote: "le produit sera expédié à l'adresse 'EXPÉDIER À' de Stripe SUR LA PAGE SUIVANTE"
  },

  announcementBar: {
    freeShipping: {
      line1: 'Livraison gratuite',
      line2: 'sur toutes les commandes avec abonnement',
    },
    madeInCanada: {
      line1: 'Fabriqué au Canada',
      line2: 'à partir d\'ingrédients locaux et mondiaux',
    },
    naturalCarbon: {
      line1: 'Ingrédients non toxiques',
      line2: 'Fabriqué à partir de carbone de noix de coco activé 100 % naturel',
    },
    socialProof: {
      line1: 'Sans produits chimiques, parfums ou additifs',
      line2: 'Utilisé par des milliers de propriétaires de chats au Canada',
    },
    moneyBack: {
      line1: 'Garantie de remboursement de 30 jours',
      line2: 'Pas satisfait ? Remboursement complet, sans questions',
    },
  },

  productsHero: {
    pill: "Éliminateur d'Odeur d'Ammoniac",
    headline: "Embarrassé par l'odeur de la litière ? Arrêtez de la camoufler.",
    subheadline: "Le bicarbonate de soude et les sprays ne font que masquer le problème. Purrify utilise du charbon actif pour éliminer l'ammoniac au niveau moléculaire. Ce n'est pas de la magie. C'est de la science.",
    scienceButton: "La Science",
    guarantee: "Garantie 0 Odeur",
    findSizeButton: "Trouver Mon Format"
  },

  // Hero Section
  hero: {
    catLitter: "Litière pour Chat",
    rabbitLitter: "Litière pour Lapin",
    fridgeSmells: "Odeurs de réfrigérateur",
    ferretCage: "Cage de furet",
    eliminateCatOdors: "7 Jours Sans Odeur de Litière",
    instantly: "Instantanément",
    description: "La technologie avancée au carbone activé neutralise l'ammoniac et les odeurs 3x plus rapidement que les solutions traditionnelles. Transformez votre litière de malodorante à fraîche en quelques secondes.",
    socialProof: {
      trustNumber: "Sans parfum",
      trustText: "additif au charbon actif",
      ratingText: "Controle des odeurs sans parfums"
    },
    pricing: {
      trial: "Essai GRATUIT (4,76 $ frais de port)",
      standard: "50g: 14,99 $",
      family: "120g: 24,99 $"
    },
    buttons: {
      shopNow: "🛒 Acheter - 24,95 $",
      reviews: "Avis clients",
      learnMore: "Comment ça marche",
      tryFree: "Essayer GRATUITEMENT"
    },
    ariaLabels: {
      shopNow: "Acheter les produits Purrify maintenant",
      reviews: "Lire les avis clients",
      playVideo: "Lire la vidéo de démonstration montrant Purrify éliminant les odeurs de litière pour chat"
    },
    dualPath: {
      consumer: {
        title: "Pour votre chat",
        description: "Propriétaires individuels – paiement instantané, livraison directe",
        cta: "Acheter pour votre chat"
      },
      retailer: {
        title: "Magasins & détaillants",
        description: "Tarifs de gros, commandes en volume, support marketing",
        cta: "Portail grossiste"
      }
    },
    simplified: {
      free: "GRATUIT",
      justPayShipping: "Payez seulement 4,76 $ de livraison",
      noMore: "Fini",
      litterBoxSmell: "Les Odeurs de Litière",
      valueProposition: "Le charbon activ\u00e9 \u00e9limine les odeurs \u00e0 la source. Fonctionne avec toute liti\u00e8re.",
      trialSize: "Format Essai",
      standard: "Standard",
      familyPack: "Pack Familial",
      plusSH: "+ Livraison",
      thirtyDayGuarantee: "Garantie 30 Jours",
      getFreeSample: "Obtenir l'\u00c9chantillon GRATUIT",
      soldThisWeek: "87 vendus cette semaine",
      limitedStock: "Stock limit\u00e9 hiver",
      moneyBackGuarantee: "Garantie Satisfait ou Rembours\u00e9 30 Jours",
      freeShippingOver: "Livraison gratuite sur les commandes de plus de 35$",
      headline: "Aimez votre chat. Éliminez les odeurs.",
      subheadline: "Le charbon actif élimine les odeurs d'ammoniac à la source. Fonctionne avec toute litière."
    },
    headline: "Aimez votre chat. Éliminez les odeurs.",
    subheadline: "Le charbon actif élimine les odeurs d'ammoniac à la source. Fonctionne avec toute litière."
  },

  // Features
  features: {
    odorElimination: {
      title: "Élimination des Odeurs",
      description: "La formule avancée de Purrify élimine efficacement les odeurs désagréables de la litière à la source."
    },
    catFriendly: {
      title: "Respectueux des Chats",
      description: "Conçu en pensant au bien-être de votre chat, il est doux et respectueux des animaux."
    },
    longLastingFreshness: {
      title: "Fraîcheur Longue Durée",
      description: "Une seule application garde votre maison sans odeur pendant des jours. Profitez d'une fraîcheur continue sans entretien constant."
    },
    worksWithAnyLitter: {
      title: "Fonctionne avec Toute Litière",
      description: "Compatible avec tous les types de litière, vous n'avez pas besoin de changer ce que votre chat aime déjà."
    },
    natural: {
      title: "Naturel",
      description: "Fabriqué à partir de coques de noix de coco activées, offrant une solution 100 % naturelle, sans produits chimiques ni parfums.",
    },
    costEffective: {
      title: "Économique",
      description: "Prolonge la durée de vie de la litière de votre chat en prévenant l'accumulation d'odeurs, vous faisant économiser de l'argent et réduisant les déchets."
    },
    freePurrify: {
      title: "Purrify Gratuit",
      description: "Obtenez un échantillon gratuit de Purrify avec votre première commande."
    },
    beforeAfter: {
      title: "Avant & Après",
      description: "Voyez la différence que Purrify fait dans la litière de votre chat."
    }
  },

  // Benefits
  benefits: {
    molecular: {
      title: "Élimination au Niveau Moléculaire",
      description: "Purrify élimine les odeurs au niveau moléculaire, assurant une fraîcheur complète et durable."
    },
    sevenDayFreshness: {
      title: "7 Jours de Fraîcheur",
      description: "Une seule application garde votre litière fraîche pendant une semaine entière."
    },
    natural: {
      title: "100% Naturel",
      description: "Fabriqué à partir de charbon actif 100 % naturel, sans produits chimiques ni additifs.",
    },
    universalFit: {
      title: "Adapté à Toutes les Litières",
      description: "Fonctionne avec tous les types de litière pour chat, y compris l'argile, l'agglomérante et le cristal."
    },
    highlyRated: {
      title: "Hautement Apprécié",
      description: "Noté 4.8/5 par plus de 1000 propriétaires de chats satisfaits."
    }
  },

  // How It Works
  howItWorks: {
    simpleAs123: "Simple comme 1-2-3",
    steps: [
      {
        number: "01",
        title: "Ouvrez le Sachet",
        description: "Retirez l'étiquette et dézippez le sachet"
      },
      {
        number: "02",
        title: "Saupoudrez sur la litière",
        description: "Saupoudrez simplement une fine couche de Purrify sur la litière propre de votre chat."
      },
      {
        number: "03",
        title: "Mélangez et profitez de la propreté !",
        description: "Mélangez doucement dans la couche supérieure de la litière pour une efficacité maximale."
      }
    ],
    litterTypes: {
      clumping: "AGGLOMÉRANTE",
      crystal: "CRISTAL",
      natural: "NATURELLE",
      clay: "ARGILE",
      nonClumping: "NON-AGGLOMÉRANTE"
    },
    learnTheScience: "Découvrez la science",
    compareSizes: "comparez nos tailles",
    coconutDescription: "Des coques de noix de coco pures et durables sont activées avec de la vapeur filtrée et pure à haute pression pour ouvrir des millions de trous, tunnels et passages permettant d'emprisonner les molécules d'odeur."
  },

  // Products Section
  productsSection: {
    forEveryCatHousehold: "POUR CHAQUE FOYER DE CHAT",
    pickYourPowerLevel: "CHOISISSEZ VOTRE NIVEAU DE PUISSANCE PURRIFY",
    subtitle: "Que vous ayez un chaton ou plusieurs chats, nous avons la taille Purrify idéale pour votre maison.",
    powerLevels: {
      kittenPower: "Puissance Chaton",
      standardPower: "Puissance Standard",
      maximumPower: "Puissance Maximale"
    },
    mostPopular: "LE PLUS POPULAIRE",
    addToCart: "Ajouter au Panier",
    buyNow: "Acheter Maintenant",
    subscribeNow: "S'abonner & Économiser",
    adding: "Ajout en cours...",
    viewAllProducts: "VOIR TOUS LES PRODUITS",
    quantity: "Quantité",
    decreaseQuantity: "Diminuer la quantité",
    increaseQuantity: "Augmenter la quantité",
    // B2B pivot keys
    findNearYou: "Trouver Près de Vous",
    askYourStore: "Demandez Purrify dans Votre Animalerie Locale",
    availableAtStores: "Disponible dans les animaleries à travers le Canada"
  },

  // Stores Section
  storesSection: {
    availableInStores: "DISPONIBLE EN MAGASIN",
    soldInFollowingStores: "VENDU DANS LES MAGASINS SUIVANTS",
    subtitle: "Trouvez Purrify dans vos magasins d'animaux préférés à travers le Canada. Visitez l'un de ces emplacements pour acheter notre additif de litière pour chat premium.",
    requestStoreAvailability: "Demander la Disponibilité en Magasin",
    dontSeeLocalStore: "Vous ne voyez pas votre magasin local ? Contactez-nous pour demander Purrify dans votre magasin d'animaux préféré !",
    callStore: "Appeler le Magasin",
    sending: "Envoi en cours...",
    requestSent: "Demande Envoyée !",
    requestSuccess: "Merci ! Nous vous contacterons pour aider à obtenir Purrify dans votre magasin local.",
    requestError: "Une erreur s'est produite. Veuillez nous contacter directement à support@purrify.ca",
    storeDescriptions: {
      completePetCareAndSupplies: "Soins complets et fournitures pour animaux",
      premiumPetBoutique: "Boutique premium pour animaux",
      familyOwnedPetStore: "Magasin d'animaux familial",
      globalPetFoodsLocation: "Emplacement Global Pet Foods",
      premiumPetProductsAndSupplies: "Produits et fournitures premium pour animaux",
      fullServicePetStore: "Magasin d'animaux complet",
      petStoreWithGroomingServices: "Magasin d'animaux avec services de toilettage"
    }
  },

  // Call to Action
  cta: {
    title: "Prêt à Dire Adieu aux Odeurs de Litière pour Toujours ?",
    subtitle: "Rejoignez 1 000+ propriétaires de chats heureux qui ont transformé leur maison avec Purrify. Essayez-le avec l'accompagnement personnalisé de notre équipe.",
    buttonText: "COMMANDER MAINTENANT",
    joinText: "Rejoignez 1 000+ Familles de Chats Heureuses - Visitez votre magasin local",
    guarantee: "Support personnalisé inclus",
    // B2B pivot keys
    b2bTitle: "Trouvez Purrify Près de Vous",
    b2bSubtitle: "Disponible dans les animaleries à travers le Canada. Demandez Purrify dans votre animalerie locale.",
    b2bButtonText: "Trouver un Magasin Près de Vous",
    b2bGuarantee: "Disponible chez les détaillants d'animaux partout au pays"
  },

  agitationSection: {
    headline: "Vous Connaissez Ce Moment...",
    paragraphs: [
      "Vous rentrez chez vous après une longue journée. Et là, ça vous frappe. Cette odeur.",
      "Celle qui vous saute au nez avant même d'avoir enlevé votre manteau.",
      "Celle que vous ne remarquez plus... jusqu'à ce que quelqu'un passe. Jusqu'à ce que votre belle-mère fronce le nez. Jusqu'à ce que vous surpreniez un ami faire ce petit reniflement à l'entrée.",
      "Vous aimez votre chat. Mais cette litière ? C'est une bombe à retardement d'ammoniac.",
      "Et le pire : les désodorisants ne règlent rien. Ils vaporisent juste du parfum par-dessus le problème.",
      "L'odeur est toujours là. En embuscade. À attendre. Prête à attaquer quiconque franchit votre porte."
    ],
    pivot: "Et si ça n'avait pas à être comme ça ?",
    transition: "Des propriétaires de chats partout au Canada découvrent enfin quelque chose qui fonctionne vraiment. Et ça prend 30 secondes...",
    ui: {
      imageAlt: "Propriétaire de chat gêné",
      imageCaption: "\"je te jure que je viens de nettoyer...\"",
      floatingCardTitle: "Bombe d'ammoniac",
      floatingCardDescription: "Les odeurs de litière peuvent se propager sur 6 m en quelques secondes.",
      timelineTimeArrival: "17 h 30",
      timelineTimeCompany: "17 h 31",
      timelineTimeThinking: "Réflexion...",
      timelineTimeReality: "Réalité"
    }
  },

  // FAQ
  faq: {
    title: "Questions Fréquemment Posées",
    commonQuestions: "Questions Courantes",
    subtitle: "Vous avez des questions sur Purrify ? Trouvez les réponses à nos questions les plus fréquemment posées ci-dessous.",
    stillHaveQuestions: "Vous avez encore des questions ?",
    contactTeam: "Contactez notre équipe",
    forMoreInfo: "pour plus d'informations.",
    items: [
      {
        question: "Qu'est-ce que Purrify ?",
        answer: "Purrify est un additif de litière pour chat à base de charbon actif qui élimine les odeurs à la source, plutôt que de les masquer avec des parfums."
      },
      {
        question: "Comment fonctionne Purrify ?",
        answer: "Purrify utilise la technologie du charbon actif pour piéger et neutraliser les molécules d'odeur par adsorption, éliminant efficacement les odeurs de litière au niveau moléculaire."
      },
      {
        question: "Combien de temps dure Purrify ?",
        answer: "Une seule application de Purrify peut garder votre litière sans odeur jusqu'à 7 jours, selon l'utilisation et le nombre de chats."
      },
      {
        question: "Purrify peut-il être utilisé avec n'importe quel type de litière ?",
        answer: "Oui, Purrify fonctionne avec tous les types de litière, y compris l'argile, l'agglomérante, le cristal et les litières naturelles."
      },
      {
        question: "À quelle fréquence dois-je utiliser Purrify ?",
        answer: "Pour de meilleurs résultats, saupoudrez Purrify sur la litière de votre chat chaque fois que vous changez ou ajoutez de la litière fraîche. Une fine couche est tout ce dont vous avez besoin pour un contrôle continu des odeurs."
      },
      {
        question: "Combien de temps dure un sac de Purrify ?",
        answer: "Cela dépend du nombre de chats que vous avez et de la fréquence à laquelle vous changez leur litière. En moyenne, notre sac de 65g dure environ 1-2 mois pour un foyer avec un seul chat et des changements réguliers de litière."
      },
      {
        question: "En quoi Purrify est-il différent des litières parfumées ou des désodorisants ?",
        answer: "Contrairement aux produits parfumés qui masquent les odeurs, Purrify utilise la technologie du charbon actif pour piéger et neutraliser les molécules d'odeur à la source. Il n'ajoute aucun parfum à votre maison - il élimine simplement les mauvaises odeurs."
      }
    ],
    learnMore: "En savoir plus"
  },

  // Contact
  contact: {
    title: "Contactez-Nous",
    subtitle: "Nous sommes là pour vous aider",
    address: "109-17680 Rue Charles, Mirabel, QC J7J 0T6",
    phone: CONTACT_INFO.phone,
    email: "hello@purrify.ca",
    courriel: "hello@purrify.ca",
    hours: {
      title: "Heures d'Ouverture",
      monday: "08:00 am - 8:00 pm",
      tuesday: "08:00 am - 8:00 pm",
      wednesday: "08:00 am - 8:00 pm",
      thursday: "08:00 am - 8:00 pm",
      friday: "08:00 am - 8:00 pm",
      saturday: "09:00 am - 8:00 pm",
      sunday: "Fermé"
    },
    form: {
      name: "Nom",
      email: "Courriel",
      message: "Message",
      submit: "Envoyer"
    },
    partnersEmail: "partners@purrify.ca",
  },

  // Newsletter
  newsletter: {
    title: "Abonnez-vous à notre infolettre",
    subtitle: "Restez informé des dernières nouvelles et promotions",
    placeholder: "Votre adresse courriel",
    buttonText: "S'abonner",
    successMessage: "Merci de vous être abonné !",
    errorMessage: "Une erreur s'est produite. Veuillez réessayer.",
    errorInvalidEmail: "Veuillez entrer une adresse courriel valide",
    errorGeneric: "Une erreur s'est produite. Veuillez réessayer.",
    privacyText: "Aucun spam, se désabonner à tout moment. Nous respectons votre vie privée.",
    joinFamily: {
      title: "Rejoignez la Famille Purrify",
      subtitle: "Obtenez 10% de réduction sur votre première commande plus des conseils exclusifs pour chats",
      benefits: {
        firstOrder: "10% de Réduction Première Commande",
        firstOrderDesc: "Remise exclusive pour les nouveaux abonnés",
        catCareTips: "Conseils de Soins pour Chats",
        catCareTipsDesc: "Conseils d'experts hebdomadaires et astuces pour litière",
        earlyAccess: "Accès Anticipé",
        earlyAccessDesc: "Soyez le premier à connaître les nouveaux produits",
        communityStories: "Histoires de la Communauté",
        communityStoriesDesc: "Histoires de succès d'autres propriétaires de chats"
      },
      emailPlaceholder: "Entrez votre adresse courriel",
      ctaButton: "Obtenez 10% de Réduction sur Votre Première Commande",
      joinText: "Rejoignez 1 000+ clients heureux • Aucun spam, se désabonner à tout moment",
      welcomeMessage: "Bienvenue chez Purrify !",
      features: {
        weeklyTips: "✓ Conseils hebdomadaires",
        exclusiveOffers: "✓ Offres exclusives",
        earlyAccessProducts: "✓ Accès anticipé"
      }
    },
    popup: {
      title: "Obtenez {discount}% de réduction sur votre première commande !",
      description: "Rejoignez 1 000+ clients heureux et recevez des conseils exclusifs, des réductions et un accès anticipé aux nouveaux produits.",
      buttonText: "Obtenez {discount}% de réduction maintenant"
    },
    footer: {
      title: "Restez informé avec Purrify",
      description: "Recevez des conseils de soins pour chats et des offres exclusives directement dans votre boîte de réception.",
      placeholder: "Votre courriel",
      buttonText: "S'abonner"
    },
    inline: {
      title: "Rejoignez la Communauté Purrify",
      description: "Recevez des conseils d'experts en soins pour chats et des offres exclusives directement dans votre boîte de réception.",
      buttonText: "S'abonner gratuitement",
      successText: "Abonnement réussi !"
    }
  },

  // Free Giveaway Form
  freeGiveaway: {
    formTitle: "Entrez Vos Coordonnées",
    fullName: "Nom Complet",
    emailAddress: "Adresse Courriel",
    catNames: "Noms de Vos Chats",
    catNamePlaceholder: "Nom du Chat {index}",
    addAnotherCat: "Ajouter un Autre Chat",
    submitting: "Envoi en cours...",
    submitButton: "OBTENIR MON SAC GRATUIT MAINTENANT",
    successMessage: "Votre demande de sac gratuit a été soumise avec succès !",
    errorMessage: "Échec de la soumission de votre demande. Veuillez réessayer.",
    errorGeneric: "Une erreur s'est produite. Veuillez réessayer plus tard.",
    privacyNotice: "En soumettant ce formulaire, vous nous autorisez à vous contacter concernant votre échantillon gratuit de Purrify. Nous respectons votre vie privée et ne partagerons jamais vos informations avec des tiers."
  },

  // 404 Not Found Page
  notFoundPage: {
    title: "404 - Page Non Trouvée",
    description: "Oups ! La page que vous recherchez a peut-être été déplacée, supprimée ou n'a peut-être jamais existé.",
    lookingFor: "Vous pourriez chercher :",
    returnHome: "Retour à la Page d'Accueil",
    suggestedPages: {
      home: { title: "Accueil", description: "Retour à notre page d'accueil" },
      products: { title: "Produits", description: "Parcourez nos additifs pour litière de chat" },
      howItWorks: { title: "Comment Ça Marche", description: "Découvrez comment Purrify élimine les odeurs" },
      blog: { title: "Blog", description: "Lisez nos derniers articles sur les soins des chats" },
      contact: { title: "Contact", description: "Contactez notre équipe" }
    }
  },

  // SEO
  seo: {
    keywords: "litière pour chat, contrôle des odeurs, charbon actif, additif de litière pour chat, odeur d'animal, élimination des odeurs de chat, litière écologique pour chat, contrôle naturel des odeurs, soins des chats, fournitures pour animaux, vidéo de chat",
    openGraph: {
      title: "Purrify - Additif de Litière pour Chat à Base de Charbon Actif",
      description: "Additif de litière pour chat à base de charbon actif qui élimine les odeurs à la source."
    },
    metaDescription: "Purrify est un additif premium de litière pour chat à base de charbon actif qui élimine les odeurs au niveau moléculaire. Fabriqué à partir de charbon de coque de coco naturel, il offre 7 jours de fraîcheur et fonctionne avec tous les types de litière. Fait confiance par plus de 1 000 propriétaires de chats au Canada."
  },

  // Structured Data
  structuredData: {
    organization: {
      name: "Purrify",
      description: "Additif premium de litière pour chat à base de charbon actif qui élimine les odeurs au niveau moléculaire. Fabriqué au Canada avec du charbon de coque de coco naturel.",
      foundingDate: "2023",
      contactPoint: {
        telephone: CONTACT_INFO.phoneInternational,
        email: "hello@purrify.ca",
        contactType: "service client",
        areaServed: ["CA", "US"],
        availableLanguage: ["Anglais", "Français", "Chinois"]
      },
      areaServed: "Canada"
    },
    product: {
      name: "Additif de Litière pour Chat à Base de Charbon Actif Purrify",
      description: "Additif de litière pour chat à base de charbon actif qui élimine les odeurs à la source."
    },
    localBusiness: {
      type: "Animalerie",
      name: "Purrify",
      description: "Additif de litière pour chat à base de charbon actif qui élimine les odeurs à la source."
    },
    breadcrumb: {
      home: "Accueil"
    },
    video: {
      name: "Démonstration de l'additif de litière pour chat Purrify",
      description: "Voir comment Purrify élimine efficacement les odeurs de litière pour chat à la source."
    },
    website: {
      name: "Purrify - Additif de Litière pour Chat à Base de Charbon Actif",
      description: "Additif premium de litière pour chat à base de charbon actif qui élimine les odeurs au niveau moléculaire.",
      inLanguage: "fr-CA"
    },
    offerCatalog: {
      name: "Produits de Contrôle d'Odeurs de Litière pour Chat",
      products: {
        trial: {
          name: "Purrify 12g Taille d'Essai",
          description: "Taille d'essai - additif de litière pour chat à base de charbon actif parfait pour tester",
          sku: "purrify-12g"
        },
        standard: {
          name: "Purrify 50g Taille Standard",
          description: "Taille la plus populaire - approvisionnement d'un mois pour les foyers à un seul chat",
          sku: "purrify-50g"
        },
        family: {
          name: "Purrify 120g Pack Familial",
          description: "Grande taille parfaite pour les foyers multi-chats - contrôle maximal des odeurs",
          sku: "purrify-120g"
        }
      },
      priceRange: "6,99 $ - 29,99 $"
    },
    faqPage: {
      questions: [
        {
          question: "Qu'est-ce que Purrify et comment ça fonctionne?",
          answer: "Purrify est un additif de charbon actif pour litière de chat qui élimine les odeurs au niveau moléculaire. Le charbon actif possède des millions de pores microscopiques qui piègent et neutralisent les composés générateurs d'odeurs, offrant un contrôle des odeurs supérieur par rapport à la litière traditionnelle seule."
        },
        {
          question: "Purrify est-il sûr pour les chats et les humains?",
          answer: "Oui, Purrify est complètement sûr pour les chats et les humains. Notre charbon actif est de qualité alimentaire et non toxique. Il a été testé de manière approfondie et est fait de matériaux naturels. De nombreux filtres à eau et purificateurs d'air utilisent le même type de charbon actif."
        },
        {
          question: "Combien de Purrify dois-je utiliser?",
          answer: "Pour des résultats optimaux, utilisez environ 1-2 cuillères à soupe de Purrify par bac à litière standard. Mélangez-le soigneusement avec votre litière existante lorsque vous effectuez un changement complet. La taille d'essai de 12g est parfaite pour un changement de bac à litière."
        },
        {
          question: "Purrify fonctionne-t-il avec tous les types de litière?",
          answer: "Oui! Purrify est conçu pour fonctionner avec tout type de litière pour chat - argile, agglomérante, cristal, naturelle ou biodégradable. Il améliore les propriétés de contrôle des odeurs de la litière que vous utilisez déjà."
        }
      ]
    }
  },

  // Blog Section
  blogSection: {
    catCareTips: "Conseils et astuces pour chats",
    fromOurBlog: "De notre blog",
    description: "Conseils, astuces et informations pour les propriétaires de chats qui souhaitent une maison fraîche et des chats heureux et en bonne santé.",
    newPost: "Nouvel article",
    readFullArticle: "Lire l'article complet",
    viewAllArticles: "Voir tous les articles"
  },

  // Contact Section
  contactSection: {
    getInTouch: "Contactez-nous",
    ourLocation: "Notre adresse",
    phoneNumber: "Numéro de téléphone",
    phoneDescription: "Nous avons carrément enfermé les odeurs dans notre numéro. Composez le 1-450-6-ODORS-3 (soit 1 (450) 663-6773) et voyez à quel point nous prenons l'air frais au sérieux.",
    openingHours: "Heures d'ouverture",
    weekdays: "Lun - Ven:",
    saturday: "Samedi:",
    sunday: "Dimanche:",
    sendMessage: "Envoyez-nous un message",
    replyTime: "Nous vous répondrons dans les 24 heures"
  },

  // Benefits Section (homepage component)
  benefitsSection: {
    sectionHeader: "Transformez les Problèmes d'Odeurs de Chat en Souvenir du Passé",
    title: "Les Avantages de Purrify",
    subtitle: "Découvrez pourquoi Purrify est la solution parfaite pour les propriétaires de chats qui veulent une maison qui sent frais.",
    items: [
      {
        title: "Élimination des Odeurs",
        description: "La formule avancée de Purrify élimine efficacement les odeurs désagréables de litière à la source. Dites adieu aux odeurs persistantes qui peuvent imprégner votre maison et accueillez un environnement plus frais et accueillant pour vous et votre ami à fourrure."
      },
      {
        title: "Simple",
        description: "Purrify est formulé avec de simples coques de noix de coco, activées pour absorber les odeurs. Vous pouvez être sûr que vous offrez à votre chat un environnement de litière propre sans l'exposer à des produits chimiques ou des toxines."
      },
      {
        title: "Économique",
        description: "Purrify aide à prolonger la durée de vie de la litière de votre chat en prévenant l'accumulation d'odeurs, ce qui signifie que vous devrez changer la litière moins souvent. Cela vous fait économiser de l'argent et réduit les déchets, un avantage pour votre portefeuille et l'environnement."
      }
    ]
  },

  // Science Section (homepage component)
  scienceSection: {
    badge: "Le Côté Scientifique (C'est Rapide)",
    headline: "Comment le Charbon Actif",
    headlineHighlight: "Fonctionne Vraiment",
    description: "Les désodorisants ne font que vaporiser du parfum sur le problème. Le charbon actif est différent — il possède des millions de minuscules tunnels qui piègent physiquement les molécules d'odeur. Une fois que l'ammoniac entre, il ne ressort pas. C'est pourquoi l'odeur disparaît vraiment au lieu de jouer à cache-cache.",
    learnMore: "Plongez Plus Profondément Dans la Science",
    features: [
      {
        title: "Piège, Ne Masque Pas",
        description: "Chaque grain de charbon possède une énorme surface couverte de tunnels microscopiques. Les molécules d'odeur sont piégées à l'intérieur — définitivement."
      },
      {
        title: "Même Technologie que les Filtres à Eau",
        description: "Si le charbon actif est utilisé pour rendre l'eau potable, votre litière est définitivement dans ses compétences."
      },
      {
        title: "Fabriqué à Partir de Coques de Noix de Coco",
        description: "Naturel, durable et complètement non toxique. Sûr pour les chats curieux, les tout-petits fouineurs, et tout le monde entre les deux."
      }
    ],
    floatingLabel: {
      title: "Vue Microscopique",
      description: "La structure poreuse piège les molécules d'ammoniac de façon permanente."
    },
    naturalBadge: {
      title: "100% Naturel",
      subtitle: "Sans produits chimiques"
    }
  },

  // Features Section (homepage component)
  featuresSection: {
    badge: "La Différence Purrify",
    title: "Pourquoi les Chats et leurs Parents Adorent Purrify ?",
    paragraph1: "Vous aimez votre chat, mais soyons honnêtes — l'odeur de la litière est un problème. Vous avez essayé la litière parfumée, les désodorisants et le bicarbonate de soude — mais ils ne font que masquer le problème, pas le résoudre.",
    paragraph2: "Imaginez rentrer chez vous et ne sentir... rien. Juste de l'air frais, pas d'odeurs persistantes, et pas d'odeurs embarrassantes quand vous avez des invités.",
    tagline: "C'est exactement ce que fait Purrify...",
    learnMore: "En savoir plus"
  },

  // Calculator Section (homepage component)
  calculatorSection: {
    title: "Économisez de l'Argent Tout en Gardant Votre Maison Fraîche",
    description: "Purrify prolonge la durée de vie de la litière de votre chat jusqu'à 50%, vous faisant économiser de l'argent tout en éliminant les odeurs. Voyez combien vous pourriez économiser avec notre calculatrice ci-dessous."
  },

  // Section Header highlights
  sectionHeaderHighlights: [
    "7 Jours d'Air Frais Garanti",
    "Air Frais en 60 Secondes - Simple comme 1-2-3"
  ],

  // Trust Bar
  trustBar: {
    happyCats: "chats heureux",
    reviews: "avis"
  },

  // Footer
  footer: {
    quickLinks: "Liens Rapides",
    openingHours: "Heures d'Ouverture",
    contactUs: "Contactez-Nous",
    allRightsReserved: "Tous Droits Réservés"
  },

  // Footer Navigation
  footerNav: {
    // Section headers
    trustedReviews: "Avis clients",
    products: "Produits",
    learn: "Apprendre",
    popularArticles: "Articles Populaires",
    company: "Entreprise",
    // Product links
    trialSize: "Taille d'Essai",
    standardSize: "Taille Standard",
    familyPack: "Pack Familial",
    compareSizes: "Comparer les Tailles",
    // Learn links
    howItWorks: "Comment Ça Marche",
    faq: "FAQ",
    science: "Science",
    scienceHub: "Références Scientifiques",
    safetyInfo: "Informations de Sécurité",
    catLitterGuide: "Guide de la Litière pour Chats",
    catLitterAnswers: "Q&R sur la Litière",
    carbonVsBakingSoda: "Charbon vs Bicarbonate",
    ammoniaSolutions: "Solutions pour l'Ammoniaque",
    litterCalculator: "Calculateur de Litière",
    // Article links
    houseSmells: "Maison Sent la Litière pour Chat ?",
    multiCatGuide: "Guide Désodorisant Multi-Chats",
    triedEverything: "Tout Essayé pour l'Odeur de Chat ?",
    powerfulAbsorber: "Absorbeur d'Odeurs le Plus Puissant",
    smallApartments: "Meilleur pour Petits Appartements",
    // Company links
    about: "À Propos de Nous",
    blog: "Blog",
    locations: "Emplacements",
    stockists: "Magasins",
    testimonials: "Témoignages",
    retailers: "Pour Détaillants",
    retailerPortal: "Portail Détaillant",
    hospitality: "Hôtellerie",
    groomers: "Pour Toiletteurs",
    shelters: "Refuges",
    b2bInquiry: "Demande B2B",
    invest: "Investisseurs",
    affiliateProgram: "Programme d'Affiliation",
    results: "Histoires de Succès",
    contact: "Contact",
    privacyPolicy: "Politique de Confidentialité",
    termsOfService: "Conditions d'Utilisation",
    // Review platforms
    trustpilot: "Trustpilot",
    googleReviews: "Avis Google",
    // SEO
    sitemap: "Plan du site"
  },

  // Free Trial
  freeTrial: {
    urgentBanner: "URGENT: L'OFFRE GRATUITE SE TERMINE BIENTÔT",
    free: "GRATUIT"
  },

  // Social Proof Badges
  socialProofBadges: {
    trustedVerified: "Vérifié et Approuvé",
    findUsOn: "Trouvez-nous Sur",
    viewOnPlatform: "Voir Purrify sur {{platform}}",
    platforms: {
      trustpilot: "Trustpilot",
      googleBusiness: "Google Business",
      crunchbase: "Crunchbase",
      productHunt: "Product Hunt",
      yelp: "Yelp",
      wellfound: "Wellfound"
    }
  },
  // Enhanced Product Comparison
  enhancedProductComparison: {
    compareAndSave: "Comparer et Économiser",
    chooseYourPerfectSize: "Choisissez Votre Taille Parfaite",
    purrifySize: "Format Purrify",
    subtitle: "Toutes les tailles offrent le même contrôle puissant des odeurs. Choisissez en fonction de la taille de votre foyer et de la fréquence d'utilisation.",
    trial: "Essai",
    mostPopular: "Le Plus Populaire",
    bestValue: "Meilleure Valeur",
    premium: "Premium",
    perfectForFirstTime: "Parfait pour les Premiers Essais",
    idealForSingleCat: "Idéal pour un Chat",
    perfectForMultiCat: "Parfait pour Plusieurs Chats",
    duration: "Durée",
    coverage: "Couverture",
    odorControl: "Contrôle des Odeurs 7 Jours",
    odorControlTrial: "Contrôle des Odeurs 7 Jours",
    odorControlMedium: "Contrôle des Odeurs 14 Jours",
    odorControlLarge: "Contrôle des odeurs sur 30 jours",
    naturalIngredients: "100% Ingrédients Naturels",
    easyApplication: "Application Facile",
    moneyBackGuarantee: "Support d'experts en odeurs",
    freeShipping: "Livraison incluse",
    freeShippingDetailed: "La livraison est incluse.",
    autoshipHero: "Abonnement & économies",
    autoshipHighlight: "S'abonner et économiser",
    bulkDiscount: "Remise en Gros",
    prioritySupport: "Support Client Prioritaire",
    tryRiskFree: "Essayez Sans Risque",
    chooseThisSize: "Choisir Cette Taille",
    chosenByCustomers: "🔥 68% des clients choisissent cette offre",
    whyChoosePurrify: "Pourquoi Choisir Purrify ?",
    joinThousands: "Rejoignez 1 000+ propriétaires de chats qui font confiance à Purrify",
    happyCustomers: "Clients Satisfaits",
    averageRating: "Note Moyenne",
    satisfactionRate: "Taux de Satisfaction",
    odorFreeGuarantee: "Air frais à chaque application",
    moneyBackGuaranteeText: "Des questions ? Notre équipe vous aide à garder une maison sans odeurs."
  },

  // Subscription Offer
  subscriptionOffer: {
    subscribeAndSave: "Abonnez-vous et Économisez",
    neverRunOut: "Ne Manquez Jamais, Économisez Plus",
    subtitle: "Configurez la livraison automatique pour des remises exclusives et la commodité. Annulez à tout moment.",
    monthly: "Mensuel",
    everyTwoMonths: "Tous les Deux Mois",
    quarterly: "Trimestriel",
    save: "Économisez",
    mostFlexible: "Le Plus Flexible",
    bestValue: "Meilleure Valeur",
    maxSavings: "Économies Maximales",
    oneTimePurchase: "Achat Unique",
    subscriptionBenefits: "Avantages de l'Abonnement",
    // freeShipping: "Livraison gratuite sur toutes les commandes", // TODO: Restore when free shipping is available
    exclusiveDiscounts: "Remises exclusives aux abonnés",
    prioritySupport: "Support client prioritaire",
    flexibleSchedule: "Calendrier de livraison flexible",
    cancelAnytime: "Annulez à tout moment",
    startSubscription: "Commencer l'Abonnement",
    selectPlan: "Sélectionner le Plan",
    popularChoice: "Choix Populaire"
  },

  // Urgency Banner
  urgencyBanner: {
    limitedTime: "Offre Limitée",
    saveToday: "Économisez Aujourd'hui",
    onAllOrders: "sur toutes les commandes",
    // freeShipping: "+ Livraison Gratuite", // TODO: Restore when free shipping is available
    hurryOffer: "Dépêchez-vous ! L'offre se termine bientôt",
    claimDiscount: "Réclamer la Remise",
    timeLeft: "Temps Restant",
    days: "jours",
    hours: "heures",
    minutes: "minutes",
    seconds: "secondes",
    onlyLeft: "seulement restant",
    inStock: "en stock",
    orderNow: "Commander Maintenant"
  },

  // Email Capture Popup
  emailCapture: {
    waitDontGo: "Attendez ! Ne Partez Pas !",
    exclusiveOffer: "Obtenez une Offre Exclusive",
    subtitle: "Avant de partir, obtenez 15% de réduction sur votre première commande",
    emailPlaceholder: "Entrez votre adresse courriel",
    claimDiscount: "Réclamer 15% de Réduction",
    noThanks: "Non merci",
    instantAccess: "Accès instantané à votre code de réduction",
    limitedTime: "Offre limitée - Ne la manquez pas !",
    successMessage: "Succès ! Vérifiez votre courriel pour le code de réduction.",
    errorMessage: "Une erreur s'est produite, veuillez réessayer."
  },

  // Reviews Section
  reviewsSection: {
    customerReviews: "Avis Clients",
    realStories: "Vraies histoires de propriétaires de chats heureux",
    verifiedReviews: "Avis clients",
    averageRating: "Note Moyenne",
    readMore: "Lire Plus",
    writeReview: "Écrire un Avis",
    helpful: "Utile",
    verified: "Client",
    productUsed: "Produit Utilisé",
    catsOwned: "Chats Possédés",
    useCase: "Cas d'Usage"
  },

  // Case Studies
  caseStudies: {
    customerSuccess: "Études de Cas de Succès Client",
    realResults: "Vrais résultats de vrais clients",
    detailedStories: "Découvrez comment Purrify transforme les foyers à travers le Canada grâce à des études de cas détaillées",
    averageOdorReduction: "Réduction Moyenne des Odeurs",
    timeToSeeResults: "Temps pour Voir les Résultats",
    customerSatisfaction: "Satisfaction Client",
    catsPerStudy: "Chats par Étude",
    theChallenge: "Le Défi",
    theSolution: "La Solution",
    theResults: "Les Résultats",
    longTermOutcome: "Résultat à Long Terme",
    keyPainPoints: "Points de Douleur Clés",
    implementation: "Mise en Œuvre",
    writeYourStory: "Prêt à écrire votre propre histoire de succès ?",
    joinSatisfied: "Rejoignez 1 000+ clients satisfaits qui transforment leurs foyers avec Purrify.",
    shopPurrify: "Acheter Purrify",
    tryFreeSample: "Essayer un Échantillon Gratuit",
    moreCustomerStories: "Plus d'Histoires de Clients",
    videoTestimonials: "Témoignages Vidéo",
    productComparison: "Comparaison de Produits"
  },

  // About Section
  about: {
    naturalAndEffective: "Naturel & Efficace"
  },

  // Additional Subscription Offer Translations
  subscriptionOfferExtended: {
    autoshipBadge: "Abonnement trimestriel",
    headline: "Votre défense anti-odeurs en pilote automatique",
    supportingCopy: "Choisissez le lot qui se renouvelle automatiquement tous les 3 mois, garde votre maison fraîche et protège votre budget.",
    perMonthLabel: "≈ {price}/mois",
    saveVsOneTime: "Économisez {percent}% vs achat unique",
    skipOrCancelAnytime: "Suspendre ou annuler à tout moment",
    shippingIncluded: "Livraison incluse",
    freeShippingIncluded: "Livraison gratuite incluse",
    priorityCustomerSupport: "Support client prioritaire",
    startAutoship: "Activer l'abonnement",
    linkComingSoon: "Lien de paiement bientôt disponible",
    quarterlyBilling: "Facturé tous les 3 mois",
    autoshipHero: "Abonnement & économies",
    autoshipHighlight: "S'abonner et économiser",
    standardPlanTitle: "Abonnement trimestriel – 3 × 50g",
    standardDescription: "Idéal pour les foyers avec un chat qui veulent un contrôle des odeurs continu.",
    includesThreeStandard: "Comprend 3 sachets de 50g livrés ensemble",
    familyPlanTitle: "Abonnement meilleur rapport – 3 × format régulier 120g",
    familyDescription: "Pensé pour les foyers multi-chats et sensibles aux allergies. Notre meilleur prix par utilisation.",
    includesThreeFamily: "Comprend 3 sachets format régulier 120g (livrés ensemble)",
    bestValueBadge: "Meilleure valeur",
    save: "Économisez",
    joinThePurrifyFamily: "Rejoignez la famille Purrify"
  },

  // Payment Security
  paymentSecurity: {
    securePayment: "Paiement Sécurisé",
    sslEncrypted: "SSL 256-bit",
    sslEncryptedCheckout: "Paiement crypté SSL avec Stripe"
  },

  // Testimonials Section
  testimonialsSection: {
    customerLove: "Amour des Clients",
    littersOfLove: "Des Portées d'Amour de la Communauté des Propriétaires d'Animaux",
    dontJustTakeOurWord: "Ne nous croyez pas sur parole. Voici ce que nos clients disent de Purrify.",
    readMoreReviews: "Lire Plus d'Avis"
  },

  // Trust Badges
  trustBadges: {
    moneyBack: {
      title: "Support au Canada",
      description: "Une équipe réelle vous aide à optimiser le contrôle des odeurs",
      highlight: "Experts félins"
    },
    securePayment: {
      title: "Paiement Sécurisé",
      description: "Paiement crypté SSL avec Stripe",
      highlight: "SSL 256-bit"
    },
    fastShipping: {
      title: "Livraison Rapide",
      description: "Livraison rapide et fiable",
      highlight: "Traitement le Jour Même"
    },
    customerRating: {
      title: "Avis clients",
      description: "Conseils et ressources pour réduire les odeurs de litière avec un additif au charbon actif",
      highlight: "Sans parfum"
    },
    happyCustomers: {
      title: "Communauté de propriétaires de chats",
      description: "Utilisé par des propriétaires de chats à travers le Canada",
      highlight: "Support au Canada"
    },
    premiumQuality: {
      title: "Qualité Premium",
      description: "Charbon actif de qualité filtration utilisé dans les filtres à eau et à air",
      highlight: "Sans parfum"
    }
  },

  // Common UI Elements
  ui: {
    // Review System
    allRatings: "Toutes les Notes",
    allSizes: "Toutes les Tailles",
    newestFirst: "Plus Récent d'Abord",
    oldestFirst: "Plus Ancien d'Abord",
    highestRated: "Mieux Noté",
    lowestRated: "Moins Bien Noté",
    mostHelpful: "Plus Utile",
    verifiedPurchase: "Achat Vérifié",

    // Payment & Cart
    securePayment: "Paiement Sécurisé",
    shoppingCart: "Panier d'Achat",

    // General
    happyCustomers: "Clients Satisfaits",
    moneyBack: "Support expert",
    averageRating: "Note Moyenne",
    satisfactionRate: "Taux de Satisfaction",
    // freeShipping: "Livraison Gratuite", // TODO: Restore when free shipping is available
    skipAnytime: "Ignorer à Tout Moment",
    highlyRated: "Très Bien Noté",
    errorDetails: "Détails de l'Erreur",
    moneyBackGuarantee: "Garantie de remboursement de 30 jours"
  },

  // Exit Intent Popup
  exitPopup: {
    title: "Attendez ! Ne partez pas les mains vides",
    subtitle: "Obtenez 10% de réduction sur votre première commande",
    description: "Rejoignez des milliers de propriétaires de chats satisfaits et recevez des offres exclusives. Exclut l'offre d'essai gratuit.",
    placeholder: "Entrez votre email",
    button: "Obtenir Ma Réduction",
    noThanks: "Non merci, je préfère le plein tarif",
    successTitle: "Vous êtes inscrit !",
    successMessage: "Utilisez le code WELCOME10 à la caisse pour 10% de réduction !"
  },

  // Free Trial Page
  freeTrialPage: {
    urgentBanner: "OFFRE À DURÉE LIMITÉE",
    free: "GRATUIT",
    claimTrial: "Réclamez Votre Essai GRATUIT de Purrify",
    whatYouGet: "Ce que vous obtenez GRATUITEMENT :",
    freeTrialBag: "Sac d'essai à usage unique de notre formule naturelle anti-odeurs",
    // freeShippingDoor: "Livraison gratuite à votre porte", // TODO: Restore when free shipping is available
    expertTips: "Conseils d'experts en soins pour chats et guides",
    zeroCommitment: "Zéro engagement - c'est notre cadeau pour vous",
    attention: "ATTENTION PROPRIÉTAIRES DE CHATS QUI EN ONT ASSEZ DE RETENIR LEUR SOUFFLE :",
    limitedQuantity: "aux 500 premiers propriétaires de chats",
    alreadyClaimed: "Déjà réclamés",
    countdownLabels: {
      hours: "HEURES",
      minutes: "MINS",
      seconds: "SECS"
    },
    testimonials: [
      {
        text: "Je n'arrivais pas à y croire. En quelques HEURES, toute ma maison sentait à nouveau le frais. J'ai même invité ma belle-mère pour la première fois depuis des mois !",
        author: "Jennifer M., Montréal"
      },
      {
        text: "Mon mari pensait que j'avais complètement jeté la litière. L'odeur avait simplement... disparu.",
        author: "Lisa K., Mirabel, QC"
      }
    ],
    testimonialsTestUsers: "Ce que disent nos testeurs bêta :",
    claimNow: "RÉCLAMEZ VOTRE SAC GRATUIT MAINTENANT",
    warningHighDemand: "⚠️ ATTENTION : En raison de la forte demande, nous ne pouvons pas garantir la disponibilité après l'expiration du minuteur.",
    privacyNotice: "100% Gratuit. Aucune carte de crédit requise.",
    zeroCommitmentGift: "Zéro engagement - c'est notre cadeau pour vous",
    instantOdorElimination: "Élimination instantanée des odeurs - fonctionne avec TOUTE litière que vous utilisez actuellement",
    completeInstructions: "Instructions complètes pour des résultats de fraîcheur maximale",
    noShippingFees: "Pas de frais d'expédition, pas de coûts cachés, pas de piège",
    disappearsIn: "ATTENTION : Cette offre disparaît dans :",
    limitedTo500: "Limité aux 500 premiers propriétaires de chats seulement.",
    yourFreeTrialWaits: "Votre sac gratuit vous attend - mais seulement si vous agissez maintenant.",
    betaTestersHeader: "Ce que disent nos testeurs bêta :",
    claimFreeTrialNow: "RÉCLAMEZ VOTRE SAC GRATUIT MAINTENANT",
    attention100Free: "100% Gratuit. Aucune carte de crédit requise.",
    noCreditCard: "Aucune carte de crédit requise.",
    limitedTimeOffer: "Offre à durée limitée. Un sac gratuit par foyer.",
    restrictionsApply: "Des restrictions d'expédition peuvent s'appliquer. Nous nous réservons le droit de mettre fin à cette promotion à tout moment.",
    highDemandWarning: "En raison de la forte demande, nous ne pouvons pas garantir la disponibilité après l'expiration du minuteur",
    disclaimer: "100% Gratuit. Aucune carte de crédit requise. Offre à durée limitée. Un sac gratuit par foyer. Des restrictions d'expédition peuvent s'appliquer. Nous nous réservons le droit de mettre fin à cette promotion à tout moment"
  },

  // Contact Page
  contactPage: {
    title: "Nous Sommes Là Pour Vous Aider",
    subtitle: "Notre équipe de support client amicale est prête à vous assister avec des conseils d'experts et des solutions.",
    chooseContactMethod: "Choisissez Comment Nous Contacter",
    contactReasons: [
      { value: "general", label: "Question Générale" },
      { value: "product", label: "Information Produit" },
      { value: "order", label: "Support Commande" },
      { value: "shipping", label: "Question Livraison" },
      { value: "return", label: "Retour/Remboursement" },
      { value: "wholesale", label: "Demande Grossiste" },
      { value: "feedback", label: "Commentaire/Avis" }
    ],
    contactMethods: [
      {
        title: "Support Email",
        description: "Obtenez de l'aide détaillée par email",
        responseTime: "Habituellement dans les 24 heures"
      },
      {
        title: "Support Téléphonique",
        description: "Parlez directement avec notre équipe",
        responseTime: "Lun-Ven, 9h-17h EST"
      },
      {
        title: "Chat en Direct",
        description: "Aide instantanée pour questions rapides",
        responseTime: "Réponse moyenne: 2 minutes"
      }
    ],
    form: {
      fullName: "Nom Complet",
      emailAddress: "Adresse Courriel",
      subject: "Sujet",
      message: "Message",
      contactReason: "Raison du Contact",
      orderNumber: "Numéro de Commande (si applicable)",
      submit: "Envoyer le Message",
      submitting: "Envoi du Message...",
      successMessage: "Merci de nous avoir contactés! Nous vous répondrons dans les 24 heures.",
      errorMessage: "Désolé, il y a eu une erreur en envoyant votre message. Veuillez réessayer ou nous contacter directement.",
      sendingMessage: "Envoi du Message...",
      sendMessage: "Envoyer le Message",
      subjectPlaceholder: "Brève description de votre demande",
      messagePlaceholder: "Veuillez fournir des détails sur votre question ou préoccupation...",
      orderNumberPlaceholder: "ex: PUR-12345",
      contactNow: "Contacter Maintenant"
    },
    faqs: [
      {
        question: "À quelle vitesse verrai-je des résultats avec Purrify?",
        answer: "La plupart des clients remarquent une réduction significative des odeurs dans les premières heures d'application. Le charbon activé commence à piéger les molécules d'odeur immédiatement au contact."
      },
      {
        question: "Que faire si je n'obtiens pas les résultats espérés?",
        answer: "Écrivez-nous ! Notre équipe d'accompagnement analysera votre installation, partagera des conseils personnalisés et s'assurera que Purrify fonctionne au mieux chez vous."
      },
      {
        question: "Offrez-vous des prix de gros pour plusieurs chats?",
        answer: "Oui! Notre format économique de 500g offre la meilleure valeur pour les foyers multi-chats. Nous avons aussi des prix de gros disponibles pour les animaleries et vétérinaires."
      },
      {
        question: "Purrify est-il sûr si mon chat l'ingère accidentellement?",
        answer: "Absolument. Le charbon activé est complètement sûr pour les chats et est même utilisé en médecine vétérinaire. Cependant, Purrify est conçu pour rester mélangé avec la litière."
      }
    ],
    businessHours: {
      title: "Heures d'Affaires",
      weekdays: "9h00 - 17h00 EST",
      saturday: "10h00 - 14h00 EST",
      sunday: "Fermé",
      closed: "Fermé"
    },
    location: {
      title: "Notre Emplacement",
      address: "Montréal, Québec, Canada",
      shippingNote: "Nous expédions partout au Canada et offrons la collecte locale dans la région de Montréal."
    },
    frequentlyAskedQuestions: "Questions Fréquemment Posées",
    quickAnswersCommon: "Réponses rapides aux questions communes",
    dontSeeQuestion: "Vous ne voyez pas votre question ici?",
    viewCompleteFAQ: "Voir FAQ Complète",
    backToHome: "Retour à l'Accueil"
  },

  // Product Comparison
  productComparison: {
    title: "Comparer les Produits Purrify",
    subtitle: "Trouvez la taille parfaite pour votre foyer - de l'essai aux économies en vrac",
    findPerfectSize: "Trouvez la taille parfaite pour votre foyer",
    products: [
      {
        id: "trial",
        name: "L'Échantillon du Sceptique",
        subtitle: "12g · Une Semaine de Preuve",
        duration: "7+ jours",
        cats: "1 chat",
        features: ["Une semaine de confiance à l'air frais", "Seulement 4,76$ d'expédition", "Zéro risque, zéro engagement"],
        bestFor: "Parents de chats qui ont été déçus auparavant. Testez par vous-même. Votre nez ne ment pas.",
        cta: "Trouvez Purrify Près de Vous"
      },
      {
        id: "regular",
        name: "Format Régulier",
        subtitle: "120g · Format Standard",
        duration: "7+ jours par application",
        cats: "1-2 chats",
        features: ["Utilisez plus pour une fraîcheur prolongée", "Rechargez à tout moment", "Fonctionne avec toute litière"],
        bestFor: "Foyers avec un ou deux chats. Le format que les clients rachètent.",
        cta: "Trouvez Purrify Près de Vous"
      },
      {
        id: "large",
        name: "Format Famille",
        subtitle: "240g · Meilleur Rapport Qualité-Prix",
        duration: "7+ jours par application",
        cats: "3+ chats",
        features: ["Meilleur rapport qualité-prix au gramme", "Dosage flexible", "Parfait pour plusieurs bacs"],
        bestFor: "Foyers multi-chats, parents d'accueil, ou quiconque a perdu le compte.",
        cta: "Trouvez Purrify Près de Vous"
      }
    ],
    comparisonFeatures: [
      { feature: "Élimination d'Odeurs" },
      { feature: "Fonctionne avec Toute Litière" },
      { feature: "Prolonge la Vie de la Litière" },
      { feature: "Support dédié aux odeurs" },
      { feature: "Livraison Gratuite" },
      { feature: "Économies en Vrac" },
      { feature: "Convient Multi-Chats" }
    ],
    usageCalculator: {
      title: "Combien de Temps Chaque Taille Durera-t-elle?",
      subtitle: "Estimez la durée selon la taille de votre foyer",
      numberOfCats: "Nombre de Chats",
      typicalChanges: "Changements Typiques",
      estimateDuration: "Estimez la durée selon la taille de votre foyer"
    },
    stillUnsure: "Toujours Pas Sûr de la Taille à Choisir?",
    getPersonalizedAdvice: "Obtenez des Conseils Personnalisés",
    tryRiskFree: "Essayez Sans Risque - 4,99$",
    learnMoreAboutPurrify: "En Savoir Plus Sur Purrify",
    featuresComparison: "Comparaison des Caractéristiques",
    seeHowProductsCompare: "Voyez comment nos produits se comparent côte à côte",
    howLongWillEachSizeLast: "Combien de Temps Chaque Taille Durera-t-elle?",
    popular: "Populaire",
    bestValue: "Meilleure Valeur",
    perfectForFirstTime: "Parfait pour les nouveaux utilisateurs",
    idealForSingleCat: "Idéal pour les foyers à un chat",
    perfectForMultiCat: "Parfait pour les foyers multi-chats",
    economicChoice: "Choix économique",
    maxValuePerGram: "Valeur maximale par gramme",
    bulkSavingsIncluded: "Économies en vrac incluses",
    sustainableSupply: "Approvisionnement durable",
    // freeShippingIncluded: "Livraison gratuite incluse", // TODO: Restore when free shipping is available
    features: "Caractéristiques",
    idealFor: "Idéal Pour",
    duration: "Durée",
    saveMoney: "Économisez",
    getBestValue: "Obtenir la Meilleure Valeur",
    chooseThisSize: "Choisir Cette Taille",
    tryWithoutRisk: "Essayez Sans Risque",
    chooseSmallSize: "Choisir Petite Taille",

    // SEO
    seo: {
      title: "Trouvez la Taille Parfaite",
      description: "Comparez toutes les tailles Purrify et trouvez l'additif pour litière au charbon actif parfait pour les besoins de votre foyer."
    },

    stillUnsureDescription: "Commencez avec notre taille d'essai sans risque et découvrez la différence Purrify par vous-même.",

    // Table Headers
    tableHeaders: {
      feature: "Caractéristique",
      trial: "Essai 12g",
      regular: "Régulier 120g",
      large: "Grand 240g"
    },

    // Calculation Units
    units: {
      cat: "Chat",
      cats: "Chats",
      week: "semaine",
      weeks: "semaines",
      day: "jour",
      days: "jours",
      weekly: "Hebdomadaire",
      perWeek: "par semaine"
    },

    // Related Pages
    relatedPages: [
      {
        title: "Comment ça marche",
        description: "Découvrez la science derrière notre technologie au charbon actif et pourquoi elle est si efficace.",
        link: "/learn/how-it-works"
      },
      {
        title: "Avis Clients",
        description: "Voyez ce que 1 000+ clients satisfaits disent de leur expérience avec Purrify.",
        link: "/reviews"
      },
      {
        title: "Guide de Litière",
        description: "Apprenez sur les différents types de litière et comment choisir la meilleure option pour votre chat.",
        link: "/learn/cat-litter-guide"
      }
    ]
  },

  // Products Page - Direct Response Copywriting Style
  productsPage: {
    // Hero Section
    hero: {
      headline: "Vos Chats Sont Parfaits. L'Odeur? Pas Tellement.",
      subheadline: "Le même charbon actif qui nettoie votre eau potable. Piège l'ammoniaque de la litière au niveau moléculaire. Pas de parfums. Pas de masquage. Juste... de l'air.",
      supporting: "Choisissez votre format. Prouvez-le à votre nez."
    },

    // Quick Decision Helper
    quickDecision: {
      title: "Pas Sûr du Format? Laissez Votre Nez Juger.",
      subtitle: "Choisissez le format adapté à votre foyer:",
      trial: {
        question: "Déçu par de fausses promesses auparavant?",
        answer: "L'Échantillon du Sceptique (12g)",
        detail: "Payez seulement les frais de port. 7 jours pour convaincre votre nez. Ça marche ou vous perdez 4,76$."
      },
      regular: {
        question: "Un ou deux chats à la maison?",
        answer: "Format Régulier (120g)",
        detail: "Le format le plus populaire. Dure 7+ jours par application. Utilisez plus, reste frais plus longtemps."
      },
      large: {
        question: "Vous gérez un foyer multi-chats?",
        answer: "Format Famille (240g)",
        detail: "Meilleur rapport qualité-prix au gramme. Même formule puissante, double la quantité."
      }
    },

    // Trust Signals
    trustSignals: {
      waterFilter: {
        title: "Le même produit que dans votre Brita",
        description: "Répond aux normes NSF/ANSI 61. Si c'est assez bon pour rendre l'eau du robinet potable, imaginez ce que ça fait à l'ammoniaque."
      },
      ingredients: {
        title: "Ingrédients : Coques de noix de coco. C'est tout.",
        description: "Pas de parfum pour stresser votre chat. Pas de produits chimiques. Juste du charbon actif pur de coques de noix de coco."
      },
      science: {
        title: "La science, pas le parfum",
        description: "Un gramme a la surface d'un terrain de football. Ces tunnels microscopiques piègent les molécules d'odeur en permanence. Disparues. Pas cachées."
      }
    },

    // Product Cards
    products: {
      trial: {
        name: "Le sac du sceptique",
        subtitle: "12g · Une semaine de preuve",
        features: [
          "Assez pour 7 jours d'air frais",
          "Juste les frais de port de 4,76$",
          "Un par foyer (désolé, pas de stockage gratuit)"
        ],
        bestFor: "Parents de chats qui ont été déçus par des produits 'miracles' avant. On comprend. Prouvez-le vous-même d'abord."
      },
      regular: {
        name: "Le juste milieu",
        subtitle: "120g · Format Standard",
        features: [
          "10-12 semaines de contrôle des odeurs pour 1-2 chats",
          "Le format que la plupart des clients recommandent",
          "Fonctionne avec la litière que votre chat a déjà approuvée"
        ],
        bestFor: "Foyers d'un ou deux chats où 'des invités arrivent' ne déclenche plus la panique."
      },
      large: {
        name: "Le sac 'On a combien de chats?'",
        subtitle: "240g · Meilleur rapport qualité-prix pour foyers multi-chats",
        features: [
          "20-24 semaines pour 1 chat, 10-12 semaines pour 2+",
          "Livraison gratuite (parce que vous dépensez déjà assez en nourriture pour chat)",
          "Meilleur rapport qualité-prix que nous offrons"
        ],
        bestFor: "Foyers multi-chats, familles d'accueil, ou quiconque a abandonné de compter les litières."
      }
    },

    // What You Get Section
    whatYouGet: {
      title: "Ce qu'il y a vraiment dans le sac",
      subtitle: "(Et pourquoi votre chat ne le remarquera jamais)",
      benefits: [
        {
          title: "Charbon actif de qualité filtration d'eau",
          description: "Exactement le même matériau utilisé dans les filtres Brita et la purification d'air hospitalière. Pas 'similaire à.' Le même."
        },
        {
          title: "Zéro parfum. Zéro produit chimique. Zéro souci.",
          description: "Les chats ont 200 millions de récepteurs olfactifs. Les parfums artificiels les stressent. Purrify agit invisiblement."
        },
        {
          title: "Argile, cristal, agglomérante, naturelle... On ne juge pas",
          description: "Fonctionne avec la litière que votre chat vous a entraîné à acheter. Pas de drame de changement."
        },
        {
          title: "Ouvrir. Saupoudrer. C'est fait.",
          description: "Une fine couche sur le dessus. 30 secondes d'effort pour 7 jours de résultats."
        }
      ]
    },

    // Did You Know Fact Box
    didYouKnow: {
      title: "La science dont votre chat se fiche (Mais votre nez sera ravi)",
      body: "Un seul gramme de charbon actif contient environ 3 000 mètres carrés de surface. C'est plus grand que la moitié d'un terrain de football — dans quelque chose plus petit qu'un petit pois.\n\nÀ l'intérieur se trouvent des millions de pores et tunnels microscopiques. Quand les molécules d'ammoniaque passent, elles sont piégées en permanence.\n\nCe n'est pas du masquage. C'est de la capture moléculaire. La même technologie utilisée dans les masques à gaz, les usines de traitement d'eau et la filtration d'air hospitalière. Maintenant sur la litière de votre chat."
    },

    // CTA Section
    cta: {
      title: "Votre nez mérite mieux. Votre chat aussi.",
      subtitle: "Demandez Purrify dans votre animalerie préférée. S'ils ne l'ont pas encore, ils devraient.",
      secondary: "Vous ne voyez pas votre magasin? Dites-le nous. On fera le nécessaire."
    },

    // Related Pages
    relatedPages: [
      {
        title: "La science (sans les parties ennuyeuses)",
        description: "Découvrez la science derrière notre technologie au charbon actif et pourquoi elle est si efficace.",
        link: "/learn/how-it-works"
      },
      {
        title: "Ce que 1 000+ parents de chats ont dit",
        description: "Voyez ce que les clients satisfaits disent de leur expérience avec Purrify.",
        link: "/reviews"
      },
      {
        title: "Le guide complet de la litière pour chat",
        description: "Apprenez sur les différents types de litière et comment choisir la meilleure option pour votre chat.",
        link: "/learn/cat-litter-guide"
      }
    ],

    // Testimonial Section
    testimonial: {
      quote: "Je vis dans un petit studio avec deux chats, et l'odeur de la litière devenait insupportable. Purrify a complètement éliminé l'odeur en 24 heures. J'étais sceptique sur le prix au début, mais ça dure tellement plus longtemps que les autres produits que j'ai essayés. Chaque sou en vaut la peine!",
      author: "Sarah M.",
      location: "Montréal, QC",
      details: "2 chats, petit appartement",
      headline: "Un changement total pour mon appartement!"
    }
  },

  // Détaillants & B2B
  retailers: {
    seo: {
      pageTitle: "Partenaires grossistes & détaillants",
      description: "Rejoignez notre réseau de détaillants. Tarifs de gros, support marketing et produit éprouvé pour les animaleries partout au Canada.",
      openGraphAlt: "Partenaires grossistes",
      keywords: "additif litière chat grossiste, produits animalerie, partenariat détaillant, commandes en gros, tarifs grossiste, support marketing"
    },
    map: {
      title: "Nos Partenaires Détaillants et Clients | Réseau Purrify",
      description: "Découvrez notre réseau grandissant de détaillants et clients satisfaits à travers le Canada. Rejoignez notre famille de partenaires prospères."
    },
    hero: {
      badge: "Partenariat d'affaires",
      title: "Devenez partenaire de Purrify",
      subtitle: "Succès en gros",
      description: "Rejoignez des centaines d'animaleries qui offrent l'additif au charbon actif #1 au Canada. Ventes prouvées, clients fidèles et support marketing inclus.",
      cta: {
        primary: "Voir les tarifs de gros",
        secondary: "Devenir partenaire",
        startPartnership: "Commencer le partenariat aujourd'hui",
        viewPricing: "Voir les prix"
      },
      boostYour: "Boostez Vos",
      petStoreProfits: "Profits d'Animalerie",
      mainDescription: "Rejoignez 21 détaillants établis qui vendent la solution anti-odeur #1 au Canada avec des marges de 50%+",
      retailerCount: "21 détaillants établis",
      marginHighlight: "marges de 50%+",
      stats: {
        profitMargins: { value: "50%", label: "Marges de Profit" },
        repurchaseRate: { value: "89%", label: "Taux de Rachat" },
        setupTime: { value: "24h", label: "Temps d'Installation" }
      },
      valueProps: {
        highMargin: {
          title: "Produit à Haute Marge",
          highlight: "Jusqu'à 55% de marge",
          description: "Prix premium avec expédition légère. Marges plus élevées que les produits de litière lourds traditionnels."
        },
        customerLoyalty: {
          title: "Fidélité Client",
          highlight: "Note de 4.8/5 étoiles",
          description: "Les clients deviennent des ambassadeurs fidèles. Les rachats mensuels et les recommandations génèrent un revenu stable."
        },
        completeSupport: {
          title: "Support Complet",
          highlight: "Tout inclus",
          description: "Matériel PLV, formation, support marketing et gestion de compte dédiée inclus."
        }
      },
      trustIndicators: {
        label: "Approuvé par les détaillants leaders:",
        types: {
          petStores: "Animaleries",
          vetClinics: "Cliniques Vétérinaires",
          groomers: "Toiletteurs",
          distributors: "Distributeurs"
        }
      }
    },
    benefits: {
      pricing: {
        title: "Tarifs de gros",
        description: "Jusqu'à 50 % de marge avec des remises sur volume"
      },
      marketing: {
        title: "Support marketing",
        description: "Matériel PLV, formation d'équipe, publicité coopérative"
      },
      proven: {
        title: "Produit éprouvé",
        description: "4,8/5 étoiles et fort taux de réachat"
      },
      highDemand: {
        title: "Forte demande",
        description: "Les propriétaires recherchent des solutions d'odeurs. Purrify règle la plainte #1 liée aux litières."
      },
      highMargins: {
        title: "Marges premium",
        description: "Produit léger à forte valeur perçue. Marges supérieures à la litière traditionnelle."
      },
      easyStocking: {
        title: "Facile à stocker",
        description: "Emballage compact, pas besoin de réfrigération, longue durée de vie."
      },
      marketingSupport: {
        title: "Support marketing complet",
        description: "Présentoirs, formation produit, matériel éducatif et publicité coop incluse."
      },
      customerLoyalty: {
        title: "Fidélise la clientèle",
        description: "Une fois leur problème d'odeur résolu, vos clients reviennent chaque mois et recommandent votre boutique."
      },
      fastMoving: {
        title: "Rotation rapide",
        description: "Consommable avec réapprovisionnement mensuel prévisible."
      },
      title: "Pourquoi les détaillants choisissent Purrify",
      description: "Rejoignez des animaleries prospères qui ont ajouté Purrify à leur assortiment avec des résultats remarquables.",
      success: {
        title: "Histoires de succès réelles"
      }
    },
    pricing: {
      title: "Paliers de prix de gros",
      description: "Options flexibles pour maximiser vos marges tout en offrant une valeur exceptionnelle à vos clients.",
      tiers: {
        starter: {
          name: "Départ",
          description: "Parfait pour les petites animaleries"
        },
        growth: {
          name: "Croissance",
          description: "Le plus populaire pour les boutiques établies"
        },
        enterprise: {
          name: "Entreprise",
          description: "Pour les chaînes et grands détaillants"
        }
      },
      additional: {
        title: "Remises de volume disponibles",
        description: "Besoin de quantités plus importantes ? Nous offrons des prix sur mesure pour les chaînes, distributeurs et détaillants à fort volume."
      }
    },
    marketing: {
      title: "Support marketing complet",
      description: "Nous fournissons tout ce qu'il faut pour vendre Purrify : présentoirs, formation, scripts et contenus prêts à l'emploi.",
      coop: {
        title: "Programme de publicité coop",
        description: "Bénéficiez de crédits publicitaires pour promouvoir Purrify dans votre marché local (imprimé, radio, numérique)."
      }
    },
    testimonials: {
      title: "Ce que disent nos partenaires",
      description: "Avis réels de propriétaires et gérants d'animaleries partout au Canada.",
      metrics: {
        title: "Résultats commerciaux prouvés"
      }
    },
    wholesalePricing: {
      sectionBadge: "Prix de Gros Transparents",
      title: "Choisissez Votre",
      titleHighlight: "Niveau de Profit",
      subtitle: "Partenariat avec la solution anti-odeur féline la plus vendue au Canada. Pas de frais cachés, pas de surprises.",
      packageIncludes: "Le Forfait Comprend:",
      trustSignals: {
        noSetupFees: "Pas de Frais d'Installation",
        approval72hr: "Approbation en 72h",
        provenROI: "ROI Prouvé"
      },
      tiers: {
        starter: {
          name: "Forfait Débutant",
          badge: "Démarrage Rapide",
          description: "Parfait pour tester les eaux",
          contents: [
            "Une boîte format essai (25 petits sacs)",
            "Une boîte format moyen (15 sacs moyens)",
            "Une boîte format grand (10 grands sacs)"
          ],
          features: [
            "Produit éprouvé 4.8/5 étoiles",
            "Avantage d'expédition légère",
            "Présentoir PLV de base inclus",
            "Support email et guide d'installation",
            "Remplacement gratuit des produits endommagés"
          ],
          cta: "Commencer"
        },
        growth: {
          name: "Partenaire Croissance",
          badge: "Meilleure Valeur",
          description: "Le choix intelligent pour les détaillants en croissance",
          contents: [
            "Cinq boîtes format essai (125 petits sacs)",
            "Cinq boîtes format moyen (75 sacs moyens)",
            "Cinq boîtes format grand (50 grands sacs)",
            "BONUS: 5 sacs moyens gratuits"
          ],
          features: [
            "Présentoir comptoir premium",
            "Matériel de formation du personnel",
            "Actifs marketing digitaux (posts sociaux, modèles email)",
            "Support téléphone et email prioritaire"
          ],
          cta: "Commencer à Grandir"
        },
        scale: {
          name: "Succès à l'Échelle",
          badge: "Entreprise",
          description: "Pour une croissance sérieuse des revenus",
          contents: [
            "Dix boîtes format essai (250 petits sacs)",
            "Dix boîtes format moyen (150 sacs moyens)",
            "Dix boîtes format grand (100 grands sacs)",
            "BONUS: 25 sacs essai supplémentaires pour accrocher de nouveaux clients"
          ],
          features: [
            "Tout dans Partenaire Croissance",
            "Gestionnaire de compte dédié",
            "Matériel marketing personnalisé et co-branding",
            "Droits de protection territoriale",
            "Revues d'affaires trimestrielles et analyses de ventes",
            "Allocation d'inventaire prioritaire"
          ],
          cta: "Commencer"
        }
      },
      bottomCta: {
        title: "Prêt à Augmenter Vos Revenus?",
        description: "Rejoignez 21 détaillants établis de Montréal et environs qui gagnent déjà de hautes marges avec Purrify.",
        setupNote: "L'installation prend moins de 24 heures.",
        primaryButton: "Postuler pour le Partenariat",
        secondaryButton: "Appelez-nous"
      }
    },
    contact: {
      title: "Devenez Partenaire Détaillant Purrify",
      description: "Prêt à ajouter l'additif de litière #1 au Canada à votre magasin? Remplissez le formulaire ci-dessous et nous vous répondrons dans les 24 heures.",
      sectionBadge: "Rejoignez 21 Partenaires Établis",
      sectionTitle: "Commencez Votre",
      sectionTitleHighlight: "Partenariat Aujourd'hui",
      sectionDescription: "Prêt à gagner des marges de 50%+ avec la solution anti-odeur #1 au Canada?",
      setupNote: "L'installation prend moins de 24 heures.",
      urgencyStats: {
        approvalTime: { value: "72h", label: "Temps d'Approbation" },
        setupFees: { value: "Zéro", label: "Frais d'Installation" },
        currentPartners: { value: "21", label: "Partenaires Actuels" }
      },
      form: {
        title: "Candidature de Partenariat",
        subtitle: "Candidature rapide de 2 minutes. Nous répondons le jour même!",
        fields: {
          businessName: { label: "Nom de l'Entreprise", placeholder: "Nom de Votre Animalerie", required: true },
          contactName: { label: "Nom du Contact", placeholder: "Votre Nom Complet", required: true },
          position: { label: "Votre Poste dans l'Entreprise", placeholder: "ex. Propriétaire, Gérant, Acheteur, Représentant" },
          email: { label: "Adresse Email", placeholder: "votre@email.com", required: true },
          phone: { label: "Numéro de Téléphone", placeholder: "(555) 123-4567" },
          businessType: {
            label: "Type d'Entreprise",
            placeholder: "Sélectionner le Type d'Entreprise",
            required: true,
            options: {
              independentPetStore: "Animalerie Indépendante",
              petStoreChain: "Chaîne d'Animaleries",
              veterinaryClinic: "Clinique Vétérinaire",
              groomingSalon: "Salon de Toilettage",
              distributor: "Distributeur",
              other: "Autre"
            }
          },
          locations: { label: "Nombre d'Emplacements", placeholder: "1" },
          currentProducts: { label: "Marque de Litière la Plus Vendue", placeholder: "Quelle est la marque #1 de litière que vous vendez le plus?" },
          message: { label: "Informations Supplémentaires", placeholder: "Parlez-nous de votre entreprise et de vos besoins en gros..." }
        },
        submitButton: "Soumettre la Candidature de Partenariat",
        submitting: "Soumission en cours..."
      },
      success: {
        title: "Candidature Reçue!",
        welcome: "Bienvenue dans le Réseau de Partenaires Purrify!",
        responseTime: "Nous vous répondrons dans les 72 heures.",
        nextSteps: {
          title: "Vos Prochaines Étapes",
          step1: { title: "Examen de la Candidature", description: "Notre équipe examine les détails de votre magasin" },
          step2: { title: "Appel de Partenariat", description: "Discussion sur les prix, le support et la logistique" },
          step3: { title: "Commencer à Vendre", description: "Recevoir l'inventaire et lancer" }
        },
        timeline: {
          title: "Délai Prévu pour les Revenus",
          approval: { value: "72h", label: "Approbation" },
          firstShipment: { value: "3-5 jours", label: "Première Expédition" },
          firstSales: { value: "Semaine 1", label: "Premières Ventes" }
        },
        needHelp: "Besoin d'aide immédiate?"
      },
      successStories: {
        title: "Histoires de Succès de Partenaires",
        stories: {
          pattesEtGriffes: {
            businessName: "Pattes et Griffes – Sainte‑Thérèse",
            businessType: "Propriétaire / Gérant",
            quote: "Nos clients demandent Purrify par son nom maintenant. C'est une recommandation facile au comptoir et les commandes sont constantes mois après mois.",
            metric: "Cycle de 30 jours"
          },
          chico: {
            businessName: "Chico – Boul. St‑Laurent (Montréal)",
            businessType: "Gérant de Magasin",
            quote: "Simple à stocker, bonnes marges, et ça se vend bien. Les matériels POS ont aidé notre équipe à expliquer les avantages rapidement aux clients.",
            metric: "Rotation élevée"
          }
        }
      },
      contactInfo: {
        title: "Besoin d'Aide Immédiate?",
        subtitle: "Parlez avec un spécialiste partenariat maintenant",
        wholesaleEmail: "wholesale@purrify.ca",
        emailLabel: "Email Partenariat",
        emailHint: "Cliquez pour rédiger un email ou copier l'adresse.",
        copied: "Copié!",
        copyFailed: "Échec de la copie",
        businessHours: { title: "Heures d'Ouverture", hours: "Lundi - Vendredi: 9h - 18h EST" }
      },
      errors: {
        submitFailed: "Une erreur s'est produite lors de la soumission. Veuillez réessayer ou nous contacter directement à wholesale@purrify.ca",
        defaultSuccess: "Candidature de partenariat envoyée avec succès! Nous vous contacterons dans les 72 heures."
      }
    }
  },
  // Privacy Policy
  privacyPolicy: {
    title: "Politique de Confidentialité",
    lastUpdated: "Dernière mise à jour : juin 2024",
    sections: [
      {
        title: "Information que Nous Collectons",
        content: "Nous collectons des informations que vous nous fournissez directement lorsque vous utilisez notre site Web et nos services, notamment :",
        items: [
          "Nom et informations de contact",
          "Adresse de livraison (pour la livraison des produits)",
          "Adresse e-mail",
          "Informations sur les animaux de compagnie (comme les noms de chat)",
          "Données d'utilisation et préférences du site Web"
        ]
      },
      {
        title: "Comment Nous Utilisons Vos Informations",
        content: "Nous utilisons les informations collectées pour :",
        items: [
          "Traiter et expédier vos commandes",
          "Fournir un support client",
          "Envoyer des mises à jour de produits et des conseils de soins",
          "Améliorer nos produits et services",
          "Respecter les exigences légales"
        ]
      },
      {
        title: "Protection des Informations",
        content: "Nous employons des mesures de sécurité standard de l'industrie pour protéger vos informations personnelles, y compris la transmission cryptée et le stockage sécurisé.",
        items: []
      },
      {
        title: "Partage d'Informations",
        content: "Nous ne vendons, n'échangeons ou ne transférons pas vos informations personnelles à des tiers, sauf :",
        items: [
          "Avec votre consentement explicite",
          "Pour remplir vos commandes (comme les services de livraison)",
          "Lorsque requis par la loi ou pour protéger nos droits"
        ]
      },
      {
        title: "Cookies et Technologies de Suivi",
        content: "Nous utilisons des cookies et des technologies similaires pour améliorer votre expérience de navigation, analyser l'utilisation du site Web et fournir un contenu personnalisé.",
        items: []
      },
      {
        title: "Vos Droits",
        content: "Vous avez le droit de :",
        items: [
          "Accéder à vos informations personnelles",
          "Corriger les informations inexactes",
          "Demander la suppression de vos informations",
          "Vous désabonner des communications marketing"
        ]
      },
      {
        title: "Nous Contacter",
        content: "Si vous avez des questions sur cette politique de confidentialité, veuillez nous contacter par :",
        items: []
      }
    ],
    contactInfo: {
      email: "hello@purrify.ca",
      phone: CONTACT_INFO.phone,
      address: "Montréal, Canada"
    }
  },

  // FAQ Items
  faqItems: [
    {
      id: 1,
      category: "product",
      question: "Qu'est-ce que Purrify et comment ça fonctionne ?",
      answer: "Purrify est un additif au charbon actif pour litière qui élimine les odeurs au niveau moléculaire. Le charbon actif possède des millions de pores microscopiques qui piègent et neutralisent les composés responsables des odeurs.",
      popular: true,
      tags: ["charbon actif", "contrôle odeurs"]
    },
    {
      id: 2,
      category: "product",
      question: "Peut-on utiliser Purrify près des chats et des personnes ?",
      answer: "Purrify utilise le même type de charbon actif que l’on retrouve couramment dans les filtres à eau et à air domestiques. Sans parfums ni colorants ajoutés.",
      popular: true,
      tags: ["utilisation", "qualité filtration", "sans parfum"]
    }
  ],

  // FAQ Categories  
  faqCategories: [
    { id: "all", name: "Toutes les Questions", count: 16 },
    { id: "product", name: "Informations Produit", count: 6 },
    { id: "usage", name: "Usage et Application", count: 4 },
    { id: "shipping", name: "Expédition et Livraison", count: 3 },
    { id: "payment", name: "Paiement et Facturation", count: 2 },
    { id: "support", name: "Support Client", count: 1 }
  ],

  // FAQ Page
  faqPage: {
    title: "Foire Aux Questions",
    subtitle: "Tout ce que vous devez savoir sur Purrify",
    searchPlaceholder: "Rechercher des réponses...",
    popularQuestions: "Questions Les Plus Populaires",
    quickAnswers: "Réponses rapides aux questions les plus fréquentes",
    categories: "Catégories",
    questionsFound: "Question trouvée",
    questionsFoundPlural: "Questions trouvées",
    clearSearch: "Effacer Recherche",
    noQuestionsFound: "Aucune question trouvée",
    adjustSearchTerms: "Essayez d'ajuster vos termes de recherche ou le filtre de catégorie",
    stillHaveQuestions: "Vous Avez Encore Des Questions ?",
    cantFindWhatLooking: "Vous ne trouvez pas ce que vous cherchez ? Notre équipe de support client est là pour vous aider !",
    customerSupportReady: "Notre équipe de support client est là pour vous aider !",
    emailSupport: "Support par Courriel",
    detailedEmailHelp: "Obtenez des réponses détaillées par courriel",
    liveChat: "Chat en Direct",
    realTimeChatHelp: "Chattez avec nous en temps réel",
    phoneSupport: "Support Téléphonique",
    speakDirectlyTeam: "Parlez directement avec notre équipe",
    contactUs: "Nous Contacter",
    startChat: "Commencer Chat",
    callNow: "Appeler Maintenant",
    readyToTryPurrify: "Prêt à Essayer Purrify ?",
    startWithRiskFreeTrial: "Commencez avec notre format d'essai sans risque et découvrez la différence par vous-même.",
    compareAllSizes: "Comparer Toutes Les Tailles",
    tryRiskFree: "Essayer sans risque - 4,99 $",
    learnMoreAboutPurrify: "En savoir plus sur Purrify",
    howItWorks: "Comment ça marche",
    learnScience: "Découvrez la science derrière notre technologie au charbon actif et pourquoi elle est si efficace.",
    catLitterGuide: "Guide de la litière pour chats",
    completeGuide: "Guide complet des types de litière, des conseils d'entretien et des meilleures pratiques.",
    customerStories: "Histoires de clients",
    realExperiences: "Lisez des témoignages réels de propriétaires de chats qui ont transformé leur maison avec Purrify.",
    popularTag: "Populaire",
    breadcrumbs: {
      home: "Accueil",
      learn: "Apprendre",
      faq: "FAQ"
    },
    categoryList: [
      { name: "Toutes les Questions" },
      { name: "Informations sur le Produit" },
      { name: "Utilisation et Application" },
      { name: "Comparaisons" },
      { name: "Dépannage" },
      { name: "Livraison et Expédition" },
      { name: "Paiement et Facturation" },
      { name: "Support Client" }
    ],
    faqItems: [
      {
        question: "Qu'est-ce que Purrify et comment ça fonctionne ?",
        answer: "Purrify est un additif au charbon actif pour litière qui élimine les odeurs au niveau moléculaire grâce à un processus appelé adsorption. Contrairement aux désodorisants qui ne font que masquer les odeurs, Purrify piège les molécules d'odeur (ammoniac, mercaptans et autres composés) dans ses millions de pores microscopiques. Chaque particule de notre charbon actif de coque de noix de coco possède une énorme surface interne - 1 gramme a la même surface qu'un court de tennis ! Cela permet à Purrify d'éliminer jusqu'à 99,5 % des molécules d'odeur avant qu'elles n'atteignent votre nez, gardant votre maison fraîche pendant plus de 7 jours."
      },
      {
        question: "Purrify est-il sûr pour les chats et les chatons ?",
        answer: "Oui ! Purrify est fabriqué à partir de 100 % de charbon actif naturel de coque de noix de coco - le même matériau de qualité alimentaire et non toxique utilisé dans les systèmes de filtration d'eau hospitaliers et les purificateurs d'air. Il est totalement sûr en cas d'ingestion (bien que votre chat ne le mangera pas intentionnellement), ne cause pas de problèmes respiratoires et ne contient aucun produit chimique, parfum ou additif. Il est utilisé en toute confiance par les propriétaires de chats avec des chatons, des chats âgés et des chats ayant des sensibilités. En fait, le charbon actif est utilisé dans les traitements vétérinaires contre l'empoisonnement car il est si sûr et efficace pour lier les toxines."
      },
      {
        question: "Combien de temps dure une bouteille de Purrify ?",
        answer: "Cela dépend de la taille que vous choisissez et du nombre de chats que vous avez. Notre bouteille d'essai de 30 g dure 2 semaines pour un chat (application tous les 7 jours). La taille Régulière de 60 g dure 4 semaines, la Grande de 120 g dure 8 semaines et l'Économie de 240 g dure 16 semaines pour un foyer d'un seul chat. Pour plusieurs chats, la taille Grande (120 g) ou Économie (240 g) offre le meilleur rapport qualité-prix car vous pourriez avoir besoin d'appliquer plus fréquemment dans les litières très utilisées."
      },
      {
        question: "Comment appliquer Purrify à ma litière pour chat ?",
        answer: "C'est incroyablement simple ! Secouez la bouteille, retirez le bouchon à pression, saupoudrez 15 g (environ 2 cuillères à soupe) uniformément sur une litière propre, mélangez légèrement avec votre pelle et c'est fait. Pour de meilleurs résultats, appliquez sur une litière fraîche après un changement complet de bac, ou lorsque vous remarquez que les odeurs reviennent (généralement tous les 7 jours). Pas besoin de calculs compliqués - notre bouteille a des marquages de mesure clairs, et chaque application prend moins de 30 secondes."
      },
      {
        question: "Purrify fonctionne-t-il avec tous les types de litière pour chat ?",
        answer: "Absolument ! Purrify est compatible avec tous les types de litière : agglomérante, non agglomérante, argile, silice, bois, papier, blé, maïs et litières naturelles/écologiques. Il fonctionne en se mélangeant au niveau moléculaire avec le matériau de litière sans interférer avec ses propriétés d'agglomération ou d'absorption. Que vous utilisiez une litière à 5 $ ou premium à 50 $, Purrify améliore ses performances de contrôle des odeurs sans changer son fonctionnement."
      },
      {
        question: "Quelle est la différence entre Purrify et les désodorisants de litière ordinaires ?",
        answer: "Les désodorisants ordinaires masquent les odeurs avec des parfums forts (comme mettre du parfum sur des ordures), tandis que Purrify élimine complètement les odeurs par adsorption moléculaire. La plupart des désodorisants contiennent du bicarbonate de soude, des parfums artificiels ou des huiles essentielles qui ne font que cacher les odeurs temporairement et peuvent irriter les voies respiratoires de votre chat. Le charbon actif de Purrify piège physiquement et retient les molécules d'odeur dans sa structure poreuse, éliminant la source de l'odeur au lieu de simplement la couvrir. C'est pourquoi Purrify dure plus de 7 jours alors que les désodorisants parfumés échouent généralement en 24-48 heures."
      },
      {
        question: "Purrify affectera-t-il la capacité d'agglomération de ma litière ?",
        answer: "Pas du tout ! Purrify est conçu pour travailler avec la litière, pas contre elle. Le charbon actif n'interfère pas avec la formation de grumeaux, l'absorption d'humidité ou la capacité de ramassage. Il ajoute simplement une couche de contrôle des odeurs que votre litière existante ne peut pas fournir. En fait, de nombreux clients signalent que leur litière semble fonctionner mieux avec Purrify car elle reste fraîche plus longtemps, leur permettant d'en tirer davantage de chaque bac avant les changements complets."
      },
      {
        question: "Puis-je utiliser Purrify dans des litières automatiques ?",
        answer: "Oui ! Purrify fonctionne parfaitement avec les litières automatiques comme Litter-Robot, PetSafe ScoopFree et autres. Il suffit de saupoudrer et de mélanger comme d'habitude avant que votre chat n'utilise le bac. La poudre fine n'interférera pas avec les capteurs ou les mécanismes de râteau. En fait, le contrôle amélioré des odeurs est particulièrement précieux avec les litières automatiques car la litière reste dans l'unité plus longtemps entre les changements complets."
      },
      {
        question: "Ai-je besoin de plus pour plusieurs chats ?",
        answer: "Pour plusieurs chats, vous pourriez avoir besoin d'appliquer Purrify plus fréquemment (tous les 5-6 jours au lieu de tous les 7) ou d'utiliser une quantité légèrement plus grande par application. Notre recommandation : foyers de 1-2 chats → taille Régulière de 60 g ou Grande de 120 g ; foyers de 3+ chats → taille Grande de 120 g ou Économie de 240 g pour un meilleur rapport qualité-prix. La taille Économie est particulièrement économique pour les foyers multi-chats car vous réduisez le coût par application."
      },
      {
        question: "Qu'est-ce qui rend le charbon actif de Purrify différent du charbon ordinaire ?",
        answer: "Le charbon actif subit un processus d'activation spécialisé à haute température qui crée des millions de pores microscopiques, lui donnant 100-300 fois plus de surface que le charbon ordinaire. Notre charbon de coque de noix de coco spécifiquement est choisi car il possède la structure de pores idéale pour piéger les petites molécules d'odeur comme l'ammoniac (0,26 nm) et les mercaptans (0,4 nm). Le charbon ordinaire de briquettes de barbecue ou de cendres de bois manque de cette microstructure poreuse et ne fournirait essentiellement aucun contrôle des odeurs."
      },
      {
        question: "Combien coûte Purrify par mois ?",
        answer: "Cela dépend de la taille que vous choisissez. Pour un chat : Essai 4,99 $ pour 2 semaines (9,98 $/mois), Régulier 8,99 $/mois, Grand 8,39 $/mois (meilleur rapport qualité-prix), Économie 7,84 $/mois (prix le plus bas). Pour plusieurs chats, nous recommandons la taille Grande ou Économie car vous pourriez avoir besoin d'appliquer plus fréquemment. Le Grand de 120 g offre le meilleur équilibre entre valeur et commodité pour la plupart des foyers - moins de 2 $/semaine pour un air complètement frais."
      },
      {
        question: "Purrify offre-t-il la livraison gratuite ?",
        answer: "Nous expédions au Canada et aux États-Unis. Les commandes arrivent généralement en 5-7 jours ouvrables via Postes Canada. Les frais d'expédition sont affichés lors du paiement."
      },
      {
        question: "Quelle est la rapidité d'action de Purrify ?",
        answer: "Vous verrez (ou plutôt sentirez) les résultats immédiatement ! Dès que vous saupoudrez Purrify, le charbon actif commence à piéger les molécules d'odeur. La plupart des clients remarquent une amélioration spectaculaire du contrôle des odeurs dans les premières heures. Contrairement aux solutions parfumées qui ne masquent les odeurs que temporairement, l'adsorption de Purrify fonctionne 24h/24 et 7j/7 pendant plus de 7 jours, s'améliorant continuellement à mesure que plus de molécules d'odeur sont piégées."
      },
      {
        question: "Puis-je utiliser Purrify avec d'autres solutions de contrôle des odeurs ?",
        answer: "Oui ! Purrify fonctionne bien avec d'autres solutions de contrôle des odeurs, bien que la plupart des clients constatent qu'ils n'en ont plus besoin. Vous pouvez l'utiliser avec des doublures de litière, des tapis ou des litières fermées. Cependant, évitez le bicarbonate de soude ou les parfums en poudre forts car ils peuvent interférer avec la capacité du charbon à piéger les odeurs. Pour de meilleurs résultats, laissez Purrify être votre solution principale de contrôle des odeurs - il est plus efficace que tout ce que vous pourriez combiner avec."
      },
      {
        question: "Quelle est votre politique de retour ?",
        answer: "Nous offrons une garantie sans questions de 30 jours. Si vous n'êtes pas complètement satisfait de Purrify pour quelque raison que ce soit, contactez-nous dans les 30 jours suivant votre achat pour un remboursement complet. Nous payons seulement les frais de retour (le cas échéant) - sinon gardez le produit. Nous sommes si confiants que vous aimerez Purrify que nous rendons le retour complètement sans risque. Pour initier un retour, envoyez simplement un e-mail à hello@purrify.com."
      },
      {
        question: "Purrify est-il écologique et durable ?",
        answer: "Absolument ! Purrify est fabriqué à partir de 100 % de coques de noix de coco renouvelables - un sous-produit de l'industrie de la noix de coco qui serait autrement un déchet. Il ne contient aucun produit chimique synthétique, parfum artificiel ou additif. L'emballage est recyclable, et parce que Purrify prolonge la vie de votre litière, vous réduisez en fait les déchets de litière dans l'ensemble. En utilisant une source naturelle et renouvelable tout en aidant votre litière à durer plus longtemps, Purrify est l'une des solutions de contrôle des odeurs les plus respectueuses de l'environnement disponibles."
      },
      {
        question: "Purrify fonctionnera-t-il dans les foyers avec plusieurs litières ?",
        answer: "Oui ! Il suffit d'appliquer Purrify à chaque litière indépendamment. Si vous avez 2-3 bacs, la taille Grande de 120 g ou Économie de 240 g offre le meilleur rapport qualité-prix car vous pouvez traiter plusieurs bacs avec un seul achat. De nombreux foyers multi-bacs utilisent la règle 'un bac par chat plus un', et Purrify fonctionne parfaitement dans cette configuration - il suffit de saupoudrer 15 g par bac tous les 7 jours."
      },
      {
        question: "Puis-je utiliser moins de Purrify que recommandé ?",
        answer: "Bien que vous puissiez techniquement utiliser moins, nous recommandons les 15 g complets (environ 2 cuillères à soupe) par application pour un contrôle optimal des odeurs. Utiliser moins peut ne pas fournir suffisamment de charbon actif pour piéger efficacement toutes les molécules d'odeur dans votre bac, surtout vers la fin du cycle de 7 jours. Pensez-y comme une assurance contre les odeurs - les 15 g complets garantissent une efficacité maximale. Si vous cherchez à économiser, notre taille Économie de 240 g offre le meilleur coût par application à 1,86 $."
      },
      {
        question: "Que se passe-t-il si mon chat est asthmatique ou allergique ?",
        answer: "Purrify est excellent pour les chats asthmatiques ou allergiques car il ne contient ni parfums, ni produits chimiques, ni particules irritantes. Contrairement aux désodorisants parfumés qui peuvent déclencher des problèmes respiratoires, le charbon actif est inerte et inodore. En fait, les purificateurs d'air avec filtres au charbon actif sont couramment recommandés pour les propriétaires de chats asthmatiques. Comme toujours, si votre chat a de graves problèmes de santé, consultez votre vétérinaire, mais Purrify est l'une des options de contrôle des odeurs les plus sûres et douces disponibles."
      },
      {
        question: "Comment Purrify se compare-t-il aux litières fermées pour le contrôle des odeurs ?",
        answer: "Purrify et les litières fermées résolvent des problèmes différents. Les litières fermées contiennent les odeurs (empêchent leur dispersion) mais n'éliminent pas les odeurs - l'air à l'intérieur du bac sent toujours mauvais, et lorsque votre chat entre ou que vous sortez pour ramasser, ces odeurs concentrées s'échappent. Purrify élimine en fait les odeurs au niveau moléculaire, donc il n'y a rien à contenir. De nombreux clients utilisent les deux - Purrify à l'intérieur d'une litière fermée pour une double protection - mais la plupart trouvent que Purrify seul élimine complètement le besoin d'une litière fermée !"
      },
      {
        question: "Ai-je besoin de charbon actif spécial pour litière ?",
        answer: "Oui ! Tous les charbons actifs ne sont pas égaux. Le charbon d'aquarium, de purificateurs d'air ou de produits de jardinage est optimisé pour différentes tailles de molécules et types de contaminants. Le charbon actif de coque de noix de coco de Purrify est spécifiquement sélectionné et de taille de particule idéale pour piéger les molécules d'odeur spécifiques de litière (ammoniac, mercaptans, composés soufrés volatils) qui existent dans la plage de 0,2-0,5 nm. Utiliser du charbon à usage général serait comme utiliser un filtre à café pour filtrer l'eau - mauvais matériau pour le travail."
      },
      {
        question: "Puis-je acheter Purrify en magasin ?",
        answer: "Actuellement, Purrify est disponible principalement via notre site Web pour garantir fraîcheur, qualité et prix direct au consommateur. Nous travaillons sur des partenariats de vente au détail et pourrions être dans certains magasins sélectionnés bientôt. Commander en ligne signifie que vous obtenez le produit le plus frais directement de nous, sans majoration de détail. De plus, notre boutique en ligne offre des remises sur quantité, la livraison gratuite au-delà de 35 $ et un abonnement avec économies que vous ne trouverez pas en magasin."
      },
      {
        question: "Que se passe-t-il si j'oublie d'appliquer Purrify après 7 jours ?",
        answer: "Pas de problème ! Purrify ne cesse pas de fonctionner comme par magie le jour 8. Les pores de charbon se saturent progressivement avec le temps, donc vous pourriez remarquer des odeurs légèrement plus fortes vers les jours 8-10. Il suffit d'appliquer votre prochaine dose de 15 g quand vous vous en souvenez. Pour une mémoire cohérente, de nombreux clients choisissent un 'jour Purrify' hebdomadaire (comme les dimanches) et l'ajoutent à leur routine de nettoyage de litière. Certains définissent des rappels de calendrier mobile."
      },
      {
        question: "Purrify crée-t-il de la poussière lorsque je le saupoudre ?",
        answer: "Purrify est une poudre fine, donc il y a un minimum de poussière lors de l'application - similaire à saupoudrer du bicarbonate de soude. Pour minimiser la poussière : (1) saupoudrez près de la surface de litière plutôt que de haut, (2) saupoudrez lentement plutôt que de verser rapidement, (3) mélangez doucement après application. La poussière se dépose rapidement dans la litière et devient indétectable une fois mélangée. Contrairement aux désodorisants parfumés, le charbon actif ne crée pas de nuages de parfum lorsque les chats creusent."
      },
      {
        question: "Puis-je utiliser Purrify dans une litière pour chat maison ?",
        answer: "Oui ! Purrify fonctionne avec des solutions de litière maison comme les granulés de bois, le papier journal déchiqueté, le sable ou la sciure. En fait, les matériaux maison manquent généralement du contrôle des odeurs intégré des litières commerciales, donc Purrify est particulièrement précieux. Il suffit de saupoudrer 15 g sur votre matériau de bac maison et de mélanger. Le charbon actif fonctionnera exactement de la même manière - piégeant les molécules d'odeur quel que soit le matériau de bac que vous utilisez."
      },
      {
        question: "Comment savoir quelle taille de Purrify acheter ?",
        answer: "Pour un chat : Essai de 30 g (2 semaines) pour l'essayer, Régulier de 60 g (1 mois) pour une utilisation occasionnelle, Grand de 120 g (2 mois, meilleur rapport qualité-prix !), Économie de 240 g (4 mois) pour les utilisateurs engagés. Pour 2-3 chats : Grand de 120 g ou Économie de 240 g car vous pourriez appliquer plus fréquemment. Pour 4+ chats ou foyers multi-bacs : Économie de 240 g ou plusieurs bouteilles. Toujours pas sûr ? La plupart des clients débutants commencent avec le Régulier de 60 g ou le Grand de 120 g."
      },
      {
        question: "Dois-je mélanger Purrify dans la litière ou simplement le saupoudrer dessus ?",
        answer: "Pour de meilleurs résultats, mélangez légèrement Purrify dans les 2-3 pouces supérieurs de litière en utilisant votre pelle. Cela distribue le charbon actif à travers la couche où votre chat creuse et où l'urine se forme. Vous n'avez pas besoin de mélanger profondément ou d'obtenir une distribution parfaite - juste quelques coups doux avec la pelle suffisent. Certaines personnes le saupoudrent simplement dessus et laissent le creusement de leur chat le mélanger naturellement, ce qui fonctionne également, mais le mélange manuel assure une couverture plus uniforme dès le premier jour."
      },
      {
        question: "Purrify fonctionnera-t-il pour les chats âgés avec une urine très forte ?",
        answer: "Absolument ! Les chats âgés ont généralement une urine plus concentrée, rendant le contrôle des odeurs plus difficile. Le charbon actif de Purrify est particulièrement efficace contre l'ammoniac fort et les mercaptans dans l'urine de chat âgé. De nombreux clients achètent spécifiquement Purrify parce que leurs chats âgés produisent des odeurs que la litière ordinaire ne peut pas gérer. Pour les cas particulièrement forts, vous pourriez appliquer tous les 5-6 jours au lieu de tous les 7, mais la plupart trouvent que le calendrier de 7 jours fonctionne même pour les chats âgés."
      },
      {
        question: "Puis-je utiliser Purrify dans des plateaux d'entraînement pour chatons ?",
        answer: "Oui ! Purrify est totalement sûr pour les chatons et fonctionne tout aussi bien dans leurs plus petits plateaux d'entraînement. Il suffit d'ajuster la quantité en fonction de la taille du plateau - utilisez environ 1 cuillère à soupe (7-8 g) pour les plus petits plateaux de chatons au lieu des 15 g complets. Cela aide les jeunes chatons à associer positivement leur litière à la propreté et à la fraîcheur, établissant de bonnes habitudes de litière dès le départ."
      },
      {
        question: "Que se passe-t-il si je renverse Purrify sur mon sol ?",
        answer: "Ne vous inquiétez pas ! Le charbon actif est totalement sûr et inerte. Il suffit de balayer ou d'aspirer la poudre renversée comme n'importe quelle autre poussière domestique. Il ne tachera pas les sols, tapis ou tissus. S'il tombe sur un tapis, aspirez complètement - la poudre noire fine peut être visible sur les tapis de couleur claire jusqu'à ce qu'elle soit aspirée. Évitez de le frotter humide car cela peut étaler la poudre ; nettoyez toujours à sec d'abord."
      },
      {
        question: "Puis-je m'abonner pour des livraisons automatiques ?",
        answer: "Oui ! Nous proposons des abonnements d'expédition automatique avec 10 % de réduction. Choisissez votre taille préférée et la fréquence de livraison (toutes les 4, 8 ou 12 semaines) et nous expédierons automatiquement Purrify à votre porte avant que vous ne soyez à court. Vous pouvez mettre en pause, sauter ou annuler à tout moment - pas de contrats ni d'engagements. La plupart des clients d'un chat choisissent la livraison de la taille Grande de 120 g toutes les 8 semaines pour ne jamais manquer de Purrify tout en maintenant un faible coût par application."
      },
      {
        question: "Comment Purrify se compare-t-il aux produits au bicarbonate de soude pour le contrôle des odeurs ?",
        answer: "Le bicarbonate de soude neutralise les odeurs par des réactions chimiques, mais a une capacité limitée et cesse de fonctionner une fois la réaction terminée (généralement 24-48 heures dans les litières). Le charbon actif de Purrify piège physiquement les molécules d'odeur dans ses pores par adsorption, ce qui dure beaucoup plus longtemps (plus de 7 jours) et fonctionne sur une gamme plus large de molécules d'odeur. Le bicarbonate de soude peut également être poussiéreux et moins efficace contre les odeurs fortes d'ammoniac, tandis que le charbon de Purrify a été spécialement conçu pour les molécules d'odeur de litière."
      },
      {
        question: "Offrez-vous des remises sur quantité ?",
        answer: "Oui ! Plus vous achetez, plus vous économisez : achetez 2-3 bouteilles → économisez 10 %, achetez 4-5 bouteilles → économisez 15 %, achetez 6+ bouteilles → économisez 20 %. Ces remises se cumulent avec notre taille Économie déjà économique de 240 g. Les foyers multi-chats ou les clients qui achètent pour des amis profitent souvent des remises sur quantité. De plus, la livraison gratuite sur les commandes de plus de 35 $ rend les achats en gros encore plus avantageux."
      },
      {
        question: "Que dois-je faire si Purrify ne fonctionne pas pour moi ?",
        answer: "Premièrement, assurez-vous d'utiliser les 15 g complets (environ 2 cuillères à soupe) par application et d'appliquer sur une litière propre. Deuxièmement, vérifiez que votre litière n'est pas expirée ou sursaturée (si elle a plus de 2-3 semaines, il est peut-être temps pour un changement complet). Troisièmement, pour les odeurs particulièrement fortes (plusieurs chats, chats âgés), essayez d'appliquer tous les 5-6 jours au lieu de tous les 7. Si vous avez essayé ces étapes et n'êtes toujours pas satisfait, contactez-nous - nous sommes soutenus par notre garantie de 30 jours et travaillerons avec vous pour résoudre le problème ou fournir un remboursement complet."
      },
      {
        question: "Puis-je utiliser Purrify dans les litières pour lapins ou autres petits animaux ?",
        answer: "Absolument ! Bien que Purrify soit conçu pour les litières pour chats, il fonctionne tout aussi bien pour les litières de lapins, furets, cochons d'Inde, chinchillas et autres petits animaux. Il suffit d'ajuster la quantité en fonction de la taille du bac - utilisez environ 10-15 g selon la taille. Le charbon actif est sûr pour tous les petits animaux, non toxique en cas d'ingestion et contrôle efficacement les odeurs d'urine de tout petit mammifère."
      },
      {
        question: "Comment dois-je conserver Purrify ?",
        answer: "Conservez Purrify dans un endroit frais et sec avec le bouchon à pression bien fermé. Évitez l'exposition à une humidité élevée, ce qui peut amener le charbon actif à commencer à adsorber l'humidité de l'air au lieu de conserver sa capacité pour les odeurs de litière. Ne réfrigérez pas ou ne congelez pas - la température ambiante dans une armoire ou un garde-manger est parfaite. Correctement conservé, Purrify maintient une efficacité totale pendant 2-3 ans. La bouteille est compacte et se range facilement sous l'évier, dans les armoires de nettoyage ou partout où vous gardez les fournitures de litière."
      },
      {
        question: "Puis-je voyager avec Purrify ?",
        answer: "Oui ! Purrify est sûr pour les voyages. La bouteille à bouchon à pression est étanche aux déversements et le charbon actif n'est ni liquide ni aérosol, il convient donc pour les bagages à main ou enregistrés. Si vous voyagez avec votre chat et emportez une litière portable, emportez simplement une petite quantité dans la bouteille d'Essai de 30 g. C'est particulièrement utile pour les chambres d'hôtel, les locations de vacances ou lors de visites familiales - saupoudrez Purrify dans la litière temporaire de votre chat pour garder l'espace de location sans odeur."
      }
    ]
  },


  // Homepage specific translations
  homepage: {
    seo: {
      pageTitle: "Additif naturel pour litière qui élimine les odeurs de chat instantanément",
      keywords: "additif litière chat, contrôle odeur, charbon actif, éliminateur odeur naturel, fraîcheur litière, produit chat Canada",
      openGraphImageAlt: "Purrify - Additif naturel pour litière de chat qui élimine les odeurs",
      videoAlt: "Démonstration de Purrify éliminant les odeurs de litière pour chat",
      videoDescription: "Vidéo montrant l'efficacité de Purrify pour éliminer les odeurs de litière pour chat",
      videoEffectivenessDemo: "Démonstration de l'efficacité de Purrify contre les odeurs de litière pour chat"
    },
    trustBadges: {
      securePayment: {
        title: "Paiement Sécurisé",
        description: "SSL 256 bits",
        detail: "Paiement crypté SSL avec Stripe"
      }
    },
    socialProof: {
      nationalDelivery: "100% Naturel • Fabriqué au Canada",
      fastDelivery: "Livraison rapide partout au Canada",
      recentOrders: "commandes cette semaine"
    },
    hero: {
      videoAriaLabel: "Vidéo de démonstration montrant l'additif Purrify au charbon actif éliminant les odeurs de litière pour chat avant et après application",
      videoFallbackText: "Votre navigateur ne prend pas en charge la balise vidéo. Cette vidéo démontre l'additif Purrify au charbon actif éliminant les odeurs avant et après application à la litière pour chat.",
      videoDescriptions: "Descriptions en Français",
      highlyRated: "Très Bien Noté",
      moneyBackGuarantee: "Support d'experts en odeurs",
      freeShippingCanada: "Livraison Gratuite au Canada"
    },
    enhancedComparison: {
      duration: "Durée",
      coverage: "Couverture",
      chooseYourPerfectSize: "Choisissez Votre Taille Parfaite",
      allSizesDeliver: "Toutes les tailles offrent la même élimination puissante des odeurs. Choisissez en fonction de la taille de votre foyer et de la fréquence d'utilisation.",
      whyChoosePurrify: "Pourquoi Choisir Purrify ?",
      joinThousands: "Rejoignez 1 000+ parents de chats satisfaits qui font confiance à Purrify",
      happyCustomers: "Clients Satisfaits",
      averageRating: "Note Moyenne",
      satisfactionRate: "Taux de Satisfaction",
      odorFreeGuarantee: "Air frais à chaque application",
      tryRiskFree: "Essayer Sans Risque",
      chooseThisSize: "Choisir Cette Taille"
    },
    altText: {
      scientificDiagram: "Diagramme scientifique montrant la structure moléculaire du charbon actif avec des micropores qui piègent les molécules d'odeur",
      productPackages: "Trois emballages Purrify montrant différentes tailles : essai 12g, standard 50g et pack famille 120g",
      microscopicView: "Vue microscopique du charbon actif montrant la structure poreuse qui capture les molécules d'odeur",
      happyCat: "Chat heureux se reposant paisiblement dans un environnement domestique frais et sans odeur",
      happyCatAlt: "Chat heureux",
      userAvatar: "Utilisateur",
      customerTestimonials: "Voir les témoignages clients",
      leaveGoogleReview: "Laisser un avis Google",
      litterCompatibility: "Un chat profite de sa litière préférée, montrant la compatibilité de Purrify avec tous les types de litière"
    },
    subscription: {
      fastDelivery: "Livraison Rapide",
      quickReliableShipping: "Expédition rapide et fiable",
      skipAnytime: "Ignorer À Tout Moment",
      fullControlDeliveries: "Contrôle total sur les livraisons",
      lovedByCustomers: "Aimé par des propriétaires de chats",
      joinSatisfiedCustomers: "Rejoignez des clients satisfaits :",
      thirtyDayGuarantee: "Support continu",
      moneyBackPromise: "Engagement service client",
      fiveStarRated: "Approche sans parfum",
      reviewsRating: "Avis clients",
      testimonialQuote: ""
    }
  },

  // Blog
  blog: {
    multiCat: {
      title: "Meilleur Désodorisant pour Litière Multi-Chats : Guide Ultime de Contrôle des Odeurs 2024",
      description: "Découvrez le désodorisant le plus efficace pour les foyers multi-chats. Solutions expertes pour éliminer les odeurs fortes de plusieurs chats utilisant la technologie au charbon actif éprouvée.",
      category: "Guide Foyer Multi-Chats",
      publishDate: "Publié le 16 septembre 2024",
      readTime: "12 min de lecture",
      breadcrumb: "Solutions Multi-Chats",
      stats: {
        title: "Statistiques Foyer Multi-Chats",
        strongerOdors: "Odeurs plus fortes vs un seul chat",
        litterBoxes: "Bacs à litière par chat minimum",
        moreDeodorizer: "Plus de désodorisant nécessaire",
        maintenance: "Entretien requis"
      }
    },
    odorAbsorber: {
      title: "Absorbeur d'odeurs le plus puissant pour la litière : guide scientifique 2025",
      description: "Découvrez les stratégies d'absorption d'odeurs les plus puissantes pour la litière. Comparez le carbone activé, la zéolite et les systèmes hybrides afin que votre maison puisse rester fraîche sans parfums agressifs.",
      category: "Science et technologie des odeurs",
      publishDate: "Publié le 19 octobre 2025",
      readTime: "Lecture de 14 min",
      breadcrumb: "Science des odeurs",
      stats: {
        title: "Repères sur l'élimination des odeurs",
        ammoniaReduction: "Réduction d'ammoniac mesurée jusqu'à 92 % avec des couches de carbone activé",
        adsorptionSpeed: "Structure poreuse capturant les molécules en moins de 60 secondes",
        safeUsage: "Sans parfum, sans additifs - conçu pour les chats sensibles",
        refreshTiming: "Rafraîchir le carbone à chaque ramassage ou ajout de litière pour garder l'efficacité"
      }
    }
  },

  // Scrolling Announcement Bar
  scrollingBar: {
    freeShipping: "Livraison Gratuite sur Tous les Abonnements",
    madeInCanada: "Fabriqué au Canada avec des Ingrédients d'Origine Nationale et Mondiale"
  },

  // Maps
  maps: {
    findNearYou: "Trouvez Purrify Près de Chez Vous | Magasins Détaillants",
    discoverWhere: "Découvrez où acheter Purrify à travers le Canada. Chaque point représente un magasin de détail où vous pouvez trouver nos produits.",
    loadingMap: "Chargement de la carte...",
    retailStores: "🗺️ Magasins détaillants Purrify à travers le Canada - Montréal, Toronto, Vancouver et plus",
    cities: {
      montreal: "Montréal",
      quebec: "Québec",
      toronto: "Toronto",
      vancouver: "Vancouver",
      calgary: "Calgary",
      ottawa: "Ottawa"
    },
    iframeTitle: "Carte des Magasins Détaillants Purrify"
  },

  // Upsell Page
  upsell: {
    pageTitle: "Offre Spéciale Unique - Purrify",
    metaDescription: "Offre unique exclusive pour les nouveaux clients. Économisez 25% sur l'abonnement trimestriel automatique.",
    offerExpired: "Offre Expirée",
    offerExpiresIn: "L'offre expire dans",
    headline: "Attendez! Offre Exclusive Unique",
    subheadline: "Ajoutez l'abonnement automatique et économisez 25%",
    saveBadge: "ÉCONOMISEZ 29%",
    productTitle: "Purrify 50g Abonnement Automatique",
    productSubtitle: "Approvisionnement de 3 Mois (3 × 50g sachets)",
    youSave: "Vous économisez",
    benefit1: "Ne manquez jamais - livré tous les 3 mois",
    benefit2: "Livraison gratuite incluse (économisez 7,99 $)",
    benefit3: "Verrouillez ce prix spécial pour toujours",
    benefit4: "Annulez ou sautez à tout moment (sans engagement)",
    benefit5: "Rappels automatiques avant chaque expédition",
    processing: "Traitement en cours...",
    addToOrder: "Oui! Ajouter à Ma Commande",
    noThanks: "Non merci, je préfère payer le prix plein plus tard",
    feature1Title: "Activation Instantanée",
    feature1Description: "Votre abonnement automatique commence immédiatement après cette commande",
    feature2Title: "100% Satisfaction",
    feature2Description: "Garantie de remboursement de 30 jours sur chaque expédition",
    feature3Title: "Contrôle Flexible",
    feature3Description: "Sautez, suspendez ou annulez en ligne à tout moment",
    testimonialText: "J'ai failli sauter l'offre d'abonnement automatique, mais je suis si content de ne pas l'avoir fait! C'est une chose de moins à retenir, et les économies s'accumulent. De plus, je ne manque jamais quand j'en ai le plus besoin.",
    testimonialAuthor: "— Sarah M., Toronto",
    faqTitle: "Questions Courantes",
    faq1Question: "Puis-je annuler à tout moment?",
    faq1Answer: "Absolument! Annulez, sautez ou modifiez votre abonnement à tout moment depuis votre tableau de bord. Pas de frais, pas de tracas.",
    faq2Question: "Quand serai-je facturé?",
    faq2Answer: "Vous serez facturé aujourd'hui pour cette offre spéciale. Votre prochaine expédition sera dans 3 mois, et vous recevrez un email de rappel 7 jours avant.",
    faq3Question: "Le prix est-il verrouillé?",
    faq3Answer: "Oui! Ce prix spécial est verrouillé tant que vous restez abonné. Vous ne paierez jamais plus que ce tarif.",
    bottomNote: "Cette offre unique n'est disponible qu'immédiatement après votre premier achat",
    returnHome: "Retour à l'accueil"
  },

  // Affiliate Page
  affiliate: {
    metaTitle: "Gagnez un Revenu Mensuel avec le Programme d'Affiliation Purrify",
    metaDescription: "Recommandez Purrify aux propriétaires de chats et gagnez une commission récurrente de 30% à vie. Rejoignez des centaines d'affiliés qui gagnent un revenu passif en aidant les chats à vivre sans odeur.",
    hero: {
      badge: "Rejoignez Notre Programme d'Affiliation",
      title: "Gagnez un Revenu Mensuel Avec Purrify",
      subtitle: "Recommandez Purrify aux propriétaires de chats et gagnez 30% de revenu récurrent mensuel à vie.",
      primaryCTA: "Devenez Affilié",
      secondaryCTA: "Voir le Calculateur de Revenus"
    },
    calculator: {
      title: "Calculez Vos Gains Potentiels",
      subtitle: "Ajustez les curseurs pour voir combien vous pourriez gagner avec la commission de 30% de Purrify",
      standardProduct: "50g Standard (24,99$) - Références/Mois",
      familyPack: "120g Format Familial (44,99$) - Références/Mois",
      perSale: "par vente",
      monthlyIncome: "Revenu Mensuel Estimé",
      yearlyIncome: "Revenu Annuel Estimé",
      disclaimer: "Ce sont des gains potentiels basés sur une commission de 30%. Les résultats réels peuvent varier.",
      cta: "Commencez à Gagner Maintenant"
    },
    howItWorks: {
      title: "Comment Ça Marche",
      step1: {
        title: "Rejoignez le Programme",
        description: "Créez votre compte d'affilié et recevez votre lien de parrainage unique. C'est gratuit de rejoindre et prend moins de 2 minutes."
      },
      step2: {
        title: "Partagez Votre Lien",
        description: "Partagez votre lien de parrainage avec votre audience via les médias sociaux, articles de blog, vidéos ou email. Nous fournissons du matériel marketing pour vous aider à réussir."
      },
      step3: {
        title: "Soyez Payé à Vie",
        description: "Gagnez une commission récurrente de 30% sur chaque vente de vos parrainés - pas seulement le premier achat, mais pour toujours. Paiements envoyés mensuellement par votre méthode préférée."
      }
    },
    benefits: {
      title: "Pourquoi Rejoindre le Programme d'Affiliation Purrify?",
      subtitle: "Nous avons conçu notre programme pour vous aider à réussir avec des commissions et un soutien de premier plan dans l'industrie",
      benefit1: {
        title: "Commissions à Vie de 30%",
        description: "Contrairement à la plupart des programmes qui ne paient que sur la première vente, vous gagnez 30% sur chaque achat de vos parrainés - pour toujours. Construisez un véritable revenu passif."
      },
      benefit2: {
        title: "Produit à Haute Conversion",
        description: "Purrify résout un vrai problème auquel les propriétaires de chats sont confrontés quotidiennement. Avec 4,8/5 étoiles et un taux de satisfaction de 98%, nos produits se vendent tout seuls."
      },
      benefit3: {
        title: "Suivi en Temps Réel",
        description: "Surveillez vos gains, clics et conversions en temps réel avec notre tableau de bord d'affilié avancé. Transparence totale sur vos performances."
      },
      benefit4: {
        title: "Ressources Marketing",
        description: "Accédez à des bannières professionnelles, modèles d'email, images de produits et textes éprouvés. Nous fournissons tout ce dont vous avez besoin pour réussir."
      }
    },
    testimonials: {
      title: "Histoires de Succès de Nos Affiliés",
      testimonial1: {
        quote: "J'ai gagné plus de 3 400$ au cours des 6 derniers mois simplement en recommandant Purrify à l'audience de mon blog sur les chats. Les commissions récurrentes s'accumulent rapidement!",
        name: "Jessica M.",
        role: "Propriétaire de Blog sur les Chats"
      },
      testimonial2: {
        quote: "Meilleur programme d'affiliation auquel j'ai adhéré. Excellent produit, taux de conversion élevé, et la commission à vie de 30% est imbattable. Je recommande vivement!",
        name: "Mike T.",
        role: "Critique de Produits pour Animaux"
      },
      testimonial3: {
        quote: "L'équipe de support est incroyable. Ils m'ont aidé à optimiser mon contenu et maintenant je gagne un revenu mensuel stable. C'est vraiment un revenu passif.",
        name: "Amanda R.",
        role: "Créatrice YouTube"
      }
    },
    faq: {
      title: "Questions Fréquemment Posées",
      question1: "Combien puis-je gagner?",
      answer1: "Vous gagnez une commission de 30% sur chaque vente. Si vous parrainez 10 clients achetant le format standard à 24,99$ mensuellement, c'est 74,97$/mois en revenu récurrent. Il n'y a pas de limite à combien vous pouvez gagner.",
      question2: "Quand suis-je payé?",
      answer2: "Les commissions sont payées mensuellement via PayPal, dépôt direct ou chèque. Nous payons le 15 de chaque mois pour les gains du mois précédent. Paiement minimum de 50$.",
      question3: "Combien de temps durent les cookies?",
      answer3: "Nos cookies d'affiliation durent 90 jours. Si quelqu'un clique sur votre lien et achète dans les 90 jours, vous obtenez le crédit pour cette vente et tous les achats futurs de ce client.",
      question4: "Ai-je besoin d'un site web?",
      answer4: "Non! Bien qu'avoir un site web aide, vous pouvez partager votre lien d'affilié sur les médias sociaux, YouTube, newsletters par email, ou partout où vous connectez avec des propriétaires de chats.",
      question5: "Quel matériel marketing fournissez-vous?",
      answer5: "Nous fournissons des bannières professionnelles, images de produits, modèles d'email, publications sur les médias sociaux et textes éprouvés. Tout ce dont vous avez besoin pour commencer à promouvoir immédiatement."
    },
    finalCTA: {
      title: "Prêt à Commencer à Gagner?",
      subtitle: "Rejoignez des centaines d'affiliés prospères gagnant un revenu passif avec Purrify",
      cta: "Rejoignez le Programme d'Affiliation",
      disclaimer: "Gratuit de rejoindre • Pas de frais mensuels • Commencez à gagner immédiatement"
    }
  },

  // Page Contrôle de l'Ammoniac
  ammonia: {
    meta: {
      title: "Contrôle de l'Ammoniac pour Litière | Élimination Naturelle des Odeurs | Purrify",
      description: "Éliminez l'odeur d'ammoniac de la litière avec la formule de charbon actif Purrify. Contrôle les odeurs à la source pendant 7+ jours. Sans danger pour les chats."
    },
    breadcrumb: "Contrôle de l'Ammoniac",
    hero: {
      headline: "Contrôle de l'Ammoniac: Éliminez les Odeurs de Litière à la Source",
      subheadline: "Cette odeur âcre et piquante de la litière n'est pas qu'un désagrément—c'est de l'ammoniac, et ça empire chaque heure. Le charbon actif de noix de coco premium de Purrify capture les molécules d'ammoniac au niveau moléculaire, gardant votre maison vraiment fraîche pendant 7+ jours sans parfums artificiels.",
      cta: "Acheter Maintenant",
      secondaryCta: "Voir Comment Ça Marche"
    },
    trust: {
      happyCats: "chats heureux"
    },
    understanding: {
      headline: "Comprendre l'Ammoniac: La Vraie Cause de l'Odeur de Litière",
      intro: "Cette odeur distinctive de litière ne vient pas de votre chat—c'est un processus chimique qui se produit dans la litière elle-même. Comprendre ce processus est la première étape pour l'éliminer.",
      chemistry: {
        title: "La Chimie Derrière l'Odeur",
        description: "Quand votre chat urine, l'urine contient un composé appelé urée. En seulement 2-4 heures, les bactéries naturellement présentes dans la litière commencent à décomposer cette urée en gaz ammoniac (NH₃). C'est l'odeur âcre et piquante qui peut envahir toute votre maison.",
        formula: "Urée + Bactéries + Temps = Gaz Ammoniac"
      },
      factors: {
        title: "Pourquoi Ça Empire avec le Temps",
        point1: "Température: Les bactéries se multiplient plus vite dans les environnements chauds, produisant plus d'ammoniac",
        point2: "Humidité: L'humidité accélère le processus de décomposition et aide l'ammoniac à se disperser dans l'air",
        point3: "Accumulation: Chaque jour ajoute plus d'urine, créant plus de production d'ammoniac",
        point4: "Espaces clos: Les litières dans les placards ou meubles fermés piègent et concentrent l'ammoniac"
      },
      health: {
        title: "Problèmes de Santé Liés à l'Exposition à l'Ammoniac",
        description: "L'exposition prolongée à l'ammoniac n'est pas qu'un désagrément—elle peut causer de vrais problèmes de santé. À des concentrations courantes près des litières mal entretenues, l'ammoniac peut irriter les yeux et le système respiratoire des humains et des chats. Les chats, avec leur nez sensible, peuvent même commencer à éviter une litière qui sent trop l'ammoniac, causant des accidents ailleurs dans votre maison."
      }
    },
    problem: {
      headline: "Pourquoi les Litières Parfumées et Désodorisants Échouent",
      intro: "Si vous avez essayé les litières parfumées, le bicarbonate de soude ou les désodorisants et trouvé qu'ils ne fonctionnent qu'un jour ou deux, il y a une raison scientifique: aucun d'eux n'élimine vraiment l'ammoniac.",
      card1: {
        title: "Masquer, Pas Résoudre",
        description: "Les parfums et litières parfumées ajoutent simplement une odeur différente par-dessus l'ammoniac. Votre nez s'habitue au parfum en quelques heures, mais l'ammoniac est toujours là—toujours produit, toujours en accumulation. C'est pourquoi l'odeur revient toujours, souvent pire qu'avant."
      },
      card2: {
        title: "Préoccupations de Santé pour les Chats",
        description: "Les parfums artificiels ne sont pas seulement inefficaces—ils peuvent être nocifs. Les chats ont 200 millions de récepteurs olfactifs contre 5 millions pour nous. Les parfums forts peuvent causer des irritations respiratoires, déclencher de l'asthme, ou faire éviter la litière à votre chat."
      },
      card3: {
        title: "Le Mythe du Bicarbonate de Soude",
        description: "Le bicarbonate de soude est alcalin (pH ~8,3) et l'ammoniac est aussi alcalin (pH ~11,6). Pour une neutralisation, il faut une réaction acide-base—mais base plus base égale pas de réaction. Le bicarbonate ne peut pas neutraliser l'ammoniac; il n'absorbe que temporairement l'humidité."
      },
      card4: {
        title: "Coût & Effort Constants",
        description: "Sans vraie élimination des odeurs, vous êtes coincé dans un cycle coûteux: changements fréquents de litière, achats de produits parfumés inefficaces, et inquiétude constante sur ce que les invités pourraient sentir. Cela peut coûter 50-100$+ par mois pour les foyers multi-chats."
      }
    },
    solution: {
      headline: "La Science de la Vraie Élimination des Odeurs",
      intro: "Le charbon actif fonctionne par un mécanisme totalement différent des agents masquants—et c'est pourquoi il fonctionne vraiment.",
      description: "Le charbon actif possède une structure microporeuse avec des millions de petits pores qui capturent physiquement les molécules d'ammoniac. Contrairement aux agents masquants, le charbon actif capture l'odeur au niveau moléculaire par adsorption—vous ne la sentez plus jamais.",
      adsorption: {
        title: "L'Adsorption: La Différence Clé",
        description: "L'adsorption (avec un 'd') est différente de l'absorption. Quand les molécules d'ammoniac contactent le charbon actif, elles ne font pas que s'imbiber—elles se lient à la surface du charbon au niveau moléculaire. Ce processus physique fonctionne quel que soit le pH, le rendant efficace contre l'ammoniac là où le bicarbonate échoue."
      },
      pores: {
        title: "Structure de Pores Optimisée",
        micro: "Micropores (<2nm): Piègent les petites molécules d'ammoniac de façon permanente",
        meso: "Mésopores (2-50nm): Servent d'autoroutes guidant l'ammoniac vers les micropores",
        macro: "Macropores (>50nm): Points d'entrée permettant un accès rapide des gaz",
        description: "Le charbon de noix de coco de Purrify est spécifiquement traité pour optimiser cette distribution de pores pour la capture de l'ammoniac. Résultat: efficacité maximale de piégeage pour les molécules exactes causant votre problème d'odeur."
      },
      surface: {
        title: "Surface Massive",
        stat: "1 150 m²/g",
        comparison: "C'est l'équivalent de 4 courts de tennis de surface de piégeage dans chaque cuillère à café. Comparez au bicarbonate de soude à seulement 0,2 m²/g—presque 6 000 fois moins de surface.",
        explanation: "Cette énorme surface explique pourquoi une petite quantité de charbon actif peut capturer autant d'ammoniac sur une si longue période."
      }
    },
    howToUse: {
      headline: "Comment Utiliser Purrify",
      intro: "Commencer avec Purrify est simple. La plupart des parents de chats remarquent une différence dramatique en 24 heures.",
      step1: {
        number: "1",
        title: "Saupoudrer",
        description: "Saupoudrez 2-3 cuillères à soupe de Purrify uniformément sur la litière de votre chat. Pour de meilleurs résultats, ajoutez Purrify après avoir nettoyé quand la litière est relativement fraîche."
      },
      step2: {
        number: "2",
        title: "Mélanger",
        description: "Mélangez doucement les granulés de charbon dans la couche supérieure de la litière. Pas besoin de mélanger profondément—le charbon fonctionne mieux près de la surface où l'ammoniac est libéré."
      },
      step3: {
        number: "3",
        title: "Entretenir",
        description: "Ramassez quotidiennement comme d'habitude. Réappliquez Purrify tous les 5-7 jours, ou quand vous ajoutez de la litière fraîche. Un sachet de 50g dure généralement 2-3 semaines pour un seul chat."
      },
      tips: {
        title: "Conseils Pro pour de Meilleurs Résultats",
        tip1: "Pour les odeurs fortes existantes, faites d'abord un changement complet de litière, puis ajoutez Purrify à la litière fraîche",
        tip2: "Les foyers multi-chats peuvent devoir réappliquer tous les 4-5 jours au lieu de 7",
        tip3: "Fonctionne avec tous les types de litière: agglomérante, argile, cristal, bois, maïs ou papier"
      },
      proTip: {
        title: "Conseil Pro",
        description: "Pour les odeurs fortes, appliquez Purrify immédiatement après le nettoyage de la litière."
      }
    },
    benefits: {
      headline: "Pourquoi les Parents de Chats Choisissent Purrify",
      intro: "Il y a une raison pour laquelle des milliers de propriétaires de chats sont passés au charbon actif pour le contrôle des odeurs.",
      pillar1: {
        title: "Science 100% Naturelle",
        intro: "Une solution 100% naturelle pour les odeurs de litière",
        description: "Purrify est fait de charbon actif de noix de coco premium—rien d'autre. Pas de produits chimiques, parfums, additifs synthétiques ou charges. C'est le même matériau utilisé dans les purificateurs d'air de qualité hospitalière et les systèmes de filtration d'eau.",
        detail: "Le charbon de noix de coco est prisé pour sa haute densité de micropores, le rendant particulièrement efficace pour piéger les petites molécules de gaz comme l'ammoniac."
      },
      pillar2: {
        title: "Protection Longue Durée",
        intro: "Protection longue durée contre les odeurs",
        description: "Une application de Purrify offre un contrôle continu de l'ammoniac pendant 7+ jours. Contrairement aux parfums qui s'estompent en quelques heures ou au bicarbonate qui cesse de fonctionner après 48 heures, le charbon actif continue de fonctionner jusqu'à saturation de ses pores.",
        detail: "La plupart des clients trouvent qu'ils peuvent réduire leurs changements complets de litière de 30-50%, économisant argent et temps."
      },
      pillar3: {
        title: "Sûr pour Tous les Chats",
        intro: "Sûr pour tous les chats et chatons",
        description: "Parce que Purrify est totalement sans parfum et fait de charbon naturel, il est sûr pour les chats de tous âges et sensibilités. Chatons, seniors et chats avec des conditions respiratoires peuvent tous en bénéficier sans risque d'irritation.",
        detail: "Beaucoup de chats préfèrent en fait les environnements de litière non parfumés. Vous remarquerez peut-être que votre chat utilise la litière plus régulièrement après être passé à Purrify."
      }
    },
    results: {
      headline: "À Quoi S'Attendre: Chronologie des Résultats Réels",
      intro: "Voici ce que les parents de chats expérimentent généralement après avoir ajouté Purrify à leur routine de litière.",
      day1: {
        title: "Dans les 24 Heures",
        description: "Réduction notable de l'odeur d'ammoniac. La qualité âcre et piquante de l'odeur diminue significativement alors que le charbon commence à piéger les molécules d'ammoniac en suspension."
      },
      day3: {
        title: "Jours 2-3",
        description: "La plupart des odeurs existantes sont éliminées. Même les odeurs fortes et établies sont capturées alors que l'ammoniac continue d'être adsorbé. Les invités ne remarqueront aucune odeur de litière."
      },
      week1: {
        title: "Après Une Semaine",
        description: "Fraîcheur constante maintenue. Le charbon actif fonctionne toujours, piégeant continuellement le nouvel ammoniac produit. Il est temps d'ajouter une nouvelle application."
      },
      ongoing: {
        title: "Utilisation Continue",
        description: "Avec une réapplication régulière, votre maison reste fraîche en permanence. Beaucoup de clients rapportent qu'ils 'oublient' qu'ils ont une litière car il n'y a simplement pas d'odeur pour leur rappeler."
      }
    },
    comparison: {
      headline: "Comment Purrify Se Compare",
      intro: "Toutes les méthodes de contrôle des odeurs ne sont pas égales. Voici comment les approches les plus courantes se comparent.",
      headers: {
        method: "Méthode",
        effectiveness: "Efficacité",
        duration: "Durée",
        safety: "Sécurité Chat"
      },
      purrify: {
        method: "Purrify (Charbon Actif)",
        effectiveness: "95%",
        duration: "7+ jours",
        safety: "100% sûr"
      },
      bakingSoda: {
        method: "Bicarbonate de Soude",
        effectiveness: "20%",
        duration: "1-2 jours",
        safety: "Sûr"
      },
      scented: {
        method: "Litière Parfumée",
        effectiveness: "30%",
        duration: "Heures",
        safety: "Peut irriter"
      },
      airFreshener: {
        method: "Désodorisants",
        effectiveness: "10%",
        duration: "Heures",
        safety: "Peut irriter"
      },
      frequentChanges: {
        method: "Changements Fréquents",
        effectiveness: "70%",
        duration: "Jusqu'au prochain usage",
        safety: "Sûr mais coûteux"
      },
      note: "Notes d'efficacité basées sur la réduction de l'ammoniac. Purrify cible spécifiquement l'ammoniac par adsorption, tandis que les autres méthodes masquent ou absorbent temporairement."
    },
    stats: {
      days: { value: "7+", label: "Jours de Fraîcheur" },
      savings: { value: "50%", label: "Moins de Changements" },
      surfaceArea: { value: "1 150", label: "m²/g de Surface" },
      natural: { value: "100%", label: "Ingrédients Naturels" },
      customers: { value: "Support", label: "Au Canada" },
      rating: { value: "Avis", label: "Clients" }
    },
    faq: {
      headline: "Questions Courantes sur le Contrôle de l'Ammoniac",
      q1: "Comment Purrify contrôle-t-il l'ammoniac?",
      a1: "Purrify utilise du charbon actif de noix de coco avec des millions de pores microscopiques qui capturent les molécules d'ammoniac par adsorption. Contrairement au bicarbonate de soude ou aux parfums qui masquent les odeurs, le charbon actif capture et retient physiquement l'ammoniac.",
      q2: "Le charbon actif est-il sans danger pour les chats?",
      a2: "Oui, le charbon actif est 100% naturel et non toxique. C'est le même matériau utilisé dans les filtres à eau et purificateurs d'air, et utilisé en toute sécurité autour des animaux depuis des décennies. Purrify ne contient aucun produit chimique, parfum ou additif.",
      q3: "Quelle quantité de Purrify dois-je utiliser?",
      a3: "Saupoudrez simplement une fine couche sur la litière de votre chat et mélangez. Un sachet de 50g traite une litière standard pendant environ 7 jours. Pour plusieurs chats, utilisez notre format 120g.",
      q4: "Fonctionne-t-il avec tous les types de litière?",
      a4: "Oui! Purrify fonctionne avec l'argile agglomérante, non agglomérante, cristal, papier, bois et litières à base de maïs. Il améliore le contrôle des odeurs de n'importe quelle litière.",
      q5: "En quoi Purrify diffère-t-il du bicarbonate de soude?",
      a5: "Le bicarbonate de soude ne neutralise que temporairement certaines odeurs et nécessite une réapplication constante. Le charbon actif capture physiquement les molécules d'ammoniac par adsorption, offrant 7+ jours de protection en une seule application.",
      q6: "Éliminera-t-il les odeurs existantes?",
      a6: "Purrify commence immédiatement à absorber l'ammoniac dès que vous l'ajoutez. Les odeurs existantes disparaissent généralement dans les 24-48 heures à mesure que le charbon actif les absorbe.",
      q7: "Est-ce sans danger pour les chatons?",
      a7: "Absolument. Purrify est sûr pour les chats de tous âges. Il n'y a pas de produits chimiques ou de parfums qui pourraient irriter les jeunes chats ou les chats sensibles.",
      q8: "Combien de temps dure un sac?",
      a8: "Le sachet de 50g dure environ 7 jours pour un chat. Le sachet de 120g dure environ 7 jours pour les foyers multi-chats (2-3 chats). La plupart des clients trouvent qu'ils doivent changer la litière moins souvent."
    },
    cta: {
      headline: "Prêt pour une Maison Vraiment Fraîche?",
      subheadline: "Rejoignez des milliers de parents de chats qui ont éliminé l'ammoniac de litière pour de bon—pas masqué, éliminé.",
      button: "Acheter Purrify",
      secondaryButton: "Essayer le Format Découverte",
      benefit1: "Livraison gratuite disponible",
      benefit2: "Garantie satisfaction 30 jours"
    }
  },

  // B2B Vertical Pages
  veterinarians: {
    seo: {
      pageTitle: "Partenaires Cliniques Vétérinaires",
      description: "Associez-vous à Purrify pour recommander une solution d'odeur naturelle et axée sur la santé à vos clients. Prix de gros, échantillons et formation inclus.",
      keywords: "produits clinique vétérinaire, additif litière pour vétérinaires, produits santé animale gros, produits chat recommandés vétérinaire",
      openGraphAlt: "Partenaires Vétérinaires"
    },
    hero: {
      badge: "Programme de Partenariat Vétérinaire",
      titleLine1: "Recommandez avec",
      titleLine2: "Confiance",
      description: "Offrez à vos clients une solution d'odeur axée sur la santé qui est",
      highlight: "100% naturelle et sans parfum",
      stats: {
        natural: "Naturel",
        chemicals: "Chimiques",
        days: "Jours de Protection"
      },
      cta: {
        primary: "Demander un Kit d'Échantillons",
        secondary: "Voir les Options de Partenariat"
      },
      trustedBy: "Approuvé par les professionnels vétérinaires:",
      badges: {
        fragrance: "Sans Parfum",
        natural: "Non Toxique",
        sensitive: "Approuvé Chats Sensibles"
      },
      valueProps: {
        health: {
          title: "Formule Santé Prioritaire",
          subtitle: "Sans parfum ni irritants",
          description: "Charbon de noix de coco activé sans produits chimiques - idéal pour les chats souffrant de sensibilités respiratoires ou d'allergies."
        },
        ammonia: {
          title: "Réduit l'Exposition à l'Ammoniac",
          subtitle: "Meilleure qualité de l'air",
          description: "Le charbon actif piège les molécules d'ammoniac à la source, réduisant l'irritation respiratoire pour les chats et leurs propriétaires."
        },
        revenue: {
          title: "Source de Revenus Supplémentaire",
          subtitle: "Marges élevées, achats répétés",
          description: "Les clients font confiance à vos recommandations. Offrez une solution à la plainte #1 concernant la possession d'un chat."
        }
      }
    }
  },

  catCafes: {
    seo: {
      pageTitle: "Purrify pour Cafés de Chats | Gardez Votre Espace Frais",
      description: "L'arme secrète des cafés de chats prospères. Éliminez les odeurs de plusieurs chats sans masquer les senteurs avec des parfums lourds.",
      keywords: "contrôle odeur café chat, solution odeur plusieurs chats, éliminateur odeur chat commercial, hygiène café chat",
      openGraphAlt: "Solution d'élimination des odeurs pour café à chats"
    },
    hero: {
      badge: "Approuvé par les Cafés de Chats",
      titleLine1: "Chats Heureux.",
      titleLine2: "Espace Frais.",
      description: "Les cafés de chats font confiance à Purrify pour garder leurs espaces propres sans parfums écrasants qui stressent les chats ou dérangent les clients.",
      stats: {
        days: "7+ Jours",
        fragrances: "0 Parfums",
        natural: "100% Naturel"
      },
      cta: {
        primary: "Obtenir les Prix de Gros",
        secondary: "En Savoir Plus"
      }
    },
    form: {
      title: "Demande de Prix pour Cafés de Chats",
      cafeName: "Nom du Café",
      cafePlaceholder: "Nom de votre café de chats",
      name: "Nom du Café",
      namePlaceholder: "Nom de votre café de chats",
      contactName: "Nom du Contact",
      contactPlaceholder: "Votre nom complet",
      email: "Courriel",
      emailPlaceholder: "vous@email.com",
      phone: "Téléphone",
      phonePlaceholder: "(555) 123-4567",
      address: "Adresse",
      addressPlaceholder: "Adresse de votre café",
      cats: "Nombre de Chats",
      catsPlaceholder: "Combien de chats avez-vous dans le café?",
      message: "Message",
      messagePlaceholder: "Parlez-nous de votre café et de vos besoins...",
      submit: "Envoyer la Demande",
      submitting: "Envoi en cours...",
      success: {
        title: "Demande Envoyée!",
        message: "Nous vous contacterons dans les 24-48 heures avec des informations sur les prix de gros."
      }
    },
    contact: {
      title: "Des Questions?",
      description: "Notre équipe de partenariats est prête à vous aider.",
      callUs: "Appelez-nous",
      emailUs: "Envoyez-nous un courriel",
      moreInfo: "En Savoir Plus",
      requestGuide: "Demander un Guide"
    }
  },

  shelters: {
    seo: {
      pageTitle: "Solutions Refuges Animaliers",
      description: "Gérez efficacement les odeurs de refuge. Purrify aide à créer un environnement accueillant pour les adoptants potentiels.",
      keywords: "contrôle odeur refuge, fournitures refuge animalier, litière gros quantité, gestion odeurs refuge",
      openGraphAlt: "Partenaires Refuges"
    },
    hero: {
      badge: "Programme Partenariat Refuges",
      titleLine1: "Créez un Environnement",
      titleLine2: "Accueillant pour l'Adoption",
      description: "Les premières impressions comptent pour les adoptants potentiels. Gardez votre refuge frais sans parfums agressifs.",
      stats: {
        cats: "Chats Aidés",
        shelters: "Refuges Partenaires",
        natural: "Naturel"
      },
      cta: {
        primary: "Demander un Échantillon Refuge",
        secondary: "Voir le Programme de Don"
      }
    },
    benefits: {
      title: "Avantages Partenaire Refuge",
      pricing: {
        title: "Tarifs Spéciaux",
        description: "Tarifs réduits pour les refuges sans but lucratif et organisations de sauvetage."
      },
      priority: {
        title: "Support Prioritaire",
        description: "Équipe de support dédiée pour aider avec les grandes commandes et besoins urgents."
      },
      donations: {
        title: "Programme de Dons",
        description: "Les refuges éligibles peuvent recevoir des produits donnés pour les événements de collecte de fonds."
      }
    },
    form: {
      title: "Demande de Partenariat Refuge",
      orgName: "Nom de l'Organisation",
      orgPlaceholder: "Nom de votre refuge ou organisation",
      orgNamePlaceholder: "Nom de votre refuge",
      contactName: "Nom du Contact",
      contactPlaceholder: "Votre nom complet",
      email: "Courriel",
      emailPlaceholder: "vous@email.com",
      phone: "Téléphone",
      phonePlaceholder: "(555) 123-4567",
      address: "Adresse",
      addressPlaceholder: "Adresse de votre refuge",
      catsCount: "Nombre de Chats",
      catsPlaceholder: "Combien de chats accueillez-vous?",
      nonProfit: "Numéro d'Organisme Sans But Lucratif (si applicable)",
      nonProfitPlaceholder: "ex: 123456789 RR 0001",
      message: "Message",
      messagePlaceholder: "Parlez-nous de votre refuge et de vos besoins...",
      submit: "Envoyer la Demande",
      submitting: "Envoi en cours...",
      success: {
        title: "Demande Envoyée!",
        message: "Nous vous contacterons dans les 24-48 heures avec des informations sur notre programme de partenariat."
      }
    },
    contact: {
      title: "Des Questions?",
      description: "Notre équipe de partenariats est prête à vous aider.",
      callUs: "Appelez-nous",
      emailUs: "Envoyez-nous un courriel",
      moreInfo: "En Savoir Plus",
      requestGuide: "Demander un Guide"
    }
  },

  groomers: {
    seo: {
      pageTitle: "Solutions Toiletteurs pour Chats",
      description: "Maintenez un salon de toilettage frais. Purrify élimine les odeurs de litière pour une meilleure expérience client.",
      keywords: "odeur salon toilettage, fournitures toilettage chat, fraîcheur salon, contrôle odeur toilettage",
      openGraphAlt: "Partenaires Toiletteurs"
    },
    hero: {
      badge: "Programme Partenariat Toiletteurs",
      titleLine1: "Un Salon Frais",
      titleLine2: "Des Clients Satisfaits",
      description: "Offrez une expérience de toilettage premium avec un environnement frais et sans parfum.",
      stats: {
        freshness: "Fraîcheur",
        clients: "Clients Satisfaits",
        natural: "Naturel"
      },
      cta: {
        primary: "Demander un Échantillon",
        secondary: "Voir les Tarifs Pro"
      }
    },
    cta: {
      primary: "Commencer à Vendre Purrify",
      secondary: "Demander des Informations"
    },
    opportunity: {
      title: "L'Opportunité pour les Toiletteurs",
      intro: "Chaque rendez-vous de toilettage est une opportunité de résoudre la plainte #1 de vos clients.",
      points: {
        clientsAsk: {
          title: "Les Clients Demandent Déjà",
          description: "Les propriétaires de chats mentionnent fréquemment les odeurs de litière lors des rendez-vous."
        },
        expertPosition: {
          title: "Positionnez-vous en Expert",
          description: "Quand vous recommandez Purrify, vous devenez le conseiller de confiance pour les soins félins."
        },
        repeatRevenue: {
          title: "Revenus Récurrents",
          description: "Purrify est un produit consommable. Les clients reviennent mensuellement."
        },
        easyDemo: {
          title: "Résultats Démontrables",
          description: "Montrez la différence dans votre salon. Une démo crée un client à vie."
        }
      }
    },
    addOnSale: {
      title: "Vente Additionnelle Facile",
      description: "Purrify se vend tout seul pendant les rendez-vous",
      points: [
        "Explication rapide de 30 secondes pendant le toilettage",
        "Conversation naturelle sur les soins félins",
        "Les clients font déjà confiance à vos recommandations",
        "Pas de pression - le produit parle de lui-même"
      ]
    },
    howItWorks: {
      title: "Comment Ça Marche",
      steps: [
        {
          number: "01",
          title: "Demandez Votre Échantillon",
          description: "Recevez un pack de démonstration gratuit pour tester Purrify dans votre salon."
        },
        {
          number: "02",
          title: "Montrez à Vos Clients",
          description: "Utilisez Purrify pendant le toilettage et laissez les clients voir la différence."
        },
        {
          number: "03",
          title: "Recommandez avec Confiance",
          description: "Vos clients feront confiance à votre recommandation d'expert."
        },
        {
          number: "04",
          title: "Gagnez des Commissions",
          description: "Recevez des marges attractives sur chaque vente réalisée."
        }
      ]
    },
    partnerBenefits: {
      title: "Avantages Partenariat",
      benefits: {
        wholesale: {
          title: "Tarifs de Gros",
          description: "Marges premium sur chaque vente. Remises volume disponibles."
        },
        display: {
          title: "Matériel d'Affichage",
          description: "Présentoirs comptoir gratuits et matériel promotionnel."
        },
        training: {
          title: "Formation Produit",
          description: "Formation rapide sur les avantages du produit."
        },
        tracking: {
          title: "Suivi des Ventes",
          description: "Suivez vos ventes avec notre portail partenaire."
        }
      }
    },
    retailPackage: {
      title: "Votre Pack Toiletteur",
      subtitle: "Tout ce dont vous avez besoin pour commencer",
      includes: [
        "Présentoir comptoir",
        "Échantillons pour démos",
        "Matériel promotionnel",
        "Guide de formation",
        "Support marketing"
      ]
    },
    testimonials: {
      title: "Ce que Disent les Toiletteurs",
      items: [
        {
          quote: "Mes clients adorent que j'aie une solution pour leurs problèmes d'odeur de litière.",
          author: "Salon de Toilettage Chat",
          location: "Montréal, QC",
          result: "15+ unités/mois"
        }
      ]
    },
    form: {
      title: "Demande de Prix pour Toiletteurs",
      salonName: "Nom du Salon",
      salonNamePlaceholder: "Nom de votre salon de toilettage",
      salonPlaceholder: "Nom de votre salon de toilettage",
      contactName: "Nom du Contact",
      contactPlaceholder: "Votre nom complet",
      email: "Courriel",
      emailPlaceholder: "vous@email.com",
      phone: "Téléphone",
      phonePlaceholder: "(555) 123-4567",
      address: "Adresse",
      addressPlaceholder: "Adresse de votre salon",
      catsPerWeek: "Chats par Semaine",
      catsPerWeekPlaceholder: "Combien de chats toilettez-vous par semaine?",
      catsPlaceholder: "Combien de chats toilettez-vous par semaine?",
      message: "Message",
      messagePlaceholder: "Parlez-nous de votre salon et de vos besoins...",
      submit: "Envoyer la Demande",
      submitting: "Envoi en cours...",
      success: {
        title: "Demande Envoyée!",
        message: "Nous vous contacterons dans les 24-48 heures avec des informations sur les prix de gros."
      }
    },
    contact: {
      title: "Questions? Parlons-en!",
      description: "Notre équipe partenariat est là pour vous aider.",
      callUs: "Appelez-nous",
      emailUs: "Écrivez-nous",
      moreInfo: "Besoin de Plus d'Informations?",
      requestGuide: "Demandez notre guide détaillé"
    }
  },

  hospitality: {
    seo: {
      pageTitle: "Solutions Hébergement Pet-Friendly",
      description: "Gardez vos hébergements Airbnb et locations pet-friendly sans odeur. Solution discrète pour les propriétaires acceptant les animaux.",
      keywords: "airbnb pet friendly, hébergement chat, location vacances animaux, contrôle odeur location",
      openGraphAlt: "Partenaires Hébergement"
    },
    hero: {
      badge: "Programme Partenariat Hébergement",
      titleLine1: "Hébergements Pet-Friendly",
      titleLine2: "Zéro Odeur",
      description: "Acceptez les animaux sans compromettre la fraîcheur. Solution discrète entre les réservations.",
      stats: {
        reviews: "Avis 5 Étoiles",
        bookings: "Réservations",
        natural: "Naturel"
      },
      cta: {
        primary: "Demander un Échantillon",
        secondary: "Voir les Solutions Hôtes"
      }
    }
  },

  // B2B Case Studies Section
  b2bCaseStudies: {
    badge: "Résultats Concrets",
    title: "Témoignages de Nos Partenaires",
    subtitle: "Découvrez comment des entreprises comme la vôtre ont obtenu des résultats mesurables avec Purrify",
    cta: "Prêt à voir des résultats similaires pour votre entreprise?",
    ctaButton: "Contactez Notre Équipe Partenariat",
    businessTypes: {
      veterinarian: "Clinique Vétérinaire",
      catCafe: "Café à Chats",
      shelter: "Refuge Animalier",
      groomer: "Salon de Toilettage",
      hospitality: "Location Pet-Friendly"
    },
    labels: {
      challenge: "Défi",
      solution: "Solution",
      catsServed: "chats servis"
    }
  },
  // Programme de Parrainage - Sprint 6C
  referral: {
    dashboard: {
      title: "Donnez 5$, Recevez 5$",
      loginRequired: "Connectez-vous pour acceder a votre tableau de bord de parrainage et commencer a gagner des recompenses.",
      signIn: "Se Connecter",
      retry: "Reessayer",
      generateDescription: "Generez votre code de parrainage unique et partagez-le avec vos amis. Ils obtiennent 5$ de rabais sur leur premiere commande, et vous recevez 5$ de credit quand ils achetent!",
      generateButton: "Generer Mon Code de Parrainage",
      generating: "Generation en cours..."
    },
    stats: {
      completedReferrals: "Parrainages Completes",
      totalEarned: "Total Gagne",
      availableCredit: "Credit Disponible",
      pending: "En Attente"
    },
    milestone: {
      title: "Progression Jalon",
      referrals: "parrainages",
      nextReward: "Prochaine recompense"
    },
    rewards: {
      title: "Vos Recompenses",
      credit: "Credit",
      available: "Disponible"
    },
    activity: {
      title: "Activite Recente",
      completed: "Complete",
      pending: "En Attente"
    },
    widget: {
      title: "Donnez 5$, Recevez 5$",
      giveGet: "Donnez 5$, Recevez 5$",
      description: "Partagez votre code avec vos amis. Ils obtiennent 5$ de rabais, vous recevez 5$ de credit!",
      shareDescription: "Partagez votre code avec vos amis",
      yourCode: "Votre Code de Parrainage",
      shareLink: "Lien de Partage",
      copy: "Copier",
      copyCode: "Copier le Code",
      copyLink: "Copier le Lien",
      copied: "Copie!",
      shareVia: "Partager via",
      howItWorks: "Comment ca marche",
      step1: "Partagez votre code ou lien avec vos amis",
      step2: "Ils obtiennent 5$ de rabais sur leur premiere commande",
      step3: "Vous recevez 5$ de credit quand ils achetent"
    },
    share: {
      email: "Courriel",
      sms: "SMS",
      link: "Lien"
    },
    checkout: {
      haveCode: "Avez-vous un code de parrainage? Cliquez ici",
      enterReferralCode: "Entrez le Code de Parrainage",
      enterCode: "Veuillez entrer un code de parrainage",
      emailRequired: "Veuillez d'abord entrer votre courriel",
      invalidCode: "Code de parrainage invalide",
      error: "Echec de l'application du code. Veuillez reessayer.",
      apply: "Appliquer",
      applying: "Application...",
      applied: "Code de parrainage applique!",
      referredBy: "Parraine par {name}",
      off: "de rabais",
      remove: "Retirer",
      discountNote: "Obtenez 5$ de rabais avec le code de parrainage d'un ami"
    }
  },

  // City Page Translations (for location-based SEO pages)
  cityPage: {
    seo: {
      title: "Désodorisant pour litière à {{city}} | Purrify Charbon Actif",
      descriptionWithPopulation: "Odeur de litière à {{city}}? Le charbon actif Purrify élimine naturellement les odeurs d'ammoniaque. Livraison rapide partout au {{province}}. Aimé par {{population}}+ propriétaires de chats.",
      descriptionDefault: "Odeur de litière à {{city}}? Le charbon actif Purrify élimine naturellement les odeurs d'ammoniaque. Livraison rapide partout au {{province}}. Sans danger pour les chats et chatons."
    },
    loading: "Redirection en cours...",
    hero: {
      heading: "Meilleur éliminateur d'odeurs de litière à {{city}}",
      subheading: "Fait confiance par {{audience}}+ propriétaires de chats à {{city}} et partout au {{province}}"
    },
    whyChoose: {
      heading: "Pourquoi les parents de chats de {{city}} choisissent Purrify",
      perfectFor: "Parfait pour {{feature}}",
      fastShipping: "Livraison rapide partout au {{province}}",
      worksWithAllBrands: "Fonctionne avec toutes les marques de litière que vous aimez déjà"
    },
    cta: {
      tryInCity: "Essayez Purrify à {{city}}",
      seeHowItWorks: "Découvrez comment fonctionne la technologie au carbone →",
      shopOnline: "Acheter en ligne maintenant",
      submitVideo: "📹 Soumettez votre vidéo",
      writeReview: "✍️ Écrire un avis",
      exploreTestimonials: "Explorer plus de témoignages du {{province}} →"
    },
    whereToFind: {
      heading: "Où trouver Purrify à {{city}}",
      localStore: {
        heading: "Demandez à votre animalerie locale",
        description: "Les animaleries indépendantes de {{city}} vendent l'éliminateur d'odeurs dont parlent les parents de chats.",
        tip: "Commencez par votre boutique de quartier préférée ou dites-leur que vous voulez voir Purrify sur les tablettes."
      },
      orderDirect: {
        heading: "Commandez directement avec livraison rapide",
        description: "Vous préférez la livraison à domicile? Commandez en ligne et recevez de l'air frais en 2-3 jours ouvrables partout au {{province}}."
      }
    },
    playbook: {
      heading: "Guide d'air frais pour {{city}}",
      step1: "Saupoudrez 2 cuillères à soupe sur le dessus de votre litière après chaque nettoyage.",
      step2: "Rafraîchissez tous les deux jours si votre maison fait face à {{painPoint}}.",
      step3: "Remplacez votre litière comme d'habitude—Purrify fonctionne avec les litières agglomérantes, d'argile et naturelles."
    },
    testimonials: {
      heading: "Ce que disent les propriétaires de chats de {{city}}",
      wasHelpful: "Cela vous a-t-il été utile?",
      shareStory: {
        heading: "Partagez votre succès à {{city}}",
        description: "Êtes-vous un propriétaire de chat de {{city}} qui adore Purrify? Nous aimerions présenter votre histoire et aider d'autres parents de chats locaux à découvrir une vie sans odeurs."
      }
    },
    provinceWide: {
      heading: "Les propriétaires de chats partout au {{province}} adorent Purrify",
      description: "Rejoignez des milliers de parents de chats satisfaits au {{province}} qui ont éliminé les odeurs de litière pour de bon.",
      averageRating: "⭐ Note moyenne de 4.8/5",
      happyHomes: "🏠 {{audience}}+ foyers heureux",
      fastShipping: "🚚 Livraison rapide au {{province}}"
    },
    faq: {
      heading: "FAQ de {{city}}",
      delivery: {
        question: "Livrez-vous à {{city}}, {{province}}?",
        answer: "Oui! Livraison rapide partout au {{province}}, incluant tous les quartiers de {{city}}. Les commandes arrivent en 2-3 jours ouvrables."
      },
      painPoint: {
        question: "Comment Purrify aide-t-il les maisons confrontées à {{painPoint}}?",
        answer: "Saupoudrez Purrify sur votre litière habituelle. Le charbon actif se lie aux molécules d'ammoniaque, même quand {{painPoint}}. De l'air frais sans changer la routine de votre chat."
      },
      litterBrands: {
        question: "Quelles marques de litière fonctionnent le mieux avec Purrify à {{city}}?",
        answer: "Purrify fonctionne avec tous les types de litière—argile agglomérante, cristal, pin naturel, maïs, blé et litières de tofu. Les propriétaires de chats de {{city}} l'associent aux marques qu'ils achètent déjà dans les animaleries indépendantes, et il les améliore toutes sans changer les préférences de votre chat."
      },
      climate: {
        question: "Comment Purrify gère-t-il {{seasonalTip}} au {{province}}?",
        answer: "La technologie au charbon actif fonctionne indépendamment de la température et de l'humidité. Que vous fassiez face à {{seasonalTip}} à {{city}}, la capture moléculaire des odeurs de Purrify continue 24/7. Parfait pour {{keyFeature}} confrontés aux défis climatiques du {{province}}."
      },
      stores: {
        question: "Puis-je trouver Purrify dans les animaleries de {{city}}?",
        answer: "De nombreux détaillants indépendants à {{city}} vendent Purrify. Appelez à l'avance pour vérifier la disponibilité, ou commandez en ligne pour une livraison garantie en 2-3 jours partout au {{province}}."
      },
      multiCat: {
        question: "Purrify est-il sécuritaire pour les foyers multi-chats à {{city}}?",
        answer: "Absolument! Purrify est complètement sécuritaire pour les maisons avec plusieurs chats. De nombreuses familles de {{city}} l'utilisent sur 2-4 litières. Le charbon actif est non toxique, sans parfum et n'irrite pas les chats sensibles. Parfait pour {{keyFeature}}."
      }
    }
  },

  // Locations Hub and Province Pages
  locations: {
    hub: {
      badge: "Couverture nationale",
      heading: "Contrôle des odeurs de litière partout au Canada",
      description: "Découvrez les emplacements Purrify à travers le Canada. Sélectionnez votre province pour trouver des guides spécifiques à votre ville, des informations de livraison et des ressources locales pour les propriétaires de chats.",
      selectProvince: "Sélectionnez votre province",
      whyChoose: "Pourquoi choisir Purrify?",
      benefit1: "Technologie naturelle au charbon actif",
      benefit2: "Fonctionne avec tous les types de litière",
      benefit3: "Livraison rapide partout au Canada",
      shopCta: "Acheter Purrify",
      citiesAvailable: "{{count}} villes disponibles",
      cityAvailable: "1 ville disponible",
      viewGuide: "Voir le guide provincial →",
      fastShipping: {
        title: "Livraison rapide",
        description: "Livraison fiable dans toutes les provinces avec suivi"
      },
      naturalSolution: {
        title: "Solution naturelle",
        description: "Technologie au charbon actif pour un contrôle supérieur des odeurs"
      },
      localSupport: {
        title: "Support local",
        description: "Guides spécifiques à votre ville adaptés à votre climat"
      }
    },
    province: {
      badge: "Guide provincial",
      heading: "Contrôle des odeurs de litière au {{province}}",
      description: "Trouvez des détaillants Purrify et des options de livraison rapide partout au {{province}}. Fait confiance par les propriétaires de chats dans toutes les grandes villes.",
      citiesHeading: "Villes que nous desservons au {{province}}",
      viewCityGuide: "Voir le guide de la ville",
      cityCardDescription: "Découvrez les solutions de contrôle des odeurs à {{city}}",
      exploreOther: "Explorer d'autres provinces",
      orderOnline: "Commandez en ligne pour une livraison rapide",
      orderDescription: "Vous ne trouvez pas de magasin local? Faites-vous livrer Purrify à votre porte en 2-3 jours ouvrables partout au {{province}}."
    }
  },

  // Thank You / Order Confirmation Page
  thankYou: {
    heading: "Merci!",
    headingWithName: "Merci, {{name}}!",
    subheading: "Votre commande a été confirmée.",
    subheadingExtended: "Votre commande a été confirmée. Préparez-vous à découvrir la maison la plus fraîche que vous ayez jamais eue!",
    orderConfirmed: "Commande confirmée",
    orderNumber: "Numéro de commande",
    product: "Produit",
    quantity: "Quantité",
    total: "Total",
    expectedDelivery: "Livraison prévue",
    deliveryCA: "7-10 jours ouvrables au Canada",
    deliveryUS: "10-14 jours ouvrables aux États-Unis",
    deliveryIntl: "14-21 jours ouvrables international",
    shipsWithin: "Expédition dans 1-2 jours ouvrables",
    confirmationSent: "Courriel de confirmation envoyé à",
    checkSpam: "Vérifiez vos courriels indésirables si vous ne le voyez pas dans 5 minutes",
    trackingInfo: "Les informations de suivi seront envoyées à votre courriel une fois votre commande expédiée.",
    whatToExpect: {
      heading: "À quoi s'attendre",
      step1Title: "Recevez votre Purrify",
      step1Desc: "Votre colis arrivera dans un emballage discret et écologique. Chaque contenant est scellé pour la fraîcheur.",
      step2Title: "Instructions de première utilisation",
      step2Desc: "Pour de meilleurs résultats, commencez avec une litière propre:",
      step2Item1: "Nettoyez et rafraîchissez votre bac à litière",
      step2Item2: "Saupoudrez une fine couche de Purrify sur le dessus",
      step2Item3: "Pas besoin de mélanger - ça fonctionne depuis la surface",
      step2Item4: "Réappliquez après chaque changement de litière",
      step3Title: "Vivez la différence",
      step3Desc: "La plupart des clients remarquent une différence en 60 secondes! Le charbon actif piège instantanément les molécules d'ammoniac - pas de masquage, juste une vraie élimination des odeurs.",
      proTip: "Conseil pro:",
      proTipText: "Un peu suffit! Utilisez juste assez pour couvrir légèrement la surface. Une application excessive ne nuira pas, mais n'est pas nécessaire."
    },
    shareSection: {
      heading: "Partagez la fraîcheur",
      description: "Connaissez-vous quelqu'un avec une litière malodorante? Partagez votre lien de parrainage et ils recevront un essai GRATUIT!",
      generating: "Génération de votre lien de parrainage personnel...",
      whatsapp: "WhatsApp",
      facebook: "Facebook",
      email: "Courriel"
    },
    autoshipCta: {
      heading: "Ne manquez plus jamais",
      saveBadge: "ÉCONOMISEZ 30%",
      description: "Abonnez-vous à l'expédition automatique et économisez 30% sur chaque commande, plus la livraison GRATUITE. Annulez à tout moment.",
      savings: "Économies",
      shipping: "Livraison",
      cancel: "Annulation",
      button: "Passer à l'expédition automatique"
    },
    helpSection: {
      question: "Questions?",
      weAreHere: "Nous sommes là pour vous aider!",
      returnHome: "Retour à l'accueil"
    },
    questionsHeading: "Des questions sur votre commande?",
    questionsDescription: "Contactez notre équipe de support et nous serons heureux de vous aider.",
    contactSupport: "Contacter le support",
    continueShopping: "Continuer les achats",
    referralCta: {
      heading: "Vous aimez Purrify?",
      description: "Partagez avec vos amis et gagnez 5$ de crédit pour chaque parrainage!",
      button: "Obtenir mon lien de parrainage"
    }
  },

  // Reviews Page
  reviews: {
    heading: "Ce que disent les propriétaires de chats",
    subheading: "De vrais avis de vrais clients",
    verifiedPurchase: "Achat",
    helpful: "Utile",
    writeReview: "Écrire un avis",
    filterBy: "Filtrer par",
    allRatings: "Toutes les notes",
    sortBy: "Trier par",
    mostRecent: "Plus récent",
    mostHelpful: "Plus utile",
    highestRated: "Mieux noté",
    lowestRated: "Moins bien noté",
    showingReviews: "Affichage de {{count}} avis",
    noReviews: "Aucun avis pour le moment. Soyez le premier à partager votre expérience!",
    loadMore: "Charger plus d'avis"
  },

  // Reviews Page (Full Page)
  reviewsPage: {
    pageTitle: "Avis Clients",
    metaDescription: "Avis clients sur Purrify et comment utiliser un additif au charbon actif pour réduire les odeurs de litière. Livraison aux États-Unis et au Canada.",
    badge: "Avis Clients",
    heading: "Vraies Histoires de Propriétaires de Chats Heureux",
    description: "Avis clients sur Purrify et conseils pratiques pour réduire les odeurs de litière avec un additif au charbon actif.",
    breadcrumb: {
      home: "Accueil",
      reviews: "Avis"
    },
    stats: {
      averageRating: "Note Moyenne",
      verifiedReviews: "Avis clients",
      happyCustomers: "Clients Satisfaits",
      monthsInMarket: "Mois sur le Marché"
    },
    reviewCard: {
      verified: "Client",
      product: "Produit",
      cats: "Chats",
      useCase: "Cas d'Usage"
    },
    trustSection: {
      heading: "Pourquoi les Clients Font Confiance à Purrify",
      verifiedTitle: "Avis clients",
      verifiedDesc: "Nous publierons avis et notes dès qu'un système d'avis tiers sera en place.",
      ratingTitle: "Science et ressources",
      ratingDesc: "Consultez les citations et les guides pour vérifier les affirmations clés.",
      customersTitle: "Guides pratiques",
      customersDesc: "Solutions pour odeur de litière, ammoniac et utilisation en toute sécurité."
    },
    ctaSection: {
      heading: "Prêt à essayer chez vous ?",
      description: "Commencez avec un essai à faible risque et voyez comment cela s'intègre à votre routine de litière.",
      shopNow: "Acheter Maintenant",
      tryFreeSample: "Essayer un Échantillon Gratuit"
    },
    relatedLinks: {
      heading: "En Savoir Plus sur Purrify",
      comparison: "Comparaison de Produits",
      comparisonDesc: "Voir comment Purrify se compare",
      caseStudies: "Études de Cas",
      caseStudiesDesc: "Histoires de succès détaillées",
      usageInfo: "Informations d'Utilisation",
      usageInfoDesc: "Utilisation avec les chats et chatons",
      storeLocations: "Points de Vente",
      storeLocationsDesc: "Trouver Purrify près de chez vous"
    }
  },

  // Related Articles Section
  relatedArticles: {
    title: "Articles connexes",
    readMore: "Lire la suite"
  },

  // Review System Component
  reviewSystem: {
    customerReviews: "Avis clients",
    comingSoon: "Les avis clients apparaîtront ici dès que notre système d'avis sera en ligne.",
    reviews: "avis",
    basedOn: "Basé sur",
    wouldRecommend: "recommanderaient",
    verifiedPurchases: "achats vérifiés",
    viewAllReviews: "Voir tous les avis",
    loadMoreReviews: "Charger plus d'avis",
    filters: {
      allRatings: "Toutes les notes",
      stars: "Étoiles",
      star: "Étoile",
      allSizes: "Toutes les tailles",
      trial: "12g Essai",
      regular: "50g Standard",
      large: "120g Grand"
    },
    sort: {
      newestFirst: "Plus récent",
      oldestFirst: "Plus ancien",
      highestRated: "Mieux noté",
      lowestRated: "Moins bien noté",
      mostHelpful: "Plus utile"
    },
    review: {
      verifiedPurchase: "Achat vérifié",
      size: "Taille",
      cat: "chat",
      cats: "chats",
      usingFor: "Utilisé depuis",
      helpful: "Utile",
      recommendsProduct: "Recommande ce produit"
    }
  },

  // Social Follow CTA
  socialFollow: {
    headline: "Suivez-nous pour plus de conseils",
    description: "Rejoignez notre communauté pour des conseils de soins pour chats et des offres exclusives.",
    followOn: "Suivre Purrify sur"
  },

  // Affiliate Dashboard
  affiliateDashboard: {
    pageTitle: "Tableau de Bord Affilié",
    loginTitle: "Connexion Affilié",

    dashboard: "Tableau de bord",
    earnings: "Revenus",
    payouts: "Paiements",
    settings: "Paramètres",
    logout: "Déconnexion",

    overview: {
      welcome: "Bienvenue",
      yourCode: "Votre Code Affilié",
      copyCode: "Copier le Code",
      copiedCode: "Copié !",
      shareLink: "Votre Lien de Partage",
      copyLink: "Copier le Lien",
      copiedLink: "Lien Copié !"
    },

    stats: {
      totalClicks: "Clics Totaux",
      totalConversions: "Conversions",
      conversionRate: "Taux de Conversion",
      pendingEarnings: "Revenus en Attente",
      availableBalance: "Solde Disponible",
      totalEarnings: "Revenus à Vie",
      pendingNote: "Les commissions sont libérées après 30 jours"
    },

    conversions: {
      title: "Conversions Récentes",
      noConversions: "Pas encore de conversions. Partagez votre lien pour commencer à gagner !",
      date: "Date",
      orderId: "Nº Commande",
      orderAmount: "Montant Commande",
      commission: "Commission",
      status: "Statut",
      statusPending: "En attente",
      statusCleared: "Libérée",
      statusPaid: "Payée",
      statusVoided: "Annulée"
    },

    payoutsSection: {
      title: "Historique des Paiements",
      requestPayout: "Demander un Paiement",
      minimumPayout: "Le paiement minimum est de 50 $",
      payoutMethod: "Méthode de Paiement",
      paypalEmail: "Email PayPal",
      etransferEmail: "Email Virement Interac",
      amount: "Montant",
      requestedDate: "Demandé",
      processedDate: "Traité",
      status: "Statut",
      statusPending: "En attente",
      statusProcessing: "En traitement",
      statusCompleted: "Complété",
      statusRejected: "Rejeté",
      noPayouts: "Aucun historique de paiement",
      insufficientBalance: "Solde insuffisant pour le paiement",
      payoutRequested: "Demande de paiement soumise avec succès"
    },

    settingsSection: {
      title: "Paramètres du Compte",
      payoutSettings: "Paramètres de Paiement",
      payoutMethodLabel: "Méthode de Paiement Préférée",
      paypalOption: "PayPal",
      etransferOption: "Virement Interac (Canada seulement)",
      emailLabel: "Adresse Email de Paiement",
      saveSettings: "Enregistrer",
      settingsSaved: "Paramètres enregistrés avec succès"
    },

    assets: {
      title: "Ressources Marketing",
      description: "Téléchargez des bannières, images de produits et textes pour vos promotions.",
      banners: "Bannières",
      productImages: "Images Produits",
      socialPosts: "Publications Sociales",
      brandGuide: "Guide de Marque",
      brandColors: "Couleurs de Marque",
      guidelines: "Directives d'Utilisation",
      downloadAll: "Tout Télécharger",
      copyText: "Copier le Texte"
    },

    login: {
      title: "Connexion Affilié",
      email: "Adresse Email",
      password: "Mot de Passe",
      rememberMe: "Se souvenir de moi",
      forgotPassword: "Mot de passe oublié ?",
      loginButton: "Se Connecter",
      loggingIn: "Connexion en cours...",
      noAccount: "Pas encore affilié ?",
      applyNow: "Postuler Maintenant",
      invalidCredentials: "Email ou mot de passe invalide",
      accountInactive: "Votre compte affilié n'est pas actif"
    },

    errors: {
      loadFailed: "Échec du chargement des données",
      saveFailed: "Échec de l'enregistrement des paramètres",
      payoutFailed: "Échec de la demande de paiement",
      sessionExpired: "Votre session a expiré. Veuillez vous reconnecter."
    }
  },

  // Try Free Landing Page (for Ad Campaigns)
  tryFreePage: {
    meta: {
      title: "Essayez Purrify Gratuitement - Seulement 4,76 $ de Livraison | Élimination des Odeurs de Litière pour Chat",
      description: "Obtenez votre essai GRATUIT de Purrify - payez seulement 4,76 $ de livraison. Essayez-le dans votre routine de litière et voyez la différence."
    },
    hero: {
      badge: "Offre à Durée Limitée",
      headline: "Essayez Purrify Gratuitement",
      subheadline: "Seulement 4,76 $ de Livraison",
      description: "Essayez un additif au charbon actif dans votre routine de litière et voyez la différence.",
      cta: "Obtenir Mon Essai Gratuit",
      shippingNote: "Livraison partout au Canada"
    },
    problem: {
      headline: "Fatigué de Retenir Votre Respiration ?",
      subheadline: "On comprend. Cette odeur de litière est embarrassante.",
      points: [
        "Les invités arrivent et vous vous précipitez pour vérifier la litière",
        "Ouvrir les fenêtres en hiver juste pour aérer l'odeur",
        "Acheter constamment des désodorisants qui ne fonctionnent pas",
        "S'inquiéter que votre maison sent qu'un chat y vit"
      ]
    },
    howItWorks: {
      headline: "Air Frais en 30 Secondes",
      subheadline: "Simple comme 1-2-3",
      steps: [
        {
          number: "1",
          title: "Saupoudrer",
          description: "Ouvrez le sac et saupoudrez sur la litière de votre chat"
        },
        {
          number: "2",
          title: "Piéger",
          description: "Le charbon actif piège instantanément les molécules d'ammoniac"
        },
        {
          number: "3",
          title: "Fraîcheur",
          description: "Profitez de plus de 7 jours de fraîcheur sans odeur"
        }
      ]
    },
    socialProof: {
      headline: "À quoi vous attendre",
      rating: "",
      reviewCount: "",
      reviewLabel: "",
      testimonials: [
        {
          text: "J'étais sceptique, mais en quelques heures mon appartement entier sentait frais. Mes invités n'avaient aucune idée que j'avais des chats !",
          author: "Sarah M.",
          location: "Toronto, ON"
        },
        {
          text: "Enfin quelque chose qui fonctionne vraiment. Fini de masquer les odeurs avec des désodorisants.",
          author: "Mike R.",
          location: "Vancouver, BC"
        },
        {
          text: "Les meilleurs 4,76 $ que j'aie jamais dépensés. J'ai déjà commandé la taille complète !",
          author: "Jennifer K.",
          location: "Montréal, QC"
        }
      ]
    },
    guarantee: {
      headline: "Garantie Satisfait ou Remboursé de 30 Jours",
      description: "Si vous n'êtes pas émerveillé par les résultats, nous vous remboursons. Sans poser de questions.",
      badge: "Essai Sans Risque"
    },
    finalCta: {
      headline: "Prêt à Respirer Facilement ?",
      description: "Obtenez votre essai gratuit de Purrify aujourd'hui. Payez seulement 4,76 $ de livraison.",
      buttonText: "Obtenir Mon Essai Gratuit",
      note: "Annulez à tout moment. Aucun abonnement requis."
    },
    trust: {
      madeInCanada: "Fabriqué au Canada",
      natural: "100% Naturel",
      fragrance: "Sans Parfum",
      secure: "Paiement Sécurisé"
    }
  },

  // Page hors ligne
  offlinePage: {
    title: "Vous êtes hors ligne",
    description: "Il semble que vous ayez perdu votre connexion Internet. Ne vous inquiétez pas - vous pouvez toujours consulter certaines pages en cache hors ligne. Une fois que vous serez de nouveau en ligne, tout fonctionnera normalement.",
    tryAgain: "Réessayer",
    goHome: "Aller à l'accueil",
    availableOffline: "Disponible hors ligne",
    cachedPages: {
      homepage: "Page d'accueil",
      trialSize: "Produit format essai",
      howItWorks: "Comment ça marche",
      contactSupport: "Contactez le support"
    },
    emergencyContact: "Pour une assistance immédiate, vous pouvez également nous appeler"
  },

  // Formulaires (messages standardisés)
  forms: {
    success: {
      general: "Merci de nous avoir contactés ! Nous vous répondrons dans les 24 heures.",
      b2bContact: "Merci de votre intérêt ! Notre équipe vous contactera dans les 24 à 48 heures pour discuter des prochaines étapes.",
      retailerContact: "Merci de votre intérêt ! Notre équipe partenaires vous contactera dans les 24 à 48 heures pour discuter des tarifs et des prochaines étapes.",
      hospitalityContact: "Merci ! Notre équipe hôtellerie vous contactera dans les 24 heures avec des tarifs personnalisés pour vos propriétés.",
      shelterContact: "Merci de votre intérêt ! Notre équipe vous contactera dans les 24 à 48 heures pour discuter de comment nous pouvons soutenir votre refuge.",
      groomerContact: "Merci de votre intérêt ! Notre équipe partenaires vous contactera dans les 24 à 48 heures pour discuter des prochaines étapes.",
      vetContact: "Merci de votre intérêt ! Notre équipe vétérinaire vous contactera dans les 24 à 48 heures pour discuter des opportunités de partenariat.",
      catCafeContact: "Merci de votre intérêt ! Notre équipe vous contactera dans les 24 à 48 heures pour discuter de comment Purrify peut bénéficier à votre café à chats."
    },
    errors: {
      pleaseEnterTitle: "Veuillez entrer un titre",
      invalidEmail: "Courriel ou mot de passe invalide",
      requiredField: "Ce champ est requis",
      submitFailed: "Échec de l'envoi du formulaire. Veuillez réessayer."
    }
  },

  // Pages produits
  productPages: {
    cancelAnytime: "Annulez à tout moment. Livraison gratuite.",
    shipsFree: "Livraison gratuite",
    subscribeAndSave: "Abonnez-vous et économisez",
    save: "Économisez",
    savePercent: "Économisez {percent}%",
    perMonth: "par mois",
    billedQuarterly: "Facturé trimestriellement",
    shippingSavings: "Économisez 15-20$+ par commande par rapport aux achats individuels",
    save25vsStandard: "Économisez 25% par rapport à l'achat de deux formats standards",
    save25FamilyPack: "Économisez 25% avec notre Pack Familial"
  },

  // Page Science
  sciencePage: {
    seo: {
      title: "Comment le Charbon Actif Élimine l'Odeur de Litière pour Chats : La Science",
      description: "Les molécules d'ammoniac mesurent 0,26 nm. Nos micropores sont dimensionnés pour les piéger. Voici comment l'architecture des pores conçue capture les odeurs d'urine (ammoniac) et de selles (mercaptans)."
    },
    breadcrumb: {
      home: "Accueil",
      learn: "Apprendre",
      science: "Science"
    },
    hero: {
      heading: "Conçu pour Éliminer l'Odeur de Litière pour Chats",
      description: "En collaboration avec des scientifiques chercheurs, nous avons conçu la structure de pores parfaite pour capturer l'ammoniac de l'urine et les mercaptans des selles, les deux molécules responsables de cette odeur distinctive de litière.",
      ctaButton: "Essayez la Science"
    },
    understanding: {
      sectionTitle: "Comprendre l'Odeur de la Litière : Les Deux Coupables",
      description: "Cette odeur distinctive de litière provient de deux molécules spécifiques. Pour les éliminer, vous devez les comprendre.",
      ammonia: {
        title: "Ammoniac (NH₃)",
        subtitle: "De l'Urine de Chat",
        smell: "Piquant, âcre, qui irrite les yeux, comme des produits nettoyants",
        moleculeSize: "Minuscule à 0,26 nanomètres",
        problem: "Se forme lorsque les bactéries décomposent l'urée dans l'urine",
        whyHard: "La plupart du charbon a des pores trop grands pour piéger des molécules si petites"
      },
      mercaptans: {
        title: "Mercaptans",
        subtitle: "Des Selles de Chat",
        smell: "Œufs pourris, égouts, soufre—cette sensation nauséabonde",
        moleculeSize: "Composés soufrés plus grands et complexes",
        problem: "Libérés lorsque les protéines dans les selles se décomposent",
        whyHard: "Molécules collantes nécessitant des tailles de pores spécifiques pour être capturées"
      },
      breakthrough: "Voici la percée : La plupart du charbon actif est conçu pour la filtration de l'eau ou la purification générale de l'air. Nous avons travaillé avec des scientifiques chercheurs pour concevoir du charbon spécifiquement pour ces deux molécules, créant le piège parfait pour l'odeur de litière pour chats."
    },
    imageCaptions: {
      freshHome: {
        title: "Votre Chat Mérite un Foyer Frais",
        description: "Élimination des odeurs au niveau moléculaire, pas de masquage"
      },
      noOdors: {
        title: "Fini les Odeurs Embarrassantes",
        description: "Contrôle des odeurs scientifiquement prouvé pour propriétaires de chats modernes"
      }
    },
    poreSize: {
      sectionTitle: "La Distribution Parfaite de la Taille des Pores",
      description: "Les tests en laboratoire confirment notre rapport optimisé micropores-mésopores-macropores",
      micropores: {
        size: "<2nm",
        title: "Micropores",
        specialist: "Spécialistes de l'Ammoniac",
        target: "NH₃ (0,26nm)",
        density: "Concentration maximale",
        function: "Enferment les plus petites molécules odorantes"
      },
      mesopores: {
        size: "2-50nm",
        title: "Mésopores",
        specialist: "Pièges à Mercaptans",
        target: "Composés soufrés",
        density: "Rapport optimisé",
        function: "Capturent les odeurs fécales complexes"
      },
      macropores: {
        size: ">50nm",
        title: "Macropores",
        specialist: "Système de Transport",
        target: "Toutes les molécules",
        density: "Placement stratégique",
        function: "Livraison rapide aux sites de capture"
      },
      surfaceArea: {
        title: "Surface Spécifique : 1050 m²/g",
        description: "C'est plus de 12 terrains de tennis de surface de capture d'odeurs dans seulement un gramme de Purrify™",
        iodineNumber: "Indice d'Iode mg/g",
        ctcAdsorption: "Adsorption CTC",
        hardness: "Dureté",
        moisture: "Humidité"
      }
    },
    scienceFacts: {
      sectionTitle: "Structure de Pores de Précision Conçue",
      description: "Tous les charbons actifs ne se valent pas. Nous avons travaillé avec des scientifiques pour optimiser chaque détail pour l'odeur de litière pour chats.",
      facts: [
        {
          title: "Architecture de Pores Conçue",
          description: "En collaboration avec des scientifiques chercheurs, nous avons optimisé le rapport exact de micropores (< 2nm), mésopores (2-50nm) et macropores (> 50nm) pour créer le piège parfait pour les molécules d'odeur de litière pour chats."
        },
        {
          title: "Maîtrise de la Capture d'Ammoniac",
          description: "Les molécules d'ammoniac (NH₃) de l'urine de chat sont minuscules—seulement 0,26 nanomètres. Notre structure riche en micropores crée des millions de sites de capture parfaitement dimensionnés qui enferment l'ammoniac avant que vous ne puissiez le sentir."
        },
        {
          title: "Élimination des Mercaptans",
          description: "Les mercaptans (composés soufrés) donnent aux selles cette odeur distinctive d'œuf pourri. Nos canaux de mésopores sont spécifiquement dimensionnés pour piéger ces molécules plus grandes et complexes de manière permanente."
        },
        {
          title: "Synergie Triple Pore",
          description: "Les macropores agissent comme des autoroutes livrant les molécules odorantes profondément dans le charbon. Les mésopores capturent les composés soufrés de taille moyenne. Les micropores piègent les plus petites molécules d'ammoniac. Rien n'échappe."
        }
      ]
    },
    microscopicView: {
      imageCaptions: {
        microscope: "La microscopie de qualité recherche révèle la structure des pores",
        labTesting: "Les tests en laboratoire confirment la performance optimisée",
        molecular: "Capture au niveau moléculaire des composés odorants"
      },
      whatYoureLookingAt: {
        title: "Ce Que Vous Regardez",
        description: "Ces images montrent la recherche en laboratoire derrière notre structure de pores optimisée. Chaque petit canal et cavité est un piège attendant de capturer des molécules odorantes au niveau moléculaire.",
        bullets: [
          "Des millions de pores créent une surface spécifique massive (1050 m²/g)",
          "Différentes tailles de pores = différentes molécules odorantes capturées",
          "Une fois piégées, les molécules ne peuvent pas s'échapper dans l'air"
        ]
      },
      quote: {
        text: "La clé n'est pas seulement d'avoir des pores, mais d'avoir des pores de la bonne taille dans les bonnes proportions pour les molécules spécifiques que vous voulez capturer.",
        attribution: "Collaboration de recherche avec des scientifiques du charbon actif"
      }
    },
    technicalPerformance: {
      sectionTitle: "Performance Vérifiée en Laboratoire",
      description: "Des données réelles de tests de charbon actif confirment que notre structure de pores optimisée offre une adsorption supérieure",
      particleSize: {
        title: "Distribution de Particules Maille 8×30",
        effectiveSize: "Taille Effective :",
        meanDiameter: "Diamètre Moyen :",
        uniformityCoefficient: "Coefficient d'Uniformité :",
        whyMatters: "Pourquoi c'est important : Le dimensionnement cohérent des particules assure un flux uniforme à travers la litière et un contact maximal avec les molécules odorantes. Notre maille 8×30 est spécifiquement dimensionnée pour une performance optimale dans la litière pour chats."
      },
      adsorption: {
        title: "Performance de Déchloration Rapide",
        halfLength: "Valeur de Demi-Longueur :",
        apparentDensity: "Densité Apparente :",
        betSurface: "Surface Spécifique BET :",
        whyMatters: "Pourquoi c'est important : L'élimination rapide du chlore prouve que la structure microporeuse du charbon est hautement active. S'il peut capturer les molécules de chlore si rapidement, l'ammoniac n'a aucune chance."
      }
    },
    engineeredPerformance: {
      title: "Conçu pour la Performance du Monde Réel",
      description: "Les tests en laboratoire montrent que notre charbon actif de maille 8×30 maintient des caractéristiques de flux optimales et une perte de pression minimale à des températures variables (5-25°C). Cela signifie une capture d'odeurs constante que votre litière soit dans un sous-sol frais ou une salle de bain chaude.",
      stats: {
        temperatureRange: "5-25°C",
        temperatureLabel: "Plage de Température",
        performanceLabel: "Performance",
        pressureLossLabel: "Perte de Pression"
      }
    },
    processTimeline: {
      sectionTitle: "Comment les Trois Types de Pores Travaillent Ensemble",
      description: "Notre architecture de pores soutenue par la recherche crée un système de capture spécifiquement conçu pour les odeurs de litière pour chats.",
      steps: [
        {
          title: "Les Coupables : Ammoniac et Mercaptans",
          description: "L'urine de chat se décompose en ammoniac (NH₃)—cette odeur piquante qui irrite les yeux. Les selles libèrent des mercaptans—composés soufrés qui sentent les œufs pourris ou les égouts. Ce sont les molécules que nous avons conçu Purrify pour capturer."
        },
        {
          title: "Macropores : Les Voies Express",
          description: "Les grands macropores (> 50nm) agissent comme des autoroutes, transportant rapidement les molécules odorantes profondément dans la structure du charbon. Pensez à eux comme les points d'entrée qui préviennent les goulots d'étranglement."
        },
        {
          title: "Mésopores : Les Pièges à Mercaptans",
          description: "Les mésopores de taille moyenne (2-50nm) sont parfaitement dimensionnés pour capturer les mercaptans et autres composés soufrés des selles. Ces pores créent une prise ferme qui ne lâchera pas."
        },
        {
          title: "Micropores : Les Éliminateurs d'Ammoniac",
          description: "Les minuscules micropores (< 2nm) sont optimisés pour la taille de 0,26nm de l'ammoniac. Avec des millions de ces sites de capture par gramme, les molécules d'ammoniac sont enfermées de manière permanente avant que vous ne puissiez les sentir."
        }
      ]
    },
    researchSection: {
      title: "La Solution la Plus Efficace au Monde pour l'Odeur de Litière pour Chats",
      description: "En concevant le rapport parfait micropores-mésopores-macropores, nous avons créé du charbon actif spécifiquement optimisé pour capturer l'ammoniac et les mercaptans—les molécules exactes qui font sentir les litières.",
      stats: {
        ammoniaSize: "0,26nm",
        ammoniaSizeLabel: "Taille de la Molécule d'Ammoniac - Micropores Parfaitement Adaptés",
        poreTypes: "3 Types de Pores",
        poreTypesLabel: "Micro + Méso + Macro = Capture Complète",
        surfaceArea: "1050 m²/g",
        surfaceAreaLabel: "Surface Spécifique - Des Millions de Sites de Capture"
      },
      buttons: {
        experience: "Découvrez la Science",
        learnMore: "En Savoir Plus"
      }
    },
    backToLearn: "Retour à Apprendre"
  },
};
