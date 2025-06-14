import { Container } from '@/components/ui/container';
import { NextPage } from "next";
import Head from "next/head";
import { SITE_NAME } from "@/lib/constants";
import { useTranslation } from "@/lib/translation-context";

const PrivacyPolicyPage: NextPage = () => {
  const { t } = useTranslation();
  
  return (
    <>
      <Head>
        <title>Politique de confidentialité | {SITE_NAME}</title>
        <meta name="description" content="Politique de confidentialité de Purrify - Additif de litière pour chat au charbon actif qui élimine les odeurs à la source." />
        <link rel="canonical" href="https://purrify.ca/fr/privacy-policy" />
        <link rel="alternate" hrefLang="fr" href="https://purrify.ca/fr/privacy-policy" />
        <link rel="alternate" hrefLang="en" href="https://purrify.ca/privacy-policy" />
      </Head>
      
      <section className="py-16 md:py-24">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Politique de confidentialité</h1>
            
            <div className="prose prose-lg">
              <p>Dernière mise à jour : 1er janvier 2023</p>
              
              <h2>1. Introduction</h2>
              <p>Chez Purrify, nous nous engageons à protéger votre vie privée. Cette Politique de confidentialité explique comment nous collectons, utilisons, divulguons et protégeons vos informations lorsque vous visitez notre site Web ou utilisez nos services.</p>
              
              <h2>2. Informations que nous collectons</h2>
              <p>Nous pouvons collecter les types d'informations suivants :</p>
              <ul>
                <li><strong>Informations personnelles</strong> : Nom, adresse e-mail, adresse postale, numéro de téléphone, informations de paiement.</li>
                <li><strong>Informations d'utilisation</strong> : Comment vous interagissez avec notre site, y compris les pages visitées, le temps passé sur ces pages, et d'autres données analytiques.</li>
                <li><strong>Informations sur l'appareil</strong> : Type d'appareil, système d'exploitation, type de navigateur, adresse IP.</li>
              </ul>
              
              <h2>3. Comment nous utilisons vos informations</h2>
              <p>Nous utilisons vos informations pour :</p>
              <ul>
                <li>Fournir, maintenir et améliorer nos services</li>
                <li>Traiter les transactions et envoyer des notifications connexes</li>
                <li>Répondre à vos commentaires, questions et demandes</li>
                <li>Communiquer avec vous à propos de nos produits, services et promotions</li>
                <li>Surveiller et analyser les tendances, l'utilisation et les activités</li>
                <li>Détecter, prévenir et résoudre les problèmes techniques ou de sécurité</li>
              </ul>
              
              <h2>4. Partage de vos informations</h2>
              <p>Nous pouvons partager vos informations avec :</p>
              <ul>
                <li><strong>Fournisseurs de services</strong> : Entreprises qui nous aident à fournir nos services (traitement des paiements, analyse de données, livraison d'e-mails, services d'hébergement).</li>
                <li><strong>Partenaires commerciaux</strong> : Avec votre consentement, nous pouvons partager vos informations avec des partenaires commerciaux sélectionnés.</li>
                <li><strong>Conformité légale</strong> : Lorsque nous croyons de bonne foi que la divulgation est nécessaire pour se conformer à la loi, protéger nos droits ou assurer la sécurité.</li>
              </ul>
              
              <h2>5. Sécurité des données</h2>
              <p>Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos informations personnelles contre l'accès non autorisé, l'altération, la divulgation ou la destruction.</p>
              
              <h2>6. Vos droits</h2>
              <p>Selon votre lieu de résidence, vous pouvez avoir certains droits concernant vos informations personnelles, notamment :</p>
              <ul>
                <li>Accéder à vos informations personnelles</li>
                <li>Corriger des informations inexactes</li>
                <li>Supprimer vos informations personnelles</li>
                <li>Restreindre ou s'opposer au traitement de vos informations</li>
                <li>Portabilité des données</li>
                <li>Retirer votre consentement</li>
              </ul>
              
              <h2>7. Cookies et technologies similaires</h2>
              <p>Nous utilisons des cookies et des technologies similaires pour collecter des informations sur votre activité, votre navigateur et votre appareil. Vous pouvez gérer vos préférences en matière de cookies via les paramètres de votre navigateur.</p>
              
              <h2>8. Marketing par e-mail</h2>
              <p>Avec votre consentement, nous pouvons vous envoyer des e-mails marketing sur nos produits et services. Vous pouvez vous désabonner à tout moment en utilisant le lien de désabonnement dans nos e-mails.</p>
              
              <h2>9. Enfants</h2>
              <p>Nos services ne sont pas destinés aux personnes de moins de 13 ans, et nous ne collectons pas sciemment des informations personnelles auprès d'enfants de moins de 13 ans.</p>
              
              <h2>10. Modifications de cette politique</h2>
              <p>Nous pouvons mettre à jour cette politique de temps à autre. Nous vous informerons de tout changement important en publiant la nouvelle politique sur cette page.</p>
              
              <h2>11. Contact</h2>
              <p>Si vous avez des questions concernant cette Politique de confidentialité, veuillez nous contacter à bonjour@purrify.ca.</p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default PrivacyPolicyPage;