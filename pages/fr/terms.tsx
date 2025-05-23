import { NextSeo } from 'next-seo';
import { Layout } from '../../src/components/layout/layout';
import { Container } from '../../src/components/ui/container';
import { useTranslation } from '../../src/lib/translation-context';
import Script from 'next/script';
import { GetStaticProps } from 'next';

export default function Terms() {
  const { t } = useTranslation();
  const pageTitle = `Conditions d'utilisation | ${t.siteName}`;
  const canonicalUrl = 'https://purrify.ca/fr/terms';

  return (
    <>
      <NextSeo
        title={pageTitle}
        description="Conditions d'utilisation de Purrify - Veuillez lire attentivement ces conditions avant d'utiliser notre site web et nos services."
        canonical={canonicalUrl}
        openGraph={{
          url: canonicalUrl,
          title: pageTitle,
          description: "Conditions d'utilisation de Purrify - Veuillez lire attentivement ces conditions avant d'utiliser notre site web et nos services.",
        }}
        languageAlternates={[
          {
            hrefLang: 'en',
            href: 'https://purrify.ca/terms',
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
                'name': 'Conditions d\'utilisation',
                'item': canonicalUrl
              }
            ]
          })
        }}
      />

      <Layout>
        <Container className="py-16 max-w-4xl">
          <h1 className="text-3xl font-bold mb-8">Conditions d'utilisation</h1>
          
          <div className="prose prose-lg max-w-none">
            <p>Dernière mise à jour: 1 mai 2025</p>
            
            <h2>Introduction</h2>
            <p>Bienvenue sur Purrify.ca. Ce site web est détenu et exploité par Purrify Inc.</p>
            <p>Ces conditions d'utilisation régissent votre utilisation du site web Purrify.ca, y compris toutes les pages de ce site web. En utilisant ce site web, vous indiquez que vous avez lu et compris ces conditions d'utilisation et que vous acceptez d'être lié par elles à tout moment.</p>
            <p>Si vous n'acceptez pas ces conditions d'utilisation, veuillez cesser d'utiliser ce site web immédiatement.</p>
            
            <h2>Propriété intellectuelle</h2>
            <p>Tout le contenu publié et mis à disposition sur ce site est la propriété de Purrify Inc. et de ses créateurs. Cela inclut, mais n'est pas limité aux textes, graphiques, logos, icônes, images, clips audio, vidéos, données et logiciels.</p>
            <p>Toute reproduction, modification, publication, transmission ou distribution de tout ou partie du contenu du site sans autorisation écrite préalable est strictement interdite.</p>
            
            <h2>Restrictions d'utilisation</h2>
            <p>En tant qu'utilisateur, vous acceptez d'utiliser notre site web légalement et de ne pas utiliser ce site web pour des activités illégales, notamment:</p>
            <ul>
              <li>Violer les droits de propriété intellectuelle d'autres personnes</li>
              <li>Commettre une fraude</li>
              <li>Publier du contenu diffamatoire ou trompeur</li>
              <li>Utiliser le site web d'une manière qui pourrait désactiver, endommager ou surcharger le site web</li>
              <li>Utiliser des virus, des chevaux de Troie ou d'autres logiciels malveillants pour perturber le site web</li>
              <li>Collecter des données personnelles d'autres utilisateurs</li>
            </ul>
            
            <h2>Comptes utilisateurs</h2>
            <p>Lorsque vous créez un compte sur notre site web, vous acceptez que les informations que vous fournissez soient exactes, complètes et à jour à tout moment. Des informations inexactes, incomplètes ou obsolètes peuvent entraîner la résiliation immédiate de votre compte sur notre site web.</p>
            <p>Vous êtes responsable de la protection de votre mot de passe et de votre compte. Vous acceptez de ne pas divulguer votre mot de passe à un tiers. Vous êtes seul responsable de toute activité sur votre compte, que vous ayez ou non autorisé cette activité.</p>
            
            <h2>Produits et services</h2>
            <p>Notre site web propose des produits à la vente. Nous nous efforçons de décrire nos produits aussi précisément que possible. Cependant, nous ne garantissons pas que les descriptions des produits ou d'autres contenus de ce site sont exacts, complets, fiables, actuels ou sans erreur.</p>
            <p>Nous nous réservons le droit de modifier les prix des produits à tout moment. Nous nous réservons également le droit de refuser toute commande que vous passez avec nous. Nous pouvons, à notre seule discrétion, limiter ou annuler les quantités achetées par personne, par foyer ou par commande.</p>
            
            <h2>Paiements</h2>
            <p>Nous acceptons les modes de paiement suivants sur ce site web:</p>
            <ul>
              <li>Cartes de crédit</li>
              <li>PayPal</li>
            </ul>
            <p>Lorsque vous fournissez des informations de paiement, vous déclarez et garantissez que vous avez le droit légal d'utiliser tout mode de paiement en relation avec tout achat.</p>
            <p>En fournissant des informations de paiement, vous nous autorisez, ou un processeur de paiement tiers que nous utilisons, à facturer le montant dû à votre mode de paiement spécifié.</p>
            
            <h2>Expédition et livraison</h2>
            <p>Lorsque vous effectuez un achat sur notre site web, vous acceptez et reconnaissez que les délais d'expédition et de livraison peuvent varier en raison de facteurs indépendants de notre volonté.</p>
            <p>Vous acceptez de fournir une adresse de livraison précise et complète. Nous ne sommes pas responsables des retards ou des problèmes de livraison causés par des informations d'adresse incorrectes ou incomplètes.</p>
            
            <h2>Retours et remboursements</h2>
            <p>Notre politique de retour vous permet de retourner les articles dans les 30 jours suivant la réception. Pour être éligible à un retour, votre article doit être inutilisé et dans le même état que celui dans lequel vous l'avez reçu, et il doit être dans son emballage d'origine.</p>
            <p>Pour initier un retour, veuillez nous contacter avec votre numéro de commande et les détails de votre demande de retour.</p>
            <p>Une fois que nous aurons reçu et inspecté l'article retourné, nous vous enverrons un e-mail pour vous informer que nous avons reçu votre article retourné. Nous vous informerons également de l'approbation ou du rejet de votre remboursement.</p>
            
            <h2>Limitation de responsabilité</h2>
            <p>Purrify Inc. ou l'un de ses employés ne sera pas tenu responsable de tout problème découlant de ce site web. Néanmoins, Purrify Inc. et ses employés ne peuvent être tenus responsables de tout contenu spécial ou conséquent.</p>
            
            <h2>Indemnité</h2>
            <p>Vous acceptez d'indemniser Purrify Inc. et ses affiliés et de les tenir à l'écart de toute réclamation ou demande, y compris les frais d'avocat raisonnables, faite par un tiers en raison de ou découlant de votre violation de ces conditions d'utilisation ou des documents qu'elles incorporent par référence, ou de votre violation de toute loi ou des droits d'un tiers.</p>
            
            <h2>Loi applicable</h2>
            <p>Ces conditions d'utilisation sont régies et interprétées conformément aux lois du Canada et de la province de Québec.</p>
            
            <h2>Modifications des conditions d'utilisation</h2>
            <p>Nous nous réservons le droit de modifier ces conditions d'utilisation à tout moment. Votre utilisation continue de notre site web après toute modification de ces conditions d'utilisation constituera votre acceptation de ces modifications.</p>
            
            <h2>Nous contacter</h2>
            <p>Si vous avez des questions concernant ces conditions d'utilisation, veuillez nous contacter à l'adresse suivante:</p>
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