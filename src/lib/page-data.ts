import {
  Heart,
  Users,
  Award,
  Target,
  Lightbulb,
  Leaf,
  Shield,
  Zap,
  LucideIcon
} from 'lucide-react';

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface ValueItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  location: string;
}

export interface StatItem {
  number: string;
  label: string;
  description: string;
}

// Shared story data for English pages
export const enStoryData = {
  milestones: [
    {
      year: "2008",
      title: "The Problem Discovered",
      description: "Our founder, a cat owner with multiple pets, struggled with persistent litter box odors despite trying every product on the market.",
      icon: Lightbulb
    },
    {
      year: "2008-2009",
      title: "Research & Development",
      description: "Partnered with material scientists to develop an activated carbon formula specifically designed for cat litter odor elimination.",
      icon: Target
    },
    {
      year: "2009",
      title: "First Prototype",
      description: "Created the first Purrify prototype and tested it with local cat owners. Results exceeded all expectations with 95% odor reduction.",
      icon: Zap
    },
    {
      year: "2023",
      title: "Product Launch",
      description: "Officially launched Purrify across Canada, helping hundreds of cat owners create fresher, cleaner homes.",
      icon: Award
    },
    {
      year: "2024",
      title: "Expansion & Growth",
      description: "Expanded product line with multiple sizes and began international shipping to serve cat owners worldwide.",
      icon: Users
    }
  ],

  values: [
    {
      icon: Heart,
      title: "Pet-First Philosophy",
      description: "Every decision we make considers the health and happiness of cats and their families first."
    },
    {
      icon: Shield,
      title: "Safety & Quality",
      description: "All products undergo quality checks and contain no added fragrances or dyes."
    },
    {
      icon: Leaf,
      title: "Environmental Responsibility",
      description: "We continually evaluate packaging and operations to reduce waste where feasible."
    },
    {
      icon: Users,
      title: "Customer Success",
      description: "Our success is measured by the satisfaction and improved quality of life of our customers and their pets."
    }
  ],

  team: [
    {
      name: "Mark Archer",
      role: "Founder & CEO",
      bio: "A lifelong cat lover with a background in environmental science. Mark's personal struggle with litter box odors led to the creation of Purrify.",
      location: "Toronto, ON"
    },
    {
      name: "Dr. Michael Rodriguez",
      role: "Chief Science Officer",
      bio: "Materials scientist with 15+ years experience in activated carbon technology. Leads our product development and quality assurance.",
      location: "Vancouver, BC"
    },
    {
      name: "Sage Dean",
      role: "Head of Customer Experience",
      bio: "Former veterinary technician passionate about improving the lives of pets and their families through better products.",
      location: "Montreal, QC"
    },
    {
      name: "David Kim",
      role: "Operations Director",
      bio: "Supply chain expert ensuring every Purrify order is processed quickly and delivered reliably across Canada and beyond.",
      location: "Calgary, AB"
    }
  ],

  stats: [
    {
      number: "1,000+",
      label: "Happy Customers",
      description: "Cat owners across Canada and internationally"
    },
    {
      number: "98%",
      label: "Satisfaction Rate",
      description: "Customers who would recommend Purrify"
    },
    {
      number: "2,000+",
      label: "Litter Changes Improved",
      description: "Estimated litter box changes made better"
    },
    {
      number: "200+",
      label: "Orders Fulfilled",
      description: "Across Canada and internationally"
    }
  ]
};

// Shared story data for French pages
export const frStoryData = {
  milestones: [
    {
      year: "2008",
      title: "Le Problème Découvert",
      description: "Notre fondatrice, propriétaire de plusieurs chats, luttait contre les odeurs persistantes du bac à litière malgré avoir essayé tous les produits sur le marché.",
      icon: Lightbulb
    },
    {
      year: "2008-2009",
      title: "Recherche et Développement",
      description: "Partenariat avec des scientifiques des matériaux pour développer une formule de charbon actif spécialement conçue pour l'élimination des odeurs de litière pour chat.",
      icon: Target
    },
    {
      year: "2009",
      title: "Premier Prototype",
      description: "Création du premier prototype Purrify et test avec des propriétaires de chats locaux. Les résultats ont dépassé toutes les attentes avec 95% de réduction d'odeurs.",
      icon: Zap
    },
    {
      year: "2023",
      title: "Lancement du Produit",
      description: "Lancement officiel de Purrify à travers le Canada, aidant des centaines de propriétaires de chats à créer des maisons plus fraîches et propres.",
      icon: Award
    },
    {
      year: "2024",
      title: "Expansion et Croissance",
      description: "Expansion de la gamme de produits avec plusieurs tailles et début de l'expédition internationale pour servir les propriétaires de chats mondialement.",
      icon: Users
    }
  ],

  values: [
    {
      icon: Heart,
      title: "Philosophie Animaux d'Abord",
      description: "Chaque décision que nous prenons considère d'abord la santé et le bonheur des chats et de leurs familles."
    },
    {
      icon: Shield,
      title: "Sécurité et Qualité",
      description: "Tous les produits font l'objet de contrôles qualité et ne contiennent pas de parfums ni de colorants ajoutés."
    },
    {
      icon: Leaf,
      title: "Responsabilité Environnementale",
      description: "Nous évaluons continuellement les emballages et les opérations pour réduire les déchets lorsque c'est possible."
    },
    {
      icon: Users,
      title: "Succès Client",
      description: "Notre succès se mesure par la satisfaction et l'amélioration de la qualité de vie de nos clients et de leurs animaux."
    }
  ],

  team: [
    {
      name: "Mark Archer",
      role: "Fondateur et PDG",
      bio: "Amoureux des chats depuis toujours avec une formation en sciences environnementales. La lutte personnelle de Mark contre les odeurs de litière a mené à la création de Purrify.",
      location: "Toronto, ON"
    },
    {
      name: "Dr. Michael Rodriguez",
      role: "Directeur Scientifique en Chef",
      bio: "Scientifique des matériaux avec plus de 15 ans d'expérience en technologie du charbon actif. Dirige notre développement de produits et assurance qualité.",
      location: "Vancouver, BC"
    },
    {
      name: "Emma Thompson",
      role: "Directrice de l'Expérience Client",
      bio: "Ancienne technicienne vétérinaire passionnée par l'amélioration de la vie des animaux et de leurs familles grâce à de meilleurs produits.",
      location: "Montréal, QC"
    },
    {
      name: "David Kim",
      role: "Directeur des Opérations",
      bio: "Expert en chaîne d'approvisionnement s'assurant que chaque commande Purrify soit traitée rapidement et livrée de manière fiable à travers le Canada et au-delà.",
      location: "Calgary, AB"
    }
  ],

  stats: [
    {
      number: "1 000+",
      label: "Clients Satisfaits",
      description: "Propriétaires de chats à travers le Canada et internationalement"
    },
    {
      number: "98%",
      label: "Taux de Satisfaction",
      description: "Clients qui recommanderaient Purrify"
    },
    {
      number: "2 000+",
      label: "Changements de Litière Améliorés",
      description: "Changements de bac à litière estimés rendus meilleurs"
    },
    {
      number: "200+",
      label: "Commandes traitées",
      description: "À travers le Canada et à l'international"
    }
  ]
};
