export type FreshnessPlanLocale = 'en' | 'fr';
export type FreshnessRiskLevel = 'low' | 'moderate' | 'high' | 'severe';

export interface FreshnessPlanCopy {
  title: string;
  starterNote: string;
  summaryByRisk: Record<FreshnessRiskLevel, string>;
  applicationTitle: string;
  applicationIntro: string;
  applicationByRisk: Record<FreshnessRiskLevel, string>;
  scoopingTitle: string;
  scoopingOnce: string;
  scoopingTwice: string;
  scoopingThree: string;
  resetTitle: string;
  resetByRisk: Record<FreshnessRiskLevel, string>;
  placementTitle: string;
  placementTight: string;
  placementOpen: string;
  placementUtility: string;
  remedyTitle: string;
  remedyMasking: string;
  remedyBakingSoda: string;
  remedyNothing: string;
  remedyMaintenance: string;
  reorderTitle: string;
  reorderByProduct: {
    trial: string;
    regular: string;
    family: string;
    bulk: string;
  };
  adjustmentTitle: string;
  adjustmentBody: string;
}

const COPY: Record<FreshnessPlanLocale, FreshnessPlanCopy> = {
  en: {
    title: 'Your Personalized Freshness Plan',
    starterNote:
      'Use this as a starting rhythm, then tighten one step sooner if odor returns before schedule.',
    summaryByRisk: {
      low: 'Your setup should respond to a simple weekly control routine.',
      moderate: 'You need a consistent weekly routine with a mid-cycle check.',
      high: 'Your setup needs scheduled odor control, not reactive masking.',
      severe: 'Treat this as a load-management problem: tighter cadence and higher coverage.',
    },
    applicationTitle: 'Application rhythm',
    applicationIntro: 'Start with a light, even sprinkle after each full litter reset.',
    applicationByRisk: {
      low: 'Reapply about every 7 days, or sooner if the box starts to turn before cleaning day.',
      moderate: 'Reapply every 5 to 7 days and keep a mid-week top-up ready for humid or busy weeks.',
      high: 'Reapply every 3 to 5 days so odor never has time to build into the room.',
      severe: 'Use smaller top-ups 2 to 3 times per week instead of waiting for one heavy rescue application.',
    },
    scoopingTitle: 'Scooping rhythm',
    scoopingOnce: 'Scoop at least once daily to keep ammonia from stacking up.',
    scoopingTwice: 'Scoop morning and evening so odor load does not sit in the box all day.',
    scoopingThree: 'For heavy-load setups, check the box three times daily until the room stabilizes.',
    resetTitle: 'Full litter reset',
    resetByRisk: {
      low: 'A full reset every 10 to 14 days is a reasonable starting point for most stable setups.',
      moderate: 'Aim for a full reset every 7 to 10 days unless your litter reaches odor saturation earlier.',
      high: 'Plan for a full reset every 5 to 7 days while you bring the odor load back under control.',
      severe: 'Start with a full reset every 3 to 5 days, then stretch only after odor stays stable.',
    },
    placementTitle: 'Placement fix',
    placementTight:
      'Closed closets and tight corners trap odor concentration. If possible, keep the box uncovered and improve airflow.',
    placementOpen:
      'Even in open rooms, odor builds fast when it sits between scoops. Keep air moving and stay on schedule.',
    placementUtility:
      'Bathrooms and utility spaces can still hold humid odor pockets. Focus on airflow and consistent cadence.',
    remedyTitle: 'What to stop relying on',
    remedyMasking:
      'Scented litter and air fresheners can hide the problem briefly, but they do not remove the core odor molecules.',
    remedyBakingSoda:
      'Baking soda can help at first, but it saturates quickly. Treat it as secondary support, not the main fix.',
    remedyNothing:
      'The biggest gain now is consistency: fixed Purrify cadence plus daily scooping.',
    remedyMaintenance:
      'Frequent full changes help, but the bigger win is preventing odor spikes between those changes.',
    reorderTitle: 'Next stock checkpoint',
    reorderByProduct: {
      trial: 'If the trial improves the room, plan your next order within 7 to 10 days so you do not lose momentum.',
      regular: 'Check stock around week 3 and reorder before the last quarter of the bag.',
      family: 'Check stock around week 6 so you can reorder before the high-odor weeks catch up.',
      bulk: 'Check stock around week 8 and keep reserve inventory for multi-box or multi-cat homes.',
    },
    adjustmentTitle: 'Adjustment rule',
    adjustmentBody:
      'If odor returns early, move the cadence up one step before you change litter brands or add more fragranced products.',
  },
  fr: {
    title: 'Votre Plan Fraicheur Personnalise',
    starterNote:
      'Utilisez ce rythme comme point de depart, puis resserrez d un niveau si l odeur revient trop tot.',
    summaryByRisk: {
      low: 'Votre configuration devrait bien reagir a une routine hebdomadaire simple.',
      moderate: 'Vous avez besoin d une routine hebdomadaire constante avec une verification au milieu du cycle.',
      high: 'Votre configuration demande un controle planifie, pas une reaction de derniere minute.',
      severe: 'Traitez cela comme un probleme de charge: cadence plus serree et couverture plus forte.',
    },
    applicationTitle: 'Rythme d application',
    applicationIntro: 'Commencez par une couche legere et uniforme apres chaque reset complet de litiere.',
    applicationByRisk: {
      low: 'Reappliquez environ tous les 7 jours, ou plus tot si l odeur revient avant le nettoyage.',
      moderate: 'Reappliquez tous les 5 a 7 jours et gardez une recharge au milieu de la semaine si besoin.',
      high: 'Reappliquez tous les 3 a 5 jours pour empecher l odeur de s installer dans la piece.',
      severe: 'Faites 2 a 3 petites recharges par semaine au lieu d attendre une seule grosse application de secours.',
    },
    scoopingTitle: 'Rythme de ramassage',
    scoopingOnce: 'Ramassez au moins une fois par jour pour limiter l accumulation d ammoniac.',
    scoopingTwice: 'Ramassez matin et soir pour eviter que la charge d odeur reste toute la journee.',
    scoopingThree: 'Dans les configurations chargees, verifiez trois fois par jour jusqu a stabilisation.',
    resetTitle: 'Reset complet de litiere',
    resetByRisk: {
      low: 'Un reset complet tous les 10 a 14 jours est un bon point de depart pour une configuration stable.',
      moderate: 'Visez un reset complet tous les 7 a 10 jours, sauf si la litiere sature plus tot.',
      high: 'Planifiez un reset complet tous les 5 a 7 jours pendant la phase de reprise du controle.',
      severe: 'Commencez avec un reset complet tous les 3 a 5 jours, puis allongez seulement si l odeur reste stable.',
    },
    placementTitle: 'Correction de placement',
    placementTight:
      'Les placards fermes et coins serres concentrent les odeurs. Si possible, gardez le bac ouvert et augmentez l airflow.',
    placementOpen:
      'Meme dans un espace ouvert, l odeur monte vite si elle reste entre deux ramassages. Gardez de la circulation d air.',
    placementUtility:
      'Les salles de bain et espaces utilitaires peuvent garder des poches d humidite odorante. Priorisez airflow et regularite.',
    remedyTitle: 'Ce qu il faut cesser de surestimer',
    remedyMasking:
      'Les litieres parfumees et desodorisants masquent parfois l odeur, mais n eliminent pas les molecules responsables.',
    remedyBakingSoda:
      'Le bicarbonate peut aider au debut, mais il seature vite. Utilisez-le en soutien, pas comme solution principale.',
    remedyNothing:
      'Le plus grand gain vient maintenant de la constance: cadence fixe de Purrify et ramassage quotidien.',
    remedyMaintenance:
      'Les changements complets frequents aident, mais le vrai gain est d eviter les pics entre deux resets.',
    reorderTitle: 'Prochain point de verif stock',
    reorderByProduct: {
      trial: 'Si le format essai ameliore la piece, prevoyez la prochaine commande dans 7 a 10 jours pour garder l elan.',
      regular: 'Verifiez votre stock vers la semaine 3 et recommandez avant d entrer dans le dernier quart du sac.',
      family: 'Verifiez votre stock vers la semaine 6 pour recommander avant le retour des semaines fortes en odeur.',
      bulk: 'Verifiez votre stock vers la semaine 8 et gardez une reserve pour les foyers multi-bacs ou multi-chats.',
    },
    adjustmentTitle: 'Regle d ajustement',
    adjustmentBody:
      'Si l odeur revient trop tot, resserrez la cadence d un niveau avant de changer de litiere ou d ajouter des parfums.',
  },
};

export function getFreshnessPlanCopy(locale: FreshnessPlanLocale): FreshnessPlanCopy {
  return COPY[locale];
}
