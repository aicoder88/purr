export const dynamic = 'force-static';

import type { Metadata } from 'next';
import { Container } from '@/components/ui/container';
import { SITE_NAME } from '@/lib/constants';
import Link from 'next/link';
import Image from 'next/image';
import { Star, Quote, CheckCircle, Users, Calendar, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: `Opiniones Purrify | Reseñas Verificadas`,
  description: 'Lee opiniones verificadas de Purrify. Descubre por qué 1,000+ dueños de gatos confían en Purrify para eliminar olores naturalmente. Reseñas reales.',
  keywords: 'purrify opiniones, purrify reseñas, desodorizante arena gatos opiniones, eliminador olores gatos, carbón activado arena gatos',
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: 'https://www.purrify.ca/es/opiniones',
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
    url: 'https://www.purrify.ca/es/opiniones',
    siteName: SITE_NAME,
    title: 'Purrify Opiniones - Reseñas de Clientes Verificados',
    description: 'Descubre por qué 1,000+ dueños de gatos confían en Purrify para eliminar olores con carbón activado natural.',
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
    title: 'Purrify Opiniones - Reseñas Verificadas',
    description: 'Lee opiniones reales de dueños de gatos que eliminaron olores con Purrify.',
    images: ['https://www.purrify.ca/optimized/three_bags_no_bg.webp'],
  },
};

export default function OpinionesPage() {
  const reviews = [
    {
      id: 1,
      name: "Sarah M.",
      location: "Montreal, QC",
      rating: 5,
      date: "Enero 2024",
      title: "Un cambio total para mi apartamento",
      review: "Vivo en un apartamento estudio con dos gatos, y el olor de la caja de arena era insoportable. Purrify eliminó completamente el olor en 24 horas. Al principio dudé del precio, pero dura mucho más que otros productos. Vale cada centavo.",
      verified: true,
      productUsed: "50g Tamaño Regular",
      catsOwned: 2,
      useCase: "Control de olores en apartamentos"
    },
    {
      id: 2,
      name: "Michael R.",
      location: "Toronto, ON",
      rating: 5,
      date: "Febrero 2024",
      title: "Por fin encontré algo que funciona",
      review: "Después de probar Arm & Hammer, Fresh Step, y muchos otros desodorizantes, Purrify es el único que realmente elimina los olores en lugar de solo enmascararlos. Mis invitados ya ni saben que tengo gatos. La tecnología de carbón activado realmente funciona.",
      verified: true,
      productUsed: "120g Tamaño Grande",
      catsOwned: 3,
      useCase: "Hogar con múltiples gatos"
    },
    {
      id: 3,
      name: "Jennifer L.",
      location: "Vancouver, BC",
      rating: 5,
      date: "Marzo 2024",
      title: "Funcionó bien para mi gatito sensible",
      review: "Mi gatito de 4 meses tiene sensibilidades respiratorias, así que fui cautelosa con los aditivos. Purrify es sin fragancia — no noté ningún problema después de una introducción gradual. Enfoque suave y muy efectivo.",
      verified: true,
      productUsed: "12g Tamaño de Prueba",
      catsOwned: 1,
      useCase: "Uso con gatitos"
    },
    {
      id: 4,
      name: "David K.",
      location: "Calgary, AB",
      rating: 5,
      date: "Diciembre 2023",
      title: "Mejor valor de lo esperado",
      review: "Inicialmente pensé que era caro, pero cuando calculé el costo por día, es en realidad más barato que comprar Arm & Hammer cada semana. Una bolsa de 50g me dura casi 2 meses con un gato. Solo la conveniencia vale la pena.",
      verified: true,
      productUsed: "50g Tamaño Regular",
      catsOwned: 1,
      useCase: "Solución económica"
    },
    {
      id: 5,
      name: "Lisa T.",
      location: "Ottawa, ON",
      rating: 5,
      date: "Enero 2024",
      title: "Simple y efectivo",
      review: "Hecho de carbón activado de cáscara de coco y completamente sin fragancia. Funciona muy bien y me gusta lo sencillo que es. Mis gatos no tuvieron ningún problema con el cambio.",
      verified: true,
      productUsed: "50g Tamaño Regular",
      catsOwned: 2,
      useCase: "Opción sin fragancia"
    },
    {
      id: 6,
      name: "Robert H.",
      location: "Halifax, NS",
      rating: 5,
      date: "Febrero 2024",
      title: "Recomendado por veterinario",
      review: "Mi veterinario realmente recomendó Purrify cuando mencioné los olores de la caja de arena. Dijo que el carbón activado es la opción más establecida y efectiva para gatos — el mismo tipo usado en filtros de agua. Lo he usado por 3 meses y no podría estar más feliz.",
      verified: true,
      productUsed: "120g Tamaño Grande",
      catsOwned: 2,
      useCase: "Recomendado por veterinario"
    }
  ];

  const stats = [
    { label: "Calificación Promedio", value: "4.9/5", icon: Star },
    { label: "Opiniones Verificadas", value: "138", icon: CheckCircle },
    { label: "Clientes Felices", value: "1,000+", icon: Users },
    { label: "Meses en el Mercado", value: "18", icon: Calendar }
  ];

  // JSON-LD Schema
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Purrify Desodorizante de Arena para Gatos",
    "review": reviews.slice(0, 3).map(review => ({
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating,
        "bestRating": "5"
      },
      "author": {
        "@type": "Person",
        "name": review.name
      },
      "reviewBody": review.review,
      "datePublished": review.date
    }))
  };

  return (
    <>
      {/* Schema.org structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />

      <div className="py-16 bg-gradient-to-br from-[#FFFFFF] via-[#FFFFF5] to-[#FFFFFF] dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        <Container>
          <div className="max-w-6xl mx-auto">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <ol className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                <li><Link href="/" className="hover:text-[#FF3131]">Inicio</Link></li>
                <li>/</li>
                <li className="text-[#FF3131]">Opiniones</li>
              </ol>
            </nav>

            {/* Language Toggle */}
            <div className="flex justify-end mb-4">
              <Link
                href="/reviews"
                className="text-sm text-gray-600 dark:text-gray-300 hover:text-[#FF3131] flex items-center gap-1"
              >
                <span>English</span>
              </Link>
            </div>

            {/* Header */}
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-1 bg-[#E0EFC7] rounded-full text-[#FF3131] font-medium text-sm mb-4">
                Opiniones de Clientes
              </div>
              <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight mb-6 text-gray-900 dark:text-gray-50">
                Historias Reales de Dueños de Gatos Felices
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
                Descubre por qué más de 1,000 dueños de gatos canadienses confían en Purrify para eliminar
                los olores de la caja de arena de forma natural. Lee opiniones verificadas de clientes reales.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                {stats.map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <div key={index} className="text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-[#FF3131]/10 rounded-full mb-3">
                        <IconComponent className="h-6 w-6 text-[#FF3131]" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-gray-50">{stat.value}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Reviews Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {reviews.map((review) => (
                <div key={review.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-10 h-10 bg-[#FF3131]/10 rounded-full flex items-center justify-center">
                        <span className="text-[#FF3131] font-semibold text-sm">
                          {review.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-gray-50">{review.name}</div>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <MapPin className="h-3 w-3 mr-1" />
                          {review.location}
                        </div>
                      </div>
                    </div>
                    {review.verified && (
                      <div className="flex items-center text-green-600 dark:text-green-400 text-xs">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Verificado
                      </div>
                    )}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">{review.date}</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-heading font-semibold text-gray-900 dark:text-gray-50 mb-3">{review.title}</h3>

                  {/* Review */}
                  <div className="relative mb-4">
                    <Quote className="absolute -top-2 -left-2 h-6 w-6 text-[#FF3131]/20" />
                    <p className="text-gray-700 dark:text-gray-200 text-sm leading-relaxed pl-4">
                      {review.review}
                    </p>
                  </div>

                  {/* Product Details */}
                  <div className="border-t border-gray-100 dark:border-gray-700 pt-4 space-y-2 text-xs text-gray-600 dark:text-gray-300">
                    <div><strong>Producto:</strong> {review.productUsed}</div>
                    <div><strong>Gatos:</strong> {review.catsOwned}</div>
                    <div><strong>Uso:</strong> {review.useCase}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust Indicators */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl p-8 mb-16">
              <div className="text-center">
                <h2 className="font-heading text-2xl font-bold text-blue-900 dark:text-blue-100 mb-4">Por Qué los Clientes Confían en Purrify</h2>
                <div className="grid md:grid-cols-3 gap-6 text-blue-800 dark:text-blue-200">
                  <div className="text-center">
                    <CheckCircle className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
                    <h3 className="font-heading font-semibold mb-2">Opiniones Verificadas</h3>
                    <p className="text-sm">Todas las opiniones son de compradores verificados que han usado productos Purrify.</p>
                  </div>
                  <div className="text-center">
                    <Star className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
                    <h3 className="font-heading font-semibold mb-2">Calificación 4.9/5</h3>
                    <p className="text-sm">Calificaciones consistentemente altas en todos los tamaños de productos.</p>
                  </div>
                  <div className="text-center">
                    <Users className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
                    <h3 className="font-heading font-semibold mb-2">1,000+ Clientes</h3>
                    <p className="text-sm">Comunidad creciente de dueños de gatos satisfechos en Canadá.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* What is Purrify Section */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl p-8 mb-16">
              <h2 className="font-heading text-2xl font-bold text-gray-900 dark:text-gray-50 mb-6 text-center">
                ¿Qué es Purrify?
              </h2>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <p className="text-gray-700 dark:text-gray-200 mb-4">
                    Purrify es un desodorizante natural para arena de gatos hecho de <strong>carbón activado de cáscara de coco</strong>.
                    A diferencia de los productos con fragancia que solo enmascaran los olores, Purrify atrapa y elimina
                    las moléculas de amoníaco de forma permanente.
                  </p>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-200">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400" />
                      <span>100% natural y sin fragancia</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400" />
                      <span>Seguro para gatos y gatitos</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400" />
                      <span>Funciona con cualquier tipo de arena</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400" />
                      <span>Dura hasta 30 días por aplicación</span>
                    </li>
                  </ul>
                </div>
                <div className="text-center">
                  <Image
                    src="/optimized/three-bags-no-bg.webp"
                    alt="Productos Purrify - Desodorizante de carbón activado para arena de gatos"
                    width={400}
                    height={400}
                    className="max-w-xs mx-auto"
                  />
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <div className="bg-gradient-to-r from-[#FF3131]/10 to-[#E0EFC7] border border-[#FF3131]/20 rounded-xl p-8">
                <h2 className="font-heading text-2xl font-bold text-gray-900 dark:text-gray-50 mb-4">
                  Únete a 1,000+ Dueños de Gatos Felices
                </h2>
                <p className="text-gray-700 dark:text-gray-200 mb-6 max-w-2xl mx-auto">
                  Experimenta los mismos resultados que nuestros clientes verificados. Prueba Purrify
                  y descubre por qué es el desodorizante natural más confiable de Canadá.
                </p>
                <div className="space-x-4">
                  <Link
                    href="/products"
                    className="inline-block bg-[#FF3131] text-white dark:text-gray-100 px-8 py-3 rounded-lg font-semibold hover:bg-[#FF3131]/90 transition-colors"
                  >
                    Comprar Ahora
                  </Link>
                  <Link
                    href="/free"
                    className="inline-block border border-[#FF3131] text-[#FF3131] px-8 py-3 rounded-lg font-semibold hover:bg-[#FF3131]/5 transition-colors"
                  >
                    Prueba Gratis
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
