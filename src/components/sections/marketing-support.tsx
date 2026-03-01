import { Container } from '@/components/ui/container';
import { useTranslations, useLocale } from 'next-intl';

type SupportedLocale = 'en' | 'fr' | 'zh' | 'es';

const marketingSupportUiCopy: Record<SupportedLocale, {
  coopBenefits: [string, string, string];
  qualificationTitle: string;
  minimumMonthlyOrderLabel: string;
  minimumMonthlyOrderValue: string;
  partnershipDurationLabel: string;
  partnershipDurationValue: string;
  creditLimitLabel: string;
  creditLimitValue: string;
}> = {
  en: {
    coopBenefits: [
      'Up to 50% advertising cost coverage',
      'Pre-approved ad templates and copy',
      'Performance tracking and ROI analysis',
    ],
    qualificationTitle: 'Qualification Requirements',
    minimumMonthlyOrderLabel: 'Minimum Monthly Order',
    minimumMonthlyOrderValue: '48 units',
    partnershipDurationLabel: 'Partnership Duration',
    partnershipDurationValue: '6+ months',
    creditLimitLabel: 'Credit Limit',
    creditLimitValue: '$500/month',
  },
  fr: {
    coopBenefits: [
      "Jusqu'a 50% des couts publicitaires couverts",
      'Modeles publicitaires et textes pre-approuves',
      'Suivi des performances et analyse du ROI',
    ],
    qualificationTitle: "Conditions d'admissibilite",
    minimumMonthlyOrderLabel: 'Commande mensuelle minimale',
    minimumMonthlyOrderValue: '48 unites',
    partnershipDurationLabel: 'Duree du partenariat',
    partnershipDurationValue: '6+ mois',
    creditLimitLabel: 'Plafond de credit',
    creditLimitValue: '500 $/mois',
  },
  zh: {
    coopBenefits: [
      '最高可获得 50% 广告费用支持',
      '预审通过的广告模板与文案',
      '效果追踪与投资回报分析',
    ],
    qualificationTitle: '申请条件',
    minimumMonthlyOrderLabel: '每月最低订单',
    minimumMonthlyOrderValue: '48 件',
    partnershipDurationLabel: '合作时长',
    partnershipDurationValue: '6 个月以上',
    creditLimitLabel: '补贴上限',
    creditLimitValue: '$500/月',
  },
  es: {
    coopBenefits: [
      'Hasta 50% de cobertura en costos publicitarios',
      'Plantillas y textos publicitarios preaprobados',
      'Seguimiento de rendimiento y analisis de ROI',
    ],
    qualificationTitle: 'Requisitos de calificacion',
    minimumMonthlyOrderLabel: 'Pedido minimo mensual',
    minimumMonthlyOrderValue: '48 unidades',
    partnershipDurationLabel: 'Duracion de la alianza',
    partnershipDurationValue: '6+ meses',
    creditLimitLabel: 'Limite de credito',
    creditLimitValue: '$500/mes',
  },
};

export function MarketingSupport() {
  const t = useTranslations();
  const locale = useLocale();
  const uiCopy = marketingSupportUiCopy[locale as SupportedLocale] || marketingSupportUiCopy.en;

  const supportItems = [
    {
      category: 'Point of Sale Materials',
      items: [
        {
          name: 'Premium Counter Displays',
          description: 'Eye-catching counter displays that highlight product benefits'
        },
        {
          name: 'Shelf Talkers & Tags',
          description: 'Professional shelf signage with key selling points'
        },
        {
          name: 'Product Information Cards',
          description: 'Detailed cards explaining how Purrify works'
        }
      ]
    },
    {
      category: 'Training & Education',
      items: [
        {
          name: 'Staff Training Videos',
          description: 'Complete product knowledge training for your team'
        },
        {
          name: 'Customer Demo Kit',
          description: 'Tools to demonstrate product effectiveness in-store'
        },
        {
          name: 'FAQ Training Guide',
          description: 'Answers to common customer questions'
        }
      ]
    },
    {
      category: 'Digital Marketing',
      items: [
        {
          name: 'Social Media Assets',
          description: 'Ready-to-post content for your social channels'
        },
        {
          name: 'Email Templates',
          description: 'Professional email campaigns for your customers'
        },
        {
          name: 'Website Integration',
          description: 'Product descriptions and images for your website'
        }
      ]
    }
  ];

  return (
    <section className="py-16 bg-white bg-gray-900">
      <Container>
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 text-gray-50 mb-4">
            {t('retailers.marketing.title') || 'Complete Marketing Support'}
          </h2>
          <p className="text-xl text-gray-600 text-gray-300 max-w-3xl mx-auto">
            {t('retailers.marketing.description') || 'We provide everything you need to successfully sell Purrify. From in-store displays to staff training, we\'ve got you covered.'}
          </p>
        </div>

        {supportItems.map((category, categoryIndex) => (
          <div key={categoryIndex} className="mb-16 last:mb-0">
            <h3 className="font-heading text-2xl font-bold text-gray-900 text-gray-50 mb-8 text-center">
              {category.category}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {category.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className="bg-gray-50 bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="h-48 bg-gradient-to-br from-[#5B2EFF]/10 to-[#3694FF]/20 from-[#3694FF]/20 to-[#5B2EFF]/10 flex items-center justify-center">
                    <div className="w-20 h-20 bg-white bg-gray-700 rounded-xl flex items-center justify-center shadow-lg">
                      <svg className="w-10 h-10 text-[#5B2EFF] text-[#3694FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>

                  <div className="p-6">
                    <h4 className="text-lg font-bold text-gray-900 text-gray-50 mb-3">
                      {item.name}
                    </h4>
                    <p className="text-gray-600 text-gray-300 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Co-op Advertising */}
        <div className="mt-16 bg-gradient-to-r from-[#5B2EFF]/5 to-[#3694FF]/5 from-[#3694FF]/10 to-[#5B2EFF]/10 rounded-2xl p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-heading text-2xl font-bold text-gray-900 text-gray-50 mb-4">
                {t('retailers.marketing.coop.title') || 'Co-op Advertising Program'}
              </h3>
              <p className="text-gray-700 text-gray-200 mb-6">
                {t('retailers.marketing.coop.description') || 'Qualify for advertising credits to promote Purrify in your local market. We\'ll help cover costs for newspaper ads, radio spots, and local marketing campaigns.'}
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-700 text-gray-200">
                  <svg className="w-5 h-5 text-green-500 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {uiCopy.coopBenefits[0]}
                </li>
                <li className="flex items-center text-gray-700 text-gray-200">
                  <svg className="w-5 h-5 text-green-500 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {uiCopy.coopBenefits[1]}
                </li>
                <li className="flex items-center text-gray-700 text-gray-200">
                  <svg className="w-5 h-5 text-green-500 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {uiCopy.coopBenefits[2]}
                </li>
              </ul>
            </div>

            <div className="bg-white bg-gray-800 rounded-xl p-6 shadow-lg">
              <h4 className="text-lg font-bold text-gray-900 text-gray-50 mb-4">
                {uiCopy.qualificationTitle}
              </h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-gray-300">{uiCopy.minimumMonthlyOrderLabel}</span>
                  <span className="font-semibold text-gray-900 text-gray-50">{uiCopy.minimumMonthlyOrderValue}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-gray-300">{uiCopy.partnershipDurationLabel}</span>
                  <span className="font-semibold text-gray-900 text-gray-50">{uiCopy.partnershipDurationValue}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-gray-300">{uiCopy.creditLimitLabel}</span>
                  <span className="font-semibold text-[#5B2EFF] text-[#3694FF]">{uiCopy.creditLimitValue}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
