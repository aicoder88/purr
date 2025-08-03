import { NextSeo } from 'next-seo';
import { Container } from '../../../src/components/ui/container';
import { Button } from '../../../src/components/ui/button';
import { Input } from '../../../src/components/ui/input';
import { Textarea } from '../../../src/components/ui/textarea';
import { useTranslation } from '../../../src/lib/translation-context';
import { SITE_NAME } from '../../../src/lib/constants';
import Link from 'next/link';
import { ArrowLeft, Mail, Phone, Clock, MapPin, MessageCircle, Send, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export default function ContactPageFR() {
  const { t, locale } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean;
    message?: string;
  }>({});
  
  const pageTitle = `Contactez-Nous - ${SITE_NAME} Support Client & Aide`;
  const pageDescription = "Contactez l'équipe de support client de Purrify. Nous sommes là pour vous aider avec les questions sur les produits, les commandes, et les conseils de contrôle des odeurs de litière.";
  const canonicalUrl = 'https://purrify.ca/fr/support/contact';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    orderNumber: '',
    contactReason: 'general'
  });

  const contactReasons = [
    { value: 'general', label: 'Question Générale' },
    { value: 'product', label: 'Information Produit' },
    { value: 'order', label: 'Support Commande' },
    { value: 'shipping', label: 'Question Livraison' },
    { value: 'return', label: 'Retour/Remboursement' },
    { value: 'wholesale', label: 'Demande Grossiste' },
    { value: 'feedback', label: 'Commentaire/Avis' }
  ];

  const contactMethods = [
    {
      icon: Mail,
      title: "Support Email",
      value: "support@purrify.ca",
      description: "Obtenez de l'aide détaillée par email",
      responseTime: "Habituellement dans les 24 heures",
      action: "mailto:support@purrify.ca"
    },
    {
      icon: Phone,
      title: "Support Téléphonique",
      value: "+1 514 961 9386",
      description: "Parlez directement avec notre équipe",
      responseTime: "Lun-Ven, 9h-17h EST",
      action: "tel:+15149619386"
    },
    {
      icon: MessageCircle,
      title: "Chat en Direct",
      value: "Disponible Maintenant",
      description: "Aide instantanée pour questions rapides",
      responseTime: "Réponse moyenne: 2 minutes",
      action: "#"
    }
  ];

  const faqs = [
    {
      question: "À quelle vitesse verrai-je des résultats avec Purrify?",
      answer: "La plupart des clients remarquent une réduction significative des odeurs dans les premières heures d'application. Le charbon activé commence à piéger les molécules d'odeur immédiatement au contact."
    },
    {
      question: "Quelle est votre politique de retour?",
      answer: "Nous offrons une garantie de remboursement de 30 jours. Si vous n'êtes pas complètement satisfait de Purrify, contactez-nous pour un remboursement complet."
    },
    {
      question: "Offrez-vous des prix de gros pour plusieurs chats?",
      answer: "Oui! Notre format économique de 500g offre la meilleure valeur pour les foyers multi-chats. Nous avons aussi des prix de gros disponibles pour les animaleries et vétérinaires."
    },
    {
      question: "Purrify est-il sûr si mon chat l'ingère accidentellement?",
      answer: "Absolument. Le charbon activé est complètement sûr pour les chats et est même utilisé en médecine vétérinaire. Cependant, Purrify est conçu pour rester mélangé avec la litière."
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({});

    try {
      // Simulate form submission - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitStatus({
        success: true,
        message: "Merci de nous avoir contactés! Nous vous répondrons dans les 24 heures."
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        orderNumber: '',
        contactReason: 'general'
      });
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: "Désolé, il y a eu une erreur en envoyant votre message. Veuillez réessayer ou nous contacter directement."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <NextSeo
        title={pageTitle}
        description={pageDescription}
        canonical={canonicalUrl}
        openGraph={{
          title: pageTitle,
          description: pageDescription,
          url: canonicalUrl,
          type: 'website',
          images: [
            {
              url: 'https://purrify.ca/customer-support-hero.jpg',
              width: 1200,
              height: 630,
              alt: 'Équipe de Support Client Purrify'
            }
          ]
        }}
      />

      <main className="min-h-screen bg-gradient-to-br from-[#FFFFFF] via-[#FFFFF5] to-[#FFFFFF] dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
        {/* Breadcrumb Navigation */}
        <Container>
          <nav className="py-4 text-sm">
            <ol className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
              <li>
                <Link href="/fr" className="hover:text-[#FF3131] dark:hover:text-[#FF5050]">
                  Accueil
                </Link>
              </li>
              <li>/</li>
              <li>
                <span className="hover:text-[#FF3131] dark:hover:text-[#FF5050]">
                  Support
                </span>
              </li>
              <li>/</li>
              <li className="text-[#FF3131] dark:text-[#FF5050] font-medium">Contact</li>
            </ol>
          </nav>
        </Container>

        {/* Hero Section */}
        <section className="py-16">
          <Container>
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#FF3131] to-[#5B2EFF] dark:from-[#FF5050] dark:to-[#3694FF] bg-clip-text text-transparent">
                Nous Sommes Là Pour Vous Aider
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 leading-relaxed">
                Avez-vous des questions sur Purrify? Besoin d'aide avec votre commande? Notre équipe de support client 
                amicale est prête à vous assister avec des conseils d'experts et des solutions.
              </p>
            </div>
          </Container>
        </section>

        {/* Contact Methods */}
        <section className="py-16 bg-white/50 dark:bg-gray-800/50">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                Choisissez Comment Nous Contacter
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Choisissez la méthode de contact qui vous convient le mieux
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {contactMethods.map((method, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#FF3131] to-[#5B2EFF] rounded-full flex items-center justify-center mx-auto mb-6">
                    <method.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">
                    {method.title}
                  </h3>
                  <p className="text-xl font-semibold text-[#5B2EFF] dark:text-[#3694FF] mb-3">
                    {method.value}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    {method.description}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                    {method.responseTime}
                  </p>
                  <Button 
                    className="w-full"
                    onClick={() => {
                      if (method.action.startsWith('#')) {
                        // Handle live chat
                        alert('Fonctionnalité de chat en direct bientôt disponible! Veuillez utiliser email ou téléphone pour le moment.');
                      } else {
                        window.location.href = method.action;
                      }
                    }}
                  >
                    Contacter Maintenant
                  </Button>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Contact Form */}
        <section className="py-16">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                  Envoyez-Nous un Message
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                  Remplissez le formulaire ci-dessous et nous vous répondrons dans les 24 heures
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
                {submitStatus.message && (
                  <div className={`mb-6 p-4 rounded-lg flex items-center ${
                    submitStatus.success 
                      ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800'
                      : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800'
                  }`}>
                    {submitStatus.success && <CheckCircle className="w-5 h-5 mr-2" />}
                    {submitStatus.message}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Nom Complet *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Votre nom complet"
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Adresse Email *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="votre.email@exemple.com"
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="contactReason" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Raison du Contact
                      </label>
                      <select
                        id="contactReason"
                        name="contactReason"
                        value={formData.contactReason}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      >
                        {contactReasons.map((reason) => (
                          <option key={reason.value} value={reason.value}>
                            {reason.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="orderNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Numéro de Commande (si applicable)
                      </label>
                      <Input
                        id="orderNumber"
                        name="orderNumber"
                        type="text"
                        value={formData.orderNumber}
                        onChange={handleInputChange}
                        placeholder="ex: PUR-12345"
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Sujet *
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Brève description de votre demande"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Veuillez fournir des détails sur votre question ou préoccupation..."
                      rows={6}
                      className="w-full"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-[#FF3131] to-[#5B2EFF] hover:from-[#FF3131]/90 hover:to-[#5B2EFF]/90 text-white font-bold"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Envoi du Message...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Envoyer le Message
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </Container>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white/50 dark:bg-gray-800/50">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                Questions Fréquemment Posées
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Réponses rapides aux questions communes
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                  <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-gray-100">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Vous ne voyez pas votre question ici?
              </p>
              <Link href="/fr/#faq">
                <Button variant="outline" size="lg">
                  Voir FAQ Complète
                </Button>
              </Link>
            </div>
          </Container>
        </section>

        {/* Business Hours & Location */}
        <section className="py-16">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="text-center md:text-left">
                <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
                  Heures d'Affaires
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-center md:justify-start">
                    <Clock className="w-5 h-5 text-[#FF3131] mr-3" />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-gray-100">Lundi - Vendredi</p>
                      <p className="text-gray-600 dark:text-gray-300">9h00 - 17h00 EST</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center md:justify-start">
                    <Clock className="w-5 h-5 text-[#FF3131] mr-3" />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-gray-100">Samedi</p>
                      <p className="text-gray-600 dark:text-gray-300">10h00 - 14h00 EST</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center md:justify-start">
                    <Clock className="w-5 h-5 text-[#FF3131] mr-3" />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-gray-100">Dimanche</p>
                      <p className="text-gray-600 dark:text-gray-300">Fermé</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center md:text-left">
                <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
                  Notre Emplacement
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-center md:justify-start">
                    <MapPin className="w-5 h-5 text-[#FF3131] mr-3" />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-gray-100">Purrify Canada</p>
                      <p className="text-gray-600 dark:text-gray-300">Montréal, Québec</p>
                      <p className="text-gray-600 dark:text-gray-300">Canada</p>
                    </div>
                  </div>
                  <div className="mt-6">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Nous expédions partout au Canada et offrons la collecte locale dans la région de Montréal.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Back Navigation */}
        <section className="py-8">
          <Container>
            <div className="text-center">
              <Link href="/fr/#contact">
                <Button variant="outline" size="lg">
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Retour à l'Accueil
                </Button>
              </Link>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}
