'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, ChevronRight, Home, Mail, RotateCcw, Share2, Sparkles } from 'lucide-react';
import { useLocale } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { PRODUCTS } from '@/lib/constants';
import { localizePath } from '@/lib/i18n/locale-path';

type Language = 'en' | 'fr';
type QuestionId = 'q1' | 'q2' | 'q3' | 'q4' | 'q5';
type RiskLevel = 'low' | 'moderate' | 'high' | 'severe';

type Option = {
  id: string;
  label: string;
  emoji: string;
  weight: number;
};

type Question = {
  id: QuestionId;
  title: string;
  options: Option[];
};

type Answers = Partial<Record<QuestionId, string>>;

type ToolCopy = {
  breadcrumbAria: string;
  home: string;
  pageName: string;
  heroBadge: string;
  heroTitle: string;
  heroDescription: string;
  startQuiz: string;
  introFootnote: string;
  stepLabel: string;
  next: string;
  back: string;
  finish: string;
  scoreLabel: string;
  riskLabel: string;
  recommendationTitle: string;
  whyThisSize: string;
  cta: string;
  ctaTrial: string;
  retake: string;
  share: string;
  shareCopied: string;
  shareTitle: string;
  shareTextPrefix: string;
  shareTextSuffix: string;
  causesTitle: string;
  causesLead: string;
  causeAmmonia: string;
  causeAirflowTight: string;
  causeAirflowOpen: string;
  causeBakingSoda: string;
  causeMasking: string;
  causeMaintenance: string;
  learningTitle: string;
  learningDescription: string;
  readArticle: string;
  emailTitle: string;
  emailDescription: string;
  emailPlaceholder: string;
  emailSubmit: string;
  emailSuccess: string;
  emailError: string;
  emailInvalid: string;
  riskText: Record<RiskLevel, string>;
  riskDescription: Record<RiskLevel, string>;
  whySize: Record<RiskLevel, string>;
  questions: Question[];
};

const COPY: Record<Language, ToolCopy> = {
  en: {
    breadcrumbAria: 'Breadcrumb',
    home: 'Home',
    pageName: 'Smell Quiz',
    heroBadge: '2-minute interactive tool',
    heroTitle: 'Find Your Cat Litter Smell Risk Score',
    heroDescription:
      'Answer 5 quick questions to pinpoint what is driving odor in your setup and get a practical recommendation.',
    startQuiz: 'Start Quiz',
    introFootnote: 'No signup required to get your result.',
    stepLabel: 'Question',
    next: 'Next',
    back: 'Back',
    finish: 'See Results',
    scoreLabel: 'Smell Risk Score',
    riskLabel: 'Risk Level',
    recommendationTitle: 'Recommended Product',
    whyThisSize: 'Why this size',
    cta: 'Shop Recommended Size',
    ctaTrial: 'Try Trial Size',
    retake: 'Retake Quiz',
    share: 'Share Results',
    shareCopied: 'Link copied',
    shareTitle: 'My Cat Litter Smell Quiz Result',
    shareTextPrefix: 'I scored',
    shareTextSuffix: 'on the Purrify Smell Quiz.',
    causesTitle: 'What is likely causing the smell?',
    causesLead: 'Based on your answers, these are the strongest odor drivers in your setup:',
    causeAmmonia: 'Most litter-box odor comes from ammonia released as urine breaks down over time.',
    causeAirflowTight: 'Small or enclosed locations trap odor concentration and make ammonia spikes feel stronger.',
    causeAirflowOpen: 'Even in open areas, odor can build quickly when odor molecules are not being captured.',
    causeBakingSoda: 'Baking soda can help briefly, but it saturates quickly and does not trap ammonia for long.',
    causeMasking: 'Scented litter and air fresheners often mask odor without removing the root molecules.',
    causeMaintenance: 'Frequent full changes lower odor peaks, but they do not solve between-cleaning buildup.',
    learningTitle: 'Learn what to fix next',
    learningDescription: 'These blog guides match your answers and explain root causes, tradeoffs, and proven fixes.',
    readArticle: 'Read article',
    emailTitle: 'Want your result sent to your inbox?',
    emailDescription: 'Optional: send your score and recommendation by email.',
    emailPlaceholder: 'Enter your email',
    emailSubmit: 'Send My Result',
    emailSuccess: 'Sent. Check your inbox.',
    emailError: 'Could not submit right now. Please try again.',
    emailInvalid: 'Please enter a valid email address.',
    riskText: {
      low: 'Low',
      moderate: 'Moderate',
      high: 'High',
      severe: 'Severe',
    },
    riskDescription: {
      low: 'Your setup is fairly controlled. You likely notice odor mostly around cleaning time.',
      moderate: 'Some odor pressure is building. Targeted odor control should noticeably improve day-to-day comfort.',
      high: 'Your environment has consistent odor triggers. A stronger routine and larger support size is recommended.',
      severe: 'You are in a high-load odor scenario. Go with maximum coverage to stabilize odor quickly.',
    },
    whySize: {
      low: 'A starter size is usually enough to validate odor improvement with minimal commitment.',
      moderate: 'A regular size gives enough volume for consistent weekly use in typical homes.',
      high: 'A larger bag supports heavier odor load from multi-cat or high-impact setups.',
      severe: 'Maximum size helps maintain reliable coverage where odor accumulates quickly.',
    },
    questions: [
      {
        id: 'q1',
        title: 'How many cats share the litter setup?',
        options: [
          { id: 'q1-1', label: '1 cat', emoji: '🐱', weight: 1 },
          { id: 'q1-2', label: '2 cats', emoji: '🐱🐱', weight: 3 },
          { id: 'q1-3', label: '3 cats', emoji: '🐱🐱🐱', weight: 5 },
          { id: 'q1-4', label: '4+ cats', emoji: '🐱✨', weight: 7 },
        ],
      },
      {
        id: 'q2',
        title: 'What litter type do you use most?',
        options: [
          { id: 'q2-1', label: 'Clumping clay', emoji: '🪨', weight: 2 },
          { id: 'q2-2', label: 'Non-clumping', emoji: '🧺', weight: 4 },
          { id: 'q2-3', label: 'Silica crystal', emoji: '💎', weight: 1 },
          { id: 'q2-4', label: 'Natural litter', emoji: '🌿', weight: 3 },
          { id: 'q2-6', label: 'Odor-control litter', emoji: '🧪', weight: 2 },
          { id: 'q2-5', label: 'Other', emoji: '📦', weight: 3 },
        ],
      },
      {
        id: 'q3',
        title: 'Where is your litter box located?',
        options: [
          { id: 'q3-1', label: 'Bathroom', emoji: '🛁', weight: 1 },
          { id: 'q3-2', label: 'Basement / laundry', emoji: '🧺', weight: 2 },
          { id: 'q3-3', label: 'Bedroom / living area', emoji: '🛋️', weight: 4 },
          { id: 'q3-4', label: 'Small apartment', emoji: '🏢', weight: 5 },
          { id: 'q3-5', label: 'Enclosed closet', emoji: '🚪', weight: 5 },
        ],
      },
      {
        id: 'q4',
        title: 'How strong is odor right now?',
        options: [
          { id: 'q4-1', label: 'I barely notice it', emoji: '🙂', weight: 1 },
          { id: 'q4-2', label: 'Noticeable after a day', emoji: '😐', weight: 3 },
          { id: 'q4-3', label: 'Hits when I walk in', emoji: '😣', weight: 5 },
          { id: 'q4-4', label: 'Constant smell', emoji: '😷', weight: 7 },
        ],
      },
      {
        id: 'q5',
        title: 'What are you currently using for odor control?',
        options: [
          { id: 'q5-1', label: 'Nothing yet', emoji: '❌', weight: 4 },
          { id: 'q5-2', label: 'Scented litter', emoji: '🌸', weight: 2 },
          { id: 'q5-3', label: 'Air fresheners', emoji: '🌬️', weight: 3 },
          { id: 'q5-4', label: 'Baking soda', emoji: '🥄', weight: 2 },
          { id: 'q5-5', label: 'Frequent full changes', emoji: '🗓️', weight: 1 },
        ],
      },
    ],
  },
  fr: {
    breadcrumbAria: 'Fil d Ariane',
    home: 'Accueil',
    pageName: 'Quiz Odeur',
    heroBadge: 'Outil interactif de 2 minutes',
    heroTitle: 'Trouvez votre score de risque d odeur',
    heroDescription:
      'Repondez a 5 questions rapides pour comprendre ce qui cause les odeurs et obtenir une recommandation adaptee.',
    startQuiz: 'Commencer le quiz',
    introFootnote: 'Aucune inscription requise pour voir votre resultat.',
    stepLabel: 'Question',
    next: 'Suivant',
    back: 'Retour',
    finish: 'Voir les resultats',
    scoreLabel: 'Score de risque d odeur',
    riskLabel: 'Niveau de risque',
    recommendationTitle: 'Produit recommande',
    whyThisSize: 'Pourquoi cette taille',
    cta: 'Voir la taille recommandee',
    ctaTrial: 'Essayer le format essai',
    retake: 'Refaire le quiz',
    share: 'Partager le resultat',
    shareCopied: 'Lien copie',
    shareTitle: 'Mon resultat du Quiz Odeur Purrify',
    shareTextPrefix: 'J ai obtenu',
    shareTextSuffix: 'au Quiz Odeur Purrify.',
    causesTitle: 'Qu est-ce qui cause probablement l odeur?',
    causesLead: 'Selon vos reponses, voici les facteurs les plus probables:',
    causeAmmonia: 'La plupart des odeurs de litiere viennent de l ammoniac libere quand l urine se decompose.',
    causeAirflowTight: 'Les petits espaces ou zones fermees concentrent les odeurs et amplifient les pics d ammoniac.',
    causeAirflowOpen: 'Meme avec plus de ventilation, les odeurs montent vite si les molecules ne sont pas captees.',
    causeBakingSoda: 'Le bicarbonate peut aider un peu, mais il seature vite et ne capte pas longtemps l ammoniac.',
    causeMasking: 'Les produits parfumes et sprays masquent souvent l odeur sans enlever la cause.',
    causeMaintenance: 'Les changements frequents reduisent les pics, mais pas l accumulation entre nettoyages.',
    learningTitle: 'Guides a lire ensuite',
    learningDescription: 'Ces articles correspondent a vos reponses et expliquent causes, limites et solutions efficaces.',
    readArticle: 'Lire l article',
    emailTitle: 'Recevoir le resultat par courriel?',
    emailDescription: 'Optionnel: envoyez votre score et votre recommandation par courriel.',
    emailPlaceholder: 'Entrez votre courriel',
    emailSubmit: 'Envoyer mon resultat',
    emailSuccess: 'Envoye. Verifiez votre boite.',
    emailError: 'Envoi impossible pour le moment. Reessayez.',
    emailInvalid: 'Veuillez entrer une adresse courriel valide.',
    riskText: {
      low: 'Faible',
      moderate: 'Modere',
      high: 'Eleve',
      severe: 'Severe',
    },
    riskDescription: {
      low: 'Votre configuration est assez stable. Les odeurs apparaissent surtout avant le nettoyage.',
      moderate: 'La pression d odeur augmente. Un controle cible devrait ameliorer nettement le confort quotidien.',
      high: 'Votre environnement a des facteurs d odeur frequents. Une approche plus forte est recommandee.',
      severe: 'Scenario de forte charge d odeur. Choisissez une couverture maximale pour stabiliser rapidement.',
    },
    whySize: {
      low: 'Un format d essai suffit souvent pour valider l amelioration sans engagement important.',
      moderate: 'Un format regulier offre assez de volume pour une utilisation hebdomadaire constante.',
      high: 'Un plus grand format soutient une charge d odeur plus elevee dans les foyers occupes.',
      severe: 'Le format maximal aide a maintenir une couverture fiable quand l odeur s accumule vite.',
    },
    questions: [
      {
        id: 'q1',
        title: 'Combien de chats partagent la litiere?',
        options: [
          { id: 'q1-1', label: '1 chat', emoji: '🐱', weight: 1 },
          { id: 'q1-2', label: '2 chats', emoji: '🐱🐱', weight: 3 },
          { id: 'q1-3', label: '3 chats', emoji: '🐱🐱🐱', weight: 5 },
          { id: 'q1-4', label: '4+ chats', emoji: '🐱✨', weight: 7 },
        ],
      },
      {
        id: 'q2',
        title: 'Quel type de litiere utilisez-vous surtout?',
        options: [
          { id: 'q2-1', label: 'Argile agglomerante', emoji: '🪨', weight: 2 },
          { id: 'q2-2', label: 'Non agglomerante', emoji: '🧺', weight: 4 },
          { id: 'q2-3', label: 'Cristaux de silice', emoji: '💎', weight: 1 },
          { id: 'q2-4', label: 'Litiere naturelle', emoji: '🌿', weight: 3 },
          { id: 'q2-6', label: 'Litiere anti-odeur', emoji: '🧪', weight: 2 },
          { id: 'q2-5', label: 'Autre', emoji: '📦', weight: 3 },
        ],
      },
      {
        id: 'q3',
        title: 'Ou se trouve le bac a litiere?',
        options: [
          { id: 'q3-1', label: 'Salle de bain', emoji: '🛁', weight: 1 },
          { id: 'q3-2', label: 'Sous-sol / buanderie', emoji: '🧺', weight: 2 },
          { id: 'q3-3', label: 'Chambre / salon', emoji: '🛋️', weight: 4 },
          { id: 'q3-4', label: 'Petit appartement', emoji: '🏢', weight: 5 },
          { id: 'q3-5', label: 'Placard ferme', emoji: '🚪', weight: 5 },
        ],
      },
      {
        id: 'q4',
        title: 'Quelle est l intensite actuelle de l odeur?',
        options: [
          { id: 'q4-1', label: 'Je la remarque a peine', emoji: '🙂', weight: 1 },
          { id: 'q4-2', label: 'Notable apres un jour', emoji: '😐', weight: 3 },
          { id: 'q4-3', label: 'Frappe en entrant', emoji: '😣', weight: 5 },
          { id: 'q4-4', label: 'Odeur constante', emoji: '😷', weight: 7 },
        ],
      },
      {
        id: 'q5',
        title: 'Que faites-vous actuellement contre les odeurs?',
        options: [
          { id: 'q5-1', label: 'Rien pour l instant', emoji: '❌', weight: 4 },
          { id: 'q5-2', label: 'Litiere parfumee', emoji: '🌸', weight: 2 },
          { id: 'q5-3', label: 'Desodorisants', emoji: '🌬️', weight: 3 },
          { id: 'q5-4', label: 'Bicarbonate', emoji: '🥄', weight: 2 },
          { id: 'q5-5', label: 'Changements frequents', emoji: '🗓️', weight: 1 },
        ],
      },
    ],
  },
};

const QUESTION_IDS: QuestionId[] = ['q1', 'q2', 'q3', 'q4', 'q5'];
const MAX_SCORE = 27;

type LearningArticleId =
  | 'odor-science'
  | 'ammonia'
  | 'baking-soda'
  | 'apartment'
  | 'multi-cat'
  | 'odor-control-litter';

type LearningArticle = {
  id: LearningArticleId;
  title: string;
  excerpt: string;
  link: string;
};

const LEARNING_ARTICLES: Record<LearningArticleId, LearningArticle> = {
  'odor-science': {
    id: 'odor-science',
    title: "Why Does My Cat's Litter Box Smell So Bad? The Science Behind the Stink",
    excerpt:
      'Understand why litter odor builds up and why molecule-level control beats simple masking.',
    link: '/blog/why-does-my-cats-litter-box-smell-so-bad',
  },
  ammonia: {
    id: 'ammonia',
    title: 'How to Neutralize Ammonia in Cat Litter: 5 Proven Methods',
    excerpt:
      'Learn exactly what causes ammonia smell and what actually neutralizes it.',
    link: '/blog/how-to-neutralize-ammonia-cat-litter',
  },
  'baking-soda': {
    id: 'baking-soda',
    title: 'Activated Carbon vs Baking Soda: The Ultimate Comparison',
    excerpt:
      'See when baking soda helps, where it fails, and why performance drops quickly.',
    link: '/blog/activated-carbon-vs-baking-soda-comparison',
  },
  apartment: {
    id: 'apartment',
    title: 'How to Get Rid of Cat Litter Smell in Apartment (Complete Guide)',
    excerpt:
      'Small-space strategy: placement, airflow, and maintenance that actually reduce odor.',
    link: '/blog/how-to-get-rid-of-cat-litter-smell-in-apartment',
  },
  'multi-cat': {
    id: 'multi-cat',
    title: 'Best Cat Litter for Multiple Cats: The Multi-Cat Odor Control Guide (2026)',
    excerpt:
      'Why multi-cat homes need a different odor-control strategy and how to scale it.',
    link: '/blog/best-cat-litter-multiple-cats-odor-control',
  },
  'odor-control-litter': {
    id: 'odor-control-litter',
    title: 'Top 10 Best Cat Litters for Odor Control (2026 Guide)',
    excerpt:
      'Compare clumping, crystal, natural, and hybrid litters for real odor performance.',
    link: '/blog/best-cat-litter-odor-control-2026',
  },
};

type QuizResult = {
  total: number;
  score: number;
  risk: RiskLevel;
  productId: 'purrify-12g' | 'purrify-50g' | 'purrify-120g' | 'purrify-240g';
  productHref: string;
};

function calculateResult(questions: Question[], answers: Answers): QuizResult {
  const total = questions.reduce((sum, question) => {
    const selectedId = answers[question.id];
    if (!selectedId) {
      return sum;
    }

    const selectedOption = question.options.find((option) => option.id === selectedId);
    return sum + (selectedOption?.weight ?? 0);
  }, 0);

  const score = Math.round((total / MAX_SCORE) * 100);

  if (score <= 30) {
    return { total, score, risk: 'low', productId: 'purrify-12g', productHref: '/products/trial-size' };
  }
  if (score <= 50) {
    return { total, score, risk: 'moderate', productId: 'purrify-50g', productHref: '/products' };
  }
  if (score <= 75) {
    return { total, score, risk: 'high', productId: 'purrify-120g', productHref: '/products' };
  }
  return { total, score, risk: 'severe', productId: 'purrify-240g', productHref: '/products' };
}

function encodeAnswers(answers: Answers): string {
  return btoa(JSON.stringify(answers));
}

function decodeAnswers(
  encoded: string,
  questions: Question[]
): Answers | null {
  try {
    const raw = atob(encoded);
    const parsed = JSON.parse(raw) as Answers;

    const allValid = QUESTION_IDS.every((questionId) => {
      const selectedId = parsed[questionId];
      if (!selectedId) {
        return false;
      }

      const question = questions.find((entry) => entry.id === questionId);
      return Boolean(question?.options.some((option) => option.id === selectedId));
    });

    return allValid ? parsed : null;
  } catch {
    return null;
  }
}

function buildCauseInsights(answers: Answers, copy: ToolCopy): string[] {
  const insights = [copy.causeAmmonia];

  if (answers.q3 === 'q3-4' || answers.q3 === 'q3-5') {
    insights.push(copy.causeAirflowTight);
  } else {
    insights.push(copy.causeAirflowOpen);
  }

  if (answers.q5 === 'q5-4') {
    insights.push(copy.causeBakingSoda);
  } else if (answers.q5 === 'q5-2' || answers.q5 === 'q5-3') {
    insights.push(copy.causeMasking);
  } else {
    insights.push(copy.causeMaintenance);
  }

  return insights;
}

function selectLearningArticles(answers: Answers): LearningArticle[] {
  const orderedIds: LearningArticleId[] = ['odor-science', 'ammonia'];

  if (answers.q5 === 'q5-4') {
    orderedIds.push('baking-soda');
  }

  if (answers.q1 === 'q1-3' || answers.q1 === 'q1-4') {
    orderedIds.push('multi-cat');
  } else if (answers.q3 === 'q3-3' || answers.q3 === 'q3-4' || answers.q3 === 'q3-5') {
    orderedIds.push('apartment');
  }

  if (answers.q2 === 'q2-6' || answers.q2 === 'q2-5') {
    orderedIds.push('odor-control-litter');
  }

  if (!orderedIds.includes('odor-control-litter')) {
    orderedIds.push('odor-control-litter');
  }

  return Array.from(new Set(orderedIds)).slice(0, 4).map((articleId) => LEARNING_ARTICLES[articleId]);
}

export default function SmellQuizContent() {
  const locale = useLocale() as Language;
  const language: Language = locale === 'fr' ? 'fr' : 'en';
  const copy = COPY[language];
  const searchParams = useSearchParams();

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [displayScore, setDisplayScore] = useState(0);
  const [email, setEmail] = useState('');
  const [emailStatus, setEmailStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [emailMessage, setEmailMessage] = useState('');
  const [shareCopied, setShareCopied] = useState(false);

  const result = useMemo(() => calculateResult(copy.questions, answers), [answers, copy.questions]);
  const causeInsights = useMemo(() => buildCauseInsights(answers, copy), [answers, copy]);
  const learningArticles = useMemo(() => selectLearningArticles(answers), [answers]);

  const progress = useMemo(() => {
    if (currentStep <= 0) {
      return 0;
    }

    if (currentStep > copy.questions.length) {
      return 100;
    }

    return Math.round(((currentStep - 1) / copy.questions.length) * 100);
  }, [copy.questions.length, currentStep]);

  const currentQuestion = currentStep > 0 && currentStep <= copy.questions.length
    ? copy.questions[currentStep - 1]
    : null;

  useEffect(() => {
    const applySharedAnswers = () => {
      const sharedPayloadFromQuery = searchParams.get('r');
      const sharedPayloadFromHash = new URLSearchParams(window.location.hash.replace(/^#/, '')).get('r');
      const sharedPayload = sharedPayloadFromQuery ?? sharedPayloadFromHash;
      if (!sharedPayload) {
        return;
      }

      const decoded = decodeAnswers(sharedPayload, copy.questions);
      if (!decoded) {
        return;
      }

      setAnswers(decoded);
      setCurrentStep(6);
    };

    applySharedAnswers();
    window.addEventListener('hashchange', applySharedAnswers);

    return () => {
      window.removeEventListener('hashchange', applySharedAnswers);
    };
  }, [copy.questions, searchParams]);

  useEffect(() => {
    if (currentStep !== 6) {
      return;
    }

    let frameId = 0;
    const start = performance.now();
    const duration = 900;

    const tick = (timestamp: number) => {
      const elapsed = timestamp - start;
      const ratio = Math.min(elapsed / duration, 1);
      setDisplayScore(Math.round(result.score * ratio));

      if (ratio < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [currentStep, result.score]);

  const selectedProduct = PRODUCTS.find((product) => product.id === result.productId);
  const selectedPrice = selectedProduct ? `$${selectedProduct.price.toFixed(2)}` : '$0.00';
  const selectedName = selectedProduct?.name ?? 'Purrify';
  const selectedSize = selectedProduct?.size ?? '';

  const canAdvance = currentQuestion ? Boolean(answers[currentQuestion.id]) : false;

  const handleSelectOption = (questionId: QuestionId, optionId: string) => {
    setAnswers((previous) => ({ ...previous, [questionId]: optionId }));
    setEmailStatus('idle');
    setEmailMessage('');

    if (currentStep < copy.questions.length) {
      setCurrentStep((previous) => previous + 1);
      return;
    }

    setCurrentStep(6);
  };

  const handleSubmitEmail = async () => {
    if (!email.includes('@')) {
      setEmailStatus('error');
      setEmailMessage(copy.emailInvalid);
      return;
    }

    setEmailStatus('loading');
    setEmailMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Smell Quiz Result',
          email,
          message: `Quiz score: ${result.score}/100 (${result.risk}). Recommended: ${selectedName} (${selectedSize}) at ${selectedPrice}.`,
        }),
      });

      const data = (await response.json().catch(() => null)) as { message?: string } | null;
      if (!response.ok) {
        throw new Error(data?.message || copy.emailError);
      }

      setEmailStatus('success');
      setEmailMessage(copy.emailSuccess);
      setEmail('');
    } catch (error) {
      setEmailStatus('error');
      if (error instanceof Error && error.message && error.message !== 'Failed to fetch') {
        setEmailMessage(error.message);
      } else {
        setEmailMessage(copy.emailError);
      }
    }
  };

  const handleShare = async () => {
    const encoded = encodeAnswers(answers);
    const shareUrl = `${window.location.origin}${localizePath('/tools/smell-quiz', language)}#r=${encodeURIComponent(encoded)}`;
    const text = `${copy.shareTextPrefix} ${result.score}/100 ${copy.shareTextSuffix}`;

    if (navigator.share) {
      try {
        await navigator.share({ title: copy.shareTitle, text, url: shareUrl });
        return;
      } catch {
        // ignore cancel
      }
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 1800);
    } catch {
      setShareCopied(false);
    }
  };

  const resetQuiz = () => {
    setAnswers({});
    setCurrentStep(0);
    setDisplayScore(0);
    setEmailStatus('idle');
    setEmailMessage('');
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-950 font-sans selection:bg-green-200 dark:selection:bg-green-900">
      <div className="border-b border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-900">
        <Container>
          <nav
            aria-label={copy.breadcrumbAria}
            className="py-3 flex items-center text-sm text-gray-600 dark:text-gray-400"
          >
            <Link
              href={localizePath('/', language)}
              className="flex items-center hover:text-green-600 dark:hover:text-green-400 transition-colors"
            >
              <Home className="w-4 h-4 mr-1" />
              {copy.home}
            </Link>
            <ChevronRight className="w-4 h-4 mx-2 opacity-50" />
            <span className="text-gray-900 dark:text-gray-100 font-medium">{copy.pageName}</span>
          </nav>
        </Container>
      </div>

      <section className="relative overflow-hidden bg-gradient-to-b from-green-50/60 via-gray-50 to-gray-50 dark:from-green-950/20 dark:via-gray-950 dark:to-gray-950 py-16 md:py-24">
        <div className="absolute top-0 inset-x-0 h-[420px] bg-gradient-to-b from-green-100/50 dark:from-green-900/10 pointer-events-none rounded-b-[96px] blur-3xl opacity-60" />
        <div className="absolute -top-16 -right-16 w-80 h-80 bg-green-300/25 dark:bg-green-700/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-40 -left-20 w-64 h-64 bg-emerald-300/20 dark:bg-emerald-700/20 rounded-full blur-[80px] pointer-events-none" />

        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-10">
            <p className="inline-flex px-4 py-1 rounded-full bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 text-sm font-semibold border border-green-200 dark:border-green-800">
              {copy.heroBadge}
            </p>
            <h1 className="mt-5 text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">
              {copy.heroTitle}
            </h1>
            <p className="mt-5 text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
              {copy.heroDescription}
            </p>
          </div>

          <div className="max-w-5xl mx-auto rounded-3xl border border-gray-200 dark:border-gray-800 bg-gray-100/70 dark:bg-gray-900/60 backdrop-blur-xl shadow-2xl shadow-gray-200/60 dark:shadow-black/40 overflow-hidden">
            <div className="px-6 md:px-10 pt-6 md:pt-8 pb-4 border-b border-gray-200 dark:border-gray-800">
              <div
                role="progressbar"
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
                className="h-2 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden"
              >
                <div
                  className="h-full bg-gradient-to-r from-green-500 via-yellow-400 to-red-500 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-400" aria-live="polite">
                {currentStep > 0 && currentStep <= copy.questions.length
                  ? `${copy.stepLabel} ${currentStep} / ${copy.questions.length}`
                  : currentStep === 6
                    ? `${copy.stepLabel} ${copy.questions.length} / ${copy.questions.length}`
                    : `${copy.stepLabel} 0 / ${copy.questions.length}`}
              </p>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              {currentStep === 0 && (
                <motion.div
                  key="intro"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.28 }}
                  className="px-6 md:px-10 py-12 text-center"
                >
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-green-100 dark:bg-green-900/40 border border-green-200 dark:border-green-800 flex items-center justify-center mb-6">
                    <Sparkles className="w-7 h-7 text-green-600 dark:text-green-400" />
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                    {copy.heroDescription}
                  </p>
                  <Button
                    onClick={() => setCurrentStep(1)}
                    className="h-12 px-7 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-gray-50 dark:text-gray-900 border-none"
                  >
                    {copy.startQuiz}
                  </Button>
                  <p className="mt-4 text-sm text-gray-500 dark:text-gray-500">{copy.introFootnote}</p>
                </motion.div>
              )}

              {currentQuestion && (
                <motion.div
                  key={currentQuestion.id}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.28 }}
                  className="px-6 md:px-10 py-8 md:py-10"
                >
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
                    {currentQuestion.title}
                  </h2>

                  <div className="grid md:grid-cols-2 gap-4">
                    {currentQuestion.options.map((option) => {
                      const isSelected = answers[currentQuestion.id] === option.id;
                      return (
                        <button
                          key={option.id}
                          type="button"
                          aria-pressed={isSelected}
                          onClick={() => handleSelectOption(currentQuestion.id, option.id)}
                          className={`text-left rounded-2xl border p-4 md:p-5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 ${
                            isSelected
                              ? 'border-green-500 bg-green-50 dark:border-green-500 dark:bg-green-900/20 ring-2 ring-green-500/40'
                              : 'border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 hover:border-green-300 dark:hover:border-green-700'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <span aria-hidden="true" className="text-2xl leading-none">
                              {option.emoji}
                            </span>
                            <div className="min-w-0">
                              <p className="font-semibold text-gray-900 dark:text-gray-100">{option.label}</p>
                            </div>
                            {isSelected && <Check className="w-5 h-5 text-green-600 dark:text-green-400 ml-auto" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-8 flex items-center justify-between gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
                      className="border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                    >
                      {copy.back}
                    </Button>
                    <Button
                      onClick={() => {
                        if (!canAdvance) {
                          return;
                        }
                        if (currentStep === copy.questions.length) {
                          setCurrentStep(6);
                          return;
                        }
                        setCurrentStep((prev) => prev + 1);
                      }}
                      disabled={!canAdvance}
                      className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-gray-50 dark:text-gray-900 border-none"
                    >
                      {currentStep === copy.questions.length ? copy.finish : copy.next}
                    </Button>
                  </div>
                </motion.div>
              )}

              {currentStep === 6 && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.28 }}
                  className="px-6 md:px-10 py-8 md:py-10 space-y-8"
                >
                  <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-900 p-5 md:p-6">
                    <div className="flex flex-wrap items-end justify-between gap-6 mb-5">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide font-semibold">
                          {copy.scoreLabel}
                        </p>
                        <p className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-gray-100 mt-2">
                          {displayScore}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide font-semibold">
                          {copy.riskLabel}
                        </p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-2">
                          {copy.riskText[result.risk]}
                        </p>
                      </div>
                    </div>

                    <div className="h-3 rounded-full overflow-hidden bg-gradient-to-r from-green-500 via-yellow-400 via-50% to-red-500 relative">
                      <div
                        className="absolute top-1/2 w-5 h-5 rounded-full border-2 border-gray-100 dark:border-gray-900 bg-gray-900 dark:bg-gray-100 shadow"
                        style={{
                          left: `clamp(10px, ${result.score}%, calc(100% - 10px))`,
                          transform: 'translate(-50%, -50%)',
                        }}
                        aria-hidden="true"
                      />
                    </div>

                    <p className="mt-5 text-gray-700 dark:text-gray-300">{copy.riskDescription[result.risk]}</p>
                  </div>

                  <div className="rounded-2xl border border-green-200 dark:border-green-800 bg-green-50/70 dark:bg-green-900/15 p-5 md:p-6">
                    <p className="text-sm uppercase tracking-wide font-semibold text-green-700 dark:text-green-400 mb-2">
                      {copy.recommendationTitle}
                    </p>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{selectedName}</h3>
                    <p className="text-gray-700 dark:text-gray-300 mt-1">{selectedSize} • {selectedPrice}</p>
                    <p className="mt-4 text-gray-700 dark:text-gray-300">
                      <span className="font-semibold text-gray-900 dark:text-gray-100">{copy.whyThisSize}: </span>
                      {copy.whySize[result.risk]}
                    </p>
                    <div className="mt-6 flex flex-col sm:flex-row gap-3">
                      <Link href={localizePath(result.productHref, language)}>
                        <Button className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-gray-50 dark:text-gray-900 border-none">
                          {result.risk === 'low' ? copy.ctaTrial : copy.cta}
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        onClick={handleShare}
                        className="border-green-300 dark:border-green-700 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                      >
                        <Share2 className="w-4 h-4 mr-2" />
                        {shareCopied ? copy.shareCopied : copy.share}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={resetQuiz}
                        className="border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                      >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        {copy.retake}
                      </Button>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-900 p-5 md:p-6">
                    <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                      {copy.causesTitle}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{copy.causesLead}</p>
                    <ul className="space-y-3">
                      {causeInsights.map((insight) => (
                        <li key={insight} className="flex items-start gap-3">
                          <span className="mt-1 h-2.5 w-2.5 rounded-full bg-green-600 dark:bg-green-500 flex-shrink-0" />
                          <p className="text-gray-700 dark:text-gray-300">{insight}</p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-900 p-5 md:p-6">
                    <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                      {copy.learningTitle}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 mb-5">{copy.learningDescription}</p>
                    <div className="grid md:grid-cols-2 gap-4">
                      {learningArticles.map((article) => (
                        <article
                          key={article.link}
                          className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 p-4"
                        >
                          <h5 className="text-base font-semibold text-gray-900 dark:text-gray-100 leading-snug">
                            {article.title}
                          </h5>
                          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                            {article.excerpt}
                          </p>
                          <Link
                            href={localizePath(article.link, language)}
                            className="mt-3 inline-flex text-sm font-semibold text-green-700 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 transition-colors"
                          >
                            {copy.readArticle}
                          </Link>
                        </article>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-900 p-5 md:p-6">
                    <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                      <Mail className="w-5 h-5 text-green-600 dark:text-green-400" />
                      {copy.emailTitle}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">{copy.emailDescription}</p>
                    <form
                      className="mt-4 flex flex-col sm:flex-row gap-3"
                      onSubmit={(event) => {
                        event.preventDefault();
                        void handleSubmitEmail();
                      }}
                    >
                      <label htmlFor="quiz-email" className="sr-only">
                        {copy.emailPlaceholder}
                      </label>
                      <input
                        id="quiz-email"
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder={copy.emailPlaceholder}
                        className="h-11 px-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
                      />
                      <Button
                        type="submit"
                        loading={emailStatus === 'loading'}
                        disabled={emailStatus === 'loading'}
                        className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-gray-50 dark:text-gray-900 border-none"
                      >
                        {copy.emailSubmit}
                      </Button>
                    </form>
                    {emailMessage && (
                      <p
                        className={`mt-3 text-sm ${
                          emailStatus === 'success'
                            ? 'text-green-700 dark:text-green-400'
                            : 'text-red-600 dark:text-red-400'
                        }`}
                      >
                        {emailMessage}
                      </p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Container>
      </section>
    </div>
  );
}
