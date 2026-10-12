---
version: 1.0
name: LRC Solutions — Brand
description: >
  Archivo de marca de LRC IT Solutions (https://www.lrc-solutions.com) para videos HyperFrames
  y piezas de Instagram. Tecnológico, limpio y cercano: azul eléctrico sobre fondos de degradé
  suave, Inter en sentence case, esquinas redondeadas, mucho aire. Fuente de verdad: este
  frontmatter. Para usarlo en un proyecto, copiar este archivo como `frame.md` y la carpeta
  `brand/` como `assets/brand/`.
unit: frame — 1080×1350 (IG feed) primario; 1080×1080, 1080×1920 (stories/reels) y 1920×1080 documentados
principle: fondo de degradé de marca · un mensaje por frame · azul solo como acento

brand:
  name: "LRC IT Solutions"
  short: "LRC"
  site: "lrc-solutions.com"
  language: "it"            # copy de la web en italiano; respetar idioma de cada pieza
  tagline: "Soluzioni digitali. Intelligenza artificiale. Un unico partner."
  cta: "Parliamo"

colors:
  blue: "#2563EB"           # primario — CTA, acentos, logo
  navy: "#0B2A63"           # azul profundo — texto fuerte sobre claro, sombras de color
  cyan: "#0EA5C9"           # acento secundario — detalles, datos, gráficos
  ink: "#0F1117"            # texto principal sobre fondos claros
  white: "#FFFFFF"
  surface: "#F7F8FA"        # fondo plano claro (web)
  muted: "#ECEEF2"          # chips, tarjetas secundarias
  border: "#E5E7EB"
  text-muted: "#6B7280"     # texto secundario sobre claro
  dark: "#0A0D14"           # fondo oscuro (web modo dark)
  # tonos muestreados de los fondos de Instagram
  bg-blue-deep: "#3D689B"
  bg-blue-light: "#5188C9"
  bg-celeste: "#DCF3FB"
  bg-lila: "#E9D8FC"

backgrounds:
  fondo-azul:
    file: "backgrounds/fondo-azul.jpg"
    look: "degradé azul acero (#3D689B → #5188C9), luz en esquinas superior-derecha e inferior-izquierda"
    text: "{colors.white}"
    secondary-text: "rgba(255,255,255,0.75)"
    accent: "{colors.white} (pastillas blancas con texto {colors.blue})"
    use: "portadas, frases de impacto, anuncios, cierres"
  fondo-claro:
    file: "backgrounds/fondo-claro.jpg"
    look: "blanco luminoso con degradé celeste (sup-izq, inf-der) y lila (sup-der, inf-izq)"
    text: "{colors.ink}"
    secondary-text: "{colors.text-muted}"
    accent: "{colors.blue}"
    use: "contenido, listas, servicios, explicaciones, datos"
  fit: "object-fit: cover; centrado; nunca deformar ni recolorear"

typography:
  display:   { fontFamily: "Inter", weight: 600, lineHeight: 1.05, tracking: "-0.03em", case: "sentence" }
  headline:  { fontFamily: "Inter", weight: 600, lineHeight: 1.1,  tracking: "-0.02em", case: "sentence" }
  body:      { fontFamily: "Inter", weight: 400, lineHeight: 1.5,  tracking: "0" }
  body-strong: { fontFamily: "Inter", weight: 500, lineHeight: 1.5 }
  eyebrow:   { fontFamily: "Geist Mono", weight: 400, tracking: "0.12em", case: "upper" }
  wordmark:  { fontFamily: "Inter", weight: 600, tracking: "-0.01em", text: "LRC IT Solutions" }
  # tamaños en cqw (relativos al ancho del frame)
  sizes:
    display: "9cqw"         # ≤ 6 palabras
    headline: "6.5cqw"      # 7–12 palabras
    subhead: "4cqw"
    body: "3.2cqw"          # piso de legibilidad en IG: 3cqw
    eyebrow: "2.4cqw"
    wordmark: "3cqw"

spacing:
  safe: "7cqw"              # margen mínimo en IG (stories: +14cqh arriba y abajo)
  gap: "3cqw"
  card-pad: "5cqw"

radius:
  card: "4cqw"              # rounded-2xl de la web, escalado
  pill: "999px"             # botones y chips
  mark: "22%"               # el isotipo (rx 14/64)

components:
  logo:
    mark: "logo/lrc-mark.svg — cuadrado azul redondeado con una “L” blanca"
    lockup: "mark + wordmark {typography.wordmark}, gap 0.4× alto del mark"
    on-fondo-azul: "mark en blanco con L azul, o mark original sobre pastilla blanca; wordmark blanco"
    on-fondo-claro: "mark original; wordmark {colors.ink}"
    placement: "esquina superior-izquierda o centrado abajo; alto 6–8cqw"
  pill-cta:
    background: "{colors.blue}"
    text: "{colors.white}, Inter 500"
    radius: "{radius.pill}"
    padding: "2cqw 5cqw"
    on-fondo-azul: "fondo blanco, texto {colors.blue}"
  eyebrow-chip:
    background: "rgba(37,99,235,0.10)"
    text: "{colors.blue}, {typography.eyebrow}"
    radius: "{radius.pill}"
    on-fondo-azul: "fondo rgba(255,255,255,0.18), texto blanco"
  card:
    background: "rgba(255,255,255,0.72) + backdrop-filter: blur(20px)"
    border: "1px solid rgba(255,255,255,0.9)"
    radius: "{radius.card}"
    shadow: "0 2cqw 6cqw rgba(11,42,99,0.10)"
    description: "tarjeta de vidrio sobre los fondos; sobre fondo-azul usar rgba(255,255,255,0.14) con borde rgba(255,255,255,0.3) y texto blanco"
  icon-tile:
    background: "{colors.blue}"
    icon: "{colors.white}, trazo lineal 2px"
    radius: "28%"
    size: "10cqw"
  accent-rule:
    background: "linear-gradient(90deg, {colors.blue}, {colors.cyan})"
    size: "12cqw × 0.8cqw, radius pill"
---

# LRC Solutions — Brand

## Esencia

LRC IT Solutions diseña y desarrolla **IA, software a medida, automatización y Business
Intelligence** para empresas. La marca se ve **tecnológica pero serena**: degradés suaves de luz,
azul eléctrico como único acento fuerte, tipografía Inter limpia y frases cortas.

Pilares de mensaje (de la web): *AI Agent · Software · Automazione · Data & BI*.
Sectores: Industria, Ristorazione (Tavolo), Sport, Software B2B, Assistenti IA.
Proceso: *Analizziamo → Progettiamo → Sviluppiamo → Evolviamo*.

## Fondos (regla principal)

Toda pieza de Instagram usa **uno de los dos fondos de marca**, a pantalla completa:

| Fondo | Texto | Acento | Para |
| --- | --- | --- | --- |
| `fondo-azul.jpg` | blanco | pastillas blancas | portadas, frases, anuncios, cierres |
| `fondo-claro.jpg` | ink `#0F1117` | azul `#2563EB` | contenido, listas, servicios, datos |

- En carruseles: **portada y cierre en azul**, slides internas en claro.
- No superponer otros degradés, texturas ni fotos a pantalla completa encima. Las fotos van
  dentro de una `card` redondeada.
- No recolorear ni rotar los fondos; sí se pueden escalar con `cover`.

## Tipografía

- **Inter** para todo; títulos en **600**, sentence case, tracking negativo. Nunca todo en mayúsculas.
- **Geist Mono** solo para eyebrows/etiquetas cortas en mayúsculas (ej. `AI AGENT`, `01 / 04`).
- Máximo 2 niveles de texto por frame (título + bajada). Una palabra clave del título puede ir en
  `{colors.blue}` (sobre claro) — nunca más de una.

## Composición

- **Un mensaje por frame.** El título domina (≥3× la bajada); 40–50% del frame vacío.
- Márgenes `7cqw`. En stories/reels dejar libre el 14% superior e inferior (UI de Instagram).
- Esquinas siempre redondeadas (cards `4cqw`, botones pill). Sin bordes duros ni sombras negras;
  la sombra, si existe, es azul navy muy suave.
- Logo en cada pieza: arriba a la izquierda (contenido) o centrado abajo (portada/cierre).

## Do / Don't

**Do:** fondo de marca · Inter 600 sentence case · azul como acento · cards de vidrio · pill CTA
"Parliamo" · iconos lineales.

**Don't:** colores fuera de la paleta · negro puro de fondo · mayúsculas en títulos · más de un
acento por frame · cifras inventadas (usar solo datos reales de LRC; si falta, `{metric}`).

## Formatos

| Formato | Tamaño | Notas |
| --- | --- | --- |
| IG feed | 1080×1350 (4:5) | formato principal |
| IG cuadrado | 1080×1080 | |
| Stories / Reels | 1080×1920 | zonas seguras 14% arriba/abajo |
| Video horizontal | 1920×1080 | mismos fondos con `cover` |

## Font loading

Fuentes locales en `fonts/` (no usar Google Fonts):

```html
<style>
@font-face{font-family:"Inter";font-weight:100 900;font-display:block;src:url("assets/brand/fonts/Inter-Variable.woff2") format("woff2");}
@font-face{font-family:"Geist Mono";font-weight:400;font-display:block;src:url("assets/brand/fonts/GeistMono-Regular.woff2") format("woff2");}
</style>
```
