import { Container } from '@/components/ui/container';
import { NextPage } from "next";
import Head from "next/head";
import { SITE_NAME } from "@/lib/constants";
import { useTranslation } from "@/lib/translation-context";

const TermsPage: NextPage = () => {
  const { t } = useTranslation();
  
  return (
    <>
      <Head>
        <title>Conditions d'utilisation | {SITE_NAME}</title>
        <meta name="description" content="Conditions d'utilisation de Purrify - Additif de litière pour chat au charbon actif qui élimine les odeurs à la source." />
        <link rel="canonical" href="https://purrify.ca/fr/terms" />
        <link rel="alternate" hrefLang="fr" href="https://purrify.ca/fr/terms" />
        <link rel="alternate" hrefLang="en" href="https://purrify.ca/terms" />
      </Head>
      
      <section className="py-16 md:py-24">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Conditions d'utilisation</h1>
            
            <div className="prose prose-lg">
              <p>Dernière mise à jour : 1er janvier 2023</p>
              
              <h2>1. Acceptation des conditions</h2>
              <p>En accédant et en utilisant le site Web de Purrify (le "Site"), vous acceptez d'être lié par ces Conditions d'utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre Site.</p>
              
              <h2>2. Modifications des conditions</h2>
              <p>Purrify se réserve le droit de modifier ces conditions à tout moment. Les modifications entreront en vigueur dès leur publication sur le Site. Votre utilisation continue du Site après la publication de modifications constitue votre acceptation de ces modifications.</p>
              
              <h2>3. Utilisation du site</h2>
              <p>Vous acceptez d'utiliser le Site uniquement à des fins légales et d'une manière qui ne porte pas atteinte aux droits de tiers ou ne restreint ou n'empêche pas l'utilisation et la jouissance du Site par quiconque.</p>
              
              <h2>4. Propriété intellectuelle</h2>
              <p>Tout le contenu présent sur ce Site, y compris, mais sans s'y limiter, le texte, les graphiques, les logos, les icônes, les images, les clips audio, les téléchargements numériques et les compilations de données, est la propriété de Purrify ou de ses fournisseurs de contenu et est protégé par les lois canadiennes et internationales sur le droit d'auteur.</p>
              
              <h2>5. Comptes utilisateurs</h2>
              <p>Certaines fonctionnalités du Site peuvent nécessiter l'enregistrement d'un compte. Vous êtes responsable du maintien de la confidentialité de vos informations de compte et de toutes les activités qui se produisent sous votre compte.</p>
              
              <h2>6. Politique de confidentialité</h2>
              <p>Votre utilisation du Site est également régie par notre Politique de confidentialité, qui est incorporée ici par référence.</p>
              
              <h2>7. Produits et services</h2>
              <p>Tous les produits et services offerts sur le Site sont soumis à nos Conditions de vente.</p>
              
              <h2>8. Liens vers des sites tiers</h2>
              <p>Notre Site peut contenir des liens vers des sites Web tiers. Ces liens sont fournis uniquement pour votre commodité. Purrify n'a aucun contrôle sur le contenu de ces sites et n'assume aucune responsabilité pour le contenu de tout site lié ou tout lien contenu dans un site lié.</p>
              
              <h2>9. Limitation de responsabilité</h2>
              <p>Dans toute la mesure permise par la loi, Purrify ne sera pas responsable des dommages directs, indirects, accessoires, consécutifs ou punitifs résultant de votre accès ou de votre utilisation du Site.</p>
              
              <h2>10. Indemnisation</h2>
              <p>Vous acceptez d'indemniser et de dégager de toute responsabilité Purrify et ses dirigeants, administrateurs, employés et agents contre toute réclamation, responsabilité, dommage, perte et dépense, y compris les frais juridiques raisonnables, découlant de votre violation de ces Conditions d'utilisation.</p>
              
              <h2>11. Loi applicable</h2>
              <p>Ces Conditions d'utilisation sont régies par les lois de la province de Québec et les lois fédérales du Canada applicables, sans égard aux principes de conflit de lois.</p>
              
              <h2>12. Contact</h2>
              <p>Si vous avez des questions concernant ces Conditions d'utilisation, veuillez nous contacter à bonjour@purrify.ca.</p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default TermsPage;