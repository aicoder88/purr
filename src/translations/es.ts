import { CONTACT_INFO } from '../lib/constants';
import { TranslationType } from './types';

export const es: TranslationType = {
  // Common
  siteName: "Purrify",
  siteDescription: "Deja de avergonzarte por el olor de la arena para gatos. El carbon activado de grado filtro de agua elimina el olor a amoniaco al instante. Sin mas caja de arena apestosa - los invitados pensaran que no tienes gatos. Envios a EE.UU. y Canada.",

  // Navigation
  nav: {
    home: "Inicio",
    products: "Productos",
    learn: "Aprender",
    howItWorks: "Como Funciona",
    about: "Nosotros",
    whyPurrify: "Por que Purrify",
    tryFree: "Prueba GRATIS",
    testimonials: "Testimonios",
    leaveReview: "Dejar Opinion",
    contact: "Contacto",
    blog: "Blog",
    privacyPolicy: "Politica de Privacidad",
    termsOfService: "Terminos de Servicio",
    // Dropdown items
    trialSize: "Prueba GRATIS (Solo Paga Envio)",
    compareSizes: "Comparar Tamanos",
    viewAllProducts: "Ver Todos los Productos",
    howItWorksPage: "Como Funciona",
    faq: "Preguntas Frecuentes",
    science: "Ciencia",
    buyNow: "Comprar Ahora",
    retailers: "Para Minoristas",
    wholesalePricing: "Precios Mayoristas",
    becomePartner: "Ser Socio",
    marketingSupport: "Soporte de Marketing",
    shipsToUSA: "Envios a EE.UU.",
    // Learn dropdown items
    safetyInfo: "Informacion de Seguridad",
    activatedCarbonBenefits: "Beneficios del Carbon Activado",
    catLitterGuide: "Guia de Arena para Gatos",
    howToUse: "Como Usar",
    technologyComparison: "Comparacion de Tecnologias",
    solutions: "Soluciones",
    // Solutions dropdown items
    ammoniaSmellControl: "Control de Olor a Amoniaco",
    apartmentLiving: "Vida en Apartamento",
    litterBoxOdor: "Olor de Caja de Arena",
    multipleCats: "Multiples Gatos",
    naturalAdditive: "Aditivo Natural",
    seniorCats: "Gatos Mayores",
    // UI elements
    toggleMenu: "Alternar menu",
    toggleTheme: "Alternar tema",
    signOut: "Cerrar Sesion",
    signedIn: "Sesion Iniciada"
  },

  locationsMenu: {
    selectProvince: "Selecciona una Provincia",
    hoverPrompt: "Pasa el cursor sobre una provincia para ver las ciudades.",
    provinceCitiesHeading: "Ciudades de {{province}}",
    viewProvinceGuide: "Ver la guia de la provincia de {{province}}"
  },

  seoKeywords: {
    headTerms: [
      'olor arena gatos',
      'olor caja arena gatos',
      'eliminador olor arena gatos',
      'mejor arena para gatos sin olor',
      'desodorizante arena gatos'
    ],
    symptomVariants: [
      'fuerte olor amoniaco arena gatos',
      'olor caja arena en apartamento',
      'por que huele tan mal la caja de arena',
      'olor arena gatos vergonzoso con invitados'
    ],
    solutionVariants: [
      'eliminador natural olor arena gatos',
      'aditivo carbon activado arena gatos',
      'desodorizante arena gatos sin perfume',
      'como neutralizar olor arena gatos rapido'
    ],
    modifiers: {
      housing: ['condominio', 'apartamento', 'sotano', 'hogar multi-gatos'],
      seasonal: ['invierno ventanas cerradas', 'verano humedo', 'invierno canadiense', 'temporada lluviosa'],
      retailer: ['PetSmart', 'Pet Valu', 'Global Pet Foods', 'Bosleys', 'Ren\'s Pets']
    }
  },

  // Products
  products: {
    "purrify-12g": {
      name: "Prueba GRATIS",
      description: "Prueba nuestro desodorizante de arena GRATIS!\nSolo $4.76 de envio a cualquier lugar de Canada\n\nAditivo natural de carbon - Limite uno por cliente"
    },
    "purrify-50g": {
      name: "Purrify 50g Estandar",
      description: "El Mejor Desodorizante de Arena para Gatos Solos\nEl mas popular! Nuestro aditivo de carbon activado te da un mes sin olores. Deja de temer la limpieza de la caja."
    },
    "purrify-120g": {
      name: "Regular",
      description: "Desodorizante de Arena para Hogares Multi-Gatos\nPara hogares con 2+ gatos. Nuestro aditivo de carbon elimina hasta el olor a amoniaco mas fuerte. Tus invitados quedaran asombrados."
    }
  },

  pricing: {
    oneTimeLabel: "Compra unica",
    autoshipLabel: "Autoenvio y Ahorra",
    autoshipBestLabel: "Mejor Valor Autoenvio",
    billedEvery: "Facturado cada",
    months: "meses",
    shippingIncluded: "Envio incluido",
    freeShipping: "Envio gratis incluido",
    plusShipping: "+ envio",
    shippingCalculated: "Envio calculado al pagar",
    startAutoship: "Iniciar Autoenvio",
    buyNow: "Comprar Ahora",
    linkComingSoon: "Enlace de pago proximamente",
    recommended: "Mas recomendado",
    perMonth: "aprox. {price}/mes",
    saveVsOneTime: "Ahorra {percent}% vs compra unica",
    trialSizeSection: "Prueba GRATIS - Solo Paga Envio",
    quarterlyAutoshipSection: "Suscribete y Ahorra - Autoenvio Trimestral",
    stripeShippingNote: "el producto se enviara a la direccion de envio de Stripe EN LA SIGUIENTE PAGINA"
  },

  announcementBar: {
    freeShipping: {
      line1: 'Envio Gratis',
      line2: 'en Todas las Ordenes de Suscripcion',
    },
    madeInCanada: {
      line1: 'Fabricado en Canada',
      line2: 'con Ingredientes Domesticos y de Origen Global',
    },
    naturalCarbon: {
      line1: 'Ingredientes no toxicos',
      line2: 'Hecho de 100% carbon activado de coco natural',
    },
    socialProof: {
      line1: 'Sin quimicos, fragancias ni aditivos',
      line2: 'Usado por miles de duenos de gatos en Canada',
    },
    moneyBack: {
      line1: 'Garantia de 30 Dias',
      line2: 'No satisfecho? Reembolso completo, sin preguntas',
    },
  },

  // Hero Section
  hero: {
    catLitter: "Eliminador de Olores de Arena para Gatos",
    rabbitLitter: "Desodorizante de Arena para Conejos",
    fridgeSmells: "Control de Olores del Refrigerador",
    ferretCage: "Eliminador de Olores de Jaula de Huron",
    eliminateCatOdors: "7 Dias Sin Olor de Caja de Arena",
    instantly: "Elimina el Olor de la Caja de Arena Casi Al Instante",
    description: "Usando tecnologia de atrapamiento molecular de coco \"activado\" (sin quimicos) — la misma ciencia de filtracion que se encuentra en los sistemas de agua potable — una sola aplicacion reduce drasticamente el olor de la caja de arena casi inmediatamente y continua funcionando hasta por 7 dias completos.",
    socialProof: {
      trustNumber: "1,000+",
      trustText: "padres de gatos se despidieron del olor de caja de arena",
      ratingText: "4.8/5 estrellas - 'Mi apartamento ya no apesta!'"
    },
    pricing: {
      trial: "Prueba GRATIS (solo $4.76 envio)",
      standard: "50g: $14.99",
      family: "120g: $24.99"
    },
    buttons: {
      shopNow: "Detener el Mal Olor - Prueba Sin Riesgo $24.95",
      reviews: "Prueba de que Funciona",
      learnMore: "Como Elimina Olores",
      tryFree: "Probar Muestra GRATIS"
    },
    ariaLabels: {
      shopNow: "Comprar productos Purrify ahora",
      reviews: "Leer mas de 138 opiniones de clientes",
      playVideo: "Reproducir video demostrativo mostrando como Purrify elimina olores de arena"
    },
    dualPath: {
      consumer: {
        title: "Para Tu Gato",
        description: "Duenos de gatos individuales - pago instantaneo, entrega directa",
        cta: "Comprar Ahora para Tu Gato"
      },
      retailer: {
        title: "Tiendas de Mascotas y Minoristas",
        description: "Precios mayoristas, pedidos al por mayor, soporte de marketing",
        cta: "Portal Mayorista"
      }
    },
    simplified: {
      free: "GRATIS",
      justPayShipping: "Solo paga $4.76 de envio",
      noMore: "Se Acabo",
      litterBoxSmell: "El Olor a Caja de Arena",
      valueProposition: "El carbon activado elimina olores en la fuente. Funciona con cualquier arena.",
      trialSize: "Tamano Prueba",
      standard: "Estandar",
      familyPack: "Paquete Familiar",
      plusSH: "+ Envio",
      thirtyDayGuarantee: "Garantia 30 Dias",
      getFreeSample: "Obtener Muestra GRATIS",
      soldThisWeek: "87 vendidos esta semana",
      limitedStock: "Stock limitado invierno",
      moneyBackGuarantee: "Garantia de Devolucion de Dinero 30 Dias",
      freeShippingOver: "Envio Gratis Sobre $35"
    }
  },

  // Features
  features: {
    odorElimination: {
      title: "Atrapa el Olor a Amoniaco",
      description: "***Carbon activado de grado filtro de aire y agua*** no solo enmascara olores - atrapa moleculas de amoniaco en la fuente. Tu nariz te lo agradecera!"
    },
    catFriendly: {
      title: "Usado en Filtros de Agua y Aire Mundial",
      description: "Carbon de coco natural sin quimicos, fragancias ni colorantes.\n\nEl mismo tipo usado en filtros de agua y aire en todo el mundo, lo suficientemente potente para multiples gatos."
    },
    longLastingFreshness: {
      title: "7 Dias de Aire Fresco Por Aplicacion",
      description: "Una aplicacion = una semana completa sin ese vergonzoso olor de caja de arena. Deja de limpiar constantemente - empieza a respirar tranquilo."
    },
    natural: {
      title: "100% Ingredientes Naturales",
      description: "Hecho de carbon activado de cascara de coco sin fragancias sinteticas ni rellenos. No toxico y libre de quimicos."
    },
    worksWithAnyLitter: {
      title: "Funciona con la Arena Favorita de Tu Gato",
      description: "Arcilla, cristal, aglomerante, no aglomerante - no importa! No necesitas estresar a tu gato con un cambio de arena. Purrify funciona con lo que ya usas."
    },
    costEffective: {
      title: "Ahorra Dinero en Arena",
      description: "Extiende la vida de la arena previniendo acumulacion de olores. Usa menos, cambia menos seguido, respira mejor. Tu billetera tambien te lo agradecera."
    },
    freePurrify: {
      title: "Purrify Gratis",
      description: "Obtiene una muestra gratis de Purrify con tu primera orden."
    },
    beforeAfter: {
      title: "Antes y Despues",
      description: "Mira la diferencia que Purrify hace en la caja de arena de tu gato."
    }
  },

  // How It Works
  howItWorks: {
    simpleAs123: "Aire Fresco en 60 Segundos - Simple como 1-2-3",
    steps: [
      {
        number: "01",
        title: "Abrir y Verter",
        description: "Abre la bolsa - tu nariz notara la diferencia inmediatamente! Sin ensamblaje, sin instrucciones complicadas."
      },
      {
        number: "02",
        title: "Espolvorear la Magia",
        description: "Solo espolvorea una capa fina sobre la arena limpia. Funciona con CUALQUIER marca - arcilla, cristal, aglomerante, lo que sea."
      },
      {
        number: "03",
        title: "Mezclar y Respirar Tranquilo!",
        description: "Mezcla suavemente y observa (huele?) la magia suceder. 7 dias de aire fresco empiezan AHORA. Tus invitados quedaran asombrados."
      }
    ],
    litterTypes: {
      clumping: "AGLOMERANTE",
      crystal: "CRISTAL",
      natural: "NATURAL",
      clay: "ARCILLA",
      nonClumping: "NO AGLOMERANTE"
    },
    learnTheScience: "Aprende la ciencia",
    compareSizes: "compara nuestros tamanos",
    coconutDescription: "Cascaras de coco puras y sostenibles son activadas con vapor de agua filtrado puro a alta presion para abrir millones de agujeros, tuneles y pasajes que atrapan las moleculas de olor."
  },

  // Products Section
  productsSection: {
    forEveryCatHousehold: "PARA CADA HOGAR CON GATOS",
    pickYourPowerLevel: "ELIGE TU NIVEL DE PODER PURRIFY",
    subtitle: "Ya sea que tengas un gatito o multiples gatos, tenemos el tamano ideal de Purrify para tu hogar.",
    powerLevels: {
      kittenPower: "Poder Gatito",
      standardPower: "Poder Estandar",
      maximumPower: "Poder Maximo"
    },
    mostPopular: "MAS POPULAR",
    addToCart: "Agregar al Carrito",
    buyNow: "Comprar Ahora",
    subscribeNow: "Suscribete y Ahorra",
    adding: "Agregando...",
    viewAllProducts: "VER TODOS LOS PRODUCTOS",
    quantity: "Cantidad",
    decreaseQuantity: "Disminuir cantidad",
    increaseQuantity: "Aumentar cantidad"
  },

  // Stores Section
  storesSection: {
    availableInStores: "DISPONIBLE EN TIENDAS",
    soldInFollowingStores: "VENDIDO EN LAS SIGUIENTES TIENDAS",
    subtitle: "Encuentra Purrify en tus tiendas de mascotas favoritas en Canada. Visita cualquiera de estas ubicaciones para comprar nuestro aditivo premium para arena de gatos.",
    requestStoreAvailability: "Solicitar Disponibilidad en Tienda",
    dontSeeLocalStore: "No ves tu tienda local? Contactanos para solicitar Purrify en tu tienda de mascotas favorita!",
    callStore: "Llamar Tienda",
    sending: "Enviando...",
    requestSent: "Solicitud Enviada!",
    requestSuccess: "Gracias! Nos comunicaremos para ayudar a conseguir Purrify en tu tienda local.",
    requestError: "Ocurrio un error. Por favor contactanos directamente a support@purrify.ca",
    storeDescriptions: {
      completePetCareAndSupplies: "Cuidado completo de mascotas y suministros",
      premiumPetBoutique: "Boutique premium de mascotas",
      familyOwnedPetStore: "Tienda de mascotas familiar",
      globalPetFoodsLocation: "Ubicacion de Global Pet Foods",
      premiumPetProductsAndSupplies: "Productos y suministros premium para mascotas",
      fullServicePetStore: "Tienda de mascotas de servicio completo",
      petStoreWithGroomingServices: "Tienda de mascotas con servicios de estetica"
    }
  },

  // Call to Action
  cta: {
    title: "Deja de Avergonzarte por el Olor de Arena de Gato!",
    subtitle: "Unete a mas de 1,000 padres de gatos que finalmente tienen hogares con olor fresco. Sin mas contener la respiracion, sin mas disculparse con los invitados. Recupera tu confianza - empieza a respirar tranquilo otra vez.",
    buttonText: "ELIMINAR EL MAL OLOR AHORA",
    joinText: "Unete a mas de 1,000 familias con hogares sin olores - Visita tu tienda local",
    guarantee: "Resultados comprobados que puedes oler (o no puedes oler!)"
  },

  // FAQ
  faq: {
    title: "Preguntas Frecuentes",
    commonQuestions: "Preguntas Comunes",
    subtitle: "Tienes preguntas sobre Purrify? Encuentra respuestas a nuestras preguntas mas frecuentes a continuacion.",
    stillHaveQuestions: "Aun tienes preguntas?",
    contactTeam: "Contacta a nuestro equipo",
    forMoreInfo: "para mas informacion.",
    items: [
      {
        question: "Que es Purrify?",
        answer: "Purrify es un aditivo de carbon activado para arena de gatos que elimina olores en la fuente, en lugar de enmascararlos con fragancias."
      },
      {
        question: "Como funciona Purrify?",
        answer: "Purrify usa tecnologia de carbon activado para atrapar y neutralizar moleculas de olor a traves de adsorcion, eliminando efectivamente los olores de arena a nivel molecular."
      },
      {
        question: "Puedo usar Purrify para roedores como hamsters, ratones o ratas?",
        answer: "Si! Purrify usa el mismo tipo de carbon activado que se encuentra en filtracion de agua hospitalaria y aplicaciones veterinarias. Cuando se usa correctamente en bolsas o contenedores sellados con ventilacion adecuada, puede ser adecuado para control de olores en ambientes de roedores. Siempre minimiza la exposicion al polvo y enjuaga antes de usar si es necesario. Para guias de uso detalladas y precauciones para mascotas pequenas, consulta nuestra pagina de informacion de seguridad completa.",
        link: "/learn/safety"
      },
      {
        question: "Cuanto dura Purrify?",
        answer: "Una sola aplicacion de Purrify puede mantener tu caja de arena sin olores hasta por 7 dias, dependiendo del uso y el numero de gatos."
      },
      {
        question: "Se puede usar Purrify con cualquier tipo de arena para gatos?",
        answer: "Si, Purrify funciona con todos los tipos de arena para gatos incluyendo arcilla, aglomerante, cristal y arenas naturales."
      },
      {
        question: "Con que frecuencia debo usar Purrify?",
        answer: "Para mejores resultados, espolvorea Purrify sobre la arena de tu gato cada vez que cambies o agregues arena fresca. Una capa fina es todo lo que necesitas para control continuo de olores."
      },
      {
        question: "Cuanto dura una bolsa de Purrify?",
        answer: "Esto depende de cuantos gatos tengas y con que frecuencia cambies su arena. En promedio, nuestra bolsa de 50g dura aproximadamente 1-2 meses para un hogar con un solo gato con cambios regulares de arena."
      },
      {
        question: "En que se diferencia Purrify de las arenas perfumadas o desodorizantes?",
        answer: "A diferencia de los productos perfumados que enmascaran olores, Purrify usa tecnologia de carbon activado para realmente atrapar y neutralizar moleculas de olor en la fuente. No agrega ningun aroma a tu hogar - simplemente elimina los malos."
      },
      {
        question: "Esta certificado Purrify? Donde puedo encontrar informacion de seguridad?",
        answer: "Si! Purrify cumple con los estandares NSF/ANSI 61, AWWA B604 y Food Chemicals Codex (FCC). Tambien tiene certificacion Halal y Kosher. Para especificaciones tecnicas completas, certificaciones e informacion detallada de seguridad incluyendo guias de uso para roedores, visita nuestra pagina de informacion de seguridad.",
        link: "/learn/safety"
      }
    ],
    learnMore: "Aprende mas"
  },

  // Contact
  contact: {
    title: "Contactanos",
    subtitle: "Estamos aqui para ayudar",
    address: "109-17680 Rue Charles, Mirabel, QC J7J 0T6",
    phone: CONTACT_INFO.phone,
    email: "hello@purrify.ca",
    hours: {
      title: "Horario de Atencion",
      monday: "08:00 am - 8:00 pm",
      tuesday: "08:00 am - 8:00 pm",
      wednesday: "08:00 am - 8:00 pm",
      thursday: "08:00 am - 8:00 pm",
      friday: "08:00 am - 8:00 pm",
      saturday: "09:00 am - 8:00 pm",
      sunday: "Cerrado"
    },
    form: {
      name: "Nombre",
      email: "Correo",
      message: "Mensaje",
      submit: "Enviar"
    }
  },

  // Newsletter
  newsletter: {
    title: "Suscribete a nuestro boletin",
    subtitle: "Mantente actualizado con las ultimas noticias y promociones",
    placeholder: "Tu direccion de correo",
    buttonText: "Suscribirse",
    successMessage: "Gracias por suscribirte!",
    errorMessage: "Ocurrio un error. Por favor intenta de nuevo.",
    errorInvalidEmail: "Por favor ingresa una direccion de correo valida",
    errorGeneric: "Algo salio mal. Por favor intenta de nuevo.",
    privacyText: "Sin spam, cancela cuando quieras. Respetamos tu privacidad.",
    joinFamily: {
      title: "Unete a la Familia Purrify",
      subtitle: "Obtiene 10% de descuento en tu primera orden mas consejos exclusivos de cuidado de gatos",
      benefits: {
        firstOrder: "10% de Descuento en Primera Orden",
        firstOrderDesc: "Descuento exclusivo para nuevos suscriptores",
        catCareTips: "Consejos de Cuidado de Gatos",
        catCareTipsDesc: "Consejos expertos semanales y tips de arena",
        earlyAccess: "Acceso Anticipado",
        earlyAccessDesc: "Se el primero en conocer nuevos productos",
        communityStories: "Historias de la Comunidad",
        communityStoriesDesc: "Historias de exito de otros duenos de gatos"
      },
      emailPlaceholder: "Ingresa tu direccion de correo",
      ctaButton: "Obtener 10% de Descuento en Tu Primera Orden",
      joinText: "Unete a mas de 1,000 clientes felices - Sin spam, cancela cuando quieras",
      welcomeMessage: "Bienvenido a Purrify!",
      features: {
        weeklyTips: "Tips semanales",
        exclusiveOffers: "Ofertas exclusivas",
        earlyAccessProducts: "Acceso anticipado"
      }
    },
    popup: {
      title: "Obtien {discount}% de Descuento en Tu Primera Orden!",
      description: "Unete a mas de 1,000 clientes felices y recibe consejos exclusivos, descuentos y acceso anticipado a nuevos productos.",
      buttonText: "Obtener {discount}% de Descuento Ahora"
    },
    footer: {
      title: "Mantente Actualizado con Purrify",
      description: "Recibe consejos de cuidado de gatos y ofertas exclusivas directamente en tu bandeja de entrada.",
      placeholder: "Tu correo",
      buttonText: "Suscribirse"
    },
    inline: {
      title: "Unete a la Comunidad Purrify",
      description: "Recibe consejos expertos de cuidado de gatos y ofertas exclusivas directamente en tu bandeja de entrada.",
      buttonText: "Suscribirse Gratis",
      successText: "Suscripcion Exitosa!"
    }
  },

  // Free Giveaway Form
  freeGiveaway: {
    formTitle: "Ingresa Tus Datos",
    fullName: "Nombre Completo",
    emailAddress: "Direccion de Correo",
    catNames: "Nombres de Tus Gatos",
    catNamePlaceholder: "Nombre del Gato {index}",
    addAnotherCat: "Agregar Otro Gato",
    submitting: "Enviando...",
    submitButton: "OBTENER MI BOLSA GRATIS AHORA",
    successMessage: "Tu solicitud de bolsa gratis ha sido enviada exitosamente!",
    errorMessage: "Error al enviar tu solicitud. Por favor intenta de nuevo.",
    errorGeneric: "Ocurrio un error. Por favor intenta mas tarde.",
    privacyNotice: "Al enviar este formulario, nos permites contactarte sobre tu muestra gratis de Purrify. Respetamos tu privacidad y nunca compartiremos tu informacion con terceros."
  },

  // 404 Not Found Page
  notFoundPage: {
    title: "404 - Pagina No Encontrada",
    description: "Oops! La pagina que buscas puede haber sido movida, eliminada o tal vez nunca existio.",
    lookingFor: "Puede que estes buscando:",
    returnHome: "Volver a la Pagina de Inicio",
    suggestedPages: {
      home: { title: "Inicio", description: "Volver a nuestra pagina principal" },
      products: { title: "Productos", description: "Explora nuestros aditivos de arena para gatos" },
      howItWorks: { title: "Como Funciona", description: "Aprende como Purrify elimina olores" },
      blog: { title: "Blog", description: "Lee nuestros ultimos articulos sobre cuidado de gatos" },
      contact: { title: "Contacto", description: "Ponte en contacto con nuestro equipo" }
    }
  },

  // SEO
  seo: {
    keywords: "arena para gatos, control de olores, carbon activado, aditivo arena gatos, olor mascotas, eliminacion olor gatos, control natural de olores, cuidado de gatos, suministros mascotas, video gatos",
    openGraph: {
      title: "Purrify - Control de Olores de Arena para Gatos",
      description: "Aditivo de carbon activado para arena de gatos que elimina olores en la fuente."
    },
    metaDescription: "Purrify es un aditivo premium de carbon activado para arena de gatos que elimina olores a nivel molecular. Hecho de carbon de cascara de coco natural, proporciona 7 dias de frescura y funciona con cualquier tipo de arena. Confiado por mas de 1,000 duenos de gatos en Canada."
  },

  // Structured Data
  structuredData: {
    organization: {
      name: "Purrify",
      description: "Aditivo premium de carbon activado para arena de gatos que elimina olores a nivel molecular. Hecho en Canada con carbon de cascara de coco natural.",
      foundingDate: "2023",
      contactPoint: {
        telephone: CONTACT_INFO.phoneInternational,
        email: "hello@purrify.ca",
        contactType: "servicio al cliente",
        areaServed: ["CA", "US"],
        availableLanguage: ["English", "French", "Chinese", "Spanish"]
      },
      areaServed: "Canada"
    },
    product: {
      name: "Aditivo de Carbon Activado Purrify para Arena de Gatos",
      description: "Aditivo de carbon activado para arena de gatos que elimina olores en la fuente."
    },
    localBusiness: {
      type: "PetStore",
      name: "Purrify",
      description: "Aditivo de carbon activado para arena de gatos que elimina olores en la fuente."
    },
    breadcrumb: {
      home: "Inicio"
    },
    video: {
      name: "Demostracion de Efectividad del Aditivo Purrify para Arena de Gatos",
      description: "Mira como Purrify elimina efectivamente los olores de arena de gatos en la fuente."
    },
    website: {
      name: "Purrify - Aditivo de Carbon Activado para Arena de Gatos",
      description: "Aditivo premium de carbon activado para arena de gatos que elimina olores a nivel molecular.",
      inLanguage: "es"
    },
    offerCatalog: {
      name: "Productos de Control de Olores de Arena para Gatos",
      products: {
        trial: {
          name: "Purrify 12g Tamano de Prueba",
          description: "Aditivo de carbon activado tamano prueba para arena de gatos - perfecto para probar",
          sku: "purrify-12g"
        },
        standard: {
          name: "Purrify 50g Tamano Estandar",
          description: "Tamano mas popular - suministro de un mes para hogares con un gato",
          sku: "purrify-50g"
        },
        family: {
          name: "Purrify 120g Paquete Familiar",
          description: "Tamano grande perfecto para hogares multi-gatos - maximo control de olores",
          sku: "purrify-120g"
        }
      },
      priceRange: "$6.99 - $29.99"
    },
    faqPage: {
      questions: [
        {
          question: "Que es Purrify y como funciona?",
          answer: "Purrify es un aditivo de carbon activado para arena de gatos que elimina olores a nivel molecular. El carbon activado tiene millones de poros microscopicos que atrapan y neutralizan compuestos causantes de olor, proporcionando un control de olores superior comparado con la arena sola."
        },
        {
          question: "Se puede usar Purrify cerca de gatos y personas?",
          answer: "Purrify usa el mismo tipo de carbon activado comunmente encontrado en filtros de agua y aire domesticos. No contiene fragancias ni colorantes agregados."
        },
        {
          question: "Cuanto Purrify debo usar?",
          answer: "Para resultados optimos, usa aproximadamente 1-2 cucharadas de Purrify por caja de arena estandar. Mezclalo completamente con tu arena existente cuando hagas un cambio completo. El tamano de prueba de 12g es perfecto para un cambio de caja de arena."
        },
        {
          question: "Funciona Purrify con todos los tipos de arena?",
          answer: "Si! Purrify esta disenado para funcionar con cualquier tipo de arena para gatos - arcilla, aglomerante, cristal, natural o biodegradable. Mejora las propiedades de control de olores de cualquier arena que ya estes usando."
        }
      ]
    }
  },

  // Blog Section
  blogSection: {
    catCareTips: "Consejos de Cuidado de Gatos",
    fromOurBlog: "De Nuestro Blog",
    description: "Consejos expertos y tips para duenos de gatos",
    newPost: "Nueva Publicacion",
    readFullArticle: "Leer Articulo Completo",
    viewAllArticles: "Ver Todos los Articulos"
  },

  // Contact Section
  contactSection: {
    getInTouch: "Ponte en Contacto",
    ourLocation: "Nuestra Ubicacion",
    phoneNumber: "Numero de Telefono",
    phoneDescription: "Atrapamos esos olores persistentes en nuestro numero de telefono. Llama al 1-450-6-ODORS-3 (eso es 1 (450) 663-6773) y ve que tan serios somos sobre el aire fresco.",
    openingHours: "Horario de Atencion",
    weekdays: "Dias de Semana",
    saturday: "Sabado",
    sunday: "Domingo",
    sendMessage: "Enviar Mensaje",
    replyTime: "Responderemos en 24 horas"
  },

  // Benefits
  benefits: {
    molecular: {
      title: "Nivel Molecular",
      description: "Elimina olores en la fuente"
    },
    sevenDayFreshness: {
      title: "7 Dias de Frescura",
      description: "Control de olores duradero"
    },
    natural: {
      title: "100% Natural",
      description: "Sin quimicos agregados; 100% carbon activado de coco natural"
    },
    universalFit: {
      title: "Ajuste Universal",
      description: "Funciona con todos los tipos de arena"
    },
    highlyRated: {
      title: "Altamente Calificado",
      description: "Amado por padres de gatos en Canada\nEnvio rapido en Canada"
    }
  },

  about: {
    naturalAndEffective: "Natural y Efectivo"
  },

  footer: {
    quickLinks: "Enlaces Rapidos",
    openingHours: "Horario de Atencion",
    contactUs: "Contactanos",
    allRightsReserved: "Todos los Derechos Reservados"
  },

  // Footer Navigation
  footerNav: {
    // Section headers
    trustedReviews: "Opiniones Confiables",
    products: "Productos",
    learn: "Aprender",
    popularArticles: "Articulos Populares",
    company: "Empresa",
    // Product links
    trialSize: "Tamano de Prueba",
    standardSize: "Tamano Estandar",
    familyPack: "Paquete Familiar",
    compareSizes: "Comparar Tamanos",
    // Learn links
    howItWorks: "Como Funciona",
    faq: "Preguntas Frecuentes",
    science: "Ciencia",
    safetyInfo: "Informacion de Seguridad",
    catLitterGuide: "Guia de Arena para Gatos",
    ammoniaSolutions: "Soluciones para Amoniaco",
    litterCalculator: "Calculadora de Arena",
    // Article links
    houseSmells: "¿Casa Huele a Arena para Gatos?",
    multiCatGuide: "Guia Desodorizante Multi-Gato",
    triedEverything: "¿Probaste Todo para el Olor a Gato?",
    powerfulAbsorber: "Absorbente de Olor Mas Potente",
    smallApartments: "Mejor para Apartamentos Pequenos",
    // Company links
    about: "Nosotros",
    blog: "Blog",
    locations: "Ubicaciones",
    stockists: "Distribuidores",
    testimonials: "Testimonios",
    retailers: "Para Minoristas",
    retailerPortal: "Portal de Minoristas",
    hospitality: "Hostelería",
    shelters: "Refugios",
    invest: "Inversores",
    affiliateProgram: "Programa de Afiliados",
    contact: "Contacto",
    privacyPolicy: "Politica de Privacidad",
    termsOfService: "Terminos de Servicio",
    // Review platforms
    trustpilot: "Trustpilot",
    googleReviews: "Opiniones de Google"
  },

  // Benefits Section (homepage component)
  benefitsSection: {
    sectionHeader: "Convierte los Problemas de Olor de Gato en Cosa del Pasado",
    title: "Beneficios de Purrify",
    subtitle: "Descubre por que Purrify es la solucion perfecta para duenos de gatos que quieren un hogar con olor fresco.",
    items: [
      {
        title: "Eliminacion de Olores",
        description: "La formula avanzada de Purrify elimina efectivamente los olores desagradables de la caja de arena en su origen. Di adios a los olores persistentes que pueden permear tu hogar y da la bienvenida a un ambiente mas fresco y acogedor para ti y tu amigo peludo."
      },
      {
        title: "Simple",
        description: "Purrify esta formulado con cascaras de coco simples, activadas para absorber olores. Puedes confiar en que estas proporcionando a tu gato un ambiente de caja limpia sin exponerlos a quimicos o toxinas."
      },
      {
        title: "Economico",
        description: "Purrify ayuda a extender la vida de la arena de tu gato previniendo la acumulacion de olores, lo que significa que necesitaras cambiar la arena con menos frecuencia. Esto no solo te ahorra dinero sino que tambien reduce el desperdicio, siendo beneficioso para tu bolsillo y el medio ambiente."
      }
    ]
  },

  // Science Section (homepage component)
  scienceSection: {
    badge: "La Ciencia Detras de Purrify",
    headline: "Como el Carbon Activado",
    headlineHighlight: "Elimina los Olores",
    description: "A diferencia de los sprays que enmascaran olores con perfumes pesados, Purrify usa carbon activado para atrapar y neutralizar fisicamente las moleculas causantes de olor a nivel microscopico.",
    learnMore: "Aprende Mas Sobre la Ciencia",
    features: [
      {
        title: "Tecnologia de Microporos",
        description: "Millones de poros microscopicos atrapan moleculas de olor instantaneamente al contacto."
      },
      {
        title: "Seguro y No Toxico",
        description: "100% carbon activado natural. Seguro para mascotas y humanos."
      },
      {
        title: "Ecologico",
        description: "Materiales sostenibles que son biodegradables y seguros para la tierra."
      }
    ],
    floatingLabel: {
      title: "Vista Microscopica",
      description: "La estructura porosa atrapa moleculas de amoniaco instantaneamente."
    },
    naturalBadge: {
      title: "100% Natural",
      subtitle: "Sin quimicos"
    }
  },

  // Features Section (homepage component)
  featuresSection: {
    badge: "La Diferencia Purrify",
    title: "Por que los Gatos y sus Duenos Aman Purrify?",
    paragraph1: "Amas a tu gato, pero seamos honestos—el olor de la caja de arena es un problema. Has probado arena perfumada, ambientadores y bicarbonato de sodio—pero solo enmascaran el problema, no lo solucionan.",
    paragraph2: "Imagina entrar a tu casa y oler... nada. Solo aire limpio, sin olores persistentes, y sin olores vergonzosos cuando llegan invitados.",
    tagline: "Eso es exactamente lo que hace Purrify...",
    learnMore: "Aprende mas"
  },

  // Calculator Section (homepage component)
  calculatorSection: {
    title: "Ahorra Dinero Mientras Mantienes Tu Hogar Fresco",
    description: "Purrify extiende la vida de la arena de tu gato hasta un 50%, ahorrandote dinero mientras elimina olores. Mira cuanto podrias ahorrar con nuestra calculadora."
  },

  // Section Header highlights
  sectionHeaderHighlights: [
    "7 Dias de Aire Fresco Garantizado",
    "Aire Fresco en 60 Segundos - Simple como 1-2-3"
  ],

  // Trust Bar
  trustBar: {
    happyCats: "gatos felices",
    reviews: "resenas"
  },

  // Social Proof Badges Section
  socialProofBadges: {
    trustedVerified: "Verificado y Confiable",
    findUsOn: "Encuentranos En",
    viewOnPlatform: "Ver Purrify en {{platform}}",
    platforms: {
      trustpilot: "Trustpilot",
      googleBusiness: "Google Business",
      crunchbase: "Crunchbase",
      productHunt: "Product Hunt",
      yelp: "Yelp",
      wellfound: "Wellfound"
    }
  },

  // Referral Program
  referral: {
    dashboard: {
      title: "Da $5, Recibe $5",
      loginRequired: "Inicia sesion para acceder a tu panel de referidos y comenzar a ganar recompensas.",
      signIn: "Iniciar Sesion",
      retry: "Intentar de Nuevo",
      generateDescription: "Genera tu codigo de referido unico y compartelo con amigos. Ellos obtienen $5 de descuento en su primer pedido, y tu obtienes $5 de credito cuando compren!",
      generateButton: "Generar Mi Codigo de Referido",
      generating: "Generando..."
    },
    stats: {
      completedReferrals: "Referidos Completados",
      totalEarned: "Total Ganado",
      availableCredit: "Credito Disponible",
      pending: "Pendiente"
    },
    milestone: {
      title: "Progreso de Meta",
      referrals: "referidos",
      nextReward: "Proxima recompensa"
    },
    rewards: {
      title: "Tus Recompensas",
      credit: "Credito",
      available: "Disponible"
    },
    activity: {
      title: "Actividad Reciente",
      completed: "Completado",
      pending: "Pendiente"
    },
    widget: {
      title: "Da $5, Recibe $5",
      giveGet: "Da $5, Recibe $5",
      description: "Comparte tu codigo con amigos. Ellos obtienen $5 de descuento, tu obtienes $5 de credito!",
      shareDescription: "Comparte tu codigo con amigos",
      yourCode: "Tu Codigo de Referido",
      shareLink: "Enlace para Compartir",
      copy: "Copiar",
      copyCode: "Copiar Codigo",
      copyLink: "Copiar Enlace",
      copied: "Copiado!",
      shareVia: "Compartir via",
      howItWorks: "Como funciona",
      step1: "Comparte tu codigo o enlace con amigos",
      step2: "Ellos obtienen $5 de descuento en su primer pedido",
      step3: "Tu obtienes $5 de credito cuando compren"
    },
    share: {
      email: "Correo",
      sms: "SMS",
      link: "Enlace"
    },
    checkout: {
      haveCode: "Tienes un codigo de referido? Haz clic aqui",
      enterReferralCode: "Ingresa el Codigo de Referido",
      enterCode: "Por favor ingresa un codigo de referido",
      emailRequired: "Por favor ingresa tu correo primero",
      invalidCode: "Codigo de referido invalido",
      error: "Error al aplicar el codigo. Por favor intenta de nuevo.",
      apply: "Aplicar",
      applying: "Aplicando...",
      applied: "Codigo de referido aplicado!",
      referredBy: "Referido por {name}",
      off: "de descuento",
      remove: "Eliminar",
      discountNote: "Obtiene $5 de descuento en tu pedido con el codigo de referido de un amigo"
    }
  },

  // Free Trial
  freeTrial: {
    urgentBanner: "Oferta Por Tiempo Limitado",
    free: "Gratis"
  },

  // Enhanced Product Comparison
  enhancedProductComparison: {
    compareAndSave: "COMPARA Y AHORRA",
    chooseYourPerfectSize: "Elige Tu Tamano Perfecto",
    purrifySize: "Tamano Purrify",
    subtitle: "Todos los tamanos entregan la misma poderosa eliminacion de olores. Elige segun el tamano de tu hogar y frecuencia de uso.",
    trial: "PRUEBA",
    mostPopular: "MAS POPULAR",
    bestValue: "MEJOR VALOR",
    premium: "Premium",
    perfectForFirstTime: "Perfecto para usuarios nuevos",
    idealForSingleCat: "Ideal para hogares con un gato",
    perfectForMultiCat: "Perfecto para hogares multi-gatos",
    duration: "Duracion",
    coverage: "Cobertura",
    odorControl: "Control de Olores 7 Dias",
    odorControlTrial: "Control de Olores 7 Dias",
    odorControlMedium: "Control de Olores 14 Dias",
    odorControlLarge: "Control de olores 30 dias",
    naturalIngredients: "100% Ingredientes Naturales",
    easyApplication: "Aplicacion Facil",
    moneyBackGuarantee: "Soporte experto en olores",
    freeShipping: "Envio incluido",
    freeShippingDetailed: "El envio esta incluido.",
    autoshipHero: "Autoenvio y Ahorra",
    autoshipHighlight: "Suscribete y Ahorra",
    bulkDiscount: "Descuento por Volumen Disponible",
    prioritySupport: "Soporte al Cliente Prioritario",
    tryRiskFree: "Probar Sin Riesgo",
    chooseThisSize: "Elegir Este Tamano",
    chosenByCustomers: "68% de los clientes eligen este paquete",
    whyChoosePurrify: "Por que Elegir Purrify?",
    joinThousands: "Unete a mas de 1,000 duenos de gatos que confian en Purrify",
    happyCustomers: "Clientes Felices",
    averageRating: "Calificacion Promedio",
    satisfactionRate: "Tasa de Satisfaccion",
    odorFreeGuarantee: "Aire fresco con cada aplicacion",
    moneyBackGuaranteeText: "Preguntas? Nuestro equipo de cuidado de gatos esta listo para ayudarte a obtener resultados."
  },

  // Subscription Offer
  subscriptionOffer: {
    subscribeAndSave: "Suscribete y Ahorra",
    neverRunOut: "Nunca Te Quedes Sin Stock",
    subtitle: "Configura entregas automaticas para asegurar ahorros exclusivos. Cancela cuando quieras.",
    monthly: "Mensual",
    everyTwoMonths: "Cada 2 Meses",
    quarterly: "Trimestral",
    save: "Ahorra",
    mostFlexible: "Mas Flexible",
    bestValue: "Mejor Valor",
    maxSavings: "Maximo Ahorro",
    oneTimePurchase: "Compra Unica",
    subscriptionBenefits: "Beneficios de Suscripcion",
    exclusiveDiscounts: "Descuentos solo para suscriptores",
    prioritySupport: "Soporte al cliente prioritario",
    flexibleSchedule: "Horario de entrega flexible",
    cancelAnytime: "Cancela cuando quieras",
    startSubscription: "Iniciar Suscripcion",
    selectPlan: "Seleccionar Plan",
    popularChoice: "Opcion Popular"
  },

  // Urgency Banner
  urgencyBanner: {
    limitedTime: "Oferta Por Tiempo Limitado",
    saveToday: "Ahorra Hoy",
    onAllOrders: "en todas las ordenes",
    hurryOffer: "Apurate! Esta oferta termina pronto",
    claimDiscount: "Reclamar Descuento",
    timeLeft: "Tiempo Restante",
    days: "dias",
    hours: "horas",
    minutes: "minutos",
    seconds: "segundos",
    onlyLeft: "solo quedan",
    inStock: "en stock",
    orderNow: "Ordenar Ahora"
  },

  // Email Capture Popup
  emailCapture: {
    waitDontGo: "Espera! No te vayas todavia!",
    exclusiveOffer: "Desbloquea una oferta exclusiva",
    subtitle: "Antes de irte, obtiene 15% de descuento en tu primera orden",
    emailPlaceholder: "Ingresa tu direccion de correo",
    claimDiscount: "Reclamar 15% de Descuento",
    noThanks: "No gracias",
    instantAccess: "Acceso instantaneo a tu codigo de descuento",
    limitedTime: "Oferta por tiempo limitado - no te la pierdas!",
    successMessage: "Exito! Revisa tu bandeja de entrada para el codigo de descuento.",
    errorMessage: "Algo salio mal - por favor intenta de nuevo."
  },

  // Reviews Section
  reviewsSection: {
    customerReviews: "Opiniones de Clientes",
    realStories: "Historias reales de padres de gatos felices",
    verifiedReviews: "Opiniones Verificadas",
    averageRating: "Calificacion Promedio",
    readMore: "Leer Mas",
    writeReview: "Escribir Opinion",
    helpful: "Util",
    verified: "Verificado",
    productUsed: "Producto Usado",
    catsOwned: "Gatos que Tiene",
    useCase: "Caso de Uso"
  },

  // Case Studies
  caseStudies: {
    customerSuccess: "Historias de Exito de Clientes",
    realResults: "Resultados reales de clientes reales",
    detailedStories: "Mira como Purrify transforma hogares en Canada a traves de casos de estudio detallados",
    averageOdorReduction: "Reduccion Promedio de Olores",
    timeToSeeResults: "Tiempo para Ver Resultados",
    customerSatisfaction: "Satisfaccion del Cliente",
    catsPerStudy: "Gatos por Estudio",
    theChallenge: "El Desafio",
    theSolution: "La Solucion",
    theResults: "Los Resultados",
    longTermOutcome: "Resultado a Largo Plazo",
    keyPainPoints: "Puntos de Dolor Clave",
    implementation: "Implementacion",
    writeYourStory: "Listo para escribir tu propia historia de exito?",
    joinSatisfied: "Unete a mas de 1,000 clientes satisfechos transformando sus hogares con Purrify.",
    shopPurrify: "Comprar Purrify",
    tryFreeSample: "Probar una Muestra Gratis",
    moreCustomerStories: "Mas Historias de Clientes",
    videoTestimonials: "Testimonios en Video",
    productComparison: "Comparacion de Productos"
  },

  // Additional Subscription Offer Translations
  subscriptionOfferExtended: {
    autoshipBadge: "Autoenvio Trimestral",
    headline: "Configura y olvida tu defensa contra olores de arena",
    supportingCopy: "Elige el paquete que se reabastece automaticamente cada 3 meses, mantiene tu hogar fresco y protege tu presupuesto.",
    perMonthLabel: "aprox. {price}/mes efectivo",
    saveVsOneTime: "Ahorra {percent}% vs compra unica",
    skipOrCancelAnytime: "Salta o cancela cuando quieras",
    shippingIncluded: "Envio incluido",
    freeShippingIncluded: "Envio gratis incluido",
    priorityCustomerSupport: "Soporte al cliente prioritario",
    startAutoship: "Iniciar Autoenvio",
    linkComingSoon: "Enlace de pago proximamente",
    quarterlyBilling: "Facturado cada 3 meses",
    autoshipHero: "Autoenvio y Ahorra",
    autoshipHighlight: "Suscribete y Ahorra",
    standardPlanTitle: "Autoenvio Trimestral - 3 x 50g",
    standardDescription: "Perfecto para hogares con un gato que quieren control de olores fresco cada mes.",
    includesThreeStandard: "Incluye 3 x bolsas de 50g entregadas juntas",
    familyPlanTitle: "Autoenvio Mejor Valor - 3 x Tamano Regular 120g",
    familyDescription: "Disenado para hogares multi-gatos y propensos a alergias. Nuestro mejor precio por cucharada.",
    includesThreeFamily: "Incluye 3 x paquetes de 120g tamano regular (entregados juntos)",
    bestValueBadge: "Mejor Valor",
    save: "Ahorra",
    joinThePurrifyFamily: "Unete a la Familia Purrify"
  },

  // Payment Security
  paymentSecurity: {
    securePayment: "Pago Seguro",
    sslEncrypted: "SSL 256-bit",
    sslEncryptedCheckout: "Pago encriptado con SSL a traves de Stripe"
  },

  // Testimonials Section
  testimonialsSection: {
    customerLove: "Amor de Clientes",
    littersOfLove: "Resultados Reales de Padres de Gatos Felices",
    dontJustTakeOurWord: "No solo tomes nuestra palabra. Esto es lo que nuestros clientes dicen sobre Purrify.",
    readMoreReviews: "Leer Mas Opiniones"
  },

  // Trust Badges
  trustBadges: {
    moneyBack: {
      title: "Soporte Basado en Canada",
      description: "Personas reales listas para ayudarte a controlar los olores",
      highlight: "Expertos en cuidado de gatos"
    },
    securePayment: {
      title: "Pago Seguro",
      description: "Pago encriptado con SSL a traves de Stripe",
      highlight: "SSL 256-bit"
    },
    fastShipping: {
      title: "Envio Rapido",
      description: "Entrega rapida y confiable",
      highlight: "Procesamiento el Mismo Dia"
    },
    customerRating: {
      title: "Calificacion 4.9/5 de Clientes",
      description: "Basado en 138 opiniones verificadas",
      highlight: "98% Satisfaccion"
    },
    happyCustomers: {
      title: "Mas de 1,000 Clientes Felices",
      description: "Confiado por duenos de gatos en Canada",
      highlight: "Desde 2019"
    },
    premiumQuality: {
      title: "Calidad Premium",
      description: "Carbon activado de grado filtracion usado en filtros de agua y aire",
      highlight: "Sin Fragancia"
    }
  },

  // Free Trial Page
  freeTrialPage: {
    urgentBanner: "OFERTA POR TIEMPO LIMITADO",
    free: "GRATIS",
    claimTrial: "Reclama Tu Prueba GRATIS de Purrify",
    whatYouGet: "Lo Que Obtienes:",
    freeTrialBag: "Bolsa de Prueba 12g de Purrify (Solo $4.76 de envio a cualquier lugar de Canada)",
    expertTips: "Consejos expertos de cuidado de gatos y guias",
    zeroCommitment: "Cero compromiso - este es nuestro regalo para ti",
    attention: "ATENCION: Para duenos de gatos cansados de contener la respiracion",
    limitedQuantity: "Limitado a los primeros 500 duenos de gatos",
    alreadyClaimed: "Ya reclamados",
    countdownLabels: {
      hours: "HORAS",
      minutes: "MINS",
      seconds: "SEGS"
    },
    testimonials: [
      {
        text: "No lo podia creer. En HORAS, toda mi casa olia fresca otra vez. Hasta invite a mi suegra por primera vez en meses!",
        author: "Jennifer M., Montreal"
      },
      {
        text: "Mi esposo penso que habia tirado toda la arena. El olor simplemente... desaparecio.",
        author: "Lisa K., Mirabel, QC"
      }
    ],
    testimonialsTestUsers: "Lo que dicen nuestros probadores beta:",
    claimNow: "RECLAMA TU PRUEBA GRATIS AHORA",
    warningHighDemand: "ADVERTENCIA: Debido a la alta demanda, no podemos garantizar disponibilidad despues de que expire el temporizador.",
    privacyNotice: "100% Gratis. No se requiere tarjeta de credito.",
    zeroCommitmentGift: "Cero compromiso - este es nuestro regalo para ti",
    instantOdorElimination: "Experimenta la magia de eliminacion instantanea de olores",
    completeInstructions: "Instrucciones completas para mejores resultados",
    noShippingFees: "Sin tarifas de envio, sin costos ocultos, sin trampa",
    disappearsIn: "ADVERTENCIA: Esta oferta desaparece en:",
    limitedTo500: "Limitado a los primeros 500 duenos de gatos.",
    yourFreeTrialWaits: "Tu prueba gratis te espera - pero solo si actuas ahora.",
    betaTestersHeader: "Lo que dicen nuestros probadores beta:",
    claimFreeTrialNow: "RECLAMA TU PRUEBA GRATIS AHORA",
    attention100Free: "100% Gratis. No se requiere tarjeta de credito.",
    noCreditCard: "No se requiere tarjeta de credito.",
    limitedTimeOffer: "Oferta por tiempo limitado. Una muestra gratis por hogar.",
    restrictionsApply: "Pueden aplicar restricciones de envio. Nos reservamos el derecho de terminar esta promocion en cualquier momento.",
    highDemandWarning: "Debido a la alta demanda, no podemos garantizar disponibilidad despues de que expire el temporizador",
    disclaimer: "100% Gratis. No se requiere tarjeta de credito. Oferta por tiempo limitado. Una muestra gratis por hogar. Pueden aplicar restricciones de envio. Nos reservamos el derecho de terminar esta promocion en cualquier momento."
  },

  // Contact Page
  contactPage: {
    title: "Estamos Aqui para Ayudar",
    subtitle: "Nuestro amigable equipo de soporte al cliente esta listo para asistirte con consejos expertos y soluciones.",
    chooseContactMethod: "Elige Como Contactarnos",
    contactReasons: [
      { value: "general", label: "Pregunta General" },
      { value: "order", label: "Estado de Orden" },
      { value: "product", label: "Pregunta de Producto" },
      { value: "shipping", label: "Problema de Envio" },
      { value: "return", label: "Devolucion/Cambio" },
      { value: "other", label: "Otro" }
    ],
    contactMethods: [
      {
        title: "Soporte por Correo",
        description: "Obtiene ayuda detallada con tus preguntas",
        responseTime: "Respuesta en 24 horas"
      },
      {
        title: "Soporte Telefonico",
        description: "Habla directamente con nuestro equipo",
        responseTime: "Lun-Vie 9AM-5PM EST"
      },
      {
        title: "Chat en Vivo",
        description: "Chatea con nosotros en tiempo real",
        responseTime: "Disponible Ahora"
      }
    ],
    form: {
      fullName: "Nombre Completo",
      emailAddress: "Direccion de Correo",
      subject: "Asunto",
      message: "Mensaje",
      contactReason: "Razon de Contacto",
      orderNumber: "Numero de Orden (si aplica)",
      submit: "Enviar Mensaje",
      submitting: "Enviando...",
      successMessage: "Gracias por contactarnos! Responderemos en 24 horas.",
      errorMessage: "Lo sentimos, hubo un error al enviar tu mensaje. Por favor intenta de nuevo o contactanos directamente.",
      sendingMessage: "Enviando Mensaje...",
      sendMessage: "Enviar Mensaje",
      subjectPlaceholder: "Breve descripcion de tu solicitud",
      messagePlaceholder: "Por favor proporciona detalles sobre tu pregunta o inquietud...",
      orderNumberPlaceholder: "ej. PUR-12345",
      contactNow: "Contactar Ahora"
    },
    faqs: [
      {
        question: "Cuanto tarda el envio?",
        answer: "El envio estandar toma 3-5 dias habiles dentro de Canada. Tambien ofrecemos opciones de envio expedito."
      },
      {
        question: "Puedo usar Purrify cerca de mi gato?",
        answer: "Purrify usa el mismo tipo de carbon activado que se encuentra en muchos filtros de agua domesticos y no contiene fragancias ni colorantes agregados."
      },
      {
        question: "Como uso Purrify?",
        answer: "Simplemente espolvorea 1-2 cucharadas de Purrify sobre tu arena existente despues de limpiar. Funciona con todos los tipos de arena."
      }
    ],
    businessHours: {
      title: "Horario de Atencion",
      weekdays: "Lunes - Viernes: 9:00 AM - 5:00 PM EST",
      saturday: "Sabado: 10:00 AM - 2:00 PM EST",
      sunday: "Domingo: Cerrado",
      closed: "Cerrado"
    },
    location: {
      title: "Nuestra Ubicacion",
      address: "Montreal, Quebec, Canada",
      shippingNote: "Enviamos a todo Canada y ofrecemos recoleccion local en el area de Montreal."
    },
    frequentlyAskedQuestions: "Preguntas Frecuentes",
    quickAnswersCommon: "Respuestas rapidas a preguntas comunes",
    dontSeeQuestion: "No ves tu pregunta aqui?",
    viewCompleteFAQ: "Ver FAQ Completo",
    backToHome: "Volver al Inicio"
  },

  // Product Comparison
  productComparison: {
    title: "Elige Tu Tamano Perfecto",
    subtitle: "Encuentra el tamano ideal de Purrify para tu hogar",
    findPerfectSize: "Encuentra tu tamano perfecto basado en tus necesidades",
    products: [
      {
        id: "trial",
        name: "Prueba GRATIS",
        subtitle: "Paquete 12g",
        duration: "1 semana",
        cats: "1 gato",
        features: ["12g carbon activado", "Solo paga envio", "Introduccion perfecta"],
        bestFor: "Nuevos clientes que quieren probar Purrify sin riesgo",
        cta: "Obtener Prueba GRATIS"
      },
      {
        id: "regular",
        name: "Regular",
        subtitle: "Paquete 120g - Mas Popular",
        duration: "3 meses",
        cats: "1-2 gatos",
        features: ["120g carbon activado", "Suscribete y ahorra", "Envio gratis"],
        bestFor: "Hogares con uno o dos gatos que quieren frescura continua",
        cta: "Suscribete y Ahorra"
      },
      {
        id: "large",
        name: "Grande",
        subtitle: "Paquete 240g - Mejor Valor",
        duration: "3 meses",
        cats: "3+ gatos",
        features: ["240g carbon activado", "Maximo ahorro", "Envio gratis"],
        bestFor: "Hogares multi-gatos y usuarios frecuentes",
        cta: "Suscribete y Ahorra"
      }
    ],
    comparisonFeatures: [
      { feature: "Eliminacion de olores" },
      { feature: "Sin fragancia" },
      { feature: "Funciona con todas las arenas" },
      { feature: "Ingredientes naturales" },
      { feature: "Coaching personalizado de olores" }
    ],
    usageCalculator: {
      title: "Calculadora de Uso",
      subtitle: "Calcula cuanto durara cada tamano",
      numberOfCats: "Numero de gatos:",
      typicalChanges: "Cambios de arena por semana:",
      estimateDuration: "Duracion estimada:"
    },
    stillUnsure: "Aun no estas seguro de cual tamano es adecuado para ti?",
    getPersonalizedAdvice: "Obtiene consejos personalizados de nuestro equipo",
    tryRiskFree: "Probar Sin Riesgo",
    learnMoreAboutPurrify: "Aprende mas sobre como funciona Purrify",
    featuresComparison: "Comparacion de Caracteristicas",
    seeHowProductsCompare: "Ve como se comparan nuestros productos",
    howLongWillEachSizeLast: "Cuanto durara cada tamano?",
    popular: "POPULAR",
    bestValue: "MEJOR VALOR",
    perfectForFirstTime: "Perfecto para usuarios nuevos",
    idealForSingleCat: "Ideal para hogares con un gato",
    perfectForMultiCat: "Perfecto para hogares multi-gatos",
    economicChoice: "Opcion mas economica para familias grandes",
    maxValuePerGram: "Maximo valor por gramo",
    bulkSavingsIncluded: "Ahorros por volumen incluidos",
    sustainableSupply: "Suministro sostenible para usuarios frecuentes",
    features: "Caracteristicas",
    idealFor: "Ideal Para",
    duration: "Duracion",
    saveMoney: "Ahorra Dinero",
    getBestValue: "Obtener Mejor Valor",
    chooseThisSize: "Elegir Este Tamano",
    tryWithoutRisk: "Probar Sin Riesgo",
    chooseSmallSize: "Elegir Tamano Pequeno",

    // SEO
    seo: {
      title: "Encuentra el Tamano Perfecto",
      description: "Compara todos los tamanos de Purrify y encuentra el aditivo de carbon activado perfecto para las necesidades de tu hogar."
    },

    stillUnsureDescription: "Empieza con nuestro tamano de prueba sin riesgo y experimenta la diferencia Purrify por ti mismo.",

    // Table Headers
    tableHeaders: {
      feature: "Caracteristica",
      trial: "12g Prueba",
      regular: "120g Regular",
      large: "240g Grande"
    },

    // Calculation Units
    units: {
      cat: "Gato",
      cats: "Gatos",
      week: "semana",
      weeks: "semanas",
      day: "dia",
      days: "dias",
      weekly: "Semanal",
      perWeek: "por semana"
    },

    // Related Pages
    relatedPages: [
      {
        title: "Como Funciona",
        description: "Descubre la ciencia detras de nuestra tecnologia de carbon activado y por que es tan efectiva.",
        link: "/learn/how-it-works"
      },
      {
        title: "Opiniones de Clientes",
        description: "Ve lo que mas de 1,000 clientes satisfechos dicen sobre su experiencia con Purrify.",
        link: "/reviews"
      },
      {
        title: "Guia de Arena para Gatos",
        description: "Aprende sobre diferentes tipos de arena y como elegir la mejor opcion para tu gato.",
        link: "/learn/cat-litter-guide"
      }
    ]
  },

  // Privacy Policy
  privacyPolicy: {
    title: "Politica de Privacidad",
    lastUpdated: "Ultima actualizacion: Enero 2025",
    sections: [
      {
        title: "Informacion que Recopilamos",
        content: "Recopilamos informacion que nos proporcionas directamente, como cuando creas una cuenta, realizas una compra o nos contactas para soporte.",
        items: [
          "Informacion personal (nombre, direccion de correo, numero de telefono)",
          "Informacion de pago (procesada de forma segura a traves de Stripe)",
          "Direcciones de envio y facturacion",
          "Preferencias de comunicacion e interacciones de servicio al cliente"
        ]
      },
      {
        title: "Como Usamos Tu Informacion",
        content: "Usamos la informacion que recopilamos para proporcionar, mantener y mejorar nuestros servicios, procesar transacciones y comunicarnos contigo."
      },
      {
        title: "Compartir Informacion",
        content: "No vendemos, intercambiamos ni transferimos tu informacion personal a terceros sin tu consentimiento, excepto como se describe en esta politica."
      },
      {
        title: "Seguridad de Datos",
        content: "Implementamos medidas de seguridad apropiadas para proteger tu informacion personal contra acceso no autorizado, alteracion, divulgacion o destruccion."
      },
      {
        title: "Contactanos",
        content: "Si tienes alguna pregunta sobre esta Politica de Privacidad, por favor contactanos usando la informacion a continuacion."
      }
    ],
    contactInfo: {
      email: "Correo",
      phone: "Telefono",
      address: "Purrify Canada, Montreal, Quebec, Canada"
    }
  },

  // FAQ Items
  faqItems: [
    {
      id: 1,
      category: "product",
      question: "Que es Purrify y como funciona?",
      answer: "Purrify es un aditivo de carbon activado para arena de gatos que elimina olores a nivel molecular. El carbon activado tiene millones de poros microscopicos que atrapan y neutralizan compuestos causantes de olor, proporcionando un control de olores superior comparado con la arena sola.",
      popular: true,
      tags: ["carbon activado", "control de olores", "como funciona"]
    },
    {
      id: 2,
      category: "product",
      question: "Se puede usar Purrify cerca de gatos y personas?",
      answer: "Purrify usa el mismo tipo de carbon activado comunmente usado en filtros de agua y purificadores de aire domesticos. No contiene fragancias ni colorantes agregados.",
      popular: true,
      tags: ["uso", "grado filtracion", "sin fragancia"]
    },
    {
      id: 3,
      category: "usage",
      question: "Cuanto Purrify debo usar?",
      answer: "Para resultados optimos, usa aproximadamente 1-2 cucharadas de Purrify por caja de arena estandar. Mezclalo completamente con tu arena existente cuando hagas un cambio completo. El tamano de prueba de 12g es perfecto para un cambio de caja de arena.",
      popular: true,
      tags: ["dosificacion", "aplicacion", "mezcla"]
    },
    {
      id: 4,
      category: "product",
      question: "Funciona Purrify con todos los tipos de arena?",
      answer: "Si! Purrify esta disenado para funcionar con cualquier tipo de arena para gatos - arcilla, aglomerante, cristal, natural o biodegradable. Mejora las propiedades de control de olores de cualquier arena que ya estes usando.",
      popular: true,
      tags: ["compatibilidad", "todos los tipos de arena", "mejora"]
    },
    {
      id: 5,
      category: "usage",
      question: "Cuanto dura Purrify?",
      answer: "Purrify extiende la vida de tu arena por 2-3 veces. En lugar de cambiar la arena semanalmente, tipicamente puedes pasar 2-3 semanas con la misma arena al usar Purrify, dependiendo del numero de gatos y frecuencia de uso.",
      popular: false,
      tags: ["duracion", "vida de arena", "ahorro de costos"]
    },
    {
      id: 6,
      category: "shipping",
      question: "Que tan rapido es el envio?",
      answer: "Ofrecemos envio estandar gratis (5-7 dias habiles) en ordenes mayores a $25. El envio express (2-3 dias) esta disponible por $9.99, y el envio prioritario (1-2 dias) por $14.99. Las ordenes realizadas antes de las 2 PM EST se envian el mismo dia.",
      popular: true,
      tags: ["velocidad de envio", "tiempos de entrega", "mismo dia"]
    },
    {
      id: 7,
      category: "product",
      question: "Que tamanos estan disponibles?",
      answer: "Ofrecemos tres tamanos: Tamano de Prueba 12g (solo $4.76 envio Canada / $6.39 EE.UU.) para usuarios nuevos, Tamano Regular 50g ($14.99 + envio) para hogares con un gato, y Tamano Grande 120g ($29.99) para hogares multi-gatos. El tamano grande ofrece el mejor valor por gramo, y nuestros paquetes de autoenvio incluyen envio gratis.",
      popular: false,
      tags: ["tamanos", "precios", "valor"]
    },
    {
      id: 8,
      category: "usage",
      question: "Puedo usar Purrify con cajas de arena automaticas?",
      answer: "Si, Purrify funciona excelentemente con cajas de arena automaticas. Simplemente mezclalo con tu arena como de costumbre. El carbon activado no interferira con los mecanismos automaticos y proporcionara un control de olores superior.",
      popular: false,
      tags: ["caja automatica", "compatibilidad", "mecanismos"]
    },
    {
      id: 9,
      category: "payment",
      question: "Que metodos de pago aceptan?",
      answer: "Aceptamos todas las tarjetas de credito principales (Visa, MasterCard, American Express), PayPal, Apple Pay y Google Pay. Todas las transacciones se procesan de forma segura a traves de Stripe con encriptacion SSL de 256 bits.",
      popular: false,
      tags: ["metodos de pago", "seguridad", "tarjetas de credito"]
    },
    {
      id: 10,
      category: "shipping",
      question: "Envian internacionalmente?",
      answer: "Si, enviamos a muchos paises en todo el mundo. Los costos de envio varian por destino: EE.UU. ($12.99), UK/EU ($19.99), Australia ($24.99). Los tiempos de entrega van de 7-35 dias dependiendo de la ubicacion. Pueden aplicar derechos de aduana.",
      popular: false,
      tags: ["envio internacional", "mundial", "aduana"]
    },
    {
      id: 11,
      category: "product",
      question: "Que pasa si no estoy obteniendo los resultados esperados?",
      answer: "Estamos aqui para ayudar! Envia un mensaje a nuestro equipo de soporte y te guiaremos a traves de tu configuracion, compartiremos consejos de eliminacion de olores, y nos aseguraremos de que Purrify este funcionando lo mejor posible en tu hogar.",
      popular: true,
      tags: ["soporte", "ayuda", "consejos de olores"]
    },
    {
      id: 12,
      category: "usage",
      question: "Como se si Purrify esta funcionando?",
      answer: "Notaras la diferencia en horas! El signo mas obvio es una reduccion dramatica del olor de la caja de arena. Tambien encontraras que tu arena se mantiene fresca por mas tiempo, requiriendo cambios completos menos frecuentes.",
      popular: false,
      tags: ["efectividad", "resultados", "linea de tiempo"]
    },
    {
      id: 13,
      category: "support",
      question: "Como puedo contactar soporte al cliente?",
      answer: "Puedes contactarnos via correo a hello@purrify.com, a traves de nuestro formulario de contacto, o por telefono durante horas de oficina. Tipicamente respondemos correos en 24 horas y siempre estamos felices de ayudar con cualquier pregunta.",
      popular: false,
      tags: ["contacto", "soporte", "tiempo de respuesta"]
    },
    {
      id: 14,
      category: "product",
      question: "Puede ayudar Purrify con multiples gatos?",
      answer: "Absolutamente! Purrify es especialmente efectivo en hogares multi-gatos donde el control de olores es mas desafiante. Recomendamos nuestro Tamano Grande 120g para hogares con 2-3 gatos, ya que proporciona el mejor valor y resultados mas duraderos.",
      popular: false,
      tags: ["multiples gatos", "multi-gatos", "tamano grande"]
    },
    {
      id: 15,
      category: "usage",
      question: "Necesito cambiar como limpio la caja de arena?",
      answer: "No se necesitan cambios! Continua tu rutina normal de limpieza. Purrify trabaja en segundo plano para eliminar olores. Puede que encuentres que puedes pasar mas tiempo entre cambios completos de arena, ahorrando tiempo y dinero.",
      popular: false,
      tags: ["rutina de limpieza", "recogida", "mantenimiento"]
    },
    {
      id: 16,
      category: "shipping",
      question: "Puedo rastrear mi orden?",
      answer: "Si! Una vez que tu orden se envia, recibiras un numero de rastreo via correo. Puedes rastrear tu paquete directamente en el sitio web de Canada Post o a traves de nuestro sistema de rastreo de ordenes.",
      popular: false,
      tags: ["rastreo", "estado de orden", "Canada Post"]
    }
  ],

  // FAQ Categories
  faqCategories: [
    { id: "all", name: "Todas las Preguntas", count: 24 },
    { id: "product", name: "Informacion del Producto", count: 8 },
    { id: "usage", name: "Uso y Aplicacion", count: 6 },
    { id: "shipping", name: "Envio y Entrega", count: 5 },
    { id: "payment", name: "Pago y Facturacion", count: 3 },
    { id: "support", name: "Soporte al Cliente", count: 2 }
  ],

  // FAQ Page
  faqPage: {
    title: "Preguntas Frecuentes",
    subtitle: "Todo lo que necesitas saber sobre Purrify",
    searchPlaceholder: "Buscar respuestas...",
    popularQuestions: "Preguntas Mas Populares",
    quickAnswers: "Respuestas rapidas a lo que los clientes preguntan mas",
    categories: "Categorias",
    questionsFound: "Pregunta",
    questionsFoundPlural: "Preguntas Encontradas",
    clearSearch: "Limpiar Busqueda",
    noQuestionsFound: "No se encontraron preguntas",
    adjustSearchTerms: "Intenta ajustar tus terminos de busqueda o filtro de categoria",
    stillHaveQuestions: "Aun Tienes Preguntas?",
    cantFindWhatLooking: "No encuentras lo que buscas? Nuestro equipo de soporte al cliente esta aqui para ayudar!",
    customerSupportReady: "Nuestro equipo de soporte al cliente esta listo para ayudar!",
    emailSupport: "Soporte por Correo",
    detailedEmailHelp: "Obtiene respuestas detalladas via correo",
    liveChat: "Chat en Vivo",
    realTimeChatHelp: "Chatea con nosotros en tiempo real",
    phoneSupport: "Soporte Telefonico",
    speakDirectlyTeam: "Habla directamente con nuestro equipo",
    contactUs: "Contactanos",
    startChat: "Iniciar Chat",
    callNow: "Llamar Ahora",
    readyToTryPurrify: "Listo para Probar Purrify?",
    startWithRiskFreeTrial: "Empieza con nuestro tamano de prueba sin riesgo y experimenta la diferencia por ti mismo.",
    compareAllSizes: "Comparar Todos los Tamanos",
    tryRiskFree: "Probar Sin Riesgo - $4.76",
    learnMoreAboutPurrify: "Aprende Mas Sobre Purrify",
    howItWorks: "Como Funciona",
    learnScience: "Aprende la ciencia detras de nuestra tecnologia de carbon activado y por que es tan efectiva.",
    catLitterGuide: "Guia de Arena para Gatos",
    completeGuide: "Guia completa de tipos de arena para gatos, consejos de mantenimiento y mejores practicas.",
    customerStories: "Historias de Clientes",
    realExperiences: "Lee experiencias reales de duenos de gatos que transformaron sus hogares con Purrify.",
    popularTag: "Popular",
    breadcrumbs: {
      home: "Inicio",
      learn: "Aprender",
      faq: "FAQ"
    },
    categoryList: [
      { name: "Todas las Preguntas" },
      { name: "Informacion del Producto" },
      { name: "Uso y Aplicacion" },
      { name: "Comparaciones" },
      { name: "Solucion de Problemas" },
      { name: "Envio y Entrega" },
      { name: "Pago y Facturacion" },
      { name: "Soporte al Cliente" }
    ],
    faqItems: [
      {
        question: "¿Que es Purrify y como funciona?",
        answer: "Purrify es un aditivo de carbon activado para arena de gatos que elimina olores a nivel molecular mediante un proceso llamado adsorcion. A diferencia de desodorantes que solo enmascaran olores, Purrify atrapa moleculas de olor (amoniaco, mercaptanos y otros compuestos) dentro de sus millones de poros microscopicos. Cada particula de nuestro carbon activado de cascara de coco tiene una enorme superficie interna - ¡1 gramo tiene la misma superficie que una cancha de tenis! Esto permite que Purrify elimine hasta el 99.5% de las moleculas de olor antes de que alcancen tu nariz, manteniendo tu hogar fresco por 7+ dias."
      },
      {
        question: "¿Es Purrify seguro para gatos y gatitos?",
        answer: "¡Si! Purrify esta hecho de 100% carbon activado natural de cascara de coco - el mismo material de grado alimenticio y no toxico usado en sistemas de filtracion de agua hospitalaria y purificadores de aire. Es completamente seguro si se ingiere (aunque tu gato no lo comera intencionalmente), no causa problemas respiratorios, y no contiene quimicos, fragancias o aditivos. Lo usan con confianza duenos de gatos con gatitos, gatos mayores y gatos con sensibilidades. De hecho, el carbon activado se usa en tratamientos veterinarios para intoxicacion porque es tan seguro y efectivo para unirse a toxinas."
      },
      {
        question: "¿Cuanto dura una botella de Purrify?",
        answer: "Depende del tamano que elijas y cuantos gatos tengas. Nuestra botella de Prueba de 30g dura 2 semanas para un gato (aplicacion cada 7 dias). El tamano Regular de 60g dura 4 semanas, el Grande de 120g dura 8 semanas, y el Ahorro de 240g dura 16 semanas para un hogar de un solo gato. Para multiples gatos, el tamano Grande (120g) o Ahorro (240g) proporciona el mejor valor ya que podrias necesitar aplicar con mas frecuencia en cajas de arena muy usadas."
      },
      {
        question: "¿Como aplico Purrify a mi arena para gatos?",
        answer: "¡Es increiblemente simple! Agita la botella, quita la tapa a presion, espolvorea 15g (aproximadamente 2 cucharadas) uniformemente sobre arena limpia, mezclalo ligeramente con tu recogedor, y listo. Para mejores resultados, aplica a arena fresca despues de un cambio completo de caja, o cuando notes que los olores empiezan a regresar (tipicamente cada 7 dias). No necesitas hacer calculos complicados - nuestra botella tiene marcas de medicion claras, y cada aplicacion toma menos de 30 segundos."
      },
      {
        question: "¿Funciona Purrify con todos los tipos de arena para gatos?",
        answer: "¡Absolutamente! Purrify es compatible con todos los tipos de arena: aglomerante, no aglomerante, arcilla, silice, madera, papel, trigo, maiz, y arenas naturales/ecologicas. Funciona mezclando a nivel molecular con el material de la arena sin interferir con sus propiedades de aglomeracion o absorcion. Ya sea que uses arena de $5 o premium de $50, Purrify mejora su rendimiento de control de olores sin cambiar como funciona."
      },
      {
        question: "¿Cual es la diferencia entre Purrify y desodorantes de caja de arena regulares?",
        answer: "Los desodorantes regulares enmascaran olores con fragancias fuertes (como poner perfume sobre basura), mientras Purrify elimina olores por completo mediante adsorcion molecular. La mayoria de desodorantes contienen bicarbonato de sodio, fragancias artificiales o aceites esenciales que solo ocultan olores temporalmente y pueden irritar las vias respiratorias de tu gato. El carbon activado de Purrify fisicamente atrapa y sostiene moleculas de olor dentro de su estructura porosa, eliminando la fuente del olor en lugar de solo cubrirla. Es por eso que Purrify dura 7+ dias mientras los desodorantes de fragancia tipicamente fallan en 24-48 horas."
      },
      {
        question: "¿Afectara Purrify la capacidad de aglomeracion de mi arena?",
        answer: "¡No en absoluto! Purrify esta disenado para trabajar con arena, no contra ella. El carbon activado no interfiere con formacion de grumos, absorcion de humedad o capacidad de recogida. Simplemente agrega una capa de control de olores que tu arena existente no puede proporcionar. De hecho, muchos clientes reportan que su arena parece funcionar mejor con Purrify porque se mantiene fresca por mas tiempo, permitiendoles sacar mas provecho de cada caja antes de cambios completos."
      },
      {
        question: "¿Puedo usar Purrify en cajas de arena automaticas?",
        answer: "¡Si! Purrify funciona excelentemente con cajas de arena automaticas como Litter-Robot, PetSafe ScoopFree y otras. Solo espolvorea y mezcla como de costumbre antes de que tu gato use la caja. El polvo fino no interferira con sensores o mecanismos de rastrillo. De hecho, el control de olores mejorado es particularmente valioso con cajas automaticas ya que la arena permanece en la unidad por mas tiempo entre cambios completos."
      },
      {
        question: "¿Necesito mas para multiples gatos?",
        answer: "Para multiples gatos, podrias necesitar aplicar Purrify con mas frecuencia (cada 5-6 dias en lugar de cada 7) o usar una cantidad ligeramente mayor por aplicacion. Nuestra recomendacion: hogares de 1-2 gatos → tamano Regular de 60g o Grande de 120g; hogares de 3+ gatos → tamano Grande de 120g o Ahorro de 240g para mejor valor. El tamano Ahorro es especialmente economico para hogares multi-gatos ya que reduces el costo por aplicacion."
      },
      {
        question: "¿Que hace que el carbon activado de Purrify sea diferente al carbon regular?",
        answer: "El carbon activado pasa por un proceso de activacion especializado a alta temperatura que crea millones de poros microscopicos, dandole 100-300 veces mas superficie que carbon regular. Nuestro carbon de cascara de coco especificamente se elige porque tiene la estructura de poros ideal para atrapar moleculas de olor de tamano pequeno como amoniaco (0.26nm) y mercaptanos (0.4nm). Carbon regular de brickets de parrilla o ceniza de madera carece de esta microestructura porosa y no proporcionaria esencialmente ningun control de olores."
      },
      {
        question: "¿Cuanto cuesta Purrify por mes?",
        answer: "Depende del tamano que elijas. Para un gato: Prueba $4.76 por 2 semanas ($9.52/mes), Regular $8.52 por mes, Grande $7.97/mes (mejor valor), Ahorro $7.44/mes (precio mas bajo). Para multiples gatos, recomendamos el tamano Grande o Ahorro ya que podrias necesitar aplicar con mas frecuencia. El Grande de 120g ofrece el mejor equilibrio de valor y conveniencia para la mayoria de hogares - menos de $2/semana para aire completamente fresco."
      },
      {
        question: "¿Ofrece Purrify envio gratis?",
        answer: "¡Si! Ofrecemos envio gratis en ordenes sobre $35 en Canada. La mayoria de clientes alcanzan esto facilmente comprando un tamano Grande de 120g ($15.95) o Ahorro de 240g ($29.76), o agrupando multiples articulos. Las ordenes tipicamente llegan en 5-7 dias habiles via Canada Post. Para ordenes menores a $35, las tarifas de envio estandar aplican basadas en tu ubicacion."
      },
      {
        question: "¿Que tan rapido funciona Purrify?",
        answer: "¡Veras (o mas bien, oleras) resultados inmediatamente! En cuanto espolvoreas Purrify, el carbon activado comienza a atrapar moleculas de olor. La mayoria de clientes notan mejora dramatica en control de olores dentro de las primeras horas. A diferencia de soluciones de fragancia que solo enmascaran olores temporalmente, la adsorcion de Purrify trabaja 24/7 por 7+ dias, mejorando continuamente mientras mas moleculas de olor son atrapadas."
      },
      {
        question: "¿Puedo usar Purrify con otras soluciones de control de olores?",
        answer: "¡Si! Purrify funciona bien con otras soluciones de control de olores, aunque la mayoria de clientes encuentran que ya no las necesitan. Puedes usarlo junto con revestimientos de caja de arena, tapetes o cajas de arena cerradas. Sin embargo, evita bicarbonato de sodio o fragancias en polvo fuertes ya que estos pueden interferir con la capacidad del carbon de atrapar olores. Para mejores resultados, deja que Purrify sea tu solucion principal de control de olores - es mas efectivo que cualquier cosa que puedas combinar con el."
      },
      {
        question: "¿Cual es tu politica de devolucion?",
        answer: "Ofrecemos una garantia sin preguntas de 30 dias. Si no estas completamente satisfecho con Purrify por cualquier razon, contactanos dentro de 30 dias de tu compra para un reembolso completo. Solo pagamos envio de retorno (si aplica) - de lo contrario queda el producto. Estamos tan confiados en que amaras Purrify que hacemos el retorno completamente sin riesgo. Para iniciar un retorno, simplemente envia un correo a hello@purrify.com."
      },
      {
        question: "¿Es Purrify ecologico y sustentable?",
        answer: "¡Absolutamente! Purrify esta hecho de 100% cascaras de coco renovables - un subproducto de la industria del coco que de otro modo seria desperdicio. No contiene quimicos sinteticos, fragancias artificiales o aditivos. El empaque es reciclable, y debido a que Purrify extiende la vida de tu arena, en realidad reduces desperdicio de arena en general. Al usar una fuente natural y renovable mientras ayudas a tu arena a durar mas, Purrify es una de las soluciones de control de olores mas ecologicas disponibles."
      },
      {
        question: "¿Funcionara Purrify en hogares con multiples cajas de arena?",
        answer: "¡Si! Solo aplica Purrify a cada caja de arena de manera independiente. Si tienes 2-3 cajas, el tamano Grande de 120g o Ahorro de 240g proporcionan el mejor valor ya que puedes tratar multiples cajas con una compra. Muchos hogares multi-caja usan la regla 'una caja por gato mas una', y Purrify funciona perfectamente en esta configuracion - solo espolvorea 15g por caja cada 7 dias."
      },
      {
        question: "¿Puedo usar menos Purrify que lo recomendado?",
        answer: "Aunque tecnicamente puedes usar menos, recomendamos los completos 15g (aproximadamente 2 cucharadas) por aplicacion para control de olores optimo. Usar menos puede no proporcionar suficiente carbon activado para atrapar efectivamente todas las moleculas de olor en tu caja, especialmente hacia el final del ciclo de 7 dias. Piensalo como seguro de control de olores - los 15g completos aseguran maxima efectividad. Si buscas ahorrar, nuestro tamano Ahorro de 240g ofrece el mejor costo por aplicacion a $1.86."
      },
      {
        question: "¿Que pasa si mi gato es asmático o tiene alergias?",
        answer: "Purrify es excelente para gatos con asma o alergias porque no contiene fragancias, quimicos o particulas irritantes. A diferencia de desodorantes perfumados que pueden desencadenar problemas respiratorios, el carbon activado es inerte e inodoro. De hecho, purificadores de aire con filtros de carbon activado se recomiendan comunmente para duenos de gatos con asma. Como siempre, si tu gato tiene condiciones de salud graves, consulta a tu veterinario, pero Purrify es una de las opciones de control de olores mas seguras y suaves disponibles."
      },
      {
        question: "¿Como se compara Purrify con cajas de arena cerradas para control de olores?",
        answer: "Purrify y cajas de arena cerradas resuelven diferentes problemas. Las cajas cerradas contienen olores (evitan que se dispersen) pero no eliminan olores - el aire dentro de la caja aun huele terrible, y cuando tu gato entra o sales para recoger, esos olores concentrados escapan. Purrify en realidad elimina olores a nivel molecular, asi que no hay nada que contener. Muchos clientes usan ambos - Purrify dentro de una caja cerrada para proteccion doble - ¡pero la mayoria encuentran que Purrify solo elimina la necesidad de una caja cerrada completamente!"
      },
      {
        question: "¿Necesito carbon activado especial para cajas de arena?",
        answer: "¡Si! No todos los carbon activado son iguales. Carbon de acuarios, purificadores de aire o productos de jardineria esta optimizado para diferentes tamanos de moleculas y tipos de contaminantes. El carbon activado de cascara de coco de Purrify esta especificamente seleccionado y de tamano de particula ideal para atrapar las moleculas especificas de olor de caja de arena (amoniaco, mercaptanos, compuestos volatiles de azufre) que existen en rango de 0.2-0.5nm. Usar carbon de proposito general seria como usar un filtro de cafe para filtrar agua - material equivocado para el trabajo."
      },
      {
        question: "¿Puedo comprar Purrify en tiendas?",
        answer: "Actualmente, Purrify esta disponible principalmente a traves de nuestro sitio web para asegurar frescura, calidad y precio directo al consumidor. Estamos trabajando en asociaciones minoristas y podriamos estar en tiendas selectas pronto. Ordenar en linea significa que obtienes el producto mas fresco directamente de nosotros, sin sobrecargos minoristas. Ademas, nuestra tienda web ofrece descuentos por cantidad, envio gratis sobre $35, y suscripcion con ahorro que no encontraras en tiendas."
      },
      {
        question: "¿Que pasa si olvido aplicar Purrify despues de 7 dias?",
        answer: "No hay problema! Purrify no deja de funcionar magicamente en el dia 8. Los poros de carbon gradualmente se saturan con el tiempo, asi que podrias notar olores ligeramente mas fuertes hacia el dia 8-10. Simplemente aplica tu siguiente dosis de 15g cuando lo recuerdes. Para memoria consistente, muchos clientes eligen un 'dia Purrify' semanal (como domingos) y lo agregan a su rutina de limpieza de caja de arena. Algunos establecen recordatorios de calendario movil."
      },
      {
        question: "¿Purrify crea polvo cuando lo espolvoreo?",
        answer: "Purrify es un polvo fino, asi que hay algo de polvo minimo durante la aplicacion - similar a espolvorear bicarbonato de sodio. Para minimizar polvo: (1) espolvorea cerca de la superficie de arena en lugar de desde alto, (2) espolvorea lentamente en lugar de verter rapidamente, (3) mezcla suavemente despues de aplicar. El polvo se asienta rapidamente en la arena y se vuelve indetectable una vez mezclado. A diferencia de desodorantes perfumados, el carbon activado no crea nubes de fragancia cuando los gatos cavan."
      },
      {
        question: "¿Puedo usar Purrify en arena para gatos casera?",
        answer: "¡Si! Purrify funciona con soluciones caseras de arena como pellets de madera, periodico triturado, arena o serrín. De hecho, materiales caseros tipicamente carecen del control de olores incorporado de arenas comerciales, asi que Purrify es especialmente valioso. Solo espolvorea 15g sobre tu material de caja casero y mezcla. El carbon activado trabajara exactamente de la misma manera - atrapando moleculas de olor independientemente de que material de caja estes usando."
      },
      {
        question: "¿Como se el tamaño correcto de Purrify para comprar?",
        answer: "Para un gato: Prueba de 30g (2 semanas) para probarlo, Regular de 60g (1 mes) para uso ocasional, Grande de 120g (2 meses, ¡mejor valor!), Ahorro de 240g (4 meses) para usuarios comprometidos. Para 2-3 gatos: Grande de 120g o Ahorro de 240g ya que podrias aplicar con mas frecuencia. Para 4+ gatos o hogares multi-caja: Ahorro de 240g o multiples botellas. ¿Aun no estas seguro? La mayoria de clientes primerizos comienzan con Regular de 60g o Grande de 120g."
      },
      {
        question: "¿Necesito mezclar Purrify en la arena o solo espolvorearlo encima?",
        answer: "Para mejores resultados, mezcla ligeramente Purrify en los 2-3 pulgadas superiores de arena usando tu recogedor. Esto distribuye el carbon activado a traves de la capa donde tu gato cava y donde se forma la orina. No necesitas mezclar profundamente o lograr distribucion perfecta - solo algunos golpes suaves con el recogedor es suficiente. Algunas personas simplemente lo espolvoran encima y dejan que el cavado de su gato lo mezcle naturalmente, lo que tambien funciona, pero mezclar manualmente asegura cobertura mas uniforme desde el dia 1."
      },
      {
        question: "¿Funcionara Purrify para gatos mayores con orina muy fuerte?",
        answer: "¡Absolutamente! Gatos mayores tipicamente tienen orina mas concentrada, haciendo el control de olores mas desafiante. El carbon activado de Purrify es especialmente efectivo para amoniaco fuerte y mercaptanos en orina de gato mayor. Muchos clientes especificamente compran Purrify porque sus gatos mayores producen olores que arena regular no puede manejar. Para casos particularmente fuertes, podrias aplicar cada 5-6 dias en lugar de cada 7, pero la mayoria encuentra el cronograma de 7 dias funciona incluso para gatos mayores."
      },
      {
        question: "¿Puedo usar Purrify en bandejas de entrenamiento para gatitos?",
        answer: "¡Si! Purrify es completamente seguro para gatitos y funciona igual de bien en sus bandejas de entrenamiento mas pequenas. Solo ajusta la cantidad basado en el tamano de la bandeja - usa aproximadamente 1 cucharada (7-8g) para bandejas de gatitos mas pequenas en lugar de los completos 15g. Esto ayuda a gatitos jovenes a asociar positivamente su caja de arena con limpieza y frescura, estableciendo buenos habitos de caja de arena desde el inicio."
      },
      {
        question: "¿Que pasa si derramo Purrify en mi piso?",
        answer: "No te preocupes! El carbon activado es completamente seguro e inerte. Solo barre o aspira el polvo derramado como cualquier otro polvo doméstico. No manchara pisos, alfombras o telas. Si cae en alfombra, aspira completamente - el polvo negro fino puede ser visible en alfombras de color claro hasta que se aspire. Evita fregarlo húmedo ya que eso puede extender el polvo; siempre limpia en seco primero."
      },
      {
        question: "¿Puedo suscribirme para entregas automaticas?",
        answer: "¡Si! Ofrecemos suscripciones de envio automatico con 10% de descuento. Elige tu tamano preferido y frecuencia de entrega (cada 4, 8 o 12 semanas) y automaticamente enviaremos Purrify a tu puerta antes de que te quedes sin el. Puedes pausar, saltar o cancelar en cualquier momento - sin contratos ni compromisos. La mayoria de clientes de 1 gato eligen entrega del tamano Grande de 120g cada 8 semanas para nunca quedarse sin Purrify manteniendo bajo el costo por aplicacion."
      },
      {
        question: "¿Como se compara Purrify con productos de baking soda para control de olores?",
        answer: "El bicarbonato de sodio neutraliza olores a través de reacciones químicas, pero tiene capacidad limitada y deja de funcionar una vez que la reacción se completa (tipicamente 24-48 horas en cajas de arena). El carbon activado de Purrify fisicamente atrapa moleculas de olor en sus poros mediante adsorcion, que dura mucho mas tiempo (7+ dias) y funciona en un rango mas amplio de moleculas de olor. El bicarbonato de sodio también puede ser polvoriento y menos efectivo contra olores fuertes de amoniaco, mientras el carbon de Purrify fue especificamente diseñado para moleculas de olor de caja de arena."
      },
      {
        question: "¿Ofrecen descuentos por cantidad?",
        answer: "¡Si! Cuanto mas compras, mas ahorras: compra 2-3 botellas → ahorra 10%, compra 4-5 botellas → ahorra 15%, compra 6+ botellas → ahorra 20%. Estos descuentos se apilan con nuestro ya economico tamano Ahorro de 240g. Los hogares multi-gatos o clientes que compran para amigos a menudo aprovechan descuentos por cantidad. Ademas, envio gratis en ordenes sobre $35 hace que compras al por mayor sean aun mas valiosas."
      },
      {
        question: "¿Que debo hacer si Purrify no esta funcionando para mi?",
        answer: "Primero, asegurate de estar usando los completos 15g (aproximadamente 2 cucharadas) por aplicacion y aplicar a arena limpia. Segundo, verifica que tu arena no este vencida u sobre-saturada (si tiene mas de 2-3 semanas, podria ser tiempo para un cambio completo). Tercero, para olores particularmente fuertes (multiples gatos, gatos mayores), intenta aplicar cada 5-6 dias en lugar de cada 7. Si has intentado estos pasos y aun no estas satisfecho, contactanos - estamos respaldados por nuestra garantia de 30 dias y trabajaremos contigo para solucionar el problema o proporcionar un reembolso completo."
      },
      {
        question: "¿Puedo usar Purrify en cajas de arena para conejos u otras mascotas pequenas?",
        answer: "¡Absolutamente! Mientras Purrify esta diseñado para cajas de arena para gatos, funciona igualmente bien para cajas de arena de conejos, hurones, cobayas, chinchillas y otras mascotas pequenas. Solo ajusta la cantidad basado en el tamano de la caja - usa aproximadamente 10-15g dependiendo del tamano. El carbon activado es seguro para todas las mascotas pequenas, no toxico si se ingiere, y efectivamente controla los olores de orina de cualquier mamifero pequeno."
      },
      {
        question: "¿Como debo almacenar Purrify?",
        answer: "Almacena Purrify en un lugar fresco y seco con la tapa a presion bien cerrada. Evita exposicion a humedad alta, que puede causar que el carbon activado comience a adsorber humedad del aire en lugar de guardar su capacidad para olores de caja de arena. No refrigeres o congeles - temperatura ambiente en un gabinete o despensa es perfecto. Propiamente almacenado, Purrify mantiene efectividad total por 2-3 años. La botella es compacta y se guarda facilmente debajo del lavabo, en gabinetes de limpieza o donde sea que guardes suministros de caja de arena."
      },
      {
        question: "¿Puedo viajar con Purrify?",
        answer: "¡Si! Purrify es seguro para viaje. La botella de tapa a presion es a prueba de derrames y el carbon activado no es liquido ni aerosol, asi que esta bien para equipaje de mano o documentado. Si viajas con tu gato y llevas una caja de arena portatil, simplemente lleva una pequena cantidad en la botella de Prueba de 30g. Es especialmente util para habitaciones de hotel, casas de alquiler vacacional o al visitar familia - espolvorea Purrify en la caja de arena temporal de tu gato para mantener el espacio de alquiler libre de olores."
      }
    ]
  },

  // Common UI Elements
  ui: {
    // Review System
    allRatings: "Todas las Calificaciones",
    allSizes: "Todos los Tamanos",
    newestFirst: "Mas Recientes Primero",
    oldestFirst: "Mas Antiguos Primero",
    highestRated: "Mejor Calificados",
    lowestRated: "Peor Calificados",
    mostHelpful: "Mas Utiles",
    verifiedPurchase: "Compra Verificada",

    // Payment & Cart
    securePayment: "Pago Seguro",
    shoppingCart: "Carrito de Compras",

    // General
    happyCustomers: "Clientes Felices",
    moneyBack: "Soporte Experto",
    averageRating: "Calificacion Promedio",
    satisfactionRate: "Tasa de Satisfaccion",
    skipAnytime: "Salta Cuando Quieras",
    highlyRated: "Altamente Calificado",
    errorDetails: "Detalles del Error",
    moneyBackGuarantee: "Garantia de 30 Dias"
  },

  // Exit Intent Popup
  exitPopup: {
    title: "Espera! No te vayas con las manos vacias",
    subtitle: "Obtiene 10% de descuento en tu primera orden",
    description: "Unete a miles de padres de gatos felices y obtiene ofertas exclusivas. Excluye la oferta de prueba gratuita.",
    placeholder: "Ingresa tu correo",
    button: "Obtener Mi Descuento",
    noThanks: "No gracias, prefiero precio completo",
    successTitle: "Ya estas dentro!",
    successMessage: "Usa el codigo WELCOME10 al pagar para 10% de descuento!"
  },

  // Homepage specific translations
  homepage: {
    seo: {
      pageTitle: "Aditivo de Control de Olores de Arena para Gatos",
      keywords: "control de olores arena gatos, arena gatos carbon activado, aditivo natural arena gatos, control de olores mascotas sin fragancia, desodorizante arena gatos, eliminacion olor mascotas, productos cuidado gatos, control natural olores, solucion arena gatos, suministros mascotas EE.UU., suministros mascotas Canada, envios a EE.UU.",
      openGraphImageAlt: "Solucion Premium de Control de Olores de Arena para Gatos",
      videoAlt: "Demostracion de Efectividad del Aditivo Purrify para Arena de Gatos",
      videoDescription: "Aditivo Purrify para Arena de Gatos en Accion - Demostracion Antes y Despues",
      videoEffectivenessDemo: "Demostracion de Efectividad del Aditivo Purrify para Arena de Gatos"
    },
    trustBadges: {
      securePayment: {
        title: "Pago Seguro",
        description: "SSL 256-bit",
        detail: "Pago encriptado con SSL a traves de Stripe"
      }
    },
    socialProof: {
      nationalDelivery: "100% Natural - Hecho en Canada - Envios a EE.UU.",
      fastDelivery: "Entrega rapida a EE.UU. y Canada",
      recentOrders: "ordenes esta semana"
    },
    hero: {
      videoAriaLabel: "Video demostrativo mostrando el aditivo de carbon activado Purrify eliminando olores de arena de gatos antes y despues de la aplicacion",
      videoFallbackText: "Tu navegador no soporta la etiqueta de video. Este video demuestra el aditivo de carbon activado Purrify eliminando olores antes y despues de la aplicacion en arena de gatos.",
      videoDescriptions: "Descripciones en Espanol",
      highlyRated: "Altamente Calificado",
      moneyBackGuarantee: "Equipo de Soporte Experto",
      freeShippingCanada: "Envio Gratis en Canada"
    },
    enhancedComparison: {
      duration: "Duracion",
      coverage: "Cobertura",
      chooseYourPerfectSize: "Elige Tu Tamano Perfecto",
      allSizesDeliver: "Todos los tamanos entregan la misma poderosa eliminacion de olores. Elige segun el tamano de tu hogar y frecuencia de uso.",
      whyChoosePurrify: "Convierte los Problemas de Olor de Gato en Cosa del Pasado",
      joinThousands: "Unete a mas de 1,000 padres de gatos satisfechos que confian en Purrify",
      happyCustomers: "Clientes Felices",
      averageRating: "Calificacion Promedio",
      satisfactionRate: "Tasa de Satisfaccion",
      odorFreeGuarantee: "Aire fresco con cada aplicacion",
      tryRiskFree: "Probar Sin Riesgo",
      chooseThisSize: "Elegir Este Tamano"
    },
    altText: {
      scientificDiagram: "Diagrama cientifico mostrando la estructura molecular del carbon activado con microporos que atrapan moleculas de olor",
      productPackages: "Tres paquetes de productos Purrify mostrando diferentes tamanos: prueba 12g, estandar 50g, y paquete familiar 120g",
      microscopicView: "Vista microscopica del carbon activado mostrando estructura porosa que captura moleculas de olor",
      happyCat: "Gato feliz descansando tranquilamente en un ambiente domestico fresco y sin olores",
      happyCatAlt: "Gato feliz",
      userAvatar: "Usuario",
      customerTestimonials: "Ver testimonios de clientes",
      leaveGoogleReview: "Dejar una opinion en Google",
      litterCompatibility: "Gato disfrutando su arena favorita mientras Purrify funciona con cualquier tipo de arena"
    },
    subscription: {
      fastDelivery: "Entrega Rapida",
      quickReliableShipping: "Envio rapido y confiable",
      skipAnytime: "Salta Cuando Quieras",
      fullControlDeliveries: "Control total sobre entregas",
      lovedByCustomers: "Amado por mas de 1,000 clientes",
      joinSatisfiedCustomers: "Unete a mas de 1,000 clientes satisfechos:",
      thirtyDayGuarantee: "Soporte continuo de olores",
      moneyBackPromise: "Atencion al cliente dedicada",
      fiveStarRated: "Calificacion 5 Estrellas",
      reviewsRating: "4.9/5 de 138 opiniones",
      testimonialQuote: "\"He ahorrado mas de $200 este ano con mi suscripcion, y la caja de arena de mis gatos nunca huele!\" - Sarah M."
    }
  },

  // Blog
  blog: {
    multiCat: {
      title: "7 Maneras de Controlar el Olor de Arena Multi-Gatos",
      description: "Abrumado por el olor de caja de arena de multiples gatos? Estos 7 metodos probados eliminan hasta los olores de amoniaco multi-gatos mas fuertes. Deja de temer llegar a casa con ese olor horrible!",
      category: "Guia para Hogares Multi-Gatos",
      publishDate: "Publicado el 16 de septiembre de 2024",
      readTime: "12 min de lectura",
      breadcrumb: "Soluciones Multi-Gatos",
      stats: {
        title: "Estadisticas de Hogares Multi-Gatos",
        strongerOdors: "Olores mas fuertes vs gato solo",
        litterBoxes: "Cajas de arena minimo por gato",
        moreDeodorizer: "Mas desodorizante necesario",
        maintenance: "Mantenimiento requerido"
      }
    },
    odorAbsorber: {
      title: "Absorbente de Olores Mas Potente para Arena de Gatos: Guia Cientifica 2025",
      description: "Descubre las estrategias de absorbente de olores mas potentes para cajas de arena de gatos. Compara carbon activado, zeolita y sistemas hibridos para que tu hogar se mantenga fresco sin perfumes fuertes.",
      category: "Ciencia y Tecnologia de Olores",
      publishDate: "Publicado el 19 de octubre de 2025",
      readTime: "14 min de lectura",
      breadcrumb: "Ciencia de Olores",
      stats: {
        title: "Parametros de Eliminacion de Olores",
        ammoniaReduction: "Datos de laboratorio independiente muestran hasta 92% de reduccion de amoniaco con capas de carbon activado",
        adsorptionSpeed: "La estructura porosa del carbon atrapa moleculas de olor en menos de 60 segundos",
        safeUsage: "Sin quimicos, fragancias ni aditivos - no toxico para gatos sensibles",
        refreshTiming: "Refresca el carbon con cada limpieza o relleno de arena para rendimiento consistente"
      }
    }
  },

  // Retailers & B2B
  retailers: {
    seo: {
      pageTitle: "Desodorizante de Arena Gatos Mayorista | 50% Margenes para Tiendas de Mascotas",
      description: "Minoristas de Mascotas: 50%+ margenes en el desodorizante de arena #1 mas reordenado de Canada. Materiales POS gratis + soporte de marketing. Convierte en socio mayorista hoy.",
      openGraphAlt: "Socios Mayoristas",
      keywords: "desodorizante arena gatos mayorista, mayorista tienda mascotas, distribuidor aditivo arena gatos, productos arena gatos a granel, suministros mascotas mayorista Canada, asociacion minorista mascotas"
    },
    map: {
      title: "Nuestros Socios Minoristas y Clientes | Red Purrify",
      description: "Descubre nuestra red creciente de minoristas y clientes satisfechos en Canada. Unete a nuestra familia de socios exitosos."
    },
    hero: {
      badge: "#1 Socio de Tiendas de Mascotas en Canada",
      title: "Asociate con Purrify",
      subtitle: "Exito Mayorista",
      description: "Unete a cientos de tiendas de mascotas y minoristas que ofrecen el aditivo de carbon activado #1 de Canada. Ventas comprobadas, clientes leales, soporte de marketing incluido.",
      boostYour: "Aumenta Tus",
      petStoreProfits: "Ganancias de Tienda",
      mainDescription: "Unete a <strong class=\"text-[#5B2EFF] dark:text-[#3694FF]\">21 minoristas establecidos</strong> vendiendo la solucion de olores de gatos #1 de Canada con <strong>margenes del 50%+</strong>",
      retailerCount: "21 minoristas establecidos",
      marginHighlight: "margenes del 50%+",
      stats: {
        profitMargins: {
          value: "50%",
          label: "Margenes de Ganancia"
        },
        repurchaseRate: {
          value: "89%",
          label: "Tasa de Recompra"
        },
        setupTime: {
          value: "24h",
          label: "Tiempo de Configuracion"
        }
      },
      cta: {
        primary: "Ver Precios Mayoristas",
        secondary: "Convertirse en Socio",
        startPartnership: "Iniciar Asociacion Hoy",
        viewPricing: "Ver Precios"
      },
      trustIndicators: {
        label: "Confiado por minoristas lideres:",
        types: {
          petStores: "Tiendas de Mascotas",
          vetClinics: "Clinicas Veterinarias",
          groomers: "Peluquerias",
          distributors: "Distribuidores"
        }
      },
      valueProps: {
        highMargin: {
          title: "Producto de Alto Margen",
          highlight: "Hasta 55% de margenes de ganancia",
          description: "Precios premium con envio liviano. Mayores margenes que productos tradicionales de arena pesada."
        },
        customerLoyalty: {
          title: "Lealtad del Cliente",
          highlight: "Calificacion 4.8/5 estrellas",
          description: "Los clientes se vuelven defensores leales. Recompras mensuales y referencias impulsan ingresos constantes."
        },
        completeSupport: {
          title: "Soporte Completo",
          highlight: "Todo incluido",
          description: "Materiales POS, capacitacion, soporte de marketing y gestion de cuenta dedicada incluidos."
        }
      }
    },
    benefits: {
      pricing: {
        title: "Precios Mayoristas",
        description: "Hasta 50% de margenes con descuentos por volumen"
      },
      marketing: {
        title: "Soporte de Marketing",
        description: "Materiales POS, capacitacion, publicidad cooperativa"
      },
      proven: {
        title: "Producto Probado",
        description: "4.8/5 estrellas, alta tasa de recompra"
      },
      highDemand: {
        title: "Alta Demanda de Clientes",
        description: "Los duenos de mascotas buscan activamente soluciones de olores. Purrify aborda la queja #1 sobre tener gatos - olores de caja de arena."
      },
      highMargins: {
        title: "Margenes Premium",
        description: "Producto pequeno y liviano con alto valor percibido. Mejores margenes que productos tradicionales de arena pesada."
      },
      easyStocking: {
        title: "Facil de Almacenar",
        description: "Empaque compacto ahorra espacio de estante. No requiere refrigeracion. Larga vida util sin preocupaciones de expiracion."
      },
      marketingSupport: {
        title: "Soporte de Marketing Completo",
        description: "Proporcionamos todo lo que necesitas: exhibidores de estante, capacitacion de producto, materiales educativos para clientes y publicidad cooperativa."
      },
      customerLoyalty: {
        title: "Construye Lealtad del Cliente",
        description: "Cuando Purrify resuelve su problema de olores, los clientes se vuelven leales a tu tienda. Regresan mensualmente y recomiendan a amigos."
      },
      fastMoving: {
        title: "Inventario de Movimiento Rapido",
        description: "A diferencia de accesorios de mascotas de lento movimiento, Purrify es un producto consumible con reordenes mensuales predecibles."
      },
      title: "Por que los Minoristas Eligen Purrify",
      description: "Unete a cientos de tiendas de mascotas y minoristas exitosos que han agregado Purrify a su linea de productos con resultados sobresalientes.",
      success: {
        title: "Historias de Exito Reales"
      }
    },
    pricing: {
      title: "Niveles de Precios Mayoristas",
      description: "Opciones de precios flexibles disenadas para maximizar tus margenes mientras proporcionas valor excepcional a tus clientes.",
      tiers: {
        starter: {
          name: "Inicial",
          description: "Perfecto para tiendas de mascotas pequenas"
        },
        growth: {
          name: "Crecimiento",
          description: "Mas popular para tiendas establecidas"
        },
        enterprise: {
          name: "Empresarial",
          description: "Para cadenas y grandes minoristas"
        }
      },
      additional: {
        title: "Descuentos por Volumen Disponibles",
        description: "Buscas cantidades mayores? Ofrecemos precios personalizados para cadenas, distribuidores y minoristas de alto volumen. Contactanos para una cotizacion personalizada."
      }
    },
    marketing: {
      title: "Soporte de Marketing Completo",
      description: "Proporcionamos todo lo que necesitas para vender Purrify exitosamente. Desde exhibidores en tienda hasta capacitacion del personal, te tenemos cubierto.",
      coop: {
        title: "Programa de Publicidad Cooperativa",
        description: "Califica para creditos de publicidad para promocionar Purrify en tu mercado local. Te ayudaremos a cubrir costos para anuncios en periodicos, spots de radio y campanas de marketing local."
      }
    },
    testimonials: {
      title: "Lo que Dicen Nuestros Socios Minoristas",
      description: "Retroalimentacion real de duenos y gerentes exitosos de tiendas de mascotas en Canada.",
      metrics: {
        title: "Resultados Comerciales Comprobados"
      }
    },
    wholesalePricing: {
      sectionBadge: "Precios Mayoristas Transparentes",
      title: "Elige Tu",
      titleHighlight: "Nivel de Ganancias",
      subtitle: "Asociate con la solucion de olores de gatos de mas rapida venta de Canada. Sin tarifas ocultas, sin sorpresas.",
      packageIncludes: "El Paquete Incluye:",
      tiers: {
        starter: {
          name: "Paquete Inicial",
          description: "Perfecto para probar el mercado",
          contents: [
            "Una caja de tamano de prueba (25 bolsas pequenas)",
            "Una caja de mediano (15 bolsas medianas)",
            "Una caja de grande (10 bolsas grandes)"
          ],
          features: [
            "Producto probado 4.8/5 estrellas",
            "Ventaja de envio liviano",
            "Exhibidor POS basico incluido",
            "Soporte por correo y guia de configuracion",
            "Reemplazo gratis de productos danados"
          ],
          badge: "Inicio Rapido",
          cta: "Comenzar"
        },
        growth: {
          name: "Socio de Crecimiento",
          description: "La opcion inteligente para minoristas en crecimiento",
          contents: [
            "Cinco cajas de tamano de prueba (125 bolsas pequenas)",
            "Cinco cajas de mediano (75 bolsas medianas)",
            "Cinco cajas de grande (50 bolsas grandes)",
            "BONUS: 5 bolsas medianas extra gratis"
          ],
          features: [
            "Exhibidor de mostrador premium",
            "Materiales de capacitacion para personal",
            "Activos de marketing digital (publicaciones sociales, plantillas de correo)",
            "Soporte prioritario por telefono y correo"
          ],
          badge: "Mejor Valor",
          cta: "Empezar a Crecer Ahora"
        },
        scale: {
          name: "Escalar Exito",
          description: "Para crecimiento serio de ingresos",
          contents: [
            "Diez cajas de tamano de prueba (250 bolsas pequenas)",
            "Diez cajas de mediano (150 bolsas medianas)",
            "Diez cajas de grande (100 bolsas grandes)",
            "BONUS: 25 bolsas de prueba extra para enganchar nuevos clientes"
          ],
          features: [
            "Todo en Socio de Crecimiento",
            "Gerente de cuenta dedicado",
            "Materiales de marketing personalizados y co-branding",
            "Derechos de proteccion territorial",
            "Revisiones comerciales trimestrales y analiticas de ventas",
            "Asignacion prioritaria de inventario"
          ],
          badge: "Empresarial",
          cta: "Comenzar"
        }
      },
      trustSignals: {
        noSetupFees: "Sin Tarifas de Configuracion",
        approval72hr: "Aprobacion en 72h",
        provenROI: "ROI Comprobado"
      },
      bottomCta: {
        title: "Listo para Aumentar Tus Ingresos?",
        description: "Unete a 21 minoristas establecidos de Montreal y areas circundantes que ya obtienen altos margenes con Purrify.",
        setupNote: "La configuracion toma menos de 24 horas.",
        primaryButton: "Solicitar Asociacion",
        secondaryButton: "Llamanos"
      }
    },
    contact: {
      title: "Conviertete en Socio Minorista de Purrify",
      description: "Listo para agregar el aditivo de arena #1 de Canada a tu tienda? Completa el formulario abajo y te responderemos en 24 horas.",
      // Header section
      sectionBadge: "Unete a 21 Socios Establecidos",
      sectionTitle: "Inicia Tu",
      sectionTitleHighlight: "Asociacion Hoy",
      sectionDescription: "Listo para obtener margenes del 50%+ con la solucion #1 de olores de gatos de Canada?",
      setupNote: "La configuracion toma menos de 24 horas.",
      // Urgency stats
      urgencyStats: {
        approvalTime: {
          value: "72h",
          label: "Tiempo de Aprobacion"
        },
        setupFees: {
          value: "Cero",
          label: "Tarifas de Configuracion"
        },
        currentPartners: {
          value: "21",
          label: "Socios Actuales"
        }
      },
      // Form section
      form: {
        title: "Solicitud de Asociacion",
        subtitle: "Solicitud rapida de 2 minutos. Respondemos el mismo dia!",
        fields: {
          businessName: {
            label: "Nombre del Negocio",
            placeholder: "Nombre de Tu Tienda de Mascotas",
            required: true
          },
          contactName: {
            label: "Nombre de Contacto",
            placeholder: "Tu Nombre Completo",
            required: true
          },
          position: {
            label: "Tu Posicion en la Empresa",
            placeholder: "ej., Dueno, Gerente, Comprador, Representante de Ventas"
          },
          email: {
            label: "Correo Electronico",
            placeholder: "tu@email.com",
            required: true
          },
          phone: {
            label: "Numero de Telefono",
            placeholder: "(555) 123-4567"
          },
          businessType: {
            label: "Tipo de Negocio",
            placeholder: "Seleccionar Tipo de Negocio",
            required: true,
            options: {
              independentPetStore: "Tienda de Mascotas Independiente",
              petStoreChain: "Cadena de Tiendas de Mascotas",
              veterinaryClinic: "Clinica Veterinaria",
              groomingSalon: "Salon de Peluqueria",
              distributor: "Distribuidor",
              other: "Otro"
            }
          },
          locations: {
            label: "Numero de Ubicaciones",
            placeholder: "1"
          },
          currentProducts: {
            label: "Marca de Arena para Gatos Mas Vendida",
            placeholder: "Cual es la marca #1 de arena para gatos que mas vendes?"
          },
          message: {
            label: "Informacion Adicional",
            placeholder: "Cuentanos sobre tu negocio y necesidades mayoristas..."
          }
        },
        submitButton: "Enviar Solicitud de Asociacion",
        submitting: "Enviando..."
      },
      // Success state
      success: {
        title: "Solicitud Recibida!",
        welcome: "Bienvenido a la Red de Socios Purrify!",
        responseTime: "Te contactaremos dentro de 72 horas.",
        nextSteps: {
          title: "Tus Proximos Pasos",
          step1: {
            title: "Revision de Solicitud",
            description: "Nuestro equipo revisa los detalles de tu tienda"
          },
          step2: {
            title: "Llamada de Asociacion",
            description: "Discutir precios, soporte y logistica"
          },
          step3: {
            title: "Comenzar a Vender",
            description: "Recibir inventario y lanzar"
          }
        },
        timeline: {
          title: "Cronograma Esperado hasta Ingresos",
          approval: {
            value: "72h",
            label: "Aprobacion"
          },
          firstShipment: {
            value: "3-5 dias",
            label: "Primer Envio"
          },
          firstSales: {
            value: "Semana 1",
            label: "Primeras Ventas"
          }
        },
        needHelp: "Necesitas asistencia inmediata?"
      },
      // Success stories
      successStories: {
        title: "Historias de Exito de Socios",
        stories: {
          petPalace: {
            businessName: "Pet Palace Toronto",
            businessType: "Tienda de Mascotas Independiente",
            quote: "Agregamos $800/mes en ingresos en nuestro primer trimestre. Los clientes lo aman y siguen volviendo!",
            metric: "+145% crecimiento en ventas"
          },
          healthyPaws: {
            businessName: "Healthy Paws Vet",
            businessType: "Clinica Veterinaria",
            quote: "Nuestros clientes confian en nuestra recomendacion. Mejores margenes en nuestra seccion minorista.",
            metric: "55% margen de ganancia"
          }
        }
      },
      // Contact info section
      contactInfo: {
        title: "Necesitas Ayuda Inmediata?",
        subtitle: "Habla con un especialista en asociaciones ahora",
        wholesaleEmail: "wholesale@purrify.ca",
        emailLabel: "Correo de Asociaciones",
        emailHint: "Haz clic para redactar un correo o copiar la direccion.",
        copied: "Copiado!",
        copyFailed: "Fallo al copiar",
        businessHours: {
          title: "Horario Comercial",
          hours: "Lunes - Viernes: 9 AM - 6 PM EST"
        }
      },
      // Error messages
      errors: {
        submitFailed: "Hubo un error al enviar tu consulta. Por favor intenta de nuevo o contactanos directamente a wholesale@purrify.ca",
        defaultSuccess: "Solicitud de asociacion enviada exitosamente! Te contactaremos dentro de 72 horas."
      }
    }
  },

  // Scrolling Announcement Bar
  scrollingBar: {
    freeShipping: "Envio Gratis en Todas las Ordenes de Suscripcion",
    madeInCanada: "Fabricado en Canada con Ingredientes Domesticos y de Origen Global"
  },

  // Maps
  maps: {
    findNearYou: "Encuentra Purrify Cerca de Ti | Ubicaciones de Tiendas Minoristas",
    discoverWhere: "Descubre donde comprar Purrify en Canada. Cada ubicacion representa una tienda minorista donde puedes encontrar nuestros productos.",
    retailStores: "Tiendas minoristas Purrify en Canada - Montreal, Toronto, Vancouver y mas",
    cities: {
      montreal: "Montreal",
      quebec: "Ciudad de Quebec",
      toronto: "Toronto",
      vancouver: "Vancouver",
      calgary: "Calgary",
      ottawa: "Ottawa"
    },
    iframeTitle: "Mapa de Ubicaciones de Tiendas Minoristas Purrify"
  },

  // Upsell Page
  upsell: {
    pageTitle: "Oferta Especial Unica - Purrify",
    metaDescription: "Oferta exclusiva unica para nuevos clientes. Ahorra 25% en suscripcion de autoenvio trimestral.",
    offerExpired: "Oferta Expirada",
    offerExpiresIn: "Oferta expira en",
    headline: "Espera! Oferta Exclusiva Unica",
    subheadline: "Agrega autoenvio a tu orden y ahorra 25%",
    saveBadge: "AHORRA 29%",
    productTitle: "Autoenvio Purrify 50g",
    productSubtitle: "Suministro de 3 Meses (3 x bolsas de 50g)",
    youSave: "Ahorras",
    benefit1: "Nunca te quedes sin stock - entregado cada 3 meses",
    benefit2: "Envio gratis incluido (ahorra $7.99)",
    benefit3: "Asegura este precio especial para siempre",
    benefit4: "Cancela o salta cuando quieras (sin compromisos)",
    benefit5: "Recordatorios automaticos antes de cada envio",
    processing: "Procesando...",
    addToOrder: "Si! Agregar a Mi Orden",
    noThanks: "No gracias, prefiero pagar precio completo despues",
    feature1Title: "Activacion Instantanea",
    feature1Description: "Tu autoenvio comienza inmediatamente despues de esta orden",
    feature2Title: "100% Satisfaccion",
    feature2Description: "Garantia de devolucion de 30 dias en cada envio",
    feature3Title: "Control Flexible",
    feature3Description: "Salta, pausa o cancela en linea cuando quieras",
    testimonialText: "Casi rechace la oferta de autoenvio, pero me alegro tanto de no haberlo hecho! Es una cosa menos que recordar, y los ahorros se acumulan. Ademas, nunca me quedo sin justo cuando mas lo necesito.",
    testimonialAuthor: "- Sarah M., Toronto",
    faqTitle: "Preguntas Comunes",
    faq1Question: "Puedo cancelar cuando quiera?",
    faq1Answer: "Absolutamente! Cancela, salta o modifica tu suscripcion cuando quieras desde tu panel de cuenta. Sin tarifas, sin complicaciones.",
    faq2Question: "Cuando me cobraran?",
    faq2Answer: "Se te cobrara hoy por esta oferta especial. Tu proximo envio sera en 3 meses, y recibiras un correo recordatorio 7 dias antes.",
    faq3Question: "El precio esta asegurado?",
    faq3Answer: "Si! Este precio especial esta asegurado mientras permanezcas suscrito. Nunca pagaras mas de esta tarifa.",
    bottomNote: "Esta oferta unica solo esta disponible inmediatamente despues de tu primera compra",
    returnHome: "Volver al inicio"
  },

  // Affiliate Page
  affiliate: {
    metaTitle: "Gana Ingresos Mensuales con el Programa de Afiliados Purrify",
    metaDescription: "Refiere duenos de gatos a Purrify y gana 30% de comision recurrente de por vida. Unete a cientos de afiliados exitosos ganando ingresos pasivos ayudando a gatos a vivir sin olores.",
    hero: {
      badge: "Unete a Nuestro Programa de Afiliados",
      title: "Gana Ingresos Mensuales Con Purrify",
      subtitle: "Refiere duenos de gatos a Purrify y gana 30% de ingresos recurrentes mensuales de por vida.",
      primaryCTA: "Convertirse en Afiliado",
      secondaryCTA: "Ver Calculadora de Ganancias"
    },
    calculator: {
      title: "Calcula Tus Ganancias Potenciales",
      subtitle: "Ajusta los controles para ver cuanto podrias ganar con la comision del 30% de Purrify",
      standardProduct: "50g Estandar ($24.99) - Referidos/Mes",
      familyPack: "120g Paquete Familiar ($44.99) - Referidos/Mes",
      perSale: "por venta",
      monthlyIncome: "Ingreso Mensual Estimado",
      yearlyIncome: "Ingreso Anual Estimado",
      disclaimer: "Estas son ganancias potenciales basadas en 30% de comision. Los resultados reales pueden variar.",
      cta: "Empezar a Ganar Ahora"
    },
    howItWorks: {
      title: "Como Funciona",
      step1: {
        title: "Unete al Programa",
        description: "Crea tu cuenta de afiliado y recibe tu enlace de referido unico. Es gratis unirse y toma menos de 2 minutos."
      },
      step2: {
        title: "Comparte Tu Enlace",
        description: "Comparte tu enlace de referido con tu audiencia a traves de redes sociales, publicaciones de blog, videos o correo. Proporcionamos materiales de marketing para ayudarte a tener exito."
      },
      step3: {
        title: "Cobra de Por Vida",
        description: "Gana 30% de comision recurrente en cada venta que hagan tus referidos - no solo la primera compra, sino para siempre. Pagos enviados mensualmente via tu metodo preferido."
      }
    },
    benefits: {
      title: "Por que Unirte al Programa de Afiliados de Purrify?",
      subtitle: "Hemos disenado nuestro programa para ayudarte a tener exito con comisiones y soporte lideres en la industria",
      benefit1: {
        title: "30% de Comisiones de Por Vida",
        description: "A diferencia de la mayoria de programas que solo pagan en la primera venta, ganas 30% en cada compra que hagan tus referidos - para siempre. Construye verdaderos ingresos pasivos."
      },
      benefit2: {
        title: "Producto de Alta Conversion",
        description: "Purrify resuelve un problema real que los duenos de gatos enfrentan diariamente. Con 4.8/5 estrellas y 98% de tasa de satisfaccion, nuestros productos se venden solos."
      },
      benefit3: {
        title: "Rastreo en Tiempo Real",
        description: "Monitorea tus ganancias, clics y conversiones en tiempo real con nuestro panel avanzado de afiliados. Total transparencia en tu rendimiento."
      },
      benefit4: {
        title: "Recursos de Marketing",
        description: "Accede a banners profesionales, plantillas de correo, imagenes de productos y textos probados. Proporcionamos todo lo que necesitas para tener exito."
      }
    },
    testimonials: {
      title: "Historias de Exito de Nuestros Afiliados",
      testimonial1: {
        quote: "He ganado mas de $3,400 en los ultimos 6 meses solo recomendando Purrify a mi audiencia de blog de gatos. Las comisiones recurrentes se acumulan rapido!",
        name: "Jessica M.",
        role: "Duena de Blog de Gatos"
      },
      testimonial2: {
        quote: "El mejor programa de afiliados al que me he unido. Gran producto, alta tasa de conversion, y la comision del 30% de por vida es inigualable. Muy recomendado!",
        name: "Mike T.",
        role: "Resenador de Productos para Mascotas"
      },
      testimonial3: {
        quote: "El equipo de soporte es increible. Me ayudaron a optimizar mi contenido y ahora estoy ganando ingresos mensuales estables. Esto es verdaderamente ingreso pasivo.",
        name: "Amanda R.",
        role: "Creadora de YouTube"
      }
    },
    faq: {
      title: "Preguntas Frecuentes",
      question1: "Cuanto puedo ganar?",
      answer1: "Ganas 30% de comision en cada venta. Si refieres 10 clientes comprando el tamano estandar de $24.99 mensualmente, eso es $74.97/mes en ingresos recurrentes. No hay limite de cuanto puedes ganar.",
      question2: "Cuando me pagan?",
      answer2: "Las comisiones se pagan mensualmente via PayPal, deposito directo o cheque. Pagamos el 15 de cada mes por las ganancias del mes anterior. El pago minimo es $50.",
      question3: "Cuanto duran las cookies?",
      answer3: "Nuestras cookies de afiliado duran 90 dias. Si alguien hace clic en tu enlace y compra dentro de 90 dias, obtienes credito por esa venta y todas las compras futuras de ese cliente.",
      question4: "Necesito un sitio web?",
      answer4: "No! Aunque tener un sitio web ayuda, puedes compartir tu enlace de afiliado en redes sociales, YouTube, boletines por correo, o donde sea que conectes con duenos de gatos.",
      question5: "Que materiales de marketing proporcionan?",
      answer5: "Proporcionamos banners profesionales, imagenes de productos, plantillas de correo, publicaciones para redes sociales y textos probados. Todo lo que necesitas para empezar a promocionar inmediatamente."
    },
    finalCTA: {
      title: "Listo para Empezar a Ganar?",
      subtitle: "Unete a cientos de afiliados exitosos ganando ingresos pasivos con Purrify",
      cta: "Unirse al Programa de Afiliados",
      disclaimer: "Gratis para unirse - Sin tarifas mensuales - Empieza a ganar inmediatamente"
    }
  },

  // Ammonia Control Landing Page
  ammonia: {
    meta: {
      title: "Control de Amoniaco para Arena de Gatos | Eliminacion Natural de Olores | Purrify",
      description: "Elimina el olor a amoniaco de la caja de arena con la formula de carbon activado de Purrify. Controla olores en la fuente por 7+ dias. Seguro para gatos. Compra ahora."
    },
    breadcrumb: "Control de Amoniaco",
    hero: {
      headline: "Control de Amoniaco: Elimina el Olor de Caja de Arena en la Fuente",
      subheadline: "Ese olor agudo que hace llorar los ojos de la caja de arena no es solo desagradable - es amoniaco, y empeora cada hora. El carbon activado premium de cascara de coco de Purrify atrapa moleculas de amoniaco a nivel molecular, manteniendo tu hogar genuinamente fresco por 7+ dias sin fragancias artificiales.",
      cta: "Comprar Ahora",
      secondaryCta: "Ver Como Funciona"
    },
    trust: {
      happyCats: "gatos felices"
    },
    understanding: {
      headline: "Entendiendo el Amoniaco: La Verdadera Causa del Olor de Caja de Arena",
      intro: "Ese distintivo olor de caja de arena no viene en realidad de tu gato - viene de un proceso quimico que ocurre en la arena misma. Entender este proceso es el primer paso para eliminarlo.",
      chemistry: {
        title: "La Quimica Detras del Olor",
        description: "Cuando tu gato orina, la orina contiene un compuesto llamado urea. En solo 2-4 horas, las bacterias naturalmente presentes en la caja de arena comienzan a descomponer esta urea en gas amoniaco (NH3). Este es el olor agudo y penetrante que puede impregnar todo tu hogar.",
        formula: "Urea + Bacterias + Tiempo = Gas Amoniaco"
      },
      factors: {
        title: "Por Que Empeora Con el Tiempo",
        point1: "Temperatura: Las bacterias se multiplican mas rapido en ambientes calidos, produciendo amoniaco mas rapidamente",
        point2: "Humedad: La humedad acelera el proceso de descomposicion y ayuda al amoniaco a volverse transportado por aire",
        point3: "Acumulacion: Cada dia agrega mas orina, creando mas produccion de amoniaco",
        point4: "Espacios cerrados: Cajas de arena en closets o muebles cerrados atrapan y concentran el amoniaco"
      },
      health: {
        title: "Preocupaciones de Salud por Exposicion al Amoniaco",
        description: "La exposicion prolongada al amoniaco no es solo desagradable - puede causar problemas de salud reales. En concentraciones comunmente encontradas cerca de cajas de arena mal mantenidas, el amoniaco puede irritar los ojos y sistemas respiratorios tanto en humanos como en gatos. Los gatos, con sus narices sensibles, pueden empezar a evitar una caja de arena que huele demasiado fuerte a amoniaco, llevando a accidentes en otras partes de tu hogar."
      }
    },
    problem: {
      headline: "Por Que las Arenas Perfumadas y Ambientadores Fallan",
      intro: "Si has probado arenas perfumadas, bicarbonato de sodio o ambientadores y encontrado que solo funcionan por un dia o dos, hay una razon cientifica: ninguno de estos realmente elimina el amoniaco.",
      card1: {
        title: "Enmascarar, No Resolver",
        description: "Las fragancias y arenas perfumadas simplemente ponen una capa de olor diferente sobre el amoniaco. Tu nariz se acostumbra a la fragancia en horas, pero el amoniaco sigue ahi - sigue produciendose, sigue acumulandose. Por eso el olor siempre regresa, a menudo peor que antes."
      },
      card2: {
        title: "Preocupaciones de Salud para Gatos",
        description: "Los aromas artificiales no son solo inefectivos - pueden ser daninos. Los gatos tienen 200 millones de receptores de olor comparados con nuestros 5 millones. Las fragancias fuertes pueden causar irritacion respiratoria, desencadenar asma, o hacer que tu gato evite la caja de arena por completo."
      },
      card3: {
        title: "El Mito del Bicarbonato de Sodio",
        description: "El bicarbonato de sodio es alcalino (pH ~8.3) y el amoniaco tambien es alcalino (pH ~11.6). Para la neutralizacion, necesitas una reaccion acido-base - pero base mas base no produce reaccion. El bicarbonato de sodio no puede neutralizar el amoniaco; solo absorbe humedad temporalmente."
      },
      card4: {
        title: "Costo y Esfuerzo Constante",
        description: "Sin verdadera eliminacion de olores, estas atrapado en un ciclo costoso: cambios frecuentes de arena completos, comprando productos perfumados que no funcionan, y constantemente preocupandote por lo que los invitados puedan oler. Esto puede costar $50-100+ mensuales para hogares multi-gatos."
      }
    },
    solution: {
      headline: "La Ciencia de la Verdadera Eliminacion de Olores",
      intro: "El carbon activado funciona a traves de un mecanismo completamente diferente a los agentes enmascaradores - y por eso realmente funciona.",
      description: "El carbon activado tiene una estructura microporosa con millones de pequenos poros que fisicamente atrapan moleculas de amoniaco. A diferencia de los agentes enmascaradores, el carbon activado captura olores a nivel molecular a traves de adsorcion - asi que nunca los hueles de nuevo.",
      adsorption: {
        title: "Adsorcion: La Diferencia Clave",
        description: "Adsorcion (con 'd') es diferente de absorcion. Cuando las moleculas de amoniaco contactan el carbon activado, no solo se empapan - se unen a la superficie del carbon a nivel molecular. Este proceso fisico funciona independientemente del pH, haciendolo efectivo contra el amoniaco donde el bicarbonato de sodio falla."
      },
      pores: {
        title: "Estructura de Poros Optimizada",
        micro: "Microporos (<2nm): Atrapan permanentemente moleculas pequenas de amoniaco",
        meso: "Mesoporos (2-50nm): Actuan como autopistas guiando el amoniaco a los microporos",
        macro: "Macroporos (>50nm): Puntos de entrada permitiendo acceso rapido de gas",
        description: "El carbon de cascara de coco de Purrify esta especificamente procesado para optimizar esta distribucion de poros para captura de amoniaco. El resultado: maxima eficiencia de atrapamiento para las moleculas exactas que causan tu problema de olor."
      },
      surface: {
        title: "Enorme Area de Superficie",
        stat: "1,150 m2/g",
        comparison: "Eso es equivalente a 4 canchas de tenis de superficie de atrapamiento en cada cucharadita. Comparalo con el bicarbonato de sodio a solo 0.2 m2/g - casi 6,000 veces menos area de superficie.",
        explanation: "Esta enorme area de superficie es por que una pequena cantidad de carbon activado puede capturar tanto amoniaco durante un periodo tan largo."
      }
    },
    howToUse: {
      headline: "Como Usar Purrify",
      intro: "Empezar con Purrify es simple. La mayoria de los padres de gatos notan una diferencia dramatica en 24 horas.",
      step1: {
        number: "1",
        title: "Espolvorear",
        description: "Espolvorea 2-3 cucharadas de Purrify uniformemente sobre la arena de tu gato. Para mejores resultados, agrega Purrify despues de haber limpiado y la arena este relativamente fresca."
      },
      step2: {
        number: "2",
        title: "Mezclar",
        description: "Mezcla suavemente los granulos de carbon en la capa superior de arena. No hay necesidad de mezclar profundamente - el carbon funciona mejor cerca de la superficie donde se libera el amoniaco."
      },
      step3: {
        number: "3",
        title: "Mantener",
        description: "Limpia diariamente como de costumbre. Reaplica Purrify cada 5-7 dias, o cuando agregues arena fresca. Una bolsa de 50g tipicamente dura 2-3 semanas para un solo gato."
      },
      tips: {
        title: "Consejos Pro para Mejores Resultados",
        tip1: "Para olores fuertes existentes, haz un cambio completo de arena primero, luego agrega Purrify a la arena fresca",
        tip2: "Hogares multi-gatos pueden necesitar reaplicar cada 4-5 dias en lugar de 7",
        tip3: "Funciona con todos los tipos de arena: aglomerante, arcilla, cristal, madera, maiz o papel"
      }
    },
    benefits: {
      headline: "Por Que los Padres de Gatos Eligen Purrify",
      intro: "Hay una razon por la que miles de duenos de gatos han cambiado al carbon activado para control de olores.",
      pillar1: {
        title: "100% Ciencia Natural",
        description: "Purrify esta hecho de carbon activado premium de cascara de coco - nada mas. Sin quimicos, fragancias, aditivos sinteticos ni rellenos. Es el mismo material usado en purificadores de aire de grado hospitalario y sistemas de filtracion de agua.",
        detail: "El carbon de cascara de coco es apreciado por su alta densidad de microporos, haciendolo particularmente efectivo para atrapar moleculas de gas pequenas como el amoniaco."
      },
      pillar2: {
        title: "Proteccion Duradera",
        description: "Una aplicacion de Purrify proporciona control continuo de amoniaco por 7+ dias. A diferencia de las fragancias que se desvanecen en horas o el bicarbonato de sodio que deja de funcionar despues de 48 horas, el carbon activado sigue funcionando hasta que sus poros esten completamente saturados.",
        detail: "La mayoria de los clientes encuentran que pueden reducir sus cambios completos de arena por 30-50%, ahorrando dinero y tiempo."
      },
      pillar3: {
        title: "Seguro para Todos los Gatos",
        description: "Porque Purrify es completamente sin fragancia y hecho de carbon natural, es seguro para gatos de todas las edades y sensibilidades. Gatitos, gatos mayores y gatos con condiciones respiratorias pueden todos beneficiarse sin riesgo de irritacion.",
        detail: "Muchos gatos en realidad prefieren ambientes de arena sin aroma. Puedes notar que tu gato usa la caja mas consistentemente despues de cambiar a Purrify."
      }
    },
    results: {
      headline: "Que Esperar: Linea de Tiempo de Resultados Reales",
      intro: "Esto es lo que tipicamente experimentan los padres de gatos despues de agregar Purrify a su rutina de arena.",
      day1: {
        title: "En 24 Horas",
        description: "Reduccion notable del olor a amoniaco. La calidad aguda que hace llorar los ojos del olor disminuye significativamente mientras el carbon comienza a atrapar moleculas de amoniaco en el aire."
      },
      day3: {
        title: "Dias 2-3",
        description: "La mayoria de los olores existentes eliminados. Incluso olores fuertes y establecidos son capturados mientras el amoniaco continua siendo adsorbido. Los invitados no notaran ningun olor de caja de arena."
      },
      week1: {
        title: "Despues de Una Semana",
        description: "Frescura consistente mantenida. El carbon activado sigue funcionando, atrapando continuamente nuevo amoniaco mientras se produce. Tiempo de agregar una aplicacion fresca."
      },
      ongoing: {
        title: "Uso Continuo",
        description: "Con reaplicacion regular, tu hogar permanece fresco permanentemente. Muchos clientes reportan que 'olvidan' que tienen una caja de arena porque simplemente no hay olor que se los recuerde."
      }
    },
    comparison: {
      headline: "Como se Compara Purrify",
      intro: "No todos los metodos de control de olores son iguales. Asi es como los enfoques mas comunes se comparan.",
      headers: {
        method: "Metodo",
        effectiveness: "Efectividad",
        duration: "Duracion",
        safety: "Seguridad para Gatos"
      },
      purrify: {
        method: "Purrify (Carbon Activado)",
        effectiveness: "95%",
        duration: "7+ dias",
        safety: "100% seguro"
      },
      bakingSoda: {
        method: "Bicarbonato de Sodio",
        effectiveness: "20%",
        duration: "1-2 dias",
        safety: "Seguro"
      },
      scented: {
        method: "Arena Perfumada",
        effectiveness: "30%",
        duration: "Horas",
        safety: "Puede irritar"
      },
      airFreshener: {
        method: "Ambientadores",
        effectiveness: "10%",
        duration: "Horas",
        safety: "Puede irritar"
      },
      frequentChanges: {
        method: "Cambios Frecuentes de Arena",
        effectiveness: "70%",
        duration: "Hasta proximo uso",
        safety: "Seguro pero costoso"
      },
      note: "Calificaciones de efectividad basadas en reduccion de amoniaco. Purrify apunta al amoniaco especificamente a traves de adsorcion, mientras otros metodos principalmente enmascaran o absorben temporalmente."
    },
    stats: {
      days: { value: "7+", label: "Dias de Frescura" },
      savings: { value: "50%", label: "Menos Cambios de Arena" },
      surfaceArea: { value: "1,150", label: "m2/g Area de Superficie" },
      natural: { value: "100%", label: "Ingredientes Naturales" }
    },
    faq: {
      headline: "Preguntas Comunes Sobre Control de Amoniaco",
      q1: "Como controla Purrify el amoniaco?",
      a1: "Purrify usa carbon de coco activado con millones de poros microscopicos que atrapan moleculas de amoniaco a traves de adsorcion. A diferencia del bicarbonato de sodio o fragancias que enmascaran olores, el carbon activado fisicamente captura y retiene el amoniaco para que nunca llegue a tu nariz.",
      q2: "Es seguro el carbon activado para gatos?",
      a2: "Si, el carbon activado es 100% natural y no toxico. Es el mismo material usado en filtros de agua y purificadores de aire, y ha sido usado de forma segura cerca de mascotas por decadas. Purrify no contiene quimicos, fragancias ni aditivos.",
      q3: "Cuanto Purrify uso?",
      a3: "Simplemente espolvorea una capa fina sobre la arena de tu gato y mezclala. Una bolsa de 50g trata una caja de arena estandar por aproximadamente 7 dias. Para multiples gatos, usa nuestro tamano de 120g.",
      q4: "Funciona con todos los tipos de arena?",
      a4: "Si! Purrify funciona con arcilla aglomerante, no aglomerante, cristal, papel, madera y arenas a base de maiz. Mejora el control de olores de cualquier arena.",
      q5: "En que se diferencia Purrify del bicarbonato de sodio?",
      a5: "El bicarbonato de sodio solo neutraliza algunos olores temporalmente y necesita reaplicacion constante. El carbon activado fisicamente atrapa moleculas de amoniaco a traves de adsorcion, proporcionando 7+ dias de proteccion con una sola aplicacion.",
      q6: "Eliminara los olores existentes?",
      a6: "Purrify inmediatamente comienza a absorber amoniaco desde el momento que lo agregas. Los olores existentes tipicamente desaparecen en 24-48 horas mientras el carbon activado los absorbe.",
      q7: "Es seguro para gatitos?",
      a7: "Absolutamente. Purrify es seguro para gatos de todas las edades. No hay quimicos ni fragancias que puedan irritar a gatos jovenes o sensibles.",
      q8: "Cuanto dura una bolsa?",
      a8: "La bolsa de 50g dura aproximadamente 7 dias para un gato. La bolsa de 120g dura aproximadamente 7 dias para hogares multi-gatos (2-3 gatos). La mayoria de los clientes encuentran que necesitan cambiar la arena menos seguido."
    },
    cta: {
      headline: "Listo para un Hogar Genuinamente con Olor Fresco?",
      subheadline: "Unete a miles de padres de gatos que han eliminado el amoniaco de caja de arena para siempre - no lo enmascararon, lo eliminaron.",
      button: "Comprar Purrify",
      secondaryButton: "Probar Tamano de Prueba",
      benefit1: "Envio gratis sobre $35",
      benefit2: "Garantia de satisfaccion de 30 dias"
    }
  },

  // Try Free Landing Page (for Ad Campaigns)
  tryFreePage: {
    meta: {
      title: "Prueba Purrify Gratis - Solo $4.76 de Envio | Eliminador de Olores de Arena para Gatos",
      description: "Obtiene tu prueba GRATIS de Purrify - solo $4.76 de envio. Elimina el olor de caja de arena en 30 segundos. 138+ opiniones de 5 estrellas. Garantia de 30 dias."
    },
    hero: {
      badge: "Oferta Por Tiempo Limitado",
      headline: "Prueba Purrify Gratis",
      subheadline: "Solo $4.76 de Envio",
      description: "Descubre por que mas de 1,000 padres de gatos confian en Purrify para eliminar el olor de caja de arena. Obtiene tu prueba gratis hoy y experimenta la diferencia.",
      cta: "Obtener Mi Prueba Gratis",
      shippingNote: "Envios a cualquier lugar de Canada"
    },
    problem: {
      headline: "Cansado de Contener la Respiracion?",
      subheadline: "Te entendemos. Ese olor de caja de arena es vergonzoso.",
      points: [
        "Invitados llegando y corres a revisar la caja de arena",
        "Abriendo ventanas en invierno solo para ventilar el olor",
        "Constantemente comprando ambientadores que no funcionan",
        "Preocupandote de que tu casa huele a que vive un gato"
      ]
    },
    howItWorks: {
      headline: "Aire Fresco en 30 Segundos",
      subheadline: "Simple como 1-2-3",
      steps: [
        {
          number: "1",
          title: "Espolvorear",
          description: "Abre la bolsa y espolvorea sobre la arena de tu gato"
        },
        {
          number: "2",
          title: "Atrapar",
          description: "El carbon activado atrapa moleculas de amoniaco instantaneamente"
        },
        {
          number: "3",
          title: "Fresco",
          description: "Disfruta 7+ dias de frescura sin olores"
        }
      ]
    },
    socialProof: {
      headline: "Unete a Mas de 1,000 Padres de Gatos Felices",
      rating: "4.9",
      reviewCount: "138",
      reviewLabel: "Opiniones Verificadas",
      testimonials: [
        {
          text: "Era esceptica, pero en horas todo mi apartamento olia fresco. Mis invitados no tenian idea de que tenia gatos!",
          author: "Sarah M.",
          location: "Toronto, ON"
        },
        {
          text: "Finalmente algo que realmente funciona. No mas enmascarar olores con ambientadores.",
          author: "Mike R.",
          location: "Vancouver, BC"
        },
        {
          text: "Los mejores $4.76 que he gastado. Ya ordene el tamano completo!",
          author: "Jennifer K.",
          location: "Montreal, QC"
        }
      ]
    },
    guarantee: {
      headline: "Garantia de 30 Dias",
      description: "Si no estas asombrado por los resultados, te reembolsamos. Sin preguntas.",
      badge: "Prueba Sin Riesgo"
    },
    finalCta: {
      headline: "Listo para Respirar Tranquilo?",
      description: "Obtiene tu prueba gratis de Purrify hoy. Solo $4.76 de envio.",
      buttonText: "Obtener Mi Prueba Gratis",
      note: "Cancela cuando quieras. No se requiere suscripcion."
    },
    trust: {
      madeInCanada: "Hecho en Canada",
      natural: "100% Natural",
      fragrance: "Sin Fragancia",
      secure: "Pago Seguro"
    }
  },

  // B2B Partner Benefits Section
  b2bCaseStudies: {
    badge: "Programa Mayorista",
    title: "Beneficios de Socio por Tipo de Negocio",
    subtitle: "Ve como Purrify ayuda a negocios como el tuyo",
    cta: "Interesado en precios mayoristas para tu negocio?",
    ctaButton: "Contactar Nuestro Equipo de Asociaciones",
    businessTypes: {
      veterinarian: "Clinicas Veterinarias",
      catCafe: "Cafes de Gatos",
      shelter: "Refugios de Animales",
      groomer: "Salones de Estetica",
      hospitality: "Alquileres Pet-Friendly"
    },
    labels: {
      challenge: "El Desafio",
      solution: "Como Ayuda Purrify",
      catsServed: "gatos atendidos"
    }
  },

  // City Page Translations (for location-based SEO pages)
  cityPage: {
    seo: {
      title: "Desodorizante para Arena de Gato en {{city}} | Purrify Carbón Activado",
      descriptionWithPopulation: "¿Mal olor de arena en {{city}}? El carbón activado Purrify elimina naturalmente los olores de amoníaco. Envío rápido en toda {{province}}. Amado por {{population}}+ dueños de gatos.",
      descriptionDefault: "¿Mal olor de arena en {{city}}? El carbón activado Purrify elimina naturalmente los olores de amoníaco. Envío rápido en toda {{province}}. Seguro para gatos y gatitos."
    },
    loading: "Redirigiendo...",
    hero: {
      heading: "Mejor Eliminador de Olores de Arena en {{city}}",
      subheading: "Confiado por {{audience}}+ dueños de gatos en {{city}} y toda {{province}}"
    },
    whyChoose: {
      heading: "Por Qué los Padres de Gatos de {{city}} Eligen Purrify",
      perfectFor: "Perfecto para {{feature}}",
      fastShipping: "Envío rápido en toda {{province}}",
      worksWithAllBrands: "Funciona con todas las marcas de arena que ya amas"
    },
    cta: {
      tryInCity: "Prueba Purrify en {{city}}",
      seeHowItWorks: "Ve cómo funciona la tecnología de carbón →",
      shopOnline: "Comprar Ahora en Línea",
      submitVideo: "📹 Envía Tu Video Reseña",
      writeReview: "✍️ Escribe una Reseña",
      exploreTestimonials: "Explora más testimonios de {{province}} →"
    },
    whereToFind: {
      heading: "Dónde Encontrar Purrify en {{city}}",
      localStore: {
        heading: "Pregunta en Tu Tienda de Mascotas Local",
        description: "Las tiendas de mascotas independientes en {{city}} venden el eliminador de olores del que hablan los padres de gatos.",
        tip: "Comienza con tu tienda de barrio favorita o diles que quieres ver Purrify en las estanterías."
      },
      orderDirect: {
        heading: "Ordena Directo con Envío Rápido",
        description: "¿Prefieres entrega a domicilio? Ordena en línea y recibe aire fresco en 2-3 días hábiles en cualquier lugar de {{province}}."
      }
    },
    playbook: {
      heading: "Guía de Aire Fresco para {{city}}",
      step1: "Espolvorea 2 cucharadas sobre tu caja de arena después de cada limpieza.",
      step2: "Refresca cada dos días si tu hogar enfrenta {{painPoint}}.",
      step3: "Cambia tu caja de arena como siempre—Purrify funciona con arenas aglomerantes, de arcilla y naturales."
    },
    testimonials: {
      heading: "Lo Que Dicen los Dueños de Gatos de {{city}}",
      wasHelpful: "¿Fue útil esto?",
      shareStory: {
        heading: "Comparte Tu Historia de Éxito en {{city}}",
        description: "¿Eres un dueño de gato de {{city}} que ama Purrify? Nos encantaría presentar tu historia y ayudar a otros padres de gatos locales a descubrir una vida sin olores."
      }
    },
    provinceWide: {
      heading: "Los Dueños de Gatos en Todo {{province}} Aman Purrify",
      description: "Únete a miles de padres de gatos satisfechos en {{province}} que han eliminado los olores de arena para siempre.",
      averageRating: "⭐ Calificación Promedio 4.8/5",
      happyHomes: "🏠 {{audience}}+ Hogares Felices",
      fastShipping: "🚚 Envío Rápido a {{province}}"
    },
    faq: {
      heading: "Preguntas Frecuentes de {{city}}",
      delivery: {
        question: "¿Entregan a {{city}}, {{province}}?",
        answer: "¡Sí! Envío rápido en toda {{province}}, incluyendo todos los barrios de {{city}}. Los pedidos llegan en 2-3 días hábiles."
      },
      painPoint: {
        question: "¿Cómo ayuda Purrify a los hogares que enfrentan {{painPoint}}?",
        answer: "Espolvorea Purrify sobre tu arena habitual. El carbón activado se une a las moléculas de amoníaco, incluso cuando {{painPoint}}. Aire fresco sin cambiar la rutina de tu gato."
      },
      litterBrands: {
        question: "¿Qué marcas de arena funcionan mejor con Purrify en {{city}}?",
        answer: "Purrify funciona con todos los tipos de arena—arcilla aglomerante, cristal, pino natural, maíz, trigo y arenas de tofu. Los dueños de gatos de {{city}} lo combinan con las marcas que ya compran en tiendas de mascotas independientes, y mejora todas sin cambiar las preferencias de tu gato."
      },
      climate: {
        question: "¿Cómo maneja Purrify {{seasonalTip}} en {{province}}?",
        answer: "La tecnología de carbón activado funciona independientemente de la temperatura y humedad. Ya sea que enfrentes {{seasonalTip}} en {{city}}, la captura molecular de olores de Purrify continúa 24/7. Perfecto para {{keyFeature}} que enfrentan los desafíos climáticos de {{province}}."
      },
      stores: {
        question: "¿Puedo encontrar Purrify en tiendas de mascotas en {{city}}?",
        answer: "Muchos minoristas independientes en {{city}} tienen Purrify en stock. Llama antes para verificar disponibilidad, o ordena en línea para entrega garantizada en 2-3 días en cualquier lugar de {{province}}."
      },
      multiCat: {
        question: "¿Es Purrify seguro para hogares con múltiples gatos en {{city}}?",
        answer: "¡Absolutamente! Purrify es completamente seguro para hogares con múltiples gatos. Muchas familias de {{city}} lo usan en 2-4 cajas de arena. El carbón activado es no tóxico, sin fragancia y no irritará a gatos sensibles. Perfecto para {{keyFeature}}."
      }
    }
  },

  // Locations Hub and Province Pages
  locations: {
    hub: {
      badge: "Cobertura Nacional",
      heading: "Control de Olores de Arena en Todo Canadá",
      description: "Descubre ubicaciones de Purrify en todo Canadá. Selecciona tu provincia para encontrar guías específicas de tu ciudad, información de envío y recursos locales para dueños de gatos.",
      selectProvince: "Selecciona Tu Provincia",
      whyChoose: "¿Por Qué Elegir Purrify?",
      benefit1: "Tecnología natural de carbón activado",
      benefit2: "Funciona con todos los tipos de arena",
      benefit3: "Envío rápido en todo Canadá",
      shopCta: "Comprar Purrify",
      citiesAvailable: "{{count}} ciudades disponibles",
      cityAvailable: "1 ciudad disponible",
      viewGuide: "Ver guía provincial →",
      fastShipping: {
        title: "Envío Rápido",
        description: "Entrega confiable en todas las provincias con seguimiento"
      },
      naturalSolution: {
        title: "Solución Natural",
        description: "Tecnología de carbón activado para un control superior de olores"
      },
      localSupport: {
        title: "Soporte Local",
        description: "Guías específicas de tu ciudad adaptadas a tu clima"
      }
    },
    province: {
      badge: "Guía Provincial",
      heading: "Control de Olores de Arena en {{province}}",
      description: "Encuentra minoristas de Purrify y opciones de envío rápido en toda {{province}}. Confiado por dueños de gatos en todas las ciudades principales.",
      citiesHeading: "Ciudades que Servimos en {{province}}",
      viewCityGuide: "Ver Guía de la Ciudad",
      cityCardDescription: "Conoce las soluciones de control de olores en {{city}}",
      exploreOther: "Explorar Otras Provincias",
      orderOnline: "Ordena en Línea para Entrega Rápida",
      orderDescription: "¿No encuentras una tienda local? Recibe Purrify en tu puerta en 2-3 días hábiles en cualquier lugar de {{province}}."
    }
  },

  // Thank You / Order Confirmation Page
  thankYou: {
    heading: "¡Gracias!",
    headingWithName: "¡Gracias, {{name}}!",
    subheading: "Tu pedido ha sido confirmado.",
    subheadingExtended: "Tu pedido ha sido confirmado. ¡Prepárate para experimentar el hogar más fresco que jamás hayas tenido!",
    orderConfirmed: "Pedido Confirmado",
    orderNumber: "Número de Pedido",
    product: "Producto",
    quantity: "Cantidad",
    total: "Total",
    expectedDelivery: "Entrega Esperada",
    deliveryCA: "7-10 días hábiles dentro de Canadá",
    deliveryUS: "10-14 días hábiles a Estados Unidos",
    deliveryIntl: "14-21 días hábiles internacional",
    shipsWithin: "Se envía en 1-2 días hábiles",
    confirmationSent: "Correo de confirmación enviado a",
    checkSpam: "Revisa tu carpeta de spam si no lo ves en 5 minutos",
    trackingInfo: "La información de seguimiento se enviará a tu correo cuando tu pedido sea enviado.",
    whatToExpect: {
      heading: "Qué Esperar",
      step1Title: "Recibe Tu Purrify",
      step1Desc: "Tu paquete llegará en un empaque discreto y ecológico. Cada contenedor está sellado para mantener la frescura.",
      step2Title: "Instrucciones de Primer Uso",
      step2Desc: "Para mejores resultados, comienza con una caja de arena limpia:",
      step2Item1: "Limpia y refresca tu caja de arena",
      step2Item2: "Espolvorea una capa fina de Purrify encima",
      step2Item3: "No necesitas mezclar - funciona desde la superficie",
      step2Item4: "Vuelve a aplicar después de cada cambio de arena",
      step3Title: "Experimenta la Diferencia",
      step3Desc: "¡La mayoría de los clientes notan la diferencia en 60 segundos! El carbón activado atrapa las moléculas de amoníaco instantáneamente - sin enmascarar, solo eliminación real de olores.",
      proTip: "Consejo Pro:",
      proTipText: "¡Un poco rinde mucho! Usa solo lo suficiente para cubrir ligeramente la superficie. Usar de más no hará daño, pero no es necesario."
    },
    shareSection: {
      heading: "Comparte la Frescura",
      description: "¿Conoces a alguien con una caja de arena maloliente? ¡Comparte tu enlace de referido y obtendrán una prueba GRATIS!",
      generating: "Generando tu enlace de referido personal...",
      whatsapp: "WhatsApp",
      facebook: "Facebook",
      email: "Correo"
    },
    autoshipCta: {
      heading: "Nunca Te Quedes Sin",
      saveBadge: "AHORRA 30%",
      description: "Suscríbete a Autoship y ahorra 30% en cada pedido, además de envío GRATIS. Cancela cuando quieras.",
      savings: "Ahorro",
      shipping: "Envío",
      cancel: "Cancelar",
      button: "Actualizar a Autoship"
    },
    helpSection: {
      question: "¿Preguntas?",
      weAreHere: "¡Estamos aquí para ayudar!",
      returnHome: "Volver al Inicio"
    },
    questionsHeading: "¿Preguntas Sobre Tu Pedido?",
    questionsDescription: "Contacta a nuestro equipo de soporte y estaremos felices de ayudar.",
    contactSupport: "Contactar Soporte",
    continueShopping: "Continuar Comprando",
    referralCta: {
      heading: "¿Te Encanta Purrify?",
      description: "¡Comparte con amigos y gana $5 de crédito por cada referido!",
      button: "Obtener Mi Link de Referido"
    }
  },

  // Reviews Page
  reviews: {
    heading: "Lo Que Dicen los Dueños de Gatos",
    subheading: "Reseñas reales de clientes reales",
    verifiedPurchase: "Compra Verificada",
    helpful: "Útil",
    writeReview: "Escribir una Reseña",
    filterBy: "Filtrar por",
    allRatings: "Todas las Calificaciones",
    sortBy: "Ordenar por",
    mostRecent: "Más Reciente",
    mostHelpful: "Más Útil",
    highestRated: "Mayor Calificación",
    lowestRated: "Menor Calificación",
    showingReviews: "Mostrando {{count}} reseñas",
    noReviews: "Aún no hay reseñas. ¡Sé el primero en compartir tu experiencia!",
    loadMore: "Cargar Más Reseñas"
  },

  // Reviews Page (Full Page)
  reviewsPage: {
    pageTitle: "Reseñas de Clientes - Testimonios Verificados",
    metaDescription: "★ Calificación de 4.9/5 | Más de 1,000 dueños de gatos eliminaron el olor de la caja de arena con Purrify. Lee reseñas reales. Envíos a EE.UU. y Canadá.",
    badge: "Reseñas de Clientes",
    heading: "Historias Reales de Dueños de Gatos Felices",
    description: "Descubre por qué más de 1,000 dueños de gatos canadienses confían en Purrify para eliminar naturalmente los olores de la caja de arena. Lee reseñas verificadas de clientes reales en todo Canadá.",
    breadcrumb: {
      home: "Inicio",
      reviews: "Reseñas"
    },
    stats: {
      averageRating: "Calificación Promedio",
      verifiedReviews: "Reseñas Verificadas",
      happyCustomers: "Clientes Satisfechos",
      monthsInMarket: "Meses en el Mercado"
    },
    reviewCard: {
      verified: "Verificado",
      product: "Producto",
      cats: "Gatos",
      useCase: "Caso de Uso"
    },
    trustSection: {
      heading: "Por Qué los Clientes Confían en Purrify",
      verifiedTitle: "Reseñas Verificadas",
      verifiedDesc: "Todas las reseñas son de compradores verificados que han usado productos Purrify.",
      ratingTitle: "Calificación de 4.9/5",
      ratingDesc: "Calificaciones consistentemente altas en todos los tamaños de productos y tipos de clientes.",
      customersTitle: "Más de 1,000 Clientes",
      customersDesc: "Una comunidad creciente de dueños de gatos satisfechos en todo Canadá."
    },
    ctaSection: {
      heading: "Únete a Más de 1,000 Dueños de Gatos Felices",
      description: "Experimenta los mismos resultados que nuestros clientes verificados. Prueba Purrify sin riesgo y descubre por qué es el desodorizante natural para arena más confiable de Canadá.",
      shopNow: "Comprar Ahora",
      tryFreeSample: "Probar Muestra Gratis"
    },
    relatedLinks: {
      heading: "Más Información Sobre Purrify",
      comparison: "Comparación de Productos",
      comparisonDesc: "Ver cómo se compara Purrify",
      caseStudies: "Casos de Estudio",
      caseStudiesDesc: "Historias de éxito detalladas",
      usageInfo: "Información de Uso",
      usageInfoDesc: "Uso con gatos y gatitos",
      storeLocations: "Ubicaciones de Tiendas",
      storeLocationsDesc: "Encuentra Purrify cerca de ti"
    }
  },

  // Related Articles Section
  relatedArticles: {
    title: "Artículos Relacionados",
    readMore: "Leer más"
  },

  // Review System Component
  reviewSystem: {
    customerReviews: "Reseñas de Clientes",
    reviews: "reseñas",
    basedOn: "Basado en",
    wouldRecommend: "lo recomendarían",
    verifiedPurchases: "compras verificadas",
    viewAllReviews: "Ver Todas las Reseñas",
    loadMoreReviews: "Cargar Más Reseñas",
    filters: {
      allRatings: "Todas las Calificaciones",
      stars: "Estrellas",
      star: "Estrella",
      allSizes: "Todos los Tamaños",
      trial: "12g Prueba",
      regular: "50g Regular",
      large: "120g Grande"
    },
    sort: {
      newestFirst: "Más Reciente",
      oldestFirst: "Más Antiguo",
      highestRated: "Mayor Calificación",
      lowestRated: "Menor Calificación",
      mostHelpful: "Más Útil"
    },
    review: {
      verifiedPurchase: "Compra Verificada",
      size: "Tamaño",
      cat: "gato",
      cats: "gatos",
      usingFor: "Usando durante",
      helpful: "Útil",
      recommendsProduct: "Recomienda este producto"
    }
  },

  // Social Follow CTA
  socialFollow: {
    headline: "Síguenos para más consejos",
    description: "Únete a nuestra comunidad para consejos de cuidado de gatos y ofertas exclusivas.",
    followOn: "Sigue a Purrify en"
  },

  // Affiliate Dashboard
  affiliateDashboard: {
    pageTitle: "Panel de Afiliado",
    loginTitle: "Inicio de Sesión Afiliado",

    dashboard: "Panel",
    earnings: "Ganancias",
    payouts: "Pagos",
    settings: "Configuración",
    logout: "Cerrar Sesión",

    overview: {
      welcome: "Bienvenido de nuevo",
      yourCode: "Tu Código de Afiliado",
      copyCode: "Copiar Código",
      copiedCode: "¡Copiado!",
      shareLink: "Tu Enlace para Compartir",
      copyLink: "Copiar Enlace",
      copiedLink: "¡Enlace Copiado!"
    },

    stats: {
      totalClicks: "Clics Totales",
      totalConversions: "Conversiones",
      conversionRate: "Tasa de Conversión",
      pendingEarnings: "Ganancias Pendientes",
      availableBalance: "Saldo Disponible",
      totalEarnings: "Ganancias Totales",
      pendingNote: "Las comisiones se liberan después de 30 días"
    },

    conversions: {
      title: "Conversiones Recientes",
      noConversions: "Sin conversiones aún. ¡Comparte tu enlace para empezar a ganar!",
      date: "Fecha",
      orderId: "Nº Pedido",
      orderAmount: "Monto del Pedido",
      commission: "Comisión",
      status: "Estado",
      statusPending: "Pendiente",
      statusCleared: "Liberada",
      statusPaid: "Pagada",
      statusVoided: "Anulada"
    },

    payoutsSection: {
      title: "Historial de Pagos",
      requestPayout: "Solicitar Pago",
      minimumPayout: "El pago mínimo es de $50",
      payoutMethod: "Método de Pago",
      paypalEmail: "Email de PayPal",
      etransferEmail: "Email de Transferencia",
      amount: "Monto",
      requestedDate: "Solicitado",
      processedDate: "Procesado",
      status: "Estado",
      statusPending: "Pendiente",
      statusProcessing: "Procesando",
      statusCompleted: "Completado",
      statusRejected: "Rechazado",
      noPayouts: "Sin historial de pagos",
      insufficientBalance: "Saldo insuficiente para el pago",
      payoutRequested: "Solicitud de pago enviada exitosamente"
    },

    settingsSection: {
      title: "Configuración de Cuenta",
      payoutSettings: "Configuración de Pagos",
      payoutMethodLabel: "Método de Pago Preferido",
      paypalOption: "PayPal",
      etransferOption: "Transferencia Electrónica (solo Canadá)",
      emailLabel: "Email para Pagos",
      saveSettings: "Guardar Configuración",
      settingsSaved: "Configuración guardada exitosamente"
    },

    assets: {
      title: "Recursos de Marketing",
      description: "Descarga banners, imágenes de productos y textos para tus promociones.",
      banners: "Banners",
      productImages: "Imágenes de Productos",
      socialPosts: "Publicaciones Sociales",
      brandGuide: "Guía de Marca",
      brandColors: "Colores de Marca",
      guidelines: "Directrices de Uso",
      downloadAll: "Descargar Todo",
      copyText: "Copiar Texto"
    },

    login: {
      title: "Inicio de Sesión Afiliado",
      email: "Correo Electrónico",
      password: "Contraseña",
      rememberMe: "Recordarme",
      forgotPassword: "¿Olvidaste tu contraseña?",
      loginButton: "Iniciar Sesión",
      loggingIn: "Iniciando sesión...",
      noAccount: "¿Aún no eres afiliado?",
      applyNow: "Aplica Ahora",
      invalidCredentials: "Email o contraseña inválidos",
      accountInactive: "Tu cuenta de afiliado no está activa"
    },

    errors: {
      loadFailed: "Error al cargar los datos",
      saveFailed: "Error al guardar la configuración",
      payoutFailed: "Error al solicitar el pago",
      sessionExpired: "Tu sesión ha expirado. Por favor, inicia sesión de nuevo."
    }
  },

  // Página fuera de línea
  offlinePage: {
    title: "Estás fuera de línea",
    description: "Parece que has perdido tu conexión a Internet. No te preocupes: aún puedes explorar algunas páginas almacenadas en caché sin conexión. Una vez que vuelvas a estar en línea, todo funcionará con normalidad.",
    tryAgain: "Intentar de nuevo",
    goHome: "Ir a la página de inicio",
    availableOffline: "Disponible sin conexión",
    cachedPages: {
      homepage: "Página de inicio",
      trialSize: "Producto de tamaño de prueba",
      howItWorks: "Cómo funciona",
      contactSupport: "Contactar soporte"
    },
    emergencyContact: "Para asistencia inmediata, también puedes llamarnos"
  },

  // Formularios (mensajes estandarizados)
  forms: {
    success: {
      general: "¡Gracias por contactarnos! Te responderemos en 24 horas.",
      b2bContact: "¡Gracias por tu interés! Nuestro equipo se pondrá en contacto contigo en 24-48 horas para discutir los próximos pasos.",
      retailerContact: "¡Gracias por tu interés! Nuestro equipo de socios se pondrá en contacto contigo en 24-48 horas para discutir precios y próximos pasos.",
      hospitalityContact: "¡Gracias! Nuestro equipo de hostelería se pondrá en contacto contigo en 24 horas con precios personalizados para tus propiedades.",
      shelterContact: "¡Gracias por tu interés! Nuestro equipo se pondrá en contacto contigo en 24-48 horas para discutir cómo podemos apoyar tu refugio.",
      groomerContact: "¡Gracias por tu interés! Nuestro equipo de socios se pondrá en contacto contigo en 24-48 horas para discutir los próximos pasos.",
      vetContact: "¡Gracias por tu interés! Nuestro equipo veterinario se pondrá en contacto contigo en 24-48 horas para discutir oportunidades de asociación.",
      catCafeContact: "¡Gracias por tu interés! Nuestro equipo se pondrá en contacto contigo en 24-48 horas para discutir cómo Purrify puede beneficiar a tu café de gatos."
    },
    errors: {
      pleaseEnterTitle: "Por favor ingresa un título",
      invalidEmail: "Correo electrónico o contraseña inválidos",
      requiredField: "Este campo es obligatorio",
      submitFailed: "Error al enviar el formulario. Por favor intenta de nuevo."
    }
  },

  // Páginas de productos
  productPages: {
    cancelAnytime: "Cancela en cualquier momento. Envío gratis.",
    shipsFree: "Envío gratis",
    subscribeAndSave: "Suscríbete y ahorra",
    save: "Ahorra",
    savePercent: "Ahorra {percent}%",
    perMonth: "por mes",
    billedQuarterly: "Facturado trimestralmente",
    shippingSavings: "Ahorra $15-20+ por pedido vs compras individuales",
    save25vsStandard: "Ahorra 25% en comparación con comprar dos tamaños estándar",
    save25FamilyPack: "Ahorra 25% con nuestro Pack Familiar"
  },

  // Página de Ciencia
  sciencePage: {
    seo: {
      title: "Cómo el Carbón Activado Elimina el Olor de la Arena para Gatos: La Ciencia",
      description: "Las moléculas de amoníaco miden 0.26nm. Nuestros microporos están dimensionados para atraparlas. Así es como la arquitectura de poros diseñada captura olores tanto de orina (amoníaco) como de heces (mercaptanos)."
    },
    breadcrumb: {
      home: "Inicio",
      learn: "Aprender",
      science: "Ciencia"
    },
    hero: {
      heading: "Diseñado para Eliminar el Olor de la Arena para Gatos",
      description: "Trabajando con científicos investigadores, diseñamos la estructura de poros perfecta para capturar el amoníaco de la orina y los mercaptanos de las heces: las dos moléculas responsables de ese olor inconfundible de la caja de arena.",
      ctaButton: "Prueba la Ciencia"
    },
    understanding: {
      sectionTitle: "Entendiendo el Olor de la Caja de Arena: Los Dos Culpables",
      description: "Ese olor inconfundible de la caja de arena proviene de dos moléculas específicas. Para eliminarlas, necesitas entenderlas.",
      ammonia: {
        title: "Amoníaco (NH₃)",
        subtitle: "De la Orina de Gato",
        smell: "Agudo, penetrante, que irrita los ojos, como productos de limpieza",
        moleculeSize: "Pequeño, solo 0.26 nanómetros",
        problem: "Se forma cuando las bacterias descomponen la urea en la orina",
        whyHard: "La mayoría del carbón tiene poros demasiado grandes para atrapar moléculas tan pequeñas"
      },
      mercaptans: {
        title: "Mercaptanos",
        subtitle: "De las Heces de Gato",
        smell: "Huevos podridos, alcantarilla, azufre: esa sensación nauseabunda",
        moleculeSize: "Compuestos de azufre más grandes y complejos",
        problem: "Se liberan cuando las proteínas en las heces se descomponen",
        whyHard: "Moléculas pegajosas que requieren tamaños de poro específicos para capturar"
      },
      breakthrough: "Aquí está el avance: La mayoría del carbón activado está diseñado para filtración de agua o purificación general del aire. Trabajamos con científicos investigadores para diseñar carbón específicamente para estas dos moléculas, creando la trampa perfecta para el olor de la arena para gatos."
    },
    imageCaptions: {
      freshHome: {
        title: "Tu Gato Merece un Hogar Fresco",
        description: "Eliminación de olores a nivel molecular, no enmascaramiento"
      },
      noOdors: {
        title: "No Más Olores Embarazosos",
        description: "Control de olores respaldado por la ciencia para dueños de gatos modernos"
      }
    },
    poreSize: {
      sectionTitle: "La Distribución Perfecta del Tamaño de Poro",
      description: "Las pruebas de laboratorio confirman nuestra relación optimizada de microporos-mesoporos-macroporos",
      micropores: {
        size: "<2nm",
        title: "Microporos",
        specialist: "Especialistas en Amoníaco",
        target: "NH₃ (0.26nm)",
        density: "Concentración más alta",
        function: "Encierran las moléculas de olor más pequeñas"
      },
      mesopores: {
        size: "2-50nm",
        title: "Mesoporos",
        specialist: "Trampas de Mercaptanos",
        target: "Compuestos de azufre",
        density: "Relación optimizada",
        function: "Capturan olores fecales complejos"
      },
      macropores: {
        size: ">50nm",
        title: "Macroporos",
        specialist: "Sistema de Transporte",
        target: "Todas las moléculas",
        density: "Colocación estratégica",
        function: "Entrega rápida a los sitios de captura"
      },
      surfaceArea: {
        title: "Área Superficial: 1050 m²/g",
        description: "Eso es más de 12 canchas de tenis de área de captura de olores en solo un gramo de Purrify™",
        iodineNumber: "Número de Yodo mg/g",
        ctcAdsorption: "Adsorción CTC",
        hardness: "Dureza",
        moisture: "Humedad"
      }
    },
    scienceFacts: {
      sectionTitle: "Estructura de Poros de Precisión Diseñada",
      description: "No todo el carbón activado se crea igual. Trabajamos con científicos para optimizar cada detalle para el olor de la arena para gatos.",
      facts: [
        {
          title: "Arquitectura de Poros Diseñada",
          description: "Trabajando con científicos investigadores, optimizamos la relación exacta de microporos (< 2nm), mesoporos (2-50nm) y macroporos (> 50nm) para crear la trampa perfecta para las moléculas de olor de la arena para gatos."
        },
        {
          title: "Maestría en Captura de Amoníaco",
          description: "Las moléculas de amoníaco (NH₃) de la orina de gato son diminutas: solo 0.26 nanómetros. Nuestra estructura rica en microporos crea millones de sitios de captura perfectamente dimensionados que encierran el amoníaco antes de que puedas olerlo."
        },
        {
          title: "Eliminación de Mercaptanos",
          description: "Los mercaptanos (compuestos de azufre) le dan a las heces ese olor distintivo a huevo podrido. Nuestros canales de mesoporos están específicamente dimensionados para atrapar estas moléculas más grandes y complejas de forma permanente."
        },
        {
          title: "Sinergia de Triple Poro",
          description: "Los macroporos actúan como autopistas que entregan moléculas de olor profundamente en el carbón. Los mesoporos atrapan compuestos de azufre de tamaño medio. Los microporos atrapan las moléculas de amoníaco más pequeñas. Nada escapa."
        }
      ]
    },
    microscopicView: {
      imageCaptions: {
        microscope: "La microscopía de grado investigación revela la estructura de poros",
        labTesting: "Las pruebas de laboratorio confirman el rendimiento optimizado",
        molecular: "Captura a nivel molecular de compuestos de olor"
      },
      whatYoureLookingAt: {
        title: "Lo Que Estás Viendo",
        description: "Estas imágenes muestran la investigación de laboratorio detrás de nuestra estructura de poros optimizada. Cada pequeño canal y cavidad es una trampa esperando capturar moléculas de olor a nivel molecular.",
        bullets: [
          "Millones de poros crean un área superficial masiva (1050 m²/g)",
          "Diferentes tamaños de poro = diferentes moléculas de olor capturadas",
          "Una vez atrapadas, las moléculas no pueden escapar de vuelta al aire"
        ]
      },
      quote: {
        text: "La clave no es solo tener poros, sino tener los poros del tamaño correcto en las proporciones correctas para las moléculas específicas que quieres capturar.",
        attribution: "Colaboración de investigación con científicos del carbón activado"
      }
    },
    technicalPerformance: {
      sectionTitle: "Rendimiento Verificado en Laboratorio",
      description: "Datos reales de pruebas de carbón activado confirman que nuestra estructura de poros optimizada ofrece adsorción superior",
      particleSize: {
        title: "Distribución de Partículas de Malla 8×30",
        effectiveSize: "Tamaño Efectivo:",
        meanDiameter: "Diámetro Medio:",
        uniformityCoefficient: "Coeficiente de Uniformidad:",
        whyMatters: "Por qué esto importa: El dimensionamiento consistente de partículas asegura un flujo uniforme a través de la arena y contacto máximo con las moléculas de olor. Nuestra malla 8×30 está específicamente dimensionada para un rendimiento óptimo en arena para gatos."
      },
      adsorption: {
        title: "Rendimiento de Decloración Rápida",
        halfLength: "Valor de Longitud Media:",
        apparentDensity: "Densidad Aparente:",
        betSurface: "Área Superficial BET:",
        whyMatters: "Por qué esto importa: La eliminación rápida de cloro demuestra que la estructura microporosa del carbón es altamente activa. Si puede capturar moléculas de cloro tan rápidamente, el amoníaco no tiene ninguna oportunidad."
      }
    },
    engineeredPerformance: {
      title: "Diseñado para Rendimiento del Mundo Real",
      description: "Las pruebas de laboratorio muestran que nuestro carbón activado de malla 8×30 mantiene características de flujo óptimas y pérdida de presión mínima en temperaturas variables (5-25°C). Esto significa captura de olores consistente ya sea que tu caja de arena esté en un sótano fresco o un baño cálido.",
      stats: {
        temperatureRange: "5-25°C",
        temperatureLabel: "Rango de Temperatura",
        performanceLabel: "Rendimiento",
        pressureLossLabel: "Pérdida de Presión"
      }
    },
    processTimeline: {
      sectionTitle: "Cómo Funcionan Juntos los Tres Tipos de Poros",
      description: "Nuestra arquitectura de poros respaldada por investigación crea un sistema de captura específicamente diseñado para olores de arena para gatos.",
      steps: [
        {
          title: "Los Culpables: Amoníaco y Mercaptanos",
          description: "La orina de gato se descompone en amoníaco (NH₃): ese olor agudo que irrita los ojos. Las heces liberan mercaptanos: compuestos de azufre que huelen a huevos podridos o alcantarilla. Estas son las moléculas que diseñamos Purrify para capturar."
        },
        {
          title: "Macroporos: Los Carriles Expresos",
          description: "Los macroporos grandes (> 50nm) actúan como autopistas, transportando rápidamente las moléculas de olor profundamente en la estructura del carbón. Piensa en ellos como los puntos de entrada que previenen cuellos de botella."
        },
        {
          title: "Mesoporos: Las Trampas de Mercaptanos",
          description: "Los mesoporos de tamaño medio (2-50nm) están perfectamente dimensionados para capturar mercaptanos y otros compuestos de azufre de las heces. Estos poros crean un agarre firme que no soltará."
        },
        {
          title: "Microporos: Los Eliminadores de Amoníaco",
          description: "Los microporos diminutos (< 2nm) están optimizados para el tamaño de 0.26nm del amoníaco. Con millones de estos sitios de captura por gramo, las moléculas de amoníaco quedan encerradas permanentemente antes de que puedas olerlas."
        }
      ]
    },
    researchSection: {
      title: "La Solución Más Efectiva para el Olor de Arena para Gatos del Mundo",
      description: "Al diseñar la relación perfecta de microporos-mesoporos-macroporos, creamos carbón activado específicamente optimizado para capturar amoníaco y mercaptanos: las moléculas exactas que hacen que las cajas de arena huelan.",
      stats: {
        ammoniaSize: "0.26nm",
        ammoniaSizeLabel: "Tamaño de Molécula de Amoníaco - Microporos Perfectamente Emparejados",
        poreTypes: "3 Tipos de Poros",
        poreTypesLabel: "Micro + Meso + Macro = Captura Completa",
        surfaceArea: "1050 m²/g",
        surfaceAreaLabel: "Área Superficial - Millones de Sitios de Captura"
      },
      buttons: {
        experience: "Experimenta la Ciencia",
        learnMore: "Aprende Más"
      }
    },
    backToLearn: "Volver a Aprender"
  }
};
