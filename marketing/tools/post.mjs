#!/usr/bin/env node
// Generador de posts de Instagram desde un brief Markdown → HTML + PNG + QA.
//   node marketing/tools/post.mjs marketing/briefs/<slug>.md [--draft] [--out <dir>] [--no-png]
// Sin dependencias: usa Chrome headless (CHROME_PATH o ubicaciones habituales).
// Salida por defecto: marketing/posts/<slug>/slide-NN.{html,png} (+ sheet.png si hay varias).
// Exit 0 = todo OK · 1 = error de QA o de brief.

import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { QA_SCRIPT, TEMPLATES, ICON_NAMES, css, renderSlide } from "./post-templates.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const argv = process.argv.slice(2);
const flag = (n) => argv.includes(`--${n}`);
const opt = (n) => (argv.includes(`--${n}`) ? argv[argv.indexOf(`--${n}`) + 1] : null);
const briefPath = argv.find((a) => !a.startsWith("--") && a !== opt("out"));
const fail = (m) => { console.error(`✗ post: ${m}`); process.exit(1); };

if (!briefPath) fail("uso: node marketing/tools/post.mjs <brief.md> [--draft] [--out <dir>] [--no-png]");

// ---------- parseo del brief ----------
const kv = (line) => { const m = line.match(/^([a-z_]+):\s*(.*)$/i); return m ? [m[1].toLowerCase(), m[2].trim()] : null; };
function parseBrief(text) {
  const fm = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!fm) fail("el brief necesita frontmatter entre líneas '---'");
  const meta = {};
  for (const l of fm[1].split(/\r?\n/)) { const p = kv(l); if (p) meta[p[0]] = p[1].replace(/\s+#.*$/, ""); }
  const slides = [];
  for (const block of fm[2].split(/^##\s+Slide\b.*$/im).slice(1)) {
    const s = { items: [] }; let inItems = false;
    for (const raw of block.split(/\r?\n/)) {
      const l = raw.trim();
      if (!l || l.startsWith("#") || l.startsWith(">")) continue;
      if (/^items:\s*$/i.test(l)) { inItems = true; continue; }
      if (inItems && l.startsWith("-")) {
        const [ic, ti, tx] = l.replace(/^-\s*/, "").split("|").map((x) => x.trim());
        s.items.push({ icon: ic, title: ti ?? "", text: tx ?? "" }); continue;
      }
      const p = kv(l); if (p) { s[p[0]] = p[1]; inItems = false; }
    }
    slides.push(s);
  }
  return { meta, slides };
}

const { meta, slides } = parseBrief(readFileSync(resolve(briefPath), "utf8"));
const problems = [];
if (meta.type !== "post") problems.push("frontmatter: type debe ser 'post'");
if (!/^[a-z0-9-]+$/.test(meta.slug ?? "")) problems.push("frontmatter: slug obligatorio, solo a-z 0-9 y '-'");
if (meta.status !== "approved" && !flag("draft")) problems.push(`brief con status '${meta.status ?? "?"}': necesita 'approved' (o usar --draft para un borrador)`);
const m = (meta.format ?? "1080x1350").match(/^(1080)x(1350|1080)$/);
if (!m) problems.push("format debe ser 1080x1350 o 1080x1080");
if (!slides.length) problems.push("el brief no tiene secciones '## Slide N'");
slides.forEach((s, i) => {
  const t = TEMPLATES[s.template]; const id = `slide ${i + 1}`;
  if (!t) return problems.push(`${id}: template '${s.template}' no existe (${Object.keys(TEMPLATES).join(", ")})`);
  if (!s.title) problems.push(`${id}: falta title`);
  const words = (s.title ?? "").replace(/\*/g, "").split(/\s+/).filter(Boolean).length;
  if (t.maxWords?.title && words > t.maxWords.title) problems.push(`${id}: title tiene ${words} palabras (máx ${t.maxWords.title} en '${s.template}')`);
  if (s.template === "list" && (!s.items.length || s.items.length > t.maxItems)) problems.push(`${id}: list necesita 1–${t.maxItems} items`);
  s.items.forEach((it) => { if (it.icon && !ICON_NAMES.includes(it.icon)) problems.push(`${id}: icono '${it.icon}' no existe (${ICON_NAMES.join(", ")})`); });
  if (/\b\d+\s?%|\b\d{6,}\b/.test(JSON.stringify(s))) console.warn(`⚠ ${id}: contiene cifras/porcentajes; deben estar confirmados en marketing/SERVICES.md`);
});
if (problems.length) fail("brief inválido:\n  - " + problems.join("\n  - "));

// ---------- Chrome ----------
const CHROME = [process.env.CHROME_PATH, "C:/Program Files/Google/Chrome/Application/chrome.exe", "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe", "/usr/bin/google-chrome", "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"].find((p) => p && existsSync(p));
if (!CHROME) fail("no se encontró Chrome: define CHROME_PATH");
const chrome = (args) => execFileSync(CHROME, ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=1", ...args], { stdio: ["ignore", "pipe", "ignore"], maxBuffer: 1 << 26, timeout: 60000 }).toString();

// Captura determinista: --virtual-time-budget deja regiones sin pintar de forma intermitente, así que se usa
// run-all-compositor-stages y se exige que dos exportaciones consecutivas sean idénticas (hash), con reintentos.
const sha = (f) => createHash("sha256").update(readFileSync(f)).digest("hex");
function shot(args, file, url) {
  let prev = null;
  for (let i = 0; i < 5; i++) {
    chrome([...args, "--run-all-compositor-stages-before-draw", `--screenshot=${file}`, url]);
    const h = sha(file);
    if (h === prev) return true;
    prev = h;
  }
  return false;
}

// ---------- generación ----------
const W = 1080, H = Number(m[2]);
const outDir = resolve(opt("out") ?? join(ROOT, "marketing/posts", meta.slug));
mkdirSync(outDir, { recursive: true });
const brandRel = relative(outDir, join(ROOT, "brand")).replaceAll("\\", "/");
let errors = 0;
const files = [];

slides.forEach((s, i) => {
  const ctx = { index: i + 1, total: slides.length };
  const { theme, bg, inner } = renderSlide(s, ctx);
  const html = `<!doctype html><html lang="it"><head><meta charset="utf-8"><title>${meta.slug} ${ctx.index}</title><style>${css(`${brandRel}/fonts`, W, H)}</style></head><body><div class="frame ${theme}"><img class="bg" src="${brandRel}/backgrounds/${bg}" alt=""><div class="inner">${inner}</div></div><script>${QA_SCRIPT}</script></body></html>`;
  const base = join(outDir, `slide-${String(ctx.index).padStart(2, "0")}`);
  writeFileSync(`${base}.html`, html);
  const url = pathToFileURL(`${base}.html`).href;
  let qa;
  try { qa = JSON.parse(chrome(["--virtual-time-budget=4000", "--dump-dom", url]).match(/<pre id="qa">([\s\S]*?)<\/pre>/)[1].replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")); }
  catch { qa = { errors: ["no se pudo ejecutar la inspección (¿Chrome/fuentes?)"], warnings: [] }; }
  if (!flag("no-png") && !shot([`--window-size=${W},${H}`], `${base}.png`, url)) qa.errors.push("la exportación PNG no es estable (hashes distintos tras 5 intentos)");
  files.push(`${base}.png`);
  errors += qa.errors.length;
  console.log(`${qa.errors.length ? "✗" : "✓"} slide ${ctx.index} (${s.template}, ${theme})${qa.errors.length ? "" : " · QA ok"}`);
  qa.errors.forEach((e) => console.log(`    ERROR  ${e}`));
  qa.warnings.forEach((w) => console.log(`    aviso  ${w}`));
});

// Hoja de contacto (solo carruseles): una imagen para revisar todo de un vistazo
if (slides.length > 1 && !flag("no-png")) {
  const h = 900, w = Math.round((h * W) / H), gap = 24;
  const sheet = join(outDir, "sheet.html");
  writeFileSync(sheet, `<!doctype html><body style="margin:0;background:#1f2430;display:flex;gap:${gap}px;padding:${gap}px">${files.map((f) => `<img src="${pathToFileURL(f).href}" style="height:${h}px;width:${w}px;border-radius:12px">`).join("")}</body>`);
  shot([`--window-size=${slides.length * (w + gap) + gap},${h + 2 * gap}`], join(outDir, "sheet.png"), pathToFileURL(sheet).href);
}

console.log(`\n${errors ? "✗" : "✓"} ${slides.length} slide(s) → ${relative(ROOT, outDir) || outDir}${errors ? ` · ${errors} error(es) de QA` : ""}`);
process.exit(errors ? 1 : 0);
