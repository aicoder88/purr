import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const EN_JSON_PATH = resolve(__dirname, '../src/i18n/messages/en.json');
const FR_JSON_PATH = resolve(__dirname, '../src/i18n/messages/fr.json');

// Fix en.json
const enJson = JSON.parse(readFileSync(EN_JSON_PATH, 'utf-8'));

// 1. Add sectionHeaderHighlights as a joined string (for substring matching)
if (!enJson.sectionHeaderHighlights) {
  enJson.sectionHeaderHighlights = "7 Days of Fresh Air Guaranteed,Fresh Air in 60 Seconds - Simple as 1-2-3";
}

// 2. Add nav sub-object under howItWorks for the component that uses useTranslations('howItWorks')
if (!enJson.howItWorks.nav) {
  enJson.howItWorks.nav = {};
}
if (!enJson.howItWorks.nav.carbonVsBakingSoda) {
  enJson.howItWorks.nav = {
    ...enJson.howItWorks.nav,
    carbonVsBakingSoda: enJson.nav?.carbonVsBakingSoda || "Carbon vs Baking Soda",
    carbonVsBakingSodaDesc: enJson.nav?.carbonVsBakingSodaDesc || "See the science behind why activated carbon outperforms baking soda for litter box odor control."
  };
}

// 3. Add top-level results key for ResultsContent component
if (!enJson.results) {
  enJson.results = {
    title: "Real Results from Real Cat Parents",
    subtitle: "See what happens when you switch to Purrify",
    stats: {
      fragranceFreeValue: "Fragrance-free",
      fragranceFreeLabel: "No perfumes",
      worksWithAnyLitterValue: "Works with most litter",
      worksWithAnyLitterLabel: "Additive, not a litter",
      easyToUseValue: "Easy to use",
      easyToUseLabel: "Sprinkle and mix",
      scienceValue: "Science-linked",
      scienceLabel: "See citations"
    },
    howItWorks: {
      title: "How Purrify Works",
      step1: "Sprinkle Purrify on fresh litter",
      step2: "Mix gently into the top layer",
      step3: "Enjoy odor-free freshness for up to 7 days"
    },
    cta: {
      title: "Ready to Try Purrify?",
      subtitle: "Join thousands of happy cat parents",
      buttonText: "Get My Free Trial"
    }
  };
}

writeFileSync(EN_JSON_PATH, JSON.stringify(enJson, null, 2) + '\n', 'utf-8');
console.log('Fixed en.json');

// Fix fr.json
const frJson = JSON.parse(readFileSync(FR_JSON_PATH, 'utf-8'));

// 1. Add sectionHeaderHighlights
if (!frJson.sectionHeaderHighlights) {
  frJson.sectionHeaderHighlights = "7 Jours d'Air Frais Garanti,Air Frais en 60 Secondes - Simple comme 1-2-3";
}

// 2. Add nav sub-object under howItWorks
if (!frJson.howItWorks) {
  frJson.howItWorks = {};
}
if (!frJson.howItWorks.nav) {
  frJson.howItWorks.nav = {};
}
if (!frJson.howItWorks.nav.carbonVsBakingSoda) {
  frJson.howItWorks.nav = {
    ...frJson.howItWorks.nav,
    carbonVsBakingSoda: frJson.nav?.carbonVsBakingSoda || "Carbone vs Bicarbonate de Soude",
    carbonVsBakingSodaDesc: frJson.nav?.carbonVsBakingSodaDesc || "Découvrez la science derrière la supériorité du charbon actif par rapport au bicarbonate de soude pour le contrôle des odeurs de litière."
  };
}

// 3. Ensure nav.carbonVsBakingSodaDesc exists
if (frJson.nav && !frJson.nav.carbonVsBakingSodaDesc) {
  frJson.nav.carbonVsBakingSodaDesc = "Découvrez la science derrière la supériorité du charbon actif par rapport au bicarbonate de soude pour le contrôle des odeurs de litière.";
}

// 4. Add top-level results key
if (!frJson.results) {
  frJson.results = {
    title: "Des Résultats Réels de Vrais Parents de Chats",
    subtitle: "Voyez ce qui se passe lorsque vous passez à Purrify",
    stats: {
      fragranceFreeValue: "Sans parfum",
      fragranceFreeLabel: "Aucun parfum",
      worksWithAnyLitterValue: "Fonctionne avec la plupart des litières",
      worksWithAnyLitterLabel: "Additif, pas une litière",
      easyToUseValue: "Facile à utiliser",
      easyToUseLabel: "Saupoudrer et mélanger",
      scienceValue: "Basé sur la science",
      scienceLabel: "Voir les citations"
    },
    howItWorks: {
      title: "Comment Purrify Fonctionne",
      step1: "Saupoudrez Purrify sur la litière fraîche",
      step2: "Mélangez doucement dans la couche supérieure",
      step3: "Profitez d'une fraîcheur sans odeur pendant 7 jours"
    },
    cta: {
      title: "Prêt à Essayer Purrify?",
      subtitle: "Rejoignez des milliers de parents de chats heureux",
      buttonText: "Obtenir Mon Essai Gratuit"
    }
  };
}

writeFileSync(FR_JSON_PATH, JSON.stringify(frJson, null, 2) + '\n', 'utf-8');
console.log('Fixed fr.json');
