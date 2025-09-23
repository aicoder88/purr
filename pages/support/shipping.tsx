import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Container } from '../../src/components/ui/container';
import { Button } from '../../src/components/ui/button';
import { useTranslation } from '../../src/lib/translation-context';
import { 
  Truck, 
  Clock, 
  // MapPin, 
  Package,
  Shield,
  CreditCard,
  Globe,
  AlertCircle,
  ChevronRight,
  Home,
  Plane,
  // Calendar,
  // DollarSign
} from 'lucide-react';
import { RelatedArticles } from '../../src/components/blog/RelatedArticles';

const ShippingPage: NextPage = () => {
  const { locale } = useTranslation();

  const shippingOptions = [
    {
      name: "Standard Shipping",
      price: "Free on orders $25+",
      paidPrice: "$4.99 under $25",
      time: "5-7 business days",
      description: "Reliable Canada Post delivery to your door",
      icon: Truck,
      popular: true
    },
    {
      name: "Express Shipping",
      price: "$9.99",
      paidPrice: null,
      time: "2-3 business days",
      description: "Faster delivery via Canada Post Expedited",
      icon: Plane,
      popular: false
    },
    {
      name: "Priority Shipping",
      price: "$14.99",
      paidPrice: null,
      time: "1-2 business days",
      description: "Next-day delivery to major cities",
      icon: Clock,
      popular: false
    }
  ];

  const provinces = [
    { name: "Ontario", time: "3-5 days", express: "1-2 days" },
    { name: "Quebec", time: "3-5 days", express: "1-2 days" },
    { name: "British Columbia", time: "5-7 days", express: "2-3 days" },
    { name: "Alberta", time: "4-6 days", express: "2-3 days" },
    { name: "Manitoba", time: "5-7 days", express: "2-3 days" },
    { name: "Saskatchewan", time: "5-7 days", express: "2-3 days" },
    { name: "Nova Scotia", time: "5-7 days", express: "3-4 days" },
    { name: "New Brunswick", time: "5-7 days", express: "3-4 days" },
    { name: "Newfoundland", time: "7-10 days", express: "4-5 days" },
    { name: "PEI", time: "6-8 days", express: "3-4 days" },
    { name: "Northwest Territories", time: "10-14 days", express: "5-7 days" },
    { name: "Nunavut", time: "14-21 days", express: "7-10 days" },
    { name: "Yukon", time: "10-14 days", express: "5-7 days" }
  ];

  const internationalCountries = [
    { name: "United States", time: "7-14 days", cost: "$12.99" },
    { name: "United Kingdom", time: "10-21 days", cost: "$19.99" },
    { name: "European Union", time: "10-21 days", cost: "$19.99" },
    { name: "Australia", time: "14-28 days", cost: "$24.99" },
    { name: "Other Countries", time: "14-35 days", cost: "Contact us" }
  ];

  const faqItems = [
    {
      question: "When will my order ship?",
      answer: "Orders placed before 2 PM EST Monday-Friday ship the same day. Weekend orders ship the following Monday."
    },
    {
      question: "How can I track my package?",
      answer: "You'll receive a tracking number via email once your order ships. Track your package directly on the Canada Post website."
    },
    {
      question: "What if my package is damaged?",
      answer: "We package all orders carefully, but if damage occurs during shipping, contact us within 48 hours for a free replacement."
    },
    {
      question: "Can I change my shipping address?",
      answer: "Contact us immediately if you need to change your address. Once shipped, we cannot modify the delivery location."
    },
    {
      question: "Do you ship to PO boxes?",
      answer: "Yes, we ship to PO boxes within Canada using Canada Post services."
    },
    {
      question: "What about customs fees?",
      answer: "Canadian orders have no additional fees. International customers may be responsible for customs duties and taxes."
    }
  ];

  return (
    <>
      <Head>
        <title>Shipping Information - Fast & Reliable Delivery Across Canada | Purrify</title>
        <meta 
          name="description" 
          content="Learn about Purrify shipping options, delivery times, and costs. Free shipping on orders $25+. Fast delivery across Canada and international shipping available." 
        />
        <meta name="keywords" content="Purrify shipping, delivery times, shipping costs, Canada Post, free shipping, international delivery" />
        <link rel="canonical" href={`https://www.purrify.ca${locale === 'fr' ? '/fr' : ''}/support/shipping`} />
        
        {/* Open Graph */}
        <meta property="og:title" content="Shipping Information - Fast & Reliable Delivery" />
        <meta property="og:description" content="Fast and reliable Purrify delivery across Canada. Free shipping on orders $25+. International shipping available." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://www.purrify.ca${locale === 'fr' ? '/fr' : ''}/support/shipping`} />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Shipping Information",
              "description": "Purrify shipping options, delivery times, and costs for Canada and international delivery.",
              "url": `https://www.purrify.ca${locale === 'fr' ? '/fr' : ''}/support/shipping`
            })
          }}
        />
      </Head>

      <main className="min-h-screen bg-[#FFFFF5] dark:bg-gray-900 transition-colors duration-300">
        {/* Breadcrumb Navigation */}
        <section className="py-4 border-b border-[#E0EFC7] dark:border-gray-800">
          <Container>
            <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <Link href={locale === 'fr' ? '/fr' : '/'} className="hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors">
                <Home className="w-4 h-4" />
              </Link>
              <span>/</span>
              <Link href={`${locale === 'fr' ? '/fr' : ''}/support/contact`} className="hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors">
                Support
              </Link>
              <span>/</span>
              <span className="text-gray-900 dark:text-gray-100">Shipping</span>
            </nav>
          </Container>
        </section>

        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-[#5B2EFF] to-[#FF3131]">
          <Container>
            <div className="text-center text-white dark:text-gray-100 max-w-4xl mx-auto">
              <Truck className="w-16 h-16 mx-auto mb-6 opacity-90" />
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Shipping Information
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Fast, reliable delivery across Canada and beyond
              </p>
              <div className="bg-white dark:bg-gray-900/10 rounded-lg p-4 inline-block">
                <p className="text-lg font-semibold">
                  🚚 Free shipping on orders $25+ • 📦 Same-day processing • 🇨🇦 Canada-wide delivery
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* Shipping Options */}
        <section className="py-16">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                Choose Your Shipping Speed
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Select the delivery option that works best for you
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {shippingOptions.map((option, index) => (
                <div 
                  key={index} 
                  className={`relative bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-2 ${
                    option.popular 
                      ? 'border-[#FF3131] dark:border-[#FF5050]' 
                      : 'border-[#E0EFC7] dark:border-gray-700'
                  } hover:shadow-xl transition-shadow`}
                >
                  {option.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-[#FF3131] text-white dark:text-gray-100 px-4 py-1 rounded-full text-sm font-bold">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-[#5B2EFF] rounded-full flex items-center justify-center mx-auto mb-4">
                      <option.icon className="w-8 h-8 text-white dark:text-gray-100" />
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">
                      {option.name}
                    </h3>
                    
                    <div className="mb-4">
                      <p className="text-2xl font-bold text-[#FF3131] mb-1">
                        {option.price}
                      </p>
                      {option.paidPrice && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {option.paidPrice}
                        </p>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-center mb-4 text-gray-600 dark:text-gray-300">
                      <Clock className="w-4 h-4 mr-2" />
                      <span className="font-semibold">{option.time}</span>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {option.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Delivery Times by Province */}
        <section className="py-16 bg-[#E0EFC7]/30 dark:bg-gray-800/50">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                Delivery Times by Province
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Estimated delivery times for standard shipping across Canada
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#5B2EFF] text-white dark:text-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-left font-bold">Province/Territory</th>
                      <th className="px-6 py-4 text-center font-bold">Standard Shipping</th>
                      <th className="px-6 py-4 text-center font-bold">Express Shipping</th>
                    </tr>
                  </thead>
                  <tbody>
                    {provinces.map((province, index) => (
                      <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-700/50' : 'bg-white dark:bg-gray-800'}`}>
                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">
                          {province.name}
                        </td>
                        <td className="px-6 py-4 text-center text-gray-600 dark:text-gray-300">
                          {province.time}
                        </td>
                        <td className="px-6 py-4 text-center text-gray-600 dark:text-gray-300">
                          {province.express}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Container>
        </section>

        {/* International Shipping */}
        <section className="py-16">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                International Shipping
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                We ship Purrify worldwide with reliable international delivery
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {internationalCountries.map((country, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-[#E0EFC7] dark:border-gray-700">
                  <div className="flex items-center mb-4">
                    <Globe className="w-6 h-6 text-[#5B2EFF] mr-3" />
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                      {country.name}
                    </h3>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Delivery Time:</span>
                      <span className="font-semibold text-gray-900 dark:text-gray-100">{country.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Shipping Cost:</span>
                      <span className="font-semibold text-[#FF3131]">{country.cost}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
              <div className="flex items-start">
                <AlertCircle className="w-6 h-6 text-yellow-600 dark:text-yellow-400 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-yellow-800 dark:text-yellow-200 mb-2">
                    International Shipping Notes:
                  </h4>
                  <ul className="text-yellow-700 dark:text-yellow-300 space-y-1 text-sm">
                    <li>• Customs duties and taxes may apply and are the customer's responsibility</li>
                    <li>• Delivery times are estimates and may vary due to customs processing</li>
                    <li>• Some countries may have import restrictions on certain products</li>
                    <li>• Contact us for shipping quotes to countries not listed above</li>
                  </ul>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Order Processing */}
        <section className="py-16 bg-[#E0EFC7]/30 dark:bg-gray-800/50">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                Order Processing & Fulfillment
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                How we handle your order from click to delivery
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#5B2EFF] rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="w-8 h-8 text-white dark:text-gray-100" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-gray-100">
                  Order Placed
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Secure payment processing and order confirmation email sent
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-[#FF3131] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="w-8 h-8 text-white dark:text-gray-100" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-gray-100">
                  Processing
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Orders placed before 2 PM EST ship same day (Mon-Fri)
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-[#03E46A] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="w-8 h-8 text-white dark:text-gray-100" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-gray-100">
                  Shipped
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Tracking number provided via email for package monitoring
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-[#FFB800] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white dark:text-gray-100" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-gray-100">
                  Delivered
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Safe delivery to your door with signature confirmation if required
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* Shipping FAQ */}
        <section className="py-16">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                Shipping FAQ
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Common questions about Purrify shipping and delivery
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              {faqItems.map((item, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-[#E0EFC7] dark:border-gray-700">
                  <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-gray-100">
                    {item.question}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-[#5B2EFF] to-[#FF3131]">
          <Container>
            <div className="text-center text-white dark:text-gray-100 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Order Purrify?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Get fast, reliable delivery right to your door. Free shipping on orders $25+.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={`${locale === 'fr' ? '/fr' : ''}/products/trial-size`}>
                  <Button size="lg" className="bg-white dark:bg-gray-900 text-[#5B2EFF] hover:bg-gray-100 font-bold">
                    Order Trial Size - $4.99
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href={`${locale === 'fr' ? '/fr' : ''}/#products`}>
                  <Button size="lg" variant="outline" className="border-white text-gray-900 dark:text-white hover:bg-white dark:hover:bg-gray-700 hover:text-gray-900 transition-colors">
                    View All Products
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* Related Pages */}
        <section className="py-16">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                Need More Information?
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href={`${locale === 'fr' ? '/fr' : ''}/support/contact`} className="group">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-[#E0EFC7] dark:border-gray-700 hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100 group-hover:text-[#5B2EFF] transition-colors">
                    Contact Support
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Have questions about shipping? Our customer service team is here to help.
                  </p>
                </div>
              </Link>
              
              <Link href={`${locale === 'fr' ? '/fr' : ''}/products/compare`} className="group">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-[#E0EFC7] dark:border-gray-700 hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100 group-hover:text-[#5B2EFF] transition-colors">
                    Compare Products
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Find the perfect Purrify size for your household and shipping needs.
                  </p>
                </div>
              </Link>
              
              <Link href={`${locale === 'fr' ? '/fr' : ''}/customers/testimonials`} className="group">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-[#E0EFC7] dark:border-gray-700 hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100 group-hover:text-[#5B2EFF] transition-colors">
                    Customer Reviews
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    See what customers across Canada are saying about their Purrify experience.
                  </p>
                </div>
              </Link>
            </div>
          </Container>
        </section>

        {/* Related Articles */}
        <section className="py-16 border-t border-gray-200 dark:border-gray-800">
          <Container>
            <RelatedArticles currentPath="/support/shipping" />
          </Container>
        </section>
      </main>
    </>
  );
};

export default ShippingPage;
