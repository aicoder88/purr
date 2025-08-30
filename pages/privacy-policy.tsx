import React from "react";

const PrivacyPolicy = () => (
  <main className="max-w-2xl mx-auto py-12 px-4">
    <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
    <p className="mb-4">Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you use our website.</p>
    <h2 className="text-xl font-semibold mt-8 mb-2">Information We Collect</h2>
    <ul className="list-disc pl-6 mb-4">
      <li>Personal information you provide (such as name, email, address, phone number)</li>
      <li>Order and payment information</li>
      <li>Usage data (pages visited, actions taken, etc.)</li>
    </ul>
    <h2 className="text-xl font-semibold mt-8 mb-2">How We Use Your Information</h2>
    <ul className="list-disc pl-6 mb-4">
      <li>To process and fulfill your orders</li>
      <li>To communicate with you about your orders or inquiries</li>
      <li>To improve our website and services</li>
      <li>To comply with legal obligations</li>
    </ul>
    <h2 className="text-xl font-semibold mt-8 mb-2">How We Protect Your Information</h2>
    <p className="mb-4">We implement reasonable security measures to protect your data. However, no method of transmission over the Internet is 100% secure.</p>
    <h2 className="text-xl font-semibold mt-8 mb-2">Contact Us</h2>
    <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:info@purrify.ca" className="text-blue-600 dark:text-blue-400 dark:text-blue-400 underline">info@purrify.ca</a>.</p>
  </main>
);

export default PrivacyPolicy;