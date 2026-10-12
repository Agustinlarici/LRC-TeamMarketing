// Plantillas de posts de Instagram para LRC IT Solutions.
// Cada plantilla devuelve el HTML interior de un frame; el CLI (post.mjs) añade fondo, CSS de marca y QA.
// Reglas de marca: brand/frame.md + marketing/VISUAL.md. Unidades en cqw (1cqw = 1% del ancho del frame).

const esc = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
// `*palabra*` → acento (una sola palabra clave por título)
const rich = (s = "") => esc(s).replace(/\*([^*]+)\*/g, '<span class="kw">$1</span>');

const ICONS = {
  calendar: '<rect x="3" y="4.5" width="18" height="16.5" rx="2.5"/><path d="M3 9.5h18M8 2.5v4M16 2.5v4"/><path d="m9 15 2 2 4-4"/>',
  chat: '<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.4-4.9A8 8 0 1 1 21 12z"/>',
  doc: '<path d="M14 2.5H7a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7.5z"/><path d="M14 2.5v5h5M9 13h6M9 17h4"/>',
  bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.9 1.9 0 0 0 3.4 0"/>',
  bot: '<rect x="4" y="8" width="16" height="12" rx="3"/><path d="M12 8V4M9 13v1M15 13v1M2 14v2M22 14v2"/>',
  chart: '<path d="M4 20V10M10 20V4M16 20v-8M22 20H2"/>',
  code: '<path d="m8 8-5 4 5 4M16 8l5 4-5 4M14 5l-4 14"/>',
  link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
  bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
  check: '<path d="m5 12 5 5 9-10"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2 20c0-4 3-6 7-6s7 2 7 6M16 4.5a3.5 3.5 0 0 1 0 7M18 14c2.5.5 4 2.3 4 6"/>',
};
export const ICON_NAMES = Object.keys(ICONS);
const icon = (name, size = "5.4cqw") =>
  `<svg class="ico" style="width:${size};height:${size}" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICONS[name] ?? ICONS.check}</svg>`;

// Logo = wordmark de texto (regla en VISUAL.md). El color lo decide la clase de tema.
const wordmark = (cls = "") => `<div class="wm ${cls}" data-text><span class="lrc">LRC</span> <span class="its">IT Solutions</span></div>`;
const pager = (ctx) => (ctx.total > 1 ? `<div class="pager" data-text>${String(ctx.index).padStart(2, "0")} / ${String(ctx.total).padStart(2, "0")}</div>` : "<div></div>");
const chip = (t) => (t ? `<div class="chip" data-text>${esc(t)}</div>` : "<div></div>");

export const TEMPLATES = {
  // Portada: fondo azul, display ≤ 6 palabras
  cover: { theme: "azul", maxWords: { title: 6 }, render: (s, c) => `
    <div class="row">${chip(s.eyebrow)}${pager(c)}</div>
    <div class="grow mid">
      <h1 class="display" data-text data-fit>${rich(s.title)}</h1>
      ${s.subtitle ? `<p class="sub" data-text data-fit>${rich(s.subtitle)}</p>` : ""}
    </div>
    <div class="foot">${wordmark()}</div>` },

  // Contenido: fondo claro, titular + texto (+ tarjeta opcional)
  content: { theme: "claro", maxWords: { title: 12 }, render: (s, c) => `
    <div class="row">${wordmark()}${pager(c)}</div>
    <div class="grow mid">
      ${s.eyebrow ? chip(s.eyebrow) : ""}
      <h2 class="headline" data-text data-fit>${rich(s.title)}</h2>
      ${s.body ? `<p class="body" data-text data-fit>${rich(s.body)}</p>` : ""}
      ${s.card ? `<div class="card"><p class="body" data-text data-fit>${rich(s.card)}</p></div>` : ""}
    </div>` },

  // Lista: fondo claro, hasta 4 elementos con icono  (items: "icono | Titolo | testo")
  list: { theme: "claro", maxWords: { title: 12 }, maxItems: 4, render: (s, c) => `
    <div class="row">${wordmark()}${pager(c)}</div>
    <div class="grow mid">
      ${s.eyebrow ? chip(s.eyebrow) : ""}
      <h2 class="headline" data-text data-fit>${rich(s.title)}</h2>
      <div class="items">${(s.items ?? []).map((it) => `
        <div class="card item">
          <div class="tile">${icon(it.icon)}</div>
          <div class="itext"><div class="ititle" data-text data-fit>${rich(it.title)}</div>${it.text ? `<div class="idesc" data-text data-fit>${rich(it.text)}</div>` : ""}</div>
        </div>`).join("")}
      </div>
    </div>` },

  // Cierre / CTA: fondo azul, pastilla blanca con CTA
  cta: { theme: "azul", maxWords: { title: 6 }, render: (s, c) => `
    <div class="row">${chip(s.eyebrow)}${pager(c)}</div>
    <div class="grow mid">
      <h1 class="display" data-text data-fit>${rich(s.title)}</h1>
      ${s.subtitle ? `<p class="sub" data-text data-fit>${rich(s.subtitle)}</p>` : ""}
      <div class="pill" data-text data-fit>${esc(s.cta || "Parliamo")}</div>
      ${s.url ? `<div class="url" data-text>${esc(s.url)}</div>` : ""}
    </div>
    <div class="foot">${wordmark()}</div>` },
};

export function css(fontBase, W, H) {
  return `
@font-face{font-family:"Inter";font-weight:100 900;font-display:block;src:url("${fontBase}/Inter-Variable.woff2") format("woff2");}
@font-face{font-family:"Geist Mono";font-weight:400;font-display:block;src:url("${fontBase}/GeistMono-Regular.woff2") format("woff2");}
:root{--blue:#2563EB;--navy:#0B2A63;--cyan:#0EA5C9;--ink:#0F1117;--muted:#6B7280}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${W}px;height:${H}px;overflow:hidden;background:#fff}
.frame{position:relative;width:${W}px;height:${H}px;overflow:hidden;container-type:inline-size;font-family:"Inter",sans-serif}
.bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.inner{position:absolute;inset:0;padding:7cqw;display:flex;flex-direction:column;gap:3cqw}
.azul{color:#fff}.claro{color:var(--ink)}
.row{display:flex;justify-content:space-between;align-items:center;min-height:5cqw}
.grow{flex:1;min-height:0}.mid{display:flex;flex-direction:column;justify-content:center;gap:3cqw}
.foot{display:flex;justify-content:center}
.wm{font-size:3.6cqw;font-weight:600;letter-spacing:-.025em;white-space:nowrap}
.azul .wm{background:#fff;padding:1.2cqw 3.2cqw 1.4cqw;border-radius:999px}.azul .lrc{color:var(--blue)}.azul .its{color:var(--ink)}
.claro .lrc{color:var(--blue)}.claro .its{color:var(--ink)}
.foot .wm{font-size:4.4cqw}
.chip{align-self:flex-start;padding:1.2cqw 3cqw;border-radius:999px;font-family:"Geist Mono",monospace;font-size:2.4cqw;letter-spacing:.12em;text-transform:uppercase}
.azul .chip{background:rgba(255,255,255,.18);color:#fff}
.claro .chip{background:rgba(37,99,235,.10);color:var(--blue)}
.pager{font-family:"Geist Mono",monospace;font-size:2.4cqw;letter-spacing:.12em}
.azul .pager{color:rgba(255,255,255,.85)}.claro .pager{color:var(--muted)}
.display{font-size:9cqw;font-weight:600;line-height:1.05;letter-spacing:-.03em}
.headline{font-size:6.5cqw;font-weight:600;line-height:1.1;letter-spacing:-.02em}
.sub{font-size:4cqw;font-weight:400;line-height:1.35}
.azul .sub{color:rgba(255,255,255,.85)}
.body{font-size:3.6cqw;line-height:1.5}.claro .body{color:#374151}
.kw{color:var(--blue)}.azul .kw{color:inherit}
.card{border-radius:4cqw;padding:4cqw;background:rgba(255,255,255,.72);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.9);box-shadow:0 2cqw 6cqw rgba(11,42,99,.10)}
.items{display:flex;flex-direction:column;gap:2.4cqw}
.item{display:flex;align-items:center;gap:3.4cqw;padding:3cqw 4cqw}
.tile{flex:none;width:10cqw;height:10cqw;border-radius:28%;background:var(--blue);display:flex;align-items:center;justify-content:center}
.ititle{font-size:4cqw;font-weight:600;letter-spacing:-.01em;line-height:1.15}
.idesc{font-size:3.2cqw;color:var(--muted);line-height:1.35;margin-top:.6cqw}
.pill{align-self:flex-start;margin-top:2cqw;padding:2.2cqw 5.5cqw;border-radius:999px;background:#fff;color:var(--blue);font-size:4cqw;font-weight:600}
.url{font-family:"Geist Mono",monospace;font-size:2.8cqw;letter-spacing:.08em;color:rgba(255,255,255,.85)}
`;
}

// Script de QA embebido: escribe el resultado en <pre id="qa"> (lo lee post.mjs con --dump-dom).
export const QA_SCRIPT = `
document.fonts.ready.then(function(){
  var r={errors:[],warnings:[]},f=document.querySelector('.frame'),fr=f.getBoundingClientRect(),safe=0.07*fr.width-1;
  if(!document.fonts.check('600 20px Inter'))r.errors.push('fuente Inter no cargada');
  var inner=f.querySelector('.inner');
  if(inner.scrollHeight>inner.clientHeight+1)r.errors.push('el contenido desborda el frame en vertical ('+(inner.scrollHeight-inner.clientHeight)+'px)');
  f.querySelectorAll('[data-fit]').forEach(function(e){
    var fs=parseFloat(getComputedStyle(e).fontSize);
    if(e.scrollWidth>e.clientWidth+1||e.scrollHeight>e.clientHeight+0.15*fs)r.errors.push('texto desborda su caja: "'+e.textContent.trim().slice(0,40)+'"');
  });
  f.querySelectorAll('[data-text]').forEach(function(e){
    var b=e.getBoundingClientRect(),t=e.textContent.trim().slice(0,30),px=parseFloat(getComputedStyle(e).fontSize);
    if(b.left<fr.left+safe||b.right>fr.right-safe||b.top<fr.top+safe||b.bottom>fr.bottom-safe)r.errors.push('texto fuera del margen seguro (7cqw): "'+t+'"');
    var mono=/Geist Mono/.test(getComputedStyle(e).fontFamily),min=(mono?0.024:0.03)*fr.width;
    if(px<min-0.5)r.errors.push('texto por debajo del mínimo legible ('+(mono?'2.4':'3')+'cqw): "'+t+'"');
    var lh=parseFloat(getComputedStyle(e).lineHeight)||px*1.2,lines=Math.round(b.height/lh);
    if(lines>5)r.warnings.push(lines+' líneas en "'+t+'" (¿demasiado texto?)');
  });
  var p=document.createElement('pre');p.id='qa';p.textContent=JSON.stringify(r);document.body.appendChild(p);
});`;

export function renderSlide(slide, ctx) {
  const tpl = TEMPLATES[slide.template];
  const theme = slide.bg === "azul" || slide.bg === "claro" ? slide.bg : tpl.theme;
  const bg = theme === "azul" ? "fondo-azul.jpg" : "fondo-claro.jpg";
  return { theme, bg, inner: tpl.render(slide, ctx) };
}
