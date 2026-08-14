// =============================================================
// Configuración del cliente — Paige
// Agencia de Landing Pages
// =============================================================

export const config = {
  // ---------- Branding ----------
  brand: {
    name: 'Paige',
    shortName: 'Paige',
    profession: 'Agencia de Landing Pages',
    specialty: 'Páginas web que convierten visitas en clientes',
    tagline: 'Tu negocio, en línea.',
    // El logotipo de la landing se dibuja tipográficamente (ver Wordmark.jsx)
    // para que herede el color de la navbar clara u oscura. Este SVG queda
    // para usos externos: favicon, OG image, firma de mails.
    logo: '/logo.svg',
  },

  // ---------- Contacto ----------
  contact: {
    whatsapp: '5491161569367',
    whatsappDisplay: '+54 9 11 6156-9367',
    whatsappMessage: 'Hola, me gustaría saber más sobre una landing page para mi negocio.',
    instagram: '',                         // completar
    instagramHandle: '',                   // completar
    instagramUrl: '',                      // completar
    email: 'iglesiastomas99@gmail.com',
    location: 'CABA · Argentina',
    formspreeEndpoint: 'https://formspree.io/f/your-form-id',
  },

  // ---------- Paleta ----------
  palette: {
    primary: '#18181B',        // ink
    primaryLight: '#3F3F46',   // ink claro
    secondary: '#C8956C',      // terracota
    secondaryLight: '#E2BFA3', // terracota suave
    background: '#FAFAF5',     // paper
    paper: '#FFFFFF',
    textPrimary: '#18181B',
    textSecondary: '#71717A',  // slate
    soft: '#E8E4DC',           // sand — para fondos alternos
    dark: '#18181B',

    // Tokens para las secciones oscuras (hero, contacto, footer)
    darkDeep: '#0B0B0D',       // fondo de sección oscura
    darkElevated: '#141418',   // cards sobre oscuro
    onDark: '#F4F1EA',         // texto sobre oscuro
    onDarkMuted: 'rgba(244, 241, 234, 0.60)',
    borderDark: 'rgba(244, 241, 234, 0.12)',
  },

  // ---------- Navbar ----------
  navbar: {
    ctaLabel: 'Hablemos',
    links: [
      { label: 'Trabajos', href: '#trabajos' },
      { label: 'Servicios', href: '#servicios' },
      { label: 'Proceso', href: '#metodologia' },
      { label: 'Contacto', href: '#contacto' },
    ],
  },

  // ---------- Hero ----------
  hero: {
    headline: 'La página que tu',
    headlineAccent: 'negocio necesitaba.',
    subtitle:
      'Con la personalidad de tu negocio, publicada rápido y sin vueltas.',
    primaryCta: 'Empecemos',
    secondaryCta: 'Ver trabajos',
    socialProof: 'Más de 10 negocios ya tienen su página',
  },

  // ---------- Sobre mí ----------
  about: {
    overline: 'Nosotros',
    title: 'Una primera impresión que no se olvida.',
    paragraphs: [
      'Paige nació de una idea simple: los negocios pequeños y medianos merecen páginas tan buenas como las de los grandes. Sin costos desproporcionados, sin proyectos eternos, sin jerga técnica.',
      'Nos especializamos en landing pages y software a medida — rápidas de lanzar y pensadas para convertir. Vos te enfocás en tu negocio; nosotros lo ponemos en línea.',
    ],
    quote:
      'Una buena página web es el primer empleado que trabaja las 24 horas.',
    highlights: [
      'Te la entregamos publicada y funcionando',
      'Dominio configurado a tu nombre',
      'Los mensajes te llegan al mail y al WhatsApp',
    ],
  },

  // ---------- Trabajos / Portfolio ----------
  // Cada entrada se dibuja como un mockup en CSS usando su propia paleta.
  // Cuando tengas capturas reales, poné la ruta en `screenshot` y el
  // componente la usa en lugar del mockup generado.
  work: {
    overline: 'Trabajos',
    title: 'Cada negocio con su propia cara.',
    subtitle: '',
    ctaLabel: 'Ver sitio',
    solvedLabel: 'Qué resolvimos',
    items: [
      {
        id: 'romina',
        client: 'Lic. Romina Iglesias',
        sector: 'Nutrición deportiva',
        year: '2026',
        url: 'https://lp-romina.vercel.app/', // TODO: pegar dominio propio cuando lo tenga
        screenshot: null,
        description:
          'Landing para licenciada en nutrición especializada en deporte. Foco en reservar consultas y una sección de metodología que ordena el proceso de acompañamiento.',
        solved: [
          'Turnos a un solo click.',
          'Planes explicados una sola vez.',
          'Un lugar propio, más allá de Instagram.',
        ],
        mockup: {
          // `view` define qué parte del sitio se dibuja. Cada proyecto muestra
          // una sección distinta para que las miniaturas no se lean como la
          // misma página con otros colores.
          view: 'hero',
          brand: 'Lic. Romina Iglesias',
          chip: 'Nutrición personalizada',
          nav: ['Sobre mí', 'Planes', 'Metodología', 'Contacto'],
          headline: 'Nutrición que potencia tu',
          headlineAccent: 'rendimiento',
          cta: 'Reservar consulta',
          darkHero: false,
          palette: {
            bg: '#FAFAF5',
            surface: '#FFFFFF',
            ink: '#2C2C2C',
            muted: '#6B6B6B',
            accent: '#4A7C59',
            accentSoft: '#7FAF8A',
            highlight: '#C8956C',
          },
        },
      },
      {
        id: 'goitiametal',
        client: 'Goitia Metal',
        sector: 'Metalúrgica & herrería',
        year: '2026',
        url: 'https://lp-goitiametal.vercel.app/', // TODO: pegar dominio propio cuando lo tenga
        screenshot: null,
        description:
          'Landing para metalúrgica de renombre en Zona Norte que trabaja con estudios de arquitectura. Peso puesto en las obras: grilla de proyectos y metodología de trabajo clara.',
        solved: [
          'La obra a la vista, sin necesidad de enviar fotos.',
          'Explicación clara de los servicios ofrecidos.',
          'Presencia frente a estudios de arquitectura.',
        ],
        mockup: {
          // Reproduce la sección Trabajos del sitio real (ver
          // lp-goitiametal/mockup.jpeg): el foco del cliente está en mostrar
          // obra, no en la marca personal como en el caso de Romina.
          view: 'gallery',
          logoLines: ['GOITIA', 'METAL'],
          nav: ['Inicio', 'Servicios', 'Trabajos', 'Nosotros', 'Contacto'],
          navActive: 'Inicio',
          cta: 'Solicitar presupuesto',
          ctaOutline: true,
          darkHero: true,
          sectionOverline: 'Trabajos',
          sectionTitle: 'Proyectos que hablan de nosotros.',
          galleryCta: 'Ver todos los trabajos',
          processOverline: 'Cómo trabajamos',
          processTitle: 'Un proceso claro, resultados impecables.',
          steps: ['Relevamiento', 'Diseño', 'Fabricación', 'Montaje'],
          palette: {
            bg: '#F4F4F1',
            surface: '#FFFFFF',
            ink: '#141414',
            muted: '#6E6E6E',
            accent: '#9BA1A6',
            accentSoft: '#C6CBD0',
            highlight: '#141414',
          },
        },
      },
    ],
  },

  // ---------- Servicios ----------
  services: {
    overline: 'Qué hacemos',
    title: 'Servicios pensados para negocios reales',
    subtitle: '',
    items: [
      {
        icon: 'RocketLaunch',
        title: 'Landing page',
        description:
          'Página única de alto impacto para presentar tu negocio, captar leads o lanzar un producto. Diseño, desarrollo y deploy incluidos.',
        tag: 'Desde 7 días hábiles',
        featured: true,
      },
      {
        icon: 'Devices',
        title: 'Software a medida',
        description:
          'Aplicaciones web personalizadas para digitalizar procesos, gestionar turnos, vender online o lo que tu negocio necesite.',
        tag: 'Presupuesto a consultar',
      },
      {
        icon: 'TrendingUp',
        title: 'Optimización y rediseño',
        description:
          'Mejoramos tu página actual: velocidad, conversión y diseño. Identificamos qué no está funcionando y lo resolvemos.',
        tag: 'Análisis gratuito',
      },
      {
        icon: 'SupportAgent',
        title: 'Mantenimiento',
        description:
          'Actualizaciones de contenido, correcciones técnicas y soporte continuo para que tu página esté siempre impecable.',
        tag: 'Plan mensual',
      },
    ],
  },

  // ---------- Metodología ----------
  // Se renderiza como scroll narrativo: a medida que scrolleás, el mockup
  // de la derecha se va armando paso a paso.
  methodology: {
    overline: 'Cómo trabajamos',
    title: 'Mirá cómo se arma tu página.',
    subtitle: 'Un proceso claro de principio a fin. Scrolleá para verlo.',
    steps: [
      {
        number: '01',
        label: 'Charla inicial',
        description:
          'Entendemos tu negocio, tus objetivos y tu público. Sin formularios largos: una llamada o chat alcanza.',
        // Texto que "se escribe" dentro del mockup en este paso
        note: 'Rubro, público, objetivo, referencias…',
      },
      {
        number: '02',
        label: 'Propuesta',
        description:
          'En 24–48 hs te enviamos una propuesta con alcance, tiempos y precio. Sin letra chica.',
        note: 'Estructura y secciones definidas',
      },
      {
        number: '03',
        label: 'Diseño y desarrollo',
        description:
          'Trabajamos en tu proyecto y te mostramos avances. Tu feedback es parte del proceso, no un extra.',
        note: 'Paleta, tipografía y contenido real',
      },
      {
        number: '04',
        label: 'Publicación',
        description:
          'Deploy con tu dominio propio, configuración técnica incluida. Te entregamos todo funcionando.',
        note: 'En línea, con dominio propio',
      },
    ],
  },

  // ---------- Testimonios ----------
  testimonials: {
    overline: 'Clientes',
    title: 'Negocios que ya están en línea.',
    items: [
      {
        name: 'Sofía M.',
        role: 'Nutricionista',
        rating: 5,
        text: 'En menos de una semana tenía mi página lista y funcionando. Muy clara la comunicación durante todo el proceso y el resultado superó lo que imaginaba.',
      },
      {
        name: 'Rodrigo T.',
        role: 'Entrenador personal',
        rating: 5,
        text: 'Necesitaba algo profesional sin gastar una fortuna. Paige fue exactamente eso. Rápido, prolijo y sin vueltas.',
      },
      {
        name: 'Valentina C.',
        role: 'Estudio de yoga',
        rating: 5,
        text: 'Me gustó mucho que se tomaron el tiempo de entender lo que quería. No es una plantilla genérica — se nota que es para mi negocio.',
      },
    ],
  },

  // ---------- Contacto ----------
  contactSection: {
    overline: 'Contacto',
    title: 'Hablemos.',
    subtitle:
      'Contanos de tu negocio y te respondemos en menos de 24 hs con una propuesta o una charla.',
    formLabels: {
      name: 'Nombre',
      email: 'Email',
      message: '¿De qué se trata tu negocio?',
      submit: 'Enviar',
    },
    whatsappLabel: 'Prefiero escribir por WhatsApp',
    infoTitle: 'Otros canales',
  },

  // ---------- Footer ----------
  footer: {
    tagline: 'Páginas web simples, rápidas y hechas para cada negocio.',
    rights: 'Todos los derechos reservados.',
    credit: 'Diseñada y desarrollada por Paige.',
    columns: [
      {
        title: 'Servicios',
        links: [
          { label: 'Landing page', href: '#servicios' },
          { label: 'Software a medida', href: '#servicios' },
          { label: 'Mantenimiento', href: '#servicios' },
        ],
      },
      {
        title: 'Navegación',
        links: [
          { label: 'Trabajos', href: '#trabajos' },
          { label: 'Servicios', href: '#servicios' },
          { label: 'Proceso', href: '#metodologia' },
          { label: 'Contacto', href: '#contacto' },
        ],
      },
    ],
  },
};
