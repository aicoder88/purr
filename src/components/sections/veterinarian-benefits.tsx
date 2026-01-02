import { Container } from '../ui/container';
import { useTranslation } from '../../lib/translation-context';

export function VeterinarianBenefits() {
  const { t } = useTranslation();

  const whyVetsLove = [
    {
      icon: (
        <svg className="w-8 h-8 text-white dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      title: t.veterinarians?.benefits?.natural?.title || '100% Natural Activated Carbon',
      description: t.veterinarians?.benefits?.natural?.description || 'Made from pure coconut shell activated carbon. The same filtration-grade material used in water purification and medical applications.',
      color: 'from-[#10B981] to-[#34D399]'
    },
    {
      icon: (
        <svg className="w-8 h-8 text-white dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414" />
        </svg>
      ),
      title: t.veterinarians?.benefits?.fragranceFree?.title || 'No Fragrances or Chemicals',
      description: t.veterinarians?.benefits?.fragranceFree?.description || 'Zero artificial scents, dyes, or synthetic additives. Ideal for cats with sensitivities, allergies, or respiratory conditions.',
      color: 'from-[#3694FF] to-[#60A5FA]'
    },
    {
      icon: (
        <svg className="w-8 h-8 text-white dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: t.veterinarians?.benefits?.sensitive?.title || 'Safe for Sensitive Cats',
      description: t.veterinarians?.benefits?.sensitive?.description || 'Fragrance-free formula won\'t trigger asthma or allergies. Cats of all ages can use litter treated with Purrify without irritation.',
      color: 'from-[#EC4899] to-[#F472B6]'
    },
    {
      icon: (
        <svg className="w-8 h-8 text-white dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      title: t.veterinarians?.benefits?.ammonia?.title || 'Reduces Ammonia Exposure',
      description: t.veterinarians?.benefits?.ammonia?.description || 'Activated carbon traps ammonia at the molecular level, improving air quality around the litter box. Beneficial for both cats and owners.',
      color: 'from-[#F59E0B] to-[#FBBF24]'
    }
  ];

  const clientComplaints = [
    t.veterinarians?.clientComplaints?.items?.[0] || '"My apartment smells like a litter box"',
    t.veterinarians?.clientComplaints?.items?.[1] || '"I\'m embarrassed when guests visit"',
    t.veterinarians?.clientComplaints?.items?.[2] || '"The scented litters irritate my cat"',
    t.veterinarians?.clientComplaints?.items?.[3] || '"I change litter daily but it still smells"',
    t.veterinarians?.clientComplaints?.items?.[4] || '"My cat has breathing issues around the litter box"',
    t.veterinarians?.clientComplaints?.items?.[5] || '"I\'ve tried everything and nothing works"'
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Container>
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-[#10B981]/10 to-[#3694FF]/10 dark:from-[#10B981]/20 dark:to-[#3694FF]/20 text-[#10B981] dark:text-[#34D399] font-semibold text-sm mb-6">
            {t.veterinarians?.benefits?.badge || 'Why Veterinarians Choose Purrify'}
          </div>
          <h2 className="font-heading text-4xl md:text-6xl font-black text-gray-900 dark:text-gray-50 mb-6">
            {t.veterinarians?.benefits?.titleLine1 || 'A Product You Can'}
            <span className="block bg-gradient-to-r from-[#10B981] to-[#3694FF] bg-clip-text text-transparent">
              {t.veterinarians?.benefits?.titleLine2 || 'Recommend With Confidence'}
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t.veterinarians?.benefits?.subtitle || 'Give your clients a science-backed solution to litter box odor that aligns with your health-first approach to pet care.'}
          </p>
        </div>

        {/* Why Vets Love Purrify Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {whyVetsLove.map((benefit, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800/70 rounded-3xl p-8 shadow-xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-start">
                <div className={`w-16 h-16 bg-gradient-to-r ${benefit.color} rounded-2xl flex items-center justify-center mr-6 flex-shrink-0`}>
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="font-heading font-black text-xl text-gray-900 dark:text-gray-50 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* For Your Clients Section */}
        <div className="bg-gradient-to-r from-[#10B981]/10 via-[#3694FF]/5 to-[#10B981]/10 dark:from-[#10B981]/15 dark:via-[#3694FF]/10 dark:to-[#10B981]/15 rounded-3xl p-10 border-2 border-[#10B981]/20 dark:border-[#34D399]/30">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Client Complaints */}
            <div>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white dark:bg-gray-800 text-[#10B981] dark:text-[#34D399] font-semibold text-sm mb-6 shadow-lg">
                {t.veterinarians?.clientComplaints?.badge || 'Sound Familiar?'}
              </div>
              <h3 className="font-heading text-3xl font-black text-gray-900 dark:text-gray-50 mb-6">
                {t.veterinarians?.clientComplaints?.title || 'Common Complaints You Hear'}
              </h3>
              <div className="space-y-4">
                {clientComplaints.map((complaint, index) => (
                  <div key={index} className="flex items-center bg-white dark:bg-gray-800/50 rounded-xl p-4 shadow-md">
                    <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <svg className="w-4 h-4 text-red-500 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-gray-700 dark:text-gray-200 font-medium italic">{complaint}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Your Solution */}
            <div className="bg-white dark:bg-gray-800/70 rounded-2xl p-8 shadow-2xl">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-[#10B981] to-[#34D399] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-white dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-heading text-2xl font-black text-gray-900 dark:text-gray-50 mb-2">
                  {t.veterinarians?.clientComplaints?.solution?.title || 'Your Go-To Recommendation'}
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  {t.veterinarians?.clientComplaints?.solution?.subtitle || 'Purrify gives you a trusted answer to every litter box odor question.'}
                </p>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#10B981] to-[#34D399] flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <svg className="w-4 h-4 text-white dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700 dark:text-gray-200 font-medium">
                    {t.veterinarians?.clientComplaints?.solution?.points?.[0] || 'Natural solution you can confidently recommend'}
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#10B981] to-[#34D399] flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <svg className="w-4 h-4 text-white dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700 dark:text-gray-200 font-medium">
                    {t.veterinarians?.clientComplaints?.solution?.points?.[1] || 'Sample packs for client education'}
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#10B981] to-[#34D399] flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <svg className="w-4 h-4 text-white dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700 dark:text-gray-200 font-medium">
                    {t.veterinarians?.clientComplaints?.solution?.points?.[2] || 'Builds trust and loyalty with your practice'}
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#10B981] to-[#34D399] flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <svg className="w-4 h-4 text-white dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700 dark:text-gray-200 font-medium">
                    {t.veterinarians?.clientComplaints?.solution?.points?.[3] || 'No more recommending scented products that irritate cats'}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
