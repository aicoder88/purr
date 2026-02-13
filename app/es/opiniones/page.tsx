export const dynamic = 'force-static';

import type { Metadata } from 'next';
import { Container } from '@/components/ui/container';
import { SITE_NAME } from '@/lib/constants';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Info, FlaskConical, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Opiniones Purrify | Comentarios de Clientes',
  description:
    'Lee comentarios de clientes sobre Purrify y aprende cómo usar un aditivo de carbón activado para controlar el olor de la caja de arena.',
  keywords:
    'purrify opiniones, purrify reseñas, desodorizante arena gatos opiniones, eliminador olores gatos, carbón activado arena gatos',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://www.purrify.ca/es/opiniones/',
    languages: {
      'en-CA': 'https://www.purrify.ca/reviews',
      'fr-CA': 'https://www.purrify.ca/fr/reviews',
      'zh-CN': 'https://www.purrify.ca/zh/reviews',
      'es-US': 'https://www.purrify.ca/es/opiniones',
      'en-US': 'https://www.purrify.ca/reviews',
      'x-default': 'https://www.purrify.ca/reviews',
    },
  },
  openGraph: {
    type: 'website',
    url: 'https://www.purrify.ca/es/opiniones/',
    siteName: SITE_NAME,
    title: 'Purrify Opiniones - Comentarios de Clientes',
    description:
      'Lee comentarios de clientes sobre Purrify y aprende cómo usar un aditivo de carbón activado para controlar el olor de la caja de arena.',
    locale: 'es_ES',
    images: [
      {
        url: 'https://www.purrify.ca/optimized/three_bags_no_bg.webp',
        width: 1200,
        height: 800,
        alt: 'Purrify Opiniones',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Purrify Opiniones - Comentarios de Clientes',
    description:
      'Lee comentarios de clientes sobre Purrify y aprende cómo usar un aditivo de carbón activado para controlar el olor de la caja de arena.',
    images: ['https://www.purrify.ca/optimized/three_bags_no_bg.webp'],
  },
};

export default function OpinionesPage() {
  return (
    <div className="py-16 bg-gradient-to-br from-[#FFFFFF] via-[#FFFFF5] to-[#FFFFFF] dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <Container>
        <div className="max-w-5xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
              <li>
                <Link href="/" className="hover:text-[#FF3131] transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <ChevronRight className="w-4 h-4 text-gray-400 dark:text-gray-500" />
              </li>
              <li className="text-[#FF3131]">Opiniones</li>
            </ol>
          </nav>

          {/* Language Toggle */}
          <div className="flex justify-end mb-4">
            <Link
              href="/reviews"
              className="text-sm text-gray-600 dark:text-gray-300 hover:text-[#FF3131] transition-colors"
            >
              English
            </Link>
          </div>

          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-1 bg-[#E0EFC7] rounded-full text-[#FF3131] font-medium text-sm mb-4">
              Comentarios de Clientes
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight mb-6 text-gray-900 dark:text-gray-50">
              Opiniones Sobre Purrify
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              No publicamos calificaciones agregadas ni afirmaciones de &quot;reseñas verificadas&quot; en el sitio hasta
              que el sistema de reseñas de terceros esté listo.
            </p>
          </div>

          {/* What you can verify now */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
              <div className="w-10 h-10 rounded-full bg-[#FF3131]/10 flex items-center justify-center mb-3">
                <Info className="w-5 h-5 text-[#FF3131]" />
              </div>
              <h2 className="font-heading font-bold text-gray-900 dark:text-gray-50 mb-2">
                Transparencia primero
              </h2>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                Publicaremos reseñas y métricas solo cuando podamos respaldarlas con un sistema confiable.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
              <div className="w-10 h-10 rounded-full bg-[#FF3131]/10 flex items-center justify-center mb-3">
                <FlaskConical className="w-5 h-5 text-[#FF3131]" />
              </div>
              <h3 className="font-heading font-bold text-gray-900 dark:text-gray-50 mb-2">
                Verifica la ciencia
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                Consulta fuentes primarias y guías autorizadas sobre la adsorción del carbón activado.
              </p>
              <Link
                href="/science"
                className="inline-flex mt-3 text-sm font-semibold text-[#FF3131] hover:text-[#FF3131]/80 transition-colors"
              >
                Ver citas de investigación
              </Link>
            </div>

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
              <div className="w-10 h-10 rounded-full bg-[#FF3131]/10 flex items-center justify-center mb-3">
                <Mail className="w-5 h-5 text-[#FF3131]" />
              </div>
              <h3 className="font-heading font-bold text-gray-900 dark:text-gray-50 mb-2">
                Compartir comentarios
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                Si quieres compartir tu experiencia o una foto, escríbenos y lo enviaremos a soporte.
              </p>
              <Link
                href="/contact"
                className="inline-flex mt-3 text-sm font-semibold text-[#FF3131] hover:text-[#FF3131]/80 transition-colors"
              >
                Contacto
              </Link>
            </div>
          </div>

          {/* What is Purrify */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-8 mb-16">
            <h2 className="font-heading text-2xl font-bold text-gray-900 dark:text-gray-50 mb-6 text-center">
              ¿Qué es Purrify?
            </h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-gray-700 dark:text-gray-200 mb-4">
                  Purrify es un aditivo de arena para gatos a base de carbón activado. Está diseñado para atrapar olores
                  a nivel molecular (adsorción), sin perfumes.
                </p>
                <ul className="space-y-2 text-gray-700 dark:text-gray-200">
                  <li>Sin fragancia</li>
                  <li>Funciona con la mayoría de tipos de arena</li>
                  <li>Se mezcla en la capa superior</li>
                </ul>
              </div>
              <div className="text-center">
                <Image
                  src="/optimized/three-bags-no-bg.webp"
                  alt="Productos Purrify"
                  width={420}
                  height={420}
                  className="max-w-xs mx-auto"
                />
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-[#FF3131]/10 to-[#E0EFC7] border border-[#FF3131]/20 rounded-xl p-8">
              <h2 className="font-heading text-2xl font-bold text-gray-900 dark:text-gray-50 mb-4">
                ¿Listo para probarlo?
              </h2>
              <p className="text-gray-700 dark:text-gray-200 mb-6 max-w-2xl mx-auto">
                Comienza con una prueba de bajo riesgo y decide con resultados en casa.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/products/"
                  className="inline-block bg-[#FF3131] text-white dark:text-gray-100 px-8 py-3 rounded-lg font-semibold hover:bg-[#FF3131]/90 transition-colors"
                >
                  Comprar
                </Link>
                <Link
                  href="/free"
                  className="inline-block border border-[#FF3131] text-[#FF3131] px-8 py-3 rounded-lg font-semibold hover:bg-[#FF3131]/5 transition-colors"
                >
                  Probar muestra
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

