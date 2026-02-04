#!/usr/bin/env node
/**
 * Optimize partner resource documents with:
 * - Footer navigation links
 * - Basic SEO meta tags (NO fabricated images or hashtags)
 * - Structured data
 * - Hreflang tags for multilingual content
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOCS_BASE = path.join(__dirname, '../public/documents');

// Document definitions with real metadata
const documents = {
  '01': {
    en: { file: 'employee-training-guide', title: 'Employee Training Guide', type: 'TechArticle', desc: 'Comprehensive retail training guide for Purrify activated coconut carbon odor eliminator' },
    fr: { file: 'guide-formation-employes', title: 'Guide de Formation Employés', type: 'TechArticle', desc: 'Guide de formation complet pour les détaillants Purrify' },
    es: { file: 'guia-capacitacion-empleados', title: 'Guía de Capacitación de Empleados', type: 'TechArticle', desc: 'Guía de capacitación completa para minoristas Purrify' }
  },
  '02': {
    en: { file: 'profit-calculator', title: 'Profit Calculator', type: 'SoftwareApplication', desc: 'Calculate your store profit potential with margin analysis and ROI scenarios' },
    fr: { file: 'calculateur-profits', title: 'Calculateur de Profits', type: 'SoftwareApplication', desc: 'Calculez le potentiel de profit de votre magasin' },
    es: { file: 'calculadora-ganancias', title: 'Calculadora de Ganancias', type: 'SoftwareApplication', desc: 'Calcule el potencial de ganancias de su tienda' }
  },
  '03': {
    en: { file: 'pos-display-guide', title: 'POS Display Guide', type: 'HowTo', desc: 'Complete point-of-sale merchandising and display strategies for maximum sales' },
    fr: { file: 'guide-affichage-pdv', title: 'Guide d\'Affichage PDV', type: 'HowTo', desc: 'Stratégies complètes de marchandisage au point de vente' },
    es: { file: 'guia-exhibicion-pdv', title: 'Guía de Exhibición PDV', type: 'HowTo', desc: 'Estrategias completas de comercialización en punto de venta' }
  },
  '04': {
    en: { file: 'quick-reference-card', title: 'Quick Reference Card', type: 'Article', desc: 'Pocket-sized quick reference with key benefits, pricing, and objection handling' },
    fr: { file: 'carte-reference-rapide', title: 'Carte de Référence Rapide', type: 'Article', desc: 'Référence rapide de poche avec avantages clés et tarification' },
    es: { file: 'tarjeta-referencia-rapida', title: 'Tarjeta de Referencia Rápida', type: 'Article', desc: 'Referencia rápida de bolsillo con beneficios clave y precios' }
  },
  '05': {
    en: { file: 'customer-faq-handout', title: 'Customer FAQ', type: 'FAQPage', desc: 'Top 10 customer questions answered - perfect handout for customers at the register' },
    fr: { file: 'faq-clients', title: 'FAQ Clients', type: 'FAQPage', desc: 'Top 10 questions clients répondues - parfait pour les clients' },
    es: { file: 'faq-clientes', title: 'FAQ para Clientes', type: 'FAQPage', desc: 'Top 10 preguntas de clientes respondidas - perfecto para entregar en caja' }
  }
};

function generateFooterLinks(lang, docNum) {
  const langMap = { en: 'english', fr: 'french', es: 'spanish' };
  const langDir = langMap[lang];

  const relatedDocs = Object.entries(documents)
    .filter(([num]) => num !== docNum)
    .slice(0, 3)
    .map(([num, langs]) => langs[lang])
    .filter(Boolean);

  const footerHTML = `
    <div style="margin: 20px 0; padding: 15px; background: #E8F0FE; border-radius: 5px; page-break-inside: avoid;">
      <p style="margin: 0 0 10px 0;"><strong>📚 More Resources:</strong></p>
      <p style="margin: 5px 0;"><a href="/documents/" style="color: #4A90E2; text-decoration: none;">← Back to Resource Center</a></p>
${relatedDocs.map(doc => `      <p style="margin: 5px 0;"><a href="/documents/${langDir}/${documents[Object.keys(documents).find(k => documents[k][lang]?.file === doc.file)][lang].file}.html" style="color: #4A90E2; text-decoration: none;">${doc.title}</a></p>`).join('\n')}
    </div>

    <div style="margin: 20px 0; padding: 15px; background: #FFF9E6; border-radius: 5px; page-break-inside: avoid;">
      <p style="margin: 0 0 10px 0;"><strong>🌐 Online:</strong></p>
      <p style="margin: 5px 0;"><a href="https://www.purrify.ca" style="color: #4A90E2; text-decoration: none;">Visit Purrify.ca →</a></p>
      <p style="margin: 5px 0;"><a href="https://www.purrify.ca/products/standard" style="color: #4A90E2; text-decoration: none;">${lang === 'en' ? 'View Product Details' : lang === 'fr' ? 'Voir les Détails du Produit' : 'Ver Detalles del Producto'}</a></p>
      <p style="margin: 5px 0;"><a href="https://www.purrify.ca/blog" style="color: #4A90E2; text-decoration: none;">${lang === 'en' ? 'Educational Blog & Resources' : lang === 'fr' ? 'Blog Éducatif & Ressources' : 'Blog Educativo y Recursos'}</a></p>
      <p style="margin: 5px 0;"><a href="https://en.wikipedia.org/wiki/Activated_carbon" target="_blank" rel="noopener" style="color: #4A90E2; text-decoration: none;">${lang === 'en' ? 'Learn About Activated Carbon' : lang === 'fr' ? 'En savoir plus sur le Charbon Actif' : 'Aprende sobre el Carbón Activado'} (Wikipedia)</a></p>
    </div>
`;

  return footerHTML;
}

function generateSEOTags(lang, docNum, meta) {
  const langMap = { en: 'english', fr: 'french', es: 'spanish' };
  const langFull = { en: 'en_US', fr: 'fr_CA', es: 'es_ES' };
  const langDir = langMap[lang];
  const fileName = `${docNum}-${meta.file}.html`;
  const canonicalUrl = `https://www.purrify.ca/documents/${langDir}/${fileName}`;

  // Get alternates
  const alternates = Object.keys(documents[docNum])
    .map(l => {
      const altMeta = documents[docNum][l];
      return `    <link rel="alternate" hreflang="${l}" href="https://www.purrify.ca/documents/${langMap[l]}/${docNum}-${altMeta.file}.html">`;
    })
    .join('\n');

  return `
    <!-- Primary Meta Tags -->
    <title>Purrify ${meta.title} | Cat Litter Odor Eliminator Partner Resources</title>
    <meta name="title" content="Purrify ${meta.title} | Cat Litter Odor Eliminator Partner Resources">
    <meta name="description" content="${meta.desc}">
    <meta name="robots" content="index, follow">
    <meta name="language" content="${lang === 'en' ? 'English' : lang === 'fr' ? 'Français' : 'Español'}">
    <meta name="author" content="Purrify">

    <!-- Canonical URL -->
    <link rel="canonical" href="${canonicalUrl}">

    <!-- Hreflang Tags for Multilingual Content -->
${alternates}
    <link rel="alternate" hreflang="x-default" href="https://www.purrify.ca/documents/english/${docNum}-${documents[docNum].en.file}.html">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="article">
    <meta property="og:url" content="${canonicalUrl}">
    <meta property="og:title" content="Purrify ${meta.title}">
    <meta property="og:description" content="${meta.desc}">
    <meta property="og:image" content="https://www.purrify.ca/images/140g.jpg">
    <meta property="og:site_name" content="Purrify">
    <meta property="og:locale" content="${langFull[lang]}">

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="${canonicalUrl}">
    <meta property="twitter:title" content="Purrify ${meta.title}">
    <meta property="twitter:description" content="${meta.desc}">
    <meta property="twitter:image" content="https://www.purrify.ca/images/140g.jpg">

    <!-- Structured Data / JSON-LD -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "${meta.type}",
      "headline": "Purrify ${meta.title}",
      "description": "${meta.desc}",
      "author": {
        "@type": "Organization",
        "name": "Purrify",
        "url": "https://www.purrify.ca"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Purrify",
        "url": "https://www.purrify.ca",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.purrify.ca/images/Logos/icon-512.png"
        }
      },
      "datePublished": "2026-01-19",
      "dateModified": "2026-01-19",
      "inLanguage": "${lang}",
      "isAccessibleForFree": true,
      "isPartOf": {
        "@type": "WebSite",
        "name": "Purrify Partner Resources",
        "url": "https://www.purrify.ca/documents/"
      }
    }
    </script>
`;
}

function processDocument(docNum, lang, meta) {
  const langMap = { en: 'english', fr: 'french', es: 'spanish' };
  const langDir = langMap[lang];
  const fileName = `${docNum}-${meta.file}.html`;
  const filePath = path.join(DOCS_BASE, langDir, fileName);

  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  Skipping ${fileName} (not found)`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf-8');

  // Check if already optimized (has canonical link)
  if (content.includes('<link rel="canonical"')) {
    console.log(`✓ ${fileName} already optimized`);
    return;
  }

  // Add SEO tags after charset/viewport
  const seoTags = generateSEOTags(lang, docNum, meta);
  content = content.replace(
    /(<meta name="viewport"[^>]*>)/,
    `$1\n${seoTags}`
  );

  // Add footer links before closing footer div
  const footerLinks = generateFooterLinks(lang, docNum);
  content = content.replace(
    /(<p[^>]*>©\s*2026\s*Purrify[^<]*<\/p>\s*<\/div>\s*<\/body>)/i,
    `${footerLinks}\n\n        $1`
  );

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`✅ Optimized ${fileName}`);
}

// Process all documents
console.log('🚀 Optimizing Purrify partner documents...\n');

for (const [docNum, langs] of Object.entries(documents)) {
  for (const [lang, meta] of Object.entries(langs)) {
    processDocument(docNum, lang, meta);
  }
}

console.log('\n✨ Done! All documents optimized.');
