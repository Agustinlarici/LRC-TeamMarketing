# Flujo de trabajo de contenido

Coordinador = la sesión principal de Claude Code. Subagentes (solo dos): **strategist** y **designer** (`.claude/agents/`).

## Fases
1. **Idea** — pides ideas o una campaña → el coordinador invoca `strategist` (lee solo `STRATEGY`, `SERVICES`, `TARGET_CLIENTS`, `CONTENT_LOG`) → devuelve ≤3 propuestas.
2. **Aprobación** — eliges una (o la ajustas).
3. **Brief** — se escribe `marketing/briefs/<slug>.md` desde `_post.template.md` o `_reel.template.md`, con `status: approved`. Atajo: si ya tienes un brief aprobado, saltas a la fase 4.
4. **Producción** — el coordinador invoca `designer` con la ruta del brief. No repite estrategia.
5. **Comprobaciones automáticas** — las ejecuta la herramienta (abajo); el diseñador corrige hasta 2 rondas.
6. **Revisión visual** — el diseñador mira el PNG/`sheet.png` o el Studio del reel; tú decides lo subjetivo.
7. **Aprobación final** — tú. Solo entonces se renderiza el reel / se da por cerrado el post. No se publica nada automáticamente. Se actualiza `CONTENT_LOG.md`.

## Posts estáticos (1080×1350)
```
node marketing/tools/post.mjs marketing/briefs/<slug>.md      # → marketing/posts/<slug>/slide-NN.png (+ sheet.png)
```
Brief Markdown → HTML (plantillas `cover | content | list | cta`) → QA automático (fuente cargada, desborde, margen 7cqw, mínimo legible, límites de palabras, iconos válidos) → PNG verificado (se exporta hasta que dos capturas coinciden). `--draft` permite un brief no aprobado; `--out <dir>` cambia la carpeta. Componentes nuevos: `marketing/tools/post-templates.mjs`.

## Reels (HyperFrames, dentro de `videos/<slug>/`)
Cada reel es un proyecto autónomo (copia de marca en `assets/brand/`, dependencias fijadas, rutas relativas). Sin migrar los existentes.
1. Brief aprobado en `marketing/briefs/<slug>.md` (`type: reel`).
2. Crear el proyecto y su `BRIEF.md` técnico con las skills de HyperFrames (`/hyperframes` → `general-video`; `npx hyperframes init "videos/<slug>" --non-interactive --example=blank --skill=general-video`).
3. `node marketing/tools/reel.mjs prep <slug>` — copia `frame.md` y `brand/` si faltan.
4. Construir el reel (voz y música por HeyGen vía `/media-use`; cortes en el beat de la música).
5. `node marketing/tools/reel.mjs check <slug>` — brief aprobado, archivos, independencia de rutas, `hyperframes check`.
6. `npx hyperframes preview --background` → tú apruebas → **solo entonces** `npm run render` en la carpeta del reel. Los renders llevan fecha en el nombre y no se sobrescriben; nunca borrar uno aprobado.

## Ahorro de contexto
- Una pieza = un brief + un subagente. Cada agente lee solo lo indicado en su definición.
- Validaciones repetitivas = scripts, no subagentes ni relecturas.
- Una variante por pieza salvo petición expresa; máximo 2 rondas de corrección antes de preguntarte.
- Datos ya documentados no se re-investigan: se leen de `SERVICES.md`.
