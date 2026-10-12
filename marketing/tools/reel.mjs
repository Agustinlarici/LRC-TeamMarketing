#!/usr/bin/env node
// Conecta los reels de videos/<slug>/ con el sistema de marketing. NUNCA renderiza ni sobrescribe renders.
//   node marketing/tools/reel.mjs list
//   node marketing/tools/reel.mjs prep  <slug>   copia frame.md y brand/ al proyecto si faltan (no sobrescribe)
//   node marketing/tools/reel.mjs check <slug>   brief aprobado + archivos + rutas independientes + `hyperframes check`
// Crear el proyecto y renderizar se hace con HyperFrames (ver marketing/WORKFLOW.md), con aprobación del usuario.

import { spawnSync } from "node:child_process";
import { cpSync, existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const [cmd, slug] = process.argv.slice(2);
const proj = (s) => join(ROOT, "videos", s);
const die = (m) => { console.error(`✗ reel: ${m}`); process.exit(1); };
const front = (f) => { const m = existsSync(f) && readFileSync(f, "utf8").match(/^---\r?\n([\s\S]*?)\r?\n---/); const o = {}; if (m) for (const l of m[1].split(/\r?\n/)) { const k = l.match(/^([a-z_]+):\s*(.*)$/i); if (k) o[k[1]] = k[2].replace(/\s+#.*$/, "").trim(); } return o; };
const renders = (s) => { const d = join(proj(s), "renders"); return existsSync(d) ? readdirSync(d).filter((f) => f.endsWith(".mp4")) : []; };

if (cmd === "list") {
  for (const s of readdirSync(join(ROOT, "videos")).filter((d) => statSync(proj(d)).isDirectory())) {
    const mb = front(join(ROOT, "marketing/briefs", `${s}.md`));
    console.log(`${s.padEnd(28)} brief marketing: ${(mb.status ?? "sin brief").padEnd(9)} · HyperFrames BRIEF.md: ${existsSync(join(proj(s), "BRIEF.md")) ? "sí" : "no"} · renders: ${renders(s).length}`);
  }
  process.exit(0);
}

if (!slug || !/^[a-z0-9-]+$/.test(slug) || !existsSync(proj(slug))) die(`uso: reel.mjs <list|prep|check> <slug> — no existe videos/${slug ?? "<slug>"}`);

if (cmd === "prep") {
  const f = join(proj(slug), "frame.md"), b = join(proj(slug), "assets/brand");
  if (!existsSync(f)) { cpSync(join(ROOT, "brand/frame.md"), f); console.log("+ frame.md"); } else console.log("= frame.md ya existe (no se toca)");
  if (!existsSync(b)) { cpSync(join(ROOT, "brand"), b, { recursive: true }); console.log("+ assets/brand/"); } else console.log("= assets/brand/ ya existe (no se toca)");
  process.exit(0);
}

if (cmd === "check") {
  const p = proj(slug); let bad = 0;
  const ko = (m) => { bad++; console.log(`✗ ${m}`); }, ok = (m) => console.log(`✓ ${m}`), info = (m) => console.log(`· ${m}`);
  const mb = front(join(ROOT, "marketing/briefs", `${slug}.md`));
  if (mb.status === "approved") ok("brief de marketing aprobado"); else ko(`brief de marketing marketing/briefs/${slug}.md ${mb.status ? `con status '${mb.status}'` : "inexistente"} (debe estar 'approved')`);
  for (const f of ["index.html", "BRIEF.md", "frame.md", "hyperframes.json", "assets/brand/fonts"]) existsSync(join(p, f)) ? ok(`existe ${f}`) : ko(`falta ${f} (¿reel.mjs prep ${slug}?)`);
  // independencia: el render no debe depender de archivos fuera de la carpeta del proyecto
  const html = [join(p, "index.html"), ...(existsSync(join(p, "compositions")) ? readdirSync(join(p, "compositions")).filter((f) => f.endsWith(".html")).map((f) => join(p, "compositions", f)) : [])].filter(existsSync);
  const ext = [];
  for (const f of html) for (const m of readFileSync(f, "utf8").matchAll(/(?:src|href|data-composition-src)=["']([^"']+)["']|url\(["']?([^"')]+)/g)) { const u = m[1] ?? m[2]; if (/^\.\.\/|^[A-Za-z]:[\\/]|^file:/.test(u)) ext.push(`${f.replace(p, "").replace(/^[\\/]/, "")}: ${u}`); }
  ext.length ? ko(`rutas fuera del proyecto:\n    ${ext.join("\n    ")}`) : ok("rutas relativas dentro del proyecto");
  if (html.some((f) => /https?:\/\/(cdn|unpkg)/.test(readFileSync(f, "utf8")))) info("usa GSAP desde CDN (plantilla estándar de HyperFrames): el render necesita red");
  const r = renders(slug); info(`renders existentes: ${r.length ? r.join(", ") : "ninguno"} — no se sobrescriben; cada render nuevo lleva fecha en el nombre`);
  console.log("… npx hyperframes check");
  const c = spawnSync("npx", ["--yes", "hyperframes", "check"], { cwd: p, shell: true, encoding: "utf8" });
  const out = `${c.stdout}${c.stderr}`; const sum = out.split(/\r?\n/).filter((l) => /error\(s\)|text checks|Check (passed|failed)|✗/.test(l)).map((l) => "    " + l.trim());
  console.log(sum.join("\n")); if (c.status !== 0) ko("hyperframes check falló");
  console.log(bad ? `\n✗ ${bad} problema(s)` : "\n✓ reel listo para revisión (sin renderizar)");
  process.exit(bad ? 1 : 0);
}
die("comando desconocido: list | prep | check");
