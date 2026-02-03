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
  image?: string;
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
      location: "Toronto, ON",
      image: "/images/team/mark-archer.png"
    },
    {
      name: "Dr. Michael Rodriguez",
      role: "Chief Science Officer",
      bio: "Materials scientist with 15+ years experience in activated carbon technology. Leads our product development and quality assurance.",
      location: "Vancouver, BC",
      image: "/images/team/michael-rodriguez.png"
    },
    {
      name: "Sage Dean",
      role: "Head of Customer Experience",
      bio: "Former veterinary technician passionate about improving the lives of pets and their families through better products.",
      location: "Montreal, QC",
      image: "/images/team/sage-dean.png"
    },
    {
      name: "David Kim",
      role: "Operations Director",
      bio: "Supply chain expert ensuring every Purrify order is processed quickly and delivered reliably across Canada and beyond.",
      location: "Calgary, AB",
      image: "/images/team/david-kim.png"
    }
  ],

  salesTeam: [
    {
      name: "Leland Brantley",
      role: "Regional Sales Manager",
      bio: "With over 12 years in pet product distribution, Leland leads our Eastern Canada expansion. His consultative approach has secured partnerships with over 200 independent pet retailers.",
      location: "Toronto, ON",
      image: "/images/team/leland-brantley.png"
    },
    {
      name: "Ezekiel Voss",
      role: "Enterprise Sales Director",
      bio: "Ezekiel specializes in B2B partnerships and veterinary clinic networks. His background in animal health sales helps him connect practices with odor solutions their clients love.",
      location: "Vancouver, BC",
      image: "/images/team/ezekiel-voss.png"
    },
    {
      name: "Trenton Harlow",
      role: "National Account Manager",
      bio: "Trenton manages our major retail partnerships across Canada. His relentless focus on customer success has grown our retail presence by 300% in two years.",
      location: "Calgary, AB",
      image: "/images/team/trenton-harlow.png"
    },
    {
      name: "Dorian Keller",
      role: "Sales Development Representative",
      bio: "Dorian is the friendly first contact for new retail partners. His enthusiasm for pet wellness and natural products makes every conversation memorable.",
      location: "Ottawa, ON",
      image: "/images/team/dorian-keller.png"
    },
    {
      name: "Finnegan Crosby",
      role: "Territory Sales Manager",
      bio: "Covering the Prairie provinces, Finnegan builds lasting relationships with farm supply stores and rural pet retailers who appreciate Purrify's practical benefits.",
      location: "Edmonton, AB",
      image: "/images/team/finnegan-crosby.png"
    },
    {
      name: "Cassian Reed",
      role: "Key Account Executive",
      bio: "Cassian works with our largest retail chains and distributors. His strategic mindset and deep industry knowledge keep our partnerships thriving.",
      location: "Montreal, QC",
      image: "/images/team/cassian-reed.png"
    },
    {
      name: "Merrick Sullivan",
      role: "Inside Sales Specialist",
      bio: "Merrick handles inbound inquiries and helps new retailers get started with Purrify. His product expertise ensures every partner finds the right solution for their customers.",
      location: "Halifax, NS",
      image: "/images/team/merrick-sullivan.png"
    },
    {
      name: "Orion Hampton",
      role: "Business Development Manager",
      bio: "Orion focuses on emerging markets and new verticals, from cat cafes to pet-friendly hotels. His creative approach opens doors to unique partnerships.",
      location: "Victoria, BC",
      image: "/images/team/orion-hampton.png"
    },
    {
      name: "Gideon Fletcher",
      role: "Field Sales Representative",
      bio: "Gideon covers Ontario's Golden Horseshoe, visiting stores personally to train staff and ensure Purrify is positioned for success on every shelf.",
      location: "Hamilton, ON",
      image: "/images/team/gideon-fletcher.png"
    },
    {
      name: "Silas Bennett",
      role: "Customer Success Manager",
      bio: "Silas ensures our retail partners thrive after signing on. From inventory planning to promotional support, he's dedicated to mutual growth.",
      location: "Winnipeg, MB",
      image: "/images/team/silas-bennett.png"
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

  salesTeam: [
    {
      name: "Leland Brantley",
      role: "Directeur Régional des Ventes",
      bio: "Avec plus de 12 ans dans la distribution de produits pour animaux, Leland dirige notre expansion dans l'Est du Canada. Son approche consultative a sécurisé des partenariats avec plus de 200 détaillants indépendants.",
      location: "Toronto, ON"
    },
    {
      name: "Ezekiel Voss",
      role: "Directeur des Ventes Entreprises",
      bio: "Ezekiel se spécialise dans les partenariats B2B et les réseaux de cliniques vétérinaires. Son expérience dans la vente de santé animale l'aide à connecter les pratiques avec des solutions d'odeurs appréciées par leurs clients.",
      location: "Vancouver, BC"
    },
    {
      name: "Trenton Harlow",
      role: "Gestionnaire de Comptes Nationaux",
      bio: "Trenton gère nos principaux partenariats de vente au détail à travers le Canada. Son focus incessant sur le succès client a augmenté notre présence de 300% en deux ans.",
      location: "Calgary, AB"
    },
    {
      name: "Dorian Keller",
      role: "Représentant de Développement des Ventes",
      bio: "Dorian est le premier contact sympathique pour les nouveaux partenaires de vente au détail. Son enthousiasme pour le bien-être animal et les produits naturels rend chaque conversation mémorable.",
      location: "Ottawa, ON"
    },
    {
      name: "Finnegan Crosby",
      role: "Gestionnaire des Ventes de Territoire",
      bio: "Couvrant les provinces des Prairies, Finnegan construit des relations durables avec les magasins d'alimentation agricole et les détaillants d'animaux ruraux qui apprécient les avantages pratiques de Purrify.",
      location: "Edmonton, AB"
    },
    {
      name: "Cassian Reed",
      role: "Exécutif de Comptes Clés",
      bio: "Cassian travaille avec nos plus grandes chaînes de vente au détail et distributeurs. Son esprit stratégique et ses connaissances approfondies de l'industrie maintiennent nos partenariats prospères.",
      location: "Montréal, QC"
    },
    {
      name: "Merrick Sullivan",
      role: "Spécialiste des Ventes Internes",
      bio: "Merrick gère les demandes entrantes et aide les nouveaux détaillants à démarrer avec Purrify. Son expertise produit assure que chaque partenaire trouve la bonne solution pour leurs clients.",
      location: "Halifax, NS"
    },
    {
      name: "Orion Hampton",
      role: "Gestionnaire de Développement Commercial",
      bio: "Orion se concentre sur les marchés émergents et nouveaux segments, des cafés pour chats aux hôtels acceptant les animaux. Son approche créative ouvre la porte à des partenariats uniques.",
      location: "Victoria, BC"
    },
    {
      name: "Gideon Fletcher",
      role: "Représentant des Ventes sur le Terrain",
      bio: "Gideon couvre le Golden Horseshoe de l'Ontario, visitant les magasins personnellement pour former le personnel et s'assurer que Purrify est positionné pour le succès sur chaque étagère.",
      location: "Hamilton, ON"
    },
    {
      name: "Silas Bennett",
      role: "Gestionnaire de la Réussite Client",
      bio: "Silas assure le succès de nos partenaires de vente au détail après la signature. De la planification des stocks au soutien promotionnel, il est dédié à la croissance mutuelle.",
      location: "Winnipeg, MB"
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

// Shared story data for Spanish pages
export const esStoryData = {
  milestones: [
    {
      year: "2008",
      title: "El Problema Descubierto",
      description: "Nuestro fundador, un dueno de gatos con multiples mascotas, luchaba contra los olores persistentes de la caja de arena a pesar de probar todos los productos del mercado.",
      icon: Lightbulb
    },
    {
      year: "2008-2009",
      title: "Investigacion y Desarrollo",
      description: "Nos asociamos con cientificos de materiales para desarrollar una formula de carbon activado disenada especificamente para eliminar los olores de la arena para gatos.",
      icon: Target
    },
    {
      year: "2009",
      title: "Primer Prototipo",
      description: "Creamos el primer prototipo de Purrify y lo probamos con duenos de gatos locales. Los resultados superaron todas las expectativas con un 95% de reduccion de olores.",
      icon: Zap
    },
    {
      year: "2023",
      title: "Lanzamiento del Producto",
      description: "Lanzamiento oficial de Purrify en todo Canada, ayudando a cientos de duenos de gatos a crear hogares mas frescos y limpios.",
      icon: Award
    },
    {
      year: "2024",
      title: "Expansion y Crecimiento",
      description: "Expandimos la linea de productos con multiples tamanos y comenzamos el envio internacional para servir a duenos de gatos en todo el mundo.",
      icon: Users
    }
  ],

  values: [
    {
      icon: Heart,
      title: "Filosofia Mascotas Primero",
      description: "Cada decision que tomamos considera primero la salud y la felicidad de los gatos y sus familias."
    },
    {
      icon: Shield,
      title: "Seguridad y Calidad",
      description: "Todos los productos pasan por controles de calidad y no contienen fragancias ni colorantes anadidos."
    },
    {
      icon: Leaf,
      title: "Responsabilidad Ambiental",
      description: "Evaluamos continuamente el empaque y las operaciones para reducir el desperdicio donde sea posible."
    },
    {
      icon: Users,
      title: "Exito del Cliente",
      description: "Nuestro exito se mide por la satisfaccion y la mejora en la calidad de vida de nuestros clientes y sus mascotas."
    }
  ],

  team: [
    {
      name: "Mark Archer",
      role: "Fundador y CEO",
      bio: "Un amante de los gatos de toda la vida con experiencia en ciencias ambientales. La lucha personal de Mark contra los olores de la caja de arena llevo a la creacion de Purrify.",
      location: "Toronto, ON"
    },
    {
      name: "Dr. Michael Rodriguez",
      role: "Director Cientifico",
      bio: "Cientifico de materiales con mas de 15 anos de experiencia en tecnologia de carbon activado. Lidera nuestro desarrollo de productos y aseguramiento de calidad.",
      location: "Vancouver, BC"
    },
    {
      name: "Sage Dean",
      role: "Directora de Experiencia del Cliente",
      bio: "Ex tecnica veterinaria apasionada por mejorar la vida de las mascotas y sus familias a traves de mejores productos.",
      location: "Montreal, QC"
    },
    {
      name: "David Kim",
      role: "Director de Operaciones",
      bio: "Experto en cadena de suministro que asegura que cada pedido de Purrify se procese rapidamente y se entregue de manera confiable en todo Canada y mas alla.",
      location: "Calgary, AB"
    }
  ],

  salesTeam: [
    {
      name: "Leland Brantley",
      role: "Gerente Regional de Ventas",
      bio: "Con mas de 12 anos en distribucion de productos para mascotas, Leland lidera nuestra expansion en el Este de Canada. Su enfoque consultivo ha asegurado alianzas con mas de 200 minoristas independientes.",
      location: "Toronto, ON"
    },
    {
      name: "Ezekiel Voss",
      role: "Director de Ventas Empresariales",
      bio: "Ezekiel se especializa en alianzas B2B y redes de clinicas veterinarias. Su experiencia en ventas de salud animal le ayuda a conectar practicas con soluciones de olores que sus clientes adoran.",
      location: "Vancouver, BC"
    },
    {
      name: "Trenton Harlow",
      role: "Gerente de Cuentas Nacionales",
      bio: "Trenton maneja nuestras principales alianzas minoristas en Canada. Su enfoque constante en el exito del cliente ha crecido nuestra presencia minorista en 300% en dos anos.",
      location: "Calgary, AB"
    },
    {
      name: "Dorian Keller",
      role: "Representante de Desarrollo de Ventas",
      bio: "Dorian es el primer contacto amigable para nuevos socios minoristas. Su entusiasmo por el bienestar animal y productos naturales hace cada conversacion memorable.",
      location: "Ottawa, ON"
    },
    {
      name: "Finnegan Crosby",
      role: "Gerente de Ventas de Territorio",
      bio: "Cubriendo las provincias de las Praderas, Finnegan construye relaciones duraderas con tiendas de suministros agricolas y minoristas de mascotas rurales que aprecian los beneficios practicos de Purrify.",
      location: "Edmonton, AB"
    },
    {
      name: "Cassian Reed",
      role: "Ejecutivo de Cuentas Clave",
      bio: "Cassian trabaja con nuestras cadenas minoristas y distribuidores mas grandes. Su mentalidad estrategica y profundo conocimiento de la industria mantienen nuestras alianzas prosperando.",
      location: "Montreal, QC"
    },
    {
      name: "Merrick Sullivan",
      role: "Especialista en Ventas Internas",
      bio: "Merrick maneja consultas entrantes y ayuda a nuevos minoristas a comenzar con Purrify. Su experiencia en productos asegura que cada socio encuentre la solucion adecuada para sus clientes.",
      location: "Halifax, NS"
    },
    {
      name: "Orion Hampton",
      role: "Gerente de Desarrollo de Negocios",
      bio: "Orion se enfoca en mercados emergentes y nuevos segmentos, desde cafes para gatos hasta hoteles pet-friendly. Su enfoque creativo abre puertas a alianzas unicas.",
      location: "Victoria, BC"
    },
    {
      name: "Gideon Fletcher",
      role: "Representante de Ventas de Campo",
      bio: "Gideon cubre el Golden Horseshoe de Ontario, visitando tiendas personalmente para capacitar al personal y asegurar que Purrify este posicionado para el exito en cada estante.",
      location: "Hamilton, ON"
    },
    {
      name: "Silas Bennett",
      role: "Gerente de Exito del Cliente",
      bio: "Silas asegura que nuestros socios minoristas prosperen despues de firmar. Desde la planificacion de inventario hasta el apoyo promocional, esta dedicado al crecimiento mutuo.",
      location: "Winnipeg, MB"
    }
  ],

  stats: [
    {
      number: "1,000+",
      label: "Clientes Satisfechos",
      description: "Duenos de gatos en Canada e internacionalmente"
    },
    {
      number: "98%",
      label: "Tasa de Satisfaccion",
      description: "Clientes que recomendarian Purrify"
    },
    {
      number: "2,000+",
      label: "Cambios de Arena Mejorados",
      description: "Cambios de caja de arena estimados mejorados"
    },
    {
      number: "200+",
      label: "Pedidos Completados",
      description: "En todo Canada e internacionalmente"
    }
  ]
};
