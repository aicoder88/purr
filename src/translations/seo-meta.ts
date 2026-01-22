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

export interface PageMeta {
  title: string;
  description: string;
  targetKeyword?: string;
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
    faq: PageMeta;
    safety: PageMeta;
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
  };
}

// English SEO Meta
export const seoMetaEn: SEOMetaContent = {
  homepage: {
    title: 'Stop Cat Litter Smell Instantly - Activated Carbon 2026',
    description: 'Eliminate 99% of cat litter odor in 30 seconds with water-filter grade activated carbon. No perfumes, 100% natural. Free trial - just pay $4.76 shipping!',
    targetKeyword: 'cat litter smell'
  },

  products: {
    trial: {
      title: 'FREE Cat Litter Deodorizer Trial - Pay Shipping',
      description: 'Try our activated carbon cat litter additive FREE! Eliminates ammonia smell instantly. Just $4.76 shipping to USA & Canada. 10,000+ happy customers.',
      targetKeyword: 'cat litter deodorizer'
    },
    standard: {
      title: 'Best Cat Litter Odor Eliminator - 50g Standard Pack',
      description: 'Stop litter box smell for 30 days. Water-filter grade activated carbon neutralizes ammonia instantly. No perfumes, 99% effective. Ships free to Canada.',
      targetKeyword: 'cat litter odor eliminator'
    },
    family: {
      title: 'Multi-Cat Litter Deodorizer - 120g Family Pack 2026',
      description: 'Eliminate odor from 2-3 cats for 60+ days. Activated carbon removes ammonia smell instantly. Free shipping, guaranteed results or money back.',
      targetKeyword: 'multi-cat litter deodorizer'
    }
  },

  learn: {
    howItWorks: {
      title: 'How Activated Carbon Eliminates Cat Litter Odor Fast',
      description: 'Discover how water-filter grade activated carbon neutralizes ammonia in 30 seconds. See the science behind 99% odor elimination. Try it free today!',
      targetKeyword: 'activated carbon cat litter'
    },
    activatedCarbonBenefits: {
      title: 'Activated Carbon Cat Litter Benefits [2026 Guide]',
      description: '7+ proven benefits of activated carbon for cat litter odor control. Eliminates 99% of ammonia, lasts 30 days, 100% natural. Learn more now.',
      targetKeyword: 'activated carbon benefits'
    },
    faq: {
      title: 'Cat Litter Odor Control FAQ - Your Questions Answered',
      description: 'Get answers to common questions about activated carbon cat litter additive. Safety, usage, effectiveness, and more. 10,000+ customers trust Purrify.',
      targetKeyword: 'cat litter odor control'
    },
    safety: {
      title: 'Is Activated Carbon Safe for Cats? [Vet-Approved]',
      description: '100% food-grade coconut shell activated carbon. Non-toxic, dust-free, pet-friendly. Used in water filters & air purifiers. Safe for cats & kittens.',
      targetKeyword: 'activated carbon safe for cats'
    }
  },

  blog: {
    mostPowerfulOdorAbsorber: {
      title: 'Most Powerful Cat Litter Odor Absorber [Tested 12]',
      description: 'We tested 12 odor eliminators. Only 1 removed smell in 30 seconds. See which activated carbon product beat baking soda by 52%. Try it free!',
      targetKeyword: 'most powerful odor absorber'
    },
    activatedCarbonVsBakingSoda: {
      title: 'Activated Carbon vs Baking Soda: Which Kills Odor?',
      description: '7-day test results: Activated carbon eliminated 99% of odor vs 47% for baking soda. See the shocking difference in our lab test. Get free trial!',
      targetKeyword: 'activated carbon vs baking soda'
    },
    bestLitterOdorRemoverSmallApartments: {
      title: 'Best Litter Odor Remover Small Apartments [500 sq ft]',
      description: 'Tested in 500 sq ft apartment: activated carbon eliminates smell in 30 seconds, lasts 30 days. Perfect for condos & small spaces. Ships free!',
      targetKeyword: 'litter odor remover small apartments'
    },
    catLitterSmellWorseSummer: {
      title: 'Why Cat Litter Smells Worse in Summer [+ Fix 2026]',
      description: 'Heat increases ammonia evaporation by 3x. Activated carbon neutralizes summer odor instantly. Stop the seasonal smell spike. Get your free trial!',
      targetKeyword: 'cat litter smell worse summer'
    },
    activatedCarbonCatLitter: {
      title: 'Activated Carbon Cat Litter: Complete Guide 2026',
      description: 'Everything about activated carbon for cat litter odor. How it works, benefits, safety, usage tips. 99% effective, 100% natural. Try it free today!',
      targetKeyword: 'activated carbon cat litter'
    },
    ecoFriendlyCatLitter: {
      title: 'Eco-Friendly Cat Litter Guide: Best Sustainable 2026',
      description: 'Compare eco-friendly cat litter options. Coconut shell activated carbon is 100% natural, biodegradable, reusable. Eliminate odor sustainably!',
      targetKeyword: 'eco-friendly cat litter'
    },
    wholesaleCatLitter: {
      title: 'Wholesale Cat Litter Deodorizer: Complete Buyer Guide',
      description: 'Wholesale pricing on activated carbon cat litter additive. Perfect for pet stores, groomers, shelters. Proven 99% odor elimination. Contact us!',
      targetKeyword: 'wholesale cat litter'
    },
    catLitterOdorControl: {
      title: 'Ultimate Cat Litter Odor Control Guide [2026]',
      description: 'Master cat litter odor control with activated carbon. Eliminate 99% of ammonia smell, maintain freshness 30+ days. Free trial - just pay shipping!',
      targetKeyword: 'cat litter odor control'
    },
    smallApartmentCatCare: {
      title: 'Small Apartment Cat Care: Complete Guide 2026',
      description: 'Essential tips for cats in small apartments. Odor control, space-saving litter boxes, ventilation. Activated carbon eliminates smell instantly!',
      targetKeyword: 'small apartment cat care'
    },
    naturalCatLitterAdditive: {
      title: 'Natural Cat Litter Additive: 100% Coconut Carbon',
      description: 'Stop litter box smell with 100% natural coconut shell activated carbon. No chemicals, no perfumes, no toxins. 99% effective odor elimination!',
      targetKeyword: 'natural cat litter additive'
    }
  }
};

// French SEO Meta
export const seoMetaFr: SEOMetaContent = {
  homepage: {
    title: 'Éliminer Odeur Litière Chat Instantanément - Charbon 2026',
    description: 'Éliminez 99% des odeurs de litière en 30 secondes avec charbon actif. Naturel à 100%, sans parfums. Essai gratuit - seulement 4,76$ livraison!',
    targetKeyword: 'odeur litière chat'
  },

  products: {
    trial: {
      title: 'Désodorisant Litière Chat GRATUIT - Payez Livraison',
      description: 'Essayez notre additif charbon actif GRATUIT! Élimine l\'ammoniaque instantanément. Seulement 4,76$ livraison Canada. 10 000+ clients satisfaits.',
      targetKeyword: 'désodorisant litière chat'
    },
    standard: {
      title: 'Meilleur Éliminateur Odeur Litière - Pack 50g Standard',
      description: 'Stop aux odeurs pendant 30 jours. Charbon actif qualité filtre à eau neutralise l\'ammoniaque. Sans parfums, efficace à 99%. Livraison gratuite!',
      targetKeyword: 'éliminateur odeur litière'
    },
    family: {
      title: 'Désodorisant Multi-Chats - Pack Familial 120g 2026',
      description: 'Éliminez odeurs de 2-3 chats pendant 60+ jours. Charbon actif élimine l\'ammoniaque instantanément. Livraison gratuite, satisfait ou remboursé.',
      targetKeyword: 'désodorisant multi-chats'
    }
  },

  learn: {
    howItWorks: {
      title: 'Comment Charbon Actif Élimine Odeur Litière Rapidement',
      description: 'Découvrez comment charbon actif neutralise l\'ammoniaque en 30 secondes. La science derrière 99% d\'élimination des odeurs. Essai gratuit!',
      targetKeyword: 'charbon actif litière chat'
    },
    activatedCarbonBenefits: {
      title: 'Avantages Charbon Actif Litière Chat [Guide 2026]',
      description: '7+ avantages prouvés du charbon actif pour contrôle odeurs. Élimine 99% ammoniaque, dure 30 jours, 100% naturel. En savoir plus maintenant.',
      targetKeyword: 'avantages charbon actif'
    },
    faq: {
      title: 'FAQ Contrôle Odeur Litière - Vos Questions Répondues',
      description: 'Réponses aux questions sur additif charbon actif. Sécurité, utilisation, efficacité et plus. 10 000+ clients font confiance à Purrify.',
      targetKeyword: 'contrôle odeur litière'
    },
    safety: {
      title: 'Charbon Actif Sans Danger Pour Chats? [Approuvé Vétérinaire]',
      description: 'Charbon actif coque de coco 100% alimentaire. Non-toxique, sans poussière, sûr pour animaux. Utilisé filtres à eau & purificateurs d\'air.',
      targetKeyword: 'charbon actif sans danger chats'
    }
  },

  blog: {
    mostPowerfulOdorAbsorber: {
      title: 'Absorbeur Odeur Litière Le Plus Puissant [Testé 12]',
      description: 'Nous avons testé 12 éliminateurs. 1 seul a éliminé l\'odeur en 30 secondes. Voir quel charbon actif bat bicarbonate de 52%. Essai gratuit!',
      targetKeyword: 'absorbeur odeur le plus puissant'
    },
    activatedCarbonVsBakingSoda: {
      title: 'Charbon Actif vs Bicarbonate: Lequel Tue Odeur?',
      description: 'Test 7 jours: charbon actif élimine 99% odeur vs 47% bicarbonate. Voir la différence choquante dans notre test labo. Essai gratuit!',
      targetKeyword: 'charbon actif vs bicarbonate'
    },
    bestLitterOdorRemoverSmallApartments: {
      title: 'Meilleur Anti-Odeur Litière Petits Apparts [500 pi²]',
      description: 'Testé dans appart 500 pi²: charbon actif élimine odeur en 30 secondes, dure 30 jours. Parfait condos & petits espaces. Livraison gratuite!',
      targetKeyword: 'anti-odeur litière petits appartements'
    },
    catLitterSmellWorseSummer: {
      title: 'Pourquoi Litière Sent Plus Fort Été [+ Solution 2026]',
      description: 'Chaleur augmente évaporation ammoniaque 3x. Charbon actif neutralise odeur été instantanément. Stop à la puanteur saisonnière. Essai gratuit!',
      targetKeyword: 'litière sent plus fort été'
    },
    activatedCarbonCatLitter: {
      title: 'Charbon Actif Litière Chat: Guide Complet 2026',
      description: 'Tout sur charbon actif pour odeur litière. Fonctionnement, avantages, sécurité, conseils. Efficace à 99%, 100% naturel. Essayez gratuitement!',
      targetKeyword: 'charbon actif litière chat'
    },
    ecoFriendlyCatLitter: {
      title: 'Litière Chat Écologique: Meilleure Durable 2026',
      description: 'Comparez options litière écologique. Charbon actif coco 100% naturel, biodégradable, réutilisable. Éliminez odeurs durablement!',
      targetKeyword: 'litière chat écologique'
    },
    wholesaleCatLitter: {
      title: 'Désodorisant Litière Gros: Guide Acheteur Complet',
      description: 'Prix de gros sur additif charbon actif litière chat. Parfait animaleries, toiletteurs, refuges. Élimination odeur prouvée 99%. Contactez-nous!',
      targetKeyword: 'litière gros'
    },
    catLitterOdorControl: {
      title: 'Guide Ultime Contrôle Odeur Litière Chat [2026]',
      description: 'Maîtrisez contrôle odeur litière avec charbon actif. Éliminez 99% ammoniaque, fraîcheur 30+ jours. Essai gratuit - payez livraison seulement!',
      targetKeyword: 'contrôle odeur litière chat'
    },
    smallApartmentCatCare: {
      title: 'Soins Chat Petit Appartement: Guide Complet 2026',
      description: 'Conseils essentiels pour chats en petit appart. Contrôle odeurs, litières gain d\'espace, ventilation. Charbon actif élimine odeur!',
      targetKeyword: 'soins chat petit appartement'
    },
    naturalCatLitterAdditive: {
      title: 'Additif Litière Chat Naturel: 100% Charbon Coco',
      description: 'Stop odeur litière avec charbon actif coco 100% naturel. Sans produits chimiques, sans parfums, non-toxique. Efficace à 99%!',
      targetKeyword: 'additif litière chat naturel'
    }
  }
};

// Chinese SEO Meta (Simplified)
export const seoMetaZh: SEOMetaContent = {
  homepage: {
    title: '立即消除猫砂异味 - 活性炭 2026',
    description: '30秒内消除99%的猫砂异味，采用水过滤级活性炭。100%天然，无香料。免费试用 - 仅需支付$4.76运费！',
    targetKeyword: '猫砂异味'
  },

  products: {
    trial: {
      title: '免费猫砂除臭剂试用 - 仅付运费',
      description: '免费试用我们的活性炭猫砂添加剂！立即消除氨气味。仅需$4.76运费至美国和加拿大。10,000+满意客户。',
      targetKeyword: '猫砂除臭剂'
    },
    standard: {
      title: '最佳猫砂除臭剂 - 50克标准装',
      description: '30天内消除猫砂盆异味。水过滤级活性炭立即中和氨气。无香料，99%有效。免费配送至加拿大。',
      targetKeyword: '猫砂除臭剂'
    },
    family: {
      title: '多猫家庭除臭剂 - 120克家庭装 2026',
      description: '消除2-3只猫60+天的异味。活性炭立即去除氨气味。免费配送，满意保证或退款。',
      targetKeyword: '多猫除臭剂'
    }
  },

  learn: {
    howItWorks: {
      title: '活性炭如何快速消除猫砂异味',
      description: '了解水过滤级活性炭如何在30秒内中和氨气。查看99%除臭背后的科学原理。立即免费试用！',
      targetKeyword: '活性炭猫砂'
    },
    activatedCarbonBenefits: {
      title: '活性炭猫砂的好处 [2026指南]',
      description: '活性炭用于猫砂除臭的7+项已证实好处。消除99%氨气，持续30天，100%天然。立即了解更多。',
      targetKeyword: '活性炭好处'
    },
    faq: {
      title: '猫砂除臭常见问题 - 您的问题已解答',
      description: '获取有关活性炭猫砂添加剂的常见问题解答。安全性、使用方法、有效性等。10,000+客户信赖Purrify。',
      targetKeyword: '猫砂除臭'
    },
    safety: {
      title: '活性炭对猫安全吗？[兽医认可]',
      description: '100%食品级椰壳活性炭。无毒、无尘、宠物友好。用于水过滤器和空气净化器。对猫和小猫安全。',
      targetKeyword: '活性炭对猫安全'
    }
  },

  blog: {
    mostPowerfulOdorAbsorber: {
      title: '最强大的猫砂除臭剂 [测试12种]',
      description: '我们测试了12种除臭剂。只有1种在30秒内去除异味。看看哪种活性炭产品比小苏打强52%。免费试用！',
      targetKeyword: '最强大除臭剂'
    },
    activatedCarbonVsBakingSoda: {
      title: '活性炭对比小苏打：哪个能杀死异味？',
      description: '7天测试结果：活性炭消除99%异味 vs 小苏打47%。查看我们实验室测试中的惊人差异。获取免费试用！',
      targetKeyword: '活性炭对比小苏打'
    },
    bestLitterOdorRemoverSmallApartments: {
      title: '小公寓最佳猫砂除臭剂 [500平方英尺]',
      description: '在500平方英尺公寓中测试：活性炭在30秒内消除异味，持续30天。完美适合公寓和小空间。免费配送！',
      targetKeyword: '小公寓猫砂除臭剂'
    },
    catLitterSmellWorseSummer: {
      title: '为什么夏天猫砂更臭 [+2026解决方案]',
      description: '高温使氨气蒸发增加3倍。活性炭立即中和夏季异味。阻止季节性臭味飙升。获取免费试用！',
      targetKeyword: '夏天猫砂更臭'
    },
    activatedCarbonCatLitter: {
      title: '活性炭猫砂：2026完整指南',
      description: '关于活性炭用于猫砂除臭的一切。工作原理、好处、安全性、使用技巧。99%有效，100%天然。立即免费试用！',
      targetKeyword: '活性炭猫砂'
    },
    ecoFriendlyCatLitter: {
      title: '环保猫砂指南：最佳可持续选择 2026',
      description: '比较环保猫砂选项。椰壳活性炭100%天然、可生物降解、可重复使用。可持续地消除异味！',
      targetKeyword: '环保猫砂'
    },
    wholesaleCatLitter: {
      title: '批发猫砂除臭剂：完整买家指南',
      description: '活性炭猫砂添加剂批发价。完美适合宠物店、美容院、收容所。已证实99%除臭。联系我们！',
      targetKeyword: '批发猫砂'
    },
    catLitterOdorControl: {
      title: '终极猫砂除臭控制指南 [2026]',
      description: '使用活性炭掌握猫砂除臭控制。消除99%氨气味，保持30+天清新。免费试用 - 仅付运费！',
      targetKeyword: '猫砂除臭控制'
    },
    smallApartmentCatCare: {
      title: '小公寓养猫：2026完整指南',
      description: '小公寓养猫的基本技巧。除臭控制、节省空间的猫砂盆、通风。活性炭立即消除异味！',
      targetKeyword: '小公寓养猫'
    },
    naturalCatLitterAdditive: {
      title: '天然猫砂添加剂：100%椰子碳',
      description: '用100%天然椰壳活性炭消除猫砂盆异味。无化学品、无香料、无毒素。99%有效除臭！',
      targetKeyword: '天然猫砂添加剂'
    }
  }
};

// Spanish SEO Meta
export const seoMetaEs: SEOMetaContent = {
  homepage: {
    title: 'Eliminar Olor Arena Gatos Instantáneamente - Carbón 2026',
    description: 'Elimina el 99% del olor de arena de gatos en 30 segundos con carbón activado grado filtro de agua. 100% natural, sin perfumes. ¡Prueba gratis!',
    targetKeyword: 'olor arena gatos'
  },

  products: {
    trial: {
      title: 'Desodorante Arena Gatos GRATIS - Solo Paga Envío',
      description: '¡Prueba nuestro aditivo de carbón activado GRATIS! Elimina olor amoníaco instantáneamente. Solo $4.76 envío a USA y Canadá. 10,000+ clientes felices.',
      targetKeyword: 'desodorante arena gatos'
    },
    standard: {
      title: 'Mejor Eliminador Olor Arena Gatos - Pack 50g Estándar',
      description: 'Detén el olor de la caja de arena por 30 días. Carbón activado grado filtro neutraliza amoníaco al instante. Sin perfumes, 99% efectivo. ¡Envío gratis!',
      targetKeyword: 'eliminador olor arena gatos'
    },
    family: {
      title: 'Desodorante Multi-Gatos - Pack Familiar 120g 2026',
      description: 'Elimina olor de 2-3 gatos por 60+ días. Carbón activado elimina olor amoníaco instantáneamente. Envío gratis, garantía de satisfacción o reembolso.',
      targetKeyword: 'desodorante multi-gatos'
    }
  },

  learn: {
    howItWorks: {
      title: 'Cómo Carbón Activado Elimina Olor Arena Gatos Rápido',
      description: 'Descubre cómo carbón activado grado filtro neutraliza amoníaco en 30 segundos. Ve la ciencia detrás de 99% eliminación de olores. ¡Prueba gratis!',
      targetKeyword: 'carbón activado arena gatos'
    },
    activatedCarbonBenefits: {
      title: 'Beneficios Carbón Activado Arena Gatos [Guía 2026]',
      description: '7+ beneficios probados de carbón activado para control de olores. Elimina 99% amoníaco, dura 30 días, 100% natural. Aprende más ahora.',
      targetKeyword: 'beneficios carbón activado'
    },
    faq: {
      title: 'FAQ Control Olor Arena Gatos - Tus Preguntas Respondidas',
      description: 'Respuestas a preguntas comunes sobre aditivo carbón activado. Seguridad, uso, efectividad y más. 10,000+ clientes confían en Purrify.',
      targetKeyword: 'control olor arena gatos'
    },
    safety: {
      title: '¿Carbón Activado Seguro Para Gatos? [Aprobado Veterinario]',
      description: 'Carbón activado de cáscara de coco 100% grado alimenticio. No tóxico, sin polvo, amigable con mascotas. Usado en filtros de agua y purificadores.',
      targetKeyword: 'carbón activado seguro gatos'
    }
  },

  blog: {
    mostPowerfulOdorAbsorber: {
      title: 'Absorbedor Olor Arena Gatos Más Potente [Probados 12]',
      description: 'Probamos 12 eliminadores de olor. Solo 1 eliminó olor en 30 segundos. Ve qué carbón activado superó bicarbonato por 52%. ¡Prueba gratis!',
      targetKeyword: 'absorbedor olor más potente'
    },
    activatedCarbonVsBakingSoda: {
      title: 'Carbón Activado vs Bicarbonato: ¿Cuál Mata Olor?',
      description: 'Resultados prueba 7 días: carbón activado eliminó 99% olor vs 47% bicarbonato. Ve la diferencia impactante en nuestra prueba. ¡Prueba gratis!',
      targetKeyword: 'carbón activado vs bicarbonato'
    },
    bestLitterOdorRemoverSmallApartments: {
      title: 'Mejor Eliminador Olor Arena Apartamentos [500 pies²]',
      description: 'Probado en apartamento 500 pies²: carbón activado elimina olor en 30 segundos, dura 30 días. Perfecto para condos y espacios pequeños. ¡Envío gratis!',
      targetKeyword: 'eliminador olor arena apartamentos'
    },
    catLitterSmellWorseSummer: {
      title: 'Por Qué Arena Gatos Huele Peor en Verano [+ Fix 2026]',
      description: 'Calor aumenta evaporación amoníaco 3x. Carbón activado neutraliza olor verano instantáneamente. Detén el pico de olor estacional. ¡Prueba gratis!',
      targetKeyword: 'arena gatos huele peor verano'
    },
    activatedCarbonCatLitter: {
      title: 'Carbón Activado Arena Gatos: Guía Completa 2026',
      description: 'Todo sobre carbón activado para olor de arena. Cómo funciona, beneficios, seguridad, consejos de uso. 99% efectivo, 100% natural. ¡Prueba gratis!',
      targetKeyword: 'carbón activado arena gatos'
    },
    ecoFriendlyCatLitter: {
      title: 'Guía Arena Gatos Ecológica: Mejor Sostenible 2026',
      description: 'Compara opciones arena ecológica. Carbón activado cáscara coco 100% natural, biodegradable, reutilizable. ¡Elimina olores sosteniblemente!',
      targetKeyword: 'arena gatos ecológica'
    },
    wholesaleCatLitter: {
      title: 'Desodorante Arena Gatos Mayoreo: Guía Comprador',
      description: 'Precios mayoreo en aditivo carbón activado arena gatos. Perfecto para tiendas mascotas, estilistas, refugios. 99% eliminación olor probada. ¡Contáctanos!',
      targetKeyword: 'arena gatos mayoreo'
    },
    catLitterOdorControl: {
      title: 'Guía Definitiva Control Olor Arena Gatos [2026]',
      description: 'Domina control olor arena con carbón activado. Elimina 99% olor amoníaco, mantén frescura 30+ días. Prueba gratis - ¡solo paga envío!',
      targetKeyword: 'control olor arena gatos'
    },
    smallApartmentCatCare: {
      title: 'Cuidado Gatos Apartamento Pequeño: Guía Completa 2026',
      description: 'Consejos esenciales para gatos en apartamentos pequeños. Control olores, cajas arena que ahorran espacio, ventilación. ¡Carbón activado elimina olor!',
      targetKeyword: 'cuidado gatos apartamento pequeño'
    },
    naturalCatLitterAdditive: {
      title: 'Aditivo Arena Gatos Natural: 100% Carbón Coco',
      description: 'Detén olor caja arena con carbón activado cáscara coco 100% natural. Sin químicos, sin perfumes, no tóxico. ¡99% eliminación olor efectiva!',
      targetKeyword: 'aditivo arena gatos natural'
    }
  }
};

// Export all SEO meta content indexed by locale
export const SEO_META: Record<LocaleCode, SEOMetaContent> = {
  en: seoMetaEn,
  fr: seoMetaFr,
  zh: seoMetaZh,
  es: seoMetaEs
};

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
    return meta.learn[pageKey as keyof typeof meta.learn];
  }

  if (pageType === 'blog' && pageKey) {
    return meta.blog[pageKey as keyof typeof meta.blog];
  }

  return undefined;
}
