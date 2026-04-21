export type TechColor = {
  color: string;
  border: string;
  bg: string;
};

const DEFAULT: TechColor = {
  color: "rgba(201,169,110,0.82)",
  border: "rgba(201,169,110,0.28)",
  bg: "rgba(201,169,110,0.06)",
};

// Keys are lowercase substrings matched against the tech name
const MAP: Array<[string, TechColor]> = [
  // ── React ecosystem ──────────────────────────────────────────────────
  ["react native",   { color: "#5ab8d4", border: "rgba(90,184,212,0.30)", bg: "rgba(90,184,212,0.07)" }],
  ["react",          { color: "#5ab8d4", border: "rgba(90,184,212,0.30)", bg: "rgba(90,184,212,0.07)" }],
  ["next",           { color: "#8898b0", border: "rgba(136,152,176,0.28)", bg: "rgba(136,152,176,0.06)" }],

  // ── JavaScript / TypeScript ──────────────────────────────────────────
  ["typescript",     { color: "#4878c8", border: "rgba(72,120,200,0.30)", bg: "rgba(72,120,200,0.07)" }],
  ["javascript",     { color: "#c4a800", border: "rgba(196,168,0,0.30)", bg: "rgba(196,168,0,0.07)" }],

  // ── Angular ──────────────────────────────────────────────────────────
  ["angular",        { color: "#c44060", border: "rgba(196,64,96,0.30)", bg: "rgba(196,64,96,0.07)" }],

  // ── Vue ──────────────────────────────────────────────────────────────
  ["vue",            { color: "#42a882", border: "rgba(66,168,130,0.30)", bg: "rgba(66,168,130,0.07)" }],

  // ── Node.js / Express ────────────────────────────────────────────────
  ["node",           { color: "#5ca854", border: "rgba(92,168,84,0.30)", bg: "rgba(92,168,84,0.07)" }],
  ["express",        { color: "#5ca854", border: "rgba(92,168,84,0.28)", bg: "rgba(92,168,84,0.06)" }],

  // ── Java / Spring / JBoss ────────────────────────────────────────────
  ["spring",         { color: "#6db840", border: "rgba(109,184,64,0.30)", bg: "rgba(109,184,64,0.07)" }],
  ["jboss",          { color: "#c03030", border: "rgba(192,48,48,0.30)", bg: "rgba(192,48,48,0.07)" }],
  ["java",           { color: "#c87800", border: "rgba(200,120,0,0.30)", bg: "rgba(200,120,0,0.07)" }],
  ["jsp",            { color: "#c87800", border: "rgba(200,120,0,0.30)", bg: "rgba(200,120,0,0.07)" }],

  // ── Apache ───────────────────────────────────────────────────────────
  ["apache camel",   { color: "#c46c20", border: "rgba(196,108,32,0.30)", bg: "rgba(196,108,32,0.07)" }],
  ["apache solr",    { color: "#c46c20", border: "rgba(196,108,32,0.28)", bg: "rgba(196,108,32,0.06)" }],
  ["apache",         { color: "#c46c20", border: "rgba(196,108,32,0.28)", bg: "rgba(196,108,32,0.06)" }],

  // ── Databases ────────────────────────────────────────────────────────
  ["mongodb",        { color: "#5ab85c", border: "rgba(90,184,92,0.30)", bg: "rgba(90,184,92,0.07)" }],
  ["postgresql",     { color: "#4878a8", border: "rgba(72,120,168,0.30)", bg: "rgba(72,120,168,0.07)" }],
  ["oracle",         { color: "#c03030", border: "rgba(192,48,48,0.30)", bg: "rgba(192,48,48,0.07)" }],
  ["sql server",     { color: "#b03030", border: "rgba(176,48,48,0.30)", bg: "rgba(176,48,48,0.07)" }],
  ["firebase auth",  { color: "#c9a020", border: "rgba(201,160,32,0.30)", bg: "rgba(201,160,32,0.07)" }],
  ["firebase",       { color: "#c9a020", border: "rgba(201,160,32,0.30)", bg: "rgba(201,160,32,0.07)" }],

  // ── AWS ──────────────────────────────────────────────────────────────
  ["aws sqs",        { color: "#cc8822", border: "rgba(204,136,34,0.30)", bg: "rgba(204,136,34,0.07)" }],
  ["aws sns",        { color: "#cc8822", border: "rgba(204,136,34,0.30)", bg: "rgba(204,136,34,0.07)" }],
  ["aws",            { color: "#cc8822", border: "rgba(204,136,34,0.32)", bg: "rgba(204,136,34,0.07)" }],

  // ── Google / AdMob ───────────────────────────────────────────────────
  ["google play",    { color: "#5aa050", border: "rgba(90,160,80,0.30)", bg: "rgba(90,160,80,0.07)" }],
  ["app store",      { color: "#2090d8", border: "rgba(32,144,216,0.30)", bg: "rgba(32,144,216,0.07)" }],
  ["admob",          { color: "#5a96d0", border: "rgba(90,150,208,0.28)", bg: "rgba(90,150,208,0.06)" }],
  ["admanager",      { color: "#5a96d0", border: "rgba(90,150,208,0.28)", bg: "rgba(90,150,208,0.06)" }],

  // ── Cloud / DevOps ───────────────────────────────────────────────────
  ["docker",         { color: "#2490e8", border: "rgba(36,144,232,0.30)", bg: "rgba(36,144,232,0.07)" }],
  ["azure",          { color: "#2078d4", border: "rgba(32,120,212,0.30)", bg: "rgba(32,120,212,0.07)" }],
  ["openshift",      { color: "#c02020", border: "rgba(192,32,32,0.30)", bg: "rgba(192,32,32,0.07)" }],
  ["gcp",            { color: "#2080c8", border: "rgba(32,128,200,0.30)", bg: "rgba(32,128,200,0.07)" }],

  // ── CSS / Styling ────────────────────────────────────────────────────
  ["tailwind",       { color: "#30a8d0", border: "rgba(48,168,208,0.30)", bg: "rgba(48,168,208,0.07)" }],
  ["sass",           { color: "#c06090", border: "rgba(192,96,144,0.30)", bg: "rgba(192,96,144,0.07)" }],
  ["bootstrap",      { color: "#8060c0", border: "rgba(128,96,192,0.30)", bg: "rgba(128,96,192,0.07)" }],
  ["css",            { color: "#4878c8", border: "rgba(72,120,200,0.28)", bg: "rgba(72,120,200,0.06)" }],
  ["html",           { color: "#c87040", border: "rgba(200,112,64,0.30)", bg: "rgba(200,112,64,0.07)" }],

  // ── Laravel / PHP ────────────────────────────────────────────────────
  ["laravel",        { color: "#c84040", border: "rgba(200,64,64,0.30)", bg: "rgba(200,64,64,0.07)" }],

  // ── Mobile ───────────────────────────────────────────────────────────
  ["ionic",          { color: "#3880c8", border: "rgba(56,128,200,0.30)", bg: "rgba(56,128,200,0.07)" }],

  // ── Git ──────────────────────────────────────────────────────────────
  ["github",         { color: "#d06040", border: "rgba(208,96,64,0.30)", bg: "rgba(208,96,64,0.07)" }],
  ["git",            { color: "#d06040", border: "rgba(208,96,64,0.30)", bg: "rgba(208,96,64,0.07)" }],

  // ── Protocols / Standards ────────────────────────────────────────────
  ["xslt",           { color: "#7a8ea8", border: "rgba(122,142,168,0.28)", bg: "rgba(122,142,168,0.06)" }],
  ["oauth",          { color: "#7890b0", border: "rgba(120,144,176,0.28)", bg: "rgba(120,144,176,0.06)" }],
  ["rest",           { color: "#7898b8", border: "rgba(120,152,184,0.28)", bg: "rgba(120,152,184,0.06)" }],
  ["soap",           { color: "#7898b8", border: "rgba(120,152,184,0.26)", bg: "rgba(120,152,184,0.05)" }],

  // ── AI / ML ──────────────────────────────────────────────────────────
  ["ai",             { color: "#9060d0", border: "rgba(144,96,208,0.30)", bg: "rgba(144,96,208,0.07)" }],

  // ── Tools ────────────────────────────────────────────────────────────
  ["jira",           { color: "#2068c0", border: "rgba(32,104,192,0.28)", bg: "rgba(32,104,192,0.06)" }],
];

export function getTechColor(name: string): TechColor {
  const lower = name.toLowerCase();
  for (const [key, color] of MAP) {
    if (lower.includes(key)) return color;
  }
  return DEFAULT;
}
