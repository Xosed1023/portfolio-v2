# Prompt para generar este portafolio (estilo SpaceX / dark premium)

Quiero que generes un portafolio personal de alto impacto visual, con un estilo oscuro, elegante y futurista, inspirado en marcas como SpaceX. El diseño debe sentirse premium, minimalista y con una fuerte dirección artística.

---

## Estilo visual

- Tema oscuro (dark mode dominante)
- Paleta de colores:
  - Fondo: negro / gris muy oscuro (#0f0f0f, #1a1a1a)
  - Texto principal: blanco
  - Texto secundario: gris claro
  - Color acento: dorado / amarillo suave (#c9a96e o similar)
- Estética:
  - Moderna, futurista, tipo industria tecnológica / aeroespacial
  - Uso de imágenes en blanco y negro
  - Alto contraste
  - Tipografía elegante (sans-serif moderna, estilo SpaceX / Tesla)
- Uso de overlays, transparencias y capas
- Iluminación sutil tipo "glass / blur"

---

## Layout general

- Diseño tipo **hero centrado con composición asimétrica**
- Elementos superpuestos (overlapping layout)
- Estructura:
  - Imagen principal (retrato) parcialmente sobrepuesta al contenido
  - Panel de información a la derecha
  - Navegación vertical minimalista a la izquierda
- Layout tipo **landing de una sola sección (first fold impactante)**

---

## Sección Hero (principal)

- Imagen grande en blanco y negro del perfil (lado izquierdo o centrado)
- Imagen con efecto:
  - Slight zoom
  - Sombra profunda
  - Overlay oscuro
- Panel derecho con:
  - Nombre grande (ej: "Elon Musk")
  - Rol (ej: CEO / Lead Developer)
  - Descripción corta (bio profesional)
- Firma o elemento visual distintivo (simulación de firma o trazo SVG)
- Iconos de redes sociales (minimalistas)

---

## Navegación

- Sidebar vertical en el lado izquierdo:
  - Texto en vertical o rotado
  - Ítems: (correspondientes a un portafolio estándar)
    - Resume (botón de descarga)
  - Estado activo resaltado con color acento
- Navegación secundaria (lado derecho):
  - Botones flotantes (flechas arriba/abajo)
  - Estilo minimalista con fondo acento

---

## Interacción y animaciones

- Animaciones suaves y elegantes:
  - Fade-in al cargar
  - Slide lateral en textos
  - Parallax leve en imagen
- Hover effects:
  - Cambio de color en links
  - Glow sutil en botones
- Transiciones fluidas tipo "premium product"

---

## Componentes clave

- Hero Section (principal)
- Sidebar Navigation (vertical)
- Social Icons (minimal)
- Floating Navigation Buttons
- Image Card con overlay
- Info Panel con texto estructurado

---

## Tecnologías

- Next.js (App Router)
- Tailwind CSS
- GSAP (para animaciones)
- Uso de componentes reutilizables
- Código limpio y escalable

---

## Responsive

- Mobile:
  - El sistema *DEBE SER DISEÑADO MOBILE FIRST* 
  - Sidebar se convierte en menú hamburguesa
  - Imagen se adapta a layout vertical
  - Texto centrado
- Tablet:
  - Layout híbrido (menos superposición)

---

## Extras (muy importantes)

- Efecto de "depth" (profundidad visual con capas)
- Uso de blur y transparencias (backdrop-filter)
- Microinteracción elegantes
- Performance optimizada (lazy loading de imágenes)
- SEO profesional

---

## Resultado esperado

- Un portafolio tipo **marca personal premium**
- Sensación de producto tecnológico de alto nivel
- Diseño que se sienta exclusivo, moderno y cinematográfico
- UX fluida, minimalista y altamente visual
- Excelente experiencia de usuario en dispositivos móviles
- Se deben considerar los tamaños estándar de los dispositivos para el diseño responsive

---

# CONTENIDO COMPLETO DEL PORTAFOLIO — TEXTOS Y CONFIGURACIÓN POR SECCIÓN

> Este bloque documenta TODOS los textos, datos y configuración de cada sección tal como están implementados. Sirve como referencia exacta para replicar o rediseñar el portafolio.

---

## SISTEMA DE DISEÑO (Design Tokens)

### Colores
- **Fondo principal:** `#0a0a0a`
- **Fondo secciones:** `rgba(6,6,6,0.68)` (sobre el aurora background)
- **Acento dorado:** `#c9a96e` (CSS var `--accent`)
- **Acento dim:** `#a8874a` (versión más oscura para hover)
- **Texto principal:** `#ffffff`
- **Texto secundario:** `rgba(255,255,255,0.72)`
- **Texto muted:** `rgba(255,255,255,0.45)`
- **Texto muy muted:** `rgba(255,255,255,0.22)`
- **Bordes sutiles:** `rgba(255,255,255,0.08)` – `rgba(255,255,255,0.15)`

### Tipografía
- **Headings:** Poppins (Google Fonts) — pesos usados: 300, 400, 500, 600, 700, 800
- **Body / párrafos:** Nunito (Google Fonts) — pesos usados: 300, 400, 600
- **Tamaños de título section:** `clamp(2.5rem, 4vw, 4.5rem)` — siempre en MAYÚSCULAS
- **Overline (etiqueta de sección):** `0.65rem`, `letterSpacing: 0.5em`, color acento — formato: `"NN / NOMBRE SECCIÓN"`
- **Tags / badges:** Poppins, `0.58rem – 0.72rem`, `letterSpacing: 0.18em – 0.4em`

### Animaciones
- **Ease premium:** - se usa en casi todas las transiciones
- **slideRight(delay):** `{ x: 40→0, opacity: 0→1 }`, duration 0.85s
- **fadeUp(delay):** `{ y: 22→0, opacity: 0→1 }`, duration 0.8s
- **whileInView:** todas las secciones usan `viewport: { once: true }`
- **IntroLoader:** 1200ms de duración
- **Page transition (negro):** corte instantáneo a negro → router.push → hold 150ms → fade-out 420ms

### Layout estructura
- **Sidebar izquierdo fijo:** 72px de ancho en desktop
- **Scroll container:** `#scroll-container` con `scroll-snap` por sección
- **Padding lateral secciones:** `clamp(1.5rem, 7vw, 112px)` en desktop
- **Grilla fondo:** clase `.grid-bg` con `opacity-25`, decorativa

---

## SIDEBAR (Navegación fija lateral izquierda)

**Ancho:** 72px | **Fondo:** `rgba(10,10,10,0.7)` + `backdrop-filter: blur(12px)` | **Borde derecho:** `1px solid rgba(255,255,255,0.07)`

### Logo / Brand (arriba)
```
XP          ← Poppins ExtraBold, 1.2rem, color acento (#c9a96e)
DEV         ← Poppins Light, 0.42rem, letterSpacing 0.35em, blanco 20%
```

### Ítems de navegación (centro, iconos + número)
Cada ítem tiene: icono SVG 13×13 + número debajo en 0.48rem
El ítem activo muestra una barra vertical de 3px en color acento (animada con `layoutId`)
Tooltip al hover: `"NN LABEL"` en panel flotante a la derecha

| Num | Label    | ID destino |
|-----|----------|------------|
| 01  | HOME     | `#hero`    |
| 02  | ABOUT    | `#about`   |
| 03  | WORK     | `#work`    |
| 04  | SKILLS   | `#skills`  |
| 05  | WEB      | `#web`     |
| 06  | PROJECTS | `#projects`|
| 07  | CONTACT  | `#contact` |

### Botón CV (abajo)
Icono de descarga + texto vertical `"CV"` — descarga `/CV Xosed Penaloza V2.pdf`

---

## SECCIÓN 01 — HERO

**ID:** `#hero` | **Layout desktop:** retrato izquierda + panel info derecha | **Mobile:** centrado full-width

- Retrato (desktop, lado izquierdo)
- Parallax: el retrato se mueve suavemente siguiendo el mouse (`±14px` horizontal, `±10px` vertical)
- Gradientes de borde: fades hacia el negro en todos los lados
- Panel de información (desktop, lado derecho)

Los textos aparecen con animación `slideRight` escalonada:

```
// BOGOTÁ, COLOMBIA · 10+ AÑOS EXP.
```
→ Poppins Medium, 0.65rem, letterSpacing 0.45em, color acento | delay: 0.3s

```
XOSED
PEÑALOZA
```
→ Poppins ExtraBold, `clamp(2.8rem, 4.8vw, 5.8rem)`, letterSpacing -0.02em | La sílaba `LOZA` en color acento | delay: 0.48s

```
Senior Software Engineer · Full Stack Developer
```
→ Poppins SemiBold, 1rem, letterSpacing 0.05em, blanco 80% | El `·` es color acento | delay: 0.62s

**Divider dorado:** 1px alto, 52px ancho, `rgba(201,169,110,0.45)` | delay: 0.78s

**Bio (párrafo principal):**
```
Ingeniero de Software con más de 10 años de experiencia en desarrollo full stack.
Especializado en arquitecturas escalables, microservicios y soluciones empresariales
para banca, hotelería, retail y entretenimiento.
```
→ Nunito Light, 0.93rem, lineHeight 1.9, blanco 72% | Palabras "más de 10 años" y "arquitecturas escalables" en blanco 88% (highlight)

**Skill tags (3 píldoras con borde):**
```
APPS MÓVILES    PÁGINAS WEB    SOFTWARE A LA MEDIDA
```
→ Poppins Medium, 0.67rem, letterSpacing 0.28em, borde `rgba(255,255,255,0.10)`, hover → borde acento

**Firma SVG** (componente `SignatureSVG`) — trazo decorativo de firma manuscrita

**Botones CTA:**
```
[↓ DESCARGAR CV]      [CONTACTAR]
```
- CV: fondo acento `#c9a96e`, texto `#0a0a0a`, padding `px-5 py-[11px]`, glow en hover
- Contactar: borde `rgba(255,255,255,0.15)`, blanco 60%, hover → borde/texto acento

**Social icons** (componente `SocialIcons`) — GitHub y LinkedIn, SVG minimalistas

**Status badge (abajo):**
```
● ACTUALMENTE EN GLOBANT · OPEN TO OPPORTUNITIES
```
→ Punto pulsante en acento + Poppins Medium, 0.6rem, letterSpacing 0.35em, blanco 50%

### Elementos decorativos Hero
- `SCROLL` indicator: línea vertical + texto, centrado bajo el retrato | delay: 2.6s
- `© 2026 XOSED PEÑALOZA` — esquina inferior derecha, 0.55rem, blanco 18%
- `EST. 2014` — esquina superior derecha, 0.55rem, blanco 16%
- Línea vertical decorativa a 72px del borde (border del sidebar)
- Línea horizontal decorativa en el borde inferior de la sección

### Panel mobile (hero, centrado)
Fondo: `rgba(6,6,6,0.72)` | Padding: `px-6 pt-16`

Mismo contenido que desktop pero:
- Nombre: `clamp(3rem, 14vw, 5rem)`, centrado, dos líneas
- Bio acortada: `"Ingeniero de Software con más de 10 años de experiencia en desarrollo full stack."`
- Botón CV muestra solo `"CV"` (sin "DESCARGAR")
- Status: solo `"ACTUALMENTE EN GLOBANT"` (sin "OPEN TO OPPORTUNITIES")
- Scroll hint: línea vertical pulsante al fondo

---

## SECCIÓN 02 — ABOUT ME

**ID:** `#about` | **Sección overline:** `"02 / SOBRE MÍ"` | **Título:** `ABOUT ME` (ME en acento)

### Texto principal (bio)
```
Ingeniero de Software con enfoque en soluciones de alto impacto para
sectores como banca, hotelería, retail y entretenimiento.
Apasionado por la arquitectura limpia, el liderazgo técnico
y la entrega de valor real a usuarios.
```
→ Nunito Light, 0.92rem, lineHeight 1.85, blanco 72% | `"arquitectura limpia"` y `"liderazgo técnico"` en blanco puro (highlight)

### Estadísticas (4 tarjetas con borde)

| Valor | Label |
|-------|-------|
| `10+` | Años de experiencia |
| `06`  | Empresas |
| `04`  | Sectores |
| `B1+` | Inglés |

→ Valor: Poppins ExtraBold, `1.9rem` (desktop) / `1.4rem` (mobile), color acento
→ Label: Nunito Light, `0.72rem`, blanco 58%, `white-space: pre-line`
→ Borde: `rgba(255,255,255,0.10)`, hover → `rgba(201,169,110,0.45)`

### Competencias clave (6 ítems con punto acento)
```
• Desarrollo móvil y web
• Integración de sistemas
• Arquitectura de microservicios
• Liderazgo técnico
• Soluciones empresariales
• Clean architecture
```
→ Nunito Normal, 0.85rem, blanco 68% | Punto: 5×5px círculo color acento, glow en hover

### Formación académica (2 ítems con borde izquierdo)
```
Ingeniería de Software
Universidad Inpahu · 2019

Tecnología en ADSI
SENA · 2015
```
→ Título: Poppins SemiBold, 0.85rem, blanco 88%
→ Institución: Nunito Light, 0.78rem, blanco 50%
→ Borde izquierdo: `border-l-2 border-white/12`, hover → color acento

### Idiomas y modalidad (3 tags con borde)
```
[Español (Nativo)]    [Inglés (B1+)]    [Híbrido / Remoto]
```
→ Poppins Medium, 0.72rem, letterSpacing 0.18em, blanco 58%

### Logo Marquee (pie de la sección)
Banda inferior con logos de clientes en escala de grises, marquee infinito:
```
Assist Consultores · BBVA · Grupo Cinte · Claro · Hoteles Decameron
· Ecopetrol · Experian · Globant · Halliburton · Banco Itaú · Patagonian
```
→ Altura 64px | fondo `rgba(8,8,8,0.72)` | logos con `grayscale(1) brightness(0.55)`, color completo en hover

---

## SECCIÓN 03 — WORK (Experiencia Laboral)

**ID:** `#work` | **Sección overline:** `"03 / EXPERIENCIA"` | **Título:** `WORK`

**Layout desktop:** lista de empresas (tabs) a la izquierda (296px) + panel de detalle a la derecha (separados por `border-l`)
**Layout mobile:** acordeón expandible por empresa

### Empleos (6 registros, orden cronológico inverso)

#### 01 — Globant (ACTUAL)
```
Rol:      NodeJs Senior
Empresa:  Globant
Período:  Dic 2024 - Presente
Tipo:     Banca · Backend
```
**Highlights:**
- Desarrollo y mantenimiento de APIs REST en el sector bancario
- Sistemas de notificaciones con AWS SQS y SNS
- Patrones de integración entre plataformas empresariales
- Clean architecture y pruebas unitarias

**Tech stack:** `Node.js` · `AWS SQS` · `AWS SNS` · `REST APIs` · `AI`

*(Marcado como current — muestra punto pulsante color acento en la lista)*

#### 02 — Grupo Cinte
```
Rol:      Desarrollador Senior Full Stack
Empresa:  Grupo Cinte
Período:  Feb 2024 – Dic 2024
Tipo:     Mobile · Full Stack
```
**Highlights:**
- App móvil React Native con Node.js, MongoDB y AWS (App Store & Google Play)
- Monetización con Google AdManager y AdMob
- Firebase Push Notifications para engagement
- Refactorización y mejoras de calidad de código

**Tech stack:** `React Native` · `Node.js` · `MongoDB` · `AWS` · `Firebase` · `Google Play` · `App Store` · `AdMob` · `AdManager`

#### 03 — Patagonian
```
Rol:      Desarrollador Senior Full Stack
Empresa:  Patagonian
Período:  Sep 2022 – Dic 2023
Tipo:     Enterprise · Angular
```
**Highlights:**
- Aplicación empresarial Angular + Laravel desplegada en AWS
- Traducción de diseños Figma a código responsive
- Pruebas unitarias y mejoras de arquitectura
- Optimización de rendimiento y tiempos de carga

**Tech stack:** `Angular 12` · `Laravel` · `AWS` · `Sass` · `Bootstrap` · `Frontend Performance`

#### 04 — Hoteles Decameron
```
Rol:      Coordinador e Ing. de Integración
Empresa:  Hoteles Decameron
Período:  Sep 2021 – Sep 2022
Tipo:     Hotelería · Integración
```
**Highlights:**
- Integraciones empresariales con RedHat JBoss Fuse + Apache Camel
- APIs REST y SOAP con OAuth 2.0, Basic Auth
- Patrones de integración empresarial (EIP)
- Coordinación de equipos y gestión de despliegues multi ambiente

**Tech stack:** `Java` · `Apache Camel` · `Spring Boot` · `JBoss Fuse` · `XSLT`

#### 05 — Assist Consultores
```
Rol:      Consultor Senior
Empresa:  Assist Consultores
Período:  Sep 2017 – Sep 2021
Tipo:     Consultoría · Multi-sector
```
**Highlights:**
- Backoffice completo de Betplay (Angular + Node.js)
- Integración ESB RedHat: Avianca, Claro, Banco Itaú, ICFES
- APIs REST en Azure Cloud y OpenShift para Sodimac
- App Android nativa para Terpel

**Tech stack:** `Angular` · `Node.js` · `Vue.js` · `Java` · `OpenShift` · `Azure`

#### 06 — Grupo CMC Colombia
```
Rol:      Analista – Programador
Empresa:  Grupo CMC Colombia
Período:  Sep 2016 – Sep 2017
Tipo:     Banca · BBVA
```
**Highlights:**
- Apps BBVA: Grannet, BBVA Net, BBVA Net Cash
- Sistema de cupos y límites de endeudamiento
- Sistema de alertamiento bancario

**Tech stack:** `Java` · `JSP` · `SQL Server`

---

## SECCIÓN 04 — SKILLS & STACK

**ID:** `#skills` | **Sección overline:** `"04 / COMPETENCIAS TÉCNICAS"` | **Título:** `SKILLS & STACK` (el `&` en color acento)

**Layout desktop:** grid 3 columnas de tarjetas con borde, hover eleva la tarjeta y muestra borde acento
**Layout mobile:** tabs horizontales scrollables, una categoría visible a la vez

Cada categoría tiene: icono (símbolo geométrico) + título + lista de skills con barra de progreso animada

### Categorías y skills

#### ◈ FRONTEND
| Skill        | Nivel |
|-------------|-------|
| React        | 95%   |
| Angular 2+   | 92%   |
| TypeScript   | 90%   |
| Vue.js       | 82%   |
| HTML5 / CSS3 | 95%   |

#### ◉ BACKEND
| Skill           | Nivel |
|-----------------|-------|
| Node.js         | 93%   |
| Java / Spring   | 85%   |
| Express.js      | 90%   |
| Apache Camel    | 80%   |
| REST / SOAP APIs| 95%   |

#### ◎ MOBILE
| Skill        | Nivel |
|-------------|-------|
| React Native | 88%   |
| Ionic        | 75%   |

#### ◌ DATABASES
| Skill               | Nivel |
|--------------------|-------|
| MongoDB             | 88%   |
| PostgreSQL / Oracle | 85%   |
| Firebase            | 84%   |
| SQL Server          | 82%   |

#### ◍ CLOUD & DEVOPS
| Skill     | Nivel |
|-----------|-------|
| AWS       | 85%   |
| Docker    | 82%   |
| Azure     | 78%   |
| OpenShift | 78%   |
| GCP       | 70%   |

#### ◐ HERRAMIENTAS
| Skill          | Nivel |
|----------------|-------|
| Git / GitHub   | 95%   |
| Jira           | 90%   |
| Firebase Auth  | 85%   |
| Apache Solr    | 75%   |

**Barras de progreso:** 2px altura, `rgba(255,255,255,0.08)` de fondo, gradiente `from-accent/70 to-accent`, animación al entrar en viewport

---

## SECCIÓN 05 — WEB PROJECTS (Páginas Web)

**ID:** `#web` | **Sección overline:** `"05 / PÁGINAS WEB"` | **Título:** `WEB PROJECTS` (PROJECTS en acento)

**Botón header:** `[VER TODOS LOS PROYECTOS →]` → navega a `/servicios` con transición premium (TransitionLink)

**Nota footer:** muestra conteo dinámico, ej: `"2 EN PRODUCCIÓN · 1 EN DESARROLLO"`

### Proyectos Web (3 tarjetas con mockup de browser)

Cada tarjeta tiene: chrome de browser simulado + screenshot o SVG ilustrativo + info card abajo

#### Pasión de Multitudes
```
Nombre:      Pasión de Multitudes
Cliente:     Iglesia Pasión de Multitudes
Categoría:   Iglesia · Landing
Año:         2026
Status:      LIVE (punto pulsante verde)
URL:         pasiondemultitudes.com
Tech:        Next.js · React · Tailwind CSS
Color:       #c9a96e
```
Descripción:
```
Sitio web institucional para la iglesia Pasión de Multitudes.
Información de servicios, eventos, ubicación y transmisiones en vivo.
```
Screenshot real: `/websites-previews/ipm.webp` — hover revela color con efecto scan line de izquierda a derecha

#### Lorena Bernal
```
Nombre:      Lorena Bernal
Cliente:     Psicóloga Lorena Bernal
Categoría:   Salud · Portafolio
Año:         2026
Status:      EN DESARROLLO (punto dorado)
URL:         (no disponible)
Tech:        Next.js · React · Tailwind CSS
Color:       #7eb8c9
```
Descripción:
```
Sitio web de presentación para psicóloga clínica.
Servicios, perfil profesional, blog y formulario de citas.
```
Visual: SVG ilustrativo tipo "psychology" (layout hero split + tarjetas)

#### Juego Responsable (Betplay)
```
Nombre:      Juego Responsable
Cliente:     Betplay
Categoría:   Apuestas · Responsabilidad
Año:         2021
Status:      LIVE (punto pulsante verde)
URL:         juegoresponsable.betplay.com.co/home
Tech:        AngularJs · Tailwind CSS
Color:       #f59e0b
```
Descripción:
```
Plataforma de juego responsable para Betplay.
Recursos, herramientas de autocontrol y guías para una experiencia segura.
```
Screenshot real: `/websites-previews/betplay.webp` — mismo efecto hover scan

---

## SECCIÓN 06 — SELECTED WORK (Proyectos Destacados)

**ID:** `#projects` | **Sección overline:** `"06 / PROYECTOS"` | **Título:** `SELECTED WORK` (WORK en acento)

**Layout desktop:** lista de proyectos (tabs) izquierda + visual interactivo derecha (enmarcado con esquinas en acento)
**Layout mobile:** lista clickeable + detalle expandible

Contador animado desktop: `01 / 04` con número activo en acento grande

### Proyectos (4, numerados con ceros)

#### 01 — App Móvil Datacrédito
```
Título:    App Móvil\nDatacrédito    (dos líneas)
Categoría: Mobile · React Native
Empresa:   Grupo Cinte
Año:       2024
Visual:    "mobile" (SVG de teléfono con pantalla de puntaje crediticio)
Link:      https://apps.apple.com/co/app/midatacr%C3%A9dito/id6752889575
```
Descripción:
```
Optimización y mantenimiento de la app móvil Datacrédito para App Store y Google Play.
Monetización integrada con Google AdManager y AdMob, notificaciones push con Firebase
y backend escalable en AWS.
```
Tech: `React Native` · `Node.js` · `MongoDB` · `AWS` · `Firebase` · `AdMob`

#### 02 — Betplay Backoffice
```
Título:    Betplay\nBackoffice    (dos líneas)
Categoría: Web · Dashboard
Empresa:   Assist Consultores
Año:       2020
Visual:    "dashboard" (SVG con gráficas de barras y líneas)
Link:      https://juegoresponsable.betplay.com.co/home
```
Descripción:
```
Plataforma de administración completa para Betplay, la apuesta deportiva líder
en Colombia. Gestión de usuarios, reportes en tiempo real y configuración de mercados.
```
Tech: `Angular` · `Node.js` · `Vue.js` · `PostgreSQL`

#### 03 — ESB Integration Platform
```
Título:    ESB Integration\nPlatform    (dos líneas)
Categoría: Backend · Integración
Empresa:   Hoteles Decameron · Assist
Año:       2021
Visual:    "integration" (SVG interactivo: hub central Apache Camel + 5 nodos conectados,
           responde al mouse con glow de proximidad y partículas animadas)
Link:      (privado, sin URL pública)
```
Descripción:
```
Plataforma de integración empresarial para Avianca, Claro, Banco Itaú e ICFES
usando patrones EIP. APIs REST y SOAP con OAuth 2.0 sobre RedHat JBoss Fuse.
```
Tech: `Apache Camel` · `Spring Boot` · `JBoss Fuse` · `XSLT` · `OAuth 2.0`

**Nodos del visual ESB (SVG interactivo):**
- AVIANCA · REST
- CLARO · SOAP
- ITAÚ · OAuth
- ICFES · REST
- FUSE · JBoss
- HUB central: `CAMEL / ESB`

#### 04 — Enterprise Angular App
```
Título:    Enterprise\nAngular App Halliburton | Connect Americas    (dos líneas)
Categoría: Full Stack · Enterprise
Empresa:   Patagonian
Año:       2023
Visual:    "enterprise" (SVG de app web con sidebar + tabla de datos tipo backoffice)
Link:      (privado, NDA)
```
Descripción:
```
Aplicación empresarial en Angular 12 + Laravel desplegada en AWS.
Traducción pixel-perfect de diseños Figma, pruebas unitarias y optimización de rendimiento.
```
Tech: `Angular 12` · `Laravel` · `AWS` · `Sass` · `Bootstrap`

**Botón cuando no hay link:** `[🔒 PRIVADO · NDA]` — borde blanco, texto apagado, cursor default

**Navegación de proyecto:** dots en la parte inferior del panel — activo: barra dorada 28px, inactivo: punto 6px

---

## SECCIÓN 07 — CONTACT

**ID:** `#contact` | **Sección overline:** `"07 / CONTACTO"` | **Título:** `GET IN TOUCH` (TOUCH en acento)

**Layout desktop:** dos columnas — izquierda (info de contacto) + derecha (formulario)
**Layout mobile:** una columna, flujo natural

### Texto de presentación
```
¿Tienes un proyecto interesante o una oportunidad de colaboración?
No dudes en contactarme. Disponible para trabajo híbrido, remoto o freelance.
```
→ Nunito Light, 0.92rem, blanco 65%, max-width 400px

### Datos de contacto (4 tarjetas con borde, hover acento)
```
EMAIL      xosedfabian@gmail.com        → abre mailto:
TELÉFONO   316 578 2144                 → abre tel:+573165782144
UBICACIÓN  Bogotá, Colombia             → abre Google Maps
MODALIDAD  Híbrido o Remoto             (sin link)
```

### Formulario de contacto
**Título form:** `ENVIAR MENSAJE` — Poppins SemiBold, 0.65rem, letterSpacing 0.45em, blanco 45%

**Campos:**
```
NOMBRE *    placeholder: "Tu nombre"
EMAIL *     placeholder: "tu@email.com"
ASUNTO      placeholder: "Asunto del mensaje"
MENSAJE *   placeholder: "Tu mensaje..."   (textarea, 5 filas)
```
→ Labels: Poppins Medium, 0.6rem, letterSpacing 0.3em, blanco 40%
→ Inputs: fondo transparente, borde `rgba(255,255,255,0.10)`, focus → borde acento 55%
→ Asterisco `*` en color acento

**Botón submit — estados:**
```
Idle:     [ENVIAR MENSAJE →]      → fondo acento, texto negro
Sending:  [⟳ ENVIANDO...]        → fondo acento, opacidad 70%
Sent:     [✓ ¡MENSAJE ENVIADO!]  → fondo verde rgba(60,140,80,0.85)
Error:    [ERROR — INTENTA DE NUEVO] → fondo rojo rgba(180,60,60,0.85)
```

### Divisor social (bajo el formulario, solo desktop)
```
─────────── O ENCUÉNTRAME EN ───────────
    [GitHub]          [LinkedIn]
```

### Footer bar (dentro de la sección contact, solo desktop)
```
XP                    © 2026 Xosed Penaloza — Bogotá, Colombia          [GitHub] [LinkedIn] [Email]
```
→ Logo `XP`: Poppins ExtraBold, 0.95rem, color acento
→ Copyright: Nunito Light, 0.68rem, blanco 22%
→ Iconos: SVG 15×15, blanco 30% → hover acento

---

## RUTA /servicios (Página independiente)

Página separada con scroll normal (sin snap, sin overflow:hidden en body).
Usa `TransitionLink` para volver al portfolio (transición premium).

Muestra todas las tarjetas de proyectos web de `lib/web-projects.ts` en una grilla.
Mismo componente `ProjectCard` con browser mockup + info + tech tags + CTAs.

---

## NOTAS DE RESPONSIVE (problemas conocidos y soluciones recomendadas)

### Breakpoints usados
- **Mobile:** `< 1024px` (breakpoint `lg` de Tailwind)
- **Desktop:** `≥ 1024px`
- **Tablet:** NO tiene diseño propio — cae al layout mobile

### Estrategia actual (problemática para pantallas intermedias)
- El diseño está optimizado para **1920×1080** (desktop) y **375–430px** (mobile)
- Entre 768px y 1023px (tablets, laptops pequeños) la experiencia es deficiente
- El sidebar de 72px consume espacio en pantallas estrechas sin compensar el contenido

### Para replicar con MEJOR responsive se recomienda:
1. **Agregar breakpoint `md` (768px):** layout de 1 columna en tablet similar al mobile pero con más espacio
2. **Sidebar colapsable:** en `< 1280px` convertir en overlay o hamburguesa, no fijo
3. **Tipografía fluida más agresiva:** usar `clamp()` en todos los tamaños, no solo en headings
4. **Hero section:** en tabletas (`768–1024px`), mostrar retrato encima del texto (apilado), no lado a lado
5. **Skills grid:** 2 columnas en `md`, 3 en `xl` (actualmente salta de 1 a 3)
6. **Work/Projects:** el panel izquierdo de 296px es muy ancho para pantallas de 768–900px; reducir a 220px
7. **Scroll-snap:** desactivar en mobile y tableta, mantener solo en desktop ≥ 1024px
8. **Padding lateral:** el actual `clamp(1.5rem, 7vw, 112px)` funciona bien en todos los rangos

---

## ASSETS Y ARCHIVOS CLAVE

| Archivo | Descripción |
|---------|-------------|
| `/portrait.webp` | Foto de perfil (149 KB, WebP) |
| `/CV Xosed Penaloza V2.pdf` | CV descargable |
| `/websites-previews/ipm.webp` | Screenshot Pasión de Multitudes |
| `/websites-previews/betplay.webp` | Screenshot Betplay |
| `/clients/*.png/.svg` | Logos clientes para marquee (11 logos) |
| `components/HeroSection.tsx` | Sección principal con retrato y bio |
| `components/sections/AboutSection.tsx` | Sobre mí, stats, educación |
| `components/sections/WorkSection.tsx` | Experiencia laboral (acordeón/tabs) |
| `components/sections/SkillsSection.tsx` | Skills con barras de progreso |
| `components/sections/WebSection.tsx` | Cards de proyectos web |
| `components/sections/ProjectsSection.tsx` | Proyectos destacados con visuales SVG |
| `components/sections/ContactSection.tsx` | Formulario + datos de contacto |
| `components/Sidebar.tsx` | Navegación fija izquierda |
| `components/LogoMarquee.tsx` | Banda de logos de clientes |
| `lib/web-projects.ts` | Datos de proyectos web (fuente de verdad) |
| `app/api/contact/route.ts` | API endpoint para el formulario |
