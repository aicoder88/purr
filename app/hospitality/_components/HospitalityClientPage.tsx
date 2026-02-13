'use client';

import Link from 'next/link';
import { useTranslation } from '@/lib/translation-context';
import {
  Building2,
  Star,
  DollarSign,
  Clock,
  CheckCircle,
  Package,
  Phone,
  Mail,
  Users,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { useCallback, useState } from 'react';
import { CONTACT_INFO, PHONE_MESSAGING } from '@/lib/constants';

export default function HospitalityClientPage() {
  const { t: tGlobal, locale } = useTranslation();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const handleFormSubmit = useCallback(() => setFormSubmitted(true), []);

  // Page content translations
  const content = {
    en: {
      pageTitle: 'Pet-Friendly Rentals Without the Smell | Purrify for Hospitality',
      pageDescription: 'Airbnb hosts & vacation rental owners: Accept pets confidently. Purrify eliminates pet odors between guests for better reviews and more bookings.',
      heroTitle: 'Pet-Friendly Rentals Without the Smell',
      heroSubtitle: 'Accept pets, charge premium fees, and never worry about lingering odors affecting your reviews',
      statBookings: 'More Bookings',
      statBookingsDesc: 'Pet-friendly listings get more reservations',
      statFragranceFreeValue: 'Fragrance-free',
      statReviews: 'No Added Fragrance',
      statReviewsDesc: 'Odor control without perfumes',
      statRevenue: 'Revenue Boost',
      statRevenueDesc: 'From pet fees and increased bookings',
      ctaPrimary: 'Order for Your Properties',
      ctaSecondary: 'Volume Pricing Inquiry',

      challengeTitle: 'The Host Challenge',
      challengeSubtitle: 'You want to accept pets for more bookings, but worry about the consequences',
      challenges: [
        {
          title: 'Fear of Pet Odors',
          description: 'Worried about lingering pet smells affecting future guests and reviews'
        },
        {
          title: 'Quick Turnaround',
          description: 'Need to eliminate odors fast between check-out and check-in'
        },
        {
          title: 'Previous Guest Issues',
          description: 'Past pet guests left odors that took days to fully remove'
        },
        {
          title: 'Review Anxiety',
          description: 'One bad review about smell can tank your listing performance'
        }
      ],

      solutionTitle: 'The Purrify Solution',
      solutionSubtitle: 'Professional-grade odor elimination designed for hospitality',
      solutions: [
        {
          title: 'Instant Odor Elimination',
          description: 'Activated carbon traps and neutralizes pet odors at the molecular level within hours, not days'
        },
        {
          title: 'Guest-Friendly Formula',
          description: 'Fragrance-free and non-toxic, suitable for guests with sensitivities or allergies'
        },
        {
          title: 'Quick Application',
          description: 'Add to your cleaning checklist. Takes 60 seconds to apply during turnover'
        },
        {
          title: 'Guaranteed Freshness',
          description: 'Your next guests will never know a pet was there. Fresh, neutral-smelling property every time'
        }
      ],

      benefitsTitle: 'Business Benefits',
      benefitsSubtitle: 'Turn pet acceptance into a competitive advantage',
      benefits: [
        {
          title: 'Charge Pet Fees with Confidence',
          description: 'Accept the $50-150 pet fees knowing you can fully eliminate any odors left behind'
        },
        {
          title: 'Better Reviews',
          description: 'Guests consistently rate properties higher when they smell fresh and clean'
        },
        {
          title: 'Competitive Advantage',
          description: 'Only 30% of rentals accept pets. Stand out and capture this underserved market'
        },
        {
          title: 'Simple to Stock & Use',
          description: 'Include Purrify in your cleaning supplies. Easy instructions for any cleaning team'
        }
      ],

      bulkTitle: 'Bulk Ordering for Property Managers',
      bulkSubtitle: 'Save more when you order for multiple properties',
      bulkFeatures: [
        'Multi-property volume discounts',
        'Automatic delivery scheduling',
        'Include in cleaning supply kits',
        'Dedicated account manager',
        'Priority support for hospitality partners'
      ],

      testimonialTitle: 'Trusted by Hospitality Professionals',
      testimonials: [
        {
          quote: 'Since adding Purrify to our pet-friendly listings, we have had zero complaints about odors. Our reviews actually improved.',
          author: 'Sarah M.',
          role: 'Airbnb Superhost, 12 properties'
        },
        {
          quote: 'The quick application time is perfect for our turnover schedule. Cleaners love how simple it is.',
          author: 'James L.',
          role: 'Property Manager, Vancouver'
        },
        {
          quote: 'We increased our bookings by 40% after accepting pets. Purrify made it risk-free.',
          author: 'Michelle K.',
          role: 'Vacation Rental Owner, Whistler'
        }
      ],

      pricingTitle: 'Volume Pricing',
      pricingSubtitle: 'Designed for property managers and hospitality businesses',
      pricingTiers: [
        {
          name: 'Starter Pack',
          properties: '1-5 properties',
          discount: '15%',
          features: ['12 units per order', 'Free shipping', 'Email support']
        },
        {
          name: 'Professional',
          properties: '6-20 properties',
          discount: '25%',
          features: ['36 units per order', 'Free shipping', 'Priority support', 'Auto-delivery options']
        },
        {
          name: 'Enterprise',
          properties: '20+ properties',
          discount: '35%',
          features: ['Custom quantities', 'Free shipping', 'Dedicated account manager', 'Custom delivery schedule', 'Bulk invoicing']
        }
      ],

      formTitle: 'Get Volume Pricing',
      formSubtitle: 'Tell us about your properties and we will create a custom quote',
      formFields: {
        name: 'Contact Name',
        email: 'Email',
        phone: 'Phone',
        company: 'Company / Property Name',
        propertyCount: 'Number of Properties',
        propertyType: 'Property Type',
        message: 'Additional Information',
        submit: 'Request Quote'
      },
      propertyTypes: [
        { value: '', label: 'Select...' },
        { value: 'airbnb', label: 'Airbnb / VRBO' },
        { value: 'vacation', label: 'Vacation Rentals' },
        { value: 'hotel', label: 'Hotel / Motel' },
        { value: 'property-mgmt', label: 'Property Management Company' },
        { value: 'other', label: 'Other' }
      ],
      propertyCounts: [
        { value: '', label: 'Select...' },
        { value: '1-5', label: '1-5 properties' },
        { value: '6-20', label: '6-20 properties' },
        { value: '21-50', label: '21-50 properties' },
        { value: '50+', label: '50+ properties' }
      ],
      formSuccess: 'Quote Request Received!',
      formSuccessMessage: 'Thank you! Our hospitality team will contact you within 24 hours with custom pricing for your properties.',

      contactTitle: 'Questions? We are Here to Help',
      contactSubtitle: 'Our hospitality specialists understand the unique needs of rental property owners',
      contactEmail: 'hospitality@purrify.ca',
      contactPhone: 'Call Us'
    },
    fr: {
      pageTitle: 'Locations Acceptant les Animaux Sans Odeurs | Purrify pour l\'Hospitalite',
      pageDescription: 'Hotes Airbnb et proprietaires de locations vacances: Acceptez les animaux en toute confiance. Purrify elimine les odeurs entre les invites pour de meilleurs avis.',
      heroTitle: 'Locations Acceptant les Animaux Sans Odeurs',
      heroSubtitle: 'Acceptez les animaux, facturez des frais premium, et ne vous inquietez jamais des odeurs persistantes affectant vos avis',
      statBookings: 'Plus de Reservations',
      statBookingsDesc: 'Les annonces acceptant les animaux obtiennent plus de reservations',
      statFragranceFreeValue: 'Sans parfum',
      statReviews: 'Meilleurs Avis',
      statReviewsDesc: 'Les proprietes sans odeurs recoivent de meilleures notes',
      statRevenue: 'Augmentation des Revenus',
      statRevenueDesc: 'Grace aux frais pour animaux et plus de reservations',
      ctaPrimary: 'Commander pour Vos Proprietes',
      ctaSecondary: 'Demande de Prix en Volume',

      challengeTitle: 'Le Defi des Hotes',
      challengeSubtitle: 'Vous voulez accepter les animaux pour plus de reservations, mais vous craignez les consequences',
      challenges: [
        {
          title: 'Peur des Odeurs',
          description: 'Inquietude que les odeurs d\'animaux affectent les futurs invites et avis'
        },
        {
          title: 'Rotation Rapide',
          description: 'Besoin d\'eliminer les odeurs rapidement entre depart et arrivee'
        },
        {
          title: 'Problemes Passes',
          description: 'Des invites precedents avec animaux ont laisse des odeurs difficiles a enlever'
        },
        {
          title: 'Anxiete des Avis',
          description: 'Un mauvais avis sur les odeurs peut nuire a votre annonce'
        }
      ],

      solutionTitle: 'La Solution Purrify',
      solutionSubtitle: 'Elimination professionnelle des odeurs concue pour l\'hospitalite',
      solutions: [
        {
          title: 'Elimination Instantanee des Odeurs',
          description: 'Le charbon actif piege et neutralise les odeurs au niveau moleculaire en quelques heures'
        },
        {
          title: 'Formule Adaptee aux Invites',
          description: 'Sans parfum et non toxique, convient aux invites avec sensibilites ou allergies'
        },
        {
          title: 'Application Rapide',
          description: 'Ajoutez a votre liste de nettoyage. 60 secondes pour appliquer pendant la rotation'
        },
        {
          title: 'Fraicheur Garantie',
          description: 'Vos prochains invites ne sauront jamais qu\'un animal etait la. Propriete fraiche a chaque fois'
        }
      ],

      benefitsTitle: 'Avantages Commerciaux',
      benefitsSubtitle: 'Transformez l\'acceptation des animaux en avantage concurrentiel',
      benefits: [
        {
          title: 'Facturez des Frais pour Animaux en Confiance',
          description: 'Acceptez les frais de 50-150$ sachant que vous pouvez eliminer toutes les odeurs'
        },
        {
          title: 'Meilleurs Avis',
          description: 'Les invites notent mieux les proprietes qui sentent frais et propre'
        },
        {
          title: 'Avantage Concurrentiel',
          description: 'Seulement 30% des locations acceptent les animaux. Demarquez-vous et capturez ce marche'
        },
        {
          title: 'Simple a Stocker et Utiliser',
          description: 'Incluez Purrify dans vos fournitures de nettoyage. Instructions faciles pour toute equipe'
        }
      ],

      bulkTitle: 'Commandes en Gros pour Gestionnaires',
      bulkSubtitle: 'Economisez plus en commandant pour plusieurs proprietes',
      bulkFeatures: [
        'Rabais de volume multi-proprietes',
        'Livraisons automatiques programmees',
        'Inclure dans les kits de nettoyage',
        'Gestionnaire de compte dedie',
        'Support prioritaire pour partenaires hospitalite'
      ],

      testimonialTitle: 'Approuve par les Professionnels de l\'Hospitalite',
      testimonials: [
        {
          quote: 'Depuis que nous utilisons Purrify dans nos annonces acceptant les animaux, nous n\'avons eu aucune plainte d\'odeurs. Nos avis se sont ameliores.',
          author: 'Sarah M.',
          role: 'Superhote Airbnb, 12 proprietes'
        },
        {
          quote: 'Le temps d\'application rapide est parfait pour notre calendrier de rotation. Les nettoyeurs adorent sa simplicite.',
          author: 'James L.',
          role: 'Gestionnaire de Proprietes, Vancouver'
        },
        {
          quote: 'Nous avons augmente nos reservations de 40% apres avoir accepte les animaux. Purrify a elimine le risque.',
          author: 'Michelle K.',
          role: 'Proprietaire Location Vacances, Whistler'
        }
      ],

      pricingTitle: 'Prix en Volume',
      pricingSubtitle: 'Concu pour les gestionnaires de proprietes et entreprises d\'hospitalite',
      pricingTiers: [
        {
          name: 'Pack Demarrage',
          properties: '1-5 proprietes',
          discount: '15%',
          features: ['12 unites par commande', 'Livraison gratuite', 'Support par courriel']
        },
        {
          name: 'Professionnel',
          properties: '6-20 proprietes',
          discount: '25%',
          features: ['36 unites par commande', 'Livraison gratuite', 'Support prioritaire', 'Options de livraison auto']
        },
        {
          name: 'Entreprise',
          properties: '20+ proprietes',
          discount: '35%',
          features: ['Quantites personnalisees', 'Livraison gratuite', 'Gestionnaire de compte dedie', 'Calendrier de livraison personnalise', 'Facturation en gros']
        }
      ],

      formTitle: 'Obtenir les Prix en Volume',
      formSubtitle: 'Parlez-nous de vos proprietes et nous vous ferons un devis personnalise',
      formFields: {
        name: 'Nom du Contact',
        email: 'Courriel',
        phone: 'Telephone',
        company: 'Entreprise / Nom de Propriete',
        propertyCount: 'Nombre de Proprietes',
        propertyType: 'Type de Propriete',
        message: 'Informations Supplementaires',
        submit: 'Demander un Devis'
      },
      propertyTypes: [
        { value: '', label: 'Selectionner...' },
        { value: 'airbnb', label: 'Airbnb / VRBO' },
        { value: 'vacation', label: 'Locations Vacances' },
        { value: 'hotel', label: 'Hotel / Motel' },
        { value: 'property-mgmt', label: 'Societe de Gestion Immobiliere' },
        { value: 'other', label: 'Autre' }
      ],
      propertyCounts: [
        { value: '', label: 'Selectionner...' },
        { value: '1-5', label: '1-5 proprietes' },
        { value: '6-20', label: '6-20 proprietes' },
        { value: '21-50', label: '21-50 proprietes' },
        { value: '50+', label: '50+ proprietes' }
      ],
      formSuccess: 'Demande de Devis Recue!',
      formSuccessMessage: 'Merci! Notre equipe hospitalite vous contactera dans les 24 heures avec un prix personnalise pour vos proprietes.',

      contactTitle: 'Questions? Nous Sommes La pour Aider',
      contactSubtitle: 'Nos specialistes hospitalite comprennent les besoins uniques des proprietaires de locations',
      contactEmail: 'hospitalite@purrify.ca',
      contactPhone: 'Appelez-Nous'
    },
    zh: {
      pageTitle: '宠物友好型租赁无异味 | Purrify酒店业解决方案',
      pageDescription: 'Airbnb房东和度假租赁业主:自信地接受宠物。Purrify消除宠物异味,获得更好的评价和更多预订。',
      heroTitle: '宠物友好型租赁无异味',
      heroSubtitle: '接受宠物,收取高额费用,再也不用担心异味影响您的评价',
      statBookings: '更多预订',
      statBookingsDesc: '宠物友好型房源获得更多预订',
      statFragranceFreeValue: '无香型',
      statReviews: '更好评价',
      statReviewsDesc: '清新的房产获得更高评分',
      statRevenue: '收入增长',
      statRevenueDesc: '来自宠物费和增加的预订',
      ctaPrimary: '为您的房产订购',
      ctaSecondary: '批量价格咨询',

      challengeTitle: '房东面临的挑战',
      challengeSubtitle: '您想接受宠物以获得更多预订,但担心后果',
      challenges: [
        {
          title: '担心宠物异味',
          description: '担心残留的宠物气味会影响未来客人和评价'
        },
        {
          title: '快速周转',
          description: '需要在退房和入住之间快速消除异味'
        },
        {
          title: '过去的问题',
          description: '以前带宠物的客人留下了难以去除的气味'
        },
        {
          title: '评价焦虑',
          description: '一条关于气味的差评可能会影响您的房源表现'
        }
      ],

      solutionTitle: 'Purrify解决方案',
      solutionSubtitle: '专为酒店业设计的专业级除味产品',
      solutions: [
        {
          title: '即时消除异味',
          description: '活性炭在分子水平上捕获并中和宠物异味,数小时内见效'
        },
        {
          title: '客人友好配方',
          description: '无香料、无毒,适合敏感或过敏的客人'
        },
        {
          title: '快速应用',
          description: '添加到您的清洁清单中。周转期间60秒即可完成'
        },
        {
          title: '保证清新',
          description: '您的下一位客人不会知道有宠物来过。每次都是清新无味的房产'
        }
      ],

      benefitsTitle: '商业优势',
      benefitsSubtitle: '将接受宠物转化为竞争优势',
      benefits: [
        {
          title: '自信收取宠物费',
          description: '接受50-150美元的宠物费,因为您知道可以完全消除任何残留气味'
        },
        {
          title: '更好的评价',
          description: '当房产闻起来清新干净时,客人会给予更高的评分'
        },
        {
          title: '竞争优势',
          description: '只有30%的租赁接受宠物。脱颖而出,占领这个未被充分服务的市场'
        },
        {
          title: '易于存储和使用',
          description: '将Purrify包含在您的清洁用品中。任何清洁团队都能轻松操作'
        }
      ],

      bulkTitle: '物业经理批量订购',
      bulkSubtitle: '多物业订购享受更多优惠',
      bulkFeatures: [
        '多物业批量折扣',
        '自动配送计划',
        '包含在清洁用品套装中',
        '专属客户经理',
        '酒店业合作伙伴优先支持'
      ],

      testimonialTitle: '酒店业专业人士信赖',
      testimonials: [
        {
          quote: '自从在我们的宠物友好型房源中添加Purrify后,我们没有收到任何关于气味的投诉。我们的评价实际上提高了。',
          author: 'Sarah M.',
          role: 'Airbnb超级房东,12处房产'
        },
        {
          quote: '快速的应用时间非常适合我们的周转时间表。清洁人员喜欢它的简单性。',
          author: 'James L.',
          role: '物业经理,温哥华'
        },
        {
          quote: '接受宠物后,我们的预订量增加了40%。Purrify使其零风险。',
          author: 'Michelle K.',
          role: '度假租赁业主,惠斯勒'
        }
      ],

      pricingTitle: '批量价格',
      pricingSubtitle: '专为物业经理和酒店业企业设计',
      pricingTiers: [
        {
          name: '入门套装',
          properties: '1-5处房产',
          discount: '15%',
          features: ['每次12件', '免费配送', '邮件支持']
        },
        {
          name: '专业版',
          properties: '6-20处房产',
          discount: '25%',
          features: ['每次36件', '免费配送', '优先支持', '自动配送选项']
        },
        {
          name: '企业版',
          properties: '20+处房产',
          discount: '35%',
          features: ['定制数量', '免费配送', '专属客户经理', '定制配送计划', '批量开票']
        }
      ],

      formTitle: '获取批量价格',
      formSubtitle: '告诉我们您的房产情况,我们将为您提供定制报价',
      formFields: {
        name: '联系人姓名',
        email: '邮箱',
        phone: '电话',
        company: '公司/房产名称',
        propertyCount: '房产数量',
        propertyType: '房产类型',
        message: '其他信息',
        submit: '请求报价'
      },
      propertyTypes: [
        { value: '', label: '请选择...' },
        { value: 'airbnb', label: 'Airbnb / VRBO' },
        { value: 'vacation', label: '度假租赁' },
        { value: 'hotel', label: '酒店/汽车旅馆' },
        { value: 'property-mgmt', label: '物业管理公司' },
        { value: 'other', label: '其他' }
      ],
      propertyCounts: [
        { value: '', label: '请选择...' },
        { value: '1-5', label: '1-5处房产' },
        { value: '6-20', label: '6-20处房产' },
        { value: '21-50', label: '21-50处房产' },
        { value: '50+', label: '50+处房产' }
      ],
      formSuccess: '报价请求已收到!',
      formSuccessMessage: '感谢您!我们的酒店业团队将在24小时内联系您,为您的房产提供定制价格。',

      contactTitle: '有问题?我们随时为您服务',
      contactSubtitle: '我们的酒店业专家了解租赁物业业主的独特需求',
      contactEmail: 'hospitality@purrify.ca',
      contactPhone: '致电我们'
    }
  };

  const t = content[locale as keyof typeof content] || content.en;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 bg-white dark:bg-gray-900 min-h-screen">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Building2 className="h-4 w-4" />
            {locale === 'fr' ? 'Solution Hospitalite' : locale === 'zh' ? '酒店业解决方案' : 'Hospitality Solution'}
          </div>
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            {t.heroTitle}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
            {t.heroSubtitle}
          </p>

          {/* Stats */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-6 mb-8">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-amber-600 dark:text-amber-400 mb-2">+60%</div>
                <div className="text-sm font-semibold text-gray-800 dark:text-gray-200">{t.statBookings}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">{t.statBookingsDesc}</div>
	              </div>
	              <div>
	                <div className="text-3xl font-bold text-amber-600 dark:text-amber-400 mb-2">{t.statFragranceFreeValue}</div>
	                <div className="text-sm font-semibold text-gray-800 dark:text-gray-200">{t.statReviews}</div>
	                <div className="text-xs text-gray-600 dark:text-gray-400">{t.statReviewsDesc}</div>
	              </div>
              <div>
                <div className="text-3xl font-bold text-amber-600 dark:text-amber-400 mb-2">+35%</div>
                <div className="text-sm font-semibold text-gray-800 dark:text-gray-200">{t.statRevenue}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">{t.statRevenueDesc}</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#volume-form"
              className="inline-block bg-amber-600 dark:bg-amber-600 text-white dark:text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-amber-700 dark:hover:bg-amber-500 transition-colors"
            >
              {t.ctaPrimary}
            </Link>
            <Link
              href="#pricing"
              className="inline-block border border-amber-600 dark:border-amber-400 text-amber-600 dark:text-amber-400 bg-white dark:bg-gray-800 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors"
            >
              {t.ctaSecondary}
            </Link>
          </div>
        </div>
      </section>

      {/* Challenge Section */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {t.challengeTitle}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t.challengeSubtitle}
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.challenges.map((challenge, index) => (
            <div key={index} className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/40 rounded-full flex items-center justify-center mx-auto mb-4">
                {index === 0 && <Sparkles className="h-6 w-6 text-red-600 dark:text-red-400" />}
                {index === 1 && <Clock className="h-6 w-6 text-red-600 dark:text-red-400" />}
                {index === 2 && <Users className="h-6 w-6 text-red-600 dark:text-red-400" />}
                {index === 3 && <Star className="h-6 w-6 text-red-600 dark:text-red-400" />}
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                {challenge.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {challenge.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Solution Section */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {t.solutionTitle}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t.solutionSubtitle}
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {t.solutions.map((solution, index) => (
            <div key={index} className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {solution.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {solution.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="mb-16 bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {t.benefitsTitle}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t.benefitsSubtitle}
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {t.benefits.map((benefit, index) => (
            <div key={index} className="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  {index === 0 && <DollarSign className="h-8 w-8 text-amber-600 dark:text-amber-400" />}
                  {index === 1 && <Star className="h-8 w-8 text-amber-600 dark:text-amber-400" />}
                  {index === 2 && <TrendingUp className="h-8 w-8 text-amber-600 dark:text-amber-400" />}
                  {index === 3 && <Package className="h-8 w-8 text-amber-600 dark:text-amber-400" />}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bulk Ordering Section */}
      <section className="mb-16">
        <div className="bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-700 dark:to-orange-700 rounded-lg p-8 text-white dark:text-gray-100">
          <div className="max-w-3xl mx-auto text-center">
            <Package className="h-12 w-12 mx-auto mb-4" />
            <h2 className="font-heading text-3xl font-bold mb-4">
              {t.bulkTitle}
            </h2>
            <p className="text-lg text-amber-100 dark:text-amber-200 mb-8">
              {t.bulkSubtitle}
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
              {t.bulkFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="mb-16">
        <h2 className="font-heading text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
          {t.testimonialTitle}
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {t.testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 dark:text-yellow-300 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 italic mb-4">
                “{testimonial.quote}”
              </p>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <p className="font-semibold text-gray-900 dark:text-white">{testimonial.author}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="mb-16">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {t.pricingTitle}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t.pricingSubtitle}
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {t.pricingTiers.map((tier, index) => (
            <div key={index} className={`rounded-lg p-8 ${
              index === 1
                ? 'bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-300 dark:border-amber-600 shadow-lg'
                : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm'
            }`}>
              {index === 1 && (
                <div className="text-center mb-4">
                  <span className="bg-amber-600 dark:bg-amber-600 text-white dark:text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {locale === 'fr' ? 'Plus Populaire' : locale === 'zh' ? '最受欢迎' : 'Most Popular'}
                  </span>
                </div>
              )}
              <div className="text-center mb-6">
                <h3 className="font-heading text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {tier.name}
                </h3>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {tier.properties}
                </div>
                <div className="text-4xl font-bold text-amber-600 dark:text-amber-400 mb-2">
                  {tier.discount}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {locale === 'fr' ? 'de reduction' : locale === 'zh' ? '折扣' : 'off retail'}
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400 flex-shrink-0" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="#volume-form"
                className={`block w-full text-center py-3 rounded-lg font-semibold transition-colors ${
                  index === 1
                    ? 'bg-amber-600 dark:bg-amber-600 text-white dark:text-white hover:bg-amber-700 dark:hover:bg-amber-500'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {t.formFields.submit}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="volume-form" className="mb-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="font-heading text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {t.formTitle}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {t.formSubtitle}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 shadow-sm">
            {!formSubmitted ? (
              <form className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t.formFields.name} *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t.formFields.email} *
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t.formFields.phone}
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t.formFields.company} *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t.formFields.propertyType} *
                  </label>
                  <select
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 focus:border-transparent"
                  >
                    {t.propertyTypes.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t.formFields.propertyCount} *
                  </label>
                  <select
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 focus:border-transparent"
                  >
                    {t.propertyCounts.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t.formFields.message}
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 focus:border-transparent"
                  />
                </div>
                <div className="md:col-span-2">
                  <button
                    type="button"
                    onClick={handleFormSubmit}
                    className="w-full bg-amber-600 dark:bg-amber-600 text-white dark:text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-amber-700 dark:hover:bg-amber-500 transition-colors"
                  >
                    {t.formFields.submit}
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-12">
                <CheckCircle className="h-16 w-16 text-green-500 dark:text-green-400 mx-auto mb-4" />
                <h3 className="font-heading text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {t.formSuccess}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {tGlobal.forms?.success?.hospitalityContact || t.formSuccessMessage}
                </p>
                <div className="space-y-4">
                  <div className="space-x-4">
                    <a
                      href={`mailto:${t.contactEmail}`}
                      className="inline-flex items-center gap-2 text-amber-600 dark:text-amber-400 hover:underline"
                    >
                      <Mail className="h-4 w-4" />
                      {t.contactEmail}
                    </a>
                    <a
                      href={CONTACT_INFO.phoneHref}
                      className="inline-flex items-center gap-2 text-amber-600 dark:text-amber-400 hover:underline"
                    >
                      <Phone className="h-4 w-4" />
                      {PHONE_MESSAGING.callout}
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="text-center bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
        <h2 className="font-heading text-2xl font-bold text-gray-900 dark:text-white mb-4">
          {t.contactTitle}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          {t.contactSubtitle}
        </p>
        <div className="grid md:grid-cols-2 gap-6 max-w-xl mx-auto">
          <div className="text-center">
            <Mail className="h-8 w-8 text-amber-600 dark:text-amber-400 mx-auto mb-3" />
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              {locale === 'fr' ? 'Courriel' : locale === 'zh' ? '邮箱' : 'Email'}
            </h4>
            <a href={`mailto:${t.contactEmail}`} className="text-amber-600 dark:text-amber-400 hover:underline">
              {t.contactEmail}
            </a>
          </div>
          <div className="text-center">
            <Phone className="h-8 w-8 text-amber-600 dark:text-amber-400 mx-auto mb-3" />
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              {t.contactPhone}
            </h4>
            <a href={CONTACT_INFO.phoneHref} className="text-amber-600 dark:text-amber-400 hover:underline font-bold">
              {PHONE_MESSAGING.callout}
            </a>
            <p className="text-xs text-gray-600 dark:text-gray-400 italic mt-2">
              {PHONE_MESSAGING.explanation}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
