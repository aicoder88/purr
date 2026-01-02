// Common translation constants to reduce duplication across language files
export const COMMON_DESCRIPTIONS = {
  PRODUCT_PURRIFY_17G: {
    EN: "Trial size - Single Use Sample\nTrial size: Only enough for one litter box change. Ideal for trying Purrify before committing to a larger size.",
    FR: "Parfait pour les Nouveaux Chaton\nTaille d'essai : Suffisant uniquement pour un seul changement de litiere. Ideal pour essayer Purrify avant de choisir un format plus grand.",
    ZH: "试用装 - 单次使用样品\n试用装：仅够一次猫砂更换使用。适合在购买大包装前试用Purrify。",
    ES: "Tamano de prueba - Muestra de uso unico\nTamano de prueba: Solo suficiente para un cambio de arena. Ideal para probar Purrify antes de elegir un tamano mas grande."
  },
  PRODUCT_PURRIFY_60G: {
    EN: "Ideal for One Cat\nOur most popular size for single-cat homes.\nOne month of freshness!",
    FR: "Ideal pour un Chat\nNotre taille la plus populaire pour les foyers avec un seul chat.\nUn mois de fraicheur !",
    ZH: "单猫家庭理想选择\n我们最受欢迎的单猫家庭规格。\n一个月的清新！",
    ES: "Ideal para Un Gato\nNuestro tamano mas popular para hogares con un solo gato.\nUn mes de frescura!"
  },
  PRODUCT_PURRIFY_120G: {
    EN: "Perfect for Two Cats\nDouble the power for multi-cat households.\nMaximum odor control.",
    FR: "Parfait pour Deux Chats\nDouble la puissance pour les foyers multi-chats.\nControle maximal des odeurs.",
    ZH: "双猫家庭完美选择\n多猫家庭的双倍功效。\n最大程度的异味控制。",
    ES: "Perfecto para Dos Gatos\nDoble poder para hogares multi-gatos.\nMaximo control de olores."
  },
  ODOR_ELIMINATION_DESC: {
    EN: "Activated carbon cat litter additive that eliminates odors at the source.",
    FR: "Additif de litiere pour chat a base de charbon actif qui elimine les odeurs a la source.",
    ZH: "使用Purrify活性炭添加剂消除猫砂盒异味。天然、安全、有效。",
    ES: "Aditivo de carbon activado para arena de gatos que elimina olores en la fuente."
  }
} as const;

// Common feature descriptions
export const FEATURE_DESCRIPTIONS = {
  ODOR_ELIMINATION: {
    EN: "Purrify's advanced formula effectively eliminates unpleasant litter box odors at their source.",
    FR: "La formule avancee de Purrify elimine efficacement les odeurs desagreables de la litiere a la source.",
    ZH: "Purrify的先进配方有效地从源头消除令人不快的猫砂盒异味。",
    ES: "La formula avanzada de Purrify elimina efectivamente los olores desagradables de la arena en su origen."
  },
  CAT_FRIENDLY: {
    EN: "Designed with your cat's well-being in mind, it's gentle, and completely pet-friendly.",
    FR: "Concu en pensant au bien-etre de votre chat, il est doux et respectueux des animaux.",
    ZH: "采用天然成分制成，对您的猫咪完全安全。",
    ES: "Disenado pensando en el bienestar de tu gato, es suave y completamente amigable con las mascotas."
  },
  LONG_LASTING: {
    EN: "A single sprinkle keeps your home odor-free for days. Enjoy continuous freshness without constant upkeep.",
    FR: "Une seule application garde votre maison sans odeur pendant des jours. Profitez d'une fraicheur continue sans entretien constant.",
    ZH: "提供长达7天的持续清新效果。",
    ES: "Una sola aplicacion mantiene tu hogar sin olores por dias. Disfruta de frescura continua sin mantenimiento constante."
  }
} as const;

// Helper function to get localized description
export const getLocalizedDescription = (
  descriptionKey: keyof typeof COMMON_DESCRIPTIONS,
  locale: 'EN' | 'FR' | 'ZH' | 'ES'
): string => {
  return COMMON_DESCRIPTIONS[descriptionKey][locale];
};

export const getLocalizedFeature = (
  featureKey: keyof typeof FEATURE_DESCRIPTIONS,
  locale: 'EN' | 'FR' | 'ZH' | 'ES'
): string => {
  return FEATURE_DESCRIPTIONS[featureKey][locale];
};
