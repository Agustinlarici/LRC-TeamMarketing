# LRC IT Solutions — Marketing (posts + reels)

Sistema único de contenido: estrategia → brief → post/reel → comprobaciones → tu aprobación. Nada se publica automáticamente.

## Dónde está cada cosa
- `marketing/` — estrategia (`STRATEGY`, `SERVICES`, `TARGET_CLIENTS`), identidad (`VISUAL.md`), flujo (`WORKFLOW.md`), `CONTENT_LOG.md`, `briefs/` y `tools/`.
- `brand/` — marca oficial: `frame.md` (fuente de verdad completa), fondos, logo, fuentes.
- `videos/<slug>/` — un proyecto HyperFrames autónomo por reel.
- `.claude/agents/` — `strategist` (ideas y briefs) y `designer` (posts y reels). `.claude/skills/` — skills de HyperFrames.

## Reglas globales
1. Empieza por `marketing/WORKFLOW.md`. Lee solo lo que tu tarea necesita; no recorras el repo.
2. Marca: `marketing/VISUAL.md` (hoja corta). `brand/frame.md` solo si hace falta el detalle.
3. Contenido en italiano. Nunca inventes cifras, clientes, testimonios ni teléfonos: solo datos de `marketing/SERVICES.md`.
4. Pieza nueva = brief aprobado en `marketing/briefs/`. Posts: `node marketing/tools/post.mjs <brief>`. Reels: HyperFrames + `node marketing/tools/reel.mjs check <slug>`.
5. Renders: solo con aprobación explícita; nunca sobrescribir ni borrar uno existente. Sin commit/push salvo petición.
6. Nunca copiar ni exponer credenciales (`~/.heygen`).
