import type { Lang } from "@/contexts/LanguageContext";

/** Helper — pick the right language from a bilingual entry */
export function t(entry: { es: string; en: string }, lang: Lang): string {
  return entry[lang];
}

const T = {
  /* ─── Navigation ──────────────────────────────────── */
  nav: {
    home:       { es: "INICIO",       en: "HOME" },
    about:      { es: "SOBRE MÍ",     en: "ABOUT" },
    work:       { es: "EXPERIENCIA",  en: "WORK" },
    skills:     { es: "HABILIDADES",  en: "SKILLS" },
    web:        { es: "WEB",          en: "WEB" },
    projects:   { es: "PROYECTOS",    en: "PROJECTS" },
    contact:    { es: "CONTACTO",     en: "CONTACT" },
    downloadCv: { es: "DESCARGAR CV", en: "DOWNLOAD CV" },
    cv:         { es: "CV",           en: "CV" },
  },

  /* ─── Hero Section ────────────────────────────────── */
  hero: {
    location:   { es: "// BOGOTÁ, COLOMBIA · 10+ AÑOS EXP.", en: "// BOGOTÁ, COLOMBIA · 10+ YRS EXP." },
    role1:      { es: "Ingeniero de Software Senior",         en: "Senior Software Engineer" },
    role2:      { es: "Desarrollador Full Stack",             en: "Full Stack Developer" },
    bioDesktop: {
      es: "Ingeniero de Software con más de 10 años de experiencia en desarrollo full stack. Especializado en arquitecturas escalables, microservicios y soluciones empresariales para banca, hotelería, retail y entretenimiento.",
      en: "Software Engineer with 10+ years of full stack development experience. Specialized in scalable architectures, microservices, and enterprise solutions for banking, hospitality, retail, and entertainment.",
    },
    bioMobile: {
      es: "Ingeniero de Software con más de 10 años de experiencia en desarrollo full stack.",
      en: "Software Engineer with 10+ years of full stack development experience.",
    },
    skills: {
      es: ["Apps móviles", "Páginas web", "Software a la medida"],
      en: ["Mobile apps",  "Web pages",   "Custom software"],
    },
    status:  { es: "ACTUALMENTE EN GLOBANT · ABIERTO A OPORTUNIDADES", en: "CURRENTLY AT GLOBANT · OPEN TO OPPORTUNITIES" },
    contact: { es: "CONTACTAR", en: "CONTACT" },
  },

  /* ─── About Section ───────────────────────────────── */
  about: {
    sectionLabel:      { es: "02 / SOBRE MÍ",      en: "02 / ABOUT ME" },
    heading1:          { es: "SOBRE",               en: "ABOUT" },
    heading2:          { es: "MÍ",                  en: "ME" },
    competenciesLabel: { es: "COMPETENCIAS CLAVE",  en: "KEY COMPETENCIES" },
    educationLabel:    { es: "FORMACIÓN ACADÉMICA", en: "EDUCATION" },
    languagesLabel:    { es: "IDIOMAS · MODALIDAD", en: "LANGUAGES · MODE" },
    bioDesktop: {
      es: "Ingeniero de Software con enfoque en soluciones de alto impacto para sectores como banca, hotelería, retail y entretenimiento. Apasionado por la arquitectura limpia, el liderazgo técnico y la entrega de valor real a usuarios.",
      en: "Software Engineer focused on high-impact solutions for industries such as banking, hospitality, retail, and entertainment. Passionate about clean architecture, technical leadership, and delivering real value to users.",
    },
    bioMobile: {
      es: "Ingeniero de Software con enfoque en soluciones de alto impacto para sectores como banca, hotelería, retail y entretenimiento. Apasionado por la arquitectura limpia y el liderazgo técnico.",
      en: "Software Engineer focused on high-impact solutions for banking, hospitality, retail, and entertainment. Passionate about clean architecture and technical leadership.",
    },
    stats: [
      { value: "10+", label: { es: "Años de\nexperiencia", en: "Years of\nexperience" } },
      { value: "06",  label: { es: "Empresas",             en: "Companies" } },
      { value: "04",  label: { es: "Sectores",             en: "Industries" } },
      { value: "B1+", label: { es: "Inglés",               en: "English" } },
    ],
    competencies: [
      { es: "Desarrollo móvil y web",        en: "Mobile & web development" },
      { es: "Integración de sistemas",        en: "Systems integration" },
      { es: "Arquitectura de microservicios", en: "Microservices architecture" },
      { es: "Liderazgo técnico",              en: "Technical leadership" },
      { es: "Soluciones empresariales",       en: "Enterprise solutions" },
      { es: "Clean architecture",             en: "Clean architecture" },
    ],
    languageTags: [
      { es: "Español (Nativo)", en: "Spanish (Native)" },
      { es: "Inglés (B1+)",     en: "English (B1+)" },
      { es: "Híbrido / Remoto", en: "Hybrid / Remote" },
    ],
  },

  /* ─── Work Section ────────────────────────────────── */
  work: {
    sectionLabel: { es: "03 / EXPERIENCIA", en: "03 / WORK" },
    heading:      { es: "EXPERIENCIA",       en: "WORK" },
    jobs: [
      {
        role: { es: "NodeJs Senior",              en: "Senior Node.js Engineer" },
        type: { es: "Banca · Backend",            en: "Banking · Backend" },
        highlights: [
          { es: "Desarrollo y mantenimiento de APIs REST en el sector bancario",   en: "Development and maintenance of REST APIs in the banking sector" },
          { es: "Sistemas de notificaciones con AWS SQS y SNS",                   en: "Notification systems with AWS SQS and SNS" },
          { es: "Patrones de integración entre plataformas empresariales",         en: "Integration patterns between enterprise platforms" },
          { es: "Clean architecture y pruebas unitarias",                         en: "Clean architecture and unit testing" },
        ],
      },
      {
        role: { es: "Desarrollador Senior Full Stack", en: "Senior Full Stack Developer" },
        type: { es: "Mobile · Full Stack",             en: "Mobile · Full Stack" },
        highlights: [
          { es: "App móvil React Native con Node.js, MongoDB y AWS (App Store & Google Play)", en: "React Native mobile app with Node.js, MongoDB and AWS (App Store & Google Play)" },
          { es: "Monetización con Google AdManager y AdMob",                                   en: "Monetization with Google AdManager and AdMob" },
          { es: "Firebase Push Notifications para engagement",                                 en: "Firebase Push Notifications for engagement" },
          { es: "Refactorización y mejoras de calidad de código",                             en: "Code refactoring and quality improvements" },
        ],
      },
      {
        role: { es: "Desarrollador Senior Full Stack", en: "Senior Full Stack Developer" },
        type: { es: "Enterprise · Angular",            en: "Enterprise · Angular" },
        highlights: [
          { es: "Aplicación empresarial Angular + Laravel desplegada en AWS",      en: "Enterprise Angular + Laravel application deployed on AWS" },
          { es: "Traducción de diseños Figma a código responsive",                en: "Pixel-perfect Figma to responsive code translation" },
          { es: "Pruebas unitarias y mejoras de arquitectura",                     en: "Unit testing and architecture improvements" },
          { es: "Optimización de rendimiento y tiempos de carga",                 en: "Performance and load time optimization" },
        ],
      },
      {
        role: { es: "Coordinador e Ing. de Integración", en: "Integration Coordinator & Engineer" },
        type: { es: "Hotelería · Integración",            en: "Hospitality · Integration" },
        highlights: [
          { es: "Integraciones empresariales con RedHat JBoss Fuse + Apache Camel",        en: "Enterprise integrations with RedHat JBoss Fuse + Apache Camel" },
          { es: "APIs REST y SOAP con OAuth 2.0, Basic Auth",                              en: "REST and SOAP APIs with OAuth 2.0, Basic Auth" },
          { es: "Patrones de integración empresarial (EIP)",                               en: "Enterprise Integration Patterns (EIP)" },
          { es: "Coordinación de equipos y gestión de despliegues multi ambiente",         en: "Team coordination and multi-environment deployment management" },
        ],
      },
      {
        role: { es: "Consultor Senior",           en: "Senior Consultant" },
        type: { es: "Consultoría · Multi-sector",  en: "Consulting · Multi-sector" },
        highlights: [
          { es: "Backoffice completo de Betplay (Angular + Node.js)",             en: "Complete Betplay backoffice (Angular + Node.js)" },
          { es: "Integración ESB RedHat: Avianca, Claro, Banco Itaú, ICFES",     en: "RedHat ESB integration: Avianca, Claro, Banco Itaú, ICFES" },
          { es: "APIs REST en Azure Cloud y OpenShift para Sodimac",              en: "REST APIs on Azure Cloud and OpenShift for Sodimac" },
          { es: "App Android nativa para Terpel",                                 en: "Native Android app for Terpel" },
        ],
      },
      {
        role: { es: "Analista – Programador", en: "Analyst – Programmer" },
        type: { es: "Banca · BBVA",            en: "Banking · BBVA" },
        highlights: [
          { es: "Apps BBVA: Grannet, BBVA Net, BBVA Net Cash",   en: "BBVA apps: Grannet, BBVA Net, BBVA Net Cash" },
          { es: "Sistema de cupos y límites de endeudamiento",   en: "Credit limits and debt management system" },
          { es: "Sistema de alertamiento bancario",              en: "Banking alert system" },
        ],
      },
    ],
  },

  /* ─── Skills Section ──────────────────────────────── */
  skills: {
    sectionLabel: { es: "04 / COMPETENCIAS TÉCNICAS", en: "04 / TECHNICAL SKILLS" },
    heading1:     { es: "HABILIDADES",                 en: "SKILLS" },
    heading2:     { es: "TECNOLOGÍAS",                 en: "TECHNOLOGIES" },
    categoryNames: {
      "Frontend":         { es: "Frontend",       en: "Frontend" },
      "Backend":          { es: "Backend",        en: "Backend" },
      "Móvil":            { es: "Móvil",          en: "Mobile" },
      "Bases de Datos":   { es: "Bases de Datos", en: "Databases" },
      "Cloud & DevOps":   { es: "Cloud & DevOps", en: "Cloud & DevOps" },
      "Herramientas":     { es: "Herramientas",   en: "Tools" },
    } as Record<string, { es: string; en: string }>,
  },

  /* ─── Web Section ─────────────────────────────────── */
  web: {
    sectionLabel:    { es: "05 / PÁGINAS WEB",       en: "05 / WEB PROJECTS" },
    heading1:        { es: "PROYECTOS",               en: "WEB" },
    heading2:        { es: "WEB",                     en: "PROJECTS" },
    viewAll:         { es: "VER TODOS LOS PROYECTOS", en: "VIEW ALL PROJECTS" },
    hover:           { es: "VER",                     en: "VIEW" },
    github:          { es: "GITHUB",                  en: "GITHUB" },
    viewSite:        { es: "VER SITIO",               en: "VIEW SITE" },
    inDevelopment:   { es: "EN DESARROLLO",           en: "IN DEVELOPMENT" },
    inProduction:    { es: "EN PRODUCCIÓN",           en: "IN PRODUCTION" },
    comingSoon:      { es: "PRÓXIMAMENTE",             en: "COMING SOON" },
  },

  /* ─── Projects Section ────────────────────────────── */
  projects: {
    sectionLabel: { es: "06 / PROYECTOS", en: "06 / PROJECTS" },
    heading1:     { es: "PROYECTOS",      en: "SELECTED" },
    heading2:     { es: "DESTACADOS",     en: "WORK" },
    viewProject:  { es: "VER PROYECTO",   en: "VIEW PROJECT" },
    privateNda:   { es: "PRIVADO · NDA",  en: "PRIVATE · NDA" },
    items: [
      {
        title:       { es: "App Móvil\nDatacrédito",    en: "Datacredito\nMobile App" },
        category:    { es: "Mobile · React Native",     en: "Mobile · React Native" },
        description: {
          es: "Optimización y mantenimiento de la app móvil Datacrédito para App Store y Google Play. Monetización integrada con Google AdManager y AdMob, notificaciones push con Firebase y backend escalable en AWS.",
          en: "Optimization and maintenance of the Datacrédito mobile app for App Store and Google Play. Integrated monetization with Google AdManager and AdMob, push notifications via Firebase, and scalable AWS backend.",
        },
      },
      {
        title:       { es: "Betplay\nBackoffice",   en: "Betplay\nBackoffice" },
        category:    { es: "Web · Dashboard",       en: "Web · Dashboard" },
        description: {
          es: "Plataforma de administración completa para Betplay, la apuesta deportiva líder en Colombia. Gestión de usuarios, reportes en tiempo real y configuración de mercados.",
          en: "Complete administration platform for Betplay, Colombia's leading sports betting platform. User management, real-time reports, and market configuration.",
        },
      },
      {
        title:       { es: "ESB Integration\nPlatform", en: "ESB Integration\nPlatform" },
        category:    { es: "Backend · Integración",     en: "Backend · Integration" },
        description: {
          es: "Plataforma de integración empresarial para Avianca, Claro, Banco Itaú e ICFES usando patrones EIP. APIs REST y SOAP con OAuth 2.0 sobre RedHat JBoss Fuse.",
          en: "Enterprise integration platform for Avianca, Claro, Banco Itaú, and ICFES using EIP patterns. REST and SOAP APIs with OAuth 2.0 on RedHat JBoss Fuse.",
        },
      },
      {
        title:       { es: "Enterprise\nAngular App Halliburton | Connect Americas", en: "Enterprise\nAngular App Halliburton | Connect Americas" },
        category:    { es: "Full Stack · Enterprise",   en: "Full Stack · Enterprise" },
        description: {
          es: "Aplicación empresarial en Angular 12 + Laravel desplegada en AWS. Traducción pixel-perfect de diseños Figma, pruebas unitarias y optimización de rendimiento.",
          en: "Enterprise application in Angular 12 + Laravel deployed on AWS. Pixel-perfect Figma design translation, unit testing, and performance optimization.",
        },
      },
    ],
  },

  /* ─── Contact Section ─────────────────────────────── */
  contact: {
    sectionLabel:  { es: "07 / CONTACTO", en: "07 / CONTACT" },
    heading1:      { es: "PONTE EN",      en: "GET IN" },
    heading2:      { es: "CONTACTO",      en: "TOUCH" },
    headingMobile: { es: "CONTACTO",      en: "CONTACT" },
    bioDesktop: {
      es: "¿Tienes un proyecto interesante o una oportunidad de colaboración? No dudes en contactarme. Disponible para trabajo híbrido, remoto o freelance.",
      en: "Have an interesting project or a collaboration opportunity? Don't hesitate to reach out. Available for hybrid, remote, or freelance work.",
    },
    bioMobile: {
      es: "¿Tienes un proyecto o una oportunidad? Disponible para trabajo híbrido, remoto o freelance.",
      en: "Have a project or an opportunity? Available for hybrid, remote, or freelance work.",
    },
    sendMessage: { es: "ENVIAR MENSAJE", en: "SEND MESSAGE" },
    fields: {
      name:    { es: "NOMBRE",  en: "NAME" },
      email:   { es: "EMAIL",   en: "EMAIL" },
      subject: { es: "ASUNTO",  en: "SUBJECT" },
      message: { es: "MENSAJE", en: "MESSAGE" },
    },
    placeholders: {
      name:    { es: "Tu nombre",          en: "Your name" },
      email:   { es: "tu@email.com",       en: "you@email.com" },
      subject: { es: "Asunto del mensaje", en: "Message subject" },
      message: { es: "Tu mensaje...",      en: "Your message..." },
    },
    submit: {
      sending: { es: "ENVIANDO...",              en: "SENDING..." },
      sent:    { es: "¡MENSAJE ENVIADO!",        en: "MESSAGE SENT!" },
      error:   { es: "ERROR — INTENTA DE NUEVO", en: "ERROR — TRY AGAIN" },
      idle:    { es: "ENVIAR",                   en: "SEND" },
    },
  },

  /* ─── /servicios page ─────────────────────────────── */
  servicios: {
    header: {
      portfolio: { es: "PORTFOLIO", en: "PORTFOLIO" },
      contact:   { es: "CONTACTAR", en: "CONTACT" },
    },
    hero: {
      sectionLabel: { es: "DISEÑO & DESARROLLO WEB",    en: "WEB DESIGN & DEVELOPMENT" },
      line1:        { es: "Páginas web que",             en: "Websites that" },
      line2:        { es: "convierten",                  en: "convert" },
      line3:        { es: "visitas en clientes.",        en: "visitors into clients." },
      bio: {
        es: "Más de 10 años construyendo productos digitales de alto impacto. Diseño premium, código limpio y resultados medibles.",
        en: "Over 10 years building high-impact digital products. Premium design, clean code, and measurable results.",
      },
      cta1: { es: "VER PROYECTOS", en: "VIEW PROJECTS" },
      cta2: { es: "HABLEMOS",      en: "LET'S TALK" },
    },
    stats: [
      { value: "10+", label: { es: "Años de experiencia", en: "Years of experience" } },
      { value: "50+", label: { es: "Proyectos entregados", en: "Projects delivered" } },
      { value: "30+", label: { es: "Clientes satisfechos", en: "Satisfied clients" } },
    ],
    projects: {
      sectionLabel: { es: "MUESTRA DE TRABAJO",      en: "WORK SHOWCASE" },
      heading:      { es: "Proyectos de referencia", en: "Reference projects" },
      allFilter:    { es: "Todos",                   en: "All" },
      wantThis:     { es: "QUIERO ALGO ASÍ",         en: "I WANT THIS" },
      viewProject:  { es: "VER PROYECTO",            en: "VIEW PROJECT" },
    },
    statusLabels: {
      live:        { es: "Live",          en: "Live" },
      development: { es: "En desarrollo", en: "In development" },
      soon:        { es: "Próximamente",  en: "Coming soon" },
    },
    process: {
      sectionLabel: { es: "CÓMO TRABAJO",             en: "HOW I WORK" },
      heading:      { es: "Del concepto a la entrega", en: "From concept to delivery" },
      steps: [
        { title: { es: "Consulta",    en: "Consultation" }, desc: { es: "Hablamos de tu negocio y objetivos.",                           en: "We discuss your business and goals." } },
        { title: { es: "Propuesta",   en: "Proposal" },     desc: { es: "Wireframe y presupuesto detallado en 48 horas.",                en: "Wireframe and detailed quote within 48 hours." } },
        { title: { es: "Desarrollo",  en: "Development" },  desc: { es: "Construyo con actualizaciones semanales para tu aprobación.",   en: "I build with weekly updates for your approval." } },
        { title: { es: "Entrega",     en: "Delivery" },     desc: { es: "Publicamos, configuro el dominio y te enseño a administrarlo.", en: "We launch, I configure the domain and teach you to manage it." } },
      ],
    },
    cta: {
      sectionLabel: { es: "¿LISTO PARA EMPEZAR?",     en: "READY TO START?" },
      line1:        { es: "Hablemos de",               en: "Let's talk about" },
      line2:        { es: "tu proyecto.",              en: "your project." },
      bio: {
        es: "Cuéntame tu idea y te envío una propuesta en 48 horas.",
        en: "Tell me your idea and I'll send you a proposal within 48 hours.",
      },
      whatsapp: { es: "WHATSAPP", en: "WHATSAPP" },
      email:    { es: "EMAIL",    en: "EMAIL" },
    },
    footer: {
      backToPortfolio: { es: "VOLVER AL PORTFOLIO", en: "BACK TO PORTFOLIO" },
      portfolio:       { es: "PORTFOLIO",           en: "PORTFOLIO" },
    },
  },
} as const;

export default T;
