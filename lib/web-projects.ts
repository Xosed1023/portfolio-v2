/**
 * Web Projects data — edit this file to add / update projects.
 *
 * Future: replace this array with a Notion API fetch so updates
 * happen directly from a Notion database without touching code.
 * → npm install @notionhq/client
 * → add NOTION_TOKEN + NOTION_WEB_DB_ID to .env.local
 */

export interface WebProject {
  id: string;
  name: string;
  client: string;
  category: string;
  description: string;
  url?: string;           // live URL — omit if not deployed
  github?: string;        // repo URL — omit if private
  status: "live" | "development" | "soon";
  tech: string[];
  visual: string;         // key used to pick the SVG mockup style (ignored when image is set)
  image?: string;         // screenshot path in /public — if set + status live, shows real photo
  year: string;
  color: string;          // dominant brand color for the mockup accent
}

const WEB_PROJECTS: WebProject[] = [
  {
    id: "pasion-de-multitudes",
    name: "Pasión de Multitudes",
    client: "Iglesia Pasión de Multitudes",
    category: "Iglesia · Landing",
    description:
      "Sitio web institucional para la iglesia Pasión de Multitudes. Información de servicios, eventos, ubicación y transmisiones en vivo.",
    url: "https://www.pasiondemultitudes.com/",
    status: "live",
    tech: ["Next.js", "React", "Tailwind CSS"],
    visual: "church",
    image: "/websites-previews/ipm.webp",
    year: "2026",
    color: "#c9a96e",
  },
  {
    id: "lorena-bernal",
    name: "Lorena Bernal",
    client: "Psicóloga Lorena Bernal",
    category: "Salud · Portafolio",
    description:
      "Sitio web de presentación para psicóloga clínica. Servicios, perfil profesional, blog y formulario de citas.",
    url: undefined,
    status: "development",
    tech: ["Next.js", "React", "Tailwind CSS"],
    visual: "psychology",
    year: "2026",
    color: "#7eb8c9",
  },
  {
    id: "betplay-juego-responsable",
    name: "Juego Responsable",
    client: "Betplay",
    category: "Apuestas · Responsabilidad",
    description:
      "Plataforma de juego responsable para Betplay. Recursos, herramientas de autocontrol y guías para una experiencia segura.",
    url: "https://juegoresponsable.betplay.com.co/home",
    status: "live",
    tech: ["AngularJs", "Tailwind CSS"],
    visual: "default",
    image: "/websites-previews/betplay.webp",
    year: "2021",
    color: "#f59e0b",
  },
  // ─── Add more projects below ───────────────────────────────────────
  // {
  //   id: "mi-proyecto",
  //   name: "Nombre del proyecto",
  //   client: "Cliente",
  //   category: "Categoría",
  //   description: "Descripción breve.",
  //   url: "https://...",
  //   status: "live",
  //   tech: ["Next.js", "React"],
  //   visual: "default",
  //   year: "2025",
  //   color: "#c9a96e",
  // },
];

export default WEB_PROJECTS;
