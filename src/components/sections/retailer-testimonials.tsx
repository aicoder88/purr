import { Container } from '../ui/container';
import { useTranslation } from '../../lib/translation-context';

export function RetailerTestimonials() {
  const { t } = useTranslation();

  const testimonials = [
    {
      name: 'Sarah Chen',
      title: 'Owner, Pet Paradise Vancouver',
      location: 'Vancouver, BC',
      quote: 'Purrify has become one of our top-selling products. Customers love it, and the margins are excellent. The support team provides everything we need to succeed.',
      avatar: 'SC',
      stats: {
        label: 'Monthly Sales Increase',
        value: '+180%'
      }
    },
    {
      name: 'Mike Rodriguez',
      title: 'Manager, Furry Friends Pet Store',
      location: 'Toronto, ON',
      quote: 'The wholesale program is fantastic. Great margins, fast shipping, and our customers keep coming back. It\'s been a game-changer for our cat product section.',
      avatar: 'MR',
      stats: {
        label: 'Customer Retention',
        value: '94%'
      }
    },
    {
      name: 'Lisa Thompson',
      title: 'Regional Manager, Pet Supply Chain',
      location: 'Calgary, AB',
      quote: 'We\'ve rolled out Purrify across all 23 locations. The training materials and POS support made implementation seamless. Highly recommend to other retailers.',
      avatar: 'LT',
      stats: {
        label: 'Store Locations',
        value: '23 stores'
      }
    }
  ];

  const businessMetrics = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      label: 'Average Sales Increase',
      value: '156%',
      description: 'within first 6 months'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      label: 'Customer Satisfaction',
      value: '97%',
      description: 'repeat purchase rate'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      ),
      label: 'Profit Margin',
      value: '45%',
      description: 'average across all tiers'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      label: 'Inventory Turnover',
      value: '30 days',
      description: 'average turnover time'
    }
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">
            {t.retailers?.testimonials?.title || 'What Our Retail Partners Say'}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t.retailers?.testimonials?.description || 'Real feedback from successful pet store owners and managers across Canada.'}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#5B2EFF] to-[#3694FF] rounded-full flex items-center justify-center text-white dark:text-white font-bold text-sm mr-4">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-gray-50">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{testimonial.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{testimonial.location}</p>
                </div>
              </div>

              <blockquote className="text-gray-700 dark:text-gray-200 italic mb-4">
                "{testimonial.quote}"
              </blockquote>

              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-300">{testimonial.stats.label}</span>
                  <span className="font-bold text-[#5B2EFF] dark:text-[#3694FF]">{testimonial.stats.value}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Business Metrics */}
        <div className="bg-gradient-to-r from-[#5B2EFF]/5 to-[#3694FF]/5 dark:from-[#3694FF]/10 dark:to-[#5B2EFF]/10 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-8 text-center">
            {t.retailers?.testimonials?.metrics?.title || 'Proven Business Results'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {businessMetrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg text-[#5B2EFF] dark:text-[#3694FF]">
                  {metric.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-1">
                  {metric.value}
                </div>
                <div className="font-semibold text-gray-700 dark:text-gray-200 mb-1">
                  {metric.label}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {metric.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Case Study CTA */}
        <div className="mt-12 text-center">
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-4">
            Want to see detailed case studies?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Download our retail success stories to see how other stores have grown their business with Purrify.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-[#5B2EFF] to-[#3694FF] hover:from-[#4C1EEB] hover:to-[#2563EB] text-white dark:text-white font-bold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
              Download Case Studies
            </button>
            <button className="border-2 border-[#5B2EFF] dark:border-[#3694FF] text-[#5B2EFF] dark:text-[#3694FF] hover:bg-[#5B2EFF] dark:hover:bg-[#3694FF] hover:text-white dark:hover:text-white font-bold py-3 px-8 rounded-lg transition-all duration-300">
              Schedule Call with Rep
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}