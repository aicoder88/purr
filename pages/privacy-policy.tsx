import React from "react";
import { LocalizedMeta } from "../src/components/seo/LocalizedMeta";
import { CONTACT_INFO } from "../src/lib/constants";

const PrivacyPolicy = () => (
  <>
    <LocalizedMeta
      title="Privacy Policy - Purrify Cat Litter Additive Data Protection"
      description="Learn how Purrify collects, uses, and protects your information. Read our privacy policy for details on data usage, security, and your rights."
      canonicalPath="/privacy-policy"
    />
    <main className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-gray-50">Privacy Policy</h1>
      <p className="mb-6 text-lg text-gray-700 dark:text-gray-200">
        At Purrify, your privacy is important to us. This Privacy Policy explains how we collect, use, protect, and share your information when you use our website, purchase our products, or interact with our services. By using our website, you consent to the practices described in this policy.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-gray-50">Information We Collect</h2>
      <h3 className="text-xl font-medium mb-3 text-gray-800 dark:text-gray-100">Personal Information</h3>
      <p className="mb-4 text-gray-700 dark:text-gray-200">We collect personal information that you voluntarily provide to us when you:</p>
      <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-200">
        <li>Create an account or make a purchase</li>
        <li>Subscribe to our newsletter or marketing communications</li>
        <li>Contact us for customer support or inquiries</li>
        <li>Participate in surveys, contests, or promotions</li>
        <li>Leave reviews or feedback about our products</li>
      </ul>

      <h3 className="text-xl font-medium mb-3 text-gray-800 dark:text-gray-100">Order and Payment Information</h3>
      <p className="mb-4 text-gray-700 dark:text-gray-200">
        When you make a purchase, we collect order details, shipping information, and payment data necessary to process your transaction. Payment information is securely processed by our trusted payment processors and is not stored on our servers.
      </p>

      <h3 className="text-xl font-medium mb-3 text-gray-800 dark:text-gray-100">Usage and Technical Data</h3>
      <p className="mb-4 text-gray-700 dark:text-gray-200">
        We automatically collect certain information about your device and usage patterns, including:
      </p>
      <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-200">
        <li>IP address, browser type, and device information</li>
        <li>Pages visited, time spent on pages, and click patterns</li>
        <li>Referring websites and search terms used to find us</li>
        <li>Location data (general geographic area based on IP address)</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-gray-50">How We Use Your Information</h2>
      <p className="mb-4 text-gray-700 dark:text-gray-200">We use the information we collect for legitimate business purposes, including:</p>
      <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-200">
        <li><strong>Order Processing:</strong> To process, fulfill, and ship your orders</li>
        <li><strong>Customer Service:</strong> To respond to your inquiries and provide support</li>
        <li><strong>Marketing:</strong> To send you promotional emails and product updates (with your consent)</li>
        <li><strong>Website Improvement:</strong> To analyze usage patterns and enhance user experience</li>
        <li><strong>Legal Compliance:</strong> To comply with applicable laws and regulations</li>
        <li><strong>Fraud Prevention:</strong> To detect and prevent fraudulent transactions</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-gray-50">How We Protect Your Information</h2>
      <p className="mb-4 text-gray-700 dark:text-gray-200">
        We implement industry-standard security measures to protect your personal information, including:
      </p>
      <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-200">
        <li>SSL encryption for all data transmission</li>
        <li>Secure payment processing through certified providers</li>
        <li>Regular security audits and updates</li>
        <li>Limited access to personal data on a need-to-know basis</li>
        <li>Secure data storage with backup and recovery procedures</li>
      </ul>
      <p className="mb-6 text-gray-700 dark:text-gray-200">
        While we strive to protect your information, no method of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee absolute security.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-gray-50">Information Sharing and Disclosure</h2>
      <p className="mb-4 text-gray-700 dark:text-gray-200">
        We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
      </p>
      <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-200">
        <li><strong>Service Providers:</strong> With trusted partners who help us operate our business (shipping, payment processing, email services)</li>
        <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety</li>
        <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of business assets</li>
        <li><strong>Consent:</strong> When you have given explicit consent for sharing</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-gray-50">Your Rights and Choices</h2>
      <p className="mb-4 text-gray-700 dark:text-gray-200">
        You have the following rights regarding your personal information:
      </p>
      <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-200">
        <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
        <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
        <li><strong>Deletion:</strong> Request deletion of your personal information (subject to legal requirements)</li>
        <li><strong>Portability:</strong> Request transfer of your data to another service provider</li>
        <li><strong>Opt-out:</strong> Unsubscribe from marketing communications at any time</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-gray-50">Cookies and Tracking</h2>
      <p className="mb-4 text-gray-700 dark:text-gray-200">
        We use cookies and similar technologies to enhance your browsing experience, analyze website traffic, and personalize content. You can control cookie settings through your browser preferences.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-gray-50">Children's Privacy</h2>
      <p className="mb-6 text-gray-700 dark:text-gray-200">
        Our website and services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-gray-50">Changes to This Policy</h2>
      <p className="mb-6 text-gray-700 dark:text-gray-200">
        We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last Updated" date.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-gray-50">Contact Us</h2>
      <p className="mb-4 text-gray-700 dark:text-gray-200">
        If you have any questions, concerns, or requests regarding this Privacy Policy or your personal information, please contact us:
      </p>
      <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
        <p className="mb-2 text-gray-700 dark:text-gray-200">
          <strong>Email:</strong> <a href="mailto:privacy@purrify.ca" className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300">privacy@purrify.ca</a>
        </p>
        <p className="mb-2 text-gray-700 dark:text-gray-200">
          <strong>Mail:</strong> Purrify Privacy Officer, 123 Main Street, Montreal, QC H1A 1A1, Canada
        </p>
        <p className="text-gray-700 dark:text-gray-200">
          <strong>Phone:</strong> <a href={CONTACT_INFO.phoneHref} className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300">{CONTACT_INFO.phone}</a>
        </p>
      </div>

      <p className="mt-8 text-sm text-gray-500 dark:text-gray-400">
        Last updated: December 2024
      </p>
    </main>
  </>
);

export default PrivacyPolicy;
