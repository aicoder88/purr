import { Metadata } from 'next';
import { CONTACT_INFO } from '@/lib/constants';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Privacy Policy - Purrify Cat Litter Additive Data Protection',
  description: 'Learn how Purrify collects, uses, and protects your information. Read our privacy policy for details on data usage, security, and your rights.',
  alternates: {
    canonical: '/privacy-policy',
  },
  openGraph: {
    url: '/privacy-policy',
  },
};

// English privacy policy content (static for server component)
const privacyContent = {
  title: 'Privacy Policy',
  sections: [
    {
      title: 'Information We Collect',
      content: 'We collect information you provide directly to us, including name, email address, phone number, shipping address, billing information, and any other information you choose to provide. We also automatically collect certain information about your device and how you interact with our website.'
    },
    {
      title: 'How We Use Your Information',
      content: 'We use the information we collect to process orders, communicate with you, improve our products and services, personalize your experience, and send promotional communications (with your consent).'
    },
    {
      title: 'Information Sharing',
      content: 'We do not sell your personal information. We may share your information with service providers who help us operate our business (payment processors, shipping carriers), or when required by law.',
      items: [
        'Payment processing and fraud prevention',
        'Order fulfillment and shipping',
        'Customer support services',
        'Marketing and advertising (with your consent)'
      ]
    },
    {
      title: 'Data Security',
      content: 'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.'
    },
    {
      title: 'Your Rights',
      content: 'You have the right to access, correct, delete, or restrict processing of your personal information. You may also object to processing and request data portability.'
    },
    {
      title: 'Cookies and Tracking',
      content: 'We use cookies and similar technologies to enhance your browsing experience, analyze site traffic, and understand where our visitors come from. You can control cookies through your browser settings.'
    },
    {
      title: 'Third-Party Links',
      content: 'Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these third-party sites.'
    },
    {
      title: 'Changes to This Policy',
      content: 'We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the effective date.'
    }
  ],
  contactInfo: {
    email: CONTACT_INFO.email,
    address: CONTACT_INFO.address,
    phone: CONTACT_INFO.phone
  },
  lastUpdated: 'Last updated: December 2024'
};

export default function PrivacyPolicyPage() {
  return (
    <>

      <main className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="font-heading text-4xl font-bold mb-6 text-gray-900 text-gray-50">
          {privacyContent.title}
        </h1>

        {privacyContent.sections.map((section, index) => (
          <div key={index} className={index > 0 ? "mt-8" : ""}>
            <h2 className="font-heading text-2xl font-semibold mb-4 text-gray-900 text-gray-50">
              {section.title}
            </h2>
            <p className="mb-4 text-gray-700 text-gray-200">
              {section.content}
            </p>
            {section.items && section.items.length > 0 && (
              <ul className="list-disc pl-6 mb-6 text-gray-700 text-gray-200">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex} dangerouslySetInnerHTML={{ __html: item }} />
                ))}
              </ul>
            )}
          </div>
        ))}

        <div className="mt-8">
          <h2 className="font-heading text-2xl font-semibold mb-4 text-gray-900 text-gray-50">
            Contact Us
          </h2>
          <p className="mb-4 text-gray-700 text-gray-200">
            If you have any questions, concerns, or requests regarding this Privacy Policy or your personal information, please contact us:
          </p>
          <div className="bg-gray-50 bg-gray-800 p-6 rounded-lg">
            <p className="mb-2 text-gray-700 text-gray-200">
              <strong>Email:</strong>{" "}
              <a
                href={`mailto:${privacyContent.contactInfo.email}`}
                className="text-blue-600 text-blue-400 underline hover:text-blue-800 hover:text-blue-300"
              >
                {privacyContent.contactInfo.email}
              </a>
            </p>
            <p className="mb-2 text-gray-700 text-gray-200">
              <strong>Address:</strong> {privacyContent.contactInfo.address}
            </p>
            <p className="text-gray-700 text-gray-200">
              <strong>Phone:</strong>{" "}
              <a
                href={`tel:${privacyContent.contactInfo.phone.replace(/[^0-9+]/g, '')}`}
                className="text-blue-600 text-blue-400 underline hover:text-blue-800 hover:text-blue-300"
              >
                {privacyContent.contactInfo.phone}
              </a>
            </p>
          </div>

          <p className="mt-8 text-sm text-gray-500 text-gray-400">
            {privacyContent.lastUpdated}
          </p>
        </div>
      </main>
    </>
  );
}
