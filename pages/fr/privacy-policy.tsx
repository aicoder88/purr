import { NextSeo } from 'next-seo';
import { Layout } from '../../src/components/layout/layout';
import { Container } from '../../src/components/ui/container';
import { useTranslation } from '../../src/lib/translation-context';
import Script from 'next/script';
import { GetStaticProps } from 'next';

export default function PrivacyPolicy() {
  const { t } = useTranslation();
  const pageTitle = `Politique de confidentialité | ${t.siteName}`;
  const canonicalUrl = 'https://purrify.ca/fr/privacy-policy/';

  return (
    <>
      <NextSeo
        title={pageTitle}
        description="Politique de confidentialité de Purrify - Découvrez comment nous protégeons vos informations personnelles."
        canonical={canonicalUrl}
        openGraph={{
          url: canonicalUrl,
          title: pageTitle,
          description: "Politique de confidentialité de Purrify - Découvrez comment nous protégeons vos informations personnelles.",
        }}
        languageAlternates={[
          {
            hrefLang: 'en',
            href: 'https://purrify.ca/privacy-policy/',
          },
          {
            hrefLang: 'fr',
            href: canonicalUrl,
          },
        ]}
      />

      {/* BreadcrumbList Schema */}
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            'itemListElement': [
              {
                '@type': 'ListItem',
                'position': 1,
                'name': 'Accueil',
                'item': 'https://purrify.ca/fr/'
              },
              {
                '@type': 'ListItem',
                'position': 2,
                'name': 'Politique de confidentialité',
                'item': canonicalUrl
              }
            ]
          })
        }}
      />

      <Layout>
        <Container className="py-16 max-w-4xl">
          <h1 className="text-3xl font-bold mb-8">Politique de confidentialité</h1>
          
          <div className="prose prose-lg max-w-none">
            <p>Dernière mise à jour: 1 mai 2025</p>
            
            <h2>Introduction</h2>
            <p>Chez Purrify ("nous", "notre", "nos"), nous respectons votre vie privée et nous nous engageons à protéger vos données personnelles. Cette politique de confidentialité vous informera sur la façon dont nous traitons vos données personnelles lorsque vous visitez notre site web (indépendamment de l'endroit d'où vous le visitez) et vous informera de vos droits en matière de confidentialité et de la manière dont la loi vous protège.</p>
            
            <h2>Les données que nous collectons à votre sujet</h2>
            <p>Données personnelles désigne toute information concernant un individu à partir de laquelle cette personne peut être identifiée. Cela n'inclut pas les données pour lesquelles l'identité a été supprimée (données anonymes).</p>
            <p>Nous pouvons collecter, utiliser, stocker et transférer différents types de données personnelles vous concernant, que nous avons regroupées comme suit:</p>
            <ul>
              <li><strong>Données d'identité</strong> comprennent le prénom, le nom de famille, le nom d'utilisateur ou un identifiant similaire.</li>
              <li><strong>Données de contact</strong> comprennent l'adresse de facturation, l'adresse de livraison, l'adresse e-mail et les numéros de téléphone.</li>
              <li><strong>Données de transaction</strong> comprennent les détails des produits et services que vous avez achetés auprès de nous.</li>
              <li><strong>Données techniques</strong> comprennent l'adresse IP, vos données de connexion, le type et la version du navigateur, le réglage du fuseau horaire et la localisation, les types et versions des plug-ins du navigateur, le système d'exploitation et la plate-forme, et d'autres technologies sur les appareils que vous utilisez pour accéder à ce site web.</li>
              <li><strong>Données de profil</strong> comprennent votre nom d'utilisateur et votre mot de passe, vos achats ou commandes, vos intérêts, préférences, commentaires et réponses aux enquêtes.</li>
              <li><strong>Données d'utilisation</strong> comprennent des informations sur la façon dont vous utilisez notre site web, nos produits et services.</li>
              <li><strong>Données de marketing et de communication</strong> comprennent vos préférences pour recevoir des communications marketing de notre part et de la part de nos tiers, et vos préférences de communication.</li>
            </ul>
            
            <h2>Comment nous utilisons vos données personnelles</h2>
            <p>Nous n'utiliserons vos données personnelles que lorsque la loi nous y autorise. Le plus souvent, nous utiliserons vos données personnelles dans les circonstances suivantes:</p>
            <ul>
              <li>Lorsque nous devons exécuter le contrat que nous sommes sur le point de conclure ou que nous avons conclu avec vous.</li>
              <li>Lorsque cela est nécessaire pour nos intérêts légitimes (ou ceux d'un tiers) et que vos intérêts et droits fondamentaux ne prévalent pas sur ces intérêts.</li>
              <li>Lorsque nous devons nous conformer à une obligation légale ou réglementaire.</li>
            </ul>
            
            <h2>Divulgation de vos données personnelles</h2>
            <p>Nous pouvons partager vos données personnelles avec les parties désignées ci-dessous aux fins énoncées dans cette politique de confidentialité:</p>
            <ul>
              <li>Des prestataires de services qui fournissent des services informatiques et d'administration de système.</li>
              <li>Des conseillers professionnels, y compris des avocats, des banquiers, des auditeurs et des assureurs.</li>
              <li>Les autorités fiscales, les autorités de régulation et autres autorités.</li>
              <li>Des tiers auxquels nous pouvons choisir de vendre, transférer ou fusionner des parties de notre entreprise ou de nos actifs.</li>
            </ul>
            <p>Nous exigeons de tous les tiers qu'ils respectent la sécurité de vos données personnelles et qu'ils les traitent conformément à la loi. Nous n'autorisons pas nos prestataires de services tiers à utiliser vos données personnelles à leurs propres fins et nous ne leur permettons de traiter vos données personnelles qu'à des fins spécifiques et conformément à nos instructions.</p>
            
            <h2>Sécurité des données</h2>
            <p>Nous avons mis en place des mesures de sécurité appropriées pour empêcher que vos données personnelles ne soient accidentellement perdues, utilisées ou consultées de manière non autorisée, modifiées ou divulguées. De plus, nous limitons l'accès à vos données personnelles aux employés, agents, contractants et autres tiers qui ont un besoin commercial de les connaître. Ils ne traiteront vos données personnelles que sur nos instructions et ils sont soumis à un devoir de confidentialité.</p>
            <p>Nous avons mis en place des procédures pour faire face à toute violation présumée de données personnelles et nous vous informerons, ainsi que tout régulateur applicable, d'une violation lorsque nous sommes légalement tenus de le faire.</p>
            
            <h2>Conservation des données</h2>
            <p>Nous ne conserverons vos données personnelles que le temps nécessaire pour atteindre les objectifs pour lesquels nous les avons collectées, y compris pour satisfaire à toute exigence légale, comptable ou de rapport.</p>
            <p>Pour déterminer la période de conservation appropriée pour les données personnelles, nous considérons la quantité, la nature et la sensibilité des données personnelles, le risque potentiel de préjudice résultant d'une utilisation ou d'une divulgation non autorisée de vos données personnelles, les fins pour lesquelles nous traitons vos données personnelles et si nous pouvons atteindre ces fins par d'autres moyens, ainsi que les exigences légales applicables.</p>
            
            <h2>Vos droits légaux</h2>
            <p>Dans certaines circonstances, vous avez des droits en vertu des lois sur la protection des données concernant vos données personnelles, notamment le droit d'accéder, de corriger, d'effacer, de s'opposer au traitement, de limiter le traitement, de transférer vos données personnelles et de retirer votre consentement.</p>
            <p>Si vous souhaitez exercer l'un des droits énoncés ci-dessus, veuillez nous contacter.</p>
            
            <h2>Modifications de cette politique de confidentialité</h2>
            <p>Nous maintenons notre politique de confidentialité sous examen régulier et nous placerons toute mise à jour sur cette page web. Cette politique de confidentialité a été mise à jour pour la dernière fois le 1 mai 2025.</p>
            
            <h2>Nous contacter</h2>
            <p>Si vous avez des questions concernant cette politique de confidentialité ou nos pratiques en matière de confidentialité, veuillez nous contacter à l'adresse suivante:</p>
            <p>
              Purrify<br />
              109-17680 Rue Charles<br />
              Mirabel, QC J7J 0T6<br />
              Canada<br />
              Email: {t.contact.email}
            </p>
          </div>
        </Container>
      </Layout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      locale,
    },
  };
};