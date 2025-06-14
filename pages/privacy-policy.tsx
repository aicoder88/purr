import Head from 'next/head';
import { Container } from '../src/components/ui/container';
import { SITE_NAME, SITE_DESCRIPTION, CONTACT_INFO } from '../src/lib/constants';

export default function PrivacyPolicy() {
  const pageTitle = `Privacy Policy | ${SITE_NAME}`;
  const canonicalUrl = 'https://purrify.ca/privacy-policy';
  const currentYear = new Date().getFullYear();
  
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={`Privacy Policy for ${SITE_NAME}. ${SITE_DESCRIPTION}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={`Privacy Policy for ${SITE_NAME}. ${SITE_DESCRIPTION}`} />
        <meta property="og:image" content="https://purrify.ca/purrify-logo.png" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={canonicalUrl} />
        <meta property="twitter:title" content={pageTitle} />
        <meta property="twitter:description" content={`Privacy Policy for ${SITE_NAME}. ${SITE_DESCRIPTION}`} />
        <meta property="twitter:image" content="https://purrify.ca/purrify-logo.png" />
        
        {/* Canonical Link */}
        <link rel="canonical" href={canonicalUrl} />
      </Head>

      <section className="py-16 bg-gradient-to-br from-[#FFFFFF] via-[#FFFFF5] to-[#FFFFFF]">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold tracking-tight mb-4 text-[#03E46A]">
                Privacy Policy
              </h1>
              <p className="text-gray-600">
                Last Updated: May 22, 2025
              </p>
            </div>
            
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>
                At {SITE_NAME}, we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
              </p>

              <h2>1. Important Information and Who We Are</h2>
              <p>
                This privacy policy aims to give you information on how {SITE_NAME} collects and processes your personal data through your use of this website, including any data you may provide through this website when you sign up for our newsletter, purchase a product, or take part in a promotion.
              </p>
              <p>
                <strong>Controller:</strong> {SITE_NAME} is the controller and responsible for your personal data (collectively referred to as "{SITE_NAME}", "we", "us" or "our" in this privacy policy).
              </p>
              <p>
                <strong>Contact details:</strong><br />
                Full name of legal entity: {SITE_NAME}<br />
                Email address: {CONTACT_INFO.email}<br />
                Postal address: {CONTACT_INFO.address}<br />
                Telephone number: {CONTACT_INFO.phone}
              </p>

              <h2>2. The Data We Collect About You</h2>
              <p>
                Personal data, or personal information, means any information about an individual from which that person can be identified. It does not include data where the identity has been removed (anonymous data).
              </p>
              <p>
                We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
              </p>
              <ul>
                <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
                <li><strong>Contact Data</strong> includes billing address, delivery address, email address and telephone numbers.</li>
                <li><strong>Financial Data</strong> includes payment card details.</li>
                <li><strong>Transaction Data</strong> includes details about payments to and from you and other details of products you have purchased from us.</li>
                <li><strong>Technical Data</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
                <li><strong>Profile Data</strong> includes your username and password, purchases or orders made by you, your interests, preferences, feedback and survey responses.</li>
                <li><strong>Usage Data</strong> includes information about how you use our website and products.</li>
                <li><strong>Marketing and Communications Data</strong> includes your preferences in receiving marketing from us and our third parties and your communication preferences.</li>
              </ul>

              <h2>3. How We Collect Your Personal Data</h2>
              <p>
                We use different methods to collect data from and about you including through:
              </p>
              <ul>
                <li>
                  <strong>Direct interactions.</strong> You may give us your Identity, Contact and Financial Data by filling in forms or by corresponding with us by post, phone, email or otherwise.
                </li>
                <li>
                  <strong>Automated technologies or interactions.</strong> As you interact with our website, we will automatically collect Technical Data about your equipment, browsing actions and patterns. We collect this personal data by using cookies, server logs and other similar technologies.
                </li>
                <li>
                  <strong>Third parties or publicly available sources.</strong> We may receive personal data about you from various third parties and public sources such as analytics providers, advertising networks, and search information providers.
                </li>
              </ul>

              <h2>4. How We Use Your Personal Data</h2>
              <p>
                We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
              </p>
              <ul>
                <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                <li>Where we need to comply with a legal obligation.</li>
              </ul>
              <p>
                Generally, we do not rely on consent as a legal basis for processing your personal data although we will get your consent before sending third party direct marketing communications to you via email or text message. You have the right to withdraw consent to marketing at any time by contacting us.
              </p>

              <h2>5. Cookies</h2>
              <p>
                You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies. If you disable or refuse cookies, please note that some parts of this website may become inaccessible or not function properly.
              </p>

              <h2>6. Disclosures of Your Personal Data</h2>
              <p>
                We may share your personal data with the parties set out below for the purposes set out in this privacy policy:
              </p>
              <ul>
                <li>Service providers who provide IT and system administration services.</li>
                <li>Professional advisers including lawyers, bankers, auditors and insurers.</li>
                <li>Government bodies that require us to report processing activities.</li>
                <li>Third parties to whom we may choose to sell, transfer or merge parts of our business or our assets.</li>
              </ul>
              <p>
                We require all third parties to respect the security of your personal data and to treat it in accordance with the law. We do not allow our third-party service providers to use your personal data for their own purposes and only permit them to process your personal data for specified purposes and in accordance with our instructions.
              </p>

              <h2>7. Data Security</h2>
              <p>
                We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know. They will only process your personal data on our instructions and they are subject to a duty of confidentiality.
              </p>
              <p>
                We have put in place procedures to deal with any suspected personal data breach and will notify you and any applicable regulator of a breach where we are legally required to do so.
              </p>

              <h2>8. Data Retention</h2>
              <p>
                We will only retain your personal data for as long as reasonably necessary to fulfill the purposes we collected it for, including for the purposes of satisfying any legal, regulatory, tax, accounting or reporting requirements. We may retain your personal data for a longer period in the event of a complaint or if we reasonably believe there is a prospect of litigation in respect to our relationship with you.
              </p>

              <h2>9. Your Legal Rights</h2>
              <p>
                Under certain circumstances, you have rights under data protection laws in relation to your personal data. These include the right to:
              </p>
              <ul>
                <li>Request access to your personal data.</li>
                <li>Request correction of your personal data.</li>
                <li>Request erasure of your personal data.</li>
                <li>Object to processing of your personal data.</li>
                <li>Request restriction of processing your personal data.</li>
                <li>Request transfer of your personal data.</li>
                <li>Right to withdraw consent.</li>
              </ul>
              <p>
                If you wish to exercise any of the rights set out above, please contact us.
              </p>

              <h2>10. Facebook Advertising</h2>
              <p>
                We use Facebook Pixel and other Facebook advertising tools to collect data about your activities that does not personally or directly identify you when you visit our website or Facebook page. This information may be used to provide measurements of your interactions with our website, target advertisements to you, and customize content based on your interests.
              </p>
              <p>
                For more information about Facebook's data collection practices, please refer to Facebook's Data Policy at <a href="https://www.facebook.com/policy.php" target="_blank" rel="noopener noreferrer">https://www.facebook.com/policy.php</a>.
              </p>

              <h2>11. Changes to the Privacy Policy</h2>
              <p>
                We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the "Last Updated" date at the top of this privacy policy.
              </p>
              <p>
                You are advised to review this privacy policy periodically for any changes. Changes to this privacy policy are effective when they are posted on this page.
              </p>

              <h2>12. Contact Us</h2>
              <p>
                If you have any questions about this privacy policy or our privacy practices, please contact us at:
              </p>
              <p>
                {SITE_NAME}<br />
                Email: {CONTACT_INFO.email}<br />
                Phone: {CONTACT_INFO.phone}<br />
                Address: {CONTACT_INFO.address}
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}